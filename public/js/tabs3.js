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
  user = {"target_type":"Processlist"};
  $scope.target_types = ["Processlist","PODlist","DiskI/O","Infra"];

  //   $scope.target_types = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
  //   'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
  //   'WY').split(' ').map(function(state) {
  //       return {abbrev: state};
  //     });
  // })

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
    $scope.changeTab = function(){
      if ($scope.selectedIndex !== 3)
        $scope.selectedIndex = ($scope.selectedIndex + 1);
    }
    $scope.backTab = function(){
      if ($scope.selectedIndex !== 0)
      $scope.selectedIndex = ($scope.selectedIndex - 1);
    }

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }



});
