"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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

  var VimeoGridItem =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(VimeoGridItem, _lng$Component);

    function VimeoGridItem() {
      _classCallCheck(this, VimeoGridItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoGridItem).apply(this, arguments));
    }

    _createClass(VimeoGridItem, [{
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
            },
            Time: {
              smooth: {
                y: 174
              }
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
            },
            Time: {
              smooth: {
                y: 270
              }
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
              url: v.getPicture({
                w: 640
              }).link,
              w: 400,
              h: 215
            })
          },
          Border: {
            Time: {
              Label: {
                text: {
                  text: App.secondsToTime(v.duration)
                }
              }
            }
          },
          Title: {
            text: {
              text: v.title
            }
          },
          User: {
            text: {
              text: v.username
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
          h: 325,
          rect: true,
          color: 0xff0D1314,
          alpha: 0.6,
          Image: {},
          Border: {
            alpha: 0,
            w: 400,
            h: 216,
            Time: {
              rect: true,
              color: 0xffFADB23,
              w: 100,
              h: 40,
              x: 300,
              y: 280,
              transitions: {
                y: {
                  duration: 0.3
                }
              },
              Label: {
                x: 10,
                y: 10,
                color: 0xff000000,
                text: {
                  text: '00:00:00',
                  fontSize: 19
                }
              }
            },
            Border: {
              type: lng.components.BorderComponent,
              borderWidth: 5,
              colorBorder: 0xffFADA24,
              w: 400 - 4,
              h: 216 - 4,
              x: 2,
              y: 2
            }
          },
          Title: {
            x: 20,
            y: 230,
            text: {
              text: '',
              fontSize: 40,
              wordWrapWidth: 360,
              maxLines: 1
            }
          },
          User: {
            x: 20,
            y: 284,
            color: 0xffA3A4A5,
            text: {
              text: 'Username',
              fontSize: 25,
              wordWrapWidth: 360,
              maxLines: 1
            }
          }
        };
      }
    }]);

    return VimeoGridItem;
  }(lng.Component);

  var VimeoGrid =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(VimeoGrid, _lng$Component2);

    function VimeoGrid() {
      _classCallCheck(this, VimeoGrid);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoGrid).apply(this, arguments));
    }

    _createClass(VimeoGrid, [{
      key: "hasResults",
      value: function hasResults() {
        return this.tag('List').items.length;
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.index === 0) {
          return false;
        }

        this.tag('List').setPrevious();
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Title: {
            smooth: {
              alpha: 1
            }
          }
        });
        this.tag('List').setIndex(0);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        if (!this._storeFocus) {
          this.tag('List').setIndex(0);
        }

        this.patch({
          Title: {
            smooth: {
              alpha: 0.3
            }
          }
        });
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.tag('List').setNext();
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        if (this.active) {
          this.fireAncestors('$play', {
            items: this.tag('List').items.map(function (item) {
              return item.item;
            }),
            item: this.active.item
          }, true);
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "title",
      set: function set(v) {
        this.tag('Title').text.text = v;
      }
    }, {
      key: "items",
      get: function get() {
        return this._items;
      },
      set: function set(v) {
        this._items = v.filter(function (item) {
          return item.streams.length;
        }).map(function (el) {
          return {
            type: VimeoGridItem,
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
            y: 30,
            x: 100,
            text: {
              text: '',
              fontSize: 45
            },
            alpha: 0.3
          },
          List: {
            type: lng.components.ListComponent,
            w: 1920,
            h: 390,
            y: 120,
            itemSize: 440,
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

    return VimeoGrid;
  }(lng.Component);

  var VimeoKeyboard =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(VimeoKeyboard, _lng$Component3);

    function VimeoKeyboard() {
      _classCallCheck(this, VimeoKeyboard);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoKeyboard).apply(this, arguments));
    }

    _createClass(VimeoKeyboard, [{
      key: "_init",
      value: function _init() {
        this._keys = [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '<'], ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'], ['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']];

        this._buildKb();

        this._activeidx = 0;
        this._row = 0;
        this._c = this._keys[0].length;
        this._r = this._keys.length;
      }
    }, {
      key: "_buildKb",
      value: function _buildKb() {
        var children = [];
        var y = 0;

        this._keys.forEach(function (r) {
          r.forEach(function (k, i) {
            children.push({
              ref: "Key-".concat(k),
              type: VimeoKeyboardKey,
              x: i * 170,
              y: y,
              key: k
            });
          });
          y += 70;
        });

        children.push({
          ref: 'SpaceKey',
          type: VimeoSpaceKey,
          x: 0,
          y: y,
          key: 'space'
        }, {
          ref: 'SearchKey',
          type: VimeoSearchKey,
          x: 1020,
          y: y,
          key: 'search'
        });
        this.patch({
          Keys: {
            children: children
          }
        });
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._activeidx > 0 && this._row < 3) {
          this._activeidx -= 1;
        } else if (this._row === 3 && this._activeidx === 1) {
          this._activeidx = 0;
        } else {
          return false;
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._activeidx < this._c - 1 && this._row < 3) {
          this._activeidx += 1;
        } else if (this._activeidx === 0) {
          this._activeidx = 1;
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this._row > 0) {
          this._row -= 1;
        } else {
          this.signal('upExit');
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this._row < 3) {
          // if we move to space / search row
          // focus on search
          if (this._row === 2) {
            this._activeidx = 1;
          }

          this._row += 1;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal('keypress', {
          key: this.active.key
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "active",
      get: function get() {
        return this.tag('Keys').childList.getAt(this._activeidx + this._row * this._c);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Categories: {},
          Keys: {}
        };
      }
    }]);

    return VimeoKeyboard;
  }(lng.Component);

  var VimeoKeyboardKey =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(VimeoKeyboardKey, _lng$Component4);

    function VimeoKeyboardKey() {
      _classCallCheck(this, VimeoKeyboardKey);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoKeyboardKey).apply(this, arguments));
    }

    _createClass(VimeoKeyboardKey, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.1,
            zIndex: 3,
            alpha: 1
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            scale: 1,
            zIndex: 1,
            alpha: 0.4
          }
        });
      }
    }, {
      key: "key",
      set: function set(v) {
        this._key = v;
        this.tag('Key').text.text = v;
      },
      get: function get() {
        return this._key;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 160,
          h: 60,
          alpha: 0.4,
          Background: {
            texture: lng.Tools.getRoundRect(160, 60, 5, 2, 0xffffffff, true, 0xff0D1314)
          },
          Key: {
            mountX: 0.5,
            color: 0xffffffff,
            x: 80,
            y: 4,
            text: {
              text: ''
            }
          }
        };
      }
    }]);

    return VimeoKeyboardKey;
  }(lng.Component);

  var VimeoSpaceKey =
  /*#__PURE__*/
  function (_VimeoKeyboardKey) {
    _inherits(VimeoSpaceKey, _VimeoKeyboardKey);

    function VimeoSpaceKey() {
      _classCallCheck(this, VimeoSpaceKey);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSpaceKey).apply(this, arguments));
    }

    _createClass(VimeoSpaceKey, [{
      key: "key",
      set: function set(v) {
        this._key = v;
        this.patch({
          w: 1010,
          h: 60,
          Background: {
            texture: lng.Tools.getRoundRect(1010, 60, 5, 2, 0xffffffff, true, 0xff0D1314)
          },
          Key: {
            mountX: 0.5,
            x: 505,
            y: 4,
            text: {
              text: v
            }
          }
        });
      },
      get: function get() {
        return this._key;
      }
    }]);

    return VimeoSpaceKey;
  }(VimeoKeyboardKey);

  var VimeoSearchKey =
  /*#__PURE__*/
  function (_VimeoKeyboardKey2) {
    _inherits(VimeoSearchKey, _VimeoKeyboardKey2);

    function VimeoSearchKey() {
      _classCallCheck(this, VimeoSearchKey);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSearchKey).apply(this, arguments));
    }

    _createClass(VimeoSearchKey, [{
      key: "key",
      set: function set(v) {
        this._key = v;
        this.patch({
          w: 500,
          h: 60,
          Background: {
            texture: lng.Tools.getRoundRect(500, 60, 5, 2, 0xffffffff, true, 0xff0D1314)
          },
          Key: {
            mountX: 0.5,
            x: 250,
            y: 4,
            text: {
              text: v
            }
          }
        });
      },
      get: function get() {
        return this._key;
      }
    }]);

    return VimeoSearchKey;
  }(VimeoKeyboardKey);

  var VimeoSearch =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(VimeoSearch, _lng$Component5);

    function VimeoSearch() {
      _classCallCheck(this, VimeoSearch);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSearch).apply(this, arguments));
    }

    _createClass(VimeoSearch, [{
      key: "_init",
      value: function _init() {
        this._results = this.tag('Results');

        this._setState("Keyboard");
      }
    }, {
      key: "_moveKeyboard",
      value: function _moveKeyboard() {
        this.tag('Keyboard').setSmooth('y', 750);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Top: {
            w: function w(_w) {
              return _w;
            },
            h: 150,
            color: 0xff1A2022,
            rect: true,
            Label: {
              color: 0xffffffff,
              mountX: 1,
              x: function x(w) {
                return w - 50;
              },
              y: 50,
              text: {
                text: 'Search',
                fontSize: 60
              }
            }
          },
          Query: {
            type: VimeoQuery,
            x: 50,
            y: 200,
            signals: {
              search: true
            }
          },
          Results: {
            type: VimeoGrid,
            title: '',
            y: 250,
            x: -23
          },
          Keyboard: {
            x: 50,
            y: 350,
            type: VimeoKeyboard,
            signals: {
              keypress: true,
              upExit: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this) {
          _inherits(Query, _this);

          function Query() {
            _classCallCheck(this, Query);

            return _possibleConstructorReturn(this, _getPrototypeOf(Query).apply(this, arguments));
          }

          _createClass(Query, [{
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Results");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Query');
            }
          }]);

          return Query;
        }(this),
        /*#__PURE__*/
        function (_this2) {
          _inherits(Results, _this2);

          function Results() {
            _classCallCheck(this, Results);

            return _possibleConstructorReturn(this, _getPrototypeOf(Results).apply(this, arguments));
          }

          _createClass(Results, [{
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Query");
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Keyboard");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Results');
            }
          }]);

          return Results;
        }(this),
        /*#__PURE__*/
        function (_this3) {
          _inherits(Keyboard, _this3);

          function Keyboard() {
            _classCallCheck(this, Keyboard);

            return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard).apply(this, arguments));
          }

          _createClass(Keyboard, [{
            key: "keypress",
            value: function keypress(_ref) {
              var key = _ref.key;
              this.tag('Query').update(key);
            }
          }, {
            key: "search",
            value: function search(_ref2) {
              var _this4 = this;

              var query = _ref2.query;

              if (!query) {
                if (!this._search) {
                  this._search = ['cat', 'tomato', 'cats', 'funny', 'waldo', 'hello world'];
                }

                query = this._search[Math.floor(Math.random() * this._search.length)];
              }

              var api = this.fireAncestors('$getApi');
              api.search(query).then(function (items) {
                _this4.fire('searchReady', {
                  items: items
                });
              });
            }
          }, {
            key: "searchReady",
            value: function searchReady(_ref3) {
              var items = _ref3.items;
              this._results.items = items;

              this._moveKeyboard();
            }
          }, {
            key: "upExit",
            value: function upExit() {
              this._setState("Results");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Keyboard');
            }
          }]);

          return Keyboard;
        }(this)];
      }
    }]);

    return VimeoSearch;
  }(lng.Component);

  var VimeoQuery =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(VimeoQuery, _lng$Component6);

    function VimeoQuery() {
      _classCallCheck(this, VimeoQuery);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoQuery).apply(this, arguments));
    }

    _createClass(VimeoQuery, [{
      key: "update",
      value: function update(char) {
        switch (char) {
          case 'space':
            this._query += ' ';
            break;

          case 'clear':
            this._query = '';
            break;

          case 'search':
            this.signal('search', {
              query: this._query
            });
            break;

          case '<':
            this._query = this._query.slice(0, -1);
            break;

          default:
            this._query += char;
            break;
        }

        this.tag('Query').text.text = this._query;
      }
    }, {
      key: "_init",
      value: function _init() {
        this._query = '';
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag('Delete').patch({
          smooth: {
            scale: 1.3
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag('Delete').patch({
          smooth: {
            scale: 1
          }
        });
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.update('clear');
      }
    }, {
      key: "query",
      get: function get() {
        return this._query;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Query: {
            y: 4,
            text: {
              text: '',
              fontSize: 50
            }
          },
          Line: {
            rect: true,
            y: 90,
            h: 2,
            w: 1600,
            color: 0xff484A4E
          },
          Delete: {
            x: 1550,
            y: 20,
            texture: lng.Tools.getRoundRect(50, 50, 5, 0, 0x00000000, true, 0xff0D1314),
            Label: {
              x: 17,
              y: 7,
              text: {
                text: 'X',
                fontSize: 30
              }
            }
          }
        };
      }
    }]);

    return VimeoQuery;
  }(lng.Component);

  var VimeoExplore =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(VimeoExplore, _lng$Component7);

    function VimeoExplore() {
      _classCallCheck(this, VimeoExplore);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoExplore).apply(this, arguments));
    }

    _createClass(VimeoExplore, [{
      key: "_init",
      value: function _init() {
        this._loading = this.tag('Loader').animation({
          duration: 1,
          repeat: -1,
          actions: [{
            p: 'rotation',
            v: {
              0: 0,
              1: Math.PI * 2
            }
          }]
        });

        this._setState("Loading");
      }
    }, {
      key: "_firstActive",
      value: function _firstActive() {
        var _this5 = this;

        this._loading.start();

        this.fireAncestors('$getApi').getChannels().then(function (data) {
          _this5.items = data;

          _this5.fire('ready');
        }).catch(function (err) {
          console.error(err);
        });
      }
    }, {
      key: "select",
      value: function select(_ref4) {
        var idx = _ref4.idx;
        this._idx = idx;
        this._selected = this.channels[idx];
        this.tag('Channels').patch({
          smooth: {
            y: idx * -440
          }
        });
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this._idx > 0) {
          this.select({
            idx: this._idx - 1
          });
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this._idx < this.channels.length - 1) {
          this.select({
            idx: this._idx + 1
          });
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this._selected;
      }
    }, {
      key: "channels",
      get: function get() {
        return this.tag('Channels').children;
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
        var children = v.map(function (channel, idx) {
          return {
            type: VimeoGrid,
            items: channel.items,
            title: channel.category,
            x: 0,
            y: idx * 450
          };
        });
        this.patch({
          Wrapper: {
            Channels: {
              children: children
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            y: 170,
            Channels: {}
          },
          Top: {
            w: function w(_w2) {
              return _w2;
            },
            h: 150,
            color: 0xff1A2022,
            rect: true,
            Label: {
              color: 0xffffffff,
              mountX: 1,
              x: function x(w) {
                return w - 50;
              },
              y: 50,
              text: {
                text: 'Explore',
                fontSize: 60
              }
            }
          },
          Loader: {
            x: function x(w) {
              return w / 2;
            },
            mountX: 0.5,
            y: 500,
            h: 42,
            w: 42,
            src: App.getPath('images/loader.png'),
            transitions: {
              alpha: {
                duration: 0.4,
                delay: 0.1
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
        function (_this6) {
          _inherits(Loading, _this6);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "ready",
            value: function ready() {
              this._loading.stop();

              this.tag('Loader').setSmooth('alpha', 0);
              this.select({
                idx: 0
              });

              this._setState("");
            }
          }]);

          return Loading;
        }(this)];
      }
    }]);

    return VimeoExplore;
  }(lng.Component);

  var VimeoTeaser =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(VimeoTeaser, _lng$Component8);

    function VimeoTeaser() {
      _classCallCheck(this, VimeoTeaser);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoTeaser).apply(this, arguments));
    }

    _createClass(VimeoTeaser, [{
      key: "pause",
      value: function pause() {
        this.tag('Progress').transition('w').pause();
        this.tag('Image').transition('scale').pause();
        this._pause = true;
      }
    }, {
      key: "play",
      value: function play() {
        this.tag('Progress').transition('w').play();
        this.tag('Image').transition('scale').play();
        this._pause = false;
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this7 = this;

        this._currentProgress = 0;
        this._progressDuration = 30;
        this._loadedTextures = [];
        this.tag('Title').on('txLoaded', function () {
          _this7._loadedTextures.push('title');

          _this7._position();
        });
        this.tag('User').on('txLoaded', function () {
          _this7._loadedTextures.push('user');

          _this7._position();
        });

        this._setState("Inactive");
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this.pause();
      }
    }, {
      key: "_active",
      value: function _active() {
        this.play();
      }
    }, {
      key: "_detach",
      value: function _detach() {
        if (this._interval) {
          clearInterval(this._interval);
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Watch: {
            smooth: {
              color: 0xffFADA24,
              scale: 1.2
            }
          }
        });
        this.pause();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Watch: {
            smooth: {
              color: 0xffffffff,
              scale: 1
            }
          }
        });
        this.play();
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors('play', {
          item: this._current,
          items: this._items
        });
      }
    }, {
      key: "loading",
      value: function loading() {
        this._setState("Loading");
      }
    }, {
      key: "running",
      value: function running() {
        this._setState("Running");
      }
    }, {
      key: "_position",
      value: function _position() {
        if (this._loadedTextures.indexOf('user') !== -1 && this._loadedTextures.indexOf('title') !== -1) {
          var yUser = this.tag('Title').renderHeight + this.tag('Title').y - 15;
          this.patch({
            User: {
              y: yUser
            },
            Watch: {
              y: yUser + 70
            }
          });
          this._loadedTextures = [];
        }
      }
    }, {
      key: "_progress",
      value: function _progress() {
        if (this._pause) {
          return;
        }

        if (this._currentProgress === this._progressDuration) {
          this.fire('loading');
          return;
        }

        this._currentProgress += 1;
      }
    }, {
      key: "_update",
      value: function _update() {
        var _this8 = this;

        if (!this._currentSet.length) {
          this._currentSet = this._items.slice();
        }

        var item = this._currentSet.splice(VimeoTeaser.random(this._currentSet), 1)[0];

        this._current = item;
        this.patch({
          Clipper: {
            Image: {
              src: App.cropImage({
                url: item.largest,
                w: 1400,
                h: 590
              })
            }
          },
          Title: {
            text: {
              text: item.title
            }
          },
          User: {
            text: {
              text: item.username
            }
          }
        });
        this.tag('Title').loadTexture();
        this.tag('User').loadTexture();
        this.tag('Image').on('txLoaded', function () {
          _this8.fire('loaded');
        });
        this.tag('Image').on('txError', function () {
          _this8.signal('error');
        });
      }
    }, {
      key: "items",
      set: function set(v) {
        this._items = v;
        this._currentSet = this._items.slice();

        this._update();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          color: 0xff000000,
          w: 1770,
          x: 0,
          h: 590,
          Clipper: {
            clipping: true,
            w: 1550,
            h: 590,
            x: 370,
            Image: {
              alpha: 0.0001,
              transitions: {
                alpha: {
                  duration: 3,
                  delay: 0
                },
                scale: {
                  duration: 30,
                  delay: 0.1
                }
              }
            }
          },
          Gradient: {
            x: 370,
            colorLeft: 0xff000000,
            colorRight: 0x00000000,
            w: 1000,
            h: 590,
            rect: true
          },
          Seal: {
            x: 40,
            y: 50,
            src: App.getPath('images/vimeo-staff-pick.png'),
            scale: 0.7,
            alpha: 0,
            rotation: -0.3,
            transitions: {
              scale: {
                duration: 0.4,
                delay: 2
              },
              alpha: {
                duration: 0.4,
                delay: 2
              },
              rotation: {
                duration: 0.4,
                delay: 2
              }
            }
          },
          Title: {
            y: 240,
            x: 90,
            text: {
              fontSize: 56,
              maxLines: 2,
              wordWrapWidth: 690,
              lineHeight: 80
            },
            transitions: {
              alpha: {
                duration: 1.5,
                delay: 0.5
              }
            }
          },
          User: {
            y: 290,
            x: 90,
            color: 0xffA3A4A5,
            text: {
              fontSize: 30,
              maxLines: 1,
              wordWrapWidth: 690,
              lineHeight: 40
            },
            transitions: {
              alpha: {
                duration: 1.5,
                delay: 0.7
              }
            }
          },
          Watch: {
            texture: lng.Tools.getRoundRect(150, 50, 5, 0, 0x00000000, true, 0xffffffff),
            y: 390,
            x: 90,
            alpha: 0,
            transitions: {
              alpha: {
                duration: 1.5,
                delay: 0.9
              }
            },
            Icon: {
              y: 15,
              x: 19,
              src: App.getPath('images/watch-icon.png'),
              w: 19,
              h: 20
            },
            Label: {
              x: 52,
              y: 10,
              color: 0xff000000,
              text: {
                text: 'Watch',
                fontSize: 25
              }
            }
          },
          Overlay: {
            rect: true,
            color: 0xff282E32,
            w: 1920,
            x: 0,
            h: 590,
            transitions: {
              h: {
                duration: 0.6,
                delay: 0.3
              },
              y: {
                duration: 0.6,
                delay: 0.3
              }
            }
          },
          Progress: {
            x: 0,
            y: 585,
            h: 5,
            w: 0,
            rect: true,
            color: 0x80ffffff,
            alpha: 0,
            transitions: {
              w: {
                duration: 30,
                timingFunction: 'linear'
              },
              alpha: {
                duration: 1,
                delay: 2
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
        function (_this9) {
          _inherits(Inactive, _this9);

          function Inactive() {
            _classCallCheck(this, Inactive);

            return _possibleConstructorReturn(this, _getPrototypeOf(Inactive).apply(this, arguments));
          }

          _createClass(Inactive, [{
            key: "loaded",
            value: function loaded() {
              var _this10 = this;

              this.patch({
                Clipper: {
                  Image: {
                    scale: 1,
                    smooth: {
                      alpha: 1,
                      scale: 1.3
                    }
                  }
                },
                Seal: {
                  smooth: {
                    alpha: 1,
                    scale: 0.9,
                    rotation: 0
                  }
                },
                Overlay: {
                  smooth: {
                    h: 1,
                    y: 591
                  }
                },
                Watch: {
                  smooth: {
                    alpha: 1
                  }
                },
                Progress: {
                  smooth: {
                    alpha: 1,
                    w: 1770
                  }
                }
              });

              if (this._interval) {
                clearInterval(this._interval);
              }

              this._interval = setInterval(function () {
                _this10._progress();
              }, 1000);
              this.tag('Image').transition('alpha').on('finish', function () {
                if (_this10.tag('Image').alpha < 1) {
                  _this10.fire('imageFaded');
                }
              });
            }
          }]);

          return Inactive;
        }(this),
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
              clearInterval(this._interval);
              this.patch({
                Clipper: {
                  Image: {
                    smooth: {
                      alpha: 0.00001
                    }
                  }
                },
                Title: {
                  smooth: {
                    alpha: 0
                  }
                },
                User: {
                  smooth: {
                    alpha: 0
                  }
                },
                Watch: {
                  smooth: {
                    alpha: 0
                  }
                },
                Progress: {
                  smooth: {
                    w: [0, {
                      duration: 0.1,
                      delay: 0
                    }]
                  }
                }
              });
              this._currentProgress = 0;
            }
          }, {
            key: "imageFaded",
            value: function imageFaded() {
              this._update();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              var _this12 = this;

              if (this._interval) {
                clearInterval(this._interval);
              }

              this._interval = setInterval(function () {
                _this12._progress();
              }, 1000);
            }
          }, {
            key: "loaded",
            value: function loaded() {
              this.patch({
                Clipper: {
                  Image: {
                    scale: 1,
                    smooth: {
                      alpha: 1,
                      scale: [1.3, {
                        duration: 30,
                        delay: 0
                      }]
                    }
                  }
                },
                Title: {
                  smooth: {
                    alpha: 1
                  }
                },
                User: {
                  smooth: {
                    alpha: 1
                  }
                },
                Watch: {
                  smooth: {
                    alpha: 1
                  }
                },
                Progress: {
                  smooth: {
                    w: [1770, {
                      duration: 30,
                      delay: 0,
                      timingFunction: 'linear'
                    }]
                  }
                }
              });
              this.fire('running');
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(Running, _this13);

          function Running() {
            _classCallCheck(this, Running);

            return _possibleConstructorReturn(this, _getPrototypeOf(Running).apply(this, arguments));
          }

          return Running;
        }(this)];
      }
    }, {
      key: "random",
      value: function random(items) {
        var len = items;

        if (Array.isArray(items)) {
          len = items.length;
        }

        return Math.floor(Math.random() * len);
      }
    }]);

    return VimeoTeaser;
  }(lng.Component);

  var VimeoHome =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(VimeoHome, _lng$Component9);

    function VimeoHome() {
      _classCallCheck(this, VimeoHome);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoHome).apply(this, arguments));
    }

    _createClass(VimeoHome, [{
      key: "_init",
      value: function _init() {
        this._setState("Loading");
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Teaser: {
            type: VimeoTeaser
          },
          StaffPicks: {
            w: function w(_w3) {
              return _w3;
            },
            type: VimeoGrid,
            title: 'STAFF PICKS',
            storeFocus: true,
            y: 1080,
            x: -10,
            transitions: {
              y: {
                duration: 0.4,
                delay: 0.7
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
        function (_this14) {
          _inherits(Loading, _this14);

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
              var _this15 = this;

              var api = this.fireAncestors('$getApi');
              api.getStaffpicks().then(function (data) {
                _this15._loaded(data);
              }).catch(function (err) {
                return console.error(err);
              });
            }
          }, {
            key: "_loaded",
            value: function _loaded(data) {
              this.tag('Teaser').items = data;
              this.tag('StaffPicks').items = data;

              this._setState("StaffPicks");
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this16) {
          _inherits(Teaser, _this16);

          function Teaser() {
            _classCallCheck(this, Teaser);

            return _possibleConstructorReturn(this, _getPrototypeOf(Teaser).apply(this, arguments));
          }

          _createClass(Teaser, [{
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("StaffPicks");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Teaser');
            }
          }]);

          return Teaser;
        }(this),
        /*#__PURE__*/
        function (_this17) {
          _inherits(StaffPicks, _this17);

          function StaffPicks() {
            _classCallCheck(this, StaffPicks);

            return _possibleConstructorReturn(this, _getPrototypeOf(StaffPicks).apply(this, arguments));
          }

          _createClass(StaffPicks, [{
            key: "$enter",
            value: function $enter() {
              this.tag('Teaser').patch({
                smooth: {
                  y: 0
                }
              });
              this.tag('StaffPicks').patch({
                smooth: {
                  y: 600
                }
              });
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Teaser");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('StaffPicks');
            }
          }]);

          return StaffPicks;
        }(this)];
      }
    }]);

    return VimeoHome;
  }(lng.Component);

  var VimeoContent =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(VimeoContent, _lng$Component10);

    function VimeoContent() {
      _classCallCheck(this, VimeoContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoContent).apply(this, arguments));
    }

    _createClass(VimeoContent, [{
      key: "_setup",
      value: function _setup() {
        this._views = {
          Home: [this.tag('Home')],
          Explore: [this.tag('Explore')],
          Search: [this.tag('Search')]
        };
        this._mapping = {
          feed: "Home",
          explore: "Explore",
          search: "Search"
        };
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Home");
      }
    }, {
      key: "play",
      value: function play(args) {
        this.fireAncestors('$play', args);
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
          Home: {
            w: function w(_w4) {
              return _w4;
            },
            type: VimeoHome,
            alpha: 0
          },
          Search: {
            w: function w(_w5) {
              return _w5;
            },
            type: VimeoSearch,
            alpha: 0
          },
          Explore: {
            w: function w(_w6) {
              return _w6;
            },
            type: VimeoExplore,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this18) {
          _inherits(Home, _this18);

          function Home() {
            _classCallCheck(this, Home);

            return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
          }

          _createClass(Home, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Home").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Home").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Home');
            }
          }]);

          return Home;
        }(this),
        /*#__PURE__*/
        function (_this19) {
          _inherits(Explore, _this19);

          function Explore() {
            _classCallCheck(this, Explore);

            return _possibleConstructorReturn(this, _getPrototypeOf(Explore).apply(this, arguments));
          }

          _createClass(Explore, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Explore").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Explore").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Explore');
            }
          }]);

          return Explore;
        }(this),
        /*#__PURE__*/
        function (_this20) {
          _inherits(Search, _this20);

          function Search() {
            _classCallCheck(this, Search);

            return _possibleConstructorReturn(this, _getPrototypeOf(Search).apply(this, arguments));
          }

          _createClass(Search, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Search").setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Search").setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Search');
            }
          }]);

          return Search;
        }(this)];
      }
    }]);

    return VimeoContent;
  }(lng.Component);

  var VimeoLogin =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(VimeoLogin, _lng$Component11);

    function VimeoLogin() {
      _classCallCheck(this, VimeoLogin);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoLogin).apply(this, arguments));
    }

    _createClass(VimeoLogin, null, [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            Title: {
              text: {
                text: "Login",
                fontSize: 45
              }
            },
            Info: {
              y: 95,
              text: {
                text: "Sign in to your account to access your library and your own profile",
                maxLines: 3,
                wordWrapWidth: 400,
                lineHeight: 40,
                fontSize: 24
              }
            },
            Username: {
              y: 210,
              Label: {
                text: {
                  text: "username",
                  fontSize: 21
                }
              },
              Input: {
                y: 30,
                texture: lng.Tools.getRoundRect(350, 50, 5, 2, 0xffffffff, true, 0x99ffffff)
              }
            },
            Password: {
              y: 310,
              Label: {
                text: {
                  text: "username",
                  fontSize: 21
                }
              },
              Input: {
                y: 30,
                texture: lng.Tools.getRoundRect(350, 50, 5, 2, 0xffffffff, true, 0x99ffffff)
              }
            },
            Login: {
              y: 430,
              x: 150,
              Input: {
                texture: lng.Tools.getRoundRect(200, 50, 5, 0, 0xffffffff, true, 0xff00ADEF)
              },
              Label: {
                x: 70,
                y: 8,
                text: {
                  text: "login",
                  fontSize: 25
                }
              }
            }
          }
        };
      }
    }]);

    return VimeoLogin;
  }(lng.Component);

  var VimeoMenuItem =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(VimeoMenuItem, _lng$Component12);

    function VimeoMenuItem() {
      _classCallCheck(this, VimeoMenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoMenuItem).apply(this, arguments));
    }

    _createClass(VimeoMenuItem, [{
      key: "_toggle",
      value: function _toggle(t) {
        this.patch({
          smooth: {
            y: t ? this._listindex * 120 + 133 : this._listindex * 90 + 93
          },
          Icon: {
            smooth: {
              scale: t ? 1 : 0.8
            }
          },
          Label: {
            smooth: {
              alpha: t ? 1 : 0
            }
          },
          ActiveRect: {
            smooth: {
              alpha: 0
            }
          }
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Collapsed");
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Label: {
            smooth: {
              color: 0xff0D1314
            }
          },
          Icon: {
            smooth: {
              color: 0xff0D1314
            }
          },
          ActiveRect: {
            alpha: 0
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Label: {
            smooth: {
              color: 0xfff1f1f1
            }
          },
          Icon: {
            smooth: {
              color: 0xfff1f1f1
            }
          }
        });
      }
    }, {
      key: "collapse",
      value: function collapse() {}
    }, {
      key: "expand",
      value: function expand() {}
    }, {
      key: "section",
      set: function set(v) {
        this._section = v;
        this.patch({
          Icon: {
            src: App.getPath("images/".concat(v, ".png")),
            scale: 0.8
          },
          Label: {
            text: v.toUpperCase()
          }
        });
      },
      get: function get() {
        return this._section;
      }
    }, {
      key: "secure",
      get: function get() {
        return this._secure;
      },
      set: function set(v) {
        this._secure = v;
      }
    }, {
      key: "listindex",
      set: function set(v) {
        this._listindex = v[0];
        this.patch({
          transitions: {
            y: {
              duration: 0.6,
              delay: v[1] * 0.1 + 0.05
            }
          },
          Icon: {
            transitions: {
              scale: {
                duration: 0.1,
                delay: v[1] * 0.1 + 0.05
              }
            }
          },
          Label: {
            transitions: {
              alpha: {
                duration: 0.2,
                delay: v[1] * 0.1 + 0.05
              }
            }
          }
        });
      }
    }, {
      key: "active",
      set: function set(v) {
        this._isActive = v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 60,
          ActiveRect: {
            transitions: {
              alpha: {
                duration: 0.2,
                delay: 0.2
              }
            },
            alpha: 0,
            texture: lng.Tools.getRoundRect(430, 100, 7, 0, 0x00000000, true, 0xff282E32)
          },
          Icon: {
            x: 20,
            w: 49,
            h: 49,
            y: 25,
            color: 0xfff1f1f1
          },
          Label: {
            x: 100,
            color: 0xfff1f1f1,
            y: 23,
            alpha: 0,
            text: {
              text: 'label'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this21) {
          _inherits(Expanded, _this21);

          function Expanded() {
            _classCallCheck(this, Expanded);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expanded).apply(this, arguments));
          }

          _createClass(Expanded, [{
            key: "$enter",
            value: function $enter() {
              this._toggle(true);
            }
          }, {
            key: "collapse",
            value: function collapse() {
              this._setState("Collapsed");
            }
          }, {
            key: "_unfocus",
            value: function _unfocus() {
              _get(_getPrototypeOf(Expanded.prototype), "_unfocus", this).call(this);

              this.patch({
                ActiveRect: {
                  smooth: {
                    alpha: this._isActive ? 1 : 0
                  }
                }
              });
            }
          }]);

          return Expanded;
        }(this),
        /*#__PURE__*/
        function (_this22) {
          _inherits(Collapsed, _this22);

          function Collapsed() {
            _classCallCheck(this, Collapsed);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapsed).apply(this, arguments));
          }

          _createClass(Collapsed, [{
            key: "$enter",
            value: function $enter() {
              this._toggle(false);
            }
          }, {
            key: "expand",
            value: function expand() {
              this._setState("Expanded");
            }
          }]);

          return Collapsed;
        }(this)];
      }
    }]);

    return VimeoMenuItem;
  }(lng.Component);

  var VimeoMenu =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(VimeoMenu, _lng$Component13);

    function VimeoMenu() {
      _classCallCheck(this, VimeoMenu);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoMenu).apply(this, arguments));
    }

    _createClass(VimeoMenu, [{
      key: "_toggle",
      value: function _toggle(t) {
        this.patch({
          Shadow: {
            transitions: {
              w: {
                duration: 0.5,
                delay: t ? 0 : 0.5
              }
            },
            smooth: {
              w: t ? 1170 : 200
            }
          },
          Wrapper: {
            transitions: {
              w: {
                duration: 0.5,
                delay: t ? 0 : 0.5
              }
            },
            smooth: {
              w: t ? 490 : 150
            },
            Gradient: {
              transitions: {
                x: {
                  duration: 0.5,
                  delay: t ? 0 : 0.5
                },
                w: {
                  duration: 0.5,
                  delay: t ? 0 : 0.5
                }
              },
              smooth: {
                x: t ? 490 : 150,
                w: t ? 10 : 5
              }
            },
            FocusIndicator: {
              smooth: {
                x: t ? [50, {
                  duration: 0.2,
                  delay: 0.6
                }] : [-1200, {
                  duration: 0.5,
                  delay: 0.2
                }],
                alpha: 1,
                y: t ? this._activeidx * 120 + 130 : this._midx * 120 + 130
              }
            }
          }
        });
        this.tag('Items').childList.get().forEach(function (el) {
          el[t ? 'expand' : 'collapse']();
        });
      }
    }, {
      key: "_repositionFocus",
      value: function _repositionFocus() {
        this.patch({
          Wrapper: {
            FocusIndicator: {
              smooth: {
                y: this._midx * 120 + 130
              }
            }
          }
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this23 = this;

        this.tag('Items').children = [{
          l: 'feed',
          secure: false
        }, {
          l: 'explore',
          secure: false
        }, {
          l: 'search',
          secure: false
        }, {
          l: 'library',
          secure: true
        }, {
          l: 'profile',
          secure: true
        }].map(function (el, idx, arr) {
          return {
            type: VimeoMenuItem,
            active: idx === 0,
            section: el.l,
            secure: el.secure,
            y: idx * 90 + 93,
            listindex: [idx, arr.length - idx]
          };
        });
        this._midx = 0;
        this._activeidx = 0;
        this.tag('FocusIndicator').transition('x').on('finish', function () {
          if (_this23.tag('FocusIndicator').x === 50) {
            _this23.fire('ready');
          }
        });
        this._login = false;

        this._setState("Collapsed");
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
      key: "_focus",
      value: function _focus() {
        this._toggle(true);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this._toggle(false);

        this._setState("Collapsed");
      }
    }, {
      key: "list",
      get: function get() {
        return this.tag('Items').childList.get();
      }
    }, {
      key: "active",
      get: function get() {
        return this.list[this._midx];
      }
    }, {
      key: "previousActive",
      get: function get() {
        return this.list[this._activeidx];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 1,
          x: -150,
          zIndex: 99,
          transitions: {
            x: {
              duration: 0.6,
              delay: 0
            }
          },
          Shadow: {
            colorLeft: 0xff000000,
            colorRight: 0x00000000,
            w: 200,
            h: 1080,
            rect: true
          },
          Wrapper: {
            w: 150,
            h: 1080,
            color: VimeoMenu.COLORS.BACKGROUND,
            rect: true,
            transitions: {},
            Gradient: {
              src: App.getPath('images/vimeo-line.png'),
              x: 150
            },
            FocusIndicator: {
              alpha: 0,
              x: -1200,
              y: 120,
              transitions: {
                x: {
                  duration: 0.7,
                  delay: 0.8
                }
              },
              Shadow: {
                color: 0xff000000,
                alpha: 0.5,
                texture: lng.Tools.getShadowRect(460, 100, 7, 5)
              },
              Focus: {
                alpha: 1,
                texture: lng.Tools.getRoundRect(460, 100, 7, 0, 0x00000000, true, 0xfff1f1f1)
              }
            },
            Items: {}
          },
          Login: {
            type: VimeoLogin,
            x: 70,
            y: 70,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this24) {
          _inherits(Expanded, _this24);

          function Expanded() {
            _classCallCheck(this, Expanded);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expanded).apply(this, arguments));
          }

          _createClass(Expanded, [{
            key: "$enter",
            value: function $enter() {
              this._midx = this._activeidx || 0;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._midx === 0) {
                this._midx = this.list.length - 1;
              } else {
                this._midx--;
              }

              this._repositionFocus();
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this._midx === this.list.length - 1) {
                this._midx = 0;
              } else {
                this._midx++;
              }

              this._repositionFocus();
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._activeidx = this._midx;

              if (!this._login && this.active.secure) {
                this._setState("Login");
              } else {
                this._activeidx = this._midx;
                this.signal('select', {
                  view: this.active.section
                });
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.active;
            }
          }]);

          return Expanded;
        }(this),
        /*#__PURE__*/
        function (_this25) {
          _inherits(Collapsed, _this25);

          function Collapsed() {
            _classCallCheck(this, Collapsed);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapsed).apply(this, arguments));
          }

          _createClass(Collapsed, [{
            key: "ready",
            value: function ready() {
              this._setState("Expanded");
            }
          }]);

          return Collapsed;
        }(this),
        /*#__PURE__*/
        function (_this26) {
          _inherits(Login, _this26);

          function Login() {
            _classCallCheck(this, Login);

            return _possibleConstructorReturn(this, _getPrototypeOf(Login).apply(this, arguments));
          }

          _createClass(Login, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                Wrapper: {
                  smooth: {
                    w: 520
                  },
                  Gradient: {
                    smooth: {
                      x: 520
                    }
                  },
                  FocusIndicator: {
                    smooth: {
                      alpha: 0
                    }
                  },
                  Items: {
                    smooth: {
                      alpha: 0
                    }
                  }
                },
                Login: {
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
                Wrapper: {
                  smooth: {
                    w: 490
                  },
                  Gradient: {
                    smooth: {
                      x: 490
                    }
                  },
                  FocusIndicator: {
                    smooth: {
                      alpha: 1
                    }
                  },
                  Items: {
                    smooth: {
                      alpha: 1
                    }
                  }
                },
                Login: {
                  smooth: {
                    alpha: 0
                  }
                }
              });
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              this._setState("Expanded");
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("Expanded");
            }
          }]);

          return Login;
        }(this)];
      }
    }]);

    return VimeoMenu;
  }(lng.Component);

  VimeoMenu.COLORS = {
    BACKGROUND: 0xff37434a
  };

  var VimeoMain =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(VimeoMain, _lng$Component14);

    function VimeoMain() {
      _classCallCheck(this, VimeoMain);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoMain).apply(this, arguments));
    }

    _createClass(VimeoMain, [{
      key: "_setup",
      value: function _setup() {
        var _this27 = this;

        this._loader = this.tag("Loader").animation({
          duration: 2,
          repeat: -1,
          stopMethod: 'immediate',
          actions: [{
            p: 'y',
            rv: 450,
            v: {
              0: 450,
              0.5: 440,
              1: 450
            }
          }]
        });

        this._loader.on('stop', function () {
          _this27.tag('Loader').setSmooth('alpha', 0);
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Loading");
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
            type: VimeoMenu,
            signals: {
              select: true
            }
          },
          Content: {
            x: 150,
            w: 1770,
            type: VimeoContent
          },
          Loader: {
            src: App.getPath('images/vimeo-loading.png'),
            x: 739,
            y: 467,
            w: 442,
            h: 146
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this28) {
          _inherits(Loading, _this28);

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
        function (_this29) {
          _inherits(Content, _this29);

          function Content() {
            _classCallCheck(this, Content);

            return _possibleConstructorReturn(this, _getPrototypeOf(Content).apply(this, arguments));
          }

          _createClass(Content, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Content');
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this._setState("Menu");
            }
          }]);

          return Content;
        }(this),
        /*#__PURE__*/
        function (_this30) {
          _inherits(Menu, _this30);

          function Menu() {
            _classCallCheck(this, Menu);

            return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
          }

          _createClass(Menu, [{
            key: "_handleRight",
            value: function _handleRight() {
              this._setState("Content");
            }
          }, {
            key: "select",
            value: function select(_ref5) {
              var view = _ref5.view;
              this.tag("Content").select(view);

              this._setState("Content", view);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Menu');
            }
          }]);

          return Menu;
        }(this)];
      }
    }]);

    return VimeoMain;
  }(lng.Component);

  var VimeoPlayer =
  /*#__PURE__*/
  function (_ux$tools$player$Play) {
    _inherits(VimeoPlayer, _ux$tools$player$Play);

    function VimeoPlayer() {
      _classCallCheck(this, VimeoPlayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoPlayer).apply(this, arguments));
    }

    _createClass(VimeoPlayer, [{
      key: "_scrubBackward",
      value: function _scrubBackward() {
        this.application.mediaplayer.seek(-15);
      }
    }, {
      key: "_scrubForward",
      value: function _scrubForward() {
        this.application.mediaplayer.seek(15);
      }
    }], [{
      key: "_template",
      value: function _template() {
        var template = _get(_getPrototypeOf(VimeoPlayer), "_template", this).call(this);

        template.Progress.signals = {
          left: "_scrubBackward",
          enter: "pressPlay",
          right: "_scrubForward"
        };
        return template;
      }
    }, {
      key: "_states",
      value: function _states() {
        var states = _get(_getPrototypeOf(VimeoPlayer), "_states", this).call(this);

        var i;
        i = states.findIndex(function (state) {
          return state.name === "Controls";
        });

        states[i] =
        /*#__PURE__*/
        function (_states$i) {
          _inherits(Controls, _states$i);

          function Controls() {
            _classCallCheck(this, Controls);

            return _possibleConstructorReturn(this, _getPrototypeOf(Controls).apply(this, arguments));
          }

          _createClass(Controls, [{
            key: "_handleDown",
            value: function _handleDown() {
              this._setState("Progress");
            }
          }]);

          return Controls;
        }(states[i]);

        states.push(
        /*#__PURE__*/
        function (_this31) {
          _inherits(Progress, _this31);

          function Progress() {
            _classCallCheck(this, Progress);

            return _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
          }

          _createClass(Progress, [{
            key: "_handleUp",
            value: function _handleUp() {
              this._setState("Controls");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Progress");
            }
          }]);

          return Progress;
        }(this));
        return states;
      }
    }, {
      key: "PlayerControls",
      get: function get() {
        return VimeoPlayerControls;
      }
    }, {
      key: "PlayerProgress",
      get: function get() {
        return VimeoPlayerProgress;
      }
    }]);

    return VimeoPlayer;
  }(ux.tools.player.Player);

  var VimeoPlayerProgress =
  /*#__PURE__*/
  function (_ux$tools$player$Play2) {
    _inherits(VimeoPlayerProgress, _ux$tools$player$Play2);

    function VimeoPlayerProgress() {
      _classCallCheck(this, VimeoPlayerProgress);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoPlayerProgress).apply(this, arguments));
    }

    _createClass(VimeoPlayerProgress, [{
      key: "_focus",
      value: function _focus() {
        this.tag("Main").color = 0xffFADA24;
        this.tag("Active").color = 0xffFADA24;
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag("Main").color = 0xfff1f1f1;
        this.tag("Active").color = 0xfff1f1f1;
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        this.signal("left");
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal("enter");
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.signal("right");
      }
    }]);

    return VimeoPlayerProgress;
  }(ux.tools.player.PlayerProgress);

  var VimeoPlayerControls =
  /*#__PURE__*/
  function (_ux$tools$player$Play3) {
    _inherits(VimeoPlayerControls, _ux$tools$player$Play3);

    function VimeoPlayerControls() {
      _classCallCheck(this, VimeoPlayerControls);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoPlayerControls).apply(this, arguments));
    }

    _createClass(VimeoPlayerControls, null, [{
      key: "PlayerButton",
      get: function get() {
        return VimeoPlayerButton;
      }
    }]);

    return VimeoPlayerControls;
  }(ux.tools.player.PlayerControls);

  var VimeoPlayerButton =
  /*#__PURE__*/
  function (_ux$tools$player$Play4) {
    _inherits(VimeoPlayerButton, _ux$tools$player$Play4);

    function VimeoPlayerButton() {
      _classCallCheck(this, VimeoPlayerButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoPlayerButton).apply(this, arguments));
    }

    _createClass(VimeoPlayerButton, null, [{
      key: "_buildOptions",
      value: function _buildOptions() {
        return lng.tools.ObjMerger.merge(_get(_getPrototypeOf(VimeoPlayerButton), "_buildOptions", this).call(this), {
          colors: {
            selected: 0xffFADA24,
            deselected: lng.StageUtils.mergeColors(0xffFADA24, 0xff000000, 0.25)
          }
        });
      }
    }]);

    return VimeoPlayerButton;
  }(ux.tools.player.PlayerButton);

  var VimeoMediaItem =
  /*#__PURE__*/
  function () {
    function VimeoMediaItem(obj) {
      _classCallCheck(this, VimeoMediaItem);

      this.$ = obj;
    }

    _createClass(VimeoMediaItem, [{
      key: "getMediaplayerItem",
      value: function getMediaplayerItem() {
        return {
          title: this.title,
          stream: {
            link: this.filterStreams()[0].link
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
      value: function getPicture(_ref6) {
        var _ref6$w = _ref6.w,
            w = _ref6$w === void 0 ? null : _ref6$w,
            _ref6$h = _ref6.h,
            h = _ref6$h === void 0 ? null : _ref6$h;
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
      key: "filterStreams",

      /**
       * get an array of streams by quality
       * @param quality {(source|hd|sd)}
       */
      value: function filterStreams() {
        var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sd';
        return this.streams.filter(function (stream) {
          return stream.quality === quality;
        });
      }
    }, {
      key: "title",
      get: function get() {
        return this.$.name;
      }
    }, {
      key: "pictures",
      get: function get() {
        return this.$.pictures.sort(function (a, b) {
          return b.width - a.width;
        });
      }
    }, {
      key: "largest",
      get: function get() {
        return this.pictures[0].link;
      }
    }, {
      key: "smallest",
      get: function get() {
        var p = this.pictures;
        return p[p.length - 1].link;
      }
    }, {
      key: "streams",
      get: function get() {
        return this.$.download || [];
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
      key: "date",
      get: function get() {
        return this.$.created_time;
      }
    }, {
      key: "language",
      get: function get() {
        return this.$.language;
      }
    }, {
      key: "user",
      get: function get() {
        return this.$.user;
      }
    }, {
      key: "username",
      get: function get() {
        return this.user.name;
      }
    }]);

    return VimeoMediaItem;
  }();

  var VimeoApi =
  /*#__PURE__*/
  function () {
    function VimeoApi() {
      _classCallCheck(this, VimeoApi);

      this._keys = {
        key: 'aabe22c4e1a4038c0fc233bd6a0aa973',
        secret: '5d9d5e20fc83a9ac',
        token: '043c069649b914767c9cfe4db8cc6d63'
      };
      this._endpoints = {
        base: 'https://api.vimeo.com',
        staff: 'https://api.vimeo.com/channels/staffpicks/videos?filter=content_rating&filter_content_rating=safe&per_page=20&page=1',
        channels: 'https://api.vimeo.com/channels?per_page=10&sort=followers&direction=desc',
        search: 'https://api.vimeo.com/videos'
      };
    }

    _createClass(VimeoApi, [{
      key: "_getHeaders",
      value: function _getHeaders() {
        return {
          headers: new Headers({
            Authorization: "bearer ".concat(this._keys.token)
          })
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
      key: "getStaffpicks",
      value: function getStaffpicks() {
        return this._send(this._endpoints.staff).then(function (_ref7) {
          var _ref7$data = _ref7.data,
              data = _ref7$data === void 0 ? [] : _ref7$data,
              paging = _ref7.paging;

          if (!data.length) {
            return Promise.reject('Get staffpicks returned no data');
          }

          return Promise.resolve(data.map(function (video) {
            return new VimeoMediaItem(video);
          }));
        });
      }
    }, {
      key: "getChannels",
      value: function getChannels() {
        return this._getChannelsPromises().then(function (data) {
          var filtered = data.filter(function (channel) {
            return channel.total > 5;
          });
          var channels = filtered.map(function (channel) {
            return {
              category: channel.category,
              items: channel.data.splice(0, 15).map(function (item) {
                return new VimeoMediaItem(item);
              })
            };
          });
          return Promise.resolve(channels);
        });
      }
    }, {
      key: "_getChannelsPromises",
      value: function _getChannelsPromises() {
        var _this32 = this;

        return this._send(this._endpoints.channels).then(function () {
          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var promises = [];
          data.data.forEach(function (channel) {
            promises.push(_this32._getVideosForChannel(channel));
          });
          return Promise.all(promises);
        });
      }
    }, {
      key: "_getVideosForChannel",
      value: function _getVideosForChannel(channel) {
        return this._send("".concat(this._endpoints.base).concat(channel.uri, "/videos")).then(function (data) {
          data.category = channel.name;
          return Promise.resolve(data);
        });
      }
    }, {
      key: "search",
      value: function search(query) {
        return this._send("".concat(this._endpoints.search, "/?query=").concat(query, "&direction=desc&sort=likes")).then(function (data) {
          if (!data.data.length) {
            return Promise.resolve([]);
          }

          var results = data.data.map(function (item) {
            return new VimeoMediaItem(item);
          });
          return Promise.resolve(results);
        });
      }
    }, {
      key: "send",
      value: function send() {// fix
      }
    }]);

    return VimeoApi;
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
        this._api = new VimeoApi();
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
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Player: {
            type: VimeoPlayer,
            alpha: 0,
            signals: {
              playerStop: true
            }
          },
          Main: {
            type: VimeoMain
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this33) {
          _inherits(Main, _this33);

          function Main() {
            _classCallCheck(this, Main);

            return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));
          }

          _createClass(Main, [{
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

          return Main;
        }(this),
        /*#__PURE__*/
        function (_this34) {
          _inherits(Playing, _this34);

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
      key: "secondsToTime",
      value: function secondsToTime(sec) {
        var hours = Math.floor(sec / 3600);
        sec %= 3600;
        var minutes = Math.floor(sec / 60);
        var seconds = sec % 60;
        return "".concat(App.paddZero(hours), ":").concat(App.paddZero(minutes), ":").concat(App.paddZero(seconds));
      }
    }, {
      key: "paddZero",
      value: function paddZero(v) {
        if (v < 10) return "0".concat(v);
        return v;
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
    }]);

    return App;
  }(ux.App);

  App.COLORS = {
    BACKGROUND: 0xff282e32
  };
  return App;
}();