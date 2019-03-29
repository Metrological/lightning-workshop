var com_metrological_app_TuneIn = (function () {
	'use strict';

	class StationAsset{
		constructor(obj){
			this._title = obj.text || obj._title || ' ';
			this._subText = obj.subtext || obj._subText || ' ';
			this._url = obj.URL || obj._url || '';
			this._image = obj.image || obj._image || '';
			this._guideId = obj.guid_id || obj._guideId || obj.now_playing_id;
			this._genreId = obj.genre_id || obj._genreId || '';
			this._currentTrack = obj.playing || obj._currentTrack || obj.current_track || ' ';
			this._currentTrackImage = obj.playing_image || obj._currentTrackImage || obj.image;
			this._linkType = obj.type || obj._linkType || '';
			this._itemType = obj.item || obj._itemType || '';
			this._bitrate = obj.bitrate || obj._bitrate || '';
			this._formats = obj.formats || obj._formats || '';
			this._blockImage = obj.image?obj.image.replace('brickg.jpg', 'logoq.jpg'):obj._blockImage;
			this._brickImage = obj.image?obj.image.replace('logoq.jpg', 'brickg.jpg'):obj._brickImage;
			this._currentTrackBlockImage = obj.playing_image?obj.playing_image.replace('brickg.jpg', 'logoq.jpg'):obj.image?obj.image.replace('brickg.jpg', 'logoq.jpg'):obj._currentTrackBlockImage || '';
			this._currentTrackBrickImage = obj.playing_image?obj.playing_image.replace('logoq.jpg', 'brickg.jpg'):obj.image?obj.image.replace('logoq.jpg', 'brickg.jpg'):obj._currentTrackBrickImage || '';
		}

		get title(){
			return this._title;
		}

		get subText(){
			return this._subText;
		}

		get url(){
			return this._url;
		}

		get image(){
			return this._image;
		}

		get guideId(){
			return this._guideId;
		}

		get genreId(){
			return this._genreId;
		}

		get currentTrack(){
			return this._currentTrack;
		}

		get currentTrackImage(){
			return this._currentTrackImage;
		}

		get linkType(){
			return this._linkType;
		}

		get itemType(){
			return this._itemType;
		}

		get bitrate(){
			return this._bitrate;
		}

		get formats(){
			return this._formats;
		}

		get blockImage(){
			return this._blockImage;
		}

		get brickImage(){
			return this._brickImage;
		}

		get currentTrackBlockImage(){
			return this._currentTrackBlockImage;
		}

		get currentTrackBrickImage(){
			return this._currentTrackBrickImage;
		}
	}

	class LinkAsset{
		constructor(obj){
			this._title = obj.text || obj._title || '';
			this._guideId = obj.guide_id || '';
			this._url = obj.URL || obj._url || '';
			this._type = obj.type || obj._type || '';
			this._itemType = obj.item || obj.type || '';
			this._key = obj.key || obj._key || '';
			this._imageKey = obj.image_key || '';
		}

		get title(){
			return this._title;
		}

		get guideId(){
			return this._guideId;
		}

		get url(){
			return this._url;
		}

		get type(){
			return this._type;
		}

		get itemType(){
			return this._itemType;
		}

		get key(){
			return this._key;
		}

		get imageKey(){
			return this._imageKey;
		}
	}

	class LinkAsset$1{
		constructor(obj){
			this._userName = obj.username || '';
			this._passWord = obj.passWord || '';
			this._email = obj.email || '';
			this._displayName = obj.display_name || '';
			this._firstName = obj.first_name || '';
			this._lastName = obj.last_name || '';
			this._birthday = obj.birthday || '';
			this._gender = obj.gender || '';
			this._guideId = obj.guide_id || '';
			this._sessionId = obj.session_id || '';
			this._userImage = obj.image || '';
		}

		get userName(){
			return this._userName;
		}

		get passWord(){
			return this._passWord;
		}

		get email(){
			return this._email;
		}

		get displayName(){
			return this._displayName;
		}

		get firstName(){
			return this._firstName;
		}

		get lastName(){
			return this._lastName;
		}

		get birthday(){
			return this._birthday;
		}

		get gender(){
			return this._gender;
		}

		get guideId(){
			return this._guideId;
		}

		get sessionId(){
			return this._sessionId;
		}

		get userImage(){
			return this._userImage;
		}
	}

	class MessageAsset{
		constructor(obj){
			this._message = (obj && obj.text)?obj.text:(obj && obj.outline && obj.outline.text)?obj.outline.text:'message';
		}

		get message(){
			return this._message;
		}
	}

	class CategoryAsset{
		constructor(obj){
			this._title = obj.text;
			this._items = this.getItems(obj);
			this._listType = CategoryAsset.getType(obj);
		}

		getItems(item){
			let itemLink = item.outline || item;
			if(Array.isArray(itemLink)){
				return itemLink.map((item)=>{
					if(item && item.type){
						switch(item.type){
							case 'link':
								return new LinkAsset(item);
							case 'audio':
								return new StationAsset(item);
							case 'text':
								return new MessageAsset(item);
							default:
								//console.log('(a) unknown item: ', item);
						}
					}
				});
			}else{
				if(itemLink && itemLink.type){
					switch(itemLink.type){
						case 'link':
							return [new LinkAsset(itemLink)];
						case 'audio':
							return [new StationAsset(itemLink)];
						case 'text':
							return [new MessageAsset(itemLink)];
						default:
							//console.log('(b) unknown item: ', itemLink);
					}
				}
			}
		}

		static getType(item){
			let outlineArrayTypeCheck = Array.isArray(item.outline)?item.outline[0] && item.outline[0].type:undefined;
			let outlineTypeCheck = item.outline && item.outline.type;
			let itemArrayTypeCheck = Array.isArray(item)?item[0] && item[0].type:undefined;
			let itemTypeCheck = item && item.type;

			if(outlineArrayTypeCheck === 'link' || outlineTypeCheck === 'link' || itemArrayTypeCheck === 'link' || itemTypeCheck === 'link'){
				return 'links';
			}else if(outlineArrayTypeCheck === 'audio' || outlineTypeCheck === 'audio' || itemArrayTypeCheck === 'audio' || itemTypeCheck === 'audio'){
				return 'stations';
			}else if(outlineArrayTypeCheck === 'text' || outlineTypeCheck === 'text' || itemArrayTypeCheck === 'text' || itemTypeCheck === 'text'){
				return 'text';
			}else{
				return '';
			}
		}

		get title(){
			return this._title;
		}

		get items(){
			return this._items;
		}

		get listType(){
			return this._listType;
		}
	}

	class Mediaplayer extends lng.Component {

	    static _template() {
	        return {
	            Video: {
	                VideoWrap: {
	                    VideoTexture: {
	                        visible: false,
	                        pivot: 0.5,
	                        texture: {type: lng.textures.StaticTexture, options: {}}
	                    }
	                }
	            }
	        };
	    }

	    set textureMode(v) {
	        return this._textureMode = v;
	    }

	    get textureMode() {
	        return this._textureMode;
	    }

	    get videoView() {
	        return this.tag("Video");
	    }

	    _init() {
	        this.videoEl = document.createElement('video');
	        this.videoEl.setAttribute('id', 'video-player');
	        this.videoEl.style.position = 'absolute';
	        this.videoEl.style.zIndex = '1';
	        this.videoEl.setAttribute('width', '100%');
	        this.videoEl.setAttribute('height', '100%');

	        this.videoEl.style.visibility = (this.textureMode) ? 'hidden' : 'visible';
	        if (this.textureMode) {
	            this._createVideoTexture();
	        }

	        const events = ['timeupdate', 'error', 'ended', 'loadeddata', 'canplay', 'play', 'playing', 'pause', 'loadstart', 'seeking', 'seeked', 'encrypted'];
	        events.forEach(event => {
	            this.videoEl.addEventListener(event, (e) => {
	                this.fire(event, {videoElement: this.videoEl, event: e});
	            });
	        });

	        document.body.appendChild(this.videoEl);
	    }

	    _createVideoTexture() {
	        const stage = this.stage;

	        const gl = stage.gl;
	        const glTexture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, glTexture);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	        this.videoTexture.options = {source: glTexture, w: this.videoEl.width, h: this.videoEl.height};
	    }

	    _startUpdatingVideoTexture() {
	        if (this.textureMode) {
	            const stage = this.stage;
	            if (!this._updateVideoTexture) {
	                this._updateVideoTexture = () => {
	                    if (this.videoTexture.options.source && this.videoEl.videoWidth && this.active) {
	                        const gl = stage.gl;

	                        const currentTime = (new Date()).getTime();

	                        // When BR2_PACKAGE_GST1_PLUGINS_BAD_PLUGIN_DEBUGUTILS is not set in WPE, webkitDecodedFrameCount will not be available.
	                        // We'll fallback to fixed 30fps in this case.
	                        const frameCount = this.videoEl.webkitDecodedFrameCount;

	                        const mustUpdate = (frameCount ? (this._lastFrame !== frameCount) : (this._lastTime < currentTime - 30));

	                        if (mustUpdate) {
	                            this._lastTime = currentTime;
	                            this._lastFrame = frameCount;
	                            try {
	                                gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
	                                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
	                                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.videoEl);
	                                this._lastFrame = this.videoEl.webkitDecodedFrameCount;
	                                this.videoTextureView.visible = true;

	                                this.videoTexture.options.w = this.videoEl.videoWidth;
	                                this.videoTexture.options.h = this.videoEl.videoHeight;
	                                const expectedAspectRatio = this.videoTextureView.w / this.videoTextureView.h;
	                                const realAspectRatio = this.videoEl.videoWidth / this.videoEl.videoHeight;
	                                if (expectedAspectRatio > realAspectRatio) {
	                                    this.videoTextureView.scaleX = (realAspectRatio / expectedAspectRatio);
	                                    this.videoTextureView.scaleY = 1;
	                                } else {
	                                    this.videoTextureView.scaleY = expectedAspectRatio / realAspectRatio;
	                                    this.videoTextureView.scaleX = 1;
	                                }
	                            } catch (e) {
	                                console.error('texImage2d video', e);
	                                this._stopUpdatingVideoTexture();
	                                this.videoTextureView.visible = false;
	                            }
	                            this.videoTexture.source.forceRenderUpdate();
	                        }
	                    }
	                };
	            }
	            if (!this._updatingVideoTexture) {
	                stage.on('frameStart', this._updateVideoTexture);
	                this._updatingVideoTexture = true;
	            }
	        }
	    }

	    _stopUpdatingVideoTexture() {
	        if (this.textureMode) {
	            const stage = this.stage;
	            stage.removeListener('frameStart', this._updateVideoTexture);
	            this._updatingVideoTexture = false;
	            this.videoTextureView.visible = false;

	            if (this.videoTexture.options.source) {
	                const gl = stage.gl;
	                gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
	                gl.clearColor(0, 0, 0, 1);
	                gl.clear(gl.COLOR_BUFFER_BIT);
	            }
	        }
	    }

	    updateSettings(settings = {}) {
	        // The Component that 'consumes' the media player.
	        this._consumer = settings.consumer;

	        if (this._consumer && this._consumer.getMediaplayerSettings) {
	            // Allow consumer to add settings.
	            settings = Object.assign(settings, this._consumer.getMediaplayerSettings());
	        }

	        if (!lng.Utils.equalValues(this._stream, settings.stream)) {
	            if (settings.stream && settings.stream.keySystem) {
	                navigator.requestMediaKeySystemAccess(settings.stream.keySystem.id, settings.stream.keySystem.config).then((keySystemAccess) => {
	                    return keySystemAccess.createMediaKeys();
	                }).then((createdMediaKeys) => {
	                    return this.videoEl.setMediaKeys(createdMediaKeys);
	                }).then(() => {
	                    if (settings.stream && settings.stream.src)
	                        this.open(settings.stream.src);
	                }).catch(() => {
	                    console.error('Failed to set up MediaKeys');
	                });
	            } else if (settings.stream && settings.stream.src) {
	                this.open(settings.stream.src);
	            } else {
	                this.close();
	            }
	            this._stream = settings.stream;
	        }

	        this._setHide(settings.hide);
	        this._setVideoArea(settings.videoPos);
	    }

	    _setHide(hide) {
	        if (this.textureMode) {
	            this.tag("Video").setSmooth('alpha', hide ? 0 : 1);
	        } else {
	            this.videoEl.style.visibility = hide ? 'hidden' : 'visible';
	        }
	    }

	    open(url) {
	        console.log('Playing stream', url);
	        if (this.application.noVideo) {
	            console.log('noVideo option set, so ignoring: ' + url);
	            return;
	        }
	        if (this.videoEl.getAttribute('src') === url) return this.reload();
	        this.videoEl.setAttribute('src', url);
	    }

	    close() {
	        // We need to pause first in order to stop sound.
	        this.videoEl.pause();
	        this.videoEl.removeAttribute('src');

	        // force load to reset everything without errors
	        this.videoEl.load();
	        this.fire('clearSrc');
	    }

	    playPause() {
	        if (this.isPlaying()) {
	            this.pause();
	        } else {
	            this.play();
	        }
	    }

	    play() {
	        this.videoEl.play();
	    }

	    reload() {
	        var url = this.videoEl.getAttribute('src');
	        this.close();
	        this.videoEl.src = url;
	    }

	    pause() {
	        this.videoEl.pause();
	    }

	    isPlaying() {
	        return (this.state === "Playing");
	    }

	    getPosition() {
	        return Promise.resolve(this.videoEl.currentTime);
	    }

	    setPosition(pos) {
	        this.videoEl.currentTime = pos;
	    }

	    getDuration() {
	        return Promise.resolve(this.videoEl.duration);
	    }

	    seek(time, absolute = false) {
	        if(absolute) {
	            this.videoEl.currentTime = time;
	        }
	        else {
	            this.videoEl.currentTime += time;
	        }
	    }

	    get videoTextureView() {
	        return this.tag("Video").tag("VideoTexture");
	    }

	    get videoTexture() {
	        return this.videoTextureView.texture;
	    }

	    _setVideoArea(videoPos) {
	        if (lng.Utils.equalValues(this._videoPos, videoPos)) {
	            return;
	        }

	        this._videoPos = videoPos;

	        if (this.textureMode) {
	            this.videoTextureView.patch({
	                smooth: {
	                    x: videoPos[0],
	                    y: videoPos[1],
	                    w: videoPos[2] - videoPos[0],
	                    h: videoPos[3] - videoPos[1]
	                }
	            });
	        } else {
	            const precision = this.stage.getRenderPrecision();
	            this.videoEl.style.left = Math.round(videoPos[0] * precision) + 'px';
	            this.videoEl.style.top = Math.round(videoPos[1] * precision) + 'px';
	            this.videoEl.style.width = Math.round((videoPos[2] - videoPos[0]) * precision) + 'px';
	            this.videoEl.style.height = Math.round((videoPos[3] - videoPos[1]) * precision) + 'px';
	        }
	    }

	    _fireConsumer(event, args) {
	        if (this._consumer) {
	            this._consumer.fire(event, args);
	        }
	    }

	    _equalInitData(buf1, buf2) {
	        if (!buf1 || !buf2) return false;
	        if (buf1.byteLength != buf2.byteLength) return false;
	        const dv1 = new Int8Array(buf1);
	        const dv2 = new Int8Array(buf2);
	        for (let i = 0 ; i != buf1.byteLength ; i++)
	            if (dv1[i] != dv2[i]) return false;
	        return true;
	    }

	    static _states() {
	        const p = Mediaplayer.prototype;
	        let previousInitData;
	        return {
	            _init: p._init,
	            Playing: {
	                _enter: p._startUpdatingVideoTexture,
	                _exit: p._stopUpdatingVideoTexture,
	                timeupdate: function () {
	                    this._fireConsumer('$mediaplayerProgress', {
	                        currentTime: this.videoEl.currentTime,
	                        duration: this.videoEl.duration || 1
	                    });
	                },
	                ended: function (args) {
	                    this._fireConsumer('$mediaplayerEnded', args);
	                    return "";
	                },
	                pause: function (args) {
	                    this._fireConsumer('$mediaplayerPause', args);
	                    return "Playing.Paused";
	                },
	                Paused: {},
	                clearSrc: function () {
	                    this._fireConsumer('$mediaplayerStop', {});
	                    return "";
	                }
	            },
	            error: function (args) {
	                this._fireConsumer('$mediaplayerError', args);
	                return "";
	            },
	            loadeddata: function (args) {
	                this._fireConsumer('$mediaplayerLoadedData', args);
	            },
	            play: function (args) {
	                this._fireConsumer('$mediaplayerPlay', args);
	            },
	            playing: function (args) {
	                this._fireConsumer('$mediaplayerPlaying', args);
	                return "Playing";
	            },
	            canplay: function (args) {
	                this.videoEl.play();
	                this._fireConsumer('$mediaplayerStart', args);
	            },
	            loadstart: function (args) {
	                this._fireConsumer('$mediaplayerLoad', args);
	            },
	            seeked: function (args) {
	                this._fireConsumer('$mediaplayerSeeked', {
	                    currentTime: this.videoEl.currentTime,
	                    duration: this.videoEl.duration || 1
	                });
	            },
	            seeking: function (args) {
	                this._fireConsumer('$mediaplayerSeeking', {
	                    currentTime: this.videoEl.currentTime,
	                    duration: this.videoEl.duration || 1
	                });
	            },
	            durationchange: function (args) {
	                this._fireConsumer('$mediaplayerDurationChange', args);
	            },
	            encrypted: function (args) {
	                const video = args.videoElement;
	                const event = args.event;
	                // FIXME: Double encrypted events need to be properly filtered by Gstreamer
	                if (video.mediaKeys && !this._equalInitData(previousInitData, event.initData)) {
	                    previousInitData = event.initData;
	                    this._fireConsumer('$mediaplayerEncrypted', args);
	                }
	            }
	        };
	    }

	}

	class Ui extends lng.Application {

	    static _template() {
	        return {
	            Mediaplayer: {type: Mediaplayer, textureMode: Ui.hasOption('texture')},
	            AppWrapper: {}
	        };
	    }

	    get mediaplayer() {
	        return this.tag("Mediaplayer");
	    }

	    startApp(v) {
	        this.fire("startApp", {def: v});
	    }

	    stopApp() {
	        this.fire("stopApp");
	    }

	    static _states() {
	        return {
	            startApp: "App.Loading",
	            stopApp: "",
	            App: {
	                Loading: {
	                    _enter: function({args: {def}}) {
	                        return this._startApp(def);
	                    },
	                    done: "App.Started"
	                },
	                Started: {
	                    _enter: function() {
	                        this.tag("AppWrapper").children = [{ref: "App", type: this._currentApp.type}];
	                    },
	                    _exit: function() {
	                        this.tag("AppWrapper").children = [];

	                        //@todo: remove app font faces from document.fonts.
	                    }
	                }
	            }
	        };
	    }

	    _startApp(v) {
	        this._currentApp = {
	            def: v,
	            type: v.getAppViewType(),
	            fontFaces: []
	        };

	        // Preload fonts.
	        const fonts = this._currentApp.type.getFonts();
	        const fontFaces = fonts.map(({family, url, descriptors}) => new FontFace(family, `url(${url})`, descriptors));
	        this._currentApp._fontFaces = fontFaces;
	        fontFaces.forEach(fontFace => {
	            document.fonts.add(fontFace);
	        });
	        Promise.all(fontFaces.map(ff => ff.load())).then(() => {
	            this.fire("done");
	        }).catch((e) => {
	            console.warn('Font loading issues: ' + e);
	            this.fire("done");
	        });
	    }

	    _getFocused() {
	        return this.tag("App");
	    }

	    _setFocusSettings(settings) {
	        settings.clearColor = this.stage.getOption('clearColor');
	        settings.mediaplayer = {
	            consumer: null,
	            stream: null,
	            hide: false,
	            videoPos: [0, 0, 1920, 1080]
	        };
	    }

	    _handleFocusSettings(settings) {
	        if (this._clearColor !== settings.clearColor) {
	            this._clearColor = settings.clearColor;
	            this.stage.setClearColor(settings.clearColor);
	        }

	        if (this.tag("Mediaplayer").attached) {
	            this.tag("Mediaplayer").updateSettings(settings.mediaplayer);
	        }
	    }

	    static getProxyUrl(url, opts = {}) {
	        return "//cdn.metrological.com/proxy" + this.getQueryString(url, opts);
	    }

	    static getImageUrl(url, opts = {}) {
	        return "//cdn.metrological.com/image" + this.getQueryString(url, opts);
	    }

	    static getQrUrl(url, opts = {}) {
	        return "//cdn.metrological.com/qr" + this.getQueryString(url, opts, "q");
	    }

	    static hasOption(name) {
	        return (document.location.href.indexOf(name) >= 0)
	    }

	    static getOption(name) {
	        return new URL(document.location.href).searchParams.get(name)
	    }

	    static getQueryString(url, opts, key = "url") {
	        let str = `?operator=${encodeURIComponent(this.getOption('operator') || 'metrological')}`;
	        const keys = Object.keys(opts);
	        keys.forEach(key => {
	            str += "&" + encodeURIComponent(key) + "=" + encodeURIComponent("" + opts[key]);
	        });
	        str += `&${key}=${encodeURIComponent(url)}`;
	        return str;
	    }


	}

	class AppDefinition extends lng.EventEmitter {

	    constructor(application) {
	        super();
	        this.application = application;
	    }

	    get identifier() {
	        const identifier = this.constructor.identifier;
	        if (!identifier) throw new Error("Application does not have an identifier: " + this.constructor.name);
	        return identifier;
	    }

	    getPath(relPath) {
	        return AppDefinition.getPath(this.constructor, relPath);
	    }

	    static getPath(relPath) {
	        return "apps/" + this.identifier + "/" + relPath;
	    }

	    static get identifier() {
	        throw new Error("Please supply an identifier in the App definition file.");
	    }

	    getAppViewType() {
	        throw new Error("Please specify the app view type.");
	    }

	}

	class App extends lng.Component {

	    static g(c) {
	        return c.seekAncestorByType(this);
	    }

	    /**
	     * Returns all fonts to be preloaded before entering this app.
	     * @returns {{family: string, url: string, descriptors: {}}[]}
	     */
	    static getFonts() {
	        return [];
	    }

	}

	class PlayerButton extends lng.Component {

	    static _template() {
	        const o = this.options;
	        return {
	            w: o.w, h: o.h,
	            Background: {x: -1, y: -1, texture: lng.Tools.getRoundRect(o.w, o.h, 4, 0, 0, true), color: o.colors.deselected},
	            Icon: {x: o.w/2, y: o.h/2, mount: 0.5, color: o.colors.selected}
	        };
	    }

	    set icon(source) {
	        this.tag("Icon").src = `static/tools/player/img/${source}`;
	    }

	    set active(v) {
	        this.alpha = v ? 1 : 0.3;
	    }

	    get active() {
	        return this.alpha === 1;
	    }

	    static _states() {
	        const o = this.options;
	        return {
	            Selected: {
	                _enter: function () {
	                    this.tag("Background").color = o.colors.selected;
	                    this.tag("Icon").color = o.colors.deselected;
	                },
	                _exit: function () {
	                    this.tag("Background").color = o.colors.deselected;
	                    this.tag("Icon").color = o.colors.selected;
	                },
	                _unfocus: ""
	            },
	            _focus: "Selected"
	        };
	    }

	    static get options() {
	        if (!this._options) {
	            this._options = this._buildOptions();
	        }
	        return this._options;
	    }

	    static _buildOptions() {
	        return {
	            colors: {
	                selected: 0xFFFFFFFF,
	                deselected: 0xFF606060
	            },
	            w: 60,
	            h: 60
	        };
	    }

	}

	class PlayerControls extends lng.Component {

	    static _template() {
	        return {
	            Buttons: {
	                Previous: {type: this.PlayerButton, icon: "prev.png"},
	                Play: {type: this.PlayerButton, icon: "play.png"},
	                Next: {type: this.PlayerButton, icon: "next.png"}
	            },
	            Title: {text: {fontSize: 46, lineHeight: 56, maxLines: 1, shadow: true}, y: 2}
	        };
	    }

	    static get PlayerButton() {
	        return PlayerButton;
	    }

	    showButtons(previous, next) {
	        const o = this.constructor.options;
	        let buttons = [];
	        if (previous) buttons.push("Previous");
	        buttons = buttons.concat(o.buttons);
	        if (next) buttons.push("Next");
	        this._setActiveButtons(buttons);
	    }

	    set title(title) {
	        this.tag("Title").text = title || "";
	    }

	    get _activeButtonIndex() {
	        let button = this.tag("Buttons").getByRef(this.state);
	        if (!button.active) {
	            button = this.tag("Play");
	        }
	        return this._activeButtons.indexOf(button);
	    }

	    get _activeButton() {
	        return this._activeButtons[this._activeButtonIndex];
	    }

	    _setActiveButtons(buttons) {
	        const o = this.constructor.options;

	        let x = 0;
	        this._activeButtons = [];
	        this.tag("Buttons").children.map(button => {
	            button.active = (buttons.indexOf(button.ref) !== -1);
	            button.x = x;
	            if (button.active) {
	                this._activeButtons.push(button);
	            }
	            x += button.renderWidth + o.margin;
	        });
	        this.tag("Title").x = x + 20;


	        this.fire('checkActiveButton');
	    }

	    set paused(value) {
	        this.fire(value ? 'paused' : 'playing');
	    }

	    static _states() {
	        const o = this.options;
	        const p = this.prototype;
	        return {
	            _setup: "Play",
	            _init: function () {
	                this.showButtons(false, false);
	                return "Play";
	            },
	            checkActiveButton: function () {
	                // After changing the active buttons, make sure that an active button is selected.
	                let index = this._activeButtonIndex;
	                if (index === -1) {
	                    if (this._index >= this._activeButtons.length) {
	                        this._index = this._activeButtons.length - 1;
	                    }
	                }
	                return this._activeButtons[index].ref;
	            },
	            _handleLeft: function () {
	                let index = this._activeButtonIndex;
	                if (index > 0) {
	                    index--;
	                }
	                return this._activeButtons[index].ref;
	            },
	            _handleRight: function () {
	                let index = this._activeButtonIndex;
	                if (index < this._activeButtons.length - 1) {
	                    index++;
	                }
	                return this._activeButtons[index].ref;
	            },
	            _handleEnter: function () {
	                this.signal('press' + this._activeButton.ref);
	            },
	            Previous: {},
	            Play: {},
	            Next: {},
	            paused: function () {
	                this.tag("Play").icon = "play.png";
	            },
	            playing: function () {
	                this.tag("Play").icon = "pause.png";
	            }
	        };
	    }

	    _getFocused() {
	        return this.tag(this.state);
	    }

	    static get options() {
	        if (!this._options) {
	            this._options = this._buildOptions();
	        }
	        return this._options;
	    }

	    static _buildOptions() {
	        return {
	            buttons: ["Play"],
	            margin: 10
	        };
	    }

	}

	class PlayerProgress extends lng.Component {

	    static _template() {
	        return {
	            Progress: {
	                forceZIndexContext: true,
	                Total: {
	                    x: -1, y: -1, texture: lng.Tools.getRoundRect(1720, 10, 4), color: 0xFF606060,
	                    Scroller: {
	                        x: 0, y: 6, mount: 0.5, w: 16, h: 16, zIndex: 2,
	                        Shadow: {
	                            texture: lng.Tools.getShadowRect(16, 16, 8),
	                            mount: 0.5,
	                            x: 8,
	                            y: 8,
	                            color: 0xFF000000
	                        },
	                        Main: {texture: lng.Tools.getRoundRect(16, 16, 8), mount: 0.5, x: 8, y: 8, color: 0xFFF1F1F1}
	                    }
	                },
	                Active: {x: -1, y: -1, color: 0xFFF1F1F1},
	                CurrentTime: {
	                    x: 0,
	                    y: 21,
	                    text: {fontSize: 28, lineHeight: 34, maxLines: 1, shadow: true, text: "00:00"}
	                },
	                Duration: {
	                    x: 1720,
	                    mountX: 1,
	                    y: 21,
	                    text: {fontSize: 28, lineHeight: 34, maxLines: 1, shadow: true, text: "00:00"}
	                }
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
	        const x = v * 1720;

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

	    _alter() {
	    }

	    static _states() {
	        return {
	            _setup: function() {
	                this._alter();
	            },
	            _init: function () {
	                this.tag("Active").texture = {
	                    type: lng.textures.SourceTexture,
	                    textureSource: this.tag("Total").texture.source
	                };
	            }
	        };
	    }

	}

	class Player extends lng.Component {

	    static _template() {
	        return {
	            Gradient: {
	                x: 0,
	                y: 1080,
	                h: 300,
	                w: 1920,
	                mountY: 1,
	                colorTop: 0x00101010,
	                colorBottom: 0xE6101010,
	                rect: true
	            },
	            Controls: {
	                x: 99,
	                y: 890,
	                type: this.PlayerControls,
	                signals: {pressPlay: true, pressPrevious: true, pressNext: true}
	            },
	            Progress: {x: 99, y: 970, type: this.PlayerProgress}
	        };
	    }

	    static get PlayerControls() {
	        return PlayerControls;
	    }

	    static get PlayerProgress() {
	        return PlayerProgress;
	    }

	    play(args) {
	        this.fire('play', args);
	        return !!this._stream;
	    }

	    _setItem(item) {
	        this.tag("Progress").setProgress(0, 0);
	        this._item = item;
	        this._stream = item.stream;
	        this.tag("Controls").title = item.title;

	        this._index = this._items.indexOf(item);
	        this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);

	        this.application.updateFocusSettings();
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

	    _setInterfaceTimeout() {
	        if (this._timeout) {
	            clearTimeout(this._timeout);
	        }
	        this._timeout = setTimeout(() => {
	            this.fire('hidden');
	        }, 8000);
	    }

	    static _states() {
	        return {
	            _init: "Controls",
	            _focus: function () {
	                this._setInterfaceTimeout();
	            },
	            _unfocus: function () {
	                clearTimeout(this._timeout);
	            },
	            $mediaplayerEnded: function () {
	                this.fire('pressNext');
	            },
	            play: function ({item, items}) {
	                this._items = items;
	                this._setItem(item);
	            },
	            pressPrevious: function () {
	                const index = this._index - 1;
	                if (index < 0) {
	                    this._index = this._items.length - 1;
	                }
	                this._setItem(this._items[index]);
	            },
	            pressNext: function () {
	                if (!this._items.length) {
	                    return this.signal('playerStop');
	                }
	                const index = (this._index + 1) % this._items.length;
	                this._setItem(this._items[index]);
	            },
	            pressPlay: function () {
	                this.application.mediaplayer.playPause();
	            },
	            $mediaplayerPause: function () {
	                this.tag("Controls").paused = true;
	            },
	            $mediaplayerPlay: function () {
	                this.tag("Controls").paused = false;
	            },
	            $mediaplayerStop: function () {
	                this.signal('playerStop');
	            },
	            $mediaplayerProgress: function ({currentTime, duration}) {
	                this.tag("Progress").setProgress(currentTime, duration);
	            },
	            _captureKey: function () {
	                this._setInterfaceTimeout();
	                return false;
	            },
	            hidden: "Hidden",
	            Hidden: {
	                _enter: function ({prevState}) {
	                    this._prevState = prevState;
	                    this.setSmooth('alpha', 0);
	                },
	                _exit: function () {
	                    this._setInterfaceTimeout();
	                    this.setSmooth('alpha', 1);
	                },
	                _captureKey: function() {
	                    return this._prevState
	                }
	            },
	            Controls: {
	            }
	        };
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

	const obj = {
	    Player,
	    PlayerButton,
	    PlayerControls,
	    PlayerProgress
	};

	class Light3dComponent extends lng.Component {

	    constructor(stage) {
	        super(stage);

	        this.patch({
	            __create: true,
	            Main: {
	                x: -1,
	                y: -1,
	                shader: {type: lng.shaders.Light3d, fudge: 0.3},
	                renderToTexture: true,
	                Wrapper: {
	                    x: 1,
	                    y: 1,
	                    clipping: true,
	                    Content: {}
	                }
	            }
	        });

	        this._shaderZ = 0;
	        this._shaderZ0 = 0;
	        this._shaderZ1 = 0;

	        this._shaderRx = 0;
	        this._shaderRx0 = 0;
	        this._shaderRx1 = 0;

	        this._shaderRy = 0;
	        this._shaderRy0 = 0;
	        this._shaderRy1 = 0;

	        this._focusedZ = -150;
	        this._createAnimations();

	        this.transition('lightShader.strength', {duration: 0.2});
	        this.transition('lightShader.ambient', {duration: 0.2});
	    }

	    get focusedZ() {
	        return this._focusedZ;
	    }

	    set focusedZ(v) {
	        this._focusedZ = v;
	        this._createAnimations();
	    }

	    _createAnimations() {
	        this._anims = {
	            neutral: this.animation({
	                duration: 0.4, actions: [
	                    {p: 'shaderZ0', merger: lng.StageUtils.mergeNumbers, v: {0: 0, 0.5: -140, 1: -150}}
	                ]
	            }),
	            left: this._createAnimation('x', -1, 0),
	            right: this._createAnimation('x', 1, 1),
	            up: this._createAnimation('y', -1, 0),
	            down: this._createAnimation('y', 1, 0)
	        };
	    }

	    _createAnimation(axis, sign, idx) {
	        return this.animation({
	            duration: 0.4, stopDuration: 0.2, actions: [
	                {p: 'shaderR' + axis + idx, merger: lng.StageUtils.mergeNumbers, v: {0: 0, 0.3: -0.20 * sign, 1: 0}},
	                {
	                    p: 'shaderZ' + idx,
	                    merger: lng.StageUtils.mergeNumbers,
	                    v: {0: 0, 0.5: this._focusedZ + 10, 1: this._focusedZ}
	                }
	            ]
	        });
	    }

	    set w(v) {
	        this.tag('Main').w = v + 2;
	        this.tag('Wrapper').w = v;
	    }

	    set h(v) {
	        this.tag('Main').h = v + 2;
	        this.tag('Wrapper').h = v;
	    }

	    get lightShader() {
	        return this.tag('Main').shader;
	    }

	    set lightShader(v) {
	        this.tag('Main').shader = v;
	    }

	    get content() {
	        return this.tag('Content');
	    }

	    set content(v) {
	        this.tag('Content').patch(v, true);
	    }

	    _recalc() {
	        this.tag('Main').shader.rx = this._shaderRx0 + this._shaderRx1 + this._shaderRx;
	        this.tag('Main').shader.ry = this._shaderRy0 + this._shaderRy1 + this._shaderRy;
	        this.tag('Main').shader.z = this._shaderZ0 + this._shaderZ1 + this._shaderZ;
	        this.tag('Main').shader.pivotZ = this._shaderZ0 + this._shaderZ1 + this._shaderZ;
	    }

	    get shaderZ() {
	        return this._shaderZ;
	    }

	    set shaderZ(v) {
	        this._shaderZ = v;
	        this._recalc();
	    }

	    get shaderZ0() {
	        return this._shaderZ0;
	    }

	    set shaderZ0(v) {
	        this._shaderZ0 = v;
	        this._recalc();
	    }

	    get shaderZ1() {
	        return this._shaderZ1;
	    }

	    set shaderZ1(v) {
	        this._shaderZ1 = v;
	        this._recalc();
	    }

	    get shaderRx() {
	        return this._shaderRx;
	    }

	    set shaderRx(v) {
	        this._shaderRx = v;
	        this._recalc();
	    }

	    get shaderRx0() {
	        return this._shaderRx0;
	    }

	    set shaderRx0(v) {
	        this._shaderRx0 = v;
	        this._recalc();
	    }

	    get shaderRx1() {
	        return this._shaderRx1;
	    }

	    set shaderRx1(v) {
	        this._shaderRx1 = v;
	        this._recalc();
	    }

	    get shaderRy() {
	        return this._shaderRy;
	    }

	    set shaderRy(v) {
	        this._shaderRy = v;
	        this._recalc();
	    }

	    get shaderRy0() {
	        return this._shaderRy0;
	    }

	    set shaderRy0(v) {
	        this._shaderRy0 = v;
	        this._recalc();
	    }

	    get shaderRy1() {
	        return this._shaderRy1;
	    }

	    set shaderRy1(v) {
	        this._shaderRy1 = v;
	        this._recalc();
	    }

	    leftEnter() {
	        this._anims['left'].start();
	        this._enable3dShader();
	    }

	    leftExit() {
	        this.neutralExit();
	    }

	    rightEnter() {
	        this._anims['right'].start();
	        this._enable3dShader();
	    }

	    rightExit() {
	        this.neutralExit();
	    }

	    upEnter() {
	        this._anims['up'].start();
	        this._enable3dShader();
	    }

	    upExit() {
	        this.neutralExit();
	    }

	    downEnter() {
	        this._anims['down'].start();
	        this._enable3dShader();
	    }

	    downExit() {
	        this.neutralExit();
	    }

	    neutralEnter() {
	        this._anims['neutral'].start();
	        this._enable3dShader();
	    }

	    neutralExit() {
	        this._anims['up'].stop();
	        this._anims['down'].stop();
	        this._anims['left'].stop();
	        this._anims['right'].stop();
	        this._anims['neutral'].stop();
	        this._disable3dShader();
	    }

	    _enable3dShader() {
	        this.patch({smooth: {'lightShader.strength': 0.4, 'lightShader.ambient': 0.6}});
	    }

	    _disable3dShader() {
	        this.patch({smooth: {'lightShader.strength': 0, 'lightShader.ambient': 1}});
	    }


	}

	const obj$1 = {
	    Light3dComponent
	};

	const tools = {
	    player: obj,
	    effects: obj$1
	};

	// Exposes the ux namespace for apps.

	const ux$1 = {
	    Ui,
	    AppDefinition,
	    App,
	    tools
	};

	window.ux = ux$1;

	// Code information / notes:
	//
	// Loading images in block or brick format:
	// http://cdn-profiles.tunein.com/s25876/images/logoq.jpg?t=1   <=== Default  (logoq.jpg?t=1)
	// http://cdn-profiles.tunein.com/s25876/images/brickg.jpg?t=1  <=== Brick  (brickg.jpg?t=1)
	//
	// Fetch audio streams based on guideId:
	// https://opml.radiotime.com/Tune.ashx?id=${guideId}&render=json&formats=mp3,hls

	class Api{
		constructor(lang){
			this._language = lang || 'en';
			this._locale = 'en-NL';
			this._geoData = {
				latitude: 0,
				longitude: 0,
				suffix: ''
			};
			this._dataExclusives = null;
			this._dataLocalStations = null;
			this._dataBrowseMenu = null;
			this._affix = {
				tuneInConversation: 'http://opml.radiotime.com/Tune.ashx?c=pbrowse&id=p1011712&formats=mp3&partnerId=M2t9wS30',
				menu: 'http://37.153.110.197/?url=http://opml.radiotime.com/Browse.ashx?&formats=mp3&partnerId=M2t9wS30',
				local: 'http://opml.radiotime.com/Browse.ashx?c=local&formats=mp3&partnerId=M2t9wS30',
				changeData: 'http://37.153.110.197/?url=http://opml.radiotime.com/Describe.ashx?c=composite&detail=listing&partnerId=M2t9wS30&id=',
				related: 'http://opml.radiotime.com/Browse.ashx?formats=mp3&partnerId=M2t9wS30&id=',
				search: 'http://opml.radiotime.com/Search.ashx?formats=mp3&filter=standard&partnerId=M2t9wS30&query=',
				login: 'https://opml.radiotime.com/Account.ashx?c=auth&partnerId=M2t9wS30',
				getFavorites: 'http://opml.radiotime.com/Browse.ashx?c=presets&partnerId=M2t9wS30',
				addFavorite: 'http://opml.radiotime.com/Preset.ashx?c=add&id=',
				removeFavorite: 'http://opml.radiotime.com/Preset.ashx?c=remove&id='
			};
			this._isLoggedIn = false;
			this._account = null;
			this._favorites = [];
			//this._favoritesPending = [];
			this._recentlyViewed = [];
			this._audioIsPlaying = false;
		}

		set language(v){
			this._language = v;
		}

		get language(){
			return this._language;
		}

		set account(v){
			this._account = v;
		}

		get account(){
			return this._account;
		}

		get isLoggedIn(){
			return this._isLoggedIn;
		}

		set isLoggedIn(v){
			this._isLoggedIn = v;
		}

		set audioIsPlaying(v){
			this._audioIsPlaying = v;
		}

		get audioIsPlaying(){
			return this._audioIsPlaying;
		}

		set recentlyViewed(v){
			let exist = false;

			this._recentlyViewed.map((recent)=>{
				if(recent.url === v.url) exist = true;
			});

			if(!exist){
				if(this._recentlyViewed.length >= 3){
					this._recentlyViewed.shift();
					this._recentlyViewed.push(v);
				}else{
					this._recentlyViewed.push(v);
				}
			}
		}

		get recentlyViewed(){
			return this._recentlyViewed;
		}

		get dataExclusives(){
			return this._dataExclusives;
		}

		get dataLocalStations(){
			return this._dataLocalStations;
		}

		get dataBrowseMenu(){
			return this._dataBrowseMenu;
		}

		set favorites(v){
			this._favorites = v;
		}

		get favorites(){
			return this._favorites;
		}

		initialize(){
			let initPromises = [
				Promise.resolve(this.getGeoSuffix()),
				Promise.resolve(this.loadExclusives()),
				Promise.resolve(this.loadLocalStations(3)),
				Promise.resolve(this.loadBrowseMenu())
			];

			return Promise.all(initPromises).then((v)=>{
				if(v.includes(null)){
					return this.retryLastCall('initialize');
				}else{
					this._geoData = {
						latitude: v[0].geo.ll[0],
						longitude: v[0].geo.ll[1],
						suffix: `&serial=7196e82541840bacbcb4f7b694320741&version=2.7&locale=${this._locale}&latlon=${v[0].geo.ll[0]},${v[0].geo.ll[1]}`
					};
					this._dataExclusives = v[1];
					this._dataLocalStations = v[2];
					this._dataBrowseMenu = v[3];
					return true;
				}
			}).catch(()=>{
				return this.retryLastCall('initialize');
			});
		}

		retryLastCall(callName, att){
			const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
			if(callName !== this._lastFailedCall){
				this._lastFailedCall = callName;
				this._callRetries = 0;
				this._callRetries ++;
			}else{
				this._callRetries ++;
			}
			if(this._callRetries <= 2){
				return delay(2000).then(()=>{return this[callName].apply(this, att)});
			}else{
				this._callRetries = 0;
				return null;
			}
		}

		login(credentials){
			this._currentUser = credentials.userName;
			const url = ux$1.Ui.getProxyUrl(`${this._affix.login}&username=${credentials.userName}&password=${credentials.passWord}`);
			return fetch(url).then((data) => data.text()).then((data)=>{
				let status = Api.xml2json(Api.stringToXml(data)).opml.head.status['#text'];
				let jsonData = Api.xml2json(Api.stringToXml(data)).opml.body.outline;
				let sortData = [];
				if(status === '200'){
					if(jsonData){
						jsonData.map((item)=>{
							if(item.account){
								Object.keys(item.account).map((accountItem)=>{
									if(accountItem !== '#text') sortData[accountItem] = item.account[accountItem]['#text'];
								});
							}else if(item.guide_id){
								sortData.guideId = item.guide_id;
							}else if(item.image){
								sortData.image = item.image;
							}
						});
						sortData.passWord = credentials.passWord;
						this.account = new LinkAsset$1(sortData);
						this.isLoggedIn = true;
						this.loadFavorites();
						return this.account;
					}else{
						this.isLoggedIn = false;
						return 'error';
					}
				}else{
					this.isLoggedIn = false;
					return 'error';
				}
			});
		}

		logout(){
			this.account = null;
			this.isLoggedIn = false;
			this._currentUser = '';
		}

		//Load favorites locally, server-side is unpredictable.
		loadFavorites(){
			if(this._currentUser && this.isLoggedIn && localStorage[`TuneInFavorites${this._currentUser}`] && localStorage[`TuneInFavorites${this._currentUser}`].length){
				let loadedFavorites = JSON.parse(localStorage.getItem(`TuneInFavorites${this._currentUser}`));
				this.favorites = loadedFavorites.map((item)=>{
					return new StationAsset(item);
				});
				return this.favorites;
			}else{
				return this.favorites;
			}

			// --- Keep load favorites server-side for future reference ---
			// this.favorites = [];
			// let newFavorites = [];
			// const url = ux.Ui.getProxyUrl(`${this._affix.getFavorites}&username=${this.account.userName}`);
			// return fetch(url).then((data) => data.text()).then((data)=>{
			// 	let jsonData = Api.xml2json(Api.stringToXml(data)).opml.body.outline;
			// 	jsonData.forEach((station)=>{
			// 		newFavorites.push(new StationAsset(station));
			// 	});
			// 	if(this._favoritesPending && this._favoritesPending.length){
			// 		this._favoritesPending.some((value, idx)=>{
			// 			if(newFavorites && newFavorites.length){
			// 				newFavorites.some((e)=>{
			// 					if(e.guideId === value){
			// 						this._favoritesPending.splice(idx, 1);
			// 					}
			// 				})
			// 			}
			// 		});
			// 	}
			// 	console.log('pending: ', this._favoritesPending);
			// 	console.log('favs: ', newFavorites);
			// 	this.favorites = newFavorites;
			// 	return this.favorites;
			// })
		}

		//Add favorite locally and server-side
		addFavorite(station){
			if(!this.checkIfExistInFavorites(station)){
				this.favorites.push(station);
			}
			if(this._currentUser && this.isLoggedIn){
				localStorage.setItem(`TuneInFavorites${this._currentUser}`, JSON.stringify(this.favorites));
			}
			let callResponseStatus = null;
			const url = ux$1.Ui.getProxyUrl(`${this._affix.addFavorite}${station.guideId}&partnerId=M2t9wS30&username=${this.account.userName}&password=${this.account.passWord}`);
			return fetch(url, {method: "POST",  headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}).then((data) => data.text()).then((data)=>{
				callResponseStatus = Api.xml2json(Api.stringToXml(data)).opml.head.status['#text'];
			});
		}

		//Remove favorite locally and server-side
		removeFavorite(station){
			this.favorites.forEach((fav, idx)=>{
				if(fav.guideId === station.guideId){
					this.favorites.splice(idx, 1);
				}
			});
			if(this._currentUser && this.isLoggedIn){
				localStorage.setItem(`TuneInFavorites${this._currentUser}`, JSON.stringify(this.favorites));
			}
			let callResponseStatus = null;
			const url = ux$1.Ui.getProxyUrl(`${this._affix.removeFavorite}${station.guideId}&partnerId=M2t9wS30&username=${this.account.userName}&password=${this.account.passWord}`);
			return fetch(url, {method: "POST",  headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}).then((data) => data.text()).then((data)=>{
				callResponseStatus = Api.xml2json(Api.stringToXml(data)).opml.head.status['#text'];
			});
		}

		checkIfExistInFavorites(station){
			let favAvailable = false;
			this.favorites.forEach((fav)=>{
				if(fav.guideId === station.guideId){
					favAvailable = true;
				}
			});
			return favAvailable;
		}

		loadStream(url, guideId){
			const uri = ux$1.Ui.getProxyUrl(`https://opml.radiotime.com/Tune.ashx?id=${guideId}&render=json&formats=mp3,hls`);
			return fetch(uri).then((data) => data.json()).then((data)=>{
				let streamReturnUrl = '';
				let reliability = 0;
				if(data.body.length > 1){
					data.body.forEach((station)=>{
						if(station.reliability > reliability){
							reliability = station.reliability;
							streamReturnUrl = station.url;
						}
					});
					if(streamReturnUrl === '') streamReturnUrl = data.body[0].url;
				}else{
					streamReturnUrl = data.body[0].url;
				}
				return streamReturnUrl;
			}).catch(()=>{
				return this.retryLastCall('loadStream', [url, guideId]);
			});
		}

		getGeoSuffix(){
			const url = ux$1.Ui.getProxyUrl('http://jsonip.metrological.com/?maf=true');
			return fetch(url).then((data) => {
				return data.json();
			}).catch(()=>{
				return null;
			});
		}

		loadExclusives(){
			let tuneInConversation = [];
			const url = ux$1.Ui.getProxyUrl(`${this._affix.tuneInConversation}`);
			return fetch(url).then((data) => data.text()).then((data)=>{
				let jsonData = Api.xml2json(Api.stringToXml(data)).opml.body.outline.outline;
				jsonData.map((station)=>{
					let imgLink = station.image;
					station.image = imgLink.replace('logoq.jpg', 'brickg.jpg');
					tuneInConversation.push(new StationAsset(station));
				});
				return tuneInConversation;
			}).catch(()=>{
				return null;
			});
		}

		loadBrowseMenu(){
			let composedData = {
				key: '',
				text: '',
				links: [],
				stations: []
			};
			const url = ux$1.Ui.getProxyUrl(this._affix.menu + this._geoData.suffix);
			return fetch(url).then((data) => data.json()).then((data) => {
				data.opml.body.outline.forEach((bItem)=>{
					composedData.links.push(new LinkAsset(bItem));
				});
				return new CategoryAsset(composedData.links);
			}).catch(()=>{
				return null;
			});
		}


		getAsset(item){
			const typeConsideredLink = ['link'];
			const typeConsideredStation = ['audio'];
			const typeConsideredMessage = ['text'];
			const itemConsideredLink = ['show'];
			const itemConsideredStation = ['station','topic'];
			let typeAvailable = !!(item && item.type);
			let itemAvailable = !!(item && item.item);

			if(typeAvailable && itemAvailable){
				if(typeConsideredLink.includes(item.type) && itemConsideredLink.includes(item.item)){
					return new LinkAsset(item);
				}else if(typeConsideredStation.includes(item.type) && itemConsideredStation.includes(item.item)){
					return new StationAsset(item);
				}
			}else if(typeAvailable && !itemAvailable){
				if(typeConsideredMessage.includes(item.type)){
					return new MessageAsset(item);
				}else if(typeConsideredLink.includes(item.type)){
					return new LinkAsset(item);
				}
			}else if(!typeAvailable && !itemAvailable){
				if(item.outline){
					return new CategoryAsset(item);
				}
			}
		}


		loadBrowseLink(url, title){
			const callUrl = ux$1.Ui.getProxyUrl(`${url}&formats=mp3&partnerId=M2t9wS30${this._geoData.suffix}`);
			return fetch(callUrl).then((data)=> data.text()).then((data)=>{
				let selectedTitle = title || '';
				let jsonData = (Api.xml2json(Api.stringToXml(data)).opml && Api.xml2json(Api.stringToXml(data)).opml.body && Api.xml2json(Api.stringToXml(data)).opml.body.outline)?Api.xml2json(Api.stringToXml(data)).opml.body.outline:[];
				let categories = [];
				let other = [];

				if(jsonData.length){
					jsonData.forEach((item)=>{
						if(item && item.outline){
							categories.push(this.getAsset(item));
						}else{
							other.push(item);
						}
					});
					if(other && other.length){
						let miscCategory = {
							key: selectedTitle || 'Miscellaneous',
							outline: other || null,
							text: selectedTitle || 'Miscellaneous'
						};
						categories.push(new CategoryAsset(miscCategory));
					}
					return categories;
				}else{
					categories.push(new CategoryAsset(jsonData));
					return categories;
				}
			}).catch(()=>{
				return this.retryLastCall('loadBrowseLink', [url, title]);
			});
		}


		loadLocalStations(maxResults){
			let resultsCounted = 0;
			let localResults = [];
			const url = ux$1.Ui.getProxyUrl(`http://37.153.110.197/?url=${encodeURIComponent(this._affix.local + this._geoData.suffix)}`);
			return fetch(url).then((data) => data.json()).then((data) => {
				if(data.opml.body.outline && data.opml.body.outline.outline && data.opml.body.outline.outline.length) data.opml.body.outline.outline.map((item)=>{
					//if(item.outline && item.outline.length) item.outline.map((station)=>{
						if(item.type === 'audio' && resultsCounted < maxResults) localResults.push(new StationAsset(item));
						resultsCounted ++;
					//});
				});
				return localResults;
			}).catch(()=>{
				return null;
			});
		}


		// Add to home page when no recents are available???
		// loadLocalStations(){
		// 	fetch(this._affix.local + this._geoData.suffix).then((data) => data.json()).then((data) => {
		// 		this._data.localRadio = {
		// 			groupUrl: data.opml.body.outline[1].URL,
		// 			groupKey: data.opml.body.outline[1].key,
		// 			groupText: data.opml.body.outline[1].text,
		// 			groupType: data.opml.body.outline[1].type,
		// 			stationsKey: data.opml.body.outline[0].key,
		// 			stationsText: data.opml.body.outline[0].text,
		// 			stations: data.opml.body.outline[0].outline
		// 		};
		// 	});
		// 	//this.loadSearchedParams('TuneIn Conversation');
		// 	//this.loadRelatedStations('s77676');
		// 	//this.loadStream('s77676');
		// }


		loadRelatedStations(relatedId, maxResults){
			let resultsCounted = 0;
			let relatedResults = [];
			const url = ux$1.Ui.getProxyUrl(`http://37.153.110.197/?url=${encodeURIComponent(this._affix.related + relatedId + this._geoData.suffix)}`);
			return fetch(url).then((data) => data.json()).then((data) => {
				if(data.opml.body.outline && data.opml.body.outline.length) data.opml.body.outline.map((item)=>{
					if(item.outline && item.outline.length) item.outline.map((station)=>{
						if(station.type === 'audio' && resultsCounted < maxResults) relatedResults.push(new StationAsset(station));
						resultsCounted ++;
					});
				});
				return relatedResults;
			});
		}

		loadSearchedParams(searchParams, maxResults){
			let resultsCounted = 0;
			let searchResults = [];
			const url = ux$1.Ui.getProxyUrl(`http://37.153.110.197/?url=${encodeURIComponent(this._affix.search + searchParams + this._geoData.suffix)}`);
			return fetch(url).then((data) => data.json()).then((data) => {
				if(data.opml.body.outline.length) data.opml.body.outline.map((item)=>{
					if(maxResults){
						if(item.type === 'audio' && resultsCounted < maxResults) searchResults.push(new StationAsset(item));
						resultsCounted++;
					}else{
						if(item.type === 'audio') searchResults.push(new StationAsset(item));
					}
				});
				return searchResults;
			});
		}

		static stringToXml(value){
			let parser = new window.DOMParser();
			return parser.parseFromString(value, "text/xml");
		}

		static xml2json(xml) {
			// Create the return object
			let obj = {};
			if(xml.nodeType == 1){ // element
				// do attributes
				if(xml.attributes.length > 0){
					obj = {};
					for(let j = 0; j < xml.attributes.length; j++){
						let attribute = xml.attributes.item(j);
						obj[attribute.nodeName] = attribute.nodeValue;
					}
				}
			}else if(xml.nodeType == 3){ // text
				obj = xml.nodeValue;
			}

			// do children
			if(xml.hasChildNodes()){
				for(let i = 0; i < xml.childNodes.length; i++){
					let item = xml.childNodes.item(i);
					let nodeName = item.nodeName;
					if(typeof(obj[nodeName]) == "undefined"){
						obj[nodeName] = Api.xml2json(item);
					}else{
						if(typeof(obj[nodeName].push) == "undefined"){
							let old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(Api.xml2json(item));
					}
				}
			}
			return obj;
		}
	}

	class WelcomeMenu extends lng.Component{

		static _template(){
			return {
				alpha: 1, rect: true, w: 1920, h: 1080, x: 0, y: 0, color: 0xFF242843,
				SpashImage: { alpha: 1, src: AppDefinition$1.getPath('images/splashBackground.png') }
			};
		}

		_getFocused(){

		}

		static _states(){
			return {
				_init: function(){

				}
			};
		}
	}

	class MainMenuButton extends lng.Component{
		static _template(){
			return {
				 x: 0, y: 0, h: 100, mountX: 0, mountY: 1, alpha: 1, text:{ text: 'HOME', fontSize: 56, color: 0xFFF1F1F1, textAlign: 'center', fontFace: 'RobotoCondensedBold'}
			};
		}

		set data(v){
			this._data = v;
			this.patch({ text:{ text: v.name.toUpperCase() }});
		}

		get data(){
			return this._data;
		}

		set isSelected(v){
			this._isSelected = v;
		}

		get isSelected(){
			return this._isSelected;
		}

		static _states(){
			return {
				_handleEnter(){
					this.signal('onMenuItemSelect', this.data, true);
				}
			};
		}
	}

	class MainMenu extends lng.Component{
		static _template(){
			return {
				Menu: { alpha: 1, w: 950, h: 100, x: 0, y: 120 }
			};
		}

		getWidthOfTag(tagName){
			let tx = this.tag(tagName);
			tx.loadTexture();
			return Math.round(tx.renderWidth);
		}

		get focusIndex(){
			return this._focusIndex;
		}

		set focusIndex(v){
			this._focusIndex = v;
		}

		buildMenu(){
			this.tag('Menu').children = this._menuOrder.map((item, idx)=>{
				return { x: idx * 200, y: 0, ref: item, type: MainMenuButton, data:{ name: item }, signals:{ onMenuItemSelect: true }};
			});
		}

		setMenuToSelectedTopicName(topicName){
			let posX = 0;
			let spacing = 0;
			let topicIdx = this._menuOrder.indexOf(topicName);
			this.tag('Menu').children[topicIdx].isSelected = true;
			this.tag('Menu').children[topicIdx].patch({ scale: 1.3 });
			this._menuOrder.forEach((menuItem, idx)=>{
				if(idx !== topicIdx){
					this.tag('Menu').children[idx].patch({ scale: 1 });
				}
				spacing = (idx === topicIdx || idx === topicIdx +1)?85:45;
				posX = (idx === 0)?0:(this.tag('Menu').children[idx -1].x + this.getWidthOfTag(this.tag('Menu').children[idx -1].ref) + spacing);
				this.tag('Menu').children[idx].patch({ x: posX, color: (idx === topicIdx)?0xFFF1F1F1:0xFF868897});
				if(idx !== topicIdx){
					this.tag('Menu').children[idx].isSelected = false;
				}
			});
			this.focusIndex = 1;
			this._activeMenuItem = this._menuOrder[this.focusIndex];
			if(topicName === 'Home'){
				this.tag('Menu').patch({ x: 20 });
			}else{
				this.tag('Menu').patch({ x: 0 });
			}
		}

		onMenuItemFocus(idx){
			this.tag('Menu').children.forEach((menuItem, menuIndex)=>{
				if(idx === menuIndex){
					menuItem.patch({ color: 0xFF14D8CC});
				}else{
					menuItem.patch({ color: 0xFFF1F1F1});
				}
			});
		}

		_getFocused(){
			return this.activeButton;
		}

		get activeButton(){
			return this.tag(this._activeMenuItem);
		}

		static _states(){
			return {
				_init: function(){
					let self = this;
					self._menuOrder = ['Home', 'Profile', 'Browse', 'Search'];
					self.buildMenu();
					self.setMenuToSelectedTopicName('Home');
					self._activeMenuItem = self._menuOrder[1];
					self.focusIndex = 1;
					return 'Menu';
				},
				_focus(){
					this.tag('Menu').children.forEach((menuItem)=>{
						menuItem.patch({ color: 0xFFF1F1F1});
					});
					this.onMenuItemFocus(this.focusIndex);
				},
				_unfocus(){
					this.tag('Menu').children.forEach((menuItem)=>{
						if(!menuItem.isSelected){
							menuItem.patch({ color: 0xFF868897});
						}else{
							menuItem.patch({ color: 0xFFF1F1F1});
						}
					});
				},
				Menu:{
					onMenuItemSelect(v){
						this.setMenuToSelectedTopicName(v.name);
						this.signal('menuItemSelected', {name: v.name});
					},
					_handleUp(){
						this.signal('mainMenuExitUp');
					},
					_handleLeft(){
						if(this.focusIndex > 0){
							this.focusIndex --;
						}
						this._activeMenuItem = this._menuOrder[this.focusIndex];
						this.onMenuItemFocus(this.focusIndex);
					},
					_handleRight(){
						if(this.focusIndex < this._menuOrder.length -1){
							this.focusIndex ++;
						}else{
							this.signal('mainMenuExitRight');
						}
						this._activeMenuItem = this._menuOrder[this.focusIndex];
						this.onMenuItemFocus(this.focusIndex);
					}
				}
			};
		}
	}

	class ExclusivesButton extends lng.Component{
		static _template(){
			return { alpha: 1, x: 0, y: 0, w: 600, h: 307, rect: true, color: 0xFF242843,
				DropShadow:{alpha: 0.1, x: -8, y: -8, w: 616, h: 323, rect: true, color: 0xFF000000, texture: lng.Tools.getShadowRect(616, 323, 8, 2)},
				Background:{ alpha: 1, x: 0, y: 0, w: 600, h: 307, rect: true, color: 0xFF242843 },
				Image: { alpha: 0.0001, x: 0, y: 0, w: 600, h: 307, src: AppDefinition$1.getPath('images/missingImage.png'), type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0x0014D8CC }
			};
		}

		get item(){
			return this._item;
		}

		set item(v){
			this._item = v;
			this.patch({
				Image: { src: ux.Ui.getImageUrl(v.image, { width: 600, height: 307, type: 'crop'})}
			});
			this.tag('Image').on('txLoaded', ()=>{
				this.patch({ Image: { smooth:{ alpha: [1, { duration: 1.5 } ]} }});
			});
			this.tag('Image').on('txError', ()=>{
				this.patch({ Image: { alpha: 1, src: AppDefinition$1.getPath('images/missingImage.png') }});
			});
		}

		set Image(v){
			this.patch({
				Image:{ src: AppDefinition$1.getPath(v)}
			});
		}

		static _states(){
			return {
				_focus(){
					this.patch({ Image:{ smooth:{scale: 1.1, colorBorder: 0xFF14D8CC }}, Background:{scale: 1.1} });
				},
				_unfocus(){
					this.patch({ Image:{ smooth:{scale: 1, colorBorder: 0x0014D8CC }}, Background:{scale: 1} });
				}
			};
		}
	}

	class ExclusivesList extends lng.Component{
		static _template(){
			return { x: 0, y: 0,
				Label: { x: 20, y: 0, w: 1400, alpha: 1, color: 0xFFF1F1F1, text:{ text: 'TuneIn Music Exclusives', fontSize: 38, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 80, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 1400 }},
				ExclusivesList: { x: 20, y: 85, w: 1435, h: 650, clipbox: false }
			};
		}

		set data(v){
			this.tag('ExclusivesList').children = v.map((station, idx) => {
				return { type: ExclusivesButton, item: station, x: idx * 648,  y: 0 };
			});
		}

		get data(){
			return this.tag('ExclusivesList').children;
		}

		set label(v){
			this._label = v;
			this.tag('Label').patch({ text: { text: v }});
		}

		get label(){
			return this._label;
		}

		get active(){
			return this.tag("ExclusivesList").children[this._index];
		}

		get list(){
			return this.tag("ExclusivesList").children
		}

		resetIndex(){
			this._index = 0;
			this._posX = 20;
			this.fire('select',{ index: 0 });
			this.patch({ ExclusivesList:{ smooth: {x: 20}} });
		}

		select(index){
			this.fire("select",{index});
		}

		_getFocused(){
			switch(this.state){
				case 'ExclusivesList':
					return this.active;
			}
		}

		static _states(){
			return {
				_init(){
					this._index = 0;
					this._posX = 20;
				},
				_focus(){
					return 'ExclusivesList';
				},
				ExclusivesList:{
					_enter(){
						this.resetIndex();
					},
					_focus(){
						this.resetIndex();
						this.tag('Label').patch({ color: 0xFFF1F1F1 });
					},
					_unfocus(){
						this.patch({
							Label:{ color: 0xFF868897 },
							ExclusivesList: { smooth: { x: 20 }}
						});
					},
					select({index}){
						this._index = index;
					},
					_handleEnter(){
						this.signal('onExclusiveSelectGoToPlayer', { item: this.active.item } );
					},
					_handleBack(){
						this.resetIndex();
					},
					_handleRight(){
						if(this._index < this.list.length -1){
							if(this._index < 2 && this._index % 2 === 1){
								this._posX -= 648;
								this.patch({ExclusivesList: { smooth: {x: this._posX }}});
							}else if(this._index >= 2){
								this._posX -= 648;
								this.patch({ExclusivesList: { smooth: {x: this._posX }}});
							}
							this.fire("select",{ index: this._index + 1 });
						}
					},
					_handleLeft(){
						if(this._index > 0){
							if(this._index >= 2 && this._index % 1 === 0){
								this._posX += 648;
								this.patch({ExclusivesList: {smooth: {x: this._posX}}});
							}else if(this._index === 0 && this._index % 1 === 0){
								this._posX += 648;
								this.patch({ExclusivesList: {smooth: {x: this._posX}}});
							}
							this.fire("select",{ index:this._index - 1 });
						}
					},
					_handleUp(){
						this.signal('exclusivesListExitUp');
					}
				}
			};
		}
	}

	class FadeOutPosXShader extends lng.shaders.WebGLDefaultShader {
		constructor(context) {
			super(context);
			// The render coords position at which the fade out should be complete.
			this._posX = 50;
			this._fadeWidth = 20;
		}

		setupUniforms(operation) {
			super.setupUniforms(operation);
			this._setUniform("fadeWidth", this._fadeWidth, this.gl.uniform1f);
			this._setUniform("posX", this._posX - this._fadeWidth, this.gl.uniform1f);
		}

		get posX() {
			return this._posX
		}

		set posX(v) {
			this._posX = v;
			this.redraw();
		}

		get fadeWidth() {
			return this._fadeWidth;
		}

		set fadeWidth(v) {
			this._fadeWidth = v;
			this.redraw();
		}
	}

	FadeOutPosXShader.vertexShaderSource = `
    #ifdef GL_ES
    precision lowp float;
    #endif
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aColor;
    uniform vec2 projection;
    varying vec2 vTextureCoord;
    varying vec4 vColor;
    uniform float posX;
    uniform float fadeWidth;
    varying float opacity;
    void main(void){
        opacity = (posX - aVertexPosition.x) / fadeWidth;
        if (opacity < 1.0 && opacity > 0.0) opacity = 1.0;
        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
        vColor = aColor;
        gl_Position.y = -sign(projection.y) * gl_Position.y;
    }
`;

	FadeOutPosXShader.fragmentShaderSource = `
    #ifdef GL_ES
    precision lowp float;
    #endif
    varying vec2 vTextureCoord;
    varying vec4 vColor;
    varying float opacity;
    uniform sampler2D uSampler;
    void main(void){
        gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * min(1.0, opacity);
    }
`;

	class ScrollingText extends lng.Component{
		static _template(){
			return {
				clipping: true, w: 320, h: 100,
				ScrollingText: { x: 10,
					w: 320, h: 40, clipbox: false,
					LabelA: { alpha: 1, x: 0, y: 0, w: 0, h: 0, text: { text: '', fontSize: 36, textAlign: 'left', fontFace: 'RobotoBold', lineHeight: 42, wordWrap: false } },
					LabelB: { alpha: 0, x: 0, y: 0, w: 0, h: 0, text: { text: '', fontSize: 36, textAlign: 'left', fontFace: 'RobotoBold', lineHeight: 42, wordWrap: false } },
					LabelC: { alpha: 0, x: 0, y: 0, w: 0, h: 0, text: { text: '', fontSize: 36, textAlign: 'left', fontFace: 'RobotoBold', lineHeight: 42, wordWrap: false } }
				}
			};
		}

		set scrollText(v){
			this._scrollText = v;
			this._labelSpacing = 0;
			this._clippingWidth = v.width;

			this.patch({
				w: this._clippingWidth,
				ScrollingText: {
					LabelA: { text: { text: v.title, fontFace: v.fontType || 'RobotoBold', fontSize: v.fontSize || 36, lineHeight: v.lineHeight || 42 } },
					LabelB: { text: { text: v.title, fontFace: v.fontType || 'RobotoBold', fontSize: v.fontSize || 36, lineHeight: v.lineHeight || 42 } },
					LabelC: { text: { text: v.title, fontFace: v.fontType || 'RobotoBold', fontSize: v.fontSize || 36, lineHeight: v.lineHeight || 42 } }
				}
			});
			this.tag('LabelA').on('txLoaded', (tx)=>{
				this.labelWidth = Math.round(this.tag('LabelA').renderWidth);
				this._scrollDuration = (this.labelWidth >= this._clippingWidth) ? (Math.round((this.labelWidth / 100) * 2)) : 10;
				if(Math.abs(this._clippingWidth - (this.labelWidth + this._labelSpacing)) > this._clippingWidth){
					this._labelSpacing = 50;
				}else{
					this._labelSpacing = Math.abs(this._clippingWidth - this.labelWidth);
				}
				this.patch({
					w: v.width || 320,
					ScrollingText: {
						LabelA: { x: 0 },
						LabelB: { alpha: 1, x: this.labelWidth + this._labelSpacing },
						LabelC: { alpha: 1, x: (this.labelWidth + this._labelSpacing) * 2 }
					}
				});
				this._scrollAnimation = this.tag('ScrollingText').animation({
					duration: this._scrollDuration, delay: 1.8, repeat: 0, stopMethod: 'immediate', actions: [
						{ p: 'x', v: { 0: { v: 10, sm: 0 }, 1: { v: -(this.labelWidth + this._labelSpacing - 10), sm: 0 } } }
					]
				});
			});
			//this.tag('TestWrapper').patch({shader:{type: FadeOutPosXShader, fadeWidth: 50, posX: 50}});
		}

		set labelWidth(v){
			this._labelWidth = v;
		}

		get labelWidth(){
			return this._labelWidth;
		}

		start(){
			if(this.labelWidth >= this._clippingWidth){
				this._scrollAnimation.start();
				this.patch({
					ScrollingText: {
						LabelB: { alpha: 1 },
						LabelC: { alpha: 1 }
					}
				});
			}
		}

		stop(){
			this._scrollAnimation.stop();
			this.patch({
				ScrollingText: {
					LabelB: { alpha: 0 },
					LabelC: { alpha: 0 }
				}
			});
		}
	}

	class StationButton extends lng.Component{
		static _template(){
			return {
				x: 0, y: 0, w: 500, h: 145,
				DropShadow: {alpha: 0.1, x: -8, y: -8, w: 516, h: 161, rect: true, color: 0xFF000000, texture: lng.Tools.getShadowRect(516, 161, 8, 2)},
				Background: {alpha: 1, x: 145, y: 0, w: 355, h: 145, rect: true, color: 0xFF242843},
				ImageBackground: {alpha: 1, x: 0, y: 0, w: 145, h: 145, rect: true, color: 0xFFFFFFFF},
				Image: {alpha: 1, x: 0, y: 0, w: 145, h: 145, src: AppDefinition$1.getPath('images/missingImage.png')},
				StationLabel: {x: 160, y: 15, w: 320, type: ScrollingText },
				DescriptionLabel: {x: 170, y: 63, w: 320, color: 0xFF878BA8, text: {text: 'Description', fontSize: 26, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 30, maxLines: 2, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 320}},
				TextFadeWrapper:{
					TextFadeHighlight: { alpha: 0,
						Left: { alpha: 1, x: 160, y: 10, w: 10, h: 55, src: AppDefinition$1.getPath('images/TextFadeLeftHighlight.png') },
						Right: { alpha: 1, mountX: 1, x: 482, y: 10, w: 20, h: 55, src: AppDefinition$1.getPath('images/TextFadeRightHighlight.png') }
					},
					TextFade: { alpha: 1,
						Left: { alpha: 1, x: 160, y: 10, w: 10, h: 55, src: AppDefinition$1.getPath('images/TextFadeLeft.png') },
						Right: { alpha: 1, mountX: 1, x: 482, y: 10, w: 20, h: 55, src: AppDefinition$1.getPath('images/TextFadeRight.png') }
					}
				}
			};
		}

		get item(){
			return this._item;
		}

		set item(v){
			this._item = v;
			this.patch({
				Image: {src: ux.Ui.getImageUrl(v.image, {width: 145, height: 145, type: 'crop'})},
				DescriptionLabel: {text: {text: v.subText || ''}}
			});
			this.tag('StationLabel').scrollText ={
					title: v.title || '',
					fontSize: 36,
					lineHeight: 42,
					width: 320,
					fontType: 'RobotoBold'
			};
			this.tag('Image').on('txError', ()=>{
				this.patch({Image: {src: AppDefinition$1.getPath('images/missingImage.png')}});
			});
		}

		set Image(v){
			this.patch({
				Image: {src: AppDefinition$1.getPath(v)}
			});
		}

		set direction(dir){
			this._direction = dir || 'none';
			switch(dir){
				case 'right':
					this.tag('Background').patch({mountX: 0, mountY: 0, x: 145, y: 0});
					break;
				case 'left':
					this.tag('Background').patch({mountX: 1, mountY: 0, x: 500, y: 0});
					break;
				case 'down':
					this.tag('Background').patch({mountX: 0, mountY: 0, x: 145, y: 0});
					break;
				case 'up':
					this.tag('Background').patch({mountX: 0, mountY: 1, x: 145, y: 145});
					break;
			}
		}

		animateHover(){
			if(this._direction === 'left' || this._direction === 'right'){
				this._hoverOverlayAnimationX.start();
			}else if(this._direction === 'up' || this._direction === 'down'){
				this._hoverOverlayAnimationY.start();
			}else{
				this.tag('Background').patch({mountX: 0, mountY: 0, alpha: 1, x: 145, y: 0, w: 355, h: 145 });
			}
		}

		static _states(){
			return {
				_init(){
					this._hoverOverlayAnimationX = this.tag('Background').animation({
						duration: 0.2, repeat: 0, stopMethod: 'immediate', actions: [
							{p: 'w', v: {0: 0, 1: 355}}
						]
					});
					this._hoverOverlayAnimationY = this.tag('Background').animation({
						duration: 0.2, repeat: 0, stopMethod: 'immediate', actions: [
							{p: 'h', v: {0: 0, 1: 145}}
						]
					});
					this._shadeHighlightShow = this.tag('TextFadeWrapper').animation({
						duration: 0.2, delay: 0, repeat: 0, stopMethod: 'immediate', actions: [
							{t: 'TextFade', p: 'alpha', v: {0: {v: 1, sm: 0}, 0.1: 0, 1: {v: 0, sm: 0}}},
							{t: 'TextFadeHighlight', p: 'alpha', v: {0: {v: 0, sm: 1}, 0.8: 0, 1: {v: 1, sm: 1}}}
						]
					});
					this._shadeHighlightHide = this.tag('TextFadeWrapper').animation({
						duration: 0, delay: 0, repeat: 0, stopMethod: 'immediate', actions: [
							{t: 'TextFade', p: 'alpha', v: {0: {v: 0, sm: 0}, 1: {v: 1, sm: 0}}},
							{t: 'TextFadeHighlight', p: 'alpha', v: {0: {v: 1, sm: 0}, 1: {v: 0, sm: 0}}}
						]
					});
				},
				_focus(){
					this.animateHover();
					this.tag('StationLabel').start();
					this._shadeHighlightHide.stop();
					this._shadeHighlightShow.start();
					this.patch({smooth: {scale: 1.1}, Background: {colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D}, StationLabel: {color: 0xFF1C203C}, DescriptionLabel: {color: 0xFFFFFFFF}});
				},
				_unfocus(){
					this.tag('StationLabel').stop();
					this._shadeHighlightShow.stop();
					this._shadeHighlightHide.start();
					this.patch({smooth: {scale: 1}, Background: {color: 0xFF242843}, StationLabel: {color: 0xFFF1F1F1}, DescriptionLabel: {color: 0xFF878BA8}});
				}
			};
		}
	}

	class StationsList extends lng.Component{
		static _template(){
			return { x: 0, y: 0,
				Label: { x: 0, y: 0, w: 1400, color: 0xFF868897, text:{ text: 'Also for you', fontSize: 38, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 44, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 320}},
				StationsList: { x: 0, y: 65, w: 1435, h: 650, clipbox: false}
			};
		}

		set items(v){
			this._items = v;
			this.tag('StationsList').children = v.map((station, idx) => {
				return { type: StationButton, item: station, x: idx * 540,  y: 0 };
			});
		}

		set label(v){
			this._label = v;
			this.tag('Label').patch({ text: { text: v }});
		}

		get label(){
			return this._label;
		}

		get active(){
			return this.tag("StationsList").children[this._index]
		}

		get list(){
			return this.tag("StationsList").children
		}

		select(index){
			this.fire("select",{index});
		}

		_getFocused(){
			switch(this.state){
				case 'StationsList':
					return this.active;
			}
		}

		static _states(){
			return {
				_init: function(){
					this._index = 0;
				},
				_focus(){
					return 'StationsList';
				},
				StationsList: {
					_enter(){
						this.patch({
							StationsList: { smooth: { x: 0 }}
						});
					},
					_focus(){
						this.fire('select', { index: 0});
						this.patch({
							Label:{ color: 0xFFF1F1F1 },
							StationsList: { smooth: { x: 0 }}
						});
						if(this._items.length) this.active.direction = 'none';
					},
					_unfocus(){
						this.patch({
							Label:{ color: 0xFF868897 },
							StationsList: { smooth: { x: 0 }}
						});
					},
					select({index}){
						this._index = index;
					},
					_handleEnter(){
						if(this.active && this.active.item) this.signal('onStationSelected', { item: this.active.item });
					},
					_handleBack(){
						if(this._index !== 0){
							this.patch({
								SearchResultGrid:{ smooth: {x: 170}}
							});
							this.fire('select',{ index: 0});
						}else{
							this.signal('searchResultGridExitLeft');
						}
					},
					_handleLeft(){
						if(this._index > 0){
							if(this._index%3 === 0 ){
								let newX = this.tag('StationsList').x + 1580;
								this.patch({StationsList: { smooth:{ x: newX }}});
							}
							this.fire("select",{ index:this._index - 1 });
						}
						if(this._items.length) this.active.direction = 'left';
					},
					_handleRight(){
						if(this._index < this.list.length -1){
							if(this._index%3 === 2 ){
								let newX = this.tag('StationsList').x - 1580;
								this.patch({StationsList: { smooth:{ x: newX }}});
							}
							this.fire("select",{ index: this._index + 1 });
						}
						if(this._items.length) this.active.direction = 'right';
					}
				}
			};
		}
	}

	class HomePage extends lng.Component{
		static _template(){
			return {
				x: 0, y: 260, w: 1920, h: 820, alpha: 1,
				ExclusivesList: { x: 150, y: 0, alpha: 1, type: ExclusivesList, signals: { exclusivesListExitUp: true, onExclusiveSelectGoToPlayer: true }},
				RecentsList: { x: 170, y: 446, type: StationsList, signals:{ onStationSelected: true }}
			};
		}

		get api(){
			return this.cparent.api
		}

		_getFocused(){
			switch(this.state){
				case 'ExclusivesList':
					return this.tag('ExclusivesList');
				case 'RecentsList':
					return this.tag('RecentsList');
				case 'NowPlayingButton':
					return this.tag('NowPlayingButton');
			}
		}

		static _states(){
			return {
				_init: function(){
					this.tag('RecentsList').label = 'Recents';
				},
				_focus(){
					if(this.api.recentlyViewed.length){
						this.tag('RecentsList').items = this.api.recentlyViewed;
					}else{
						this.tag('RecentsList').items = this.api.dataLocalStations;
					}
					if(!this.api.dataExclusives.length){
						this.api.loadExclusives().then((exclusives) => {
							this.api.dataExclusives = exclusives;
							this.tag('ExclusivesList').data = exclusives;
						});
					}else{
						this.tag('ExclusivesList').data = this.api.dataExclusives;
					}
					return 'ExclusivesList';
				},
				ExclusivesList:{
					exclusivesListExitUp(){
						this.signal('exitToMainMenu');
					},
					onExclusiveSelectGoToPlayer(item){
						this.signal('onExclusiveSelectGoToPlayer', item);
					},
					_handleDown(){
						return 'RecentsList';
					}
				},
				RecentsList:{
					_handleUp(){
						return 'ExclusivesList'
					},
					onStationSelected({item}){
						this.signal('onRecentListSelectGoToPlayer', {item: item});
					}
				}
			};
		}
	}

	class ProfileLogButton extends lng.Component{
		static _template(){
			return {
				x: 0, y: 0, w: 650, h: 361,
				Title: { x: 40, y: 0, w: 510, color: 0xFF868897, text:{ text: 'Profile', fontSize: 38, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 44, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 510 } },
				LogWrapper:{
					Image:{	x: 0, y: 101, w: 260, h: 260, src: AppDefinition$1.getPath('images/logIcon.png')},
					Name:{ x: 315, y: 118, w: 510, color: 0xFFF1F1F1, text:{ text: 'Name', fontSize: 46, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 54, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 510 } },
					Description:{ x: 315, y: 182, w: 510, color: 0xFFF1F1F1, text:{ text: 'Description', fontSize: 36, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 42, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 510 } },
					LogButton:{ x: 315, y: 258, w: 200, h: 70, rect: true, color: 0x00000000, type: lng.components.BorderComponent, borderWidth: 4, colorBorder: 0xFFF1F1F1,
						Label: { mount: 0.5, x: 100, y: 45, w: 200, h: 70, text:{ text: 'Log in', fontSize: 32, textAlign: 'center', fontFace: 'RobotoRegular', lineHeight: 38, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 200 } }
					}
				}
			};
		}

		setTextToLogOut(logout){
			logout?this.patch({LogWrapper:{LogButton:{Label:{text:{text:'Log out'}}}}}):this.patch({LogWrapper:{LogButton:{Label:{ text:{text:'Log in'}}}}});
		}

		resetTextToDefault(){
			this.patch({
				LogWrapper:{
					Image:{ src: AppDefinition$1.getPath('images/logIcon.png')},
					Name:{ text:{ text: 'Name'}},
					Description:{ text: { text: 'Description'}}
				}
			});
		}

		setCredentials(v){
			this.patch({
				LogWrapper:{
					Image:{ src: ux.Ui.getImageUrl(v.userImage, { width: 260, height: 260, type: 'crop' })},
					Name:{ text:{ text: v.displayName }},
					Description:{ text: {text: v.email }}
				}
			});
		}

		static _states(){
			return {
				_focus(){
					this.patch({
						Title:{ color: 0xFFF1F1F1},
						LogWrapper:{
							LogButton:{ color: 0xFF14D8CC }
						}
					});
				},
				_unfocus(){
					this.patch({
						Title:{ color: 0xFF7E7E7E},
						LogWrapper:{
							LogButton:{ color: 0x00000000 }
						}
					});
				},
				_handleEnter(){
					this.signal('onLogSelect');
				}
			};
		}
	}

	class KeyboardButton extends lng.Component{
		static _template(){
			return {
				alpha: 1, x: 0, y: 0, w: 55, h: 70,
				HoverOverlay: { x: 0, y: 0, alpha: 0, w: 55, h: 70, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D },
				CharacterLabel: { alpha: 1, mount: 0.5, x: 27, y: 35, text: { text: '', fontSize: 38, color: 0xFFF1F1F1, textAlign: 'center', fontFace: 'RobotoRegular' } },
				CharacterIcon: { alpha: 0, x: 0, y: 10, w: 50, h: 50, src: '' }
			};
		}

		set characterLabel(v){
			this._characterLabel = v;
			this.tag('CharacterLabel').patch({ text: { text: v } });
		}

		get characterLabel(){
			return this._characterLabel;
		}

		set characterIcon(v){
			this.tag('CharacterIcon').patch({ src: AppDefinition$1.getPath(v.src), x: v.x, y: v.y, w: v.w, h: v.h });
		}

		lowerCaseKey(){
			this._keyIsLowerCase = true;
			if(!this._primaryKey) return;
			let letterCheck = /[a-zA-z]/g;
			if(letterCheck.test(this.characterLabel) && this.characterLabel !== undefined){
				this.characterLabel = this.keyData.keyCharacter.toLowerCase();
			}
		}

		upperCaseKey(){
			this._keyIsLowerCase = false;
			if(!this._primaryKey) return;
			let letterCheck = /[a-zA-z]/g;
			if(letterCheck.test(this.characterLabel) && this.characterLabel !== undefined){
				this.characterLabel = this.keyData.keyCharacter.toUpperCase();
			}
		}

		toggleUpperCase(){
			this._keyIsLowerCase ? this.upperCaseKey() : this.lowerCaseKey();
		}

		primaryKey(){
			this._primaryKey = true;
			this.characterLabel = this.keyData.keyCharacter;
			this._keyIsLowerCase ? this.lowerCaseKey() : this.upperCaseKey();
		}

		altKey(){
			this._primaryKey = false;
			this.characterLabel = this.keyData.alt;
		}

		togglePrimaryKey(){
			this._primaryKey ? this.altKey() : this.primaryKey();
		}

		set keyData(v){
			this._keyData = v;
			if(v.icon){
				this.characterIcon = v.icon;
				this.patch({ CharacterLabel: { alpha: 0 }, CharacterIcon: { alpha: 1 } });
			}else{
				this.characterLabel = v.keyCharacter;
				this.patch({ CharacterLabel: { alpha: 1 }, CharacterIcon: { alpha: 0 } });
			}
		}

		get keyData(){
			return this._keyData;
		}

		set direction(dir){
			this._direction = dir || 'none';
		}

		animateHover(){
			switch(this._direction){
				case 'left':
					this._hoverOverlayLeft.start();
					this._direction = 'down';
					break;
				case 'right':
					this._hoverOverlayRight.start();
					this._direction = 'down';
					break;
				case 'up':
					this._hoverOverlayUp.start();
					this._direction = 'down';
					break;
				case 'down':
					this._hoverOverlayDown.start();
					this._direction = 'down';
					break;
				case 'none':
					this._direction = 'none';
					break;
				default:
					this._hoverOverlayDown.start();
					this._direction = 'down';
			}
		}

		static _states(){
			return {
				_init(){
					this._keyIsLowerCase = true;
					this._primaryKey = true;
					this._hoverOverlayLeft = this.tag('HoverOverlay').animation({
						duration: 0.2, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'x', v: { 0: { v: 20, sm: 0 }, 0.5:{v: -2 }, 1: { v: 0, sm: 0 } } } ]
					});
					this._hoverOverlayRight = this.tag('HoverOverlay').animation({
						duration: 0.2, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'x', v: { 0: { v: -20, sm: 0 }, 0.5:{v: -2 }, 1: { v: 0, sm: 0 } } } ]
					});
					this._hoverOverlayUp = this.tag('HoverOverlay').animation({
						duration: 0.1, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'y', v: { 0: { v: 20, sm: 0 }, 1: { v: 0, sm: 0 } } }	]
					});
					this._hoverOverlayDown = this.tag('HoverOverlay').animation({
						duration: 0.1, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'y', v: { 0: { v: -20, sm: 0 }, 1: { v: 0, sm: 0 } } }	]
					});
				},
				_focus(){
					this.patch({ HoverOverlay: { alpha: 1 } });
					this.animateHover();
				},
				_unfocus(){
					this.patch({ HoverOverlay: { alpha: 0 } });
				}
			};
		}
	}

	class Keyboard extends lng.Component{
		static _template(){
			return {
				KeyboardGrid: { alpha: 1, x: 0, y: 0 },
				NumerableButton: { x: 0, y: 415, w: 130, h: 70, rect: true, color: 0xFF242843,
					Hover:{ w: 130, h: 0, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D },
					Label: { x: 0, y: 15, w: 130, h: 70, text: { text: '?123', color: 0xFFF1F1F1, fontSize: 28, textAlign: 'center', fontFace: 'RobotoRegular' } }
				},
				SpaceButton: { x: 140, y: 415, w: 305, h: 70, rect: true, color: 0xFF242843,
					Hover:{ w: 305, h: 0, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D },
					Label: { x: 0, y: 15, w: 305, h: 70, text: { text: 'SPACE', color: 0xFFF1F1F1, fontSize: 28, textAlign: 'center', fontFace: 'RobotoRegular' } }
				}
			};
		}

		buildKeyGrid(v){
			let keyRows = [];
			v.map((characterList, index_y) => {
				characterList.map((keyData, index_x)=>{
					keyRows.push({ type: KeyboardButton, x: (index_x * 65), y: (index_y * 95), keyData: keyData });
				});
			});
			this.tag('KeyboardGrid').children = keyRows;
		}

		get active(){
			return this.tag("KeyboardGrid").children[this._index]
		}

		get list(){
			return this.tag("KeyboardGrid").children
		}

		togglePrimaryKeys(){
			this.tag('KeyboardGrid').children.forEach((key)=>{
				key.togglePrimaryKey();
			});
		}

		toggleUpperToCase(){
			this.tag('KeyboardGrid').children.forEach((key)=>{
				key.toggleUpperCase();
			});
		}

		_getFocused(){
			switch(this.state){
				case 'KeyboardGrid':
					return this.active;
			}
		}

		focusSpace(){
			this._focusSpace = true;
		}

		select(index){
			this.fire("select",{index});
		}

		static _states(){
			return {
				_init(){
					this._index = 0;
					this._primaryKeys = true;
					this.buildKeyGrid(Keyboard.defaultKeyLayout);
				},
				_focus(){
					if(this._focusSpace){
						return 'SpaceButton';
					}else{
						return 'KeyboardGrid';
					}
				},
				KeyboardGrid: {
					_focus(){
						this.active.direction = 'none';
					},
					_handleRight(){
						if(this._index < this.list.length -1 && ![6,13,20,27].includes(this._index)){
							this.fire("select",{index: this._index + 1});
						}else{
							this.signal('keyboardExitRight');
						}
						this.active.direction = 'right';
					},
					_handleLeft(){
						if(this._index > 0){
							this.fire("select",{index:this._index - 1});
						}
						this.active.direction = 'left';
					},
					_handleUp(){
						let previous = (this._index > 7)?(this._index - 7):0;
						if(this._index > 6){
							this.fire("select", {index: previous});
						}else{
							this.signal('keyboardExitUp');
						}
						this.active.direction = 'up';
					},
					_handleDown(){
						let next = this._index + 7;
						if(next <= this.list.length - 1){
							this.fire("select", {index: next});
						}else{
							return 'SpaceButton';
						}
						this.active.direction = 'down';
					},
					select({index}){
						this._index = index;
					},
					_handleEnter(){
						if(this.active.keyData.keyCharacter === 'shift'){
							this.toggleUpperToCase();
						}else if(this.active.keyData.keyCharacter === 'backspace'){
							this.signal('onKeyboardSelectKey', {character: 'backspace'});
						}else{
							this.signal('onKeyboardSelectKey', {character: this.active.characterLabel});
						}
					}
				},
				NumerableButton:{
					_enter(){
						this.tag('NumerableButton').patch({ Hover:{ smooth:{ h: [70, { duration: 0.1 }] }}});
					},
					_exit(){
						this.tag('NumerableButton').patch({ Hover:{ smooth:{ h: [0, { duration: 0.1 }] }}});
					},
					_handleUp(){
						return 'KeyboardGrid';
					},
					_handleRight(){
						return 'SpaceButton';
					},
					_handleEnter(){
						this.togglePrimaryKeys();
					}
				},
				SpaceButton:{
					_focus(){
						this.tag('SpaceButton').patch({ Hover:{ smooth:{ h: [70, { duration: 0.1 }] }}});
						this._focusSpace = false;
					},
					_enter(){
						this.tag('SpaceButton').patch({ Hover:{ smooth:{ h: [70, { duration: 0.1 }] }}});
						this._focusSpace = false;
					},
					_exit(){
						this.tag('SpaceButton').patch({ Hover:{ smooth:{ h: [0, { duration: 0.1 }] }}});
					},
					_handleUp(){
						return 'KeyboardGrid';
					},
					_handleLeft(){
						return 'NumerableButton';
					},
					_handleRight(){
						this.tag('SpaceButton').patch({ Hover:{ smooth:{ h: [0, { duration: 0.1 }] }}});
						this.signal('keyboardSpaceExitRight');
					},
					_handleEnter(){
						this.signal('onKeyboardSelectKey', {character: ' '});
					}
				}
			};
		}
	}

	Keyboard.defaultKeyLayout = [
		[
			{keyCharacter: 'a', alt: '1'},
			{keyCharacter: 'b', alt: '2'},
			{keyCharacter: 'c', alt: '3'},
			{keyCharacter: 'd', alt: '4'},
			{keyCharacter: 'e', alt: '5'},
			{keyCharacter: 'f', alt: '6'},
			{keyCharacter: 'backspace', alt: 'backspace', icon: { src: 'images/backSpaceIcon.png', x: 3, y: 10, w: 50, h: 50}}
		],[
			{keyCharacter: 'g', alt: '7'},
			{keyCharacter: 'h', alt: '8'},
			{keyCharacter: 'i', alt: '9'},
			{keyCharacter: 'j', alt: '0'},
			{keyCharacter: 'k', alt: '!'},
			{keyCharacter: 'l', alt: '@'},
			{keyCharacter: 'm', alt: '#'}
		],[
			{keyCharacter: 'n', alt: '$'},
			{keyCharacter: 'o', alt: '%'},
			{keyCharacter: 'p', alt: '.'},
			{keyCharacter: 'q', alt: '&'},
			{keyCharacter: 'r', alt: '*'},
			{keyCharacter: 's', alt: '('},
			{keyCharacter: 't', alt: ')'}
		],[
			{keyCharacter: 'shift', alt: 'shift', icon: { src: 'images/shiftIcon.png', x: 3, y: 9, w: 50, h: 50}},
			{keyCharacter: 'u', alt: '-'},
			{keyCharacter: 'v', alt: '_'},
			{keyCharacter: 'w', alt: '+'},
			{keyCharacter: 'x', alt: '-'},
			{keyCharacter: 'y', alt: '/'},
			{keyCharacter: 'z', alt: '*'}
		]
	];

	class LoginBanner extends lng.Component{
		static _template(){
			return { //-260  y-position
				x: 0, y: 0, w: 1920, h: 820,
				LoginLabel:{ x: 170, y: 20, w: 105, h: 80, color: 0xFFF1F1F1, text:{ text: 'Log in', fontSize: 38, textAlign: 'left', fontFace: 'RobotoBold'},
					LabelEdge:{ x: 0, y: 68, w: 1580, h: 3, rect: true, color: 0xFFF1F1F1 }
				},
				MessageLabel: { x: 275, y: 20, w: 1475, h: 80, color: 0xFF868897, text:{ text: 'If you do not have an account, please subscribe at tunein.com', fontSize: 38, textAlign: 'right', fontFace: 'RobotoRegular'}
				},
				LoginBannerWrapper: { y: 150, //-410 y-position
					TextBoxHighlight: { x: 750, y: 0, w: 220, h: 70, alpha: 0, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D },
					UserNameFocusLabel:{ x: 770, y: 7, text:{ text: 'Username', fontSize: 38, lineHeight: 44, textAlign: 'left', fontFace: 'RobotoBold' }},
					UserName:{
						x: 770, y: 81, w: 1100, h: 70,
						Label: { w: 1100, h: 70, alpha: 0.5, color: 0xFFF1F1F1, text: { text: '', fontSize: 46, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 54, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 510 }},
						UnderLine: { x: 0, y: 67, w: 980, h: 5, alpha: 1, rect: true, color: 0xFFF1F1F1 }
					},
					PassWordFocusLabel:{ x: 770, y: 199, alpha: 0.5, text:{ text: 'Password', fontSize: 38, lineHeight: 44, textAlign: 'left', fontFace: 'RobotoRegular' }},
					PassWord:{
						x: 770, y: 271, w: 900, h: 70,
						Label: { w: 1100, h: 70, alpha: 0.5, color: 0xFFF1F1F1, text: { text: '', fontSize: 46, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 54, maxLines: 1, letterSpacing: 10, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 510 }},
						UnderLine: { x: 0, y: 67, w: 980, h: 3, alpha: 0.5, rect: true, color: 0xFFF1F1F1 }
					},
					Keyboard:{ x: 170, y: 0, type: Keyboard, signals: { onKeyboardSelectKey: true, keyboardExitRight: true, keyboardSpaceExitRight: true, keyboardExitUp: true }},
					LoginButton:{ x: 770, y: 415, w: 980, h: 70, rect: true, color: 0xFF242843,
						Hover:{ w: 980, h: 0, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D },
						Label:{ mount: 0.5, x: 490, y: 50, w: 305, h: 70, color: 0xFFF1F1F1, text: { text: 'LOGIN', fontSize: 28, textAlign: 'center', fontFace: 'RobotoRegular', lineHeight: 54, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 305 }}
					}
				}
			};
		}

		get api(){
			return this.cparent.api
		}

		reset(){
			this.userName = '';
			this.passWord = '';
		}

		set userName(v){
			this._userName = v;
			this.tag('UserName').patch({ Label:{ text:{ text: v }}});
		}

		get userName(){
			return this._userName;
		}

		set passWord(v){
			this._passWord = v;
			this._cloakedPassWord = ('•').repeat(v.length);
			this.tag('PassWord').patch({ Label:{ text:{ text: this._cloakedPassWord }}});
		}

		get passWord(){
			return this._passWord;
		}

		addCharacter(v){
			if(this._userNameSelected){
				if(this.userName.length < this._maxCharacterCount) this.userName += v;
			}else{
				if(this.passWord.length < this._maxCharacterCount) this.passWord += v;
			}
		}

		removeCharacter(){
			if(this._userNameSelected){
				if(this.userName.length){
					this.userName = this.userName.slice(0, this.userName.length - 1);
					if(!this.userName.length) this.tag('UserName').patch({Label: {text: {text: ''}}});
				}
			}else{
				if(this.passWord.length){
					this.passWord = this.passWord.slice(0, this.passWord.length - 1);
					if(!this.passWord.length) this.tag('PassWord').patch({ Label:{ text:{ text: ''}}});
				}
			}
		}

		resetFocusedElements(){
			this._userNameSelected = true;
			this.patch({
				LoginBannerWrapper: {
					TextBoxHighlight:{  y: 0, alpha: 1},
					UserNameFocusLabel:{ alpha: 1, text:{ fontFace: 'RobotoBold' }},
					UserName: { Label:{ alpha: 1 },
						UnderLine: { h: 5, alpha: 1 }
					},
					PassWordFocusLabel:{ alpha: 0.5 , text:{ fontFace: 'RobotoRegular' }},
					PassWord:{ Label: { alpha: 0.5 },
						UnderLine: { h: 3, alpha: 0.5 }
					}
				}
			});
		}

		_getFocused(){
			switch(this.state){
				case 'Keyboard':
					return this.tag('Keyboard');
			}
		}

		static _states(){
			return {
				_init: function(){
					this._maxCharacterCount = 28;
					this._userName = '';
					this._passWord = '';
					this._userNameSelected = true;
				},
				_focus(){
					this.resetFocusedElements();
					return 'Keyboard';
				},
				Keyboard:{
					onKeyboardSelectKey(data){
						if(data.character === 'backspace'){
							this.removeCharacter();
						}else{
							this.addCharacter(data.character);
						}
					},
					keyboardExitRight(){
						if(this._userNameSelected){
							return 'UserName';
						}else{
							return 'PassWord';
						}
					},
					keyboardSpaceExitRight(){
						return 'LoginButton';
					},
					keyboardExitUp(){
						this.signal('loginBannerExitUp');
					}
				},
				UserName:{
					_enter(){
						this._userNameSelected = true;
						this.patch({
							LoginBannerWrapper: {
								TextBoxHighlight:{ smooth:{ y: 0, alpha: 1 }},
								UserNameFocusLabel:{ smooth: {alpha: 1 }, text:{ fontFace: 'RobotoBold' }},
								UserName: { Label:{ smooth:{ alpha: 1 }},
									UnderLine: { h: 5, alpha: 1 }
								},
								PassWordFocusLabel:{ smooth: {alpha: 0.5 }, text:{ fontFace: 'RobotoRegular' }},
								PassWord:{ Label: { smooth: {alpha: 0.5 }},
									UnderLine: { h: 3, alpha: 0.5 }
								}
							}
						});
					},
					_exit(){
						this.patch({
							LoginBannerWrapper: {
								TextBoxHighlight:{ smooth:{ alpha: 0 }}
							}
						});
					},
					_handleLeft(){
						return 'Keyboard';
					},
					_handleEnter(){
						return 'Keyboard';
					},
					_handleDown(){
						return 'PassWord';
					},
					_handleUp(){
						this.signal('loginBannerExitUp');
						return 'Keyboard';
					}
				},
				PassWord:{
					_enter(){
						this._userNameSelected = false;
						this.patch({
							LoginBannerWrapper: {
								TextBoxHighlight:{ smooth:{ y: 190, alpha: 1 }},
								UserNameFocusLabel:{ smooth: {alpha: 0.5 }, text:{ fontFace: 'RobotoRegular' }},
								UserName: {Label: { smooth: {alpha: 0.5 }},
									UnderLine: { h: 3, alpha: 0.5 }
								},
								PassWordFocusLabel:{ smooth: {alpha: 1 }, text:{ fontFace: 'RobotoBold' }},
								PassWord: { Label:{ smooth:{ alpha: 1 }},
									UnderLine: { h: 5, alpha: 1 }
								}
							}
						});
					},
					_exit(){
						this.patch({
							LoginBannerWrapper: {
								TextBoxHighlight:{ smooth:{ alpha: 0 }}
							}
						});
					},
					_handleLeft(){
						return 'Keyboard';
					},
					_handleEnter(){
						this.tag('PassWord').patch({ Label:{ smooth:{ alpha: 1 }}});
						return 'Keyboard';
					},
					_handleDown(){
						return 'LoginButton';
					},
					_handleUp(){
						return 'UserName';
					}
				},
				LoginButton:{
					_enter(){
						this.tag('Hover').patch({ smooth:{ h: [70, { duration: 0.1 }] }});
					},
					_exit(){
						this.tag('Hover').patch({ smooth:{ h: [0, { duration: 0.1 }] }});
					},
					_handleUp(){
						return 'PassWord';
					},
					_handleLeft(){
						this.tag('Keyboard').focusSpace();
						return 'Keyboard';
					},
					_handleEnter(){
						this.signal('onLoginButtonSelect', {item:{userName: this._userName, passWord: this._passWord}});
					}
				}
			};
		}
	}

	class ErrorMessageAsset extends lng.Component{
		static _template(){
			return {
				ErrorMessageBar: {
					x: 0, y: -150, w: 1920, h: 80,
					Shadow:{ alpha: 0.1, x: -10, y: 10, w: 1940, h: 80, rect: true, color: 0xFF000000, texture: lng.Tools.getShadowRect(1920, 1080, 8, 2)},
					Background: { x: 0, w: 1920, h: 80, rect: true, color: 0xFFAA0000 },
					ErrorImage:{ x: 169, y: 25, w: 28, h: 28, src: AppDefinition$1.getPath('images/errorIcon.png') },
					Label: { x: 215, y: 18, w: 1600, h: 60, color: 0xFFF1F1F1, text: { text: 'Failed to login', fontSize: 36, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 30, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 480 } }
				}
			};
		}

		show(text){
			if(this._animationPlaying) return;
			this.tag('Label').patch({ text: { text: text ? text : 'Error' } });
			this.fire('playAnimation');
		}

		hide(){
			this._messageExitAnimation.start();
		}

		static _states(){
			return {
				_init(){
					this._messageEnterAnimation = this.tag('ErrorMessageBar').animation({
						duration: 0.6, repeat: 0, stopMethod: 'immediate', actions: [
							{ p: 'y', v: { 0: -150, 0.8: 55, 1: 50 } }
						]
					});
					this._messageExitAnimation = this.tag('ErrorMessageBar').animation({
						duration: 0.6, delay: 2, repeat: 0, stopMethod: 'immediate', actions: [
							{ p: 'y', v: { 0: 50, 0.2: 55, 1: -150 } }
						]
					});
				},
				playAnimation(){
					this._messageEnterAnimation.start();
					this._messageEnterAnimation.on('finish', ()=>{
						this._messageExitAnimation.start();
						this._messageExitAnimation.on('finish', ()=>{
							this.fire('animationStopped');
						});
					});
					return 'AnimationPlaying';
				},
				animationStopped(){
					return 'NoAnimation';
				},
				AnimationPlaying:{
					_enter(){
						this._animationPlaying = true;
					}
				},
				NoAnimation:{
					_enter(){
						this._animationPlaying = false;
					}
				}
			};
		}
	}

	class ProfilePage extends lng.Component{
		static _template(){
			return {
				x: 0, y: 260, w: 1920, h: 820,
				ProfileWrapper:{
					Favorites: { x: 170, y: 20, alpha: 1, type: StationsList, signals:{ onStationSelected: true }},
					NoFavoritesBanner:{ x: 170, y: 100, w: 500, h: 145, rect: true, color: 0xFF242843,
						NoFavoritesLabel:{ mount: 0.5, x: 250, y: 72, w: 390, h: 30, color: 0xFF878BA8, text:{ text: 'NO FAVORITES ARE SET', fontSize: 26, textAlign: 'center', fontFace: 'RobotoRegular', lineHeight: 30, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 480}}
					},
					LogButton: { x: 130, y: 298, type: ProfileLogButton, signals: { onLogSelect: true }}
				},
				LoginBanner: { alpha: 1, type: LoginBanner, signals:{ onLoginButtonSelect: true, loginBannerExitUp: true }},
				ErrorMessage: { type: ErrorMessageAsset, y: -260 }
			};
		}

		get api(){
			return this.cparent.api
		}

		updateFavorites(){
			if(this.api.isLoggedIn){
				this.api.loadFavorites();
				if(this.api.favorites.length){
					this._favoritesAvailable = true;
					this.tag('Favorites').items = this.api.favorites;
					this.tag('NoFavoritesBanner').patch({smooth: {alpha: 0}});
					this.tag('Favorites').select(0);
				}else{
					this._favoritesAvailable = false;
					this.tag('Favorites').items = [];
					this.tag('NoFavoritesBanner').patch({smooth: {alpha: 1}});
					this.fire('focusLogButton');
				}
			}
		}

		_getFocused(){
			switch(this.state){
				case 'Favorites':
					return this.tag('Favorites');
				case 'LogButton':
					return this.tag('LogButton');
				case 'LoginBanner':
					return this.tag('LoginBanner');
			}
		}

		static _states(){
			return {
				_init: function(){
					this.tag('Favorites').label = 'Favorites';
					this.tag('LogButton').setTextToLogOut(false);
				},
				_focus(){
					if(this.api.isLoggedIn){
						this.tag('LogButton').setTextToLogOut(true);
					}else{
						this.tag('LogButton').setTextToLogOut(false);
						this._favoritesAvailable = false;
						this.tag('NoFavoritesBanner').patch({smooth: {alpha: 1}});
					}
					if(this.api.isLoggedIn && this.api.favorites.length > 0){
						return 'Favorites';
					}else if(this.api.isLoggedIn && this.api.favorites.length === 0){
						return 'LogButton';
					}else{
						return 'LoginBanner'
					}
				},
				focusLogButton(){
					return 'LogButton';
				},
				Favorites:{
					_handleDown(){
						return 'LogButton';
					},
					_handleUp(){
						this.signal('profilePageExitUp');
					},
					onStationSelected(item){
						if(this._favoritesAvailable) this.signal('onFavoriteSelectGoToPlayer', item);
					}
				},
				setLogButton(){
					return 'LogButton';
				},
				LogButton:{
					_enter(){
						this.patch({
							ProfileWrapper:{ alpha: 1 },
							LoginBanner:{ alpha: 0 }
						});
					},
					onLogSelect(){
						if(this.api.isLoggedIn){
							this.tag('LogButton').resetTextToDefault();
							this.tag('LogButton').setTextToLogOut(false);
							this.tag('LoginBanner').reset();
							this.tag('Favorites').items = [];
							this.api.logout();
							this._favoritesAvailable = false;
							this.tag('NoFavoritesBanner').patch({smooth: {alpha: 1}});
						}else{
							return 'LoginBanner';
						}
					},
					_handleUp(){
						return 'Favorites';
					}
				},
				LoginBanner:{
					_enter(){
						this.patch({
							ProfileWrapper:{ alpha: 0 },
							LoginBanner:{ alpha: 1 }
						});
					},
					onLoginButtonSelect({item}){
						this.api.login(item).then((accountData)=>{
							if(accountData !== 'error' && this.api.isLoggedIn){
								this.updateFavorites();
								this.tag('LogButton').setCredentials(accountData);
								this.tag('LogButton').setTextToLogOut(true);
								this.fire('setLogButton');
							}else{
								this.tag('ErrorMessage').show('Failed to login');
							}
						});
					},
					loginBannerExitUp(){
						this.signal('profilePageExitUp');
					}
				}
			};
		}
	}

	class BrowseTextButton extends lng.Component{
		static _template(){
			return {
				alpha: 1, x: 0, y: 0, w: 750, h: 80,

				Border: { alpha: 1, x: 0, y: 77, w: 750, h: 3, rect: true, color: 0xFFF1F1F1 },
				HoverOverlay: {
					alpha: 0, mount: 0, x: -20, y: -10, w: 790, h: 93, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D,
					DropShadow: { alpha: 0.1, x: -8, y: -8, w: 806, h: 109, rect: true, color: 0xFF000000, texture: lng.Tools.getShadowRect(806, 109, 8, 2)}
				},
				Image: { alpha: 1, mountX: 1, x: 750, y: 18, w: 40, h: 40, src: AppDefinition$1.getPath('images/arrowRight.png') },
				Label: { x: 20, y: 14, text: { text: 'Browse', fontSize: 38, color: 0xFFF1F1F1, textAlign: 'left', fontFace: 'RobotoRegular', maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 700, lineHeight: 80 } }
			};
		}

		get item(){
			return this._item;
		}

		set item(v){
			this._item = v;
		}

		set label(v){
			this.patch({
				Label: { text: { text: v.toString() } }
			});
		}

		set direction(dir){
			this._direction = dir || 'none';
		}

		animateHover(){
			switch(this._direction){
				case 'left':
					this._hoverOverlayLeft.start();
					this._direction = 'none';
				break;
				case 'right':
					this._hoverOverlayRight.start();
					this._direction = 'none';
				break;
				case 'up':
					this._hoverOverlayUp.start();
					this._direction = 'none';
				break;
				case 'down':
					this._hoverOverlayDown.start();
					this._direction = 'none';
				break;
				case 'none':
					this._direction = 'none';
				break;
				default:
					this._hoverOverlayDown.start();
					this._direction = 'down';
			}
		}

		static _states(){
			return {
				_init(){
					this._hoverOverlayLeft = this.tag('HoverOverlay').animation({
						duration: 0.2, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'x', v: { 0: { v: 10, sm: 0 }, 0.5:{v: -22 }, 1: { v: -20, sm: 0 } } } ]
					});
					this._hoverOverlayRight = this.tag('HoverOverlay').animation({
						duration: 0.2, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'x', v: { 0: { v: -50, sm: 0 }, 0.5:{v: -18 }, 1: { v: -20, sm: 0 } } } ]
					});
					this._hoverOverlayUp = this.tag('HoverOverlay').animation({
						duration: 0.1, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'y', v: { 0: { v: 10, sm: 0 }, 1: { v: -10, sm: 0 } } }	]
					});
					this._hoverOverlayDown = this.tag('HoverOverlay').animation({
						duration: 0.1, repeat: 0, stopMethod: 'immediate', actions: [ { p: 'y', v: { 0: { v: -30, sm: 0 }, 1: { v: -10, sm: 0 } } }	]
					});
				},
				_focus(){
					this.patch({ HoverOverlay: { alpha: 1 } });
					this.animateHover();
				},
				_unfocus(){
					this.patch({ HoverOverlay: { alpha: 0 } });
				}
			};
		}
	}

	class BrowseGrid extends lng.Component{
		static _template(){
			return {
				x: 0, y: 0,
				BrowseGrid: { alpha: 1, x: 0, y: 0, h: 400 }
			};
		}

		get api(){
			return this.cparent.api;
		}

		show(){
			this.patch({ alpha: 1 });
		}

		hide(){
			this.patch({ alpha: 0 });
		}

		set items(data){
			this.fire('empty');
			if(data.listType === 'stations'){
				this._gridContainsStations = true;
				this._moveGridAtColumnNr = 2;
			}else if(data.listType === 'links'){
				this._gridContainsStations = false;
				this._moveGridAtColumnNr = 1;
			}

			const browseGrid = this.tag('BrowseGrid');
			browseGrid.x = 0;
			this._gridXPosition = 0;
			this.rows = this._gridContainsStations ? 3 : 5;
			const spacingX = this._gridContainsStations ? 540 : 830;
			const spacingY = this._gridContainsStations ? 185 : 80;
			const l = data.items.length;
			this.columns = ((l - (l % this.rows)) / this.rows) + 1;
			this.col = 0;
			this.row = 0;

			browseGrid.children = data.items.map((data, index)=>{
				return { type: this._gridContainsStations ? StationButton : BrowseTextButton, x: Math.floor(index / this.rows) * spacingX, y: index % this.rows * spacingY, item: data, label: data.title };
			});
			this.fire('filled');
		}

		calculateIndex(r = this.row, c = this.col){
			return c * this.rows + r;
		}

		set row(v){
			this._row = v;
		}

		get row(){
			return this._row;
		}

		set col(v){
			this._col = v;
		}

		get col(){
			return this._col;
		}

		set columns(v){
			this._columns = v;
		}

		get columns(){
			return this._columns;
		}

		get active(){
			return this.list[this.calculateIndex()];
		}

		get list(){
			return this.tag('BrowseGrid').children;
		}

		_getFocused(){
			if(this.state === 'Filled'){
				return this.active;
			}
			return this;
		}

		static _states(){
			return {
				_init: function(){
					this._row = 0;
					this._col = 0;
					this._index = 0;
					this._gridXPosition = 0;
					this._gridContainsStations = true;
					return 'Empty';
				},
				empty: 'Empty',
				filled: 'Filled',
				Empty: {},
				Filled: {
					_focus(){
						this.active.direction = 'none';
					},
					_handleEnter(){
						this.signal('onBrowseItemSelected', { item: this.active.item });
					},
					_handleBack(){
						if(this._index !== 0){
							this._gridXPosition = 0;
							this.patch({
								BrowseGrid: { smooth: { x: this._gridXPosition } }
							});
						}else{
							this.signal('onBackIsPressed');
						}
					},
					_handleDown(){
						const r = this.row + 1;
						const items = this.list;
						if(r < this.rows && this.calculateIndex(r, this.col) < items.length){
							this.row = r;
						}
						this.active.direction = 'down';
					},
					_handleUp(){
						if(0 < this.row){
							this.row--;
						}else{
							this.signal('browseGridExitUp');
						}
						this.active.direction = 'up';
					},
					_handleRight(){
						const c = this.col + 1;
						const items = this.list;
						if(c < this.columns && this.calculateIndex(this.row, c) < items.length){
							if(!items[this.calculateIndex(this.row, c)]){
								this.row = (items.length - 1) % this.rows;
							}
							this.col = c;
							if(this.columns > 2 && this.col > 1){
								this._gridXPosition -= this._gridContainsStations ? 540 : 830;
								this.patch({ BrowseGrid: { smooth: { x: [this._gridXPosition, { duration: 0.2, delay: 0, timingFunction: 'linear' }] } } });
							}
						}
						this.active.direction = 'right';
					},
					_handleLeft(){
						if(0 < this.col){
							this.col = this.col - 1;
							if(this.columns > 2 && this.col > 0){
								this._gridXPosition += this._gridContainsStations ? 540 : 830;
								this.patch({ BrowseGrid: { smooth: { x: [this._gridXPosition, { duration: 0.2, delay: 0, timingFunction: 'linear' }] } } });
							}
						}
						this.active.direction = 'left';
					}
				}
			};
		}
	}

	class BrowseSubMenuButton extends lng.Component{
		static _template(){
			return {
				alpha: 1, x: 0, y: 0, w: 300, h: 80,
				HoverOverlay: { alpha: 0, x: -20, y: -10, w: 300, h: 93, rect: true, colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D },
				Label: { x: 0, y: 15, h: 93, alpha: 0.5, color: 0xFFF1F1F1, text: { text: 'Link', fontSize: 38, textAlign: 'center', fontFace: 'RobotoRegular' } }
			};
		}

		getWidthOfTag(tagName){
			let tx = this.tag(tagName);
			tx.loadTexture();
			return Math.round(tx.renderWidth);
		}

		get item(){
			return this._item;
		}

		set itemWidth(v){
			this._itemWidth = v;
		}

		get itemWidth(){
			return this._itemWidth;
		}

		set active(v){
			this._active = v;
			this.tag('Label').patch({ alpha: this._active ? 1 : 0.5 });
		}

		get active(){
			return this._active;
		}

		set item(v){
			this._item = v;
			this.patch({ Label: { text: { text: v.toString() } } });
			this.itemWidth = this.getWidthOfTag('Label') + 45;
			this.patch({ w: this.itemWidth, HoverOverlay: { w: this.itemWidth } });
		}

		static _states(){
			return {
				_focus(){
					this.patch({ HoverOverlay: { alpha: 1 }, Label: { alpha: 1 } });
				},
				_unfocus(){
					this.patch({ HoverOverlay: { alpha: 0 }, Label: { alpha: this._active ? 1 : 0.5 } });
				}
			};
		}
	}

	class BrowseMenu extends lng.Component{
		static _template(){
			return {
				x: 0, y: 0, w: 1581, h: 80, clipping: true,
				Label:{ zIndex: 10, x: 0, y: 15, alpha: 1, color: 0xFFF1F1F1, text:{ text: '', fontSize: 38, textAlign: 'left', fontFace: 'RobotoBold'},
					LabelEdge:{ zIndex: 20, x: 0, y: 62, w: 1920, h: 3, rect: true, color: 0xFFF1F1F1 }
				},
				ListWrapper: { zIndex: 999,x: 173, y: 0, w: 1408, h: 80, clipping: true,
					BrowseMenuList: {zIndex: 20, x: 0 },
					ListEdge:{zIndex: 10, x: 0, y: 77, w: 1920, h: 3, rect: true, color: 0xFFF1F1F1 }
				}
			}
		}

		set label(v){
			this._label = v;
			if(this._label && this._label.length){
				this.tag('Label').patch({alpha: 1, text: {text: v}});
			}else{
				this.patch({ Label: { alpha: 0 }, ListWrapper: {x: 0, w: 1581 }});
			}
		}

		get label(){
			return this._label;
		}

		set labelWidth(v){
			this._labelWidth = v;
			if(this._label && this._label.length){
				this.patch({ Label: { alpha: 1, LabelEdge: {w: (v > 0) ? v : 0}}, ListWrapper: {x: (v > 0) ? (v + 25) : 0, w: (v > 0) ? (1581 - (v + 25)) : 1581}});
			}else{
				this.patch({ Label: { alpha: 0 }, ListWrapper: {x: 0 , w: 1581 }});
			}
		}

		get labelWidth(){
			return this._labelWidth;
		}

		set data(v){
			this._data = v;
			this.buildSubMenu();
		}

		get data(){
			return this._data;
		}

		buildSubMenu(){
			this.tag('Label').on('txLoaded', (tx)=>{
				this.labelWidth = this.tag('Label').renderWidth;
			});
			let menuItems = [];
			if(this.data) this.data.forEach((item) => {
				menuItems.push({ type: BrowseSubMenuButton, item: item.title });
			});
			if(menuItems.length){
				this.tag('BrowseMenuList').children = menuItems;
				this.signal('itemsInBrowseMenu', {available: true});
			}else{
				this.tag('BrowseMenuList').children = [];
				this.signal('itemsInBrowseMenu', {available: false});
			}

			let previousPosX = 20;
			let previousWidth = 0;
			let posX = 0;

			this.tag('BrowseMenuList').children.map((item)=>{
				posX = previousPosX + previousWidth;
				item.patch({ x: posX });
				previousWidth = item.itemWidth;
				previousPosX = posX;
			});
			this.resetIndex();
			this.highlightedMenuItem(this._index);
			this.fire('ready');
		}

		highlightedMenuItem(index){
			this.tag('BrowseMenuList').children.forEach((item, idx)=>{
				item.active = (index === idx);
			});
		}

		get index(){
			return this._index;
		}

		get active(){
			return this.tag('BrowseMenuList').children[this._index];
		}

		select(index){
			this.fire('select',{index});
		}

		resetIndex(){
			this._index = 0;
			this.fire('select', { index: 0 });
		}

		_getFocused(){
			switch(this.state){
				case 'BrowseMenuList':
					return this.active;
			}
		}

		static _states(){
			return {
				_init(){
					this._index = 0;
					this.resetIndex();
				},
				_focus(){
					return 'BrowseMenuList';
				},
				Loading:{
					_enter(){
						if(this.data){
							this.buildSubMenu();
						}else{
							this.label = '';
							this.tag('BrowseMenuList').children.length = 0;
							this.fire('ready');
						}
					},
					ready(){
						this.resetIndex();
						this.highlightedMenuItem(this._index);
						return 'BrowseMenuList';
					}
				},
				BrowseMenuList:{
					_enter(){
						this.fire('select', { index: 0 });
					},
					_handleEnter(){
						this.highlightedMenuItem(this._index);
						this.signal('onBrowseMenuSelect', {item: this.active.item});
					},
					_handleBack(){
						this.resetIndex();
						this.signal('onBackIsPressed');
					},
					_handleRight(){
						if(this._index < this.tag('BrowseMenuList').children.length -1){
							this.fire("select",{ index: this._index + 1 });
						}
					},
					_handleLeft(){
						if(this._index > 0){
							this.fire("select",{ index: this._index - 1 });
						}
					},
					_handleDown(){
						this.signal('browseMenuExitDown');
					},
					select({index}){
						this._index = index;
					}
				}
			}
		}
	}

	class Storage{
		constructor(){
			this._id = 0;
			this._storage = new Map();
		}

		store(title, link){
			this._storage.set(this._id, {title: title, link: link});
			this._id ++;
		}

		getPrevious(){
			let item = this._storage.get(this._id -2);
			this._storage.delete(this._id -1);
			this._id --;
			return item;
		}

		reset(){
			this._storage.clear();
			this._id = 0;
		}
	}

	class BrowsePage extends lng.Component{
		static _template(){
			return {
				x: 0, y: 260, w: 1920, h: 820, alpha: 1,
				BrowseMenu: { x: 170, y: 0, type: BrowseMenu, signals: { browseMenuExitDown: true, onBrowseMenuSelect: true, onBackIsPressed: true, itemsInBrowseMenu: true } },
				BrowseGrid: { x: 170, y: 140, type: BrowseGrid, signals: { onBrowseItemSelected: true, browseGridExitUp: true, onBackIsPressed: true } },
				BrowseText: { mount: 0.5, x: 960, y: 410, text: { text: '', color: 0xFFF1F1F1, fontSize: 32, textAlign: 'center', fontFace: 'RobotoRegular' } }
			};
		}

		get api(){
			return this.cparent.api;
		}

		_getFocused(){
			switch(this.state){
				case 'BrowseGrid':
					return this.tag('BrowseGrid');
				case 'BrowseMenu':
					return this.tag('BrowseMenu');
			}
		}

		set browseMenuAvailable(available){
			this._browseMenuAvailable = !!available;
		}

		get browseMenuAvailable(){
			return this._browseMenuAvailable;
		}

		showBrowseText(show, text){
			this.tag('BrowseText').patch({ alpha: show ? 1 : 0, text: { text: text ? text : 'empty' } });
		}

		updateMenuLabel(title){
			this.tag('BrowseMenu').label = title || '';
		}

		loadData(url, title){
			this._selectedCategoryId = 0;
			this.api.loadBrowseLink(url, title).then((data)=>{
				this._categories = data;
				this._categoryNames = this._categories.map((item)=>{
					return item.title;
				});
				if(this._categoryNames && this._categoryNames.length && this._categoryNames.length > 1){
					this.tag('BrowseMenu').data = this._categories;
				}else{
					this.tag('BrowseMenu').data = [];
				}
				this.updateGridAndMenu();
			});
		}

		onBrowseMenuItemSelect(item){
			if(this._categories && this._categories.length){
				this._categories.forEach((category, idx)=>{
					if(category.title === item){
						this._selectedCategoryId = idx;
					}
				});
			}
			this.updateGridAndMenu();
		}

		updateGridAndMenu(){
			if(this._categories[this._selectedCategoryId].listType === 'text'){
				this.tag('BrowseGrid').hide();
				this.showBrowseText(true, this._categories[this._selectedCategoryId].items[0].message);
				this.fire('returnToBrowseMenu');
			}else{
				this.tag('BrowseGrid').show();
				this.showBrowseText(false);
				this.tag('BrowseGrid').items = this._categories[this._selectedCategoryId];
				this.fire('returnToBrowseGrid');
			}
			this.updateMenuLabel(this._selectedTitle);
		}

		onBrowseGridItemSelect(item){
			if(item.type === 'link') this._breadCrumb.store(item.title, item.url);
			this._selectedTitle = item.title;
			if(item.itemType && (item.itemType === 'station' || item.itemType === 'topic')){
				this.signal('exitBrowserPageToPlayer', { item: item });
			}else{
				this.loadData(item.url, item.title);
			}
			this.tag('BrowseMenu').resetIndex();
		}

		setInitialData(){
			this._breadCrumb.reset();
			this.tag('BrowseMenu').label = 'Browse ';
			this.tag('BrowseMenu').data = [];
			this.browseMenuAvailable = false;
			this.tag('BrowseGrid').items = this.api.dataBrowseMenu;
		}

		static _states(){
			return {
				_init(){
					this._breadCrumb = new Storage();
				},
				_focus(){
					if(this.browseMenuAvailable){
						return 'BrowseMenu';
					}else{
						return 'BrowseGrid';
					}
				},
				returnToBrowseMenu(){
					return 'BrowseMenu';
				},
				returnToBrowseGrid(){
					return 'BrowseGrid';
				},
				reload(){
					this.setInitialData();
				},
				onBackIsPressed(){
					let prev = this._breadCrumb.getPrevious();
					if(prev){
						this._selectedTitle = prev.title;
						this.loadData(prev.link, prev.title);
					}else{
						this.tag('BrowseMenu').label = 'Browse ';
						this.tag('BrowseMenu').data = [];
						this.browseMenuAvailable = false;
						this.tag('BrowseGrid').show();
						this.showBrowseText(false);
						this.tag('BrowseGrid').items = this.api.dataBrowseMenu;
						return 'BrowseGrid';
					}
				},
				itemsInBrowseMenu({ available: available }){
					this.browseMenuAvailable = !!available;
				},
				BrowseMenu: {
					_exit(){
						this.tag('BrowseMenu').resetIndex();
					},
					_handleUp(){
						this.signal('exitBrowsePageUp');
					},
					browseMenuExitDown(){
						if(this._categories[this._selectedCategoryId].listType !== 'text' && this._categories[this._selectedCategoryId].items.length){
							return 'BrowseGrid';
						}
					},
					onBrowseMenuSelect({ item }){
						this.onBrowseMenuItemSelect(item);
					}
				},
				BrowseGrid: {
					onBrowseItemSelected({ item }){
						this.onBrowseGridItemSelect(item);
					},
					browseGridExitUp(){
						if(this.browseMenuAvailable){
							return 'BrowseMenu';
						}else{
							this.signal('exitBrowsePageUp');
						}
					}
				}
			};
		}
	}

	class KeyboardSearchDisplay extends lng.Component{
		static _template(){
			return { alpha: 1, x: 0, y: 0, w: 1580, h: 83,
				SearchIcon: { x: 0, y: 15, w: 50, h: 50, src: AppDefinition$1.getPath('images/searchIcon.png') },
				SearchText: { alpha: 0.5, x: 70, y: 10, w: 1510, h: 83, text: { text: 'Search...', fontSize: 48, color: 0xFFF1F1F1, textAlign: 'left', fontFace: 'RobotoRegular'}},
				Edge: { x: 0, y: 80, w: 1580, h: 3, rect: true, color: 0xFFF1F1F1 }
			};
		}

		set searchText(v){
			if(v){
				this.patch({SearchText: { alpha: 1, text: {text: v}}});
			}else{
				this.patch({SearchText: { alpha: 0.5, text: {text: 'Search...'}}});
			}
		}
	}

	class SearchResultGrid extends lng.Component{
		static _template(){
			return {
				SearchResultGrid: { x: 720, y: 140, h: 650 }
			};
		}

		set newSearchResults(v){
			this.fire('empty');
			this._gridXPosition = 720;
			this.rows = 3;
			const spacingX = 540;
			const spacingY = 185;
			const l = v.length;
			this.columns = ((l - (l % this.rows)) / this.rows) + 1;
			this.col = 0;
			this.row = 0;
			this.tag('SearchResultGrid').children = v.map((data, index)=>{
				return { type: StationButton, item: data, x: Math.floor(index / this.rows) * spacingX, y: index % this.rows * spacingY };
			});
			this.fire('filled');
		}

		calculateIndex(r = this.row, c = this.col){
			return c * this.rows + r;
		}

		set row(v){
			this._row = v;
		}

		get row(){
			return this._row;
		}

		set col(v){
			this._col = v;
		}

		get col(){
			return this._col;
		}

		set columns(v){
			this._columns = v;
		}

		get columns(){
			return this._columns;
		}

		get active(){
			return this.list[this.calculateIndex()];
		}

		get list(){
			return this.tag('SearchResultGrid').children;
		}

		_getFocused(){
			if(this.state === 'Filled'){
				return this.active;
			}
			return this;
		}

		static _states(){
			return {
				_init: function(){
					this._row = 0;
					this._col = 0;
					this._index = 0;
					this._gridXPosition = 170;
					this._gridContainsStations = true;
					return 'Empty';
				},
				_enter(){
					this.col = 0;
					this.row = 0;
					this._gridXPosition = 170;
					this.patch({
						SearchResultGrid: { smooth: { x: 170 } }
					});
				},
				_focus(){
					this.col = 0;
					this.row = 0;
					this._gridXPosition = 170;
					this.patch({
						SearchResultGrid: { smooth: { x: 170 } }
					});
				},
				_unfocus(){
					this.patch({
						SearchResultGrid: { smooth: { x: 720 } }
					});
				},
				empty: 'Empty',
				filled: 'Filled',
				Empty: {},
				Filled: {
					_handleEnter(){
						this.signal('goToPlayerPage', { item: this.active.item });
					},
					_handleBack(){
						if(this._index !== 0){
							this.col = 0;
							this.row = 0;
							this._gridXPosition = 170;
							this.patch({
								SearchResultGrid: { smooth: { x: 170 } }
							});
						}else{
							this.signal('searchResultGridExitLeft');
						}
					},
					_handleUp(){
						if(0 < this.row){
							this.row--;
						}else{
							this.col = 0;
							this.row = 0;
							this._gridXPosition = 720;
							this.signal('searchResultGridExitUp');

						}
						this.active.direction = 'up';
					},
					_handleDown(){
						const r = this.row + 1;
						const items = this.list;
						if(r < this.rows && this.calculateIndex(r, this.col) < items.length){
							this.row = r;
						}
						this.active.direction = 'down';
					},
					_handleRight(){
						const c = this.col + 1;
						const items = this.list;
						if(c < this.columns && this.calculateIndex(this.row, c) < items.length){
							if(!items[this.calculateIndex(this.row, c)]){
								this.row = (items.length - 1) % this.rows;
							}
							this.col = c;
							if(this.columns > 2 && this.col > 1){
								this._gridXPosition -= 540;
								this.patch({ SearchResultGrid: { smooth: { x: [this._gridXPosition, { duration: 0.2, delay: 0, timingFunction: 'linear' }] } } });
							}
						}
						this.active.direction = 'right';
					},
					_handleLeft(){
						if(0 < this.col){
							this.col = this.col - 1;
							if(this.columns > 2 && this.col > 0){
								this._gridXPosition += 540;
								this.patch({ SearchResultGrid: { smooth: { x: [this._gridXPosition, { duration: 0.2, delay: 0, timingFunction: 'linear' }] } } });
							}
						}else{
							this.signal('searchResultGridExitLeft');
						}
						this.active.direction = 'left';
					}
				}
			};
		}
	}

	class SearchPage extends lng.Component{
		static _template(){
			return {
				x: 0, y: 260, w: 1920, h: 820, alpha: 1,
				KeyboardSearchDisplay: { x: 170, y: 0, type: KeyboardSearchDisplay },
				Keyboard: { x: 170, y: 140, type: Keyboard, signals: { keyboardExitUp: true, keyboardExitRight: true, onKeyboardSelectKey: true, keyboardSpaceExitRight: true } },
				SearchResultGrid: { type: SearchResultGrid, signals: { searchResultGridExitLeft: true, searchResultGridExitUp: true, goToPlayerPage: true } },
				SearchResultGridInformationText: { x: 1150, y: 300, text: { text: 'NO RESULTS', color: 0xFFF1F1F1, fontSize: 38, textAlign: 'center', fontFace: 'RobotoRegular' } }
			};
		}

		get api(){
			return this.cparent.api;
		}

		set searchString(v){
			this._searchString = v;
		}

		get searchString(){
			return this._searchString;
		}

		searchAddCharacter(v){
			this.hideGrid(true);
			this.tag('SearchResultGridInformationText').patch({ text: { text: 'SEARCHING...' } });
			this.searchString += v;
			this.tag('KeyboardSearchDisplay').searchText = this.searchString;
			this.api.loadSearchedParams(this.searchString).then((stations)=>{
				if(stations.length && this.searchString.length > 0){
					this.tag('SearchResultGrid').newSearchResults = stations;
					this.hideGrid(false);
				}else{
					this.tag('SearchResultGridInformationText').patch({ text: { text: 'NO RESULTS' } });
					this.hideGrid(true);
				}
			});
		}

		searchRemoveCharacter(){
			this.hideGrid(true);
			if(!this.searchString.length){
				this.tag('SearchResultGridInformationText').patch({ text: { text: 'NO RESULTS' } });
				return;
			}else{
				this.tag('SearchResultGridInformationText').patch({ text: { text: 'SEARCHING...' } });
			}
			this.searchString = this.searchString.slice(0, this.searchString.length - 1);
			this.tag('KeyboardSearchDisplay').searchText = this.searchString;
			if(this.searchString.length){
				this.api.loadSearchedParams(this.searchString).then((stations)=>{
					if(stations.length && this.searchString.length > 0){
						this.tag('SearchResultGrid').newSearchResults = stations;
						this.hideGrid(false);
					}else{
						this.tag('SearchResultGridInformationText').patch({ text: { text: 'NO RESULTS' } });
						this.hideGrid(true);
					}
				});
			}else{
				this.tag('SearchResultGridInformationText').patch({ text: { text: 'NO RESULTS' } });
				this.tag('SearchResultGrid').newSearchResults = [];
				this.hideGrid(true);
			}
		}

		hideGrid(hide){
			this._gridHidden = hide;
			this.patch({ SearchResultGrid: { smooth: { alpha: hide ? 0 : 1 } }, SearchResultGridInformationText: { smooth: { alpha: hide ? 1 : 0 } } });
		}

		_getFocused(){
			switch(this.state){
				case 'Keyboard':
					return this.tag('Keyboard');
				case 'SearchResultGrid':
					return this.tag('SearchResultGrid');
			}
		}

		static _states(){
			return {
				_init: function(){
					let self = this;
					self._index = 0;
					self._gridHidden = true;
					self.searchString = '';
				},
				_focus(){
					return 'Keyboard';
				},
				_handleUp(){
					this.signal('exitToMainMenu');
				},
				SearchResultGrid: {
					searchResultGridExitLeft(){
						return 'Keyboard';
					},
					searchResultGridExitUp(){
						this.signal('exitToMainMenu');
						return 'Keyboard';
					},
					goToPlayerPage(item){
						this.signal('goToPlayerPage', item);
						this.tag('Keyboard').patch({ smooth: { alpha: 1 } });
					}
				},
				Keyboard: {
					_enter(){
						this.tag('Keyboard').patch({ smooth: { alpha: 1 } });
					},
					keyboardExitUp(){
						this.signal('exitToMainMenu');
					},
					keyboardExitRight(){
						if(!this._gridHidden){
							this.tag('Keyboard').patch({ smooth: { alpha: 0 } });
							return 'SearchResultGrid';
						}
					},
					keyboardSpaceExitRight(){
						if(!this._gridHidden){
							this.tag('Keyboard').patch({ smooth: { alpha: 0 } });
							return 'SearchResultGrid';
						}
					},
					onKeyboardSelectKey(data){
						if(data.character === 'backspace'){
							this.searchRemoveCharacter();
						}else{
							this.searchAddCharacter(data.character);
						}
					}
				}
			};
		}
	}

	class FollowButton extends lng.Component{
		static _template(){
			return {
				x: 0, y: 0, w: 300, h: 70, color: 0xFF2D314C, texture: lng.Tools.getRoundRect(300, 70, 35, 0, 0x00000000, true, 0xFFFFFFFF),
				FollowIcon: { x: 15, y: 20, w: 30, h: 30, src: AppDefinition$1.getPath('images/followIcon.png')},
				FollowLabel: { x: 77, y: 15, h: 70, text: { text: 'Follow', fontSize: 32, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 42, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 320 }}
			}
		};

		set followIcon(v){
			this._followIcon = v;
			this.tag('FollowIcon').patch({ src: AppDefinition$1.getPath(v)});
		}

		get followIcon(){
			return this._followIcon;
		}

		set followLabel(v){
			this._followLabel = v;
			this.tag('FollowLabel').patch({ text:{ text: v }});
		}

		get followLabel(){
			return this._followLabel;
		}

		initTagWidths(){
			this.followLabel = 'Following';
			this._followingSize = this.getWidthOfTag('FollowLabel');
			this.followLabel = 'Follow';
			this._followSize = this.getWidthOfTag('FollowLabel');
		}

		setButtonAsFollowing(){
			this.followIcon = 'images/followingIcon.png';
			this.followLabel = 'Following';
			let totalWidth =  45 + this._followingSize;
			let centerPoint = 150;
			let offset = centerPoint - (totalWidth / 2);

			this.patch({
				FollowIcon:{ smooth: { x: offset }},
				FollowLabel:{ smooth: { x: offset + 45 }}
			});
		}

		setButtonAsNotFollowing(){
			this.followIcon = 'images/followIcon.png';
			this.followLabel = 'Follow';
			let totalWidth =  45 + this._followSize;
			let centerPoint = 150;
			let offset = centerPoint - (totalWidth / 2);

			this.patch({
				FollowIcon:{ smooth: { x: offset }},
				FollowLabel:{ smooth: { x: offset + 45 }}
			});
		}

		getWidthOfTag(tagName){
			let tx = this.tag(tagName);
			tx.loadTexture();
			return Math.round(tx.renderWidth);
		}

		static _states(){
			return {
				_init(){
					this.initTagWidths();
					this.setButtonAsNotFollowing();
				},
				_focus(){
					this.patch({
						colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D,
						FollowLabel:{ color: 0xFF1C203C },
						FollowIcon:{ color: 0xFF1C203C }
					});
				},
				_unfocus(){
					this.patch({
						color: 0xFF2D314C,
						FollowLabel:{ color: 0xFFF1F1F1 },
						FollowIcon:{ color: 0xFFF1F1F1 }
					});
				}
			}
		}
	}

	class PlayerPage extends lng.Component{
		static _template(){
			return {
				Background: { w: 1920, h: 1080, rect: true, alpha: 0, color: 0xFF000000 },
				PlayerInterface: {
					x: 2500, y: 0, mountX: 1, w: 480, h: 1080,
					BackgroundTop: {
						x: 5, w: 480, h: 360, rect: true, color: 0xFF7E7E7E, type: lng.components.FastBlurComponent, amount: 3, transitions: { amount: { duration: 1.4 } },
						content: { BackgroundTopImage: { w: 480, h: 360, scale: 1, color: 0xFF7E7E7E, src: AppDefinition$1.getPath('images/missingImage.png'), transitions: { scale: { duration: 0.4 } } } }
					},
					BackgroundBottom: { x: 0, y: 360, w: 480, h: 720, src: AppDefinition$1.getPath('images/playerBottomBackground.png') },
					StationIcon: { x: 150, y: 90, w: 180, h: 180, rect: true, color: 0xFFFFFFFF },
					PlayerButton: {
						x: 30, y: 320, w: 80, h: 80, color: 0xFF2D314C, texture: lng.Tools.getRoundRect(80, 80, 40, 0, 0x00000000, true, 0xFFFFFFFF),
						LoadIcon:{ alpha: 0, mount: 0.5, x: 41, y: 41, w: 48, h: 48, color: 0xFF000000, src: AppDefinition$1.getPath('images/loaderIcon.png') },
						PlayIcon: { alpha: 1, mount: 0.5, x: 43, y: 42, w: 50, h: 50, color: 0xFF000000, src: AppDefinition$1.getPath('images/playIcon.png') },
						StopIcon: { alpha: 0, mount: 0.5, x: 41, y: 42, w: 40, h: 40, color: 0xFF000000, src: AppDefinition$1.getPath('images/stopIcon.png') }
					},
					FollowButton: { type: FollowButton, x: 120, y: 325 },
					StationTitle: { x: 30, y: 425, w: 400, type: ScrollingText },
					TextFade: { alpha: 1,
						Left: { alpha: 1, x: 25, y: 425, w: 20, h: 70, src: AppDefinition$1.getPath('images/TextFadePlayerLeft.png') },
						Right: { alpha: 1, mountX: 1, x: 445, y: 425, w: 40, h: 70, src: AppDefinition$1.getPath('images/TextFadePlayerRight.png') }
					},
					StationDescriptionLabel: { x: 40, y: 527, w: 400, h: 120, color: 0xFF878BA8, text: { text: 'Description', fontSize: 32, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 38, maxLines: 2, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 400 } },
					NowPlayingInformationBox: {
						x: 20, y: 775, w: 420, h: 255, texture: lng.Tools.getRoundRect(420, 255, 10, 0, 0xFF14172B, true, 0xFF14172B),
						NowPlayingImage: { x: 20, y: -85, w: 170, h: 170 },
						NowPlayingLabel: { x: 20, y: 119, w: 390, color: 0xFF878BA8, text: { text: 'NOW PLAYING', fontSize: 22, textAlign: 'left', fontFace: 'RobotoBold', lineHeight: 25, maxLines: 1, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 390 } },
						NowPlayingDescriptionLabel: { x: 20, y: 154, w: 390, color: 0xFFF1F1F1, text: { text: 'Description', fontSize: 32, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 40, maxLines: 2, maxLinesSuffix: '...', wordWrap: true, wordWrapWidth: 390 } }
					}
				},
				ErrorMessage: { type: ErrorMessageAsset, y: 0 }
			};
		}

		onPlayerStateChange(state){
			switch(state){
				case 'error':
					this.tag('ErrorMessage').show('Stream interrupted');
					this.setPlayButtonState('play');
					break;
				case 'loading':
					this.setPlayButtonState('loading');
					break;
				case 'loaded':
					this.tag('StationTitle').start();
					break;
				case 'play':
				case 'playing':
				case 'start':
					this.setPlayButtonState('stop');
					break;
				case 'pause':
				case 'stop':
				case 'ended':
					this.setPlayButtonState('play');
					break;
			}
		}

		showPage(show){
			this.patch({
				Background: { smooth: { alpha: show ? 0.7 : 0 } },
				PlayerInterface: { smooth: { x: show ? 1920 : 2500 } }
			});
		}

		get api(){
			return this.cparent.api;
		}

		set station(v){
			this._station = v;
		}

		get station(){
			return this._station;
		}

		set followAvailable(v){
			this._followAvailable = v;
		}

		get followAvailable(){
			return this._followAvailable;
		}

		set item(v){
			this.api.recentlyViewed = v;
			this.station = v;
			this._currentStreamUrl = null;
			this._currentGuideId = null;
			this.tag('StationTitle').scrollText = {
				title: v.title || '',
				fontSize: 56,
				lineHeight: 60,
				width: 400,
				fontType: 'RobotoBold'
			};
			this.patch({
				PlayerInterface: {
					BackgroundTop: { smooth: { amount: [3, { duration: 0.2 }] }, content: { BackgroundTopImage: { src: ux$1.Ui.getImageUrl(this.station.blockImage, { width: 480, height: 360, type: 'crop' }) || AppDefinition$1.getPath('images/missingImage.png') } } },
					StationIcon: { src: ux$1.Ui.getImageUrl(this.station.blockImage, { width: 180, height: 180, type: 'crop' }) },
					StationDescriptionLabel: { text: { text: this.station.subText } },
					NowPlayingInformationBox: {
						NowPlayingImage: { src: ux$1.Ui.getImageUrl(this.station.currentTrackBlockImage, { width: 170, height: 170, type: 'crop' }) },
						NowPlayingDescriptionLabel: { text: { text: this.station.currentTrack } }
					}
				}
			});
		}


		setPlayButtonState(status){
			this._playerState = status;
			switch(status){
				case 'loading':
					this.tag('PlayerButton').patch({
						LoadIcon:{ alpha: 1 },
						PlayIcon:{ alpha: 0 },
						StopIcon:{ alpha: 0 }
					});
					this._loadingAnimation.start();
					break;
				case 'play':
					this.tag('PlayerButton').patch({
						LoadIcon:{ alpha: 0 },
						PlayIcon:{ alpha: 1 },
						StopIcon:{ alpha: 0 }
					});
					this._loadingAnimation.stop();
					break;
				case 'stop':
					this.tag('PlayerButton').patch({
						LoadIcon:{ alpha: 0 },
						PlayIcon:{ alpha: 0 },
						StopIcon:{ alpha: 1 }
					});
					this._loadingAnimation.stop();
					break;
			}
		}

		get playerState(){
			return this._playerState;
		}

		setPlayerPageAttributes(){
			if(this.api.isLoggedIn){
				if(this.station.itemType === 'station'){
					this.tag('FollowButton').patch({ alpha: 1 });
					this.followAvailable = true;
					if(this.api.checkIfExistInFavorites(this.station)){
						this.tag('FollowButton').setButtonAsFollowing();
					}else{
						this.tag('FollowButton').setButtonAsNotFollowing();
					}

				}else{
					this.tag('FollowButton').patch({ alpha: 0 });
					this.tag('FollowButton').setButtonAsNotFollowing();
					this.followAvailable = false;
				}
			}else{
				this.tag('FollowButton').patch({ alpha: 0 });
				this.tag('FollowButton').setButtonAsNotFollowing();
				this.followAvailable = false;
			}
		}

		_getFocused(){
			switch(this.state){
				case 'Follow':
					return this.tag('FollowButton');
			}
		}

		static _states(){
			return {
				_init(){
					this._loadingAnimation = this.tag('LoadIcon').animation({
						duration: 2, delay: 0, repeat: -1, stopMethod: 'immediate', actions: [
							{ p: 'rotation', v: { 0: { v: 0, sm: 0 }, 1: { v: Math.PI * 2, sm: 0 } } }
						]
					});
				},
				_focus(){
					this.setPlayButtonState('stop');
					this.setPlayerPageAttributes();
					return 'PlayerInterface';
				},
				_unfocus(){
					this.tag('StationTitle').stop();
					this._loadingAnimation.stop();
				},
				Follow: {
					_handleEnter(){
						if(this.api.isLoggedIn){
							if(this.api.checkIfExistInFavorites(this.station)){
								this.api.removeFavorite(this.station);
								this.tag('FollowButton').setButtonAsNotFollowing();
							}else{
								this.api.addFavorite(this.station);
								this.tag('FollowButton').setButtonAsFollowing();
							}

							this.signal('onPressFollow');
						}
					},
					_handleLeft(){
						return 'PlayerInterface';
					}
				},
				PlayerInterface: {
					_enter(){
						this.patch({
							PlayerInterface: {
								PlayerButton: {
									colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D,
									PlayIcon: { color: 0xFF1C203C },
									StopIcon: { color: 0xFF1C203C }
								}
							}
						});
					},
					_exit(){
						this.patch({
							PlayerInterface: {
								PlayerButton: {
									color: 0xFF2D314C,
									PlayIcon: { color: 0xFFF1F1F1 },
									StopIcon: { color: 0xFFF1F1F1 }
								}
							}
						});
					},
					_handleRight(){
						if(this.followAvailable) return 'Follow';
					},
					_handleLeft(){
						this.signal('onPlayerExit');
					},
					_handleEnter(){
						if(this.api.audioIsPlaying){
							this.signal('playerPageOnPressStop');
						}else{
							this.signal('playerPageOnPressPlay');
						}
					}
				}
			};
		}
	}

	class Equalizer extends lng.Component{
		static _template(){
			return {
				x: 0, y: 0, w: 40, h: 50,
				EqualizerBars: {
					BarLeftBottomCutOff:{ x: 0, y: -4, w: 8, h: 8, rect: true, color: 0xFFF1F1F1, texture: lng.Tools.getRoundRect(9, 9, 5, 0, 0x00000000, true, 0xFFFFFFFF) },
					BarLeft: { mountY: 1, x: 0, y: 0, w: 8, h: 50, rect: true, color: 0xFFF1F1F1 },
					BarLeftTopCutOff:{ x: 0, y: -8, w: 8, h: 8, rect: true, color: 0xFFF1F1F1, texture: lng.Tools.getRoundRect(9, 9, 5, 0, 0x00000000, true, 0xFFFFFFFF) },
					BarMiddleBottomCutOff:{ x: 16, y: -4, w: 8, h: 8, rect: true, color: 0xFFF1F1F1, texture: lng.Tools.getRoundRect(9, 9, 5, 0, 0x00000000, true, 0xFFFFFFFF) },
					BarMiddle: { mountY: 1, x: 16, y: 0, w: 8, h: 50, rect: true, color: 0xFFF1F1F1 },
					BarMiddleTopCutOff:{ x: 16, y: -8, w: 8, h: 8, rect: true, color: 0xFFF1F1F1, texture: lng.Tools.getRoundRect(9, 9, 5, 0, 0x00000000, true, 0xFFFFFFFF)},
					BarRightBottomCutOff:{ x: 32, y: -4, w: 8, h: 8, rect: true, color: 0xFFF1F1F1, texture: lng.Tools.getRoundRect(9, 9, 5, 0, 0x00000000, true, 0xFFFFFFFF) },
					BarRight: { mountY: 1, x: 32, y: 0, w: 8, h: 50, rect: true, color: 0xFFF1F1F1 },
					BarRightTopCutOff:{ x: 32, y: -8, w: 8, h: 8, rect: true, color: 0xFFF1F1F1, texture: lng.Tools.getRoundRect(9, 9, 5, 0, 0x00000000, true, 0xFFFFFFFF)}
				}
			};
		}

		start(){
			this._equalizerAnimation.start();
		}

		stop(){
			this._equalizerAnimation.stop();
			this.patch({
				EqualizerBars: {
					BarLeft: { smooth: { h: 4 } },
					BarLeftTopCutOff:{ y: -8 },
					BarMiddle: { smooth: { h: 4 } },
					BarMiddleTopCutOff:{ y: -8 },
					BarRight: { smooth: { h: 4 } },
					BarRightTopCutOff:{ y: -8 }
				}
			});
		}

		static _states(){
			return {
				_init(){
					this._equalizerAnimation = this.tag('EqualizerBars').animation({
						duration: 1, repeat: -1, stopMethod: 'immediate', actions: [
							{ t: 'BarLeft', p: 'h', v: { 0: 4, 0.5: 30, 1: 4 } },
							{ t: 'BarLeftTopCutOff', p: 'y', v: { 0: -8, 0.5: -34, 1: -8 } },
							{ t: 'BarMiddle', p: 'h', v: { 0: 40, 0.7: 20, 1: 40 } },
							{ t: 'BarMiddleTopCutOff', p: 'y', v: { 0: -44, 0.7: -24, 1: -44 } },
							{ t: 'BarRight', p: 'h', v: { 0: 10, 0.2: 40, 1:10 } },
							{ t: 'BarRightTopCutOff', p: 'y', v: { 0: -14, 0.2: -44, 1: -14 } },
						]
					});
				}
			};
		}
	}

	class NowPlayingButton extends lng.Component{
		static _template(){
			return { alpha: 1, x: 0, y: 0, w: 580, h: 100,
				DropShadow:{ alpha: 0.1, x: -8, y: -8, w: 596, h: 116, rect: true, color: 0xFF000000, texture: lng.Tools.getShadowRect(596, 116, 8, 2)},
				MusicPlayingBackground:{ w: 100, h:100, rect: true, color: 0xFF000000 },
				MusicPlayingIcon: { type: Equalizer, x: 32, y: 73 },
				ImageBackground:{ alpha: 1, x: 100, w: 100, h: 100, rect: true, color: 0xFFF1F1F1 },
				Image: { alpha: 1, x: 100, w: 100, h: 100, rect: true, color: 0xFFFFFFFF, src: AppDefinition$1.getPath('images/missingImage.png')},
				DescriptionBackground:{ alpha: 1, x: 200, w: 380, h: 100, rect: true, color: 0xFF242843 },
				StationLabel: {x: 220, y: 15, w: 320, type: ScrollingText},
				TextFadeWrapper:{
					TextFadeHighlight: { alpha: 0,
						Left: { alpha: 1, x: 220, y: 10, w: 10, h: 55, src: AppDefinition$1.getPath('images/TextFadeMiniPlayerHighlightLeft.png') },
						Right: { alpha: 1, mountX: 1, x: 550, y: 10, w: 20, h: 55, src: AppDefinition$1.getPath('images/TextFadeMiniPlayerHighlightRight.png') }
					},
					TextFade: { alpha: 1,
						Left: { alpha: 1, x: 220, y: 10, w: 10, h: 55, src: AppDefinition$1.getPath('images/TextFadeLeft.png') },
						Right: { alpha: 1, mountX: 1, x: 550, y: 10, w: 20, h: 55, src: AppDefinition$1.getPath('images/TextFadeRight.png') }
					}
				},
				DescriptionLabel: { x: 230, y: 55, w: 320, color: 0xFF878BA8, text:{ text: 'Description', fontSize: 26, textAlign: 'left', fontFace: 'RobotoRegular', lineHeight: 30, maxLines: 1, maxLinesSuffix: '...', wordWrap: false, wordWrapWidth: 320}}
			};
		}

		setVisible(visible){
			if(visible){
				this.patch({ alpha: 1 });
				this.tag('MusicPlayingIcon').start();
			}else{
				this.patch({ alpha: 0 });
				this.tag('MusicPlayingIcon').stop();
			}
		}

		get item(){
			return this._item;
		}

		set item(v){
			this._item = v;
			this.patch({
				Image: { src: ux.Ui.getImageUrl(v.blockImage, { width: 100, height: 100, type: 'crop'})},
				DescriptionLabel: { text: { text: v.subText || '' }}
			});
			this.tag('StationLabel').scrollText = {
				title: v.title || '',
				fontSize: 32,
				lineHeight: 42,
				width: 320,
				fontType: 'RobotoCondensedBold'
			};
			this.tag('Image').on('txError', ()=>{
				this.patch({ Image: { src: AppDefinition$1.getPath('images/missingImage.png') }});
			});
		}

		set Image(v){
			this.patch({
				Image:{ src: AppDefinition$1.getPath(v)}
			});
		}

		static _states(){
			return {
				_init(){
					this._shadeHighlightShow = this.tag('TextFadeWrapper').animation({
						duration: 0.2, delay: 0, repeat: 0, stopMethod: 'immediate', actions: [
							{t: 'TextFade', p: 'alpha', v: {0: {v: 1, sm: 0}, 0.1: 0, 1: {v: 0, sm: 0}}},
							{t: 'TextFadeHighlight', p: 'alpha', v: {0: {v: 0, sm: 1}, 0.8: 0, 1: {v: 1, sm: 1}}}
						]
					});
					this._shadeHighlightHide = this.tag('TextFadeWrapper').animation({
						duration: 0, delay: 0, repeat: 0, stopMethod: 'immediate', actions: [
							{t: 'TextFade', p: 'alpha', v: {0: {v: 0, sm: 0}, 1: {v: 1, sm: 0}}},
							{t: 'TextFadeHighlight', p: 'alpha', v: {0: {v: 1, sm: 0}, 1: {v: 0, sm: 0}}}
						]
					});
				},
				_focus(){
					this.tag('StationLabel').start();
					this._shadeHighlightHide.stop();
					this._shadeHighlightShow.start();
					this.patch({ MusicPlayingBackground:{ colorTop: 0xFF226460, colorBottom: 0xFF0A4844 }, StationLabel:{ color: 0xFF1C203C}, DescriptionLabel:{ color: 0xFFFFFFFF }, DescriptionBackground:{colorTop: 0xFF45DCD3, colorBottom: 0xFF11988D}});
				},
				_unfocus(){
					this.tag('StationLabel').stop();
					this._shadeHighlightShow.stop();
					this._shadeHighlightHide.start();
					this.patch({ MusicPlayingBackground:{ color: 0xFF000000 }, StationLabel:{ color: 0xFFF1F1F1}, DescriptionLabel:{ color: 0xFF878BA8 }, DescriptionBackground:{ color: 0xFF242843}});
				}
			};
		}
	}

	class MediaPlayer extends lng.Component{
		static _template(){
			return {};
		}

		get api(){
			return this.cparent.api;
		}

		get mediaPlayer(){
			return this.application.mediaplayer;
		}

		play(item){
			let newUrl = item.url; //ux.Ui.getProxyUrl(`${item.url}`); //With proxy seems to fail on RaspberryPi
			(newUrl !== this._item) ? (this.item = item.url) : (this.item = this._item );
		}

		stop(){
			this._stream = '';
			this.application.updateFocusSettings();
		}

		set item(v){
			let newUrl = v; //ux.Ui.getProxyUrl(`${v}`); //With proxy seems to fail on RaspberryPi
			this._item = v;
			this._stream = newUrl;
			this.application.updateFocusSettings();
		}

		getMediaplayerSettings(){
			return {
				stream: {
					src: this._stream
				}
			};
		}

		static _states(){
			return {
				$mediaplayerError(err){
					//console.log('Player error: ', err);
					this.signal('onPlayerStateChange', { state: 'error' });
					this.api.audioIsPlaying = false;
				},
				$mediaplayerLoad(){
					this.signal('onPlayerStateChange', { state: 'loading' });
					this.api.audioIsPlaying = false;
				},
				$mediaplayerLoadedData(){
					this.signal('onPlayerStateChange', { state: 'loaded' });
					this.api.audioIsPlaying = false;
				},
				$mediaplayerStart(){
					this.signal('onPlayerStateChange', { state: 'start' });
					this.api.audioIsPlaying = false;
				},
				$mediaplayerPlay(){
					this.signal('onPlayerStateChange', { state: 'play' });
					this.api.audioIsPlaying = true;
				},
				$mediaplayerPlaying(){
					this.signal('onPlayerStateChange', { state: 'playing' });
					this.api.audioIsPlaying = true;
				},
				$mediaplayerPause(){
					this.signal('onPlayerStateChange', { state: 'pause' });
					this.api.audioIsPlaying = false;
				},
				$mediaplayerStop(){
					this.signal('onPlayerStateChange', { state: 'stop' });
					this.api.audioIsPlaying = false;
				},
				$mediaplayerEnded(){
					this.signal('onPlayerStateChange', { state: 'ended' });
					this.api.audioIsPlaying = false;
				}
			};
		}
	}

	class MainPage extends lng.Component{
		static _template(){
			return {
				alpha: 1, src: AppDefinition$1.getPath('images/generalBackground.png'),
				Player: { type: MediaPlayer, signals: { onPlayerStateChange: true } },
				MainMenu: { type: MainMenu, x: 170, y: 137, signals: { menuItemSelected: true, mainMenuExitRight: true, mainMenuExitUp: true } },
				NowPlayingButton: { x: 1250, y: 60, alpha: 0, type: NowPlayingButton },
				HomePage: { type: HomePage, signals: { exitToMainMenu: true, onExclusiveSelectGoToPlayer: true, onRecentListSelectGoToPlayer: true } },
				ProfilePage: { alpha: 0, type: ProfilePage, signals: { exitToMainMenu: true, profilePageExitUp: true, onFavoriteSelectGoToPlayer: true } },
				BrowsePage: { alpha: 0, type: BrowsePage, signals: { exitToMainMenu: true, openStation: true, exitBrowsePageUp: true, exitBrowserPageToPlayer: true } },
				SearchPage: { alpha: 0, type: SearchPage, signals: { exitToMainMenu: true, goToPlayerPage: true } },
				PlayerPage: { alpha: 1, zIndex: 999, type: PlayerPage, signals: { playerPageOnPressPlay: true, playerPageOnPressStop: true, onPressFollow: true, onPlayerExit: true } }
			};
		}

		get api(){
			return this.cparent.api;
		}

		set nowPlayingItem(v){
			this._nowPlayingItem = v;
			this.tag('MainPage').nowPlayingButtonValues = v;
		}

		get nowPlayingItem(){
			return this._nowPlayingItem;
		}

		loadStream(v){
			this.api.loadStream(v.url, v.guideId).then((streamUrl)=>{
				this.nowPlayingItem = v;
				this.tag('Player').item = streamUrl;
				this.tag('PlayerPage').item = v;
				this.displayActivePage('PlayerPage');
			});
		}

		onPlayerStateChange(state){
			this.tag('PlayerPage').onPlayerStateChange(state);
			switch(state){
				case 'play':
				case 'start':
					this.nowPlayingButtonVisible = true;
					break;
				case 'loading':
				case 'loaded':
				case 'pause':
				case 'stop':
				case 'ended':
					this.nowPlayingButtonVisible = false;
					break;
			}
		}

		set nowPlayingButtonValues(v){
			if(v) this.tag('NowPlayingButton').item = v;
		}

		set nowPlayingButtonVisible(visible){
			if(visible){
				this._nowPlayingButtonVisible = true;
				this.tag('NowPlayingButton').setVisible(true);
			}else{
				this._nowPlayingButtonVisible = false;
				this.tag('NowPlayingButton').setVisible(false);
			}
		}

		get nowPlayingButtonVisible(){
			return this._nowPlayingButtonVisible;
		}

		_getFocused(){
			switch(this.state){
				case 'MainMenu':
					return this.tag('MainMenu');
				case 'HomePage':
					return this.tag('HomePage');
				case 'ProfilePage':
					return this.tag('ProfilePage');
				case 'BrowsePage':
					return this.tag('BrowsePage');
				case 'SearchPage':
					return this.tag('SearchPage');
				case 'PlayerPage':
					return this.tag('PlayerPage');
				case 'NowPlayingButton':
					return this.tag('NowPlayingButton');
			}
		}

		displayActivePage(state){
			if(state === 'MainMenu' || state === 'NowPlayingButton') return this.fire('setNewState', { state: state });
			this.children.forEach((element)=>{
				if(element.ref !== 'MainMenu' && element.ref !== 'NowPlayingButton'){
					if(element.ref === state){
						if(state !== 'PlayerPage'){
							this._currentPage = state;
							element.patch({ alpha: 1 });
						}else{
							this.tag('PlayerPage').showPage(true);
						}
						if(state === 'ProfilePage') this.tag('ProfilePage').updateFavorites();
						this._previousVisitedPage = this._currentPage;
						this.nowPlayingButtonVisible = !!this.api.audioIsPlaying;
					}else{
						if(element.ref !== 'PlayerPage' && state !== 'PlayerPage'){
							element.patch({ alpha: 0 });
						}
						this.tag('PlayerPage').showPage(false);
						this.nowPlayingButtonVisible = !!this.api.audioIsPlaying;
					}
				}
			});
			this.fire('setNewState', { state: state });
		}

		_setFocusSettings(settings){
			settings.mediaplayer.consumer = this.tag('Player');
		}

		static _states(){
			return {
				_init: function(){
					this._currentPage = 'HomePage';
					return 'HomePage';
				},
				exitToMainMenu(){
					this.displayActivePage('MainMenu');
				},
				goToPlayerPage({ item }){
					this.loadStream(item);
				},
				mainMenuExitRight(){
					if(this.nowPlayingButtonVisible) this.displayActivePage('NowPlayingButton');
				},
				mainMenuExitUp(){
					if(this.nowPlayingButtonVisible) this.displayActivePage('NowPlayingButton');
				},
				setNewState({ state }){
					return state;
				},
				onPlayerStateChange({ state }){
					this.onPlayerStateChange(state);
				},
				MainMenu: {
					_handleDown(){
						return this._currentPage;
					},
					menuItemSelected(menuItem){
						if(menuItem.name === 'Browse'){
							this.tag('BrowsePage').setInitialData();
						}
						this.displayActivePage(`${menuItem.name}Page`);
					}
				},
				HomePage: {
					onExclusiveSelectGoToPlayer({ item }){
						this.loadStream(item);
					},
					onRecentListSelectGoToPlayer({ item }){
						this.loadStream(item);
					}
				},
				ProfilePage: {
					profilePageExitUp(){
						this.displayActivePage('MainMenu');
					},
					onFavoriteSelectGoToPlayer({ item }){
						this.loadStream(item);
					}
				},
				BrowsePage: {
					openStation({ station }){
						this.api.loadBrowseLink(station.url);
					},
					exitBrowsePageUp(){
						this.displayActivePage('MainMenu');
					},
					exitBrowserPageToPlayer({ item }){
						this.loadStream(item);
					}
				},
				SearchPage: {},
				PlayerPage: {
					_handleBack(){
						this.displayActivePage(this._previousVisitedPage);
					},
					onPlayerExit(){
						this.displayActivePage(this._previousVisitedPage);
					},
					playerPageOnPressPlay(){
						this.loadStream(this.nowPlayingItem);
					},
					playerPageOnPressStop(){
						this.tag('Player').stop();
					},
					onPressFollow(){
						this.tag('ProfilePage').updateFavorites();
					}
				},
				NowPlayingButton: {
					_handleLeft(){
						this.displayActivePage('MainMenu');
					},
					_handleDown(){
						this.displayActivePage('MainMenu');
					},
					_handleEnter(){
						this.displayActivePage('PlayerPage');
					}
				}
			};
		}
	}

	class TuneInApp extends lng.Component{
		static _template(){
			return {
				SplashPage: { type: WelcomeMenu, alpha: 0, x: 0, y: 0 },
				MainPage: { type: MainPage, alpha: 0, x: 0, y: 0 },
				ErrorMessage: { type: ErrorMessageAsset, y: 0 }
			};
		}

		static getFonts(){
			return [
				{ family: 'RobotoRegular', url: AppDefinition$1.getPath('fonts/Roboto-Regular.ttf'), descriptors: {} },
				{ family: 'RobotoBold', url: AppDefinition$1.getPath('fonts/Roboto-Bold.ttf'), descriptors: {} },
				{ family: 'RobotoCondensedRegular', url: AppDefinition$1.getPath('fonts/RobotoCondensed-Regular.ttf'), descriptors: {} },
				{ family: 'RobotoCondensedBold', url: AppDefinition$1.getPath('fonts/RobotoCondensed-Bold.ttf'), descriptors: {} }
			];
		}

		get api(){
			return this._api;
		}

		static _states(){
			return {
				_init: function(){
					this.tag('MainPage').nowPlayingButtonVisible = false;
					this._api = new Api;
					return 'SplashPage';
				},
				SplashPage: {
					_enter(){
						this.patch({ SplashPage: { alpha: 1 } });
						this._api.initialize().then((success)=>{
							if(success){
								this.fire('initializationDone');
							}else{
								this.tag('ErrorMessage').show('Failed to load data');
							}
						});
					},
					initializationDone(){
						this.patch({ SplashPage: { smooth: { alpha: 0 } } });
						return 'MainPage';
					}
				},
				MainPage: {
					_enter(){
						this.patch({ MainPage: { alpha: 1 } });
					},
					_exit(){
						this.patch({ MainPage: { alpha: 0 } });
					}
				}
			};
		}

		_getFocused(){
			switch(this.state){
				case 'SplashPage':
					return this.tag('SplashPage');
				case 'MainPage':
					return this.tag('MainPage');
				case 'NowPlayingButton':
					return this.tag('NowPlayingButton');
			}
		}

	}

	class AppDefinition$1 extends ux.AppDefinition{

		static get identifier(){
			return 'com.metrological.app.TuneIn';
		}

		getAppViewType(){
			return TuneInApp;
		}
	}

	return AppDefinition$1;

}());
