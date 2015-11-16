  var auth2; // The Sign-In object.
  var googleUser; // The current user.

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaOauth, $http, $ionicPopup, $cordovaOauth) {

  var tokenExperation = "";
  var accessToken = "";
  var clientId = "320068819551-049rlk0jfm7tasqro2e2lutj9sl1k82n.apps.googleusercontent.com";
  var clientSecret = "zHXjz9czrpI2WK01AQUhfjKm";
  var appScope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email';

  $scope.loginIonic = function(){
    
    //logs in using Ionics API however unsure how to get info from it.
    $cordovaOauth.google(clientId, ["email"])
        .then(function(result) {
            // results
            gapi.auth.setToken(result);
            console.log('GAPI with set token: ', gapi.auth);
            gapi.client.load('plus','v1', function(){
             var request = gapi.client.plus.people.get({
               'userId': 'me'
             });
             request.execute(function(resp) {
                console.log('All data pulled:',resp);
                console.log('Retrieved profile for: ' + resp.displayName);
                console.log('Retrieved email: ', resp.emails[0].value);
                auth2 = resp;
                //Check here if the email is valid
                window.location.href = '#/tab/welcome';
             });
            });
            console.log("Response Object -> " + JSON.stringify(result));
        }, function(error) {
            // error
            console.log(error);
        });
  }

})

.controller('SocialFeedCtrl', function($scope, $http) {


})

.controller('WelcomeCtrl', function($scope, $http) {

  var profile = auth2;
  $scope.name = profile.displayName;
  $scope.email = profile.emails[0].value
  console.log('Name: ' + profile.displayName);
  console.log('Email: ' + profile.emails[0].value);

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
