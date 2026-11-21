// Renomme les images de public/images dont le nom contient des espaces, des accents ou des
// caractères spéciaux (ex. « Rectangle Room 2-Pièce de vie.jpg » envoyé depuis un Mac via Pages CMS),
// et met à jour les liens dans content/. Sans ça, l’optimiseur d’images de Next.js renvoie une erreur
// et la photo ne s’affiche pas.
// Lancé automatiquement avant chaque build (« prebuild » dans package.json) ; peut aussi se lancer à la main :
//   node scripts/noms-images.mjs
import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const IMAGES = path.join(RACINE, "public/images");
const CONTENU = path.join(RACINE, "content");

const propre = (nom) => {
  const ext = path.extname(nom).toLowerCase();
  const base = path
    .basename(nom, path.extname(nom))
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return (base || "image") + ext;
};

const fichiers = (dir, filtre) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? fichiers(p, filtre) : filtre(p) ? [p] : [];
  });

const renommages = [];
for (const ancien of fichiers(IMAGES, () => true)) {
  const nom = path.basename(ancien);
  if (/^[A-Za-z0-9._-]+$/.test(nom)) continue;
  const dossier = path.dirname(ancien);
  let nouveau = propre(nom);
  for (let i = 2; fs.existsSync(path.join(dossier, nouveau)); i++) {
    nouveau = propre(nom).replace(/(\.[^.]*)?$/, `-${i}$1`);
  }
  fs.renameSync(ancien, path.join(dossier, nouveau));
  const rel = (f) => "/images/" + path.relative(IMAGES, path.join(dossier, f)).split(path.sep).join("/");
  renommages.push([rel(nom), rel(nouveau)]);
}

if (renommages.length) {
  for (const f of fichiers(CONTENU, (p) => /\.(md|json|ya?ml)$/.test(p))) {
    let txt = fs.readFileSync(f, "utf8");
    const avant = txt;
    for (const [a, n] of renommages) {
      // Même nom écrit avec des accents composés (Mac) ou précomposés, et sous forme encodée dans une URL.
      for (const forme of new Set([a, a.normalize("NFC"), a.normalize("NFD")])) {
        txt = txt.split(forme).join(n).split(encodeURI(forme)).join(n);
      }
    }
    if (txt !== avant) fs.writeFileSync(f, txt);
  }
  for (const [a, n] of renommages) console.log(`image renommée : ${a} → ${n}`);
}
