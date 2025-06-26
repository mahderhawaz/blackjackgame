// script.js
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let balance = 100
let bet = 10
let wins = 0
let losses = 0
let draws = 0
let betPlaced = false

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let balanceEl = document.getElementById("balance-el")
let betInput = document.getElementById("bet-input")
let statsEl = document.getElementById("stats-el")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function updateUI() {
    balanceEl.textContent = `Balance: $${balance}`
    statsEl.textContent = `Wins: ${wins} | Losses: ${losses} | Draws: ${draws}`
}

function placeBet() {
    bet = parseInt(betInput.value)
    if (!isAlive && balance >= bet && bet > 0) {
        betPlaced = true
        messageEl.textContent = `Bet of $${bet} placed. Click START GAME!`
    } else if (balance < bet) {
        messageEl.textContent = "Not enough balance for that bet!"
    } else if (isAlive) {
        messageEl.textContent = "Finish the current round first!"
    }
}

function startGame() {
    if (!betPlaced) {
        messageEl.textContent = "Place your bet first!"
        return
    }
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" ")
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        balance += bet
        wins++
        betPlaced = false
    } else {
        message = "You're out of the game!"
        isAlive = false
        balance -= bet
        losses++
        betPlaced = false
    }
    messageEl.textContent = message
    updateUI()
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        if (sum > 21) {
            isAlive = false
            balance -= bet
            losses++
            betPlaced = false
        } else if (sum === 21) {
            hasBlackJack = true
            balance += bet
            wins++
            betPlaced = false
        }
        renderGame()
    }
}

function resetGame() {
    balance = 100
    wins = 0
    losses = 0
    draws = 0
    betPlaced = false
    isAlive = false
    hasBlackJack = false
    cards = []
    sum = 0
    messageEl.textContent = "Want to play a round?"
    cardsEl.textContent = "Cards: "
    sumEl.textContent = "Sum: "
    updateUI()
}

updateUI()