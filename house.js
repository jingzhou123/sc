const app = angular.module('app', [])

app.controller('formCtrl', ['$scope', function ($scope) {
    $scope.price = 24888
    $scope.area = 280
    $scope.totalPrice = $scope.price * $scope.area;

    $scope.calc = function () {
        $scope.totalPrice = $scope.price * $scope.area;
    }
}])