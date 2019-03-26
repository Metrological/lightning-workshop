import Page from "../../Page.js";
import RenderTreeExample from "./RenderTreeExample.js";

export default class Textures extends Page {

    _active() {
        this.children = [{type: Example}];
        this._refocus();
    }

    get title() {
        return "Textures";
    }

    _getFocused() {
        return this.children[0];
    }

}

class Example extends RenderTreeExample {

    _build() {
        super._build();

        this._main = this._content.tag("Element");
    }

    _getBaseConfig() {
        return {
            Element: {
                rect: true,
                src: true,
                text: false,
                color: true,
                x: true,
                y: true,
                w: true,
                h: true
            }
        };
    }

    _getInitialContent() {
        return {
            Element: {rect: true, w: 200, h: 200, x: 500, y: 300, color: 0xFF00FF00}
        };
    }

    _getActions() {
        return [
            {
                f: () => {
                },
                h: ["rect"]
            },
            {
                f: () => {

                },
                c: {Element: {rect: false, texture: {__hidden: false, type: "lng.textures.RectangleTexture"}}},
                h: ["texture"]
            },
            {
                f: () => {
                    this._main.w = 0;
                    this._main.h = 0;
                    this._main.text = {text: "hello world", fontSize: 48, fontStyle: "bold italic"}
                },
                c: {Element: {rect: false, text: {text: true, fontSize: true, fontStyle: true}, texture: false}},
                h: ["Element.text", "Element.text.fontSize", "Element.text.fontStyle"]
            },
            {
                f: () => {
                    this._main.color = 0xFFFFFFFF
                },
                c: {Element: {color: false}}
            },
            {
                f: () => {

                },
                c: {Element: {text: false, texture: {type: "lng.textures.TextTexture", text: true, fontSize: true, fontStyle: true}}},
                h: ["texture"]
            },
            {
                f: () => {
                    this._main.tag("Element").text.fontFace = 'monospace';
                    this._main.tag("Element").text.shadow = true;
                    this._main.tag("Element").text.shadowColor = 0xFFFFFFFF;
                    this._main.tag("Element").text.paddingRight = 5;
                },
                c: {Element: {text: false, texture: {type: "lng.textures.TextTexture", text: true, fontSize: true, fontStyle: true, fontFace: 'monospace', shadow: true, shadowColor: true}}},
                h: ["texture"]
            },
            {
                f: () => {
                    this._main.src = "./static/img/rockies.jpeg"
                },
                c: {Element: {src: true, texture: false}},
                h: ["src"]
            },
            {
                f: () => {

                },
                c: {Element: {src: false, texture: {type: "lng.textures.ImageTexture", src: true}}},
                h: ["texture"]
            },
            {
                f: () => {
                    this._main.setSmooth("texture.x", 300, {duration: 2, delay: 1});
                },
                c: {Element: {texture: {type: "lng.textures.ImageTexture", src: true, x: true, y: true, w: true, h: true}}},
                h: ["texture.x"]
            },
            {
                f: () => {
                    this._main.texture.w = this._main.finalW;
                    this._main.setSmooth("texture.w", 100, {duration: 2, delay: 0});
                },
                h: ["texture.w"]
            },
            {
                f: () => {
                    this._main.texture.h = this._main.finalH;
                    this._main.setSmooth("texture.y", 200, {duration: 2, delay: 0});
                    this._main.setSmooth("texture.h", 100, {duration: 2, delay: 0});
                },
                h: ["texture.y", "texture.h"]
            },
            {
                f: () => {
                    this._main.mount = 0.5;
                },
                c: {Element: {mount: true}},
                h: ["mount"]
            },
            {
                f: () => {
                    this._main.texture.x = 0;
                    this._main.texture.y = 0;
                    this._main.texture.w = 0;
                    this._main.texture.h = 0;
                }
            },
            {
                f: () => {
                    this._main.texture = lng.Tools.getRoundRect(300, 300, 40, 2, 0xFF000000);
                },
                c: {Element: {src: false, texture: "lng.Tools.getRoundRect(300, 300, 40, 5, 0xFF000000)"}},
                h: ["texture"]
            },
            {
                f: () => {
                    this._main.texture = lng.Tools.getShadowRect(300, 300, 40, 10);
                },
                c: {Element: {src: false, texture: "lng.Tools.getShadowRect(300, 300, 40, 10)"}},
                h: ["texture"]
            }
        ];
    }

}