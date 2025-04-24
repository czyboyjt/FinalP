let currentPage = 1;
let totalPages = 4;
let countdownTimer;
let isPaused = false;
let isCountdownRunning = false;
const playbtn = document.getElementById("pause");

function gloadPage(page) {
    console.log("Loading page:", page);
    const content = document.getElementById("main-content");
    document.body.classList.add("overlayT");

    setTimeout(() => {
        fetch(`S${page}.html`)
            .then(res => res.text())
            .then(html => {
                content.innerHTML = html;
                document.body.classList.remove("overlayT");

                currentPage = page;
                let nextPage = currentPage + 1;
                if (nextPage > totalPages) {
                    nextPage = 1;
                }

                if (countdownTimer) {
                    clearInterval(countdownTimer);
                }

                Countdown(nextPage);


                const playButton = document.getElementById("pause");
                if (playButton) {
                    playButton.addEventListener("click", () => {
                        console.log("Button clicked");
                        isPaused = !isPaused;
                        if (isPaused) {
                            playButton.src = "../Images/mdi_play.png";
                            playButton.alt = "Pause";
                        } else {
                            playButton.src = "../Images/material-symbols-light_pause-rounded.png";
                            playButton.alt = "Play";
                        }
                    });
                }
            });
    }, 3000);
}

function Countdown (nextPage) {
    let timeLeft = 10;
    const countdownElement = document.getElementById("time");
    if (isCountdownRunning) return;
    isCountdownRunning = true;

    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    const timer = setInterval(() => {
        if (isPaused) return;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                gloadPage(nextPage)
                isCountdownRunning = false;
            }
            timeLeft--;
}, 1000);}

function pauseCountdown() {
    isPaused = true;
    console.log("Countdown paused")
}



function resumeCountdown() {
    isPaused = false;
}


window.onload = function (){
    gloadPage(currentPage);
        
}

