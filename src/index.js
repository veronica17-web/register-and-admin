const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route")

const app = express()

app.use(express.json());

mongoose.connect("mongodb+srv://miryala-veronica123:1Sz5U9LVS3afd1bB@cluster0.vfkx3.mongodb.net/broaddcast", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))



app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})
