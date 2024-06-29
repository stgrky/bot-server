/**
 * Sends asynchronous message to Google Chat
 * @return {Object} response
 */
async function webhook() {
    const url = "https://chat.googleapis.com/v1/spaces/AAAADoiBuqE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Utx9-s_iQhcTR9rsI54XBHaqdHAt-YWsEqjqb9j-L0M"
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=UTF-8"},
      body: JSON.stringify({text: "Hello from a Node script!"})
    });
    return await res.json();
  }
  
  webhook().then(res => console.log(res));