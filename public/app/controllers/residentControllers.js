angular.module('myApp.residentControllers', [])
.controller('residentController', function( $rootScope, $scope, $window, $location,$http,$timeout) {

	$scope.token = $window.localStorage.getItem('token');
	$scope.userId = $window.localStorage.getItem('id');
	$scope.apiCredential = "&token="+$scope.token+"&auth_id="+$scope.userId;
	$scope.guest_message = "Please enter following information";
	$scope.guest = {
		parent_resident : $scope.userId,
		status : "active",
		guest_pass_status : 'inactive'
	}

	$scope.clearGuestForm = function(){
		$scope.guest = {
			parent_resident : $scope.userId,
			status : "active",
			guest_pass_status : 'inactive'
		}
		$scope.guest_message = "";
		$scope.guest_message_class = "";
		$scope.guest_form_submited = false;
	}

	$scope.isShowGuestDetail = false;
	$scope.resident_signup = {
		account_type : '',
		home_phone : '',
		first_name : '',
		last_name : '',
		mobile_phone : '',
		email_address : '',
		parent_community : $rootScope.user.parent_community,
		parent_house : $scope.user.parent_house,
		password : '',
		confirm_password : '',
		status : 'deactive',
		parent_resident : $rootScope.user.id
	};

	$scope.clearSignUpForm = function(){
		$scope.resident_signup = {
			account_type : '',
			home_phone : '',
			first_name : '',
			last_name : '',
			mobile_phone : '',
			email_address : '',
			parent_community : $rootScope.user.parent_community,
			parent_house : $scope.user.parent_house,
			password : '',
			confirm_password : '',
			status : 'deactive',
			parent_resident : $rootScope.user.id
		};
		$scope.resident_form_header = "";
		$scope.resident_form_header_class = "";
		$scope.resident_form_submited = false;
	}

	$scope.guestHistory = [];
	$scope.guestHistoryOptions = {
		limit:10,
		page:1,
		resident_id:$rootScope.user.id
	}

	$scope.residentSignUp = function(form){
	 	$scope.resident_form_submited = true;
	 	if($scope.resident_signup.password == $scope.resident_signup.confirm_password){
	 		if(form.$valid){
		 		$http.post(environment.apiURL+"/resident/create?"+$scope.apiCredential, $scope.resident_signup)
		 		.success(function(data){
		 			 $scope.resident_form_header = data.message;
		 			 $scope.resident_form_header_class = "success";
		 			 $("#addResident button[type='button']").click();
		 			 $scope.getSimilarResidents();
		 		})
		 		.error(function(error){
		 			$scope.resident_form_header = error.message;
		 			$scope.resident_form_header_class = "error";
		 		});
		 	}
	 	}
	}

	$scope.guest_entry = {
		parent_resident : $scope.userId
	}

	$scope.guestEdit = function(guest){
		$scope.guest_message="";
		$rootScope.guest_edit = {
			first_name:guest.first_name,
			last_name:guest.last_name,
			mobile_phone:guest.mobile_phone,
			email_address:guest.email_address,
			permanent_pass:guest.permanent_pass,
			favourite:guest.favourite,
			status:guest.status,
			guest_pass_status:guest.guest_pass_status,
			id:guest.id
		};
	}

	$scope.guestEntryEdit = function(guest_entry){
		$rootScope.guest_entry_edit = guest_entry;
	}
	
	$scope.myGuest = function(){
		$http.get(environment.apiURL+"/guest?"+$scope.apiCredential)
			.success(function(guests){
				$scope.guests = guests;
			})
			.error(function(error){
				console.log(error);
			});
	}

	$scope.myGuestEntry = function(){
		$http.get(environment.apiURL+"/guestentry?"+$scope.apiCredential)
			.success(function(guests_entry){
				$scope.guests_entry = guests_entry;
			})
			.error(function(error){
				console.log(error);
			});
	}

	$scope.addGuest = function(form){
		$scope.guest_form_submited = true;
		if(form.$valid){
			$http.post(environment.apiURL+"/guest/create?"+$scope.apiCredential, $scope.guest)
			.success(function(data){
				$scope.guest_message = data.message;
				$scope.guest_message_class = "success";
				$scope.guest_form_submited = false;
				$scope.guest = {
					parent_resident : $scope.userId,
					status : "active",
					guest_pass_status : 'inactive'
				}
				$("#addGuest button[type='button']").click();
				$scope.findGuestsEntry();
				$scope.findHistory();
			})
			.error(function(error){
				$scope.guest_message = error.err;
				$scope.guest_message_class = "error";
			});
		}
	}
	$scope.updateGuest = function(form){
		$scope.guest_form_submited = true;
		
		if(form.$valid){
			$http.post(environment.apiURL+"/guest/update?"+$scope.apiCredential, $scope.guest_edit)
			.success(function(data){
				$scope.guest_message = data.message;
				$scope.guest_message_class = "success";
				$scope.guest_form_submited = false;
				$scope.guest = {
					parent_resident : $scope.userId,
					status : "active"
				}
				$scope.showGuestDetail($scope.guest_edit.id)
				$scope.findGuestsEntry();

				$("#guestEdit button[type='button']").click();
			})
			.error(function(error){
				$scope.guest_message = error.err;
				$scope.guest_message_class = "error";
			});
		}
	}

	$scope.addGuestEntry = function(form){
		$scope.guest_entry_form_submited = true;
		if(form.$valid){
			$http.post(environment.apiURL+"/guestentry/create?"+$scope.apiCredential, $scope.guest_entry)
			.success(function(data){
				$scope.guest_entry_message = data.message;
				$scope.guest_entry_message_class = "success";
				$scope.guest_entry_form_submited = false;
				$scope.guest_entry={
					parent_resident : $scope.userId
				}
				$scope.findGuestsEntry();
				$scope.findHistory();
				$("#addGuestEntry button[type='button']").click();
			})
			.error(function(error){
				$scope.guest_entry_message = error.err;
				$scope.guest_entry_message_class = "error";
			});
		}
	}

	$scope.updateGuestEntry = function(form){
		$scope.guest_entry_edit_form_submited = true;
		console.log("from here");
		if(form.$valid){
			$http.post(environment.apiURL+"/guestentry/update?"+$scope.apiCredential, $scope.guest_entry_edit)
			.success(function(data){
				$scope.guest_entry_edit_message = data.message;
				$scope.guest_entry_edit_message_class = "success";
				$scope.guest_entry_edit_form_submited = false;
				$scope.guest_entry = {
					parent_resident : $scope.userId,
				}
				$scope.findHistory();
				$("#guestEntryEdit button[type='button']").click();
			})
			.error(function(error){
				$scope.guest_entry_edit_message = error.err;
				$scope.guest_entry_edit_message_class = "error";
			});
		}
	}

	$scope.getSimilarResidents = function(){
		$http.get(environment.apiURL+"/similarResident?account_type="+$rootScope.user.account_type+"&parent_house="+$rootScope.user.parent_house+""+$scope.apiCredential)
		.success(function(similar_residents){
			$scope.similar_residents = similar_residents;
			// angular.forEach($scope.similar_residents, function(data, index){
			// 	if($rootScope.user.id == data.id) $scope.similar_residents.splice(index,1);
			// });
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.guestQuery = {
		type : 'all',
		resident_id : $rootScope.user.id,
		parent_house : $rootScope.user.parent_house,
		page : 1,
		account_type : $rootScope.user.account_type
	}

	$scope.setGuestQueryType = function(type){
		$scope.guestQuery.type = type ? type:'all';
		$scope.guestQuery.page = 1;
		$scope.findGuestsEntry();
		$scope.isShowGuestDetail=false;
	}
	$scope.setGuestQueryResident = function(id){
		$scope.guestQuery.resident_id = id ? id:'';
		$scope.guestQuery.type = 'all';
		$scope.findGuestsEntry();
		$scope.isShowGuestDetail=false;
		$(".active-resident").removeClass("actv-cls");
		$("#res-div-"+id).addClass("actv-cls");
	}

	$scope.setGuestQueryPage = function(page){
		$scope.guestQuery.page = page ? page:1;
		$scope.findGuestsEntry();
		$scope.isShowGuestDetail=false;
	}

	$scope.isActiveClass = function(v, v1){
		return v == v1 ? "active":"";
	}

	$scope.findGuestsEntry = function(){
		
		$http.post(environment.apiURL+"/guest/resident/findGuest?"+$scope.apiCredential, $scope.guestQuery)
		.success(function(guestentry){
			$scope.total_page = guestentry.total_page;
			$scope.guestentry = guestentry.results;
			$scope.current_page = guestentry.page;
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.inactiveGuestPassStatus= function(id){
		if(id){
			$http.post(environment.apiURL+"/guest/resident/signoutGuest?"+$scope.apiCredential, {guest_id : id})
			.success(function(data){
				angular.forEach($scope.guestentry, function(value, index){
					if(value.id==id){
						value.guest_pass_status='inactive';
						value.guest_pass_status_updated_date = new Date();
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

	$scope.activeGuestPassStatus = function(id){
		if(id){
			$http.post(environment.apiURL+"/guest/resident/signinGuest?"+$scope.apiCredential, {guest_id : id})
			.success(function(data){
				angular.forEach($scope.guestentry, function(value, index){
					if(value.id==id){
						value.guest_pass_status='active';
						value.guest_pass_status_updated_date = new Date();
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
			$http.post(environment.apiURL+"/guest/resident/arriveGuest?"+$scope.apiCredential, {guest_id : id})
			.success(function(data){
				angular.forEach($scope.guestentry, function(value, index){
					if(value.id==id){
						value.guest_pass_status='arrived';
						value.guest_pass_status_updated_date = new Date();
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

	$scope.showGuestDetail = function(id){
		$scope.isShowGuestDetail = true;
		$http.post(environment.apiURL+'/guest/detail?'+$scope.apiCredential, {guest_id:id})
		.success(function(detail){
			$scope.guestDetail = detail;
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.hideGuestDetail = function(){
		$scope.isShowGuestDetail = false;
		$scope.findGuestsEntry();
	}

	$scope.viewGuestEntryDetail = function(entry){
		$scope.view_guest_entry_detail = entry;
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
});