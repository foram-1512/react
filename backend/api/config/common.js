const { response } = require("express");
var conn = require("../config/database");
var constant = require("../config/constant");
var en = require('../languages/en');
var gj = require('../languages/gj');
const { t } = require('localizify')
const { default: localizify } = require('localizify')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const otpGenerator = require('otp-generator');


var common = {
  checkEmailUsernameCombination: function (request, callback) {

    const query = `SELECT * FROM tbl_user WHERE  
    email = '${request.email}' or mobile='${request.mobile}'and  is_active = 1; `;

    common.common_Singleselect(query, (userdetail) => {

      callback(userdetail);
    });
  },

  checkEmailRole: function (request, callback) {

    const query = `SELECT * FROM tbl_user WHERE  
    email = '${request.email}' and role ='${request.role}'and is_active = 1; `;

    common.common_Singleselect(query, (userdetail) => {

      callback(userdetail);
    });
  },

  singleInsert: function (tablename, params, callback) {
    conn.query(
      "INSERT INTO " + tablename + " SET ?",
      params,
      function (error, result, fields) {
        // console.log(this.sql);
        // console.log('34567', result);
        if (!error) {

          callback(result.insertId, error);
        } else {

          callback(null, error);
        }
      }
    );
  },

  updateUser: function (user_id, params, callback) {
    common.singleUpdate('tbl_user', params, `id = ${user_id}`, (result, error) => {
      if (!error) {

        common.getUserDetails(user_id, (userDetails) => {
          // console.log(userDetails);
          callback(userDetails);
        })
      } else {
        callback(null);
      }
    });
  },


  singleUpdate: function (tablename, params, condition, callback) {
    conn.query(
      "UPDATE " + tablename + " SET ? WHERE " + condition + " ",
      params,
      function (error, result, fields) {

        if (!error) {
          callback(result);
        } else {

          callback(error);
        }
      }
    );
  },

  common_Singleselect: function (query, callback) {
    conn.query(query, function (err, result, fields) {

      if (!err && result.length > 0) {
       
        callback(result[0]);
      } else {
        if (err) {
        }
        callback(null);
      }
    });
  },

  send_response: function (req, res, code, message, data) {
    response_data = {
      code: code,
      message: message,
      data: data,
    };
    res.status(200);
    res.send(response_data);
  },



  generateToken: function (length) {
    const alphnumeric =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphnumeric.length);
      randomCode += alphnumeric[randomIndex];
    }
    return randomCode;
  },


  generateOTP: function (length) {

    const accountSid = process.env.TWILIO_ACCOUT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    var otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    client.messages.create({
      body: `Hello Foram, This is your OTP for verification ${otp}`,
      from: process.env.TWILIO_FROM_NUMBER,
      to: '+917359644260'
    })

    return otp
  },

  getUserDetails: function (user_id, callback) {
    let select = `select *  from tbl_user where id = ${user_id}`;

    conn.query(select, (error, result) => {
      // console.log(result);
      if (error && result.length == 0) {
        callback(error);
      }
      else {

        callback(result);

      }
    })
  },


};

module.exports = common;
