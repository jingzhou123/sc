const app = angular.module('app', [])

app.controller('formCtrl', ['$scope', function ($scope) {
    $scope.price = 24888
    $scope.area = 280
    $scope.totalPrice = $scope.price * $scope.area;

    $scope.calcTotalPrice = function () {
        $scope.totalPrice = $scope.price * $scope.area;
    }

    $scope.calcPrice = function () {
        $scope.price = $scope.totalPrice / $scope.area * 10000;
    }
}])