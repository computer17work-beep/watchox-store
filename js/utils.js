// ============ UTILITY FUNCTIONS ============

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format Currency
function formatCurrency(amount) {
    return '৳' + amount.toFixed(0);
}

// Generate Order ID
function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return 'ORD-' + timestamp + '-' + random;
}

// Get URL Parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local Storage Helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem('watchox_' + key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Storage error:', e);
        return false;
    }
}

function getFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem('watchox_' + key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Storage error:', e);
        return defaultValue;
    }
}

// Update Cart Badge
function updateCartBadge() {
    const cart = getFromStorage('cart', []);
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// Update Wishlist Badge
function updateWishlistBadge() {
    const wishlist = getFromStorage('wishlist', []);
    const count = wishlist.length;
    const badge = document.getElementById('wishlistCount');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// Share Product
function shareProduct(product) {
    const url = window.location.origin + '/product.html?id=' + product.id;
    const text = `Check out ${product.name} on WATCHOX!`;
    if (navigator.share) {
        navigator.share({ title: product.name, text: text, url: url });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!', 'success');
        });
    }
}