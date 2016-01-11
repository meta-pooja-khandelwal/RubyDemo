class PostsController < ApplicationController
  before_action :findPost, only:[:show,:edit,:update,:destroy]
  def index
    @post=Post.all.order("id ASC")
  end

  def new
    @post=Post.new
  end

  def create
    @post=Post.new(post_params)
    if @post.save
      redirect_to @post
    else
      render 'new'
    end

  end

  def show

  end

def edit

end
def update

  if @post.update(post_params)
    redirect_to @post
  else
    render 'edit'
  end
end

def destroy
@post.destroy
redirect_to root_path
end

def findPost
    @post=Post.find(params[:id])
end
private
def post_params
  params.require(:post).permit(:title,:text)
end

end
