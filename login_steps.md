/***************************************************
          BUILD INITIAL PROJECT STRUCTURE - video 1
****************************************************/

# Basic Setup Process
`create main project folder`
mkdir ProjectMainFolder

`PROJECT`
    npm init -y
    npm install express mongoose body-parser express-session path fs --save

    touch
        1. server.js

    mkdir
        1. client
        2. server

`CLIENT`

mkdir
1. controllers
2. factories
3. partials

touch
1. app.js
2. index.html

`SERVER`
mkdir
1. config
2. controllers
3. models

`CONFIG`
touch
1. routes.js
2. mongoose.js

cd ../..

`atom .`

/***************************************************
          LINK SERVER.JS TO INDEX.HTML
****************************************************/

# edit Server.js

`startup server in terminal and confirm "listening"`



############### --  end video 1  -- #################




# test INDEX page connection

enter some text on the html page
localHost 8000 and confirm page is displayed

# Index.html (located in /project/client)

(*add HTML angular snippet*)
add angular CDN
add H1 body text
test angular connection

/***************************************************
              LINK APP.JS TO INDEX
****************************************************/

# app.js  (located in /project/client)

(* add snippet template to app.js)
link to index.html = <script src='app.js'>
test new link
console.log(app) = check for object in dev section

# add 1st partial route to APP.js

inject ngRoute
add 'angular-route.js' to script links on index.html
setup partial $routeProvider routes

/***************************************************
          CREATE PARTIAL PAGE AND LINK
****************************************************/

# create new partial.html page (located in /client/partials)

add some dummy text to file
add <div tag to html 'ng-view'
test connection of the (2) pages
  at this point the URL is '/#/login'



############### --  end video 2  -- #################



# build Form on login partial

<Form
<input type='text' value='name'
input type=submit value=login here
(templates 'talk' to controllers, so build controller next)

/***************************************************
              CREATE CONTROLLER AND LINK
****************************************************/

# CREATE controller = 'login.js' (located in: /client/controllers)

add console log test

# add LINK to login.js file on index.html

src='controllers/login.js'
test the link.  Check for the console.log

# EDIT login.js file

add controller snippet
name the controller

/***************************************************
      BUILD LINK BETWEEN FORM AND CONTROLLER
****************************************************/
# ADD link between partial page and controller

1. add div to partial page
    ng-controller='nameOfNewController'
                  OR
2. add template load code on the app.js route.

# TEST the connection

refresh the page and see if console errors

# ADD ng-submit tag to Form

<form ng-submit='{{'name_of_function'()}}'

# ADD the function code to the controller.

$scope.logReg = function (){
  console.log($scope.name_of_function)
}

# test function addition

back to partial view page.
enter dummy text and submit.
Look for object and new data in console in dev tools.

############### --  end video 3  -- #################


/***************************************************
              VALIDATIONS & FACTORY - video 4
****************************************************/

# CREATE errror handling logic in controller

``(DRY practice would be to handle in a separate controller)``
$scope.errors = [];
build out error logic
  $scope.errors = [] // reset error array to empty array
  if(!scope.loginReg){
    $scope.errors.push('please enter name')
  }
ex: if($scope.loginReg.name.length < 3)

# LINK and test this logic to partials HTML page

new <P> tag style='color:red'
ng-repeat error in errors track by $index

# TEST above logic and output

fill out bad data on form and submit.  Should see error messages.

# CREATE factory file (located in /client/factories)

loginFactory.js is one file name idea

# LINK new factory file to HTML file

src='factories/loginFactory.js'

# BUILD code for factory .js file

insert angular snippet
app.factory = .....

# ADD factory by name to Controller params

app.controller('loginController', ['$scope', function($scope, LoginFactory)

# TEST link

console.log(LoginFactory) to see what it is.
TEST by inputting valid data in form and submit
should get output of Empty {}


  ############### --  end video 4  -- #################


  /***************************************************
                VALIDATIONS & FACTORY - video 5
  ****************************************************/













































































//
