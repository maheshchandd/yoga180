# Yoga180 — Design System

Reference: cinematic, quiet-luxury editorial minimalism (superdesign reference supplied by client), adapted for a home yoga studio.

## Color
- Ink `#111111` (text, footer), White `#FFFFFF`, Soft grey `#F4F4F4` (alternate sections), Mid grey `#6B6B6B` (body copy), Hairline `#DADADA` (on white) / `rgba(255,255,255,.35)` (on photo).
- ONE accent, taken from the Yoga180 logo figure: Teal `#1F6B78` (hover `#17545E`). Used only on primary CTAs (Book / WhatsApp), links-on-hover and tiny markers. Never as a background block except buttons.
- Photography is desaturated (`grayscale(1)`); gallery images regain colour on hover — the only "colour transition" allowed.

## Typography
- Single family: **Libre Franklin** (Google Fonts) 400 / 400 italic / 500 / 700 / 800.
- Hero headline: clamp(48px, 7vw, 92px), 800, tight leading 0.95, tracking -0.02em. Descriptor line same size, 400 italic.
- Section titles: clamp(32px, 4vw, 52px), 700.
- Body: 15–17px, 400, line-height 1.7, mid grey.
- Labels/eyebrows/nav/captions: 11–12px, uppercase, letter-spacing 0.18em, 500.
- Aggressive scale ratio: no timid mid-sizes.

## Structure
- Max width 1240px, side padding 24px (mobile) / 48px (desktop). Section padding 96–140px vertical.
- 1px hairlines are the primary structural device: hero frame box, stat dividers, list separators, CTA frame. No rounded cards, no shadows (radius 0). Floating chat bubble is the only round element.
- Rhythm: full-bleed photo hero → white → soft grey → photo band → white → soft grey → black footer.

## Components
- Hairline frame box (hero + CTA echo): 1px border, padding 40–56px, overline, two-weight headline, label bottom-left, arrow bottom-right.
- Buttons: square, 12px tracked caps. Primary = teal fill white text. Secondary = 1px outline (white on photo, ink on white).
- Stat row: 4 blocks split by vertical hairlines, hairlines above/below.
- Review list: large italic quote, name in tracked caps, hairline separators.
- Mobile sticky action bar (Call · WhatsApp · Book) — ink background, appears < 768px.
- Chat widget: teal round bubble bottom-right, square panel with hairline border.

## Motion
- Fade + 24px rise on scroll (IntersectionObserver), 700ms ease-out, staggered 80ms. Hero staggered on load. No bounce.

## Demo booking and attendance
- Approved revision: demo requests are direct WhatsApp/SMS links. Asha confirms times manually; no Calendar reservations or demo Sheet writes.
- Keep the editorial two-column layout: benefit list on white and direct-message actions in a soft-grey hairline frame. Stack on mobile.
- Attendance uses one reusable SMS QR encoding the studio number and exactly "I am here for the class." No name, date, time, expiry, session token, database logging or Google sync.
- Admin retains the password gate and Leads inbox; QR panel offers display, print and download. Student fallback page has a text-message link and copy actions, no form.
- QR is black on white with generous quiet zone. Explicitly instruct students to tap Send; never claim delivery or attendance confirmation.
- Public homepage: a "Here for class?" section after the callback form and before the footer. Large reusable QR beside the existing SMS/copy actions; stack on mobile so students can tap the text link on the same phone.
