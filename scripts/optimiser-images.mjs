// Allège les photos de public/ sans perte visible :
// - JPEG ré-encodés en qualité 88 (mozjpeg), orientation appliquée, métadonnées retirées (profil couleur gardé) ;
// - PNG recompressés sans aucune perte (pas de palette : l’option « effort » de sharp en activerait une) ;
// - photos de plus de 3840 px ramenées à 3840 px (le site ne sert jamais d’image plus large).
// Un fichier n’est remplacé que s’il gagne au moins 10 % : relancer le script ne dégrade pas les photos déjà traitées.
// À lancer à la main après l’ajout de photos (pas au build) :
//   npm run images
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const fichiers = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? fichiers(p) : /\.(jpe?g|png)$/i.test(e.name) ? [p] : [];
  });

const mo = (n) => (n / 1e6).toFixed(2);
let avant = 0;
let apres = 0;
const allegees = [];
for (const f of fichiers(path.join(RACINE, "public"))) {
  const buf = fs.readFileSync(f);
  const meta = await sharp(buf).metadata();
  let img = sharp(buf).rotate();
  const redim = Math.max(meta.width, meta.height) > 3840;
  if (redim) img = img.resize({ width: 3840, height: 3840, fit: "inside" });
  if (meta.icc) img = img.keepIccProfile();
  const out =
    meta.format === "png"
      ? await img.png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer()
      : await img.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  avant += buf.length;
  if (out.length < buf.length * 0.9) {
    fs.writeFileSync(f, out);
    apres += out.length;
    allegees.push(`${mo(buf.length)} → ${mo(out.length)} Mo  ${path.relative(RACINE, f)}${redim ? " (3840 px)" : ""}`);
  } else apres += buf.length;
}
console.log(allegees.join("\n"));
console.log(`Total : ${mo(avant)} → ${mo(apres)} Mo (${allegees.length} images allégées)`);
