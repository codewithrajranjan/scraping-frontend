//chart.js
angular
    .module('app')
    .controller('ScrapeCtrl', ScrapeCtrl)

ScrapeCtrl.$inject = ['$scope','$http'];
function ScrapeCtrl($scope,$http) {
    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // function declarations 
    $scope.updateBlogStatus = updateBlogStatus;

    $scope.getPosts = getPosts
        
    getPosts('new')

    function getPosts(postStatus){
        $http.get('http://localhost:9002/api/v1.0/blogs?status='+postStatus)
            .then(function(data){
                $scope.blogList = data.data
                $scope.totalNewPost = $scope.blogList.length
            }).catch(function(err){
                console.log(err)
            })

    }
    function updateBlogStatus(blogData,statusCode){
        var id = blogData._id.$oid
        $http.post('http://localhost:9002/api/v1.0/blog/'+id+'/status/'+statusCode)
            .then(function(data){
                getPosts('new')
            }).catch(function(err){
                console.log(err)
            })
    }


    $scope.scrape = function(){
        $http.post('http://localhost:9002/api/v1.0/scrape')
            .then(function(data){
                getPosts('new')
            }).catch(function(err){
                console.log(err)
            })
    }
}
