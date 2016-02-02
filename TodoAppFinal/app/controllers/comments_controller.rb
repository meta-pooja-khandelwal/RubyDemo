class CommentsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  respond_to :html, :json

  def index
    @comment = Comment.where(todo_id: params[:todo_id])
    respond_with @comment
  end

  def create
    @todo=Todo.find(params[:todo_id])
    @comment=@todo.comments.create(comment_params)
    render json: @comment.as_json, status: :ok
  end

  def update
    @todo = Todo.find(params[:todo_id])
    @comment = @todo.comments.find(params[:id])
    @comment.update(comment_params)
    render json: @comment.as_json, status: :ok
  end


  def destroy
    @todo = Todo.find(params[:todo_id])
    @comment = @todo.comments.find(params[:id])
    @comment.destroy
    render json: @comment.as_json, status: :ok
  end

  def show
    @comment = Comment.find(params[:id])
    respond_with(@comment.as_json)
  end

  private
  def comment_params
    params.fetch(:comment).permit(:body,:id,:todo_id)
  end
end
