import * as functions from "firebase-functions";
import * as express from "express";

const app = express();

app.get("*", (request, response) => {
  response.send("What is up!");
});

const api = functions.https.onRequest(app);

export { api };
