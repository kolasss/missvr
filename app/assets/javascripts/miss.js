'use strict';

/* App Module */

angular.module('missvr', ['missFilters', 'missServices', 'missDirectives', 'ui', 'ui.bootstrap'])
	// .config(['$httpProvider', function(provider){
 //    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
 //  }])
  .config(['$routeProvider', function($routeProvider) {
	  $routeProvider
      .when('/', {templateUrl: 'missvr/part-list.html',   controller: MissListCtrl})
      .otherwise({redirectTo: '/'});
	}]);