import Page from "../../Page.js";
import RenderTreeExample from "./RenderTreeExample.js";

export default class Rendering extends Page {

    static _template() {
        return {};
    }

    _active() {
        this.children = [{type: Example}];
        this._refocus();
    }

    get title() {
        return "Rendering";
    }

    _getFocused() {
        return this.children[0];
    }

}

class Example extends RenderTreeExample {

    _build() {
        super._build();

        this._main = this._content.tag("Rectangle");
        this._marker = this._content.tag("Marker");
    }

    _getBaseConfig() {
        return {
            Rectangle: {
                rect: true,
                color: true,
                w: true,
                h: true,
                x: true,
                y: true,
                clipping: true,
                Lil: {
                    visible: true,
                    src: true,
                    alpha: true,
                    Baby: {
                        visible: true
                    }
                },
                Idle: {
                    __hidden: true,
                    x: true,
                    zIndex: true
                }
            }
        };
    }

    _getInitialContent() {
        return {
            Rectangle: {
                rect: true, w: 1000, h: 600, x: 100, y: 100, color: 0x88555555,
                Lil: {
                    src: "./static/img/LilLightningFlying.png", x: 350, y: 50,
                    Baby: {src: "./static/img/LilLightningIdle.png", x: 80, y: 20, scale: 0.55, rotation: 0.7},
                },
                Idle: {
                    src: "./static/img/LilLightningIdle.png",
                    tag: ['hidden'],
                    visible: false,
                    x: 120,
                    y: 70
                }
            }
        };
    }

