const mongoose = require ("mongoose")
const Scheema = mongoose.Scheema
const workoutScheema = new Scheema ({
    day:{
        type:Date,
        default:()=> new Date(),
    },
    exercises:[
        {
            type:{
                type:String,
                trim:true,
            },
            name:{
                type:String
            },

        }
    ]
})

const Workout = mongoose.model("Workout", workoutScheema)
module.exports = Workout