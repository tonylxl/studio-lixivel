import fs from "node:fs";
import path from "node:path";

/**
 * Galerie des fiches projets : chaque photo garde son format (paysage, portrait, carré),
 * sans recadrage. Les photos sont rangées en lignes de même hauteur (« justified rows »).
 * Format par défaut : paysage 16:9 (les plans 3D de Cindy), si le fichier n'est pas lisible.
 */

export type PhotoGalerie = { image: string; alt: string; ratio: number };
export type RangGalerie = { photos: PhotoGalerie[]; vide: number };

const RATIO_DEFAUT = 16 / 9;
/** Somme des ratios largeur/hauteur à atteindre pour remplir une ligne (≈ 2 paysages, 3 portraits). */
const LIGNE = 2.4;

/** Largeur et hauteur lues dans l'en-tête du fichier (JPEG, PNG, WebP), sans dépendance. */
function dimensions(buf: Buffer): { w: number; h: number } | null {
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // WebP
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const type = buf.toString("ascii", 12, 16);
    if (type === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (type === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (type === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
    return null;
  }
  // JPEG : on cherche le premier segment SOF.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      const sof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (sof) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
  }
  return null;
}

/** Orientation EXIF 5 à 8 : la photo est tournée d'un quart de tour (fréquent sur les photos de téléphone). */
function tourneeJpeg(buf: Buffer): boolean {
  const i = buf.indexOf("Exif\0\0", 0, "binary");
  if (i < 0 || i > 65536) return false;
  const t = i + 6;
  const le = buf.toString("ascii", t, t + 2) === "II";
  const u16 = (o: number) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o: number) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const ifd = t + u32(t + 4);
  const n = u16(ifd);
  for (let k = 0; k < n; k++) {
    const e = ifd + 2 + k * 12;
    if (u16(e) === 0x0112) return u16(e + 8) >= 5;
  }
  return false;
}

function ratio(src: string): number {
  if (!src.startsWith("/")) return RATIO_DEFAUT;
  try {
    const chemin = path.join(process.cwd(), "public", decodeURI(src));
    // Noms accentués : le fichier peut être enregistré en NFD (Mac) alors que le Markdown est en NFC.
    const existant = [chemin, chemin.normalize("NFD"), chemin.normalize("NFC")].find((c) => fs.existsSync(c));
    if (!existant) return RATIO_DEFAUT;
    const buf = fs.readFileSync(existant);
    const d = dimensions(buf);
    if (!d || !d.w || !d.h) return RATIO_DEFAUT;
    let r = d.w / d.h;
    try {
      if (buf[0] === 0xff && tourneeJpeg(buf)) r = 1 / r;
    } catch {}
    // Bornes : un panorama ou une photo très étroite serait légèrement recadré.
    return Math.min(2.4, Math.max(0.6, r));
  } catch {
    return RATIO_DEFAUT;
  }
}

/**
 * Range les photos en lignes : une ligne « pleine largeur » pour une photo paysage,
 * en alternance avec des lignes de 2 ou 3 photos. Dernière ligne incomplète : pas étirée.
 */
export function rangsGalerie(galerie: { image: string; alt: string }[]): RangGalerie[] {
  const photos = galerie.map((g) => ({ ...g, ratio: ratio(g.image) }));
  const rangs: RangGalerie[] = [];
  let pleine = true;
  let i = 0;
  while (i < photos.length) {
    // Deux photos restantes : côte à côte plutôt qu’une pleine largeur suivie d’une photo seule.
    if (pleine && photos[i].ratio >= 1.3 && photos.length - i !== 2) {
      rangs.push({ photos: [photos[i]], vide: 0 });
      i++;
    } else {
      const ligne: PhotoGalerie[] = [];
      let somme = 0;
      while (i < photos.length && ligne.length < 3 && somme < LIGNE - 0.2) {
        ligne.push(photos[i]);
        somme += photos[i].ratio;
        i++;
      }
      // Une photo paysage seule en fin de galerie passe en pleine largeur ; sinon on n'étire pas.
      const vide = i >= photos.length && somme < LIGNE - 0.7 && !(ligne.length === 1 && somme >= 1.3) ? LIGNE - somme : 0;
      rangs.push({ photos: ligne, vide });
    }
    pleine = !pleine;
  }
  return rangs;
}

export type EtapeGalerie = { label: string; src: string; ratio: number };

/**
 * Section « Du plan au réalisé » : 2 visuels paysage par ligne (3 si portraits), mêmes hauteurs,
 * sans recadrage. Un visuel seul en dernière ligne garde la largeur d'un visuel de la ligne précédente.
 */
export function rangsEtapes(etapes: { label: string; src: string }[]): { etapes: EtapeGalerie[]; vide: number }[] {
  const items = etapes.map((e) => ({ ...e, ratio: ratio(e.src) }));
  const rangs: { etapes: EtapeGalerie[]; vide: number }[] = [];
  let i = 0;
  while (i < items.length) {
    const ligne: EtapeGalerie[] = [];
    let somme = 0;
    while (i < items.length && ligne.length < 3 && !(ligne.length >= 2 && somme >= LIGNE - 0.2)) {
      ligne.push(items[i]);
      somme += items[i].ratio;
      i++;
    }
    const precedente = rangs.at(-1);
    const vide =
      ligne.length === 1 && precedente
        ? Math.max(0, (precedente.etapes.reduce((s, e) => s + e.ratio, 0) + precedente.vide) - somme)
        : 0;
    rangs.push({ etapes: ligne, vide });
  }
  return rangs;
}
