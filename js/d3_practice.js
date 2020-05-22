// var svg = d3.select('body')
//             .append('svg')
//             .attr('width', window.innerWidth)
// 						.attr('height', window.innerHeight);

// const margin = 60;

// var width = window.innerWidth - margin - margin;
// var height = window.innerHeight - margin - margin;

// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
// var y = d3.scaleLinear().rangeRound([height, 0]);

// var g = svg.append('g')
//            .attr('transform', `translate(${margin}, ${margin})`);

// const data = [12, 15, 43, 24, 94, 35, 38, 59];
// x.domain([...Array(data.length).keys()]);
// y.domain([0, d3.max(data, (d) => d)]);

// g.append("g")
//  .attr("transform", `translate(0, ${height})`)
//  .call(d3.axisBottom(x));

// g.append("g")
//  .call(d3.axisLeft(y))
//  .append("text")
//  .attr("fill", "#000")
//  .attr("transform", "rotate(-90)")
//  .attr("y", 6)
//  .attr("dy", "0.9em")
//  .attr("text-anchor", "end")
//  .text("Some Secret Value");

// g.selectAll('.bar')
//  .data(data)
//  .enter()
//  .append('rect')
//  .attr('class', 'bar')
//  .attr("x", (_, i) => x(i))
//  .attr("y", (d) => y(d))
//  .attr("width", x.bandwidth())
//  .attr("height", (d) => height - y(d));




//select element set
//binding data to select set
var str = "China";

var body = d3.select("body");
var p = body.selectAll("p");

p.datum(str);

p.text(function(d, i){
    return "the "+ i + "th element binging data is " + d;
});

//binding data array to select set
var dataset = ["I like dog","I like cat","I like snake"];
var body = d3.select("body");
var p = body.selectAll("p");

p.data(dataset)
.text(function(d,i){
  return d;
});

//select, insert and delete element
//select
var body = d3.select("body");
var p = body.selectAll(".myclass");
p.style("color","red");
//insert
body.append("p")
.text("append p element");
body.insert("p","#myid")
.text("insert p element");
//delete
var p = body.select("#myid");
p.remove();

//make a simple chart
//svg
// var width = 300;
// var height = 300;
// var svg = d3.select("body")
//  .append("svg")
//  .attr("width",width)
//  .attr("height",height);
// //make a rectangle
// var dataset = [250,210,170,130,90];//width
// var rectHeight = 25;

// svg.selectAll("rect")
// .data(dataset)
// .enter()
// .append("rect")
// .attr("x",20)
// .attr("y",function(d,i){
//   return i * rectHeight;
// })
// .attr("width",function(d){
//   return d;
// })
// .attr("height",rectHeight-2)
// .attr("fill","steelblue");

//scale
//continuous
var dataset = [1.2,2.3,0.9,1.5,3.3];
var min = d3.min(dataset);
var max = d3.max(dataset);

var linear = d3.scaleLinear()
        .domain([min, max])
        .range([0, 300]);
//discrete
var index = [0, 1, 2, 3, 4];
var color = ["red", "blue", "green", "yellow", "black"];

var ordinal = d3.scaleOrdinal()
        .domain(index)
        .range(color);
//scale used in chart
var width = 300;
var height = 300;
var svg = d3.select("body")
 .append("svg")
 .attr("width",width)
 .attr("height",height);
var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];

var linear = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 250]);
var rectHeight = 25;

svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("x",20)
.attr("y",function(d,i){
  return i * rectHeight;
})
.attr("width",function(d){
  return linear(d);
})
.attr("height",rectHeight-2)
.attr("fill","steelblue");

//axis
var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];

var linear = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, 250]);

var axis = d3.axisBottom()
     .scale(linear)       
     .ticks(7);  

svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(20,130)")
  .call(axis);       

//a complete chart
var width = 400;
var height = 400;
  
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var padding = {left:30, right:30, top:20, bottom:20};

var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, width - padding.left - padding.right]);

var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0]);

var xAxis = d3.axisBottom()
    .scale(xScale)

var yAxis = d3.axisLeft()
    .scale(yScale)

var rectPadding = 4;

