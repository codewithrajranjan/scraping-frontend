//chart.js
angular
    .module('app')
    .controller('projectController', projectController)

projectController.$inject = ['$scope','$state'];

function projectController($scope,$state) {

    $scope.goToBlogsPage = goToBlogsPage;
    $scope.goToQuestionsPage = goToQuestionsPage;


    function goToQuestionsPage(){
        $state.go('appSimple.question')
    }

    function goToBlogsPage(){
        $state.go('appSimple.blog')
    }

}
