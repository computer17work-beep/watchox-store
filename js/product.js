// ============ PRODUCT PAGE ============

document.addEventListener('DOMContentLoaded', function() {
    const params = getUrlParams();
    const productId = params.id;

    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    renderProductPage(product);
    addToRecentlyViewed(productId);

    // Related products
    renderRelatedProducts(product);

    // Recently viewed
    renderProductRecentlyViewed();
});

function renderProductPage(product) {
    // Update SEO
    document.title = `${product.name} | WATCHOX`;
    document.querySelector('meta[name="description"]').content = product.description;

    const container = document.getElementById('productContainer');
    if (!container) return;

    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    container.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
            <!-- Image Gallery -->
            <div>
                <div class="product-main-image" style="background-image:url('${product.images[0] || 'https://placecats.com/600/600'}');height:400px;border-radius:16px;background-size:cover;background-position:center;position:relative;">
                    ${discount > 0 ? `<span style="position:absolute;top:20px;right:20px;background:#e74c3c;color:#fff;padding:8px 16px;border-radius:30px;font-weight:700;">${discount}% OFF</span>` : ''}
                </div>
                <div style="display:flex;gap:12px;margin-top:12px;">
                    ${product.images.map(img => `
                        <div style="width:80px;height:80px;border-radius:8px;background-image:url('${img}');background-size:cover;background-position:center;cursor:pointer;border:2px solid transparent;" onclick="changeMainImage('${img}')"></div>
                    `).join('')}
                </div>
            </div>

            <!-- Product Info -->
            <div>
                <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px;">
                    <span style="background:var(--offwhite);padding:4px 12px;border-radius:30px;font-size:0.75rem;">${product.brand}</span>
                    <span style="color:var(--gray);font-size:0.75rem;">SKU: ${product.sku}</span>
                </div>
                <h1 style="font-size:2rem;margin-bottom:8px;">${product.name}</h1>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <div style="color:#f5a623;">${getStarRating(product.rating)}</div>
                    <span style="color:var(--gray);font-size:0.85rem;">${product.reviews} reviews</span>
                </div>
                <div style="margin-bottom:16px;">
                    <span style="font-size:2rem;font-weight:700;">${formatCurrency(product.price)}</span>
                    ${product.oldPrice ? `<span style="font-size:1.2rem;color:var(--gray);text-decoration:line-through;margin-left:12px;">${formatCurrency(product.oldPrice)}</span>` : ''}
                </div>
                <div style="margin-bottom:16px;">
                    <span class="product-stock ${product.stock <= 0 ? 'out-of-stock' : ''}">
                        ${product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
                    </span>
                </div>

                <!-- Variants -->
                ${product.variants ? `
                    <div style="margin-bottom:16px;">
                        <h4>Variants</h4>
                        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                            ${product.variants.map(v => `
                                <button style="padding:8px 16px;border:1px solid var(--border);border-radius:30px;background:var(--white);transition:var(--transition);" onclick="selectVariant(this)">${v}</button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Quantity & Actions -->
                <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
                    <div style="display:flex;align-items:center;border:1px solid var(--border);border-radius:30px;">
                        <button onclick="updateQty(-1)" style="padding:10px 16px;">-</button>
                        <span id="qtyDisplay" style="padding:0 16px;min-width:40px;text-align:center;">1</span>
                        <button onclick="updateQty(1)" style="padding:10px 16px;">+</button>
                    </div>
                    <button onclick="addToCartFromProduct()" class="btn btn-primary" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button onclick="buyNow()" class="btn btn-outline" ${product.stock <= 0 ? 'disabled' : ''}>
                        Buy Now
                    </button>
                    <button onclick="toggleWishlist('${product.id}')" style="border:1px solid var(--border);border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;">
                        <i class="far fa-heart"></i>
                    </button>
                    <button onclick="shareProduct(getProductById('${product.id}'))" style="border:1px solid var(--border);border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>

                <!-- Delivery Info -->
                <div style="background:var(--offwhite);border-radius:12px;padding:16px;margin-bottom:16px;">
                    <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;">
                        <span><i class="fas fa-truck"></i> ${product.deliveryInfo || 'Free delivery'}</span>
                        <span><i class="fas fa-undo"></i> ${product.returnPolicy || '7-day returns'}</span>
                        <span><i class="fas fa-shield-alt"></i> ${product.warranty || '2-year warranty'}</span>
                    </div>
                </div>

                <!-- Description -->
                <div style="margin-bottom:16px;">
                    <h4>Description</h4>
                    <p style="color:var(--gray);line-height:1.8;">${product.description}</p>
                </div>

                <!-- Specifications -->
                ${product.specifications ? `
                    <div>
                        <h4>Specifications</h4>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">
                            ${Object.entries(product.specifications).map(([key, value]) => `
                                <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--lightgray);">
                                    <span style="color:var(--gray);">${key}</span>
                                    <span style="font-weight:500;">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>

        <!-- Reviews Section -->
        <div style="margin-top:60px;">
            <h2 style="margin-bottom:20px;">Customer Reviews</h2>
            <div id="reviewsContainer">
                ${renderReviews(product)}
            </div>
        </div>

        <!-- Related Products -->
        <div style="margin-top:60px;">
            <h2 style="margin-bottom:20px;">Related Products</h2>
            <div class="products-grid" id="relatedProductsGrid"></div>
        </div>

        <!-- Recently Viewed -->
        <div style="margin-top:40px;">
            <h2 style="margin-bottom:20px;">Recently Viewed</h2>
            <div class="products-grid" id="productRecentlyViewedGrid"></div>
        </div>
    `;

    // Store product ID for add to cart
    window.currentProduct = product;
    window.currentQty = 1;
}

// ============ PRODUCT INTERACTIONS ============

let currentQty = 1;

function updateQty(change) {
    currentQty = Math.max(1, currentQty + change);
    document.getElementById('qtyDisplay').textContent = currentQty;
}

function addToCartFromProduct() {
    const product = window.currentProduct;
    if (!product) return;
    // Add with quantity
    let cart = getFromStorage('cart', []);
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty = (existing.qty || 1) + currentQty;
    } else {
        cart.push({ id: product.id, qty: currentQty });
    }
    saveToStorage('cart', cart);
    updateCartBadge();
    showToast(`Added ${currentQty} × ${product.name} to cart`, 'success');
}

function buyNow() {
    addToCartFromProduct();
    window.location.href = 'checkout.html';
}

function selectVariant(element) {
    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.style.borderColor = 'var(--border)';
        btn.style.background = 'var(--white)';
    });
    element.style.borderColor = 'var(--black)';
    element.style.background = 'var(--offwhite)';
}

function changeMainImage(src) {
    document.querySelector('.product-main-image').style.backgroundImage = `url('${src}')`;
}

// ============ REVIEWS ============

function renderReviews(product) {
    // Generate mock reviews
    const mockReviews = [
        { name: 'Rahul Ahmed', rating: 5, text: 'Absolutely stunning watch! The craftsmanship is impeccable.', date: '2026-01-10', verified: true },
        { name: 'Sadia Rahman', rating: 4, text: 'Beautiful design and very comfortable. Slightly heavy but worth it.', date: '2026-01-05', verified: true },
        { name: 'Kamal Hasan', rating: 5, text: 'Best watch I\'ve ever owned. Gets compliments everywhere.', date: '2025-12-28', verified: false },
    ];

    // Calculate rating breakdown
    const breakdown = { 5: 60, 4: 25, 3: 10, 2: 3, 1: 2 };

    return `
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:30px;">
            <div>
                <div style="text-align:center;padding:20px;background:var(--offwhite);border-radius:16px;">
                    <div style="font-size:3rem;font-weight:700;">${product.rating.toFixed(1)}</div>
                    <div style="color:#f5a623;font-size:1.2rem;">${getStarRating(product.rating)}</div>
                    <div style="color:var(--gray);">${product.reviews} reviews</div>
                </div>
                <div style="margin-top:16px;">
                    ${Object.entries(breakdown).reverse().map(([stars, percentage]) => `
                        <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
                            <span>${stars} ★</span>
                            <div style="flex:1;background:var(--lightgray);border-radius:30px;height:6px;">
                                <div style="background:var(--black);height:100%;width:${percentage}%;border-radius:30px;"></div>
                            </div>
                            <span>${percentage}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div>
                <div style="display:flex;gap:12px;margin-bottom:16px;">
                    <button class="btn btn-primary" style="padding:8px 20px;">Write a Review</button>
                    <select style="padding:8px 16px;border:1px solid var(--border);border-radius:30px;">
                        <option>Newest</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                    </select>
                </div>
                ${mockReviews.map(review => `
                    <div style="padding:16px;border-bottom:1px solid var(--lightgray);">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <strong>${review.name}</strong>
                                ${review.verified ? '<span style="background:#27ae60;color:#fff;padding:2px 8px;border-radius:30px;font-size:0.6rem;margin-left:8px;">✓ Verified</span>' : ''}
                            </div>
                            <div style="color:#f5a623;">${getStarRating(review.rating)}</div>
                        </div>
                        <p style="color:var(--gray);margin:8px 0;">${review.text}</p>
                        <div style="color:var(--gray);font-size:0.75rem;">${review.date}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============ RELATED PRODUCTS ============

function renderRelatedProducts(product) {
    const grid = document.getElementById('relatedProductsGrid');
    if (!grid) return;

    const related = PRODUCTS
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    if (related.length === 0) {
        grid.innerHTML = '<p style="color:var(--gray);">No related products found</p>';
        return;
    }

    grid.innerHTML = renderProductCards(related);
}

function renderProductRecentlyViewed() {
    const grid = document.getElementById('productRecentlyViewedGrid');
    if (!grid) return;

    const recentIds = getFromStorage('recently_viewed', []);
    const products = recentIds.map(id => getProductById(id)).filter(Boolean).slice(0, 4);

    if (products.length === 0) {
        grid.innerHTML = '<p style="color:var(--gray);">No recently viewed products</p>';
        return;
    }

    grid.innerHTML = renderProductCards(products);
}