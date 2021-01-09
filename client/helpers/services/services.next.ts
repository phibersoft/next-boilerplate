import { GetServerSidePropsContext } from "next";
import * as jwt from "jsonwebtoken";
import { Database_AdminObject } from "../../interfaces";

const Cookies = require("cookies");
export const getUser = ({
  req,
  res,
}: GetServerSidePropsContext): Database_AdminObject | null => {
  const cook = new Cookies(req, res);
  const auth = cook.get("phiber");
  if (auth) {
    try {
      const user: Database_AdminObject = jwt.verify(
        auth,
        process.env.PHIBER_SECRET as string
      ) as any;
      if (!user.profile_pic) {
        user.profile_pic = process.env.DEFAULT_AVATAR;
      }

      return user as Database_AdminObject;
    } catch (err) {
      console.log(`Auth err : ${err.message}`);
      return null;
    }
  }
  return null;
};
