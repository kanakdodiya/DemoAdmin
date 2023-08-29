
exports.index = async (req, res) => {
    if (req.session.email) {
        res.render('../view/systemEmail/index.handlebars', {
            is_layout: true
        });
    } else {
        res.redirect('/')
    }
}

exports.add = async (req, res) => {

    if (req.session.email) {
        try {
            is_layout = true;
            res.render("../view/systemEmail/add", {
                is_layout: is_layout,
            });

        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/");
    }
};