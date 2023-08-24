exports.login = async (req, res) => {
    res.render("../view/auth/auth-login", {})
}

exports.register = async (req, res) => {
    res.render("../view/auth/auth-register", {})
}

exports.forgotPassword = async (req, res) => {
    res.render("../view/auth/auth-forgot-password", {})
}