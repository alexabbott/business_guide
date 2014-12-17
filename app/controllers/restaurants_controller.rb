class RestaurantsController < ApplicationController
  require 'factual'
  skip_before_filter :authorize

  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]

  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = Restaurant.all
    render :json => Restaurant.all
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    @user = User.new
    @is_login = true
  end

  # GET /restaurants/new
  def new
    @restaurant = Restaurant.new
    @user = User.new
    @is_login = true
    #@factual_data = factual.table("restaurants-us")
    #.geo("$point" => [34.012982, -118.495186])
    #.sort("$distance").page(1, :per => 5).rows
    # @factual_data = factual.table("restaurants-us")
    #.filters("locality" => "santa monica").page(2, :per => 20).rows
  end

  # GET /restaurants/1/edit
  def edit
  end

  # POST /restaurants
  # POST /restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)
    @factual_data = factual.table("restaurants-us")
    .geo("$circle" => {"$center" => [@restaurant.latitude, @restaurant.longitude], "$meters" => 5000})
    .sort("$distance")
    .page(1, :per => 50).rows

    respond_to do |format|
      if @restaurant.save
        format.html {  }
        format.json { render action: 'show', status: :created, location: @restaurant }
      else
        format.html { render action: 'new' }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /restaurants/1
  # PATCH/PUT /restaurants/1.json
  def update
    respond_to do |format|
      if @restaurant.update(restaurant_params)
        format.html { redirect_to @restaurant, notice: 'Restaurant was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaurants/1
  # DELETE /restaurants/1.json
  def destroy
    @restaurant.destroy
    respond_to do |format|
      format.html { redirect_to restaurants_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def restaurant_params
      params.require(:restaurant).permit(:location, :category, :price, :latitude, :longitude)
    end
end
