require "rails_helper"

require 'shoulda/matchers'

describe Restaurant do

	it { should validate_presence_of(:address) }

	it { should ensure_length_of(:address).is_at_most(255)}

	it { should validate_presence_of(:category) }

	it { should validate_presence_of(:price) }

	it { should belong_to(:user) }

end