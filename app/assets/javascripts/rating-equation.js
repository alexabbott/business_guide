function getTrafficRating(lat, lng){
	/*Program Variables*/
	var latitude = lat;
	var longitude = lng;
	var output = 0;

	var rating = 0;
	var distance = 0;
	var trafficData = findRoutes(latitude,longitude);
	var trafficRating = 0;

	var trafficDistance = 0;
	var trafficVolume = 3;

	for(var i = 0; i < trafficData.length; i++){
		if(trafficData[i][trafficDistance] < 10){
			trafficRating+=(trafficData[i][3]*(trafficData.length-i))/((1+trafficData[i][0])*100000);
		}
	}
	rating = rating/10000;
	return trafficRating;
}

function getCompetitionRating(){
	/*Program Variables*/
	var data = document.getElementById('factual-data').innerHTML.toString().split('|');
	var latitude = localStorage.latitude;
	var longitude = localStorage.longitude;
	var cost = localStorage.cost;
	var category = localStorage.category;

	var latitudeN = parseFloat(latitude)+0.002;
	var latitudeS = parseFloat(latitude)-0.002;
	var longitudeE = parseFloat(longitude)+0.002;
	var longitudeW = parseFloat(longitude)-0.002;	

	var competitionType = [0,1];
	var costPossibilities = [];
	var distance = [];
	var positiveRating = [];
	var negativeRating = [];
	var distanceSize = 9;
	var costRange = 4;
	var categorySize = 10;
	for(var i = 0; i < distanceSize; i++){
		distance.push(0);
		positiveRating.push(0);
		negativeRating.push(0);
	}
	for(var i = 0; i < costRange; i++){
		positiveRating.push(0);
		negativeRating.push(0);
		costPossibilities.push(i+1);
	}	
	for(var i = 0; i < data.length-6; i+=6){
		competitionType = [0,1]
		distance[0] = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitude,2))*500;
		distance[1] = Math.sqrt(Math.pow(data[i+1]-latitudeN,2)+Math.pow(data[i+2]-longitude,2))*500;
		distance[2] = Math.sqrt(Math.pow(data[i+1]-latitudeN,2)+Math.pow(data[i+2]-longitudeE,2))*500;
		distance[3] = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitudeE,2))*500;
		distance[4] = Math.sqrt(Math.pow(data[i+1]-latitudeS,2)+Math.pow(data[i+2]-longitudeE,2))*500;
		distance[5] = Math.sqrt(Math.pow(data[i+1]-latitudeS,2)+Math.pow(data[i+2]-longitude,2))*500;
		distance[6] = Math.sqrt(Math.pow(data[i+1]-latitudeS,2)+Math.pow(data[i+2]-longitudeW,2))*500;
		distance[7] = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitudeW,2))*500;
		distance[8] = Math.sqrt(Math.pow(data[i+1]-latitudeN,2)+Math.pow(data[i+2]-longitudeW,2))*500;
		competitionType[0] = Math.abs(cost.length-data[i+3][9]);
		if(data[i+5].toString().toLowerCase().indexOf(category.toString().toLowerCase()) >= 0){
			competitionType[1] = 0;
		}
		for(var j = 0; j < distance.length; j++){
			if(competitionType[0] == 0 && competitionType[1] == 0){
				negativeRating[j]+=7.5/(1+distance[j]);
			}else if(competitionType[0] == 0 && competitionType[1] == 1){
				negativeRating[j]+=5/(1+distance[j]);
			}else if(competitionType[0] == 1 && competitionType[1] == 0){
				negativeRating[j]+=2.5/(1+distance[j]);	
			}else if(competitionType[0] == 1 && competitionType[1] == 1){
				positiveRating[j]+=2.5/(1+distance[j]);
			}else{
				positiveRating[j]+=5/(1+distance[j]);
			}
		}
 		for(var j = distance.length; j < distance.length+costPossibilities.length; j++){
 			competitionType[0] = Math.abs(costPossibilities[j-distance.length]-data[i+3][9]);
			if(competitionType[0] == 0 && competitionType[1] == 0){
				negativeRating[j]+=7.5/(1+distance[0]);
			}else if(competitionType[0] == 0 && competitionType[1] == 1){
				negativeRating[j]+=5/(1+distance[0]);
			}else if(competitionType[0] == 1 && competitionType[1] == 0){
				negativeRating[j]+=2.5/(1+distance[0]);	
			}else if(competitionType[0] == 1 && competitionType[1] == 1){
				positiveRating[j]+=2.5/(1+distance[0]);
			}else{
				positiveRating[j]+=5/(1+distance[0]);
			}
 		}
	}
	localStorage.negativeRating = JSON.stringify(negativeRating);
	localStorage.positiveRating = JSON.stringify(positiveRating);
}

