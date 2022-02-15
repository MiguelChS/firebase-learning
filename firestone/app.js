const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require("../firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports = { db };