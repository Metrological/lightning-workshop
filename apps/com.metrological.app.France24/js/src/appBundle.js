var appBundle = (function () {
    'use strict';

    class SpinningLogo extends lng.Component {

        static _template() {
            return {
                src: App.getPath('images/splash-spinner.png')
            };
        }

        _setup() {
            this._loader = this.animation({duration: 1, repeat: -1, stopMethod: 'immediate',
                actions: [{ p: 'rotation', v: { 0: {v: 0, sm:0}, 1:{v: 2 * Math.PI, sm:0}}}]
            });
        }

        _focus() {
            this._loader.start();
        }

        _unfocus() {
            this._loader.stop();
        }

        _handleBack() {
            return false;
        }

        _handleKey() {
            //block all the key events other than BACK
        }
    }

    class Splash extends lng.Component {

        static _template() {
            return {
                Background: { w: 1920, h: 1080, rect: true, color: App.COLORS.BACKGROUND},
                Wrapper: {
                    x: 960, y: 540, mount: 0.5 , flex: {direction: 'column', alignItems: 'center'} ,
                    Logo: {flexItem: {}, src: App.getPath('images/france-24-logo.png')},
                    Spinner: {flexItem: {marginTop: 60}, type: SpinningLogo}
                }
            };
        }

        _getFocused() {
            return this.tag("Spinner");
        }

    }

    class MenuItem extends lng.Component {

        static _template() {
            return {
                flexItem: {marginRight: 70},
                flex: {},
                FlexMenuItem: {
                    flex: {direction: 'column', alignItems: 'stretch'},
                    Title: {text: {fontFamily: 'OpenSans', fontSize: 40}, color: 0xff101010},
                    Line: {alpha: 1, h: 4, color: 0xff101010 , rect:true}
                }
            }
        }

        set title(title) {
           this.patch({
               FlexMenuItem: {
                   Title: {text: {text: title.toUpperCase()}},
               }
           });
        }

        set selection(t) {
            this._selected = t;
            this.patch({
                 FlexMenuItem: {
                     Title: {smooth: {color: 0xff101010}, text: {fontStyle: t ? 'bold' : 'normal'}},
                     Line: {smooth: {color: 0xff101010, alpha : t ? 1 : 0}}
                 }
            });
        }

        _focus() {
            this.patch({
                FlexMenuItem: {
                    Title: {smooth: {color: 0xff00a7e3}, text: {fontStyle: 'bold'}},
                    Line: {smooth: {color: 0xff00a7e3}}
                }
            });
        }

        _unfocus() {
            this.patch({
                FlexMenuItem: {
                    Title: {smooth: {color: 0xff101010}, text: {fontStyle: this._selected ? 'bold' : 'normal'}},
                    Line: {smooth: {color: 0xff101010}}
                }
            });
        }

    }

    class Menu extends lng.Component {

        static _template() {
            return {
                x: 300, y: 55,
                FlexMenu: {
                    flex: {direction: 'row', justifyItems: 'flex-start',}
                }
            }
        }

       _init() {
            this.tag("FlexMenu").children = Menu.ITEMS.map(item => {
                return {
                    type: MenuItem,
                    title: item.title,
                    selection: item.selection
                }
            });
            this._focusIdx = 0;
            this._selectedIdx = 0;
       }

       _getFocused() {
           return this.tag("FlexMenu").children[this._focusIdx];
       }

       _handleRight() {
            if(this._focusIdx < Menu.ITEMS.length - 1) {
                this._focusIdx++;
            }
       }

       _handleEnter() {
            this._selectedIdx = this._focusIdx;
            this.tag("FlexMenu").children.forEach((item, index) => {
               item.selection = (this._selectedIdx === index);
            });
           this.fireAncestors("$select", Menu.ITEMS[this._focusIdx].title);
       }

       _handleLeft() {
            if(this._focusIdx > 0) {
                this._focusIdx--;
            }
       }

       _handleDown() {
           /*Reset the focused to selected. So that the next time when the focus is gained by Menu,
           then the selected will be highlighted.
            */
            this._focusIdx = this._selectedIdx;

            return false;
       }

    }

    Menu.ITEMS = [
        {title: "TOP STORIES", selection: true},
        {title: "MOST VIEWED", selection: false},
        {title: "SHOWS", selection: false},
        {title: "ABOUT", selection: false}
    ];

    class Header extends lng.Component {

        static _template() {
            return {
                w: 1920, h: 140, rect: true, color: 0xffffffff,
                Line: {
                    x: 0, y: 140, w: 1920, h: 2, rect: true, color: 0xffa9adac
                },
                Image: {
                    x: 100, y: 50, src: App.getPath('images/france-24-logo-small.png')
                },
                Menu: {
                    type: Menu
                }
            }
        }

        _getFocused() {
            return this.tag("Menu");
        }

    }

    class List extends lng.Component {
        static _template() {
            return {
                Title: {
                    text: {fontSize: 44, fontFace: 'OpenSans', fontStyle: 'bold'}, color: 0xff606060, alpha: 0
                },
                List: {
                    type: lng.components.ListComponent,
                    w: 1920,
                    x: -85,
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

        set title(title) {
            if(title) {
                this.patch({
                    Title: {text: {text: title}, smooth: {alpha: 1}},
                    List: {smooth: {y: 80}}
                });
            }
        }

        set itemSize(size) {
            this.patch({
                List: {itemSize: size}

            });
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

        set items(items) {
            this._items = items;
            this.tag('List').items = this._items;
        }

        set storeFocus(v) {
            this._storeFocus = v;
        }

        _handleLeft() {
           this.tag('List').setPrevious();
        }

        _focus() {
            this.tag('List').setIndex(0);
        }

        _unfocus() {
            if (!this._storeFocus) {
                this.tag('List').setIndex(0);
            }
        }

        _handleRight() {
            this.tag('List').setNext();
        }

        _getFocused() {
            return this.active;
        }
    }

    class TransparentShader extends  lng.shaders.WebGLDefaultShader {
        beforeUsage() {
            this.gl.disable(this.gl.BLEND);
        }

        afterUsage() {
            this.gl.enable(this.gl.BLEND);
        }
    }

    class PrimaryItem extends lng.Component {
        static _template() {
            return {
                w: 720, h: 414,
                TransparentRect: {rect: true, color: 0x00000000, w: 700, h: 394, alpha : 0},
                PrimaryImage: {w: 700, h: 394, alpha: 0},
                FocusIndicator: {w: 170, h: 170, x: 360, y: 207, mount: 0.5, alpha: 0, src: App.getPath('images/play-big.png')},
                Border: {
                    alpha: 0,
                    Border: {type: lng.components.BorderComponent, borderWidth: 10, colorBorder: 0xff00a7e3, w: 700 , h: 394}
                },
            };

        }

        set image(image) {
            this.patch({
                PrimaryImage: {
                    src: image,
                    alpha: 1
                }
            });
        }

        set imageUrl(image) {
            this.patch({
                PrimaryImage: {
                    src: App.cropImage({url: image, w: 700, h: 394}),
                    alpha: 1
                }
            });
        }

        set hidePlayOnFocus(v) {
            this._hidePlayOnFocus = v;
        }

        set transparent(v) {
            this.patch({
                TransparentRect: {
                    alpha: v ? 1 : 0, shader: v ? {type: TransparentShader} : null
                },
                PrimaryImage: {
                    alpha: v ? 0 : 1
                }
            });
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.02},
                Border: {
                    smooth: {alpha: 1}
                },
                FocusIndicator: {
                    smooth: {alpha: this._hidePlayOnFocus ? 0 : 1}
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1},
                Border: {
                    smooth: {alpha: 0}
                },
                FocusIndicator: {
                    smooth: {alpha: 0}
                }

            });
        }
    }

    class ImageItem extends lng.Component {
        static _template() {
            return {
                w: 370, h: 205,
                Image: {},
                Border: {
                    alpha: 0,
                    Border: {type: lng.components.BorderComponent, borderWidth: 6, colorBorder: 0xff00a7e3, w: 370 , h: 205}
                },
            };

        }

        set item(v) {
            this._item = v;

            this.patch({
                Image: {
                    src: App.cropImage({url: v.getPicture(388), w: 370, h: 205})
                }
            });
        }

        get item() {
            return this._item;
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.1},
                Border: {
                    smooth: {alpha: 1}
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1},
                Border: {
                    smooth: {alpha: 0}
                }
            });
        }
    }

    class VideoItem extends lng.Component {
        static _template() {
            return {
                w: 370, h: 365,
                Image: {w: 370, h: 205},
                Border: {
                    alpha: 0, Border: {type: lng.components.BorderComponent, borderWidth: 6, colorBorder: 0xff00a7e3, w: 370 , h: 205}
                },
                Title: {
                    y: 230, text: {fontFamily: 'OpenSans', fontSize: 22, fontStyle: 'bold', maxLines: 3, wordWrapWidth: 370, lineHeight: 30}, color: 0xff101010
                },
                Date: {
                    y: 350, text: {fontFamily: 'OpenSans', fontSize: 22, fontStyle: 'bold'}, color: 0xff606060
                }
            };

        }

        set item(v) {
            this._item = v;

            this.patch({
                Image: {
                    src: App.cropImage({url: v.getPicture(388), w: 370, h: 205})
                },
                Title: {text: {text: v.description || ''}},
                Date: {text: {text: v.createdTime ? App.formatTime(v.createdTime) : ''}}
            });
        }

        get item() {
            return this._item;
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.03},
                Border: {
                    smooth: {alpha: 1}
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1},
                Border: {
                    smooth: {alpha: 0}
                }
            });
        }
    }

    class TopStories extends lng.Component {

        static _template() {
            return {
                w: 1920, h: 938, rect: true, color: 0xfff4f8f7,
                PrimaryItem: {x: 100, y: 40, type: PrimaryItem, hidePlayOnFocus: true, image: App.getPath('images/watch-live.png')},
                Channel: {
                    x: 850, y:40,
                    text: {text: TopStories.TEXTS.channel, fontFamily: 'OpenSans', fontStyle: 'bold', fontSize: 48}, color: 0xff101010
                },
                ChannelDescription: {
                    x: 850, y: 110, text:{fontFamily: 'OpenSans', fontSize: 38, text: TopStories.TEXTS.description,
                        maxLines: 3, wordWrapWidth: 900, lineHeight: 50}, color: 0xff606060
                },
                CurrentProgramTitle: {
                    x: 850, y: 320, text: {fontFamily: 'OpenSans', fontStyle: 'bold', fontSize: 48,
                        maxLines: 3, maxLinesSuffix: '...', wordWrapWidth: 900}, color: 0xff101010
                },
                NextProgram: {
                    x:850, y:380, text: {text: 'Next :', fontFamily: 'OpenSans', fontSize: 38}, color: 0xff606060, alpha: 0,
                    Title: {
                        x: 120, text:{fontFamily: 'OpenSans', fontSize: 38, maxLines: 1, maxLinesSuffix: '...',
                            wordWrapWidth: 750}, color: 0xff606060
                    }
                },
                LatestBulletins: {
                    type: List, title: 'Latest bulletins', x: 100, y: 470, itemSize: 415
                },
                LatestStories: {
                    type: List, title: 'Latest stories', x: 100, y: 800, itemSize: 415
                }
            };
        }

        _setup() {
            this._views = {
                PrimaryItem: this.tag("PrimaryItem"),
                LatestBulletins: this.tag("LatestBulletins"),
                LatestStories: this.tag("LatestStories")
            };
        }

        _init() {
            this._setState("Loading");
            this._api = this.fireAncestors('$getApi');
        }

        _active() {
            this._setTimeout(0);
        }

        _inactive() {
            this._clearTimeout();

            //reset the live program information
            this._setLiveProgramInfo();
        }

        _setTimeout(duration) {
            this._timerId = setTimeout(() => {
                this._api.getLivePrograms().then( (programs) => {
                    //set the live program information
                    this._setLiveProgramInfo(programs);

                    let nextPingAt = App.LIVE_PROGRAMS_POLL_FREQUENCY;
                    if(programs) {
                        let nextProgramIn = programs.current.end_time - Date.now();
                        //If the next program starts in less than the poll frequency then adjust the next ping
                        if(nextProgramIn < App.LIVE_PROGRAMS_POLL_FREQUENCY) {
                            nextPingAt = nextProgramIn;
                        }
                    }
                    this._setTimeout(nextPingAt);
                }).catch(err => {
                    console.error(err);
                    this._clearTimeout();
                });
            }, duration);
        }

        _setLiveProgramInfo(programs) {
            //check for the program info
            if(programs) {
                //show the current program title
                this.tag("CurrentProgramTitle").setSmooth('alpha', 1);
                this.tag("CurrentProgramTitle").text.text = programs.current.title.toUpperCase();
                if(programs.next) {
                    //show the next program title
                    this.tag("NextProgram").setSmooth('alpha', 1);
                    this.tag("Title").text.text = programs.next.title.toUpperCase();
                } else {
                    //Hide the next program info
                    this.tag("NextProgram").setSmooth('alpha', 0);
                }
            } else { //Hide the program details
                this.tag("CurrentProgramTitle").setSmooth('alpha', 0);
                this.tag("NextProgram").setSmooth('alpha', 0);
            }
        }

       _clearTimeout() {
            clearTimeout(this._timerId);
       }

        _play(item, items) {
            this.fireAncestors('$play', {
                items: items,
                item: item
            }, true);
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this._load();
                    }
                    $exit() {
                        this.fireAncestors('$hideSplash');
                    }
                    _load() {
                        const api = this.fireAncestors('$getApi');
                        api.getLatestBulletins().then((data) => {
                            this._loadBulletins(data);
                        }).then(() => api.getLatestStories()).then((stories) => {
                            this._loadStories(stories);
                        }).catch(err => console.error(err));
                    }

                    _loadBulletins(data) {
                       this._views.LatestBulletins.items = data.map((el) => {
                            return {type: ImageItem, item: el};
                        });
                    }

                    _loadStories(data) {
                        this._views.LatestStories.items = data.map((el) => {
                            return {type: VideoItem, item: el};
                        });
                        this._setState("PrimaryItem");
                    }
                },
                class Idle extends this {

                    _focus() {
                        this._setState("PrimaryItem");
                    }

                },
                class PrimaryItem$$1 extends this {

                    $enter() {
                        this._views.PrimaryItem.transparent  = true;
                        this.fireAncestors('$playLive', "", true);
                    }

                    $exit() {
                        this._views.PrimaryItem.transparent  = false;
                        this.fireAncestors("$stopMinimizedPlayback");
                    }

                    _unfocus() {
                        this._setState("Idle");
                    }

                    _getFocused() {
                        return this._views.PrimaryItem;
                    }

                    _handleUp() {
                        this._setState("Idle");
                        return false;
                    }

                    _handleDown() {
                        this._setState("LatestBulletins");
                    }

                    _handleEnter() {
                        this.fireAncestors("$stopMinimizedPlayback");
                        this.fireAncestors('$playLive', this.tag("CurrentProgramTitle").text.text);
                    }
                },
                class LatestBulletins extends this {

                    _getFocused() {
                        return this._views.LatestBulletins;
                    }

                    _handleUp() {
                        this._setState("PrimaryItem");
                    }

                    _handleDown() {
                        this._setState("LatestStories");
                    }

                    _handleEnter() {
                        if (this.tag('LatestBulletins').active.item) {
                            this._play(this.tag('LatestBulletins').active.item, this.tag('LatestBulletins').items.map(item => item.item));
                        }
                    }

                },
                class LatestStories extends this {

                    $enter() {
                        this.patch({
                            smooth: {h: 938 + 350, y: -350}
                        });
                    }

                    $exit() {
                        this.patch({
                            smooth: {h: 938 , y: 0}
                        });
                    }

                    _getFocused() {
                        return this._views.LatestStories;
                    }

                    _handleUp() {
                        this._setState("LatestBulletins");
                    }

                    _handleEnter() {
                        if (this.tag('LatestStories').active.item) {
                            this._play(this.tag('LatestStories').active.item, this.tag('LatestStories').items.map(item => item.item));
                        }
                    }
                }
            ];
        }
    }

    TopStories.TEXTS = {
        channel: "LIVE",
        description: "International News 24/7 in French, English, Arabic and Spanish"
    };

    class Album extends lng.Component  {

        static _template() {
            return {
                PrimaryItem: {x: 100, y: 40, type: PrimaryItem},
                Logo: {x: 850, y: 40, alpha: 0},
                Flex: {
                    x: 850, y: 40,
                    flex: {
                        direction: 'column', justifyItems: 'flex-start'
                    },
                    Title: {
                        flexItem: {}, text: {fontFamily: 'OpenSans', fontSize: 44, maxLines: 3, wordWrapWidth: 900, lineHeight: 56}, color: 0xff101010
                    },
                    Date: {
                        flexItem: {}, text: {fontFamily: 'OpenSans', fontSize: 38}, color: 0xff606060
                    }
                },
                RemainingItems: {
                    type: List, x: 100, y: 500, itemSize: 415
                },
            };
        }

        set items(items) {
            this._items = items;
            this._setPrimaryItem(items[0]);
            this._setListItems(items.slice(1));
            this._setState("PrimaryItem");
        }

        _setPrimaryItem(item) {
            this.tag("PrimaryItem").imageUrl = item.getPicture(720);
            this.tag("Title").text.text = item.description || "";
            this.tag("Date").text.text = item.createdTime ? App.formatTime(item.createdTime) : '';
        }

        _setListItems(items) {
            this.tag("RemainingItems").items = items.map( el => {
                return {type: VideoItem, item: el}
            });
        }

        set logo(image) {
            if(image) {
                this.patch({
                    Logo: {
                        src: App.cropImage({url: image, w: 300, h: 100, type: 'auto'}),
                        alpha: 1
                    },
                    Flex: {
                        smooth: {y: 200}
                    }
                });
            } else {
                this.patch({
                    Logo: {
                        alpha: 0
                    },
                    Flex: {
                        smooth: {y: 40}
                    }
                });
            }
        }

        _play(item, items) {
            this.fireAncestors('$play', {
                items: items,
                item: item
            }, true);
        }

        static _states() {
            return [
                class PrimaryItem$$1 extends this {
                    _getFocused() {
                        return this.tag("PrimaryItem");
                    }

                    _handleDown() {
                        this._setState("RemainingItems");
                    }

                    _handleEnter() {
                        this._play(this._items[0], this._items);
                    }
                },
                class RemainingItems extends this {
                    _getFocused() {
                        return this.tag("RemainingItems");
                    }

                    _handleUp() {
                        this._setState("PrimaryItem");
                    }

                    _handleEnter() {
                        if (this.tag('RemainingItems').active.item) {
                            this._play(this.tag('RemainingItems').active.item, this._items);
                        }
                    }
                }
            ];
        }
    }

    class MostViewed extends lng.Component {

        static _template() {
            return {
                w: 1920, h: 938, rect: true, color: 0xfff4f8f7,
                Spinner: {x: 960, y:470, mount: 0.5, type: SpinningLogo, alpha: 0},
                Album: {type: Album, alpha: 0}
            };
        }

        _firstActive() {
            this._setState("Loading");
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.tag("Spinner").setSmooth('alpha', 1);
                        this._load();
                    }

                    $exit() {
                        this.tag("Spinner").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("Spinner");
                    }

                    _load() {
                        const api = this.fireAncestors('$getApi');
                        api.getMostViewed().then((data) => {
                            this._loaded(data);
                        }).catch(err => console.error(err));
                    }

                    _loaded(data) {
                        this.tag("Album").items = data;
                        this._setState("Album");
                    }

                },
                class Album$$1 extends this {
                    $enter() {
                        this.tag("Album").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("Album").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("Album");
                    }
                }
            ];
        }
    }

    class Grid extends lng.Component {
        static _template() {
            return {
                Items: {}
            };
        }

        _init() {
            this._index = 0;
            this._pageRow = 1;
        }

        /**
         * Sets the constructor of the grid item.
         * @param construct Grid item constructor. Must be a sub-class of GridItem.
         */
        set construct(construct) {
            this._construct = construct;
        }

        /**
         * Sets the number of items that can fit in a row based on the Gird width & item width.
         * @param itemsPerRow items in a row
         */
        set itemsPerRow(itemsPerRow) {
            this._itemsPerRow = itemsPerRow;
        }

        /**
         * Sets the number of rows that can fit in one page.
         * @warn This is not the total number of rows.
         * @param rowsPerPage items in a page
         */
        set rowsPerPage(rowsPerPage) {
            this._rowsPerPage = rowsPerPage;
        }

        /**
         * Resets the focus to the first item in the grid
         */
        resetFocus() {
            this._index = 0;
            this._pageRow = 1;
            this.patch({Items: {smooth: {y: 0}}});
        }

        set items(items) {
            this._items = items;
            this.tag("Items").children = items.map((item, index) => {
                return {
                    type: this._construct,
                    item: item,
                    x: (index % this._itemsPerRow) * this._construct.width,
                    y: Math.floor(index / this._itemsPerRow) * this._construct.height
                }
            });
        }

        _getRowId(index) {
            return Math.floor(index / this._itemsPerRow);
        }

        get items() {
            return this._items;
        }

        get active() {
            return this.tag("Items").children[this._index];
        }

        _select(index) {
            if(index < 0 || index > this._items.length - 1){
                return;
            }

            let prevRow = this._getRowId(this._index);
            let newRow = this._getRowId(index);
            this._index = index;

            if(prevRow === newRow) {
                return;
            }

            let yAxisShift;

            //handle key down
            if(prevRow < newRow) {
                //if the current row is maximum in the page, then shift y
                if(this._pageRow === this._rowsPerPage) {
                    yAxisShift = (newRow - (this._rowsPerPage - 1)) * this._construct.height * -1;
                } else {
                    this._pageRow++;
                }
            } else { //handle key up
                if(this._pageRow === 1) { //if the current row is minimum in the page, then shift y
                    yAxisShift = newRow * this._construct.height * -1;
                } else {
                    this._pageRow--;
                }
            }

            if(yAxisShift != undefined) {
                this.patch({Items: {smooth: {y: yAxisShift}}});
            }

        }

        _handleLeft() {
            const index = this._index;
            //allow the left navigation only if the item is not the first item in the row
            if (index % this._itemsPerRow !== 0) {
                this._select(index - 1);
            } else {
                return false;
            }
        }

        _handleRight() {
            const index = this._index;
            //allow the right navigation only if the item is not the last item in the row
            if(index % this._itemsPerRow !== (this._itemsPerRow - 1)) {
                this._select(index + 1);
            } else {
                return false;
            }
        }

        _handleUp() {
            let index = this._index;

            if (index - this._itemsPerRow >= 0) {
                index -= this._itemsPerRow;
            } else {
                this._index = 0;
                return false;
            }
            this._select(index);
        }

        _handleDown() {
            let index = this._index;
            if (index + this._itemsPerRow > this._items.length - 1) {
                index = this._items.length - 1;
            } else {
                index += this._itemsPerRow;
            }
            this._select(index);
        }

        _getFocused() {
            return this.active;
        }
    }

    class GridItem extends lng.Component{

        /**
         * Sub class must return the width of the grid item.
         * @returns {number} grid item width
         */
        static get width() {
            return 0;
        }

        /**
         * Sub class must return the height of the grid item.
         * @returns {number} grid item height
         */
        static get height() {
            return 0;
        }

    }

    class ImageItem$1 extends GridItem {
        static _template() {
            return {
                Image: {
                    w: 382, h: 217,
                    Picture: {w: 370, h: 205},
                    Border: {
                        alpha: 0,
                        Border: {type: lng.components.BorderComponent, borderWidth: 6, colorBorder: 0xff00a7e3, w: 370 , h: 205}
                    },
                },
                Title: {y: 215, text: {fontSize: 24, fontFamily: 'OpenSans', fontStyle: 'bold', maxLines: 1, wordWrapWidth: 300}, color: 0xff101010}
            };

        }

        static get width() {
            return 450;
        }

        static get height() {
            return 290;
        }

        set item(v) {
            this._item = v;

            this.patch({
                Image: {Picture: {src: App.cropImage({url: v.getPicture(388), w: 370, h: 205})}},
                Title: {
                    text: {text: v.title}
                }
            });
        }

        get item() {
            return this._item;
        }

        _focus() {
            this.patch({
                Image: {Border: {smooth: {alpha: 1}}, smooth: {scale: 1.03}},
                Title: {
                    color: 0xffff00a7e3
                }
            });
        }

        _unfocus() {
            this.patch({
                Image: {Border: {smooth: {alpha: 0}}, smooth: {scale: 1}},
                Title: {
                    color: 0xff101010
                }
            });
        }
    }

    class Shows extends lng.Component {

        static _template() {
            return {
                w: 1920, h: 938, rect: true, color: 0xfff4f8f7,
                Spinner: {x: 960, y:470, mount: 0.5, type: SpinningLogo},
                Shows: {x: 100, y: 40, type: Grid, construct: ImageItem$1, itemsPerRow: 4, rowsPerPage: 3, alpha: 0},
                ShowContent: {type: Album, alpha: 0}
            };
        }

        _init() {
            this._shows = new Map();
            this._showCategories = new Map();
        }

        _firstActive() {
            this._setState("Loading");
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.tag("Spinner").setSmooth('alpha', 1);
                        this._load();
                    }

                    $exit() {
                        this.tag("Spinner").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("Spinner");
                    }

                    _load() {
                        const api = this.fireAncestors('$getApi');
                        api.getShowCategories().then((data) => {
                            this._loaded(data);
                        }).catch(err => console.error(err));
                    }

                    _loaded(data) {
                        data.forEach(item => {
                            this._showCategories.set(item.nid, item);
                        });
                        this.tag("Shows").items = data;
                        this._setState("Shows");
                    }

                },
                class Shows extends this {
                    $enter() {
                        this.tag("Shows").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("Shows").setSmooth('alpha', 0);
                    }

                    _changedState({newState, prevState}, args) {
                        if(newState === "Shows" && prevState === "Shows.ShowContent" &&
                            args && args.reset) {
                            //reset the shows grid focus to first item
                            this.tag("Shows").resetFocus();
                        }
                    }

                    _handleEnter() {
                        this._selectedNid = this.tag("Shows").active.item.nid;
                        if(this._shows.get(this._selectedNid)) {
                            this._setState("Shows.ShowContent");
                        } else {
                            this._setState("Shows.Loading");
                        }
                    }

                    _getFocused() {
                        return this.tag("Shows");
                    }

                    static _states() {
                        return [
                            class Loading extends this {
                                $enter() {
                                    this.tag("Shows").setSmooth('alpha', 0);
                                    this.tag("Spinner").setSmooth('alpha', 1);
                                    this._load();
                                }

                                $exit() {
                                    this.tag("Spinner").setSmooth('alpha', 0);
                                }

                                _getFocused() {
                                    return this.tag("Spinner");
                                }

                                _load() {
                                    const api = this.fireAncestors('$getApi');
                                    api.getShows(this._selectedNid).then((data) => {
                                        this._loaded(data);
                                    }).catch(err => console.error(err));
                                }

                                _loaded(data) {
                                    this._shows.set(this._selectedNid, data);
                                    this._setState("Shows.ShowContent");
                                }
                            },
                            class ShowContent extends this {
                                $enter() {
                                    this.tag("Shows").setSmooth('alpha', 0);
                                    this.tag("ShowContent").items = this._shows.get(this._selectedNid);
                                    this.tag("ShowContent").logo = this._showCategories.get(this._selectedNid).headerImage;
                                    this.tag("ShowContent").setSmooth('alpha', 1);
                                }

                                $exit() {
                                    this.tag("ShowContent").setSmooth('alpha', 0);
                                    this.tag("Shows").setSmooth('alpha', 1);
                                }

                                _inactive() {
                                    this._setState("Shows", [{reset: true}]);
                                }

                                _handleBack() {
                                    this._setState("Shows");
                                }

                                _getFocused() {
                                    return this.tag("ShowContent");
                                }
                            }
                        ];
                    }
                }
            ];
        }
    }

    class Scrollbar extends lng.Component {

        constructor(stage) {
            super(stage);
            this._direction = 'vertical';
            this._colors = {
                background : 0xffd8d8d8,
                scrollerFocused : 0xff00a7e3,
                scrollerUnfocused : 0xff606060
            };
        }

        static _template() {
            return {
                Background: {
                    h: h=>h, w: w=>w, rect: true, color: 0xffd8d8d8
                },
                Scroller: {
                    h: h=>h, w: w=>w, rect: true,
                }
            };
        }

        _init() {
            this._setState("Inactive");
        }

        /**
         * Set the scroll bar direction.
         * @param v vertical or horizontal
         */
        set direction(v) {
            this._direction = v;
        }

        /**
         * Set the required colors for the scroll bar.
         * @param background scroll bar color
         * @param scrollerFocused scroller color when focused
         * @param scrollerUnfocused scroller color when it is out of focus
         */
        set colors({background = null, scrollerFocused = null, scrollerUnfocused = null}) {
            this._colors.background = background || this._colors.background;
            this._colors.scrollerFocused = scrollerFocused || this._colors.scrollerFocused;
            this._colors.scrollerUnfocused = scrollerUnfocused || this._colors.scrollerUnfocused;

            this.tag("Background").patch({color: this._colors.background});
        }

        /**
         * Set the view sizes to which you want to apply scrolling.
         * @param visible view visible size
         * @param total view total size
         */
        set sizes({visible , total}) {
            this._visibleSize = visible;
            this._totalScrollSize = total;

            //current scroller position
            this._scrollerPosition = 0;

            //number of scrolls possible with scrolling only 80% of the view every time
            this._totoalScrolls = this._totalScrollSize / (0.8 * this._visibleSize);

            //scroller height
            this._scrollerSize = this._scrollbarTotalSize / this._totoalScrolls;

            let scrollerSizeProperty = this._direction === 'vertical' ? 'h' : 'w';
            this.tag("Scroller").patch({smooth: {[scrollerSizeProperty]: this._scrollerSize}});

            this._apply();
        }

        get _scrollbarTotalSize() {
            return this.tag("Background")[this._direction === 'vertical' ? 'finalH' : 'finalW'];
        }

        get _scrollbarStart() {
            return this.tag("Background")[this._direction === 'vertical' ? 'finalY' : 'finalX'];
        }

        get _scrollerStartPosition() {
            return this._scrollbarStart + (this._scrollerPosition * this._scrollerSize);
        }

        get _viewStartPosition() {
            return ((Math.floor(this._totalScrollSize / this._totoalScrolls)) * this._scrollerPosition) * -1;
        }

        get _axis() {
            return this._direction === 'vertical' ? 'y' : 'x';
        }

        _handleNext() {
            let scrollerPosition = this._scrollerPosition;
            if(this._scrollerPosition < this._totoalScrolls - 1) {
                scrollerPosition++;
                if(scrollerPosition > this._totoalScrolls - 1) {
                    scrollerPosition = scrollerPosition - (scrollerPosition - (this._totoalScrolls -1));
                }
                this._scrollerPosition = scrollerPosition;
                this._apply();
            } else {
                return false;
            }

        }

        _handlePrevious() {
            if(this._scrollerPosition > 0) {
                this._scrollerPosition--;
                this._scrollerPosition = this._scrollerPosition < 0 ? 0 : this._scrollerPosition;
                this._apply();
            } else {
                return false;
            }
        }

        _apply() {
            let scrollerStart = this._scrollerStartPosition;
            let viewStart = this._viewStartPosition;
            let axis  = this._axis;

            this.tag("Scroller").patch({smooth: {[axis]: scrollerStart}});
            this.signal('scrollTo', viewStart );
        }

        static _states() {
            return [
                class Inactive extends this {
                    $enter() {
                        this.patch({
                            Scroller: {color: this._colors.scrollerUnfocused}
                        });
                    }

                    _focus() {
                        this._setState("Active");
                    }

                },
                class Active extends this {
                    $enter() {
                        this.patch({
                            Scroller: {color: this._colors.scrollerFocused}
                        });
                    }

                    _unfocus() {
                        this._setState("Inactive");
                    }

                    _handleDown() {
                        if(this._direction === 'vertical') {
                            return this._handleNext();
                        } else {
                            return false;
                        }
                    }

                    _handleUp() {
                        if(this._direction === 'vertical') {
                            return this._handlePrevious();
                        } else {
                            return false;
                        }
                    }

                    _handleRight() {
                        if(this._direction !== 'vertical') {
                            return this._handleNext();
                        } else {
                            return false;
                        }
                    }

                    _handleLeft() {
                        if(this._direction !== 'vertical') {
                            return this._handlePrevious();
                        } else {
                            return false;
                        }
                    }

                }
            ];
        }

    }

    class About extends lng.Component {

        static _template() {
            return {
                w: 1920, h: 938, rect: true, color: 0xfff4f8f7,
                Publisher: {
                    x: 150, y: 100,
                    Title: {
                        text: {text: About.TEXTS.publisher.title, fontFamily: 'OpenSans', fontStyle: 'bold', fontSize: 32, lineHeight: 43},
                        color: 0xff101010
                    },
                    Description: {
                        y: 70, w: 600,
                        flex: {direction: "column"}
                    }
                },
                Terms: {
                    x: 850, y: 100, w: 800,
                    Title: {
                        text: {text: About.TEXTS.terms_conditions.title, fontFamily: 'OpenSans', fontStyle: 'bold', fontSize: 32, lineHeight: 43},
                        color: 0xff101010
                    },
                    Clipper: {
                        y: 70, w: 800, h: 780, clipping: true,
                        Description: {
                            w: 800,
                            flex: {direction: "column", justifyItems: "flex-start"}
                        }
                    }
                },
                Scrollbar: {
                    x: 1760, y: 100, w: 10, h: 720, type: Scrollbar, signals : {'scrollTo': true}
                }
            }
        }

        _init() {
            this._frameListener = () => {
                let newHeight = this.tag("Terms.Clipper.Description").finalH;
                if(newHeight !== this._termsTotalHeight) {
                    this._termsTotalHeight = newHeight;
                    this._termsVisibleHeight = this.tag("Terms.Clipper").finalH;
                    this._setScrollerSizes();
                }
            };

            this._setState("");

            //add publisher description
            this.tag("Publisher.Description").children = About.TEXTS.publisher.description.map((item, index) => {
                return {
                    flexItem: {marginTop: (index === 0) ? 0 : 30},
                    text: {text: item.text, fontFamily: 'OpenSans', fontSize: 22, lineHeight: 40, wordWrapWidth: 550}, color: 0xff606060};
            });

            //add terms & conditions description
            let termsChildren = [];
            About.TEXTS.terms_conditions.description.forEach((item, blockIndex) => {
                item.block.forEach((item, itemIndex) => {
                    let marginTop = (blockIndex === 0 && itemIndex === 0) ? 0 : (itemIndex === 0) ? 50 : 30;
                    termsChildren.push({
                        flexItem: {marginTop: marginTop},
                        text: {text: item.text, fontFamily: 'OpenSans', fontSize: 22, lineHeight: 40, wordWrapWidth: 750}, color: 0xff606060});
                });
            });
            this.tag("Terms.Clipper.Description").children = termsChildren;
        }

        _setScrollerSizes() {
            this.tag("Scrollbar").sizes = {visible: this._termsVisibleHeight, total: this._termsTotalHeight};
        }

        _active() {
            this.stage.on('frameStart', this._frameListener);
            this._setState("Active");
        }

        _inactive() {
            this.stage.removeListener('frameStart', this._frameListener);
            this._setState("");
        }

        static _states() {
            return [
                class Active extends this {
                    _getFocused() {
                        return this.tag("Scrollbar");
                    }

                    scrollTo(position) {
                        this.tag("Terms.Clipper.Description").patch({smooth : {y: position}});
                    }

                }
            ];
        }

    }

    About.TEXTS = {
        publisher: {
            title: "PUBLISHER",
            description: [
                {text: "France Médias Monde\n" +
                        "Public limited company governed by the law of France\n" +
                        "With registered capital of 23 045 660 euros \n" +
                        "Registration number: RCS Nanterre - 501 524 029 \n" +
                        "Registered Office: 80, rue Camille Desmoulins \n" +
                        "92130 Issy Les Moulineaux\n" +
                        "France"},
                {text: "France 24 Head Office: 80 rue Camille Desmoulins, 92130 Issy Les Moulineaux, France\n" +
                        "Editor-in-Chief: Marie-Christine Saragosse"}
            ]
        },
        terms_conditions: {
            title: "FRANCE 24 TERMS AND CONDITIONS",
            description: [
                { block: [
                    {text: 'Persons making use of the France 24 application ("Users" and the "Application") shall ' +
                            'automatically be deemed to accept these Conditions of Use. The term "Use" refers without ' +
                            "distinction to any consultation, research or download carried out on the Site."},
                    {text: "France 24 may amend the Conditions of Use at any time without prior notice in order to adapt " +
                            "them to changes in the Application or to changes in current laws and regulations. " +
                            "Consequently, Users are advised to refer to them as regularly as possible."},
                    ]
                },
                { block: [
                    {text: "INTELLECTUAL PROPERTY RIGHTS"},
                    {text: "France 24 Content"},
                    {text: "Copyright © France 24 - All reproduction and representation rights reserved."},
                    {text: "The content of the Application belongs to France 24 and is protected by current legislation " +
                            "concerning intellectual property rights and applicable international conventions. " +
                            'The term "content" means all the information present on the Application such as data, text, ' +
                            "graphics, images, sounds, videos, logos, symbols and HTML code and which is published by France 24."},
                    {text: "Subject to any limitations provided by laws and regulations in France, any reproduction or " +
                            "representation of the Application, whether in whole or in part, shall be subject to the prior " +
                            "authorization of France 24. Such authorization shall be granted at France 24's sole discretion " +
                            "and no reasons for its decision need be given."},
                    {text: "France 24 is a registered trademark, reference to which is authorized. References to the " +
                            "France 24 trademark on a third party site do not imply any warranty or responsibility on the " +
                            "part of France 24 as to the content of that third party site or the use to which it may be put."},
                    {text: "Agence France-Presse (AFP) Content"},
                    {text: "Copyright © Agence France-Presse - All reproduction and representation rights reserved."},
                    {text: 'Where the words "© AFP" appear on a page of the Application, that page contains reproduced ' +
                            "information which is protected by AFP's intellectual property rights. Consequently, " +
                            "none of this information can be reproduced, modified, redistributed, translated or used or " +
                            "re-used commercially without AFP's prior written agreement. AFP shall not be liable for " +
                            "any delays, errors or omissions which may occur, or for the consequences of any action taken " +
                            "or transactions entered into on the basis of such information."},
                    ]
                },
                { block: [
                    {text: "USER'S OBLIGATIONS"},
                    {text: "Use of the service"},
                    {text: "Users undertake to use discretion when consulting the Application, particularly when relying " +
                            "on the appropriateness, utility or completeness of the Content. Users are solely responsible " +
                            "for any personal use made of the Content."},
                    {text: "Statements made and data and information provided to France 24 by Users at the time of " +
                            "registration are communicated at the Users' sole risk."},
                    {text: "In general, Users undertake to refrain from any malicious Use intended to disrupt or harm " +
                            "the Application and/or France 24 or its partners, or the programs of France 24 and its partners."},
                    {text: "Stock data provided by France Médias Monde are communicated at the users' sole risk, data can " +
                            "only be used for user's own personal and non-commercial use and may not be used as the basis for a financial instrument."},
                    {text: "Warranties and Liabilities"},
                    {text: "The Content of the Application is provided “as is” without any warranty of any kind whether " +
                            "express or implied other than as provided by current law, and in particular without any " +
                            "warranty that the Content meets the needs of the User or that the Content is up to date."},
                    {text: "Although France 24 makes every effort to provide reliable, it does not guarantee that it is " +
                            "free of inaccuracies, typographical errors, omissions and/or viruses. France 24 reserves the " +
                            "right at any time and without prior notice to make improvements and/or amendments to the Content of the Application."},
                    {text: "Warning concerning Minors"},
                    {text: "Any User that is a natural person and a minor must confirm and acknowledge that he/she has " +
                            "been authorized to use the Application by his/her parent(s) or guardian(s), and such parent(s) " +
                            "or guardian(s) agree to guarantee that when the minor concerned uses the Application, he/she " +
                            "complies with all the provisions of the Conditions of Use."},
                    {text: "For this reason, the parent(s) or guardian(s) of minors are asked to supervise the Use of " +
                            "the Application made by such minors, and to bear in mind that the Application is intended " +
                            "for a wide audience and that in their capacity as legal guardian(s) it is their responsibility " +
                            "to decide whether the Web is or is not appropriate for such minors and to supervise their use of it. " +
                            "For more information about parental control for the protection of minors, France 24 recommends " +
                            "that parents or guardians contact their internet service provider."},
                    {text: "Applicable law - Independence of Clauses"},
                    {text: "These Conditions of Use will be subject to and interpreted in accordance with French law. " +
                            "Any dispute which cannot be resolved by agreement will be referred to the courts of Nanterre. " +
                            "In the event that any of the provisions of the Conditions of Use is held to be null or void, " +
                            "the remaining provisions will automatically be deemed to apply."},
                    {text: "Failure by France 24 to apply, or to claim the application of, any of the provisions of the " +
                            "Conditions of Use or of any right of any kind shall not in any circumstances be interpreted " +
                            "as a waiver of that provision or that right on the part of France 24, unless France 24 agrees otherwise in writing."}
                    ]
                }
                ]
        }
    };

    class Content extends lng.Component {

        static _template() {
            return {
                TopStories: {type: TopStories, alpha: 0},
                MostViewed: {type: MostViewed, alpha: 0},
                Shows: {type: Shows, alpha: 0},
                About: {type: About, alpha: 0}
            };
        }

        _init() {
            this._mapping = {
                "TOP STORIES": 'TopStories',
                "MOST VIEWED": 'MostViewed',
                "SHOWS": 'Shows',
                "ABOUT": 'About'
            };

            this._setState("TopStories");
        }

        select(view) {
            if(this._mapping.hasOwnProperty(view)) {
                this._setState(this._mapping[view]);
            }
        }

        static _states() {
            return [
                class TopStories$$1 extends this {

                    $enter() {
                        this.tag("TopStories").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("TopStories").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("TopStories");
                    }
                },
                class MostViewed$$1 extends this {

                    $enter() {
                        this.tag("MostViewed").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("MostViewed").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("MostViewed");
                    }
                },
                class Shows$$1 extends this {

                    $enter() {
                        this.tag("Shows").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("Shows").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("Shows");
                    }
                },
                class About$$1 extends this {

                    $enter() {
                        this.tag("About").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("About").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("About");
                    }
                }
            ];
        }

    }

    class Main extends lng.Component {

        static _template() {
            return {
                Content: {x:0, y:142, w: w=>w, type: Content},
                Header: {type: Header}
            };
        }

        _init() {
            this._setState("Content");
        }

        static _states() {
            return [
                class Header$$1 extends this {
                    _getFocused() {
                        return this.tag("Header");
                    }

                    $select(item) {
                        this._setState("Content");
                        this.tag("Content").select(item);
                    }

                    _handleDown() {
                        this._setState("Content");
                    }
                },
                class Content$$1 extends this {
                    _getFocused() {
                        return this.tag("Content");
                    }

                    _handleUp() {
                        this._setState("Header");
                    }
                }
            ];
        }
    }

    class MediaItem {
        constructor() {
        }

        set title(title) {
            this._title = title;
        }

        get title() {
            return this._title;
        }

        set description(description) {
            this._description = description;
        }

        get description() {
            return this._description;
        }

        set pictures(pictures) {
            this._pictures = pictures;
        }

        get pictures() {
            return this._pictures;
        }

        set headerImage(url) {
            this._header_image = url;
        }

        get headerImage() {
            return this._header_image;
        }

        set videos(videos) {
            this._videos = videos;
        }

        get videos() {
            return this._videos;
        }

        set createdTime(createdTime) {
            this._createdTime = createdTime ? parseInt(createdTime) || 0 : 0;
        }

        get createdTime() {
            return this._createdTime;
        }

        set nid(nid) {
            this._nid = nid;
        }

        get nid() {
            return this._nid;
        }

        /**
         * Get a picture that matches a certain width or height
         * @param w
         * @param h
         * @returns {*}
         */
        getPicture(w = null, h = null) {
            let pictures = this._pictures;

            if (!pictures.length) {
                return false;
            }
            if (!w && !h) {
                return pictures[0];
            } else {
                const val = w ? w : h;
                const match = pictures.filter(p => p[w ? 'width' : 'height'] === val);

                if (match.length) {
                    return match[0].url;
                } else {
                    return pictures[0].url;
                }
            }
        }

        get video() {
            return this.videos[0].url;
        }

        getMediaplayerItem() {
            return this._mediaplayerItem ? this._mediaplayerItem :
                this._mediaplayerItem = {title: this.title, description: this.description, stream: {link: this.video}}
        }

        /**
         * Constructs a Media item object from the given news bulletin item.
         *
         * @param channel {object} bulletin item.
         * @returns {MediaItem} Media item
         */
        static fromBulletinItem(channel) {
            let mediaItem = new MediaItem();
            mediaItem.title = channel.title;
            mediaItem.pictures = MediaItem._getPictures(channel.images.formats);
            mediaItem.videos = channel.videos[0].formats;
            return mediaItem;
        }

        /**
         * Constructs a Media item object from the given show category.
         *
         * @param show {object} show category item
         * @returns {MediaItem} Media item
         */
        static fromShowCategoryItem(show) {
            let mediaItem = new MediaItem();
            mediaItem.title = show.title;
            mediaItem.nid = show.nid;
            mediaItem.pictures = MediaItem._getPictures(show.images.formats);
            mediaItem.headerImage = MediaItem._getHeaderImage(show);
            return mediaItem;
        }

        /**
         * Constructs a Media item object from the given show content item.
         *
         * @param show {object} show content item
         * @returns {MediaItem} Media item
         */
        static fromShowContentItem(show) {
            let mediaItem = new MediaItem();
            mediaItem.title = show.surtitle;
            mediaItem.description = show.title;
            mediaItem.createdTime = show.created;
            mediaItem.pictures = MediaItem._getPictures(show.images.formats);
            mediaItem.videos = Api.filterMP4(show.videos[0].formats);
            return mediaItem;
        }

        /**
         * Constructs a Media item object from the given most viewed item.
         *
         * @param mostViewed {object} most viewed item
         * @returns {MediaItem} Media item
         */
        static fromMostViewedItem(mostViewed) {
            let mediaItem = new MediaItem();
            mediaItem.title = mostViewed.title;
            mediaItem.description = mostViewed.title;
            mediaItem.createdTime = mostViewed.created;
            mediaItem.pictures = MediaItem._getPictures(mostViewed.images.formats);
            mediaItem.videos = Api.filterMP4(mostViewed.formats);
            return mediaItem;
        }

        static _getPictures(formats) {
            return formats.map(format => {
                let dimensions = format.code.split('x');
                let w = 0, h = 0;
                if(dimensions.length == 2) {
                    w = parseInt(dimensions[0]);
                    h = parseInt(dimensions[1]);
                }
                return {width: w, height: h, url: format.url}
            }).sort((a,b) => b.width - a.width);
        }

        static _getHeaderImage(show) {
            if(show.header_images && show.header_images.formats &&
                show.header_images.formats.length) {
                return show.header_images.formats.filter(format => format.code === 'original')[0].url;
            }
            return "";
        }

    }

    class Api {

        constructor() {

            this._keys = {
                token: 'c7d743bf-dff4-4884-8038-18056c1f7380'
            };

           this._endpoints = {
                primaryFeed: `http://f24hls-i.akamaihd.net/hls/live/221147/F24_EN_HI_HLS/master.m3u8?hdnts=exp=1609455599~acl=/hls/live/*/F24_EN_HI_HLS/*~id=metrological~hmac=c5e66cd72896ac906d5f5b7856666d4730fcdb1879c787fb5357fceb5bc2a63f`,
                livePrograms: `http://apis.france24.com/products/get_product/fe445440-7537-11e8-87cc-005056a945c4?token_application=${this._keys.token}`,
                latestBulletins: `http://apis.france24.com/products/get_product/ott_last_news_en?token_application=${this._keys.token}`,
                latestStories: `http://apis.france24.com/products/get_product/b5f278ea-73d2-11e8-9e7f-005056a945c4?token_application=${this._keys.token}`,
                showCategories: `http://apis.france24.com/products/get_product/a2332ae0-88d3-43df-9c48-c9d9e1f6e5ef?token_application=${this._keys.token}`,
                showContent: `http://api2.france24.com/products/get_product/9e99dde9-c93b-4e6e-8266-d3eb66919d1e?token_application=${this._keys.token}`,
                mostViewed: `http://apis.france24.com/products/get_product/7750926a-b695-11e8-9e60-005056bf3e3d?token_application=${this._keys.token}`,
                liveTvPrograms: `http://apis.france24.com/products/get_product/fe445440-7537-11e8-87cc-005056a945c4?token_application=${this._keys.token}`
            };

        }

        _send(url) {
            return fetch(url).then(r => r.json());
        }

        /**
         * Returns the primary feed of the live tv.
         * @returns {string} primary feed of the live tv
         */
        getPrimaryFeed() {
            return this._endpoints.primaryFeed;
        }

        /**
         * Returns a promise to fetch the latest news bulletins.
         *
         * @returns {Promise}
         */
        getLatestBulletins() {
            return this._send(this._endpoints.latestBulletins).then((data) => {
                if(data.result == null || data.result == undefined) {
                    return Promise.reject('Get latest news bulletins returned no data');
                }
                let channels = data.result.channels;
                if (!channels.length) {
                    return Promise.reject('Get latest news bulletins returned no data');
                }

                let hasImage = item => {
                    return item.images && item.images.formats && item.images.formats.length;
                };

                let hasVideo = item => {
                    return item.videos && item.videos.length &&
                        item.videos[0].formats && item.videos[0].formats.length && item.videos[0].formats[0].code !== 'hls_secure';
                };

                return Promise.resolve(channels.filter(item => (hasImage(item) && hasVideo(item)))
                        .map(channel => MediaItem.fromBulletinItem(channel))
                );
            });
        }

        /**
         * Returns a promise to fetch the list of most viewed shows.
         *
         * @returns {Promise}
         */
        getMostViewed() {
            return this._send(this._endpoints.mostViewed).then((data) => {
                if(data.result == null || data.result == undefined) {
                    return Promise.reject('Get most viewed returned no data');
                }
                let list = data.result.list;
                if (!list.length) {
                    return Promise.reject('Get most viewed returned no data');
                }

                let hasImage = item => {
                    return item.images && item.images.formats && item.images.formats.length;
                };

                let hasVideo = item => {
                    return item.formats && item.formats.length && Api.filterMP4(item.formats).length;
                };

                return Promise.resolve(list.filter(item => (hasImage(item) && hasVideo(item)))
                    .map(item => MediaItem.fromMostViewedItem(item))
                );
            });
        }

        /**
         * Returns a promise to fetch the latest stories.
         * @returns {Promise}
         */
        getLatestStories() {
            return this._getShowContent(this._endpoints.latestStories)
        }

        /**
         * Returns a promise to fetch the list of show categories
         *
         * @returns {Promise}
         */
        getShowCategories() {
            return this._send(this._endpoints.showCategories).then((data) => {
                if (data.result == null || data.result == undefined) {
                    return Promise.reject('Get show categories returned no data');
                }
                let shows = data.result.list;
                if (!shows.length) {
                    return Promise.reject('Get show categories returned no data');
                }

                let hasImage = item => {
                    return item.images && item.images.formats && item.images.formats.length;
                };

                return Promise.resolve(shows.filter(item => hasImage(item))
                    .map(show => MediaItem.fromShowCategoryItem(show))
                );
            });
        }

        /**
         * Returns a promise to fetch the list of videos available for a show category.
         * @param nid nid of the show
         * @returns {Promise}
         */
        getShows(nid) {
            return this._getShowContent(`${this._endpoints.showContent}&nid=${nid}`)
        }


        _getShowContent(url) {
            return this._send(url).then((data) => {
                if (data.result == null || data.result == undefined) {
                    return Promise.reject('Get show content returned no data');
                }
                let shows = data.result.list;
                if (!shows.length) {
                    return Promise.reject('Get show content returned no data');
                }

                let hasImage = item => {
                    return item.images && item.images.formats && item.images.formats.length;
                };

                let hasVideo = item => {
                    return item.videos && item.videos.length && item.videos[0].formats
                        && item.videos[0].formats.length && Api.filterMP4(item.videos[0].formats).length;
                };

                return Promise.resolve(shows.filter(item => (hasImage(item) && hasVideo(item)))
                    .map(show => MediaItem.fromShowContentItem(show))
                );
            });
        }

        static filterMP4(formats) {
            return formats.filter(item => {
                return item.code === 'MP4';
            });
        }

        /**
         * Returns a promise to fetch the current & next live programs.
         * @returns {Promise}
         */
        getLivePrograms() {
            return this._send(this._endpoints.liveTvPrograms).then((data) => {
                if (!data.result || !data.result.content ||
                    !data.result.content.program_guide || !data.result.content.program_guide.length ||
                    !data.result.content.program_guide[0].schedule || !data.result.content.program_guide[0].schedule.length ||
                    !data.result.content.starting_date ) {
                    return Promise.reject('Get live program returned no data');
                }

                //get the date from the starting date
                let programDate = data.result.content.starting_date.split('T')[0];

                let schedule = data.result.content.program_guide[0].schedule;
                let programs = [];

                //create programs with start time & end time
                for(let index = 0; index < schedule.length - 1; index++) {
                    //time stamps are in Central European Standard Time
                    let start_time = Date.parse(`${programDate}T${schedule[index].start_at}+01:00`);
                    let end_time = Date.parse(`${programDate}T${schedule[index + 1].start_at}+01:00`);

                    programs.push({
                        title: schedule[index].program_label || schedule[index].type,
                        start_time: start_time,
                        end_time: end_time
                    });
                }

                //current time
                let currentTime = Date.now();

                //Find out the current & next programs from the available
                for(let index = 0; index <= programs.length - 1; index++) {
                    if(currentTime >= programs[index].start_time && currentTime < programs[index].end_time) {
                        return Promise.resolve({current: programs[index],
                            next: index === programs.length -1 ? null : programs[index + 1]});
                    }
                }

                return Promise.resolve();
            });
        }

    }

    class PlayerButton extends lng.Component {

        static _template() {
            return {
                w: 68, h: 68,
                Icon: {x: 34, y:34, mount : 0.5 , w: 68, h: 68}
            };
        }

        set icon(icon) {
            this._icon = icon;
            let color = this._focused ? this.colors.focused : this._isActive ? this.colors.enabled : this.colors.disabled;
            this.tag("Icon").patch({src: icon, color: color});
        }

        set active(v) {
            this._isActive = v;
            let color = v ? (this._focused ? this.colors.focused : this.colors.enabled) : this.colors.disabled;
            this.tag("Icon").patch({smooth: {color: color}});
        }

        get active() {
            return this._isActive;
        }

        static _states() {
            return [
                class Selected extends this {
                    $enter() {
                        this.tag("Icon").patch({smooth: {color: this.colors.focused}});
                    }
                    $exit() {
                        let color = this._isActive ? this.colors.enabled : this.colors.disabled;
                        this.tag("Icon").patch({smooth: {color: color}});
                    }
                }
            ]
        }

        _focus() {
            this._focused = true;
            this._setState("Selected");
        }

        _unfocus() {
            this._focused = false;
            this._setState("");
        }

        get colors() {
            return {
                disabled: 0xffe7e4e4 ,
                enabled: 0xff909090 ,
                focused: 0xff00a7e3
            };
        }

    }

    class PlayerControls extends lng.Component {

        static _template() {
            return {
                RootFlex: {
                    flex: {direction: 'row'},
                    Buttons: {
                        flexItem: {},
                        flex: {direction: 'row', justifyItems: 'flex-start'},
                        Previous: {
                            flexItem: {},
                            type: PlayerButton, icon: App.getPath('images/rewind.png')
                        },
                        Play: {
                            flexItem: {marginLeft: 20},
                            type: PlayerButton, icon: App.getPath('images/pause.png')
                        },
                        Next: {
                            flexItem: {marginLeft: 20},
                            type: PlayerButton, icon: App.getPath('images/forward.png')}
                    },
                    Metadata: {
                        flexItem: {marginLeft: 50},
                        TitleFlex: {
                            y: 12,
                            flex: {direction: "row", justifyItems: "flex-start"},
                            Title: {flexItem: {},
                                text: {fontSize: 32, maxLines: 1, wordWrapWidth: 846, fontFamily: "OpenSans", fontStyle: "bold"}, color: 0xff101010,
                            },
                            Duration: {flexItem: {marginTop: 7, marginLeft: 15},
                                text: {fontSize: 24, fontFamily: "OpenSans", fontStyle: "bold"}, color: 0xff909090}
                        },
                        Description: {
                            y: 40,
                            text: {fontSize: 28, maxLines: 1, wordWrapWidth: 896, fontFamily: "OpenSans", fontStyle: "bold"}, color: 0xff101010}
                    }
                }
            };
        }

        showButtons(previous, next) {
            this._showButtons(previous, next);
        }

        set title(title) {
            this.tag("Title").text = (title || "");
        }

        set description(description) {
            if(description) {
                this.tag("TitleFlex").patch({smooth: {y: -8}});
            } else {
                this.tag("TitleFlex").patch({smooth: {y: 12}});
            }
            this.tag("Description").text = description || "";
        }

        set duration(duration) {
            this.tag("Duration").text = Math.floor(duration / 60) === 0 ? "" : Player.formatTime(duration);
        }

        get duration() {
            return this.tag("Duration").text.text;
        }

        set mode(mode) {
            if(mode === Player.MODES.RECORDED) {
                //TODO Check whether there is any way to force call the $enter of a state.
                this._setState("");
                this._setState("Recorded");
            } else {
                this._setState("Live");
            }
        }

        set paused(v) {
            this.tag("Play").icon = v ? App.getPath('images/play.png') : App.getPath('images/pause.png');    }

        _changedState({newState}) {
            this.tag("Previous").visible = newState === "Live" ? false : true;
            this.tag("Next").visible = newState === "Live" ? false : true;
            this.tag("Duration").setSmooth('alpha', newState === "Live" ? 0 : 1);
            this.tag("Description").setSmooth('alpha', newState === "Live" ? 0.5 : 1);
        }

        static _states() {
            return [
                class Recorded extends this {

                    $enter() {
                        this._setState("Recorded.Play");
                        this.showButtons(false, false);
                    }

                    _showButtons(previous, next) {
                        let buttons = [];
                        if (previous) buttons.push("Previous");
                        buttons = buttons.concat("Play");
                        if (next) buttons.push("Next");
                        this._setActiveButtons(buttons);
                    }

                    get _activeButtonIndex() {
                        let button = this.tag("Buttons").getByRef(this._getViewRef(this._getState()));
                        if (!button.active) {
                            button = this.tag("Play");
                        }
                        return this._activeButtons.indexOf(button);
                    }

                    get _activeButton() {
                        return this._activeButtons[this._activeButtonIndex];
                    }

                    _setActiveButtons(buttons) {
                        this._activeButtons = [];
                        this.tag("Buttons").children.map(button => {
                            button.active = (buttons.indexOf(button.ref) !== -1);
                            if (button.active) {
                                this._activeButtons.push(button);
                            }
                        });

                        this._checkActiveButton();
                    }

                    _checkActiveButton() {
                        // After changing the active buttons, make sure that an active button is selected.
                        let index = this._activeButtonIndex;
                        if (index === -1) {
                            if (this._index >= this._activeButtons.length) {
                                this._index = this._activeButtons.length - 1;
                            }
                        }
                        this._setState("Recorded." + this._activeButtons[index].ref);
                    }

                    _handleLeft() {
                        let index = this._activeButtonIndex;
                        if (index > 0) {
                            index--;
                        }
                        this._setState("Recorded." + this._activeButtons[index].ref);
                    }

                    _handleRight() {
                        let index = this._activeButtonIndex;
                        if (index < this._activeButtons.length - 1) {
                            index++;
                        }
                        this._setState("Recorded." + this._activeButtons[index].ref);
                    }

                    _handleEnter() {
                        this.signal('press' + this._activeButton.ref);
                    }

                    _getFocused() {
                        return this.tag(this._getViewRef(this._getState()));
                    }

                    _getViewRef(state) {
                        return state.split('.')[1];
                    }

                    static _states() {
                        return [
                            class Previous extends this {
                            },
                            class Play extends this {
                            },
                            class Next extends this {
                            }
                        ];
                    }
                },
                class Live extends this {

                    _handleEnter() {
                        this.signal('pressPlay');
                    }

                    _getFocused() {
                        return this.tag("Play");
                    }

                }
            ];
        }

    }

    class PlayerProgress extends lng.Component {

        static _template() {
            return {
                Progress: {
                    Total: {
                        texture: lng.Tools.getRoundRect(1260, 10, 0), color: 0xffb2b2b2
                    },
                    Active: {color: 0xff00a7e3},
                }
            };
        }

        set _progress(v) {
            const now = Date.now();
            let estimation = 0;
            if (!this._last || (this._last < now - 1000)) {
                estimation = 500;
            } else {
                estimation = now - this._last;
            }
            this._last = now;
            const x = v * 1260;

            estimation *= 0.001;
            this.tag("Total").setSmooth('x', x, {timingFunction: 'linear', duration: estimation});
            this.tag("Total").setSmooth('texture.x', x, {timingFunction: 'linear', duration: estimation});
            this.tag("Active").setSmooth('texture.w', Math.max(x, 0.0001) /* force clipping */, {
                timingFunction: 'linear',
                duration: estimation
            });
        }

        setProgress(currentTime, duration) {
            this._progress = currentTime / Math.max(duration, 1);
        }

        _init() {
            this.tag("Active").texture = {
                type: lng.textures.SourceTexture,
                textureSource: this.tag("Total").texture.source
            };
        }

    }

    class Player extends lng.Component {

        static _template() {
            return {
                zIndex: 99,
                Background: {
                    x: 330, y: 932, h: 113, w: 1260, color: 0xfff3f7f5, rect: true
                },
                Controls: {
                    x: 360, y: 956, type: PlayerControls, signals: {pressPlay: true, pressPrevious: true, pressNext: "_pressNext"}
                },
                Progress: {
                    x: 329, y: 1044, type: PlayerProgress
                }
            };
        }

        _init() {
            this._api = this.fireAncestors('$getApi');
        }

        /**
         * Plays the given recorded video play list.
         * @param item first item to be played
         * @param items playlist
         * @returns {boolean}
         */
        play({item, items}) {
            this._items = items;
            this._item = item;
            this._setState("Fullscreen.Recorded");
            return this._play();
        }

        /**
         * Plays the live streaming.
         * @param minimized true to indicate the player should play in window mode.
         * @returns {boolean}
         */
        playLive(title, minimized) {
            const api = this.fireAncestors('$getApi');
            this._item = {title: title, description: 'Live', stream : {link: api.getPrimaryFeed()}};
            if(minimized) {
                this._setState("Minimized");
            } else {
                this._setState("Fullscreen.Live");
            }

            return this._play();
        }

        static formatTime(seconds) {
            return Math.floor(seconds / 60) + " min";
        }

        static _states() {
            return [
                class Fullscreen extends this {

                    $enter() {
                        this._setInterfaceTimeout();
                        this.setSmooth('alpha', 1);

                    }
                    $exit() {
                        clearTimeout(this._timeout);
                        this.setSmooth('alpha' , 0);
                    }

                    pressPlay() {
                        this.application.mediaplayer.playPause();
                    }

                    _playerStop() {
                        this.signal('playerStop');
                        this._setState("Inactive");
                    }

                    $mediaplayerPause() {
                        this.tag("Controls").paused = true;
                    }

                    $mediaplayerPlay() {
                        this.tag("Controls").paused = false;
                    }

                    $mediaplayerStop() {
                       this._playerStop();
                    }

                    _handleBack() {
                        this._playerStop();
                    }

                    _captureKey() {
                        this._setInterfaceTimeout();
                        return false;
                    }

                    _setInterfaceTimeout() {
                        if (this._timeout) {
                            clearTimeout(this._timeout);
                        }
                        this._timeout = setTimeout(() => {
                            this._hide();
                        }, 8000);
                    }

                    _getFocused() {
                        return this.tag("Controls");
                    }

                    static _states() {
                        return [
                            class Recorded extends this {
                                $enter() {
                                    this.tag("Progress").setSmooth('alpha', 1);
                                }

                                $exit() {
                                    this.tag("Progress").setSmooth('alpha', 0);
                                }

                                _play() {
                                    this.tag("Controls").mode = Player.MODES.RECORDED;
                                    this._setItem(this._item);
                                    return !!this._stream;
                                }

                                _setItem(item) {
                                    this._stream = item.stream;
                                    this.tag("Controls").title = item.title;
                                    this.tag("Controls").description = item.description;
                                    this.tag("Controls").duration = 0;

                                    this.tag("Progress").setProgress(0, 0);
                                    this._index = this._items.indexOf(item);
                                    this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);

                                    this.application.updateFocusSettings();
                                }

                                pressPrevious() {
                                    const index = this._index - 1;
                                    if (index < 0) {
                                        this._index = this._items.length - 1;
                                    }
                                    this._setItem(this._items[index]);
                                }

                                _pressNext() {
                                    if (!this._items.length) {
                                        this._playerStop();
                                    }
                                    const index = (this._index + 1) % this._items.length;
                                    this._setItem(this._items[index]);
                                }

                                $mediaplayerProgress({currentTime, duration}) {
                                    if(!this.tag("Controls").duration) this.tag("Controls").duration = duration;
                                    this.tag("Progress").setProgress(currentTime, duration);
                                }

                                $mediaplayerEnded() {
                                    this._pressNext();
                                }

                                _hide() {
                                    this._setState("Fullscreen.Recorded.Hidden");
                                }

                                static _states() {
                                    return [
                                        class Hidden extends this {
                                            $enter({prevState}) {
                                                this._prevState = prevState;
                                                this.setSmooth('alpha', 0);
                                            }
                                            $exit() {
                                                this._setInterfaceTimeout();
                                                this.setSmooth('alpha', 1);
                                            }

                                            _captureKey() {
                                                this._setState(this._prevState);
                                            }
                                        },
                                    ];
                                }
                            },
                            class Live extends this {
                                $enter() {
                                    this.tag("Progress").setSmooth('alpha', 0);
                                    this._setTimeout(0);
                                }

                                $exit() {
                                    this.tag("Progress").setSmooth('alpha', 1);
                                    this._clearTimeout();
                                    //reset the live program information
                                    this._setLiveProgramInfo();
                                }

                                _setTimeout(duration) {
                                    this._timerId = setTimeout(() => {
                                        this._api.getLivePrograms().then( (programs) => {
                                            //set the live program information
                                            this._setLiveProgramInfo(programs);

                                            let nextPingAt = App.LIVE_PROGRAMS_POLL_FREQUENCY;
                                            if(programs) {
                                                let nextProgramIn = programs.current.end_time - Date.now();
                                                //If the next program starts in less than the poll frequency then adjust the next ping
                                                if(nextProgramIn < App.LIVE_PROGRAMS_POLL_FREQUENCY) {
                                                    nextPingAt = nextProgramIn;
                                                }
                                            }
                                            this._setTimeout(nextPingAt);
                                        }).catch(err => {
                                            console.error(err);
                                            this._clearTimeout();
                                        });
                                    }, duration);
                                }

                                _clearTimeout() {
                                    clearTimeout(this._timerId);
                                }

                                _setLiveProgramInfo(programs) {
                                    if(programs) {
                                        this.tag("Controls").title = programs.current.title.toUpperCase();
                                    } else {
                                        this.tag("Controls").title = "";
                                    }
                                }

                                _play() {
                                    this.tag("Controls").mode = Player.MODES.LIVE;

                                    this._stream = this._item.stream;
                                    this.tag("Controls").title = this._item.title;
                                    this.tag("Controls").description = this._item.description;

                                    this.application.updateFocusSettings();

                                    return !!this._stream;

                                }

                                _hide() {
                                    this._setState("Fullscreen.Live.Hidden");
                                }

                                static _states() {
                                    return [
                                        class Hidden extends this {
                                            $enter({prevState}) {
                                                this._prevState = prevState;
                                                this.setSmooth('alpha', 0);
                                            }
                                            $exit() {
                                                this._setInterfaceTimeout();
                                                this.setSmooth('alpha', 1);
                                            }

                                            _captureKey() {
                                                this._setState(this._prevState);
                                            }
                                        },
                                    ];
                                }
                            }
                        ];
                    }

                },
                class Minimized extends this {

                    _play() {
                        const api = this.fireAncestors('$getApi');
                        this._stream = {link: api.getPrimaryFeed()};
                        return true;
                    }
                },
                class Inactive extends this {

                }
            ]
        }

        getMediaplayerSettings() {
            return {
                stream: {src: this._stream.link}
            };
        }

    }

    Player.MODES = {
        RECORDED : 'recorded',
        LIVE : 'live'
    };

    class App extends ux.App {

        static getFonts() {
            return [
                {family: 'OpenSans', url: App.getPath('fonts/OpenSans-Regular.ttf'), descriptors: {}},
                {family: 'OpenSans', url: App.getPath('fonts/OpenSans-SemiBold.ttf'), descriptors: {'weight': 'bold'}}
                ]
        }

        static _template() {
            return {
                Splash: {type: Splash},
                Main: {type: Main, alpha: 0, transitions: {alpha: {duration:0.3, delay: 0.1}}},
                Player: {type: Player, alpha: 0, signals: {playerStop: true}}
            };
        }

        _construct() {
            this._api = new Api();
        }

        $getApi() {
            return this._api;
        }

        _init() {
            this._setState("Splash");
        }

        static _states() {
            return [
                class Splash$$1 extends this {

                    $exit() {
                        this.tag("Splash").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("Splash");
                    }

                    $hideSplash() {
                        this._setState("Main");
                    }
                },
                class Main$$1 extends this {

                    $enter() {
                        this.tag("Main").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("Main").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag("Main");
                    }

                    $play({item, items}) {
                        const player = this.tag('Player');
                        const playlist = {item: item.getMediaplayerItem(), items: items.map(item => item.getMediaplayerItem())};
                        if (player.play(playlist)) {
                            this._setState("Playing");
                        }
                    }

                    $playLive(title, minimized) {
                        const player = this.tag('Player');
                        if (player.playLive(title, minimized)) {
                            if(minimized) {
                                this._setState("Main.MinimizedPlayback");
                            } else {
                                this._setState("Playing");
                            }
                        }
                    }

                    static _states() {
                        return [
                            class MinimizedPlayback extends this {

                                $stopMinimizedPlayback() {
                                    this._setState("Main");
                                }
                            }
                        ];
                    }
                },
                class Playing extends this {
                    $enter() {
                        this.tag("Player").setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.tag("Player").setSmooth('alpha', 0);
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

        static cropImage({url, w, h, type = 'crop'}) {
            return ux.Ui.getImageUrl(url, {width: w, height: h, type: type});
        }

        /**
         * Formats the given milliseconds to MMMM dd, yyyy format
         * @param millis milli seconds
         */
        static formatTime(millis) {
            let monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            let date = new Date(millis);
            let onlyDate = date.getDate();
            onlyDate = onlyDate < 10 ? `0${onlyDate}` : onlyDate;

            return `${monthNames[date.getMonth()]} ${onlyDate}, ${date.getFullYear()}`;
        }

        _setFocusSettings(settings){
            if(this.state === "Playing"){
                settings.mediaplayer.consumer = this.tag("Player");
            } else if(this.state === "Main.MinimizedPlayback") {
                settings.mediaplayer.consumer = this.tag("Player");
                settings.mediaplayer.videoPos = [92, 178, 808, 580];
            }
        }

    }

    App.COLORS = {
        BACKGROUND: 0xfff3f7f5
    };

    App.LIVE_PROGRAMS_POLL_FREQUENCY = 60 * 1000; // 1 minute

    return App;

}());
