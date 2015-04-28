/**
 * Created by ClarkWong on 26/4/15.
 */
var loginModule = angular.module('LoginModule',[]);

loginModule.controller('LoginController', ['$scope', '$state', '$http', function($scope, $state, $http){
    //控制邮箱提示的信号
    $scope.emailNotExist = false;
    //控制密码提示的信号
    $scope.passwdNotRight = false;

    $scope.login = function(user){
        $http.post('data/login_success.json', user)
            .success(function(data, status, headers, config){
                if(data.isSucceed){
                    $state.go('myOrder');
                }else if(data.emailNotExist){
                    $scope.emailNotExist = true;
                }else if(data.passwdNotRight){
                    $scope.passwdNotRight = true;
                }
            })
            .error(function(data, status, headers, config){

            });
    };

}]);

loginModule.controller('RegisterController', ['$scope', '$state', '$http', function($scope, $state, $http){
    //控制邮箱提示的信号
    $scope.emailExist = false;

    $scope.register = function(user){
        $http.post('data/register_success.json', user)
            .success(function (data, status, headers, config) {
                if(data.isSucceed){
                    $state.go('myOrder');
                }else if(data.emailExist){
                    $scope.emailExist = true;
                }
            })
            .error(function(data, status, headers, config){

            });
    };
}]);