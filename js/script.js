
var currentUser = { name: "Player1", score: 0 ,question: 1}; // Replace with dynamic user name
  
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



