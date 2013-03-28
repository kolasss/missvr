'use strict';

/* Controllers */

function MissListCtrl($scope, Miss) {
  $scope.participants = Miss.query();

	// for(var i = 0; i < $scope.participants.length; i++) {
	// 		$scope.participants[i].image_src = angular.fromJson($scope.participants[i].image_src);
	// }

  $scope.orderProp = 'vk_id';
}

//PhoneListCtrl.$inject = ['$scope', 'Miss'];



// function PhoneDetailCtrl($scope, $routeParams, Miss) {
//   $scope.phone = Miss.get({phoneId: $routeParams.phoneId}, function(phone) {
//     $scope.mainImageUrl = phone.images[0];
//   });

//   $scope.setImage = function(imageUrl) {
//     $scope.mainImageUrl = imageUrl;
//   }
// }

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Miss'];
