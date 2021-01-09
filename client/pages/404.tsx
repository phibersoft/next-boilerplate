import * as React from "react";
import * as Template from "./../components/Template/_template";
import ErrorPage from "./_error";

class P404 extends Template.default {
  user = Template.defaultUser
  bc_main = { name: "Anasayfa", link: "/" };
  bc_sub = "404";
  maximize = true;
  realComponent() {
    return <ErrorPage statusCode={404} label="" />;
  }
}

export default P404;
