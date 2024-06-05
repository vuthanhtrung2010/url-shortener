import mongoose from "mongoose";
import * as Sentry from "@sentry/node";

require("dotenv").config();

module.exports = async () => {
  return mongoose
    .connect(process.env.database)
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((err) => {
      Sentry.captureException(err);
      console.error(err);

      process.exit(1);
    });
};
