class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
  	@current_user ||= User.where(id: session[:user_id]).first
  end
  def factual
    @factual = Factual.new("XN5NDTgBV3VYoLEFkdnKrD6EXhrTcdQw22uCwy83", "lzkwQaMqjgRPL0CYRvvN2LgeWOUHYvElhb9pbC2z")
  end
end
