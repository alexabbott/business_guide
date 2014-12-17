/* Rating Equations          */
/* By Brian Cottrell	     */
/* 11-27-2014      		     */
/*This function returns the traffic component of the rating for a given location*/
function getTrafficRating(lat, lng){
	/*Variables*/
	var latitude = lat;			//Latitude of selected location
	var longitude = lng;		//Longitude of selected location
	var trafficRating = 0;		//Stores the traffic rating for the selected location
	//Returns an array with information about the nearest ten traffic count points
	var trafficData = findRoutes(latitude,longitude);
	//The traffic data array contains inner arrays for each traffic count point
	var trafficDistance = 0;	//Each element 0 gives the distance from the selected location
	var trafficLatitude = 1;	//Each element 1 gives the latitude of the traffic count point
	var trafficLongitude = 2;	//Each element 2 gives the longitude of the traffic count point
	var trafficVolume = 3;		//Each element 3 gives average daily traffic volume
	/*Program*/
	//For each element in the traffic data array
	for(var i = 0; i < trafficData.length; i++){
		//Make sure the traffic point isn't too far from the selected location
		if(trafficData[i][trafficDistance] < 10){
			//Update the traffic rating based of traffic volume and distance to the point
			trafficRating+=(trafficData[i][3]*(trafficData.length-i))/((1+trafficData[i][0])*100000);
			//The closest points contribute more to the traffic rating
		}
	}
	return trafficRating;		//Returns a rating based on traffic volume data
};
/*This function returns the population density component of the rating for a given location*/
function getDensityRating(lat, lng){
	/*Variables*/
	var latitude = lat;			//Latitude of selected location
	var longitude = lng;		//Longitude of selected location
	var densityRating = 0;		//Stores the density rating for the selected location
	//Returns an array with information about the nearest hundred population density points
	var densityData = findBlocks(latitude,longitude);
	/*Program*/
	//For each element in the population density array
	for(var i = 0; i < densityData.length; i++){
		//Make sure the density point isn't too far from the selected location
		if(densityData[i][0] < 10){
			//Update the density rating based of traffic volume and distance to the point
			densityRating+=(densityData[i][3])/((1+densityData[i][0])*100000);
			//The closest points contribute more to the population density rating
		}
	}
	return densityRating;		//Returns a rating based on population density data
};
/*This function returns a competition component of the rating based on surrounding businesses*/
function getCompetitionRating(){
	/*Variables*/
	//Returns information about the nearest businesses in the form of a single array
	var data = document.getElementById('factual-data').innerHTML.toString().split('|');
	var latitude = localStorage.latitude; 	//Gets the selected latitude from local storage
	var longitude = localStorage.longitude; //Gets the selected longititude from local storage
	var cost = localStorage.cost; 			//Gets the selected cost from local storage
	var category = localStorage.category; 	//Gets the selected category from local storage
	var distanceOffset = 0.002;				//The distance offset represents about one block
	//The following give locations a specified distance to the selected location in each direction
	var latitudeN = parseFloat(latitude)+distanceOffset;
	var latitudeS = parseFloat(latitude)-distanceOffset;
	var longitudeE = parseFloat(longitude)+distanceOffset;
	var longitudeW = parseFloat(longitude)-distanceOffset;	
	var competitionType = [0,1];	//Stores the competition type of each entry in data
	var costPossibilities = [];		//Stores information to evaluate each possible price range
	var distance = [];				//Stores the distace of each location to evaluate
	var positiveRating = [];		//Lists all of the positive components to the overall rating
	var negativeRating = [];		//Lists all of the negative components to the overall rating
	var distanceRange = 9;			//Elavuate 9 total locations
	var costRange = 4;				//Elavuate 4 total price ranges
	var distanceCostLength = distanceRange+costRange;
	//Lists all of the categories to evaluate
	var categories = ['american', 'bar', 'bbq', 'breakfast', 'burgers', 'cafe', 'chinese', 'dessert', 
					'diner', 'french', 'indian', 'italian', 'japanese', 'mediterranean', 'mexican', 
					'sandwiches', 'salads', 'seafood', 'steakhouse'];
	var totalLength = distanceRange+costRange+categories.length;
	//Initialize the array of possible price ranges
	for(var i = 0; i < costRange; i++){
		costPossibilities.push(i+1);
	}
	//Initialize the array of locations to evaluate
	for(var i = 0; i < distanceRange; i++){
		distance.push(0);
	}
	//The competition rating arrays will include information about all possibilties
	for(var i = 0; i < totalLength; i++){
		positiveRating.push(0);
		negativeRating.push(0);
	}
	//For each surrounding business in the data array
	for(var i = 0; i < data.length-6; i+=6){	//Each business has 6 array elements
		competitionType = [0,1]					//Reset the competition type array
		//Calculate the distance to each location to evaluate
		distance[0] = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitude,2))*500;
		distance[1] = Math.sqrt(Math.pow(data[i+1]-latitudeN,2)+Math.pow(data[i+2]-longitude,2))*500;
		distance[2] = Math.sqrt(Math.pow(data[i+1]-latitudeN,2)+Math.pow(data[i+2]-longitudeE,2))*500;
		distance[3] = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitudeE,2))*500;
		distance[4] = Math.sqrt(Math.pow(data[i+1]-latitudeS,2)+Math.pow(data[i+2]-longitudeE,2))*500;
		distance[5] = Math.sqrt(Math.pow(data[i+1]-latitudeS,2)+Math.pow(data[i+2]-longitude,2))*500;
		distance[6] = Math.sqrt(Math.pow(data[i+1]-latitudeS,2)+Math.pow(data[i+2]-longitudeW,2))*500;
		distance[7] = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitudeW,2))*500;
		distance[8] = Math.sqrt(Math.pow(data[i+1]-latitudeN,2)+Math.pow(data[i+2]-longitudeW,2))*500;
		//Compare the selected price range to that of the current surrounding business
		competitionType[0] = Math.abs(cost.length-data[i+3][9]);
		//Check if the selected category is in the category list of the current surrounding business
		if(data[i+5].toString().toLowerCase().indexOf(category.toString().toLowerCase()) >= 0){
			competitionType[1] = 0;
		}
		//Adjust the competition ratings based on the competition type of the surrounding business
		//For each location in the array of locations to evaluate
		for(var j = 0; j < distance.length; j++){
			//similar businesses contribute to the negative competition rating
			if(competitionType[0] == 0 && competitionType[1] == 0){
				//Rating adjustments are based on both competition type and distance
				negativeRating[j]+=7.5/(1+distance[j]);
			}else if(competitionType[0] == 0 && competitionType[1] == 1){
				negativeRating[j]+=5/(1+distance[j]);
			}else if(competitionType[0] == 1 && competitionType[1] == 0){
				negativeRating[j]+=2.5/(1+distance[j]);
			//disimilar businesses contribute to the positive competition rating
			}else if(competitionType[0] == 1 && competitionType[1] == 1){
				positiveRating[j]+=2.5/(1+distance[j]);
			}else{
				positiveRating[j]+=5/(1+distance[j]);
			}
		}
		//For each possible price and category in the array of possibilities to evaluate
 		for(var j = distance.length; j < totalLength; j++){
 			if(j < distanceCostLength){
 				//Adjust the competition type for each possible price range
 				competitionType[0] = Math.abs(costPossibilities[j-distance.length]-data[i+3][9]);
 			}
 			else{
 				//Adjust the competition type for each possible category
 				competitionType = [Math.abs(cost.length-data[i+3][9]),1];
 				//Check each category is in the category list of the current surrounding business
				if(data[i+5].toString().toLowerCase().indexOf(categories[j-distanceCostLength]) >= 0){
					competitionType[1] = 0;
				} 				
 			}
 			//similar businesses contribute to the negative competition rating
			if(competitionType[0] == 0 && competitionType[1] == 0){
				//Rating adjustments are based on both competition type and distance
				negativeRating[j]+=7.5/(1+distance[0]);
			}else if(competitionType[0] == 0 && competitionType[1] == 1){
				negativeRating[j]+=5/(1+distance[0]);
			}else if(competitionType[0] == 1 && competitionType[1] == 0){
				negativeRating[j]+=2.5/(1+distance[0]);
			//disimilar businesses contribute to the positive competition rating
			}else if(competitionType[0] == 1 && competitionType[1] == 1){
				positiveRating[j]+=2.5/(1+distance[0]);
			}else{
				positiveRating[j]+=5/(1+distance[0]);
			}
 		}
	}
	//Story each competition rating array to the browser for use in other functions
	localStorage.negativeRating = JSON.stringify(negativeRating);
	localStorage.positiveRating = JSON.stringify(positiveRating);
};
/*This function takes traffic rating information and stores it to the browser for later use*/
function getRating(){
	//Take in form data selected by the user from embedded ruby elements
	var latitude = document.getElementById('lat').value;	//latitude contained in a hidden field
	var longitude = document.getElementById('lng').value;	//longitude contained in a hidden field
	var cost = document.getElementById('restaurant_price').value;
	var category = document.getElementById('restaurant_category').value;
	var distanceOffset = 0.002;								//This represents about one block
	//Get a traffic rating for each of the following locations
	var latitudeNorth = parseFloat(latitude)+distanceOffset;
	var latitudeSouth = parseFloat(latitude)-distanceOffset;
	var longitudeEast = parseFloat(longitude)+distanceOffset;
	var longitudeWest = parseFloat(longitude)-distanceOffset;	
	var storeTrafficRating = [];							//Stores the calculated traffic ratings
	storeTrafficRating.length = 9;							//9 total locations to evaluate
	//Find the traffic rating at each location and add it to the array
	storeTrafficRating[0] = getTrafficRating(latitude, longitude);
	storeTrafficRating[1] = getTrafficRating(latitudeNorth, longitude);
	storeTrafficRating[2] = getTrafficRating(latitudeNorth, longitudeEast);
	storeTrafficRating[3] = getTrafficRating(latitude, longitudeEast);
	storeTrafficRating[4] = getTrafficRating(latitudeSouth, longitudeEast);
	storeTrafficRating[5] = getTrafficRating(latitudeSouth, longitude);
	storeTrafficRating[6] = getTrafficRating(latitudeSouth, longitudeWest);
	storeTrafficRating[7] = getTrafficRating(latitude, longitudeWest);
	storeTrafficRating[8] = getTrafficRating(latitudeNorth, longitudeWest);
	//Store the array of traffic ratings to use when determining the overall ratings
	localStorage.trafficRating = JSON.stringify(storeTrafficRating);
	//Store a population density for the selected location
	localStorage.densityRating = JSON.stringify(getDensityRating(latitude, longitude));
	localStorage.latitude = latitude.toString();			//Store the selected latitude
	localStorage.longitude = longitude.toString();			//Store the selected longitude
	localStorage.cost = cost.toString();			    	//Store the selected cost
	localStorage.category = category.toString();		    //Store the selected category
};
/*This fuction combines all of the calculated ratings and adds them to the website*/
function displayRating(){
	getCompetitionRating();			//Generates and stores both competition ratings
	//Retrieves all of the rating arrays from browser storage
	var trafficRating = JSON.parse(localStorage.trafficRating);	
	var positiveRating = JSON.parse(localStorage.positiveRating);
	var negativeRating = JSON.parse(localStorage.negativeRating);
	//Retrieves the cost selected by the user from browser storage
	var cost = localStorage.cost.length;	
	var costRange = 4;				//Gives the number of possible price ranges
	var offsetRating = [];			//Stores a base rating depending of type of business selected
	var highestRating = 0;			//Stored the highest current rating for comparison functions
	var overallRating = [];			//Stores an array of overall ratings
	var recommendation = [0,0,0];	//Stores the recommendation text
	//Variables for assembling the location recommendation text
	var recommendStart = 'Consider choosing a location to the ';
	var d = ['north', 'south', 'east', 'west'];
	var recommendLocation = [0, d[0], d[0]+d[2], d[2], d[1]+d[2], d[1], d[1]+d[3], d[3], d[0]+d[3]];
	var recommendEnd = ' to improve your rating.';
	var recommendCenter = 'You have selected an ideal location for this type of business.'
	var recommendIndex = 0;
	//Variables for assembling the price range recommendation text
	var recommendPriceStart = 'If you change to ';
	var recommendPrice = ['an inexpensive', 'a moderate', 'a expensive', 'a very expensive'];
	var recommendPriceEnd = ' price range, you will have less competition.';
	var recommendCurrentPrice = 'You have selected an ideal price range for this location';
	var recommendPriceIndex = 0;
	//Variables for assembling the category recommendation text
	var recommendCategory = [];
	var recommendCategoryStart = 'The least competitive categories for your location are';
	var categories = ['american', 'bar', 'bbq', 'breakfast', 'burgers', 'cafe', 'chinese', 'dessert', 
					'diner', 'french', 'indian', 'italian', 'japanese', 'mediterranean', 'mexican', 
					'sandwiches', 'salads', 'seafood', 'steakhouse'];	
	//The base rating is determined by the price range setting
	for(var i = 0; i < costRange; i++){		//For each possible price range
		offsetRating[i] = 150-50*i;			//Higher price range settings have a lower base rating
		if(i == costRange-1){				//If the higest price range is selected
			offsetRating[i]-=25;			//Further reduce the base rating
		}
		//Add population density rating to all overall ratings
		offsetRating[i]+=JSON.parse(localStorage.densityRating);
	}
	//Calculate the overall rating for each possible selection case
	for(var i = 0; i < positiveRating.length; i++){
		var o = overallRating;
		//For each location possibility
		if(i < trafficRating.length){
			//Give the overall rating for each surrounding location
			o.push(offsetRating[cost]+trafficRating[i]+positiveRating[i]-negativeRating[i]);
		}else{
			if(i < trafficRating.length+costRange){
				var n = i-trafficRating.length;
				//Give the overall rating for each price range possibility
				o.push(offsetRating[n]+trafficRating[0]+positiveRating[i]-negativeRating[i]);
			}else{
				//Give the overall rating for each category possibility
				o.push(offsetRating[cost]+trafficRating[0]+positiveRating[i]-negativeRating[i]);
			}	
		}
	}
	//For each possible location
	for(i = 0; i < trafficRating.length; i++){
		//If the current location has the highest rating
		if(overallRating[i] > highestRating){
			//Set the current loction as the highest rated location
			highestRating = overallRating[i];
			//Keep track of the index of the highest rated location
			recommendIndex = i;
		}
	}
	highestRating = 0;						//Reset the current highest rating
	//For each possible price range
	for(i = trafficRating.length; i < trafficRating.length+costRange; i++){
		//If the current price range has the highest rating
		if(overallRating[i] > highestRating){
			//Set the current price range as the highest rated price range
			highestRating = overallRating[i];
			//Keep track of the index of the highest rated price range
			recommendPriceIndex = i-trafficRating.length;
		}		
	}
	highestRating = 0;						//Reset the current highest rating
	//For each possible category
	for(i = trafficRating.length+costRange; i < positiveRating.length; i++){
		//If the current category has a rating greater than the highest rating
		if(overallRating[i] > highestRating){
			//Set the current category as the highest rated category
			highestRating = overallRating[i]
			//Empty the recommended categories array
			recommendCategory = [];
		//If the current category has a rating equal to the highest rating	
		}if(overallRating[i] == highestRating){
			//Add the current category to the recommended categories array
			recommendCategory.push(categories[i-(trafficRating.length+costRange)]);
		}
	}
	//If the highest rated location is not the selected location
	if(recommendIndex){
		//recommend the highest rated location
		recommendation[0] = recommendStart+recommendLocation[recommendIndex]+recommendEnd;
	}else{
		//Otherwise recommend the selected location
		recommendation[0] = recommendCenter;
	}
	//If the highest rated price range is the selected price range
	if(recommendPriceIndex == cost-1){
		//recommend the selected price range
		recommendation[1] = recommendCurrentPrice;
	}else{
		//Otherwise recommend the highest rated price range
		recommendation[1] = recommendPriceStart+recommendPrice[recommendPriceIndex]+recommendPriceEnd;
	}
	recommendation[2] = recommendCategoryStart;				//Assemble the category recommendation
	for(var i = 0; i < recommendCategory.length; i++){		//For each of the highest rated categories
		//Add the category to the list
		recommendation[2] = recommendation[2]+' '+recommendCategory[i];
		if(i < recommendCategory.length-2){
			recommendation[2] = recommendation[2]+','		//Separate each category with a comma
		}else if(i == recommendCategory.length-2){			//Unless it is the category
			recommendation[2] = recommendation[2]+' and'	//If it is, then insert the word and
		}
	}
	recommendation[2] = recommendation[2]+'.'				//finish the category recommendation text
	//Add various ratings to the website
	document.getElementsByClassName('rating')[0].innerHTML = Math.round(trafficRating[0]);
	document.getElementsByClassName('rating')[1].innerHTML = Math.round(positiveRating[0]);
	document.getElementsByClassName('rating')[2].innerHTML = Math.round(negativeRating[0]);
	document.getElementsByClassName('rating')[3].innerHTML = Math.round(localStorage.densityRating);
	document.getElementsByClassName('overall-rating')[0].innerHTML = Math.round(overallRating[0]);
	//Set heights on bar charts to represent the contribution of each rating to the overall rating
	var barChart = document.getElementsByClassName('bar-chart');
	//Set the height to match the rating
	barChart[0].style.height = (Math.round(trafficRating[0]))+'px';
	barChart[1].style.height = (Math.round(positiveRating[0]))+'px';
	barChart[2].style.height = (Math.round(negativeRating[0]))+'px';
	barChart[3].style.height = (Math.round(localStorage.densityRating))+'px';
	//Add a top margin to offest the height so each bar lines up at the bottom
	barChart[0].style.marginTop = (110-Math.round(trafficRating[0]))+'px';
	barChart[1].style.marginTop = (110-Math.round(positiveRating[0]))+'px';
	barChart[2].style.marginTop = (110-Math.round(negativeRating[0]))+'px';
	barChart[2].style.backgroundColor = 'red';						//Color the negative rating red
	barChart[3].style.marginTop = (110-Math.round(localStorage.densityRating))+'px';
	//Add each recommendation to the page	
	for(var i = 0; i < 3; i++){
		document.getElementsByClassName('recommendation')[i].innerHTML = recommendation[i];
	}
};