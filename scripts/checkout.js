import { cart } from "../data/cart.js";
import { products } from "../data/product.js";
import { removeFromCart } from "../data/cart.js";
import { addButton,subButton } from "../data/cart.js";


let cartSummary = '';
cart.forEach((items) => {
    let productID = items.productId;

    let matchingProducts;
    products.forEach((productDetails) => {
        if (productDetails.id === productID){
            matchingProducts = productDetails;
        }
    })

    console.log(matchingProducts);
    cartSummary += `
    <div class="cartItems js-cart-container-${matchingProducts.id}">
        <div class="productPic">
            <img class="image" src="${matchingProducts.image}">
            <p class="productName">${matchingProducts.name}</p>
        </div>
        <div class="action">
            <p class="productPriceS">₱${matchingProducts.price}</p>
            <p class="productQuant">
                <button class="quantityButton minusButton" style="padding: 5px 12px;" data-product-id = "${matchingProducts.id}">-</button>
                <span class="quantityValue quantity-value-${matchingProducts.id}">${items.quantity}</span>
                <button class="quantityButton addbutton" data-product-id = "${matchingProducts.id}">+</button>
            </p>
            <p class="productPrice product-price-${matchingProducts.id}">₱${matchingProducts.price * items.quantity}</p>
            <button class="productActions" data-product-id = "${matchingProducts.id}">Delete</button>
        </div>
    </div>
    `
})

document.querySelector('.summary').innerHTML = cartSummary;



//event listeners for delete buttons
document.querySelectorAll('.productActions').forEach((deleteButtons) => {
    deleteButtons.addEventListener('click',() => {
        let productID = deleteButtons.dataset.productId
        removeFromCart(productID);
        
        let container = document.querySelector(`.js-cart-container-${productID}`)

        container.remove()
    })
})

// event listeners for minus button
document.querySelectorAll('.minusButton').forEach((minButton) => {
    minButton.addEventListener('click', () => {
        let productID = minButton.dataset.productId
        subButton(productID)
    })
})

//event listeners for add buttons
document.querySelectorAll('.addbutton').forEach((addbutton) => {
    addbutton.addEventListener('click', () => {
        let productID = addbutton.dataset.productId
        addButton(productID)
    })
})







