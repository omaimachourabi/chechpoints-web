let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Iphone',
        tag: 'iphone',
        price: 1359,
        incart: 0
    },
    {
        name: 'Nokia',
        tag: 'nokia',
        price: 740,
        incart: 0
    },
    {
        name: 'Sumsung',
        tag: 's20',
        price: 909,
        incart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        displayCart(products[i]);

    })
}
function onloadcartNumbers() {

    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;

    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');



    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productcontiner = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    // console.log(cartItems);

    if (cartItems && productcontiner) {
        productcontiner.innerHTML = '';
        Object.values(cartItems).map(item => {
            productcontiner.innerHTML += `

            <div class="product">
            <img src="./image/${item.tag}.jpg" />
            <span>${item.name}</span>
        </div>
        <div class="price">$${item.price}</div>
        <div class="quantity">
        <span>${item.incart}</span>
        </div>
        <div class="total">
        $${item.incart * item.price},00
        </div>

            `
        });

        productcontiner.innerHTML +=`
        <div class="phonetotalcontiner">
        <h3 class="phonetotaltitle">
                phone total</h3>
                <h3 class="phonetotal>
                $${cartCost},00</h3>
        `
    }
}

onloadcartNumbers();
displayCart();
