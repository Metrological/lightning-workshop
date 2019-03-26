import TreeJsonFormatter from "./TreeJsonFormatter.js";

export default class RenderTreeExample extends lng.Component {

    static _template() {
        return {
            Wrapper: {
                w: 1920,
                h: 960,
                rect: true,
                color: 0xFF222222,
                Grid: {
                    alpha: 0.5,
                    texture: {type: lng.textures.ImageTexture, src: "./static/img/grid.png", x: 1, y: 1},
                    x: 1, y: 1,
                },
                clipping: true,
                Content: {
                    forceZIndexContext: true
                }
            },
            Code: {
                type: TreeJsonFormatter,
                mountX: 1,
                x: 1920,
                h: 940,
                y: 0,
                rect: true,
                color: 0xFF000000,
                BorderLeft: {flexItem: false, color: 0xFFAAAAAA, w: 2, x: 0, y: 0, h: 960, rect: true}
            }
        }
    }

    _build() {
        this._code = this.tag("Code");
        this._content = this.tag("Content");
        this._code.element = this._content;

        this._content.patch(this._getInitialContent());

        this._config = this._getBaseConfig();

        this._code.config = this._config;
    }

    _init() {
        this._animations = this._getAnimations();
        this._actions = this._getActions();
    }

    _getBaseConfig() {
        return {};
    }

    _getInitialContent() {
        return {};
    }

    _getAnimations() {
        return [];
    }

    _getActions() {
        return [];
    }

    _active() {
        this._actionIndex = -1;
    }

    get _currentAction() {
        return this._actions[this._actionIndex];
    }

    _handleUp() {
        this._startPrevAction();
    }

    _handleDown() {
        this._startNextAction();
    }

    _startPrevAction() {
        if (this._actionIndex > 0) {
            this._actionIndex--;
            this._startAction();
        }
    }

    _startNextAction() {
        if (this._actionIndex < this._actions.length - 1) {
            this._actionIndex++;
            this._startAction();
        }
    }

    _startAction() {
        const current = this._currentAction;

        current.f();

        this._code.config = this._gatherActionConfig();
        this._code.highlights = current.h || [];

        this._code.update();
    }

    _gatherActionConfig() {
        let config = this._config;
        for (let i = 0; i <= this._actionIndex; i++) {
            const c = this._actions[i].c;
            if (c) {
                config = lng.tools.ObjMerger.merge(config, c);
            }
        }
        return config;
    }

}

