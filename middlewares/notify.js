import axios from "axios";
import { HttpError } from "../utils/index.js";
import { format } from "date-fns";

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const getTelegramMsg = (body, type = "error") => {
  let msg = "";

  switch (type) {
    case "error":
      msg = `New in-app error ${body}`;
      break;
    case "notification":
      msg = `New pick-up created: ${body._id}, date: ${format(body.mainInfo.date, "dd.MM.yyyy")}, between: ${format(body.mainInfo.startTime, "HH:mm")} — ${format(body.mainInfo.endTime, "HH:mm")}
      `;
      break;
  }

  return encodeURIComponent(msg);
};

const notifyTracking = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    let data;
    try {
      data = typeof body === "string" ? JSON.parse(body) : body;

      const history = data?.tracking?.history || [];

      if (!history.length) {
        console.warn("Tracking history is empty");
        return originalSend.call(this, body);
      }

      const { status } = history[history.length - 1];

      if (status === 100) {
        const msg = getTelegramMsg(data, "notification");
        axios
          .get(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${msg}`
          )
          .catch((err) => console.error("Telegram error:", err));
      }
    } catch (err) {
      console.error("Error parsing or processing body in notifyTracking:", err);
    }

    return originalSend.call(this, body);
  };

  next();
};

export default notifyTracking;
