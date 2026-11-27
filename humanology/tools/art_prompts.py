#!/usr/bin/env python3
"""Generate humanology/ART-PROMPTS.md: one complete, copy-ready prompt per missing picture."""
import sys

OUT = sys.argv[1]

STYLE = (
    "STYLE: Contemporary, lifelike editorial illustration painted in opaque acrylic with oil-like colour modelling, "
    "in the warm, observant spirit of Norman Rockwell-inspired magazine illustration but with a clean modern look. "
    "Confident, visible, controlled brushstrokes; broad matte painted forms; soft internal transitions with a clean, "
    "deliberate outer silhouette. No outlines, no ink lines, no cel shading. Natural adult anatomy and believable "
    "facial structure, simplified just enough to read as illustration. Faces and hands are carefully drawn, with "
    "restrained painted highlights. Matte finish throughout: no glossy skin, no photographic pores, no lens blur, "
    "no cinematic rim light, no dramatic spotlight. Lighting is warm, soft and diffuse from the upper left, with gentle "
    "form shadows on the figure and props only. Clothing is clean, contemporary and neatly kept, with modelled folds. "
    "Colour is rich but restrained: natural, nuanced skin tones and garment colours drawn from the Humanology family of "
    "sage green, warm peach, soft blue, lavender, butter yellow, terracotta, berry and cream, plus warm wood and ivory "
    "for props. Enough contrast that the figure stays present on a white or pale-sage app background; never pale, "
    "washed-out or neon, and never tinted green overall."
)

FORMAT = (
    "FORMAT: Square 1536 x 1536 px PNG. The subject is an isolated cut-out on a FULLY TRANSPARENT background (true alpha): "
    "no room, no wall, no floor plane, no horizon, no ground shadow, no vignette, no frame, no border, and NO caption strip "
    "or white band at the bottom. Only the furniture or props named in this prompt may appear, and they end cleanly at their "
    "own edges like the rest of the cut-out. Leave even transparent padding of roughly 6-8% on every side so nothing "
    "touches the canvas edge (hair, fingertips, shoes and chair legs fully inside). If your tool cannot output transparency, "
    "paint on a single flat, perfectly even pure white (#FFFFFF) with no texture or shadow so the background can be removed cleanly."
)

NEGATIVE = (
    "text, letters, words, numbers, numerals, labels, brand names, logos, watermark, signature, caption, caption strip, "
    "white band, speech bubble, user interface, app screen with readable content, border, frame, background scene, room, "
    "wall, floor, ground shadow, cast shadow, vignette, photorealistic, photograph, 3D render, CGI, plastic skin, glossy skin, "
    "anime, manga, cartoon outlines, flat vector, watercolor wash, pencil sketch, sepia, grunge, distressed paper texture, "
    "extra fingers, missing fingers, fused fingers, extra limbs, distorted hands, crossed eyes, duplicated person, "
    "cropped head, cropped feet (unless the prompt asks for a crop), blurry, low resolution, oversaturated, neon"
)

# ---------------------------------------------------------------- cast bible
CAST = {
 "Nora": dict(
   ref="hm-kiwi.png (primary), hm-nuts.png, hm-weighted-blanket.png, hm-sketch.png",
   look="a woman in her early thirties with light, warm-toned skin and a soft scatter of freckles across her nose and cheeks; "
        "voluminous shoulder-length curly auburn-brown hair with defined ringlets; warm brown eyes; an easy, open smile; small gold hoop earrings",
   wear="an oversized olive-sage crewneck knit sweater (sleeves often pushed up) and dark-wash blue jeans"),
 "Ama": dict(
   ref="hm-early-dinner.png (face), hm-heel-raise.png (full figure)",
   look="a Black woman in her early thirties with warm medium-deep brown skin; dark hair with a centre part pulled back into a smooth, sleek low ponytail; "
        "softly rounded face, warm dark eyes, calm composed smile; small gold hoop earrings; slim, ordinary build",
   wear="a berry-plum blouse with gathered sleeves (or a fitted berry long-sleeve top), with navy leggings and blue-grey trainers when active"),
 "Walter": dict(
   ref="hm-onb-welcome-back.png (primary), hm-prunes.png, hm-tai-chi.png",
   look="a Black man in his late sixties with medium-brown skin; short, close-cropped grey curly hair; a neat, full grey-and-white beard; "
        "kind, crinkled eyes and a broad warm smile; solid, healthy older build",
   wear="a cream cable-knit crewneck sweater and khaki trousers"),
 "Priya": dict(
   ref="hm-pleasant-plan.png (primary), hm-box-breath.png, hm-moment-rest-day.png",
   look="a woman in her late thirties with light olive skin; glossy black chin-length bob with a soft side part and a slight inward curl at the ends; "
        "dark eyes, straight brows, a calm, quietly amused expression; slender build",
   wear="a sage-green crewneck sweater, sometimes under a butter-yellow cardigan, with cream or charcoal trousers"),
 "Theo": dict(
   ref="hm-new-conversation.png (primary), hm-soy.png",
   look="a man in his mid-thirties with light skin; thick, tousled wavy dark-brown hair; a short, full dark-brown beard; warm brown eyes and an easy, relaxed expression; average build",
   wear="a soft blue knit crewneck sweater and charcoal trousers"),
 "Marco": dict(
   ref="hm-cold-shower.png (face), hm-wall-sit.png (full figure)",
   look="a man in his mid-twenties with light olive skin; short, curly brown hair; light stubble; an open, cheerful face; fit but ordinary, non-bodybuilder build",
   wear="an olive-green crewneck t-shirt, charcoal joggers and light-grey trainers"),
 "Sam": dict(
   ref="hm-recall.png (primary), hm-future.png",
   look="a man in his early sixties with light skin; wavy grey hair swept back from the forehead; round tortoiseshell glasses; a thoughtful, kindly face with smile lines",
   wear="a rust-red crewneck sweater over a light-blue collared shirt"),
}

def who(name, wear=None):
    c = CAST[name]
    return f"{name}: {c['look']}. Wardrobe: {wear or c['wear']}."

# ---------------------------------------------------------------- prompts
# Each item: id, file, slot, title, why, attach, scene, comp, checks
P = []
def add(**k): P.append(k)

CIRCLE = ("The single most important detail (named below) sits inside the central 50% of the square, large and uncluttered, "
          "because the app also shows this painting as a 48 px circle; it must still read at that size.")

# ===================== Section A: habit cards with no painting
SEC_A = "A · Habit cards that have no painting (required)"

add(sec=SEC_A, id="W1", file="hm-water-premeal.png", slot="water-premeal",
    title="Drink water before meals in a structured weight program",
    why="No painting shows plain water. The study protocol is a large glass (about 500 mL) of water drunk before a main meal.",
    attach="hm-onb-welcome-back.png and hm-prunes.png (Walter identity), hm-early-dinner.png (table and plate treatment), hm-kiwi.png (style anchor)",
    scene=f"{who('Walter')} He is seated at the near edge of a small round warm-wood dining table, shown from the chest up in a gentle three-quarter view facing left. "
          "In his right hand he raises a tall, plain, perfectly clear drinking glass filled almost to the top with clear water, about to take a sip; the glass is "
          "noticeably large (a pint-sized tumbler) to suggest 500 mL. His left hand rests flat and relaxed on the table beside a waiting dinner: a cream ceramic plate "
          "holding a modest, colourful meal (grilled fish, green beans, a small portion of brown rice) with a fork resting on the rim, untouched. "
          "His expression is patient and content, eyes on the glass: the moment reads as 'water first, then the meal'. The water is completely clear: no lemon, "
          "no ice, no bubbles, no tint. Show soft painted reflections in the glass, a slight refraction of his fingers through the water, and a gentle highlight on the rim.",
    comp="Waist-up figure filling about 70% of the frame height. The raised glass and his hand sit just left of centre. The plate sits lower right and is cropped by nothing.",
    focal="the clear glass of water in his hand",
    checks=["Water is unmistakably plain and clear.", "The plate is visibly untouched (the drink comes before the meal).", "Walter matches hm-onb-welcome-back.png: beard, hair, cream knit."])

