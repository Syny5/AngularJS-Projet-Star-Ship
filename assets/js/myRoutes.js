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
  .when('/details/:id?',{
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
.controller('detailsController', function($scope, $http, $rootScope, $routeParams){
  $http.get('assets/js/products.json')
       .then(function(res) {
         $scope.products = res.data;
       });
       $scope.id=$routeParams.id;
       $scope.nom = $scope.products[$scope.id].nom;
       $scope.prix = $scope.products[$scope.id].prix;
       $scope.img = $scope.products[$scope.id].img;
       $scope.marque = $scope.products[$scope.id].marque;
       $scope.type = $scope.products[$scope.id].type;
       $scope.description = $scope.products[$scope.id].description;
       $scope.quantity = $scope.products[$scope.id].quantity;
       $scope.reference = $scope.products[$scope.id].reference;
})
.controller('categoriesController', function(){

})
