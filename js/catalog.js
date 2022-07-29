/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const catalogForm = document.getElementById('catalog');
const cartContents = document.getElementById('cartContents')
const selectParent = catalogForm.items.parentElement
const productImage = document.createElement('img');
productImage.width = 500
productImage.height = 500
selectParent.parentElement.insertBefore(productImage, selectParent.nextSibling)



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
  const selectedProduct = catalogForm.items.value
  const quantity = catalogForm.quantity.value

  // use value of Select element to grab from list of Products.
  const productObject = Product.allProducts.find(product => product.name === selectedProduct)
  cart.addItem(productObject, quantity)
}

function updateCounter() {
  const itemCount = document.getElementById('itemCount');
  let totalCount = 0;
  for (let item of cart.items) {
    totalCount += item.quantity
  }
  if (totalCount === 0) {
    itemCount.style.backgroundColor = '#12121212'
  } else {
    itemCount.style.backgroundColor = '#a16c4d75'
  }
  itemCount.innerText = totalCount
 }

function updateCartPreview() {
  cartContents.innerHTML = '';
  for (let item of cart.items) {
    const previewItemCard = document.createElement('div');
    previewItemCard.classList.add('preview-card')
    const previewImg = document.createElement('img');
    previewImg.classList.add('preview-img');
    const previewQty = document.createElement('span');
    previewQty.classList.add('preview-qty');
    previewImg.src = item.product.filePath;
    previewImg.height = 100;
    previewImg.width = 100;
    previewQty.innerText = item.quantity
    previewItemCard.append(previewImg, previewQty);
    cartContents.append(previewItemCard);
  }
}

function drawImage() {
  const selectedProduct = catalogForm.items.value
  const productObject = Product.allProducts.find(product => product.name === selectedProduct)
  productImage.src = productObject.filePath
}

function handleSelectChange(e) {
  if (e.target.tagName === 'SELECT') {
    drawImage()
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
catalogForm.addEventListener('submit', handleSubmit);
catalogForm.addEventListener('change', handleSelectChange);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
// Set counter based on current localStorage.
updateCounter();
// Draw the default/first image in the select list on page load.
drawImage();
// Draw the card preview using current localStorage.
updateCartPreview();

