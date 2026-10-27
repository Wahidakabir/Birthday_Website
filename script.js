const brotherName = "Bhaiya";
const secretPassword = "suitup";

let currentQuestionIndex = 0;
let currentPhotoIndex = 0;
let passwordStage = false;
let candleLit = true;
let typingTimeout = null;

// Load Joey's face image for the arcade game
const joeyImg = new Image();
joeyImg.src = "images/joey.png";

// SITCOM QUIZ QUESTIONS WITH ICON MAPPINGS
const questions = [
    {
        show: "THE OFFICE",
        text: "What is the name of Dwight Schrute's cousin who runs a beet farm and bed & breakfast with him?",
        answers: ["mose", "moshe", "cousin mose"],
        icon: "images/icon1.png",
        sound: "audio/correct1.mp3"
    },
    {
        show: "THE OFFICE",
        text: "Finish Jim Halpert's famous prank: Putting Dwight's personal items inside a green _________.",
        answers: ["jello", "jell-o"],
        icon: "images/icon2.jpg",
        sound: "audio/correct2.mp3"
    },
    {
        show: "FRIENDS",
        text: "What is the name of Joey Tribbiani's beloved penguin plush toy?",
        answers: ["hugsy"],
        icon: "images/icon3.jpg",
        sound: "audio/correct3.mp3"
    },
    {
        show: "FRIENDS",
        text: "Complete Ross's famous shout: 'Pivot! Pivot! PIVOT! Shut up, shut up, ______!'",
        answers: ["shut up"],
        icon: "images/icon4.jpg",
        sound: "audio/correct4.mp3"
    },
    {
        show: "HOW I MET YOUR MOTHER",
        text: "What is the name of Barney's legendary book of dating plays?",
        answers: ["the playbook", "playbook", "the play book"],
        icon: "images/icon5.jpg",
        sound: "audio/correct5.mp3"
    },
    {
        show: "HOW I MET YOUR MOTHER",
        text: "What musical instrument does Ted famously steal for Robin?",
        answers: ["french horn", "blue french horn"],
        icon: "images/icon6.jpg",
        sound: "audio/correct6.mp3"
    }
];

// SARCASTIC WRONG-ANSWER REPLIES
const funnyReplies = [
    "That's what she said! Wait... that answer is still wrong!",
    "Identity theft is not a joke, Bhaiya!",
    "Challenge rejected! Try again!",
    "Could your answer BE any more wrong?",
    "False. Even Dwight Schrute would be disappointed.",
    "Suit up, Bhaiya! You're going to need another attempt.",
    "PIVOT! PIVOT! PIVOT... to a different answer!",
    "Michael Scott would call a meeting to discuss that answer.",
    "Legendary wrong answer. Unfortunately, this isn't The Playbook.",
    "Joey doesn't share food, and I don't share correct answers!",
    "That's a bold strategy, Bhaiya. Let's see if it pays off.",
    "I award you zero points. And may God have mercy on your soul."
];


