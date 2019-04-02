import Page from "../../Page.js";
import WaterWaveShader from "./WaterWaveShader.js";

export default class FrontPage extends Page {

    static _template() {
        return {
            Sky: {
                rect: true, w: 1920, h: 960, color: 0xFF000000,
            },
            Lake: {
                Wrapper: {
                    w: 1920, h: 800, rtt: true, y: 640, mountY: 1,
                    Top: {y: 0, src: "./static/img/city-land.jpg", shader: {type: lng.shaders.Inversion, amount: 0}},
                    Lightning: {alpha: 0, y: -300,
                        Comcast: {
                            w: 942, h: 359, rtt: true,
                            x: 560, y: 0, mountX: 0.5, scale: 0.75,
                            Wrap: {
                                x: 1, y: 1,
                                rect: true, w: 940, h: 357, color: 0xAAFFFFFF,
                                Logo: {
                                    x: 20, y: 20,
                                    src: "./static/img/Comcast.png"
                                }

                            }
                        },
                        Icon: {src: "./static/img/lightning-600.png", mountX: 0.5, x: 1360, y: -150, scale: 0.75},
                    }
                },
                Bottom: {src: "./static/img/city-land.jpg", shader: {type: WaterWaveShader, horizon: 697}, pivot: 0, scale: 1, y: 630, w: 1920, h: 310}
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
            this.tag("Lightning").setSmooth('y', 400, {delay: 1});
            this.tag("Lake").animation({duration:9,delay: 2,repeat:-1,
                actions:[
                    {t: '.Comcast', p: 'scale', v: {0: 0.75, 0.5: 1.0, 1: 0.75}},
                    {t: '.Icon', p: 'scale', v: {0: 1.0, 0.5: 0.75, 1: 1.0}},
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