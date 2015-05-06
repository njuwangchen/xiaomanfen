/**
 * Created by ClarkWong on 26/4/15.
 */
var loginModule = angular.module('LoginModule', []);

loginModule.controller('LoginController', ['$scope', '$rootScope', '$state', '$http', '$window', 'UrlService', function ($scope, $rootScope, $state, $http, $window, UrlService) {
    //控制邮箱提示的信号
    $scope.emailNotExist = false;
    //控制密码提示的信号
    $scope.passwdNotRight = false;

    $scope.login = function (user) {
        $http.post(UrlService.rootURL + '/api/v1/login', user)
            .success(function (data, status, headers, config) {
                if (data.isSucceed) {

                    $window.localStorage['token'] = data.token;
                    $window.localStorage['login_email'] = data.loginEmail;
                    $rootScope.isLoggedIn = true;
                    $state.go('myOrder');
                } else if (data.emailNotExist) {
                    $scope.emailNotExist = true;
                } else if (data.passwdNotRight) {
                    $scope.passwdNotRight = true;
                }
            })
            .error(function (data, status, headers, config) {

            });
    };

}]);

loginModule.controller('RegisterController', ['$scope', '$state', '$http', '$window', 'UrlService', function ($scope, $state, $http, $window, UrlService) {
    //控制邮箱提示的信号
    $scope.emailExist = false;

    $scope.register = function (user) {
        $http.post(UrlService.rootURL + '/api/v1/register', user)
            .success(function (data, status, headers, config) {
                if (data.isSucceed) {

                    $window.localStorage['token'] = data.token;
                    $window.localStorage['login_email'] = data.loginEmail;
                    $state.go('myOrder');
                } else if (data.emailExist) {
                    $scope.emailExist = true;
                }
            })
            .error(function (data, status, headers, config) {

            });
    };
}]);