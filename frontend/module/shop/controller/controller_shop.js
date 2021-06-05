restaurant.controller('controller_shop', function($scope, $rootScope, services, $window, service_toastr, service_session, service_filter, get_catego, get_range_prices, get_ingredientes, all_prod) {
    // console.log(get_catego);
    // console.log(get_ingredientes);
    // console.log(all_prod);

    $scope.fil_catego = get_catego;
    $scope.fil_range_prices = get_range_prices;
    $scope.fil_ingredientes = get_ingredientes;
    $scope.search_by = "";
    if (localStorage.getItem("shop_search") !== null) {
        $scope.shop_prod = all_prod;
        $scope.total_prods = "false";
        $scope.search_by = localStorage.getItem("shop_search");
        localStorage.removeItem("shop_search");
    } else if (all_prod !== "false") {
        $scope.shop_prod = all_prod.slice(1);
        $scope.total_prods = all_prod[0].total;
    } else {
        $scope.shop_prod = all_prod;
        $scope.total_prods = all_prod;
    }

    // console.log($scope.shop_prod);
    // console.log($scope.total_prods);
    $scope.act_offset = 0;
    $scope.act_limit = 12;

    $scope.set_paginacio = function() {
        $scope.pages = Array();
        var pag = Math.ceil($scope.total_prods / $scope.act_limit);
        var i = 1;
        var prods = 0;
        while (i <= pag) {
            // $scope.pages[i].offset = prods;
            if ($scope.act_offset >= prods && $scope.act_offset < prods + $scope.act_limit) {
                // $scope.pages[i].active = true;
                $scope.pages.push({ "offset": prods, "active": true });
            } else {
                // $scope.pages[i].active = false;
                $scope.pages.push({ "offset": prods, "active": false });
            }
            prods = prods + $scope.act_limit;
            i++;
        }
    }

    $scope.set_paginacio();

    $scope.all_shop = function(offset) {
        // alert(offset);
        var filters = service_filter.get_filters(offset);
        services.post('shop', 'all_prod', filters).then(function(response) {
            // console.log(response);
            if (response !== "false") {
                $scope.shop_prod = response.slice(1);
                $scope.total_prods = response[0].total;
            } else {
                $scope.shop_prod = response;
                $scope.total_prods = response;
            }
            $scope.act_offset = offset;
            $scope.set_paginacio();
            $scope.get_favs();
            // $scope.$apply();
        }, function(response) {
            console.log("no result");
        });
    }

    $scope.change_pag = function(offset) {
        var pag = Math.ceil($scope.total_prods / $scope.act_limit);
        if (offset === "avant") {
            offset = $scope.act_offset + $scope.act_limit;
        } else if (offset === "arrere") {
            offset = $scope.act_offset - $scope.act_limit;
        }

        if (offset < 0) {
            offset = 0;
        } else if (offset > pag * $scope.act_limit - 1) {
            offset = pag * $scope.act_limit - $scope.act_limit;
        }
        $scope.all_shop(offset);
    }

    $('.noUi-handle').on('click', function() {
        $(this).width(50);
    });
    var rangeSlider = document.getElementById('slider-range');
    var moneyFormat = wNumb({
        decimals: 0,
        thousand: ''
    });
    noUiSlider.create(rangeSlider, {
        start: [get_range_prices[0].min, get_range_prices[0].max],
        step: 1,
        range: {
            'min': [get_range_prices[0].min],
            'max': [get_range_prices[0].max]
        },
        format: moneyFormat,
        connect: true
    });

    // Set visual min and max values and also update value hidden form inputs
    rangeSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('slider-range-value1').innerHTML = values[0];
        document.getElementById('slider-range-value2').innerHTML = values[1];
        document.getElementsByName('min-value').value = moneyFormat.from(
            values[0]);
        document.getElementsByName('max-value').value = moneyFormat.from(
            values[1]);
    });

    rangeSlider.noUiSlider.on('end', function() {
        // console.log("end");
        service_filter.change_filters($scope);
    });

    $scope.shop_change_filtrers = function() { service_filter.change_filters($scope) };

    $scope.get_favs = function() {
        service_session.check_session();
        if ($rootScope.check_session === 'true') {
            var token = localStorage.getItem("token");
            services.post("shop", "get_favs", { "token": token })
                .then(function(response) {
                    // delete $scope.favs;
                    $scope.set_favs(response);
                }, function(error) {
                    console.log(error);
                });
        }
    }

    $scope.set_favs = function(favs) {
        // console.log(this);
        $scope.fav = new Array();
        for (row in favs) {
            // console.log(favs[row].id_prod);

            $scope.fav[favs[row].id_prod] = true;
        }
        // console.log($scope.fav);
    }

    $scope.get_favs();

    $scope.change_fav = function(id_prod, $event) {
        // alert(id_prod);
        var btnclass = $event.currentTarget.getAttribute("class").split(" ");
        console.log(btnclass);
        service_session.check_session();
        if ($rootScope.check_session === 'true') {
            var token = localStorage.getItem("token");
            if (btnclass[1] === "active") {
                // Favorito
                console.log("active");

                $scope.insert_fav("unfav", id_prod, token);
                $scope.fav[id_prod] = false;
            } else {
                // No favorito
                console.log("no active");

                $scope.insert_fav("fav", id_prod, token);
                $scope.fav[id_prod] = true;
            }
        } else {
            sessionStorage.setItem("comingfrom", "shop");
            window.location.href = "#/login";
        }
    }

    $scope.insert_fav = function(type, id_prod, token) {
        // console.log(type + " " + id_prod + " " + token);
        services.post("shop", "fav", { "type": type, "id_prod": id_prod, "token": token })
            .then(function(response) {
                console.log(response);
                switch (response) {
                    case "fav":
                        $scope.fav[id_prod] = true;
                        break;
                    case "unfav":
                        $scope.fav[id_prod] = false;
                        break;
                    case "error":
                    default:
                        service_toastr.alerta("error", "", "Se ha producido un error");
                        $scope.get_favs();
                        break;
                }
            });
    }

    $scope.addto_cart = function(id_prod) {
        service_session.check_session();
        if ($rootScope.check_session === 'true') {
            var token = localStorage.getItem("token");

            services.post("general", "addto_cart", { "token": token, "id_prod": id_prod })
                .then(function(response) {
                    switch (response) {
                        case "true":
                            $rootScope.get_cart();
                            service_toastr.alerta("success", "", "Producto añadido al carrito");
                            break;
                        default:
                            service_toastr.alerta("error", "", "Error al añadir al carrito");
                            break;
                    }
                }, function(error) {
                    service_toastr.alerta("error", "", "Error al añadir al carrito");
                });
        } else {
            sessionStorage.setItem("comingfrom", "shop");
            window.location.href = "#/login";
        }
    }

    angular.element(document).ready(function() {
        // service_filter.change_filters($scope);
        angular.element(document.getElementById("filter_categories")).on("change", function() {
            service_filter.change_filters($scope);
        });

        angular.element(document.getElementsByName("filter_ing[]")).on("change", function() {
            service_filter.change_filters($scope);
        });

        if (localStorage.filters_shop == null) {
            service_filter.change_filters($scope, false);
        }

    });
});