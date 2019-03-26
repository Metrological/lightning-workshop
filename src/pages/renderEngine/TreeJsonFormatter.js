export default class TreeJsonFormatter extends lng.Component {
    
    static _template() {
        return {
            flex: {direction: 'column', paddingTop: 20, paddingRight: 40},
            Output: {
                flex: {direction: 'column'}
            },
            Spacer: {
                w: 700,
                h: 0
            }
        }
    }
    
    _construct() {
        this._element = null;
        this._config = {};
        this._highlights = new Set();
    }

    set element(element) {
        this._element = element;
    }

    set config(config) {
        this._config = config;
        this._updateOutput();
    }

    get config() {
        return this._config;
    }

    set highlights(highlights) {
        this._highlights = new Set(highlights);
    }

    _build() {
        this._listenForUpdates = () => {
            if (this._element) {
                if (this._element.core._hasUpdates || this._element.core._hasRenderUpdates) {
                    this._updateOutput();
                }
            }
        };
    }

    _active() {
        this.stage.on('frameStart', this._listenForUpdates);
        this._updateOutput();
    }

    _inactive() {
        this.stage.removeListener(this._listenForUpdates);
    }

    update() {
        this._updateOutput();
    }
    
    _updateOutput() {
        if (!this._element || !this._config) {
            return;
        }

        const jsonObject = this._getJsonObject();
        const jsonFormatter = new JsonFormatter(jsonObject);
        jsonFormatter.highlights = this._highlights;
        jsonFormatter.populate(this.tag("Output"));
    }

    _getJsonObject() {
        return this._getElementObject(this._element, this._config);
    }

    _getElementObject(element, config) {
        const propertyNames = Object.keys(config);
        
        const obj = {};
        propertyNames.forEach(name => {
            if (lng.Utils.isUcChar(name.charCodeAt(0))) {
                if (!config[name].__hidden) {
                    const child = element.getByRef(name);
                    if (child) {
                        obj[name] = this._getElementObject(child, config[name]);
                    }
                }
            } else {
                const include = this._shouldIncludeProperty(element, name, config[name]);
                if (include) {
                    if (lng.Utils.isString(config[name])) {
                        obj[name] = new JsonFormatter.ClearType(config[name]);
                    } else {
                        switch(name) {
                            case "texture":
                                if (element.texture) {
                                    obj[name] = this._getSubObject(element.texture, config[name]);
                                }
                                break;
                            case "text":
                                if (element.text) {
                                    obj[name] = this._getSubObject(element.text, config[name]);
                                }
                                break;
                            case "shader":
                                if (element.shader) {
                                    obj[name] = this._getSubObject(element.shader, config[name]);
                                }
                                break;
                            case "color":
                                const ul = element.colorUl;
                                const ur = element.colorUr;
                                const bl = element.colorBl;
                                const br = element.colorBr;
                                const verticalMatch = (ul === ur && bl === br);
                                const horizontalMatch = (ul === bl && ur === br);
                                if (horizontalMatch) {
                                    if (verticalMatch) {
                                        obj.color = ul;
                                    } else {
                                        obj.colorLeft = ul;
                                        obj.colorRight = br;
                                    }
                                } else {
                                    if (verticalMatch) {
                                        obj.colorTop = ul;
                                        obj.colorBottom = bl;
                                    } else {
                                        obj.colorUl = ul;
                                        obj.colorUr = ur;
                                        obj.colorBl = bl;
                                        obj.colorBr = br;
                                    }
                                }
                                break;
                            case "mount":
                                const mountX = element.mountX;
                                const mountY = element.mountY;
                                if (mountX === mountY) {
                                    obj[name] = element[name];
                                } else {
                                    obj.mountX = element.mountX;
                                    obj.mountY = element.mountY;
                                }
                                break;
                            case "pivot":
                                const pivotX = element.pivotX;
                                const pivotY = element.pivotY;
                                if (pivotX === pivotY) {
                                    obj[name] = element[name];
                                } else {
                                    obj.pivotX = element.pivotX;
                                    obj.pivotY = element.pivotY;
                                }
                                break;
                            case "scale":
                                const scaleX = element.scaleX;
                                const scaleY = element.scaleY;
                                if (scaleX === scaleY) {
                                    obj[name] = element[name];
                                } else {
                                    obj.scaleX = element.scaleX;
                                    obj.scaleY = element.scaleY;
                                }
                                break;
                            default:
                                obj[name] = element[name];
                                break;
                        }
                    }
                }
            }
        });
        
        return obj;
    }

    _shouldIncludeProperty(element, name, config) {
        if (lng.Utils.isObjectLiteral(config)) {
            return config.__hidden !== true;
        }

        if (lng.Utils.isFunction(config)) {
            return config(element[name], element, name);
        } else {
            return config !== false;
        }
    }

    _getSubObject(object, config) {
        const propertyNames = Object.keys(config);

        const obj = {};
        propertyNames.forEach(name => {
            if (name === "type") {
                obj[name] = new JsonFormatter.ClearType(config["type"]);
            } else {
                obj[name] = object[name];
            }
        });

        return obj;
    }
    
}

