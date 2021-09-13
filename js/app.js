// fetch data from api and showing in  UI 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // dynamically showing product rating
    const rateCount = product.rating.rate
    let rating = ''
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (Math.floor(rateCount) > i) {
        rating += ('<i class="fas fa-star"></i>')
      } else if ((rateCount + '').includes('.') && count == 0) {
        rating += ('<i class="fas fa-star-half-alt"></i>')
        count++
      } else {
        rating += ('<i class="far fa-star"></i>')
      }
    }
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
    <div>
    <img class="product-image" src=${image}></img>
    </div>
    <h3 class='title'>${product.title.slice(0, 50)}</h3>
    <p class='m-0 p-1'><b>Category: <span class='category'>${product.category}</span></b></p>
    <p class='m-0 p-0'><b>Ratings: <span class='text-warning'>${rating}</span> ${product.rating.rate}</b></p>
    <p class='mb-1'><b>Total Review: <i class="fas fa-user-tie"></i> ${product.rating.count}</b></p>
    <h2>Price: $ ${product.price}</h2>
    <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
    <button id="details-btn" class="btn btn-primary details">Details</button></div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
//calculating purchase cost with tax
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};
// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};
// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};
// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};
//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
