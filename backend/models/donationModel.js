const mongoose = require('mongoose');

const clothDonationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description must be at least 10 characters"]
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Donation date cannot be in the past"
        }
    },
    location: {
        latitude: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        longitude: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        }
    },
        studentsReceived: {
            type: Number,
            default: 0,
            min: [0, "Students received cannot be negative"]
        },
        parentsReceived: {
            type: Number,
            default: 0,
            min: [0, "Parents received cannot be negative"]
        }
    ,
    coverImageURL: {
        type: String,
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value);
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
    ],
}, { timestamps: true });

module.exports = mongoose.model('ClothDonation', clothDonationSchema);
