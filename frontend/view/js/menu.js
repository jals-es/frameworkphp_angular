// angular.element(document).ready(function() {
//     $("#sidebar").mCustomScrollbar({
//         theme: "minimal"
//     });

//     $('#dismiss, .overlay').on('click', function() {
//         $('#sidebar').removeClass('active');
//         $('.overlay').removeClass('active');
//     });

//     $('#sidebarCollapse').on('click', function() {
//         alert("menu");
//         $('#sidebar').addClass('active');
//         $('.overlay').addClass('active');
//         $('.collapse.in').toggleClass('in');
//         $('a[aria-expanded=true]').attr('aria-expanded', 'false');
//     });

//     $('#shop-menu-button').on('click', function() {
//         localStorage.removeItem('shop_filter');
//         localStorage.removeItem('shop_filter_id');
//     });
// });

restaurant.controller('controller_menu', function($scope, $window, slider, categories) {
    // $("#sidebar").mCustomScrollbar({
    //     theme: "minimal"
    // });

    // $('#dismiss, .overlay').on('click', function() {
    //     $('#sidebar').removeClass('active');
    //     $('.overlay').removeClass('active');
    // });

    $scope.action_menu = function() {
        alert("menu");
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    }

    // $('#sidebarCollapse').on('click', function() {
    //     alert("menu");
    //     $('#sidebar').addClass('active');
    //     $('.overlay').addClass('active');
    //     $('.collapse.in').toggleClass('in');
    //     $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    // });

    $('#shop-menu-button').on('click', function() {
        localStorage.removeItem('shop_filter');
        localStorage.removeItem('shop_filter_id');
    });
});