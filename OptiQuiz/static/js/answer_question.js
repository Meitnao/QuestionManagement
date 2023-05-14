const N = 110;
let currentQuestionIndex = 0;
let isWrong = false;
let questions = [];
let wrongCnt = 0;
let total = 0;
let hasImg = new Array(N).fill(false);
let images = [];
let page, testNum;
let checkingAnswer = false;
const questionNum = 100;
const questionElement = document.querySelector("h1");
const optionsElement = document.querySelector("#options");
const submitButton = document.querySelector("#submit");
const correctAnswerElement = document.querySelector("#correct-answer");
const currentImg = document.querySelector('#img');
// 间隔时间
const pauseTime = 500;


function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    let imgDiv = document.querySelector('#img-div');
    const body = document.querySelector('body');
    let idx = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    imgDiv.remove();

    let new_imgDiv = document.createElement('div');
    new_imgDiv.id = 'img-div';
    body.insertBefore(new_imgDiv, optionsElement);

    if (hasImg[idx]) {
        let img = document.createElement("img");
        img.src = `static/images/tmImgs/${testNum}-${page}-${idx}.png`;
        new_imgDiv.appendChild(img);
    }
    currentQuestion.options.forEach((option) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        label.style.userSelect = "none";
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;
        label.append(radio, option);
        optionsElement.append(label);
    });
    correctAnswerElement.textContent = "";
}

function noTouch() {
    // const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('input[type="radio"]');
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.style.pointerEvents = "none";
    });
    options.forEach(option => {
        option.disabled = true;
    }); 
}

function checkAnswer() {
    if (checkingAnswer) return;
    // noTouch();
    checkingAnswer = true;
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
        if (selectedAnswer.value[0] === currentQuestion.answer) {
            currentQuestionIndex++;
            optionsElement.removeEventListener("click", checkAnswer);
            noTouch();

            if (currentQuestionIndex < questions.length) {
                setTimeout(() => {
                    renderQuestion();
                    optionsElement.addEventListener("click", checkAnswer);
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
    checkingAnswer = false;
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

function fetch_data(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}

$(function() {
    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    page = urlParams.get('data');
    testNum = urlParams.get('test');
    // let page = JSON.parse(decodeURIComponent(dataString));
    let currentUrl = `conf/${testNum}-test${page}.json`;
    
    Promise.all([
        fetch_data('conf/images.json'),
        fetch_data(currentUrl),
    ]).then(results => {
        images = results[0][testNum][parseInt(page)];
        questions = results[1];
        total = questions.length;
        wrongCnt = 0;
        
        // console.log(images);
        // return;
        for (let i = 0; i < total; i ++) {
            hasImg[i] = false;
        }

        for (let i of images) {
            hasImg[i] = true;
        }
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
                    noTouch();
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
    });
});
