class EventEmitter {
  constructor() {
    this.events = {}
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === "undefined") {
      this.events[eventName] = new Set();
    }

    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn)
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      function (fn) {
        fn.apply(this, args)
      }.bind(this)
    )
  }
}

export default EventEmitter;