const quizData = [
    {
         question: "Who is the protagonist on  Attack on Titan?",
         a: "Eren Yaeger",
         b: "Yuji Itadori",
         c: "Yuya Sakaki",
         d: "Kazuto Kirigaya",
         e: "Kazuma Sato",
         correct: "a",
     },
     {
         question: "Who is the Captain on SHIRATORIZAWA",
         a: "Kotaro Bokuto",
         b: "Toru Oikawa",
         c: "Tetsuro Kuroo",
         d: "Wakatoshi Ushijima",
         e: "Kaname Moniwa",
         correct: "d",
     },
     {
     question: "What power or ability can use on Hunter X Hunter?",
         a: "Sorcery",
         b: "Nen",
         c: "Ki",
         d: "Magic",
         e: "Gifts",
         correct: "b",
     },
     {
         question: "What ability uses by Atsushi Nakajima on Bonguo Stray Dogs?",
         a: "No Longer Human",
         b: "The perfect Crime",
         c: "Ability of Existence",
         d: "Demon Snow",
         e: "Rashomon",
         correct: "c",
     },
     {
         question: "Who is the Father of Yuno on Black Clover?",
         a: "Father Orsi",
         b: "Sukehiro Yami",
         c: "Juilius Novachrono",
         d: "Dante Zogratis",
         e: "Lord Ciel",
         correct: "e",
     },
 ];
 
 const quiz = document.getElementById('quiz');
 const startBtn = document.getElementById('start');
 const submitBtn = document.getElementById('submit');
 const questionEl = document.getElementById('question');
 const optionsList = document.getElementById('options');
 const timeLimit = 20;
 let currentQuiz = 0;
 let score = 0;
 let timeRemaining = timeLimit;
 let timerInterval;
 
 startBtn.addEventListener('click', startQuiz);
 
 submitBtn.addEventListener('click', () => {
     const selectedAnswer = getSelected();
     const correctAnswer = quizData[currentQuiz].correct;
 
     if (selectedAnswer === correctAnswer) {
         score++;
     }
 
     currentQuiz++;
 
     if (currentQuiz < quizData.length) {
         timeRemaining = timeLimit;
         clearInterval(timerInterval);
         startTimer();
         loadQuiz();
     } else {
         endQuiz();
     }
 });
 
 function startQuiz() {
     startBtn.style.display = 'none';
     loadQuiz();
     startTimer();
 }
 
 function loadQuiz() {
     const currentQuizData = quizData[currentQuiz];
     questionEl.innerText = currentQuizData.question;
 
     optionsList.innerHTML = ''; 
 
     for (const option in currentQuizData) {
         if (option !== 'question' && option !== 'correct') {
             const li = document.createElement('li');
             const input = document.createElement('input');
             const label = document.createElement('label');
 
             input.type = 'radio';
             input.name = 'answer';
             input.id = option;
             input.className = 'answer';
             label.setAttribute('for', option);
             label.id = `${option}_text`;
             label.innerText = currentQuizData[option];
 
             li.appendChild(input);
             li.appendChild(label);
             optionsList.appendChild(li);
         }
     }
 }
 
 function getSelected() {
     const answerEls = document.querySelectorAll('.answer');
     for (const answerEl of answerEls) {
         if (answerEl.checked) {
             return answerEl.id;
         }
     }
     return undefined;
 }
 
 function startTimer() {
     timerInterval = setInterval(() => {
         timeRemaining--;
         document.getElementById('time').innerText = timeRemaining;
 
         if (timeRemaining === 10) {
             document.getElementById('timer').style.color = 'red';
         }
 
         if (timeRemaining === 0 || currentQuiz === quizData.length) {
             clearInterval(timerInterval);
             endQuiz();
         }
     }, 1000);
 }
 
 function endQuiz() {
     quiz.innerHTML = `
         <h2>You answered ${score}/${quizData.length} questions correctly</h2>
         <button onclick="location.reload()">Reload</button>
     `;
 }
 
 