'use strict';

/* Controllers */

function MissListCtrl($scope, $routeParams, Miss) {
  $scope.participants = Miss.query({
        top_id : $routeParams.top_id
    }, function(data) {
  	for (var i = 0; i < data.length; i++) {
  		data[i].image_src = JSON.parse(data[i].image_src)
  	};
  });
  $scope.top_id = $routeParams.top_id;

  $scope.currentPage = 0;
  $scope.pageSize = 10;
  // $scope.data = [];
  $scope.numberOfPages=function(){
      return Math.ceil($scope.participants.length/$scope.pageSize);                
  }
  // for (var i=0; i<45; i++) {
  //     $scope.data.push("Item "+i);
  // }

  // $scope.orderProp = 'vk_id';

  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.participants.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };
}