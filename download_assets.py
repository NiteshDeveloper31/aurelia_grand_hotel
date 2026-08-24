import urllib.request
import os

images = {
    "hero-1.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85", # Palace Resort pool
    "hero-2.jpg": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=85", # Royal dining interior
    "hero-3.jpg": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85", # Sky Villa suite
    "about-main.jpg": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85", # Udaipur Palace facade
    "chef.jpg": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85", # Indian Executive Chef
    "suite-presidential.jpg": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85", # Royal Penthouse
    "suite-ocean-penthouse.jpg": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", # Penthouse Bedroom
    "suite-villa.jpg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", # Garden Villa
    "suite-deluxe-sea.jpg": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85", # Grand Deluxe Suite
    "suite-horizon.jpg": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85", # Horizon Suite
    "suite-diplomatic.jpg": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85", # Diplomatic Suite
    "restaurant-main.jpg": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85", # Restaurant Interior
    "exp-spa.jpg": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85", # Spa Sanctuary
    "exp-yacht.jpg": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=85", # Royal Boat Cruise
    "exp-wine.jpg": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85", # Cellar Vault
    "exp-heli.jpg": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85", # Helicopter
    "offer-romance.jpg": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85", # Romantic Package
    "offer-culinary.jpg": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85", # Culinary Package
    "offer-residence.jpg": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", # Extended Stay Package
    "gal-1.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    "gal-2.jpg": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    "gal-3.jpg": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
    "gal-4.jpg": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85",
    "gal-5.jpg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    "gal-6.jpg": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    "gal-7.jpg": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
    "gal-8.jpg": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85",
    "gal-9.jpg": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85"
}

output_dir = r"c:\Users\Nikhil\Desktop\surfsync\HOTEL_DEMO\assets\images"
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in images.items():
    filePath = os.path.join(output_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(filePath, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Downloaded {fname}")
    except Exception as e:
        print(f"Failed {fname}: {e}")
