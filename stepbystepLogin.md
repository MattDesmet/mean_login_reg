templates -> controllers -> factories -> routes -> serverside Controllers -> database/models

1. mkdir loginReg
2. cd loginReg
3. mkdir server client
4. touch server.js
5. npm init -y
6. npm install express angular angular-route express-session path fs mongoose body-parser --save
7. cd client
8. mkdir controllers factories partials
9. touch app.js index.html
10. cd ..
11. cd server
12. mkdir controllers config models
13. cd config
14. touch mongoose.js routes.js
15. cd ..
16. cd ..
17. atom .
18. start editing server.js
19. var express = require('express')
    var app = express()
    var bodyParser = require('body-parser')
    var path = require('path')
    app.use(express.static(path.join(`__dirname`, '/client')))
    app.use(express.static(path.join(`__dirname`, 'node_modules')))
    app.use(bodyParser.json())

    app.listen(8000, function(){
      console.log("listening to port 8000")
    })
20. TEST! make sure server is running.
21. nodemon server.js
22. should see your console log of "listening to port 8000"
23. open index.html and put some text to TEST. Go to localhost:8000 and you should see the text.
24. delete text and put html template in.
25. src="angular/angular.js"
    src='angular-route/angular-route.js'
    src='app.js'
26. in app.js.. console.log("hi"). should see hi in browser console.
27. once successful... need to edit the app.js
28. var app = angular.module('app', ['ngRoute'])
29. go back to index.html and need to add ng-app='app' inside body tag! this allows access to app.js
30. Go to app.js. add the following lines
31. app.config(function($routeProvider){
      $routeProvider
      .when('/login',{
        templateUrl: 'partials/login.html'
        })
      .otherwise({
        redirectTo: '/login'
        })
    })
32. need to create login.html inside partials. add text.
33. go back to index.html and add div tag side body.
    <div ng-view>
    </div>
34. TEST IT!!
35. in login.html add form!
    <form>
    Name: <input type="text" ng-model="logReg.name"><br>
    input type='submit' value="login here" ng-click="login()">
    </form>
36. make file called session.js inside client/controllers
37. inside the controllers file, console.log("hey")
38. go back to index.html and add src="./controllers/session.js"
39. back to controllers and add the following lines.
40. app.controller('sessionController',function($scope){
  console.log("hi")
  })
41. go back to login.html add div tag for controller!
42. <div ng-controller='sessionController'>
      form stuff here inside the div
    </div>
43. Test it!
44. now we need to link add to controllers
45. app.controller('sessionController',function($scope){
  $scope.login = function(){
    console.log($scope.logReg)
  }
})
46. TEST! should see object in the browser!

<h3> validations</h3>

47. make an errors array inside the controller. pushing error messages as they come into the array. The more efficient way.. is to do this in factory..
app.controller('sessionController',function($scope){
  $scope.errors = [];
  $scope.login = function(){
    $scope.errors = []
    if(!$scope.logReg || !$scope.logReg.name){
      $scope.errors.push("Please enter name")
    }
    else if($scope.logReg.name.length < 3){
      $scope.errors.push("name needs to be longer than 3 characters")
    }
  }
})
48. go to login.html and make a p tag for errors. add this above <form>
<p style='color:red' ng-repeat='error in errors track by $index'>{{error}}</p>
49. TEST IT!!! should be able to see your error messages.
50. Now we need to send this to our factories.
make an else tag if there are no errors to go to factory!
app.controller('sessionController',function($scope){
  $scope.errors = [];
  $scope.login = function(){
    $scope.errors = []
    if(!$scope.logReg || !$scope.logReg.name){
      $scope.errors.push("Please enter a name")
    }
    else if($scope.logReg.name.length < 3){
      $scope.errors.push("Name must be at least 3 characters long")
    }
    else{
      console.log("no error")
    }
  }
})
51. TEST. should see the no error when we make a user
52. create factories file. called session.js
53. in factories/session.js console.log('factory')
54. add src='./factories/session.js' to index.html
55. remove console.log
56. app.factory('sessionFactory',function(){
      var factory = {};
      return factory
    })
