import { NextFunction, Request, Response } from "express";
import PhiberAuth from "./../../../client/helpers/phibers/PhiberAuth";
var STATIC_FOLDS = [
  "/_next",
  "/assets",
  "/styles",
  "/joint",
  "/api",
  "/login",
  "/auth",
  "/util",
  "/external",
];

const loginRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { originalUrl, url } = req;

  var loginRequired = true;
  STATIC_FOLDS.forEach((st) => {
    if (originalUrl.startsWith(st)) {
      loginRequired = false;
    }
  });

  loginRequired ? PhiberAuth.loginRedirector(req, res, next) : next();
};

export default loginRedirect;
