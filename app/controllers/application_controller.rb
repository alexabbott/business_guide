
class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
  	@current_user ||= User.where(id: session[:user_id]).first
  end
  def factual
    @factual = Factual.new("lbK0dTnbagtdHu4p7uh5mEZUQaogdPoXbsokyxde", "QLlJgvXdwX2quhXJbhKdVkDbGkyHzGz4Vv4vuPwA")
  end
end

