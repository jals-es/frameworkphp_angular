restaurant.controller('controller_login', function($scope, $window, services, service_toastr, service_validate, service_session) {

    var type = sessionStorage.getItem("login_page");
    if (type == 2) {
        $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    }

    $scope.change_view = function() {
        var type = sessionStorage.getItem("login_page");
        switch (type) {
            case "2":
                sessionStorage.setItem("login_page", "1");
                $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
                break;
            case "1":
            default:
                sessionStorage.setItem("login_page", "2");
                $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
                break;
        }
    }

    $scope.login_gmail = function() {

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                var user = result.user;

                var uid = user.uid;
                var username = user.displayName;
                var email = user.email;
                var avatar = user.photoURL;


                $scope.social_login(uid, username, email, avatar);


                // ...
            }).catch((error) => {
                // console.log('Se ha encontrado un error:', error);
                service_toastr.alerta("error", "ERROR", error.message);
                // ...
            });
    }

    $scope.login_github = function() {
        var provider = new firebase.auth.GithubAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                var user = result.user;

                var uid = user.uid;
                var username = user.displayName;
                var email = user.email;
                var avatar = user.photoURL;


                $scope.social_login(uid, username, email, avatar);
                // ...
            }).catch((error) => {
                // console.log('Se ha encontrado un error:', error);

                service_toastr.alerta("error", "ERROR", error.message);
                // ...
            });
    }

    $scope.social_login = function(uid, user, email, avatar) {
        $('.loader_bg').fadeToggle();
        services.post("login", "social", { "uid": uid, "user": user, "email": email, "avatar": avatar })
            .then(function(response) {
                $('.loader_bg').fadeToggle();
                console.log(response);
                service_toastr.alerta(response.type, "", response.msg);
                switch (response.type) {
                    case "success":
                        localStorage.token = response.data;
                        service_session.check_session();
                        var comingfrom = sessionStorage.getItem("comingfrom");
                        // console.log(comingfrom);
                        if (comingfrom !== null) {
                            sessionStorage.removeItem("commingfrom");
                            window.location.href = "#/" + comingfrom;
                        } else {
                            window.location.href = "#/home";
                        }
                        break;
                }
            });
    }

    $scope.login = function() {
        $('.loader_bg').fadeToggle();
        var val = service_validate.validate_login($scope);
        // console.log(val);

        if (val) {
            services.post("login", "log", { "user": val.user, "pass": val.pass })
                .then(function(response) {
                    $('.loader_bg').fadeToggle();
                    service_toastr.alerta(response.type, "", response.msg);

                    if (response.type === "success") {
                        localStorage.setItem("token", response.data);
                        service_session.check_session();
                        var comingfrom = sessionStorage.getItem("comingfrom");
                        // console.log(comingfrom);
                        if (comingfrom !== null) {
                            sessionStorage.removeItem("commingfrom");
                            window.location.href = "#/" + comingfrom;
                        } else {
                            window.location.href = "#/home";
                        }
                    }
                });
        } else {
            $('.loader_bg').fadeToggle();
        }
    }

    $scope.register = function() {
        $('.loader_bg').fadeToggle();
        var val = service_validate.validate_register($scope);
        // console.log(val);
        if (val) {
            services.post("login", "reg", { "user": val.user, "pass": val.pass, "rpass": val.rpass, "email": val.email })
                .then(function(response) {
                    $('.loader_bg').fadeToggle();
                    // console.log(response);
                    if (response[0] === "error") {
                        service_validate.set_errors_reg($scope, response[1]);
                        service_toastr.alerta("error", "ERROR AL REGISTRAR", "No se ha podido registrar el usuario.");
                    } else {
                        $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
                        service_toastr.alerta("success", "REGISTRADO", "Usuario registrado correctamente");
                    }
                });
        } else {
            $('.loader_bg').fadeToggle();
        }
    }
});