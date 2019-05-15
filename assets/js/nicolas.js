//au demarrage de mon appli
starShipApp.run(function($rootScope, $http){
  $http.get("assets/js/products.json")
  .then(function(response) {
    // reponse.data correspond au données du JSON et le renvoi dans la variable 'element'
    $rootScope.products = response.data;
    console.log($rootScope.products);
  });
});
