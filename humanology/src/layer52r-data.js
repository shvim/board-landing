/* ================= Humanology 5.2 visual revision — editorial browsing labels =================
   One table, keyed by catalog ID, so it exports cleanly to the native app. Nothing here changes a claim:
   SHORT52 is a short action title for browsing; TOPIC52 names the outcome of each published result in two
   plain words. Cards show the topics of the results that are visible for the selected schedule and audience. */
"use strict";
const SHORT52 = {
  "walk-after-meals": "Walk after a meal", "brisk-walking": "Take a brisk walk", stairs: "Climb stairs briskly", almonds: "Snack on almonds",
  sunscreen: "Wear sunscreen daily", caffeine: "Have caffeine earlier", "resistance-sarcopenia": "Do strength exercises", bath: "Warm bath before bed",
  "relax-muscles": "Relax your muscles", "cyclic-sighing": "Try cyclic sighing", "cold-shower": "End with cold water", "meal-order": "Eat vegetables first",
  "bedtime-list": "Write tomorrow’s list", kiwi: "Eat two kiwis", beans: "Add beans to meals", "salt-swap": "Swap to potassium salt",
  "whole-grains": "Choose whole grains", "walk-for-ideas": "Walk to brainstorm", "water-flosser": "Clean between teeth", "social-break": "A week off social media",
  toothbrush: "Use a powered toothbrush", "screen-cap": "Cap phone screen time", "standing-stockings": "Stockings for standing work", optimism: "Picture your best future",
  "bedtime-phone": "Phone away before bed", blink: "Practice full blinks", apples: "Eat two apples", "work-breaks": "Take desk breaks",
  hummus: "Afternoon hummus snack", volunteer: "Try volunteering", jumps: "Do short jump sets", psyllium: "Take psyllium",
  retrieval: "Practice recalling", "flight-stockings": "Stockings on long flights", "fall-hazards": "Check home for fall risks", handwash: "Wash your hands",
  "water-premeal": "Water before meals", "drink-swap": "Swap soda for water", "eat-slowly": "Eat more slowly", "three-good-things": "Three good things",
  mindfulness: "Brief mindfulness", "left-side": "Sleep on your left side", music: "Music before bed", "smell-training": "Smell training",
  prunes: "Eat prunes", cystitis: "Extra water daily", dash: "Eat DASH-style meals", "walking-breaks": "Walk breaks from sitting",
  "one-brisk-walk": "Ten-minute brisk walk", nap: "Short afternoon nap", oats: "Oats with beta-glucan", "pelvic-floor": "Pelvic-floor training",
  handgrip: "Handgrip training", "tai-chi": "Join tai chi classes", "neck-strength": "Neck and shoulder exercises", "sleep-extension": "Extend short sleep",
};
const TOPIC52 = {
  "walk-after-meals-1": "Blood sugar", "walk-after-meals-2": "Insulin response", "walk-after-meals-3": "Blood sugar",
  "brisk-walking-1": "Blood pressure", "brisk-walking-2": "Blood pressure", "brisk-walking-3": "Fitness", "stairs-1": "Fitness",
  "almonds-1": "Cholesterol", "almonds-2": "Cholesterol", "almonds-3": "Cholesterol", "sunscreen-1": "Skin aging",
  "caffeine-1": "Sleep", "caffeine-2": "Sleep", "resistance-sarcopenia-1": "Strength", "bath-1": "Falling asleep",
  "relax-muscles-1": "Sleep quality", "cyclic-sighing-1": "Mood", "cold-shower-1": "Sick days", "meal-order-1": "Blood sugar",
  "bedtime-list-1": "Falling asleep", "kiwi-1": "Regularity", "kiwi-2": "Digestive comfort", "beans-1": "Cholesterol",
  "salt-swap-1": "Blood pressure", "salt-swap-2": "Stroke", "whole-grains-1": "Cholesterol", "whole-grains-2": "Cholesterol",
  "walk-for-ideas-1": "Creative ideas", "water-flosser-1": "Gum health", "social-break-1": "Wellbeing", "toothbrush-1": "Plaque",
  "screen-cap-1": "Mood", "screen-cap-2": "Sleep", "screen-cap-3": "Stress", "standing-stockings-1": "Leg swelling",
  "optimism-1": "Optimism", "bedtime-phone-1": "Falling asleep", "bedtime-phone-2": "Sleep quality", "bedtime-phone-3": "Calmer bedtime",
  "blink-1": "Dry eyes", "apples-1": "Cholesterol", "work-breaks-1": "Eyestrain", "hummus-1": "Hunger", "volunteer-1": "Loneliness",
  "jumps-1": "Bone density", "psyllium-1": "Cholesterol", "psyllium-2": "Regularity", "retrieval-1": "Memory",
  "flight-stockings-1": "Leg clots", "fall-hazards-1": "Falls", "handwash-1": "Infections", "water-premeal-1": "Weight loss",
  "drink-swap-1": "Weight", "eat-slowly-1": "Portion size", "three-good-things-1": "Happiness", "mindfulness-1": "Stress",
  "left-side-1": "Night reflux", "music-1": "Sleep quality", "smell-training-1": "Sense of smell", "prunes-1": "Regularity",
  "cystitis-1": "Bladder infections", "dash-1": "Blood pressure", "dash-2": "Blood pressure", "walking-breaks-1": "Blood pressure",
  "walking-breaks-2": "Mood", "walking-breaks-3": "Energy", "one-brisk-walk-1": "Energy", "nap-1": "Alertness", "oats-1": "Cholesterol",
  "pelvic-floor-1": "Bladder control", "handgrip-1": "Blood pressure", "tai-chi-1": "Falls", "neck-strength-1": "Neck pain",
  "sleep-extension-1": "Sleep length", "sleep-extension-2": "Calorie intake",
};
/* the drink swap shows no benefit outside research details, so its card names what it tracks */
const NOBEN52 = { "drink-swap": "Drink tracking" };
