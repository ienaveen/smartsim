app.controller("Tabs3Ctrl", function ($scope, $location, $rootScope, $http, $localStorage, $mdDialog) {

	var columnDefs = [
		{ headerName: "Sytem", field: "system" },
		{ headerName: "Target Entity", field: "target_entity" },
		{ headerName: "Simulator", field: "simulator" },
		{ headerName: "Metrics", field: "metrics" },
		{ headerName: "State", field: "state" },
		{ headerName: "Actions", field: "actions" }
	];
  var rowData = [
    { Name: "Malshi",type: "AC-DC", target_entity: "PA", simulator: "UI SIMULATOR", metrics: "CPU,MEMORY,POSTGRE", state: "NOT STARTED" },
    { Name: "central-lite",type: "Central", target_entity: "Rabbit MQ app", simulator: "AP-SIM", metrics: "RMQ", state: "NOT STARTED" },
    { Name: "AW10_1Node",type: "AirWave", target_entity: "UCC", simulator: "C-SIM", metrics: "CPU,MEMORY,RMQ", state: "COMPLETED" },
    { Name: "Controller",system: "Controller", target_entity: "Air Group", simulator: "CPU,ZMQ,DATAPATH", metrics: "CPU", state: "COMPLETED" },
    {
      field: "actions", type: "actions", actions: [{ id: "edit-template", iconCls: "icosolo blue icon_edit" },
      { id: "delete-template", iconCls: "icosolo delete icon_delete" }]
		}
	];


	$scope.gridOptions3 = {
		columnDefs: columnDefs,
		rowSelection: 'single',
		rowData: rowData
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

		$scope.metrics = [];

		$scope.addMetric = function () {
			$scope.metrics.push({ metric_definition: "", type: { id: 1, name: 'Process list' }});
		}
	}

});
