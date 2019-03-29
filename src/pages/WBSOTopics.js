import Page from "../Page.js";
import BulletPoint from "./BulletPoint.js";

export default class WBSOTopics extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "App innovation", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Cross platform gaming", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Async Multiplayer", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Companion App", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Video call", fontSize: 48}}}
                    ]
                }
            }
        }
    }

    get title() {
        return "WBSO Topics 2019"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}