const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// Routing
const mainRouter = require('./routers/main');

// DataBase
const DataBaseService = require('./services/db.service');
const User = require('./models/user.model');
const Token = require('./models/token.model');

const app = express();
const databaseService = new DataBaseService();

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', mainRouter);

try {
    app.listen(dotenv?.config()?.parsed?.PORT, async () => {
        console.log(`listening on port ${dotenv?.config('PORT')?.parsed?.PORT}`);
        databaseService.init();
        databaseService.connect();
        await User.sync({force: false});
        await Token.sync({force: false});
    })
} catch (error) {
    throw new Error(error?.message);
}