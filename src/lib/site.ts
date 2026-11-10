const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// Préfixe un chemin interne ("/conseils/") avec la base du site.
export const url = (chemin = '/') => `${base}${chemin}`;

export const dateLongue = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const dateIso = (date: Date) => date.toISOString().slice(0, 10);
