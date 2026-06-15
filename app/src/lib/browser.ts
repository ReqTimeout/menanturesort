/**
 * Browser detection helper — true only in browser (not SSR)
 * Use to gate code that touches window/document.
 */
export const browser = typeof window !== 'undefined';
