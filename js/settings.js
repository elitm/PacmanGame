function ChooseRandom() {

    document.getElementById("colorPick5").value = GetRandomColor();
    document.getElementById("colorPick15").value = GetRandomColor();
    document.getElementById("colorPick25").value = GetRandomColor();

    document.getElementById("ballsAmountChosen").value = GetRandomNumber(50, 90);
    document.getElementById("monstersAmountChosen").value = GetRandomNumber(1, 4);
    document.getElementById("timeChosen").value = GetRandomNumber(60, 600);

}

/**
 * @return {string}
 */
function GetRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {

    displayPage("#game");
    Start();
}