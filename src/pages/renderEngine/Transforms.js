import Page from "../../Page.js";
import RenderTreeExample from "./RenderTreeExample.js";

export default class Transforms extends Page {

    static _template() {
        return {};
    }

    _active() {
        this.children = [{type: Example}];
        this._refocus();
    }

    get title() {
        return "Transforms";
    }

    _getFocused() {
        return this.children[0];
    }

}

class Example extends RenderTreeExample {

    _build() {
        super._build();

        this._main = this._content.tag("Lil");
        this._marker = this._content.tag("Marker");
    }

    _getBaseConfig() {
        return {
            Lil: {
                w: true,
                h: true,
                x: true,
                y: true,
                scale: true,
                rotation: true,
                src: true,
                Logo: {
                    w: true,
                    h: true,
                    x: true,
                    y: true,
                    scale: true,
                    rotation: true,
                    src: true
                }
            }
        };
    }

    _getInitialContent() {
        return {
            Lil: {
                src: "./static/img/LilLightningFlying.png", x: 450, y: 200,
                Logo: {src: "./static/img/Lightning.png", x: 80, y: 150},
            },
            Marker: {tag: ['hidden'], rect: true, w: 10, h: 10, x: 200, y: 300, alpha: 0, mount: 0.5, color: 0xFF00FF00}
        };
    }

    _getAnimations() {
        return [
            this._main.animation({
                duration: 8, repeat: -1, stopDuration: 1, repeatOffset: 0.2,
                actions: [
                    {p: 'scale', v: {0: {v: 1, s: 0, sm: 0.5}, 0.2: {v: 2, s: 0}, 0.6: 0.2, 1.0: {v: 2, s: 0}}, rv: 1}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1, repeatOffset: 0.2,
                actions: [
                    {
                        t: 'Logo',
                        p: 'scale',
                        v: {0: {v: 1, s: 0, sm: 0.5}, 0.2: {v: 2, s: 0}, 0.6: 0.2, 1.0: {v: 2, s: 0}},
                        rv: 1
                    }
                ]
            }),
            this._main.animation({
                duration: 8, repeat: -1, stopDuration: 1, repeatOffset: 0.2,
                actions: [
                    {p: 'scaleX', v: {0: {v: 1, s: 0, sm: 0.5}, 0.2: {v: 3, s: 0}, 0.6: -3, 1.0: {v: 3, s: 0}}, rv: 1}
                ]
            }),
            this._main.animation({
                duration: 8, repeat: -1, stopDuration: 1, repeatOffset: 0.2,
                actions: [
                    {
                        t: 'Logo',
                        p: 'scaleY',
                        v: {0: {v: 1, s: 0, sm: 0.5}, 0.2: {v: 3, s: 0}, 0.6: -3, 1.0: {v: 3, s: 0}},
                        rv: 1
                    }
                ]
            }),
            this._main.animation({
                duration: 2, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'rotation', v: {sm: 0, 0: 0, 1: 2 * Math.PI}}
                ]
            }),
            this._main.animation({
                duration: 2, repeat: -1, stopDuration: 1,
                actions: [
                    {t: 'Logo', p: 'rotation', v: {sm: 0, 0: 0, 1: 2 * Math.PI}}
                ]
            }),
        ];
    }

    _getActions() {
        return [
            {
                f: () => {
                    this._animations[0].start();
                },
                h: ["Lil.scale"]
            },
            {
                f: () => {
                    this._animations[1].start();
                },
                h: ["Lil.scale", "Logo.scale"]
            },
            {
                f: () => {
                    this._animations[0].stop();
                    this._animations[1].stop();
                }
            },
            {
                f: () => {
                    this._animations[2].start();
                },
                h: ["Lil.scaleX"]
            },
            {
                f: () => {
                    this._animations[3].start();
                },
                h: ["Lil.scaleX", "Logo.scaleY"]
            },
            {
                f: () => {
                    this._animations[2].stop();
                    this._animations[3].stop();
                }
            },
            {
                f: () => {
                    this._animations[4].start();
                },
                h: ["Lil.rotation"]
            },
            {
                f: () => {
                    this._animations[5].start();
                },
                h: ["Logo.rotation"]
            },
            {
                f: () => {
                    this._animations[5].stop();
                    this._marker.x = this._main.x + this._main.finalW / 2;
                    this._marker.y = this._main.y + this._main.finalH / 2;
                    this._marker.setSmooth('alpha', 1);
                },
                h: ["Lil.pivot"],
                c: {Lil: {pivot: true}}
            },
            {
                f: () => {
                    this._main.setSmooth('pivotX', 1, {duration: 2});
                    this._marker.setSmooth('x', this._main.x + this._main.finalW, {duration: 2});
                },
                h: ["Lil.pivotX", "Lil.pivotY"]
            },
            {
                f: () => {
                    this._main.setSmooth('pivotY', 1, {duration: 2});
                    this._marker.setSmooth('y', this._main.y + this._main.finalH, {duration: 2});
                },
                h: ["Lil.pivotX", "Lil.pivotY"]
            },
            {
                f: () => {
                    this._main.setSmooth('pivotX', 0, {duration: 2});
                    this._marker.setSmooth('x', this._main.x, {duration: 2});
                },
                h: ["Lil.pivotX", "Lil.pivotY"]
            },
            {
                f: () => {
                    this._main.setSmooth('pivotY', 0, {duration: 2});
                    this._marker.setSmooth('y', this._main.y, {duration: 2});
                },
                h: ["Lil.pivotX", "Lil.pivotY"]
            },
            {
                f: () => {
                    this._animations[0].start();
                },
                h: ["Lil.pivotX", "Lil.pivotY", "Lil.scale"]
            }
        ];
    }

}