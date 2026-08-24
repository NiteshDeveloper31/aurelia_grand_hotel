import urllib.request
import os

indian_assets = {
    # Hero & Core
    "hero-1.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85", # Indian Luxury Hotel Palace Facade & Pool
    "hero-2.jpg": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=85", # Royal Dining Hall
    "hero-3.jpg": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85", # Luxury Penthouse Villa
    "about-main.jpg": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85", # Heritage Hotel Facade
    "chef.jpg": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85", # Executive Indian Chef
    "lobby.jpg": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85", # Grand Hotel Lobby
    "reception.jpg": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85", # Hotel Reception Desk

    # Rooms & Suites
    "deluxe-room.jpg": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85", # Deluxe Room
    "premium-room.jpg": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85", # Premium Room
    "executive-room.jpg": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85", # Executive Room
    "luxury-suite.jpg": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85", # Luxury Suite
    "family-suite.jpg": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", # Family Suite
    "suite-villa.jpg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", # Garden Villa

    # Indian Food & Cuisine
    "butter-chicken.jpg": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=85", # Butter Chicken / Curry
    "paneer-tikka.jpg": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85", # Paneer Tikka / Tandoori
    "biryani.jpg": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=85", # Chicken Dum Biryani
    "dal-makhani.jpg": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85", # Dal Makhani
    "masala-dosa.jpg": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85", # South Indian Masala Dosa
    "gulab-jamun.jpg": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85", # Indian Desserts / Sweets
    "chinese-noodles.jpg": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=85", # Hakka Noodles / Chinese
    "tandoori-platter.jpg": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=85", # Tandoori Platter / Mughlai

    # Banquets, Events & Amenities
    "wedding-hall.jpg": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85", # Wedding Banquet Hall
    "corporate-event.jpg": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85", # Corporate Conference Hall
    "rooftop-dining.jpg": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85", # Rooftop Dining
    "swimming-pool.jpg": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85", # Hotel Swimming Pool
    "spa-wellness.jpg": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85", # Spa & Wellness

    # Promotional Offers
    "offer-stay2get1.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=85",
    "offer-weekend.jpg": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85",
    "offer-couple.jpg": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=85",
    "offer-family.jpg": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=85",
    "offer-earlybird.jpg": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=85",
    "offer-dining.jpg": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
}

output_dir = r"c:\Users\Nikhil\Desktop\surfsync\HOTEL_DEMO\assets\images"
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in indian_assets.items():
    filePath = os.path.join(output_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(filePath, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Successfully downloaded {fname}")
    except Exception as e:
        print(f"Error {fname}: {e}")
