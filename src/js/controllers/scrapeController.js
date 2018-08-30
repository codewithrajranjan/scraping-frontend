//chart.js
angular
    .module('app')
    .controller('ScrapeCtrl', ScrapeCtrl)

ScrapeCtrl.$inject = ['$scope','$http'];
function ScrapeCtrl($scope,$http) {
    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    init()
    function init(){
        $http.get('http://localhost:9002/api/v1.0/blogs')
            .then(function(data){
                $scope.blogList = data.data
                $scope.totalNewPost = $scope.blogList.length
            }).catch(function(err){
                console.log(err)
            })

    }


    $scope.scrape = function(){
        $http.post('http://localhost:9002/api/v1.0/scrape')
            .then(function(data){
                init()
            }).catch(function(err){
                console.log(err)
            })
    }
}
