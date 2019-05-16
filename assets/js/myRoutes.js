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
  // Déclaration de toutes les routes / views avec leur controller attitré
  .when('/home',{
    controller: 'homeController',
    templateUrl: 'partials/home.html'
  })
  .when('/products',{
    controller: 'productsController',
    templateUrl: 'partials/products.html'
  })
  .when('/cart/:id?',{
    controller: 'cartController',
    templateUrl: 'partials/cart.html'
  })
  .when('/details/:id?',{
    controller: 'detailsController',
    templateUrl: 'partials/details.html'
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
.controller('cartController', function($scope){
  // Fonction qui supprime l'item du panier au clic sur le bouton Supprimer
      $scope.remove = function ($index) {
          // On supprime un item du tableau en donnant son $index en paramètre
          $scope.cartList.splice($index, 1);
      };
      $('#emptyCart').on('click', function(){
      $('.allProductsInCartList').empty();
      location.reload();
  });

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
             // Si un élément est déjà dans le panier, on ne peut pas le remettre
             if ($rootScope.cartList[i] == $scope.products[$scope.id]) {
               alert('Ce produit est déjà dans votre panier. Pour un meilleur équilibre des richesses, vous ne pouvez acheter qu\'une seule sorte de vaisseau par commande.');
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
         $('.popupAjout').hide();
         $('.addToCart').click(function showAlert() {
         $('.popupAjout').show().delay(1000).fadeOut(1000);
        })
})