// PHOTO MEMORY GALLERY in script.js
const photos = [
    { src: "images/photo1.jpg", caption: "" },
    { src: "images/photo2.JPG", caption: "" }, // changed to .JPG
    { src: "images/photo3.JPG", caption: "" },         // changed to .JPG
    { src: "images/photo4.jpg", caption: "" },
    { src: "images/photo6.jpg", caption: "" },
    { src: "images/photo7.JPG", caption: "" },     // changed to .JPG
    { src: "images/photo9.jpg", caption: "" },
    { src: "images/photo10.jpg", caption: "" }
];
// TYPEWRITER LETTER PARAGRAPHS (YOUR CUSTOM LETTER)
const letterParagraphs = [
    "Dear Bhaiya,",
    "HAPPY BIRTHDAY!!",
    "This year is a little different for all of us. Last year, on your birthday, you wished that we could all be together on your birthday. Well, not physically, but virtually, we are all together! In Shaa Allah, we will always stay like this, ALWAYS & FOREVER.",
    "You know, you’ve celebrated nine birthdays without me being there. Ever since I was old enough to understand what birthdays meant, I’ve celebrated them with you. That’s why this one hits differently.",
    "I really miss you. I never thought home would feel this empty without your irritating existence. Please come home this year. I really want to hug you.",
    "I tried to do something different this time, and I also wanted to flex that you have a coder sister now. I hope it made you happy.",
    "You are the best brother I could ever ask for. I know you will always be by my side, and that gives me the strength to face this world. Over the years, you’ve become my Ross, and I’m like Monica. Just like them, no matter what happens, we’ll always have each other. And from my side, I promise you this: you will always find me by your side, no matter what.",
    "Happy birthday once again! I hope you get everything you dream of and everything you pray for. May Allah bless you with endless happiness, success, and all the beautiful things you deserve.",
    "(Btw, bacha kale bolchila engineer hoile amake remote-control gari baniye diba. Thak, ami-i engineer hoye tomake ekta gift baniye dilam!)",
    "Yours,",
    "Dekhte innocent, but shoytan rupi bon.",
    "Barney: Wait for it..."
];

// DOM ELEMENTS (SCREENS)
const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const arcadeScreen = document.getElementById("arcade-screen");
const cakeScreen = document.getElementById("cake-screen");
const envelopeScreen = document.getElementById("envelope-screen");

const startButton = document.getElementById("start-button");
const showNameEl = document.getElementById("show-name");
const questionCounterEl = document.getElementById("question-counter");
const questionTextEl = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitAnswerBtn = document.getElementById("submit-answer");
const prevAnswerBtn = document.getElementById("prev-answer");
const feedbackMessage = document.getElementById("feedback-message");
const quizIconImg = document.getElementById("quiz-icon");

// APPROVED / REJECTED STAMP + GREEN / RED SCREEN LIGHT
const statusLight = document.createElement("div");
statusLight.className = "status-light";
document.body.appendChild(statusLight);

function flashLight(color) {
    statusLight.classList.remove("green", "red");
    void statusLight.offsetWidth; // restart animation
    statusLight.classList.add(color);
}

function setQuizResult(state) {
    quizScreen.classList.remove("result-correct", "result-wrong");
    void quizScreen.offsetWidth; // restart stamp animation
    if (state === "correct") quizScreen.classList.add("result-correct");
    if (state === "wrong") quizScreen.classList.add("result-wrong");
}

function shakeQuizCard() {
    quizScreen.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-9px)" },
            { transform: "translateX(9px)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(0)" }
        ],
        { duration: 420, easing: "ease-in-out" }
    );
}

const flame = document.getElementById("flame");
const blowButton = document.getElementById("blow-button");
const envelope = document.getElementById("envelope");
const bgSong = document.getElementById("bg-song");

const galleryModal = document.getElementById("gallery-modal");
const closeGallery = document.getElementById("close-gallery");
const galleryImg = document.getElementById("gallery-img");
const photoCaption = document.getElementById("photo-caption");
const photoCounter = document.getElementById("photo-counter");
const prevPhotoBtn = document.getElementById("prev-photo");
const nextPhotoBtn = document.getElementById("next-photo");

const frameTransitionOverlay = document.getElementById("frame-transition-overlay");
const expandingFrame = document.getElementById("expanding-frame");

const letterModal = document.getElementById("letter-modal");
const letterBodyContainer = document.getElementById("letter-body-container");
const closeLetterBtn = document.getElementById("close-letter");
const restartExperienceBtn = document.getElementById("restart-experience");

const videoModal = document.getElementById("video-modal");
const closeVideoBtn = document.getElementById("close-video");
const wishesVideo = document.getElementById("wishes-video");
const restartFromVideoBtn = document.getElementById("restart-from-video");

// AUDIO ELEMENTS
const arcadeAudio = document.getElementById('arcade-audio');
const wrongAudio = document.getElementById('wrong-audio');
const correctAudio = document.getElementById('correct-audio');
const hbdAudio = document.getElementById('hbd-audio'); 
const waitAudio = document.getElementById('wait-audio');
const crackAudio = document.getElementById('crack-audio');
const dwightAudio = document.getElementById('dwight-audio');

