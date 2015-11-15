angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaOauth, $http, googleLogin, login) {

  var requestToken = "";
  var accessToken = "";
  var clientId = "320068819551-049rlk0jfm7tasqro2e2lutj9sl1k82n.apps.googleusercontent.com";
  var clientSecret = "zHXjz9czrpI2WK01AQUhfjKm";
  var returnUrl = "http://localhost:8100/index.html";

  //alert((window.location.href).startsWith("http://localhost:8100/index.html"));
  if((window.location.href).startsWith("http://localhost:8100/index.html")) {
      requestToken = ((window.location.href).split("code=")[1]).replace("#/login", "").replace("4/", "");
      alert(requestToken);
      $http({
        method: "post", 
        url: "https://accounts.google.com/o/oauth2/token", 
        data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + returnUrl + "&grant_type=authorization_code" + "&code=" + requestToken 
      })
          .success(function(data) {
            alert("worked");
              accessToken = data.access_token;
              $location.path("/tabs");
          })
          .error(function(data, status) {
              alert("ERROR: " + data);
          });
      //ref.close();
  }

  $scope.login = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=' + returnUrl + '&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
        ref.addEventListener('onpagehide', function(event) {
         
         });
    }
 
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }

  $scope.google_data = {};

  $scope.signIn = function(user) {
    //console.log('Sign-In', user);
    //$scope.googleLogin();
    //$state.go('tab.dash');
    $scope.loginsucess = login.canLogin();
    console.log($scope.loginsucess);
  };

  $scope.checkValidLogIn = function(){
    alert(JSON.stringify(googleLogin.getUserFriends()));
    alert(JSON.stringify($scope.google_data));
  }

  $scope.googleLogin = function() {
    var promise = googleLogin.startLogin();
    promise.then(function (data) {
        $scope.google_data = data;
        //alert(JSON.stringify(data));
    }, function (data) {
        $scope.google_data = data;
        //alert(JSON.stringify(data));
    });

  }

  if($scope.google_data != null){
    //alert(JSON.stringify($scope.google_data));
  }

})

.controller('DashCtrl', function($scope, $http) {

  $scope.accessToken = accessToken;
  alert($scope.accessToken);

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
