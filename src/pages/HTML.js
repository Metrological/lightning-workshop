import Page from "../Page.js";
import Table from "../Table.js";

export default class HTML extends Page {

    static _template() {
        return {
            y: 100,
            x: 40,
            Table: {
                w: 1600,
                type: Table,
                head: [
                    {grow: 1.5, v: {text: {text: "HTML", fontStyle: "bold"}}},
                    {grow: 1, v: {text: {text: "Lightning", fontStyle: "bold"}}},
                ],
                rows: [
                    [
                        {text: "DOM tree"},
                        {text: "Render tree"},
                    ],
                    [
                        {text: "HTMLElement, HTMLDivElement, .."},
                        {text: "Element"},
                    ],
                    [
                        {text: "CSS transitions & animations"},
                        {text: "JS animation toolkit"},
                    ],
                    [
                        {text: "CSS style properties"},
                        {text: "Lightning properties"},
                    ],
                    [
                        {text: "CSS layout properties"},
                        {text: "Flexbox, margin, padding, etc"},
                    ],
                    [
                        {text: "Cascading Style Sheets"},
                        {text: "Component templates"},
                    ],
                    [
                        {text: "Style calcs, Layout, Paint, Compositing"},
                        {text: "Update calcs, Paint, [Compositing]"},
                    ],
                    [
                        {text: "Millions of LoC"},
                        {text: "~20 kLoC"},
                    ]
                ]
            },
            Banner: {
                visible: false,
                y: -100,
                Simplicity: {
                    text: {text: "Simplicity", fontSize: 130, shadow: true, shadowBlur: 8},
                    color: 0xFF00FF00
                },
                Equals: {
                    x: 600, y: 330,
                    text: {text: "=", fontSize: 130, shadow: true, shadowBlur: 8}
                },
                Performance: {
                    text: {text: "Performance", fontSize: 130, shadow: true, shadowBlur: 8},
                    color: 0xFFFFFF00
                }
            }
        }
    }

    _init() {
        super._init();
        this._perf = this.animation({
            duration: 2,
            actions: [
                {t: 'Banner', p: 'visible', v: true, rv: false},
                {t: 'Table', p: 'alpha', v: {0: 1, 1: 0.5}},
                {t: 'Simplicity', p: 'x', v: {0: -500, 1: 160}},
                {t: 'Simplicity', p: 'y', v: {0: -200, 1: 160}},
                {t: 'Equals', p: 'alpha', v: {0: 0, 1: 1}},
                {t: 'Performance', p: 'x', v: {0: 1000, 1: 600}},
                {t: 'Performance', p: 'y', v: {0: 1000, 1: 500}},

            ]
        })
    }

    _active() {
        this.tag("Table").alpha = 0;
        this.tag("Table").x = 200;
        this.tag("Table").setSmooth('alpha', 1);
        this.tag("Table").setSmooth('x', 0);
    }

    _inactive() {
        this.tag("Table").setSmooth('alpha', 0);
        this.tag("Table").setSmooth('x', 200);
        this._perf.stopNow();
    }

    _handleRight() {
        if (this._perf.isPlaying() || this._perf.isFinished()) {
            return false;
        }
        this._perf.start();
    }

    get title() {
        return "HTML Comparison"
    }

}