    _getAnimations() {
        return [
            this._main.animation({
                duration: 1.5, repeat: -1, stopMethod: 'immediate',
                actions: [
                    {t: 'Lil', p: 'visible', v: {0: false, 0.5: true}, rv: true}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {t: 'Lil', p: 'alpha', v: {0: 0.999, 0.5: 0, 1: 0.999}, rv: 1}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'color', v: {0: 0xFFFF0000, 0.5: 0xFF0000FF, 1: 0xFFFF0000}, rv: 0x88555555}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'colorRight', v: {0: 0xFF00FF00, 0.5: 0x00FF00FF, 1: 0xFF00FF00}, rv: 0x88555555}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {t: 'Lil', p: 'color', v: {0: 0xFF00FF00, 0.5: 0xFFFF00FF, 1: 0xFF00FF00}, rv: 0xFFFFFFFF}
                ]
            }),
            this._main.animation({
                duration: 2, repeat: -1, stopDuration: 0.2,
                actions: [
                    {t: 'Lil', p: 'scale', v: {0: 1, 0.5: 3, 1: 1}}
                ]
            }),
            this._main.animation({
                duration: 5, repeat: -1, stopDuration: 0.2,
                actions: [
                    {p: 'rotation', v: {0: {v: 0, s: 0}, 0.2: {v: 0, s: 0}, 1: 2 * Math.PI}}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'alpha', v: {0: 0.999, 0.5: 0, 1: 0.999}, rv: 1}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {t: 'Idle', p: 'x', v: {0: 120, 0.5: 800, 1: 120}, rv: 1}
                ]
            }),
            this._main.animation({
                duration: 4, repeat: -1, stopDuration: 1,
                actions: [
                    {p: 'shader.rx', v: {0: 0, 1: 2 * Math.PI, sm: 0}, rv: 0},
                    {t: 'Lil', p: 'y', v: {0: 50, 0.5: 150, 1: 50}, rv: 50}
                ]
            }),

        ];
    }

    _getActions() {
        return [
            {
                f: () => {
                    this._main.tag("Baby").visible = false;
                },
                h: ["Baby.visible"]
            },
            {
                f: () => {
                    this._main.tag("Baby").visible = true;
                },
                h: ["Baby.visible"]
            },
            {
                f: () => {
                    this._main.tag("Lil").visible = false;
                },
                h: ["Lil.visible"]
            },
            {
                f: () => {
                    this._main.tag("Lil").visible = true;
                },
                h: ["Lil.visible"]
            },
            {
                f: () => {
                    this._animations[1].start();
                },
                h: ["Lil.alpha"]
            },
            {
                f: () => {
                    this._animations[1].stop();
                }
            },
            {
                f: () => {
                    this._animations[2].start();
                },
                h: ["Rectangle.color"]
            },
            {
                f: () => {
                    this._animations[3].start();
                },
                h: ["Rectangle.colorLeft", "Rectangle.colorRight"]
            },
            {
                f: () => {
                    this._animations[2].stop();
                    this._animations[3].stop();
                    this._animations[4].start();
                },
                c: {Rectangle: {Lil: {color: true}}},
                h: ["Lil.color"]
            },
            {
                f: () => {
                    this._animations[4].stop();
                }
            },
            {
                f: () => {
                    this._animations[5].start();
                },
                c: {Rectangle: {Lil: {scale: true}}},
                h: ["Lil.scale"]
            },
            {
                f: () => {
                    this._main.clipping = true;
                },
                h: ["Rectangle.clipping"]
            },
            {
                f: () => {
                    this._animations[6].start();
                },
                c: {Rectangle: {rotation: true}},
                h: ["Rectangle.clipping", "Rectangle.rotation"]
            },
            {
                f: () => {
                    this._main.clipping = false;
                    this._main.renderToTexture = true;
                },
                c: {Rectangle: {renderToTexture: true}},
                h: ["Rectangle.renderToTexture"]
            },
            {
                f: () => {
                    this._animations[5].stop();
                    this._animations[6].stop();
                    this._main.renderToTexture = false;
                }
            },
            {
                f: () => {
                    this._animations[7].start();
                },
                c: {
                    Rectangle:{alpha: true}
                },
                h: ["Rectangle.alpha"]
            },
            {
                f: () => {
                    this._main.renderToTexture = true;
                },
                h: ["Rectangle.renderToTexture", "Rectangle.alpha"]
            },
            {
                f: () => {
                    this._main.renderToTexture = false;
                }
            },
            {
                f: () => {
                    this._animations[7].stop();
                }
            },
            {
                f: () => {
                    this._main.tag("Idle").visible = true;
                    this._animations[8].start();
                    this._main.tag("Lil").zIndex = 0;
                },
                c: {
                    Rectangle: {
                        Lil: {
                            zIndex: true,
                            Baby: {
                                zIndex: true,
                            },
                        },
                        Idle: {__hidden: false}
                    }
                },
                h: ["Idle.x"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = 1;
                    this._main.tag("Idle").zIndex = 0;
                    this._main.tag("Lil.Baby").zIndex = 0;
                },
                h: ["Lil.zIndex"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = 0;
                    this._main.tag("Lil.Baby").zIndex = 0;
                    this._main.tag("Idle").zIndex = 1;
                },
                h: ["Idle.zIndex"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = 0;
                    this._main.tag("Lil.Baby").zIndex = 1;
                    this._main.tag("Idle").zIndex = 0;
                },
                h: ["Lil.Baby.zIndex", "Lil.zIndex"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = 1;
                    this._main.tag("Lil.Baby").zIndex = 1;
                    this._main.tag("Idle").zIndex = 0;
                },
                h: ["Lil.zIndex", "Lil.Baby.zIndex"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = -1;
                    this._main.tag("Lil.Baby").zIndex = 1;
                    this._main.tag("Idle").zIndex = 0;
                },
                h: ["Lil.zIndex", "Lil.Baby.zIndex"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = 0;
                    this._main.tag("Lil").forceZIndexContext = true;
                    this._main.tag("Lil.Baby").zIndex = 1;
                    this._main.tag("Idle").zIndex = 0;
                },
                c: {
                    Rectangle: {
                        Lil: {
                            forceZIndexContext: true
                        }
                    }
                },
                h: ["Lil.zIndex", "Lil.Baby.zIndex", "Lil.forceZIndexContext"]
            },
            {
                f: () => {
                    this._main.tag("Lil").zIndex = 0;
                    this._main.tag("Lil.Baby").zIndex = 0;
                    this._main.tag("Idle").zIndex = 0;
                    this.tag("Idle").visible = false;
                    this._animations[8].stop();
                },
                c: {
                    Rectangle: {
                        clipping: false,
                        forceZIndexContext: false,
                        color: false,
                        Lil: {
                            zIndex: false,
                            Baby: {zIndex: 0},
                        },
                        Idle: {__hidden: true}
                    }
                }
            },
            {
                f: () => {
                    this._main.shader = {type: lng.shaders.Grayscale, amount: 0.8};
                },
                c: {
                    Rectangle: {
                        shader: {type: "lng.shaders.Grayscale", amount: true},
                    }
                },
                h: ["Rectangle.shader"]
            },
            {
                f: () => {
                    this._main.tag("Baby").shader = {type: lng.shaders.Inversion};
                },
                c: {
                    Rectangle: {
                        Lil: {
                            Baby: {
                                shader: {type: "lng.shaders.Inversion"}
                            }
                        }
                    }
                },
                h: ["Rectangle.shader", "Baby.shader"]
            },
            {
                f: () => {
                    this._main.shader = {type: lng.shaders.Light3d, rx: 0, strength: 0, ambient: 1, fudge: 1};
                    this._animations[9].start();
                },
                c: {
                    Rectangle: {shader: {type: "lng.shaders.Light3d"}}
                },
                h: ["Rectangle.shader"]
            },
            {
                f: () => {
                    this._main.renderToTexture = true;
                },
                h: ["Rectangle.shader", "Rectangle.renderToTexture"]
            },
            {
                f: () => {
                    this._main.renderToTexture = false;
                },
                h: ["Rectangle.renderToTexture"]
            }
        ];
    }

}