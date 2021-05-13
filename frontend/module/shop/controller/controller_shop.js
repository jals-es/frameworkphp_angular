restaurant.controller('controller_shop', function($scope, services, $window, service_filter, get_catego, get_range_prices, get_ingredientes, all_prod) {
    console.log(get_catego);
    console.log(get_ingredientes);
    console.log(all_prod);

    $scope.fil_catego = get_catego;
    $scope.fil_range_prices = get_range_prices;
    $scope.fil_ingredientes = get_ingredientes;
    $scope.shop_prod = all_prod.slice(1);
    $scope.total_prods = all_prod[0].total;

    $scope.all_shop = function(offset) {
        // alert(offset);
        var filters = service_filter.get_filters(offset);
        services.post('shop', 'all_prod', filters).then(function(response) {
            console.log(response);
            $scope.shop_prod = response.slice(1);
            $scope.total_prods = response[0].total;
            // $scope.$apply();
        }, function(response) {
            console.log("no result");
        });
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
        console.log("end");
        service_filter.change_filters($scope);
    });

    $scope.shop_change_filtrers = function() { service_filter.change_filters($scope) };

    angular.element(document).ready(function() {
        // service_filter.change_filters($scope);
        angular.element(document.getElementById("filter_categories")).on("change", function() {
            service_filter.change_filters($scope);
        });

        angular.element(document.getElementsByName("filter_ing[]")).on("change", function() {
            service_filter.change_filters($scope);
        });

    });
});