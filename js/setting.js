const playerNameInput = document.getElementById('player-name');
const soundControlInput = document.getElementById('sound-control');
const soundValueDisplay = document.getElementById('sound-value');
const saveButton = document.getElementById('save-button');


const current=JSON.parse(localStorage.getItem("currentUser"));


soundControlInput.addEventListener('input', () => {
    soundValueDisplay.textContent = `${soundControlInput.value}%`;
  });
  
  // Handle save button click
  saveButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    const soundLevel = soundControlInput.value;
  
    if (playerName && current) {
      current.name= playerName;
      console.log( currentUser.name)
      localStorage.setItem("currentUser", JSON.stringify(current));
      localStorage.setItem("playerName",  playerName);
    }
  if (soundLevel){
    const audios = document.querySelectorAll("audio");
    audios.forEach(audio =>  audio.volume =soundLevel);
    
  }
    window.location.href='menu.html';
  });
  