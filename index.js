// ==============================
// LUCIDE ICONS — re-render after DOM ready
// ==============================
// (lucide.createIcons() is already called in HTML after the script tag)

// ==============================
// CART STATE
// ==============================
const cart = new Set();

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    badge.textContent = cart.size;
    badge.style.display = cart.size === 0 ? 'none' : 'flex';
}

function syncProductButtons(productId, inCart) {
    // All buttons with data-product matching this id
    document.querySelectorAll(`[data-product="${productId}"]`).forEach(btn => {
        if (inCart) {
            btn.classList.add('in-cart');
        } else {
            btn.classList.remove('in-cart');
        }
    });
}

// ==============================
// CART ADD BUTTONS (buy-bubble, product-bag-btn, hero btn, image-action-btn)
// ==============================
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.cart-add-btn');
    if (!btn) return;

    const productId = btn.dataset.product;
    if (!productId) return;

    if (cart.has(productId)) {
        cart.delete(productId);
        syncProductButtons(productId, false);
    } else {
        cart.add(productId);
        syncProductButtons(productId, true);
    }

    updateCartBadge();
});

// ==============================
// LIKE BUTTON
// ==============================
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.like-btn');
    if (!btn) return;
    btn.classList.toggle('liked');

    // swap icon between heart and heart filled
    const icon = btn.querySelector('i');
    if (icon) {
        if (btn.classList.contains('liked')) {
            icon.setAttribute('data-lucide', 'heart');
        } else {
            icon.setAttribute('data-lucide', 'heart');
        }
        lucide.createIcons({ nodes: [icon] });
    }
});

// ==============================
// PRODUCT TABS
// ==============================
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
        this.classList.add('tab--active');
    });
});

// ==============================
// INIT
// ==============================
updateCartBadge();