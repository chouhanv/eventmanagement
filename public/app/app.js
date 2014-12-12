'use strict';
// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ui.router',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.adminControllers',
  'myApp.guardControllers',
  'myApp.residentControllers',
  'ngDialog'
]);
myApp.config(function($stateProvider, $urlRouterProvider) {
  
	$stateProvider
    .state('/login', {
      url: "/login",
      templateUrl: "/app/partials/login.html",
    })
    .state('/signup', {
      url: "/signup",
      templateUrl: "/app/partials/signup.html"
    })
    .state('/thankyou_page', {
      url: "/thankyou_page",
      templateUrl: "/app/partials/thankyou.html"
    })
    .state('/admin',{
      url : "/admin",
      templateUrl : "/app/partials/admin.html"
    })

    /**
     * Admin Routing
     */
     .state('/a/resident',{
      url : "/a/resident",
      templateUrl : environment.projectRoot+"/app/partials/admin/resident.html",
      controller : "adminController"
    })
    .state('/a/dashboard',{
      url : "/a/dashboard",
      templateUrl : environment.projectRoot+"/app/partials/admin/dashboard.html",
      controller : "adminController"
    })
    .state('/a/guard',{
      url : "/a/guard",
      templateUrl : environment.projectRoot+"/app/partials/admin/guard.html",
      controller : "adminController"
    })

    /**
     * Guard Routing
     */
    .state('/g/dashboard',{
      url : "/g/dashboard",
      templateUrl : environment.projectRoot+"/app/partials/guard/dashboard.html",
      controller : "guardController"
    })
    .state('/g/ravens_run',{
      url : "/g/ravens_run",
      templateUrl : environment.projectRoot+"/app/partials/guard/ravens_run.html",
      controller : "guardController"
    })
    .state('/g/guest_list',{
      url : "/g/guest_list",
      templateUrl : environment.projectRoot+"/app/partials/guard/guest_list.html",
      controller : "guardController"
    })
    .state('/g/restrictions',{
      url : "/g/restrictions",
      templateUrl : environment.projectRoot+"/app/partials/guard/restrictions.html",
      controller : "guardController"
    })
    .state('/g/user_accounts',{
      url : "/g/user_accounts",
      templateUrl : environment.projectRoot+"/app/partials/guard/user_accounts.html",
      controller : "guardController"
    })

    /**
     * Resident Routing
     */
    .state('dashboard',{
      url : "/r/dashboard",
      templateUrl : environment.projectRoot+"/app/partials/resident/dashboard.html",
      controller : "residentController"
    })
    .state('/r/manage_guest',{
      url : "/r/manage_guest",
      templateUrl : environment.projectRoot+"/app/partials/resident/manage_guest.html",
      controller : "residentController"
    })
    .state('/r/new_guest',{
      url : "/r/new_guest",
      templateUrl : environment.projectRoot+"/app/partials/resident/new_guest.html",
      controller : "residentController"
    })
    .state('/r/guest_edit',{
      url : "/r/guest_edit",
      templateUrl : environment.projectRoot+"/app/partials/resident/guest_edit.html",
      controller : "residentController"
    })
    .state('/r/manage_guest_entry',{
      url : "/r/manage_guest_entry",
      templateUrl : environment.projectRoot+"/app/partials/resident/manage_guest_entry.html",
      controller : "residentController"
    })
    .state('/r/new_guest_entry',{
      url : "/r/new_guest_entry",
      templateUrl : environment.projectRoot+"/app/partials/resident/new_guest_entry.html",
      controller : "residentController"
    })
    .state('/r/guest_entry_edit',{
      url : "/r/guest_entry_edit",
      templateUrl : environment.projectRoot+"/app/partials/resident/guest_entry_edit.html",
      controller : "residentController"
    })
    
})
.run(function($rootScope, $location, $http, $window){
    if(!$window.localStorage.getItem('id') || !$window.localStorage.getItem('token') || !$window.localStorage.getItem('user_type')) {
      $window.localStorage.clear();
      if(environment.projectRoot+"/home.html" == $window.location.pathname){
        $window.location.href = environment.projectRoot;
      } else {
        $location.path('/login');
      }
    } else{
      if(!(environment.projectRoot+"/home.html" == $window.location.pathname)){
        if($window.localStorage.getItem('user_type') == 'admin'){
          $window.location.href = "home.html#/a/dashboard";
        } else if($window.localStorage.getItem('user_type') == 'resident'){
           $window.location.href = "home.html#/r/dashboard";
        } else if($window.localStorage.getItem('user_type') == 'guard'){
           $window.location.href = "home.html#/g/dashboard";
        } else {
          $window.location.href = environment.projectRoot;
        }
      }
    }
});