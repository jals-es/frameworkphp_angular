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
                            // console.log(filters);
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
            }).when("/login/recover", {
                templateUrl: "frontend/module/login/view/recover.html",
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
                templateUrl: "frontend/module/login/view/changepass.html",
                controller: "controller_changepass",
                resolve: {
                    checkToken: function(services, $route, service_toastr) {
                            console.log("token: " + $route.current.params.token);
                            return services.post('login', 'checkTokenRecover', { 'token': $route.current.params.token });
                        } // end_checkToken
                }
            }).when("/checkout", {
                templateUrl: "frontend/module/checkout/view/checkout.html",
                controller: "controller_checkout",
                resolve: {
                    cart: function(services, service_session, $rootScope) {
                        service_session.check_session();
                        if ($rootScope.check_session === "true") {
                            var token = localStorage.getItem("token");
                            return services.post('general', 'get_cart', { "token": token });
                        } else {
                            location.href = "#/home/";
                        }
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

restaurant.run(function($rootScope, services, service_session, service_firebase, service_toastr) {

    service_firebase.initialize();

    angular.element(document).ready(function() {
        $rootScope.get_cart();
        // console.log("ready");

        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $("#myDropdown").on("submit", function() {
            $rootScope.make_search();
        });

        $('.btn-group').on('hide.bs.dropdown', function(e) {
            if (!$rootScope.close_dropdown) {
                e.preventDefault();
            }
        })

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

    $rootScope.log_out = function() {
        localStorage.removeItem("token");
        service_session.check_session();
        service_toastr.alerta("info", "", "SESSIÓN CERRADA");
        window.location.href = "#/home/";
    }

    $rootScope.close_dropdown = true;

    $rootScope.get_cart = function() {
        // console.log("entra");
        service_session.check_session();
        // console.log($rootScope.check_session);
        if ($rootScope.check_session === "true") {
            // console.log("entra2");
            var token = localStorage.getItem("token");
            services.post("general", "get_cart", { "token": token })
                .then(function(response) {
                    // console.log(response);
                    if (response !== "false") {
                        $rootScope.cart_prods = response;

                        var total_items = 0;
                        var total_price = 0;
                        for (row in response) {
                            total_items = total_items + parseInt(response[row].cantidad);
                            total_price = total_price + parseInt(response[row].precio) * parseInt(response[row].cantidad);
                        }

                        $rootScope.tp_cart_prods = total_price;
                        $rootScope.n_cart_prods = total_items;

                    } else {
                        $rootScope.cart_prods = "";
                        $rootScope.n_cart_prods = 0;
                    }
                });
        }
    }

    $rootScope.open_dropdown = function() {
        $rootScope.close_dropdown = false;
    }

    $rootScope.change_dropdown = function() {
        $rootScope.close_dropdown = true;
    }

    $rootScope.change_cantidad = function(type, id_prod) {
        service_session.check_session();
        if ($rootScope.check_session === "true") {
            var token = localStorage.getItem("token");
            services.post("general", "change_cart", { "token": token, "type": type, "id_prod": id_prod })
                .then(function(response) {
                    console.log(response);
                    $rootScope.get_cart();
                }, function(error) {
                    console.log(error);
                });
        }

    }
    $rootScope.close_dropdown = true;

    $rootScope.goto_checkout = function() {
        $rootScope.close_dropdown = true;
        $(".dropdown-toggle").dropdown('toggle')
        window.location.href = "#/checkout/";
    }
});