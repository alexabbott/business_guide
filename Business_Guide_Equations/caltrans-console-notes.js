//caltrans data console function notes for converting location data

1,ORA,R,0.78,38700,1,ORA,,4.864,ROUTE,1,ORA,,8.43,36800,1,ORA,,9.418,38500,1,ORA,,9.6,37400,1,ORA,,11.5,35500,1,ORA,,14.057,ROUTE,1,ORA,R,18.073,54600,1,ORA,R,18.446,48500,1,ORA,,19.797,49200,1,ORA,,20.37,49000,1,ORA,,21.549,38500,1,ORA,,22.09,39000,1,ORA,,23.739,38000,1,ORA,,25.89,37000,1,ORA,,29.89,44300,1,ORA,,32.721,46000,1,ORA,,33.719,41500,1,LA,,0,43000,1,LA,,1.86,27000,1,LA,,1.973,35500,1,LA,,2.751,29500,1,LA,,5.011,38000,1,LA,,6.26,35500,1,LA,,7.288,40000,1,LA,,8.266,34000,1,LA,,9.253,36800,1,LA,,10.532,44000,1,LA,,11.61,55000,1,LA,,12.171,53000,Page,AADT,1,LA,,12.523,48500,1,LA,,13.1,61000,1,LA,,14.634,43500,1,LA,,16.005,42500,1,LA,,18.09,27500,1,LA,,19.524,41500,1,LA,,21.181,52500,1,LA,,21.341,47000,1,LA,,21.919,47500,1,LA,,22.9,59000,1,LA,,23.924,67000,1,LA,,24.911,56000,1,LA,,25.924,110000,1,LA,,26.904,80500,1,LA,,27.363,37000,1,LA,,29.084,56000,1,LA,,30.163,58000,1,LA,,30.474,60000,1,LA,,31.29,65000,1,LA,,31.78,47500,1,LA,,32.166,41500,1,LA,R,34.576,61500,1,LA,,35.184,71000,1,LA,,36.11,79000,1,LA,,37.045,80000,1,LA,,39.326,60000,1,LA,,40.769,43500,1,LA,,44.121,41000,1,LA,,47.091,43000,1,LA,,47.75,36500,1,LA,,48.171,34500,["1,ORA,R,0.78,38700,", "1,ORA,,4.864,ROUTE,", "1,ORA,,8.43,36800,", "1,ORA,,9.418,38500,", "1,ORA,,9.6,37400,", "1,ORA,,11.5,35500,", "1,ORA,,14.057,ROUTE,", "1,ORA,R,18.073,54600,", "1,ORA,R,18.446,48500,", "1,ORA,,19.797,49200,", "1,ORA,,20.37,49000,", "1,ORA,,21.549,38500,", "1,ORA,,22.09,39000,", "1,ORA,,23.739,38000,", "1,ORA,,25.89,37000,", "1,ORA,,29.89,44300,", "1,ORA,,32.721,46000,", "1,ORA,,33.719,41500,", "1,LA,,0,43000,", "1,LA,,1.86,27000,", "1,LA,,1.973,35500,", "1,LA,,2.751,29500,", "1,LA,,5.011,38000,", "1,LA,,6.26,35500,", "1,LA,,7.288,40000,", "1,LA,,8.266,34000,", "1,LA,,9.253,36800,", "1,LA,,10.532,44000,", "1,LA,,11.61,55000,", "1,LA,,12.171,53000,", "Page,", "AADT,", "1,LA,,12.523,48500,", "1,LA,,13.1,61000,", "1,LA,,14.634,43500,", "1,LA,,16.005,42500,", "1,LA,,18.09,27500,", "1,LA,,19.524,41500,", "1,LA,,21.181,52500,", "1,LA,,21.341,47000,", "1,LA,,21.919,47500,", "1,LA,,22.9,59000,", "1,LA,,23.924,67000,", "1,LA,,24.911,56000,", "1,LA,,25.924,110000,", "1,LA,,26.904,80500,", "1,LA,,27.363,37000,", "1,LA,,29.084,56000,", "1,LA,,30.163,58000,", "1,LA,,30.474,60000,", "1,LA,,31.29,65000,", "1,LA,,31.78,47500,", "1,LA,,32.166,41500,", "1,LA,R,34.576,61500,", "1,LA,,35.184,71000,", "1,LA,,36.11,79000,", "1,LA,,37.045,80000,", "1,LA,,39.326,60000,", "1,LA,,40.769,43500,", "1,LA,,44.121,41000,", "1,LA,,47.091,43000,", "1,LA,,47.75,36500,", "1,LA,,48.171,34500,"]63

var data = '12 1 ORA R 0.129 DANA POINT, JCT. RTE. 5 3800 40500 37500
12 1 ORA R 0.78 DANA POINT, DOHENY PARK ROAD 3800 40500 37500 3900 42000 38700
12 1 ORA 4.864 BREAK IN ROUTE
12 1 ORA 8.43 LAGUNA BEACH, MOUNTAIN ROAD 2900 39500 36800 2900 39500 36800
12 1 ORA 9.418 LAGUNA BEACH, JCT. RTE. 133 NORTH 3050 41000 38500 3450 41000 38500
12 1 ORA 9.6 LAGUNA BEACH, CLIFF DRIVE/ ASTER STREET 3400 40000 37400 3400 40000 37400
12 1 ORA 11.5 LAGUNA BEACH, NORTH CITY LIMITS 3200 38000 35500 3200 39000 35500'

resetPostMiles();
document.getElementsByName("OutputRoute")[0].value='1';
document.getElementsByName("OutputCounty")[0].value = 'ORA';
document.getElementsByName("OutputPostmilePrefix")[0].value = 'R';
document.getElementsByName("OutputPostmile")[0].value = '0.129';
validatePostmile();
document.getElementById("lat").innerHTML;
document.getElementById("long").innerHTML;

//Functions used in the caltrans earth program
/*
resetPostMiles();
document.getElementsByName("OutputCounty")[0].value
document.getElementsByName("OutputRoute")[0].value
document.getElementsByName("OutputPostmile")[0].value
document.getElementsByName("OutputPostmilePrefix")[0].value
validatePostmile()
document.getElementById("lat").innerHTML
document.getElementById("long").innerHTML
*/

/*This is an example, which shows how to enter an address into the caltrans
earth site an get back a latitude and longitude

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
*/