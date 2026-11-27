# Humanology · Painting prompts for every missing picture

One copy-ready prompt per picture the app still needs: **45 prompts** in four groups. Each prompt is complete on its own, so you can paste it into an image tool as is. The shared style, format and avoid-list are already built into every prompt.

| Group | What it covers | Prompts |
|---|---|---|
| A · Habit cards that have no painting (required) | Live habit cards showing a placeholder today | 25: W1, W2, A1, N2, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, A21, N1 |
| B · Circle icon improvement (optional) | A clearer 48 px circle for one card | 1: C1 |
| C · Replacements for 5.1 originals that weren't in the Drive folders | 5.1 originals missing from Drive (use only if the originals are really gone) | 15: S1, S2, T1, S3, S4, S5, G1, G2, G3, G4, G5, G6, G7, G8, R1 |
| D · Optional polish | Nice to have, not blocking | 4: O1, O2a, O2b, O2c |

## How to use these

1. **Attach the reference paintings** listed for each prompt. They're in the Drive images folder and in `humanology/art-src/`. `hm-kiwi.png` is the style anchor for the whole set; attach it every time. If your tool takes only one image, attach the identity reference for the person in the scene.
2. **Paste the whole prompt block** (scene + composition + style + format). Put the avoid list in the tool's negative-prompt field if it has one; otherwise leave it at the end of the prompt. Each prompt is 3,500 to 4,450 characters; without the AVOID line every one is under 3,750, which fits tools with a 4,000-character limit.
3. **Generate at 1536 × 1536** and keep the background transparent. If your tool can't do transparency, use the flat-white fallback described in the format paragraph and remove the background afterwards.
4. **Check the result** against the checklist under each prompt, and compare the face with the reference before accepting it. Fix hands at this stage, not after cropping.
5. **Name the file exactly** as given and drop it in the images folder. I'll run it through the existing pipeline (`tools/make_heroes.py` and `tools/make_thumbs.py`), which trims the margin and makes the hero and the 48 px circle.

Changes from the short prompts in `ARTWORK-NEEDED.md`: water now has two separate paintings (W1 for drinking before meals, W2 for cystitis), because the habits and the people studied are different. The stair card (A1) now shows Marco climbing fast, since the single-session trial was in young men, and the easy-pace stair card has its own painting (N2). The volunteer scene (A15) now matches the study: an older volunteer helping a nursing-home resident. Walter no longer appears in a yellow cardigan, which belongs to Priya.

## The cast

Use these descriptions to keep every person consistent. Each prompt already includes the relevant one.

| Person | Look | Usual clothes | Best reference |
|---|---|---|---|
| **Nora** | a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings | an oversized olive-sage crewneck knit sweater (sleeves often pushed up) and dark-wash blue jeans | `hm-kiwi.png (primary), hm-nuts.png, hm-weighted-blanket.png, hm-sketch.png` |
| **Ama** | a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build | a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active | `hm-early-dinner.png (face), hm-heel-raise.png (full figure)` |
| **Walter** | a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build | a cream cable-knit crewneck sweater and khaki trousers | `hm-onb-welcome-back.png (primary), hm-prunes.png, hm-tai-chi.png` |
| **Priya** | a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; dark eyes, straight brows, a calm, quietly amused expression; slender build | a sage-green crewneck sweater, sometimes under a butter-yellow cardigan, with cream or charcoal trousers | `hm-pleasant-plan.png (primary), hm-box-breath.png, hm-moment-rest-day.png` |
| **Theo** | a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build | a soft blue knit crewneck sweater and charcoal trousers | `hm-new-conversation.png (primary), hm-soy.png` |
| **Marco** | a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build | an olive-green crewneck t-shirt, charcoal joggers and light-grey trainers | `hm-cold-shower.png (face), hm-wall-sit.png (full figure)` |
| **Sam** | a man in his early sixties with light skin; wavy grey hair swept back from the forehead; round tortoiseshell glasses; a thoughtful, kindly face with smile lines | a rust-red crewneck sweater over a light-blue collared shirt | `hm-recall.png (primary), hm-future.png` |

New people who appear once only (the occupational therapist, the nursing-home resident, the physiotherapist and the acupuncturist) are described in full in their prompts. Make them look distinct from the main cast.

## Shared style (already inside every prompt)

> STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

> FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

**Avoid list (negative prompt):** text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon


---

## A · Habit cards that have no painting (required)

### W1 · `hm-water-premeal.png`

- **Used for:** water-premeal: *Drink water before meals in a structured weight program*
- **Why it's needed:** No painting shows plain water. The study protocol is a large glass (about 500 mL) of water drunk before a main meal.
- **Attach:** hm-onb-welcome-back.png and hm-prunes.png (Walter identity), hm-early-dinner.png (table and plate treatment), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: drink water before meals in a structured weight program.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a cream cable-knit crewneck sweater and khaki trousers. He is seated at the near edge of a small round warm-wood dining table, shown from the chest up in a gentle three-quarter view facing left. In his right hand he raises a tall, plain, perfectly clear drinking glass filled almost to the top with clear water, about to take a sip; the glass is noticeably large (a pint-sized tumbler) to suggest 500 mL. His left hand rests flat and relaxed on the table beside a waiting dinner: a cream ceramic plate holding a modest, colourful meal (grilled fish, green beans, a small portion of brown rice) with a fork resting on the rim, untouched. His expression is patient and content, eyes on the glass: the moment reads as 'water first, then the meal'. The water is completely clear: no lemon, no ice, no bubbles, no tint. Show soft painted reflections in the glass, a slight refraction of his fingers through the water, and a gentle highlight on the rim.

COMPOSITION: Waist-up figure filling about 70% of the frame height. The raised glass and his hand sit just left of centre. The plate sits lower right and is cropped by nothing. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the clear glass of water in his hand.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Water is unmistakably plain and clear.
- [ ] The plate is visibly untouched (the drink comes before the meal).
- [ ] Walter matches hm-onb-welcome-back.png: beard, hair, cream knit.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### W2 · `hm-water-cystitis.png`

