'use strict';

/* Controllers */

function MissListCtrl($scope, $routeParams, $dialog, Miss, City) {
  $scope.participants = Miss.query({
        top_id : $routeParams.top_id
    }, function(data) {
  	for (var i = 0; i < data.length; i++) {
  		data[i].image_src = JSON.parse(data[i].image_src)
  	};
  });
  $scope.cities = City.query();

  $scope.top_id = $routeParams.top_id;

  /* pagination */
  $scope.currentPage = 0;
  $scope.pageSize = 10;

  $scope.numberOfPages=function(participants){
      if (participants == undefined) {
        participants = $scope.participants
      }
      return Math.ceil(participants.length/$scope.pageSize);                
  }

  // $scope.orderProp = '-likes[0].reposts';

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

  /*modal with image */
  var imgt = '<img ng-src="{{img[ind]}}" ng-click="nextimg()">';

  $scope.showbig = function(img, ind){
    var d = $dialog.dialog({
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      // transitionClass: 'fade',
      // triggerClass: 'in',
      backdropFade: true,
      dialogFade: true,
      controller: 'ImageModalCtrl',
      template:  imgt,
      resolve: {img: function(){ return img},
      ind: function(){ return ind} },
      dialogClass: 'imgmodal'
    });
    d.open();
  };

  /* filter by city */
  $scope.filterByCity = function(participants, query) {
    var filteredparticipants = [];
    // console.log(query);
    if (query != undefined) {
      angular.forEach(participants, function(part) {
        if (part.city_id == query._id) {
          filteredparticipants.push(part);
        }
      });
    } else {
      filteredparticipants = participants;
    }

    // $scope.numberOfPages = $scope.numberOfPages(filteredparticipants);

    return filteredparticipants;
  };
}

/* controller for modal with big image */
function ImageModalCtrl($scope, dialog, img, ind) {
    $scope.img = img;
    $scope.ind = ind;
    $scope.nextimg = function(){
        if ( $scope.ind+1 >= img.length) {
          $scope.ind = 0;
        } else {
          $scope.ind++;
        }
    };
}