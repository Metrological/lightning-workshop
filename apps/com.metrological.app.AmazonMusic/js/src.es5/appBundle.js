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

  var ItemWrapper =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(ItemWrapper, _lng$Component);

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
        }];

        if (!ItemWrapper.FIRST_CREATED) {
          ItemWrapper.FIRST_CREATED = true;
          this.fireAncestors("$firstItemCreated");
        }
      }
    }, {
      key: "_firstActive",
      value: function _firstActive() {
        this.create();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.child;
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
          w: 690,
          h: 600
        };
      }
    }]);

    return ItemWrapper;
  }(lng.Component);

  ItemWrapper.FIRST_CREATED = false;

  var List =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(List, _lng$Component2);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
    }

    _createClass(List, [{
      key: "_scroll",
      value: function _scroll(v) {
        var activeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._index;
        var _this$_construct = this._construct,
            width = _this$_construct.width,
            space = _this$_construct.space,
            contentWidth = _this$_construct.contentWidth;

        for (var i = 0; i < this._listItems.length; i++) {
          var item = this._listItems[i];

          if (i >= activeIndex + 1 && i < activeIndex + 5) {
            item.setSmooth("x", i * width + (v ? contentWidth : space), {
              delay: 0,
              duration: .6
            });
            item.setSmooth("alpha", v ? 0 : 1, {
              delay: 0,
              duration: .6
            });
          } else {
            item.setSmooth("x", i * width, {
              delay: 0,
              duration: .6
            });
            item.setSmooth("alpha", v && i !== this._index ? 0 : 1, {
              delay: 0,
              duration: .6
            });
          }
        }

        if (!v && this._index >= 1) {
          this.tag("Items").setSmooth("x", -((activeIndex - 1) * width));
        } else {
          this.tag("Items").setSmooth("x", -(activeIndex * width));
        }
      }
    }, {
      key: "_reset",
      value: function _reset() {
        var width = this._construct.width;

        for (var i = 0; i < this._listItems.length; i++) {
          var item = this._listItems[i];
          item.setSmooth("x", i * width, {
            delay: 0,
            duration: .6
          });
        }
      }
    }, {
      key: "next",
      value: function next() {
        this._select({
          index: 1
        });

        this.fireAncestors("$selectItem", {
          item: this.active.item,
          list: this
        });
      }
    }, {
      key: "previous",
      value: function previous() {
        this._select({
          index: -1
        });

        this.fireAncestors("$selectItem", {
          item: this.active.item,
          list: this
        });
      }
    }, {
      key: "loadingReady",
      value: function loadingReady() {
        this.active.child.stopLoading();
      }
    }, {
      key: "_init",
      value: function _init() {
        this._listItems = this.tag("Items").children;
        this._index = 0;

        this._setState("Collapsed");
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Title: {
            smooth: {
              alpha: 1,
              color: 0xffffffff
            }
          }
        });

        this._scroll();
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._index > 0) {
          this._select({
            index: -1
          });
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._index < this._listItems.length - 1) {
          this._select({
            index: 1
          });
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$selectItem", {
          item: this.active.item,
          list: this
        });

        this._setState("Loading");
      }
    }, {
      key: "_select",
      value: function _select(_ref) {
        var index = _ref.index;
        this._index += index;

        this._scroll();

        this.active.child.rotateVinyl(index);
      }
    }, {
      key: "collapse",
      value: function collapse() {
        this._setState("Collapsed");
      }
    }, {
      key: "expand",
      value: function expand() {
        this._setState("Expanded");
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Title: {
            smooth: {
              y: 0,
              color: 0x50ffffff
            }
          }
        });

        this._reset();
      }
    }, {
      key: "$getListState",
      value: function $getListState() {
        return this.state;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "index",
      get: function get() {
        return this._index;
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
        return this.tag("Items").children[this._index].items;
      },
      set: function set(v) {
        var _this = this;

        var construct = this._construct;
        this._items = v;
        this.tag("Items").patch({
          children: v.map(function (item, index) {
            return {
              type: ItemWrapper,
              construct: _this._construct,
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
        });
      }
    }, {
      key: "rootUrl",
      get: function get() {
        return this._rootUrl;
      },
      set: function set(v) {
        this._rootUrl = v;
      }
    }, {
      key: "construct",
      set: function set(v) {
        this._construct = v;
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
    }], [{
      key: "_template",
      value: function _template() {
        return {
          transitions: {
            alpha: {
              duration: .6
            }
          },
          Title: {
            color: 0x50ffffff,
            transitions: {
              color: {
                duration: .6
              },
              y: {
                duration: .6
              },
              x: {
                duration: .6
              },
              alpha: {
                duration: .3
              }
            },
            text: {
              fontSize: 32,
              fontFace: "Bold"
            }
          },
          Items: {
            forceZIndexContext: true,
            boundsMargin: [300, 520, 100, 300],
            y: 68,
            transitions: {
              y: {
                duration: .6
              },
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
        function (_this2) {
          _inherits(Loading, _this2);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.active.child.startLoading();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.active.child.stopLoading();
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this3) {
          _inherits(Collapsed, _this3);

          function Collapsed() {
            _classCallCheck(this, Collapsed);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapsed).apply(this, arguments));
          }

          return Collapsed;
        }(this),
        /*#__PURE__*/
        function (_this4) {
          _inherits(Expanded, _this4);

          function Expanded() {
            _classCallCheck(this, Expanded);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expanded).apply(this, arguments));
          }

          _createClass(Expanded, [{
            key: "$enter",
            value: function $enter() {
              this._scroll(true);

              this.patch({
                Title: {
                  smooth: {
                    alpha: 0
                  }
                }
              });
            }
          }]);

          return Expanded;
        }(this)];
      }
    }, {
      key: "height",
      get: function get() {
        return 690;
      }
    }]);

    return List;
  }(lng.Component);

  var TrackWrapper =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(TrackWrapper, _lng$Component3);

    function TrackWrapper() {
      _classCallCheck(this, TrackWrapper);

      return _possibleConstructorReturn(this, _getPrototypeOf(TrackWrapper).apply(this, arguments));
    }

    _createClass(TrackWrapper, [{
      key: "create",
      value: function create() {
        var item = this._item;
        this.children = [{
          type: this._construct,
          item: item
        }];
      }
    }, {
      key: "_firstActive",
      value: function _firstActive() {
        this.create();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.child;
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
          w: 1200,
          h: 200
        };
      }
    }]);

    return TrackWrapper;
  }(lng.Component);

  var Tracklist =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(Tracklist, _lng$Component4);

    function Tracklist() {
      _classCallCheck(this, Tracklist);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tracklist).apply(this, arguments));
    }

    _createClass(Tracklist, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
        this._listItems = this.tag("Items").children;
      }
    }, {
      key: "_scroll",
      value: function _scroll() {
        var activeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._index;
        var offset = ~~(activeIndex / (Tracklist.ITEMS_PER_COLUMN * 2)) * 872;
        this.patch({
          Items: {
            smooth: {
              x: -offset * 2
            }
          }
        });
      }
    }, {
      key: "_reset",
      value: function _reset() {}
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Title: {
            smooth: {
              alpha: 1,
              color: 0xffffffff
            }
          }
        });

        this._scroll();

        this._select({
          index: this._index
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Title: {
            smooth: {
              y: 0,
              color: 0x50ffffff
            }
          }
        });
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        var newIndex = this._index - Tracklist.ITEMS_PER_COLUMN;

        if (newIndex > 0) {
          this._select({
            index: newIndex
          });
        } else {
          this._select({
            index: 0
          });
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        var newIndex = this._index + Tracklist.ITEMS_PER_COLUMN;
        var max = this.items.length - 1;

        if (newIndex < max) {
          this._select({
            index: newIndex
          });
        } else {
          this._select({
            index: max
          });
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        var relativeIndex = this._index % Tracklist.ITEMS_PER_COLUMN;

        if (relativeIndex > 0) {
          this._select({
            index: this._index - 1
          });
        } else {
          return false;
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        var relativeIndex = this._index % Tracklist.ITEMS_PER_COLUMN;
        var newIndex = this._index + Tracklist.ITEMS_PER_COLUMN;
        var max = this.items.length + 1;

        if (newIndex < max && relativeIndex < Tracklist.ITEMS_PER_COLUMN - 1) {
          this._select({
            index: this._index + 1
          });
        } else {
          return false;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$play", {
          sourceList: this,
          items: this._items,
          index: this._index,
          keepPlayerState: true
        });
      }
    }, {
      key: "_select",
      value: function _select(_ref2) {
        var index = _ref2.index;
        var activeColumn = ~~(this._index / (Tracklist.ITEMS_PER_COLUMN * 2));
        var newColumn = ~~(index / (Tracklist.ITEMS_PER_COLUMN * 2));
        this._index = index;

        if (activeColumn !== newColumn) {
          this._scroll();
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "index",
      get: function get() {
        return this._index;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag("Items").children[this._index];
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Items").children;
      },
      set: function set(v) {
        var _this5 = this;

        var construct = this._construct;
        this._items = v;
        this.tag("Items").patch({
          children: v.map(function (item, index) {
            return {
              type: TrackWrapper,
              construct: _this5._construct,
              index: index,
              item: item,
              x: ~~(index / Tracklist.ITEMS_PER_COLUMN) * construct.width,
              y: index % Tracklist.ITEMS_PER_COLUMN * construct.height,
              transitions: {
                x: {
                  delay: .06 * index,
                  duration: .6
                }
              }
            };
          })
        });
      }
    }, {
      key: "rootUrl",
      set: function set(v) {
        this._rootUrl = v;
      },
      get: function get() {
        return this._rootUrl;
      }
    }, {
      key: "construct",
      get: function get() {
        return this._construct;
      },
      set: function set(v) {
        this._construct = v;
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
    }], [{
      key: "_template",
      value: function _template() {
        return {
          transitions: {
            alpha: {
              duration: .6
            }
          },
          Title: {
            color: 0x50ffffff,
            transitions: {
              color: {
                duration: .6
              },
              y: {
                duration: .6
              },
              x: {
                duration: .6
              },
              alpha: {
                duration: .3
              }
            },
            text: {
              fontSize: 32,
              fontFace: "Bold"
            }
          },
          Items: {
            forceZIndexContext: true,
            boundsMargin: [300, 520, 100, 300],
            y: 68,
            transitions: {
              y: {
                duration: .6
              },
              x: {
                duration: .6
              }
            }
          }
        };
      }
    }, {
      key: "height",
      get: function get() {
        return 550;
      }
    }]);

    return Tracklist;
  }(lng.Component);

  Tracklist.ITEMS_PER_COLUMN = 3;

  var Tools =
  /*#__PURE__*/
  function () {
    function Tools() {
      _classCallCheck(this, Tools);
    }

    _createClass(Tools, null, [{
      key: "getFullTime",
      value: function getFullTime(sec) {
        var minutes = ~~(sec % 3600 / 60);
        var seconds = ~~sec % 60;
        return "".concat(minutes, ":").concat(seconds < 10 ? "0".concat(seconds) : seconds);
      }
    }, {
      key: "extractCommonColor",
      value: function extractCommonColor(texture, gl, lng, _ref3) {
        var _ref3$offset = _ref3.offset,
            offset = _ref3$offset === void 0 ? 90 : _ref3$offset,
            _ref3$step = _ref3.step,
            step = _ref3$step === void 0 ? 60 : _ref3$step;
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
    }]);

    return Tools;
  }();

  var Loader =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(Loader, _lng$Component5);

    function Loader() {
      _classCallCheck(this, Loader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
      key: "_init",
      value: function _init() {
        this._loaderAnimation = this.tag("Loader").animation({
          duration: 5,
          delay: .2,
          repeat: -1,
          actions: [{
            t: '',
            p: 'w',
            v: {
              0: 5,
              .25: 400,
              .5: 5,
              .75: 400,
              1: 5,
              sm: 0
            }
          }, {
            t: '',
            p: 'x',
            v: {
              0: 0,
              .25: 0,
              .5: 395,
              .75: 0,
              1: 0,
              sm: 0
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
          Overlay: {
            w: 400,
            h: 400,
            mount: .5,
            y: 200,
            x: 200,
            rect: true,
            colorTop: 0x00000000,
            colorBottom: 0xaa000000
          },
          Loader: {
            y: 394,
            h: 6,
            w: 0,
            mountX: 0,
            rect: true,
            color: 0xffffffff
          }
        };
      }
    }]);

    return Loader;
  }(lng.Component);

  var Equalizer =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Equalizer, _lng$Component6);

    function Equalizer() {
      _classCallCheck(this, Equalizer);

      return _possibleConstructorReturn(this, _getPrototypeOf(Equalizer).apply(this, arguments));
    }

    _createClass(Equalizer, [{
      key: "_init",
      value: function _init() {
        var bars = [];

        for (var i = 0; i < Equalizer.BARS; i++) {
          bars.push({
            type: Bar,
            x: i * 10,
            ref: "Bar-".concat(i)
          });
        }

        this.tag("Bars").children = bars;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Bars: {}
        };
      }
    }]);

    return Equalizer;
  }(lng.Component);

  Equalizer.BARS = 3;

  var Bar =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(Bar, _lng$Component7);

    function Bar() {
      _classCallCheck(this, Bar);

      return _possibleConstructorReturn(this, _getPrototypeOf(Bar).apply(this, arguments));
    }

    _createClass(Bar, [{
      key: "_init",
      value: function _init() {
        var duration = Math.random() * .2 + .6;
        var height = ~~(Math.random() * 18) + 8;
        this._barAnimation = this.animation({
          duration: duration,
          delay: 0,
          repeat: -1,
          actions: [{
            p: "h",
            rv: 1,
            v: {
              0: 4,
              0.5: height,
              1: 4
            }
          }]
        });

        this._barAnimation.start();
      }
    }, {
      key: "_detach",
      value: function _detach() {
        this._barAnimation.stop();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          w: 5,
          h: 4,
          y: 20,
          color: 0xffffffff,
          mountY: 1
        };
      }
    }]);

    return Bar;
  }(lng.Component);
  /**
   * @todo: re-use animations
   */


  var LPCover =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(LPCover, _lng$Component8);

    function LPCover() {
      _classCallCheck(this, LPCover);

      return _possibleConstructorReturn(this, _getPrototypeOf(LPCover).apply(this, arguments));
    }

    _createClass(LPCover, [{
      key: "_active",
      value: function _active() {
        if (!this._glowAnimation) {
          this._glowAnimation = this.tag("Glow").animation(this.fireAncestors("$getGlowAnimationSettings"));
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        var _this6 = this;

        // delay color exposing to prevent it from reading pixels
        // while quick navigating
        this._timeout = setTimeout(function () {
          return _this6._exposeColor();
        }, 800);
        this.setFocus(true);

        if (this._stationAnimation) {
          this._stationAnimation.start();
        }
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        clearTimeout(this._timeout);
        var state = this.fireAncestors("$getListState");

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
                smooth: {
                  x: [0, {
                    duration: .6
                  }]
                }
              },
              Cover: {
                InnerCover: {
                  smooth: {
                    x: [0, {
                      duration: .6
                    }]
                  }
                }
              }
            }
          });

          if (this.tag("Equalizer")) {
            this.patch({
              Details: {
                Title: {
                  smooth: {
                    x: [0, {
                      duration: .3
                    }]
                  }
                },
                Equalizer: {
                  smooth: {
                    alpha: [0, {
                      duration: .3
                    }]
                  }
                }
              }
            });
          }
        }
      }
    }, {
      key: "rotateVinyl",
      value: function rotateVinyl(dir) {
        this.tag("Vinyl").animation({
          duration: .6,
          stopMethod: "reverse",
          actions: [{
            t: '',
            p: 'rotation',
            v: {
              0: {
                v: Math.PI * (dir * .5)
              },
              1: {
                v: .4
              }
            }
          }]
        }).start();
      }
    }, {
      key: "setFocus",
      value: function setFocus(v) {
        this.patch({
          Item: {
            Vinyl: {
              smooth: {
                alpha: v ? [1, {
                  delay: 0
                }] : [0, {
                  delay: .6
                }],
                x: [v ? 200 : 0, {
                  duration: .6
                }]
              }
            },
            Shadow: {
              smooth: {
                alpha: [v ? .7 : 0, {
                  duration: .6
                }]
              }
            },
            Cover: {
              InnerCover: {
                smooth: {
                  alpha: [v ? .9 : 0, {
                    delay: v ? 0 : .6,
                    duration: 0
                  }],
                  x: [v ? 30 : 0, {
                    duration: .6
                  }]
                }
              },
              Holder: {
                VinylShadow: {
                  smooth: {
                    alpha: [v ? .4 : 0, {
                      duration: .6
                    }]
                  }
                }
              }
            }
          }
        });

        if (this.tag("Equalizer")) {
          this.patch({
            Details: {
              Title: {
                smooth: {
                  x: [48, {
                    duration: .3
                  }]
                }
              },
              Equalizer: {
                smooth: {
                  alpha: [1, {
                    duration: .3
                  }]
                }
              }
            }
          });
        }
      }
    }, {
      key: "startLoading",
      value: function startLoading() {
        this.tag("Loader").setSmooth("alpha", 1, {
          duration: .3
        });
      }
    }, {
      key: "stopLoading",
      value: function stopLoading() {
        this.tag("Loader").setSmooth("alpha", 0, {
          duration: .3
        });
      }
    }, {
      key: "exposeColor",
      value: function exposeColor(_ref4) {
        var color = _ref4.color;
        this.fireAncestors("$changeAmbient", {
          color: color,
          item: this
        });
      }
    }, {
      key: "_exposeColor",
      value: function _exposeColor() {
        if (!this._commonColor) {
          this._commonColor = this._getCommonColor();
          this.tag("Glow").color = this._commonColor;
        }

        if (this._commonColor !== undefined) {
          this._glowAnimation.start();

          this.exposeColor({
            color: this._commonColor
          });
        }
      }
    }, {
      key: "_getCommonColor",
      value: function _getCommonColor() {
        var image = this.tag("Image");
        var gl = this.stage.gl;

        if (gl) {
          var texture = image.texture.source.nativeTexture;
          return Tools.extractCommonColor(texture, gl, lng, {
            offset: 90,
            step: 60
          });
        }
      }
      /**
       * Gets called when the player starts playing the attached Item
       */

      /**
       * Gets called when the player starts playing the attached Item
       */

    }, {
      key: "onPlayStart",
      value: function onPlayStart() {
        this.patch({
          __create: true,
          Details: {
            Title: {
              smooth: {
                x: [this._itemType === "Station" ? 48 : 0, {
                  duration: .3
                }]
              }
            },
            Equalizer: {
              y: 11,
              x: 3,
              alpha: this._itemType === "Station" ? 1 : 0,
              type: Equalizer
            }
          }
        });
      }
      /**
       * Gets called when the player stops playing the attached Item
       */

    }, {
      key: "onPlayerStop",
      value: function onPlayerStop() {
        this.patch({
          Details: {
            Title: {
              smooth: {
                x: [0, {
                  duration: .6
                }]
              }
            }
          }
        });
        var item = this.tag("Equalizer");
        this.tag("Details").childList.remove(item);
      }
      /**
       * get called by the player when play/pause is pressed
       */

    }, {
      key: "onPlayPause",
      value: function onPlayPause(playerState) {}
    }, {
      key: "index",
      set: function set(v) {
        this._index = v;
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Item: {
            Vinyl: {
              Inner: {
                src: ux.Ui.getImageUrl("".concat(v.image.source), {
                  width: 500,
                  height: 500,
                  type: 'crop'
                })
              }
            },
            Cover: {
              Holder: {
                Rtt: {
                  Image: {
                    src: ux.Ui.getImageUrl("".concat(v.image.source), {
                      width: 500,
                      height: 500,
                      type: 'crop'
                    })
                  }
                }
              }
            }
          },
          Details: {
            Title: {
              text: {
                text: v.title
              }
            },
            Subtitle: {
              text: {
                text: v.subtitle ? v.subtitle : v.artist ? v.artist.name : ""
              }
            }
          }
        });
        this._itemType = v.constructor.name;

        if (this._itemType === "Station") {
          this.patch({
            Item: {
              __create: true,
              Station: {
                texture: lng.Tools.getRoundRect(70, 70, 35, 0, 0x00000000, true, 0xdd000000),
                x: 15,
                y: 315,
                Icon: {
                  Center: {
                    mount: .5,
                    x: 35,
                    y: 35,
                    src: App.getPath("images/station/center.png")
                  },
                  Inner: {
                    mount: .5,
                    x: 35,
                    y: 35,
                    src: App.getPath("images/station/inner.png")
                  },
                  Outer: {
                    mount: .5,
                    x: 35,
                    y: 35,
                    src: App.getPath("images/station/outer.png")
                  }
                }
              }
            },
            Details: {
              Subtitle: {
                text: {
                  text: "Station"
                }
              }
            }
          });
          this._stationAnimation = this.tag("Station").animation({
            duration: 2,
            repeat: -1,
            actions: [{
              t: 'Icon.Inner',
              p: 'alpha',
              rv: 1,
              v: {
                0: 0,
                .4: 1,
                .6: 1,
                1: 0
              }
            }, {
              t: 'Icon.Outer',
              p: 'alpha',
              rv: 1,
              v: {
                .2: 0,
                .6: 1,
                1: 0
              }
            }]
          });
        }
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Item: {
            w: 400,
            h: 400,
            transitions: {
              x: {
                duration: .6
              },
              y: {
                duration: .6
              }
            },
            Glow: {
              x: -200,
              y: -200,
              alpha: 0,
              src: App.getPath("images/glow.png"),
              transitions: {
                alpha: {
                  duration: .6
                }
              }
            },
            Shadow: {
              alpha: 0,
              y: 354,
              x: -38,
              src: App.getPath("images/cover-shadow.png")
            },
            Vinyl: {
              rotation: .4,
              pivot: .5,
              w: 400,
              h: 400,
              alpha: 0,
              rtt: true,
              Inner: {
                x: 200,
                y: 200,
                w: 200,
                h: 200,
                mount: .5
              },
              Outer: {
                w: 400,
                h: 400,
                src: App.getPath("images/vinyl.png")
              }
            },
            Cover: {
              w: 400,
              h: 400,
              InnerCover: {
                texture: lng.Tools.getRoundRect(394, 394, 4, 0, 0x00000000, true, 0xffffffff),
                alpha: 0,
                colorTop: 0xffe9e6d0,
                colorBottom: 0xffffffff,
                y: 3
              },
              Holder: {
                VinylShadow: {
                  alpha: 0,
                  x: 400,
                  src: App.getPath("images/vinyl-shadow.png")
                },
                Rtt: {
                  w: 405,
                  h: 400,
                  rtt: true,
                  Image: {
                    w: 400,
                    h: 400
                  },
                  Overlay: {
                    w: 400,
                    h: 400,
                    src: App.getPath("images/vinyl-overlay.png")
                  }
                }
              }
            },
            Loader: {
              type: Loader,
              alpha: 0
            }
          },
          Details: {
            y: 410,
            Title: {
              alpha: 1,
              transitions: {
                alpha: {
                  duration: .6
                }
              },
              text: {
                fontSize: 32,
                fontFace: "Bold",
                wordWrapWidth: 420,
                maxLines: 1,
                lineHeight: 40
              }
            },
            Subtitle: {
              alpha: 1,
              color: 0x50ffffff,
              y: 42,
              transitions: {
                alpha: {
                  duration: .6
                }
              },
              text: {
                fontSize: 28,
                fontFace: "Regular",
                wordWrapWidth: 420,
                maxLines: 1
              }
            }
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 500;
      }
    }, {
      key: "space",
      get: function get() {
        return 180;
      }
    }, {
      key: "contentWidth",
      get: function get() {
        return 1180;
      }
    }]);

    return LPCover;
  }(lng.Component);

  var TrackSmall =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(TrackSmall, _lng$Component9);

    function TrackSmall() {
      _classCallCheck(this, TrackSmall);

      return _possibleConstructorReturn(this, _getPrototypeOf(TrackSmall).apply(this, arguments));
    }

    _createClass(TrackSmall, [{
      key: "_focus",
      value: function _focus() {
        var _this7 = this;

        // delay color exposing to prevent it from reading pixels
        // while quick navigating
        this._timeout = setTimeout(function () {
          return _this7._exposeColor();
        }, 800);
        this.patch({
          Holder: {
            smooth: {
              color: 0x20ffffff
            }
          },
          Content: {
            Title: {
              smooth: {
                color: 0xfff1f1f1
              }
            },
            Artist: {
              smooth: {
                color: 0x90ffffff
              }
            },
            Duration: {
              smooth: {
                color: 0xfff1f1f1
              }
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        clearTimeout(this._timeout);
        this.patch({
          Holder: {
            smooth: {
              color: 0x15000000
            }
          },
          Content: {
            Title: {
              smooth: {
                color: 0x50ffffff
              }
            },
            Artist: {
              smooth: {
                color: 0x50ffffff
              }
            },
            Duration: {
              smooth: {
                color: 0x50ffffff
              }
            }
          }
        });
      }
    }, {
      key: "exposeColor",
      value: function exposeColor(_ref5) {
        var color = _ref5.color;
        this.fireAncestors("$changeAmbient", {
          color: color,
          item: this
        });
      }
    }, {
      key: "_exposeColor",
      value: function _exposeColor() {
        if (!this._commonColor) {
          this._commonColor = this._getCommonColor();
        }

        if (this._commonColor !== undefined) {
          this.exposeColor({
            color: this._commonColor
          });
        }
      }
    }, {
      key: "_getCommonColor",
      value: function _getCommonColor() {
        var image = this.tag("Cover");
        var gl = this.stage.gl;

        if (gl) {
          var texture = image.texture.source.nativeTexture;
          return Tools.extractCommonColor(texture, gl, lng, {
            offset: 5,
            step: 4
          });
        }
      }
      /**
       * Gets called when the player starts playing the attached Item
       */

    }, {
      key: "onPlayStart",
      value: function onPlayStart() {
        this.patch({
          __create: true,
          Equalizer: {
            x: 724,
            y: 43,
            type: Equalizer
          }
        });
      }
      /**
       * Gets called when the player stops playing the attached Item
       */

    }, {
      key: "onPlayerStop",
      value: function onPlayerStop() {
        var item = this.tag("Equalizer");
        this.childList.remove(item);
      }
    }, {
      key: "delay",
      set: function set(v) {
        this.patch({
          transitions: {
            y: {
              delay: v,
              duration: .6
            },
            alpha: {
              delay: v,
              duration: .2
            }
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this.patch({
          Content: {
            Cover: {
              src: ux.Ui.getImageUrl(v.image.source, {
                width: 70,
                height: 70,
                type: 'crop'
              })
            },
            Title: {
              text: {
                text: "".concat(v.title)
              }
            },
            Artist: {
              text: {
                text: "".concat(v.artist.name)
              }
            },
            Duration: {
              text: {
                text: "".concat(Tools.getFullTime(v.duration))
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 1,
          transitions: {
            alpha: {
              delay: .6,
              duration: .6
            }
          },
          Holder: {
            zIndex: 0,
            color: 0x15000000,
            texture: lng.Tools.getRoundRect(842, 110, 4, 0, 0x00000000, true, 0xffffffff)
          },
          Content: {
            zIndex: 1,
            x: 20,
            y: 15,
            Cover: {
              y: 5
            },
            Title: {
              color: 0x50ffffff,
              x: 100,
              text: {
                fontSize: 30,
                wordWrapWidth: 600,
                maxLines: 1,
                fontFace: "Bold"
              }
            },
            Artist: {
              color: 0x50ffffff,
              x: 100,
              y: 44,
              text: {
                fontSize: 24,
                wordWrapWidth: 600,
                maxLines: 1,
                fontFace: "Regular"
              }
            },
            Duration: {
              color: 0x50ffffff,
              y: 26,
              x: 802,
              mountX: 1,
              text: {
                fontSize: 24,
                fontFace: "Regular"
              }
            }
          }
        };
      }
    }, {
      key: "height",
      get: function get() {
        return 120;
      }
    }, {
      key: "width",
      get: function get() {
        return 872;
      }
    }]);

    return TrackSmall;
  }(lng.Component);

  var TracksObj =
  /*#__PURE__*/
  function () {
    function TracksObj(_ref6) {
      var url = _ref6.url,
          title = _ref6.title;

      _classCallCheck(this, TracksObj);

      this._rootUrl = url;
      this._title = title;
    }

    _createClass(TracksObj, [{
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }, {
      key: "rootUrl",
      get: function get() {
        return this._rootUrl;
      }
    }]);

    return TracksObj;
  }();

  var Albums =
  /*#__PURE__*/
  function () {
    function Albums(_ref7) {
      var url = _ref7.url,
          title = _ref7.title;

      _classCallCheck(this, Albums);

      this._rootUrl = url;
      this._title = title;
    }

    _createClass(Albums, [{
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }, {
      key: "rootUrl",
      get: function get() {
        return this._rootUrl;
      }
    }]);

    return Albums;
  }();

  var Stations =
  /*#__PURE__*/
  function () {
    function Stations(_ref8) {
      var url = _ref8.url,
          title = _ref8.title;

      _classCallCheck(this, Stations);

      this._rootUrl = url;
      this._title = title;
    }

    _createClass(Stations, [{
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }, {
      key: "rootUrl",
      get: function get() {
        return this._rootUrl;
      }
    }]);

    return Stations;
  }();

  var Playlists =
  /*#__PURE__*/
  function () {
    function Playlists(_ref9) {
      var url = _ref9.url,
          title = _ref9.title;

      _classCallCheck(this, Playlists);

      this._rootUrl = url;
      this._title = title;
    }

    _createClass(Playlists, [{
      key: "items",
      set: function set(v) {
        this._items = v;
      },
      get: function get() {
        return this._items;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }, {
      key: "rootUrl",
      get: function get() {
        return this._rootUrl;
      }
    }]);

    return Playlists;
  }();

  var Art =
  /*#__PURE__*/
  function () {
    function Art(props) {
      _classCallCheck(this, Art);

      this._source = props.uri;
      this._contentType = props.contentType;
      this._width = props.width;
      this._height = props.height;
      this._isIcon = props.isIcon;
    }

    _createClass(Art, [{
      key: "source",
      get: function get() {
        return this._source;
      }
    }, {
      key: "contentType",
      get: function get() {
        return this._contentType;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      }
    }, {
      key: "isIcon",
      get: function get() {
        return this._isIcon;
      }
    }]);

    return Art;
  }();

  var AudioFile =
  /*#__PURE__*/
  function () {
    function AudioFile(props) {
      _classCallCheck(this, AudioFile);

      this._source = props.uri;
      this._expires = props.expires;
      this._contentType = props.contentType;
    }

    _createClass(AudioFile, [{
      key: "source",
      get: function get() {
        return this._source;
      }
    }, {
      key: "contentType",
      get: function get() {
        return this._contentType;
      }
    }, {
      key: "expires",
      get: function get() {
        return this._expires;
      }
    }]);

    return AudioFile;
  }();

  var TrackObj =
  /*#__PURE__*/
  function () {
    function TrackObj(props) {
      _classCallCheck(this, TrackObj);

      this._audio = new AudioFile(props.audio);
      this._duration = props.duration;
      this._title = props.title;
      this._artist = props.artist;
      this._album = props.album.name;
      this._image = new Art(props.image);
      this._isExplicit = props.isExplicit;
    }

    _createClass(TrackObj, [{
      key: "album",
      get: function get() {
        return this._album;
      }
    }, {
      key: "artist",
      get: function get() {
        return this._artist;
      }
    }, {
      key: "audio",
      get: function get() {
        return this._audio;
      }
    }, {
      key: "duration",
      get: function get() {
        return this._duration / 1000;
      }
    }, {
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "isExplicit",
      get: function get() {
        return this._isExplicit;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return TrackObj;
  }();

  var Album =
  /*#__PURE__*/
  function () {
    function Album(props, nav) {
      _classCallCheck(this, Album);

      if (nav) {
        this._navigationUri = nav.description;
      }

      this._artist = props.artist;
      this._image = new Art(props.image);
      this._title = props.itemLabel;
      this._subtitle = props.subtitle;
    }

    _createClass(Album, [{
      key: "artist",
      get: function get() {
        return this._artist;
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
      key: "subtitle",
      get: function get() {
        return this._subtitle;
      }
    }, {
      key: "navigationUri",
      get: function get() {
        return this._navigationUri;
      }
    }]);

    return Album;
  }();

  var Station =
  /*#__PURE__*/
  function () {
    function Station(props, nav) {
      _classCallCheck(this, Station);

      if (nav) {
        this._navigationUri = nav.self;
      }

      this._image = new Art(props.image);
      this._title = props.itemLabel;
      this._subtitle = props.subtitle;
    }

    _createClass(Station, [{
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
      key: "subtitle",
      get: function get() {
        return this._subtitle;
      }
    }, {
      key: "navigationUri",
      get: function get() {
        return this._navigationUri;
      }
    }]);

    return Station;
  }();

  var Playlist =
  /*#__PURE__*/
  function () {
    function Playlist(props, nav) {
      _classCallCheck(this, Playlist);

      if (nav) {
        this._navigationUri = nav.description;
      }

      this._image = new Art(props.image);
      this._title = props.itemLabel;
      this._subtitle = props.subtitle;
    }

    _createClass(Playlist, [{
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
      key: "subtitle",
      get: function get() {
        return this._subtitle;
      }
    }, {
      key: "navigationUri",
      get: function get() {
        return this._navigationUri;
      }
    }]);

    return Playlist;
  }();

  var Factory =
  /*#__PURE__*/
  function () {
    function Factory() {
      _classCallCheck(this, Factory);
    }

    _createClass(Factory, null, [{
      key: "create",
      value: function create(data, stage) {
        var spread = {
          y: 0,
          signals: {
            changeAmbient: true,
            selectItem: true,
            play: true
          }
        };
        return data.map(function (obj) {
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
        var construct = obj.constructor;

        if (Factory.WRAPPER.has(construct)) {
          var container = Factory.WRAPPER.get(construct); // test first item since we only allow items
          // of the same type in a list

          var item = obj.items[0];
          var iConstruct = item.constructor;

          if (obj.hasOwnProperty("_rootUrl")) {
            spread = _objectSpread({
              rootUrl: obj.rootUrl
            }, spread);
          }

          if (Factory.ITEMS.has(iConstruct)) {
            var _construct = Factory.ITEMS.get(iConstruct);

            var _item = stage.c(_objectSpread({
              type: container,
              construct: _construct,
              items: obj.items,
              title: obj.title
            }, spread));

            return _item;
          }
        }

        return;
      }
    }]);

    return Factory;
  }();

  Factory.WRAPPER = new Map();
  Factory.WRAPPER.set(TracksObj, Tracklist);
  Factory.WRAPPER.set(Albums, List);
  Factory.WRAPPER.set(Stations, List);
  Factory.WRAPPER.set(Playlists, List);
  Factory.ITEMS = new Map();
  Factory.ITEMS.set(Album, LPCover);
  Factory.ITEMS.set(Playlist, LPCover);
  Factory.ITEMS.set(Station, LPCover);
  Factory.ITEMS.set(TrackObj, TrackSmall);

  var Track =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(Track, _lng$Component10);

    function Track() {
      _classCallCheck(this, Track);

      return _possibleConstructorReturn(this, _getPrototypeOf(Track).apply(this, arguments));
    }

    _createClass(Track, [{
      key: "_active",
      value: function _active() {
        if (this.tag("Equalizer")) {
          var app = this.fireAncestors("$getAppContents");

          if (this._isEqual(this._item, app.player.item)) {
            this.patch({
              Equalizer: {
                smooth: {
                  alpha: 1
                }
              }
            });
          }
        }
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        if (this.tag("Equalizer")) {
          this.patch({
            Equalizer: {
              smooth: {
                alpha: 0
              }
            }
          });
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Holder: {
            smooth: {
              color: 0x20ffffff
            }
          },
          Content: {
            Title: {
              smooth: {
                color: 0xfff1f1f1
              }
            },
            Artist: {
              smooth: {
                color: 0x90ffffff
              }
            },
            Duration: {
              smooth: {
                color: 0xfff1f1f1
              }
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Holder: {
            smooth: {
              color: 0x15000000
            }
          },
          Content: {
            Title: {
              smooth: {
                color: 0x50ffffff
              }
            },
            Artist: {
              smooth: {
                color: 0x50ffffff
              }
            },
            Duration: {
              smooth: {
                color: 0x50ffffff
              }
            }
          }
        });
      }
    }, {
      key: "_isEqual",
      value: function _isEqual(o1, o2) {
        var t1 = o1.title,
            s1 = o1.audio.source;
        var t2 = o2.title,
            s2 = o2.audio.source;
        return t1 === t2 && s1 === s2;
      }
      /**
       * Gets called when the player starts playing the attached Item
       */

      /**
       * Gets called when the player starts playing the attached Item
       */

    }, {
      key: "onPlayStart",
      value: function onPlayStart() {
        this.patch({
          __create: true,
          Equalizer: {
            x: 902,
            y: 43,
            type: Equalizer
          }
        });
      }
      /**
       * Gets called when the player stops playing the attached Item
       */

    }, {
      key: "onPlayerStop",
      value: function onPlayerStop() {
        var item = this.tag("Equalizer");
        this.childList.remove(item);
      }
      /**
       * get called by the player when play/pause is pressed
       */

    }, {
      key: "onPlayPause",
      value: function onPlayPause(playerState) {}
    }, {
      key: "delay",
      set: function set(v) {
        this.patch({
          transitions: {
            y: {
              delay: v,
              duration: .6
            },
            alpha: {
              delay: v,
              duration: .2
            }
          }
        });
      }
    }, {
      key: "index",
      set: function set(v) {
        this._index = v;
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Content: {
            Cover: {
              src: ux.Ui.getImageUrl(v.image.source, {
                width: 70,
                height: 70,
                type: 'crop'
              })
            },
            Title: {
              text: {
                text: "".concat(this._index + 1, ". ").concat(v.title)
              }
            },
            Artist: {
              text: {
                text: "".concat(v.artist.name)
              }
            },
            Duration: {
              text: {
                text: "".concat(Tools.getFullTime(v.duration))
              }
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
          alpha: 0,
          transitions: {
            alpha: {
              delay: .6,
              duration: .6
            }
          },
          Holder: {
            zIndex: 0,
            colorTop: 0x15000000,
            colorBottom: 0x15000000,
            texture: lng.Tools.getRoundRect(1020, 110, 4, 0, 0x00000000, true, 0xffffffff)
          },
          Content: {
            zIndex: 1,
            x: 20,
            y: 15,
            Cover: {
              y: 5
            },
            Title: {
              color: 0x50ffffff,
              x: 100,
              text: {
                fontSize: 30,
                wordWrapWidth: 770,
                maxLines: 1,
                fontFace: "Bold"
              }
            },
            Artist: {
              color: 0x50ffffff,
              x: 100,
              y: 44,
              text: {
                fontSize: 24,
                wordWrapWidth: 770,
                maxLines: 1,
                fontFace: "Regular"
              }
            },
            Duration: {
              color: 0x50ffffff,
              y: 26,
              x: 980,
              mountX: 1,
              text: {
                fontSize: 24,
                fontFace: "Bold"
              }
            }
          }
        };
      }
    }, {
      key: "height",
      get: function get() {
        return 120;
      }
    }, {
      key: "width",
      get: function get() {}
    }]);

    return Track;
  }(lng.Component);

  var Tracks =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(Tracks, _lng$Component11);

    function Tracks() {
      _classCallCheck(this, Tracks);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tracks).apply(this, arguments));
    }

    _createClass(Tracks, [{
      key: "_moveAxis",
      value: function _moveAxis() {
        if (this._index >= 3) {
          for (var i = 0; i < this._listItems.length; i++) {
            var item = this._listItems[i];
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
    }, {
      key: "reset",
      value: function reset() {
        this._index = 0;

        for (var i = 0; i < this._listItems.length; i++) {
          var item = this._listItems[i];
          item.delay = i < 8 ? .2 + 0.1 * i : 0;
        }

        this.tag("Items").setSmooth("y", -(this._index * this._itemSize));
      }
    }, {
      key: "_active",
      value: function _active() {
        this._listItems = this.tag("Items").children;
        this._index = 0;

        for (var i = 0; i < this._listItems.length; i++) {
          var item = this._listItems[i];

          if (i < 9) {
            item.setSmooth("alpha", 1);
          } else {
            item.setSmooth("alpha", 0);
          }

          item.setSmooth("y", item.y - 80);
          item.delay = 0;
        }
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this.reset();
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._playerHasFocus = false;
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        if (this._playerHasFocus) {
          return;
        }

        for (var i = 0; i < this._listItems.length; i++) {
          var item = this._listItems[i];
          item.setSmooth("alpha", 0);
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this._index > 0) {
          this._index--;

          this._moveAxis();
        } else {
          this._playerHasFocus = true;
          this.fireAncestors("$focusOnPlayer");
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this._index < this._tracks.length - 1) {
          this._index++;

          this._moveAxis();
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "index",
      get: function get() {
        return this._index;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag("Items").children[this._index];
      }
    }, {
      key: "tracks",
      get: function get() {
        return this.tag("Items").children;
      },
      set: function set(v) {
        var _this8 = this;

        this._tracks = v;
        this.tag("Items").patch({
          children: this._tracks.map(function (item, index) {
            return {
              type: Track,
              ref: "A-Track-".concat(index),
              index: index,
              item: item,
              y: index * _this8._itemSize + 80,
              delay: index < 8 ? .2 + 0.1 * index : 0
            };
          })
        });
      }
    }, {
      key: "itemSize",
      set: function set(v) {
        this._itemSize = v;
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
      }
    }, {
      key: "isPlaying",
      set: function set(v) {
        if (v) {
          this._setState("Playing");
        } else {
          this._setState("Stopped");
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          List: {
            Clipper: {
              Items: {}
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this9) {
          _inherits(Playing, _this9);

          function Playing() {
            _classCallCheck(this, Playing);

            return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
          }

          return Playing;
        }(this),
        /*#__PURE__*/
        function (_this10) {
          _inherits(Stopped, _this10);

          function Stopped() {
            _classCallCheck(this, Stopped);

            return _possibleConstructorReturn(this, _getPrototypeOf(Stopped).apply(this, arguments));
          }

          return Stopped;
        }(this)];
      }
    }]);

    return Tracks;
  }(lng.Component);

  var Home =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(Home, _lng$Component12);

    function Home() {
      _classCallCheck(this, Home);

      return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
    }

    _createClass(Home, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
        this._lists = this.tag("Lists");
        this._eq = 1;

        this._setState("Loading");
      }
    }, {
      key: "_select",
      value: function _select(_ref11) {
        var offset = _ref11.offset;
        var scrollOffset = 0;
        this._index += offset;

        if (offset === 1 && this.items[this._index - 1]) {
          this.items[this._index - 1].setSmooth("alpha", 0, {
            duration: .6
          });
        }

        this.items[this._index].setSmooth("alpha", 1, {
          duration: .6
        });

        for (var i = 0, j = this.items.length; i < j; i++) {
          var item = this.items[i];

          if (i < this._index) {
            scrollOffset += item.constructor.height;
          } else {
            break;
          }
        }

        this.patch({
          Clipper: {
            Content: {
              smooth: {
                y: offset ? scrollOffset * -1 - 60 : -60
              }
            }
          }
        });
      }
    }, {
      key: "stopActiveCover",
      value: function stopActiveCover() {
        if (this._activeCover) {
          this._activeCover.onPlayerStop();
        }
      }
    }, {
      key: "_spinActiveCover",
      value: function _spinActiveCover() {
        this._activeCover = this.activeList.active.child;

        this._activeCover.onPlayStart();
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "activeList",
      get: function get() {
        return this._lists.children[this._index];
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Lists").children;
      }
    }, {
      key: "backgroundColor",
      get: function get() {
        return this._backgroundColor;
      }
    }, {
      key: "data",
      set: function set(v) {
        this.tag("Lists").patch({
          children: Factory.create(v, this.stage)
        });

        this._setState("Loading");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            w: 1920,
            h: 1080,
            color: 0xff242b3f,
            src: App.getPath("images/background.png")
          },
          Clipper: {
            w: 1920,
            h: 840,
            y: 240,
            transitions: {
              y: {
                duration: .6
              },
              x: {
                duration: .6
              }
            },
            Content: {
              transitions: {
                y: {
                  duration: .8
                }
              },
              Lists: {
                x: 88,
                y: 120,
                transitions: {
                  y: {
                    duration: .8
                  }
                }
              }
            },
            Tracks: {
              y: 125,
              x: 600,
              type: Tracks,
              itemSize: 120
            }
          },
          Logo: {
            x: 88,
            y: 68,
            src: App.getPath("images/logo.png"),
            transitions: {
              y: {
                duration: .6
              },
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
        function (_this11) {
          _inherits(Loading, _this11);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$firstItemCreated",
            value: function $firstItemCreated() {
              this._setState("Lists");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this12) {
          _inherits(Lists, _this12);

          function Lists() {
            _classCallCheck(this, Lists);

            return _possibleConstructorReturn(this, _getPrototypeOf(Lists).apply(this, arguments));
          }

          _createClass(Lists, [{
            key: "_handleUp",
            value: function _handleUp() {
              if (this._index > 0) {
                this._select({
                  offset: -1
                });
              } else {
                return false;
              }
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this._index < this._lists.children.length - 1) {
                this._select({
                  offset: 1
                });
              }
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              var steps = this._index;

              if (this._index > 0) {
                while (steps--) {
                  this._select({
                    offset: -1
                  });
                }
              } else {
                return false;
              }
            }
          }, {
            key: "$changeAmbient",
            value: function $changeAmbient(_ref12) {
              var color = _ref12.color;
              this._backgroundColor = color - 0xcc000000;
              this.patch({
                Background: {
                  smooth: {
                    color: [color, {
                      duration: 4
                    }]
                  }
                }
              });
            }
          }, {
            key: "$selectItem",
            value: function $selectItem(_ref13) {
              var _this13 = this;

              var item = _ref13.item,
                  list = _ref13.list;
              this.tag("Tracks").alpha = 0;

              if (list.rootUrl && item.navigationUri) {
                this.api.deepNavigateInNode("".concat(list.rootUrl).concat(item.navigationUri)).then(function (response) {
                  // @todo: better handling / move to api?
                  if (item.constructor === Station) {
                    _this13.fireAncestors("$play", {
                      sourceList: list,
                      items: response.items,
                      index: 0
                    });

                    list.loadingReady();

                    _this13._spinActiveCover();
                  } else {
                    _this13._tracksReceived({
                      item: item,
                      response: response,
                      list: list
                    });
                  }
                });
              }
            }
          }, {
            key: "_tracksReceived",
            value: function _tracksReceived(_ref14) {
              var item = _ref14.item,
                  items = _ref14.response.items;
              this._playables = items;
              this.tag("Tracks").patch({
                item: item,
                tracks: items,
                smooth: {
                  alpha: 1
                }
              });
              this.fireAncestors("$playerState", {
                state: "Snapped"
              });
              this.activeList.expand();

              this._setState("Tracks");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.activeList;
            }
          }]);

          return Lists;
        }(this),
        /*#__PURE__*/
        function (_this14) {
          _inherits(Tracks$$1, _this14);

          function Tracks$$1() {
            _classCallCheck(this, Tracks$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Tracks$$1).apply(this, arguments));
          }

          _createClass(Tracks$$1, [{
            key: "$enter",
            value: function $enter() {
              var nextList = this.tag("Lists").children[this._index + 1];

              if (nextList) {
                nextList.patch({
                  smooth: {
                    alpha: [0, {
                      duration: .6
                    }],
                    y: [nextList.y + 100, {
                      duration: .6
                    }]
                  }
                });
              }

              this.patch({
                Logo: {
                  smooth: {
                    x: 176,
                    y: 88
                  }
                },
                Clipper: {
                  smooth: {
                    x: 88,
                    y: 170
                  }
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              var nextList = this.tag("Lists").children[this._index + 1];

              if (nextList) {
                nextList.patch({
                  smooth: {
                    alpha: [1, {
                      duration: .6
                    }],
                    y: [nextList.y - 100, {
                      duration: .6
                    }]
                  }
                });
              }

              this.patch({
                Logo: {
                  smooth: {
                    x: 88,
                    y: 68
                  }
                },
                Clipper: {
                  smooth: {
                    x: 0,
                    y: 240
                  }
                }
              });
              this.activeList.collapse();
              this.fireAncestors("$playerState", {
                state: "Minimal"
              });
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.fireAncestors("$play", {
                sourceList: this.tag("Tracks").tracks,
                items: this._playables,
                index: this.tag("Tracks").index,
                snapPlayer: true
              });

              this._spinActiveCover();
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("Lists");
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this._setState("Lists");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Tracks");
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this15) {
                _inherits(Playing, _this15);

                function Playing() {
                  _classCallCheck(this, Playing);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
                }

                _createClass(Playing, [{
                  key: "$enter",
                  value: function $enter() {
                    this.tag("Tracks").isPlaying = true;
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("Tracks").isPlaying = false;
                  }
                }]);

                return Playing;
              }(this)];
            }
          }]);

          return Tracks$$1;
        }(this)];
      }
    }]);

    return Home;
  }(lng.Component);

  Home.OPTIONS = {
    HEIGHT: 680,
    WIDTH: 500,
    SPACING: 280
  };

  var Pairing =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(Pairing, _lng$Component13);

    function Pairing() {
      _classCallCheck(this, Pairing);

      return _possibleConstructorReturn(this, _getPrototypeOf(Pairing).apply(this, arguments));
    }

    _createClass(Pairing, [{
      key: "code",
      set: function set(v) {
        this._code = v;
        this.patch({
          smooth: {
            y: [820, {
              duration: .6
            }]
          },
          Code: {
            smooth: {
              alpha: [1, {
                duration: .6
              }],
              y: [32, {
                duration: 1
              }]
            },
            text: {
              text: "".concat(v)
            }
          }
        });
      }
    }, {
      key: "uri",
      set: function set(v) {
        this._uri = v;
        this.patch({
          Description: {
            smooth: {
              alpha: 1
            },
            Uri: {
              text: {
                text: "".concat(v)
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          y: 860,
          Description: {
            flex: {
              direction: "row"
            },
            mountX: .5,
            x: 960,
            alpha: 0,
            Label: {
              flexItem: {},
              text: {
                fontSize: 28,
                text: "To sign in, visit",
                fontFace: "Regular"
              }
            },
            Uri: {
              flexItem: {
                marginLeft: 12
              },
              color: 0xff4cc3f4,
              text: {
                fontSize: 28,
                text: "",
                fontFace: "Regular"
              }
            }
          },
          Code: {
            mountX: .5,
            x: 960,
            y: 64,
            alpha: 0,
            text: {
              text: "",
              fontSize: 124,
              fontFace: "Bold"
            }
          }
        };
      }
    }]);

    return Pairing;
  }(lng.Component);

  var Authentication =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(Authentication, _lng$Component14);

    function Authentication() {
      _classCallCheck(this, Authentication);

      return _possibleConstructorReturn(this, _getPrototypeOf(Authentication).apply(this, arguments));
    }

    _createClass(Authentication, [{
      key: "_init",
      value: function _init() {
        this._setState("RequestingCode");
      }
    }, {
      key: "_active",
      value: function _active() {
        this._startPairing();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        clearTimeout(this._timeout);
        clearInterval(this._isPairedInterval);
      }
    }, {
      key: "_startPairing",
      value: function _startPairing() {
        var _this16 = this;

        this.fireAncestors("$startLoading");
        this.api.auth.startPairing().then(function (props) {
          _this16._ready({
            props: props
          });
        }).catch(function (err) {
          _this16._error({
            err: err
          });
        });
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          RequestingCode: {//@todo: loader, message: "RequestingCode" ?
          },
          CodeExpired: {// @tood: screen with message: "code expired, please re-pair"
          },
          Pairing: {
            type: Pairing
          },
          Success: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this17) {
          _inherits(RequestingCode, _this17);

          function RequestingCode() {
            _classCallCheck(this, RequestingCode);

            return _possibleConstructorReturn(this, _getPrototypeOf(RequestingCode).apply(this, arguments));
          }

          _createClass(RequestingCode, [{
            key: "_ready",
            value: function _ready(_ref15) {
              var props = _ref15.props;
              this.fireAncestors("$stopLoading");
              this._devicecode = props.device_code;
              this._usercode = props.user_code;
              this.tag("Pairing").code = props.user_code;
              this.tag("Pairing").uri = props.verification_uri;

              this._setState("Pairing");
            }
          }, {
            key: "_error",
            value: function _error(_ref16) {
              var err = _ref16.err;
            }
          }]);

          return RequestingCode;
        }(this),
        /*#__PURE__*/
        function (_this18) {
          _inherits(Pairing$$1, _this18);

          function Pairing$$1() {
            _classCallCheck(this, Pairing$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Pairing$$1).apply(this, arguments));
          }

          _createClass(Pairing$$1, [{
            key: "$enter",
            value: function $enter() {
              var _this19 = this;

              this._isPairedInterval = setInterval(function () {
                _this19.api.auth.requestToken({
                  devicecode: _this19._devicecode,
                  usercode: _this19._usercode
                }).then(function (response) {
                  if (response.hasOwnProperty("error")) {
                    var error = response.error;

                    if (error === "invalid_code_pair") {
                      return _this19._codeIsExpired();
                    } else if (error === "authorization_pending") {
                      return;
                    }
                  } else if (response.hasOwnProperty("access_token")) {
                    _this19._success();
                  }
                });
              }, 2000);
            }
          }, {
            key: "_codeIsExpired",
            value: function _codeIsExpired() {
              this._setState("Pairing.Expired");
            }
          }, {
            key: "_success",
            value: function _success() {
              this._setState("Pairing.SuccessFull");
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this20) {
                _inherits(Expired, _this20);

                function Expired() {
                  _classCallCheck(this, Expired);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Expired).apply(this, arguments));
                }

                _createClass(Expired, [{
                  key: "$enter",
                  value: function $enter() {
                    var _this21 = this;

                    clearInterval(this._isPairedInterval);
                    this.tag("CodeExpired").setSmooth("alpha", 1);
                    this._timeout = setTimeout(function () {
                      _this21._startPairing();
                    }, 4000);
                  }
                }]);

                return Expired;
              }(this),
              /*#__PURE__*/
              function (_this22) {
                _inherits(SuccessFull, _this22);

                function SuccessFull() {
                  _classCallCheck(this, SuccessFull);

                  return _possibleConstructorReturn(this, _getPrototypeOf(SuccessFull).apply(this, arguments));
                }

                _createClass(SuccessFull, [{
                  key: "$enter",
                  value: function $enter() {
                    var _this23 = this;

                    clearInterval(this._isPairedInterval);
                    this.tag("Success").setSmooth("alpha", 1);
                    this._timeout = setTimeout(function () {
                      _this23.signal("completed");
                    }, 1000);
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("Success").setSmooth("alpha", 1);
                  }
                }]);

                return SuccessFull;
              }(this)];
            }
          }]);

          return Pairing$$1;
        }(this)];
      }
    }]);

    return Authentication;
  }(lng.Component);

  var Progress =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(Progress, _lng$Component15);

    function Progress() {
      _classCallCheck(this, Progress);

      return _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
    }

    _createClass(Progress, [{
      key: "setProgress",
      value: function setProgress(currentTime, duration) {
        this._currentTime = currentTime;
        this._duration = duration;
        this._progress = currentTime / Math.max(duration, 1);
        this.tag("CurrentTime").text = Player.formatTime(currentTime);
        this.tag("Duration").text = Player.formatTime(duration);
      }
    }, {
      key: "_repaint",
      value: function _repaint() {
        this.patch({
          Progress: {
            Duration: {
              smooth: {
                x: [Progress.width, {
                  duration: .6
                }]
              }
            },
            Bar: {
              Border: {
                smooth: {
                  w: [Progress.width, {
                    duration: .6
                  }]
                }
              },
              Total: {
                smooth: {
                  w: [Progress.width, {
                    duration: .6
                  }]
                }
              }
            }
          }
        });
        this.setProgress(this._currentTime, this._duration);
      }
    }, {
      key: "cstate",
      set: function set(v) {
        this._setState(v);
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
        this.tag("Active").setSmooth('w', Math.max(x, 0.0001)
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
          y: 66,
          Progress: {
            forceZIndexContext: true,
            CurrentTime: {
              alpha: 0,
              y: -5,
              color: 0x50ffffff,
              text: {
                fontSize: 19,
                lineHeight: 34,
                fontFace: "Regular",
                wordWrapWidth: 400,
                maxLines: 1,
                text: "00:00"
              }
            },
            Duration: {
              alpha: 0,
              x: Progress.width,
              y: -5,
              mountX: 1,
              color: 0x50ffffff,
              text: {
                fontSize: 19,
                lineHeight: 34,
                fontFace: "Regular",
                wordWrapWidth: 400,
                maxLines: 1,
                text: "00:00"
              }
            },
            Bar: {
              y: 31,
              Total: {
                h: 3,
                rect: true,
                w: Progress.width,
                color: 0x50000000
              },
              Active: {
                color: 0xffffffff,
                h: 3,
                rect: true
              },
              Border: {
                h: 1,
                y: 4,
                rect: true,
                w: Progress.width,
                color: 0x20ffffff
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
        return [
        /*#__PURE__*/
        function (_this24) {
          _inherits(Minimal, _this24);

          function Minimal() {
            _classCallCheck(this, Minimal);

            return _possibleConstructorReturn(this, _getPrototypeOf(Minimal).apply(this, arguments));
          }

          _createClass(Minimal, [{
            key: "$enter",
            value: function $enter() {
              Progress.width = 580;
              this.patch({
                smooth: {
                  y: [66, {
                    duration: .6
                  }]
                },
                Progress: {
                  CurrentTime: {
                    smooth: {
                      alpha: [0, {
                        duration: .3
                      }]
                    }
                  },
                  Duration: {
                    smooth: {
                      alpha: [0, {
                        duration: .3
                      }]
                    }
                  }
                }
              });

              this._repaint();
            }
          }]);

          return Minimal;
        }(this),
        /*#__PURE__*/
        function (_this25) {
          _inherits(Snapped, _this25);

          function Snapped() {
            _classCallCheck(this, Snapped);

            return _possibleConstructorReturn(this, _getPrototypeOf(Snapped).apply(this, arguments));
          }

          _createClass(Snapped, [{
            key: "$enter",
            value: function $enter() {
              Progress.width = 1020;
              this.patch({
                smooth: {
                  y: [108, {
                    duration: .6
                  }]
                },
                Progress: {
                  CurrentTime: {
                    smooth: {
                      alpha: [1, {
                        duration: .6
                      }]
                    }
                  },
                  Duration: {
                    smooth: {
                      alpha: [1, {
                        duration: .6
                      }]
                    }
                  }
                }
              });

              this._repaint();
            }
          }]);

          return Snapped;
        }(this)];
      }
    }]);

    return Progress;
  }(lng.Component);

  Progress.width = 580;

  var Metadata =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(Metadata, _lng$Component16);

    function Metadata() {
      _classCallCheck(this, Metadata);

      return _possibleConstructorReturn(this, _getPrototypeOf(Metadata).apply(this, arguments));
    }

    _createClass(Metadata, [{
      key: "update",
      value: function update(item) {
        var _this26 = this;

        this.tag("Image").alpha = 0.0001;
        this.patch({
          Image: {
            src: item.image.source
          },
          Title: {
            smooth: {
              x: [90, {
                duration: .3
              }]
            },
            text: {
              text: item.title
            }
          },
          Artist: {
            smooth: {
              x: [90, {
                duration: .3
              }]
            },
            text: {
              text: item.artist.name
            }
          }
        });
        this.tag("Image").on("txLoaded", function () {
          _this26.tag("Image").setSmooth("alpha", 1, {
            duration: .6
          });
        });
      }
    }, {
      key: "cstate",
      set: function set(v) {
        this._setState(v);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          y: 15,
          Image: {
            w: 60,
            h: 60,
            alpha: 0,
            y: 5
          },
          Title: {
            text: {
              text: 'Select song',
              fontSize: 32,
              fontFace: "Bold",
              wordWrapWidth: 400,
              maxLines: 1
            }
          },
          Artist: {
            y: 44,
            color: 0x50ffffff,
            text: {
              text: '...',
              fontSize: 24,
              fontFace: "Regular",
              wordWrapWidth: 400,
              maxLines: 1
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this27) {
          _inherits(Minimal, _this27);

          function Minimal() {
            _classCallCheck(this, Minimal);

            return _possibleConstructorReturn(this, _getPrototypeOf(Minimal).apply(this, arguments));
          }

          _createClass(Minimal, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Title: {
                  text: {
                    wordWrapWidth: 350
                  }
                },
                Artist: {
                  text: {
                    wordWrapWidth: 350
                  }
                }
              });
            }
          }]);

          return Minimal;
        }(this),
        /*#__PURE__*/
        function (_this28) {
          _inherits(Snapped, _this28);

          function Snapped() {
            _classCallCheck(this, Snapped);

            return _possibleConstructorReturn(this, _getPrototypeOf(Snapped).apply(this, arguments));
          }

          _createClass(Snapped, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Title: {
                  text: {
                    wordWrapWidth: 800
                  }
                },
                Artist: {
                  text: {
                    wordWrapWidth: 800
                  }
                }
              });
            }
          }]);

          return Snapped;
        }(this)];
      }
    }]);

    return Metadata;
  }(lng.Component);

  var Actions =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(Actions, _lng$Component17);

    function Actions() {
      _classCallCheck(this, Actions);

      return _possibleConstructorReturn(this, _getPrototypeOf(Actions).apply(this, arguments));
    }

    _createClass(Actions, [{
      key: "_init",
      value: function _init() {
        this._index = 1;

        this._setState("Minimal");
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.activeControl;
      }
    }, {
      key: "cstate",
      set: function set(v) {
        this._setState(v);
      }
    }, {
      key: "paused",
      set: function set(v) {
        this.tag("PlayPause").src = App.getPath("images/player/".concat(v ? "play" : "pause", ".png"));
      }
    }, {
      key: "controls",
      get: function get() {
        return this.children;
      }
    }, {
      key: "activeControl",
      get: function get() {
        return this.controls[this._index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: Actions.width + 17,
          y: 28,
          w: 150,
          mountX: 1,
          h: 50,
          Previous: {
            alpha: 0,
            type: ActionItem,
            image: "previous.png",
            command: "$previous"
          },
          PlayPause: {
            type: ActionItem,
            image: "pause.png",
            command: "$playPause"
          },
          Next: {
            alpha: 0,
            type: ActionItem,
            x: 100,
            image: "next.png",
            command: "$next"
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this29) {
          _inherits(Minimal, _this29);

          function Minimal() {
            _classCallCheck(this, Minimal);

            return _possibleConstructorReturn(this, _getPrototypeOf(Minimal).apply(this, arguments));
          }

          _createClass(Minimal, [{
            key: "_focus",
            value: function _focus() {
              this._setState("Minimal.Selected");
            }
          }, {
            key: "_unfocus",
            value: function _unfocus() {
              this._setState("Minimal");
            }
          }, {
            key: "$enter",
            value: function $enter() {
              Actions.width = 550;
              this.patch({
                smooth: {
                  w: [50, {
                    duration: .6
                  }],
                  x: [Actions.width + 17, {
                    duration: .6
                  }]
                },
                Previous: {
                  smooth: {
                    alpha: [0, {
                      duration: .3
                    }]
                  }
                },
                PlayPause: {
                  smooth: {
                    x: [0, {
                      duration: .6
                    }]
                  }
                },
                Next: {
                  smooth: {
                    alpha: [0, {
                      duration: .3
                    }]
                  }
                }
              });
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this30) {
                _inherits(Selected, _this30);

                function Selected() {
                  _classCallCheck(this, Selected);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Selected).apply(this, arguments));
                }

                _createClass(Selected, [{
                  key: "_handleEnter",
                  value: function _handleEnter() {
                    this.fireAncestors(this.activeControl.command);
                  }
                }]);

                return Selected;
              }(this)];
            }
          }]);

          return Minimal;
        }(this),
        /*#__PURE__*/
        function (_this31) {
          _inherits(Snapped, _this31);

          function Snapped() {
            _classCallCheck(this, Snapped);

            return _possibleConstructorReturn(this, _getPrototypeOf(Snapped).apply(this, arguments));
          }

          _createClass(Snapped, [{
            key: "_focus",
            value: function _focus() {
              this._setState("Snapped.Selected");
            }
          }, {
            key: "_unfocus",
            value: function _unfocus() {
              this._setState("Snapped");
            }
          }, {
            key: "$enter",
            value: function $enter() {
              Actions.width = 1010;
              this.patch({
                smooth: {
                  w: [150, {
                    duration: .6
                  }],
                  x: [Actions.width + 17, {
                    duration: .6
                  }]
                },
                Previous: {
                  smooth: {
                    alpha: [1, {
                      delay: .2,
                      duration: .6
                    }]
                  }
                },
                PlayPause: {
                  smooth: {
                    x: [50, {
                      duration: .6
                    }]
                  }
                },
                Next: {
                  smooth: {
                    alpha: [1, {
                      delay: .2,
                      duration: .6
                    }]
                  }
                }
              });
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this32) {
                _inherits(Selected, _this32);

                function Selected() {
                  _classCallCheck(this, Selected);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Selected).apply(this, arguments));
                }

                _createClass(Selected, [{
                  key: "_handleLeft",
                  value: function _handleLeft() {
                    if (this._index === 0) {
                      this._index = this.controls.length - 1;
                    } else {
                      this._index -= 1;
                    }
                  }
                }, {
                  key: "_handleRight",
                  value: function _handleRight() {
                    if (this._index < this.controls.length - 1) {
                      this._index += 1;
                    } else {
                      this._index = 0;
                    }
                  }
                }, {
                  key: "_handleEnter",
                  value: function _handleEnter() {
                    this.fireAncestors(this.activeControl.command);
                  }
                }]);

                return Selected;
              }(this)];
            }
          }]);

          return Snapped;
        }(this)];
      }
    }]);

    return Actions;
  }(lng.Component);

  Actions.width = 550;

  var ActionItem =
  /*#__PURE__*/
  function (_lng$Component18) {
    _inherits(ActionItem, _lng$Component18);

    function ActionItem() {
      _classCallCheck(this, ActionItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ActionItem).apply(this, arguments));
    }

    _createClass(ActionItem, [{
      key: "_focus",
      value: function _focus() {
        this.setSmooth("color", 0xffffffff);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.setSmooth("color", 0x50ffffff);
      }
    }, {
      key: "command",
      set: function set(v) {
        this._command = v;
      },
      get: function get() {
        return this._command;
      }
    }, {
      key: "image",
      set: function set(v) {
        this.src = App.getPath("images/player/".concat(v));
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          color: 0x50ffffff
        };
      }
    }]);

    return ActionItem;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component19) {
    _inherits(Player, _lng$Component19);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "_init",
      value: function _init() {
        this.setState({
          state: "Minimal"
        });
      }
    }, {
      key: "startPlaying",
      value: function startPlaying(_ref17) {
        var source = _ref17.sourceList,
            items = _ref17.items,
            _ref17$index = _ref17.index,
            index = _ref17$index === void 0 ? 0 : _ref17$index,
            _ref17$snapPlayer = _ref17.snapPlayer,
            snapPlayer = _ref17$snapPlayer === void 0 ? false : _ref17$snapPlayer;
        this._source = source;
        var item = items[index];
        this.play({
          items: items,
          item: item
        });

        if (snapPlayer) {
          this.setState({
            state: "Snapped"
          });
        }

        return !!this._stream;
      }
    }, {
      key: "_setItem",
      value: function _setItem(item) {
        this._item = item;
        this._index = this._items.indexOf(item);

        try {
          this._stream = item.audio.source;
          this.tag("Progress").setProgress(0, 0);
        } catch (e) {}

        this.tag("Metadata").update(item);

        this._invokeEqualizer();

        this.application.updateFocusSettings();
      }
    }, {
      key: "setState",
      value: function setState(_ref18) {
        var state = _ref18.state;

        this._setState(state, [{
          affected: {
            Metadata: {
              cstate: state
            },
            Progress: {
              cstate: state
            },
            Actions: {
              cstate: state
            }
          }
        }]);
      }
    }, {
      key: "_invokeEqualizer",
      value: function _invokeEqualizer() {
        var active = this._activeEqualizerHolder;

        if (active) {
          active.onPlayerStop();
          this._activeEqualizerHolder = null;
        }

        if (this._source.constructor === Tracklist) {
          active = this._source.active.child;
        } else {
          active = this._source[this._index];
        }

        if (active) {
          active.onPlayStart();
          this._activeEqualizerHolder = active;
        }
      }
    }, {
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this.$next();
      }
    }, {
      key: "play",
      value: function play(_ref19) {
        var item = _ref19.item,
            items = _ref19.items;
        this._items = items;

        this._setItem(item);
      }
    }, {
      key: "$previous",
      value: function $previous() {
        var index = this._index - 1;

        if (index < 0) {
          index = this._items.length - 1;
        }

        this._setItem(this._items[index]);
      }
    }, {
      key: "$next",
      value: function $next() {
        if (!this._items.length) {
          return this.signal('playerStop');
        }

        var index = (this._index + 1) % this._items.length;

        this._setItem(this._items[index]);
      }
    }, {
      key: "$playPause",
      value: function $playPause() {
        this.application.mediaplayer.playPause();
      }
    }, {
      key: "$mediaplayerPause",
      value: function $mediaplayerPause() {
        this.tag("Actions").paused = true;
      }
    }, {
      key: "$mediaplayerPlay",
      value: function $mediaplayerPlay() {
        this.tag("Actions").paused = false;
      }
    }, {
      key: "$mediaplayerStop",
      value: function $mediaplayerStop() {
        this.signal('playerStop');
      }
    }, {
      key: "$mediaplayerProgress",
      value: function $mediaplayerProgress(_ref20) {
        var currentTime = _ref20.currentTime,
            duration = _ref20.duration;
        this.tag("Progress").setProgress(currentTime, duration);
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
    }, {
      key: "item",
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Player: {
            x: 1237,
            y: 88,
            Metadata: {
              type: Metadata
            },
            Progress: {
              type: Progress
            },
            Actions: {
              type: Actions
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this33) {
          _inherits(Minimal, _this33);

          function Minimal() {
            _classCallCheck(this, Minimal);

            return _possibleConstructorReturn(this, _getPrototypeOf(Minimal).apply(this, arguments));
          }

          _createClass(Minimal, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Player: _objectSpread({
                  smooth: {
                    x: [1237, {
                      delay: 0,
                      duration: .6
                    }],
                    y: [88, {
                      delay: 0,
                      duration: .6
                    }]
                  }
                }, arguments[1].affected)
              });
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.$playPause();
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Actions");
            }
          }]);

          return Minimal;
        }(this),
        /*#__PURE__*/
        function (_this34) {
          _inherits(Snapped, _this34);

          function Snapped() {
            _classCallCheck(this, Snapped);

            return _possibleConstructorReturn(this, _getPrototypeOf(Snapped).apply(this, arguments));
          }

          _createClass(Snapped, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Player: _objectSpread({
                  smooth: {
                    x: [687, {
                      delay: 0,
                      duration: .6
                    }],
                    y: [88, {
                      delay: 0,
                      duration: .6
                    }]
                  }
                }, arguments[1].affected)
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Actions");
            }
          }]);

          return Snapped;
        }(this)];
      }
    }, {
      key: "formatTime",
      value: function formatTime(seconds) {
        if (seconds === undefined) seconds = 0;
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

    return Player;
  }(lng.Component);

  var Splash =
  /*#__PURE__*/
  function (_lng$Component20) {
    _inherits(Splash, _lng$Component20);

    function Splash() {
      _classCallCheck(this, Splash);

      return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
    }

    _createClass(Splash, [{
      key: "_init",
      value: function _init() {
        this._showLogo = this.tag("Content").animation({
          duration: 1.05,
          actions: [{
            t: '',
            p: 'y',
            v: {
              0: {
                v: 620
              },
              .4: {
                v: 540
              }
            }
          }, {
            t: 'Clipper',
            p: 'w',
            v: {
              0: {
                v: 0
              },
              .6: {
                v: 500
              }
            }
          }, {
            t: 'Box.M',
            p: 'y',
            v: {
              0: {
                v: 100
              },
              .2: {
                v: 36
              }
            }
          }, {
            t: 'Box.M',
            p: 'alpha',
            v: {
              0: {
                v: 0
              },
              .2: {
                v: 1
              }
            }
          }, {
            t: 'Box.U',
            p: 'y',
            v: {
              .1: {
                v: 100
              },
              .3: {
                v: 36
              }
            }
          }, {
            t: 'Box.U',
            p: 'alpha',
            v: {
              .1: {
                v: 0
              },
              .3: {
                v: 1
              }
            }
          }, {
            t: 'Box.S',
            p: 'y',
            v: {
              .2: {
                v: 100
              },
              .4: {
                v: 36
              }
            }
          }, {
            t: 'Box.S',
            p: 'alpha',
            v: {
              .2: {
                v: 0
              },
              .4: {
                v: 1
              }
            }
          }, {
            t: 'Box.I',
            p: 'y',
            v: {
              .3: {
                v: 64
              },
              .5: {
                v: 0
              }
            }
          }, {
            t: 'Box.I',
            p: 'alpha',
            v: {
              .3: {
                v: 0
              },
              .5: {
                v: 1
              }
            }
          }, {
            t: 'Box.C',
            p: 'y',
            v: {
              .4: {
                v: 100
              },
              .6: {
                v: 36
              }
            }
          }, {
            t: 'Box.C',
            p: 'alpha',
            v: {
              .4: {
                v: 0
              },
              .6: {
                v: 1
              }
            }
          }]
        });
        this._loaderAnimation = this.tag("Loader").animation({
          duration: 1,
          repeat: -1,
          actions: [{
            t: 'Inner',
            p: 'scale',
            v: {
              0: {
                v: 1
              },
              .33: {
                v: 1.2
              },
              1: {
                v: 1
              }
            }
          }, {
            t: 'Outer',
            p: 'alpha',
            v: {
              0: {
                v: 1
              },
              22: {
                v: 1
              },
              1: {
                v: 0
              }
            }
          }, {
            t: 'Outer',
            p: 'scale',
            v: {
              0: {
                v: 1
              },
              .22: {
                v: 1.2
              },
              1: {
                v: 2.2
              }
            }
          }]
        });
      }
    }, {
      key: "_active",
      value: function _active() {
        var _this35 = this;

        var colors = [0xff03bbff, 0xffec5cc6, 0xff92e141, 0xff46d270, 0xff6575e0, 0xff64258a];
        var count = 0;

        this._changeAmbient(colors[count]);

        this._interval = setInterval(function () {
          if (count > 5) {
            count = 0;
          }

          _this35._changeAmbient(colors[count]);

          count++;
        }, 4000);

        this._showLogo.start();
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        clearInterval(this._interval);

        this._showLogo.stop();
      }
    }, {
      key: "startLoading",
      value: function startLoading() {
        this.patch({
          Loader: {
            smooth: {
              alpha: [1, {
                delay: .2,
                duration: .6
              }]
            }
          }
        });

        this._loaderAnimation.start();
      }
    }, {
      key: "stopLoading",
      value: function stopLoading() {
        this.patch({
          Loader: {
            smooth: {
              alpha: [0, {
                delay: 0,
                duration: .3
              }]
            }
          }
        });

        this._loaderAnimation.stop();
      }
    }, {
      key: "_changeAmbient",
      value: function _changeAmbient(color) {
        this.patch({
          Background: {
            smooth: {
              color: [color, {
                duration: 4
              }]
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            w: 1920,
            h: 1080,
            src: App.getPath("images/background.png")
          },
          Content: {
            x: 960,
            y: 620,
            mount: .5,
            w: 450,
            h: 277,
            Clipper: {
              clipping: true,
              y: 140,
              h: 105,
              w: 450,
              Arrow: {
                src: App.getPath("images/splash/arrow.png")
              }
            },
            Box: {
              h: 145,
              w: 450,
              y: -28,
              M: {
                x: 5,
                src: App.getPath("images/splash/m.png")
              },
              U: {
                x: 164,
                src: App.getPath("images/splash/u.png")
              },
              S: {
                x: 262,
                src: App.getPath("images/splash/s.png")
              },
              I: {
                x: 340,
                src: App.getPath("images/splash/i.png")
              },
              C: {
                x: 373,
                src: App.getPath("images/splash/c.png")
              }
            }
          },
          Loader: {
            alpha: 0,
            w: 30,
            h: 30,
            mountX: .5,
            x: 960,
            y: 840,
            Outer: {
              texture: lng.Tools.getRoundRect(30, 30, 15, 0, 0x00ffffff, true, 0xffffffff)
            },
            Inner: {
              texture: lng.Tools.getRoundRect(30, 30, 15, 0, 0x00ffffff, true, 0xffffffff)
            }
          }
        };
      }
    }]);

    return Splash;
  }(lng.Component);

  var AppContents =
  /*#__PURE__*/
  function (_lng$Component21) {
    _inherits(AppContents, _lng$Component21);

    function AppContents() {
      _classCallCheck(this, AppContents);

      return _possibleConstructorReturn(this, _getPrototypeOf(AppContents).apply(this, arguments));
    }

    _createClass(AppContents, [{
      key: "_init",
      value: function _init() {
        if (this.api.auth.hasValidToken()) {
          this._setState("Prepare");
        } else {
          this._setState("Authentication");
        }
      }
    }, {
      key: "$getAppContents",
      value: function $getAppContents() {
        return this;
      }
    }, {
      key: "$getGlowAnimationSettings",
      value: function $getGlowAnimationSettings() {
        if (!this._glowSettings) {
          this._glowSettings = this.stage.animations.createSettings({
            duration: 3,
            delay: .2,
            repeat: -1,
            actions: [{
              t: '',
              p: 'alpha',
              rv: 0,
              v: {
                0: {
                  v: 0
                },
                .5: {
                  v: 1
                },
                1: {
                  v: 0
                }
              }
            }]
          });
        }

        return this._glowSettings;
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        if (this.state === "Home.Playing" || this.state === "Player") {
          settings.mediaplayer.consumer = this.tag("Player");
        }
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "player",
      get: function get() {
        return this.tag("Player");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Splash: {
            type: Splash
          },
          Authentication: {
            type: Authentication,
            alpha: 0,
            signals: {
              completed: true
            }
          },
          Home: {
            type: Home,
            alpha: 0
          },
          Player: {
            type: Player,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this36) {
          _inherits(Authentication$$1, _this36);

          function Authentication$$1() {
            _classCallCheck(this, Authentication$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Authentication$$1).apply(this, arguments));
          }

          _createClass(Authentication$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Authentication").setSmooth("alpha", 1);
            }
          }, {
            key: "$startLoading",
            value: function $startLoading() {
              this.tag("Splash").startLoading();
            }
          }, {
            key: "$stopLoading",
            value: function $stopLoading() {
              this.tag("Splash").stopLoading();
            }
          }, {
            key: "completed",
            value: function completed() {
              this._setState("Prepare");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Authentication");
            }
          }]);

          return Authentication$$1;
        }(this),
        /*#__PURE__*/
        function (_this37) {
          _inherits(Prepare, _this37);

          function Prepare() {
            _classCallCheck(this, Prepare);

            return _possibleConstructorReturn(this, _getPrototypeOf(Prepare).apply(this, arguments));
          }

          _createClass(Prepare, [{
            key: "$enter",
            value: function $enter() {
              var _this38 = this;

              this.tag("Splash").startLoading();
              this.tag("Authentication").setSmooth("alpha", 0);
              this.api.extractNavigationNodes().then(function (data) {
                _this38._completed({
                  data: data
                });
              });
            }
          }, {
            key: "_completed",
            value: function _completed(_ref21) {
              var _this39 = this;

              var data = _ref21.data;
              setTimeout(function () {
                _this39.tag("Authentication").setSmooth("alpha", 0, {
                  duration: .6
                });

                _this39.tag("Home").data = data;

                _this39._setState("Home");
              }, 1000);
            }
          }]);

          return Prepare;
        }(this),
        /*#__PURE__*/
        function (_this40) {
          _inherits(Home$$1, _this40);

          function Home$$1() {
            _classCallCheck(this, Home$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Home$$1).apply(this, arguments));
          }

          _createClass(Home$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Splash").stopLoading();
              this.tag("Splash").setSmooth("alpha", 0, {
                duration: .6
              });
              this.tag("Home").setSmooth("alpha", 1, {
                duration: .6
              });
              this.tag("Player").setSmooth("alpha", 1, {
                duration: .6
              });
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Player");
            }
          }, {
            key: "$play",
            value: function $play() {
              this._setState("Home.Playing", [arguments[0]]);
            }
          }, {
            key: "$focusOnPlayer",
            value: function $focusOnPlayer() {
              this._setState("Player");
            }
          }, {
            key: "$playerState",
            value: function $playerState(_ref22) {
              var state = _ref22.state;
              this.tag("Player").setState({
                state: state
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Home");
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this41) {
                _inherits(Playing, _this41);

                function Playing() {
                  _classCallCheck(this, Playing);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
                }

                _createClass(Playing, [{
                  key: "$enter",
                  value: function $enter() {
                    if (!arguments[1]) {
                      return;
                    }

                    this.tag("Player").startPlaying(arguments[1]);
                  }
                }, {
                  key: "$play",
                  value: function $play(args) {
                    this.tag("Home").stopActiveCover();
                    this.tag("Player").startPlaying(args);
                  }
                }]);

                return Playing;
              }(this)];
            }
          }]);

          return Home$$1;
        }(this),
        /*#__PURE__*/
        function (_this42) {
          _inherits(Player$$1, _this42);

          function Player$$1() {
            _classCallCheck(this, Player$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Player$$1).apply(this, arguments));
          }

          _createClass(Player$$1, [{
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Home");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Player");
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("Home");
            }
          }]);

          return Player$$1;
        }(this)];
      }
    }]);

    return AppContents;
  }(lng.Component);

  var Authenticator =
  /*#__PURE__*/
  function () {
    function Authenticator() {
      _classCallCheck(this, Authenticator);

      this._clientId = "amzn1.application-oa2-client.da9b56904cfe4329aeff44819bab5c42";
      this._codepairUrl = "https://api.amazon.com/auth/O2/create/codepair";
      this._tokenUrl = "https://api.amazon.com/auth/o2/token";
    }

    _createClass(Authenticator, [{
      key: "startPairing",
      value: function startPairing() {
        return this._getPairingCode().then(function (data) {
          return data;
        });
      }
    }, {
      key: "_getPairingCode",
      value: function _getPairingCode() {
        return this.post({
          url: this._codepairUrl,
          body: {
            client_id: this._clientId,
            response_type: "device_code",
            scope: "amazon_music:access"
          }
        });
      }
    }, {
      key: "requestToken",
      value: function requestToken(_ref23) {
        var _this43 = this;

        var devicecode = _ref23.devicecode,
            usercode = _ref23.usercode,
            _ref23$refresh = _ref23.refresh,
            refresh = _ref23$refresh === void 0 ? false : _ref23$refresh;
        var body = {
          client_id: this._clientId
        }; // check if we're requesting a refresh token

        if (!refresh) {
          body = _objectSpread({
            device_code: devicecode,
            user_code: usercode,
            grant_type: "device_code"
          }, body);
        } else {
          body = _objectSpread({
            grant_type: "refresh_token",
            refresh_token: this._refresh_token
          }, body);
        } // fire token request


        return this.post({
          url: this._tokenUrl,
          body: body
        }).then(function (data) {
          // if we have a access_token property
          // we store needed values via token setter
          if (data.hasOwnProperty("access_token")) {
            _this43.token = data;
          }

          return data;
        });
      }
    }, {
      key: "post",
      value: function post(_ref24) {
        var url = _ref24.url,
            body = _ref24.body;
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: Authenticator._qsify(body)
        }).then(function (response) {
          return response.json();
        });
      }
    }, {
      key: "hasValidToken",
      value: function hasValidToken() {
        this._token = localStorage.getItem("VEVO_TOKEN");
        this._refresh_token = localStorage.getItem("VEVO_REFRESH_TOKEN");
        this._expires = localStorage.getItem("VEVO_TOKEN_EXPIRES");

        if (this.isTokenExpired()) {
          if (this._refresh_token) {
            return this.requestToken({
              refresh: true
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
        localStorage.setItem("VEVO_TOKEN", access_token);
        localStorage.setItem("VEVO_REFRESH_TOKEN", refresh_token);
      }
    }, {
      key: "expires",
      set: function set(v) {
        this._expires = v;
        localStorage.setItem("VEVO_TOKEN_EXPIRES", v);
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

  var Factory$1 =
  /*#__PURE__*/
  function () {
    function Factory$1() {
      _classCallCheck(this, Factory$1);
    }

    _createClass(Factory$1, [{
      key: "create",
      value: function create(node) {
        var reg = /(tracks|albums|stations|chunk|playlists|album|playlist)/ig;
        var match = reg.exec(node.response.result);

        if (match && match.length) {
          var type = Factory$1._ucfirst(match[1]);

          var result = this["_create".concat(type)](node);
          return result;
        } else {
          return;
        }
      }
    }, {
      key: "_createTracks",
      value: function _createTracks(_ref25) {
        var response = _ref25.response,
            title = _ref25.title,
            rootUrl = _ref25.rootUrl;
        var tracks = response.trackDefinitions;
        var keys = Object.keys(tracks);
        var container = new TracksObj({
          url: Factory$1._cleanupUrl(rootUrl),
          title: title
        });
        container.items = keys.map(function (k) {
          return new TrackObj(tracks[k]);
        });
        return container;
      }
    }, {
      key: "_createStations",
      value: function _createStations(node) {
        return this._createNodelistWithNavigation(_objectSpread({}, Factory$1.CONFIG["Stations"], node));
      }
    }, {
      key: "_createAlbums",
      value: function _createAlbums(node) {
        return this._createNodelistWithNavigation(_objectSpread({}, Factory$1.CONFIG["Albums"], node));
      }
    }, {
      key: "_createAlbum",
      value: function _createAlbum(node) {
        return this._createTracks(node);
      }
    }, {
      key: "_createChunk",
      value: function _createChunk(node) {
        return this._createTracks(node);
      }
    }, {
      key: "_createPlaylists",
      value: function _createPlaylists(node) {
        return this._createNodelistWithNavigation(_objectSpread({}, Factory$1.CONFIG["Playlists"], node));
      }
    }, {
      key: "_createPlaylist",
      value: function _createPlaylist(node) {
        return this._createTracks(node);
      }
    }, {
      key: "_createNodelistWithNavigation",
      value: function _createNodelistWithNavigation(_ref26) {
        var response = _ref26.response,
            title = _ref26.title,
            rootUrl = _ref26.rootUrl,
            containerConstructor = _ref26.containerConstructor,
            itemConstructor = _ref26.itemConstructor,
            pointer = _ref26.pointer,
            dictionary = _ref26.dictionary;
        var items = response.itemDescriptions;
        var navigation = response[dictionary];
        var keys = Object.keys(items);
        var container = new Factory$1.CLASSES[containerConstructor]({
          url: Factory$1._cleanupUrl(rootUrl),
          title: title
        });
        container.items = keys.map(function (k) {
          var props = items[k];
          var nav = null; // summary starts with a # property in the dictionary
          // is without a # so we slice it of to get matching key

          var navigationPointer = props[pointer].slice(1);

          if (navigation.hasOwnProperty(navigationPointer)) {
            nav = navigation[navigationPointer];
          }

          return new Factory$1.CLASSES[itemConstructor](props, nav);
        });
        return container;
      }
    }], [{
      key: "_cleanupUrl",
      value: function _cleanupUrl(url) {
        var reg = /(.*)#/ig;
        var matches = reg.exec(url);

        if (matches && matches.length) {
          return matches[1];
        }
      }
    }, {
      key: "_ucfirst",
      value: function _ucfirst(str) {
        return "".concat(str[0].toUpperCase()).concat(str.slice(1));
      }
    }]);

    return Factory$1;
  }();

  Factory$1.CONFIG = {
    Albums: {
      containerConstructor: "Albums",
      itemConstructor: "Album",
      pointer: "navigationNodeSummary",
      dictionary: "navigationNodeSummaries"
    },
    Playlists: {
      containerConstructor: "Playlists",
      itemConstructor: "Playlist",
      pointer: "navigationNodeSummary",
      dictionary: "navigationNodeSummaries"
    },
    Stations: {
      containerConstructor: "Stations",
      itemConstructor: "Station",
      pointer: "playable",
      dictionary: "playables"
    }
  };
  Factory$1.CLASSES = {
    Albums: Albums,
    Album: Album,
    Playlists: Playlists,
    Playlist: Playlist,
    Stations: Stations,
    Station: Station
  };

  var Api =
  /*#__PURE__*/
  function () {
    function Api() {
      _classCallCheck(this, Api);

      this._auth = new Authenticator();
      this._factory = new Factory$1();
      this._rootUrl = "https://music-api.amazon.com/widescreen_catalog/";
    }

    _createClass(Api, [{
      key: "get",
      value: function get(url) {
        var _this44 = this;

        if (this._auth.isTokenExpired()) {
          return this._auth.requestToken({
            refresh: true
          }).then(function () {
            return _this44.get(url);
          });
        }

        return fetch(ux.Ui.getProxyUrl(url), {
          headers: {
            "Authorization": "Bearer ".concat(this._auth.token)
          }
        }).then(function (response) {
          return response.json();
        });
      }
      /**
       * Extract all widescreen navigation nodes which have items attached
       * build the correct url and prepare the requests
       * @returns {Promise.<TResult>|*}
       */

    }, {
      key: "extractNavigationNodes",
      value: function extractNavigationNodes() {
        var _this45 = this;

        var rootUrl = this._rootUrl;
        var skipNodes = ["sandbox_summary", "widescreen_catalog_summary"];
        return this.get("".concat(rootUrl)).then(function (response) {
          var promises = [];
          var nodes = response.navigationNodeSummaries;
          var keys = Object.keys(nodes).filter(function (node) {
            return skipNodes.indexOf(node) === -1;
          });

          if (!keys.length) {
            throw new Error("No navigation nodes found");
          }

          for (var i = 0, j = keys.length; i < j; i++) {
            var node = nodes[keys[i]];

            if (!node.numItemsOfInterest) {
              continue;
            }

            promises.push(_this45._mergeDataInPromise({
              url: "".concat(rootUrl).concat(node.description),
              data: {
                title: node.title
              }
            }));
          }

          if (promises.length) {
            return Promise.all(promises);
          }
        }).then(function (response) {
          if (!response.length) {
            throw new Error("No node output returned");
          }

          var lists = response.map(function (node) {
            return _this45._createNodeOutputList(node);
          });

          if (lists.length) {
            return lists;
          }
        });
      }
    }, {
      key: "deepNavigateInNode",
      value: function deepNavigateInNode(url) {
        var _this46 = this;

        return this.get(url).then(function (node) {
          return _this46._createNodeOutputList({
            response: node,
            rootUrl: url
          });
        });
      }
      /**
       * Spread data object in the return of a promise
       * @param url
       * @param data
       * @returns {Promise.<Object>}
       * @private
       */

    }, {
      key: "_mergeDataInPromise",
      value: function _mergeDataInPromise(_ref27) {
        var url = _ref27.url,
            data = _ref27.data;
        return this._promise(url).then(function (response) {
          return _objectSpread({
            response: response,
            rootUrl: url
          }, data);
        });
      }
    }, {
      key: "_createNodeOutputList",
      value: function _createNodeOutputList(node) {
        return this._factory.create(node);
      }
    }, {
      key: "_promise",
      value: function _promise(url) {
        return this.get(url);
      }
    }, {
      key: "auth",
      get: function get() {
        return this._auth;
      }
    }], [{
      key: "_qsify",
      value: function _qsify(params) {
        return Object.keys(params).map(function (key) {
          return "".concat(key, "=").concat(params[key]);
        }).join("&");
      }
    }]);

    return Api;
  }();

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
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("AppContents");
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
          url: App.getPath('fonts/Lato-Black.ttf'),
          descriptors: {}
        }, {
          family: 'Bold',
          url: App.getPath('fonts/Lato-Bold.ttf'),
          descriptors: {}
        }, {
          family: 'Light',
          url: App.getPath('fonts/Lato-Light.ttf'),
          descriptors: {}
        }, {
          family: 'Hairline',
          url: App.getPath('fonts/Lato-Hairline.ttf'),
          descriptors: {}
        }, {
          family: 'Regular',
          url: App.getPath('fonts/Lato-Regular.ttf'),
          descriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Player: {},
          AppContents: {
            type: AppContents
          }
        };
      }
    }]);

    return App;
  }(ux.App);

  return App;
}();