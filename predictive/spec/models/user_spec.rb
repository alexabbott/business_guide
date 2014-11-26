require "rails_helper"

require 'shoulda/matchers'

describe User do
	it { should validate_uniqueness_of(:email) }

	 it do
      should allow_value('a@a.com').
                 for(:email)
    end

    it do
      should !allow_value('bob').
                 for(:email)
    end

    it { should ensure_length_of(:password).is_at_least(6) }

    it { should ensure_length_of(:password).is_at_most(20)}

    it { should ensure_length_of(:email).is_at_most(255)}

    it { should have_many(:restaurants) }
end