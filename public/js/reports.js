app.controller("Tabs1Ctrl", function ($scope, $location, $rootScope, $http, $localStorage) {

	$scope.in_progress_disabled = false;
	let gridApi, gridColumnApi;

	var columnDefs = [
		{
			headerName: "Timestamp", field: "timestamp", rowDrag: true,
			valueFormatter: function (params) {
				return "\xA3" + formatNumber(params.value);
			}
		},
		{ headerName: "Load", field: "load", width: 110 },
		{ headerName: "Replicas", field: "replicas", width: 120 },
		{ headerName: "Metric Status", field: "metric_status", width: 160 },
		{ headerName: "Failed Metrics", field: "failed_metrics" }
	];

	var rowData = [
		{ timestamp: 1529553131, load: 100, replicas: 3, metric_status: "RMQ Failed", failed_metrics: "PASS" },
		{ timestamp: 1529553131, load: 100, replicas: 3, metric_status: "RMQ Failed", failed_metrics: "PASS" },
		{ timestamp: 1529553131, load: 100, replicas: 3, metric_status: "RMQ Failed", failed_metrics: "PASS" }
	];

	$scope.gridOptions = {
		columnDefs: columnDefs,
		rowData: rowData,
		enableColResize: true,
		onGridReady: function (params) {
			gridApi = params.api;
			gridColumnApi = params.columnApi;
			gridApi.sizeColumnsToFit();
		},
		enableSorting: true,
		enableFilter: true,
		rowDragManaged: true,
		animateRows: true
	};

	$scope.status = {
		isopen: false
	};

	$scope.users = $scope.users || [
		{ id: 1, name: 'Scooby Doo' },
		{ id: 2, name: 'Shaggy Rodgers' },
		{ id: 3, name: 'Fred Jones' },
		{ id: 4, name: 'Daphne Blake' },
		{ id: 5, name: 'Velma Dinkley' }
	];

	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}

	$scope.stop = function () {
		$scope.in_progress_disabled = true;
		toastr.success("Simulator stopped");
	}

	$scope.pause = function () {
		toastr.warning("Simulator paused");
		// var rowNode1 = gridApi.getDisplayedRowAtIndex(1);
		// var rowNode2 = gridApi.getDisplayedRowAtIndex(2);
		// gridApi.flashCells({
		// 	rowNodes: [rowNode1, rowNode2]
		// });
	}

	$scope.downloadReport = function () {
		toastr.success("Downloading the report");
	}
});
