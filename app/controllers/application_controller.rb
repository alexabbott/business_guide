class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
  	@current_user ||= User.where(id: session[:user_id]).first
  end
  def factual
    @factual = Factual.new("mBclLOrXNvO7tlm2iSPKWGARsCOmAXg17i89eKsg", "uopDNHsCCnfEucJoS5KRPfiaHI6Ya7md7i9moMXm")
  end
end
