/**
 * Created with JetBrains WebStorm.
 * User: ganyue
 * Date: 14/11/14
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */

app.controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$state', function ($rootScope, $scope, $http, $state) {
    // signin controller
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;
        $http.post('/monitor/user/login', {
            username: $scope.user.username,
            password: $scope.user.password
        }).success(function (data, status) {
            if (data.code == 0) {
                //将权限放到rootScope
                $rootScope.userName = data.result.user || "";
                $state.go('app.apiDetails');
            } else {
                $scope.authError = 'Email or Password not right';
            }
        }).error(function (data, status) {
            $scope.authError = 'Email or Password not right';
        });
    };
}]);

