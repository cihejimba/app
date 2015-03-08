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

.controller('TodayCtrl', function($scope) {
  $scope.budget = {
    allocated: 28.84,
    spent: 14.13,
    scheduled: 510.00,
    remaining: 14.71
  };

  $scope.transactions = [
    { name: 'Vesuvio bar', status: 'pending', amount: -3.50 },
    { name: 'Cafe me', status: 'pending', amount: -3.00 },
    { name: 'Safeway', status: 'confirmed', amount: -5.13 },
    { name: 'Jackson Palace', status: 'confirmed', amount: 2.50 },
    { name: 'Rent', status: 'scheduled', amount: -500.00 },
    { name: 'Netflix', status: 'scheduled', amount: -10.00 }
  ];

  $scope.friend = {
    name: 'John Doe',
    description: 'works'
  }
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
    ammount: '',
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
      ammount: '',
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
