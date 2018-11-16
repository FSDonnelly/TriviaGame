var panel = $('#quiz-area');
var countStartNumber = 30;
var jepordy = new Audio ("assets/audio/Jeopardy-theme-song.mp3")

//CLICK EVENTS

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
  jepordy.loop = true;
  jepordy.play();
});


//Question set


var questions = [{
  question: "Which is not a name of one of the Teenage Mutant Ninja Turtles?",
  answers: ["Leonardo", "Michelangelo", "Raphael", "Masaccio","Donatelo"],
  correctAnswer: "Masaccio",
  image: "assets/images/tmnt.gif"
}, {
  question: "What show aired in 1984 and was about a group of teenagers who worked togther form a fighting robot to battle evil?",
  answers: ["Voltron", "Power Rangers","Transformers", "Gobots"],
  correctAnswer: "Voltron",
  image: "assets/images/voltron.gif"
}, {
  question: "What was highest grossing movie in 1998?",
  answers: ["There's Something About Mary", "Armageddon", "Saving Private Ryan", "A Bug's Life"],
  correctAnswer: "Saving Private Ryan",
  image: "assets/images/savingpr"
}, {
  
}];



// start game counter and set totals 
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  // load questions from array and setInterval

  // load next question and reset timer
  
  // if timer runs out clearInterval show correct answer 
 
  // show total results at the end of the game
 
  // when answer clicked run correct or incorrect functions
  
  // when answered correctly
 
  // when answered incorrectly

  // game reset
