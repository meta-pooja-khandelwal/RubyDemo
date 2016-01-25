class TodosController < ApplicationController
skip_before_filter  :verify_authenticity_token

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

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render json: {status: :ok}
  end


  def show
    puts("hiiiiii")
@todo = Todo.find(params[:id])
      respond_with(@todo.as_json)

=begin
    @todo= Todo.find(params[:id])
      respond_with @todo


      respond_to do |format|
      format.html
      format.json { render json: @todo }
  end


=end
  end








  private
  def todo_params
    params.fetch(:todo).permit(:title, :done)
  end

end
