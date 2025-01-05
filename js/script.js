var lifelineUsed = false; // Track if the "50:50" lifeline has been used
var currentQuestionIndex = 0;
var changeUsed=false;
var questions = [];
var score = 0;
 var opinionChart;
 var votes;

  const questionElement = document.querySelector(".question");
  const answerElements = document.querySelectorAll(".answers_top div");
  const scoreElements = document.querySelectorAll(".right_side li");


  var chart_container=document.getElementById("opinion-chart")

  // Attach the lifeline button event
  var helper1=document.getElementById("helper1");
  var helper2=document.getElementById("helper2");
  var helper3=document.getElementById("helper3");
  var helper4=document.getElementById("helper4");

  var red_x1=document.getElementById("red-x1");
  var red_x2=document.getElementById("red-x2");
  var red_x3=document.getElementById("red-x3");
  var red_x4=document.getElementById("red-x4");

  helper1.addEventListener("click", deleteTwoAnswers);

  
  helper2.addEventListener("click", initializeCall);

  helper3.addEventListener("click", initializesound);

function initializesound(){
  playSound("communityOpinion");
  setTimeout(()=>{
initializeChart();
  },6000)
}

  helper4.addEventListener("click", changeQuestion);

    // Fetch questions from the JSON file
    async function loadQuestions() {
      try {
        //playSound("bg-music"); there is a preplem here !!
        const response = await fetch("../utils/questions.json");
        questions = await response.json();
        console.log(questions);
        questions = shuffleArray(questions); // Shuffle the questions
        displayQuestion();
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }
    function playSound(id) {
      const sound = document.getElementById(id);
      sound.currentTime = 0;
      sound.play();
    }
  
    function stopSound(id) {
      const sound = document.getElementById(id);
      sound.pause();
      sound.currentTime = 0;
    }

      // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
// Display current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return;

  lifelineUsed = false; // Reset lifeline usage for each question
  playSound("firstQuestion");
  questionElement.textContent = ""; // Clear question text
  answerElements.forEach((element) => {
    element.textContent = ""; // Clear each answer option
  });
  // Reset classes for answers
  answerElements.forEach((element) => {
    element.classList.remove("correct", "wrong", "twinkle-correct", "twinkle-wrong", "deleted");
  });
  setTimeout(() => {
    questionElement.textContent = currentQuestion.question;
  
    // Set answer options
    answerElements.forEach((element, index) => {
      setTimeout(() => {
        element.textContent = `${String.fromCharCode(65 + index)} - ${currentQuestion.options[index]}`;
        element.onclick = () => checkAnswer(element, index);
      },( index+1) * 2000); // Delay increases with index
    });
  }, 7000);
  
}


// Check the answer
function checkAnswer(selectedElement, selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const previousActiveElement = document.querySelector(".active_list");

  // Remove the active class from the previous element
  if (previousActiveElement) {
    previousActiveElement.classList.remove("active_list");
  }

  if (selectedIndex === currentQuestion.correct) {
    
    playSound("correctQuestion");
    selectedElement.classList.add("twinkle-correct");
    score += 1;

    scoreElements[score - 1].classList.add("active_list");
    currentQuestionIndex += 1;

    setTimeout(() => {
      stopSound("correctQuestion");
      playSound("transition-sound");
      if (opinionChart)
        chart_container.style.display = 'none';
      if (currentQuestionIndex >= questions.length) {
        alert("تهانينا! ربحت المليون!");
        stopSound("bg-music");
      } else {
        displayQuestion();
      }
    }, 6000); // Delay to allow animation
  } else {
    // Wrong answer: Twinkle with red
    playSound("wrongAnswer");
    selectedElement.classList.add("twinkle-wrong");

    setTimeout(() => {
      alert("إجابة خاطئة! اللعبة انتهت.");
      stopSound("wrongAnswer");
      resetGame();
    }, 18000); // Delay to allow animation
  }
}


  // Delete two incorrect answers
  function deleteTwoAnswers() {
    if (lifelineUsed) return; // Prevent multiple uses of the lifeline
    lifelineUsed = true;
 
    helper1.classList.add('disallowed');
   
    var currentQuestion = questions[currentQuestionIndex];
    const incorrectAnswers = [];

    // Collect all incorrect answers
    answerElements.forEach((element, index) => {
      if (index !== currentQuestion.correct) {
        incorrectAnswers.push(element);
      }
    });

    // Randomly delete two incorrect answers
    shuffleArray(incorrectAnswers); // Shuffle the incorrect answers
    incorrectAnswers.slice(0, 2).forEach((element) => {
      element.textContent = ""; 
    });

    playSound("transition-sound"); // Play a sound for using the lifeline
  }


