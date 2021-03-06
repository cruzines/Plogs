const { Schema, model } = require("mongoose");

require("./User.model")
require("./Opinions.model")

const placeSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorId: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    image: {
       type: String,
        default: '/images/default.png',
    },
    opinions: [{ 
        type: Schema.Types.ObjectId, 
        ref: "opinions" 
    }]
});

const Places = model("places", placeSchema);

module.exports = Places;