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
        this._editorDiv.style.left = '0';
        this._editorDiv.style.top = '0';
        this._editorDiv.style.fontSize = '24px';
        this._editorDiv.style.zIndex = '70000';
        this._editorDiv.style.borderRight = '2px solid black';
        this._editorDiv.style.transition = 'width 0.2s';
        document.body.appendChild(this._editorDiv);

        this._editor = ace.edit("editor");
        this._editor.session.setMode("ace/mode/javascript");
        this._editor.setTheme("ace/theme/textmate");
        this._editor.setOptions({cursorStyle: "wide"});
        this._editor.session.setUseWrapMode(true);
        this._editor.renderer.setShowGutter(false);
        this._editor.setHighlightActiveLine(true);

        this._editorDiv.style.display = 'none';
    }

    set session(data) {
        this._editor.session.$undoManager.$redoStack = data.actions;
        this._setState("Editor");
    }

    _active() {
        this._editorDiv.style.display = 'block';
    }

    _inactive() {
        this._editorDiv.style.display = 'none';
    }

    _setDivider(divider) {
        const dividerPosition = divider * 0.01 * 1920;
        this._editorDiv.style.width = dividerPosition + 'px';
        this.tag("PreviewWrapper").setSmooth('x', dividerPosition);
    }

    _reload() {
        let AppClass;

        try {
            let creator = "return "+ this._editor.getValue();
            creator = creator.replace("lng.Application", "lng.Component");
            const f = new Function(creator);
            AppClass = f();
        } catch (e) {
        }
        this.tag("Preview").startLivePreview(AppClass);
    }

    _exportUndoStack() {
        const undoStack = this._editor.session.$undoManager.$undoStack.slice().reverse();
        undoStack[0][0].reload = true;
        console.log(undoStack);
    }

    _getUndoManager() {
        return this._editor.session.$undoManager;
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

                _nextStep() {
                    if (this.tag("Preview").isReloading()) {
                        return;
                    }
                    const undoManager = this._getUndoManager();
                    const stack = undoManager.$redoStack;
                    const last = stack[stack.length - 1];
                    undoManager.redo();
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
                    this._setDivider(20);

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

    _handleKey(event) {
        if (event.keyCode === 81 && event.altKey) {
            this.fire('_handleSwitchFocus');
        } else if (event.keyCode === 190 && event.altKey) {
            this.fire('_nextStep');
        } else if (event.keyCode === 188 && event.altKey) {
            this.fire('_prevStep');
        } else if (event.keyCode === 87 && event.altKey) {
            this.fire('_reload');
        }
        return false;
    }

    // _handleKey(event) {
    //     if (event.keyCode === 36) {
    //         this.fire('_handleSwitchFocus');
    //     } else if (event.keyCode === 73) {
    //         this.fire('_nextStep');
    //     } else if (event.keyCode === 187) {
    //         this.fire('_prevStep');
    //     } else if (event.keyCode === 13) {
    //         this.fire('_reload');
    //     }
    //     return false;
    // }

}