const questions = [
    {
        question: "Which organelle is known as the powerhouse of the cell?",
        answers:[
            {text:"Ribosome", correct:false},
            {text:"Mitochondrion", correct:true},
            {text:"Endoplasmic Reticulum", correct:false},
            {text:"Golgi Apparatus", correct:false},
        ]
    },
    {
        question: "What is the primary function of ribosomes in a cell?",
        answers:[
            {text:"Protein synthesis", correct:true},
            {text:"Energy production", correct:false},
            {text:"DNA replication", correct:false},
            {text:"Lipid synthesis", correct:false},
        ]
    },
    {
        question: "Which process describes the division of a cell's nucleus and genetic material into two identical nuclei?",
        answers:[
            {text:"Mitosis", correct:true},
            {text:"Meiosis", correct:false},
            {text:"Cytokinesis", correct:false},
            {text:"Apoptosis", correct:false},
        ]
    },
    {
        question: "In genetics, what is the term for an organism's genetic makeup?",
        answers:[
            {text:"Phenotype", correct:false},
            {text:"Genotype", correct:true},
            {text:"Allele", correct:false},
            {text:"Locus", correct:false},
        ]
    },
    {
        question: "What is the role of chlorophyll in photosynthesis?",
        answers:[
            {text:"Absorb light energy", correct:true},
            {text:"Fixes carbon dioxide", correct:false},
            {text:"Transports water", correct:false},
            {text:"synthesizes amino acids", correct:false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
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
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
            button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();