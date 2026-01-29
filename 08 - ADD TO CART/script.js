const products = [
    { id: 1, name: 'The Indian Stock Market Simplified: A Beginner’s Guide', price: 252 , img: 'images/image1.png'},
    { id: 2, name: 'Guide to Indian Stock Market', price: 225, img: 'images/image2.png' },
    { id: 3, name: 'Trading Candlestick Patterns Book', price: 300, img: 'images/image3.png' },
    { id: 4, name: 'Mastering Options Trading In The Indian Stock Market', price: 193, img: 'images/image4.png' },
    { id: 5, name: 'Stock Market Investing in India', price: 7999, img: 'images/image5.png' },
    { id: 6, name: 'Trade Like a Stock Market Wizard', price: 410, img: 'images/image6.png' },
];

const productsContainer = document.getElementById('products-container');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
});

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if(cartItem) {
        cartItem.qty += 1;
    } else {
        cart.push({...product, qty: 1});
    }
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
                <div class="qty-controls">
                    <button onclick="decreaseQty(${item.id})">-</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty(${item.id})">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})">❌</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    cartTotal.textContent = total;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function increaseQty(id) {
    const cartItem = cart.find(item => item.id === id);
    if(cartItem) {
        cartItem.qty += 1;
        updateCartUI();
    }
}

function decreaseQty(id) {
    const cartItem = cart.find(item => item.id === id);
    if(cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    updateCartUI();
}

cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Order placed! Total: ₹" + cart.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart = [];
    updateCartUI();
    cartModal.classList.remove('active');
});