// Generate dynamic audience votes
function generateVotes(correctAnswerIndex) {

  const votes = Array(4).fill(0);
  let total = 100;

  // Randomly assign votes to incorrect answers
  for (let i = 0; i < votes.length; i++) {
    if (i !== correctAnswerIndex) {
      const randomVote = Math.floor(Math.random() * 20) + 5; // Random between 5-25
      votes[i] = randomVote;
      total -= randomVote;
    }
  }

  // Assign remaining votes to the correct answer
  votes[correctAnswerIndex] = total;
  return votes;
}






  // Reset the game
  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    lifelineUsed = false;
    questions = shuffleArray(questions); // Reshuffle questions for a new game
    scoreElements.forEach((element) => element.classList.remove("active_list"));
    displayQuestion();
  }


document.addEventListener("DOMContentLoaded", () => {


  // Start the game
  loadQuestions();
  

  
});




function initializeChart() {

  // disAllow using this helper one more time 
  helper3.classList.add('disallowed');

  // Simulate audience votes
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.correct;

  votes = generateVotes(correctAnswerIndex);
  const answers = ['A', 'B', 'C', 'D'];

  // Configure the chart
  const ctx = document.getElementById('opinion-chart').getContext('2d');

  if (opinionChart) {
    // Update existing chart data
    opinionChart.data.datasets[0].data = votes;
    opinionChart.update();

  } 

  else {

  opinionChart=new Chart(ctx, {
    type: 'bar',
    data: {
      labels: answers,
      datasets: [{
        label: 'Audience Votes (%)',
        data: votes,
        backgroundColor: answers.map((_, index) =>
           'blue'
        )
      }]
    },
    options: {
     
    // to control width
      responsive: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.raw}%`
          }
        }
      },
      // from 0 to 100 percentages
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  
  });
  }

  animateVotes(votes, correctAnswerIndex);
}



function animateVotes(votes, correctAnswerIndex) {
  const stepCount = 30; // Number of animation steps (1 per 300 milly second)
  const animationInterval = 300; // 300 milly second per step
  const currentData = Array(votes.length).fill(0);

  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep >= stepCount) {
      clearInterval(interval); // Stop animation
      return;
    }

    // Calculate step-wise increase
    for (let i = 0; i < votes.length; i++) {
      currentData[i] = Math.min(
        votes[i],
        currentData[i] + Math.ceil(votes[i] / stepCount)
      );
    }

    // Update chart data dynamically
    opinionChart.data.datasets[0].data = [...currentData];
    opinionChart.update();

    currentStep++;
  }, animationInterval);

}

function changeQuestion(){
  if (changeUsed) return; // Prevent multiple uses of the lifeline
  changeUsed = true;

  helper4.classList.add('disallowed');
  displayQuestion();

}
 function initializeCall(){
  const currentQu=questions[currentQuestionIndex];
  const answer=currentQu.options[currentQu.correct];
  playSound("callFriend");
  setTimeout(()=>{
alert(`صديقك يقول ان الاجابة الصجيجة هي ${answer}`);
  },17000);
}