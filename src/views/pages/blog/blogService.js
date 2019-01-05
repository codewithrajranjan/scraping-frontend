angular
    .module('app')
    .service('blogService', blogService)
blogService.$inject = ['$http','appSettings'];
function blogService($http,appSettings) {
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


