app.controller("Tabs1Ctrl", function ($scope, $location, $rootScope, $http, $localStorage) {
	var columnDefs = [
		{ headerName: "Make", field: "make" },
		{ headerName: "Model", field: "model" },
		{ headerName: "Price", field: "price" }
	];

	var rowData = [
		{ make: "Toyota", model: "Celica", price: 35000 },
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Porsche", model: "Boxter", price: 72000 }
	];

	$scope.gridOptions = {
		columnDefs: columnDefs,
		rowData: rowData
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
});
