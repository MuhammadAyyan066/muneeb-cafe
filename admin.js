const API_URL = window.API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : 'https://muneeb-cafe-backend.vercel.app');
const MENU_ENDPOINT = `${API_URL}/api/menu`;

let allProducts = [];

// Safe cache handler to completely prevent QuotaExceededError
function safeCacheMenu(data) {
  try {
    if (!Array.isArray(data)) return;
    const lightweightData = data.map(item => ({
      ...item,
      image: (item.image && item.image.length > 500) ? 'images/pizza pic.jpg' : (item.image || 'images/pizza pic.jpg')
    }));
    localStorage.setItem('muneeb_menu_cache', JSON.stringify(lightweightData));
  } catch (err) {
    console.warn("Storage quota full, resetting cache safely.");
    try {
      localStorage.removeItem('muneeb_menu_cache');
    } catch (e) {}
  }
}

function showBanner(msg, isSuccess = true) {
  const banner = document.getElementById('admin-alert');
  const text = document.getElementById('admin-alert-text');
  if (!banner || !text) return;
  text.innerText = msg;
  text.className = `text-xs font-bold p-3 rounded-xl text-center ${
    isSuccess ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
  }`;
  banner.classList.remove('hidden');
  setTimeout(() => banner.classList.add('hidden'), 4000);
}

function selectImage(path) {
  document.getElementById('product-image').value = path;
  document.getElementById('image-preview').src = path;
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("Image size bohat badi hai (Max 2MB allow hai). Please compress ya choti image upload karein.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Url = e.target.result;
    document.getElementById('product-image').value = base64Url;
    document.getElementById('image-preview').src = base64Url;
    showBanner("Image loaded from device gallery!");
  };
  reader.readAsDataURL(file);
}

