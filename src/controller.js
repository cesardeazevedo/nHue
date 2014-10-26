angular.module('nHue.controllers', [])
.controller('HueBRController', HueBRController);

HueBRController.$inject = ['$scope'];
function HueBRController($scope){
    $scope.DefaultImages = [];
}
