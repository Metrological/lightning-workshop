import Page from "../../Page.js";
import RenderTreeExample from "./RenderTreeExample.js";

export default class Flexbox extends Page {

    _active() {
        this.children = [{type: Example}];
        this._refocus();
    }

    get title() {
        return "Flexbox";
    }

    _getFocused() {
        return this.children[0];
    }

}

class Example extends RenderTreeExample {

    _build() {
        super._build();

        this._main = this._content.tag("Container");
    }

    _getBaseConfig() {
        return {
            Container: {
                Item1: {
                    w: true,
                    h: true,
                    color: true,
                },
                Item2: {
                    w: true,
                    h: true,
                    color: true,
                },
                Item3: {
                    w: true,
                    h: true,
                    color: true,
                },
                Item4: {
                    w: true,
                    h: true,
                    color: true,
                },
                Item5: {
                    w: true,
                    h: true,
                    color: true,
                }
            }
        };
    }

    _getInitialContent() {
        return {
            Container:{
                rect: true,
                x: 100,
                y: 100,
                color: 0xffa9a9a9,
                Item1: {
                    rect:true,
                    color:0xffe6194B,
                    w: 180,
                    h: 100,
                },
                Item2: {
                    rect:true,
                    color:0xfff58231,
                    w: 160,
                    h: 120,
                },
                Item3: {
                    rect:true,
                    color:0xffffe119,
                    w: 150,
                    h: 180,
                },
                Item4: {
                    rect:true,
                    color:0xffbfef45,
                    w: 110,
                    h: 40,
                },
                Item5: {
                    rect:true,
                    color:0xff3cb44b,
                    w: 80,
                    h: 80,
                }
            }
        };
    }

