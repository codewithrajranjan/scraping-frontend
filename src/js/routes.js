angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

        $urlRouterProvider.otherwise('/dashboard');

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: true
        });

        $breadcrumbProvider.setOptions({
            prefixStateName: 'app.main',
            includeAbstract: true,
            template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
        });

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'views/common/layouts/full.html',
                //page title goes here
                ncyBreadcrumb: {
                    label: 'Root',
                    skip: true
                },
                resolve: {
                    loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load CSS files
                        return $ocLazyLoad.load([{
                            serie: true,
                            name: 'Flags',
                            files: ['node_modules/flag-icon-css/css/flag-icon.min.css']
                        },{
                            serie: true,
                            name: 'Font Awesome',
                            files: ['node_modules/font-awesome/css/font-awesome.min.css']
                        },{
                            serie: true,
                            name: 'Simple Line Icons',
                            files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
                        }]);
                    }],
                    loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                            serie: true,
                            name: 'chart.js',
                            files: [
                                'node_modules/chart.js/dist/Chart.min.js',
                                'node_modules/angular-chart.js/dist/angular-chart.min.js'
                            ]
                        }]);
                    }],
                }
            })
            .state('appSimple', {
                abstract: true,
                templateUrl: 'views/common/layouts/simple.html',
                resolve: {
                    loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load CSS files
                        return $ocLazyLoad.load([{
                            serie: true,
                            name: 'Font Awesome',
                            files: ['node_modules/font-awesome/css/font-awesome.min.css']
                        },{
                            serie: true,
                            name: 'Simple Line Icons',
                            files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
                        }]);
                    }],
                }
            })

            .state('appSimple.login', {
                url: '/login',
                templateUrl: 'views/pages/login.html'
            })
            .state('appSimple.register', {
                url: '/register',
                templateUrl: 'views/pages/register.html'
            })
            .state('appSimple.blog', {
                url: '/blogs?identifier&status&searchtext&tag&page',
                templateUrl: 'views/pages/blog/blog.html',
                controller : 'ScrapeCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['views/pages/blog/blogController.js']
                        });
                    }]
                }
            })
            .state('appSimple.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/pages/dashboard/dashboard.html',
                controller : 'DashboardCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['views/pages/dashboard/dashboardController.js']
                        });
                    }]
                }
            })
            .state('appSimple.question', {
                url: '/question',
                templateUrl: 'views/pages/question/question.html',
                controller : 'QuestionCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['views/pages/question/questionController.js']
                        });
                    }]
                }
            }).state('appSimple.products', {
                url: '/product',
                templateUrl: 'views/pages/product/product.html',
                controller : 'ProductCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['views/pages/product/productController.js']
                        });
                    }]
                }
            })
    }]);
