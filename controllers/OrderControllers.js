var orderModule = angular.module('OrderModule', []);

orderModule.controller('OrderController', ['$scope', '$state', '$http', '$window', 'UrlService', function ($scope, $state, $http, $window, UrlService) {
    var token = $window.localStorage['token'];
    $scope.login_email = $window.localStorage['login_email'];

    $scope.orders = [];

    $scope.getOrders = $http({
        method: 'GET',
        url: UrlService.rootURL + '/api/v1/orders',
        headers: {
            'token': token
        }
    }).success(function (data) {
        $scope.orders = data;
    }).error(function (data) {
        $scope.logout();
    });

    $scope.submitOrder = function (order) {
        console.log(order);

        $http({
            method: 'POST',
            url: UrlService.rootURL + '/api/v1/order',
            headers: {
                'token': token
            },
            data: order
        }).success(function (data) {
            if (data.isSucceed) {
                var order_form = document.forms['order_form'];
                order_form.item_number.value = data.order_id;
                order_form.notify_url.value = UrlService.rootURL + '/api/v1/ipn';
                order_form.action = 'https://sandbox.paypal.com/cgi-bin/webscr';
                order_form.method = 'post';
                order_form.submit();
            } else {
                $scope.logout();
            }
        }).error(function (data) {
            $scope.logout();
        });
    };

    $scope.logout = function () {
        window.localStorage.clear();
        $state.go('index');
    };
}]);
