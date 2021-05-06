restaurant.controller('controller_home', function($scope, $window, slider, categories) {
    let brands = 2;
    let total = categories.length;

    console.log(categories);
    console.log(slider);

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = slider;
    $scope.viewedBrands = viewedBrands.slice(0, brands);

    angular.element($window).on('mousewheel', function() {
        let footerHeight = document.getElementById('container-footer').offsetHeight;
        let position = $window.scrollY + footerHeight;
        let bottom = document.body.scrollHeight - $window.innerHeight;
        //////
        if (position >= bottom) {
            if (brands < total) {
                brands += 3;
                $scope.viewedBrands = viewedBrands.slice(0, brands);
                $scope.$apply();
            } else {
                angular.element($window).off('mousewheel');
            } // end_else
        } // end_if
    });

    $scope.redirectShopBrand = function(brand) {
        localStorage.brandShop = brand;
        location.href = "#/shop";
    }; // end_redirectShopBrand
}); // end_controller

restaurant.controller('controller_menu', function($scope, services_logIn) {
    services_logIn.printMenu();

    $scope.logOut = function() {
        services_logIn.logOut();
    }; // endlogOut
})