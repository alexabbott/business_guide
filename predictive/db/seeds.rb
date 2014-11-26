# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Restaurant.create([{address: '600 S. Spring Street, Los Angeles, CA 90014, USA', category: 'Chinese', price: '$'}, {address: '2783 Doresta Road, San Marino, CA 91108, USA', category:'Italian', price:'$$'}])

User.create([{email: 'alex.r.abbott@gmail.com', password: 'Alexa123'}])