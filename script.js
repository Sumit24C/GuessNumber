let rand = Math.floor(Math.random() * 100 + 1)
        console.log(rand)

        let guessCount = 0
        let ideaCount = 0
        let upperbound = 100
        let lowerbound = 1

        const guessInput = document.getElementById("guess-input")
        const guessBtn = document.getElementById("guess-btn")
        const restartBtn = document.getElementById("restart-btn")
        const displayMessages = document.getElementById("message")
        const dislayGuessCount = document.getElementById("guessCount")
        const dislayIdeaCount = document.getElementById("ideaCount")
        const hintBtn = document.getElementById("idea-btn")
        const hintPopup = document.getElementById("idea-popup")
        const hintMsg = document.getElementById("hint-msg")

        function display(message, guessCount) {
            displayMessages.textContent = message
            dislayGuessCount.textContent = guessCount
        }

        function processGuess() {

            const userGuess = guessInput.value

            if (isNaN(userGuess) || userGuess == "") {
                display("Invalid entry, Guess again")
                guessCount--
                guessInput.value = ""
                return;
            }
            const numberGuess = Number(userGuess)

            if (numberGuess > rand) {
                display("Oops wrong Guess, try again",guessCount)
                upperbound = numberGuess - 1
                if(ideaCount < 5){
                    hintMsg.textContent = "Too high, guess something smaller"
                }
            }
            else if (numberGuess < rand) {
                display("Oops wrong guess, Guess again",guessCount)
                lowerbound = numberGuess + 1
                if(ideaCount < 5){
                    hintMsg.textContent = "Too low, guess something bigger"
                }
            }
            else if (numberGuess == rand) {
                display("Congratulations, Your guess is right", guessCount)
                guessBtn.disabled = true
                hintBtn.disabled = true
                guessInput.disabled = true
            }

            guessInput.value = ""
        }

        guessBtn.addEventListener("click", function () {
            guessCount++
            processGuess()
        });

        guessInput.addEventListener("keydown", function (event) {
            if (event.key == "Enter") {
                event.preventDefault()
                guessCount++
                processGuess()
            }
        });

        restartBtn.addEventListener("click", function () {
            rand = Math.floor(Math.random() * 100 + 1)
            console.log(rand)
            guessCount = 0
            ideaCount = 0
            display("Game Restarted! Guess again", guessCount)
            dislayIdeaCount.textContent = ideaCount
            guessInput.disabled = false
            guessBtn.disabled = false
            hintBtn.disabled = false
            guessInput.value = ""
            hintMsg.textContent = ""
            guessInput.focus()
        })

        window.onload = function () {
            guessInput.focus()
        }

        hintBtn.addEventListener("click", function () {
            hintPopup.style.visibility = "visible";
            hintPopup.style.top = "85px";
            if (guessCount > 0) {
                if(ideaCount < 5){
                ideaCount++
                dislayIdeaCount.textContent = ideaCount
                }
                else{
                    dislayIdeaCount.textContent = "❌"
                }
            }
        });

        window.addEventListener("click", function (event) {
            if (!hintPopup.contains(event.target) && !hintBtn.contains(event.target)) {
                hintPopup.style.top = "10px";
                setTimeout(() => {
                    hintPopup.style.visibility = "hidden";
                }, 500);
            }
        });
