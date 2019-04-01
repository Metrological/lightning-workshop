import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";
import Table from "../../Table.js";

export default class States extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                flex: {direction: 'column'},
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: States.text("Separation of concerns")},
                        {type: BulletPoint, content: States.text("Encapsulation")},
                        {type: BulletPoint, content: States.text("Template")},
                        {type: BulletPoint, content: States.text("Life cycle hooks")},
                    ]
                }
            }
        }
    }

    get title() {
        return "States"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    get liveEditOptions() {
        const actions = [[{"start":{"row":82,"column":0},"end":{"row":83,"column":0},"action":"remove","lines":["        let x = index * 640;",""],"id":1,"reload":true},{"start":{"row":82,"column":0},"end":{"row":83,"column":0},"action":"insert","lines":["        let x = Math.max(0, Math.min(index - 2, this._movies.length - 3)) * 640;",""]}],[{"start":{"row":176,"column":41},"end":{"row":176,"column":42},"action":"insert","lines":["4"],"id":6,"reload":true},{"start":{"row":176,"column":42},"end":{"row":176,"column":43},"action":"insert","lines":["4"]}],[{"start":{"row":176,"column":42},"end":{"row":176,"column":43},"action":"remove","lines":["0"],"id":5},{"start":{"row":176,"column":41},"end":{"row":176,"column":42},"action":"remove","lines":["0"]}],[{"start":{"row":177,"column":0},"end":{"row":178,"column":0},"action":"remove","lines":["        this.tag(\"Info\").y = 444;",""],"id":4}],[{"start":{"row":176,"column":0},"end":{"row":177,"column":0},"action":"insert","lines":["        this.tag(\"Info\").setSmooth('y', 400);",""],"id":3}],[{"start":{"row":173,"column":0},"end":{"row":174,"column":0},"action":"remove","lines":["        this.tag(\"Info\").y = 400;",""],"id":2}],[{"start":{"row":172,"column":0},"end":{"row":173,"column":0},"action":"insert","lines":["        this.tag(\"Info\").setSmooth('y', 400);",""],"id":1}],[{"start":{"row":97,"column":21},"end":{"row":97,"column":22},"action":"insert","lines":[" "],"id":23,"reload":true},{"start":{"row":97,"column":22},"end":{"row":97,"column":23},"action":"insert","lines":["t"]},{"start":{"row":97,"column":23},"end":{"row":97,"column":24},"action":"insert","lines":["r"]},{"start":{"row":97,"column":24},"end":{"row":97,"column":25},"action":"insert","lines":["u"]},{"start":{"row":97,"column":25},"end":{"row":97,"column":26},"action":"insert","lines":["e"]},{"start":{"row":97,"column":26},"end":{"row":97,"column":27},"action":"insert","lines":[","]}],[{"start":{"row":96,"column":19},"end":{"row":97,"column":0},"action":"insert","lines":["",""],"id":22},{"start":{"row":97,"column":0},"end":{"row":97,"column":12},"action":"insert","lines":["            "]},{"start":{"row":97,"column":12},"end":{"row":97,"column":13},"action":"insert","lines":["c"]},{"start":{"row":97,"column":13},"end":{"row":97,"column":14},"action":"insert","lines":["l"]},{"start":{"row":97,"column":14},"end":{"row":97,"column":15},"action":"insert","lines":["i"]},{"start":{"row":97,"column":15},"end":{"row":97,"column":16},"action":"insert","lines":["p"]},{"start":{"row":97,"column":16},"end":{"row":97,"column":17},"action":"insert","lines":["p"]},{"start":{"row":97,"column":17},"end":{"row":97,"column":18},"action":"insert","lines":["i"]},{"start":{"row":97,"column":18},"end":{"row":97,"column":19},"action":"insert","lines":["n"]},{"start":{"row":97,"column":19},"end":{"row":97,"column":20},"action":"insert","lines":["g"]},{"start":{"row":97,"column":20},"end":{"row":97,"column":21},"action":"insert","lines":[":"]}],[{"start":{"row":175,"column":30},"end":{"row":175,"column":31},"action":"insert","lines":["4"],"id":21,"reload":true},{"start":{"row":175,"column":31},"end":{"row":175,"column":32},"action":"insert","lines":["4"]}],[{"start":{"row":175,"column":31},"end":{"row":175,"column":32},"action":"remove","lines":["0"],"id":20},{"start":{"row":175,"column":30},"end":{"row":175,"column":31},"action":"remove","lines":["0"]}],[{"start":{"row":175,"column":0},"end":{"row":176,"column":0},"action":"insert","lines":["        this.tag(\"Info\").y = 400;",""],"id":19}],[{"start":{"row":171,"column":28},"end":{"row":171,"column":29},"action":"insert","lines":[" "],"id":18},{"start":{"row":171,"column":29},"end":{"row":171,"column":30},"action":"insert","lines":["4"]},{"start":{"row":171,"column":30},"end":{"row":171,"column":31},"action":"insert","lines":["0"]},{"start":{"row":171,"column":31},"end":{"row":171,"column":32},"action":"insert","lines":["0"]},{"start":{"row":171,"column":32},"end":{"row":171,"column":33},"action":"insert","lines":[";"]}],[{"start":{"row":171,"column":26},"end":{"row":171,"column":27},"action":"insert","lines":[" "],"id":17},{"start":{"row":171,"column":27},"end":{"row":171,"column":28},"action":"insert","lines":["="]}],[{"start":{"row":171,"column":25},"end":{"row":171,"column":26},"action":"insert","lines":["y"],"id":16}],[{"start":{"row":171,"column":8},"end":{"row":171,"column":25},"action":"insert","lines":["this.tag(\"Info\")."],"id":15}],[{"start":{"row":170,"column":14},"end":{"row":171,"column":0},"action":"insert","lines":["",""],"id":14},{"start":{"row":171,"column":0},"end":{"row":171,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":101,"column":20},"end":{"row":101,"column":21},"action":"insert","lines":["4"],"id":13},{"start":{"row":101,"column":21},"end":{"row":101,"column":22},"action":"insert","lines":["4"]}],[{"start":{"row":101,"column":21},"end":{"row":101,"column":22},"action":"remove","lines":["0"],"id":12},{"start":{"row":101,"column":20},"end":{"row":101,"column":21},"action":"remove","lines":["0"]}],[{"start":{"row":174,"column":0},"end":{"row":174,"column":1},"action":"insert","lines":["}"],"id":11},{"start":{"row":174,"column":0},"end":{"row":174,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":173,"column":0},"end":{"row":174,"column":0},"action":"insert","lines":["    _unfocus() {",""],"id":10}],[{"start":{"row":172,"column":4},"end":{"row":173,"column":0},"action":"insert","lines":["",""],"id":9},{"start":{"row":173,"column":0},"end":{"row":173,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":171,"column":5},"end":{"row":171,"column":9},"action":"remove","lines":["    "],"id":8},{"start":{"row":171,"column":5},"end":{"row":172,"column":0},"action":"insert","lines":["",""]},{"start":{"row":172,"column":0},"end":{"row":172,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":171,"column":0},"end":{"row":171,"column":1},"action":"insert","lines":["}"],"id":7},{"start":{"row":171,"column":0},"end":{"row":171,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":170,"column":0},"end":{"row":171,"column":0},"action":"insert","lines":["    _focus() {",""],"id":6}],[{"start":{"row":168,"column":5},"end":{"row":169,"column":0},"action":"insert","lines":["",""],"id":4},{"start":{"row":169,"column":0},"end":{"row":169,"column":4},"action":"insert","lines":["    "]},{"start":{"row":169,"column":4},"end":{"row":170,"column":0},"action":"insert","lines":["",""]},{"start":{"row":170,"column":0},"end":{"row":170,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":89,"column":4},"end":{"row":90,"column":4},"action":"remove","lines":["","    "],"id":3}],[{"start":{"row":86,"column":0},"end":{"row":89,"column":0},"action":"insert","lines":["    _getFocused() {","        return this._movies.getAt(this._index);","    }",""],"id":2}],[{"start":{"row":84,"column":5},"end":{"row":85,"column":0},"action":"insert","lines":["",""],"id":1},{"start":{"row":85,"column":0},"end":{"row":85,"column":4},"action":"insert","lines":["    "]},{"start":{"row":85,"column":4},"end":{"row":86,"column":0},"action":"insert","lines":["",""]},{"start":{"row":86,"column":0},"end":{"row":86,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":54,"column":21},"end":{"row":54,"column":22},"action":"insert","lines":[" "],"id":7,"reload":true},{"start":{"row":54,"column":22},"end":{"row":54,"column":23},"action":"insert","lines":["0"]},{"start":{"row":54,"column":23},"end":{"row":54,"column":24},"action":"insert","lines":[";"]}],[{"start":{"row":54,"column":19},"end":{"row":54,"column":20},"action":"insert","lines":[" "],"id":6},{"start":{"row":54,"column":20},"end":{"row":54,"column":21},"action":"insert","lines":["="]}],[{"start":{"row":54,"column":8},"end":{"row":54,"column":9},"action":"insert","lines":["t"],"id":5},{"start":{"row":54,"column":9},"end":{"row":54,"column":10},"action":"insert","lines":["h"]},{"start":{"row":54,"column":10},"end":{"row":54,"column":11},"action":"insert","lines":["i"]},{"start":{"row":54,"column":11},"end":{"row":54,"column":12},"action":"insert","lines":["s"]},{"start":{"row":54,"column":12},"end":{"row":54,"column":13},"action":"insert","lines":["."]},{"start":{"row":54,"column":13},"end":{"row":54,"column":14},"action":"insert","lines":["_"]},{"start":{"row":54,"column":14},"end":{"row":54,"column":15},"action":"insert","lines":["i"]},{"start":{"row":54,"column":15},"end":{"row":54,"column":16},"action":"insert","lines":["n"]},{"start":{"row":54,"column":16},"end":{"row":54,"column":17},"action":"insert","lines":["d"]},{"start":{"row":54,"column":17},"end":{"row":54,"column":18},"action":"insert","lines":["e"]},{"start":{"row":54,"column":18},"end":{"row":54,"column":19},"action":"insert","lines":["x"]}],[{"start":{"row":53,"column":18},"end":{"row":55,"column":5},"action":"insert","lines":["","        ","    }"],"id":4}],[{"start":{"row":53,"column":16},"end":{"row":53,"column":17},"action":"insert","lines":[" "],"id":3},{"start":{"row":53,"column":17},"end":{"row":53,"column":18},"action":"insert","lines":["{"]}],[{"start":{"row":53,"column":14},"end":{"row":53,"column":16},"action":"insert","lines":["()"],"id":2}],[{"start":{"row":51,"column":5},"end":{"row":52,"column":0},"action":"insert","lines":["",""],"id":1},{"start":{"row":52,"column":0},"end":{"row":52,"column":4},"action":"insert","lines":["    "]},{"start":{"row":52,"column":4},"end":{"row":53,"column":0},"action":"insert","lines":["",""]},{"start":{"row":53,"column":0},"end":{"row":53,"column":4},"action":"insert","lines":["    "]},{"start":{"row":53,"column":4},"end":{"row":53,"column":5},"action":"insert","lines":["_"]},{"start":{"row":53,"column":5},"end":{"row":53,"column":6},"action":"insert","lines":["c"]},{"start":{"row":53,"column":6},"end":{"row":53,"column":7},"action":"insert","lines":["o"]},{"start":{"row":53,"column":7},"end":{"row":53,"column":8},"action":"insert","lines":["n"]},{"start":{"row":53,"column":8},"end":{"row":53,"column":9},"action":"insert","lines":["s"]},{"start":{"row":53,"column":9},"end":{"row":53,"column":10},"action":"insert","lines":["t"]},{"start":{"row":53,"column":10},"end":{"row":53,"column":11},"action":"insert","lines":["r"]},{"start":{"row":53,"column":11},"end":{"row":53,"column":12},"action":"insert","lines":["u"]},{"start":{"row":53,"column":12},"end":{"row":53,"column":13},"action":"insert","lines":["c"]},{"start":{"row":53,"column":13},"end":{"row":53,"column":14},"action":"insert","lines":["t"]}],[{"start":{"row":69,"column":0},"end":{"row":74,"column":0},"action":"insert","lines":["    _handleLeft() {","        if (this._index > 0) {","            this._setIndex(this._index - 1);","        }","    }",""],"id":19}],[{"start":{"row":67,"column":5},"end":{"row":68,"column":0},"action":"insert","lines":["",""],"id":18},{"start":{"row":68,"column":0},"end":{"row":68,"column":4},"action":"insert","lines":["    "]},{"start":{"row":68,"column":4},"end":{"row":69,"column":0},"action":"insert","lines":["",""]},{"start":{"row":69,"column":0},"end":{"row":69,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":69,"column":0},"end":{"row":74,"column":0},"action":"insert","lines":["    _setIndex(index) {","        this._index = index;","        let x = index * 640;","        this.tag(\"Items\").setSmooth('x', -x);","    }",""],"id":17}],[{"start":{"row":68,"column":4},"end":{"row":69,"column":0},"action":"insert","lines":["",""],"id":15},{"start":{"row":69,"column":0},"end":{"row":69,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":64,"column":0},"end":{"row":67,"column":0},"action":"insert","lines":["        if (this._index < this._movies.length - 1) {","            this._setIndex(this._index + 1);","        }",""],"id":12}],[{"start":{"row":59,"column":0},"end":{"row":63,"column":0},"action":"insert","lines":["    get _movies() {","        return this.tag(\"Items\").childList;","    }","",""],"id":11}],[{"start":{"row":60,"column":5},"end":{"row":60,"column":9},"action":"remove","lines":["    "],"id":10},{"start":{"row":60,"column":5},"end":{"row":61,"column":0},"action":"insert","lines":["",""]},{"start":{"row":61,"column":0},"end":{"row":61,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":60,"column":0},"end":{"row":60,"column":1},"action":"insert","lines":["}"],"id":9},{"start":{"row":60,"column":0},"end":{"row":60,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":59,"column":0},"end":{"row":60,"column":0},"action":"insert","lines":["    _handleRight() {",""],"id":8}],[{"start":{"row":58,"column":4},"end":{"row":59,"column":0},"action":"insert","lines":["",""],"id":7},{"start":{"row":59,"column":0},"end":{"row":59,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":37,"column":0},"end":{"row":38,"column":0},"action":"remove","lines":["                ",""],"id":6}],[{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "],"id":4}],[{"start":{"row":35,"column":0},"end":{"row":36,"column":0},"action":"insert","lines":["                return this.tag(\"List\");",""],"id":3}],[{"start":{"row":34,"column":0},"end":{"row":36,"column":0},"action":"insert","lines":["                _getFocused() {","                }",""],"id":2}],[{"start":{"row":33,"column":40},"end":{"row":34,"column":0},"action":"insert","lines":["",""],"id":1},{"start":{"row":34,"column":0},"end":{"row":34,"column":16},"action":"insert","lines":["                "]}],[{"start":{"row":0,"column":0},"end":{"row":135,"column":1},"action":"insert","lines":["class MyApp extends lng.Application {","","    static _template() {","        return {","            List: {type: MovieList},","            Loader: {rect: true, color: 0xFF000000, w: 1920, h: 1080,","                Label: {text: {text: \"Loading..\", fontSize: 60}, mount: 0.5, x: 1920/2, y: 1080/2}","            }","        }","    }","    ","    _init() {","        this._setState(\"Loading\");","    }","    ","    static _states() {","        return [","            class Loading extends this {","                $enter() {","                    this.tag(\"Loader\").visible = true;","                    ","                    Api.getTopMovies().then((movies) => {","                        this._loaded(movies);","                    });","                }","                $exit() {","                    this.tag(\"Loader\").visible = false;","                }","                _loaded(movies) {","                    this.tag(\"List\").movies = movies;","                    this._setState(\"Content\");","                }","            },","            class Content extends this {","            }","        ]","    }","    ","}","","class MovieList extends lng.Component {","    static _template() {","        return {","            Title: {x: 50, text: {text: \"Top movies\", fontSize: 60, fontStyle: 'bold'}},","            Scroller: {y: 100, w: 1920, h: 400,","                Items: {}","            }","        }","    }","    ","    set movies(movies) {","        this.tag(\"Items\").children = movies.map((movie, index) => ({","            type: MovieItem, data: movie, x: index * 640 + 50","        }));","    }","    ","}","","class MovieItem extends lng.Component {","    static _template() {","        return {","            w: 600,","            h: 400,","            Background: {","            },","            Info: {","                mountY: 1,","                y: 400,","                w: 600,","                rect: true, color: 0x99000000,","                flex: {direction: 'column'},","                Title: {","                    flexItem: {marginLeft: 10, marginRight: 10},","                    text: {wordWrapWidth: 580, fontSize: 60, fontStyle: 'bold'}","                },","                Metadata: {","                    flexItem: {alignSelf: 'stretch'},","                    flex: {padding: 14, paddingTop: 0, justifyContent: 'space-between'},","                    Left: {","                        flex: {},","                        Year: {","                            flexItem: {marginRight: 10},","                            text: {fontSize: 20, fontStyle: 'bold'}","                        },","                        Genre: {","                            text: {fontSize: 20, fontStyle: 'bold'}","                        }","                        ","                    },","                    Rating: {","                        y: 4,","                        w: 107,","                        h: 17,","                        flexItem: {marginRight: 10},","                        Back: {","                            texture: {","                                type: lng.textures.ImageTexture,","                                src: \"./live/img/star-back.png\"","                            }","                        },","                        Front: {","                            texture: {","                                type: lng.textures.ImageTexture,","                                src: \"./live/img/star-front.png\"","                            }","                        }","                        ","                    }","                }","                ","            }","        }","    }","    ","    set data(data) {","        this.patch({","            Background: {src: data.image},","            Info: {","                Title: {","                    text: {text: data.title}","                },","                Metadata: {","                    Left: {","                        Year: {text: {text: data.year}},","                        Genre: {text: {text: data.genre}},","                    },","                    Rating: {","                        Front: {","                            texture: {w: (data.rating * (107 / 10))},","                        }","                    }","                }","            }","        });","    }","}"],"id":1,"reload":true}]];
        return {isApp: true, data: {actions:actions}};
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {text: text, fontSize: 48, fontStyle}};
    }

}