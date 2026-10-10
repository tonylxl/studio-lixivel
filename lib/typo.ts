/**
 * Typographie française : espace insécable avant « : ; ! ? » et à l'intérieur des guillemets,
 * pour qu'un signe ne se retrouve jamais seul en début de ligne (« studio / : un îlot »).
 * Appliquée aux textes saisis dans Pages CMS, où l'on tape des espaces normales.
 */
export function typo(text: string): string;
export function typo(text: string | undefined): string | undefined;
export function typo(text?: string) {
  return text
    ?.replace(/[ \u00a0\u202f]+([:;!?»])/g, "\u00a0$1")
    .replace(/«[ \u00a0\u202f]+/g, "«\u00a0");
}
