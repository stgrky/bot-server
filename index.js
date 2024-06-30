const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

// Middleware to parse incoming JSON request bodies
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body for inspection

  // Extract the user input from the 'text' field in the request body
  const userInput = req.body.text || "No user input available"; // Adjusted to get text directly
  console.log("User Input:", userInput);

  // Define the Google Chat webhook URL
  const chatWebhookUrl =
    "https://chat.googleapis.com/v1/spaces/AAAADoiBuqE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Utx9-s_iQhcTR9rsI54XBHaqdHAt-YWsEqjqb9j-L0M";

  try {
    // Send the message to Google Chat
    await axios.post(
      chatWebhookUrl,
      { text: `Live Agent: ${userInput}` },
      {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }
    );

    // Send a response back to Dialogflow CX
    res.send({
      fulfillmentText: `Escalation required for: "${userInput}". A live agent will assist you shortly.`,
    });
  } catch (error) {
    console.error("Error sending message to Google Chat:", error);
    res.status(500).send("Error sending message to Google Chat");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
