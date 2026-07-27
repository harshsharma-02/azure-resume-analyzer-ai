import mongoose from "mongoose";


const jobDescriptionSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    company:{
        type:String
    },

    description:{
        type:String,
        required:true
    },


    requiredSkills:[
        {
            type:String
        }
    ]

},
{
    timestamps:true
});


export default mongoose.model(
    "JobDescription",
    jobDescriptionSchema
);