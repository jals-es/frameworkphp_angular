restaurant.factory('service_validate_buy', function($rootScope, services) {
    let service = {
        v_email: v_email,
        v_text_empty: v_text_empty,
        v_zip: v_zip,
        validate_buy: validate_buy
    };

    return service;

    function v_email(email) {
        var reg = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/;
        if (email.match(reg)) {
            return true;
        }
        return false;
    }

    function v_text_empty(text) {
        if (text.length > 0) {
            return true;
        }
        return false;
    }

    function v_zip(zip) {
        if (zip > 0) {
            return true;
        }
        return false;
    }

    function validate_buy($scope) {

        var name = $("#fname").val();
        var email = $("#email").val();
        var address = $("#adr").val();
        var city = $("#city").val();
        var country = $("#state").val();
        var zip = $("#zip").val();

        // console.log("email " + email);

        var val_name = v_text_empty(name);
        var val_email = v_email(email);
        var val_address = v_text_empty(address);
        var val_city = v_text_empty(city);
        var val_country = v_text_empty(country);
        var val_zip = v_zip(zip);

        var check = true;
        if (val_name) {
            $scope.error_name = "";
        } else {
            $scope.error_name = " * Nombre incorrecto.";
            check = false;
        }
        if (val_email) {
            $scope.error_email = "";
        } else {
            $scope.error_email = " * Email incorrecto.";
            check = false;
        }
        if (val_address) {
            $scope.error_address = "";
        } else {
            $scope.error_address = " * Dirección incorrecta.";
            check = false;
        }
        if (val_city) {
            $scope.error_city = "";
        } else {
            $scope.error_city = " * Ciudad incorrecta.";
            check = false;
        }
        if (val_country) {
            $scope.error_country = "";
        } else {
            $scope.error_country = " * Pais incorrecto.";
            check = false;
        }
        if (val_zip) {
            $scope.error_zip = "";
        } else {
            $scope.error_zip = " * Zip incorrecto.";
            check = false;
        }

        if (check) {
            var data = new Array();
            data.name = name;
            data.email = email;
            data.address = address;
            data.city = city;
            data.country = country;
            data.zip = zip;
            return data;
        } else {
            return false;
        }
    }
});