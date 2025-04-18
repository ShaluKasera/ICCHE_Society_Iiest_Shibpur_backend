const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Activity title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Activity description is required"],
        minlength: [10, "Description must be at least 10 characters long"]
    },
    activityType: {
        type: String,
        enum: ["Sports", "Art", "Competition", "Cultural", "Educational", "Other"],
        required: [true, "Activity type is required"]
    },
    date: {
        type: Date,
        required: [true, "Activity date is required"],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Activity date must be in the past"
        }
    },
    chiefGuest: {
        type: String,
        trim: true
    },
    venue: {
        type: String,
        required: [true, "Venue is required"],
        trim: true
    },
    programs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }],
        studentsPresent: {
            type: Number,
            default: 0,
            min: [0, "Students present cannot be negative"]
        },
        volunteersPresent: {
            type: Number,
            default: 0,
            min: [0, "Volunteers present cannot be negative"]
        }
    ,
    videos: [{
        type: String, 
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(mp4|mov|avi|mkv|webm)$/i.test(value);
            },
            message: "Videos must be valid video URLs"
        }
    }],
    coverImageURL: {
        type: String,
        default: "/uploads/default.png", 
        validate: {
            validator: function (value) {
                return value.startsWith("http") || value.startsWith("/uploads/"); 
            },
            message: "Cover image must be a valid image URL"
        }
    },
    photos: [
        {
            type: String,
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
                },
                message: "Gallery images must be valid image URLs"
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
