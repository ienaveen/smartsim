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
		{ system: "Central", target_entity: "Message Queue", simulator: "Running", metrics: "CPU", state: "Running" },
		{ system: "Airwave", target_entity: "Message Queue", simulator: "Running", metrics: "CPU", state: "Running" },
		{ system: "Controller", target_entity: "Message Queue", simulator: "Running", metrics: "CPU", state: "Running" },
		{ system: "IAP", target_entity: "Message Queue", simulator: "Running", metrics: "CPU", state: "Running" },
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

		$scope.answer = function (answer) {
			$mdDialog.hide(answer);
		};


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
