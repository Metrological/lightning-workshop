var appBundle = (function () {
    'use strict';

    class SplashScreen extends lng.Component {

        static _template() {
            return {
                Splash: {
                    x: 590, y:420,
                    Logo: {
                        alpha: 0, src: App.getPath('images/wsj_logo.png'), x: 10, y: 80, w: 800, h: 85,
                        transitions: {alpha: {duration: 1, delay: 0.5}, y: {duration: 1, delay: 1}}
                    },
                    Caption: {
                        alpha: 0, y: 180, x: 420, mount: 0.5, text: {text:'Loading video stream', fontFace:'Roboto', fontSize: 28, wordWrapWidth: 400, maxLines: 1},
                        transitions: {alpha: {duration: 1, delay: 0.5}, y: {duration: 1, delay: 1}}
                    }
                }
            }
        }

        _init() {
            this.patch({
                Splash: {
                    Logo: {smooth: {alpha: 1, y: 10}},
                    Caption: {smooth: {alpha: 1, y: 210}}
                }
            });
        }
    }

    class GridItem extends lng.Component {
        static _template() {
            return {
                w: 350, h: 370,
                Rect: {
                    w: 350, h: 370, rect: true, colorTop: 0xff7D7B75, colorBottom: 0xff676156
                },
                Image: {
                    x: 15, y:15,
                    PlayingStatus: {
                        y: 138, w: 320, h: 40, rect: true, color: 0xff000000, alpha: 0,
                        Icon: {
                            src: App.getPath('images/play.png'), x: 15, y:11
                        },
                        Text: {
                            x: 40, y: 8, alpha: 1, color: 0xffF1F1F1, text: {fontSize: 20, fontFace:'Roboto', fontStyle: 'bold'}
                        }
                    }
                },
                Title: {
                    x: 15, y: 210, color:0xff101010, text: {text: '', fontSize: 27, fontFace:'PlayfairDisplay', fontStyle: 'bold', lineHeight:35, wordWrapWidth: 320, maxLines: 3}
                },
                CreationDate: {
                    x: 20,
                    y: 330,
                    color: 0xff101010, alpha: 0.4,
                    text: {text: '', fontSize: 20, fontFace:'Roboto'}
                },
                transitions: {x: {duration: 0.7, delay: 0.1}},
            };
        }

        set item(v) {
            this._item = v;
            this.patch({
                Image: {
                    src: App.cropImage({url: v.getPicture({w: 640}).url, w: 320, h: 178})
                },
                Title: {
                    text: {text: v.title}
                },
                CreationDate: {
                    text: {text: v.date}
                }
            });
        }

        get item() {
            return this._item;
        }

        setPlayStatus(status) {
            let playingStatusY = this.tag('PlayingStatus').finalY;
            this.patch({
                Image: {PlayingStatus: {y: playingStatusY+20, alpha: 0}}
            });

            this.patch({
                Image: {PlayingStatus: {Text: {text: 'NOW PLAYING', x: 35}, Icon: {alpha: 1}, smooth: {alpha: (status ? [0.8, {duration: 0.5, delay: 0.7}] : 0), y: [playingStatusY, {duration: 0.5, delay: 0.8}]}}}
            });
        }

        setUpNext() {
            let playingStatusY = this.tag('PlayingStatus').finalY;
            this.patch({
                Image: {PlayingStatus: {y: playingStatusY+20, alpha: 0}}
            });

            this.patch({
                Image: {PlayingStatus: {Text: {text: 'UP NEXT', x: 15}, Icon: {alpha: 0}, smooth: {alpha: [0.8, {duration: 0.5, delay: 0.6}], y: [playingStatusY, {duration: 0.5, delay: 0.6}]}}}
            });
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.05},
                Rect: {color: 0xffF0F0F0}
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1},
                Rect: {color: 0xff7D7B75}
            });
        }
    }

    class Grid extends lng.Component {
        static _template() {
            return {
                List: {
                    type: lng.components.ListComponent,
                    w: 1920,
                    h: 390,
                    x:-65,
                    itemSize: 370,
                    scrollTransition: {duration: 0.2},
                    invertDirection: false,
                    roll: true,
                    viewportScrollOffset: 0.5,
                    itemScrollOffset: 0.5,
                    rollMin: 90,
                    rollMax: 185
                }
            };
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
            this._items = v.map((el) => {
                return {type: GridItem, item: el};
            });

            this.tag('List').items = this._items;
        }

        /**
         * Showing the playing status on the selected item position in the collapsed state
         * @param index
         */
        setPlayStatus(index) {
            this.setItemIndex(index);
            this._items.forEach((item, k) => {
                this.tag("List").getElement(k).setPlayStatus(this.index === k);
            });
        }

        /**
         * Always shows the Up next status in the first item of the right List
         */
        setUpNext() {
            if (this.hasResults()) {
                this.tag("List").getElement(this.index).setUpNext();
            }
        }

        setItemIndex(index) {
            this.tag('List').setIndex(index);
        }

        _handleLeft() {
            if (this.index === 0) {
                this.fireAncestors('$handleItemViewFocus');
                return false;
            }

            this.tag('List').setPrevious();
        }

        _handleRight() {
            this.tag('List').setNext();
        }

        _handleEnter() {
            this.fireAncestors('$play', {
                items: this.tag('List').items.map(item => item.item),
                item: this.active.item
            }, true);
        }

        _getFocused() {
            return this.active;
        }
    }

    class Progress extends lng.Component {
        static _template() {
            return {
                CurrentDuration: {
                    y:3, alpha: 0.7, text: {text: '00:00', fontSize: 24, fontFace:'Roboto'}
                },
                ProgressBar: {
                    x: 80, y:15,
                    Scrub: {w: 400, rect:true, h:6, color: 0xFFF1F1F1, alpha: 0.2},
                    Bar: {
                        Active: {color: 0xFFCCC0AA, h:6, rect: true}
                    }
                },
                EndDuration: {
                    y:3, x:500, alpha: 0.7, text: {text: '00:00', fontSize: 24, fontFace:'Roboto'}
                }
            }
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
            const x = v * Progress.width;

            estimation *= 0.001;
            this.tag("Active").setSmooth('w', Math.max(x, 0.0001), {
                timingFunction: 'linear',
                duration: estimation
            });
        }

        setWidth(v) {
            Progress.width = v;
        }

        setProgress(currentTime, duration) {
            this._progress = currentTime / Math.max(duration, 1);
            this.tag("CurrentDuration").text = `${this.formatTime(currentTime)}`;
            this.tag("EndDuration").text = `${this.formatTime(duration)}`;
        }

        formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            const minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            seconds = Math.floor(seconds);
            const parts = [];
            if (hours) parts.push(hours);
            parts.push(minutes);
            parts.push(seconds);
            return parts.map(number => (number < 10 ? "0" + number : "" + number)).join(":");
        }
    }

    Progress.width = 0;

    class Button extends lng.Component {

        static _template() {
            return {
                w: 70, h: 50,
                ButtonIcon: {
                    w: 70, h: 50, rect:true, colorTop: 0xFF7C7A74, colorBottom: 0xFF676156,
                    Icon: {x: 35, y:25, mount : 0.5, w: 30, h: 18}
                }
            };
        }

        set icon(icon) {
            this._icon = icon;
            let color = this._focused ? this.colors.focused : this._isActive ? this.colors.enabled : this.colors.disabled;
            this.tag("ButtonIcon").patch({alpha: `${this._isActive ? 1: 0.3}`, Icon: {smooth: {src: icon, color: color}}});
        }

        set width(w) {
            this.tag("ButtonIcon").patch({Icon: { w: w}});
        }

        set height(h) {
            this.tag("ButtonIcon").patch({Icon: { h: h}});
        }

        set active(v) {
            this._isActive = v;
        }

        get active() {
            return this._isActive;
        }

        static _states() {
            return [
                class Selected extends this {
                    $enter() {
                        this.tag("ButtonIcon").patch({smooth: {colorTop: this.buttonBG.enabled.colorTop, colorBottom: this.buttonBG.enabled.colorBottom}, Icon: {smooth: {color: this.colors.focused}}});
                    }
                    $exit() {
                        let color = this._isActive ? this.colors.enabled : this.colors.disabled;
                        this.tag("ButtonIcon").patch({smooth: {colorTop: this.buttonBG.main.colorTop, colorBottom: this.buttonBG.main.colorTop}, Icon: {smooth: {color: color}}});
                    }
                },
                class UnSelected extends this {
                    $enter() {
                        this.tag("ButtonIcon").patch({colorTop: this.buttonBG.main.colorTop, colorBottom: this.buttonBG.main.colorBottom});
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
            this._setState("UnSelected");
        }

        get colors() {
            return {
                disabled: 0xff101010,
                enabled: 0xff101010,
                focused: 0xff101010
            };
        }

        get buttonBG() {
            return {
                enabled: {colorTop: 0xFFF0F0F0, colorBottom: 0xFFCFC3AE},
                main: {colorTop: 0xFF7C7A74, colorBottom: 0xFF676156},
            }
        }

    }

    class Controls extends lng.Component {

        static _template() {
            return {
                Buttons: {
                    width: 300, h: 50,
                    flex: {direction: "row", justifyItems: "flex-start"},
                    Previous: {alpha: 0.4, flexItem: {marginRight:10},type: Button, icon: App.getPath('images/prev.png')},
                    Rewind: {flexItem: {marginRight:10}, type: Button, icon: App.getPath('images/rwd.png')},
                    Play: {flexItem: {marginRight:10}, type: Button, icon: App.getPath('images/play.png'), width: 16, height: 18},
                    Forward: {flexItem: {marginRight:10}, type: Button, icon: App.getPath('images/fwd.png')},
                    Next: {flexItem: {}, type: Button, icon: App.getPath('images/next.png')}
                },
            };
        }

        _setup() {
            this.setPlayState();
        }

        _init() {
            this.showButtons(false, true);
            this.setPlayState();
        }

        setPlayState() {
            this._setState("Play");
        }

        showButtons(previous, next) {
            let buttons = [];
            if (previous) {
                buttons.push("Previous");
                this.patch({ Buttons: { Previous: {alpha: 1}}});
            } else {
                this.patch({ Buttons: { Previous: {alpha: 0.4}}});
            }

            buttons.push("Rewind");
            buttons.push("Play");
            buttons.push("Forward");

            if (next) {
                buttons.push("Next");
                this.patch({ Buttons: { Next: {alpha: 1}}});
            } else {
                this.patch({ Buttons: { Next: {alpha: 0.4}}});
            }

            this._setActiveButtons(buttons);
        }

        get _activeButtonIndex() {
            let button = this.tag("Buttons").getByRef(this._getState());
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
            let index = this._activeButtonIndex;
            if (index === -1) {
                if (this._index >= this._activeButtons.length) {
                    this._index = this._activeButtons.length - 1;
                }
            }
            this._setState(this._activeButtons[index].ref);
        }

        _handleLeft() {
            let index = this._activeButtonIndex;
            if (index > 0) {
                index--;
            } else {
                this.fireAncestors('$handleLeftItemViewFocus');
                return false;
            }
            this._setState(this._activeButtons[index].ref);
        }

        _handleRight() {
            let index = this._activeButtonIndex;
            if (index < this._activeButtons.length - 1) {
                index++;
            } else {
                this.fireAncestors('$handleListViewFocus');
                return false;
            }
            this._setState(this._activeButtons[index].ref);
        }

        _handleEnter() {
            this.signal('press' + this._activeButton.ref);
        }

        set paused(v) {
            this.tag("Play").icon = v ? App.getPath('images/play.png') : App.getPath('images/pause.png');
        }

        static _states() {
            return [
                class Previous extends this {
                },
                class Rewind extends this {
                },
                class Play extends this {
                },
                class Forward extends this {
                },
                class Next extends this {
                }
            ]
        }

        _getFocused() {
            return this.tag(this._getState());
        }
    }

    class CurrentItem extends lng.Component {
        static _template() {
            return {
                Title: {
                   x: 20, color:0xffF1F1F1, text: {text: '', fontSize: 42, fontFace:'PlayfairDisplay', fontStyle: 'bold', lineHeight:45, wordWrapWidth: 1000, maxLines: 2}
                },
                CreationDate: {
                    x: 20, y: 120, alpha: 0.7,
                    color: 0xffF1F1F1,
                    text: {text: '', fontSize: 20, fontFace:'Roboto'}
                },
                PlayerControls: {
                    x: 20, y: 170, h: 60,
                    Controls: {type: Controls, signals: {pressPrevious: true, pressRewind: '_pressRewind', pressPlay: true, pressForward: '_pressForward', pressNext: "_pressNext"}},
                    Progress: {x: 420, y:10, type: Progress}
                },
                Description: {
                    x: 20, y: 240, color:0xffF1F1F1, alpha: 0.7, text: {text: '', fontSize: 24, fontFace:'Roboto', lineHeight:35, wordWrapWidth: 1000, maxLines: 4}
                }
            };
        }

        set title(title) {
            this.tag("Title").text = title || "";
        }

        set description(description) {
            this.tag("Description").text = description || "";
        }

        set creationDate(creationDate) {
            this.tag("CreationDate").text = creationDate || "";
        }

        setProgress(duration, currentTime) {
            this.tag("Progress").setWidth(400);
            this.tag("Progress").setProgress(duration, currentTime);
        }

        setItem(item) {
            this.title = item.title;
            this.description = item.description;
            this.creationDate = item.date;
        }

        get status() {
            return this._status;
        }

        set status(status) {
            this._status = status;
        }

        showButtons(previous, next) {
            this.tag("Controls").showButtons(previous, next);
        }

        playPause(status) {
            this.tag("Controls").paused = status;
        }

        pressPrevious() {
            this.fireAncestors('$pressPrevious');
        }

        _pressRewind() {
            this.fireAncestors('$pressRewind');
        }

        pressPlay() {
            this.application.mediaplayer.playPause();
        }

        _pressForward() {
            this.fireAncestors('$pressForward');
        }

        _pressNext() {
            this.fireAncestors('$pressNext');
        }

        setPlayState() {
            this.tag("Controls").setPlayState();
        }

        _getFocused() {
            return this.tag("Controls");
        }
    }

    class MostViewed extends lng.Component {

        static _template() {
            return {
                y:540,
                Gradient: {
                    w: 1920, h: 542, rect:true, src: App.getPath('images/gradient.png')
                },
                BottomGrid:  {
                    y:150,
                    Logo: {
                        w: 240, h: 370, rect: true, color: 0xff101010,
                        Image: {
                            src: App.getPath('images/wsj.png'), w:100, h:53, x:110, y:280
                        },
                        transitions: {alpha: {duration: 0.2, delay: 0.3}, x: {duration: 0.5, delay: 0.1}}
                    },
                    LeftList: {
                        type: Grid, x: -190, alpha: 0,
                        transitions: {alpha: {duration: 0.3, delay: 0.1}}
                    },
                    LeftItem: {
                        type: GridItem, alpha: 0,
                        transitions: {alpha: {duration: 0.5, delay: 0.2}, x: {duration: 1, delay: 0.1}}
                    },
                    CurrentItem: {zIndex:99, type: CurrentItem, x: 255,
                        transitions: {alpha: {duration: 0.2, delay: 0.1}}
                    },
                    ClipperRight: {
                        clipping: true, color: 0xff101010, w: 650, h: 410, x: 1300, y:-20,
                        List: {
                            type: Grid, y: 20,
                            transitions: {x: {duration: 0.2, delay: 0.1}}
                        },
                        transitions: {x: {duration: 0.3, delay: 0.1}}
                    },
                    RightItem: {
                        type: GridItem, alpha: 0,zIndex:10,
                        transitions: {alpha: {duration: 0.3, delay: 0.3}, x: {duration: 0.6, delay: 0.1}}
                    }
                }
            }
        }

        _init() {
            this._setState('Loading');
        }

        /**
         * set the selected item to current view
         * @param index
         * @param item
         */
        setData(index, item) {
            this._index = index;
            if (this._isItemShow()) {
                this.tag("CurrentItem").setItem(item);
                this.tag("CurrentItem").showButtons(this._index > 0, this._index < this._items.length - 1);

                this.showLists();

                this._leftItems = this._items.slice(index-1, index);
                this._rightItems = this._items.slice(index+1, this._items.length);
            }


            if (this._index == 0) {
                this.tag('List').items = this._items;
            }
        }

        /**
         * Based on the direction (Previous and Next), the transition item will be set.
         * @param direction
         */
        setNavigationItems(direction) {
            if (this._index > 0) {
                this.tag('LeftItem').item = this._items[(direction === -1 ? this._index : this._index-1)];
            }

            if (this._index < this._items.length - 1) {
                this.tag('RightItem').item = this._items[(direction === -1 ? this._index+1 : this._index)];
            }
        }

        setListItems() {
            this.tag('List').items = this._rightItems;
            this.tag('LeftList').items = this._leftItems;
        }

        showLists() {
            if (this._index == this._items.length - 1) {
                this.patch({
                    BottomGrid: {
                        ClipperRight: {smooth: {alpha: 0}}
                    }
                });
            }
        }

        /**
         * Reset the position of Lists, transition items based on direction
         * @param direction
         */
        resetItems(direction) {

            let clipperRightX = this.tag('ClipperRight').finalX;
            let currentItemX = this.tag('CurrentItem').finalX;

            let isRightDir = (direction === -1); //-1 is Previous, so that the item will move from left to right

            this.patch({
                BottomGrid: {
                    LeftItem: {x: (isRightDir ? -100 : currentItemX), alpha: 0.5},
                    RightItem: {x: (isRightDir ? clipperRightX-420 : clipperRightX+25), alpha: 0.5},
                    ClipperRight: {
                        alpha: 0.3, List: {x: (isRightDir ? -390 : 425)}
                    },
                    LeftList: {alpha: 0.2},
                    Logo: {x:-200, alpha: 0},
                    CurrentItem: {alpha: 0.2}
                }
            });

            //when the first item is selected, the logo should be appear
            if (this._index == 0) {
                this.patch({
                    BottomGrid: {
                        Logo: {smooth: {x: [0, {duration: 0.7, delay: 0.4}], alpha: 1}}
                    }
                });
            }
        }

        /**
         * The items will be set to left and right Lists. Based on the directions,
         * the item positions will be set
         * @param direction
         */
        setItemDirection(direction) {
            if (this._isItemShow()) {
                this.resetItems(direction);

                this.setNavigationItems(direction);
                this.setListItems();
                this.tag('List').setUpNext();

                let leftItemX = this.tag('LeftItem').finalX;
                let rightItemX = this.tag('RightItem').finalX;
                let clipperRightX = this.tag('ClipperRight').finalX;
                let isRightDir = (direction === -1);

                this.patch({
                    BottomGrid: {
                        LeftItem: {smooth: {x: (isRightDir ? leftItemX + 370 : leftItemX - 370), alpha: 0}},
                        RightItem: {smooth: {x: (isRightDir ? rightItemX + 350 : clipperRightX - 350), alpha: 0}},
                        ClipperRight: {
                            smooth: {alpha: [1, {duration: 0.7, delay: 0.2}]},
                            List: {smooth: {x: [0, {duration: 0.7, delay: 0.2}]}}
                        },
                        CurrentItem: {smooth: {alpha: [1, {duration: 0.6, delay: 0.2}]}},
                        LeftList: {smooth: {alpha: [1, {delay: 0.5}]}},
                    }
                });
            } else {
                this.tag('List').setPlayStatus(this._index);
            }
        }

        setProgress(duration, currentTime) {
            this.tag("CurrentItem").setProgress(duration, currentTime);
        }

        playPause(status) {
            this.tag("CurrentItem").playPause(status);
        }

        _isItemShow() {
            return this.tag("CurrentItem").status;
        }

        _setItemStatus(status) {
            this.tag("CurrentItem").status = status;
        }

        collapse() {

            let leftListX = this.tag('LeftList').finalX;

            //set the direction from left to right when there are not items in the right side
            if (this._rightItems.length == 0) {
                this.patch({
                    BottomGrid: {
                        ClipperRight: {
                            x: 0, alpha: 0.5
                        }
                    }
                });
            }

            this.patch({
                BottomGrid: {
                    CurrentItem: {smooth: {alpha: [0, {duration: 0.5, delay: 0.1}]}},
                    ClipperRight: {
                        w: 1700, smooth: {x: [250, {duration: 1, delay: 0.1}], alpha: 1}
                    },
                    LeftList: {smooth: {x: [leftListX+450, {duration: 1, delay: 0.1}], alpha: [0, {duration: 0.5, delay: 0.3}]}},
                    Logo: {smooth: {x: [0, {delay: 0.2}], alpha: 1}},
                    LeftItem: {alpha: 0},
                    RightItem: {alpha: 0}
                }
            });

            this.tag('List').items = this._items;
            this._setItemStatus(false);
            this.tag('List').setPlayStatus(this._index);
            this._setState('Collapse');
        }

        expand() {
            let isFirstItem = (this._index == 0);

            this.patch({
                BottomGrid: {
                    ClipperRight: { x: 1050, alpha: 0.4},
                    LeftList: {x: 155, alpha: 0.4},
                    CurrentItem: {alpha: 0.2}
                }
            });

            this.patch({
                BottomGrid: {
                    CurrentItem: {smooth: {alpha: [1, {duration: 0.6, delay: 0.3}]}},
                    LeftList: {smooth: {alpha: (isFirstItem ? 0 : 1), x: [-145, {duration: 0.8, delay: 0.1}]}},
                    ClipperRight: {
                        smooth: {x: [1300, {duration: 0.8, delay: 0.1}], alpha: 1}
                    },
                    LeftItem: {alpha: 0},
                    RightItem: {alpha: 0},
                    Logo: {smooth: {x: [(isFirstItem ? 0 : -200), {delay: 0.2}], alpha: (isFirstItem ? 1 : 0)}}
                }
            });

            this.setListItems();
            this.tag('List').setItemIndex(0);

            this.tag('List').setUpNext();
            this._setState('Expand');
        }

        get items() {
            return this._items;
        }

        static _states() {
            return [
                class Loading extends this {

                    $enter() {
                        this._load();
                    }

                    _load() {
                        const api = this.fireAncestors('$getApi');
                        api.getMostViewed().then((data) => {
                            this._loaded(data);
                        }).catch((err)=>{
                            this.fireAncestors('$error', {message: err});
                        });
                    }

                    _loaded(data) {
                        this._items = data;
                        this.fireAncestors('$hideInitialSplash');
                        this._setState("Expand");
                        this.fireAncestors("$play",{item:data[0], items:data});
                    }
                },
                class Collapse extends this {

                    $enter() {
                        this.tag("CurrentItem").setSmooth('alpha', 0);
                        this.tag("BottomGrid").setSmooth('alpha', 1);
                    }

                    $handleItemViewFocus() {
                        if (this._isItemShow()) {
                            this._setState('Expand');
                        }
                    }

                    _getFocused() {
                        return this.tag('List');
                    }
                },
                class LeftListView extends this {

                    $enter() {
                        this.tag("BottomGrid").setSmooth('alpha', 1);
                    }

                    _getFocused() {
                        return this.tag('LeftList');
                    }
                },
                class Expand extends this {

                    $enter() {
                        if (this._isItemShow()) {
                            this.tag("CurrentItem").setPlayState();
                            this.tag("CurrentItem").setSmooth('alpha', 1);
                        }
                    }

                    $exit() {
                        this.tag("CurrentItem").setSmooth('alpha', 0);
                    }

                    $handleListViewFocus() {
                        if (this._items.length - 1 > this._index) {
                            this.collapse();
                            this._setState('Collapse');
                        }
                    }

                    $handleLeftItemViewFocus() {
                        if (this._index > 0) {
                            this.collapse();
                            this._setState('Collapse');
                        }
                    }

                    _getFocused() {
                        return this.tag('CurrentItem');
                    }
                }
            ]
        }
    }

    class Player extends lng.Component {

        static _template() {
            return {
                MostViewed: {
                    type: MostViewed
                }
            }
        }

        _init() {
            this._setState('Show');
        }

        play({item, items}){
            this._items = items;
            this.tag("MostViewed")._setItemStatus(true);
            this._setItem(item);
            this.tag("MostViewed").expand();
        }

        _setItem(item) {
            this._item = item;
            this._index = this._items.indexOf(item);
            this.tag("MostViewed").setData(this._index, item);
            this._stream = item.stream.link;
            this.application.updateFocusSettings();
        }

        _focus() {
            this._setInterfaceTimeout();
        }

        _unfocus() {
            clearTimeout(this._timeout);
        }

        _captureKey() {
            this._setInterfaceTimeout();
            return false;
        }

        $mediaplayerEnded() {
            this.$pressNext();
        }

        $mediaplayerProgress({currentTime, duration}) {
            this.tag("MostViewed").setProgress(currentTime, duration);
        }

        $mediaplayerPause() {
            this.tag("MostViewed").playPause(true);
        }

        $mediaplayerPlay() {
            this.tag("MostViewed").playPause(false);
        }

        $pressNext() {
            const index = (this._index + 1) % this._items.length;
            this._setItem(this._items[index]);
            this.tag("MostViewed").setItemDirection(1);
        }

        $pressRewind() {
            this.application.mediaplayer.seek(-15);
        }

        $pressForward() {
            this.application.mediaplayer.seek(15);
        }

        $pressPrevious() {
            const index = this._index - 1;
            if (index < 0) {
                this._index = this._items.length - 1;
            }
            this._setItem(this._items[index]);
            this.tag("MostViewed").setItemDirection(-1);
        }

        _setInterfaceTimeout() {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(() => {
                this._hide();
            }, 8000);
        }

        _hide() {
            this._setState("Idle");
        }

        static _states() {
            return [
                class Show extends this {
                    $enter() {
                        this.tag("MostViewed").setSmooth('alpha', 1);
                    }

                    $exit() {
                        this.tag("MostViewed").setSmooth('alpha', 0);
                    }

                    _getFocused() {
                        return this.tag('MostViewed');
                    }
                },
                class Idle extends this {
                    $enter() {
                        this.tag("MostViewed").setSmooth('alpha', 0);
                    }

                    $exit() {
                        this._setInterfaceTimeout();
                        this.tag("MostViewed").setSmooth('alpha', 1);
                    }

                    _captureKey() {
                        this._setState('Show');
                    }
                },
            ];
        }

        getMediaplayerSettings() {
            return {
                stream: {src: this._stream}
            };
        }
    }

    class Error$1 extends lng.Component{

        static _template(){
            return {
                color: 0xaa000000, rect: true, w:1920, h:1080, y: -100,
                Wrapper:{
                    flex: {},
                    rect: true,
                    Wrapper: {
                        flex: {direction: "row"},
                        w: 1920,
                        Icon: {flexItem: {marginLeft: 20, marginTop: 20, marginRight: 20, marginBottom: 15},
                            src: App.getPath('images/error.png')
                        },
                        Error:{flexItem: {marginTop: 15}, color: 0xff353535,
                            text:{text:"", fontFace:"Roboto", fontSize:26, lineHeight:40, wordWrapWidth:1720}
                        }
                    }
                }
            }
        }

        handleError({message, timeout}){
            this.tag("Error").text.text = `${message}`;
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, timeout);
            });
        }

        _focus() {
            this.patch({
                smooth: {y: 0}
            });
        }

        _unfocus(){
            this.patch({
                smooth: {y: -100}
            });
        }
    }

    class MediaItem {
        constructor(obj) {
            this.$  = obj;
        }

        get title() {
            return this.$.name;
        }

        get date() {
            return this.$.formattedCreationDate;
        }

        get description() {
            return this.$.description;
        }

        get duration() {
            return this.$.duration;
        }

        getMediaplayerItem() {
            return this._mediaplayerItem ? this._mediaplayerItem :
                this._mediaplayerItem = {title: this.title, description: this.description, date: this.date, stream: {link: this.getHighQuality().url}}
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

        get pictures() {
            return this.$.thumbnailList.sort((a, b) => b.width - a.width);
        }

        get largest() {
            return this.pictures[0].url;
        }

        get smallest() {
            const p = this.pictures;
            return p[p.length - 1].url;
        }

        get videos() {
            return this.$.videoMP4List.sort((a, b) => b.width - a.width);
        }

        /**
         * Get a video that matches a certain width or height
         * @param w
         * @param h
         * @returns {*}
         */
        getVideo({w = null, h = null}) {
            let videos = this.videos;

            if (!videos.length) {
                return false;
            }
            if (!w && !h) {
                return videos[0];
            } else {
                const val = w ? w : h;
                const match = videos.filter(p => p[w ? 'width' : 'height'] === val);

                if (match.length) {
                    return match[0].url;
                } else {
                    return videos[0].url;
                }
            }
        }

        getHighQuality(){
            return this.videos[0];
        }
    }

    class Api {

        constructor() {
            this._endpoints = {
                mostViewed: 'https://www.marketwatch.com/mw2/mediarss/wsjdn/wsjtv.asp?type=playlist&query=Most+Viewed+WSJ+Videos&format=json'
            };
        }

        _getHeaders() {
            return {
                // Add headers here
            };
        }

        _send(url) {
            return fetch(url, this._getHeaders()).then(r => r.json());
        }

        getMostViewed() {
            return this._send(this._endpoints.mostViewed)
                .then((data = []) => {
                    if (!data.items.length) {
                        return Promise.reject("No data found for most viewed videos");
                    }
                    return Promise.resolve(
                        data.items.map(video => new MediaItem(video))
                    );
                }).catch((err) => {
                    throw new Error(Api.ERRORS.CODE1);
                });

        }
    }

    Api.ERRORS = {
        CODE1: "Unable to get details."
    };

    class App extends ux.App {

        static getFonts() {
            return [
                {family: 'PlayfairDisplay', url: App.getPath('fonts/PlayfairDisplay-Bold.ttf'), descriptors: { weight: 'bold'}},
                {family: 'Roboto', url: App.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}},
                {family: 'Roboto', url: App.getPath('fonts/Roboto-Bold.ttf'), descriptors: {weight: 'bold'}}
            ];
        }

        static _template() {
            return {
                Splash: { type: SplashScreen, transitions: {alpha: {duration: 1, delay: 0.3}} },
                Player: { type: Player, alpha: 0, transitions: {alpha: {duration: 1, delay: 1.5}}},
                Error: { type: Error$1, zIndex: 99, alpha: 0 }
            }
        }

        _construct() {
            this._api = new Api();
        }

        $getApi() {
            return this._api;
        }

        _init() {
            this._setState('Splash');
        }

        static _states() {
            return [
                class Splash extends this {

                    $enter() {
                        this.tag('Splash').setSmooth('alpha', 1);
                    }

                    $hideInitialSplash() {
                        this._setState("Playing");
                    }

                    $exit() {
                        this.tag('Splash').setSmooth('alpha', 0);
                    }
                },
                class Playing extends this {

                    $enter(){
                       this.tag("Player").setSmooth("alpha", 1);
                    }

                    $exit(){
                        this.tag("Player").setSmooth("alpha", 0);
                    }

                    $play({item, items}){
                        const player = this.tag('Player');
                        const playlist = {item: item.getMediaplayerItem(),
                            items: items.map(item => item.getMediaplayerItem())};
                        if (player.play(playlist)) {
                            this._setState("Playing");
                        }
                    }

                    _getFocused() {
                        return this.tag("Player");
                    }
                },
                class Error extends this {
                    $enter() {
                        this.patch({
                            Error: {
                                smooth: {alpha: 1}
                            }
                        });
                    }

                    $exit() {
                        this.patch({
                            Error: {
                                smooth: {alpha: 0}
                            }
                        });
                    }

                    _getFocused() {
                        return this.tag("Error");
                    }

                    _captureKey(){
                        // prevent key
                    }
                }
            ];
        }

        $error({message, timeout=5000, returnState="App"}){
            console.log('message: '+message);
            this._setState("Error");
            return this.tag("Error").handleError({message, timeout}).then(()=>{
                this._setState(returnState);
            });
        }

        _setFocusSettings(settings){
            if(this.state === "Playing"){
                settings.mediaplayer.consumer = this.tag("Player");
            }
        }

        static cropImage({url, w, h}) {
            return ux.Ui.getImageUrl(url, {width: w, height: h, type: 'crop'});
        }
    }

    return App;

}());
