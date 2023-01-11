import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import httpStatus from "http-status";
import mongoSanitize from "express-mongo-sanitize";
import timeout from "connect-timeout";
import xss from "xss-clean";

import * as morgan from "./config/morgan";
import { errorConverter, errorHandler } from "./middlewares/error";
import authLimiter from "./middlewares/rateLimiter";
import config from "./config/config";
import routes from "./routes/v1";

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// Prevent http param pollution
app.use(hpp());

// enable cors
app.use(cors());
app.options("*", cors());

app.use(timeout("10s"));
const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};
app.use(haltOnTimedout);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({ errors: ["Not Found!"] });
});

// convert error to ErrorResponse, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
