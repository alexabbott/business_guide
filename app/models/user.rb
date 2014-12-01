class User < ActiveRecord::Base
	include ActiveModel::SecurePassword
	
	has_many :restaurants

	validates_presence_of :email,:password
	validates_uniqueness_of :email
   	validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
   	validates_length_of :email, maximum: 255
   	validates_length_of :password, minimum: 6, maximum: 20

   	has_secure_password
end