    /**
     * - No flex.
     * - Flex container
     * - Flex directions
     * - Autosizing
     * - Wrap & nowrap
     * - Justify content
     * - Align items
     * - Align self
     * - Align content
     * - Padding
     * - Margin
     * - Grow
     * - Nested
     * - Disabled and invisible flex items
     * -
     * @returns {*[]}
     * @private
     */
    _getActions() {
        return [
            {
                f: () => {
                    this._main.flex = {};
                },
                h: ["Container.flex"],
                c: {Container: {flex: {direction: true}}}
            },
            {
                f: () => {
                    this._main.flex = {direction: 'column'};
                },
                h: ["Container.flex.direction"]
            },
            {
                f: () => {
                    this._main.flex = {direction: 'row'};
                },
                c: {
                    Container: {
                        Item1: {w: false, h:false},
                        Item2: {w: false, h:false},
                        Item3: {w: false, h:false},
                        Item4: {w: false, h:false},
                        Item5: {w: false, h:false},
                    }
                },
                h: ["Container.flex.direction"]
            },
            {
                f: () => {
                    this._main.w = 380;
                },
                h: ["Container.w"],
                c: {Container: {w: true}}
            },
            {
                f: () => {
                    this._main.flex.wrap = true;
                },
                h: ["Container.flex.wrap"],
                c: {Container: {flex: {wrap: true}}}
            },
            {
                f: () => {
                    this._main.patch({
                        Item6: {
                            rect:true,
                            color:0xff42d4f4,
                            w: 120,
                            h: 120
                        }
                    });
                },
                h: ["Container.Item6"],
                c: {Container: {
                    flex: {wrap: true},
                    Item1: {},
                    Item2: {},
                    Item3: {},
                    Item4: {},
                    Item5: {},
                    Item6: {
                        color: true,
                    }
                }}
            },
            {
                f: () => {
                    this._main.w = 1000;
                    this._main.flex.wrap = false;
                },
                h: ["Container.w", "Container.flex.wrap"],
                c: {Container: {w: true, flex: {wrap: false}}}
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.grow = '1';
                },
                h: ["Container.Item1.flexItem.grow"],
                c: {
                    Container: {
                        Item1: {flexItem: {grow: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item4").flexItem.grow = '2';
                },
                h: ["Container.Item1.flexItem.grow", "Container.Item4.flexItem.grow"],
                c: {
                    Container: {
                        Item4: {flexItem: {grow: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.grow = '0';
                    this._main.tag("Item4").flexItem.grow = '0';
                },
                h: [],
                c: {
                    Container: {
                        Item1: {flexItem: false},
                        Item4: {flexItem: false}
                    }
                }
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'flex-start';
                },
                h: ["Container.flex.justifyContent"],
                c: {Container: {w: true, flex: {justifyContent: true}}}
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'flex-end';
                },
                h: ["Container.flex.justifyContent"]
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'center';
                },
                h: ["Container.flex.justifyContent"]
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'space-between';
                },
                h: ["Container.flex.justifyContent"]
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'space-around';
                },
                h: ["Container.flex.justifyContent"]
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'space-evenly';
                },
                h: ["Container.flex.justifyContent"]
            },
            {
                f: () => {
                    this._main.flex.justifyContent = 'flex-start';
                },
                h: ["Container.flex.justifyContent"]
            },
            {
                f: () => {
                    this._main.flex.alignItems = 'flex-start';
                },
                c: {Container: {w: true, flex: {alignItems: true}}},
                h: ["Container.flex.alignItems"]
            },
            {
                f: () => {
                    this._main.flex.alignItems = 'flex-end';
                },
                h: ["Container.flex.alignItems"]
            },
            {
                f: () => {
                    this._main.flex.alignItems = 'center';
                },
                h: ["Container.flex.alignItems"]
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.alignSelf = 'stretch';
                },
                h: ["Container.Item1.alignSelf"],
                c: {
                    Container: {
                        Item1: {flexItem: {alignSelf: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.alignSelf = 'flex-start';
                },
                h: ["Container.Item1.alignSelf"],
                c: {
                    Container: {
                        Item1: {flexItem: {alignSelf: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.marginRight = 50;
                },
                h: ["Container.Item1.flexItem.marginRight"],
                c: {
                    Container: {
                        Item1: {flexItem: {marginRight: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.marginTop = 150;
                },
                h: ["Container.Item1.flexItem.marginTop"],
                c: {
                    Container: {
                        Item1: {flexItem: {marginTop: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").flexItem.margin = 0;
                    this._main.tag("Item1").flexItem.alignSelf = undefined;
                },
                c: {
                    Container: {
                        Item1: {flexItem: false}
                    }
                }
            },
            {
                f: () => {
                    this._main.flex.padding = 50;
                },
                h: ["Container.flex.padding"],
                c: {
                    Container: {
                        flex: {padding:true}
                    }
                }
            },
            {
                f: () => {
                    this._main.w = 0;
                    this._main.h = 0;
                    this._main.flex.wrap = false;
                    this._main.flex.padding = 0;
                    this._main.flex.alignItems = 'flex-start';
                },
                c: {
                    Container:{
                        w: false,
                        h: false,
                        flex: {
                            alignContent: false,
                            padding: false,
                            justifyContent: false,
                            wrap: false,
                            alignItems: false,
                            direction: false
                        }
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item2").x = -20;
                    this._main.tag("Item2").y = 50;
                },
                h: ["Container.Item2.x", "Container.Item2.y"],
                c: {Container: {Item2: {x: true, y: true}}}
            },
            {
                f: () => {
                    this._main.tag("Item2").x = 0;
                    this._main.tag("Item2").y = 0;
                },
                c: {Container: {Item2: {x: false, y: false}}}
            },
            {
                f: () => {
                    this._main.tag("Item2").setSmooth('scale', 2);
                },
                h: ["Container.Item2.scale"],
                c: {Container: {Item2: {scale: true}}}
            },
            {
                f: () => {
                    this._main.tag("Item2").setSmooth('scale', 1);
                },
                h: ["Container.Item2.scale"],
                c: {Container: {Item2: {scale: false}}}
            },
            {
                f: () => {
                    this._main.patch({
                        Item1: {
                            SubItem1: {
                                text: {text:"flexbox", fontSize: 60},
                            },
                            SubItem2: {
                                text: {text:"rules", fontSize: 60},
                            },
                            SubItem3: {
                                text: {text:"all", fontSize: 60},
                            }
                        }
                    });
                },
                h: ["Container.Item1.SubItem1","Container.Item1.SubItem2","Container.Item1.SubItem3"],
                c: {
                    Container: {
                        Item1: {
                            SubItem1: {
                                text: {text: true}
                            },
                            SubItem2: {
                                text: {text: true}
                            },
                            SubItem3: {
                                text: {text: true}
                            }
                        }
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").flex = {direction: 'column'};
                },
                h: ["Container.Item1.flex", "Container.Item1.w", "Container.Item1.h"],
                c: {Container: {Item1: {flex: {direction: true}, w: true, h: true}}}
            },
            {
                f: () => {
                    this._main.tag("Item1").w = 0;
                    this._main.tag("Item1").h = 0;
                    this._main.tag("Item1").flex.padding = 20;
                },
                h: ["Container.Item1.w", "Container.Item1.h", "Container.Item1.flex.padding"],
                c: {
                    Container: {
                        Item1: {flex: {padding: true}}
                    }
                }
            },
            {
                f: () => {
                    this._main.patch({
                        Icon: {
                            flexItem: false,
                            src: "./static/img/Lightning.png",
                            scale: 0.5,
                            x: w => w,
                            y: 0,
                            mount: 0.5
                        }
                    });
                },
                h: ["Container.Icon"],
                c: {
                    Container: {
                        Icon: {
                            flexItem: true,
                            src: true,
                            x: "w=>w",
                            y: true,
                            mount: true
                        }
                    }
                }
            },
            {
                f: () => {
                    this._main.tag("Item1").alpha = 0;
                },
                h: ["Container.Item1.alpha"],
                c: {Container: {Item1: {alpha: true}}}
            },
            {
                f: () => {
                    this._main.tag("Item1").alpha = 1;
                    this._main.tag("Item1").visible = false;
                },
                h: ["Container.Item1.visible"],
                c: {Container: {Item1: {visible: true, alpha: 0}}}
            },
        ];
    }

}