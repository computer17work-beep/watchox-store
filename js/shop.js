// ============ SHOP PAGE ============

document.addEventListener('DOMContentLoaded', function() {
    const params = getUrlParams();
    const category = params.category || '';
    const search = params.search || '';

    renderShopPage(category, search);
});

function renderShopPage(category, search) {
    const container = document.getElementById('shopContainer');
    if (!container) return;

    let products = [...PRODUCTS];

    // Filter by category
    if (category) {
        const catMap = {
            'men': 'Men',
            'women': 'Women',
            'luxury': 'Luxury',
            'casual': 'Casual',
            'smart': 'Smart'
        };
        const catName = catMap[category] || category;
        products = products.filter(p => p.category.toLowerCase().includes(catName.toLowerCase()));
    }

    // Filter by search
    if (search) {
        const query = search.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    container.innerHTML = `
        <div style="display:grid;grid-template-columns:280px 1fr;gap:30px;">
            <!-- Filters -->
            <div style="position:sticky;top:100px;height:fit-content;">
                <h3 style="margin-bottom:16px;">Filters</h3>
                <div style="background:var(--offwhite);border-radius:16px;padding:20px;">
                    <!-- Categories -->
                    <div style="margin-bottom:20px;">
                        <h4>Categories</h4>
                        ${CATEGORIES.map(cat => `
                            <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
                                <input type="checkbox" id="cat_${cat.id}" ${category === cat.id ? 'checked' : ''} onchange="filterProducts()">
                                <label for="cat_${cat.id}">${cat.name}</label>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Price Range -->
                    <div style="margin-bottom:20px;">
                        <h4>Price Range</h4>
                        <div style="display:flex;gap:8px;">
                            <input type="number" placeholder="Min" id="priceMin" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;">
                            <input type="number" placeholder="Max" id="priceMax" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;">
                        </div>
                        <button onclick="filterProducts()" style="width:100%;padding:8px;background:var(--black);color:#fff;border-radius:30px;margin-top:8px;">Apply Price</button>
                    </div>

                    <!-- Rating -->
                    <div style="margin-bottom:20px;">
                        <h4>Rating</h4>
                        ${[4,3,2,1].map(r => `
                            <div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
                                <input type="radio" name="rating" value="${r}" onchange="filterProducts()">
                                <label>${r}+ ★</label>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Availability -->
                    <div>
                        <h4>Availability</h4>
                        <div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
                            <input type="checkbox" id="inStock" onchange="filterProducts()">
                            <label for="inStock">In Stock</label>
                        </div>
                    </div>

                    <button onclick="clearFilters()" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:30px;margin-top:16px;">Clear All Filters</button>
                </div>
            </div>

            <!-- Products -->
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px;">
                    <h2>${products.length} Products Found</h2>
                    <select id="sortSelect" onchange="sortProducts()" style="padding:10px 16px;border:1px solid var(--border);border-radius:30px;">
                        <option value="popular">Popularity</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                        <option value="discount">Discount</option>
                    </select>
                </div>
                <div class="products-grid" id="shopProductsGrid">
                    ${renderProductCards(products)}
                </div>
            </div>
        </div>
    `;

    // Store products for filtering
    window.shopProducts = products;
}

function filterProducts() {
    let products = [...PRODUCTS];

    // Category filters
    const checkedCategories = CATEGORIES.filter(cat => {
        const checkbox = document.getElementById(`cat_${cat.id}`);
        return checkbox && checkbox.checked;
    }).map(cat => cat.name.toLowerCase().replace("'s", ""));

    if (checkedCategories.length > 0) {
        products = products.filter(p =>
            checkedCategories.some(cat => p.category.toLowerCase().includes(cat))
        );
    }

    // Price range
    const priceMin = parseFloat(document.getElementById('priceMin')?.value);
    const priceMax = parseFloat(document.getElementById('priceMax')?.value);
    if (priceMin) products = products.filter(p => p.price >= priceMin);
    if (priceMax) products = products.filter(p => p.price <= priceMax);

    // Rating
    const ratingRadio = document.querySelector('input[name="rating"]:checked');
    if (ratingRadio) {
        const rating = parseFloat(ratingRadio.value);
        products = products.filter(p => p.rating >= rating);
    }

    // In stock
    const inStockCheck = document.getElementById('inStock');
    if (inStockCheck && inStockCheck.checked) {
        products = products.filter(p => p.stock > 0);
    }

    // Update grid
    const grid = document.getElementById('shopProductsGrid');
    if (grid) {
        grid.innerHTML = renderProductCards(products);
        document.querySelector('#shopContainer h2').textContent = `${products.length} Products Found`;
    }

    window.shopProducts = products;
}

function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    let products = [...window.shopProducts];

    switch (sortBy) {
        case 'popular':
            products.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'newest':
            products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            products.sort((a, b) => b.rating - a.rating);
            break;
        case 'discount':
            products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
            break;
    }

    const grid = document.getElementById('shopProductsGrid');
    if (grid) {
        grid.innerHTML = renderProductCards(products);
    }
}

function clearFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    filterProducts();
}

// ============ ADD TO RECENTLY VIEWED ============

function addToRecentlyViewed(productId) {
    let recent = getFromStorage('recently_viewed', []);
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);
    if (recent.length > 10) recent = recent.slice(0, 10);
    saveToStorage('recently_viewed', recent);
}