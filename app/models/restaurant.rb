class Restaurant < ActiveRecord::Base
	belongs_to :user
	validates_length_of :location, minimum: 1, maximum: 255
	validates_presence_of :category
	validates_presence_of :price
end
