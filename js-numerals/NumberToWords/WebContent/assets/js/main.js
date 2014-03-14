
var zero 	 = "zero";
var ones 	 = ['', 'one', 'two', 'three', 'four',  'five', 'six', 'seven', 'eight', 'nine', 'ten', ' eleven', ' twelve', ' thirteen', ' fourteen', ' fifteen', ' sixteen', ' seventeen', ' eighteen', ' nineteen'];
var tens 	 = [ '', '', ' twenty', ' thirty', ' forty', ' fifty', ' sixty', ' seventy', ' eighty', ' ninety' ];
var hundreds = [ '', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion ', ' septillion ', ' octillion ', ' nonillion ' ];


function isNaN(event){
	return (event.ctrlKey || event.altKey 
            || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) 
            || (95<event.keyCode && event.keyCode<106)
            || (event.keyCode==8) || (event.keyCode==9) 
            || (event.keyCode>34 && event.keyCode<40) 
            || (event.keyCode==46) );
}

function convert(){
	
	var number = document.getElementById("numberInput").value;
	
	var result;
	
	try {
		result = convert_number(number);
		
	} catch (e) {

		result = e.message;
	}

	document.getElementById("result").innerHTML = result;
}

function convert_number(number){

	var numberStr = number.toString();
	var countPlaces = 0;
	var resultBkp = "";
	var result = "";
	
	if(parseInt(number) == 0){
		return zero;
	}
	
	while(numberStr > 0){
		
		result = "";
		
		number = numberStr.substring(numberStr.length - 3, numberStr.length);
		number = parseInt(number);
		
		if(number >= 100){
			result += convert_hundreds(number);
			number = number % 100;
			
			if(number == 0){
				number = null;
			}
		}
		
		if(number >= 20 && number < 100){
			result += convert_tens(number);
			number = number % 10;
			
			if(number == 0){
				number = null;
			}
		}	
		
		if(number < 20){
			result += convert_ones(number);
		}
		
		if(number > 0 || number == null){
			result += convert_places(countPlaces);
			
			if(resultBkp != ""){
				result += " and ";
			}
		}
		
		resultBkp = result + resultBkp;

		numberStr = numberStr.substring(0, numberStr.length - 3);
		countPlaces++;
	}
	
	return resultBkp;
}

function convert_hundreds(number){
	
	var numberStr = number.toString();
	var result = "";
	
	result = ones[numberStr.charAt(0)] + ' hundred ';
	
	return result;
}

function convert_tens(number){

	var numberStr = number.toString();
	var result = "";
	
	result += tens[numberStr.charAt(0)];
	
	if((number % 10) != 0){
		result += "-";
	}
	
	return result;
}

function convert_ones(number){
	if(number == null){
		return "";
	}
	
	return ones[number];
}

function convert_places(place){
	if(place > hundreds.length - 1){
		throw new Error("The max value allowed is on " + hundreds[hundreds.length - 1] + " place");
	}
	
	return hundreds[place];
}