function playSitcomSound(type) {
    if (type === 'correct' && correctAudio) {
        correctAudio.currentTime = 0;
        correctAudio.play().catch(err => console.log("Audio play blocked:", err));
    } else if (type === 'wrong' && wrongAudio) {
        wrongAudio.currentTime = 0;
        wrongAudio.play().catch(err => console.log("Audio play blocked:", err));
    }
}

// A DIFFERENT "CORRECT" SOUND FOR EACH QUESTION
const questionSounds = questions.map(q => {
    const a = new Audio(q.sound);
    a.preload = "auto";
    return a;
});

function playQuestionCorrectSound(index) {
    const a = questionSounds[index];
    if (!a) {
        playSitcomSound('correct');
        return;
    }
    a.currentTime = 0;
    a.play().catch(() => playSitcomSound('correct'));
}

// RESTORE PROGRESS ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
    const savedScreen = localStorage.getItem("birthday_screen");
    const savedQuestionIndex = localStorage.getItem("birthday_questionIndex");
    const savedPasswordStage = localStorage.getItem("birthday_passwordStage");
    const savedCandleLit = localStorage.getItem("birthday_candleLit");

    introScreen.style.display = "none";
    quizScreen.style.display = "none";
    arcadeScreen.style.display = "none";
    cakeScreen.style.display = "none";
    envelopeScreen.style.display = "none";

    if (savedScreen === "quiz") {
        quizScreen.style.display = "block";
        if (savedQuestionIndex !== null) currentQuestionIndex = parseInt(savedQuestionIndex);
        if (savedPasswordStage === "true") passwordStage = true;
        loadQuestion();
    } else if (savedScreen === "arcade") {
        arcadeScreen.style.display = "block";
        initPacmanGame();
    } else if (savedScreen === "cake") {
        cakeScreen.style.display = "block";
        if (savedCandleLit === "false") {
            candleLit = false;
            if (flame) flame.classList.add("blown-out");
            if (blowButton) {
                blowButton.textContent = "Wish made! ✨";
                blowButton.disabled = true;
            }
        } else {
            setupMicBlowDetection();
        }
    } else if (savedScreen === "envelope") {
        envelopeScreen.style.display = "block";
    } else {
        introScreen.style.display = "block";
    }
});

if (startButton) {
    startButton.addEventListener("click", () => {
        localStorage.setItem("birthday_screen", "quiz");
        localStorage.setItem("birthday_questionIndex", 0);
        localStorage.setItem("birthday_passwordStage", false);

        introScreen.style.display = "none";
        quizScreen.style.display = "block";
        loadQuestion();
        answerInput.focus();
    });
}

if (submitAnswerBtn) {
    submitAnswerBtn.addEventListener("click", checkAnswer);
}

if (answerInput) {
    answerInput.addEventListener("input", () => setQuizResult(null));

    answerInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
}

if (prevAnswerBtn) {
    prevAnswerBtn.addEventListener("click", () => {
        if (passwordStage) {
            passwordStage = false;
            currentQuestionIndex = questions.length - 1;
        } else if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
        } else {
            localStorage.setItem("birthday_screen", "intro");
            quizScreen.style.display = "none";
            introScreen.style.display = "block";
            return;
        }
        loadQuestion();
    });
}

