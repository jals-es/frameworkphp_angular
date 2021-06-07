restaurant.controller('controller_checkout', function($scope, $rootScope, services, service_toastr, service_validate_buy, service_session, cart) {

    if (cart.lenght <= 0) {
        window.location.href = "#/home/";
    }


    $scope.buy = function() {
        service_session.check_session();
        if ($rootScope.check_session === "true") {
            var val = service_validate_buy.validate_buy($scope);
            // console.log(val);
            if (val) {
                var token = localStorage.getItem("token");
                services.post("general", "checkout", { "token": token, "name": val.name, "email": val.email, "address": val.address, "city": val.city, "country": val.country, "zip": val.zip })
                    .then(function(response) {
                        if (response == "true") {
                            service_toastr.alerta("success", "", "Pedido Completado");
                            $rootScope.tp_cart_prods = 0;
                            $rootScope.n_cart_prods = 0;
                            $rootScope.cart_prods = "";
                            window.location.href = "#/home/";
                        } else {
                            service_toastr.alerta("error", "", "Error al completar el pedido");
                        }
                    });
            }
        } else {
            service_toastr.alerta("error", "", "Sesión caducada");
            window.location.href = "#/login/";
        }
    }
});