const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5175;

const app = express()

app.use(bodyParser.json())
app.use(cors())


const invRouter = require('./inv/inv.router')

app.use('/api', invRouter)

const start = () => {
    try {
        mongoose.connect(`mongodb+srv://kn9zbwkey:Nl4jKXql07iYFSAW@cluster0.gs0haqx.mongodb.net/`).then(()=> {console.log('server started');});
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`);})
    } catch(e) {
        console.log(e);
    }
}

start()