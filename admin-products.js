const API_URL = 'https://muneeb-fast-food.vercel.app';

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

async function handleSaveProduct(e) {
  e.preventDefault();

  const category = document.getElementById('prod-category').value.trim();
  const isPizza = category.toLowerCase().includes('pizza');

  const smallPrice = Number(document.getElementById('price-small')?.value) || 0;
  const mediumPrice = Number(document.getElementById('price-medium')?.value) || 0;
  const largePrice = Number(document.getElementById('price-large')?.value) || 0;
  const familyPrice = Number(document.getElementById('price-family')?.value) || 0;

  const payload = {
    name: document.getElementById('prod-name').value.trim(),
    category: category,
    description: document.getElementById('prod-desc')?.value.trim() || '',
    image: document.getElementById('prod-image')?.value.trim() || '',
    hasSizes: isPizza,
    sizes: [],
    prices: {},
    price: 0
  };

  if (isPizza) {
    // Array format
    payload.sizes = [
      { size: 'Small', price: smallPrice },
      { size: 'Medium', price: mediumPrice },
      { size: 'Large', price: largePrice },
      { size: 'Family', price: familyPrice }
    ];
    // Object format (backup compatibility)
    payload.prices = {
      small: smallPrice,
      medium: mediumPrice,
      large: largePrice,
      family: familyPrice
    };
    payload.price = smallPrice; // Fallback for simple price views
  } else {
    payload.price = Number(document.getElementById('prod-price')?.value) || 0;
  }

  try {
    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Product created successfully with all size variants!');
      const form = document.querySelector('form');
      if (form) form.reset();
      toggleSizeFields();
      if (typeof loadAdminProducts === 'function') loadAdminProducts();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(`Error: ${err.error || 'Failed to save product'}`);
    }
  } catch (error) {
    console.error('Save product error:', error);
    alert('Server connection failed. Please check network.');
  }
}

// Table cell representation for rates
function renderPriceCell(product) {
  if (product.hasSizes && product.sizes?.length) {
    return product.sizes
      .filter(s => Number(s.price) > 0)
      .map(s => `<span class="inline-block bg-neutral-800 text-[11px] px-2 py-0.5 rounded mr-1 font-mono text-yellow-400 font-bold">${s.size[0]}: Rs.${s.price}</span>`)
      .join('');
  }
  return `Rs. ${product.price || 0}`;
}