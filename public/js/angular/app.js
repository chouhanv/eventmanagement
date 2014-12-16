var app = angular.module('newducks',['ngRoute']);
app.config(function($routeProvider) {
	$routeProvider.when('/',{
	templateUrl  : 'pages/login.html',
	controller  : 'mainController'
	})
	
})
