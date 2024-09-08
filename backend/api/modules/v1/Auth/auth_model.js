var conn = require("../../../config/database");
var common = require("../../../config/common");
// var constant = require("../../../config/constant");
var md5 = require("md5");
const router = require("./routes");
var asyncLoop = require("node-async-loop");
var validator = require('../../../middleware/validators');
const { default: localizify } = require('localizify');
const { t } = require('localizify');

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY)


var Auth = {

    registration: function (request, callback) {
        var insertdata = {
            name: request?.name,
            email: request?.email,
            country_code: request.country_code,
            mobile: request.mobile,
            password: md5(request?.password),
            role: request?.role,
            token: common.generateToken(40)
        };


        common.checkEmailUsernameCombination(request, (userdetail) => {
            // console.log(userdetail);

            if (userdetail != null && request?.email == userdetail.email) {

                callback(200, "0", { keyword: 'rest_keywords_unique_email_error', content: {} }, null);

            }
            else if (userdetail != null && request.mobile == userdetail.mobile) {

                callback(200, "0", { keyword: 'rest_keywords_unique_mobile_error', content: {} }, null);

            } else {
                common.singleInsert("tbl_user", insertdata, async (user_id, error) => {

                    if (user_id > 0) {
                        const customer = await stripe.customers.create({
                            name: request?.name,
                            email: request?.email,
                        });
                        //   console.log("data",customer)
                        var uQuery = `update tbl_user set stripe_id = '${customer.id}' where id = ${user_id}`
                        conn.query(uQuery, (err1, result1) => {
                            if (err1) {
                                (200, "0", { keywordcallback: 'rest_keywords_wrong_query', content: {} }, err1);
                            } else {
                                //   callback("1", t("Signup Success"), customer);
                                common.getUserDetails(user_id, (userData) => {
                                    if (userData != null) {
                                        callback(200, "1", { keyword: 'Registration Success', content: {} }, userData);
                                    }
                                })
                            }
                        })
                    } else {
                        callback(200, "0", { keyword: 'Registration Not Success', content: {} }, error);
                    }
                });
            }
        });
    },

    login: function (request, callback) {

        common.checkEmailUsernameCombination(request, (userData) => {

            if (userData == null || request?.email != userData?.email) {

                callback(200, "0", { keyword: 'rest_keywords_invalid_email', content: {} }, null);

            } else {
                query = `SELECT * FROM tbl_user AS u WHERE u.email ='${request?.email}'  AND u.password ='${md5(request?.password)}'and u.is_active = 1`;


                conn.query(query, function (error, result) {
                    if (error) {
                        callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);
                    } else {
                        if (result?.length == 0) {

                            callback(200, "2", { keyword: 'rest_keywords_invalid_password', content: {} }, null);

                        } else {

                            callback(200, "1", { keyword: 'rest_keywords_login_success', content: {} }, result);

                        }
                    }
                })

            }
        })

    },

    addUser: function (request, callback) {
        var insertdata = {
            name: request?.name,
            email: request?.email,
            country_code: request.country_code,
            mobile: request.mobile,
            password: md5(request?.password),
            role: request?.role,
            token: common.generateToken(40)
        };

        common.checkEmailUsernameCombination(request, (userdetail) => {
            // console.log(userdetail);

            if (userdetail != null && request?.email == userdetail.email) {

                callback(200, "0", { keyword: 'rest_keywords_unique_email_error', content: {} }, null);

            }
            else if (userdetail != null && request.mobile == userdetail.mobile) {

                callback(200, "0", { keyword: 'rest_keywords_unique_mobile_error', content: {} }, null);

            } else {
                common.singleInsert("tbl_user", insertdata, (user_id, error) => {

                    if (user_id > 0) {


                        common.getUserDetails(user_id, (userData) => {
                            if (userData != null) {
                                callback(200, "1", { keyword: 'User Added Successfully', content: {} }, userData);
                            }
                        })

                    } else {

                        callback(200, "0", { keyword: 'User not added', content: {} }, error);

                    }

                });
            }
        });
    },

    user_listing: function (request, callback) {

        const selectQuary = `select * from tbl_user where role = 'subadmin'and is_active=1 and is_delete=0`;
        conn.query(selectQuary, function (er, re) {
           
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {
                callback(200, "1", { keyword: 'user Listing successfully get' }, re);
            }
        }
        )
    },

    delete_user: function (request, callback) {

        let selectQuery = `update tbl_user set is_delete = 1 where id=${request?.id} and is_active = 1;`

        conn.query(selectQuery, (error, result) => {
            if (error) {

                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);

            } else {
                if (result?.affectedRows > 0) {
                    // console.log(result);
                    callback(200, "1", { keyword: 'Delelte Successfully', content: {} }, result);

                } else {

                    callback(200, "0", { keyword: 'rest_keywords_not_delete', content: {} }, null);

                }
            }
        })
    },

    
    edit_user: function (request, callback) {
        var insertdata = {};
        request?.name != "" && request?.name != undefined ? (insertdata.name = request?.name) : insertdata;
        request?.role != "" && request?.role != undefined ? (insertdata.role = request?.role) : insertdata;
        request?.email != "" && request?.email != undefined ? (insertdata.email = request?.email) : insertdata;
        request?.country_code != "" && request?.country_code != undefined ? (insertdata.country_code = request?.country_code) : insertdata;
        request?.mobile != "" && request?.mobile != undefined ? (insertdata.mobile = request?.mobile) : insertdata;

        

        conn.query(`update tbl_user set ? where id = '${request?.id}' `, insertdata,(err, res) => {
            console.log("id",request.id);
            console.log(this.sql);
     
                if (err) {
                    callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, err);

                } else {
                    callback(200, "1", { keyword: 'Data Upadated Successfully.!!!', content: {} }, res);
            }
        })
    },

    add_permission: function (request, callback) {
        console.log(request);
    
        var values = {
            user_id: request?.user_id,
            module_id: request?.module_id,
            is_added: request?.is_added ? request.is_added : false,
            is_deleted: request?.is_deleted ? request.is_deleted : false,
            is_edit: request?.is_edit ? request.is_edit : false,
            is_view: request?.is_view ? request.is_view : false
        };
    
        conn.query('INSERT INTO tbl_permission SET ?', values, (error, result) => {
            if (error) {
                return callback(200, "0", { keyword: 'rest_keywords_permission_failed', content: {} }, error);
            }
    
            if (result.insertId > 0) {
                var uQuery = `UPDATE tbl_permission SET ? WHERE id = ${result.insertId}`;
                conn.query(uQuery, (err1, updateResult) => {
                    if (err1) {
                        return callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, err1);
                    } else {
                        return callback(200, "1", { keyword: "rest_keywords_permission_added" }, updateResult);
                    }
                });
            } else {
                callback(200, "0", { keyword: 'rest_keywords_permission_failed', content: {} }, null);
            }
        });
    },
    
    module_listing: function (request, callback) {

        const selectQuary = `select * from tbl_module where is_active=1 and is_delete=0`;
        conn.query(selectQuary, function (er, re) {
           
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {
                callback(200, "1", { keyword: 'Module Listing successfully get' }, re);
            }
        }
        )
    },

    view_userDetail: function (request, callback) {

        let selectQuery = `select * from tbl_user where id = ${request?.id} and is_active = 1 and is_delete = 0;`

        conn.query(selectQuery, (error, result) => {

            if (error) {

                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);

            } else {
                if (result?.length == 0) {

                    callback(200, "2", { keyword: 'rest_keywords_data_not_found', content: {} }, null);

                } else {

                    callback(200, "1", { keyword: 'rest_keywords_data_found', content: {} }, result);

                }
            }
        })
    },

    // add_permission: function (request, callback) {
    //     console.log(request);
    //     var values = {
    //     user_id:request?.user_id ,
    //     module_id:request?.module_id,
    //     is_added: request?.is_added != "" && request?.is_added != undefined ? false : values,
    //     is_deleted: request?.is_deleted != "" && request?.is_deleted != undefined ? false : values,
    //     is_edit :  request?.is_edit != "" && request?.is_edit != undefined ? false : values,
    //     is_view :  request?.is_view != "" && request?.is_view != undefined ? false : values
    // }
        

    //     conn.query(`insert into tbl_permission SET ? `, values, async (error, result) => {
    //         if (result.insertId > 0) {
              

    //             var uQuery = `update tbl_permission set where id = ${result.insertId}`
    //             conn.query(uQuery, (err1, result) => {
    //                 console.log(this.sql)
    //                 if (err1) {
    //                     callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, err1);

    //                 } else {
    //                     callback(200, "1", { keyword: "rest_keywords_permission_added" }, result);
    //                 }
    //             })

    //         } else {

    //             callback(200, "0", { keyword: 'rest_keywords_permission_failed', content: {} }, error);

    //         }
    //     });
    // },


    add_book: function (request, callback) {
        console.log(request);
        var values = {
            user_id: request.user_id,
            name: request?.name,
            title: request?.title,
            author: request.author,
            thumbnail: request.thumbnail,
            pdf: request.book_pdf,
            pages: request.pages,
            price: request.price,
            tags: request?.tags,
            token: common.generateToken(40)

        }

        conn.query(`INSERT INTO tbl_book SET ? `, values, async (error, result) => {
            if (result.insertId > 0) {
                const product = await stripe.products.create({
                    name: request.name,
                });
                const price = await stripe.prices.create({
                    currency: 'usd',
                    unit_amount: 1000,
                    recurring: {
                        interval: 'month',
                    },
                    product: product.id
                });

                var uQuery = `update tbl_book set book_stripe_id = '${product.id}' , price_id = '${price.id}' where id = ${result.insertId}`
                conn.query(uQuery, (err1, result) => {
                    console.log(this.sql)
                    if (err1) {
                        callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, err1);

                    } else {
                        callback(200, "1", { keyword: "rest_keywords_book_added" }, result);
                    }
                })

            } else {

                callback(200, "0", { keyword: 'rest_keywords_book_not_insert', content: {} }, error);

            }
        });
    },

    book_listing: function (req, callback) {

        var query = `select b.*,b.id as book_id,u.id as user_id,concat('http://localhost:3344/readthumbnail/',b.thumbnail) as thumbnail,concat('http://localhost:3344/readbooks/',b.pdf) as pdf,time_format(b.created_at, '%h:%i %p') as time   from tbl_book b 
        join tbl_user u on u.id=b.user_id WHERE  b.is_active = 1 and b.is_delete=0`;


        //  select b.*,u.*,concat('http://localhost:3344/readthumbnail/',b.thumbnail) as thumbnail,concat('http://localhost:3344/readbooks/',b.pdf) as pdf,time_format(b.created_at, '%h:%i %p') as time   from tbl_book b 
        //  join tbl_user u on u.id=b.user_id WHERE b.is_active = 1`

        conn.query(query, function (err, result) {
            if (err) {
                callback(200, "0", { keyword: "rest_keywords_something_went_wrong" }, err);
            } else if (result.length > 0) {
                callback(200, "1", { keyword: "book_data_succ" }, result);
            } else {
                callback(200, "2", { keyword: "book_data_not_found" }, []);
            }
        });
    },

    // book_listing: function (request, callback) {
    //     var search = request?.search || '';
    //     if (search !== '') {
    //         var searchQuery = `(name Like '${search}%' or author Like '${search}%' or title Like '${search}%') and`
    //         console.log("rtghj", searchQuery);
    //     }
    //     else {
    //         var searchQuery = ``
    //     }

    //     var pageQuery = `LIMIT ${request?.pageSize} OFFSET ${request.pageSize * request.page}`

    //     let selectQuery = `select * from tbl_book where ${searchQuery} is_active = 1 and is_delete = 0 ${pageQuery};
    //     SELECT COUNT(*) AS total FROM tbl_book WHERE ${searchQuery} is_active = 1 AND is_delete = 0;`
    //     console.log("selectQuery",this.sql);

    //     conn.query(selectQuery, (error, result) => {
    //         console.log("res",result);

    //         if (error) {

    //             callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);

    //         } else {
    //             if (result?.length == 0) {

    //                 callback(200, "2", { keyword: 'rest_keywords_data_not_found', content: {} }, null);

    //             } else {

    //                 callback(200, "1", { keyword: 'rest_keywords_data_found', content: {} }, result);

    //             }
    //         }
    //     })
    // },

    view_bookDetail: function (request, callback) {

        let selectQuery = `select * from tbl_book where id = ${request?.book_id} and is_active = 1 and is_delete = 0;`

        conn.query(selectQuery, (error, result) => {

            if (error) {

                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);

            } else {
                if (result?.length == 0) {

                    callback(200, "2", { keyword: 'rest_keywords_data_not_found', content: {} }, null);

                } else {

                    callback(200, "1", { keyword: 'rest_keywords_data_found', content: {} }, result);

                }
            }
        })
    },

    delete_book: function (request, callback) {

        let selectQuery = `update tbl_book set is_delete = 1 where id=${request?.book_id} and is_active = 1;`

        conn.query(selectQuery, (error, result) => {
            if (error) {

                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);

            } else {
                if (result?.affectedRows > 0) {
                    // console.log(result);
                    callback(200, "1", { keyword: 'Delelte Successfully', content: {} }, result);

                } else {

                    callback(200, "0", { keyword: 'rest_keywords_not_update', content: {} }, null);

                }
            }
        })
    },

    edit_book: function (request, callback) {
        var insertdata = {};
        request?.name != "" && request?.name != undefined ? (insertdata.name = request?.name) : insertdata;
        request?.title != "" && request?.title != undefined ? (insertdata.title = request?.title) : insertdata;
        request?.author != "" && request?.author != undefined ? (insertdata.author = request?.author) : insertdata;
        request?.thumbnail != "" && request?.thumbnail != undefined ? (insertdata.thumbnail = request?.thumbnail) : insertdata;
        request?.pdf != "" && request?.pdf != undefined ? (insertdata.pdf = request?.pdf) : insertdata;
        request?.pages != "" && request?.pages != undefined ? (insertdata.pages = request?.pages) : insertdata;
        request?.price != "" && request?.price != undefined ? (insertdata.price = request?.price) : insertdata;
        request?.tags != "" && request?.tags != undefined ? (insertdata.tags = request?.tags) : insertdata;

        conn.query(`update tbl_book set ? where id = '${request?.id}' `, insertdata,(err, res) => {
            console.log("id",request.id);
            console.log(this.sql);
        // conn.query(`update tbl_book set ? where id = '${request?.id}'`, insertdata, async (err, res) => {
            // if (res.affectedRows > 0) {
                // const subscription = await stripe.subscriptions.update(
                //     'sub_1MowQVLkdIwHu7ixeRlqHVzs',
                //     {
                //         metadata: {
                //             order_id: '6735',
                //         },
                //     }
                // );
                if (err) {
                    callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, err);

                } else {
                    callback(200, "1", { keyword: 'Data Upadated Successfully.!!!', content: {} }, res);

                // }

            }
            // console.log(insertdata);


        })
    },

    logout: function (user_id, request, callback) {
        let data = {
            token: "",
        }
        let updateData = `update tbl_user set token = ? where id=${user_id} and is_active=1`;
        conn.query(updateData, [data], function (error, result) {
            if (error) {
                callback(200, '0', { keyword: "rest_keywords_something_went_wrong" }, null);
            }
            else {
                callback(200, '1', { keyword: "rest_keywords_loged_out" }, result);
            }
        })
    },

    add_to_cart: function (request, callback) {
        var insertdata = {
            book_id: request.id,
            user_id: request.user_id,
            per_price: request.price,
            qty: request.quantity
        }
        let insertBookQuery = `INSERT INTO tbl_cart SET ?`;


        conn.query(insertBookQuery, insertdata, function (error, result) {

            if (error) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, err);
            } else {
                callback(200, "1", { keyword: 'Book Add to cart successfully' }, result);
            }

        });

    },

    cart_listing: function (request, callback) {

        const selectQuary = `select c.*,b.price,b.name,b.title,b.author from tbl_book b join tbl_cart c  on b.id=c.book_id join  tbl_user u on u.id = c.user_id where u.id = ${request.user_id} and c.is_active=1 and c.is_delete=0`;
        conn.query(selectQuary, function (er, re) {
            // console.log("ffff",this.sql);
            // console.log("eeee",re)
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {
                callback(200, "1", { keyword: 'Add to cart Listing successfully get111' }, re);
            }
        }
        )
    },

    cart_remove: function (request, callback) {
        deleteQuary = `Delete from tbl_cart where id=${request.id} and is_delete=0`;
        conn.query(deleteQuary, function (er, re) {
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);

            } else {

                callback(200, "1", { keyword: 'Remove Iteam from cart successfully', content: {} }, re);
            }
        })
    },

    add_order: function (request, callback) {
        var insertdata = {
            cart_id: request.cart_id,
            book_id: request.book_id,
            user_id: request.user_id,
            qty: request.qty,
            per_price: request.per_price,
            total_price: request.per_price * request.qty,
        }
        let insertBookQuery = `INSERT INTO tbl_order SET ?`;
        conn.query(insertBookQuery, [insertdata], function (error, result) {
            if (error) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, error);
            } else {
                callback(200, "1", { keyword: 'Book Add to cart successfully', content: {} }, result);
            }
        });
    },

    order_listing: function (request, callback) {
        selectQuary = `select o.*,(o.total_price*o.qty) as sub_total,b.name,b.title,b.author from tbl_order o join tbl_book b on b.id=o.book_id join tbl_user u on u.id= o.user_id where u.id= ${request.user_id} and o.is_active=1 and o.is_delete=0`;
        conn.query(selectQuary, function (er, re) {
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {
                callback(200, "1", { keyword: 'Order Listing successfully get', content: {} }, re);
            }
        })
    },

    admin_order_listing: function (request, callback) {
        selectQuary = `SELECT 
        o.*, 
        CONCAT(DATE_FORMAT(o.created_at, '%h:%i %p'), ' ', 
            CASE 
                WHEN DATEDIFF(CURRENT_DATE(), DATE(o.created_at)) = 0 THEN 'today'
                WHEN DATEDIFF(CURRENT_DATE(), DATE(o.created_at)) = 1 THEN '1 day ago'
                ELSE CONCAT(DATEDIFF(CURRENT_DATE(), DATE(o.created_at)), ' days ago')
            END
        ) AS order_date  
    FROM 
        tbl_order o 
    WHERE 
        o.is_active = 1 
        AND o.is_delete = 0;
    `;
        conn.query(selectQuary, function (er, re) {
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {

                callback(200, "1", { keyword: 'Order Listing successfully get', content: {} }, re);
            }
        })
    },

    update_status: function (request, callback) {
        var data = {
            status: request.status
        }
        updateQuary = `update tbl_order set status='Accepted' where id=${request.id}`;
        conn.query(updateQuary, [data], function (er, re) {
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            }
            else {
                callback(200, "1", { keyword: 'status updated', content: {} }, re);
            }
        })
    },

    update_status_reject: function (request, callback) {
        var data = {
            status: request.status
        }
        updateQuary = `update tbl_order set status='Rejected' where id=${request.id}`;
        conn.query(updateQuary, [data], function (er, re) {
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            }
            else {

                callback(200, "1", { keyword: 'status updated', content: {} }, re);
            }
        })
    },

    order_Count: function (request, callback) {
        selectQuary = `select o.*,COUNT(o.id) as total_order,COUNT(u.id) as total_user from tbl_order o
        JOIN tbl_user u 
        ON u.id = o.user_id 
        where o.is_active=1 and o.is_delete=0  and u.is_active = 1 and u.is_delete = 0`;

        conn.query(selectQuary, function (er, re) {
            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {
                callback(200, "1", { keyword: 'Order Listing successfully get', content: {} }, re);
            }
        })
    },

    place_order: function (request, callback) {

        let selectCart = `select * from tbl_cart where user_id = ${request.user_id}`;

        conn.query(selectCart, (error, cartData) => {
            console.log("data", this.sql);
            if (error) {

                callback(200, "0", { keyword: 'rest_keywords_wrong_query1', content: {} }, error.sqlMessage);

            } else {
                if (cartData.length == 0) {

                    callback(200, "2", { keyword: 'rest_keywords_data_not_found', content: {} }, null);

                } else {
                    var price = 0;
                    //   var new_price = 0;
                    asyncLoop(cartData, (item, next) => {
                        let selectProductData = `select * from tbl_book as b where id=${item.book_id}`;
                        conn.query(selectProductData, (error1, result1) => {
                            if (error1) {
                                callback('0', t('rest_keywords_wrong_query11'), error1.sqlMessage);

                            } else {
                                if (result1.length == 0) {

                                    callback(200, "2", { keyword: 'rest_keywords_data_not_found', content: {} }, null);

                                } else {
                                    price += result1[0].price;
                                    //   new_price += result1[0].new_price;
                                    item.Price = result1[0].price;
                                    //   item.NewPrice = result1[0].new_price;
                                    next();
                                }
                            }
                        })
                    }, () => {

                        let sub_total = cartData.reduce((total, book) => {
                            return total + (book.Price * book.qty);
                        }, 0);
                        var orderObj = {
                            user_id: request.user_id,


                            sub_total: sub_total,
                            //   discount_price: price - new_price, //==================
                            // delivery_charge: request.delivery_charge,
                            status: 'Pending',

                        }
                        let inserOrder = `insert into tbl_order set ?`;
                        conn.query(inserOrder, orderObj, (error1, result1) => {
                            if (error1) {
                                callback(200, "0", { keyword: 'rest_keywords_wrong_query11', content: {} }, error1.sqlMessage);

                            } else {
                                if (result1.insertId < 0) {
                                    callback(200, "0", { keyword: 'rest_keywords_not_insert', content: {} }, null);

                                } else {

                                    var i = 0;
                                    asyncLoop(cartData, (item, next) => {
                                        var orderDetailsObj = {
                                            book_id: cartData[i].book_id,
                                            user_id: request.user_id,
                                            order_id: result1.insertId,
                                            qty: cartData[i].qty,
                                            per_book_price: cartData[i].Price,
                                            total_amount: cartData[i].qty * cartData[i].Price,
                                        }

                                        let insertOrderDetails = `insert into tbl_order_details set ?`
                                        conn.query(insertOrderDetails, orderDetailsObj, (err, res) => {
                                            if (err) {
                                                callback(200, "0", { keyword: 'rest_keywords_wrong_query11111', content: {} }, err.sqlMessage);

                                            } else {
                                                if (res.insertId < 0) {
                                                    callback(200, "2", { keyword: 'rest_keywords_data_not_found', content: {} }, null);

                                                } else {
                                                    i++;
                                                    next();

                                                }
                                            }
                                        })
                                    }, () => {

                                        callback(200, "2", { keyword: 'rest_keywords_order_insert', content: {} }, null);

                                    })
                                }
                            }
                        })


                    })

                }
            }
        })
    },

    paymentLinkGeneration: async (requestData, callback) => {

        // console.log(requestData, 'payment');

        var priceTotal = [];

        var total_qty1 = 0;

        requestData.forEach((element) => {
            priceTotal.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: element.name,
                        images: [element.image],
                    },
                    unit_amount: element.price * 100,
                },
                quantity: element.qty,
            })
        });

        // console.log(priceTotal,'ssss');

        // try {

        const session = await stripe.checkout.sessions.create({
            line_items: priceTotal,
            mode: "payment",
            success_url: `http://localhost:3000/Home`,
        });
        console.log('session: ', session);
        return callback(200, "1", { keyword: 'Payment Success', content: {} }, session);

    },

    subscription: function (request, callback) {
        let insertObj = {
            name: request?.name,
            description: request?.description,
            price: request?.price
        }

        common.singleInsert("tbl_subscription_detail", insertObj, async (result, error) => {
            if (result.length > 0) {
                callback(200, "0", { keyword: 'Subscription failed', content: {} }, error)

            } else {
                callback(200, "1", { keyword: 'Subscription successful', content: { sessionId: session.id } });
            }
        })
    },
  
    subscription_listing: function (request, callback) {

        const selectQuary = `select sd.* from tbl_subscription_detail sd where sd.is_active=1 and sd.is_delete=0`;
        conn.query(selectQuary, function (er, re) {

            if (er) {
                callback(200, "0", { keyword: 'rest_keywords_wrong_query', content: {} }, er);
            } else {
                callback(200, "1", { keyword: 'Subscription Detail found' }, re);
            }
        }
        )
    },

    get_subscription_page: async (request, callback) => {
        console.log("object", request)
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: "auto",
            customer: request.customer_id,
            payment_method_types: ["card"],

            line_items: [
                {
                    price: request.price_id,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `http://localhost:4200/dashboard`,
            cancel_url: `http://localhost:4200/dashboard`,
        });


        return callback(200, "1", { keyword: 'Success' }, session);

    },

    cancel_subscription: function (request, callback) {

        const query = `DELETE FROM tbl_user WHERE stripe_id = ${request.id} AND is_active = 1 AND is_delete = 0`;

        conn.query(query, [id], async (error, result) => {
            if (error) {
                callback(200, "0", { keyword: 'Database query failed', content: {} }, error);
                return;
            }

            if (result.affectedRows > 0) {

                const subscription = await stripe.subscriptions.del('sub_1MlPf9LkdIwHu7ixB6VIYRyX');
                callback(200, "1", { keyword: 'Subscription successful', content: { subscription } });

            } else {
                callback(404, "0", { keyword: 'No active subscription found', content: {} });
            }
        })
    },


    // maual_subscription : function

    
    // signup: function (request, callback) {
    //     console.log(request)
    //     var insertdata = {
    //         name: request?.name,
    //         email: request?.email,
    //         country_code: request.country_code,
    //         mobile: request.mobile,
    //         password: md5(request?.password),
    //         // role: request?.role,
    //         role: request.role || 'subadmin',
    //         token: common.generateToken(40)

    //     };


    //     common.checkEmail(request, (userdetail) => {

    //         if (userdetail != null && request.email == userdetail.email) {

    //             callback(200, "0", { keyword: 'rest_keywords_unique_email_error', content: {} }, null);

    //         } else {
    //             common.singleInsert("tbl_user", insertdata, async (user_id, error) => {

    //                 if (user_id > 0) {

    //                     common.getUserDetails(user_id, (userData) => {

    //                         callback(200, "1", { keyword: 'Registration Success', content: {} }, userData);
    //                     })



    //                 } else {

    //                     callback(200, "0", { keyword: 'Registration Not Success', content: {} }, null);


    //                 }

    //             });
    //         }
    //     });
    // },

    // // login: function (request, callback) {

    // //     common.checkEmail(request, (userData) => {

    // //         if (userData == null || request.email != userData.email && request.email) {

    // //             callback(200, "0", { keyword: 'rest_keywords_unique_email_error', content: {} }, null);

    // //         } else {
    // //             query = `SELECT * FROM tbl_user AS u WHERE  u.email = '${request.email}' AND u.password ='${request.password}'and u.is_active = 1`;


    // //             conn.query(query, function (error, result) {

    // //                 if (error) {
    // //                     (200, "0", { keywordcallback: 'rest_keywords_wrong_query', content: {} }, error);

    // //                 } else {
    // //                     if (result.length == 0) {
    // //                         callback(200, "2", { keyword: 'rest_keywords_invalid_password', content: {} }, null);

    // //                     } else {
    // //                         callback(200, "1", { keyword: 'rest_keywords_login_success', content: {} }, result);

    // //                     }
    // //                 }
    // //             })

    // //         }
    // //     })



    // // },


  
    
};


module.exports = Auth;