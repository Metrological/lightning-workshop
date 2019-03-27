import Page from "../Page.js";
import BulletPoint from "./BulletPoint.js";

export default class Planning extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "Presentation: Lightning render engine", fontSize: 60}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "App presentations", fontSize: 60}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "SDK status update", fontSize: 60}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "WBSO", fontSize: 60}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 60}}}, content: {text: {text: "Open discussion", fontSize: 60}}},
                    ]
                }
            }
        }
    }

    get title() {
        return "Contents"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}