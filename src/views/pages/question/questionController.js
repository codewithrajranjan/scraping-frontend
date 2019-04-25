//chart.js
angular
    .module('app')
    .controller('QuestionCtrl', QuestionCtrl)

QuestionCtrl.$inject = ['$scope','$http','$sce','$uibModal','questionService','helperFunctionService'];
function QuestionCtrl($scope,$http,$sce,$uibModal,questionService,helperFunctionService) {

    //var ipAddress = "192.168.0.103:9000"
    var ipAddress = "localhost:9000"
    //var ipAddress = "localhost"
    //var ipAddress = "192.168.0.108"
    // function declarations 

    $scope.getQuestion = getQuestion;
    $scope.searchQuestion = searchQuestion;
    $scope.createQuestion = createQuestion;
    $scope.updateQuestion = updateQuestion;
    $scope.deleteQuestion = deleteQuestion;
    $scope.resetFilter = resetFilter;


    $scope.uiConfig = {
        filter: {
            question : null,
            topic : null
        },
        topicList : [],
        questionList : [],
    }

    getQuestion(null)

    function resetFilter(){
        $scope.uiConfig.filter = helperFunctionService.clearObject($scope.uiConfig.filter)
        getQuestion(null)
    }

    function searchQuestion(filter){

        var queryString = makeQueryString(filter);
        if(queryString==''){
            queryString = null;
        }
        getQuestion(queryString)

    }

    function createQuestion(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/pages/question/addQuestionModal.html',
            windowClass: 'show',
            size : 'lg',
            controller: function ($scope,$uibModalInstance,questionService) {
                 
                $scope.uiConfig = {
                    model : {
                        question : null,
                        description: null,
                        topic: null
                    },
                    editMode : false,
                    topicList : null
                }
                init();

                function init(){
                    questionService.getTopics().then((data)=>{
                        $scope.uiConfig.topicList=data
                    })
                }


                $scope.create = function(questionData){
                    questionService.create(questionData).then((result)=>{
                        getQuestion(null);
                        $uibModalInstance.close();
                    })
                }
                $scope.cancel = function(){
                    $uibModalInstance.close()
                }
            }
        });

       
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
    function deleteQuestion(questionData){
        var questionId = questionData._id.$oid;
            questionService.deleteQuestion(questionId)
            .then((data)=>{
                getQuestion(null)
            }).catch((err)=>{
                console.log('error')
            })
    }
    function updateQuestion(questionData){
        var questionId = questionData._id.$oid;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/pages/question/addQuestionModal.html',
            windowClass: 'show',
            size : 'lg',
            controller: function ($scope,$uibModalInstance,questionService) {
                 
                $scope.uiConfig = {
                    model : questionData,
                    editMode : true,
                    topicList : null
                }
                init();

                function init(){
                    questionService.getTopics().then(data=>$scope.uiConfig.topicList=data)
                }


                $scope.update = function(questionData){
                    questionService.update(questionId,questionData).then((result)=>{
                        getQuestion(null);
                        $uibModalInstance.close();
                    })
                }
                $scope.cancel = function(){
                    $uibModalInstance.close()
                }
            }
        });
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
