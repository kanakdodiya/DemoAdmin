const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is a required field"],
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid E-mail!");
            }
        }
    },
    image: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
        select: false,
        validate(value) {
            if (!validator.isLength(value, { min: 6, max: 15 })) {
                throw Error("Password length should be between 6 and 15 characters");
            }
            if (!(/[A-Z]/.test(value) && /[^a-zA-Z\d]/.test(value))) {
                throw new Error("Password must contain at least one uppercase letter and one special character");
            }

        }
    },
    verifyToken: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active' // Set a default value if needed
    }
}, {
    timestamps: true, // Enable timestamps
});


adminSchema.pre('save', async function (next) {
    // Only hash the password if it's modified or new
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Store the hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log('error: ', error);
        return next(error);
    }
});

const User = mongoose.model('admin', adminSchema);

module.exports = User;
