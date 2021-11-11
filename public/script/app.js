import * as md from "./modal.js"

// Doc: Creating an alert modal
const alertModalButton = document.querySelector(".alert-button")
alertModalButton.addEventListener("click", (e) => {
    md.showAlertButton()
})


// Doc: Creating a basic modal
const modalLaunchers = document.querySelectorAll("[data-modal-launcher]")
for (const launcher of modalLaunchers) {
    launcher.addEventListener("click", (e) => {
        md.onModalLaunch(e, {
            title: "",
            text: ""
        })
    })
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