var appBundle = (function () {
    'use strict';

    class Current extends lng.Component{
        static _template(){
            return {
                rect: true, h: 180, w: Current.width, color: 0xff000000,
                Bar: {y: 180, h: 5, w: 70, rect: true, color: 0xff353535, clipping: true,
                    Focus: {h: 5, rect: true},
                },
                Duration: {
                    y: 185, x: 70, mountX: 1, w: 70, h: 40,
                    ArrowLeft: {alpha: 0,
                        Icon: {
                            mount: .5, x: 20, y: 15, scale: .8,
                            src: App.getPath("images/small-arrow.png")
                        }
                    },
                    ArrowRight: {alpha: 0,
                        Icon: {
                            mount: .5, x: 20, y: 15, scale: .8, rotation: Math.PI,
                            src: App.getPath("images/small-arrow.png")
                        }
                    },
                    Holder: {
                        w: 70, h: 30, rect: true, color: 0xff353535
                    },
                    Label: {
                        mount: .5, x: 35, y: 17, text: {text: "00:00", fontSize: 19, fontFace: "Regular"}
                    }
                },
                Artist: {
                    x: 45, y: 39, color: 0xffaeafb5, text: {text:"", fontSize: 32, wordWrapWidth: 900, maxLines: 1, fontFace: "Italic"}
                },
                Title: {
                    x: 45, y: 81, text: {text:"", fontSize: 48, wordWrapWidth: 900, lineHeight: 72, maxLines: 1, fontFace: "Bold"}
                }
            }
        }

        _init(){
            this._setState("Bar");
        }

        set data(v){
            this.patch({
                Artist:{
                    text:{text:v.artist}
                },
                Title:{
                    text:{text:v.title.toUpperCase()}
                }
            });
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
            const x = (v * (Current.width - 70)) + 70;

            estimation *= 0.001;
            this.tag("Bar").setSmooth('w', Math.max(x, 0.0001) /* force clipping */, {
                timingFunction: 'linear',
                duration: estimation
            });

            this.tag("Duration").setSmooth('x', Math.max(x, 0.0001) /* force clipping */, {
                timingFunction: 'linear',
                duration: estimation
            });
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

        setProgress(currentTime, duration) {
            this._currentTime = currentTime;
            this._duration = duration;
            this._progress = currentTime / Math.max(duration, 1);
            this.tag("Label").text = `${Current.formatTime(currentTime)}`;
        }

        _focus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Bar: {
                    Focus: {x:(direction===1?0:1050), smooth: {w: [1050, {duration: .6}], x: [0, {duration: .6}]}}
                }
            });
        }

        _unfocus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            const width = this.tag("Bar").w;
            this.patch({
                Bar: {
                    Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?width:0, {duration: .6}]}},
                },
                Duration: {
                    Holder: {
                        smooth: {color: [0xff353535, {duration: .6}]}
                    },
                    Label: {
                        smooth: {color: [0xffffffff, {duration: .6}]}
                    },
                    ArrowLeft: {
                        smooth: {alpha: [0, {duration: .6}], x: [0, {duration: .6}]}
                    },
                    ArrowRight: {
                        smooth: {alpha: [0, {duration: .6}], x: [30, {duration: .6}]}
                    }
                }
            });

            this._setState("Bar");
        }

        static _states(){
            return [
                class Bar extends this{
                    _handleDown() {
                        this._setState("Duration");
                    }
                    _handleEnter() {
                        this._setState("Duration");
                    }
                },
                class Duration extends this{
                    $enter(){
                        this.patch({
                            Bar: {
                                Focus: {smooth: {color: [0xff353535, {duration: .6}]}},
                            },
                            Duration: {
                                Holder: {
                                    smooth: {color: [0xffffffff, {duration: .6}]}
                                },
                                Label: {
                                    smooth: {color: [0xff151515, {duration: .6}]}
                                },
                                ArrowLeft: {
                                    smooth: {alpha: [1, {duration: .6}], x: [-40, {duration: .6}]}
                                },
                                ArrowRight: {
                                    smooth: {alpha: [1, {duration: .6}], x: [70, {duration: .6}]}
                                }
                            }
                        });
                    }
                    $exit(){
                        this.patch({
                            Bar: {
                                Focus: {smooth: {color: [0xffffffff, {duration: .6}]}},
                            },
                            Duration: {
                                Holder: {
                                    smooth: {color: [0xff353535, {duration: .6}]}
                                },
                                Label: {
                                    smooth: {color: [0xffffffff, {duration: .6}]}
                                },
                                ArrowLeft: {
                                    smooth: {alpha: [0, {duration: .6}], x: [0, {duration: .6}]}
                                },
                                ArrowRight: {
                                    smooth: {alpha: [0, {duration: .6}], x: [30, {duration: .6}]}
                                }
                            }
                        });
                    }
                    _handleBack() {
                        this._setState("Bar");
                    }
                    _handleUp() {
                        this._setState("Bar");
                    }
                    _handleLeft() {
                        this.fireAncestors("$seekVideo", {direction: -1});
                    }
                    _handleRight() {
                        this.fireAncestors("$seekVideo", {direction: 1});
                    }
                }
            ]
        }
    }

    Current.width = 1050;

    class UpNext extends lng.Component {
        static _template(){
            return {
                Holder: {
                    rtt: true, w: 360, h: 180, rect: true, color: 0xff151515,
                    Image:{mount: .5, x: 180, y: 90, alpha: 0.001},
                    Overlay: {
                        w: 360, h: 180, rect: true, color: 0xaa000000,
                        Icon: {
                            mount: .5, x: 180, y: 90, scale: .9,
                            src: App.getPath("images/player-next.png")
                        }
                    }
                },
                Focus: {
                    y: 180, h: 5, rect: true
                }
            }
        }

        _init(){
            this.tag("Image").on("txLoaded", () => {
                this.patch({
                    Holder: {
                        Image: {smooth: {alpha: [1, {duration: .6}]}}
                    }
                });
            });
        }

        set data(v){
            this._data = v;
            this.tag("Image").alpha = 0.001;
            this.tag("Image").texture = null;
            this.patch({
                Holder: {
                    Image: {src:ux.Ui.getImageUrl(`${v.image}`, {width: 440, height: 220, type: 'crop'})}
                }
            });
        }

        _focus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Holder: {
                    Image: {smooth: {scale: [1.1, {duration: .6}]}},
                    Overlay: {
                        Icon: {smooth: {scale: [1, {duration: .6}]}}
                    }
                },
                Focus: {x:(direction===1?0:360),smooth: {w: [360, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Holder: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Overlay: {
                        Icon: {smooth: {scale: [.9, {duration: .6}]}}
                    }
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?360:0, {duration: .6}]}}
            });
        }
    }

    class Artist extends lng.Component{

        static _template(){
            return {
                Holder: {
                    rtt: true, w: 180, h: 180, rect: true, color: 0xff151515,
                    Image:{mount: .5, x: 90, y: 90, alpha: 0.001},
                },
                Focus: {
                    y: 180, h: 5, rect: true
                }
            }
        }

        _init(){
            this.tag("Image").on("txLoaded", () => {
                this.patch({
                    Holder: {
                        Image: {smooth: {alpha: [1, {duration: .6}]}}
                    }
                });
            });
        }

        set data(v){
            this._data = v;
            this.tag("Image").alpha = 0.001;
            this.tag("Image").texture = null;
            this.patch({
                Holder: {
                    Image:{src:ux.Ui.getImageUrl(`${v.image}`, {width: 200, height: 200, type: 'crop'})}
                }
            });
        }

        _focus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Holder: {
                    Image: {smooth: {scale: [1.1, {duration: .6}]}}
                },
                Focus: {x:(direction===1?0:180),smooth: {w: [180, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Holder: {
                    Image: {smooth: {scale: [1, {duration: .6}]}}
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?180:0, {duration: .6}]}}
            });
        }

        _handleEnter(){
            this.fireAncestors("$routeOnItemSelect", {item: this._data});
        }
    }

    class UpNext$1 extends lng.Component {
        static _template(){
            return {
                w: 90, h: 180, rect: true, color: 0xff000000,
                Icon: {
                    mount: .5, x: 45, y: 90, scale: .9,
                    src: App.getPath("images/player-pause.png")
                },
                Focus: {
                    y: 180, h: 5, rect: true
                }
            }
        }

        isPlaying(v) {
            this.tag("Icon").src = v ? App.getPath("images/player-pause.png") : App.getPath("images/player-play.png");
        }

        _focus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Icon: {smooth: {scale: [1, {duration: .6}]}},
                Focus: {x:(direction===1?0:90),smooth: {w: [90, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Icon: {smooth: {scale: [.9, {duration: .6}]}},
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?90:0, {duration: .6}]}}
            });
        }
    }

    class Player extends lng.Component{
        static _template(){
            return {
                Top: {w: 1920, h: 540, rect: true, colorTop: 0xff000000, colorBottom: 0x00000000},
                Bottom: {
                    w: 1920, h: 540, y: 740, rect: true, colorTop: 0x00151515, colorBottom: 0xff151515,
                    Bar: {
                        x: 100, y: 260,
                        PlayPause: {
                            type: UpNext$1
                        },
                        Artist:{
                            type: Artist, x: 90,
                        },
                        Current:{
                            type: Current, x: 270
                        },
                        UpNext:{
                            type: UpNext, x: 1320
                        }
                    }
                }
            };
        }

        _init(){
            this._setState("Loading");
        }

        _focus(){
            this._nostreamCounter = 0;
            this.patch({
                Bottom: {
                    smooth:{y: [540, {duration: .6}]},
                }
            });

            this._setState("Playing.PlayPause");
            this._setInterfaceTimeout();
            this.fireAncestors("$logo", {x: 82, y: 82});
        }

        _unfocus(){
            this.patch({
                Bottom: {
                    smooth:{y: [740, {duration: .6}]},
                }
            });

            clearTimeout(this._timeout);
            this.tag("Current").setProgress(0, 0);
        }

        play({item, items, sourceList}){
            this._sourceList = sourceList;
            this._items = items;
            this._setItem(item);

            this._setInterfaceTimeout();
        }

        _setItem(item){
            // there are some items without a stream url, in case of no stream url
            // we try to play the next item. As a fail safe we close the player
            // when we have a streak of 10 none-playing items.
            if(this._nostreamCounter > 9){
                this.signal("forceStop");
                return;
            }

            let stream = null;

            this._item = item;
            this._index = this._items.indexOf(item);

            if(ux.Ui.hasOption("hls")){
                stream = item.getStreamsByProvider("DLVR");
            }else{
                stream = item.getStreamsByQuality("high");
            }

            if(stream && stream.url){
                this._currentTime = 0;
                this._nostreamCounter = 0;
                this._stream = stream.url;

                this.tag("Current").data = item;
                this.tag("Artist").data = item.artistObj;

                this.application.updateFocusSettings();

                const next = this._getNextItem();
                if(next){
                    this.tag("UpNext").data = next;
                }
            }else{
                this._nostreamCounter+=1;
                this.fireAncestors("$error",{message:"This video has no stream url, the next video will play in 5 seconds", returnState:"Playing"}).then(()=>{
                    this.next();
                });
            }
        }

        $mediaplayerProgress({currentTime, duration}) {
            const diff = duration - currentTime;

            this._currentTime = currentTime;
            this._duration = duration;
            this.tag("Current").setProgress(currentTime, duration);

            if(diff < 2){
                this._setState("LockInterface");
            }
        }


        $mediaplayerEnded() {
            this.next();
        }

        $mediaplayerPlay(){
            this.tag("PlayPause").isPlaying(true);
            this.ready();
        }

        $mediaplayerPause(){
            this.tag("PlayPause").isPlaying(false);
        }

        $mediaplayerStop(){
            this.next();
        }

        $mediaplayerError(){
            this.fireAncestors("$error", {message:`An error occured while playing the asset`});
        }

        _setInterfaceTimeout(){
            if(this._timeout){
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(()=>{
                this._setState("Idle");
            }, 4000);
        }

        next() {
            const item = this._getNextItem();
            if (!item) {
                return this.signal('playerStop');
            }
            this._setItem(item);

            if(this._sourceList){
                this._sourceList.handlePlayerNext(this._index);
            }
        }

        _getNextItem(){
            if (this._items) {
                const index = (this._index + 1) % this._items.length;
                return this._items[index];
            }
        }

        $lastDirection(){
            return this._lastDirection;
        }

        $getState() {
            return this.state
        }

        _toggleInterface(v){
            this.patch({
                smooth:{alpha: [v?1:0, {duration: .6}]},
                Top: {
                    smooth:{y: [v?0:-200, {duration: .6}]},
                },
                Bottom: {
                    smooth:{y: [v?540:740, {duration: .6}]},
                }
            });
            this.fireAncestors("$logo", {x: 82, y: v?82:-118});
        }

        static _states(){
            return [
                class Loading extends this{

                },
                class Playing extends this{
                    _captureKey(){
                        this._setInterfaceTimeout();
                        return false;
                    }
                    static _states(){
                        return [
                            class Progress extends this{
                                _handleLeft(){
                                    this._lastDirection = -1;
                                    this._setState("Artist");
                                }
                                _handleRight(){
                                    this._lastDirection = 1;
                                    this._setState("UpNext");
                                }
                                _getFocused() {
                                    return this.tag("Current");
                                }
                                _updateTimeOffset(offset){
                                    const current = this._currentTime;
                                    const duration = this._duration;
                                    const step = Player.TIME_STEPS * offset;
                                    const time = current + step;

                                    if(time >= 0 && time <= duration){
                                        this.application.mediaplayer.seek(time, true);
                                    }
                                }
                                $seekVideo({direction}){
                                    this._updateTimeOffset(direction);
                                }
                            },
                            class PlayPause extends this{
                                _handleEnter() {
                                    this.application.mediaplayer.playPause();
                                }
                                _handleRight() {
                                    this._lastDirection = 1;
                                    this._setState("Artist");
                                }
                                _getFocused() {
                                    return this.tag("PlayPause");
                                }
                            }
                        ]
                    }
                },
                class UpNext$$1 extends this{
                    _handleEnter() {
                        this.next();
                        this._setInterfaceTimeout();
                    }
                    _handleLeft() {
                        this._lastDirection = -1;
                        this._setState("Playing.Progress");
                    }
                    _getFocused() {
                        return this.tag("UpNext");
                    }
                },
                class Artist$$1 extends this{
                    _getFocused() {
                        return this.tag("Artist");
                    }
                    _handleLeft(){
                        this._lastDirection = -1;
                        this._setState("Playing.PlayPause");
                    }
                    _handleRight(){
                        this._lastDirection = 1;
                        this._setState("Playing.Progress");
                    }
                },
                class Idle extends this{
                    $enter(){
                        this._toggleInterface(false);
                    }
                    $exit(){
                        this._toggleInterface(true);
                        this._setInterfaceTimeout();
                    }
                    _captureKey(){
                        this._setState("Playing.PlayPause");
                    }
                },
                class LockInterface extends this{
                    $enter(){
                        clearTimeout(this._timeout);
                        this._toggleInterface(true);
                    }
                    $exit(){
                        this._setInterfaceTimeout();
                    }
                    ready(){
                        this._setState("Playing.PlayPause");
                    }
                }
            ];
        }

        getMediaplayerSettings(){
            return {
                stream:{src:this._stream}
            }
        }
    }

    Player.TIME_STEPS = 10;

    class Page extends lng.Component {
        /**
         * Fired when a Page gets reloaded by PageRouter
         * method needs to be implemented by subclass if it's stored in history
         * @param props
         * @private
         */
        _onReload({props}) {

        }

        /**
         * Fired when a Page gets loaded by PageRouter
         * method can be implemented by subclass -
         * if page requires loading do a fireAncestor("$pageLoaded") when ready
         * @param props
         * @private
         */
        _onLoad() {

        }

        /**
         * Flag for PageRouter to put in history
         * Subclass need to override
         * @returns {boolean}
         */
        get store() {
            return false;
        }


        /**
         * Only store last version of component
         * so PageRouter can replace previous version
         * @returns {boolean}
         */
        get storeLast(){
            return false;
        }

        /**
         * Flag for PageRouter to clear history
         * Subclass need to override
         * @returns {boolean}
         */
        get clearHistory() {
            return false;
        }

        /**
         * Gets called when Page gets unloaded and stored in memory
         * for the sake of memory try to store as minimum as possible
         * @returns {{props: Object}}
         */
        get persist() {
            return {props: null};
        }

        /**
         * Flag for PageRouter to tell that the page requires loading
         * so the Loader Component can become visible and wait for an endload signal
         * --
         * usage: Page signal("endload",{}, true) when loading is ready
         * --
         * @returns {boolean}
         */
        get requiresLoading() {
            return false;
        }

        /**
         * Gets fired when Page gets loaded
         * can be implemented by subclass
         */
        show() {

        }

        /**
         * Gets fired when Page hides
         * can be implemented by subclass
         */
        hide() {

        }
    }

    /**
     * @todo: feature: deeplinking to a non history clearing Page
     */

    class PageRouter extends lng.Component {
        /**
         * Load page and store current active page
         * called by subclass
         * @param ref
         * @param previous
         */
        $loadPage({ref, data}) {
            let page = this._pagesComponent().getByRef(ref);
            if (!page || !page instanceof Page) {
                throw new Error(`${ref} is not a valid Page`);
            }

            let previous = this._activePage;
            if (previous && previous.store) {
                // if storeLast flag is true we remove
                // previous page hit from history
                if(previous.storeLast){
                    this._removePagesFromHistory(previous.ref);
                }

                const persist = previous.persist;
                // if we don't have an exact match in history
                // store previous
                if (!this.__equalValueInHistory(previous.ref, persist)) {
                    this._history.push({
                        ref: previous.ref, props: persist
                    });
                }
            }
            
            if (previous) {
                previous._onPageHide();
            }

            this._activePage = page;
            this._activeRef = page.ref;

            page._onLoad(data);
            page._onPageShow();

            if (page.clearHistory) {
                this.__clear();
            }
        }

        /**
         * Step back in history
         * @param def - Component to be loaded if history is empty
         */
        $goBack() {
            if (this._history.length) {
                let settings;
                if(this._activePage.storeLast){
                    do{
                        settings = this._history.pop();
                    }while(settings.ref === this._activePage.ref && this._history.length)
                }else{
                    settings = this._history.pop();
                }
                this._reloadPage(settings);
            }
        }

        _removePagesFromHistory(ref){
            if(this._history.length){
                let n = this._history.length;
                while(n--){
                    if(this._history[n].ref === ref){
                        this._history.splice(n,1);
                    }
                }
            }
        }

        /**
         * Reload page from history
         * @param {string} ref
         * @param {Object} props
         * @private
         */
        _reloadPage({ref, props}) {
            const page = this._pagesComponent().getByRef(ref);

            if (!page) {
                return;
            }

            if (page.clearHistory) {
                this.__clear();
            }

            this._activePage._onPageHide();
            page._onPageShow();
            page._onReload(props);
            this._activePage = page;
        }

        $forceReload({ref,props}){
            this._reloadPage({ref, props});
        }

        /**
         * Return the component where the configured pages live
         * this can be overwritten by a subclass if it's wrapped
         * in Shader contents
         * @returns {PageManager}
         * @private
         */
        _pagesComponent() {
            return this;
        }

        /**
         * Check if we have an exacte ref and props match
         * in history, so we can remove that
         * @private
         */
        __equalValueInHistory(ref, persist) {
            let pages = this._history.filter(v => v.ref === ref);
            let hasIdentifier = persist && persist.hasOwnProperty("uniqueId");
            if (!pages.length) {
                return false;
            }
            let i = 0, j = pages.length;
            for (; i < j; i++) {
                const page = pages[i];
                if(hasIdentifier){
                    if(page.props.uniqueId === persist.uniqueId){
                        return true;
                    }
                }else if (lng.Utils.equalValues(persist, page.props)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Clear full history
         * @private
         */
        __clear() {
            this._history.length = 0;
        }

        _construct(){
            this._history = [];
        }

        _init(){
            this._activeRef = this.default;
            this._activePage = this._pagesComponent().getByRef(this._activeRef);
            this._setState("InPage");
        }

        get default(){
            throw new Error("Default ref not provided");
        }

        static _states() {
            return [
                class InPage extends this {
                    $enter(){
                        this._activePage._onPageShow();
                    }
                    _getFocused() {
                        return this._activePage;
                    }
                    _handleBack(){
                        this.$goBack();
                    }
                    _captureKey(e){
                        if(e.keyCode === 83){
                            this.$loadPage({ref:"Search"});
                        }else{
                            return false
                        }

                    }
                },
                class Loading extends this {
                    $enter(){
                        this.fireAncestors("$startLoader");
                    }
                    $exit(){
                        this.fireAncestors("$stopLoader");
                    }
                    $loadingReady(){
                        this._setState("InPage");
                    }
                }
            ];
        }

        $loading(){
            this._setState("Loading");
        }
    }

    class ItemWrapper extends lng.Component {
        static _template() {
            return {
                clipbox: true,
                w: 750,
                h: 450
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

            // if item is flagged and has focus, notify parent
            // that focuspath can be recalculated
            if(this._notifyOnItemCreation && this.hasFocus()){
                this._refocus();
            }
        }

        _firstActive() {
            this.create();

            if(!ItemWrapper.FIRST_CREATED){
                this.fireAncestors("$firstItemCreated");
                ItemWrapper.FIRST_CREATED = true;
            }
        }

        _getFocused() {
            // due to lazy creation there is the possibility that
            // an component receives focus before the actual item
            // is created, therefore we set a flag
            if(!this.child){
                this._notifyOnItemCreation = true;
            }else{
                return this.child;
            }

        }
    }

    ItemWrapper.FIRST_CREATED = false;

    class More extends lng.Component{
        static _template(){
            return {
                Button: {
                    w:160, h:320, rect:true, color: 0xff000000, rtt: true,
                    Label:{
                        mountX:0.5, x: 80, mountY: 1, y: 315,
                        text:{text:"MORE", fontSize: 36, fontFace: "Bold"}
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x80ffffff
                    }
                }
            }
        }

        _init() {
            this.tag("MirrorImage").texture = this.tag("Button").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,260,160,70);
        }

        _focus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Button: {
                    Label: {
                        smooth: {y: [290, {duration: .6}]}
                    }
                },
                Focus: {x:(direction===1?0:160),smooth: {w: [160, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus(){
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Button: {
                    Label: {
                        smooth: {y: [315, {duration: .6}]}
                    }
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?160:0, {duration: .6}]}}
            });
        }

        _handleEnter(){
            this.fireAncestors("$showMore");
        }
    }

    class List extends lng.Component {
        static _template() {
            return {transitions: {alpha: {duration: .6}}, zIndex: 3,
                Title: {pivotX: 0, color: 0xff8d8c93, text: {fontSize: 32, fontFace: "Regular"}},
                Items: {
                    forceZIndexContext: true, boundsMargin: [500, 100, 500, 100], y: 62,
                    transitions: {x: {duration: .6}}
                }
            };
        }

        get active() {
            return this.tag("Items").children[this._index];
        }

        get getRealComponent() {
            return this.active.child;
        }

        get items() {
            return this._items;
        }

        set title(v) {
            this.tag("Title").patch({
                text: {text: v.toUpperCase()}
            });
        }

        set container(v){
            this._container = v;
        }

        get container(){
            return this._container;
        }

        set construct(v) {
            this._construct = v;
        }

        get construct(){
            return this._construct;
        }

        set parentWidth(v){
            this._parentWidth = v;
        }

        get parentWidth(){
            return this._parentWidth || 1920;
        }

        $lastDirection(){
            return this._lastDirection;
        }

        set items(v) {
            let construct = this._construct;
            this._videos = v;

            //@warn: since we lazy create all the items
            // we need to set the itemWrapper flag to false
            // so it can notify that the first item is created
            ItemWrapper.FIRST_CREATED = false;

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
                    };
                })
            });

            // invoke more button when we container type
            // consist of more items then displayed
            if(this._container && this._container.total && this._container.total > v.length){
                this.tag("Items").childList.add(this.stage.c({
                    type: More,
                    x:v.length * construct.width
                }));
            }
        }

        _animateToSelected(index = this._index) {
            const {width} = this._construct;
            for (let i = 0; i < this.tag("Items").children.length; i++) {
                const item = this.tag("Items").children[i];
                const {width, space} = this._construct;

                if (i >= index + 1) {
                    item.setSmooth("x", (i * width) + space, {duration: .6});
                } else {
                    item.setSmooth("x", i * width, {duration: .6});
                }
            }
            if(this._index >= 1) {
                const scrollOffset = ((index - 1) * width) - (width / 2);
                const max = this._videos.length * width - this.parentWidth;
                let position;
                if(scrollOffset >= max){
                    position = max * -1;
                }else{
                    position = scrollOffset * -1;
                }
                this.tag("Items").setSmooth("x", position - width, {duration: .8});
            } else {
                this.tag("Items").setSmooth("x", -(index * width), {duration: .8});
            }
        }

        _reset() {
            for (let i = 0; i < this.tag("Items").children.length; i++) {
                const item = this.tag("Items").children[i];
                const {width} = this._construct;
                item.setSmooth("x", (i * width), {duration: .6});
            }
        }

        _init() {
            this._items = this.tag("Items").children;
            this._index = 0;

            this.tag("Items").transition("x").on("start",()=>{
                this._listTransition = true;
            });

            this.tag("Items").transition("x").on("finish",()=>{
                this._listTransition = false;
            });


        }

        _focus() {
            this._animateToSelected();
        }

        _unfocus() {
            this._reset();
        }

        _handleLeft() {
            if (this._index > 0) {
                this.select({direction:-1});
            } else {
                return false
            }
        }

        _handleRight() {
            if (this._index < this._items.length - 1) {
                this.select({direction:1});
            }
        }

        handlePlayerNext(index){
            this.select({forceIndex:index});
        }

        select({direction, forceIndex}) {
            if(parseInt(forceIndex) === forceIndex){
                this._index = forceIndex;
            }else{
                this._lastDirection = direction;
                this._index += direction;
                this.active.direction = direction;
            }
            this._animateToSelected();
        }

        _handleEnter() {
            this.fireAncestors("$onItemSelect", {item: this.active.item, items: this._videos, sourceList:this});
        }

        $showMore(){
            this.fireAncestors("$allItemForContainer", {id:this._container.id, offset: 20, genre:this.fireAncestors("$genre")});
        }

        $itemCreatedForFocus(){
            this.application.updateFocusPath();
        }

        static _states(){
            return [
                class Loading extends this{
                    $enter(){

                    }
                    $exit(){

                    }
                    ready(){
                        this._setState("");
                    }
                }
            ];
        }

        _getFocused(){
            return this.active;
        }

        static get height() {
            return 580;
        }
    }

    class Tools{

        static getPropertyByPath(object, path, def){
            return path.split('.').reduce((o, p) => o ? o[p] : def, object);
        }

        static normalizeDuration(ms) {
            const sec = ms / 1000;
            const minutes = ~~((sec % 3600) / 60);
            const seconds = ~~sec % 60;
            return `${minutes}:${seconds<10?`0${seconds}`:seconds}`;
        }

        static normalizeNumber(num) {
            const f = v => parseFloat(v).toFixed(2);
            if (num >= 1.0e+9) {
                return `${f(num / 1.0e+9)}B`;
            } else if (num >= 1.0e+6) {
                return `${f(num / 1.0e+6)}M`;
            } else if (num > 1.0e+3) {
                return `${f(num / 1.0e+3)}K`;
            } else {
                return `-`
            }
        }

        static extractCommonColor(texture, gl, lng, {offset=90,step=60}){
            if(!texture){
                return;
            }
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


        static cleanString(str){
            return str.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        }
    }

    class Item extends lng.Component {
        static _template() {
            return {
                Content: {
                    rtt: true, w: 640, h: 320, rect: true, color: 0xff151515,
                    Image: {mount: .5, x: 320, y: 160, alpha: 0.001},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xdd000000, w: 640, h: 200, y: 120},
                    Details: {y: 325,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Artist: {
                                color: 0xffaeafb5,
                                flexItem: {marginLeft: 20, marginTop: 15, marginRight: 20},
                                text: {fontSize: 23, wordWrapWidth: 420, fontFace: "Italic"}
                            },
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: -7},
                                text: {fontSize: 36, wordWrapWidth: 420, lineHeight: 42, maxLines: 2, fontFace: "Bold"}
                            }
                        }
                    },
                    Metadata: {y: 360, alpha: 0,
                        Duration: {x: 598,
                            Label: {mountX: 1, text: {fontSize: 18, fontFace: "Regular"}},
                            Icon: {x: 37, y: -8, mountX: 1, scale: .8, src: App.getPath('images/duration.png')}
                        },
                        Views: {x: 598, y: 28,
                            Label: {mountX: 1, text: {fontSize: 18, fontFace: "Regular"}},
                            Icon: {x: 37, y: -8, mountX: 1, scale: .8, src: App.getPath('images/view.png')}
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x80ffffff
                    }
                }
            };
        }

        _init(){
            this.tag("Image").on("txLoaded", () => {
                this.patch({
                    Content: {
                        rect: false,
                        Image: {smooth: {alpha: [1, {duration: .6}]}}
                    }
                });
            });
        }

        set item(v) {
            this._item = v;

            this.patch({
                Content: {
                    Image: {src: ux.Ui.getImageUrl(`${v.image}`, {width: 680, height: 340, type: 'crop'})},
                    Details: {
                        Flex: {
                            Artist: {
                                text: {text: v.artist}
                            },
                            Title: {
                                text: {text: v.title.toUpperCase()}
                            }
                        }
                    },
                    Metadata: {
                        Views: {Label: {text: {text: Tools.normalizeNumber(v.views)}}},
                        Duration: {Label: {text: {text: Tools.normalizeDuration(v.duration)}}}
                    }
                }
            });

            this.tag("MirrorImage").texture = this.tag("Content").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,260,640,70);
        }

        get item() {
            return this._item;
        }

        _handleEnter() {
            return false;
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.1, {duration: .6}]}},
                    Details: {smooth: {y: [300, {duration: .6}], x: [15, {duration: .6}]}},
                    Metadata: {
                        smooth: {alpha: [1, {duration: .6}], y: [252, {duration: .6}]}
                    }
                },
                Focus: {x:(direction===1?0:640),smooth: {w: [640, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [325, {duration: .6}], x: [0, {duration: .6}]}},
                    Metadata: {
                        smooth: {alpha: [0, {duration: .6}], y: [360, {duration: .6}]}
                    }
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?640:0, {duration: .6}]}}
            });
        }

        static _states() {
            return [];
        }


        static get width() {
            return 730;
        }

        static get height() {
            return 490;
        }

        static get space() {
            return 0;
        }
    }

    class VideoComponent extends Item{ }

    class ArtistComponent extends Item{
        static _template() {
            return {
                Content: {
                    rtt: true, w: 320, h: 320, rect: true, color: 0xff151515,
                    Image: {mount: .5, x: 160, y: 160, alpha: 0.001},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xff000000, w: 320, h: 90, y: 230},
                    Details: {
                        y: 325,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: 15},
                                color: 0xffffffff,
                                text: {fontSize: 36, wordWrapWidth: 240, fontFace: "Bold", lineHeight: 44}
                            }
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {
                    y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x47ffffff
                    }
                }
            };
        }

        get item(){
            return this._item;
        }

        set item(v) {
            this._item = v;
            let title = this._normalize(v.title);
            this.patch({
                Content: {
                    Image: {src: v.image === null ? App.getPath('images/missing-artist.png') : ux.Ui.getImageUrl(`${v.image}`, {width: 320, height: 320, type: 'crop'})},
                    Details: {
                        Flex: {
                            Title: {
                                text: {text: title}
                            }
                        }
                    }
                }
            });

            this.tag("MirrorImage").texture = this.tag("Content").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,260,320,70);
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.15, {duration: .6}]}},
                    Details: {smooth: {y: [300, {duration: .6}], x: [15, {duration: .6}]}}
                },
                Focus: {x:(direction===1?0:320),smooth: {w: [320, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [325, {duration: .6}], x: [0, {duration: .6}]}}
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?320:0, {duration: .6}]}}
            });
        }

        _normalize(str){
            const reg = /([A-Z]{10,}|\w{15,})/g;
            const match  = reg.exec(str);

            if(match && match.length){
                let fullMatch = match[1];
                let chars = fullMatch.split("");
                let text = [];

                chars.forEach((c, idx)=>{
                    if(idx%9 === 0 && idx > 0){
                        text.push("- ");
                    }
                    text.push(c);
                });
                const result = text.join("");
                str = str.replace(fullMatch,result);
            }
            return str;
        }

        static get width() {
            return 410;
        }

        static get height(){
            return 410;
        }

        static get space() {
            return 0;
        }
    }

    class GenreComponent extends Item{
        static _template() {
            return {
                Content: {
                    rtt: true, w: 320, h: 320, rect: true, color: 0xff151515,
                    Image: {mount: .5, x: 160, y: 160, alpha: 0.001},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xff000000, w: 320, h: 90, y: 230},
                    Details: {
                        y: 325,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: 15},
                                color: 0xffffffff,
                                text: {fontSize: 36, wordWrapWidth: 240, fontFace: "Bold", lineHeight: 44}
                            }
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {
                    y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x47ffffff
                    }
                }
            };
        }

        set item(v) {
            this._item = v;

            this.patch({
                Content: {
                    Image: {src: ux.Ui.getImageUrl(`${v.image}`, {width: 320, height: 320, type: 'crop'})},
                    Details: {
                        Flex: {
                            Title: {
                                text: {text: v.title.toUpperCase()}
                            }
                        }
                    }
                }
            });

            this.tag("MirrorImage").texture = this.tag("Content").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,260,320,70);
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.1, {duration: .6}]}},
                    Details: {smooth: {y: [300, {duration: .6}], x: [15, {duration: .6}]}}
                },
                Focus: {x:(direction===1?0:320),smooth: {w: [320, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [325, {duration: .6}], x: [0, {duration: .6}]}}
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?320:0, {duration: .6}]}}
            });
        }

        static get width() {
            return 410;
        }

        static get space() {
            return 0;
        }
    }

    class PlaylistComponent extends Item{
        static _template() {
            return {
                Content: {
                    rtt: true, w: 640, h: 320, rect: true, color: 0xff151515,
                    Image: {mount: .5, x: 320, y: 160, alpha: 0.001},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xff000000, w: 640, h: 90, y: 230},
                    Details: {y: 325,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: 15},
                                text: {fontSize: 36, wordWrapWidth: 600, lineHeight: 44, fontFace: "Bold"}
                            }
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x47ffffff
                    }
                }
            };
        }

        get item(){
            return this._item;
        }

        set item(v) {
            this._item = v;

            this.patch({
                Content: {
                    Image: {src: ux.Ui.getImageUrl(`${v.image}`, {width: 680, height: 340, type: 'crop'})},
                    Details: {
                        Flex: {
                            Title: {
                                text: {text: v.title}
                            }
                        }
                    }
                }
            });

            this.tag("MirrorImage").texture = this.tag("Content").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,260,640,70);
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.1, {duration: .6}]}},
                    Details: {smooth: {y: [305, {duration: .6}], x: [15, {duration: .6}]}}
                },
                Focus: {x:(direction===1?0:640),smooth: {w: [640, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [325, {duration: .6}], x: [0, {duration: .6}]}}
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?640:0, {duration: .6}]}}
            });
        }

        static get width() {
            return 730;
        }

        static get space() {
            return 0;
        }
    }

    class ShowComponent extends Item{
        static _template() {
            return {
                Content: {
                    rtt: true, w: 640, h: 320, rect: true, color: 0xff151515,
                    Image: {mount: .5, x: 320, y: 160, alpha: 0.001},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xff000000, w: 640, h: 90, y: 230},
                    Details: {y: 325,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: 15},
                                text: {fontSize: 36, wordWrapWidth: 600, lineHeight: 44, fontFace: "Bold"}
                            }
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x47ffffff
                    }
                }
            };
        }

        set item(v) {
            this._item = v;

            this.patch({
                Content: {
                    Image: {src: ux.Ui.getImageUrl(`${v.image}`, {width: 680, height: 340, type: 'crop'})},
                    Details: {
                        Flex: {
                            Title: {
                                text: {text: v.title}
                            }
                        }
                    }
                }
            });

            this.tag("MirrorImage").texture = this.tag("Content").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,260,640,70);
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.05, {duration: .6}]}},
                    Details: {smooth: {y: [300, {duration: .6}], x: [15, {duration: .6}]}}
                },
                Focus: {x:(direction===1?0:640),smooth: {w: [640, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [325, {duration: .6}], x: [0, {duration: .6}]}}
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?640:0, {duration: .6}]}}
            });
        }

        static get width() {
            return 730;
        }

        static get space() {
            return 0;
        }
    }

    class ShowItem extends Item{
        static _template() {
            return {
                Content: {
                    rtt: true, w: 800, h: 400, color: 0xff151515, rect: true,
                    Image: {mount: .5, x: 400, y: 200, alpha: 0.001},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xdd000000, w: 800, h: 200, y: 200},
                    Details: {y: 405,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Artist: {
                                color: 0xffaeafb5,
                                flexItem: {marginLeft: 20, marginTop: 15, marginRight: 20},
                                text: {fontSize: 23, wordWrapWidth: 620, fontFace: "Italic"}
                            },
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: -7},
                                text: {fontSize: 36, wordWrapWidth: 620, lineHeight: 42, maxLines: 2, fontFace: "Bold"}
                            }
                        }
                    },
                    Metadata: {y: 440, alpha: 0,
                        Duration: {x: 758,
                            Label: {mountX: 1, text: {fontSize: 18, fontFace: "Regular"}},
                            Icon: {x: 37, y: -8, mountX: 1, scale: .8, src: App.getPath('images/duration.png')}
                        },
                        Views: {x: 758, y: 28,
                            Label: {mountX: 1, text: {fontSize: 18, fontFace: "Regular"}},
                            Icon: {x: 37, y: -8, mountX: 1, scale: .8, src: App.getPath('images/view.png')}
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 400, h: 5},
                Mirror: {y: 400,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x80ffffff
                    }
                }
            };
        }

        _init(){
            this.tag("Image").on("txLoaded", () => {
                this.patch({
                    Content: {
                        rect: false,
                        Image: {smooth: {alpha: [1, {duration: .6}]}}
                    }
                });
            });
        }

        set item(v) {
            this._item = v;

            this.patch({
                Content: {
                    Image: {src: ux.Ui.getImageUrl(`${v.image}`, {width: 840, height: 420, type: 'crop'})},
                    Details: {
                        Flex: {
                            Artist: {
                                text: {text: v.artist}
                            },
                            Title: {
                                text: {text: v.title.toUpperCase()}
                            }
                        }
                    },
                    Metadata: {
                        Views: {Label: {text: {text: Tools.normalizeNumber(v.views)}}},
                        Duration: {Label: {text: {text: Tools.normalizeDuration(v.duration)}}}
                    }
                }
            });

            this.tag("MirrorImage").texture = this.tag("Content").getTexture();
            this.tag("MirrorImage").texture.enableClipping(0,340,800,70);
        }

        get item() {
            return this._item;
        }

        _handleEnter() {
            return false;
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.1, {duration: .6}]}},
                    Details: {smooth: {y: [380, {duration: .6}], x: [15, {duration: .6}]}},
                    Metadata: {
                        smooth: {alpha: [1, {duration: .6}], y: [332, {duration: .6}]}
                    }
                },
                Focus: {x:(direction===1?0:800),smooth: {w: [800, {duration: .6}], x: [0, {duration: .6}]}}
            });

            this.fireAncestors("$setItem", {item: this._item});
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [405, {duration: .6}], x: [0, {duration: .6}]}},
                    Metadata: {
                        smooth: {alpha: [0, {duration: .6}], y: [440, {duration: .6}]}
                    }
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?800:0, {duration: .6}]}}
            });
        }

        static _states() {
            return [];
        }


        static get width() {
            return 890;
        }

        static get height() {
            return 490;
        }

        static get space() {
            return 0;
        }
    }

    class Grid extends lng.Component {
        static _template() {
            return {
                Items: {
                    forceZIndexContext: true, boundsMargin: [300, 520, 100, 300], mountX: .5, x: 960, y: 380,
                    transitions: {x: {duration: .6}, y: {duration: .6}}
                }
            };
        }

        _init() {
            this._index = 0;
        }

        set construct(v) {
            this._construct = v;
        }

        set container(v){
            this._container = v;
        }

        get container(){
            return this._container;
        }

        set items(v) {
            let construct = this._construct;

            this._items = v;
            this._itemsPerRow = Grid.ITEMS_PER_ROW[this._construct.name];

            //@warn: since we lazy create all the items
            // we need to set the itemWrapper flag to false
            // so it can notify that the first item is created
            ItemWrapper.FIRST_CREATED = false;

            this.tag("Items").patch({
                children: v.map((item, index) => {
                    return {
                        type: ItemWrapper,
                        construct: this._construct,
                        index: index,
                        item: item,
                        x: (index % this._itemsPerRow) * construct.width,
                        y: ~~(index / this._itemsPerRow) * construct.height,
                        transitions: {
                            x: {delay: .06 * index, duration: .6}
                        }
                    };
                })
            });

            this._width = (construct.width * this._itemsPerRow) - 90;
            this.tag("Items").w = (construct.width * this._itemsPerRow) - 90;
        }

        get items(){
            return this._items;
        }

        getWidth() {
            return this._width
        }

        get active() {
            return this.tag("Items").children[this._index];
        }

        get realComponent() {
            return this.active.child;
        }

        _handleUp() {
            let index = this._index;

            if (index - this._itemsPerRow >= 0) {
                index -= this._itemsPerRow;
            } else {
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

        _handleLeft() {
            const index = this._index;
            if (index%this._itemsPerRow === 0) {
                return false
            }

            if (~~(index / this._itemsPerRow) === ~~((index - 1) / this._itemsPerRow)) {
                this._select(index - 1);
            }
        }

        _handleRight() {
            const index = this._index;
            if(index === this.items.length - 1){
                return false;
            }
            if (~~(index / this._itemsPerRow) === ~~((index + 1) / this._itemsPerRow)) {
                this._select(index + 1);
            }else{
                return false
            }
        }

        _select(index) {
            if(index < 0 || index > this._items.length - 1){
                return;
            }

            const rowHasChanged = ~~(index/this._itemsPerRow) !== ~~(this._index / this._itemsPerRow);
            this._index = index;
            for (let i = 0; i < this.tag("Items").children.length; i++) {
                const item = this.tag("Items").children[i];

                if (i < ~~(index / this._itemsPerRow) * this._itemsPerRow) {
                    item.setSmooth("alpha", 0, {duration: .6});
                } else {
                    item.setSmooth("alpha", 1, {duration: .6});
                }
            }

            if(rowHasChanged){
                this.patch({
                    Items: {
                        smooth: {y: (~~(index / this._itemsPerRow) * this._construct.height) * -1 + 380}
                    }
                });
            }
        }

        _getFocused() {
            return this.active;
        }

        static _states() {
            return [];
        }
    }

    Grid.ITEMS_PER_ROW = {
        VideoComponent: 2,
        ArtistComponent: 3,
        ShowComponent: 2,
        PlaylistComponent: 2,
        GenreComponent: 3
    };

    class Videos {

        constructor(){}

        set id(v){
            this._id = v;
        }

        get id(){
            return this._id;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }

        set total(v){
            this._total = v;
        }

        get total(){
            return this._total;
        }
    }

    class Artists {

        constructor(){}

        set id(v){
            this._id = v;
        }

        get id(){
            return this._id;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }

        set total(v){
            this._total = v;
        }

        get total(){
            return this._total;
        }
    }

    class Genres {

        constructor(){}

        set id(v){
            this._id = v;
        }

        get id(){
            return this._id;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }

        set total(v){
            this._total = v;
        }

        get total(){
            return this._total;
        }
    }

    class Shows {

        constructor(){}

        set id(v){
            this._id = v;
        }

        get id(){
            return this._id;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }

        set total(v){
            this._total = v;
        }

        get total(){
            return this._total;
        }
    }

    class Premieres {

        constructor(){}

        set id(v){
            this._id = v;
        }

        get id(){
            return this._id;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }

        set total(v){
            this._total = v;
        }

        get total(){
            return this._total;
        }
    }

    class Playlists {

        constructor(){}

        set id(v){
            this._id = v;
        }

        get id(){
            return this._id;
        }

        set items(v){
            this._items = v;
        }

        get items(){
            return this._items;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }

        set total(v){
            this._total = v;
        }

        get total(){
            return this._total;
        }
    }

    class Video{
        constructor(props){
            this._description = props.description;
            this._target = props.target;
            this._image = props.thumbnail;
            this._title = props.title;
        }

        get description(){
            if(Array.isArray(this._description)){
                return this._description[0];
            }else{
                return this._description;
            }
        }

        get image(){
            if(Array.isArray(this._image)){
                return this._image[0];
            }else{
                return this._image;
            }
        }

        get target(){
            return this._target;
        }

        get title(){
            return this._title;
        }
    }

    class Artist$1{
        constructor(props){
            this._target = props.target;
            this._image = props.thumbnail;
            this._title = props.title;
        }

        get image(){
            if(Array.isArray(this._image)){
                return this._image[0];
            }else{
                return this._image;
            }
        }

        get target(){
            return this._target;
        }

        get title(){
            return this._title;
        }
    }

    class Genre{
        constructor(props={}){
            this._target = props.target;
            this._image = props.thumbnail;
            this._title = props.title;
        }

        get image(){
            if(Array.isArray(this._image)){
                return this._image[0];
            }else{
                return this._image;
            }
        }

        set target(v){
            this._target = v;
        }

        get target(){
            return this._target;
        }

        set title(v){
            this._title = v;
        }

        get title(){
            return this._title;
        }
    }

    class Show{
        constructor(props){
            this._description = props.description;
            this._target = props.target;
            this._image = props.thumbnail;
            this._title = props.title;
        }

        get description(){
            if(Array.isArray(this._description)){
                return this._description[0];
            }else{
                return this._description;
            }
        }

        get image(){
            if(Array.isArray(this._image)){
                return this._image[0];
            }else{
                return this._image;
            }
        }

        get target(){
            return this._target;
        }

        get title(){
            return this._title;
        }
    }

    class Playlist{
        constructor(props){
            this._description = props.description;
            this._target = props.target;
            this._image = props.thumbnail;
            this._title = Tools.cleanString(props.title);
        }

        get description(){
            if(Array.isArray(this._description)){
                return this._description[0];
            }else{
                return this._description;
            }
        }

        get image(){
            if(Array.isArray(this._image)){
                return this._image[0];
            }else{
                return this._image;
            }
        }

        get target(){
            return this._target;
        }

        get title(){
            return this._title;
        }
    }

    class StreamData{
        constructor(props){
            this._provider = props.provider;
            this._quality = props.quality;
            this._url = props.url;
        }

        get provider(){
            return this._provider;
        }

        get quality(){
            return this._quality;
        }

        get url(){
            return this._url;
        }
    }

    class VideoData{
        constructor(data){
            const {id, basicMetaV3:meta, streamsV3:streams} = data;
            this._id = id;
            this._image = meta.thumbnailUrl;
            this._title = meta.title;
            this._duration = meta.duration;
            this._lyricVideo = meta.lyricVideo;
            this._views = data.views && data.views.viewsTotal;
            this._likes = data.likes;

            if(meta.artists && meta.artists.length){
                const {basicMeta:{name, thumbnailUrl, urlSafeName, genres}} = meta.artists[0];
                const obj = {
                    thumbnail: thumbnailUrl,
                    title:name,
                    target: urlSafeName
                };
                this._artistObj = new Artist$1(obj);
                // todo: remove?
                this._artist = name;
                this._genres = genres;
            }

            this._streams = streams.map((stream)=>{
                return new StreamData(stream);
            });
        }

        get id(){
            return this._id;
        }

        get description(){
            return this._artist;
        }

        get artist(){
            return this._artist;
        }

        get artistObj(){
            return this._artistObj;
        }

        get duration(){
            return this._duration;
        }

        get lyricVideo(){
            return this._lyricVideo;
        }

        get genres(){
            return this._genres;
        }

        get likes(){
            return this._likes;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }

        get views() {
            return this._views;
        }

        /**
         * @returns {[StreamData]}
         */
        get streams(){
            return this._streams;
        }

        getStreamsByQuality(quality){
            let streams = this._streams.filter(stream=>stream.quality === quality);
            if(streams.length){
                return streams[0];
            }
            return [];
        }

        getStreamsByProvider(provider){
            let streams = this._streams.filter(stream=>stream.provider === provider);
            if(streams.length){
                return streams[0];
            }
            return [];
        }
    }

    class Factory{

        static create(data, stage, spreader){
            if(!Array.isArray(data)){
                data = [data];
            }
            let spread = {y:0, signals:{selectItem: true, play:true}, ...spreader};
            return data.map((obj)=>{
                if(Array.isArray(obj) && obj.length === 0){
                    return;
                }
                const list = Factory.createList({
                    obj, stage, spread,
                });
                if(list){
                    spread.y += list.constructor.height;
                    return list;
                }else{
                    return;
                }
            }).filter(Boolean);
        }

        static createList({obj, stage, spread={}}){
            const type = obj.constructor;
            if(Factory.WRAPPER.has(type)){
                const wrapper = Factory.WRAPPER.get(type);

                // test first item since we only allow items
                // of the same type in a list
                const item = obj.items[0];
                const itemType = item.constructor;

                if(Factory.ITEMS.has(itemType)){
                    const construct = Factory.ITEMS.get(itemType);
                    const item = stage.c({
                        type: wrapper, construct, container:obj, items: obj.items, title: obj.title, ...spread
                    });
                    return item;
                } else {
                    throw "Unknown type: " + itemType.name;
                }
            } else {
                throw "Unknown type: " + type.name;
            }
            return;
        }

        static createHorizontalList(items, stage){
            let container = stage.c({
                type: List, construct:ShowItem, items
            });
            return [container];
        }

        static createGrid(obj, stage){
            const items = obj.items;
            const item = items[0];
            const type = item.constructor;

            if(Factory.ITEMS.has(type)){
                const construct = Factory.ITEMS.get(type);
                let container = stage.c({
                    type: Grid, container:obj, construct, items
                });
                return [container];
            } else {
                throw "Unknown type: " + type.name;
            }
            return;
        }
    }

    Factory.WRAPPER = new Map();
    Factory.WRAPPER.set(Videos, List);
    Factory.WRAPPER.set(Artists, List);
    Factory.WRAPPER.set(Genres, List);
    Factory.WRAPPER.set(Shows, List);
    Factory.WRAPPER.set(Premieres, List);
    Factory.WRAPPER.set(Playlists, List);

    Factory.ITEMS = new Map();
    Factory.ITEMS.set(Video, VideoComponent);
    Factory.ITEMS.set(Artist$1, ArtistComponent);
    Factory.ITEMS.set(Genre, GenreComponent);
    Factory.ITEMS.set(Show, ShowComponent);
    Factory.ITEMS.set(Playlist, PlaylistComponent);
    Factory.ITEMS.set(VideoData, VideoComponent);

    class CarouselItem extends lng.Component{
        static _template() {
            return {
                alpha: 0, w: 1920, h: 1080,
                Image: {w: 1920, h: 1080},
                Box: {
                    flex: {direction: "column"}, flexItem: {}, y: 930, x: 90, mountY: 1, zIndex: 2,
                    Content: {
                        flex: {direction: "column"}, rect: true, color: 0xff000000,
                        Artist: {
                            flexItem: {marginLeft: 30, marginRight: 30, marginTop: 20}, color: 0xffaeafb5,
                            text: {fontSize: 38, wordWrapWidth: 1000, maxLines: 1, fontFace: "Italic"}
                        },
                        Title: {
                            flexItem: {marginLeft: 30, marginRight: 30, marginTop: -7},
                            text: {fontSize: 64, wordWrapWidth: 1000, lineHeight: 72, fontFace: "Bold"}
                        }
                    },
                    Footer: {
                        flex: {direction: "column"},
                        Progress: {
                            rect: true, h: 5
                        },
                        Metadata: {
                            flex: {direction: "row"},
                            IconDuration: {
                                flexItem: {marginLeft: -8, marginTop: 12},
                                src: App.getPath('images/duration.png')
                            },
                            Duration: {
                                flexItem: {marginTop: 14, marginLeft: 4},
                                text: {fontSize: 26, fontFace: "Regular"}
                            },
                            IconViews: {
                                flexItem: {marginLeft: 22, marginTop: 12},
                                src: App.getPath('images/view.png')
                            },
                            Views: {
                                flexItem: {marginTop: 14, marginLeft: 4},
                                text: {fontSize: 26, fontFace: "Regular"}
                            },
                            PlayViews: {
                                flexItem: {marginLeft: 30, marginTop: 24}, color: 0xff7a7b80,
                                src: App.getPath('images/play.png')
                            },
                            Play: {
                                flexItem: {marginTop: 14, marginLeft: 14}, color: 0xff7a7b80,
                                text: {text: `PRESS "OK" TO PLAY`, fontSize: 26, fontFace: "Regular"}
                            }
                        }
                    }
                }
            };
        }

        getWidth() {
            return this.tag("Content").finalW;
        }

        _init() {
            this._progressAnimation = this.tag("Progress").animation({duration: 12, stopMethod: "forward", actions: [
                {p: 'w', rv: 0, v: (p) => {
                    return this.getWidth() * p;
                }}
            ]});

            this._zoomAnimation = this.animation({duration: 12, stopMethod: "reverse", stopDuration: 2, actions: [
                {t: 'Image', p: 'scale', rv: 1, v: {sm: 0.2, 0: 1, 1: 1.2}}
            ]});

            this._progressAnimation.on('finish', () => {
                this.fireAncestors("$setNext");
            });
        }

        set direction(v) {
            this._direction = v;

            this._rotateAnimation = this.animation({duration: .6, stopMethod: "reverse", stopDuration: .3, actions: [
                {t: 'Image', p: 'rotation', rv: 0, v: {sm: 0.2, 0: 0, 1: {v: Math.PI * (this._direction * .03)}}}
            ]});
        }

        get item(){
            return this._item;
        }

        set item(v) {
            this._item = v;

            this.patch({
                Image: {src: ux.Ui.getImageUrl(`${v.image}`, {width: 1920, height: 1080, type: 'crop'})},
                Box: {
                    Content: {
                        Artist: {text: {text: v.description || `No artist available`}},
                        Title: {text: {text: v.title.toUpperCase() || `No title available`}}
                    },
                    Footer: {
                        Metadata: {
                            Views: {text: {text: `${Tools.normalizeNumber(v.views)}`}},
                            Duration: {text: {text: `${Tools.normalizeDuration(v.duration)}`}}
                        }
                    }
                }
            });
        }

        _focus() {
            this.patch({
                smooth: {alpha: [1, {duration: .6}]},
                Box: {
                    smooth: {y: [900, {duration: .6}], alpha: [1, {duration: .6}]}
                }
            });

            if (this._rotateAnimation) {
                this._rotateAnimation.stop();
            }

            this._zoomAnimation.start();
            this._progressAnimation.start();
        }

        _unfocus() {
            const state = this.fireAncestors("$getState");

            this._zoomAnimation.stop();
            if (state === "Carousel") {
                this.patch({
                    smooth: {alpha: [0, {duration: .6}]},
                    Image: {smooth: {colorBottom: [0xffffffff]}},
                    Box: {
                        smooth: {y: [930, {duration: .6}], alpha: [0, {duration: .6}]}
                    }
                });

                if (this._rotateAnimation) {
                    this._rotateAnimation.start();
                }
            } else {
                this.patch({
                    Image: {smooth: {colorBottom: [0x00ffffff]}},
                    Box: {
                        smooth: {y: [870, {duration: .6}], alpha: [0, {duration: .6}]}
                    }
                });
            }

            this._progressAnimation.stop();
        }
    }

    class Carousel extends lng.Component{
        static _template() {
            return {
                Items: {}
            };
        }

        _init() {
            this._index = 0;
            this._setState("Carousel");
        }

        $setNext(){
            this.select({direction: 1});
            this.application.updateFocusPath();
        }

        set items(v) {
            this._items = v;

            this.tag("Items").patch({
                children: v.map((item, index) => {
                    return {
                        type: CarouselItem, index: index, item: item,
                        transitions: {x: {delay: .06 * index, duration: .6}}
                    };
                })
            });

            this.select({direction: 0});
        }

        _handleLeft() {
            this.select({direction: -1});
        }

        _handleRight() {
            this.select({direction: 1});
        }

        handlePlayerNext(index){
            this.select({direction: 1, forceIndex:index});
        }

        get active() {
            return this.tag("Items").children[this._index]
        }

        _getFocused() {
            return this.active;
        }

        _handleEnter() {
            this.fireAncestors("$onItemSelect", {item: this.active.item, items: this._items, sourceList: this});
        }

        static _states(){
            return [
                class Loading extends this{
                    ready(){
                        this._setState("Carousel");
                    }
                },
                class Carousel extends this{
                    select({direction, forceIndex}) {
                        if(parseInt(forceIndex) === forceIndex) {
                            this._index = forceIndex;
                        } else {
                            this.active.direction = direction;
                            this._index += direction;
                            if (this._index > this._items.length - 1) {
                                this._index = 0;
                            } else if (this._index < 0) {
                                this._index = this._items.length -1;
                            }
                        }

                        this.application.updateFocusPath();
                    }
                }
            ];
        }
    }

    class NavigationButton extends lng.Component{
        static _template() {
            return {
                Content: {
                    rtt: true, w: 320, h: 320, rect: true, color: 0xff151515,
                    Image: {mount: .5, x: 160, y: 130, src: App.getPath('images/search.png')},
                    Gradient: {rect: true, colorTop: 0x00000000, colorBottom: 0xff000000, w: 320, h: 90, y: 230},
                    Details: {
                        y: 325,
                        Flex: {
                            flex: {direction: "column"}, mountY: 1, rect: true, color: 0xff000000,
                            Title: {
                                flexItem: {marginLeft: 20, marginRight: 20, marginTop: 15},
                                color: 0xffffffff,
                                text: {text: "Search", fontSize: 36, wordWrapWidth: 240, fontFace: "Bold", lineHeight: 44}
                            }
                        }
                    }
                },
                Focus: {mountY: 1, rect: true, y: 320, h: 5},
                Mirror: {
                    y: 320,
                    MirrorImage: {
                        scaleY: -1,
                        colorTop: 0x00ffffff, colorBottom: 0x47ffffff
                    }
                }
            };
        }

        _focus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1.15, {duration: .6}]}},
                    Details: {smooth: {y: [300, {duration: .6}], x: [15, {duration: .6}]}}
                },
                Focus: {x:(direction===1?0:320),smooth: {w: [320, {duration: .6}], x: [0, {duration: .6}]}}
            });
        }

        _unfocus() {
            const direction = this.fireAncestors("$lastDirection") || 1;
            this.patch({
                Content: {
                    Image: {smooth: {scale: [1, {duration: .6}]}},
                    Details: {smooth: {y: [325, {duration: .6}], x: [0, {duration: .6}]}}
                },
                Focus: {smooth: {w: [0, {duration: .6}], x:[direction===1?320:0, {duration: .6}]}}
            });
        }

        static get width() {
            return 410;
        }

        static get height(){
            return 410;
        }

        static get space() {
            return 0;
        }
    }

    class Home extends Page{
        static _template() {
            return {
                Background: {w: 1920, h: 1080, color: 0xff000000, rect: true},
                Content: {
                    Carousel: {
                        type: Carousel
                    },
                    Lists: {
                        x: 82, y: 960, alpha: .4, transitions: {y: {duration: .6}}
                    }
                },
                Overlay: {w: 1920, h: 1080, color: 0xff151515, src: App.getPath('images/background.png')}
            };
        }

        get api() {
            return this.cparent.api;
        }

        get activeList() {
            return this.items[this._index];
        }

        get items() {
            return this.tag("Lists").children;
        }

        _firstActive(){
            this._setState("Carousel");
        }

        set data(v) {
            const {slider,containers} = v;
            this.tag("Carousel").patch({
                items: slider
            });
            this.tag("Lists").patch({
                children: Factory.create(containers, this.stage)
            });
            this._attachNavigation(this.tag("Lists"));
            this._data = v;
        }

        _init() {
            this._index = 0;
            this._lists = this.tag("Lists").children;
            this._setState("Carousel");
            this._focusColor = 0xff444959;
        }

        $getState() {
            return this.state
        }

        $changeAmbient({color}) {
            this.patch({
                Overlay: {smooth: {color: [color, {duration: 2}]}}
            });

            this.tag("Carousel").setColor({color});

            this._focusColor = color;
        }

        $getFocusColor() {
            return this._focusColor
        }

        _attachNavigation(component){
            const lastList = this.items[this.items.length - 1];
            const list = this.stage.c({
                type: List, construct:NavigationButton, y:lastList.y + lastList.construct.height + 100, title:"Search & Settings"
            });
            list.items = [{label:"Search",loadPage:"Search"}];
            component.add(list);
        }

        static _states() {
            return [
                class Loading extends this {
                    $firstItemCreated() {
                        this.fireAncestors("$loadingReady");
                        this._setState(this._appReturnState || "Carousel");
                    }
                },
                class Carousel$$1 extends this {
                    $enter() {
                        this.patch({
                            Content: {
                                Carousel: {
                                    smooth: {alpha: [1, {duration: .6}], y: [0, {duration: .6}]}
                                },
                                Lists: {
                                    smooth: {alpha: [.4, {duration: .6}], y: [960, {duration: .6}]}
                                }
                            },
                            Overlay: {
                                smooth: {y: [0, {duration: .6}]}
                            }
                        });
                        this.fireAncestors("$logo", {x: 82, y: 82});
                    }
                    _handleDown() {
                        this._setState("Lists");
                    }
                    _getFocused() {
                        return this.tag("Carousel");
                    }
                },
                class Lists extends this {
                    $enter() {
                        this.patch({
                            Content: {
                                Carousel: {
                                    smooth: {alpha: [.4, {duration: .8}], y: [-200, {duration: .8}]}
                                },
                                Lists: {
                                    smooth: {alpha: [1, {duration: .6}], y: [380, {duration: 1}]}
                                }
                            },
                            Overlay: {
                                smooth: {y: [-200, {duration: .6}]}
                            }
                        });
                        this._animateToSelected(0);
                        this.fireAncestors("$logo", {x: 82, y: 164});
                    }
                    _active(){
                        this.fireAncestors("$logo", {x: 82, y: 164});
                    }
                    _handleUp() {
                        if (this._index > 0) {
                            this._animateToSelected(-1);
                        } else {
                            this._setState("Carousel");
                        }
                    }

                    _handleDown() {
                        if (this._index < this.items.length - 1) {
                            this._animateToSelected(1);
                        }
                    }

                    _animateToSelected(offset) {
                        let scrollOffset = 0;
                        this._index += offset;

                        this.items[this._index].setSmooth("alpha", 1, {duration: .6});
                        for (let i = 0, j = this.items.length; i < j; i++) {
                            let item = this.items[i];
                            if (i < this._index) {
                                item.setSmooth("alpha", 0, {duration: .6});
                                scrollOffset += item.constructor.height;
                            } else if(i === this._index) {
                                item.setSmooth("alpha", 1, {duration: .6});
                            } else {
                                item.setSmooth("alpha", .4, {duration: .6});
                            }
                        }

                        this.patch({
                            Content: {
                                Lists: {smooth: {y: [offset ? scrollOffset * -1 + 380 : 380]}}
                            }
                        });
                    }
                    _getFocused() {
                        return this.activeList;
                    }
                }
            ];
        }

        /** Page settings */

        _onLoad(data){
            this._setState("Loading");
            this.fireAncestors("$collection").reset();
            this.data = data;
        }

        _onReload(data){
            this.fireAncestors("$collection").reset();
            this.fireAncestors("$loadingReady");
            // should be done via a pageRouter hook
            this.fireAncestors("$hook",{
                fn:function(){
                    this.tag("Search").reset();
                }
            });
        }

        _onPageShow(){
            this.setSmooth("alpha",1);
        }

        _onPageHide(){
            this._appReturnState = this.state;
            this.setSmooth("alpha",0);
        }

        get store(){
            return true;
        }

        get requiresLoading() {
            return true;
        }

        get persist(){
            return this._data;
        }

        get clearHistory(){
            return true;
        }
    }

    class Artist$2 extends Page{

        static _template(){
            return {
                Background:{
                    x: 520, w:1400, h:1080, colorLeft: 0x00ffffff, alpha: 0.001
                },
                Overlay: {w: 1920, h: 1080, color: 0xff151515, src: App.getPath('images/background.png')},
                Header:{
                    flex:{direction:"row"}, y: 180, x: 374, zIndex: 4,
                    Spacer: {
                        flexItem: {marginRight:10},
                        text:{text:"/ ", fontSize:48, lineHeight: 54, fontFace:"Bold"}
                    },
                    Title:{
                        flexItem: {marginRight:20},
                        text:{text:"", fontSize:48, wordWrapWidth: 900, maxLines: 2, lineHeight: 60, fontFace:"Regular"}
                    },
                    Icon:{
                        flexItem:{marginRight:5, marginTop: 19}, color: 0xffaeafb5, src: App.getPath('images/likes.png'), scale: .6
                    },
                    Likes:{
                        flexItem:{marginRight:5, marginTop: 19}, color: 0xffaeafb5, text:{fontSize:28, fontFace: "Regular"}
                    }
                },
                Genres:{
                    y: 180, x: 1800, mountX: 1, flex:{direction:"row"},
                    GenreItems:{
                        flex:{direction:"row"}
                    }
                },
                List:{
                    x:100, y: 430
                },
                Related:{
                    x: 100, y: 1050, alpha: .4
                }
            };
        }

        _init(){
            this.tag("Background").on("txLoaded", () => {
                this.patch({
                    Background: {
                        smooth: {alpha: [.4, {duration: 1.2}]}
                    }
                });
            });
        }

        set data(v){
            this._data = v;
            this._hasVideos = false;

            if(v.videos){
                this.tag("List").children = Factory.createHorizontalList(v.videos, this.stage);
                this._hasVideos = true;
            }else{
                this.tag("List").childList.clear();
            }

            const related = Factory.create(v.relatedArtists, this.stage);

            this.tag("Background").alpha = 0.001;
            this.tag("Background").src = '';
            this.patch({
                Background:{src:ux.Ui.getImageUrl(`${v.image}`, {width: 1400, height: 1080, type: 'crop'})},
                Header:{
                    Title: {text: {text: `${v.name}`}},
                    Likes:{
                        text:{text:`${Tools.normalizeNumber(v.likes)}`}
                    }
                },
                Related:{
                    children: related
                }
            });

            if(v.genres && v.genres.length){
                this.tag("GenreItems").children = v.genres.filter((item, index)=> {return index < 2;}).map((item)=>{
                    return {type:GenreItem, item};
                });
            }
        }

        get videos(){
            return this.tag("List").children;
        }

        _focus() {
            this._genreIndex = 0;
            this.patch({
                List: {
                    smooth: {y: [320, {duration: .8}]}
                },
                Related: {
                    smooth: {y: [940, {duration: .8}]}
                }
            });
        }

        _unfocus() {
            this.patch({
                List: {
                    smooth: {y: [430, {duration: .8}]}
                },
                Related: {
                    smooth: {y: [1050, {duration: .8}]}
                }
            });
        }

        _active() {
            this.patch({
                Header: {
                    smooth: {x: [402, {duration: .6}]}
                }
            });
        }

        _inactive() {
            this.patch({
                Header: {
                    smooth: {x: [374, {duration: .6}]}
                }
            });
        }

        get genreItems(){
            return this.tag("GenreItems").children;
        }

        get activeGenre(){
            return this.genreItems[this._genreIndex];
        }

        static _states(){
            return [
                class Loading extends this {
                    $firstItemCreated() {
                        this.fireAncestors("$loadingReady");
                        this._setState(this._hasVideos?"List":"Related");
                    }
                },
                class List extends this{
                    $enter(){
                        this.patch({
                            List: {
                                smooth: {alpha: [1, {duration: .6}], y: [320, {duration: .8}]}
                            },
                            Related: {
                                smooth: {alpha: [.4, {duration: .6}], y: [940, {duration: .8}]}
                            }
                        });
                    }
                    _getFocused() {
                        return this.tag("List").children[0];
                    }
                    _handleDown(){
                        this._setState("Related");
                    }
                    _handleUp(){
                        this._setState("Genres");
                    }
                },
                class Related extends this{
                    $enter(){
                        this.patch({
                            List: {
                                smooth: {alpha: [0, {duration: .6}], y: [-240, {duration: .8}]}
                            },
                            Related: {
                                smooth: {alpha: [1, {duration: .6}], y: [380, {duration: .8}]}
                            }
                        });
                    }
                    _getFocused() {
                        return this.tag("Related").children[0];
                    }
                    _handleUp(){
                        if(this._hasVideos){
                            this._setState("List");
                        }else{
                            this._setState("Genres");
                        }
                    }
                },
                class Genres extends this{
                    _handleDown(){
                        if(this._hasVideos){
                            this._setState("List");
                        }else{
                            this._setState("Related");
                        }
                    }
                    _getFocused(){
                        return this.activeGenre;
                    }
                    _handleLeft(){
                        const index = this._genreIndex;
                        if(index > 0){
                            this._select(index-1);
                        }
                    }
                    _handleRight(){
                        const index = this._genreIndex;
                        if(index < this.genreItems.length - 1){
                            this._select(index+1);
                        }
                    }
                    _handleEnter(){
                        const name = this.activeGenre.item.title;
                        const matched = this.fireAncestors("$api").getUrlSafeGenre(name);
                        if(matched){
                            this.activeGenre.item.target = matched;
                            this.fireAncestors("$onItemSelect",{item: this.activeGenre.item});
                        }else{
                            this.fireAncestors("$error",{message:`No contents available for: ${name}`});
                        }

                    }
                    _select(index){
                        this._genreIndex = index;
                    }
                }
            ];
        }

        _onLoad(data){
            this._setState("Loading");
            this.data = data;
        }

        _onReload({data}){
            this._setState("Loading");
            this.data = data;
        }

        _onPageShow(){
            this.fireAncestors("$logo", {x: 100, y: 164});
            this.setSmooth("alpha",1);
        }

        _onPageHide(){
            this.setSmooth("alpha",0);
        }

        get store(){
            return true;
        }

        get storeLast() {
            return true;
        }

        get requiresLoading() {
            return true;
        }

        get persist(){
            return {
                data: this._data,
                uniqueId: this._data.urlSafeName
            };
        }
    }

    class GenreItem extends lng.Component{
        static _template(){
            return {
                color: 0xaa8d8c93, text:{text:"Rock", fontSize:48, fontFace: "Regular"}, flexItem:{marginLeft:60}
            }
        }

        _focus(){
            this.setSmooth("color", 0xffffffff);
        }

        _unfocus(){
            this.setSmooth("color", 0xaa8d8c93);
        }

        set item(v){
            this._item = v;
            this.text.text = v.title.toUpperCase();
        }

        get item(){
            return this._item;
        }
    }

    //@todo: one base class and let Home / Genre extend it
    class Genre$1 extends Page{
        static _template(){
            return {
                w: 1920, h: 1080, rect: true, color: 0xff000000,
                Background:{
                    Image: {alpha: 0.001, colorBottom: 0x00ffffff},
                    Title:{
                        y:180, x:374, zIndex: 4, text:{text:"", fontSize:48, fontFace:"Bold"}
                    }
                },
                Content:{
                    Lists: {
                        x: 100, y: 480, transitions: {y: {duration: .6}}
                    }
                }
            };
        }

        set data(v) {
            this._data = v;
            const {containers, image, title} = v;

            this.tag("Image").alpha = 0.001;
            this.tag("Image").src = '';
            this.patch({
                Background:{
                    Image: {src: ux.Ui.getImageUrl(`${image}`, {width: 1920, height: 500, type: 'crop'})},
                    Title:{
                        text:{text:`/ ${title.toUpperCase()}`}
                    }
                },
                Content:{
                    Lists:{
                        children: Factory.create(containers, this.stage)
                    }
                }
            });

            this.fireAncestors("$loadingReady");
        }


        get activeList() {
            return this.items[this._index];
        }

        get items() {
            return this.tag("Lists").children;
        }

        _active(){
            this.tag("Title").setSmooth("x", 402, {duration: .6});
        }

        _inactive(){
            this.tag("Title").setSmooth("x", 374, {duration: .6});
        }

        _init() {
            this._index = 0;
            this._lists = this.tag("Lists").children;

            this.tag("Image").on("txLoaded", () => {
                this.patch({
                    Background: {
                        Image: {
                            smooth: {alpha: [.4, {duration: 1.2}]}
                        }
                    }
                });
            });

            this._setState("Loading");
        }

        $getState() {
            return this.state
        }

        $changeAmbient({color}) {
            this.patch({
                Overlay: {smooth: {color: [color, {duration: 2}]}}
            });
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.fireAncestors("$collection").reset();
                    }
                    $exit() {

                    }
                    $firstItemCreated() {
                        this._index = 0;
                        this._setState("Lists");
                    }
                },
                class Lists extends this {
                    $enter() {
                        this.patch({
                            Content: {
                                Lists: {
                                    smooth: {y: [380, {duration: .6}]}
                                }
                            }
                        });
                        this._animateToSelected(0);
                    }

                    _handleUp() {
                        if (this._index > 0) {
                            this._animateToSelected(-1);
                        }else{
                            return false;
                        }
                    }

                    _handleDown() {
                        if (this._index < this.items.length - 1) {
                            this._animateToSelected(1);
                        }
                    }
                    _animateToSelected(offset) {
                        let scrollOffset = 0;
                        this._index += offset;

                        this.items[this._index].setSmooth("alpha", 1, {duration: .6});
                        for (let i = 0, j = this.items.length; i < j; i++) {
                            let item = this.items[i];
                            if (i < this._index) {
                                item.setSmooth("alpha", 0, {duration: .6});
                                scrollOffset += item.constructor.height;
                            } else if(i === this._index) {
                                item.setSmooth("alpha", 1, {duration: .6});
                            } else {
                                item.setSmooth("alpha", .2, {duration: .6});
                            }
                        }

                        this.patch({
                            Content: {
                                Lists: {smooth: {y: [offset ? scrollOffset * -1 + 380 : 380]}}
                            }
                        });
                    }

                    _getFocused() {
                        return this.activeList;
                    }
                }
            ];
        }

        $genre(){
            return this._data.target;
        }

        _onLoad(data){
            this._setState("Loading");
            this.data = data;
        }

        _onReload(){
            this.fireAncestors("$loadingReady");
        }

        _onPageShow(){
            this.fireAncestors("$logo", {x: 100, y: 164, duration:0.3});
            this.setSmooth("alpha",1);
        }

        _onPageHide(){
            this.setSmooth("alpha",0);
        }

        get store(){
            return true;
        }

        get requiresLoading() {
            return true;
        }

        get persist(){
            return this._data;
        }
    }

    class Show$1 extends Page{
        static _template(){
            return {
                Background:{
                    w:1920, h:420, colorBottom: 0x00ffffff, alpha: .25
                },
                Overlay: {w: 1920, h: 1080, color: 0xff151515, src: App.getPath('images/background.png')},
                Title:{
                    y:180, x:380, zIndex: 2, text:{text:"", fontSize:48, fontFace:"Bold"}
                },
                List:{
                    x:100, y: 430, w: 700, h:1080
                }
            };
        }

        set data(v){
            this._data = v;
            const container = Factory.createHorizontalList(v.videos, this.stage);
            this.patch({
                Background:{src:ux.Ui.getImageUrl(`${v.image}`, {width: 1920, height: 430, type: 'crop'})},
                Title: {text: {text: `/ ${v.title}`}},
                List:{
                    children: container
                }
            });
        }

        static _states(){
            return [
                class Loading extends this {
                    $firstItemCreated() {
                        this.fireAncestors("$loadingReady");
                        this._setState("List");
                    }
                },
                class List extends this{
                    _getFocused() {
                        return this.tag("List").children[0];
                    }
                }
            ];
        }

        _focus(){
            this.patch({
                List: {
                    smooth: {y: [320, {duration: .6}]}
                }
            });
        }

        _unfocus(){
            this.patch({
                List: {
                    smooth: {y: [430, {duration: .6}]}
                }
            });
        }

        _onLoad(data){
            this._setState("Loading");
            this.data = data;
        }

        _onReload(data){

        }

        _onPageShow(){
            this.setSmooth("alpha",1);
        }

        _onPageHide(){
            this.setSmooth("alpha",0);
        }

        get store(){
            return true;
        }

        get requiresLoading() {
            return true;
        }

        get persist(){
            return this._data;
        }
    }

    class RangeSelector extends lng.Component{

        static _template(){
            return {
                Output:{
                    flex: {direction: "row"}, mountX: 1,
                    Left:{
                        flexItem: {marginTop: 13},
                        color: 0xaa8d8c93, src: App.getPath("images/arrow-small.png")
                    },
                    Current: {
                        flexItem: {marginLeft: 15},
                        color: 0xaa8d8c93, text: {text:"", textAlign: "center", fontSize:48, fontFace:"Regular"}
                    },
                    Max:{
                        flexItem: {marginLeft: 15, marginRight: 15},
                        color: 0xaa8d8c93, text: {text:"", fontSize:48, fontFace:"Regular"}
                    },
                    Right: {
                        flexItem: {marginTop: 13},
                        color: 0xaa8d8c93, src: App.getPath("images/arrow-small.png"), rotation: Math.PI
                    }
                }
            }
        }

        _init() {
            this._activeValue = 2;
        }

        _handleLeft(){
            this._decrease();
        }

        _handleRight(){
            this._increase();
        }

        update({current, max=this._max}){
            this._value = current;
            this._max = max;

            this.tag("Output").patch({
                Current:{text:{text:`${current}`}},
                Max:{text:{text:`/ ${max}`}}
            });
        }

        _increase(){
            let next = this._value + 1;
            if(next <= this._max){
                this.update({current: next});
            } else {
                this._value = 1;
                this.update({current: this._value});
            }
        }

        _decrease(){
            let prev = this._value - 1;
            if(prev > 0 ){
                this.update({current: prev});
            } else {
                this._value = this._max;
                this.update({current: this._value});
            }
        }

        _focus(){
            this.patch({
                Output:{
                    Current:{
                        smooth: {color: 0xffffffff}
                    },
                    Left:{
                        smooth: {color: 0xffffffff}
                    },
                    Right:{
                        smooth: {color: 0xffffffff}
                    }
                }
            });
        }

        _unfocus(){
            this.patch({
                Output:{
                    Current:{
                        smooth: {color: 0xaa8d8c93}
                    },
                    Left:{
                        smooth: {color: 0xaa8d8c93}
                    },
                    Right:{
                        smooth: {color: 0xaa8d8c93}
                    }
                }
            });

            this.update({current: this._activeValue});
        }

        set activeValue(v) {
            this._activeValue = v;
        }

        get value(){
            return this._value;
        }

    }

    class Collection extends Page {
        static _template() {
            return {
                w: 1920, h: 1080, rect: true, colorTop: 0xff151515, colorBottom: 0xff000000,
                Content: {
                    w: 1920, h: 1080, scale: .95,
                    Grid: {
                        transitions: {y: {duration: .6}}
                    },
                    Arrows: {
                        y: 490, mountY: .5, w: 1720,
                        Left: {color: 0xaa8d8c93, x: 112, src: App.getPath('images/arrow.png')},
                        Right: {color: 0xaa8d8c93, x: 1808, mountX: 1, rotation: Math.PI, src: App.getPath('images/arrow.png')}
                    },
                    Title: {
                        x: 390, y: 180, zIndex: 4,
                        text: {text: "", fontSize: 48, fontFace: "Regular"}
                    },
                    Range: {
                        type: RangeSelector, y: 180, x: 1800, mountX: 1
                    }
                }
            };
        }

        _init() {
            this._offset = 20;
        }

        _endLoading() {
            this._patchContent(true);
        }

        _unfocus() {
            this._patchContent(false);
        }

        _focus() {
            this._patchContent(true);
        }

        _patchContent(v){
            this.patch({
                Content: {
                    smooth: {scale: [v?1:.95, {duration: .6}]},
                    Title: {smooth: {x: [v?470:390, {duration: .6}]}},
                    Range: {smooth: {x: [v?1720:1770, {duration: .6}]}},
                    Arrows: {
                        Left: {smooth: {x: [v?162:112, {duration: .6}]}},
                        Right: {smooth: {x: [v?1758:1808, {duration: .6}]}}
                    }
                }
            });
        }

        set data(v) {
            this._data  = v;

            this.tag("Content").patch({
                Grid:{children: Factory.createGrid(v, this.stage)},
                Title:{text:{text:`/ ${v.title}`}}
            });

            this._container = this.active.container;

            let current = ~~(this._offset / Collection.LIMIT);
            const max = ~~(this._container.total / Collection.LIMIT);

            if(this._container && this._container.total){
                this.tag("Range").update({
                    current: current + 1,
                    max: max + 1
                });
            }
            this.tag("Range").activeValue = current + 1;

            this.tag("Arrows").patch({
                Left:{smooth:{alpha:this._offset === 0 ? 0 : 1}},
                Right:{smooth:{alpha:current === max ? 0 : 1}}
            });
        }

        get items() {
            return this.tag("Grid").children;
        }

        get active() {
            return this.items[0];
        }

        _fetchItemsByOffset(offset=this._offset) {
            this._offset = offset;
            this.fireAncestors("$allItemForContainer", {
                id: this._container.id,
                offset: this._offset,
                limit: Collection.LIMIT,
                genre: this._genre
            });

            this.fireAncestors("$logo", {x: 112, y: 176});
        }

        reset() {
            this._offset = 20;
        }

        static _states() {
            return [
                class Loading extends this {
                    $firstItemCreated() {
                        this.fireAncestors("$loadingReady");
                        this._setState("Grid");
                    }
                },
                class Grid extends this {
                    $enter() {
                        this.patch({
                            Content: {Arrows: {
                                    Left: {smooth: {color: 0xffffffff}},
                                    Right: {smooth: {color: 0xffffffff}}
                                }
                            }
                        });

                        this._endLoading();
                    }

                    _handleLeft() {
                        let offset = this._offset;
                        if (offset === 0) {
                            return;
                        }
                        offset -= Collection.LIMIT;
                        offset = Math.max(offset, 0);
                        this._fetchItemsByOffset(offset);
                    }

                    _handleRight() {
                        const offset = this._offset += Collection.LIMIT;
                        this._fetchItemsByOffset(offset);
                    }

                    _getFocused() {
                        return this.active;
                    }

                    // gets fired when first list is reached
                    // and event bubbles
                    _handleUp() {
                        this._setState("Range");
                    }

                    _handleEnter() {
                        this.fireAncestors("$onItemSelect", {
                            item: this.active.realComponent.item,
                            items: this.active.items
                        });
                    }
                },
                class Range extends this {
                    $enter(){
                        this.patch({
                            Content: {Arrows: {
                                    Left: {smooth: {color: 0xaa8d8c93}},
                                    Right: {smooth: {color: 0xaa8d8c93}}
                                }
                            }
                        });
                    }

                    _handleDown() {
                        this._setState("Grid");
                    }

                    _handleBack() {
                        this._setState("Grid");
                    }

                    _handleUp(){
                        // capture
                    }

                    _handleEnter() {
                        const value = this.tag("Range").value - 1;
                        const offset = value * Collection.LIMIT;
                        this.tag("Range").activeValue = value + 1;
                        this._fetchItemsByOffset(offset);
                    }

                    _getFocused() {
                        return this.tag("Range");
                    }
                }
            ];
        }

        _onLoad({data, genre}) {
            this._setState("Loading");
            this._genre = genre;
            this.data = data;
        }

        _onReload({data}) {
            this._setState("Loading");
            this.data = data;
        }

        _onPageShow() {
            this.fireAncestors("$logo", {x: 162, y: 164});
            this.setSmooth("alpha", 1);
        }

        _onPageHide() {
            this.setSmooth("alpha", 0);
        }

        get persist() {
            return {
                data: this._data
            };
        }

        get store() {
            return true;
        }

        get storeLast() {
            return true;
        }

        get requiresLoading() {
            return true;
        }
    }

    Collection.LIMIT = 20;

    class Keyboard extends lng.Component {

        static _template() {
            return {};
        }

        _init() {
            this._index = 0;
        }

        set index(v) {
            this._index = v;
        }

        get index() {
            return this._index;
        }

        get active() {
            return this.children[this._index];
        }

        reset(){
        }

        set characters(v) {
            this._characters = v;
            this.children = v.map((el, idx) => {
                return {
                    type: Button, x: ~~(idx % this._columns) * 70, y: ~~(idx / this._columns) * 90, label: el
                };
            });
        }

        set columns(v) {
            this._columns = v;
        }

        _handleUp() {
            const idx = this._index;
            if (idx >= this._columns) {
                this.fire("select", {index: this._index - this._columns});
            } else {
                this._lastIndex = this._index;
                return false;
            }
        }

        _handleDown() {
            const next = this._index + this._columns;
            if (next <= this.children.length - 1) {
                this.fire("select", {index: next});
            } else {
                return false;
            }
        }

        _handleLeft() {
            const pos = this._index % this._columns;
            if (pos > 0) {
                this.fire("select", {index: this._index - 1});
            } else {
                this.signal("menu", {}, true);
            }
        }

        _handleRight() {
            const pos = this._index % this._columns;
            if (pos < this._columns - 1 && this._index < this._characters.length - 1) {
                this.fire("select", {index: this._index + 1});
            } else {
                return false;
            }
        }

        _handleEnter(){
            this.fireAncestors("$input", {char:this.active.label});
        }

        select({index}) {
            this._index = index;
            this.application.updateFocusPath();
        }

        _getFocused() {
            return this.active;
        }
    }

    class Button extends lng.Component {
        static _template() {
            return {
                w: 70, h: 90, rect: true, color:0x00000000,
                Label: {mount: 0.5, x: 35, y: 45, text: {text: "", fontSize: 36, fontFace: "Regular"}}
            };
        }

        set label(v) {
            this._label = v;
            this._isNumber = !isNaN(v);
            this.patch({
                Label: {color: this._isNumber ? 0xaa8d8c93 : 0xffffffff, text: {text: v}}
            });
        }

        get label(){
            return this._label;
        }

        _focus() {
            this.patch({
                color:0xffffffff,
                Label:{
                    color:0xff000000
                }
            });
        }

        _unfocus(){
            this.patch({
                color:0x00000000,
                Label:{
                    color: this._isNumber ? 0xaa8d8c93 : 0xffffffff
                }
            });
        }
    }

    class Actions extends lng.Component {
        static _template() {
            return {
                Backspace: {
                    flexItem: {},
                    label: "Delete",
                    type: Action,
                    action: "delete"
                },
                Clear: {
                    flexItem: {},
                    label: "Clear",
                    type: Action,
                    action: "clear"
                }
            };
        }

        set index(v) {
            this._index = v;
        }

        get index() {
            return this._index;
        }

        get active() {
            return this.children[this._index];
        }

        _init() {
            this._index = 0;
        }

        _handleLeft() {
            if (this._index > 0) {
                this.fire("select", {index: this._index - 1});
            } else {
                return false
            }
        }

        _handleRight() {
            if (this._index < this.children.length - 1) {
                this.fire("select", {index: this._index + 1});
            }
        }

        _handleEnter() {
            this.fireAncestors("$action",{action:this.active.action});
        }

        select({index}) {
            this._index = index;
            this.application.updateFocusPath();
        }

        _getFocused() {
            return this.active;
        }
    }

    class Action extends lng.Component {
        static _template() {
            return {
                color: 0xaa8d8c93, text:{text:"Rock", fontSize:48, fontFace: "Regular"}, flexItem:{marginLeft:60}
            };
        }

        set width(v) {
            this.patch({
                Label: {x: v / 2}
            });
        }

        set action(v) {
            this._action = v;
        }

        get action() {
            return this._action;
        }

        set label(v) {
            this.text.text = v;
        }

        _focus(){
            this.setSmooth("color", 0xffffffff);
        }

        _unfocus(){
            this.setSmooth("color", 0xaa8d8c93);
        }

    }

    class InputField extends lng.Component{

        static _template(){
            return {
                flex: {direction: "row"},
                Divider: {
                    flexItem: {}, color: 0xaa8d8c93,
                    text: {text: `/ Search`, fontSize: 48, fontFace: "Regular"}
                },
                Label:{
                    flexItem: {},
                    text: {text: ``, fontSize: 48, fontFace: "Regular"}
                }
            }
        }

        _init(){
            this._query = '';
        }

        feed(char){
            this.update({query:`${this._query}${char}`});
        }

        update({query=this._query}){
            this._query = query;
            let output = query;


            if(output.length > InputField.MAX_VISIBLE_CHARS){
                const offset = output.length - InputField.MAX_VISIBLE_CHARS;
                output = `...${output.substring(offset, output.length)}`;
            }

            this.patch({
                Divider:{
                    text:{text:query.length > 0 ? `/ Results for ` : `/ Search`}
                },
                Label:{
                    text:{text:query.length > 0 ? `"${output.toUpperCase()}"`: ``}
                }
            });

        }

        clear(){
            this._query = "";
            this.update({});
        }

        delete(){
            this.update({query: this._query.substring(0, this._query.length - 1)});
        }

        space(){
            this.feed(" ");
        }

        get value(){
            return this._query;
        }
    }

    InputField.MAX_VISIBLE_CHARS = 14;

    class Loader extends lng.Component{

        static _template() {
            return {
                zIndex: 99,
                Label: {y: 340, x: 655, mount: .5, color: 0xaa8d8c93,
                    text: {text: "Searching", fontSize: 42, fontFace: "Regular"}
                },
                Loader:{
                    w: 170, h: 5, mount: .5, x: 655, y: 375,
                    White: {clipping: true, h: 5, w: 0, mountX: 0,
                        Background: {
                            w: 170, h: 5, rect: true, color: 0xaa8d8c93
                        }
                    }
                }
            };
        }

        _init(){
            this._loaderAnimation = this.animation({duration: 2, repeat: -1, actions: [
                    {t: 'Loader.White', p: 'w', rv: 0, v: {sm: .3, 0: 0, .25: 170, .5: 170, .75: 0}},
                    {t: 'Loader.White', p: 'x', rv: 170, v: {sm: .3, 0: 170, .25: 0, .5: 0, .75: 170}}
                ]});
        }

        _active(){
            this._loaderAnimation.start();
        }

        _inactive(){
            this._loaderAnimation.stop();
        }

    }

    class Search extends Page {

        static _template(){
            return {
                w: 1920, h: 1080, rect: true, colorTop: 0xff151515, colorBottom: 0xff000000,
                Content: {w: 1920, h: 1080,
                    Results:{
                        x: 680, y: 360, transitions: {y: {duration: .6}}, alpha: 0
                    },
                    Loader:{
                        type: Loader, zIndex:99, x: 610, y: 290, alpha: 0
                    },
                    Query:{
                        zIndex: 5, x: 390, y: 180, type:InputField
                    },
                    Placeholder: {y: 630, x: 1265, mount: .5, color: 0xaa8d8c93,
                        text: {text: "(Your search results will appear here)", fontSize: 42, fontFace: "Regular"}
                    },
                    NoResults: {y: 630, alpha:0, x: 1265, mount: .5, color: 0xaa8d8c93,
                        text: {text: "No results", fontSize: 42, fontFace: "Regular"}
                    },
                    Actions:{
                        type: Actions, flex: {direction: "row"}, mountX: 1, x: 1758, y: 180,
                    },
                    Search: {
                        zIndex: 4, rect: true, w: 680, h: 1080, colorTop: 0xff151515, colorBottom: 0xff000000,
                        Keyboard:{x: 162, y: 340,
                            Letters:{
                                type: Keyboard, columns: 6, characters: [
                                    'A','B','C','D','E','F',
                                    'G','H','I','J','K','L',
                                    'M','N','O','P','Q','R',
                                    'S','T','U','V','W','X',
                                    'Y','Z','1','2','3','4',
                                    '5','6','7','8','9','0'
                                ]
                            },
                            Space: {y: 540, color: 0x00ffffff, x: 100,
                                texture: lng.Tools.getRoundRect(220, 90, 0, 0, 0x00ffffff, true, 0xffffffff),
                                Label: {mount: 0.5, x: 110, y: 47,
                                    text: {text: "SPACE", fontSize: 32, fontFace: "Regular"}
                                }
                            }
                        }
                    }
                }
            }
        }

        _init(){
            this._index = 0;
            this._setState("Keyboard.Letters");
        }

        _focus(){
            this._searchQueue = 0;
            this._patchContent(true);
        }

        _unfocus(){
            this._patchContent(false);
        }

        _patchContent(v){
            this.patch({
                Content: {
                    smooth: {scale: [v?1:.95, {duration: .6}]},
                    Query: {smooth: {x: [v?470:390, {duration: .6}]}}
                }
            });
        }

        get items() {
            return this.tag("Results").children;
        }

        get active() {
            return this.items[0];
        }

        $input({char}){
            this.tag("Query").feed(char);

            clearTimeout(this._timeout);

            this._timeout = setTimeout(()=>{
                this._search();
            },500);
        }

        $action({action}){
            this.tag("Query")[action]();
            this._search();
        }

        _search(){
            const query = this.tag("Query").value;
            if(!this._isValidSearchQuery(query)){
                this._flagSearchInvalid();
                return;
            }

            this._prepareNewSearchRound();

            this.fireAncestors("$api").search(query).then((results)=>{
                this._searchQueue-=1;
                // we only want to output the result from the last
                // search query, so we only output results
                // if the last queued results are resolved
                if(this._searchQueue > 0){
                    return;
                }

                if(!this._invalidSearch){
                    this._outputResults(results);
                }
            });
        }

        _isValidSearchQuery(query){
            return query.length > 0 && !/^\s{1,}/ig.test(query);
        }

        _flagSearchInvalid(){
            this._invalidSearch = true;

            this._toggle(Search.VISIBILITY.PLACEHOLDER);

            this.tag("Results").childList.clear();
        }

        _prepareNewSearchRound(){
            // increase queue so we only output
            // results when the queue is empty
            this._searchQueue+=1;
            this._index = 0;
            // flag current as valid search
            this._invalidSearch = false;

            this._toggle(Search.VISIBILITY.LOADER);
        }

        _outputResults(results){
            if(!results.length){
                this._toggle(Search.VISIBILITY.NORESULTS);
                return;
            }


            this.tag("Results").patch({
                y:360, children: Factory.create(results, this.stage, {parentWidth:1500})
            });

            this._toggle(Search.VISIBILITY.RESULTS);
        }

        _toggle(value){
            this.patch({
                Content: {
                    Results: {smooth: {alpha: Search.VISIBILITY.RESULTS & value}},
                    Loader: {smooth: {alpha: Search.VISIBILITY.LOADER & value}},
                    Placeholder: {smooth: {alpha: Search.VISIBILITY.PLACEHOLDER & value}},
                    NoResults: {smooth: {alpha: Search.VISIBILITY.NORESULTS & value}}
                }
            });
        }

        get items() {
            return this.tag("Results").children
        }

        static _states(){
            return [
                class Keyboard$$1 extends this{
                    static _states(){
                        return [
                            class Actions$$1 extends this{
                                _getFocused(){
                                    return this.tag("Actions");
                                }
                                _handleLeft(){
                                    this._setState("Keyboard.Letters");
                                }
                                _handleDown(){
                                    if (this.tag("Results").children.length > 0) {
                                        this._setState("Results");
                                    } else {
                                        this._setState("Keyboard.Letters");
                                    }
                                }
                            },
                            class Letters extends this{
                                _getFocused(){
                                    return this.tag("Keyboard.Letters");
                                }
                                _handleUp(){
                                    this._setState("Keyboard.Actions");
                                }
                                _handleRight(){
                                    if (this.tag("Results").children.length > 0) {
                                        this._setState("Results");
                                    }
                                }
                                _handleDown(){
                                    this._setState("Keyboard.Space");
                                }
                            },
                            class Space extends this{
                                $enter(){
                                    this.tag("Space").patch({
                                        color:0xffffffff,
                                        Label:{
                                            color:0xff000000
                                        }
                                    });
                                }
                                $exit(){
                                    this.tag("Space").patch({
                                        color:0x00000000,
                                        Label:{
                                            color:0xffffffff
                                        }
                                    });
                                }
                                _handleUp(){
                                    this._setState("Keyboard.Letters");
                                }
                                _handleRight(){
                                    if (this.tag("Results").children.length > 0) {
                                        this._setState("Results");
                                    }
                                }
                                _handleEnter(){
                                    this.$action({action: "space"});
                                }
                            }
                        ]
                    }
                },
                class Results extends this{
                    _getFocused(){
                        return this.tag("Results").children[this._index];
                    }
                    _handleLeft(){
                        this._setState("Keyboard.Letters");
                    }
                    _handleUp() {
                        if (this._index > 0) {
                            this._animateToSelected(-1);
                        } else {
                            this._setState("Keyboard.Actions");
                        }
                    }
                    _handleDown() {
                        if (this._index < this.items.length - 1) {
                            this._animateToSelected(1);
                        }
                    }
                    _handleEnter() {
                        this.fireAncestors("$onItemSelect", {
                            item: this.active.realComponent.item
                        });
                    }
                }
            ]
        }

        _animateToSelected(offset) {
            let scrollOffset = 0;
            this._index += offset;

            this.items[this._index].setSmooth("alpha", 1, {duration: .6});
            for (let i = 0, j = this.items.length; i < j; i++) {
                let item = this.items[i];
                if (i < this._index) {
                    item.setSmooth("alpha", 0, {duration: .6});
                    scrollOffset += item.constructor.height;
                } else if(i === this._index) {
                    item.setSmooth("alpha", 1, {duration: .6});
                } else {
                    item.setSmooth("alpha", .4, {duration: .6});
                }
            }

            this.patch({
                Content: {
                    Results: {smooth: {y: [offset ? scrollOffset * -1 + 360 : 360]}}
                }
            });
        }

        reset(){
            this.tag("Results").childList.clear();
            this.tag("Query").clear();
            this.tag("Letters").index = 0;
            this._setState("Keyboard.Letters");
            this._index = 0;
        }

        _onReload(data){
            this.data = data;
        }

        _onPageShow(){
            this.fireAncestors("$logo", {x: 162, y: 164});
            this.setSmooth("alpha",1);
        }

        _onPageHide(){
            this.setSmooth("alpha",0);
        }

        get store(){
            return true;
        }

        get requiresLoading() {
            return true;
        }

        get persist(){
            return this._data;
        }
    }

    Search.VISIBILITY = {
        RESULTS: 1,
        LOADER:2,
        PLACEHOLDER:4,
        NORESULTS: 8
    };

    class ArtistData{
        constructor(data){
            let {likes, basicMeta:meta, videoData:{videos}, relatedArtists} = data;
            this._image = meta.thumbnailUrl;
            this._onTour = meta.onTour;
            this._name = meta.name;
            this._likes = likes;
            this._urlSafeName = meta.urlSafeName;

            if(meta.bio){
                this._info = meta.bio.text;
                this._source = meta.bio.source;
                this._birthCity = meta.bio._birthCity;
                this._birthName = meta.bio.birthName;
                this._dateOfBirth = meta.bio.dateOfBirth;
            }

            if(videos && videos.data && videos.data.length){
                this._videos = videos.data.map((video)=>{
                    return new VideoData(video);
                });
            }

            if(relatedArtists && relatedArtists.length){
                const items = relatedArtists.map((artist)=>{
                    const obj = {
                        thumbnail: artist.thumbnailUrl,
                        title:artist.name,
                        target: artist.urlSafeName
                    };
                    return new Artist$1(obj);
                });
                let container = new Artists();
                container.title = "RELATED ARTISTS";
                container.items = items;

                this._relatedArtists = container;
            }

            if(meta.genres && meta.genres.length){
                this._genres = meta.genres.map((label)=>{
                    const item = new Genre();
                    item.title = label;
                    return item;
                });
            }
        }

        get image(){
            return this._image;
        }

        get onTour(){
            return this._onTour;
        }

        get genres(){
            return this._genres;
        }

        get info(){
            return this._info;
        }

        get likes(){
            return this._likes;
        }

        get relatedArtists(){
            return this._relatedArtists;
        }

        get source(){
            return this._source;
        }

        get birthCity(){
            return this._birthCity;
        }

        get birthName(){
            return this._birthName;
        }

        get dateOfBirth(){
            return this._dateOfBirth;
        }

        get name(){
            return this._name
        }

        get videos(){
            return this._videos;
        }

        get urlSafeName(){
            return this._urlSafeName;
        }

    }

    class GenreData{
        constructor(containers, _source){
            this._containers = containers;
            if(_source){
                this._image = _source.image;
                this._title = _source.title;
                this._target = _source.target;
            }
        }

        get containers(){
            return this._containers;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }

        get target(){
            return this._target;
        }
    }

    class ShowData{
        constructor(data){
            let {basicMeta:meta, videos:{items=[]}} = data;
            this._description = meta.description;
            this._image = meta.image_url;
            this._title = meta.title;

            if(items && items.length){
                this._videos = items.map(({videoData})=>{
                    return new VideoData(videoData);
                });
            }
        }

        get videos(){
            return this._videos;
        }

        get description(){
            return this._description;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }
    }

    class PlaylistData{

        constructor(data){
            let {basicMeta:meta, videos:{items=[]}} = data;
            this._description = meta.description;
            this._image = meta.image_url;
            this._title = meta.title;

            if(items && items.length){
                this._videos = items.map(({videoData})=>{
                    return new VideoData(videoData);
                });
            }
        }

        get videos(){
            return this._videos;
        }

        get description(){
            return this._description;
        }

        get image(){
            return this._image;
        }

        get title(){
            return this._title;
        }

    }

    class AppContents extends PageRouter{
        static _template(){
            return {
                Home:{
                    type: Home
                },
                Artist:{
                    type: Artist$2, alpha: 0
                },
                Genre:{
                    type: Genre$1, alpha: 0
                },
                Show:{
                    type: Show$1, alpha: 0
                },
                Collection:{
                    type: Collection, alpha: 0
                },
                Search:{
                    type: Search, alpha: 0
                }
            };
        }

        /**
         * @param data
         */
        syncHomeData(data){
            this.tag("Home")._onLoad(data);
        }

        /**
         * Routing
         * @param item
         * @param items
         */
        $onItemSelect({item, items, sourceList}){
            const api = this.fireAncestors("$api");
            const itemConstructor = item.constructor;

            if(item.hasOwnProperty("loadPage")){
                this.$loadPage({ref:item.loadPage});
            }else if(itemConstructor === AppContents.VIDEO){
                this.fireAncestors("$play", {item, items, sourceList});
            }else{
                api.fetchDetails(item).then((response)=>{
                    const constructor = response.constructor;
                    switch(constructor){
                        case AppContents.ARTIST:
                            this.fireAncestors("$loadPage",{ref:"Artist", data:response});
                            break;
                        case AppContents.GENRE:
                            this.fireAncestors("$loadPage",{ref:"Genre", data:response});
                            break;
                        case AppContents.SHOW:
                            this.fireAncestors("$loadPage",{ref:"Show", data:response});
                            break;
                        case AppContents.PLAYLIST:
                            const {videos} = response;
                            this.fireAncestors("$loadingReady");
                            this.fireAncestors("$play",{item:videos[0], items:videos});
                            break;
                    }
                });
                this.fireAncestors("$loading");
            }
        }

        $allItemForContainer({id, offset, limit, genre}){
            const api = this.fireAncestors("$api");
            api.fetchCollectionOffset({id, offset, limit, genre}).then((response)=>{
                this.fireAncestors("$loadPage",{ref:"Collection", data:{data:response,genre}});
            });
            this.fireAncestors("$loading");
        }

        $hook({fn}){
            return fn.call(this);
        }

        $collection(){
            return this.tag("Collection");
        }

        get default(){
            return "Home";
        }
    }

    AppContents.VIDEO = VideoData;
    AppContents.ARTIST = ArtistData;
    AppContents.GENRE = GenreData;
    AppContents.SHOW = ShowData;
    AppContents.PLAYLIST = PlaylistData;

    class GraphQL{
        constructor(){
            throw new Error("Don't instatiate GraphQL class");
        }

        static create(type,args){
            if(GraphQL[`_${type}`]){
                return GraphQL[`_${type}`](args);
            }
        }

        static _home(){
            return `{
            homePage {
                containers {
                    title
                    id 
                }
            } 
        }`;
        }

        static _videoContainerById({id}){
            return `{
            homePage {
                container(id: "${id}") {
                    title
                    id
                    serviceName
                    pagedItems {
                        total
                        items {
                            title
                            target
                            thumbnail
                            type
                            description
                        }
                    }
                }
            }
        }`;
        }

        static _videoById({id}){
            // ql can accept an array of id's
            // we need to stringify the list
            if(Array.isArray(id)){
                let list = id.map((i)=>{
                    return `"${i}"`;
                }); id = list.join(",");
            }else{
                id = `"${id}"`;
            }

            return `{            
            videos(ids:[${id}]){
                data {
                    likes
                    basicMetaV3{                 
                        title
                        lyricVideo
                        thumbnailUrl
                        explicit
                        startDate
                        duration
                        artists{
                            basicMeta{
                                name
                                genres
                                thumbnailUrl
                                urlSafeName
                            }
                        }
                    }   
                    streamsV3{
                        provider
                        url
                        quality
                    }             
                    views{
                        viewsTotal
                    }  
                }
            }
        }`;
        }

        static _artistByName({id}){
            return `{
            artists(ids: ["${id}"]) {
                likes
                relatedArtists{
                    name
                    thumbnailUrl
                    urlSafeName
                }
                basicMeta {
                    name
                    genres
                    thumbnailUrl
                    urlSafeName
                    onTour
                        views{
                            isrc
                            viewsLast30Days
                            viewsLast7Days
                            viewsTotal
                            viewsCountry
                        }
                        bio {
                            text
                            source
                            birthCity
                            birthName
                            origin
                            dateOfBirth
                        }
                    }
                    videoData {
                        videos {
                            data {
                                id
                                basicMetaV3 {
                                    title                        
                                    thumbnailUrl
                                    duration
                                    artists{
                                      basicMeta{
                                        name
                                        genres
                                        name
                                        thumbnailUrl
                                        urlSafeName
                                      }
                                    }                                           
                                }
                                streamsV3 {
                                    provider
                                    url
                                    quality   
                                }
                                views{
                                    viewsTotal
                                } 
                            }
                    }
                }
            }
        }`;
        }

        static _playlistById({id}){
            return `{ 
            playlists(ids:["${id}"]) {         
                basicMeta {
                    title
                    description      
                    image_url 
                }                   
                videos {
                    items{
                        videoData   {                    
                            id
                            likes
                            streamsV3 {
                                provider
                                url
                                quality                           
                            }
                            basicMetaV3 {
                                title  
                                copyright
                                thumbnailUrl
                                duration  
                                artists{
                                    basicMeta{
                                        name
                                        genres
                                        name
                                        thumbnailUrl
                                        urlSafeName
                                    }
                                }                              
                            } 
                            views{
                                viewsTotal
                            }       
                        }
                        isrc    
                    }
                }    
            }            
        }`;
        }

        static _genreByName({id, offset=0, limit=20}){
            return `{
            genreHome(genre : "${id}") {  
                containers {
                id
                title
                serviceName
                    pagedItems(offset: ${offset}, limit: ${limit}) {
                        items {
                            title
                            target
                            thumbnail
                            type
                            description
                        }
                        total
                    }
                }
            }
        }`;
        }

        static _pagedItemsByGenreAndContainer({id, genre, offset, limit}){
            return `{
            genreHome(genre: "${genre}") {
                container(id: "${id}") { 
                    id
                    title
                    serviceName
                    pagedItems(offset: ${offset}, limit: ${limit}) { 
                        items {
                            title
                            target
                            thumbnail
                            type
                            description
                        } 
                        total 
                    }
                } 
            }
        }`
        }

        static _pagedItemsByContainerId({id, offset, limit}){
            return `{
            homePage {
                container(id: "${id}") {
                    title
                    id
                    serviceName
                    description
                    pagedItems(offset: ${offset}, limit: ${limit}) {
                        items { 
                            title
                            target
                            thumbnail
                            type
                            description
                        }
                        total 
                    }
                }   
            }
        }`;
        }

        static _searchVideos({query}){
            return `{
            search {
                videos(search:"${query}", limit:50) {
                    items {
                        id
                      	likes
                        basicMetaV3{                 
                            title
                            lyricVideo
                            thumbnailUrl
                            explicit
                            startDate
                            duration
                            artists{
                                basicMeta{
                                    name
                                    genres
                                    thumbnailUrl
                                    urlSafeName
                                }
                            }
                        }   
                        streamsV3{
                            provider
                            url
                            quality
                        }             
                        views{
                            viewsTotal
                        }
                    }
                }
            }
        }`;
        }

        static _searchArtists({query}){
            return `{
            search {
                artists(search:"${query}", limit: 50) {
                    items {
                        basicMeta {
                            name
                            thumbnailUrl
                            urlSafeName
                        }
                    }
                }
            }
        }`;

        }
    }

    class Factory$1 {
        constructor(api) {
            this._api = api;
        }

        create(type, props) {
            if(typeof type !== "string"){
                if(Factory$1.LISTTYPE.has(type)){
                    type = Factory$1.LISTTYPE.get(type).fn;
                }
            }
            type = Factory$1._ucfirst(type);
            if (this[`create${type}`]) {
                return this[`create${type}`](props);
            }
            return;
        }

        createContainer({title, serviceName: service, id, pagedItems: {items: assets, total}}) {
            if (!assets || !assets.length) {
                // reject?
                return Promise.resolve([]);
            }

            if (Factory$1.VIDEO_WRAPPER[service]) {
                return this._createVideoDataContainer(title, assets, id, total);
            } else if (Factory$1.LIST_WRAPPER.hasOwnProperty(service)) {
                const container = new Factory$1.LIST_WRAPPER[service]();
                container.title = title;
                container.id = id;
                container.total = total;
                container.items = assets.map((asset) => {
                    if (service === "shows") {
                        const construct = Factory$1.BUILD_TYPES.get("show");
                        return new construct(asset);
                    } else if (Factory$1.BUILD_TYPES.has(asset.type)) {
                        const construct = Factory$1.BUILD_TYPES.get(asset.type);
                        return new construct(asset);
                    }
                }).filter(Boolean);
                return Promise.resolve(container);
            } else {
                return Promise.resolve([]);
            }
        }

        _createVideoDataContainer(title, assets, id, total) {
            const list = assets.map(asset => asset.target);
            return this._api.query(
                GraphQL.create("videoById", {id: list})
            ).then((response) => {
                const videos = Tools.getPropertyByPath(response, "data.videos.data");
                const construct = Factory$1.BUILD_TYPES.get("videos");
                const container = new construct();

                container.title = title;
                container.id = id;
                container.total = total;
                container.items = videos.map((video) => {
                    if(!video.basicMetaV3){
                        return
                    }
                    return new VideoData(video);
                }).filter(Boolean);

                return container;
            });
        }

        createArtist(data) {
            let {artists} = data;
            if (artists && artists.length) {
                return new ArtistData(artists[0]);
            } else {
                throw new Error("Unable to create ArtistData");
            }
        }

        createVideo({videos}) {
            const {data} = videos;
            let output = data.map((video) => {
                return new VideoData(video);
            });
            if (output.length) {
                return output.pop();
            }
        }

        createGenre({genreHome, _source}) {
            let {containers = []} = genreHome;
            if (containers.length) {
                let promises = containers.map((container) => {
                    return this.createContainer(container);
                });
                return Promise.all(promises).then((containers) => {
                    return new GenreData(containers, _source);
                });
            }
        }

        createSearchType({type, obj}){
            if(Factory$1.LISTTYPE.hasOwnProperty(type)){
                return new Factory$1.LISTTYPE[type](obj);
            }
        }

        createPlaylist({playlists}) {
            if (playlists && playlists.length) {
                return new PlaylistData(playlists[0]);
            }
        }

        createShow({playlists}) {
            if (playlists && playlists.length) {
                return new ShowData(playlists[0]);
            }
        }

        static _ucfirst(str) {
            return `${str[0].toUpperCase()}${str.slice(1)}`;
        }
    }

    Factory$1.VIDEO_WRAPPER = {
        "top-videos": Videos,
        "defining-videos": Videos,
        premieres: Videos
    };

    Factory$1.LIST_WRAPPER = {
        "genres-page": Genres,
        "trending-artists": Artists,
        playlists: Playlists,
        shows: Shows,
    };

    Factory$1.LISTTYPE = new Map();

    Factory$1.LISTTYPE.set(Video,{c:Video, fn:"video"});
    Factory$1.LISTTYPE.set(Genre,{c:Genre, fn:"genre"});
    Factory$1.LISTTYPE.set(Playlist,{c:Playlist, fn:"playlist"});
    Factory$1.LISTTYPE.set(Show,{c:Show, fn:"show"});
    Factory$1.LISTTYPE.set(Artist$1, {c:Artist$1, fn:"artist"});

    Factory$1.BUILD_TYPES = new Map();
    Factory$1.BUILD_TYPES.set("video", Video);
    Factory$1.BUILD_TYPES.set("videos", Videos);
    Factory$1.BUILD_TYPES.set("genre", Genre);
    Factory$1.BUILD_TYPES.set("playlist", Playlist);
    Factory$1.BUILD_TYPES.set("show", Show);
    Factory$1.BUILD_TYPES.set("artist", Artist$1);

    Factory$1.DATATYPE = {
        ArtistData, VideoData
    };

    class Authenticator{

        constructor(){
            this._tokenUrl = "https://accounts.vevo.com/token";
            this._clientId = "zOYzmutpI1eT2qCad16g";
        }

        requestToken({refresh=false}) {
            let body = {
                client_id:this._clientId,
                grant_type:"urn:vevo:params:oauth:grant-type:anonymous"
            };
            // check if we're requesting a refresh token
            if(refresh){
                body = {
                    ...body,
                    grant_type: "refresh_token",
                    refresh_token:this._refresh_token
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
            }).catch(()=>{
                throw new Error(Api.ERRORS.CODE3);
            })
        }

        post({url, body}){
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: Authenticator._qsify(body)
            }).then((response) => {
                if(response.status === 400){
                    throw new Error()
                }
                return response.json();
            })
        }

        static _qsify(params) {
            return Object.keys(params).map((key) => {
                return `${key}=${params[key]}`;
            }).join("&");
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

            localStorage.setItem("TOKEN", access_token);
            localStorage.setItem("REFRESH_TOKEN", refresh_token);
        }

        set expires(v){
            this._expires = v;
            localStorage.setItem("TOKEN_EXPIRES", v);
        }

        hasValidToken() {
            this._token = localStorage.getItem("TOKEN");
            this._refresh_token = localStorage.getItem("REFRESH_TOKEN");
            this._expires = localStorage.getItem("TOKEN_EXPIRES");

            if(this.isTokenExpired()){
                if(this._refresh_token){
                    return this.requestToken({refresh:false}).then((response)=>{
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
    }

    class Api {
        constructor() {
            this._auth = new Authenticator();
            this._factory = new Factory$1( this );
        }

        getToken() {
            if (this._auth.hasValidToken()) {
                return Promise.resolve(this._auth.token);
            } else {
                return this._auth.requestToken({refresh: false}).then((response) => {
                    return response;
                });
            }
        }

        requestHome() {
            return this.query(
                GraphQL.create("home")
            ).then(({data}) => {
                const {homePage: home} = data;
                if (home && home.containers && home.containers.length) {
                    const promises = home.containers.map((c) => {
                        return this.query(
                            GraphQL.create("videoContainerById", {id: c.id})
                        );
                    });
                    if (promises.length) {
                        return Promise.all(promises);
                    }

                } else {
                    throw new Error(Api.ERRORS.CODE1);
                }
            }).then((containers) => {
                if (containers.length) {
                    let promises = containers.map((c) => {
                        const data = Tools.getPropertyByPath(c, "data.homePage.container");
                        return this._createDatatypes({type: "container", data});
                    });
                    return Promise.all(promises);
                } else {
                    throw new Error(Api.ERRORS.CODE2);
                }
            }).then((containers) => {
                // extract trending list from response and splice off the first 3 items
                // this will be used to output in the slider
                let trending = containers.filter((c) => {
                    let reg = /^trending/ig;
                    return reg.test(c.title);
                });
                let data = {containers};

                if (trending && trending.length) {
                    let c = trending[0].items;
                    data.slider = c.splice(2,7);
                } else {
                    data.slider = [];
                }

                return data;
            }).catch((err) => {
                throw new Error(Api.ERRORS.CODE5);
            });
        }

        fetchDetails(item) {
            const constructor = item.constructor;
            if (Api.FETCH_TYPES.has(constructor)) {
                const type = Api.FETCH_TYPES.get(constructor);
                return this.query(GraphQL.create(type, {id: item.target})).then(({data}) => {
                    data = {_source: item, ...data};
                    return this._factory.create(constructor, data);
                })
            } else {
                return Promise.reject(`${constructor} not supported`);
            }
        }

        fetchCollectionOffset({id, offset=0,limit=80, genre}){
            if(genre){
                return this.query(
                    GraphQL.create("pagedItemsByGenreAndContainer",{id, genre, offset,limit})
                ).then((response)=>{
                    const data = Tools.getPropertyByPath(response, "data.genreHome.container");
                    return this._createDatatypes({type: "container", data});
                });
            }else{
                return this.query(
                    GraphQL.create("pagedItemsByContainerId",{id, offset,limit})
                ).then((response)=>{
                    const data = Tools.getPropertyByPath(response, "data.homePage.container");
                    return this._createDatatypes({type: "container", data});
                });
            }

        }

        _createDatatypes({type, data}) {
            return this._factory.create(type, data);
        }

        query(q) {
            return this.get(`https://partner.vevo.com/graphql?query=${encodeURIComponent(q)}`);
        }

        search(query){
            const promises = [
                this.query(
                    GraphQL.create("searchVideos",{query})
                ),
                this.query(
                    GraphQL.create("searchArtists",{query})
                )
            ];
            return Promise.all(promises).then((response)=>{
                let results = [];
                // we don't receive correctly formated data from the graphQL server
                // for the time being we reformat the objects to meet what
                // the factory expects.
                response.forEach((data)=>{
                    [
                        {key:"videos", type:"video", service:"top-videos",path:"data.search.videos.items"},
                        {key:"artists", type:"artist", service:"trending-artists",path:"data.search.artists.items"}
                    ].forEach((obj)=>{
                        let items = Tools.getPropertyByPath(data, obj.path);
                        if(items && items.length){
                            items = items.map((item)=>{
                                if(item.basicMeta){
                                    const {urlSafeName, name, thumbnailUrl} = item.basicMeta;
                                    return {type:obj.type, thumbnail:thumbnailUrl, target:urlSafeName, title:name}
                                }else{
                                    return {
                                        target: item.id, ...item
                                    }
                                }
                            });
                            results.push({
                                title: obj.key, pagedItems:{items}, serviceName:obj.service
                            });
                        }
                    });
                });

                const promises = results.map((data)=>{
                    return this._createDatatypes({type:"container", data});
                });
                return Promise.all(promises);
            })
        }

        get(url) {
            if (this._auth.isTokenExpired()) {
                return this._auth.requestToken({refresh: true}).then(() => {
                    return this.get(url);
                });
            }
            return fetch(url, {
                headers: {
                    "Authorization": `Bearer ${this._auth.token}`
                }
            }).then((response) => {
                return response.json();
            });
        }

        set genres(v){
            this._genres = v;
        }

        getUrlSafeGenre(name){
            const matches = this._genres.filter((el)=>{
                const reg = new RegExp(`${el.name}`,"ig");
                return reg.test(name)
            });

            if(matches && matches.length){
                return matches[0].urlSafeName;
            }
        }

        _mergeDataInPromise({q, data}) {
            return this._promise(q).then((response) => {
                return {
                    response, ...data
                };
            });
        }

        _promise(q) {
            return this.query(q);
        }

        _handleApiError(err) {

        }

        get auth() {
            return this._auth;
        }
    }

    Api.ERRORS = {
        CODE1: "No containers found.",
        CODE2: "Container by id returned empty array.",
        CODE3: "Unable to fetch a token.",
        CODE4: "Unable to get details.",
        CODE5: "An error occurred while loading the main data."
    };

    Api.FETCH_TYPES = new Map();
    Api.FETCH_TYPES.set(Video,"videoById");
    Api.FETCH_TYPES.set(Artist$1,"artistByName");
    Api.FETCH_TYPES.set(Genre,"genreByName");
    Api.FETCH_TYPES.set(Playlist,"playlistById");
    Api.FETCH_TYPES.set(Show,"playlistById");

    class Splash extends lng.Component{

        static _template() {
            return {
                zIndex: 99, w: 1920, h: 1080, rect: true, color: 0xff000000,
                Black: {
                    clipping: true, w: 1920, h: 1080, mountX: 0,
                    Background: {
                        w: 1920, h: 1080, rect: true, color: 0xff000000
                    },
                    Logo: {
                        w: 953, h: 240, mount: .5, x: 960, y: 540,
                        Image: {src: App.getPath('images/logo-large.png')}
                    }
                },
                White: {
                    clipping: true, h: 1080, w: 0, mountX: 0,
                    Background: {
                        h: 1080, w: 1920, rect: true
                    },
                    Logo: {
                        w: 953, h: 240, mount: .5, x: 960, y: 540,
                        color: 0xff000000, src: App.getPath('images/logo-large.png')
                    }
                }
            };
        }

        _init(){
            this._loaderAnimation = this.animation({duration: 3, delay: 1, repeat: -1, actions: [
                {t: 'White', p: 'w', rv: 0, v: {sm: .3, 0: 0, .25: 1920, .5: 1920, .75: 0}},
                {t: 'White', p: 'x', rv: 1920, v: {sm: .3, 0: 1920, .25: 0, .5: 0, .75: 1920}},
                {t: 'White.Logo', p: 'x', rv: -960, v: {sm: .3, 0: -960, .25: 960, .5: 960, .75: -960}}
            ]});

        }

        _active() {
            this._loaderAnimation.start();
        }

        _inactive() {
            this._loaderAnimation.stop();
        }

    }

    class Loader$1 extends lng.Component{

        static _template() {
            return {
                zIndex: 99, w: 1920, h: 1080, rect: true, color: 0xee000000,
                Logo: {w: 278, h: 70, mount: .5, y: 540, x: 960, src: App.getPath('images/logo.png')},
                Loader:{
                    w: 278, h: 5, mount: .5, x: 960, y: 600,
                    White: {
                        clipping: true, h: 250, w: 0, mountX: 0,
                        Background: {
                            w: 278, h: 5, rect: true
                        }
                    }
                }
            };
        }

        _init(){
            this._loaderAnimation = this.animation({duration: 2, repeat: -1, actions: [
                {t: 'Loader.White', p: 'w', rv: 0, v: {sm: .3, 0: 0, .25: 278, .5: 278, .75: 0}},
                {t: 'Loader.White', p: 'x', rv: 278, v: {sm: .3, 0: 278, .25: 0, .5: 0, .75: 278}}
            ]});
        }

        _active(){
            this._loaderAnimation.start();
        }

        _inactive(){
            this._loaderAnimation.stop();
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
                            text:{text:"", fontFace:"Regular", fontSize:26, lineHeight:40, wordWrapWidth:1720}
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

    class App extends ux.App {

        static getFonts() {
            return [
                {family: 'Black', url: App.getPath('fonts/Roboto-Black.ttf'), descriptors: {}},
                {family: 'Bold', url: App.getPath('fonts/Roboto-Bold.ttf'), descriptors: {}},
                {family: 'Light', url: App.getPath('fonts/Roboto-Light.ttf'), descriptors: {}},
                {family: 'Italic', url: App.getPath('fonts/Roboto-Italic.ttf'), descriptors: {}},
                {family: 'Regular', url: App.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}}
            ];
        }

        static _template() {
            return {
                rect: true, color: 0xff000000,
                Player: {
                    type: Player, alpha:0, signals:{forceStop:true}
                },
                AppContents: {
                    type: AppContents,alpha:0
                },
                Splash:{
                    type: Splash, alpha:0
                },
                Loader:{
                    type: Loader$1, zIndex:99, alpha: 0
                },
                Logo: {
                    zIndex: 4, x: 82, y: 82, alpha: 0, src: App.getPath('images/logo.png')
                },
                Error: {
                    type: Error$1, zIndex: 99, alpha: 0
                }
            };
        }

        get api() {
            return this._api;
        }

        _construct() {
            this._api = new Api();
        }

        _init(){
            this._setState("RequestingToken");
        }

        $logo({x,y,duration=0.6}) {
            this.patch({
                Logo: {smooth: {x: [x, {duration}], y: [y, {duration}]}}
            });
        }

        static _states() {
            return [
                class RequestingToken extends this {
                    $enter() {
                        this.tag("Splash").setSmooth("alpha",1,{duration: .2});
                        this.api.getToken().then(() => {
                            this.tokenRequested();
                        }).catch((err)=>{
                            this.$error(err);
                        });
                    }
                    tokenRequested() {
                        this._setState("PrepareContent");
                    }
                },
                class PrepareContent extends this {
                    $enter() {
                        this._timestart = Date.now();
                        this.api.requestHome().then((response) => {
                            // @todo: let PageRouter handle
                            this.tag("AppContents").syncHomeData(response);
                            return this.api.get(App.getPath("genres.json"));
                        }).then((genres)=>{
                            this.api.genres = genres;
                            this.onPrepared();
                        }).catch((err)=>{
                            this.$error(err);
                        });
                    }
                    onPrepared() {
                        this._timeend = Date.now();
                        const diff = this._timeend - this._timestart;
                        const timeout =  Math.max(0,3400-diff);

                        setTimeout(()=>{
                            this.tag("Splash").setSmooth("alpha",0,{duration: .2});
                            this.tag("Logo").setSmooth("alpha", 1);
                            this._setState("App");
                        },timeout);
                    }
                },
                class App extends this {
                    $play({item, items, sourceList}){
                        this._setState("Playing");
                        this.tag("Player").play({item, items, sourceList});
                    }
                    $enter(){
                        this.tag("AppContents").setSmooth("alpha", 1);
                    }
                    $exit(){
                        this.tag("AppContents").setSmooth("alpha",0);
                    }
                    _getFocused() {
                        return this.tag("AppContents");
                    }
                },
                class Playing extends this {
                    $enter(){
                        this._logoRestorePosition = {
                            x:this.tag("Logo").x, y: this.tag("Logo").y
                        };
                        this.tag("Player").setSmooth("alpha", 1);
                        this.$logo({x: 82, y: 82});
                    }
                    $exit(){
                        this.tag("Player").setSmooth("alpha", 0);
                        this.$logo(this._logoRestorePosition);
                    }
                    $play({item, items}){
                        this.tag("Player").play({item, items});
                    }
                    _handleBack(){
                        this._setState("App");
                    }
                    _getFocused() {
                        return this.tag("Player");
                    }
                    forceStop(){
                        this._setState("App");
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

        $routeOnItemSelect(args){
            this._setState("App");
            this.tag("AppContents").$onItemSelect(args);
        }

        $error({message, timeout=5000, returnState="App"}){
            this._setState("Error");
            return this.tag("Error").handleError({message, timeout}).then(()=>{
                this._setState(returnState);
            });
        }

        $api() {
            return this._api;
        }

        $startLoader(){
            this.tag("Loader").setSmooth("alpha",1,{duration: .6});
        }

        $stopLoader(){
            this.tag("Loader").setSmooth("alpha",0,{duration: .6});
        }

        _setFocusSettings(settings){
            if(this.state === "Playing") {
                settings.mediaplayer.consumer = this.tag("Player");
            }
        }
    }

    return App;

}());
