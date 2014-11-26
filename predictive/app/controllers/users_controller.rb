class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, status: 200
  end

  def create
    user = User.create(user_params)
    render json: user, status: 201
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(user_params)
    render nothing: true, status: 204
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    render nothing: true, status: 204
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end