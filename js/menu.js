function displayPage(pageId) {
    StopGame();
    $(".tabcontent").hide();
    $(pageId).show();

}

function openModal() {
    // $(".tabcontent").hide();
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

function addUser(){
    let user = document.getElementById("registerUsername").value;
    let pass = document.getElementById("registerPassword").value;
    if (user != null && pass != null)
        localStorage.setItem(user, pass);
    displayPage("#home");
}

function loginUser() {
    let user = document.getElementById("logUserName").value;
    let pass = document.getElementById("logPass").value;
    if (user in localStorage && localStorage.getItem(user) === pass) {
        displayPage("#settings")

    }
    WelcomeUser(user);

}
function WelcomeUser(name){
    document.getElementById('welcomeUser').innerText = "welcome back, " + name + "!";
}