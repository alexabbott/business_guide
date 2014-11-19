//caltrans data console function notes for converting location data

var data = '12 1 ORA R 0.129 DANA POINT, JCT. RTE. 5 3800 40500 37500
12 1 ORA R 0.78 DANA POINT, DOHENY PARK ROAD 3800 40500 37500 3900 42000 38700
12 1 ORA 4.864 BREAK IN ROUTE
12 1 ORA 8.43 LAGUNA BEACH, MOUNTAIN ROAD 2900 39500 36800 2900 39500 36800
12 1 ORA 9.418 LAGUNA BEACH, JCT. RTE. 133 NORTH 3050 41000 38500 3450 41000 38500
12 1 ORA 9.6 LAGUNA BEACH, CLIFF DRIVE/ ASTER STREET 3400 40000 37400 3400 40000 37400
12 1 ORA 11.5 LAGUNA BEACH, NORTH CITY LIMITS 3200 38000 35500 3200 39000 35500'

for(var i = 0; i < data.length; i++){
	if(data.charCodeAt(i) == 10){
		alert(i)
	}
}

document.getElementsByName("OutputCounty")[0].value = 'ORA';
document.getElementsByName("OutputRoute")[0].value='5';
document.getElementsByName("OutputPostmile")[0].value = '0';
document.getElementsByName("OutputPostmilePrefix")[0].value = 'R';
validatePostmile();
document.getElementById("lat").innerHTML;
document.getElementById("long").innerHTML;



//Functions
document.getElementsByName("OutputCounty")[0].value
document.getElementsByName("OutputRoute")[0].value
document.getElementsByName("OutputPostmile")[0].value
document.getElementsByName("OutputPostmilePrefix")[0].value
validatePostmile()
document.getElementById("lat").innerHTML
document.getElementById("long").innerHTML

/*This is an example, which shows how to enter an address into the caltrans
earth site an get back a latitude and longitude*/

//Set county to orange county
document.getElementsByName("OutputCounty")[0].value = 'ORA'

//Set value of route to 1
document.getElementsByName("OutputRoute")[0].value='1'

//Set value of postmile to 0.129
document.getElementsByName("OutputPostmile")[0].value = '0.129'

//Set value of postmile prefix to R
document.getElementsByName("OutputPostmilePrefix")[0].value = 'R'

//Enter postmile address, returns a latitude and longitude 
validatePostmile()

//Displays a latitude value
document.getElementById("lat").innerHTML

//Displays a longitude value
document.getElementById("long").innerHTML