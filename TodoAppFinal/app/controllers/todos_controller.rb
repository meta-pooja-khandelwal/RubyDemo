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
      puts "hi====================================="

      puts @todo.all_tags()
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


def addTag
  #tag = Tag.first_or_create_by_name(params[:name])
  tag=Tag.where(name: params[:name]).first_or_create!
  #todo = Todo.find(id)
  todo=Todo.find(params[:todoId])
todo.tags<<tag
@todo = Todo.find(params[:todoId])
      respond_with(@todo.as_json)
end

def getTags

#Tagging.joins(:tags,:todos).where("tag.todo.date = price_movement.date")
@todo = Todo.find(params[:todoId])
render json: @todo.tags.as_json, status: :ok


 #Tagging.joins(:tags,:todos).where(['todos.id = ? ', params[:todoId]])
    #   respond_with(@todo.as_json)
end
  private
  def todo_params
    puts "hi00000000000000000"
    params.fetch(:todo).permit(:id,:title, :done,all_tags: [:all_tags])
  end

end
