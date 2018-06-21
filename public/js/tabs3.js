app.controller("Tabs3Ctrl", function ($scope, $location, $rootScope, $http, $localStorage, $mdDialog) {

	var columnDefs = [
    { headerName: "Sytem Name", field: "name" },
    { headerName: "Sytem Type", field: "type" },
		{ headerName: "Target Entity", field: "target_entity" },
		{ headerName: "Simulator", field: "simulator" },
		{ headerName: "Metrics", field: "metrics" },
		{ headerName: "State", field: "state" },
		{ headerName: "Actions", field: "actions" }
	];
  var rowData = [
    { name: "Malshi",type: "AC-DC", target_entity: "PA", simulator: "UI SIMULATOR", metrics: "CPU,MEMORY,POSTGRE", state: "NOT STARTED" },
    { name: "Central-Lite",type: "Central", target_entity: "Rabbit MQ app", simulator: "AP-SIM", metrics: "RMQ", state: "NOT STARTED" },
    { name: "AW10_1Node",type: "AirWave", target_entity: "UCC", simulator: "C-SIM", metrics: "CPU,MEMORY,RMQ", state: "COMPLETED" },
    { name: "Controller",system: "Controller", target_entity: "Air Group", simulator: "CPU,ZMQ,DATAPATH", metrics: "CPU", state: "COMPLETED" }    
	];


	$scope.gridOptions3 = {
		columnDefs: columnDefs,
		rowSelection: 'single',
		rowData: rowData,
		enableColResize: true,
		onGridReady: function (params) {
			gridApi = params.api;
			gridColumnApi = params.columnApi;
			gridApi.sizeColumnsToFit();
		},
		onSelectionChanged: function(params) {
			var selectedRows = gridApi.getSelectedRows();
			$rootScope.selectedRow = selectedRows[0];
		},
		enableSorting: true,
		rowDragManaged: true,
		animateRows: true,
	};
	$scope.showTabDialog = function (ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'tabDialog.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true
		})
			.then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
	};
	function DialogController($scope, $mdDialog) {
		$scope.hide = function () {
			$mdDialog.hide();
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};
		$scope.simulator_types = ["UI SIM", "IAP SIM", "C SIM", "AP SIM", "Client SIM"];

		$scope.answer = function (answer) {
			$mdDialog.hide(answer);
		};

		$scope.changeTab = function () {
			if ($scope.selectedIndex !== 3)
				$scope.selectedIndex = ($scope.selectedIndex + 1);
		}
		$scope.backTab = function () {
			if ($scope.selectedIndex !== 0)
				$scope.selectedIndex = ($scope.selectedIndex - 1);
		}

		$scope.entity_types = [
			{ value: "process", name: 'Process' },
			{ value: "pod", name: 'Pod' },
			{ value: "rmq", name: 'RMQ' },
			{ value: "datapath", name: 'datapath' },
			{ value: "postgre", name: 'postgre' }
    ];
    $scope.simulator_types = [			
      { value: "Kubernetes YAML", name: 'Kubernetes YAML' },	
      { value: "CMD ", name: 'CMD' }
    ];
    $scope.system_types = [			
      { value: "Central", name: "Central" },	
      { value: "AC-DC", name: "AC-DC" },
      { value: "AirWave", name: "AirWave" },	
      { value: "Controller", name: "Controller" }
      
    ];

		$scope.metrics = [];

		$scope.addMetric = function () {
			$scope.metrics.push({ metric_definition: "", type: { id: 1, name: 'Process list' }});
		}
	}

});
