// Pizza Delivery Application - Advanced JavaScript
// ================================================

// ==================== DATA & STATE ====================
class PizzaDeliveryApp {
    constructor() {
        // Pizza menu data
        this.pizzas = [
            {
                id: 1,
                name: 'Margherita',
                description: 'Classic pizza with fresh tomato, mozzarella and basil',
                basePrice: 9.99,
                category: 'vegetarian',
                rating: 4.8,
                image: '🍕'
            },
            {
                id: 2,
                name: 'Pepperoni',
                description: 'Loaded with pepperoni and mozzarella cheese',
                basePrice: 11.99,
                category: 'meat',
                rating: 4.9,
                image: '🍕'
            },
            {
                id: 3,
                name: 'Vegetarian Delight',
                description: 'Bell peppers, mushrooms, olives and onions',
                basePrice: 10.99,
                category: 'vegetarian',
                rating: 4.6,
                image: '🍕'
            },
            {
                id: 4,
                name: 'BBQ Chicken',
                description: 'Grilled chicken with BBQ sauce and cheddar',
                basePrice: 12.99,
                category: 'meat',
                rating: 4.7,
                image: '🍕'
            },
            {
                id: 5,
                name: 'Meat Lovers',
                description: 'Pepperoni, sausage, ham and bacon',
                basePrice: 13.99,
                category: 'meat',
                rating: 4.8,
                image: '🍕'
            },
            {
                id: 6,
                name: 'Supreme Special',
                description: 'Everything you love combined in one pizza',
                basePrice: 14.99,
                category: 'special',
                rating: 4.9,
                image: '🍕'
            },
            {
                id: 7,
                name: 'Hawaiian',
                description: 'Ham and pineapple on a delicious base',
                basePrice: 11.99,
                category: 'meat',
                rating: 4.5,
                image: '🍕'
            },
            {
                id: 8,
                name: 'Veggie Paradise',
                description: 'Spinach, garlic, roasted vegetables',
                basePrice: 10.99,
                category: 'vegetarian',
                rating: 4.7,
                image: '🍕'
            }
        ];

        this.toppings = [
            { id: 1, name: 'Extra Cheese', price: 1.50 },
            { id: 2, name: 'Mushrooms', price: 0.75 },
            { id: 3, name: 'Pepperoni', price: 1.00 },
            { id: 4, name: 'Onions', price: 0.50 },
            { id: 5, name: 'Bell Peppers', price: 0.75 },
            { id: 6, name: 'Bacon', price: 1.25 }
        ];

        // App state
        this.currentUser = this.loadUser();
        this.cart = this.loadCart();
        this.orders = this.loadOrders();
        this.currentPizza = null;
        this.currentFilter = 'all';
        this.currentPage = 'home';

        this.DELIVERY_FEE = 2.99;
        this.TAX_RATE = 0.10;

        this.init();
    }

