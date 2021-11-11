export function showAlertButton(detail) {
    if (detail === undefined) {
        detail = { title: "",  text: ""}
    }
    if (detail.title === "") {
        detail.title = "Alert!";
    }
    if (detail.text === "") {
        detail.text = "You are leaving the website!";
    }

    const html = `
        <div class="modal" id="alertModal">
            <div class="modal-dialog">
                <div class="modal-header-container">
                    <h3 class="modal-title">${detail.title}</h3>
                    <button data-close-button class="modal-button">X</button>
                </div>
                <div class="modal-content-container">
                    <p class="modal-text">${detail.text}</p>
                </div>
                <div class="modal-footer-container">
                    <button data-close-button class="modal-button">Close</button>
                </div>
            </div>
        </div>
        
        <div class="modal-shadow"></div>
    `
    const alertModalContainer = document.querySelector(".alert-modal-container")
    alertModalContainer.innerHTML = html

    const modal = document.querySelector("#alertModal");
    initEventListenerInModal(modal);
    initEventListenerInModal(modal);
}

export function onModalLaunch(e, detail) {
    const modalType = e.target.dataset.modalId;
    const modal = document.querySelector("#" + modalType);
    const modalShownEvent = new CustomEvent("modal.shown", {
        detail
    })

    modal.dispatchEvent(modalShownEvent);
    initEventListenerInModal(modal);
}

function initEventListenerInModal(modal) {
    const shadow = getShadow()
    showModal(modal, shadow)

    shadow.addEventListener("click", (e) => {
        closeModal(modal, shadow);
    })

    const closeButtons = modal.querySelectorAll("[data-close-button]");
    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (e) => {
            closeModal(modal, shadow);
        })
    }
}

function getShadow() {
    return document.querySelector(".modal-shadow");
}

function showModal(modal, shadow) {
    modal.classList.add("show");
    shadow.classList.add("show");
}

function closeModal(modal, shadow) {
    modal.classList.remove("show");
    shadow.classList.remove("show");
}