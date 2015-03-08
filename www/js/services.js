angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
.service('Goals', function($firebaseArray, store, $state) {

  var goalsRef = new Firebase("https://cohack.firebaseio.com/goals");
  goalsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      $state.go("login");
    }
  });

  var goals = $firebaseArray(goalsRef);

  this.all = function() {
    return goals;
  };

  this.add = function(goal) {
    goals.$add(goal);
  };

  this.get = function(id) {
    return goals.$getRecord(id);
  };

  this.save = function(goal) {
    goals.$save(goal);
  };

  this.delete = function(goal) {
    goals.$remove(goal);
  };

})

.service('Month', function($firebaseObject, store, $state) {

  var currentRef = new Firebase("https://cohack.firebaseio.com/current");
  currentRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      $state.go("login");
    }
  });

  var current = $firebaseObject(currentRef);

  this.get = function() {
    return current;
  };
})

.service('Transactions', function($firebaseArray, store, $state) {

  var transactionsRef = new Firebase("https://cohack.firebaseio.com/transactions");
  transactionsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      $state.go("login");
    }
  });

  var transactions = $firebaseArray(transactionsRef);

  this.all = function() {
    return transactions;
  };
});
