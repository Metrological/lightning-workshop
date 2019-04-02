import Page from "../Page.js";

export default class DemoApps extends Page {
    static _template() {
        return {
            Background: {w: 1920, h: 980, rect: true, color: 0xFF222222},
            Apps: {
                x: 940, mountX: 0.5,
                y: 280
            }
        }
    }

    get title() {
        return "App presentations";
    }

    _setIndex(i) {
        this._index = i;
    }

    _construct() {
        this._apps = [
            {identifier: "com.metrological.app.VEVO", title: "VEVO"},
            {identifier: "com.metrological.app.AmazonMusic", title: "AmazonMusic"}
        ];
    }

    _setup() {
        this.tag("Apps").children = this._apps.map((app, index) => ({type: App, identifier: app.identifier, title: app.title, x: (index % 7) * 270, y: Math.floor(index / 7) * 290}));
        this.tag("Apps").w = (this._apps.length * 270) - 50;
        this._setIndex(0);
    }

    _handleLeft() {
        if (this._index > 0) {
            this._setIndex(this._index - 1);
        } else {
            return false;
        }
    }

    _handleRight() {
        if (this._index < this._apps.length - 1) {
            this._setIndex(this._index + 1);
        } else {
            return false;
        }
    }

    _handleEnter() {
        this.fireAncestors('$startApp', this._apps[this._index].identifier);
    }

    _getFocused() {
        return this.tag("Apps").children[this._index];
    }

}

class App extends lng.Component {
    static _template() {
        return {
            Holder: {w: 264, h: 264, rect: true, color: 0x00ffffff, pivot: 0.5,
                Icon: {mount: .5, x: 132, y: 132, texture: {type: lng.textures.ImageTexture}}
            },
            Title: {
                x: 132, y: 280, mountX: 0.5, alpha: 0, color: 0x001583ca,
                text: {fontSize: 62},
            }
        }
    }

    set identifier(v) {
        this._identifier = v;
        this.tag("Icon").texture.src = "apps/" + v + "/icon.png";
    }

    set title(v) {
        this.tag("Title").text.text = v
    }

    _focus() {
        this.patch({
            zIndex: 1,
            Holder: {
                smooth: {scale: 1.2}, color: 0xffffffff
            },
            Title: {
                smooth: {alpha: 1, y: 334, color: 0xffffffff}
            }
        })
    }

    _unfocus() {
        this.patch({
            zIndex: 0,
            Holder: {
                smooth: {scale: 1}, color: 0x00ffffff
            },
            Title: {
                smooth: {alpha: 0, y: 280, color: 0x00ffffff}
            }
        })
    }

}