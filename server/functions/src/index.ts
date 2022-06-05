import * as functions from "firebase-functions";
const admin = require('firebase-admin');
admin.initializeApp();
const Stripe = require("stripe");
const secretkey = functions.config().stripe.secretkey
const stripe = new Stripe(secretkey, {
  apiVersion: "2020-08-27",
});

exports.createPaymentSession = functions.https.onCall(async (data, _context) => {
  try {
    // const priceKey = data.priceKey
    // console.log("🚀 ~ file: index.ts ~ line 13 ~ exports.createPaymentSession=functions.https.onCall ~ priceKey", priceKey)
    functions.logger.log(data.priceKey);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price:data.priceKey,
        quantity: 1,
      },
    ],
    mode: "payment",
    //決済が終わった後にリダイレクトするURLを設定します
    success_url: `http://localhost:3000?payment_success`,
    cancel_url: `http://localhost:3000/main?payment_cancel`,
  });
    const res = session;
    functions.logger.log(res);
    return res
  } catch (error) {
    functions.logger.log("=========ERROR=========");
    functions.logger.log(error);
  }
});

exports.getProductInfo = functions.https.onCall(async (data, context) => {
  try {
    return new Promise(async (resolve, reject) => {
      const products = await stripe.products.list()
      const prices = await stripe.prices.list()
      functions.logger.log(products);
      functions.logger.log(prices);
      let returnObj = JSON.stringify({products, prices})
      resolve(returnObj)
    })
  } catch (error) {
    functions.logger.log("=========ERROR=========");
    functions.logger.log(error);
  }
});

exports.getUserInfo = functions.https.onCall(async (data, context) => {
  try {
    return new Promise(async (resolve, reject) => {
      const customers = {
        'email': data.email
      }
      stripe.customers.create(
        customers,
        function(err: any, customer: { id: string; }) {
          if(err) {
            console.log(err)
          }
          functions.logger.log("🚀 ~ file: index.ts ~ line 66 ~ returnnewPromise ~ customer.id", customer.id);
          functions.logger.log("🚀 ~ file: index.ts ~ line 66 ~ returnnewPromise ~ data.email", data.email);
          let returnObj = JSON.stringify({customerId: customer.id})
          resolve(returnObj)
        }
      );
    })
  } catch (error) {
    functions.logger.log("=========ERROR=========");
    functions.logger.log(error);
  }
});