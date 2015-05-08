var orderModule = angular.module('OrderModule', []);

orderModule.controller('OrderController', ['$scope', '$state', '$http', '$window', 'UrlService', function ($scope, $state, $http, $window, UrlService) {
    var token = $window.localStorage['token'];
    $scope.login_email = $window.localStorage['login_email'];
    $scope.status = {};
    $scope.status.open = false;
    $scope.showAlert = true;

    $scope.order = {};

    $scope.orders = [];

    $scope.rePay = function (order_id) {
        var order_form = document.forms['order_form'];
        order_form.item_number.value = order_id;
        order_form.notify_url.value = UrlService.rootURL + '/api/v1/ipn';
        order_form.action = 'https://sandbox.paypal.com/cgi-bin/webscr';
        order_form.method = 'post';
        order_form.submit();
    };

    $scope.getOrders = function () {
        $http({
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
    };

    $scope.getOrders();

    $scope.submitOrder = function (order, order_form) {

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

        $scope.showAlert = false;
        $scope.order = null;
    };

    $scope.$watch('status.open', function (newVal, oldVal) {
        if (newVal == true) {
            console.log('refresh');
            $scope.getOrders();
        }
    });

}]);
