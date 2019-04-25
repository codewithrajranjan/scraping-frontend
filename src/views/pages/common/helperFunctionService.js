angular
    .module('app')
    .service('helperFunctionService', helperFunctionService)
helperFunctionService.$inject = ['$http','appSettings'];

function helperFunctionService($http,appSettings) {
    return {
        clearObject : clearObject
    }
    function clearObject(data){

        var clonedData = JSON.parse(JSON.stringify(data));
        var keys = Object.keys(data);

        var obj = {}
        keys.forEach(function(item){
            obj[item] = null;
        });
        return obj;
        
    }

} 
