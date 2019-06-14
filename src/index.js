const AWS = require('aws-sdk');
const botName = process.env.lexBotName;

const handler = async (event) => {
  console.log(event);


  return sendMessage(event.message, event.userId);
}

module.exports = { handler };


const sendMessage = (inputText, userId = '') => {
  AWS.config.update({ region: process.env.lexRegion });

  let lexruntime = new AWS.LexRuntime({
    apiVersion: "2016-11-28"
  });

  let params = {
    botAlias: "$LATEST",
    botName,
    inputText,
    userId,
  };

  return new Promise((resolve, reject) => {
    lexruntime.postText(params, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(data.message);
      }
    });
  });
};