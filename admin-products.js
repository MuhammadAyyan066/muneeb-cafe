const API_URL = 'https://muneeb-cafe-backend.vercel.app';

// ==========================================
// 1. DYNAMIC SIZE FIELDS TOGGLE
// ==========================================
function toggleSizeFields() {
  const categoryEl = document.getElementById('prod-category');
  if (!categoryEl) return;

  const category = categoryEl.value.toLowerCase().trim();
  const isPizza = category.includes('pizza');

  const multiGroup = document.getElementById('multi-size-group');
  const singleGroup = document.getElementById('single-price-group');

  if (multiGroup) multiGroup.classList.toggle('hidden', !isPizza);
  if (singleGroup) singleGroup.classList.toggle('hidden', isPizza);
}

// ==========================================
// 2. HELPER: CONVERT LOCAL FILE TO BASE64
// ==========================================
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// ==========================================
// 3. CREATE & SAVE PRODUCT
// ==========================================
async function handleSaveProduct(e) {
  if (e) e.preventDefault();

  const nameEl = document.getElementById('prod-name');
  const catEl = document.getElementById('prod-category');
  if (!nameEl || !catEl) return;

  const name = nameEl.value.trim();
  const category = catEl.value.trim();
  const isPizza = category.toLowerCase().includes('pizza');

  if (!name || !category) {
    alert('Item Name aur Category likhna zaroori hai!');
    return;
  }

  // Handle Image (Priority: Local Upload -> URL Input -> Fallback)
  let image = document.getElementById('prod-image')?.value.trim() || '';
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput && fileInput.files && fileInput.files[0]) {
    try {
      image = await fileToBase64(fileInput.files[0]);
    } catch (fileErr) {
      console.warn("File reading failed, continuing with URL:", fileErr);
    }
  }
  if (!image) {
    image = isPizza ? 'images/pizza pic.jpg' : 'images/burgers.jpg';
  }

  const smallPrice = Number(document.getElementById('price-small')?.value) || 0;
  const mediumPrice = Number(document.getElementById('price-medium')?.value) || 0;
  const largePrice = Number(document.getElementById('price-large')?.value) || 0;
  const familyPrice = Number(document.getElementById('price-family')?.value) || 0;

  const payload = {
    name: name,
    category: category,
    tag: document.getElementById('prod-tag')?.value.trim() || (isPizza ? 'Special' : 'Fast Food'),
    desc: document.getElementById('prod-desc')?.value.trim() || '',
    description: document.getElementById('prod-desc')?.value.trim() || '',
    image: image,
    hasSizes: isPizza,
    sizes: [],
    prices: {},
    price: 0
  };

  if (isPizza) {
    payload.sizes = [
      { size: 'Small', price: smallPrice },
      { size: 'Medium', price: mediumPrice },
      { size: 'Large', price: largePrice },
      { size: 'Family', price: familyPrice }
    ];
    payload.prices = {
      small: smallPrice,
      medium: mediumPrice,
      large: largePrice,
      family: familyPrice
    };
    payload.price = smallPrice;
  } else {
    payload.price = Number(document.getElementById('prod-price')?.value) || 0;
  }

  const saveBtn = document.querySelector('button[type="submit"]') || document.querySelector('button[onclick*="handleSaveProduct"]');
  const originalText = saveBtn ? saveBtn.innerText : 'Save to Database';

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerText = 'Saving to Database...';
  }

  try {
    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Bypass-Tunnel-Reminder': 'true'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Product database mein successfully add ho gaya!');
      const form = document.querySelector('form');
      if (form) form.reset();
      toggleSizeFields();
      await loadAdminProducts();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(`Error: ${err.error || err.message || 'Product save nahi ho saka'}`);
    }
  } catch (error) {
    console.error('Save product error:', error);
    alert('Server connection fail ho gaya. Vercel backend status check karein.');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerText = originalText;
    }
  }
}

// ==========================================
// 4. PRICE BADGES RENDERER
// ==========================================
function renderPriceCell(product) {
  if (product.hasSizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
    return product.sizes
      .filter(s => Number(s.price) > 0)
      .map(s => `<span class="inline-block bg-neutral-800 text-[11px] px-2 py-0.5 rounded mr-1 font-mono text-yellow-400 font-bold">${s.size[0]}: Rs.${s.price}</span>`)
      .join('');
  }
  return `<span class="text-yellow-400 font-bold font-mono">Rs. ${product.price || 0}</span>`;
}

// ==========================================
// 5. LOAD INVENTORY PRODUCTS
// ==========================================
async function loadAdminProducts() {
  const container = document.getElementById('inventory-list') || 
                    document.getElementById('products-table-body') || 
                    document.querySelector('.menu-inventory-container');
                    
  const countBadge = document.querySelector('.menu-inventory-count') || 
                      document.getElementById('item-count') ||
                      document.querySelector('div.bg-neutral-900 div span');

  try {
    const res = await fetch(`${API_URL}/api/menu`, {
      headers: {
        'Accept': 'application/json',
        'Bypass-Tunnel-Reminder': 'true'
      }
    });
    
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const items = await res.json();

    if (countBadge) {
      countBadge.innerText = `${items.length} Items`;
    }

    if (!container) return;

    if (!Array.isArray(items) || items.length === 0) {
      container.innerHTML = `<p class="text-neutral-500 text-xs text-center py-6">Abhi database mein koi item nahi hai.</p>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="flex items-center justify-between p-3 bg-neutral-900/90 rounded-2xl border border-neutral-800 text-xs my-2">
        <div class="flex items-center gap-3">
          <img src="${item.image || 'images/pizza pic.jpg'}" class="w-10 h-10 rounded-xl object-cover" onerror="this.src='images/pizza pic.jpg'">
          <div>
            <h4 class="font-bold text-white text-sm">${item.name}</h4>
            <span class="text-[10px] text-neutral-400 uppercase font-semibold">${item.category || 'General'}</span>
            <div class="mt-1">${renderPriceCell(item)}</div>
          </div>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error("Load items error:", err);
    if (container) {
      container.innerHTML = `<p class="text-red-400 text-xs text-center py-4">Failed to load items. Verify backend is running.</p>`;
    }
  }
}

// ==========================================
// 6. INITIALIZATION & LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const catSelect = document.getElementById('prod-category');
  if (catSelect) {
    catSelect.addEventListener('change', toggleSizeFields);
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleSaveProduct);
  }

  toggleSizeFields();
  loadAdminProducts();
});