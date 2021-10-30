export function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1) + lower)
}

export function $on(selector, eventType, callBack) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
        element.addEventListener(eventType, callBack)
    }
}

export function $delegate(selector, eventType, childSelector, callBack) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
        element.addEventListener(eventType, (eventOnElement) => {
            if (eventOnElement.target.closest(childSelector)) {
                callBack(eventOnElement)
            }
        })
    }
}