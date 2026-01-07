# 🍕 PizzaHub - Advanced Pizza Delivery Application

A modern, feature-rich pizza delivery web application built with vanilla HTML, CSS, and JavaScript.

## Features

### 🛍️ Customer Features
- **User Authentication**: Register and login functionality
- **Interactive Menu**: Browse pizzas with advanced filtering and search
- **Pizza Customization**: 
  - Choose pizza size (Small, Medium, Large, X-Large)
  - Select crust type (Thin, Hand Tossed, Pan, Stuffed)
  - Add custom toppings with dynamic pricing
- **Shopping Cart**: Add/remove items with real-time updates
- **Checkout Process**: Complete order with address and payment info
- **Order Tracking**: Real-time status updates with visual tracking steps
- **Order History**: View all past orders with reorder functionality
- **Payment Methods**: Support for Credit Card, PayPal, and Cash on Delivery

### 👨‍💼 Admin Features
- **Admin Dashboard**: Complete order management system
- **Analytics**: View total orders, revenue, average order value, and completion rates
- **Order Management**: Update order status in real-time (Pending → Confirmed → Preparing → Out for Delivery → Delivered)
- **Menu Management**: Edit and delete pizzas from the menu

### 🎨 UI/UX Features
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile
- **Modern Animations**: Smooth transitions and animations throughout
- **Real-time Notifications**: Toast notifications for user actions
- **Interactive Status Tracking**: Visual order status tracking with steps
- **Dynamic Pricing**: Real-time price calculation based on customization
- **Persistent Storage**: Uses localStorage to save cart, orders, and user data

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6+)
- **Styling**: Modern CSS3 with Flexbox and Grid
- **Icons**: FontAwesome 6.4.0
- **Storage**: Browser LocalStorage API
- **Architecture**: Object-Oriented Programming with Class-based structure

## Project Structure

```
MAD/
├── index.html       # Main HTML file
├── styles.css       # Complete styling
├── app.js          # JavaScript application logic
└── README.md       # This file
```

## Getting Started

### Installation

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Start using the application** immediately!

No installation or server setup required - everything runs in the browser.

## Usage Guide

### For Customers

1. **Browse Menu**
   - Click "Menu" in navigation
   - Use filters to find pizzas by category
   - Search for specific pizzas

2. **Customize Pizza**
   - Click on any pizza card to open customization modal
   - Select size, crust type, and toppings
   - See real-time price updates
   - Add to cart

3. **Checkout**
   - Click cart icon to view items
   - Review cart summary (subtotal, tax, delivery fee)
   - Click "Proceed to Checkout"
   - Enter delivery address and payment info
   - Place order

4. **Track Order**
   - Go to "My Orders" to see all orders
   - View real-time status with visual tracking
   - See order details and items
   - Cancel order (if not yet preparing) or reorder items

5. **Account**
   - Click "Login" to register or sign in
   - Login persists across sessions
   - Click your name to logout

### For Admin

1. **Access Admin Dashboard**
   - Click "Admin" in navigation
   - View all orders with status options

2. **Manage Orders**
   - Change order status using the dropdown in the table
   - Orders update in real-time

3. **View Analytics**
   - Click "Analytics" tab
   - See total orders, revenue, average order value, and completion rates

4. **Manage Menu**
   - Click "Menu Management" tab
   - Edit or delete existing pizzas
   - Add new pizzas (placeholder for future implementation)

## Key Features Explained

### Dynamic Pricing System
- Base pizza price × Size multiplier + Crust modifier + Toppings cost
- Prices update in real-time as you customize

### Order Status Workflow
```
Pending → Confirmed → Preparing → Out for Delivery → Delivered
```
Each step has a visual indicator with icons and progress tracking.

### Local Storage Persistence
- **User Data**: Login information saved between sessions
- **Cart**: Items persist even after closing the browser
- **Orders**: Complete order history stored locally

### Responsive Breakpoints
- Desktop: Full layout with all features
- Tablet (768px): Optimized grid and spacing
- Mobile (480px): Single column layout, simplified navigation

## Data Structure

### Pizza Object
```javascript
{
  id: Number,
  name: String,
  description: String,
  basePrice: Number,
  category: 'vegetarian' | 'meat' | 'special',
  rating: Number,
  image: String
}
```

### Order Object
```javascript
{
  id: String,
  userId: Number,
  items: Array<CartItem>,
  address: String,
  paymentMethod: String,
  subtotal: Number,
  deliveryFee: Number,
  tax: Number,
  total: Number,
  status: String,
  createdAt: String,
  estimatedDelivery: String
}
```

### Cart Item Object
```javascript
{
  id: Number,
  pizzaId: Number,
  name: String,
  size: String,
  crust: String,
  toppings: Array<{id, name, price}>,
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number
}
```

## Customization

### Add New Pizzas
Edit the `pizzas` array in `app.js`:
```javascript
{
  id: 9,
  name: 'Your Pizza Name',
  description: 'Description',
  basePrice: 12.99,
  category: 'vegetarian', // or 'meat', 'special'
  rating: 4.8,
  image: '🍕'
}
```

### Modify Pricing
- **Delivery Fee**: Change `DELIVERY_FEE` constant
- **Tax Rate**: Change `TAX_RATE` constant
- **Size Multipliers**: Edit `sizeMultipliers` object
- **Crust Modifiers**: Edit `crustModifiers` object

### Styling
All styles are in `styles.css` with CSS variables for easy theming:
- `--primary-color`: Main brand color (red)
- `--secondary-color`: Accent color (teal)
- `--dark-color`: Text color
- `--light-color`: Background color

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **No external dependencies**: Everything is vanilla JS/CSS
- **Optimized animations**: Hardware-accelerated transforms
- **Efficient DOM updates**: Smart re-rendering only when needed
- **LocalStorage caching**: Fast data retrieval

## Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Real-time order tracking with WebSockets
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] User profile and address book
- [ ] Ratings and reviews system
- [ ] Loyalty program and coupons
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Map integration for delivery tracking

## Known Limitations

- Payment processing is simulated (no actual charge)
- Orders are stored locally only (not synced across devices)
- No backend validation or security
- Admin features have no access control
- No email notifications (can be added with backend)

## Code Quality

- Clean, modular class-based structure
- Comprehensive comments and documentation
- Consistent naming conventions
- DRY principle throughout
- Separation of concerns

## License

Open source - Feel free to use and modify for your projects!

## Support

For issues or feature requests, feel free to modify the code or add your own enhancements!

---

**Happy Pizza Ordering! 🍕**
