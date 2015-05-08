var orderModule = angular.module('OrderModule', []);

orderModule.controller('OrderController', ['$scope', '$state', '$http', '$window', 'UrlService', function ($scope, $state, $http, $window, UrlService) {
    var token = $window.localStorage['token'];
    $scope.login_email = $window.localStorage['login_email'];
    $scope.status = {};
    $scope.status.open = false;

    $scope.submitDisabled = false;

    $scope.order = {
        type: "0"
    };

    $scope.orders = [];

    $scope.payGlass = function (order_id) {
        var order_form = document.forms['order_form'];
        order_form.item_name.value = 'xiao man fen smart glass';
        order_form.amount.value = "129.00";
        order_form.item_number.value = order_id;
        order_form.notify_url.value = UrlService.rootURL + '/api/v1/ipn';
        order_form.action = 'https://sandbox.paypal.com/cgi-bin/webscr';
        order_form.method = 'post';
        order_form.submit();
    };

    $scope.payGlassAndEarphone = function (order_id) {
        var order_form = document.forms['order_form'];
        order_form.item_name.value = 'xiao man fen smart glass and earphone set';
        order_form.amount.value = "149.00";
        order_form.item_number.value = order_id;
        order_form.notify_url.value = UrlService.rootURL + '/api/v1/ipn';
        order_form.action = 'https://sandbox.paypal.com/cgi-bin/webscr';
        order_form.method = 'post';
        order_form.submit();
    };

    $scope.pay = function (order_id, order_type) {
        if (order_type) {
            $scope.payGlassAndEarphone(order_id);
        } else {
            $scope.payGlass(order_id);
        }
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
        $scope.submitDisabled = true;
        $http({
            method: 'POST',
            url: UrlService.rootURL + '/api/v1/order',
            headers: {
                'token': token
            },
            data: order
        }).success(function (data) {
            if (data.isSucceed) {
                $scope.pay(data.order_id, data.type);
            } else {
                $scope.logout();
            }
        }).error(function (data) {
            $scope.logout();
        });
    };

    $scope.$watch('status.open', function (newVal, oldVal) {
        if (newVal == true) {
            console.log('refresh');
            $scope.getOrders();
        }
    });

}]);
