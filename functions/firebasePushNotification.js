const admin = require("firebase-admin"); // import firebase-admin
const serviceAccount = require("../../privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const sendPushNotification = (id, payload) => {
  id?.map((e) => {
    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      //   data: {
      //     jobID: currentJobID,
      //   },
      token: e,
    };
    const sendNotificaiton = (message) => {
      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Notification Send Successfully", response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    sendNotificaiton(message);
  });
};
module.exports = {
  sendPushNotification,
};
