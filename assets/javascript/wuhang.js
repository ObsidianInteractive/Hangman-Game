
	// Variables 
	var wins = 0;
	var losses = 0;
	var wuTangMem = "MethodMan, Raekwon, Inspectah Dec, UGod, Cappadona, GZA, RZA, ODB, MastaKilla".toUpperCase().split(" ");
	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var guessesLeft = 10;
	var guessesMade = [];
	var playerGuess = "";
	var answerDisplay = [];  
	var answer = [];
	var wuIndex = 0;
		
	
	document.onkeyup = function(element){
		
		playerGuess = event.key.toUpperCase();
        
	
		//checks if key pressed is a letter.
		if (!isletters(playerGuess)){
			alert("Letters only. Wu-Tang");
			return 0;			
		}
		
		if(guessesLeft === 10){
			wuIndex = randomIndex(); 
			answer = wuTangMem[wuIndex].split("");
			setAnswerDisplay();
			askQuestion();
        }
        
		guessesLeft--;

		// checks if player already guessed letter.
		if (guessesMade.indexOf(playerGuess) > -1){
			alert("You've Already Guessed God!" + playerGuess +"Try Again Son.");
			return 0;
		}
		else{
			guessesMade.push(playerGuess);
			checkAnswer();
		}
		
		//If no more guesses you lose
		if (guessesLeft == 0){
			loseAlert();
			resetGame();
		}	
	
		showResults();
	
	
	//Returns random number for index in array.
	function randomIndex(){
			
		return  Math.floor(Math.random()*wuTangMem.length);
		

		
	//returns found indexes of char in array
	
	function searchString(string){

		for(var i = 0; i < string.length; i++)
			
			if(playerGuess === string[i]){
					foundIndexes.push(i);
		}	

	}
	
	// Displays results of game to page.
	function showResults() {
	 	
	 	//	Current Word 	
	 	document.querySelector("#current-word").innerHTML= answerDisplay.join(" ");

	 	//	guesses left 	 	
	 	document.querySelector("#guesses-left").innerHTML= guessesLeft;

	 	//	Letters guessed 		 	
	 	document.querySelector("#letters-guessed").innerHTML= guessesMade.join(" ");

	 	//	wins 	 	
	 	document.querySelector("#wins").innerHTML= wins;
	 	
	 
	
	
	//Displays win alert, increments wins
	function winAlert(){
			
		alert("Win"); 
		wins++;
		resetGame();  
return 0;	

    //Displays loss alert, increments losses
	function loseAlert(){
		alert("You Lose!");
		losses++;
	}


	//Resets game by setting 'Guesses Left' to ten and
	//clearing 'Your Guesses So Far: '.  
	function resetGame(){
		
		guessesLeft = 10;
		guessesMade = [];
		answerDisplay = [];

	}//END resetGame()


	function isLetter(x){
		if(letters.indexOf(x) > -1){
			return true;	
		}			
			return false;
	}//END isLetter

	//Assigns proper place holder array. 
	function setAnswerDisplay(){

		answerDisplay = answer.map(function(element){
				
			if(isLetter(element)){
				
				return("_");
			}
			else{
				
				return element;
			}
		});	

	}//END setAnswerDisplay


	function checkAnswer(){

		for(var i = 0; i< answer.length; i++){
			if(playerGuess == answer[i]){
				answerDisplay[i] = playerGuess;
			}
			
			if(answerDisplay.join("") == answer.join("")){
				winAlert();
			}
		}



	// displays answer
	function showAnswer(){

    }
    }
}
    
