const birdsData = [

    { "image": "annas-hummingbird.jpg", "name": "Anna's Hummingbird" },
    { "image": "bearded-tit.jpg", "name": "Bearded Tit" },
    { "image": "black-capped-chickadee.jpg", "name": "Black-Capped Chickadee" },
    { "image": "dark-eyed-junco.jpg", "name": "Dark-Eyed Junco" },
    { "image": "great-blue-heron.jpg", "name": "Great Blue Heron" },
    { "image": "night-heron.jpg", "name": "Night Heron" },
    { "image": "spotted-towhee.jpg", "name": "Spotted Towhee"}
];

const birdNames = [

    "Anna's Hummingbird",
    "Bearded Tit",
    "Black-Capped Chickadee",
    "Dark-Eyed Junco",
    "Great Blue Heron", 
    "Night Heron", 
    "Spotted Towhee"

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const NUM_QUESTIONS = 3;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    shuffleArray(birdsData);
    resetState();
    questionElement.innerHTML = "What bird is this?";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = birdsData[currentQuestionIndex];

    document.getElementById("bird-image").src = `./images/${currentQuestion.image}`; // Set the image source
    
    let correctAnswer = currentQuestion.name;
    let incorrectAnswers = birdNames.filter(name => name !== correctAnswer);
    
    shuffleArray(incorrectAnswers);
    let answers = incorrectAnswers.slice(0,3);
    answers.push(correctAnswer);
    shuffleArray(answers);

    answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer === correctAnswer){
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    document.getElementById("bird-image").src = 'smiling-owl.jpg'; // Clear the image
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${NUM_QUESTIONS}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < NUM_QUESTIONS){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < NUM_QUESTIONS){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function searchBird() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const birdImageContainer = document.getElementById('birdImageContainer');
    birdImageContainer.innerHTML = ''; // Clear previous results

    const bird = birdsData.find(b => b.name.toLowerCase() === searchInput);

    if (bird) {
        const img = document.createElement('img');
        img.src = `images/${bird.image}`;
        img.alt = bird.name;
        img.style.width = '300px'; // Adjust the size as needed
        birdImageContainer.appendChild(img);
    } else {
        birdImageContainer.innerHTML = '<p> <br> Bird not found. Please try another name.</p>';
    }
}

startQuiz();
