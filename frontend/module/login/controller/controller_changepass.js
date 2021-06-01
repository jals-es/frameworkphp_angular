restaurant.controller('controller_changepass', function($scope, $window, services, service_toastr, service_validate, service_session, checkToken) {
    console.log(checkToken);
    switch (checkToken.type) {
        case "success":
            service_toastr.alerta(checkToken.type, "", checkToken.msg);
            $scope.check = true;
            $scope.data = checkToken.data;
            break;
        case "error":
            service_toastr.alerta(checkToken.type, "", checkToken.msg);
            $scope.check = false;
            break;
        case "404":
        default:
            window.location.href = "#/404";
            break;
    }

    $scope.change_pass = function() {
        $('.loader_bg').fadeToggle();
        var id_user = $scope.data;

        var val = service_validate.validate_changepass($scope);

        if (val) {
            var pass = $("#change-pass").val();
            var rpass = $("#change-rpass").val();
            services.post("login", "changepass", { "id_user": id_user, "pass": pass, "rpass": rpass })
                .then(function(response) {
                    $('.loader_bg').fadeToggle();
                    // console.log(response);
                    switch (response.type) {
                        case "success":
                            service_toastr.alerta(response.type, "", response.msg);
                            window.location.href = "#/login";
                            break;
                        case "error":
                            if (response.msg === "pass") {
                                $scope.error_check = " * Contraseñas incorrectas.";
                            } else {
                                service_toastr.alerta(response.type, "", response.msg);
                            }
                            break;
                        case "404":
                        default:
                            window.location.href = "#/404";
                            break;
                    }
                });
        } else {
            $('.loader_bg').fadeToggle();
        }
    }
});