    // ==================== INITIALIZATION ====================
    init() {
        this.setupEventListeners();
        this.renderPizzaGrid();
        this.updateCartCount();
        this.updateAuthButton();
        console.log('🍕 Pizza Delivery App Initialized');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Auth
        document.getElementById('authBtn').addEventListener('click', () => {
            this.openModal('loginModal');
        });

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Auth tabs
        document.querySelectorAll('.auth-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.authTab;
                this.switchAuthTab(tab);
            });
        });

        // Menu
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderPizzaGrid();
            });
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterPizzas(e.target.value);
        });

        // Cart
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.openModal('cartModal');
            this.renderCart();
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (!this.currentUser) {
                this.showNotification('Please login first', 'warning');
                return;
            }
            this.closeModal('cartModal');
            this.openModal('checkoutModal');
        });

        document.getElementById('placeOrderBtn').addEventListener('click', () => {
            this.placeOrder();
        });

        // Payment method change
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const cardSection = document.getElementById('cardSection');
                if (e.target.value === 'card') {
                    cardSection.classList.remove('hidden');
                } else {
                    cardSection.classList.add('hidden');
                }
            });
        });

        // Admin tabs
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchAdminTab(tab);
            });
        });

        // Pizza modal
        document.getElementById('increaseQty').addEventListener('click', () => {
            const input = document.getElementById('pizzaQuantity');
            input.value = parseInt(input.value) + 1;
        });

        document.getElementById('decreaseQty').addEventListener('click', () => {
            const input = document.getElementById('pizzaQuantity');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });

        document.getElementById('addToCartBtn').addEventListener('click', () => {
            this.addToCart();
        });

        // Close modals
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal.id);
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    // ==================== NAVIGATION ====================
    navigateToPage(page) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        // Show selected page
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.add('active');
        }

        this.currentPage = page;

        // Load page-specific content
        if (page === 'orders') {
            this.renderOrders();
        } else if (page === 'admin') {
            this.renderAdminDashboard();
        }
    }

    // ==================== PIZZA RENDERING ====================
    renderPizzaGrid() {
        const grid = document.getElementById('pizzaGrid');
        const filtered = this.currentFilter === 'all' 
            ? this.pizzas 
            : this.pizzas.filter(p => p.category === this.currentFilter);

        grid.innerHTML = filtered.map(pizza => `
            <div class="pizza-card" onclick="app.selectPizza(${pizza.id})">
                <div class="pizza-card-image">
                    <span style="font-size: 4rem;">${pizza.image}</span>
                    <div class="pizza-card-badge">POPULAR</div>
                </div>
                <div class="pizza-card-content">
                    <div class="pizza-card-title">${pizza.name}</div>
                    <div class="pizza-card-description">${pizza.description}</div>
                    <div class="pizza-card-rating">
                        <i class="fas fa-star"></i> ${pizza.rating} (${Math.floor(Math.random() * 300) + 50} reviews)
                    </div>
                    <div class="pizza-card-price">
                        <span class="price">$${pizza.basePrice.toFixed(2)}</span>
                        <button class="pizza-card-btn">Select</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterPizzas(searchTerm) {
        const grid = document.getElementById('pizzaGrid');
        const filtered = this.pizzas.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        grid.innerHTML = filtered.map(pizza => `
            <div class="pizza-card" onclick="app.selectPizza(${pizza.id})">
                <div class="pizza-card-image">
                    <span style="font-size: 4rem;">${pizza.image}</span>
                    <div class="pizza-card-badge">POPULAR</div>
                </div>
                <div class="pizza-card-content">
                    <div class="pizza-card-title">${pizza.name}</div>
                    <div class="pizza-card-description">${pizza.description}</div>
                    <div class="pizza-card-rating">
                        <i class="fas fa-star"></i> ${pizza.rating}
                    </div>
                    <div class="pizza-card-price">
                        <span class="price">$${pizza.basePrice.toFixed(2)}</span>
                        <button class="pizza-card-btn">Select</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ==================== PIZZA SELECTION ====================
    selectPizza(pizzaId) {
        this.currentPizza = this.pizzas.find(p => p.id === pizzaId);
        document.getElementById('pizzaQuantity').value = 1;

        // Update modal content
        document.getElementById('pizzaName').textContent = this.currentPizza.name;
        document.getElementById('pizzaDescription').textContent = this.currentPizza.description;
        document.getElementById('pizzaPrice').textContent = `$${this.currentPizza.basePrice.toFixed(2)}`;

        // Render toppings
        const toppingsList = document.getElementById('toppingsList');
        toppingsList.innerHTML = this.toppings.map(topping => `
            <div class="topping-option">
                <input type="checkbox" id="topping-${topping.id}" value="${topping.id}">
                <label for="topping-${topping.id}">${topping.name} (+$${topping.price.toFixed(2)})</label>
            </div>
        `).join('');

        // Add price update listener
        document.querySelectorAll('#toppingsList input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updatePizzaPrice());
        });

        document.getElementById('pizzaSize').addEventListener('change', () => this.updatePizzaPrice());
        document.getElementById('pizzaCrust').addEventListener('change', () => this.updatePizzaPrice());

        this.openModal('pizzaModal');
    }

    updatePizzaPrice() {
        let price = this.currentPizza.basePrice;

        // Size modifier
        const sizeMultipliers = {
            small: 0.8,
            medium: 1,
            large: 1.2,
            xlarge: 1.4
        };
        const size = document.getElementById('pizzaSize').value;
        price *= sizeMultipliers[size] || 1;

        // Crust modifier
        const crustModifiers = {
            thin: 0,
            hand_tossed: 0,
            pan: 1.5,
            stuffed: 2
        };
        const crust = document.getElementById('pizzaCrust').value;
        price += crustModifiers[crust] || 0;

        // Toppings
        document.querySelectorAll('#toppingsList input[type="checkbox"]:checked').forEach(checkbox => {
            const topping = this.toppings.find(t => t.id == checkbox.value);
            if (topping) {
                price += topping.price;
            }
        });

        document.getElementById('pizzaPrice').textContent = `$${price.toFixed(2)}`;
    }

    // ==================== CART ====================
    addToCart() {
        if (!this.currentPizza) return;

        const size = document.getElementById('pizzaSize').value;
        const crust = document.getElementById('pizzaCrust').value;
        const quantity = parseInt(document.getElementById('pizzaQuantity').value);
        const selectedToppings = Array.from(
            document.querySelectorAll('#toppingsList input[type="checkbox"]:checked')
        ).map(cb => parseInt(cb.value));

        // Calculate item price
        let itemPrice = this.currentPizza.basePrice;
        const sizeMultipliers = {
            small: 0.8, medium: 1, large: 1.2, xlarge: 1.4
        };
        itemPrice *= sizeMultipliers[size] || 1;

        const crustModifiers = {
            thin: 0, hand_tossed: 0, pan: 1.5, stuffed: 2
        };
        itemPrice += crustModifiers[crust] || 0;

        selectedToppings.forEach(toppingId => {
            const topping = this.toppings.find(t => t.id === toppingId);
            if (topping) itemPrice += topping.price;
        });

        const cartItem = {
            id: Date.now(),
            pizzaId: this.currentPizza.id,
            name: this.currentPizza.name,
            size,
            crust,
            toppings: selectedToppings.map(id => {
                const t = this.toppings.find(topping => topping.id === id);
                return { id, name: t.name, price: t.price };
            }),
            quantity,
            unitPrice: itemPrice / quantity,
            totalPrice: itemPrice
        };

        this.cart.push(cartItem);
        this.saveCart();
        this.updateCartCount();
        this.closeModal('pizzaModal');
        this.showNotification(`${this.currentPizza.name} added to cart!`, 'success');
    }

    renderCart() {
        const cartItems = document.getElementById('cartItems');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.size} - ${item.crust}</p>
                    ${item.toppings.length > 0 ? `<p>+ ${item.toppings.map(t => t.name).join(', ')}</p>` : ''}
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div class="cart-item-price">$${item.totalPrice.toFixed(2)}</div>
                <button class="cart-item-remove" onclick="app.removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Item removed from cart', 'success');
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
        const deliveryFee = this.cart.length > 0 ? this.DELIVERY_FEE : 0;
        const tax = (subtotal + deliveryFee) * this.TAX_RATE;
        const total = subtotal + deliveryFee + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    // ==================== CHECKOUT & ORDERS ====================
    placeOrder() {
        // Validate
        if (!this.currentUser) {
            this.showNotification('Please login first', 'warning');
            return;
        }

        const address = document.getElementById('deliveryAddress').value;
        const city = document.getElementById('deliveryCity').value;
        const zip = document.getElementById('deliveryZip').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        if (!address || !city || !zip) {
            this.showNotification('Please fill in all address fields', 'warning');
            return;
        }

        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVV = document.getElementById('cardCVV').value;

            if (!cardNumber || !cardExpiry || !cardCVV) {
                this.showNotification('Please fill in all card details', 'warning');
                return;
            }
        }

        // Calculate totals
        const subtotal = this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
        const deliveryFee = this.DELIVERY_FEE;
        const tax = (subtotal + deliveryFee) * this.TAX_RATE;
        const total = subtotal + deliveryFee + tax;

        // Create order
        const order = {
            id: `ORD-${Date.now()}`,
            userId: this.currentUser.id,
            items: [...this.cart],
            address: `${address}, ${city} ${zip}`,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total,
            status: 'pending',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString()
        };

        this.orders.push(order);
        this.saveOrders();

        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartCount();

        // Show confirmation
        this.showOrderConfirmation(order);
    }

    showOrderConfirmation(order) {
        const message = `Thank you for your order! Your pizza will arrive in approximately 30 minutes.`;
        document.getElementById('confirmationMessage').textContent = message;

        const details = `
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
            <p><strong>Delivery Address:</strong> ${order.address}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        `;
        document.getElementById('orderConfirmationDetails').innerHTML = details;

        this.closeModal('checkoutModal');
        this.openModal('confirmationModal');
    }

    renderOrders() {
        const ordersList = document.getElementById('ordersList');
        const userOrders = this.orders.filter(o => o.userId === (this.currentUser?.id || null));

        if (userOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-box"></i>
                    <p>No orders yet</p>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = userOrders.map(order => this.renderOrderCard(order)).join('');
    }

    renderOrderCard(order) {
        const statusSteps = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
        const currentStatusIndex = statusSteps.indexOf(order.status);

        return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">${order.id}</div>
                    <span class="order-status status-${order.status}">${order.status.replace('_', ' ').toUpperCase()}</span>
                </div>
                
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="order-item-details">
                                <span class="order-item-name">${item.name}</span>
                                <span class="order-item-qty">x${item.quantity}</span>
                                <span class="order-item-price">$${item.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="order-total">
                    <span>Total: $${order.total.toFixed(2)}</span>
                </div>

                <div class="order-tracking">
                    <div class="tracking-steps">
                        ${statusSteps.map((step, idx) => `
                            <div class="tracking-step ${idx <= currentStatusIndex ? 'completed' : ''} ${step === order.status ? 'active' : ''}">
                                <div class="tracking-step-icon">
                                    <i class="fas fa-${this.getStatusIcon(step)}"></i>
                                </div>
                                <div class="tracking-step-label">${step.replace('_', ' ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="order-actions">
                    ${order.status !== 'delivered' && order.status !== 'cancelled' ? `
                        <button class="btn btn-danger btn-small" onclick="app.cancelOrder('${order.id}')">Cancel Order</button>
                    ` : ''}
                    <button class="btn btn-secondary btn-small" onclick="app.reorderItems('${order.id}')">Reorder</button>
                </div>
            </div>
        `;
    }

    getStatusIcon(status) {
        const icons = {
            'pending': 'hourglass-start',
            'confirmed': 'check-circle',
            'preparing': 'chef',
            'out_for_delivery': 'truck',
            'delivered': 'box'
        };
        return icons[status] || 'circle';
    }

    cancelOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.status !== 'preparing') {
            order.status = 'cancelled';
            this.saveOrders();
            this.renderOrders();
            this.showNotification('Order cancelled successfully', 'success');
        } else {
            this.showNotification('Cannot cancel order at this stage', 'warning');
        }
    }

    reorderItems(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            this.cart = JSON.parse(JSON.stringify(order.items));
            this.saveCart();
            this.updateCartCount();
            this.navigateToPage('menu');
            this.showNotification('Items added to cart', 'success');
        }
    }

    // ==================== ADMIN DASHBOARD ====================
    renderAdminDashboard() {
        this.switchAdminTab('orders');
        this.updateAnalytics();
        this.renderAdminOrders();
        this.renderMenuManagement();
    }

    renderAdminOrders() {
        const tbody = document.getElementById('adminOrdersBody');
        tbody.innerHTML = this.orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${this.currentUser?.name || 'Guest'}</td>
                <td>${order.items.map(i => i.name).join(', ')}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td><span class="order-status status-${order.status}">${order.status}</span></td>
                <td>
                    <select onchange="app.updateOrderStatus('${order.id}', this.value)" style="padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid #ddd;">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                        <option value="out_for_delivery" ${order.status === 'out_for_delivery' ? 'selected' : ''}>Out for Delivery</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
            </tr>
        `).join('');
    }

    updateOrderStatus(orderId, status) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            this.saveOrders();
            this.renderAdminOrders();
            this.showNotification('Order status updated', 'success');
        }
    }

    updateAnalytics() {
        const totalOrders = this.orders.length;
        const totalRevenue = this.orders.reduce((sum, o) => sum + o.total, 0);
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const completedOrders = this.orders.filter(o => o.status === 'delivered').length;

        document.getElementById('totalOrders').textContent = totalOrders;
        document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
        document.getElementById('avgOrderValue').textContent = `$${avgOrderValue.toFixed(2)}`;
        document.getElementById('completedOrders').textContent = completedOrders;
    }

    renderMenuManagement() {
        const list = document.getElementById('menuMgmtList');
        list.innerHTML = this.pizzas.map(pizza => `
            <div class="menu-item-card">
                <h4>${pizza.name}</h4>
                <p>${pizza.description}</p>
                <div class="menu-item-price">$${pizza.basePrice.toFixed(2)}</div>
                <div class="menu-item-actions">
                    <button class="btn btn-secondary btn-small" onclick="app.editPizza(${pizza.id})">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="app.deletePizza(${pizza.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    editPizza(pizzaId) {
        this.showNotification('Edit feature coming soon', 'warning');
    }

    deletePizza(pizzaId) {
        if (confirm('Are you sure you want to delete this pizza?')) {
            this.pizzas = this.pizzas.filter(p => p.id !== pizzaId);
            this.renderMenuManagement();
            this.renderPizzaGrid();
            this.showNotification('Pizza deleted successfully', 'success');
        }
    }

    switchAdminTab(tab) {
        document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('[data-tab]').forEach(btn => {
            if (btn.dataset.tab === tab) btn.classList.add('active');
        });
        
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`${tab}-tab`)?.classList.add('active');
    }

    // ==================== AUTHENTICATION ====================
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple validation
        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'warning');
            return;
        }

        // Create user object (simple auth without backend)
        const user = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            loginDate: new Date().toISOString()
        };

        this.currentUser = user;
        this.saveUser();
        this.updateAuthButton();
        this.closeModal('loginModal');
        this.resetForms();
        this.showNotification(`Welcome back, ${user.name}!`, 'success');
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const phone = document.getElementById('registerPhone').value;

        if (!name || !email || !password || !phone) {
            this.showNotification('Please fill in all fields', 'warning');
            return;
        }

        const user = {
            id: Date.now(),
            name,
            email,
            phone,
            registeredAt: new Date().toISOString()
        };

        this.currentUser = user;
        this.saveUser();
        this.updateAuthButton();
        this.closeModal('loginModal');
        this.resetForms();
        this.showNotification(`Welcome, ${name}! Account created successfully.`, 'success');
    }

    updateAuthButton() {
        const btn = document.getElementById('authBtn');
        if (this.currentUser) {
            btn.textContent = `${this.currentUser.name}`;
            btn.onclick = () => this.logout();
        } else {
            btn.textContent = 'Login';
            btn.onclick = () => this.openModal('loginModal');
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.currentUser = null;
            this.saveUser();
            this.updateAuthButton();
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.navigateToPage('home');
            this.showNotification('Logged out successfully', 'success');
        }
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.auth-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-tab-content').forEach(content => content.classList.remove('active'));

        document.querySelector(`[data-auth-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}Form`).classList.add('active');
    }

    resetForms() {
        document.getElementById('loginForm').reset();
        document.getElementById('registerForm').reset();
    }

    // ==================== MODAL MANAGEMENT ====================
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ==================== NOTIFICATIONS ====================
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} active`;

        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            warning: '<i class="fas fa-exclamation-circle"></i>'
        };

        notification.innerHTML = `${icons[type] || ''} ${message}`;

        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }

    // ==================== LOCAL STORAGE ====================
    saveUser() {
        localStorage.setItem('pizzahub_user', JSON.stringify(this.currentUser));
    }

    loadUser() {
        const stored = localStorage.getItem('pizzahub_user');
        return stored ? JSON.parse(stored) : null;
    }

    saveCart() {
        localStorage.setItem('pizzahub_cart', JSON.stringify(this.cart));
    }

    loadCart() {
        const stored = localStorage.getItem('pizzahub_cart');
        return stored ? JSON.parse(stored) : [];
    }

    saveOrders() {
        localStorage.setItem('pizzahub_orders', JSON.stringify(this.orders));
    }

    loadOrders() {
        const stored = localStorage.getItem('pizzahub_orders');
        return stored ? JSON.parse(stored) : [];
    }
}

// ==================== GLOBAL HELPERS ====================
let app;

// Helper functions for inline event handlers
function navigateToPage(page) {
    app.navigateToPage(page);
}

function openModal(modalId) {
    app.openModal(modalId);
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app = new PizzaDeliveryApp();
});
