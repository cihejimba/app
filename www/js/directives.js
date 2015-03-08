angular.module('starter.directives', [])
.directive('coProgressBar', function($timeout, $filter) {
    return {
      restrict : 'E',
      template : '<div class="progress-bar"></div>',
      replace : true,
      scope: {
        max: '@',
        current: '@',
        color: '@',
        strokeWidth: '@',
        trailWidth: '@',
        duration: '@'
      },
      link: function (scope, elem, attrs, ctrl) {
        var circle = new ProgressBar.Circle('.progress-bar', {
          color: scope.color,
          strokeWidth: parseInt(scope.strokeWidth),
          trailWidth: parseInt(scope.trailWidth),
          duration: parseInt(scope.duration),
          easing: "easeOut",
          text: {
            value: 0
          },
          step: function(state, bar) {
            bar.setText($filter('currency')(bar.value() * parseFloat(scope.max), "$", 2));
          }
        });

        // Animate till you hit current
        var percent = parseFloat(scope.current) / parseFloat(scope.max);
        circle.animate(percent);
      }
    };
  });
