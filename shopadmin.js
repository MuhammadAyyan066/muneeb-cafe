const API_URL = "https://muneeb-cafe-backend.vercel.app";
const API_BASE_URL = `${API_URL}/api/orders`;

let cachedOrders = [];
let currentFilter = 'All';

document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
    setInterval(loadOrders, 6000); // Poll every 6 seconds

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeReceiptModal();
    });
});

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}

function setFilter(status) {
    currentFilter = status;
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.className = "filter-tab px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/50";
    });

    const activeBtn = document.getElementById(`tab-${status}`);
    if (activeBtn) {
        activeBtn.className = "filter-tab px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 bg-yellow-400 text-neutral-950 shadow-sm";
    }

    renderOrders();
}

function renderStatusBadge(status) {
    const clean = (status || 'Pending').toLowerCase().trim();
    if (clean === 'pending') {
        return `<span class="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Pending</span>`;
    } else if (clean === 'processing') {
        return `<span class="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Processing</span>`;
    } else if (clean === 'in delivery' || clean === 'delivering' || clean === 'out for delivery') {
        return `<span class="bg-sky-500/15 text-sky-400 border border-sky-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Out for Delivery</span>`;
    } else if (clean === 'done' || clean === 'completed') {
        return `<span class="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Done</span>`;
    } else {
        return `<span class="bg-neutral-800 text-neutral-300 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">${status}</span>`;
    }
}

function updateCounts() {
    const counts = {
        all: cachedOrders.length,
        pending: 0,
        processing: 0,
        delivery: 0,
        done: 0
    };

    cachedOrders.forEach(order => {
        const s = (order.status || 'Pending').toLowerCase().trim();
        if (s === 'pending') counts.pending++;
        else if (s === 'processing') counts.processing++;
        else if (s === 'in delivery' || s === 'delivering' || s === 'out for delivery') counts.delivery++;
        else if (s === 'done' || s === 'completed') counts.done++;
    });

    document.getElementById('order-count-badge').innerText = counts.all;
    document.getElementById('badge-all').innerText = counts.all;
    document.getElementById('badge-pending').innerText = counts.pending;
    document.getElementById('badge-processing').innerText = counts.processing;
    document.getElementById('badge-delivery').innerText = counts.delivery;
    document.getElementById('badge-done').innerText = counts.done;
}

function openReceiptModal(imageUrl) {
    const modal = document.getElementById('receipt-modal');
    const img = document.getElementById('receipt-modal-img');
    const link = document.getElementById('receipt-download-link');
    
    img.src = imageUrl;
    link.href = imageUrl;
    modal.classList.remove('hidden');
}

function closeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    modal.classList.add('hidden');
    document.getElementById('receipt-modal-img').src = '';
}

// Customer Direct WhatsApp
function shareToWhatsApp(orderStr) {
    const order = JSON.parse(decodeURIComponent(orderStr));
    const phoneVal = order.customerPhone || order.phone || 'N/A';
    const addressVal = order.deliveryAddress || order.address || 'Address Not Provided';
    const paymentType = order.paymentMethod || 'Cash on Delivery';
    
    const itemsList = Array.isArray(order.items) && order.items.length > 0
        ? order.items.map(i => `• ${i.name} x${i.quantity} (Rs. ${(i.price || 0) * (i.quantity || 1)})`).join('\n')
        : 'No item data available';

    const message = 
`*Muneeb Cafe - Order Details*
------------------------------------
*Customer:* ${order.customerName || 'Customer'}
*Phone:* ${phoneVal}
*Address:* ${addressVal}
*Payment:* ${paymentType}
------------------------------------
*Items:*
${itemsList}
------------------------------------
*Total Amount:* Rs. ${order.totalAmount}/-
*Current Status:* ${order.status}
------------------------------------`;

    let cleanPhone = phoneVal.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
        cleanPhone = '92' + cleanPhone.substring(1);
    }

    const targetUrl = cleanPhone.length >= 10
        ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    
    window.open(targetUrl, '_blank');
}

