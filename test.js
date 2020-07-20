import questionArray from './questions.js';

console.log(questionArray);
// function Questions(question,options,answer){
//   this.question=question;
//   this.options=options;
//   this.answer=answer;
// }


// var q1 = new Questions("Which of the following is correct about features of JavaScript?", 
//   ["JavaScript is a lightweight, interpreted programming language.",
//    "JavaScript is designed for creating network-centric applications.",
//    "JavaScript is complementary to and integrated with Java.", 
//    "All of the above."],
//       "All of the above.");
// var q2 = new Questions("How can you get the type of arguments passed to a function?", 
//   ["using typeof operator", "using getType function", "Both of the above.","None of the above."], 
//           "using typeof operator");

// var q3 = new Questions("Which built-in method returns the calling string value converted to lower case?",
//   ["toLowerCase()", "toLower()", "changeCase(case).", "None of the above."],
//   "toLowerCase()");

// var questionArray=[q1,q2,q3];
// console.log(questionArray);
/**************** Render on WebPage ************* */
// display questions
function displayQuestion() {
  return questionArray.map((que,index) => {
    return `<ul class="test__question">${index+1}. ${que.question}
           ${displayOptions(que).join('')}
    <button class="btn" data-id=${index}>Check Answer</button>
    <li class="test__option"><p class="test__answer" data-show=${index}>
      <span class="answer">Answer : </span> ${que.answer}</p>
    </li> </ul>`;
  });
}


// display options 
function displayOptions(que) {
  return que.options.map(option => {
    console.log(option);
    return `<li class="test__option"><input type="radio" name="option">${option}</li>`;
  });
}

// Display on page question and answer
const test_content=document.querySelector('.test__content');
test_content.insertAdjacentHTML('afterbegin', `${displayQuestion().join('')}`);


/*********Checking Section*******/
// Show Anser on button click
const buttons=document.querySelectorAll('.btn');
const getAnswer = document.querySelectorAll('.test__answer');
buttons.forEach(button=>button.addEventListener('click',matchAnswer));

function matchAnswer(){
  const buttonId = this.dataset.id;
  let answerId;

  getAnswer.forEach(answer=>{
    answerId = answer.getAttribute('data-show');
    if(buttonId===answerId){
        showAnswer(answer);
        setTimeout(() => {
          hideAnswer(answer)
        }, 10000);
    }
  });
// display answer when clicked button
  function showAnswer(answer){
    answer.style.display = 'block'
 }
//  hide answer after show answer
 function hideAnswer(answer)  {
   answer.style.display='none';
 }
}

/* Check answer when click radio button */
const options=document.querySelectorAll('.test__option');
options.forEach(option=>option.addEventListener('click',optionClick));
function optionClick(){
  let selectOption=this.innerText;

  var check= questionArray.some(que=>{
      if(que.answer===selectOption){
        return true;
      }  
  });
  // Add symbol right or wrong
  if(check===true){
    this.insertAdjacentHTML('beforeend', '<span class="option__check">&check;</span>')
  }
  else{
    this.insertAdjacentHTML('beforeend', '<span class="option__check option__check--red">&cross;</span>')
  }
}
