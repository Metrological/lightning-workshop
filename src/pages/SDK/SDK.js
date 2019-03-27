import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";

export default class SDK extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: {text: {text: "There is a new Lightning-SDK", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "https://github.com/WebPlatformForEmbedded/Lightning-SDK", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "Apps should be migrated:", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "new State Machine", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "AppDefinition is gone (use App.getPath())", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "metadata.json is back", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "Keyboard, List, Grid components", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "VOO project: Lightning UI + Apps", fontSize: 48}}},
                    ]
                }
            }
        }
    }

    get title() {
        return "New SDK"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}