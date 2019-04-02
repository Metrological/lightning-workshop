import Page from "../Page.js";
import BulletPoint from "./BulletPoint.js";

export default class Status extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                flex: {direction: 'column'},
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: Status.text("API status")},
                        {type: BulletPoint, content: Status.text("Documentation")},
                        {type: BulletPoint, content: Status.text("Stability")},
                        {type: BulletPoint, content: Status.text("Smart TV support")},
                        {type: BulletPoint, content: Status.text("720p vs 1080p")},
                        {type: BulletPoint, content: Status.text("Memory consumption")},
                        {type: BulletPoint, content: Status.text("Upcoming changes")},
                    ]
                }
            }
        };
    }

    get title() {
        return "Status";
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '', extra) {
        return {flexItem: {}, color: color, text: Object.assign({text: text, fontSize: 48, fontStyle}, extra)};
    }

}