# Figure Style Kit

How we keep hand-drawn illustrations *consistent* across the garden. SVG diagrams
are authored in-repo; painterly illustrations are generated in an external image
tool using the recipe below, then dropped into `content/assets/figures/`.

The whole trick to AI illustration is consistency: making many images look like one
person drew them. We get there by (1) keeping the master style block below identical
every time and only changing the subject line, and (2) reusing one reference image.

---

## Master style block (paste this into every prompt, unchanged)

> Soft hand-drawn editorial illustration, like a thoughtful researcher's notebook.
> Loose, slightly uneven ink linework with a gentle wobble, filled with soft
> translucent watercolor washes. Warm, muted palette: sage green, warm charcoal, and
> dusty neutrals on a warm off-white paper background with subtle paper texture.
> Generous negative space, calm and quiet, minimal detail, no hard edges, no harsh
> contrast. Flat, no 3D, no photorealism. No text or lettering anywhere in the image.

**Palette (give these hexes if the tool accepts them):** sage `#6f8c7a`, charcoal
`#2f2a26`, paper `#faf8f4`, soft clay `#b08968`, muted sky `#8aa6b0`.

**Negative prompt:** photorealistic, 3D render, glossy, neon, oversaturated, busy,
cluttered, corporate stock art, text, watermark, logo, harsh shadows, heavy outlines.

**Aspect / size:** hero 3:2 (export ~1600×1067), inline concept 4:3, small spot 1:1.
Export **WebP** (or PNG), keep under ~400 KB.

---

## Consistency method

1. Generate a few heroes, pick the one whose *style* you love most.
2. Reuse it as the style reference for every later image so they match:
   - Midjourney: `--sref <image-url>` (plus `--ar 3:2`)
   - Recraft: create a custom **Style** from 1–3 references, then generate in it
   - ChatGPT / DALL·E: attach the image and say "same illustration style as this"
   - Ideogram: use it as a style reference / remix
3. Only the **subject line** changes between figures. Master block stays identical.

## Tool recommendation

- **Recraft** — has trainable Styles built for exactly this; best for a locked house
  look across many figures. Start here if you want set-and-forget consistency.
- **Midjourney** — best painterly quality; `--sref` gives strong style consistency.
- **ChatGPT (DALL·E / GPT-image)** — easiest entry, follows long prompts well; style
  drifts more across images, fine for occasional heroes.
- **Ideogram** — strong illustration, generous free tier.

## Using Gemini (Nano Banana 2) — our chosen tool

Open the Gemini app (gemini.google.com), make sure image generation is on.

1. **First image of an essay:** paste the full prompt = master style block + the
   subject line for the figure + "3:2 landscape" (or 4:3). Generate a few, pick the
   one whose *style* you love. This becomes the essay's style anchor.
2. **Every later figure:** attach the anchor image (Gemini takes up to 14 references)
   and start the prompt with: *"In the exact same soft hand-drawn illustration style,
   palette, and linework as the attached image, draw: …"* then the new subject line.
   This is what keeps the set consistent.
3. Download as PNG. Send the files to me — I convert to WebP, size them, save to
   `content/assets/figures/`, and embed them. (A great hero can also become the
   essay's `sketch:` so it shows on the homepage card.)

Ready-to-paste prompt for the ecosystem hero (shot 1 below):

> Soft hand-drawn editorial illustration, like a thoughtful researcher's notebook.
> Loose, slightly uneven ink linework with a gentle wobble, filled with soft
> translucent watercolor washes. Warm, muted palette: sage green, warm charcoal, and
> dusty neutrals on a warm off-white paper background with subtle paper texture.
> Generous negative space, calm and quiet, minimal detail, no hard edges, no harsh
> contrast. Flat, no 3D, no photorealism. No text or lettering anywhere. 3:2
> landscape. Subject: an open research notebook lying on a desk; rising gently from
> the page, a soft loop of curving arrows links four small hand-drawn symbols — a
> simple computer chip, a little flow of connected boxes, a checkmark inside a circle,
> and a lightbulb — suggesting a cycle that feeds itself.

## Workflow

1. I write a **shot list** per essay (subject + composition + alt text + caption).
2. You generate each in your tool with the master block + subject line.
3. Save to `content/assets/figures/<slug>-<name>.webp`. Send them to me and I'll
   optimize (resize / convert to WebP) if needed.
4. Reference in Markdown — the pipeline frames and captions it automatically:
   `![alt text](/assets/figures/name.webp "Visible caption")`

---

## First shot list — "Why data science's future is an ecosystem story"

**1. Hero (3:2).** An open research notebook lying on a desk; rising gently from the
page, a soft loop of curving arrows links four small hand-drawn symbols — a simple
chip, a little flow of boxes, a checkmark-in-a-circle, and a lightbulb — suggesting a
cycle that feeds itself. Calm, airy, lots of paper showing.

**2. Force multiplier vs. force divider (4:3).** A single hand turning a small crank
in the middle; out of one side spill neat little sprouting plants in rows, out of the
other side a tangle of loose scribbles. Same effort, two outcomes.

**3. Frictionless reproducibility (4:3).** A row of identical small figures passing a
glowing seed hand-to-hand down a line, each one effortlessly; faint dotted lines show
the path. Sense of something moving freely with no resistance.

(The ecosystem *loop* itself is handled by the in-repo SVG diagram
`content/assets/figures/ecosystem-loop.svg`, so the hero stays more evocative.)
