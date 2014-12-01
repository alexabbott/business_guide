require "rails_helper"
require "shoulda/matchers"

describe Restaurant do

  	it { should ensure_length_of(:location).is_at_most(255)}
  	it { should ensure_length_of(:location).is_at_least(1)}

	it { should validate_presence_of(:category) }
	it { should validate_presence_of(:price) }

  	it { should belong_to(:user) }

end