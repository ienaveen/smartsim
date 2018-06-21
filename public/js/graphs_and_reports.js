app.controller("GraphsReportsCtrl", function ($scope) {


	$scope.releaseload = [
		{ key: "2.4.0", value: 310 },
		{ key: "2.4.1", value: 260 },
		{ key: "2.4.2", value: 470 },
		{ key: "2.4.3", value: 190 },
		{ key: "2.4.4", value: 380 }
	]

	$scope.title = "Release load chart";

});
