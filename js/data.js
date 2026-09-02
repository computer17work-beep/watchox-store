/**
 * WATCHOX - Centralized Store Data Engine
 * Pure JS Master Database & System Config
 */

const WATCHOX_CONFIG = {
  storeName: "WATCHOX",
  slogan: "TIME, REDEFINED.",
  currency: "৳",
  freeShippingThreshold: 5000,
  defaultShippingCost: 120,
  contact: {
    phone: "+880 1700-000000",
    whatsapp: "+8801700000000",
    email: "support@watchox.com",
    address: "Level 4, Plot 12, Block C, Banani, Dhaka, Bangladesh"
  }
};

const CATEGORIES = [
  { id: "mens", name: "Men's Watches" },
  { id: "womens", name: "Women's Watches" },
  { id: "luxury", name: "Luxury Watches" },
  { id: "casual", name: "Casual Watches" },
  { id: "couple", name: "Couple Watches" },
  { id: "smart", name: "Smart Watches" },
  { id: "accessories", name: "Accessories" }
];

const COUPONS = {
  "WATCH10": { type: "percentage", value: 10, minSpend: 2000, maxDiscount: 1000 },
  "SAVE20": { type: "fixed", value: 500, minSpend: 4000 },
  "FREESHIP": { type: "shipping", value: 120, minSpend: 1500 }
};

const PRODUCTS = [
  {
    id: "watch-001",
    sku: "WX-CHRONO-B1",
    name: "WATCHOX Phantom Black Chronograph",
    brand: "WATCHOX Masterwork",
    category: "mens",
    subcategory: "luxury",
    price: 6500,
    previousPrice: 8500,
    stock: 14,
    rating: 4.9,
    reviewsCount: 42,
    badge: "Bestseller",
    isFlashSale: true,
    isCombo: false,
    isNew: true,
    isTrending: true,
    isPreorder: false,
    freeDelivery: true,
    flashSaleEndTime: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days left
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Forged in surgical-grade matte black stainless steel. Features sub-second chronograph performance, tactile pushers, and anti-reflective sapphire crystal face.",
    specs: {
      "Case Diameter": "42mm",
      "Movement": "Japanese Quartz Chronograph",
      "Water Resistance": "10 ATM / 100m",
      "Strap Material": "Genuine PVD Coated Mesh Steel",
      "Warranty": "2 Years Official"
    },
    variants: ["Matte Black", "Silver Accent"]
  },
  {
    id: "watch-002",
    sku: "WX-STEEL-LADY",
    name: "WATCHOX Stellar Minimalist Rose Accent",
    brand: "WATCHOX Luxe",
    category: "womens",
    subcategory: "casual",
    price: 4200,
    previousPrice: 5500,
    stock: 8,
    rating: 4.8,
    reviewsCount: 19,
    badge: "Limited",
    isFlashSale: true,
    isCombo: false,
    isNew: true,
    isTrending: false,
    isPreorder: false,
    freeDelivery: false,
    flashSaleEndTime: new Date(Date.now() + 86400000 * 1).toISOString(),
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    description: "Ultra-slim profile engineered for subtle elegance. Designed with clean minimalist indices and scratch-resistant mineral glass.",
    specs: {
      "Case Diameter": "34mm",
      "Movement": "Swiss Quartz",
      "Water Resistance": "3 ATM",
      "Strap Material": "Italian Leather",
      "Warranty": "1 Year Official"
    },
    variants: ["Black Strap", "Nude Leather"]
  },
  {
    id: "combo-001",
    sku: "WX-COMBO-HIS-HER",
    name: "Exclusive Noir Couple Duo Pack",
    brand: "WATCHOX Editions",
    category: "couple",
    subcategory: null,
    price: 9800,
    previousPrice: 14000,
    stock: 5,
    rating: 5.0,
    reviewsCount: 31,
    badge: "Combo Deal",
    isFlashSale: false,
    isCombo: true,
    isNew: false,
    isTrending: true,
    isPreorder: false,
    freeDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    description: "The ultimate matching pair. Includes 1x Phantom Black Chronograph and 1x Stellar Minimalist Rose Accent inside a custom luxury display box.",
    specs: {
      "Package Includes": "2 Watches + Premium Gift Box",
      "Combined Discount": "30% OFF Original Total",
      "Warranty": "2 Years Each"
    },
    variants: ["Standard Pack"]
  },
  {
    id: "watch-003",
    sku: "WX-SMART-OLED",
    name: "WATCHOX Horizon Smart Tactical",
    brand: "WATCHOX Tech",
    category: "smart",
    subcategory: null,
    price: 7900,
    previousPrice: 9500,
    stock: 22,
    rating: 4.7,
    reviewsCount: 56,
    badge: "New Arrival",
    isFlashSale: false,
    isCombo: false,
    isNew: true,
    isTrending: true,
    isPreorder: false,
    freeDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    description: "High-definition AMOLED display with full biometric tracking, custom monochrome watch faces, and 14-day battery life.",
    specs: {
      "Display": "1.43 inch AMOLED",
      "Battery": "450 mAh (14 Days Typical)",
      "Sensors": "Heart Rate, SpO2, Sleep Tracker",
      "Water Resistance": "IP68"
    },
    variants: ["Stealth Black", "Titanium Gray"]
  }
];