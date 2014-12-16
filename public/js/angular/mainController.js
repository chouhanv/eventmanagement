app.controller('mainController',function($scope,$rootScope,$http, $window) {
	$scope.admin_login_credential = {
	 	email : '',
	 	password : '',
	};
	$rootScope.countryList = {country : ""};
	$scope.cityList = {city : ""};
	$scope.login = function()
	{
		$http.post('/login',$scope.admin_login_credential)
		.success(function(data){
			if(data.message=='success'){
               $window.location.href = '/home';
			}
		 else
		 {
		 	$scope.message = "Try Again";
		 }
		})
		.error(function(error){
			console.log(error);
		})
	}
	$scope.createCountry = function()
	{
		$http.post('/createCountry',{country : $scope.country})
		.success(function(data){
			if (data.status =="true")
				{
				$scope.message = data.message;
				$rootScope.countryList.country.push(data.country);
				$scope.country = "";
				}
				else
				{
				  $scope.message = "Db error";
				}
		})
		.error(function(error){
			console.log(error);
			$scope.message = "Check server status"
		})

	}
	$scope.findCountry = function()
	{
		$http.post('/findCountry')
		.success(function(data){
			if (data.status){
				$rootScope.countryList = {country : data.country};
				console.log($scope.countryList);
			}
			else{
				$scope.findmessage = "Db error";
			}
		})
		.error(function(error){
			console.log(error);
			$scope.findmessage = "Check Server Status";
		})
	}
	$scope.deleteCountry = function(country,index)
	{
     $scope.id = country._id;
     $scope.status = country.status;
     $scope.index = index;
     $http.post('/deleteCountry',{id : $scope.id})
     .success(function(data){
     	if (data.status){
     		$scope.deletemessage = data.message;
     		$scope.findCountry();
     	}
     	else
     	{
     		$scope.deletemessage = "Db Error";
     	}
     	})
     .error(function(error){
     	console.log(error);
     	$scope.deletemessage = "Check server Status";
     })

     
	}
	$scope.createCity = function()
	{
		$scope.countryName = JSON.parse($scope.country).country;
		$scope.id = JSON.parse($scope.country)._id;
		$http.post('/createCity',{countryName : $scope.countryName,id : $scope.id,city : $scope.city})
		.success(function(data){
			if (data.status)
				{
					$scope.message = data.message;
					$scope.findCity();
					$scope.city = "";
					$scope.country = "";
				}
			else
			{
				$scope.message = "Db Error";
			}
		})
		.error(function(error){
			console.log(error)
			$scope.message = "Check Server Status";
		})
	}
	$scope.findCity = function()
	{
		$http.post('/findCity')
		.success(function(data){
			if (data.status){
				$scope.cityList = {city : data.city};
			}
			else{
				$scope.findmessage = "Db Error";
			}
		})
		.error(function(error){
			console.log(error);
			$scope.findmessage = "Check server status";
		})
	}
});