function openModal(item = null) {
  const modal = document.getElementById('product-modal');
  const form = document.getElementById('product-form');
  const title = document.getElementById('modal-title');
  const categorySelect = document.getElementById('product-category');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('product-id').value = '';

  if (item) {
    title.innerText = "Edit Menu Item";
    document.getElementById('product-id').value = item._id || item.id || '';
    document.getElementById('product-name').value = item.name || '';
    document.getElementById('product-desc').value = item.desc || item.description || '';
    
    // Fuzzy matching for Category (handles Pratha Roll vs Paratha Roll vs Rolls)
    const rawCategory = (item.category || '').trim();
    if (categorySelect) {
      categorySelect.value = rawCategory;
      if (!categorySelect.value || categorySelect.selectedIndex === -1) {
        const cleanRaw = rawCategory.toLowerCase().replace(/[^a-z]/g, '');
        for (let opt of categorySelect.options) {
          const cleanOpt = opt.value.toLowerCase().replace(/[^a-z]/g, '');
          if (cleanOpt === cleanRaw || cleanOpt.includes(cleanRaw) || cleanRaw.includes(cleanOpt)) {
            categorySelect.value = opt.value;
            break;
          }
        }
      }
      if (!categorySelect.value) categorySelect.value = 'Pizzas';
    }

    const imgSrc = item.image || item.img || 'images/pizza pic.jpg';
    document.getElementById('product-image').value = imgSrc;
    document.getElementById('image-preview').src = imgSrc;

    if (item.hasSizes && Array.isArray(item.sizes)) {
      item.sizes.forEach(s => {
        if (s.size === 'Small') document.getElementById('price-small').value = s.price;
        if (s.size === 'Medium') document.getElementById('price-medium').value = s.price;
        if (s.size === 'Large') document.getElementById('price-large').value = s.price;
        if (s.size === 'Family') document.getElementById('price-family').value = s.price;
      });
    } else {
      document.getElementById('product-single-price').value = item.price || 0;
    }
  } else {
    title.innerText = "Add New Menu Item";
    if (categorySelect) categorySelect.value = 'Pizzas';
    document.getElementById('product-image').value = 'images/pizza pic.jpg';
    document.getElementById('image-preview').src = 'images/pizza pic.jpg';
  }

  toggleCategoryPricing();
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleCategoryPricing() {
  const categoryEl = document.getElementById('product-category');
  const cat = (categoryEl ? categoryEl.value : '').toLowerCase();
  const isPizza = cat.includes('pizza');
  
  const pizzaBox = document.getElementById('pizza-sizes-box');
  const singlePriceBox = document.getElementById('single-price-box');

  if (pizzaBox && singlePriceBox) {
    if (isPizza) {
      pizzaBox.classList.remove('hidden');
      singlePriceBox.classList.add('hidden');
    } else {
      pizzaBox.classList.add('hidden');
      singlePriceBox.classList.remove('hidden');
    }
  }
}

async function loadAdminProducts() {
  const tbody = document.getElementById('admin-menu-table');
  const totalCount = document.getElementById('total-items-count');
  const catCount = document.getElementById('total-categories-count');
  const statusEl = document.getElementById('server-status');

  try {
    const sep = MENU_ENDPOINT.includes('?') ? '&' : '?';
    const res = await fetch(`${MENU_ENDPOINT}${sep}t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    allProducts = await res.json();
    safeCacheMenu(allProducts);

    if (totalCount) totalCount.innerText = allProducts.length;
    if (catCount) {
      const categories = new Set(allProducts.map(p => p.category || 'General'));
      catCount.innerText = `${categories.size} Categories`;
    }
    if (statusEl) statusEl.innerHTML = `<span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Connected`;

    if (!tbody) return;

    if (!Array.isArray(allProducts) || allProducts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-neutral-500 text-xs">No items currently found in MongoDB.</td></tr>`;
      return;
    }

    renderAdminTableRows(allProducts);
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    if (statusEl) statusEl.innerHTML = `<span class="w-3 h-3 rounded-full bg-red-500"></span> Disconnected`;
    if (tbody) tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-red-400 text-xs">Failed to load database: ${err.message}</td></tr>`;
  }
}

function renderAdminTableRows(items) {
  const tbody = document.getElementById('admin-menu-table');
  if (!tbody) return;

  tbody.innerHTML = items.map((item, idx) => {
    let pricing = '';
    if (item.hasSizes && Array.isArray(item.sizes) && item.sizes.length > 0) {
      pricing = item.sizes.map(s => `${s.size[0]}: Rs.${s.price}`).join(' | ');
    } else {
      pricing = `Rs. ${item.price || 0}/-`;
    }

    const itemId = item._id || item.id;

    return `
      <tr class="hover:bg-neutral-800/40 transition border-b border-yellow-400/5">
        <td class="py-3 px-4 flex items-center gap-3">
          <img src="${item.image || 'images/pizza pic.jpg'}" class="w-10 h-10 rounded-lg object-cover border border-yellow-400/10" onerror="this.src='images/pizza pic.jpg'">
          <div>
            <p class="font-bold text-yellow-400 leading-tight">${item.name}</p>
            <p class="text-[11px] text-neutral-500 line-clamp-1">${item.desc || item.description || ''}</p>
          </div>
        </td>
        <td class="py-3 px-4 text-neutral-300 text-xs font-semibold">${item.category || 'Item'}</td>
        <td class="py-3 px-4 text-brand-500 font-bold text-xs">${pricing}</td>
        <td class="py-3 px-4 text-right space-x-2">
          <button onclick="editProductByIndex(${idx})" class="text-yellow-400 hover:text-yellow-300 p-1.5 rounded-lg hover:bg-yellow-400/10 transition cursor-pointer" title="Edit Item">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteProduct('${itemId}')" class="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-950/30 transition cursor-pointer" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function editProductByIndex(index) {
  if (allProducts[index]) {
    openModal(allProducts[index]);
  }
}

async function handleProductSubmit(e) {
  e.preventDefault();
  const saveBtn = document.getElementById('save-product-btn');
  saveBtn.disabled = true;
  saveBtn.innerText = "Saving to MongoDB...";

  const id = document.getElementById('product-id').value;
  const isEdit = Boolean(id);
  const category = document.getElementById('product-category').value;
  const isPizza = category.toLowerCase().includes('pizza');

  const payload = {
    name: document.getElementById('product-name').value.trim(),
    category,
    description: document.getElementById('product-desc').value.trim(),
    desc: document.getElementById('product-desc').value.trim(),
    image: document.getElementById('product-image').value.trim(),
    hasSizes: isPizza
  };

  if (isPizza) {
    payload.sizes = [
      { size: 'Small', price: Number(document.getElementById('price-small').value) || 550 },
      { size: 'Medium', price: Number(document.getElementById('price-medium').value) || 1150 },
      { size: 'Large', price: Number(document.getElementById('price-large').value) || 1600 },
      { size: 'Family', price: Number(document.getElementById('price-family').value) || 1900 }
    ];
  } else {
    payload.price = Number(document.getElementById('product-single-price').value) || 0;
  }

  try {
    const url = isEdit ? `${MENU_ENDPOINT}/${id}` : MENU_ENDPOINT;
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    showBanner(isEdit ? 'Item updated in MongoDB!' : 'New item saved to MongoDB!');
    closeModal();
    await loadAdminProducts();
  } catch (err) {
    showBanner(`Operation Failed: ${err.message}`, false);
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerText = "Save Item";
  }
}

async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this item?")) return;
  try {
    const res = await fetch(`${MENU_ENDPOINT}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Could not delete from backend");
    showBanner("Item deleted successfully!");
    await loadAdminProducts();
  } catch (err) {
    showBanner(`Delete Error: ${err.message}`, false);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadAdminProducts();
  if (window.lucide) lucide.createIcons();
});

// ==============================================================
// INSTANT ZERO-SECOND TABLE SEARCH (DIRECT DOM FILTERING)
// ==============================================================
function searchAdminProducts() {
  const query = (document.getElementById('admin-search-input')?.value || '').toLowerCase().trim();
  const tableBody = document.getElementById('admin-menu-table');
  if (!tableBody) return;

  const rows = tableBody.querySelectorAll('tr');
  let matchCount = 0;

  rows.forEach(row => {
    if (row.children.length < 4) return;

    const itemName = (row.children[0]?.textContent || '').toLowerCase();
    const itemCategory = (row.children[1]?.textContent || '').toLowerCase();
    const itemPrice = (row.children[2]?.textContent || '').toLowerCase();

    const isMatch = !query || itemName.includes(query) || itemCategory.includes(query) || itemPrice.includes(query);

    if (isMatch) {
      row.style.display = '';
      matchCount++;
    } else {
      row.style.display = 'none';
    }
  });

  let emptyNotice = document.getElementById('search-empty-notice');
  if (matchCount === 0 && query !== '') {
    if (!emptyNotice) {
      emptyNotice = document.createElement('tr');
      emptyNotice.id = 'search-empty-notice';
      emptyNotice.innerHTML = `<td colspan="4" class="py-6 text-center text-neutral-400 text-xs font-semibold">No matching items found for "${query}"</td>`;
      tableBody.appendChild(emptyNotice);
    } else {
      emptyNotice.style.display = '';
      emptyNotice.innerHTML = `<td colspan="4" class="py-6 text-center text-neutral-400 text-xs font-semibold">No matching items found for "${query}"</td>`;
    }
  } else if (emptyNotice) {
    emptyNotice.style.display = 'none';
  }
}