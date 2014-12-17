require "rails_helper"

describe UsersController, :type => :controller do 
	let :valid_attributes do
    {
      email: "lakdjslfkj@lkajds.com",
      password: "alkdsfjlk",
      password_confirmation: "alkdsfjlk"
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

describe "GET edit" do
	    before do
	      @user = User.create! valid_attributes
	      get :edit, id: @user.id
	    end

	    it "should render the edit " do
	      expect(response).to render_template :edit
	      expect(response).to be_success
	    end

	    it "should assigns froyo" do
	      expect(assigns(:user)).to eq(@user)
	    end
	end

describe "PUT update" do
	    before do
	      @user = User.create! valid_attributes
	    end

	    describe "with successful update" do

	      before do
	        put :update, id: @user.id, user: update_attributes
	      end

	      it "should redirect to the index of all users" do
	        expect(response).to redirect_to users_path
	      end
	    end

	    
	    end
	describe "DELETE user" do
		before do
		  @user = User.create! valid_attributes
		end

		it "should delete a record from the database" do
		  expect do
		    delete :destroy, id: @user.id
		  end.to change(User, :count).by(-1)
		end

		it "should redirect to the index of all users" do
		  delete :destroy, id: @user.id
		  expect(response).to redirect_to users_path
		end
	end

	end

