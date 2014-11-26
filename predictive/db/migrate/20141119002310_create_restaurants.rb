class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|

    	t.string :address
    	t.string :category
    	t.string :price

    	t.timestamps null: false
    end
  end
end
