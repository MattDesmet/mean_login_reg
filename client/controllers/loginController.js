app.controller('loginController', function($scope,loginFactory) {

  $scope.errors = [];

  $scope.loginFunction = function (){ // cannot be same at ng-model name!
    $scope.errors = [];
    if (!$scope.loginRegFormInput || !$scope.loginRegFormInput.name){
      $scope.errors.push('Please enter a valid name')
    }
    else if ($scope.loginRegFormInput.name.length < 3) {
      $scope.errors.push('Name must be longer than 3 characters long')
    }else{
      console.log('no errors!');
      console.log($scope.loginRegFormInput)
      console.log(loginFactory);
    }
  }
});

console.log('controller is working');
