'use strict';

/* App Module */

angular.module('missvr', ['missFilters', 'missServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'missvr/phone-list.html',   controller: MissListCtrl}).
      // when('/participants/:phoneId', {templateUrl: 'missvr/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/'});
}]);
