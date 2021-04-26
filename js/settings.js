function displayPage(pageId) {
    $(".tabcontent").hide();
    $(pageId).show();

}

function startGame() {
    displayPage("#game");
    Start();
    }

function openModal() {
    let modal = document.getElementById("myModal")
 }