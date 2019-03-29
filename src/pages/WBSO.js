import Page from "../Page.js";
import BulletPoint from "./BulletPoint.js";

export default class WBSO extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Development of new technical products / implementations", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Technical scientific research", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "An analysis of feasibility of a R&D project", fontSize: 48}}},
                        {type: BulletPoint, Content: {Point: {text:{fontSize: 48}}}, content: {text: {text: "Technical research aimed for a smoother production process or used software", fontSize: 48}}},
                    ]
                }
            }
        }
    }

    get title() {
        return "WBSO"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}