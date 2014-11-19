/*Adjustable Variables*/
var distanceCoefficients = [];				//Array of distance coefficients
var categoryPriceCompetition = [0,9,2,0];	//Competition with the same category and price
var priceCompetition = [0,6,1,0];			//Competition with the same price range but different category
var categoryCompetition = [0,0,0,0];		//Competition with the same category but different price range
var complementaryEstabishment = [0,-3,1,0]; //Establishments with a different category and price rage
distanceCoefficients.push(
	categoryPriceCompetition,
	priceCompetition,
	categoryCompetition,
	complementaryEstabishment);

/*Program Variables*/
var output = 0;

/*Nameing Variables Do Not Change*/
var samePriceAndCategory = 0;
var samePriceOnly = 1;
var sameCategoryOnly = 2;
var differentPriceAndCategory = 3;
var lati = 0;
var lngi = 1;
var price = 2;
var cat = 3;

/*Temporary*/
var restaurant = 0;
var coffeeShop = 1;
var est = [];
est.push([34.025787,-118.483277,2,0]);
est.push([34.023690,-118.492328,2,0]);
est.push([34.028597,-118.486277,2,0]);
est.push([34.029111,-118.486358,1,0]);
est.push([34.020216,-118.496283,2,0]);
est.push([34.023857,-118.492100,2,0]);
est.push([34.016630,-118.491290,2,0]);
est.push([34.016828,-118.494929,1,1]);
est.push([34.023823,-118.483193,1,1]);
est.push([34.032964,-118.480940,1,1]);

rate = function(lat,lng,cost,category){
	var latitude = lat;
	var longitude = lng;
	var rating = 0;
	var distance = 0;
	var competitionType = 0;
	for(var i = 0; i < est.length; i++){
		distance = Math.sqrt(Math.pow(est[i][lati]-latitude,2)+Math.pow(est[i][lngi]-longitude,2));
		if(est[i][price] == cost && est[i][cat] == category){
			competitionType = samePriceAndCategory;
		}else if(est[i][price] == cost){
			competitionType = samePriceOnly;
		}else if(est[i][cat] == category){
			competitionType = sameCategoryOnly;
		}else{
			competitionType = differentPriceAndCategory;
		}
		rating -= distanceCoefficients[competitionType][0]
		rating -= distanceCoefficients[competitionType][1]*Math.pow(distance,(-1));
		rating -= distanceCoefficients[competitionType][2]*Math.pow(distance,(-2));
		rating -= distanceCoefficients[competitionType][3]*Math.pow(distance,(-3));
	}
	return rating;
};
output = (rate(34.019021,-118.496379,1,coffeeShop))
