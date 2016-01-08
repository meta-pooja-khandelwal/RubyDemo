class ArticlesController < ApplicationController
  def new
  end

  def create
    @article=Article.new(params[:article])
    @article.save
    redirect_to @article

  end

  def index
     @articles = Article.all
   end
  
  def show
    @article=Article.find(params[:id])

  end
end
