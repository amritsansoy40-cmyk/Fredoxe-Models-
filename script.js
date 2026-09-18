
// Plastic Model Store - script.js

const products = [
  {
    id: 1,
    name: "Sports Car Model",
    price: 199,
    icon: "🏎️"
  },
  {
    id: 2,
    name: "Military Vehicle Model",
    price: 249,
    icon: "🚙"
  },
  {
    id: 3,
    name: "Classic Car Model",
    price: 299,
    icon: "🚗"
  },
  {
    id: 4,
    name: "Aircraft Model",
    price: 349,
    icon: "✈️"
  }
];

let cart = [];

// Show products
function renderProducts() {
  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="card">
      <div class="pic">${product.icon}</div>

      <h3>${product.name}</h3>

      <div class="price">
        ₹${product.price}
      </div>

      <button
        class="btn primary"
        onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join("");
}

// Add product to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  cart.push(product);
  renderCart();
}

// Remove product
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Display cart
function renderCart() {
  const cartBox = document.getElementById("cart");
  const totalBox = document.getElementById("total");

  if (!cartBox || !totalBox) return;

  if (cart.length === 0) {
    cartBox.textContent = "Cart is empty.";
    totalBox.textContent = "0";
    return;
  }

  cartBox.innerHTML = cart.map((product, index) => `
    <div class="item">
      <span>${product.name}</span>

      <span>
        ₹${product.price}

        <button
          class="btn secondary"
          onclick="removeFromCart(${index})">
          ×
        </button>
      </span>
    </div>
  `).join("");

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  totalBox.textContent = total;
}

// Place order
function placeOrder() {

  if (cart.length === 0) {
    showStatus(
      "Please add a product to your cart first.",
      "red"
    );
    return;
  }

  const name =
    document.getElementById("name")?.value.trim();

  const phone =
    document.getElementById("phone")?.value.trim();

  const address =
    document.getElementById("address")?.value.trim();

  const distance =
    parseFloat(
      document.getElementById("distance")?.value
    );

  if (!name || !phone || !address) {
    showStatus(
      "Please enter your name, phone and address.",
      "red"
    );
    return;
  }

  if (isNaN(distance)) {
    showStatus(
      "Please enter your distance from the store.",
      "red"
    );
    return;
  }

  // 5 KM delivery limit
  if (distance > 5) {
    showStatus(
      "Sorry! Delivery is available only within 5 km.",
      "red"
    );
    return;
  }

  const total =
    cart.reduce(
      (sum, product) => sum + product.price,
      0
    );

  showStatus(
    `Order ready! Total: ₹${total}. Delivery available within 5 km.`,
    "green"
  );
}

// Status message
function showStatus(message, color) {

  const status =
    document.getElementById("status");

  if (!status) return;

  status.textContent = message;
  status.style.color = color;
}


// 🤖 Simple AI-style assistant
function askAI() {

  const input =
    document.getElementById("aiInput");

  const chat =
    document.getElementById("chat");

  if (!input || !chat) return;

  const question =
    input.value.trim();

  if (!question) return;

  chat.innerHTML += `
    <div class="msg me">
      ${escapeHTML(question)}
    </div>
  `;

  const q = question.toLowerCase();

  let answer = "";

  if (
    q.includes("delivery") ||
    q.includes("deliver")
  ) {
    answer =
      "🚚 We currently deliver only within 5 km of the store.";
  }

  else if (
    q.includes("car")
  ) {
    answer =
      "🏎️ We have Sports Car and Classic Car models.";
  }

  else if (
    q.includes("price") ||
    q.includes("₹") ||
    q.includes("under")
  ) {

    const number =
      q.match(/\d+/);

    if (number) {

      const budget =
        Number(number[0]);

      const results =
        products.filter(
          product => product.price <= budget
        );

      if (results.length > 0) {

        answer =
          results
            .map(
              p => `${p.name} — ₹${p.price}`
            )
            .join("<br>");

      } else {

        answer =
          "😕 I couldn't find a model in that price range.";
      }

    } else {

      answer =
        products
          .map(
            p => `${p.name} — ₹${p.price}`
          )
          .join("<br>");
    }
  }

  else {

    answer =
      "🤖 I can help you with products, prices, cart and 5 km delivery.";
  }

  chat.innerHTML += `
    <div class="msg">
      ${answer}
    </div>
  `;

  chat.scrollTop =
    chat.scrollHeight;

  input.value = "";
}


// Security helper
function escapeHTML(text) {

  return text.replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character])
  );
}


// Start website
renderProducts();
renderCart();
