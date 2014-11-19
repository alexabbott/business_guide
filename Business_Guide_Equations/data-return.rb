checker = 0
line_number = 0

new_line = 1
route = 2
county = 
route_index = 0
county_index = 1
prefix_index = 2
postmile_index = 3
line_number = 0
output = [[],[],[],[]]

data = '12 1 ORA R 0.129 DANA POINT, JCT. RTE. 5 3800 40500 37500
12 12 ORA R 0.78 DANA POINT, DOHENY PARK ROAD 3800 40500 37500 3900 42000 38700
12 13 ORA 4.864 BREAK IN ROUTE
12 14 ORA 8.43 LAGUNA BEACH, MOUNTAIN ROAD 2900 39500 36800 2900 39500 36800
12 15 ORA 9.418 LAGUNA BEACH, JCT. RTE. 133 NORTH 3050 41000 38500 3450 41000 38500
12 16 ORA 9.6 LAGUNA BEACH, CLIFF DRIVE/ ASTER STREET 3400 40000 37400 3400 40000 37400
12 17 ORA 11.5 LAGUNA BEACH, NORTH CITY LIMITS 3200 38000 35500 3200 39000 35500'

ascii_data = data.bytes
data_length = ascii_data.length

data_length.times do |i|

	if(checker == route && ascii_data[i] == 32)
		output[route_index].push(',')
		checker = county
	elsif(checker == route)
		output[route_index].push(ascii_data[i].chr)
	end	
	if(checker == new_line && ascii_data[i] == 32)
		checker = route
	end	
	if(ascii_data[i] == 10)
		checker = new_line
		line_number += 1
	end
end
print output[route_index].join()
