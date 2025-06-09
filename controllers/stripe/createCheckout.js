import { ctrlWrapper, HttpError } from "../../utils/index.js";
import Stripe from "stripe";

const { STRIPE_SECRET } = process.env;

const stripe = new Stripe(STRIPE_SECRET);

const createCheckout = async (req, res) => {
  const { _id, amount } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: [
      "card",
      "klarna",
      "paypal",
    ],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: `Delivery costs for ${_id}` },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/easyring-frontend/#/createorder/confirm?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/easyring-frontend/#/createorder/confirm?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
  });

  res.status(201).json(session);
};

export default ctrlWrapper(createCheckout);
