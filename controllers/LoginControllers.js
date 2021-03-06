/**
 * Created by ClarkWong on 26/4/15.
 */
var loginModule = angular.module('LoginModule', []);

loginModule.controller('LoginController', ['$scope', '$rootScope', '$state', '$http', '$window', 'UrlService', function ($scope, $rootScope, $state, $http, $window, UrlService) {

    $scope.user = {};
    //控制邮箱提示的信号
    $scope.emailNotExist = false;
    //控制密码提示的信号
    $scope.passwdNotRight = false;

    $scope.captchaNotRight = false;

    $scope.submitDisabled = false;

    $scope.login = function (user) {
        $scope.submitDisabled = true;
        $http.post(UrlService.rootURL + '/api/v1/login', user)
            .success(function (data, status, headers, config) {
                if (data.isSucceed) {
                    $window.localStorage['token'] = data.token;
                    $window.localStorage['login_email'] = data.loginEmail;
                    $rootScope.isLoggedIn = true;
                    $state.go('myOrder');
                } else if (data.emailNotExist) {
                    $scope.submitDisabled = false;
                    $scope.emailNotExist = true;
                } else if (data.passwdNotRight) {
                    $scope.submitDisabled = false;
                    $scope.passwdNotRight = true;
                } else if (data.captchaNotRight) {
                    $scope.submitDisabled = false;
                    $scope.captchaNotRight = true;
                }
            })
            .error(function (data, status, headers, config) {

            });
    };

    $scope.getCaptcha = function () {
        $http.get(UrlService.rootURL + '/code/')
            .success(function (data) {
                $scope.image = data;
            })
    };

    $scope.getCaptcha();

}]);

loginModule.controller('RegisterController', ['$scope', '$rootScope', '$state', '$http', '$window', 'UrlService', function ($scope, $rootScope, $state, $http, $window, UrlService) {
    //控制邮箱提示的信号
    $scope.emailExist = false;

    $scope.captchaNotRight = false;

    $scope.showAlert = true;

    $scope.submitDisabled = false;

    $scope.register = function (user) {
        $scope.submitDisabled = true;
        $http.post(UrlService.rootURL + '/api/v1/register', user)
            .success(function (data, status, headers, config) {
                if (data.isSucceed) {
                    $window.localStorage['token'] = data.token;
                    $window.localStorage['login_email'] = data.loginEmail;
                    $rootScope.isLoggedIn = true;
                    $state.go('myOrder');
                } else if (data.emailExist) {
                    $scope.submitDisabled = false;
                    $scope.emailExist = true;
                } else if (data.captchaNotRight) {
                    $scope.submitDisabled = false;
                    $scope.captchaNotRight = true;
                }
            })
            .error(function (data, status, headers, config) {

            });
    };

    $scope.getCaptcha = function () {
        $http.get(UrlService.rootURL + '/code/')
            .success(function (data) {
                $scope.image = data;
            })
    };

    $scope.getCaptcha();
}]);