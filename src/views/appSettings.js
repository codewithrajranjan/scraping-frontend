angular
    .module('app')
    .service('appSettings', appSettings)

appSettings.$inject = ['$http'];

function appSettings($http) {
    return {
        getServerAddress:getServerAddress
    }

    function getServerAddress(){
        return "http://localhost:9000";
    }

    

}