- **Used for:** cystitis: *Add water for recurrent cystitis prevention*
- **Why it's needed:** No painting shows plain water. The trial added 1.5 L of water a day on top of usual intake, so the picture shows steady, all-day water drinking with a refillable bottle, not anything clinical.
- **Attach:** hm-early-dinner.png and hm-heel-raise.png (Ama identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: add water for recurrent cystitis prevention.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active. She stands at waist height in a relaxed three-quarter view facing right, mid-day, as if at a kitchen counter or desk (no counter shown). In her left hand she holds a large, simple, clear refillable water bottle (about 1.5 litres, smooth plain body, soft sage-green screw cap, no markings or measurement lines) tilted toward a plain clear drinking glass in her right hand, topping the glass up with clear water; a short clean stream of water is visible between bottle and glass. Her expression is calm and self-assured, a small easy smile, eyes on the glass. Everything feels ordinary and everyday: no medical items, no bathroom, no body focus.

COMPOSITION: Waist-up, figure about 70% of frame height. The bottle-to-glass pour is centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the pour from bottle into glass.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Bottle and glass are plain, unbranded, clear water only.
- [ ] Nothing clinical or bodily is shown.
- [ ] Ama's sleek low ponytail and gold hoops are present.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A1 · `hm-stairs.png`

- **Used for:** stairs: *Choose a stair-climbing routine*
- **Why it's needed:** The 5.1 painting (05-taking-the-stairs.png) is not available. The studied schedules are short, fast stair climbs, and the single-session trial was in young men, so Marco suits it.
- **Attach:** hm-wall-sit.png and hm-cold-shower.png (Marco identity), hm-intervals.png (energy of movement), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: choose a stair-climbing routine.

SCENE: Marco: a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build. Wardrobe: an olive-green crewneck t-shirt, charcoal joggers and light-grey trainers. He climbs a short, free-standing block of five plain warm-oak indoor stairs, briskly and with purpose, seen from the side in a slight three-quarter view, stairs rising from left to right. His leading right foot lands on the fourth step with the heel lifted on the trailing foot; his body leans slightly forward, arms swinging naturally (left arm forward), and his right hand hovers just above a simple round wooden handrail on slim posts. Expression focused and energised, mouth slightly open with effort, a faint flush in his cheeks; no sweat-soaked clothing. The stair block is a neat cut-out object: treads, risers and the rail are shown, it ends cleanly at the bottom and top, and there is no surrounding stairwell or wall.

COMPOSITION: Full figure and full stair block visible, figure about 75% of frame height. The leading foot on the step is just below centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the leading foot striking the step and his forward-leaning stride.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Clearly climbing fast (not a stroll).
- [ ] Both feet, all steps and the rail are inside the frame.
- [ ] Marco's olive tee, charcoal joggers and grey trainers match hm-wall-sit.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### N2 · `hm-stair-walk-easy.png`

- **Used for:** stair-walk-energy: *Walk the stairs for energy*
- **Why it's needed:** This card currently shows a placeholder. It can share A1, but the card asks for an EASY ten-minute stair walk, and the study was in young women, so a separate, gentler painting fits better.
- **Attach:** hm-kiwi.png and hm-weighted-blanket.png (Nora identity), hm-green-walk.png (Nora walking gait), hm-stairs.png (A1, if made, to match the stair block)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: walk the stairs for energy.

SCENE: Nora: a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings. Wardrobe: an oversized olive-sage crewneck knit sweater with the sleeves pushed up, dark-wash jeans and slate-blue slip-on trainers with cream soles. She walks up a short, free-standing block of five plain warm-oak indoor stairs at an unhurried, comfortable pace, seen from the side in a slight three-quarter view, stairs rising from left to right. Her right hand rests lightly on a simple round wooden handrail; her left foot is on the second step and her right foot is lifting to the third. Upright posture, relaxed shoulders, a light, refreshed half-smile, as if shaking off an afternoon slump. Her curls bounce slightly. The stair block is the same design as A1 if A1 exists: treads, risers and the rail only, no stairwell, no wall.

COMPOSITION: Full figure and full stair block visible, figure about 75% of frame height. Her hand on the rail and the stepping foot are near the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: her hand on the rail and the easy step.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Pace reads as easy and pleasant, not athletic.
- [ ] Hand is ON the rail (safety).
- [ ] Nora's curls, freckles and sage sweater match hm-kiwi.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A2 · `hm-drink-swap.png`

- **Used for:** drink-swap: *Replace a sugary drink with water*
- **Why it's needed:** The card asks for a visible swap: a sugary drink set aside, plain water chosen instead.
- **Attach:** hm-new-conversation.png (Theo identity), hm-evening-drink.png (drink handling), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: replace a sugary drink with water.

SCENE: Theo: a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build. Wardrobe: a soft blue knit crewneck sweater and charcoal trousers. Waist-up, three-quarter view facing left. In his right hand he lifts a clear glass of plain water toward himself, holding it slightly higher, the obvious choice. With his left hand he is setting down, and letting go of, a plain aluminium can of fizzy soft drink in a solid muted terracotta colour with no text, logo, stripes or graphics; a few tiny bubbles show at its open tab. The can is placed on a small round warm-wood side-table top that ends cleanly (only the table top and a short stub of its leg are shown). His glance is on the water and his expression is easy and good-humoured, not preachy.

COMPOSITION: Waist-up, figure about 70% of frame height. The water glass is the dominant prop in the centre; the can sits lower and slightly behind. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the clear glass of water.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] The can is completely unbranded.
- [ ] Water is clear, no ice or lemon.
- [ ] Theo's blue knit sweater and beard match hm-new-conversation.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A3 · `hm-caffeine-earlier.png`

- **Used for:** caffeine: *Move caffeine earlier*
- **Why it's needed:** The only drink painting, hm-tea.png, shows red hibiscus tea, which has no caffeine. The card is about having the last coffee or tea earlier in the day.
- **Attach:** hm-onb-welcome-back.png (Walter identity), hm-tea.png (mug handling pose), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: move caffeine earlier.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a soft green button-front overshirt over a cream t-shirt, and khaki trousers. He sits at a small round warm-wood table in bright morning light, waist-up, three-quarter view facing right. Both hands cradle a cream ceramic mug of dark black coffee with soft curls of steam rising. On the table beside the mug stands a small round analogue desk clock with a cream face, simple tick marks only (no numerals), its hands showing about ten o'clock in the morning. Morning cues: a crisp, cool-warm daylight tone, a small plate with half a slice of toast. His expression is calm and satisfied, enjoying the coffee early in the day.

COMPOSITION: Waist-up, figure about 70% of frame height. The mug and hands are centred; the clock sits to the lower left of the mug, clearly readable as a clock. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the steaming coffee mug in his hands.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] The drink reads as coffee (dark, steaming), not tea.
- [ ] The clock has no numerals; hands at about 10:00.
- [ ] Morning, not evening, mood.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A4 · `hm-sunscreen.png`