// Rider Dispatch WhatsApp (With exact Google Navigation Link & Payment Notice)
function shareToRider(orderStr) {
    const order = JSON.parse(decodeURIComponent(orderStr));
    const phoneVal = order.customerPhone || order.phone || 'N/A';
    const addressVal = order.deliveryAddress || order.address || 'Fatehpur';
    const isOnlinePaid = order.paymentMethod === 'Online Bank Transfer';

    let navigationUrl = '';
    if (order.locationCoords && order.locationCoords.lat && order.locationCoords.lng) {
        navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${order.locationCoords.lat},${order.locationCoords.lng}`;
    } else {
        navigationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressVal + ', Fatehpur')}`;
    }

    const itemsList = Array.isArray(order.items) && order.items.length > 0
        ? order.items.map(i => `• ${i.name} x${i.quantity}`).join('\n')
        : 'No items listed';

    const cashInstruction = isOnlinePaid 
        ? `✅ *PAID ONLINE (Bank Transfer)* - Do NOT collect cash` 
        : `💰 *Cash to Collect:* Rs. ${order.totalAmount}/-`;

    const riderMessage = 
`🛵 *MUNEEB CAFE - DELIVERY ORDER*
------------------------------------
👤 *Customer:* ${order.customerName || 'Customer'}
📞 *Phone:* ${phoneVal}
🏠 *Address:* ${addressVal}

📦 *Items to Deliver:*
${itemsList}

💳 *Payment:* ${cashInstruction}

📍 *Open Turn-by-Turn GPS Navigation:*
${navigationUrl}`;

    const riderWhatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(riderMessage)}`;
    window.open(riderWhatsappUrl, '_blank');
}

async function loadOrders() {
    const statusIndicator = document.getElementById('connection-status');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`Server returned error: ${res.status}`);
        
        cachedOrders = await res.json();
        if (statusIndicator) {
            statusIndicator.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> Live Online`;
        }
        updateCounts();
        renderOrders();
    } catch (err) {
        clearTimeout(timeoutId);
        console.error("Order loading failed:", err);
        if (statusIndicator) {
            statusIndicator.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-500"></span> Offline`;
        }
        const container = document.getElementById('orders-list');
        if (container) {
            container.innerHTML = `
                <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-center space-y-2">
                    <p class="text-sm font-semibold text-red-400">Unable to load orders from backend server.</p>
                    <p class="text-xs text-neutral-400">Target URL: ${API_BASE_URL}</p>
                </div>`;
        }
    }
}

