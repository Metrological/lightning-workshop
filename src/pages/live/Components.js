import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";
import Table from "../../Table.js";

export default class Components extends Page {

    static _template() {

        return {
            Bullets: {
                y: 100,
                x: 40,
                flex: {direction: 'column'},
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: Components.text("Divide & Conquer")},
                        {type: BulletPoint, content: Components.text("Encapsulated")},
                        {type: BulletPoint, content: Components.text("Template")},
                        {type: BulletPoint, content: Components.text("States")},
                        {type: BulletPoint, content: Components.text("Life cycle hooks")},
                    ]
                }
            }
        }
    }

    get title() {
        return "Components"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {text: text, fontSize: 48, fontStyle}};
    }

}