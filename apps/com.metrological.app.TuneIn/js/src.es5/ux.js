"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ux = function () {
  'use strict';

  var Mediaplayer =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(Mediaplayer, _lng$Component);

    function Mediaplayer() {
      _classCallCheck(this, Mediaplayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(Mediaplayer).apply(this, arguments));
    }

    _createClass(Mediaplayer, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        this.videoEl = document.createElement('video');
        this.videoEl.setAttribute('id', 'video-player');
        this.videoEl.style.position = 'absolute';
        this.videoEl.style.zIndex = '1';
        this.videoEl.setAttribute('width', '100%');
        this.videoEl.setAttribute('height', '100%');
        this.videoEl.style.visibility = this.textureMode ? 'hidden' : 'visible';

        if (this.textureMode) {
          this._createVideoTexture();
        }

        var events = ['timeupdate', 'error', 'ended', 'loadeddata', 'canplay', 'play', 'playing', 'pause', 'loadstart', 'seeking', 'seeked', 'encrypted'];
        events.forEach(function (event) {
          _this.videoEl.addEventListener(event, function (e) {
            _this.fire(event, {
              videoElement: _this.videoEl,
              event: e
            });
          });
        });
        document.body.appendChild(this.videoEl);
      }
    }, {
      key: "_createVideoTexture",
      value: function _createVideoTexture() {
        var stage = this.stage;
        var gl = stage.gl;
        var glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.videoTexture.options = {
          source: glTexture,
          w: this.videoEl.width,
          h: this.videoEl.height
        };
      }
    }, {
      key: "_startUpdatingVideoTexture",
      value: function _startUpdatingVideoTexture() {
        var _this2 = this;

        if (this.textureMode) {
          var stage = this.stage;

          if (!this._updateVideoTexture) {
            this._updateVideoTexture = function () {
              if (_this2.videoTexture.options.source && _this2.videoEl.videoWidth && _this2.active) {
                var gl = stage.gl;
                var currentTime = new Date().getTime(); // When BR2_PACKAGE_GST1_PLUGINS_BAD_PLUGIN_DEBUGUTILS is not set in WPE, webkitDecodedFrameCount will not be available.
                // We'll fallback to fixed 30fps in this case.

                var frameCount = _this2.videoEl.webkitDecodedFrameCount;
                var mustUpdate = frameCount ? _this2._lastFrame !== frameCount : _this2._lastTime < currentTime - 30;

                if (mustUpdate) {
                  _this2._lastTime = currentTime;
                  _this2._lastFrame = frameCount;

                  try {
                    gl.bindTexture(gl.TEXTURE_2D, _this2.videoTexture.options.source);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _this2.videoEl);
                    _this2._lastFrame = _this2.videoEl.webkitDecodedFrameCount;
                    _this2.videoTextureView.visible = true;
                    _this2.videoTexture.options.w = _this2.videoEl.videoWidth;
                    _this2.videoTexture.options.h = _this2.videoEl.videoHeight;
                    var expectedAspectRatio = _this2.videoTextureView.w / _this2.videoTextureView.h;
                    var realAspectRatio = _this2.videoEl.videoWidth / _this2.videoEl.videoHeight;

                    if (expectedAspectRatio > realAspectRatio) {
                      _this2.videoTextureView.scaleX = realAspectRatio / expectedAspectRatio;
                      _this2.videoTextureView.scaleY = 1;
                    } else {
                      _this2.videoTextureView.scaleY = expectedAspectRatio / realAspectRatio;
                      _this2.videoTextureView.scaleX = 1;
                    }
                  } catch (e) {
                    console.error('texImage2d video', e);

                    _this2._stopUpdatingVideoTexture();

                    _this2.videoTextureView.visible = false;
                  }

                  _this2.videoTexture.source.forceRenderUpdate();
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
    }, {
      key: "_stopUpdatingVideoTexture",
      value: function _stopUpdatingVideoTexture() {
        if (this.textureMode) {
          var stage = this.stage;
          stage.removeListener('frameStart', this._updateVideoTexture);
          this._updatingVideoTexture = false;
          this.videoTextureView.visible = false;

          if (this.videoTexture.options.source) {
            var gl = stage.gl;
            gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
        }
      }
    }, {
      key: "updateSettings",
      value: function updateSettings() {
        var _this3 = this;

        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // The Component that 'consumes' the media player.
        this._consumer = settings.consumer;

        if (this._consumer && this._consumer.getMediaplayerSettings) {
          // Allow consumer to add settings.
          settings = Object.assign(settings, this._consumer.getMediaplayerSettings());
        }

        if (!lng.Utils.equalValues(this._stream, settings.stream)) {
          if (settings.stream && settings.stream.keySystem) {
            navigator.requestMediaKeySystemAccess(settings.stream.keySystem.id, settings.stream.keySystem.config).then(function (keySystemAccess) {
              return keySystemAccess.createMediaKeys();
            }).then(function (createdMediaKeys) {
              return _this3.videoEl.setMediaKeys(createdMediaKeys);
            }).then(function () {
              if (settings.stream && settings.stream.src) _this3.open(settings.stream.src);
            }).catch(function () {
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
    }, {
      key: "_setHide",
      value: function _setHide(hide) {
        if (this.textureMode) {
          this.tag("Video").setSmooth('alpha', hide ? 0 : 1);
        } else {
          this.videoEl.style.visibility = hide ? 'hidden' : 'visible';
        }
      }
    }, {
      key: "open",
      value: function open(url) {
        console.log('Playing stream', url);

        if (this.application.noVideo) {
          console.log('noVideo option set, so ignoring: ' + url);
          return;
        }

        if (this.videoEl.getAttribute('src') === url) return this.reload();
        this.videoEl.setAttribute('src', url);
      }
    }, {
      key: "close",
      value: function close() {
        // We need to pause first in order to stop sound.
        this.videoEl.pause();
        this.videoEl.removeAttribute('src'); // force load to reset everything without errors

        this.videoEl.load();
        this.fire('clearSrc');
      }
    }, {
      key: "playPause",
      value: function playPause() {
        if (this.isPlaying()) {
          this.pause();
        } else {
          this.play();
        }
      }
    }, {
      key: "play",
      value: function play() {
        this.videoEl.play();
      }
    }, {
      key: "reload",
      value: function reload() {
        var url = this.videoEl.getAttribute('src');
        this.close();
        this.videoEl.src = url;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.videoEl.pause();
      }
    }, {
      key: "isPlaying",
      value: function isPlaying() {
        return this.state === "Playing";
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        return Promise.resolve(this.videoEl.currentTime);
      }
    }, {
      key: "setPosition",
      value: function setPosition(pos) {
        this.videoEl.currentTime = pos;
      }
    }, {
      key: "getDuration",
      value: function getDuration() {
        return Promise.resolve(this.videoEl.duration);
      }
    }, {
      key: "seek",
      value: function seek(time) {
        var absolute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (absolute) {
          this.videoEl.currentTime = time;
        } else {
          this.videoEl.currentTime += time;
        }
      }
    }, {
      key: "_setVideoArea",
      value: function _setVideoArea(videoPos) {
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
          var precision = this.stage.getRenderPrecision();
          this.videoEl.style.left = Math.round(videoPos[0] * precision) + 'px';
          this.videoEl.style.top = Math.round(videoPos[1] * precision) + 'px';
          this.videoEl.style.width = Math.round((videoPos[2] - videoPos[0]) * precision) + 'px';
          this.videoEl.style.height = Math.round((videoPos[3] - videoPos[1]) * precision) + 'px';
        }
      }
    }, {
      key: "_fireConsumer",
      value: function _fireConsumer(event, args) {
        if (this._consumer) {
          this._consumer.fire(event, args);
        }
      }
    }, {
      key: "_equalInitData",
      value: function _equalInitData(buf1, buf2) {
        if (!buf1 || !buf2) return false;
        if (buf1.byteLength != buf2.byteLength) return false;
        var dv1 = new Int8Array(buf1);
        var dv2 = new Int8Array(buf2);

        for (var i = 0; i != buf1.byteLength; i++) {
          if (dv1[i] != dv2[i]) return false;
        }

        return true;
      }
    }, {
      key: "textureMode",
      set: function set(v) {
        return this._textureMode = v;
      },
      get: function get() {
        return this._textureMode;
      }
    }, {
      key: "videoView",
      get: function get() {
        return this.tag("Video");
      }
    }, {
      key: "videoTextureView",
      get: function get() {
        return this.tag("Video").tag("VideoTexture");
      }
    }, {
      key: "videoTexture",
      get: function get() {
        return this.videoTextureView.texture;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Video: {
            VideoWrap: {
              VideoTexture: {
                visible: false,
                pivot: 0.5,
                texture: {
                  type: lng.textures.StaticTexture,
                  options: {}
                }
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        var p = Mediaplayer.prototype;
        var previousInitData;
        return {
          _init: p._init,
          Playing: {
            _enter: p._startUpdatingVideoTexture,
            _exit: p._stopUpdatingVideoTexture,
            timeupdate: function timeupdate() {
              this._fireConsumer('$mediaplayerProgress', {
                currentTime: this.videoEl.currentTime,
                duration: this.videoEl.duration || 1
              });
            },
            ended: function ended(args) {
              this._fireConsumer('$mediaplayerEnded', args);

              return "";
            },
            pause: function pause(args) {
              this._fireConsumer('$mediaplayerPause', args);

              return "Playing.Paused";
            },
            Paused: {},
            clearSrc: function clearSrc() {
              this._fireConsumer('$mediaplayerStop', {});

              return "";
            }
          },
          error: function error(args) {
            this._fireConsumer('$mediaplayerError', args);

            return "";
          },
          loadeddata: function loadeddata(args) {
            this._fireConsumer('$mediaplayerLoadedData', args);
          },
          play: function play(args) {
            this._fireConsumer('$mediaplayerPlay', args);
          },
          playing: function playing(args) {
            this._fireConsumer('$mediaplayerPlaying', args);

            return "Playing";
          },
          canplay: function canplay(args) {
            this.videoEl.play();

            this._fireConsumer('$mediaplayerStart', args);
          },
          loadstart: function loadstart(args) {
            this._fireConsumer('$mediaplayerLoad', args);
          },
          seeked: function seeked(args) {
            this._fireConsumer('$mediaplayerSeeked', {
              currentTime: this.videoEl.currentTime,
              duration: this.videoEl.duration || 1
            });
          },
          seeking: function seeking(args) {
            this._fireConsumer('$mediaplayerSeeking', {
              currentTime: this.videoEl.currentTime,
              duration: this.videoEl.duration || 1
            });
          },
          durationchange: function durationchange(args) {
            this._fireConsumer('$mediaplayerDurationChange', args);
          },
          encrypted: function encrypted(args) {
            var video = args.videoElement;
            var event = args.event; // FIXME: Double encrypted events need to be properly filtered by Gstreamer

            if (video.mediaKeys && !this._equalInitData(previousInitData, event.initData)) {
              previousInitData = event.initData;

              this._fireConsumer('$mediaplayerEncrypted', args);
            }
          }
        };
      }
    }]);

    return Mediaplayer;
  }(lng.Component);

  var Ui =
  /*#__PURE__*/
  function (_lng$Application) {
    _inherits(Ui, _lng$Application);

    function Ui() {
      _classCallCheck(this, Ui);

      return _possibleConstructorReturn(this, _getPrototypeOf(Ui).apply(this, arguments));
    }

    _createClass(Ui, [{
      key: "startApp",
      value: function startApp(v) {
        this.fire("startApp", {
          def: v
        });
      }
    }, {
      key: "stopApp",
      value: function stopApp() {
        this.fire("stopApp");
      }
    }, {
      key: "_startApp",
      value: function _startApp(v) {
        var _this4 = this;

        this._currentApp = {
          def: v,
          type: v.getAppViewType(),
          fontFaces: []
        }; // Preload fonts.

        var fonts = this._currentApp.type.getFonts();

        var fontFaces = fonts.map(function (_ref) {
          var family = _ref.family,
              url = _ref.url,
              descriptors = _ref.descriptors;
          return new FontFace(family, "url(".concat(url, ")"), descriptors);
        });
        this._currentApp._fontFaces = fontFaces;
        fontFaces.forEach(function (fontFace) {
          document.fonts.add(fontFace);
        });
        Promise.all(fontFaces.map(function (ff) {
          return ff.load();
        })).then(function () {
          _this4.fire("done");
        }).catch(function (e) {
          console.warn('Font loading issues: ' + e);

          _this4.fire("done");
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("App");
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        settings.clearColor = this.stage.getOption('clearColor');
        settings.mediaplayer = {
          consumer: null,
          stream: null,
          hide: false,
          videoPos: [0, 0, 1920, 1080]
        };
      }
    }, {
      key: "_handleFocusSettings",
      value: function _handleFocusSettings(settings) {
        if (this._clearColor !== settings.clearColor) {
          this._clearColor = settings.clearColor;
          this.stage.setClearColor(settings.clearColor);
        }

        if (this.tag("Mediaplayer").attached) {
          this.tag("Mediaplayer").updateSettings(settings.mediaplayer);
        }
      }
    }, {
      key: "mediaplayer",
      get: function get() {
        return this.tag("Mediaplayer");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Mediaplayer: {
            type: Mediaplayer,
            textureMode: Ui.hasOption('texture')
          },
          AppWrapper: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          startApp: "App.Loading",
          stopApp: "",
          App: {
            Loading: {
              _enter: function _enter(_ref2) {
                var def = _ref2.args.def;
                return this._startApp(def);
              },
              done: "App.Started"
            },
            Started: {
              _enter: function _enter() {
                this.tag("AppWrapper").children = [{
                  ref: "App",
                  type: this._currentApp.type
                }];
              },
              _exit: function _exit() {
                this.tag("AppWrapper").children = []; //@todo: remove app font faces from document.fonts.
              }
            }
          },
          _handleBack: function _handleBack() {
            window.close();
          }
        };
      }
    }, {
      key: "getProxyUrl",
      value: function getProxyUrl(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return "//cdn.metrological.com/proxy" + this.getQueryString(url, opts);
      }
    }, {
      key: "getImageUrl",
      value: function getImageUrl(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return "//cdn.metrological.com/image" + this.getQueryString(url, opts);
      }
    }, {
      key: "getQrUrl",
      value: function getQrUrl(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return "//cdn.metrological.com/qr" + this.getQueryString(url, opts, "q");
      }
    }, {
      key: "hasOption",
      value: function hasOption(name) {
        return document.location.href.indexOf(name) >= 0;
      }
    }, {
      key: "getOption",
      value: function getOption(name) {
        return new URL(document.location.href).searchParams.get(name);
      }
    }, {
      key: "getQueryString",
      value: function getQueryString(url, opts) {
        var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "url";
        var str = "?operator=".concat(encodeURIComponent(this.getOption('operator') || 'metrological'));
        var keys = Object.keys(opts);
        keys.forEach(function (key) {
          str += "&" + encodeURIComponent(key) + "=" + encodeURIComponent("" + opts[key]);
        });
        str += "&".concat(key, "=").concat(encodeURIComponent(url));
        return str;
      }
    }]);

    return Ui;
  }(lng.Application);

  var AppDefinition =
  /*#__PURE__*/
  function (_lng$EventEmitter) {
    _inherits(AppDefinition, _lng$EventEmitter);

    function AppDefinition(application) {
      var _this5;

      _classCallCheck(this, AppDefinition);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(AppDefinition).call(this));
      _this5.application = application;
      return _this5;
    }

    _createClass(AppDefinition, [{
      key: "getPath",
      value: function getPath(relPath) {
        return AppDefinition.getPath(this.constructor, relPath);
      }
    }, {
      key: "getAppViewType",
      value: function getAppViewType() {
        throw new Error("Please specify the app view type.");
      }
    }, {
      key: "identifier",
      get: function get() {
        var identifier = this.constructor.identifier;
        if (!identifier) throw new Error("Application does not have an identifier: " + this.constructor.name);
        return identifier;
      }
    }], [{
      key: "getPath",
      value: function getPath(relPath) {
        return "apps/" + this.identifier + "/" + relPath;
      }
    }, {
      key: "identifier",
      get: function get() {
        throw new Error("Please supply an identifier in the App definition file.");
      }
    }]);

    return AppDefinition;
  }(lng.EventEmitter);

  var App =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(App, _lng$Component2);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, null, [{
      key: "g",
      value: function g(c) {
        return c.seekAncestorByType(this);
      }
      /**
       * Returns all fonts to be preloaded before entering this app.
       * @returns {{family: string, url: string, descriptors: {}}[]}
       */

    }, {
      key: "getFonts",
      value: function getFonts() {
        return [];
      }
    }]);

    return App;
  }(lng.Component);

  var PlayerButton =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(PlayerButton, _lng$Component3);

    function PlayerButton() {
      _classCallCheck(this, PlayerButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerButton).apply(this, arguments));
    }

    _createClass(PlayerButton, [{
      key: "icon",
      set: function set(source) {
        this.tag("Icon").src = "static/tools/player/img/".concat(source);
      }
    }, {
      key: "active",
      set: function set(v) {
        this.alpha = v ? 1 : 0.3;
      },
      get: function get() {
        return this.alpha === 1;
      }
    }], [{
      key: "_template",
      value: function _template() {
        var o = this.options;
        return {
          w: o.w,
          h: o.h,
          Background: {
            x: -1,
            y: -1,
            texture: lng.Tools.getRoundRect(o.w, o.h, 4, 0, 0, true),
            color: o.colors.deselected
          },
          Icon: {
            x: o.w / 2,
            y: o.h / 2,
            mount: 0.5,
            color: o.colors.selected
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        var o = this.options;
        return {
          Selected: {
            _enter: function _enter() {
              this.tag("Background").color = o.colors.selected;
              this.tag("Icon").color = o.colors.deselected;
            },
            _exit: function _exit() {
              this.tag("Background").color = o.colors.deselected;
              this.tag("Icon").color = o.colors.selected;
            },
            _unfocus: ""
          },
          _focus: "Selected"
        };
      }
    }, {
      key: "_buildOptions",
      value: function _buildOptions() {
        return {
          colors: {
            selected: 0xFFFFFFFF,
            deselected: 0xFF606060
          },
          w: 60,
          h: 60
        };
      }
    }, {
      key: "options",
      get: function get() {
        if (!this._options) {
          this._options = this._buildOptions();
        }

        return this._options;
      }
    }]);

    return PlayerButton;
  }(lng.Component);

  var PlayerControls =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(PlayerControls, _lng$Component4);

    function PlayerControls() {
      _classCallCheck(this, PlayerControls);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerControls).apply(this, arguments));
    }

    _createClass(PlayerControls, [{
      key: "showButtons",
      value: function showButtons(previous, next) {
        var o = this.constructor.options;
        var buttons = [];
        if (previous) buttons.push("Previous");
        buttons = buttons.concat(o.buttons);
        if (next) buttons.push("Next");

        this._setActiveButtons(buttons);
      }
    }, {
      key: "_setActiveButtons",
      value: function _setActiveButtons(buttons) {
        var _this6 = this;

        var o = this.constructor.options;
        var x = 0;
        this._activeButtons = [];
        this.tag("Buttons").children.map(function (button) {
          button.active = buttons.indexOf(button.ref) !== -1;
          button.x = x;

          if (button.active) {
            _this6._activeButtons.push(button);
          }

          x += button.renderWidth + o.margin;
        });
        this.tag("Title").x = x + 20;
        this.fire('checkActiveButton');
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this.state);
      }
    }, {
      key: "title",
      set: function set(title) {
        this.tag("Title").text = title || "";
      }
    }, {
      key: "_activeButtonIndex",
      get: function get() {
        var button = this.tag("Buttons").getByRef(this.state);

        if (!button.active) {
          button = this.tag("Play");
        }

        return this._activeButtons.indexOf(button);
      }
    }, {
      key: "_activeButton",
      get: function get() {
        return this._activeButtons[this._activeButtonIndex];
      }
    }, {
      key: "paused",
      set: function set(value) {
        this.fire(value ? 'paused' : 'playing');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Buttons: {
            Previous: {
              type: this.PlayerButton,
              icon: "prev.png"
            },
            Play: {
              type: this.PlayerButton,
              icon: "play.png"
            },
            Next: {
              type: this.PlayerButton,
              icon: "next.png"
            }
          },
          Title: {
            text: {
              fontSize: 46,
              lineHeight: 56,
              maxLines: 1,
              shadow: true
            },
            y: 2
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        var o = this.options;
        var p = this.prototype;
        return {
          _setup: "Play",
          _init: function _init() {
            this.showButtons(false, false);
            return "Play";
          },
          checkActiveButton: function checkActiveButton() {
            // After changing the active buttons, make sure that an active button is selected.
            var index = this._activeButtonIndex;

            if (index === -1) {
              if (this._index >= this._activeButtons.length) {
                this._index = this._activeButtons.length - 1;
              }
            }

            return this._activeButtons[index].ref;
          },
          _handleLeft: function _handleLeft() {
            var index = this._activeButtonIndex;

            if (index > 0) {
              index--;
            }

            return this._activeButtons[index].ref;
          },
          _handleRight: function _handleRight() {
            var index = this._activeButtonIndex;

            if (index < this._activeButtons.length - 1) {
              index++;
            }

            return this._activeButtons[index].ref;
          },
          _handleEnter: function _handleEnter() {
            this.signal('press' + this._activeButton.ref);
          },
          Previous: {},
          Play: {},
          Next: {},
          paused: function paused() {
            this.tag("Play").icon = "play.png";
          },
          playing: function playing() {
            this.tag("Play").icon = "pause.png";
          }
        };
      }
    }, {
      key: "_buildOptions",
      value: function _buildOptions() {
        return {
          buttons: ["Play"],
          margin: 10
        };
      }
    }, {
      key: "PlayerButton",
      get: function get() {
        return PlayerButton;
      }
    }, {
      key: "options",
      get: function get() {
        if (!this._options) {
          this._options = this._buildOptions();
        }

        return this._options;
      }
    }]);

    return PlayerControls;
  }(lng.Component);

  var PlayerProgress =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(PlayerProgress, _lng$Component5);

    function PlayerProgress() {
      _classCallCheck(this, PlayerProgress);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerProgress).apply(this, arguments));
    }

    _createClass(PlayerProgress, [{
      key: "setProgress",
      value: function setProgress(currentTime, duration) {
        this._progress = currentTime / Math.max(duration, 1);
        this.tag("CurrentTime").text = Player.formatTime(currentTime);
        this.tag("Duration").text = Player.formatTime(duration);
      }
    }, {
      key: "_alter",
      value: function _alter() {}
    }, {
      key: "_progress",
      set: function set(v) {
        var now = Date.now();
        var estimation = 0;

        if (!this._last || this._last < now - 1000) {
          estimation = 500;
        } else {
          estimation = now - this._last;
        }

        this._last = now;
        var x = v * 1720;
        estimation *= 0.001;
        this.tag("Total").setSmooth('x', x, {
          timingFunction: 'linear',
          duration: estimation
        });
        this.tag("Total").setSmooth('texture.x', x, {
          timingFunction: 'linear',
          duration: estimation
        });
        this.tag("Active").setSmooth('texture.w', Math.max(x, 0.0001)
        /* force clipping */
        , {
          timingFunction: 'linear',
          duration: estimation
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Progress: {
            forceZIndexContext: true,
            Total: {
              x: -1,
              y: -1,
              texture: lng.Tools.getRoundRect(1720, 10, 4),
              color: 0xFF606060,
              Scroller: {
                x: 0,
                y: 6,
                mount: 0.5,
                w: 16,
                h: 16,
                zIndex: 2,
                Shadow: {
                  texture: lng.Tools.getShadowRect(16, 16, 8),
                  mount: 0.5,
                  x: 8,
                  y: 8,
                  color: 0xFF000000
                },
                Main: {
                  texture: lng.Tools.getRoundRect(16, 16, 8),
                  mount: 0.5,
                  x: 8,
                  y: 8,
                  color: 0xFFF1F1F1
                }
              }
            },
            Active: {
              x: -1,
              y: -1,
              color: 0xFFF1F1F1
            },
            CurrentTime: {
              x: 0,
              y: 21,
              text: {
                fontSize: 28,
                lineHeight: 34,
                maxLines: 1,
                shadow: true,
                text: "00:00"
              }
            },
            Duration: {
              x: 1720,
              mountX: 1,
              y: 21,
              text: {
                fontSize: 28,
                lineHeight: 34,
                maxLines: 1,
                shadow: true,
                text: "00:00"
              }
            }
          }
        };
      }
    }, {
      key: "formatTime",
      value: function formatTime(seconds) {
        var hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        seconds = Math.floor(seconds);
        var parts = [];
        if (hours) parts.push(hours);
        parts.push(minutes);
        parts.push(seconds);
        return parts.map(function (number) {
          return number < 10 ? "0" + number : "" + number;
        }).join(":");
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _setup: function _setup() {
            this._alter();
          },
          _init: function _init() {
            this.tag("Active").texture = {
              type: lng.textures.SourceTexture,
              textureSource: this.tag("Total").texture.source
            };
          }
        };
      }
    }]);

    return PlayerProgress;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Player, _lng$Component6);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "play",
      value: function play(args) {
        this.fire('play', args);
        return !!this._stream;
      }
    }, {
      key: "_setItem",
      value: function _setItem(item) {
        this.tag("Progress").setProgress(0, 0);
        this._item = item;
        this._stream = item.stream;
        this.tag("Controls").title = item.title;
        this._index = this._items.indexOf(item);
        this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);
        this.application.updateFocusSettings();
      }
    }, {
      key: "_setInterfaceTimeout",
      value: function _setInterfaceTimeout() {
        var _this7 = this;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this7.fire('hidden');
        }, 8000);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("Controls");
      }
    }, {
      key: "getMediaplayerSettings",
      value: function getMediaplayerSettings() {
        return {
          stream: {
            src: this._stream.link
          }
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
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
            signals: {
              pressPlay: true,
              pressPrevious: true,
              pressNext: true
            }
          },
          Progress: {
            x: 99,
            y: 970,
            type: this.PlayerProgress
          }
        };
      }
    }, {
      key: "formatTime",
      value: function formatTime(seconds) {
        var hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        seconds = Math.floor(seconds);
        var parts = [];
        if (hours) parts.push(hours);
        parts.push(minutes);
        parts.push(seconds);
        return parts.map(function (number) {
          return number < 10 ? "0" + number : "" + number;
        }).join(":");
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: "Controls",
          _focus: function _focus() {
            this._setInterfaceTimeout();
          },
          _unfocus: function _unfocus() {
            clearTimeout(this._timeout);
          },
          $mediaplayerEnded: function $mediaplayerEnded() {
            this.fire('pressNext');
          },
          play: function play(_ref3) {
            var item = _ref3.item,
                items = _ref3.items;
            this._items = items;

            this._setItem(item);
          },
          pressPrevious: function pressPrevious() {
            var index = this._index - 1;

            if (index < 0) {
              this._index = this._items.length - 1;
            }

            this._setItem(this._items[index]);
          },
          pressNext: function pressNext() {
            if (!this._items.length) {
              return this.signal('playerStop');
            }

            var index = (this._index + 1) % this._items.length;

            this._setItem(this._items[index]);
          },
          pressPlay: function pressPlay() {
            this.application.mediaplayer.playPause();
          },
          $mediaplayerPause: function $mediaplayerPause() {
            this.tag("Controls").paused = true;
          },
          $mediaplayerPlay: function $mediaplayerPlay() {
            this.tag("Controls").paused = false;
          },
          $mediaplayerStop: function $mediaplayerStop() {
            this.signal('playerStop');
          },
          $mediaplayerProgress: function $mediaplayerProgress(_ref4) {
            var currentTime = _ref4.currentTime,
                duration = _ref4.duration;
            this.tag("Progress").setProgress(currentTime, duration);
          },
          _captureKey: function _captureKey() {
            this._setInterfaceTimeout();

            return false;
          },
          hidden: "Hidden",
          Hidden: {
            _enter: function _enter(_ref5) {
              var prevState = _ref5.prevState;
              this._prevState = prevState;
              this.setSmooth('alpha', 0);
            },
            _exit: function _exit() {
              this._setInterfaceTimeout();

              this.setSmooth('alpha', 1);
            },
            _captureKey: function _captureKey() {
              return this._prevState;
            }
          },
          Controls: {}
        };
      }
    }, {
      key: "PlayerControls",
      get: function get() {
        return PlayerControls;
      }
    }, {
      key: "PlayerProgress",
      get: function get() {
        return PlayerProgress;
      }
    }]);

    return Player;
  }(lng.Component);

  var obj = {
    Player: Player,
    PlayerButton: PlayerButton,
    PlayerControls: PlayerControls,
    PlayerProgress: PlayerProgress
  };

  var Light3dComponent =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(Light3dComponent, _lng$Component7);

    function Light3dComponent(stage) {
      var _this8;

      _classCallCheck(this, Light3dComponent);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(Light3dComponent).call(this, stage));

      _this8.patch({
        __create: true,
        Main: {
          x: -1,
          y: -1,
          shader: {
            type: lng.shaders.Light3d,
            fudge: 0.3
          },
          renderToTexture: true,
          Wrapper: {
            x: 1,
            y: 1,
            clipping: true,
            Content: {}
          }
        }
      });

      _this8._shaderZ = 0;
      _this8._shaderZ0 = 0;
      _this8._shaderZ1 = 0;
      _this8._shaderRx = 0;
      _this8._shaderRx0 = 0;
      _this8._shaderRx1 = 0;
      _this8._shaderRy = 0;
      _this8._shaderRy0 = 0;
      _this8._shaderRy1 = 0;
      _this8._focusedZ = -150;

      _this8._createAnimations();

      _this8.transition('lightShader.strength', {
        duration: 0.2
      });

      _this8.transition('lightShader.ambient', {
        duration: 0.2
      });

      return _this8;
    }

    _createClass(Light3dComponent, [{
      key: "_createAnimations",
      value: function _createAnimations() {
        this._anims = {
          neutral: this.animation({
            duration: 0.4,
            actions: [{
              p: 'shaderZ0',
              merger: lng.StageUtils.mergeNumbers,
              v: {
                0: 0,
                0.5: -140,
                1: -150
              }
            }]
          }),
          left: this._createAnimation('x', -1, 0),
          right: this._createAnimation('x', 1, 1),
          up: this._createAnimation('y', -1, 0),
          down: this._createAnimation('y', 1, 0)
        };
      }
    }, {
      key: "_createAnimation",
      value: function _createAnimation(axis, sign, idx) {
        return this.animation({
          duration: 0.4,
          stopDuration: 0.2,
          actions: [{
            p: 'shaderR' + axis + idx,
            merger: lng.StageUtils.mergeNumbers,
            v: {
              0: 0,
              0.3: -0.20 * sign,
              1: 0
            }
          }, {
            p: 'shaderZ' + idx,
            merger: lng.StageUtils.mergeNumbers,
            v: {
              0: 0,
              0.5: this._focusedZ + 10,
              1: this._focusedZ
            }
          }]
        });
      }
    }, {
      key: "_recalc",
      value: function _recalc() {
        this.tag('Main').shader.rx = this._shaderRx0 + this._shaderRx1 + this._shaderRx;
        this.tag('Main').shader.ry = this._shaderRy0 + this._shaderRy1 + this._shaderRy;
        this.tag('Main').shader.z = this._shaderZ0 + this._shaderZ1 + this._shaderZ;
        this.tag('Main').shader.pivotZ = this._shaderZ0 + this._shaderZ1 + this._shaderZ;
      }
    }, {
      key: "leftEnter",
      value: function leftEnter() {
        this._anims['left'].start();

        this._enable3dShader();
      }
    }, {
      key: "leftExit",
      value: function leftExit() {
        this.neutralExit();
      }
    }, {
      key: "rightEnter",
      value: function rightEnter() {
        this._anims['right'].start();

        this._enable3dShader();
      }
    }, {
      key: "rightExit",
      value: function rightExit() {
        this.neutralExit();
      }
    }, {
      key: "upEnter",
      value: function upEnter() {
        this._anims['up'].start();

        this._enable3dShader();
      }
    }, {
      key: "upExit",
      value: function upExit() {
        this.neutralExit();
      }
    }, {
      key: "downEnter",
      value: function downEnter() {
        this._anims['down'].start();

        this._enable3dShader();
      }
    }, {
      key: "downExit",
      value: function downExit() {
        this.neutralExit();
      }
    }, {
      key: "neutralEnter",
      value: function neutralEnter() {
        this._anims['neutral'].start();

        this._enable3dShader();
      }
    }, {
      key: "neutralExit",
      value: function neutralExit() {
        this._anims['up'].stop();

        this._anims['down'].stop();

        this._anims['left'].stop();

        this._anims['right'].stop();

        this._anims['neutral'].stop();

        this._disable3dShader();
      }
    }, {
      key: "_enable3dShader",
      value: function _enable3dShader() {
        this.patch({
          smooth: {
            'lightShader.strength': 0.4,
            'lightShader.ambient': 0.6
          }
        });
      }
    }, {
      key: "_disable3dShader",
      value: function _disable3dShader() {
        this.patch({
          smooth: {
            'lightShader.strength': 0,
            'lightShader.ambient': 1
          }
        });
      }
    }, {
      key: "focusedZ",
      get: function get() {
        return this._focusedZ;
      },
      set: function set(v) {
        this._focusedZ = v;

        this._createAnimations();
      }
    }, {
      key: "w",
      set: function set(v) {
        this.tag('Main').w = v + 2;
        this.tag('Wrapper').w = v;
      }
    }, {
      key: "h",
      set: function set(v) {
        this.tag('Main').h = v + 2;
        this.tag('Wrapper').h = v;
      }
    }, {
      key: "lightShader",
      get: function get() {
        return this.tag('Main').shader;
      },
      set: function set(v) {
        this.tag('Main').shader = v;
      }
    }, {
      key: "content",
      get: function get() {
        return this.tag('Content');
      },
      set: function set(v) {
        this.tag('Content').patch(v, true);
      }
    }, {
      key: "shaderZ",
      get: function get() {
        return this._shaderZ;
      },
      set: function set(v) {
        this._shaderZ = v;

        this._recalc();
      }
    }, {
      key: "shaderZ0",
      get: function get() {
        return this._shaderZ0;
      },
      set: function set(v) {
        this._shaderZ0 = v;

        this._recalc();
      }
    }, {
      key: "shaderZ1",
      get: function get() {
        return this._shaderZ1;
      },
      set: function set(v) {
        this._shaderZ1 = v;

        this._recalc();
      }
    }, {
      key: "shaderRx",
      get: function get() {
        return this._shaderRx;
      },
      set: function set(v) {
        this._shaderRx = v;

        this._recalc();
      }
    }, {
      key: "shaderRx0",
      get: function get() {
        return this._shaderRx0;
      },
      set: function set(v) {
        this._shaderRx0 = v;

        this._recalc();
      }
    }, {
      key: "shaderRx1",
      get: function get() {
        return this._shaderRx1;
      },
      set: function set(v) {
        this._shaderRx1 = v;

        this._recalc();
      }
    }, {
      key: "shaderRy",
      get: function get() {
        return this._shaderRy;
      },
      set: function set(v) {
        this._shaderRy = v;

        this._recalc();
      }
    }, {
      key: "shaderRy0",
      get: function get() {
        return this._shaderRy0;
      },
      set: function set(v) {
        this._shaderRy0 = v;

        this._recalc();
      }
    }, {
      key: "shaderRy1",
      get: function get() {
        return this._shaderRy1;
      },
      set: function set(v) {
        this._shaderRy1 = v;

        this._recalc();
      }
    }]);

    return Light3dComponent;
  }(lng.Component);

  var obj$1 = {
    Light3dComponent: Light3dComponent
  };
  var tools = {
    player: obj,
    effects: obj$1
  }; // Exposes the ux namespace for apps.

  var ux = {
    Ui: Ui,
    AppDefinition: AppDefinition,
    App: App,
    tools: tools
  };
  window.ux = ux;
  return ux;
}();