function renderOrders() {
    const container = document.getElementById('orders-list');
    if (!container) return;

    container.innerHTML = '';

    let filtered = cachedOrders;
    if (currentFilter !== 'All') {
        filtered = cachedOrders.filter(order => {
            const s = (order.status || 'Pending').toLowerCase().trim();
            if (currentFilter === 'Pending') return s === 'pending';
            if (currentFilter === 'Processing') return s === 'processing';
            if (currentFilter === 'In Delivery') return s === 'in delivery' || s === 'delivering' || s === 'out for delivery';
            if (currentFilter === 'Done') return s === 'done' || s === 'completed';
            return true;
        });
    }

    if (!filtered || filtered.length === 0) {
        container.innerHTML = `<p class="text-neutral-500 text-sm text-center py-10">No orders found in "${currentFilter}".</p>`;
        return;
    }

    filtered.forEach(order => {
        const encodedOrder = encodeURIComponent(JSON.stringify(order));
        const phoneVal = order.phone || order.customerPhone || 'N/A';
        const addressVal = order.address || 
                           order.deliveryAddress || 
                           (order.locationCoords?.lat ? `Lat: ${order.locationCoords.lat}, Lng: ${order.locationCoords.lng}` : 'No Delivery Address Specified');

        const currentStatus = (order.status || 'Pending').toLowerCase().trim();
        const isPending = currentStatus === 'pending';
        const isProcessing = currentStatus === 'processing';
        const isInDelivery = currentStatus === 'in delivery' || currentStatus === 'delivering' || currentStatus === 'out for delivery';
        const isDone = currentStatus === 'done' || currentStatus === 'completed';

        const isOnlineTransfer = order.paymentMethod === 'Online Bank Transfer';
        const paymentBadge = isOnlineTransfer 
            ? `<span class="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><i data-lucide="credit-card" class="w-3 h-3"></i> Bank Transfer</span>`
            : `<span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><i data-lucide="banknote" class="w-3 h-3"></i> Cash on Delivery</span>`;

        let receiptUrl = order.paymentReceipt || null;
        if (receiptUrl && !receiptUrl.startsWith('http')) {
            receiptUrl = `${API_URL}${receiptUrl}`;
        }

        const receiptHtml = receiptUrl ? `
            <div class="bg-neutral-900/90 p-3 rounded-xl border border-yellow-400/20 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span class="text-xs font-semibold text-neutral-300">Bank Transfer Screenshot:</span>
                </div>
                <button onclick="openReceiptModal('${receiptUrl}')" class="bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 hover:text-yellow-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                    <i data-lucide="image" class="w-3.5 h-3.5"></i> View Receipt
                </button>
            </div>
        ` : (isOnlineTransfer ? `
            <div class="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30 text-xs text-amber-400 font-medium">
                ⚠️ Bank Transfer selected, but no receipt image was found.
            </div>
        ` : '');

        const mapUrl = (order.locationCoords?.lat && order.locationCoords?.lng)
            ? `https://www.google.com/maps?q=${order.locationCoords.lat},${order.locationCoords.lng}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressVal)}`;

        const card = document.createElement('div');
        card.className = "bg-neutral-800/80 p-5 rounded-2xl border border-neutral-700/80 space-y-4 hover:border-yellow-400/30 transition shadow-md";
        
        card.innerHTML = `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-700/60 pb-3">
                <div>
                    <div class="flex flex-wrap items-center gap-2.5">
                        <h4 class="font-extrabold text-base text-white">${order.customerName || 'Customer'}</h4>
                        ${paymentBadge}
                        <a href="tel:${phoneVal}" class="text-xs text-yellow-400 hover:underline flex items-center gap-1 font-semibold">
                            <i data-lucide="phone" class="w-3 h-3"></i> ${phoneVal}
                        </a>
                    </div>
                    <p class="text-[11px] text-neutral-400 mt-1">
                        Placed: ${order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Recent'}
                    </p>
                </div>
                <div>
                    ${renderStatusBadge(order.status)}
                </div>
            </div>

            <div class="bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-700/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div class="space-y-0.5">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Delivery Address</span>
                    <p class="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">${addressVal}</p>
                </div>
                <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="shrink-0 bg-neutral-800 hover:bg-neutral-700 text-yellow-400 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-yellow-400/20">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-orange-500"></i> Open Maps
                </a>
            </div>

            ${receiptHtml}

            <div class="space-y-1.5">
                <span class="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Order Items</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${Array.isArray(order.items) && order.items.length > 0 ? order.items.map(item => `
                        <div class="flex justify-between items-center bg-neutral-900/50 px-3 py-1.5 rounded-lg text-xs border border-neutral-700/40">
                            <span class="text-neutral-300 font-medium">${item.name} <strong class="text-yellow-400">×${item.quantity}</strong></span>
                            <span class="text-neutral-400">Rs. ${(item.price || 0) * (item.quantity || 1)}</span>
                        </div>
                    `).join('') : '<p class="text-xs text-neutral-500">No items listed</p>'}
                </div>
            </div>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-neutral-700/60">
                <div>
                    <span class="text-xs text-neutral-400 font-medium">Total Bill:</span>
                    <span class="text-base font-black text-yellow-400 ml-1">Rs. ${order.totalAmount}/-</span>
                </div>

                <div class="flex flex-wrap items-center gap-2">
                    <button onclick="updateStatus('${order._id}', 'Pending')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${isPending ? 'bg-amber-500 text-neutral-950 font-black' : 'bg-neutral-900 text-amber-400 hover:bg-neutral-700 border border-amber-500/30'}">
                        Pending
                    </button>

                    <button onclick="updateStatus('${order._id}', 'Processing')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${isProcessing ? 'bg-purple-600 text-white font-black' : 'bg-neutral-900 text-purple-400 hover:bg-neutral-700 border border-purple-500/30'}">
                        Processing
                    </button>

                    <button onclick="updateStatus('${order._id}', 'Out for Delivery')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${isInDelivery ? 'bg-sky-500 text-white font-black' : 'bg-neutral-900 text-sky-400 hover:bg-neutral-700 border border-sky-500/30'}">
                        In Delivery
                    </button>

                    <button onclick="updateStatus('${order._id}', 'Done')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${isDone ? 'bg-emerald-500 text-white font-black' : 'bg-neutral-900 text-emerald-400 hover:bg-neutral-700 border border-emerald-500/30'}">
                        Done
                    </button>

                    ${isDone ? `
                        <button onclick="deleteOrder('${order._id}')" class="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Remove
                        </button>
                    ` : ''}

                    <!-- Customer WhatsApp Button -->
                    <button onclick="shareToWhatsApp('${encodedOrder}')" title="Chat with Customer" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ml-auto sm:ml-2 shadow-sm">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> WhatsApp
                    </button>

                    <!-- Rider Dispatch Button (With GPS Navigation) -->
                    <button onclick="shareToRider('${encodedOrder}')" title="Send GPS Location & Task to Rider" class="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm">
                        <i data-lucide="navigation" class="w-3.5 h-3.5"></i> Rider (Maps)
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if (window.lucide) {
        lucide.createIcons();
    }
}

async function updateStatus(id, status) {
    try {
        let res = await fetch(`${API_BASE_URL}/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });

        if (res.ok) {
            await loadOrders();
        } else {
            const errData = await res.json().catch(() => ({}));
            alert(errData.error || "Failed to update order status");
        }
    } catch (err) {
        alert("Network error: Could not reach backend server.");
    }
}

async function deleteOrder(id) {
    const confirmed = confirm("Are you sure you want to remove this completed order from the active dashboard?");
    if (!confirmed) return;

    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            cachedOrders = cachedOrders.filter(o => o._id !== id);
            updateCounts();
            renderOrders();
        } else {
            const errData = await res.json().catch(() => ({}));
            alert(errData.error || "Failed to delete order");
        }
    } catch (err) {
        alert("Network error: Could not reach backend server to delete order.");
    }
}