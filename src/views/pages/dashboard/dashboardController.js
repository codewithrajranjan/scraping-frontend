//chart.js
angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl)

DashboardCtrl.$inject = ['$scope','$http','$sce','blogService','appSettings','$state'];
function DashboardCtrl($scope,$http,$sce,blogService,appSettings,$state) {


    $scope.uiConfig = {
        allBlogIdentifiers : null,
    }

    blogService.getIdentifiers()
    .then(function(response){
        $scope.uiConfig.allBlogIdentifiers = response.data
    }).catch(function(err){
        alert(err)
    })

    $scope.getBlogByIdentifier = function(identifier){
            // changing the state 
            $state.go('appSimple.blogByIdentifier',{'identifier': identifier});
    }
    $scope.scrapeByIdentifier = function(identifier){
        blogService.scrapeByIdentifer(identifier)
        .then(function(data){
            console.log(data)
        }).catch(function(err){
            console.log(err)
        })

    }

    
}
