const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const BACKEND_BASE = isLocal ? "http://localhost:5000" : "https://muneeb-cafe-backend.vercel.app";
const MENU_API_URL = `${BACKEND_BASE}/api/menu`;
// ==========================================
// 0. DYNAMIC API CONFIGURATION (AUTO-DETECT)
// ==========================================
// Local testing par localhost:5000 use hoga, live domain par Vercel backend
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
window.API_URL = window.API_URL || (isLocalhost ? "http://localhost:5000" : "https://muneeb-cafe-backend.vercel.app");

var API_URL = window.API_URL;
var API_BASE_URL = `${API_URL}/api/orders`;
var MENU_API_URL = 'http://localhost:5000/api/menu';

console.log("ðŸ”— Connecting Menu to:", MENU_API_URL);

// ==========================================
// 1. STATIC FALLBACK ITEMS (Sirf server offline hone par)
// ==========================================
const fallbackMenuItems = [
  // --- PIZZA'S (Standard 4 Sizes) ---
  {
    name: "Chicken Tikah Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.8 (110)",
    desc: "Traditional spiced chicken tikka chunks with onions and herbs.",
    tag: "Popular",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Hot & Spicy Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.8 (85)",
    desc: "Spicy Mexican chicken chunks, hot jalapenos, onions and hot sauce.",
    tag: "Spicy",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Creamy Tikah Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.9 (95)",
    desc: "Creamy marinated chicken tikka chunks with rich white sauce blend.",
    tag: "Creamy",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Chicken Fajita Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.7 (90)",
    desc: "Marinated fajita chicken, onions, bell peppers & mozzarella cheese.",
    tag: "Pizza",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Cheese Stick Pizza",
    category: "Pizzas",
    time: "18 min",
    rating: "4.7 (70)",
    desc: "Cheesy stuffed garlic base sticks topped with extra mozzarella.",
    tag: "Cheesy",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Cheese Lover Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.9 (130)",
    desc: "Loaded with rich mozzarella and cheddar cheese blend.",
    tag: "Cheesy",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Chicken Italian Pizza",
    category: "Pizzas",
    time: "22 min",
    rating: "4.8 (80)",
    desc: "Italian herbs, sausages, mushrooms, and savory tomato sauce.",
    tag: "Italian",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Chicken Achari Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.8 (75)",
    desc: "Tangy pickled achari chicken chunks topped with onions and green chilies.",
    tag: "Desi",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Vegetarian Pizza",
    category: "Pizzas",
    time: "18 min",
    rating: "4.6 (60)",
    desc: "Mushrooms, black olives, sweet corn, bell peppers, and diced onions.",
    tag: "Veg",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },
  {
    name: "Extra Topping Pizza",
    category: "Pizzas",
    time: "20 min",
    rating: "4.9 (85)",
    desc: "Loaded with double chicken chunks, extra cheese, and premium toppings.",
    tag: "Loaded",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 1150 },
      { size: "Large", price: 1600 },
      { size: "Family", price: 1900 }
    ]
  },

  // --- MUNEEB SPECIAL PIZZA'S ---
  {
    name: "Muneeb Special Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.9 (150)",
    desc: "Chef's secret recipe loaded with sausages, chicken chunks & olives.",
    tag: "Signature",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Chicken Cheese Crust Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.9 (120)",
    desc: "Golden crust stuffed fully with cheese and chicken fillings.",
    tag: "Special",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Crown Crust Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.8 (95)",
    desc: "Royal crown shaped crust stuffed with delicious kebab pockets.",
    tag: "Crown",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Special Chicken Tikka Pizza",
    category: "Muneeb Special Pizzas",
    time: "22 min",
    rating: "4.9 (105)",
    desc: "Extra grilled chicken tikka cubes, special spices & loaded cheese.",
    tag: "Special",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "B.B.Q Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.9 (88)",
    desc: "Smoky BBQ glazed chicken chunks with onions, olives and capsicum.",
    tag: "BBQ",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Malai Botti Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.9 (115)",
    desc: "Mouth-melting soft creamy malai boti pieces with premium white cheese.",
    tag: "Creamy",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Four Season Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.8 (90)",
    desc: "Four different quarters: Tikka, Fajita, Veggie, and Cheesy BBQ in one pizza.",
    tag: "Four Season",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Kabab Crust Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.8 (85)",
    desc: "Tasty minced seekh kababs baked directly into the outer crust ring.",
    tag: "Kabab",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Lazania Pizza",
    category: "Muneeb Special Pizzas",
    time: "30 min",
    rating: "5.0 (64)",
    desc: "Fusion of lasagna sauce, pasta sheets, chicken chunks & mozzarella.",
    tag: "Special",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Chicken Cheese Stuff Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "4.9 (95)",
    desc: "Filled base stuffed with rich melted cheese and seasoned chicken shreds.",
    tag: "Stuffed",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },
  {
    name: "Zinger Cheese Alfredo Pizza",
    category: "Muneeb Special Pizzas",
    time: "25 min",
    rating: "5.0 (130)",
    desc: "Crispy chopped zinger bites topped on creamy Alfredo garlic cheese sauce.",
    tag: "Zinger",
    image: "images/pizza pic.jpg",
    hasSizes: true,
    sizes: [
      { size: "Small", price: 700 },
      { size: "Medium", price: 1350 },
      { size: "Large", price: 1750 },
      { size: "Family", price: 2200 }
    ]
  },

  // --- LIMOUSINE PIZZA ---
  { 
    name: "Limousine Pizza", 
    category: "Limousine Pizza", 
    price: 3500, 
    time: "30 min", 
    rating: "5.0 (85)", 
    desc: "Giant 1-Meter Limousine Pizza with multiple flavors of your choice + 2 Ltr Drink", 
    tag: "Special", 
    image: "images/pizza pic.jpg" 
  },

  // --- BIRTHDAY DEALS ---
  { 
    name: "Birthday Deal", 
    category: "Birthday Deals", 
    price: 6500, 
    time: "35 min", 
    rating: "5.0 (120)", 
    desc: "2 Family Pizza, 5 Grill Burger, 20 Grill Wings, 1 Pound Cake, 4 Regular Fries, 2 Drink 1.5 Ltr", 
    tag: "Party", 
    image: "images/deals.jpg" 
  },

  // --- MUNEEB CAFÃ‰ DEALS ---
  { name: "Deal.1", category: "Deals", price: 800, time: "15 min", rating: "4.8 (45)", desc: "1 Small Pizza, 5 Hot Wings, Half Liter Drink", tag: "Deal", image: "images/pizza pic.jpg" },
  { name: "Deal.2", category: "Deals", price: 850, time: "15 min", rating: "4.7 (50)", desc: "2 Zinger Burger, Small Fries, Half Liter Drink", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.3", category: "Deals", price: 450, time: "12 min", rating: "4.6 (38)", desc: "1 Zinger Burger, 1 Regular Fries, 1 Regular Drink", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.4", category: "Deals", price: 1200, time: "18 min", rating: "4.9 (62)", desc: "1 Small Pizza, 2 Peti Burger, 1 Small Fries, Half Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.5", category: "Deals", price: 1750, time: "20 min", rating: "4.8 (55)", desc: "1 Medium Pizza, 2 Zinger Burger, 2 Regular Fries, 1 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.6", category: "Deals", price: 1850, time: "20 min", rating: "4.9 (70)", desc: "1 Medium Pizza, 12 Hot Wings, 2 Regular Fries, 1 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.7", category: "Deals", price: 2200, time: "22 min", rating: "5.0 (40)", desc: "6 Zinger Burger, 1 Liter Drink, 2 Regular Fries", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.8", category: "Deals", price: 2250, time: "25 min", rating: "4.9 (82)", desc: "1 Large Pizza, 10 Nuggets, 1 Medium Fries, 1.5 Liter Drink", tag: "Deal", image: "images/pizza pic.jpg" },
  { name: "Deal.9", category: "Deals", price: 1600, time: "18 min", rating: "4.7 (44)", desc: "5 Peti Burger, 2 Regular Fries, 1.5 Liter Drink", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.10", category: "Deals", price: 3200, time: "25 min", rating: "4.9 (90)", desc: "1 Large Pizza, 2 Zinger Burger, 10 Hot Wings, Mayo Garlic Fries Large, 1.5 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.11", category: "Deals", price: 2900, time: "25 min", rating: "4.8 (65)", desc: "2 Medium Pizza, 2 Zinger Burger, 5 Hot Wings, 2 Regular Fries, 1.5 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.16", category: "Deals", price: 550, time: "12 min", rating: "4.7 (33)", desc: "1 Malai Boti Shawarma, 5p Nuggets, 1 Regular Drink", tag: "Deal", image: "images/shawarma.jpg" },
  { name: "Deal.17", category: "Deals", price: 750, time: "14 min", rating: "4.8 (48)", desc: "2 Special Peti Burger, 2 Regular Drink, 2 Regular Fries", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.18", category: "Deals", price: 600, time: "12 min", rating: "4.6 (39)", desc: "14 Nuggets, 1 Regular Drink", tag: "Deal", image: "images/hot wings.jpg" },
  { name: "Deal.19", category: "Deals", price: 700, time: "12 min", rating: "4.8 (51)", desc: "2 Tikka Pratha, 2 Regular Fries, 2 Regular Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.20", category: "Deals", price: 750, time: "14 min", rating: "4.7 (44)", desc: "2 Special Peti Burger, 2 Regular Drink, 2 Regular Fries", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.21", category: "Deals", price: 1000, time: "15 min", rating: "4.9 (67)", desc: "20p Grill Wings, 1 Half Ltr Drink", tag: "Deal", image: "images/hot wings.jpg" },
  { name: "Muneeb Special Plater", category: "Deals", price: 3000, time: "25 min", rating: "4.9 (78)", desc: "10 Nuggets, 10 Hot wings, 10 Grill wings, 1 Large Pizza, 1 Drink 1.5 Ltr", tag: "Plater", image: "images/deals.jpg" },

  // --- BURGERS ---
  { name: "Zinger Burger", category: "Burgers", price: 350, time: "10 min", rating: "4.8 (450)", desc: "Crispy chicken fillet with signature mayo and fresh lettuce", tag: "Burger", image: "images/burgers.jpg" },
  { name: "Beef Lover Burger", category: "Burgers", price: 500, time: "12 min", rating: "4.9 (210)", desc: "Juicy grilled beef patty with special sauce & cheese", tag: "Burger", image: "images/burgers.jpg" },
  { name: "Tower Burger", category: "Burgers", price: 460, time: "15 min", rating: "4.9 (310)", desc: "Double crispy fillet with hashbrown & cheese", tag: "Burger", image: "images/burgers.jpg" },

  // --- SHAWARMA & ROLLS ---
  { name: "Chicken Shawarma", category: "Shawarma", price: 250, time: "10 min", rating: "4.6 (200)", desc: "Classic shredded chicken with garlic mayo sauce", tag: "Shawarma", image: "images/shawarma.jpg" },
  { name: "Zinger Shawarma", category: "Shawarma", price: 300, time: "12 min", rating: "4.8 (220)", desc: "Crispy zinger fillet slice wrapped in fresh pita", tag: "Shawarma", image: "images/shawarma.jpg" },
  { name: "Zinger Pratha Roll", category: "Pratha Roll", price: 350, time: "12 min", rating: "4.8 (140)", desc: "Crisp flaky pratha filled with crispy chicken chunks", tag: "Roll", image: "images/shawarma.jpg" },

  // --- HOT WINGS & SIDES ---
  { name: "Hot Wings (10 pcs)", category: "Wings", price: 450, time: "10 min", rating: "4.8 (210)", desc: "Spicy crispy fried chicken hot wings", tag: "Wings", image: "images/hot wings.jpg" },
  { name: "Plain Fries", category: "Fries", price: 200, time: "8 min", rating: "4.6 (300)", desc: "Crispy golden salted french fries", tag: "Fries", image: "images/burgers.jpg" },
  { name: "Loaded Fries", category: "Fries", price: 360, time: "10 min", rating: "4.9 (290)", desc: "Fries topped with creamy cheese sauce and chicken bits", tag: "Fries", image: "images/burgers.jpg" }
];

let activeMenuItems = [];

// Clean fresh cart on every page reload / new visit
localStorage.removeItem('muneeb_cart');
let cart = [];
let detectedCoords = { lat: null, lng: null };

// Tracks whether the cart has already auto-opened once on first item add
let hasAutoOpenedCart = false;

// Handle back/forward cache reload
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

// ==========================================
// 2. ESCAPE UTILITY
// ==========================================
function escapeQuotes(str) {
  return String(str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ==========================================
// 3. CARD RENDERER
// ==========================================
function renderProductCard(item) {
  const isPizza = (item.category || '').toLowerCase().includes('pizza') || Boolean(item.hasSizes);

  let variants = [];
  if (Array.isArray(item.sizes) && item.sizes.length > 0) {
    variants = item.sizes
      .map(v => ({ size: v.size || '', price: Number(v.price) || 0 }))
      .filter(v => v.price > 0);
  } else if (item.prices && typeof item.prices === 'object') {
    const sizeMap = [
      { key: 'small', label: 'Small' },
      { key: 'medium', label: 'Medium' },
      { key: 'large', label: 'Large' },
      { key: 'family', label: 'Family' }
    ];
    sizeMap.forEach(({ key, label }) => {
      const p = Number(item.prices[key]) || 0;
      if (p > 0) variants.push({ size: label, price: p });
    });
  }

  const itemId = item._id || item.id || '';
  const escapedName = escapeQuotes(item.name || 'Item');
  const imageSrc = (item.image && item.image.length > 5) ? item.image : (item.img || "images/pizza pic.jpg");
  const categoryTag = item.tag || item.category || 'Special';
  const description = item.desc || item.description || '';

  if (isPizza && variants.length > 0) {
    const sizeRowsHtml = variants.map(v => `
      <div class="flex items-center justify-between py-1.5 px-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-neutral-300">${v.size}</span>
          <span class="text-yellow-400 font-extrabold">Rs. ${v.price}/-</span>
        </div>
        <button 
          type="button" 
          onclick="addVariantToCart('${itemId}', '${escapedName}', '${v.size}', ${v.price})"
          class="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-neutral-950 font-black px-2.5 py-1 rounded-lg text-[11px] transition flex items-center gap-1 shadow-sm cursor-pointer">
          <span>+</span> Add
        </button>
      </div>
    `).join('');

    return `
      <div class="bg-neutral-900 rounded-3xl p-4 border border-yellow-400/10 flex flex-col justify-between hover:border-yellow-400/30 transition shadow-lg group">
        <div>
          <div class="relative w-full h-40 rounded-2xl overflow-hidden bg-neutral-800 mb-3.5 flex items-center justify-center">
            <span class="absolute top-2.5 left-2.5 z-10 bg-brand-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              ${categoryTag}
            </span>
            <span class="absolute top-2.5 right-2.5 z-10 bg-neutral-950/80 text-yellow-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-yellow-400/20">
              ${variants.length} Sizes
            </span>
            <img src="${item.image || item.img || 'images/pizza pic.jpg'}" alt="${escapedName}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="if(this.src!=='images/pizza pic.jpg')this.src='images/pizza pic.jpg';">
          </div>
          <h3 class="font-black text-white text-base">${item.name}</h3>
          <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${description}</p>
        </div>

        <div class="space-y-1.5 pt-3 mt-3 border-t border-yellow-400/10">
          ${sizeRowsHtml}
        </div>
      </div>
    `;
  }

  const rawPrice = typeof item.price === 'number' 
    ? item.price 
    : parseInt(String(item.price || '0').replace(/[^0-9]/g, ''), 10) || 0;

  return `
    <div class="bg-neutral-900 rounded-3xl p-4 border border-yellow-400/10 flex flex-col justify-between hover:border-yellow-400/30 transition shadow-lg group">
      <div>
        <div class="relative w-full h-40 rounded-2xl overflow-hidden bg-neutral-800 mb-3.5 flex items-center justify-center">
          <span class="absolute top-2.5 left-2.5 z-10 bg-brand-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            ${categoryTag}
          </span>
          <img src="${item.image || item.img || 'images/pizza pic.jpg'}" alt="${escapedName}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='images/burgers.jpg'">
        </div>
        <h3 class="font-black text-white text-base">${item.name}</h3>
        <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${description}</p>
      </div>

      <div class="flex items-center justify-between pt-3 mt-3 border-t border-yellow-400/10">
        <div>
          <span class="text-[10px] uppercase font-bold text-neutral-500 block">Price</span>
          <span class="text-base font-black text-yellow-400">Rs. ${rawPrice}/-</span>
        </div>
        <button 
          type="button" 
          onclick="addStandardToCart('${itemId}', '${escapedName}', ${rawPrice})" 
          class="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-neutral-950 font-black px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5 cursor-pointer">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// 4. RENDER MENU GRID
// ==========================================
function renderMenu(itemsToRender = activeMenuItems) {
  const grid = document.getElementById('menu-grid');
  const heading = document.getElementById('item-count-heading');

  if (!grid) return;
  if (heading) heading.innerText = `Showing ${itemsToRender.length} items`;

  if (itemsToRender.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-neutral-400 py-12">No menu items match your criteria.</p>`;
    return;
  }

  grid.innerHTML = itemsToRender.map(item => renderProductCard(item)).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 5. STICKY TOP CATEGORY SCROLL & FILTER
// ==========================================
function selectCategory(buttonElement, category) {
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.remove('active');
  });

  if (buttonElement) {
    buttonElement.classList.add('active');
    buttonElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }

  filterByCategory(category);
}

function filterByCategory(category) {
  if (category === 'ALL') {
    renderMenu(activeMenuItems);
  } else {
    const target = category.toLowerCase().replace(/['s]/g, '').trim();
    const filtered = activeMenuItems.filter(item => {
      const itemCat = (item.category || '').toLowerCase().replace(/['s]/g, '').trim();
      return itemCat.includes(target) || target.includes(itemCat);
    });
    renderMenu(filtered);
  }

  const gridHeading = document.getElementById('item-count-heading');
  if (gridHeading) {
    gridHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function searchMenu() {
  const query = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
  const filtered = activeMenuItems.filter(item => 
    item.name.toLowerCase().includes(query) || 
    (item.desc && item.desc.toLowerCase().includes(query)) || 
    (item.category && item.category.toLowerCase().includes(query))
  );
  renderMenu(filtered);
}

// ==========================================
// 6. CART MANAGEMENT (FRESH SESSION + AUTO-OPEN LOGIC)
// ==========================================
function handleCartAutoOpen() {
  // Urgent card open sirf pehli dafa jab item add ho
  if (!hasAutoOpenedCart) {
    openCartDrawer();
    hasAutoOpenedCart = true;
  }
}

function addVariantToCart(productId, baseName, size, price) {
  const variantTitle = `${baseName} (${size})`;
  const existingIndex = cart.findIndex(item => item.name === variantTitle && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      productId: productId || null,
      name: variantTitle,
      baseName: baseName,
      size: size,
      price: Number(price),
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Added ${variantTitle}`);
  handleCartAutoOpen();
}

function addStandardToCart(productId, name, price) {
  const existingIndex = cart.findIndex(item => item.name === name && !item.size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      productId: productId || null,
      name: name,
      baseName: name,
      size: null,
      price: Number(price),
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Added ${name}`);
  handleCartAutoOpen();
}

function addToCart(name, priceStr) {
  const numericPrice = parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10) || 0;
  addStandardToCart(null, name, numericPrice);
}

function persistCart() {
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  const countContainer = document.getElementById('cart-count');
  const floatingBadge = document.getElementById('floating-cart-badge');

  let total = 0;
  let totalCount = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    totalCount += item.quantity;
  });

  if (container) {
    container.innerHTML = '';
    if (cart.length === 0) {
      container.innerHTML = '<p class="text-neutral-500 text-xs text-center py-4">Your cart is empty</p>';
    } else {
      cart.forEach((item, index) => {
        container.innerHTML += `
          <div class="flex justify-between items-center bg-neutral-800/80 p-3 rounded-2xl border border-neutral-700/60 text-xs">
            <div>
              <p class="font-extrabold text-white">${item.name}</p>
              <p class="text-neutral-400 mt-0.5">Rs. ${item.price} Ã— ${item.quantity}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-black text-yellow-400">Rs. ${item.price * item.quantity}</span>
              <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-300 font-bold p-1 transition cursor-pointer">âœ•</button>
            </div>
          </div>
        `;
      });
    }
  }

  if (totalContainer) totalContainer.innerText = `Rs. ${total}`;
  if (countContainer) countContainer.innerText = `${totalCount} items`;
  if (floatingBadge) floatingBadge.innerText = totalCount;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 right-5 bg-yellow-400 text-neutral-950 font-black px-4 py-2.5 rounded-2xl text-xs shadow-2xl z-50 transition-all duration-300';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('translate-x-full');
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.toggle('translate-x-full');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.add('translate-x-full');
  }
  // User ne cart close kiya, ab agle items par automatic drawer open nahi hoga
  hasAutoOpenedCart = true;
}

// ==========================================
// 7. PAYMENT UI TOGGLE
// ==========================================
function togglePaymentUI() {
  const selectedRadio = document.querySelector('input[name="payment-method"]:checked');
  const method = selectedRadio ? selectedRadio.value : 'Cash on Delivery';
  const bankBox = document.getElementById('bank-transfer-box');
  const receiptInput = document.getElementById('receipt-upload');

  if (!bankBox) return;

  if (method === 'Bank Transfer' || method === 'Online Bank Transfer') {
    bankBox.classList.remove('hidden');
    bankBox.style.display = 'block';
    if (receiptInput) receiptInput.required = true;
  } else {
    bankBox.classList.add('hidden');
    bankBox.style.display = 'none';
    if (receiptInput) {
      receiptInput.required = false;
      receiptInput.value = '';
    }
  }
}

// ==========================================
// 8. GEOLOCATION & CHECKOUT DISPATCH
// ==========================================
function fetchUserLocation() {
  const addressInput = document.getElementById('customer-address');
  const locationBtn = document.querySelector('button[onclick="fetchUserLocation()"]') || 
                      document.getElementById('location-btn') || 
                      addressInput?.parentElement?.querySelector('button, svg, [data-lucide="map-pin"]');

  if (!addressInput) return;

  // Visual Highlight: Border glow aur ring animation start
  addressInput.classList.add('ring-2', 'ring-yellow-400', 'border-yellow-400', 'animate-pulse');
  if (locationBtn) {
    locationBtn.classList.add('text-yellow-400', 'scale-110');
  }

  function removeHighlight() {
    addressInput.classList.remove('ring-2', 'ring-yellow-400', 'border-yellow-400', 'animate-pulse');
    if (locationBtn) {
      locationBtn.classList.remove('text-yellow-400', 'scale-110');
    }
  }

  if (!navigator.geolocation) {
    removeHighlight();
    showCheckoutNotification("Geolocation is not supported by your browser.", "error");
    return;
  }

  addressInput.value = "ðŸ“ Detecting live GPS location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      detectedCoords = { lat, lng: lon };

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        addressInput.value = data?.display_name || `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
      } catch (err) {
        addressInput.value = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
      } finally {
        removeHighlight();
        // Green confirmation flash
        addressInput.classList.add('ring-2', 'ring-green-400', 'border-green-400');
        setTimeout(() => addressInput.classList.remove('ring-2', 'ring-green-400', 'border-green-400'), 1500);
      }
    },
    (err) => {
      removeHighlight();
      addressInput.value = "";
      showCheckoutNotification("Location permission denied. Please enter address manually.", "error");
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

function showCheckoutNotification(message, type = 'error') {
  let note = document.getElementById('checkout-notification');
  const drawer = document.getElementById('cart-drawer');
  const orderBtn = drawer ? drawer.querySelector('button[onclick="placeOrder()"]') : null;

  if (!note && orderBtn) {
    note = document.createElement('div');
    note.id = 'checkout-notification';
    orderBtn.parentNode.insertBefore(note, orderBtn);
  }

  if (!note) return;
  note.innerText = message;
  note.className = type === 'error'
    ? 'text-xs p-3 rounded-xl mb-3 font-semibold text-center bg-red-500/20 text-red-400 border border-red-500/30'
    : 'text-xs p-3 rounded-xl mb-3 font-semibold text-center bg-green-500/20 text-green-400 border border-green-500/30';
  note.classList.remove('hidden');

  if (type !== 'error') {
    setTimeout(() => note.classList.add('hidden'), 5000);
  }
}

async function placeOrder() {
  const orderBtn = document.querySelector('button[onclick="placeOrder()"]');
  const originalBtnText = orderBtn ? orderBtn.innerHTML : "Place Order Now";

  if (cart.length === 0) {
    showCheckoutNotification("Your cart is empty! Add items first.", "error");
    return;
  }

  const customerName = document.getElementById('customer-name')?.value.trim();
  const phone = document.getElementById('customer-phone')?.value.trim();
  const address = document.getElementById('customer-address')?.value.trim();

  if (!customerName || !phone || !address) {
    showCheckoutNotification("Please fill in Name, Phone and Address.", "error");
    return;
  }

  const selectedRadio = document.querySelector('input[name="payment-method"]:checked');
  const paymentMethod = selectedRadio ? selectedRadio.value : 'Cash on Delivery';

  const totalAmount = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  const formattedItems = cart.map(item => ({
    name: item.name,
    size: item.size || null,
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 1
  }));

  if (orderBtn) {
    orderBtn.disabled = true;
    orderBtn.innerHTML = `<span>Placing Order...</span>`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        customerName,
        customerPhone: phone,
        phone: phone,
        deliveryAddress: address,
        address: address,
        locationCoords: detectedCoords,
        items: formattedItems,
        totalAmount,
        paymentMethod
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      showCheckoutNotification("Order placed successfully! Sent to Kitchen.", "success");
      cart = [];
      updateCartUI();
      detectedCoords = { lat: null, lng: null };
      hasAutoOpenedCart = false;

      if (document.getElementById('customer-name')) document.getElementById('customer-name').value = '';
      if (document.getElementById('customer-phone')) document.getElementById('customer-phone').value = '';
      if (document.getElementById('customer-address')) document.getElementById('customer-address').value = '';

      setTimeout(() => closeCartDrawer(), 1500);
    } else {
      const errData = await response.json().catch(() => ({}));
      showCheckoutNotification(errData.error || errData.message || "Order submit nahi ho saka. Please try again.", "error");
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("Order submission error:", err);
    showCheckoutNotification(err.name === 'AbortError' ? "Request timeout. Server responded slowly." : "Live server connect nahi ho raha. Check backend Vercel status.", "error");
  } finally {
    if (orderBtn) {
      orderBtn.disabled = false;
      orderBtn.innerHTML = originalBtnText;
    }
  }
}

// ==========================================
// 9. DYNAMIC DATA FETCHING & INITIALIZATION
// ==========================================
async function initializeApp() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(MENU_API_URL, {
      signal: controller.signal,
      headers: { 
        'Accept': 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Database responded with HTTP status ${res.status}`);
    }

    const dbItems = await res.json();

    if (Array.isArray(dbItems) && dbItems.length > 0) {
      activeMenuItems = dbItems;
    } else {
      throw new Error("Empty product array received from database");
    }

  } catch (err) {
    clearTimeout(timeoutId);
    activeMenuItems = [...fallbackMenuItems];
  }

  renderMenu();
  updateCartUI();

  // Payment listeners
  const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
  paymentRadios.forEach(radio => {
    radio.addEventListener('change', togglePaymentUI);
    radio.addEventListener('click', togglePaymentUI);
  });

  // Location input field par focus hone se detection & highlight activate
  const addressField = document.getElementById('customer-address');
  if (addressField) {
    addressField.addEventListener('focus', () => {
      if (!addressField.value || addressField.value.trim() === '') {
        fetchUserLocation();
      }
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    const targetPill = Array.from(document.querySelectorAll('.cat-pill')).find(
      btn => btn.textContent.toLowerCase().includes(catParam.toLowerCase())
    );
    if (targetPill) {
      selectCategory(targetPill, catParam);
    } else {
      filterByCategory(catParam);
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

window.addEventListener('DOMContentLoaded', initializeApp);

// ==========================================
// 10. SHOP ADMIN AUTHENTICATION FLOW
// ==========================================
(function initShopAdminFlow() {
  const MAX_ATTEMPTS = 3;
  let failedAttempts = 0;

  const VALID_USER = "admin";
  const VALID_PASS = "muneeb123";

  const shopAdminOpenBtn = document.getElementById('shopAdminOpenBtn');
  const confirmModal = document.getElementById('adminConfirmModal');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmProceedBtn = document.getElementById('confirmProceedBtn');

  const loginModal = document.getElementById('adminLoginModal');
  const loginCloseBtn = document.getElementById('loginCloseBtn');
  const loginForm = document.getElementById('adminLoginForm');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const userInput = document.getElementById('adminUsername');
  const passInput = document.getElementById('adminPassword');

  if (shopAdminOpenBtn && confirmModal) {
    shopAdminOpenBtn.addEventListener('click', () => {
      confirmModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    });
  }

  if (confirmCancelBtn && confirmModal) {
    confirmCancelBtn.addEventListener('click', () => {
      confirmModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  if (confirmProceedBtn && confirmModal && loginModal) {
    confirmProceedBtn.addEventListener('click', () => {
      confirmModal.classList.add('hidden');
      loginModal.classList.remove('hidden');
      userInput.value = '';
      passInput.value = '';
      if (loginErrorMsg) loginErrorMsg.classList.add('hidden');
      userInput.focus();
      if (window.lucide) lucide.createIcons();
    });
  }

  if (loginCloseBtn && loginModal) {
    loginCloseBtn.addEventListener('click', () => {
      loginModal.classList.add('hidden');
      document.body.style.overflow = '';
      failedAttempts = 0;
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const enteredUser = userInput.value.trim();
      const enteredPass = passInput.value.trim();

      if (enteredUser === VALID_USER && enteredPass === VALID_PASS) {
        failedAttempts = 0;
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        window.location.href = 'shop-admin.html';
      } else {
        failedAttempts += 1;
        const remaining = MAX_ATTEMPTS - failedAttempts;

        if (failedAttempts >= MAX_ATTEMPTS) {
          alert("Bohat zyada ghalat attempts! Access block kar di gayi hai.");
          loginModal.classList.add('hidden');
          document.body.style.overflow = '';
          failedAttempts = 0;
          window.location.href = 'index.html';
        } else {
          if (loginErrorMsg) {
            loginErrorMsg.textContent = `Ghalat credentials! Aapke paas ${remaining} koshish baqi hain.`;
            loginErrorMsg.classList.remove('hidden');
          }
          passInput.value = '';
          passInput.focus();
        }
      }
    });
  }
})();// Example: Main site ka dynamic loader
async function loadLiveMenu() {
  try {
    // Make sure endpoint wahi ho jahan admin save kar raha hai
    const res = await fetch('http://localhost:5000/api/menu'); 
    const items = await res.json();

    // Render items dynamically with updated image
    renderMenuItems(items);
  } catch (err) {
    console.error("Menu fetch failed:", err);
  }

// ==============================================================
// FAIL-SAFE UNIFIED RENDER ENGINE
// ==============================================================
var BACKEND_BASE = "https://muneeb-cafe-backend.vercel.app";
var MENU_API_URL = `${BACKEND_BASE}/api/menu`;

function getLoadedItems() {
  if (typeof activeMenuItems !== 'undefined' && Array.isArray(activeMenuItems) && activeMenuItems.length > 0) {
    return activeMenuItems;
  }
  const cached = localStorage.getItem('menuItems');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  return typeof fallbackMenuItems !== 'undefined' ? fallbackMenuItems : [];
}

function renderHomeDeals() {
  const dealsGrid = document.getElementById('home-deals-grid');
  if (!dealsGrid) return;

  const items = getLoadedItems();
  let deals = items.filter(i => (i.category || '').toLowerCase().includes('deal') &&
    !((i.name || '').toLowerCase().includes('mega') || (i.name || '').toLowerCase().includes('platter') || (i.name || '').toLowerCase().includes('limosine'))
  );

  deals.sort((a, b) => {
    const numA = parseInt((a.name.match(/\d+/) || [999])[0], 10);
    const numB = parseInt((b.name.match(/\d+/) || [999])[0], 10);
    return numA - numB;
  });

  const displayDeals = deals.slice(0, 4);
  if (displayDeals.length === 0) return;

  dealsGrid.innerHTML = displayDeals.map((deal, idx) => {
    const img = (deal.image && deal.image.length > 5) ? deal.image : (deal.img || 'images/pizza pic.jpg');
    const price = deal.price || (deal.sizes && deal.sizes[0] ? deal.sizes[0].price : 800);
    const name = deal.name || `Deal.${idx + 1}`;
    const safeName = name.replace(/'/g, "\\'");

    return `
      <div class="bg-[#121212] rounded-2xl p-3 sm:p-4 shadow-soft hover:shadow-hover transition duration-300 flex flex-col justify-between group border border-yellow-400/10">
        <div>
          <div class="relative w-full h-28 sm:h-44 rounded-xl overflow-hidden bg-neutral-800 mb-3">
            <span class="absolute top-2 left-2 z-10 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase">${name.split(' ')[0] || 'Deal'}</span>
            <img src="${img}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='images/pizza pic.jpg';">
          </div>
          <h3 class="font-bold text-white group-hover:text-brand-500 transition text-sm sm:text-base">${name}</h3>
          <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${deal.desc || deal.description || ''}</p>
        </div>
        <div class="flex items-center justify-between mt-4 pt-2.5 border-t border-yellow-400/10">
          <span class="text-sm sm:text-lg font-bold text-yellow-400">Rs. ${price}/-</span>
          <button onclick="addToCart('${safeName}', '${price}/-')" class="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold py-1.5 px-3 rounded-full transition active:scale-95 shadow-md cursor-pointer">
            Add
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function renderSignatureMegaDeals() {
  const container = document.getElementById('home-mega-deals-grid');
  if (!container) return;

  const items = getLoadedItems();

  let limo = items.find(i => (i.name || '').toLowerCase().includes('limosine')) || {
    name: "Limosine Pizza Deal",
    price: 3500,
    desc: "Massive 2-foot party pizza with multi-flavor crusts, garlic bread, wings, and 1.5L soft drink.",
    image: "images/pizza pic.jpg"
  };

  let platter = items.find(i => (i.name || '').toLowerCase().includes('plater') || (i.name || '').toLowerCase().includes('platter')) || {
    name: "Muneeb Special Plater",
    price: 3000,
    desc: "10 Crispy Nuggets, 10 Hot Wings, 10 Grilled Wings, 1 Large Pizza, and 1.5 Ltr Soft Drink.",
    image: "images/deals.jpg"
  };

  let birthday = items.find(i => (i.name || '').toLowerCase().includes('birthday')) || {
    name: "Birthday Celebration Pizza Deal",
    price: 2500,
    desc: "Special celebration feast with customized toppings, drinks, and sides.",
    image: "images/pizza pic.jpg"
  };

  const cards = [
    { item: limo, tag: "👑 King Size Deal", badge: "MEGA FEAST" },
    { item: platter, tag: "⭐ Most Popular Platter", badge: "HOT DEAL" },
    { item: birthday, tag: "🎉 Special Birthday Deal", badge: "POPULAR" }
  ];

  container.innerHTML = cards.map(({ item, tag, badge }) => {
    const img = (item.image && item.image.length > 5) ? item.image : (item.img || 'images/pizza pic.jpg');
    const price = item.price || 3000;
    const name = item.name || 'Mega Deal';
    const safeName = name.replace(/'/g, "\\'");

    return `
      <div class="bg-[#121212] border border-yellow-400/15 rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-yellow-400/30 transition duration-300 shadow-soft overflow-hidden group">
        <div class="w-full md:w-7/12 space-y-3.5 order-2 md:order-1">
          <span class="inline-block bg-brand-500/15 border border-brand-500/30 text-brand-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${tag}</span>
          <h3 class="text-xl sm:text-3xl font-extrabold text-white group-hover:text-yellow-400 transition">${name}</h3>
          <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${item.desc || item.description || ''}</p>
          <div class="flex items-center gap-4 pt-2">
            <span class="text-xl sm:text-2xl font-black text-yellow-400">Rs. ${price}/-</span>
            <button onclick="addToCart('${safeName}', '${price}/-')" class="bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition active:scale-95 shadow-md cursor-pointer">
              Order Now
            </button>
          </div>
        </div>
        <div class="w-full md:w-5/12 h-48 sm:h-60 rounded-2xl overflow-hidden bg-neutral-800 relative shadow-md order-1 md:order-2 shrink-0">
          <img src="${img}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='images/pizza pic.jpg';">
          <span class="absolute top-3 right-3 bg-brand-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">${badge}</span>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function renderAllUI() {
  if (typeof renderMenu === 'function') renderMenu();
  renderHomeDeals();
  renderSignatureMegaDeals();
}

async function syncCloudBackend() {
  try {
    const res = await fetch(`${MENU_API_URL}?t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        activeMenuItems = data;
        localStorage.setItem('menuItems', JSON.stringify(data));
        renderAllUI();
      }
    }
  } catch (e) {
    console.warn("Backend offline, working smoothly on cached items");
  }
}

// Immediate load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderAllUI();
    syncCloudBackend();
  });
} else {
  renderAllUI();
  syncCloudBackend();
}

// ==========================================
// DIRECT GUARANTEED RENDERER
// ==========================================
(function forceRenderCardsImmediately() {
  function run() {
    const dealsGrid = document.getElementById('home-deals-grid');
    const megaGrid = document.getElementById('home-mega-deals-grid');

    // Default Fallback items agar activeMenuItems load na hon
    const defaultDeals = [
      { name: "Deal 1", price: 650, desc: "1 Small Pizza + 345ml Cold Drink", img: "images/pizza pic.jpg" },
      { name: "Deal 2", price: 1250, desc: "1 Regular Pizza + 500ml Cold Drink", img: "images/pizza pic.jpg" },
      { name: "Deal 3", price: 1750, desc: "1 Large Pizza + 1 Ltr Cold Drink", img: "images/pizza pic.jpg" },
      { name: "Deal 4", price: 2450, desc: "2 Large Pizzas + 1.5 Ltr Cold Drink", img: "images/pizza pic.jpg" }
    ];

    if (dealsGrid) {
      let items = (typeof activeMenuItems !== 'undefined' && activeMenuItems.length > 0)
        ? activeMenuItems.filter(i => (i.category || '').toLowerCase().includes('deal'))
        : defaultDeals;

      if (items.length === 0) items = defaultDeals;

      dealsGrid.innerHTML = items.slice(0, 4).map((d, i) => {
        const imgSrc = (d.image && d.image.length > 5) ? d.image : (d.img || 'images/pizza pic.jpg');
        const price = d.price || 800;
        const name = d.name || `Deal ${i+1}`;
        return `
          <div class="bg-[#121212] rounded-2xl p-3 sm:p-4 shadow-soft hover:shadow-hover transition duration-300 flex flex-col justify-between group border border-yellow-400/10">
            <div>
              <div class="relative w-full h-28 sm:h-44 rounded-xl overflow-hidden bg-neutral-800 mb-3">
                <span class="absolute top-2 left-2 z-10 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase">${name.split(' ')[0]}</span>
                <img src="${imgSrc}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='images/pizza pic.jpg';">
              </div>
              <h3 class="font-bold text-white group-hover:text-brand-500 transition text-sm sm:text-base">${name}</h3>
              <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${d.desc || ''}</p>
            </div>
            <div class="flex items-center justify-between mt-4 pt-2.5 border-t border-yellow-400/10">
              <span class="text-sm sm:text-lg font-bold text-yellow-400">Rs. ${price}/-</span>
              <button onclick="addToCart('${name.replace(/'/g, "\\'")}', '${price}/-')" class="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold py-1.5 px-3 rounded-full transition active:scale-95 shadow-md">
                Add
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    if (megaGrid) {
      const megaItems = [
        {
          name: "Limosine Pizza Deal",
          price: 3500,
          tag: "👑 King Size Deal",
          badge: "MEGA FEAST",
          desc: "Massive 2-foot party pizza with multi-flavor crusts, garlic bread, wings, and 1.5L soft drink.",
          img: "images/pizza pic.jpg"
        },
        {
          name: "Muneeb Special Plater",
          price: 3000,
          tag: "⭐ Most Popular Platter",
          badge: "HOT DEAL",
          desc: "10 Crispy Nuggets, 10 Hot Wings, 10 Grilled Wings, 1 Large Pizza, and 1.5 Ltr Soft Drink.",
          img: "images/deals.jpg"
        },
        {
          name: "Birthday Celebration Pizza Deal",
          price: 2500,
          tag: "🎉 Special Birthday Deal",
          badge: "POPULAR",
          desc: "Special celebration feast with customized toppings, drinks, and sides.",
          img: "images/pizza pic.jpg"
        }
      ];

      megaGrid.innerHTML = megaItems.map(m => `
        <div class="bg-[#121212] border border-yellow-400/15 rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-yellow-400/30 transition duration-300 shadow-soft overflow-hidden group">
          <div class="w-full md:w-7/12 space-y-3.5 order-2 md:order-1">
            <span class="inline-block bg-brand-500/15 border border-brand-500/30 text-brand-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${m.tag}</span>
            <h3 class="text-xl sm:text-3xl font-extrabold text-white group-hover:text-yellow-400 transition">${m.name}</h3>
            <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${m.desc}</p>
            <div class="flex items-center gap-4 pt-2">
              <span class="text-xl sm:text-2xl font-black text-yellow-400">Rs. ${m.price}/-</span>
              <button onclick="addToCart('${m.name.replace(/'/g, "\\'")}', '${m.price}/-')" class="bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition active:scale-95 shadow-md">
                Order Now
              </button>
            </div>
          </div>
          <div class="w-full md:w-5/12 h-48 sm:h-60 rounded-2xl overflow-hidden bg-neutral-800 relative shadow-md order-1 md:order-2 shrink-0">
            <img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='images/pizza pic.jpg';">
            <span class="absolute top-3 right-3 bg-brand-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">${m.badge}</span>
          </div>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
