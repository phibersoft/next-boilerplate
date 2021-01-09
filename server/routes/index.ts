import * as express from "express";
import errorHandler from "../helpers/middlewares/errorHandler";
import AUTH from "./auth";


const router: express.Router = express.Router();
router.get("/hello", (req: express.Request, res: express.Response) =>
  res.json({ say: "Hi", developer: "PhiberSoft" })
);
router.use(express.json({ limit: "50mb" }));
router.use("/auth", AUTH);

router.use(errorHandler);
module.exports = router;
