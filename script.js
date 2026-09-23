let cart = JSON.parse(
    localStorage.getItem("deffbitesCart") || "[]"
);


function saveCart() {

    localStorage.setItem(
        "deffbitesCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    renderCart();
}


function updateCartCount() {

    const count = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    document.getElementById("cartCount").textContent = count;
}


function addToCart(name, price, img, restaurant) {

    const found = cart.find(
        item => item.name === name
    );

    if (found) {

        found.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            img: img,
            restaurant: restaurant,
            qty: 1
        });

    }

    saveCart();

    alert(name + " added to cart!");
}


function changeQty(index, delta) {

    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}


function clearCart() {

    cart = [];

    saveCart();
}


function renderCart() {

    const box = document.getElementById("cartItems");

    if (!box) {
        return;
    }

    box.innerHTML = "";


    const itemCount = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );


    document.getElementById(
        "cartItemsCount"
    ).textContent = "(" + itemCount + " items)";


    let total = 0;


    if (cart.length === 0) {

        box.innerHTML = `
            <div class="cart-row">
                <div style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:30px;
                ">
                    Your cart is empty.
                    Add something delicious.
                </div>
            </div>
        `;

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.qty;


            box.innerHTML += `
                <div class="cart-row">

                    <img src="${item.img}">

                    <div>
                        <b>${item.name}</b>

                        <p>${item.restaurant}</p>

                        <p>₹${item.price}</p>
                    </div>


                    <div class="qty">

                        <button
                            onclick="changeQty(${index}, -1)"
                        >
                            −
                        </button>

                        ${item.qty}

                        <button
                            onclick="changeQty(${index}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <b>
                        ₹${item.price * item.qty}
                    </b>


                    <button
                        class="remove"
                        onclick="changeQty(${index}, -999)"
                    >
                        🗑
                    </button>

                </div>
            `;

        });

    }


    document.getElementById(
        "itemTotal"
    ).textContent = "₹" + total;


    document.getElementById(
        "grandTotal"
    ).textContent = "₹" + (total + 72);
}


function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert("Order placed successfully!");

    clearCart();

    showPage("home");
}


function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(
            p => p.classList.remove("active-page")
        );


    const target =
        document.getElementById(page);


    if (target) {
        target.classList.add("active-page");
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.page === page
                );

            }
        );


    window.scrollTo(0, 0);

    renderCart();
}


updateCartCount();

renderCart();