// ============================================================================
// 3D DECORATIVE OBJECT PLACEHOLDER CONFIGURATION
// ============================================================================
// Every 3D object on the website is defined as an image slot pointing to
// a transparent PNG in /public/3d/<name>.png.
//
// When an image is present in /public/3d/<name>.png, it will automatically render
// with soft drop shadows, subtle rotation, and gentle floating animations.
//
// If the image is not found, a soft pastel dashed-outline placeholder box is
// displayed with the slot's label and dimensions so you know exactly where
// your 3D render will appear.
//
// Set SHOW_PLACEHOLDERS to false to completely hide empty placeholder boxes.
// ============================================================================

export const SHOW_PLACEHOLDERS: boolean = true;

export interface DecorSlotConfig {
  name: string;
  label: string;
  imagePath: string;
  section: 'hero' | 'about' | 'projects' | 'videos' | 'contact' | 'footer';
  recommendedSize: {
    width: number;
    height: number;
  };
  // CSS placement classes or styles
  positionClass: string;
  // Rotation in degrees
  rotation: number;
  // Layering
  zIndex: number;
  // Animation timing
  floatDuration: string; // e.g. "6s"
  floatDelay: string;    // e.g. "0s"
  // Safe zone indicator: never overlaps clickable text/inputs
  safePlacementNote: string;
}

export const DECOR_SLOTS: Record<string, DecorSlotConfig> = {
  'plant': {
    name: 'plant',
    label: '3D: plant',
    imagePath: '/3d/plant.png',
    section: 'hero',
    recommendedSize: { width: 360, height: 360 },
    positionClass: '-top-10 -left-6 sm:-top-16 sm:-left-12 w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44',
    rotation: -8,
    zIndex: 10,
    floatDuration: '6.5s',
    floatDelay: '0s',
    safePlacementNote: 'Peeks out from top-left outer corner of the hero card',
  },
  'pencil': {
    name: 'pencil',
    label: '3D: pencil',
    imagePath: '/3d/pencil.png',
    section: 'hero',
    recommendedSize: { width: 220, height: 220 },
    positionClass: 'top-1/2 -left-5 sm:-left-10 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 hidden sm:flex',
    rotation: 24,
    zIndex: 10,
    floatDuration: '5.2s',
    floatDelay: '1.2s',
    safePlacementNote: 'Hovers on the left outer margin beside the hero headline',
  },
  'sticky-note': {
    name: 'sticky-note',
    label: '3D: sticky-note',
    imagePath: '/3d/sticky-note.png',
    section: 'hero',
    recommendedSize: { width: 260, height: 260 },
    positionClass: '-top-8 -right-4 sm:-top-12 sm:-right-8 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 hidden sm:flex',
    rotation: 12,
    zIndex: 10,
    floatDuration: '7s',
    floatDelay: '0.8s',
    safePlacementNote: 'Tucked onto the top-right outer corner of the hero card',
  },
  'coffee-cup': {
    name: 'coffee-cup',
    label: '3D: coffee-cup',
    imagePath: '/3d/coffee-cup.png',
    section: 'hero',
    recommendedSize: { width: 380, height: 380 },
    positionClass: '-bottom-10 -right-6 sm:-bottom-14 sm:-right-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 hidden md:flex',
    rotation: -10,
    zIndex: 10,
    floatDuration: '6s',
    floatDelay: '1.8s',
    safePlacementNote: 'Peeks from bottom-right outer corner outside form fields',
  },
  'paperclips': {
    name: 'paperclips',
    label: '3D: paperclips',
    imagePath: '/3d/paperclips.png',
    section: 'hero',
    recommendedSize: { width: 180, height: 180 },
    positionClass: 'top-8 right-1/3 w-14 h-14 sm:w-16 sm:h-16 hidden lg:flex',
    rotation: 35,
    zIndex: 10,
    floatDuration: '4.8s',
    floatDelay: '2.4s',
    safePlacementNote: 'Floats gently above the hero top border in safe negative space',
  },
  'headphones': {
    name: 'headphones',
    label: '3D: headphones',
    imagePath: '/3d/headphones.png',
    section: 'about',
    recommendedSize: { width: 340, height: 340 },
    positionClass: '-top-10 -right-4 sm:-top-14 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40',
    rotation: 14,
    zIndex: 10,
    floatDuration: '6.2s',
    floatDelay: '0.5s',
    safePlacementNote: 'Top-right corner of About narrative section',
  },
  'donut': {
    name: 'donut',
    label: '3D: donut',
    imagePath: '/3d/donut.png',
    section: 'about',
    recommendedSize: { width: 280, height: 280 },
    positionClass: '-bottom-8 -left-4 sm:-bottom-12 sm:-left-8 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36',
    rotation: -18,
    zIndex: 10,
    floatDuration: '5.8s',
    floatDelay: '1.4s',
    safePlacementNote: 'Bottom-left corner of the experience container',
  },
  'clapperboard': {
    name: 'clapperboard',
    label: '3D: clapperboard',
    imagePath: '/3d/clapperboard.png',
    section: 'videos',
    recommendedSize: { width: 320, height: 320 },
    positionClass: '-top-8 -right-4 sm:-top-12 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32',
    rotation: 15,
    zIndex: 10,
    floatDuration: '5.5s',
    floatDelay: '0.9s',
    safePlacementNote: 'Top-right corner of Video showcase header',
  },
  'cube': {
    name: 'cube',
    label: '3D: cube',
    imagePath: '/3d/cube.png',
    section: 'projects',
    recommendedSize: { width: 260, height: 260 },
    positionClass: '-top-8 -left-4 sm:-top-10 sm:-left-6 w-20 h-20 sm:w-28 sm:h-28',
    rotation: -20,
    zIndex: 10,
    floatDuration: '6.8s',
    floatDelay: '1.6s',
    safePlacementNote: 'Top-left corner of Projects directory header',
  },
};
