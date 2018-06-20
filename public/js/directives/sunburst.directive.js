app.directive('sunBurst', function () {
	return {
		link: function (scope, element, attr) {
			// Dimensions of sunburst.
			var width = 1000;
			var height = 400;
			var radius = Math.min(width, height) / 2;

			// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
			var b = {
				w: 200, h: 30, s: 3, t: 10
			};

			// Mapping of step names to colors.
			var colors = {
				"Clarity": "#F0F8FF",
				"HealthChecks": "#FAEBD7",
				"ClientOverview": "#7FFFD4",
				"NetworkOverview": "#0000FF",
				"Alerts": "#8A2BE2",
				"Acknowledged": "#A52A2A",
				"Clarity": "#DEB887",
				"WirelessManagement": "#5F9EA0",
				"AccessPoints": "#7FFF0vi0",
				"NetworkOverview": "#FF7F50",
				"Alerts": "#6495ED",
				"Acknowledged": "#DC143C",
				"APsUsage": "#00FFFF",
				"ConfigureAlerts": "#00008B",
				"SwitchesUsage": "#008B8B",
				"ListOfUpSwitches": "#B8860B",
				"Switches": "#DA70D6",
				"SwitchDetail": "#006400",
				"EventLogs": "#8B008B",
				"ListOfDownAPs": "#FF8C00",
				"APDetail": "#8FBC8F",
				"Clients": "#2F4F4F",
				"Wireless": "#00BFFF",
				"Stacks": "#228B22",
				"StackDetail": "#FFD700",
				"WirelessNetworks": "#ADFF2F",
				"GlobalSettings": "#4B0082",
				"Users&Roles": "#E0FFFF",
				"Users": "#20B2AA",
				"NewUser": "#87CEFA",
				"Troubleshooting": "#00FF00",
				"SwitchMAS": "#66CDAA",
				"Map": "#00FA9A",
				"List": "#48D1CC",
				"Wireless": "#808000",
				"Wired": "#6B8E23",
				"Maintenance": "#FFA500",
				"FirmwareVirtualControllers": "#FF4500",
				"FirmwareSwitchMAS": "#98FB98",
				"APIGateway": "#FF0000",
				"AuthorizedApps&Token": "#BC8F8F",
				"AddApps&Tokens": "#4169E1",
				"Interface": "#FA8072",
				"Labels": "#F4A460",
				"AddLabel": "#2E8B57",
				"Info": "#708090",
				"DeviceInventory": "#00FF7F",
				"AddDevices": "#B0E0E6",
				"Insights": "#FF6347",
				"Users&Roles-": "#F5DEB3",
				"Roles": "#9ACD32",
				"NewRole": "#FFFF00",
				"SwitchDetail": "#F5DEB3",
				"SubscriptionAssignment": "#EE82EE",
				"ApplySubscriptions": "#40E0D0",
				"WirelessManagement": "#D8BFD8",
				"ConfigurationDashboard": "#008080",
				"FirmwareSwitchAruba": "#D2B48C",
				"SwitchAruba": "#4682B4",
				"ManageGroups": "#F4A460",
				"NewGroup": "#FA8072",
				"Clients": "#BC8F8F"
			};

			// Total size of all segments; we set this later, after loading the data.
			var totalSize = 0;

			var vis = d3.select("#sunburst #chart").append("svg:svg")
				.attr("width", width)
				.attr("height", height)
				.append("svg:g")
				.attr("id", "container")
				.attr("transform", "translate(300," + height / 2 + ")");

			var partition = d3.layout.partition()
				.size([2 * Math.PI, radius * radius])
				.value(function (d) { return d.size; });

			var arc = d3.svg.arc()
				.startAngle(function (d) { return d.x; })
				.endAngle(function (d) { return d.x + d.dx; })
				.innerRadius(function (d) { return Math.sqrt(d.y); })
				.outerRadius(function (d) { return Math.sqrt(d.y + d.dy); });

			// Use d3.text and d3.csv.parseRows so that we do not need to have a header
			// row, and can receive the csv as an array of arrays.
			d3.text("flows.csv", function (text) {
				var csv = d3.csv.parseRows(text);
				var json = buildHierarchy(csv);
				createVisualization(json);
			});

			// Main function to draw and set up the visualization, once we have the data.
			function createVisualization(json) {

				// Basic setup of page elements.
				initializeBreadcrumbTrail();
				// drawLegend();
				// d3.select("#sunburst #togglelegend").on("click", toggleLegend);

				// Bounding circle underneath the sunburst, to make it easier to detect
				// when the mouse leaves the parent g.
				vis.append("svg:circle")
					.attr("r", radius)
					.style("opacity", 0);

				// For efficiency, filter nodes to keep only those large enough to see.
				var nodes = partition.nodes(json)
					.filter(function (d) {
						return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
					});

				var path = vis.data([json]).selectAll("#sunburst path")
					.data(nodes)
					.enter().append("svg:path")
					.attr("display", function (d) { return d.depth ? null : "none"; })
					.attr("d", arc)
					.attr("fill-rule", "evenodd")
					.style("fill", function (d) { return colors[d.name]; })
					.style("opacity", 1)
					.on("mouseover", mouseover);

				// Add the mouseleave handler to the bounding circle.
				d3.select("#sunburst #container").on("mouseleave", mouseleave);

				// Get total size of the tree = value of root node from partition.
				totalSize = path.node().__data__.value;
			};

			// Fade all but the current sequence, and show it in the breadcrumb trail.
			function mouseover(d) {

				var percentage = (100 * d.value / totalSize).toPrecision(3);
				var percentageString = percentage + "%";
				if (percentage < 0.1) {
					percentageString = "< 0.1%";
				}

				d3.select("#sunburst #percentage")
					.text(percentageString);

				d3.select("#sunburst #explanation")
					.style("visibility", "");

				var sequenceArray = getAncestors(d);
				updateBreadcrumbs(sequenceArray, percentageString);

				// Fade all the segments.
				d3.selectAll("#sunburst path")
					.style("opacity", 0.3);

				// Then highlight only those that are an ancestor of the current segment.
				vis.selectAll("#sunburst path")
					.filter(function (node) {
						return (sequenceArray.indexOf(node) >= 0);
					})
					.style("opacity", 1);
			}

			// Restore everything to full opacity when moving off the visualization.
			function mouseleave(d) {

				// Hide the breadcrumb trail
				d3.select("#sunburst #trail")
					.style("visibility", "hidden");

				// Deactivate all segments during transition.
				d3.selectAll("#sunburst path").on("mouseover", null);

				// Transition each segment to full opacity and then reactivate it.
				d3.selectAll("#sunburst path")
					.transition()
					.duration(1000)
					.style("opacity", 1)
					.each("end", function () {
						d3.select(this).on("mouseover", mouseover);
					});

				d3.select("#sunburst #explanation")
					.style("visibility", "hidden");
			}

			// Given a node in a partition layout, return an array of all of its ancestor
			// nodes, highest first, but excluding the root.
			function getAncestors(node) {
				var path = [];
				var current = node;
				while (current.parent) {
					path.unshift(current);
					current = current.parent;
				}
				return path;
			}

			function initializeBreadcrumbTrail() {
				// Add the svg area.
				var trail = d3.select("#sunburst #sequence").append("svg:svg")
					.attr("width", width)
					.attr("height", 50)
					.attr("id", "trail");
				// Add the label at the end, for the percentage.
				trail.append("svg:text")
					.attr("id", "endlabel")
					.style("fill", "#000");
			}

			// Generate a string that describes the points of a breadcrumb polygon.
			function breadcrumbPoints(d, i) {
				var points = [];
				points.push("0,0");
				points.push(b.w + ",0");
				points.push(b.w + b.t + "," + (b.h / 2));
				points.push(b.w + "," + b.h);
				points.push("0," + b.h);
				if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
					points.push(b.t + "," + (b.h / 2));
				}
				return points.join(" ");
			}

			// Update the breadcrumb trail to show the current sequence and percentage.
			function updateBreadcrumbs(nodeArray, percentageString) {

				// Data join; key function combines name and depth (= position in sequence).
				var g = d3.select("#sunburst #trail")
					.selectAll("#sunburst g")
					.data(nodeArray, function (d) { return d.name + d.depth; });

				// Add breadcrumb and label for entering nodes.
				var entering = g.enter().append("svg:g");

				entering.append("svg:polygon")
					.attr("points", breadcrumbPoints)
					.style("fill", function (d) { return colors[d.name]; });

				entering.append("svg:text")
					.attr("x", (b.w + b.t) / 2)
					.attr("y", b.h / 2)
					.attr("dy", "0.35em")
					.attr("text-anchor", "middle")
					.text(function (d) { return d.name; });

				// Set position for entering and updating nodes.
				g.attr("transform", function (d, i) {
					return "translate(" + i * (b.w + b.s) + ", 0)";
				});

				// Remove exiting nodes.
				g.exit().remove();

				// Now move and update the percentage at the end.
				d3.select("#sunburst #trail").select("#endlabel")
					.attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
					.attr("y", b.h / 2)
					.attr("dy", "0.35em")
					.attr("text-anchor", "middle")
					.text(percentageString);

				// Make the breadcrumb trail visible, if it's hidden.
				d3.select("#sunburst #trail")
					.style("visibility", "");

			}

			function drawLegend() {

				// Dimensions of legend item: width, height, spacing, radius of rounded rect.
				var li = {
					w: 200, h: 30, s: 3, r: 3
				};

				// var legend = d3.select("#sunburst #legend").append("svg:svg")
				// 	.attr("width", li.w)
				// 	.attr("height", d3.keys(colors).length * (li.h + li.s));

				var g = legend.selectAll("#sunburst g")
					.data(d3.entries(colors))
					.enter().append("svg:g")
					.attr("transform", function (d, i) {
						return "translate(0," + i * (li.h + li.s) + ")";
					});

				g.append("svg:rect")
					.attr("rx", li.r)
					.attr("ry", li.r)
					.attr("width", li.w)
					.attr("height", li.h)
					.style("fill", function (d) { return d.value; });

				g.append("svg:text")
					.attr("x", li.w / 2)
					.attr("y", li.h / 2)
					.attr("dy", "0.35em")
					.attr("text-anchor", "middle")
					.text(function (d) { return d.key; });
			}

			function toggleLegend() {
				var legend = d3.select("#sunburst #legend");
				if (legend.style("visibility") == "hidden") {
					legend.style("visibility", "");
				} else {
					legend.style("visibility", "hidden");
				}
			}

			// Take a 2-column CSV and transform it into a hierarchical structure suitable
			// for a partition layout. The first column is a sequence of step names, from
			// root to leaf, separated by hyphens. The second column is a count of how
			// often that sequence occurred.
			function buildHierarchy(csv) {
				var root = { "name": "root", "children": [] };
				for (var i = 0; i < csv.length; i++) {
					var sequence = csv[i][0];
					var size = +csv[i][1];
					if (isNaN(size)) { // e.g. if this is a header row
						continue;
					}
					var parts = sequence.split("-");
					var currentNode = root;
					for (var j = 0; j < parts.length; j++) {
						var children = currentNode["children"];
						var nodeName = parts[j];
						var childNode;
						if (j + 1 < parts.length) {
							// Not yet at the end of the sequence; move down the tree.
							var foundChild = false;
							for (var k = 0; k < children.length; k++) {
								if (children[k]["name"] == nodeName) {
									childNode = children[k];
									foundChild = true;
									break;
								}
							}
							// If we don't already have a child node for this branch, create it.
							if (!foundChild) {
								childNode = { "name": nodeName, "children": [] };
								children.push(childNode);
							}
							currentNode = childNode;
						} else {
							// Reached the end of the sequence; create a leaf node.
							childNode = { "name": nodeName, "size": size };
							children.push(childNode);
						}
					}
				}
				return root;
			};
		},
		template: `
			<div id="sunburst">
				<h1 class="chart-title">UI Workflows</h1>
				<div id="main">
				<div id="sequence"></div>
				<div id="chart">
					<div id="explanation">
					<span id="percentage"></span><br/>
					of visits begin with this sequence of pages
					</div>
				</div>
				</div>
			</div>
        `,
		scope: {
			cdpdata: "="
		},
		restrict: 'E'
	}
});