function loadQuestion() {
    setQuizResult(null);
    feedbackMessage.textContent = "";
    answerInput.value = "";
    answerInput.disabled = false;
    submitAnswerBtn.disabled = false;

    localStorage.setItem("birthday_questionIndex", currentQuestionIndex);
    localStorage.setItem("birthday_passwordStage", passwordStage);

    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];

        if (quizIconImg) {
            quizIconImg.style.display = "inline-block";
            quizIconImg.src = q.icon;
        }

        showNameEl.textContent = q.show;
        questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionTextEl.textContent = q.text;

        answerInput.type = "text";
        answerInput.placeholder = "Type your answer...";
        submitAnswerBtn.textContent = "Submit Answer";
    } else {
        passwordStage = true;
        localStorage.setItem("birthday_passwordStage", true);

        if (quizIconImg) {
            quizIconImg.style.display = "none";
        }

        showNameEl.textContent = "THE FINAL CHALLENGE";
        questionCounterEl.textContent = "ONE LAST THING...";
        questionTextEl.textContent = "Legendary! But before you get your birthday surprise, answer this: What would Barney Stinson tell you to do before any legendary adventure? Hint: It's his favorite two-word command.";
        answerInput.type = "password";
        answerInput.placeholder = "Enter the secret password...";
        submitAnswerBtn.textContent = "Unlock Arcade Bonus";
    }
}

function normalizeAnswer(answer) {
    return answer.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function checkAnswer() {
    const userAns = normalizeAnswer(answerInput.value);

    if (userAns === "") {
        feedbackMessage.textContent = "Seriously, Bhaiya? Even Joey would at least take a guess!";
        return;
    }

    if (passwordStage) {
        if (userAns === normalizeAnswer(secretPassword)) {
            playSitcomSound('correct');
            setQuizResult('correct');
            flashLight('green');
            feedbackMessage.textContent = "Access granted! Loading the bonus round...";
            submitAnswerBtn.disabled = true;
            answerInput.disabled = true;

            setTimeout(() => {
                localStorage.setItem("birthday_screen", "arcade");

                quizScreen.style.display = "none";
                arcadeScreen.style.display = "block";

                window.scrollTo(0, 0);
                initPacmanGame();
            }, 1300);
        } else {
            playSitcomSound('wrong');
            setQuizResult('wrong');
            flashLight('red');
            shakeQuizCard();
            feedbackMessage.textContent = "Wrong password! Your birthday surprise is playing hard to get. Try again!";
            answerInput.value = "";
            answerInput.focus();
        }

        return;
    }

    const q = questions[currentQuestionIndex];
    const isCorrect = q.answers.some(answer => userAns === normalizeAnswer(answer));

    if (isCorrect) {
        playQuestionCorrectSound(currentQuestionIndex);
        setQuizResult('correct');
        flashLight('green');
        feedbackMessage.textContent = "Correct! Challenge accepted! 🎉";

        submitAnswerBtn.disabled = true;
        answerInput.disabled = true;

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
            answerInput.focus();
        }, 1500);
    } else {
        playSitcomSound('wrong');
        setQuizResult('wrong');
        flashLight('red');
        shakeQuizCard();
        const randomIndex = Math.floor(Math.random() * funnyReplies.length);
        feedbackMessage.textContent = funnyReplies[randomIndex];
        answerInput.value = "";
        answerInput.focus();
    }
}

