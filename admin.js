/* eslint-disable no-undef */
const admin = require("firebase-admin");

const serviceAccount = require("./key/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tabasamunet.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db, admin };