import UIElement from "./uiElement.js";

/*
 * This is the base class for button with delay show functionality.
 */
class AbstractDelayShowButton extends UIElement {

    constructor ({ selector, isIncentivized = false }) {
        super(selector);

        this.isIncentivized = isIncentivized;
        this.showDelayMilliseconds = 0;
    }

    getShowDelayMilliseconds () {
        if(!this.showDelayMilliseconds) {
            let attr = this.isIncentivized? "data-vgl-delay-show-incentivized": "data-vgl-delay-show";
            let seconds = this.getElement().getAttribute(attr);

            // If the ad is an incentivized ad, the delay seconds should be comeing from data attribute
            // data-vgl-click-incentivized-close.  Otherwise, the value should be coming from data-vgl-click-close.
            if(seconds) {
                if (seconds !== "9999") {
                    this.showDelayMilliseconds = parseFloat(seconds) * 1000;
                } else {
                    // If showDelayMilliseconds is null, it is an un-skippable ad.
                    this.showDelayMilliseconds = null;
                }
            } else {
                // If there is no attribute defined, we will treat the delay as no delay and show the button
                // immediately.
                this.showDelayMilliseconds = 0;
            }
        }

        return this.showDelayMilliseconds;
    }

    // Initialize the Button and subscribe for click event.
    init () {
        if(!this.initialized) {
            this.getElement().addEventListener("click", this.onClick.bind(this));
            this.initialized = true;
        }
    }

    // Depending on the configuration, we will show, hidden or delay show the CloseButton.
    show (forceShow = false) {
        if (!forceShow) {
            let delay = this.getShowDelayMilliseconds();

            if(typeof delay === "number") {
                if (delay === 0) {
                    super.show();
                } else {
                    setTimeout(function () {
                        this.getElement().style.visibility = "visible";
                        this.showDelayMilliseconds = 0;
                    }.bind(this), delay);
                }
            } else {
                // ** delay equals to null **
                // Users cannot close the ad using close button if it is non-skippable.
                this.hide();
            }
        } else {
            super.show();
        }
    }

    onClick (e) {
        throw {
            name: "NoImplException",
            message: "No onClick method provided in AbstractDelayShowButton derived class!"
        };
    }

}

export default AbstractDelayShowButton;
