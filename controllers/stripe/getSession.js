import { ctrlWrapper, HttpError } from "../../utils/index.js";
import Stripe from "stripe";

const { STRIPE_SECRET } = process.env;

const stripe = new Stripe(STRIPE_SECRET);

const getSession = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(id);

    if (!session || !session.id) {
      throw HttpError(404, "Session not found");
    }

    const data = {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      receipt_url: session.receipt_url,
      url: session.url,
    };

    res.status(200).json(data);
  } catch (error) {
    if (error) {
      throw HttpError(400, error.message);
    }

    throw HttpError(500, error.message);
  }
};

export default ctrlWrapper(getSession);
