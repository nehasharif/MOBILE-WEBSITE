// ===== PRODUCT DATA =====
const allProducts = [
    {
        id: 1,
        name: "Magnetic Cooler Fan CX07",
        category: "others",
        price: 1499,
        oldPrice: 2000,
        rating: 4.7,
        reviews: 212,
        img: "p1.jpg",
        badge: "Best Seller",
        desc: "15W powerful magnetic cooler fan for smartphones. Instantly snaps on and cools your phone during gaming or heavy use. Model: CX07."
    },
    {
        id: 2,
        name: "Space LE-30 RGB Headphones",
        category: "earphones",
        price: 2799,
        oldPrice: 3800,
        rating: 4.8,
        reviews: 334,
        img: "p2.jpg",
        badge: "New",
        desc: "Space Level LE-30 on-ear wireless RGB headphones. 15 hours playback, FM stereo, Micro SD, Type-C charging, built-in mic."
    },
    {
        id: 3,
        name: "IVOYO X5 TWS Earphones",
        category: "earphones",
        price: 1799,
        oldPrice: 2500,
        rating: 4.5,
        reviews: 178,
        img: "p3.jpg",
        badge: "Sale",
        desc: "IVOYO X5 true wireless earphones. 8 hrs playtime, IPX7 waterproof, LED power display, touch control, Bluetooth 5.0."
    },
    {
        id: 4,
        name: "Shibela PureSound P30 Pro",
        category: "earphones",
        price: 2199,
        oldPrice: 3000,
        rating: 4.6,
        reviews: 145,
        img: "p4.jpg",
        badge: "Top Pick",
        desc: "Shibela PureSound P30 Pro TWS earbuds with ANC + ENC noise reduction. Crystal clear audio and premium comfort design."
    },
    {
        id: 5,
        name: "OG Glass Screen Protector",
        category: "cases",
        price: 450,
        oldPrice: 700,
        rating: 4.4,
        reviews: 520,
        img: "p5.jpg",
        badge: "Must Have",
        desc: "High quality OG Glass ESD screen protector for iPhone 14 Pro Max 6.7. Anti-fingerprint, 9H hardness, bubble-free install."
    },
    {
        id: 6,
        name: "Ronin The OG Type-C Earphones",
        category: "earphones",
        price: 999,
        oldPrice: 1500,
        rating: 4.5,
        reviews: 267,
        img: "p6.jpg",
        badge: "Premium",
        desc: "Ronin The OG super bass Type-C earphones with HD sound, surround stereo, noise cancellation and talk/music control."
    },
    {
        id: 7,
        name: "Ronin R-3030 Smart Watch",
        category: "others",
        price: 3999,
        oldPrice: 5500,
        rating: 4.7,
        reviews: 189,
        img: "p7.jpg",
        badge: "New",
        desc: "Ronin Luxe Metal smartwatch with metallic finish. Heart rate monitor, 7-day battery, water resistant, smart notifications."
    },
    {
        id: 8,
        name: "Retro Dynamic Lights Speaker",
        category: "others",
        price: 2499,
        oldPrice: 3500,
        rating: 4.4,
        reviews: 98,
        img: "p8.jpg",
        badge: "",
        desc: "Retro dynamic lights Bluetooth speaker. High-grade cloth body, Bluetooth 5.4, 4 metres music range. Past inspired, future tuned."
    },
    {
        id: 9,
        name: "Google 30W USB-C Charger",
        category: "chargers",
        price: 1999,
        oldPrice: 2800,
        rating: 4.8,
        reviews: 312,
        img: "p9.jpg",
        badge: "Original",
        desc: "Google original 30W USB-C charger + cable set. Certified fast charging for Pixel and all USB-C devices. Safe & efficient."
    },
    {
        id: 10,
        name: "Boya BY-MW3 Wireless Mic",
        category: "others",
        price: 2999,
        oldPrice: 4000,
        rating: 4.6,
        reviews: 143,
        img: "p10.jpg",
        badge: "Hot",
        desc: "Boya BY-MW3 wireless lavalier microphone. Perfect for YouTube, vlogging and live streaming. Plug & play, no app needed."
    },
    {
        id: 11,
        name: "Ronin R-3030 BT Speaker",
        category: "others",
        price: 3499,
        oldPrice: 4800,
        rating: 4.7,
        reviews: 221,
        img: "p11.jpg",
        badge: "Top Pick",
        desc: "Ronin Reverb R-3030 Bluetooth speaker with metallic finish, dynamic RGB fusion lights, base stand, 4 hrs music time."
    },
    {
        id: 12,
        name: "Nokia N-70 Travel Charger",
        category: "chargers",
        price: 699,
        oldPrice: 1000,
        rating: 4.3,
        reviews: 408,
        img: "p12.jpg",
        badge: "",
        desc: "Nokia original 11E N-70 travel charger with voltage regulator panel. Stay charged, stay connected everywhere."
    }
];

