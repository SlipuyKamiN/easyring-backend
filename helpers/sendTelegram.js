import axios from "axios";
import { format } from "date-fns";
import { HttpError } from "../utils/index.js";

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const url = (msg) =>
  `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(msg)}&parse_mode=HTML`;

const sendTelegram = async (body, type = "error") => {
  let msg = "";

  switch (type) {
    case "error":
      msg = `<b>New ERROR in-app:</b>\n` + `${body}`;
      break;
    case "notification":
      msg =
        `<b>New pick-up created:</b>\n` +
        `<a href="https://easyring.delivery/#/tracking/${body._id}">${body._id}</a>\n` +
        `Date: <b>${format(body.mainInfo.date, "dd.MM.yyyy")}</b>\n` +
        `Between: <b>${format(body.mainInfo.startTime, "HH:mm")} — ${format(body.mainInfo.endTime, "HH:mm")}</b>`;
      break;
  }

  return await axios
    .get(url(msg))
    .catch((err) => HttpError(500, `Telegram:${err.message}`));
};

export default sendTelegram;
