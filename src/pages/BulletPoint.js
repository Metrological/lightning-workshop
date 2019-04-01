export default class BulletPoint extends lng.Component {
    static _template() {
        return {
            flex: {},
            Content: {
                x: 100,
                alpha: 0.001,
                flex: {},
                flexItem: {marginTop: 5, marginBottom: 5},
                Point: {text: {text: "•", fontSize: 48}, flexItem: {marginLeft: 50, marginRight: 30}},
                Label: {}
            }
        }
    }

    set content(v) {
        this.tag("Label").patch(v);
    }

    show(delay = 0) {
        this.tag("Content").setSmooth('alpha', 1, {delay, duration: 0.5});
        this.tag("Content").setSmooth('x', 0, {delay, duration: 0.5});
    }

    hide() {
        this.tag("Content").setSmooth('alpha', 0, {duration: 0.5});
        this.tag("Content").setSmooth('x', 100, {duration: 0.5});
    }
}