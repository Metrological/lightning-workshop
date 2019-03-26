import Page from "../Page.js";
import BulletPoint from "./BulletPoint.js";

export default class Introduction extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "TV App Development framework", fontSize: 60}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "https://github.com/WebPlatformForEmbedded/Lightning", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "Lightning components:", fontSize: 60}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "WebGL Render Engine", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Transitions & Animations", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Remote input handling", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Component structure", fontSize: 48}}},
                    ]
                }
            }
        }
    }

    get title() {
        return "Introduction"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}