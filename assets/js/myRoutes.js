// Déclaration de l'app principale
var starShipApp = angular.module('starShipApp', ['ngRoute'])
var total = 0;
starShipApp.run(function($rootScope, $http){
  //j'initialise mes tableaux
    $rootScope.cartList=[];

    $http.get("products.json")
    .then(function(response) {
      // reponse.data correspond au données du JSON et le renvoi dans la variable 'element'
        $rootScope.products = response.data;
        console.log($rootScope.products);
      });
});
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
.controller('cartController', function($scope, $rootScope, $window){
  $rootScope.cartList = [];


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

       $scope.addCart = function() {
           var test = true;
           for (var i = 0; i < $rootScope.cartList.length; i++) {
             if ($rootScope.cartList[i] == $scope.products[$scope.id]) {
               alert('Élement déjà présent dans le panier');
               test = false;
             }
           }
           if (test) {
             // console.log($scope.element[$scope.id]);
             $rootScope.cartList.push($scope.products[$scope.id]);
             console.log('Panier après ajout :');
             console.log($rootScope.cartList);
             console.log('Prix article :');
             console.log($scope.products[$scope.id].prix);
             total += $scope.products[$scope.id].prix;
             console.log('Total panier :');
             console.log(total);
             $routeScope.total = total;
           }
         };
})
.controller('categoriesController', function(){

})