add(sec=SEC_A, id="W2", file="hm-water-cystitis.png", slot="cystitis",
    title="Add water for recurrent cystitis prevention",
    why="No painting shows plain water. The trial added 1.5 L of water a day on top of usual intake, so the picture shows steady, all-day water drinking with a refillable bottle, not anything clinical.",
    attach="hm-early-dinner.png and hm-heel-raise.png (Ama identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Ama')} She stands at waist height in a relaxed three-quarter view facing right, mid-day, as if at a kitchen counter or desk (no counter shown). "
          "In her left hand she holds a large, simple, clear refillable water bottle (about 1.5 litres, smooth plain body, soft sage-green screw cap, no markings or measurement lines) "
          "tilted toward a plain clear drinking glass in her right hand, topping the glass up with clear water; a short clean stream of water is visible between bottle and glass. "
          "Her expression is calm and self-assured, a small easy smile, eyes on the glass. Everything feels ordinary and everyday: no medical items, no bathroom, no body focus.",
    comp="Waist-up, figure about 70% of frame height. The bottle-to-glass pour is centred.",
    focal="the pour from bottle into glass",
    checks=["Bottle and glass are plain, unbranded, clear water only.", "Nothing clinical or bodily is shown.", "Ama's sleek low ponytail and gold hoops are present."])

add(sec=SEC_A, id="A1", file="hm-stairs.png", slot="stairs",
    title="Choose a stair-climbing routine",
    why="The 5.1 painting (05-taking-the-stairs.png) is not available. The studied schedules are short, fast stair climbs, and the single-session trial was in young men, so Marco suits it.",
    attach="hm-wall-sit.png and hm-cold-shower.png (Marco identity), hm-intervals.png (energy of movement), hm-kiwi.png (style anchor)",
    scene=f"{who('Marco')} He climbs a short, free-standing block of five plain warm-oak indoor stairs, briskly and with purpose, seen from the side in a slight three-quarter view, "
          "stairs rising from left to right. His leading right foot lands on the fourth step with the heel lifted on the trailing foot; his body leans slightly forward, "
          "arms swinging naturally (left arm forward), and his right hand hovers just above a simple round wooden handrail on slim posts. Expression focused and energised, "
          "mouth slightly open with effort, a faint flush in his cheeks; no sweat-soaked clothing. The stair block is a neat cut-out object: treads, risers and the rail are shown, "
          "it ends cleanly at the bottom and top, and there is no surrounding stairwell or wall.",
    comp="Full figure and full stair block visible, figure about 75% of frame height. The leading foot on the step is just below centre.",
    focal="the leading foot striking the step and his forward-leaning stride",
    checks=["Clearly climbing fast (not a stroll).", "Both feet, all steps and the rail are inside the frame.", "Marco's olive tee, charcoal joggers and grey trainers match hm-wall-sit.png."])

add(sec=SEC_A, id="N2", file="hm-stair-walk-easy.png", slot="stair-walk-energy",
    title="Walk the stairs for energy",
    why="This card currently shows a placeholder. It can share A1, but the card asks for an EASY ten-minute stair walk, and the study was in young women, so a separate, gentler painting fits better.",
    attach="hm-kiwi.png and hm-weighted-blanket.png (Nora identity), hm-green-walk.png (Nora walking gait), hm-stairs.png (A1, if made, to match the stair block)",
    scene=f"{who('Nora', 'an oversized olive-sage crewneck knit sweater with the sleeves pushed up, dark-wash jeans and slate-blue slip-on trainers with cream soles')} "
          "She walks up a short, free-standing block of five plain warm-oak indoor stairs at an unhurried, comfortable pace, seen from the side in a slight three-quarter view, "
          "stairs rising from left to right. Her right hand rests lightly on a simple round wooden handrail; her left foot is on the second step and her right foot is lifting to the third. "
          "Upright posture, relaxed shoulders, a light, refreshed half-smile, as if shaking off an afternoon slump. Her curls bounce slightly. "
          "The stair block is the same design as A1 if A1 exists: treads, risers and the rail only, no stairwell, no wall.",
    comp="Full figure and full stair block visible, figure about 75% of frame height. Her hand on the rail and the stepping foot are near the centre.",
    focal="her hand on the rail and the easy step",
    checks=["Pace reads as easy and pleasant, not athletic.", "Hand is ON the rail (safety).", "Nora's curls, freckles and sage sweater match hm-kiwi.png."])

add(sec=SEC_A, id="A2", file="hm-drink-swap.png", slot="drink-swap",
    title="Replace a sugary drink with water",
    why="The card asks for a visible swap: a sugary drink set aside, plain water chosen instead.",
    attach="hm-new-conversation.png (Theo identity), hm-evening-drink.png (drink handling), hm-kiwi.png (style anchor)",
    scene=f"{who('Theo')} Waist-up, three-quarter view facing left. In his right hand he lifts a clear glass of plain water toward himself, holding it slightly higher, "
          "the obvious choice. With his left hand he is setting down, and letting go of, a plain aluminium can of fizzy soft drink in a solid muted terracotta colour with "
          "no text, logo, stripes or graphics; a few tiny bubbles show at its open tab. The can is placed on a small round warm-wood side-table top that ends cleanly "
          "(only the table top and a short stub of its leg are shown). His glance is on the water and his expression is easy and good-humoured, not preachy.",
    comp="Waist-up, figure about 70% of frame height. The water glass is the dominant prop in the centre; the can sits lower and slightly behind.",
    focal="the clear glass of water",
    checks=["The can is completely unbranded.", "Water is clear, no ice or lemon.", "Theo's blue knit sweater and beard match hm-new-conversation.png."])

add(sec=SEC_A, id="A3", file="hm-caffeine-earlier.png", slot="caffeine",
    title="Move caffeine earlier",
    why="The only drink painting, hm-tea.png, shows red hibiscus tea, which has no caffeine. The card is about having the last coffee or tea earlier in the day.",
    attach="hm-onb-welcome-back.png (Walter identity), hm-tea.png (mug handling pose), hm-kiwi.png (style anchor)",
    scene=f"{who('Walter', 'a soft green button-front overshirt over a cream t-shirt, and khaki trousers')} "
          "He sits at a small round warm-wood table in bright morning light, waist-up, three-quarter view facing right. Both hands cradle a cream ceramic mug of dark black "
          "coffee with soft curls of steam rising. On the table beside the mug stands a small round analogue desk clock with a cream face, simple tick marks only (no numerals), "
          "its hands showing about ten o'clock in the morning. Morning cues: a crisp, cool-warm daylight tone, a small plate with half a slice of toast. "
          "His expression is calm and satisfied, enjoying the coffee early in the day.",
    comp="Waist-up, figure about 70% of frame height. The mug and hands are centred; the clock sits to the lower left of the mug, clearly readable as a clock.",
    focal="the steaming coffee mug in his hands",
    checks=["The drink reads as coffee (dark, steaming), not tea.", "The clock has no numerals; hands at about 10:00.", "Morning, not evening, mood."])