var rects = svg.selectAll(".MyRect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2;
        } )
        .attr("y",function(d){
          var min = yScale.domain()[0];  
          return yScale(min);
        })
        .transition()
        .delay(function(d,i){
          return i * 200;
        })
        .duration(2000)
        .ease(d3.easeBounce)
        .attr("y",function(d){
          return yScale(d);
        })
        .attr("width", xScale.bandwidth() - rectPadding )
        .attr("height", function(d){
            return height - padding.top - padding.bottom - yScale(d);
        })
        .attr("fill","steelblue");


var texts = svg.selectAll(".MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","MyText")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2;
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("dx",function(){
            return (xScale.bandwidth() - rectPadding)/2;
        })
        .attr("dy",function(d){
            return 20;
        })
        .text(function(d){
            return d;
        })
        .attr("fill","white");

svg.append("g")
  .attr("class","axis")
  .attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
  .call(xAxis);

svg.append("g")
  .attr("class","axis")
  .attr("transform","translate("+padding.left+","+padding.top+")")
  .call(yAxis)

// make the chart move
// transition
// duration
// ease
// delay
// make three circles
var width = 400;
var height = 400;
  
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var circle1 = svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 45)
        .style("fill","green");

circle1.transition()
    .duration(1000)
    .attr("cx", 300);

var circle2 = svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 45)
        .style("fill","green");

circle2.transition()
    .duration(1500)
    .attr("cx",300)
    .style("fill","red");
 
var circle3 = svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 45)
        .style("fill","green");

circle3.transition()
    .duration(2000)
    .ease(d3.easeBounce)
    .attr("cx",300)
    .style("fill","red")
    .attr("r",25);


//update, enter and exit
var dataset =[3,6,9,12,15];

var p = d3.select("body").selectAll("p");

var update = p.data(dataset);

var enter = update.enter();

update.text(function(d){
  return "update" + d;
});

enter.append("p")
    .text(function(d){
      return "enter " + d;
    });

var dataset = [3];

var p = d3.select("body").selectAll("p");

var update = p.data(dataset);

var exit = update.exit();

update.text(function(d){
  return "update" + d;
});

exit.text(function(d){
  return "exit";
})
exit.remove();


//interactive
//mouse: click, mouseover, mouseout, mousemove, mousedown, mouseup, dblclick
//keyboard: keydown, keypress, keyup: touchstart, touchmove, touchend
var width = 400;
var height = 400;
  
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var padding = {left:30, right:30, top:20, bottom:20};

var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

// var circle = svg.append("circle");

// circle.on("click",function(){
//   console.log(d3.event);
// });

var rects = svg.selectAll(".MyRect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x",function(d,i){
          return xScale(i) + rectPadding/2;
        })
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("width",xScale.bandwidth()-rectPadding)
        .attr("height",function(d){
          return height-padding.top-padding.bottom-yScale(d);
        })
        .attr("fill","steelblue")
        .on("mouseover",function(d,i){
          d3.select(this)
              .attr("fill","yellow");
        })
        .on("mouseout",function(d,i){
          d3.select(this)
              .transition()
              .duration(500)
              .attr("fill","steelblue");
        });

//practice
var svg = d3.select("body")
            .append("svg")
            .attr("width",window.innerWidth)
            .attr("height",window.innerHeight);

const margin = 60;
var width = window.innerWidth-margin-margin;
var height = window.innerHeight-margin-margin;
//axis range
var x = d3.scaleBand().rangeRound([0,width]).padding(0.1);
var y = d3.scaleLinear().rangeRound([height,0]);
var g = svg.append("g")
           .attr("transform","`translate(${margin},${margin})`");

const data = [12,15,43,24,94,35,38,59];
x.domain([...Array(data.length).keys()]);
y.domain([0,d3.max(data,(d) => d)]);
g.append("g")
 .attr("transform",`translate(0,${height})`)
 .call(d3.axisBottom(x));
g.append("g")
 .call(d3.axisLeft(y))
 .append("text")
 .attr("fill","#000")
 .attr("transform","rotate(-90)")
 .attr("y",6)
 .attr("dy","0.9em")
 .attr("text-anchor","end")
 .text("y axis");

 g.selectAll('.bar')
 .data(data)
 .enter()
 .append('rect')
 .attr('class', 'bar')
 .attr("x", (_, i) => x(i))
 .attr("y", (d) => y(d))
 .attr("width", x.bandwidth())
 .attr("height", (d) => height - y(d));