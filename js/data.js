/**
 * The Haveli Royale — Heritage Palace & Luxury Resort
 * Centralized Data Repository (Targeted Premium Indian Hotel & Restaurant Demo)
 */

function generatePlaceholderSvg(title, subtitle = "THE HAVELI ROYALE", width = 1200, height = 800, type = "hotel") {
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
      <text y="8" font-family="'Cormorant Garamond', serif" font-size="28" font-weight="600" fill="url(#goldGrad)" text-anchor="middle">H</text>
    </g>
    <text x="${width / 2}" y="${height / 2 + 50}" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#9a9cb0" text-anchor="middle" letter-spacing="6">${subtitle.toUpperCase()}</text>
    <text x="${width / 2}" y="${height / 2 + 85}" font-family="'Cormorant Garamond', serif" font-size="30" fill="#f4f4f6" text-anchor="middle">${title}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

function generateAvatarSvg(initials) {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <defs>
      <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1c1f2e" />
        <stop offset="100%" stop-color="#0b0c10" />
      </linearGradient>
      <linearGradient id="avatarGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fce8a6" />
        <stop offset="50%" stop-color="#c9a063" />
        <stop offset="100%" stop-color="#96723b" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#avatarBg)" stroke="url(#avatarGold)" stroke-width="3" />
    <circle cx="60" cy="60" r="48" fill="none" stroke="url(#avatarGold)" stroke-width="1" stroke-opacity="0.3" />
    <text x="60" y="69" font-family="'Cormorant Garamond', serif" font-size="34" font-weight="700" fill="url(#avatarGold)" text-anchor="middle" letter-spacing="2">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

const AURELIA_DATA = {
  brand: {
    name: "The Haveli Royale",
    tagline: "HERITAGE PALACE & LUXURY RESORT",
    location: "Udaipur & New Delhi, India",
    founded: "1999",
    phone: "+91 98765 43210 / +91 (0294) 240 0000",
    email: "reservations@thehaveliroyale.in",
    address: "777 Grand Palace Road, Lake Pichola, Udaipur, Rajasthan 313001, India"
  },

  heroSlides: [
    {
      id: 1,
      subtitle: "25+ Years of Indian Hospitality Excellence",
      title: "Where Authentic Indian Warmth Meets Modern 5-Star Luxury",
      description: "Welcome to The Haveli Royale — an iconic sanctuary offering luxury rooms, 24-hour fine dining, grand wedding banquets, and world-class Indian hospitality.",
      ctaPrimary: "Book a Room",
      ctaSecondary: "Explore Restaurant",
      image: "assets/images/hero-1.jpg",
      fallback: generatePlaceholderSvg("The Haveli Royale", "5-STAR LUXURY HOSPITALITY", 1920, 1080, "hotel")
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
    { id: "deluxe-room", category: "deluxe", badge: "Popular Choice", title: "Deluxe Room", subtitle: "Modern Comfort & Style", price: 4999, period: "per night", currency: "₹", size: "35 m² / 375 sq.ft", capacity: "2 Adults", bedType: "King Bed / Twin Beds", view: "City & Garden View", description: "Comfortable room for couples and business travelers, featuring wooden floors, study desk, Smart TV, and marble bathroom.", amenities: ["Free High-Speed Wi-Fi", "55-inch LED Smart TV", "Mini Bar & Tea/Coffee Maker", "24/7 Room Service", "Air Conditioning"], image: "assets/images/deluxe-room.jpg", fallback: generatePlaceholderSvg("Deluxe Room", "MODERN LUXURY", 900, 600, "suite"), roomsLeft: 2, breakfastIncluded: false, reviews: [{"name": "Rajesh Sharma", "location": "Mumbai", "rating": 5, "date": "January 2024", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Priya Mehta", "location": "Delhi", "rating": 4, "date": "February 2024", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Ankit Gupta", "location": "Bangalore", "rating": 5, "date": "March 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Sunita Verma", "location": "Hyderabad", "rating": 4, "date": "April 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "Deepak Patel", "location": "Chennai", "rating": 5, "date": "May 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Kavita Reddy", "location": "Pune", "rating": 4, "date": "June 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Vikram Singh", "location": "Kolkata", "rating": 5, "date": "July 2024", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Neha Joshi", "location": "Ahmedabad", "rating": 5, "date": "August 2024", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Suresh Kumar", "location": "Jaipur", "rating": 4, "date": "September 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "Meenakshi Iyer", "location": "Lucknow", "rating": 5, "date": "October 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "premium-room", category: "premium", badge: "Best Seller", title: "Premium Room with Balcony", subtitle: "Spacious Room with Private View", price: 7499, period: "per night", currency: "₹", size: "48 m² / 515 sq.ft", capacity: "2 Adults + 1 Child", bedType: "Royal King Size Bed", view: "Panoramic Pool & Garden View", description: "Spacious room with a private balcony overlooking the pool, comfortable seating, coffee maker, wardrobe, and free daily breakfast.", amenities: ["Private Sit-Out Balcony", "Free Daily Breakfast", "Espresso Coffee Machine", "Plush Bathrobes & Slippers", "Electronic Safe Locker"], image: "assets/images/premium-room.jpg", fallback: generatePlaceholderSvg("Premium Room", "BALCONY VIEW", 900, 600, "suite"), roomsLeft: 4, breakfastIncluded: true, reviews: [{"name": "Amit Agarwal", "location": "Chandigarh", "rating": 4, "date": "November 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Pooja Deshmukh", "location": "Indore", "rating": 5, "date": "December 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "Rohit Kapoor", "location": "Nagpur", "rating": 4, "date": "January 2025", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "Sneha Nair", "location": "Surat", "rating": 5, "date": "February 2025", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Arjun Malhotra", "location": "Bhopal", "rating": 5, "date": "March 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Divya Saxena", "location": "Patna", "rating": 4, "date": "April 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Manoj Tiwari", "location": "Ludhiana", "rating": 5, "date": "May 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Rekha Pillai", "location": "Agra", "rating": 5, "date": "June 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Sanjay Dubey", "location": "Nashik", "rating": 4, "date": "July 2024", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "Ritika Bhatia", "location": "Faridabad", "rating": 3, "date": "August 2024", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] },
    { id: "executive-room", category: "executive", badge: "Business Luxury", title: "Executive Business Room", subtitle: "Includes Lounge Access & Airport Transfer", price: 10999, period: "per night", currency: "₹", size: "62 m² / 665 sq.ft", capacity: "2 Adults", bedType: "Soft King Size Bed", view: "Skyline & Lake View", description: "Designed for business travelers, featuring free airport pickup & drop, Executive Lounge access, evening drinks & snacks, and free ironing service.", amenities: ["Executive Lounge Access", "Free Airport Pick & Drop", "Daily Drinks Hour", "Deep Soaking Bath Tub", "High-Speed Wi-Fi 500 Mbps"], image: "assets/images/executive-room.jpg", fallback: generatePlaceholderSvg("Executive Room", "EXECUTIVE PRIVILEGE", 900, 600, "suite"), roomsLeft: 1, breakfastIncluded: true, reviews: [{"name": "Alok Nath", "location": "Meerut", "rating": 5, "date": "September 2024", "text": "The evening cultural program was a nice touch. Enjoyed the folk dance and music. Good initiative."}, {"name": "Ritu Phogat", "location": "Rajkot", "rating": 4, "date": "October 2024", "text": "Spacious rooms and huge bathrooms. The toiletries provided were of high quality. Impressive."}, {"name": "Karan Johar", "location": "Kalyan-Dombivli", "rating": 5, "date": "November 2024", "text": "The swimming pool is very well maintained. Kids didn't want to come out. Had a great time."}, {"name": "Simran Kaur", "location": "Vasai-Virar", "rating": 5, "date": "December 2024", "text": "Quick check-in and check-out process. No unnecessary delays. Staff is very professional."}, {"name": "Rahul Dravid", "location": "Varanasi", "rating": 4, "date": "January 2025", "text": "Food at the restaurant is a bit expensive but the taste justifies it. Loved the dal makhani."}, {"name": "Geeta Basra", "location": "Srinagar", "rating": 5, "date": "February 2025", "text": "The bed was so comfortable, had the best sleep after a long tiring day of sightseeing."}, {"name": "Varun Dhawan", "location": "Aurangabad", "rating": 5, "date": "March 2025", "text": "Beautiful property with well-manicured lawns. A great place to take photographs."}, {"name": "Alia Bhatt", "location": "Dhanbad", "rating": 5, "date": "April 2025", "text": "The room decor is very elegant. Loved the small touches like fresh flowers and welcome drink."}, {"name": "Nitin Gadkari", "location": "Amritsar", "rating": 4, "date": "May 2024", "text": "Good for a short business trip. The desk in the room is quite spacious. Room lighting is good."}, {"name": "Smriti Irani", "location": "Navi Mumbai", "rating": 5, "date": "June 2024", "text": "My parents loved their stay. The staff was very attentive to their needs. Thank you so much."}] },
    { id: "luxury-suite", category: "suite", badge: "Flagship Suite", title: "Grand Luxury Suite", subtitle: "Separate Living Room & Jacuzzi", price: 18500, period: "per night", currency: "₹", size: "110 m² / 1,180 sq.ft", capacity: "3 Guests", bedType: "Emperor King Size Bed", view: "Panoramic Lake & Palace View", description: "Top luxury suite featuring a separate living room, master bedroom, marble bath with Jacuzzi tub, 24-hour private butler, and free fruit & drinks basket.", amenities: ["In-Room Jacuzzi Tub", "Separate Living & Dining Room", "24/7 Private Butler", "Forest Essentials Toiletries", "Welcome Fruit & Drink Basket"], image: "assets/images/luxury-suite.jpg", fallback: generatePlaceholderSvg("Luxury Suite", "ROYAL JACUZZI SUITE", 900, 600, "suite"), roomsLeft: 1, breakfastIncluded: true, reviews: [{"name": "Ramesh Powar", "location": "Allahabad", "rating": 5, "date": "July 2024", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Kiran Bedi", "location": "Ranchi", "rating": 4, "date": "August 2024", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Harish Salve", "location": "Howrah", "rating": 5, "date": "September 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Sushma Swaraj", "location": "Coimbatore", "rating": 4, "date": "October 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "Piyush Goyal", "location": "Jabalpur", "rating": 5, "date": "November 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Nirmala Sitharaman", "location": "Gwalior", "rating": 4, "date": "December 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Rajeev Chandrasekhar", "location": "Vijayawada", "rating": 5, "date": "January 2025", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Anurag Thakur", "location": "Jodhpur", "rating": 5, "date": "February 2025", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Kiren Rijiju", "location": "Madurai", "rating": 4, "date": "March 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "Hardeep Singh Puri", "location": "Raipur", "rating": 5, "date": "April 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "family-suite", category: "family", badge: "Family Favorite", title: "Royal Family Suite", subtitle: "Connected Rooms for Families", price: 24999, period: "per night", currency: "₹", size: "145 m² / 1,560 sq.ft", capacity: "4 Adults + 2 Children", bedType: "2 Master King Beds", view: "Garden & Pool View", description: "Ideal for family holidays, featuring 2 connected master bedrooms, 2 full marble bathrooms, a dining table for 6, kids play area, and free dinner for kids.", amenities: ["2 Connected Bedrooms", "2 Full Marble Bathrooms", "Dining Table for 6 Guests", "Kids Games & Play Area", "Free Dinner for Kids"], image: "assets/images/family-suite.jpg", fallback: generatePlaceholderSvg("Family Suite", "FAMILY STAY", 900, 600, "suite"), roomsLeft: 3, breakfastIncluded: true, reviews: [{"name": "Mansukh Mandaviya", "location": "Kota", "rating": 4, "date": "May 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Bhupender Yadav", "location": "Guwahati", "rating": 5, "date": "June 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "Parshottam Rupala", "location": "Chandigarh", "rating": 4, "date": "July 2024", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "G. Kishan Reddy", "location": "Solapur", "rating": 5, "date": "August 2024", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Anupriya Patel", "location": "Hubli-Dharwad", "rating": 5, "date": "September 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Sanjeev Balyan", "location": "Bareilly", "rating": 4, "date": "October 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Nityanand Rai", "location": "Moradabad", "rating": 5, "date": "November 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Pankaj Chaudhary", "location": "Mysore", "rating": 5, "date": "December 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Meenakshi Lekhi", "location": "Gurgaon", "rating": 4, "date": "January 2025", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "Som Parkash", "location": "Aligarh", "rating": 3, "date": "February 2025", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] },
    { id: "presidential-suite", category: "suite", badge: "Presidential Luxury", title: "Maharana Presidential Suite", subtitle: "Grand Palace Living with Private Terrace", price: 45000, period: "per night", currency: "₹", size: "220 m² / 2,360 sq.ft", capacity: "4 Guests", bedType: "Royal Emperor King Bed", view: "360-Degree Lake Pichola View", description: "Our grandest palace residence featuring a private rooftop terrace, royal dining hall for 8, heated Jacuzzi, personal chef, and 24-hour butler team.", amenities: ["Private Rooftop Terrace", "Royal Dining Hall for 8", "Personal Chef on Demand", "Private Chauffeur Car", "Unlimited Spa Treatments"], image: "assets/images/hero-1.jpg", fallback: generatePlaceholderSvg("Presidential Suite", "ROYAL PALACE LIVING", 900, 600, "suite"), roomsLeft: 1, breakfastIncluded: true, reviews: [{"name": "Rameswar Teli", "location": "Jalandhar", "rating": 5, "date": "March 2024", "text": "The evening cultural program was a nice touch. Enjoyed the folk dance and music. Good initiative."}, {"name": "Kailash Choudhary", "location": "Tiruchirappalli", "rating": 4, "date": "April 2024", "text": "Spacious rooms and huge bathrooms. The toiletries provided were of high quality. Impressive."}, {"name": "Annpurna Devi", "location": "Bhubaneswar", "rating": 5, "date": "May 2024", "text": "The swimming pool is very well maintained. Kids didn't want to come out. Had a great time."}, {"name": "A. Narayanaswamy", "location": "Salem", "rating": 5, "date": "June 2024", "text": "Quick check-in and check-out process. No unnecessary delays. Staff is very professional."}, {"name": "Kaushal Kishore", "location": "Mira-Bhayandar", "rating": 4, "date": "July 2024", "text": "Food at the restaurant is a bit expensive but the taste justifies it. Loved the dal makhani."}, {"name": "Ajay Bhatt", "location": "Thiruvananthapuram", "rating": 5, "date": "August 2024", "text": "The bed was so comfortable, had the best sleep after a long tiring day of sightseeing."}, {"name": "B. L. Verma", "location": "Bhiwandi", "rating": 5, "date": "September 2024", "text": "Beautiful property with well-manicured lawns. A great place to take photographs."}, {"name": "Ajay Kumar Mishra", "location": "Saharanpur", "rating": 5, "date": "October 2024", "text": "The room decor is very elegant. Loved the small touches like fresh flowers and welcome drink."}, {"name": "Devusinh Chauhan", "location": "Gorakhpur", "rating": 4, "date": "November 2024", "text": "Good for a short business trip. The desk in the room is quite spacious. Room lighting is good."}, {"name": "Bhagwanth Khuba", "location": "Guntur", "rating": 5, "date": "December 2024", "text": "My parents loved their stay. The staff was very attentive to their needs. Thank you so much."}] },
    { id: "royal-lake-suite", category: "suite", badge: "Lakefront View", title: "Royal Lakefront Palace Suite", subtitle: "Direct Waterfront & Sun Deck View", price: 32000, period: "per night", currency: "₹", size: "160 m² / 1,720 sq.ft", capacity: "3 Guests", bedType: "Four-Poster Teak King Bed", view: "Unobstructed Lake Pichola View", description: "Luxury lakefront suite with floor-to-ceiling windows, private sun deck overlooking Lake Pichola, clawfoot bathtub, and evening champagne service.", amenities: ["Private Lakefront Sun Deck", "Clawfoot Marble Bathtub", "Evening Champagne & Canapes", "Private Sunset Boat Ride", "24/7 Butler Service"], image: "assets/images/hero-2.jpg", fallback: generatePlaceholderSvg("Lakefront Suite", "LAKE PICHOLA VIEW", 900, 600, "suite"), roomsLeft: 2, breakfastIncluded: true, reviews: [{"name": "Kapil Patil", "location": "Bikaner", "rating": 5, "date": "January 2025", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Pratima Bhoumik", "location": "Amravati", "rating": 4, "date": "February 2025", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Subhas Sarkar", "location": "Noida", "rating": 5, "date": "March 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Bhagwat Karad", "location": "Jamshedpur", "rating": 4, "date": "April 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "Rajkumar Ranjan Singh", "location": "Bhilai", "rating": 5, "date": "May 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Bharati Pawar", "location": "Cuttack", "rating": 4, "date": "June 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Bishweswar Tudu", "location": "Firozabad", "rating": 5, "date": "July 2024", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Shantanu Thakur", "location": "Kochi", "rating": 5, "date": "August 2024", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Munjapara Mahendrabhai", "location": "Nellore", "rating": 4, "date": "September 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "John Barla", "location": "Bhavnagar", "rating": 5, "date": "October 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "heritage-haveli-room", category: "deluxe", badge: "Heritage Special", title: "Heritage Haveli Courtyard Room", subtitle: "Traditional Rajasthani Architecture", price: 8999, period: "per night", currency: "₹", size: "52 m² / 560 sq.ft", capacity: "2 Adults", bedType: "Handcrafted Wooden King Bed", view: "Central Heritage Courtyard", description: "Experience royal Rajasthani heritage featuring hand-painted Jharokha seating, carved teakwood furniture, brass fittings, and courtyard garden access.", amenities: ["Jharokha Bay Seating", "Courtyard Garden Access", "Hand-Carved Furniture", "Free High-Speed Wi-Fi", "Traditional Welcome Drinks"], image: "assets/images/hero-3.jpg", fallback: generatePlaceholderSvg("Heritage Haveli Room", "RAJASTHANI HERITAGE", 900, 600, "suite"), roomsLeft: 5, breakfastIncluded: false, reviews: [{"name": "L. Murugan", "location": "Dehradun", "rating": 4, "date": "November 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Nisith Pramanik", "location": "Durgapur", "rating": 5, "date": "December 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "S. Jaishankar", "location": "Asansol", "rating": 4, "date": "January 2025", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "Narendra Singh Tomar", "location": "Rourkela", "rating": 5, "date": "February 2025", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Arjun Munda", "location": "Nanded", "rating": 5, "date": "March 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Pralhad Joshi", "location": "Kolhapur", "rating": 4, "date": "April 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Narayan Rane", "location": "Ajmer", "rating": 5, "date": "May 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Sarbananda Sonowal", "location": "Akola", "rating": 5, "date": "June 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Virendra Kumar", "location": "Gulbarga", "rating": 4, "date": "July 2024", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "Jyotiraditya Scindia", "location": "Jamnagar", "rating": 3, "date": "August 2024", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] },
    { id: "honeymoon-villa", category: "suite", badge: "Honeymoon Special", title: "Royal Honeymoon Villa with Private Pool", subtitle: "Private Plunge Pool & Candlelight Deck", price: 28500, period: "per night", currency: "₹", size: "135 m² / 1,450 sq.ft", capacity: "2 Couples", bedType: "Romantic Canopy King Bed", view: "Private Garden & Pool View", description: "Designed for couples, featuring a private temperature-controlled plunge pool, open-air rain shower, private garden gazebo, and romantic setup.", amenities: ["Private Plunge Pool", "Outdoor Open-Air Rain Shower", "Private Candlelight Dinner Setup", "Free Couple Spa Massage", "Rose Petal Turndown"], image: "assets/images/swimming-pool.jpg", fallback: generatePlaceholderSvg("Honeymoon Villa", "PRIVATE POOL VILLA", 900, 600, "suite"), roomsLeft: 2, breakfastIncluded: true, reviews: [{"name": "Ramchandra Prasad Singh", "location": "Ujjain", "rating": 5, "date": "September 2024", "text": "The evening cultural program was a nice touch. Enjoyed the folk dance and music. Good initiative."}, {"name": "Ashwini Vaishnaw", "location": "Loni", "rating": 4, "date": "October 2024", "text": "Spacious rooms and huge bathrooms. The toiletries provided were of high quality. Impressive."}, {"name": "Pashupati Kumar Paras", "location": "Siliguri", "rating": 5, "date": "November 2024", "text": "The swimming pool is very well maintained. Kids didn't want to come out. Had a great time."}, {"name": "Gajendra Singh Shekhawat", "location": "Jhansi", "rating": 5, "date": "December 2024", "text": "Quick check-in and check-out process. No unnecessary delays. Staff is very professional."}, {"name": "Raj Kumar Singh", "location": "Ulhasnagar", "rating": 4, "date": "January 2025", "text": "Food at the restaurant is a bit expensive but the taste justifies it. Loved the dal makhani."}, {"name": "Mahendra Nath Pandey", "location": "Jammu", "rating": 5, "date": "February 2025", "text": "The bed was so comfortable, had the best sleep after a long tiring day of sightseeing."}, {"name": "Satya Pal Singh Baghel", "location": "Mangalore", "rating": 5, "date": "March 2025", "text": "Beautiful property with well-manicured lawns. A great place to take photographs."}, {"name": "Shobha Karandlaje", "location": "Erode", "rating": 5, "date": "April 2025", "text": "The room decor is very elegant. Loved the small touches like fresh flowers and welcome drink."}, {"name": "Bhanu Pratap Singh Verma", "location": "Belgaum", "rating": 4, "date": "May 2024", "text": "Good for a short business trip. The desk in the room is quite spacious. Room lighting is good."}, {"name": "Darshana Jardosh", "location": "Tirunelveli", "rating": 5, "date": "June 2024", "text": "My parents loved their stay. The staff was very attentive to their needs. Thank you so much."}] },
    { id: "rooftop-penthouse", category: "suite", badge: "Penthouse Luxury", title: "Skyline Rooftop Penthouse Suite", subtitle: "Private Rooftop Lounge & Sky Jacuzzi", price: 38000, period: "per night", currency: "₹", size: "190 m² / 2,040 sq.ft", capacity: "4 Guests", bedType: "2 Plush Feather King Beds", view: "Panoramic Udaipur Skyline", description: "Top-floor penthouse suite featuring a private rooftop open-air lounge, glass sky Jacuzzi, cocktail bar, and panoramic sunset views over the city.", amenities: ["Private Sky Lounge", "Glass Jacuzzi with View", "In-Room Cocktail Bar", "Dedicated Butler", "Airport Luxury Pickup"], image: "assets/images/rooftop-dining.jpg", fallback: generatePlaceholderSvg("Penthouse Suite", "SKYLINE PENTHOUSE", 900, 600, "suite"), roomsLeft: 1, breakfastIncluded: true, reviews: [{"name": "Renuka Singh Saruta", "location": "Malegaon", "rating": 5, "date": "July 2024", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Ravi Shankar Prasad", "location": "Gaya", "rating": 4, "date": "August 2024", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Prakash Javadekar", "location": "Jalgaon", "rating": 5, "date": "September 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Harsh Vardhan", "location": "Udaipur", "rating": 4, "date": "October 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "Ramesh Pokhriyal", "location": "Davanagere", "rating": 5, "date": "November 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Sadananda Gowda", "location": "Kozhikode", "rating": 4, "date": "December 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Thawar Chand Gehlot", "location": "Akbarpur", "rating": 5, "date": "January 2025", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Santosh Gangwar", "location": "Mumbai", "rating": 5, "date": "February 2025", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Babul Supriyo", "location": "Delhi", "rating": 4, "date": "March 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "Sanjay Dhotre", "location": "Bangalore", "rating": 5, "date": "April 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "garden-villa", category: "family", badge: "Garden Resort", title: "Royal Garden Pavilion Villa", subtitle: "Lush Lawn View with Private Verandah", price: 14500, period: "per night", currency: "₹", size: "85 m² / 915 sq.ft", capacity: "3 Adults", bedType: "King Bed + Extra Sofa Bed", view: "Palace Royal Gardens", description: "Nestled amidst lush botanical gardens, featuring a private outdoor verandah, rocking chairs, lawn access, and peaceful bird-chirping mornings.", amenities: ["Private Outdoor Verandah", "Direct Lawn Access", "Nespresso Coffee Bar", "24/7 Room Service", "Free Breakfast"], image: "assets/images/about-main.jpg", fallback: generatePlaceholderSvg("Garden Villa", "GARDEN PAVILION", 900, 600, "suite"), roomsLeft: 4, breakfastIncluded: true, reviews: [{"name": "Rattan Lal Kataria", "location": "Hyderabad", "rating": 4, "date": "May 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Pratap Chandra Sarangi", "location": "Chennai", "rating": 5, "date": "June 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "Debasree Chaudhuri", "location": "Pune", "rating": 4, "date": "July 2024", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "Rao Inderjit Singh", "location": "Kolkata", "rating": 5, "date": "August 2024", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Jitendra Singh", "location": "Ahmedabad", "rating": 5, "date": "September 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Shripad Yesso Naik", "location": "Jaipur", "rating": 4, "date": "October 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Faggansingh Kulaste", "location": "Lucknow", "rating": 5, "date": "November 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Ashwini Kumar Choubey", "location": "Chandigarh", "rating": 5, "date": "December 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Arjun Ram Meghwal", "location": "Indore", "rating": 4, "date": "January 2025", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "V. K. Singh", "location": "Nagpur", "rating": 3, "date": "February 2025", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] },
    { id: "palace-king-room", category: "deluxe", badge: "Smart Comfort", title: "Palace King Room", subtitle: "Contemporary Design with Heritage Accents", price: 6499, period: "per night", currency: "₹", size: "42 m² / 450 sq.ft", capacity: "2 Adults", bedType: "King Size Plush Bed", view: "City & Pool View", description: "Modern luxury room featuring soundproof glass windows, ambient mood lighting, high-speed Wi-Fi, 55-inch Smart TV, and marble bathroom.", amenities: ["Soundproof Windows", "Ambient Mood Lighting", "55-inch Smart TV", "Free Wi-Fi", "Walk-In Shower"], image: "assets/images/deluxe-room.jpg", fallback: generatePlaceholderSvg("Palace King Room", "PALACE KING", 900, 600, "suite"), roomsLeft: 6, breakfastIncluded: false, reviews: [{"name": "Krishan Pal", "location": "Surat", "rating": 5, "date": "March 2024", "text": "The evening cultural program was a nice touch. Enjoyed the folk dance and music. Good initiative."}, {"name": "Danve Raosaheb Dadarao", "location": "Bhopal", "rating": 4, "date": "April 2024", "text": "Spacious rooms and huge bathrooms. The toiletries provided were of high quality. Impressive."}, {"name": "Ramdas Athawale", "location": "Patna", "rating": 5, "date": "May 2024", "text": "The swimming pool is very well maintained. Kids didn't want to come out. Had a great time."}, {"name": "Sadhvi Niranjan Jyoti", "location": "Ludhiana", "rating": 5, "date": "June 2024", "text": "Quick check-in and check-out process. No unnecessary delays. Staff is very professional."}, {"name": "V. Muraleedharan", "location": "Agra", "rating": 4, "date": "July 2024", "text": "Food at the restaurant is a bit expensive but the taste justifies it. Loved the dal makhani."}, {"name": "Amit Shah", "location": "Nashik", "rating": 5, "date": "August 2024", "text": "The bed was so comfortable, had the best sleep after a long tiring day of sightseeing."}, {"name": "Rajnath Singh", "location": "Faridabad", "rating": 5, "date": "September 2024", "text": "Beautiful property with well-manicured lawns. A great place to take photographs."}, {"name": "Dharmendra Pradhan", "location": "Meerut", "rating": 5, "date": "October 2024", "text": "The room decor is very elegant. Loved the small touches like fresh flowers and welcome drink."}, {"name": "Mukhtar Abbas Naqvi", "location": "Rajkot", "rating": 4, "date": "November 2024", "text": "Good for a short business trip. The desk in the room is quite spacious. Room lighting is good."}, {"name": "Giriraj Singh", "location": "Varanasi", "rating": 5, "date": "December 2024", "text": "My parents loved their stay. The staff was very attentive to their needs. Thank you so much."}] },
    { id: "signature-duplex-suite", category: "suite", badge: "Duplex Special", title: "Signature Heritage Duplex Suite", subtitle: "Two-Level Loft Living with Private Staircase", price: 21000, period: "per night", currency: "₹", size: "125 m² / 1,340 sq.ft", capacity: "3 Guests", bedType: "Mezzanine Master King Bed", view: "Lake & Palace Courtyard", description: "Unique two-floor suite with a lower floor living salon and an upper mezzanine master bedroom connected via a carved wooden spiral staircase.", amenities: ["Two-Level Duplex Layout", "Carved Wooden Spiral Stairs", "Lower Floor Guest Lounge", "2 Full Bathrooms", "Free Butler Service"], image: "assets/images/luxury-suite.jpg", fallback: generatePlaceholderSvg("Duplex Suite", "HERITAGE DUPLEX", 900, 600, "suite"), roomsLeft: 2, breakfastIncluded: true, reviews: [{"name": "Pralhad Singh Patel", "location": "Srinagar", "rating": 5, "date": "January 2024", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Gajendra Singh Shekhawat", "location": "Aurangabad", "rating": 4, "date": "February 2024", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Mahendra Nath Pandey", "location": "Dhanbad", "rating": 5, "date": "March 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Parshottam Rupala", "location": "Amritsar", "rating": 4, "date": "April 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "G. Kishan Reddy", "location": "Navi Mumbai", "rating": 5, "date": "May 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Anurag Thakur", "location": "Allahabad", "rating": 4, "date": "June 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Pankaj Chaudhary", "location": "Ranchi", "rating": 5, "date": "July 2024", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Anupriya Patel", "location": "Howrah", "rating": 5, "date": "August 2024", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Satya Pal Singh Baghel", "location": "Coimbatore", "rating": 4, "date": "September 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "Rajeev Chandrasekhar", "location": "Jabalpur", "rating": 5, "date": "October 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "lakeview-deluxe", category: "premium", badge: "Lake View", title: "Lakeview Deluxe Room", subtitle: "Direct Balcony Facing Lake Pichola", price: 8200, period: "per night", currency: "₹", size: "45 m² / 485 sq.ft", capacity: "2 Adults", bedType: "King Bed / Twin Beds", view: "Direct Lake Pichola View", description: "Enjoy breathtaking sunrise views over Lake Pichola from your private balcony. Includes plush bedding, marble bath, and daily buffet breakfast.", amenities: ["Lakefront Private Balcony", "Free Buffet Breakfast", "Mini Bar & Coffee Maker", "24/7 Room Service", "Air Conditioning"], image: "assets/images/premium-room.jpg", fallback: generatePlaceholderSvg("Lakeview Deluxe", "LAKEVIEW ROOM", 900, 600, "suite"), roomsLeft: 3, breakfastIncluded: true, reviews: [{"name": "Shobha Karandlaje", "location": "Gwalior", "rating": 4, "date": "November 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Bhanu Pratap Singh Verma", "location": "Vijayawada", "rating": 5, "date": "December 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "Darshana Jardosh", "location": "Jodhpur", "rating": 4, "date": "January 2025", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "Meenakshi Lekhi", "location": "Madurai", "rating": 5, "date": "February 2025", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Som Parkash", "location": "Raipur", "rating": 5, "date": "March 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Guest 1", "location": "Kota", "rating": 4, "date": "April 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Guest 2", "location": "Guwahati", "rating": 5, "date": "May 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Guest 3", "location": "Chandigarh", "rating": 5, "date": "June 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Guest 4", "location": "Solapur", "rating": 4, "date": "July 2024", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "Guest 5", "location": "Hubli-Dharwad", "rating": 3, "date": "August 2024", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] },
    { id: "club-executive-suite", category: "executive", badge: "Executive Privilege", title: "Club Executive Lounge Suite", subtitle: "Exclusive Club Floor Benefits Included", price: 12800, period: "per night", currency: "₹", size: "70 m² / 750 sq.ft", capacity: "2 Adults", bedType: "Plush Feather King Bed", view: "Palace Pool & City View", description: "Located on the exclusive top Executive Floor, including private lounge check-in, complimentary meeting room usage, and evening cocktail hours.", amenities: ["Private Club Lounge Access", "Free Meeting Room (2 Hours)", "Evening Cocktails & Snacks", "Free Airport Transfer", "Express Laundry"], image: "assets/images/executive-room.jpg", fallback: generatePlaceholderSvg("Club Suite", "EXECUTIVE CLUB", 900, 600, "suite"), roomsLeft: 1, breakfastIncluded: true, reviews: [{"name": "Guest 6", "location": "Bareilly", "rating": 5, "date": "September 2024", "text": "The evening cultural program was a nice touch. Enjoyed the folk dance and music. Good initiative."}, {"name": "Guest 7", "location": "Moradabad", "rating": 4, "date": "October 2024", "text": "Spacious rooms and huge bathrooms. The toiletries provided were of high quality. Impressive."}, {"name": "Guest 8", "location": "Mysore", "rating": 5, "date": "November 2024", "text": "The swimming pool is very well maintained. Kids didn't want to come out. Had a great time."}, {"name": "Guest 9", "location": "Gurgaon", "rating": 5, "date": "December 2024", "text": "Quick check-in and check-out process. No unnecessary delays. Staff is very professional."}, {"name": "Guest 10", "location": "Aligarh", "rating": 4, "date": "January 2025", "text": "Food at the restaurant is a bit expensive but the taste justifies it. Loved the dal makhani."}, {"name": "Guest 11", "location": "Jalandhar", "rating": 5, "date": "February 2025", "text": "The bed was so comfortable, had the best sleep after a long tiring day of sightseeing."}, {"name": "Guest 12", "location": "Tiruchirappalli", "rating": 5, "date": "March 2025", "text": "Beautiful property with well-manicured lawns. A great place to take photographs."}, {"name": "Guest 13", "location": "Bhubaneswar", "rating": 5, "date": "April 2025", "text": "The room decor is very elegant. Loved the small touches like fresh flowers and welcome drink."}, {"name": "Guest 14", "location": "Salem", "rating": 4, "date": "May 2024", "text": "Good for a short business trip. The desk in the room is quite spacious. Room lighting is good."}, {"name": "Guest 15", "location": "Mira-Bhayandar", "rating": 5, "date": "June 2024", "text": "My parents loved their stay. The staff was very attentive to their needs. Thank you so much."}] },
    { id: "maharaja-royal-suite", category: "suite", badge: "Ultimate Luxury", title: "Maharaja Royal Heritage Suite", subtitle: "Historic Royal Residence with Antique Furnishings", price: 55000, period: "per night", currency: "₹", size: "260 m² / 2,800 sq.ft", capacity: "4 Guests", bedType: "Gold-Leaf Carved Emperor Bed", view: "Full Lake & City Palace View", description: "The pinnacle of royal luxury featuring authentic 19th-century gold-leaf artwork, private spa treatment room, royal banquet dining table, and private bodyguard quarters.", amenities: ["Private In-Suite Spa Room", "Gold-Leaf Royal Artwork", "Private Bodyguard Quarters", "24/7 Royal Butler Team", "Private Airport Chauffeur"], image: "assets/images/hero-1.jpg", fallback: generatePlaceholderSvg("Maharaja Suite", "MAHARAJA ROYAL PALACE", 900, 600, "suite"), roomsLeft: 1, breakfastIncluded: true, reviews: [{"name": "Guest 16", "location": "Thiruvananthapuram", "rating": 5, "date": "July 2024", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Guest 17", "location": "Bhiwandi", "rating": 4, "date": "August 2024", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Guest 18", "location": "Saharanpur", "rating": 5, "date": "September 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Guest 19", "location": "Gorakhpur", "rating": 4, "date": "October 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "Guest 20", "location": "Guntur", "rating": 5, "date": "November 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Guest 21", "location": "Bikaner", "rating": 4, "date": "December 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Guest 22", "location": "Amravati", "rating": 5, "date": "January 2025", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Guest 23", "location": "Noida", "rating": 5, "date": "February 2025", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Guest 24", "location": "Jamshedpur", "rating": 4, "date": "March 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "Guest 25", "location": "Bhilai", "rating": 5, "date": "April 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "pool-access-suite", category: "premium", badge: "Pool Access", title: "Poolside Lagoon Access Suite", subtitle: "Direct Deck Access to Heated Pool", price: 16500, period: "per night", currency: "₹", size: "75 m² / 800 sq.ft", capacity: "2 Adults + 1 Child", bedType: "King Size Resort Bed", view: "Heated Swimming Pool", description: "Step straight from your private patio directly into the temperature-controlled swimming pool. Features sun loungers, outdoor daybed, and pool bar service.", amenities: ["Direct Pool Step-Out Deck", "Private Sun Loungers", "Free Pool Bar Beverages", "Espresso Machine", "Daily Breakfast"], image: "assets/images/swimming-pool.jpg", fallback: generatePlaceholderSvg("Pool Access Suite", "LAGOON POOL SUITE", 900, 600, "suite"), roomsLeft: 3, breakfastIncluded: true, reviews: [{"name": "Guest 26", "location": "Cuttack", "rating": 4, "date": "May 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Guest 27", "location": "Firozabad", "rating": 5, "date": "June 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "Guest 28", "location": "Kochi", "rating": 4, "date": "July 2024", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "Guest 29", "location": "Nellore", "rating": 5, "date": "August 2024", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Guest 30", "location": "Bhavnagar", "rating": 5, "date": "September 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Guest 31", "location": "Dehradun", "rating": 4, "date": "October 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Guest 32", "location": "Durgapur", "rating": 5, "date": "November 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Guest 33", "location": "Asansol", "rating": 5, "date": "December 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Guest 34", "location": "Rourkela", "rating": 4, "date": "January 2025", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "Guest 35", "location": "Nanded", "rating": 3, "date": "February 2025", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] },
    { id: "wellness-spa-suite", category: "executive", badge: "Wellness & Spa", title: "Jivana Wellness & Spa Retreat Suite", subtitle: "In-Room Herbal Sauna & Massage Area", price: 19999, period: "per night", currency: "₹", size: "95 m² / 1,020 sq.ft", capacity: "2 Adults", bedType: "Ergonomic Orthopedic King", view: "Serene Garden View", description: "Designed for relaxation, featuring a private in-suite herbal sauna steam room, massage table, organic aromatherapy oils, and daily Ayurvedic breakfast.", amenities: ["Private In-Suite Steam Sauna", "In-Room Massage Table", "Daily Ayurvedic Breakfast", "Yoga & Meditation Mat", "Organic Bath Items"], image: "assets/images/about-main.jpg", fallback: generatePlaceholderSvg("Wellness Suite", "SPA RETREAT SUITE", 900, 600, "suite"), roomsLeft: 2, breakfastIncluded: true, reviews: [{"name": "Guest 36", "location": "Kolhapur", "rating": 5, "date": "March 2024", "text": "The evening cultural program was a nice touch. Enjoyed the folk dance and music. Good initiative."}, {"name": "Guest 37", "location": "Ajmer", "rating": 4, "date": "April 2024", "text": "Spacious rooms and huge bathrooms. The toiletries provided were of high quality. Impressive."}, {"name": "Guest 38", "location": "Akola", "rating": 5, "date": "May 2024", "text": "The swimming pool is very well maintained. Kids didn't want to come out. Had a great time."}, {"name": "Guest 39", "location": "Gulbarga", "rating": 5, "date": "June 2024", "text": "Quick check-in and check-out process. No unnecessary delays. Staff is very professional."}, {"name": "Guest 40", "location": "Jamnagar", "rating": 4, "date": "July 2024", "text": "Food at the restaurant is a bit expensive but the taste justifies it. Loved the dal makhani."}, {"name": "Guest 41", "location": "Ujjain", "rating": 5, "date": "August 2024", "text": "The bed was so comfortable, had the best sleep after a long tiring day of sightseeing."}, {"name": "Guest 42", "location": "Loni", "rating": 5, "date": "September 2024", "text": "Beautiful property with well-manicured lawns. A great place to take photographs."}, {"name": "Guest 43", "location": "Siliguri", "rating": 5, "date": "October 2024", "text": "The room decor is very elegant. Loved the small touches like fresh flowers and welcome drink."}, {"name": "Guest 44", "location": "Jhansi", "rating": 4, "date": "November 2024", "text": "Good for a short business trip. The desk in the room is quite spacious. Room lighting is good."}, {"name": "Guest 45", "location": "Ulhasnagar", "rating": 5, "date": "December 2024", "text": "My parents loved their stay. The staff was very attentive to their needs. Thank you so much."}] },
    { id: "courtyard-twin-room", category: "deluxe", badge: "Twin Special", title: "Heritage Courtyard Twin Room", subtitle: "Two Separate Queen Beds for Friends", price: 5999, period: "per night", currency: "₹", size: "40 m² / 430 sq.ft", capacity: "2 Adults", bedType: "2 Separate Queen Beds", view: "Courtyard Garden View", description: "Ideal for friends traveling together, featuring two separate queen beds, work desk, Smart TV, marble bathroom, and courtyard garden view.", amenities: ["2 Separate Queen Beds", "Courtyard View Window", "55-inch Smart TV", "Free High-Speed Wi-Fi", "24/7 Room Service"], image: "assets/images/deluxe-room.jpg", fallback: generatePlaceholderSvg("Courtyard Twin", "HERITAGE TWIN", 900, 600, "suite"), roomsLeft: 5, breakfastIncluded: false, reviews: [{"name": "Guest 46", "location": "Jammu", "rating": 5, "date": "January 2024", "text": "Room was very spacious and clean. Staff behaviour was excellent, they helped us with everything."}, {"name": "Guest 47", "location": "Sangli-Miraj & Kupwad", "rating": 4, "date": "February 2024", "text": "We stayed for 3 nights and the experience was amazing. Breakfast buffet was having so many options, loved the poha and idli."}, {"name": "Guest 48", "location": "Mangalore", "rating": 5, "date": "March 2024", "text": "Very nice property, fully worth the money. AC was working perfectly, bed was very comfortable."}, {"name": "Guest 49", "location": "Erode", "rating": 4, "date": "April 2024", "text": "I must say this hotel exceeded all our expectations. The room service was prompt and the food quality was top notch."}, {"name": "Guest 50", "location": "Belgaum", "rating": 5, "date": "May 2024", "text": "Booked this room for our anniversary trip. The decoration they did was really beautiful. Staff was very cooperative."}, {"name": "Guest 51", "location": "Ambattur", "rating": 4, "date": "June 2024", "text": "Location is very convenient, staff is polite. Only small issue was the hot water took some time in morning."}, {"name": "Guest 52", "location": "Tirunelveli", "rating": 5, "date": "July 2024", "text": "Superb stay! My kids enjoyed the pool area so much. Room was very clean and well maintained."}, {"name": "Guest 53", "location": "Malegaon", "rating": 5, "date": "August 2024", "text": "Best hotel experience in Udaipur hands down. The heritage architecture is something else. Highly recommended."}, {"name": "Guest 54", "location": "Gaya", "rating": 4, "date": "September 2024", "text": "Truly wonderful stay. Hats off to the team for maintaining such high standards. Food was delicious."}, {"name": "Guest 55", "location": "Jalgaon", "rating": 5, "date": "October 2024", "text": "No complaints at all. Each and every thing was perfect. Will definitely come back next time."}] },
    { id: "family-duplex-villa", category: "family", badge: "Grand Family", title: "Royal Family Duplex Villa", subtitle: "Two-Story Villa for 6 Guests", price: 29999, period: "per night", currency: "₹", size: "180 m² / 1,930 sq.ft", capacity: "6 Guests", bedType: "3 Master Bedrooms", view: "Garden & Lake View", description: "Spacious two-floor villa for large families featuring 3 master bedrooms, private garden lawn, living lounge, dining area, and dedicated butler service.", amenities: ["3 Separate Bedrooms", "Private Garden Lawn", "Living Lounge for 8", "3 Full Bathrooms", "Free Dinner for Kids"], image: "assets/images/family-suite.jpg", fallback: generatePlaceholderSvg("Family Duplex Villa", "FAMILY DUPLEX VILLA", 900, 600, "suite"), roomsLeft: 2, breakfastIncluded: true, reviews: [{"name": "Guest 56", "location": "Udaipur", "rating": 4, "date": "November 2024", "text": "Value for money! The amenities provided were great. Room service was very fast."}, {"name": "Guest 57", "location": "Maheshtala", "rating": 5, "date": "December 2024", "text": "Had a blast with my family. The vibe of the place is very positive. Staff is always smiling."}, {"name": "Guest 58", "location": "Davanagere", "rating": 4, "date": "January 2025", "text": "Very good hotel for family stay. The rooms are exactly as shown in pictures. Fully satisfied."}, {"name": "Guest 59", "location": "Kozhikode", "rating": 5, "date": "February 2025", "text": "Excellent hospitality. They upgraded our room without any extra charge. Very kind gesture."}, {"name": "Guest 60", "location": "Akbarpur", "rating": 5, "date": "March 2024", "text": "The view from the room was mesmerizing. Spent hours just sitting by the window. Must visit."}, {"name": "Guest 61", "location": "Mumbai", "rating": 4, "date": "April 2024", "text": "Clean rooms, tasty food, and polite staff. What else do you need? Highly recommended."}, {"name": "Guest 62", "location": "Delhi", "rating": 5, "date": "May 2024", "text": "A perfect weekend getaway. The spa services were very relaxing. Overall a great experience."}, {"name": "Guest 63", "location": "Bangalore", "rating": 5, "date": "June 2024", "text": "The heritage feel of the hotel is unique. Loved the traditional welcome. Felt like royalty."}, {"name": "Guest 64", "location": "Hyderabad", "rating": 4, "date": "July 2024", "text": "Great location, easy to reach all tourist spots. The concierge desk helped us plan our itinerary."}, {"name": "Guest 65", "location": "Chennai", "rating": 3, "date": "August 2024", "text": "Comfortable stay. The Wi-Fi speed was good for my official work. Breakfast was okay."}] }
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
    { id: "dish-1", category: "north-indian", title: "Shahi Paneer Butter Masala", desc: "Fresh cottage cheese cubes simmered in a velvety makhani gravy of vine-ripened tomatoes, fresh butter, cashews, and aromatic Kasuri methi.", price: "₹445", offer: "15% OFF on Dinner Booking", tags: ["Bestseller", "Chef Special", "Pure Veg"], ingredients: "Fresh Paneer, Amul Butter, Cashew Paste, Tomato Gravy, Kasuri Methi, Cream", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-3", category: "north-indian", title: "Palak Paneer Royal", desc: "Tender cottage cheese cooked in a silky smooth garlic-infused spinach puree, tempered with cumin and topped with fresh malai.", price: "₹395", offer: "Healthy Choice", tags: ["Healthy Choice", "Pure Veg"], ingredients: "Fresh Spinach, Cottage Cheese, Garlic, Cumin, Malai, Green Chilies", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-4", category: "north-indian", title: "Tandoori Paneer Tikka Shashlik", desc: "Charcoal-charred paneer cubes marinated in mustard oil, hung curd, and roasted spices, grilled on skewers with capsicum & red onions.", price: "₹425", offer: "Free Mint Chutney & Salad", tags: ["Clay Oven Tandoori", "Pure Veg"], ingredients: "Paneer, Hung Curd, Mustard Oil, Carom Seeds, Bell Peppers, Lemon", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-5", category: "north-indian", title: "Shahi Malai Paneer Kofta", desc: "Delicate melt-in-mouth cottage cheese and potato dumplings stuffed with khoya & nuts, served in a rich white cardamom gravy.", price: "₹465", offer: "Chef's Signature", tags: ["Royal Heritage", "Pure Veg"], ingredients: "Cottage Cheese, Khoya, Cashews, Cardamom, Cream, Saffron", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-6", category: "north-indian", title: "Paneer Lababdar", desc: "Grated and cubed cottage cheese cooked together in a thick chunky onion-tomato gravy with ginger juliennes and fresh coriander.", price: "₹450", offer: "10% OFF on Table Booking", tags: ["Rich & Creamy", "Pure Veg"], ingredients: "Paneer, Grated Cottage Cheese, Onion Tomato Gravy, Ginger, Butter", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-7", category: "north-indian", title: "Paneer Do Pyaza", desc: "Cottage cheese cooked with double the onions — diced shallots and caramelized onion paste, spiked with whole cloves and black cardamom.", price: "₹415", offer: "Traditional Recipe", tags: ["Traditional Recipe", "Pure Veg"], ingredients: "Paneer, Shallots, Caramelized Onion, Whole Spices, Green Cardamom", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-8", category: "north-indian", title: "Tandoori Paneer Malai Tikka", desc: "Creamy cottage cheese marinated in cashew paste, cardamom, cheese, and white pepper, roasted gently in the tandoor.", price: "₹445", offer: "Complimentary Drink", tags: ["Mild & Creamy", "Pure Veg"], ingredients: "Paneer, Cashew Paste, Amul Cheese, Cream, White Pepper, Cardamom", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-9", category: "north-indian", title: "Classic Butter Chicken", desc: "Tender tandoori chicken simmered in a velvety tomato, butter & cashew gravy flavored with Kasuri methi.", price: "₹495", offer: "Bestseller Combo", tags: ["Chef Special", "Must Try"], ingredients: "Tandoori Chicken, Amul Butter, Tomato Makhani Gravy, Cashews, Cream", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-10", category: "north-indian", title: "Dal Makhani Royal", desc: "Black lentils slow-cooked overnight on charcoal embers with white butter, cream and secret royal spices.", price: "₹380", offer: "Overnight Charcoal Cooked", tags: ["Pure Veg", "Bestseller"], ingredients: "Black Urad Dal, Kidney Beans, White Butter, Cream, Garlic, Kasuri Methi", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-11", category: "north-indian", title: "Murgh Musallam Special", desc: "Whole roasted chicken marinated in royal Mughlai spices, stuffed with spiced boiled eggs and minced meat gravy.", price: "₹650", offer: "Royal Feast 20% OFF", tags: ["Royal Mughlai", "Grand Portion"], ingredients: "Whole Chicken, Minced Meat, Boiled Eggs, Saffron, Khoya, Whole Spices", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-12", category: "north-indian", title: "Amritsari Kulcha & Chole", desc: "Crispy tandoori-baked stuffed kulcha served with spicy Punjabi chickpea curry and tangy tamarind chutney.", price: "₹320", offer: "Complimentary Sweet Lassi", tags: ["Punjabi Delight", "Pure Veg"], ingredients: "Flour Kulcha, Potato Stuffing, Chickpeas, Whole Spices, Butter", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-13", category: "north-indian", title: "Bhuna Gosht Mughlai", desc: "Tender mutton pieces slow-cooked with caramelized onions, garlic, ginger and whole roasted garram masala.", price: "₹580", offer: "Chef's Special", tags: ["Spicy Mutton", "Royal Recipe"], ingredients: "Tender Mutton, Caramelized Onions, Ginger, Garlic, Roasted Spices", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-14", category: "north-indian", title: "Subz Diwani Handi", desc: "Seasonal garden vegetables cooked in a rich spinach and cashew nut gravy in an earthen pot.", price: "₹375", offer: "Pure Veg Delight", tags: ["Vegetarian", "Healthy Choice"], ingredients: "Carrots, Beans, Peas, Spinach Gravy, Cashew Paste, Green Cardamom", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-15", category: "north-indian", title: "Methi Matar Malai", desc: "Fresh fenugreek leaves and green peas simmered in a velvety sweet cashew and cream gravy.", price: "₹390", offer: "Seasonal Special", tags: ["Mild & Creamy", "Pure Veg"], ingredients: "Fresh Fenugreek, Green Peas, Amul Cream, Cashew Paste, Cardamom", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-16", category: "north-indian", title: "Mushroom Do Pyaza", desc: "Button mushrooms wok-tossed with double onions, bell peppers and coarse black pepper gravy.", price: "₹410", offer: "Vegetarian Gourmet", tags: ["Gourmet Special", "Pure Veg"], ingredients: "Button Mushrooms, Diced Onions, Bell Peppers, Black Pepper, Coriander", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },

    { id: "dish-17", category: "mughlai", title: "Hyderabadi Chicken Dum Biryani", desc: "Fragrant long-grain basmati rice layered with marinated chicken, saffron & fried onions, served with Mirchi Ka Salan & Raita.", price: "₹550", offer: "Free Salan & Raita", tags: ["Royal Recipe", "Signature"], ingredients: "Basmati Rice, Marinated Chicken, Saffron, Fried Onions, Mint, Whole Spices", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-18", category: "mughlai", title: "Royal Mutton Dum Biryani", desc: "Succulent mutton cuts slow-cooked with basmati rice under dum seal with kewra water, saffron and fried cashews.", price: "₹650", offer: "Signature Recipe", tags: ["Mughlai Legend", "Must Try"], ingredients: "Mutton, Basmati Rice, Saffron, Kewra, Fried Shallots, Ghee", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-19", category: "mughlai", title: "Subz Dum Biryani", desc: "Assorted vegetables and paneer layered with fragrant basmati rice, mint, rose water and whole spices.", price: "₹420", offer: "Free Cold Beverage", tags: ["Veg Biryani", "Pure Veg"], ingredients: "Basmati Rice, Vegetables, Paneer, Rose Water, Mint, Biryani Masala", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-20", category: "mughlai", title: "Tandoori Non-Veg Feast Platter", desc: "Platter containing Mutton Seekh Kebab, Murgh Malai Tikka, Fish Amritsari and Tandoori Prawns.", price: "₹950", offer: "Platter Special 15% OFF", tags: ["Chef Special", "Grand Platter"], ingredients: "Mutton Seekh, Chicken Tikka, Fish Amritsari, Tandoori Prawns, Mint Chutney", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-21", category: "mughlai", title: "Mutton Seekh Kebab Royal", desc: "Minced mutton blended with garlic, raw papaya, and roasted coriander, grilled on charcoal skewers.", price: "₹580", offer: "Free Rumali Roti", tags: ["Charcoal Grilled", "Spicy"], ingredients: "Minced Mutton, Papaya Paste, Roasted Coriander, Garlic, Ghee", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-22", category: "mughlai", title: "Fish Amritsari Tikka", desc: "Sole fish fillets marinated in ajwain, gram flour and lemon juice, deep fried to golden crispness.", price: "₹520", offer: "Fresh Catch Special", tags: ["Crispy Fish", "Seafood Special"], ingredients: "Sole Fish, Ajwain, Gram Flour, Lemon Juice, Chaat Masala", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80" },

    { id: "dish-23", category: "south-indian", title: "Mysore Masala Dosa", desc: "Crispy rice & lentil crepe smeared with spicy garlic-chili paste, filled with potato masala, served with sambar & coconut chutneys.", price: "₹290", offer: "Filter Coffee Combo", tags: ["Pure Veg", "South Special"], ingredients: "Fermented Rice Batter, Potato Masala, Red Garlic Chutney, Sambar, Coconut Chutney", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-24", category: "south-indian", title: "Royal Cheese Butter Dosa", desc: "Golden crispy dosa loaded with melted Amul butter and grated mozzarella cheese.", price: "₹320", offer: "Kids Favorite", tags: ["Cheesy Special", "Pure Veg"], ingredients: "Dosa Batter, Amul Butter, Mozzarella Cheese, Sambar, Chutney", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-25", category: "south-indian", title: "Onion Rava Masala Dosa", desc: "Lacy semolina crepe studded with chopped onions, green chilies, cumin and curry leaves.", price: "₹270", offer: "Crispy South Special", tags: ["Super Crispy", "Pure Veg"], ingredients: "Rava Batter, Onions, Green Chilies, Cumin, Curry Leaves, Sambar", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-26", category: "south-indian", title: "Medu Vada Sambar Platter", desc: "Golden fried savory lentil donuts served piping hot with vegetable sambar and coconut chutney.", price: "₹220", offer: "Breakfast Special", tags: ["Traditional South", "Pure Veg"], ingredients: "Urad Dal, Peppercorns, Curry Leaves, Sambar, Coconut Chutney", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-27", category: "south-indian", title: "Ghee Roast Paneer Dosa", desc: "Dosa roasted in pure desi ghee stuffed with spicy Chettinad paneer masala.", price: "₹340", offer: "Pure Desi Ghee", tags: ["Ghee Roasted", "Pure Veg"], ingredients: "Pure Ghee, Dosa Batter, Chettinad Paneer, Sambar, Chutney", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-28", category: "south-indian", title: "Chettinad Mushroom Curry", desc: "Spicy mushroom curry cooked with roasted coconut, star anise and black peppercorns.", price: "₹380", offer: "Spicy South Delicacy", tags: ["Spicy Chettinad", "Pure Veg"], ingredients: "Button Mushrooms, Roasted Coconut, Black Pepper, Fennel, Curry Leaves", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" },

    { id: "dish-29", category: "chinese", title: "Veg Hakka Noodles & Chili Paneer", desc: "Wok-tossed stir fry noodles with crunchy vegetables, garlic and soy sauce served with wok-tossed chili paneer.", price: "₹380", offer: "Pan Asian Combo", tags: ["Pan Asian", "Pure Veg"], ingredients: "Noodles, Cottage Cheese, Bell Peppers, Soy Sauce, Garlic, Chili Paste", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-30", category: "chinese", title: "Schezwan Veg Fried Rice", desc: "Aromatic basmati rice tossed with spicy Schezwan sauce, spring onions and bell peppers.", price: "₹340", offer: "Wok Tossed Special", tags: ["Spicy Asian", "Pure Veg"], ingredients: "Rice, Schezwan Sauce, Spring Onion, Bell Peppers, Garlic", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-31", category: "continental", title: "Penne Alfredo in White Truffle Cream", desc: "Penne pasta tossed in rich parmesan cream sauce infused with white truffle oil and roasted garlic.", price: "₹480", offer: "Italian Gourmet", tags: ["Continental", "Pure Veg"], ingredients: "Penne Pasta, Parmesan Cheese, Heavy Cream, Truffle Oil, Garlic", image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-32", category: "continental", title: "Woodfired Margherita Pizza", desc: "Hand-tossed pizza crust topped with San Marzano tomato sauce, fresh mozzarella and basil leaves.", price: "₹450", offer: "Buy 1 Get 1 Soft Drink", tags: ["Woodfired Pizza", "Pure Veg"], ingredients: "Pizza Dough, San Marzano Tomatoes, Mozzarella Cheese, Basil, Olive Oil", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-33", category: "continental", title: "Grilled Cottage Cheese Sizzler", desc: "Sizzling platter with herb-marinated paneer steak, buttered veggies, french fries and garlic pepper sauce.", price: "₹520", offer: "Sizzler Special", tags: ["Sizzler Feast", "Pure Veg"], ingredients: "Paneer Steak, Grilled Veggies, French Fries, Garlic Sauce, Herb Rice", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },

    { id: "dish-34", category: "desserts", title: "Shahi Gulab Jamun with Kesar Rabri", desc: "Warm pistachio-stuffed khoya dumplings served over chilled saffron-infused thick rabri.", price: "₹280", offer: "Free on ₹1500+ Bill", tags: ["Pure Veg", "Royal Dessert"], ingredients: "Khoya, Pistachios, Cardamom Syrup, Saffron Rabri, Silver Vark", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-35", category: "desserts", title: "Royal Kesar Rasmalai", desc: "Soft flattened chenna sponges soaked in cardamom and saffron infused milk, garnished with pistachios.", price: "₹260", offer: "Pistachio Loaded", tags: ["Bengali Sweet", "Pure Veg"], ingredients: "Chenna, Saffron Milk, Cardamom, Pistachios, Almonds", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-36", category: "desserts", title: "Zafrani Matka Phirni", desc: "Traditional ground rice pudding flavored with saffron, cardamom and kewra water, served chilled in earthen pots.", price: "₹240", offer: "Clay Pot Traditional", tags: ["Earthen Pot", "Pure Veg"], ingredients: "Ground Basmati Rice, Milk, Saffron, Kewra, Pistachios", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-37", category: "desserts", title: "Moong Dal Halwa in Pure Ghee", desc: "Rich winter dessert made from yellow lentils roasted slowly in pure desi ghee, khoya and dry fruits.", price: "₹290", offer: "Winter Special", tags: ["Pure Desi Ghee", "Pure Veg"], ingredients: "Moong Dal, Pure Desi Ghee, Khoya, Cashews, Almonds, Saffron", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-38", category: "desserts", title: "Saffron & Almond Royal Thandai", desc: "Traditional cold drink made with milk, saffron, crushed almonds, melon seeds, and rose petals.", price: "₹220", offer: "Signature Drink", tags: ["Royal Beverage", "Pure Veg"], ingredients: "Milk, Saffron, Almonds, Rose Water, Cardamom, Black Pepper", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-39", category: "desserts", title: "Royal Passion Fruit & Mint Mojito", desc: "Refreshing mocktail with fresh passion fruit pulp, crushed mint leaves, lime and sparkling soda.", price: "₹250", offer: "Refreshing Beverage", tags: ["Mocktail Special"], ingredients: "Passion Fruit, Mint Leaves, Lime Juice, Sparkling Soda, Crushed Ice", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80" },
    { id: "dish-40", category: "desserts", title: "Mango Lassi with Almond Flakes", desc: "Thick creamy yogurt drink blended with Alphonso mango pulp, topped with saffron and roasted almond flakes.", price: "₹190", offer: "Traditional Refreshment", tags: ["Cool Refreshment", "Pure Veg"], ingredients: "Hung Curd, Alphonso Mango Pulp, Sugar, Saffron, Almond Flakes", image: "https://images.unsplash.com/photo-1571006682858-a458b8a69288?auto=format&fit=crop&w=800&q=80" }
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
      area: "18,500 sq.ft Pillarless Ballroom",
      subtitle: "Pillarless Ballroom & Mandap Stage",
      desc: "Host your dream destination wedding in our grand pillarless ballroom featuring 22-ft high crystal chandeliers, customizable mandap floral stages, private bridal dressing suites, and 5-star royal Indian banquet catering.",
      specs: "Area: 18,500 sq.ft | Ceiling: 22 ft | Soundproof: 100%",
      inclusions: ["Custom Mandap & Floral Entrance", "Private Bridal Dressing Suite", "Royal Indian Buffet Catering", "Live Shehnai & Sitar Artists", "Valet Parking for 250 Cars"],
      image: "assets/images/wedding-hall.jpg",
      fallback: generatePlaceholderSvg("Royal Indian Weddings", "WEDDING BANQUET", 800, 500, "hotel")
    },
    {
      id: "corporate",
      title: "Corporate Conferences & Summits",
      capacity: "Up to 400 Delegates",
      area: "6,500 sq.ft Convention Hall",
      subtitle: "High-Tech Convention & LED Video Wall",
      desc: "Equipped with dual 4K LED video walls, Dolby spatial surround sound, high-speed fiber Wi-Fi, and executive seating layouts for corporate conventions, product launches, and annual summits.",
      specs: "Area: 6,500 sq.ft | Audio: Spatial Surround | Screens: Dual 4K LED",
      inclusions: ["Dual 4K LED Display Screens", "High-Speed Fiber Wi-Fi", "Podium & Cordless Microphones", "Executive Lounge Coffee Breaks", "Secretarial Desk Assistance"],
      image: "assets/images/corporate-event.jpg",
      fallback: generatePlaceholderSvg("Corporate Conferences", "CONVENTION CENTER", 800, 500, "hotel")
    },
    {
      id: "birthdays",
      title: "Birthday Parties & Anniversaries",
      capacity: "Up to 250 Guests",
      area: "4,200 sq.ft Rooftop Pool Deck",
      subtitle: "Poolside & Rooftop Open-Air Lounge",
      desc: "Celebrate milestone birthdays, anniversary galas, and family reunions at our open-air poolside deck overlooking Lake Pichola, featuring live DJ console, theme decor, and cocktail bar counters.",
      specs: "Area: 4,200 sq.ft | Setting: Rooftop Open-Air | Sound: Pro DJ Console",
      inclusions: ["Pro DJ Console & Lighting", "Custom Theme Balloon & Floral Decor", "360-Degree Cocktail Bar Counter", "Multi-Cuisine Buffet Counters", "Complimentary Anniversary Cake"],
      image: "assets/images/rooftop-dining.jpg",
      fallback: generatePlaceholderSvg("Birthday & Anniversary Parties", "ROOFTOP BANQUET", 800, 500, "hotel")
    },
    {
      id: "sangeet-mehendi",
      title: "Royal Sangeet & Mehendi Night",
      capacity: "Up to 600 Guests",
      area: "12,000 sq.ft Palace Lawns",
      subtitle: "Outdoor Heritage Garden & Folk Stage",
      desc: "Immerse your guests in Rajasthani royalty with an open-air garden Sangeet or Mehendi function featuring traditional Charpai seating, fairy light canopies, live Rajasthani folk dancers, and live food counters.",
      specs: "Area: 12,000 sq.ft | Setting: Outdoor Heritage Lawn | Stage: Folk Performance",
      inclusions: ["Rajasthani Folk Dance Stage", "Traditional Charpai & Low Seating", "Live Chaat & Sweets Counters", "Bridal Mehendi Artist Station", "Fairy Light Garden Canopy"],
      image: "assets/images/about-main.jpg",
      fallback: generatePlaceholderSvg("Royal Sangeet & Mehendi", "PALACE LAWN", 800, 500, "hotel")
    },
    {
      id: "cocktail-gala",
      title: "Grand Cocktail & Award Night",
      capacity: "Up to 350 Guests",
      area: "5,000 sq.ft Crystal Lounge",
      subtitle: "Luxury Crystal Lounge & Hardwood Floor",
      desc: "Designed for high-profile cocktail receptions and corporate award galas, featuring a premium hardwood dance floor, 360-degree island bar, acoustic sound proofing, and red carpet arrival.",
      specs: "Area: 5,000 sq.ft | Bar: 360 Island Bar | Floor: Hardwood Dance Floor",
      inclusions: ["360 Island Cocktail Bar", "Premium Canapés & Finger Food", "Hardwood Dance Floor", "Red Carpet Arrival Entrance", "Professional Bartender Team"],
      image: "assets/images/restaurant-main.jpg",
      fallback: generatePlaceholderSvg("Cocktail Gala & Awards", "CRYSTAL LOUNGE", 800, 500, "dining")
    },
    {
      id: "private-anniversary",
      title: "Intimate Palace Poolside Dinner",
      capacity: "Up to 50 Guests",
      area: "Private Poolside Gazebo",
      subtitle: "Exclusive Romantic Gazebo & Butler",
      desc: "Host an exclusive private dinner or intimate family celebration under the stars at our private poolside gazebo with a customized 5-course menu prepared by Executive Master Chefs.",
      specs: "Capacity: 10 - 50 Guests | Setting: Private Pool Gazebo | Butler: 100% Dedicated",
      inclusions: ["Private Candlelight Setup", "5-Course Customized Chef Menu", "Champagne Toast", "Dedicated Personal Butler", "Live Violin / Sitar Musician"],
      image: "assets/images/swimming-pool.jpg",
      fallback: generatePlaceholderSvg("Intimate Poolside Dinner", "PRIVATE GAZEBO", 800, 500, "hotel")
    }
  ],

  amenities: [
    {
      id: "pool",
      category: "recreation",
      name: "Swimming Pool",
      sub: "Infinity pool | Open daily 6:00 AM – 10:00 PM",
      desc: "Our temperature-controlled infinity swimming pool offers sweeping views of Lake Pichola and the Aravalli hills. Features comfortable sun loungers, poolside beverage service, and a separate shallow kids pool.",
      specs: "Depth: 4.5 ft | Water: Temperature Controlled 28°C",
      inclusions: ["Sun Loungers & Clean Towels", "Poolside Juice & Snack Service", "Shallow Kids Safety Pool", "Poolside Private Cabanas"],
      image: "assets/images/swimming-pool.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M2 20c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1 3-1 4-1"/><path d="M2 16c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1 3-1 4-1"/><path d="M15 12l-3-9-3 9"/><circle cx="12" cy="4" r="1.5"/></svg>`
    },
    {
      id: "dining",
      category: "dining",
      name: "Fine Dining",
      sub: "Multi-cuisine restaurant | Authentic Indian & international",
      desc: "Le Celestia Fine Dining serves authentic North Indian specialties, tandoori kebabs, dum biryanis, and international delicacies prepared by our Executive Master Chefs.",
      specs: "Timings: 7:00 AM – 11:30 PM | Seating: 180 Guests",
      inclusions: ["Authentic Mughlai & North Indian", "Pure Veg & Jain Counter", "Live Sitar Music Evenings", "Private Dining Pavilions"],
      image: "assets/images/restaurant-main.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`
    },
    {
      id: "spa",
      category: "wellness",
      name: "Luxury Spa",
      sub: "Ayurvedic & modern wellness treatments",
      desc: "Jivana Spa offers traditional Ayurvedic therapies, Abhyanga oil massages, herbal steam baths, and modern facial treatments administered by certified wellness therapists.",
      specs: "Timings: 8:00 AM – 9:00 PM | Treatment Rooms: 6 Private Suites",
      inclusions: ["Ayurvedic Abhyanga Massage", "Herbal Steam Sauna Suite", "Organic Essential Oils", "Post-Treatment Herbal Tea"],
      image: "assets/images/about-main.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>`
    },
    {
      id: "gym",
      category: "wellness",
      name: "Fitness Center",
      sub: "Fully equipped modern gym | Open 24/7",
      desc: "Maintain your workout routine in our state-of-the-art gym equipped with Technogym treadmills, ellipticals, free weights, resistance machines, and personal trainers on request.",
      specs: "Timings: Open 24 Hours | Equipment: Technogym Commercial Series",
      inclusions: ["Treadmills & Cross Trainers", "Free Weights & Power Racks", "Personal Fitness Trainers", "Cold Towels & Hydration Station"],
      image: "assets/images/hero-3.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M6.5 6.5h11M6.5 17.5h11"/><path d="M6 3v18M18 3v18M3 8v8M21 8v8"/></svg>`
    },
    {
      id: "wifi",
      category: "services",
      name: "Complimentary Wi-Fi",
      sub: "High-speed Wi-Fi throughout the property",
      desc: "Enjoy seamless 500 Mbps high-speed fiber Wi-Fi in all guest rooms, suites, restaurants, pool deck, and event banquets with single-click auto connect.",
      specs: "Speed: 500 Mbps Fiber | Devices: Unlimited Per Room",
      inclusions: ["High-Speed Fiber Network", "Coverage Across Entire Property", "Seamless Roaming", "Secure Encrypted Connection"],
      image: "assets/images/executive-room.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" stroke-width="3"/></svg>`
    },
    {
      id: "roomservice",
      category: "dining",
      name: "24/7 Room Service",
      sub: "Dedicated in-room dining service",
      desc: "Indulge in hot gourmet meals, midnight snacks, fresh coffee, and breakfast served directly to your room or suite terrace at any hour of the day or night.",
      specs: "Timings: 24 Hours Round-The-Clock | Express Delivery: 25 Mins",
      inclusions: ["24/7 In-Room Menu", "Midnight Snacks & Beverages", "Private Balcony Dining Setup", "Special Children Menu"],
      image: "assets/images/deluxe-room.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`
    },
    {
      id: "transfer",
      category: "services",
      name: "Airport Transfer",
      sub: "Comfortable private transfers on request",
      desc: "Travel in comfort with our luxury chauffeur-driven Mercedes-Benz and Audi sedans for airport pick-up, drop-off, and city sightseeing tours.",
      specs: "Fleet: Mercedes E-Class, Audi A6, Toyota Fortuner | 25 Mins to Airport",
      inclusions: ["Chauffeur Driven Luxury Cars", "Flight Tracking Service", "Cold Bottled Water & Tissues", "Complimentary for Suite Guests"],
      image: "assets/images/hero-1.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
    },
    {
      id: "valet",
      category: "services",
      name: "Valet Parking",
      sub: "Secure parking with valet assistance",
      desc: "Park with complete peace of mind in our 24/7 secure covered basement parking facility featuring valet assistance and EV charging stations.",
      specs: "Capacity: 250 Vehicles | 24/7 CCTV Security Monitoring",
      inclusions: ["24/7 Valet Parking Service", "Secure Covered Basement", "Fast EV Charging Stations", "Complimentary Car Wash on Request"],
      image: "assets/images/hero-2.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`
    },
    {
      id: "lounge",
      category: "services",
      name: "Business Lounge",
      sub: "Private workspace and meeting facilities",
      desc: "Our Executive Business Lounge provides private workstations, high-speed printing, video conferencing boardrooms, and complimentary coffee & pastries.",
      specs: "Boardroom Capacity: 16 Delegates | High-Speed Fiber Printing",
      inclusions: ["Private Meeting Rooms", "4K Video Conferencing Screen", "Complimentary Coffee & Teas", "Secretarial Assistance"],
      image: "assets/images/corporate-event.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
    },
    {
      id: "concierge",
      category: "services",
      name: "Concierge Service",
      sub: "Personalized assistance throughout your stay",
      desc: "Our 24/7 Concierge team is dedicated to curating bespoke itineraries, boat tour reservations, monument tickets, and personalized guest assistance.",
      specs: "Desk: Open 24/7 at Main Lobby | Multi-Lingual Staff",
      inclusions: ["Lake Boat Tour Bookings", "City Sightseeing Itineraries", "Monument Priority Pass", "Restaurant Reservations"],
      image: "assets/images/lobby.jpg",
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 3a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`
    }
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
      quote: "The Haveli Royale is by far the best 5-star hotel experience in India. The hospitality, food at Le Celestia, and room comfort are unmatched. Our family wedding was flawless!",
      author: "Rajesh & Sunita Agarwal",
      role: "Wedding Host & Guest, New Delhi",
      rating: 5,
      avatar: generateAvatarSvg("RA"),
      avatarFallback: generateAvatarSvg("RA")
    },
    {
      quote: "Staying in the Premium Balcony Room was sheer bliss. The Paneer Butter Masala and Dal Makhani served at dinner were divine. Will definitely visit again for our anniversary!",
      author: "Priya & Vikram Malhotra",
      role: "Couple Staycation, Mumbai",
      rating: 5,
      avatar: generateAvatarSvg("PM"),
      avatarFallback: generateAvatarSvg("PM")
    },
    {
      quote: "We hosted our corporate summit with 300 delegates here. The banquet team, audio-visual setup, and lunch buffet exceeded all our expectations.",
      author: "Amitabh Verma",
      role: "VP Corporate Events, Bangalore",
      rating: 5,
      avatar: generateAvatarSvg("AV"),
      avatarFallback: generateAvatarSvg("AV")
    },
    {
      quote: "The Lakefront Suite view of Lake Pichola at sunset is breathtaking. Impeccable 24/7 room service and warm Indian hospitality throughout our stay.",
      author: "Ananya & Rohan Deshmukh",
      role: "Holiday Guests, Pune",
      rating: 5,
      avatar: generateAvatarSvg("AD"),
      avatarFallback: generateAvatarSvg("AD")
    }
  ]
};

Object.freeze(AURELIA_DATA);
window.AURELIA_DATA = AURELIA_DATA;
window.HAVELI_ROYALE_DATA = AURELIA_DATA;
