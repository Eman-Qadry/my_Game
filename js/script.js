
var currentUser = { name: "Player1", score: 0 ,question: 1}; // Replace with dynamic user name
  
function playSound(id) {
  const sound = document.getElementById(id);
  if (sound) {
      if (!sound.paused) {
          sound.pause(); // Pause if the sound is already playing
      } else {
          sound.currentTime = 0; // Reset to the start
          sound.play(); // Play the sound
      }
  } else {
      console.error(`Element with id "${id}" not found.`);
  }
}

function stopSound(id) {
  const sound = document.getElementById(id);
  if (sound) {
      if (!sound.paused) {
          sound.pause(); // Pause the sound
          sound.currentTime = 0; // Reset to the start
      }
  } else {
      console.error(`Element with id "${id}" not found.`);
  }
}

   

    function menuBack(){
      localStorage.setItem("returnBack", "true");
        window.location.href='menu.html'
      
    
  }


function savePlayerName(){
  const playername=document.getElementById("player-name");
  if (playername.value.trim() === "") {
    alert("يرجى إدخال اسم اللاعب.");
    return;
}
  currentUser.name=playername.value;

 
localStorage.setItem("playerName", playername.value); // Save name for later use
localStorage.setItem("currentUser", JSON.stringify(currentUser)); 
window.location.href = "home.html"; // Redirect to the game page


}



