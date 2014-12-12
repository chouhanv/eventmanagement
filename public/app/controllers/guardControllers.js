angular.module('myApp.guardControllers', [])
.controller('guardController', function( $rootScope, $scope, $window, $location,$http,$timeout) {


	$scope.token = $window.localStorage.getItem('token');
	$scope.userId = $window.localStorage.getItem('id');
	$scope.apiCredential = "&token="+$scope.token+"&auth_id="+$scope.userId;
	$scope.guestQuery = {
		parent_community : $rootScope.user.parent_community
	}
	$scope.guestHistory = new Array();
	$scope.guestHistoryOptions = {
		limit:30,
		page:1,
		guard_id:$rootScope.user.id
	}

	$scope.findGuest = function(){
		$http.post(environment.apiURL+"/guest/guard/findGuest?"+$scope.apiCredential, $scope.guestQuery)
		.success(function(guestentry){
			$scope.guestentry = guestentry;
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.showGuestDetali = function(guest){
		$scope.guestDetail = guest;
		$http.post(environment.apiURL+'/guest/detail?'+$scope.apiCredential, {guest_id:guest.id})
		.success(function(detail){
			$scope.guestDetail.history = detail.history;
			$scope.findResidentAddress($scope.guestDetail.parent_resident.id)
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.findHistory = function(){
		$http.post(environment.apiURL+"/guestentry/history?"+$scope.apiCredential, $scope.guestHistoryOptions)
		.success(function(data){
			angular.forEach(data.results, function(val, i){
				$scope.guestHistory.push(val);
			});
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.inactiveGuestPassStatus= function(id){
		if(id){
			$http.post(environment.apiURL+"/guest/guard/signoutGuest?"+$scope.apiCredential, {guest_id : id})
			.success(function(data){
				angular.forEach($scope.guestentry, function(value, index){
					if(value.id==id){
						value.guest_pass_status='inactive';
						value.guest_pass_status_updated_date = new Date();
						$scope.showGuestDetali(value);
						$scope.guestHistory = [];
						$scope.guestHistoryOptions.page = 1;
						$scope.findHistory();
					}
				})
			})
			.error(function(error){
				console.log(error);
			});
		} else {
			console.log("id missing");
		}
	}

	$scope.activeGuestPassStatus = function(id){
		if(id){
			$http.post(environment.apiURL+"/guest/guard/signinGuest?"+$scope.apiCredential, {guest_id : id})
			.success(function(data){
				angular.forEach($scope.guestentry, function(value, index){
					if(value.id==id){
						value.guest_pass_status='active';
						value.guest_pass_status_updated_date = new Date();
						$scope.showGuestDetali(value);
						$scope.guestHistory = [];
						$scope.guestHistoryOptions.page = 1;
						$scope.findHistory();
					}
				});
			})
			.error(function(error){
				console.log(error);
			});
		} else {
			console.log("id missing");
		}
	}

	$scope.arrivedGuestPassStatus = function(id){
		if(id){
			$http.post(environment.apiURL+"/guest/guard/arriveGuest?"+$scope.apiCredential, {guest_id : id})
			.success(function(data){
				angular.forEach($scope.guestentry, function(value, index){
					if(value.id==id){
						value.guest_pass_status='arrived';
						value.guest_pass_status_updated_date = new Date();
						$scope.showGuestDetali(value);
						$scope.guestHistory = [];
						$scope.guestHistoryOptions.page = 1;
						$scope.findHistory();
					}
				});
			})
			.error(function(error){
				console.log(error);
			});
		} else {
			console.log("id missing");
		}
	}

	$scope.findResidentAddress = function(id){
		$http.get(environment.apiURL+'/resident/address?resident_id='+id+""+$scope.apiCredential)
		.success(function(data){
			$scope.guestDetail.parent_resident.address_line1 = data.address_line1;
			$scope.guestDetail.parent_resident.address_line2 = data.address_line2;
		})
		.error(function(error){
			console.log(error);
		});
	}

});