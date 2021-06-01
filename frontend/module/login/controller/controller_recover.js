restaurant.controller('controller_recover', function($scope, $window, services, service_toastr, service_validate, service_session) {

    $scope.error_rec = "";

    $scope.recover = function() {
        console.log(this);
        $('.loader_bg').fadeToggle();
        var email = service_validate.validate_recover($scope);
        if (email) {
            services.post("login", "recover", { "email": email })
                .then(function(response) {
                    $('.loader_bg').fadeToggle();
                    service_toastr.alerta(response.type, "", response.msg);
                    if (response.type === "success") {
                        window.location.href = "#/login/";
                    }
                });
        } else {
            $('.loader_bg').fadeToggle();
        }
    }
});