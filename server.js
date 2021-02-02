const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require('path')
const port = process.env.PORT || 9000

app.use(morgan("dev"))
app.use("/journal", require("./routes/entrysRouter.js"))
app.use(express.static(path.join(__dirname, "client", "build")))


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/journalsdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
() => console.log("connected to journals Db"))


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})
app.listen(9000, () => {
    console.log("Running on server 9000")
})