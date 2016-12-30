var app = angular
	.module('formApp', [])
	.controller('formController', ['$scope','$window','$http', function($scope,$window,$http){

		$scope.user = {} 
    // {firstName : "nikky", lastName : 'verma' , age:23, email:'test@test.com',phoneNumber:9565646823,address:'MG road indore',password:'123456789',cpassword:'123456789'};
		//$window.alert($scope.user)
		/*$scope.userrowdata = [];
		$scope.userrowdata.push($scope.user);*/
		
    /*$scope.add = function(){
			$scope.userrowdata.push($scope.user);
			$scope.user = []
		}*/

    $http.get('http://localhost/userRest/user.php?users=1').
      then(function(response) {
        $scope.userrowdata = response.data;
        /*alert($scope.userrowdata)*/
    });

    $scope.rows = 5
    // sorting
    $scope.sortby = 'name'
    $scope.sortColumn = 'name'
    $scope.reversSort = false
    $scope.sortthis = function(columnName){
      $scope.reversSort = ($scope.sortColumn == columnName) ? !$scope.reversSort : false;
      $scope.sortColumn = columnName
    }
		$scope.submitForm = function() {
			if ($scope.userForm.$valid) {
				var msgdata = {
            'name'  :   $scope.user.firstName+" "+$scope.user.lastName,
            'age'   :   $scope.user.age,
            'email' :   $scope.user.email,
            'phone' :   $scope.user.phone,
            'pwd'   :   $scope.user.password,
            'salary':   $scope.user.salary,
            'address':  $scope.user.address
        }
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.post('http://localhost/userRest/user.php',msgdata).success(function(data, status, headers, config) {
            $scope.userrowdata = data;
        });

  		} else {
  			alert("not a valid form")
  		}
		};
	}]);

  var compairPass = function() {
      return {
          require: "ngModel",
          scope: {
              otherModelValue: "=compairPass"
          },
          link: function(scope, element, attributes, ngModel) { 
              ngModel.$validators.compairPass = function(modelValue) {
                  return modelValue == scope.otherModelValue;
              };
              scope.$watch("otherModelValue", function() {
                  ngModel.$validate();
              });
          }
      };
  };
 
  app.directive("compairPass", compairPass);

app.directive('username', function($q, $timeout,$http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      $http.get('http://localhost/userRest/user.php?checkusername=1').
        then(function(response) {
          var usernames = [response.data.info];
          alert(usernames)
      });
      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.resolve();
        }

        var def = $q.defer();

        $timeout(function() {
          // Mock a delayed response
          if (usernames.indexOf(modelValue) === -1) {
            // The username is available
            def.resolve();
          } else {
            def.reject();
          }

        }, 2000);

        return def.promise;
      };
    }
  };
});

app.directive("passwordConfirm", function() {
   return {
      require: "ngModel",
      scope: {
        passwordConfirm: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordConfirm || ctrl.$viewValue) {
               combined = scope.passwordConfirm + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordConfirm;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordConfirm", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordConfirm", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});