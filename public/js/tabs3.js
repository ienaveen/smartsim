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
    $scope.simulator_types = ["UI SIM","IAP SIM","C SIM","AP SIM","Client SIM"];
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }



});
