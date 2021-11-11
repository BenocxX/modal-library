export function showAlertButton() {
    const html = `
        <div class="modal" id="alertModal">
            <div class="modal-dialog">
                <div class="modal-header-container">
                    <h3 class="modal-title">Alert !</h3>
                    <button class="modal-button">X</button>
                </div>
                <div class="modal-content-container">
                    <p class="modal-text">This is an alert</p>
                </div>
                <div class="modal-footer-container">
                    <button class="modal-button">Close</button>
                </div>
            </div>
        </div>
        
        <div class="modal-shadow"></div>
    `
    const alertModalContainer = document.querySelector(".alert-modal-container")
    alertModalContainer.innerHTML = html

    const modal = document.querySelector("#alertModal")
    const shadow = document.querySelector(".modal-shadow")
    modal.classList.add("show");
    shadow.classList.add("show");

    shadow.addEventListener("click", (e) => {
        modal.classList.remove("show");
        shadow.classList.remove("show");
    })
}

export function onModalLaunch(e, detail) {
    const modalType = e.target.dataset.modalTarget
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