add(sec=SEC_A, id="A4", file="hm-sunscreen.png", slot="sunscreen",
    title="Use sunscreen daily",
    why="No painting shows sunscreen.",
    attach="hm-kiwi.png (Nora identity and style anchor)",
    scene=f"{who('Nora', 'a short-sleeved sage-green linen shirt, dark-wash jeans and a woven straw sun hat pushed back on her curls')} "
          "Waist-up, three-quarter view facing right, outdoors-in-summer mood shown only through warm, bright light on her skin (no scenery). "
          "She smooths a generous stripe of white sunscreen along the top of her bare left forearm with the fingertips of her right hand; a little unblended cream is visible. "
          "Her left hand loosely holds a plain white squeeze tube with a peach flip cap, no text or symbols. A faint sheen where the lotion is spread. "
          "Expression: relaxed, routine, a light smile.",
    comp="Waist-up, figure about 70% of frame height. Forearm, fingertips and tube are centred.",
    focal="fingertips spreading the white sunscreen on the forearm",
    checks=["Tube has no lettering, SPF number or logo.", "The white lotion is visible on the skin.", "Nora's freckles and curls match hm-kiwi.png."])

add(sec=SEC_A, id="A5", file="hm-water-flosser.png", slot="water-flosser",
    title="Clean between your teeth daily",
    why="No painting shows interdental cleaning. The trials used powered water flossers.",
    attach="hm-recall.png and hm-future.png (Sam identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Sam')} He leans slightly forward over a small, plain white wall-hung bathroom basin (only the basin and its chrome tap are shown, no wall). "
          "Side three-quarter view facing left. He holds the slim white handle of a countertop water flosser in his right hand, the narrow angled tip resting between his lower teeth, "
          "lips slightly parted around the tip. The compact white base unit with a clear water reservoir and a coiled white hose sits on the basin edge. "
          "His glasses stay on; his expression is concentrated but relaxed. No spray or mess, at most a tiny, tasteful suggestion of water in the basin.",
    comp="Head, shoulders, hands, basin and device visible; figure about 70% of frame height. Hand, tip and mouth are centred.",
    focal="the flosser tip at his teeth",
    checks=["Device is unbranded, white, no buttons with symbols.", "Dignified, not grimacing.", "Sam's tortoiseshell glasses and rust sweater match hm-recall.png."])

add(sec=SEC_A, id="A6", file="hm-powered-toothbrush.png", slot="toothbrush",
    title="Use a powered toothbrush",
    why="No painting shows a powered toothbrush.",
    attach="hm-cold-shower.png (Marco identity: face, towel), hm-kiwi.png (style anchor)",
    scene=f"{who('Marco', 'an olive-green crewneck t-shirt, with a cream towel draped over his left shoulder')} "
          "Morning routine, waist-up, three-quarter view facing left. He brushes with a powered electric toothbrush held in his right hand: a chunky white handle with one "
          "round soft-blue power button (no icons) and a small round brush head at his teeth, a little white foam at the corner of his mouth. His left hand rests on his hip. "
          "Eyes bright and awake, a crinkle of a smile around the brush.",
    comp="Waist-up, figure about 70% of frame height. The toothbrush handle and hand are the dominant shape in the centre.",
    focal="the white powered toothbrush and the hand holding it",
    checks=["Clearly electric (thick handle, round head), not a manual brush.", "No branding.", "Marco's curls and stubble match hm-cold-shower.png."])

add(sec=SEC_A, id="A7", file="hm-social-break.png", slot="social-break",
    title="Take a week off social media",
    why="hm-pleasant-plan.png shows a calendar but no phone set aside. The card is a seven-day break from social media while still keeping in touch another way.",
    attach="hm-pleasant-plan.png and hm-box-breath.png (Priya identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Priya', 'a sage-green crewneck sweater under a butter-yellow cardigan, and cream trousers')} "
          "She sits at a small warm-wood table, waist-up, seen in three-quarter view from slightly above. With her right hand she sets her smartphone face-down on the table, "
          "fingers just letting go. Next to it lies a small paper desk calendar strip with a row of seven blank day squares; a soft pencil tick sits in the first square and a "
          "light pencil line runs across all seven (no words, numbers or month names). Her left hand holds a warm-white ceramic mug. A folded handwritten note card in a cream envelope "
          "sits at the table edge as a quiet 'staying in touch another way' cue (no writing visible). Expression: lightly relieved, a calm small smile, shoulders relaxed.",
    comp="Waist-up, figure about 70% of frame height. The face-down phone and her letting-go hand are centred; calendar strip just below.",
    focal="the phone placed face-down",
    checks=["Phone is clearly face-down (screen hidden).", "Calendar has no readable text or numerals.", "Priya's bob and cardigan match hm-pleasant-plan.png."])

add(sec=SEC_A, id="A8", file="hm-screen-cap.png", slot="screen-cap",
    title="Set a daily phone screen-time cap",
    why="No painting shows a phone time limit being set. The studied cap was two hours a day.",
    attach="hm-new-conversation.png (Theo identity), hm-blue-glasses.png (how phones are painted in this set), hm-kiwi.png (style anchor)",
    scene=f"{who('Theo')} Close waist-up view, front three-quarter facing right. He holds a smartphone upright in his left hand at chest height, screen turned partly toward "
          "the viewer, and taps it with his right index finger. The screen shows only a simple, abstract graphic: a soft peach hourglass shape above one horizontal slider bar "
          "with a round handle about a third of the way along, on a cream screen. No text, no numbers, no app icons, no status bar. A soft glow from the screen lights his fingertip. "
          "His expression is decisive and slightly amused, as if he just set a sensible limit.",
    comp="Waist-up, figure about 70% of frame height. Phone and fingertip in the exact centre.",
    focal="the phone with the hourglass and slider",
    checks=["Screen contains no readable text or numbers.", "Hourglass and slider read at small size.", "Theo matches hm-new-conversation.png."])

add(sec=SEC_A, id="A9", file="hm-standing-stockings.png", slot="standing-stockings",
    title="Use fitted stockings during standing shifts",
    why="No painting shows compression stockings. The studies were in healthcare workers and hairdressers on long standing shifts.",
    attach="hm-heel-raise.png and hm-early-dinner.png (Ama identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Ama', 'a soft-blue short-sleeved healthcare scrub dress that ends just below the knee, with a small blank fabric name badge (no writing), and comfortable navy slip-resistant work shoes')} "
          "Full figure from the side, at the start of a shift. Her right foot rests on a low, plain wooden step stool; she bends forward slightly and, with both hands, smooths the top band "
          "of a beige, knee-high graduated compression stocking just below her right knee, fingers flattening the fabric so it sits without wrinkles. Her left leg, standing on the floor line, "
          "wears the matching beige knee-high stocking. The stockings look like real medical compression wear: smooth, matte, slightly opaque, a defined top band. "
          "Expression: practical and composed, a small confident smile.",
    comp="Full figure, about 80% of frame height, stool included. The hands at the stocking band are close to the centre.",
    focal="both hands smoothing the stocking's top band below the knee",
    checks=["Stockings are knee-high, beige and smooth (not tights or socks).", "Both legs show stockings.", "No logos on the scrubs; badge blank."])

