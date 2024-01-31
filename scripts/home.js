import { products } from "../data/product.js";
import { cart } from "../data/cart.js";
import { addToCart } from "../data/cart.js";


let productHtml = '';

products.forEach((product) => {
    productHtml += `
    <div class="item">
            <img width="187"style="border-radius: 2px" src="${product.image}">
            <div class="details">
                <p class="name">${product.name}</p>
                <div class="prices">
                    <p style="font-size: 12px; color: #ee4d2d;" class="pesoSign">₱</p>
                    <p style="font-size: 15px; color: #ee4d2d;" class="price">${product.price}</p>
                </div>
                <div class="ratingsAndNumOfSold">
                    <span>
                        <img width="50" class="ratings" src="images/ratings/rating-${product.rating.stars * 10}.png">
                    </span>
                    <p style="font-size: 11px; padding-top: 4px;" class="sold">${product.rating.sold} Sold</p>
                </div>
                <p class="place" style="font-size: 11px; color: rgba(104, 98, 98, 0.87);">${product.placeOfShop}</p>
                <div class="addToCart">
                    <button class="addToCartButton" data-product-id= "${product.id}">
                        Add To Cart</button>
                </div>
                <!-- <div class="buttons">
                    <span class="material-symbols-outlined minusSymbol">
                        remove
                    </span>
                    <div class="quantity">0</div>
                    <span class="material-symbols-outlined plusSymbol">
                        add
                    </span>
                </div> -->
            </div>
        </div>
    `
})

document.querySelector('.shop').innerHTML = productHtml;


//shows how many items are in the cart
function calculateCart(){
    let totalQuantity = 0;
    cart.forEach((items) => {
        totalQuantity += items.quantity;
    })

    document.querySelector('.cartAmount').innerHTML = totalQuantity;

}

//this is to update the quantity of the cart so that it wont always start at 0 if being reload.
function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.cartAmount')
      .innerHTML = cartQuantity;
  }
  
updateCartQuantity();

// for add to cart button
document.querySelectorAll('.addToCartButton').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId
        addToCart(productId);
        calculateCart();
        updateCartQuantity()
    })
})