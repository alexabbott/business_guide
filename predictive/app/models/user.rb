class User < ActiveRecord::Base
	validates_uniqueness_of :email
   	validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
   	validates_length_of :email, maximum: 255
   	validates_length_of :password, minimum: 6, maximum: 20

   	has_many :restaurants
end