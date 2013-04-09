'use strict';

/* Directives */

angular.module('missDirectives', [])
  .directive('shortcut', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      link: function postLink(scope, iElement, iAttrs){
        jQuery(document).on('keydown', function(e){
          scope.$apply(scope.keyPressed(e));
        });
      }
    };
  })
  .directive('multiserieslinechart', function() {

    

    return {
      restrict: 'E',
      scope: {
        likes: '='
      },
      link: function(scope, element, attrs) {
        // constants
        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set up initial svg object
        if (!(svg != null)) {
          var svg = d3.select(element[0])
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        // set up initial svg object
        // var vis = d3.select(element[0])
        //   .append("svg")
        //     .attr("width", width)
        //     .attr("height", height + margin + 100);
            
        scope.$watch('likes', function (newVal, oldVal) {
        
          // clear the elements inside of the directive
          svg.selectAll('*').remove();
          
          // if 'val' is undefined, exit
          if (!newVal) {
            return;
          }
          
          // console.log(oldVal)
          // console.log(newVal)

          // var data_url = attrs['tsv'];

          // var margin = {top: 20, right: 80, bottom: 30, left: 50},
          //     width = 960 - margin.left - margin.right,
          //     height = 500 - margin.top - margin.bottom;

          // var parseDate = d3.time.format("%d-%b-%y").parse;
          var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%SZ").parse;

          var x = d3.time.scale()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var line = d3.svg.line()
              .x(function(d) { return x(d.created_at); })
              .y(function(d) { return y(d.likes); });

          // var svg = d3.select("body").append("svg")
          //     .attr("width", width + margin.left + margin.right)
          //     .attr("height", height + margin.top + margin.bottom)
          //   .append("g")
          //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // d3.tsv(data_url, function(error, data) {
            var data = newVal;
            data.forEach(function(d) {
              // console.log(d);
              // console.log(d.created_at);
              // d.created_at = parseDate(d.created_at);
              console.log(d.created_at);
              // d.likes = +d.likes;
              console.log(d.likes);
            });

            x.domain(d3.extent(data, function(d) { return d.created_at; }));
            y.domain(d3.extent(data, function(d) { return d.likes; }));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Количество, шт.");

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
          // });
        }); //end of $watch likes


      } //end of link
    };
  });

