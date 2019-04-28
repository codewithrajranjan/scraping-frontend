//chart.js
angular
    .module('app')
    .controller('projectController', projectController)

projectController.$inject = ['$scope','$state','blogService'];

function projectController($scope,$state,blogService) {

    $scope.goToBlogsPage = goToBlogsPage;
    $scope.goToQuestionsPage = goToQuestionsPage;
    $scope.goToDashboard = goToDashboard
    $scope.scrape = scrape


    function goToQuestionsPage(){
        $state.go('appSimple.question')
    }

    function goToBlogsPage(){
        $state.go('appSimple.blog')
    }
    function goToDashboard(){
        $state.go('appSimple.dashboard')
    }
    function scrape(){
        blogService.scrape()
        .then(function(data){
            console.log(data)
        }).catch(function(err){
            alert(err)
        })
    }

}
