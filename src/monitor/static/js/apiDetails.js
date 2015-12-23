app.controller('apiDetails', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $http.get("/monitor/api/apiDetails", {}).success(function(data){
        $scope.infos = data.result;
    }).error(function(data, status) {
        console.log("get /api/apiDetails 发生错误");
    });
}]);