add(sec=SEC_A, id="A10", file="hm-flight-stockings.png", slot="flight-stockings",
    title="Wear fitted stockings on a long flight",
    why="hm-travel-sleep.png shows an aeroplane seat but long trousers, so no stockings can be seen. The studies used below-knee stockings on long-haul flights.",
    attach="hm-travel-sleep.png (seat and window treatment to reuse), hm-pleasant-plan.png (Priya identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Priya', 'a sage-green crewneck sweater, cropped cream trousers ending mid-calf, and flat navy slip-on shoes')} "
          "She sits in an aeroplane window seat, shown from the side: the seat is a soft-blue upholstered airline seat with a headrest cover, and an oval aeroplane window with soft daylight "
          "sits just behind her, treated exactly as in hm-travel-sleep.png. She leans forward and, with both hands, smooths the top of a beige below-knee compression stocking on her right "
          "lower leg; both lower legs and both stockings are fully visible between the cropped trouser hems and the shoes. A neck pillow in peach rests on her shoulders. "
          "Expression: calm, organised traveller. The seat and window end cleanly; no cabin, no other passengers.",
    comp="Seat and full figure visible, about 80% of frame height. Lower legs, stockings and hands are near the centre.",
    focal="hands smoothing the stocking on the lower leg",
    checks=["Stockings visibly below-knee and beige.", "Window and seat match hm-travel-sleep.png.", "No text on the seat or window."])

add(sec=SEC_A, id="A11", file="hm-bedtime-phone.png", slot="bedtime-phone",
    title="Put your phone away before bed",
    why="The 5.1 painting (06-taking-a-screen-break.png) is not available, and hm-blue-glasses.png shows the opposite action (phone use in bed). The trial asked people to put the phone away for the last 30 minutes before bed.",
    attach="hm-kiwi.png (Nora identity), hm-dim-light.png and hm-bed-cue.png (evening light and bedding treatment)",
    scene=f"{who('Nora', 'soft berry-coloured cotton pyjamas with a cream piped collar')} She sits on the edge of a bed (only the bed edge, a cream duvet and a sage pillow are shown) "
          "beside a small warm-wood bedside table, side three-quarter view facing right, in low warm lamplight. A small table lamp with a linen shade glows amber. "
          "With her right hand she lowers her smartphone, screen dark, face-down into a small open wooden box with a lid propped open on the bedside table; her fingers are just releasing it. "
          "A closed paperback book (plain cover, no title) rests on the table beside the box. Her expression is unwinding and contented, eyelids slightly heavy. Calm, night-time mood.",
    comp="Upper body, bed edge and bedside table visible, figure about 70% of frame height. Hand, phone and box are centred.",
    focal="the phone going face-down into the wooden box",
    checks=["Screen is off and the phone is going away, not being used.", "Warm lamplight but no dark room background.", "Nora's curls and freckles match."])

add(sec=SEC_A, id="A12", file="hm-blink.png", slot="blink",
    title="Practise complete blinks",
    why="No painting shows the blink exercise (gently close, squeeze, open). The squeeze moment is the clearest to paint.",
    attach="hm-recall.png and hm-future.png (Sam identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Sam')} Close head-and-shoulders portrait, front three-quarter view facing left, seated at a desk; only the top edge of an open silver laptop lid is visible at the bottom corner. "
          "He has gently closed his eyes fully in a soft, deliberate squeeze: eyelids sealed, a few soft crease lines at the outer corners, brows relaxed and NOT furrowed, mouth calm. "
          "His tortoiseshell glasses stay on. One hand is lifted lightly near his cheek, fingers relaxed, not touching the eye. "
          "The mood is a restful pause from the screen, not pain or a headache.",
    comp="Head and shoulders fill about 75% of frame height. The face and closed eyes are the centre.",
    focal="the gently squeezed, fully closed eyes",
    checks=["Eyes completely closed; reads as a gentle squeeze, not a wince.", "No eye-rubbing.", "Sam matches hm-recall.png."])

add(sec=SEC_A, id="A13", file="hm-apples.png", slot="apples",
    title="Try two whole apples daily",
    why="hm-mix-study.png shows a picture card of an apple, not real apples. The trial was two whole apples a day in adults around age 51.",
    attach="hm-prunes.png and hm-onb-welcome-back.png (Walter identity), hm-kiwi.png (two-fruit composition and style anchor)",
    scene=f"{who('Walter')} Waist-up, front three-quarter view facing right, smiling warmly. He holds two whole, glossy red-and-green apples at chest height, one resting in each open palm, "
          "hands slightly apart and offered toward the viewer. The apples are clearly two separate whole fruits, each with a short brown stem (one also carries a small green leaf), natural speckles "
          "and a soft painted highlight. Fingers curve naturally around the fruit. Expression: generous, cheerful, 'two a day'.",
    comp="Waist-up, figure about 70% of frame height. The two apples and hands are large and centred, mirroring the two-kiwi composition of hm-kiwi.png.",
    focal="the two whole apples in his palms",
    checks=["Exactly two whole apples, no slices.", "Apples read clearly at 48 px.", "Walter's cream cable-knit matches hm-onb-welcome-back.png."])

add(sec=SEC_A, id="A14", file="hm-hummus.png", slot="hummus",
    title="Try an afternoon hummus snack",
    why="No painting shows hummus. The tested snack was hummus with pretzels in the mid-afternoon.",
    attach="hm-early-dinner.png (Ama identity and table treatment), hm-kiwi.png (style anchor)",
    scene=f"{who('Ama')} She sits at a small warm-wood table in soft afternoon light, waist-up, three-quarter view seen from slightly above. "
          "In front of her is a shallow, round, cream-glazed ceramic bowl of smooth beige hummus with a spiral swirl, a small pool of golden olive oil and a dusting of paprika. "
          "Beside it lies a small pile of classic twisted pretzels (about six). Her right hand dips one pretzel into the hummus; her left hand rests by a glass of water. "
          "Expression: relaxed, enjoying a mid-afternoon break.",
    comp="Waist-up, figure about 70% of frame height. Bowl, pretzel and fingers centred.",
    focal="the pretzel dipping into the hummus bowl",
    checks=["Pretzels are recognisable twists.", "Hummus reads as hummus (beige, swirled, oil).", "Ama matches hm-early-dinner.png."])

add(sec=SEC_A, id="A15", file="hm-volunteer.png", slot="volunteer",
    title="Try a structured volunteering session",
    why="No painting shows volunteering. The studied volunteers were aged 59 to 79, helping nursing-home residents in structured sessions.",
    attach="hm-onb-welcome-back.png and hm-prunes.png (Walter identity), hm-puzzle.png (jigsaw treatment), hm-kiwi.png (style anchor)",
    scene=f"{who('Walter')} He is the volunteer. He sits beside a nursing-home resident at a small round table, the two of them working on a large-piece jigsaw puzzle together. "
          "The resident is a NEW, one-off character: a very elderly white-haired woman in her late eighties with fair, softly lined skin, short soft white curls, pearl stud earrings, "
          "a lavender cardigan over a cream blouse, seated in a high-backed armchair with soft-blue upholstery (only the chair is shown). She holds up one large puzzle piece, delighted; "
          "Walter leans in, pointing gently to where it fits, sharing a warm laugh. Walter wears a plain lanyard with a small blank volunteer badge (no writing). "
          "The puzzle shows an abstract pastel landscape in sage, butter and soft blue, half finished, large pieces. Two figures, waist-up, three-quarter view.",
    comp="Both figures waist-up, filling about 70% of frame height. Their hands and the puzzle piece meet in the centre.",
    focal="the two pairs of hands over the puzzle piece",
    checks=["The resident is clearly older than Walter and is a different person from the cast.", "Badge blank, no text anywhere.", "Warm, dignified, not patronising."])

