# Quick Start Guide - PizzaHub

## 🚀 How to Run

1. **Open the application**
   - Simply open `index.html` in your web browser
   - No server or installation required!

2. **Start exploring**
   - Browse the menu
   - Create an account or login
   - Customize pizzas
   - Place an order

## 📱 Test Scenarios

### Scenario 1: Browse & Order
1. Go to Menu
2. Click on "Pepperoni" pizza
3. Select Large size, Stuffed Crust
4. Add Extra Cheese topping
5. Set quantity to 2
6. Click "Add to Cart"
7. Click Cart button
8. Click "Proceed to Checkout"
9. Login with any email/password
10. Fill delivery address
11. Select payment method
12. Click "Place Order"

### Scenario 2: Track Order
1. Click "My Orders"
2. View your order with status tracking
3. See real-time status updates (all examples shown)
4. Click "Reorder" to add items back to cart

### Scenario 3: Admin Features
1. Click "Admin" in navigation
2. View all orders in the table
3. Change order status using dropdown
4. Click "Analytics" to see dashboard
5. Click "Menu Management" to view menu items

## 🎨 Features to Try

### 1. Dynamic Pricing
- Select different sizes → See price change
- Add toppings → See price increase
- Change crust type → See modifier applied

### 2. Search & Filter
- Use search box to find pizzas
- Click filter buttons (Vegetarian, Meat, etc.)
- Search updates in real-time

### 3. Cart Features
- Add multiple items
- Remove items
- View cart summary with tax and delivery
- Clear cart by removing all items

### 4. Order Status
- Check order progress visually
- See all order details
- Track estimated delivery time
- Cancel orders (if not preparing)

### 5. Persistent Storage
- Logout and login
- Your cart and orders are saved
- Refresh page - everything persists

## 💡 Test Login Credentials

**No credentials needed!** 
- Enter any email and password to create account
- Or login with same email/password later
- All data saved locally

## 🔧 Troubleshooting

### Cart not showing items?
- Check browser console for errors
- Make sure cookies/storage are enabled
- Try refreshing the page

### Styles not loading?
- Ensure all files are in the same directory
- Check browser console for 404 errors
- Try a different browser

### Modal not opening?
- Click the button again
- Check if another modal is open (close it first)
- Clear browser cache

## 📊 Admin Testing

### Test Admin Orders
1. Create orders as customer
2. Go to Admin
3. Use dropdown to change order status:
   - pending → confirmed → preparing → out_for_delivery → delivered
4. Check analytics update in real-time

### Test Analytics
- Total Orders count increases with each order
- Total Revenue shows sum of all orders
- Average Order Value calculates automatically
- Completed Orders counts delivered orders

## 🎯 Key Interactions

| Action | How | Result |
|--------|-----|--------|
| Browse Menu | Click "Menu" | See all pizzas |
| Filter Pizzas | Click category buttons | Pizzas filtered |
| Search | Type in search box | Live results |
| Customize | Click pizza card | Modal opens |
| Add Topping | Check topping | Price updates |
| Add to Cart | Click "Add to Cart" | Item saved |
| View Cart | Click cart icon | Cart modal opens |
| Login | Click "Login" button | Auth modal opens |
| Place Order | Click "Place Order" | Confirmation shows |
| Track Order | Go to "My Orders" | See status tracking |
| Update Status | Admin dropdown | Changes immediately |

## 📝 Notes

- All data is stored in browser's localStorage
- Clearing browser data will delete all orders
- Each page reload persists all information
- No backend server required
- Works completely offline

## ✨ Features Included

✅ User authentication with login/register
✅ Interactive pizza menu with 8 different pizzas
✅ Advanced customization (size, crust, toppings)
✅ Real-time dynamic pricing
✅ Shopping cart with item management
✅ Checkout process with address & payment
✅ Order confirmation and tracking
✅ Order history with reorder capability
✅ Admin dashboard with order management
✅ Analytics showing key metrics
✅ Menu management (edit/delete pizzas)
✅ Real-time notifications
✅ Fully responsive design
✅ Smooth animations throughout
✅ LocalStorage persistence

## 🎓 Learning Points

This application demonstrates:
- Object-Oriented JavaScript (ES6 Classes)
- DOM manipulation and event handling
- CSS Grid and Flexbox layouts
- LocalStorage API usage
- State management without frameworks
- Modular code structure
- Responsive design principles
- Modern UI/UX patterns

---

**Enjoy using PizzaHub! 🍕**

For detailed information, see README.md
