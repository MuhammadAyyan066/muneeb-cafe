const API_URL = 'https://muneeb-fast-food.vercel.app';
const API_BASE_URL = `${API_URL}/api/products`;

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
    // Live backend URL variable use karein:
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