// ============ CART FUNCTIONS ============

function addToCart(productId) {
    let cart = getFromStorage('cart', []);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    saveToStorage('cart', cart);
    updateCartBadge();
    showToast('Added to cart!', 'success');

    // Track product view
    addToRecentlyViewed(productId);
}

function removeFromCart(productId) {
    let cart = getFromStorage('cart', []);
    cart = cart.filter(item => item.id !== productId);
    saveToStorage('cart', cart);
    updateCartBadge();
    showToast('Removed from cart', 'info');
    renderCartPage();
}

function updateCartQuantity(productId, change) {
    let cart = getFromStorage('cart', []);
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty = Math.max(1, (item.qty || 1) + change);
    if (item.qty === 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveToStorage('cart', cart);
    updateCartBadge();
    renderCartPage();
}

function getCartTotal() {
    const cart = getFromStorage('cart', []);
    let subtotal = 0;
    let items = [];

    cart.forEach(cartItem => {
        const product = getProductById(cartItem.id);
        if (product) {
            const qty = cartItem.qty || 1;
            subtotal += product.price * qty;
            items.push({ ...product, qty });
        }
    });

    return { subtotal, items, count: cart.length };
}

function applyCoupon(code) {
    const coupon = COUPONS.find(c => c.code === code);
    if (!coupon) {
        showToast('Invalid coupon code', 'error');
        return null;
    }

    // Check expiry
    if (new Date(coupon.expiry) < new Date()) {
        showToast('Coupon has expired', 'error');
        return null;
    }

    // Check usage
    if (coupon.used >= coupon.usageLimit) {
        showToast('Coupon usage limit reached', 'error');
        return null;
    }

    // Check min order
    const { subtotal } = getCartTotal();
    if (subtotal < coupon.minOrder) {
        showToast(`Minimum order ৳${coupon.minOrder} required`, 'error');
        return null;
    }

    showToast('Coupon applied successfully!', 'success');
    return coupon;
}

function renderCartPage() {
    const container = document.getElementById('cartContainer');
    if (!container) return;

    const { subtotal, items, count } = getCartTotal();

    if (count === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 0;">
                <i class="fas fa-shopping-bag" style="font-size:4rem;color:var(--gray);margin-bottom:20px;"></i>
                <h2>Your cart is empty</h2>
                <p style="color:var(--gray);">Start shopping to add items</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top:20px;">Continue Shopping</a>
            </div>
        `;
        return;
    }

    let html = `
        <div style="display:grid;grid-template-columns:1fr 380px;gap:30px;">
            <div>
                <h2 style="margin-bottom:20px;">Shopping Cart (${count} items)</h2>
    `;

    items.forEach(item => {
        html += `
            <div style="display:flex;gap:16px;padding:16px;border-bottom:1px solid var(--lightgray);">
                <img src="${item.images[0] || 'https://placecats.com/100/100'}" style="width:80px;height:80px;border-radius:8px;object-fit:cover;">
                <div style="flex:1;">
                    <h4>${item.name}</h4>
                    <div style="color:var(--gray);font-size:0.85rem;">${item.brand}</div>
                    <div style="margin-top:8px;">
                        <span class="product-price">${formatCurrency(item.price)}</span>
                        ${item.oldPrice ? `<span class="product-old-price">${formatCurrency(item.oldPrice)}</span>` : ''}
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
                        <button onclick="updateCartQuantity('${item.id}', -1)" style="background:var(--offwhite);border-radius:50%;width:28px;height:28px;">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQuantity('${item.id}', 1)" style="background:var(--offwhite);border-radius:50%;width:28px;height:28px;">+</button>
                        <button onclick="removeFromCart('${item.id}')" style="color:#e74c3c;font-size:0.85rem;">Remove</button>
                    </div>
                </div>
                <div style="font-weight:700;font-size:1.1rem;">${formatCurrency(item.price * item.qty)}</div>
            </div>
        `;
    });

    html += `
            </div>
            <div>
                <div style="background:var(--offwhite);border-radius:16px;padding:24px;position:sticky;top:100px;">
                    <h3>Order Summary</h3>
                    <div style="margin:16px 0;">
                        <div style="display:flex;justify-content:space-between;margin:8px 0;">
                            <span>Subtotal</span>
                            <span>${formatCurrency(subtotal)}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin:8px 0;">
                            <span>Delivery</span>
                            <span>${subtotal >= 500 ? 'Free' : formatCurrency(60)}</span>
                        </div>
                    </div>
                    <div style="border-top:2px solid var(--border);padding-top:16px;">
                        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.2rem;">
                            <span>Total</span>
                            <span>${formatCurrency(subtotal + (subtotal >= 500 ? 0 : 60))}</span>
                        </div>
                    </div>
                    <div style="margin-top:16px;">
                        <div style="display:flex;gap:8px;">
                            <input type="text" id="couponInput" placeholder="Coupon Code" style="flex:1;padding:10px 16px;border:1px solid var(--border);border-radius:30px;">
                            <button onclick="applyCouponUI()" class="btn btn-primary" style="padding:10px 20px;">Apply</button>
                        </div>
                        <div id="couponMessage" style="font-size:0.85rem;margin-top:8px;"></div>
                    </div>
                    <a href="checkout.html" class="btn btn-primary" style="width:100%;text-align:center;margin-top:16px;">Proceed to Checkout</a>
                    <a href="shop.html" style="display:block;text-align:center;margin-top:12px;color:var(--gray);">Continue Shopping</a>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function applyCouponUI() {
    const input = document.getElementById('couponInput');
    const message = document.getElementById('couponMessage');
    const code = input.value.trim().toUpperCase();

    const coupon = applyCoupon(code);
    if (coupon) {
        message.style.color = '#27ae60';
        message.textContent = `Coupon ${code} applied! You saved ${coupon.type === 'percentage' ? coupon.value + '%' : '৳' + coupon.value}`;
        // In real implementation, recalculate total
    } else {
        message.style.color = '#e74c3c';
        message.textContent = 'Invalid or expired coupon';
    }
}

// ============ FREE DELIVERY PROGRESS ============

function getDeliveryProgress() {
    const { subtotal } = getCartTotal();
    const threshold = 500;
    const progress = Math.min((subtotal / threshold) * 100, 100);
    const remaining = Math.max(threshold - subtotal, 0);

    return { progress, remaining, threshold };
}

function renderDeliveryProgress() {
    const container = document.getElementById('deliveryProgress');
    if (!container) return;

    const { progress, remaining, threshold } = getDeliveryProgress();

    container.innerHTML = `
        <div style="margin:12px 0;">
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
                <span>${remaining > 0 ? `Add ${formatCurrency(remaining)} more to unlock Free Delivery` : '🎉 Free Delivery Unlocked!'}</span>
                <span>${progress.toFixed(0)}%</span>
            </div>
            <div style="background:var(--lightgray);border-radius:30px;height:6px;overflow:hidden;margin-top:4px;">
                <div style="background:var(--black);height:100%;width:${progress}%;transition:width 0.3s;"></div>
            </div>
        </div>
    `;
}