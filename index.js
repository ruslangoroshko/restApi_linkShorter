const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/default')


const PORT = process.env.PORT || config.port 
const app = express()

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todos', require('./routes/todos.route'))


async function start() {
    try {
        /*
            await db connection
        */ 
        await mongoose.connect('mongodb+srv://root:1q2w3e4r@cluster0-faph0.mongodb.net/todos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        /*
            start the server
        */
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
    } catch(e) {
        console.log(e.message)
        process.exit(1)
    }
}
start()