import Web3 from "web3";
import Game from '../build/contracts/Game.json';

let web3;
let game;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            window.ethereum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.ethereum)
                    );
                })
                .catch(e => {
                    reject(e);
                });
            return;
        }
        if (typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        resolve(new Web3('http://localhost:9545'));
    });
};

const initContract = () => {
    let deployementKey = Object.keys(Game.networks)[0];
    console.log("Network", deployementKey);
    return new web3.eth.Contract(
        Game.abi,
        Game
            .networks[deployementKey]
            .address
    );
};

const initApp = () => {
    var start_button = document.getElementById("start");
    var add_two_button = document.getElementById('addTwo');
    var add_three_button = document.getElementById('addThree');

    var message = document.getElementById('message');
    var total = document.getElementById('total');
    var prize = document.getElementById('prize');

    let accounts = [];
    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
        });

    var showMessage = function () {
        game.methods.showMessage().call()
            .then((_message) => {
                message.innerHTML = _message;
            })
            .then(showScore)
            .then(showTotalScore);
    }

    var showScore = function () {
        game.methods.currentPrize().call()
            .then((_message) => {
                prize.innerHTML = "Current Prize: " + _message;
            });
    }

    var showTotalScore = function () {
        game.methods.totalScore().call()
            .then((_message) => {
                total.innerHTML = "Total Score: " + _message;
            })
    }

    start_button.addEventListener('click', (e) => {
        e.preventDefault();

        game.methods
            .start()
            .send({ from: accounts[0] })
            .then(showMessage);
    });

    add_two_button.addEventListener('click', (e) => {
        e.preventDefault();

        game.methods
            .addTwo()
            .send({ from: accounts[0] })
            .then(showMessage);
    });

    add_three_button.addEventListener('click', (e) => {
        e.preventDefault();

        game.methods
            .addThree()
            .send({ from: accounts[0] })
            .then(showMessage);
    })

}

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            game = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
})