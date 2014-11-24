class Restaurant < ActiveRecord::Base
	validates_presence_of :address
	validates_length_of :address, maximum: 255
	validates_presence_of :category
	validates_presence_of :price

	belongs_to :user
end