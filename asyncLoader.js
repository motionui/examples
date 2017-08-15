/*
 * The AsyncLoader class is designed to load a bunch of JavaScripts or StyleSheets by injecting a script or link tags
 * onto the HTML.  The files are loaded asynchronously without blocking and the provided callback will be executed after
 * all files are loaded.
 *
 * Please note the AsyncLoader class is not exported for public use.  It is used by the two helper functions located at
 * the end of this file - requireJS() and requireCSS().
 */
class AsyncLoader {

     // Constructor captures the list of URLs to load and client callback to execute when all URLs are loaded onto the
     // HTML.
    constructor (urls, callback) {
        this.urls = urls.slice();
        this.counter = 0;
        this.loadedCallback = callback;
    }

     // Callback when one tag is injected onto the HTML document.  Counter is incremented and when all tags are injected,
     // the client callback is executed.
    onTagInjected () {
        this.counter++;

        if(this.counter === this.urls.length && typeof this.loadedCallback === "function") {
            this.loadedCallback();
        }
    }

     // Load a bunch of JavaScripts by injecting script tags onto the HTML.
    loadJS () {
        let count = this.urls.length;
        let writeScript = function (src) {
            let script = document.createElement("script");

            script.async = true;
            script.src = src;

            script.onload = function () {
                this.onTagInjected();
            }.bind(this);

            document.querySelector("head").appendChild(script);
        }.bind(this);

        for(let i = 0; i < count; i++) {
            writeScript(this.urls[i]);
        }
    }

     // Load a bunch of StyleSheets by injecting link tags onto the HTML.
    loadCSS () {
        let count = this.urls.length;
        let writeStyle = function (src) {
            let link = document.createElement("link");

            link.rel = "stylesheet";
            link.type = "text/css";
            link.media = "screen";
            link.href = src;

            link.onload = function () {
                this.onTagInjected();
            }.bind(this);

            document.querySelector("head").appendChild(link);
        }.bind(this);

        for(let i = 0; i < count; i++) {
            writeStyle(this.urls[i]);
        }
    }

}

/*
 * requireJS(["js1.js", "js2.js", ...], function () { // code to execute when all is loaded // });
 */
let requireJS = function (scripts, callback) {
    let loader = new AsyncLoader(scripts, callback);

    loader.loadJS();
};

/*
 * requireCSS(["css1.css", "css2.css", ...], function () { // code to execute when all is loaded // });
 */
let requireCSS = function (styles, callback) {
    let loader = new AsyncLoader(styles, callback);

    loader.loadCSS();
};

export { requireJS, requireCSS };
