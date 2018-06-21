app.controller("GraphsReportsCtrl", function ($scope) {


	$scope.releaseload = [
		{ key: "2.4.0", value: 310 },
		{ key: "2.4.1", value: 260 },
		{ key: "2.4.2", value: 470 },
		{ key: "2.4.3", value: 190 },
		{ key: "2.4.4", value: 380 }
	]

	$scope.title = "Release load chart";

	var columnDefs1 = [
		{
			headerName: "Timestamp", field: "timestamp",// rowDrag: true,
			valueFormatter: function (params) {
				return moment(params.value * 1000).format('MM-DD-YYYY, h:mm:ss a');;
			},
			sort: "desc"
		},
		{ headerName: "Load", field: "load"},
		{ headerName: "Replicas", field: "replicas"}
	];

	var rowData1 = [
		{ timestamp: 1529553131, load: 300, replicas: 4, failed_metrics: "RMQ Failed", metric_status: "STABLE" },
		{ timestamp: 1529653131, load: 400, replicas: 6, failed_metrics: "RMQ Failed", metric_status: "STABLE" },
		{ timestamp: 1529753131, load: 400, replicas: 7, failed_metrics: "RMQ Failed", metric_status: "STABLE" }
	];

	$scope.gridOptions1 = {
		columnDefs: columnDefs1,
		rowData: rowData1,
		enableColResize: true,
		onGridReady: function (params) {
			gridApi = params.api;
			gridColumnApi = params.columnApi;
			gridApi.sizeColumnsToFit();
		},
		enableSorting: true,
		rowDragManaged: true,
		animateRows: true,
		onRowDataUpdated: function () {
			var rowNode1 = gridApi.getDisplayedRowAtIndex(0);
			gridApi.flashCells({
				rowNodes: [rowNode1]
			});
		},
		getRowStyle: function (params) {
			if (params.node.data.metric_status === "STABLE") {
				return { color: 'green' }
			} else {
				return { color: 'red' }
			}
		}
	};

	var columnDefs2 = [
		{
			headerName: "Timestamp", field: "timestamp",// rowDrag: true,
			valueFormatter: function (params) {
				return moment(params.value * 1000).format('MM-DD-YYYY, h:mm:ss a');;
			},
			sort: "desc"
		},
		{ headerName: "Load", field: "load" },
		{ headerName: "Replicas", field: "replicas" }
	];

	var rowData2 = [
		{ timestamp: 1529553131, load: 300, replicas: 4, failed_metrics: "RMQ Failed", metric_status: "STABLE" },
		{ timestamp: 1529653131, load: 400, replicas: 6, failed_metrics: "RMQ Failed", metric_status: "STABLE" }
	];

	$scope.gridOptions2 = {
		columnDefs: columnDefs2,
		rowData: rowData2,
		enableColResize: true,
		onGridReady: function (params) {
			gridApi = params.api;
			gridColumnApi = params.columnApi;
			gridApi.sizeColumnsToFit();
		},
		enableSorting: true,
		rowDragManaged: true,
		animateRows: true,
		onRowDataUpdated: function () {
			var rowNode1 = gridApi.getDisplayedRowAtIndex(0);
			gridApi.flashCells({
				rowNodes: [rowNode1]
			});
		},
		getRowStyle: function (params) {
			if (params.node.data.metric_status === "STABLE") {
				return { color: 'green' }
			} else {
				return { color: 'red' }
			}
		}
	};

});
