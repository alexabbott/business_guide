class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
  	@current_user ||= User.where(id: session[:user_id]).first
  end
  def factual
    @factual = Factual.new("Zm7Usesd5EmkIAI5TS35rFJ0lAbNvV9mIHcretpx", "288r7kyFoicPncc5wJ3W9pyDRoqHHsLTcQP4IB3h")
  end
end
