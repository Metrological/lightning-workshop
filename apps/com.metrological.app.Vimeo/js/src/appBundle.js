var appBundle = (function () {
    'use strict';

    class VimeoGridItem extends lng.Component {
        static _template() {
            return {
                w: 400, h: 325, rect: true, color: 0xff0D1314, alpha: 0.6,
                Image: {},
                Border: {
                    alpha: 0, w: 400, h: 216,
                    Time: {
                        rect: true, color: 0xffFADB23, w: 100, h: 40, x: 300, y: 280, transitions: {y: {duration: 0.3}},
                        Label: {
                            x: 10, y: 10, color: 0xff000000, text: {text: '00:00:00', fontSize: 19}
                        }
                    },
                    Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xffFADA24, w: 400 - 4, h: 216 - 4, x: 2, y: 2}
                },
                Title: {
                    x: 20, y: 230, text: {text: '', fontSize: 40, wordWrapWidth: 360, maxLines: 1}
                },
                User: {
                    x: 20,
                    y: 284,
                    color: 0xffA3A4A5,
                    text: {text: 'Username', fontSize: 25, wordWrapWidth: 360, maxLines: 1}
                }
            };

        }

        set item(v) {
            this._item = v;

            this.patch({
                Image: {
                    src: App.cropImage({url: v.getPicture({w: 640}).link, w: 400, h: 215})
                },
                Border: {
                    Time: {
                        Label: {text: {text: App.secondsToTime(v.duration)}}
                    }
                },
                Title: {
                    text: {text: v.title}
                },
                User: {
                    text: {text: v.username}
                }
            });
        }

        get item() {
            return this._item;
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.1, alpha: 1},
                Border: {
                    smooth: {alpha: 1},
                    Time: {smooth: {y: 174}}
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1, alpha: 0.6},
                Border: {
                    smooth: {alpha: 0},
                    Time: {smooth: {y: 270}}
                }
            });
        }
    }

    class VimeoGrid extends lng.Component {
        static _template() {
            return {
                Title: {
                    y: 30, x: 100, text: {text: '', fontSize: 45}, alpha: 0.3
                },
                List: {
                    type: lng.components.ListComponent,
                    w: 1920,
                    h: 390,
                    y: 120,
                    itemSize: 440,
                    scrollTransition: {duration: 0.2},
                    invertDirection: false,
                    roll: true,
                    viewportScrollOffset: 0.5,
                    itemScrollOffset: 0.5,
                    rollMin: 90,
                    rollMax: 90
                }
            };
        }

        set title(v) {
            this.tag('Title').text.text = v;
        }

        hasResults() {
            return this.tag('List').items.length;
        }

        get items() {
            return this._items;
        }

        get active() {
            return this.tag('List').getElement(this.index);
        }

        get index() {
            return this.tag('List').realIndex;
        }

        set items(v) {
            this._items = v.filter((item) => {
                return item.streams.length;
            }).map((el) => {
                return {type: VimeoGridItem, item: el};
            });

            this.tag('List').items = this._items;
        }

        set storeFocus(v) {
            this._storeFocus = v;
        }

        _handleLeft() {
            if (this.index === 0) {
                return false;
            }

            this.tag('List').setPrevious();
        }

        _focus() {
            this.patch({
                Title: {smooth: {alpha: 1}}
            });
            this.tag('List').setIndex(0);
        }

        _unfocus() {
            if (!this._storeFocus) {
                this.tag('List').setIndex(0);
            }
            this.patch({
                Title: {smooth: {alpha: 0.3}}
            });
        }

        _handleRight() {
            this.tag('List').setNext();
        }

        _handleEnter() {
            if (this.active) {
                this.fireAncestors('$play', {
                    items: this.tag('List').items.map(item => item.item),
                    item: this.active.item
                }, true);
            }
        }

        _getFocused() {
            return this.active;
        }
    }

    class VimeoKeyboard extends lng.Component {
        static _template() {
            return {
                Categories: {},
                Keys: {}
            };
        }

        get active() {
            return this.tag('Keys').childList.getAt(
                this._activeidx + (this._row * this._c)
            );
        }

        _init() {
            this._keys = [
                ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '<'],
                ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'],
                ['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
            ];
            this._buildKb();
            this._activeidx = 0;
            this._row = 0;
            this._c = this._keys[0].length;
            this._r = this._keys.length;
        }

        _buildKb() {
            let children = [];
            let y = 0;

            this._keys.forEach((r) => {
                r.forEach((k, i) => {
                    children.push({ref: `Key-${k}`, type: VimeoKeyboardKey, x: i * 170, y, key: k});
                });
                y += 70;
            });
            children.push(
                {ref: 'SpaceKey', type: VimeoSpaceKey, x: 0, y: y, key: 'space'},
                {ref: 'SearchKey', type: VimeoSearchKey, x: 1020, y: y, key: 'search'}
            );
            this.patch({
                Keys: {children}
            });
        }

        _handleLeft() {
            if (this._activeidx > 0 && this._row < 3) {
                this._activeidx -= 1;
            } else if (this._row === 3 && this._activeidx === 1) {
                this._activeidx = 0;
            } else {
                return false;
            }
        }

        _handleRight() {
            if (this._activeidx < this._c - 1 && this._row < 3) {
                this._activeidx += 1;
            } else if (this._activeidx === 0) {
                this._activeidx = 1;
            }
        }

        _handleUp() {
            if (this._row > 0) {
                this._row -= 1;
            } else {
                this.signal('upExit');
            }
        }

        _handleDown() {
            if (this._row < 3) {
                // if we move to space / search row
                // focus on search
                if (this._row === 2) {
                    this._activeidx = 1;
                }
                this._row += 1;
            }
        }

        _handleEnter() {
            this.signal('keypress', {key: this.active.key});
        }

        _getFocused() {
            return this.active;
        }
    }

    class VimeoKeyboardKey extends lng.Component {
        static _template() {
            return {
                w:160, h:60, alpha: 0.4,
                Background: {texture: lng.Tools.getRoundRect(160, 60, 5, 2, 0xffffffff, true, 0xff0D1314)},
                Key: {mountX: 0.5, color: 0xffffffff, x: 80, y: 4, text: {text: ''}}
            };
        }

        set key(v) {
            this._key = v;
            this.tag('Key').text.text = v;
        }

        get key() {
            return this._key;
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.1, zIndex: 3, alpha: 1}
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1, zIndex: 1, alpha: 0.4}
            });
        }
    }

    class VimeoSpaceKey extends VimeoKeyboardKey {
        set key(v) {
            this._key = v;
            this.patch({
                w:1010, h:60,
                Background: {texture: lng.Tools.getRoundRect(1010, 60, 5, 2, 0xffffffff, true, 0xff0D1314)},
                Key: {mountX: 0.5, x: 505, y: 4, text: {text: v}}
            });
        }

        get key() {
            return this._key;
        }
    }

    class VimeoSearchKey extends VimeoKeyboardKey {
        set key(v) {
            this._key = v;
            this.patch({
                w:500, h:60,
                Background: {texture: lng.Tools.getRoundRect(500, 60, 5, 2, 0xffffffff, true, 0xff0D1314)},
                Key: {mountX: 0.5, x: 250, y: 4, text: {text: v}}
            });
        }

        get key() {
            return this._key;
        }
    }

    class VimeoSearch extends lng.Component {
        static _template() {
            return {
                Top: {
                    w: w=>w, h: 150, color: 0xff1A2022, rect: true,
                    Label: {color: 0xffffffff, mountX: 1, x: (w => w - 50), y: 50, text: {text: 'Search', fontSize: 60}}
                },
                Query: {
                    type: VimeoQuery, x: 50, y: 200, signals: {search: true}
                },
                Results: {
                    type: VimeoGrid, title: '', y: 250, x: -23
                },
                Keyboard: {
                    x: 50, y: 350, type: VimeoKeyboard, signals: {keypress: true, upExit: true}
                }
            };
        }

        _init() {
            this._results = this.tag('Results');
            this._setState("Keyboard");
        }

        _moveKeyboard() {
            this.tag('Keyboard').setSmooth('y', 750);
        }

        static _states() {
            return [
                class Query extends this {
                    _handleDown() {
                        this._setState("Results");
                    }
                    _getFocused() {
                        return this.tag('Query');
                    }
                },
                class Results extends this {
                    _handleUp() {
                        this._setState("Query");
                    }
                    _handleDown() {
                        this._setState("Keyboard");
                    }
                    _getFocused() {
                        return this.tag('Results');
                    }
                },
                class Keyboard extends this {
                    keypress({key}) {
                        this.tag('Query').update(key);
                    }
                    search({query}) {
                        if (!query) {
                            if (!this._search) {
                                this._search = [
                                    'cat', 'tomato', 'cats', 'funny', 'waldo', 'hello world'
                                ];
                            }
                            query = this._search[Math.floor(Math.random() * this._search.length)];
                        }
                        const api = this.fireAncestors('$getApi');
                        api.search(query).then((items) => {
                            this.fire('searchReady', {items});
                        });
                    }
                    searchReady({items}) {
                        this._results.items = items;
                        this._moveKeyboard();
                    }
                    upExit() {
                        this._setState("Results");
                    }
                    _getFocused() {
                        return this.tag('Keyboard');
                    }
                }
            ];
        }

    }

    class VimeoQuery extends lng.Component {
        static _template() {
            return {
                Query: {
                    y: 4, text: {text: '', fontSize: 50}
                },
                Line: {
                    rect: true, y: 90, h: 2, w: 1600, color: 0xff484A4E
                },
                Delete: {
                    x: 1550, y: 20,
                    texture: lng.Tools.getRoundRect(50, 50, 5, 0, 0x00000000, true, 0xff0D1314),
                    Label: {
                        x: 17, y: 7,
                        text: {
                            text: 'X', fontSize: 30
                        }
                    }
                }
            };
        }

        update(char) {
            switch (char) {
                case 'space':
                    this._query += ' ';
                    break;
                case 'clear':
                    this._query = '';
                    break;
                case 'search':
                    this.signal('search', {query: this._query});
                    break;
                case '<':
                    this._query = this._query.slice(0, -1);
                    break;
                default:
                    this._query += char;
                    break;
            }
            this.tag('Query').text.text = this._query;
        }

        get query() {
            return this._query;
        }

        _init() {
            this._query = '';
        }

        _focus() {
            this.tag('Delete').patch({
                smooth: {scale: 1.3}
            });
        }

        _unfocus() {
            this.tag('Delete').patch({
                smooth: {scale: 1}
            });
        }

        _handleEnter() {
            this.update('clear');
        }

    }

    class VimeoExplore extends lng.Component {
        static _template() {
            return {
                Wrapper: {
                    y: 170,
                    Channels: {}
                },
                Top: {
                    w: w => w, h: 150, color: 0xff1A2022, rect: true,
                    Label: {color: 0xffffffff, mountX: 1, x: (w => w - 50), y: 50, text: {text: 'Explore', fontSize: 60}}
                },
                Loader: {
                    x: w => w / 2,
                    mountX: 0.5,
                    y: 500,
                    h: 42,
                    w: 42,
                    src: App.getPath('images/loader.png'),
                    transitions: {alpha: {duration: 0.4, delay: 0.1}}
                }
            };
        }

        get channels() {
            return this.tag('Channels').children;
        }

        _init() {
            this._loading = this.tag('Loader').animation({
                duration: 1, repeat: -1, actions: [
                    {p: 'rotation', v: {0: 0, 1: Math.PI * 2}}
                ]
            });
            this._setState("Loading");
        }

        _firstActive() {
            this._loading.start();
            this.fireAncestors('$getApi').getChannels().then((data) => {
                this.items = data;
                this.fire('ready');
            }).catch(err => {
                console.error(err);
            });
        }

        select({idx}) {
            this._idx = idx;
            this._selected = this.channels[idx];
            this.tag('Channels').patch({
                smooth: {y: idx * -440}
            });
        }

        _handleUp() {
            if (this._idx > 0) {
                this.select({idx: this._idx - 1});
            }
        }

        _handleDown() {
            if (this._idx < this.channels.length - 1) {
                this.select({idx: this._idx + 1});
            }
        }

        _getFocused() {
            return this._selected;
        }

        set items(v) {
            this._items = v;
            let children = v.map((channel, idx) => {
                return {
                    type: VimeoGrid, items: channel.items, title: channel.category, x: 0, y: idx * 450
                };
            });

            this.patch({
                Wrapper: {
                    Channels: {
                        children
                    }
                }
            });
        }

        static _states() {
            return [
                class Loading extends this {
                    ready() {
                        this._loading.stop();
                        this.tag('Loader').setSmooth('alpha', 0);
                        this.select({idx: 0});
                        this._setState("");
                    }
                }
            ];
        }

    }

    class VimeoTeaser extends lng.Component {
        static _template() {
            return {
                rect: true, color: 0xff000000, w: 1770, x: 0, h: 590,
                Clipper: {
                    clipping: true, w: 1550, h: 590, x: 370,
                    Image: {
                        alpha: 0.0001, transitions: {alpha: {duration: 3, delay: 0}, scale: {duration: 30, delay: 0.1}}
                    }
                },
                Gradient: {
                    x: 370, colorLeft: 0xff000000, colorRight: 0x00000000, w: 1000, h: 590, rect: true
                },
                Seal: {
                    x: 40, y: 50, src: App.getPath('images/vimeo-staff-pick.png'), scale: 0.7, alpha: 0, rotation: -0.3,
                    transitions: {
                        scale: {duration: 0.4, delay: 2},
                        alpha: {duration: 0.4, delay: 2},
                        rotation: {duration: 0.4, delay: 2}
                    }
                },
                Title: {
                    y: 240, x: 90, text: {fontSize: 56, maxLines: 2, wordWrapWidth: 690, lineHeight: 80},
                    transitions: {alpha: {duration: 1.5, delay: 0.5}}
                },
                User: {
                    y: 290, x: 90, color: 0xffA3A4A5, text: {fontSize: 30, maxLines: 1, wordWrapWidth: 690, lineHeight: 40},
                    transitions: {alpha: {duration: 1.5, delay: 0.7}}
                },
                Watch: {
                    texture: lng.Tools.getRoundRect(150, 50, 5, 0, 0x00000000, true, 0xffffffff), y: 390, x: 90, alpha: 0,
                    transitions: {alpha: {duration: 1.5, delay: 0.9}},
                    Icon: {
                        y: 15, x: 19, src: App.getPath('images/watch-icon.png'), w: 19, h: 20
                    },
                    Label: {
                        x: 52, y: 10, color: 0xff000000, text: {text: 'Watch', fontSize: 25}
                    }
                },
                Overlay: {
                    rect: true, color: 0xff282E32, w: 1920, x: 0, h: 590,
                    transitions: {h: {duration: 0.6, delay: 0.3}, y: {duration: 0.6, delay: 0.3}}
                },
                Progress: {
                    x: 0, y: 585, h: 5, w: 0, rect: true, color: 0x80ffffff, alpha: 0,
                    transitions: {w: {duration: 30, timingFunction: 'linear'}, alpha: {duration: 1, delay: 2}}
                }
            };
        }


        pause() {
            this.tag('Progress').transition('w').pause();
            this.tag('Image').transition('scale').pause();
            this._pause = true;
        }

        play() {
            this.tag('Progress').transition('w').play();
            this.tag('Image').transition('scale').play();
            this._pause = false;
        }
        
        _init() {
            this._currentProgress = 0;
            this._progressDuration = 30;
            this._loadedTextures = [];

            this.tag('Title').on('txLoaded', () => {
                this._loadedTextures.push('title');
                this._position();
            });

            this.tag('User').on('txLoaded', () => {
                this._loadedTextures.push('user');
                this._position();
            });

            this._setState("Inactive");
        }

        _inactive() {
            this.pause();
        }

        _active() {
            this.play();
        }

        _detach() {
            if (this._interval) {
                clearInterval(this._interval);
            }
        }

        _focus() {
            this.patch({
                Watch: {
                    smooth: {color: 0xffFADA24, scale: 1.2}
                }
            });
            this.pause();
        }

        _unfocus() {
            this.patch({
                Watch: {
                    smooth: {color: 0xffffffff, scale: 1}
                }
            });
            this.play();
        }

        _handleEnter() {
            this.fireAncestors('play', {item: this._current, items: this._items});
        }

        loading() {
            this._setState("Loading");
        }

        running() {
            this._setState("Running");
        }

        static _states() {
            return [
                class Inactive extends this {
                    loaded() {
                        this.patch({
                            Clipper: {Image: {scale: 1, smooth: {alpha: 1, scale: 1.3}}},
                            Seal: {smooth: {alpha: 1, scale: 0.9, rotation: 0}},
                            Overlay: {smooth: {h: 1, y: 591}},
                            Watch: {smooth: {alpha: 1}},
                            Progress: {smooth: {alpha: 1, w: 1770}}
                        });

                        if (this._interval) {
                            clearInterval(this._interval);
                        }
                        this._interval = setInterval(() => {
                            this._progress();
                        }, 1000);

                        this.tag('Image').transition('alpha').on('finish', () => {
                            if (this.tag('Image').alpha < 1) {
                                this.fire('imageFaded');
                            }
                        });
                    }
                },
                class Loading extends this {
                    $enter() {
                        clearInterval(this._interval);
                        this.patch({
                            Clipper: {Image: {smooth: {alpha: 0.00001}}},
                            Title: {smooth: {alpha: 0}},
                            User: {smooth: {alpha: 0}},
                            Watch: {smooth: {alpha: 0}},
                            Progress: {smooth: {w: [0, {duration: 0.1, delay: 0}]}}
                        });
                        this._currentProgress = 0;
                    }
                    imageFaded() {
                        this._update();
                    }
                    $exit() {
                        if (this._interval) {
                            clearInterval(this._interval);
                        }
                        this._interval = setInterval(() => {
                            this._progress();
                        }, 1000);
                    }
                    loaded() {
                        this.patch({
                            Clipper: {Image: {scale: 1, smooth: {alpha: 1, scale: [1.3, {duration: 30, delay: 0}]}}},
                            Title: {smooth: {alpha: 1}},
                            User: {smooth: {alpha: 1}},
                            Watch: {smooth: {alpha: 1}},
                            Progress: {smooth: {w: [1770, {duration: 30, delay: 0, timingFunction: 'linear'}]}}
                        });
                        this.fire('running');
                    }
                },
                class Running extends this {
                }
            ];
        }

        set items(v) {
            this._items = v;
            this._currentSet = this._items.slice();
            this._update();
        }

        _position() {
            if (this._loadedTextures.indexOf('user') !== -1 && this._loadedTextures.indexOf('title') !== -1) {
                let yUser = this.tag('Title').renderHeight + this.tag('Title').y - 15;
                this.patch({
                    User: {y: yUser},
                    Watch: {y: yUser + 70}
                });
                this._loadedTextures = [];
            }
        }

        _progress() {
            if (this._pause) {
                return;
            }
            if (this._currentProgress === this._progressDuration) {
                this.fire('loading');
                return;
            }
            this._currentProgress += 1;
        }

        _update() {
            if (!this._currentSet.length) {
                this._currentSet = this._items.slice();
            }

            let item = this._currentSet.splice(VimeoTeaser.random(this._currentSet), 1)[0];

            this._current = item;

            this.patch({
                Clipper: {Image: {src: App.cropImage({url: item.largest, w: 1400, h: 590})}},
                Title: {text: {text: item.title}},
                User: {text: {text: item.username}}
            });

            this.tag('Title').loadTexture();
            this.tag('User').loadTexture();

            this.tag('Image').on('txLoaded', () => {
                this.fire('loaded');
            });

            this.tag('Image').on('txError', () => {
                this.signal('error');
            });
        }

        static random(items) {
            let len = items;
            if (Array.isArray(items)) {
                len = items.length;
            }

            return Math.floor(Math.random() * len);
        }


    }

    class VimeoHome extends lng.Component {

        static _template() {
            return {
                Teaser: {type: VimeoTeaser},
                StaffPicks: {
                    w: w => w, type: VimeoGrid, title: 'STAFF PICKS', storeFocus: true, y: 1080, x: -10,
                    transitions: {y: {duration: 0.4, delay: 0.7}}
                }
            }
        }

        _init() {
            this._setState("Loading");
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this._load();
                    }
                    $exit() {
                        this.fireAncestors('$hideInitialLoader');
                    }
                    _load() {
                        const api = this.fireAncestors('$getApi');
                        api.getStaffpicks().then((data) => {
                            this._loaded(data);
                        }).catch(err => console.error(err));
                    }
                    _loaded(data) {
                        this.tag('Teaser').items = data;
                        this.tag('StaffPicks').items = data;
                        this._setState("StaffPicks");
                    }
                },
                class Teaser extends this {
                    _handleDown() {
                        this._setState("StaffPicks");
                    }
                    _getFocused() {
                        return this.tag('Teaser');
                    }
                },
                class StaffPicks extends this {
                    $enter() {
                        this.tag('Teaser').patch({
                            smooth: {y: 0}
                        });
                        this.tag('StaffPicks').patch({
                            smooth: {y: 600}
                        });
                    }
                    _handleUp() {
                        this._setState("Teaser");
                    }
                    _getFocused() {
                        return this.tag('StaffPicks');
                    }
                }
            ];
        }

    }

    class VimeoContent extends lng.Component {

        static _template() {
            return {
                Home: {
                    w: w => w, type: VimeoHome, alpha: 0
                },
                Search: {
                    w: w => w, type: VimeoSearch, alpha: 0
                },
                Explore: {
                    w: w => w, type: VimeoExplore, alpha: 0
                }
            };
        }


        _setup() {
            this._views = {
                Home: [this.tag('Home')],
                Explore: [this.tag('Explore')],
                Search: [this.tag('Search')]
            };

            this._mapping = {
                feed: "Home",
                explore: "Explore",
                search: "Search"
            };
        }

        _init() {
            this._setState("Home");
        }

        play(args) {
            this.fireAncestors('$play', args);
        }

        select(view) {
            if (this._mapping.hasOwnProperty(view)) {
                this._setState(this._mapping[view]);
            }
        }

        static _states() {
            return [
                class Home extends this {
                    $enter() {
                        this.tag("Home").setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.tag("Home").setSmooth('alpha', 0);
                    }
                    _getFocused() {
                        return this.tag('Home');
                    }
                },
                class Explore extends this {
                    $enter() {
                        this.tag("Explore").setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.tag("Explore").setSmooth('alpha', 0);
                    }
                    _getFocused() {
                        return this.tag('Explore');
                    }
                },
                class Search extends this {
                    $enter() {
                        this.tag("Search").setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.tag("Search").setSmooth('alpha', 0);
                    }
                    _getFocused() {
                        return this.tag('Search');
                    }
                }
            ];
        }


    }

    class VimeoLogin extends lng.Component {
        static _template() {
            return {
                Wrapper: {
                    Title: {
                        text: {text: `Login`, fontSize: 45}
                    },
                    Info: {
                        y: 95,
                        text: {
                            text: `Sign in to your account to access your library and your own profile`,
                            maxLines: 3,
                            wordWrapWidth: 400,
                            lineHeight: 40,
                            fontSize: 24
                        }
                    },
                    Username: {
                        y: 210,
                        Label: {text: {text: `username`, fontSize: 21}},
                        Input: {
                            y: 30, texture: lng.Tools.getRoundRect(350, 50, 5, 2, 0xffffffff, true, 0x99ffffff)
                        }
                    },
                    Password: {
                        y: 310,
                        Label: {text: {text: `username`, fontSize: 21}},
                        Input: {
                            y: 30, texture: lng.Tools.getRoundRect(350, 50, 5, 2, 0xffffffff, true, 0x99ffffff)
                        }
                    },
                    Login: {
                        y: 430, x: 150,
                        Input: {
                            texture: lng.Tools.getRoundRect(200, 50, 5, 0, 0xffffffff, true, 0xff00ADEF)
                        },
                        Label: {x: 70, y: 8, text: {text: `login`, fontSize: 25}},
                    }
                }
            };
        }

    }

    class VimeoMenuItem extends lng.Component {

        static _template() {
            return {
                x: 60,
                ActiveRect: {
                    transitions: {alpha: {duration: 0.2, delay: 0.2}},
                    alpha: 0, texture: lng.Tools.getRoundRect(430, 100, 7, 0, 0x00000000, true, 0xff282E32)
                },
                Icon: {x: 20, w: 49, h: 49, y: 25, color: 0xfff1f1f1},
                Label: {
                    x: 100, color: 0xfff1f1f1, y: 23, alpha: 0, text: {text: 'label'}
                }
            };
        }

        set section(v) {
            this._section = v;
            this.patch({
                Icon: {
                    src: App.getPath(`images/${v}.png`),
                    scale: 0.8
                },
                Label: {text: v.toUpperCase()}
            });
        }

        get section() {
            return this._section;
        }

        get secure() {
            return this._secure;
        }

        set secure(v) {
            this._secure = v;
        }

        set listindex(v) {
            this._listindex = v[0];
            this.patch({
                transitions: {y: {duration: 0.6, delay: v[1] * 0.1 + 0.05}},
                Icon: {
                    transitions: {scale: {duration: 0.1, delay: v[1] * 0.1 + 0.05}}
                },
                Label: {
                    transitions: {alpha: {duration: 0.2, delay: v[1] * 0.1 + 0.05}}
                }
            });
        }

        set active(v) {
            this._isActive = v;
        }

        _toggle(t) {
            this.patch({
                smooth: {y: t ? this._listindex * 120 + 133 : this._listindex * 90 + 93},
                Icon: {smooth: {scale: t ? 1 : 0.8}},
                Label: {smooth: {alpha: t ? 1 : 0}},
                ActiveRect: {smooth: {alpha: 0}}
            });
        }

        _init() {
            this._setState("Collapsed");
        }

        _focus() {
            this.patch({
                Label: {smooth: {color: 0xff0D1314}},
                Icon: {smooth: {color: 0xff0D1314}},
                ActiveRect: {alpha: 0}
            });
        }

        _unfocus() {
            this.patch({
                Label: {smooth: {color: 0xfff1f1f1}},
                Icon: {smooth: {color: 0xfff1f1f1}}
            });
        }

        collapse() {
        }

        expand() {
        }

        static _states() {
            return [
                class Expanded extends this {
                    $enter() {
                        this._toggle(true);
                    }
                    collapse() {
                        this._setState("Collapsed");
                    }
                    _unfocus() {
                        super._unfocus();
                        this.patch({
                            ActiveRect: {smooth: {alpha: this._isActive ? 1 : 0}}
                        });
                    }
                },
                class Collapsed extends this {
                    $enter() {
                        this._toggle(false);
                    }
                    expand() {
                        this._setState("Expanded");
                    }
                }
            ];
        }


    }

    class VimeoMenu extends lng.Component {
        static _template() {
            return {
                alpha: 1, x: -150, zIndex: 99,
                transitions: {x: {duration: 0.6, delay: 0}},
                Shadow: {
                    colorLeft: 0xff000000, colorRight: 0x00000000, w: 200, h: 1080, rect: true
                },
                Wrapper: {
                    w: 150, h: 1080, color: VimeoMenu.COLORS.BACKGROUND, rect: true,
                    transitions: {},
                    Gradient: {
                        src: App.getPath('images/vimeo-line.png'), x: 150
                    },
                    FocusIndicator: {
                        alpha: 0, x: -1200, y: 120,
                        transitions: {x: {duration: 0.7, delay: 0.8}},
                        Shadow: {
                            color: 0xff000000, alpha: 0.5, texture: lng.Tools.getShadowRect(460, 100, 7, 5),
                        },
                        Focus: {
                            alpha: 1, texture: lng.Tools.getRoundRect(460, 100, 7, 0, 0x00000000, true, 0xfff1f1f1)
                        }
                    },
                    Items: {}
                },
                Login: {
                    type: VimeoLogin, x: 70, y: 70, alpha: 0
                }
            };
        }

        _toggle(t) {
            this.patch({
                Shadow: {
                    transitions: {w: {duration: 0.5, delay: t ? 0 : 0.5}},
                    smooth: {w: t ? 1170 : 200}
                },
                Wrapper: {
                    transitions: {w: {duration: 0.5, delay: t ? 0 : 0.5}},
                    smooth: {w: t ? 490 : 150},
                    Gradient: {
                        transitions: {x: {duration: 0.5, delay: t ? 0 : 0.5}, w: {duration: 0.5, delay: t ? 0 : 0.5}},
                        smooth: {x: t ? 490 : 150, w: t ? 10 : 5}
                    },
                    FocusIndicator: {
                        smooth: {
                            x: t ? [50, {duration: 0.2, delay: 0.6}] : [-1200, {duration: 0.5, delay: 0.2}],
                            alpha: 1,
                            y: t ? this._activeidx * 120 + 130 : this._midx * 120 + 130
                        }
                    }
                }
            });
            this.tag('Items').childList.get().forEach(el => {
                el[t ? 'expand' : 'collapse']();
            });
        }

        get list() {
            return this.tag('Items').childList.get();
        }

        get active() {
            return this.list[this._midx];
        }

        get previousActive() {
            return this.list[this._activeidx];
        }

        _repositionFocus() {
            this.patch({
                Wrapper: {
                    FocusIndicator: {smooth: {y: this._midx * 120 + 130}}
                }
            });
        }

        _init() {
            this.tag('Items').children = [
                {l: 'feed', secure: false},
                {l: 'explore', secure: false},
                {l: 'search', secure: false},
                {l: 'library', secure: true},
                {l: 'profile', secure: true}
            ].map((el, idx, arr) => {
                return {
                    type: VimeoMenuItem,
                    active: idx === 0,
                    section: el.l,
                    secure: el.secure,
                    y: idx * 90 + 93,
                    listindex: [idx, arr.length - idx]
                };
            });

            this._midx = 0;
            this._activeidx = 0;

            this.tag('FocusIndicator').transition('x').on('finish', () => {
                if (this.tag('FocusIndicator').x === 50) {
                    this.fire('ready');
                }
            });

            this._login = false;

            this._setState("Collapsed");
        }

        reveal() {
            this.patch({
                smooth: {x: 0}
            });
        }

        _focus() {
            this._toggle(true);
        }

        _unfocus() {
            this._toggle(false);
            this._setState("Collapsed");
        }

        static _states() {
            return [
                class Expanded extends this {
                    $enter() {
                        this._midx = this._activeidx || 0;
                    }
                    _handleUp() {
                        if (this._midx === 0) {
                            this._midx = this.list.length - 1;
                        } else {
                            this._midx--;
                        }
                        this._repositionFocus();
                    }
                    _handleDown() {
                        if (this._midx === this.list.length - 1) {
                            this._midx = 0;
                        } else {
                            this._midx++;
                        }
                        this._repositionFocus();
                    }
                    _handleEnter() {
                        this._activeidx = this._midx;
                        if (!this._login && this.active.secure) {
                            this._setState("Login");
                        } else {
                            this._activeidx = this._midx;
                            this.signal('select', {view: this.active.section});
                        }
                    }
                    _getFocused() {
                        return this.active;
                    }
                },
                class Collapsed extends this {
                    ready() {
                        this._setState("Expanded");
                    }
                },
                class Login extends this {
                    $enter() {
                        this.patch({
                            Wrapper: {
                                smooth: {w: 520},
                                Gradient: {smooth: {x: 520}},
                                FocusIndicator: {smooth: {alpha: 0}},
                                Items: {smooth: {alpha: 0}}
                            },
                            Login: {
                                smooth: {alpha: 1}
                            }
                        });
                    }
                    $exit() {
                        this.patch({
                            Wrapper: {
                                smooth: {w: 490},
                                Gradient: {smooth: {x: 490}},
                                FocusIndicator: {smooth: {alpha: 1}},
                                Items: {smooth: {alpha: 1}}
                            },
                            Login: {
                                smooth: {alpha: 0}
                            }
                        });
                    }
                    _handleRight() {
                        this._setState("Expanded");
                    }
                    _handleBack() {
                        this._setState("Expanded");
                    }
                }
            ]
        }

    }

    VimeoMenu.COLORS = {
        BACKGROUND: 0xff37434a
    };

    class VimeoMain extends lng.Component {

        static _template() {
            return {
                Menu: {
                    type: VimeoMenu, signals: {select: true}
                },
                Content: {
                    x: 150, w: 1770,
                    type: VimeoContent
                },
                Loader: {
                    src: App.getPath('images/vimeo-loading.png'), x: 739, y: 467, w: 442, h: 146
                }
            };
        }

        _setup() {
            this._loader = this.tag("Loader").animation({
                duration: 2, repeat: -1, stopMethod: 'immediate', actions: [
                    {p: 'y', rv: 450, v: {0: 450, 0.5: 440, 1: 450}}
                ]
            });

            this._loader.on('stop', () => {
                this.tag('Loader').setSmooth('alpha', 0);
            });
        }

        _init() {
            this._setState("Loading");
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this._loader.start();
                    }
                    $exit() {
                        this._loader.stop();
                        this.tag("Menu").reveal();
                    }
                    $hideInitialLoader() {
                        this._setState("Content");
                    }
                },
                class Content extends this {
                    _getFocused() {
                        return this.tag('Content');
                    }
                    _handleLeft() {
                        this._setState("Menu");
                    }
                },
                class Menu extends this {
                    _handleRight() {
                        this._setState("Content");
                    }
                    select({view}) {
                        this.tag("Content").select(view);
                        this._setState("Content", view);
                    }
                    _getFocused() {
                        return this.tag('Menu');
                    }
                }
            ];
        }

        _setFocusSettings(settings) {
            settings.clearColor = App.COLORS.BACKGROUND;
        }

    }

    class VimeoPlayer extends ux.tools.player.Player {

        static _template() {
            const template = super._template();
            template.Progress.signals = {left: "_scrubBackward", enter: "pressPlay", right: "_scrubForward"};
            return template;
        }

        static get PlayerControls() {
            return VimeoPlayerControls;
        }

        static get PlayerProgress() {
            return VimeoPlayerProgress;
        }

        _scrubBackward() {
            this.application.mediaplayer.seek(-15);
        }

        _scrubForward() {
            this.application.mediaplayer.seek(15);
        }

        static _states() {
            const states = super._states();
            
            let i;
            
            i = states.findIndex(state => state.name === "Controls");
            states[i] = class Controls extends states[i] {
                _handleDown() {
                    this._setState("Progress");
                }
            };

            states.push(class Progress extends this {
                _handleUp() {
                    this._setState("Controls");
                }
                _getFocused() {
                    return this.tag("Progress");
                }
            });

            return states;
        }

    }

    class VimeoPlayerProgress extends ux.tools.player.PlayerProgress {

        _focus() {
            this.tag("Main").color = 0xffFADA24;
            this.tag("Active").color = 0xffFADA24;
        }

        _unfocus() {
            this.tag("Main").color = 0xfff1f1f1;
            this.tag("Active").color = 0xfff1f1f1;
        }

        _handleLeft() {
            this.signal("left");
        }

        _handleEnter() {
            this.signal("enter");
        }

        _handleRight() {
            this.signal("right");
        }

    }

    class VimeoPlayerControls extends ux.tools.player.PlayerControls {

        static get PlayerButton() {
            return VimeoPlayerButton;
        }

    }

    class VimeoPlayerButton extends ux.tools.player.PlayerButton {

        static _buildOptions() {
            return lng.tools.ObjMerger.merge(super._buildOptions(), {
                colors: {
                    selected: 0xffFADA24,
                    deselected: lng.StageUtils.mergeColors(0xffFADA24, 0xff000000, 0.25)
                }
            });
        }
    }

    class VimeoMediaItem {
        constructor(obj) {
            this.$ = obj;
        }

        get title() {
            return this.$.name;
        }

        get pictures() {
            return this.$.pictures.sort((a, b) => b.width - a.width);
        }

        getMediaplayerItem() {
            return {title: this.title, stream: {link: this.filterStreams()[0].link}}
        }

        /**
         * Get a picture that matches a certain width or height
         * @param w
         * @param h
         * @returns {*}
         */
        getPicture({w = null, h = null}) {
            let pictures = this.pictures;

            if (!pictures.length) {
                return false;
            }
            if (!w && !h) {
                return pictures[0];
            } else {
                const val = w ? w : h;
                const match = pictures.filter(p => p[w ? 'width' : 'height'] === val);

                if (match.length) {
                    return match[0];
                } else {
                    return pictures[0];
                }
            }
        }

        get largest() {
            return this.pictures[0].link;
        }

        get smallest() {
            const p = this.pictures;
            return p[p.length - 1].link;
        }

        get streams() {
            return this.$.download || [];
        }

        /**
         * get an array of streams by quality
         * @param quality {(source|hd|sd)}
         */
        filterStreams(quality = 'sd') {
            return this.streams.filter(stream => stream.quality === quality);
        }

        get description() {
            return this.$.description;
        }

        get duration() {
            return this.$.duration;
        }

        get date() {
            return this.$.created_time;
        }

        get language() {
            return this.$.language;
        }

        get user() {
            return this.$.user;
        }

        get username() {
            return this.user.name;
        }
    }

    class VimeoApi {
        constructor() {

            this._keys = {
                key: 'aabe22c4e1a4038c0fc233bd6a0aa973',
                secret: '5d9d5e20fc83a9ac',
                token: '043c069649b914767c9cfe4db8cc6d63'
            };

            this._endpoints = {
                base: 'https://api.vimeo.com',
                staff: 'https://api.vimeo.com/channels/staffpicks/videos?filter=content_rating&filter_content_rating=safe&per_page=20&page=1',
                channels: 'https://api.vimeo.com/channels?per_page=10&sort=followers&direction=desc',
                search: 'https://api.vimeo.com/videos'
            };
        }

        _getHeaders() {
            return {
                headers: new Headers({Authorization: `bearer ${this._keys.token}`})
            };
        }

        _send(url) {
            return fetch(url, this._getHeaders()).then(r => r.json());
        }

        getStaffpicks() {
            return this._send(this._endpoints.staff).then(({data = [], paging}) => {
                if (!data.length) {
                    return Promise.reject('Get staffpicks returned no data');
                }
                return Promise.resolve(
                    data.map(video => new VimeoMediaItem(video))
                );
            });
        }

        getChannels() {
            return this._getChannelsPromises().then((data) => {
                let filtered = data.filter(channel => channel.total > 5);
                let channels = filtered.map((channel) => {
                    return {
                        category: channel.category,
                        items: channel.data.splice(0, 15).map((item) => {
                            return new VimeoMediaItem(item);
                        })
                    };
                });
                return Promise.resolve(channels);
            });
        }

        _getChannelsPromises() {
            return this._send(this._endpoints.channels).then((data = []) => {
                let promises = [];
                data.data.forEach((channel) => {
                    promises.push(this._getVideosForChannel(channel));
                });
                return Promise.all(promises);
            });
        }

        _getVideosForChannel(channel) {
            return this._send(`${this._endpoints.base}${channel.uri}/videos`).then((data) => {
                data.category = channel.name;
                return Promise.resolve(data);
            });
        }

        search(query) {
            return this._send(`${this._endpoints.search}/?query=${query}&direction=desc&sort=likes`).then((data) => {
                if (!data.data.length) {
                    return Promise.resolve([]);
                }
                let results = data.data.map((item) => {
                    return new VimeoMediaItem(item);
                });
                return Promise.resolve(results);
            });
        }

        send() {
            // fix
        }
    }

    class App extends ux.App {

        static _template() {
            return {
                Player: {type: VimeoPlayer, alpha: 0, signals: {playerStop: true}},
                Main: {type: VimeoMain}
            };
        }

        _construct() {
            this._api = new VimeoApi();
        }

        $getApi() {
            return this._api;
        }

        _init() {
            this._setState("Main");
        }

        $play({item, items}) {
            const player = this.tag('Player');
            const playlist = {item: item.getMediaplayerItem(), items: items.map(item => item.getMediaplayerItem())};
            if (player.play(playlist)) {
                this._setState("Playing");
            }
        }

        static _states() {
            return [
                class Main extends this {
                    $enter() {
                        this.tag("Main").setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.tag("Main").setSmooth('alpha', 0);
                    }
                    _getFocused() {
                        return this.tag("Main");
                    }
                },
                class Playing extends this {
                    $enter() {
                        this.tag("Player").setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.tag("Player").setSmooth('alpha', 0);
                    }
                    _handleBack() {
                        this.playerStop();
                    }
                    playerStop() {
                        // Last item has been fully played.
                        this._setState("Main");
                    }
                    _getFocused() {
                        return this.tag("Player");
                    }
                }
            ];
        }

        static secondsToTime(sec) {
            const hours = Math.floor(sec / 3600);
            sec %= 3600;
            const minutes = Math.floor(sec / 60);
            const seconds = sec % 60;
            return `${App.paddZero(hours)}:${App.paddZero(minutes)}:${App.paddZero(seconds)}`;
        }

        static paddZero(v) {
            if (v < 10) return `0${v}`;
            return v;
        }

        static cropImage({url, w, h}) {
            return ux.Ui.getImageUrl(url, {width: w, height: h, type: 'crop'});
        }

    }

    App.COLORS = {
        BACKGROUND: 0xff282e32
    };

    return App;

}());
