
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

/**
//Factory
myApp.factory('Todos', ['$resource',function($resource){
  return $resource('/todos.json', {}
  /**,{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  }*/
/**)
}]);*/


myApp.factory('Comment', ['$resource',function($resource){

              return $resource('/todos/:id/comments.json', {}  );


}]);



myApp.factory('Todo', ['$resource', function($resource){
  return $resource('/todos/:id.json', {}
);
}]);



//Controller

angular.module('myApp').controller('TodoShowController',['$scope','$routeParams', '$filter', '$http', '$resource' ,'Comment','Todo', '$location',function($scope,$routeParams, $filter,$http,$resource,Comment,Todo,$location) {



 $scope.todo=Todo.get({id: $routeParams.id});
/**.$promise.then(function(todo) {
    $scope.todo = todo;
  });*/
//$scope.commentList = Comment.query();
$scope.commentList = Comment.query({id: $routeParams.id});

$scope.addComment = function(todoId) {
     alert(todoId)
     $http.post('/todos/'+todoId+'/comments', {todo_id: 20, body: $scope.newComment}).success(function() {
        $scope.newComment = '';
        $scope.todo=Todo.get({id: $routeParams.id});
        //$location.path("list");
      });
  //  Comment.save({todo_id: todoId, body: $scope.newComment});
  //$scope.todo=Todo.get({id: $routeParams.id});
  //  $scope.newComment = "";
};

/**$scope.removeComment = function(comment) {
    if (confirm("Are you sure you want to delete this task?"))
    Comment.delete({id: comment.id }, function(){
   $scope.todo=Todo.get({id: $routeParams.id});
    });
};*/


}]);


myApp.controller("TodoController", ['$scope', '$http', '$resource', 'Todo', '$location', function($scope, $http, $resource, Todo, $location) {

  $scope.todoList = Todo.query();
 $scope.status = '';
  $scope.editedTodo = null;
 //$rootScope.selectedTodo = null;

  $scope.save = function() {
       Todo.save({title: $scope.newTodo, done:false});
       $scope.todoList = Todo.query();
      $scope.newTodo = "";
  };


  $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        $scope.originalTodo = angular.extend({}, todo);
      };



  $scope.toggleCompleted = function (todo) {
    Todo.update({id: todo.id, title: todo.title, done:todo.done});
    $scope.todoList = Todo.query();
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
                    $scope.todoList = Todo.query();

    });
    Flag = true;
  }else{
    angular.forEach($scope.todoList , function(todo) {
      if(todo.done == true) {
                todo.done =false;
                Todo.update({id: todo.id, tilte: todo.title, done:todo.done});
              }
              $scope.todoList = Todo.query();

  });
  Flag = false;
  }
  };



  $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todoList, function(todo) {
        count += todo.done ? 0 : 1;
      });

      return count;
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
       $scope.todoList = Todo.query();
        });
    };


    $scope.saveEdits = function (todo ) {

        todo.title = todo.title.trim();

        if (todo.title === $scope.originalTodo.title) {
          $scope.editedTodo = null;
          return;
        }

        Todo.update({id: todo.id, title: todo.title, done:todo.done}, function(){
       $scope.todoList = Todo.query();

        })
        $scope.editedTodo = null;
        $scope.originalTodo =null
          $scope.reverted = true;
      };

      $scope.showAll =function(){

        $scope.status='';

      };


      $scope.showActive =function(){

        $scope.status=false;

      };


      $scope.showCompleted =function(){

        $scope.status=true;

      };



      $scope.clearCompletedTodos = function() {
        if (confirm("Are you sure you want to clear all completed tasks?"))
          var oldTodos = $scope.todoList
          angular.forEach(oldTodos, function(todo) {
            if (todo.done) Todo.delete({id: todo.id });
          });
          $scope.todoList = Todo.query();
        };

}]);


//Routes
myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/todos',{
      templateUrl: '/templates/todos/index.html',
      controller: 'TodoController'
    });


    $routeProvider.when('/active',{
      templateUrl: '/templates/todos/index.html',
      controller: 'todoController'
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
