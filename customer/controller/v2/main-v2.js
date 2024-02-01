import productSerV from "../../services/services.js";

let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = (productsToShow) => {
  listProductHTML.innerHTML = "";
  if (productsToShow.length > 0) {
    productsToShow.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("product-item");
      newProduct.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="product-image">
        <div class="item-text">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price}</p>
        </div>
        <div class="rate">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <p class="product-screen">Screen: ${product.screen}</p>
        <p class="product-backCamera">Back Camera: ${product.backCamera}</p>
        <p class="product-frontCamera">Front Camera: ${product.frontCamera}</p>
        <p class="product-desc">${product.desc}</p>
        <button class="add-to-cart" data-id="${product.id}"><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.getElementById("productFilter");
  if (selectElement) {
    selectElement.addEventListener("change", filterProducts);
    filterProducts(); 
  }
});

function filterProducts() {
  const selectedType = document.getElementById("productFilter").value;
  let filteredProducts = selectedType === "all" ? products : products.filter(product => product.type.toLowerCase() === selectedType.toLowerCase());
  addDataToHTML(filteredProducts);
}

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("add-to-cart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
    alert("Thêm vào giỏ hàng thành công")
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  console.log(cart);
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0; 

  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      let product = products.find((p) => p.id == item.product_id);
      if (product) {
        totalPrice += product.price * item.quantity; 

        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.product_id;
        newItem.innerHTML = `
            <div class="image">
              <img src="${product.img}">
            </div>
            <div class="name">
              ${product.name}
            </div>
            <div class="totalPrice">$${product.price * item.quantity}</div>
            <div class="quantity">
              <span class="minus"><</span>
              <span>${item.quantity}</span>
              <span class="plus">></span>
            </div>
          `;
        listCartHTML.appendChild(newItem);
      }
    });
  }

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total-price");
  totalDiv.textContent = `Tổng Tiền: $${Math.round(totalPrice)}`; 
  listCartHTML.appendChild(totalDiv);

  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = 'minus';
      if(positionClick.classList.contains('plus')){
          type = 'plus';
      }
      changeQuantityCart(product_id, type);
  }
})

const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if(positionItemInCart >= 0){
      let info = cart[positionItemInCart];
      switch (type) {
          case 'plus':
              cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
              break;
      
          default:
              let changeQuantity = cart[positionItemInCart].quantity - 1;
              if (changeQuantity > 0) {
                  cart[positionItemInCart].quantity = changeQuantity;
              }else{
                  cart.splice(positionItemInCart, 1);
              }
              break;
      }
  }
  addCartToHTML();
  addCartToMemory();
}

const clearCart = () => {
  cart = []; 
  addCartToMemory(); 
  addCartToHTML(); 
};

document.querySelector('.clear_all').addEventListener('click', () => {
  clearCart(); 
});

const fectProductList = () => {
  productSerV
    .getProductListApi()
    .then((res) => {
      console.log("🚀 ~ .then ~ res:", res);
      products = res.data;
      addDataToHTML(products);
      if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    })
    .catch((err) => {
      console.log("🚀 ~ .then ~ err:", err);
    });
};
fectProductList();
