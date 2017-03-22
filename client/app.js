var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
$routeProvider
  .when('/login',{
    templateUrl: 'partials/login_partial.html'
    // controller: 'controller/login.js'
    // controllerAs:
  })
  .otherwise({
    redirectTo: '/login'
  });
});
console.log('app.js is working');
// console.log(app);
