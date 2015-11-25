  var auth2; // The Sign-In object.
  var googleUser; // The current user.

angular.module('starter.controllers', ['ngInstafeed'])

.controller('LoginCtrl', function($scope, $state, $cordovaOauth, $http, $ionicPopup) {

  var tokenExperation = "";
  var accessToken = "";
  var clientId = "320068819551-049rlk0jfm7tasqro2e2lutj9sl1k82n.apps.googleusercontent.com";
  var clientSecret = "zHXjz9czrpI2WK01AQUhfjKm";
  var appScope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email';

  $scope.loginFake = function(){
      auth2 = {};
      auth2.displayName = 'fakeDisplayName';
      var temp = {'value': 'fakeEmain@email.com'};
      auth2.emails = [temp];
      auth2.emails[0].value = 'fakeEmain@email.com';
      window.location.href = '#/tab/welcome';
  }

  $scope.loginIonic = function(){
    
    //logs in using Ionics API however unsure how to get info from it.
    $cordovaOauth.google(clientId, ["email"])
        .then(function(result) {
            // results
            auth2 = {};
            window.localStorage['gapiToken'] = result;
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

.controller('SocialFeedCtrl', function($scope, $state, $http, ngInstafeed) {


  if($scope.ngInstafeedModel){$scope.ngInstafeedModel = ngInstafeed.model;}
  if($scope.ngInstafeedState){$scope.ngInstafeedState = ngInstafeed.state;}
  $scope.limit = 3;
  $scope.tagged = function() {
    ngInstafeed.get({
      get: 'user',
      userId: 1071009335,
      limit: 21
    }, function(err, res) {
      if(err) { 
        console.log('Error from Instagram');
        throw err; 
      }
      else {
        console.log(res);
        $scope.model = res;
      }
    });

  $scope.openPost = function(URL){
    window.open(URL, '_top', 'location=no, status=yes, menubar=yes');
  }

  }

  $scope.more = function() {
    /*ngInstafeed.more(function(err, res) {
      if(err) { throw err; }
      else {
        console.log(res);
      }
    });*/

    if($scope.limit < 21){
      $scope.limit = $scope.limit +  3;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }


})

.controller('SchoolDetailCtrl', function($scope, $state) {

  $scope.openPeopleSoft = function(){
    window.open('https://mytumobile.towson.edu/', '_top', 'location=no, status=yes, menubar=yes');
  }
  
  $scope.openLabs = function(){
    window.open('http://webapps.towson.edu/computers/compavail.aspx', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openLibary = function(){
    window.open('http://cooklibrary.towson.edu/m/smart/', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openWEPA = function(){
    window.open('http://www.towson.edu/adminfinance/ots/support/wepa/wepawhere.html', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openLaundry = function(){
    window.open('https://www.laundryalert.com/cgi-bin/towson/LMPage', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openInvolved = function(){
    window.open('https://involved.towson.edu/', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openSurvey = function(){
    window.open('https://studentvoice.com/p/Project.aspx?q=5df2030ed14e59513dc4d1b45b3caefb5e31573048deae77190d474f2c016c8331cf935acac9b43d8b43639f284816e0b5e2f916d353589d&r=84f60074-d527-4c50-9de3-10c85ff3757b', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openGoGreen = function(){
    window.open('http://www.towson.edu/adminfinance/sustainability/', '_top', 'location=no, status=yes, menubar=yes');
  }

  $scope.openSGA= function(){
    window.open('http://mobile.towsonsga.org/', '_top', 'location=no, status=yes, menubar=yes');
  }

})

.controller('WelcomeCtrl', function($scope, $state, $http) {

  var profile = auth2;
  $scope.name = profile.displayName;
  $scope.email = profile.emails[0].value
  console.log('Name: ' + profile.displayName);
  console.log('Email: ' + profile.emails[0].value);

})

.controller('ChatsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ChatDetailCtrl', function($scope, $state) {

})

.controller('AccountCtrl', function($scope, $state) {
  
  $scope.signout = function(){
    if(window.localStorage['gapiToken']){
      gapi.auth.signOut();
      window.localStorage.removeItem('gapiToken');
    }
    window.location.href = '#/login';
  }
});
