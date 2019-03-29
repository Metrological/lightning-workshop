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

var com_metrological_app_Dailymotion = function () {
  'use strict';

  var Button =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(Button, _lng$Component);

    function Button() {
      _classCallCheck(this, Button);

      return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
    }

    _createClass(Button, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.4
          },
          Button: {
            texture: lng.Tools.getRoundRect(120, 120, 60, 3, 0xFF00C1F8, true, 0xFF00C1F8)
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            scale: 1
          },
          Button: {
            texture: lng.Tools.getRoundRect(86, 86, 43, 3, 0x80BBBBBB, true, 0x80F1F1F1)
          }
        });
      }
    }, {
      key: "action",
      set: function set(v) {
        this._action = v;
      },
      get: function get() {
        return this._action;
      }
    }, {
      key: "image",
      set: function set(v) {
        this.tag('Image').patch({
          src: v
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 86,
          w: 86,
          Shadow: {
            mount: 0.5,
            color: 0xB3000000,
            x: 43,
            y: 45,
            w: 100,
            h: 100,
            texture: lng.Tools.getShadowRect(100, 100, 50, 10, 10)
          },
          Button: {
            h: 86,
            w: 86,
            texture: lng.Tools.getRoundRect(86, 86, 43, 3, 0x80BBBBBB, true, 0x80F1F1F1)
          },
          Image: {
            mount: 0.5,
            x: 43,
            y: 43
          }
        };
      }
    }]);

    return Button;
  }(lng.Component);

  var TextScrolling =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(TextScrolling, _lng$Component2);

    function TextScrolling() {
      _classCallCheck(this, TextScrolling);

      return _possibleConstructorReturn(this, _getPrototypeOf(TextScrolling).apply(this, arguments));
    }

    _createClass(TextScrolling, [{
      key: "stopScrollAnimation",
      value: function stopScrollAnimation() {
        if (!this._scrollAnimation) {
          return;
        }

        this._scrollAnimation.stop();
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this = this;

        this.tag("Label").on("txLoaded", function () {
          var width = _this.tag("Label").renderWidth;

          if (width > _this.w && width < 2048) {
            if (!_this._scrollAnimation) {
              _this._scrollAnimation = _this.tag("Label").animation({
                duration: width > _this.w + _this.w / 5 ? 16 : 8,
                repeat: -1,
                stopMethod: "immediate",
                actions: [{
                  t: '',
                  p: 'x',
                  v: {
                    sm: 0,
                    0: {
                      v: 0
                    },
                    .4: {
                      v: -(width - _this.w)
                    },
                    .6: {
                      v: -(width - _this.w)
                    },
                    .8: {
                      v: 0
                    },
                    1: {
                      v: 0
                    }
                  }
                }]
              });
            }

            _this._scrollAnimation.start();
          } else {
            _this.stopScrollAnimation();
          }
        });
      }
    }, {
      key: "options",
      set: function set(v) {
        this.patch({
          Label: {
            color: v.color,
            text: {
              fontSize: v.fontSize,
              fontFace: v.fontFace
            }
          }
        });
      }
    }, {
      key: "label",
      set: function set(v) {
        this.patch({
          Label: {
            text: {
              text: v
            }
          }
        });
      }
    }, {
      key: "textAlpha",
      set: function set(v) {
        this.patch({
          alpha: v
        });
      }
    }, {
      key: "textWidth",
      set: function set(v) {
        this.patch({
          Label: {
            text: {
              wordWrapWidth: v
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          clipping: true,
          alpha: .5,
          Label: {
            text: {
              maxLines: 1
            }
          }
        };
      }
    }]);

    return TextScrolling;
  }(lng.Component);

  var ListItem =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(ListItem, _lng$Component3);

    function ListItem() {
      _classCallCheck(this, ListItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ListItem).apply(this, arguments));
    }

    _createClass(ListItem, [{
      key: "_focus",
      value: function _focus() {
        this.tag("VideoTitle").patch({
          x: 5
        });
        this.fire("toggleFocus", {
          v: true
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.fire("toggleFocus", {
          v: false
        });
        this.tag("VideoTitle").patch({
          x: 20
        });
        this.tag("VideoTitle").stopScrollAnimation();
      }
    }, {
      key: "toggleFocus",
      value: function toggleFocus(_ref) {
        var v = _ref.v;
        this.patch({
          smooth: {
            zIndex: 1,
            scale: v ? 1.16 : 1
          },
          Shadow: {
            smooth: {
              alpha: v ? 1 : 0
            }
          },
          Image: {
            smooth: {
              color: v ? 0xffffffff : 0xFF666666
            }
          },
          Uploader: {
            smooth: {
              color: v ? 0xFFF1F1F1 : 0x80F1F1F1
            }
          },
          Duration: {
            smooth: {
              color: v ? 0xFFF1F1F1 : 0x80F1F1F1
            }
          },
          TextBox: {
            smooth: {
              color: v ? 0xFF00C1F8 : 0xFF101010
            },
            VideoTitle: {
              textAlpha: v ? 1 : .5,
              textWidth: v ? 1000 : 400
            }
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Image: {
            src: ux.Ui.getImageUrl(v['thumbnail_360_url'] || AppDefinition.getPath('img/missing.png'), {
              w: 427,
              h: 240,
              type: "crop"
            })
          },
          Uploader: {
            text: {
              text: v['owner.screenname'] || ''
            }
          },
          Duration: {
            text: {
              text: v.duration ? ListItem.convertTime(v.duration) : ''
            }
          },
          TextBox: {
            VideoTitle: {
              label: v.title ? v.title : v.name
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 427,
          h: 240,
          color: 0x80000000,
          rect: true,
          Shadow: {
            alpha: 0,
            mount: 0.5,
            w: 475,
            h: 370,
            x: 213,
            y: 160,
            color: 0x80000000,
            texture: lng.Tools.getShadowRect(475, 370, 0, 35, 35)
          },
          Image: {
            src: AppDefinition.getPath('img/missing.png'),
            w: 427,
            h: 240,
            color: 0xFF666666
          },
          ImageShade: {
            rect: true,
            w: 427,
            h: 100,
            y: 140,
            colorTop: 0x00000000,
            colorBottom: 0xCC000000
          },
          Title: {
            text: {
              text: '',
              fontFace: 'RobotoMedium',
              fontSize: 28,
              color: 0xFFF1F1F1
            }
          },
          Uploader: {
            x: 20,
            y: 230,
            w: 300,
            mountY: 1,
            color: 0x80F1F1F1,
            text: {
              text: '',
              fontFace: 'RobotoBold',
              fontSize: 24,
              maxLines: 1
            }
          },
          Duration: {
            y: 230,
            x: 410,
            mount: 1,
            color: 0x80F1F1F1,
            text: {
              text: '',
              fontFace: 'RobotoRegular',
              fontSize: 24,
              textAlign: 'right'
            }
          },
          TextBox: {
            rect: true,
            h: 70,
            w: 427,
            y: 240,
            color: 0xFF101010,
            VideoTitle: {
              type: TextScrolling,
              w: 415,
              x: 20,
              h: 60,
              y: 16,
              textAlpha: .5,
              textWidth: 400,
              options: {
                color: 0xFFF1F1F1,
                fontSize: 28,
                fontFace: "RobotoRegular"
              }
            }
          }
        };
      }
    }, {
      key: "convertTime",
      value: function convertTime(sec) {
        var hours = Math.floor(sec / 3600);
        hours >= 1 ? sec = sec - hours * 3600 : hours = '00';
        var min = Math.floor(sec / 60);
        min >= 1 ? sec = sec - min * 60 : min = '00';
        sec < 1 ? sec = '00' : 0;
        min.toString().length === 1 ? min = '0' + min : 0;
        sec.toString().length === 1 ? sec = '0' + sec : 0;
        return hours + ':' + min + ':' + sec;
      }
    }]);

    return ListItem;
  }(lng.Component);

  var List =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(List, _lng$Component4);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
    }

    _createClass(List, [{
      key: "clear",
      value: function clear() {
        this.tag("List").childList.clear();
      }
    }, {
      key: "changeStylingListElements",
      value: function changeStylingListElements(focus) {
        this.patch({
          Title: {
            alpha: focus ? 1 : 0.3,
            text: {
              fontSize: focus ? 46 : 38
            }
          },
          List: {
            smooth: {
              y: focus ? 80 : 70
            }
          }
        });
      }
    }, {
      key: "resetIndex",
      value: function resetIndex() {
        this.tag("List").setIndex(0);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.changeStylingListElements(true);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.changeStylingListElements(false);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        this.tag("List").setPrevious();
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.tag("List").setNext();
      }
    }, {
      key: "focusedItem",
      get: function get() {
        return this.tag('List').element._item;
      }
    }, {
      key: "index",
      get: function get() {
        return this.tag("List").realIndex;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag("List").getElement(this.index);
      }
    }, {
      key: "backgroundAlpha",
      set: function set(v) {
        this.tag('BackgroundBox').patch({
          alpha: v ? 0 : 0.2
        });
      }
    }, {
      key: "data",
      set: function set(v) {
        this._item = v;
        var _this$_item = this._item,
            _this$_item$item = _this$_item.item,
            name = _this$_item$item.name,
            playlist = _this$_item$item.playlist,
            list = _this$_item.list;
        this.patch({
          alpha: 1,
          Title: {
            text: {
              text: name
            }
          },
          List: {
            items: list.map(function (item) {
              return {
                type: ListItem,
                item: item
              };
            })
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 510,
          w: 1920,
          BackgroundBox: {
            y: -50,
            x: -120,
            rect: true,
            w: 1920,
            h: 520,
            color: 0xFF000000,
            alpha: 0
          },
          Title: {
            x: 0,
            y: 0,
            alpha: 0.3,
            text: {
              text: '',
              fontSize: 38,
              fontFace: 'RobotoBold'
            }
          },
          List: {
            type: lng.components.ListComponent,
            w: 1920,
            h: 350,
            y: 70,
            itemSize: 461,
            // 427 + 34
            scrollTransition: {
              duration: 0.4
            },
            invertDirection: false,
            roll: true,
            viewportScrollOffset: 0.5,
            itemScrollOffset: 0.5,
            rollMin: 0,
            rollMax: 200
          }
        };
      }
    }]);

    return List;
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
      }
    }, {
      key: "_init",
      value: function _init() {
        this.tag("Active").texture = {
          type: lng.textures.SourceTexture,
          textureSource: this.tag("Total").texture.source
        };
      }
    }, {
      key: "_setup",
      value: function _setup() {}
    }, {
      key: "_progress",
      set: function set(v) {
        var now = Date.now();
        var estimation = 0;

        if (!this._last || this._last < now - 1000) {
          estimation = 1000;
        } else {
          estimation = now - this._last;
        }

        this._last = now;
        var x = v * 1000;
        estimation *= 0.001;
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
              w: 1000,
              h: 6,
              rect: true,
              color: 0xFFD8D8D8
            },
            Active: {
              w: 0,
              h: 6,
              rect: true,
              color: 0xFF00C1F8
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
    }]);

    return PlayerProgress;
  }(lng.Component);

  var Loader =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Loader, _lng$Component6);

    function Loader() {
      _classCallCheck(this, Loader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
      key: "start",
      value: function start() {
        this.patch({
          smooth: {
            alpha: 1
          }
        });

        this._spinnerAnimation.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.patch({
          smooth: {
            alpha: 0
          }
        });

        this._spinnerAnimation.stop();
      }
    }, {
      key: "_init",
      value: function _init() {
        this._spinnerAnimation = this.animation({
          duration: 2,
          repeat: -1,
          actions: [{
            t: 'Spinner',
            p: 'rotation',
            v: {
              0: {
                v: 0
              },
              1: {
                v: Math.PI * 2,
                sm: 1
              }
            }
          }]
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xcc000000,
          alpha: 0,
          Spinner: {
            x: 960,
            y: 540,
            h: 100,
            w: 100,
            mount: 0.5,
            src: AppDefinition.getPath('img/spinner.png')
          }
        };
      }
    }]);

    return Loader;
  }(lng.Component);

  var ErrorButton =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(ErrorButton, _lng$Component7);

    function ErrorButton() {
      _classCallCheck(this, ErrorButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(ErrorButton).apply(this, arguments));
    }

    _createClass(ErrorButton, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          color: 0xFF00C1F8
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          color: 0xFF000000
        });
      }
    }, {
      key: "action",
      set: function set(v) {
        this._action = v;
      },
      get: function get() {
        return this._action;
      }
    }, {
      key: "label",
      set: function set(label) {
        this.patch({
          Label: {
            text: {
              text: label,
              fontSize: 28
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 70,
          w: 114,
          rect: true,
          color: 0xFF000000,
          Label: {
            y: 15,
            h: 70,
            w: 114,
            text: {
              h: 70,
              w: 114,
              fontFace: 'RobotoMedium',
              fontSize: 28,
              color: 0xFFF1F1F1,
              textAlign: 'center'
            }
          }
        };
      }
    }]);

    return ErrorButton;
  }(lng.Component);

  var Error =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(Error, _lng$Component8);

    function Error() {
      _classCallCheck(this, Error);

      return _possibleConstructorReturn(this, _getPrototypeOf(Error).apply(this, arguments));
    }

    _createClass(Error, [{
      key: "message",
      value: function message(_message) {
        this.patch({
          ErrorText: {
            text: {
              text: _message
            }
          }
        });
      }
    }, {
      key: "buildButtons",
      value: function buildButtons(buttons) {
        this._buttons = buttons;
        var menuWidth = 0;
        var buttonSpacing = 10;
        var buttonWidth = 114;
        this.tag('Buttons').children = buttons.map(function (v, idx) {
          menuWidth += idx * (buttonWidth + buttonSpacing);
          return {
            type: ErrorButton,
            y: 551,
            x: idx * (buttonWidth + buttonSpacing),
            action: v.action,
            label: v.label
          };
        });
        this.tag('Buttons').patch({
          mount: 0.5,
          w: menuWidth,
          x: 903
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this._index = 0;
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          'alpha': 1
        });

        this._setState('Buttons');
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          'alpha': 0
        });
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag('Buttons').children[this._index];
      }
    }, {
      key: "index",
      set: function set(v) {
        this._index = v;
      }
    }, {
      key: "layout",
      set: function set(_ref2) {
        var color = _ref2.color,
            message = _ref2.message,
            buttons = _ref2.buttons;
        this.message(message);
        this.buildButtons(buttons);
        this.patch({
          color: color
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 1080,
          w: 1920,
          rect: true,
          transitions: {
            alpha: {
              duration: 0.5
            }
          },
          zIndex: 999,
          ErrorText: {
            w: 900,
            h: 50,
            y: 459,
            x: 510,
            text: {
              fontFace: 'RobotoMedium',
              fontSize: 42,
              color: 0xFFFEFEFE,
              textAlign: 'center'
            }
          },
          Buttons: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this2) {
          _inherits(Buttons, _this2);

          function Buttons() {
            _classCallCheck(this, Buttons);

            return _possibleConstructorReturn(this, _getPrototypeOf(Buttons).apply(this, arguments));
          }

          _createClass(Buttons, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.active;
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              switch (this.active._action) {
                case 'exit':
                  this._handleBack();

                  break;

                case 'retry':
                  this.signal('retry');
                  break;

                default:
                  return false;
                  break;
              }
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              if (this._index > 0) {
                this.index = this._index - 1;
              }
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              if (this._index < this._buttons.length - 1) {
                this.index = this._index + 1;
              }
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              return false;
            }
          }]);

          return Buttons;
        }(this)];
      }
    }]);

    return Error;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(Player, _lng$Component9);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "_init",
      value: function _init() {
        this._initListeners();
      }
    }, {
      key: "muteMediaplayer",
      value: function muteMediaplayer(bool) {
        this.application.mediaplayer.muted = bool;
      }
    }, {
      key: "_focus",
      value: function _focus() {
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
    }, {
      key: "_unfocus",
      value: function _unfocus() {
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
        if (this.tag('List').index > 0) this.tag('List').resetIndex();
      }
    }, {
      key: "_captureKey",
      value: function _captureKey() {
        this._setInterfaceTimeout();

        return false;
      }
    }, {
      key: "$mediaplayerError",
      value: function $mediaplayerError() {
        this._setState('Error');

        return false;
      }
    }, {
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this.signal('backButtonPressed');
        return false;
      }
    }, {
      key: "$mediaplayerPause",
      value: function $mediaplayerPause() {
        this.changePlayPauseIcon('play');
      }
    }, {
      key: "$mediaplayerPlay",
      value: function $mediaplayerPlay() {
        this.changePlayPauseIcon('pause');
        if (this.tag('Loader').alpha === 1) this.tag('Loader').stop();
      }
    }, {
      key: "$mediaplayerProgress",
      value: function $mediaplayerProgress(_ref3) {
        var currentTime = _ref3.currentTime,
            duration = _ref3.duration;
        this.tag('ProgressBar').setProgress(currentTime, duration);
      }
    }, {
      key: "fetchVideoById",
      value: function fetchVideoById(videoId) {
        var _this3 = this;

        this.api.getVideo(videoId).then(function (url) {
          _this3._currentUrl = url;

          if (!_this3._currentUrl) {
            _this3._setState('Error');
          } else {
            _this3.application.updateFocusSettings();
          }
        });

        this._setState('Loading');
      }
    }, {
      key: "fetchRelatedList",
      value: function fetchRelatedList(id) {
        var _this4 = this;

        this.api.getRelated(id).then(function (data) {
          _this4.setListData(data);
        });
      }
    }, {
      key: "setListData",
      value: function setListData(d) {
        this.tag('List').data = {
          item: {
            name: 'Related'
          },
          list: d.list
        };
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        settings.mediaplayer.consumer = this;
      }
    }, {
      key: "changePlayPauseIcon",
      value: function changePlayPauseIcon(i) {
        this.tag('PlayPause').patch({
          image: AppDefinition.getPath('img/' + i + '.png')
        });
      }
    }, {
      key: "getMediaplayerSettings",
      value: function getMediaplayerSettings() {
        return {
          stream: {
            src: this._currentUrl
          }
        };
      }
    }, {
      key: "_initListeners",
      value: function _initListeners() {
        var _this5 = this;

        this.tag("Title").on("txLoaded", function () {
          var _this5$tag = _this5.tag("Title"),
              y = _this5$tag.y,
              h = _this5$tag.renderHeight;

          _this5.tag("Player").patch({
            y: y + h
          });
        });
      }
    }, {
      key: "_setInterfaceTimeout",
      value: function _setInterfaceTimeout() {
        var _this6 = this;

        if (this.tag('Error').alpha === 1) return;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this6._setState('Hidden');
        }, 8000);
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "videoData",
      set: function set(d) {
        this._videoData = d;
        this.patch({
          VideoDetails: {
            Uploader: {
              text: {
                text: d['owner.screenname']
              }
            },
            Title: {
              text: {
                text: d.title
              }
            },
            Icon: {
              src: ux.Ui.getImageUrl(d['owner.avatar_80_url'] || '', {
                w: 46,
                h: 46,
                type: "crop"
              })
            }
          }
        });
      },
      get: function get() {
        return this._videoData;
      }
    }, {
      key: "videoUrl",
      get: function get() {
        return this._currentUrl;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 0,
          y: 0,
          w: 1920,
          h: 1080,
          clipbox: true,
          TopShade: {
            rect: true,
            w: 1920,
            h: 548,
            colorTop: 0xCC000000,
            colorBottom: 0x00000000
          },
          BottomShade: {
            rect: true,
            w: 1920,
            h: 250,
            y: 830,
            colorTop: 0x00000000,
            colorBottom: 0xCC000000
          },
          VideoDetails: {
            Icon: {
              h: 60,
              w: 60,
              x: 120,
              y: 80
            },
            Uploader: {
              x: 200,
              y: 89,
              text: {
                text: " ",
                fontFace: 'RobotoRegular',
                fontSize: 36,
                color: 0xFFF1F1F1
              }
            },
            Title: {
              w: 1000,
              x: 120,
              y: 152,
              text: {
                text: " ",
                fontFace: 'RobotoRegular',
                maxLines: 2,
                lineHeight: 60,
                fontSize: 48,
                color: 0xFFF1F1F1
              }
            }
          },
          Player: {
            y: -305,
            ProgressBar: {
              x: 120,
              y: 0,
              type: PlayerProgress
            },
            Button: {
              Back: {
                x: 120,
                y: 50,
                type: Button,
                action: 'back',
                image: AppDefinition.getPath('img/back.png')
              },
              PlayPause: {
                x: 212,
                y: 50,
                type: Button,
                action: 'play',
                image: AppDefinition.getPath('img/play.png')
              }
            }
          },
          List: {
            type: List,
            y: 1200,
            x: 120
          },
          Loader: {
            type: Loader
          },
          Error: {
            alpha: 0,
            type: Error,
            layout: {
              message: 'Could not load video',
              color: 0xCC000000,
              buttons: [{
                label: 'Close',
                action: 'close'
              }]
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this7) {
          _inherits(Loading, _this7);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              var _this8 = this;

              this.tag('Loader').start();
              this._loaderTimeout = setTimeout(function () {
                _this8.application.mediaplayer.close();

                _this8._setState('Error');
              }, 20000);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              clearTimeout(this._loaderTimeout);
              this.tag('Loader').stop();
            }
          }, {
            key: "$mediaplayerPlay",
            value: function $mediaplayerPlay() {
              if (this.tag('Error').alpha === 1) this.tag('Error').patch({
                alpha: 0
              });
              this.changePlayPauseIcon('pause');

              this._setState('PlayPause');

              this._setInterfaceTimeout();
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this9) {
          _inherits(PlayPause, _this9);

          function PlayPause() {
            _classCallCheck(this, PlayPause);

            return _possibleConstructorReturn(this, _getPrototypeOf(PlayPause).apply(this, arguments));
          }

          _createClass(PlayPause, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('PlayPause');
            }
          }, {
            key: "$enter",
            value: function $enter() {
              this.tag('PlayPause').patch({
                smooth: {
                  x: 230
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag('PlayPause').patch({
                smooth: {
                  x: 212
                }
              });
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.application.mediaplayer.playPause();
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this._setState('Back');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('List');
            }
          }]);

          return PlayPause;
        }(this),
        /*#__PURE__*/
        function (_this10) {
          _inherits(Back, _this10);

          function Back() {
            _classCallCheck(this, Back);

            return _possibleConstructorReturn(this, _getPrototypeOf(Back).apply(this, arguments));
          }

          _createClass(Back, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Back');
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.signal('backButtonPressed');
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              this._setState('PlayPause');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('List');
            }
          }, {
            key: "$enter",
            value: function $enter() {
              this.tag('Button').patch({
                Back: {
                  smooth: {
                    x: 137
                  }
                },
                PlayPause: {
                  smooth: {
                    x: 251
                  }
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag('Button').patch({
                Back: {
                  smooth: {
                    x: 120
                  }
                },
                PlayPause: {
                  smooth: {
                    x: 212
                  }
                }
              });
            }
          }]);

          return Back;
        }(this),
        /*#__PURE__*/
        function (_this11) {
          _inherits(List$$1, _this11);

          function List$$1() {
            _classCallCheck(this, List$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(List$$1).apply(this, arguments));
          }

          _createClass(List$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('List');
            }
          }, {
            key: "$enter",
            value: function $enter() {
              this.tag('List').patch({
                smooth: {
                  y: 581
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag('List').patch({
                smooth: {
                  y: 850
                }
              });
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._handleUp();

              this.tag('ProgressBar').setProgress(0, 0);
              this.application.mediaplayer.close();
              var item = this.tag('List').focusedItem;
              this.videoData = item;
              this.fetchVideoById(item.id);
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState('PlayPause');
            }
          }]);

          return List$$1;
        }(this),
        /*#__PURE__*/
        function (_this12) {
          _inherits(Hidden, _this12);

          function Hidden() {
            _classCallCheck(this, Hidden);

            return _possibleConstructorReturn(this, _getPrototypeOf(Hidden).apply(this, arguments));
          }

          _createClass(Hidden, [{
            key: "$enter",
            value: function $enter(_ref4) {
              var prevState = _ref4.prevState;
              this._prevState = prevState;
              this.setSmooth('alpha', 0);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this._setInterfaceTimeout();

              this.setSmooth('alpha', 1);
            }
          }, {
            key: "_captureKey",
            value: function _captureKey() {
              this._setState(this._prevState);
            }
          }]);

          return Hidden;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(Error$$1, _this13);

          function Error$$1() {
            _classCallCheck(this, Error$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Error$$1).apply(this, arguments));
          }

          _createClass(Error$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Error');
            }
          }, {
            key: "$enter",
            value: function $enter() {
              this.patch({
                Error: {
                  smooth: {
                    alpha: 1
                  }
                }
              });
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.signal('backButtonPressed');
            }
          }]);

          return Error$$1;
        }(this)];
      }
    }]);

    return Player;
  }(lng.Component);

  var Main =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(Main, _lng$Component10);

    function Main() {
      _classCallCheck(this, Main);

      return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));
    }

    _createClass(Main, [{
      key: "resetGridIndex",
      value: function resetGridIndex() {
        this._index = 0;
      }
    }, {
      key: "_init",
      value: function _init() {
        this._index = 0;
        this._previousIndex = 0;
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        this._previousIndex = this._index;

        if (this._index > 0) {
          this.fire("select", {
            index: this._index - 1
          });
        }

        return false;
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        this._previousIndex = this._index;

        if (this._index < this.list.length - 1) {
          this.fire("select", {
            index: this._index + 1
          });
        }

        return false;
      }
    }, {
      key: "select",
      value: function select(_ref5) {
        var index = _ref5.index;
        this._index = index;
        this.tag("Grid").patch({
          smooth: {
            y: index === 0 ? 50 : index * -510 + 280
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "gridData",
      set: function set(v) {
        this.tag("Grid").patch({
          children: v.map(function (d, idx) {
            return {
              ref: "List".concat(idx),
              data: d,
              backgroundAlpha: idx % 2 === 0,
              type: List,
              y: idx * 510
            };
          })
        });
      }
    }, {
      key: "list",
      get: function get() {
        return this.tag("Grid").children;
      }
    }, {
      key: "active",
      get: function get() {
        return this.list[this._index];
      }
    }, {
      key: "index",
      get: function get() {
        return this._index;
      },
      set: function set(v) {
        this._index = v;
      }
    }, {
      key: "previousIndex",
      get: function get() {
        return this._previousIndex;
      },
      set: function set(v) {
        this._previousIndex = v;
      }
    }, {
      key: "focusedItem",
      get: function get() {
        return this.tag('Grid').children[this.index].focusedItem;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          y: 798,
          w: 1920,
          h: 1080,
          color: 0xFF202430,
          rect: true,
          Grid: {
            x: 120,
            y: 85
          },
          BackToTopButtonShadow: {
            mount: 0,
            x: 1535,
            y: 915,
            color: 0x80000000,
            w: 300,
            h: 100,
            texture: lng.Tools.getShadowRect(300, 100, 50, 10, 10)
          },
          BackToTopButton: {
            zIndex: 10,
            y: 920,
            x: 1544,
            texture: lng.Tools.getRoundRect(276, 80, 40, 3, 0x66404040, true, 0x99101010),
            PressText: {
              color: 0xFFFFFFFF,
              mount: 0.5,
              y: 44,
              x: 60,
              text: {
                text: 'Press',
                fontSize: 24,
                fontFace: 'RobotoRegular'
              }
            },
            Image: {
              src: AppDefinition.getPath("img/undo.png"),
              y: 26,
              x: 101
            },
            Text: {
              color: 0x99F1F1F1,
              mount: 0.5,
              y: 44,
              x: 200,
              text: {
                text: 'top of list',
                fontSize: 26,
                fontFace: 'RobotoRegular'
              }
            }
          }
        };
      }
    }]);

    return Main;
  }(lng.Component);

  var PlayerPreview =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(PlayerPreview, _lng$Component11);

    function PlayerPreview() {
      _classCallCheck(this, PlayerPreview);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerPreview).apply(this, arguments));
    }

    _createClass(PlayerPreview, [{
      key: "getNextVideo",
      value: function getNextVideo() {
        if (this.playlistIndex + 1 <= this.playlist.length - 1) this.playlistIndex = this.playlistIndex + 1;else this.playlistIndex = 0;
        this.videoData = this.playlist[this.playlistIndex];
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('Play');
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          VideoDetails: {
            Icon: {
              y: 505,
              h: 60,
              w: 60
            },
            Uploader: {
              x: 200,
              y: 514,
              text: {
                fontSize: 36
              }
            },
            Title: {
              y: 577,
              text: {
                fontSize: 48,
                lineHeight: 60
              }
            }
          },
          Play: {
            alpha: 1
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus(target) {
        if (target.ref === "SearchButton") {
          return;
        }

        this.patch({
          VideoDetails: {
            Icon: {
              y: 620,
              h: 46,
              w: 46
            },
            Uploader: {
              x: 182,
              y: 625,
              text: {
                fontSize: 26
              }
            },
            Title: {
              y: 675,
              text: {
                fontSize: 38,
                lineHeight: 44
              }
            }
          },
          Play: {
            alpha: 0
          }
        });
      }
    }, {
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this.getNextVideo();
      }
    }, {
      key: "$mediaplayerError",
      value: function $mediaplayerError() {
        this.getNextVideo();
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        settings.mediaplayer.consumer = this;
      }
    }, {
      key: "getMediaplayerSettings",
      value: function getMediaplayerSettings() {
        return {
          stream: {
            src: this._currentUrl
          }
        };
      }
    }, {
      key: "playlist",
      set: function set(v) {
        this._playlist = v;
        this.playlistIndex = 0;
        this.videoData = v[this.playlistIndex];
      },
      get: function get() {
        return this._playlist;
      }
    }, {
      key: "videoData",
      set: function set(d) {
        this._videoData = d;
        this._currentUrl = this._videoData.url;
        this.patch({
          VideoDetails: {
            Uploader: {
              text: {
                text: d['owner.screenname']
              }
            },
            Title: {
              text: {
                text: d.title
              }
            },
            Icon: {
              src: ux.Ui.getImageUrl(d['owner.avatar_80_url'] || '', {
                w: 46,
                h: 46,
                type: "crop"
              })
            }
          }
        });
        this.application.updateFocusSettings();
      },
      get: function get() {
        return this._videoData;
      }
    }, {
      key: "playlistIndex",
      set: function set(idx) {
        this._currentPlaylistIdx = idx;
      },
      get: function get() {
        return this._currentPlaylistIdx;
      }
    }, {
      key: "playlistItem",
      get: function get() {
        return this.playlist[this.playlistIndex];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Shade: {
            rect: true,
            w: 1920,
            h: 250,
            colorTop: 0xE6000000,
            colorBottom: 0x00000000
          },
          ShadeBottom: {
            rect: true,
            w: 1920,
            h: 350,
            y: 450,
            colorTop: 0x00000000,
            colorBottom: 0xE6000000
          },
          VideoDetails: {
            Icon: {
              h: 60,
              w: 60,
              x: 120,
              y: 505
            },
            Uploader: {
              x: 200,
              y: 514,
              text: {
                text: " ",
                fontFace: 'RobotoRegular',
                fontSize: 36,
                color: 0xFFF1F1F1
              }
            },
            Title: {
              w: 1000,
              x: 120,
              y: 577,
              text: {
                text: " ",
                fontFace: 'RobotoRegular',
                maxLines: 2,
                lineHeight: 60,
                fontSize: 48,
                color: 0xFFF1F1F1
              }
            }
          },
          Play: {
            x: 135,
            y: 752,
            type: Button,
            action: 'play',
            image: AppDefinition.getPath('img/play.png')
          }
        };
      }
    }]);

    return PlayerPreview;
  }(lng.Component);

  var MainPage =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(MainPage, _lng$Component12);

    function MainPage() {
      _classCallCheck(this, MainPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(MainPage).apply(this, arguments));
    }

    _createClass(MainPage, [{
      key: "_init",
      value: function _init() {
        this._setState('PlayerPreview');
      }
    }, {
      key: "gridData",
      set: function set(v) {
        this._gridData = v;
        this.tag('Main').gridData = this._gridData;
      },
      get: function get() {
        return this._gridData;
      }
    }, {
      key: "focusedItem",
      get: function get() {
        return this.tag('Main').focusedItem;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          clipbox: true,
          h: 1080,
          w: 1920,
          Main: {
            alpha: 1,
            type: Main,
            signals: {
              backButtonPressed: true
            }
          },
          PlayerPreview: {
            alpha: 0,
            type: PlayerPreview,
            x: 0,
            y: 0,
            w: 1920,
            h: 800
          },
          Logo: {
            alpha: 0,
            src: AppDefinition.getPath("img/Dailymotion_logo_(2015).png"),
            y: 80,
            x: 120
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        var duration = 0.2;
        return [
        /*#__PURE__*/
        function (_this14) {
          _inherits(PlayerPreview$$1, _this14);

          function PlayerPreview$$1() {
            _classCallCheck(this, PlayerPreview$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(PlayerPreview$$1).apply(this, arguments));
          }

          _createClass(PlayerPreview$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('PlayerPreview');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('Main');
            }
          }]);

          return PlayerPreview$$1;
        }(this),
        /*#__PURE__*/
        function (_this15) {
          _inherits(Main$$1, _this15);

          function Main$$1() {
            _classCallCheck(this, Main$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Main$$1).apply(this, arguments));
          }

          _createClass(Main$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Main');
            }
          }, {
            key: "$enter",
            value: function $enter() {
              this.patch({
                Main: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: 250
                  },
                  Grid: {
                    transitions: {
                      y: {
                        duration: duration
                      }
                    },
                    y: 57
                  }
                },
                PlayerPreview: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: -550
                  }
                },
                Logo: {
                  smooth: {
                    y: 0,
                    alpha: 0
                  }
                }
              });
            }
          }, {
            key: "resetMainOffsets",
            value: function resetMainOffsets() {
              this.patch({
                Main: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: 798
                  },
                  Grid: {
                    transitions: {
                      y: {
                        duration: duration
                      }
                    },
                    y: 85
                  }
                },
                PlayerPreview: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: 0,
                    alpha: 1,
                    lineHeight: 60
                  }
                },
                Logo: {
                  smooth: {
                    y: 80,
                    alpha: 1
                  }
                }
              });
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              var main = this.tag('Main');

              if (!main.index && main.index === main.previousIndex) {
                this.fire('resetMainOffsets');

                this._setState('PlayerPreview');

                return;
              }

              if (main.index !== 0) {
                return;
              }

              this.patch({
                Main: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: 250
                  },
                  Grid: {
                    transitions: {
                      y: {
                        duration: duration
                      }
                    }
                  }
                },
                PlayerPreview: {
                  smooth: {
                    alpha: 1,
                    y: -550
                  }
                },
                Logo: {
                  smooth: {
                    y: 0,
                    alpha: 0
                  }
                }
              });

              if (main.previousIndex === 1) {
                return false;
              }
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              var mainIndex = this.tag('Main').index;

              if (mainIndex !== 1) {
                return;
              }

              this.patch({
                Main: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: 0
                  },
                  Grid: {
                    transitions: {
                      y: {
                        duration: duration
                      }
                    }
                  }
                },
                PlayerPreview: {
                  transitions: {
                    y: {
                      duration: duration
                    },
                    alpha: {
                      delay: 0.2
                    }
                  },
                  smooth: {
                    alpha: 0,
                    y: -800
                  }
                },
                Logo: {
                  smooth: {
                    y: 0,
                    alpha: 0
                  }
                }
              });
              return false;
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              var index = this.tag('Main').index;
              var duration = 0.2 + 0.1 * (index && index > 10 ? 10 : index);
              this.patch({
                Main: {
                  transitions: {
                    y: {
                      duration: duration
                    }
                  },
                  smooth: {
                    y: 250
                  },
                  Grid: {
                    transitions: {
                      y: {
                        duration: duration
                      }
                    },
                    smooth: {
                      y: 57
                    }
                  }
                },
                PlayerPreview: {
                  transitions: {
                    alpha: {
                      delay: duration
                    }
                  },
                  smooth: {
                    alpha: 1,
                    y: -550
                  }
                }
              });
              this.tag('Main').resetGridIndex();
              return false;
            }
          }]);

          return Main$$1;
        }(this)];
      }
    }]);

    return MainPage;
  }(lng.Component);

  var KeyboardButton =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(KeyboardButton, _lng$Component13);

    function KeyboardButton() {
      _classCallCheck(this, KeyboardButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardButton).apply(this, arguments));
    }

    _createClass(KeyboardButton, [{
      key: "_init",
      value: function _init() {
        var isInput = this.action === 'input';
        this.patch({
          Background: {
            alpha: isInput ? 0 : 0.5,
            texture: lng.Tools.getRoundRect(this.w, this.h, 7, 0, 0xffffffff, true, 0xffffffff)
          },
          Label: {
            color: isInput ? 0xffffffff : 0xff000000,
            x: this.w / 2,
            y: this.h / 2
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Background: {
            smooth: {
              alpha: 1,
              colorBottom: 0xff2654a8,
              colorTop: 0xff3777ee
            }
          },
          Label: {
            smooth: {
              color: 0xffffffff
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var isInput = this.action === 'input';
        this.patch({
          Background: {
            smooth: {
              alpha: isInput ? 0 : 0.5,
              colorTop: 0xffe8e8e8,
              colorBottom: 0xffd1d1d1
            }
          },
          Label: {
            smooth: {
              color: isInput ? 0xffffffff : 0xff000000
            }
          }
        });
      }
    }, {
      key: "action",
      set: function set(v) {
        this._a = v;
      },
      get: function get() {
        return this._a;
      }
    }, {
      key: "c",
      get: function get() {
        return this.key.c;
      }
    }, {
      key: "key",
      set: function set(k) {
        this._k = k;
        var label = {
          mountX: 0.5,
          mountY: 0.4,
          text: {
            text: this.key.c || '',
            fontSize: 36,
            fontFace: 'RobotoRegular',
            textAlign: 'center'
          }
        };

        if (_typeof(k.c) === 'object') {
          label = {
            mountX: 0.5,
            mountY: 0.30,
            text: {
              text: k.c.type,
              fontFace: k.c.font,
              fontSize: k.c.fontSize || 40,
              textAlign: 'Center'
            }
          };
        }

        var isInput = this.action === 'input';
        this.patch({
          Background: {
            alpha: isInput ? 0 : 0.5,
            texture: lng.Tools.getRoundRect(this.w, this.h, 7, 0, 0xffffffff, true, 0xffffffff)
          },
          Label: lng.tools.ObjMerger.merge({
            x: this.w / 2,
            y: this.h / 2,
            color: isInput ? 0xffffffff : 0xff000000
          }, label)
        });

        if (this.hasFocus()) {
          this.fire('_focus');
        }
      },
      get: function get() {
        return this._k;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            colorTop: 0xffe8e8e8
            /*0xff3777ee*/
            ,
            colorBottom: 0xffd1d1d1
            /*0xff2654a8*/

          },
          Label: {
            color: 0xffffffff
          }
        };
      }
    }]);

    return KeyboardButton;
  }(lng.Component);

  var layouts = {
    'ABC': {
      keyWidth: 64,
      keyHeight: 84,
      horizontalSpacing: 8,
      verticalSpacing: 12,
      rows: {
        Row1: {
          keys: {
            Key1: {
              c: 'Q'
            },
            Key2: {
              c: 'W'
            },
            Key3: {
              c: 'E'
            },
            Key4: {
              c: 'R'
            },
            Key5: {
              c: 'T'
            },
            Key6: {
              c: 'Y'
            },
            Key7: {
              c: 'U'
            },
            Key8: {
              c: 'I'
            },
            Key9: {
              c: 'O'
            },
            Key10: {
              c: 'P'
            }
          }
        },
        Row2: {
          x: 34,
          keys: {
            Key1: {
              c: 'A'
            },
            Key2: {
              c: 'S'
            },
            Key3: {
              c: 'D'
            },
            Key4: {
              c: 'F'
            },
            Key5: {
              c: 'G'
            },
            Key6: {
              c: 'H'
            },
            Key7: {
              c: 'J'
            },
            Key8: {
              c: 'K'
            },
            Key9: {
              c: 'L'
            }
          }
        },
        Row3: {
          keys: {
            Key1: {
              w: 98,
              c: 'Aa',
              toLayout: 'abc',
              action: 'toggleToLayout'
            },
            Key2: {
              c: 'Z'
            },
            Key3: {
              c: 'X'
            },
            Key4: {
              c: 'C'
            },
            Key5: {
              c: 'V'
            },
            Key6: {
              c: 'B'
            },
            Key7: {
              c: 'N'
            },
            Key8: {
              c: 'M'
            },
            Key9: {
              w: 98,
              c: {
                type: 'backspace',
                font: 'Material-Icons'
              },
              action: 'backspace'
            }
          }
        },
        Row4: {
          keys: {
            Key1: {
              w: 136,
              toLayout: '#123',
              c: '#123',
              action: 'toggleToLayout'
            },
            Key2: {
              c: ','
            },
            Key3: {
              w: 276,
              action: 'space'
            },
            Key4: {
              c: '.'
            },
            Key5: {
              w: 136,
              c: {
                type: 'keyboard',
                font: 'Material-Icons',
                fontSize: 50
              },
              action: 'hideKeyboard'
            }
          }
        }
      }
    },
    'abc': {
      keyWidth: 64,
      keyHeight: 84,
      horizontalSpacing: 8,
      verticalSpacing: 12,
      rows: {
        Row1: {
          keys: {
            Key1: {
              c: 'q'
            },
            Key2: {
              c: 'w'
            },
            Key3: {
              c: 'e'
            },
            Key4: {
              c: 'r'
            },
            Key5: {
              c: 't'
            },
            Key6: {
              c: 'y'
            },
            Key7: {
              c: 'u'
            },
            Key8: {
              c: 'i'
            },
            Key9: {
              c: 'o'
            },
            Key10: {
              c: 'p'
            }
          }
        },
        Row2: {
          x: 34,
          keys: {
            Key1: {
              c: 'a'
            },
            Key2: {
              c: 's'
            },
            Key3: {
              c: 'd'
            },
            Key4: {
              c: 'f'
            },
            Key5: {
              c: 'g'
            },
            Key6: {
              c: 'h'
            },
            Key7: {
              c: 'j'
            },
            Key8: {
              c: 'k'
            },
            Key9: {
              c: 'l'
            }
          }
        },
        Row3: {
          keys: {
            Key1: {
              w: 98,
              c: 'aA',
              toLayout: 'ABC',
              action: 'toggleToLayout'
            },
            Key2: {
              c: 'z'
            },
            Key3: {
              c: 'x'
            },
            Key4: {
              c: 'c'
            },
            Key5: {
              c: 'v'
            },
            Key6: {
              c: 'b'
            },
            Key7: {
              c: 'n'
            },
            Key8: {
              c: 'm'
            },
            Key9: {
              w: 98,
              c: {
                type: 'backspace',
                font: 'Material-Icons'
              },
              action: 'backspace'
            }
          }
        },
        Row4: {
          keys: {
            Key1: {
              w: 136,
              toLayout: '#123',
              c: '#123',
              action: 'toggleToLayout'
            },
            Key2: {
              c: ','
            },
            Key3: {
              w: 276,
              action: 'space'
            },
            Key4: {
              c: '.'
            },
            Key5: {
              w: 136,
              c: {
                type: 'keyboard',
                font: 'Material-Icons',
                fontSize: 50
              },
              action: 'hideKeyboard'
            }
          }
        }
      }
    },
    '#123': {
      keyWidth: 64,
      keyHeight: 84,
      horizontalSpacing: 8,
      verticalSpacing: 12,
      rows: {
        Row1: {
          keys: {
            Key1: {
              c: '1'
            },
            Key2: {
              c: '2'
            },
            Key3: {
              c: '3'
            },
            Key4: {
              c: '4'
            },
            Key5: {
              c: '5'
            },
            Key6: {
              c: '6'
            },
            Key7: {
              c: '7'
            },
            Key8: {
              c: '8'
            },
            Key9: {
              c: '9'
            },
            Key10: {
              c: '0'
            }
          }
        },
        Row2: {
          x: 34,
          keys: {
            Key1: {
              c: '@'
            },
            Key2: {
              c: '#'
            },
            Key3: {
              c: '€'
            },
            Key4: {
              c: '_'
            },
            Key5: {
              c: '&'
            },
            Key6: {
              c: '-'
            },
            Key7: {
              c: '+'
            },
            Key8: {
              c: '('
            },
            Key9: {
              c: ')'
            }
          }
        },
        Row3: {
          keys: {
            Key1: {
              w: 98,
              c: '{&=',
              toLayout: '{&=',
              action: 'toggleToLayout'
            },
            Key2: {
              c: '*'
            },
            Key3: {
              c: '\"'
            },
            Key4: {
              c: '\''
            },
            Key5: {
              c: ':'
            },
            Key6: {
              c: ';'
            },
            Key7: {
              c: '!'
            },
            Key8: {
              c: '?'
            },
            Key9: {
              w: 98,
              c: {
                type: 'backspace',
                font: 'Material-Icons'
              },
              action: 'backspace'
            }
          }
        },
        Row4: {
          keys: {
            Key1: {
              w: 136,
              toLayout: 'ABC',
              c: 'ABC',
              action: 'toggleToLayout'
            },
            Key2: {
              c: ','
            },
            Key3: {
              w: 276,
              action: 'space'
            },
            Key4: {
              c: '.'
            },
            Key5: {
              w: 136,
              c: {
                type: 'keyboard',
                font: 'Material-Icons',
                fontSize: 50
              },
              action: 'hideKeyboard'
            }
          }
        }
      }
    },
    '{&=': {
      keyWidth: 64,
      keyHeight: 84,
      horizontalSpacing: 8,
      verticalSpacing: 12,
      rows: {
        Row1: {
          keys: {
            Key1: {
              c: '~'
            },
            Key2: {
              c: '\`'
            },
            Key3: {
              c: '|'
            },
            Key4: {
              c: "\u2022"
            },
            Key5: {
              c: '√'
            },
            Key6: {
              c: 'π'
            },
            Key7: {
              c: "\xF7"
            },
            Key8: {
              c: "\xD7"
            },
            Key9: {
              c: '¶'
            },
            Key10: {
              c: '∆'
            }
          }
        },
        Row2: {
          keys: {
            Key1: {
              c: '£'
            },
            Key2: {
              c: '¥'
            },
            Key3: {
              c: '€'
            },
            Key4: {
              c: '¢'
            },
            Key5: {
              c: '^'
            },
            Key6: {
              c: '°'
            },
            Key7: {
              c: '='
            },
            Key8: {
              c: '{'
            },
            Key9: {
              c: '}'
            },
            Key10: {
              c: '\\'
            }
          }
        },
        Row3: {
          keys: {
            Key1: {
              w: 98,
              c: '#123',
              toLayout: '#123',
              action: 'toggleToLayout'
            },
            Key2: {
              c: '%'
            },
            Key3: {
              c: '©'
            },
            Key4: {
              c: '®'
            },
            Key5: {
              c: '™'
            },
            Key6: {
              c: "\u2713"
            },
            Key7: {
              c: '['
            },
            Key8: {
              c: ']'
            },
            Key9: {
              w: 98,
              c: {
                type: 'backspace',
                font: 'Material-Icons'
              },
              action: 'backspace'
            }
          }
        },
        Row4: {
          keys: {
            Key1: {
              w: 136,
              toLayout: 'ABC',
              c: 'ABC',
              action: 'toggleToLayout'
            },
            Key2: {
              c: '<'
            },
            Key3: {
              w: 276,
              action: 'space'
            },
            Key4: {
              c: '>'
            },
            Key5: {
              w: 136,
              c: {
                type: 'keyboard',
                font: 'Material-Icons',
                fontSize: 50
              },
              action: 'hideKeyboard'
            }
          }
        }
      }
    }
  };

  var Keyboard =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(Keyboard, _lng$Component14);

    function Keyboard() {
      _classCallCheck(this, Keyboard);

      return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard).apply(this, arguments));
    }

    _createClass(Keyboard, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.currentKey;
      }
    }, {
      key: "_navigate",
      value: function _navigate(dir, value) {
        dir = dir === 'up' || dir === 'down' ? 'vertical' : 'horizontal';

        if (dir === 'horizontal' && this.colIndex + value < this.rowLength && this.colIndex + value > -1) {
          this.previous = null;
          return this.colIndex += value;
        } else if (dir === 'vertical' && this.rowIndex + value < this.rows.length && this.rowIndex + value > -1) {
          var currentColIndex = this.colIndex;
          var targetRow = this.rowIndex + value;

          if (this.previous && this.previous.row === targetRow) {
            var tmp = this.previous.col;
            this.previous.col = this.colIndex;
            this.colIndex = tmp;
          } else {
            var _targetRow = this.children[this.rowIndex + value];
            var targetItems = _targetRow.children;
            var ck = this.currentKey;
            var target = 0;

            for (var i = 0; i < targetItems.length; i++) {
              var ckx = this.children[this.rowIndex].x + ck.x;
              var tix = _targetRow.x + targetItems[i].x;

              if (ckx >= tix && ckx <= tix + targetItems[i].w || tix >= ckx && tix <= ckx + ck.w) {
                target = i;
                break;
              }
            }

            this.colIndex = target;
          }

          this.previous = {
            col: currentColIndex,
            row: this.rowIndex
          };
          return this.rowIndex += value;
        }

        return false;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.colIndex = 0;
        this.rowIndex = 0;
        this._value = '';
        this.previous = null;
      }
    }, {
      key: "_init",
      value: function _init() {
        this.reset();

        this._update();
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        return this._navigate('right', 1);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        return this._navigate('left', -1);
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        return this._navigate('up', -1);
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        return this._navigate('down', 1);
      }
    }, {
      key: "toggleToLayout",
      value: function toggleToLayout(e) {
        this.layout = e.value;

        this._update();
      }
    }, {
      key: "_update",
      value: function _update() {
        var KeyboardLayouts = this.KeyboardLayouts;
        var KeyboardButton$$1 = this.KeyboardButton;

        if (this.layout && KeyboardLayouts[this.layout] === undefined) {
          console.error("Configured layout \"".concat(this.layout, "\" does not exist. Reverting to \"").concat(Object.keys(KeyboardLayouts)[0], "\""));
          this.layout = null;
        }

        if (!this.layout) {
          this.layout = Object.keys(KeyboardLayouts)[0];
        }

        var _KeyboardLayouts$this = KeyboardLayouts[this.layout],
            _KeyboardLayouts$this2 = _KeyboardLayouts$this.rows,
            rows = _KeyboardLayouts$this2 === void 0 ? {} : _KeyboardLayouts$this2,
            keyWidth = _KeyboardLayouts$this.keyWidth,
            keyHeight = _KeyboardLayouts$this.keyHeight,
            _KeyboardLayouts$this3 = _KeyboardLayouts$this.spacing,
            spacing = _KeyboardLayouts$this3 === void 0 ? 0 : _KeyboardLayouts$this3,
            _KeyboardLayouts$this4 = _KeyboardLayouts$this.horizontalSpacing,
            horizontalSpacing = _KeyboardLayouts$this4 === void 0 ? 0 : _KeyboardLayouts$this4,
            _KeyboardLayouts$this5 = _KeyboardLayouts$this.verticalSpacing,
            verticalSpacing = _KeyboardLayouts$this5 === void 0 ? 0 : _KeyboardLayouts$this5;
        this.children = Object.keys(rows).map(function (r, index) {
          var row = rows[r];
          var keyOffset = 0;
          return {
            ref: r,
            y: keyHeight * index + index * (verticalSpacing || spacing || 0),
            x: row.x || 0,
            children: Object.keys(row.keys).map(function (k, index) {
              var key = Object.assign({
                action: 'input'
              }, row.keys[k]);
              var prevOffset = keyOffset;
              keyOffset += (key.w || keyWidth) + (horizontalSpacing || spacing);
              return {
                ref: k,
                key: key || index,
                action: key.action,
                toLayout: key.toLayout,
                x: prevOffset,
                w: key.w || keyWidth,
                h: key.h || keyHeight,
                type: KeyboardButton$$1
              };
            })
          };
        });
        this.signal('keysUpdated');
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var key = this.currentKey;

        switch (key.action) {
          case 'input':
            this.value += key.c;
            break;

          case 'backspace':
            this.value = this.value.slice(0, -1);
            break;

          case 'space':
            if (this.value.length > 0) {
              this.value += ' ';
            }

            break;

          case 'delete':
            this.value = '';
            break;

          case 'toggleToLayout':
            this.toggleToLayout({
              value: key.toLayout
            });
            break;

          default:
            this.signal(key.action);
            break;
        }
      }
    }, {
      key: "KeyboardButton",
      get: function get() {
        return KeyboardButton;
      }
    }, {
      key: "KeyboardLayouts",
      get: function get() {
        return layouts;
      }
    }, {
      key: "value",
      set: function set(v) {
        this._value = v;
        this.signal('valueChanged', {
          value: v
        });
      },
      get: function get() {
        return this._value;
      }
    }, {
      key: "rows",
      get: function get() {
        return this.children;
      }
    }, {
      key: "rowLength",
      get: function get() {
        return this.children[this.rowIndex].children.length;
      }
    }, {
      key: "currentKey",
      get: function get() {
        return this.children[this.rowIndex].children[this.colIndex];
      }
    }, {
      key: "layout",
      set: function set(layout) {
        this._layout = layout;

        this._update();
      },
      get: function get() {
        return this._layout;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {};
      }
    }]);

    return Keyboard;
  }(lng.Component); // import IconItem from "../components/IconItem.js";


  var KeyboardButton$1 =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(KeyboardButton$1, _lng$Component15);

    function KeyboardButton$1() {
      _classCallCheck(this, KeyboardButton$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardButton$1).apply(this, arguments));
    }

    _createClass(KeyboardButton$1, [{
      key: "_init",
      value: function _init() {
        var action = this.action !== 'input' && this.action !== 'backspace';
        this.patch({
          Background: {
            color: action ? 0x40F1F1F1 : 0x00000000,
            texture: lng.Tools.getRoundRect(this.w, this.h, this.h / 2, 0, 0xffffffff, true, 0xffffffff),
            Label: {
              x: this.w / 2,
              y: this.h / 2,
              text: {
                fontSize: action ? 28 : 38
              }
            },
            Icon: {
              x: this.w / 2,
              y: this.h / 2
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag('Background').patch({
          smooth: {
            color: 0xFF00C1F8
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag('Background').patch({
          smooth: {
            color: this.action !== 'input' && this.action !== 'backspace' ? 0x40F1F1F1 : 0x00000000
          }
        });
      }
    }, {
      key: "action",
      set: function set(v) {
        this._a = v;
      },
      get: function get() {
        return this._a;
      }
    }, {
      key: "c",
      get: function get() {
        return this.key.c;
      }
    }, {
      key: "key",
      set: function set(k) {
        this._k = k;

        if (_typeof(k.c) === 'object') {
          this.patch({
            Background: {
              Label: {
                alpha: 0
              },
              Icon: {
                alpha: 1,
                src: AppDefinition.getPath("img/".concat(k.c.src, ".png"))
              }
            }
          });
        } else {
          this.patch({
            Background: {
              Label: {
                alpha: 1,
                text: {
                  text: k.c || ''
                }
              },
              Icon: {
                alpha: 0
              }
            }
          });
        }
      },
      get: function get() {
        return this._k;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            mountY: 0.5,
            Label: {
              color: 0xFFF1F1F1,
              mountX: 0.5,
              mountY: 0.45,
              text: {
                text: '',
                fontSize: 38,
                fontFace: 'RobotoRegular',
                textAlign: 'center'
              }
            },
            Icon: {
              alpha: 0,
              mountX: 0.5,
              mountY: 0.5
            }
          }
        };
      }
    }]);

    return KeyboardButton$1;
  }(lng.Component);

  var Keyboard$1 =
  /*#__PURE__*/
  function (_Keyboard) {
    _inherits(Keyboard$1, _Keyboard);

    function Keyboard$1() {
      _classCallCheck(this, Keyboard$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard$1).apply(this, arguments));
    }

    _createClass(Keyboard$1, [{
      key: "KeyboardButton",
      get: function get() {
        return KeyboardButton$1;
      }
    }, {
      key: "KeyboardLayouts",
      get: function get() {
        return KeyboardLayouts;
      }
    }]);

    return Keyboard$1;
  }(Keyboard);

  var KeyboardLayouts = {
    'abc': {
      keyWidth: 80,
      keyHeight: 80,
      horizontalSpacing: 75,
      verticalSpacing: 0,
      rows: {
        Row1: {
          keys: {
            Key1: {
              w: 200,
              h: 60,
              c: 'Delete',
              action: 'delete'
            },
            Key2: {
              c: 'a'
            },
            Key3: {
              c: 'b'
            },
            Key4: {
              c: 'c'
            },
            Key5: {
              c: 'd'
            },
            Key6: {
              c: 'e'
            },
            Key7: {
              c: 'f'
            },
            Key8: {
              c: 'g'
            },
            Key9: {
              c: 'h'
            },
            Key10: {
              c: {
                src: 'backspace',
                w: 100,
                h: 100
              },
              action: 'backspace'
            }
          }
        },
        Row2: {
          keys: {
            Key1: {
              w: 200,
              h: 60,
              action: 'space',
              c: 'Space'
            },
            Key2: {
              c: 'i'
            },
            Key3: {
              c: 'j'
            },
            Key4: {
              c: 'k'
            },
            Key5: {
              c: 'l'
            },
            Key6: {
              c: 'm'
            },
            Key7: {
              c: 'n'
            },
            Key8: {
              c: 'o'
            },
            Key9: {
              c: 'p'
            },
            Key10: {
              c: 'q'
            }
          }
        },
        Row3: {
          keys: {
            Key1: {
              w: 200,
              h: 60,
              toLayout: '#123',
              c: '#123',
              action: 'toggleToLayout'
            },
            Key2: {
              c: 'r'
            },
            Key3: {
              c: 's'
            },
            Key4: {
              c: 't'
            },
            Key5: {
              c: 'u'
            },
            Key6: {
              c: 'v'
            },
            Key7: {
              c: 'w'
            },
            Key8: {
              c: 'x'
            },
            Key9: {
              c: 'y'
            },
            Key10: {
              c: 'z'
            }
          }
        }
      }
    },
    '#123': {
      keyWidth: 80,
      keyHeight: 80,
      horizontalSpacing: 75,
      verticalSpacing: 0,
      rows: {
        Row1: {
          keys: {
            Key1: {
              w: 200,
              h: 60,
              c: 'Delete',
              action: 'delete'
            },
            Key2: {
              c: '1'
            },
            Key3: {
              c: '2'
            },
            Key4: {
              c: '3'
            },
            Key5: {
              c: '4'
            },
            Key6: {
              c: '-'
            },
            Key7: {
              c: '+'
            },
            Key8: {
              c: '*'
            },
            Key9: {
              c: '.'
            },
            Key10: {
              c: {
                src: 'backspace',
                w: 100,
                h: 100
              },
              action: 'backspace'
            }
          }
        },
        Row2: {
          keys: {
            Key1: {
              w: 200,
              h: 60,
              action: 'space',
              c: 'Space'
            },
            Key2: {
              c: '5'
            },
            Key3: {
              c: '6'
            },
            Key4: {
              c: '7'
            },
            Key5: {
              c: '8'
            },
            Key6: {
              c: '/'
            },
            Key7: {
              c: '\\'
            },
            Key8: {
              c: '|'
            },
            Key9: {
              c: '{'
            },
            Key10: {
              c: '}'
            }
          }
        },
        Row3: {
          keys: {
            Key1: {
              w: 200,
              h: 60,
              toLayout: 'abc',
              c: 'Abc',
              action: 'toggleToLayout'
            },
            Key2: {
              c: '9'
            },
            Key3: {
              c: '0'
            },
            Key4: {
              c: '\''
            },
            Key5: {
              c: '&'
            },
            Key6: {
              c: '?'
            },
            Key7: {
              c: '@'
            },
            Key8: {
              c: '='
            },
            Key9: {
              c: '['
            },
            Key10: {
              c: ']'
            }
          }
        }
      }
    }
  };

  var InputField =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(InputField, _lng$Component16);

    function InputField() {
      _classCallCheck(this, InputField);

      return _possibleConstructorReturn(this, _getPrototypeOf(InputField).apply(this, arguments));
    }

    _createClass(InputField, [{
      key: "_limitTextLength",
      value: function _limitTextLength(value, max) {
        if (value.length <= max) {
          return value;
        }

        var len = value.length;
        var offset = len - max;
        return value.substring(offset, len);
      }
    }, {
      key: "inspectValue",
      value: function inspectValue(value) {
        this._hasInput = false;

        if (value.length > 0) {
          this._hasInput = true;
          return value;
        }

        return this.emptyInputString;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.value = '';
      }
    }, {
      key: "_init",
      value: function _init() {
        this._hasInput = false;
        var icon = this.tag('Icon');
        var queryString = this.tag('QueryString');
        var background = this.tag('Background');
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          QueryString: {
            smooth: {
              color: this._fc.textFocus
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          QueryString: {
            smooth: {
              color: this.hasInput ? this._hasInputColor : this._emptyInputColor
            }
          }
        });
      }
    }, {
      key: "value",
      set: function set(v) {
        var screenValue = this.inspectValue(v);
        this.patch({
          QueryString: {
            text: {
              text: this._limitTextLength(screenValue, InputField.MAX_CHARS)
            }
          }
        });
        this._value = screenValue;
      },
      get: function get() {
        return this._value;
      }
    }, {
      key: "emptyInputString",
      get: function get() {
        return 'Search';
      }
    }, {
      key: "hasInput",
      get: function get() {
        return this._hasInput;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Shadow: {
            color: 0xB3000000,
            x: -8,
            w: 1700,
            h: 120,
            texture: lng.Tools.getShadowRect(1700, 120, 60, 20, 20)
          },
          Background: {
            h: 106,
            w: 1686,
            texture: lng.Tools.getRoundRect(1686, 106, 53, 3, 0x80BBBBBB, true, 0x80F1F1F1)
          },
          Icon: {
            y: 33,
            x: 35,
            src: AppDefinition.getPath("img/search-big.png")
          },
          QueryString: {
            y: 19,
            x: 120,
            color: 0xFFf1f1f1,
            text: {
              text: 'Search',
              fontSize: 50,
              fontFace: 'RobotoRegular'
            }
          }
        };
      }
    }]);

    return InputField;
  }(lng.Component);

  InputField.MAX_CHARS = 33;

  var Search =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(Search, _lng$Component17);

    function Search() {
      _classCallCheck(this, Search);

      return _possibleConstructorReturn(this, _getPrototypeOf(Search).apply(this, arguments));
    }

    _createClass(Search, [{
      key: "getResults",
      value: function getResults(term) {
        var _this16 = this;

        if (!term) {
          this.clearListData();
          return;
        }

        this.api.search(term).then(function (data) {
          _this16.listData = {
            item: {
              name: !data.list.length ? 'No results' : 'Results'
            },
            list: data.list
          };
        });
      }
    }, {
      key: "clearListData",
      value: function clearListData() {
        this.listData = {
          item: {
            name: 'Results'
          },
          list: []
        };
      }
    }, {
      key: "_init",
      value: function _init() {
        this.clearListData();
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            alpha: 1
          }
        });

        if (this.tag('List')._item.list.length > 0) {
          this._setState('List');

          return;
        }

        this._setState('Keyboard');
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            alpha: 0
          }
        });
      }
    }, {
      key: "valueChanged",
      value: function valueChanged(e) {
        this.tag('InputField').value = e.value;
        this.getResults(e.value);
        this.resetListIndex();
      }
    }, {
      key: "resetListIndex",
      value: function resetListIndex() {
        return this.tag('List').resetIndex();
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "listData",
      set: function set(d) {
        this.tag('List').data = d;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 1080,
          w: 1920,
          clipbox: true,
          color: 0xFF202630,
          rect: true,
          Shadow: {
            w: 1920,
            h: 180,
            colorTop: 0xCC000000,
            colorBottom: 0x00000000,
            rect: true
          },
          InputField: {
            x: 117,
            y: 77,
            type: InputField
          },
          Keyboard: {
            x: 140,
            y: 265,
            type: Keyboard$1,
            signals: {
              keysUpdated: true,
              valueChanged: true,
              search: true,
              hideKeyboard: true
            }
          },
          List: {
            type: List,
            y: 600,
            x: 120,
            backgroundAlpha: false
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this17) {
          _inherits(Keyboard, _this17);

          function Keyboard() {
            _classCallCheck(this, Keyboard);

            return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard).apply(this, arguments));
          }

          _createClass(Keyboard, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Keyboard');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this.tag('List')._item.list.length === 0) return;

              this._setState('List');
            }
          }]);

          return Keyboard;
        }(this),
        /*#__PURE__*/
        function (_this18) {
          _inherits(List$$1, _this18);

          function List$$1() {
            _classCallCheck(this, List$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(List$$1).apply(this, arguments));
          }

          _createClass(List$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('List');
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState('Keyboard');
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.signal('videoSelected', this.tag('List').focusedItem);
            }
          }]);

          return List$$1;
        }(this)];
      }
    }]);

    return Search;
  }(lng.Component);

  var DailymotionApi =
  /*#__PURE__*/
  function () {
    function DailymotionApi() {
      _classCallCheck(this, DailymotionApi);

      this._expires = null;
      this._token = null;
    }

    _createClass(DailymotionApi, [{
      key: "getToken",
      value: function getToken() {
        var _this19 = this;

        var url = 'https://api.dailymotion.com/oauth/token';
        var proxyUrl = "http://52.29.76.170/?url=" + encodeURIComponent(url);
        var data = {
          grant_type: 'client_credentials',
          client_secret: '45b0cbc527f20234e46ee0d1b5ca46f6fcf694e1',
          client_id: 'c46473a40db3e0f27da3'
        };
        var parts = [];
        Object.keys(data).forEach(function (k) {
          parts.push("".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(data[k])));
        });
        return fetch(proxyUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          mode: 'cors',
          body: parts.join('&')
        }).then(function (res) {
          return res.json();
        }).then(function (res) {
          _this19._token = res.access_token;
          _this19._expires = new Date();

          _this19._expires.setSeconds(_this19._expires.getSeconds() + res.expires_in);

          return 'success';
        });
      }
    }, {
      key: "isTokenValid",
      value: function isTokenValid() {
        this._current = new Date();

        if (!this._token || Date.parse(this._expires) < Date.parse(this._current)) {
          return this.getToken().then(function (res) {
            if (res !== 'success') {
              return 'tokenInvalid';
            }

            return 'tokenValid';
          });
        } else {
          return Promise.resolve(true);
        }
      }
    }, {
      key: "getTrendingVideos",
      value: function getTrendingVideos() {
        var _this20 = this;

        var fields = "id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration";
        var url = "https://api.dailymotion.com/videos?sort=trending&limit=20&fields=".concat(fields);
        return fetch(url, {
          method: 'GET'
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          var promises = response.list.map(function (video) {
            return _this20.getVideo(video.id).then(function (urlResponse) {
              video.url = urlResponse;
              return video;
            });
          });
          return Promise.all(promises);
        });
      }
    }, {
      key: "getVideo",
      value: function getVideo(id) {
        var _this21 = this;

        return this.isTokenValid().then(function () {
          var url = "https://api.dailymotion.com/video/".concat(id, "?access_token=").concat(_this21._token, "&localization=nl_NL&family_filter=0&fields=stream_h264_hd_url,stream_h264_qhd_url,stream_h264_ld_url,stream_hls_url");
          return fetch(url, {
            method: 'GET'
          });
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          return _this21.extractPlayUrl({
            list: response,
            preferred: "stream_hls_url"
          });
        });
      }
    }, {
      key: "search",
      value: function search(term) {
        var fields = "id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration";
        var url = "https://api.dailymotion.com/videos?limit=20&fields=".concat(fields, "&search=").concat(term);
        return fetch(url, {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        });
      }
    }, {
      key: "getRelated",
      value: function getRelated(id) {
        var fields = "id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration";
        var url = "https://api.dailymotion.com/video/".concat(id, "/related&limit=20&fields=").concat(fields);
        return fetch(url, {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        });
      }
    }, {
      key: "getChannels",
      value: function getChannels() {
        var _this22 = this;

        var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'popular';
        var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        return fetch("https://api.dailymotion.com/channels?sort=".concat(sort, "&limit=").concat(limit), {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          var apicalls = data.list.map(function (item) {
            return _this22.getChannelVideos(item, limit);
          });
          return Promise.all(apicalls);
        }).then(function (lists) {
          return lists.filter(function (channel) {
            return channel.list && channel.list.length;
          });
        });
      } // todo Featured Playlists for the MainPage ( slider )

    }, {
      key: "getPlaylists",
      value: function getPlaylists() {
        var url = 'https://api.dailymotion.com/playlists?fields=id,name,thumbnail_360_url,videos_total,owner.screenname,&private=0&sort=recent&limit=5'; // let url = 'https://api.dailymotion.com/playlists?search=featured&limit=1'

        return fetch(url, {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        }).then(function (res) {
          console.log('playlist list : ', res, res.list);
          return res.list; // return this.getPlaylist(res.list[0].id)
        });
        /*        .then((res) => {
                    return res
                })*/
      }
    }, {
      key: "getPlaylist",
      value: function getPlaylist(id) {
        // const fields = `id,item_type,name,description,owner,owner.id,owner.item_type,owner.is_following,owner.parent,owner.active,owner.status,owner.username,owner.screenname,owner.fullname,owner.website_url,owner.facebook_url,owner.pinterest_url,owner.twitter_url,owner.instagram_url,owner.googleplus_url,owner.linkedin_url,owner.created_time,owner.description, owner.language, owner.gender, owner.email, owner.birthday, owner.views_total, owner.videos_total, owner.playlists_total, owner.url, owner.avatar_25_url, owner.avatar_60_url, owner.avatar_80_url, owner.avatar_120_url, owner.avatar_190_url, owner.avatar_240_url, owner.avatar_360_url, owner.avatar_480_url, owner.avatar_720_url, owner.cover_100_url, owner.cover_150_url, owner.cover_200_url, owner.cover_250_url, owner.cover_url, owner.limits, owner.first_name, owner.last_name, owner.address, owner.city, owner.country, owner.reposts_total, owner.followers_total, owner.following_total, owner.partner, owner.verified, owner.children_total, owner.revenues_video_last_day, owner.revenues_video_last_week, owner.revenues_video_last_month, owner.revenues_video_total, owner.revenues_website_last_day, owner.revenues_website_last_week, owner.revenues_website_last_month, owner.revenues_website_total, owner.revenues_paidcontent_last_day, owner.revenues_paidcontent_last_week, owner.revenues_paidcontent_last_month, owner.revenues_paidcontent_total, owner.revenues_claim_last_day, owner.revenues_claim_last_week, owner.revenues_claim_last_month, owner.revenues_claim_total, videos_total, thumbnail_url, thumbnail_60_url, thumbnail_120_url, thumbnail_180_url, thumbnail_240_url, thumbnail_360_url, thumbnail_480_url, thumbnail_720_url, thumbnail_1080_url, created_time, updated_time`
        var fields = "id,name,videos_total,owner.avatar_80_url,thumbnail_url";
        var url = "https://api.dailymotion.com/playlist/".concat(id, "?fields=").concat(fields);
        return fetch(url, {
          method: 'GET'
        }).then(function (response) {
          return response.json();
        });
      }
    }, {
      key: "getChannelVideos",
      value: function getChannelVideos(item, limit) {
        var fields = "id,owner.avatar_80_url,thumbnail_360_url,title,owner.screenname,duration";
        return fetch("https://api.dailymotion.com/channel/".concat(item.id, "/videos&sort=trending&limit=").concat(limit, "&fields=").concat(fields), {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          return {
            item: item,
            list: data.list
          };
        });
      }
    }, {
      key: "extractPlayUrl",
      value: function extractPlayUrl(_ref6) {
        var list = _ref6.list,
            preferred = _ref6.preferred;

        if (list[preferred]) {
          return list[preferred];
        }

        var keys = Object.keys(list);

        for (var i = 0, j = keys.length; i < j; i++) {
          var url = list[keys[i]];

          if (url) {
            return url;
          }
        }

        return false;
      }
    }]);

    return DailymotionApi;
  }();

  var Splash =
  /*#__PURE__*/
  function (_lng$Component18) {
    _inherits(Splash, _lng$Component18);

    function Splash() {
      _classCallCheck(this, Splash);

      return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
    }

    _createClass(Splash, [{
      key: "_active",
      value: function _active() {
        this.tag('Logo').patch({
          smooth: {
            alpha: 1,
            y: 540
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 1,
          h: 1080,
          w: 1920,
          rect: true,
          color: 0xFF202630,
          transitions: {
            alpha: {
              duration: 0.5
            }
          },
          Logo: {
            alpha: 0,
            h: 119,
            w: 666,
            transitions: {
              alpha: {
                duration: 2
              },
              y: {
                duration: 1
              }
            },
            src: AppDefinition.getPath("img/splash_logo.png"),
            mount: 0.5,
            x: 960,
            y: 580
          }
        };
      }
    }]);

    return Splash;
  }(lng.Component);

  var DailymotionApp =
  /*#__PURE__*/
  function (_ux$App) {
    _inherits(DailymotionApp, _ux$App);

    function DailymotionApp() {
      _classCallCheck(this, DailymotionApp);

      return _possibleConstructorReturn(this, _getPrototypeOf(DailymotionApp).apply(this, arguments));
    }

    _createClass(DailymotionApp, [{
      key: "muteMediaPlayer",
      value: function muteMediaPlayer() {
        this.application.mediaplayer.muted = true;
      }
    }, {
      key: "fillSlider",
      value: function fillSlider() {
        this.tag('MainPage').gridData = this._channels;
      }
    }, {
      key: "videoSelected",
      value: function videoSelected(item) {
        this.preparePlayer(item);
        this.patch({
          MainPage: {
            smooth: {
              alpha: 0
            }
          },
          SearchButton: {
            smooth: {
              alpha: 0
            }
          },
          Player: {
            smooth: {
              alpha: 1
            }
          }
        });
      }
    }, {
      key: "preparePlayer",
      value: function preparePlayer(item) {
        this.tag('Player').videoData = item;
        this.tag('Player').fetchVideoById(item.id);
        this.tag('Player').fetchRelatedList(item.id);
      }
    }, {
      key: "fetchMainData",
      value: function fetchMainData() {
        var _this23 = this;

        this._api.getChannels().then(function (data) {
          _this23.fire("mainReceived", {
            data: data
          });

          return _this23._api.getTrendingVideos();
        }).then(function (data) {
          _this23.fire("trendingReceived", {
            data: data
          });
        }).catch(function (e) {
          _this23.fire("mainError");
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this24 = this;

        this.muteMediaPlayer();
        this._api = new DailymotionApi();
        this.fetchMainData();
        this.fadeToContent = this.animation({
          delay: 1.5,
          duration: 1,
          actions: [{
            t: 'Splash',
            p: 'alpha',
            rv: 1,
            v: {
              0: 1,
              0.5: 0
            }
          }, {
            t: 'Splash.Logo',
            p: 'alpha',
            rv: 1,
            v: {
              0: 1,
              0.5: 0
            }
          }, {
            t: 'Splash.Logo',
            p: 'y',
            rv: 540,
            v: {
              0: 540,
              0.5: 500
            }
          }, {
            t: 'MainPage',
            p: 'alpha',
            rv: 0,
            v: {
              0.5: 0,
              1: 1
            }
          }, {
            t: 'SearchButton',
            p: 'alpha',
            rv: 0,
            v: {
              0.5: 0,
              1: 1
            }
          }, {
            t: 'MainPage.Logo',
            p: 'y',
            rv: 150,
            v: {
              0.5: 150,
              1: 120
            }
          }, {
            t: 'MainPage.Logo',
            p: 'alpha',
            rv: 0,
            v: {
              0.5: 0,
              1: 1
            }
          }, {
            t: 'MainPage.PlayerPreview',
            p: 'alpha',
            rv: 0,
            v: {
              0.5: 0,
              1: 1
            }
          }]
        });
        this.fadeToContent.on('finish', function () {
          _this24._setState('MainPage');
        });

        this._setState('Loading');
      }
    }, {
      key: "setPlaylist",
      value: function setPlaylist() {
        this.tag('MainPage').tag('PlayerPreview').playlist = this._channels[0].list;
      }
    }, {
      key: "playVideo",
      value: function playVideo(id) {
        this.tag('Player').fetchVideoById(id);
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        settings.mediaplayer.consumer = this.tag('MainPage').tag('PlayerPreview');
      }
    }, {
      key: "api",
      get: function get() {
        return this._api;
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'RobotoBold',
          url: AppDefinition.getPath('fonts/roboto-bold.ttf'),
          desccriptors: {}
        }, {
          family: 'RobotoMedium',
          url: AppDefinition.getPath('fonts/roboto-medium.ttf'),
          desccriptors: {}
        }, {
          family: 'RobotoRegular',
          url: AppDefinition.getPath('fonts/roboto-regular.ttf'),
          desccriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Player: {
            alpha: 0,
            type: Player,
            signals: {
              backButtonPressed: true
            }
          },
          MainPage: {
            type: MainPage
          },
          Search: {
            alpha: 0,
            type: Search,
            signals: {
              videoSelected: true
            }
          },
          SearchButton: {
            alpha: 0,
            x: 1737,
            y: 77,
            type: Button,
            action: 'play',
            image: AppDefinition.getPath('img/search.png')
          },
          Splash: {
            type: Splash
          },
          Error: {
            alpha: 0,
            type: Error,
            layout: {
              message: 'Could not load content',
              color: 0xFF202630,
              buttons: [{
                label: 'Retry',
                action: 'retry'
              }, {
                label: 'Close',
                action: 'exit'
              }]
            },
            signals: {
              retry: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this25) {
          _inherits(Loading, _this25);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "mainReceived",
            value: function mainReceived(_ref7) {
              var data = _ref7.data;
              this._channels = data;
            }
          }, {
            key: "trendingReceived",
            value: function trendingReceived(_ref8) {
              var data = _ref8.data;

              this._channels.unshift({
                item: {
                  name: 'Trending'
                },
                list: data
              });

              this.fire("ready");
            }
          }, {
            key: "mainError",
            value: function mainError() {
              if (!this._channels || !this._channels.length) {
                return this._setState('Error');
              }

              this.fire("ready");
            }
          }, {
            key: "ready",
            value: function ready() {
              this.fillSlider();
              this.fadeToContent.start();
              this.setPlaylist();
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this26) {
          _inherits(MainPage$$1, _this26);

          function MainPage$$1() {
            _classCallCheck(this, MainPage$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(MainPage$$1).apply(this, arguments));
          }

          _createClass(MainPage$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('MainPage');
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              var item = this.tag('MainPage').focusedItem;
              this.videoSelected(item);

              this._setState('Player');
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this.tag('MainPage').tag('Main').previousIndex === 1) {
                this.tag('SearchButton').patch({
                  smooth: {
                    alpha: 1,
                    y: 77
                  }
                });
                return;
              }

              this._setState('SearchButton');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this.tag('SearchButton').patch({
                smooth: {
                  alpha: 0,
                  y: -77
                }
              });
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this.tag('SearchButton').patch({
                smooth: {
                  alpha: 1,
                  y: 77
                }
              });
            }
          }]);

          return MainPage$$1;
        }(this),
        /*#__PURE__*/
        function (_this27) {
          _inherits(Player$$1, _this27);

          function Player$$1() {
            _classCallCheck(this, Player$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Player$$1).apply(this, arguments));
          }

          _createClass(Player$$1, [{
            key: "$enter",
            value: function $enter(args) {
              this._previousView = args.prevState;
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Player');
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this.patch({
                Player: {
                  smooth: {
                    alpha: 0
                  }
                }
              });

              if (this._previousView === 'Search') {
                this.patch({
                  Search: {
                    smooth: {
                      alpha: 1
                    }
                  }
                });

                this._setState('Search');

                return;
              }

              this.patch({
                MainPage: {
                  smooth: {
                    alpha: 1
                  }
                },
                SearchButton: {
                  smooth: {
                    alpha: 1
                  }
                }
              });

              this._setState('MainPage');

              this.playVideo(this.tag('MainPage').tag('PlayerPreview').playlistItem.id);
            }
          }, {
            key: "backButtonPressed",
            value: function backButtonPressed() {
              this._handleBack();
            }
          }]);

          return Player$$1;
        }(this),
        /*#__PURE__*/
        function (_this28) {
          _inherits(SearchButton, _this28);

          function SearchButton() {
            _classCallCheck(this, SearchButton);

            return _possibleConstructorReturn(this, _getPrototypeOf(SearchButton).apply(this, arguments));
          }

          _createClass(SearchButton, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('SearchButton');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('MainPage');
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.patch({
                MainPage: {
                  smooth: {
                    alpha: 0
                  }
                },
                SearchButton: {
                  smooth: {
                    alpha: 0
                  }
                }
              });

              this._setState('Search');
            }
          }]);

          return SearchButton;
        }(this),
        /*#__PURE__*/
        function (_this29) {
          _inherits(Search$$1, _this29);

          function Search$$1() {
            _classCallCheck(this, Search$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Search$$1).apply(this, arguments));
          }

          _createClass(Search$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Search');
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this.patch({
                MainPage: {
                  smooth: {
                    alpha: 1
                  }
                },
                SearchButton: {
                  smooth: {
                    alpha: 1
                  }
                }
              });

              this._setState('SearchButton');
            }
          }, {
            key: "videoSelected",
            value: function videoSelected(item) {
              this._setState('Player');

              return this.videoSelected(item);
            }
          }]);

          return Search$$1;
        }(this),
        /*#__PURE__*/
        function (_this30) {
          _inherits(Error$$1, _this30);

          function Error$$1() {
            _classCallCheck(this, Error$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Error$$1).apply(this, arguments));
          }

          _createClass(Error$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Error');
            }
          }, {
            key: "retry",
            value: function retry() {
              this.fadeToContent.reset();

              this._setState('Loading');

              this.fetchMainData();
            }
          }]);

          return Error$$1;
        }(this)];
      }
    }]);

    return DailymotionApp;
  }(ux.App);

  var AppDefinition =
  /*#__PURE__*/
  function (_ux$AppDefinition) {
    _inherits(AppDefinition, _ux$AppDefinition);

    function AppDefinition() {
      _classCallCheck(this, AppDefinition);

      return _possibleConstructorReturn(this, _getPrototypeOf(AppDefinition).apply(this, arguments));
    }

    _createClass(AppDefinition, [{
      key: "getAppViewType",
      value: function getAppViewType() {
        return DailymotionApp;
      }
    }], [{
      key: "identifier",
      get: function get() {
        return "com.metrological.app.Dailymotion";
      }
    }]);

    return AppDefinition;
  }(ux.AppDefinition);

  return AppDefinition;
}();