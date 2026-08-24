import urllib.request
import os

paneer_images = {
    "paneer-butter-masala.jpg": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85", # Paneer Butter Masala
    "kadhai-paneer.jpg": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85", # Kadhai Paneer
    "palak-paneer.jpg": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=85", # Palak Paneer
    "malai-kofta.jpg": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85", # Malai Kofta
    "paneer-lababdar.jpg": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=85", # Paneer Gravy
    "paneer-do-pyaza.jpg": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85", # Paneer Dish
    "paneer-malai-tikka.jpg": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=85" # Paneer Tikka
}

output_dir = r"c:\Users\Nikhil\Desktop\surfsync\HOTEL_DEMO\assets\images"
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in paneer_images.items():
    filePath = os.path.join(output_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(filePath, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Downloaded {fname}")
    except Exception as e:
        print(f"Error {fname}: {e}")
