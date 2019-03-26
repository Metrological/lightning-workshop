import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";

export default class RenderingProps extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: RenderingProps.text("visible")},
                        {type: BulletPoint, content: RenderingProps.text("alpha")},
                        {type: BulletPoint, content: RenderingProps.text("color colorTop colorLeft ..")},
                        {type: BulletPoint, content: RenderingProps.text("clipping")},
                        {type: BulletPoint, content: RenderingProps.text("renderToTexture")},
                        {type: BulletPoint, content: RenderingProps.text("zIndex")},
                        {type: BulletPoint, content: RenderingProps.text("forceZIndexContext")},
                        {type: BulletPoint, content: RenderingProps.text("shader")}
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