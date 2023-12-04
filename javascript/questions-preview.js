const questionsContainerElement = document.getElementById('questions-container')


async function initializePreview(){
  let questions = [];
  questions = await loadQuestions();

  questions.forEach(question => {
    questionsContainerElement.appendChild(createQuestionElement(question));
  });

  console.log(questions);
}

async function loadQuestions(difficultyLevelParam){

  try {
    const fetchResult = await fetch('data/questions.json');
    let loadedQuestions = await fetchResult.json();
    
    if (difficultyLevelParam !== undefined) {      
      return loadedQuestions.filter(q => q.level == difficultyLevelParam);
    }

    return loadedQuestions;
  } catch (error) {
    console.error('ERROR : ${error}');
  }
};

function createQuestionElement(questionParam){
  let questionElement = document.createElement("p");
  questionElement.classList.add("question-wrapper");
  
  let questionLineElement = document.createElement('h4');
  questionLineElement.innerText = questionParam.question;

  let answersContainer = document.createElement("ol");
  answersContainer.type = "1";

  
  questionElement.appendChild(questionLineElement);
  
  questionParam.choices.forEach(choice=> {
    let choiceElement = document.createElement('li');
    choiceElement.innerText = choice.value;

    if (questionParam.answers.includes(choice.id)) {
      choiceElement.classList.add("correct-answer");
  }
    answersContainer.appendChild(choiceElement);
  })
  
  
  questionElement.appendChild(answersContainer);
  return questionElement;


// questionParam.choices.forEach( choice => {

//     var choiceContainerElement = document.createElement('div');
//     choiceContainerElement.classList.add('choice-container');
    
//     // var choicePrefixElement = document.createElement('p');
//     // choicePrefixElement.classList.add('choice-prefix');
//     // choicePrefixElement.innerText = choice.id;
    
//     var choiceTextElement = document.createElement('p');
//     choiceTextElement.classList.add('choice-text');
//     choiceTextElement.innerText = choice.value;
//     choiceTextElement.addEventListener('click', e => {
//         const selectedChoice = e.target;
//         selectedChoice.parentElement.classList.toggle("selected-answer");
//     });

//     if (questionParam.answers.includes(choice.id)) {
//         choiceContainerElement.classList.add("is-correct-answer");
//     }
    
//     // choiceContainerElement.appendChild(choicePrefixElement);
//     choiceContainerElement.appendChild(choiceTextElement);
//     answersContainerElement.appendChild(choiceContainerElement);
//});
}