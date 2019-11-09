const app = angular.module('app', [])

app.controller('formCtrl', ['$scope', function ($scope) {
    $scope.price = 24888
    $scope.area = 280
    $scope.totalPrice = $scope.price * $scope.area;

    $scope.deedTax = 1.5;
    $scope.valueAddedTax = 5.5;

    $scope.first = true;
    $scope.biggerThan90 = true;
    $scope.deedPrice = 0;
    $scope.valueAddedPrice = 0;
    $scope.netPrice = 0;
    $scope.handoverPrice = 0;

    $scope.calcTotalPrice = function () {
        $scope.totalPrice = $scope.price * $scope.area;
        $scope.calcTax()
    }

    $scope.calcPrice = function () {
        $scope.price = $scope.totalPrice / $scope.area;
        $scope.calcTax()
    }

    $scope.pad10k = function () {
        $scope.totalPrice = $scope.totalPrice * 10000
        $scope.calcPrice()
    }

    $scope.calcTax = function () {
        if ($scope.area > 90) {
            $scope.biggerThan90 = true; 
        } else {
            $scope.biggerThan90 = false; 
        }
        if ($scope.first) {
            if ($scope.biggerThan90) {
                $scope.deedTax = 1.5 
            } else {
                $scope.deedTax = 1 
            } 
        } else {
            $scope.deedTax = 3 
        }

        if ($scope.netPrice > $scope.handoverPrice) {
            $scope.deedPrice = ($scope.netPrice - $scope.valueAddedPrice) * $scope.deedTax / 100;
        } else {
            $scope.deedPrice = $scope.handoverPrice/1.05 * $scope.deedTax / 100; 
        }

        $scope.originPrice = $scope.originUnitPrice * $scope.area;
        if ($scope.over2years) {
            if ($scope.biggerThan90) {
                $scope.valueAddedPrice = ($scope.netPrice - $scope.originPrice) / 1.05 * 5.6 / 100; 
            } else {
                $scope.valueAddedPrice = 0; 
            } 
        } else {
            $scope.valueAddedPrice = $scope.netPrice / 1.05 * 5.6 / 100; 
        }
    }

    $scope.calcTaxByOriginPrice = function () {
        $scope.originUnitPrice = $scope.originPrice / $scope.area;
        $scope.calcTax()
    }

}])