// ABIR'S CAKE RUN ARCADE GAME & KONAMI CHEAT
const canvas = document.getElementById("pacman-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const scoreEl = document.getElementById("p-score");
const arcadeStatus = document.getElementById("arcade-status");

let joey = { x: 40, y: 40, size: 14, speed: 3, dx: 0, dy: 0 };
let pizzaSlices = [];
let pizzaScore = 0;
let gameInterval = null;
let arcadeActive = false;

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

window.addEventListener('keydown', (e) => {
    if (document.getElementById("arcade-screen").style.display === "block") {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                pizzaScore = 10;
                if (scoreEl) scoreEl.textContent = pizzaScore;
                if (arcadeStatus) arcadeStatus.textContent = "🎉 KONAMI CHEAT UNLOCKED! Abir doesn't share cake!";
                clearInterval(gameInterval);

                if (arcadeAudio) {
                    arcadeAudio.pause();
                }
                
                setTimeout(() => {
                    arcadeScreen.style.display = "none";
                    cakeScreen.style.display = "block";
                    localStorage.setItem("birthday_screen", "cake");
                    window.scrollTo(0, 0);
                    setupMicBlowDetection();
                }, 1500);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    }
});

function initPacmanGame() {
    pizzaScore = 0;
    if (scoreEl) scoreEl.textContent = pizzaScore;
    joey.x = 40;
    joey.y = 40;
    joey.dx = 0;
    joey.dy = 0;
    if (arcadeStatus) arcadeStatus.textContent = "Use Arrow Keys to help Abir collect 10 slices of Cake!";

    if (arcadeAudio) {
        arcadeAudio.currentTime = 0;
        arcadeAudio.play().catch(err => console.log("Arcade audio play blocked:", err));
    }

    pizzaSlices = [];
    for (let i = 0; i < 12; i++) {
        pizzaSlices.push({
            x: Math.floor(Math.random() * 220) + 30,
            y: Math.floor(Math.random() * 220) + 30,
            eaten: false
        });
    }

    if (!arcadeActive) {
        arcadeActive = true;
        window.addEventListener("keydown", handlePacmanKeys);
        gameInterval = setInterval(updatePacmanGame, 30);
    }
}

function handlePacmanKeys(e) {
    if (document.getElementById("arcade-screen").style.display === "none") return;
    
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }

    if (e.key === "ArrowUp") { joey.dx = 0; joey.dy = -joey.speed; }
    if (e.key === "ArrowDown") { joey.dx = 0; joey.dy = joey.speed; }
    if (e.key === "ArrowLeft") { joey.dx = -joey.speed; joey.dy = 0; }
    if (e.key === "ArrowRight") { joey.dx = joey.speed; joey.dy = 0; }
}

function updatePacmanGame() {
    if (!ctx || document.getElementById("arcade-screen").style.display === "none") return;

    joey.x += joey.dx;
    joey.y += joey.dy;

    if (joey.x < 15) joey.x = 15;
    if (joey.x > canvas.width - 15) joey.x = canvas.width - 15;
    if (joey.y < 15) joey.y = 15;
    if (joey.y > canvas.height - 15) joey.y = canvas.height - 15;

    pizzaSlices.forEach(slice => {
        if (!slice.eaten) {
            let dist = Math.hypot(joey.x - slice.x, joey.y - slice.y);
            if (dist < joey.size + 10) {
                slice.eaten = true;
                pizzaScore++;
                if (scoreEl) scoreEl.textContent = pizzaScore;

                if (pizzaScore >= 10) {
                    if (arcadeStatus) arcadeStatus.textContent = "🎉 ABIR DOESN'T SHARE CAKE! Level Cleared!";
                    joey.dx = 0;
                    joey.dy = 0;
                    
                    clearInterval(gameInterval);

                    if (arcadeAudio) {
                        arcadeAudio.pause();
                    }
                    
                    setTimeout(() => {
                        arcadeScreen.style.display = "none";
                        cakeScreen.style.display = "block";
                        localStorage.setItem("birthday_screen", "cake");
                        window.scrollTo(0, 0);
                        setupMicBlowDetection();
                    }, 1500);
                }
            }
        }
    });

    ctx.fillStyle = "#e6eaee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    pizzaSlices.forEach(slice => {
        if (!slice.eaten) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("🍰", slice.x, slice.y);
        }
    });

    if (joeyImg.complete && joeyImg.naturalHeight !== 0) {
        const size = 32;
        ctx.drawImage(joeyImg, joey.x - size / 2, joey.y - size / 2, size, size);
    } else {
        ctx.font = "22px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("😋", joey.x, joey.y);
    }
}

// MICROPHONE BLOW DETECTION
let audioContext = null;
let microphone = null;
let analyser = null;
let isListeningToMic = false;

