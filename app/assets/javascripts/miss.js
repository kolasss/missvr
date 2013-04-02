'use strict';

/* App Module */

angular.module('missvr', ['missFilters', 'missServices', 'ui.bootstrap'])
	.config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function($routeProvider) {
	  $routeProvider
      .when('/', {templateUrl: 'missvr/phone-list.html',   controller: MissListCtrl})
      .otherwise({redirectTo: '/'});
	}]);
