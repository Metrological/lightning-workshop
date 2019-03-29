"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  var SpinningLogo =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(SpinningLogo, _lng$Component);

    function SpinningLogo() {
      _classCallCheck(this, SpinningLogo);

      return _possibleConstructorReturn(this, _getPrototypeOf(SpinningLogo).apply(this, arguments));
    }

    _createClass(SpinningLogo, [{
      key: "_setup",
      value: function _setup() {
        this._loader = this.animation({
          duration: 1,
          repeat: -1,
          stopMethod: 'immediate',
          actions: [{
            p: 'rotation',
            v: {
              0: {
                v: 0,
                sm: 0
              },
              1: {
                v: 2 * Math.PI,
                sm: 0
              }
            }
          }]
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this._loader.start();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._loader.stop();
      }
    }, {
      key: "_handleBack",
      value: function _handleBack() {
        return false;
      }
    }, {
      key: "_handleKey",
      value: function _handleKey() {//block all the key events other than BACK
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          src: App.getPath('images/splash-spinner.png')
        };
      }
    }]);

    return SpinningLogo;
  }(lng.Component);

  var Splash =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(Splash, _lng$Component2);

    function Splash() {
      _classCallCheck(this, Splash);

      return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
    }

    _createClass(Splash, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("Spinner");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            w: 1920,
            h: 1080,
            rect: true,
            color: App.COLORS.BACKGROUND
          },
          Wrapper: {
            x: 960,
            y: 540,
            mount: 0.5,
            flex: {
              direction: 'column',
              alignItems: 'center'
            },
            Logo: {
              flexItem: {},
              src: App.getPath('images/france-24-logo.png')
            },
            Spinner: {
              flexItem: {
                marginTop: 60
              },
              type: SpinningLogo
            }
          }
        };
      }
    }]);

    return Splash;
  }(lng.Component);

  var MenuItem =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(MenuItem, _lng$Component3);

    function MenuItem() {
      _classCallCheck(this, MenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).apply(this, arguments));
    }

    _createClass(MenuItem, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          FlexMenuItem: {
            Title: {
              smooth: {
                color: 0xff00a7e3
              },
              text: {
                fontStyle: 'bold'
              }
            },
            Line: {
              smooth: {
                color: 0xff00a7e3
              }
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          FlexMenuItem: {
            Title: {
              smooth: {
                color: 0xff101010
              },
              text: {
                fontStyle: this._selected ? 'bold' : 'normal'
              }
            },
            Line: {
              smooth: {
                color: 0xff101010
              }
            }
          }
        });
      }
    }, {
      key: "title",
      set: function set(title) {
        this.patch({
          FlexMenuItem: {
            Title: {
              text: {
                text: title.toUpperCase()
              }
            }
          }
        });
      }
    }, {
      key: "selection",
      set: function set(t) {
        this._selected = t;
        this.patch({
          FlexMenuItem: {
            Title: {
              smooth: {
                color: 0xff101010
              },
              text: {
                fontStyle: t ? 'bold' : 'normal'
              }
            },
            Line: {
              smooth: {
                color: 0xff101010,
                alpha: t ? 1 : 0
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          flexItem: {
            marginRight: 70
          },
          flex: {},
          FlexMenuItem: {
            flex: {
              direction: 'column',
              alignItems: 'stretch'
            },
            Title: {
              text: {
                fontFamily: 'OpenSans',
                fontSize: 40
              },
              color: 0xff101010
            },
            Line: {
              alpha: 1,
              h: 4,
              color: 0xff101010,
              rect: true
            }
          }
        };
      }
    }]);

    return MenuItem;
  }(lng.Component);

  var Menu =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(Menu, _lng$Component4);

    function Menu() {
      _classCallCheck(this, Menu);

      return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
      key: "_init",
      value: function _init() {
        this.tag("FlexMenu").children = Menu.ITEMS.map(function (item) {
          return {
            type: MenuItem,
            title: item.title,
            selection: item.selection
          };
        });
        this._focusIdx = 0;
        this._selectedIdx = 0;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("FlexMenu").children[this._focusIdx];
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._focusIdx < Menu.ITEMS.length - 1) {
          this._focusIdx++;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var _this = this;

        this._selectedIdx = this._focusIdx;
        this.tag("FlexMenu").children.forEach(function (item, index) {
          item.selection = _this._selectedIdx === index;
        });
        this.fireAncestors("$select", Menu.ITEMS[this._focusIdx].title);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._focusIdx > 0) {
          this._focusIdx--;
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        /*Reset the focused to selected. So that the next time when the focus is gained by Menu,
        then the selected will be highlighted.
         */
        this._focusIdx = this._selectedIdx;
        return false;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 300,
          y: 55,
          FlexMenu: {
            flex: {
              direction: 'row',
              justifyItems: 'flex-start'
            }
          }
        };
      }
    }]);

    return Menu;
  }(lng.Component);

  Menu.ITEMS = [{
    title: "TOP STORIES",
    selection: true
  }, {
    title: "MOST VIEWED",
    selection: false
  }, {
    title: "SHOWS",
    selection: false
  }, {
    title: "ABOUT",
    selection: false
  }];

  var Header =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(Header, _lng$Component5);

    function Header() {
      _classCallCheck(this, Header);

      return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
    }

    _createClass(Header, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag("Menu");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 140,
          rect: true,
          color: 0xffffffff,
          Line: {
            x: 0,
            y: 140,
            w: 1920,
            h: 2,
            rect: true,
            color: 0xffa9adac
          },
          Image: {
            x: 100,
            y: 50,
            src: App.getPath('images/france-24-logo-small.png')
          },
          Menu: {
            type: Menu
          }
        };
      }
    }]);

    return Header;
  }(lng.Component);

  var List =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(List, _lng$Component6);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
    }

    _createClass(List, [{
      key: "_handleLeft",
      value: function _handleLeft() {
        this.tag('List').setPrevious();
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag('List').setIndex(0);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        if (!this._storeFocus) {
          this.tag('List').setIndex(0);
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.tag('List').setNext();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "title",
      set: function set(title) {
        if (title) {
          this.patch({
            Title: {
              text: {
                text: title
              },
              smooth: {
                alpha: 1
              }
            },
            List: {
              smooth: {
                y: 80
              }
            }
          });
        }
      }
    }, {
      key: "itemSize",
      set: function set(size) {
        this.patch({
          List: {
            itemSize: size
          }
        });
      }
    }, {
      key: "items",
      get: function get() {
        return this._items;
      },
      set: function set(items) {
        this._items = items;
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
    }, {
      key: "storeFocus",
      set: function set(v) {
        this._storeFocus = v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Title: {
            text: {
              fontSize: 44,
              fontFace: 'OpenSans',
              fontStyle: 'bold'
            },
            color: 0xff606060,
            alpha: 0
          },
          List: {
            type: lng.components.ListComponent,
            w: 1920,
            x: -85,
            scrollTransition: {
              duration: 0.2
            },
            invertDirection: false,
            roll: true,
            viewportScrollOffset: 0.5,
            itemScrollOffset: 0.5,
            rollMin: 90,
            rollMax: 90
          }
        };
      }
    }]);

    return List;
  }(lng.Component);

  var TransparentShader =
  /*#__PURE__*/
  function (_lng$shaders$WebGLDef) {
    _inherits(TransparentShader, _lng$shaders$WebGLDef);

    function TransparentShader() {
      _classCallCheck(this, TransparentShader);

      return _possibleConstructorReturn(this, _getPrototypeOf(TransparentShader).apply(this, arguments));
    }

    _createClass(TransparentShader, [{
      key: "beforeUsage",
      value: function beforeUsage() {
        this.gl.disable(this.gl.BLEND);
      }
    }, {
      key: "afterUsage",
      value: function afterUsage() {
        this.gl.enable(this.gl.BLEND);
      }
    }]);

    return TransparentShader;
  }(lng.shaders.WebGLDefaultShader);

  var PrimaryItem =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(PrimaryItem, _lng$Component7);

    function PrimaryItem() {
      _classCallCheck(this, PrimaryItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(PrimaryItem).apply(this, arguments));
    }

    _createClass(PrimaryItem, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.02
          },
          Border: {
            smooth: {
              alpha: 1
            }
          },
          FocusIndicator: {
            smooth: {
              alpha: this._hidePlayOnFocus ? 0 : 1
            }
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
          Border: {
            smooth: {
              alpha: 0
            }
          },
          FocusIndicator: {
            smooth: {
              alpha: 0
            }
          }
        });
      }
    }, {
      key: "image",
      set: function set(image) {
        this.patch({
          PrimaryImage: {
            src: image,
            alpha: 1
          }
        });
      }
    }, {
      key: "imageUrl",
      set: function set(image) {
        this.patch({
          PrimaryImage: {
            src: App.cropImage({
              url: image,
              w: 700,
              h: 394
            }),
            alpha: 1
          }
        });
      }
    }, {
      key: "hidePlayOnFocus",
      set: function set(v) {
        this._hidePlayOnFocus = v;
      }
    }, {
      key: "transparent",
      set: function set(v) {
        this.patch({
          TransparentRect: {
            alpha: v ? 1 : 0,
            shader: v ? {
              type: TransparentShader
            } : null
          },
          PrimaryImage: {
            alpha: v ? 0 : 1
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 720,
          h: 414,
          TransparentRect: {
            rect: true,
            color: 0x00000000,
            w: 700,
            h: 394,
            alpha: 0
          },
          PrimaryImage: {
            w: 700,
            h: 394,
            alpha: 0
          },
          FocusIndicator: {
            w: 170,
            h: 170,
            x: 360,
            y: 207,
            mount: 0.5,
            alpha: 0,
            src: App.getPath('images/play-big.png')
          },
          Border: {
            alpha: 0,
            Border: {
              type: lng.components.BorderComponent,
              borderWidth: 10,
              colorBorder: 0xff00a7e3,
              w: 700,
              h: 394
            }
          }
        };
      }
    }]);

    return PrimaryItem;
  }(lng.Component);

  var ImageItem =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(ImageItem, _lng$Component8);

    function ImageItem() {
      _classCallCheck(this, ImageItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ImageItem).apply(this, arguments));
    }

    _createClass(ImageItem, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.1
          },
          Border: {
            smooth: {
              alpha: 1
            }
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
          Border: {
            smooth: {
              alpha: 0
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
            src: App.cropImage({
              url: v.getPicture(388),
              w: 370,
              h: 205
            })
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
          w: 370,
          h: 205,
          Image: {},
          Border: {
            alpha: 0,
            Border: {
              type: lng.components.BorderComponent,
              borderWidth: 6,
              colorBorder: 0xff00a7e3,
              w: 370,
              h: 205
            }
          }
        };
      }
    }]);

    return ImageItem;
  }(lng.Component);

  var VideoItem =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(VideoItem, _lng$Component9);

    function VideoItem() {
      _classCallCheck(this, VideoItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(VideoItem).apply(this, arguments));
    }

    _createClass(VideoItem, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.03
          },
          Border: {
            smooth: {
              alpha: 1
            }
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
          Border: {
            smooth: {
              alpha: 0
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
            src: App.cropImage({
              url: v.getPicture(388),
              w: 370,
              h: 205
            })
          },
          Title: {
            text: {
              text: v.description || ''
            }
          },
          Date: {
            text: {
              text: v.createdTime ? App.formatTime(v.createdTime) : ''
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
          w: 370,
          h: 365,
          Image: {
            w: 370,
            h: 205
          },
          Border: {
            alpha: 0,
            Border: {
              type: lng.components.BorderComponent,
              borderWidth: 6,
              colorBorder: 0xff00a7e3,
              w: 370,
              h: 205
            }
          },
          Title: {
            y: 230,
            text: {
              fontFamily: 'OpenSans',
              fontSize: 22,
              fontStyle: 'bold',
              maxLines: 3,
              wordWrapWidth: 370,
              lineHeight: 30
            },
            color: 0xff101010
          },
          Date: {
            y: 350,
            text: {
              fontFamily: 'OpenSans',
              fontSize: 22,
              fontStyle: 'bold'
            },
            color: 0xff606060
          }
        };
      }
    }]);

    return VideoItem;
  }(lng.Component);

  var TopStories =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(TopStories, _lng$Component10);

    function TopStories() {
      _classCallCheck(this, TopStories);

      return _possibleConstructorReturn(this, _getPrototypeOf(TopStories).apply(this, arguments));
    }

    _createClass(TopStories, [{
      key: "_setup",
      value: function _setup() {
        this._views = {
          PrimaryItem: this.tag("PrimaryItem"),
          LatestBulletins: this.tag("LatestBulletins"),
          LatestStories: this.tag("LatestStories")
        };
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Loading");

        this._api = this.fireAncestors('$getApi');
      }
    }, {
      key: "_active",
      value: function _active() {
        this._setTimeout(0);
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this._clearTimeout(); //reset the live program information


        this._setLiveProgramInfo();
      }
    }, {
      key: "_setTimeout",
      value: function _setTimeout(duration) {
        var _this2 = this;

        this._timerId = setTimeout(function () {
          _this2._api.getLivePrograms().then(function (programs) {
            //set the live program information
            _this2._setLiveProgramInfo(programs);

            var nextPingAt = App.LIVE_PROGRAMS_POLL_FREQUENCY;

            if (programs) {
              var nextProgramIn = programs.current.end_time - Date.now(); //If the next program starts in less than the poll frequency then adjust the next ping

              if (nextProgramIn < App.LIVE_PROGRAMS_POLL_FREQUENCY) {
                nextPingAt = nextProgramIn;
              }
            }

            _this2._setTimeout(nextPingAt);
          }).catch(function (err) {
            console.error(err);

            _this2._clearTimeout();
          });
        }, duration);
      }
    }, {
      key: "_setLiveProgramInfo",
      value: function _setLiveProgramInfo(programs) {
        //check for the program info
        if (programs) {
          //show the current program title
          this.tag("CurrentProgramTitle").setSmooth('alpha', 1);
          this.tag("CurrentProgramTitle").text.text = programs.current.title.toUpperCase();

          if (programs.next) {
            //show the next program title
            this.tag("NextProgram").setSmooth('alpha', 1);
            this.tag("Title").text.text = programs.next.title.toUpperCase();
          } else {
            //Hide the next program info
            this.tag("NextProgram").setSmooth('alpha', 0);
          }
        } else {
          //Hide the program details
          this.tag("CurrentProgramTitle").setSmooth('alpha', 0);
          this.tag("NextProgram").setSmooth('alpha', 0);
        }
      }
    }, {
      key: "_clearTimeout",
      value: function _clearTimeout() {
        clearTimeout(this._timerId);
      }
    }, {
      key: "_play",
      value: function _play(item, items) {
        this.fireAncestors('$play', {
          items: items,
          item: item
        }, true);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 938,
          rect: true,
          color: 0xfff4f8f7,
          PrimaryItem: {
            x: 100,
            y: 40,
            type: PrimaryItem,
            hidePlayOnFocus: true,
            image: App.getPath('images/watch-live.png')
          },
          Channel: {
            x: 850,
            y: 40,
            text: {
              text: TopStories.TEXTS.channel,
              fontFamily: 'OpenSans',
              fontStyle: 'bold',
              fontSize: 48
            },
            color: 0xff101010
          },
          ChannelDescription: {
            x: 850,
            y: 110,
            text: {
              fontFamily: 'OpenSans',
              fontSize: 38,
              text: TopStories.TEXTS.description,
              maxLines: 3,
              wordWrapWidth: 900,
              lineHeight: 50
            },
            color: 0xff606060
          },
          CurrentProgramTitle: {
            x: 850,
            y: 320,
            text: {
              fontFamily: 'OpenSans',
              fontStyle: 'bold',
              fontSize: 48,
              maxLines: 3,
              maxLinesSuffix: '...',
              wordWrapWidth: 900
            },
            color: 0xff101010
          },
          NextProgram: {
            x: 850,
            y: 380,
            text: {
              text: 'Next :',
              fontFamily: 'OpenSans',
              fontSize: 38
            },
            color: 0xff606060,
            alpha: 0,
            Title: {
              x: 120,
              text: {
                fontFamily: 'OpenSans',
                fontSize: 38,
                maxLines: 1,
                maxLinesSuffix: '...',
                wordWrapWidth: 750
              },
              color: 0xff606060
            }
          },
          LatestBulletins: {
            type: List,
            title: 'Latest bulletins',
            x: 100,
            y: 470,
            itemSize: 415
          },
          LatestStories: {
            type: List,
            title: 'Latest stories',
            x: 100,
            y: 800,
            itemSize: 415
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this3) {
          _inherits(Loading, _this3);

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
            key: "$exit",
            value: function $exit() {
              this.fireAncestors('$hideSplash');
            }
          }, {
            key: "_load",
            value: function _load() {
              var _this4 = this;

              var api = this.fireAncestors('$getApi');
              api.getLatestBulletins().then(function (data) {
                _this4._loadBulletins(data);
              }).then(function () {
                return api.getLatestStories();
              }).then(function (stories) {
                _this4._loadStories(stories);
              }).catch(function (err) {
                return console.error(err);
              });
            }
          }, {
            key: "_loadBulletins",
            value: function _loadBulletins(data) {
              this._views.LatestBulletins.items = data.map(function (el) {
                return {
                  type: ImageItem,
                  item: el
                };
              });
            }
          }, {
            key: "_loadStories",
            value: function _loadStories(data) {
              this._views.LatestStories.items = data.map(function (el) {
                return {
                  type: VideoItem,
                  item: el
                };
              });

              this._setState("PrimaryItem");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this5) {
          _inherits(Idle, _this5);

          function Idle() {
            _classCallCheck(this, Idle);

            return _possibleConstructorReturn(this, _getPrototypeOf(Idle).apply(this, arguments));
          }

          _createClass(Idle, [{
            key: "_focus",
            value: function _focus() {
              this._setState("PrimaryItem");
            }
          }]);

          return Idle;
        }(this),
        /*#__PURE__*/
        function (_this6) {
          _inherits(PrimaryItem$$1, _this6);

          function PrimaryItem$$1() {
            _classCallCheck(this, PrimaryItem$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(PrimaryItem$$1).apply(this, arguments));
          }

          _createClass(PrimaryItem$$1, [{
            key: "$enter",
            value: function $enter() {
              this._views.PrimaryItem.transparent = true;
              this.fireAncestors('$playLive', "", true);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this._views.PrimaryItem.transparent = false;
              this.fireAncestors("$stopMinimizedPlayback");
            }
          }, {
            key: "_unfocus",
            value: function _unfocus() {
              this._setState("Idle");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this._views.PrimaryItem;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Idle");

              return false;
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("LatestBulletins");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.fireAncestors("$stopMinimizedPlayback");
              this.fireAncestors('$playLive', this.tag("CurrentProgramTitle").text.text);
            }
          }]);

          return PrimaryItem$$1;
        }(this),
        /*#__PURE__*/
        function (_this7) {
          _inherits(LatestBulletins, _this7);

          function LatestBulletins() {
            _classCallCheck(this, LatestBulletins);

            return _possibleConstructorReturn(this, _getPrototypeOf(LatestBulletins).apply(this, arguments));
          }

          _createClass(LatestBulletins, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this._views.LatestBulletins;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("PrimaryItem");
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("LatestStories");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              if (this.tag('LatestBulletins').active.item) {
                this._play(this.tag('LatestBulletins').active.item, this.tag('LatestBulletins').items.map(function (item) {
                  return item.item;
                }));
              }
            }
          }]);

          return LatestBulletins;
        }(this),
        /*#__PURE__*/
        function (_this8) {
          _inherits(LatestStories, _this8);

          function LatestStories() {
            _classCallCheck(this, LatestStories);

            return _possibleConstructorReturn(this, _getPrototypeOf(LatestStories).apply(this, arguments));
          }

          _createClass(LatestStories, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                smooth: {
                  h: 938 + 350,
                  y: -350
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.patch({
                smooth: {
                  h: 938,
                  y: 0
                }
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this._views.LatestStories;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("LatestBulletins");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              if (this.tag('LatestStories').active.item) {
                this._play(this.tag('LatestStories').active.item, this.tag('LatestStories').items.map(function (item) {
                  return item.item;
                }));
              }
            }
          }]);

          return LatestStories;
        }(this)];
      }
    }]);

    return TopStories;
  }(lng.Component);

  TopStories.TEXTS = {
    channel: "LIVE",
    description: "International News 24/7 in French, English, Arabic and Spanish"
  };

  var Album =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(Album, _lng$Component11);

    function Album() {
      _classCallCheck(this, Album);

      return _possibleConstructorReturn(this, _getPrototypeOf(Album).apply(this, arguments));
    }

    _createClass(Album, [{
      key: "_setPrimaryItem",
      value: function _setPrimaryItem(item) {
        this.tag("PrimaryItem").imageUrl = item.getPicture(720);
        this.tag("Title").text.text = item.description || "";
        this.tag("Date").text.text = item.createdTime ? App.formatTime(item.createdTime) : '';
      }
    }, {
      key: "_setListItems",
      value: function _setListItems(items) {
        this.tag("RemainingItems").items = items.map(function (el) {
          return {
            type: VideoItem,
            item: el
          };
        });
      }
    }, {
      key: "_play",
      value: function _play(item, items) {
        this.fireAncestors('$play', {
          items: items,
          item: item
        }, true);
      }
    }, {
      key: "items",
      set: function set(items) {
        this._items = items;

        this._setPrimaryItem(items[0]);

        this._setListItems(items.slice(1));

        this._setState("PrimaryItem");
      }
    }, {
      key: "logo",
      set: function set(image) {
        if (image) {
          this.patch({
            Logo: {
              src: App.cropImage({
                url: image,
                w: 300,
                h: 100,
                type: 'auto'
              }),
              alpha: 1
            },
            Flex: {
              smooth: {
                y: 200
              }
            }
          });
        } else {
          this.patch({
            Logo: {
              alpha: 0
            },
            Flex: {
              smooth: {
                y: 40
              }
            }
          });
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          PrimaryItem: {
            x: 100,
            y: 40,
            type: PrimaryItem
          },
          Logo: {
            x: 850,
            y: 40,
            alpha: 0
          },
          Flex: {
            x: 850,
            y: 40,
            flex: {
              direction: 'column',
              justifyItems: 'flex-start'
            },
            Title: {
              flexItem: {},
              text: {
                fontFamily: 'OpenSans',
                fontSize: 44,
                maxLines: 3,
                wordWrapWidth: 900,
                lineHeight: 56
              },
              color: 0xff101010
            },
            Date: {
              flexItem: {},
              text: {
                fontFamily: 'OpenSans',
                fontSize: 38
              },
              color: 0xff606060
            }
          },
          RemainingItems: {
            type: List,
            x: 100,
            y: 500,
            itemSize: 415
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this9) {
          _inherits(PrimaryItem$$1, _this9);

          function PrimaryItem$$1() {
            _classCallCheck(this, PrimaryItem$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(PrimaryItem$$1).apply(this, arguments));
          }

          _createClass(PrimaryItem$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("PrimaryItem");
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("RemainingItems");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._play(this._items[0], this._items);
            }
          }]);

          return PrimaryItem$$1;
        }(this),
        /*#__PURE__*/
        function (_this10) {
          _inherits(RemainingItems, _this10);

          function RemainingItems() {
            _classCallCheck(this, RemainingItems);

            return _possibleConstructorReturn(this, _getPrototypeOf(RemainingItems).apply(this, arguments));
          }

          _createClass(RemainingItems, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("RemainingItems");
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("PrimaryItem");
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              if (this.tag('RemainingItems').active.item) {
                this._play(this.tag('RemainingItems').active.item, this._items);
              }
            }
          }]);

          return RemainingItems;
        }(this)];
      }
    }]);

    return Album;
  }(lng.Component);

  var MostViewed =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(MostViewed, _lng$Component12);

    function MostViewed() {
      _classCallCheck(this, MostViewed);

      return _possibleConstructorReturn(this, _getPrototypeOf(MostViewed).apply(this, arguments));
    }

    _createClass(MostViewed, [{
      key: "_firstActive",
      value: function _firstActive() {
        this._setState("Loading");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 938,
          rect: true,
          color: 0xfff4f8f7,
          Spinner: {
            x: 960,
            y: 470,
            mount: 0.5,
            type: SpinningLogo,
            alpha: 0
          },
          Album: {
            type: Album,
            alpha: 0
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
            key: "$enter",
            value: function $enter() {
              this.tag("Spinner").setSmooth('alpha', 1);

              this._load();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Spinner").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Spinner");
            }
          }, {
            key: "_load",
            value: function _load() {
              var _this12 = this;

              var api = this.fireAncestors('$getApi');
              api.getMostViewed().then(function (data) {
                _this12._loaded(data);
              }).catch(function (err) {
                return console.error(err);
              });
            }
          }, {
            key: "_loaded",
            value: function _loaded(data) {
              this.tag("Album").items = data;

              this._setState("Album");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(Album$$1, _this13);

          function Album$$1() {
            _classCallCheck(this, Album$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Album$$1).apply(this, arguments));
          }

          _createClass(Album$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Album").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Album").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Album");
            }
          }]);

          return Album$$1;
        }(this)];
      }
    }]);

    return MostViewed;
  }(lng.Component);

  var Grid =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(Grid, _lng$Component13);

    function Grid() {
      _classCallCheck(this, Grid);

      return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
        this._pageRow = 1;
      }
      /**
       * Sets the constructor of the grid item.
       * @param construct Grid item constructor. Must be a sub-class of GridItem.
       */

    }, {
      key: "resetFocus",

      /**
       * Resets the focus to the first item in the grid
       */
      value: function resetFocus() {
        this._index = 0;
        this._pageRow = 1;
        this.patch({
          Items: {
            smooth: {
              y: 0
            }
          }
        });
      }
    }, {
      key: "_getRowId",
      value: function _getRowId(index) {
        return Math.floor(index / this._itemsPerRow);
      }
    }, {
      key: "_select",
      value: function _select(index) {
        if (index < 0 || index > this._items.length - 1) {
          return;
        }

        var prevRow = this._getRowId(this._index);

        var newRow = this._getRowId(index);

        this._index = index;

        if (prevRow === newRow) {
          return;
        }

        var yAxisShift; //handle key down

        if (prevRow < newRow) {
          //if the current row is maximum in the page, then shift y
          if (this._pageRow === this._rowsPerPage) {
            yAxisShift = (newRow - (this._rowsPerPage - 1)) * this._construct.height * -1;
          } else {
            this._pageRow++;
          }
        } else {
          //handle key up
          if (this._pageRow === 1) {
            //if the current row is minimum in the page, then shift y
            yAxisShift = newRow * this._construct.height * -1;
          } else {
            this._pageRow--;
          }
        }

        if (yAxisShift != undefined) {
          this.patch({
            Items: {
              smooth: {
                y: yAxisShift
              }
            }
          });
        }
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        var index = this._index; //allow the left navigation only if the item is not the first item in the row

        if (index % this._itemsPerRow !== 0) {
          this._select(index - 1);
        } else {
          return false;
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        var index = this._index; //allow the right navigation only if the item is not the last item in the row

        if (index % this._itemsPerRow !== this._itemsPerRow - 1) {
          this._select(index + 1);
        } else {
          return false;
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        var index = this._index;

        if (index - this._itemsPerRow >= 0) {
          index -= this._itemsPerRow;
        } else {
          this._index = 0;
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
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "construct",
      set: function set(construct) {
        this._construct = construct;
      }
      /**
       * Sets the number of items that can fit in a row based on the Gird width & item width.
       * @param itemsPerRow items in a row
       */

    }, {
      key: "itemsPerRow",
      set: function set(itemsPerRow) {
        this._itemsPerRow = itemsPerRow;
      }
      /**
       * Sets the number of rows that can fit in one page.
       * @warn This is not the total number of rows.
       * @param rowsPerPage items in a page
       */

    }, {
      key: "rowsPerPage",
      set: function set(rowsPerPage) {
        this._rowsPerPage = rowsPerPage;
      }
    }, {
      key: "items",
      set: function set(items) {
        var _this14 = this;

        this._items = items;
        this.tag("Items").children = items.map(function (item, index) {
          return {
            type: _this14._construct,
            item: item,
            x: index % _this14._itemsPerRow * _this14._construct.width,
            y: Math.floor(index / _this14._itemsPerRow) * _this14._construct.height
          };
        });
      },
      get: function get() {
        return this._items;
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
    }]);

    return Grid;
  }(lng.Component);

  var GridItem =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(GridItem, _lng$Component14);

    function GridItem() {
      _classCallCheck(this, GridItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridItem).apply(this, arguments));
    }

    _createClass(GridItem, null, [{
      key: "width",

      /**
       * Sub class must return the width of the grid item.
       * @returns {number} grid item width
       */
      get: function get() {
        return 0;
      }
      /**
       * Sub class must return the height of the grid item.
       * @returns {number} grid item height
       */

    }, {
      key: "height",
      get: function get() {
        return 0;
      }
    }]);

    return GridItem;
  }(lng.Component);

  var ImageItem$1 =
  /*#__PURE__*/
  function (_GridItem) {
    _inherits(ImageItem$1, _GridItem);

    function ImageItem$1() {
      _classCallCheck(this, ImageItem$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(ImageItem$1).apply(this, arguments));
    }

    _createClass(ImageItem$1, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          Image: {
            Border: {
              smooth: {
                alpha: 1
              }
            },
            smooth: {
              scale: 1.03
            }
          },
          Title: {
            color: 0xffff00a7e3
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Image: {
            Border: {
              smooth: {
                alpha: 0
              }
            },
            smooth: {
              scale: 1
            }
          },
          Title: {
            color: 0xff101010
          }
        });
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Image: {
            Picture: {
              src: App.cropImage({
                url: v.getPicture(388),
                w: 370,
                h: 205
              })
            }
          },
          Title: {
            text: {
              text: v.title
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
          Image: {
            w: 382,
            h: 217,
            Picture: {
              w: 370,
              h: 205
            },
            Border: {
              alpha: 0,
              Border: {
                type: lng.components.BorderComponent,
                borderWidth: 6,
                colorBorder: 0xff00a7e3,
                w: 370,
                h: 205
              }
            }
          },
          Title: {
            y: 215,
            text: {
              fontSize: 24,
              fontFamily: 'OpenSans',
              fontStyle: 'bold',
              maxLines: 1,
              wordWrapWidth: 300
            },
            color: 0xff101010
          }
        };
      }
    }, {
      key: "width",
      get: function get() {
        return 450;
      }
    }, {
      key: "height",
      get: function get() {
        return 290;
      }
    }]);

    return ImageItem$1;
  }(GridItem);

  var Shows =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(Shows, _lng$Component15);

    function Shows() {
      _classCallCheck(this, Shows);

      return _possibleConstructorReturn(this, _getPrototypeOf(Shows).apply(this, arguments));
    }

    _createClass(Shows, [{
      key: "_init",
      value: function _init() {
        this._shows = new Map();
        this._showCategories = new Map();
      }
    }, {
      key: "_firstActive",
      value: function _firstActive() {
        this._setState("Loading");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 938,
          rect: true,
          color: 0xfff4f8f7,
          Spinner: {
            x: 960,
            y: 470,
            mount: 0.5,
            type: SpinningLogo
          },
          Shows: {
            x: 100,
            y: 40,
            type: Grid,
            construct: ImageItem$1,
            itemsPerRow: 4,
            rowsPerPage: 3,
            alpha: 0
          },
          ShowContent: {
            type: Album,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this15) {
          _inherits(Loading, _this15);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Spinner").setSmooth('alpha', 1);

              this._load();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Spinner").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Spinner");
            }
          }, {
            key: "_load",
            value: function _load() {
              var _this16 = this;

              var api = this.fireAncestors('$getApi');
              api.getShowCategories().then(function (data) {
                _this16._loaded(data);
              }).catch(function (err) {
                return console.error(err);
              });
            }
          }, {
            key: "_loaded",
            value: function _loaded(data) {
              var _this17 = this;

              data.forEach(function (item) {
                _this17._showCategories.set(item.nid, item);
              });
              this.tag("Shows").items = data;

              this._setState("Shows");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this18) {
          _inherits(Shows, _this18);

          function Shows() {
            _classCallCheck(this, Shows);

            return _possibleConstructorReturn(this, _getPrototypeOf(Shows).apply(this, arguments));
          }

          _createClass(Shows, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Shows").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Shows").setSmooth('alpha', 0);
            }
          }, {
            key: "_changedState",
            value: function _changedState(_ref, args) {
              var newState = _ref.newState,
                  prevState = _ref.prevState;

              if (newState === "Shows" && prevState === "Shows.ShowContent" && args && args.reset) {
                //reset the shows grid focus to first item
                this.tag("Shows").resetFocus();
              }
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._selectedNid = this.tag("Shows").active.item.nid;

              if (this._shows.get(this._selectedNid)) {
                this._setState("Shows.ShowContent");
              } else {
                this._setState("Shows.Loading");
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Shows");
            }
          }], [{
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
                  value: function $enter() {
                    this.tag("Shows").setSmooth('alpha', 0);
                    this.tag("Spinner").setSmooth('alpha', 1);

                    this._load();
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("Spinner").setSmooth('alpha', 0);
                  }
                }, {
                  key: "_getFocused",
                  value: function _getFocused() {
                    return this.tag("Spinner");
                  }
                }, {
                  key: "_load",
                  value: function _load() {
                    var _this20 = this;

                    var api = this.fireAncestors('$getApi');
                    api.getShows(this._selectedNid).then(function (data) {
                      _this20._loaded(data);
                    }).catch(function (err) {
                      return console.error(err);
                    });
                  }
                }, {
                  key: "_loaded",
                  value: function _loaded(data) {
                    this._shows.set(this._selectedNid, data);

                    this._setState("Shows.ShowContent");
                  }
                }]);

                return Loading;
              }(this),
              /*#__PURE__*/
              function (_this21) {
                _inherits(ShowContent, _this21);

                function ShowContent() {
                  _classCallCheck(this, ShowContent);

                  return _possibleConstructorReturn(this, _getPrototypeOf(ShowContent).apply(this, arguments));
                }

                _createClass(ShowContent, [{
                  key: "$enter",
                  value: function $enter() {
                    this.tag("Shows").setSmooth('alpha', 0);
                    this.tag("ShowContent").items = this._shows.get(this._selectedNid);
                    this.tag("ShowContent").logo = this._showCategories.get(this._selectedNid).headerImage;
                    this.tag("ShowContent").setSmooth('alpha', 1);
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("ShowContent").setSmooth('alpha', 0);
                    this.tag("Shows").setSmooth('alpha', 1);
                  }
                }, {
                  key: "_inactive",
                  value: function _inactive() {
                    this._setState("Shows", [{
                      reset: true
                    }]);
                  }
                }, {
                  key: "_handleBack",
                  value: function _handleBack() {
                    this._setState("Shows");
                  }
                }, {
                  key: "_getFocused",
                  value: function _getFocused() {
                    return this.tag("ShowContent");
                  }
                }]);

                return ShowContent;
              }(this)];
            }
          }]);

          return Shows;
        }(this)];
      }
    }]);

    return Shows;
  }(lng.Component);

  var Scrollbar =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(Scrollbar, _lng$Component16);

    function Scrollbar(stage) {
      var _this22;

      _classCallCheck(this, Scrollbar);

      _this22 = _possibleConstructorReturn(this, _getPrototypeOf(Scrollbar).call(this, stage));
      _this22._direction = 'vertical';
      _this22._colors = {
        background: 0xffd8d8d8,
        scrollerFocused: 0xff00a7e3,
        scrollerUnfocused: 0xff606060
      };
      return _this22;
    }

    _createClass(Scrollbar, [{
      key: "_init",
      value: function _init() {
        this._setState("Inactive");
      }
      /**
       * Set the scroll bar direction.
       * @param v vertical or horizontal
       */

    }, {
      key: "_handleNext",
      value: function _handleNext() {
        var scrollerPosition = this._scrollerPosition;

        if (this._scrollerPosition < this._totoalScrolls - 1) {
          scrollerPosition++;

          if (scrollerPosition > this._totoalScrolls - 1) {
            scrollerPosition = scrollerPosition - (scrollerPosition - (this._totoalScrolls - 1));
          }

          this._scrollerPosition = scrollerPosition;

          this._apply();
        } else {
          return false;
        }
      }
    }, {
      key: "_handlePrevious",
      value: function _handlePrevious() {
        if (this._scrollerPosition > 0) {
          this._scrollerPosition--;
          this._scrollerPosition = this._scrollerPosition < 0 ? 0 : this._scrollerPosition;

          this._apply();
        } else {
          return false;
        }
      }
    }, {
      key: "_apply",
      value: function _apply() {
        var scrollerStart = this._scrollerStartPosition;
        var viewStart = this._viewStartPosition;
        var axis = this._axis;
        this.tag("Scroller").patch({
          smooth: _defineProperty({}, axis, scrollerStart)
        });
        this.signal('scrollTo', viewStart);
      }
    }, {
      key: "direction",
      set: function set(v) {
        this._direction = v;
      }
      /**
       * Set the required colors for the scroll bar.
       * @param background scroll bar color
       * @param scrollerFocused scroller color when focused
       * @param scrollerUnfocused scroller color when it is out of focus
       */

    }, {
      key: "colors",
      set: function set(_ref2) {
        var _ref2$background = _ref2.background,
            background = _ref2$background === void 0 ? null : _ref2$background,
            _ref2$scrollerFocused = _ref2.scrollerFocused,
            scrollerFocused = _ref2$scrollerFocused === void 0 ? null : _ref2$scrollerFocused,
            _ref2$scrollerUnfocus = _ref2.scrollerUnfocused,
            scrollerUnfocused = _ref2$scrollerUnfocus === void 0 ? null : _ref2$scrollerUnfocus;
        this._colors.background = background || this._colors.background;
        this._colors.scrollerFocused = scrollerFocused || this._colors.scrollerFocused;
        this._colors.scrollerUnfocused = scrollerUnfocused || this._colors.scrollerUnfocused;
        this.tag("Background").patch({
          color: this._colors.background
        });
      }
      /**
       * Set the view sizes to which you want to apply scrolling.
       * @param visible view visible size
       * @param total view total size
       */

    }, {
      key: "sizes",
      set: function set(_ref3) {
        var visible = _ref3.visible,
            total = _ref3.total;
        this._visibleSize = visible;
        this._totalScrollSize = total; //current scroller position

        this._scrollerPosition = 0; //number of scrolls possible with scrolling only 80% of the view every time

        this._totoalScrolls = this._totalScrollSize / (0.8 * this._visibleSize); //scroller height

        this._scrollerSize = this._scrollbarTotalSize / this._totoalScrolls;
        var scrollerSizeProperty = this._direction === 'vertical' ? 'h' : 'w';
        this.tag("Scroller").patch({
          smooth: _defineProperty({}, scrollerSizeProperty, this._scrollerSize)
        });

        this._apply();
      }
    }, {
      key: "_scrollbarTotalSize",
      get: function get() {
        return this.tag("Background")[this._direction === 'vertical' ? 'finalH' : 'finalW'];
      }
    }, {
      key: "_scrollbarStart",
      get: function get() {
        return this.tag("Background")[this._direction === 'vertical' ? 'finalY' : 'finalX'];
      }
    }, {
      key: "_scrollerStartPosition",
      get: function get() {
        return this._scrollbarStart + this._scrollerPosition * this._scrollerSize;
      }
    }, {
      key: "_viewStartPosition",
      get: function get() {
        return Math.floor(this._totalScrollSize / this._totoalScrolls) * this._scrollerPosition * -1;
      }
    }, {
      key: "_axis",
      get: function get() {
        return this._direction === 'vertical' ? 'y' : 'x';
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            h: function h(_h) {
              return _h;
            },
            w: function w(_w) {
              return _w;
            },
            rect: true,
            color: 0xffd8d8d8
          },
          Scroller: {
            h: function h(_h2) {
              return _h2;
            },
            w: function w(_w2) {
              return _w2;
            },
            rect: true
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this23) {
          _inherits(Inactive, _this23);

          function Inactive() {
            _classCallCheck(this, Inactive);

            return _possibleConstructorReturn(this, _getPrototypeOf(Inactive).apply(this, arguments));
          }

          _createClass(Inactive, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Scroller: {
                  color: this._colors.scrollerUnfocused
                }
              });
            }
          }, {
            key: "_focus",
            value: function _focus() {
              this._setState("Active");
            }
          }]);

          return Inactive;
        }(this),
        /*#__PURE__*/
        function (_this24) {
          _inherits(Active, _this24);

          function Active() {
            _classCallCheck(this, Active);

            return _possibleConstructorReturn(this, _getPrototypeOf(Active).apply(this, arguments));
          }

          _createClass(Active, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Scroller: {
                  color: this._colors.scrollerFocused
                }
              });
            }
          }, {
            key: "_unfocus",
            value: function _unfocus() {
              this._setState("Inactive");
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this._direction === 'vertical') {
                return this._handleNext();
              } else {
                return false;
              }
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._direction === 'vertical') {
                return this._handlePrevious();
              } else {
                return false;
              }
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              if (this._direction !== 'vertical') {
                return this._handleNext();
              } else {
                return false;
              }
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              if (this._direction !== 'vertical') {
                return this._handlePrevious();
              } else {
                return false;
              }
            }
          }]);

          return Active;
        }(this)];
      }
    }]);

    return Scrollbar;
  }(lng.Component);

  var About =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(About, _lng$Component17);

    function About() {
      _classCallCheck(this, About);

      return _possibleConstructorReturn(this, _getPrototypeOf(About).apply(this, arguments));
    }

    _createClass(About, [{
      key: "_init",
      value: function _init() {
        var _this25 = this;

        this._frameListener = function () {
          var newHeight = _this25.tag("Terms.Clipper.Description").finalH;

          if (newHeight !== _this25._termsTotalHeight) {
            _this25._termsTotalHeight = newHeight;
            _this25._termsVisibleHeight = _this25.tag("Terms.Clipper").finalH;

            _this25._setScrollerSizes();
          }
        };

        this._setState(""); //add publisher description


        this.tag("Publisher.Description").children = About.TEXTS.publisher.description.map(function (item, index) {
          return {
            flexItem: {
              marginTop: index === 0 ? 0 : 30
            },
            text: {
              text: item.text,
              fontFamily: 'OpenSans',
              fontSize: 22,
              lineHeight: 40,
              wordWrapWidth: 550
            },
            color: 0xff606060
          };
        }); //add terms & conditions description

        var termsChildren = [];
        About.TEXTS.terms_conditions.description.forEach(function (item, blockIndex) {
          item.block.forEach(function (item, itemIndex) {
            var marginTop = blockIndex === 0 && itemIndex === 0 ? 0 : itemIndex === 0 ? 50 : 30;
            termsChildren.push({
              flexItem: {
                marginTop: marginTop
              },
              text: {
                text: item.text,
                fontFamily: 'OpenSans',
                fontSize: 22,
                lineHeight: 40,
                wordWrapWidth: 750
              },
              color: 0xff606060
            });
          });
        });
        this.tag("Terms.Clipper.Description").children = termsChildren;
      }
    }, {
      key: "_setScrollerSizes",
      value: function _setScrollerSizes() {
        this.tag("Scrollbar").sizes = {
          visible: this._termsVisibleHeight,
          total: this._termsTotalHeight
        };
      }
    }, {
      key: "_active",
      value: function _active() {
        this.stage.on('frameStart', this._frameListener);

        this._setState("Active");
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this.stage.removeListener('frameStart', this._frameListener);

        this._setState("");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 938,
          rect: true,
          color: 0xfff4f8f7,
          Publisher: {
            x: 150,
            y: 100,
            Title: {
              text: {
                text: About.TEXTS.publisher.title,
                fontFamily: 'OpenSans',
                fontStyle: 'bold',
                fontSize: 32,
                lineHeight: 43
              },
              color: 0xff101010
            },
            Description: {
              y: 70,
              w: 600,
              flex: {
                direction: "column"
              }
            }
          },
          Terms: {
            x: 850,
            y: 100,
            w: 800,
            Title: {
              text: {
                text: About.TEXTS.terms_conditions.title,
                fontFamily: 'OpenSans',
                fontStyle: 'bold',
                fontSize: 32,
                lineHeight: 43
              },
              color: 0xff101010
            },
            Clipper: {
              y: 70,
              w: 800,
              h: 780,
              clipping: true,
              Description: {
                w: 800,
                flex: {
                  direction: "column",
                  justifyItems: "flex-start"
                }
              }
            }
          },
          Scrollbar: {
            x: 1760,
            y: 100,
            w: 10,
            h: 720,
            type: Scrollbar,
            signals: {
              'scrollTo': true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this26) {
          _inherits(Active, _this26);

          function Active() {
            _classCallCheck(this, Active);

            return _possibleConstructorReturn(this, _getPrototypeOf(Active).apply(this, arguments));
          }

          _createClass(Active, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Scrollbar");
            }
          }, {
            key: "scrollTo",
            value: function scrollTo(position) {
              this.tag("Terms.Clipper.Description").patch({
                smooth: {
                  y: position
                }
              });
            }
          }]);

          return Active;
        }(this)];
      }
    }]);

    return About;
  }(lng.Component);

  About.TEXTS = {
    publisher: {
      title: "PUBLISHER",
      description: [{
        text: "France Médias Monde\n" + "Public limited company governed by the law of France\n" + "With registered capital of 23 045 660 euros \n" + "Registration number: RCS Nanterre - 501 524 029 \n" + "Registered Office: 80, rue Camille Desmoulins \n" + "92130 Issy Les Moulineaux\n" + "France"
      }, {
        text: "France 24 Head Office: 80 rue Camille Desmoulins, 92130 Issy Les Moulineaux, France\n" + "Editor-in-Chief: Marie-Christine Saragosse"
      }]
    },
    terms_conditions: {
      title: "FRANCE 24 TERMS AND CONDITIONS",
      description: [{
        block: [{
          text: 'Persons making use of the France 24 application ("Users" and the "Application") shall ' + 'automatically be deemed to accept these Conditions of Use. The term "Use" refers without ' + "distinction to any consultation, research or download carried out on the Site."
        }, {
          text: "France 24 may amend the Conditions of Use at any time without prior notice in order to adapt " + "them to changes in the Application or to changes in current laws and regulations. " + "Consequently, Users are advised to refer to them as regularly as possible."
        }]
      }, {
        block: [{
          text: "INTELLECTUAL PROPERTY RIGHTS"
        }, {
          text: "France 24 Content"
        }, {
          text: "Copyright © France 24 - All reproduction and representation rights reserved."
        }, {
          text: "The content of the Application belongs to France 24 and is protected by current legislation " + "concerning intellectual property rights and applicable international conventions. " + 'The term "content" means all the information present on the Application such as data, text, ' + "graphics, images, sounds, videos, logos, symbols and HTML code and which is published by France 24."
        }, {
          text: "Subject to any limitations provided by laws and regulations in France, any reproduction or " + "representation of the Application, whether in whole or in part, shall be subject to the prior " + "authorization of France 24. Such authorization shall be granted at France 24's sole discretion " + "and no reasons for its decision need be given."
        }, {
          text: "France 24 is a registered trademark, reference to which is authorized. References to the " + "France 24 trademark on a third party site do not imply any warranty or responsibility on the " + "part of France 24 as to the content of that third party site or the use to which it may be put."
        }, {
          text: "Agence France-Presse (AFP) Content"
        }, {
          text: "Copyright © Agence France-Presse - All reproduction and representation rights reserved."
        }, {
          text: 'Where the words "© AFP" appear on a page of the Application, that page contains reproduced ' + "information which is protected by AFP's intellectual property rights. Consequently, " + "none of this information can be reproduced, modified, redistributed, translated or used or " + "re-used commercially without AFP's prior written agreement. AFP shall not be liable for " + "any delays, errors or omissions which may occur, or for the consequences of any action taken " + "or transactions entered into on the basis of such information."
        }]
      }, {
        block: [{
          text: "USER'S OBLIGATIONS"
        }, {
          text: "Use of the service"
        }, {
          text: "Users undertake to use discretion when consulting the Application, particularly when relying " + "on the appropriateness, utility or completeness of the Content. Users are solely responsible " + "for any personal use made of the Content."
        }, {
          text: "Statements made and data and information provided to France 24 by Users at the time of " + "registration are communicated at the Users' sole risk."
        }, {
          text: "In general, Users undertake to refrain from any malicious Use intended to disrupt or harm " + "the Application and/or France 24 or its partners, or the programs of France 24 and its partners."
        }, {
          text: "Stock data provided by France Médias Monde are communicated at the users' sole risk, data can " + "only be used for user's own personal and non-commercial use and may not be used as the basis for a financial instrument."
        }, {
          text: "Warranties and Liabilities"
        }, {
          text: "The Content of the Application is provided “as is” without any warranty of any kind whether " + "express or implied other than as provided by current law, and in particular without any " + "warranty that the Content meets the needs of the User or that the Content is up to date."
        }, {
          text: "Although France 24 makes every effort to provide reliable, it does not guarantee that it is " + "free of inaccuracies, typographical errors, omissions and/or viruses. France 24 reserves the " + "right at any time and without prior notice to make improvements and/or amendments to the Content of the Application."
        }, {
          text: "Warning concerning Minors"
        }, {
          text: "Any User that is a natural person and a minor must confirm and acknowledge that he/she has " + "been authorized to use the Application by his/her parent(s) or guardian(s), and such parent(s) " + "or guardian(s) agree to guarantee that when the minor concerned uses the Application, he/she " + "complies with all the provisions of the Conditions of Use."
        }, {
          text: "For this reason, the parent(s) or guardian(s) of minors are asked to supervise the Use of " + "the Application made by such minors, and to bear in mind that the Application is intended " + "for a wide audience and that in their capacity as legal guardian(s) it is their responsibility " + "to decide whether the Web is or is not appropriate for such minors and to supervise their use of it. " + "For more information about parental control for the protection of minors, France 24 recommends " + "that parents or guardians contact their internet service provider."
        }, {
          text: "Applicable law - Independence of Clauses"
        }, {
          text: "These Conditions of Use will be subject to and interpreted in accordance with French law. " + "Any dispute which cannot be resolved by agreement will be referred to the courts of Nanterre. " + "In the event that any of the provisions of the Conditions of Use is held to be null or void, " + "the remaining provisions will automatically be deemed to apply."
        }, {
          text: "Failure by France 24 to apply, or to claim the application of, any of the provisions of the " + "Conditions of Use or of any right of any kind shall not in any circumstances be interpreted " + "as a waiver of that provision or that right on the part of France 24, unless France 24 agrees otherwise in writing."
        }]
      }]
    }
  };

  var Content =
  /*#__PURE__*/
  function (_lng$Component18) {
    _inherits(Content, _lng$Component18);

    function Content() {
      _classCallCheck(this, Content);

      return _possibleConstructorReturn(this, _getPrototypeOf(Content).apply(this, arguments));
    }

    _createClass(Content, [{
      key: "_init",
      value: function _init() {
        this._mapping = {
          "TOP STORIES": 'TopStories',
          "MOST VIEWED": 'MostViewed',
          "SHOWS": 'Shows',
          "ABOUT": 'About'
        };

        this._setState("TopStories");
      }
    }, {
      key: "select",
      value: function select(view) {
        if (this._mapping.hasOwnProperty(view)) {
          this._setState(this._mapping[view]);
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          TopStories: {
            type: TopStories,
            alpha: 0
          },
          MostViewed: {
            type: MostViewed,
            alpha: 0
          },
          Shows: {
            type: Shows,
            alpha: 0
          },
          About: {
            type: About,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this27) {
          _inherits(TopStories$$1, _this27);

          function TopStories$$1() {
            _classCallCheck(this, TopStories$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(TopStories$$1).apply(this, arguments));
          }

          _createClass(TopStories$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("TopStories").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("TopStories").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("TopStories");
            }
          }]);

          return TopStories$$1;
        }(this),
        /*#__PURE__*/
        function (_this28) {
          _inherits(MostViewed$$1, _this28);

          function MostViewed$$1() {
            _classCallCheck(this, MostViewed$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(MostViewed$$1).apply(this, arguments));
          }

          _createClass(MostViewed$$1, [{
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
              return this.tag("MostViewed");
            }
          }]);

          return MostViewed$$1;
        }(this),
        /*#__PURE__*/
        function (_this29) {
          _inherits(Shows$$1, _this29);

          function Shows$$1() {
            _classCallCheck(this, Shows$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Shows$$1).apply(this, arguments));
          }

          _createClass(Shows$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Shows").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Shows").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Shows");
            }
          }]);

          return Shows$$1;
        }(this),
        /*#__PURE__*/
        function (_this30) {
          _inherits(About$$1, _this30);

          function About$$1() {
            _classCallCheck(this, About$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(About$$1).apply(this, arguments));
          }

          _createClass(About$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("About").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("About").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("About");
            }
          }]);

          return About$$1;
        }(this)];
      }
    }]);

    return Content;
  }(lng.Component);

  var Main =
  /*#__PURE__*/
  function (_lng$Component19) {
    _inherits(Main, _lng$Component19);

    function Main() {
      _classCallCheck(this, Main);

      return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));
    }

    _createClass(Main, [{
      key: "_init",
      value: function _init() {
        this._setState("Content");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Content: {
            x: 0,
            y: 142,
            w: function w(_w3) {
              return _w3;
            },
            type: Content
          },
          Header: {
            type: Header
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this31) {
          _inherits(Header$$1, _this31);

          function Header$$1() {
            _classCallCheck(this, Header$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Header$$1).apply(this, arguments));
          }

          _createClass(Header$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Header");
            }
          }, {
            key: "$select",
            value: function $select(item) {
              this._setState("Content");

              this.tag("Content").select(item);
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Content");
            }
          }]);

          return Header$$1;
        }(this),
        /*#__PURE__*/
        function (_this32) {
          _inherits(Content$$1, _this32);

          function Content$$1() {
            _classCallCheck(this, Content$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Content$$1).apply(this, arguments));
          }

          _createClass(Content$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Content");
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Header");
            }
          }]);

          return Content$$1;
        }(this)];
      }
    }]);

    return Main;
  }(lng.Component);

  var MediaItem =
  /*#__PURE__*/
  function () {
    function MediaItem() {
      _classCallCheck(this, MediaItem);
    }

    _createClass(MediaItem, [{
      key: "getPicture",

      /**
       * Get a picture that matches a certain width or height
       * @param w
       * @param h
       * @returns {*}
       */
      value: function getPicture() {
        var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var pictures = this._pictures;

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
            return match[0].url;
          } else {
            return pictures[0].url;
          }
        }
      }
    }, {
      key: "getMediaplayerItem",
      value: function getMediaplayerItem() {
        return this._mediaplayerItem ? this._mediaplayerItem : this._mediaplayerItem = {
          title: this.title,
          description: this.description,
          stream: {
            link: this.video
          }
        };
      }
      /**
       * Constructs a Media item object from the given news bulletin item.
       *
       * @param channel {object} bulletin item.
       * @returns {MediaItem} Media item
       */

    }, {
      key: "title",
      set: function set(title) {
        this._title = title;
      },
      get: function get() {
        return this._title;
      }
    }, {
      key: "description",
      set: function set(description) {
        this._description = description;
      },
      get: function get() {
        return this._description;
      }
    }, {
      key: "pictures",
      set: function set(pictures) {
        this._pictures = pictures;
      },
      get: function get() {
        return this._pictures;
      }
    }, {
      key: "headerImage",
      set: function set(url) {
        this._header_image = url;
      },
      get: function get() {
        return this._header_image;
      }
    }, {
      key: "videos",
      set: function set(videos) {
        this._videos = videos;
      },
      get: function get() {
        return this._videos;
      }
    }, {
      key: "createdTime",
      set: function set(createdTime) {
        this._createdTime = createdTime ? parseInt(createdTime) || 0 : 0;
      },
      get: function get() {
        return this._createdTime;
      }
    }, {
      key: "nid",
      set: function set(nid) {
        this._nid = nid;
      },
      get: function get() {
        return this._nid;
      }
    }, {
      key: "video",
      get: function get() {
        return this.videos[0].url;
      }
    }], [{
      key: "fromBulletinItem",
      value: function fromBulletinItem(channel) {
        var mediaItem = new MediaItem();
        mediaItem.title = channel.title;
        mediaItem.pictures = MediaItem._getPictures(channel.images.formats);
        mediaItem.videos = channel.videos[0].formats;
        return mediaItem;
      }
      /**
       * Constructs a Media item object from the given show category.
       *
       * @param show {object} show category item
       * @returns {MediaItem} Media item
       */

    }, {
      key: "fromShowCategoryItem",
      value: function fromShowCategoryItem(show) {
        var mediaItem = new MediaItem();
        mediaItem.title = show.title;
        mediaItem.nid = show.nid;
        mediaItem.pictures = MediaItem._getPictures(show.images.formats);
        mediaItem.headerImage = MediaItem._getHeaderImage(show);
        return mediaItem;
      }
      /**
       * Constructs a Media item object from the given show content item.
       *
       * @param show {object} show content item
       * @returns {MediaItem} Media item
       */

    }, {
      key: "fromShowContentItem",
      value: function fromShowContentItem(show) {
        var mediaItem = new MediaItem();
        mediaItem.title = show.surtitle;
        mediaItem.description = show.title;
        mediaItem.createdTime = show.created;
        mediaItem.pictures = MediaItem._getPictures(show.images.formats);
        mediaItem.videos = Api.filterMP4(show.videos[0].formats);
        return mediaItem;
      }
      /**
       * Constructs a Media item object from the given most viewed item.
       *
       * @param mostViewed {object} most viewed item
       * @returns {MediaItem} Media item
       */

    }, {
      key: "fromMostViewedItem",
      value: function fromMostViewedItem(mostViewed) {
        var mediaItem = new MediaItem();
        mediaItem.title = mostViewed.title;
        mediaItem.description = mostViewed.title;
        mediaItem.createdTime = mostViewed.created;
        mediaItem.pictures = MediaItem._getPictures(mostViewed.images.formats);
        mediaItem.videos = Api.filterMP4(mostViewed.formats);
        return mediaItem;
      }
    }, {
      key: "_getPictures",
      value: function _getPictures(formats) {
        return formats.map(function (format) {
          var dimensions = format.code.split('x');
          var w = 0,
              h = 0;

          if (dimensions.length == 2) {
            w = parseInt(dimensions[0]);
            h = parseInt(dimensions[1]);
          }

          return {
            width: w,
            height: h,
            url: format.url
          };
        }).sort(function (a, b) {
          return b.width - a.width;
        });
      }
    }, {
      key: "_getHeaderImage",
      value: function _getHeaderImage(show) {
        if (show.header_images && show.header_images.formats && show.header_images.formats.length) {
          return show.header_images.formats.filter(function (format) {
            return format.code === 'original';
          })[0].url;
        }

        return "";
      }
    }]);

    return MediaItem;
  }();

  var Api =
  /*#__PURE__*/
  function () {
    function Api() {
      _classCallCheck(this, Api);

      this._keys = {
        token: 'c7d743bf-dff4-4884-8038-18056c1f7380'
      };
      this._endpoints = {
        primaryFeed: "http://f24hls-i.akamaihd.net/hls/live/221147/F24_EN_HI_HLS/master.m3u8?hdnts=exp=1609455599~acl=/hls/live/*/F24_EN_HI_HLS/*~id=metrological~hmac=c5e66cd72896ac906d5f5b7856666d4730fcdb1879c787fb5357fceb5bc2a63f",
        livePrograms: "http://apis.france24.com/products/get_product/fe445440-7537-11e8-87cc-005056a945c4?token_application=".concat(this._keys.token),
        latestBulletins: "http://apis.france24.com/products/get_product/ott_last_news_en?token_application=".concat(this._keys.token),
        latestStories: "http://apis.france24.com/products/get_product/b5f278ea-73d2-11e8-9e7f-005056a945c4?token_application=".concat(this._keys.token),
        showCategories: "http://apis.france24.com/products/get_product/a2332ae0-88d3-43df-9c48-c9d9e1f6e5ef?token_application=".concat(this._keys.token),
        showContent: "http://api2.france24.com/products/get_product/9e99dde9-c93b-4e6e-8266-d3eb66919d1e?token_application=".concat(this._keys.token),
        mostViewed: "http://apis.france24.com/products/get_product/7750926a-b695-11e8-9e60-005056bf3e3d?token_application=".concat(this._keys.token),
        liveTvPrograms: "http://apis.france24.com/products/get_product/fe445440-7537-11e8-87cc-005056a945c4?token_application=".concat(this._keys.token)
      };
    }

    _createClass(Api, [{
      key: "_send",
      value: function _send(url) {
        return fetch(url).then(function (r) {
          return r.json();
        });
      }
      /**
       * Returns the primary feed of the live tv.
       * @returns {string} primary feed of the live tv
       */

    }, {
      key: "getPrimaryFeed",
      value: function getPrimaryFeed() {
        return this._endpoints.primaryFeed;
      }
      /**
       * Returns a promise to fetch the latest news bulletins.
       *
       * @returns {Promise}
       */

    }, {
      key: "getLatestBulletins",
      value: function getLatestBulletins() {
        return this._send(this._endpoints.latestBulletins).then(function (data) {
          if (data.result == null || data.result == undefined) {
            return Promise.reject('Get latest news bulletins returned no data');
          }

          var channels = data.result.channels;

          if (!channels.length) {
            return Promise.reject('Get latest news bulletins returned no data');
          }

          var hasImage = function hasImage(item) {
            return item.images && item.images.formats && item.images.formats.length;
          };

          var hasVideo = function hasVideo(item) {
            return item.videos && item.videos.length && item.videos[0].formats && item.videos[0].formats.length && item.videos[0].formats[0].code !== 'hls_secure';
          };

          return Promise.resolve(channels.filter(function (item) {
            return hasImage(item) && hasVideo(item);
          }).map(function (channel) {
            return MediaItem.fromBulletinItem(channel);
          }));
        });
      }
      /**
       * Returns a promise to fetch the list of most viewed shows.
       *
       * @returns {Promise}
       */

    }, {
      key: "getMostViewed",
      value: function getMostViewed() {
        return this._send(this._endpoints.mostViewed).then(function (data) {
          if (data.result == null || data.result == undefined) {
            return Promise.reject('Get most viewed returned no data');
          }

          var list = data.result.list;

          if (!list.length) {
            return Promise.reject('Get most viewed returned no data');
          }

          var hasImage = function hasImage(item) {
            return item.images && item.images.formats && item.images.formats.length;
          };

          var hasVideo = function hasVideo(item) {
            return item.formats && item.formats.length && Api.filterMP4(item.formats).length;
          };

          return Promise.resolve(list.filter(function (item) {
            return hasImage(item) && hasVideo(item);
          }).map(function (item) {
            return MediaItem.fromMostViewedItem(item);
          }));
        });
      }
      /**
       * Returns a promise to fetch the latest stories.
       * @returns {Promise}
       */

    }, {
      key: "getLatestStories",
      value: function getLatestStories() {
        return this._getShowContent(this._endpoints.latestStories);
      }
      /**
       * Returns a promise to fetch the list of show categories
       *
       * @returns {Promise}
       */

    }, {
      key: "getShowCategories",
      value: function getShowCategories() {
        return this._send(this._endpoints.showCategories).then(function (data) {
          if (data.result == null || data.result == undefined) {
            return Promise.reject('Get show categories returned no data');
          }

          var shows = data.result.list;

          if (!shows.length) {
            return Promise.reject('Get show categories returned no data');
          }

          var hasImage = function hasImage(item) {
            return item.images && item.images.formats && item.images.formats.length;
          };

          return Promise.resolve(shows.filter(function (item) {
            return hasImage(item);
          }).map(function (show) {
            return MediaItem.fromShowCategoryItem(show);
          }));
        });
      }
      /**
       * Returns a promise to fetch the list of videos available for a show category.
       * @param nid nid of the show
       * @returns {Promise}
       */

    }, {
      key: "getShows",
      value: function getShows(nid) {
        return this._getShowContent("".concat(this._endpoints.showContent, "&nid=").concat(nid));
      }
    }, {
      key: "_getShowContent",
      value: function _getShowContent(url) {
        return this._send(url).then(function (data) {
          if (data.result == null || data.result == undefined) {
            return Promise.reject('Get show content returned no data');
          }

          var shows = data.result.list;

          if (!shows.length) {
            return Promise.reject('Get show content returned no data');
          }

          var hasImage = function hasImage(item) {
            return item.images && item.images.formats && item.images.formats.length;
          };

          var hasVideo = function hasVideo(item) {
            return item.videos && item.videos.length && item.videos[0].formats && item.videos[0].formats.length && Api.filterMP4(item.videos[0].formats).length;
          };

          return Promise.resolve(shows.filter(function (item) {
            return hasImage(item) && hasVideo(item);
          }).map(function (show) {
            return MediaItem.fromShowContentItem(show);
          }));
        });
      }
    }, {
      key: "getLivePrograms",

      /**
       * Returns a promise to fetch the current & next live programs.
       * @returns {Promise}
       */
      value: function getLivePrograms() {
        return this._send(this._endpoints.liveTvPrograms).then(function (data) {
          if (!data.result || !data.result.content || !data.result.content.program_guide || !data.result.content.program_guide.length || !data.result.content.program_guide[0].schedule || !data.result.content.program_guide[0].schedule.length || !data.result.content.starting_date) {
            return Promise.reject('Get live program returned no data');
          } //get the date from the starting date


          var programDate = data.result.content.starting_date.split('T')[0];
          var schedule = data.result.content.program_guide[0].schedule;
          var programs = []; //create programs with start time & end time

          for (var index = 0; index < schedule.length - 1; index++) {
            //time stamps are in Central European Standard Time
            var start_time = Date.parse("".concat(programDate, "T").concat(schedule[index].start_at, "+01:00"));
            var end_time = Date.parse("".concat(programDate, "T").concat(schedule[index + 1].start_at, "+01:00"));
            programs.push({
              title: schedule[index].program_label || schedule[index].type,
              start_time: start_time,
              end_time: end_time
            });
          } //current time


          var currentTime = Date.now(); //Find out the current & next programs from the available

          for (var _index = 0; _index <= programs.length - 1; _index++) {
            if (currentTime >= programs[_index].start_time && currentTime < programs[_index].end_time) {
              return Promise.resolve({
                current: programs[_index],
                next: _index === programs.length - 1 ? null : programs[_index + 1]
              });
            }
          }

          return Promise.resolve();
        });
      }
    }], [{
      key: "filterMP4",
      value: function filterMP4(formats) {
        return formats.filter(function (item) {
          return item.code === 'MP4';
        });
      }
    }]);

    return Api;
  }();

  var PlayerButton =
  /*#__PURE__*/
  function (_lng$Component20) {
    _inherits(PlayerButton, _lng$Component20);

    function PlayerButton() {
      _classCallCheck(this, PlayerButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerButton).apply(this, arguments));
    }

    _createClass(PlayerButton, [{
      key: "_focus",
      value: function _focus() {
        this._focused = true;

        this._setState("Selected");
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._focused = false;

        this._setState("");
      }
    }, {
      key: "icon",
      set: function set(icon) {
        this._icon = icon;
        var color = this._focused ? this.colors.focused : this._isActive ? this.colors.enabled : this.colors.disabled;
        this.tag("Icon").patch({
          src: icon,
          color: color
        });
      }
    }, {
      key: "active",
      set: function set(v) {
        this._isActive = v;
        var color = v ? this._focused ? this.colors.focused : this.colors.enabled : this.colors.disabled;
        this.tag("Icon").patch({
          smooth: {
            color: color
          }
        });
      },
      get: function get() {
        return this._isActive;
      }
    }, {
      key: "colors",
      get: function get() {
        return {
          disabled: 0xffe7e4e4,
          enabled: 0xff909090,
          focused: 0xff00a7e3
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 68,
          h: 68,
          Icon: {
            x: 34,
            y: 34,
            mount: 0.5,
            w: 68,
            h: 68
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this33) {
          _inherits(Selected, _this33);

          function Selected() {
            _classCallCheck(this, Selected);

            return _possibleConstructorReturn(this, _getPrototypeOf(Selected).apply(this, arguments));
          }

          _createClass(Selected, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Icon").patch({
                smooth: {
                  color: this.colors.focused
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {
              var color = this._isActive ? this.colors.enabled : this.colors.disabled;
              this.tag("Icon").patch({
                smooth: {
                  color: color
                }
              });
            }
          }]);

          return Selected;
        }(this)];
      }
    }]);

    return PlayerButton;
  }(lng.Component);

  var PlayerControls =
  /*#__PURE__*/
  function (_lng$Component21) {
    _inherits(PlayerControls, _lng$Component21);

    function PlayerControls() {
      _classCallCheck(this, PlayerControls);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerControls).apply(this, arguments));
    }

    _createClass(PlayerControls, [{
      key: "showButtons",
      value: function showButtons(previous, next) {
        this._showButtons(previous, next);
      }
    }, {
      key: "_changedState",
      value: function _changedState(_ref4) {
        var newState = _ref4.newState;
        this.tag("Previous").visible = newState === "Live" ? false : true;
        this.tag("Next").visible = newState === "Live" ? false : true;
        this.tag("Duration").setSmooth('alpha', newState === "Live" ? 0 : 1);
        this.tag("Description").setSmooth('alpha', newState === "Live" ? 0.5 : 1);
      }
    }, {
      key: "title",
      set: function set(title) {
        this.tag("Title").text = title || "";
      }
    }, {
      key: "description",
      set: function set(description) {
        if (description) {
          this.tag("TitleFlex").patch({
            smooth: {
              y: -8
            }
          });
        } else {
          this.tag("TitleFlex").patch({
            smooth: {
              y: 12
            }
          });
        }

        this.tag("Description").text = description || "";
      }
    }, {
      key: "duration",
      set: function set(duration) {
        this.tag("Duration").text = Math.floor(duration / 60) === 0 ? "" : Player.formatTime(duration);
      },
      get: function get() {
        return this.tag("Duration").text.text;
      }
    }, {
      key: "mode",
      set: function set(mode) {
        if (mode === Player.MODES.RECORDED) {
          //TODO Check whether there is any way to force call the $enter of a state.
          this._setState("");

          this._setState("Recorded");
        } else {
          this._setState("Live");
        }
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
          RootFlex: {
            flex: {
              direction: 'row'
            },
            Buttons: {
              flexItem: {},
              flex: {
                direction: 'row',
                justifyItems: 'flex-start'
              },
              Previous: {
                flexItem: {},
                type: PlayerButton,
                icon: App.getPath('images/rewind.png')
              },
              Play: {
                flexItem: {
                  marginLeft: 20
                },
                type: PlayerButton,
                icon: App.getPath('images/pause.png')
              },
              Next: {
                flexItem: {
                  marginLeft: 20
                },
                type: PlayerButton,
                icon: App.getPath('images/forward.png')
              }
            },
            Metadata: {
              flexItem: {
                marginLeft: 50
              },
              TitleFlex: {
                y: 12,
                flex: {
                  direction: "row",
                  justifyItems: "flex-start"
                },
                Title: {
                  flexItem: {},
                  text: {
                    fontSize: 32,
                    maxLines: 1,
                    wordWrapWidth: 846,
                    fontFamily: "OpenSans",
                    fontStyle: "bold"
                  },
                  color: 0xff101010
                },
                Duration: {
                  flexItem: {
                    marginTop: 7,
                    marginLeft: 15
                  },
                  text: {
                    fontSize: 24,
                    fontFamily: "OpenSans",
                    fontStyle: "bold"
                  },
                  color: 0xff909090
                }
              },
              Description: {
                y: 40,
                text: {
                  fontSize: 28,
                  maxLines: 1,
                  wordWrapWidth: 896,
                  fontFamily: "OpenSans",
                  fontStyle: "bold"
                },
                color: 0xff101010
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
        function (_this34) {
          _inherits(Recorded, _this34);

          function Recorded() {
            _classCallCheck(this, Recorded);

            return _possibleConstructorReturn(this, _getPrototypeOf(Recorded).apply(this, arguments));
          }

          _createClass(Recorded, [{
            key: "$enter",
            value: function $enter() {
              this._setState("Recorded.Play");

              this.showButtons(false, false);
            }
          }, {
            key: "_showButtons",
            value: function _showButtons(previous, next) {
              var buttons = [];
              if (previous) buttons.push("Previous");
              buttons = buttons.concat("Play");
              if (next) buttons.push("Next");

              this._setActiveButtons(buttons);
            }
          }, {
            key: "_setActiveButtons",
            value: function _setActiveButtons(buttons) {
              var _this35 = this;

              this._activeButtons = [];
              this.tag("Buttons").children.map(function (button) {
                button.active = buttons.indexOf(button.ref) !== -1;

                if (button.active) {
                  _this35._activeButtons.push(button);
                }
              });

              this._checkActiveButton();
            }
          }, {
            key: "_checkActiveButton",
            value: function _checkActiveButton() {
              // After changing the active buttons, make sure that an active button is selected.
              var index = this._activeButtonIndex;

              if (index === -1) {
                if (this._index >= this._activeButtons.length) {
                  this._index = this._activeButtons.length - 1;
                }
              }

              this._setState("Recorded." + this._activeButtons[index].ref);
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              var index = this._activeButtonIndex;

              if (index > 0) {
                index--;
              }

              this._setState("Recorded." + this._activeButtons[index].ref);
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              var index = this._activeButtonIndex;

              if (index < this._activeButtons.length - 1) {
                index++;
              }

              this._setState("Recorded." + this._activeButtons[index].ref);
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.signal('press' + this._activeButton.ref);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag(this._getViewRef(this._getState()));
            }
          }, {
            key: "_getViewRef",
            value: function _getViewRef(state) {
              return state.split('.')[1];
            }
          }, {
            key: "_activeButtonIndex",
            get: function get() {
              var button = this.tag("Buttons").getByRef(this._getViewRef(this._getState()));

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
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this36) {
                _inherits(Previous, _this36);

                function Previous() {
                  _classCallCheck(this, Previous);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Previous).apply(this, arguments));
                }

                return Previous;
              }(this),
              /*#__PURE__*/
              function (_this37) {
                _inherits(Play, _this37);

                function Play() {
                  _classCallCheck(this, Play);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Play).apply(this, arguments));
                }

                return Play;
              }(this),
              /*#__PURE__*/
              function (_this38) {
                _inherits(Next, _this38);

                function Next() {
                  _classCallCheck(this, Next);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Next).apply(this, arguments));
                }

                return Next;
              }(this)];
            }
          }]);

          return Recorded;
        }(this),
        /*#__PURE__*/
        function (_this39) {
          _inherits(Live, _this39);

          function Live() {
            _classCallCheck(this, Live);

            return _possibleConstructorReturn(this, _getPrototypeOf(Live).apply(this, arguments));
          }

          _createClass(Live, [{
            key: "_handleEnter",
            value: function _handleEnter() {
              this.signal('pressPlay');
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Play");
            }
          }]);

          return Live;
        }(this)];
      }
    }]);

    return PlayerControls;
  }(lng.Component);

  var PlayerProgress =
  /*#__PURE__*/
  function (_lng$Component22) {
    _inherits(PlayerProgress, _lng$Component22);

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
        var x = v * 1260;
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
            Total: {
              texture: lng.Tools.getRoundRect(1260, 10, 0),
              color: 0xffb2b2b2
            },
            Active: {
              color: 0xff00a7e3
            }
          }
        };
      }
    }]);

    return PlayerProgress;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component23) {
    _inherits(Player, _lng$Component23);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "_init",
      value: function _init() {
        this._api = this.fireAncestors('$getApi');
      }
      /**
       * Plays the given recorded video play list.
       * @param item first item to be played
       * @param items playlist
       * @returns {boolean}
       */

    }, {
      key: "play",
      value: function play(_ref5) {
        var item = _ref5.item,
            items = _ref5.items;
        this._items = items;
        this._item = item;

        this._setState("Fullscreen.Recorded");

        return this._play();
      }
      /**
       * Plays the live streaming.
       * @param minimized true to indicate the player should play in window mode.
       * @returns {boolean}
       */

    }, {
      key: "playLive",
      value: function playLive(title, minimized) {
        var api = this.fireAncestors('$getApi');
        this._item = {
          title: title,
          description: 'Live',
          stream: {
            link: api.getPrimaryFeed()
          }
        };

        if (minimized) {
          this._setState("Minimized");
        } else {
          this._setState("Fullscreen.Live");
        }

        return this._play();
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
          zIndex: 99,
          Background: {
            x: 330,
            y: 932,
            h: 113,
            w: 1260,
            color: 0xfff3f7f5,
            rect: true
          },
          Controls: {
            x: 360,
            y: 956,
            type: PlayerControls,
            signals: {
              pressPlay: true,
              pressPrevious: true,
              pressNext: "_pressNext"
            }
          },
          Progress: {
            x: 329,
            y: 1044,
            type: PlayerProgress
          }
        };
      }
    }, {
      key: "formatTime",
      value: function formatTime(seconds) {
        return Math.floor(seconds / 60) + " min";
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this40) {
          _inherits(Fullscreen, _this40);

          function Fullscreen() {
            _classCallCheck(this, Fullscreen);

            return _possibleConstructorReturn(this, _getPrototypeOf(Fullscreen).apply(this, arguments));
          }

          _createClass(Fullscreen, [{
            key: "$enter",
            value: function $enter() {
              this._setInterfaceTimeout();

              this.setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              clearTimeout(this._timeout);
              this.setSmooth('alpha', 0);
            }
          }, {
            key: "pressPlay",
            value: function pressPlay() {
              this.application.mediaplayer.playPause();
            }
          }, {
            key: "_playerStop",
            value: function _playerStop() {
              this.signal('playerStop');

              this._setState("Inactive");
            }
          }, {
            key: "$mediaplayerPause",
            value: function $mediaplayerPause() {
              this.tag("Controls").paused = true;
            }
          }, {
            key: "$mediaplayerPlay",
            value: function $mediaplayerPlay() {
              this.tag("Controls").paused = false;
            }
          }, {
            key: "$mediaplayerStop",
            value: function $mediaplayerStop() {
              this._playerStop();
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._playerStop();
            }
          }, {
            key: "_captureKey",
            value: function _captureKey() {
              this._setInterfaceTimeout();

              return false;
            }
          }, {
            key: "_setInterfaceTimeout",
            value: function _setInterfaceTimeout() {
              var _this41 = this;

              if (this._timeout) {
                clearTimeout(this._timeout);
              }

              this._timeout = setTimeout(function () {
                _this41._hide();
              }, 8000);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Controls");
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this42) {
                _inherits(Recorded, _this42);

                function Recorded() {
                  _classCallCheck(this, Recorded);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Recorded).apply(this, arguments));
                }

                _createClass(Recorded, [{
                  key: "$enter",
                  value: function $enter() {
                    this.tag("Progress").setSmooth('alpha', 1);
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("Progress").setSmooth('alpha', 0);
                  }
                }, {
                  key: "_play",
                  value: function _play() {
                    this.tag("Controls").mode = Player.MODES.RECORDED;

                    this._setItem(this._item);

                    return !!this._stream;
                  }
                }, {
                  key: "_setItem",
                  value: function _setItem(item) {
                    this._stream = item.stream;
                    this.tag("Controls").title = item.title;
                    this.tag("Controls").description = item.description;
                    this.tag("Controls").duration = 0;
                    this.tag("Progress").setProgress(0, 0);
                    this._index = this._items.indexOf(item);
                    this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);
                    this.application.updateFocusSettings();
                  }
                }, {
                  key: "pressPrevious",
                  value: function pressPrevious() {
                    var index = this._index - 1;

                    if (index < 0) {
                      this._index = this._items.length - 1;
                    }

                    this._setItem(this._items[index]);
                  }
                }, {
                  key: "_pressNext",
                  value: function _pressNext() {
                    if (!this._items.length) {
                      this._playerStop();
                    }

                    var index = (this._index + 1) % this._items.length;

                    this._setItem(this._items[index]);
                  }
                }, {
                  key: "$mediaplayerProgress",
                  value: function $mediaplayerProgress(_ref6) {
                    var currentTime = _ref6.currentTime,
                        duration = _ref6.duration;
                    if (!this.tag("Controls").duration) this.tag("Controls").duration = duration;
                    this.tag("Progress").setProgress(currentTime, duration);
                  }
                }, {
                  key: "$mediaplayerEnded",
                  value: function $mediaplayerEnded() {
                    this._pressNext();
                  }
                }, {
                  key: "_hide",
                  value: function _hide() {
                    this._setState("Fullscreen.Recorded.Hidden");
                  }
                }], [{
                  key: "_states",
                  value: function _states() {
                    return [
                    /*#__PURE__*/
                    function (_this43) {
                      _inherits(Hidden, _this43);

                      function Hidden() {
                        _classCallCheck(this, Hidden);

                        return _possibleConstructorReturn(this, _getPrototypeOf(Hidden).apply(this, arguments));
                      }

                      _createClass(Hidden, [{
                        key: "$enter",
                        value: function $enter(_ref7) {
                          var prevState = _ref7.prevState;
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
                    }(this)];
                  }
                }]);

                return Recorded;
              }(this),
              /*#__PURE__*/
              function (_this44) {
                _inherits(Live, _this44);

                function Live() {
                  _classCallCheck(this, Live);

                  return _possibleConstructorReturn(this, _getPrototypeOf(Live).apply(this, arguments));
                }

                _createClass(Live, [{
                  key: "$enter",
                  value: function $enter() {
                    this.tag("Progress").setSmooth('alpha', 0);

                    this._setTimeout(0);
                  }
                }, {
                  key: "$exit",
                  value: function $exit() {
                    this.tag("Progress").setSmooth('alpha', 1);

                    this._clearTimeout(); //reset the live program information


                    this._setLiveProgramInfo();
                  }
                }, {
                  key: "_setTimeout",
                  value: function _setTimeout(duration) {
                    var _this45 = this;

                    this._timerId = setTimeout(function () {
                      _this45._api.getLivePrograms().then(function (programs) {
                        //set the live program information
                        _this45._setLiveProgramInfo(programs);

                        var nextPingAt = App.LIVE_PROGRAMS_POLL_FREQUENCY;

                        if (programs) {
                          var nextProgramIn = programs.current.end_time - Date.now(); //If the next program starts in less than the poll frequency then adjust the next ping

                          if (nextProgramIn < App.LIVE_PROGRAMS_POLL_FREQUENCY) {
                            nextPingAt = nextProgramIn;
                          }
                        }

                        _this45._setTimeout(nextPingAt);
                      }).catch(function (err) {
                        console.error(err);

                        _this45._clearTimeout();
                      });
                    }, duration);
                  }
                }, {
                  key: "_clearTimeout",
                  value: function _clearTimeout() {
                    clearTimeout(this._timerId);
                  }
                }, {
                  key: "_setLiveProgramInfo",
                  value: function _setLiveProgramInfo(programs) {
                    if (programs) {
                      this.tag("Controls").title = programs.current.title.toUpperCase();
                    } else {
                      this.tag("Controls").title = "";
                    }
                  }
                }, {
                  key: "_play",
                  value: function _play() {
                    this.tag("Controls").mode = Player.MODES.LIVE;
                    this._stream = this._item.stream;
                    this.tag("Controls").title = this._item.title;
                    this.tag("Controls").description = this._item.description;
                    this.application.updateFocusSettings();
                    return !!this._stream;
                  }
                }, {
                  key: "_hide",
                  value: function _hide() {
                    this._setState("Fullscreen.Live.Hidden");
                  }
                }], [{
                  key: "_states",
                  value: function _states() {
                    return [
                    /*#__PURE__*/
                    function (_this46) {
                      _inherits(Hidden, _this46);

                      function Hidden() {
                        _classCallCheck(this, Hidden);

                        return _possibleConstructorReturn(this, _getPrototypeOf(Hidden).apply(this, arguments));
                      }

                      _createClass(Hidden, [{
                        key: "$enter",
                        value: function $enter(_ref8) {
                          var prevState = _ref8.prevState;
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
                    }(this)];
                  }
                }]);

                return Live;
              }(this)];
            }
          }]);

          return Fullscreen;
        }(this),
        /*#__PURE__*/
        function (_this47) {
          _inherits(Minimized, _this47);

          function Minimized() {
            _classCallCheck(this, Minimized);

            return _possibleConstructorReturn(this, _getPrototypeOf(Minimized).apply(this, arguments));
          }

          _createClass(Minimized, [{
            key: "_play",
            value: function _play() {
              var api = this.fireAncestors('$getApi');
              this._stream = {
                link: api.getPrimaryFeed()
              };
              return true;
            }
          }]);

          return Minimized;
        }(this),
        /*#__PURE__*/
        function (_this48) {
          _inherits(Inactive, _this48);

          function Inactive() {
            _classCallCheck(this, Inactive);

            return _possibleConstructorReturn(this, _getPrototypeOf(Inactive).apply(this, arguments));
          }

          return Inactive;
        }(this)];
      }
    }]);

    return Player;
  }(lng.Component);

  Player.MODES = {
    RECORDED: 'recorded',
    LIVE: 'live'
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
        this._setState("Splash");
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        if (this.state === "Playing") {
          settings.mediaplayer.consumer = this.tag("Player");
        } else if (this.state === "Main.MinimizedPlayback") {
          settings.mediaplayer.consumer = this.tag("Player");
          settings.mediaplayer.videoPos = [92, 178, 808, 580];
        }
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'OpenSans',
          url: App.getPath('fonts/OpenSans-Regular.ttf'),
          descriptors: {}
        }, {
          family: 'OpenSans',
          url: App.getPath('fonts/OpenSans-SemiBold.ttf'),
          descriptors: {
            'weight': 'bold'
          }
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Splash: {
            type: Splash
          },
          Main: {
            type: Main,
            alpha: 0,
            transitions: {
              alpha: {
                duration: 0.3,
                delay: 0.1
              }
            }
          },
          Player: {
            type: Player,
            alpha: 0,
            signals: {
              playerStop: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this49) {
          _inherits(Splash$$1, _this49);

          function Splash$$1() {
            _classCallCheck(this, Splash$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Splash$$1).apply(this, arguments));
          }

          _createClass(Splash$$1, [{
            key: "$exit",
            value: function $exit() {
              this.tag("Splash").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Splash");
            }
          }, {
            key: "$hideSplash",
            value: function $hideSplash() {
              this._setState("Main");
            }
          }]);

          return Splash$$1;
        }(this),
        /*#__PURE__*/
        function (_this50) {
          _inherits(Main$$1, _this50);

          function Main$$1() {
            _classCallCheck(this, Main$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Main$$1).apply(this, arguments));
          }

          _createClass(Main$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Main").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Main").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Main");
            }
          }, {
            key: "$play",
            value: function $play(_ref9) {
              var item = _ref9.item,
                  items = _ref9.items;
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
            key: "$playLive",
            value: function $playLive(title, minimized) {
              var player = this.tag('Player');

              if (player.playLive(title, minimized)) {
                if (minimized) {
                  this._setState("Main.MinimizedPlayback");
                } else {
                  this._setState("Playing");
                }
              }
            }
          }], [{
            key: "_states",
            value: function _states() {
              return [
              /*#__PURE__*/
              function (_this51) {
                _inherits(MinimizedPlayback, _this51);

                function MinimizedPlayback() {
                  _classCallCheck(this, MinimizedPlayback);

                  return _possibleConstructorReturn(this, _getPrototypeOf(MinimizedPlayback).apply(this, arguments));
                }

                _createClass(MinimizedPlayback, [{
                  key: "$stopMinimizedPlayback",
                  value: function $stopMinimizedPlayback() {
                    this._setState("Main");
                  }
                }]);

                return MinimizedPlayback;
              }(this)];
            }
          }]);

          return Main$$1;
        }(this),
        /*#__PURE__*/
        function (_this52) {
          _inherits(Playing, _this52);

          function Playing() {
            _classCallCheck(this, Playing);

            return _possibleConstructorReturn(this, _getPrototypeOf(Playing).apply(this, arguments));
          }

          _createClass(Playing, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Player").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Player").setSmooth('alpha', 0);
            }
          }, {
            key: "playerStop",
            value: function playerStop() {
              // Last item has been fully played.
              this._setState("Main");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Player");
            }
          }]);

          return Playing;
        }(this)];
      }
    }, {
      key: "cropImage",
      value: function cropImage(_ref10) {
        var url = _ref10.url,
            w = _ref10.w,
            h = _ref10.h,
            _ref10$type = _ref10.type,
            type = _ref10$type === void 0 ? 'crop' : _ref10$type;
        return ux.Ui.getImageUrl(url, {
          width: w,
          height: h,
          type: type
        });
      }
      /**
       * Formats the given milliseconds to MMMM dd, yyyy format
       * @param millis milli seconds
       */

    }, {
      key: "formatTime",
      value: function formatTime(millis) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date(millis);
        var onlyDate = date.getDate();
        onlyDate = onlyDate < 10 ? "0".concat(onlyDate) : onlyDate;
        return "".concat(monthNames[date.getMonth()], " ").concat(onlyDate, ", ").concat(date.getFullYear());
      }
    }]);

    return App;
  }(ux.App);

  App.COLORS = {
    BACKGROUND: 0xfff3f7f5
  };
  App.LIVE_PROGRAMS_POLL_FREQUENCY = 60 * 1000; // 1 minute

  return App;
}();