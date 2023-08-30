document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");
    const cartItems = document.querySelector(".cart-items");
    const totalElement = document.querySelector(".total");
    const taxElement = document.querySelector(".tax");
    const totalPaymentElement = document.querySelector(".total-payment");

    const cart = {}; // Objek untuk menyimpan item dalam keranjang

    items.forEach(function(item) {
        const addButton = item.querySelector(".add-button");
        const removeButton = item.querySelector(".remove-button");
        const price = parseFloat(item.querySelector(".price").textContent.replace("Rp", "").replace(",", ""));
        const quantityElement = item.querySelector(".quantity");
        const itemId = item.getAttribute("data-id"); // Mendapatkan ID item

        addButton.addEventListener("click", function() {
            cart[itemId] = (cart[itemId] || 0) + 1;
            updateCart();
            updateQuantity(quantityElement, 1);
        });

        removeButton.addEventListener("click", function() {
            if (cart[itemId] > 0) {
                cart[itemId]--;
                updateCart();
                updateQuantity(quantityElement, -1);
            }
        });
    });

    function updateCart() {
        cartItems.innerHTML = ""; // Clear previous items

        items.forEach(function(item) {
            const price = parseFloat(item.querySelector(".price").textContent.replace("Rp", "").replace(",", ""));
            const itemId = item.getAttribute("data-id"); // Mendapatkan ID item
            const quantity = cart[itemId] || 0;

            if (quantity > 0) {
                const itemName = item.querySelector("h3").textContent;
        
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-box"); // Add a new class for styling
                cartItem.innerHTML = `
                <img src="${item.querySelector("img").src}" alt="${itemName}">
                <p>${itemName} x${quantity}</p>
                <p class="cart-price">Rp${(price * quantity).toFixed(2)}</p>
                `;
        
                cartItems.appendChild(cartItem);
            }
       
        });

        const cartValues = Object.values(cart);
        const cartTotal = cartValues.reduce((acc, val, index) => acc + (val * parseFloat(items[index].querySelector(".price").textContent.replace("Rp", "").replace(",", ""))), 0);

        const tax = cartTotal * 0.11;
        const totalPayment = cartTotal + tax;

        totalElement.textContent = `Rp${cartTotal.toFixed(2)}`;
        taxElement.textContent = `Rp${tax.toFixed(2)}`;
        totalPaymentElement.textContent = `Rp${totalPayment.toFixed(2)}`;
    }

    function updateQuantity(element, change) {
        const currentQuantity = parseInt(element.textContent);
        const newQuantity = currentQuantity + change;

        if (newQuantity >= 0) {
            element.textContent = newQuantity;
        }
    }

    function formatPrice(price) {
        return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    }
    
});
