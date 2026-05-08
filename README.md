# Strum & Spruce

A premium, beginner-focused ukulele reference app built as a progressive four-module lesson hub. Every feature is designed to help a complete beginner go from zero to confidently playing songs — with interactive visuals, real synthesized audio, and clear beginner-friendly explanations throughout.

## Modules

### Module 01 — Instrument Anatomy
- Clickable SVG ukulele diagram with 8 labeled parts: headstock, nut, frets, strings, tuning pegs, neck, body, and bridge
- Each part highlights (color accent + animated underline) on selection with a detailed description
- **Individual string playback:** when "Strings" is selected, four circular G / C / E / A buttons appear — tapping one plays the open-string Karplus-Strong sound and animates that string in the SVG with a physically accurate damped oscillation (C bows most, A least, matching real string physics)

### Module 02 — Technique & Troubleshooting
- Eight editorial cards covering the most common beginner pain points:
  - Clean frets (no buzz)
  - Thumb placement
  - Releasing excess tension
  - Strumming motion
  - Nail vs. finger pad tone
  - Sharp notes and tuning checks
  - Finger soreness
  - The muted chuck (X stroke)
- Each card has a unique icon, colored badge, top border accent, and numbered tips for visual clarity
- No song charts — all content is original and license-free

### Module 03 — Chords and Fingers
- Chord catalog covering majors, minors, dominant sevenths, major sevenths (Cmaj7, Gmaj7, Fmaj7), minor sevenths (Am7, Dm7, Cm7), extra dominants (F7, B7), and sus grips (Dsus4, Asus2)
- Filter by **Beginner**, **Intermediate**, or **Seventh** (with a beginner-friendly explanation of what seventh chords are when selected); plus live text search with empty-state messaging
- Chord diagram shows finger dots, open-string circles, muted-string × markers, fret number rail, and string labels (G-C-E-A)
- **Play chord** button strums the selected chord with a realistic per-string sweep (28 ms stagger, low to high)
- **Switch to next chord** cycles through only the chords matching the current filter/search
- Reading chord diagrams guide explains: finger numbers, open strings, the nut, fret numbers, muted strings, and string labels
- Compact string names and finger number reference cards in the sidebar
- Mobile layout: chord search above the diagram; reading guide below — so the most useful content is always near the diagram on any screen size

### Module 04 — Strumming Patterns
- 16+ patterns across four categories: **Beginner**, **Island**, **Pop**, and **Advanced**
- Each category has a subtitle explaining the musical style and when to use it
- Pattern cards show name, difficulty badge, notation, description, and practice tips
- Notation displayed as hyphen-separated beat groups (e.g. `D - DU - UDU`) for readability
- D / U / X legend at the top explains notation for first-time readers (D = down, U = up, X = muted chuck)
- **Play pattern** button plays one bar using Karplus-Strong audio at 80 BPM; spaces between groups are treated as rest slots so the beat grouping is audible; X strokes play a short bandpass-filtered percussive chuck; button shows a pulsing "Playing..." state until the bar finishes

## Audio Engine

All sound is synthesized in the browser using the **Karplus-Strong** algorithm — no MP3 files, no external audio libraries.

**How it works:**
1. A Hann-windowed noise burst is loaded into a circular buffer sized to the target frequency
2. A feedback averaging loop runs over the buffer — physically modelling the energy loss of a decaying plucked string
3. A gentle low-pass filter (3800 Hz) adds body warmth
4. The shared `AudioContext` singleton is reused across all playback calls to avoid latency

**`useUkuleleAudio` hook exposes three primitives:**
- `playChord(chordName)` — strums all four strings with a 28 ms per-string sweep
- `playStrum(chordName, notation, bpm?)` — schedules a full strumming pattern with rest slots at group boundaries
- `playNote(freq)` — plays a single open-string note at any frequency (used by the Anatomy string buttons)

## Navigation

- **Sidebar** (desktop) and **Bottom nav** (mobile) with five lesson shortcuts
- **Dashboard** with a suggested learning order hint and four module cards (Anatomy, Technique, Chords, Strumming)
- Linear lesson chain: each page footer links forward and back through the modules

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Animation | Motion (Framer Motion) |
| Audio | Web Audio API (Karplus-Strong, zero dependencies) |
| Routing | React Router v6 |
| Build | Vite |

## Run Locally

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```
