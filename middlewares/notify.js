import { sendEmail, sendTelegram } from "../helpers/index.js";
import { getConfirmationHTML } from "../helpers/getConfirmationHTML.js";
import { HttpError } from "../utils/index.js";

const notify = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    try {
      const parcel = typeof body === "string" ? JSON.parse(body) : body;

      const history = parcel?.tracking?.history || [];

      if (!history.length) {
        return next(HttpError(400, `Tracking history is empty ${parcel._id}`));
        // return originalSend.call(this, body);
      }

      const { status } = history[history.length - 1];

      if (status === 100) {
        sendTelegram(parcel, "notification");
      }

      if (status === 200 && parcel.sender.email) {
        const data = {
          to: parcel.sender.email,
          subject: `Pick-up confirmation ${parcel._id}`,
        };
        sendEmail({
          data,
          html: getConfirmationHTML({ parcel, lang: "de" }),
        });
      }
    } catch (err) {
      return next(HttpError(500, `Notifying error: ${err.message}`));
    }

    return originalSend.call(this, body);
  };

  next();
};

export default notify;
