const API_URL = 'https://muneeb-cafe-backend.vercel.app';
const API_BASE_URL = `${API_URL}/api/products`;

// 1. Submit Function (Bilkul Theek Hai)
async function handleProductSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const category = document.getElementById('product-category').value;
  const description = document.getElementById('product-desc').value.trim();
  const image = document.getElementById('product-image').value.trim();

  const isPizza = category.toLowerCase().includes('pizza');

  const payload = {
    name,
    category,
    description,
    image,
    hasSizes: isPizza,
    price: 0,
    prices: {}
  };

  if (isPizza) {
    payload.prices = {
      small: Number(document.getElementById('price-small').value) || 0,
      medium: Number(document.getElementById('price-medium').value) || 0,
      large: Number(document.getElementById('price-large').value) || 0,
      family: Number(document.getElementById('price-family').value) || 0
    };
  } else {
    payload.price = Number(document.getElementById('product-single-price').value) || 0;
  }

  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save product');
    }

    alert('Product saved with multi-size pricing!');
    document.getElementById('product-form').reset();
    if (typeof loadAdminProducts === 'function') loadAdminProducts();
  } catch (err) {
    alert(`Save Error: ${err.message}`);
  }
}

// 2. Load Inventory Function (Yeh Fix Karein)
async function loadAdminProducts() {
  const container = document.getElementById('inventory-list'); // ya jo bhi aapka container ID hai
  const countBadge = document.querySelector('.bg-yellow-400\\/10 span') || document.getElementById('product-count');

  try {
    // Menu route se items fetch karein
    const res = await fetch(`${API_URL}/api/menu`);
    if (!res.ok) throw new Error('Network response was not ok');

    const products = await res.json();

    if (countBadge) {
      countBadge.innerText = `${products.length} Items`;
    }

    // Yahan inventory render ka logic
    if (container) {
      if (products.length === 0) {
        container.innerHTML = '<p class="text-neutral-500 text-xs text-center py-4">No items found.</p>';
        return;
      }

      container.innerHTML = products.map(item => `
        <div class="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs mb-2">
          <div>
            <p class="font-bold text-white">${item.name}</p>
            <p class="text-neutral-400">${item.category} • ${item.hasSizes ? 'Multi-size' : 'Rs. ' + item.price}</p>
          </div>
          <button onclick="deleteProduct('${item._id}')" class="text-red-400 hover:text-red-300 font-bold px-2 py-1">Delete</button>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error("Inventory loading error:", err);
    const errorElem = document.getElementById('inventory-error') || document.querySelector('.text-red-400');
    if (errorElem) {
      errorElem.innerText = 'Failed to load items. Verify backend is running.';
      errorElem.classList.remove('hidden');
    }
  }
}