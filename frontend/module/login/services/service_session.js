restaurant.factory('service_session', function($rootScope, services) {

    let service = { check_session: check_session };

    return service;

    function check_session() {

        var verify = false;
        if (localStorage.getItem("token") !== null) {
            services.post('general', 'checksession', { "token": localStorage.getItem("token") })
                .then(function(response) {
                    verify = response.result;
                    console.log(verify);
                    if (!verify) {
                        localStorage.removeItem("token");
                    }
                    $rootScope.check_session = verify;

                    console.log($rootScope.check_session);
                });
        } else {
            $rootScope.check_session = "false";

            console.log($rootScope.check_session);
        }

    }
});