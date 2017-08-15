import EventBus from "./eventBus.js";

/*
 * An UIElement object has a DOM selector and its DOM element retrieved with the querySelector DOM API.  It is also
 * an event dispatcher object which can subscribe/publish custom events.
 */
class UIElement {

    constructor (selector) {
        // Any derived class can use the eventDispatcher member to subscribe/publish custom events on the event bus.
        this.eventDispatcher = EventBus.instance;

        // The DOM selector for the UIElement.  For example, "#videoPage .video", ".endcard div.button", ".cta > span".
        this.selector = selector;
        // The DOM element from document.querySelector DOM API.
        this.element = null;
        // Derived class can use the initialized member variable to control code that only needs to execute once.
        this.initialized = false;
    }

    // The getElement API is available to classes derived from UIElement
    getElement () {
        if(!this.element) {
            this.element = document.querySelector(this.selector);
        }

        return this.element;
    }

    // Each derived class must implement the following four methods.  Derived classes can opt-out of each of the
    // following API by providing a no-ops method.

    // init - One time initialization of the UIElement object.
    init () {
        throw {
            name: "NoImplException",
            message: "No init method provided in UIElement derived class!"
        };
    }

    // show - What to do when the element is activated and made visible on screen.
    show () {
        if (!this.isVisible()) {
            this.getElement().style.visibility = "visible";
        }
    }

    // hide - What to do when the element is made invisible.
    hide () {
        if (this.isVisible()) {
            this.getElement().style.visibility = "hidden";
        }
    }

    isVisible () {
        return window.getComputedStyle(this.getElement()).visibility === "visible";
    }

    // pause - What to do when the element is paused.  The base class provides a no-ops.
    pause () {}

}

export default UIElement;
