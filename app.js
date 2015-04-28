var routerApp = angular.module('routerApp', ['ui.router', 'ui.bootstrap', 'LoginModule', 'OrderModule']);

routerApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

routerApp.controller('navController', ['$scope', '$state', '$location', '$anchorScroll', function ($scope, $state, $location, $anchorScroll) {
    $scope.scroll_to_about = function () {
        $location.hash('about');
        $anchorScroll();
    }

    $scope.scroll_to_product = function () {
        $location.hash('product');
        $anchorScroll();
    }

    $scope.scroll_to_service = function () {
        $location.hash('service');
        $anchorScroll();
    }

    $scope.scroll_to_contact = function () {
        $location.hash('contact');
        $anchorScroll();
    }

    $scope.get_service_name = function () {
        var stateName = $state.current.name;
        if (stateName == 'index') {
            return '注册/登录';
        } else {
            return '立即订购';
        }
    }
}]);

routerApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                'about@index': {
                    templateUrl: 'partial/about.html'
                },
                'product@index': {
                    templateUrl: 'partial/product.html'
                },
                'service@index': {
                    templateUrl: 'frame/login_and_register.html'
                },
                'login_form@index': {
                    templateUrl: 'partial/login.html'
                },
                'register_form@index': {
                    templateUrl: 'partial/register.html'
                },
                'contact@index': {
                    templateUrl: 'partial/contact.html'
                },
                'footer@index': {
                    templateUrl: 'partial/footer.html'
                }
            }
        })
        .state('myOrder', {
            url: '/myOrder',
            views: {
                '': {
                    templateUrl: 'frame/home.html'
                },
                'navigation@myOrder': {
                    templateUrl: 'partial/navigation.html'
                },
                'about@myOrder': {
                    templateUrl: 'partial/about.html'
                },
                'product@myOrder': {
                    templateUrl: 'partial/product.html'
                },
                'service@myOrder': {
                    templateUrl: 'partial/my_order.html'
                },
                'contact@myOrder': {
                    templateUrl: 'partial/contact.html'
                },
                'footer@myOrder': {
                    templateUrl: 'partial/footer.html'
                }
            }
        });
}]);