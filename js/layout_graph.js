// force-directed graph
var width = 400;
var height = 400;
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var nodes = [ { name: "a1" }, { name: "a2" },
              { name: "a3" }, { name: "a4" },
              { name: "a5" }, { name: "a6" },
              { name: "a7" } ];
var edges = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
               { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
               { source : 1 , target: 5 } , { source : 1 , target: 6 } ];

var force = d3.layout.force()
      .nodes(nodes) 
      .links(edges) 
      .size([width,height]) 
      .linkDistance(150) 
      .charge([-400]); 
// force.start();
// console.log(nodes);
// console.log(edges);
//edges
var svg_edges = svg.selectAll("line")
     .data(edges)
     .enter()
     .append("line")
     .style("stroke","#ccc")
     .style("stroke-width",1);

 var color = d3.scaleOrdinal(d3.schemeCategory10);
 //nodes
 var svg_nodes = svg.selectAll("circle")
     .data(nodes)
     .enter()
     .append("circle")
     .attr("r",20)
     .style("fill",function(d,i){
         return color(i);
     })
     .call(force.drag);
//text
var svg_texts = svg.selectAll("text")
     .data(nodes)
     .enter()
     .append("text")
     .style("fill", "black")
     .attr("dx", 20)
     .attr("dy", 8)
     .text(function(d){
        return d.name;
     });
//tick
force.on("tick", function(){ 
    svg_edges.attr("x1",function(d){ return d.source.x; })
        .attr("y1",function(d){ return d.source.y; })
        .attr("x2",function(d){ return d.target.x; })
        .attr("y2",function(d){ return d.target.y; });

    svg_nodes.attr("cx",function(d){ return d.x; })
        .attr("cy",function(d){ return d.y; });

    svg_texts.attr("x", function(d){ return d.x; })
       .attr("y", function(d){ return d.y; });
 });

//tree
var tree = d3.layout.tree()
  .size([width, height-200])
  .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2); });

d3.json("tree.json", function(error, root) {

  var nodes = tree.nodes(root);
  var links = tree.links(nodes);

  console.log(nodes);
  console.log(links);

});

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var link = svg.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", diagonal);
