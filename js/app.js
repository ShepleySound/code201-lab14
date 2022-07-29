'use strict';

// Cart constructor.
const Cart = function(items) {
  // this.items is an array of CartItem instances.
  this.items = items;
};

Cart.prototype.addItem = function(product, quantity) {
    quantity = parseInt(quantity)

    // Finding the item in the cart using the object reference.
    const existingItem = this.items.find(item => item.product.name === product.name)
    if (quantity > 0) {
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push(new CartItem(product, quantity)); 
      }
    }
};

Cart.prototype.saveToLocalStorage = function() {
  // TODO: Fill in this instance method to save the contents of the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(this.items))
};

Cart.prototype.removeItem = function(item) {
  // Finding the item in the cart using them product NAME as a string.
  const itemIndex = this.items.findIndex(cartItem => cartItem.product.name === item)
  this.items.splice(itemIndex, 1)
};

const CartItem = function(product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

// Product contructor.
const Product = function(filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function generateCatalog() {
  new Product('assets/bag.jpg', 'Bag');
  new Product('assets/banana.jpg', 'Banana');
  new Product('assets/bathroom.jpg', 'Bathroom');
  new Product('assets/boots.jpg', 'Boots');
  new Product('assets/breakfast.jpg', 'Breakfast');
  new Product('assets/bubblegum.jpg', 'Bubblegum');
  new Product('assets/chair.jpg', 'Chair');
  new Product('assets/cthulhu.jpg', 'Cthulhu');
  new Product('assets/dog-duck.jpg', 'Dog-Duck');
  new Product('assets/dragon.jpg', 'Dragon');
  new Product('assets/pen.jpg', 'Pen');
  new Product('assets/pet-sweep.jpg', 'Pet Sweep');
  new Product('assets/scissors.jpg', 'Scissors');
  new Product('assets/shark.jpg', 'Shark');
  new Product('assets/sweep.png', 'Sweep');
  new Product('assets/tauntaun.jpg', 'Taun-Taun');
  new Product('assets/unicorn.jpg', 'Unicorn');
  new Product('assets/water-can.jpg', 'Water Can');
  new Product('assets/wine-glass.jpg', 'Wine Glass');
}

// Change location of loadCart() and cart initialization to allow for
// data persistance between both pages.
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  return new Cart(cartItems);
}

const cart = loadCart()

// Initialize the app by creating the big list of products with images and names
generateCatalog();