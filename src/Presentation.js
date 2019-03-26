import Content from "./Content.js";
import LiveEditor from "./LiveEditor.js";
import AppIframe from "./AppIframe.js";

export default class Presentation extends lng.Application {

    static _template() {
        return {
            Content: {type: Content, signals: {liveEdit: "_liveEdit"}},
            LiveEditor: {type: LiveEditor},
            AppIframe: {type: AppIframe, signals: {close: "_close"}}
        }
    }

    _init() {
        this._setState("Content");
    }

    _startLiveEditor(options) {
        this.tag("LiveEditor").session = options;
        this._setState("LiveEditor");
    }

    _changedState() {
        this.patch({
            Content: {smooth: {alpha: this._inState("Content") ? 1 : 0}},
            LiveEditor: {smooth: {alpha: this._inState("LiveEditor") ? 1 : 0}, shown: this._inState("LiveEditor")}
        })
    }

    $startApp(identifier) {
        this._setState("App", [identifier]);
    }

    static _states() {
        return [
            class Content extends this {
                _getFocused() {
                    return this.tag("Content");
                }
                _liveEdit(options) {
                    this._startLiveEditor(options);
                }
            },
            class LiveEditor extends this {
                _getFocused() {
                    return this.tag("LiveEditor");
                }
                _handleUp() {
                    this._setState("Content");
                }
                _handleDown() {
                    this._setState("Content");
                    this.tag("Content")._handleRight();
                }
            },
            class App extends this {
                $enter(context, identifier) {
                    this._prevState = context.prevState;
                    this.tag("AppIframe").startApp(identifier);
                }
                $exit() {
                    this.tag("AppIframe").close();
                }
                _close() {
                    this._setState(this._prevState);
                }
            }
        ]

    }
}