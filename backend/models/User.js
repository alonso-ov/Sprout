import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    }
});

const User = mongoose.model('User', UserSchema);

export default User;