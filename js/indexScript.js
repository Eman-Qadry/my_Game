const loadingElement = document.getElementById("loading");
const numbersElement = document.getElementById("numbers");
const menuElement = document.getElementById("menu");
const menuImg=document.getElementById("menuImg");

var intervalTime=1000;

const scores = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000,"من سيربح المليون"
];

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

    function randomPosition() {
        /*Start: 30% of the screen 
    End: 70% of the screen
    */
        const x = Math.random() * (window.innerWidth * 0.4) + window.innerWidth * 0.3;
        const y = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.3;
    
        return { x, y };
    }

function startLoading() {
    playSound("bg-music");
 
    setTimeout(() => {
        loadingElement.style.display = "none";
        showNumbers();
    }, 2000);

}

function showNumbers() {
    numbersElement.style.display = "block";
    let index = 0;

    const interval = setInterval(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        if (index !== scores.length - 2) {
         
        const { x, y } = randomPosition();
        numbersElement.style.left = `${x}px`;
        numbersElement.style.top = `${y}px`;}
        else if (index === scores.length - 2 ) {
            numbersElement.classList.add("final");
           
            numbersElement.style.left = `${centerX}px`;
            numbersElement.style.top = `${ centerY}px`;

        }
else {
    numbersElement.style.left = `${centerX}px`;
    numbersElement.style.top = `${ centerY}px`;
  
}
        numbersElement.innerText = scores[index].toLocaleString();
        numbersElement.style.animation = "none"; // Reset animation
        void numbersElement.offsetWidth; // Trigger reflow
        if (index < scores.length - 2 ) {
        numbersElement.style.animation = "scaleSmooth 1s ease-in-out";
        }
        else if (index===scores.length - 2) {
            numbersElement.style.animation = "finalScale 3s ease-in-out";
            intervalTime=4000;
        }
        else{
            numbersElement.classList.remove("final");
            numbersElement.classList.add("text");
           
         
        }
        index++;
        if (index >= scores.length) {
           

            clearInterval(interval);
            setTimeout(() => {
         
                numbersElement.style.display = "none";
                menuElement.style.display = "inline-block";
                menuImg.style.display = "inline-block";
                setTimeout(() => {
                stopSound("bg-music");
            }, 3000);
            }, 4000);
        }
    }, intervalTime);
}

function startGame() {
    window.location.href = 'home.html'; 
  
}
function menuBack(){
    localStorage.setItem("returnBack", "true");
      window.location.href='menu.html'
    
  
}
function showInstructions() {
    alert("Instructions are under development.");
}

function showSettings() {
    alert("Settings are under development.");
}

function showLeaderboard() {
    alert("Leaderboard is under development.");
}

function reviewQuestions() {
    alert("Review questions is under development.");
}

function aboutGame() {
    alert("About the game is under development.");
}

// Start the loading process

document.addEventListener("DOMContentLoaded", () => {

const returnBack=localStorage.getItem("returnBack") ||false;
console.log(returnBack);
    // Start the game
    if (returnBack!=="true"){
    startLoading();
 
    }
    else {
        console.log("start")
        stopNumbers()
    }
  
    
  });
function stopNumbers(){
    loadingElement.style.display = "none";
    numbersElement.style.display = "none";
    menuElement.style.display = "inline-block";
    menuImg.style.display = "inline-block";
    localStorage.setItem("returnBack", "false");
}
function savePlayerName() {
    const playerName = document.getElementById('player-name').value;
    if (playerName.trim() === "") {
        alert("يرجى إدخال اسم اللاعب.");
        return;
    }
    localStorage.setItem("playerName", playerName); // Save name for later use

    window.location.href = "home.html"; // Redirect to the game page
   
}