add(sec=SEC_A, id="A16", file="hm-psyllium.png", slot="psyllium",
    title="Use psyllium regularly",
    why="hm-supplement.png shows a bottle being read, not psyllium mixed into water. Each dose is taken with at least a full glass of water.",
    attach="hm-new-conversation.png (Theo identity), hm-soy.png (kitchen working hands), hm-kiwi.png (style anchor)",
    scene=f"{who('Theo')} He stands at a short section of warm-wood kitchen counter top (only the counter top edge shown), waist-up, three-quarter view facing left. "
          "With his right hand he stirs a teaspoon in a tall, full, clear glass of water into which a heaped spoonful of fine beige psyllium powder has just gone: a visible cloudy "
          "beige swirl spirals through the water. Beside the glass stands a small, plain, wide-mouthed glass jar with a cork lid, half full of the same beige powder, no label. "
          "His left hand steadies the glass. Expression: matter-of-fact, mid-routine.",
    comp="Waist-up, figure about 70% of frame height. Glass, spoon and hand centred.",
    focal="the cloudy swirl in the full glass of water",
    checks=["Glass is full (a full glass of water is part of the safety advice).", "Jar unlabelled.", "Theo matches hm-new-conversation.png."])

add(sec=SEC_A, id="A17", file="hm-fall-hazards.png", slot="fall-hazards",
    title="Arrange a home fall-hazard assessment",
    why="No painting shows a home safety assessment. The studied action is a visit from a trained professional who identifies hazards.",
    attach="hm-onb-welcome-back.png (Walter identity), hm-balance.png (Walter standing posture), hm-kiwi.png (style anchor)",
    scene=f"{who('Walter', 'a soft-blue button-front overshirt over a cream t-shirt, khaki trousers and brown house slippers')} "
          "He stands, full figure, looking down attentively and nodding. Beside him an occupational therapist (a NEW, one-off character: a woman in her forties with deep brown skin, "
          "short natural hair, a plain sage-green polo shirt and navy trousers, a clipboard held against her knee whose page shows only soft grey blocks, no writing) "
          "crouches and points with her free hand to the curled-up corner of a small terracotta-and-cream striped rug lying on a short strip of plank flooring (the rug and that strip "
          "of floor are the only setting; they end cleanly). Their exchange is friendly and collaborative.",
    comp="Both full figures, about 80% of frame height. The curled rug corner and pointing hand are just below centre.",
    focal="the curled rug corner and the pointing hand",
    checks=["The hazard (curled rug edge) is obvious.", "Clipboard has no readable text.", "The therapist is clearly a visiting professional, not a cast member."])

add(sec=SEC_A, id="A18", file="hm-handwash.png", slot="handwash",
    title="Wash hands regularly",
    why="No painting shows handwashing. The card describes lathering all surfaces for at least 20 seconds.",
    attach="hm-cold-shower.png (Marco identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Marco')} Close view from slightly above and in front: his head and shoulders are at the top of the frame, looking down at his hands with mild concentration, "
          "and his forearms and hands fill the centre over a small, plain white basin with a chrome tap that is turned off. He is mid-scrub: the fingers of one hand interlaced with the other, "
          "a thick, soft white lather covering palms, backs of hands and between fingers, a few small bubbles floating. A plain white soap bar on a small dish sits on the basin edge.",
    comp="Hands and lather fill the centre; head at top, basin at bottom. Subject about 75% of frame height.",
    focal="the lathered, interlaced hands",
    checks=["Lather clearly white and thorough.", "Tap off while lathering.", "Hands have the correct number of fingers."])

add(sec=SEC_A, id="A19", file="hm-smell-training.png", slot="smell-training",
    title="Practise smell training",
    why="No painting shows smell training. The approach is gently smelling four familiar scents twice a day, never applying anything inside the nose.",
    attach="hm-kiwi.png (Nora identity), hm-cocoa.png (gentle hand holding), hm-kiwi.png (style anchor)",
    scene=f"{who('Nora')} She sits at a small warm-wood table, waist-up, three-quarter view facing left. In front of her stand four small amber-glass jars with cork lids in a neat row; "
          "a tiny natural cue sits in front of each one to suggest its scent: a single pink rose petal, a small lemon wedge, two whole cloves, and a eucalyptus sprig. No labels. "
          "She holds one open jar a few centimetres below her nose with both hands, eyes softly closed, breathing in gently, a peaceful focused face. The jar never touches her nose.",
    comp="Waist-up, figure about 70% of frame height. The jar, nose and hands are centred; the row of jars runs along the lower third.",
    focal="the open jar held just below her nose",
    checks=["Exactly four jars, no labels.", "Jar is held below the nose, not in it.", "Nora matches hm-kiwi.png."])

add(sec=SEC_A, id="A20", file="hm-pelvic-floor.png", slot="pelvic-floor",
    title="Follow a supervised pelvic-floor training plan",
    why="No painting shows this. The card is supervised training with a qualified clinician, so the picture is a calm, fully clothed consultation.",
    attach="hm-early-dinner.png (Ama identity), hm-bp-cuff.png (calm clinical tone), hm-kiwi.png (style anchor)",
    scene=f"{who('Ama')} She sits upright in a simple cushioned chair, attentive and at ease, listening. Across a small round table, a physiotherapist (a NEW, one-off character: "
          "a woman in her fifties with light skin, short silver-blonde hair, a plain sage-green clinical tunic with a blank badge) shows her a small, neutral, cream-coloured anatomical "
          "model of the pelvis (bone only, stylised, nothing explicit), resting a hand on it while explaining. A plain notepad lies on the table with only grey scribbles. "
          "Both are fully clothed; the setting is dignified, private and reassuring. Two figures, waist-up, three-quarter view.",
    comp="Both figures waist-up, about 70% of frame height. The pelvis model on the table and the two faces form a triangle around the centre.",
    focal="the clinician's hand on the pelvis model, with Ama's attentive face",
    checks=["Nothing explicit or bodily intimate.", "Model reads as a bone pelvis model.", "No text on badge or notepad."])

add(sec=SEC_A, id="A21", file="hm-almonds.png", slot="almonds (hero only; the circle crop already works)",
    title="Make almonds a daily snack",
    why="hm-nuts.png has walnuts beside the almonds, and cropping them out leaves the almonds too small.",
    attach="hm-nuts.png (exact pose, scale and framing to repeat), hm-kiwi.png (Nora identity)",
    scene=f"{who('Nora')} Repaint hm-nuts.png with only whole almonds: same pose, framing, lighting and scale. Waist-up, front three-quarter view. "
          "In her open left palm rests a small handful (about a dozen) of whole, skin-on almonds, warm brown with their fine ridged texture. "
          "Between the thumb and forefinger of her right hand she lifts one almond toward her mouth, smiling. No walnuts, no other nuts, no bowl.",
    comp="Waist-up, figure about 70% of frame height. The palm of almonds and the lifted almond are centred and large.",
    focal="the handful of almonds and the single lifted almond",
    checks=["Only almonds.", "Matches hm-nuts.png framing so the existing circle crop logic still works.", "Nora matches hm-kiwi.png."])

