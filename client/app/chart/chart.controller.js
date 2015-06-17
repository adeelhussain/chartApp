'use strict';

angular.module('petroApp')
  .controller('ChartCtrl', ['$scope', '$timeout', '$parse', '$http',  function ($scope, $timeout, $parse, $http) {    //used $parse for binding excel sheet
    $scope.line = {
      labels: [1, 2, 3, 4, 5, 6, 7],
      series: ['Series A', 'Series B'],
      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      onClick: function (points, evt) {
        console.log(points, evt);
      }
    };

    $scope.columns = ['A', 'B', 'C', 'D'];

    $scope.rows = [1, 2, 3, 4];

    $scope.cells = {};

    $scope.bar = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    series: ['Series A', 'Series B'],

    data: [
       [65, 59, 80, 81, 56, 55, 40],
       [28, 48, 40, 19, 86, 27, 90]
    ]
      
    };

    $scope.donut = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data: [300, 500, 100]
    };

    $scope.radar = {
      labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

      data:[
          [65, 59, 90, 81, 56, 55, 40],
          [28, 48, 40, 19, 96, 27, 100]
      ]
    };

    $scope.pie = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data : [300, 500, 100]
    };

    $scope.polar = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data : [300, 500, 100, 40, 120]
    };

    $scope.dynamic = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data : [300, 500, 100, 40, 120],
      type : 'PolarArea',

      toggle : function () 
      {
        this.type = this.type === 'PolarArea' ?
          'Pie' : 'PolarArea';
    }
    };

    $scope.compute = function (cell) {
      return $parse($scope.cells[cell])($scope);
    };


    //Old Data ---------------------------


    $scope.totalWater = null;
    $scope.totalOil = null;
    $scope.totalGas = null;
    $scope.highestOilData = {
      water: null,
      gas: null,
      oil: null
    };

    $scope.sumission = {
      labels: ["Total Water", "Total Oil", "Total Gas"],
      data: [$scope.totalWater, $scope.totalGas, $scope.totalOil]
    };

    $scope.higestOil = {
      labels: ["Water", "Oil", "Gas"],
      data: [$scope.highestOilData.oil, $scope.highestOilData.gas, $scope.highestOilData.water]
    };

    initData();

    //Getting data from server
    function initData(){
      $http.get('/api/dashboards/')
        .then(function (resp) {
          var well = $scope.wellData = resp.data;
          console.log(data);
          if(!well.length){
            return;
          }

          var highest = 0,
          highestValueIndex = -1;
          well.forEach(function (e, i){
            $scope.totalOil += e.oil;
            $scope.totalGas += e.gas;
            $scope.totalWater += e.water;
            if(e.oil > highest){
              highest = e.oil;
              highestValueIndex = i;
            }
          });


          //Get the highest one oil well
          var highestWell = well[highestValueIndex];
          $scope.higestOil.data[0] = highestWell.water;
          $scope.higestOil.data[1] = highestWell.oil;
          $scope.higestOil.data[2] = highestWell.gas;

          //After getting data from server, update the charts
          $scope.sumission.data[0] = $scope.totalWater;
          $scope.sumission.data[1] = $scope.totalGas;
          $scope.sumission.data[2] = $scope.totalOil;
        },
        function (err) {
          alert('Error in Getting Data, Check the console for error');
          console.log(err)
        }
      )
    }
  }]);