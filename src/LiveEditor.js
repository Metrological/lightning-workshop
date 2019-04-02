import Preview from "./Preview.js";

export default class LiveEditor extends lng.Component {

    static _template() {
        return {
            PreviewWrapper: {
                x: 0, y: 0,
                Preview: {type: Preview},
            }
        }
    }

    _construct() {
        this._createEditor();
    }

    _createEditor() {
        this._editorDiv = document.createElement('div');
        this._editorDiv.setAttribute('id', 'editor');
        this._editorDiv.style.width = '960px';
        this._editorDiv.style.height = '1080px';
        this._editorDiv.style.position = 'absolute';
        this._editorDiv.style.left = '0px';
        this._editorDiv.style.top = '0px';
        this._editorDiv.style.fontSize = '24px';
        this._editorDiv.style.lineHeight = '24px';
        this._editorDiv.style.zIndex = '70000';
        this._editorDiv.style.borderRight = '2px solid black';
        this._editorDiv.style.transition = 'width 0.2s';
        this._editorDiv.style.transition = 'opacity 0.2s';
        document.body.appendChild(this._editorDiv);

        this._editor = ace.edit("editor");
        this._editor.session.setMode("ace/mode/javascript");
        this._editor.setTheme("ace/theme/ambiance");
        this._editor.setOptions({cursorStyle: "wide"});
        this._editor.session.setUseWrapMode(true);
        // this._editor.renderer.setShowGutter(false);
        this._editor.renderer.STEPS = 32;
        this._editor.renderer.setAnimatedScroll(true);
        this._editor.setHighlightActiveLine(true);

        this._editorDiv.style.display = 'none';
    }

    set session(options) {
        this._editor.session.$undoManager.$redoStack = options.data.actions;
        this._editor.setValue("");
        this.tag("Preview").clear();
        this._options = options;
        this._setState("Editor");
        this._nextStep(true);
    }

    _active() {
        this._editorDiv.style.display = 'block';
    }

    _inactive() {
        this._editorDiv.style.display = 'none';
    }

    _setDivider(divider) {
        const dividerPosition = divider * 0.01 * 1920;
        this._editorDiv.style.width = (dividerPosition) + 'px';
        if (divider > 20) {
            this._editor.resize();
        }
        this.tag("PreviewWrapper").setSmooth('x', dividerPosition);
    }

    _reload() {
        let AppClass;

        const isApp = (this._options.isApp === true);
        try {
            let creator = "const appClass = " + this._editor.getValue();
            creator = creator.replace("lng.Application", "lng.Component");
            creator = creator.replace("constructor", "_dummy_constructor");
            creator = creator.replace("super(options);", "");

            creator += "\nreturn appClass;";
            const f = new Function(creator);
            AppClass = f();
        } catch (e) {
            console.error(e);
        }
        this.tag("Preview").startLivePreview(AppClass, isApp);
    }

    _exportUndoStack() {
        const undoStack = this._editor.session.$undoManager.$undoStack.slice().reverse();
        undoStack[0][0].reload = true;
        console.log(undoStack);
    }

    _getUndoManager() {
        return this._editor.session.$undoManager;
    }

    set shown(v) {
        this._editorDiv.style.opacity = v ? '1' : '0';
    }

    static _states() {
        return [
            class Editor extends this {
                $enter() {
                    //this._editor.focus();
                    this._setDivider(50);
                }

                _handleSwitchFocus() {
                    this._setState("Preview");
                }

                _nextStep(noSelection = false) {
                    if (this.tag("Preview").isReloading()) {
                        return;
                    }
                    const undoManager = this._getUndoManager();
                    const stack = undoManager.$redoStack;
                    const last = stack[stack.length - 1];
                    undoManager.redo();

                    if (!noSelection && (last && last[0])) {
                        this._editor.scrollToLine(last[0].end.row, true);
                    }

                    if (noSelection) {
                        this._editor.session.selection.clearSelection();
                    }

                    if (last && last[0].reload) {
                        this._setState("Editor.Reloading")
                        this._reload();
                    }
                }

                _prevStep() {
                    if (this.tag("Preview").isReloading()) {
                        return;
                    }
                    const undoManager = this._getUndoManager();
                    undoManager.undo();
                }
            },
            class Preview extends this {
                $enter() {
                    this._setDivider(5);

                    this._focusOutsideEditor();
                }

                _handleSwitchFocus() {
                    this._setState("Editor");
                }

                _focusOutsideEditor() {
                    document.getElementById("output").focus();
                }

                _getFocused() {
                    return this.tag("Preview");
                }
            }
        ]
    }

    _handleUp() {

    }

    _handleKey(event) {
        if (event.keyCode === 73 || event.keyCode === 81 && event.altKey) {
            try {
                this.fire('_handleSwitchFocus');
            } catch(e) {
            }
        } else if (event.keyCode === 39 && event.altKey) {
            this.fire('_nextStep');
        } else if (event.keyCode === 37 && event.altKey) {
            this.fire('_prevStep');
        } else if (event.keyCode === 87 && event.altKey) {
            this.fire('_reload');
        } else if (event.keyCode === 27 && event.altKey) {
            this._exportUndoStack()
        } else if (event.keyCode === 187) {
            this.fire('_nextStep');
        } else if (event.keyCode === 189) {
            this.fire('_prevStep');
        } else if (event.keyCode === 67) {
            this.fire('_reload');
        }
        return false;
    }

    _handleBack() {
        try {
            this.fire('_handleSwitchFocus');
        } catch(e) {
        }
    }
}