add(sec=SEC_A, id="N1", file="hm-acupuncture.png", slot="acupuncture-migraine",
    title="Try acupuncture for migraine",
    why="No painting shows a practitioner-led session. The card is a course of sessions with a licensed acupuncturist, with no needling at home.",
    attach="hm-box-breath.png and hm-pleasant-plan.png (Priya identity), hm-bp-cuff.png (calm clinical tone), hm-kiwi.png (style anchor)",
    scene=f"{who('Priya')} She lies back, relaxed, on a padded treatment couch upholstered in soft sage with a cream paper sheet and a small cream pillow under her head; "
          "her eyes are closed, face peaceful, hands resting loosely on her abdomen. A licensed acupuncturist (a NEW, one-off character: a man in his fifties with East Asian features, "
          "short greying black hair, calm attentive expression, a plain soft-blue clinical tunic with a blank badge) stands beside the couch, gently resting two fingers on her forearm "
          "as if checking she is comfortable. Needles are only barely suggested: three very fine, short, silver hair-lines at her forearm and one at her temple, no close-up, no blood, "
          "nothing alarming. The couch ends cleanly; no room shown.",
    comp="Couch and both figures visible in a three-quarter view, about 75% of frame height. Priya's relaxed face and the practitioner's hand sit inside the central half.",
    focal="Priya's calm face and the practitioner's reassuring hand",
    checks=["It reads as a professional session, never as self-treatment.", "Needles are subtle, not the subject.", "Priya's bob matches hm-pleasant-plan.png."])

# ===================== Section B: circle only
SEC_B = "B · Circle icon improvement (optional)"
add(sec=SEC_B, id="C1", file="hm-circle-after-meal-walk.png", slot="walk-after-meals (48 px circle only)",
    title="Take short walks after a meal",
    why="The current circle (Nora's walking shoe) reads as walking but has no meal cue.",
    attach="hm-green-walk.png (Nora's shoe: slate-blue slip-on, cream sole), hm-early-dinner.png (plate treatment)",
    scene="An object-only circle icon painting, no person. A single slate-blue slip-on walking shoe with a cream rubber sole and cream laces (exactly as Nora wears in hm-green-walk.png), "
          "shown in side view mid-stride, toe tipped slightly down as if stepping forward, with a faint painted motion arc behind the heel. Up and to the right, smaller and quieter, "
          "a round cream ceramic dinner plate with a few crumbs and a fork laid diagonally across it, signalling 'just finished a meal'. The two objects are well separated with clear space between.",
    comp="Everything sits inside a centred circle of 80% of the canvas diameter, with generous padding. The shoe is the dominant, largest shape; the plate is about half its size.",
    focal="the walking shoe",
    checks=["Both objects read at 48 px.", "No person, no ground line.", "Shoe colours match hm-green-walk.png."])

# ===================== Section C: originals not found
SEC_C = "C · Replacements for 5.1 originals that weren't in the Drive folders"
SEC_C_NOTE = ("These pictures existed in 5.1 or in approved mockups, but they weren't in either Drive folder, so the prototype uses stand-ins. "
              "**Look for the originals first.** Use these prompts only if they are truly gone. For the goal tiles and the stopwatch, the approved designs belong "
              "to you; check each result against your memory of the approved version before replacing anything.")

add(sec=SEC_C, id="S1", file="hm-mindfulness.png", slot="mindfulness (replaces 02-Seated-mindfulness.png; stand-in today: hm-box-breath.png)",
    title="Mindfulness",
    why="The original seated-mindfulness painting is missing. The stand-in is Priya's box-breathing pose, which also serves another card.",
    attach="hm-onb-welcome-back.png (Walter identity), hm-box-breath.png (cushion and pose treatment), hm-kiwi.png (style anchor)",
    scene=f"{who('Walter', 'a soft lavender crewneck sweater and comfortable cream trousers, barefoot')} "
          "He sits on a simple straight-backed warm-wood chair (not cross-legged, so the pose suits older adults), feet flat, back upright but relaxed, hands resting palms-down on his thighs. "
          "Eyes softly closed, a faint peaceful half-smile, shoulders dropped. Front three-quarter view, full figure including the chair and his feet.",
    comp="Full figure and chair, about 80% of frame height. The face and resting hands are within the central half.",
    focal="his calm closed-eye face",
    checks=["Different from Priya's box-breath pose (chair, not cushion).", "Feet and chair legs fully visible.", "Walter matches hm-onb-welcome-back.png."])

add(sec=SEC_C, id="S2", file="hm-nap.png", slot="nap (replaces 03-Resting.png; stand-in today: hm-moment-rest-day.png)",
    title="Short daytime nap",
    why="The original resting painting is missing. The design brief describes Rest as a side-view upper body, eyes closed, head resting on the person's own folded hands, with no bed or pillow.",
    attach="hm-early-dinner.png (Ama identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Ama')} Side-view upper body only, facing right. Her head tilts and rests on her own two hands folded together beneath her cheek, as on a pillow; "
          "eyes softly closed, lashes visible, mouth relaxed in a hint of a smile. Shoulders soft. No bed, no pillow, no furniture, no moon or stars: just the person, resting.",
    comp="Upper body (head to mid-chest), about 70% of frame height. The face and folded hands are centred.",
    focal="the face resting on folded hands",
    checks=["No props at all.", "Peaceful, not ill or exhausted.", "Ama's sleek ponytail and hoops visible."])

add(sec=SEC_C, id="T1", file="hm-stopwatch-base.png → sw-u5 / sw-5-10 / sw-10-20 / sw-20",
    slot="Onboarding 'How much time do you have?' (four cards; stand-in today: flat SVG stopwatches)",
    title="Painted stopwatch",
    why="The approved painted stopwatch set is missing. The decisions file specifies one upright slate-blue stopwatch with an ivory dial, rounded buttons and a red-tipped hand that advances clockwise across the four options.",
    attach="hm-kiwi.png (style anchor). If you still have the approved four-card time mockup, attach it; it takes priority over this description.",
    scene="An object-only painting, no person. One modern, upright mechanical stopwatch seen straight on: a round slate-blue painted metal case with a softly bevelled rim, "
          "a rounded slate-blue crown button on top with a smaller rounded pusher at about the one o'clock position, and a small loop above the crown. An ivory dial with fine, evenly spaced "
          "dark-charcoal tick marks around the edge (longer marks at the quarters), NO numerals and no text. A single slim charcoal hand with a red tip, pivoting on a small central brass cap. "
          "Soft painted highlight on the upper left of the case, gentle form shading, matte. "
          "**Make the base image with the hand pointing straight up to 12.** Then create the four app files by rotating ONLY the hand in an editor (or ask your tool for four versions "
          "with everything else identical): sw-u5 with the hand at 30° (the one o'clock tick), sw-5-10 at 60° (two o'clock), sw-10-20 at 120° (four o'clock), sw-20 at 180° (six o'clock).",
    comp="The stopwatch, including the top loop, fills about 70% of the canvas height, perfectly upright and centred.",
    focal="the dial and red-tipped hand",
    checks=["Identical stopwatch in all four files; only the hand changes.", "No numbers anywhere.", "Colours: slate-blue case, ivory dial, red-tipped hand."])

