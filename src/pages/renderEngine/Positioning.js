import Page from "../../Page.js";
import RenderTreeExample from "./RenderTreeExample.js";

export default class Positioning extends Page {

    _active() {
        this.children = [{type: Example}];
        this._refocus();
    }

    get title() {
        return "Positioning";
    }

    _getFocused() {
        return this.children[0];
    }

}

class Example extends RenderTreeExample {

    _build() {
        super._build();

        this._main = this._content.tag("Main");
        this._marker = this._content.tag("Marker");
    }

    _getBaseConfig() {
        return {
            Main: {
                rect: true,
                w: true,
                h: true,
                x: true,
                y: true,
                mount: false,
                src: true,
                Sub: {
                    rect: true,
                    w: true,
                    h: true,
                    x: true,
                    y: true
                }
            }
        };
    }

    _getInitialContent() {
        return {
            Main: {rect: true, w: 200, h: 200, x: 100, y: 100, color: 0xFF00FF00,
                Sub: {rect: true, w: 50, h: 50, x: 100, y: 100, color: 0xFF0000FF},
            },
            Marker: {tag: ['hidden'], rect: true, w: 10, h: 10, x: 200, y: 300, alpha: 0, mount: 0.5, color: 0xFF00FF00}
        };
    }

    _getAnimations() {
        return [
            this._main.animation({duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'x', v: {0:100, 0.5: 700, 1: 100}, rv: 100}
                ]
            }),
            this._main.animation({duration: 2, repeat: -1, stopDuration: 1,
                actions: [
                    {t: 'Sub', p: 'x', v: {0:100, 0.5: 20, 1: 100}, rv: 100}
                ]
            }),
            this._main.animation({duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'y', v: {0:100, 0.5: 400, 1: 100}, rv: 100}
                ]
            }),
            this._main.animation({duration: 2, repeat: -1, stopDuration: 1,
                actions: [
                    {t: 'Sub', p: 'y', v: {0:100, 0.5: 20, 1: 100}, rv: 100}
                ]
            }),
            this._main.animation({duration: 2, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'w', v: {0:200, 0.5: 600, 1: 200}, rv: 0}
                ]
            }),
            this._main.animation({duration: 2, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'h', v: {0:200, 0.5: 400, 1: 200}, rv: 0}
                ]
            })
        ];
    }

    _getActions() {
        return [
            {
                f: () => {
                    this._animations[0].start();
                },
                h: ["Main.x"],
                c: {}
            },
            {
                f: () => {
                    this._animations[1].start();
                },
                h: ["Main.x", "Main.Sub.x"]
            },
            {
                f: () => {
                    this._animations[2].start();
                },
                h: ["Main.y"]
            },
            {
                f: () => {
                    this._animations[3].start();
                },
                h: ["Main.y", "Main.Sub.y"]
            },
            {
                f: () => {
                    this._animations[0].stop();
                    this._animations[1].stop();
                    this._animations[2].stop();
                    this._animations[3].stop();
                    this._main.tag("Sub").setSmooth('alpha', 0);
                }
            },
            {
                f: () => {
                    this._animations[4].start();
                },
                h: ["Main.w"],
                c: {Main: {Sub: {__hidden: true}}}
            },
            {
                f: () => {
                    this._animations[5].start();
                },
                h: ["Main.w", "Main.h"],
            },
            {
                f: () => {
                    this._main.color = 0xFFFFFFFF;
                    this._main.texture = {type: lng.textures.ImageTexture, src: "./static/img/rockies.jpeg"};
                },
                h: ["Main.src"]
            },
            {
                f: () => {
                    this._animations[4].stopNow();
                    this._animations[5].stopNow();
                },
                h: ["Main.w", "Main.h"]
            },
            {
                f: () => {
                    this._main.setSmooth('x', 400, {duration: 0.5});
                    this._main.setSmooth('y', 100, {duration: 0.5});
                    this._marker.x = 400;
                    this._marker.y = 100;
                    this._marker.setSmooth('alpha', 1);
                },
                h: ["Main.mount"],
                c: {Main: {mount: true}}
            },
            {
                f: () => {
                    this._config.Main.mount = true;
                    this._main.setSmooth('mountX', 1, {duration: 2});
                },
                h: ["Main.mountX"]
            },
            {
                f: () => {
                    this._main.setSmooth('mountX', 0.5, {duration: 2});
                },
                h: ["Main.mountX"]
            },
            {
                f: () => {
                    this._main.setSmooth('mountX', 0, {duration: 2});
                },
                h: ["Main.mountX"]
            },
            {
                f: () => {
                    this._marker.setSmooth('x', 1170, {duration: 2});
                    this._main.setSmooth('x', 1170, {duration: 2});
                    this._main.setSmooth('mountX', 1, {duration: 2});
                },
                h: ["Main.mountX", "Main.x"]
            },
            {
                f: () => {
                    this._marker.setSmooth('y', 950, {duration: 2});
                    this._main.setSmooth('y', 950, {duration: 2});
                    this._main.setSmooth('mountY', 1, {duration: 2});
                },
                h: ["Main.mountY", "Main.y"]
            },
            {
                f: () => {
                    this._marker.setSmooth('x', 400, {duration: 2});
                    this._marker.setSmooth('y', 300, {duration: 2});
                    this._main.setSmooth('x', 400, {duration: 2});
                    this._main.setSmooth('y', 300, {duration: 2});
                    this._main.setSmooth('mountX', 0.5, {duration: 2});
                    this._main.setSmooth('mountY', 0.5, {duration: 2});
                },
                h: ["Main.mountX", "Main.x", "Main.mountY", "Main.y"]
            },
            {
                f: () => {
                    this._main.texture.src = "./static/img/LilLightningFlying.png";
                },
                h: ["Main.texture"]
            }
        ];
    }

}