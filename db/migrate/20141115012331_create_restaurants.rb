class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :location
      t.string :category
      t.string :price

      t.timestamps
    end
  end
end
