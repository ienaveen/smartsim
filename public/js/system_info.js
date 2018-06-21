app.controller("SystemInfoCtrl", function ($scope, $location, $rootScope, $http, $localStorage) {
	var columnDefs = [
		{
			headerName: "Version", field: "version"
		},
		{ headerName: "IP", field: "ip" },
		{
			headerName: "Nodes", field: "nodes"
		},
		{
			headerName: "CPU", field: "cpu", valueFormatter: function (params) {
				return params.value + " cores";
			}
		},
		{
			headerName: "Memory", field: "memory", valueFormatter: function (params) {
				return params.value + " GB";
			}
		},
		{
			headerName: "Disk", field: "disk", valueFormatter: function (params) {
				return params.value + " TB";
			}
		}
	];

	var rowData = [
		{ version: "2.4.3-10", ip: "10.1.11.13", nodes: 1, cpu: 8, memory: 64, disk: 1 }
	];


});
