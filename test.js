var EventObserver = require('./index');
var util = require('util');

var Test = function(){
	EventObserver.call(this);
};

util.inherits(Test, EventObserver);

var x = new Test();

x.on('event', function(){
	console.log('an event occurred!');
});

var y = new Test();

y.observe(x, 'event', function(){
	console.log('an event observed!');
});

console.log('-----------');
x.emit('event');

y.stopObserving();

console.log('-----------');
x.emit('event');

x.removeAllListeners();

console.log('-----------');
x.emit('event');
