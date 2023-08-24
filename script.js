const main = document.getElementById('main');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const choicesList = document.getElementById('choices-list');
const scoreContainer = document.getElementById('score-container');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const saveButton = document.getElementById('save-button');
const viewScoresButton = document.getElementById('view-scores-button');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; 
let timerInterval;


const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["a) HyperText Markup Language", "b) HighText Machine Language", "c) HyperTransfer Markup Language", "d) HyperText and links Markup Language"], 
        correctChoice: 1
    }, 
    {
        question: "What does the 'alt' attribute in the <img> tag provide?",
        choices: ["a) Alternative text for the image", "b) Alignment of the image", "c) Altitude of the image", "d) Animation settings for the image"], 
        correctChoice: 1
    },
    {
        question: "What does CSS stand for?",
        choices: ["a) Computer Style Sheets", "b) Creative Style Sheets","c) Colorful Style Sheets", "d) Cascading Style Sheets"], 
        correctChoice: 4
    },
    {
        question: "What property is used to change the font of an element's text?",
        choices: ["a) font-family", "b) text-style", "c) font-type", "d) font-format"], 
        correctChoice: 1
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["a) var", "b) int", "c) variable", "d) declare"], 
        correctChoice: 1
    },
    {
        question: "How do you declare a function in JavaScript?",
        choices: ["a) function myFunction() {}", "b) def myFunction() {}", "c) function = myFunction() {}", "d) var myFunction = function() {}"], 
        correctChoice: 1
    }
];

startButton.addEventListener('click', startQuiz);
viewScoresButton.addEventListener('click', viewHighScores);
saveButton.addEventListener('click', saveScore);


function startQuiz() {
    startButton.style.display = 'none';
    viewScoresButton.style.display = 'none';
    scoreContainer.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    showQuestion();
    startTimer(); 
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}


function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        choicesList.innerHTML = '';

        question.choices.forEach((choice, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => checkAnswer(index, question.correctChoice));
            li.appendChild(button);
            choicesList.appendChild(li);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        score++;
    } else {
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    showQuestion();
}

function endQuiz() {
    clearInterval(timerInterval);
    questionText.textContent = 'Quiz Over!';
    choicesList.innerHTML = '';
    finalScore.textContent = score;
    scoreContainer.style.display = 'block';
    viewScoresButton.style.display = 'block';
}

function viewHighScores() {
    console.log('View High Scores clicked');
    main.style.display = 'none';
    scoreContainer.style.display = 'none';

    const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scoreContainer.innerHTML = '<h2>High Scores</h2>';

    if (savedScores.length > 0) {
        const scoresList = document.createElement('ul');
        savedScores.forEach(score => {
            const listItem = document.createElement('li');
            listItem.textContent = `${score.initials}: ${score.score}`;
            scoresList.appendChild(listItem);
        });
        scoreContainer.appendChild(scoresList);
    } else {
        scoreContainer.innerHTML += '<p>No high scores available.</p>';
    }

    viewScoresButton.style.display = 'none'; 
    scoreContainer.style.display = 'block';
}

function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];
        const newScore = { initials, score };
        savedScores.push(newScore);
        localStorage.setItem('quizScores', JSON.stringify(savedScores));

        alert('Score saved!');
        initialsInput.value = '';
    }
}