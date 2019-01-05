//chart.js
angular
    .module('app')
    .controller('QuestionCtrl', QuestionCtrl)

QuestionCtrl.$inject = ['$scope','$http','$sce'];
function QuestionCtrl($scope,$http,$sce) {

    //var ipAddress = "192.168.0.103:9000"
    var ipAddress = "localhost:9000"
    //var ipAddress = "localhost"
    //var ipAddress = "192.168.0.108"
    // function declarations 

    $scope.getQuestion = getQuestion;
    $scope.searchQuestion = searchQuestion;
    $scope.createQuestion = createQuestion;




    $scope.uiConfig = {
        model: {
            question : null,
            topic : null
        },
        filter: {
            question : null,
            topic : null
        },
        topicList : [],
        questionList : []

    }

    getProjectConfig();
    getQuestion(null)
        

    function getProjectConfig(){
        $http({
            method: 'GET',
            url: 'http://'+ipAddress+'/api/v1.0/project',
            headers: {'Content-Type': 'application/json'}
        }).then(function(data){
            var result = data.data.data
            $scope.uiConfig.topicList = result.topic;
        }).catch(function(err){
            console.log(err);
        })


    }

    function searchQuestion(filter){
            
        var queryString = makeQueryString(filter);
        if(queryString==''){
            queryString = null;
        }
        getQuestion(queryString)

    }

    function createQuestion(questionData){

        $http({
            method: 'POST',
            url: 'http://'+ipAddress+'/api/v1.0/question',
            data: questionData,
            headers: {'Content-Type': 'application/json'}
        }).then(function(data){
            getQuestion()
        }).catch(function(err){
            console.log(err);
        })

    }

    function getQuestion(filter){

        var url = 'http://'+ipAddress+'/api/v1.0/question'
        if(filter != null){
            url = url +"?"+filter
        }
        $http({
            method: 'GET',
            url: url,
            headers: {'Content-Type': 'application/json'}
        }).then(function(data){
            $scope.uiConfig.questionList = data.data.data;
            console.log(data.data);
        }).catch(function(err){
            console.log(err);
        })

    }
    function makeQueryString(obj) {
        var str = [];
        for (var p in obj)
            if (obj[p]!=null && obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }


}
