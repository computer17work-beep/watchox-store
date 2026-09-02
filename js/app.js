// ============ MAIN APPLICATION ============

document.addEventListener('DOMContentLoaded', function() {
    // Update badges
    updateCartBadge();
    updateWishlistBadge();

    // Render categories
    renderCategories();

    // Render products
    renderBestSelling();
    renderFlashSale();
    renderNewArrivals();
    renderOffers();
    renderRecentlyViewed();

    // Initialize flash timer
    initFlashTimer();
});

// ============ RENDER FUNCTIONS ============

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    const categories = CATEGORIES.map(cat => {
        const count = PRODUCTS.filter(p => p.category.toLowerCase() === cat.name.toLowerCase().replace("'s", "")).length;
        return { ...cat, count };
    });

    grid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="window.location.href='shop.html?category=${cat.id}'">
            <i class="fas ${cat.icon}"></i>
            <h4>${cat.name}</h4>
            <p style="font-size:0.75rem;color:var(--gray);">${cat.count} Products</p>
        </div>
    `).join('');
}

function renderBestSelling() {
    const grid = document.getElementById('bestSellingGrid');
    if (!grid) return;
    const products = getFeaturedProducts(4);
    grid.innerHTML = renderProductCards(products);
}

function renderFlashSale() {
    const grid = document.getElementById('flashGrid');
    if (!grid) return;
    const products = getFlashSaleProducts(4);
    grid.innerHTML = renderProductCards(products);
}

function renderNewArrivals() {
    const grid = document.getElementById('newArrivalsGrid');
    if (!grid) return;
    const products = getNewArrivals(4);
    grid.innerHTML = renderProductCards(products);
}

function renderOffers() {
    const grid = document.getElementById('offerGrid');
    if (!grid) return;
    const products = getOfferProducts(4);
    grid.innerHTML = renderProductCards(products);
}

function renderRecentlyViewed() {
    const grid = document.getElementById('recentlyViewedGrid');
    if (!grid) return;
    const recentIds = getFromStorage('recently_viewed', []);
    const products = recentIds.map(id => getProductById(id)).filter(Boolean);
    if (products.length === 0) {
        grid.innerHTML = '<p style="color:var(--gray);">No products viewed yet. Start exploring!</p>';
        return;
    }
    grid.innerHTML = renderProductCards(products.slice(0, 4));
}

function renderProductCards(products) {
    if (!products || products.length === 0) {
        return '<p style="color:var(--gray);">No products available</p>';
    }

    return products.map(product => {
        const inWishlist = getFromStorage('wishlist', []).includes(product.id);
        const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-img" style="background-image: url('${product.images[0] || 'https://placecats.com/300/300'}');">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <button class="product-wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">
                        <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    ${getStarRating(product.rating)} (${product.reviews})
                </div>
                <div>
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    ${product.oldPrice ? `<span class="product-old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
                    ${discount > 0 ? `<span style="color:#e74c3c;font-size:0.75rem;margin-left:8px;">-${discount}%</span>` : ''}
                </div>
                <div class="product-stock ${product.stock <= 0 ? 'out-of-stock' : ''}">
                    ${product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart('${product.id}')" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                    <button class="btn-quick-view" onclick="quickView('${product.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    while (stars.length < 15) stars += '<i class="far fa-star"></i>';
    return stars + ' ' + rating.toFixed(1);
}

// ============ FLASH TIMER ============

function initFlashTimer() {
    let seconds = 30,
        minutes = 45,
        hours = 2;
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ============ SEARCH ============

function toggleSearch() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
}

function liveSearch(query) {
    const results = document.getElementById('searchResults');
    if (!query.trim()) {
        results.innerHTML = '';
        return;
    }

    const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        results.innerHTML = '<p style="color:var(--gray);">No products found</p>';
        return;
    }

    results.innerHTML = filtered.slice(0, 6).map(p => `
        <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--lightgray);cursor:pointer;" onclick="window.location.href='product.html?id=${p.id}'">
            <img src="${p.images[0] || 'https://placecats.com/50/50'}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
            <div>
                <div style="font-weight:600;">${p.name}</div>
                <div style="font-size:0.85rem;color:var(--gray);">${formatCurrency(p.price)}</div>
            </div>
        </div>
    `).join('');
}

// ============ MOBILE MENU ============

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

// ============ NEWSLETTER ============

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    if (email) {
        showToast('Subscribed successfully!', 'success');
        event.target.reset();
    }
}

// ============ QUICK VIEW ============

function quickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    // Show quick view modal (simplified - redirect to product page)
    window.location.href = 'product.html?id=' + productId;
}

// ============ KEYBOARD SHORTCUTS ============

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        document.getElementById('mobileMenu')?.classList.remove('open');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});