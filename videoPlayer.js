import UIElement from "./uiElement.js";

class VideoPlayer extends UIElement {

    constructor (selector) {
        super(selector);
        
        this.loopVideo = false;
    }

    init () {
        if(!this.initialized) {
            this.loopVideo = this.getElement().hasAttribute("data-vgl-loop-video");
            
            this.getElement().addEventListener("ended", this.onVideoEnded.bind(this));
            this.getElement().addEventListener("timeupdate", this.onVideoTimeupdate.bind(this));
            this.getElement().addEventListener("loadedmetadata", this.onVideoLoadedmetadata.bind(this));

            this.initialized = true;
        }
    }

    show () {
        this.play();
    }

    pause () {
        !this.getElement().paused && this.getElement().pause();
    }

    hide () {
        this.pause();
    }

    play () {
        this.getElement().paused && this.getElement().play();
    }

    // Event handlers.

    onVideoEnded (e) {
        this.eventDispatcher.publish("event.videoPlayComplete");
        
        if(this.loopVideo) {
            this.getElement().currentTime = 0;
            this.play();
        }
    }

    onVideoTimeupdate (e) {
        this.eventDispatcher.publish("event.videoPlayTimeupdate", {
            currentTime: this.getElement().currentTime,
            duration: this.getElement().duration
        });
    }

    onVideoLoadedmetadata (e) {
        this.eventDispatcher.publish("event.videoMetadataAvailable");
    }

}

export default VideoPlayer;
