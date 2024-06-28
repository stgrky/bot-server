const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const GOOGLE_CHAT_WEBHOOK_URL =
  "https://chat.googleapis.com/v1/spaces/AAAADoiBuqE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Utx9-s_iQhcTR9rsI54XBHaqdHAt-YWsEqjqb9j-L0M";

app.post("/webhook", async (req, res) => {
  const userMessage = req.body.queryResult.queryText;
  const response = req.body.fulfillmentInfo.tag;

  if (response === "live_agent_request") {
    await axios.post(GOOGLE_CHAT_WEBHOOK_URL, {
      text: `User requested a live agent: ${userMessage}`,
    });
  }

  res.json({
    fulfillmentMessages: [
      {
        text: {
          text: ["A live agent will be with you shortly."],
        },
      },
    ],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
