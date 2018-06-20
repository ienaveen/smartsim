app.controller("Tabs1Ctrl", function ($scope, $location, $rootScope, $http, $localStorage) {

	$scope.in_progress_disabled = false;

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

	$scope.stop = function() {
		$scope.in_progress_disabled = true;
		toastr.success("Simulator stopped");
	}

	$scope.pause = function () {
		toastr.warning("Simulator paused");
	}

	$scope.downloadReport = function () {
		toastr.success("Downloading the report");
	}
});
