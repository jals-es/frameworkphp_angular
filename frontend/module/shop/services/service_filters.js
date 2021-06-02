restaurant.factory('service_filter', function() {

    let service = { change_filters: change_filters, get_filters: get_filters };

    return service;

    function get_filters(offset) {
        var limit = 12;
        var filters = localStorage.getItem("filters_shop");
        if (filters === null) {
            // change_filters();
            filters = false;
        }
        var catego;
        var price_min;
        var price_max;
        var ingredientes;
        if (filters == false) {
            filters = "";
            catego = "";
            price_min = "";
            price_max = "";
            ingredientes = "";
        } else {
            filters = filters.split(";");
            for (i = 0; i < filters.length; i++) {
                switch (i) {
                    case 0:
                        catego = filters[i];
                        break;
                    case 1:
                        price_min = filters[i];
                        break;
                    case 2:
                        price_max = filters[i];
                        break;
                    case 3:
                        ingredientes = filters[i];
                        break;
                }
            }
        }
        return { "offset": offset, "limit": limit, "catego": catego, "price_min": price_min, "price_max": price_max, "ingredientes": ingredientes }
    }

    function change_filters($scope, carga = true) {
        // alert("hola");
        var categories = $("#filter_categories").val();
        var price_min = $("#slider-range-value1").text();
        var price_max = $("#slider-range-value2").text();

        var get_ing = $("input[name='filter_ing[]']:checked");

        // console.log(categories + " " + price_min + " " + price_max);
        // console.log(get_ing);
        if (categories !== "undefined") {
            ing = "";
            for (i = 0; i < get_ing.length; i++) {
                if (i == 0) {
                    ing = get_ing[i].value;
                } else {
                    ing = ing + ":" + get_ing[i].value;
                }
            }

            if (i == 0) {
                ing = "no";
            }

            var filters = categories + ";" + price_min + ";" + price_max + ";" + ing;

            // console.log(filters);

            if (localStorage.getItem("filters_shop") !== null) {
                localStorage.setItem("filters_shop", filters);

                if (carga) {
                    $('.loader_bg').fadeToggle();
                    setTimeout(function() {
                        // $("#content-shop").empty();
                        $scope.all_shop(0);
                        $('.loader_bg').fadeToggle();
                    }, 500);
                }
            } else {
                localStorage.setItem("filters_shop", filters);
            }
        } else if (localStorage.getItem("filters_shop") !== null) {
            $('.loader_bg').fadeToggle();
            setTimeout(function() {
                // $("#content-shop").empty();
                // $scope.no_result();
                $('.loader_bg').fadeToggle();
            }, 500);
        }

    }
});