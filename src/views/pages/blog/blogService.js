angular
    .module('app')
    .service('blogService', blogService)
blogService.$inject = ['$http','appSettings'];
function blogService($http,appSettings) {
    return {
        getPosts : getPosts,
        getBlogTags:getBlogTags,
        getIdentifiers: getIdentifiers,
        scrape : scrape,
        scrapeByIdentifer: scrapeByIdentifer
    }

    function getBlogTags(){
        return new Promise(function(resolve,reject){
            var serverAddress = "http://"+appSettings.getServerAddress();
            $http.get(serverAddress+'/api/v1.0/identifier')
                .then(function(data){
                    resolve(data.data)
                }).catch(function(err){
                    reject(err)
                })
        })

    }
    function getIdentifiers(){
        return new Promise(function(resolve,reject){
            var serverAddress = "http://"+appSettings.getServerAddress();
            $http.get(serverAddress+'/api/v1.0/identifier')
                .then(function(data){
                    resolve(data.data)
                }).catch(function(err){
                    reject(err)
                })
        })
    }
    function getPosts(queryParam){
        return new Promise(function(resolve,reject){
            var url  = 'http://'+appSettings.getServerAddress()+'/api/v1.0/blogs'+queryParam
            $http.get(url)
                .then(function(data){
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
        })

    }
    function scrape(){
        return new Promise(function(resolve,reject){
            var url  = 'http://'+appSettings.getServerAddress()+'/api/v1.0/scrape';
            $http.post(url)
                .then(function(data){
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
        })
    }
    function scrapeByIdentifer(identifier){
        return new Promise(function(resolve,reject){
            var url  = 'http://'+appSettings.getServerAddress()+'/api/v1.0/scrape/identifier/'+identifier;
            $http.post(url)
                .then(function(data){
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
        })
    }
}



