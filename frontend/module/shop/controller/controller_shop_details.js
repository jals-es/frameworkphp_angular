restaurant.controller('controller_shop_details', function($scope, $http, services, $window, prod) {

    $scope.producto = prod;

    localStorage.removeItem('filters_shop');
    localStorage.removeItem("shop_search");

    $http({
        method: 'GET',
        url: "https://www.googleapis.com/books/v1/volumes?q=cooking"
    }).success(function(data, status, headers, config) {
        $scope.related = data;
    }).error(function(data, status, headers, config) {
        console.log(data);
    });

    $scope.get_related = function() {
        $scope.offset_prods = $scope.offset_prods + 3;
        console.log($scope.offset_prods);
    }
    $scope.offset_prods = 0;
    $scope.get_related();
});