57. edit controller! need to add sessionFactory next to $scope. and edit the else statement to go to factory
app.controller('sessionController',function($scope, sessionFactory){
  $scope.errors = [];
  $scope.login = function(){
    $scope.errors = []
    if(!$scope.logReg || !$scope.logReg.name){
      $scope.errors.push("Please enter a name")
    }
    if($scope.logReg.name.length < 3){
      $scope.errors.push("Name must be at least 3 characters long")
    }
    else{
      sessionFactory.login($scope.logReg)
    }
  }
})
58. go to factories!
59.
app.factory('sessionFactory',function(){
      var factory = {};
      factory.login = function(user){
        console.log(user, 'in factory')
      }
      return factory
    })
60. TEST! should see object in th factory in the browser!
61. now we need to send it to the routes.. to do this.. ADD $http in fuction params.
62. CAN ONLY PASS OBJECTS TO THE BACKEND!!
else the error: cannot read property toke of whatever first character OR didn't install body-parser
app.factory('sessionFactory',function($http){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user)
  }
  return factory
})
63. first paramter is the route we are going to.. and the object we are passing!
64. we now need our routes page... server/config/routes.js
65. in routes.js add...
66.
module.exports = function(app){
  console.log(app)
}
67. edit the server file to link the routes.js
require('./server/config/routes.js')(app)
68. back in our routes.js
module.exports = function(app){
  app.post('/login', function(request,response){
    response.send('got there in routes')
    })
}
69. now that we have created the routes page... we can go back to the factory and add promise. response back to whoever called it.. (factory). the (output) we are getting is from the routes!! make a funciton out of the output we got back
70. app.factory('sessionFactory',function($http){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        console.log(output)
      })
  }
  return factory
})
71. EVERY ROUTE WE SEND HAS A LOOP. MUST EVENTUALLY GET BACK TO THE FRONT END
<h3> TEST IT </h3>
73. create a session.js in server/controller
74. DON'T FORGET TO ADD () AT THE END OF THE MODULE.EXPORTS.
module.exports =(function(){
  return{
    login:function(request,response){
      response.send('in backend controller')
    }
  }
})()
75. need to link it to routes... add at the very top
back in our routes.js
var session = require('./../controllers/session.js')
module.exports = function(app){
  app.post('/login', function(request,response){
    session.login(request,response)
    })
}
76. TEST!! look at browser console to see "backend controller"
77. need database now.
78. open mongoose.js file and in the file.. add the following:
79. var mongoose = require('mongoose')
    var path = require('path')
    var fs = require('fs')
    var models_path = path.join(`__dirname` + './../models')
    mongoose.connect('mongodb://localhost/logRegFeb')
    fs.readdirSync(models_path).forEach(function(file){
      if(file.indexOf('.js')>=0){
        require(models_path + '/' + file)
      }
    })
80. go to server.js and add mongoose file
81. require('./server/config/mongoose.js')
82. Need to turn on mongo! should have 3 terminals. one for sudo mongod and mongo in another shell
83. sudo mongod
84. mongo
85. nodemon server.js
86. need to create a models file to handle our schemas.
87. models/users.js
88. var mongoose = require('mongoose')
    var Schema = mongoose.Schema
    var UserSchema = new Schema({
      name:{type:String, required:true},
    }{timestamps: true})
    mongoose.model("User", UserSchema)
89. need to link this to backend controller
90. need to add mongoose and the schema. Add to the top of the server controller page. remove that response.send
var mongoose = require('mongoose')
var User = mongoose.model("User")
module.exports =(function(){
  return{
    login:function(request,response){
      User.findOne({name:request.body.name}, function(err,user){
        console.log(user)
      })
    }
  }
})()
91. TEST!!! when we enter in a name.. we should see null IN TERMINAL because there is no user in our database.
92. still in server controller
var mongoose = require('mongoose')
var User = mongoose.model("User")
module.exports =(function(){
  return{
    login:function(request,response){
      User.findOne({name:request.body.name}, function(err,user){
        if(!user){
          var newUser = new User(request.body);
          console.log(newUser)
        }
      })
    }
  }
})()
93. TEST!! should see name property and an ID in the terminal!!
94. still in server side controller
var mongoose = require('mongoose')
var User = mongoose.model("User")
module.exports =(function(){
  return{
    login:function(request,response){
      User.findOne({name:request.body.name}, function(err,user){
        if(!user){
          var newUser = new User(request.body);
          newUser.save(function(err){
            if(err){
              return response.json({error: 'something wrong'})
            }
            else{
              response.json({status:true})
            }
          })
        }
        else{
          response.json({status:true})
        }
      })
    }
  }
})()
95. back end validations is the if error. if status exists, then user logged in correctly. do not send user to front end.. just send status true.
96. TEST!!! should see it in browser console. When clicking the object, data.. you'll see status:true
97. go to factory page.
app.factory('sessionFactory',function($http){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          console.log("user is logged in")
        }
      })
  }
  return factory
})
98. TEST!! look at broswer console log. should see the console.log.
99. when the user logs in, we don't want them to stay on the same page.. need to redirect them somewhere else. add $location next to $http
app.factory('sessionFactory',function($http, $location){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          $location.url('/dash')
        }
      })
  }
  return factory
})
100. sending them to /dash.. we don't have a dash so we need to create it.
101. go to app.js and we need to add the /dash route.
102. app.config(function($routeProvider){
      $routeProvider
      .when('/login',{
        templateUrl: 'partials/login.html'
        })
      .when('/dash',{
        templateUrl: 'partials/dash.html'
        })
      .otherwise({
        redirectTo: '/login'
        })
    })
