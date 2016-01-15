class UsersController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  before_action :get_user, except: [:index, :create]
  respond_to :html, :json

  def index

    @user = User.all
    respond_with @user
  end

  def create
    data= user_params



    @user = User.new(user_params)
    if @user.save
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :no_content}
    end
  end

  def show
    respond_with(@user.as_json)
  end

  def update
    if @user.update_attributes(user_params)
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :ok}
  end

  private

  def user_params
    unless params["user"]["addresses"].blank?
      params["user"]["addresses_attributes"] = params["user"]["addresses"]
      params["user"].delete("addresses")
    end
    params.fetch(:user, {}).permit(:first_name, :last_name, :email, :phone,
                                   :addresses_attributes => [:id, :street1, :street2, :city, :state, :country, :zipcode, :_destroy, :user_id])
  end

  def get_user
    @user = User.find(params[:id])
    render json: {status: :not_found} unless @user
  end

end
