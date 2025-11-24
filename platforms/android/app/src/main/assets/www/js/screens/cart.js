// Cart Screen
let cartItems = [];

function initCart() {
    loadCart();
}

function loadCart() {
    DengageCR.getCart(
        function(cart) {
            try {
                const cartObj = typeof cart === 'string' ? JSON.parse(cart) : cart;
                cartItems = cartObj.items || [];
                renderCartItems();
            } catch (e) {
                console.error('Error parsing cart:', e);
                cartItems = [];
                renderCartItems();
            }
        },
        function(error) {
            console.error('Error getting cart:', error);
            cartItems = [];
            renderCartItems();
        }
    );
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const empty = document.getElementById('cart-empty');
    const updateButton = document.getElementById('update-cart-button');
    
    if (cartItems.length === 0) {
        container.innerHTML = '';
        empty.style.display = 'block';
        updateButton.style.display = 'none';
        return;
    }
    
    empty.style.display = 'none';
    updateButton.style.display = 'block';
    
    let html = '';
    cartItems.forEach((item, index) => {
        html += `
            <div class="item-card">
                <div class="item-title">Item ${index + 1}</div>
                <input type="text" class="text-input" placeholder="Product ID" 
                    value="${escapeHtml(item.productId || '')}" 
                    onchange="updateCartItem(${index}, 'productId', this.value)">
                <input type="text" class="text-input" placeholder="Product Variant ID" 
                    value="${escapeHtml(item.productVariantId || '')}" 
                    onchange="updateCartItem(${index}, 'productVariantId', this.value)">
                <input type="text" class="text-input" placeholder="Category Path" 
                    value="${escapeHtml(item.categoryPath || '')}" 
                    onchange="updateCartItem(${index}, 'categoryPath', this.value)">
                <input type="number" class="text-input" placeholder="Price" 
                    value="${item.price || 0}" 
                    onchange="updateCartItem(${index}, 'price', parseFloat(this.value) || 0)">
                <input type="number" class="text-input" placeholder="Discounted Price" 
                    value="${item.discountedPrice || 0}" 
                    onchange="updateCartItem(${index}, 'discountedPrice', parseFloat(this.value) || 0)">
                <input type="number" class="text-input" placeholder="Quantity" 
                    value="${item.quantity || 1}" 
                    onchange="updateCartItem(${index}, 'quantity', parseInt(this.value) || 1)">
                <div class="checkbox-row">
                    <div class="checkbox-item" onclick="toggleCartItem(${index}, 'hasDiscount')">
                        ${item.hasDiscount ? '✓' : '○'} Has Discount
                    </div>
                    <div class="checkbox-item" onclick="toggleCartItem(${index}, 'hasPromotion')">
                        ${item.hasPromotion ? '✓' : '○'} Has Promotion
                    </div>
                </div>
                <button class="secondary-button" onclick="removeCartItem(${index})">Remove Item</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function addCartItem() {
    const newItem = {
        productId: '',
        productVariantId: '',
        categoryPath: '',
        price: 0,
        discountedPrice: 0,
        hasDiscount: false,
        hasPromotion: false,
        quantity: 1,
        attributes: {},
        effectivePrice: 0,
        lineTotal: 0,
        discountedLineTotal: 0,
        effectiveLineTotal: 0,
        categorySegments: [],
        categoryRoot: ''
    };
    cartItems.push(newItem);
    renderCartItems();
}

function removeCartItem(index) {
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        renderCartItems();
    }
}

function updateCartItem(index, field, value) {
    if (cartItems[index]) {
        cartItems[index][field] = value;
    }
}

function toggleCartItem(index, field) {
    if (cartItems[index]) {
        cartItems[index][field] = !cartItems[index][field];
        renderCartItems();
    }
}

function updateCart() {
    const cart = {
        items: cartItems,
        summary: {
            currency: 'TRY',
            updatedAt: Date.now(),
            linesCount: cartItems.length,
            itemsCount: cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
            subtotal: 0,
            discountedSubtotal: 0,
            effectiveSubtotal: 0,
            anyDiscounted: false,
            allDiscounted: false,
            minPrice: 0,
            maxPrice: 0,
            minEffectivePrice: 0,
            maxEffectivePrice: 0,
            categories: {}
        }
    };
    
    DengageCR.setCart(
        JSON.stringify(cart),
        function() {
            alert('Cart updated successfully!');
        },
        function(error) {
            console.error('Error updating cart:', error);
            alert('Failed to update cart');
        }
    );
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when screen is shown
document.addEventListener('DOMContentLoaded', function() {
    const cartScreen = document.getElementById('cart-screen');
    if (cartScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (cartScreen.classList.contains('active')) {
                initCart();
            }
        });
        observer.observe(cartScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

