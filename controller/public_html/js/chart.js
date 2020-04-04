var stepX = 77 / 14;

/*
from https://codepen.io/JonasBadalic/pen/PwWXqg
*/

function point(x, y) {
    x: 0;
    y: 0;
}
/* DRAW GRID */
function drawGrid(graph) {
    var graph = Snap(graph);
    var g = graph.g();
    g.attr('id', 'grid');
    for (i = 0; i <= stepX + 2; i++) {
        var horizontalLine = graph.path(
            "M" + 0 + "," + stepX * i + " " +
            "L" + 77 + "," + stepX * i);
        horizontalLine.attr('class', 'horizontal');
        g.add(horizontalLine);
    };
    for (i = 0; i <= 14; i++) {
        var horizontalLine = graph.path(
            "M" + stepX * i + "," + 38.7 + " " +
            "L" + stepX * i + "," + 0)
        horizontalLine.attr('class', 'vertical');
        g.add(horizontalLine);
    };
}
//drawGrid('#chart-2');
drawGrid('#chart-1');
drawGrid('#chart-2');
drawGrid('#chart-3');

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function drawLineGraph(graph, points, container, id, tag) {
    var graph = Snap(graph);
    /*END DRAW GRID*/

    /* PARSE POINTS */
    var myPoints = [];
    var shadowPoints = [];

    function parseData(points) {
        var data_max = getMaxOfArray(points);
        for (i = 0; i < points.length; i++) {
            var p = new point();
            //var pv = points[i] / 100 * 40;
            var rect_w = 83.7;
            var rect_h = 40;
            var max_x = 78;
            var y_fix = 1;
            //x изменяется от 0 до rect_w (или max_x, хрен его знает xD);
            //y изменяется от rect_h до 0.

            //доля значения в этой точке от максимального значения в выборке
            var point_hparam = points[i] / data_max;
            p.y = rect_h - rect_h * point_hparam - y_fix;

            p.x = rect_w / points.length * i + 1;
            //p.y = wtf_y - pv;
            if (p.x > max_x) {
                p.x = max_x;
            }
            myPoints.push(p);
        }
        //console.log(myPoints);
    }

    var segments = [];

    function createSegments(p_array) {
        for (i = 0; i < p_array.length; i++) {
            var seg = "L" + p_array[i].x + "," + p_array[i].y;
            if (i === 0) {
                seg = "M" + p_array[i].x + "," + p_array[i].y;
            }
            segments.push(seg);
        }
    }

    function joinLine(segments_array, id) {
        var line = segments_array.join(" ");
        var line = graph.path(line);
        line.attr('id', 'graph-' + tag);
        var lineLength = line.getTotalLength();

        line.attr({
            'stroke-dasharray': lineLength,
                'stroke-dashoffset': lineLength
        });
    }

    function calculatePercentage(points, graph) {
        //console.log(points);
        var initValue = points[0];
        var prevValue;

        if (points.length > 1){
          prevValue = points[points.length - 2];
        } else {
          prevValue = points[0];
        }
        var endValue = points[points.length - 1];
        var sum = endValue - initValue;
        //console.log('prev: ' + prevValue + ', cur: ' + endValue);
        //var prefix;
        var percentageGain;
        var stepCount = 1300 / sum;

        var percentagePrefix = "";

        function percentageChange() {
            //percentageGain = initValue / endValue * 100;
            percentageGain = Math.round((endValue - prevValue) * 100 / prevValue);
            if(percentageGain >= 0) {
              percentagePrefix = '+';
            } else {
              percentagePrefix = '-';
            }
        };
        percentageChange();
        //findPrefix();

        var percentage = $(graph).find('.percentage-value#chartDataPercentage-' + tag);
        var totalGain = $(graph).find('.total-gain#chartDataTotal-' + tag);
        //var hVal = $(graph).find('.h-value');

        function count(graph, sum) {
            var totalGain = $(graph).find('.total-gain');
            var i = 0;
            var time = 1300;
            var intervalTime = Math.abs(time / sum);
            var timerID = 0;
            if (sum > 0) {
                var timerID = setInterval(function () {
                    i++;
                    //totalGain.text(percentagePrefix + i);
                    totalGain.text(i);
                    if (i === sum) clearInterval(timerID);
                }, intervalTime);
            } else if (sum < 0) {
                var timerID = setInterval(function () {
                    i--;
                    //totalGain.text(percentagePrefix + i);
                    totalGain.text(i);
                    if (i === sum) clearInterval(timerID);
                }, intervalTime);
            }
        }
        count(graph, sum);

        if(percentageGain == 0) {
          percentage.hide();
        } else {
          percentage.text(percentagePrefix + percentageGain + "%");
          percentage.show();
        }

        //percentage.text(percentagePrefix + percentageGain + "%");
        totalGain.text("0%");
        setTimeout(function () {
            percentage.addClass('visible');
            //hVal.addClass('visible');
        }, 1300);
    }

    function showValues() {
        var val1 = $(graph).find('.h-value');
        var val2 = $(graph).find('.percentage-value');
        val1.addClass('visible');
        val2.addClass('visible');
    }

    function drawPolygon(segments, id) {
        var lastel = segments[segments.length - 1];
        var polySeg = segments.slice();
        polySeg.push([78, 38.4], [1, 38.4]);
        var polyLine = polySeg.join(' ').toString();
        var replacedString = polyLine.replace(/L/g, '').replace(/M/g, "");

        var poly = graph.polygon(replacedString);
        var clip = graph.rect(-80, 0, 80, 40);
        poly.attr({
            'id': 'poly-' + id,
            /*'clipPath':'url(#clip)'*/
                'clipPath': clip
        });
        clip.animate({
            transform: 't80,0'
        }, 1300, mina.linear);
    }

      parseData(points);

      createSegments(myPoints);
      calculatePercentage(points, container);
      joinLine(segments,id);

      drawPolygon(segments, id);


    /*$('#poly-'+id).attr('class','show');*/

    /* function drawPolygon(segments,id){
      var polySeg = segments;
      polySeg.push([80,40],[0,40]);
      var polyLine = segments.join(' ').toString();
      var replacedString = polyLine.replace(/L/g,'').replace(/M/g,"");
      var poly = graph.polygon(replacedString);
      poly.attr('id','poly-'+id)
    }
    drawPolygon(segments,id);*/
}
function drawCircle(container,id,progress,parent){
  var paper = Snap(container);
  var prog = paper.path("M5,50 A45,45,0 1 1 95,50 A45,45,0 1 1 5,50");
  var lineL = prog.getTotalLength();
  var oneUnit = lineL/100;
  var toOffset = lineL - oneUnit * progress;
  var myID = 'circle-graph-'+id;
  prog.attr({
    'stroke-dashoffset':lineL,
    'stroke-dasharray':lineL,
    'id':myID
  });

  var animTime = 1300/*progress / 100*/

  prog.animate({
    'stroke-dashoffset':toOffset
  },animTime,mina.easein);

  function countCircle(animtime,parent,progress){
    var textContainer = $(parent).find('.circle-percentage');
    var i = 0;
    var time = 1300;
    var intervalTime = Math.abs(time / progress);
    var timerID = setInterval(function () {
      i++;
      textContainer.text(i+"%");
      if (i === progress) clearInterval(timerID);
    }, intervalTime);
  }
  countCircle(animTime,parent,progress);
}

$(window).on('load',function(){
    //drawCircle('#chart-3',1,77,'#circle-1');
    drawLineGraph('#chart-1', chart_1_y, '#graph-1-container', 1, 'confirmed');
    drawLineGraph('#chart-2', chart_2_y, '#graph-2-container', 1, 'death');
    drawLineGraph('#chart-3', chart_3_y, '#graph-3-container', 1, 'recovered');
});
