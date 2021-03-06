restaurant.controller('controller_home', function($scope, $window, slider, categories) {

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = slider;
    $scope.categories = categories;

    angular.element(document).ready(function() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: true,
            autoplayHoverPause: true,
            items: 1,
            mouseDrag: true,
            touchDrag: false,
            responsive: {
                0: {
                    items: 1,
                    mouseDrag: false,
                    touchDrag: true
                },
                600: {
                    items: 1,
                    mouseDrag: false,
                    touchDrag: true

                },
                1000: {
                    items: 1
                }
            }
        });

        var cw = $('.categoria').width();
        cw = cw * 0.6
        $('.categoria').css({ 'height': cw + 'px' });

        angular.element(window).on('resize', function() {
            cw = $('.categoria').width();
            cw = cw * 0.6
            $('.categoria').css({ 'height': cw + 'px' });
        });

        $scope.redirectShopProd = function(id_prod) {
            location.href = "#/shop/" + id_prod;
        };

        $scope.redirectShopCatego = function(catego) {
            localStorage.filters_shop = catego + ";;;";
            location.href = "#/shop";
        }
    });
}); // end_controller