(function(){
  "use strict";

  angular.module('webApp',[
  	'ui.bootstrap',
    'ui.bootstrap.modal',
    'geoFence'
])

.controller('geofenceController', function($scope, $q, $http) {
        $scope.data = {};
        $scope.zones = {};

        $scope.getPartners = function(name){
            var differed = $q.defer();
            if(name){
                var searchObj = {};
                searchObj.name = name;
                // we have to filter partners using searchObj
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
                // we have to filter phlebos using searchObj
                $http.get('data/phlebos.json')
                .then(function(resp) {
                    $scope.phlebos = angular.copy(resp.data);
                    $scope.phlebos.forEach(function(obj){
                        obj.isCheck = false;
                    });
                    $scope.partners = [];
                    differed.resolve($scope.phlebos);
                });
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
        function save(zoneObj) {
            alert("geofence saved")
        }
        // zone Update
        function update(zoneObj) {
            alert("geofence saved")
        }
});

})();
