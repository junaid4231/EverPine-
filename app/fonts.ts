import localFont from 'next/font/local'

/**
 * Display: Cormorant Garamond — light, high-contrast Garamond for dramatic headline sizes.
 * Italic 400 is used for gold accent words. Text/UI: Hanken Grotesk 400/500.
 */
export const display = localFont({
  src: [{ path: './fonts/cormorant-garamond-latin-300-normal.woff2', weight: '300', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

export const displayItalic = localFont({
  src: [{ path: './fonts/cormorant-garamond-latin-400-italic.woff2', weight: '400', style: 'italic' }],
  variable: '--font-display-italic',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

export const sans = localFont({
  src: [
    { path: './fonts/hanken-grotesk-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/hanken-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})
