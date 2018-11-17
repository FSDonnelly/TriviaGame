var panel = $('#quiz-area');
var countStartNumber = 30;
var toyStory = new Audio ("assets/audio/toystory.mp3");
var spiceGirls = new Audio ("assets/audio/spicegirls.mp3");
var bulls = new Audio ("assets/audio/bulls_champion.mp3");
var nirvana = new Audio ("assets/audio/nirvana.mp3");
var lionKing = new Audio ("assets/audio/lion-king.mp3");
var freshPrince = new Audio ("assets/audio/fresh.mp3");
var doug = new Audio ("assets/audio/doug.mp3");
var saveBell = new Audio ("assets/audio/Saved_By_The_Bell.mp3");
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
  question: "What was the first full length CGI movie?",
  answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
  correctAnswer: "Toy Story",
  image:"assets/images/toystory.gif",
  
}, {
  question: "Which of these is NOT a name of one of the Spice Girls?",
  answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
  correctAnswer: "Fred Spice",
  image:"assets/images/spicegirls.gif"
}, {
  question: "Which NBA team won the most titles in the 90s?",
  answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
  correctAnswer: "Chicago Bulls",
  image:"assets/images/bulls.gif"
}, {
  question: 'Which group released the hit song, "Smells Like Teen Spirit"?',
  answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
  correctAnswer: "Nirvana",
  image:"assets/images/nirvanabark.gif"
}, {
  question: 'Which popular Disney movie featured the song, "Circle of Life"?',
  answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
  correctAnswer: "The Lion King",
  image:"assets/images/lionking.gif"
}, {
  question: 'Finish this line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."',
  answers: ["Dice", "Mirror", "Fresh", "Cab"],
  correctAnswer: "Fresh",
  image:"assets/images/fresh.gif"
}, {
  question: "What was Doug's best friend's name?",
  answers: ["Skeeter", "Mark", "Zach", "Cody"],
  correctAnswer: "Skeeter",
  image:"assets/images/skeeter.gif"
}, {
  question: "What was the name of the principal at Bayside High in Saved By The Bell?",
  answers: ["Mr.Zhou", "Mr.Driggers", "Mr.Belding", "Mr.Page"],
  correctAnswer: "Mr.Belding",
  image:"assets/images/belding.gif"
}, {
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
  image: "assets/images/savingpr.gif"
},];



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
  // load questions from array, generate answer selection, and setInterval
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  // load next question and reset timer
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  // if timer runs out show correct answer 
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');
    // timer resets after every question
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  // show total results at the end of the game
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
    
  },
  // when answer clicked run correct or incorrect functions
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  // when answered correctly
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  // when answered incorrectly
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  // game reset
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};