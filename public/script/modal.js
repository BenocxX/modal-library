const shadow = document.querySelector(".modal-shadow");

export function showAlertModal(detail, callback) {
    if (detail === undefined) {
        detail = {
            title: "",
            text: "",
            position: "",
            animationIn: "",
            animationOut: ""
        }
    }
    if (detail.title === "" || detail.title === undefined) {
        detail.title = "Alert!";
    }
    if (detail.text === "" || detail.text === undefined) {
        detail.text = "You are leaving the website!";
    }
    if (detail.position === "" || detail.position === undefined) {
        detail.position = "top";
    }
    if (detail.animationIn === "" || detail.animationIn === undefined) {
        detail.animationIn = "down";
    }
    if (detail.animationOut === "" || detail.animationOut === undefined) {
        detail.animationOut = "up";
    }

    const html = `
        <div tabindex="-1" class="modal" data-animation-in="${detail.animationIn}" data-animation-out="${detail.animationOut}" data-position="${detail.position}" id="alertModal">
            <div class="modal-dialog">
                <div class="modal-header-container">
                    <h3 class="modal-title">${detail.title}</h3>
                    <button data-close-button class="modal-button">X</button>
                </div>
                <div class="modal-content-container">
                    <p class="modal-text">${detail.text}</p>
                </div>
                <div class="modal-footer-container">
                    <button data-close-button id="callbackButton" class="modal-button bg-light-blue">Close</button>
                </div>
            </div>
        </div>
    `
    const alertModalContainer = document.querySelector(".alert-modal-container")
    alertModalContainer.innerHTML = html

    const modal = alertModalContainer.querySelector(".modal");
    initEventListenerInModal(modal);
    showModal(modal);

    if (callback !== undefined) {
        const callbackButton = modal.querySelector("#callbackButton");
        callbackButton.addEventListener("click", callback);
    }
}

export function showConfirmModal(detail, callback) {
    if (detail === undefined) {
        detail = {
            title: "",
            text: "",
            confirmButton: "",
            denyButton: "",
            position: "",
            animationIn: "",
            animationOut: ""
        }
    }
    if (detail.title === "" || detail.title === undefined) {
        detail.title = "Confirm Modal";
    }
    if (detail.text === "" || detail.text === undefined) {
        detail.text = "Are you sure you want to do this?";
    }
    if (detail.position === "" || detail.position === undefined) {
        detail.position = "top";
    }
    if (detail.confirmButton === "" || detail.confirmButton === undefined) {
        detail.confirmButton = "Yes!";
    }
    if (detail.denyButton === "" || detail.denyButton === undefined) {
        detail.denyButton = "No!";
    }
    if (detail.animationIn === "" || detail.animationIn === undefined) {
        detail.animationIn = "down";
    }
    if (detail.animationOut === "" || detail.animationOut === undefined) {
        detail.animationOut = "up";
    }

    const html = `
        <div tabindex="-1" class="modal"  data-animation-in="${detail.animationIn}" data-animation-out="${detail.animationOut}" data-position="${detail.position}" id="confirmModal">
            <div class="modal-dialog">
                <div class="modal-header-container">
                    <h3 class="modal-title">${detail.title}</h3>
                    <button data-close-button class="modal-button">X</button>
                </div>
                <div class="modal-content-container">
                    <p class="modal-text">${detail.text}</p>
                </div>
                <div class="modal-footer-container">
                    <button data-close-button id="callbackConfirm" class="modal-button bg-light-blue">${detail.confirmButton}</button>
                    <button data-close-button id="callbackDeny" class="modal-button bg-red">${detail.denyButton}</button>
                </div>
            </div>
        </div>
    `
    const confirmModalContainer = document.querySelector(".confirm-modal-container")
    confirmModalContainer.innerHTML = html

    const modal = confirmModalContainer.querySelector(".modal");
    initEventListenerInModal(modal);
    showModal(modal);

    if (callback !== undefined) {
        const callbackConfirmButton = modal.querySelector("#callbackConfirm");
        callbackConfirmButton.addEventListener("click", () => {
            callback(true)
        });

        const callbackDenyButton = modal.querySelector("#callbackDeny");
        callbackDenyButton.addEventListener("click", () => {
            callback(false)
        });
    }
}

export function showAjaxModal(url) {
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (htmlModal) {
            const ajaxModalContainer = document.querySelector(".ajax-modal-container");
            ajaxModalContainer.innerHTML = htmlModal;

            const modal = ajaxModalContainer.querySelector(".modal");
            initEventListenerInModal(modal);
            showModal(modal);
        });
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

export function onModalClose(e) {
    let currentModal;
    const modals = document.querySelectorAll(".modal");
    for (const modal of modals) {
        if (modal.classList.contains("show") ||
            modal.classList.contains("modal-animation-in") ||
            modal.classList.contains("modal-animation-out")) {
            currentModal = modal;
        }
    }

    const modalCloseEvent = new CustomEvent("modal.close");

    currentModal.dispatchEvent(modalCloseEvent);
    closeModal(currentModal);
}

function initEventListenerInModal(modal) {

    shadow.addEventListener("click", (e) => {
        closeModal(modal);
        onModalClose();
    })

    const closeButtons = modal.querySelectorAll("[data-close-button]");
    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (e) => {
            closeModal(modal);
            onModalClose();
        })
    }

    document.addEventListener('keyup', escTyped);
}

function showModal(modal) {
    modal.classList.add("modal-animation-in");
    modal.addEventListener('animationend', () => {
        if (modal.classList.contains("modal-animation-in")) {
            modal.classList.add("show");
            modal.classList.remove("modal-animation-in");
        }
    });

    shadow.classList.add("fade-in");
    shadow.addEventListener('animationend', () => {
        if (shadow.classList.contains("fade-in")) {
            shadow.classList.add("show");
            shadow.classList.remove("fade-in");
        }
    });

    modal.focus();
    window.addEventListener('keydown', handleKey);
}

function closeModal(modal) {
    modal.classList.remove("show");
    modal.classList.add("modal-animation-out");
    modal.addEventListener('animationend', () => {
        if (modal.classList.contains("modal-animation-out")) {
            modal.classList.remove("modal-animation-out");
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
    // TODO: test removeEventListener from shadow click
}

function escTyped(e) {
    if (e.code === "Escape") {
        const modals = document.querySelectorAll(".modal");
        let currentModal;
        for (const modal of modals) {
            if (modal.classList.contains("show") ||
                modal.classList.contains("modal-animation-in") ||
                modal.classList.contains("modal-animation-out")) {
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
                modal.classList.contains("modal-animation-in") ||
                modal.classList.contains("modal-animation-out")) {
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