function getRating(){
	var latitude = document.getElementById('lat').value;
	var longitude = document.getElementById('lng').value;
	var cost = document.getElementById('restaurant_price').value;
	var category = document.getElementById('restaurant_category').value;

	var latitudeNorth = parseFloat(latitude)+0.002;
	var latitudeSouth = parseFloat(latitude)-0.002;
	var longitudeEast = parseFloat(longitude)+0.002;
	var longitudeWest = parseFloat(longitude)-0.002;	

	var storeTrafficRating = [];

	storeTrafficRating.length = 9;
	storeTrafficRating[0] = getTrafficRating(latitude, longitude);
	storeTrafficRating[1] = getTrafficRating(latitudeNorth, longitude);
	storeTrafficRating[2] = getTrafficRating(latitudeNorth, longitudeEast);
	storeTrafficRating[3] = getTrafficRating(latitude, longitudeEast);
	storeTrafficRating[4] = getTrafficRating(latitudeSouth, longitudeEast);
	storeTrafficRating[5] = getTrafficRating(latitudeSouth, longitude);
	storeTrafficRating[6] = getTrafficRating(latitudeSouth, longitudeWest);
	storeTrafficRating[7] = getTrafficRating(latitude, longitudeWest);
	storeTrafficRating[8] = getTrafficRating(latitudeNorth, longitudeWest);

	localStorage.trafficRating = JSON.stringify(storeTrafficRating);
	localStorage.latitude = latitude.toString();
	localStorage.longitude = longitude.toString();
	localStorage.cost = cost.toString();
	localStorage.category = category.toString();
}

function displayRating(){
	getCompetitionRating();
	var trafficRating = JSON.parse(localStorage.trafficRating);	
	var positiveRating = JSON.parse(localStorage.positiveRating);
	var negativeRating = JSON.parse(localStorage.negativeRating);
	var cost = localStorage.cost.length;
	var costRange = 4;
	var offsetRating = [];
	var highestRating = 0;
	var overallRating = [];
	var recommendation = [0,0];
	var recommendStart = 'Consider choosing a location to the ';
	var d = ['north', 'south', 'east', 'west'];
	var recommendLocation = [0, d[0], d[0]+d[2], d[2], d[1]+d[2], d[1], d[1]+d[3], d[3], d[0]+d[3]];
	var recommendEnd = ' to improve your rating.';
	var recommendCenter = 'You have selected an ideal location for this type of business.'
	var recommendIndex = 0;

	var recommendPriceStart = 'If you change to ';
	var recommendPrice = ['an inexpensive', 'a moderate', 'a expensive', 'a very expensive'];
	var recommendPriceEnd = ' price range, you will have less competition.';
	var recommendCurrentPrice = 'You have selected an ideal price range for this location';
	var recommendPriceIndex = 0;

	for(var i = 0; i < costRange; i++){
		offsetRating[i] = 150-50*i;
		if(i == costRange-1){
			offsetRating[i]-=25;
		}
	}
	for(var i = 0; i < positiveRating.length; i++){
		if(i < trafficRating.length){
			overallRating.push(offsetRating[cost]+trafficRating[i]+positiveRating[i]-negativeRating[i]);
		}else{
			var n = i-trafficRating.length;
			overallRating.push(offsetRating[n]+trafficRating[0]+positiveRating[i]-negativeRating[i]);			
		}
	}
	for(i = 0; i < trafficRating.length; i++){
		if(overallRating[i] > highestRating){
			highestRating = overallRating[i];
			recommendIndex = i;
		}
	}
	highestRating = 0;
	for(i = trafficRating.length; i < positiveRating.length; i++){
		if(overallRating[i] > highestRating){
			highestRating = overallRating[i];
			recommendPriceIndex = i-trafficRating.length;
		}		
	}
	console.log(recommendPriceIndex);
	console.log(i-trafficRating.length);
	console.log(cost);
	if(recommendIndex){
		recommendation[0] = recommendStart+recommendLocation[recommendIndex]+recommendEnd;
	}else{
		recommendation[0] = recommendCenter;
	}
	if(recommendPriceIndex == cost){
		recommendation[1] = recommendCurrentPrice;
	}else{
		recommendation[1] = recommendPriceStart+recommendPrice[recommendPriceIndex]+recommendPriceEnd;
	}
	console.log(overallRating);
	document.getElementsByClassName('traffic-rating')[0].innerHTML = Math.round(trafficRating[0]);
	document.getElementsByClassName('positive-rating')[0].innerHTML = Math.round(positiveRating[0]);
	document.getElementsByClassName('negative-rating')[0].innerHTML = Math.round(negativeRating[0]);
	document.getElementsByClassName('overall-rating')[0].innerHTML = Math.round(overallRating[0]);
	for(var i = 0; i < 2; i++){
		document.getElementsByClassName('recommendation')[i].innerHTML = recommendation[i];
	}

}