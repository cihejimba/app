angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, auth, $state, store) {
  auth.signin({
    closable: false,
    // This asks for the refresh token
    // So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    auth.getToken({
      api: 'firebase'
    }).then(function(delegation) {
      store.set('firebaseToken', delegation.id_token);
      $state.go('tab.today');
    }, function(error) {
      console.log("There was an error logging in", error);
    })
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})

.controller('TodayCtrl', function($scope, Month, Transactions) {
  $scope.current = Month.get();
  $scope.transactions = Transactions.all();
})

.controller('GoalsCtrl', function($scope, Goals, $ionicModal) {
 $ionicModal.fromTemplateUrl('templates/goal-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.goal = {
    name: '',
    amount: '',
    months: ''
  };

  $scope.goals = Goals.all();

  $scope.showAddGoal = function() {
    $scope.modal.show();
  };

  $scope.addGoal = function() {
    if(!$scope.goal.$id) {
      Goals.add($scope.goal);
    } else {
      Goals.save($scope.goal);
    }
    $scope.goal = {
      name: '',
      amount: '',
      months: ''
    };
    $scope.modal.hide();
  };

  $scope.deleteGoal = function(goal) {
    Goals.delete(goal);
  };

  $scope.editGoal = function(goal) {
    $scope.goal = goal;
    $scope.modal.show();
  };

  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('ReportsCtrl', function($scope) {

})

.controller('SettingsCtrl', function($scope, auth, $state, store) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go("login");
  }
});
