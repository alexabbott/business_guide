class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
  	@current_user ||= User.where(id: session[:user_id]).first
  end
  def factual
    @factual = Factual.new("0BvPtMoWDC1Im9khpuVBxesqxUQ4I96sSU5S0Uuz", "cURPaE2uu62sysazzXOLH953DoQkzUTOoj4r1Rdy")
  end
end
