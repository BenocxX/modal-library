import * as md from "./modal.js"

const humberger = document.querySelector(".navbar-humberger");
humberger.addEventListener("click", () => {
    let links = document.querySelector(".navbar-links");
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
})

// Doc: Creating an alert modal
const alertModalButton = document.querySelector(".alert-button")
alertModalButton.addEventListener("click", (e) => {
    md.showAlertModal();
})

// Doc: Creating an alert modal with custom info & a callback
const alertModalButton2 = document.querySelector(".alert-button2")
alertModalButton2.addEventListener("click", (e) => {
    md.showAlertModal({
        title: "Custom Alert Title",
        text: "My custom alert description"
    }, () => {
        alert("This is a callback!");
    });
})

// Doc: Creating a confirm modal
const confirmModalButton = document.querySelector(".confirm-button");
confirmModalButton.addEventListener("click", (e) => {
    md.showConfirmModal()
})

// Doc: Creating a confirm modal with custom info
const confirmModalButton2 = document.querySelector(".confirm-button2")
confirmModalButton2.addEventListener("click", (e) => {
    md.showConfirmModal({
        title: "Custom Alert Title",
        text: "My custom alert description",
        confirmButton: "Custom confirm button",
        denyButton: "Custom deny button"
    }, (answer) => {
        if (answer) {
            alert("User confirmed");
        } else {
            alert("User denied");
        }
    });
})

// Doc: Creating a basic modal
const modalLaunchers = document.querySelectorAll("[data-modal-launcher]")
for (const launcher of modalLaunchers) {
    launcher.addEventListener("click", (e) => {
        md.onModalLaunch(e, {
            title: "",
            text: ""
        });
    });
}

// Doc: Customizing elements in the modal
const modal2 = document.querySelector("#exampleModal2")
modal2.addEventListener("modal.shown", function (e) {
    const dialog = this.querySelector(".modal-dialog")
    const dialogTitle = dialog.querySelector("h3")
    const dialogText = dialog.querySelector("p")

    dialogTitle.innerText = "My custom title"
    dialogText.innerText = "My custom text"
})

// Doc: Passing info through modal
document.querySelector("#buttonExample3")
    .addEventListener("click", (e) => {
        md.onModalLaunch(e, {
            title: "Where am I from?",
            text: "I am text coming from the \"detail\" parameter!"
        })
    })

const modal3 = document.querySelector("#exampleModal3")
modal3.addEventListener("modal.shown", function (e) {
    const dialog = this.querySelector(".modal-dialog")
    const dialogTitle = dialog.querySelector("h3")
    const dialogText = dialog.querySelector("p")

    dialogTitle.innerText = e.detail.title
    dialogText.innerText = e.detail.text
})

modal3.addEventListener("modal.close", function (e) {
    // Your code...
})