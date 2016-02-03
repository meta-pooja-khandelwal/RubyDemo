myApp.directive('tagInput',function(){
  return{
    restrict:'A',
    link: function(scope,element,attrs){

     scope.inputWidth=20;
     //watch for changes in text field
     scope.$watch(attrs.ngModel,function(value){
       if(value!=undefined){
         var temp=$('<span>'+value+'</span>').appendTo('body')
          scope.inputWidth=temp.width()+5;
          temp.remove();
       }
     });

     element.bind('keydown',function(e){
        if(e.which==9){
          e.preventDefault();
        }

        if(e.which==8){
          scope.$apply(attrs.deleteTag);
        }
     });

//tab or enter pressed
     element.bind('keyup',function(e){
       var key=e.which;
       if(key==9 || key==13){
         e.preventDefault();
         scope.$apply(attrs.newTag)
       }
     });
    }
  }
});
