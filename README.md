# Coach démo

Site de démonstration (marque fictive, contenu de test) pour essayer [Pages CMS](https://pagescms.org) avec un site Astro publié sur GitHub Pages.

- Site : https://sphyserx.github.io/rebond-cms-test/
- Contenu : `src/content/pages/accueil.md` et `src/content/articles/*.md`
- Images envoyées depuis le CMS : `public/images/`
- Configuration du CMS : `.pages.yml`, à garder identique au schéma de `src/content.config.ts`

```bash
npm install
npm run dev     # http://localhost:4321/rebond-cms-test/
npm run build   # construit dist/ puis vérifie les liens internes
```
