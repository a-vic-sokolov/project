const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start()
{
    try {
        await mongoose.connect(config.get('mongo_Url'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
    }
    catch (e) {
        console.log('Error', e.message)
        process.exit(1)
    }
}
start()

app.listen(5000, () => console.log(`Server started on port ${PORT} ...`))