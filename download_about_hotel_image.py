import urllib.request
import os

url = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90" # High Definition Realistic 5-Star Luxury Resort Facade & Pool
file_path = r"c:\Users\Nikhil\Desktop\surfsync\HOTEL_DEMO\assets\images\about-main.jpg"

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(file_path, 'wb') as out_file:
        out_file.write(resp.read())
    print("Successfully replaced about-main.jpg with a realistic 5-star Indian luxury hotel resort image!")
except Exception as e:
    print("Error:", e)
