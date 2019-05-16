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
  // "Si on se retrouve sur une page sans route, nous sommes de retour vers l'accueil."
  .otherwise({
    redirectTo: '/home'
  });
});

// Controller principal : page d'accueil du site
starShipApp.controller('homeController', function(){

})
// Controller des produits
.controller('ProductsCtrl', function($scope, $http) {
  $http.get('assets/js/products.json')
       .then(function(res) {
         $scope.products = res.data;
       });
})
// Controller du panier
.controller('cartController', function($scope){
  // Fonction qui supprime le vaisseau du panier au clic sur le bouton Supprimer
      $scope.remove = function ($index) {
          // On supprime le vaisseau du tableau en donnant son $index en paramètre
          $scope.cartList.splice($index, 1);
      };
      //Fonction vider le panier : au clic, on vide la div qui contient les éléments du produit et on recharge la page.
      $('#emptyCart').on('click', function(){
      $('.allProductsInCartList').empty();
      location.reload();
    });
    // On récupère la fonction totale déclarée plus bas dans notre controller.
    $scope.totalPanier = total;
})
// Controller - description des produits
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
       // Ajout de la fonction "addCart" qui permet d'ajouter au panier.
       $scope.addCart = function() {
         // La variable test permet de dire "quand le booléen est true"
           var test = true;
           // Déclaration d'une boucle avec i.
           for (var i = 0; i < $rootScope.cartList.length; i++) {
             // Si un élément est déjà dans le panier, on ne peut pas le remettre
             if ($rootScope.cartList[i] == $scope.products[$scope.id]) {
               alert('Ce produit est déjà dans votre panier. Pour un meilleur équilibre des richesses, vous ne pouvez acheter qu\'une seule sorte de vaisseau par commande.');
               test = false;
             }
           }
           if (test) {
             $rootScope.cartList.push($scope.products[$scope.id]);
             // Calculons le total
             total += $scope.products[$scope.id].prix;
             $routeScope.total = total;
           }
         };
         // Fonction pop-up "ajouté au panier"
         $('.popupAjout').hide();
         $('.addToCart').click(function showAlert() {
         $('.popupAjout').show().delay(1000).fadeOut(1000);
        })
})
