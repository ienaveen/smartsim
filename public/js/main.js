app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/tabs.html"
		})
		.when("/tabs1", {
			templateUrl: "templates/tabs1.html"
		})
		.when("/tabs2", {
			templateUrl: "templates/tabs2.html"
		})
})


app.controller('MyCtrl', function ($scope) {

});
