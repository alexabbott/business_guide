/* Traffic volume data array */
/* By Brian Cottrell	     */
/* 12-11-2014      		     */
//Los Angeles county
//Every third element begans a new point
//For each point the first element is latitude
//The second element is longitude
//The third population density
var data = [34.2610,-118.2853,37,

37.8934,-120.5382,300];
/*This is needed to sort nearest routes numberically instead of alphebetically*/
function sortNumber(a, b) {
    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
};
/*Find the nearest population density blocks to a specified location*/
function findBlocks(lat, lng){
	var count = 100;				//Uses only the nearest population density points
	var nearest = [];				//Stores the nearest population density points
	for(var i = 0; i < count; i++){	//Set up the nearest array
		nearest.push([9999,0,0,0]);	//By setting the initial distance very great
	}								//The distance will be replace by actual data
	//For every point in the population density list
	for(var i = 0; i < data.length; i+=3){
		//Calculate the distance
		distance = Math.sqrt(Math.pow(data[i]-lat,2)+Math.pow(data[i+1]-lng,2))*50;
		//If the distance is less than that of the last nearest point
		if (distance < nearest[nearest.length-1][0]){
			distance = Math.round(distance*1000)/1000;
			//Add the point to the nearest array
			nearest[nearest.length-1] = [distance, data[i], data[i+1], data[i+2]];
			//Sort the nearest array so the furthest point is in the last position
			nearest.sort(sortNumber);
		}
	}
	//return an array with information about the nearest population density blocks
	return nearest;
};