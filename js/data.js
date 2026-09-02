// ============ PRODUCT DATA ============
const PRODUCTS = [
    {
        id: 'watch-001',
        name: 'Lunar Chronograph',
        brand: 'WATCHOX',
        sku: 'WX-LC-001',
        price: 450,
        oldPrice: 580,
        rating: 4.8,
        reviews: 127,
        description: 'A masterpiece of precision engineering. The Lunar Chronograph features a sleek black dial with silver sub-dials, powered by a Swiss-made automatic movement.',
        specifications: {
            'Movement': 'Automatic',
            'Case Material': 'Stainless Steel',
            'Dial': 'Black with Silver Sub-dials',
            'Strap': 'Genuine Leather',
            'Water Resistance': '50m',
            'Warranty': '2 Years'
        },
        category: 'Men',
        subcategory: 'Luxury',
        tags: ['luxury', 'automatic', 'leather'],
        stock: 15,
        images: [
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600',
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600'
        ],
        badge: 'Best Seller',
        isNew: false,
        discount: 22,
        variants: ['Black Leather', 'Brown Leather', 'Steel Bracelet'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '2 years international warranty'
    },
    {
        id: 'watch-002',
        name: 'Aura Rose Gold',
        brand: 'WATCHOX',
        sku: 'WX-AR-002',
        price: 620,
        oldPrice: 790,
        rating: 4.9,
        reviews: 89,
        description: 'Elegance meets innovation. The Aura Rose Gold features a stunning rose gold case with a mother-of-pearl dial, complemented by a diamond-set bezel.',
        specifications: {
            'Movement': 'Quartz',
            'Case Material': 'Rose Gold Plated',
            'Dial': 'Mother of Pearl',
            'Strap': 'Rose Gold Bracelet',
            'Water Resistance': '30m',
            'Warranty': '2 Years'
        },
        category: 'Women',
        subcategory: 'Luxury',
        tags: ['luxury', 'rose gold', 'diamond'],
        stock: 8,
        images: [
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600',
            'https://images.unsplash.com/photo-1526045478516-991459070e5b?w=600'
        ],
        badge: 'Premium',
        isNew: true,
        discount: 22,
        variants: ['Rose Gold', 'Yellow Gold', 'White Gold'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '2 years international warranty'
    },
    {
        id: 'watch-003',
        name: 'Titanium Slim',
        brand: 'WATCHOX',
        sku: 'WX-TS-003',
        price: 320,
        oldPrice: 400,
        rating: 4.6,
        reviews: 203,
        description: 'Ultra-thin and lightweight. The Titanium Slim is crafted from aerospace-grade titanium, making it one of the most comfortable watches you\'ll ever wear.',
        specifications: {
            'Movement': 'Quartz',
            'Case Material': 'Titanium',
            'Dial': 'White',
            'Strap': 'Titanium Bracelet',
            'Water Resistance': '30m',
            'Warranty': '2 Years'
        },
        category: 'Men',
        subcategory: 'Casual',
        tags: ['casual', 'titanium', 'slim'],
        stock: 25,
        images: [
            'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600',
            'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600'
        ],
        badge: 'Sale',
        isNew: false,
        discount: 20,
        variants: ['Titanium', 'Black Titanium'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '2 years international warranty'
    },
    {
        id: 'watch-004',
        name: 'Celestial Smart',
        brand: 'WATCHOX',
        sku: 'WX-CS-004',
        price: 280,
        oldPrice: 350,
        rating: 4.7,
        reviews: 312,
        description: 'The future of timekeeping. The Celestial Smart features a vibrant AMOLED display, heart rate monitor, GPS, and up to 7 days of battery life.',
        specifications: {
            'Movement': 'Digital',
            'Case Material': 'Aluminum',
            'Display': 'AMOLED 1.4"',
            'Strap': 'Silicone',
            'Water Resistance': '50m',
            'Warranty': '1 Year'
        },
        category: 'Smart',
        subcategory: 'Smart Watches',
        tags: ['smart', 'fitness', 'digital'],
        stock: 40,
        images: [
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600',
            'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600'
        ],
        badge: 'Smart',
        isNew: true,
        discount: 20,
        variants: ['Black', 'Silver', 'Space Gray'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '1 year warranty'
    },
    {
        id: 'watch-005',
        name: 'Heritage Automatic',
        brand: 'WATCHOX',
        sku: 'WX-HA-005',
        price: 750,
        oldPrice: 920,
        rating: 4.9,
        reviews: 156,
        description: 'A tribute to classic watchmaking. The Heritage Automatic features a hand-finished mechanical movement visible through the exhibition case back.',
        specifications: {
            'Movement': 'Mechanical',
            'Case Material': 'Stainless Steel',
            'Dial': 'Silver Sunburst',
            'Strap': 'Crocodile Leather',
            'Water Resistance': '100m',
            'Warranty': '3 Years'
        },
        category: 'Luxury',
        subcategory: 'Luxury Watches',
        tags: ['luxury', 'mechanical', 'heritage'],
        stock: 6,
        images: [
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600',
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600'
        ],
        badge: 'Luxury',
        isNew: false,
        discount: 18,
        variants: ['Brown Leather', 'Black Leather'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '3 years international warranty'
    },
    {
        id: 'watch-006',
        name: 'Sport Chrono',
        brand: 'WATCHOX',
        sku: 'WX-SC-006',
        price: 390,
        oldPrice: 470,
        rating: 4.5,
        reviews: 278,
        description: 'Built for performance. The Sport Chrono features a tachymeter bezel, chronograph function, and a durable silicone strap for active lifestyles.',
        specifications: {
            'Movement': 'Quartz',
            'Case Material': 'Stainless Steel',
            'Dial': 'Black with Chronograph',
            'Strap': 'Silicone',
            'Water Resistance': '100m',
            'Warranty': '2 Years'
        },
        category: 'Men',
        subcategory: 'Casual',
        tags: ['sport', 'chronograph', 'active'],
        stock: 30,
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600',
            'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600'
        ],
        badge: 'Trending',
        isNew: true,
        discount: 17,
        variants: ['Black Silicone', 'Blue Silicone'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '2 years warranty'
    },
    {
        id: 'watch-007',
        name: 'Elegance Diamond',
        brand: 'WATCHOX',
        sku: 'WX-ED-007',
        price: 890,
        oldPrice: 1050,
        rating: 4.9,
        reviews: 94,
        description: 'The pinnacle of luxury. The Elegance Diamond features 48 natural diamonds set on a white gold case, with a matching diamond-paved dial.',
        specifications: {
            'Movement': 'Quartz',
            'Case Material': 'White Gold',
            'Dial': 'Diamond Paved',
            'Strap': 'White Gold Bracelet',
            'Water Resistance': '30m',
            'Warranty': '3 Years'
        },
        category: 'Women',
        subcategory: 'Luxury',
        tags: ['luxury', 'diamond', 'gold'],
        stock: 4,
        images: [
            'https://images.unsplash.com/photo-1526045478516-991459070e5b?w=600',
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600'
        ],
        badge: 'Premium',
        isNew: true,
        discount: 15,
        variants: ['White Gold', 'Rose Gold'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '3 years international warranty'
    },
    {
        id: 'watch-008',
        name: 'Minimalist White',
        brand: 'WATCHOX',
        sku: 'WX-MW-008',
        price: 210,
        oldPrice: 260,
        rating: 4.3,
        reviews: 345,
        description: 'Less is more. The Minimalist White features a clean white dial, slim case, and a comfortable mesh bracelet for everyday elegance.',
        specifications: {
            'Movement': 'Quartz',
            'Case Material': 'Stainless Steel',
            'Dial': 'White',
            'Strap': 'Mesh Bracelet',
            'Water Resistance': '30m',
            'Warranty': '1 Year'
        },
        category: 'Unisex',
        subcategory: 'Casual',
        tags: ['minimalist', 'casual', 'mesh'],
        stock: 50,
        images: [
            'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600',
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600'
        ],
        badge: 'New',
        isNew: true,
        discount: 19,
        variants: ['White', 'Black', 'Rose Gold'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '1 year warranty'
    },
    {
        id: 'watch-009',
        name: 'Classic Pilot',
        brand: 'WATCHOX',
        sku: 'WX-CP-009',
        price: 580,
        oldPrice: 680,
        rating: 4.7,
        reviews: 112,
        description: 'Inspired by aviation. The Classic Pilot features a large crown, luminous hands, and a rugged stainless steel case with a leather strap.',
        specifications: {
            'Movement': 'Automatic',
            'Case Material': 'Stainless Steel',
            'Dial': 'Black with Luminous Markers',
            'Strap': 'Leather',
            'Water Resistance': '100m',
            'Warranty': '2 Years'
        },
        category: 'Men',
        subcategory: 'Luxury',
        tags: ['pilot', 'automatic', 'aviation'],
        stock: 12,
        images: [
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600',
            'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600'
        ],
        badge: 'Best Seller',
        isNew: false,
        discount: 15,
        variants: ['Brown Leather', 'Black Leather'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '2 years warranty'
    },
    {
        id: 'watch-010',
        name: 'Diva Crystal',
        brand: 'WATCHOX',
        sku: 'WX-DC-010',
        price: 510,
        oldPrice: 630,
        rating: 4.8,
        reviews: 76,
        description: 'Sparkle with every movement. The Diva Crystal features a crystal-encrusted dial and a sleek stainless steel case with a matching bracelet.',
        specifications: {
            'Movement': 'Quartz',
            'Case Material': 'Stainless Steel',
            'Dial': 'Crystal Paved',
            'Strap': 'Stainless Steel Bracelet',
            'Water Resistance': '30m',
            'Warranty': '2 Years'
        },
        category: 'Women',
        subcategory: 'Luxury',
        tags: ['luxury', 'crystal', 'sparkle'],
        stock: 7,
        images: [
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600',
            'https://images.unsplash.com/photo-1526045478516-991459070e5b?w=600'
        ],
        badge: 'Premium',
        isNew: true,
        discount: 19,
        variants: ['Silver', 'Rose Gold'],
        deliveryInfo: 'Free delivery within 3-5 business days',
        returnPolicy: '7-day return policy',
        warranty: '2 years warranty'
    }
];

// ============ CATEGORIES ============
const CATEGORIES = [
    { id: 'men', name: "Men's Watches", icon: 'fa-clock', count: 0 },
    { id: 'women', name: "Women's Watches", icon: 'fa-clock', count: 0 },
    { id: 'luxury', name: 'Luxury Watches', icon: 'fa-crown', count: 0 },
    { id: 'casual', name: 'Casual Watches', icon: 'fa-clock', count: 0 },
    { id: 'couple', name: 'Couple Watches', icon: 'fa-heart', count: 0 },
    { id: 'smart', name: 'Smart Watches', icon: 'fa-microchip', count: 0 },
    { id: 'accessories', name: 'Accessories', icon: 'fa-gem', count: 0 }
];

// ============ COUPONS ============
const COUPONS = [
    { code: 'WATCH10', type: 'percentage', value: 10, minOrder: 300, expiry: '2026-12-31', usageLimit: 100, used: 0 },
    { code: 'SAVE20', type: 'percentage', value: 20, minOrder: 500, expiry: '2026-12-31', usageLimit: 50, used: 0 },
    { code: 'FREESHIP', type: 'free_shipping', value: 0, minOrder: 200, expiry: '2026-12-31', usageLimit: 200, used: 0 },
    { code: 'WELCOME', type: 'fixed', value: 50, minOrder: 200, expiry: '2026-12-31', usageLimit: 100, used: 0 }
];

// ============ COMBO DEALS ============
const COMBOS = [
    {
        id: 'combo-001',
        name: 'Premium Watch Combo',
        description: 'Complete your look with this premium combo',
        products: ['watch-001', 'watch-003'],
        comboPrice: 650,
        savings: 120,
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600'
    },
    {
        id: 'combo-002',
        name: 'Smart Lifestyle Bundle',
        description: 'Everything you need for a smart lifestyle',
        products: ['watch-004', 'watch-008'],
        comboPrice: 420,
        savings: 70,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600'
    }
];

// ============ DEMO ORDERS ============
const DEMO_ORDERS = [
    {
        id: 'ORD-2026-001',
        customer: 'John Doe',
        phone: '01700-111111',
        total: 450,
        status: 'Delivered',
        payment: 'Cash on Delivery',
        date: '2026-01-15',
        items: [{ id: 'watch-001', name: 'Lunar Chronograph', qty: 1, price: 450 }],
        tracking: [
            { status: 'Order Placed', date: '2026-01-15', time: '10:30 AM' },
            { status: 'Confirmed', date: '2026-01-15', time: '11:00 AM' },
            { status: 'Processing', date: '2026-01-15', time: '02:00 PM' },
            { status: 'Packed', date: '2026-01-16', time: '09:00 AM' },
            { status: 'Shipped', date: '2026-01-16', time: '03:00 PM' },
            { status: 'Out for Delivery', date: '2026-01-17', time: '08:00 AM' },
            { status: 'Delivered', date: '2026-01-17', time: '02:30 PM' }
        ]
    },
    {
        id: 'ORD-2026-002',
        customer: 'Jane Smith',
        phone: '01700-222222',
        total: 620,
        status: 'Shipped',
        payment: 'bKash',
        date: '2026-01-18',
        items: [{ id: 'watch-002', name: 'Aura Rose Gold', qty: 1, price: 620 }],
        tracking: [
            { status: 'Order Placed', date: '2026-01-18', time: '09:00 AM' },
            { status: 'Confirmed', date: '2026-01-18', time: '09:30 AM' },
            { status: 'Processing', date: '2026-01-18', time: '12:00 PM' },
            { status: 'Packed', date: '2026-01-18', time: '04:00 PM' },
            { status: 'Shipped', date: '2026-01-19', time: '10:00 AM' }
        ]
    }
];

// ============ HELPERS ============
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

function getProductsByIds(ids) {
    return ids.map(id => getProductById(id)).filter(Boolean);
}

function getProductsByCategory(category) {
    return PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getFeaturedProducts(limit = 8) {
    return PRODUCTS.filter(p => p.badge).slice(0, limit);
}

function getNewArrivals(limit = 4) {
    return PRODUCTS.filter(p => p.isNew).slice(0, limit);
}

function getFlashSaleProducts(limit = 4) {
    return PRODUCTS.filter(p => p.discount >= 20).slice(0, limit);
}

function getOfferProducts(limit = 4) {
    return PRODUCTS.filter(p => p.discount >= 15).slice(0, limit);
}