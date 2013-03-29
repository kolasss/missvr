'use strict';

/* App Module */

angular.module('missvr', ['missFilters', 'missServices'])
	.config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function($routeProvider) {
	  $routeProvider
      .when('/:top_id', {templateUrl: 'missvr/phone-list.html',   controller: MissListCtrl})
      .otherwise({redirectTo: '/reposts'});
	}]);
