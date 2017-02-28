var util = require('util');
var EventEmitter = require('events').EventEmitter;

//lodash
var _ = {
	uniqueId : require('lodash/uniqueId')
};

var EventObserver = function(){
	EventEmitter.call(this);
};

util.inherits(EventObserver, EventEmitter);

EventObserver.prototype.observe = function(subject, event, callback, once){
	var __sMap = this.__sMap || (this.__sMap = {});
	var __cbMap = this.__cbMap || (this.__cbMap = {});
	var __sId = subject.__sId || (subject.__sId = _.uniqueId('s'));
	var __cid = callback.__cid || (callback.__cid = _.uniqueId('c'));
	var action = __cbMap[__cid] = callback.bind(this);
	if(!__sMap[__sId]) {
		__sMap[__sId] = [];
	}
	__sMap[__sId].push({
		subject : subject,
		event : event,
		action : action,
		cid : __cid
	});
	if(once) {
		subject.once(event, action);
	} else {
		subject.on(event, action);
	}
};

EventObserver.prototype.onceObserve = function(subject, event, callback){
	this.observe(subject, event, callback, true);
};

EventObserver.prototype.removeObservation = function(subject, event, callback){
	var action = this.__cbMap[callback.__cid];
	subject.removeListener(event, action);
};

EventObserver.prototype.removeSubject = function(subject){
	if(subject.__sId && this.__sMap && this.__sMap[subject.__sId]) {
		var __sMap = this.__sMap[subject.__sId];
		__sMap.forEach(function(e){
			subject.removeListener(e.event, e.action);
		});
		
		this.__sMap[subject.__sId] = null;
	}
};

EventObserver.prototype.stopObserving = function(){
	var self = this;
	if(this.__sMap) {
		Object.keys(this.__sMap).forEach(function(sid){
			var e = self.__sMap[sid];
			if(e && e[0]) {
				self.removeSubject(e[0].subject);
			}
		});
	}
};

exports = module.exports = EventObserver;
