const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is the syntax if you were defining a function?",
        choice1: "function",
        choice2: "function functionName()",
        choice3: "function functionName(){}",
        answer: 3,
    },
    {
        question: "What is the syntax if you were calling a function?",
        choice1: "function",
        choice2: "functionName()",
        choice3: "function functionName(){}",
        answer: 2,
    },
    {
        question: "What is the syntax if you were calling a function with an argument?",
        choice1: "function.argument",
        choice2: "functionName(argument)",
        choice3: "function functionName(){}",
        answer: 2,
    },
    {
        question: "What is the syntax to set a variable that is constant?",
        choice1: "function.constant",
        choice2: "const 'variable' =",
        choice3: "let 'variable' =",
        answer: 2,
    },
    {
        question: "What is the syntax if you were setting a variable that can change?",
        choice1: "function.constant",
        choice2: "const 'variable' =",
        choice3: "let 'variable' =",
        answer: 3,
    },
    {
        question: "Which javascript language can be used for shortcuts?",
        choice1: "Jquery",
        choice2: "CSS",
        choice3: "Bootstrap",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
