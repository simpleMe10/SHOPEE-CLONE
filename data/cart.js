import { products } from "./product.js";


export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'product1',
    quantity: 2
},
{
    productId: 'product2',
    quantity: 1
}]


function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

// add to cart function to be used in add to cart button
export function addToCart(productId){
    let matchingItems; 
    cart.forEach((items) => {
        if(productId === items.productId){
            matchingItems = items
        }
    })

    if(matchingItems){
        matchingItems.quantity += 1;
    }else{
        cart.push({
            productId: productId,
            quantity: 1
        })
    }

    saveToLocalStorage()

}

// removing item from cart function
export function removeFromCart(productId){
    let matcItems = []
    cart.forEach((cartItems) => {
        if (cartItems.productId !== productId){
            matcItems.push(cartItems)
        }
    })

    cart = matcItems;
    saveToLocalStorage()
}

// function for the add button
export function addButton(productID) {
    cart.forEach((item) => {
        if (item.productId === productID) {
            item.quantity += 1;
            updateQuantityValue(productID, item.quantity);

        }

    });
}

// function for the minus button
export function subButton(productID) {
    cart.forEach((item) => {
        if (item.productId === productID && item.quantity > 1) {
            item.quantity -= 1;
            updateQuantityValue(productID, item.quantity); // Update the displayed quantity
        }

    });
}


// Function to update the displayed quantity in the DOM
function updateQuantityValue(productID, quantity) {
    document.querySelector(`.quantity-value-${productID}`).innerHTML = quantity;


        // Update the product price based on the new quantity
        let matchingProduct;

        products.forEach((item) => {
            if (item.id === productID){
                matchingProduct = item;
            }
        })

        if (matchingProduct) {
            const productPriceElement = document.querySelector(`.product-price-${productID}`);
            if (productPriceElement) {
                productPriceElement.textContent = `₱${matchingProduct.price * quantity}`;
            }
        }
        saveToLocalStorage()
    }






