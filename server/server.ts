import * as express from "express";
import next from "next";
import loginRedirect from "./helpers/middlewares/loginRedirect";
const cookieParser = require("cookie-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client/" });
const handle = app.getRequestHandler();
const port = process.env.PORT || 4000;
(async () => {
  try {
    await app.prepare();
    const server = express();
    const routes = require("./routes");
    var json: object = require("./../env")(process.env.NODE_ENV);
    Object.keys(json).forEach((k) => {
      process.env[k] = json[k];
    });
    server.use(cookieParser());
    server.use("/", routes);

    server.use("/joint/", express.static("./server/public/"));
    server.use(loginRedirect);

    server.all("*", (req: express.Request, res: express.Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(
        `> Ready on localhost:${port} - env ${process.env.NODE_ENV} \n`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
