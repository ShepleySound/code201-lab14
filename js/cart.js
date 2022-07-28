/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  let cartTableElem = document.getElementById('cart');
  let tbodyElem = cartTableElem.querySelector('tbody');
  for (let i = 0; i < Products.allproducts.length; i++){
    let trElem = document.createElement ('tr')
    tbodyElem.appendChild (trElem);
    let tdRemoveElem = document.createElement ('td');
    tdRemoveElem.textContent = 'REMOVE ITEM BUTTON?';
    trElem.appendChild(tdRemoveElem);
    let tdQuantityElem = document.createElement('td');
    tdQuantityElem.textContent = 'QUANTITY number';
    trElem.appendChild(tdQuantityElem);
    let tdNameElem = document.createElement('td');
    tdNameElem.textContent = `${product.allproducts[i].name}`;
  }

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
