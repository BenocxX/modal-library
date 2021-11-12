const shadow = document.querySelector(".modal-shadow");

export function showAlertModal(detail) {
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
                    <button data-close-button class="modal-button bg-light-blue">Close</button>
                </div>
            </div>
        </div>
    `
    const alertModalContainer = document.querySelector(".alert-modal-container")
    alertModalContainer.innerHTML = html

    const modal = document.querySelector("#alertModal");
    initEventListenerInModal(modal);
    showModal(modal);
}

export function showConfirmModal(detail) {
    if (detail === undefined) {
        detail = { title: "",  text: "", confirmButton: "", denyButton: "" }
    }
    if (detail.title === "") {
        detail.title = "Confirm Modal";
    }
    if (detail.text === "") {
        detail.text = "Are you sure you want to do this?";
    }
    if (detail.confirmButton === "") {
        detail.confirmButton = "Yes!";
    }
    if (detail.denyButton === "") {
        detail.denyButton = "No!";
    }

    const html = `
        <div class="modal" id="confirmModal">
            <div class="modal-dialog">
                <div class="modal-header-container">
                    <h3 class="modal-title">${detail.title}</h3>
                    <button data-close-button class="modal-button">X</button>
                </div>
                <div class="modal-content-container">
                    <p class="modal-text">${detail.text}</p>
                </div>
                <div class="modal-footer-container">
                    <button data-close-button class="modal-button bg-light-blue">${detail.confirmButton}</button>
                    <button data-close-button class="modal-button bg-light-blue">${detail.denyButton}</button>
                </div>
            </div>
        </div>
    `
    const confirmModalContainer = document.querySelector(".confirm-modal-container")
    confirmModalContainer.innerHTML = html

    const modal = document.querySelector("#confirmModal");
    initEventListenerInModal(modal);
    showModal(modal);
}

export function onModalLaunch(e, detail) {
    const modalType = e.target.dataset.modalId;
    const modal = document.querySelector("#" + modalType);
    const modalShownEvent = new CustomEvent("modal.shown", {
        detail
    })

    modal.dispatchEvent(modalShownEvent);
    initEventListenerInModal(modal);
    showModal(modal);
}

function initEventListenerInModal(modal) {

    shadow.addEventListener("click", (e) => {
        closeModal(modal);
    })

    const closeButtons = modal.querySelectorAll("[data-close-button]");
    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (e) => {
            closeModal(modal);
        })
    }

    document.addEventListener('keyup', escTyped);
}

function showModal(modal) {
    modal.classList.add("modal-down");
    modal.addEventListener('animationend', () => {
        if (modal.classList.contains("modal-down")) {
            modal.classList.add("show");
            modal.classList.remove("modal-down");
        }
    });

    shadow.classList.add("fade-in");
    shadow.addEventListener('animationend', () => {
        if (shadow.classList.contains("fade-in")) {
            shadow.classList.add("show");
            shadow.classList.remove("fade-in");
        }
    });

    window.addEventListener('keydown', handleKey);
}

function closeModal(modal) {
    modal.classList.remove("show");
    modal.classList.add("modal-up");
    modal.addEventListener('animationend', () => {
        if (modal.classList.contains("modal-up")) {
            modal.classList.remove("modal-up");
            modal.classList.remove("show");
        }
    });

    shadow.classList.remove("show");
    shadow.classList.add("fade-out");
    shadow.addEventListener('animationend', () => {
        if (shadow.classList.contains("fade-out")) {
            shadow.classList.remove("fade-out");
            shadow.classList.remove("show");
        }
    });

    window.removeEventListener('keydown', handleKey);
}

function escTyped(e) {
    if (e.code === "Escape") {
        const modals = document.querySelectorAll(".modal");
        let currentModal;
        for (const modal of modals) {
            if (modal.classList.contains("show") ||
                modal.classList.contains("modal-down") ||
                modal.classList.contains("modal-up")) {
                currentModal = modal;
            }
        }
        closeModal(currentModal);
        document.removeEventListener("keyup", escTyped)
    }
}

// Source: https://stackoverflow.com/a/60031728
function handleKey(e) {
    if (e.keyCode === 9) {
        const modals = document.querySelectorAll(".modal");
        let currentModal;
        for (const modal of modals) {
            if (modal.classList.contains("show") ||
                modal.classList.contains("modal-down") ||
                modal.classList.contains("modal-up")) {
                currentModal = modal;
            }
        }
        let focusable = currentModal.querySelectorAll('input,button,select,textarea');
        if (focusable.length) {
            let first = focusable[0];
            let last = focusable[focusable.length - 1];
            let shift = e.shiftKey;
            if (shift) {
                if (e.target === first) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                if (e.target === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    }
}