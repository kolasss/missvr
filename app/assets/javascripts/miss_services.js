'use strict';

/* Services */

angular.module('missServices', ['ngResource'])
	.factory('Miss', ['$resource', function($resource){
	  return $resource('participants.json', {}, {

	  });
	}])
  .factory('City', ['$resource', function($resource){
    return $resource('cities.json', {}, {

    });
  }]);
