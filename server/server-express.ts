import * as express from "express";
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;

const server = express();
const routes = require("./routes");
var json: object = require("./../env")(process.env.NODE_ENV);
Object.keys(json).forEach((k) => {
  process.env[k] = json[k];
});
server.use(cookieParser());

server.use("/", routes);
server.use("/joint/", express.static("./server/public/"));

server.listen(port, (err?: any) => {
  if (err) throw err;
  console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV} \n`);
});