add(sec=SEC_C, id="S3", file="priya-gentle.png", slot="Activity screen · Keep it gentle (soft-blue card; stand-in today: hm-yoga.png)",
    title="Priya, standing side stretch",
    why="The approved Priya standing side-stretch cut-out is missing.",
    attach="hm-pleasant-plan.png and hm-box-breath.png (Priya identity), hm-yoga.png (outfit), hm-kiwi.png (style anchor)",
    scene=f"{who('Priya', 'a sage-green crewneck sweater, soft charcoal leggings and cream trainers')} Full figure, front view, standing tall with feet hip-width apart. "
          "Her right arm reaches up and over her head in a gentle arc to the left, fingers long, while her left hand rests lightly on her left hip; her torso bends softly to the left "
          "in an easy side stretch, not a deep yoga bend. Face calm, eyes half-closed, a small content smile.",
    comp="Full figure from raised fingertips to shoes, about 80% of frame height, centred, with the raised hand fully inside the frame.",
    focal="the raised arm and gentle side bend",
    checks=["Raised hand and both shoes fully visible (required by the activity card).", "Gentle, accessible stretch.", "Priya's bob matches hm-pleasant-plan.png."])

add(sec=SEC_C, id="S4", file="p-strength.png", slot="Activity screen · More effort (sage card; stand-in today: hm-circuit.png)",
    title="Marco lifting a dumbbell",
    why="The approved V4 image of Marco lifting a dumbbell (with its closer crop) is missing.",
    attach="hm-cold-shower.png and hm-wall-sit.png (Marco identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Marco')} A closer three-quarter-length view, from the head down to mid-thigh, facing three-quarter left. He performs a biceps curl with his right arm: elbow tucked "
          "at his side, forearm raised so the hand is near shoulder height, gripping a hexagonal dumbbell with a dark charcoal head and a knurled chrome handle (no numbers on the head). "
          "His left arm hangs relaxed. Expression: focused, a little effort, a quiet smile. The biceps reads naturally strong, not bodybuilder.",
    comp="Closer crop (head to mid-thigh), figure about 85% of frame height. The bent arm, face and dumbbell are all visible and clustered near the centre.",
    focal="the bent arm and dumbbell beside his face",
    checks=["Bent arm, face and dumbbell all visible (decisions file requirement).", "Dumbbell has no weight number.", "Doesn't overpower the other three activity cards."])

add(sec=SEC_C, id="S5", file="sam-seated.png", slot="Activity screen · Stay seated (lavender card; stand-in today: hm-future.png)",
    title="Sam seated on a wooden chair, reading",
    why="The approved Sam seated reading cut-out is missing.",
    attach="hm-recall.png and hm-future.png (Sam identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Sam', 'a rust-red crewneck sweater over a light-blue collared shirt, grey trousers and brown leather shoes')} Full figure, side three-quarter view facing left. "
          "He sits comfortably on a simple warm-wood ladder-back chair, one leg crossed loosely over the other at the ankle, holding an open hardback book (plain sage cover, no title) "
          "in both hands at chest height, reading with a soft absorbed smile, glasses on.",
    comp="Full figure, chair and shoes fully visible, about 80% of frame height, centred.",
    focal="Sam reading the open book",
    checks=["Chair legs and both shoes fully inside the frame.", "Book has no readable text.", "Sam matches hm-recall.png."])

GOALS = [
 ("G1","onb-goal-heart","Heart health","peach","Walter",
  "a soft-blue button-front overshirt over a cream t-shirt",
  "He walks briskly toward the viewer's left in a gentle three-quarter profile, arms swinging, chest open, with a broad, healthy smile. One hand is lightly placed over his heart mid-stride, "
  "a warm, confident gesture of looking after his heart. Full figure."),
 ("G2","p-sleep","Sleep & recovery","plum","Nora",
  "soft lavender cotton pyjamas with cream piping",
  "Side view, upper body, she hugs a plump cream pillow to her chest, cheek resting on it, eyes closed, a contented sleepy smile. Only the pillow as a prop."),
 ("G3","p-calm","Mood & stress","slate blue","Priya",
  "a sage-green crewneck sweater under a butter-yellow cardigan",
  "Waist-up, front view, she takes a slow, easy breath: shoulders relaxed and slightly lifted, both hands resting open on her chest, eyes softly closed, peaceful smile."),
 ("G4","p-energy","Energy & focus","butter","Ama",
  "a butter-yellow fitted long-sleeve top, navy leggings and blue-grey trainers",
  "Full figure, mid-step on a bright morning walk: a springy, energetic stride, one arm swinging forward, chin up, a wide, awake smile."),
 ("G5","p-strength","Strength","sage","Marco",
  None,
  "Full figure, he rises from a deep squat to standing in a smooth, controlled bodyweight squat, arms extended forward for balance, focused smile. No equipment."),
 ("G6","cook / fruit","Nutrition","butter (soft)","Theo",
  "a soft blue knit sweater with a sage-green apron",
  "Waist-up, he holds a shallow cream bowl heaped with colourful fresh food (a halved orange, cherry tomatoes, broccoli florets, a small bunch of grapes) toward the viewer with both hands, proud, warm smile."),
 ("G7","digestion","Digestion","sage (soft)","Sam",
  None,
  "Waist-up, seated, he lifts a cream ceramic bowl of oats topped with sliced banana and berries, spoon in hand, comfortable, pleased expression."),
 ("G8","reflect / milestone","Memory","peach","Ama",
  None,
  "Waist-up, seated, she pauses over an open notebook (blank pages, soft grey scribble lines only), pen lifted to her chin, gazing slightly upward with a bright, 'I remember!' smile."),
]
for gid, key, label, tile, person, wear, action in GOALS:
    add(sec=SEC_C, id=gid, file=f"goal-{label.split(' ')[0].lower().replace('&','')}.png (5.1 key: {key})",
        slot=f"Onboarding goal tile · {label} ({tile} tile; stand-in today: a habit painting)",
        title=f"Goal tile: {label}",
        why="The approved goal-tile paintings are missing. These are proposals in the approved cast and style, to be reviewed against the original concepts" + (" (especially Walter's heart-health concept)." if gid=="G1" else "."),
        attach=f"{CAST[person]['ref']} ({person} identity), hm-kiwi.png (style anchor)",
        scene=f"{who(person, wear)} {action} The figure must look good on a {tile} coloured tile in the app, so keep strong, clean silhouette edges and garment colours that contrast with {tile}.",
        comp="The figure fills about 75% of the frame height and sits centred, with generous transparent padding; the tile will be cropped as a rounded rectangle, roughly 4:3.",
        focal="the person's face and gesture",
        checks=["Gesture reads at a small tile size.", "No props except those named.", f"{person} matches the attached references."])

add(sec=SEC_C, id="R1", file="gift.png", slot="Rewards screen hero and reward cards (stand-in today: soft placeholder)",
    title="Man opening a gift",
    why="The 5.1 rewards hero is missing. Note: the original design brief asks for rewards to be drawn in code with no raster gift-card art. A person-led celebratory moment fits that rule better than a painting of a gift card, which is why this prompt shows a person and a plain box.",
    attach="hm-new-conversation.png (Theo identity), hm-kiwi.png (style anchor)",
    scene=f"{who('Theo')} Waist-up, front three-quarter view. He holds a small square gift box (sage-green box, cream ribbon tied in a bow, ribbon now loosened) and lifts the lid with "
          "his right hand, peeking in with a delighted, genuinely surprised smile, eyebrows raised. No gift card, no money, no logos visible; the contents stay out of sight.",
    comp="Waist-up, figure about 70% of frame height. The opening box and his face form the centre.",
    focal="the opening gift box",
    checks=["No gift card, cash, points or logos.", "Joyful but not exaggerated.", "Theo matches hm-new-conversation.png."])

