const authModel = require("../model/authModel");
const Paginator = require("../library/PaginatorLibrary");
const settingModal = require("../model/settingModel");
const handlebars = require("handlebars");
const fs = require("fs");

exports.index = async (req, res) => {
  if (req.session.email) {
    try {
      is_layout = true;
      res.render("../view/admin/index", {
        is_layout: is_layout,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  } else {
    res.redirect("/");
  }
};

exports.ajax_listing = async (req, res) => {
  if (req.session.email) {
    try {
      let { iAdminId, vAction, searchInput, vPage } = req.body;

      if (
        vAction === "search" ||
        vAction === "delete" ||
        vAction === "multiple_delete"
      ) {
        if (vAction === "delete" && iAdminId != null) {
          await authModel.findByIdAndDelete(iAdminId);
        }

        if (vAction === "multiple_delete" && iAdminId != null) {
          let adminID = iAdminId.split(",");

          await authModel.deleteMany({
            _id: {
              $in: adminID,
            },
          });
        }

        let searchSQL = {};
        if (searchInput.length > 0) {
          let generalSearch = new RegExp(searchInput, "i");
          searchSQL.$or = [
            { username: generalSearch },
            { email: generalSearch },
            // { iContact: generalSearch },
            { status: new RegExp(searchInput) },
          ];
        }

        // Pagination
        var companyData = await settingModal.findOne().exec();

        var dataCount = await authModel.find().count();
        vPage = 1;
        let vItemPerPage = companyData.iItemPerPage;
        let vCount = dataCount;

        if (req.body.vPage != "") {
          vPage = req.body.vPage;
        }

        let criteria = {
          vPage: vPage,
          vItemPerPage: vItemPerPage,
          vCount: vCount,
        };

        let paginator = Paginator.pagination(criteria);
        let start = (vPage - 1) * vItemPerPage;
        let limit = vItemPerPage;
        // End

        let adminData = await authModel.find(searchSQL).skip(start).limit(limit).sort({ _id: "desc" });

        res.render("../view/admin/ajax_listing", {
          layout: false,
          adminData: adminData,
          paginator: paginator,
          datalimit: limit,
          dataCount: dataCount,
          iAgentId: req.session.userId,
        });
      }
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).send({
        message: "error!",
      });
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

exports.add = async (req, res) => {
  if (req.session.email) {
    is_layout = true;
    res.render("../view/admin/add", {
      is_layout: is_layout,
    });
  } else {
    res.redirect("/");
  }
};

exports.edit = async (req, res) => {
  var iAuthId = req.params.iAuthId;

  if (req.session.email) {
    try {
      let adminData = await authModel
        .findOne({
          _id: iAuthId,
        })
        .select("username email status +password");
      is_layout = true;
      res.render("../view/admin/add", {
        is_layout: is_layout,
        adminData: adminData,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect("/");
  }
};

exports.delete = async (req, res) => {
  if (req.session.email) {
    const iAuthId = req.params.iAuthId;
    let deletedData = await authModel.findByIdAndDelete(iAuthId);
    if (deletedData) {
      req.flash("success", "Admin Deleted Successfully");
      res.redirect("/admin");
    }
  } else {
    res.redirect("/");
  }
};

exports.test = async (req, res) => {
  console.log("api");
  // const emailTemplate = fs.readFileSync(path.join(__dirname, "/templates/index.handlebars"), "utf-8")
  const emailTemplate = fs.readFileSync(
    // "../view/email/index.handlebars",
    "./app/view/email/index.handlebars",
    "utf-8"
  );

  const template = handlebars.compile(emailTemplate)

  const messageBody = template({
    name: "David Islo",
    interviewer: "Scott Greenwich",
  });
  // console.log('messageBody: ', messageBody);
};
