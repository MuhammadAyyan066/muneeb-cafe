const menuItems = [
  // --- DEALS ---
  { name: "Deal.1", category: "Deals", price: "800/-", time: "15 min", rating: "4.8 (45)", desc: "1 Small Pizza, 5 Hot Wings, Half Liter Drink", tag: "Deal", image: "images/pizza pic.jpg" },
  { name: "Deal.2", category: "Deals", price: "850/-", time: "15 min", rating: "4.7 (50)", desc: "2 Zinger Burger, Small Fries, Half Liter Drink", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.3", category: "Deals", price: "450/-", time: "12 min", rating: "4.6 (38)", desc: "1 Zinger Burger, 1 Regular Fries, 1 Regular Drink", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.4", category: "Deals", price: "1200/-", time: "18 min", rating: "4.9 (62)", desc: "1 Small Pizza, 2 Peti Burger, 1 Small Fries, Half Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.5", category: "Deals", price: "1750/-", time: "20 min", rating: "4.8 (55)", desc: "1 Medium Pizza, 2 Zinger Burger, 2 Regular Fries, 1 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.6", category: "Deals", price: "1850/-", time: "20 min", rating: "4.9 (70)", desc: "1 Medium Pizza, 12 Hot Wings, 2 Regular Fries, 1 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.7", category: "Deals", price: "2200/-", time: "22 min", rating: "5.0 (40)", desc: "6 Zinger Burger, 1 Liter Drink, 2 Regular Fries", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.8", category: "Deals", price: "2250/-", time: "25 min", rating: "4.9 (82)", desc: "1 Large Pizza, 10 Nuggets, 1 Medium Fries, 1.5 Liter Drink", tag: "Deal", image: "images/pizza pic.jpg" },
  { name: "Deal.9", category: "Deals", price: "1600/-", time: "18 min", rating: "4.7 (44)", desc: "5 Peti Burger, 2 Regular Fries, 1.5 Liter Drink", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.10", category: "Deals", price: "3200/-", time: "25 min", rating: "4.9 (90)", desc: "1 Large Pizza, 2 Zinger Burger, 10 Hot Wings, Mayo Garlic Fries Large, 1.5 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.11", category: "Deals", price: "2900/-", time: "25 min", rating: "4.8 (65)", desc: "2 Medium Pizza, 2 Zinger Burger, 5 Hot Wings, 2 Regular Fries, 1.5 Liter Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Birthday Deal", category: "Deals", price: "6500/-", time: "35 min", rating: "5.0 (120)", desc: "2 Family Pizza, 5 Grill Burger, 20 Grill Wings, 1 Pound Cake, 4 Regular Fries, 2 Drink 1.5 Ltr", tag: "Party", image: "images/deals.jpg" },
  { name: "Deal.16", category: "Deals", price: "550/-", time: "12 min", rating: "4.7 (33)", desc: "1 Malai Boti Shawarma, 5p Nuggets, 1 Regular Drink", tag: "Deal", image: "images/shawarma.jpg" },
  { name: "Deal.17", category: "Deals", price: "750/-", time: "14 min", rating: "4.8 (48)", desc: "2 Special Peti Burger, 2 Regular Drink, 2 Regular Fries", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.18", category: "Deals", price: "600/-", time: "12 min", rating: "4.6 (39)", desc: "14 Nuggets, 1 Regular Drink", tag: "Deal", image: "images/hot wings.jpg" },
  { name: "Deal.19", category: "Deals", price: "700/-", time: "12 min", rating: "4.8 (51)", desc: "2 Tikka Pratha, 2 Regular Fries, 2 Regular Drink", tag: "Deal", image: "images/deals.jpg" },
  { name: "Deal.20", category: "Deals", price: "750/-", time: "14 min", rating: "4.7 (44)", desc: "2 Special Peti Burger, 2 Regular Drink, 2 Regular Fries", tag: "Deal", image: "images/burgers.jpg" },
  { name: "Deal.21", category: "Deals", price: "1000/-", time: "15 min", rating: "4.9 (67)", desc: "20p Grill Wings, 1 Half Ltr Drink", tag: "Deal", image: "images/hot wings.jpg" },
  { name: "Limousine Pizza", category: "Deals", price: "3500/-", time: "30 min", rating: "5.0 (85)", desc: "Giant Limousine Pizza + 2 Ltr Drink", tag: "Special", image: "images/pizza pic.jpg" },
  { name: "Muneeb Special Plater", category: "Deals", price: "3000/-", time: "25 min", rating: "4.9 (78)", desc: "10 Nuggets, 10 Hot wings, 10 Grill wings, 1 Large Pizza, 1 Drink 1.5 Ltr", tag: "Plater", image: "images/deals.jpg" },

  // --- PIZZA'S ---
  { name: "Chicken Tikka Pizza", category: "Pizza", price: "550/- (S)", time: "20 min", rating: "4.7 (80)", desc: "Flavours: Chicken Tikka, Creamy Tikka, Fajita, Hot & Spice", tag: "Pizza", image: "images/pizza pic.jpg" },
  { name: "Hot & Spicy Pizza", category: "Pizza", price: "1150/- (M)", time: "20 min", rating: "4.8 (90)", desc: "Medium size spicy chicken pizza", tag: "Pizza", image: "images/pizza pic.jpg" },
  { name: "Creamy Tikka Pizza", category: "Pizza", price: "1600/- (L)", time: "22 min", rating: "4.8 (110)", desc: "Large creamy tikka pizza", tag: "Pizza", image: "images/pizza pic.jpg" },
  { name: "Cheese Lover Pizza", category: "Pizza", price: "1900/- (F)", time: "25 min", rating: "4.9 (130)", desc: "Family size heavily loaded with cheese", tag: "Pizza", image: "images/pizza pic.jpg" },

  // --- MUNEEB SPECIAL PIZZA'S ---
  { name: "Muneeb Special Pizza", category: "Muneeb Special Pizza", price: "700/- (S)", time: "25 min", rating: "4.9 (150)", desc: "Special Chef recipe pizza with extra toppings", tag: "Special", image: "images/pizza pic.jpg" },
  { name: "Crown Crust Pizza", category: "Muneeb Special Pizza", price: "1350/- (M)", time: "25 min", rating: "4.8 (95)", desc: "Stuffed crust with delicious kebab fillings", tag: "Special", image: "images/pizza pic.jpg" },
  { name: "B.B.Q Pizza", category: "Muneeb Special Pizza", price: "1750/- (L)", time: "25 min", rating: "4.9 (88)", desc: "Smoky BBQ flavor with grilled chicken chunks", tag: "Special", image: "images/pizza pic.jpg" },
  { name: "Lazania Pizza", category: "Muneeb Special Pizza", price: "2200/- (F)", time: "30 min", rating: "5.0 (64)", desc: "Fusion of lasagna and pizza loaded with cheese", tag: "Special", image: "images/pizza pic.jpg" },

  // --- SHAWARMA ---
  { name: "Chicken Shwarma", category: "Shawarma", price: "250/-", time: "10 min", rating: "4.6 (200)", desc: "Classic shredded chicken with garlic sauce", tag: "Shawarma", image: "images/shawarma.jpg" },
  { name: "Cheese Chicken Shwarma", category: "Shawarma", price: "300/-", time: "10 min", rating: "4.7 (180)", desc: "Loaded with melted cheddar cheese", tag: "Shawarma", image: "images/shawarma.jpg" },
  { name: "Zinger Shwarma", category: "Shawarma", price: "300/-", time: "12 min", rating: "4.8 (220)", desc: "Crispy zinger fillet inside soft shwarma bread", tag: "Shawarma", image: "images/shawarma.jpg" },
  { name: "Plater Shwarma", category: "Shawarma", price: "590/-", time: "15 min", rating: "4.9 (112)", desc: "Open platter shwarma with fries and sauces", tag: "Shawarma", image: "images/shawarma.jpg" },

  // --- PRATHA ROLL ---
  { name: "Twister Pratha", category: "Pratha Roll", price: "300/-", time: "12 min", rating: "4.7 (90)", desc: "Crispy flaky pratha wrapped around spicy chicken", tag: "Roll", image: "images/shawarma.jpg" },
  { name: "Zinger Pratha", category: "Pratha Roll", price: "350/-", time: "12 min", rating: "4.8 (140)", desc: "Zinger fillet wrapped in crunchy pratha", tag: "Roll", image: "images/shawarma.jpg" },
  { name: "Malai Boti Pratha", category: "Pratha Roll", price: "300/-", time: "12 min", rating: "4.6 (75)", desc: "Creamy malai boti pieces in pratha roll", tag: "Roll", image: "images/shawarma.jpg" },

  // --- HOT WINGS ---
  { name: "Hot Wings (6p / 12p)", category: "Wings", price: "300/-", time: "10 min", rating: "4.8 (210)", desc: "Spicy crispy fried chicken hot wings", tag: "Wings", image: "images/hot wings.jpg" },
  { name: "Bar BQ Honey Wings", category: "Wings", price: "300/-", time: "10 min", rating: "4.7 (130)", desc: "Glazed in sweet and smoky BBQ sauce", tag: "Wings", image: "images/hot wings.jpg" },
  { name: "Buffalo Wings", category: "Wings", price: "300/-", time: "10 min", rating: "4.9 (165)", desc: "Tossed in tangy buffalo hot sauce", tag: "Wings", image: "images/hot wings.jpg" },

  // --- GRILL LEG PIECE ---
  { name: "Grill Leg Piece", category: "Grill Leg Piece", price: "350/-", time: "15 min", rating: "4.7 (80)", desc: "Juicy charred grilled chicken leg piece", tag: "Grill", image: "images/hot wings.jpg" },
  { name: "Fry Leg Piece", category: "Grill Leg Piece", price: "320/-", time: "12 min", rating: "4.6 (95)", desc: "Crispy golden fried chicken leg piece", tag: "Fry", image: "images/hot wings.jpg" },

  // --- PASTA ---
  { name: "White Sauce Pasta", category: "Pasta", price: "400/-", time: "15 min", rating: "4.8 (140)", desc: "Creamy white sauce with tender chicken pieces", tag: "Pasta", image: "images/pasta.jpg" },
  { name: "Red Sauce Pasta", category: "Pasta", price: "400/-", time: "15 min", rating: "4.7 (110)", desc: "Tangy tomato Italian red sauce pasta", tag: "Pasta", image: "images/pasta.jpg" },
  { name: "Chicken Creami Pasta", category: "Pasta", price: "400/-", time: "15 min", rating: "4.9 (175)", desc: "Extra creamy cheese sauce macaroni pasta", tag: "Pasta", image: "images/pasta.jpg" },

  // --- BURGERS ---
  { name: "Zinger Burger", category: "Burgers", price: "350/-", time: "10 min", rating: "4.8 (450)", desc: "Crispy chicken fillet with mayo and lettuce", tag: "Burger", image: "images/burgers.jpg" },
  { name: "Beef Lover Burger", category: "Burgers", price: "500/-", time: "12 min", rating: "4.9 (210)", desc: "Double beef patty with special burger sauce", tag: "Burger", image: "images/burgers.jpg" },
  { name: "Tower Burger", category: "Burgers", price: "460/-", time: "15 min", rating: "4.9 (310)", desc: "Double zinger patty with cheese slice and hashbrown", tag: "Burger", image: "images/burgers.jpg" },
  { name: "Pizza Burger", category: "Burgers", price: "500/-", time: "15 min", rating: "4.7 (125)", desc: "Unique fusion of pizza toppings inside a burger bun", tag: "Burger", image: "images/burgers.jpg" },

  // --- WRAPS ---
  { name: "Arabic Roll", category: "Wraps", price: "450/-", time: "10 min", rating: "4.7 (85)", desc: "Authentic Arabic style chicken wrap with garlic dip", tag: "Wrap", image: "images/shawarma.jpg" },
  { name: "Smoky Grill Wrap", category: "Wraps", price: "450/-", time: "12 min", rating: "4.8 (90)", desc: "Smoky flavored grilled chicken wrap", tag: "Wrap", image: "images/shawarma.jpg" },

  // --- SANDWICH ---
  { name: "Panini Grill Sandwich", category: "Sandwich", price: "400/-", time: "10 min", rating: "4.7 (110)", desc: "Pressed panini bread filled with seasoned chicken", tag: "Sandwich", image: "images/burgers.jpg" },
  { name: "House & Club Sandwich", category: "Sandwich", price: "400/-", time: "12 min", rating: "4.8 (160)", desc: "Triple layered classic club sandwich with fries", tag: "Sandwich", image: "images/burgers.jpg" },

  // --- FRIES ---
  { name: "Plain Fries", category: "Fries", price: "200/- (S)", time: "8 min", rating: "4.6 (300)", desc: "Crispy golden french fries", tag: "Fries", image: "images/burgers.jpg" },
  { name: "Cheese Fries", category: "Fries", price: "250/- (S)", time: "8 min", rating: "4.8 (240)", desc: "Fries smothered in warm melted cheese sauce", tag: "Fries", image: "images/burgers.jpg" },
  { name: "Loaded Fries", category: "Fries", price: "360/- (S)", time: "10 min", rating: "4.9 (290)", desc: "Fries topped with cheese, jalapenos and chicken bits", tag: "Fries", image: "images/burgers.jpg" }
];

let activeMenuItems = [...menuItems];
let cart = [];
let detectedCoords = { lat: null, lng: null };

// --- Render Menu Grid ---
function renderMenu(items) {
  const grid = document.getElementById('menu-grid');
  const heading = document.getElementById('item-count-heading');
  
  if (!grid) return;

  if (heading) {
    heading.innerText = `${items.length} Menu Items Available`;
  }
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-neutral-400 py-12">No items found matching your criteria.</p>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-neutral-900 rounded-3xl p-4 shadow-soft border border-yellow-400/10 flex flex-col justify-between hover:shadow-hover transition duration-200 group";
    
    const displayPrice = typeof item.price === 'number' ? `Rs. ${item.price}/-` : item.price;
    const itemTag = item.tag || item.category || 'Special';
    const itemRating = item.rating || '4.8 (50)';
    const itemTime = item.time || '15 min';

    card.innerHTML = `
      <div>
        <div class="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-800 mb-3.5 flex items-center justify-center">
          <span class="absolute top-2.5 left-2.5 z-10 bg-brand-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">${itemTag}</span>
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='images/pizza pic.jpg'">
        </div>
        <h3 class="font-bold text-yellow-400 text-sm sm:text-base group-hover:text-brand-500 transition">${item.name}</h3>
        <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${item.desc || item.description || ''}</p>
        <div class="flex items-center gap-3 text-xs text-neutral-400 mt-2.5 font-semibold">
          <span class="flex items-center text-amber-400"><i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 mr-1"></i>${itemRating}</span>
          <span class="flex items-center text-neutral-400 font-normal"><i data-lucide="clock" class="w-3.5 h-3.5 mr-1"></i>${itemTime}</span>
        </div>
      </div>
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-yellow-400/10">
        <span class="text-base font-extrabold text-yellow-400">${displayPrice}</span>
        <button onclick="addToCart('${encodeURIComponent(item.name)}', '${displayPrice}')" class="w-8 h-8 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition active:scale-95 shadow-md shadow-brand-500/20">
          <i data-lucide="plus" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// --- Category Filtering ---
function filterByCategory(category) {
  const buttons = document.querySelectorAll('aside .space-y-2 button');
  buttons.forEach(btn => {
    btn.classList.remove('bg-brand-500', 'text-white', 'font-bold');
    btn.classList.add('hover:bg-neutral-800');
  });

  const activeBtn = document.getElementById(`cat-${category}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-brand-500', 'text-white', 'font-bold');
    activeBtn.classList.remove('hover:bg-neutral-800');
  }

  if (category === 'ALL') {
    renderMenu(activeMenuItems);
  } else {
    const filtered = activeMenuItems.filter(item => 
      item.category && item.category.toLowerCase().trim() === category.toLowerCase().trim()
    );
    renderMenu(filtered);
  }

  const gridSection = document.getElementById('menu-grid');
  if (gridSection) {
    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Live Search ---
function searchMenu() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const filtered = activeMenuItems.filter(item => 
    item.name.toLowerCase().includes(query) || 
    (item.desc && item.desc.toLowerCase().includes(query)) || 
    (item.category && item.category.toLowerCase().includes(query))
  );
  renderMenu(filtered);
}

// --- Cart Drawer Controls ---
function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.toggle('translate-x-full');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.add('translate-x-full');
}

function addToCart(encodedName, priceStr) {
  const name = decodeURIComponent(encodedName);
  const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  const existing = cart.find(item => item.name === name);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price: numericPrice, quantity: 1 });
  }
  
  updateCartUI();
  
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('translate-x-full');
  }
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
  
  if (!container) return;

  container.innerHTML = '';
  let total = 0;
  let totalCount = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-neutral-500 text-xs text-center py-2">Cart is empty</p>';
    if (totalContainer) totalContainer.innerText = 'Rs. 0';
    if (countContainer) countContainer.innerText = '0 items';
    if (floatingBadge) floatingBadge.innerText = '0';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalCount += item.quantity;
    container.innerHTML += `
      <div class="flex justify-between items-center bg-neutral-800/80 p-2.5 rounded-xl text-xs">
        <div>
          <p class="font-bold text-white">${item.name}</p>
          <p class="text-neutral-400">Rs. ${item.price} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-400 font-bold hover:text-red-300 p-1">✕</button>
      </div>
    `;
  });

  if (totalContainer) totalContainer.innerText = `Rs. ${total}`;
  if (countContainer) countContainer.innerText = `${totalCount} items`;
  if (floatingBadge) floatingBadge.innerText = totalCount;
}