let cart = JSON.parse(localStorage.getItem('sp_cart')) || [];
let currentFilter = 'all';
let currentSort = 'default';
let searchTerm = '';
let modalQty = 1;
let currentModalProduct = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// ===== RENDER PRODUCTS =====
function renderProducts() {
    let filtered = currentFilter === 'all'
        ? [...allProducts]
        : allProducts.filter(p => p.category === currentFilter);

    if (searchTerm.trim()) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (currentSort === 'low') filtered.sort((a, b) => a.price - b.price);
    else if (currentSort === 'high') filtered.sort((a, b) => b.price - a.price);
    else if (currentSort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
}

function createProductCard(p) {
    const stars = generateStars(p.rating);
    const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
    const inWishlist = getWishlist().includes(p.id);
    const imgHTML = p.img
        ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : '';
    const iconHTML = `<i class="fas fa-box product-icon" style="${p.img ? 'display:none' : ''}"></i>`;

    return `
    <div class="product-card" data-id="${p.id}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)" title="Add to Wishlist">
            <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
        </button>
        <div class="product-img-wrap" onclick="openModal(${p.id})">
            ${imgHTML}${iconHTML}
        </div>
        <div class="product-info">
            <p class="category-tag">${p.category}</p>
            <h4>${p.name}</h4>
            <div class="stars">${stars}<span>(${p.reviews})</span></div>
            <div class="price-row">
                <span class="price">Rs. ${p.price.toLocaleString()}</span>
                <span class="old-price">Rs. ${p.oldPrice.toLocaleString()}</span>
                <span style="font-size:1.2rem;color:#27ae60;font-weight:700;">${discount}% off</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${p.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    </div>`;
}

function generateStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
        else if (i - 0.5 <= rating) html += '<i class="fas fa-star-half-alt"></i>';
        else html += '<i class="far fa-star"></i>';
    }
    return html;
}

// ===== FILTER & SORT =====
function filterProducts(cat, el) {
    currentFilter = cat;
    document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function sortProducts() {
    currentSort = document.getElementById('sortSelect').value;
    renderProducts();
}

function searchProducts() {
    searchTerm = document.getElementById('searchInput').value;
    renderProducts();
}

// ===== CART =====
function addToCart(id, qty = 1) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id, name: product.name, price: product.price, img: product.img || '', qty });
    }

    saveCart();
    updateCartUI();
    showToast(`"${product.name}" added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }
    saveCart();
    updateCartUI();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('sp_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartBadge').textContent = total;
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><i class="fas fa-cart-shopping"></i><p>Your cart is empty</p></div>`;
        footer.style.display = 'none';
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-icon">
                ${item.img ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:.8rem;">` : `<i class="fas fa-box"></i>`}
            </div>
            <div class="item-details">
                <h5>${item.name}</h5>
                <p>Rs. ${(item.price * item.qty).toLocaleString()}</p>
            </div>
            <div class="qty-controls">
                <button onclick="changeQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    document.getElementById('cartTotal').textContent = `Rs. ${totalPrice.toLocaleString()}`;
    footer.style.display = 'block';
}

function toggleCart(e) {
    if (e) e.preventDefault();
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    const isOpen = sidebar.classList.contains('active');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';

    if (!isOpen) renderCartItems();
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    showToast('Order placed successfully! Thank you 🎉');
    cart = [];
    saveCart();
    updateCartUI();
    renderCartItems();
    setTimeout(() => toggleCart(), 2000);
}

// ===== WISHLIST =====
function getWishlist() {
    return JSON.parse(localStorage.getItem('sp_wishlist')) || [];
}

function toggleWishlist(id, btn) {
    const product = allProducts.find(p => p.id === id);
    let wishlist = getWishlist();
    const idx = wishlist.indexOf(id);

    if (idx === -1) {
        wishlist.push(id);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        showToast(`"${product.name}" added to wishlist!`);
    } else {
        wishlist.splice(idx, 1);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>';
        showToast(`Removed from wishlist.`);
    }

    localStorage.setItem('sp_wishlist', JSON.stringify(wishlist));
}

// ===== PRODUCT MODAL =====
function openModal(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    currentModalProduct = product;
    modalQty = 1;
    const stars = generateStars(product.rating);
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

    const modalImgHTML = product.img
        ? `<img src="${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:1rem;">`
        : `<i class="fas fa-box modal-icon"></i>`;

    document.getElementById('modalBody').innerHTML = `
        <div class="modal-content">
            <div class="modal-img">
                ${modalImgHTML}
            </div>
            <div class="modal-details">
                <p class="cat-label">${product.category}</p>
                <h2>${product.name}</h2>
                <div class="modal-stars">${stars}<span style="color:#888;font-size:1.4rem;margin-left:.5rem;">(${product.reviews} reviews)</span></div>
                <div>
                    <span class="modal-price">Rs. ${product.price.toLocaleString()}</span>
                    <span class="modal-old-price">Rs. ${product.oldPrice.toLocaleString()}</span>
                    <span style="font-size:1.4rem;color:#27ae60;font-weight:700;margin-left:.5rem;">${discount}% OFF</span>
                </div>
                <p class="modal-desc">${product.desc}</p>
                <div class="modal-qty">
                    <label>Quantity:</label>
                    <div class="qty-wrap">
                        <button onclick="changeModalQty(-1)">−</button>
                        <span id="modalQtyDisplay">1</span>
                        <button onclick="changeModalQty(1)">+</button>
                    </div>
                </div>
                <button class="modal-add-btn" onclick="addToCart(${product.id}, modalQty)">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>`;

    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function changeModalQty(delta) {
    modalQty = Math.max(1, modalQty + delta);
    const display = document.getElementById('modalQtyDisplay');
    if (display) display.textContent = modalQty;
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    currentModalProduct = null;
}

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== CONTACT FORM =====
function submitForm(e) {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you soon.');
    e.target.reset();
}

// ===== KEYBOARD: Close modal on Escape =====
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar.classList.contains('active')) toggleCart();
    }
});
