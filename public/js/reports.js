app.controller("Tabs1Ctrl", function ($scope, $location, $rootScope, $http, $localStorage,socket) {

	$rootScope.in_progress_disabled = false;
	let gridApi, gridColumnApi;
	$rootScope.loadvalue = 0;

	var columnDefs = [
		{
			headerName: "Timestamp", field: "timestamp",// rowDrag: true,
			valueFormatter: function (params) {
				return moment(params.value*1000).format('MM-DD-YYYY, h:mm:ss a');;
			},
			sort: "desc"
		},
		{ headerName: "Load", field: "load", width: 100 },
		{ headerName: "Replicas", field: "replicas", width: 120 },
		{ headerName: "Failed Metrics", field: "failed_metrics", width: 150 },
		{ headerName: "Metric Status", field: "metric_status", width: 150 }
	];

	var rowData = [
		// { timestamp: 1529553131, load: 100, replicas: 1, failed_metrics: "RMQ Failed", metric_status: "STABLE" }
	];

	//var lastRowData = rowData[0];

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
		$rootScope.in_progress_disabled = true;
		toastr.success("Simulator stopped");
	}
	var count = 0;
    socket.on('add', function (data) {
		count += 1;
		if (angular.isUndefined($scope.timeStamp)){
			$scope.timeStamp = data.timestamp
			gridApi.updateRowData({ "add": [data]});
			$rootScope.loadvalue = data.load/5;
		}
		if ($scope.timeStamp !==data.timestamp){
			gridApi.updateRowData({ "add": [data]});
			$scope.timeStamp = data.timestamp
			$rootScope.loadvalue = data.load/5;
		}

		if(count === 6){
			$rootScope.in_progress_disabled = true;
		}


    })

	$scope.pause = function () {
		toastr.warning("Simulator paused");
	}

	$scope.downloadReport = function () {
		toastr.success("Downloading the report");
	}

	//var rowDataChange = setInterval(randomValue, 2000);

	// set random value
	function randomValue() {
		var newRow = angular.copy(lastRowData);
		if (lastRowData.load === 700) {
			newRow.load += 100;
			newRow.replicas += 1;
			newRow.metric_status = "UNSTABLE";
		} else if(lastRowData.load === 800) {
			newRow.replicas -= 1;
			newRow.metric_status = "STABLE";
			newRow.load -= 100;
			clearInterval(rowDataChange);
			$rootScope.in_progress_disabled = true;
		}else{
			newRow.replicas += 1;
			newRow.load += 100;
			newRow.metric_status = "STABLE";
		}
		newRow.timestamp += 1000000;
		gridApi.updateRowData({ "add": [newRow]});
		lastRowData = newRow;
		//$rootScope.loadvalue = newRow.load/10;
	}
});
