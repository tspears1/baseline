export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'audio[controls]',
  'button',
  'details summary',
  'input',
  'map area[href]',
  'select',
  'svg a[xlink\\:href]',
  '[tabindex]',
  'textarea',
  'video[controls]'
].map(t => t + ':not([tabindex^="-"]):not([disabled])').join()
