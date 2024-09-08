var express = require("express");
var router = express.Router();
var common = require("../../../config/common");
var auth_model = require("./auth_model");
var middleware = require("../../../middleware/validators");
const { default: localizify } = require('localizify');
const { t } = require('localizify');
require('dotenv').config();

// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const type = file.mimetype.split("/")[0];
//       if (type === "image") {
//         cb(null, __dirname + "/../../../../uploads/thumbnail");
//       } else {
//         cb(null, __dirname + "/../../../../uploads/books");
//       }
//     },
//     filename: function (req, file, cb) {

//       const type = file.mimetype.split("/")[0];
//       if (type === "image") {
//         const thumbnail = `${Date.now()}_thumbnail_${file.originalname}`;
//         console.log(file);
//         req.body.thumbnail = thumbnail;
//         cb(null, thumbnail);
//       } else {
//         const book = `${Date.now()}_books_${file.originalname}`;
//         req.body.pdf = book;
//         cb(null, book);
//       }
//     },
//   });


// const upload = multer({ storage: storage });

const multer = require("multer");
const { required } = require("../../../languages/en");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const type = file.mimetype.split("/")[0];
        if (type === "image") {
            cb(null, __dirname + "/../../../uploads/thumbnail");
        } else {
            cb(null, __dirname + "/../../../uploads/books");
        }
    },
    filename: function (req, file, cb) {
        const type = file.mimetype.split("/")[0];
        if (type === "image") {
            const thumbnail = `${Date.now()}_thumbnail_${file.originalname}`;
            req.body.thumbnail = thumbnail;
            cb(null, thumbnail);
        } else {
            const book = `${Date.now()}_books_${file.originalname}`;
            req.body.book_pdf = book;
            cb(null, book);
        }
    },
});

const upload = multer({ storage: storage });


router.post("/registration", function (req, res) {
    var request = req.body;
    var rules = {
        name: "required",
        email: "required",
        password: "required",
        country_code: "required",
        mobile: "required|numeric",
        role: "required",
    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.registration(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/addUser", function (req, res) {
    var request = req.body;
    var rules = {
        name: "required",
        email: "required",
        password: "required",
        country_code: "required",
        mobile: "required|numeric",
        role: "required",
    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.addUser(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.get("/user_listing", function (req, res) {
    var request = req.body;

    var rules = {

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.user_listing(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/delete_user", function (req, res) {
    var request = req.body;
    var rules = {
        // user_id : "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.delete_user(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/add_permission", function (req, res) {
    var request = req.body;
    var rules = {
        user_id: "required",
        module_id: "required",
      
    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.add_permission(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/view_userDetail", function (req, res) {
    var request = req.body;
    var rules = {
        // user_id : "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.view_userDetail(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/edit_user",function (req, res) {
    var request = req.body;
    var rules = {
        // user_id : "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.edit_user(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.get("/module_listing", function (req, res) {
    var request = req.body;

    var rules = {

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.module_listing(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/add_book", upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "book_pdf", maxCount: 1 }]), function (req, res) {
    var request = req.body;
    if (middleware.checkValidationRules(res, request))
        auth_model.add_book(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/login", function (req, res) {
    var request = req.body;
    var rules = {
        // email: "required",
        // password: "required"
    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.login(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.get("/book_listing", function (req, res) {
    var request = req.body;

    var rules = {

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.book_listing(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/delete_book", function (req, res) {
    var request = req.body;
    var rules = {
        // user_id : "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.delete_book(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/view_bookDetail", function (req, res) {
    var request = req.body;
    var rules = {
        // user_id : "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.view_bookDetail(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/edit_book", upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "book_pdf", maxCount: 1 }]),function (req, res) {
    var request = req.body;
    var rules = {
        // user_id : "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.edit_book(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/logout", function (req, res) {
    var request = req.body;
    var rules = {
        user_id: "required",

    };

    var message = {
        required: t('rest_keywords_required_message'),
        numeric: t('rest_keywords_valid_message'),
    };

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.logout(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/add_to_cart", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }
    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.add_to_cart(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});


router.post("/cart_listing", function (req, res) {
    var request = req.body;

    var rules = {
    }
    var message = {
    }
    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.cart_listing(request,function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/cart_remove", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }
    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.cart_remove(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/add_order", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }
    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.add_order(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/order_listing", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.order_listing(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/admin_order_listing", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.admin_order_listing(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/update_status", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }
    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.update_status(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/update_status_reject", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }
    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.update_status_reject(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/order_Count", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.order_Count(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/place_order", function (req, res) {
    var request = req.body;
    var user_id = req.user_id;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.place_order(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        });
});

router.post("/paymentLinkGeneration", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.paymentLinkGeneration(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        }); 
});

router.post("/subscription", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.subscription(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        }); 
});

router.post("/subscription_listing", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.subscription_listing(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        }); 
});

router.post("/get_subscription_page", function (req, res) {
    var request = req.body;
    var rules = {
    }
    var message = {
    }

    if (middleware.checkValidationRules(res, request, rules, message))
        auth_model.get_subscription_page(request, function (statuscode, code, message, data) {
            middleware.send_response(req, res, statuscode, code, message, data);
        }); 
});

////////////////////////////////////////////////////////////

router.post("/signup", function (req, res) {
    var request = req.body;
    var rules = {
        fullname : "required",
        email : "required",
        password : "required",
     
    };
  
    var message = {
      required: t('rest_keywords_required_message'),
      numeric: t('rest_keywords_valid_message'),
    };
  
    if (middleware.checkValidationRules(res, request, rules, message))
      home_model.signup(request, function (code, message, data) {
        common.send_response(req, res, code, message, data);
      });
  });


  router.post("/login", function (req, res) {
    var request = req.body;
    var rules = {

        email : "required",
        password : "required"
      
     
    };
  
    var message = {
      required: t('rest_keywords_required_message'),
      numeric: t('rest_keywords_valid_message'),
    };
  
    if (middleware.checkValidationRules(res, request, rules, message))
      home_model.login(request, function (code, message, data) {
        common.send_response(req, res, code, message, data);
      });
  });

 





module.exports = router;

