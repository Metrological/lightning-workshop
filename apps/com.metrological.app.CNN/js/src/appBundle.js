var appBundle = (function () {
    'use strict';

    class GridItem extends lng.Component {
        static _template() {
            return {
                w: 400, h: 260, rect: true, color: 0xff000000, alpha: 0.6,
                Image: {},
                Border: {
                    PlayImage : {
                        rect: true, color: 0xff303030, w: 31, h: 31, x: 20, y: 230,
                        Img: {src: App.getPath('images/play_small.png'), x:9,y:9,w: 15, h: 15,},
                    },
                    alpha: 0, w: 400, h: 260,
                    Time: {
                        rect: true, color: 0xffCB0000, w: 199, h: 32, x: 51, y: 230,
                        Label: {
                            x: 10, y: 5, color: 0xffF1F1F1, text: {text: '00:00:00', fontSize: 18}
                        }
                    },
                    Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xffCB0000, w: 400, h: 260, x: 2, y: 2}
                },

                Title: {
                    x: 20, y: 178, text: {text: '', fontSize: 28, wordWrapWidth: 360, maxLines: 2}
                },

            };

        }

        set item(v) {
            this._item = v;

            this.patch({
                Image: {
                    src : App.cropImage({url: v.largePicture,w:400,h:260}),

                },
                Border: {
                    Time: {
                            Label: {text: {text: App.formatAMPM(v.publishdate)}}
                    }
                },
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
                smooth: {scale: 1.1, alpha: 1},
                Border: {
                    smooth: {alpha: 1},
                },
                Title: {smooth: {y:155}},
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1, alpha: 0.6},
                Border: {
                    smooth: {alpha: 0},
                },
                Title: {smooth: {y:178}}
            });
        }


    }
    GridItem.MEASURE = {
        HEIGHT : 300,
        WIDTH : 430,
    };

    class Grid extends lng.Component{

        static _template(){
            return {
                Items:{

                }
            }
        }

        _init(){
            this._index = -1;
            this._prevIndex = 0;
        }

        get active(){

            return this.tag("Items").children[this._index];
        }

        _handleRight(){
            if(this._index == -1) {
                this.fireAncestors("$setSpotLightFocus",0);
                this._index = this._prevIndex;
            }
            else {
                const newIndex = this._index + 2;
                if (newIndex < this._items.length) {
                    this._select(newIndex);
                }
            }
        }

        _handleLeft() {
            if (this._index  == 0 || this._index == 1) {
                this._prevIndex = this._index;
                this._index = -1;
                this.fireAncestors("$setSpotLightFocus",1);
            }
            else {

                const newIndex = this._index - 2;
                if (newIndex >= 0) {
                    this._select(newIndex);

                }
            }

        }

        _handleDown(){
            if(this._index != -1 && this._index != this._items.length-1) {
                const newIndex = this._index + 1;
                if (~~(newIndex / 2) === ~~(this._index / 2)) {
                    this._select(newIndex);
                }
            }
        }
        _focus() {
            if(this._index == -1){
                //setting back the teaser highlight
                this.fireAncestors("$setSpotLightFocus",1);


            }
        }

        _handleUp(){

            const newIndex = this._index - 1;
            if(~~(newIndex/2) === ~~(this._index/2) && newIndex >= 0){
                this._select(newIndex);
            }
            else {
                this.fireAncestors("$setSpotLightFocus",0);
                return false;
            }
        }

        _handleEnter(){
            let _itemData;
            if(this._index < 0) {
                //getting the item of the 0th index
                _itemData = this.fireAncestors("$getSpotLightItem",0);
            }
            else {
                _itemData = this.active.item;
            }
            this.fireAncestors("$loadDetails", {item:_itemData},{items:this._all_items},{index:this._index+1});
        }

        _select(index){
            this._index = index;
            const offset = this.x + this.active.x + GridItem.MEASURE.WIDTH;
            const position = 1920 - offset;
            if(position < 0){
                this.tag("Items").setSmooth("x", position - 150);
                this.fireAncestors("$Reposition",position - 150);

            }else{
                this.tag("Items").setSmooth("x", 0);
                this.fireAncestors("$Reposition",0);
            }
        }

        _reset() {
            this._index = -1;
            this._prevIndex = 0;
            this.tag("Items").patch({Child: undefined});
            this.tag("Items").setSmooth("x", 0);
            this.fireAncestors("$Reposition",0);
        }

        set items(v){
            this._all_items = v;
            v = v.slice(1,v.length);
            this._items = v;
            this._reset();
            this.tag("Items").children = v.map((el, idx)=>{
                return {
                    type: GridItem,
                    item: el,
                    x: Math.floor(idx/2) * GridItem.MEASURE.WIDTH,
                    y: Math.floor(idx%2) * GridItem.MEASURE.HEIGHT
                }
            });
        }

        _getFocused(){
            return this.active;
        }
    }

    class Home extends lng.Component {

        static _template() {
            return {
                Header: {
                    w: 1920, x:-100,y:-370,h: 190,color: 0xff101010, rect: true
                },
                LogoImage:{src:App.getPath('images/cnn_logo.PNG'), zIndex:1,x: 0, y: -300, w: 170, h: 169},
                SpotLight:{
                    y:30,
                    Image : {},
                    TimeBorder: {
                        alpha: 0 , w: 400, h: 216,y: 508,
                        SpotLightPlayImage : {rect: true, color: 0xff303030, w: 45, h: 45, x: 31,
                            Img: {src: App.getPath('images/play_small.png'), x:15,y:15,w: 18, h: 18,},
                        },
                        Time: {
                            rect: true, color: 0xffCB0000, w: 299, h: 45, x: 76,
                            Label: {
                                x: 10, y: 10, color: 0xffF1F1F1, text: {text: '00:00:00', fontSize: 26,maxLines: 2},
                            }
                        },
                    },

                    Title: {
                        alpha : 0,x: 40, y: 400, text: {text: '', fontSize: 36, wordWrapWidth: 600, maxLines: 2,color:0xffF1F1F1}
                    },
                    Border: {type: lng.components.BorderComponent, alpha:0,borderWidth: 5, colorBorder: 0xffCB0000, w: 990, h: 550},
                    rect:true, w:990, h:550
                },
                Grid:{
                    y:30,
                    type: Grid, x:1030
                }
            }
        }

        _init() {
            this._setState("Loading");
        }



        $setSpotLightFocus(value) {
            this.tag("Border").setSmooth("alpha",  value);
            this.tag("TimeBorder").setSmooth("alpha",  value);
            this.tag("Title").setSmooth("alpha",  value);
        }

        $Reposition(position) {
            this.tag("SpotLight").setSmooth("x",  position);
        }

        select(data) {
            if(data) {
                this._setDataSpotlight(data,0);
                this._setDataGrid(data);

            }

        }

        $getSpotLightItem(index) {
            return this._dataItems [index];
        }
        _setDataSpotlight(data, index) {
            this._dataItems = data;
            this.patch({
                SpotLight: {
                    Image : {src : App.cropImage({url: data[index].largePicture,w:Home.SPOTLIGHT.WIDTH,h:Home.SPOTLIGHT.HEIGHT})},

                    Title: {
                        text: {text: data[index].title}
                    },
                    TimeBorder:{
                        Time : {
                            Label: {
                                text: {text: App.formatAMPM(data[index].publishdate)}

                            }
                        }
                    }
                },


            });

        }

        _setDataGrid(data) {
            this.tag("Grid").items = data;
            this._setState("Grid");
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
                        api.fetchDataBySection('us').then((data) => {
                            this._loaded(data);
                        }).catch(err => console.error(err));

                    }
                    _loaded(data) {
                        this._setDataSpotlight(data,0);
                        this._setDataGrid(data);

                    }
                },
                class Grid$$1 extends this{
                    _getFocused(){
                        return this.tag("Grid");
                    }
                },

            ];
        }

    }
    Home.SPOTLIGHT = {
        WIDTH : 990,
        HEIGHT : 550,
    };

    class Content extends lng.Component {

        static _template() {
            return {
                Home: {
                    w: w => w, type: Home, alpha: 0,
                },

            };
        }

        menuItemSelected(args){
            this.tag("Home").select(args);
        }

        _init() {
            this._setState("Home");
        }

        _focus() {
            this.tag("Home").setSmooth('alpha', 1);
        }

        _getFocused() {
            return this.tag('Home');
        }


    }

    class MenuItem extends lng.Component {

        static _template() {
            return {
                flex:true, rect: true, color:0x60101010,
                flexItem:{marginRight:20},
                Label:{
                    flexItem:{marginRight:20},
                    color:0xff808080, x:10,y:5,text:{text:"test", fontSize:36,fontFace: 'sans-serif', fontStyle: 'normal'}
                }

            };
        }
        set title(v) {
            this.tag("Label").text.text = v;
        }
        set section(v){
            this._section = v;
        }

        get section(){
            return this._section;
        }

        _focus() {
            this.patch({
                color:0xffCB0000,
                Label:{
                    color:0xffF1F1F1,
                }

            });
        }
        _init() {
            this._isSelected = false;
        }


        deSelect() {
            this._isSelected = true;
            this.patch({
                smooth: {scale: 1.01},
                color:0xff101010,
                Label:{
                    color:0xffF1F1F1,
                    text:{fontSize:52}
                }

            });

        }
        deUnSelect() {
            this.patch({
                smooth: {scale: 1},
                color: 0x60101010,
                Label: {
                    color: 0xff808080,
                    text:{fontSize:36}
                }

            });
        }


        _unfocus() {
            if(this._isSelected === false) {
                this.patch({
                    color: 0x60101010,
                    Label: {
                        color: 0xff808080,
                    }

                });
            }
            else {
                this._isSelected = false;
            }


        }


    }

    class Menu extends lng.Component {
        static _template() {
            return {
                MyFleBox:{
                    x:100,y:282,w:1080,h:50,
                    MenuItems:{
                        flex: {direction: 'column', wrap:true, paddingRight: 30 }
                    }
                }
            };
        }


        _init() {

                this.tag("MenuItems").children = [
                {section:"us", title:"U.S."},{section:"politics",title:"Politics"},{section:"europe",title:"Europe"},
                {section:"asia",title:"Asia"},
                {section:"americas",title:"Americas"},
                {section:"entertainment",title:"Entertainment"},
                {section:"tech",title:"Tech"},
                {section:"support",title:"Support"},
                {section:"travel",title:"Travel"},].map((el)=>{
                return {type: MenuItem, title:el.title, section:el.section}
            });

            this._currentActive = 0;
            this._previousActive = 0;

        }

        get list() {
            return this.tag('MenuItems').childList.get();
        }

        get active() {
            return this.list[this._currentActive];
        }


        get previousSelectedActive() {
            return this.list[this._previousSelectedFocus];
        }


        reveal() {
            this.patch({
                smooth: {x: 0}
            });
        }


        _handleRight() {
            if (this._currentActive < this.list.length - 1) {
                this._previousActive = this._currentActive;
                this._currentActive ++;
            }
        }
        _handleLeft() {
            if (this._currentActive > 0) {
                this._previousActive = this._currentActive;
                this._currentActive --;
            }
        }

        _handleEnter() {
            //handling the api firing
            if(this._previousSelectedFocus) {
                this._unselected = this.previousSelectedActive;
                this._unselected.deUnSelect();
            }
            this.active.isSelected = true;
            this._selected = this.active;
            if(this._selected){
                this._selected.deSelect();
                this._previousSelectedFocus = this._currentActive;
            }

            return false;
        }

        _getFocused() {
            return this.active;
        }

    }


    Menu.COLORS = {
        BACKGROUND: 0xff101010
    };

    class Details extends lng.Component{

        static _template(){
            return {

                Wrapper: {
                    alpha: 0,
                    Overlay : {
                        rect:true,w:1920,h:1080,x:0,y:0,colorLeft: 0xff000000, colorRight: 0x00000000,
                    },
                    Container: {
                        h: 1080, w: 980, x: 300, y: 0, rect: true, color: 0xff303030,
                        Image: {
                            w: 980,
                            h: 550,
                            y: 0,
                        },
                        PlayImage : {rect: true, color: 0xffCB0000, w: 100, h: 100, x: 419,y:215,
                            Img: {src: App.getPath('images/play_small.png'), x:37,y:30,w: 30, h: 45,},
                        },
                        Time: {
                            rect: true, color: 0xff202020, w: 282, h: 50, x: 74, y: 550,
                            Label: {
                                x: 20, y: 9, color: 0xffF1F1F1, text: {text: '00:00:00', fontSize: 26}
                            },
                        },
                        Title: {
                            w: 840, x: 70, y: 634, h: 120, color: 0xffF1F1F1, text: {fontSize: 42},
                        },
                        Description: {
                            w: 840, x: 70, y: 771, h: 192, text: {fontSize: 26}, color: 0xff909090,
                        }
                    }
                }
            }
        }
        _handleEnter() {
                this.fireAncestors('$play', {
                    item: this._item
                }, true);

        }


        _reveal(value) {
            //method to hide or unhide details page
            this.patch({
                Wrapper: {alpha: value}
            });
        }
        set item(v) {
            this._item = v;
            this.patch({
                Wrapper: {
                    Container: {
                        Image: {
                            src: v.thumbPicture
                        },
                        Title: {
                            text: {text: v.title}
                        },
                        Description: {
                            text: {text: v.description}
                        },
                        Time: {
                            Label: {
                                text: {text: App.formatAMPM(v.publishdate)}
                            }
                        }
                    }
                }
            });
        }

        _init(){
            this._index = 0;
        }

        get active(){
            return this.tag('Details');
        }
        _focus() {
            this._reveal(1);
        }


    }

    class Main extends lng.Component {

        static _template() {
            return {
                Menu: {
                    alpha:1,
                    type: Menu,
                },
                Content: {
                    x: 100, y:370,w: 1770,
                    type: Content
                },
                Loader: {
                    src: App.getPath('images/cnn_logo.png'), x: 850, y: 467, w: 170, h: 169
                },
                Details:{
                    type:Details,w:1920,h:1080,x:0,y:0
                }
            };
        }


        _setup() {
            this._loader = this.animation({
                duration: 2, repeat: -1, stopMethod: 'immediate', actions: [
                    {p: 'alpha', t: 'Content', rv: 1, v: {0: 0, 1: 0}},
                    {p: 'alpha', t: 'Menu', rv: 1, v: {0: 0, 1: 0}},
                    {p: 'y', t: 'Loader', rv: 450, v: {0: 450, 0.5: 440, 1: 450}}
                ]
            });

            this._loader.on('stop', () => {
                this.tag('Loader').setSmooth('alpha', 0);
            });
        }

        _init() {
            this._setState("Loading");
        }
        _loaded(data) {
            this.tag("Content").menuItemSelected(data);
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
                class Content$$1 extends this {
                    _getFocused() {
                        return this.tag('Content');
                    }
                    $enter(context) {
                        this._returnState = context.prevState;
                    }
                    _handleUp() {
                        this._setState("Menu");
                    }
                },
                class Details$$1 extends this {
                    _getFocused() {
                        return this.tag('Details');
                    }
                    _handleBack() {
                        this.closeDetails();
                    }
                    _handleRight() {

                        if(this._index<this._items.length-1) {
                            this._index ++;
                            const item = this._items[this._index];
                            this.tag("Details").item = item;
                            this._setState("Details");
                        }

                    }
                    _handleLeft() {

                        if(this._index>0) {
                            this._index --;
                            const item = this._items[this._index];
                            this.tag("Details").item = item;
                            this._setState("Details");
                        }

                    }
                    closeDetails() {

                        this._setState("Content");
                        this.tag('Details')._reveal(0);
                    }

                },
                class Menu$$1 extends this {
                    $enter(context) {
                        this._returnState = context.prevState;
                    }
                    _handleDown() {
                        this._setState(this._returnState);
                    }
                    _handleEnter() {

                        const api = this.fireAncestors('$getApi');
                        const active = this.tag("Menu").active;
                        api.fetchDataBySection(active.section).then((data) => {
                            this._loaded(data);
                            this._setState(this._returnState);
                        }).catch(err => console.error(err));

                    }
                    _getFocused() {
                        return this.tag('Menu');
                    }
                }
            ];
        }


        $loadDetails({item},{items},{index}){
            this.tag("Details").item = item;
            this._items = items;
            this._index = index;
            this._setState("Details");

        }
        getData() {
            return this._items;
        }


        _setFocusSettings(settings) {
            settings.clearColor = App.COLORS.BACKGROUND;
        }
    }

    class PlayerButton extends lng.Component {

        static _template() {
            return {
                Icon: {
                    x: 714, y:200 ,
                    Background : {
                        alpha:0,rect:true,w:100,h:100,color:0xffCB0000,x: -25, y:-30,
                    },
                    Icons: {w: 52, h: 40}

                },

            };
        }

        set icon(icon) {
            this._icon = icon;
            this.tag("Icons").patch({
                src: icon});
        }

        set active(v) {
            this._isActive = v; 


        }

        get active() {
            return this._isActive;
        }

        _focus() {
            this._focused = true;
            this.tag("Background").patch({smooth: {alpha: 1}});
            this._setState("Selected");
        }

        _unfocus() {
            this._focused = false;
            this.tag("Background").patch({smooth: {alpha: 0}});
            this._setState("");
        }


        static _states() {
            return [
                class Selected extends this {
                    $enter() {
                        this.tag("Background").patch({smooth: {alpha: 1}});
                    }
                    $exit() {

                    }
                }
            ]
        }

    }

    class PlayerControls extends lng.Component {

        static _template() {
            return {
                Buttons: {
                    Previous: {x: -108, type: PlayerButton, icon: App.getPath('images/player/prev.png')},
                    Rewind: {type: PlayerButton, icon: App.getPath('images/player/rewind.png')},
                    Play: {x: 108, type: PlayerButton, icon: App.getPath('images/player/pause.png')},
                    Forward: {x: 216, type: PlayerButton, icon: App.getPath('images/player/forward.png')},
                    Next: {x: 314, type: PlayerButton, icon: App.getPath('images/player/next.png')},

                },
                Title : {
                    w:1520,height:120,
                    text : {fontSize:32,maxLines: 2,color: 0xff101010,mount:0.5}
                },

                };
        }

        _init() {

            //list all buttons
            this.showButtons(false, false,false,false);
            this._setState("Play");

        }

        showButtons(prev,rewind, forward,next) {
            let buttons = [];
            if (prev) buttons.push("Previous");
            if (rewind) buttons.push("Rewind");
            buttons = buttons.concat("Play");
            if (forward) buttons.push("Forward");
            if (next) buttons.push("Next");
            this._saveButtons(buttons);
        }

        _saveButtons(buttons) {
            this._activeButtons = [];
                this.tag("Buttons").children.map(button => {
                    button.active = (buttons.indexOf(button.ref) !== -1);
                    if (button.active) {
                        this._activeButtons.push(button);
                    }
                });


            this._checkActiveButton();
        }
        set title(title) {
            this.tag("Title").text = (title || "").toUpperCase();
        }


        get _currentIndex() {
            let button = this.tag("Buttons").getByRef(this._getState());
            if (!button.active) {
                button = this.tag("Play");
            }
            return this._activeButtons.indexOf(button);
        }

        get _currentActiveButton() {
            return this._activeButtons[this._currentIndex];
        }
        

        _setup() {
            this._setState("Play");
        }


        _checkActiveButton() {
            // After changing the active buttons, make sure that an active button is selected.
            let index = this._currentIndex;
            if (index === -1) {
                if (this._index >= this._activeButtons.length) {
                    this._index = this._activeButtons.length - 1;
                }
            }
            this._setState(this._activeButtons[index].ref);
        }

        _handleLeft() {
            let index = this._currentIndex;
            if (index > 0) {
                index--;
            }
            this._setState(this._activeButtons[index].ref);
        }

        _handleRight() {
            let index = this._currentIndex;
            if (index < this._activeButtons.length - 1) {
                index++;
            }
            this._setState(this._activeButtons[index].ref);
        }

        _handleEnter() {
            this.signal('press' + this._currentActiveButton.ref);
        }


        set paused(v) {
            this.tag("Play").icon = v ? App.getPath('images/player/play.png') : App.getPath('images/player/pause.png');
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

    class PlayerProgress extends lng.Component {

        static _template() {
            return {
                Progress: {
                    Total: {
                        texture: lng.Tools.getRoundRect(1720, 6, 0), color: 0xff808080
                    },
                    Active: {color: 0xffF1F1F1},
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
                zIndex: 2,
                Controls: {
                    x: 200, y: 745, type: PlayerControls, signals: {pressPlay: true, pressRewind: true,pressForward: true,pressPrevious: true, pressNext: "_pressNext"}
                },
                Progress: {
                    x: 100, y: 894, type: PlayerProgress
                }
            };
        }

        _setItem(item) {
            this._item = item;
            this.tag("Progress").setProgress(0, 0);
            this._stream = item.stream;
            this.tag("Controls").title = item.title;

            this._index = this._items.indexOf(item);
            this.tag("Controls").showButtons(this._index > 0, true,true,this._index < this._items.length - 1);
            this.application.updateFocusSettings();
        }

        static formatTime(seconds) {
            return Math.floor(seconds / 60) + " min";
        }

        _setInterfaceTimeout() {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(() => {
                this._hide();
            }, 8000);
        }

        _init() {
            this._setState("Controls");
        }

        _focus() {
            this._setInterfaceTimeout();
        }

        _unfocus() {
            clearTimeout(this._timeout);
        }

        $mediaplayerEnded() {
            this._pressNext();
        }

        play({item, items}) {
            this._items = items;
            this._setItem(item);
            return !!this._stream;
        }

        pressPrevious() {
            const index = this._index - 1;
            if (index < 0) {
                this._index = this._items.length - 1;
            }
            this._setItem(this._items[index]);
        }

        pressRewind() {
            this.application.mediaplayer.seek(-10);
        }

        pressForward() {
            this.application.mediaplayer.seek(10);
        }

        _pressNext() {
            if (!this._items.length) {
                return this.signal('playerStop');
            }
            const index = (this._index + 1) % this._items.length;
            this._setItem(this._items[index]);
        }

        pressPlay() {
            this.application.mediaplayer.playPause();
        }

        $mediaplayerPause() {
            this.tag("Controls").paused = true;
        }

        $mediaplayerPlay() {
            this.tag("Controls").paused = false;
        }

        $mediaplayerStop() {
            this.signal('playerStop');
        }

        $mediaplayerProgress({currentTime, duration}) {
            if(!this.tag("Controls").duration) this.tag("Controls").duration = duration;
            this.tag("Progress").setProgress(currentTime, duration);
        }

        _captureKey() {
            this._setInterfaceTimeout();
            return false;
        }

        _hide() {
            this._setState("Hidden");
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
                class Controls extends this {
                }
            ];
        }

        _getFocused() {
            return this.tag("Controls");
        }

        getMediaplayerSettings() {
            return {
                stream: {src: this._stream.link}
            };
        }

    }

    class MediaItem {
        constructor(obj) {
            this.$ = obj;
        }

        get title() {
            return this.$.headline;
        }

        get pictures() {
            return this.$.relatedMedia.media[0].cuts;
        }

        get MediaplayerItem() {
            return {title: this.title, stream: {link: this.$.cdnUrls.ios_1240}}
        }

        get thumbPicture() {
            let pictures = this.pictures;
            return this.pictures.c1Main.url;

        }


        get largePicture() {
            let pictures = this.pictures;
            return this.pictures.exlarge16to9?this.pictures.exlarge16to9.url:this.pictures.large16to9.url;
        }

        get publishdate() {
            return this.$.firstPublishDate;
        }
        get description() {
            return this.$.description[0].plaintext;
        }

    }

    class Api {
        constructor() {

            this._endpoints = {
                base: 'https://services.cnn.com/newsgraph/search/topicLabel_exact:',
                us: 'united%20states/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                politics : 'politics/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                europe : 'europe/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                asia : 'asia/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                americas : 'latin%20america/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                entertainment : 'arts%20and%20entertainment/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                tech : 'technology/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                sport : 'Sports and recreation/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
                travel : 'Travel and tourism/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
            };
        }

        _send(url) {
            return fetch(this._getUrl(url)).then(r => r.json());
        }

        _getUrl(url) {
            return `${Api.METROLOICAL_CDN}${this._endpoints.base}${url}`;
        }

        fetchDataBySection(key){
            if(this._endpoints.hasOwnProperty(key)){
                return this._send(`${this._endpoints.base}${this._endpoints[key]}`).then(({docs = []}) => {
                    if (!docs.length) {
                        return Promise.reject('returned no data');
                    }
                    return Promise.resolve(
                        docs.map(video => new MediaItem(video))
                    );
                });        }
        }

     }
    Api.METROLOICAL_CDN = 'https://cdn.metrological.com/proxy?url=';

    class App extends ux.App {

        static _template() {
            return {
                Player: {type: Player, alpha: 0, signals: {playerStop: true}},
                Main: {type: Main}
            };
        }

        _construct() {
            this._api = new Api();
        }

        $getApi() {
            return this._api;
        }


        _init() {
            this._setState("Main");
        }

        $play({item, items}) {
            const player = this.tag('Player');
            this._items = this.tag('Main').getData();
            const playlist = {item: item.MediaplayerItem, items: this._items.map(item => item.MediaplayerItem)};
            if (player.play(playlist)) {
                this._setState("Playing");
            }
        }
        static _states() {
            return [
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

        _setFocusSettings(settings){
            if(this.state === "Playing"){
                settings.mediaplayer.consumer = this.tag("Player");
            }
        }


        static cropImage({url, w, h}) {
            return ux.Ui.getImageUrl(url, {width: w, height: h, type: 'crop'});
        }
        static formatAMPM(date) {
            const d = new Date(date);
            const time =  d.toLocaleString('en-US',{hour:'2-digit', minute:'2-digit', hour12:true});
            return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${time}`
        }

    }

    App.COLORS = {
        BACKGROUND: 0xff272727
    };

    return App;

}());
