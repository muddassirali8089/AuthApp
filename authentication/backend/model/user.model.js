import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
        minlength: 8
    },
    age: {
        type: Number,
        min: 0, 
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
