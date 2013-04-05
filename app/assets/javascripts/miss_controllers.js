'use strict';

/* Controllers */

function MissListCtrl($scope, $routeParams, $dialog, Miss, City, $filter) {
  // $scope.participants = Miss.query({
  //       top_id : $routeParams.top_id
  //   }, function(data) {
  // 	for (var i = 0; i < data.length; i++) {
  // 		data[i].image_src = JSON.parse(data[i].image_src)
  // 	};
  // });
  $scope.filteredparticipants = [];
  $scope.loading = true;

  $scope.participants = Miss.query(function(data) {
    // console.log(data)
    for (var i = 0; i < data.length; i++) {
      data[i].image_src = JSON.parse(data[i].image_src)
    };
    // $scope.search();
    $scope.filterByCity();
    $scope.loading = false;
  });

  $scope.cities = City.query();

  /* changing order */
  $scope.orderProp = '-likes[0].reposts';
  $scope.orderName = "репостам";
  $scope.changeOrder = function() {
    if ($scope.orderProp == '-likes[0].reposts') {
      $scope.orderProp = "-likes[0].likes";
      $scope.orderName = "лайкам";
    } else {
      $scope.orderProp = '-likes[0].reposts';
      $scope.orderName = "репостам";
    }
  }

  /* pagination */
  $scope.currentPage = 0;
  $scope.pageSize = 10;

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
  
  $scope.numberOfPages = function(){
      // if (participants == undefined) {
      //   participants = $scope.participants
      // }
      return Math.ceil($scope.filteredparticipants.length/$scope.pageSize);                
  }

  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
      window.scrollTo(0, 0);
  };
  
  $scope.nextPage = function () {
      // console.log($scope.currentPage);
      // console.log($scope.numberOfPages());
      if ($scope.currentPage < $scope.numberOfPages()-1) {
          $scope.currentPage++;
      }
      window.scrollTo(0, 0);
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
      window.scrollTo(0, 0);
  };

  /*modal with image */
  var imgt = '<shortcut></shortcut><img ng-src="{{img[ind]}}" ng-click="nextImg()">';

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
  $scope.filterByCity = function () {
    $scope.filteredparticipants = $filter('filter')($scope.participants, function (item) {
      if ($scope.mycity != undefined) {
        if (item.city_id == $scope.mycity._id && item.enabled) {
          return true;
        } else {
          return false;
        }
      } else {
        return item.enabled;
      }
    });
    $scope.currentPage = 0;
    $scope.numberOfPages();
  };

}

MissListCtrl.$inject = ['$scope', '$routeParams', '$dialog', 'Miss', 'City', '$filter'];

/* controller for modal with big image */
function ImageModalCtrl($scope, dialog, img, ind) {
  $scope.img = img;
  $scope.ind = ind;
  $scope.nextImg = function(){
      if ( $scope.ind+1 >= img.length) {
        $scope.ind = 0;
      } else {
        $scope.ind++;
      }
  };
  $scope.prevImg = function(){
      if ( $scope.ind > 0 ) {
        $scope.ind--;
      } else {
        $scope.ind = img.length-1
      }
  };

  $scope.keyPressed = function(e) {
    if (e.which == 37) {
      $scope.prevImg();
    } else if (e.which == 39) {
      $scope.nextImg();
    }
  };
}
ImageModalCtrl.$inject = ['$scope', 'dialog', 'img', 'ind'];