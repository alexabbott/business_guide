function getTrafficRating(){
	
	/*Adjustable Variables*/
	// var distanceCoefficients = [];				//Array of distance coefficients
	// var categoryPriceCompetition = [0,9,2,0];	//Competition with the same category and price
	// var priceCompetition = [0,6,1,0];			//Competition with the same price range but different category
	// var categoryCompetition = [0,0,0,0];		//Competition with the same category but different price range
	// var complementaryEstabishment = [0,-3,1,0]; //Establishments with a different category and price rage

	/*Program Variables*/
	var latitude = document.getElementById('lat').value;
	var longitude = document.getElementById('lng').value;
	var output = 0;

	// /*Nameing Variables Do Not Change*/
	// var samePriceAndCategory = 0;
	// var samePriceOnly = 1;
	// var sameCategoryOnly = 2;
	// var differentPriceAndCategory = 3;
	// var lati = 0;
	// var lngi = 1;
	// var pricei = 2;
	// var cati = 3;

	/*Temporary*/
	// var restaurant = 0;
	// var coffeeShop = 1;
	// var est = [];
	// est.push([34.025787,-118.483277,2,'$']);
	// est.push([34.023690,-118.492328,2,'$']);
	// est.push([34.028597,-118.486277,2,0]);
	// est.push([34.029111,-118.486358,1,0]);
	// est.push([34.020216,-118.496283,2,0]);
	// est.push([34.023857,-118.492100,2,0]);
	// est.push([34.016630,-118.491290,2,0]);
	// est.push([34.016828,-118.494929,1,1]);
	// est.push([34.023823,-118.483193,1,1]);
	// est.push([34.032964,-118.480940,1,1]);

	// distanceCoefficients.push(
	// 	categoryPriceCompetition,
	// 	priceCompetition,
	// 	categoryCompetition,
	// 	complementaryEstabishment);

	// rate = function(lat,lng,cost,category){
		// var latitude = lat;
		// var longitude = lng;
		var rating = 0;
		var distance = 0;
	//	var competitionType = 0;
		var trafficData = findRoutes(latitude,longitude);
		var trafficRating = 0;

		var trafficDistance = 0;
		var trafficVolume = 3;

		for(var i = 0; i < trafficData.length; i++){
			if(trafficData[i][trafficDistance] < 10){
				trafficRating+=(trafficData[i][3]*(trafficData.length-i))/((1+trafficData[i][0])*100000);
			}
		}
		// for(var i = 0; i < est.length; i++){
		// 	distance = Math.sqrt(Math.pow(est[i][lati]-latitude,2)+Math.pow(est[i][lngi]-longitude,2));
		// 	if(est[i][pricei] == cost && est[i][cati] == category){
		// 		competitionType = samePriceAndCategory;
		// 	}else if(est[i][pricei] == cost){
		// 		competitionType = samePriceOnly;
		// 	}else if(est[i][cati] == category){
		// 		competitionType = sameCategoryOnly;
		// 	}else{
		// 		competitionType = differentPriceAndCategory;
		// 	}
		// 	rating -= distanceCoefficients[competitionType][0]
		// 	rating -= distanceCoefficients[competitionType][1]*Math.pow(distance,(-1));
		// 	rating -= distanceCoefficients[competitionType][2]*Math.pow(distance,(-2));
		// 	rating -= distanceCoefficients[competitionType][3]*Math.pow(distance,(-3));
		// }
		rating = rating/10000;
		return trafficRating;
	// };
	// output = (rate(latitude,longitude,0,0));
	// localStorage.setItem('rating', output.toString());
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
//		alert(distance);
	}
	if(competitionType[0] == 0 && competitionType[1] == 0){
		
	}
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