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
            
        scope.$watch('likes', function (newVal, oldVal) {
        
          // clear the elements inside of the directive
          svg.selectAll('*').remove();
          
          // if 'val' is undefined, exit
          if (!newVal) {
            return;
          }
          
          var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%SZ").parse;

          var x = d3.time.scale()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var color = d3.scale.category10();

          //custom dates for x axis
          var customTimeFormat = timeFormat([
            [d3.time.format("%Y"), function() { return true; }],
            [d3.time.format("%B"), function(d) { return d.getMonth(); }],
            [d3.time.format("%e %b"), function(d) { return d.getDate() != 1; }],
            [d3.time.format("%e %b"), function(d) { return d.getDay() && d.getDate() != 1; }],
            [d3.time.format("%H:%M"), function(d) { return d.getHours(); }],
            [d3.time.format("%H:%M"), function(d) { return d.getMinutes(); }],
            [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
            [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
          ]);

          function timeFormat(formats) {
            return function(date) {
              var i = formats.length - 1, f = formats[i];
              while (!f[1](date)) f = formats[--i];
              return f[0](date);
            };
          }

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              // .tickFormat(d3.time.format("%e %b %Y"));
              .tickFormat(customTimeFormat)
              .ticks(d3.time.days, 1);

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var line = d3.svg.line()
              // .interpolate("basis")
              .x(function(d) { return x(d.created_at); })
              .y(function(d) { return y(d.val); });

          //our data
          var data = newVal;

          color.domain(["Лайки", "Репосты"]);

          data.forEach(function(d) {
            d.created_at = parseDate(d.created_at);
          });

          var graphs = color.domain().map(function(name) {
            return {
              name: name,
              values: data.map(function(d) {
                if (name == 'Лайки') {
                  return {created_at: d.created_at, val: +d.likes};
                } else {
                  return {created_at: d.created_at, val: +d.reposts};
                }
              })
            };
          });

          x.domain(d3.extent(data, function(d) { return d.created_at; }));

          var y_min = d3.min(graphs, function(c) { return d3.min(c.values, function(v) { return v.val; }); }) - 30;
          if (y_min < 0) {
            y_min = 0;
          }
          y.domain([
            // d3.min(graphs, function(c) { return d3.min(c.values, function(v) { return v.val; }); }),
            y_min,
            d3.max(graphs, function(c) { return d3.max(c.values, function(v) { return v.val; }); }) + 30
          ]);

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

          var graph = svg.selectAll(".graph")
              .data(graphs)
            .enter().append("g")
              .attr("class", "graph");

          graph.append("path")
              .attr("class", "line")
              .attr("d", function(d) { return line(d.values); })
              .style("stroke", function(d) { return color(d.name); });

          graph.append("text")
              .datum(function(d) { return {name: d.name, value: d.values[0]}; })
              .attr("transform", function(d) { return "translate(" + x(d.value.created_at) + "," + y(d.value.val) + ")"; })
              .attr("x", 6)
              .attr("dy", ".35em")
              .text(function(d) { return d.name; });

        }); //end of $watch likes


      } //end of link
    };
  });

