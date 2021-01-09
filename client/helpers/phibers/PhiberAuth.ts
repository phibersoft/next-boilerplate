import * as express from "express";
import PhiberError from "./PhiberError";
import * as jwt from "jsonwebtoken";
import { querier } from "../database/db";
import {
  Auth_LoginResponseSuccess,
  Database_AdminObject,
} from "../../interfaces";
import {
  jwtSignOptions,
  prepareRedirectLoginUri,
  prepareRedirectUri,
  setCookieOptions,
} from "../services/constants";
const Cooker = require("cookies");
/**
 *@description Öncelikle "express.use(cookie-parser()) şeklinde çerezler hazırlanır."
 */
class PhiberAuth {
  /**
   *
   * @param type basic : Sadece headerda phiber isteyen routelara uygulanır.
   * @param req super : Headerda phiber ve cookielerde phiber isteyen routelara uygulanır. (Genelde client side)
   */
  static authControl(type: "basic" | "super" | "cooker", req: express.Request) {
    try {
      var headers = req.headers;
      var cookies = req.cookies;
      const basic = () => {
        if (Object.keys(headers).includes("phiber")) {
          if (headers.phiber == process.env.PHIBER_TOKEN) {
            return { success: true };
          } else {
            throw new PhiberError(
              "Güvenlik kontrolünden geçemedin. Lütfen öncelikle chrome kullanmayı dene."
            );
          }
        } else {
          throw new PhiberError(
            "Güvenlik kontrolünden geçemedin. Herhangi bir anahtar gönderilmemiş."
          );
        }
      };
      const cooker = () => {
        const phiber = cookies.phiber;
        if (phiber) {
          try {
            const results = jwt.verify(phiber, process.env.PHIBER_SECRET, {});
            return { success: true, data: results };
          } catch (err) {
            var errResults = PhiberError.converter(err);
            return {
              success: false,
              message: errResults.message,
              hint: errResults.hint || null,
            };
          }
        } else {
          return {
            success: false,
            message:
              "Çerezler boş. Bu durum sık yaşanıyorsa lütfen CHROME kullan.",
          };
        }
      };
      switch (type) {
        case "basic":
          return basic();
        case "cooker":
          return cooker();
        case "super":
          const basicResult = basic();
          if (basicResult.success) {
            if (
              Object.keys(cookies).includes("phiber") ||
              Object.keys(headers).includes("phibercookie")
            ) {
              try {
                const jwtResults = jwt.verify(
                  cookies.phiber || headers.phibercookie,
                  process.env.PHIBER_SECRET,
                  {}
                );
                return { success: true, data: jwtResults };
              } catch (err) {
                throw new PhiberError(
                  "Giriş sağlanamadı. Çerezlerdeki veri doğru değil.",
                  err.message
                );
              }
            } else {
              throw new PhiberError(
                "Çerezler boş. Tekrar giriş gerekli. Eğer bu durum sık yaşanıyorsa Chrome kullanmayı dene!"
              );
            }
          } else {
            return basicResult;
          }
      }
    } catch (err) {
      var errResults = PhiberError.converter(err);

      return {
        success: false,
        message: errResults.message,
        hint: errResults.hint,
      };
    }
  }
  static async basic(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const results = PhiberAuth.authControl("basic", req) as any;
      if (results.success) {
        res.locals = { success: true, data: results.data };
        return res.json({ success: true });
      } else {
        return res.json({
          success: false,
          message: results.message,
          hint: results.hint,
        });
      }
    } catch (err) {
      return res.json({ success: false, message: err.message, hint: err.hint });
    }
  }
  static async super(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const results = PhiberAuth.authControl("super", req) as any;
      if (results.success) {
        return res.json({ success: true, data: results.data });
      } else {
        return res.json({
          success: false,
          message: results.message,
          hint: results.hint,
        });
      }
    } catch (err) {
      return res.json({ success: false, message: err.message, hint: err.hint });
    }
  }
  static async cooker(req: express.Request, res: express.Response) {
    try {
      const results = PhiberAuth.authControl("cooker", req) as any;
      if (results.success) {
        res.locals = { success: true, data: results.data };
        return res.json({ success: true });
      } else {
        return res.json({
          success: false,
          message: results.message,
          hint: results.hint,
        });
      }
    } catch (err) {
      return res.json({ success: false, message: err.message, hint: err.hint });
    }
  }
  static async basicMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const results = PhiberAuth.authControl("basic", req) as any;
      if (results.success) {
        next();
      } else {
        return res.json({
          success: false,
          message: results.message,
          hint: results.hint,
        });
      }
    } catch (err) {
      return res.json({ success: false, message: err.message, hint: err.hint });
    }
  }
  static async loginRedirector(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const results = PhiberAuth.authControl("cooker", req) as any;

      if (results.success) {
        return next();
      } else {
        return res.redirect(
          prepareRedirectLoginUri(req, results.message, req.originalUrl)
        );
      }
    } catch (err) {
      var errResults = PhiberError.converter(err);
      return res.redirect(
        prepareRedirectLoginUri(req, errResults.message, req.originalUrl)
      );
    }
  }
  static async authMe(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { body } = req;

    if (body.username && body.password) {
      try {
        var dbResults = await querier<Database_AdminObject>(
          "SELECT * FROM admins WHERE username = $1 AND password = $2",
          [body.username, body.password]
        );
        if (dbResults.success == true) {
          if (dbResults.data.rowCount != 0) {
            const jwtToken = jwt.sign(
              dbResults.data.rows[0],
              process.env.PHIBER_SECRET,
              jwtSignOptions()
            );
            const cookies = new Cooker(req, res);
            cookies.set(`phiber`, jwtToken, setCookieOptions());
            const willReturn: Auth_LoginResponseSuccess = {
              success: true,
              token: jwtToken,
            };
            return res.json(willReturn);
          } else {
            throw new PhiberError("Kullanıcı adı ya da şifre yanlış.");
          }
        } else {
          throw new PhiberError(
            "Veritabanı doğrulaması yanlış döndü. Bu hata birden fazla durumda karşına çıkıyorsa yazılımcıya danış.",
            dbResults.error.code,
            `login if else`,
            dbResults.error
          );
        }
      } catch (err) {
        throw new PhiberError(
          `Veritabanıyla alakalı bir hata oldu. Hata Kodu = ${err.message}`,
          err.code,
          null,
          err
        );
      }
    } else {
      throw new PhiberError("Kullanıcı adı ve şifre boş kalamaz.");
    }
  }
  static async quit(req: express.Request, res: express.Response) {
    const redirectUri = prepareRedirectLoginUri(
      req,
      `Başarıyla çıkış yapıldı.`
    );
    return res.clearCookie("phiber").redirect(redirectUri);
  }
}

export default PhiberAuth;
