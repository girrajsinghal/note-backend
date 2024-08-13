import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/] 
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true,
});

// Create the model from the schema
const UserModel = mongoose.model('User', UserSchema);

// Export the model
export default UserModel;
