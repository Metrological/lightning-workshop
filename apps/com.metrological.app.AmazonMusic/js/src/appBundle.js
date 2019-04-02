var appBundle = (function () {
    'use strict';

    class ItemWrapper extends lng.Component {
        static _template() {
            return {
                clipbox: true,
                w: 690,
                h: 600
            };
        }

        set construct(v){
            this._construct = v;
        }

        set item(obj) {
            this._item = obj;
        }

        get item() {
            return this._item;
        }

        get child(){
            return this.children[0];
        }

        create() {
            const item = this._item;
            this.children = [{type: this._construct, item: item}];

            if(!ItemWrapper.FIRST_CREATED){
                ItemWrapper.FIRST_CREATED = true;
                this.fireAncestors("$firstItemCreated");
            }

        }

        _firstActive() {
            this.create();
        }

        _getFocused() {
            return this.child;
        }
    }

    ItemWrapper.FIRST_CREATED = false;

    class List extends lng.Component{
        static _template(){
            return {
                transitions: {alpha: {duration: .6}},
                Title: {
                    color: 0x50ffffff, transitions: {color: {duration: .6}, y: {duration: .6}, x: {duration: .6}, alpha: {duration: .3}},
                    text: {fontSize: 32, fontFace: "Bold"}
                },
                Items: {
                    forceZIndexContext: true,
                    boundsMargin: [300, 520, 100, 300],
                    y: 68, transitions: {y: {duration: .6}, x: {duration: .6}}
                }
            }
        }

        get index() {
            return this._index
        }

        get active() {
            return this.tag("Items").children[this._index]
        }

        get getRealComponent(){
            return this.active.child;
        }

        get items(){
            return this.tag("Items").children[this._index].items;
        }

        get rootUrl(){
            return this._rootUrl;
        }

        set rootUrl(v){
            this._rootUrl = v;
        }

        set construct(v){
            this._construct = v;
        }

        set title(v) {
            this.tag("Title").patch({
                text: {text: v.toUpperCase()}
            });
        }

        set items(v){
            let construct = this._construct;
            this._items = v;
            this.tag("Items").patch({
                children: v.map((item, index) => {
                        return {
                        type: ItemWrapper,
                        construct: this._construct,
                        index: index,
                        item: item,
                        x: index * construct.width,
                        transitions: {
                            x: {delay: .06 * index, duration: .6}
                        }
                    }
                })
            });
        }

        _scroll(v, activeIndex=this._index) {
            const {width, space, contentWidth} = this._construct;
            for (let i = 0; i < this._listItems.length; i++) {
                const item = this._listItems[i];
                if (i >= activeIndex + 1 && i < activeIndex + 5) {
                    item.setSmooth("x", (i * width) + (v ? contentWidth : space), {delay: 0, duration: .6});
                    item.setSmooth("alpha", v ? 0 : 1, {delay: 0, duration: .6});
                } else {
                    item.setSmooth("x", i * width, {delay: 0, duration: .6});
                    item.setSmooth("alpha", v && i !== this._index ? 0 : 1, {delay: 0, duration: .6});
                }
            }
            if(!v && this._index >= 1) {
                this.tag("Items").setSmooth("x", -((activeIndex - 1) * width));
            } else {
                this.tag("Items").setSmooth("x", -(activeIndex * width));
            }
        }

        _reset() {
            const {width} = this._construct;
            for (let i = 0; i < this._listItems.length; i++) {
                const item = this._listItems[i];
                item.setSmooth("x", i * width, {delay: 0, duration: .6});
            }
        }
        next(){
            this._select({index: 1});
            this.fireAncestors("$selectItem", {item: this.active.item, list: this});
        }

        previous(){
            this._select({index: -1});
            this.fireAncestors("$selectItem", {item: this.active.item, list: this});
        }

        loadingReady(){
            this.active.child.stopLoading();
        }

        _init() {
            this._listItems = this.tag("Items").children;
            this._index = 0;

            this._setState("Collapsed");
        }

        _focus() {
            this.patch({
                Title: {smooth: {alpha: 1, color: 0xffffffff}}
            });
            this._scroll();
        }

        _handleLeft() {
            if (this._index > 0) {
                this._select({index: -1});
            }
        }

        _handleRight() {
            if (this._index < this._listItems.length - 1) {
                this._select({index: 1});
            }
        }

        _handleEnter(){
            this.fireAncestors("$selectItem", {item: this.active.item, list: this});
            this._setState("Loading");
        }

        _select({index}) {
            this._index += index;

            this._scroll();
            this.active.child.rotateVinyl(index);
        }

        collapse(){
            this._setState("Collapsed");
    }

        expand() {
            this._setState("Expanded");
        }

        _unfocus() {
            this.patch({
                Title: {smooth: {y: 0, color: 0x50ffffff}}
            });
            this._reset();
        }

        static _states(){
            return [
                class Loading extends this {
                    $enter() {
                        this.active.child.startLoading();
                    }
                    $exit() {
                        this.active.child.stopLoading();
                    }
                },
                class Collapsed extends this {

                },
                class Expanded extends this {
                    $enter() {
                        this._scroll(true);
                        this.patch({
                            Title: {smooth: {alpha: 0}}
                        });
                    }
                }
            ];
        }

        $getListState() {
            return this.state
        }

        _getFocused(){
            return this.active
        }

        static get height(){
            return 690;
        }
    }

    class TrackWrapper extends lng.Component {
        static _template() {
            return {
                clipbox: true,
                w: 1200,
                h: 200
            };
        }

        set construct(v){
            this._construct = v;
        }

        set item(obj) {
            this._item = obj;
        }

        get item() {
            return this._item;
        }

        get child(){
            return this.children[0];
        }

        create() {
            const item = this._item;
            this.children = [{type: this._construct, item: item}];
        }

        _firstActive() {
            this.create();
        }

        _getFocused() {
            return this.child;
        }
    }

    class Tracklist extends lng.Component{
        static _template(){
            return {
                transitions: {alpha: {duration: .6}},
                Title: {
                    color: 0x50ffffff, transitions: {color: {duration: .6}, y: {duration: .6}, x: {duration: .6}, alpha: {duration: .3}},
                    text: {fontSize: 32, fontFace: "Bold"}
                },
                Items: {
                    forceZIndexContext: true,
                    boundsMargin: [300, 520, 100, 300],
                    y: 68, transitions: {y: {duration: .6}, x: {duration: .6}}
                }
            }
        }

        _init() {
            this._index = 0;
            this._listItems = this.tag("Items").children;
        }

        get index() {
            return this._index
        }

        get active() {
            return this.tag("Items").children[this._index]
        }

        get items() {
            return this.tag("Items").children
        }

        set rootUrl(v){
            this._rootUrl = v;
        }

        get rootUrl(){
            return this._rootUrl;
        }

        get construct(){
            return this._construct;
        }

        set construct(v){
            this._construct = v;
        }

        set title(v) {
            this.tag("Title").patch({
                text: {text: v.toUpperCase()}
            });
        }

        set items(v){
            let construct = this._construct;
            this._items = v;
            this.tag("Items").patch({
                children: v.map((item, index) => {
                    return {
                        type: TrackWrapper,
                        construct: this._construct,
                        index: index,
                        item: item,
                        x: ~~(index / Tracklist.ITEMS_PER_COLUMN) * construct.width,
                        y: (index % Tracklist.ITEMS_PER_COLUMN) * construct.height,
                        transitions: {
                            x: {delay: .06 * index, duration: .6}
                        }
                    }
                })
            });
        }

        _scroll(activeIndex=this._index) {
            let offset = ~~(activeIndex / (Tracklist.ITEMS_PER_COLUMN * 2)) * 872;
            this.patch({
                Items:{smooth:{x: -offset * 2}}
            });
        }

        _reset() {

        }

        _focus() {
            this.patch({
                Title: {smooth: {alpha: 1, color: 0xffffffff}}
            });
            this._scroll();
            this._select({index: this._index});
        }

        _unfocus() {
            this.patch({
                Title: {smooth: {y: 0, color: 0x50ffffff}}
            });
        }

        _handleLeft() {
            const newIndex = this._index - Tracklist.ITEMS_PER_COLUMN;
            if (newIndex > 0) {
                this._select({index: newIndex});
            }else{
                this._select({index: 0});
            }
        }

        _handleRight() {
            const newIndex = this._index + Tracklist.ITEMS_PER_COLUMN;
            const max = this.items.length - 1;
            if (newIndex < max) {
                this._select({index: newIndex});
            }else{
                this._select({index: max});
            }
        }

        _handleUp(){
            const relativeIndex = this._index % Tracklist.ITEMS_PER_COLUMN;
            if (relativeIndex > 0) {
                this._select({index: this._index-1});
            }else{
                return false
            }
        }

        _handleDown(){
            const relativeIndex = this._index % Tracklist.ITEMS_PER_COLUMN;
            const newIndex = this._index + Tracklist.ITEMS_PER_COLUMN;
            const max = this.items.length + 1;
            if (newIndex < max && relativeIndex < Tracklist.ITEMS_PER_COLUMN - 1) {
                this._select({index: this._index+1});
            }else{
                return false
            }
        }

        _handleEnter(){
            this.fireAncestors("$play", {
                sourceList: this,
                items: this._items,
                index: this._index,
                keepPlayerState:true
            });
        }

        _select({index}) {
            const activeColumn = ~~(this._index /(Tracklist.ITEMS_PER_COLUMN * 2));
            const newColumn = ~~(index /(Tracklist.ITEMS_PER_COLUMN * 2));
            this._index = index;

            if(activeColumn !== newColumn){
                this._scroll();
            }
        }

        _getFocused(){
            return this.active
        }

        static get height(){
            return 550;
        }
    }

    Tracklist.ITEMS_PER_COLUMN = 3;

    class Tools{

        static getFullTime(sec) {
            const minutes = ~~((sec % 3600) / 60);
            const seconds = ~~sec % 60;
            return `${minutes}:${seconds<10?`0${seconds}`:seconds}`;
        }

        static extractCommonColor(texture, gl, lng, {offset=90,step=60}){
            const fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D, texture, 0);

            const tmp = new Uint8Array(4);

            let colors = [];
            for (let i = offset, n = texture.w - offset; i < n; i += step) {
                for (let j = offset, o = texture.h - offset; j < o; j += step) {
                    gl.readPixels(j, i, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, tmp);
                    colors.push(lng.StageUtils.getArgbNumber(tmp));
                }
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(fb);

            const filtered = colors.filter(color => {
                return color>4283190348
            });

            const availableColors = filtered.length ? filtered : colors;

            if(!filtered.length){
                return colors.sort((a,b)=>{
                    return a>b?1:-1
                }).pop()
            }else{
                return availableColors.sort((a,b) =>
                    availableColors.filter(v => v===a).length
                    - availableColors.filter(v => v===b).length
                ).pop();
            }
        }
    }

    class Loader extends lng.Component{
        static _template(){
            return  {
                Overlay: {w: 400, h: 400, mount: .5, y: 200, x: 200, rect: true, colorTop: 0x00000000, colorBottom: 0xaa000000},
                Loader: {y: 394, h: 6, w: 0, mountX: 0, rect: true, color: 0xffffffff}
            }
        }

        _init() {
            this._loaderAnimation = this.tag("Loader").animation({duration: 5, delay: .2, repeat: -1, actions: [
                    {t: '', p: 'w', v: {0: 5, .25: 400, .5: 5, .75: 400, 1: 5, sm: 0}},
                    {t: '', p: 'x', v: {0: 0, .25: 0, .5: 395, .75: 0, 1: 0, sm: 0}}
                ]});
        }

        _active() {
            this._loaderAnimation.start();
        }

        _inactive() {
            this._loaderAnimation.stop();
        }
    }

    class Equalizer extends lng.Component{
        static _template(){
            return {
                Bars:{
                }
            }
        }

        _init(){
            let bars = [];
            for(let i = 0; i < Equalizer.BARS; i++){
                bars.push({
                    type: Bar, x: i * 10, ref:`Bar-${i}`
                });
            }
            this.tag("Bars").children = bars;
        }
    }

    Equalizer.BARS = 3;

    class Bar extends lng.Component{
        static _template(){
            return {
                rect: true, w:5, h:4, y:20, color:0xffffffff, mountY:1
            }
        }
        _init(){
            const duration =  (Math.random()*.2) + .6;
            const height = ~~(Math.random()*18) + 8;
            this._barAnimation = this.animation({
                duration, delay:0, repeat: -1, actions:[
                    {p:"h",rv:1,v:{0:4,0.5:height,1:4}}
                ]
            });
            this._barAnimation.start();
        }
        _detach(){
            this._barAnimation.stop();
        }
    }

    /**
     * @todo: re-use animations
     */


    class LPCover extends lng.Component{
        static _template(){
            return  {
                Item: {
                    w: 400, h: 400, transitions: {x: {duration: .6}, y: {duration: .6}},
                    Glow: {x: -200, y: -200, alpha: 0, src: App.getPath("images/glow.png"), transitions: {alpha: {duration: .6}}},
                    Shadow: {
                        alpha: 0,
                        y: 354, x: -38, src: App.getPath("images/cover-shadow.png")
                    },
                    Vinyl: {
                        rotation: .4, pivot: .5, w: 400, h: 400, alpha: 0, rtt: true,
                        Inner: {x: 200, y: 200, w: 200, h: 200, mount: .5},
                        Outer: {w: 400, h: 400, src: App.getPath("images/vinyl.png")}
                    },
                    Cover: {
                        w: 400, h: 400,
                        InnerCover: {
                            texture: lng.Tools.getRoundRect(394, 394, 4, 0, 0x00000000, true, 0xffffffff), alpha: 0, colorTop: 0xffe9e6d0, colorBottom: 0xffffffff, y: 3
                        },
                        Holder: {
                            VinylShadow: {
                                alpha: 0,
                                x: 400, src: App.getPath("images/vinyl-shadow.png")
                            },
                            Rtt: {w: 405, h: 400, rtt: true,
                                Image: {w: 400, h: 400},
                                Overlay: {w: 400, h: 400, src: App.getPath("images/vinyl-overlay.png")}
                            }
                        }
                    },
                    Loader: {type: Loader, alpha: 0}
                },
                Details: {y: 410,
                    Title: {
                        alpha: 1, transitions: {alpha: {duration: .6}},
                        text: {fontSize: 32, fontFace: "Bold", wordWrapWidth: 420, maxLines: 1, lineHeight: 40},
                    },
                    Subtitle: {
                        alpha: 1, color: 0x50ffffff, y: 42, transitions: {alpha: {duration: .6}},
                        text: {fontSize: 28, fontFace: "Regular", wordWrapWidth: 420, maxLines: 1},
                    }
                }
            }
        }

        _active() {
            if (!this._glowAnimation) {
                this._glowAnimation = this.tag("Glow").animation(
                    this.fireAncestors("$getGlowAnimationSettings")
                );
            }
        }

        _focus() {
            // delay color exposing to prevent it from reading pixels
            // while quick navigating
            this._timeout = setTimeout(()=>this._exposeColor(), 800);

            this.setFocus(true);
            if (this._stationAnimation) {
                this._stationAnimation.start();
            }
        }

        _unfocus() {
            clearTimeout(this._timeout);
            const state = this.fireAncestors("$getListState");
            if (state !== "Expanded") {
                this.setFocus(false);
                this._glowAnimation.stop();
                if (this._stationAnimation) {
                    this._stationAnimation.stop();
                }
            } else {
                this.patch({
                    Item: {
                        Vinyl: {
                            smooth: {x: [0, {duration: .6}]}
                        },
                        Cover: {
                            InnerCover: {smooth: {x: [0, {duration: .6}]}}
                        }
                    }
                });

                if (this.tag("Equalizer")) {
                    this.patch({
                        Details: {
                            Title: {smooth: {x: [0, {duration: .3}]}},
                            Equalizer: {smooth: {alpha: [0, {duration: .3}]}}
                        }
                    });
                }
            }
        }

        set index(v) {
            this._index = v;
        }

        set item(v) {
            this._item = v;

            this.patch({
                Item: {
                    Vinyl: {
                        Inner: {src: ux.Ui.getImageUrl(`${v.image.source}`, {width: 500, height: 500, type: 'crop'})}
                    },
                    Cover: {
                        Holder: {
                            Rtt: {
                                Image: {src: ux.Ui.getImageUrl(`${v.image.source}`, {width: 500, height: 500, type: 'crop'})}
                            }
                        }
                    }
                },
                Details: {
                    Title: {text: {text: v.title}},
                    Subtitle: {text: {text: v.subtitle ? v.subtitle : v.artist ? v.artist.name : ""}}
                }
            });

            this._itemType = v.constructor.name;
            if (this._itemType === "Station") {
                this.patch({
                    Item: {
                        __create: true,
                        Station: {
                            texture: lng.Tools.getRoundRect(70, 70, 35, 0, 0x00000000, true, 0xdd000000),
                            x: 15, y: 315,
                            Icon: {
                                Center: {mount: .5, x: 35, y: 35, src: App.getPath("images/station/center.png")},
                                Inner: {mount: .5, x: 35, y: 35, src: App.getPath("images/station/inner.png")},
                                Outer: {mount: .5, x: 35, y: 35, src: App.getPath("images/station/outer.png")}
                            }
                        }
                    },
                    Details: {
                        Subtitle: {text: {text: "Station"}}
                    }
                });

                this._stationAnimation = this.tag("Station").animation({duration: 2, repeat: -1, actions: [
                    {t: 'Icon.Inner', p: 'alpha', rv: 1, v: {0: 0, .4: 1, .6: 1, 1: 0}},
                    {t: 'Icon.Outer', p: 'alpha', rv: 1, v: {.2: 0, .6: 1, 1: 0}}
                ]});
            }

        }

        get item() {
            return this._item
        }

        rotateVinyl(dir) {
            this.tag("Vinyl").animation({duration: .6, stopMethod: "reverse", actions: [
                {t: '', p: 'rotation', v: {0: {v: Math.PI * (dir * .5)}, 1: {v: .4}}}
            ]}).start();
        }

        setFocus(v) {
            this.patch({
                Item: {
                    Vinyl: {
                        smooth: {alpha: v ? [1, {delay: 0}] : [0, {delay: .6}], x: [v ? 200 : 0, {duration: .6}]}
                    },
                    Shadow: {
                        smooth: {alpha: [v ? .7 : 0, {duration: .6}]}
                    },
                    Cover: {
                        InnerCover: {smooth: {alpha: [v ? .9 : 0, {delay: v ? 0 : .6, duration: 0}], x: [v ? 30 : 0, {duration: .6}]}},
                        Holder: {
                            VinylShadow: {smooth: {alpha: [v ? .4 : 0, {duration: .6}]}}
                        }
                    }
                }
            });

            if (this.tag("Equalizer")) {
                this.patch({
                    Details: {
                        Title: {smooth: {x: [48, {duration: .3}]}},
                        Equalizer: {smooth: {alpha: [1, {duration: .3}]}}
                    }
                });
            }
        }

        startLoading() {
            this.tag("Loader").setSmooth("alpha", 1, {duration: .3});
        }

        stopLoading() {
            this.tag("Loader").setSmooth("alpha", 0, {duration: .3});
        }

        exposeColor({color}){
            this.fireAncestors("$changeAmbient", {color, item: this});
        }

        _exposeColor(){
            if (!this._commonColor) {
                this._commonColor = this._getCommonColor();
                this.tag("Glow").color = this._commonColor;
            }
            if (this._commonColor !== undefined) {
                this._glowAnimation.start();
                this.exposeColor({color:this._commonColor});
            }
        }

        _getCommonColor(){
            const image = this.tag("Image");
            const gl = this.stage.gl;
            if(gl){
                const texture = image.texture.source.nativeTexture;
                return Tools.extractCommonColor(texture, gl, lng,{offset:90, step:60});
            }
        }

        /**
         * Gets called when the player starts playing the attached Item
         */
        /**
         * Gets called when the player starts playing the attached Item
         */
        onPlayStart(){
            this.patch({
                __create: true,
                Details: {
                    Title: {smooth: {x: [this._itemType === "Station" ? 48 : 0, {duration: .3}]}},
                    Equalizer:{
                        y: 11, x: 3, alpha: this._itemType === "Station" ? 1 : 0,
                        type: Equalizer
                    }
                }
            });
        }

        /**
         * Gets called when the player stops playing the attached Item
         */
        onPlayerStop(){
            this.patch({
                Details: {
                    Title: {smooth: {x: [0, {duration: .6}]}}
                }
            });
            let item = this.tag("Equalizer");
            this.tag("Details").childList.remove(item);
        }

        /**
         * get called by the player when play/pause is pressed
         */
        onPlayPause(playerState){

        }

        static get width(){
            return 500;
        }

        static get space(){
            return 180;
        }

        static get contentWidth() {
            return 1180;
        }
    }

    class TrackSmall extends lng.Component{
        static _template(){
            return {
                alpha: 1, transitions: {alpha: {delay: .6, duration: .6}},
                Holder: {zIndex: 0, color: 0x15000000, texture: lng.Tools.getRoundRect(842, 110, 4, 0, 0x00000000, true, 0xffffffff)},
                Content: {
                    zIndex: 1,
                    x: 20, y: 15,
                    Cover: {y: 5},
                    Title: {color: 0x50ffffff, x: 100, text: {fontSize: 30, wordWrapWidth: 600, maxLines: 1, fontFace: "Bold"}},
                    Artist: {color: 0x50ffffff, x: 100, y: 44, text: {fontSize: 24, wordWrapWidth: 600, maxLines: 1, fontFace: "Regular"}},
                    Duration: {color: 0x50ffffff, y: 26, x: 802, mountX: 1, text: {fontSize: 24, fontFace: "Regular"}}
                }
            }
        }

        set delay(v) {
            this.patch({
                transitions: {y: {delay: v, duration: .6}, alpha: {delay: v, duration: .2}}
            });
        }

        set item(v) {
            this.patch({
                Content: {
                    Cover: {src: ux.Ui.getImageUrl(v.image.source, {width: 70, height: 70, type: 'crop'})},
                    Title: {text: {text: `${v.title}`}},
                    Artist: {text: {text: `${v.artist.name}`}},
                    Duration: {text: {text: `${Tools.getFullTime(v.duration)}`}}
                }
            });
        }

        _focus() {
            // delay color exposing to prevent it from reading pixels
            // while quick navigating
            this._timeout = setTimeout(()=>this._exposeColor(), 800);

            this.patch({
                Holder: {smooth: {color: 0x20ffffff}},
                Content: {
                    Title: {smooth: {color: 0xfff1f1f1}},
                    Artist: {smooth: {color: 0x90ffffff}},
                    Duration: {smooth: {color: 0xfff1f1f1}}
                }
            });
        }

        _unfocus() {
            clearTimeout(this._timeout);
            this.patch({
                Holder: {smooth: {color: 0x15000000}},
                Content: {
                    Title: {smooth: {color: 0x50ffffff}},
                    Artist: {smooth: {color: 0x50ffffff}},
                    Duration: {smooth: {color: 0x50ffffff}}
                }
            });
        }

        exposeColor({color}){
            this.fireAncestors("$changeAmbient", {color, item: this});
        }

        _exposeColor(){
            if (!this._commonColor) {
                this._commonColor = this._getCommonColor();
            }
            if (this._commonColor !== undefined) {
                this.exposeColor({color:this._commonColor});
            }
        }

        _getCommonColor(){
            const image = this.tag("Cover");
            const gl = this.stage.gl;
            if(gl){
                const texture = image.texture.source.nativeTexture;
                return Tools.extractCommonColor(texture, gl, lng,{offset:5, step:4});
            }
        }

        /**
         * Gets called when the player starts playing the attached Item
         */
        onPlayStart(){
            this.patch({
                __create: true,
                Equalizer:{
                    x: 724,
                    y: 43,
                    type: Equalizer
                }
            });
        }

        /**
         * Gets called when the player stops playing the attached Item
         */
        onPlayerStop(){
            let item = this.tag("Equalizer");
            this.childList.remove(item);
        }

        static get height(){
            return 120;
        }

        static get width(){
            return 872;
        }
    }

    class TracksObj {

        constructor({url, title}){
            this._rootUrl = url;
            this._title = title;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        get title(){
            return this._title;
        }

        get rootUrl(){
            return this._rootUrl;
        }
    }

    class Albums{

        constructor({url, title}){
            this._rootUrl = url;
            this._title = title;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        get title(){
            return this._title;
        }

        get rootUrl(){
            return this._rootUrl;
        }
    }

    class Stations{

        constructor({url, title}){
            this._rootUrl = url;
            this._title = title;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        get title(){
            return this._title;
        }

        get rootUrl(){
            return this._rootUrl;
        }
    }

    class Playlists{

        constructor({url, title}){
            this._rootUrl = url;
            this._title = title;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        get title(){
            return this._title;
        }

        get rootUrl(){
            return this._rootUrl;
        }
    }

    class Art{
        constructor(props){
            this._source = props.uri;
            this._contentType = props.contentType;
            this._width = props.width;
            this._height = props.height;
            this._isIcon = props.isIcon;
        }

        get source(){
            return this._source;
        }

        get contentType(){
            return this._contentType;
        }

        get width(){
            return this._width;
        }

        get height(){
            return this._height;
        }

        get isIcon(){
            return this._isIcon;
        }
    }

    class AudioFile{

        constructor(props){
            this._source = props.uri;
            this._expires = props.expires;
            this._contentType = props.contentType;
        }

        get source(){
            return this._source;
        }

        get contentType(){
            return this._contentType;
        }

        get expires(){
            return this._expires;
        }

    }

    class TrackObj{

        constructor(props){
            this._audio = new AudioFile(props.audio);
            this._duration = props.duration;
            this._title = props.title;
            this._artist = props.artist;
            this._album = props.album.name;
            this._image = new Art(props.image);
            this._isExplicit = props.isExplicit;
        }

        get album(){
            return this._album;
        }

        get artist(){
            return this._artist;
        }

        get audio(){
            return this._audio;
        }

        get duration(){
            return this._duration / 1000;
        }

        get image(){
            return this._image;
        }

        get isExplicit(){
            return this._isExplicit;
        }

        get title(){
            return this._title;
        }
    }

    class Album{
        constructor(props, nav){
            if(nav){
                this._navigationUri = nav.description;
            }

            this._artist = props.artist;
            this._image = new Art(props.image);
            this._title = props.itemLabel;
            this._subtitle = props.subtitle;
        }

        get artist(){
            return this._artist;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }

        get subtitle(){
            return this._subtitle;
        }

        get navigationUri(){
            return this._navigationUri;
        }
    }

    class Station{
        constructor(props, nav){
            if(nav){
                this._navigationUri = nav.self;
            }

            this._image = new Art(props.image);
            this._title = props.itemLabel;
            this._subtitle = props.subtitle;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }

        get subtitle(){
            return this._subtitle;
        }

        get navigationUri(){
            return this._navigationUri;
        }
    }

    class Playlist{
        constructor(props, nav){
            if(nav){
                this._navigationUri = nav.description;
            }

            this._image = new Art(props.image);
            this._title = props.itemLabel;
            this._subtitle = props.subtitle;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }

        get subtitle(){
            return this._subtitle;
        }

        get navigationUri(){
            return this._navigationUri;
        }
    }

    class Factory{

        static create(data, stage){
            let spread = {y:0, signals:{changeAmbient: true, selectItem: true, play:true}};
            return data.map((obj)=>{
                const list = Factory.createList({
                    obj, stage, spread
                });
                if(list){
                    spread.y += list.constructor.height;
                    return list;
                }else{
                    return;
                }
            }).filter(Boolean)
        }

        static createList({obj, stage, spread={}}){
            const construct = obj.constructor;
            if(Factory.WRAPPER.has(construct)){
                const container = Factory.WRAPPER.get(construct);

                // test first item since we only allow items
                // of the same type in a list
                const item = obj.items[0];
                const iConstruct = item.constructor;

                if(obj.hasOwnProperty("_rootUrl")){
                    spread = {rootUrl: obj.rootUrl, ...spread};
                }

                if(Factory.ITEMS.has(iConstruct)){
                    const construct = Factory.ITEMS.get(iConstruct);
                    const item = stage.c({
                        type: container, construct, items: obj.items, title: obj.title, ...spread
                    });
                    return item;
                }
            }
            return;
        }
    }

    Factory.WRAPPER = new Map();
    Factory.WRAPPER.set(TracksObj,Tracklist);
    Factory.WRAPPER.set(Albums,List);
    Factory.WRAPPER.set(Stations,List);
    Factory.WRAPPER.set(Playlists,List);

    Factory.ITEMS = new Map();
    Factory.ITEMS.set(Album, LPCover);
    Factory.ITEMS.set(Playlist, LPCover);
    Factory.ITEMS.set(Station, LPCover);
    Factory.ITEMS.set(TrackObj, TrackSmall);

    class Track extends lng.Component{
        static _template(){
            return {
                alpha: 0, transitions: {alpha: {delay: .6, duration: .6}},
                Holder: {zIndex: 0, colorTop: 0x15000000, colorBottom: 0x15000000, texture: lng.Tools.getRoundRect(1020, 110, 4, 0, 0x00000000, true, 0xffffffff)},
                Content: {
                    zIndex: 1,
                    x: 20, y: 15,
                    Cover: {y: 5},
                    Title: {color: 0x50ffffff, x: 100, text: {fontSize: 30, wordWrapWidth: 770, maxLines: 1, fontFace: "Bold"}},
                    Artist: {color: 0x50ffffff, x: 100, y: 44, text: {fontSize: 24, wordWrapWidth: 770, maxLines: 1, fontFace: "Regular"}},
                    Duration: {color: 0x50ffffff, y: 26, x: 980, mountX: 1, text: {fontSize: 24, fontFace: "Bold"}}
                }
            }
        }

        set delay(v) {
            this.patch({
                transitions: {y: {delay: v, duration: .6}, alpha: {delay: v, duration: .2}}
            });
        }

        set index(v) {
            this._index = v;
        }

        set item(v) {
            this._item = v;

            this.patch({
                Content: {
                    Cover: {src: ux.Ui.getImageUrl(v.image.source, {width: 70, height: 70, type: 'crop'})},
                    Title: {text: {text: `${this._index + 1}. ${v.title}`}},
                    Artist: {text: {text: `${v.artist.name}`}},
                    Duration: {text: {text: `${Tools.getFullTime(v.duration)}`}}
                }
            });
        }

        get item() {
            return this._item
        }

        _active(){
            if(this.tag("Equalizer")){
                let app = this.fireAncestors("$getAppContents");
                if(this._isEqual(this._item, app.player.item)){
                    this.patch({
                        Equalizer:{smooth:{alpha:1}}
                    });
                }
            }
        }

        _inactive(){
            if(this.tag("Equalizer")){
                this.patch({
                    Equalizer:{smooth:{alpha:0}}
                });
            }
        }

        _focus() {
            this.patch({
                Holder: {smooth: {color: 0x20ffffff}},
                Content: {
                    Title: {smooth: {color: 0xfff1f1f1}},
                    Artist: {smooth: {color: 0x90ffffff}},
                    Duration: {smooth: {color: 0xfff1f1f1}}
                }
            });
        }

        _unfocus() {
            this.patch({
                Holder: {smooth: {color: 0x15000000}},
                Content: {
                    Title: {smooth: {color: 0x50ffffff}},
                    Artist: {smooth: {color: 0x50ffffff}},
                    Duration: {smooth: {color: 0x50ffffff}}
                }
            });
        }

        _isEqual(o1, o2){
            const {title:t1, audio:{source:s1}} = o1;
            const {title:t2, audio:{source:s2}} = o2;
            return t1 === t2 && s1 === s2;
        }

        /**
         * Gets called when the player starts playing the attached Item
         */
        /**
         * Gets called when the player starts playing the attached Item
         */
        onPlayStart(){
            this.patch({
                __create: true,
                Equalizer:{
                    x: 902,
                    y: 43,
                    type: Equalizer
                }
            });
        }

        /**
         * Gets called when the player stops playing the attached Item
         */
        onPlayerStop(){
            let item = this.tag("Equalizer");
            this.childList.remove(item);
        }

        /**
         * get called by the player when play/pause is pressed
         */
        onPlayPause(playerState){
            
        }

        static get height(){
            return 120;
        }

        static get width(){

        }
    }

    class Tracks extends lng.Component{
        static _template(){
            return {
                List:{
                    Clipper: {
                        Items: {}
                    }
                }
            }
        }

        get index(){
            return this._index;
        }

        get active() {
            return this.tag("Items").children[this._index]
        }

        get tracks(){
            return this.tag("Items").children;
        }

        set itemSize(v) {
            this._itemSize = v;
        }

        set item(v) {
            this._item = v;
        }

        set isPlaying(v){
            if(v){
                this._setState("Playing");
            }else{
                this._setState("Stopped");
            }
        }

        set tracks(v) {
            this._tracks = v;

            this.tag("Items").patch({
                children: this._tracks.map((item, index) => {
                    return {type: Track, ref: `A-Track-${index}`, index: index, item: item, y: (index * this._itemSize) + 80, delay: index < 8 ? .2 + (0.1 * index) : 0}
                })
            });
        }

        _moveAxis() {
            if (this._index >= 3) {
                for (let i = 0; i < this._listItems.length; i++) {
                    const item = this._listItems[i];

                    item.delay = 0;
                    if (i + 3 < this._index) {
                        item.setSmooth("alpha", 0);
                    } else if (i + 3 > this._index + 8) {
                        item.setSmooth("alpha", 0);
                    } else {
                        item.setSmooth("alpha", 1);
                    }
                }

                this.tag("Items").setSmooth("y", -((this._index - 3) * this._itemSize));
            }
        }

        reset() {
            this._index = 0;

            for (let i = 0; i < this._listItems.length; i++) {
                const item = this._listItems[i];

                item.delay = i < 8 ? .2 + (0.1 * i) : 0;
            }

            this.tag("Items").setSmooth("y", -(this._index * this._itemSize));
        }

        _active() {
            this._listItems = this.tag("Items").children;
            this._index = 0;

            for (let i = 0; i < this._listItems.length; i++) {
                const item = this._listItems[i];

                if (i < 9) {
                    item.setSmooth("alpha", 1);
                } else {
                    item.setSmooth("alpha", 0);
                }

                item.setSmooth("y", item.y - 80);
                item.delay = 0;
            }
        }

        _inactive() {
            this.reset();
        }

        _focus() {
            this._playerHasFocus = false;
        }

        _unfocus() {
            if (this._playerHasFocus) {
                return;
            }
            for (let i = 0; i < this._listItems.length; i++) {
                const item = this._listItems[i];
                item.setSmooth("alpha", 0);
            }
        }

        _handleUp() {
            if (this._index > 0) {
                this._index--;
                this._moveAxis();
            }else{
                this._playerHasFocus = true;
                this.fireAncestors("$focusOnPlayer");
            }
        }

        _handleDown() {
            if (this._index < this._tracks.length - 1) {
                this._index++;
                this._moveAxis();
            }
        }

        static _states(){
            return [
                class Playing extends this {

                },
                class Stopped extends this {

                }
            ];
        }

        _getFocused(){
            return this.active
        }
    }

    class Home extends lng.Component{
        static _template(){
            return {
                Background: {w: 1920, h: 1080, color: 0xff242b3f, src: App.getPath("images/background.png")},
                Clipper: {w: 1920, h: 840, y: 240, transitions: {y: {duration: .6}, x: {duration: .6}},
                    Content: {
                    transitions: {y: {duration: .8}},
                        Lists: {
                            x: 88, y: 120, transitions: {y: {duration: .8}}
                        }
                    },
                    Tracks: {
                        y: 125, x: 600, type: Tracks, itemSize: 120
                    }
                },
                Logo: {x: 88, y: 68, src: App.getPath("images/logo.png"), transitions: {y: {duration: .6}, x: {duration: .6}}}
            }
        }

        get api(){
            return this.cparent.api
        }

        get activeList() {
            return this._lists.children[this._index]
        }

        get items(){
            return this.tag("Lists").children;
        }

        get backgroundColor() {
            return this._backgroundColor
        }

        set data(v){
            this.tag("Lists").patch({
                children: Factory.create(v, this.stage)
            });
            this._setState("Loading");
        }

        _init() {
            this._index = 0;
            this._lists = this.tag("Lists");
            this._eq = 1;
            this._setState("Loading");
        }

        _select({offset}) {
            let scrollOffset = 0;
            this._index += offset;
            if (offset === 1 && this.items[this._index - 1]) {
                this.items[this._index - 1].setSmooth("alpha", 0, {duration: .6});
            }
            this.items[this._index].setSmooth("alpha", 1, {duration: .6});
            for(let i = 0, j = this.items.length; i < j; i++){
                let item = this.items[i];
                if(i < this._index){
                    scrollOffset+=item.constructor.height;
                }else{
                    break;
                }
            }
            this.patch({
                Clipper: {
                    Content: {smooth: {y:offset?scrollOffset*-1-60:-60}}
                }
            });
        }

        static _states() {
            return [
                class Loading extends this {
                    $firstItemCreated(){
                        this._setState("Lists");
                    }
                },
                class Lists extends this {
                    _handleUp() {
                        if (this._index > 0) {
                            this._select({offset: -1});
                        }else{
                            return false;
                        }
                    }
                    _handleDown() {
                        if (this._index < this._lists.children.length - 1) {
                            this._select({offset: 1});
                        }
                    }
                    _handleBack(){
                        let steps = this._index;
                        if (this._index > 0) {
                            while(steps--){
                                this._select({offset: -1});
                            }
                        }else{
                            return false;
                        }
                    }
                    $changeAmbient({color}) {
                        this._backgroundColor = color - 0xcc000000;
                        this.patch({
                            Background: {smooth: {color: [color, {duration: 4}]}}
                        });
                    }
                    $selectItem({item, list}){
                        this.tag("Tracks").alpha = 0;
                        if(list.rootUrl && item.navigationUri){
                            this.api.deepNavigateInNode(
                                `${list.rootUrl}${item.navigationUri}`
                            ).then((response)=>{
                                // @todo: better handling / move to api?
                                if(item.constructor === Station){
                                    this.fireAncestors("$play", {
                                        sourceList: list,
                                        items:response.items,
                                        index:0
                                    });
                                    list.loadingReady();
                                    this._spinActiveCover();
                                }else{
                                    this._tracksReceived({item, response, list});
                                }
                            });
                        }
                    }
                    _tracksReceived({item, response:{items}}){
                        this._playables = items;

                        this.tag("Tracks").patch({
                            item, tracks:items, smooth:{alpha:1}
                        });

                        this.fireAncestors("$playerState", {state: "Snapped"});
                        this.activeList.expand();
                        this._setState("Tracks");
                    }
                    _getFocused() {
                        return this.activeList
                    }
                },
                class Tracks$$1 extends this {
                    $enter() {
                        const nextList = this.tag("Lists").children[this._index + 1];
                        if (nextList) {
                            nextList.patch({
                                smooth: {alpha: [0, {duration: .6}], y: [nextList.y + 100, {duration: .6}]}
                            });
                        }

                        this.patch({
                            Logo: {smooth: {x: 176, y: 88}},
                            Clipper: {smooth: {x: 88, y: 170}}
                        });
                    }
                    $exit() {
                        const nextList = this.tag("Lists").children[this._index + 1];
                        if (nextList) {
                            nextList.patch({
                                smooth: {alpha: [1, {duration: .6}], y: [nextList.y - 100, {duration: .6}]}
                            });
                        }
                        this.patch({
                            Logo: {smooth: {x: 88, y: 68}},
                            Clipper: {smooth: {x: 0, y: 240}}
                        });

                        this.activeList.collapse();
                        this.fireAncestors("$playerState", {state: "Minimal"});
                    }
                    _handleEnter(){
                        this.fireAncestors("$play", {
                            sourceList: this.tag("Tracks").tracks,
                            items:this._playables,
                            index:this.tag("Tracks").index,
                            snapPlayer: true
                        });

                        this._spinActiveCover();
                    }
                    _handleBack() {
                        this._setState("Lists");
                    }
                    _handleLeft() {
                        this._setState("Lists");
                    }
                    _getFocused() {
                        return this.tag("Tracks")
                    }
                    static _states() {
                        return [
                            class Playing extends this {
                                $enter() {
                                    this.tag("Tracks").isPlaying = true;
                                }
                                $exit() {
                                    this.tag("Tracks").isPlaying = false;
                                }
                            }
                        ];
                    }
                }
            ];
        }

        stopActiveCover() {
            if(this._activeCover){
                this._activeCover.onPlayerStop();
            }
        }

        _spinActiveCover(){
            this._activeCover = this.activeList.active.child;
            this._activeCover.onPlayStart();
        }

    }

    Home.OPTIONS = {
        HEIGHT: 680,
        WIDTH: 500,
        SPACING: 280
    };

    class Pairing extends lng.Component{

        static _template(){
            return {
                y: 860,
                Description:{
                    flex: {direction: "row"},
                    mountX: .5, x: 960, alpha: 0,
                    Label: {
                        flexItem: {},
                        text: {fontSize: 28, text: "To sign in, visit", fontFace: "Regular"}
                    },
                    Uri: {
                        flexItem: {marginLeft: 12}, color: 0xff4cc3f4,
                        text: {fontSize: 28, text:"", fontFace: "Regular"}
                    }
                },
                Code:{
                    mountX: .5, x: 960, y: 64, alpha: 0,
                    text:{text:"", fontSize: 124, fontFace: "Bold"}
                }
            }
        }

        set code(v){
            this._code = v;

            this.patch({
                smooth: {y: [820, {duration: .6}]},
                Code:{
                    smooth: {alpha: [1, {duration: .6}], y: [32, {duration: 1}]},
                    text:{text:`${v}`}
                }
            });
        }

        set uri(v){
            this._uri = v;

            this.patch({
                Description: {
                    smooth: {alpha: 1},
                    Uri:{text:{text:`${v}`}}
                }
            });
        }
    }

    class Authentication extends lng.Component {

        static _template() {
            return {
                RequestingCode: {
                    //@todo: loader, message: "RequestingCode" ?
                },
                CodeExpired: {
                    // @tood: screen with message: "code expired, please re-pair"
                },
                Pairing: {
                    type: Pairing
                },
                Success:{

                }
            };
        }

        get api() {
            return this.cparent.api;
        }

        _init(){
            this._setState("RequestingCode");
        }

        _active(){
            this._startPairing();
        }

        _unfocus() {
            clearTimeout(this._timeout);
            clearInterval(this._isPairedInterval);
        }

        _startPairing() {
            this.fireAncestors("$startLoading");
            this.api.auth.startPairing().then((props) => {
                this._ready({props});
            }).catch(err => {
                this._error({err});
            });
        }

        static _states() {
            return [
                class RequestingCode extends this {
                    _ready({props}) {
                        this.fireAncestors("$stopLoading");

                        this._devicecode = props.device_code;
                        this._usercode = props.user_code;

                        this.tag("Pairing").code = props.user_code;
                        this.tag("Pairing").uri = props.verification_uri;

                        this._setState("Pairing");
                    }
                    _error({err}){

                    }
                },
                class Pairing$$1 extends this {
                    $enter() {
                        this._isPairedInterval = setInterval(() => {
                            this.api.auth.requestToken({
                                devicecode: this._devicecode, usercode: this._usercode
                            }).then((response) => {
                                if (response.hasOwnProperty("error")) {
                                    const error = response.error;
                                    if (error === "invalid_code_pair") {
                                        return this._codeIsExpired();
                                    } else if (error === "authorization_pending") {
                                        return;
                                    }
                                }else if(response.hasOwnProperty("access_token")){
                                    this._success();
                                }
                            });
                        }, 2000);
                    }
                    _codeIsExpired() {
                        this._setState("Pairing.Expired");
                    }
                    _success() {
                        this._setState("Pairing.SuccessFull");
                    }
                    static _states() {
                        return [
                            class Expired extends this {
                                $enter() {
                                    clearInterval(this._isPairedInterval);
                                    this.tag("CodeExpired").setSmooth("alpha", 1);

                                    this._timeout = setTimeout(() => {
                                        this._startPairing();
                                    }, 4000);
                                }
                            },
                            class SuccessFull extends this {
                                $enter(){
                                    clearInterval(this._isPairedInterval);
                                    this.tag("Success").setSmooth("alpha", 1);

                                    this._timeout = setTimeout(()=>{
                                        this.signal("completed");
                                    }, 1000);
                                }
                                $exit(){
                                    this.tag("Success").setSmooth("alpha", 1);
                                }
                            }
                        ]
                    }
                }

            ];
        }
    }

    class Progress extends lng.Component {
        static _template() {
            return {
                y: 66,
                Progress: {
                    forceZIndexContext: true,
                    CurrentTime: {
                        alpha: 0, y: -5, color:0x50ffffff,
                        text: {fontSize: 19, lineHeight: 34, fontFace: "Regular", wordWrapWidth: 400, maxLines: 1, text: "00:00"}
                    },
                    Duration: {
                        alpha: 0, x: Progress.width, y: -5, mountX: 1, color:0x50ffffff,
                        text: {fontSize: 19, lineHeight: 34, fontFace: "Regular", wordWrapWidth: 400, maxLines: 1, text: "00:00"}
                    },
                    Bar: {
                        y: 31,
                        Total: {h: 3, rect: true, w: Progress.width, color: 0x50000000},
                        Active: {color: 0xffffffff, h: 3, rect: true},
                        Border: {h: 1, y: 4, rect: true, w: Progress.width, color: 0x20ffffff}
                    }
                }
            };
        }

        set cstate(v){
            this._setState(v);
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
            this.tag("Active").setSmooth('w', Math.max(x, 0.0001) /* force clipping */, {
                timingFunction: 'linear',
                duration: estimation
            });
        }

        setProgress(currentTime, duration) {
            this._currentTime = currentTime;
            this._duration = duration;
            this._progress = currentTime / Math.max(duration, 1);
            this.tag("CurrentTime").text = Player.formatTime(currentTime);
            this.tag("Duration").text = Player.formatTime(duration);
        }

        static formatTime(seconds) {
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

        _repaint(){
            this.patch({
                Progress:{
                    Duration:{smooth:{x:[Progress.width, {duration: .6}]}},
                    Bar: {
                        Border:{smooth: {w: [Progress.width, {duration: .6}]}},
                        Total:{smooth: {w: [Progress.width, {duration: .6}]}}
                    }
                }
            });

            this.setProgress(this._currentTime, this._duration);
        }

        static _states() {
            return [
                class Minimal extends this {
                    $enter() {
                        Progress.width = 580;
                        this.patch({
                            smooth: {y: [66, {duration: .6}]},
                            Progress: {
                                CurrentTime: {smooth: {alpha: [0, {duration: .3}]}},
                                Duration: {smooth: {alpha: [0, {duration: .3}]}}
                            },
                        });
                        this._repaint();
                    }
                },
                class Snapped extends this {
                    $enter() {
                        Progress.width = 1020;
                        this.patch({
                            smooth: {y: [108, {duration: .6}]},
                            Progress: {
                                CurrentTime: {smooth: {alpha: [1, {duration: .6}]}},
                                Duration: {smooth: {alpha: [1, {duration: .6}]}}
                            }
                        });
                        this._repaint();
                    }
                }
            ];
        }
    }

    Progress.width = 580;

    class Metadata extends lng.Component{

        static _template(){
            return {
                y: 15,
                Image:{
                    w:60, h:60, alpha: 0, y: 5
                },
                Title:{
                    text:{text:'Select song', fontSize: 32, fontFace: "Bold", wordWrapWidth: 400, maxLines: 1},
                },
                Artist:{
                    y: 44, color:0x50ffffff, text:{text:'...', fontSize: 24, fontFace: "Regular", wordWrapWidth: 400, maxLines: 1},
                }
            }
        }

        update(item){
            this.tag("Image").alpha = 0.0001;

            this.patch({
                Image:{src:item.image.source},
                Title:{smooth: {x: [90, {duration: .3}]}, text:{text:item.title}},
                Artist:{smooth: {x: [90, {duration: .3}]}, text:{text:item.artist.name}}
            });

            this.tag("Image").on("txLoaded", () => {
                this.tag("Image").setSmooth("alpha", 1, {duration: .6});
            });
        }

        set cstate(v){
            this._setState(v);
        }

        static _states(){
            return [
                class Minimal extends this {
                    $enter() {
                        this.patch({
                            Title:{text: {wordWrapWidth: 350}},
                            Artist:{text: {wordWrapWidth: 350}}
                        });
                    }
                },
                class Snapped extends this {
                    $enter(){
                        this.patch({
                            Title:{text: {wordWrapWidth: 800}},
                            Artist:{text: {wordWrapWidth: 800}}
                        });
                    }
                }
            ];
        }
    }

    class Actions extends lng.Component{

        static _template(){
            return {
                x: Actions.width + 17, y: 28, w: 150, mountX: 1, h: 50,
                Previous: {alpha: 0, type: ActionItem, image:"previous.png", command:"$previous"},
                PlayPause: {type: ActionItem, image:"pause.png", command:"$playPause"},
                Next: {alpha: 0, type: ActionItem, x: 100, image:"next.png", command: "$next"}
            }
        }

        _init(){
            this._index = 1;

            this._setState("Minimal");
        }

        set cstate(v){
            this._setState(v);
        }

        set paused(v){
            this.tag("PlayPause").src = App.getPath(`images/player/${v?`play`:`pause`}.png`);
        }

        get controls(){
            return this.children;
        }

        get activeControl(){
            return this.controls[this._index];
        }

        static _states(){
            return [
                class Minimal extends this {
                    _focus(){
                        this._setState("Minimal.Selected");
                    }
                    _unfocus(){
                        this._setState("Minimal");
                    }
                    $enter() {
                        Actions.width = 550;
                        this.patch({
                            smooth: {w: [50, {duration: .6}], x: [Actions.width + 17, {duration: .6}]},
                            Previous: {smooth: {alpha: [0, {duration: .3}]}},
                            PlayPause: {smooth: {x: [0, {duration: .6}]}},
                            Next: {smooth: {alpha: [0, {duration: .3}]}}
                        });
                    }
                    static _states(){
                        return [
                            class Selected extends this {
                                _handleEnter(){
                                    this.fireAncestors(this.activeControl.command);
                                }
                            }
                        ];
                    }
                },
                class Snapped extends this {
                    _focus(){
                        this._setState("Snapped.Selected");
                    }
                    _unfocus(){
                        this._setState("Snapped");
                    }
                    $enter() {
                        Actions.width = 1010;
                        this.patch({
                            smooth: {w: [150, {duration: .6}], x: [Actions.width + 17, {duration: .6}]},
                            Previous: {smooth: {alpha: [1, {delay: .2, duration: .6}]}},
                            PlayPause: {smooth: {x: [50, {duration: .6}]}},
                            Next: {smooth: {alpha: [1, {delay: .2, duration: .6}]}}
                        });
                    }
                    static _states(){
                        return [
                            class Selected extends this {
                                _handleLeft(){
                                    if(this._index === 0){
                                        this._index = this.controls.length - 1;
                                    }else{
                                        this._index -= 1;
                                    }
                                }
                                _handleRight(){
                                    if(this._index < this.controls.length - 1){
                                        this._index += 1;
                                    }else{
                                        this._index = 0;
                                    }
                                }
                                _handleEnter(){
                                    this.fireAncestors(this.activeControl.command);
                                }
                            }
                        ];
                    }
                }
            ];
        }

        _getFocused(){
            return this.activeControl;
        }
    }

    Actions.width = 550;

    class ActionItem extends lng.Component{
        static _template(){
            return {
                color: 0x50ffffff
            };
        }

        set command(v){
            this._command = v;
        }

        get command(){
            return this._command;
        }

        set image(v){
            this.src = App.getPath(`images/player/${v}`);
        }

        _focus(){
            this.setSmooth("color", 0xffffffff);
        }

        _unfocus(){
            this.setSmooth("color", 0x50ffffff);
        }

    }

    class Player extends lng.Component {

        static _template() {
            return {
                Player:{
                    x: 1237, y: 88,
                    Metadata:{
                        type: Metadata
                    },
                    Progress: {
                        type: Progress
                    },
                    Actions:{
                        type: Actions
                    }
                }
            };
        }

        _init(){
            this.setState({state: "Minimal"});
        }

        get item(){
            return this._item;
        }

        startPlaying({sourceList:source, items, index=0, snapPlayer=false}) {
            this._source = source;
            const item = items[index];
            this.play({items, item});
            if(snapPlayer){
                this.setState({state: "Snapped"});
            }
            return !!this._stream;
        }

        _setItem(item) {
            this._item = item;
            this._index = this._items.indexOf(item);
            try{
                this._stream = item.audio.source;
                this.tag("Progress").setProgress(0, 0);
            }catch(e){}

            this.tag("Metadata").update(item);
            this._invokeEqualizer();
            this.application.updateFocusSettings();
        }

        setState({state}){
            this._setState(state, [
                {affected:{
                    Metadata:{cstate: state},
                    Progress:{cstate: state},
                    Actions:{cstate: state}
                }}
            ]);
        }

        _invokeEqualizer(){
            let active = this._activeEqualizerHolder;

            if(active){
                active.onPlayerStop();
                this._activeEqualizerHolder = null;
            }

            if(this._source.constructor === Tracklist){
                active = this._source.active.child;
            }else{
                active = this._source[this._index];
            }

            if(active){
                active.onPlayStart();
                this._activeEqualizerHolder = active;
            }
        }

        $mediaplayerEnded() {
            this.$next();
        }

        play({item, items}) {
            this._items = items;
            this._setItem(item);
        }

        $previous() {
            let index = this._index - 1;
            if (index < 0) {
                index = this._items.length - 1;
            }
            this._setItem(this._items[index]);
        }

        $next() {
            if (!this._items.length) {
                return this.signal('playerStop');
            }
            const index = (this._index + 1) % this._items.length;
            this._setItem(this._items[index]);
        }

        $playPause() {
            this.application.mediaplayer.playPause();
        }

        $mediaplayerPause() {
            this.tag("Actions").paused = true;
        }

        $mediaplayerPlay() {
            this.tag("Actions").paused = false;
        }

        $mediaplayerStop() {
            this.signal('playerStop');
        }

        $mediaplayerProgress({currentTime, duration}) {
            this.tag("Progress").setProgress(currentTime, duration);
        }

        static _states() {
            return [
                class Minimal extends this {
                    $enter(){
                        this.patch({
                            Player:{
                                smooth:{
                                    x:[1237,{delay: 0, duration: .6}],
                                    y:[88, {delay: 0, duration: .6}]
                                },
                                ... arguments[1].affected
                            }
                        });
                    }
                    _handleEnter() {
                        this.$playPause();
                    }
                    _getFocused() {
                        return this.tag("Actions");
                    }
                },
                class Snapped extends this {
                    $enter(){
                        this.patch({
                            Player:{
                                smooth:{
                                    x:[687,{delay: 0, duration: .6}],
                                    y: [88,{delay: 0, duration: .6}]
                                },
                                ... arguments[1].affected

                            }
                        });
                    }
                    _getFocused() {
                        return this.tag("Actions");
                    }
                }
            ];
        }

        getMediaplayerSettings() {
            return {
                stream: {src: this._stream}
            };
        }

        static formatTime(seconds) {
            if (seconds === undefined) seconds = 0;
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

    class Splash extends lng.Component{

        static _template(){
            return {
                Background: {w: 1920, h: 1080, src: App.getPath("images/background.png")},
                Content: {
                    x: 960, y: 620, mount: .5, w: 450, h: 277,
                    Clipper: {
                        clipping: true, y: 140, h: 105, w: 450,
                        Arrow: {
                            src: App.getPath("images/splash/arrow.png")
                        }
                    },
                    Box: {h: 145, w: 450, y: -28,
                        M: {x: 5, src: App.getPath("images/splash/m.png")},
                        U: {x: 164, src: App.getPath("images/splash/u.png")},
                        S: {x: 262, src: App.getPath("images/splash/s.png")},
                        I: {x: 340, src: App.getPath("images/splash/i.png")},
                        C: {x: 373, src: App.getPath("images/splash/c.png")}
                    }
                },
                Loader: {
                    alpha: 0,
                    w: 30, h: 30,
                    mountX: .5,
                    x: 960,
                    y: 840,
                    Outer: {texture: lng.Tools.getRoundRect(30, 30, 15, 0, 0x00ffffff, true, 0xffffffff)},
                    Inner: {texture: lng.Tools.getRoundRect(30, 30, 15, 0, 0x00ffffff, true, 0xffffffff)}
                }
            }
        }

        _init() {
            this._showLogo = this.tag("Content").animation({duration: 1.05, actions: [
                    {t: '', p: 'y', v: {0: {v: 620}, .4: {v: 540}}},
                    {t: 'Clipper', p: 'w', v: {0: {v: 0}, .6: {v: 500}}},
                    {t: 'Box.M', p: 'y', v: {0: {v: 100}, .2: {v: 36}}},
                    {t: 'Box.M', p: 'alpha', v: {0: {v: 0}, .2: {v: 1}}},
                    {t: 'Box.U', p: 'y', v: {.1: {v: 100}, .3: {v: 36}}},
                    {t: 'Box.U', p: 'alpha', v: {.1: {v: 0}, .3: {v: 1}}},
                    {t: 'Box.S', p: 'y', v: {.2: {v: 100}, .4: {v: 36}}},
                    {t: 'Box.S', p: 'alpha', v: {.2: {v: 0}, .4: {v: 1}}},
                    {t: 'Box.I', p: 'y', v: {.3: {v: 64}, .5: {v: 0}}},
                    {t: 'Box.I', p: 'alpha', v: {.3: {v: 0}, .5: {v: 1}}},
                    {t: 'Box.C', p: 'y', v: {.4: {v: 100}, .6: {v: 36}}},
                    {t: 'Box.C', p: 'alpha', v: {.4: {v: 0}, .6: {v: 1}}}
                ]});

            this._loaderAnimation = this.tag("Loader").animation({duration: 1, repeat: -1, actions: [
                    {t: 'Inner', p: 'scale', v: {0: {v: 1}, .33: {v: 1.2}, 1: {v: 1}}},
                    {t: 'Outer', p: 'alpha', v: {0: {v: 1}, 22: {v: 1}, 1: {v: 0}}},
                    {t: 'Outer', p: 'scale', v: {0: {v: 1}, .22: {v: 1.2}, 1: {v: 2.2}}}
                ]});
        }

        _active() {
            const colors = [0xff03bbff, 0xffec5cc6, 0xff92e141, 0xff46d270, 0xff6575e0, 0xff64258a];
            let count = 0;

            this._changeAmbient(colors[count]);
            this._interval = setInterval(() => {
                if (count > 5) {count = 0;}

                this._changeAmbient(colors[count]);

                count++;
            }, 4000);

            this._showLogo.start();
        }

        _inactive() {
            clearInterval(this._interval);

            this._showLogo.stop();
        }

        startLoading() {
            this.patch({
                Loader: {smooth: {alpha: [1, {delay: .2, duration: .6}]}}
            });

            this._loaderAnimation.start();
        }

        stopLoading() {
            this.patch({
                Loader: {smooth: {alpha: [0, {delay: 0, duration: .3}]}}
            });

            this._loaderAnimation.stop();
        }

        _changeAmbient(color) {
            this.patch({
                Background: {smooth: {color: [color, {duration: 4}]}}
            });
        }

    }

    class AppContents extends lng.Component {
        static _template() {
            return {
                Splash: {
                    type: Splash
                },
                Authentication: {
                    type: Authentication, alpha: 0, signals:{completed: true}
                },
                Home: {
                    type: Home, alpha: 0
                },
                Player:{
                    type: Player, alpha: 0
                }
            };
        }

        _init() {
            if (this.api.auth.hasValidToken()) {
                this._setState("Prepare");
            } else {
                this._setState("Authentication");
            }
        }

        get api() {
            return this.cparent.api;
        }

        get player(){
            return this.tag("Player");
        }

        static _states() {
            return [
                class Authentication$$1 extends this {
                    $enter() {
                        this.tag("Authentication").setSmooth("alpha", 1);
                    }
                    $startLoading() {
                        this.tag("Splash").startLoading();
                    }
                    $stopLoading() {
                        this.tag("Splash").stopLoading();
                    }
                    completed() {
                        this._setState("Prepare");
                    }
                    _getFocused() {
                        return this.tag("Authentication");
                    }
                },
                class Prepare extends this {
                    $enter() {
                        this.tag("Splash").startLoading();
                        this.tag("Authentication").setSmooth("alpha", 0);

                        this.api.extractNavigationNodes().then((data) => {
                            this._completed({data});
                        });
                    }
                    _completed({data}) {
                        setTimeout(() => {
                            this.tag("Authentication").setSmooth("alpha", 0, {duration: .6});

                            this.tag("Home").data = data;

                            this._setState("Home");
                        }, 1000);
                    }
                },
                class Home$$1 extends this {
                    $enter(){
                        this.tag("Splash").stopLoading();
                        this.tag("Splash").setSmooth("alpha", 0, {duration: .6});
                        this.tag("Home").setSmooth("alpha", 1, {duration: .6});
                        this.tag("Player").setSmooth("alpha", 1, {duration: .6});
                    }
                    _handleUp(){
                        this._setState("Player");
                    }
                    $play() {
                        this._setState("Home.Playing", [arguments[0]]);
                    }
                    $focusOnPlayer(){
                        this._setState("Player");
                    }
                    $playerState({state}){
                        this.tag("Player").setState({state});
                    }
                    static _states() {
                        return [
                            class Playing extends this {
                                $enter(){
                                    if(!arguments[1]){
                                        return
                                    }
                                    this.tag("Player").startPlaying(arguments[1]);
                                }
                                $play(args){
                                    this.tag("Home").stopActiveCover();
                                    this.tag("Player").startPlaying(args);
                                }
                            }
                        ];
                    }
                    _getFocused() {
                        return this.tag("Home");
                    }
                },
                class Player$$1 extends this {
                    _handleDown(){
                        this._setState("Home");
                    }
                    _getFocused() {
                        return this.tag("Player");
                    }
                    _handleBack() {
                        this._setState("Home");
                    }
                }
            ];
        }

        $getAppContents(){
            return this;
        }

        $getGlowAnimationSettings(){
            if(!this._glowSettings){
                this._glowSettings = this.stage.animations.createSettings({
                    duration: 3, delay: .2, repeat: -1, actions: [
                        {t: '', p: 'alpha', rv: 0, v: {0: {v: 0}, .5: {v: 1}, 1: {v: 0}}}
                    ]
                });
            }
            return this._glowSettings;
        }

        _setFocusSettings(settings) {
            if(this.state === "Home.Playing" || this.state === "Player"){
                settings.mediaplayer.consumer = this.tag("Player");
            }
        }
    }

    class Authenticator {
        constructor(){
            this._clientId = "amzn1.application-oa2-client.da9b56904cfe4329aeff44819bab5c42";
            this._codepairUrl = "https://api.amazon.com/auth/O2/create/codepair";
            this._tokenUrl = "https://api.amazon.com/auth/o2/token";
        }

        startPairing() {
            return this._getPairingCode().then((data) => {
                return data;
            });
        }

        _getPairingCode() {
            return this.post({
                url:this._codepairUrl,
                body:{
                    client_id: this._clientId,
                    response_type: "device_code",
                    scope: "amazon_music:access"
                }
            })
        }

        requestToken({devicecode, usercode, refresh=false}) {
            let body = {
                client_id: this._clientId
            };
            // check if we're requesting a refresh token
            if(!refresh){
                body = {
                    device_code: devicecode,
                    user_code: usercode,
                    grant_type: "device_code",
                    ...body,
                };
            }else{
                body = {
                    grant_type: "refresh_token",
                    refresh_token:this._refresh_token,
                    ...body
                };
            }

            // fire token request
            return this.post({
                url: this._tokenUrl, body
            }).then((data)=>{
                // if we have a access_token property
                // we store needed values via token setter
                if(data.hasOwnProperty("access_token")){
                    this.token = data;
                }
                return data;
            });
        }


        post({url, body}){
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: Authenticator._qsify(body)
            }).then((response) => {
                return response.json();
            });
        }

        get token(){
            return this._token;
        }

        set token(v){
            const {access_token, refresh_token, expires_in} = v;

            this._token = access_token;
            this._refresh_token = refresh_token;

            let d = new Date();
            d.setSeconds(d.getSeconds() + expires_in);

            this.expires = d.getTime();

            localStorage.setItem("VEVO_TOKEN", access_token);
            localStorage.setItem("VEVO_REFRESH_TOKEN", refresh_token);
        }

        set expires(v){
            this._expires = v;
            localStorage.setItem("VEVO_TOKEN_EXPIRES", v);
        }

        hasValidToken() {
            this._token = localStorage.getItem("VEVO_TOKEN");
            this._refresh_token = localStorage.getItem("VEVO_REFRESH_TOKEN");
            this._expires = localStorage.getItem("VEVO_TOKEN_EXPIRES");

            if(this.isTokenExpired()){
                if(this._refresh_token){
                    return this.requestToken({refresh:true}).then((response)=>{
                        return true;
                    }).catch((err)=>{
                        return false;
                    });
                }else{
                    return false;
                }
            }
            return this._token && this._refresh_token;
        }

        isTokenExpired(){
            return this._expires <= Date.now();
        }

        static _qsify(params) {
            return Object.keys(params).map((key) => {
                return `${key}=${params[key]}`;
            }).join("&");
        }
    }

    class Factory$1 {

        constructor(){

        }

        create(node){
            const reg = /(tracks|albums|stations|chunk|playlists|album|playlist)/ig;
            const match = reg.exec(node.response.result);

            if(match && match.length){
                let type = Factory$1._ucfirst(match[1]);
                let result = this[`_create${type}`](node);

                return result;
            }else{
                return;
            }
        }

        _createTracks({response, title, rootUrl}){
            const {trackDefinitions:tracks} = response;
            const keys = Object.keys(tracks);
            let container = new TracksObj({url: Factory$1._cleanupUrl(rootUrl), title});

            container.items = keys.map((k)=>{
                return new TrackObj(tracks[k]);
            });

            return container;
        }

        _createStations(node){
            return this._createNodelistWithNavigation({
                ...Factory$1.CONFIG["Stations"], ...node
            });
        }

        _createAlbums(node){
           return this._createNodelistWithNavigation({
               ...Factory$1.CONFIG["Albums"], ...node
           });
        }

        _createAlbum(node){
            return this._createTracks(node);
        }

        _createChunk(node){
            return this._createTracks(node);
        }

        _createPlaylists(node){
            return this._createNodelistWithNavigation({
                ...Factory$1.CONFIG["Playlists"], ...node,
            });
        }

        _createPlaylist(node){
            return this._createTracks(node);
        }

        _createNodelistWithNavigation({response, title, rootUrl, containerConstructor, itemConstructor, pointer, dictionary}){
            const {itemDescriptions:items} = response;
            const navigation = response[dictionary];

            const keys = Object.keys(items);
            let container = new Factory$1.CLASSES[containerConstructor]({url: Factory$1._cleanupUrl(rootUrl), title});

            container.items = keys.map((k)=>{
                const props = items[k];
                let nav = null;

                // summary starts with a # property in the dictionary
                // is without a # so we slice it of to get matching key
                const navigationPointer = props[pointer].slice(1);

                if(navigation.hasOwnProperty(navigationPointer)){
                    nav = navigation[navigationPointer];
                }
                return new Factory$1.CLASSES[itemConstructor](props, nav);
            });

            return container;
        }

        static _cleanupUrl(url){
            let reg = /(.*)#/ig;
            let matches = reg.exec(url);

            if(matches && matches.length){
                return matches[1];
            }
        }


        static _ucfirst(str) {
            return `${str[0].toUpperCase()}${str.slice(1)}`
        }
    }

    Factory$1.CONFIG = {
        Albums:{
            containerConstructor: "Albums",
            itemConstructor: "Album",
            pointer:"navigationNodeSummary",
            dictionary:"navigationNodeSummaries"
        },
        Playlists:{
            containerConstructor: "Playlists",
            itemConstructor: "Playlist",
            pointer:"navigationNodeSummary",
            dictionary:"navigationNodeSummaries"
        },
        Stations:{
            containerConstructor: "Stations",
            itemConstructor: "Station",
            pointer:"playable",
            dictionary:"playables"
        }
    };


    Factory$1.CLASSES = { Albums, Album, Playlists, Playlist, Stations, Station };

    class Api {
        constructor() {
            this._auth = new Authenticator();
            this._factory = new Factory$1();

            this._rootUrl = "https://music-api.amazon.com/widescreen_catalog/";
        }

        get(url){
            if(this._auth.isTokenExpired()){
                return this._auth.requestToken({refresh:true}).then(()=>{
                    return this.get(url);
                })
            }
            return fetch(ux.Ui.getProxyUrl(url),{
                headers:{
                    "Authorization":`Bearer ${this._auth.token}`
                }
            }).then((response)=>{
                return response.json();
            })
        }

        /**
         * Extract all widescreen navigation nodes which have items attached
         * build the correct url and prepare the requests
         * @returns {Promise.<TResult>|*}
         */
        extractNavigationNodes(){
            let rootUrl = this._rootUrl;
            let skipNodes = ["sandbox_summary","widescreen_catalog_summary"];

            return this.get(`${rootUrl}`).then((response)=>{
                let promises = [];
                const {navigationNodeSummaries:nodes} = response;
                const keys = Object.keys(nodes).filter(
                    node=>skipNodes.indexOf(node) === -1
                );
                if(!keys.length){
                    throw new Error("No navigation nodes found");
                }

                for(let i = 0, j = keys.length; i < j; i++){
                    const node  = nodes[keys[i]];
                    if(!node.numItemsOfInterest){
                        continue;
                    }
                    promises.push(
                        this._mergeDataInPromise({
                            url:`${rootUrl}${node.description}`,
                            data:{ title:node.title }
                        })
                    );
                }

                if(promises.length){
                    return Promise.all(promises);
                }
            }).then((response)=>{
                if(!response.length){
                    throw new Error("No node output returned");
                }
                const lists = response.map(node=>this._createNodeOutputList(node));
                if(lists.length){
                    return lists;
                }
            })
        }

        deepNavigateInNode(url){
            return this.get(url).then((node)=>{
                return this._createNodeOutputList({
                    response: node, rootUrl: url
                });
            })
        }

        /**
         * Spread data object in the return of a promise
         * @param url
         * @param data
         * @returns {Promise.<Object>}
         * @private
         */
        _mergeDataInPromise({url,data}){
            return this._promise(url).then((response)=>{
                return {
                    response, rootUrl:url, ...data
                };
            });
        }

        _createNodeOutputList(node){
            return this._factory.create(node);
        }

        _promise(url){
            return this.get(url);
        }

        get auth(){
            return this._auth;
        }

        static _qsify(params) {
            return Object.keys(params).map((key) => {
                return `${key}=${params[key]}`;
            }).join("&");
        }
    }

    class App extends ux.App {

        static getFonts() {
            return [
                {family: 'Black', url: App.getPath('fonts/Lato-Black.ttf'), descriptors: {}},
                {family: 'Bold', url: App.getPath('fonts/Lato-Bold.ttf'), descriptors: {}},
                {family: 'Light', url: App.getPath('fonts/Lato-Light.ttf'), descriptors: {}},
                {family: 'Hairline', url: App.getPath('fonts/Lato-Hairline.ttf'), descriptors: {}},
                {family: 'Regular', url: App.getPath('fonts/Lato-Regular.ttf'), descriptors: {}}
            ]
        }

        get api() {
            return this._api;
        }

        static _template() {
            return {
                Player: {},
                AppContents: {
                    type: AppContents
                }
            };
        }

        _construct() {
            this._api = new Api();
        }

        _getFocused() {
            return this.tag("AppContents");
        }
    }

    return App;

}());
