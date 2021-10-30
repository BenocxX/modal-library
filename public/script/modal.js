import { $on } from "./helpers.js"

$on("[data-modal-launcher]", "click", onModalLaunch)

// TODO: Make modalType a value passed to the function by the user
// TODO: Make detail an object passed to the function by the user
function onModalLaunch(e) {
    const modalType = e.target.dataset.modalId
    const modal = document.querySelector("#" + modalType)
    const modalShownEvent = new CustomEvent("modal.shown", {
        detail: {
            test: "Test Value 123"
        }
    })

    modal.dispatchEvent(modalShownEvent)
}

const modal = document.querySelector(".modal")
modal.addEventListener("modal.shown", function (e) {
    const modal = this
    const shadow = document.querySelector(".modal-shadow")

    modal.classList.add("show")
    shadow.classList.add("show")

    shadow.addEventListener("click", (e) => {
        modal.classList.remove("show");
        shadow.classList.remove("show");
    })
})