// --- Geolocation with OpenStreetMap & Reverse Geocoding ---
function fetchUserLocation() {
  const addressInput = document.getElementById('customer-address');
  if (!addressInput) return;

  if (!navigator.geolocation) {
    showCheckoutNotification("Geolocation is not supported by your browser.", "error");
    return;
  }

  addressInput.value = "Detecting GPS location...";

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
      }
    },
    (error) => {
      addressInput.value = "";
      showCheckoutNotification("Location permission denied. Please enter address manually.", "error");
    },
    { timeout: 10000 }
  );
}

// --- Inline Feedback Notification ---
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

// --- Order Placement Handler ---
async function placeOrder() {
  const orderBtn = document.querySelector('button[onclick="placeOrder()"]');
  const originalBtnText = orderBtn ? orderBtn.innerHTML : "Place Order Now";

  // 1. Client Validations
  if (cart.length === 0) {
    showCheckoutNotification("Your cart is empty! Add items first.", "error");
    return;
  }

  const customerName = document.getElementById('customer-name')?.value.trim();
  const phone = document.getElementById('customer-phone')?.value.trim();
  const address = document.getElementById('customer-address')?.value.trim();

  if (!customerName) {
    showCheckoutNotification("Please enter customer name.", "error");
    return;
  }
  if (!phone || phone.length < 10) {
    showCheckoutNotification("Please enter a valid phone number (at least 10 digits).", "error");
    return;
  }
  if (!address) {
    showCheckoutNotification("Please enter delivery address or use location detector.", "error");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 2. Button Loading State
  if (orderBtn) {
    orderBtn.disabled = true;
    orderBtn.innerHTML = `
      <span class="inline-flex items-center justify-center gap-2">
        <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Placing Order...
      </span>
    `;
  }

  // 3. API Dispatch (Fixed Payload: Both keys provided for full compatibility)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        customerName,
        customerPhone: phone,
        phone: phone,                  // Satisfies backend Mongoose schema { phone: { required: true } }
        deliveryAddress: address,
        address: address,              // Backward compatibility key
        locationCoords: detectedCoords,
        items: cart,
        totalAmount
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      showCheckoutNotification("Order placed successfully! Sent to Shop Kitchen.", "success");
      cart = [];
      updateCartUI();
      detectedCoords = { lat: null, lng: null };
      
      document.getElementById('customer-name').value = '';
      document.getElementById('customer-phone').value = '';
      document.getElementById('customer-address').value = '';

      setTimeout(() => {
        closeCartDrawer();
      }, 1500);
    } else {
      const errData = await response.json().catch(() => ({}));
      showCheckoutNotification(errData.error || "Failed to place order. Verify your details.", "error");
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      showCheckoutNotification("Request timed out. Server took too long to respond.", "error");
    } else {
      showCheckoutNotification("Server not connected! Please ensure server is running on port 5000.", "error");
    }
  } finally {
    if (orderBtn) {
      orderBtn.disabled = false;
      orderBtn.innerHTML = originalBtnText;
    }
  }
}

// --- Page Initialization & Live Menu Sync ---
window.addEventListener('DOMContentLoaded', async () => {
  if (document.getElementById('menu-grid')) {
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      if (res.ok) {
        const dbItems = await res.json();
        if (Array.isArray(dbItems) && dbItems.length > 0) {
          activeMenuItems = [...dbItems, ...menuItems];
        }
      }
    } catch (e) {
      console.log('Backend offline, defaulting to static local catalog.');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
      filterByCategory(catParam);
    } else {
      filterByCategory('ALL');
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});