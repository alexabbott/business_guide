function getTrafficRating(){

	/*Program Variables*/
	var latitude = document.getElementById('lat').value;
	var longitude = document.getElementById('lng').value;
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

	var distance = 0;
	var competitionType = [0,1];
	var positiveRating = 0;
	var negativeRating = 0;

	for(var i = 0; i < data.length-6; i+=6){
		competitionType = [0,1]
		distance = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitude,2))*500;
		competitionType[0] = Math.abs(cost.length-data[i+3][9]);
		if(data[i+5].toString().toLowerCase().indexOf(category.toString().toLowerCase()) >= 0){
			competitionType[1] = 0
		}
		if(competitionType[0] == 0 && competitionType[1] == 0){
			negativeRating+=7.5/(1+distance);
		}else if(competitionType[0] == 0 && competitionType[1] == 1){
			negativeRating+=5/(1+distance);
		}else if(competitionType[0] == 1 && competitionType[1] == 0){
			negativeRating+=2.5/(1+distance);	
		}else if(competitionType[0] == 1 && competitionType[1] == 1){
			positiveRating+=2.5/(1+distance);
		}else{
			positiveRating+=5/(1+distance);
		}
	}
	localStorage.negativeRating = negativeRating.toString();
	localStorage.positiveRating = positiveRating.toString();
}

function getRating(){
	var storeTrafficRating = getTrafficRating();
	var storeLatitude = document.getElementById('lat').value;
	var storeLongitude = document.getElementById('lng').value;
	var storeCost = document.getElementById('restaurant_price').value;
	var storeCategory = document.getElementById('restaurant_category').value;

	localStorage.trafficRating = storeTrafficRating.toString();
	localStorage.latitude = storeLatitude.toString();
	localStorage.longitude = storeLongitude.toString();
	localStorage.cost = storeCost.toString();
	localStorage.category = storeCategory.toString();
}

function displayRating(){
	getCompetitionRating();
	var trafficRating = parseInt(localStorage.trafficRating);
	var positiveRating = parseInt(localStorage.positiveRating);
	var negativeRating = parseInt(localStorage.negativeRating);
	var overallRating = 100+trafficRating+positiveRating-negativeRating;
	document.getElementsByClassName('traffic-rating')[0].innerHTML = trafficRating;
	document.getElementsByClassName('positive-rating')[0].innerHTML = positiveRating;
	document.getElementsByClassName('negative-rating')[0].innerHTML = negativeRating;
	document.getElementsByClassName('overall-rating')[0].innerHTML = overallRating;
}