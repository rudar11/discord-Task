require('dotenv').config()
const app = require('./src/app')

const { startBot } = require('./src/bot/bot');
// Discord bot onn
startBot();


app.listen(3000, function () {
    console.log("server is listening on port")
})

