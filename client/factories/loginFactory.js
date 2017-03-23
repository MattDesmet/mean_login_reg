app.factory('loginFactory', function($http){ // using $http Service to pass data to the backend.
  var factory = {};

  factory.login = function(user_data_from_form){
    console.log('This is the user data in factory: ', user_data_from_form);
    $http.post('/login', user_data_from_form) // 1. route we are going to 2. data from scope from input on partial form
    // .then(function(output) { // send the data that the factory sent to it back.
      // console.log(output);
    // })
  }
  return factory
})






console.log('factory is working');
