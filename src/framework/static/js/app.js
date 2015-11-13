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
        'app.utilsService',
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
                    .state('app.users', {
                        url: '/users',
                        templateUrl: '/statistics-nailstar/html/users/users.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/users/users.js']);
                                }]
                        }
                    })

                    //用户资料查询
                    .state('app.userDetails', {
                        url: '/userDetails?nickname&username&id',
                        templateUrl: '/statistics-nailstar/html/users/userDetails.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load('ngGrid').then(
                                        function(){
                                            return $ocLazyLoad.load('/statistics-nailstar/js/users/userDetails.js');
                                        }
                                    );
                                }]
                        }
                    })

                    //用户帖子评论排行榜
                    .state('app.userpostcommentsranking', {
                        url: '/userpostcommentsranking',
                        templateUrl: '/statistics-nailstar/html/users/userPostCommentRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/users/userPostCommentRanking.js']);
                                }]
                        }
                    })

                    //用户视频评论排行榜
                    .state('app.usertopiccommentsranking', {
                        url: '/usertopiccommentsranking',
                        templateUrl: '/statistics-nailstar/html/users/userTopicCommentRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/users/userTopicCommentRanking.js']);
                                }]
                        }
                    })

                    //用户交作业排行榜
                    .state('app.userhomeworkranking', {
                        url: '/userhomeworkranking',
                        templateUrl: '/statistics-nailstar/html/users/userHomeworkRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/users/userHomeworkRanking.js']);
                                }]
                        }
                    })

                    //求教程投票
                    .state('app.qjcVote', {
                        url: '/qjcVote',
                        templateUrl: '/statistics-nailstar/html/qjc/qjcVote.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/qjc/qjcVote.js']);
                                }]
                        }
                    })

                    //求教程传图
                    .state('app.qjcPhoto', {
                        url: '/qjcPhoto',
                        templateUrl: '/statistics-nailstar/html/qjc/qjcPhoto.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/qjc/qjcPhoto.js']);
                                }]
                        }
                    })

                    //求教程视频评论
                    .state('app.qjcVideoComments', {
                        url: '/qjcVideoComments',
                        templateUrl: '/statistics-nailstar/html/qjc/qjcVideoComments.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/qjc/qjcVideoComments.js']);
                                }]
                        }
                    })

                    //求教程视频播放
                    .state('app.qjcVideoPlay', {
                        url: '/qjcVideoPlay',
                        templateUrl: '/statistics-nailstar/html/qjc/qjcVideoPlay.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/qjc/qjcVideoPlay.js']);
                                }]
                        }
                    })

                    //我的行为统计
                    .state('app.meAction', {
                        url: '/meAction',
                        templateUrl: '/statistics-nailstar/html/me/meAction.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meAction.js']);
                                }]
                        }
                    })

                    //我的粉丝排行
                    .state('app.meFansRanking', {
                        url: '/meFansRanking',
                        templateUrl: '/statistics-nailstar/html/me/meFansRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meFansRanking.js']);
                                }]
                        }
                    })

                    //我的关注排行
                    .state('app.meFollowsRanking', {
                        url: '/meFollowsRanking',
                        templateUrl: '/statistics-nailstar/html/me/meFollowsRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meFollowsRanking.js']);
                                }]
                        }
                    })

                    //我的关注统计
                    .state('app.meFollowsCount', {
                        url: '/meFollowsCount',
                        templateUrl: '/statistics-nailstar/html/me/meFollowsCount.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meFollowsCount.js']);
                                }]
                        }
                    })

                    //我的点赞排行榜
                    .state('app.meLikeRanking', {
                        url: '/meLikeRanking',
                        templateUrl: '/statistics-nailstar/html/me/meLikeRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meLikeRanking.js']);
                                }]
                        }
                    })

                    //我的评论排行榜
                    .state('app.meCommentsRanking', {
                        url: '/meCommentsRanking',
                        templateUrl: '/statistics-nailstar/html/me/meCommentsRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meCommentsRanking.js']);
                                }]
                        }
                    })

                    //我的分时点赞统计
                    .state('app.meLikeCount', {
                        url: '/meLikeCount',
                        templateUrl: '/statistics-nailstar/html/me/meLikeCount.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meLikeCount.js']);
                                }]
                        }
                    })

                    //我的分时评论统计
                    .state('app.meCommentsCount', {
                        url: '/meCommentsCount',
                        templateUrl: '/statistics-nailstar/html/me/meCommentsCount.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/me/meCommentsCount.js']);
                                }]
                        }
                    })

                    //会员经验值排行榜
                    .state('app.memberExpRanking', {
                        url: '/memberExpRanking',
                        templateUrl: '/statistics-nailstar/html/member/memberExpRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/member/memberExpRanking.js']);
                                }]
                        }
                    })

                    //会员咖币排行榜
                    .state('app.memberCoinRanking', {
                        url: '/memberCoinRanking',
                        templateUrl: '/statistics-nailstar/html/member/memberCoinRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/member/memberCoinRanking.js']);
                                }]
                        }
                    })

                    //会员经验总数和平均数
                    .state('app.memberExpCount', {
                        url: '/memberExpCount',
                        templateUrl: '/statistics-nailstar/html/member/memberExpCount.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/member/memberExpCount.js']);
                                }]
                        }
                    })

                    //会员咖币总数和平均数
                    .state('app.memberCoinCount', {
                        url: '/memberCoinCount',
                        templateUrl: '/statistics-nailstar/html/member/memberCoinCount.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/member/memberCoinCount.js']);
                                }]
                        }
                    })

                    //会员经验咖币总数和平均数
                    .state('app.memberExpAndCoin', {
                        url: '/memberExpAndCoin',
                        templateUrl: '/statistics-nailstar/html/member/memberExpAndCoin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/member/memberExpAndCoin.js']);
                                }]
                        }
                    })

                    //会员经验指标获取排行榜
                    .state('app.memberExpAnalyse', {
                        url: '/memberExpAnalyse',
                        templateUrl: '/statistics-nailstar/html/member/memberExpAnalyse.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/member/memberExpAnalyse.js']);
                                }]
                        }
                    })

                    //圈子数据统计
                    .state('app.communitiesStaticits', {
                        url: '/communitiesStaticits',
                        templateUrl: '/statistics-nailstar/html/communities/communitiesStaticits.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/communities/communitiesStaticits.js']);
                                }]
                        }
                    })

                    //圈子活跃度排名
                    .state('app.communitiesRanking', {
                        url: '/communitiesRanking',
                        templateUrl: '/statistics-nailstar/html/communities/communitiesRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/communities/communitiesRanking.js']);
                                }]
                        }
                    })

                    //圈子活跃度排名
                    .state('app.communitiesTeacherRanking', {
                        url: '/communitiesTeacherRanking',
                        templateUrl: '/statistics-nailstar/html/communities/communitiesTeacherRanking.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/communities/communitiesTeacherRanking.js']);
                                }]
                        }
                    })

                    //视频系列评论统计
                    .state('app.videoCommentsCates', {
                        url: '/videoCommentsCates',
                        templateUrl: '/statistics-nailstar/html/video/videoCommentsCates.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/video/videoCommentsCates.js']);
                                }]
                        }
                    })

                    //视频分期评论统计
                    .state('app.videoCommentsTopic', {
                        url: '/videoCommentsTopic',
                        templateUrl: '/statistics-nailstar/html/video/videoCommentsTopic.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/video/videoCommentsTopic.js']);
                                }]
                        }
                    })

                    //视频总评论统计
                    .state('app.videoCommentsTotal', {
                        url: '/videoCommentsTotal',
                        templateUrl: '/statistics-nailstar/html/video/videoCommentsTotal.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/video/videoCommentsTotal.js']);
                                }]
                        }
                    })

                    //视频分期播放
                    .state('app.videoPlayTopic', {
                        url: '/videoPlayTopic',
                        templateUrl: '/statistics-nailstar/html/video/videoPlayTopic.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/video/videoPlayTopic.js']);
                                }]
                        }
                    })

                    //视频系列播放
                    .state('app.videoPlayCates', {
                        url: '/videoPlayCates',
                        templateUrl: '/statistics-nailstar/html/video/videoPlayCates.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/video/videoPlayCates.js']);
                                }]
                        }
                    })

                    //视频总播放统计
                    .state('app.videoPlayTotal', {
                        url: '/videoPlayTotal',
                        templateUrl: '/statistics-nailstar/html/video/videoPlayTotal.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/video/videoPlayTotal.js']);
                                }]
                        }
                    })

                    //轮播图统计
                    .state('app.posterdetails', {
                        url: '/posterdetails',
                        templateUrl: '/statistics-nailstar/html/poster/posterDetails.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load('ngGrid').then(
                                        function(){
                                            return $ocLazyLoad.load('/statistics-nailstar/js/poster/posterDetails.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('login', {
                        url: '/login',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('login.signin', {
                        url: '/signin',
                        templateUrl: '/statistics-nailstar/html/signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['/statistics-nailstar/js/login.js']);
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