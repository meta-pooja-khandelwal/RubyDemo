//Routes
myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/todos',{
      templateUrl: '/templates/todos/index.html',
      controller: 'TodoController'
    });

    $routeProvider.when('/:status',{
      templateUrl: '/templates/todos/index.html',
      controller: 'TodoController'
    });

    $routeProvider.when('/todos/:id',{
      templateUrl: '/templates/todos/show.html.erb',
      controller: 'TodoShowController'
    });

    $routeProvider.otherwise({
      redirectTo: '/todos'
    });
  }
]);
