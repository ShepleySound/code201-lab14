/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;
const tbodyElem = table.querySelector('tbody')

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
function clearCart() {
  const rows = tbodyElem.querySelectorAll(`tr`)
  for (let row of rows) {
    console.log(row)
    row.remove()
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  for (let i = 0; i < cart.items.length; i++){
    let trElem = document.createElement ('tr')
    tbodyElem.appendChild (trElem);
    let tdRemoveElem = document.createElement ('td');
    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    tdRemoveElem.append(removeButton)
    trElem.appendChild(tdRemoveElem);
    let tdNameElem = document.createElement('td');
    tdNameElem.classList.add('cart-productName')
    tdNameElem.textContent = `${cart.items[i].product.name}`;
    trElem.appendChild(tdNameElem)
    let tdQuantityElem = document.createElement('td');
    tdQuantityElem.textContent = 'QUANTITY number';
    trElem.appendChild(tdQuantityElem);
  }

}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  const row = event.target.parentElement.parentElement
  const removeItemName = row.querySelector('.cart-productName').innerText
  cart.removeItem(removeItemName);
  cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
