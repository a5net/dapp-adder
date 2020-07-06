var web3 = new Web3(url);
var gameContract = new web3.eth.Contract(contractABI, contractAddress);
var accounts = [];

var start_button = document.getElementById("start");
var add_two_button = document.getElementById('addTwo');
var add_three_button = document.getElementById('addThree');

var message = document.getElementById('message');
var total = document.getElementById('total');
var prize = document.getElementById('prize');

var transaction_details = null;

web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
        transaction_details = { from: accounts[1], gas: 3000000 };
    });

start_button.onclick = startGame;
add_two_button.onclick = addTwo;
add_three_button.onclick = addThree;

function startGame() {
    gameContract.methods.start()
        .send(transaction_details)
        .then(displayMessage)
        .then(displayTotalScore)
        .then(displayCurrentPrize);
}

function addTwo() {
    gameContract.methods.addTwo()
        .send(transaction_details)
        .then(displayMessage)
        .then(displayTotalScore)
        .then(displayCurrentPrize);
}

function addThree() {
    gameContract.methods.addThree()
        .send(transaction_details)
        .then(displayMessage)
        .then(displayTotalScore)
        .then(displayCurrentPrize);
}

function displayMessage() {
    gameContract.methods
        .showMessage()
        .call()
        .then((data) => {
            message.innerHTML = data;
        });
}

function displayTotalScore() {
    gameContract.methods
        .totalScore()
        .call()
        .then((data) => {
            total.innerHTML = "Total Score: " + data;
        });
}

function displayCurrentPrize() {
    gameContract.methods
        .currentPrize()
        .call()
        .then((data) => {
            prize.innerHTML = "Current prize: " + data;
        })
}