//chart.js
angular
    .module('app')
    .controller('ScrapeCtrl', ScrapeCtrl)

ScrapeCtrl.$inject = ['$scope','$http','$sce','blogService','appSettings','$state'];
function ScrapeCtrl($scope,$http,$sce,blogService,appSettings,$state) {


    var stateParams = $state.params
    $scope.uiConfig = {
        'identifier' : null,
        'blogList' : [],
        'deletePost' : deleteBlog
    }




    // fetching the state params identifier
    if(stateParams.identifier && stateParams.identifier != null){
        $scope.uiConfig.identifier = stateParams.identifier;
    }else{
        alert("Access using identifier");
        return false;
    }


    // making the query params
    var queryParam = "?identifier="+$scope.uiConfig.identifier
    blogService.getPosts(queryParam)
        .then(function(result){
            console.log(result)
            var blogList = result.data
            blogList.forEach(function(item){
                item.label = $sce.trustAsHtml(item.label);
            })
            $scope.blogList = blogList
        
        }).catch(function(err){
            alert(err)
        })



    function deleteBlog(blogData,index){
        $scope.blogList.splice(index,1)
        blogService.deletePost(blogData['id'])
        .then(function(data){
            console.log(data)
        }).catch(function(err){
            console.log(err)
        })
    }


    
}
