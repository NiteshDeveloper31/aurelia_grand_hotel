from PIL import Image, ImageDraw, ImageFont
import os

img = Image.new('RGBA', (64, 64), color=(11, 12, 16, 255))
draw = ImageDraw.Draw(img)

# Gold Diamond Outer
draw.polygon([(32, 4), (60, 32), (32, 60), (4, 32)], outline=(201, 160, 99, 255), width=3)
draw.polygon([(32, 8), (56, 32), (32, 56), (8, 32)], outline=(248, 226, 152, 180), width=1)

# Crown top
draw.polygon([(22, 20), (26, 26), (32, 16), (38, 26), (42, 20), (40, 30), (24, 30)], fill=(201, 160, 99, 255))

# Draw 'H'
try:
    font = ImageFont.truetype("georgia.ttf", 26)
except:
    font = ImageFont.load_default()

draw.text((23, 26), "H", fill=(248, 226, 152, 255), font=font)

icon_path = r"c:\Users\Nikhil\Desktop\surfsync\HOTEL_DEMO\favicon.ico"
img.save(icon_path, format='ICO')
print("Successfully generated favicon.ico for The Haveli Royale!")
