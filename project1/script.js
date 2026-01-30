// Amazon Clone - JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // =================== CART FUNCTIONALITY ===================
    let cartCount = 0;
    let cartTotal = 0;
    
    // Initialize cart counter
    function initCartCounter() {
        const cartDiv = document.querySelector('.nav-cart');
        if (!cartDiv) return;
        
        // Create cart counter element
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = cartCount;
        cartDiv.appendChild(counter);
        
        // Add styles for cart counter
        const cartStyle = document.createElement('style');
        cartStyle.textContent = `
            .cart-counter {
                background-color: #f08804;
                color: white;
                font-size: 12px;
                padding: 2px 6px;
                border-radius: 50%;
                position: relative;
                top: -8px;
                left: -5px;
            }
        `;
        document.head.appendChild(cartStyle);
    }
    
    // Add to cart function
    function addToCart(productName, price) {
        cartCount++;
        cartTotal += price;
        
        // Update cart counter
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            counter.textContent = cartCount;
            counter.style.animation = 'cartPulse 0.5s';
            setTimeout(() => counter.style.animation = '', 500);
        }
        
        // Save to localStorage
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('cartTotal', cartTotal);
        
        // Show notification
        showNotification(`Added ${productName} to cart!`);
    }
    
    // =================== SEARCH FUNCTIONALITY ===================
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`Searching for "${query}"...`);
            // In a real app, you would redirect to search results
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }
    
    // =================== PRODUCT CARDS ENHANCEMENT ===================
    function enhanceProductCards() {
        const boxes = document.querySelectorAll('.box');
        const products = [
            { name: "Gift Cards Bundle", price: 25.99, discount: 20 },
            { name: "Gaming Console", price: 499.99, discount: 15 },
            { name: "Premium Tablet", price: 329.99, discount: 10 },
            { name: "Book Collection", price: 49.99, discount: 25 },
            { name: "Girls Fashion Set", price: 34.99, discount: 30 },
            { name: "Fitness Tracker", price: 89.99, discount: 15 },
            { name: "Smart Watch Pro", price: 199.99, discount: 20 },
            { name: "Electronics Bundle", price: 799.99, discount: 25 }
        ];
        
        boxes.forEach((box, index) => {
            if (index < products.length) {
                const product = products[index];
                const boxContent = box.querySelector('.box-con');
                
                // Create price display
                const priceDiv = document.createElement('div');
                priceDiv.className = 'price-display';
                priceDiv.innerHTML = `
                    <span class="original-price">$${product.price.toFixed(2)}</span>
                    <span class="current-price">$${(product.price * (1 - product.discount/100)).toFixed(2)}</span>
                    <span class="discount-badge">Save ${product.discount}%</span>
                `;
                
                // Create Add to Cart button
                const addBtn = document.createElement('button');
                addBtn.className = 'add-to-cart';
                addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                addBtn.onclick = () => addToCart(product.name, product.price * (1 - product.discount/100));
                
                // Create Wishlist button
                const wishBtn = document.createElement('button');
                wishBtn.className = 'add-wishlist';
                wishBtn.innerHTML = '<i class="far fa-heart"></i>';
                wishBtn.title = 'Add to Wishlist';
                wishBtn.onclick = function() {
                    if (this.classList.contains('active')) {
                        this.innerHTML = '<i class="far fa-heart"></i>';
                        this.classList.remove('active');
                        showNotification(`Removed from wishlist`);
                    } else {
                        this.innerHTML = '<i class="fas fa-heart"></i>';
                        this.classList.add('active');
                        showNotification(`Added to wishlist!`);
                    }
                };
                
                // Create button container
                const btnContainer = document.createElement('div');
                btnContainer.className = 'card-buttons';
                btnContainer.appendChild(wishBtn);
                btnContainer.appendChild(addBtn);
                
                // Add to box
                if (boxContent) {
                    boxContent.appendChild(priceDiv);
                    boxContent.appendChild(btnContainer);
                }
                
                // Add hover effect
                box.addEventListener('mouseenter', function() {
                    btnContainer.style.opacity = '1';
                });
                
                box.addEventListener('mouseleave', function() {
                    btnContainer.style.opacity = '0';
                });
            }
        });
        
        // Add styles for enhanced cards
        const cardStyles = document.createElement('style');
        cardStyles.textContent = `
            .price-display {
                margin: 10px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .original-price {
                text-decoration: line-through;
                color: #767676;
                font-size: 14px;
            }
            
            .current-price {
                color: #B12704;
                font-size: 18px;
                font-weight: bold;
            }
            
            .discount-badge {
                background: #CC0C39;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 12px;
            }
            
            .card-buttons {
                display: flex;
                gap: 10px;
                margin-top: 15px;
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .add-to-cart {
                flex: 1;
                background: #FFD814;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                transition: background 0.3s;
            }
            
            .add-to-cart:hover {
                background: #F7CA00;
            }
            
            .add-wishlist {
                width: 40px;
                background: #f0f0f0;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .add-wishlist.active {
                color: #ff6b6b;
            }
            
            .add-wishlist:hover {
                background: #e0e0e0;
            }
            
            .box {
                transition: transform 0.3s, box-shadow 0.3s;
                position: relative;
            }
            
            .box:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            
            @keyframes cartPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(cardStyles);
    }
    
    // =================== NOTIFICATION SYSTEM ===================
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.amazon-notification');
        if (existing) existing.remove();
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'amazon-notification';
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #232F3E;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            font-size: 14px;
            max-width: 300px;
            border-left: 4px solid #FF9900;
        `;
        
        // Add animation styles
        const animStyle = document.createElement('style');
        animStyle.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(animStyle);
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // =================== PANEL INTERACTIONS ===================
    function addPanelInteractions() {
        // Back to top button
        const backToTop = document.querySelector('.panel1');
        if (backToTop) {
            backToTop.style.cursor = 'pointer';
            backToTop.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showNotification('Scrolled to top');
            });
        }
        
        // Footer links hover effect
        const footerLinks = document.querySelectorAll('.footer-col a');
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = '#FF9900';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.color = '#DDDDDD';
            });
        });
        
        // Today's Deals highlight
        const dealsBtn = document.querySelector('.panel-ops p:first-child');
        if (dealsBtn) {
            dealsBtn.style.cursor = 'pointer';
            dealsBtn.addEventListener('click', function() {
                showNotification('Loading Today\'s Deals...');
            });
        }
    }
    
    // =================== CART MODAL ===================
    function createCartModal() {
        const modalHTML = `
            <div class="cart-modal" id="cartModal">
                <div class="modal-header">
                    <h3>Your Shopping Cart (${cartCount} items)</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="empty-cart" id="emptyCart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your Amazon Cart is empty</p>
                    </div>
                    <div class="cart-items" id="cartItems" style="display: none;">
                        <!-- Cart items will be added here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="cart-total">
                        <span>Subtotal (${cartCount} items):</span>
                        <span class="total-amount">$${cartTotal.toFixed(2)}</span>
                    </div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        `;
        
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalHTML;
        document.body.appendChild(modalDiv);
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .cart-modal {
                display: none;
                position: fixed;
                top: 0;
                right: 0;
                width: 350px;
                height: 100%;
                background: white;
                box-shadow: -4px 0 12px rgba(0,0,0,0.2);
                z-index: 9998;
                flex-direction: column;
            }
            
            .modal-header {
                background: #232F3E;
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .close-modal {
                font-size: 24px;
                cursor: pointer;
            }
            
            .modal-body {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
            }
            
            .empty-cart {
                text-align: center;
                color: #767676;
                padding: 40px 0;
            }
            
            .empty-cart i {
                font-size: 48px;
                margin-bottom: 15px;
                color: #DDDDDD;
            }
            
            .modal-footer {
                border-top: 1px solid #DDDDDD;
                padding: 15px;
            }
            
            .cart-total {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                font-weight: bold;
                font-size: 18px;
            }
            
            .total-amount {
                color: #B12704;
            }
            
            .checkout-btn {
                width: 100%;
                padding: 12px;
                background: #FFD814;
                border: none;
                border-radius: 4px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Close modal
        document.querySelector('.close-modal').addEventListener('click', function() {
            document.getElementById('cartModal').style.display = 'none';
        });
        
        // Open cart on click
        const cartIcon = document.querySelector('.nav-cart');
        if (cartIcon) {
            cartIcon.addEventListener('click', function() {
                document.getElementById('cartModal').style.display = 'flex';
            });
        }
    }
    
    // =================== LOAD CART FROM STORAGE ===================
    function loadCartFromStorage() {
        const savedCount = localStorage.getItem('cartCount');
        const savedTotal = localStorage.getItem('cartTotal');
        
        if (savedCount) {
            cartCount = parseInt(savedCount);
            cartTotal = parseFloat(savedTotal);
        }
    }
    
    // =================== INITIALIZE EVERYTHING ===================
    loadCartFromStorage();
    initCartCounter();
    enhanceProductCards();
    addPanelInteractions();
    createCartModal();
    
    // Add hover effect to all border elements
    document.querySelectorAll('.border').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#FF9900';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
        });
    });
});
