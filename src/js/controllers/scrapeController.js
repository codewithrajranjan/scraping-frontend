//chart.js
angular
.module('app')
.controller('ScrapeCtrl', ScrapeCtrl)

ScrapeCtrl.$inject = ['$scope','$http'];
function ScrapeCtrl($scope,$http) {
  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    $http.get('http://localhost:5000/api/v1.0/scrape')
    .then(function(data){
        $scope.blogList = data.data
    }).catch(function(err){
        console.log(err)
    })
}
