/* =========================
   RELÓGIO + BACKGROUND
========================= */

function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    document.getElementById("time").textContent = `${hours}:${minutes}`;

    const body = document.body;

    // Limpa classes antigas
    body.classList.remove("morning", "afternoon", "night");

    if (hours >= 6 && hours < 12) {
        body.classList.add("morning");
    } else if (hours >= 12 && hours < 18) {
        body.classList.add("afternoon");
    } else {
        body.classList.add("night");
    }
}

updateTime();
setInterval(updateTime, 1000);

/* =========================
   CARD + PERGUNTAS
========================= */

const questions = [
    {
        text: "Is it raining?",
        badIfYes: true
    },
    {
        text: "Do you have an umbrella?",
        badIfYes: false
    },
    {
        text: "Is it too cold outside?",
        badIfYes: true
    },
    {
        text: "Do you feel tired right now?",
        badIfYes: true
    }
];


let currentQuestion = 0;
let score = 0;

// Elementos
const card = document.querySelector(".card");
const questionText = document.getElementById("question");
const startButton = document.getElementById("viewDetails");
const optionButtons = document.querySelectorAll(".option");
const optionsContainer = document.querySelector(".options");
const restartButton = document.getElementById("restart");


/* =========================
   ABRIR CARD
========================= */

startButton.addEventListener("click", () => {
    document.body.classList.add("show-card");

    card.classList.remove("hidden");
    setTimeout(() => card.classList.add("show"), 10);

    currentQuestion = 0;
    score = 0;

    optionsContainer.style.display = "flex";
    showQuestion();
});

/* =========================
   MOSTRAR PERGUNTA
========================= */

function showQuestion() {
    questionText.textContent = questions[currentQuestion].text;
}

/* =========================
   CLIQUE NAS OPÇÕES
========================= */

optionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.textContent;

        const current = questions[currentQuestion];

        // Se responder YES em algo negativo → soma ponto ruim
        if (answer === "Yes" && current.badIfYes) {
            score++;
        }

        // Se responder NO em algo que seria bom ter → ponto ruim
        if (answer === "No" && !current.badIfYes) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
});

/* =========================
   RESULTADO FINAL
========================= */

function showResult() {
    optionsContainer.style.display = "none";

    if (score === 0) {
        questionText.textContent = "Yes! It's a great time to go out 😄";
    } else if (score === 1) {
        questionText.textContent = "You can go out, but be careful 🙂";
    } else {
        questionText.textContent = "Not worth going out today 😕";
    }

    restartButton.classList.remove("hidden");
}

restartButton.addEventListener("click", () => {
    // resetar estado
    currentQuestion = 0;
    score = 0;

    // esconder card
    card.classList.remove("show");
    setTimeout(() => {
        card.classList.add("hidden");
    }, 300);

    // resetar UI
    restartButton.classList.add("hidden");
    optionsContainer.style.display = "flex";

    // voltar layout inicial
    document.body.classList.remove("show-card");
});
