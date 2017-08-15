const EVENTBUS_SECRET = "01010110 01110101 01101110 01100111 01101100 01100101 00100000 01001001 01010000 01001111";

/*
 * EventBus is a Singleton object designed to provide publisher/subscriber functionality.
 */
class EventBus {

    // Since there is no way to make a constructor private in JavaScript, we make the constructor argument required by
    // matching with an random character string.
    constructor (unknown) {
        if(unknown !== EVENTBUS_SECRET) {
            throw {
                name: "SingletonException",
                message: "Cannot create another EventBus singleton object!"
            }
        } else {
            this.listeners = {};
        }
    }

    // In order to get a hold of the EventBus object, use the class member variable called "instance".
    static get instance () {
        if(!this["singleton"]) {
            this["singleton"] = new EventBus(EVENTBUS_SECRET);
        }

        return this["singleton"];
    }

    findHandler (event, handler) {
        let index = -1;
        let count = EventBus.instance.listeners[event].length;

        for(let i = 0; (i < count) && (index === -1); i++) {
            if(EventBus.instance.listeners[event][i].uuid === handler.uuid) {
                index = i;
            }
        }

        return index;
    }

    // An event can have multiple handlers.
    subscribe (event, handler) {
        if(!(event in EventBus.instance.listeners)) {
            EventBus.instance.listeners[event] = [ handler ];
        } else {
            EventBus.instance.listeners[event].push(handler);
        }

        return handler.uuid;
    }

    // Each handler will be stored in an array and executed starting from array index 0.  You can optionally pass in
    // arguments for the handlers.
    publish (event, paramObject) {
        if(event in EventBus.instance.listeners) {
            let handlers = EventBus.instance.listeners[event];

            for(var i = 0; i < handlers.length; i++) {
                if(typeof handlers[i] === "function") {
                    setTimeout((function(handler, arg) {
                        handler(arg);
                    })(handlers[i], paramObject), 0);
                }
            }
        }
    }

    // Unsubscribe will remove the event and handlers from the EventBus object.
    unsubscribe (event, handler) {
        if(event in EventBus.instance.listeners) {
            let index = this.findHandler(event, handler);

            // We are going to find the handler and remove it from the array.
            if(index !== -1) {
                EventBus.instance.listeners[event].splice(index, 1);

                // If there is no handler in the array, we will remove the event entirely.
                if(EventBus.instance.listeners[event].length === 0) {
                    delete EventBus.instance.listeners[event];
                }
            }
        }
    }

}

export default EventBus;
