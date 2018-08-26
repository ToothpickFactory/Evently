"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const app = express();
app.get("*", (request, response) => {
    response.send("What is up!");
});
const api = functions.https.onRequest(app);
exports.api = api;
//# sourceMappingURL=index.js.map