
module Api
module V1
class TodosController < ApplicationController
skip_before_filter :verify_authenticity_token
respond_to :html, :json


def index
  @todo = Todo.all
  respond_with @todo
 #respond_with(Todo.all.order("completed ASC").order("id DESC"))
end

def show
 respond_with(Todo.find(params[:id]))
end

def create

  data= user_params



  @user = User.new(user_params)
  if @user.save
    render json: @user.as_json, status: :ok
  else
    render json: {user: @user.errors, status: :no_content}
  end


@todo = Todo.new(todo_params)
if @todo.save
=begin
 respond_to do |format|
   format.json {render :json => @todo}
end
=end
render json: @todo.as_json
end
end

def update
 @todo  = Todo.find(params[:id])
 if @todo.update(todo_params)
=begin
   respond_to do |format|
     format.json { render :json => @todo }
end
=end
render json: @todo.as_json
end
end

def destroy

 respond_with Todo.destroy(params[:id])
end


private
def todo_params
 params.require(:todo).permit(:title,:completed)
end




end
end
end
