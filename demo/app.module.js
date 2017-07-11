(function(){
  "use strict";

  angular.module('webApp',[
  	'ui.bootstrap',
    'ui.bootstrap.modal',
    'geoFence'
])

.controller('geofenceController', function($scope, $q, $http) {
       $scope.getPartners = function(name){
            var differed = $q.defer();
            if(name){
                var searchObj = {};
                searchObj.name = name;
                // we have to filter partner
                $http.get('data/partners.json')
                .then(function(resp) {
                    $scope.partners = resp.data;
                    if(!$scope.partners.length) $scope.phlebos = [];
                    differed.resolve($scope.partners);
                });
            }
            else{
                differed.reject();
            }
            return differed.promise;
        }

        $scope.getUsers = function(id){
            var differed = $q.defer();
            if(id){
                var searchObj = {};
                searchObj.role = "serviceagent";
                searchObj.partner_id = id;
                userinfoFactory.get('',searchObj).then(function(data){
                    $scope.phlebos = angular.copy(data.response);
                    $scope.phlebos.forEach(function(obj){
                        obj.isCheck = false;
                    });
                    $scope.partners = [];
                    differed.resolve($scope.phlebos);
                })
            }
            else{
                differed.reject();
            }
            return differed.promise;
        }

        $scope.Save = function(zoneObj){
          $scope.data.zones = angular.copy(zoneObj);
          $scope.data.zones._id ? update($scope.data.zones) : save($scope.data.zones);
        }

        // zone save
        function save() {
            geofenceFactory.add($scope.data.zones).then(function(data) {
                $scope.successFlag = true;
                $scope.data.zones = {};
                $scope.zones = {};
                $state.go('main.geofence');
            });
        }
        // zone Update
        function update() {

            geofenceFactory.update($scope.data.zones).then(function(data) {
                console.log(data);
                $scope.successFlag = true;
                $scope.zones = {};
                $state.go('main.geofence');
            });
        }
});

})();
