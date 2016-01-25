class CommentsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  respond_to :html, :json
  def index
    @comment = Comment.where(todo_id: params[:todo_id])
    respond_with @comment
 end


  def create
    puts params[:todo_id]
    @todo=Todo.find(params[:todo_id])
    @comment=@todo.comments.create(comment_params)
    render json: @todo.as_json, status: :ok
  end


  def destroy
    @todo = Todo.find(params[:todo_id])
    @comment = @todo.comments.find(params[:id])
    @comment.destroy
    render json: @todo.as_json, status: :ok
  end


  private

  def comment_params
   params.fetch(:comment).permit(:body)
  end
end
