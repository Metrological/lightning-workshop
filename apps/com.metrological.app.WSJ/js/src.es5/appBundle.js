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

var appBundle = function () {
  'use strict';

  var SplashScreen =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(SplashScreen, _lng$Component);

    function SplashScreen() {
      _classCallCheck(this, SplashScreen);

      return _possibleConstructorReturn(this, _getPrototypeOf(SplashScreen).apply(this, arguments));
    }

    _createClass(SplashScreen, [{
      key: "_init",
      value: function _init() {
        this.patch({
          Splash: {
            Logo: {
              smooth: {
                alpha: 1,
                y: 10
              }
            },
            Caption: {
              smooth: {
                alpha: 1,
                y: 210
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Splash: {
            x: 590,
            y: 420,
            Logo: {
              alpha: 0,
              src: App.getPath('images/wsj_logo.png'),
              x: 10,
              y: 80,
              w: 800,
              h: 85,
              transitions: {
                alpha: {
                  duration: 1,
                  delay: 0.5
                },
                y: {
                  duration: 1,
                  delay: 1
                }
              }
            },
            Caption: {
              alpha: 0,
              y: 180,
              x: 420,
              mount: 0.5,
              text: {
                text: 'Loading video stream',
                fontFace: 'Roboto',
                fontSize: 28,
                wordWrapWidth: 400,
                maxLines: 1
              },
              transitions: {
                alpha: {
                  duration: 1,
                  delay: 0.5
                },
                y: {
                  duration: 1,
                  delay: 1
                }
              }
            }
          }
        };
      }
    }]);

    return SplashScreen;
  }(lng.Component);

  var GridItem =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(GridItem, _lng$Component2);

    function GridItem() {
      _classCallCheck(this, GridItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridItem).apply(this, arguments));
    }

    _createClass(GridItem, [{
      key: "setPlayStatus",
      value: function setPlayStatus(status) {
        var playingStatusY = this.tag('PlayingStatus').finalY;
        this.patch({
          Image: {
            PlayingStatus: {
              y: playingStatusY + 20,
              alpha: 0
            }
          }
        });
        this.patch({
          Image: {
            PlayingStatus: {
              Text: {
                text: 'NOW PLAYING',
                x: 35
              },
              Icon: {
                alpha: 1
              },
              smooth: {
                alpha: status ? [0.8, {
                  duration: 0.5,
                  delay: 0.7
                }] : 0,
                y: [playingStatusY, {
                  duration: 0.5,
                  delay: 0.8
                }]
              }
            }
          }
        });
      }
    }, {
      key: "setUpNext",
      value: function setUpNext() {
        var playingStatusY = this.tag('PlayingStatus').finalY;
        this.patch({
          Image: {
            PlayingStatus: {
              y: playingStatusY + 20,
              alpha: 0
            }
          }
        });
        this.patch({
          Image: {
            PlayingStatus: {
              Text: {
                text: 'UP NEXT',
                x: 15
              },
              Icon: {
                alpha: 0
              },
              smooth: {
                alpha: [0.8, {
                  duration: 0.5,
                  delay: 0.6
                }],
                y: [playingStatusY, {
                  duration: 0.5,
                  delay: 0.6
                }]
              }
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.05
          },
          Rect: {
            color: 0xffF0F0F0
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
          Rect: {
            color: 0xff7D7B75
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Image: {
            src: App.cropImage({
              url: v.getPicture({
                w: 640
              }).url,
              w: 320,
              h: 178
            })
          },
          Title: {
            text: {
              text: v.title
            }
          },
          CreationDate: {
            text: {
              text: v.date
            }
          }
        });
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 350,
          h: 370,
          Rect: {
            w: 350,
            h: 370,
            rect: true,
            colorTop: 0xff7D7B75,
            colorBottom: 0xff676156
          },
          Image: {
            x: 15,
            y: 15,
            PlayingStatus: {
              y: 138,
              w: 320,
              h: 40,
              rect: true,
              color: 0xff000000,
              alpha: 0,
              Icon: {
                src: App.getPath('images/play.png'),
                x: 15,
                y: 11
              },
              Text: {
                x: 40,
                y: 8,
                alpha: 1,
                color: 0xffF1F1F1,
                text: {
                  fontSize: 20,
                  fontFace: 'Roboto',
                  fontStyle: 'bold'
                }
              }
            }
          },
          Title: {
            x: 15,
            y: 210,
            color: 0xff101010,
            text: {
              text: '',
              fontSize: 27,
              fontFace: 'PlayfairDisplay',
              fontStyle: 'bold',
              lineHeight: 35,
              wordWrapWidth: 320,
              maxLines: 3
            }
          },
          CreationDate: {
            x: 20,
            y: 330,
            color: 0xff101010,
            alpha: 0.4,
            text: {
              text: '',
              fontSize: 20,
              fontFace: 'Roboto'
            }
          },
          transitions: {
            x: {
              duration: 0.7,
              delay: 0.1
            }
          }
        };
      }
    }]);

    return GridItem;
  }(lng.Component);

  var Grid =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(Grid, _lng$Component3);

    function Grid() {
      _classCallCheck(this, Grid);

      return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
      key: "hasResults",
      value: function hasResults() {
        return this.tag('List').items.length;
      }
    }, {
      key: "setPlayStatus",

      /**
       * Showing the playing status on the selected item position in the collapsed state
       * @param index
       */
      value: function setPlayStatus(index) {
        var _this = this;

        this.setItemIndex(index);

        this._items.forEach(function (item, k) {
          _this.tag("List").getElement(k).setPlayStatus(_this.index === k);
        });
      }
      /**
       * Always shows the Up next status in the first item of the right List
       */

    }, {
      key: "setUpNext",
      value: function setUpNext() {
        if (this.hasResults()) {
          this.tag("List").getElement(this.index).setUpNext();
        }
      }
    }, {
      key: "setItemIndex",
      value: function setItemIndex(index) {
        this.tag('List').setIndex(index);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.index === 0) {
          this.fireAncestors('$handleItemViewFocus');
          return false;
        }

        this.tag('List').setPrevious();
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.tag('List').setNext();
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors('$play', {
          items: this.tag('List').items.map(function (item) {
            return item.item;
          }),
          item: this.active.item
        }, true);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "items",
      get: function get() {
        return this._items;
      },
      set: function set(v) {
        this._items = v.map(function (el) {
          return {
            type: GridItem,
            item: el
          };
        });
        this.tag('List').items = this._items;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag('List').getElement(this.index);
      }
    }, {
      key: "index",
      get: function get() {
        return this.tag('List').realIndex;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          List: {
            type: lng.components.ListComponent,
            w: 1920,
            h: 390,
            x: -65,
            itemSize: 370,
            scrollTransition: {
              duration: 0.2
            },
            invertDirection: false,
            roll: true,
            viewportScrollOffset: 0.5,
            itemScrollOffset: 0.5,
            rollMin: 90,
            rollMax: 185
          }
        };
      }
    }]);

    return Grid;
  }(lng.Component);

  var Progress =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(Progress, _lng$Component4);

    function Progress() {
      _classCallCheck(this, Progress);

      return _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
    }

    _createClass(Progress, [{
      key: "setWidth",
      value: function setWidth(v) {
        Progress.width = v;
      }
    }, {
      key: "setProgress",
      value: function setProgress(currentTime, duration) {
        this._progress = currentTime / Math.max(duration, 1);
        this.tag("CurrentDuration").text = "".concat(this.formatTime(currentTime));
        this.tag("EndDuration").text = "".concat(this.formatTime(duration));
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
        var x = v * Progress.width;
        estimation *= 0.001;
        this.tag("Active").setSmooth('w', Math.max(x, 0.0001), {
          timingFunction: 'linear',
          duration: estimation
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          CurrentDuration: {
            y: 3,
            alpha: 0.7,
            text: {
              text: '00:00',
              fontSize: 24,
              fontFace: 'Roboto'
            }
          },
          ProgressBar: {
            x: 80,
            y: 15,
            Scrub: {
              w: 400,
              rect: true,
              h: 6,
              color: 0xFFF1F1F1,
              alpha: 0.2
            },
            Bar: {
              Active: {
                color: 0xFFCCC0AA,
                h: 6,
                rect: true
              }
            }
          },
          EndDuration: {
            y: 3,
            x: 500,
            alpha: 0.7,
            text: {
              text: '00:00',
              fontSize: 24,
              fontFace: 'Roboto'
            }
          }
        };
      }
    }]);

    return Progress;
  }(lng.Component);

  Progress.width = 0;

  var Button =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(Button, _lng$Component5);

    function Button() {
      _classCallCheck(this, Button);

      return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
    }

    _createClass(Button, [{
      key: "_focus",
      value: function _focus() {
        this._focused = true;

        this._setState("Selected");
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._focused = false;

        this._setState("UnSelected");
      }
    }, {
      key: "icon",
      set: function set(icon) {
        this._icon = icon;
        var color = this._focused ? this.colors.focused : this._isActive ? this.colors.enabled : this.colors.disabled;
        this.tag("ButtonIcon").patch({
          alpha: "".concat(this._isActive ? 1 : 0.3),
          Icon: {
            smooth: {
              src: icon,
              color: color
            }
          }
        });
      }
    }, {
      key: "width",
      set: function set(w) {
        this.tag("ButtonIcon").patch({
          Icon: {
            w: w
          }
        });
      }
    }, {
      key: "height",
      set: function set(h) {
        this.tag("ButtonIcon").patch({
          Icon: {
            h: h
          }
        });
      }
    }, {
      key: "active",
      set: function set(v) {
        this._isActive = v;
      },
      get: function get() {
        return this._isActive;
      }
    }, {
      key: "colors",
      get: function get() {
        return {
          disabled: 0xff101010,
          enabled: 0xff101010,
          focused: 0xff101010
        };
      }
    }, {
      key: "buttonBG",
      get: function get() {
        return {
          enabled: {
            colorTop: 0xFFF0F0F0,
            colorBottom: 0xFFCFC3AE
          },
          main: {
            colorTop: 0xFF7C7A74,
            colorBottom: 0xFF676156
          }
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 70,
          h: 50,
          ButtonIcon: {
            w: 70,
            h: 50,
            rect: true,
            colorTop: 0xFF7C7A74,
            colorBottom: 0xFF676156,
            Icon: {
              x: 35,
              y: 25,
              mount: 0.5,
              w: 30,
              h: 18
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this2) {
          _inherits(Selected, _this2);

          function Selected() {
            _classCallCheck(this, Selected);

            return _possibleConstructorReturn(this, _getPrototypeOf(Selected).apply(this, arguments));
          }

          _createClass(Selected, [{
            key: "$enter",
            value: function $enter() {
              this.tag("ButtonIcon").patch({
                smooth: {
                  colorTop: this.buttonBG.enabled.colorTop,
                  colorBottom: this.buttonBG.enabled.colorBottom
                },
                Icon: {
                  smooth: {
                    color: this.colors.focused
                  }
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              var color = this._isActive ? this.colors.enabled : this.colors.disabled;
              this.tag("ButtonIcon").patch({
                smooth: {
                  colorTop: this.buttonBG.main.colorTop,
                  colorBottom: this.buttonBG.main.colorTop
                },
                Icon: {
                  smooth: {
                    color: color
                  }
                }
              });
            }
          }]);

          return Selected;
        }(this),
        /*#__PURE__*/
        function (_this3) {
          _inherits(UnSelected, _this3);

          function UnSelected() {
            _classCallCheck(this, UnSelected);

            return _possibleConstructorReturn(this, _getPrototypeOf(UnSelected).apply(this, arguments));
          }

          _createClass(UnSelected, [{
            key: "$enter",
            value: function $enter() {
              this.tag("ButtonIcon").patch({
                colorTop: this.buttonBG.main.colorTop,
                colorBottom: this.buttonBG.main.colorBottom
              });
            }
          }]);

          return UnSelected;
        }(this)];
      }
    }]);

    return Button;
  }(lng.Component);

  var Controls =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Controls, _lng$Component6);

    function Controls() {
      _classCallCheck(this, Controls);

      return _possibleConstructorReturn(this, _getPrototypeOf(Controls).apply(this, arguments));
    }

    _createClass(Controls, [{
      key: "_setup",
      value: function _setup() {
        this.setPlayState();
      }
    }, {
      key: "_init",
      value: function _init() {
        this.showButtons(false, true);
        this.setPlayState();
      }
    }, {
      key: "setPlayState",
      value: function setPlayState() {
        this._setState("Play");
      }
    }, {
      key: "showButtons",
      value: function showButtons(previous, next) {
        var buttons = [];

        if (previous) {
          buttons.push("Previous");
          this.patch({
            Buttons: {
              Previous: {
                alpha: 1
              }
            }
          });
        } else {
          this.patch({
            Buttons: {
              Previous: {
                alpha: 0.4
              }
            }
          });
        }

        buttons.push("Rewind");
        buttons.push("Play");
        buttons.push("Forward");

        if (next) {
          buttons.push("Next");
          this.patch({
            Buttons: {
              Next: {
                alpha: 1
              }
            }
          });
        } else {
          this.patch({
            Buttons: {
              Next: {
                alpha: 0.4
              }
            }
          });
        }

        this._setActiveButtons(buttons);
      }
    }, {
      key: "_setActiveButtons",
      value: function _setActiveButtons(buttons) {
        var _this4 = this;

        this._activeButtons = [];
        this.tag("Buttons").children.map(function (button) {
          button.active = buttons.indexOf(button.ref) !== -1;

          if (button.active) {
            _this4._activeButtons.push(button);
          }
        });

        this._checkActiveButton();
      }
    }, {
      key: "_checkActiveButton",
      value: function _checkActiveButton() {
        var index = this._activeButtonIndex;

        if (index === -1) {
          if (this._index >= this._activeButtons.length) {
            this._index = this._activeButtons.length - 1;
          }
        }

        this._setState(this._activeButtons[index].ref);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        var index = this._activeButtonIndex;

        if (index > 0) {
          index--;
        } else {
          this.fireAncestors('$handleLeftItemViewFocus');
          return false;
        }

        this._setState(this._activeButtons[index].ref);
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        var index = this._activeButtonIndex;

        if (index < this._activeButtons.length - 1) {
          index++;
        } else {
          this.fireAncestors('$handleListViewFocus');
          return false;
        }

        this._setState(this._activeButtons[index].ref);
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal('press' + this._activeButton.ref);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this._getState());
      }
    }, {
      key: "_activeButtonIndex",
      get: function get() {
        var button = this.tag("Buttons").getByRef(this._getState());

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
      set: function set(v) {
        this.tag("Play").icon = v ? App.getPath('images/play.png') : App.getPath('images/pause.png');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Buttons: {
            width: 300,
            h: 50,
            flex: {
              direction: "row",
              justifyItems: "flex-start"
            },
            Previous: {
              alpha: 0.4,
              flexItem: {
                marginRight: 10
              },
              type: Button,
              icon: App.getPath('images/prev.png')
            },
            Rewind: {
              flexItem: {
                marginRight: 10
              },
              type: Button,
              icon: App.getPath('images/rwd.png')
            },
            Play: {
              flexItem: {
                marginRight: 10
              },
              type: Button,
              icon: App.getPath('images/play.png'),
              width: 16,
              height: 18
            },
            Forward: {
              flexItem: {
                marginRight: 10
              },
              type: Button,
              icon: App.getPath('images/fwd.png')
            },
            Next: {
              flexItem: {},
              type: Button,
              icon: App.getPath('images/next.png')
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this5) {
          _inherits(Previous, _this5);

          function Previous() {
            _classCallCheck(this, Previous);

            return _possibleConstructorReturn(this, _getPrototypeOf(Previous).apply(this, arguments));
          }

          return Previous;
        }(this),
        /*#__PURE__*/
        function (_this6) {
          _inherits(Rewind, _this6);

          function Rewind() {
            _classCallCheck(this, Rewind);

            return _possibleConstructorReturn(this, _getPrototypeOf(Rewind).apply(this, arguments));
          }

          return Rewind;
        }(this),
        /*#__PURE__*/
        function (_this7) {
          _inherits(Play, _this7);

          function Play() {
            _classCallCheck(this, Play);

            return _possibleConstructorReturn(this, _getPrototypeOf(Play).apply(this, arguments));
          }

          return Play;
        }(this),
        /*#__PURE__*/
        function (_this8) {
          _inherits(Forward, _this8);

          function Forward() {
            _classCallCheck(this, Forward);

            return _possibleConstructorReturn(this, _getPrototypeOf(Forward).apply(this, arguments));
          }

          return Forward;
        }(this),
        /*#__PURE__*/
        function (_this9) {
          _inherits(Next, _this9);

          function Next() {
            _classCallCheck(this, Next);

            return _possibleConstructorReturn(this, _getPrototypeOf(Next).apply(this, arguments));
          }

          return Next;
        }(this)];
      }
    }]);

    return Controls;
  }(lng.Component);

  var CurrentItem =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(CurrentItem, _lng$Component7);

    function CurrentItem() {
      _classCallCheck(this, CurrentItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(CurrentItem).apply(this, arguments));
    }

    _createClass(CurrentItem, [{
      key: "setProgress",
      value: function setProgress(duration, currentTime) {
        this.tag("Progress").setWidth(400);
        this.tag("Progress").setProgress(duration, currentTime);
      }
    }, {
      key: "setItem",
      value: function setItem(item) {
        this.title = item.title;
        this.description = item.description;
        this.creationDate = item.date;
      }
    }, {
      key: "showButtons",
      value: function showButtons(previous, next) {
        this.tag("Controls").showButtons(previous, next);
      }
    }, {
      key: "playPause",
      value: function playPause(status) {
        this.tag("Controls").paused = status;
      }
    }, {
      key: "pressPrevious",
      value: function pressPrevious() {
        this.fireAncestors('$pressPrevious');
      }
    }, {
      key: "_pressRewind",
      value: function _pressRewind() {
        this.fireAncestors('$pressRewind');
      }
    }, {
      key: "pressPlay",
      value: function pressPlay() {
        this.application.mediaplayer.playPause();
      }
    }, {
      key: "_pressForward",
      value: function _pressForward() {
        this.fireAncestors('$pressForward');
      }
    }, {
      key: "_pressNext",
      value: function _pressNext() {
        this.fireAncestors('$pressNext');
      }
    }, {
      key: "setPlayState",
      value: function setPlayState() {
        this.tag("Controls").setPlayState();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("Controls");
      }
    }, {
      key: "title",
      set: function set(title) {
        this.tag("Title").text = title || "";
      }
    }, {
      key: "description",
      set: function set(description) {
        this.tag("Description").text = description || "";
      }
    }, {
      key: "creationDate",
      set: function set(creationDate) {
        this.tag("CreationDate").text = creationDate || "";
      }
    }, {
      key: "status",
      get: function get() {
        return this._status;
      },
      set: function set(status) {
        this._status = status;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Title: {
            x: 20,
            color: 0xffF1F1F1,
            text: {
              text: '',
              fontSize: 42,
              fontFace: 'PlayfairDisplay',
              fontStyle: 'bold',
              lineHeight: 45,
              wordWrapWidth: 1000,
              maxLines: 2
            }
          },
          CreationDate: {
            x: 20,
            y: 120,
            alpha: 0.7,
            color: 0xffF1F1F1,
            text: {
              text: '',
              fontSize: 20,
              fontFace: 'Roboto'
            }
          },
          PlayerControls: {
            x: 20,
            y: 170,
            h: 60,
            Controls: {
              type: Controls,
              signals: {
                pressPrevious: true,
                pressRewind: '_pressRewind',
                pressPlay: true,
                pressForward: '_pressForward',
                pressNext: "_pressNext"
              }
            },
            Progress: {
              x: 420,
              y: 10,
              type: Progress
            }
          },
          Description: {
            x: 20,
            y: 240,
            color: 0xffF1F1F1,
            alpha: 0.7,
            text: {
              text: '',
              fontSize: 24,
              fontFace: 'Roboto',
              lineHeight: 35,
              wordWrapWidth: 1000,
              maxLines: 4
            }
          }
        };
      }
    }]);

    return CurrentItem;
  }(lng.Component);

  var MostViewed =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(MostViewed, _lng$Component8);

    function MostViewed() {
      _classCallCheck(this, MostViewed);

      return _possibleConstructorReturn(this, _getPrototypeOf(MostViewed).apply(this, arguments));
    }

    _createClass(MostViewed, [{
      key: "_init",
      value: function _init() {
        this._setState('Loading');
      }
      /**
       * set the selected item to current view
       * @param index
       * @param item
       */

    }, {
      key: "setData",
      value: function setData(index, item) {
        this._index = index;

        if (this._isItemShow()) {
          this.tag("CurrentItem").setItem(item);
          this.tag("CurrentItem").showButtons(this._index > 0, this._index < this._items.length - 1);
          this.showLists();
          this._leftItems = this._items.slice(index - 1, index);
          this._rightItems = this._items.slice(index + 1, this._items.length);
        }

        if (this._index == 0) {
          this.tag('List').items = this._items;
        }
      }
      /**
       * Based on the direction (Previous and Next), the transition item will be set.
       * @param direction
       */

    }, {
      key: "setNavigationItems",
      value: function setNavigationItems(direction) {
        if (this._index > 0) {
          this.tag('LeftItem').item = this._items[direction === -1 ? this._index : this._index - 1];
        }

        if (this._index < this._items.length - 1) {
          this.tag('RightItem').item = this._items[direction === -1 ? this._index + 1 : this._index];
        }
      }
    }, {
      key: "setListItems",
      value: function setListItems() {
        this.tag('List').items = this._rightItems;
        this.tag('LeftList').items = this._leftItems;
      }
    }, {
      key: "showLists",
      value: function showLists() {
        if (this._index == this._items.length - 1) {
          this.patch({
            BottomGrid: {
              ClipperRight: {
                smooth: {
                  alpha: 0
                }
              }
            }
          });
        }
      }
      /**
       * Reset the position of Lists, transition items based on direction
       * @param direction
       */

    }, {
      key: "resetItems",
      value: function resetItems(direction) {
        var clipperRightX = this.tag('ClipperRight').finalX;
        var currentItemX = this.tag('CurrentItem').finalX;
        var isRightDir = direction === -1; //-1 is Previous, so that the item will move from left to right

        this.patch({
          BottomGrid: {
            LeftItem: {
              x: isRightDir ? -100 : currentItemX,
              alpha: 0.5
            },
            RightItem: {
              x: isRightDir ? clipperRightX - 420 : clipperRightX + 25,
              alpha: 0.5
            },
            ClipperRight: {
              alpha: 0.3,
              List: {
                x: isRightDir ? -390 : 425
              }
            },
            LeftList: {
              alpha: 0.2
            },
            Logo: {
              x: -200,
              alpha: 0
            },
            CurrentItem: {
              alpha: 0.2
            }
          }
        }); //when the first item is selected, the logo should be appear

        if (this._index == 0) {
          this.patch({
            BottomGrid: {
              Logo: {
                smooth: {
                  x: [0, {
                    duration: 0.7,
                    delay: 0.4
                  }],
                  alpha: 1
                }
              }
            }
          });
        }
      }
      /**
       * The items will be set to left and right Lists. Based on the directions,
       * the item positions will be set
       * @param direction
       */

    }, {
      key: "setItemDirection",
      value: function setItemDirection(direction) {
        if (this._isItemShow()) {
          this.resetItems(direction);
          this.setNavigationItems(direction);
          this.setListItems();
          this.tag('List').setUpNext();
          var leftItemX = this.tag('LeftItem').finalX;
          var rightItemX = this.tag('RightItem').finalX;
          var clipperRightX = this.tag('ClipperRight').finalX;
          var isRightDir = direction === -1;
          this.patch({
            BottomGrid: {
              LeftItem: {
                smooth: {
                  x: isRightDir ? leftItemX + 370 : leftItemX - 370,
                  alpha: 0
                }
              },
              RightItem: {
                smooth: {
                  x: isRightDir ? rightItemX + 350 : clipperRightX - 350,
                  alpha: 0
                }
              },
              ClipperRight: {
                smooth: {
                  alpha: [1, {
                    duration: 0.7,
                    delay: 0.2
                  }]
                },
                List: {
                  smooth: {
                    x: [0, {
                      duration: 0.7,
                      delay: 0.2
                    }]
                  }
                }
              },
              CurrentItem: {
                smooth: {
                  alpha: [1, {
                    duration: 0.6,
                    delay: 0.2
                  }]
                }
              },
              LeftList: {
                smooth: {
                  alpha: [1, {
                    delay: 0.5
                  }]
                }
              }
            }
          });
        } else {
          this.tag('List').setPlayStatus(this._index);
        }
      }
    }, {
      key: "setProgress",
      value: function setProgress(duration, currentTime) {
        this.tag("CurrentItem").setProgress(duration, currentTime);
      }
    }, {
      key: "playPause",
      value: function playPause(status) {
        this.tag("CurrentItem").playPause(status);
      }
    }, {
      key: "_isItemShow",
      value: function _isItemShow() {
        return this.tag("CurrentItem").status;
      }
    }, {
      key: "_setItemStatus",
      value: function _setItemStatus(status) {
        this.tag("CurrentItem").status = status;
      }
    }, {
      key: "collapse",
      value: function collapse() {
        var leftListX = this.tag('LeftList').finalX; //set the direction from left to right when there are not items in the right side

        if (this._rightItems.length == 0) {
          this.patch({
            BottomGrid: {
              ClipperRight: {
                x: 0,
                alpha: 0.5
              }
            }
          });
        }

        this.patch({
          BottomGrid: {
            CurrentItem: {
              smooth: {
                alpha: [0, {
                  duration: 0.5,
                  delay: 0.1
                }]
              }
            },
            ClipperRight: {
              w: 1700,
              smooth: {
                x: [250, {
                  duration: 1,
                  delay: 0.1
                }],
                alpha: 1
              }
            },
            LeftList: {
              smooth: {
                x: [leftListX + 450, {
                  duration: 1,
                  delay: 0.1
                }],
                alpha: [0, {
                  duration: 0.5,
                  delay: 0.3
                }]
              }
            },
            Logo: {
              smooth: {
                x: [0, {
                  delay: 0.2
                }],
                alpha: 1
              }
            },
            LeftItem: {
              alpha: 0
            },
            RightItem: {
              alpha: 0
            }
          }
        });
        this.tag('List').items = this._items;

        this._setItemStatus(false);

        this.tag('List').setPlayStatus(this._index);

        this._setState('Collapse');
      }
    }, {
      key: "expand",
      value: function expand() {
        var isFirstItem = this._index == 0;
        this.patch({
          BottomGrid: {
            ClipperRight: {
              x: 1050,
              alpha: 0.4
            },
            LeftList: {
              x: 155,
              alpha: 0.4
            },
            CurrentItem: {
              alpha: 0.2
            }
          }
        });
        this.patch({
          BottomGrid: {
            CurrentItem: {
              smooth: {
                alpha: [1, {
                  duration: 0.6,
                  delay: 0.3
                }]
              }
            },
            LeftList: {
              smooth: {
                alpha: isFirstItem ? 0 : 1,
                x: [-145, {
                  duration: 0.8,
                  delay: 0.1
                }]
              }
            },
            ClipperRight: {
              smooth: {
                x: [1300, {
                  duration: 0.8,
                  delay: 0.1
                }],
                alpha: 1
              }
            },
            LeftItem: {
              alpha: 0
            },
            RightItem: {
              alpha: 0
            },
            Logo: {
              smooth: {
                x: [isFirstItem ? 0 : -200, {
                  delay: 0.2
                }],
                alpha: isFirstItem ? 1 : 0
              }
            }
          }
        });
        this.setListItems();
        this.tag('List').setItemIndex(0);
        this.tag('List').setUpNext();

        this._setState('Expand');
      }
    }, {
      key: "items",
      get: function get() {
        return this._items;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          y: 540,
          Gradient: {
            w: 1920,
            h: 542,
            rect: true,
            src: App.getPath('images/gradient.png')
          },
          BottomGrid: {
            y: 150,
            Logo: {
              w: 240,
              h: 370,
              rect: true,
              color: 0xff101010,
              Image: {
                src: App.getPath('images/wsj.png'),
                w: 100,
                h: 53,
                x: 110,
                y: 280
              },
              transitions: {
                alpha: {
                  duration: 0.2,
                  delay: 0.3
                },
                x: {
                  duration: 0.5,
                  delay: 0.1
                }
              }
            },
            LeftList: {
              type: Grid,
              x: -190,
              alpha: 0,
              transitions: {
                alpha: {
                  duration: 0.3,
                  delay: 0.1
                }
              }
            },
            LeftItem: {
              type: GridItem,
              alpha: 0,
              transitions: {
                alpha: {
                  duration: 0.5,
                  delay: 0.2
                },
                x: {
                  duration: 1,
                  delay: 0.1
                }
              }
            },
            CurrentItem: {
              zIndex: 99,
              type: CurrentItem,
              x: 255,
              transitions: {
                alpha: {
                  duration: 0.2,
                  delay: 0.1
                }
              }
            },
            ClipperRight: {
              clipping: true,
              color: 0xff101010,
              w: 650,
              h: 410,
              x: 1300,
              y: -20,
              List: {
                type: Grid,
                y: 20,
                transitions: {
                  x: {
                    duration: 0.2,
                    delay: 0.1
                  }
                }
              },
              transitions: {
                x: {
                  duration: 0.3,
                  delay: 0.1
                }
              }
            },
            RightItem: {
              type: GridItem,
              alpha: 0,
              zIndex: 10,
              transitions: {
                alpha: {
                  duration: 0.3,
                  delay: 0.3
                },
                x: {
                  duration: 0.6,
                  delay: 0.1
                }
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this10) {
          _inherits(Loading, _this10);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this._load();
            }
          }, {
            key: "_load",
            value: function _load() {
              var _this11 = this;

              var api = this.fireAncestors('$getApi');
              api.getMostViewed().then(function (data) {
                _this11._loaded(data);
              }).catch(function (err) {
                _this11.fireAncestors('$error', {
                  message: err
                });
              });
            }
          }, {
            key: "_loaded",
            value: function _loaded(data) {
              this._items = data;
              this.fireAncestors('$hideInitialSplash');

              this._setState("Expand");

              this.fireAncestors("$play", {
                item: data[0],
                items: data
              });
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this12) {
          _inherits(Collapse, _this12);

          function Collapse() {
            _classCallCheck(this, Collapse);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapse).apply(this, arguments));
          }

          _createClass(Collapse, [{
            key: "$enter",
            value: function $enter() {
              this.tag("CurrentItem").setSmooth('alpha', 0);
              this.tag("BottomGrid").setSmooth('alpha', 1);
            }
          }, {
            key: "$handleItemViewFocus",
            value: function $handleItemViewFocus() {
              if (this._isItemShow()) {
                this._setState('Expand');
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('List');
            }
          }]);

          return Collapse;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(LeftListView, _this13);

          function LeftListView() {
            _classCallCheck(this, LeftListView);

            return _possibleConstructorReturn(this, _getPrototypeOf(LeftListView).apply(this, arguments));
          }

          _createClass(LeftListView, [{
            key: "$enter",
            value: function $enter() {
              this.tag("BottomGrid").setSmooth('alpha', 1);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('LeftList');
            }
          }]);

          return LeftListView;
        }(this),
        /*#__PURE__*/
        function (_this14) {
          _inherits(Expand, _this14);

          function Expand() {
            _classCallCheck(this, Expand);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expand).apply(this, arguments));
          }

          _createClass(Expand, [{
            key: "$enter",
            value: function $enter() {
              if (this._isItemShow()) {
                this.tag("CurrentItem").setPlayState();
                this.tag("CurrentItem").setSmooth('alpha', 1);
              }
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("CurrentItem").setSmooth('alpha', 0);
            }
          }, {
            key: "$handleListViewFocus",
            value: function $handleListViewFocus() {
              if (this._items.length - 1 > this._index) {
                this.collapse();

                this._setState('Collapse');
              }
            }
          }, {
            key: "$handleLeftItemViewFocus",
            value: function $handleLeftItemViewFocus() {
              if (this._index > 0) {
                this.collapse();

                this._setState('Collapse');
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('CurrentItem');
            }
          }]);

          return Expand;
        }(this)];
      }
    }]);

    return MostViewed;
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
        this._setState('Show');
      }
    }, {
      key: "play",
      value: function play(_ref) {
        var item = _ref.item,
            items = _ref.items;
        this._items = items;

        this.tag("MostViewed")._setItemStatus(true);

        this._setItem(item);

        this.tag("MostViewed").expand();
      }
    }, {
      key: "_setItem",
      value: function _setItem(item) {
        this._item = item;
        this._index = this._items.indexOf(item);
        this.tag("MostViewed").setData(this._index, item);
        this._stream = item.stream.link;
        this.application.updateFocusSettings();
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._setInterfaceTimeout();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        clearTimeout(this._timeout);
      }
    }, {
      key: "_captureKey",
      value: function _captureKey() {
        this._setInterfaceTimeout();

        return false;
      }
    }, {
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this.$pressNext();
      }
    }, {
      key: "$mediaplayerProgress",
      value: function $mediaplayerProgress(_ref2) {
        var currentTime = _ref2.currentTime,
            duration = _ref2.duration;
        this.tag("MostViewed").setProgress(currentTime, duration);
      }
    }, {
      key: "$mediaplayerPause",
      value: function $mediaplayerPause() {
        this.tag("MostViewed").playPause(true);
      }
    }, {
      key: "$mediaplayerPlay",
      value: function $mediaplayerPlay() {
        this.tag("MostViewed").playPause(false);
      }
    }, {
      key: "$pressNext",
      value: function $pressNext() {
        var index = (this._index + 1) % this._items.length;

        this._setItem(this._items[index]);

        this.tag("MostViewed").setItemDirection(1);
      }
    }, {
      key: "$pressRewind",
      value: function $pressRewind() {
        this.application.mediaplayer.seek(-15);
      }
    }, {
      key: "$pressForward",
      value: function $pressForward() {
        this.application.mediaplayer.seek(15);
      }
    }, {
      key: "$pressPrevious",
      value: function $pressPrevious() {
        var index = this._index - 1;

        if (index < 0) {
          this._index = this._items.length - 1;
        }

        this._setItem(this._items[index]);

        this.tag("MostViewed").setItemDirection(-1);
      }
    }, {
      key: "_setInterfaceTimeout",
      value: function _setInterfaceTimeout() {
        var _this15 = this;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this15._hide();
        }, 8000);
      }
    }, {
      key: "_hide",
      value: function _hide() {
        this._setState("Idle");
      }
    }, {
      key: "getMediaplayerSettings",
      value: function getMediaplayerSettings() {
        return {
          stream: {
            src: this._stream
          }
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          MostViewed: {
            type: MostViewed
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this16) {
          _inherits(Show, _this16);

          function Show() {
            _classCallCheck(this, Show);

            return _possibleConstructorReturn(this, _getPrototypeOf(Show).apply(this, arguments));
          }

          _createClass(Show, [{
            key: "$enter",
            value: function $enter() {
              this.tag("MostViewed").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("MostViewed").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('MostViewed');
            }
          }]);

          return Show;
        }(this),
        /*#__PURE__*/
        function (_this17) {
          _inherits(Idle, _this17);

          function Idle() {
            _classCallCheck(this, Idle);

            return _possibleConstructorReturn(this, _getPrototypeOf(Idle).apply(this, arguments));
          }

          _createClass(Idle, [{
            key: "$enter",
            value: function $enter() {
              this.tag("MostViewed").setSmooth('alpha', 0);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this._setInterfaceTimeout();

              this.tag("MostViewed").setSmooth('alpha', 1);
            }
          }, {
            key: "_captureKey",
            value: function _captureKey() {
              this._setState('Show');
            }
          }]);

          return Idle;
        }(this)];
      }
    }]);

    return Player;
  }(lng.Component);

  var Error$1 =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(Error$1, _lng$Component10);

    function Error$1() {
      _classCallCheck(this, Error$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Error$1).apply(this, arguments));
    }

    _createClass(Error$1, [{
      key: "handleError",
      value: function handleError(_ref3) {
        var message = _ref3.message,
            timeout = _ref3.timeout;
        this.tag("Error").text.text = "".concat(message);
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve();
          }, timeout);
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            y: 0
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            y: -100
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          color: 0xaa000000,
          rect: true,
          w: 1920,
          h: 1080,
          y: -100,
          Wrapper: {
            flex: {},
            rect: true,
            Wrapper: {
              flex: {
                direction: "row"
              },
              w: 1920,
              Icon: {
                flexItem: {
                  marginLeft: 20,
                  marginTop: 20,
                  marginRight: 20,
                  marginBottom: 15
                },
                src: App.getPath('images/error.png')
              },
              Error: {
                flexItem: {
                  marginTop: 15
                },
                color: 0xff353535,
                text: {
                  text: "",
                  fontFace: "Roboto",
                  fontSize: 26,
                  lineHeight: 40,
                  wordWrapWidth: 1720
                }
              }
            }
          }
        };
      }
    }]);

    return Error$1;
  }(lng.Component);

  var MediaItem =
  /*#__PURE__*/
  function () {
    function MediaItem(obj) {
      _classCallCheck(this, MediaItem);

      this.$ = obj;
    }

    _createClass(MediaItem, [{
      key: "getMediaplayerItem",
      value: function getMediaplayerItem() {
        return this._mediaplayerItem ? this._mediaplayerItem : this._mediaplayerItem = {
          title: this.title,
          description: this.description,
          date: this.date,
          stream: {
            link: this.getHighQuality().url
          }
        };
      }
      /**
       * Get a picture that matches a certain width or height
       * @param w
       * @param h
       * @returns {*}
       */

    }, {
      key: "getPicture",
      value: function getPicture(_ref4) {
        var _ref4$w = _ref4.w,
            w = _ref4$w === void 0 ? null : _ref4$w,
            _ref4$h = _ref4.h,
            h = _ref4$h === void 0 ? null : _ref4$h;
        var pictures = this.pictures;

        if (!pictures.length) {
          return false;
        }

        if (!w && !h) {
          return pictures[0];
        } else {
          var val = w ? w : h;
          var match = pictures.filter(function (p) {
            return p[w ? 'width' : 'height'] === val;
          });

          if (match.length) {
            return match[0];
          } else {
            return pictures[0];
          }
        }
      }
    }, {
      key: "getVideo",

      /**
       * Get a video that matches a certain width or height
       * @param w
       * @param h
       * @returns {*}
       */
      value: function getVideo(_ref5) {
        var _ref5$w = _ref5.w,
            w = _ref5$w === void 0 ? null : _ref5$w,
            _ref5$h = _ref5.h,
            h = _ref5$h === void 0 ? null : _ref5$h;
        var videos = this.videos;

        if (!videos.length) {
          return false;
        }

        if (!w && !h) {
          return videos[0];
        } else {
          var val = w ? w : h;
          var match = videos.filter(function (p) {
            return p[w ? 'width' : 'height'] === val;
          });

          if (match.length) {
            return match[0].url;
          } else {
            return videos[0].url;
          }
        }
      }
    }, {
      key: "getHighQuality",
      value: function getHighQuality() {
        return this.videos[0];
      }
    }, {
      key: "title",
      get: function get() {
        return this.$.name;
      }
    }, {
      key: "date",
      get: function get() {
        return this.$.formattedCreationDate;
      }
    }, {
      key: "description",
      get: function get() {
        return this.$.description;
      }
    }, {
      key: "duration",
      get: function get() {
        return this.$.duration;
      }
    }, {
      key: "pictures",
      get: function get() {
        return this.$.thumbnailList.sort(function (a, b) {
          return b.width - a.width;
        });
      }
    }, {
      key: "largest",
      get: function get() {
        return this.pictures[0].url;
      }
    }, {
      key: "smallest",
      get: function get() {
        var p = this.pictures;
        return p[p.length - 1].url;
      }
    }, {
      key: "videos",
      get: function get() {
        return this.$.videoMP4List.sort(function (a, b) {
          return b.width - a.width;
        });
      }
    }]);

    return MediaItem;
  }();

  var Api =
  /*#__PURE__*/
  function () {
    function Api() {
      _classCallCheck(this, Api);

      this._endpoints = {
        mostViewed: 'https://www.marketwatch.com/mw2/mediarss/wsjdn/wsjtv.asp?type=playlist&query=Most+Viewed+WSJ+Videos&format=json'
      };
    }

    _createClass(Api, [{
      key: "_getHeaders",
      value: function _getHeaders() {
        return {// Add headers here
        };
      }
    }, {
      key: "_send",
      value: function _send(url) {
        return fetch(url, this._getHeaders()).then(function (r) {
          return r.json();
        });
      }
    }, {
      key: "getMostViewed",
      value: function getMostViewed() {
        return this._send(this._endpoints.mostViewed).then(function () {
          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          if (!data.items.length) {
            return Promise.reject("No data found for most viewed videos");
          }

          return Promise.resolve(data.items.map(function (video) {
            return new MediaItem(video);
          }));
        }).catch(function (err) {
          throw new Error(Api.ERRORS.CODE1);
        });
      }
    }]);

    return Api;
  }();

  Api.ERRORS = {
    CODE1: "Unable to get details."
  };

  var App =
  /*#__PURE__*/
  function (_ux$App) {
    _inherits(App, _ux$App);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
      key: "_construct",
      value: function _construct() {
        this._api = new Api();
      }
    }, {
      key: "$getApi",
      value: function $getApi() {
        return this._api;
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState('Splash');
      }
    }, {
      key: "$error",
      value: function $error(_ref6) {
        var _this18 = this;

        var message = _ref6.message,
            _ref6$timeout = _ref6.timeout,
            timeout = _ref6$timeout === void 0 ? 5000 : _ref6$timeout,
            _ref6$returnState = _ref6.returnState,
            returnState = _ref6$returnState === void 0 ? "App" : _ref6$returnState;
        console.log('message: ' + message);

        this._setState("Error");

        return this.tag("Error").handleError({
          message: message,
          timeout: timeout
        }).then(function () {
          _this18._setState(returnState);
        });
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        if (this.state === "Playing") {
          settings.mediaplayer.consumer = this.tag("Player");
        }
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'PlayfairDisplay',
          url: App.getPath('fonts/PlayfairDisplay-Bold.ttf'),
          descriptors: {
            weight: 'bold'
          }
        }, {
          family: 'Roboto',
          url: App.getPath('fonts/Roboto-Regular.ttf'),
          descriptors: {}
        }, {
          family: 'Roboto',
          url: App.getPath('fonts/Roboto-Bold.ttf'),
          descriptors: {
            weight: 'bold'
          }
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Splash: {
            type: SplashScreen,
            transitions: {
              alpha: {
                duration: 1,
                delay: 0.3
              }
            }
          },
          Player: {
            type: Player,
            alpha: 0,
            transitions: {
              alpha: {
                duration: 1,
                delay: 1.5
              }
            }
          },
          Error: {
            type: Error$1,
            zIndex: 99,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this19) {
          _inherits(Splash, _this19);

          function Splash() {
            _classCallCheck(this, Splash);

            return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
          }

          _createClass(Splash, [{
            key: "$enter",
            value: function $enter() {
              this.tag('Splash').setSmooth('alpha', 1);
            }
          }, {
            key: "$hideInitialSplash",
            value: function $hideInitialSplash() {
              this._setState("Playing");
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag('Splash').setSmooth('alpha', 0);
            }
          }]);

          return Splash;
        }(this),
        /*#__PURE__*/
        function (_this20) {
          _inherits(Playing, _this20);

          function Playing() {
            _classCallCheck(this, Playing);

            return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
          }

          _createClass(Playing, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Player").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Player").setSmooth("alpha", 0);
            }
          }, {
            key: "$play",
            value: function $play(_ref7) {
              var item = _ref7.item,
                  items = _ref7.items;
              var player = this.tag('Player');
              var playlist = {
                item: item.getMediaplayerItem(),
                items: items.map(function (item) {
                  return item.getMediaplayerItem();
                })
              };

              if (player.play(playlist)) {
                this._setState("Playing");
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Player");
            }
          }]);

          return Playing;
        }(this),
        /*#__PURE__*/
        function (_this21) {
          _inherits(Error, _this21);

          function Error() {
            _classCallCheck(this, Error);

            return _possibleConstructorReturn(this, _getPrototypeOf(Error).apply(this, arguments));
          }

          _createClass(Error, [{
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
            key: "$exit",
            value: function $exit() {
              this.patch({
                Error: {
                  smooth: {
                    alpha: 0
                  }
                }
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Error");
            }
          }, {
            key: "_captureKey",
            value: function _captureKey() {// prevent key
            }
          }]);

          return Error;
        }(this)];
      }
    }, {
      key: "cropImage",
      value: function cropImage(_ref8) {
        var url = _ref8.url,
            w = _ref8.w,
            h = _ref8.h;
        return ux.Ui.getImageUrl(url, {
          width: w,
          height: h,
          type: 'crop'
        });
      }
    }]);

    return App;
  }(ux.App);

  return App;
}();