- **Used for:** sunscreen: *Use sunscreen daily*
- **Why it's needed:** No painting shows sunscreen.
- **Attach:** hm-kiwi.png (Nora identity and style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: use sunscreen daily.

SCENE: Nora: a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings. Wardrobe: a short-sleeved sage-green linen shirt, dark-wash jeans and a woven straw sun hat pushed back on her curls. Waist-up, three-quarter view facing right, outdoors-in-summer mood shown only through warm, bright light on her skin (no scenery). She smooths a generous stripe of white sunscreen along the top of her bare left forearm with the fingertips of her right hand; a little unblended cream is visible. Her left hand loosely holds a plain white squeeze tube with a peach flip cap, no text or symbols. A faint sheen where the lotion is spread. Expression: relaxed, routine, a light smile.

COMPOSITION: Waist-up, figure about 70% of frame height. Forearm, fingertips and tube are centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: fingertips spreading the white sunscreen on the forearm.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Tube has no lettering, SPF number or logo.
- [ ] The white lotion is visible on the skin.
- [ ] Nora's freckles and curls match hm-kiwi.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A5 · `hm-water-flosser.png`

- **Used for:** water-flosser: *Clean between your teeth daily*
- **Why it's needed:** No painting shows interdental cleaning. The trials used powered water flossers.
- **Attach:** hm-recall.png and hm-future.png (Sam identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: clean between your teeth daily.

SCENE: Sam: a man in his early sixties with light skin; wavy grey hair swept back from the forehead; round tortoiseshell glasses; a thoughtful, kindly face with smile lines. Wardrobe: a rust-red crewneck sweater over a light-blue collared shirt. He leans slightly forward over a small, plain white wall-hung bathroom basin (only the basin and its chrome tap are shown, no wall). Side three-quarter view facing left. He holds the slim white handle of a countertop water flosser in his right hand, the narrow angled tip resting between his lower teeth, lips slightly parted around the tip. The compact white base unit with a clear water reservoir and a coiled white hose sits on the basin edge. His glasses stay on; his expression is concentrated but relaxed. No spray or mess, at most a tiny, tasteful suggestion of water in the basin.

COMPOSITION: Head, shoulders, hands, basin and device visible; figure about 70% of frame height. Hand, tip and mouth are centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the flosser tip at his teeth.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Device is unbranded, white, no buttons with symbols.
- [ ] Dignified, not grimacing.
- [ ] Sam's tortoiseshell glasses and rust sweater match hm-recall.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A6 · `hm-powered-toothbrush.png`

- **Used for:** toothbrush: *Use a powered toothbrush*
- **Why it's needed:** No painting shows a powered toothbrush.
- **Attach:** hm-cold-shower.png (Marco identity: face, towel), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: use a powered toothbrush.

SCENE: Marco: a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build. Wardrobe: an olive-green crewneck t-shirt, with a cream towel draped over his left shoulder. Morning routine, waist-up, three-quarter view facing left. He brushes with a powered electric toothbrush held in his right hand: a chunky white handle with one round soft-blue power button (no icons) and a small round brush head at his teeth, a little white foam at the corner of his mouth. His left hand rests on his hip. Eyes bright and awake, a crinkle of a smile around the brush.

COMPOSITION: Waist-up, figure about 70% of frame height. The toothbrush handle and hand are the dominant shape in the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the white powered toothbrush and the hand holding it.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Clearly electric (thick handle, round head), not a manual brush.
- [ ] No branding.
- [ ] Marco's curls and stubble match hm-cold-shower.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A7 · `hm-social-break.png`

- **Used for:** social-break: *Take a week off social media*
- **Why it's needed:** hm-pleasant-plan.png shows a calendar but no phone set aside. The card is a seven-day break from social media while still keeping in touch another way.
- **Attach:** hm-pleasant-plan.png and hm-box-breath.png (Priya identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: take a week off social media.

SCENE: Priya: a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; dark eyes, straight brows, a calm, quietly amused expression; slender build. Wardrobe: a sage-green crewneck sweater under a butter-yellow cardigan, and cream trousers. She sits at a small warm-wood table, waist-up, seen in three-quarter view from slightly above. With her right hand she sets her smartphone face-down on the table, fingers just letting go. Next to it lies a small paper desk calendar strip with a row of seven blank day squares; a soft pencil tick sits in the first square and a light pencil line runs across all seven (no words, numbers or month names). Her left hand holds a warm-white ceramic mug. A folded handwritten note card in a cream envelope sits at the table edge as a quiet 'staying in touch another way' cue (no writing visible). Expression: lightly relieved, a calm small smile, shoulders relaxed.

COMPOSITION: Waist-up, figure about 70% of frame height. The face-down phone and her letting-go hand are centred; calendar strip just below. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the phone placed face-down.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Phone is clearly face-down (screen hidden).
- [ ] Calendar has no readable text or numerals.
- [ ] Priya's bob and cardigan match hm-pleasant-plan.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A8 · `hm-screen-cap.png`

- **Used for:** screen-cap: *Set a daily phone screen-time cap*
- **Why it's needed:** No painting shows a phone time limit being set. The studied cap was two hours a day.
- **Attach:** hm-new-conversation.png (Theo identity), hm-blue-glasses.png (how phones are painted in this set), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: set a daily phone screen-time cap.

SCENE: Theo: a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build. Wardrobe: a soft blue knit crewneck sweater and charcoal trousers. Close waist-up view, front three-quarter facing right. He holds a smartphone upright in his left hand at chest height, screen turned partly toward the viewer, and taps it with his right index finger. The screen shows only a simple, abstract graphic: a soft peach hourglass shape above one horizontal slider bar with a round handle about a third of the way along, on a cream screen. No text, no numbers, no app icons, no status bar. A soft glow from the screen lights his fingertip. His expression is decisive and slightly amused, as if he just set a sensible limit.

COMPOSITION: Waist-up, figure about 70% of frame height. Phone and fingertip in the exact centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the phone with the hourglass and slider.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Screen contains no readable text or numbers.
- [ ] Hourglass and slider read at small size.
- [ ] Theo matches hm-new-conversation.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A9 · `hm-standing-stockings.png`

- **Used for:** standing-stockings: *Use fitted stockings during standing shifts*
- **Why it's needed:** No painting shows compression stockings. The studies were in healthcare workers and hairdressers on long standing shifts.
- **Attach:** hm-heel-raise.png and hm-early-dinner.png (Ama identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: use fitted stockings during standing shifts.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a soft-blue short-sleeved healthcare scrub dress that ends just below the knee, with a small blank fabric name badge (no writing), and comfortable navy slip-resistant work shoes. Full figure from the side, at the start of a shift. Her right foot rests on a low, plain wooden step stool; she bends forward slightly and, with both hands, smooths the top band of a beige, knee-high graduated compression stocking just below her right knee, fingers flattening the fabric so it sits without wrinkles. Her left leg, standing on the floor line, wears the matching beige knee-high stocking. The stockings look like real medical compression wear: smooth, matte, slightly opaque, a defined top band. Expression: practical and composed, a small confident smile.

COMPOSITION: Full figure, about 80% of frame height, stool included. The hands at the stocking band are close to the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: both hands smoothing the stocking's top band below the knee.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Stockings are knee-high, beige and smooth (not tights or socks).
- [ ] Both legs show stockings.
- [ ] No logos on the scrubs; badge blank.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A10 · `hm-flight-stockings.png`

- **Used for:** flight-stockings: *Wear fitted stockings on a long flight*
- **Why it's needed:** hm-travel-sleep.png shows an aeroplane seat but long trousers, so no stockings can be seen. The studies used below-knee stockings on long-haul flights.
- **Attach:** hm-travel-sleep.png (seat and window treatment to reuse), hm-pleasant-plan.png (Priya identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: wear fitted stockings on a long flight.

SCENE: Priya: a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; dark eyes, straight brows, a calm, quietly amused expression; slender build. Wardrobe: a sage-green crewneck sweater, cropped cream trousers ending mid-calf, and flat navy slip-on shoes. She sits in an aeroplane window seat, shown from the side: the seat is a soft-blue upholstered airline seat with a headrest cover, and an oval aeroplane window with soft daylight sits just behind her, treated exactly as in hm-travel-sleep.png. She leans forward and, with both hands, smooths the top of a beige below-knee compression stocking on her right lower leg; both lower legs and both stockings are fully visible between the cropped trouser hems and the shoes. A neck pillow in peach rests on her shoulders. Expression: calm, organised traveller. The seat and window end cleanly; no cabin, no other passengers.

COMPOSITION: Seat and full figure visible, about 80% of frame height. Lower legs, stockings and hands are near the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: hands smoothing the stocking on the lower leg.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Stockings visibly below-knee and beige.
- [ ] Window and seat match hm-travel-sleep.png.
- [ ] No text on the seat or window.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A11 · `hm-bedtime-phone.png`

- **Used for:** bedtime-phone: *Put your phone away before bed*
- **Why it's needed:** The 5.1 painting (06-taking-a-screen-break.png) is not available, and hm-blue-glasses.png shows the opposite action (phone use in bed). The trial asked people to put the phone away for the last 30 minutes before bed.
- **Attach:** hm-kiwi.png (Nora identity), hm-dim-light.png and hm-bed-cue.png (evening light and bedding treatment)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: put your phone away before bed.

SCENE: Nora: a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings. Wardrobe: soft berry-coloured cotton pyjamas with a cream piped collar. She sits on the edge of a bed (only the bed edge, a cream duvet and a sage pillow are shown) beside a small warm-wood bedside table, side three-quarter view facing right, in low warm lamplight. A small table lamp with a linen shade glows amber. With her right hand she lowers her smartphone, screen dark, face-down into a small open wooden box with a lid propped open on the bedside table; her fingers are just releasing it. A closed paperback book (plain cover, no title) rests on the table beside the box. Her expression is unwinding and contented, eyelids slightly heavy. Calm, night-time mood.

COMPOSITION: Upper body, bed edge and bedside table visible, figure about 70% of frame height. Hand, phone and box are centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the phone going face-down into the wooden box.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Screen is off and the phone is going away, not being used.
- [ ] Warm lamplight but no dark room background.
- [ ] Nora's curls and freckles match.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A12 · `hm-blink.png`

- **Used for:** blink: *Practise complete blinks*
- **Why it's needed:** No painting shows the blink exercise (gently close, squeeze, open). The squeeze moment is the clearest to paint.
- **Attach:** hm-recall.png and hm-future.png (Sam identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: practise complete blinks.

SCENE: Sam: a man in his early sixties with light skin; wavy grey hair swept back from the forehead; round tortoiseshell glasses; a thoughtful, kindly face with smile lines. Wardrobe: a rust-red crewneck sweater over a light-blue collared shirt. Close head-and-shoulders portrait, front three-quarter view facing left, seated at a desk; only the top edge of an open silver laptop lid is visible at the bottom corner. He has gently closed his eyes fully in a soft, deliberate squeeze: eyelids sealed, a few soft crease lines at the outer corners, brows relaxed and NOT furrowed, mouth calm. His tortoiseshell glasses stay on. One hand is lifted lightly near his cheek, fingers relaxed, not touching the eye. The mood is a restful pause from the screen, not pain or a headache.

COMPOSITION: Head and shoulders fill about 75% of frame height. The face and closed eyes are the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the gently squeezed, fully closed eyes.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Eyes completely closed; reads as a gentle squeeze, not a wince.
- [ ] No eye-rubbing.
- [ ] Sam matches hm-recall.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A13 · `hm-apples.png`

- **Used for:** apples: *Try two whole apples daily*
- **Why it's needed:** hm-mix-study.png shows a picture card of an apple, not real apples. The trial was two whole apples a day in adults around age 51.
- **Attach:** hm-prunes.png and hm-onb-welcome-back.png (Walter identity), hm-kiwi.png (two-fruit composition and style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: try two whole apples daily.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a cream cable-knit crewneck sweater and khaki trousers. Waist-up, front three-quarter view facing right, smiling warmly. He holds two whole, glossy red-and-green apples at chest height, one resting in each open palm, hands slightly apart and offered toward the viewer. The apples are clearly two separate whole fruits, each with a short brown stem (one also carries a small green leaf), natural speckles and a soft painted highlight. Fingers curve naturally around the fruit. Expression: generous, cheerful, 'two a day'.

COMPOSITION: Waist-up, figure about 70% of frame height. The two apples and hands are large and centred, mirroring the two-kiwi composition of hm-kiwi.png. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the two whole apples in his palms.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Exactly two whole apples, no slices.
- [ ] Apples read clearly at 48 px.
- [ ] Walter's cream cable-knit matches hm-onb-welcome-back.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A14 · `hm-hummus.png`

- **Used for:** hummus: *Try an afternoon hummus snack*
- **Why it's needed:** No painting shows hummus. The tested snack was hummus with pretzels in the mid-afternoon.
- **Attach:** hm-early-dinner.png (Ama identity and table treatment), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: try an afternoon hummus snack.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active. She sits at a small warm-wood table in soft afternoon light, waist-up, three-quarter view seen from slightly above. In front of her is a shallow, round, cream-glazed ceramic bowl of smooth beige hummus with a spiral swirl, a small pool of golden olive oil and a dusting of paprika. Beside it lies a small pile of classic twisted pretzels (about six). Her right hand dips one pretzel into the hummus; her left hand rests by a glass of water. Expression: relaxed, enjoying a mid-afternoon break.

COMPOSITION: Waist-up, figure about 70% of frame height. Bowl, pretzel and fingers centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the pretzel dipping into the hummus bowl.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Pretzels are recognisable twists.
- [ ] Hummus reads as hummus (beige, swirled, oil).
- [ ] Ama matches hm-early-dinner.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A15 · `hm-volunteer.png`

- **Used for:** volunteer: *Try a structured volunteering session*
- **Why it's needed:** No painting shows volunteering. The studied volunteers were aged 59 to 79, helping nursing-home residents in structured sessions.
- **Attach:** hm-onb-welcome-back.png and hm-prunes.png (Walter identity), hm-puzzle.png (jigsaw treatment), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: try a structured volunteering session.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a cream cable-knit crewneck sweater and khaki trousers. He is the volunteer. He sits beside a nursing-home resident at a small round table, the two of them working on a large-piece jigsaw puzzle together. The resident is a NEW, one-off character: a very elderly white-haired woman in her late eighties with fair, softly lined skin, short soft white curls, pearl stud earrings, a lavender cardigan over a cream blouse, seated in a high-backed armchair with soft-blue upholstery (only the chair is shown). She holds up one large puzzle piece, delighted; Walter leans in, pointing gently to where it fits, sharing a warm laugh. Walter wears a plain lanyard with a small blank volunteer badge (no writing). The puzzle shows an abstract pastel landscape in sage, butter and soft blue, half finished, large pieces. Two figures, waist-up, three-quarter view.

COMPOSITION: Both figures waist-up, filling about 70% of frame height. Their hands and the puzzle piece meet in the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the two pairs of hands over the puzzle piece.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] The resident is clearly older than Walter and is a different person from the cast.
- [ ] Badge blank, no text anywhere.
- [ ] Warm, dignified, not patronising.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A16 · `hm-psyllium.png`

- **Used for:** psyllium: *Use psyllium regularly*
- **Why it's needed:** hm-supplement.png shows a bottle being read, not psyllium mixed into water. Each dose is taken with at least a full glass of water.
- **Attach:** hm-new-conversation.png (Theo identity), hm-soy.png (kitchen working hands), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: use psyllium regularly.

SCENE: Theo: a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build. Wardrobe: a soft blue knit crewneck sweater and charcoal trousers. He stands at a short section of warm-wood kitchen counter top (only the counter top edge shown), waist-up, three-quarter view facing left. With his right hand he stirs a teaspoon in a tall, full, clear glass of water into which a heaped spoonful of fine beige psyllium powder has just gone: a visible cloudy beige swirl spirals through the water. Beside the glass stands a small, plain, wide-mouthed glass jar with a cork lid, half full of the same beige powder, no label. His left hand steadies the glass. Expression: matter-of-fact, mid-routine.

COMPOSITION: Waist-up, figure about 70% of frame height. Glass, spoon and hand centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the cloudy swirl in the full glass of water.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Glass is full (a full glass of water is part of the safety advice).
- [ ] Jar unlabelled.
- [ ] Theo matches hm-new-conversation.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A17 · `hm-fall-hazards.png`

- **Used for:** fall-hazards: *Arrange a home fall-hazard assessment*
- **Why it's needed:** No painting shows a home safety assessment. The studied action is a visit from a trained professional who identifies hazards.
- **Attach:** hm-onb-welcome-back.png (Walter identity), hm-balance.png (Walter standing posture), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: arrange a home fall-hazard assessment.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a soft-blue button-front overshirt over a cream t-shirt, khaki trousers and brown house slippers. He stands, full figure, looking down attentively and nodding. Beside him an occupational therapist (a NEW, one-off character: a woman in her forties with deep brown skin, short natural hair, a plain sage-green polo shirt and navy trousers, a clipboard held against her knee whose page shows only soft grey blocks, no writing) crouches and points with her free hand to the curled-up corner of a small terracotta-and-cream striped rug lying on a short strip of plank flooring (the rug and that strip of floor are the only setting; they end cleanly). Their exchange is friendly and collaborative.

COMPOSITION: Both full figures, about 80% of frame height. The curled rug corner and pointing hand are just below centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the curled rug corner and the pointing hand.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] The hazard (curled rug edge) is obvious.
- [ ] Clipboard has no readable text.
- [ ] The therapist is clearly a visiting professional, not a cast member.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A18 · `hm-handwash.png`

- **Used for:** handwash: *Wash hands regularly*
- **Why it's needed:** No painting shows handwashing. The card describes lathering all surfaces for at least 20 seconds.
- **Attach:** hm-cold-shower.png (Marco identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: wash hands regularly.

SCENE: Marco: a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build. Wardrobe: an olive-green crewneck t-shirt, charcoal joggers and light-grey trainers. Close view from slightly above and in front: his head and shoulders are at the top of the frame, looking down at his hands with mild concentration, and his forearms and hands fill the centre over a small, plain white basin with a chrome tap that is turned off. He is mid-scrub: the fingers of one hand interlaced with the other, a thick, soft white lather covering palms, backs of hands and between fingers, a few small bubbles floating. A plain white soap bar on a small dish sits on the basin edge.

COMPOSITION: Hands and lather fill the centre; head at top, basin at bottom. Subject about 75% of frame height. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the lathered, interlaced hands.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Lather clearly white and thorough.
- [ ] Tap off while lathering.
- [ ] Hands have the correct number of fingers.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A19 · `hm-smell-training.png`

- **Used for:** smell-training: *Practise smell training*
- **Why it's needed:** No painting shows smell training. The approach is gently smelling four familiar scents twice a day, never applying anything inside the nose.
- **Attach:** hm-kiwi.png (Nora identity), hm-cocoa.png (gentle hand holding), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: practise smell training.

SCENE: Nora: a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings. Wardrobe: an oversized olive-sage crewneck knit sweater (sleeves often pushed up) and dark-wash blue jeans. She sits at a small warm-wood table, waist-up, three-quarter view facing left. In front of her stand four small amber-glass jars with cork lids in a neat row; a tiny natural cue sits in front of each one to suggest its scent: a single pink rose petal, a small lemon wedge, two whole cloves, and a eucalyptus sprig. No labels. She holds one open jar a few centimetres below her nose with both hands, eyes softly closed, breathing in gently, a peaceful focused face. The jar never touches her nose.

COMPOSITION: Waist-up, figure about 70% of frame height. The jar, nose and hands are centred; the row of jars runs along the lower third. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the open jar held just below her nose.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Exactly four jars, no labels.
- [ ] Jar is held below the nose, not in it.
- [ ] Nora matches hm-kiwi.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A20 · `hm-pelvic-floor.png`

- **Used for:** pelvic-floor: *Follow a supervised pelvic-floor training plan*
- **Why it's needed:** No painting shows this. The card is supervised training with a qualified clinician, so the picture is a calm, fully clothed consultation.
- **Attach:** hm-early-dinner.png (Ama identity), hm-bp-cuff.png (calm clinical tone), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: follow a supervised pelvic-floor training plan.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active. She sits upright in a simple cushioned chair, attentive and at ease, listening. Across a small round table, a physiotherapist (a NEW, one-off character: a woman in her fifties with light skin, short silver-blonde hair, a plain sage-green clinical tunic with a blank badge) shows her a small, neutral, cream-coloured anatomical model of the pelvis (bone only, stylised, nothing explicit), resting a hand on it while explaining. A plain notepad lies on the table with only grey scribbles. Both are fully clothed; the setting is dignified, private and reassuring. Two figures, waist-up, three-quarter view.

COMPOSITION: Both figures waist-up, about 70% of frame height. The pelvis model on the table and the two faces form a triangle around the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the clinician's hand on the pelvis model, with Ama's attentive face.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Nothing explicit or bodily intimate.
- [ ] Model reads as a bone pelvis model.
- [ ] No text on badge or notepad.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### A21 · `hm-almonds.png`

- **Used for:** almonds (hero only; the circle crop already works): *Make almonds a daily snack*
- **Why it's needed:** hm-nuts.png has walnuts beside the almonds, and cropping them out leaves the almonds too small.
- **Attach:** hm-nuts.png (exact pose, scale and framing to repeat), hm-kiwi.png (Nora identity)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: make almonds a daily snack.

SCENE: Nora: a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings. Wardrobe: an oversized olive-sage crewneck knit sweater (sleeves often pushed up) and dark-wash blue jeans. Repaint hm-nuts.png with only whole almonds: same pose, framing, lighting and scale. Waist-up, front three-quarter view. In her open left palm rests a small handful (about a dozen) of whole, skin-on almonds, warm brown with their fine ridged texture. Between the thumb and forefinger of her right hand she lifts one almond toward her mouth, smiling. No walnuts, no other nuts, no bowl.

COMPOSITION: Waist-up, figure about 70% of frame height. The palm of almonds and the lifted almond are centred and large. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the handful of almonds and the single lifted almond.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Only almonds.
- [ ] Matches hm-nuts.png framing so the existing circle crop logic still works.
- [ ] Nora matches hm-kiwi.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### N1 · `hm-acupuncture.png`

- **Used for:** acupuncture-migraine: *Try acupuncture for migraine*
- **Why it's needed:** No painting shows a practitioner-led session. The card is a course of sessions with a licensed acupuncturist, with no needling at home.
- **Attach:** hm-box-breath.png and hm-pleasant-plan.png (Priya identity), hm-bp-cuff.png (calm clinical tone), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: try acupuncture for migraine.

SCENE: Priya: a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; dark eyes, straight brows, a calm, quietly amused expression; slender build. Wardrobe: a sage-green crewneck sweater, sometimes under a butter-yellow cardigan, with cream or charcoal trousers. She lies back, relaxed, on a padded treatment couch upholstered in soft sage with a cream paper sheet and a small cream pillow under her head; her eyes are closed, face peaceful, hands resting loosely on her abdomen. A licensed acupuncturist (a NEW, one-off character: a man in his fifties with East Asian features, short greying black hair, calm attentive expression, a plain soft-blue clinical tunic with a blank badge) stands beside the couch, gently resting two fingers on her forearm as if checking she is comfortable. Needles are only barely suggested: three very fine, short, silver hair-lines at her forearm and one at her temple, no close-up, no blood, nothing alarming. The couch ends cleanly; no room shown.

COMPOSITION: Couch and both figures visible in a three-quarter view, about 75% of frame height. Priya's relaxed face and the practitioner's hand sit inside the central half. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: Priya's calm face and the practitioner's reassuring hand.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] It reads as a professional session, never as self-treatment.
- [ ] Needles are subtle, not the subject.
- [ ] Priya's bob matches hm-pleasant-plan.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.


---

## B · Circle icon improvement (optional)

### C1 · `hm-circle-after-meal-walk.png`

- **Used for:** walk-after-meals (48 px circle only): *Take short walks after a meal*
- **Why it's needed:** The current circle (Nora's walking shoe) reads as walking but has no meal cue.
- **Attach:** hm-green-walk.png (Nora's shoe: slate-blue slip-on, cream sole), hm-early-dinner.png (plate treatment)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: take short walks after a meal.

SCENE: An object-only circle icon painting, no person. A single slate-blue slip-on walking shoe with a cream rubber sole and cream laces (exactly as Nora wears in hm-green-walk.png), shown in side view mid-stride, toe tipped slightly down as if stepping forward, with a faint painted motion arc behind the heel. Up and to the right, smaller and quieter, a round cream ceramic dinner plate with a few crumbs and a fork laid diagonally across it, signalling 'just finished a meal'. The two objects are well separated with clear space between.

COMPOSITION: Everything sits inside a centred circle of 80% of the canvas diameter, with generous padding. The shoe is the dominant, largest shape; the plate is about half its size. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the walking shoe.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Both objects read at 48 px.
- [ ] No person, no ground line.
- [ ] Shoe colours match hm-green-walk.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.


---

## C · Replacements for 5.1 originals that weren't in the Drive folders

These pictures existed in 5.1 or in approved mockups, but they weren't in either Drive folder, so the prototype uses stand-ins. **Look for the originals first.** Use these prompts only if they are truly gone. For the goal tiles and the stopwatch, the approved designs belong to you; check each result against your memory of the approved version before replacing anything.

### S1 · `hm-mindfulness.png`

- **Used for:** mindfulness (replaces 02-Seated-mindfulness.png; stand-in today: hm-box-breath.png): *Mindfulness*
- **Why it's needed:** The original seated-mindfulness painting is missing. The stand-in is Priya's box-breathing pose, which also serves another card.
- **Attach:** hm-onb-welcome-back.png (Walter identity), hm-box-breath.png (cushion and pose treatment), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: mindfulness.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a soft lavender crewneck sweater and comfortable cream trousers, barefoot. He sits on a simple straight-backed warm-wood chair (not cross-legged, so the pose suits older adults), feet flat, back upright but relaxed, hands resting palms-down on his thighs. Eyes softly closed, a faint peaceful half-smile, shoulders dropped. Front three-quarter view, full figure including the chair and his feet.

COMPOSITION: Full figure and chair, about 80% of frame height. The face and resting hands are within the central half. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: his calm closed-eye face.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Different from Priya's box-breath pose (chair, not cushion).
- [ ] Feet and chair legs fully visible.
- [ ] Walter matches hm-onb-welcome-back.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### S2 · `hm-nap.png`

- **Used for:** nap (replaces 03-Resting.png; stand-in today: hm-moment-rest-day.png): *Short daytime nap*
- **Why it's needed:** The original resting painting is missing. The design brief describes Rest as a side-view upper body, eyes closed, head resting on the person's own folded hands, with no bed or pillow.
- **Attach:** hm-early-dinner.png (Ama identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: short daytime nap.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active. Side-view upper body only, facing right. Her head tilts and rests on her own two hands folded together beneath her cheek, as on a pillow; eyes softly closed, lashes visible, mouth relaxed in a hint of a smile. Shoulders soft. No bed, no pillow, no furniture, no moon or stars: just the person, resting.

COMPOSITION: Upper body (head to mid-chest), about 70% of frame height. The face and folded hands are centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the face resting on folded hands.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] No props at all.
- [ ] Peaceful, not ill or exhausted.
- [ ] Ama's sleek ponytail and hoops visible.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### T1 · `hm-stopwatch-base.png → sw-u5 / sw-5-10 / sw-10-20 / sw-20`

- **Used for:** Onboarding 'How much time do you have?' (four cards; stand-in today: flat SVG stopwatches): *Painted stopwatch*
- **Why it's needed:** The approved painted stopwatch set is missing. The decisions file specifies one upright slate-blue stopwatch with an ivory dial, rounded buttons and a red-tipped hand that advances clockwise across the four options.
- **Attach:** hm-kiwi.png (style anchor). If you still have the approved four-card time mockup, attach it; it takes priority over this description.

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: painted stopwatch.

SCENE: An object-only painting, no person. One modern, upright mechanical stopwatch seen straight on: a round slate-blue painted metal case with a softly bevelled rim, a rounded slate-blue crown button on top with a smaller rounded pusher at about the one o'clock position, and a small loop above the crown. An ivory dial with fine, evenly spaced dark-charcoal tick marks around the edge (longer marks at the quarters), NO numerals and no text. A single slim charcoal hand with a red tip, pivoting on a small central brass cap. Soft painted highlight on the upper left of the case, gentle form shading, matte. **Make the base image with the hand pointing straight up to 12.** Then create the four app files by rotating ONLY the hand in an editor (or ask your tool for four versions with everything else identical): sw-u5 with the hand at 30° (the one o'clock tick), sw-5-10 at 60° (two o'clock), sw-10-20 at 120° (four o'clock), sw-20 at 180° (six o'clock).

COMPOSITION: The stopwatch, including the top loop, fills about 70% of the canvas height, perfectly upright and centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the dial and red-tipped hand.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Identical stopwatch in all four files; only the hand changes.
- [ ] No numbers anywhere.
- [ ] Colours: slate-blue case, ivory dial, red-tipped hand.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### S3 · `priya-gentle.png`

- **Used for:** Activity screen · Keep it gentle (soft-blue card; stand-in today: hm-yoga.png): *Priya, standing side stretch*
- **Why it's needed:** The approved Priya standing side-stretch cut-out is missing.
- **Attach:** hm-pleasant-plan.png and hm-box-breath.png (Priya identity), hm-yoga.png (outfit), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: priya, standing side stretch.

SCENE: Priya: a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; dark eyes, straight brows, a calm, quietly amused expression; slender build. Wardrobe: a sage-green crewneck sweater, soft charcoal leggings and cream trainers. Full figure, front view, standing tall with feet hip-width apart. Her right arm reaches up and over her head in a gentle arc to the left, fingers long, while her left hand rests lightly on her left hip; her torso bends softly to the left in an easy side stretch, not a deep yoga bend. Face calm, eyes half-closed, a small content smile.

COMPOSITION: Full figure from raised fingertips to shoes, about 80% of frame height, centred, with the raised hand fully inside the frame. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the raised arm and gentle side bend.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Raised hand and both shoes fully visible (required by the activity card).
- [ ] Gentle, accessible stretch.
- [ ] Priya's bob matches hm-pleasant-plan.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### S4 · `p-strength.png`

- **Used for:** Activity screen · More effort (sage card; stand-in today: hm-circuit.png): *Marco lifting a dumbbell*
- **Why it's needed:** The approved V4 image of Marco lifting a dumbbell (with its closer crop) is missing.
- **Attach:** hm-cold-shower.png and hm-wall-sit.png (Marco identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: marco lifting a dumbbell.

SCENE: Marco: a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build. Wardrobe: an olive-green crewneck t-shirt, charcoal joggers and light-grey trainers. A closer three-quarter-length view, from the head down to mid-thigh, facing three-quarter left. He performs a biceps curl with his right arm: elbow tucked at his side, forearm raised so the hand is near shoulder height, gripping a hexagonal dumbbell with a dark charcoal head and a knurled chrome handle (no numbers on the head). His left arm hangs relaxed. Expression: focused, a little effort, a quiet smile. The biceps reads naturally strong, not bodybuilder.

COMPOSITION: Closer crop (head to mid-thigh), figure about 85% of frame height. The bent arm, face and dumbbell are all visible and clustered near the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the bent arm and dumbbell beside his face.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Bent arm, face and dumbbell all visible (decisions file requirement).
- [ ] Dumbbell has no weight number.
- [ ] Doesn't overpower the other three activity cards.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### S5 · `sam-seated.png`

- **Used for:** Activity screen · Stay seated (lavender card; stand-in today: hm-future.png): *Sam seated on a wooden chair, reading*
- **Why it's needed:** The approved Sam seated reading cut-out is missing.
- **Attach:** hm-recall.png and hm-future.png (Sam identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: sam seated on a wooden chair, reading.

SCENE: Sam: a man in his early sixties with light skin; wavy grey hair swept back from the forehead; round tortoiseshell glasses; a thoughtful, kindly face with smile lines. Wardrobe: a rust-red crewneck sweater over a light-blue collared shirt, grey trousers and brown leather shoes. Full figure, side three-quarter view facing left. He sits comfortably on a simple warm-wood ladder-back chair, one leg crossed loosely over the other at the ankle, holding an open hardback book (plain sage cover, no title) in both hands at chest height, reading with a soft absorbed smile, glasses on.

COMPOSITION: Full figure, chair and shoes fully visible, about 80% of frame height, centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: Sam reading the open book.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Chair legs and both shoes fully inside the frame.
- [ ] Book has no readable text.
- [ ] Sam matches hm-recall.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G1 · `goal-heart.png (5.1 key: onb-goal-heart)`

- **Used for:** Onboarding goal tile · Heart health (peach tile; stand-in today: a habit painting): *Goal tile: Heart health*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts (especially Walter's heart-health concept).
- **Attach:** hm-onb-welcome-back.png (primary), hm-prunes.png, hm-tai-chi.png (Walter identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: heart health.

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a soft-blue button-front overshirt over a cream t-shirt. He walks briskly toward the viewer's left in a gentle three-quarter profile, arms swinging, chest open, with a broad, healthy smile. One hand is lightly placed over his heart mid-stride, a warm, confident gesture of looking after his heart. Full figure. The figure must look good on a peach coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with peach.

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Walter matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G2 · `goal-sleep.png (5.1 key: p-sleep)`

- **Used for:** Onboarding goal tile · Sleep & recovery (plum tile; stand-in today: a habit painting): *Goal tile: Sleep & recovery*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-kiwi.png (primary), hm-nuts.png, hm-weighted-blanket.png, hm-sketch.png (Nora identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: sleep & recovery.

SCENE: Nora: a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings. Wardrobe: soft lavender cotton pyjamas with cream piping. Side view, upper body, she hugs a plump cream pillow to her chest, cheek resting on it, eyes closed, a contented sleepy smile. Only the pillow as a prop. The figure must look good on a plum coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with plum.

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Nora matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G3 · `goal-mood.png (5.1 key: p-calm)`

- **Used for:** Onboarding goal tile · Mood & stress (slate blue tile; stand-in today: a habit painting): *Goal tile: Mood & stress*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-pleasant-plan.png (primary), hm-box-breath.png, hm-moment-rest-day.png (Priya identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: mood & stress.

SCENE: Priya: a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; dark eyes, straight brows, a calm, quietly amused expression; slender build. Wardrobe: a sage-green crewneck sweater under a butter-yellow cardigan. Waist-up, front view, she takes a slow, easy breath: shoulders relaxed and slightly lifted, both hands resting open on her chest, eyes softly closed, peaceful smile. The figure must look good on a slate blue coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with slate blue.

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Priya matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G4 · `goal-energy.png (5.1 key: p-energy)`

- **Used for:** Onboarding goal tile · Energy & focus (butter tile; stand-in today: a habit painting): *Goal tile: Energy & focus*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-early-dinner.png (face), hm-heel-raise.png (full figure) (Ama identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: energy & focus.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a butter-yellow fitted long-sleeve top, navy leggings and blue-grey trainers. Full figure, mid-step on a bright morning walk: a springy, energetic stride, one arm swinging forward, chin up, a wide, awake smile. The figure must look good on a butter coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with butter.

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Ama matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G5 · `goal-strength.png (5.1 key: p-strength)`

- **Used for:** Onboarding goal tile · Strength (sage tile; stand-in today: a habit painting): *Goal tile: Strength*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-cold-shower.png (face), hm-wall-sit.png (full figure) (Marco identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: strength.

SCENE: Marco: a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build. Wardrobe: an olive-green crewneck t-shirt, charcoal joggers and light-grey trainers. Full figure, he rises from a deep squat to standing in a smooth, controlled bodyweight squat, arms extended forward for balance, focused smile. No equipment. The figure must look good on a sage coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with sage.

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Marco matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G6 · `goal-nutrition.png (5.1 key: cook / fruit)`

- **Used for:** Onboarding goal tile · Nutrition (butter (soft) tile; stand-in today: a habit painting): *Goal tile: Nutrition*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-new-conversation.png (primary), hm-soy.png (Theo identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: nutrition.

SCENE: Theo: a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build. Wardrobe: a soft blue knit sweater with a sage-green apron. Waist-up, he holds a shallow cream bowl heaped with colourful fresh food (a halved orange, cherry tomatoes, broccoli florets, a small bunch of grapes) toward the viewer with both hands, proud, warm smile. The figure must look good on a butter (soft) coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with butter (soft).

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Theo matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G7 · `goal-digestion.png (5.1 key: digestion)`

- **Used for:** Onboarding goal tile · Digestion (sage (soft) tile; stand-in today: a habit painting): *Goal tile: Digestion*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-recall.png (primary), hm-future.png (Sam identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: digestion.

SCENE: Sam: a man in his early sixties with light skin; wavy grey hair swept back from the forehead; round tortoiseshell glasses; a thoughtful, kindly face with smile lines. Wardrobe: a rust-red crewneck sweater over a light-blue collared shirt. Waist-up, seated, he lifts a cream ceramic bowl of oats topped with sliced banana and berries, spoon in hand, comfortable, pleased expression. The figure must look good on a sage (soft) coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with sage (soft).

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Sam matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### G8 · `goal-memory.png (5.1 key: reflect / milestone)`

- **Used for:** Onboarding goal tile · Memory (peach tile; stand-in today: a habit painting): *Goal tile: Memory*
- **Why it's needed:** The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts.
- **Attach:** hm-early-dinner.png (face), hm-heel-raise.png (full figure) (Ama identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: goal tile: memory.

SCENE: Ama: a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build. Wardrobe: a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active. Waist-up, seated, she pauses over an open notebook (blank pages, soft grey scribble lines only), pen lifted to her chin, gazing slightly upward with a bright, 'I remember!' smile. The figure must look good on a peach coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with peach.

COMPOSITION: The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the person's face and gesture.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Gesture reads at a small tile size.
- [ ] No props except those named.
- [ ] Ama matches the attached references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### R1 · `gift.png`

- **Used for:** Rewards screen hero and reward cards (stand-in today: soft placeholder): *Man opening a gift*
- **Why it's needed:** The 5.1 rewards hero is missing. Note: the original design brief asks for rewards to be drawn in code with no raster gift-card art. A person-led celebratory moment fits that rule better than a painting of a gift card, which is why this prompt shows a person and a plain box.
- **Attach:** hm-new-conversation.png (Theo identity), hm-kiwi.png (style anchor)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: man opening a gift.

SCENE: Theo: a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build. Wardrobe: a soft blue knit crewneck sweater and charcoal trousers. Waist-up, front three-quarter view. He holds a small square gift box (sage-green box, cream ribbon tied in a bow, ribbon now loosened) and lifts the lid with his right hand, peeking in with a delighted, genuinely surprised smile, eyebrows raised. No gift card, no money, no logos visible; the contents stay out of sight.

COMPOSITION: Waist-up, figure about 70% of frame height. The opening box and his face form the centre. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the opening gift box.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] No gift card, cash, points or logos.
- [ ] Joyful but not exaggerated.
- [ ] Theo matches hm-new-conversation.png.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.


---

## D · Optional polish

### O1 · `hm-strength-row-walter.png`

- **Used for:** resistance-sarcopenia: *Seated elastic-band row (older adult)*
- **Why it's needed:** The current hm-strength-row.png shows Marco, who is much younger than the studied older adults.
- **Attach:** hm-strength-row.png (exact pose, chair, angle, framing), hm-onb-welcome-back.png (Walter identity)

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: seated elastic-band row (older adult).

SCENE: Walter: a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; kind, crinkled eyes and a broad warm smile; solid, healthy older build. Wardrobe: a navy crewneck t-shirt, grey trousers and white trainers. Repaint hm-strength-row.png with Walter: same warm-wood chair, same side angle and scale. He sits upright with legs extended, a sage-green elastic resistance band looped around the soles of both feet; both hands pull the band ends back to his waist, elbows bent and tucked, shoulder blades drawn together, back straight, a determined, comfortable expression.

COMPOSITION: Match hm-strength-row.png framing exactly. Hands, band and torso centred. The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: hands pulling the band to the waist.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Same chair and framing as hm-strength-row.png.
- [ ] Band clearly loops the feet.
- [ ] Walter matches references.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### O2a · `hm-reward-coffee.png`

- **Used for:** Rewards · example redemption category tile (proposal; pending decisions on gift-card partners): *Coffee reward tile*
- **Why it's needed:** The three generic redemption icons were to become matching painted still lifes. Make all three in one session so they match.
- **Attach:** hm-kiwi.png and hm-nuts.png (how objects are painted in this set). Attach the other reward tiles once made.

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: coffee reward tile.

SCENE: An object-only still life, no person, no hands: a round cream ceramic cup with a curved handle on a matching saucer, filled with coffee, with three soft curls of painted steam rising. Simple, slightly three-quarter viewpoint from just above, warm soft light from the upper left. No brand marks, no text, no price tags.

COMPOSITION: The object sits inside a centred circle of 80% of the canvas diameter; same scale and padding across all three reward tiles (they display at 56 px). The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the single object.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Matches the other two reward tiles in scale, angle and light.
- [ ] Reads at 56 px.
- [ ] No text or logos.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### O2b · `hm-reward-books.png`

- **Used for:** Rewards · example redemption category tile (proposal; pending decisions on gift-card partners): *Books reward tile*
- **Why it's needed:** The three generic redemption icons were to become matching painted still lifes. Make all three in one session so they match.
- **Attach:** hm-kiwi.png and hm-nuts.png (how objects are painted in this set). Attach the other reward tiles once made.

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: books reward tile.

SCENE: An object-only still life, no person, no hands: two closed hardback books stacked slightly offset, the top one sage green and the bottom one terracotta, with plain spines (no titles) and a thin butter-yellow ribbon bookmark trailing out. Simple, slightly three-quarter viewpoint from just above, warm soft light from the upper left. No brand marks, no text, no price tags.

COMPOSITION: The object sits inside a centred circle of 80% of the canvas diameter; same scale and padding across all three reward tiles (they display at 56 px). The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the single object.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Matches the other two reward tiles in scale, angle and light.
- [ ] Reads at 56 px.
- [ ] No text or logos.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.

### O2c · `hm-reward-groceries.png`

- **Used for:** Rewards · example redemption category tile (proposal; pending decisions on gift-card partners): *Groceries reward tile*
- **Why it's needed:** The three generic redemption icons were to become matching painted still lifes. Make all three in one session so they match.
- **Attach:** hm-kiwi.png and hm-nuts.png (how objects are painted in this set). Attach the other reward tiles once made.

**Prompt (copy everything in the box):**

```text
Painted editorial illustration for the Humanology health app: groceries reward tile.

SCENE: An object-only still life, no person, no hands: an upright kraft-brown paper grocery bag with folded top edge, with a red apple, a few leafy greens and a baguette end peeking out. Simple, slightly three-quarter viewpoint from just above, warm soft light from the upper left. No brand marks, no text, no price tags.

COMPOSITION: The object sits inside a centred circle of 80% of the canvas diameter; same scale and padding across all three reward tiles (they display at 56 px). The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, because the app also shows this painting as a 48 px circle; it must still read at that size. Key detail for the circle: the single object.

STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, washed-out or neon, and never tinted green overall.

FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly.

AVOID: text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon.
```

**Check before accepting:**
- [ ] Matches the other two reward tiles in scale, angle and light.
- [ ] Reads at 56 px.
- [ ] No text or logos.
- [ ] Transparent background, no caption strip, nothing touching the edges.
- [ ] Hands correct (five fingers each), no text anywhere.
