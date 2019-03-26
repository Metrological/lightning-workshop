import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";

export default class RenderEngine extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: {text: {text: "Tree structure of Elements", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "JSON syntax", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "Render loop", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Calculate render coordinates", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Upload new visible textures", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Fill coordinate buffers", fontSize: 48}}},
                        {x: 50, type: BulletPoint, content: {text: {text: "Issue WebGL commands", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "Texture manager / GC", fontSize: 48}}},
                        {type: BulletPoint, content: {text: {text: "Smart optimizations", fontSize: 48}}}
                    ]
                }
            }
        }
    }

    get title() {
        return "Render Engine"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

}