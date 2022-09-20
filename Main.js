/* A2-Speed Writer.java
 * Author: MeharvaanSingh
 * Date: March 3 2022
 
 * Description:In this assignment i created a game for testing user's speed 
   and it also provides with game over message with score if u loose and shows
   the total time taken if you win it.
 */

var wordArray = ["once","upon","a","time","I","was","doing","Javascript","Assignment","3"];
// Creating the array of words//

// selecting the difficuly level of the game//
var range = document.querySelectorAll("#difficulty")[0];
var button = document.querySelectorAll("#confirm")[0];
var selectedDifficulty = 0;
var selectedArray= [];

// Adding click event to beginning button, to enter the game//
button.addEventListener('click', nextSlide);

//Adding event handler for click event//
function nextSlide(event){
	event.target.remove();
	range.remove();
	selectedDifficulty = range.value;

	var i = 0; //here i is used for word number//
	var j = 0; // j is used to calculate seconds to answer the words//

    // removing the click event handler//
	event.target.removeEventListener('click', nextSlide);

	// creating p a tag and giving it value//
	var word = document.createElement("p");
	var text = document.createTextNode("Next Word: " + wordArray[i]);

	// Creating reference with the HTML page tag with id stage//
    var words = document.querySelectorAll("#stage")[0];

    word.appendChild(text);
    words.appendChild(word);

	// creatinging div element to print the result of the game//
	var result = document.createElement("div");
	result.setAttribute("id","resultId");
    words.appendChild(result);

   // Creating a text input element for users//
    var nextWordinput = document.createElement("input");
	nextWordinput.setAttribute("type", "text");
	words.appendChild(nextWordinput);

	//Setting the time interval to calculate the time taken//
	var timeIntervalId = window.setInterval(interval, 1000);
	function interval(){
		j = j+1;
	}
    
	// creating a time out of 20 sec if user is not able to complete game in 20 sec//
	var timeOutId = window.setTimeout(timeout,20000);
	function timeout(){
		word.innerHTML = "TIME'S UP ";
		word.setAttribute("id","wordId");

		// result message//
		var resultText = document.createTextNode("You Got " + i + " Out Of " + selectedDifficulty + " Words!");
		result.appendChild(resultText);

		//disabling the input field after game is over//
		nextWordinput.setAttribute("disabled","true");

		//clearing the timeout,interval and removing event handler//
		clearTimeout(timeOutId);
		clearInterval(timeIntervalId);
		nextWordinput.removeEventListener('keyup', nextWord);

	//Function to be run if user wins the game//
	}function win(){
		word.innerHTML = "Congratulations. Your time was " + j + " seconds";
		//clearing the timeout,interval and removing event handler//
		nextWordinput.removeEventListener('keyup', nextWord);
		clearTimeout(timeOutId);
		clearInterval(timeIntervalId);

		//disabling the input field//
		nextWordinput.value = "";
		nextWordinput.setAttribute("disabled","true");
	}
	//Adding event Keypress//
	nextWordinput.addEventListener('keyup', nextWord);
    
	//Adding event Handler for keypress event//
    function nextWord(event){
	    // setting the key to be Enter//
	    if(i < selectedDifficulty){
			if(nextWordinput.value == wordArray[i]){
				i = i+ 1;
				if(i < selectedDifficulty){
					word.innerHTML = "Next Word: " + wordArray[i];
					nextWordinput.value = "";
					// game win message with time taken//
				}else{win();}
			} 
		}else{win();}
	}
}				   	