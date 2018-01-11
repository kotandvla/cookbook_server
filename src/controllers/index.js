let app = new (require('express').Router)();

app.use(require('./categories'));
app.use(require('./recipes'));

module.exports = app;