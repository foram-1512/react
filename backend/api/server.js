require("dotenv").config();
var cors = require("cors");
var express = require("express"); // import express package
var conn = require("./config/database"); // declare variable
var multer  = require('multer');
let app = express(); // declare variable
app.use(cors());

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_1b4eb41c1d59308eec13e4c3f756ebac56b8e3c56fb87af57d89d4269a1caabe";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // response data print  which are reqested                        


app.get('/readbooks/:filename',function(req,res){
  res.sendFile('E:/hyperlink/react/book_management/backend/api/uploads/books/' +req.params.filename)
  //res.sendFile(__dirname + '/uploads/books/' +req.params.filename)
})
app.get('/readthumbnail/:filename',function(req,res){
  res.sendFile('E:/hyperlink/react/book_management/backend/api/uploads/thumbnail/' +req.params.filename)
  //res.sendFile(__dirname + '/uploads/thumbnail/' +req.params.filename)
})

// var auth = require("./modules/V1/Auth/routes");
var auth = require("./modules/v1/Auth/routes");
app.use('/', require('./middleware/validators').extractHeaderLanguage);//call when execution start
app.use('/', require('./middleware/validators').validateApiKey);//call when execution start
app.use('/',require("./middleware/validators").validateHeaderToken); //call when execution start


app.use("/api/V1/Auth", auth);


// server connection
try {
  app.listen(process.env.PORT);
  console.log("server is running : " + process.env.PORT);
} catch (error) {
  console.log("connection failed.....");
}
