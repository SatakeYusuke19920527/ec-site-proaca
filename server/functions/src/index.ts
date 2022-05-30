import * as functions from "firebase-functions";
const admin = require('firebase-admin');
admin.initializeApp();
const Stripe = require("stripe");

const stripe = new Stripe("秘密鍵", {
  apiVersion: "2020-08-27",
});

exports.createPaymentSession = functions.https.onCall(async (data, context) => {
  try {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price:"商品キー",
        quantity: 1,
      },
    ],
    mode: "payment",
    //決済が終わった後にリダイレクトするURLを設定します
    success_url: `http://localhost:3000?payment_success`,
    cancel_url: `http://localhost:3000?payment_cancel`,
  });
    const res = session;
    functions.logger.log(res);
    return res
  } catch (error) {
    functions.logger.log("=========ERROR=========");
    functions.logger.log(error);
  }
});