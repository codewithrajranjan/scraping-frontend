//chart.js
angular
    .module('app')
    .controller('projectController', projectController)

projectController.$inject = ['$scope','$state','blogService'];

function projectController($scope,$state,blogService) {

    $scope.goToBlogsPage = goToBlogsPage;
    $scope.goToQuestionsPage = goToQuestionsPage;
    $scope.goToDashboard = goToDashboard;
    $scope.goToProducts = goToProducts;
    $scope.scrape = scrape
    $scope.uiConfig = {
        searchText : null,
        search : search

    }

    function search(searchText){
        if(searchText == null){
            alert("Provide a search text")
            return false;
        }
        $state.go('appSimple.blog',{"searchtext": searchText},{inherit: false})

    }
    function goToQuestionsPage(){
        $state.go('appSimple.question')
    }

    function goToBlogsPage(){
        $state.go('appSimple.blog',{reload: true},{inherit:false})
    }
    function goToDashboard(){
        $state.go('appSimple.dashboard')
    }
    function goToProducts(){
        $state.go('appSimple.products')
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
