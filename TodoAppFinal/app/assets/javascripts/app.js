var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);


//Factory
myApp.factory('Todos', ['$resource',function($resource){
  return $resource('/todos.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);


myApp.factory('Todo', ['$resource', function($resource){
  return $resource('/todos/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);


//Controller

angular.module('myApp').controller('TodoShowController',['$scope','$routeParams', '$filter', '$http', '$resource' ,'Todo', '$location',function($scope,$routeParams, $filter,$http,$resource,Todo,$location) {

alert($routeParams)
var id=$routeParams.id;
alert(id)

 $scope.todo=Todo.show($routeParams.id);
/**.$promise.then(function(todo) {
    $scope.todo = todo;
  });*/

  alert(  $scope.todo)
}]);


myApp.controller("TodoController", ['$scope', '$http', '$resource', 'Todos', 'Todo', '$location', function($scope, $http, $resource, Todos, Todo, $location) {

  $scope.todoList = Todos.query();
 $scope.status = '';
  $scope.editedTodo = null;


  $scope.save = function() {
       Todos.create({title: $scope.newTodo, done:false});
       $scope.todoList = Todos.query();
      $scope.newTodo = "";
  };


  $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        $scope.originalTodo = angular.extend({}, todo);
      };



  $scope.toggleCompleted = function (todo) {
    Todo.update({id: todo.id, title: todo.title, done:todo.done});
    $scope.todoList = Todos.query();
    Flag  = false;
   };




  Flag  = false;

    $scope.markAll = function () {
        if(Flag == false){
          angular.forEach($scope.todoList , function(todo) {
            if(todo.done == false) {
                      todo.done =true;
                      Todo.update({id: todo.id, title: todo.title, done:todo.done});
                    }
                    $scope.todoList = Todos.query();

    });
    Flag = true;
  }else{
    angular.forEach($scope.todoList , function(todo) {
      if(todo.done == true) {
                todo.done =false;
                Todo.update({id: todo.id, tilte: todo.title, done:todo.done});
              }
              $scope.todoList = Todos.query();

  });
  Flag = false;
  }
  };

  $scope.todoShow=function(todoId){

      var url = "/todos/" + todoId;
      $location.path(url);
    console.log($location.path(url));
     //$route.reload();




    //$scope.$apply() ;
    };


    $scope.removeTodo = function(todo) {
        if (confirm("Are you sure you want to delete this task?"))
        Todo.delete({id: todo.id }, function(){
       $scope.todoList = Todos.query();
        });
    };


    $scope.saveEdits = function (todo ) {

        todo.title = todo.title.trim();

        if (todo.title === $scope.originalTodo.title) {
          $scope.editedTodo = null;
          return;
        }

        Todo.update({id: todo.id, title: todo.title, done:todo.done}, function(){
       $scope.todoList = Todos.query();

        })
        $scope.editedTodo = null;
        $scope.originalTodo =null
          $scope.reverted = true;
      };



}]);


//Routes
myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/todos',{
      templateUrl: '/templates/todos/index.html',
      controller: 'TodoController'
    });

    $routeProvider.when('/todos/:id',{
      templateUrl: '/templates/todos/show.html',
      controller: 'TodoShowController'
    });

    $routeProvider.otherwise({
      redirectTo: '/todos'
    });
  }
]);
