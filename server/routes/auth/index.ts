import * as express from "express";
import PhiberAuth from "../../../client/helpers/phibers/PhiberAuth";
const wrap = require("express-async-wrapper");
const router: express.Router = express.Router();
router.get("/check/basic", wrap(PhiberAuth.basic));
router.get("/check/super", wrap(PhiberAuth.super));
router.get("/check/cooker", wrap(PhiberAuth.cooker));

router.post("/login", wrap(PhiberAuth.authMe));
router.get("/quit", wrap(PhiberAuth.quit));

export default router;
