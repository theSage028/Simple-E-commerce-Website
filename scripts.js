// Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Example product data
const products = [
    { id: 1, name: 'Shorts', price: 19.99, image: 'Images/product-1.jpg' },
    { id: 2, name: 'Designer Shirt', price: 29.99, image: 'Images/product-2.jpg' },
    { id: 3, name: 'Fancy Bag', price: 39.99, image: 'Images/product-3.jpg' },
    { id: 4, name: 'Black Shoe', price: 49.99, image: 'Images/product-4.jpg' },
    { id: 5, name: 'Fancy Shoe', price: 59.99, image: 'Images/product-5.jpg' },
    { id: 6, name: 'Hoodie', price: 69.99, image: 'Images/product-6.jpg' },
    { id: 7, name: 'Socks', price: 69.99, image: 'Images/product-7.jpg' },
    { id: 8, name: 'Airforce', price: 69.99, image: 'Images/product-8.jpg' },
    { id: 9, name: 'Black Wears', price: 69.99, image: 'Images/product-9.jpg' },
    { id: 10, name: 'Blue Shorts', price: 69.99, image: 'Images/product-6.jpg' },
];

// Function to save cart items to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add to Cart function
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (product) {
        cartItems.push(product);
        saveCart();
        updateCart();
        showNotification(`${product.name} added to the cart!`);
    }
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCart();
    updateCart();
    showNotification('Item removed from cart.');
}

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// // Checkout function
// function checkout() {
//     if (cartItems.length === 0) {
//         showNotification('Your cart is empty. Add items to proceed.');
//         return;
//     }

//     showNotification('Order placed successfully!');
//     cartItems = [];
//     saveCart();
//     updateCart();
// }

// Load products into the shop page
function loadShopProducts() {
    const shopProductsContainer = document.getElementById('shop-products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        shopProductsContainer.appendChild(productDiv);
    });
}

// Initialize functions on page load
window.onload = function() {
    updateCart(); // Update the cart display
    loadShopProducts(); // Load products on shop page
};


// ... previous code remains unchanged ...

// Function to redirect to checkout page
function proceedToCheckout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty. Add items to proceed.');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Checkout function (if you want to keep it for confirmation)
function checkout() {
    showNotification('Order placed successfully!');
    cartItems = [];
    saveCart();
    updateCart();
}

// Load products into the shop page
function loadShopProducts() {
    // ... code remains unchanged ...
}

// Initialize functions on page load
window.onload = function() {
    updateCart(); // Update cart display on all pages
    loadShopProducts(); // Load products on the shop page
};

// Load cart items for checkout
function loadCheckoutCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Update initialization for the checkout page
window.onload = function() {
    if (document.title === "Checkout") {
        loadCheckoutCart(); // Load cart for checkout
    } else {
        updateCart(); // Update cart display on other pages
        loadShopProducts(); // Load products on the shop page
    }
};



function confirmOrder() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty. Cannot place order.');
        return;
    }
    
    // Logic for order confirmation (e.g., sending data to server)
    showNotification('Order confirmed! Thank you for your purchase.');
    
    // Clear cart after confirmation
    cartItems = [];
    saveCart();
    loadCheckoutCart();
}
