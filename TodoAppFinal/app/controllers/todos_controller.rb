class TodosController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  respond_to :html, :json

  def index
    @todo = Todo.all
    respond_with @todo
  end

  def create
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

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render json: @todo.as_json, status: :ok
  end

  def show
    @todo = Todo.find(params[:id])
    respond_with(@todo.as_json)
  end

  def addTag
    tag=Tag.where(name: params[:name]).first_or_create!
    todo=Todo.find(params[:todoId])
    todo.tags<<tag
    @todo = Todo.find(params[:todoId])
    respond_with(@todo.as_json)
  end

  def getTags
    @todo = Todo.find(params[:todoId])
    render json: @todo.tags.as_json, status: :ok
  end

  private
  def todo_params
    params.fetch(:todo).permit(:id,:title, :done,all_tags: [:all_tags])
  end
end
