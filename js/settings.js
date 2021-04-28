let keyleft;
let keyright;
let keydown;
let keyup;
let ballsAmount;
let monstersAmount;
let timePick;
let color5pt;
let color15pt;
let color25pt;	

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
    SaveSettings();
    Start();
}

function SaveSettings(){
	keyleft =  document.getElementById("keyleft").value;
	keyright = document.getElementById("keyright").value;
	keydown = document.getElementById("keydown").value;
	keyup = document.getElementById("keyup").value;

	ballsAmount = document.getElementById("ballsAmountChosen").value;
    monstersAmount = document.getElementById("monstersAmountChosen").value;
    timePick = document.getElementById("timeChosen").value;

	color5pt = document.getElementById("colorPick5").value;
	color15pt = document.getElementById("colorPick15").value;
	color25pt = document.getElementById("colorPick25").value;	
}

function DisplaySettings(){
	$("#keyUpDisplay").text(keyup);
	$("#keyLeftDisplay").text(keydown);
	$("#keyDownDisplay").text(keyleft);
	$("#keyRightDisplay").text(keyright);

	$("#balls").text(ballsAmount);
	$("#monsters").text(monstersAmount);
	$("#gameTotal").text(timePick);

	$("#color5").val(color5pt);
	$("#color15").val(color15pt);
	$("#color25").val(color25pt);
}