
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);



myApp.factory('Comment', ['$resource',function($resource){
return $resource('/todos/:todo_id/comments/:id.json', {todo_id: '@todo_id', id: '@id'}
,{
  update: {method: 'PUT', params: {todo_id: '@todo_id', id: '@id'}}
});
}]);



myApp.factory('Todo', ['$resource', function($resource){
  return $resource('/todos/:id.json',{id: '@id'},{
    update: {method: 'PUT', params: {id: '@id'}},
     saveTag: { method: 'GET',  url: 'todos/addTag.json'  },
      getTags: { method: 'GET',isArray:true,  url: 'todos/getTags.json'  }
  });
}]);



//Controller

angular.module('myApp').controller('TodoShowController',['$scope','$routeParams', '$filter', '$http', '$resource' ,'Comment','Todo', '$location',function($scope,$routeParams, $filter,$http,$resource,Comment,Todo,$location) {

  $scope.editedComment = null;
 $scope.todo=Todo.get({id: $routeParams.id});

 $scope.commentList = Comment.query({todo_id: $routeParams.id});


//Define a 'save' method which will be called from the view.
$scope.addComment = function() {
  //Create the comment object to be sent to the server
  var commentObj = new Comment({body: $scope.newComment, todo_id: $routeParams.id});
  var commentObj1={body: $scope.newComment, todo_id: $routeParams.id};
  //Attempt a save to the back-end
  commentObj.$save(function(response) {

console.log(response)
      $scope.commentList.push(response);

      //Empty the name & body
     $scope.newComment = ""

  });


};


$scope.addTagForTodo = function () {


Todo.saveTag({todoId: $routeParams.id,name: $scope.all_tags});
$scope.all_ags=""
$scope.tags=  Todo.getTags({todoId: $routeParams.id});
  };

$scope.tags=  Todo.getTags({todoId: $routeParams.id});



$scope.editComment = function (comment) {
        $scope.editedComment = comment;
        $scope.originalComment = angular.extend({}, comment);
      };

      $scope.saveEditsComment = function (comment) {
          comment.body = comment.body.trim();
          if (comment.body === $scope.originalComment.body) {
            $scope.editedComment = null;
            return;
          }
         Comment.update({id: comment.id, body: comment.body, todo_id: $routeParams.id}, function(){
         $scope.commentList = Comment.query({todo_id: $routeParams.id});

          })
          $scope.editedComment = null;
          $scope.originalComment =null;
            $scope.reverted = true;
            //$route.reload();
        };

        $scope.removeComment = function(comment) {
            if (confirm("Are you sure you want to delete this Comment?"))
            var commentObj=new Comment({id: comment.id, todo_id: $routeParams.id });

           commentObj.$delete(function(){
           $scope.commentList = Comment.query({todo_id: $routeParams.id});

           });
        //    $route.reload();
        };






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


  /**  $routeProvider.when('/active',{
      templateUrl: '/templates/todos/index.html',
      controller: 'todoController'
    });
*/

    $routeProvider.when('/todos/:id',{
      templateUrl: '/templates/todos/show.html.erb',
      controller: 'TodoShowController'
    });

    $routeProvider.otherwise({
      redirectTo: '/todos'
    });
  }
]);
