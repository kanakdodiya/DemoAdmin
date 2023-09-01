const {
    rejects
} = require("assert");
const {
    Handlebars
} = require("express-handlebars");
const req = require("express/lib/request");
const {
    resolve
} = require("path");
const moment = require("moment");
var MomentHandler = require("handlebars.moment");
var handlebars = require("handlebars");
const fs = require('fs');

module.exports = {
    if_equal: function (a, b, options) {
        var checkTypeA = (a && typeof (a) === "object") ? a.toString() : a
        var checkTypeB = (b && typeof (b) == "object") ? b.toString() : b
        if (checkTypeA == checkTypeB) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    if_not_equal: function (a, b, options) {
        if (a != b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    bar: function (req, res, next) {
        return "BAR!";
    },
    isSelected: function (value, key) {
        return value == key ? "selected" : "";
    },
    isChecked: function (value, key) {
        return value == key ? "checked" : "";
    },
    int: function (a) {
        return parseInt(a)
    },
    if_greterThen: function (a, b, options) {
        if (parseInt(a) > parseInt(b)) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    contains: (Needle, Haystack, options) => {
        Needle = Haystack;
        Haystack = Haystack;
        return (Haystack.indexOf(Needle) > -1) ? options.fn(this) : options.inverse(this);
    },
    current_class: function () {
        return req.route;
    },
    if_condition: function (value1, value2, options) {
        if (value1 === value2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    if_count: function (value, option) {
        if (value.length > 0) {
            return option.fn(this);
        }
        return option.inverse(this);
    },
    // substr: function (str, length) {
    //     var maxLength = length;
    //     if (str.length > maxLength) {
    //         return str.substr(0, maxLength) + '...';
    //     } else {
    //         return str;
    //     }
    // },

    // if_datacount: function (value, option) {
    //     if (value > 0) {
    //         return option.fn(this);
    //     }
    //     return option.inverse(this);
    // },
    // user_name: function (val1, val2) {
    //     if (val1) {
    //         var v1 = val1.charAt(0);
    //         var v2 = val2.charAt(0);

    //         return v1.toUpperCase() + v2.toUpperCase();
    //     }
    // },
    // isArraySelected: function (value, arrayData) {
    //     if (arrayData) {
    //         var result = arrayData.includes(value);
    //         return result == true ? "selected" : "";
    //     }
    // },
    // isArrayChecked: function (value, arrayData) {
    //     if (arrayData) {
    //         var result = arrayData.includes(value);
    //         return result == true ? "checked" : "";
    //     }
    // },
    // str_replace: function (value) {
    //     return value.replace(' ', '-');
    // },
    // in_Array: function (ele, list, options) {

    //     if (list.indexOf(ele) > -1) {
    //         return options.fn(this)
    //     }
    //     return options.inverse(this);
    // },
    // setUtcToTime: function (zoneWiseUTC) {
    //     var dateString = momentTimezone.unix(zoneWiseUTC).format("hh:mm A");
    //     return dateString;
    // },
    // getTimeZone: function (datetime, timezone1, timezone2) {
    //     // 05/17/2023 04:00 AM  
    //     var currentZone = momentTimezone.tz(datetime, 'MM/DD/YYYY hh:mm A', timezone1);
    //     var clientZone = currentZone.clone().tz(timezone2 ? timezone2 : 'US/Eastern');
    //     var clientTime = clientZone.format("hh:mm A");
    //     return clientTime;
    // },
    // fromNowTime: function (value) {
    //     var data = moment(value).fromNow();
    //     return data;
    // },
    if_pagination: function (val1, val2, options) {
        if (val1 < val2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    // dateFormate: function (date, format) {
    //     var newDate = new Date(date);
    //     var fullDate = moment(newDate).format(format);
    //     return fullDate;
    // },
    // getArrayLastElement: function (value) {
    //     if (value) {
    //         let strSplit = value.split('/');
    //         let lastElement = strSplit[strSplit.length - 1];
    //         return lastElement;
    //     }
    // },
    // check_length_comment: function (val1, val2, key) {
    //     if (val1 > val2) {
    //         var a = `<div class="view-more-wrapper"><a href="javascript:;" class="view-more viewMore" data-comment-view="${key}">view more</a>`;
    //         var b = `<a href="javascript:;" class="view-more viewLess" data-comment-view="${key}" style="display: none;">view less</a></div>`;
    //         return a + b;
    //     }
    // },
    // hideButton: function (str, length) {
    //     var maxLength = length;
    //     if (str.length < maxLength) {
    //         return `hidden`
    //     }
    // },
    // add: function (val1, val2) {
    //     var addition = val1 + val2;
    //     return addition;
    // },
    // abs: function (val) {
    //     return Math.abs(val)
    // },
    // social_user_name: function (val1) {
    //     let arr = val1.split(' ')
    //     let txt = '';
    //     arr.map((e) => {
    //         txt += e.charAt(0);
    //     });
    //     return txt.toLocaleUpperCase()
    // },
    // getWeek: function (date) {
    //     if (date) {
    //         var week = moment(new Date(date)).format('W');
    //         return 'WK' + week
    //     }
    // },
    // totalAmt: function (data) {
    //     var amt = 0;
    //     const totalAmount = data.map((result) => {
    //         amt += parseFloat(result.iAmount)
    //     });

    //     return amt;
    // },
    // sub: function (val, index) {
    //     return val - index
    // },
    // fileExists: function (img, options) {
    //     if (img) {
    //         const path = img.split("/").slice(3).join("/");
    //         dir = "../assets/assets/" + path;
    //         if (!fs.existsSync(dir)) {
    //             return options.inverse(this);
    //         } else {
    //             return options.fn(this);
    //         }
    //     }
    //     return options.inverse(this);
    // },
    // getId: function (data) {
    //     const ids = [];
    //     if (data) {
    //         data.forEach(element => {
    //             ids.push(element._id.toString())
    //         });
    //     }
    //     return ids;
    // }
};

MomentHandler.registerHelpers(handlebars);