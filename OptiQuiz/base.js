const questions = [
    {
        question: "问题1",
        options: ["A.选项A", "B.选项B", "C.选项C", "D.选项D"],
        answer: "A",
    },
    {
        question: "问题2",
        options: ["A", "B", "C", "D"],
        answer: "C",
    },
    {
        question: "问题3",
        options: ["A", "B", "C", "D"],
        answer: "B",
    },
    {
        question: "问题4",
        options: ["A", "B", "C", "D"],
        answer: "D",
    },
    {
        question: "问题5",
        options: ["A", "B", "C", "D"],
        answer: "A",
    },
];

let currentQuestionIndex = 0;
let isWrong = false;
const questionElement = document.querySelector("h1");
const optionsElement = document.querySelector("#options");
const submitButton = document.querySelector("#submit");
const correctAnswerElement = document.querySelector("#correct-answer");
const pauseTime = 500;

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;
        label.append(radio, option);
        optionsElement.append(label);
    });
    correctAnswerElement.textContent = "";
}

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
        if (selectedAnswer.value[0] === currentQuestion.answer) {
            currentQuestionIndex ++;
            if (currentQuestionIndex < questions.length) {
                setTimeout(() => {
                    renderQuestion();    
                }, pauseTime);
                
            } else {
                // 所有问题都已回答完成
                alert("恭喜您完成所有问题！");
                location.href = 'end_answer.html';
            }
        } else {
            isWrong = true;
            correctAnswerElement.textContent = `正确答案是：${currentQuestion.answer}`;
            const incorrectOption = document.querySelector(
                `input[value="${selectedAnswer.value}"]`
            );
            if (incorrectOption) { 
                incorrectOption.parentElement.style.color = "red";
            }
            optionsElement.removeEventListener("click", checkAnswer);
        }
    }
}

renderQuestion();
optionsElement.addEventListener("click", checkAnswer);

submitButton.addEventListener("click", function() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
        if (selectedAnswer.value[0] === currentQuestion.answer) {
            currentQuestionIndex ++;
            if (currentQuestionIndex < questions.length) {
                renderQuestion();
            } else {
                // 所有问题都已回答完成
                alert("恭喜您完成所有问题！");
                location.href = 'end_answer.html';
            }
            optionsElement.addEventListener("click", checkAnswer);
        }
    } else {
        alert("请选择一个答案!");
    }
});
