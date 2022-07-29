/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
const tbodyElem = table.querySelector('tbody')

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  const rows = tbodyElem.querySelectorAll(`tr`)
  for (let row of rows) {
    row.remove()
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  for (let i = 0; i < cart.items.length; i++){
    const row = document.createElement ('tr')
    tbodyElem.append(row);

    const tdRemove = document.createElement ('td');
    const removeButton = document.createElement('button')
    removeButton.innerText = 'X'
    removeButton.classList.add('remove-button')
    tdRemove.append(removeButton)

    const tdName = document.createElement('td');
    tdName.classList.add('cart-productName')
    tdName.textContent = `${cart.items[i].product.name}`;

    const tdQuantity = document.createElement('td');
    tdQuantity.textContent = cart.items[i].quantity;

    row.append(tdRemove, tdQuantity, tdName)
  }

}

function removeItemFromCart(event) {
  if (event.target.classList.contains('remove-button')) {
    const row = event.target.parentElement.parentElement
    const removeItemName = row.querySelector('.cart-productName').innerText
    cart.removeItem(removeItemName);
    cart.saveToLocalStorage();
    renderCart();
  }

}

// This will initialize the page and draw the cart on screen
renderCart();
