class TodosController < ApplicationController

  skip_before_filter  :verify_authenticity_token
  #before_action :get_user, except: [:index]
  respond_to :html, :json

  def index

    @todo = Todo.all
    respond_with @todo
  end


  def create
#    data= todo_params
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo.as_json, status: :ok
    else
      render json: {todo: @todo.errors, status: :no_content}
    end
  end

  def update
      @todo = Todo.find(params[:id])
    if @todo.update_attributes(todo_params)
      render json: @todo.as_json, status: :ok
    else
      render json: {todo: @todo.errors, status: :unprocessable_entity}
    end
  end

  
  private
  def todo_params
    params.fetch(:todo).permit(:title, :done)
  end

end
