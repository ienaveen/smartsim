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
app.factory('socket', function ($rootScope) {

    var socket = io.connect();
    return {
        on: function (eventName, callback) {  

            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });

            });

        },
        emit: function (eventName, data, callback) {

            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }

                });

            });

        }

    };

});


app.controller('MyCtrl', function ($scope,socket) {
    debugger
	socket.emit('requestInit');

    socket.on('home', function (data) {
        $scope.events = data;
        events = data;
        $scope.eventSources = [$scope.events];
        data1 = JSON.stringify($scope.events);

    });

});
