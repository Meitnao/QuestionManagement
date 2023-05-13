let currentQuestionIndex = 0;
let isWrong = false;
let questions = [];
let wrongCnt = 0;
let total = 0;
const questionNum = 100;
const questionElement = document.querySelector("h1");
const optionsElement = document.querySelector("#options");
const submitButton = document.querySelector("#submit");
const correctAnswerElement = document.querySelector("#correct-answer");
// 间隔时间
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
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                setTimeout(() => {
                    renderQuestion();
                }, pauseTime);
            } else {
                // 所有问题都已回答完成
                setTimeout(() => {
                    alert("恭喜您完成所有问题！");
                    end_answer(total, wrongCnt);
                }, pauseTime);
                
            }
        } else {
            isWrong = true;
            wrongCnt ++;
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

function end_answer(total, cnt) {
    console.log(total, cnt);
    let score = total - cnt;
    let data = {
        "total": total,
        "score": score
    };
    let queryString = '?data=' + encodeURIComponent(JSON.stringify(data));
    window.location.href = "end_answer.html" + queryString;
    // alert(queryString);
}

$.ajax({
    method: "GET",
    url: "conf/questions.json",
    dataType: "json",
    success: function (e) {
        // let queryString = location.search;
        // let urlParams = new URLSearchParams(queryString);
        // let dataString = urlParams.get('data');
        // let page = JSON.parse(decodeURIComponent(dataString));
        // 还没写完
        questions = e;
        total = questionNum;
        wrongCnt = 0;


        renderQuestion();
        optionsElement.addEventListener("click", checkAnswer);

        submitButton.addEventListener("click", function () {
            const currentQuestion = questions[currentQuestionIndex];
            const selectedAnswer = document.querySelector(
                'input[name="answer"]:checked'
            );
            if (selectedAnswer) {
                if (selectedAnswer.value[0] === currentQuestion.answer) {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        renderQuestion();
                    } else {
                        // 所有问题都已回答完成
                        setTimeout(() => {
                            alert("恭喜您完成所有问题！");
                            end_answer(total, wrongCnt);
                            // location.href = "end_answer.html";
                        }, pauseTime);
                    }
                    optionsElement.addEventListener("click", checkAnswer);
                }
            } else {
                alert("请选择一个答案!");
            }
        });
    },
});
