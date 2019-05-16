$(function(){
    $('#emptyCart').on('click', function(){
      $('.allProductsInCartList').empty();
      location.reload();
    });
}
