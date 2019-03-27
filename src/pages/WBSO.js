import Page from "../Page.js";
import BulletPoint from "./BulletPoint.js";

export default class WBSO extends Page {

    static _template() {
        return {
            Money: {src: "./static/img/money.jpg", x: 960, y: 450, mount: 0.5}
        }
    }

    get title() {
        return "WBSO"
    }

}