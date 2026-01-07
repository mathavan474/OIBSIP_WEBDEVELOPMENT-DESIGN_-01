# Testing Guide & Troubleshooting

## 🧪 Testing Checklist

### User Authentication
- [ ] Register new user with name, email, password, phone
- [ ] Login with registered email and password
- [ ] Verify user name appears in top right
- [ ] Logout successfully
- [ ] Verify cart clears on logout
- [ ] Login again and verify cart is still saved

### Menu Browsing
- [ ] View all 8 pizzas on menu page
- [ ] Filter by "Vegetarian" category - should show 3 pizzas
- [ ] Filter by "Meat Lovers" category - should show 4 pizzas
- [ ] Filter by "Specials" category - should show 1 pizza
- [ ] Reset to "All" category - should show 8 pizzas
- [ ] Search "Pepperoni" - should show 2 pizzas
- [ ] Search "Hawaiian" - should show Hawaiian pizza only
- [ ] Search with no results - should show empty grid

### Pizza Customization
- [ ] Click on pizza card to open detail modal
- [ ] Change size from Medium to Large - price should increase
- [ ] Change size to Small - price should decrease
- [ ] Change crust from Hand Tossed to Pan - price should increase $1.50
- [ ] Change crust to Stuffed - price should increase $2.00
- [ ] Add single topping - price should increase
- [ ] Add multiple toppings - price should add up correctly
- [ ] Uncheck topping - price should decrease
- [ ] Increase quantity to 3 - verify quantity display

### Shopping Cart
- [ ] Add pizza to cart - cart count should increase
- [ ] View cart - should show all added items
- [ ] See item customization details (size, crust, toppings)
- [ ] Remove item from cart - item should disappear
- [ ] Add another pizza with different customization
- [ ] Verify cart summary calculates correctly:
  - [ ] Subtotal = sum of all items
  - [ ] Delivery Fee = $2.99
  - [ ] Tax = (Subtotal + Delivery) × 10%
  - [ ] Total = correct sum

### Checkout Process
- [ ] Try to checkout without login - should show warning
- [ ] Login and try checkout again
- [ ] Fill delivery address - all fields required
- [ ] Verify address is required
- [ ] Try to place order with incomplete address - should warn
- [ ] Select "Credit Card" payment
- [ ] Fill in card details
- [ ] Try to place order without card info - should warn
- [ ] Select "PayPal" payment - card fields should hide
- [ ] Select "Cash" payment - card fields should hide
- [ ] Successfully place order - should show confirmation

### Order Confirmation
- [ ] Confirmation modal appears after order
- [ ] Shows correct order ID
- [ ] Shows correct total amount
- [ ] Shows delivery address
- [ ] Shows payment method
- [ ] Click "Continue Shopping" - redirects to home
- [ ] Cart should be empty after order

### Order Tracking
- [ ] Go to "My Orders" page
- [ ] See the order you just placed
- [ ] Verify order status is "pending"
- [ ] See order tracking with visual steps
- [ ] See completed steps in green
- [ ] See current step highlighted
- [ ] See item list with prices
- [ ] See order total
- [ ] Click "Reorder" button - items should be added to cart

### Admin Dashboard
- [ ] Navigate to Admin page
- [ ] Click "All Orders" tab - see all orders in table
- [ ] Change order status using dropdown
- [ ] Verify status changes immediately
- [ ] Click "Analytics" tab - see 4 analytics cards
- [ ] Verify Total Orders count
- [ ] Verify Total Revenue shows sum
- [ ] Verify Average Order Value calculated
- [ ] Verify Completed Orders count
- [ ] Click "Menu Management" tab
- [ ] See all pizzas in grid
- [ ] Click "Edit" button - placeholder message shown
- [ ] Click "Delete" button - pizza removed from menu
- [ ] Verify deleted pizza no longer shows in Menu page

