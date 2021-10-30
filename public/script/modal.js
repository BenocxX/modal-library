import { $on } from "./helpers.js"

export function onModalLaunch(e, detail) {
    const modalType = e.target.dataset.modalId
    const modal = document.querySelector("#" + modalType)
    const modalShownEvent = new CustomEvent("modal.shown", {
        detail
    })

    modal.dispatchEvent(modalShownEvent)

    const shadow = document.querySelector(".modal-shadow")
    modal.classList.add("show");
    shadow.classList.add("show");

    shadow.addEventListener("click", (e) => {
        modal.classList.remove("show");
        shadow.classList.remove("show");
    })
}