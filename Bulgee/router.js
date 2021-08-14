module.exports = (app) => {
    // '/'
    app.use('/', require('./routes/index'));

    app.use('/dashboard', require('./routes/dashboard'));

    // '/authorize'
    app.use('/authorize', require('./routes/discord'));
}