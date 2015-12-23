'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.load',
        'ui.jq',
        'ui.validate',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers',
        'ui.echarts',
        'ngSanitize',
        'ui.select',
        'angucomplete-alt'

    ])
        .run(
        [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

            }
        ]
    )
        .config(
        [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

                // lazy controller, directive and service
                app.controller = $controllerProvider.register;
                app.directive  = $compileProvider.directive;
                app.filter     = $filterProvider.register;
                app.factory    = $provide.factory;
                app.service    = $provide.service;
                app.constant   = $provide.constant;
                app.value      = $provide.value;

                $urlRouterProvider
                    .otherwise('/login/signin');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })

                    //用户详情统计
                    .state('app.apiDetails', {
                        url: '/apiDetails',
                        templateUrl: '/monitor/html/apiDetails.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/monitor/js/apiDetails.js']);
                                }]
                        }
                    })
                    .state('login', {
                        url: '/login',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('login.signin', {
                        url: '/signin',
                        templateUrl: '/monitor/html/signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/monitor/js/login.js']);
                                }]
                        }
                    })
            }
        ]
    )

// translate config
        .config(['$translateProvider', function($translateProvider){

            // Register a loader for the static files
            // So, the module will search missing translation tables under the specified urls.
            // Those urls are [prefix][langKey][suffix].
            $translateProvider.useStaticFilesLoader({
                prefix: 'l10n/',
                suffix: '.js'
            });

            // Tell the module what language to use by default
            $translateProvider.preferredLanguage('en');

            // Tell the module to store the language in the local storage
            $translateProvider.useLocalStorage();

        }])

    /**
     * jQuery plugin config use ui-jq directive , config the js and css files that required
     * key: function name of the jQuery plugin
     * value: array of the css js file located
     */
        .constant('JQ_CONFIG', {
            easyPieChart:   ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
            sparkline:      ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
            plot:           ['js/jquery/charts/flot/jquery.flot.min.js',
                'js/jquery/charts/flot/jquery.flot.resize.js',
                'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                'js/jquery/charts/flot/jquery.flot.spline.js',
                'js/jquery/charts/flot/jquery.flot.time.min.js',
                'js/jquery/charts/flot/jquery.flot.categories.js',
                'js/jquery/charts/flot/jquery.flot.navigate.js',
                'js/jquery/charts/flot/jquery.flot.canvas.js',
                'js/jquery/charts/flot/jquery.flot.axislabels.js',
                'js/jquery/charts/flot/jquery.flot.symbol.js',
                'js/jquery/charts/flot/jquery.flot.orderBars.js',
                'js/jquery/charts/flot/jquery.flot.pie.min.js'],
            slimScroll:     ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
            sortable:       ['js/jquery/sortable/jquery.sortable.js'],
            nestable:       ['js/jquery/nestable/jquery.nestable.js',
                'js/jquery/nestable/nestable.css'],
            filestyle:      ['js/jquery/file/bootstrap-filestyle.min.js'],
            slider:         ['js/jquery/slider/bootstrap-slider.js',
                'js/jquery/slider/slider.css'],
            chosen:         ['js/jquery/chosen/chosen.jquery.min.js',
                'js/jquery/chosen/chosen.css'],
            TouchSpin:      ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
            wysiwyg:        ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                'js/jquery/wysiwyg/jquery.hotkeys.js'],
            dataTable:      ['js/jquery/datatables/jquery.dataTables.min.js',
                'js/jquery/datatables/dataTables.bootstrap.js',
                'js/jquery/datatables/dataTables.bootstrap.css'],
            vectorMap:      ['js/jquery/jvectormap/jquery-jvectormap.min.js',
                'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                'js/jquery/jvectormap/jquery-jvectormap.css'],
            footable:       ['js/jquery/footable/footable.all.min.js',
                'js/jquery/footable/footable.core.css'],
            daterangepicker: ['js/jquery/bootstrap-daterangepicker/daterangepicker.js',
                'js/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css']
        }
    )

// modules config
        .constant('MODULE_CONFIG', {
            select2:        ['js/jquery/select2/select2.css',
                'js/jquery/select2/select2-bootstrap.css',
                'js/jquery/select2/select2.min.js',
                'js/modules/ui-select2.js']
        }
    )

// oclazyload config
        .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
            // We configure ocLazyLoad to use the lib script.js as the async loader
            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
                modules: [
                    {
                        name: 'ngGrid',
                        files: [
                            'js/modules/ng-grid/ng-grid.min.js',
                            'js/modules/ng-grid/ng-grid.css',
                            'js/modules/ng-grid/theme.css'
                        ]
                    },
                    {
                        name: 'toaster',
                        files: [
                            'js/modules/toaster/toaster.js',
                            'js/modules/toaster/toaster.css'
                        ]
                    }
                ]
            });
        }])
        .config(["$httpProvider",function($httpProvider){
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
            $httpProvider.interceptors.push('timestampMarker');
        }])
        .factory('sessionChecker', ["$location", function ($location) {
            var sessionChecker = {
                responseError: function (response) {
                    if (response.status == 401) {
                        $location.path('/login/signin');
                        return;
                    }
                    return response;
                }
            };
            return sessionChecker;
        }]);

app.factory('timestampMarker', ["$location",function($location) {
    var timestampMarker = {
        responseError: function(response) {
            if(response.status == 401){
                $location.path('/access/signin');
                return;
            }
            return response;
        }
    };
    return timestampMarker;
}]);