import Page from "../../Page.js";
import WaterWaveShader from "./WaterWaveShader.js";

export default class FrontPage extends Page {

    static _template() {
        return {
            Sky: {
                rect: true, w: 1920, h: 960, color: 0xFF000000,
            },
            Lake: {
                y: -120,
                Wrapper: {
                    w: 1920, h: 514, rtt: true, y: 620+50, mountY: 1,
                    Top: {y: 100, src: "./static/img/city-land.jpg", colorTop: 0x00FFFFFF, shader: {type: lng.shaders.Inversion, amount: 0}},
                    Lightning: {alpha: 0, y: -100,
                        Lil: {src: "./static/img/LilLightningFlying.png", x: 300, y: -100,
                            Icon: {src: "./static/img/Lightning.png", mountX: 0.5, x: 230, y: 140, scale: 0.75},
                        },
                    }
                },
                Bottom: {src: "./static/img/city-land.jpg", shader: {type: WaterWaveShader, horizon: 620}, pivot: 0, scale: 1, y: 620+50, w: 1920, h: 310}
            }
        }
    }

    _build() {
        this.tag("Bottom").texture = this.tag("Wrapper").getTexture();
        this._lightningAnimation = this.animation({
            duration: 0.25,
            stopMethod: 'fade',
            autostop: true,
            stopDuration: 0.25,
            actions: [
                {p: 'lightning', v: {0: 0, 0.5: 0.6, 0.6: 0.2, 0.8: 1, 1: 1}}
            ]
        });
        let first = true;
        this._lightningAnimation.on('finish', () => {
            if (!first) {
                return;
            }
            first = false;
            this.tag("Lightning").setSmooth('alpha', 1, {delay: 1});
            this.tag("Lightning").setSmooth('y', 250, {delay: 1});
            this.tag("Lightning").animation({duration:3,repeat:-1,
                actions:[
                    {t: '.Icon', p: 'scale', v: {0: 0.6, 0.5: 0.8, 1: 0.6}},
                ]
            }).start();
            this.tag("Lightning").animation({duration:8,delay:2,repeat:-1,
                actions:[
                    {t: 'Lil', p: 'x', v: {0: 300, 0.5: 1600, 1: 300}},
                    {t: 'Lil', p: 'scaleX', v: {0: 1, 0.45: {v: 1, s: 0}, 0.55: {v: -1, se: 0}, 0.95: {v: -1, s: 0}, 1: 1}},
                    {t: 'Lil', p: 'rotation', v: {0: 0, 0.1: 0.25, 0.4: 0.25, 0.5: 0, 0.6: -0.25, 0.9: -0.25, 1.0: 0}}
                ]
            }).start();
        });
    }

    set lightning(v) {
        this.patch( {
            Sky: {color: lng.StageUtils.getArgbNumber([v * 155, v * 155, v * 70, 255])},
            Lake: {
                Wrapper: {
                    Top: {shader: {amount: v * 0.75}}
                }
            }
        });
    }

    _handleEnter() {
        this._lightningAnimation.start();
    }



    get title() {
        return "Lightning Framework"
    }
}