function setupMicBlowDetection() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            
            microphone.connect(analyser);
            analyser.fftSize = 256;
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            isListeningToMic = true;
            const micInstruction = document.getElementById("mic-instruction");
            if (micInstruction) {
                micInstruction.textContent = "🎤 Mic active! Blow into your mic to blow out the candle!";
                micInstruction.style.color = "#5f8250";
            }

            function detectBlow() {
                if (!candleLit || !isListeningToMic) return;

                analyser.getByteFrequencyData(dataArray);
                
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                let average = sum / bufferLength;

                if (average > 45) {
                    triggerBlowOut();
                    isListeningToMic = false;
                    return;
                }

                requestAnimationFrame(detectBlow);
            }

            detectBlow();
        })
        .catch(err => {
            const micInstruction = document.getElementById("mic-instruction");
            if (micInstruction) {
                micInstruction.textContent = "🎤 (Mic blocked - click the button instead!)";
            }
        });
}

function triggerBlowOut() {
    if (!candleLit) return;

    candleLit = false;
    localStorage.setItem("birthday_candleLit", false);

    if (flame) flame.classList.add("blown-out");

    if (blowButton) {
        blowButton.textContent = "Wish made! ✨";
        blowButton.disabled = true;
    }

    const micInstruction = document.getElementById("mic-instruction");
    if (micInstruction) micInstruction.style.display = "none";

    setTimeout(() => {
        localStorage.setItem("birthday_screen", "envelope");
        cakeScreen.style.display = "none";
        envelopeScreen.style.display = "block";
        window.scrollTo(0, 0);
    }, 900);
}

if (blowButton) {
    blowButton.addEventListener("click", () => {
        triggerBlowOut();
    });
}

// WAX SEAL MECHANIC
let waxSealBroken = false;
const waxSeal = document.getElementById("wax-seal");

if (waxSeal) {
    waxSeal.addEventListener("click", (e) => {
        e.stopPropagation();
        if (waxSealBroken) return;
        
        waxSealBroken = true;
        waxSeal.classList.add("broken");

        if (crackAudio) {
            crackAudio.currentTime = 0;
            crackAudio.play().catch(err => console.log("Crack audio blocked:", err));
        }
    });
}

// DWIGHT SCHRUTE EASTER EGG
const dwightQuote = document.getElementById("dwight-quote");

if (dwightQuote) {
    dwightQuote.addEventListener("click", () => {
        const currentScreen = document.querySelector(".app-screen:not([style*='display: none'])");
        if (currentScreen) {
            currentScreen.classList.add("dwight-mode");
            const titleEl = currentScreen.querySelector("h1");
            const originalTitle = titleEl ? titleEl.textContent : "";
            if (titleEl) titleEl.textContent = "It is your birthday.";

            if (dwightAudio) {
                dwightAudio.currentTime = 0;
                dwightAudio.play().catch(err => console.log("Dwight audio blocked:", err));
            }

            dwightQuote.textContent = "— Dwight Schrute: 'It is a statement of fact.' 🦝";

            setTimeout(() => {
                currentScreen.classList.remove("dwight-mode");
                if (titleEl) titleEl.textContent = originalTitle;
                dwightQuote.textContent = '"It is your birthday." 🥳';
            }, 4500);
        }
    });
}

// DUNDER MIFFLIN PARTY PLANNING COMMITTEE TOGGLE
let committeeModeActive = false;

