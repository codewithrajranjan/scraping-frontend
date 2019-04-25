angular
    .module('app')
    .service('questionService', questionService)
questionService.$inject = ['$http','appSettings'];

function questionService($http,appSettings) {
    return {
        getTopics: getTopics,
        create:create,
        update:update,
        deleteQuestion:deleteQuestion
    }

    function getTopics(){
        var ipAddress = appSettings.getServerAddress();
        return new Promise(function(resolve,reject){
            $http({
                method: 'GET',
                url: ipAddress+'/api/v1.0/project',
                headers: {'Content-Type': 'application/json'}
            }).then(function(data){
                var result = data.data.data
                return resolve(result.topic);
            }).catch(function(err){
                console.log(err);
                reject(err);
            })
        });
    }
    function create(questionData){
        var ipAddress = appSettings.getServerAddress();
        return new Promise(function(resolve,reject){
            $http({
                method: 'POST',
                url: ipAddress+'/api/v1.0/question',
                data: questionData,
                headers: {'Content-Type': 'application/json'}
            }).then(function(data){
                return resolve(data.data);
            }).catch(function(err){
                console.log(err);
                reject(err)
            })
        });
    }
    function update(questionId,questionData){
        var ipAddress = appSettings.getServerAddress();
        return new Promise(function(resolve,reject){
            $http({
                method: 'PUT',
                url: ipAddress+'/api/v1.0/question/id/'+questionId,
                data: questionData,
                headers: {'Content-Type': 'application/json'}
            }).then(function(data){
                return resolve(data.data);
            }).catch(function(err){
                console.log(err);
                reject(err)
            })
        });
    }

    function deleteQuestion(questionId){
        var ipAddress = appSettings.getServerAddress();
        return new Promise(function(resolve,reject){
            $http({
                method: 'DELETE',
                url: ipAddress+'/api/v1.0/question/id/'+questionId,
                headers: {'Content-Type': 'application/json'}
            }).then(function(data){
                return resolve(data.data);
            }).catch(function(err){
                console.log(err);
                reject(err)
            })
        });
    }

}