# ===================== Section D: optional polish
SEC_D = "D · Optional polish"
add(sec=SEC_D, id="O1", file="hm-strength-row-walter.png", slot="resistance-sarcopenia",
    title="Seated elastic-band row (older adult)",
    why="The current hm-strength-row.png shows Marco, who is much younger than the studied older adults.",
    attach="hm-strength-row.png (exact pose, chair, angle, framing), hm-onb-welcome-back.png (Walter identity)",
    scene=f"{who('Walter', 'a navy crewneck t-shirt, grey trousers and white trainers')} Repaint hm-strength-row.png with Walter: same warm-wood chair, same side angle and scale. "
          "He sits upright with legs extended, a sage-green elastic resistance band looped around the soles of both feet; both hands pull the band ends back to his waist, elbows bent "
          "and tucked, shoulder blades drawn together, back straight, a determined, comfortable expression.",
    comp="Match hm-strength-row.png framing exactly. Hands, band and torso centred.",
    focal="hands pulling the band to the waist",
    checks=["Same chair and framing as hm-strength-row.png.", "Band clearly loops the feet.", "Walter matches references."])

for oid, fname, obj in [
    ("O2a","hm-reward-coffee.png","a round cream ceramic cup with a curved handle on a matching saucer, filled with coffee, with three soft curls of painted steam rising"),
    ("O2b","hm-reward-books.png","two closed hardback books stacked slightly offset, the top one sage green and the bottom one terracotta, with plain spines (no titles) and a thin butter-yellow ribbon bookmark trailing out"),
    ("O2c","hm-reward-groceries.png","an upright kraft-brown paper grocery bag with folded top edge, with a red apple, a few leafy greens and a baguette end peeking out"),
]:
    add(sec=SEC_D, id=oid, file=fname, slot="Rewards · example redemption category tile (proposal; pending decisions on gift-card partners)",
        title=fname.replace("hm-reward-","").replace(".png","").capitalize()+" reward tile",
        why="The three generic redemption icons were to become matching painted still lifes. Make all three in one session so they match.",
        attach="hm-kiwi.png and hm-nuts.png (how objects are painted in this set). Attach the other reward tiles once made.",
        scene=f"An object-only still life, no person, no hands: {obj}. Simple, slightly three-quarter viewpoint from just above, warm soft light from the upper left. "
              "No brand marks, no text, no price tags.",
        comp="The object sits inside a centred circle of 80% of the canvas diameter; same scale and padding across all three reward tiles (they display at 56 px).",
        focal="the single object",
        checks=["Matches the other two reward tiles in scale, angle and light.", "Reads at 56 px.", "No text or logos."])

# ---------------------------------------------------------------- render
L = []
w = L.append
w("# Humanology · Painting prompts for every missing picture\n")
w(f"One copy-ready prompt per picture the app still needs: **{len(P)} prompts** in four groups. Each prompt is complete on its own, so you can paste it into an image tool as is. "
  "The shared style, format and avoid-list are already built into every prompt.\n")
w("| Group | What it covers | Prompts |\n|---|---|---|")
groups = {}
for p in P: groups.setdefault(p['sec'], []).append(p['id'])
desc = {SEC_A: "Live habit cards showing a placeholder today", SEC_B: "A clearer 48 px circle for one card",
        SEC_C: "5.1 originals missing from Drive (use only if the originals are really gone)", SEC_D: "Nice to have, not blocking"}
for s, ids in groups.items(): w(f"| {s} | {desc[s]} | {len(ids)}: {', '.join(ids)} |")
w("")
w("## How to use these\n")
w("1. **Attach the reference paintings** listed for each prompt. They're in the Drive images folder and in `humanology/art-src/`. `hm-kiwi.png` is the style anchor for the whole set; attach it every time. If your tool takes only one image, attach the identity reference for the person in the scene.")
w("2. **Paste the whole prompt block** (scene + composition + style + format). Put the avoid list in the tool's negative-prompt field if it has one; otherwise leave it at the end of the prompt. Each prompt is 3,500 to 4,450 characters; without the AVOID line every one is under 3,750, which fits tools with a 4,000-character limit.")
w("3. **Generate at 1536 × 1536** and keep the background transparent. If your tool can't do transparency, use the flat-white fallback described in the format paragraph and remove the background afterwards.")
w("4. **Check the result** against the checklist under each prompt, and compare the face with the reference before accepting it. Fix hands at this stage, not after cropping.")
w("5. **Name the file exactly** as given and drop it in the images folder. I'll run it through the existing pipeline (`tools/make_heroes.py` and `tools/make_thumbs.py`), which trims the margin and makes the hero and the 48 px circle.\n")
w("Changes from the short prompts in `ARTWORK-NEEDED.md`: water now has two separate paintings (W1 for drinking before meals, W2 for cystitis), because the habits and the people studied are different. "
  "The stair card (A1) now shows Marco climbing fast, since the single-session trial was in young men, and the easy-pace stair card has its own painting (N2). "
  "The volunteer scene (A15) now matches the study: an older volunteer helping a nursing-home resident. Walter no longer appears in a yellow cardigan, which belongs to Priya.\n")

w("## The cast\n")
w("Use these descriptions to keep every person consistent. Each prompt already includes the relevant one.\n")
w("| Person | Look | Usual clothes | Best reference |\n|---|---|---|---|")
for n, c in CAST.items(): w(f"| **{n}** | {c['look']} | {c['wear']} | `{c['ref']}` |")
w("\nNew people who appear once only (the occupational therapist, the nursing-home resident, the physiotherapist and the acupuncturist) are described in full in their prompts. Make them look distinct from the main cast.\n")

w("## Shared style (already inside every prompt)\n")
w("> " + STYLE + "\n")
w("> " + FORMAT + "\n")
w("**Avoid list (negative prompt):** " + NEGATIVE + "\n")

cur = None
for p in P:
    if p['sec'] != cur:
        cur = p['sec']
        w(f"\n---\n\n## {cur}\n")
        if cur == SEC_C: w(SEC_C_NOTE + "\n")
    w(f"### {p['id']} · `{p['file']}`\n")
    w(f"- **Used for:** {p['slot']}: *{p['title']}*")
    w(f"- **Why it's needed:** {p['why']}")
    w(f"- **Attach:** {p['attach']}\n")
    w("**Prompt (copy everything in the box):**\n")
    w("```text")
    w(f"Painted editorial illustration for the Humanology health app: {p['title'].lower()}.")
    w("")
    w("SCENE: " + p['scene'])
    w("")
    w("COMPOSITION: " + p['comp'] + " " + CIRCLE + f" Key detail for the circle: {p['focal']}.")
    w("")
    w(STYLE)
    w("")
    w(FORMAT)
    w("")
    w("AVOID: " + NEGATIVE + ".")
    w("```\n")
    w("**Check before accepting:**")
    for c in p['checks']: w(f"- [ ] {c}")
    w("- [ ] Transparent background, no caption strip, nothing touching the edges.")
    w("- [ ] Hands correct (five fingers each), no text anywhere.\n")

open(OUT, "w").write("\n".join(L))
print(len(P), "prompts", sum(len(x) for x in L), "chars")
