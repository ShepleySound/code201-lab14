/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    const option = document.createElement('option')
    option.innerText = Product.allProducts[i].name
    option.value = Product.allProducts[i].name
    selectElement.append(option)
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  event.preventDefault()

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart() {
  const selectElement = document.getElementById('items');
  const selectedProduct = selectElement.value
  const quantityInput = document.getElementById('quantity')
  const quantity = quantityInput.value

  // use value of Select element to grab from list of Products.
  const productObject = Product.allProducts.find(product => product.name === selectedProduct)
  cart.addItem(productObject, quantity)
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  const itemCount = document.getElementById('itemCount');
  let totalCount = 0;
  for (let item of cart.items) {
    totalCount += item.quantity
  }
  itemCount.innerText = totalCount
 }

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
