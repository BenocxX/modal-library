import { $on } from "./helpers.js"
import * as md from "./modal.js"

const modal = document.querySelector("#exampleModal")
modal.addEventListener("modal.shown", function (e) {
    const dialog = this.querySelector(".modal-dialog")
    const dialogTitle = dialog.querySelector("h3")
    const dialogText = dialog.querySelector("p")
    //const detail = e.detail

    dialogTitle.innerText = "My custom title"
    dialogText.innerText = "My custom text"
})