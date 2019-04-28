angular
    .module('app')
    .service('appSettings', appSettings)

appSettings.$inject = ['$http'];

function appSettings($http) {
    return {
        getServerAddress:getServerAddress
    }

    function getServerAddress(){
        return "localhost:9005";
    }

    

}


