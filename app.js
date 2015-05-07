var routerApp = angular.module('routerApp', ['ui.router', 'ui.bootstrap', 'LoginModule', 'OrderModule', 'reCAPTCHA']);

routerApp.run(function ($rootScope, $state, $stateParams, $window) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    function initLoginState() {
        if ($window.localStorage['token']) {
            $rootScope.isLoggedIn = true;
        } else {
            $rootScope.isLoggedIn = false;
        }
    }

    initLoginState();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        var token = $window.localStorage['token'];

        if (requireLogin && !token) {
            event.preventDefault();
            $state.transitionTo('register');
        }
    });
});

routerApp.factory('UrlService', function () {
    var rootURL = function getRootURL() {
        return 'http://localhost:5001';
    };
    return {
        rootURL: rootURL()
    };
});

routerApp.controller('navController', ['$scope', '$rootScope', '$state', '$window', '$location', '$anchorScroll', function ($scope, $rootScope, $state, $window, $location, $anchorScroll) {

    $scope.scroll_to_about = function () {
        $location.hash('about');
        $anchorScroll();
    };

    $scope.scroll_to_product = function () {
        $location.hash('product');
        $anchorScroll();
    };

    $scope.scroll_to_service = function () {
        $location.hash('service');
        $anchorScroll();
    };

    $scope.scroll_to_contact = function () {
        $location.hash('contact');
        $anchorScroll();
    };


    $scope.logout = function () {
        window.localStorage.clear();
        $rootScope.isLoggedIn = false;
        $state.go('login');
    };

}]);

routerApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'reCAPTCHAProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, reCAPTCHAProvider) {
    reCAPTCHAProvider.setPublicKey('6Le2ggYTAAAAAGVkrwZUvQ5sL2gIKx13o5xWH2sH');
    reCAPTCHAProvider.setOptions({
        theme: 'clean'
    });

    $httpProvider.defaults.withCredentials = true;

    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'frame/home.html'
                },
                'navigation@index': {
                    templateUrl: 'partial/navigation.html'
                },
                'product@index': {
                    templateUrl: 'partial/product.html'
                },
                'contact@index': {
                    templateUrl: 'partial/contact.html'
                },
                'footer@index': {
                    templateUrl: 'partial/footer.html'
                }
            },
            data: {
                requireLogin: false
            }
        })
        .state('register', {
            url: '/register',
            views: {
                '': {
                    templateUrl:'frame/login_and_register.html'
                },
                'navigation@register': {
                    templateUrl: 'partial/navigation.html'
                },
                'form_view@register': {
                    templateUrl: 'partial/register.html'
                },
                'footer@register': {
                    templateUrl: 'partial/footer.html'
                }
            },
            data: {
                requireLogin: false
            }
        })
        .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'frame/login_and_register.html'
                },
                'navigation@login': {
                    templateUrl: 'partial/navigation.html'
                },
                'form_view@login': {
                    templateUrl: 'partial/login.html'
                },
                'footer@login': {
                    templateUrl: 'partial/footer.html'
                }
            },
            data: {
                requireLogin: false
            }
        })
        .state('myOrder', {
            url: '/myorder',
            views: {
                '': {
                    templateUrl: 'frame/my_order.html'
                },
                'navigation@myOrder': {
                    templateUrl: 'partial/navigation.html'
                },
                'my_order@myOrder': {
                    templateUrl: 'partial/my_order.html'
                },
                'footer@myOrder': {
                    templateUrl: 'partial/footer.html'
                }
            },
            data: {
                requireLogin: true
            }
        });
}]);