### Responsive Design
- [ ] Test on desktop (1200px+) - full layout
- [ ] Test on tablet (768px) - adjusted grid
- [ ] Test on mobile (480px) - single column
- [ ] Verify navigation works on all sizes
- [ ] Verify all buttons are clickable on mobile
- [ ] Verify modals display properly on all sizes
- [ ] Verify forms are usable on mobile keyboard

### Notifications
- [ ] Add item to cart - success message
- [ ] Remove item - success message
- [ ] Complete order - success message
- [ ] Try incomplete action - warning message
- [ ] Notifications disappear after 3 seconds
- [ ] Multiple notifications don't overlap

### Data Persistence
- [ ] Add item to cart
- [ ] Refresh page - cart items should persist
- [ ] Place order
- [ ] Close browser
- [ ] Reopen application
- [ ] Order should still be visible
- [ ] Login again - user data should persist

### Animations
- [ ] Modal opens with slide-up animation
- [ ] Modal closes smoothly
- [ ] Cart count badge updates smoothly
- [ ] Notifications slide in from right
- [ ] Buttons have hover effects
- [ ] Cards have hover elevations
- [ ] All animations are smooth (no jank)

---

## 🐛 Troubleshooting Guide

### Issue: Cart is Empty After Refresh
**Solution**: 
- Check browser's storage settings
- Make sure 3rd-party cookies aren't blocked
- Try clearing cache and refreshing
- Ensure JavaScript is enabled

### Issue: Modals Not Opening
**Solution**:
- Check browser console for errors
- Ensure all HTML elements exist
- Try clicking again
- Close other modals first
- Hard refresh page (Ctrl+Shift+R)

### Issue: Prices Not Updating Correctly
**Solution**:
- Verify checkboxes are checked/unchecked
- Try refreshing the customization modal
- Check browser console for JavaScript errors
- Verify toppings prices are correct

### Issue: Order Not Appearing in My Orders
**Solution**:
- Ensure you logged in before checkout
- Verify you completed checkout
- Refresh the My Orders page
- Check browser console for errors
- Try logging out and back in

### Issue: Admin Changes Not Visible
**Solution**:
- Verify you're on the Admin page
- Try switching tabs and back
- Refresh the page
- Check that order exists in list
- Verify status dropdown changed

### Issue: Payment Method Change Not Working
**Solution**:
- Ensure you clicked the radio button
- Try selecting another method first
- Verify card fields appear/disappear
- Check browser console for errors
- Try refreshing the page

### Issue: Search Not Filtering Correctly
**Solution**:
- Clear search box completely
- Try searching with different keywords
- Verify pizza exists in menu
- Check spelling
- Try category filters instead

### Issue: Styles Look Wrong
**Solution**:
- Ensure styles.css is in same directory
- Hard refresh page (Ctrl+Shift+R)
- Clear browser cache
- Check file permissions
- Try different browser

### Issue: LocalStorage Full
**Solution**:
- Clear browser storage
- Delete old orders: `localStorage.removeItem('pizzahub_orders')`
- Delete cart: `localStorage.removeItem('pizzahub_cart')`
- Delete user: `localStorage.removeItem('pizzahub_user')`

---

## 🔍 Browser Console Testing

### View Current State
```javascript
// In browser developer console (F12):

// See current user
console.log(app.currentUser);

// See current cart
console.log(app.cart);

// See all orders
console.log(app.orders);

// See all pizzas
console.log(app.pizzas);

// See current page
console.log(app.currentPage);

// See current filter
console.log(app.currentFilter);
```

### Manually Test Functions
```javascript
// Add pizza to cart programmatically
app.currentPizza = app.pizzas[0];
document.getElementById('pizzaQuantity').value = 2;
app.addToCart();

// Clear all data
localStorage.clear();

// Show notification
app.showNotification('Test message', 'success');

// Change page
app.navigateToPage('menu');

// Place test order
app.cart = [{
  id: 1,
  name: 'Test Pizza',
  quantity: 1,
  totalPrice: 10.99
}];
app.placeOrder(); // After filling address
```

