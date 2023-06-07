var products_on_page = $('.product-list');
var next_url = products_on_page.data('next-url');

$.ajax(
  {
    url: next_url,
    type: 'GET',
    dataType: 'html'
  }
).done(function(next_page) {

  var new_products = $(next_page).find('product-list');
  var new_url = new_products.data('next-url');

  next_url = new_url;
  
  products_on_page.append(new_products.html());
})