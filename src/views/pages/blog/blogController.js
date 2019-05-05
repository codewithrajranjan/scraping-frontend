//chart.js
angular
    .module('app')
    .controller('ScrapeCtrl', ScrapeCtrl)

ScrapeCtrl.$inject = ['$scope','$http','$sce','blogService','appSettings','$state','$location','$state'];
function ScrapeCtrl($scope,$http,$sce,blogService,appSettings,$state,$location,$state) {


    var stateParams = $state.params
    $scope.uiConfig = {
        'identifier' : null,
        'blogList' : [],
        'deletePost' : deleteBlog,
        'searchBasedOnTag' : searchBasedOnTag,
        "nextPage" : nextPage,
        "previousPage" : previousPage,
        "updatePostTag": updatePostTag
    }

    var data = $location.url() 
    var result = data.split("?")
    var queryParam = ""
    if(result.length>1){
        queryParam = "?"+result[1]
    }

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
    function searchBasedOnTag(tag){
        console.log(tag)
        $state.go('appSimple.blog',{"tag": tag},{inherit:false},{reload: true})
    }

    function nextPage(){
        var data = $location.url() 
        var result = data.split("?")
        var pageNumber = 2
        if(result.length>1){
            result = result[1].split("&")
            result.forEach(function(eachQueryParam){
                if(eachQueryParam.indexOf("page=")!=-1){
                    currentPageNumber = eachQueryParam.split("=")[1]
                    pageNumber = parseInt(currentPageNumber) + 1;
                }
            });
        }
        $state.go('appSimple.blog',{"page": pageNumber},{reload: true})

    }
    function previousPage(){
        var data = $location.url() 
        var result = data.split("?")
        var pageNumber = 2
        if(result.length>1){
            result = result[1].split("&")
            result.forEach(function(eachQueryParam){
                if(eachQueryParam.indexOf("page=")!=-1){
                    currentPageNumber = eachQueryParam.split("=")[1]
                    pageNumber = parseInt(currentPageNumber) - 1;
                }
            });
            if(pageNumber < 1) {
                alert("No more back")
                return false;
            }

        } 
        $state.go('appSimple.blog',{"page": pageNumber},{reload: true})

    }
    function updatePostTag(postData,tag,index){
        var postId = postData['_id'];
        var data = {
            tag : tag
        }
        blogService.updatePost(postId,data)
        .then(function(data){

        }).catch(function(err){

        })

    }

    
}
