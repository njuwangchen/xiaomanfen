var orderModule = angular.module('OrderModule', []);

orderModule.controller('OrderController', ['$scope', '$state', '$http', function($scope, $state, $http){
    $scope.orders = [];

    $scope.getOrders = $http({
        method: 'GET',
        url: 'data/order_list.json',
        headers: {
            'auth-token': ''
        }
    }).success(function(data){
        $scope.orders = data;
    }).error(function(data){

    });

    $scope.submitOrder = function(order){
        console.log(order);
    }
}]);