class JsonFormatter {

    constructor(jsonObject) {
        this._jsonObject = jsonObject;
    }

    set highlights(highlights) {
        this._highlights = highlights;
    }

    populate(element) {
        const patchObject = this._getPatchObject(this._jsonObject);
        element.children = [];
        element.patch(patchObject);
        this._highlights.forEach(path => {
            const p = JsonFormatter.convertHighlightPath(path);
            const item = element.tag(p);
            if (item) {
                item.rect = true;
                item.color = 0xAA442299;
            }
        });
    }

    static convertHighlightPath(path) {
        const sections = path.split(".");
        const convertedSections = sections.map(section => {
            if (lng.Utils.isUcChar(section.charCodeAt(0))) {
                return `Element-${section}`;
            } else {
                return `Prop-${section}`;
            }
        });
        return convertedSections.join(".")
    }

    _getPatchObject(object) {
        const propertyNames = Object.keys(object);
        const patch = {
            flex: {direction: 'column', paddingLeft: 20},
        };

        const lastPropertyName = propertyNames[propertyNames.length - 1];
        propertyNames.forEach(name => {
            const isLast = lastPropertyName === name;
            if (lng.Utils.isUcChar(name.charCodeAt(0))) {
                const sub = {
                    flex: {direction: 'column'},
                    Header: {
                        flex: {},
                        Title: JsonFormatter.text(name, 0xFF00FF00, 'bold'),
                        Sep: JsonFormatter.text(": {")
                    },
                    Contents: this._getPatchObject(object[name]),
                    Footer: JsonFormatter.text("}" + (isLast ? "" : ","))
                };
                patch[`Element-${name}`] = sub;
            } else {
                const value = object[name];
                if (value !== undefined) {
                    patch[`Prop-${name}`] = this._getProperty(name, value, isLast);
                }
            }
        });
        return patch;
    }

    _getProperty(name, value, isLast) {
        return this._getKeyValue(name, value, isLast);
    }

    _getKeyValue(name, value, isLast) {
        const isObject = lng.Utils.isObjectLiteral(value);
        if (isObject) {
            return {
                flex: {direction: 'column'},
                Definition: {
                    flex: {},
                    Label: JsonFormatter.text(name, 0xFFFF00FF, 'bold'),
                    Semi: JsonFormatter.text(": {"),
                },
                Value: this._getValueObject(value, name),
                Footer: JsonFormatter.text("}" + (isLast ? "" : ",")),
            }
        } else {
            return {
                flex: {},
                Label: JsonFormatter.text(name, 0xFFFF00FF, 'bold'),
                Semi: JsonFormatter.text(": "),
                Value: this._getValue(value, name, isLast)
            }
        }
    }

    _getValueObject(value, name) {
        const sub = {
            flex: {
                paddingLeft: 20,
                direction: 'column'
            },
        };
        const keys = Object.keys(value);
        keys.forEach(name => {
            if (value[name] !== undefined) {
                sub[`Prop-` + name] = this._getProperty(name, value[name]);
            }
        });
        return sub;
    }

    _getValue(value, name, isLast) {
        let color = 0xFFAAAAAA;
        let stringValue;
        if (value instanceof JsonFormatter.ClearType) {
            stringValue = value.value;
        } else if (lng.Utils.isString(value)) {
            stringValue = `"${value}"`;
            color = 0xFFAAAAFF;
        } else if (lng.Utils.isNumber(value)) {
            if (name.toLowerCase().indexOf("color") !== -1) {
                stringValue = "0x" + value.toString(16);
                color = (0x00FFFFFF & value) + 0xFF000000;
            } else {
                if (lng.Utils.isInteger(value)) {
                    stringValue = "" + value;
                } else {
                    stringValue = "" + value.toFixed(2);
                }
                color = 0xFFFFAA00;
            }
        } else if (lng.Utils.isBoolean(value)) {
            stringValue = "" + value;
            color = 0xFFFF00AA;
        } else if (value === null) {
            stringValue = "null";
        } else {
            throw new Error("Unknown formatted type");
        }
        return JsonFormatter.text(stringValue + (isLast ? "" : ","), color);
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {fontFace: 'monospace', text: text, fontSize: 22, fontStyle}};
    }

}

JsonFormatter.ClearType = class {
    constructor(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }
};

