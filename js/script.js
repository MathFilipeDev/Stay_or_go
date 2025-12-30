let reasons = [];

/* =========================
   RELÓGIO + BACKGROUND
========================= */

function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) minutes = "0" + minutes;

    document.getElementById("time").textContent = `${hours}:${minutes}`;

    const body = document.body;
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
   PERGUNTAS
========================= */

const questions = [
    {
        text: "Is it raining?",
        badIfYes: true,
        reason: "It's raining outside."
    },
    {
        text: "Do you have an umbrella?",
        badIfYes: false,
        reason: "You don't have an umbrella."
    },
    {
        text: "Is it too cold outside?",
        badIfYes: true,
        reason: "It's really cold out there."
    },
    {
        text: "Do you feel tired right now?",
        badIfYes: true,
        reason: "You are tired."
    }
];

let currentQuestion = 0;
let score = 0;

const card = document.querySelector(".card");
const questionText = document.getElementById("question");
const startButton = document.getElementById("viewDetails");
const optionButtons = document.querySelectorAll(".option");
const optionsContainer = document.querySelector(".options");
const restartButton = document.getElementById("restart");
const progress = document.getElementById("progress");


/* =========================
   ABRIR CARD
========================= */

startButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    reasons = [];

    document.body.classList.add("show-card");

    card.classList.remove("hidden");
    setTimeout(() => card.classList.add("show"), 10);

    optionsContainer.style.display = "flex";
    restartButton.classList.add("hidden");

    showQuestion();
});


/* =========================
   MOSTRAR PERGUNTA
========================= */

function showQuestion() {
    questionText.innerHTML = questions[currentQuestion].text;
    updateProgress();
}


/* =========================
   RESPOSTAS
========================= */

optionButtons.forEach(button => {
    button.addEventListener("click", () => {

        const answer = button.textContent;
        const current = questions[currentQuestion];

        let badAnswer =
            (answer === "Yes" && current.badIfYes) ||
            (answer === "No" && !current.badIfYes);

        if (badAnswer) {
            score++;

            if (!reasons.includes(current.reason)) {
                reasons.push(current.reason);
            }
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
   RESULTADO
========================= */

function showResult() {
    if (score >= 2) {
        questionText.innerHTML = `
            Maybe it's not worth going out 😬
            <div class="reasons-box">
                <h3>Because…</h3>
                <ul>
                    ${reasons.map(r => `<li>${r}</li>`).join("")}
                </ul>
            </div>
        `;
    } else {
        questionText.innerHTML = `It might be a good idea to go out 😎`;
    }

    optionsContainer.style.display = "none";
    restartButton.classList.remove("hidden");
}


/* =========================
   RESTART
========================= */

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;
    reasons = [];

    card.classList.remove("show");

    setTimeout(() => {
        card.classList.add("hidden");
    }, 300);

    restartButton.classList.add("hidden");
    optionsContainer.style.display = "flex";

    document.body.classList.remove("show-card");
});


/* =========================
   PROGRESSO
========================= */

function updateProgress() {
    progress.textContent = `${currentQuestion + 1} / ${questions.length}`;
}



/* =========================
   WEATHER API
========================= */

const weatherBox = document.getElementById("weatherBox");
const weatherText = document.getElementById("weatherText");

async function getWeather() {
    try {
        const res = await fetch(
            "https://api.weatherapi.com/v1/current.json?key=b2acad547d33dce2ec948212cefa2677&q=auto:ip&lang=en&aqi=no"
        );

        const data = await res.json();
        console.log("WEATHER DATA:", data); // 👉 Debug no console

        if (data.error) {
            console.warn("Weather API error:", data.error.message);
            weatherText.innerHTML = "Weather unavailable right now.";
            weatherBox.classList.remove("hidden");
            return;
        }

        const city = data.location.name;
        const temp = Math.round(data.current.temp_c);
        const condition = data.current.condition.text;

        weatherText.innerHTML = `🌤️ Weather in ${city}: ${temp}°C — ${condition}`;
        weatherBox.classList.remove("hidden");

    } catch (e) {
        console.error("Weather fetch failed:", e);
        weatherText.innerHTML = "Weather unavailable right now.";
        weatherBox.classList.remove("hidden");
    }
}


getWeather();
