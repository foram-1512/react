const Validator = require('Validator');
var conn = require("../config/database");

const { default: localizify } = require('localizify');
var en = require('../languages/en');
var gj = require('../languages/gj');
const { t } = require('localizify');
const message = require('../languages/en');
// const message = require('../languages/gj');

var bypassMethods = new Array("registration", "login", "verifyOTP", "resendOTP", "forgotpassword", "sendOTP", "addUser");

var middleware = {

  extractHeaderLanguage: function (req, res, callback) {
    var headerlang = (req.headers['accept-language'] != undefined && req.headers['accept-language'] != '') ? req.headers['accept-language'] : 'en';
    req.lang = headerlang;
    // req.language = (headerlang == 'en') ? en : gj;

    localizify
      .add('en', en)
      .add('gj', gj)
      .setLocale(headerlang);

    callback();

  },

  send_response: function (req, res, statuscode, code, message, data) {
    middleware.getMessage(req.lang, message, function (translated_message) {

      let response = {
        code: code,
        message: translated_message,
        data: data
      }
      res.status(statuscode);
      res.send(response);
    })
  },

  getMessage: function (language, message, callback) {

    callback(t(message.keyword, message.content))

  },


  checkValidationRules: function (res, request, rules, message) {
    const v = Validator.make(request, rules, message);
    if (v.fails()) {
      const errors = v.getErrors();
      var error = " ";
      for (var key in errors) {
        error = errors[key][0];
        break;
      }
      response_data = {
        code: "0",
        message: error,
      }
      res.status(200);
      res.send(response_data);
      return false;
    } else {
      return true;
    }
  },


  validateApiKey: function (req, res, callback) {
    var api_key =
      req.headers["api_key"] != undefined && req.headers["api_key"] != "" ? req.headers["api_key"] : "";

    if (api_key != "") {
      try {
        var apikey = req.headers["api_key"];
        if (apikey != "" && apikey == process.env.API_KEY) {
          callback();
        } else {
          response_data = {
            code: "0",
            message: t('header_key_value_incorrect'),
          };
          res.status(401);
          res.send(response_data);
        }
      } catch (error) {
        response_data = {
          code: 0,
          message: t('header_key_value_incorrect'),
        };
        res.status(401);
        res.send(response_data);
      }
    } else {
      response_data = {
        code: 0,
        message: t('header_key_value_incorrect')
      }
      res.status(401);
      res.send(response_data);

    }
  },

  validateHeaderToken: function (req, res, callback) {
    var headertoken = (req.headers['token'] != undefined && req.headers['token'] != "") ? req.headers['token'] : '';

    var path_data = req.path.split("/");
    if (bypassMethods.indexOf(path_data[4]) === -1) {
      if (headertoken != '') {
        try {
          var token = req.headers['token'];
          if (token != "") {
            conn.query(`select * from tbl_user where token = '${headertoken}'`, function (error, result) {
              // console.log("ffffff", this.sql);
              if (!error && result.length > 0) {
                req.user_id = result[0].user_id;
                callback();
              } else {
                response_data = {
                  code: '0',
                  message: t('Invalid token1')

                }
                res.status(401);
                res.send(response_data);
              }
            });
          } else {
            response_data = {
              code: '0',
              message: t('Invalid token2')

            }
            res.status(401);
            res.send(response_data);
          }
        } catch (error) {
          response_data = {
            code: '0',
            message: t('Invalid token3')

          }
          res.status(401);
          res.send(response_data);
        }
      } else {
        response_data = {
          code: '0',
          message: t('Invalid token4')

        }
        res.status(401);
        res.send(response_data);
      }
    } else {
      callback();
    }
  },

}




module.exports = middleware;