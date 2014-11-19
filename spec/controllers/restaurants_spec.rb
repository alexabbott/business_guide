
require "rails_helper"

describe RestaurantsController, :type => :controller do

  it "should get page for new" do

     get :new

     expect(response).to be_success
     expect(response).to have_http_status(200)

  end
end