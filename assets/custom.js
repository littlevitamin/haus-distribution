// Check if the product's metafield value meets the condition for inclusion in the collection
function shouldAddToCollection(product) {
  // Replace 'metafield_key' with the key of your metafield
  var metafieldValue = product.metafields.custom.badges.value;
  
  // Replace 'desired_value' with the value that determines inclusion in the collection
  return metafieldValue === 'Special Offer';
}

// Get the collection ID where you want to add the product
var collectionId = 'special-offers';

// Add the product to the collection
function addToCollection(productId) {
  var data = {
    id: collectionId,
    collects: [{ product_id: productId }]
  };
  
  fetch('/admin/collects.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': '{{ shop.request_forgery_protection_token }}'
    },
    body: JSON.stringify({ collect: data })
  })
  .then(function(response) {
    // Handle response as needed
    console.log(response);
  })
  .catch(function(error) {
    // Handle error
    console.error(error);
  });
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get the product ID from the page
  var productId = Shopify?.productId;
  
  if (productId) {
    // Get the product data
    fetch('/admin/products/' + productId + '.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var product = data.product;
      
      if (shouldAddToCollection(product)) {
        addToCollection(productId);
      }
    })
    .catch(function(error) {
      // Handle error
      console.error(error);
    });
  }
});