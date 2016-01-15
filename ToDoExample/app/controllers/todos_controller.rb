class TodosController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  before_action :get_user, except: [:index, :create]
  respond_to :html, :json
  
  def index
  end
end
