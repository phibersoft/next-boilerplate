import * as express from "express";
import PhiberError from "../../../client/helpers/phibers/PhiberError";

const errorHandler = (
  err: PhiberError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err) {
    return res.json({
      success: false,
      message: err.message,
      hint: err.hint,
      original: err.original,
      stack: err.stack,
    });
  }
  return next();
};

export default errorHandler;
