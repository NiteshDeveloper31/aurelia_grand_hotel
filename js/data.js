/**
 * AURELIA — Grand Hotel & Fine Dining
 * Centralized Data Repository (Targeted Premium Indian Hotel & Restaurant Demo)
 */

function generatePlaceholderSvg(title, subtitle = "AURELIA GRAND HOTEL", width = 1200, height = 800, type = "hotel") {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0b0c10" />
        <stop offset="50%" stop-color="#181a24" />
        <stop offset="100%" stop-color="#0a0a0d" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e5c898" />
        <stop offset="50%" stop-color="#c9a063" />
        <stop offset="100%" stop-color="#96723b" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    <rect x="30" y="30" width="${width - 60}" height="${height - 60}" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.3" />
    <g transform="translate(${width / 2}, ${height / 2 - 20})">
      <circle r="45" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.4" />
      <text y="8" font-family="'Cormorant Garamond', serif" font-size="28" font-weight="600" fill="url(#goldGrad)" text-anchor="middle">A</text>
    </g>
    <text x="${width / 2}" y="${height / 2 + 50}" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#9a9cb0" text-anchor="middle" letter-spacing="6">${subtitle.toUpperCase()}</text>
    <text x="${width / 2}" y="${height / 2 + 85}" font-family="'Cormorant Garamond', serif" font-size="30" fill="#f4f4f6" text-anchor="middle">${title}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

const AURELIA_DATA = {
  brand: {
    name: "AURELIA",
    tagline: "GRAND HOTEL & FINE DINING",
    location: "Udaipur & New Delhi, India",
    founded: "1999",
    phone: "+91 98765 43210 / +91 (0294) 240 0000",
    email: "reservations@aureliahotels.in",
    address: "777 Grand Palace Road, Lake Pichola, Udaipur, Rajasthan 313001, India"
  },

  heroSlides: [
    {
      id: 1,
      subtitle: "25+ Years of Indian Hospitality Excellence",
      title: "Where Authentic Indian Warmth Meets Modern 5-Star Luxury",
      description: "Welcome to AURELIA Grand Hotel — an iconic sanctuary offering luxury rooms, 24-hour fine dining, grand wedding banquets, and world-class Indian hospitality.",
      ctaPrimary: "Book a Room",
      ctaSecondary: "Explore Restaurant",
      image: "assets/images/hero-1.jpg",
      fallback: generatePlaceholderSvg("AURELIA Grand Palace Hotel", "5-STAR LUXURY HOSPITALITY", 1920, 1080, "hotel")
    },
    {
      id: 2,
      subtitle: "Royal Indian & Multi-Cuisine Gastronomy",
      title: "Authentic Flavors by Executive Master Chefs",
      description: "Indulge in North Indian Dal Makhani, Tandoori Kebabs, Hyderabadi Dum Biryani, and South Indian Masala Dosa in an elegant fine dining ambiance.",
      ctaPrimary: "View Food Menu",
      ctaSecondary: "Reserve Table",
      image: "assets/images/hero-2.jpg",
      fallback: generatePlaceholderSvg("Le Celestia Fine Dining", "AUTHENTIC INDIAN GASTRONOMY", 1920, 1080, "dining")
    },
    {
      id: 3,
      subtitle: "Grand Weddings & Corporate Events",
      title: "Unforgettable Celebrations in Royal Banquets",
      description: "Host destination weddings, Sangeet functions, corporate summits, and grand receptions in our 1,200+ capacity pillarless ballroom.",
      ctaPrimary: "Enquire Events",
      ctaSecondary: "Explore Banquets",
      image: "assets/images/hero-3.jpg",
      fallback: generatePlaceholderSvg("Grand Banquet & Event Halls", "ROYAL WEDDINGS & CONFERENCES", 1920, 1080, "suite")
    }
  ],

  stats: [
    { value: 25, suffix: "+ Yrs", label: "Hospitality Heritage" },
    { value: 50, suffix: "+", label: "Luxury Rooms & Suites" },
    { value: 10, suffix: "K+", label: "Happy Guests Served" },
    { value: 4.8, suffix: "/5", label: "Guest Satisfaction Rating" }
  ],

  about: {
    title: "25 Years of Redefining Indian Luxury Hospitality",
    subtitle: "OUR LEGACY & PHILOSOPHY",
    excerpt: "Guided by the timeless Indian ethos 'Atithi Devo Bhava' (Guest is God), AURELIA Grand Hotel has been serving business travelers, families, couples, and wedding hosts since 1999.",
    paragraphs: [
      "Founded by Shri Vikramaditya Singhania in 1999, AURELIA started as an boutique palace hotel and has grown into one of India's most trusted luxury hospitality destinations.",
      "Whether you are visiting for a weekend staycation, a business conference, or a royal destination wedding, our team ensures every moment is crafted with perfection, warmth, and attention to detail."
    ],
    quote: "Atithi Devo Bhava — Hospitality is not just a service for us; it is our heritage and sacred honor.",
    quoteAuthor: "Vikramaditya Singhania",
    quoteRole: "Founder & Chairman",
    imageMain: "assets/images/about-main.jpg",
    imageFallback: generatePlaceholderSvg("AURELIA Hotel Architecture", "25 YEARS OF EXCELLENCE", 900, 1100, "hotel")
  },

  suites: [
    {
      id: "deluxe-room",
      category: "deluxe",
      badge: "Popular Choice",
      title: "Deluxe Room",
      subtitle: "Modern Comfort & Elegance",
      price: 4999,
      period: "per night",
      currency: "₹",
      size: "35 m² / 375 sq.ft",
      capacity: "2 Adults",
      bedType: "King Bed / Twin Beds",
      view: "City & Garden View",
      description: "Thoughtfully designed for business travelers and couples, featuring premium wooden flooring, ergonomically designed work desk, LED Smart TV, and luxury marble bathroom with rain shower.",
      amenities: ["Free High-Speed Wi-Fi", "55-inch LED Smart TV", "Mini Bar & Tea/Coffee Maker", "24/7 Room Service", "Climate Control"],
      image: "assets/images/deluxe-room.jpg",
      fallback: generatePlaceholderSvg("Deluxe Room", "MODERN LUXURY", 900, 600, "suite")
    },
    {
      id: "premium-room",
      category: "premium",
      badge: "Best Seller",
      title: "Premium Room with Balcony",
      subtitle: "Spacious Room with Private View",
      price: 7499,
      period: "per night",
      currency: "₹",
      size: "48 m² / 515 sq.ft",
      capacity: "2 Adults + 1 Child",
      bedType: "Royal King Size Bed",
      view: "Panoramic Pool & Garden View",
      description: "Spacious layout with a private sit-out balcony overlooking the pool. Equipped with plush seating, Nespresso coffee maker, walk-in wardrobe, and complimentary buffet breakfast.",
      amenities: ["Private Sit-Out Balcony", "Complimentary Buffet Breakfast", "Espresso Coffee Machine", "Plush Bathrobes & Slippers", "Electronic Safe Locker"],
      image: "assets/images/premium-room.jpg",
      fallback: generatePlaceholderSvg("Premium Room", "BALCONY VIEW", 900, 600, "suite")
    },
    {
      id: "executive-room",
      category: "executive",
      badge: "Business Luxury",
      title: "Executive Business Room",
      subtitle: "Includes Lounge Access & Airport Transfer",
      price: 10999,
      period: "per night",
      currency: "₹",
      size: "62 m² / 665 sq.ft",
      capacity: "2 Adults",
      bedType: "Plush Feather-bed King",
      view: "Skyline & Lake View",
      description: "Designed for corporate executives, including complimentary airport transfers, Executive Lounge access, daily evening cocktail hours, and complimentary ironing service.",
      amenities: ["Executive Lounge Access", "Complimentary Airport Pick & Drop", "Daily Cocktail Hour", "Deep Soaking Bath Tub", "High-Speed Wi-Fi 500 Mbps"],
      image: "assets/images/executive-room.jpg",
      fallback: generatePlaceholderSvg("Executive Room", "EXECUTIVE PRIVILEGE", 900, 600, "suite")
    },
    {
      id: "luxury-suite",
      category: "suite",
      badge: "Flagship Suite",
      title: "Grand Luxury Suite",
      subtitle: "Separate Living Salon & Jacuzzi",
      price: 18500,
      period: "per night",
      currency: "₹",
      size: "110 m² / 1,180 sq.ft",
      capacity: "3 Guests",
      bedType: "Emperor King Size Bed",
      view: "Panoramic Lake & Palace View",
      description: "An epitome of luxury featuring a separate living salon, powder room, master bedroom, Italian marble bath with Jacuzzi tub, 24-hour dedicated butler, and complimentary wine & fruit basket.",
      amenities: ["In-Room Jacuzzi Tub", "Separate Living & Dining Room", "24/7 Dedicated Butler", "Forest Essentials Toiletries", "Welcome Fruit & Wine Basket"],
      image: "assets/images/luxury-suite.jpg",
      fallback: generatePlaceholderSvg("Luxury Suite", "ROYAL JACUZZI SUITE", 900, 600, "suite")
    },
    {
      id: "family-suite",
      category: "family",
      badge: "Family Favorite",
      title: "Royal Family Suite",
      subtitle: "Interconnecting Rooms for Large Families",
      price: 24999,
      period: "per night",
      currency: "₹",
      size: "145 m² / 1,560 sq.ft",
      capacity: "4 Adults + 2 Children",
      bedType: "2 Master King Beds",
      view: "Garden & Pool View",
      description: "Ideal for family holidays, featuring 2 interconnecting master bedrooms, 2 full marble bathrooms, a dining table for 6, kids play corner, and complimentary dinner for children under 10.",
      amenities: ["2 Interconnecting Bedrooms", "2 Full Marble Bathrooms", "Dining Table for 6", "Kids Complimentary Dining", "PlayStation Console on Request"],
      image: "assets/images/family-suite.jpg",
      fallback: generatePlaceholderSvg("Family Suite", "FAMILY STAY", 900, 600, "suite")
    }
  ],

  restaurant: {
    name: "Le Celestia Fine Dining",
    tagline: "Authentic Indian & Multi-Cuisine Restaurant",
    chefName: "Master Chef Vikramaditya Singh",
    chefRole: "Executive Culinary Director",
    philosophy: "Celebrating rich Indian culinary heritage, royal tandoori preparations, and aromatic dum biryanis cooked using age-old recipes.",
    ambiance: "Warm golden lighting, opulent interiors, live classical sitar music in evenings, and private dining pavilions.",
    imageMain: "assets/images/restaurant-main.jpg",
    imageFallback: generatePlaceholderSvg("Le Celestia Dining Room", "FINE DINING RESTAURANT", 900, 600, "dining"),
    imageChef: "assets/images/chef.jpg",
    imageChefFallback: generatePlaceholderSvg("Master Chef Vikramaditya", "EXECUTIVE CHEF", 600, 800, "dining")
  },

  menuCategories: [
    { id: "north-indian", name: "North Indian" },
    { id: "south-indian", name: "South Indian" },
    { id: "mughlai", name: "Mughlai & Biryani" },
    { id: "continental", name: "Continental" },
    { id: "chinese", name: "Pan-Asian & Chinese" },
    { id: "desserts", name: "Desserts & Sweets" }
  ],

  menuItems: [
    {
      category: "north-indian",
      title: "Shahi Paneer Butter Masala",
      desc: "Fresh cottage cheese cubes simmered in a velvety makhani gravy of vine-ripened tomatoes, fresh butter, cashews, and aromatic Kasuri methi.",
      price: "₹445",
      tags: ["Bestseller", "Chef Special", "Vegetarian"],
      ingredients: "Fresh Paneer, Amul Butter, Cashew Paste, Tomato Gravy, Kasuri Methi, Cream",
      image: "assets/images/paneer-butter-masala.jpg"
    },
    {
      category: "north-indian",
      title: "Kadhai Paneer Special",
      desc: "Succulent paneer cubes wok-tossed with freshly ground coriander, whole red chilies, bell peppers, onions, and spicy kadhai masala.",
      price: "₹425",
      tags: ["Spicy & Flavorful", "Vegetarian"],
      ingredients: "Paneer, Bell Peppers, Onion, Kadhai Masala, Fresh Coriander, Whole Spices",
      image: "assets/images/kadhai-paneer.jpg"
    },
    {
      category: "north-indian",
      title: "Palak Paneer Royal",
      desc: "Tender cottage cheese cooked in a silky smooth garlic-infused spinach puree, tempered with cumin and topped with fresh malai.",
      price: "₹395",
      tags: ["Healthy Choice", "Vegetarian"],
      ingredients: "Fresh Spinach, Cottage Cheese, Garlic, Cumin, Malai, Green Chilies",
      image: "assets/images/palak-paneer.jpg"
    },
    {
      category: "north-indian",
      title: "Tandoori Paneer Tikka Shashlik",
      desc: "Charcoal-charred paneer cubes marinated in mustard oil, hung curd, and roasted spices, grilled on skewers with capsicum & red onions.",
      price: "₹425",
      tags: ["Clay Oven Tandoori", "Vegetarian"],
      ingredients: "Paneer, Hung Curd, Mustard Oil, Carom Seeds, Bell Peppers, Lemon",
      image: "assets/images/paneer-tikka.jpg"
    },
    {
      category: "north-indian",
      title: "Shahi Malai Paneer Kofta",
      desc: "Delicate melt-in-mouth cottage cheese and potato dumplings stuffed with khoya & nuts, served in a rich white cardamom gravy.",
      price: "₹465",
      tags: ["Royal Heritage", "Vegetarian"],
      ingredients: "Cottage Cheese, Khoya, Cashews, Cardamom, Cream, Saffron",
      image: "assets/images/malai-kofta.jpg"
    },
    {
      category: "north-indian",
      title: "Paneer Lababdar",
      desc: "Grated and cubed cottage cheese cooked together in a thick chunky onion-tomato gravy with ginger juliennes and fresh coriander.",
      price: "₹450",
      tags: ["Rich & Creamy", "Vegetarian"],
      ingredients: "Paneer, Grated Cottage Cheese, Onion Tomato Gravy, Ginger, Butter",
      image: "assets/images/paneer-lababdar.jpg"
    },
    {
      category: "north-indian",
      title: "Paneer Do Pyaza",
      desc: "Cottage cheese cooked with double the onions — diced shallots and caramelized onion paste, spiked with whole cloves and black cardamom.",
      price: "₹415",
      tags: ["Traditional Recipe", "Vegetarian"],
      ingredients: "Paneer, Shallots, Caramelized Onion, Whole Spices, Green Cardamom",
      image: "assets/images/paneer-do-pyaza.jpg"
    },
    {
      category: "north-indian",
      title: "Tandoori Paneer Malai Tikka",
      desc: "Creamy cottage cheese marinated in cashew paste, cardamom, cheese, and white pepper, roasted gently in the tandoor.",
      price: "₹445",
      tags: ["Mild & Creamy", "Vegetarian"],
      ingredients: "Paneer, Cashew Paste, Amul Cheese, Cream, White Pepper, Cardamom",
      image: "assets/images/paneer-malai-tikka.jpg"
    },
    {
      category: "north-indian",
      title: "Classic Butter Chicken",
      desc: "Tender tandoori chicken simmered in a velvety tomato, butter & cashew gravy flavored with Kasuri methi.",
      price: "₹495",
      tags: ["Chef Special", "Must Try"],
      ingredients: "Tandoori Chicken, Amul Butter, Tomato Makhani Gravy, Cashews, Cream",
      image: "assets/images/butter-chicken.jpg"
    },
    {
      category: "north-indian",
      title: "Dal Makhani Royal",
      desc: "Black lentils slow-cooked overnight on charcoal embers with white butter, cream and secret royal spices.",
      price: "₹380",
      tags: ["Vegetarian", "Bestseller"],
      ingredients: "Black Urad Dal, Kidney Beans, White Butter, Cream, Garlic, Kasuri Methi",
      image: "assets/images/dal-makhani.jpg"
    },
    {
      category: "mughlai",
      title: "Hyderabadi Chicken Dum Biryani",
      desc: "Fragrant long-grain basmati rice layered with marinated chicken, saffron & fried onions, served with Mirchi Ka Salan & Raita.",
      price: "₹550",
      tags: ["Royal Recipe", "Signature"],
      ingredients: "Basmati Rice, Marinated Chicken, Saffron, Fried Onions, Mint, Whole Spices",
      image: "assets/images/biryani.jpg"
    },
    {
      category: "mughlai",
      title: "Tandoori Non-Veg Feast Platter",
      desc: "Platter containing Mutton Seekh Kebab, Murgh Malai Tikka, Fish Amritsari and Tandoori Prawns.",
      price: "₹950",
      tags: ["Chef Special"],
      ingredients: "Mutton Seekh, Chicken Tikka, Fish Amritsari, Tandoori Prawns, Mint Chutney",
      image: "assets/images/tandoori-platter.jpg"
    },
    {
      category: "south-indian",
      title: "Mysore Masala Dosa",
      desc: "Crispy rice & lentil crepe smeared with spicy garlic-chili paste, filled with potato masala, served with sambar & coconut chutneys.",
      price: "₹290",
      tags: ["Vegetarian", "South Special"],
      ingredients: "Fermented Rice Batter, Potato Masala, Red Garlic Chutney, Sambar, Coconut Chutney",
      image: "assets/images/masala-dosa.jpg"
    },
    {
      category: "chinese",
      title: "Veg Hakka Noodles & Chili Paneer",
      desc: "Wok-tossed stir fry noodles with crunchy vegetables, garlic and soy sauce served with wok-tossed chili paneer.",
      price: "₹380",
      tags: ["Pan Asian"],
      ingredients: "Noodles, Cottage Cheese, Bell Peppers, Soy Sauce, Garlic, Chili Paste",
      image: "assets/images/chinese-noodles.jpg"
    },
    {
      category: "desserts",
      title: "Shahi Gulab Jamun with Kesar Rabri",
      desc: "Warm pistachio-stuffed khoya dumplings served over chilled saffron-infused thick rabri.",
      price: "₹280",
      tags: ["Vegetarian", "Royal Dessert"],
      ingredients: "Khoya, Pistachios, Cardamom Syrup, Saffron Rabri, Silver Vark",
      image: "assets/images/gulab-jamun.jpg"
    }
  ],

  offers: [
    {
      id: "stay2get1",
      title: "Stay 2 Nights & Get 1 Night Free",
      discount: "1 Night Free",
      validity: "Valid till Oct 31, 2026",
      desc: "Book a 2-night stay in any Executive Room or Suite and enjoy the 3rd consecutive night completely free.",
      includes: [
        "3rd Night Stay Complimentary",
        "Free Buffet Breakfast for 2",
        "Complimentary Wi-Fi Access",
        "15% Off Food & Soft Beverages"
      ],
      priceFrom: "₹14,998 total",
      image: "assets/images/offer-stay2get1.jpg",
      fallback: generatePlaceholderSvg("Stay 2 Get 1 Free", "PROMOTIONAL OFFER", 800, 500, "suite")
    },
    {
      id: "weekend-stay",
      title: "Weekend Staycation – 20% Off",
      discount: "20% OFF",
      validity: "Valid Fri - Sun",
      desc: "Unwind with your loved ones on weekends with 20% off room tariffs and free late checkout till 4 PM.",
      includes: [
        "20% Discount on Room Tariff",
        "Free Late Checkout till 4:00 PM",
        "Complimentary Swimming Pool Access",
        "Welcome Drinks on Arrival"
      ],
      priceFrom: "₹5,999 / night",
      image: "assets/images/offer-weekend.jpg",
      fallback: generatePlaceholderSvg("Weekend Staycation", "20% OFF", 800, 500, "suite")
    },
    {
      id: "couple-stay",
      title: "Royal Couple Stay Package",
      discount: "Romantic Special",
      validity: "Year-Round",
      desc: "Specially curated for couples: includes romantic suite setup, candlelight dinner with wine, and 60-min spa voucher.",
      includes: [
        "1 Night Stay in Luxury Suite",
        "Candlelight Dinner at Le Celestia",
        "60-min Couple Spa Voucher",
        "Romantic Flower Decor & Cake"
      ],
      priceFrom: "₹19,999 / package",
      image: "assets/images/offer-couple.jpg",
      fallback: generatePlaceholderSvg("Royal Couple Stay", "ROMANTIC ESCAPE", 800, 500, "suite")
    },
    {
      id: "family-package",
      title: "Family Holiday Package",
      discount: "Family Special",
      validity: "Valid All Seasons",
      desc: "A fun-filled getaway for the entire family with free meals for kids under 10 and complimentary city sightseeing tour.",
      includes: [
        "2 Nights in Royal Family Suite",
        "Kids Under 10 Eat Free",
        "Guided Half-Day City Tour",
        "Complimentary Extra Bed"
      ],
      priceFrom: "₹42,999 / package",
      image: "assets/images/offer-family.jpg",
      fallback: generatePlaceholderSvg("Family Holiday Package", "FAMILY VACATION", 800, 500, "suite")
    },
    {
      id: "early-bird",
      title: "Early Bird Booking – 15% Off",
      discount: "15% OFF",
      validity: "Book 30 Days Prior",
      desc: "Plan your trip in advance and unlock 15% instant savings on all room categories.",
      includes: [
        "15% Discount on Any Room Category",
        "Complimentary Breakfast Included",
        "Free Date Change Privilege"
      ],
      priceFrom: "₹4,249 / night",
      image: "assets/images/offer-earlybird.jpg",
      fallback: generatePlaceholderSvg("Early Bird Booking", "15% OFF", 800, 500, "suite")
    },
    {
      id: "restaurant-special",
      title: "Restaurant Dining Special – 20% Off",
      discount: "20% OFF Food",
      validity: "Daily 7 PM - 11 PM",
      desc: "Enjoy 20% off total food bill at Le Celestia Fine Dining restaurant for all hotel guests & online reservations.",
      includes: [
        "20% Off A La Carte Food Bill",
        "Complimentary Chef Special Dessert",
        "Reserved Priority Seating"
      ],
      priceFrom: "Valid at Restaurant",
      image: "assets/images/offer-dining.jpg",
      fallback: generatePlaceholderSvg("Restaurant Dining Special", "DINING PRIVILEGE", 800, 500, "dining")
    }
  ],

  events: [
    {
      id: "weddings",
      title: "Royal Indian Weddings & Receptions",
      capacity: "Up to 1,200 Guests",
      desc: "Pillarless grand ballroom with opulent crystal chandeliers, mandap floral decor setup, and customized royal Indian buffet catering.",
      image: "assets/images/wedding-hall.jpg",
      fallback: generatePlaceholderSvg("Royal Indian Weddings", "WEDDING BANQUET", 800, 500, "hotel")
    },
    {
      id: "corporate",
      title: "Corporate Conferences & Summits",
      capacity: "Up to 400 Delegates",
      desc: "High-tech corporate convention center equipped with 4K LED video walls, high-speed Wi-Fi, spatial sound systems, and business lounge.",
      image: "assets/images/corporate-event.jpg",
      fallback: generatePlaceholderSvg("Corporate Conferences", "CONVENTION CENTER", 800, 500, "hotel")
    },
    {
      id: "birthdays",
      title: "Birthday Parties & Anniversaries",
      capacity: "Up to 250 Guests",
      desc: "Poolside or rooftop lounge venue with live DJ setup, theme decoration, cocktail bar, and multi-cuisine buffet counters.",
      image: "assets/images/rooftop-dining.jpg",
      fallback: generatePlaceholderSvg("Birthday & Anniversary Parties", "ROOFTOP BANQUET", 800, 500, "hotel")
    }
  ],

  amenities: [
    { name: "Outdoor Swimming Pool", desc: "Temperature-controlled pool with loungers & kids pool", icon: "🏊‍♂️" },
    { name: "Free High-Speed Wi-Fi", desc: "500 Mbps Wi-Fi across all rooms & public areas", icon: "📶" },
    { name: "24/7 Room Service", desc: "In-room dining served round-the-clock", icon: "🛎️" },
    { name: "Valet Parking & EV Charging", desc: "Covered parking with valet service & charging points", icon: "🚘" },
    { name: "Fine Dining Restaurant", desc: "Authentic North Indian, Mughlai & Pan-Asian dining", icon: "🍽️" },
    { name: "Fitness Center / Gym", desc: "State-of-the-art cardiovascular & weight training", icon: "🏋️‍♂️" },
    { name: "Ayurveda Spa & Sauna", desc: "Rejuvenating massages & steam bath facilities", icon: "🧘‍♀️" },
    { name: "Grand Banquet Halls", desc: "Pillarless halls for weddings & corporate events", icon: "🏰" },
    { name: "Airport Pick & Drop", desc: "Luxury sedan & SUV airport transfers", icon: "🚖" },
    { name: "24/7 Front Desk", desc: "Concierge, travel desk & currency exchange", icon: "🏨" }
  ],

  gallery: [
    { id: 1, title: "Grand Palace Hotel Exterior", category: "architecture", aspect: "landscape", image: "assets/images/hero-1.jpg", fallback: generatePlaceholderSvg("Hotel Exterior", "ARCHITECTURE", 1200, 800, "hotel") },
    { id: 2, title: "Opulent Hotel Lobby & Reception", category: "lobby", aspect: "portrait", image: "assets/images/lobby.jpg", fallback: generatePlaceholderSvg("Hotel Lobby", "INTERIOR", 800, 1000, "hotel") },
    { id: 3, title: "Luxury Suite Bedroom", category: "rooms", aspect: "landscape", image: "assets/images/luxury-suite.jpg", fallback: generatePlaceholderSvg("Luxury Suite", "ROOMS", 1200, 800, "suite") },
    { id: 4, title: "Le Celestia Fine Dining Interior", category: "restaurant", aspect: "square", image: "assets/images/restaurant-main.jpg", fallback: generatePlaceholderSvg("Fine Dining", "RESTAURANT", 900, 900, "dining") },
    { id: 5, title: "Authentic Hyderabadi Dum Biryani", category: "food", aspect: "portrait", image: "assets/images/biryani.jpg", fallback: generatePlaceholderSvg("Hyderabadi Biryani", "FOOD", 800, 1000, "dining") },
    { id: 6, title: "Temperature Controlled Swimming Pool", category: "pool", aspect: "landscape", image: "assets/images/swimming-pool.jpg", fallback: generatePlaceholderSvg("Swimming Pool", "POOL", 1200, 800, "hotel") },
    { id: 7, title: "Royal Wedding Banquet Hall", category: "banquet", aspect: "landscape", image: "assets/images/wedding-hall.jpg", fallback: generatePlaceholderSvg("Wedding Hall", "EVENTS", 1200, 800, "hotel") },
    { id: 8, title: "Rooftop Sky Lounge Dining", category: "rooftop", aspect: "square", image: "assets/images/rooftop-dining.jpg", fallback: generatePlaceholderSvg("Rooftop Lounge", "ROOFTOP", 900, 900, "dining") },
    { id: 9, title: "North Indian Butter Chicken & Naan", category: "food", aspect: "portrait", image: "assets/images/butter-chicken.jpg", fallback: generatePlaceholderSvg("Butter Chicken", "FOOD", 800, 1000, "dining") }
  ],

  testimonials: [
    {
      quote: "AURELIA Grand Hotel is by far the best 5-star hotel experience in India. The hospitality, food at Le Celestia, and room comfort are unmatched. Our family wedding was flawless!",
      author: "Rajesh & Sunita Agarwal",
      role: "Wedding Host & Guest, New Delhi",
      rating: 5,
      avatar: "assets/images/test-1.jpg",
      avatarFallback: generatePlaceholderSvg("Rajesh Agarwal", "VERIFIED GUEST", 200, 200, "hotel")
    },
    {
      quote: "Staying in the Premium Balcony Room was bliss. The Butter Chicken and Dal Makhani served at dinner were divine. Will definitely visit again for our anniversary!",
      author: "Priya & Vikram Malhotra",
      role: "Couple Staycation, Mumbai",
      rating: 5,
      avatar: "assets/images/test-2.jpg",
      avatarFallback: generatePlaceholderSvg("Priya Malhotra", "VERIFIED GUEST", 200, 200, "suite")
    },
    {
      quote: "We hosted our corporate summit with 300 delegates here. The banquet team, audio-visual setup, and lunch buffet exceeded all our expectations.",
      author: "Amitabh Verma",
      role: "VP Corporate Events, Bangalore",
      rating: 5,
      avatar: "assets/images/test-3.jpg",
      avatarFallback: generatePlaceholderSvg("Amitabh Verma", "CORPORATE GUEST", 200, 200, "dining")
    }
  ]
};

Object.freeze(AURELIA_DATA);
