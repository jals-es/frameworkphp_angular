var restaurant = angular.module('restaurant', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize', 'toastr', 'ui.bootstrap']);
//////
restaurant.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "frontend/module/home/view/view_home.html",
                controller: "controller_home",
                resolve: {
                    slider: function(services) {
                        return services.get('home', 'slider');
                    },
                    categories: function(services) {
                        return services.get('home', 'categories');
                    }
                } // end_resolve
            }).when("/contact", {
                templateUrl: "frontend/module/contact/view/view_contact.html",
                controller: "controller_contact"
            }).when("/shop", {
                templateUrl: "frontend/module/shop/view/view_shop.html",
                controller: "controller_shop",
                resolve: {
                    get_catego: function(services) {
                        return services.get('shop', 'get_catego');
                    },
                    get_range_prices: function(services) {
                        return services.get('shop', 'get_range_prices');
                    },
                    get_ingredientes: function(services) {
                        return services.get('shop', 'get_ingredientes');
                    },
                    all_prod: function(services, service_filter) {
                        if (localStorage.getItem("shop_search") !== null) {
                            return services.post('shop', 'search', { "content": localStorage.getItem("shop_search") });
                        } else {
                            var filters = service_filter.get_filters(0);
                            console.log(filters);
                            return services.post('shop', 'all_prod', filters);
                        }
                    }
                }
            }).when('/shop/:id_prod', {
                templateUrl: "frontend/module/shop/view/shop_details.html",
                controller: "controller_shop_details",
                resolve: {
                    prod: function(services, $route) {
                        return services.post('shop', 'prod', { 'id': $route.current.params.id_prod })
                    }
                } // end_resolve
            }).when("/login", {
                templateUrl: "frontend/module/login/view/login.html",
                controller: "controller_login"
            }).when("/recover", {
                templateUrl: "frontend/module/login/view/view_recover.html",
                controller: "controller_recover"
            }).when("/login/verify/:token", {
                templateUrl: "frontend/view/inc/error404.html",
                controller: "controller_verify",
                resolve: {
                    verify: function(services, $route) {
                        return services.put('login', 'verify', { 'token': $route.current.params.token })
                    }
                } // end_resolve
            }).when("/login/recover/:token", {
                templateUrl: "frontend/module/login/view/view_recoverForm.html",
                controller: "controller_recoverForm",
                resolve: {
                    checkToken: function(services, $route, toastr) {
                            services.post('login', 'checkTokenRecover', { 'token': $route.current.params.token })
                                .then(function(response) {
                                    if (response == 'fail') {
                                        toastr.error("The current token is invalid.", 'Error');
                                        location.href = "#/home";
                                    } // end_if
                                }, function(error) {
                                    console.log(error);
                                });
                        } // end_checkToken
                }
            }).when("/cart", {
                templateUrl: "frontend/module/cart/view/view_cart.html",
                controller: "controller_cart",
                resolve: {
                    dataCart: function(services) {
                        return services.post('cart', 'loadDataCart', { JWT: localStorage.token });
                    }
                }
            }).when("/404", {
                templateUrl: "frontend/view/inc/error404.html"
            }).otherwise("/home", {
                templateUrl: "frontend/module/home/view/view_home.html",
                controller: "controller_home"
            });
    }
]);

restaurant.run(function($rootScope, services, service_session, service_firebase) {

    service_firebase.initialize();

    angular.element(document).ready(function() {

        // console.log("ready");

        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $("#myDropdown").on("submit", function() {
            $rootScope.make_search();
        });


    });


    service_session.check_session();

    $rootScope.goto_login = function(type) {
        sessionStorage.login_page = type;
        window.location.href = "#/login/";
    }

    // $('#dismiss, .overlay').on('click', function() {
    $rootScope.dismiss_overlay = function() {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        // });
    }

    $rootScope.action_menu = function() {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    }

    $rootScope.shop_menu = function() {
        localStorage.removeItem('filters_shop');
        localStorage.removeItem("shop_search");
    }

    $rootScope.click_search_btn = function() {
        document.getElementById("myDropdown").classList.toggle("show");
        document.getElementById("myInput").value = "";
        $rootScope.search_prods = "";
    }

    $rootScope.keyup_search = function() {
        valueInp = document.getElementById("myInput").value;
        // console.log(valueInp);

        $rootScope.search_prods = services.post('general', 'search', { 'search': valueInp });
        // console.log($rootScope.search_prods);
    }

    $rootScope.go_to_shop = function(id_prod) {
        // console.log(id_prod);
        window.location.href = "#/shop/" + id_prod;
        $rootScope.click_search_btn();
    }

    $rootScope.make_search = function() {
        localStorage.shop_search = document.getElementById("myInput").value;
        $rootScope.click_search_btn();
        window.location.href = "#/shop/";
    }
});