103. we don't have a dash.html so we need to create one in our partials.
104. add some text to test out dash.
105. TEST!!! should be redirected everytime we add.
106. if we turn off our server and turn it back on.. the user shouldn't be logged in but still is able to see that page.
107. express-session. stores current user into session.
108. go to server.js
109. add session = require('express-session')
110. also need to add some stuff after the other app.use

var express = require('express')
    var app = express()
    var bodyParser = require('body-parser')
    var path = require('path')
    var session = require('express-session')
    app.use(express.static(path.join(`__dirname`, '/client')))
    app.use(express.static(path.join(`__dirname`, 'node_modules')))
    app.use(bodyParser.json())
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      }))
    require('./server/config/mongoose.js')
    require('./server/config/routes.js')(app)
    app.listen(8000, function(){
      console.log("listening to port 8000")
    })
111. go back to server controller. add sessions ALSO ADD console.log right below login:function
var mongoose = require('mongoose')
var User = mongoose.model("User")
module.exports =(function(){
  return{
    login:function(request,response){
      console.log(request.session.user)
      User.findOne({name:request.body.name}, function(err,user){
        if(!user){
          var newUser = new User(request.body);
          newUser.save(function(err){
            if(err){
              return response.json({error: 'something wrong'})
            }
            else{
              request.session.user = newUser
              request.session.save()
              response.json({status:true})
            }
          })
        }
        else{
          request.session.user = user
          request.session.save()
          response.json({status:true})
        }
      })
    }
  }
})()
112. TEST!!! type in name. it's undefined and when type in same name.. we should see the object
113. <h1>erase the console.log under login:function</h1>
114. go to dash.html and add the following:
<div ng-controller = 'sessionController'>
</div>
115. go back to front end controller. add a checkUser() RIGHT UNDER $SCOPE.ERRORS
app.controller('sessionController',function($scope, sessionFactory){
  $scope.errors = [];

  sessionFactory.checkUser()

  $scope.login = function(){
    $scope.errors = []
    if(!$scope.logReg || !$scope.logReg.name){
      $scope.errors.push("Please enter a name")
    }
    if($scope.logReg.name.length < 3){
      $scope.errors.push("Name must be at least 3 characters long")
    }
    else{
      sessionFactory.login($scope.logReg)
    }
  }
})
116. need to make a checkUser in FACTORY. GO TO FACTORY.
117. app.factory('sessionFactory',function($http, $location){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          $location.url('/dash')
        }
      })
  }
  factory.checkUser = function(){
    console.log('validating..')
  }
  return factory
})
118. TEST!!! check broswer console.. and you should see validating. it ran immediately!
119. add $http.get for the checkuser to factory.
app.factory('sessionFactory',function($http, $location){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          $location.url('/dash')
        }
      })
  }
  factory.checkUser = function(){
    $http.get('/checkuser')
  }
  return factory
})
120. Go to our routes page to make the '/checkuser' route
121.
var session = require('./../controllers/session.js')
module.exports = function(app){
  app.post('/login', function(request,response){
    session.login(request,response)
    })
  app.get('/checkuser',function(request,response){
    response.json(null)
    })
}
122. go back to factory.js
123.
app.factory('sessionFactory',function($http, $location){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          $location.url('/dash')
        }
      })
  }
  factory.checkUser = function(){
    $http.get('/checkuser').then(function(output){
      console.log(output.data)
      })
  }
  return factory
})
124. TEST! should see null in browser console.
125. back in our routes.js
var session = require('./../controllers/session.js')
module.exports = function(app){
  app.post('/login', function(request,response){
    session.login(request,response)
    })
  app.get('/checkuser',function(request,response){
    session.checkUser(request,response)
    })
}
126. need to send to backend controller now
127. go to backend controller
128.
var mongoose = require('mongoose')
var User = mongoose.model("User")
module.exports =(function(){
  return{
    login:function(request,response){
      console.log(request.session.user)
      User.findOne({name:request.body.name}, function(err,user){
        if(!user){
          var newUser = new User(request.body);
          newUser.save(function(err){
            if(err){
              return response.json({error: 'something wrong'})
            }
            else{
              request.session.user = newUser
              request.session.save()
              response.json({status:true})
            }
          })
        }
        else{
          request.session.user = user
          request.session.save()
          response.json({status:true})
        }
      })
    },
    checkUser:function(request,response){
      response.json(null)
    }
  }
})()
129. TEST!! look at console browser. the null should already be in the console.
130.
UPDATE WITH!!!! checkUser:function(request,response){
    if(!request.session || !request.session.user){
      response.json(null)
    }
    else{
      response.json(request.session.user)
    }
}
131. TEST!! you should see a null in your broser console.
132. go to your factory page. we're going to add a callback
app.factory('sessionFactory',function($http, $location){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          $location.url('/dash')
        }
      })
  }
  factory.checkUser = function(callback){
    $http.get('/checkuser').then(function(output){
      callback(output.data)
      })
  }
  return factory
})
133. in our front end controller. add to the checkUser function!
app.controller('sessionController',function($scope, sessionFactory){
  $scope.errors = [];

  sessionFactory.checkUser(function(data){
    $scope.curUser = data;
  })

  $scope.login = function(){
    $scope.errors = []
    if(!$scope.logReg || !$scope.logReg.name){
      $scope.errors.push("Please enter a name")
    }
    if($scope.logReg.name.length < 3){
      $scope.errors.push("Name must be at least 3 characters long")
    }
    else{
      sessionFactory.login($scope.logReg)
    }
  }
})
134. go to dash.html
135. <div ng-controller='sessionController'>
        Welcome, {{curUser.name}}
    </div>
