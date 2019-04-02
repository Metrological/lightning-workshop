import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";
import Table from "../../Table.js";

export default class Signals extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                flex: {direction: 'column'},
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: Signals.text("Gradual change of a numeric property value")},
                        {type: BulletPoint, content: Signals.text("Transition on any (sub) property: (color, w, texture.x, shader.amount)")},
                        {type: BulletPoint, content: Signals.text("Property names containing 'color' are handled differently")}
                    ]
                }
            }
        };
    }

    get title() {
        return "Transitions";
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    get liveEditOptions() {
        const actions = [];
        return {isApp: true, data: {actions: actions}};
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '', extra) {
        return {flexItem: {}, color: color, text: Object.assign({text: text, fontSize: 48, fontStyle}, extra)};
    }

}