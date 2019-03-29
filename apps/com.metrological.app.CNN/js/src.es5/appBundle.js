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

  var GridItem =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(GridItem, _lng$Component);

    function GridItem() {
      _classCallCheck(this, GridItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridItem).apply(this, arguments));
    }

    _createClass(GridItem, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.1,
            alpha: 1
          },
          Border: {
            smooth: {
              alpha: 1
            }
          },
          Title: {
            smooth: {
              y: 155
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            scale: 1,
            alpha: 0.6
          },
          Border: {
            smooth: {
              alpha: 0
            }
          },
          Title: {
            smooth: {
              y: 178
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
              url: v.largePicture,
              w: 400,
              h: 260
            })
          },
          Border: {
            Time: {
              Label: {
                text: {
                  text: App.formatAMPM(v.publishdate)
                }
              }
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
          w: 400,
          h: 260,
          rect: true,
          color: 0xff000000,
          alpha: 0.6,
          Image: {},
          Border: {
            PlayImage: {
              rect: true,
              color: 0xff303030,
              w: 31,
              h: 31,
              x: 20,
              y: 230,
              Img: {
                src: App.getPath('images/play_small.png'),
                x: 9,
                y: 9,
                w: 15,
                h: 15
              }
            },
            alpha: 0,
            w: 400,
            h: 260,
            Time: {
              rect: true,
              color: 0xffCB0000,
              w: 199,
              h: 32,
              x: 51,
              y: 230,
              Label: {
                x: 10,
                y: 5,
                color: 0xffF1F1F1,
                text: {
                  text: '00:00:00',
                  fontSize: 18
                }
              }
            },
            Border: {
              type: lng.components.BorderComponent,
              borderWidth: 5,
              colorBorder: 0xffCB0000,
              w: 400,
              h: 260,
              x: 2,
              y: 2
            }
          },
          Title: {
            x: 20,
            y: 178,
            text: {
              text: '',
              fontSize: 28,
              wordWrapWidth: 360,
              maxLines: 2
            }
          }
        };
      }
    }]);

    return GridItem;
  }(lng.Component);

  GridItem.MEASURE = {
    HEIGHT: 300,
    WIDTH: 430
  };

  var Grid =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(Grid, _lng$Component2);

    function Grid() {
      _classCallCheck(this, Grid);

      return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
      key: "_init",
      value: function _init() {
        this._index = -1;
        this._prevIndex = 0;
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._index == -1) {
          this.fireAncestors("$setSpotLightFocus", 0);
          this._index = this._prevIndex;
        } else {
          var newIndex = this._index + 2;

          if (newIndex < this._items.length) {
            this._select(newIndex);
          }
        }
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._index == 0 || this._index == 1) {
          this._prevIndex = this._index;
          this._index = -1;
          this.fireAncestors("$setSpotLightFocus", 1);
        } else {
          var newIndex = this._index - 2;

          if (newIndex >= 0) {
            this._select(newIndex);
          }
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this._index != -1 && this._index != this._items.length - 1) {
          var newIndex = this._index + 1;

          if (~~(newIndex / 2) === ~~(this._index / 2)) {
            this._select(newIndex);
          }
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        if (this._index == -1) {
          //setting back the teaser highlight
          this.fireAncestors("$setSpotLightFocus", 1);
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        var newIndex = this._index - 1;

        if (~~(newIndex / 2) === ~~(this._index / 2) && newIndex >= 0) {
          this._select(newIndex);
        } else {
          this.fireAncestors("$setSpotLightFocus", 0);
          return false;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var _itemData;

        if (this._index < 0) {
          //getting the item of the 0th index
          _itemData = this.fireAncestors("$getSpotLightItem", 0);
        } else {
          _itemData = this.active.item;
        }

        this.fireAncestors("$loadDetails", {
          item: _itemData
        }, {
          items: this._all_items
        }, {
          index: this._index + 1
        });
      }
    }, {
      key: "_select",
      value: function _select(index) {
        this._index = index;
        var offset = this.x + this.active.x + GridItem.MEASURE.WIDTH;
        var position = 1920 - offset;

        if (position < 0) {
          this.tag("Items").setSmooth("x", position - 150);
          this.fireAncestors("$Reposition", position - 150);
        } else {
          this.tag("Items").setSmooth("x", 0);
          this.fireAncestors("$Reposition", 0);
        }
      }
    }, {
      key: "_reset",
      value: function _reset() {
        this._index = -1;
        this._prevIndex = 0;
        this.tag("Items").patch({
          Child: undefined
        });
        this.tag("Items").setSmooth("x", 0);
        this.fireAncestors("$Reposition", 0);
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
      key: "items",
      set: function set(v) {
        this._all_items = v;
        v = v.slice(1, v.length);
        this._items = v;

        this._reset();

        this.tag("Items").children = v.map(function (el, idx) {
          return {
            type: GridItem,
            item: el,
            x: Math.floor(idx / 2) * GridItem.MEASURE.WIDTH,
            y: Math.floor(idx % 2) * GridItem.MEASURE.HEIGHT
          };
        });
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

  var Home =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(Home, _lng$Component3);

    function Home() {
      _classCallCheck(this, Home);

      return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
    }

    _createClass(Home, [{
      key: "_init",
      value: function _init() {
        this._setState("Loading");
      }
    }, {
      key: "$setSpotLightFocus",
      value: function $setSpotLightFocus(value) {
        this.tag("Border").setSmooth("alpha", value);
        this.tag("TimeBorder").setSmooth("alpha", value);
        this.tag("Title").setSmooth("alpha", value);
      }
    }, {
      key: "$Reposition",
      value: function $Reposition(position) {
        this.tag("SpotLight").setSmooth("x", position);
      }
    }, {
      key: "select",
      value: function select(data) {
        if (data) {
          this._setDataSpotlight(data, 0);

          this._setDataGrid(data);
        }
      }
    }, {
      key: "$getSpotLightItem",
      value: function $getSpotLightItem(index) {
        return this._dataItems[index];
      }
    }, {
      key: "_setDataSpotlight",
      value: function _setDataSpotlight(data, index) {
        this._dataItems = data;
        this.patch({
          SpotLight: {
            Image: {
              src: App.cropImage({
                url: data[index].largePicture,
                w: Home.SPOTLIGHT.WIDTH,
                h: Home.SPOTLIGHT.HEIGHT
              })
            },
            Title: {
              text: {
                text: data[index].title
              }
            },
            TimeBorder: {
              Time: {
                Label: {
                  text: {
                    text: App.formatAMPM(data[index].publishdate)
                  }
                }
              }
            }
          }
        });
      }
    }, {
      key: "_setDataGrid",
      value: function _setDataGrid(data) {
        this.tag("Grid").items = data;

        this._setState("Grid");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Header: {
            w: 1920,
            x: -100,
            y: -370,
            h: 190,
            color: 0xff101010,
            rect: true
          },
          LogoImage: {
            src: App.getPath('images/cnn_logo.PNG'),
            zIndex: 1,
            x: 0,
            y: -300,
            w: 170,
            h: 169
          },
          SpotLight: {
            y: 30,
            Image: {},
            TimeBorder: {
              alpha: 0,
              w: 400,
              h: 216,
              y: 508,
              SpotLightPlayImage: {
                rect: true,
                color: 0xff303030,
                w: 45,
                h: 45,
                x: 31,
                Img: {
                  src: App.getPath('images/play_small.png'),
                  x: 15,
                  y: 15,
                  w: 18,
                  h: 18
                }
              },
              Time: {
                rect: true,
                color: 0xffCB0000,
                w: 299,
                h: 45,
                x: 76,
                Label: {
                  x: 10,
                  y: 10,
                  color: 0xffF1F1F1,
                  text: {
                    text: '00:00:00',
                    fontSize: 26,
                    maxLines: 2
                  }
                }
              }
            },
            Title: {
              alpha: 0,
              x: 40,
              y: 400,
              text: {
                text: '',
                fontSize: 36,
                wordWrapWidth: 600,
                maxLines: 2,
                color: 0xffF1F1F1
              }
            },
            Border: {
              type: lng.components.BorderComponent,
              alpha: 0,
              borderWidth: 5,
              colorBorder: 0xffCB0000,
              w: 990,
              h: 550
            },
            rect: true,
            w: 990,
            h: 550
          },
          Grid: {
            y: 30,
            type: Grid,
            x: 1030
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this) {
          _inherits(Loading, _this);

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
              this.fireAncestors('$hideInitialLoader');
            }
          }, {
            key: "_load",
            value: function _load() {
              var _this2 = this;

              var api = this.fireAncestors('$getApi');
              api.fetchDataBySection('us').then(function (data) {
                _this2._loaded(data);
              }).catch(function (err) {
                return console.error(err);
              });
            }
          }, {
            key: "_loaded",
            value: function _loaded(data) {
              this._setDataSpotlight(data, 0);

              this._setDataGrid(data);
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this3) {
          _inherits(Grid$$1, _this3);

          function Grid$$1() {
            _classCallCheck(this, Grid$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Grid$$1).apply(this, arguments));
          }

          _createClass(Grid$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Grid");
            }
          }]);

          return Grid$$1;
        }(this)];
      }
    }]);

    return Home;
  }(lng.Component);

  Home.SPOTLIGHT = {
    WIDTH: 990,
    HEIGHT: 550
  };

  var Content =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(Content, _lng$Component4);

    function Content() {
      _classCallCheck(this, Content);

      return _possibleConstructorReturn(this, _getPrototypeOf(Content).apply(this, arguments));
    }

    _createClass(Content, [{
      key: "menuItemSelected",
      value: function menuItemSelected(args) {
        this.tag("Home").select(args);
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Home");
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag("Home").setSmooth('alpha', 1);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('Home');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Home: {
            w: function w(_w) {
              return _w;
            },
            type: Home,
            alpha: 0
          }
        };
      }
    }]);

    return Content;
  }(lng.Component);

  var MenuItem =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(MenuItem, _lng$Component5);

    function MenuItem() {
      _classCallCheck(this, MenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).apply(this, arguments));
    }

    _createClass(MenuItem, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          color: 0xffCB0000,
          Label: {
            color: 0xffF1F1F1
          }
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this._isSelected = false;
      }
    }, {
      key: "deSelect",
      value: function deSelect() {
        this._isSelected = true;
        this.patch({
          smooth: {
            scale: 1.01
          },
          color: 0xff101010,
          Label: {
            color: 0xffF1F1F1,
            text: {
              fontSize: 52
            }
          }
        });
      }
    }, {
      key: "deUnSelect",
      value: function deUnSelect() {
        this.patch({
          smooth: {
            scale: 1
          },
          color: 0x60101010,
          Label: {
            color: 0xff808080,
            text: {
              fontSize: 36
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        if (this._isSelected === false) {
          this.patch({
            color: 0x60101010,
            Label: {
              color: 0xff808080
            }
          });
        } else {
          this._isSelected = false;
        }
      }
    }, {
      key: "title",
      set: function set(v) {
        this.tag("Label").text.text = v;
      }
    }, {
      key: "section",
      set: function set(v) {
        this._section = v;
      },
      get: function get() {
        return this._section;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          flex: true,
          rect: true,
          color: 0x60101010,
          flexItem: {
            marginRight: 20
          },
          Label: {
            flexItem: {
              marginRight: 20
            },
            color: 0xff808080,
            x: 10,
            y: 5,
            text: {
              text: "test",
              fontSize: 36,
              fontFace: 'sans-serif',
              fontStyle: 'normal'
            }
          }
        };
      }
    }]);

    return MenuItem;
  }(lng.Component);

  var Menu =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Menu, _lng$Component6);

    function Menu() {
      _classCallCheck(this, Menu);

      return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
      key: "_init",
      value: function _init() {
        this.tag("MenuItems").children = [{
          section: "us",
          title: "U.S."
        }, {
          section: "politics",
          title: "Politics"
        }, {
          section: "europe",
          title: "Europe"
        }, {
          section: "asia",
          title: "Asia"
        }, {
          section: "americas",
          title: "Americas"
        }, {
          section: "entertainment",
          title: "Entertainment"
        }, {
          section: "tech",
          title: "Tech"
        }, {
          section: "support",
          title: "Support"
        }, {
          section: "travel",
          title: "Travel"
        }].map(function (el) {
          return {
            type: MenuItem,
            title: el.title,
            section: el.section
          };
        });
        this._currentActive = 0;
        this._previousActive = 0;
      }
    }, {
      key: "reveal",
      value: function reveal() {
        this.patch({
          smooth: {
            x: 0
          }
        });
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._currentActive < this.list.length - 1) {
          this._previousActive = this._currentActive;
          this._currentActive++;
        }
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._currentActive > 0) {
          this._previousActive = this._currentActive;
          this._currentActive--;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        //handling the api firing
        if (this._previousSelectedFocus) {
          this._unselected = this.previousSelectedActive;

          this._unselected.deUnSelect();
        }

        this.active.isSelected = true;
        this._selected = this.active;

        if (this._selected) {
          this._selected.deSelect();

          this._previousSelectedFocus = this._currentActive;
        }

        return false;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "list",
      get: function get() {
        return this.tag('MenuItems').childList.get();
      }
    }, {
      key: "active",
      get: function get() {
        return this.list[this._currentActive];
      }
    }, {
      key: "previousSelectedActive",
      get: function get() {
        return this.list[this._previousSelectedFocus];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          MyFleBox: {
            x: 100,
            y: 282,
            w: 1080,
            h: 50,
            MenuItems: {
              flex: {
                direction: 'column',
                wrap: true,
                paddingRight: 30
              }
            }
          }
        };
      }
    }]);

    return Menu;
  }(lng.Component);

  Menu.COLORS = {
    BACKGROUND: 0xff101010
  };

  var Details =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(Details, _lng$Component7);

    function Details() {
      _classCallCheck(this, Details);

      return _possibleConstructorReturn(this, _getPrototypeOf(Details).apply(this, arguments));
    }

    _createClass(Details, [{
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors('$play', {
          item: this._item
        }, true);
      }
    }, {
      key: "_reveal",
      value: function _reveal(value) {
        //method to hide or unhide details page
        this.patch({
          Wrapper: {
            alpha: value
          }
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
        this._reveal(1);
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          Wrapper: {
            Container: {
              Image: {
                src: v.thumbPicture
              },
              Title: {
                text: {
                  text: v.title
                }
              },
              Description: {
                text: {
                  text: v.description
                }
              },
              Time: {
                Label: {
                  text: {
                    text: App.formatAMPM(v.publishdate)
                  }
                }
              }
            }
          }
        });
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag('Details');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            alpha: 0,
            Overlay: {
              rect: true,
              w: 1920,
              h: 1080,
              x: 0,
              y: 0,
              colorLeft: 0xff000000,
              colorRight: 0x00000000
            },
            Container: {
              h: 1080,
              w: 980,
              x: 300,
              y: 0,
              rect: true,
              color: 0xff303030,
              Image: {
                w: 980,
                h: 550,
                y: 0
              },
              PlayImage: {
                rect: true,
                color: 0xffCB0000,
                w: 100,
                h: 100,
                x: 419,
                y: 215,
                Img: {
                  src: App.getPath('images/play_small.png'),
                  x: 37,
                  y: 30,
                  w: 30,
                  h: 45
                }
              },
              Time: {
                rect: true,
                color: 0xff202020,
                w: 282,
                h: 50,
                x: 74,
                y: 550,
                Label: {
                  x: 20,
                  y: 9,
                  color: 0xffF1F1F1,
                  text: {
                    text: '00:00:00',
                    fontSize: 26
                  }
                }
              },
              Title: {
                w: 840,
                x: 70,
                y: 634,
                h: 120,
                color: 0xffF1F1F1,
                text: {
                  fontSize: 42
                }
              },
              Description: {
                w: 840,
                x: 70,
                y: 771,
                h: 192,
                text: {
                  fontSize: 26
                },
                color: 0xff909090
              }
            }
          }
        };
      }
    }]);

    return Details;
  }(lng.Component);

  var Main =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(Main, _lng$Component8);

    function Main() {
      _classCallCheck(this, Main);

      return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));
    }

    _createClass(Main, [{
      key: "_setup",
      value: function _setup() {
        var _this4 = this;

        this._loader = this.animation({
          duration: 2,
          repeat: -1,
          stopMethod: 'immediate',
          actions: [{
            p: 'alpha',
            t: 'Content',
            rv: 1,
            v: {
              0: 0,
              1: 0
            }
          }, {
            p: 'alpha',
            t: 'Menu',
            rv: 1,
            v: {
              0: 0,
              1: 0
            }
          }, {
            p: 'y',
            t: 'Loader',
            rv: 450,
            v: {
              0: 450,
              0.5: 440,
              1: 450
            }
          }]
        });

        this._loader.on('stop', function () {
          _this4.tag('Loader').setSmooth('alpha', 0);
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Loading");
      }
    }, {
      key: "_loaded",
      value: function _loaded(data) {
        this.tag("Content").menuItemSelected(data);
      }
    }, {
      key: "$loadDetails",
      value: function $loadDetails(_ref, _ref2, _ref3) {
        var item = _ref.item;
        var items = _ref2.items;
        var index = _ref3.index;
        this.tag("Details").item = item;
        this._items = items;
        this._index = index;

        this._setState("Details");
      }
    }, {
      key: "getData",
      value: function getData() {
        return this._items;
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        settings.clearColor = App.COLORS.BACKGROUND;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Menu: {
            alpha: 1,
            type: Menu
          },
          Content: {
            x: 100,
            y: 370,
            w: 1770,
            type: Content
          },
          Loader: {
            src: App.getPath('images/cnn_logo.png'),
            x: 850,
            y: 467,
            w: 170,
            h: 169
          },
          Details: {
            type: Details,
            w: 1920,
            h: 1080,
            x: 0,
            y: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this5) {
          _inherits(Loading, _this5);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this._loader.start();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this._loader.stop();

              this.tag("Menu").reveal();
            }
          }, {
            key: "$hideInitialLoader",
            value: function $hideInitialLoader() {
              this._setState("Content");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this6) {
          _inherits(Content$$1, _this6);

          function Content$$1() {
            _classCallCheck(this, Content$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Content$$1).apply(this, arguments));
          }

          _createClass(Content$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Content');
            }
          }, {
            key: "$enter",
            value: function $enter(context) {
              this._returnState = context.prevState;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Menu");
            }
          }]);

          return Content$$1;
        }(this),
        /*#__PURE__*/
        function (_this7) {
          _inherits(Details$$1, _this7);

          function Details$$1() {
            _classCallCheck(this, Details$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Details$$1).apply(this, arguments));
          }

          _createClass(Details$$1, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Details');
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this.closeDetails();
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              if (this._index < this._items.length - 1) {
                this._index++;
                var item = this._items[this._index];
                this.tag("Details").item = item;

                this._setState("Details");
              }
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              if (this._index > 0) {
                this._index--;
                var item = this._items[this._index];
                this.tag("Details").item = item;

                this._setState("Details");
              }
            }
          }, {
            key: "closeDetails",
            value: function closeDetails() {
              this._setState("Content");

              this.tag('Details')._reveal(0);
            }
          }]);

          return Details$$1;
        }(this),
        /*#__PURE__*/
        function (_this8) {
          _inherits(Menu$$1, _this8);

          function Menu$$1() {
            _classCallCheck(this, Menu$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Menu$$1).apply(this, arguments));
          }

          _createClass(Menu$$1, [{
            key: "$enter",
            value: function $enter(context) {
              this._returnState = context.prevState;
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState(this._returnState);
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              var _this9 = this;

              var api = this.fireAncestors('$getApi');
              var active = this.tag("Menu").active;
              api.fetchDataBySection(active.section).then(function (data) {
                _this9._loaded(data);

                _this9._setState(_this9._returnState);
              }).catch(function (err) {
                return console.error(err);
              });
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Menu');
            }
          }]);

          return Menu$$1;
        }(this)];
      }
    }]);

    return Main;
  }(lng.Component);

  var PlayerButton =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(PlayerButton, _lng$Component9);

    function PlayerButton() {
      _classCallCheck(this, PlayerButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerButton).apply(this, arguments));
    }

    _createClass(PlayerButton, [{
      key: "_focus",
      value: function _focus() {
        this._focused = true;
        this.tag("Background").patch({
          smooth: {
            alpha: 1
          }
        });

        this._setState("Selected");
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._focused = false;
        this.tag("Background").patch({
          smooth: {
            alpha: 0
          }
        });

        this._setState("");
      }
    }, {
      key: "icon",
      set: function set(icon) {
        this._icon = icon;
        this.tag("Icons").patch({
          src: icon
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
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Icon: {
            x: 714,
            y: 200,
            Background: {
              alpha: 0,
              rect: true,
              w: 100,
              h: 100,
              color: 0xffCB0000,
              x: -25,
              y: -30
            },
            Icons: {
              w: 52,
              h: 40
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
          _inherits(Selected, _this10);

          function Selected() {
            _classCallCheck(this, Selected);

            return _possibleConstructorReturn(this, _getPrototypeOf(Selected).apply(this, arguments));
          }

          _createClass(Selected, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Background").patch({
                smooth: {
                  alpha: 1
                }
              });
            }
          }, {
            key: "$exit",
            value: function $exit() {}
          }]);

          return Selected;
        }(this)];
      }
    }]);

    return PlayerButton;
  }(lng.Component);

  var PlayerControls =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(PlayerControls, _lng$Component10);

    function PlayerControls() {
      _classCallCheck(this, PlayerControls);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerControls).apply(this, arguments));
    }

    _createClass(PlayerControls, [{
      key: "_init",
      value: function _init() {
        //list all buttons
        this.showButtons(false, false, false, false);

        this._setState("Play");
      }
    }, {
      key: "showButtons",
      value: function showButtons(prev, rewind, forward, next) {
        var buttons = [];
        if (prev) buttons.push("Previous");
        if (rewind) buttons.push("Rewind");
        buttons = buttons.concat("Play");
        if (forward) buttons.push("Forward");
        if (next) buttons.push("Next");

        this._saveButtons(buttons);
      }
    }, {
      key: "_saveButtons",
      value: function _saveButtons(buttons) {
        var _this11 = this;

        this._activeButtons = [];
        this.tag("Buttons").children.map(function (button) {
          button.active = buttons.indexOf(button.ref) !== -1;

          if (button.active) {
            _this11._activeButtons.push(button);
          }
        });

        this._checkActiveButton();
      }
    }, {
      key: "_setup",
      value: function _setup() {
        this._setState("Play");
      }
    }, {
      key: "_checkActiveButton",
      value: function _checkActiveButton() {
        // After changing the active buttons, make sure that an active button is selected.
        var index = this._currentIndex;

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
        var index = this._currentIndex;

        if (index > 0) {
          index--;
        }

        this._setState(this._activeButtons[index].ref);
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        var index = this._currentIndex;

        if (index < this._activeButtons.length - 1) {
          index++;
        }

        this._setState(this._activeButtons[index].ref);
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal('press' + this._currentActiveButton.ref);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this._getState());
      }
    }, {
      key: "title",
      set: function set(title) {
        this.tag("Title").text = (title || "").toUpperCase();
      }
    }, {
      key: "_currentIndex",
      get: function get() {
        var button = this.tag("Buttons").getByRef(this._getState());

        if (!button.active) {
          button = this.tag("Play");
        }

        return this._activeButtons.indexOf(button);
      }
    }, {
      key: "_currentActiveButton",
      get: function get() {
        return this._activeButtons[this._currentIndex];
      }
    }, {
      key: "paused",
      set: function set(v) {
        this.tag("Play").icon = v ? App.getPath('images/player/play.png') : App.getPath('images/player/pause.png');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Buttons: {
            Previous: {
              x: -108,
              type: PlayerButton,
              icon: App.getPath('images/player/prev.png')
            },
            Rewind: {
              type: PlayerButton,
              icon: App.getPath('images/player/rewind.png')
            },
            Play: {
              x: 108,
              type: PlayerButton,
              icon: App.getPath('images/player/pause.png')
            },
            Forward: {
              x: 216,
              type: PlayerButton,
              icon: App.getPath('images/player/forward.png')
            },
            Next: {
              x: 314,
              type: PlayerButton,
              icon: App.getPath('images/player/next.png')
            }
          },
          Title: {
            w: 1520,
            height: 120,
            text: {
              fontSize: 32,
              maxLines: 2,
              color: 0xff101010,
              mount: 0.5
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this12) {
          _inherits(Previous, _this12);

          function Previous() {
            _classCallCheck(this, Previous);

            return _possibleConstructorReturn(this, _getPrototypeOf(Previous).apply(this, arguments));
          }

          return Previous;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(Rewind, _this13);

          function Rewind() {
            _classCallCheck(this, Rewind);

            return _possibleConstructorReturn(this, _getPrototypeOf(Rewind).apply(this, arguments));
          }

          return Rewind;
        }(this),
        /*#__PURE__*/
        function (_this14) {
          _inherits(Play, _this14);

          function Play() {
            _classCallCheck(this, Play);

            return _possibleConstructorReturn(this, _getPrototypeOf(Play).apply(this, arguments));
          }

          return Play;
        }(this),
        /*#__PURE__*/
        function (_this15) {
          _inherits(Forward, _this15);

          function Forward() {
            _classCallCheck(this, Forward);

            return _possibleConstructorReturn(this, _getPrototypeOf(Forward).apply(this, arguments));
          }

          return Forward;
        }(this),
        /*#__PURE__*/
        function (_this16) {
          _inherits(Next, _this16);

          function Next() {
            _classCallCheck(this, Next);

            return _possibleConstructorReturn(this, _getPrototypeOf(Next).apply(this, arguments));
          }

          return Next;
        }(this)];
      }
    }]);

    return PlayerControls;
  }(lng.Component);

  var PlayerProgress =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(PlayerProgress, _lng$Component11);

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
              texture: lng.Tools.getRoundRect(1720, 6, 0),
              color: 0xff808080
            },
            Active: {
              color: 0xffF1F1F1
            }
          }
        };
      }
    }]);

    return PlayerProgress;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(Player, _lng$Component12);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "_setItem",
      value: function _setItem(item) {
        this._item = item;
        this.tag("Progress").setProgress(0, 0);
        this._stream = item.stream;
        this.tag("Controls").title = item.title;
        this._index = this._items.indexOf(item);
        this.tag("Controls").showButtons(this._index > 0, true, true, this._index < this._items.length - 1);
        this.application.updateFocusSettings();
      }
    }, {
      key: "_setInterfaceTimeout",
      value: function _setInterfaceTimeout() {
        var _this17 = this;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this17._hide();
        }, 8000);
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Controls");
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
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this._pressNext();
      }
    }, {
      key: "play",
      value: function play(_ref4) {
        var item = _ref4.item,
            items = _ref4.items;
        this._items = items;

        this._setItem(item);

        return !!this._stream;
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
      key: "pressRewind",
      value: function pressRewind() {
        this.application.mediaplayer.seek(-10);
      }
    }, {
      key: "pressForward",
      value: function pressForward() {
        this.application.mediaplayer.seek(10);
      }
    }, {
      key: "_pressNext",
      value: function _pressNext() {
        if (!this._items.length) {
          return this.signal('playerStop');
        }

        var index = (this._index + 1) % this._items.length;

        this._setItem(this._items[index]);
      }
    }, {
      key: "pressPlay",
      value: function pressPlay() {
        this.application.mediaplayer.playPause();
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
        this.signal('playerStop');
      }
    }, {
      key: "$mediaplayerProgress",
      value: function $mediaplayerProgress(_ref5) {
        var currentTime = _ref5.currentTime,
            duration = _ref5.duration;
        if (!this.tag("Controls").duration) this.tag("Controls").duration = duration;
        this.tag("Progress").setProgress(currentTime, duration);
      }
    }, {
      key: "_captureKey",
      value: function _captureKey() {
        this._setInterfaceTimeout();

        return false;
      }
    }, {
      key: "_hide",
      value: function _hide() {
        this._setState("Hidden");
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
          zIndex: 2,
          Controls: {
            x: 200,
            y: 745,
            type: PlayerControls,
            signals: {
              pressPlay: true,
              pressRewind: true,
              pressForward: true,
              pressPrevious: true,
              pressNext: "_pressNext"
            }
          },
          Progress: {
            x: 100,
            y: 894,
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
        function (_this18) {
          _inherits(Hidden, _this18);

          function Hidden() {
            _classCallCheck(this, Hidden);

            return _possibleConstructorReturn(this, _getPrototypeOf(Hidden).apply(this, arguments));
          }

          _createClass(Hidden, [{
            key: "$enter",
            value: function $enter(_ref6) {
              var prevState = _ref6.prevState;
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
        function (_this19) {
          _inherits(Controls, _this19);

          function Controls() {
            _classCallCheck(this, Controls);

            return _possibleConstructorReturn(this, _getPrototypeOf(Controls).apply(this, arguments));
          }

          return Controls;
        }(this)];
      }
    }]);

    return Player;
  }(lng.Component);

  var MediaItem =
  /*#__PURE__*/
  function () {
    function MediaItem(obj) {
      _classCallCheck(this, MediaItem);

      this.$ = obj;
    }

    _createClass(MediaItem, [{
      key: "title",
      get: function get() {
        return this.$.headline;
      }
    }, {
      key: "pictures",
      get: function get() {
        return this.$.relatedMedia.media[0].cuts;
      }
    }, {
      key: "MediaplayerItem",
      get: function get() {
        return {
          title: this.title,
          stream: {
            link: this.$.cdnUrls.ios_1240
          }
        };
      }
    }, {
      key: "thumbPicture",
      get: function get() {
        var pictures = this.pictures;
        return this.pictures.c1Main.url;
      }
    }, {
      key: "largePicture",
      get: function get() {
        var pictures = this.pictures;
        return this.pictures.exlarge16to9 ? this.pictures.exlarge16to9.url : this.pictures.large16to9.url;
      }
    }, {
      key: "publishdate",
      get: function get() {
        return this.$.firstPublishDate;
      }
    }, {
      key: "description",
      get: function get() {
        return this.$.description[0].plaintext;
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
        base: 'https://services.cnn.com/newsgraph/search/topicLabel_exact:',
        us: 'united%20states/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        politics: 'politics/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        europe: 'europe/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        asia: 'asia/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        americas: 'latin%20america/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        entertainment: 'arts%20and%20entertainment/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        tech: 'technology/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        sport: 'Sports and recreation/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e',
        travel: 'Travel and tourism/language:en/rows:30/type:video/start:0/lastPublishDate,desc?api_key=zn2cp943gzffppt589mu525e'
      };
    }

    _createClass(Api, [{
      key: "_send",
      value: function _send(url) {
        return fetch(this._getUrl(url)).then(function (r) {
          return r.json();
        });
      }
    }, {
      key: "_getUrl",
      value: function _getUrl(url) {
        return "".concat(Api.METROLOICAL_CDN).concat(this._endpoints.base).concat(url);
      }
    }, {
      key: "fetchDataBySection",
      value: function fetchDataBySection(key) {
        if (this._endpoints.hasOwnProperty(key)) {
          return this._send("".concat(this._endpoints.base).concat(this._endpoints[key])).then(function (_ref7) {
            var _ref7$docs = _ref7.docs,
                docs = _ref7$docs === void 0 ? [] : _ref7$docs;

            if (!docs.length) {
              return Promise.reject('returned no data');
            }

            return Promise.resolve(docs.map(function (video) {
              return new MediaItem(video);
            }));
          });
        }
      }
    }]);

    return Api;
  }();

  Api.METROLOICAL_CDN = 'https://cdn.metrological.com/proxy?url=';

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
        this._setState("Main");
      }
    }, {
      key: "$play",
      value: function $play(_ref8) {
        var item = _ref8.item,
            items = _ref8.items;
        var player = this.tag('Player');
        this._items = this.tag('Main').getData();
        var playlist = {
          item: item.MediaplayerItem,
          items: this._items.map(function (item) {
            return item.MediaplayerItem;
          })
        };

        if (player.play(playlist)) {
          this._setState("Playing");
        }
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        if (this.state === "Playing") {
          settings.mediaplayer.consumer = this.tag("Player");
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Player: {
            type: Player,
            alpha: 0,
            signals: {
              playerStop: true
            }
          },
          Main: {
            type: Main
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this20) {
          _inherits(Main$$1, _this20);

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
          }]);

          return Main$$1;
        }(this),
        /*#__PURE__*/
        function (_this21) {
          _inherits(Playing, _this21);

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
            key: "_handleBack",
            value: function _handleBack() {
              this.playerStop();
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
      value: function cropImage(_ref9) {
        var url = _ref9.url,
            w = _ref9.w,
            h = _ref9.h;
        return ux.Ui.getImageUrl(url, {
          width: w,
          height: h,
          type: 'crop'
        });
      }
    }, {
      key: "formatAMPM",
      value: function formatAMPM(date) {
        var d = new Date(date);
        var time = d.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        return "".concat(d.getDate(), "/").concat(d.getMonth(), "/").concat(d.getFullYear(), " ").concat(time);
      }
    }]);

    return App;
  }(ux.App);

  App.COLORS = {
    BACKGROUND: 0xff272727
  };
  return App;
}();