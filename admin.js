const API_URL = 'https://muneeb-cafe-backend.vercel.app';
const MENU_ENDPOINT = `${API_URL}/api/menu`;

let allProducts = [];

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
}

function openModal(item = null) {
  const modal = document.getElementById('product-modal');
  const form = document.getElementById('product-form');
  const title = document.getElementById('modal-title');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('product-id').value = '';

  if (item) {
    // EDIT MODE
    title.innerText = "Edit Menu Item";
    document.getElementById('product-id').value = item._id;
    document.getElementById('product-name').value = item.name || '';
    document.getElementById('product-category').value = item.category || 'Pizzas';
    document.getElementById('product-desc').value = item.desc || item.description || '';
    document.getElementById('product-image').value = item.image || 'images/pizza pic.jpg';

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
    // ADD MODE
    title.innerText = "Add New Menu Item";
    document.getElementById('product-image').value = 'images/pizza pic.jpg';
  }

  toggleCategoryPricing();
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleCategoryPricing() {
  const catInput = document.getElementById('product-category');
  if (!catInput) return;
  const isPizza = catInput.value.toLowerCase().includes('pizza');
  document.getElementById('pizza-sizes-box').classList.toggle('hidden', !isPizza);
  document.getElementById('single-price-box').classList.toggle('hidden', isPizza);
}

async function loadAdminProducts() {
  const tbody = document.getElementById('admin-menu-table');
  const totalCount = document.getElementById('total-items-count');
  const catCount = document.getElementById('total-categories-count');
  const statusEl = document.getElementById('server-status');

  try {
    const res = await fetch(MENU_ENDPOINT);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    allProducts = await res.json();

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

    tbody.innerHTML = allProducts.map((item, idx) => {
      let pricing = '';
      if (item.hasSizes && Array.isArray(item.sizes) && item.sizes.length > 0) {
        pricing = item.sizes.map(s => `${s.size[0]}: Rs.${s.price}`).join(' | ');
      } else {
        pricing = `Rs. ${item.price || 0}/-`;
      }

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
            <button onclick="editProductByIndex(${idx})" class="text-yellow-400 hover:text-yellow-300 p-1.5 rounded-lg hover:bg-yellow-400/10 transition" title="Edit Item">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteProduct('${item._id}')" class="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-950/30 transition" title="Delete">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  } catch (err) {
    if (statusEl) statusEl.innerHTML = `<span class="w-3 h-3 rounded-full bg-red-500"></span> Disconnected`;
    if (tbody) tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-red-400 text-xs">Failed to load database: ${err.message}</td></tr>`;
  }
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
  saveBtn.innerText = "Updating Database...";

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
    loadAdminProducts();
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
    loadAdminProducts();
  } catch (err) {
    showBanner(`Delete Error: ${err.message}`, false);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadAdminProducts();
  if (window.lucide) lucide.createIcons();
});
