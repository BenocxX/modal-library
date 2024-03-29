import * as md from "./modal.js";

const hamburger = document.querySelector(".navbar-hamburger");
hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    let links = document.querySelector(".navbar-links");
    links.style.display === "block" ? links.style.display = "none" : links.style.display = "block";
});

window.addEventListener('resize', (e) => {
    let links = document.querySelector(".navbar-links");
    e.currentTarget.innerWidth > 550 ? links.style.display = "flex" : links.style.display = "none";
});

// Doc: Creating an alert modal
const alertModalButton = document.querySelector(".alert-button");
alertModalButton.addEventListener("click", (e) => {
    md.showAlertModal();
});

// Doc: Creating an alert modal with custom info & a callback
const alertModalButton2 = document.querySelector(".alert-button2");
alertModalButton2.addEventListener("click", (e) => {
    md.showAlertModal({
        title: "Custom Alert Title",
        text: "My custom alert description"
    }, () => {
        alert("This is a callback!");
    });
});

// Doc: Creating a confirm modal
const confirmModalButton = document.querySelector(".confirm-button");
confirmModalButton.addEventListener("click", (e) => {
    md.showConfirmModal();
});

// Doc: Creating a confirm modal with custom info
const confirmModalButton2 = document.querySelector(".confirm-button2");
confirmModalButton2.addEventListener("click", (e) => {
    md.showConfirmModal({
        title: "Custom Alert Title",
        text: "My custom alert description",
        confirmButton: "Custom confirm button",
        denyButton: "Custom deny button"
    }, (answer) => {
        answer ? alert("User confirmed!") : alert("User denied!");
    });
});

// Doc: Creating an ajax modal
const ajaxModalButton = document.querySelector(".ajax-button");
ajaxModalButton.addEventListener("click", (e) => {
    md.showAjaxModal("modal-ajax.html");
});

// Doc: Creating a basic modal
const modalLaunchers = document.querySelectorAll("[data-modal-launcher]");
for (const launcher of modalLaunchers) {
    launcher.addEventListener("click", md.onModalLaunch);
}

// Doc: Customizing elements in the modal
const modal2 = document.querySelector("#exampleModal2");
modal2.addEventListener("modal.shown", function (e) {
    const dialog = this.querySelector(".modal-dialog");
    const dialogTitle = dialog.querySelector("h3");
    const dialogText = dialog.querySelector("p");

    dialogTitle.innerText = "My custom title";
    dialogText.innerText = "My custom text";
});

// Doc: Passing info through modal
document.querySelector("#buttonExample3")
    .addEventListener("click", (e) => {
        md.onModalLaunch(e, {
            title: "Where am I from?",
            text: "I am text coming from the \"detail\" parameter!"
        });
    });

const modal3 = document.querySelector("#exampleModal3");
modal3.addEventListener("modal.shown", function (e) {
    const dialog = this.querySelector(".modal-dialog");
    const dialogTitle = dialog.querySelector("h3");
    const dialogText = dialog.querySelector("p");

    dialogTitle.innerText = e.detail.title;
    dialogText.innerText = e.detail.text;
});

modal3.addEventListener("modal.close", function (e) {
    // Your code...
});