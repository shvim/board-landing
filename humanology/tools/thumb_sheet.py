import json, os, sys
from PIL import Image, ImageDraw
T = json.load(open('tools/thumbs.json')); keys = [k for k in T if not k.startswith('_')]
SC = 3  # render at 3x so the review image is legible; sizes stay proportional to CSS px
cols = 3; cw = 260 * SC // 2; rh = 64 * SC // 1
out = Image.new('RGB', (cols * cw, ((len(keys) + cols - 1) // cols) * rh), (250, 246, 236)); d = ImageDraw.Draw(out)
def circ(img, px, fill=(236, 226, 212)):
    s = px * SC; base = Image.new('RGBA', (s, s), fill + (255,)); base.alpha_composite(img.resize((s, s), Image.LANCZOS))
    m = Image.new('L', (s, s), 0); ImageDraw.Draw(m).ellipse((0, 0, s - 1, s - 1), fill=255)
    res = Image.new('RGBA', (s, s), (0, 0, 0, 0)); res.paste(base, (0, 0), m); return res
for i, k in enumerate(keys):
    x = (i % cols) * cw; y = (i // cols) * rh
    a = Image.open(f'Humanology-5.2-assets/art/thumb/{k}.webp').convert('RGBA'); f = Image.open(f'Humanology-5.2-assets/art/thumb-fit/{k}.webp').convert('RGBA')
    out.paste(circ(f, 48), (x + 4, y + 8), circ(f, 48)); out.paste(circ(a, 48), (x + 4 + 52 * SC, y + 8), circ(a, 48)); out.paste(circ(a, 36), (x + 4 + 104 * SC, y + 8 + 6 * SC), circ(a, 36))
    d.text((x + 6, y + 8 + 50 * SC), k, fill=(0, 0, 0))
out.save(sys.argv[1])
