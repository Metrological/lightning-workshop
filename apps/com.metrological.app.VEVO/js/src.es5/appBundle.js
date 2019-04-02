"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var Current =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(Current, _lng$Component);

    function Current() {
      _classCallCheck(this, Current);

      return _possibleConstructorReturn(this, _getPrototypeOf(Current).apply(this, arguments));
    }

    _createClass(Current, [{
      key: "_init",
      value: function _init() {
        this._setState("Bar");
      }
    }, {
      key: "setProgress",
      value: function setProgress(currentTime, duration) {
        this._currentTime = currentTime;
        this._duration = duration;
        this._progress = currentTime / Math.max(duration, 1);
        this.tag("Label").text = "".concat(Current.formatTime(currentTime));
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Bar: {
            Focus: {
              x: direction === 1 ? 0 : 1050,
              smooth: {
                w: [1050, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        var width = this.tag("Bar").w;
        this.patch({
          Bar: {
            Focus: {
              smooth: {
                w: [0, {
                  duration: .6
                }],
                x: [direction === 1 ? width : 0, {
                  duration: .6
                }]
              }
            }
          },
          Duration: {
            Holder: {
              smooth: {
                color: [0xff353535, {
                  duration: .6
                }]
              }
            },
            Label: {
              smooth: {
                color: [0xffffffff, {
                  duration: .6
                }]
              }
            },
            ArrowLeft: {
              smooth: {
                alpha: [0, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            },
            ArrowRight: {
              smooth: {
                alpha: [0, {
                  duration: .6
                }],
                x: [30, {
                  duration: .6
                }]
              }
            }
          }
        });

        this._setState("Bar");
      }
    }, {
      key: "data",
      set: function set(v) {
        this.patch({
          Artist: {
            text: {
              text: v.artist
            }
          },
          Title: {
            text: {
              text: v.title.toUpperCase()
            }
          }
        });
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
        var x = v * (Current.width - 70) + 70;
        estimation *= 0.001;
        this.tag("Bar").setSmooth('w', Math.max(x, 0.0001)
        /* force clipping */
        , {
          timingFunction: 'linear',
          duration: estimation
        });
        this.tag("Duration").setSmooth('x', Math.max(x, 0.0001)
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
          rect: true,
          h: 180,
          w: Current.width,
          color: 0xff000000,
          Bar: {
            y: 180,
            h: 5,
            w: 70,
            rect: true,
            color: 0xff353535,
            clipping: true,
            Focus: {
              h: 5,
              rect: true
            }
          },
          Duration: {
            y: 185,
            x: 70,
            mountX: 1,
            w: 70,
            h: 40,
            ArrowLeft: {
              alpha: 0,
              Icon: {
                mount: .5,
                x: 20,
                y: 15,
                scale: .8,
                src: App.getPath("images/small-arrow.png")
              }
            },
            ArrowRight: {
              alpha: 0,
              Icon: {
                mount: .5,
                x: 20,
                y: 15,
                scale: .8,
                rotation: Math.PI,
                src: App.getPath("images/small-arrow.png")
              }
            },
            Holder: {
              w: 70,
              h: 30,
              rect: true,
              color: 0xff353535
            },
            Label: {
              mount: .5,
              x: 35,
              y: 17,
              text: {
                text: "00:00",
                fontSize: 19,
                fontFace: "Regular"
              }
            }
          },
          Artist: {
            x: 45,
            y: 39,
            color: 0xffaeafb5,
            text: {
              text: "",
              fontSize: 32,
              wordWrapWidth: 900,
              maxLines: 1,
              fontFace: "Italic"
            }
          },
          Title: {
            x: 45,
            y: 81,
            text: {
              text: "",
              fontSize: 48,
              wordWrapWidth: 900,
              lineHeight: 72,
              maxLines: 1,
              fontFace: "Bold"
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
        return [
        /*#__PURE__*/
        function (_this) {
          _inherits(Bar, _this);

          function Bar() {
            _classCallCheck(this, Bar);

            return _possibleConstructorReturn(this, _getPrototypeOf(Bar).apply(this, arguments));
          }

          _createClass(Bar, [{
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Duration");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._setState("Duration");
            }
          }]);

          return Bar;
        }(this),
        /*#__PURE__*/
        function (_this2) {
          _inherits(Duration, _this2);

          function Duration() {
            _classCallCheck(this, Duration);

            return _possibleConstructorReturn(this, _getPrototypeOf(Duration).apply(this, arguments));
          }

          _createClass(Duration, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Bar: {
                  Focus: {
                    smooth: {
                      color: [0xff353535, {
                        duration: .6
                      }]
                    }
                  }
                },
                Duration: {
                  Holder: {
                    smooth: {
                      color: [0xffffffff, {
                        duration: .6
                      }]
                    }
                  },
                  Label: {
                    smooth: {
                      color: [0xff151515, {
                        duration: .6
                      }]
                    }
                  },
                  ArrowLeft: {
                    smooth: {
                      alpha: [1, {
                        duration: .6
                      }],
                      x: [-40, {
                        duration: .6
                      }]
                    }
                  },
                  ArrowRight: {
                    smooth: {
                      alpha: [1, {
                        duration: .6
                      }],
                      x: [70, {
                        duration: .6
                      }]
                    }
                  }
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.patch({
                Bar: {
                  Focus: {
                    smooth: {
                      color: [0xffffffff, {
                        duration: .6
                      }]
                    }
                  }
                },
                Duration: {
                  Holder: {
                    smooth: {
                      color: [0xff353535, {
                        duration: .6
                      }]
                    }
                  },
                  Label: {
                    smooth: {
                      color: [0xffffffff, {
                        duration: .6
                      }]
                    }
                  },
                  ArrowLeft: {
                    smooth: {
                      alpha: [0, {
                        duration: .6
                      }],
                      x: [0, {
                        duration: .6
                      }]
                    }
                  },
                  ArrowRight: {
                    smooth: {
                      alpha: [0, {
                        duration: .6
                      }],
                      x: [30, {
                        duration: .6
                      }]
                    }
                  }
                }
              });
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("Bar");
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Bar");
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this.fireAncestors("$seekVideo", {
                direction: -1
              });
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              this.fireAncestors("$seekVideo", {
                direction: 1
              });
            }
          }]);

          return Duration;
        }(this)];
      }
    }]);

    return Current;
  }(lng.Component);

  Current.width = 1050;

  var UpNext =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(UpNext, _lng$Component2);

    function UpNext() {
      _classCallCheck(this, UpNext);

      return _possibleConstructorReturn(this, _getPrototypeOf(UpNext).apply(this, arguments));
    }

    _createClass(UpNext, [{
      key: "_init",
      value: function _init() {
        var _this3 = this;

        this.tag("Image").on("txLoaded", function () {
          _this3.patch({
            Holder: {
              Image: {
                smooth: {
                  alpha: [1, {
                    duration: .6
                  }]
                }
              }
            }
          });
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Holder: {
            Image: {
              smooth: {
                scale: [1.1, {
                  duration: .6
                }]
              }
            },
            Overlay: {
              Icon: {
                smooth: {
                  scale: [1, {
                    duration: .6
                  }]
                }
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 360,
            smooth: {
              w: [360, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Holder: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Overlay: {
              Icon: {
                smooth: {
                  scale: [.9, {
                    duration: .6
                  }]
                }
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 360 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "data",
      set: function set(v) {
        this._data = v;
        this.tag("Image").alpha = 0.001;
        this.tag("Image").texture = null;
        this.patch({
          Holder: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 440,
                height: 220,
                type: 'crop'
              })
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Holder: {
            rtt: true,
            w: 360,
            h: 180,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 180,
              y: 90,
              alpha: 0.001
            },
            Overlay: {
              w: 360,
              h: 180,
              rect: true,
              color: 0xaa000000,
              Icon: {
                mount: .5,
                x: 180,
                y: 90,
                scale: .9,
                src: App.getPath("images/player-next.png")
              }
            }
          },
          Focus: {
            y: 180,
            h: 5,
            rect: true
          }
        };
      }
    }]);

    return UpNext;
  }(lng.Component);

  var Artist =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(Artist, _lng$Component3);

    function Artist() {
      _classCallCheck(this, Artist);

      return _possibleConstructorReturn(this, _getPrototypeOf(Artist).apply(this, arguments));
    }

    _createClass(Artist, [{
      key: "_init",
      value: function _init() {
        var _this4 = this;

        this.tag("Image").on("txLoaded", function () {
          _this4.patch({
            Holder: {
              Image: {
                smooth: {
                  alpha: [1, {
                    duration: .6
                  }]
                }
              }
            }
          });
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Holder: {
            Image: {
              smooth: {
                scale: [1.1, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 180,
            smooth: {
              w: [180, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Holder: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 180 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$routeOnItemSelect", {
          item: this._data
        });
      }
    }, {
      key: "data",
      set: function set(v) {
        this._data = v;
        this.tag("Image").alpha = 0.001;
        this.tag("Image").texture = null;
        this.patch({
          Holder: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 200,
                height: 200,
                type: 'crop'
              })
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Holder: {
            rtt: true,
            w: 180,
            h: 180,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 90,
              y: 90,
              alpha: 0.001
            }
          },
          Focus: {
            y: 180,
            h: 5,
            rect: true
          }
        };
      }
    }]);

    return Artist;
  }(lng.Component);

  var UpNext$1 =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(UpNext$1, _lng$Component4);

    function UpNext$1() {
      _classCallCheck(this, UpNext$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(UpNext$1).apply(this, arguments));
    }

    _createClass(UpNext$1, [{
      key: "isPlaying",
      value: function isPlaying(v) {
        this.tag("Icon").src = v ? App.getPath("images/player-pause.png") : App.getPath("images/player-play.png");
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Icon: {
            smooth: {
              scale: [1, {
                duration: .6
              }]
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 90,
            smooth: {
              w: [90, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Icon: {
            smooth: {
              scale: [.9, {
                duration: .6
              }]
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 90 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 90,
          h: 180,
          rect: true,
          color: 0xff000000,
          Icon: {
            mount: .5,
            x: 45,
            y: 90,
            scale: .9,
            src: App.getPath("images/player-pause.png")
          },
          Focus: {
            y: 180,
            h: 5,
            rect: true
          }
        };
      }
    }]);

    return UpNext$1;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(Player, _lng$Component5);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "_init",
      value: function _init() {
        this._setState("Loading");
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._nostreamCounter = 0;
        this.patch({
          Bottom: {
            smooth: {
              y: [540, {
                duration: .6
              }]
            }
          }
        });

        this._setState("Playing.PlayPause");

        this._setInterfaceTimeout();

        this.fireAncestors("$logo", {
          x: 82,
          y: 82
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Bottom: {
            smooth: {
              y: [740, {
                duration: .6
              }]
            }
          }
        });
        clearTimeout(this._timeout);
        this.tag("Current").setProgress(0, 0);
      }
    }, {
      key: "play",
      value: function play(_ref) {
        var item = _ref.item,
            items = _ref.items,
            sourceList = _ref.sourceList;
        this._sourceList = sourceList;
        this._items = items;

        this._setItem(item);

        this._setInterfaceTimeout();
      }
    }, {
      key: "_setItem",
      value: function _setItem(item) {
        var _this5 = this;

        // there are some items without a stream url, in case of no stream url
        // we try to play the next item. As a fail safe we close the player
        // when we have a streak of 10 none-playing items.
        if (this._nostreamCounter > 9) {
          this.signal("forceStop");
          return;
        }

        var stream = null;
        this._item = item;
        this._index = this._items.indexOf(item);

        if (ux.Ui.hasOption("hls")) {
          stream = item.getStreamsByProvider("DLVR");
        } else {
          stream = item.getStreamsByQuality("high");
        }

        if (stream && stream.url) {
          this._currentTime = 0;
          this._nostreamCounter = 0;
          this._stream = stream.url;
          this.tag("Current").data = item;
          this.tag("Artist").data = item.artistObj;
          this.application.updateFocusSettings();

          var next = this._getNextItem();

          if (next) {
            this.tag("UpNext").data = next;
          }
        } else {
          this._nostreamCounter += 1;
          this.fireAncestors("$error", {
            message: "This video has no stream url, the next video will play in 5 seconds",
            returnState: "Playing"
          }).then(function () {
            _this5.next();
          });
        }
      }
    }, {
      key: "$mediaplayerProgress",
      value: function $mediaplayerProgress(_ref2) {
        var currentTime = _ref2.currentTime,
            duration = _ref2.duration;
        var diff = duration - currentTime;
        this._currentTime = currentTime;
        this._duration = duration;
        this.tag("Current").setProgress(currentTime, duration);

        if (diff < 2) {
          this._setState("LockInterface");
        }
      }
    }, {
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this.next();
      }
    }, {
      key: "$mediaplayerPlay",
      value: function $mediaplayerPlay() {
        this.tag("PlayPause").isPlaying(true);
        this.ready();
      }
    }, {
      key: "$mediaplayerPause",
      value: function $mediaplayerPause() {
        this.tag("PlayPause").isPlaying(false);
      }
    }, {
      key: "$mediaplayerStop",
      value: function $mediaplayerStop() {
        this.next();
      }
    }, {
      key: "$mediaplayerError",
      value: function $mediaplayerError() {
        this.fireAncestors("$error", {
          message: "An error occured while playing the asset"
        });
      }
    }, {
      key: "_setInterfaceTimeout",
      value: function _setInterfaceTimeout() {
        var _this6 = this;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this6._setState("Idle");
        }, 4000);
      }
    }, {
      key: "next",
      value: function next() {
        var item = this._getNextItem();

        if (!item) {
          return this.signal('playerStop');
        }

        this._setItem(item);

        if (this._sourceList) {
          this._sourceList.handlePlayerNext(this._index);
        }
      }
    }, {
      key: "_getNextItem",
      value: function _getNextItem() {
        if (this._items) {
          var index = (this._index + 1) % this._items.length;
          return this._items[index];
        }
      }
    }, {
      key: "$lastDirection",
      value: function $lastDirection() {
        return this._lastDirection;
      }
    }, {
      key: "$getState",
      value: function $getState() {
        return this.state;
      }
    }, {
      key: "_toggleInterface",
      value: function _toggleInterface(v) {
        this.patch({
          smooth: {
            alpha: [v ? 1 : 0, {
              duration: .6
            }]
          },
          Top: {
            smooth: {
              y: [v ? 0 : -200, {
                duration: .6
              }]
            }
          },
          Bottom: {
            smooth: {
              y: [v ? 540 : 740, {
                duration: .6
              }]
            }
          }
        });
        this.fireAncestors("$logo", {
          x: 82,
          y: v ? 82 : -118
        });
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
          Top: {
            w: 1920,
            h: 540,
            rect: true,
            colorTop: 0xff000000,
            colorBottom: 0x00000000
          },
          Bottom: {
            w: 1920,
            h: 540,
            y: 740,
            rect: true,
            colorTop: 0x00151515,
            colorBottom: 0xff151515,
            Bar: {
              x: 100,
              y: 260,
              PlayPause: {
                type: UpNext$1
              },
              Artist: {
                type: Artist,
                x: 90
              },
              Current: {
                type: Current,
                x: 270
              },
              UpNext: {
                type: UpNext,
                x: 1320
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
        function (_this7) {
          _inherits(Loading, _this7);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this8) {
          _inherits(Playing, _this8);

          function Playing() {
            _classCallCheck(this, Playing);

            return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
          }

          _createClass(Playing, [{
            key: "_captureKey",
            value: function _captureKey() {
              this._setInterfaceTimeout();

              return false;
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this9) {
                _inherits(Progress, _this9);

                function Progress() {
                  _classCallCheck(this, Progress);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
                }

                _createClass(Progress, [{
                  key: "_handleLeft",
                  value: function _handleLeft() {
                    this._lastDirection = -1;

                    this._setState("Artist");
                  }
                }, {
                  key: "_handleRight",
                  value: function _handleRight() {
                    this._lastDirection = 1;

                    this._setState("UpNext");
                  }
                }, {
                  key: "_getFocused",
                  value: function _getFocused() {
                    return this.tag("Current");
                  }
                }, {
                  key: "_updateTimeOffset",
                  value: function _updateTimeOffset(offset) {
                    var current = this._currentTime;
                    var duration = this._duration;
                    var step = Player.TIME_STEPS * offset;
                    var time = current + step;

                    if (time >= 0 && time <= duration) {
                      this.application.mediaplayer.seek(time, true);
                    }
                  }
                }, {
                  key: "$seekVideo",
                  value: function $seekVideo(_ref3) {
                    var direction = _ref3.direction;

                    this._updateTimeOffset(direction);
                  }
                }]);

                return Progress;
              }(this),
              /*#__PURE__*/
              function (_this10) {
                _inherits(PlayPause, _this10);

                function PlayPause() {
                  _classCallCheck(this, PlayPause);

                  return _possibleConstructorReturn(this, _getPrototypeOf(PlayPause).apply(this, arguments));
                }

                _createClass(PlayPause, [{
                  key: "_handleEnter",
                  value: function _handleEnter() {
                    this.application.mediaplayer.playPause();
                  }
                }, {
                  key: "_handleRight",
                  value: function _handleRight() {
                    this._lastDirection = 1;

                    this._setState("Artist");
                  }
                }, {
                  key: "_getFocused",
                  value: function _getFocused() {
                    return this.tag("PlayPause");
                  }
                }]);

                return PlayPause;
              }(this)];
            }
          }]);

          return Playing;
        }(this),
        /*#__PURE__*/
        function (_this11) {
          _inherits(UpNext$$1, _this11);

          function UpNext$$1() {
            _classCallCheck(this, UpNext$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(UpNext$$1).apply(this, arguments));
          }

          _createClass(UpNext$$1, [{
            key: "_handleEnter",
            value: function _handleEnter() {
              this.next();

              this._setInterfaceTimeout();
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this._lastDirection = -1;

              this._setState("Playing.Progress");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("UpNext");
            }
          }]);

          return UpNext$$1;
        }(this),
        /*#__PURE__*/
        function (_this12) {
          _inherits(Artist$$1, _this12);

          function Artist$$1() {
            _classCallCheck(this, Artist$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Artist$$1).apply(this, arguments));
          }

          _createClass(Artist$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Artist");
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this._lastDirection = -1;

              this._setState("Playing.PlayPause");
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              this._lastDirection = 1;

              this._setState("Playing.Progress");
            }
          }]);

          return Artist$$1;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(Idle, _this13);

          function Idle() {
            _classCallCheck(this, Idle);

            return _possibleConstructorReturn(this, _getPrototypeOf(Idle).apply(this, arguments));
          }

          _createClass(Idle, [{
            key: "$enter",
            value: function $enter() {
              this._toggleInterface(false);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this._toggleInterface(true);

              this._setInterfaceTimeout();
            }
          }, {
            key: "_captureKey",
            value: function _captureKey() {
              this._setState("Playing.PlayPause");
            }
          }]);

          return Idle;
        }(this),
        /*#__PURE__*/
        function (_this14) {
          _inherits(LockInterface, _this14);

          function LockInterface() {
            _classCallCheck(this, LockInterface);

            return _possibleConstructorReturn(this, _getPrototypeOf(LockInterface).apply(this, arguments));
          }

          _createClass(LockInterface, [{
            key: "$enter",
            value: function $enter() {
              clearTimeout(this._timeout);

              this._toggleInterface(true);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this._setInterfaceTimeout();
            }
          }, {
            key: "ready",
            value: function ready() {
              this._setState("Playing.PlayPause");
            }
          }]);

          return LockInterface;
        }(this)];
      }
    }]);

    return Player;
  }(lng.Component);

  Player.TIME_STEPS = 10;

  var Page =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Page, _lng$Component6);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: "_onReload",

      /**
       * Fired when a Page gets reloaded by PageRouter
       * method needs to be implemented by subclass if it's stored in history
       * @param props
       * @private
       */
      value: function _onReload(_ref4) {
        var props = _ref4.props;
      }
      /**
       * Fired when a Page gets loaded by PageRouter
       * method can be implemented by subclass -
       * if page requires loading do a fireAncestor("$pageLoaded") when ready
       * @param props
       * @private
       */

    }, {
      key: "_onLoad",
      value: function _onLoad() {}
      /**
       * Flag for PageRouter to put in history
       * Subclass need to override
       * @returns {boolean}
       */

    }, {
      key: "show",

      /**
       * Gets fired when Page gets loaded
       * can be implemented by subclass
       */
      value: function show() {}
      /**
       * Gets fired when Page hides
       * can be implemented by subclass
       */

    }, {
      key: "hide",
      value: function hide() {}
    }, {
      key: "store",
      get: function get() {
        return false;
      }
      /**
       * Only store last version of component
       * so PageRouter can replace previous version
       * @returns {boolean}
       */

    }, {
      key: "storeLast",
      get: function get() {
        return false;
      }
      /**
       * Flag for PageRouter to clear history
       * Subclass need to override
       * @returns {boolean}
       */

    }, {
      key: "clearHistory",
      get: function get() {
        return false;
      }
      /**
       * Gets called when Page gets unloaded and stored in memory
       * for the sake of memory try to store as minimum as possible
       * @returns {{props: Object}}
       */

    }, {
      key: "persist",
      get: function get() {
        return {
          props: null
        };
      }
      /**
       * Flag for PageRouter to tell that the page requires loading
       * so the Loader Component can become visible and wait for an endload signal
       * --
       * usage: Page signal("endload",{}, true) when loading is ready
       * --
       * @returns {boolean}
       */

    }, {
      key: "requiresLoading",
      get: function get() {
        return false;
      }
    }]);

    return Page;
  }(lng.Component);
  /**
   * @todo: feature: deeplinking to a non history clearing Page
   */


  var PageRouter =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(PageRouter, _lng$Component7);

    function PageRouter() {
      _classCallCheck(this, PageRouter);

      return _possibleConstructorReturn(this, _getPrototypeOf(PageRouter).apply(this, arguments));
    }

    _createClass(PageRouter, [{
      key: "$loadPage",

      /**
       * Load page and store current active page
       * called by subclass
       * @param ref
       * @param previous
       */
      value: function $loadPage(_ref5) {
        var ref = _ref5.ref,
            data = _ref5.data;

        var page = this._pagesComponent().getByRef(ref);

        if (!page || !page instanceof Page) {
          throw new Error("".concat(ref, " is not a valid Page"));
        }

        var previous = this._activePage;

        if (previous && previous.store) {
          // if storeLast flag is true we remove
          // previous page hit from history
          if (previous.storeLast) {
            this._removePagesFromHistory(previous.ref);
          }

          var persist = previous.persist; // if we don't have an exact match in history
          // store previous

          if (!this.__equalValueInHistory(previous.ref, persist)) {
            this._history.push({
              ref: previous.ref,
              props: persist
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

    }, {
      key: "$goBack",
      value: function $goBack() {
        if (this._history.length) {
          var settings;

          if (this._activePage.storeLast) {
            do {
              settings = this._history.pop();
            } while (settings.ref === this._activePage.ref && this._history.length);
          } else {
            settings = this._history.pop();
          }

          this._reloadPage(settings);
        }
      }
    }, {
      key: "_removePagesFromHistory",
      value: function _removePagesFromHistory(ref) {
        if (this._history.length) {
          var n = this._history.length;

          while (n--) {
            if (this._history[n].ref === ref) {
              this._history.splice(n, 1);
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

    }, {
      key: "_reloadPage",
      value: function _reloadPage(_ref6) {
        var ref = _ref6.ref,
            props = _ref6.props;

        var page = this._pagesComponent().getByRef(ref);

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
    }, {
      key: "$forceReload",
      value: function $forceReload(_ref7) {
        var ref = _ref7.ref,
            props = _ref7.props;

        this._reloadPage({
          ref: ref,
          props: props
        });
      }
      /**
       * Return the component where the configured pages live
       * this can be overwritten by a subclass if it's wrapped
       * in Shader contents
       * @returns {PageManager}
       * @private
       */

    }, {
      key: "_pagesComponent",
      value: function _pagesComponent() {
        return this;
      }
      /**
       * Check if we have an exacte ref and props match
       * in history, so we can remove that
       * @private
       */

    }, {
      key: "__equalValueInHistory",
      value: function __equalValueInHistory(ref, persist) {
        var pages = this._history.filter(function (v) {
          return v.ref === ref;
        });

        var hasIdentifier = persist && persist.hasOwnProperty("uniqueId");

        if (!pages.length) {
          return false;
        }

        var i = 0,
            j = pages.length;

        for (; i < j; i++) {
          var page = pages[i];

          if (hasIdentifier) {
            if (page.props.uniqueId === persist.uniqueId) {
              return true;
            }
          } else if (lng.Utils.equalValues(persist, page.props)) {
            return true;
          }
        }

        return false;
      }
      /**
       * Clear full history
       * @private
       */

    }, {
      key: "__clear",
      value: function __clear() {
        this._history.length = 0;
      }
    }, {
      key: "_construct",
      value: function _construct() {
        this._history = [];
      }
    }, {
      key: "_init",
      value: function _init() {
        this._activeRef = this.default;
        this._activePage = this._pagesComponent().getByRef(this._activeRef);

        this._setState("InPage");
      }
    }, {
      key: "$loading",
      value: function $loading() {
        this._setState("Loading");
      }
    }, {
      key: "default",
      get: function get() {
        throw new Error("Default ref not provided");
      }
    }], [{
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this15) {
          _inherits(InPage, _this15);

          function InPage() {
            _classCallCheck(this, InPage);

            return _possibleConstructorReturn(this, _getPrototypeOf(InPage).apply(this, arguments));
          }

          _createClass(InPage, [{
            key: "$enter",
            value: function $enter() {
              this._activePage._onPageShow();
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this._activePage;
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this.$goBack();
            }
          }, {
            key: "_captureKey",
            value: function _captureKey(e) {
              if (e.keyCode === 83) {
                this.$loadPage({
                  ref: "Search"
                });
              } else {
                return false;
              }
            }
          }]);

          return InPage;
        }(this),
        /*#__PURE__*/
        function (_this16) {
          _inherits(Loading, _this16);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.fireAncestors("$startLoader");
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.fireAncestors("$stopLoader");
            }
          }, {
            key: "$loadingReady",
            value: function $loadingReady() {
              this._setState("InPage");
            }
          }]);

          return Loading;
        }(this)];
      }
    }]);

    return PageRouter;
  }(lng.Component);

  var ItemWrapper =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(ItemWrapper, _lng$Component8);

    function ItemWrapper() {
      _classCallCheck(this, ItemWrapper);

      return _possibleConstructorReturn(this, _getPrototypeOf(ItemWrapper).apply(this, arguments));
    }

    _createClass(ItemWrapper, [{
      key: "create",
      value: function create() {
        var item = this._item;
        this.children = [{
          type: this._construct,
          item: item
        }]; // if item is flagged and has focus, notify parent
        // that focuspath can be recalculated

        if (this._notifyOnItemCreation && this.hasFocus()) {
          this._refocus();
        }
      }
    }, {
      key: "_firstActive",
      value: function _firstActive() {
        this.create();

        if (!ItemWrapper.FIRST_CREATED) {
          this.fireAncestors("$firstItemCreated");
          ItemWrapper.FIRST_CREATED = true;
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        // due to lazy creation there is the possibility that
        // an component receives focus before the actual item
        // is created, therefore we set a flag
        if (!this.child) {
          this._notifyOnItemCreation = true;
        } else {
          return this.child;
        }
      }
    }, {
      key: "construct",
      set: function set(v) {
        this._construct = v;
      }
    }, {
      key: "item",
      set: function set(obj) {
        this._item = obj;
      },
      get: function get() {
        return this._item;
      }
    }, {
      key: "child",
      get: function get() {
        return this.children[0];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          clipbox: true,
          w: 750,
          h: 450
        };
      }
    }]);

    return ItemWrapper;
  }(lng.Component);

  ItemWrapper.FIRST_CREATED = false;

  var More =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(More, _lng$Component9);

    function More() {
      _classCallCheck(this, More);

      return _possibleConstructorReturn(this, _getPrototypeOf(More).apply(this, arguments));
    }

    _createClass(More, [{
      key: "_init",
      value: function _init() {
        this.tag("MirrorImage").texture = this.tag("Button").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 260, 160, 70);
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Button: {
            Label: {
              smooth: {
                y: [290, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 160,
            smooth: {
              w: [160, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Button: {
            Label: {
              smooth: {
                y: [315, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 160 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$showMore");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Button: {
            w: 160,
            h: 320,
            rect: true,
            color: 0xff000000,
            rtt: true,
            Label: {
              mountX: 0.5,
              x: 80,
              mountY: 1,
              y: 315,
              text: {
                text: "MORE",
                fontSize: 36,
                fontFace: "Bold"
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x80ffffff
            }
          }
        };
      }
    }]);

    return More;
  }(lng.Component);

  var List =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(List, _lng$Component10);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
    }

    _createClass(List, [{
      key: "$lastDirection",
      value: function $lastDirection() {
        return this._lastDirection;
      }
    }, {
      key: "_animateToSelected",
      value: function _animateToSelected() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._index;
        var width = this._construct.width;

        for (var i = 0; i < this.tag("Items").children.length; i++) {
          var item = this.tag("Items").children[i];
          var _this$_construct = this._construct,
              _width = _this$_construct.width,
              space = _this$_construct.space;

          if (i >= index + 1) {
            item.setSmooth("x", i * _width + space, {
              duration: .6
            });
          } else {
            item.setSmooth("x", i * _width, {
              duration: .6
            });
          }
        }

        if (this._index >= 1) {
          var scrollOffset = (index - 1) * width - width / 2;
          var max = this._videos.length * width - this.parentWidth;
          var position;

          if (scrollOffset >= max) {
            position = max * -1;
          } else {
            position = scrollOffset * -1;
          }

          this.tag("Items").setSmooth("x", position - width, {
            duration: .8
          });
        } else {
          this.tag("Items").setSmooth("x", -(index * width), {
            duration: .8
          });
        }
      }
    }, {
      key: "_reset",
      value: function _reset() {
        for (var i = 0; i < this.tag("Items").children.length; i++) {
          var item = this.tag("Items").children[i];
          var width = this._construct.width;
          item.setSmooth("x", i * width, {
            duration: .6
          });
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this17 = this;

        this._items = this.tag("Items").children;
        this._index = 0;
        this.tag("Items").transition("x").on("start", function () {
          _this17._listTransition = true;
        });
        this.tag("Items").transition("x").on("finish", function () {
          _this17._listTransition = false;
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._animateToSelected();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._reset();
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._index > 0) {
          this.select({
            direction: -1
          });
        } else {
          return false;
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._index < this._items.length - 1) {
          this.select({
            direction: 1
          });
        }
      }
    }, {
      key: "handlePlayerNext",
      value: function handlePlayerNext(index) {
        this.select({
          forceIndex: index
        });
      }
    }, {
      key: "select",
      value: function select(_ref8) {
        var direction = _ref8.direction,
            forceIndex = _ref8.forceIndex;

        if (parseInt(forceIndex) === forceIndex) {
          this._index = forceIndex;
        } else {
          this._lastDirection = direction;
          this._index += direction;
          this.active.direction = direction;
        }

        this._animateToSelected();
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$onItemSelect", {
          item: this.active.item,
          items: this._videos,
          sourceList: this
        });
      }
    }, {
      key: "$showMore",
      value: function $showMore() {
        this.fireAncestors("$allItemForContainer", {
          id: this._container.id,
          offset: 20,
          genre: this.fireAncestors("$genre")
        });
      }
    }, {
      key: "$itemCreatedForFocus",
      value: function $itemCreatedForFocus() {
        this.application.updateFocusPath();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag("Items").children[this._index];
      }
    }, {
      key: "getRealComponent",
      get: function get() {
        return this.active.child;
      }
    }, {
      key: "items",
      get: function get() {
        return this._items;
      },
      set: function set(v) {
        var _this18 = this;

        var construct = this._construct;
        this._videos = v; //@warn: since we lazy create all the items
        // we need to set the itemWrapper flag to false
        // so it can notify that the first item is created

        ItemWrapper.FIRST_CREATED = false;
        this.tag("Items").patch({
          children: v.map(function (item, index) {
            return {
              type: ItemWrapper,
              construct: _this18._construct,
              index: index,
              item: item,
              x: index * construct.width,
              transitions: {
                x: {
                  delay: .06 * index,
                  duration: .6
                }
              }
            };
          })
        }); // invoke more button when we container type
        // consist of more items then displayed

        if (this._container && this._container.total && this._container.total > v.length) {
          this.tag("Items").childList.add(this.stage.c({
            type: More,
            x: v.length * construct.width
          }));
        }
      }
    }, {
      key: "title",
      set: function set(v) {
        this.tag("Title").patch({
          text: {
            text: v.toUpperCase()
          }
        });
      }
    }, {
      key: "container",
      set: function set(v) {
        this._container = v;
      },
      get: function get() {
        return this._container;
      }
    }, {
      key: "construct",
      set: function set(v) {
        this._construct = v;
      },
      get: function get() {
        return this._construct;
      }
    }, {
      key: "parentWidth",
      set: function set(v) {
        this._parentWidth = v;
      },
      get: function get() {
        return this._parentWidth || 1920;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          transitions: {
            alpha: {
              duration: .6
            }
          },
          zIndex: 3,
          Title: {
            pivotX: 0,
            color: 0xff8d8c93,
            text: {
              fontSize: 32,
              fontFace: "Regular"
            }
          },
          Items: {
            forceZIndexContext: true,
            boundsMargin: [500, 100, 500, 100],
            y: 62,
            transitions: {
              x: {
                duration: .6
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
        function (_this19) {
          _inherits(Loading, _this19);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {}
          }, {
            key: "$exit",
            value: function $exit() {}
          }, {
            key: "ready",
            value: function ready() {
              this._setState("");
            }
          }]);

          return Loading;
        }(this)];
      }
    }, {
      key: "height",
      get: function get() {
        return 580;
      }
    }]);

    return List;
  }(lng.Component);

  var Tools =
  /*#__PURE__*/
  function () {
    function Tools() {
      _classCallCheck(this, Tools);
    }

    _createClass(Tools, null, [{
      key: "getPropertyByPath",
      value: function getPropertyByPath(object, path, def) {
        return path.split('.').reduce(function (o, p) {
          return o ? o[p] : def;
        }, object);
      }
    }, {
      key: "normalizeDuration",
      value: function normalizeDuration(ms) {
        var sec = ms / 1000;
        var minutes = ~~(sec % 3600 / 60);
        var seconds = ~~sec % 60;
        return "".concat(minutes, ":").concat(seconds < 10 ? "0".concat(seconds) : seconds);
      }
    }, {
      key: "normalizeNumber",
      value: function normalizeNumber(num) {
        var f = function f(v) {
          return parseFloat(v).toFixed(2);
        };

        if (num >= 1.0e+9) {
          return "".concat(f(num / 1.0e+9), "B");
        } else if (num >= 1.0e+6) {
          return "".concat(f(num / 1.0e+6), "M");
        } else if (num > 1.0e+3) {
          return "".concat(f(num / 1.0e+3), "K");
        } else {
          return "-";
        }
      }
    }, {
      key: "extractCommonColor",
      value: function extractCommonColor(texture, gl, lng, _ref9) {
        var _ref9$offset = _ref9.offset,
            offset = _ref9$offset === void 0 ? 90 : _ref9$offset,
            _ref9$step = _ref9.step,
            step = _ref9$step === void 0 ? 60 : _ref9$step;

        if (!texture) {
          return;
        }

        var fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        var tmp = new Uint8Array(4);
        var colors = [];

        for (var i = offset, n = texture.w - offset; i < n; i += step) {
          for (var j = offset, o = texture.h - offset; j < o; j += step) {
            gl.readPixels(j, i, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, tmp);
            colors.push(lng.StageUtils.getArgbNumber(tmp));
          }
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.deleteFramebuffer(fb);
        var filtered = colors.filter(function (color) {
          return color > 4283190348;
        });
        var availableColors = filtered.length ? filtered : colors;

        if (!filtered.length) {
          return colors.sort(function (a, b) {
            return a > b ? 1 : -1;
          }).pop();
        } else {
          return availableColors.sort(function (a, b) {
            return availableColors.filter(function (v) {
              return v === a;
            }).length - availableColors.filter(function (v) {
              return v === b;
            }).length;
          }).pop();
        }
      }
    }, {
      key: "cleanString",
      value: function cleanString(str) {
        return str.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
      }
    }]);

    return Tools;
  }();

  var Item =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(Item, _lng$Component11);

    function Item() {
      _classCallCheck(this, Item);

      return _possibleConstructorReturn(this, _getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
      key: "_init",
      value: function _init() {
        var _this20 = this;

        this.tag("Image").on("txLoaded", function () {
          _this20.patch({
            Content: {
              rect: false,
              Image: {
                smooth: {
                  alpha: [1, {
                    duration: .6
                  }]
                }
              }
            }
          });
        });
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        return false;
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [300, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            },
            Metadata: {
              smooth: {
                alpha: [1, {
                  duration: .6
                }],
                y: [252, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 640,
            smooth: {
              w: [640, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [325, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            },
            Metadata: {
              smooth: {
                alpha: [0, {
                  duration: .6
                }],
                y: [360, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 640 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Content: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 680,
                height: 340,
                type: 'crop'
              })
            },
            Details: {
              Flex: {
                Artist: {
                  text: {
                    text: v.artist
                  }
                },
                Title: {
                  text: {
                    text: v.title.toUpperCase()
                  }
                }
              }
            },
            Metadata: {
              Views: {
                Label: {
                  text: {
                    text: Tools.normalizeNumber(v.views)
                  }
                }
              },
              Duration: {
                Label: {
                  text: {
                    text: Tools.normalizeDuration(v.duration)
                  }
                }
              }
            }
          }
        });
        this.tag("MirrorImage").texture = this.tag("Content").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 260, 640, 70);
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 640,
            h: 320,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 320,
              y: 160,
              alpha: 0.001
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xdd000000,
              w: 640,
              h: 200,
              y: 120
            },
            Details: {
              y: 325,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Artist: {
                  color: 0xffaeafb5,
                  flexItem: {
                    marginLeft: 20,
                    marginTop: 15,
                    marginRight: 20
                  },
                  text: {
                    fontSize: 23,
                    wordWrapWidth: 420,
                    fontFace: "Italic"
                  }
                },
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: -7
                  },
                  text: {
                    fontSize: 36,
                    wordWrapWidth: 420,
                    lineHeight: 42,
                    maxLines: 2,
                    fontFace: "Bold"
                  }
                }
              }
            },
            Metadata: {
              y: 360,
              alpha: 0,
              Duration: {
                x: 598,
                Label: {
                  mountX: 1,
                  text: {
                    fontSize: 18,
                    fontFace: "Regular"
                  }
                },
                Icon: {
                  x: 37,
                  y: -8,
                  mountX: 1,
                  scale: .8,
                  src: App.getPath('images/duration.png')
                }
              },
              Views: {
                x: 598,
                y: 28,
                Label: {
                  mountX: 1,
                  text: {
                    fontSize: 18,
                    fontFace: "Regular"
                  }
                },
                Icon: {
                  x: 37,
                  y: -8,
                  mountX: 1,
                  scale: .8,
                  src: App.getPath('images/view.png')
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x80ffffff
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [];
      }
    }, {
      key: "width",
      get: function get() {
        return 730;
      }
    }, {
      key: "height",
      get: function get() {
        return 490;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return Item;
  }(lng.Component);

  var VideoComponent =
  /*#__PURE__*/
  function (_Item) {
    _inherits(VideoComponent, _Item);

    function VideoComponent() {
      _classCallCheck(this, VideoComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(VideoComponent).apply(this, arguments));
    }

    return VideoComponent;
  }(Item);

  var ArtistComponent =
  /*#__PURE__*/
  function (_Item2) {
    _inherits(ArtistComponent, _Item2);

    function ArtistComponent() {
      _classCallCheck(this, ArtistComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(ArtistComponent).apply(this, arguments));
    }

    _createClass(ArtistComponent, [{
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.15, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [300, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 320,
            smooth: {
              w: [320, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [325, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 320 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_normalize",
      value: function _normalize(str) {
        var reg = /([A-Z]{10,}|\w{15,})/g;
        var match = reg.exec(str);

        if (match && match.length) {
          var fullMatch = match[1];
          var chars = fullMatch.split("");
          var text = [];
          chars.forEach(function (c, idx) {
            if (idx % 9 === 0 && idx > 0) {
              text.push("- ");
            }

            text.push(c);
          });
          var result = text.join("");
          str = str.replace(fullMatch, result);
        }

        return str;
      }
    }, {
      key: "item",
      get: function get() {
        return this._item;
      },
      set: function set(v) {
        this._item = v;

        var title = this._normalize(v.title);

        this.patch({
          Content: {
            Image: {
              src: v.image === null ? App.getPath('images/missing-artist.png') : ux.Ui.getImageUrl("".concat(v.image), {
                width: 320,
                height: 320,
                type: 'crop'
              })
            },
            Details: {
              Flex: {
                Title: {
                  text: {
                    text: title
                  }
                }
              }
            }
          }
        });
        this.tag("MirrorImage").texture = this.tag("Content").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 260, 320, 70);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 320,
            h: 320,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 160,
              y: 160,
              alpha: 0.001
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xff000000,
              w: 320,
              h: 90,
              y: 230
            },
            Details: {
              y: 325,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 15
                  },
                  color: 0xffffffff,
                  text: {
                    fontSize: 36,
                    wordWrapWidth: 240,
                    fontFace: "Bold",
                    lineHeight: 44
                  }
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x47ffffff
            }
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 410;
      }
    }, {
      key: "height",
      get: function get() {
        return 410;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return ArtistComponent;
  }(Item);

  var GenreComponent =
  /*#__PURE__*/
  function (_Item3) {
    _inherits(GenreComponent, _Item3);

    function GenreComponent() {
      _classCallCheck(this, GenreComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(GenreComponent).apply(this, arguments));
    }

    _createClass(GenreComponent, [{
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [300, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 320,
            smooth: {
              w: [320, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [325, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 320 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Content: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 320,
                height: 320,
                type: 'crop'
              })
            },
            Details: {
              Flex: {
                Title: {
                  text: {
                    text: v.title.toUpperCase()
                  }
                }
              }
            }
          }
        });
        this.tag("MirrorImage").texture = this.tag("Content").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 260, 320, 70);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 320,
            h: 320,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 160,
              y: 160,
              alpha: 0.001
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xff000000,
              w: 320,
              h: 90,
              y: 230
            },
            Details: {
              y: 325,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 15
                  },
                  color: 0xffffffff,
                  text: {
                    fontSize: 36,
                    wordWrapWidth: 240,
                    fontFace: "Bold",
                    lineHeight: 44
                  }
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x47ffffff
            }
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 410;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return GenreComponent;
  }(Item);

  var PlaylistComponent =
  /*#__PURE__*/
  function (_Item4) {
    _inherits(PlaylistComponent, _Item4);

    function PlaylistComponent() {
      _classCallCheck(this, PlaylistComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlaylistComponent).apply(this, arguments));
    }

    _createClass(PlaylistComponent, [{
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [305, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 640,
            smooth: {
              w: [640, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [325, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 640 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "item",
      get: function get() {
        return this._item;
      },
      set: function set(v) {
        this._item = v;
        this.patch({
          Content: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 680,
                height: 340,
                type: 'crop'
              })
            },
            Details: {
              Flex: {
                Title: {
                  text: {
                    text: v.title
                  }
                }
              }
            }
          }
        });
        this.tag("MirrorImage").texture = this.tag("Content").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 260, 640, 70);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 640,
            h: 320,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 320,
              y: 160,
              alpha: 0.001
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xff000000,
              w: 640,
              h: 90,
              y: 230
            },
            Details: {
              y: 325,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 15
                  },
                  text: {
                    fontSize: 36,
                    wordWrapWidth: 600,
                    lineHeight: 44,
                    fontFace: "Bold"
                  }
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x47ffffff
            }
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 730;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return PlaylistComponent;
  }(Item);

  var ShowComponent =
  /*#__PURE__*/
  function (_Item5) {
    _inherits(ShowComponent, _Item5);

    function ShowComponent() {
      _classCallCheck(this, ShowComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(ShowComponent).apply(this, arguments));
    }

    _createClass(ShowComponent, [{
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.05, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [300, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 640,
            smooth: {
              w: [640, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [325, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 640 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Content: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 680,
                height: 340,
                type: 'crop'
              })
            },
            Details: {
              Flex: {
                Title: {
                  text: {
                    text: v.title
                  }
                }
              }
            }
          }
        });
        this.tag("MirrorImage").texture = this.tag("Content").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 260, 640, 70);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 640,
            h: 320,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 320,
              y: 160,
              alpha: 0.001
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xff000000,
              w: 640,
              h: 90,
              y: 230
            },
            Details: {
              y: 325,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 15
                  },
                  text: {
                    fontSize: 36,
                    wordWrapWidth: 600,
                    lineHeight: 44,
                    fontFace: "Bold"
                  }
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x47ffffff
            }
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 730;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return ShowComponent;
  }(Item);

  var ShowItem =
  /*#__PURE__*/
  function (_Item6) {
    _inherits(ShowItem, _Item6);

    function ShowItem() {
      _classCallCheck(this, ShowItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ShowItem).apply(this, arguments));
    }

    _createClass(ShowItem, [{
      key: "_init",
      value: function _init() {
        var _this21 = this;

        this.tag("Image").on("txLoaded", function () {
          _this21.patch({
            Content: {
              rect: false,
              Image: {
                smooth: {
                  alpha: [1, {
                    duration: .6
                  }]
                }
              }
            }
          });
        });
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        return false;
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [380, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            },
            Metadata: {
              smooth: {
                alpha: [1, {
                  duration: .6
                }],
                y: [332, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 800,
            smooth: {
              w: [800, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
        this.fireAncestors("$setItem", {
          item: this._item
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [405, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            },
            Metadata: {
              smooth: {
                alpha: [0, {
                  duration: .6
                }],
                y: [440, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 800 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Content: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(v.image), {
                width: 840,
                height: 420,
                type: 'crop'
              })
            },
            Details: {
              Flex: {
                Artist: {
                  text: {
                    text: v.artist
                  }
                },
                Title: {
                  text: {
                    text: v.title.toUpperCase()
                  }
                }
              }
            },
            Metadata: {
              Views: {
                Label: {
                  text: {
                    text: Tools.normalizeNumber(v.views)
                  }
                }
              },
              Duration: {
                Label: {
                  text: {
                    text: Tools.normalizeDuration(v.duration)
                  }
                }
              }
            }
          }
        });
        this.tag("MirrorImage").texture = this.tag("Content").getTexture();
        this.tag("MirrorImage").texture.enableClipping(0, 340, 800, 70);
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 800,
            h: 400,
            color: 0xff151515,
            rect: true,
            Image: {
              mount: .5,
              x: 400,
              y: 200,
              alpha: 0.001
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xdd000000,
              w: 800,
              h: 200,
              y: 200
            },
            Details: {
              y: 405,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Artist: {
                  color: 0xffaeafb5,
                  flexItem: {
                    marginLeft: 20,
                    marginTop: 15,
                    marginRight: 20
                  },
                  text: {
                    fontSize: 23,
                    wordWrapWidth: 620,
                    fontFace: "Italic"
                  }
                },
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: -7
                  },
                  text: {
                    fontSize: 36,
                    wordWrapWidth: 620,
                    lineHeight: 42,
                    maxLines: 2,
                    fontFace: "Bold"
                  }
                }
              }
            },
            Metadata: {
              y: 440,
              alpha: 0,
              Duration: {
                x: 758,
                Label: {
                  mountX: 1,
                  text: {
                    fontSize: 18,
                    fontFace: "Regular"
                  }
                },
                Icon: {
                  x: 37,
                  y: -8,
                  mountX: 1,
                  scale: .8,
                  src: App.getPath('images/duration.png')
                }
              },
              Views: {
                x: 758,
                y: 28,
                Label: {
                  mountX: 1,
                  text: {
                    fontSize: 18,
                    fontFace: "Regular"
                  }
                },
                Icon: {
                  x: 37,
                  y: -8,
                  mountX: 1,
                  scale: .8,
                  src: App.getPath('images/view.png')
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 400,
            h: 5
          },
          Mirror: {
            y: 400,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x80ffffff
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [];
      }
    }, {
      key: "width",
      get: function get() {
        return 890;
      }
    }, {
      key: "height",
      get: function get() {
        return 490;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return ShowItem;
  }(Item);

  var Grid =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(Grid, _lng$Component12);

    function Grid() {
      _classCallCheck(this, Grid);

      return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this._width;
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        var index = this._index;

        if (index - this._itemsPerRow >= 0) {
          index -= this._itemsPerRow;
        } else {
          return false;
        }

        this._select(index);
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        var index = this._index;

        if (index + this._itemsPerRow > this._items.length - 1) {
          index = this._items.length - 1;
        } else {
          index += this._itemsPerRow;
        }

        this._select(index);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        var index = this._index;

        if (index % this._itemsPerRow === 0) {
          return false;
        }

        if (~~(index / this._itemsPerRow) === ~~((index - 1) / this._itemsPerRow)) {
          this._select(index - 1);
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        var index = this._index;

        if (index === this.items.length - 1) {
          return false;
        }

        if (~~(index / this._itemsPerRow) === ~~((index + 1) / this._itemsPerRow)) {
          this._select(index + 1);
        } else {
          return false;
        }
      }
    }, {
      key: "_select",
      value: function _select(index) {
        if (index < 0 || index > this._items.length - 1) {
          return;
        }

        var rowHasChanged = ~~(index / this._itemsPerRow) !== ~~(this._index / this._itemsPerRow);
        this._index = index;

        for (var i = 0; i < this.tag("Items").children.length; i++) {
          var item = this.tag("Items").children[i];

          if (i < ~~(index / this._itemsPerRow) * this._itemsPerRow) {
            item.setSmooth("alpha", 0, {
              duration: .6
            });
          } else {
            item.setSmooth("alpha", 1, {
              duration: .6
            });
          }
        }

        if (rowHasChanged) {
          this.patch({
            Items: {
              smooth: {
                y: ~~(index / this._itemsPerRow) * this._construct.height * -1 + 380
              }
            }
          });
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "construct",
      set: function set(v) {
        this._construct = v;
      }
    }, {
      key: "container",
      set: function set(v) {
        this._container = v;
      },
      get: function get() {
        return this._container;
      }
    }, {
      key: "items",
      set: function set(v) {
        var _this22 = this;

        var construct = this._construct;
        this._items = v;
        this._itemsPerRow = Grid.ITEMS_PER_ROW[this._construct.name]; //@warn: since we lazy create all the items
        // we need to set the itemWrapper flag to false
        // so it can notify that the first item is created

        ItemWrapper.FIRST_CREATED = false;
        this.tag("Items").patch({
          children: v.map(function (item, index) {
            return {
              type: ItemWrapper,
              construct: _this22._construct,
              index: index,
              item: item,
              x: index % _this22._itemsPerRow * construct.width,
              y: ~~(index / _this22._itemsPerRow) * construct.height,
              transitions: {
                x: {
                  delay: .06 * index,
                  duration: .6
                }
              }
            };
          })
        });
        this._width = construct.width * this._itemsPerRow - 90;
        this.tag("Items").w = construct.width * this._itemsPerRow - 90;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag("Items").children[this._index];
      }
    }, {
      key: "realComponent",
      get: function get() {
        return this.active.child;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Items: {
            forceZIndexContext: true,
            boundsMargin: [300, 520, 100, 300],
            mountX: .5,
            x: 960,
            y: 380,
            transitions: {
              x: {
                duration: .6
              },
              y: {
                duration: .6
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [];
      }
    }]);

    return Grid;
  }(lng.Component);

  Grid.ITEMS_PER_ROW = {
    VideoComponent: 2,
    ArtistComponent: 3,
    ShowComponent: 2,
    PlaylistComponent: 2,
    GenreComponent: 3
  };

  var Videos =
  /*#__PURE__*/
  function () {
    function Videos() {
      _classCallCheck(this, Videos);
    }

    _createClass(Videos, [{
      key: "id",
      set: function set(v) {
        this._id = v;
      },
      get: function get() {
        return this._id;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "total",
      set: function set(v) {
        this._total = v;
      },
      get: function get() {
        return this._total;
      }
    }]);

    return Videos;
  }();

  var Artists =
  /*#__PURE__*/
  function () {
    function Artists() {
      _classCallCheck(this, Artists);
    }

    _createClass(Artists, [{
      key: "id",
      set: function set(v) {
        this._id = v;
      },
      get: function get() {
        return this._id;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "total",
      set: function set(v) {
        this._total = v;
      },
      get: function get() {
        return this._total;
      }
    }]);

    return Artists;
  }();

  var Genres =
  /*#__PURE__*/
  function () {
    function Genres() {
      _classCallCheck(this, Genres);
    }

    _createClass(Genres, [{
      key: "id",
      set: function set(v) {
        this._id = v;
      },
      get: function get() {
        return this._id;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "total",
      set: function set(v) {
        this._total = v;
      },
      get: function get() {
        return this._total;
      }
    }]);

    return Genres;
  }();

  var Shows =
  /*#__PURE__*/
  function () {
    function Shows() {
      _classCallCheck(this, Shows);
    }

    _createClass(Shows, [{
      key: "id",
      set: function set(v) {
        this._id = v;
      },
      get: function get() {
        return this._id;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "total",
      set: function set(v) {
        this._total = v;
      },
      get: function get() {
        return this._total;
      }
    }]);

    return Shows;
  }();

  var Premieres =
  /*#__PURE__*/
  function () {
    function Premieres() {
      _classCallCheck(this, Premieres);
    }

    _createClass(Premieres, [{
      key: "id",
      set: function set(v) {
        this._id = v;
      },
      get: function get() {
        return this._id;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "total",
      set: function set(v) {
        this._total = v;
      },
      get: function get() {
        return this._total;
      }
    }]);

    return Premieres;
  }();

  var Playlists =
  /*#__PURE__*/
  function () {
    function Playlists() {
      _classCallCheck(this, Playlists);
    }

    _createClass(Playlists, [{
      key: "id",
      set: function set(v) {
        this._id = v;
      },
      get: function get() {
        return this._id;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "total",
      set: function set(v) {
        this._total = v;
      },
      get: function get() {
        return this._total;
      }
    }]);

    return Playlists;
  }();

  var Video =
  /*#__PURE__*/
  function () {
    function Video(props) {
      _classCallCheck(this, Video);

      this._description = props.description;
      this._target = props.target;
      this._image = props.thumbnail;
      this._title = props.title;
    }

    _createClass(Video, [{
      key: "description",
      get: function get() {
        if (Array.isArray(this._description)) {
          return this._description[0];
        } else {
          return this._description;
        }
      }
    }, {
      key: "image",
      get: function get() {
        if (Array.isArray(this._image)) {
          return this._image[0];
        } else {
          return this._image;
        }
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return Video;
  }();

  var Artist$1 =
  /*#__PURE__*/
  function () {
    function Artist$1(props) {
      _classCallCheck(this, Artist$1);

      this._target = props.target;
      this._image = props.thumbnail;
      this._title = props.title;
    }

    _createClass(Artist$1, [{
      key: "image",
      get: function get() {
        if (Array.isArray(this._image)) {
          return this._image[0];
        } else {
          return this._image;
        }
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return Artist$1;
  }();

  var Genre =
  /*#__PURE__*/
  function () {
    function Genre() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Genre);

      this._target = props.target;
      this._image = props.thumbnail;
      this._title = props.title;
    }

    _createClass(Genre, [{
      key: "image",
      get: function get() {
        if (Array.isArray(this._image)) {
          return this._image[0];
        } else {
          return this._image;
        }
      }
    }, {
      key: "target",
      set: function set(v) {
        this._target = v;
      },
      get: function get() {
        return this._target;
      }
    }, {
      key: "title",
      set: function set(v) {
        this._title = v;
      },
      get: function get() {
        return this._title;
      }
    }]);

    return Genre;
  }();

  var Show =
  /*#__PURE__*/
  function () {
    function Show(props) {
      _classCallCheck(this, Show);

      this._description = props.description;
      this._target = props.target;
      this._image = props.thumbnail;
      this._title = props.title;
    }

    _createClass(Show, [{
      key: "description",
      get: function get() {
        if (Array.isArray(this._description)) {
          return this._description[0];
        } else {
          return this._description;
        }
      }
    }, {
      key: "image",
      get: function get() {
        if (Array.isArray(this._image)) {
          return this._image[0];
        } else {
          return this._image;
        }
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return Show;
  }();

  var Playlist =
  /*#__PURE__*/
  function () {
    function Playlist(props) {
      _classCallCheck(this, Playlist);

      this._description = props.description;
      this._target = props.target;
      this._image = props.thumbnail;
      this._title = Tools.cleanString(props.title);
    }

    _createClass(Playlist, [{
      key: "description",
      get: function get() {
        if (Array.isArray(this._description)) {
          return this._description[0];
        } else {
          return this._description;
        }
      }
    }, {
      key: "image",
      get: function get() {
        if (Array.isArray(this._image)) {
          return this._image[0];
        } else {
          return this._image;
        }
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return Playlist;
  }();

  var StreamData =
  /*#__PURE__*/
  function () {
    function StreamData(props) {
      _classCallCheck(this, StreamData);

      this._provider = props.provider;
      this._quality = props.quality;
      this._url = props.url;
    }

    _createClass(StreamData, [{
      key: "provider",
      get: function get() {
        return this._provider;
      }
    }, {
      key: "quality",
      get: function get() {
        return this._quality;
      }
    }, {
      key: "url",
      get: function get() {
        return this._url;
      }
    }]);

    return StreamData;
  }();

  var VideoData =
  /*#__PURE__*/
  function () {
    function VideoData(data) {
      _classCallCheck(this, VideoData);

      var id = data.id,
          meta = data.basicMetaV3,
          streams = data.streamsV3;
      this._id = id;
      this._image = meta.thumbnailUrl;
      this._title = meta.title;
      this._duration = meta.duration;
      this._lyricVideo = meta.lyricVideo;
      this._views = data.views && data.views.viewsTotal;
      this._likes = data.likes;

      if (meta.artists && meta.artists.length) {
        var _meta$artists$0$basic = meta.artists[0].basicMeta,
            name = _meta$artists$0$basic.name,
            thumbnailUrl = _meta$artists$0$basic.thumbnailUrl,
            urlSafeName = _meta$artists$0$basic.urlSafeName,
            genres = _meta$artists$0$basic.genres;
        var obj = {
          thumbnail: thumbnailUrl,
          title: name,
          target: urlSafeName
        };
        this._artistObj = new Artist$1(obj); // todo: remove?

        this._artist = name;
        this._genres = genres;
      }

      this._streams = streams.map(function (stream) {
        return new StreamData(stream);
      });
    }

    _createClass(VideoData, [{
      key: "getStreamsByQuality",
      value: function getStreamsByQuality(quality) {
        var streams = this._streams.filter(function (stream) {
          return stream.quality === quality;
        });

        if (streams.length) {
          return streams[0];
        }

        return [];
      }
    }, {
      key: "getStreamsByProvider",
      value: function getStreamsByProvider(provider) {
        var streams = this._streams.filter(function (stream) {
          return stream.provider === provider;
        });

        if (streams.length) {
          return streams[0];
        }

        return [];
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      }
    }, {
      key: "description",
      get: function get() {
        return this._artist;
      }
    }, {
      key: "artist",
      get: function get() {
        return this._artist;
      }
    }, {
      key: "artistObj",
      get: function get() {
        return this._artistObj;
      }
    }, {
      key: "duration",
      get: function get() {
        return this._duration;
      }
    }, {
      key: "lyricVideo",
      get: function get() {
        return this._lyricVideo;
      }
    }, {
      key: "genres",
      get: function get() {
        return this._genres;
      }
    }, {
      key: "likes",
      get: function get() {
        return this._likes;
      }
    }, {
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }, {
      key: "views",
      get: function get() {
        return this._views;
      }
      /**
       * @returns {[StreamData]}
       */

    }, {
      key: "streams",
      get: function get() {
        return this._streams;
      }
    }]);

    return VideoData;
  }();

  var Factory =
  /*#__PURE__*/
  function () {
    function Factory() {
      _classCallCheck(this, Factory);
    }

    _createClass(Factory, null, [{
      key: "create",
      value: function create(data, stage, spreader) {
        if (!Array.isArray(data)) {
          data = [data];
        }

        var spread = _objectSpread({
          y: 0,
          signals: {
            selectItem: true,
            play: true
          }
        }, spreader);

        return data.map(function (obj) {
          if (Array.isArray(obj) && obj.length === 0) {
            return;
          }

          var list = Factory.createList({
            obj: obj,
            stage: stage,
            spread: spread
          });

          if (list) {
            spread.y += list.constructor.height;
            return list;
          } else {
            return;
          }
        }).filter(Boolean);
      }
    }, {
      key: "createList",
      value: function createList(_ref10) {
        var obj = _ref10.obj,
            stage = _ref10.stage,
            _ref10$spread = _ref10.spread,
            spread = _ref10$spread === void 0 ? {} : _ref10$spread;
        var type = obj.constructor;

        if (Factory.WRAPPER.has(type)) {
          var wrapper = Factory.WRAPPER.get(type); // test first item since we only allow items
          // of the same type in a list

          var item = obj.items[0];
          var itemType = item.constructor;

          if (Factory.ITEMS.has(itemType)) {
            var construct = Factory.ITEMS.get(itemType);

            var _item = stage.c(_objectSpread({
              type: wrapper,
              construct: construct,
              container: obj,
              items: obj.items,
              title: obj.title
            }, spread));

            return _item;
          } else {
            throw "Unknown type: " + itemType.name;
          }
        } else {
          throw "Unknown type: " + type.name;
        }

        return;
      }
    }, {
      key: "createHorizontalList",
      value: function createHorizontalList(items, stage) {
        var container = stage.c({
          type: List,
          construct: ShowItem,
          items: items
        });
        return [container];
      }
    }, {
      key: "createGrid",
      value: function createGrid(obj, stage) {
        var items = obj.items;
        var item = items[0];
        var type = item.constructor;

        if (Factory.ITEMS.has(type)) {
          var construct = Factory.ITEMS.get(type);
          var container = stage.c({
            type: Grid,
            container: obj,
            construct: construct,
            items: items
          });
          return [container];
        } else {
          throw "Unknown type: " + type.name;
        }

        return;
      }
    }]);

    return Factory;
  }();

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

  var CarouselItem =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(CarouselItem, _lng$Component13);

    function CarouselItem() {
      _classCallCheck(this, CarouselItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(CarouselItem).apply(this, arguments));
    }

    _createClass(CarouselItem, [{
      key: "getWidth",
      value: function getWidth() {
        return this.tag("Content").finalW;
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this23 = this;

        this._progressAnimation = this.tag("Progress").animation({
          duration: 12,
          stopMethod: "forward",
          actions: [{
            p: 'w',
            rv: 0,
            v: function v(p) {
              return _this23.getWidth() * p;
            }
          }]
        });
        this._zoomAnimation = this.animation({
          duration: 12,
          stopMethod: "reverse",
          stopDuration: 2,
          actions: [{
            t: 'Image',
            p: 'scale',
            rv: 1,
            v: {
              sm: 0.2,
              0: 1,
              1: 1.2
            }
          }]
        });

        this._progressAnimation.on('finish', function () {
          _this23.fireAncestors("$setNext");
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            alpha: [1, {
              duration: .6
            }]
          },
          Box: {
            smooth: {
              y: [900, {
                duration: .6
              }],
              alpha: [1, {
                duration: .6
              }]
            }
          }
        });

        if (this._rotateAnimation) {
          this._rotateAnimation.stop();
        }

        this._zoomAnimation.start();

        this._progressAnimation.start();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var state = this.fireAncestors("$getState");

        this._zoomAnimation.stop();

        if (state === "Carousel") {
          this.patch({
            smooth: {
              alpha: [0, {
                duration: .6
              }]
            },
            Image: {
              smooth: {
                colorBottom: [0xffffffff]
              }
            },
            Box: {
              smooth: {
                y: [930, {
                  duration: .6
                }],
                alpha: [0, {
                  duration: .6
                }]
              }
            }
          });

          if (this._rotateAnimation) {
            this._rotateAnimation.start();
          }
        } else {
          this.patch({
            Image: {
              smooth: {
                colorBottom: [0x00ffffff]
              }
            },
            Box: {
              smooth: {
                y: [870, {
                  duration: .6
                }],
                alpha: [0, {
                  duration: .6
                }]
              }
            }
          });
        }

        this._progressAnimation.stop();
      }
    }, {
      key: "direction",
      set: function set(v) {
        this._direction = v;
        this._rotateAnimation = this.animation({
          duration: .6,
          stopMethod: "reverse",
          stopDuration: .3,
          actions: [{
            t: 'Image',
            p: 'rotation',
            rv: 0,
            v: {
              sm: 0.2,
              0: 0,
              1: {
                v: Math.PI * (this._direction * .03)
              }
            }
          }]
        });
      }
    }, {
      key: "item",
      get: function get() {
        return this._item;
      },
      set: function set(v) {
        this._item = v;
        this.patch({
          Image: {
            src: ux.Ui.getImageUrl("".concat(v.image), {
              width: 1920,
              height: 1080,
              type: 'crop'
            })
          },
          Box: {
            Content: {
              Artist: {
                text: {
                  text: v.description || "No artist available"
                }
              },
              Title: {
                text: {
                  text: v.title.toUpperCase() || "No title available"
                }
              }
            },
            Footer: {
              Metadata: {
                Views: {
                  text: {
                    text: "".concat(Tools.normalizeNumber(v.views))
                  }
                },
                Duration: {
                  text: {
                    text: "".concat(Tools.normalizeDuration(v.duration))
                  }
                }
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          w: 1920,
          h: 1080,
          Image: {
            w: 1920,
            h: 1080
          },
          Box: {
            flex: {
              direction: "column"
            },
            flexItem: {},
            y: 930,
            x: 90,
            mountY: 1,
            zIndex: 2,
            Content: {
              flex: {
                direction: "column"
              },
              rect: true,
              color: 0xff000000,
              Artist: {
                flexItem: {
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 20
                },
                color: 0xffaeafb5,
                text: {
                  fontSize: 38,
                  wordWrapWidth: 1000,
                  maxLines: 1,
                  fontFace: "Italic"
                }
              },
              Title: {
                flexItem: {
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: -7
                },
                text: {
                  fontSize: 64,
                  wordWrapWidth: 1000,
                  lineHeight: 72,
                  fontFace: "Bold"
                }
              }
            },
            Footer: {
              flex: {
                direction: "column"
              },
              Progress: {
                rect: true,
                h: 5
              },
              Metadata: {
                flex: {
                  direction: "row"
                },
                IconDuration: {
                  flexItem: {
                    marginLeft: -8,
                    marginTop: 12
                  },
                  src: App.getPath('images/duration.png')
                },
                Duration: {
                  flexItem: {
                    marginTop: 14,
                    marginLeft: 4
                  },
                  text: {
                    fontSize: 26,
                    fontFace: "Regular"
                  }
                },
                IconViews: {
                  flexItem: {
                    marginLeft: 22,
                    marginTop: 12
                  },
                  src: App.getPath('images/view.png')
                },
                Views: {
                  flexItem: {
                    marginTop: 14,
                    marginLeft: 4
                  },
                  text: {
                    fontSize: 26,
                    fontFace: "Regular"
                  }
                },
                PlayViews: {
                  flexItem: {
                    marginLeft: 30,
                    marginTop: 24
                  },
                  color: 0xff7a7b80,
                  src: App.getPath('images/play.png')
                },
                Play: {
                  flexItem: {
                    marginTop: 14,
                    marginLeft: 14
                  },
                  color: 0xff7a7b80,
                  text: {
                    text: "PRESS \"OK\" TO PLAY",
                    fontSize: 26,
                    fontFace: "Regular"
                  }
                }
              }
            }
          }
        };
      }
    }]);

    return CarouselItem;
  }(lng.Component);

  var Carousel =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(Carousel, _lng$Component14);

    function Carousel() {
      _classCallCheck(this, Carousel);

      return _possibleConstructorReturn(this, _getPrototypeOf(Carousel).apply(this, arguments));
    }

    _createClass(Carousel, [{
      key: "_init",
      value: function _init() {
        this._index = 0;

        this._setState("Carousel");
      }
    }, {
      key: "$setNext",
      value: function $setNext() {
        this.select({
          direction: 1
        });
        this.application.updateFocusPath();
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        this.select({
          direction: -1
        });
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.select({
          direction: 1
        });
      }
    }, {
      key: "handlePlayerNext",
      value: function handlePlayerNext(index) {
        this.select({
          direction: 1,
          forceIndex: index
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$onItemSelect", {
          item: this.active.item,
          items: this._items,
          sourceList: this
        });
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
        this.tag("Items").patch({
          children: v.map(function (item, index) {
            return {
              type: CarouselItem,
              index: index,
              item: item,
              transitions: {
                x: {
                  delay: .06 * index,
                  duration: .6
                }
              }
            };
          })
        });
        this.select({
          direction: 0
        });
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag("Items").children[this._index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Items: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this24) {
          _inherits(Loading, _this24);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "ready",
            value: function ready() {
              this._setState("Carousel");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this25) {
          _inherits(Carousel, _this25);

          function Carousel() {
            _classCallCheck(this, Carousel);

            return _possibleConstructorReturn(this, _getPrototypeOf(Carousel).apply(this, arguments));
          }

          _createClass(Carousel, [{
            key: "select",
            value: function select(_ref11) {
              var direction = _ref11.direction,
                  forceIndex = _ref11.forceIndex;

              if (parseInt(forceIndex) === forceIndex) {
                this._index = forceIndex;
              } else {
                this.active.direction = direction;
                this._index += direction;

                if (this._index > this._items.length - 1) {
                  this._index = 0;
                } else if (this._index < 0) {
                  this._index = this._items.length - 1;
                }
              }

              this.application.updateFocusPath();
            }
          }]);

          return Carousel;
        }(this)];
      }
    }]);

    return Carousel;
  }(lng.Component);

  var NavigationButton =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(NavigationButton, _lng$Component15);

    function NavigationButton() {
      _classCallCheck(this, NavigationButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(NavigationButton).apply(this, arguments));
    }

    _createClass(NavigationButton, [{
      key: "_focus",
      value: function _focus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1.15, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [300, {
                  duration: .6
                }],
                x: [15, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            x: direction === 1 ? 0 : 320,
            smooth: {
              w: [320, {
                duration: .6
              }],
              x: [0, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        var direction = this.fireAncestors("$lastDirection") || 1;
        this.patch({
          Content: {
            Image: {
              smooth: {
                scale: [1, {
                  duration: .6
                }]
              }
            },
            Details: {
              smooth: {
                y: [325, {
                  duration: .6
                }],
                x: [0, {
                  duration: .6
                }]
              }
            }
          },
          Focus: {
            smooth: {
              w: [0, {
                duration: .6
              }],
              x: [direction === 1 ? 320 : 0, {
                duration: .6
              }]
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            rtt: true,
            w: 320,
            h: 320,
            rect: true,
            color: 0xff151515,
            Image: {
              mount: .5,
              x: 160,
              y: 130,
              src: App.getPath('images/search.png')
            },
            Gradient: {
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0xff000000,
              w: 320,
              h: 90,
              y: 230
            },
            Details: {
              y: 325,
              Flex: {
                flex: {
                  direction: "column"
                },
                mountY: 1,
                rect: true,
                color: 0xff000000,
                Title: {
                  flexItem: {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 15
                  },
                  color: 0xffffffff,
                  text: {
                    text: "Search",
                    fontSize: 36,
                    wordWrapWidth: 240,
                    fontFace: "Bold",
                    lineHeight: 44
                  }
                }
              }
            }
          },
          Focus: {
            mountY: 1,
            rect: true,
            y: 320,
            h: 5
          },
          Mirror: {
            y: 320,
            MirrorImage: {
              scaleY: -1,
              colorTop: 0x00ffffff,
              colorBottom: 0x47ffffff
            }
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 410;
      }
    }, {
      key: "height",
      get: function get() {
        return 410;
      }
    }, {
      key: "space",
      get: function get() {
        return 0;
      }
    }]);

    return NavigationButton;
  }(lng.Component);

  var Home =
  /*#__PURE__*/
  function (_Page) {
    _inherits(Home, _Page);

    function Home() {
      _classCallCheck(this, Home);

      return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
    }

    _createClass(Home, [{
      key: "_firstActive",
      value: function _firstActive() {
        this._setState("Carousel");
      }
    }, {
      key: "_init",
      value: function _init() {
        this._index = 0;
        this._lists = this.tag("Lists").children;

        this._setState("Carousel");

        this._focusColor = 0xff444959;
      }
    }, {
      key: "$getState",
      value: function $getState() {
        return this.state;
      }
    }, {
      key: "$changeAmbient",
      value: function $changeAmbient(_ref12) {
        var color = _ref12.color;
        this.patch({
          Overlay: {
            smooth: {
              color: [color, {
                duration: 2
              }]
            }
          }
        });
        this.tag("Carousel").setColor({
          color: color
        });
        this._focusColor = color;
      }
    }, {
      key: "$getFocusColor",
      value: function $getFocusColor() {
        return this._focusColor;
      }
    }, {
      key: "_attachNavigation",
      value: function _attachNavigation(component) {
        var lastList = this.items[this.items.length - 1];
        var list = this.stage.c({
          type: List,
          construct: NavigationButton,
          y: lastList.y + lastList.construct.height + 100,
          title: "Search & Settings"
        });
        list.items = [{
          label: "Search",
          loadPage: "Search"
        }];
        component.add(list);
      }
    }, {
      key: "_onLoad",

      /** Page settings */
      value: function _onLoad(data) {
        this._setState("Loading");

        this.fireAncestors("$collection").reset();
        this.data = data;
      }
    }, {
      key: "_onReload",
      value: function _onReload(data) {
        this.fireAncestors("$collection").reset();
        this.fireAncestors("$loadingReady"); // should be done via a pageRouter hook

        this.fireAncestors("$hook", {
          fn: function fn() {
            this.tag("Search").reset();
          }
        });
      }
    }, {
      key: "_onPageShow",
      value: function _onPageShow() {
        this.setSmooth("alpha", 1);
      }
    }, {
      key: "_onPageHide",
      value: function _onPageHide() {
        this._appReturnState = this.state;
        this.setSmooth("alpha", 0);
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "activeList",
      get: function get() {
        return this.items[this._index];
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Lists").children;
      }
    }, {
      key: "data",
      set: function set(v) {
        var slider = v.slider,
            containers = v.containers;
        this.tag("Carousel").patch({
          items: slider
        });
        this.tag("Lists").patch({
          children: Factory.create(containers, this.stage)
        });

        this._attachNavigation(this.tag("Lists"));

        this._data = v;
      }
    }, {
      key: "store",
      get: function get() {
        return true;
      }
    }, {
      key: "requiresLoading",
      get: function get() {
        return true;
      }
    }, {
      key: "persist",
      get: function get() {
        return this._data;
      }
    }, {
      key: "clearHistory",
      get: function get() {
        return true;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            w: 1920,
            h: 1080,
            color: 0xff000000,
            rect: true
          },
          Content: {
            Carousel: {
              type: Carousel
            },
            Lists: {
              x: 82,
              y: 960,
              alpha: .4,
              transitions: {
                y: {
                  duration: .6
                }
              }
            }
          },
          Overlay: {
            w: 1920,
            h: 1080,
            color: 0xff151515,
            src: App.getPath('images/background.png')
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this26) {
          _inherits(Loading, _this26);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$firstItemCreated",
            value: function $firstItemCreated() {
              this.fireAncestors("$loadingReady");

              this._setState(this._appReturnState || "Carousel");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this27) {
          _inherits(Carousel$$1, _this27);

          function Carousel$$1() {
            _classCallCheck(this, Carousel$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Carousel$$1).apply(this, arguments));
          }

          _createClass(Carousel$$1, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Content: {
                  Carousel: {
                    smooth: {
                      alpha: [1, {
                        duration: .6
                      }],
                      y: [0, {
                        duration: .6
                      }]
                    }
                  },
                  Lists: {
                    smooth: {
                      alpha: [.4, {
                        duration: .6
                      }],
                      y: [960, {
                        duration: .6
                      }]
                    }
                  }
                },
                Overlay: {
                  smooth: {
                    y: [0, {
                      duration: .6
                    }]
                  }
                }
              });
              this.fireAncestors("$logo", {
                x: 82,
                y: 82
              });
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Lists");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Carousel");
            }
          }]);

          return Carousel$$1;
        }(this),
        /*#__PURE__*/
        function (_this28) {
          _inherits(Lists, _this28);

          function Lists() {
            _classCallCheck(this, Lists);

            return _possibleConstructorReturn(this, _getPrototypeOf(Lists).apply(this, arguments));
          }

          _createClass(Lists, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Content: {
                  Carousel: {
                    smooth: {
                      alpha: [.4, {
                        duration: .8
                      }],
                      y: [-200, {
                        duration: .8
                      }]
                    }
                  },
                  Lists: {
                    smooth: {
                      alpha: [1, {
                        duration: .6
                      }],
                      y: [380, {
                        duration: 1
                      }]
                    }
                  }
                },
                Overlay: {
                  smooth: {
                    y: [-200, {
                      duration: .6
                    }]
                  }
                }
              });

              this._animateToSelected(0);

              this.fireAncestors("$logo", {
                x: 82,
                y: 164
              });
            }
          }, {
            key: "_active",
            value: function _active() {
              this.fireAncestors("$logo", {
                x: 82,
                y: 164
              });
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._index > 0) {
                this._animateToSelected(-1);
              } else {
                this._setState("Carousel");
              }
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this._index < this.items.length - 1) {
                this._animateToSelected(1);
              }
            }
          }, {
            key: "_animateToSelected",
            value: function _animateToSelected(offset) {
              var scrollOffset = 0;
              this._index += offset;

              this.items[this._index].setSmooth("alpha", 1, {
                duration: .6
              });

              for (var i = 0, j = this.items.length; i < j; i++) {
                var item = this.items[i];

                if (i < this._index) {
                  item.setSmooth("alpha", 0, {
                    duration: .6
                  });
                  scrollOffset += item.constructor.height;
                } else if (i === this._index) {
                  item.setSmooth("alpha", 1, {
                    duration: .6
                  });
                } else {
                  item.setSmooth("alpha", .4, {
                    duration: .6
                  });
                }
              }

              this.patch({
                Content: {
                  Lists: {
                    smooth: {
                      y: [offset ? scrollOffset * -1 + 380 : 380]
                    }
                  }
                }
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.activeList;
            }
          }]);

          return Lists;
        }(this)];
      }
    }]);

    return Home;
  }(Page);

  var Artist$2 =
  /*#__PURE__*/
  function (_Page2) {
    _inherits(Artist$2, _Page2);

    function Artist$2() {
      _classCallCheck(this, Artist$2);

      return _possibleConstructorReturn(this, _getPrototypeOf(Artist$2).apply(this, arguments));
    }

    _createClass(Artist$2, [{
      key: "_init",
      value: function _init() {
        var _this29 = this;

        this.tag("Background").on("txLoaded", function () {
          _this29.patch({
            Background: {
              smooth: {
                alpha: [.4, {
                  duration: 1.2
                }]
              }
            }
          });
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._genreIndex = 0;
        this.patch({
          List: {
            smooth: {
              y: [320, {
                duration: .8
              }]
            }
          },
          Related: {
            smooth: {
              y: [940, {
                duration: .8
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          List: {
            smooth: {
              y: [430, {
                duration: .8
              }]
            }
          },
          Related: {
            smooth: {
              y: [1050, {
                duration: .8
              }]
            }
          }
        });
      }
    }, {
      key: "_active",
      value: function _active() {
        this.patch({
          Header: {
            smooth: {
              x: [402, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this.patch({
          Header: {
            smooth: {
              x: [374, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_onLoad",
      value: function _onLoad(data) {
        this._setState("Loading");

        this.data = data;
      }
    }, {
      key: "_onReload",
      value: function _onReload(_ref13) {
        var data = _ref13.data;

        this._setState("Loading");

        this.data = data;
      }
    }, {
      key: "_onPageShow",
      value: function _onPageShow() {
        this.fireAncestors("$logo", {
          x: 100,
          y: 164
        });
        this.setSmooth("alpha", 1);
      }
    }, {
      key: "_onPageHide",
      value: function _onPageHide() {
        this.setSmooth("alpha", 0);
      }
    }, {
      key: "data",
      set: function set(v) {
        this._data = v;
        this._hasVideos = false;

        if (v.videos) {
          this.tag("List").children = Factory.createHorizontalList(v.videos, this.stage);
          this._hasVideos = true;
        } else {
          this.tag("List").childList.clear();
        }

        var related = Factory.create(v.relatedArtists, this.stage);
        this.tag("Background").alpha = 0.001;
        this.tag("Background").src = '';
        this.patch({
          Background: {
            src: ux.Ui.getImageUrl("".concat(v.image), {
              width: 1400,
              height: 1080,
              type: 'crop'
            })
          },
          Header: {
            Title: {
              text: {
                text: "".concat(v.name)
              }
            },
            Likes: {
              text: {
                text: "".concat(Tools.normalizeNumber(v.likes))
              }
            }
          },
          Related: {
            children: related
          }
        });

        if (v.genres && v.genres.length) {
          this.tag("GenreItems").children = v.genres.filter(function (item, index) {
            return index < 2;
          }).map(function (item) {
            return {
              type: GenreItem,
              item: item
            };
          });
        }
      }
    }, {
      key: "videos",
      get: function get() {
        return this.tag("List").children;
      }
    }, {
      key: "genreItems",
      get: function get() {
        return this.tag("GenreItems").children;
      }
    }, {
      key: "activeGenre",
      get: function get() {
        return this.genreItems[this._genreIndex];
      }
    }, {
      key: "store",
      get: function get() {
        return true;
      }
    }, {
      key: "storeLast",
      get: function get() {
        return true;
      }
    }, {
      key: "requiresLoading",
      get: function get() {
        return true;
      }
    }, {
      key: "persist",
      get: function get() {
        return {
          data: this._data,
          uniqueId: this._data.urlSafeName
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            x: 520,
            w: 1400,
            h: 1080,
            colorLeft: 0x00ffffff,
            alpha: 0.001
          },
          Overlay: {
            w: 1920,
            h: 1080,
            color: 0xff151515,
            src: App.getPath('images/background.png')
          },
          Header: {
            flex: {
              direction: "row"
            },
            y: 180,
            x: 374,
            zIndex: 4,
            Spacer: {
              flexItem: {
                marginRight: 10
              },
              text: {
                text: "/ ",
                fontSize: 48,
                lineHeight: 54,
                fontFace: "Bold"
              }
            },
            Title: {
              flexItem: {
                marginRight: 20
              },
              text: {
                text: "",
                fontSize: 48,
                wordWrapWidth: 900,
                maxLines: 2,
                lineHeight: 60,
                fontFace: "Regular"
              }
            },
            Icon: {
              flexItem: {
                marginRight: 5,
                marginTop: 19
              },
              color: 0xffaeafb5,
              src: App.getPath('images/likes.png'),
              scale: .6
            },
            Likes: {
              flexItem: {
                marginRight: 5,
                marginTop: 19
              },
              color: 0xffaeafb5,
              text: {
                fontSize: 28,
                fontFace: "Regular"
              }
            }
          },
          Genres: {
            y: 180,
            x: 1800,
            mountX: 1,
            flex: {
              direction: "row"
            },
            GenreItems: {
              flex: {
                direction: "row"
              }
            }
          },
          List: {
            x: 100,
            y: 430
          },
          Related: {
            x: 100,
            y: 1050,
            alpha: .4
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this30) {
          _inherits(Loading, _this30);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$firstItemCreated",
            value: function $firstItemCreated() {
              this.fireAncestors("$loadingReady");

              this._setState(this._hasVideos ? "List" : "Related");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this31) {
          _inherits(List, _this31);

          function List() {
            _classCallCheck(this, List);

            return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
          }

          _createClass(List, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                List: {
                  smooth: {
                    alpha: [1, {
                      duration: .6
                    }],
                    y: [320, {
                      duration: .8
                    }]
                  }
                },
                Related: {
                  smooth: {
                    alpha: [.4, {
                      duration: .6
                    }],
                    y: [940, {
                      duration: .8
                    }]
                  }
                }
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("List").children[0];
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Related");
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Genres");
            }
          }]);

          return List;
        }(this),
        /*#__PURE__*/
        function (_this32) {
          _inherits(Related, _this32);

          function Related() {
            _classCallCheck(this, Related);

            return _possibleConstructorReturn(this, _getPrototypeOf(Related).apply(this, arguments));
          }

          _createClass(Related, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                List: {
                  smooth: {
                    alpha: [0, {
                      duration: .6
                    }],
                    y: [-240, {
                      duration: .8
                    }]
                  }
                },
                Related: {
                  smooth: {
                    alpha: [1, {
                      duration: .6
                    }],
                    y: [380, {
                      duration: .8
                    }]
                  }
                }
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Related").children[0];
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._hasVideos) {
                this._setState("List");
              } else {
                this._setState("Genres");
              }
            }
          }]);

          return Related;
        }(this),
        /*#__PURE__*/
        function (_this33) {
          _inherits(Genres, _this33);

          function Genres() {
            _classCallCheck(this, Genres);

            return _possibleConstructorReturn(this, _getPrototypeOf(Genres).apply(this, arguments));
          }

          _createClass(Genres, [{
            key: "_handleDown",
            value: function _handleDown() {
              if (this._hasVideos) {
                this._setState("List");
              } else {
                this._setState("Related");
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.activeGenre;
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              var index = this._genreIndex;

              if (index > 0) {
                this._select(index - 1);
              }
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              var index = this._genreIndex;

              if (index < this.genreItems.length - 1) {
                this._select(index + 1);
              }
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              var name = this.activeGenre.item.title;
              var matched = this.fireAncestors("$api").getUrlSafeGenre(name);

              if (matched) {
                this.activeGenre.item.target = matched;
                this.fireAncestors("$onItemSelect", {
                  item: this.activeGenre.item
                });
              } else {
                this.fireAncestors("$error", {
                  message: "No contents available for: ".concat(name)
                });
              }
            }
          }, {
            key: "_select",
            value: function _select(index) {
              this._genreIndex = index;
            }
          }]);

          return Genres;
        }(this)];
      }
    }]);

    return Artist$2;
  }(Page);

  var GenreItem =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(GenreItem, _lng$Component16);

    function GenreItem() {
      _classCallCheck(this, GenreItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(GenreItem).apply(this, arguments));
    }

    _createClass(GenreItem, [{
      key: "_focus",
      value: function _focus() {
        this.setSmooth("color", 0xffffffff);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.setSmooth("color", 0xaa8d8c93);
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.text.text = v.title.toUpperCase();
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          color: 0xaa8d8c93,
          text: {
            text: "Rock",
            fontSize: 48,
            fontFace: "Regular"
          },
          flexItem: {
            marginLeft: 60
          }
        };
      }
    }]);

    return GenreItem;
  }(lng.Component); //@todo: one base class and let Home / Genre extend it


  var Genre$1 =
  /*#__PURE__*/
  function (_Page3) {
    _inherits(Genre$1, _Page3);

    function Genre$1() {
      _classCallCheck(this, Genre$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Genre$1).apply(this, arguments));
    }

    _createClass(Genre$1, [{
      key: "_active",
      value: function _active() {
        this.tag("Title").setSmooth("x", 402, {
          duration: .6
        });
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this.tag("Title").setSmooth("x", 374, {
          duration: .6
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this34 = this;

        this._index = 0;
        this._lists = this.tag("Lists").children;
        this.tag("Image").on("txLoaded", function () {
          _this34.patch({
            Background: {
              Image: {
                smooth: {
                  alpha: [.4, {
                    duration: 1.2
                  }]
                }
              }
            }
          });
        });

        this._setState("Loading");
      }
    }, {
      key: "$getState",
      value: function $getState() {
        return this.state;
      }
    }, {
      key: "$changeAmbient",
      value: function $changeAmbient(_ref14) {
        var color = _ref14.color;
        this.patch({
          Overlay: {
            smooth: {
              color: [color, {
                duration: 2
              }]
            }
          }
        });
      }
    }, {
      key: "$genre",
      value: function $genre() {
        return this._data.target;
      }
    }, {
      key: "_onLoad",
      value: function _onLoad(data) {
        this._setState("Loading");

        this.data = data;
      }
    }, {
      key: "_onReload",
      value: function _onReload() {
        this.fireAncestors("$loadingReady");
      }
    }, {
      key: "_onPageShow",
      value: function _onPageShow() {
        this.fireAncestors("$logo", {
          x: 100,
          y: 164,
          duration: 0.3
        });
        this.setSmooth("alpha", 1);
      }
    }, {
      key: "_onPageHide",
      value: function _onPageHide() {
        this.setSmooth("alpha", 0);
      }
    }, {
      key: "data",
      set: function set(v) {
        this._data = v;
        var containers = v.containers,
            image = v.image,
            title = v.title;
        this.tag("Image").alpha = 0.001;
        this.tag("Image").src = '';
        this.patch({
          Background: {
            Image: {
              src: ux.Ui.getImageUrl("".concat(image), {
                width: 1920,
                height: 500,
                type: 'crop'
              })
            },
            Title: {
              text: {
                text: "/ ".concat(title.toUpperCase())
              }
            }
          },
          Content: {
            Lists: {
              children: Factory.create(containers, this.stage)
            }
          }
        });
        this.fireAncestors("$loadingReady");
      }
    }, {
      key: "activeList",
      get: function get() {
        return this.items[this._index];
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Lists").children;
      }
    }, {
      key: "store",
      get: function get() {
        return true;
      }
    }, {
      key: "requiresLoading",
      get: function get() {
        return true;
      }
    }, {
      key: "persist",
      get: function get() {
        return this._data;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xff000000,
          Background: {
            Image: {
              alpha: 0.001,
              colorBottom: 0x00ffffff
            },
            Title: {
              y: 180,
              x: 374,
              zIndex: 4,
              text: {
                text: "",
                fontSize: 48,
                fontFace: "Bold"
              }
            }
          },
          Content: {
            Lists: {
              x: 100,
              y: 480,
              transitions: {
                y: {
                  duration: .6
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
        function (_this35) {
          _inherits(Loading, _this35);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.fireAncestors("$collection").reset();
            }
          }, {
            key: "$exit",
            value: function $exit() {}
          }, {
            key: "$firstItemCreated",
            value: function $firstItemCreated() {
              this._index = 0;

              this._setState("Lists");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this36) {
          _inherits(Lists, _this36);

          function Lists() {
            _classCallCheck(this, Lists);

            return _possibleConstructorReturn(this, _getPrototypeOf(Lists).apply(this, arguments));
          }

          _createClass(Lists, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Content: {
                  Lists: {
                    smooth: {
                      y: [380, {
                        duration: .6
                      }]
                    }
                  }
                }
              });

              this._animateToSelected(0);
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._index > 0) {
                this._animateToSelected(-1);
              } else {
                return false;
              }
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this._index < this.items.length - 1) {
                this._animateToSelected(1);
              }
            }
          }, {
            key: "_animateToSelected",
            value: function _animateToSelected(offset) {
              var scrollOffset = 0;
              this._index += offset;

              this.items[this._index].setSmooth("alpha", 1, {
                duration: .6
              });

              for (var i = 0, j = this.items.length; i < j; i++) {
                var item = this.items[i];

                if (i < this._index) {
                  item.setSmooth("alpha", 0, {
                    duration: .6
                  });
                  scrollOffset += item.constructor.height;
                } else if (i === this._index) {
                  item.setSmooth("alpha", 1, {
                    duration: .6
                  });
                } else {
                  item.setSmooth("alpha", .2, {
                    duration: .6
                  });
                }
              }

              this.patch({
                Content: {
                  Lists: {
                    smooth: {
                      y: [offset ? scrollOffset * -1 + 380 : 380]
                    }
                  }
                }
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.activeList;
            }
          }]);

          return Lists;
        }(this)];
      }
    }]);

    return Genre$1;
  }(Page);

  var Show$1 =
  /*#__PURE__*/
  function (_Page4) {
    _inherits(Show$1, _Page4);

    function Show$1() {
      _classCallCheck(this, Show$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Show$1).apply(this, arguments));
    }

    _createClass(Show$1, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          List: {
            smooth: {
              y: [320, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          List: {
            smooth: {
              y: [430, {
                duration: .6
              }]
            }
          }
        });
      }
    }, {
      key: "_onLoad",
      value: function _onLoad(data) {
        this._setState("Loading");

        this.data = data;
      }
    }, {
      key: "_onReload",
      value: function _onReload(data) {}
    }, {
      key: "_onPageShow",
      value: function _onPageShow() {
        this.setSmooth("alpha", 1);
      }
    }, {
      key: "_onPageHide",
      value: function _onPageHide() {
        this.setSmooth("alpha", 0);
      }
    }, {
      key: "data",
      set: function set(v) {
        this._data = v;
        var container = Factory.createHorizontalList(v.videos, this.stage);
        this.patch({
          Background: {
            src: ux.Ui.getImageUrl("".concat(v.image), {
              width: 1920,
              height: 430,
              type: 'crop'
            })
          },
          Title: {
            text: {
              text: "/ ".concat(v.title)
            }
          },
          List: {
            children: container
          }
        });
      }
    }, {
      key: "store",
      get: function get() {
        return true;
      }
    }, {
      key: "requiresLoading",
      get: function get() {
        return true;
      }
    }, {
      key: "persist",
      get: function get() {
        return this._data;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            w: 1920,
            h: 420,
            colorBottom: 0x00ffffff,
            alpha: .25
          },
          Overlay: {
            w: 1920,
            h: 1080,
            color: 0xff151515,
            src: App.getPath('images/background.png')
          },
          Title: {
            y: 180,
            x: 380,
            zIndex: 2,
            text: {
              text: "",
              fontSize: 48,
              fontFace: "Bold"
            }
          },
          List: {
            x: 100,
            y: 430,
            w: 700,
            h: 1080
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this37) {
          _inherits(Loading, _this37);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$firstItemCreated",
            value: function $firstItemCreated() {
              this.fireAncestors("$loadingReady");

              this._setState("List");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this38) {
          _inherits(List, _this38);

          function List() {
            _classCallCheck(this, List);

            return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
          }

          _createClass(List, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("List").children[0];
            }
          }]);

          return List;
        }(this)];
      }
    }]);

    return Show$1;
  }(Page);

  var RangeSelector =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(RangeSelector, _lng$Component17);

    function RangeSelector() {
      _classCallCheck(this, RangeSelector);

      return _possibleConstructorReturn(this, _getPrototypeOf(RangeSelector).apply(this, arguments));
    }

    _createClass(RangeSelector, [{
      key: "_init",
      value: function _init() {
        this._activeValue = 2;
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        this._decrease();
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this._increase();
      }
    }, {
      key: "update",
      value: function update(_ref15) {
        var current = _ref15.current,
            _ref15$max = _ref15.max,
            max = _ref15$max === void 0 ? this._max : _ref15$max;
        this._value = current;
        this._max = max;
        this.tag("Output").patch({
          Current: {
            text: {
              text: "".concat(current)
            }
          },
          Max: {
            text: {
              text: "/ ".concat(max)
            }
          }
        });
      }
    }, {
      key: "_increase",
      value: function _increase() {
        var next = this._value + 1;

        if (next <= this._max) {
          this.update({
            current: next
          });
        } else {
          this._value = 1;
          this.update({
            current: this._value
          });
        }
      }
    }, {
      key: "_decrease",
      value: function _decrease() {
        var prev = this._value - 1;

        if (prev > 0) {
          this.update({
            current: prev
          });
        } else {
          this._value = this._max;
          this.update({
            current: this._value
          });
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Output: {
            Current: {
              smooth: {
                color: 0xffffffff
              }
            },
            Left: {
              smooth: {
                color: 0xffffffff
              }
            },
            Right: {
              smooth: {
                color: 0xffffffff
              }
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Output: {
            Current: {
              smooth: {
                color: 0xaa8d8c93
              }
            },
            Left: {
              smooth: {
                color: 0xaa8d8c93
              }
            },
            Right: {
              smooth: {
                color: 0xaa8d8c93
              }
            }
          }
        });
        this.update({
          current: this._activeValue
        });
      }
    }, {
      key: "activeValue",
      set: function set(v) {
        this._activeValue = v;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Output: {
            flex: {
              direction: "row"
            },
            mountX: 1,
            Left: {
              flexItem: {
                marginTop: 13
              },
              color: 0xaa8d8c93,
              src: App.getPath("images/arrow-small.png")
            },
            Current: {
              flexItem: {
                marginLeft: 15
              },
              color: 0xaa8d8c93,
              text: {
                text: "",
                textAlign: "center",
                fontSize: 48,
                fontFace: "Regular"
              }
            },
            Max: {
              flexItem: {
                marginLeft: 15,
                marginRight: 15
              },
              color: 0xaa8d8c93,
              text: {
                text: "",
                fontSize: 48,
                fontFace: "Regular"
              }
            },
            Right: {
              flexItem: {
                marginTop: 13
              },
              color: 0xaa8d8c93,
              src: App.getPath("images/arrow-small.png"),
              rotation: Math.PI
            }
          }
        };
      }
    }]);

    return RangeSelector;
  }(lng.Component);

  var Collection =
  /*#__PURE__*/
  function (_Page5) {
    _inherits(Collection, _Page5);

    function Collection() {
      _classCallCheck(this, Collection);

      return _possibleConstructorReturn(this, _getPrototypeOf(Collection).apply(this, arguments));
    }

    _createClass(Collection, [{
      key: "_init",
      value: function _init() {
        this._offset = 20;
      }
    }, {
      key: "_endLoading",
      value: function _endLoading() {
        this._patchContent(true);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._patchContent(false);
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._patchContent(true);
      }
    }, {
      key: "_patchContent",
      value: function _patchContent(v) {
        this.patch({
          Content: {
            smooth: {
              scale: [v ? 1 : .95, {
                duration: .6
              }]
            },
            Title: {
              smooth: {
                x: [v ? 470 : 390, {
                  duration: .6
                }]
              }
            },
            Range: {
              smooth: {
                x: [v ? 1720 : 1770, {
                  duration: .6
                }]
              }
            },
            Arrows: {
              Left: {
                smooth: {
                  x: [v ? 162 : 112, {
                    duration: .6
                  }]
                }
              },
              Right: {
                smooth: {
                  x: [v ? 1758 : 1808, {
                    duration: .6
                  }]
                }
              }
            }
          }
        });
      }
    }, {
      key: "_fetchItemsByOffset",
      value: function _fetchItemsByOffset() {
        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._offset;
        this._offset = offset;
        this.fireAncestors("$allItemForContainer", {
          id: this._container.id,
          offset: this._offset,
          limit: Collection.LIMIT,
          genre: this._genre
        });
        this.fireAncestors("$logo", {
          x: 112,
          y: 176
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this._offset = 20;
      }
    }, {
      key: "_onLoad",
      value: function _onLoad(_ref16) {
        var data = _ref16.data,
            genre = _ref16.genre;

        this._setState("Loading");

        this._genre = genre;
        this.data = data;
      }
    }, {
      key: "_onReload",
      value: function _onReload(_ref17) {
        var data = _ref17.data;

        this._setState("Loading");

        this.data = data;
      }
    }, {
      key: "_onPageShow",
      value: function _onPageShow() {
        this.fireAncestors("$logo", {
          x: 162,
          y: 164
        });
        this.setSmooth("alpha", 1);
      }
    }, {
      key: "_onPageHide",
      value: function _onPageHide() {
        this.setSmooth("alpha", 0);
      }
    }, {
      key: "data",
      set: function set(v) {
        this._data = v;
        this.tag("Content").patch({
          Grid: {
            children: Factory.createGrid(v, this.stage)
          },
          Title: {
            text: {
              text: "/ ".concat(v.title)
            }
          }
        });
        this._container = this.active.container;
        var current = ~~(this._offset / Collection.LIMIT);
        var max = ~~(this._container.total / Collection.LIMIT);

        if (this._container && this._container.total) {
          this.tag("Range").update({
            current: current + 1,
            max: max + 1
          });
        }

        this.tag("Range").activeValue = current + 1;
        this.tag("Arrows").patch({
          Left: {
            smooth: {
              alpha: this._offset === 0 ? 0 : 1
            }
          },
          Right: {
            smooth: {
              alpha: current === max ? 0 : 1
            }
          }
        });
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Grid").children;
      }
    }, {
      key: "active",
      get: function get() {
        return this.items[0];
      }
    }, {
      key: "persist",
      get: function get() {
        return {
          data: this._data
        };
      }
    }, {
      key: "store",
      get: function get() {
        return true;
      }
    }, {
      key: "storeLast",
      get: function get() {
        return true;
      }
    }, {
      key: "requiresLoading",
      get: function get() {
        return true;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 1080,
          rect: true,
          colorTop: 0xff151515,
          colorBottom: 0xff000000,
          Content: {
            w: 1920,
            h: 1080,
            scale: .95,
            Grid: {
              transitions: {
                y: {
                  duration: .6
                }
              }
            },
            Arrows: {
              y: 490,
              mountY: .5,
              w: 1720,
              Left: {
                color: 0xaa8d8c93,
                x: 112,
                src: App.getPath('images/arrow.png')
              },
              Right: {
                color: 0xaa8d8c93,
                x: 1808,
                mountX: 1,
                rotation: Math.PI,
                src: App.getPath('images/arrow.png')
              }
            },
            Title: {
              x: 390,
              y: 180,
              zIndex: 4,
              text: {
                text: "",
                fontSize: 48,
                fontFace: "Regular"
              }
            },
            Range: {
              type: RangeSelector,
              y: 180,
              x: 1800,
              mountX: 1
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this39) {
          _inherits(Loading, _this39);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$firstItemCreated",
            value: function $firstItemCreated() {
              this.fireAncestors("$loadingReady");

              this._setState("Grid");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this40) {
          _inherits(Grid, _this40);

          function Grid() {
            _classCallCheck(this, Grid);

            return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
          }

          _createClass(Grid, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Content: {
                  Arrows: {
                    Left: {
                      smooth: {
                        color: 0xffffffff
                      }
                    },
                    Right: {
                      smooth: {
                        color: 0xffffffff
                      }
                    }
                  }
                }
              });

              this._endLoading();
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              var offset = this._offset;

              if (offset === 0) {
                return;
              }

              offset -= Collection.LIMIT;
              offset = Math.max(offset, 0);

              this._fetchItemsByOffset(offset);
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              var offset = this._offset += Collection.LIMIT;

              this._fetchItemsByOffset(offset);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.active;
            } // gets fired when first list is reached
            // and event bubbles

          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Range");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.fireAncestors("$onItemSelect", {
                item: this.active.realComponent.item,
                items: this.active.items
              });
            }
          }]);

          return Grid;
        }(this),
        /*#__PURE__*/
        function (_this41) {
          _inherits(Range, _this41);

          function Range() {
            _classCallCheck(this, Range);

            return _possibleConstructorReturn(this, _getPrototypeOf(Range).apply(this, arguments));
          }

          _createClass(Range, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Content: {
                  Arrows: {
                    Left: {
                      smooth: {
                        color: 0xaa8d8c93
                      }
                    },
                    Right: {
                      smooth: {
                        color: 0xaa8d8c93
                      }
                    }
                  }
                }
              });
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Grid");
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("Grid");
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {// capture
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              var value = this.tag("Range").value - 1;
              var offset = value * Collection.LIMIT;
              this.tag("Range").activeValue = value + 1;

              this._fetchItemsByOffset(offset);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Range");
            }
          }]);

          return Range;
        }(this)];
      }
    }]);

    return Collection;
  }(Page);

  Collection.LIMIT = 20;

  var Keyboard =
  /*#__PURE__*/
  function (_lng$Component18) {
    _inherits(Keyboard, _lng$Component18);

    function Keyboard() {
      _classCallCheck(this, Keyboard);

      return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard).apply(this, arguments));
    }

    _createClass(Keyboard, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
      }
    }, {
      key: "reset",
      value: function reset() {}
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        var idx = this._index;

        if (idx >= this._columns) {
          this.fire("select", {
            index: this._index - this._columns
          });
        } else {
          this._lastIndex = this._index;
          return false;
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        var next = this._index + this._columns;

        if (next <= this.children.length - 1) {
          this.fire("select", {
            index: next
          });
        } else {
          return false;
        }
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        var pos = this._index % this._columns;

        if (pos > 0) {
          this.fire("select", {
            index: this._index - 1
          });
        } else {
          this.signal("menu", {}, true);
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        var pos = this._index % this._columns;

        if (pos < this._columns - 1 && this._index < this._characters.length - 1) {
          this.fire("select", {
            index: this._index + 1
          });
        } else {
          return false;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$input", {
          char: this.active.label
        });
      }
    }, {
      key: "select",
      value: function select(_ref18) {
        var index = _ref18.index;
        this._index = index;
        this.application.updateFocusPath();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "index",
      set: function set(v) {
        this._index = v;
      },
      get: function get() {
        return this._index;
      }
    }, {
      key: "active",
      get: function get() {
        return this.children[this._index];
      }
    }, {
      key: "characters",
      set: function set(v) {
        var _this42 = this;

        this._characters = v;
        this.children = v.map(function (el, idx) {
          return {
            type: Button,
            x: ~~(idx % _this42._columns) * 70,
            y: ~~(idx / _this42._columns) * 90,
            label: el
          };
        });
      }
    }, {
      key: "columns",
      set: function set(v) {
        this._columns = v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {};
      }
    }]);

    return Keyboard;
  }(lng.Component);

  var Button =
  /*#__PURE__*/
  function (_lng$Component19) {
    _inherits(Button, _lng$Component19);

    function Button() {
      _classCallCheck(this, Button);

      return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
    }

    _createClass(Button, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          color: 0xffffffff,
          Label: {
            color: 0xff000000
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          color: 0x00000000,
          Label: {
            color: this._isNumber ? 0xaa8d8c93 : 0xffffffff
          }
        });
      }
    }, {
      key: "label",
      set: function set(v) {
        this._label = v;
        this._isNumber = !isNaN(v);
        this.patch({
          Label: {
            color: this._isNumber ? 0xaa8d8c93 : 0xffffffff,
            text: {
              text: v
            }
          }
        });
      },
      get: function get() {
        return this._label;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 70,
          h: 90,
          rect: true,
          color: 0x00000000,
          Label: {
            mount: 0.5,
            x: 35,
            y: 45,
            text: {
              text: "",
              fontSize: 36,
              fontFace: "Regular"
            }
          }
        };
      }
    }]);

    return Button;
  }(lng.Component);

  var Actions =
  /*#__PURE__*/
  function (_lng$Component20) {
    _inherits(Actions, _lng$Component20);

    function Actions() {
      _classCallCheck(this, Actions);

      return _possibleConstructorReturn(this, _getPrototypeOf(Actions).apply(this, arguments));
    }

    _createClass(Actions, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._index > 0) {
          this.fire("select", {
            index: this._index - 1
          });
        } else {
          return false;
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._index < this.children.length - 1) {
          this.fire("select", {
            index: this._index + 1
          });
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$action", {
          action: this.active.action
        });
      }
    }, {
      key: "select",
      value: function select(_ref19) {
        var index = _ref19.index;
        this._index = index;
        this.application.updateFocusPath();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "index",
      set: function set(v) {
        this._index = v;
      },
      get: function get() {
        return this._index;
      }
    }, {
      key: "active",
      get: function get() {
        return this.children[this._index];
      }
    }], [{
      key: "_template",
      value: function _template() {
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
    }]);

    return Actions;
  }(lng.Component);

  var Action =
  /*#__PURE__*/
  function (_lng$Component21) {
    _inherits(Action, _lng$Component21);

    function Action() {
      _classCallCheck(this, Action);

      return _possibleConstructorReturn(this, _getPrototypeOf(Action).apply(this, arguments));
    }

    _createClass(Action, [{
      key: "_focus",
      value: function _focus() {
        this.setSmooth("color", 0xffffffff);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.setSmooth("color", 0xaa8d8c93);
      }
    }, {
      key: "width",
      set: function set(v) {
        this.patch({
          Label: {
            x: v / 2
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
      key: "label",
      set: function set(v) {
        this.text.text = v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          color: 0xaa8d8c93,
          text: {
            text: "Rock",
            fontSize: 48,
            fontFace: "Regular"
          },
          flexItem: {
            marginLeft: 60
          }
        };
      }
    }]);

    return Action;
  }(lng.Component);

  var InputField =
  /*#__PURE__*/
  function (_lng$Component22) {
    _inherits(InputField, _lng$Component22);

    function InputField() {
      _classCallCheck(this, InputField);

      return _possibleConstructorReturn(this, _getPrototypeOf(InputField).apply(this, arguments));
    }

    _createClass(InputField, [{
      key: "_init",
      value: function _init() {
        this._query = '';
      }
    }, {
      key: "feed",
      value: function feed(char) {
        this.update({
          query: "".concat(this._query).concat(char)
        });
      }
    }, {
      key: "update",
      value: function update(_ref20) {
        var _ref20$query = _ref20.query,
            query = _ref20$query === void 0 ? this._query : _ref20$query;
        this._query = query;
        var output = query;

        if (output.length > InputField.MAX_VISIBLE_CHARS) {
          var offset = output.length - InputField.MAX_VISIBLE_CHARS;
          output = "...".concat(output.substring(offset, output.length));
        }

        this.patch({
          Divider: {
            text: {
              text: query.length > 0 ? "/ Results for " : "/ Search"
            }
          },
          Label: {
            text: {
              text: query.length > 0 ? "\"".concat(output.toUpperCase(), "\"") : ""
            }
          }
        });
      }
    }, {
      key: "clear",
      value: function clear() {
        this._query = "";
        this.update({});
      }
    }, {
      key: "delete",
      value: function _delete() {
        this.update({
          query: this._query.substring(0, this._query.length - 1)
        });
      }
    }, {
      key: "space",
      value: function space() {
        this.feed(" ");
      }
    }, {
      key: "value",
      get: function get() {
        return this._query;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          flex: {
            direction: "row"
          },
          Divider: {
            flexItem: {},
            color: 0xaa8d8c93,
            text: {
              text: "/ Search",
              fontSize: 48,
              fontFace: "Regular"
            }
          },
          Label: {
            flexItem: {},
            text: {
              text: "",
              fontSize: 48,
              fontFace: "Regular"
            }
          }
        };
      }
    }]);

    return InputField;
  }(lng.Component);

  InputField.MAX_VISIBLE_CHARS = 14;

  var Loader =
  /*#__PURE__*/
  function (_lng$Component23) {
    _inherits(Loader, _lng$Component23);

    function Loader() {
      _classCallCheck(this, Loader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
      key: "_init",
      value: function _init() {
        this._loaderAnimation = this.animation({
          duration: 2,
          repeat: -1,
          actions: [{
            t: 'Loader.White',
            p: 'w',
            rv: 0,
            v: {
              sm: .3,
              0: 0,
              .25: 170,
              .5: 170,
              .75: 0
            }
          }, {
            t: 'Loader.White',
            p: 'x',
            rv: 170,
            v: {
              sm: .3,
              0: 170,
              .25: 0,
              .5: 0,
              .75: 170
            }
          }]
        });
      }
    }, {
      key: "_active",
      value: function _active() {
        this._loaderAnimation.start();
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this._loaderAnimation.stop();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          zIndex: 99,
          Label: {
            y: 340,
            x: 655,
            mount: .5,
            color: 0xaa8d8c93,
            text: {
              text: "Searching",
              fontSize: 42,
              fontFace: "Regular"
            }
          },
          Loader: {
            w: 170,
            h: 5,
            mount: .5,
            x: 655,
            y: 375,
            White: {
              clipping: true,
              h: 5,
              w: 0,
              mountX: 0,
              Background: {
                w: 170,
                h: 5,
                rect: true,
                color: 0xaa8d8c93
              }
            }
          }
        };
      }
    }]);

    return Loader;
  }(lng.Component);

  var Search =
  /*#__PURE__*/
  function (_Page6) {
    _inherits(Search, _Page6);

    function Search() {
      _classCallCheck(this, Search);

      return _possibleConstructorReturn(this, _getPrototypeOf(Search).apply(this, arguments));
    }

    _createClass(Search, [{
      key: "_init",
      value: function _init() {
        this._index = 0;

        this._setState("Keyboard.Letters");
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._searchQueue = 0;

        this._patchContent(true);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._patchContent(false);
      }
    }, {
      key: "_patchContent",
      value: function _patchContent(v) {
        this.patch({
          Content: {
            smooth: {
              scale: [v ? 1 : .95, {
                duration: .6
              }]
            },
            Query: {
              smooth: {
                x: [v ? 470 : 390, {
                  duration: .6
                }]
              }
            }
          }
        });
      }
    }, {
      key: "$input",
      value: function $input(_ref21) {
        var _this43 = this;

        var char = _ref21.char;
        this.tag("Query").feed(char);
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () {
          _this43._search();
        }, 500);
      }
    }, {
      key: "$action",
      value: function $action(_ref22) {
        var action = _ref22.action;
        this.tag("Query")[action]();

        this._search();
      }
    }, {
      key: "_search",
      value: function _search() {
        var _this44 = this;

        var query = this.tag("Query").value;

        if (!this._isValidSearchQuery(query)) {
          this._flagSearchInvalid();

          return;
        }

        this._prepareNewSearchRound();

        this.fireAncestors("$api").search(query).then(function (results) {
          _this44._searchQueue -= 1; // we only want to output the result from the last
          // search query, so we only output results
          // if the last queued results are resolved

          if (_this44._searchQueue > 0) {
            return;
          }

          if (!_this44._invalidSearch) {
            _this44._outputResults(results);
          }
        });
      }
    }, {
      key: "_isValidSearchQuery",
      value: function _isValidSearchQuery(query) {
        return query.length > 0 && !/^\s{1,}/ig.test(query);
      }
    }, {
      key: "_flagSearchInvalid",
      value: function _flagSearchInvalid() {
        this._invalidSearch = true;

        this._toggle(Search.VISIBILITY.PLACEHOLDER);

        this.tag("Results").childList.clear();
      }
    }, {
      key: "_prepareNewSearchRound",
      value: function _prepareNewSearchRound() {
        // increase queue so we only output
        // results when the queue is empty
        this._searchQueue += 1;
        this._index = 0; // flag current as valid search

        this._invalidSearch = false;

        this._toggle(Search.VISIBILITY.LOADER);
      }
    }, {
      key: "_outputResults",
      value: function _outputResults(results) {
        if (!results.length) {
          this._toggle(Search.VISIBILITY.NORESULTS);

          return;
        }

        this.tag("Results").patch({
          y: 360,
          children: Factory.create(results, this.stage, {
            parentWidth: 1500
          })
        });

        this._toggle(Search.VISIBILITY.RESULTS);
      }
    }, {
      key: "_toggle",
      value: function _toggle(value) {
        this.patch({
          Content: {
            Results: {
              smooth: {
                alpha: Search.VISIBILITY.RESULTS & value
              }
            },
            Loader: {
              smooth: {
                alpha: Search.VISIBILITY.LOADER & value
              }
            },
            Placeholder: {
              smooth: {
                alpha: Search.VISIBILITY.PLACEHOLDER & value
              }
            },
            NoResults: {
              smooth: {
                alpha: Search.VISIBILITY.NORESULTS & value
              }
            }
          }
        });
      }
    }, {
      key: "_animateToSelected",
      value: function _animateToSelected(offset) {
        var scrollOffset = 0;
        this._index += offset;

        this.items[this._index].setSmooth("alpha", 1, {
          duration: .6
        });

        for (var i = 0, j = this.items.length; i < j; i++) {
          var item = this.items[i];

          if (i < this._index) {
            item.setSmooth("alpha", 0, {
              duration: .6
            });
            scrollOffset += item.constructor.height;
          } else if (i === this._index) {
            item.setSmooth("alpha", 1, {
              duration: .6
            });
          } else {
            item.setSmooth("alpha", .4, {
              duration: .6
            });
          }
        }

        this.patch({
          Content: {
            Results: {
              smooth: {
                y: [offset ? scrollOffset * -1 + 360 : 360]
              }
            }
          }
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.tag("Results").childList.clear();
        this.tag("Query").clear();
        this.tag("Letters").index = 0;

        this._setState("Keyboard.Letters");

        this._index = 0;
      }
    }, {
      key: "_onReload",
      value: function _onReload(data) {
        this.data = data;
      }
    }, {
      key: "_onPageShow",
      value: function _onPageShow() {
        this.fireAncestors("$logo", {
          x: 162,
          y: 164
        });
        this.setSmooth("alpha", 1);
      }
    }, {
      key: "_onPageHide",
      value: function _onPageHide() {
        this.setSmooth("alpha", 0);
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Results").children;
      }
    }, {
      key: "active",
      get: function get() {
        return this.items[0];
      }
    }, {
      key: "store",
      get: function get() {
        return true;
      }
    }, {
      key: "requiresLoading",
      get: function get() {
        return true;
      }
    }, {
      key: "persist",
      get: function get() {
        return this._data;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 1080,
          rect: true,
          colorTop: 0xff151515,
          colorBottom: 0xff000000,
          Content: {
            w: 1920,
            h: 1080,
            Results: {
              x: 680,
              y: 360,
              transitions: {
                y: {
                  duration: .6
                }
              },
              alpha: 0
            },
            Loader: {
              type: Loader,
              zIndex: 99,
              x: 610,
              y: 290,
              alpha: 0
            },
            Query: {
              zIndex: 5,
              x: 390,
              y: 180,
              type: InputField
            },
            Placeholder: {
              y: 630,
              x: 1265,
              mount: .5,
              color: 0xaa8d8c93,
              text: {
                text: "(Your search results will appear here)",
                fontSize: 42,
                fontFace: "Regular"
              }
            },
            NoResults: {
              y: 630,
              alpha: 0,
              x: 1265,
              mount: .5,
              color: 0xaa8d8c93,
              text: {
                text: "No results",
                fontSize: 42,
                fontFace: "Regular"
              }
            },
            Actions: {
              type: Actions,
              flex: {
                direction: "row"
              },
              mountX: 1,
              x: 1758,
              y: 180
            },
            Search: {
              zIndex: 4,
              rect: true,
              w: 680,
              h: 1080,
              colorTop: 0xff151515,
              colorBottom: 0xff000000,
              Keyboard: {
                x: 162,
                y: 340,
                Letters: {
                  type: Keyboard,
                  columns: 6,
                  characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
                },
                Space: {
                  y: 540,
                  color: 0x00ffffff,
                  x: 100,
                  texture: lng.Tools.getRoundRect(220, 90, 0, 0, 0x00ffffff, true, 0xffffffff),
                  Label: {
                    mount: 0.5,
                    x: 110,
                    y: 47,
                    text: {
                      text: "SPACE",
                      fontSize: 32,
                      fontFace: "Regular"
                    }
                  }
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
        function (_this45) {
          _inherits(Keyboard$$1, _this45);

          function Keyboard$$1() {
            _classCallCheck(this, Keyboard$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard$$1).apply(this, arguments));
          }

          _createClass(Keyboard$$1, null, [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this46) {
                _inherits(Actions$$1, _this46);

                function Actions$$1() {
                  _classCallCheck(this, Actions$$1);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Actions$$1).apply(this, arguments));
                }

                _createClass(Actions$$1, [{
                  key: "_getFocused",
                  value: function _getFocused() {
                    return this.tag("Actions");
                  }
                }, {
                  key: "_handleLeft",
                  value: function _handleLeft() {
                    this._setState("Keyboard.Letters");
                  }
                }, {
                  key: "_handleDown",
                  value: function _handleDown() {
                    if (this.tag("Results").children.length > 0) {
                      this._setState("Results");
                    } else {
                      this._setState("Keyboard.Letters");
                    }
                  }
                }]);

                return Actions$$1;
              }(this),
              /*#__PURE__*/
              function (_this47) {
                _inherits(Letters, _this47);

                function Letters() {
                  _classCallCheck(this, Letters);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Letters).apply(this, arguments));
                }

                _createClass(Letters, [{
                  key: "_getFocused",
                  value: function _getFocused() {
                    return this.tag("Keyboard.Letters");
                  }
                }, {
                  key: "_handleUp",
                  value: function _handleUp() {
                    this._setState("Keyboard.Actions");
                  }
                }, {
                  key: "_handleRight",
                  value: function _handleRight() {
                    if (this.tag("Results").children.length > 0) {
                      this._setState("Results");
                    }
                  }
                }, {
                  key: "_handleDown",
                  value: function _handleDown() {
                    this._setState("Keyboard.Space");
                  }
                }]);

                return Letters;
              }(this),
              /*#__PURE__*/
              function (_this48) {
                _inherits(Space, _this48);

                function Space() {
                  _classCallCheck(this, Space);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Space).apply(this, arguments));
                }

                _createClass(Space, [{
                  key: "$enter",
                  value: function $enter() {
                    this.tag("Space").patch({
                      color: 0xffffffff,
                      Label: {
                        color: 0xff000000
                      }
                    });
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("Space").patch({
                      color: 0x00000000,
                      Label: {
                        color: 0xffffffff
                      }
                    });
                  }
                }, {
                  key: "_handleUp",
                  value: function _handleUp() {
                    this._setState("Keyboard.Letters");
                  }
                }, {
                  key: "_handleRight",
                  value: function _handleRight() {
                    if (this.tag("Results").children.length > 0) {
                      this._setState("Results");
                    }
                  }
                }, {
                  key: "_handleEnter",
                  value: function _handleEnter() {
                    this.$action({
                      action: "space"
                    });
                  }
                }]);

                return Space;
              }(this)];
            }
          }]);

          return Keyboard$$1;
        }(this),
        /*#__PURE__*/
        function (_this49) {
          _inherits(Results, _this49);

          function Results() {
            _classCallCheck(this, Results);

            return _possibleConstructorReturn(this, _getPrototypeOf(Results).apply(this, arguments));
          }

          _createClass(Results, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Results").children[this._index];
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this._setState("Keyboard.Letters");
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._index > 0) {
                this._animateToSelected(-1);
              } else {
                this._setState("Keyboard.Actions");
              }
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this._index < this.items.length - 1) {
                this._animateToSelected(1);
              }
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.fireAncestors("$onItemSelect", {
                item: this.active.realComponent.item
              });
            }
          }]);

          return Results;
        }(this)];
      }
    }]);

    return Search;
  }(Page);

  Search.VISIBILITY = {
    RESULTS: 1,
    LOADER: 2,
    PLACEHOLDER: 4,
    NORESULTS: 8
  };

  var ArtistData =
  /*#__PURE__*/
  function () {
    function ArtistData(data) {
      _classCallCheck(this, ArtistData);

      var likes = data.likes,
          meta = data.basicMeta,
          videos = data.videoData.videos,
          relatedArtists = data.relatedArtists;
      this._image = meta.thumbnailUrl;
      this._onTour = meta.onTour;
      this._name = meta.name;
      this._likes = likes;
      this._urlSafeName = meta.urlSafeName;

      if (meta.bio) {
        this._info = meta.bio.text;
        this._source = meta.bio.source;
        this._birthCity = meta.bio._birthCity;
        this._birthName = meta.bio.birthName;
        this._dateOfBirth = meta.bio.dateOfBirth;
      }

      if (videos && videos.data && videos.data.length) {
        this._videos = videos.data.map(function (video) {
          return new VideoData(video);
        });
      }

      if (relatedArtists && relatedArtists.length) {
        var items = relatedArtists.map(function (artist) {
          var obj = {
            thumbnail: artist.thumbnailUrl,
            title: artist.name,
            target: artist.urlSafeName
          };
          return new Artist$1(obj);
        });
        var container = new Artists();
        container.title = "RELATED ARTISTS";
        container.items = items;
        this._relatedArtists = container;
      }

      if (meta.genres && meta.genres.length) {
        this._genres = meta.genres.map(function (label) {
          var item = new Genre();
          item.title = label;
          return item;
        });
      }
    }

    _createClass(ArtistData, [{
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "onTour",
      get: function get() {
        return this._onTour;
      }
    }, {
      key: "genres",
      get: function get() {
        return this._genres;
      }
    }, {
      key: "info",
      get: function get() {
        return this._info;
      }
    }, {
      key: "likes",
      get: function get() {
        return this._likes;
      }
    }, {
      key: "relatedArtists",
      get: function get() {
        return this._relatedArtists;
      }
    }, {
      key: "source",
      get: function get() {
        return this._source;
      }
    }, {
      key: "birthCity",
      get: function get() {
        return this._birthCity;
      }
    }, {
      key: "birthName",
      get: function get() {
        return this._birthName;
      }
    }, {
      key: "dateOfBirth",
      get: function get() {
        return this._dateOfBirth;
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      }
    }, {
      key: "videos",
      get: function get() {
        return this._videos;
      }
    }, {
      key: "urlSafeName",
      get: function get() {
        return this._urlSafeName;
      }
    }]);

    return ArtistData;
  }();

  var GenreData =
  /*#__PURE__*/
  function () {
    function GenreData(containers, _source) {
      _classCallCheck(this, GenreData);

      this._containers = containers;

      if (_source) {
        this._image = _source.image;
        this._title = _source.title;
        this._target = _source.target;
      }
    }

    _createClass(GenreData, [{
      key: "containers",
      get: function get() {
        return this._containers;
      }
    }, {
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }]);

    return GenreData;
  }();

  var ShowData =
  /*#__PURE__*/
  function () {
    function ShowData(data) {
      _classCallCheck(this, ShowData);

      var meta = data.basicMeta,
          _data$videos$items = data.videos.items,
          items = _data$videos$items === void 0 ? [] : _data$videos$items;
      this._description = meta.description;
      this._image = meta.image_url;
      this._title = meta.title;

      if (items && items.length) {
        this._videos = items.map(function (_ref23) {
          var videoData = _ref23.videoData;
          return new VideoData(videoData);
        });
      }
    }

    _createClass(ShowData, [{
      key: "videos",
      get: function get() {
        return this._videos;
      }
    }, {
      key: "description",
      get: function get() {
        return this._description;
      }
    }, {
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return ShowData;
  }();

  var PlaylistData =
  /*#__PURE__*/
  function () {
    function PlaylistData(data) {
      _classCallCheck(this, PlaylistData);

      var meta = data.basicMeta,
          _data$videos$items2 = data.videos.items,
          items = _data$videos$items2 === void 0 ? [] : _data$videos$items2;
      this._description = meta.description;
      this._image = meta.image_url;
      this._title = meta.title;

      if (items && items.length) {
        this._videos = items.map(function (_ref24) {
          var videoData = _ref24.videoData;
          return new VideoData(videoData);
        });
      }
    }

    _createClass(PlaylistData, [{
      key: "videos",
      get: function get() {
        return this._videos;
      }
    }, {
      key: "description",
      get: function get() {
        return this._description;
      }
    }, {
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return PlaylistData;
  }();

  var AppContents =
  /*#__PURE__*/
  function (_PageRouter) {
    _inherits(AppContents, _PageRouter);

    function AppContents() {
      _classCallCheck(this, AppContents);

      return _possibleConstructorReturn(this, _getPrototypeOf(AppContents).apply(this, arguments));
    }

    _createClass(AppContents, [{
      key: "syncHomeData",

      /**
       * @param data
       */
      value: function syncHomeData(data) {
        this.tag("Home")._onLoad(data);
      }
      /**
       * Routing
       * @param item
       * @param items
       */

    }, {
      key: "$onItemSelect",
      value: function $onItemSelect(_ref25) {
        var _this50 = this;

        var item = _ref25.item,
            items = _ref25.items,
            sourceList = _ref25.sourceList;
        var api = this.fireAncestors("$api");
        var itemConstructor = item.constructor;

        if (item.hasOwnProperty("loadPage")) {
          this.$loadPage({
            ref: item.loadPage
          });
        } else if (itemConstructor === AppContents.VIDEO) {
          this.fireAncestors("$play", {
            item: item,
            items: items,
            sourceList: sourceList
          });
        } else {
          api.fetchDetails(item).then(function (response) {
            var constructor = response.constructor;

            switch (constructor) {
              case AppContents.ARTIST:
                _this50.fireAncestors("$loadPage", {
                  ref: "Artist",
                  data: response
                });

                break;

              case AppContents.GENRE:
                _this50.fireAncestors("$loadPage", {
                  ref: "Genre",
                  data: response
                });

                break;

              case AppContents.SHOW:
                _this50.fireAncestors("$loadPage", {
                  ref: "Show",
                  data: response
                });

                break;

              case AppContents.PLAYLIST:
                var videos = response.videos;

                _this50.fireAncestors("$loadingReady");

                _this50.fireAncestors("$play", {
                  item: videos[0],
                  items: videos
                });

                break;
            }
          });
          this.fireAncestors("$loading");
        }
      }
    }, {
      key: "$allItemForContainer",
      value: function $allItemForContainer(_ref26) {
        var _this51 = this;

        var id = _ref26.id,
            offset = _ref26.offset,
            limit = _ref26.limit,
            genre = _ref26.genre;
        var api = this.fireAncestors("$api");
        api.fetchCollectionOffset({
          id: id,
          offset: offset,
          limit: limit,
          genre: genre
        }).then(function (response) {
          _this51.fireAncestors("$loadPage", {
            ref: "Collection",
            data: {
              data: response,
              genre: genre
            }
          });
        });
        this.fireAncestors("$loading");
      }
    }, {
      key: "$hook",
      value: function $hook(_ref27) {
        var fn = _ref27.fn;
        return fn.call(this);
      }
    }, {
      key: "$collection",
      value: function $collection() {
        return this.tag("Collection");
      }
    }, {
      key: "default",
      get: function get() {
        return "Home";
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Home: {
            type: Home
          },
          Artist: {
            type: Artist$2,
            alpha: 0
          },
          Genre: {
            type: Genre$1,
            alpha: 0
          },
          Show: {
            type: Show$1,
            alpha: 0
          },
          Collection: {
            type: Collection,
            alpha: 0
          },
          Search: {
            type: Search,
            alpha: 0
          }
        };
      }
    }]);

    return AppContents;
  }(PageRouter);

  AppContents.VIDEO = VideoData;
  AppContents.ARTIST = ArtistData;
  AppContents.GENRE = GenreData;
  AppContents.SHOW = ShowData;
  AppContents.PLAYLIST = PlaylistData;

  var GraphQL =
  /*#__PURE__*/
  function () {
    function GraphQL() {
      _classCallCheck(this, GraphQL);

      throw new Error("Don't instatiate GraphQL class");
    }

    _createClass(GraphQL, null, [{
      key: "create",
      value: function create(type, args) {
        if (GraphQL["_".concat(type)]) {
          return GraphQL["_".concat(type)](args);
        }
      }
    }, {
      key: "_home",
      value: function _home() {
        return "{\n            homePage {\n                containers {\n                    title\n                    id \n                }\n            } \n        }";
      }
    }, {
      key: "_videoContainerById",
      value: function _videoContainerById(_ref28) {
        var id = _ref28.id;
        return "{\n            homePage {\n                container(id: \"".concat(id, "\") {\n                    title\n                    id\n                    serviceName\n                    pagedItems {\n                        total\n                        items {\n                            title\n                            target\n                            thumbnail\n                            type\n                            description\n                        }\n                    }\n                }\n            }\n        }");
      }
    }, {
      key: "_videoById",
      value: function _videoById(_ref29) {
        var id = _ref29.id;

        // ql can accept an array of id's
        // we need to stringify the list
        if (Array.isArray(id)) {
          var list = id.map(function (i) {
            return "\"".concat(i, "\"");
          });
          id = list.join(",");
        } else {
          id = "\"".concat(id, "\"");
        }

        return "{            \n            videos(ids:[".concat(id, "]){\n                data {\n                    likes\n                    basicMetaV3{                 \n                        title\n                        lyricVideo\n                        thumbnailUrl\n                        explicit\n                        startDate\n                        duration\n                        artists{\n                            basicMeta{\n                                name\n                                genres\n                                thumbnailUrl\n                                urlSafeName\n                            }\n                        }\n                    }   \n                    streamsV3{\n                        provider\n                        url\n                        quality\n                    }             \n                    views{\n                        viewsTotal\n                    }  \n                }\n            }\n        }");
      }
    }, {
      key: "_artistByName",
      value: function _artistByName(_ref30) {
        var id = _ref30.id;
        return "{\n            artists(ids: [\"".concat(id, "\"]) {\n                likes\n                relatedArtists{\n                    name\n                    thumbnailUrl\n                    urlSafeName\n                }\n                basicMeta {\n                    name\n                    genres\n                    thumbnailUrl\n                    urlSafeName\n                    onTour\n                        views{\n                            isrc\n                            viewsLast30Days\n                            viewsLast7Days\n                            viewsTotal\n                            viewsCountry\n                        }\n                        bio {\n                            text\n                            source\n                            birthCity\n                            birthName\n                            origin\n                            dateOfBirth\n                        }\n                    }\n                    videoData {\n                        videos {\n                            data {\n                                id\n                                basicMetaV3 {\n                                    title                        \n                                    thumbnailUrl\n                                    duration\n                                    artists{\n                                      basicMeta{\n                                        name\n                                        genres\n                                        name\n                                        thumbnailUrl\n                                        urlSafeName\n                                      }\n                                    }                                           \n                                }\n                                streamsV3 {\n                                    provider\n                                    url\n                                    quality   \n                                }\n                                views{\n                                    viewsTotal\n                                } \n                            }\n                    }\n                }\n            }\n        }");
      }
    }, {
      key: "_playlistById",
      value: function _playlistById(_ref31) {
        var id = _ref31.id;
        return "{ \n            playlists(ids:[\"".concat(id, "\"]) {         \n                basicMeta {\n                    title\n                    description      \n                    image_url \n                }                   \n                videos {\n                    items{\n                        videoData   {                    \n                            id\n                            likes\n                            streamsV3 {\n                                provider\n                                url\n                                quality                           \n                            }\n                            basicMetaV3 {\n                                title  \n                                copyright\n                                thumbnailUrl\n                                duration  \n                                artists{\n                                    basicMeta{\n                                        name\n                                        genres\n                                        name\n                                        thumbnailUrl\n                                        urlSafeName\n                                    }\n                                }                              \n                            } \n                            views{\n                                viewsTotal\n                            }       \n                        }\n                        isrc    \n                    }\n                }    \n            }            \n        }");
      }
    }, {
      key: "_genreByName",
      value: function _genreByName(_ref32) {
        var id = _ref32.id,
            _ref32$offset = _ref32.offset,
            offset = _ref32$offset === void 0 ? 0 : _ref32$offset,
            _ref32$limit = _ref32.limit,
            limit = _ref32$limit === void 0 ? 20 : _ref32$limit;
        return "{\n            genreHome(genre : \"".concat(id, "\") {  \n                containers {\n                id\n                title\n                serviceName\n                    pagedItems(offset: ").concat(offset, ", limit: ").concat(limit, ") {\n                        items {\n                            title\n                            target\n                            thumbnail\n                            type\n                            description\n                        }\n                        total\n                    }\n                }\n            }\n        }");
      }
    }, {
      key: "_pagedItemsByGenreAndContainer",
      value: function _pagedItemsByGenreAndContainer(_ref33) {
        var id = _ref33.id,
            genre = _ref33.genre,
            offset = _ref33.offset,
            limit = _ref33.limit;
        return "{\n            genreHome(genre: \"".concat(genre, "\") {\n                container(id: \"").concat(id, "\") { \n                    id\n                    title\n                    serviceName\n                    pagedItems(offset: ").concat(offset, ", limit: ").concat(limit, ") { \n                        items {\n                            title\n                            target\n                            thumbnail\n                            type\n                            description\n                        } \n                        total \n                    }\n                } \n            }\n        }");
      }
    }, {
      key: "_pagedItemsByContainerId",
      value: function _pagedItemsByContainerId(_ref34) {
        var id = _ref34.id,
            offset = _ref34.offset,
            limit = _ref34.limit;
        return "{\n            homePage {\n                container(id: \"".concat(id, "\") {\n                    title\n                    id\n                    serviceName\n                    description\n                    pagedItems(offset: ").concat(offset, ", limit: ").concat(limit, ") {\n                        items { \n                            title\n                            target\n                            thumbnail\n                            type\n                            description\n                        }\n                        total \n                    }\n                }   \n            }\n        }");
      }
    }, {
      key: "_searchVideos",
      value: function _searchVideos(_ref35) {
        var query = _ref35.query;
        return "{\n            search {\n                videos(search:\"".concat(query, "\", limit:50) {\n                    items {\n                        id\n                      \tlikes\n                        basicMetaV3{                 \n                            title\n                            lyricVideo\n                            thumbnailUrl\n                            explicit\n                            startDate\n                            duration\n                            artists{\n                                basicMeta{\n                                    name\n                                    genres\n                                    thumbnailUrl\n                                    urlSafeName\n                                }\n                            }\n                        }   \n                        streamsV3{\n                            provider\n                            url\n                            quality\n                        }             \n                        views{\n                            viewsTotal\n                        }\n                    }\n                }\n            }\n        }");
      }
    }, {
      key: "_searchArtists",
      value: function _searchArtists(_ref36) {
        var query = _ref36.query;
        return "{\n            search {\n                artists(search:\"".concat(query, "\", limit: 50) {\n                    items {\n                        basicMeta {\n                            name\n                            thumbnailUrl\n                            urlSafeName\n                        }\n                    }\n                }\n            }\n        }");
      }
    }]);

    return GraphQL;
  }();

  var Factory$1 =
  /*#__PURE__*/
  function () {
    function Factory$1(api) {
      _classCallCheck(this, Factory$1);

      this._api = api;
    }

    _createClass(Factory$1, [{
      key: "create",
      value: function create(type, props) {
        if (typeof type !== "string") {
          if (Factory$1.LISTTYPE.has(type)) {
            type = Factory$1.LISTTYPE.get(type).fn;
          }
        }

        type = Factory$1._ucfirst(type);

        if (this["create".concat(type)]) {
          return this["create".concat(type)](props);
        }

        return;
      }
    }, {
      key: "createContainer",
      value: function createContainer(_ref37) {
        var title = _ref37.title,
            service = _ref37.serviceName,
            id = _ref37.id,
            _ref37$pagedItems = _ref37.pagedItems,
            assets = _ref37$pagedItems.items,
            total = _ref37$pagedItems.total;

        if (!assets || !assets.length) {
          // reject?
          return Promise.resolve([]);
        }

        if (Factory$1.VIDEO_WRAPPER[service]) {
          return this._createVideoDataContainer(title, assets, id, total);
        } else if (Factory$1.LIST_WRAPPER.hasOwnProperty(service)) {
          var container = new Factory$1.LIST_WRAPPER[service]();
          container.title = title;
          container.id = id;
          container.total = total;
          container.items = assets.map(function (asset) {
            if (service === "shows") {
              var construct = Factory$1.BUILD_TYPES.get("show");
              return new construct(asset);
            } else if (Factory$1.BUILD_TYPES.has(asset.type)) {
              var _construct2 = Factory$1.BUILD_TYPES.get(asset.type);

              return new _construct2(asset);
            }
          }).filter(Boolean);
          return Promise.resolve(container);
        } else {
          return Promise.resolve([]);
        }
      }
    }, {
      key: "_createVideoDataContainer",
      value: function _createVideoDataContainer(title, assets, id, total) {
        var list = assets.map(function (asset) {
          return asset.target;
        });
        return this._api.query(GraphQL.create("videoById", {
          id: list
        })).then(function (response) {
          var videos = Tools.getPropertyByPath(response, "data.videos.data");
          var construct = Factory$1.BUILD_TYPES.get("videos");
          var container = new construct();
          container.title = title;
          container.id = id;
          container.total = total;
          container.items = videos.map(function (video) {
            if (!video.basicMetaV3) {
              return;
            }

            return new VideoData(video);
          }).filter(Boolean);
          return container;
        });
      }
    }, {
      key: "createArtist",
      value: function createArtist(data) {
        var artists = data.artists;

        if (artists && artists.length) {
          return new ArtistData(artists[0]);
        } else {
          throw new Error("Unable to create ArtistData");
        }
      }
    }, {
      key: "createVideo",
      value: function createVideo(_ref38) {
        var videos = _ref38.videos;
        var data = videos.data;
        var output = data.map(function (video) {
          return new VideoData(video);
        });

        if (output.length) {
          return output.pop();
        }
      }
    }, {
      key: "createGenre",
      value: function createGenre(_ref39) {
        var _this52 = this;

        var genreHome = _ref39.genreHome,
            _source = _ref39._source;
        var _genreHome$containers = genreHome.containers,
            containers = _genreHome$containers === void 0 ? [] : _genreHome$containers;

        if (containers.length) {
          var promises = containers.map(function (container) {
            return _this52.createContainer(container);
          });
          return Promise.all(promises).then(function (containers) {
            return new GenreData(containers, _source);
          });
        }
      }
    }, {
      key: "createSearchType",
      value: function createSearchType(_ref40) {
        var type = _ref40.type,
            obj = _ref40.obj;

        if (Factory$1.LISTTYPE.hasOwnProperty(type)) {
          return new Factory$1.LISTTYPE[type](obj);
        }
      }
    }, {
      key: "createPlaylist",
      value: function createPlaylist(_ref41) {
        var playlists = _ref41.playlists;

        if (playlists && playlists.length) {
          return new PlaylistData(playlists[0]);
        }
      }
    }, {
      key: "createShow",
      value: function createShow(_ref42) {
        var playlists = _ref42.playlists;

        if (playlists && playlists.length) {
          return new ShowData(playlists[0]);
        }
      }
    }], [{
      key: "_ucfirst",
      value: function _ucfirst(str) {
        return "".concat(str[0].toUpperCase()).concat(str.slice(1));
      }
    }]);

    return Factory$1;
  }();

  Factory$1.VIDEO_WRAPPER = {
    "top-videos": Videos,
    "defining-videos": Videos,
    premieres: Videos
  };
  Factory$1.LIST_WRAPPER = {
    "genres-page": Genres,
    "trending-artists": Artists,
    playlists: Playlists,
    shows: Shows
  };
  Factory$1.LISTTYPE = new Map();
  Factory$1.LISTTYPE.set(Video, {
    c: Video,
    fn: "video"
  });
  Factory$1.LISTTYPE.set(Genre, {
    c: Genre,
    fn: "genre"
  });
  Factory$1.LISTTYPE.set(Playlist, {
    c: Playlist,
    fn: "playlist"
  });
  Factory$1.LISTTYPE.set(Show, {
    c: Show,
    fn: "show"
  });
  Factory$1.LISTTYPE.set(Artist$1, {
    c: Artist$1,
    fn: "artist"
  });
  Factory$1.BUILD_TYPES = new Map();
  Factory$1.BUILD_TYPES.set("video", Video);
  Factory$1.BUILD_TYPES.set("videos", Videos);
  Factory$1.BUILD_TYPES.set("genre", Genre);
  Factory$1.BUILD_TYPES.set("playlist", Playlist);
  Factory$1.BUILD_TYPES.set("show", Show);
  Factory$1.BUILD_TYPES.set("artist", Artist$1);
  Factory$1.DATATYPE = {
    ArtistData: ArtistData,
    VideoData: VideoData
  };

  var Authenticator =
  /*#__PURE__*/
  function () {
    function Authenticator() {
      _classCallCheck(this, Authenticator);

      this._tokenUrl = "https://accounts.vevo.com/token";
      this._clientId = "zOYzmutpI1eT2qCad16g";
    }

    _createClass(Authenticator, [{
      key: "requestToken",
      value: function requestToken(_ref43) {
        var _this53 = this;

        var _ref43$refresh = _ref43.refresh,
            refresh = _ref43$refresh === void 0 ? false : _ref43$refresh;
        var body = {
          client_id: this._clientId,
          grant_type: "urn:vevo:params:oauth:grant-type:anonymous"
        }; // check if we're requesting a refresh token

        if (refresh) {
          body = _objectSpread({}, body, {
            grant_type: "refresh_token",
            refresh_token: this._refresh_token
          });
        } // fire token request


        return this.post({
          url: this._tokenUrl,
          body: body
        }).then(function (data) {
          // if we have a access_token property
          // we store needed values via token setter
          if (data.hasOwnProperty("access_token")) {
            _this53.token = data;
          }

          return data;
        }).catch(function () {
          throw new Error(Api.ERRORS.CODE3);
        });
      }
    }, {
      key: "post",
      value: function post(_ref44) {
        var url = _ref44.url,
            body = _ref44.body;
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: Authenticator._qsify(body)
        }).then(function (response) {
          if (response.status === 400) {
            throw new Error();
          }

          return response.json();
        });
      }
    }, {
      key: "hasValidToken",
      value: function hasValidToken() {
        this._token = localStorage.getItem("TOKEN");
        this._refresh_token = localStorage.getItem("REFRESH_TOKEN");
        this._expires = localStorage.getItem("TOKEN_EXPIRES");

        if (this.isTokenExpired()) {
          if (this._refresh_token) {
            return this.requestToken({
              refresh: false
            }).then(function (response) {
              return true;
            }).catch(function (err) {
              return false;
            });
          } else {
            return false;
          }
        }

        return this._token && this._refresh_token;
      }
    }, {
      key: "isTokenExpired",
      value: function isTokenExpired() {
        return this._expires <= Date.now();
      }
    }, {
      key: "token",
      get: function get() {
        return this._token;
      },
      set: function set(v) {
        var access_token = v.access_token,
            refresh_token = v.refresh_token,
            expires_in = v.expires_in;
        this._token = access_token;
        this._refresh_token = refresh_token;
        var d = new Date();
        d.setSeconds(d.getSeconds() + expires_in);
        this.expires = d.getTime();
        localStorage.setItem("TOKEN", access_token);
        localStorage.setItem("REFRESH_TOKEN", refresh_token);
      }
    }, {
      key: "expires",
      set: function set(v) {
        this._expires = v;
        localStorage.setItem("TOKEN_EXPIRES", v);
      }
    }], [{
      key: "_qsify",
      value: function _qsify(params) {
        return Object.keys(params).map(function (key) {
          return "".concat(key, "=").concat(params[key]);
        }).join("&");
      }
    }]);

    return Authenticator;
  }();

  var Api =
  /*#__PURE__*/
  function () {
    function Api() {
      _classCallCheck(this, Api);

      this._auth = new Authenticator();
      this._factory = new Factory$1(this);
    }

    _createClass(Api, [{
      key: "getToken",
      value: function getToken() {
        if (this._auth.hasValidToken()) {
          return Promise.resolve(this._auth.token);
        } else {
          return this._auth.requestToken({
            refresh: false
          }).then(function (response) {
            return response;
          });
        }
      }
    }, {
      key: "requestHome",
      value: function requestHome() {
        var _this54 = this;

        return this.query(GraphQL.create("home")).then(function (_ref45) {
          var data = _ref45.data;
          var home = data.homePage;

          if (home && home.containers && home.containers.length) {
            var promises = home.containers.map(function (c) {
              return _this54.query(GraphQL.create("videoContainerById", {
                id: c.id
              }));
            });

            if (promises.length) {
              return Promise.all(promises);
            }
          } else {
            throw new Error(Api.ERRORS.CODE1);
          }
        }).then(function (containers) {
          if (containers.length) {
            var promises = containers.map(function (c) {
              var data = Tools.getPropertyByPath(c, "data.homePage.container");
              return _this54._createDatatypes({
                type: "container",
                data: data
              });
            });
            return Promise.all(promises);
          } else {
            throw new Error(Api.ERRORS.CODE2);
          }
        }).then(function (containers) {
          // extract trending list from response and splice off the first 3 items
          // this will be used to output in the slider
          var trending = containers.filter(function (c) {
            var reg = /^trending/ig;
            return reg.test(c.title);
          });
          var data = {
            containers: containers
          };

          if (trending && trending.length) {
            var c = trending[0].items;
            data.slider = c.splice(2, 7);
          } else {
            data.slider = [];
          }

          return data;
        }).catch(function (err) {
          throw new Error(Api.ERRORS.CODE5);
        });
      }
    }, {
      key: "fetchDetails",
      value: function fetchDetails(item) {
        var _this55 = this;

        var constructor = item.constructor;

        if (Api.FETCH_TYPES.has(constructor)) {
          var type = Api.FETCH_TYPES.get(constructor);
          return this.query(GraphQL.create(type, {
            id: item.target
          })).then(function (_ref46) {
            var data = _ref46.data;
            data = _objectSpread({
              _source: item
            }, data);
            return _this55._factory.create(constructor, data);
          });
        } else {
          return Promise.reject("".concat(constructor, " not supported"));
        }
      }
    }, {
      key: "fetchCollectionOffset",
      value: function fetchCollectionOffset(_ref47) {
        var _this56 = this;

        var id = _ref47.id,
            _ref47$offset = _ref47.offset,
            offset = _ref47$offset === void 0 ? 0 : _ref47$offset,
            _ref47$limit = _ref47.limit,
            limit = _ref47$limit === void 0 ? 80 : _ref47$limit,
            genre = _ref47.genre;

        if (genre) {
          return this.query(GraphQL.create("pagedItemsByGenreAndContainer", {
            id: id,
            genre: genre,
            offset: offset,
            limit: limit
          })).then(function (response) {
            var data = Tools.getPropertyByPath(response, "data.genreHome.container");
            return _this56._createDatatypes({
              type: "container",
              data: data
            });
          });
        } else {
          return this.query(GraphQL.create("pagedItemsByContainerId", {
            id: id,
            offset: offset,
            limit: limit
          })).then(function (response) {
            var data = Tools.getPropertyByPath(response, "data.homePage.container");
            return _this56._createDatatypes({
              type: "container",
              data: data
            });
          });
        }
      }
    }, {
      key: "_createDatatypes",
      value: function _createDatatypes(_ref48) {
        var type = _ref48.type,
            data = _ref48.data;
        return this._factory.create(type, data);
      }
    }, {
      key: "query",
      value: function query(q) {
        return this.get("https://partner.vevo.com/graphql?query=".concat(encodeURIComponent(q)));
      }
    }, {
      key: "search",
      value: function search(query) {
        var _this57 = this;

        var promises = [this.query(GraphQL.create("searchVideos", {
          query: query
        })), this.query(GraphQL.create("searchArtists", {
          query: query
        }))];
        return Promise.all(promises).then(function (response) {
          var results = []; // we don't receive correctly formated data from the graphQL server
          // for the time being we reformat the objects to meet what
          // the factory expects.

          response.forEach(function (data) {
            [{
              key: "videos",
              type: "video",
              service: "top-videos",
              path: "data.search.videos.items"
            }, {
              key: "artists",
              type: "artist",
              service: "trending-artists",
              path: "data.search.artists.items"
            }].forEach(function (obj) {
              var items = Tools.getPropertyByPath(data, obj.path);

              if (items && items.length) {
                items = items.map(function (item) {
                  if (item.basicMeta) {
                    var _item$basicMeta = item.basicMeta,
                        urlSafeName = _item$basicMeta.urlSafeName,
                        name = _item$basicMeta.name,
                        thumbnailUrl = _item$basicMeta.thumbnailUrl;
                    return {
                      type: obj.type,
                      thumbnail: thumbnailUrl,
                      target: urlSafeName,
                      title: name
                    };
                  } else {
                    return _objectSpread({
                      target: item.id
                    }, item);
                  }
                });
                results.push({
                  title: obj.key,
                  pagedItems: {
                    items: items
                  },
                  serviceName: obj.service
                });
              }
            });
          });
          var promises = results.map(function (data) {
            return _this57._createDatatypes({
              type: "container",
              data: data
            });
          });
          return Promise.all(promises);
        });
      }
    }, {
      key: "get",
      value: function get(url) {
        var _this58 = this;

        if (this._auth.isTokenExpired()) {
          return this._auth.requestToken({
            refresh: true
          }).then(function () {
            return _this58.get(url);
          });
        }

        return fetch(url, {
          headers: {
            "Authorization": "Bearer ".concat(this._auth.token)
          }
        }).then(function (response) {
          return response.json();
        });
      }
    }, {
      key: "getUrlSafeGenre",
      value: function getUrlSafeGenre(name) {
        var matches = this._genres.filter(function (el) {
          var reg = new RegExp("".concat(el.name), "ig");
          return reg.test(name);
        });

        if (matches && matches.length) {
          return matches[0].urlSafeName;
        }
      }
    }, {
      key: "_mergeDataInPromise",
      value: function _mergeDataInPromise(_ref49) {
        var q = _ref49.q,
            data = _ref49.data;
        return this._promise(q).then(function (response) {
          return _objectSpread({
            response: response
          }, data);
        });
      }
    }, {
      key: "_promise",
      value: function _promise(q) {
        return this.query(q);
      }
    }, {
      key: "_handleApiError",
      value: function _handleApiError(err) {}
    }, {
      key: "genres",
      set: function set(v) {
        this._genres = v;
      }
    }, {
      key: "auth",
      get: function get() {
        return this._auth;
      }
    }]);

    return Api;
  }();

  Api.ERRORS = {
    CODE1: "No containers found.",
    CODE2: "Container by id returned empty array.",
    CODE3: "Unable to fetch a token.",
    CODE4: "Unable to get details.",
    CODE5: "An error occurred while loading the main data."
  };
  Api.FETCH_TYPES = new Map();
  Api.FETCH_TYPES.set(Video, "videoById");
  Api.FETCH_TYPES.set(Artist$1, "artistByName");
  Api.FETCH_TYPES.set(Genre, "genreByName");
  Api.FETCH_TYPES.set(Playlist, "playlistById");
  Api.FETCH_TYPES.set(Show, "playlistById");

  var Splash =
  /*#__PURE__*/
  function (_lng$Component24) {
    _inherits(Splash, _lng$Component24);

    function Splash() {
      _classCallCheck(this, Splash);

      return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
    }

    _createClass(Splash, [{
      key: "_init",
      value: function _init() {
        this._loaderAnimation = this.animation({
          duration: 3,
          delay: 1,
          repeat: -1,
          actions: [{
            t: 'White',
            p: 'w',
            rv: 0,
            v: {
              sm: .3,
              0: 0,
              .25: 1920,
              .5: 1920,
              .75: 0
            }
          }, {
            t: 'White',
            p: 'x',
            rv: 1920,
            v: {
              sm: .3,
              0: 1920,
              .25: 0,
              .5: 0,
              .75: 1920
            }
          }, {
            t: 'White.Logo',
            p: 'x',
            rv: -960,
            v: {
              sm: .3,
              0: -960,
              .25: 960,
              .5: 960,
              .75: -960
            }
          }]
        });
      }
    }, {
      key: "_active",
      value: function _active() {
        this._loaderAnimation.start();
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this._loaderAnimation.stop();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          zIndex: 99,
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xff000000,
          Black: {
            clipping: true,
            w: 1920,
            h: 1080,
            mountX: 0,
            Background: {
              w: 1920,
              h: 1080,
              rect: true,
              color: 0xff000000
            },
            Logo: {
              w: 953,
              h: 240,
              mount: .5,
              x: 960,
              y: 540,
              Image: {
                src: App.getPath('images/logo-large.png')
              }
            }
          },
          White: {
            clipping: true,
            h: 1080,
            w: 0,
            mountX: 0,
            Background: {
              h: 1080,
              w: 1920,
              rect: true
            },
            Logo: {
              w: 953,
              h: 240,
              mount: .5,
              x: 960,
              y: 540,
              color: 0xff000000,
              src: App.getPath('images/logo-large.png')
            }
          }
        };
      }
    }]);

    return Splash;
  }(lng.Component);

  var Loader$1 =
  /*#__PURE__*/
  function (_lng$Component25) {
    _inherits(Loader$1, _lng$Component25);

    function Loader$1() {
      _classCallCheck(this, Loader$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loader$1).apply(this, arguments));
    }

    _createClass(Loader$1, [{
      key: "_init",
      value: function _init() {
        this._loaderAnimation = this.animation({
          duration: 2,
          repeat: -1,
          actions: [{
            t: 'Loader.White',
            p: 'w',
            rv: 0,
            v: {
              sm: .3,
              0: 0,
              .25: 278,
              .5: 278,
              .75: 0
            }
          }, {
            t: 'Loader.White',
            p: 'x',
            rv: 278,
            v: {
              sm: .3,
              0: 278,
              .25: 0,
              .5: 0,
              .75: 278
            }
          }]
        });
      }
    }, {
      key: "_active",
      value: function _active() {
        this._loaderAnimation.start();
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this._loaderAnimation.stop();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          zIndex: 99,
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xee000000,
          Logo: {
            w: 278,
            h: 70,
            mount: .5,
            y: 540,
            x: 960,
            src: App.getPath('images/logo.png')
          },
          Loader: {
            w: 278,
            h: 5,
            mount: .5,
            x: 960,
            y: 600,
            White: {
              clipping: true,
              h: 250,
              w: 0,
              mountX: 0,
              Background: {
                w: 278,
                h: 5,
                rect: true
              }
            }
          }
        };
      }
    }]);

    return Loader$1;
  }(lng.Component);

  var Error$1 =
  /*#__PURE__*/
  function (_lng$Component26) {
    _inherits(Error$1, _lng$Component26);

    function Error$1() {
      _classCallCheck(this, Error$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Error$1).apply(this, arguments));
    }

    _createClass(Error$1, [{
      key: "handleError",
      value: function handleError(_ref50) {
        var message = _ref50.message,
            timeout = _ref50.timeout;
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
                  fontFace: "Regular",
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
      key: "_init",
      value: function _init() {
        this._setState("RequestingToken");
      }
    }, {
      key: "$logo",
      value: function $logo(_ref51) {
        var x = _ref51.x,
            y = _ref51.y,
            _ref51$duration = _ref51.duration,
            duration = _ref51$duration === void 0 ? 0.6 : _ref51$duration;
        this.patch({
          Logo: {
            smooth: {
              x: [x, {
                duration: duration
              }],
              y: [y, {
                duration: duration
              }]
            }
          }
        });
      }
    }, {
      key: "$routeOnItemSelect",
      value: function $routeOnItemSelect(args) {
        this._setState("App");

        this.tag("AppContents").$onItemSelect(args);
      }
    }, {
      key: "$error",
      value: function $error(_ref52) {
        var _this59 = this;

        var message = _ref52.message,
            _ref52$timeout = _ref52.timeout,
            timeout = _ref52$timeout === void 0 ? 5000 : _ref52$timeout,
            _ref52$returnState = _ref52.returnState,
            returnState = _ref52$returnState === void 0 ? "App" : _ref52$returnState;

        this._setState("Error");

        return this.tag("Error").handleError({
          message: message,
          timeout: timeout
        }).then(function () {
          _this59._setState(returnState);
        });
      }
    }, {
      key: "$api",
      value: function $api() {
        return this._api;
      }
    }, {
      key: "$startLoader",
      value: function $startLoader() {
        this.tag("Loader").setSmooth("alpha", 1, {
          duration: .6
        });
      }
    }, {
      key: "$stopLoader",
      value: function $stopLoader() {
        this.tag("Loader").setSmooth("alpha", 0, {
          duration: .6
        });
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        if (this.state === "Playing") {
          settings.mediaplayer.consumer = this.tag("Player");
        }
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
          family: 'Black',
          url: App.getPath('fonts/Roboto-Black.ttf'),
          descriptors: {}
        }, {
          family: 'Bold',
          url: App.getPath('fonts/Roboto-Bold.ttf'),
          descriptors: {}
        }, {
          family: 'Light',
          url: App.getPath('fonts/Roboto-Light.ttf'),
          descriptors: {}
        }, {
          family: 'Italic',
          url: App.getPath('fonts/Roboto-Italic.ttf'),
          descriptors: {}
        }, {
          family: 'Regular',
          url: App.getPath('fonts/Roboto-Regular.ttf'),
          descriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          color: 0xff000000,
          Player: {
            type: Player,
            alpha: 0,
            signals: {
              forceStop: true
            }
          },
          AppContents: {
            type: AppContents,
            alpha: 0
          },
          Splash: {
            type: Splash,
            alpha: 0
          },
          Loader: {
            type: Loader$1,
            zIndex: 99,
            alpha: 0
          },
          Logo: {
            zIndex: 4,
            x: 82,
            y: 82,
            alpha: 0,
            src: App.getPath('images/logo.png')
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
        function (_this60) {
          _inherits(RequestingToken, _this60);

          function RequestingToken() {
            _classCallCheck(this, RequestingToken);

            return _possibleConstructorReturn(this, _getPrototypeOf(RequestingToken).apply(this, arguments));
          }

          _createClass(RequestingToken, [{
            key: "$enter",
            value: function $enter() {
              var _this61 = this;

              this.tag("Splash").setSmooth("alpha", 1, {
                duration: .2
              });
              this.api.getToken().then(function () {
                _this61.tokenRequested();
              }).catch(function (err) {
                _this61.$error(err);
              });
            }
          }, {
            key: "tokenRequested",
            value: function tokenRequested() {
              this._setState("PrepareContent");
            }
          }]);

          return RequestingToken;
        }(this),
        /*#__PURE__*/
        function (_this62) {
          _inherits(PrepareContent, _this62);

          function PrepareContent() {
            _classCallCheck(this, PrepareContent);

            return _possibleConstructorReturn(this, _getPrototypeOf(PrepareContent).apply(this, arguments));
          }

          _createClass(PrepareContent, [{
            key: "$enter",
            value: function $enter() {
              var _this63 = this;

              this._timestart = Date.now();
              this.api.requestHome().then(function (response) {
                // @todo: let PageRouter handle
                _this63.tag("AppContents").syncHomeData(response);

                return _this63.api.get(App.getPath("genres.json"));
              }).then(function (genres) {
                _this63.api.genres = genres;

                _this63.onPrepared();
              }).catch(function (err) {
                _this63.$error(err);
              });
            }
          }, {
            key: "onPrepared",
            value: function onPrepared() {
              var _this64 = this;

              this._timeend = Date.now();
              var diff = this._timeend - this._timestart;
              var timeout = Math.max(0, 3400 - diff);
              setTimeout(function () {
                _this64.tag("Splash").setSmooth("alpha", 0, {
                  duration: .2
                });

                _this64.tag("Logo").setSmooth("alpha", 1);

                _this64._setState("App");
              }, timeout);
            }
          }]);

          return PrepareContent;
        }(this),
        /*#__PURE__*/
        function (_this65) {
          _inherits(App, _this65);

          function App() {
            _classCallCheck(this, App);

            return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
          }

          _createClass(App, [{
            key: "$play",
            value: function $play(_ref53) {
              var item = _ref53.item,
                  items = _ref53.items,
                  sourceList = _ref53.sourceList;

              this._setState("Playing");

              this.tag("Player").play({
                item: item,
                items: items,
                sourceList: sourceList
              });
            }
          }, {
            key: "$enter",
            value: function $enter() {
              this.tag("AppContents").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("AppContents").setSmooth("alpha", 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("AppContents");
            }
          }]);

          return App;
        }(this),
        /*#__PURE__*/
        function (_this66) {
          _inherits(Playing, _this66);

          function Playing() {
            _classCallCheck(this, Playing);

            return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
          }

          _createClass(Playing, [{
            key: "$enter",
            value: function $enter() {
              this._logoRestorePosition = {
                x: this.tag("Logo").x,
                y: this.tag("Logo").y
              };
              this.tag("Player").setSmooth("alpha", 1);
              this.$logo({
                x: 82,
                y: 82
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Player").setSmooth("alpha", 0);
              this.$logo(this._logoRestorePosition);
            }
          }, {
            key: "$play",
            value: function $play(_ref54) {
              var item = _ref54.item,
                  items = _ref54.items;
              this.tag("Player").play({
                item: item,
                items: items
              });
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("App");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Player");
            }
          }, {
            key: "forceStop",
            value: function forceStop() {
              this._setState("App");
            }
          }]);

          return Playing;
        }(this),
        /*#__PURE__*/
        function (_this67) {
          _inherits(Error, _this67);

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
    }]);

    return App;
  }(ux.App);

  return App;
}();