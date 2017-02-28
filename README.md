#EventObserver

EventObserver.observe(other, event, callback) 
Tell an object to listen to a particular event on an other object. The advantage of using this form, instead of other.on(event, callback, object), is that observe allows the object to keep track of the events, and they can be removed all at once later on. The callback will always be called with object as context.
