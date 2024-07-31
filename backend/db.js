// backend/db.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'studentdb';

let client;

async function connectToDB() {
  if (client) {
    return client.db(dbName);
  }
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDB;
