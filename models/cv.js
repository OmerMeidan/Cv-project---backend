const mongoose = require("mongoose")
const CvSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    jobTitle:{
        type:String,
        require:true
    },
    education:{
        type:Array,
        // require:true
    },
    aboutMe:{
        type:String,
        // require:true
    },
    skills:{
        type:Array,
        // require:true
    },
    contact:{
        type:Array,
        // require:true
    },
    language:{
        type:Array,
        // require:true
    },
    jobResume:{
        type:Array,
        // require:true
    }, 
    owner:{
        type:String
    }
})

module.exports = mongoose.model('Cv',CvSchema)