var myApp = angular.module('myApp', ['ngRoute', 'ngResource','ngTagsInput']);

//Controllers
myApp.controller('TodoShowController',['$scope','$routeParams', '$filter', '$http', '$resource' ,'Comment','Todo', '$location',function($scope,$routeParams, $filter,$http,$resource,Comment,Todo,$location) {
  $scope.editedComment = null;
  $scope.todo=Todo.get({id: $routeParams.id});
  $scope.commentList = Comment.query({todo_id: $routeParams.id});

  $scope.tags=[];
  $scope.tags=  Todo.getTags({todoId: $routeParams.id});



  //Define a 'save' method which will be called from the view.
  $scope.addComment = function() {

    //Create the comment object to be sent to the server
    var commentObj = new Comment({body: $scope.newComment, todo_id: $routeParams.id});

    //Attempt a save to the back-end
    commentObj.$save(function(response) {
      $scope.commentList.push(response);

      //Empty the body
      $scope.newComment = ""
    });
  };

  $scope.addTagForTodo = function () {

    if($scope.all_tags.length==0){
      return;
    }
    Todo.saveTag({todoId: $routeParams.id,name: $scope.all_tags});
    $scope.all_tags=""
    $scope.tags=  Todo.getTags({todoId: $routeParams.id});
  };

  $scope.deleteTag=function(tagId,index){
    Todo.deleteTag({id:tagId});
    //$scope.tags=  Todo.getTags({todoId: $routeParams.id});
    $scope.tags.splice(index, 1);
  }

  $scope.editComment = function (comment) {
    $scope.editedComment = comment;
    $scope.originalComment = angular.extend({}, comment);
  };

  $scope.saveEditsComment = function (comment) {
    comment.body = comment.body.trim();
    if (comment.body === $scope.originalComment.body) {
      $scope.editedComment = null;
    }

    Comment.update({id: comment.id, body: comment.body, todo_id: $routeParams.id}, function(){
      $scope.commentList = Comment.query({todo_id: $routeParams.id});
    })

    $scope.editedComment = null;
    $scope.originalComment =null;
    $scope.reverted = true;
  };

  $scope.removeComment = function(comment) {
    if (confirm("Are you sure you want to delete this Comment?"))
    var commentObj=new Comment({id: comment.id, todo_id: $routeParams.id });
    commentObj.$delete(function(){
      $scope.commentList = Comment.query({todo_id: $routeParams.id});
    });
  };
}]);

myApp.controller("TodoController", ['$scope', '$http', '$resource', 'Todo', '$location','$routeParams', function($scope, $http, $resource, Todo, $location,$routeParams) {
  $scope.todoList = Todo.query();
  $scope.status = '';
  $scope.editedTodo = null;

  // Monitor the current route for changes and adjust the filter accordingly.
  $scope.$on('$routeChangeSuccess', function () {
    var status = $scope.status = $routeParams.status || '';
    $scope.statusFilter = (status === 'active') ?
    { done: false } : (status === 'completed') ?
    { done: true } : {};
  });

  $scope.save = function() {
    var todoObj = new Todo({title: $scope.newTodo, done:false});

    //Attempt a save to the back-end
    todoObj.$save(function(response) {
      $scope.todoList.push(response);
      $scope.newTodo = "";
    });
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
    $scope.originalTodo = angular.extend({}, todo);
  };

  $scope.toggleCompleted = function (todo,i) {
    Todo.update({id: todo.id, title: todo.title, done:todo.done});
    $scope.todoList[i].Value=todo;
  };

  $scope.markAll = function () {
    var flag  = false;
    var i=-1;
    var quit=false;

    angular.forEach($scope.todoList , function(todo) {
      if(quit==false){
        if(todo.done == false) {
          flag=true;
          quit=true;
        }
      }
    });

    if(flag==true){
      angular.forEach($scope.todoList , function(todo) {
        i++;
        if(todo.done == false) {
          todo.done=true;
          Todo.update({id: todo.id, done:todo.done});
          $scope.todoList[i].Value=todo;
        }
      });
    }else{
      angular.forEach($scope.todoList , function(todo) {
        i++;
        todo.done=false;
        Todo.update({id: todo.id, done:todo.done});
        $scope.todoList[i].Value=todo;
      });
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
  };

  $scope.removeTodo = function(todo,index) {
    if (confirm("Are you sure you want to delete this task?"))

    Todo.delete({id: todo.id }, function(){
      $scope.todoList.splice(index, 1);
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
    $scope.originalTodo =null;
    $scope.reverted = true;
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
