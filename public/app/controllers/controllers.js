'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('bodyController', function( $rootScope, $scope, $window, $location,$http,$timeout,ngDialog) {

	
	$scope.openTemplate = function () {

		ngDialog.open({
			template: environment.projectRoot+"/app/partials/signup.html",
			className: 'ngdialog-theme-plain',
			scope: $scope
		});
	};

	/**
	 * @model name admin_login_credential
	*/
	$scope.admin_login_credential = {
	 	email : '',
	 	password : '',
	};

	/**
	 * @model name guard_login_credential
	*/
	$scope.guard_login_credential = {
	 	email : '',
	 	password : '',
	};

	/**
	 *	@model name resident_login_credential
	 */
	$scope.resident_login_credential = {
	 	email : '',
	 	password : '',
	};

	
	/**
	 * @model name success_messages
	 */
	 $scope.success_message = {
	 	resident_signup : '',
	 	guard_signup : ''
	 }

	/**
	 * @model name guard_signup
	 */
	$scope.guard_signup = {
		first_name : '',
		last_name : '',
		mobile_phone : '',
		email_address : '',
		parent_community : '',
		password : '',
		confirm_password : '',
		status : 'deactive'
	};

	/**
	 * @model name registent_signup
	 */
	$scope.resident_signup = {
		account_type : '',
		home_phone : '',
		first_name : '',
		last_name : '',
		mobile_phone : '',
		email_address : '',
		parent_community : '',
		parent_house : '',
		password : '',
		confirm_password : '',
		status : 'deactive'
	};

	$scope.guard_form_header = "Please enter following information to signup as guard.";
	$scope.resident_form_header = "Please enter following information to signup as resident.";


	$scope.convertTime = function(date){
	    var system_date  = Date.parse(date);;
	    var user_date = new Date();
	    var diff = Math.floor((user_date - system_date) / 1000);
	    if (diff <= 1) {return "just now";}
	    if (diff < 20) {return diff + " seconds ago";}
	    if (diff < 40) {return "half a minute ago";}
	    if (diff < 60) {return "less than a minute ago";}
	    if (diff <= 90) {return "one minute ago";}
	    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
	    if (diff <= 5400) {return "1 hour ago";}
	    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
	    if (diff <= 129600) {return "1 day ago";}
	    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
	    if (diff <= 777600) {return "1 week ago";}
	    return "on " + date.split("T")[0];
	  };

	 $scope.getTimeFromDate = function(date){
	 	var system_date  = new Date(date);
	 	var h = system_date.getHours();
		var m = system_date.getMinutes();

		return h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM");
	 }

	 $scope.getDateAndTime = function(date){

	 	var system_date  = new Date(date);
	 	var h = system_date.getHours();
		var m = system_date.getMinutes();

		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		
		return (m_names[curr_month]  + " " + curr_date + ", " +  curr_year) + " " + (h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM"));

	 }

	$scope.logout = function(){
		$window.localStorage.clear();
        $window.location.href=environment.projectRoot;
	}

	$scope.initUser = function(){
		$rootScope.user = JSON.parse($window.localStorage.getItem('user'));
		if($rootScope.user.user_type == 'resident'){
			$rootScope.require_controller = "residentController";
		} else if($rootScope.user.user_type == 'guard'){
			$rootScope.require_controller = "guardController";
		} else if($rootScope.user.user_type == "admin"){
			$rootScope.require_controller = "adminController";
		} else {
			$rootScope.require_controller = "";
		}
	}

	/**
	 * @method name getCommunities
	 * @apiName communities
	 */
	 $scope.getCommunities = function(){
	 	$http.get(environment.apiURL+'/community')
	 	.success(function(data){
	 		$scope.communities = data;
	 	});
	 }

	 /**
	 * @method name getHouses
	 * @apiName communities
	 */
	 $scope.getHouses = function(){
	 	$http.get(environment.apiURL+'/house')
	 	.success(function(data){
	 		$scope.houses = data;
	 	});
	 }

	 /**
	  * @method setting local storage for logined user
	  */
	  $scope.setLocalStorage = function(id, user_type, user, token){
	  	if(id && user_type && token){
	  		$window.localStorage.setItem('id',id);
		  	$window.localStorage.setItem('user_type',user_type);
		  	$window.localStorage.setItem('user',JSON.stringify(user));
		  	$window.localStorage.setItem('token',token);
		  	return true;
	  	} else {
	  		return false;
	  	}
	  }

	/** @method name adminLogin
	 *  @api name /login
	    @input param (object) admin_login_credential
	    @api responce (object)
     */
	$scope.adminLogin = function() {
		$http.post(environment.apiURL+"/admin/login",$scope.admin_login_credential)
		.success(function(data){
		  	if(data.err){
		  		$scope.login_error = data.err;
		  	} else {
		  		$rootScope.user = data.user;
		  		if($scope.setLocalStorage(data.user.id, data.user.user_type, data.user, data.token))
		  			$window.location.href = "home.html";
		  	}
		}).error(function(err) {
		   $scope.login_error = err.err;
		   $scope.admin_login_credential.password = "";
		});
	};

	/** @method name guardLogin
	 *  @api name /login
	    @input param (object) admin_login_credential
	    @api responce (object)
     */
	$scope.guardLogin = function() {
		$http.post(environment.apiURL+"/guard/login",$scope.guard_login_credential)
		.success(function(data){
		  	if(data.err){
		  		$scope.login_error = data.err;
		  	} else {
		  		$rootScope.user = data.user;
		  		if($scope.setLocalStorage(data.user.id, data.user.user_type, data.user, data.token))
		  			$window.location.href = "home.html#/g/dashboard";
		  	}
		}).error(function(err) {
		   $scope.login_error = err.err;
		   $scope.guard_login_credential.password = "";
		});
	};

	/** @method name residentLogin
	 *  @api name /login
	    @input param (object) admin_login_credential
	    @api responce (object)
     */
	$scope.residentLogin = function() {
		$http.post(environment.apiURL+"/resident/login",$scope.resident_login_credential)
		.success(function(data){
		  	if(data.err){
		  		$scope.login_error = data.err;
		  	} else {
		  		$rootScope.user = data.user;
		  		if($scope.setLocalStorage(data.user.id, data.user.user_type, data.user, data.token))
		  			$window.location.href = "home.html#/r/dashboard";
		  	}
		}).error(function(err) {
		   $scope.login_error = err.err;
		   $scope.resident_login_credential.password = "";
		});
	};

	/**
	 * @method name resetLoginCredential
	 */
	$scope.resetLoginCredentials = function(){
		$scope.admin_login_credential.email='';
		$scope.admin_login_credential.password='';
		$scope.guard_login_credential.email='';
		$scope.guard_login_credential.password='';
		$scope.resident_login_credential.email='';
		$scope.resident_login_credential.password='';
		$scope.login_error='';
	};
	$scope.resetSignUpForm = function(){
		$scope.guard_form_submited = false;
		$scope.resident_form_submited = false;
		//$scope.guard_form_header = "Please enter following information to signup as guard.";
		//$scope.resident_form_header = "Please enter following information to signup as resident.";
		//$scope.guard_form_header_class = '';
		//$scope.resident_form_header_class = '';
		$scope.guard_signup = {
			first_name : '',
			last_name : '',
			mobile_phone : '',
			email_address : '',
			parent_community : '',
			password : '',
			confirm_password : ''
		};
		$scope.resident_signup = {
			account_type : '',
			home_phone : '',
			first_name : '',
			last_name : '',
			mobile_phone : '',
			email_address : '',
			parent_community : '',
			parent_house : '',
			password : '',
			confirm_password : '',
			status : 'deactive'
		};
	}

	/**
	 * @method name guardSignUp
	 * @apiName /guard
	 * @apiType post
	 * @apiParam {String} first_name guard first name
	 * @apiParam {String} last_name guard last name
	 * @apiParam {String} mobile_phone guard Mobile Number
	 * @apiParam {String} email_address guard Email Address
	 * @apiParam {Integer} parent_community guard community id
	 * @apiParam {String} password guard password
	 */
	$scope.guardSignUp = function(form){
        $scope.guard_form_submited = true;
	    if($scope.guard_signup.password == $scope.guard_signup.confirm_password){
	        if(form.$valid){
	            $http.post(environment.apiURL+"/guard/create", $scope.guard_signup)
	            .success(function(data){
	                $scope.guard_form_header = data.message;
		 			$scope.guard_form_header_class = "success";
		 			$scope.resetSignUpForm();
		 			$window.location.href = "#/thankyou_page";
	            })
	            .error(function(error){
	                $scope.guard_form_header = error.message;
		 			$scope.guard_form_header_class = "error";
	              });
	         }
    	} 
    }

	/**
	 * @method name guardSignUp
	 * @apiName /guard
	 * @apiType post
	 * @apiParam {String} account_type resident Account Type
	 * @apiParam {String} first_name resident First Name
	 * @apiParam {String} last_name resident Last Name
	 * @apiParam {String} home_phone resident Home Phone Number
	 * @apiParam {String} mobile_phone resident Mobile Number
	 * @apiParam {String} email_address resident Email Address
	 * @apiParam {Integer} parent_house resident House id
	 * @apiParam {String} password resident Password
	 */
	$scope.residentSignUp = function(form){
	 	$scope.resident_form_submited = true;
	 	if($scope.resident_signup.password == $scope.resident_signup.confirm_password){
	 		if(form.$valid){
		 		$http.post(environment.apiURL+"/resident/create", $scope.resident_signup)
		 		.success(function(data){
		 			 $scope.resident_form_header = data.message;
		 			 $scope.resident_form_header_class = "success";
		 			 $scope.resetSignUpForm();
		 			 $window.location.href = "#/thankyou_page";
		 		})
		 		.error(function(error){
		 			$scope.resident_form_header = error.message;
		 			$scope.resident_form_header_class = "error";
		 		});
		 	}
	 	}
	}
	
});

