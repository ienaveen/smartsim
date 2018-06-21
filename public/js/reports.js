app.controller("Tabs1Ctrl", function ($scope, $location, $rootScope, $http, $localStorage) {

	$scope.in_progress_disabled = false;
	let gridApi, gridColumnApi;
	$scope.loadvalue = 0;

	var columnDefs = [
		{
			headerName: "Timestamp", field: "timestamp",// rowDrag: true,
			valueFormatter: function (params) {
				return moment(params.value*1000).format('MM-DD-YYYY, h:mm:ss a');;
			},
			sort: "desc"
		},
		{ headerName: "Load", field: "load", width: 110 },
		{ headerName: "Replicas", field: "replicas", width: 120 },
		{ headerName: "Failed Metrics", field: "failed_metrics", width: 160 },
		{ headerName: "Status", field: "status" }
	];

	var rowData = [
		{ timestamp: 1529553131, load: 100, replicas: 1, failed_metrics: "RMQ Failed", status: "PASS" }
	];

	var lastRowData = rowData[0];

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
		animateRows: true,
		onRowDataUpdated: function () {
			var rowNode1 = gridApi.getDisplayedRowAtIndex(0);
			gridApi.flashCells({
				rowNodes: [rowNode1]
			});
		},
		getRowStyle: function (params) {
			if (params.node.data.status === "PASS") {
				return { color: 'green' }
			}else{
				return { color: 'red' }
			}
		}
	};

	$scope.status = {
		isopen: false
	};

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
	}

	$scope.downloadReport = function () {
		toastr.success("Downloading the report");
	}

	var rowDataChange = setInterval(randomValue, 2000);

	// set random value
	function randomValue() {
		var newRow = angular.copy(lastRowData);
		if (lastRowData.load === 700) {
			newRow.load += 100;
			newRow.replicas += 1;
			newRow.status = "FAIL";
		} else if(lastRowData.load === 800) {
			newRow.replicas -= 1;
			newRow.status = "PASS";
			newRow.load -= 100;
			clearInterval(rowDataChange);
			$scope.in_progress_disabled = true;
		}else{
			newRow.replicas += 1;
			newRow.load += 100;
			newRow.status = "PASS";
		}
		newRow.timestamp += 1000000;
		gridApi.updateRowData({ "add": [newRow]});
		lastRowData = newRow;
		$scope.loadvalue = newRow.load/10;
	}
});
