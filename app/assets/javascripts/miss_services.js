'use strict';

/* Services */

angular.module('missServices', ['ngResource'])
	.factory('Miss', function($resource){
	  return $resource('participants.json', {}, {

	  });
	})
  .factory('Movie', function($resource){
    return $resource('movie/:movie_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
