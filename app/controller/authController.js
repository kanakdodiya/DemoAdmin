const userModel = require("../model/authModel")
const bcrypt = require('bcrypt')

exports.index = async (req, res) => {
    if (req.session.email) {
        res.redirect()
    } else {
        res.render("../view/auth/auth-login", {})
    }
}

exports.login_action = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ 'email': email }).select('+password');

        // Check if a user with the provided email exists
        if (!userData) {
            req.flash('error', 'Email Account Not Found');
            return res.redirect("/");
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, userData.password)

        if (passwordMatch) {
            //store some user data in session storage
            req.session.user = userData.username;
            req.session.email = userData.email;
            req.session.userId = userData._id;
            // res.redirect('/dashboard');
        } else {
            req.flash('error', 'Incorrect password');
            return res.redirect('/');
        }
    } catch (error) {
        console.log('error: ', error.message);
        req.flash('error', 'An error occurred during login');
        res.redirect('/');
    }

}

exports.register = async (req, res) => {
    res.render("../view/auth/auth-register", {})
}

exports.register_action = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (password) {
            if (password == confirmPassword) {
                const user = await userModel.create({
                    username,
                    email,
                    password,
                });
                req.flash('success', 'User registered successfully');
                return res.redirect('/login'); // Redirect to login page
            } else {
                req.flash('error', 'Passwords do not match');
                return res.redirect('/register');
            }
        } else {
            req.flash('error', 'Please Try Again');
            return res.redirect('/register');
        }
    } catch (err) {
        let errors = {};

        //For Validation Errors
        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            // return res.status(400).send(errors);
        }

        // For Duplicate Values
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern)[0];
            errors[`${duplicateField}`] = `${duplicateField} Filed Is Already Exists`;
            console.log('errors: ', errors);
            // return res.status(400).send(errors);
        }

        Object.keys(errors).forEach(key => {
            if (errors[key]) {
                req.flash('error', errors[key]);
            }
        });

        res.redirect('/register');
    }
}


exports.forgotPassword = async (req, res) => {
    res.render("../view/auth/auth-forgot-password", {})
}