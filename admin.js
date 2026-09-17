const API_URL = 'https://muneeb-cafe-backend.vercel.app';
const MENU_ENDPOINT = `${API_URL}/api/menu`;

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

function openAddModal() {
  const modal = document.getElementById('add-modal');
  if (modal) {
    modal.classList.remove('hidden');
    toggleCategoryPricing();
  }
}

function closeAddModal() {
  const modal = document.getElementById('add-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleCategoryPricing() {
  const catInput = document.getElementById('product-category');
  if (!catInput) return;
  const category = catInput.value;
  const isPizza = category.toLowerCase().includes('pizza');
  const sizesBox = document.getElementById('pizza-sizes-box');
  const singlePriceBox = document.getElementById('single-price-box');

  if (sizesBox) sizesBox.classList.toggle('hidden', !isPizza);
  if (singlePriceBox) singlePriceBox.classList.toggle('hidden', isPizza);
}

async function loadAdminProducts() {
  const tbody = document.getElementById('admin-menu-table');
  const totalCount = document.getElementById('total-items-count');
  const catCount = document.getElementById('total-categories-count');
  const statusEl = document.getElementById('server-status');

  try {
    const res = await fetch(MENU_ENDPOINT);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const products = await res.json();
    console.log("Loaded products from DB:", products);

    if (totalCount) totalCount.innerText = products.length;
    if (catCount) {
      const uniqueCategories = new Set(products.map(p => p.category || 'General'));
      catCount.innerText = `${uniqueCategories.size} Categories`;
    }

    if (statusEl) {
      statusEl.innerHTML = `<span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Connected`;
    }

    if (!tbody) return;

    if (!Array.isArray(products) || products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-neutral-500 text-xs">No items currently stored in MongoDB. Click "+ Add New Item" to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = products.map(item => {
      let priceDisplay = '';
      if (Array.isArray(item.sizes) && item.sizes.length > 0) {
        priceDisplay = item.sizes.map(s => `${s.size}: Rs.${s.price}`).join(' | ');
      } else {
        priceDisplay = `Rs. ${item.price || 0}/-`;
      }

      const img = item.image || 'images/pizza pic.jpg';

      return `
        <tr class="hover:bg-neutral-800/50 transition border-b border-yellow-400/5">
          <td class="py-3 px-4 font-bold text-yellow-400 flex items-center gap-3">
            <img src="${img}" class="w-9 h-9 rounded-lg object-cover border border-yellow-400/10" onerror="this.src='images/pizza pic.jpg'">
            <div>
              <p>${item.name || 'Untitled'}</p>
              <p class="text-[10px] text-neutral-500 font-normal line-clamp-1">${item.desc || item.description || ''}</p>
            </div>
          </td>
          <td class="py-3 px-4 text-neutral-300 text-xs">${item.category || 'Deals'}</td>
          <td class="py-3 px-4 font-semibold text-brand-500 text-xs">${priceDisplay}</td>
          <td class="py-3 px-4"><span class="bg-neutral-800 px-2.5 py-1 rounded-full text-[11px] text-yellow-400">${item.category || 'Item'}</span></td>
          <td class="py-3 px-4 text-right">
            <button onclick="deleteProduct('${item._id}')" class="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-950/30 transition cursor-pointer" title="Delete">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();

  } catch (err) {
    console.error("Inventory loading error:", err);
    if (statusEl) {
      statusEl.innerHTML = `<span class="w-3 h-3 rounded-full bg-red-500"></span> Disconnected`;
    }
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-red-400 text-xs">Failed to load database items: ${err.message}</td></tr>`;
    }
  }
}

async function handleProductSubmit(e) {
  e.preventDefault();
  const saveBtn = document.getElementById('save-product-btn');
  const originalText = saveBtn ? saveBtn.innerText : "Save Item";
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerText = "Saving...";
  }

  const name = document.getElementById('product-name').value.trim();
  const category = document.getElementById('product-category').value;
  const description = document.getElementById('product-desc').value.trim();
  const image = document.getElementById('product-image').value.trim();
  const isPizza = category.toLowerCase().includes('pizza');

  const payload = {
    name,
    category,
    description,
    desc: description,
    image,
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
    const res = await fetch(MENU_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to save product');

    showBanner('Product successfully saved to MongoDB!');
    document.getElementById('product-form').reset();
    closeAddModal();
    loadAdminProducts();
  } catch (err) {
    showBanner(`Save Error: ${err.message}`, false);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerText = originalText;
    }
  }
}

async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this item?")) return;
  try {
    const res = await fetch(`${MENU_ENDPOINT}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Could not delete from backend");
    showBanner("Item deleted successfully!");
    loadAdminProducts();
  } catch (err) {
    showBanner(`Delete Error: ${err.message}`, false);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadAdminProducts();
  if (window.lucide) lucide.createIcons();
});
