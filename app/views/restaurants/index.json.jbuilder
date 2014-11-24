json.array!(@restaurants) do |restaurant|
  json.extract! restaurant, :id, :location, :category, :price
  json.url restaurant_url(restaurant, format: :json)
end
