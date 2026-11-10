// Vérifie, après le build, que chaque lien et chaque image interne de dist/
// commence par la base du site et pointe vers un fichier qui existe.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';

const dist = 'dist';
const base = '/rebond-cms-test';

function pagesHtml(dossier) {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) return pagesHtml(chemin);
    return nom.endsWith('.html') ? [chemin] : [];
  });
}

function existe(cheminPublic) {
  const fichier = join(dist, decodeURIComponent(cheminPublic));
  if (!existsSync(fichier)) return false;
  return statSync(fichier).isDirectory() ? existsSync(join(fichier, 'index.html')) : true;
}

const erreurs = [];
let total = 0;
const pages = pagesHtml(dist);

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const pagePublique = '/' + posix.relative(dist, dirname(page).replaceAll('\\', '/')) + '/';
  for (const [, cible] of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(cible) || cible === '') continue;
    total += 1;
    const chemin = cible.split('#')[0].split('?')[0];
    if (chemin.startsWith('/')) {
      if (chemin !== base && !chemin.startsWith(base + '/')) {
        erreurs.push(`${page} : ${cible} ne commence pas par ${base}`);
      } else if (!existe(chemin.slice(base.length) || '/')) {
        erreurs.push(`${page} : ${cible} ne mène à aucun fichier`);
      }
    } else if (!existe(posix.join(pagePublique, chemin))) {
      erreurs.push(`${page} : ${cible} (relatif) ne mène à aucun fichier`);
    }
  }
}

if (erreurs.length > 0) {
  console.error(`Liens cassés : ${erreurs.length}`);
  for (const erreur of erreurs) console.error(' - ' + erreur);
  process.exit(1);
}
console.log(`Liens internes vérifiés : ${total} dans ${pages.length} pages, aucun cassé.`);
