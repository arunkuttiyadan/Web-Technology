let cart = [];
let couponDiscount = 0;

const products = {
  electronics: [
    { name: "Mobile", price: 15000 },
    { name: "Laptop", price: 60000 },
    { name: "Headphones", price: 2000 }
  ],
  clothing: [
    { name: "T-Shirt", price: 800 },
    { name: "Jeans", price: 2000 },
    { name: "Jacket", price: 3500 }
  ],
  grocery: [
    { name: "Rice", price: 1200 },
    { name: "Oil", price: 180 },
    { name: "Milk", price: 60 }
  ]
};

function loadProducts() {
  let category = document.getElementById("category").value;
  let productSelect = document.getElementById("product");
  productSelect.innerHTML = `<option value="">Select Product</option>`;

  if (category) {
    products[category].forEach(p => {
      productSelect.innerHTML +=
        `<option value="${p.price}">${p.name}</option>`;
    });
  }

  document.getElementById("price").value = "";
}

function setPrice() {
  document.getElementById("price").value =
    document.getElementById("product").value;
}

function addProduct() {
  let category = document.getElementById("category").value;
  let product = document.getElementById("product");
  let name = product.options[product.selectedIndex].text;
  let price = parseFloat(document.getElementById("price").value);
  let qty = parseInt(document.getElementById("qty").value);

  if (!category || !name || !price || !qty) {
    alert("All fields are required");
    return;
  }

  cart.push({ name, price, qty, category });
  displayCart();
}

function removeProduct(index) {
  cart.splice(index, 1);
  displayCart();
}

function applyCoupon() {
  let code = coupon.value.trim().toUpperCase();
  let msg = document.getElementById("couponMsg");

  if (code === "SAVE10") {
    couponDiscount = 10;
    msg.innerText = "Coupon SAVE10 applied! 10% discount added.";
    msg.style.color = "green";
  } else if (code.startsWith("FEST")) {
    couponDiscount = 20;
    msg.innerText = "Festival coupon applied! 20% discount added.";
    msg.style.color = "green";
  } else {
    couponDiscount = 0;
    msg.innerText = "Invalid coupon code";
    msg.style.color = "red";
  }

  displayCart();
}

function calculateDiscount(item) {
  let discount = 0;

  if (item.qty >= 5) {
    discount += 10;
  }

  if (item.category === "electronics") {
    discount += 5;
  } else if (item.category === "clothing") {
    discount += 8;
  }

  return discount;
}

function displayCart() {
  let cartTable = document.getElementById("cart");
  cartTable.innerHTML = "";
  let totalBill = 0;

  cart.forEach((item, index) => {
    let discount = calculateDiscount(item);
    let finalPrice = item.price * item.qty * (1 - discount / 100);

    totalBill += finalPrice;

    cartTable.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>₹${item.price}</td>
        <td>${item.qty}</td>
        <td>₹${finalPrice.toFixed(2)}</td>
        <td><button onclick="removeProduct(${index})">Remove</button></td>
      </tr>
    `;
  });

  totalBill -= totalBill * (couponDiscount / 100);
  document.getElementById("bill").innerText =
    `Total: ₹${totalBill.toFixed(2)}`;
}
