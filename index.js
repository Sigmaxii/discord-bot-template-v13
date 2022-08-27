const Sigma = require("./src/structures/bot");
const client = new Sigma();
const keepAlive = require('./server.js')
keepAlive();


client.connect()
module.exports = client;