class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
  	@current_user ||= User.where(id: session[:user_id]).first
  end
  def factual
    @factual = Factual.new("vg0U5xTnHbd0MzQOBmo3fSHpXzSgC762R3pOwhOc", "L4YgaEpvLdFLj9NwHd559Ik1Qa26lTGVUT6acu4H")
  end
end