136. TEST IT! should be able to see the name
137. go to factory page and make edits. WE ARE REMOVING THE CALLBACK(OUTPUT.DATA)
app.factory('sessionFactory',function($http, $location){
  var factory = {};
  factory.login = function(user){
    $http.post('/login', user).then(function(output){
        if(output.data){
          $location.url('/dash')
        }
      })
  }
  factory.checkUser = function(callback){
    $http.get('/checkuser').then(function(output){
      if(!output.data){
        $location.url('/login')
      }
      else{
        callback(output.data)
      }
    })
  }
  return factory
})
138. TEST!!! should not be able to go to dash without logging in.
139. building logout function.
140. in dash.html build logout
141. <div ng-controller='sessionController'>
        Welcome, {{curUser.name}} | <a href="/logout">Logout</a>
    </div>
142. not using angular for logout. clear session and reload index.
143. in routes.js add a logout route.
144.
var session = require('./../controllers/session.js')
module.exports = function(app){
  app.post('/login', function(request,response){
    session.login(request,response)
    })
  app.get('/checkuser',function(request,response){
    session.checkUser(request,response)
    })
  app.get('/logout', function(request,response){
    session.logout(request,response)
    })
}
145. go into server side controller.
146.
var mongoose = require('mongoose')
var User = mongoose.model("User")
module.exports =(function(){
  return{
    login:function(request,response){
      console.log(request.session.user)
      User.findOne({name:request.body.name}, function(err,user){
        if(!user){
          var newUser = new User(request.body);
          newUser.save(function(err){
            if(err){
              return response.json({error: 'something wrong'})
            }
            else{
              request.session.user = newUser
              request.session.save()
              response.json({status:true})
            }
          })
        }
        else{
          request.session.user = user
          request.session.save()
          response.json({status:true})
        }
      })
    },
    checkUser:function(request,response){
      if(!request.session || !request.session.user){
        response.json(null)
      }
      else{
        response.json(request.session.user)
      }
    },
    logout: function(request,response){
      request.session.destroy();
      response.redirect('/')
    }
  }
})()
