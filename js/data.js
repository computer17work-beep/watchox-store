/**
 * WATCHOX - Master Style Sheet
 * Theme: Monochrome Luxury Black & White (#0A0A0A Focus)
 */

:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #000000;
  --bg-card: #121212;
  --bg-light: #F5F5F5;
  --border-dark: #2A2A2A;
  --border-light: #E0E0E0;
  --text-primary: #FFFFFF;
  --text-secondary: #8A8A8A;
  --text-dark: #0A0A0A;
  --accent-white: #FFFFFF;
  --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --max-width: 1280px;
}

/* --- Base & Reset --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 70px; /* Space for mobile nav */
}

@media (min-width: 992px) {
  body {
    padding-bottom: 0;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* --- Layout Wrappers --- */
.container {
  width: 90%;
  max-width: var(--max-width);
  margin: 0 auto;
}

.section {
  padding: 60px 0;
}

.section-title {
  font-size: 1.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 40px;
  height: 2px;
  background-color: var(--text-primary);
}

/* --- Top Bar & Sticky Nav --- */
.top-bar {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 0.8rem;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-dark);
  text-align: center;
  letter-spacing: 1px;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-dark);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 4px;
  color: var(--accent-white);
  text-transform: uppercase;
}

.nav-links {
  display: none;
  list-style: none;
  gap: 24px;
}

@media (min-width: 992px) {
  .nav-links {
    display: flex;
  }
}

.nav-links a {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-secondary);
  transition: var(--transition);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--text-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-btn {
  color: var(--text-primary);
  font-size: 1.2rem;
  position: relative;
  padding: 4px;
}

.badge-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--accent-white);
  color: var(--text-dark);
  font-size: 0.65rem;
  font-weight: bold;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- Product Cards & Grid --- */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  border-color: #444;
  transform: translateY(-4px);
}

.card-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--accent-white);
  color: var(--text-dark);
  font-size: 0.65rem;
  font-weight: bold;
  padding: 4px 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
}

.card-img-wrap {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-color: #1a1a1a;
}

.card-img-wrap img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.product-card:hover .card-img-wrap img {
  transform: scale(1.05);
}

.card-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.current-price {
  font-weight: bold;
  font-size: 1.1rem;
}

.prev-price {
  color: var(--text-secondary);
  text-decoration: line-through;
  font-size: 0.85rem;
}

.btn-primary {
  background-color: var(--accent-white);
  color: var(--text-dark);
  border: 1px solid var(--accent-white);
  padding: 10px 18px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition);
  width: 100%;
  text-align: center;
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--text-primary);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-dark);
  padding: 10px 18px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition);
  text-align: center;
}

.btn-secondary:hover {
  border-color: var(--text-primary);
}

/* --- Free Delivery Progress Bar --- */
.free-shipping-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.progress-track {
  width: 100%;
  height: 6px;
  background-color: var(--border-dark);
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--text-primary);
  width: 0%;
  transition: width 0.4s ease;
}

/* --- Toast Notifications --- */
#toast-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background-color: var(--accent-white);
  color: var(--text-dark);
  padding: 12px 20px;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* --- Mobile Bottom Nav --- */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-dark);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

@media (min-width: 992px) {
  .mobile-bottom-nav {
    display: none;
  }
}

.mobile-nav-item {
  color: var(--text-secondary);
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.mobile-nav-item.active {
  color: var(--text-primary);
}