# 3D Render Assets Directory (`/public/3d`)

Drop your transparent PNG 3D renders into this folder.

When a PNG file with the matching name is placed here, it will **automatically** appear on the website with:
- Natural drop shadow
- Subtle rotation
- Gentle floating animation (`float-gentle`)
- Zero code changes required

---

## 3D Slots & Specifications Table

| File Name | Slot Identifier | Appears In | Recommended Image Dimensions | Safe Placement Zone |
|---|---|---|---|---|
| `plant.png` | `plant` | Home — Hero Card | **360 × 360 px** | Peeking from top-left outer corner of the hero card |
| `pencil.png` | `pencil` | Home — Hero Card | **220 × 220 px** | Floating in the left margin beside the headline |
| `paperclips.png` | `paperclips` | Home — Hero Card | **180 × 180 px** | Hovering gently above the card's top border |
| `sticky-note.png` | `sticky-note` | Home — Hero Card | **260 × 260 px** | Pinned to top-right corner of the hero card |
| `coffee-cup.png` | `coffee-cup` | Home — Hero Card | **380 × 380 px** | Bottom-right outer corner (safely placed outside form) |
| `headphones.png` | `headphones` | Home — About Section | **340 × 340 px** | Top-right corner of About narrative section |
| `donut.png` | `donut` | Home — About Section | **280 × 280 px** | Bottom-left corner of the experience container |
| `clapperboard.png` | `clapperboard` | Videos Page | **320 × 320 px** | Top-right corner of the Video Showcase header |
| `cube.png` | `cube` | Projects Page | **260 × 260 px** | Top-left corner of the Projects Directory header |

---

## Global Placeholder Switch
To hide empty dashed placeholder boxes until you add the renders, open `src/config/decor.ts` and set:

```ts
export const SHOW_PLACEHOLDERS = false;
```
