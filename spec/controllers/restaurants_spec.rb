
require "rails_helper"

describe RestaurantsController, :type => :controller do
  let :valid_attributes do
    {
      email: "lakdjslfkj@lkajds.com",
      password: "alkdsfjlk"
    }
  end

  it "responds successfully with an HTTP 200 status code" do

     get :new

     expect(response).to be_success
     expect(response).to have_http_status(200)

  end

  it "renders the new template" do 
  	get :new
  	expect(response).to render_template("new")
  end

  it "responds successfully with an HTTP 200 status code" do
  	get :index
  	expect(response).to be_success
     expect(response).to have_http_status(200)
end

	it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end

describe "GET show" do
  before do
    @user = User.create! valid_attributes
    get :show, id: @user.id
  end
  it "should render the index template" do
     expect(response).to render_template :show
      end

      it "should succeed" do
        expect(response).to be_success
      end

      it "should assign user" do
        expect(assigns(:user)).to eq(@user)
      end
  end




	
end