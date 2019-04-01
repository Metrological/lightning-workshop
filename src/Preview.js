export default class Preview extends lng.Component {

    static _template() {
        return {
            w: 1920, h: 1080, rect: true, color: 0xFF000000,
            Contents: {w: 1920, h: 1080, renderToTexture: true, forceZIndexContext: true},
            Loading: {x: 40, y: h => h - 40, mountY: 1, text: {text: "Loading", fontSize: 48}, alpha: 0, transition: {alpha: {delay: 0.4}}}
        }
    }

    _setup() {
        this._reloadingErrorAnimation = this.animation({
            duration: 1, actions: [
                {p: 'color', v: {0: 0xFF000000, 0.5: 0xFF550000, 1: 0xFF000000}}
            ]
        });
    }

    clear() {
        this.tag("Contents").children = [];
    }

    startLivePreview(classType) {
        this._classType = classType;
        this._setState("Reloading");
    }

    isReloading() {
        return this._inState("Reloading");
    }

    static _states() {
        return [
            class Reloading extends this {
                $enter() {
                    this.tag("Loading").setSmooth("alpha", 1);
                    if (!this._classType) {
                        this._reloadingErrorAnimation.start();
                    }
                    this._timeout = setTimeout(() => {
                        this._reloadingTimeout();
                    }, 200);
                }
                $exit() {
                    this.tag("Loading").setSmooth("alpha", 0);
                    this._reloadingErrorAnimation.stop();
                    clearTimeout(this._timeout);
                }
                _reloadingTimeout() {
                    this._reload();
                    this._setState("");
                }
                _reload() {
                    if (this._classType) {
                        this.tag("Contents").children = [{type: this._classType}];
                    } else {
                        this.tag("Contents").children = [];
                    }
                }
            }
        ]
    }

    _getFocused() {
        return this.tag("Contents").childList.first;
    }


}