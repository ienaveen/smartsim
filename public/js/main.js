app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/dashboard.html"
		})
		.when("/TRACKPROGRESS", {
			templateUrl: "templates/track_progress.html"
		})
		.when("/REPORTS", {
			templateUrl: "templates/graphs_and_reports.html"
		})
})


app.controller('MyCtrl', function ($scope) {

});
