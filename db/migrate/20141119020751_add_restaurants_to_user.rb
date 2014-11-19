class AddRestaurantsToUser < ActiveRecord::Migration
  def self.up
    add_column :restaurants, :user_id, :integer
    add_index 'restaurants', ['user_id'], :name => 'index_user_id'
  end

  def self.down
    remove_column :restaurants, :user_id
  end
end
