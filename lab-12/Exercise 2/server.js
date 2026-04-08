const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Global Middleware 1');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Time:', new Date().toString());
    next();
});

app.use((req, res, next) => {
    console.log('Global Middleware 2');
    next();
});

const routeMiddleware1 = (req, res, next) => {
    console.log('Route Middleware 1');
    next();
};

const routeMiddleware2 = (req, res, next) => {
    console.log('Route Middleware 2');
    next();
};

app.get('/', routeMiddleware1, routeMiddleware2, (req, res) => {
    console.log('Route Handler Executed');
    res.send('Home Page with Middleware');
});

app.get('/about', (req, res) => {
    console.log('About Route Handler Executed');
    res.send('About Page');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});node server.js