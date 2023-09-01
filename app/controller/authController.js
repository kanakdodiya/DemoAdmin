const authModel = require("../model/authModel");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require("nodemailer");

exports.index = async (req, res) => {
    if (req.session.email) {
        res.redirect('/dashboard')
    } else {
        res.render("../view/auth/auth-login", {})
    }
}

exports.login_action = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await authModel.findOne({ 'email': email }).select('+password');

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
            req.flash('success', 'Login Successfully....!');
            return res.redirect('/dashboard');
        } else {
            req.flash('error', 'Incorrect password');
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        req.flash('error', 'An error occurred during login');
        res.redirect('/');
    }

}

exports.register = async (req, res) => {
    res.render("../view/auth/auth-register", {})
}

exports.register_action = async (req, res) => {
    try {
        if (req.body.iAdminId) {
            const { password, confirmPassword, username, email, status, iAdminId } = req.body;
            let UPDATE_QUERY = {}
            if (password == '' || confirmPassword == '') {
                console.log('without pass');
                UPDATE_QUERY = {
                    "$set": {
                        username,
                        email,
                        status
                    }
                }
            } else {
                console.log('with pass');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                UPDATE_QUERY = {
                    "$set": {
                        username,
                        email,
                        password: hashedPassword,
                        status
                    }
                }
            }

            const updatedData = await authModel.findOneAndUpdate(
                { _id: iAdminId },
                UPDATE_QUERY,
                { new: true } // To return the updated document
            );

            req.flash('success', 'Admin Update successfully');
            return res.redirect('/admin');

        } else {
            const { username, email, password, confirmPassword, status, newAdmin } = req.body;
            if (password) {
                if (password == confirmPassword) {
                    const user = await authModel.create({
                        username,
                        email,
                        password,
                        status
                    });
                    req.flash('success', 'User registered successfully');

                    const redirectPath = newAdmin === 'true' ? '/admin' : '/login';
                    return res.redirect(redirectPath);

                } else {
                    req.flash('error', 'Passwords do not match');

                    const redirectPath = newAdmin === 'true' ? '/admin' : '/register';
                    return res.redirect(redirectPath);
                }
            } else {
                req.flash('error', 'Please Try Again');
                return res.redirect('/register');
            }
        }

    } catch (err) {
        let errors = {};
        let newAdmin = req.body.newAdmin

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

        // For Other Errors
        if (Object.keys(errors).length === 0) {
            console.error('Other error:', err);
            req.flash('error', 'Something Went Wrong');
        }


        Object.keys(errors).forEach(key => {
            if (errors[key]) {
                console.log('errors[key]: ', errors[key]);
                req.flash('error', errors[key]);
            }
        });

        const redirectPath = newAdmin === 'true' ? '/admin' : '/login';
        return res.redirect(redirectPath);
    }
}


exports.forgotPassword = async (req, res) => {
    try {
        res.render("../view/auth/auth-forgot-password", {})
    } catch (error) {
        console.error('error: ', error);
        return res.redirect("/forgot-password");

    }
}

exports.forgotPassword_action = async (req, res) => {
    try {
        const email = req.body.email
        const userData = await authModel.findOne({ 'email': email });

        if (!userData) {
            req.flash('error', 'Email Account Not Found');
            return res.redirect("/register");
        }

        const verifyToken = uuid.v4();

        await authModel.findOneAndUpdate(
            { email: email },
            { "$set": { verifyToken: verifyToken } },
        );

        let verifyLink = `http://localhost:9003/reset-password/${verifyToken}`;

        const emailTemplate = fs.readFileSync(
            "./app/view/email/index.handlebars",
            "utf-8"
        );

        const template = handlebars.compile(emailTemplate)

        const messageBody = template({
            verifyLink: verifyLink
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jaqueline87@ethereal.email',
                pass: 'V8aUNQTKArUZY7cJwM'
            }
        });

        (async function main() {
            const info = await transporter.sendMail({
                from: '"Fred Foo" <foo@example.com>', // sender address
                to: "kanak@mailinator.com", // list of receivers
                subject: "Verification", // Subject line
                text: "Hello world", // plain text body
                html: messageBody, // html body
            });

            if (info.messageId) {
                req.flash('success', 'Email Send Successfully');
                return res.redirect("/forgot-password");
            }
        })();
        
    } catch (error) {
        console.error('error: ', error.message);
        req.flash('error', 'Email Send Failed');
        return res.redirect("/forgot-password");
    }
}


exports.reset_password = async (req, res) => {
    try {
        let token = req.params.token;
        let data = await authModel.findOne({ "verifyToken": token })

        if (data) {
            res.render("../view/auth/reset-password", { token: token })
        }

    } catch (error) {
        console.error('error: ', error);
        req.flash('error', 'Something Went Wrong');
        return res.redirect("/forgot-password");
    }

}

exports.reset_password_action = async (req, res) => {
    const { password, confirmPassword, verifyToken } = req.body;
    try {
        if (password) {
            if (password == confirmPassword) {

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);


                await authModel.findOneAndUpdate(
                    { verifyToken: verifyToken },
                    { "$set": { password: hashedPassword, verifyToken: '' } },
                );

                req.flash('success', 'Password Changed successfully');

                return res.redirect('/login');

            } else {
                req.flash('error', 'Passwords do not match');
                return res.redirect('/');
            }
        } else {
            req.flash('error', 'Please Try Again');
            return res.redirect('/forgot-password');
        }
    } catch (error) {
        console.error('error: ', error);

    }
}


exports.logout = (req, res) => {
    if (req.session.email) {
        try {
            setTimeout(() => {
                req.session.destroy((error) => {
                    if (error) {
                        req.flash('error', 'Something went wrong while logging out');
                    }
                    res.redirect('/');
                });
            }, 1000);
        } catch (error) {
            req.flash('error', 'Something went wrong during logout');
            res.redirect('/');
        }
    } else {
        console.log('No session found');
        res.redirect('/');
    }
};
