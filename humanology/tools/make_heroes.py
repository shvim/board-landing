"""Hero display derivatives: drop the burned-in caption strip, trim transparent margin, cap size, save WebP."""
import glob, os, json, sys
from PIL import Image
SRC = sys.argv[1]; OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)
meta = {}
for f in sorted(glob.glob(os.path.join(SRC, 'hm-*.png'))):
    name = os.path.basename(f)[3:-4]
    im = Image.open(f).convert('RGBA'); w = im.size[0]
    sq = im.crop((0, 0, w, w))                      # the scene is the top square; the caption strip sits below it
    a = sq.getchannel('A').point(lambda v: 255 if v > 12 else 0)
    x0, y0, x1, y1 = a.getbbox()
    pad = int(w * 0.03)
    box = (max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(w, y1 + pad))
    hero = sq.crop(box)
    scale = min(1.0, 900 / max(hero.size))
    if scale < 1: hero = hero.resize((round(hero.size[0] * scale), round(hero.size[1] * scale)), Image.LANCZOS)
    hero.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=84, method=6)
    meta[name] = {'src_w': w, 'box': box, 'w': hero.size[0], 'h': hero.size[1]}
json.dump(meta, open(os.path.join(OUT, '_meta.json'), 'w'), indent=0)
print(len(meta), 'heroes')
