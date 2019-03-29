var com_metrological_app_Dailymotion = (function () {
    'use strict';

    class Button extends lng.Component {

        static _template() {
            return {
                h: 86, w: 86,
                Shadow: { mount: 0.5, color: 0xB3000000,x: 43, y: 45, w: 100, h: 100, texture: lng.Tools.getShadowRect(100, 100, 50, 10, 10) },
                Button: { h: 86, w: 86, texture: lng.Tools.getRoundRect(86, 86, 43, 3, 0x80BBBBBB, true, 0x80F1F1F1) },
                Image: { mount: 0.5, x: 43, y: 43 },
            };
        }

        set action(v) {
            this._action = v;
        }

        get action() {
            return this._action
        }

        set image(v) {
            this.tag('Image').patch({ src: v });
        }

        _focus() {
            this.patch({
                smooth: { scale: 1.4 },
                Button: {
                    texture: lng.Tools.getRoundRect(120, 120, 60, 3, 0xFF00C1F8, true, 0xFF00C1F8)
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: { scale: 1 },
                Button: {
                    texture: lng.Tools.getRoundRect(86, 86, 43, 3, 0x80BBBBBB, true, 0x80F1F1F1)
                }
            });
        }
    }

    class TextScrolling extends lng.Component{
        static _template(){
            return {clipping: true, alpha: .5,
                Label: {text: {maxLines: 1}}
            }
        }

        set options(v){
            this.patch({
                Label: {color: v.color, text: {fontSize: v. fontSize, fontFace: v.fontFace}}
            });
        }

        set label(v){
            this.patch({
                Label: {text: {text: v}}
            });
        }

        set textAlpha(v){
            this.patch({
                alpha: v
            });
        }

        set textWidth(v){
            this.patch({
                Label: {text: {wordWrapWidth: v}}
            });
        }

        stopScrollAnimation() {
            if (!this._scrollAnimation) {
                return;
            }
            this._scrollAnimation.stop();
        }

        _init(){
            this.tag("Label").on("txLoaded", ()=> {
                const width = this.tag("Label").renderWidth;

                if (width > this.w && width < 2048) {
                    if (!this._scrollAnimation) {
                        this._scrollAnimation = this.tag("Label").animation({duration: width > this.w + (this.w / 5) ? 16 : 8, repeat: -1, stopMethod: "immediate", actions: [
                                {t: '', p: 'x', v: {sm: 0, 0: {v: 0}, .4: {v: -(width - this.w)}, .6: {v: -(width - this.w)}, .8: {v: 0}, 1: {v: 0}}},
                            ]});
                    }
                    this._scrollAnimation.start();
                } else {
                    this.stopScrollAnimation();
                }
            });
        }
    }

    class ListItem extends lng.Component{
        static _template(){
            return {
                w: 427, h: 240, color: 0x80000000, rect: true,
                Shadow: { alpha: 0, mount: 0.5, w: 475, h: 370, x: 213, y: 160, color: 0x80000000, texture: lng.Tools.getShadowRect(475, 370, 0, 35, 35) },
                Image: { src: AppDefinition.getPath('img/missing.png'), w: 427, h: 240, color: 0xFF666666 },
                ImageShade: { rect: true, w: 427, h: 100, y: 140, colorTop: 0x00000000, colorBottom: 0xCC000000},
                Title: { text: { text: '', fontFace: 'RobotoMedium', fontSize: 28, color: 0xFFF1F1F1 } },
                Uploader: { x: 20, y: 230, w: 300, mountY: 1, color: 0x80F1F1F1, text: { text: '', fontFace: 'RobotoBold', fontSize: 24, maxLines: 1 } },
                Duration: { y: 230, x: 410, mount: 1, color: 0x80F1F1F1, text: { text: '', fontFace: 'RobotoRegular', fontSize: 24, textAlign:'right' } },
                TextBox: {
                    rect: true, h: 70, w: 427, y: 240, color: 0xFF101010,
                    VideoTitle: { type: TextScrolling, w: 415, x: 20, h: 60, y: 16, textAlpha: .5, textWidth: 400, options: { color: 0xFFF1F1F1, fontSize: 28, fontFace: "RobotoRegular"}}
                }
            }
        }

        static convertTime(sec) {
            let hours = Math.floor(sec/3600);
            (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';

            let min = Math.floor(sec/60);

            (min >= 1) ? sec = sec - (min*60) : min = '00';
            (sec < 1) ? sec = '00' : 0;

            (min.toString().length === 1) ? min = '0'+ min : 0;
            (sec.toString().length === 1) ? sec = '0'+ sec : 0;

            return hours+':'+min+':'+sec;
        }

        set item(v){
            this._item = v;

            this.patch({
                Image: { src: ux.Ui.getImageUrl(v['thumbnail_360_url'] || AppDefinition.getPath('img/missing.png'), { w: 427, h: 240, type: "crop" }) },
                Uploader: { text: { text: v['owner.screenname'] || ''} },
                Duration: { text: { text: ((v.duration) ? ListItem.convertTime(v.duration) : '') } },
                TextBox: {
                    VideoTitle: { label: (v.title) ? v.title : v.name }
                }
            });
        }

        _focus(){
            this.tag("VideoTitle").patch({ x: 5 });
            this.fire("toggleFocus",{ v: true });
        }

        _unfocus(){
            this.fire("toggleFocus",{ v: false });
            this.tag("VideoTitle").patch({ x: 20 });
            this.tag("VideoTitle").stopScrollAnimation();
        }

        toggleFocus({v}) {
            this.patch({
                smooth: { zIndex: 1, scale: v ? 1.16 : 1 },
                Shadow: { smooth: { alpha: v ? 1 : 0 } },
                Image: { smooth: { color: v ? 0xffffffff : 0xFF666666 } },
                Uploader: { smooth: { color: v ? 0xFFF1F1F1 : 0x80F1F1F1} },
                Duration: { smooth: { color: v ? 0xFFF1F1F1  : 0x80F1F1F1} },
                TextBox: {
                    smooth: { color: v ? 0xFF00C1F8 : 0xFF101010 },
                    VideoTitle: { textAlpha: v ? 1 : .5, textWidth: v ? 1000 : 400 }
                }
            });
        }
    }

    class List extends lng.Component{
        static _template(){
            return {
                h: 510, w: 1920,
                BackgroundBox: {
                    y: -50, x: -120,
                    rect: true, w: 1920, h: 520, color: 0xFF000000, alpha: 0
                },
                Title: {
                    x: 0, y: 0, alpha: 0.3,
                    text: { text: '', fontSize: 38, fontFace: 'RobotoBold' }
                },
                List: {
                    type: lng.components.ListComponent,
                    w: 1920,
                    h: 350,
                    y: 70,
                    itemSize: 461, // 427 + 34
                    scrollTransition: { duration: 0.4 },
                    invertDirection: false,
                    roll: true,
                    viewportScrollOffset: 0.5,
                    itemScrollOffset: 0.5,
                    rollMin: 0,
                    rollMax: 200
                }
            }
        }

        get focusedItem() {
            return this.tag('List').element._item
        }

        get index(){
            return this.tag("List").realIndex;
        }

        get active(){
            return this.tag("List").getElement(this.index);
        }

        set backgroundAlpha(v){
            this.tag('BackgroundBox').patch({ alpha: (v) ? 0 : 0.2});
        }

        set data(v){
            this._item = v;
            const {item:{name, playlist}, list} = this._item;
            this.patch({
                alpha: 1,
                Title: {
                    text: { text: name }
                },
                List: {
                    items: list.map((item)=>{
                        return { type: ListItem, item }
                    })
                }
            });
        }

        clear(){
            this.tag("List").childList.clear();
        }

        changeStylingListElements(focus) {
            this.patch({
                Title: {
                    alpha: (focus) ? 1 : 0.3,
                    text: { fontSize: (focus) ? 46 : 38 }
                },
                List: {
                    smooth: { y: (focus) ? 80 : 70 }
                }
            });
        }

        resetIndex(){
            this.tag("List").setIndex(0);
        }

        _getFocused(){
            return this.active
        }

        _focus(){
            this.changeStylingListElements(true);
        }

        _unfocus(){
            this.changeStylingListElements(false);
        }

        _handleLeft(){
            this.tag("List").setPrevious();
        }

        _handleRight(){
            this.tag("List").setNext();
        }
    }

    class PlayerProgress extends lng.Component {
        static _template() {
            return {
                Progress: {
                    forceZIndexContext: true,
                    Total: { w: 1000, h: 6, rect: true,  color: 0xFFD8D8D8 },
                    Active: { w: 0, h: 6, rect: true, color: 0xFF00C1F8 }
                }
            };
        }

        set _progress(v){
            const now = Date.now();
            let estimation = 0;
            if(!this._last || (this._last < now - 1000)){
                estimation = 1000;
            }else{
                estimation = now - this._last;
            }
            this._last = now;
            const x = v * 1000;
            estimation *= 0.001;
            this.tag("Active").setSmooth('texture.w', Math.max(x, 0.0001) /* force clipping */, {
                timingFunction: 'linear',
                duration: estimation
            });
        }

        setProgress(currentTime, duration){
            this._progress = currentTime / Math.max(duration, 1);
        }

        static formatTime(seconds){
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

        _init(){
            this.tag("Active").texture = {
                type: lng.textures.SourceTexture,
                textureSource: this.tag("Total").texture.source
            };
        }

        _setup(){}
    }

    class Loader extends lng.Component {

        static _template() {
            return {
                w: 1920, h: 1080, rect: true, color: 0xcc000000, alpha: 0,
                Spinner: { x: 960, y: 540, h: 100, w: 100, mount: 0.5, src: AppDefinition.getPath('img/spinner.png') }
            }
        }

        start() {
            this.patch({
                smooth: { alpha: 1 }
            });

            this._spinnerAnimation.start();
        }

        stop() {
            this.patch({
                smooth: { alpha: 0 }
            });

            this._spinnerAnimation.stop();
        }

        _init() {
            this._spinnerAnimation = this.animation({
                duration: 2, repeat: -1, actions: [
                    { t: 'Spinner', p: 'rotation', v: { 0: { v: 0 }, 1: { v: Math.PI * 2, sm: 1 }} },
                ]
            });
        }
    }

    class ErrorButton extends lng.Component {

        static _template() {
            return {
                h: 70, w: 114, rect: true, color: 0xFF000000,
                Label: { y: 15, h: 70, w: 114, text: { h: 70, w: 114, fontFace: 'RobotoMedium', fontSize: 28, color: 0xFFF1F1F1, textAlign: 'center' }}
            };
        }

        set action(v) {
            this._action = v;
        }

        get action() {
            return this._action
        }

        set label(label) {
            this.patch({
                Label: {
                    text: { text: label, fontSize: 28 }
                }
            });
        }

        _focus() {
            this.patch({
                color: 0xFF00C1F8
            });
        }

        _unfocus() {
            this.patch({
                color: 0xFF000000
            });
        }
    }

    class Error extends lng.Component{
        static _template() {
            return {
                h: 1080, w: 1920, rect: true, transitions: { alpha: { duration: 0.5 }}, zIndex: 999,
                ErrorText: { w: 900, h: 50, y: 459, x: 510, text: { fontFace: 'RobotoMedium', fontSize: 42, color: 0xFFFEFEFE, textAlign: 'center' } },
                Buttons: {}
            };
        }

        get active(){
            return this.tag('Buttons').children[this._index]
        }

        set index(v){
            this._index = v;
        }

        set layout ({color, message, buttons}) {
            this.message(message);
            this.buildButtons(buttons);
            this.patch({
                color: color
            });
        }

        message(message) {
            this.patch({
                ErrorText: { text: { text: message } }
            });
        }

        buildButtons(buttons) {
            this._buttons = buttons;

            let menuWidth = 0;
            const buttonSpacing = 10;
            const buttonWidth = 114;

            this.tag('Buttons').children = buttons.map((v, idx)=>{
                menuWidth += idx * (buttonWidth + buttonSpacing);
                return { type: ErrorButton, y: 551, x: (idx * (buttonWidth + buttonSpacing)) , action: v.action, label: v.label }
            });
            this.tag('Buttons').patch({ mount: 0.5, w: menuWidth, x: 903 });

        }

        _init() {
            this._index = 0;
        }

        _focus() {
            this.patch({'alpha': 1});
            this._setState('Buttons');
        }

        _unfocus() {
            this.patch({'alpha': 0});
        }

        static _states() {
            return [
                class Buttons extends this {
                    _getFocused(){
                        return this.active;
                    }
                    _handleEnter(){
                        switch(this.active._action) {
                            case 'exit':
                                this._handleBack();
                                break;
                            case 'retry':
                                this.signal('retry');
                                break;
                            default:
                                return false
                                break;
                        }
                    }
                    _handleLeft(){
                        if(this._index > 0){
                            this.index = this._index - 1;
                        }
                    }
                    _handleRight(){
                        if(this._index < this._buttons.length -1){
                            this.index = this._index + 1;
                        }
                    }
                    _handleBack() {
                        return false
                    }
                }
            ]
        }
    }

    class Player extends lng.Component {

        static _template() {
            return {
                x: 0, y: 0, w: 1920, h: 1080, clipbox: true,
                TopShade: {
                    rect: true, w: 1920, h:548, colorTop: 0xCC000000, colorBottom: 0x00000000
                },
                BottomShade: {
                    rect: true, w: 1920, h:250, y: 830, colorTop: 0x00000000, colorBottom: 0xCC000000
                },
                VideoDetails: {
                    Icon: {
                        h: 60, w: 60, x: 120, y: 80,
                    },
                    Uploader: {
                        x: 200, y: 89, text: { text: " ", fontFace: 'RobotoRegular', fontSize: 36, color: 0xFFF1F1F1 }
                    },
                    Title: {
                        w: 1000, x: 120, y: 152, text: { text: " ", fontFace: 'RobotoRegular', maxLines: 2, lineHeight: 60, fontSize: 48, color: 0xFFF1F1F1 }
                    }
                },
                Player: {
                    y: -305,
                    ProgressBar: {
                        x: 120, y: 0, type: PlayerProgress
                    },
                    Button: {
                        Back: {
                            x: 120, y: 50,
                            type: Button, action: 'back', image: AppDefinition.getPath('img/back.png')
                        },
                        PlayPause: {
                            x: 212, y: 50,
                            type: Button, action: 'play', image: AppDefinition.getPath('img/play.png')
                        }
                    }
                },
                List: { type: List, y: 1200, x: 120 },
                Loader: { type: Loader },
                Error: { alpha: 0, type: Error, layout: { message: 'Could not load video', color: 0xCC000000 , buttons: [{label: 'Close', action: 'close'}]}}
            };
        }

        get api() {
            return this.cparent.api;
        }

        _init(){
            this._initListeners();
        }

        muteMediaplayer(bool) {
            this.application.mediaplayer.muted = bool;
        }

        _focus() {
            this.muteMediaplayer(false);

            this.patch({
                List: {
                    smooth: {
                        y: 850
                    }
                }
            });

            this.tag('ProgressBar').setProgress(0, 0);
            this.application.updateFocusSettings();
        }

        _unfocus() {
            this.muteMediaplayer(true);

            this.patch({
                Player: {
                    smooth: {
                        y: -350
                    }
                },
                List: {
                    smooth: {
                        y: 1200
                    }
                },
                Error: {
                    alpha: 0
                }
            });

            if (this.tag('List').index > 0)
                this.tag('List').resetIndex();
        }

        _captureKey(){
            this._setInterfaceTimeout();
            return false;
        }

        $mediaplayerError(){
            this._setState('Error');
            return false
        }

        $mediaplayerEnded() {
            this.signal('backButtonPressed');
            return false
        }

        $mediaplayerPause(){
            this.changePlayPauseIcon('play');
        }

        $mediaplayerPlay(){
            this.changePlayPauseIcon('pause');

            if (this.tag('Loader').alpha === 1)
                this.tag('Loader').stop();
        }

        $mediaplayerProgress({currentTime, duration}){
            this.tag('ProgressBar').setProgress(currentTime, duration);
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.tag('Loader').start();

                        this._loaderTimeout = setTimeout(() => {
                            this.application.mediaplayer.close();
                            this._setState('Error');
                        }, 20000);
                    }
                    $exit() {
                        clearTimeout(this._loaderTimeout);
                        this.tag('Loader').stop();
                    }
                    $mediaplayerPlay() {
                        if (this.tag('Error').alpha === 1)
                            this.tag('Error').patch({ alpha: 0 });

                        this.changePlayPauseIcon('pause');
                        this._setState('PlayPause');
                        this._setInterfaceTimeout();
                    }
                },
                class PlayPause extends this {
                    _getFocused() {
                        return this.tag('PlayPause')
                    }
                    $enter() {
                        this.tag('PlayPause').patch({ smooth: { x: 230 }});
                    }
                    $exit() {
                        this.tag('PlayPause').patch({ smooth: { x: 212 }});
                    }
                    _handleEnter() {
                        this.application.mediaplayer.playPause();
                    }
                    _handleLeft() {
                        this._setState('Back');
                    }
                    _handleDown() {
                        this._setState( 'List');
                    }
                },
                class Back extends this {
                    _getFocused() {
                        return this.tag('Back')
                    }
                    _handleEnter() {
                        this.signal('backButtonPressed');
                    }
                    _handleRight() {
                        this._setState('PlayPause');
                    }
                    _handleDown() {
                        this._setState( 'List');
                    }
                    $enter() {
                        this.tag('Button').patch({
                            Back: {
                                smooth: { x: 137 }
                            },
                            PlayPause: {
                                smooth: { x: 251 }
                            }
                        });
                    }
                    $exit() {
                        this.tag('Button').patch({
                            Back: {
                                smooth: { x: 120 }
                            },
                            PlayPause: {
                                smooth: { x: 212 }
                            }
                        });
                    }
                },
                class List$$1 extends this {
                    _getFocused() {
                        return this.tag('List')
                    }
                    $enter() {
                        this.tag('List').patch({
                            smooth: {
                                y: 581
                            }
                        });
                    }
                    $exit() {
                        this.tag('List').patch({
                            smooth: {
                                y: 850
                            }
                        });
                    }
                    _handleEnter() {
                        this._handleUp();
                        this.tag('ProgressBar').setProgress(0, 0);
                        this.application.mediaplayer.close();

                        const item = this.tag('List').focusedItem;
                        this.videoData = item;
                        this.fetchVideoById(item.id);
                    }
                    _handleUp() {
                        this._setState( 'PlayPause');
                    }
                },
                class Hidden extends this {
                    $enter({prevState}){
                        this._prevState = prevState;
                        this.setSmooth('alpha', 0);
                    }
                    $exit(){
                        this._setInterfaceTimeout();
                        this.setSmooth('alpha', 1);
                    }
                    _captureKey(){
                        this._setState(this._prevState);
                    }
                },
                class Error$$1 extends this {
                    _getFocused() {
                        return this.tag('Error')
                    }
                    $enter() {
                        this.patch({
                            Error: { smooth: { alpha: 1 }}
                        });
                    }
                    _handleEnter() {
                        this.signal('backButtonPressed');
                    }
                }
            ]
        }

        set videoData(d) {
            this._videoData = d;

            this.patch({
                VideoDetails: {
                    Uploader: {
                        text: { text: d['owner.screenname'] }
                    },
                    Title: {
                        text: { text: d.title }
                    },
                    Icon: { src: ux.Ui.getImageUrl(d['owner.avatar_80_url'] || '', { w: 46, h: 46, type: "crop" }) },
                }
            });
        }

        fetchVideoById(videoId){
            this.api.getVideo(videoId).then((url)=>{
                this._currentUrl = url;
                if(!this._currentUrl){
                    this._setState('Error');
                } else {
                    this.application.updateFocusSettings();
                }
            });

            this._setState('Loading');
        }

        get videoData() {
            return this._videoData
        }

        get videoUrl() {
            return this._currentUrl
        }

        fetchRelatedList(id) {
            this.api.getRelated(id).then((data)=>{
                this.setListData(data);
            });
        }

        setListData(d) {
            this.tag('List').data = {
                item: { name: 'Related' },
                list: d.list
            };
        }

        _setFocusSettings(settings) {
            settings.mediaplayer.consumer = this;
        }

        changePlayPauseIcon(i) {
            this.tag('PlayPause').patch({ image: AppDefinition.getPath('img/' + i + '.png') });
        }

        getMediaplayerSettings() {
            return {
                stream: {
                    src: this._currentUrl
                }
            };
        }

        _initListeners(){
            this.tag("Title").on("txLoaded",()=>{
                const {y, renderHeight:h} = this.tag("Title");

                this.tag("Player").patch({
                    y: y + h
                });
            });
        }

        _setInterfaceTimeout(){
            if (this.tag('Error').alpha === 1)
                return

            if(this._timeout){
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(() =>{
                this._setState('Hidden');
            }, 8000);
        }

    }

    class Main extends lng.Component{
        static _template() {
            return {
                y: 798, w: 1920, h:1080, color: 0xFF202430, rect: true,
                Grid: {
                   x: 120, y: 85
                },
                BackToTopButtonShadow: {
                    mount: 0, x: 1535, y: 915, color: 0x80000000, w: 300, h: 100, texture: lng.Tools.getShadowRect(300, 100, 50, 10, 10)
                },
                BackToTopButton: {
                    zIndex: 10, y: 920, x: 1544, texture: lng.Tools.getRoundRect(276, 80, 40, 3, 0x66404040, true, 0x99101010),
                    PressText: {
                        color: 0xFFFFFFFF, mount: 0.5, y: 44, x: 60, text: { text: 'Press', fontSize: 24, fontFace: 'RobotoRegular' }
                    },
                    Image: {
                        src: AppDefinition.getPath("img/undo.png"), y: 26, x: 101
                    },
                    Text: {
                        color: 0x99F1F1F1, mount: 0.5, y: 44, x: 200, text: { text: 'top of list', fontSize: 26, fontFace: 'RobotoRegular' }
                    }
                }
            };
        }

        get api() {
            return this.cparent.api;
        }

        set gridData(v) {
            this.tag("Grid").patch({
                children: v.map((d, idx) => {
                    return {
                        ref: `List${idx}`, data: d, backgroundAlpha: (idx % 2 === 0), type: List, y: (idx * 510)
                    };
                })
            });
        }

        get list() {
            return this.tag("Grid").children
        }

        get active() {
            return this.list[this._index]
        }

        get index() {
            return this._index
        }

        set index(v) {
            this._index = v;
        }

        get previousIndex() {
            return this._previousIndex
        }

        set previousIndex(v) {
            this._previousIndex = v;
        }

        resetGridIndex() {
            this._index = 0;
        }

        get focusedItem() {
            return this.tag('Grid').children[this.index].focusedItem
        }

        _init() {
            this._index = 0;
            this._previousIndex = 0;
        }

        _handleUp() {
            this._previousIndex = this._index;
            if (this._index > 0) {
                this.fire("select",{ index: this._index-1 });
            }

            return false
        }

        _handleDown() {
            this._previousIndex = this._index;

            if (this._index < this.list.length - 1) {
                this.fire("select", { index: this._index+1 });
            }

            return false
        }

        select({index}) {
            this._index = index;
            this.tag("Grid").patch({
                smooth: { y: (index === 0) ? 50 : index*-510 + 280 }
            });
        }

        _getFocused() {
            return this.active
        }
    }

    class PlayerPreview extends lng.Component {
        static _template() {
            return {
                Shade: {
                    rect: true, w: 1920, h:250, colorTop: 0xE6000000, colorBottom: 0x00000000
                },
                ShadeBottom: {
                    rect: true, w: 1920, h:350, y:450, colorTop: 0x00000000, colorBottom: 0xE6000000
                },
                VideoDetails: {
                    Icon: {
                        h: 60, w: 60, x: 120, y: 505,
                    },
                    Uploader: {
                        x: 200, y: 514, text: { text: " ", fontFace: 'RobotoRegular', fontSize: 36, color: 0xFFF1F1F1 }
                    },
                    Title: {
                        w: 1000, x: 120, y: 577, text: { text: " ", fontFace: 'RobotoRegular', maxLines: 2, lineHeight: 60, fontSize: 48, color: 0xFFF1F1F1 }
                    }
                },
                Play: {
                    x: 135, y: 752,
                    type: Button, action: 'play', image: AppDefinition.getPath('img/play.png')
                }
            }
        }

        set playlist (v) {
            this._playlist = v;
            this.playlistIndex = 0;
            this.videoData = v[this.playlistIndex];
        }

        set videoData(d) {
            this._videoData = d;
            this._currentUrl = this._videoData.url;

            this.patch({
                VideoDetails: {
                    Uploader: {
                        text: { text: d['owner.screenname'] }
                    },
                    Title: {
                        text: { text: d.title }
                    },
                    Icon: { src: ux.Ui.getImageUrl(d['owner.avatar_80_url'] || '', { w: 46, h: 46, type: "crop" }) },
                }
            });

            this.application.updateFocusSettings();
        }

        get videoData() {
            return this._videoData
        }

        get playlist() {
            return this._playlist
        }

        set playlistIndex(idx) {
            this._currentPlaylistIdx = idx;
        }

        get playlistIndex() {
            return this._currentPlaylistIdx
        }

        get playlistItem() {
            return this.playlist[this.playlistIndex]
        }

        getNextVideo() {
            if (this.playlistIndex+1 <= this.playlist.length-1)
                this.playlistIndex = this.playlistIndex + 1;
            else
                this.playlistIndex = 0;

            this.videoData = this.playlist[this.playlistIndex];
        }

        _getFocused() {
            return this.tag('Play')
        }

        _focus() {
            this.patch({
                VideoDetails: {
                    Icon: { y: 505, h: 60, w: 60 },
                    Uploader: { x: 200, y: 514, text: { fontSize: 36 } },
                    Title: { y: 577, text: { fontSize: 48, lineHeight: 60 } },
                },
                Play: { alpha: 1 }
            });
        }

        _unfocus(target) {
            if (target.ref === "SearchButton"){
                return;
            }

            this.patch({
                VideoDetails: {
                    Icon: { y: 620, h: 46, w: 46, },
                    Uploader: { x: 182, y: 625, text: { fontSize: 26 } },
                    Title: {  y: 675, text: { fontSize: 38, lineHeight: 44 } },
                },
                Play: { alpha: 0 },
            });
        }

        $mediaplayerEnded() {
            this.getNextVideo();
        }

        $mediaplayerError() {
            this.getNextVideo();
        }

        _setFocusSettings(settings) {
            settings.mediaplayer.consumer = this;
        }

        getMediaplayerSettings() {
            return {
                stream: {
                    src: this._currentUrl
                }
            };
        }
    }

    class MainPage extends lng.Component {
        static _template() {
            return {
                clipbox: true, h: 1080, w: 1920,
                Main: {
                    alpha: 1,
                    type: Main, signals: { backButtonPressed: true }
                },
                PlayerPreview: {
                    alpha: 0,
                    type: PlayerPreview, x: 0, y: 0, w: 1920, h: 800
                },
                Logo: {
                    alpha: 0,
                    src: AppDefinition.getPath("img/Dailymotion_logo_(2015).png"), y: 80, x: 120
                }
            }
        }

        set gridData(v) {
            this._gridData = v;
            this.tag('Main').gridData = this._gridData;
        }

        get gridData() {
            return this._gridData
        }

        get focusedItem() {
            return this.tag('Main').focusedItem
        }

        _init() {
            this._setState('PlayerPreview');
        }

        static _states() {
            const duration = 0.2;
            return [
                class PlayerPreview$$1 extends this {
                    _getFocused() {
                        return this.tag('PlayerPreview')
                    }
                    _handleDown() {
                        this._setState('Main');
                    }
                },
                class Main$$1 extends this {
                    _getFocused() {
                        return this.tag('Main')
                    }
                    $enter() {
                        this.patch({
                            Main: {
                                transitions: { y: {duration}}, smooth: { y: 250 },
                                Grid: { transitions:{y: {duration}}, y: 57 }
                            },
                            PlayerPreview: {
                                transitions: { y: {duration}}, smooth: { y: -550 }
                            },
                            Logo: { smooth: { y: 0, alpha: 0 }}
                        });
                    }
                    resetMainOffsets() {
                        this.patch({
                            Main: {
                                transitions: { y: {duration}}, smooth: { y: 798 },
                                Grid: { transitions:{y: {duration}}, y: 85 }
                            },
                            PlayerPreview: {
                                transitions: { y: {duration}}, smooth: { y: 0, alpha: 1, lineHeight: 60 }
                            },
                            Logo: { smooth: { y: 80, alpha: 1 }}
                        });
                    }
                    _handleUp() {
                        const main = this.tag('Main');

                        if (!main.index && main.index === main.previousIndex) {
                            this.fire('resetMainOffsets');
                            this._setState('PlayerPreview');
                            return;
                        }

                        if (main.index !== 0) {
                            return
                        }

                        this.patch({
                            Main: {
                                transitions: { y: {duration}}, smooth: { y: 250},
                                Grid: { transitions: {y: {duration}}}
                            },
                            PlayerPreview: { smooth: { alpha: 1, y: -550 } },
                            Logo: { smooth: { y: 0, alpha: 0 } }
                        });

                        if (main.previousIndex === 1) {
                            return false
                        }
                    }
                    _handleDown() {
                        const mainIndex = this.tag('Main').index;
                        if (mainIndex !== 1) {
                            return
                        }

                        this.patch({
                            Main: { transitions: { y: {duration}}, smooth: { y: 0 },
                                Grid: { transitions: {y: {duration}}}
                            },
                            PlayerPreview: { transitions: { y: {duration}, alpha: {delay: 0.2}}, smooth: { alpha: 0, y: -800 } },
                            Logo: { smooth: { y: 0, alpha: 0 } }
                        });

                        return false
                    }
                    _handleBack() {
                        const index = this.tag('Main').index;
                        const duration = 0.2 + (0.1 * (index && index > 10 ? 10 : index));

                        this.patch({
                            Main: {
                                transitions: { y: {duration}}, smooth: { y: 250 },
                                Grid: { transitions: { y: {duration}}, smooth: { y: 57 } }
                            },
                            PlayerPreview: {
                                transitions: { alpha: {delay: duration}}, smooth: { alpha: 1, y: -550 }
                            }
                        });

                        this.tag('Main').resetGridIndex();

                        return false
                    }
                }
            ]
        }
    }

    class KeyboardButton extends lng.Component {
        static _template() {
            return {
                Background: {colorTop: 0xffe8e8e8 /*0xff3777ee*/, colorBottom: 0xffd1d1d1/*0xff2654a8*/},
                Label: {color: 0xffffffff}
            }
        }

        set action(v) {
            this._a = v;
        }

        get action() {
            return this._a
        }

        get c() {
            return this.key.c
        }

        set key(k) {
            this._k = k;
            let label = {mountX: 0.5, mountY: 0.4, text: {text: this.key.c || '', fontSize: 36, fontFace: 'RobotoRegular', textAlign: 'center'}};

            if(typeof(k.c) === 'object') {
                label = {mountX: 0.5, mountY: 0.30, text: {text: k.c.type, fontFace: k.c.font, fontSize: k.c.fontSize || 40, textAlign: 'Center'}};
            }
            const isInput = this.action === 'input';

            this.patch({
                Background: {alpha: isInput ? 0 : 0.5, texture: lng.Tools.getRoundRect(this.w, this.h, 7, 0, 0xffffffff, true, 0xffffffff)},
                Label: lng.tools.ObjMerger.merge({x: this.w/2, y: this.h/2, color: isInput ? 0xffffffff : 0xff000000}, label)
            });

            if(this.hasFocus()) {
                this.fire('_focus');
            }
        }

        get key() {
            return this._k
        }

        _init() {
            const isInput = this.action === 'input';
            this.patch({
                Background: {alpha: isInput ? 0 : 0.5, texture: lng.Tools.getRoundRect(this.w, this.h, 7, 0, 0xffffffff, true, 0xffffffff)},
                Label: {color: isInput ? 0xffffffff : 0xff000000, x: this.w/2, y: this.h/2}
            });
        }

        _focus() {
            this.patch({
                Background: {smooth: {alpha: 1, colorBottom: 0xff2654a8, colorTop: 0xff3777ee}},
                Label: {smooth: {color: 0xffffffff}}
            });
        }

        _unfocus() {
            const isInput = this.action === 'input';
            this.patch({
                Background: {smooth: {alpha: isInput ? 0 : 0.5, colorTop: 0xffe8e8e8, colorBottom: 0xffd1d1d1}},
                Label: {smooth: {color: isInput ? 0xffffffff : 0xff000000}}
            });
        }
    }

    const layouts = {
        'ABC': { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: 'Q'},
                        Key2: {c: 'W'},
                        Key3: {c: 'E'},
                        Key4: {c: 'R'},
                        Key5: {c: 'T'},
                        Key6: {c: 'Y'},
                        Key7: {c: 'U'},
                        Key8: {c: 'I'},
                        Key9: {c: 'O'},
                        Key10: {c: 'P'}
                    }
                },
                Row2: {x: 34,
                    keys: {
                        Key1: {c: 'A'},
                        Key2: {c: 'S'},
                        Key3: {c: 'D'},
                        Key4: {c: 'F'},
                        Key5: {c: 'G'},
                        Key6: {c: 'H'},
                        Key7: {c: 'J'},
                        Key8: {c: 'K'},
                        Key9: {c: 'L'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: 'Aa',toLayout: 'abc', action: 'toggleToLayout'},
                        Key2: {c: 'Z'},
                        Key3: {c: 'X'},
                        Key4: {c: 'C'},
                        Key5: {c: 'V'},
                        Key6: {c: 'B'},
                        Key7: {c: 'N'},
                        Key8: {c: 'M'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: '#123', c: '#123', action: 'toggleToLayout'},
                        Key2: {c: ','},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '.'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        'abc': { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: 'q'},
                        Key2: {c: 'w'},
                        Key3: {c: 'e'},
                        Key4: {c: 'r'},
                        Key5: {c: 't'},
                        Key6: {c: 'y'},
                        Key7: {c: 'u'},
                        Key8: {c: 'i'},
                        Key9: {c: 'o'},
                        Key10: {c: 'p'}
                    }
                },
                Row2: {x: 34,
                    keys: {
                        Key1: {c: 'a'},
                        Key2: {c: 's'},
                        Key3: {c: 'd'},
                        Key4: {c: 'f'},
                        Key5: {c: 'g'},
                        Key6: {c: 'h'},
                        Key7: {c: 'j'},
                        Key8: {c: 'k'},
                        Key9: {c: 'l'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: 'aA',toLayout: 'ABC', action: 'toggleToLayout'},
                        Key2: {c: 'z'},
                        Key3: {c: 'x'},
                        Key4: {c: 'c'},
                        Key5: {c: 'v'},
                        Key6: {c: 'b'},
                        Key7: {c: 'n'},
                        Key8: {c: 'm'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: '#123', c: '#123', action: 'toggleToLayout'},
                        Key2: {c: ','},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '.'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        '#123' : { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: '1'},
                        Key2: {c: '2'},
                        Key3: {c: '3'},
                        Key4: {c: '4'},
                        Key5: {c: '5'},
                        Key6: {c: '6'},
                        Key7: {c: '7'},
                        Key8: {c: '8'},
                        Key9: {c: '9'},
                        Key10: {c: '0'}
                    }
                },
                Row2: {x: 34,
                    keys: {
                        Key1: {c: '@'},
                        Key2: {c: '#'},
                        Key3: {c: '€'},
                        Key4: {c: '_'},
                        Key5: {c: '&'},
                        Key6: {c: '-'},
                        Key7: {c: '+'},
                        Key8: {c: '('},
                        Key9: {c: ')'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: '{&=', toLayout: '{&=', action: 'toggleToLayout'},
                        Key2: {c: '*'},
                        Key3: {c: '\"'},
                        Key4: {c: '\''},
                        Key5: {c: ':'},
                        Key6: {c: ';'},
                        Key7: {c: '!'},
                        Key8: {c: '?'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: 'ABC', c: 'ABC', action: 'toggleToLayout'},
                        Key2: {c: ','},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '.'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        '{&=' : { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: '~'},
                        Key2: {c: '\`'},
                        Key3: {c: '|'},
                        Key4: {c: '\u2022'},
                        Key5: {c: '√'},
                        Key6: {c: 'π'},
                        Key7: {c: '\u00F7'},
                        Key8: {c: '\u00d7'},
                        Key9: {c: '¶'},
                        Key10: {c: '∆'}
                    }
                },
                Row2: {
                    keys: {
                        Key1: {c: '£'},
                        Key2: {c: '¥'},
                        Key3: {c: '€'},
                        Key4: {c: '¢'},
                        Key5: {c: '^'},
                        Key6: {c: '°'},
                        Key7: {c: '='},
                        Key8: {c: '{'},
                        Key9: {c: '}'},
                        Key10: {c: '\\'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: '#123', toLayout: '#123', action: 'toggleToLayout'},
                        Key2: {c: '%'},
                        Key3: {c: '©'},
                        Key4: {c: '®'},
                        Key5: {c: '™'},
                        Key6: {c: '\u2713'},
                        Key7: {c: '['},
                        Key8: {c: ']'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: 'ABC', c: 'ABC', action: 'toggleToLayout'},
                        Key2: {c: '<'},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '>'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        }
    };

    class Keyboard extends lng.Component {
        static _template() {
            return {}
        }

        get KeyboardButton() {
            return KeyboardButton
        }

        get KeyboardLayouts() {
            return layouts
        }

        set value(v) {
            this._value = v;
            this.signal('valueChanged', {value: v});
        }

        get value() {
            return this._value
        }

        get rows() {
            return this.children
        }

        get rowLength() {
            return this.children[this.rowIndex].children.length
        }

        get currentKey() {
            return this.children[this.rowIndex].children[this.colIndex]
        }

        set layout(layout) {
            this._layout = layout;
            this._update();
        }

        get layout() {
            return this._layout
        }

        _getFocused() {
            return this.currentKey
        }

        _navigate(dir, value) {
            dir = (dir === 'up' || dir === 'down') ? 'vertical' : 'horizontal';
            if(dir === 'horizontal' && this.colIndex + value < this.rowLength && this.colIndex + value > -1) {
                this.previous = null;
                return this.colIndex += value
            }
            else if(dir === 'vertical' && this.rowIndex + value < this.rows.length && this.rowIndex + value > -1) {
                const currentColIndex = this.colIndex;
                const targetRow = this.rowIndex + value;
                if(this.previous && this.previous.row === targetRow) {
                    const tmp = this.previous.col;
                    this.previous.col = this.colIndex;
                    this.colIndex = tmp;
                }
                else {
                    const targetRow = this.children[(this.rowIndex + value)];
                    const targetItems = targetRow.children;
                    const ck = this.currentKey;
                    let target = 0;
                    for(let i = 0; i < targetItems.length; i++) {
                        const ckx = this.children[this.rowIndex].x + ck.x;
                        const tix = targetRow.x + targetItems[i].x;
                        if((ckx >= tix && ckx <= tix + targetItems[i].w) || (tix >= ckx && tix <= ckx + ck.w)) {
                            target = i;
                            break
                        }
                    }
                    this.colIndex = target;
                }
                this.previous = {col: currentColIndex, row: this.rowIndex};
                return this.rowIndex += value
            }
            return false
        }

        reset() {
            this.colIndex = 0;
            this.rowIndex = 0;
            this._value = '';
            this.previous = null;
        }

        _init() {
            this.reset();
            this._update();
        }

        _handleRight() {
            return this._navigate('right', 1)
        }

        _handleLeft() {
            return this._navigate('left', -1)
        }

        _handleUp() {
            return this._navigate('up', -1)
        }

        _handleDown() {
            return this._navigate('down', 1)
        }

        toggleToLayout(e) {
            this.layout = e.value;
            this._update();
        }

        _update() {
            const KeyboardLayouts = this.KeyboardLayouts;
            const KeyboardButton$$1 = this.KeyboardButton;

            if(this.layout && KeyboardLayouts[this.layout] === undefined) {
                console.error(`Configured layout "${this.layout}" does not exist. Reverting to "${Object.keys(KeyboardLayouts)[0]}"`);
                this.layout = null;
            }

            if(!this.layout) {
                this.layout = Object.keys(KeyboardLayouts)[0];
            }

            const {rows = {}, keyWidth, keyHeight, spacing = 0, horizontalSpacing = 0, verticalSpacing = 0} = KeyboardLayouts[this.layout];
            this.children = Object.keys(rows).map((r, index) => {
                const row = rows[r];
                let keyOffset = 0;
                return {ref: r, y: keyHeight * index + (index * (verticalSpacing || spacing || 0)), x: row.x || 0,
                    children: Object.keys(row.keys).map((k, index) => {
                        const key = Object.assign({action: 'input'}, row.keys[k]);
                        const prevOffset = keyOffset;
                        keyOffset += (key.w || keyWidth) + (horizontalSpacing || spacing);
                        return {ref: k, key: key || index, action: key.action, toLayout: key.toLayout, x: prevOffset, w: key.w || keyWidth, h: key.h || keyHeight, type: KeyboardButton$$1}
                    })
                }
            });

            this.signal('keysUpdated');
        }

        _handleEnter() {
            const key = this.currentKey;
            switch(key.action) {
                case 'input':
                    this.value += key.c;
                    break
                case 'backspace':
                    this.value = this.value.slice(0, -1);
                    break
                case 'space':
                    if(this.value.length > 0){
                        this.value += ' ';
                    }
                    break
                case 'delete':
                    this.value = '';
                    break
                case 'toggleToLayout':
                    this.toggleToLayout({value: key.toLayout});
                    break
                default:
                    this.signal(key.action);
                    break
            }
        }
    }

    // import IconItem from "../components/IconItem.js";

    class KeyboardButton$1 extends lng.Component {
        static _template() {
            return {
                Background: {
                    mountY: 0.5,
                    Label: {color: 0xFFF1F1F1, mountX: 0.5, mountY: 0.45, text: { text: '', fontSize: 38, fontFace: 'RobotoRegular', textAlign: 'center'} },
                    Icon: {alpha: 0, mountX: 0.5, mountY: 0.5}
                }
            }
        }

        set action(v) {
            this._a = v;
        }

        get action() {
            return this._a
        }

        get c() {
            return this.key.c
        }

        set key(k) {
            this._k = k;
            if(typeof(k.c) === 'object') {
                this.patch({
                    Background: {
                        Label: {alpha: 0},
                        Icon: {alpha: 1, src: AppDefinition.getPath(`img/${k.c.src}.png`)}
                    }
                });
            }
            else {
                this.patch({
                    Background: {
                        Label: {alpha: 1, text: {text: k.c || ''}},
                        Icon: {alpha: 0}
                    }
                });
            }
        }

        get key() {
            return this._k
        }

        _init() {
            const action = (this.action !== 'input' && this.action !== 'backspace');

            this.patch({
                Background: {
                    color: (action ? 0x40F1F1F1 : 0x00000000),
                    texture: lng.Tools.getRoundRect(this.w, this.h, this.h/2, 0, 0xffffffff, true, 0xffffffff),
                    Label: {x: this.w/2, y: this.h/2, text: {fontSize: (action ? 28 : 38 )}},
                    Icon: {x: this.w/2, y: this.h/2}
                }
            });
        }

        _focus() {
            this.tag('Background').patch({smooth: {color: 0xFF00C1F8}});
        }

        _unfocus() {
            this.tag('Background').patch({smooth: {color: (this.action !== 'input' && this.action !== 'backspace' ? 0x40F1F1F1 : 0x00000000)}});
        }
    }

    class Keyboard$1 extends Keyboard {
        get KeyboardButton() {
            return KeyboardButton$1
        }

        get KeyboardLayouts() {
            return KeyboardLayouts
        }
    }

    const KeyboardLayouts = {
        'abc': { keyWidth: 80, keyHeight: 80, horizontalSpacing: 75, verticalSpacing: 0,
            rows: {
                Row1: {
                    keys: {
                        Key1: {w: 200, h: 60, c: 'Delete', action: 'delete'},
                        Key2: {c: 'a'},
                        Key3: {c: 'b'},
                        Key4: {c: 'c'},
                        Key5: {c: 'd'},
                        Key6: {c: 'e'},
                        Key7: {c: 'f'},
                        Key8: {c: 'g'},
                        Key9: {c: 'h'},
                        Key10: {c: {src: 'backspace', w: 100, h: 100}, action: 'backspace'}
                    }
                },
                Row2: {
                    keys: {
                        Key1: {w: 200, h: 60, action: 'space', c: 'Space'},
                        Key2: {c: 'i'},
                        Key3: {c: 'j'},
                        Key4: {c: 'k'},
                        Key5: {c: 'l'},
                        Key6: {c: 'm'},
                        Key7: {c: 'n'},
                        Key8: {c: 'o'},
                        Key9: {c: 'p'},
                        Key10: {c: 'q'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 200, h: 60, toLayout: '#123', c: '#123', action: 'toggleToLayout'},
                        Key2: {c: 'r'},
                        Key3: {c: 's'},
                        Key4: {c: 't'},
                        Key5: {c: 'u'},
                        Key6: {c: 'v'},
                        Key7: {c: 'w'},
                        Key8: {c: 'x'},
                        Key9: {c: 'y'},
                        Key10: {c: 'z'},

                    }
                }
            }
        },
        '#123' : { keyWidth: 80, keyHeight: 80, horizontalSpacing: 75, verticalSpacing: 0,
            rows: {
                Row1: {
                    keys: {
                        Key1: {w: 200, h: 60, c: 'Delete', action: 'delete'},
                        Key2: {c: '1'},
                        Key3: {c: '2'},
                        Key4: {c: '3'},
                        Key5: {c: '4'},
                        Key6: {c: '-'},
                        Key7: {c: '+'},
                        Key8: {c: '*'},
                        Key9: {c: '.'},
                        Key10: {c: {src: 'backspace', w: 100, h: 100}, action: 'backspace'}
                    }
                },
                Row2: {
                    keys: {
                        Key1: {w: 200, h: 60, action: 'space', c: 'Space'},
                        Key2: {c: '5'},
                        Key3: {c: '6'},
                        Key4: {c: '7'},
                        Key5: {c: '8'},
                        Key6: {c: '/'},
                        Key7: {c: '\\'},
                        Key8: {c: '|'},
                        Key9: {c: '{'},
                        Key10: {c: '}'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 200, h: 60, toLayout: 'abc', c: 'Abc', action: 'toggleToLayout'},
                        Key2: {c: '9'},
                        Key3: {c: '0'},
                        Key4: {c: '\''},
                        Key5: {c: '&'},
                        Key6: {c: '?'},
                        Key7: {c: '@'},
                        Key8: {c: '='},
                        Key9: {c: '['},
                        Key10: {c: ']'}
                    }
                }
            }
        }
    };

    class InputField extends lng.Component {
        static _template() {
            return {
                Shadow: { color: 0xB3000000, x: -8, w: 1700, h: 120, texture: lng.Tools.getShadowRect(1700, 120, 60, 20, 20) },
                Background: { h: 106, w: 1686, texture: lng.Tools.getRoundRect(1686, 106, 53, 3, 0x80BBBBBB, true, 0x80F1F1F1) },
                Icon: { y: 33, x: 35, src: AppDefinition.getPath("img/search-big.png") },
                QueryString: { y: 19, x: 120, color: 0xFFf1f1f1, text: { text: 'Search', fontSize: 50, fontFace: 'RobotoRegular'  }}
            }
        }

        set value(v) {
            const screenValue = this.inspectValue(v);
            this.patch({
                QueryString: { text: { text: this._limitTextLength(screenValue, InputField.MAX_CHARS) }}
            });
            this._value = screenValue;
        }

        _limitTextLength(value,max){
            if(value.length <= max){
                return value;
            }

            const len = value.length;
            const offset = len - max;
            
            return value.substring(offset,len);
        }

        inspectValue(value) {
            this._hasInput = false;
            if(value.length > 0) {
                this._hasInput = true;
                return value
            }
            return this.emptyInputString
        }

        get emptyInputString() {
            return 'Search'
        }

        get value() {
            return this._value
        }

        get hasInput() {
            return this._hasInput
        }

        reset() {
            this.value = '';
        }

        _init() {
            this._hasInput = false;
            const icon = this.tag('Icon');
            const queryString = this.tag('QueryString');
            const background = this.tag('Background');
        }

        _focus() {
            this.patch({
                QueryString: {smooth: {color: this._fc.textFocus}}
            });
        }

        _unfocus() {
            this.patch({
                QueryString: {smooth: {color: this.hasInput ?  this._hasInputColor : this._emptyInputColor}}
            });
        }
    }

    InputField.MAX_CHARS = 33;

    class Search extends lng.Component {

        static _template() {
            return {
                h: 1080, w: 1920, clipbox: true, color: 0xFF202630, rect: true,
                Shadow: { w: 1920, h: 180, colorTop: 0xCC000000, colorBottom: 0x00000000, rect: true },
                InputField: { x: 117, y: 77, type: InputField },
                Keyboard: { x: 140, y: 265, type: Keyboard$1, signals: { keysUpdated: true, valueChanged: true, search: true, hideKeyboard: true }},
                List: { type: List, y: 600, x: 120, backgroundAlpha: false }
            }
        }

        get api() {
            return this.cparent.api;
        }

        getResults(term) {
            if(!term){
                this.clearListData();
                return;
            }
            this.api.search(term).then((data) => {
                this.listData = {
                    item: {
                        name: !data.list.length?'No results':'Results'
                    },
                    list: data.list
                };
            });
        }

        set listData(d) {
            this.tag('List').data = d;
        }

        clearListData() {
            this.listData = {
                item: {
                    name: 'Results'
                },
                list: []
            };
        }

        _init() {
            this.clearListData();
        }

        _focus() {
            this.patch({ smooth: { alpha: 1 }});

            if (this.tag('List')._item.list.length > 0) {
                this._setState('List');
                return
            }

            this._setState('Keyboard');
        }

        _unfocus() {
            this.patch({ smooth: { alpha: 0 }});
        }

        valueChanged(e) {
            this.tag('InputField').value = e.value;
            this.getResults(e.value);
            this.resetListIndex();
        }

        static _states() {
            return [
                class Keyboard extends this {
                    _getFocused() {
                        return this.tag('Keyboard')
                    }
                    _handleDown() {
                        if (this.tag('List')._item.list.length === 0)
                            return;

                        this._setState('List');
                    }
                },
                class List$$1 extends this {
                    _getFocused() {
                        return this.tag('List')
                    }
                    _handleUp() {
                        this._setState('Keyboard');
                    }
                    _handleEnter() {
                        this.signal('videoSelected', this.tag('List').focusedItem);
                    }
                }
            ]
        }

        resetListIndex() {
            return this.tag('List').resetIndex()
        }
    }

    class DailymotionApi {

        constructor() {
            this._expires = null;
            this._token = null;
        }

        getToken() {
            const url = 'https://api.dailymotion.com/oauth/token';
            const proxyUrl = "http://52.29.76.170/?url=" + encodeURIComponent(url);
            const data = {
                grant_type: 'client_credentials',
                client_secret: '45b0cbc527f20234e46ee0d1b5ca46f6fcf694e1',
                client_id: 'c46473a40db3e0f27da3'
            };

            let parts = [];

            Object.keys(data).forEach((k) => {
                parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`);
            });

            return fetch(proxyUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                mode: 'cors',
                body: parts.join('&')
            })
            .then((res) => res.json())
            .then((res) => {
                this._token = res.access_token;
                this._expires = new Date();
                this._expires.setSeconds(this._expires.getSeconds() + res.expires_in);

                return 'success'
            })
        }

        isTokenValid() {
            this._current = new Date();

            if (!this._token || Date.parse(this._expires) < Date.parse(this._current)) {

                return this.getToken()
                    .then((res) => {
                        if (res !== 'success') {
                            return 'tokenInvalid'
                        }
                        return 'tokenValid'
                    })
            } else {
                return Promise.resolve(true)
            }
        }

        getTrendingVideos() {
            const fields = `id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration`;
            const url = `https://api.dailymotion.com/videos?sort=trending&limit=20&fields=${fields}`;

            return fetch(url, {
                method: 'GET'
            })
            .then(response => response.json())
            .then((response) => {
                const promises = response.list.map((video) => {
                    return this.getVideo(video.id)
                        .then((urlResponse) => {
                            video.url = urlResponse;
                            return video;
                        })
                });

                return Promise.all(promises)
            });
        }

        getVideo(id) {
            return this.isTokenValid()
                .then(() => {
                    const url = `https://api.dailymotion.com/video/${id}?access_token=${this._token}&localization=nl_NL&family_filter=0&fields=stream_h264_hd_url,stream_h264_qhd_url,stream_h264_ld_url,stream_hls_url`;
                    return fetch(url, {
                        method: 'GET'
                    })
                })
                .then(response => response.json())
                .then(response => {
                    return this.extractPlayUrl({list:response, preferred:"stream_hls_url"})
                })
        }

        search(term) {
            const fields = `id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration`;
            const url = `https://api.dailymotion.com/videos?limit=20&fields=${fields}&search=${term}`;

            return fetch(url, {
                method: 'GET'
            })
            .then(res => {
                return res.json();
            })
        }

        getRelated(id) {
            const fields = `id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration`;
            const url = `https://api.dailymotion.com/video/${id}/related&limit=20&fields=${fields}`;

            return fetch(url, {
                method: 'GET'
            })
            .then(res => {
                return res.json();
            })
        }

        getChannels(sort = 'popular', limit = 20) {
            return fetch(`https://api.dailymotion.com/channels?sort=${sort}&limit=${limit}`, {
                method: 'GET'
            })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                let apicalls = data.list.map(item => {
                    return this.getChannelVideos(item, limit)
                });

                return Promise.all(apicalls)
            }).then((lists) => {
                return lists.filter(channel =>  channel.list && channel.list.length)
            })
        }

        // todo Featured Playlists for the MainPage ( slider )

        getPlaylists() {
            let url = 'https://api.dailymotion.com/playlists?fields=id,name,thumbnail_360_url,videos_total,owner.screenname,&private=0&sort=recent&limit=5';
            // let url = 'https://api.dailymotion.com/playlists?search=featured&limit=1'

            return fetch(url, {
                method: 'GET'
            })
            .then(res => {
                return res.json();
            })
            .then((res) => {
                console.log('playlist list : ', res, res.list);

                return res.list

                // return this.getPlaylist(res.list[0].id)
            })
    /*        .then((res) => {
                return res
            })*/
        }

        getPlaylist(id) {
            // const fields = `id,item_type,name,description,owner,owner.id,owner.item_type,owner.is_following,owner.parent,owner.active,owner.status,owner.username,owner.screenname,owner.fullname,owner.website_url,owner.facebook_url,owner.pinterest_url,owner.twitter_url,owner.instagram_url,owner.googleplus_url,owner.linkedin_url,owner.created_time,owner.description, owner.language, owner.gender, owner.email, owner.birthday, owner.views_total, owner.videos_total, owner.playlists_total, owner.url, owner.avatar_25_url, owner.avatar_60_url, owner.avatar_80_url, owner.avatar_120_url, owner.avatar_190_url, owner.avatar_240_url, owner.avatar_360_url, owner.avatar_480_url, owner.avatar_720_url, owner.cover_100_url, owner.cover_150_url, owner.cover_200_url, owner.cover_250_url, owner.cover_url, owner.limits, owner.first_name, owner.last_name, owner.address, owner.city, owner.country, owner.reposts_total, owner.followers_total, owner.following_total, owner.partner, owner.verified, owner.children_total, owner.revenues_video_last_day, owner.revenues_video_last_week, owner.revenues_video_last_month, owner.revenues_video_total, owner.revenues_website_last_day, owner.revenues_website_last_week, owner.revenues_website_last_month, owner.revenues_website_total, owner.revenues_paidcontent_last_day, owner.revenues_paidcontent_last_week, owner.revenues_paidcontent_last_month, owner.revenues_paidcontent_total, owner.revenues_claim_last_day, owner.revenues_claim_last_week, owner.revenues_claim_last_month, owner.revenues_claim_total, videos_total, thumbnail_url, thumbnail_60_url, thumbnail_120_url, thumbnail_180_url, thumbnail_240_url, thumbnail_360_url, thumbnail_480_url, thumbnail_720_url, thumbnail_1080_url, created_time, updated_time`
            const fields = `id,name,videos_total,owner.avatar_80_url,thumbnail_url`;
            const url = `https://api.dailymotion.com/playlist/${id}?fields=${fields}`;

            return fetch(url, {
                method: 'GET'
            })
            .then(response => response.json())
        }

        getChannelVideos(item, limit) {
            const fields = `id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration`;

            return fetch(`https://api.dailymotion.com/channel/${item.id}/videos&sort=trending&limit=${limit}&fields=${fields}`, {
                method: 'GET'
            })
            .then(res => {
                return res.json()
            })
            .then((data) => {
                return {
                    item, list: data.list
                }
            })
        }

        extractPlayUrl({list, preferred}){
            if(list[preferred]){
                return list[preferred];
            }

            let keys = Object.keys(list);
            for(let i = 0, j = keys.length; i < j; i++){
                const url = list[keys[i]];
                if(url){
                    return url;
                }
            }

            return false;
        }
    }

    class Splash extends lng.Component{
        static _template() {
            return {
                alpha: 1, h: 1080, w: 1920, rect: true, color: 0xFF202630, transitions: { alpha: {duration: 0.5}},
                Logo: {
                    alpha: 0, h: 119, w: 666, transitions: { alpha: {duration: 2}, y: {duration: 1}},
                    src: AppDefinition.getPath("img/splash_logo.png"), mount: 0.5, x: 960, y: 580
                }
            };
        }

        _active() {
            this.tag('Logo').patch({ smooth: { alpha: 1, y: 540 }});
        }
    }

    class DailymotionApp extends ux.App {

        static getFonts () {
            return [
                {family: 'RobotoBold', url: AppDefinition.getPath('fonts/roboto-bold.ttf'), desccriptors: {}},
                {family: 'RobotoMedium', url: AppDefinition.getPath('fonts/roboto-medium.ttf'), desccriptors: {}},
                {family: 'RobotoRegular', url: AppDefinition.getPath('fonts/roboto-regular.ttf'), desccriptors: {}},
            ];
        }

        static _template() {
            return {
                Player: { alpha: 0, type: Player, signals: { backButtonPressed: true } },
                MainPage: { type: MainPage },
                Search: { alpha: 0, type: Search, signals: { videoSelected: true } },
                SearchButton: { alpha: 0, x: 1737, y: 77, type: Button, action: 'play', image: AppDefinition.getPath('img/search.png') },
                Splash: { type: Splash },
                Error: { alpha: 0, type: Error, layout: { message: 'Could not load content', color: 0xFF202630 , buttons: [{label: 'Retry', action: 'retry'}, {label: 'Close', action: 'exit'}]}, signals: { retry: true}}
            };
        }

        get api(){
            return this._api;
        }

        muteMediaPlayer() {
            this.application.mediaplayer.muted = true;
        }

        fillSlider(){
            this.tag('MainPage').gridData = this._channels;
        }

        videoSelected(item) {
            this.preparePlayer(item);

            this.patch({
                MainPage: { smooth: { alpha: 0 } },
                SearchButton: { smooth: { alpha: 0 } },
                Player: { smooth: { alpha: 1 } }
            });
        }

        preparePlayer(item){
            this.tag('Player').videoData = item;
            this.tag('Player').fetchVideoById(item.id);
            this.tag('Player').fetchRelatedList(item.id);
        }

        fetchMainData(){
            this._api.getChannels().then((data) => {
                this.fire("mainReceived", {data});
                return this._api.getTrendingVideos()
            }).then((data)=>{
                this.fire("trendingReceived",{data});
            }).catch(e=>{
                this.fire("mainError");
            });
        }

        _init() {
            this.muteMediaPlayer();
            this._api = new DailymotionApi();

            this.fetchMainData();

            this.fadeToContent = this.animation({
                delay: 1.5, duration: 1, actions: [
                    {t: 'Splash', p: 'alpha', rv:1, v: {0: 1, 0.5: 0}},
                    {t: 'Splash.Logo', p: 'alpha', rv:1, v: {0: 1, 0.5: 0}},
                    {t: 'Splash.Logo', p: 'y', rv: 540, v: {0: 540, 0.5: 500}},
                    {t: 'MainPage', p: 'alpha', rv: 0, v: {0.5: 0, 1: 1}},
                    {t: 'SearchButton', p: 'alpha', rv: 0, v: {0.5: 0, 1: 1}},
                    {t: 'MainPage.Logo', p: 'y', rv: 150, v: {0.5: 150, 1: 120}},
                    {t: 'MainPage.Logo', p: 'alpha', rv: 0, v: {0.5: 0, 1: 1}},
                    {t: 'MainPage.PlayerPreview', p: 'alpha', rv: 0, v: {0.5: 0, 1: 1}}
                ]
            });

            this.fadeToContent.on('finish', () => {
                this._setState('MainPage');
            });

            this._setState('Loading');
        }

        setPlaylist() {
            this.tag('MainPage').tag('PlayerPreview').playlist = this._channels[0].list;
        }

        playVideo(id) {
            this.tag('Player').fetchVideoById(id);
        }

        static _states() {
            return [
                class Loading extends this {
                    mainReceived({data}){
                        this._channels = data;
                    }
                    trendingReceived({data}){
                        this._channels.unshift({
                            item: {
                                name: 'Trending'
                            },
                            list: data
                        });
                        this.fire("ready");
                    }
                    mainError(){
                        if(!this._channels || !this._channels.length){
                            return this._setState('Error')
                        }
                        this.fire("ready");
                    }
                    ready(){
                        this.fillSlider();
                        this.fadeToContent.start();
                        this.setPlaylist();
                    }
                },
                class MainPage$$1 extends this {
                    _getFocused() {
                        return this.tag('MainPage')
                    }
                    _handleEnter() {
                        const item = this.tag('MainPage').focusedItem;
                        this.videoSelected(item);
                        this._setState('Player');
                    }
                    _handleUp() {
                        if (this.tag('MainPage').tag('Main').previousIndex === 1) {
                            this.tag('SearchButton').patch({ smooth: { alpha: 1, y: 77 }});
                            return
                        }

                        this._setState('SearchButton');
                    }
                    _handleDown() {
                        this.tag('SearchButton').patch({ smooth: { alpha: 0, y: -77 }});
                    }
                    _handleBack () {
                        this.tag('SearchButton').patch({ smooth: { alpha: 1, y: 77 }});
                    }
                },
                class Player$$1 extends this {
                    $enter(args) {
                        this._previousView = args.prevState;
                    }
                    _getFocused() {
                        return this.tag('Player');
                    }
                    _handleBack() {
                        this.patch({
                            Player: { smooth: { alpha: 0 } },
                        });

                        if (this._previousView === 'Search') {
                            this.patch({
                                Search: { smooth: { alpha: 1 } }
                            });
                            this._setState('Search');
                            return
                        }

                        this.patch({
                            MainPage: { smooth: { alpha: 1 } },
                            SearchButton: { smooth: { alpha: 1 } }
                        });
                        this._setState('MainPage');
                        this.playVideo(this.tag('MainPage').tag('PlayerPreview').playlistItem.id);
                    }
                    backButtonPressed() {
                        this._handleBack();
                    }
                },
                class SearchButton extends this {
                    _getFocused() {
                        return this.tag('SearchButton')
                    }
                    _handleDown() {
                        this._setState('MainPage');
                    }
                    _handleEnter() {
                        this.patch({
                            MainPage: { smooth: { alpha: 0 } },
                            SearchButton: { smooth: { alpha: 0 } },
                        });

                        this._setState('Search');
                    }
                },
                class Search$$1 extends this {
                    _getFocused() {
                        return this.tag('Search')
                    }
                    _handleBack() {
                        this.patch({
                            MainPage: { smooth: { alpha: 1 } },
                            SearchButton: { smooth: { alpha: 1 } },
                        });
                        this._setState('SearchButton');
                    }
                    videoSelected(item) {
                        this._setState('Player');
                        return this.videoSelected(item);
                    }
                },
                class Error$$1 extends this {
                    _getFocused() {
                        return this.tag('Error')
                    }
                    retry() {
                        this.fadeToContent.reset();
                        this._setState('Loading');
                        this.fetchMainData();
                    }
                }
            ]
        }

        _setFocusSettings(settings) {
            settings.mediaplayer.consumer = this.tag('MainPage').tag('PlayerPreview');
        }
    }

    class AppDefinition extends ux.AppDefinition {

        static get identifier() {
            return "com.metrological.app.Dailymotion";
        }

        getAppViewType() {
            return DailymotionApp;
        }


    }

    return AppDefinition;

}());
