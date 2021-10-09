const express = require('express')
const config = require('config')
const app = express()
const mongoose = require('mongoose')

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        })
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start()

app.listen(PORT, () => console.log(`Server run on localhost:${PORT}`))