function toggleCommitteeMode() {
    committeeModeActive = !committeeModeActive;
    
    const currentScreen = document.querySelector(".app-screen:not([style*='display: none'])");
    if (!currentScreen) return;

    const titleEl = currentScreen.querySelector("h1");
    const eyebrowEl = currentScreen.querySelector(".eyebrow");
    const subtitleEl = currentScreen.querySelector("h2");

    if (committeeModeActive) {
        currentScreen.classList.add("committee-mode");
        
        if (eyebrowEl) eyebrowEl.dataset.originalEyebrow = eyebrowEl.textContent;
        if (titleEl) titleEl.dataset.originalTitle = titleEl.textContent;
        if (subtitleEl) subtitleEl.dataset.originalSubtitle = subtitleEl.textContent;

        if (eyebrowEl) eyebrowEl.textContent = "DUNDER MIFFLIN PAPER COMPANY — SCRANTON BRANCH";
        if (titleEl) titleEl.textContent = "Meeting Agenda: Birthday Party Committee";
        if (subtitleEl) subtitleEl.textContent = "Co-Chairs: Angela Martin & Dwight Schrute";

        const descP = currentScreen.querySelector("p:not(.eyebrow)");
        if (descP && currentScreen.id === "intro-screen") {
            descP.dataset.originalText = descP.innerHTML;
            descP.innerHTML = "<b>Discussion Items:</b><br>1. Approval of mandatory fun activities.<br>2. Verification of stream-of-consciousness compliance.<br>3. Sarcastic comments vs. actual gratitude metrics.<br><i>Note: Cupcakes must be grey-toned to maintain workplace professionalism.</i>";
        }
    } else {
        currentScreen.classList.remove("committee-mode");
        
        if (eyebrowEl && eyebrowEl.dataset.originalEyebrow) eyebrowEl.textContent = eyebrowEl.dataset.originalEyebrow;
        if (titleEl && titleEl.dataset.originalTitle) titleEl.textContent = titleEl.dataset.originalTitle;
        if (subtitleEl && subtitleEl.dataset.originalSubtitle) subtitleEl.textContent = subtitleEl.dataset.originalSubtitle;

        const descP = currentScreen.querySelector("p:not(.eyebrow)");
        if (descP && descP.dataset.originalText) {
            descP.innerHTML = descP.dataset.originalText;
        }
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("committee-badge")) {
        toggleCommitteeMode();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === 'm' && document.activeElement.tagName !== 'INPUT') {
        toggleCommitteeMode();
    }
});

// ENVELOPE OPENING & PHOTOGRAPH SONG
if (envelope) {
    envelope.addEventListener("click", () => {
        if (!waxSealBroken) {
            envelope.classList.add("shake");
            setTimeout(() => envelope.classList.remove("shake"), 400);
            
            const sealHint = document.createElement("div");
            sealHint.textContent = "⚠️ Break the wax seal first, Bhaiya!";
            sealHint.style.cssText = "position:absolute; top:-35px; left:50%; transform:translateX(-50%); background:#ef4444; color:white; padding:4px 10px; border-radius:8px; font-size:12px; font-weight:800; z-index:10; white-space:nowrap;";
            envelope.appendChild(sealHint);
            setTimeout(() => sealHint.remove(), 1500);
            return;
        }

        if (envelope.classList.contains("open")) return;

        if (bgSong) {
            bgSong.currentTime = 0;
            bgSong.play().catch(err => console.log("Music play blocked:", err));
        }

        envelope.classList.add("open");

        setTimeout(() => {
            currentPhotoIndex = 0;
            updateGalleryPhoto();

            envelopeScreen.style.display = "none";
            if (galleryModal) {
                galleryModal.style.display = "flex";
            }
            envelope.classList.remove("open");
        }, 950);
    });
}

if (closeGallery) {
    closeGallery.addEventListener("click", () => {
        galleryModal.style.display = "none";
        envelopeScreen.style.display = "block";
    });
}

if (prevPhotoBtn) {
    prevPhotoBtn.addEventListener("click", () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateGalleryPhoto();
    });
}

if (nextPhotoBtn) {
    nextPhotoBtn.addEventListener("click", () => {
        if (currentPhotoIndex === photos.length - 1) {
            if (bgSong) {
                bgSong.pause();
            }
            galleryModal.style.display = "none";

            expandingFrame.style.backgroundImage = `url('${photos[currentPhotoIndex].src}')`;
            frameTransitionOverlay.style.display = "flex";
            
            setTimeout(() => {
                frameTransitionOverlay.classList.add("active");
                expandingFrame.classList.add("expand");
            }, 50);

            setTimeout(() => {
                frameTransitionOverlay.style.display = "none";
                frameTransitionOverlay.classList.remove("active");
                expandingFrame.classList.remove("expand");

                if (letterModal) {
                    letterModal.style.display = "flex";
                }
                hbdAudio.currentTime = 0;
                hbdAudio.play().catch(err => console.log("HBD audio blocked:", err));

                startTypewriterEffect();
            }, 850);

            return;
        }

        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateGalleryPhoto();
    });
}

