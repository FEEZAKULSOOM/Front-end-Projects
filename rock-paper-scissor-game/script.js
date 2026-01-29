let userScore =0;
 let compScore=0;


 let choices = document.querySelectorAll(".choice");
 let msg = document.querySelector("#msg");
 let userScorePara = document.querySelector("#user-score");
 let compScorePara = document.querySelector("#computer-score");



 const drawGame = () => {
   console.log ( "Game was draw!");
      msg.innerText="Game was draw. Play again 🤝";
      msg.style.backgroundColor="#144552";
 }

 const genCompChoice = () => {
  const options = [ "rock" , "paper" , "scissors"];
   const randomIndex=Math.floor( Math.random() *3);
    return options[randomIndex];

 }

  const  showWinner = (userWin ,userChoice, compChoice) => {
    if (userWin) {
       console.log ( "you win");
       msg.innerText=`You win!  🏆 Your ${userChoice} beats ${compChoice}.`;
       msg.style.backgroundColor="#3a5a40";
       userScore++;
       userScorePara.innerText=userScore;
       
    }
    else {
       compScore++;
        console.log ( " you lose ");
        msg.innerText=`You lost! 😞 ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor="#bc4749";
        compScorePara.innerText=compScore;
       
    }
  }
const playGame = (userChoice) => {
 
  const compChoice = genCompChoice ();
  

    if ( userChoice === compChoice) {
       drawGame();
    }

     else {
       let userWin =true;
        if ( userChoice=== "rock") {
          userWin =compChoice ==="paper" ?  false  : true;
        }
        else if ( userChoice ==="paper") {
           userWin = compChoice ==="scissors" ? false : true;
        }
         else {
            userWin = compChoice ==="rock" ? false : true;
         }

         showWinner(userWin , userChoice, compChoice);
     }


};
 choices.forEach ( (choice) => {
   choice.addEventListener ("click" , () => {
    let userChoice = choice.getAttribute ("id");
    
     playGame (userChoice);


   });
 });
