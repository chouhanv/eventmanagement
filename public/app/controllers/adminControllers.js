'use strict';

/* Controllers */
angular.module('myApp.adminControllers', [])
.controller('adminController', function( $rootScope, $scope, $window, $location,$http,$timeout) {

  $scope.token = $window.localStorage.getItem('token');
  $scope.userId = $window.localStorage.getItem('id');
  $scope.apiCredential = "&token="+$scope.token+"&auth_id="+$scope.userId;

	$scope.resident = function() {
		$http.get(environment.apiURL+"/resident?"+$scope.apiCredential)
		.success(function(data){
		  	if(data){
		  		$scope.residents = data;
		  	} 
		 }).error(function(err) {
		   $scope.login_error = "Please try again.";
		});
	};
	// $scope.activePermision = function(id)
	// {
 //      $scope.status = status;
 //      $scope.id     = id;
 //      $scope.email_address = email;
 //      console.log($scope.status);
 //      console.log($scope.id);
 //      console.log($scope.email_address);
 //      $http.post(environment.apiURL+"/activePermision",{status : $scope.status,id : $scope.id,email_address : $scope.email_address})
 //      .success(function(data){
 //      	if (data)
 //      		{
 //             $scope.message = data;
 //             $scope.resident();
 //      		}
 //      })
 //      .error(function(err){
 //      	$scope.message = "Please try again";
 //      })
	// };
	$scope.guard = function() {
		$http.get(environment.apiURL+"/guard?"+$scope.apiCredential)
		.success(function(data){
		  	if(data){
		  		$scope.guards = data;
		  	} 
		 }).error(function(err) {
		   $scope.login_error = "Please try again.";
		});
	};

  $scope.activeResidentPermision = function(id) {
      if(id){
        $http.post(environment.apiURL+"/resident/activate?"+$scope.apiCredential,{resident_id:id})
        .success(function(data){
          if (data) {
               $scope.message = data;
               $scope.resident();
            }
        })
        .error(function(err){
          $scope.message = "Please try again";
        });
      } else {
        console.log("Resident id missing")
      }
  };

  $scope.deactiveResidentPermision = function(id) {
      if(id){
        $http.post(environment.apiURL+"/resident/deactivate?"+$scope.apiCredential,{resident_id:id})
        .success(function(data){
          if (data) {
               $scope.message = data;
               $scope.resident();
            }
        })
        .error(function(err){
          $scope.message = "Please try again";
        });
      } else {
        console.log("Resident id missing")
      }
  };

	$scope.activeGuardPermision = function(id) {
      if(id){
        $http.post(environment.apiURL+"/guard/activate?"+$scope.apiCredential,{guard_id:id})
        .success(function(data){
          if (data) {
               $scope.message = data;
               $scope.guard();
            }
        })
        .error(function(err){
          $scope.message = "Please try again";
        });
      } else {
        console.log("Guard id missing")
      }
	};
  $scope.deactiveGuardPermision = function(id) {
      if(id){
        $http.post(environment.apiURL+"/guard/deactivate?"+$scope.apiCredential,{guard_id:id})
        .success(function(data){
          if (data) {
               $scope.message = data;
               $scope.guard();
            }
        })
        .error(function(err){
          $scope.message = "Please try again";
        });
      } else {
        console.log("Resident id missing")
      }
  };
});