window.addEventListener("load", updateCartAndAmounts);

function updateCartAndAmounts() {
  let text = "";
  let cart;
  let sum = 0;
  if (localStorage.getItem("cart")) {
    cart = new Map(JSON.parse(localStorage.getItem("cart")));
    for (let product of cart.keys()) {
      sum += cart.get(product);
      text += `
        <div class="display">
          <div class="product">
            <p>${product}</p>
          </div>
          <div class="amount">
            <button onclick="decreaseProductAmount('${product}')">-</button>
            <p>${cart.get(product)}</p>
            <button onclick="increaseProductAmount('${product}')">+</button>
          </div>
        </div>
      `;
    }
  }
  if (text == "") text = "<p>KOŠARICA JE PRAZNA</p>";

  document.querySelector(".display-wrapper").innerHTML = text;
  document.querySelector(".cart-amount").innerHTML = sum;

  if (sum > 0)
    document.querySelector(".cart-amount").style.visibility = "visible";
  else document.querySelector(".cart-amount").style.visibility = "hidden";

  let index = parseInt(localStorage.getItem("currentCategory")) || 0;
  let currentCategory = data.categories[index].name;
  document.querySelector(".current-category h1").innerHTML = currentCategory;
}

function decreaseProductAmount(product) {
  let cart;
  if (localStorage.getItem("cart")) {
    cart = new Map(JSON.parse(localStorage.getItem("cart")));
    if (cart.get(product) == 0) {
      alert("Proizvod je već izbrisan iz košarice!");
    } else cart.set(product, cart.get(product) - 1);
  }
  localStorage.setItem("cart", JSON.stringify([...cart]));
  updateCartAndAmounts();
}

function increaseProductAmount(product) {
  let cart;
  if (localStorage.getItem("cart")) {
    cart = new Map(JSON.parse(localStorage.getItem("cart")));
    cart.set(product, cart.get(product) + 1);
  }
  localStorage.setItem("cart", JSON.stringify([...cart]));
  updateCartAndAmounts();
}

function beforeNavigating() {
  let sum = 0;
  if (localStorage.getItem("cart")) {
    let cart = new Map(JSON.parse(localStorage.getItem("cart")));
    for (let product of cart) {
      sum += cart.get(product);
    }
  }
  if (sum == 0) emptyCart();

  window.location.href = "index.html";
}

function emptyCart() {
  localStorage.removeItem("cart");
  updateCartAndAmounts();
}
