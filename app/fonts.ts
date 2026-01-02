import localFont from "next/font/local";

const main = localFont({
    src:  './fonts/georgia.ttf',
    variable: '--font-main',
})

const certia = localFont({
  src: [
    { path: './fonts/Certia Thin.otf', weight: '100', style: 'normal' },
    { path: './fonts/Certia Thinitalic.otf', weight: '100', style: 'italic' },
    { path: './fonts/Certia Light.otf', weight: '300', style: 'normal' },
    { path: './fonts/Certia Lightitalic.otf', weight: '300', style: 'italic' },
    { path: './fonts/Certia Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/Certia Regularitalic.otf', weight: '400', style: 'italic' },
    { path: './fonts/Certia Medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/Certia Mediumitalic.otf', weight: '500', style: 'italic' },
    { path: './fonts/Certia Semibold.otf', weight: '600', style: 'normal' },
    { path: './fonts/Certia Semibolditalic.otf', weight: '600', style: 'italic' },
    { path: './fonts/Certia Bold.otf', weight: '700', style: 'normal' },
    { path: './fonts/Certia Bolditalic.otf', weight: '700', style: 'italic' },
    { path: './fonts/Certia Extrabold.otf', weight: '800', style: 'normal' },
    { path: './fonts/Certia Extrabolditalic.otf', weight: '800', style: 'italic' },
    { path: './fonts/Certia Black.otf', weight: '900', style: 'normal' },
    { path: './fonts/Certia Blackitalic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-certia',
})

export { certia, main };