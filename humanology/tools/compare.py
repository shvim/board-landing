"""Before/after sheets: each screen at 375 px, 5.2 on the left, revised on the right, labeled."""
from PIL import Image, ImageDraw, ImageFont
import os
D='screenshots/redesign'; os.makedirs(f'{D}/compare',exist_ok=True)
try: F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
except: F=ImageFont.load_default()
def sheet(name, tags, maxh=1688*2):
    cols=[]
    for t in tags:
        for side in ('before','after'):
            p=f'{D}/{side}/{name}-{t}.png'
            if os.path.exists(p): im=Image.open(p).convert('RGB'); cols.append((f'{"5.2" if side=="before" else "Revised"} · {t.replace("-large"," px, larger text") if "large" in t else t+" px"}', im.crop((0,0,im.size[0],min(im.size[1],maxh)))))
    W=sum(i.size[0] for _,i in cols)+30*(len(cols)-1); H=max(i.size[1] for _,i in cols)+70
    out=Image.new('RGB',(W,H),(255,255,255)); d=ImageDraw.Draw(out); x=0
    for lab,i in cols: d.text((x+10,15),lab,fill=(40,40,40),font=F); out.paste(i,(x,70)); x+=i.size[0]+30
    out.save(f'{D}/compare/{name}.png'); return out.size
for n in ['goals','recommendation','explore','detail','detail-research-open','today-checkin','checkin-page','today-top']:
    print(n, sheet(n,['375'] if n not in('recommendation','explore') else ['375','375-large']))
print('cards', sheet('card-long-title',['375','375-large']), sheet('card-short-title',['375','375-large']))
