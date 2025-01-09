
const current=JSON.parse(localStorage.getItem("currentUser"));



document.addEventListener("DOMContentLoaded", () => {


  
   chequeData();
    
  
    
  });

  function chequeData(){
    const userName=document.getElementById("userName");
      const date=document.getElementById("date");
      const amountNumber=document.getElementById("amountNumber");
      const amountText= document.getElementById("amountText");
      const newDate=new Date();
      date.innerText=newDate.toLocaleDateString();
      userName.innerText=localStorage.getItem("playerName");
      amountNumber.innerText=current.score;
  }