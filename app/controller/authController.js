const userModel = require("../model/authModel")

exports.login = async (req, res) => {
    res.render("../view/auth/auth-login", {})
}

exports.registerLoad = async (req, res) => {
    res.render("../view/auth/auth-register", {})
}

exports.register = async (req, res) => {
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