import { sendEmail, HttpError, sendTelegram } from "../helpers/index.js";
import { getConfirmationHTML } from "../helpers/getConfirmationHTML.js";

const notify = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    let data;
    try {
      data = typeof body === "string" ? JSON.parse(body) : body;

      const history = data?.tracking?.history || [];

      if (!history.length) {
        return next(HttpError(400, `Tracking history is empty ${data._id}`));
        // return originalSend.call(this, body);
      }

      const { status } = history[history.length - 1];

      if (status === 100) {
        sendTelegram(data, "notification");
      }

      if (status === 200) {
        const emailData = {
          to: data.sender.email,
          subject: `Pick-up confirmation ${data._id}`,
        };
        sendEmail({
          data: emailData,
          html: getConfirmationHTML({ parcel: data, lang: "de" }),
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
