//services
myApp.factory('Comment', ['$resource',function($resource){
  return $resource('/todos/:todo_id/comments/:id.json', {todo_id: '@todo_id', id: '@id'},{
    update: {method: 'PUT', params: {todo_id: '@todo_id', id: '@id'}}
  });
}]);

myApp.factory('Todo', ['$resource', function($resource){
  return $resource('/todos/:id.json',{id: '@id'},{
    update: {method: 'PUT', params: {id: '@id'}},
    saveTag: { method: 'GET',  url: 'todos/addTag.json'},
    getTags: { method: 'GET',isArray:true,  url: 'todos/getTags.json'},
    deleteTag: { method: 'GET',  url: 'todos/deleteTag.json'}
  });
}]);
