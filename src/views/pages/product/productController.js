//chart.js
angular
    .module('app')
    .controller('ProductCtrl', ProductCtrl)

ProductCtrl.$inject = ['$scope','$http','$sce','$uibModal','helperFunctionService','appSettings'];
function ProductCtrl($scope,$http,$sce,$uibModal,helperFunctionService,appSettings) {

    //var ipAddress = "192.168.0.103:9000"
    var ipAddress = appSettings.getServerAddress()

    $scope.uiConfig = {
        productData : null,
        options : {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        },
        datasetOverride : [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }]
    }

    getProducts(null)

    function getProducts(filter){

        var url = 'http://'+ipAddress+'/api/v1.0/product?format=graph'
        $http({
            method: 'GET',
            url: url,
            headers: {'Content-Type': 'application/json'}
        }).then(function(data){
            var result = data.data.data;
            console.log(result)
            $scope.uiConfig.productData = result;
        }).catch(function(err){
            console.log(err);
        })

    }

}
