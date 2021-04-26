function displayPage(pageId) {
    StopGame();
    $(".tabcontent").hide();
    $(pageId).show();

}

function startGame() {
    displayPage("#game");
    Start();
    }

function openModal() {
    $(".tabcontent").hide();
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = 'block';

    span.onclick = function () {  // When the user clicks on <span> (x), close the modal
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
});
}