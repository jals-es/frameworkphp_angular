restaurant.factory('service_validate', function() {

    let service = {
        validate_login: validate_login,
        validate_register: validate_register,
        val_username: val_username,
        val_password: val_password,
        check_same_password: check_same_password,
        val_email: val_email,
        set_errors_reg: set_errors_reg,
        validate_recover: validate_recover,
        validate_changepass: validate_changepass
    };

    return service;

    function validate_login($scope) {
        var user = $("#log-user").val();
        var pass = $("#log-pass").val();

        var c_user = val_username(user);
        var c_pass = val_password(pass);

        var check = true;
        if (!c_user) {
            check = false;
        }
        if (!c_pass) {
            check = false;
        }

        if (check) {
            $scope.error_log = "";
            data = new Array();
            data.user = user;
            data.pass = pass;
            return data;
        } else {
            $scope.error_log = " * Usuario o contraseña incorrectos";
            return false;
        }
    }

    function validate_register($scope) {
        var user = $("#reg-user").val();
        var pass = $("#reg-pass").val();
        var rpass = $("#reg-rpass").val();
        var email = $("#reg-email").val();

        // console.log(user + " " + pass + " " + rpass + " " + email);

        var c_user = val_username(user);
        var c_pass = val_password(pass);
        var c_rpass = check_same_password(pass, rpass);
        var c_email = val_email(email);

        var check = true;
        if (!c_user) {
            $scope.error_reg_user = " * Nombre de usuario no valido";
            check = false;
        } else {
            $scope.error_reg_user = "";
        }
        if (!c_pass) {
            $scope.error_reg_pass = " * Contraseña invalida\n-De 8 a 15 carácteres\n-Mayúsculas y minusculas\n-Números\n-Algun carácter especial\n-Sin espacios";
            check = false;
        } else {
            $scope.error_reg_pass = "";
        }
        if (!c_rpass) {
            $scope.error_reg_rpass = " * Las contraseñas no coinciden";
            check = false;
        } else {
            $scope.error_reg_rpass = "";
        }
        if (!c_email) {
            $scope.error_reg_email = " * Email invalido";
            check = false;
        } else {
            $scope.error_reg_email = "";
        }

        if (check) {
            data = new Array();
            data.user = user;
            data.pass = pass;
            data.rpass = rpass;
            data.email = email;

            return data;
        } else {
            return false;
        }

    }

    function val_username(user) {
        var reg = /^[a-zA-Z]+$/;
        if (user.match(reg)) {
            return true;
        }
        return false;
    }

    function val_password(pass) {
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        // console.log(pass.length);
        if (pass.match(reg)) {
            return true;
        }
        return false;
    }

    function check_same_password(pass, rpass) {
        if (pass === rpass) {
            return true;
        }
        return false;
    }

    function val_email(email) {
        var reg = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/;
        if (email.match(reg)) {
            return true;
        }
        return false;
    }

    function set_errors_reg($scope, errors) {

        if (errors.user) {
            $scope.error_reg_user = errors.user;
        } else {
            $scope.error_reg_user = "";
        }
        if (errors.pass) {
            $scope.error_reg_pass = errors.pass;
        } else {
            $scope.error_reg_pass = "";
        }
        if (errors.email) {
            $scope.error_reg_email = errors.email;
        } else {
            $scope.error_reg_email = "";
        }
    }

    function validate_recover($scope) {
        var email = $("#rec-email").val();

        var c_email = val_email(email);

        var check = true;
        if (!c_email) {
            $scope.error_rec = " * Email invalido";
            check = false;
        } else {
            $scope.error_rec = "";
        }

        if (check) {
            return email;
        } else {
            return false;
        }
    }

    function validate_changepass($scope) {
        var pass = $("#change-pass").val();
        var rpass = $("#change-rpass").val();

        if (val_password(pass)) {
            if (check_same_password(pass, rpass)) {
                $scope.error_check = "";
                return true;
            } else {
                $scope.error_check = " * Las contraseñas no coinciden.";
            }
        } else {
            $scope.error_check = " * Contraseña invalida\n-De 8 a 15 carácteres\n-Mayúsculas y minusculas\n-Números\n-Algun carácter especial\n-Sin espacios";
        }

        return false;
    }
});