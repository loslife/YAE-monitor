'use strict';
angular.module('ui.echarts', []).directive('eChart', [function () {

    function link($scope, element, attrs) {

        // 基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(element[0]);

        //监听options变化
        if (attrs.uiOptions) {
            attrs.$observe('uiOptions', function () {
                var options = $scope.$eval(attrs.uiOptions);
                if (angular.isObject(options)) {
                    myChart.setOption(options, true);
                }
            }, true);
        }

        //if (attrs.uiRefresh) {
        //    $scope.$watch(attrs.uiRefresh, function () {
        //        var options = $scope.$eval(attrs.uiOptions);
        //        if (angular.isObject(options)) {
        //            myChart.setOption(options);
        //        }
        //    });
        //}

    }

    return {
        restrict: 'A',
        link: link
    };
}]);