function startTypewriterEffect() {
    if (!letterBodyContainer) return;
    letterBodyContainer.innerHTML = "";

    let pIndex = 0;

    function typeParagraph() {
        if (pIndex >= letterParagraphs.length) {
            typingTimeout = setTimeout(() => {
                if (letterModal) letterModal.style.display = "none";
                hbdAudio.pause();

                if (videoModal) {
                    videoModal.style.display = "flex";
                    if (wishesVideo) {
                        wishesVideo.currentTime = 0;
                        wishesVideo.play().catch(err => console.log("Video play blocked:", err));
                    }
                }
            }, 1800);
            return;
        }

        const p = document.createElement("p");
        
        if (pIndex === letterParagraphs.length - 3) {
            p.style.cssText = "margin-top: 16px; font-weight: bold; color: #1f3a5a;";
        } else if (pIndex === letterParagraphs.length - 2) {
            p.style.cssText = "margin-top: 8px; font-weight: bold; color: #1f3a5a;";
        } else if (pIndex === letterParagraphs.length - 1) {
            p.style.cssText = "margin-top: 18px; font-style: italic; font-weight: bold; color: #d99a14; text-align: center; font-size: 32px;";
            
            if (waitAudio) {
                waitAudio.currentTime = 0;
                waitAudio.play().catch(err => console.log("Wait audio blocked:", err));
            }
        }
        
        letterBodyContainer.appendChild(p);

        const text = letterParagraphs[pIndex];
        let charIndex = 0;
        p.classList.add("typewriter-cursor");

        function typeChar() {
            if (charIndex < text.length) {
                p.textContent += text.charAt(charIndex);
                charIndex++;
                typingTimeout = setTimeout(typeChar, 45);
            } else {
                p.classList.remove("typewriter-cursor");
                pIndex++;
                typingTimeout = setTimeout(typeParagraph, 500);
            }
        }
        typeChar();
    }

    typeParagraph();
}

function updateGalleryPhoto() {
    const photo = photos[currentPhotoIndex];

    if (galleryImg) {
        galleryImg.src = photo.src;
        galleryImg.alt = `Memory ${currentPhotoIndex + 1}`;
    }

    if (photoCaption) {
        photoCaption.textContent = photo.caption;
    }

    if (photoCounter) {
        photoCounter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
    }

    if (nextPhotoBtn) {
        nextPhotoBtn.textContent = "Next";
    }
}

function closeLetterAndStopMusic() {
    if (letterModal) letterModal.style.display = "none";
    hbdAudio.pause();
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
}

if (closeLetterBtn) {
    closeLetterBtn.addEventListener("click", () => {
        closeLetterAndStopMusic();
        envelopeScreen.style.display = "block";
    });
}

if (restartExperienceBtn) {
    restartExperienceBtn.addEventListener("click", () => {
        closeLetterAndStopMusic();
        localStorage.clear();
        location.reload();
    });
}

function closeVideoModal() {
    if (videoModal) videoModal.style.display = "none";
    if (wishesVideo) {
        wishesVideo.pause();
        wishesVideo.currentTime = 0;
    }
}

if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", () => {
        closeVideoModal();
        envelopeScreen.style.display = "block";
    });
}

if (restartFromVideoBtn) {
    restartFromVideoBtn.addEventListener("click", () => {
        closeVideoModal();
        localStorage.clear();
        location.reload();
    });
}

window.addEventListener("click", event => {
    if (event.target === galleryModal) {
        galleryModal.style.display = "none";
        envelopeScreen.style.display = "block";
    }
    if (event.target === letterModal) {
        closeLetterAndStopMusic();
        envelopeScreen.style.display = "block";
    }
    if (event.target === videoModal) {
        closeVideoModal();
        envelopeScreen.style.display = "block";
    }
});

console.log("Retro Dunder Mifflin / Central Perk Birthday Experience fully loaded!");