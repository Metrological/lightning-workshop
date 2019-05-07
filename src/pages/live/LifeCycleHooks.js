import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";
import Table from "../../Table.js";

export default class Components extends Page {

    static _template() {
        const enabled = {w:220, h: h=>h-2, y: 2, flexItem: false, rect: true, color: 0xFF227722};
        const disabled = {w:220, h: h=>h-2, y: 2, flexItem: false, rect: true, color: 0xFF772222};
        const unknown = {w:220, h: h=>h-2, y: 2, flexItem: false, rect: true, color: 0xFF777722};

        const hookText = (text) => {
            return {text: text, fontSize: 26, fontFace: 'helvetica'}
        };

        return {
            Bullets: {
                y: 100,
                x: 40,
                flex: {direction: 'column'},
                Table: {
                    w: 1600,
                    type: Table,
                    head: [
                        {grow: 1.5, v: {text: {text: "Method", fontStyle: "bold"}}},
                        {v: {w: 190, text: {text: "Instance", fontStyle: "bold"}}},
                        {v: {w: 190, text: {text: "Template", fontStyle: "bold"}}},
                        {v: {w: 190, text: {text: "Arguments", fontStyle: "bold"}}},
                        {v: {w: 190, text: {text: "Attached", fontStyle: "bold"}}},
                        {v: {w: 190, text: {text: "Visible", fontStyle: "bold"}}},
                        {v: {w: 190, text: {text: "On screen", fontStyle: "bold"}}},
                    ],
                    rows: [
                        [
                            {text: hookText("_construct()")},
                            enabled,
                            disabled,
                            disabled,
                            disabled,
                            disabled,
                            disabled
                        ],
                        [
                            {text: hookText("_build()")},
                            enabled,
                            enabled,
                            disabled,
                            disabled,
                            disabled,
                            disabled
                        ],
                        [
                            {text: hookText("_setup()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            disabled,
                            disabled
                        ],
                        [
                            {text: hookText("_init()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            disabled,
                            disabled
                        ],
                        [
                            {text: hookText("_attach()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            disabled,
                            disabled
                        ],
                        [
                            {text: hookText("_detach()")},
                            enabled,
                            enabled,
                            enabled,
                            disabled,
                            disabled,
                            disabled
                        ],
                        [
                            {text: hookText("_firstEnable()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            disabled
                        ],
                        [
                            {text: hookText("_enable()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            disabled
                        ],
                        [
                            {text: hookText("_disable()")},
                            enabled,
                            enabled,
                            enabled,
                            unknown,
                            unknown,
                            disabled
                        ],
                        [
                            {text: hookText("_firstActive()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            enabled
                        ],
                        [
                            {text: hookText("_active()")},
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            enabled,
                            enabled
                        ],
                        [
                            {text: hookText("_inactive()")},
                            enabled,
                            enabled,
                            enabled,
                            unknown,
                            unknown,
                            unknown
                        ]
                    ]
                }
            }
        }
    }

    get title() {
        return "Component Life Cycle Hooks"
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
    }

    get liveEditOptions() {
        const actions = [[{"start":{"row":34,"column":13},"end":{"row":35,"column":12},"action":"remove","lines":["","            "],"id":45,"reload":true}],[{"start":{"row":33,"column":0},"end":{"row":35,"column":0},"action":"insert","lines":["            class Content extends this {","            }",""],"id":44}],[{"start":{"row":32,"column":14},"end":{"row":32,"column":26},"action":"remove","lines":["            "],"id":43},{"start":{"row":32,"column":14},"end":{"row":33,"column":0},"action":"insert","lines":["",""]},{"start":{"row":33,"column":0},"end":{"row":33,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":32,"column":13},"end":{"row":32,"column":14},"action":"insert","lines":[","],"id":42}],[{"start":{"row":31,"column":17},"end":{"row":32,"column":16},"action":"remove","lines":["","                "],"id":41}],[{"start":{"row":31,"column":17},"end":{"row":32,"column":0},"action":"insert","lines":["",""],"id":39},{"start":{"row":32,"column":0},"end":{"row":32,"column":16},"action":"insert","lines":["                "]}],[{"start":{"row":30,"column":45},"end":{"row":30,"column":46},"action":"insert","lines":[";"],"id":38}],[{"start":{"row":30,"column":36},"end":{"row":30,"column":37},"action":"insert","lines":["C"],"id":37},{"start":{"row":30,"column":37},"end":{"row":30,"column":38},"action":"insert","lines":["o"]},{"start":{"row":30,"column":38},"end":{"row":30,"column":39},"action":"insert","lines":["n"]},{"start":{"row":30,"column":39},"end":{"row":30,"column":40},"action":"insert","lines":["t"]},{"start":{"row":30,"column":40},"end":{"row":30,"column":41},"action":"insert","lines":["e"]},{"start":{"row":30,"column":41},"end":{"row":30,"column":42},"action":"insert","lines":["n"]},{"start":{"row":30,"column":42},"end":{"row":30,"column":43},"action":"insert","lines":["t"]}],[{"start":{"row":30,"column":35},"end":{"row":30,"column":37},"action":"insert","lines":["\"\""],"id":36}],[{"start":{"row":30,"column":34},"end":{"row":30,"column":36},"action":"insert","lines":["()"],"id":35}],[{"start":{"row":30,"column":26},"end":{"row":30,"column":27},"action":"insert","lines":["s"],"id":34},{"start":{"row":30,"column":27},"end":{"row":30,"column":28},"action":"insert","lines":["e"]},{"start":{"row":30,"column":28},"end":{"row":30,"column":29},"action":"insert","lines":["t"]},{"start":{"row":30,"column":29},"end":{"row":30,"column":30},"action":"insert","lines":["S"]},{"start":{"row":30,"column":30},"end":{"row":30,"column":31},"action":"insert","lines":["t"]},{"start":{"row":30,"column":31},"end":{"row":30,"column":32},"action":"insert","lines":["a"]},{"start":{"row":30,"column":32},"end":{"row":30,"column":33},"action":"insert","lines":["t"]},{"start":{"row":30,"column":33},"end":{"row":30,"column":34},"action":"insert","lines":["e"]}],[{"start":{"row":29,"column":53},"end":{"row":30,"column":0},"action":"insert","lines":["",""],"id":33},{"start":{"row":30,"column":0},"end":{"row":30,"column":20},"action":"insert","lines":["                    "]},{"start":{"row":30,"column":20},"end":{"row":30,"column":21},"action":"insert","lines":["t"]},{"start":{"row":30,"column":21},"end":{"row":30,"column":22},"action":"insert","lines":["h"]},{"start":{"row":30,"column":22},"end":{"row":30,"column":23},"action":"insert","lines":["i"]},{"start":{"row":30,"column":23},"end":{"row":30,"column":24},"action":"insert","lines":["s"]},{"start":{"row":30,"column":24},"end":{"row":30,"column":25},"action":"insert","lines":["."]},{"start":{"row":30,"column":25},"end":{"row":30,"column":26},"action":"insert","lines":["_"]}],[{"start":{"row":29,"column":0},"end":{"row":30,"column":0},"action":"insert","lines":["                    this.tag(\"List\").movies = movies;",""],"id":32}],[{"start":{"row":29,"column":16},"end":{"row":29,"column":17},"action":"insert","lines":["}"],"id":31}],[{"start":{"row":28,"column":0},"end":{"row":29,"column":0},"action":"insert","lines":["                _loaded(movies) {",""],"id":30}],[{"start":{"row":27,"column":17},"end":{"row":28,"column":0},"action":"insert","lines":["",""],"id":28},{"start":{"row":28,"column":0},"end":{"row":28,"column":16},"action":"insert","lines":["                "]}],[{"start":{"row":23,"column":23},"end":{"row":24,"column":20},"action":"remove","lines":["","                    "],"id":27}],[{"start":{"row":21,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["                    Api.getTopMovies().then((movies) => {","                        this._loaded(movies);","                    });",""],"id":26}],[{"start":{"row":19,"column":54},"end":{"row":20,"column":0},"action":"insert","lines":["",""],"id":25},{"start":{"row":20,"column":0},"end":{"row":20,"column":20},"action":"insert","lines":["                    "]},{"start":{"row":20,"column":20},"end":{"row":21,"column":0},"action":"insert","lines":["",""]},{"start":{"row":21,"column":0},"end":{"row":21,"column":20},"action":"insert","lines":["                    "]}],[{"start":{"row":22,"column":49},"end":{"row":22,"column":50},"action":"insert","lines":["f"],"id":24},{"start":{"row":22,"column":50},"end":{"row":22,"column":51},"action":"insert","lines":["a"]},{"start":{"row":22,"column":51},"end":{"row":22,"column":52},"action":"insert","lines":["l"]},{"start":{"row":22,"column":52},"end":{"row":22,"column":53},"action":"insert","lines":["s"]},{"start":{"row":22,"column":53},"end":{"row":22,"column":54},"action":"insert","lines":["e"]}],[{"start":{"row":22,"column":52},"end":{"row":22,"column":53},"action":"remove","lines":["e"],"id":23},{"start":{"row":22,"column":51},"end":{"row":22,"column":52},"action":"remove","lines":["u"]},{"start":{"row":22,"column":50},"end":{"row":22,"column":51},"action":"remove","lines":["r"]},{"start":{"row":22,"column":49},"end":{"row":22,"column":50},"action":"remove","lines":["t"]}],[{"start":{"row":22,"column":0},"end":{"row":23,"column":0},"action":"insert","lines":["                    this.tag(\"Loader\").visible = true;",""],"id":22}],[{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["                    this.tag(\"Loader\").visible = true;",""],"id":21}],[{"start":{"row":21,"column":16},"end":{"row":21,"column":17},"action":"insert","lines":["}"],"id":20}],[{"start":{"row":20,"column":0},"end":{"row":21,"column":0},"action":"insert","lines":["                $exit() {",""],"id":19}],[{"start":{"row":19,"column":17},"end":{"row":20,"column":0},"action":"insert","lines":["",""],"id":18},{"start":{"row":20,"column":0},"end":{"row":20,"column":16},"action":"insert","lines":["                "]}],[{"start":{"row":18,"column":26},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":17},{"start":{"row":19,"column":0},"end":{"row":19,"column":20},"action":"insert","lines":["                    "]},{"start":{"row":19,"column":20},"end":{"row":19,"column":21},"action":"insert","lines":["}"]},{"start":{"row":19,"column":0},"end":{"row":19,"column":20},"action":"remove","lines":["                    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":16},"action":"insert","lines":["                "]}],[{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"insert","lines":["                $enter() {",""],"id":16}],[{"start":{"row":13,"column":0},"end":{"row":16,"column":0},"action":"remove","lines":["        Api.getTopMovies().then((movies) => {","            this.tag(\"List\").movies = movies;","        });",""],"id":15}],[{"start":{"row":12,"column":0},"end":{"row":13,"column":0},"action":"insert","lines":["        this._setState(\"Loading\");",""],"id":14}],[{"start":{"row":20,"column":0},"end":{"row":20,"column":1},"action":"insert","lines":["}"],"id":13},{"start":{"row":20,"column":0},"end":{"row":20,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["            class Loading extends this {",""],"id":12}],[{"start":{"row":18,"column":16},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":11},{"start":{"row":19,"column":0},"end":{"row":19,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":19,"column":9},"end":{"row":20,"column":0},"action":"insert","lines":["",""],"id":10},{"start":{"row":20,"column":0},"end":{"row":20,"column":8},"action":"insert","lines":["        "]},{"start":{"row":20,"column":8},"end":{"row":20,"column":9},"action":"insert","lines":["}"]},{"start":{"row":20,"column":0},"end":{"row":20,"column":8},"action":"remove","lines":["        "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":19,"column":8},"end":{"row":19,"column":9},"action":"insert","lines":["]"],"id":9}],[{"start":{"row":19,"column":8},"end":{"row":19,"column":12},"action":"remove","lines":["    "],"id":8}],[{"start":{"row":18,"column":16},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":7},{"start":{"row":19,"column":0},"end":{"row":19,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":17,"column":0},"end":{"row":19,"column":0},"action":"insert","lines":["    static _states() {","        return [",""],"id":6}],[{"start":{"row":15,"column":5},"end":{"row":16,"column":0},"action":"insert","lines":["",""],"id":5},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"insert","lines":["    "]},{"start":{"row":16,"column":4},"end":{"row":17,"column":0},"action":"insert","lines":["",""]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":7,"column":13},"end":{"row":8,"column":12},"action":"remove","lines":["","            "],"id":4,"reload":true}],[{"start":{"row":5,"column":0},"end":{"row":8,"column":0},"action":"insert","lines":["            Loader: {rect: true, color: 0xFF000000, w: 1920, h: 1080,","                Label: {text: {text: \"Loading..\", fontSize: 60}, mount: 0.5, x: 1920/2, y: 1080/2}","            }",""],"id":3}],[{"start":{"row":4,"column":36},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":5,"column":0},"end":{"row":5,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":4,"column":35},"end":{"row":4,"column":36},"action":"insert","lines":[","],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":110,"column":1},"action":"insert","lines":["class MyApp extends lng.Application {","","    static _template() {","        return {","            List: {type: MovieList}","        }","    }","    ","    _init() {","        Api.getTopMovies().then((movies) => {","            this.tag(\"List\").movies = movies;","        });","    }","}","","class MovieList extends lng.Component {","    static _template() {","        return {","            Title: {x: 50, text: {text: \"Top movies\", fontSize: 60, fontStyle: 'bold'}},","            Scroller: {y: 100, w: 1920, h: 400,","                Items: {}","            }","        }","    }","    ","    set movies(movies) {","        this.tag(\"Items\").children = movies.map((movie, index) => ({","            type: MovieItem, data: movie, x: index * 640 + 50","        }));","    }","    ","}","","class MovieItem extends lng.Component {","    static _template() {","        return {","            w: 600,","            h: 400,","            Background: {","            },","            Info: {","                mountY: 1,","                y: 400,","                w: 600,","                rect: true, color: 0x99000000,","                flex: {direction: 'column'},","                Title: {","                    flexItem: {marginLeft: 10, marginRight: 10},","                    text: {wordWrapWidth: 580, fontSize: 60, fontStyle: 'bold'}","                },","                Metadata: {","                    flexItem: {alignSelf: 'stretch'},","                    flex: {padding: 14, paddingTop: 0, justifyContent: 'space-between'},","                    Left: {","                        flex: {},","                        Year: {","                            flexItem: {marginRight: 10},","                            text: {fontSize: 20, fontStyle: 'bold'}","                        },","                        Genre: {","                            text: {fontSize: 20, fontStyle: 'bold'}","                        }","                        ","                    },","                    Rating: {","                        y: 4,","                        w: 107,","                        h: 17,","                        flexItem: {marginRight: 10},","                        Back: {","                            texture: {","                                type: lng.textures.ImageTexture,","                                src: \"./live/img/star-back.png\"","                            }","                        },","                        Front: {","                            texture: {","                                type: lng.textures.ImageTexture,","                                src: \"./live/img/star-front.png\"","                            }","                        }","                        ","                    }","                }","                ","            }","        }","    }","    ","    set data(data) {","        this.patch({","            Background: {src: data.image},","            Info: {","                Title: {","                    text: {text: data.title}","                },","                Metadata: {","                    Left: {","                        Year: {text: {text: data.year}},","                        Genre: {text: {text: data.genre}},","                    },","                    Rating: {","                        Front: {","                            texture: {w: (data.rating * (107 / 10))},","                        }","                    }","                }","            }","        });","    }","}"],"id":1,"reload":true}]];
        return {isApp: true, data: {actions:actions}};
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {text: text, fontSize: 48, fontStyle}};
    }

}