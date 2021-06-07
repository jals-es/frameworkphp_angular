restaurant.controller('controller_profile', function($scope, $rootScope, services, service_toastr, service_session, user_info, user_orders) {

    if (user_info <= 0) {
        window.location.href = "#/home/";
    }

    console.log(user_info);
    console.log(user_orders);

    $scope.user = user_info[0];
    $scope.orders = user_orders;
});