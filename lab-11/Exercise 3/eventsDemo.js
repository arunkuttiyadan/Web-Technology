const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('greet', (name) => {
    console.log('Hello, ' + name);
});

emitter.on('greet', (name) => {
    console.log('Welcome, ' + name);
});

emitter.on('message', (text) => {
    console.log('Message received:', text);
});

console.log('Before event trigger');

setTimeout(() => {
    emitter.emit('greet', 'Arun');
    emitter.emit('message', 'Node.js event system is working');
}, 2000);

console.log('After event trigger');node eventsDemo.js