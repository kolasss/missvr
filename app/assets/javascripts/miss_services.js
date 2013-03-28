'use strict';

/* Services */

angular.module('missServices', ['ngResource']).
  factory('Miss', function($resource){
	  return $resource('participants.json', {}, {
	  	
	  });
	});