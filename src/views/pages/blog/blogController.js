//chart.js
angular
    .module('app')
    .controller('ScrapeCtrl', ScrapeCtrl)

ScrapeCtrl.$inject = ['$scope','$http','$sce','blogService'];
function ScrapeCtrl($scope,$http,$sce,blogService) {

    //var ipAddress = "192.168.0.103:9000"
    var ipAddress = "localhost:9000"
    //var ipAddress = "localhost"
    //var ipAddress = "192.168.0.108"
    // function declarations 
    $scope.updateBlogStatus = updateBlogStatus;

    $scope.getPosts = getPosts

    $scope.uiConfig = {
        tagSelected : null
    }
    
    getAllTags()


    $scope.fetchBlogWithTag = function(tag){

        if(tag == 'all'){
            getPosts('new') 
        }else{
            $http.get('http://'+ipAddress+'/api/v1.0/blogs?tag='+tag)
                .then(function(data){
                    $scope.blogList = data.data
                    $scope.blogList.forEach(function(item){
                        item.label = $sce.trustAsHtml(item.label);
                    })
                    $scope.totalNewPost = $scope.blogList.length
                }).catch(function(err){
                    console.log(err)
                })
        }

    }

    $scope.fetchBlogWithTag('mongodb-blog')

    function getAllTags(){
        blogService.getBlogTags()
            .then(function(data){
                $scope.tagList = data
            }).catch(function(err){
                console.log(err)
            })

    }

    function getPosts(postStatus){
        $http.get('http://'+ipAddress+'/api/v1.0/blogs?status='+postStatus)
            .then(function(data){
                $scope.blogList = data.data
                $scope.blogList.forEach(function(item){
                        item.label = $sce.trustAsHtml(item.label);
                })
                $scope.totalNewPost = $scope.blogList.length
            }).catch(function(err){
                console.log(err)
            })

    }
    function updateBlogStatus(blogData,statusCode,indexInBlogList){
        if(statusCode=='delete'){
            $scope.blogList.splice(indexInBlogList,1)
        }
        var id = blogData._id.$oid
        $http.post('http://'+ipAddress+'/api/v1.0/blog/'+id+'/status/'+statusCode)
            .then(function(data){
                //getPosts('new')
            }).catch(function(err){
                console.log(err)
            })
    }


    $scope.scrape = function(){
        $http.post('http://'+ipAddress+'/api/v1.0/scrape')
            .then(function(data){
                //getPosts('new')
            }).catch(function(err){
                console.log(err)
            })
    }
}
