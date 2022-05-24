/**
 * Event Manager to subscribe and trigger events
 *
 * It is a singleton so all instances made are the same instance
 */
class EventManager {
    constructor() {
        if (EventManager.instance) return EventManager.instance;

        this.events = [];
        EventManager.instance = this;

        return EventManager.instance;
    }

    /**
     * subscribe to an event and tun the function when it is triggered
     * @param {Event} event event to subscribe to
     * @param {function} eventHandler handle the event. Some events may pass in an argument such as the message for the playerMessage event
     */
    subscribe(event, eventHandler) {
        validateType(event, Event)
        if (this.events[event.name]) {
            this.events[event.name].push(eventHandler);
        } else {
            this.events[event.name] = [eventHandler];
        }
    }

    /**
     * unsubscribe to an event
     * @param {Event} event event to unsubscribe from
     * @param eventHandler
     */
    unsubscribe(event, eventHandler) {
        validateType(event, Event)
        if(this.events[event.name]){
            this.events[event.name] = this.events[event.name].filter((subscriber) => subscriber !== eventHandler);
        }
    }

    /**
     * trigger and event
     * @param {Event} event
     * @param {*} args args to pass to the subscribed functions
     */
    trigger(event, ...args) {
        validateType(event, Event)
        const eventHandlers = this.events[event.name];
        if (Array.isArray(eventHandlers)) {
            eventHandlers.forEach((eventHandler) => {
                eventHandler.apply(null, args);
            });
        }
    }
}