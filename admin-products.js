function toggleSizeFields() {
  const category = document.getElementById('prod-category').value;
  const isPizza = category === 'Pizzas' || category === 'Muneeb Special Pizzas';

  document.getElementById('multi-size-group').classList.toggle('hidden', !isPizza);
  document.getElementById('single-price-group').classList.toggle('hidden', isPizza);
}

async function handleSaveProduct(e) {
  e.preventDefault();

  const category = document.getElementById('prod-category').value;
  const isPizza = category === 'Pizzas' || category === 'Muneeb Special Pizzas';

  const payload = {
    name: document.getElementById('prod-name').value.trim(),
    category: category,
    description: document.getElementById('prod-desc').value.trim(),
    image: document.getElementById('prod-image').value.trim(),
    hasSizes: isPizza,
    sizes: [],
    price: 0
  };

  if (isPizza) {
    payload.sizes = [
      { size: 'Small', price: Number(document.getElementById('price-small').value) || 0 },
      { size: 'Medium', price: Number(document.getElementById('price-medium').value) || 0 },
      { size: 'Large', price: Number(document.getElementById('price-large').value) || 0 },
      { size: 'Family', price: Number(document.getElementById('price-family').value) || 0 }
    ];
  } else {
    payload.price = Number(document.getElementById('prod-price').value) || 0;
  }

  const res = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert('Product created successfully');
    loadAdminProducts();
  }
}

// Table cell representation for rates
function renderPriceCell(product) {
  if (product.hasSizes && product.sizes?.length) {
    return product.sizes
      .map(s => `<span class="inline-block bg-neutral-800 text-[11px] px-1.5 py-0.5 rounded mr-1 font-mono">${s.size[0]}: ${s.price}</span>`)
      .join('');
  }
  return `Rs. ${product.price}`;
}