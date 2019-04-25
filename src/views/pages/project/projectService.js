angular
    .module('app')
    .service('projectService', projectService)
projectService.$inject = ['$http','appSettings'];
function projectService($http,appSettings) {
    return {
        getBlogTags:getBlogTags
    }

    function getBlogTags(){
        return new Promise(function(resolve,reject){
            var serverAddress = appSettings.getServerAddress();
            $http.get(serverAddress+'/api/v1.0/tag')
                .then(function(data){
                    resolve(data.data)
                }).catch(function(err){
                    reject(err)
                })
        })

    }
}


