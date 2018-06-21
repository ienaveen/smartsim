app.controller("Tabs3Ctrl", function ($scope, $location, $rootScope, $http, $localStorage) {
	var columnDefs = [
		{ headerName: "Sytem", field: "system" },
		{ headerName: "Target Entity", field: "target_entity" },
		{ headerName: "Simulator", field: "simulator" },
		{ headerName: "Metrics", field: "metrics" },
		{ headerName: "State", field: "state" },
		{ headerName: "Actions", field: "actions" }
	];

	var rowData = [
		{ system: "Central", target_entity: "Message Queue", simulator:  "Running",metrics: "CPU",state:"Running" },
		{ system: "Airwave", target_entity: "Message Queue", simulator:  "Running",metrics: "CPU",state:"Running" },
		{ system: "Controller", target_entity: "Message Queue", simulator:  "Running",metrics: "CPU",state:"Running" },
		{ system: "IAP", target_entity: "Message Queue", simulator:  "Running",metrics: "CPU",state:"Running" },
		{ field: "actions", type: "actions", actions: [{id: "edit-template", iconCls: "icosolo blue icon_edit"},
	                {id: "delete-template", iconCls: "icosolo delete icon_delete"}]
	            }


	];

	$scope.gridOptions3 = {
		columnDefs: columnDefs,
		rowSelection: 'single',
		rowData: rowData
	};

	
});
