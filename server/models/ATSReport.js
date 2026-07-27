import mongoose from "mongoose";

const atsReportSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    resume:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resume",
        required:true
    },

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"JobDescription",
        required:true
    },

    score:{
        type:Number,
        required:true
    },

    breakdown:Object,

    matchedSkills:[String],

    missingSkills:[String],

    projectMatches:[String],

    recommendations:[String]


},{
    timestamps:true
});


export default mongoose.model(
    "ATSReport",
    atsReportSchema
);