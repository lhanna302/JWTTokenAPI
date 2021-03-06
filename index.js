const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const config = require('./config');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', userRouter);
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(config.port);