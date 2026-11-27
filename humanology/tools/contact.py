import sys, os
from PIL import Image, ImageDraw
SRC='art-src'; OUT=sys.argv[1]; names=sys.argv[2:]
S=300; cols=4
rows=(len(names)+cols-1)//cols
sheet=Image.new('RGB',(cols*S,rows*(S+18)),(250,246,236)); d=ImageDraw.Draw(sheet)
for i,n in enumerate(names):
    im=Image.open(f'{SRC}/hm-{n}.png').convert('RGBA'); w=im.size[0]; sq=im.crop((0,0,w,w)).resize((S,S))
    bg=Image.new('RGBA',(S,S),(236,226,212,255)); bg.alpha_composite(sq)
    x=(i%cols)*S; y=(i//cols)*(S+18); sheet.paste(bg.convert('RGB'),(x,y+18))
    dd=ImageDraw.Draw(sheet)
    for k in range(1,10):
        c=(200,180,160) if k!=5 else (150,120,100)
        dd.line([(x+k*S//10,y+18),(x+k*S//10,y+18+S)],fill=c); dd.line([(x,y+18+k*S//10),(x+S,y+18+k*S//10)],fill=c)
    dd.text((x+4,y+3),f'{n} ({w})',fill=(0,0,0))
sheet.save(OUT)
