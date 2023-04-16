const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const authController = require("./controllers/authController")
const app = express()
const cors = require("cors")
mongoose.connect("mongodb+srv://omerMeidan:cvProject@cluster0.gxalgb8.mongodb.net/?retryWrites=true&w=majority", {})
    .then(() => console.log("success"))
    .catch((error) => {
        console.log("Failed to connect")
        console.log(error)
    })
app.use(cors())




app.use(bodyParser.json())
app.post("/SignUp", authController.AddUser)
app.post("/Login", authController.Login)
app.post("/CvCreator",authController.CvCreator)
app.post("/GetId",authController.GetId)
app.post('/UserCvs',authController.getAllCv)
app.post('/DeleteCv',authController.DeleteCv)
app.listen(3003, () => console.log("listening to port 3003"))