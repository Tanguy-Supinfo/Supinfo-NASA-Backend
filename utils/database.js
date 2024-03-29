const mongoose = require("mongoose");

const mongo = mongoose.connect("mongodb+srv://prof:1234@cluster.f54yc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connecté !"))
    .catch(() => console.log("MongoDB erreur !"));


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    pseudo: {
        type: String,
        unique: true,
    },
    password: String,
    isAdmin: Boolean,
});

const roverSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    launch_date: {
        type: Date,
        default: Date.now
    },
    construction_date: {
        type: Date,
        default: Date.now
    },
    manufacturer: String,
    image: String,
});

const missionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    country: String,
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: Date.now
    },
    rovers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rover"
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const userModel = mongoose.model("users", userSchema);
const roverModel = mongoose.model("rovers", roverSchema);
const missionModel = mongoose.model("missions", missionSchema);

module.exports = {
    mongo,
    userSchema,
    roverSchema,
    missionSchema,
    userModel,
    roverModel,
    missionModel,
};