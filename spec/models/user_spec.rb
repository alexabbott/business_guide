require "rails_helper"

require "shoulda/matchers"


    require "rails_helper"

describe User do


	it { should validate_uniqueness_of(:email) }

    ## validate that a string like 'a@a.com' is 
    #  accepted as an email
    it do
      should allow_value('a@a.com').
                 for(:email)
    end

    ## this one is slightly tricky becuase there
    #  isn't a not_allow_value matcher,
    #  so we need to use !
    #  this verifies that 'bob' is not accepted
    #  as a vaild email
    it do
      should !allow_value('bob').
                 for(:email)
    end


    #test both min and max validation attributes are present
    # it { should ensure_length_of(:password_digest).is_at_least(6) }

    # it { should ensure_length_of(:password_digest).is_at_most(20)}

    it { should ensure_length_of(:email).is_at_most(255)}

    it { should have_many(:restaurants) }




end