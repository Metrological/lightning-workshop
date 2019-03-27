import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";

export default class CreateApp extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 32}}}, content: {text: {text: "git clone git@github.com:mlapps/blueprint.git com.metrological.app.Vimeo", fontFace: "monospace", fontSize: 32}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 32}}}, content: {text: {text: "Create a new empty git repo on the specified origin url", fontSize: 32}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 32}}}, content: {text: {text: "git remote set-url origin git@github.com:mlapps/com.metrological.app.Vimeo.git", fontFace: "monospace", fontSize: 32}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 32}}}, content: {text: {text: "git commit -anm \"init app\"", fontFace: "monospace", fontSize: 32}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 32}}}, content: {text: {text: "git push origin master", fontFace: "monospace", fontSize: 32}}},
                    ]
                }
            }
        }
    }

    get title() {
        return "Create SDK Application"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}