### Debug Pricing
```javascript
// Get price for customized pizza
const size = document.getElementById('pizzaSize').value;
const multiplier = {small: 0.8, medium: 1, large: 1.2, xlarge: 1.4}[size];
const basePrice = app.currentPizza.basePrice;
const sizedPrice = basePrice * multiplier;
console.log('Sized price:', sizedPrice);
```

---

## 📊 Test Data

### Sample Order
```javascript
{
  id: "ORD-1704067200000",
  userId: 1234567890,
  items: [
    {
      id: 1704067200001,
      pizzaId: 1,
      name: "Margherita",
      size: "large",
      crust: "pan",
      toppings: [{id: 1, name: "Extra Cheese", price: 1.5}],
      quantity: 2,
      unitPrice: 12.49,
      totalPrice: 24.98
    }
  ],
  address: "123 Main St, New York, NY 10001",
  paymentMethod: "credit_card",
  subtotal: 24.98,
  deliveryFee: 2.99,
  tax: 2.80,
  total: 30.77,
  status: "confirmed",
  createdAt: "2024-01-01T12:00:00Z",
  estimatedDelivery: "2024-01-01T12:30:00Z"
}
```

### Sample User
```javascript
{
  id: 1704067200000,
  name: "John Doe",
  email: "john@example.com",
  phone: "555-0123",
  registeredAt: "2024-01-01T12:00:00Z"
}
```

---

## ⚡ Performance Testing

### Metrics to Monitor
```javascript
// In browser DevTools Console:

// Measure page load time
performance.measure('pageLoad');
console.log(performance.getEntriesByName('pageLoad')[0].duration);

// Monitor localStorage size
const size = JSON.stringify(localStorage).length;
console.log('LocalStorage size:', size, 'bytes');

// Track render time
console.time('renderPizzaGrid');
app.renderPizzaGrid();
console.timeEnd('renderPizzaGrid');
```

### Expected Performance
- Page load: < 1 second
- Grid render: < 100ms
- Modal open: < 50ms
- Add to cart: < 10ms
- LocalStorage size: < 100KB

---

## ✅ Pre-Launch Checklist

- [ ] All HTML elements display correctly
- [ ] All CSS styles applied properly
- [ ] All JavaScript functions execute without errors
- [ ] All buttons are clickable and functional
- [ ] All forms validate properly
- [ ] All pages load correctly
- [ ] Navigation works between all pages
- [ ] Modals open and close correctly
- [ ] Responsive design works on all sizes
- [ ] LocalStorage persistence works
- [ ] No console errors logged
- [ ] All animations are smooth
- [ ] Notifications appear and disappear
- [ ] Cart calculations are accurate
- [ ] Order workflow completes successfully
- [ ] Admin features work correctly

---

## 🎯 Quick Test Workflow

1. **Open application**
   ```
   Open index.html in browser
   ```

2. **Register user**
   ```
   Click Login → Register tab
   Enter: John, john@email.com, password123, 555-1234
   Click Register
   ```

3. **Browse menu**
   ```
   Click Menu
   Try filters and search
   ```

4. **Add to cart**
   ```
   Click Pepperoni
   Select Large size
   Select Stuffed crust
   Add Extra Cheese
   Set quantity to 2
   Click Add to Cart
   ```

5. **Place order**
   ```
   Click Cart icon
   Click Proceed to Checkout
   Enter address: 123 Main St, New York, 10001
   Keep Credit Card selected
   Fill card: 4111111111111111, 12/25, 123
   Click Place Order
   ```

6. **Track order**
   ```
   Click My Orders
   See order status
   Click Reorder
   ```

7. **Test admin**
   ```
   Click Admin
   Change order status
   View Analytics
   Manage Menu
   ```

---

For more information, refer to README.md and ARCHITECTURE.md!
