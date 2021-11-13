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
    const currentModal = getCurrentModal();
    const modalCloseEvent = new CustomEvent("modal.close");
    currentModal.dispatchEvent(modalCloseEvent);
    closeModal(currentModal);
}

function initEventListenerInModal(modal) {
    setEventListenerOnCloseShadow()
    setEventListenerOnCloseButtons(modal);
    document.addEventListener('keyup', escTyped);
}

function setEventListenerOnCloseShadow() {
    shadow.addEventListener("click", (e) => {
        onModalClose();
    })
}

function setEventListenerOnCloseButtons(modal) {
    const closeButtons = modal.querySelectorAll("[data-close-button]");
    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (e) => {
            onModalClose();
        })
    }
}

function showModal(modal) {
    showModalAnimation(modal);
    showShadowAnimation();
    modal.focus();
    window.addEventListener('keydown', tabTyped);
}

function showModalAnimation(modal) {
    modal.classList.add("modal-animation-in");
    modal.addEventListener('animationend', () => {
        if (modal.classList.contains("modal-animation-in")) {
            modal.classList.add("show");
            modal.classList.remove("modal-animation-in");
        }
    });
}

function showShadowAnimation() {
    shadow.classList.add("fade-in");
    shadow.addEventListener('animationend', () => {
        if (shadow.classList.contains("fade-in")) {
            shadow.classList.add("show");
            shadow.classList.remove("fade-in");
        }
    });
}

function closeModal(modal) {
    closeModalAnimation(modal)
    closeShadowAnimation()
    window.removeEventListener('keydown', tabTyped);
    document.removeEventListener("keyup", escTyped)
}

function closeModalAnimation(modal) {
    modal.classList.remove("show");
    modal.classList.add("modal-animation-out");
    modal.addEventListener('animationend', () => {
        if (modal.classList.contains("modal-animation-out")) {
            modal.classList.remove("modal-animation-out");
            modal.classList.remove("show");
        }
    });
}

function closeShadowAnimation() {
    shadow.classList.remove("show");
    shadow.classList.add("fade-out");
    shadow.addEventListener('animationend', () => {
        if (shadow.classList.contains("fade-out")) {
            shadow.classList.remove("fade-out");
            shadow.classList.remove("show");
        }
    });
}

function escTyped(e) {
    if (e.code === "Escape") {
        const docContainer = document.querySelector(".container");
        docContainer.focus()
        const currentModal = getCurrentModal();
        closeModal(currentModal);
    }
}

// Source: https://stackoverflow.com/a/60031728
function tabTyped(e) {
    if (e.keyCode === 9) {
        const currentModal = getCurrentModal();
        let focusables = currentModal.querySelectorAll("input, button, select, textarea");
        if (focusables.length) {
            moveFocus(e, focusables)
        }
    }
}

function moveFocus(e, focusables) {
    let first = focusables[0];
    let last = focusables[focusables.length - 1];
    let shift = e.shiftKey;
    shift ? focusBackward(e, first, last) : focusFoward(e, first, last);
}

function focusFoward(e, first, last) {
    if (e.target === last) {
        first.focus();
        e.preventDefault();
    }
}

function focusBackward(e, first, last) {
    if (e.target === first) {
        last.focus();
        e.preventDefault();
    }
}

function getCurrentModal() {
    const modals = document.querySelectorAll(".modal");
    for (const modal of modals) {
        if (modal.classList.contains("show") ||
            modal.classList.contains("modal-animation-in") ||
            modal.classList.contains("modal-animation-out")) {
            return modal;
        }
    }
}