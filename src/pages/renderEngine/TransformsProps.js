import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";

export default class TransformsProps extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: TransformsProps.text("scale scaleX scaleY")},
                        {type: BulletPoint, content: TransformsProps.text("rotation")},
                        {type: BulletPoint, content: TransformsProps.text("pivot pivotX pivotY")}
                    ]
                }
            }
        }
    }

    get title() {
        return "Positioning"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {fontFace: 'monospace', text: text, fontSize: 48, fontStyle}};
    }

}