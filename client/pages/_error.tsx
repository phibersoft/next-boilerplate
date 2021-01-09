import * as React from "react";
import * as Template from "./../components/Template/_template";
class ErrorPage extends React.Component<{statusCode?: number, label?: string}> {
  user = Template.defaultUser;
  bc_main = { name: "Anasayfa", link: "/" };
  bc_sub = "Hata";
  render() {
    const { statusCode, label } = this.props;
    var willPublish = { status: statusCode, text: label };
    if (statusCode == 404) {
      willPublish.text = `Kaybolmuş gibi görünüyorsun. Daha önce böyle bir yeri ben bile keşfetmedim!`;
    }
    return (
      <div className="errorPanel">
        <p className="errorLeft"> Hata Kodu = {willPublish.status} </p>{" "}
        <p className="errorRight"> Hata = {willPublish.text} </p>
      </div>
    );
  }
}

export default ErrorPage;
