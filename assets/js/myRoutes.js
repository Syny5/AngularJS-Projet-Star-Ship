// Déclaration de l'app principale
var starShipApp = angular.module('starShipApp', ['ngRoute'])
starShipApp.config(function($routeProvider){
  $routeProvider
  .when('/home',{
    controller: 'homeController',
    templateUrl: 'partials/home.html'
  })
  .when('/products',{
    controller: 'productsController',
    templateUrl: 'partials/products.html'
  })
  .when('/cart',{
    controller: 'cartController',
    templateUrl: 'partials/cart.html'
  })
  .when('/details',{
    controller: 'detailsController',
    templateUrl: 'partials/details.html'
  })
  .when('/categories',{
    controller: 'categoriesController',
    templateUrl: 'partials/categores.html'
  })
  .otherwise({
    redirectTo: '/home'
  });
});

// Controller principal : page d'accueil du site
starShipApp.controller('homeController', function(){

})
.controller('ProductsCtrl', function($scope, $http) {
  $http.get('assets/js/products.json')
       .then(function(res) {
         $scope.products = res.data;
       });
})
.controller('productsController', function(){

})
.controller('cartController', function(){

})
.controller('detailsController', function($scope, $http){
  $http.get('assets/js/products.json')
       .then(function(res) {
         $scope.products = res.data;
       });
})
.controller('categoriesController', function(){

})
