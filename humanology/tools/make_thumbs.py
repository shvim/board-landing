"""Circle-thumbnail derivatives at 192 px (4x of 48 CSS px) from explicit crops in tools/thumbs.json.
Also writes 'fit' variants: the whole trimmed painting fitted inside the circle, for the 48 px comparison."""
import json, os, sys
from PIL import Image
SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True); os.makedirs(OUT + '-fit', exist_ok=True)
T = json.load(open(os.path.join(os.path.dirname(__file__), 'thumbs.json')))
N = 192
def scene(stem):
    im = Image.open(f'{SRC}/hm-{stem}.png').convert('RGBA'); w = im.size[0]; return im.crop((0, 0, w, w))
for key, t in T.items():
    if key.startswith('_'): continue
    sq = scene(t['src']); w = sq.size[0]; cx, cy, s = t['c']
    half = s * w / 2; box = [round(cx * w - half), round(cy * w - half), round(cx * w + half), round(cy * w + half)]
    canvas = Image.new('RGBA', (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
    canvas.alpha_composite(sq.crop((max(0, box[0]), max(0, box[1]), min(w, box[2]), min(w, box[3]))), (max(0, -box[0]), max(0, -box[1])))
    canvas.resize((N, N), Image.LANCZOS).save(f'{OUT}/{key}.webp', 'WEBP', quality=86, method=4)
    # fit variant: trimmed painting, centered in the circle's inscribed square
    a = sq.getchannel('A').point(lambda v: 255 if v > 12 else 0); bb = a.getbbox(); fig = sq.crop(bb)
    side = max(fig.size); pad = Image.new('RGBA', (side, side), (0, 0, 0, 0)); pad.alpha_composite(fig, ((side - fig.size[0]) // 2, (side - fig.size[1]) // 2))
    inner = round(N * 0.74); out = Image.new('RGBA', (N, N), (0, 0, 0, 0)); out.alpha_composite(pad.resize((inner, inner), Image.LANCZOS), ((N - inner) // 2, (N - inner) // 2))
    out.save(f'{OUT}-fit/{key}.webp', 'WEBP', quality=86, method=4)
print('thumbs done')
