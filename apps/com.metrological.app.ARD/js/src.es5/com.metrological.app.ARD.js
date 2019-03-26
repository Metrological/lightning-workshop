"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var com_metrological_app_ARD = function () {
  'use strict';

  var ViewManager =
  /*#__PURE__*/
  function () {
    function ViewManager() {
      _classCallCheck(this, ViewManager);

      this.history = [];
      this._c = null;
      this._tl = null;
      this.previous = false;
    }

    _createClass(ViewManager, [{
      key: "viewSwitched",
      value: function viewSwitched(hasContent) {
        this.current = this.toLoad;
        this.current.hasContent = hasContent;
        return this.currentView;
      }
    }, {
      key: "clearHistory",
      value: function clearHistory() {
        this.history = [];
      }
    }, {
      key: "toLoad",
      get: function get() {
        return this._tl;
      },
      set: function set(obj) {
        this._tl = obj;
      }
    }, {
      key: "loadView",
      get: function get() {
        return this.toLoad.view;
      }
    }, {
      key: "currentView",
      get: function get() {
        return this._c.view;
      }
    }, {
      key: "current",
      get: function get() {
        return this._c;
      },
      set: function set(obj) {
        this.toLoad = null;
        var c = this.current;

        if (c && c.view && !c.ignore && !this.previous && !obj.reload) {
          this.history.push(c);
        }

        this.previous = false;
        this._c = obj;
      }
    }, {
      key: "previousView",
      get: function get() {
        var target = 'exit';

        if (this.history.length) {
          target = this.history.pop();
          this.previous = true;
        }

        return target;
      }
    }]);

    return ViewManager;
  }();

  var API =
  /*#__PURE__*/
  function (_lng$EventEmitter) {
    _inherits(API, _lng$EventEmitter);

    function API() {
      var _this;

      _classCallCheck(this, API);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(API).call(this));
      _this.baseUrl = 'http://page.ardmediathek.de/page-gateway/pages'; // this.baseUrl = 'http://api-origin-dev.ardmediathek.de/page-gateway/pages'

      return _this;
    }

    _createClass(API, [{
      key: "call",
      value: function call(target, params) {
        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
        var options = {
          headers: {},
          method: method
        };

        if (method !== 'GET') {
          options.body = JSON.stringify(params);
        }

        return fetch(ux.Ui.getProxyUrl(target), options).then(function (response) {
          if (!response.ok) {
            throw response.statusText;
          }

          if (response.status !== 200) {
            return response;
          }

          return response.json();
        }).catch(function (error) {
          throw error;
        });
      }
    }, {
      key: "getMainPageData",
      value: function getMainPageData(target) {
        var _this2 = this;

        return this.call("".concat(this.baseUrl, "/").concat(this.checkTarget(target), "/home")).then(function (response) {
          if (response.widgets && Object.keys(response.widgets).length > 0) {
            response.widgets = response.widgets.filter(function (widget) {
              widget.teasers = widget.teasers.filter(function (teaser) {
                if (teaser.type !== 'compilation') {
                  return teaser;
                }

                return false;
              });

              if (widget.teasers.length > 0) {
                return widget;
              }

              return false;
            });
          } else {
            throw 'error';
          }

          return response;
        }).catch(function (reason) {
          _this2.emit('error', {
            value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'
          });
        });
      }
    }, {
      key: "getGlossaryPageData",
      value: function getGlossaryPageData(target) {
        var _this3 = this;

        return this.call("".concat(this.baseUrl, "/").concat(this.checkTarget(target), "/shows")).then(function (_ref) {
          var widgets = _ref.widgets;
          var page = {
            glossary: {}
          };
          var comps = widgets[0].compilations;
          Object.keys(comps).forEach(function (key) {
            page.glossary["shows".concat(key)] = comps[key].teasers;
          });
          return page;
        }).catch(function (reason) {
          _this3.emit('error', {
            value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'
          });
        });
      }
    }, {
      key: "getShowPage",
      value: function getShowPage(showId) {
        var _this4 = this;

        return this.call("".concat(this.baseUrl, "/ard/grouping/").concat(showId, "?pageNumber=0&pageSize=100")).then(function (_ref2) {
          var title = _ref2.title,
              image = _ref2.image,
              synopsis = _ref2.synopsis,
              widgets = _ref2.widgets;
          return {
            title: title,
            image: image,
            synopsis: synopsis,
            teasers: widgets[0].teasers
          };
        }).catch(function (reason) {
          _this4.emit('error', {
            value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'
          });
        });
      }
    }, {
      key: "getPlayerPage",
      value: function getPlayerPage(clipId) {
        var _this5 = this;

        return this.call("".concat(this.baseUrl, "/ard/item/").concat(clipId, "?pageNumber=0&pageSize=100")).then(function (response) {
          return Promise.all([response, _this5.getData(response.widgets[0].mediaCollection.href.replace('{devicetype}', 'hbbtv'))]);
        }).then(function (response) {
          var page = response[0].widgets[0];
          page.mediaCollection = response[1];

          if (page.teasers === undefined) {
            page.teasers = response[0].widgets[1].teasers;
          }

          return page;
        }).catch(function (reason) {
          _this5.emit('error', {
            value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'
          });
        });
      }
    }, {
      key: "search",
      value: function search(query) {
        var _this6 = this;

        return this.call("".concat(this.baseUrl, "/ard/search?searchString=").concat(query, "&pageNumber=0&pageSize=999")).then(function (response) {
          var results = {};

          if (response.showResults.length) {
            results.showResults = response.showResults;
          }

          if (response.vodResults.length) {
            results.vodResults = response.vodResults;
          }

          return results;
        }).catch(function (reason) {
          _this6.emit('error', {
            value: 'Keine Verbindung mit dem Server möglich - Bitte versuchen Sie es später erneut.'
          });
        });
      }
    }, {
      key: "getData",
      value: function getData(link) {
        return this.call(link);
      }
    }, {
      key: "checkTarget",
      value: function checkTarget(target) {
        if (target === 'rb') {
          target = 'radiobremen';
        }

        this.currentChannel = target;
        return target;
      }
    }, {
      key: "getInfo",
      value: function getInfo(page) {
        var _this7 = this;

        return fetch(AppDefinition.getPath("data/".concat(page, ".json"))).then(function (response) {
          if (!response.ok) throw "Response not ok";
          return response.json();
        }).catch(function (e) {
          _this7.emit('error', {
            value: 'Keine Verbindung mit dem Server möglich - Bitte versuchen Sie es später erneut.'
          });
        });
      }
    }, {
      key: "getSubtitlesOn",
      value: function getSubtitlesOn() {
        this._subtitlesOn = false;
        var storage = window.localStorage['app-ARD'] && JSON.parse(window.localStorage['app-ARD']);

        if (storage && storage.subtitles) {
          this._subtitlesOn = storage.subtitles;
        }

        return this._subtitlesOn;
      }
    }, {
      key: "setSubtitlesOn",
      value: function setSubtitlesOn(bool) {
        this._subtitlesOn = bool;
        window.localStorage['app-ARD'] = JSON.stringify({
          subtitles: bool
        });
      }
    }, {
      key: "formatTime",
      value: function formatTime(number) {
        return number < 10 ? "0" + number : number;
      }
    }, {
      key: "getDate",
      value: function getDate(data, time) {
        var d = new Date(data);
        var timestr = '';

        if (time) {
          timestr = " \u2022 ".concat(this.formatTime(d.getHours()), ":").concat(this.formatTime(d.getMinutes()), " Uhr");
        }

        return "".concat(d.getDate(), ".").concat(d.getMonth() + 1, ".").concat(d.getFullYear()).concat(timestr);
      }
    }]);

    return API;
  }(lng.EventEmitter);

  var Theme =
  /*#__PURE__*/
  function () {
    function Theme() {
      _classCallCheck(this, Theme);
    }

    _createClass(Theme, [{
      key: "getColorScheme",
      value: function getColorScheme() {
        var _this8 = this;

        var cs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.colorSheet;
        var colors = {};
        Object.keys(cs).forEach(function (key) {
          if (cs[key].length > 0) {
            colors[key] = _this8.configureColor(cs[key]);
          } else {
            colors[key] = _this8.getColorScheme(cs[key]);
          }
        });
        return colors;
      }
    }, {
      key: "configureColor",
      value: function configureColor(str) {
        var l = str.split('l')[1];

        if (l) {
          str = str.replace("l".concat(l), '');
        }

        var d = str.split('d')[1];

        if (d) {
          str = str.replace("d".concat(d), '');
        }

        var o = str.split('o')[1];

        if (o) {
          str = str.replace("o".concat(o), '');
        }

        var color = this.baseColors[str];

        if (l) {
          color = lng.StageUtils.mergeColors(color, 0xffffffff, 1 - l);
        }

        if (d) {
          color = lng.StageUtils.mergeColors(color, 0xff000000, 1 - 0.15);
        }

        if (o) {
          color = this.calculateOpacity(color, 1 - o);
        }

        return color;
      }
    }, {
      key: "calculateOpacity",
      value: function calculateOpacity(c, p) {
        p = parseFloat(p);
        var r = (c / 65536 | 0) % 256;
        var g = (c / 256 | 0) % 256;
        var b = c % 256;
        var a = c / 16777216 | 0;
        a = a * (1 - p) | 0;
        return a * 16777216 + r * 65536 + g * 256 + b;
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {};
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {};
      }
    }, {
      key: "fillTeaser",
      get: function get() {
        return true;
      }
    }, {
      key: "backgroundImage",
      get: function get() {
        return null;
      }
    }, {
      key: "theme",
      get: function get() {
        return Object.assign({}, this.getColorScheme(), {
          logo: this.logo,
          coloredLogo: this.coloredLogo,
          backgroundImage: this.backgroundImage,
          fillTeaser: this.fillTeaser
        });
      }
    }, {
      key: "logo",
      get: function get() {
        return {};
      }
    }, {
      key: "coloredLogo",
      get: function get() {
        return false;
      }
    }]);

    return Theme;
  }();

  var Ard =
  /*#__PURE__*/
  function (_Theme) {
    _inherits(Ard, _Theme);

    function Ard() {
      _classCallCheck(this, Ard);

      return _possibleConstructorReturn(this, _getPrototypeOf(Ard).apply(this, arguments));
    }

    _createClass(Ard, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/ard.svg',
          width: 105
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff001a4b,
          c2: 0xff000e29,
          c3: 0xff082b7d,
          c4: 0xff0062ff,
          c5: 0xffffffff,
          c6: 0xffff6670,
          c7: 0xffe2e2e2,
          c8: 0xff000000,
          c9: 0xff000e26
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c5',
          textFocus: 'c5',
          focus: 'c4',
          background: 'c2',
          overlay: 'c1o0.8',
          slider: 'c4',
          loader: 'c4',
          globalShadow: 'c8o0.6',
          fade: 'c2o0.95',
          toolbar: {
            background: 'c1o0.8',
            line: 'c4',
            text: 'c5',
            shadow: 'c1o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c5'
          },
          teaser: {
            background: 'c2',
            headline: 'c5',
            subline: 'c5o0.78',
            icon: 'c5'
          },
          badge: {
            background: 'c4',
            text: 'c5'
          },
          shadow: {
            base: 'c8o0.6',
            gradientTop: 'c2o0',
            gradientBottom: 'c2o0.9',
            text: 'c5'
          },
          stage: {
            headline: 'c5',
            subline: 'c5o0.78',
            shadow: 'c1o0.8',
            bullet: 'c5o0.5',
            activeBullet: 'c4'
          },
          live: {
            background: 'c5o0.9',
            progress: 'c6',
            text: 'c5'
          },
          duration: {
            background: 'c1o0.8',
            text: 'c5'
          },
          glossary: {
            background: 'c4',
            text: 'c5'
          },
          search: {
            text: 'c1',
            input: 'c5',
            icon: 'c1',
            erase: 'c7',
            shadow: 'c8o0.5'
          },
          keyboard: {
            background: 'c1o0.8',
            key: 'c2'
          },
          navigationPanel: {
            background: 'c5',
            header: {
              background: 'c4',
              logo: 'c5',
              text: 'c5',
              userIcon: 'c4',
              userShadow: 'c8o0.3',
              userBackground: 'c5',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c5',
            text: 'c1',
            active: 'c4',
            footer: 'c1',
            seperator: 'c7'
          }
        };
      }
    }]);

    return Ard;
  }(Theme);

  var Alpha =
  /*#__PURE__*/
  function (_Theme2) {
    _inherits(Alpha, _Theme2);

    function Alpha() {
      _classCallCheck(this, Alpha);

      return _possibleConstructorReturn(this, _getPrototypeOf(Alpha).apply(this, arguments));
    }

    _createClass(Alpha, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/alpha.svg',
          width: 90
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xfff2f2f1,
          c2: 0xffc94e16,
          c3: 0xffee9c27,
          c4: 0xff262626,
          c5: 0xffe2e2e2,
          c6: 0xffffffff,
          c7: 0xff000e26
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c4',
          textFocus: 'c6',
          focus: 'c2',
          background: 'c1',
          overlay: 'c4o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c4o0.6',
          fade: 'c1o0.95',
          toolbar: {
            background: 'c2o0.8',
            line: 'c2',
            text: 'c6',
            shadow: 'c4o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c4'
          },
          teaser: {
            background: 'c1',
            headline: 'c4',
            subline: 'c4o0.78',
            icon: 'c4'
          },
          badge: {
            background: 'c2',
            text: 'c6'
          },
          shadow: {
            base: 'c4o0.6',
            gradientTop: 'c1o0',
            gradientBottom: 'c1o0.9',
            text: 'c4'
          },
          stage: {
            headline: 'c6',
            subline: 'c6o0.78',
            shadow: 'c4o0.8',
            bullet: 'c4o0.5',
            activeBullet: 'c2'
          },
          live: {
            background: 'c6o0.9',
            progress: 'c2',
            text: 'c6'
          },
          duration: {
            background: 'c4o0.8',
            text: 'c6'
          },
          glossary: {
            background: 'c4',
            text: 'c6'
          },
          search: {
            text: 'c4',
            input: 'c6',
            icon: 'c2',
            erase: 'c5',
            shadow: 'c4o0.5'
          },
          keyboard: {
            background: 'c1o0.8',
            key: 'c5'
          },
          navigationPanel: {
            background: 'c6',
            header: {
              background: 'c2',
              logo: 'c6',
              text: 'c6',
              userIcon: 'c3',
              userShadow: 'c4o0.3',
              userBackground: 'c6',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c6',
            text: 'c4',
            active: 'c2',
            footer: 'c4',
            seperator: 'c5'
          }
        };
      }
    }]);

    return Alpha;
  }(Theme);

  var BR =
  /*#__PURE__*/
  function (_Theme3) {
    _inherits(BR, _Theme3);

    function BR() {
      _classCallCheck(this, BR);

      return _possibleConstructorReturn(this, _getPrototypeOf(BR).apply(this, arguments));
    }

    _createClass(BR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/br.svg',
          width: 50
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xffEDECE8,
          c2: 0xff0082c6,
          c3: 0xff292d3b,
          c4: 0xffffb600,
          c5: 0xffffffff,
          c6: 0xff000000
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c5',
          textFocus: 'c5',
          focus: 'c2',
          background: 'c3',
          overlay: 'c3o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c6o0.6',
          fade: 'c1o0.95',
          toolbar: {
            background: 'c3o0.8',
            line: 'c2',
            text: 'c5',
            shadow: 'c6o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c5'
          },
          teaser: {
            background: 'c3',
            headline: 'c5',
            subline: 'c5',
            icon: 'c3'
          },
          badge: {
            background: 'c2',
            text: 'c5'
          },
          shadow: {
            base: 'c6o0.6',
            gradientTop: 'c1o0',
            gradientBottom: 'c1o0.95',
            text: 'c3'
          },
          stage: {
            headline: 'c5',
            subline: 'c5',
            shadow: 'c3o0.8',
            bullet: 'c5o0.5',
            activeBullet: 'c2'
          },
          live: {
            background: 'c5o0.9',
            progress: 'c4',
            text: 'c5'
          },
          duration: {
            background: 'c3o0.8',
            text: 'c5'
          },
          glossary: {
            background: 'c2',
            text: 'c1'
          },
          search: {
            text: 'c6',
            input: 'c5',
            icon: 'c2',
            erase: 'c1',
            shadow: 'c6o0.5'
          },
          keyboard: {
            background: 'c3o0.8',
            key: 'c3',
            keyText: 'c5'
          },
          navigationPanel: {
            background: 'c1',
            header: {
              background: 'c1',
              logo: 'c2',
              text: 'c3',
              userIcon: 'c2',
              userShadow: 'c6o0.3',
              userBackground: '54',
              border: 'c0',
              shadow: 'c6o0.4'
            },
            footerIcon: 'c5',
            text: 'c3',
            active: 'c2',
            footer: 'c3',
            seperator: 'c3'
          }
        };
      }
    }]);

    return BR;
  }(Theme);

  var DasErste =
  /*#__PURE__*/
  function (_Theme4) {
    _inherits(DasErste, _Theme4);

    function DasErste() {
      _classCallCheck(this, DasErste);

      return _possibleConstructorReturn(this, _getPrototypeOf(DasErste).apply(this, arguments));
    }

    _createClass(DasErste, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/daserste.svg',
          width: 98
        };
      }
    }, {
      key: "fillTeaser",
      get: function get() {
        return false;
      }
    }, {
      key: "backgroundImage",
      get: function get() {
        return 'images/dasersteBackground.png';
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff002c6b,
          c2: 0xff8999c9,
          c3: 0xff32f1f1,
          c4: 0xffffffff,
          c5: 0xffff6670,
          c6: 0xffe2e2e2,
          c7: 0xff001a4b,
          c8: 0xff002252
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c4',
          textFocus: 'c1',
          focus: 'c3',
          background: 'c1',
          overlay: 'c1o0.8',
          slider: 'c3',
          loader: 'c3',
          globalShadow: 'c7o0.6',
          fade: 'c1o0.95',
          toolbar: {
            background: 'c1o0.8',
            line: 'c3',
            text: 'c4',
            shadow: 'c7'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c4'
          },
          teaser: {
            background: 'c1',
            headline: 'c4',
            subline: 'c3',
            icon: 'c3'
          },
          badge: {
            background: 'c3',
            text: 'c1'
          },
          shadow: {
            base: 'c7o0.6',
            gradientTop: 'c1o0',
            gradientBottom: 'c1o0.8',
            text: 'c4'
          },
          stage: {
            headline: 'c4',
            subline: 'c3o0.78',
            shadow: 'c1o0.8',
            bullet: 'c4o0.5',
            activeBullet: 'c3'
          },
          live: {
            background: 'c4o0.9',
            progress: 'c5',
            text: 'c4'
          },
          duration: {
            background: 'c1o0.8',
            text: 'c4'
          },
          glossary: {
            background: 'c3',
            text: 'c1'
          },
          search: {
            text: 'c1',
            input: 'c4',
            icon: 'c2',
            erase: 'c6',
            shadow: 'c7o0.5'
          },
          keyboard: {
            background: 'c1o0.8',
            key: 'c8'
          },
          navigationPanel: {
            background: 'c4',
            header: {
              background: 'c1',
              logo: 'c4',
              text: 'c4',
              userIcon: 'c1',
              userShadow: 'c7o0.3',
              userBackground: 'c4',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c4',
            text: 'c1',
            active: 'c2',
            footer: 'c1',
            seperator: 'c6'
          }
        };
      }
    }]);

    return DasErste;
  }(Theme);

  var HR =
  /*#__PURE__*/
  function (_Theme5) {
    _inherits(HR, _Theme5);

    function HR() {
      _classCallCheck(this, HR);

      return _possibleConstructorReturn(this, _getPrototypeOf(HR).apply(this, arguments));
    }

    _createClass(HR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/hr.svg',
          width: 48
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff006eb7,
          c2: 0xff203a67,
          c3: 0xff668081,
          c4: 0xffe2e2e2,
          c5: 0xffffffff,
          c6: 0xff000000
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c6',
          textFocus: 'c5',
          focus: 'c2',
          background: 'c5',
          overlay: 'c5o0.8',
          slider: 'c1',
          loader: 'c3',
          globalShadow: 'c6o0.6',
          fade: 'c5o0.95',
          toolbar: {
            background: 'c1o0.8',
            line: 'c3',
            text: 'c5',
            shadow: 'c6o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c1'
          },
          teaser: {
            background: 'c5',
            headline: 'c6',
            subline: 'c6o0.78',
            icon: 'c6'
          },
          badge: {
            background: 'c3',
            text: 'c5'
          },
          shadow: {
            base: 'c7o0.6',
            gradientTop: 'c6o0',
            gradientBottom: 'c6o0.8',
            text: 'c7'
          },
          stage: {
            headline: 'c5',
            subline: 'c5o0.78',
            shadow: 'c3o0.8',
            bullet: 'c3o0.8',
            activeBullet: 'c1'
          },
          live: {
            background: 'c5',
            progress: 'c2',
            text: 'c5'
          },
          duration: {
            background: 'c1',
            text: 'c5'
          },
          glossary: {
            background: 'c2',
            text: 'c5'
          },
          search: {
            text: 'c6',
            input: 'c5',
            icon: 'c3',
            erase: 'c3',
            shadow: 'c7o0.5'
          },
          keyboard: {
            background: 'c5o0.8',
            key: 'c4'
          },
          navigationPanel: {
            background: 'c5',
            header: {
              background: 'c1',
              logo: 'c5',
              text: 'c5',
              userIcon: 'c1',
              userShadow: 'c7o0.3',
              userBackground: 'c1',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c5',
            text: 'c6',
            active: 'c1',
            footer: 'c1',
            seperator: 'c4'
          }
        };
      }
    }]);

    return HR;
  }(Theme);

  var MDR =
  /*#__PURE__*/
  function (_Theme6) {
    _inherits(MDR, _Theme6);

    function MDR() {
      _classCallCheck(this, MDR);

      return _possibleConstructorReturn(this, _getPrototypeOf(MDR).apply(this, arguments));
    }

    _createClass(MDR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/mdr.svg',
          width: 84
        };
      }
    }, {
      key: "backgroundImage",
      get: function get() {
        return 'images/mdrBackground.jpg';
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff00375f,
          c2: 0xff0062ae,
          c3: 0xff585858,
          c4: 0xffd94d94,
          c5: 0xffffffff,
          c6: 0xff000000,
          c7: 0xffe0d5c8
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c6',
          textFocus: 'c5',
          focus: 'c2',
          background: 'c7',
          overlay: 'c5o0.8',
          slider: 'c3',
          loader: 'c3',
          globalShadow: 'c6o0.6',
          fade: 'c2o0.95',
          toolbar: {
            background: 'c2o0.8',
            line: 'c5',
            text: 'c5',
            shadow: 'c1o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c5'
          },
          teaser: {
            background: 'c5',
            headline: 'c6',
            subline: 'c6o0.78',
            icon: 'c2'
          },
          badge: {
            background: 'c2',
            text: 'c6'
          },
          shadow: {
            base: 'c8o0.6',
            gradientTop: 'c1o0',
            gradientBottom: 'c1o0.8',
            text: 'c7'
          },
          stage: {
            headline: 'c5',
            subline: 'c5o0.78',
            shadow: 'c1o0.8',
            bullet: 'c5o0.5',
            activeBullet: 'c5'
          },
          live: {
            background: 'c5',
            progress: 'c4',
            text: 'c5'
          },
          duration: {
            background: 'c2o0.8',
            text: 'c5'
          },
          glossary: {
            background: 'c2',
            text: 'c5'
          },
          search: {
            text: 'c6',
            input: 'c5',
            icon: 'c2',
            erase: 'c2',
            shadow: 'c8o0.4'
          },
          keyboard: {
            background: 'c3o0.8',
            key: 'c3',
            keyText: 'c5'
          },
          navigationPanel: {
            background: 'c5',
            header: {
              background: 'c2',
              logo: 'c5',
              text: 'c5',
              userIcon: 'c2',
              userShadow: 'c8o0.3',
              userBackground: 'c2',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c5',
            text: 'c6',
            active: 'c2',
            footer: 'c3',
            seperator: 'c3'
          }
        };
      }
    }]);

    return MDR;
  }(Theme);

  var NDR =
  /*#__PURE__*/
  function (_Theme7) {
    _inherits(NDR, _Theme7);

    function NDR() {
      _classCallCheck(this, NDR);

      return _possibleConstructorReturn(this, _getPrototypeOf(NDR).apply(this, arguments));
    }

    _createClass(NDR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/ndr.svg',
          width: 68
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff2568b4,
          c2: 0xff2671c6,
          c3: 0xff0c1754,
          c4: 0xff1d5596,
          c5: 0xff09e5ff,
          c6: 0xffcddce9,
          c7: 0xffffffff,
          c8: 0xff000000
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c7',
          textFocus: 'c7',
          focus: 'c4',
          background: 'c1',
          overlay: 'c3o0.8',
          slider: 'c4',
          loader: 'c3',
          globalShadow: 'c8o0.6',
          fade: 'c1o0.95',
          toolbar: {
            background: 'c3o0.8',
            line: 'c1',
            text: 'c7',
            shadow: 'c3o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c7'
          },
          teaser: {
            background: 'c1',
            headline: 'c7',
            subline: 'c6o0.78',
            icon: 'c6'
          },
          badge: {
            background: 'c4',
            text: 'c7'
          },
          shadow: {
            base: 'c8o0.6',
            gradientTop: 'c1o0',
            gradientBottom: 'c1o0.8',
            text: 'c7'
          },
          stage: {
            headline: 'c7',
            subline: 'c6o0.78',
            shadow: 'c3o0.8',
            bullet: 'c7o0.8',
            activeBullet: 'c7'
          },
          live: {
            background: 'c7o0.9',
            progress: 'c5',
            text: 'c3'
          },
          duration: {
            background: 'c3o0.8',
            text: 'c7'
          },
          glossary: {
            background: 'c8',
            text: 'c3'
          },
          search: {
            text: 'c1',
            input: 'c7',
            icon: 'c1',
            erase: 'c6',
            shadow: 'c8o0.4'
          },
          keyboard: {
            background: 'c3o0.8',
            key: 'c3'
          },
          navigationPanel: {
            background: 'c7',
            header: {
              background: 'c3',
              logo: 'c7',
              text: 'c7',
              userIcon: 'c1',
              userShadow: 'c8o0.3',
              userBackground: 'c7',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c7',
            text: 'c3',
            active: 'c1',
            footer: 'c3',
            seperator: 'c6'
          }
        };
      }
    }]);

    return NDR;
  }(Theme);

  var One =
  /*#__PURE__*/
  function (_Theme8) {
    _inherits(One, _Theme8);

    function One() {
      _classCallCheck(this, One);

      return _possibleConstructorReturn(this, _getPrototypeOf(One).apply(this, arguments));
    }

    _createClass(One, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/one.svg',
          width: 96
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xfff4357a,
          c2: 0xff7100a6,
          c3: 0xfffbe426,
          c4: 0xffe2e2e2,
          c5: 0xffffffff,
          c6: 0xff333333,
          c7: 0xff000000
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c7',
          textFocus: 'c5',
          focus: 'c1',
          background: 'c3',
          overlay: 'c6o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c6o0.6',
          fade: 'c3o0.95',
          toolbar: {
            background: 'c2o0.8',
            line: 'c1',
            text: 'c5',
            shadow: 'c6o0.8'
          },
          moduleTitle: {
            background: 'c2',
            text: 'c5'
          },
          teaser: {
            background: 'c5',
            headline: 'c7',
            subline: 'c2',
            icon: 'c2'
          },
          badge: {
            background: 'c1',
            text: 'c5'
          },
          shadow: {
            base: 'c6o0.6',
            gradientTop: 'c6o0',
            gradientBottom: 'c6o0.8',
            text: 'c5'
          },
          stage: {
            headline: 'c5',
            subline: 'c5',
            shadow: 'c6o0.8',
            bullet: 'c7o0.8',
            activeBullet: 'c2'
          },
          live: {
            background: 'c5o0.5',
            progress: 'c1',
            text: 'c5'
          },
          duration: {
            background: 'c2',
            text: 'c5'
          },
          glossary: {
            background: 'c2',
            text: 'c5'
          },
          search: {
            text: 'c7',
            input: 'c5',
            icon: 'c2',
            erase: 'c4',
            shadow: 'c7o0.5'
          },
          keyboard: {
            background: 'c2o0.8',
            key: 'c2',
            keyText: 'c5'
          },
          navigationPanel: {
            background: 'c5',
            header: {
              background: 'c3',
              logo: 'c2',
              text: 'c7',
              userIcon: 'c1',
              userShadow: 'c7o0.3',
              userBackground: 'c5',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c5',
            text: 'c7',
            active: 'c2',
            footer: 'c6',
            seperator: 'c4'
          }
        };
      }
    }]);

    return One;
  }(Theme);

  var RB =
  /*#__PURE__*/
  function (_Theme9) {
    _inherits(RB, _Theme9);

    function RB() {
      _classCallCheck(this, RB);

      return _possibleConstructorReturn(this, _getPrototypeOf(RB).apply(this, arguments));
    }

    _createClass(RB, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/radiobremen.svg',
          width: 152
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xfff0f0f0,
          c2: 0xffc51015,
          c3: 0xff404040,
          c4: 0xffffffff,
          c5: 0xff000000
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c5',
          textFocus: 'c4',
          focus: 'c2',
          background: 'c4',
          overlay: 'c3o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c5o0.6',
          fade: 'c4o0.95',
          toolbar: {
            background: 'c2o0.8',
            line: 'c2',
            text: 'c4',
            shadow: 'c3o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c5'
          },
          teaser: {
            background: 'c4',
            headline: 'c5',
            subline: 'c2',
            icon: 'c2'
          },
          badge: {
            background: 'c2',
            text: 'c4'
          },
          shadow: {
            base: 'c5o0.6',
            gradientTop: 'c3o0',
            gradientBottom: 'c3o0.8',
            text: 'c4'
          },
          stage: {
            headline: 'c4',
            subline: 'c4o0.78',
            shadow: 'c3o0.8',
            bullet: 'c5o0.8',
            activeBullet: 'c2'
          },
          live: {
            background: 'c4o0.5',
            progress: 'c2',
            text: 'c4'
          },
          duration: {
            background: 'c2',
            text: 'c4'
          },
          glossary: {
            background: 'c2',
            text: 'c4'
          },
          search: {
            text: 'c5',
            input: 'c4',
            icon: 'c2',
            erase: 'c1d0.4',
            shadow: 'c5o0.5'
          },
          keyboard: {
            background: 'c4o0.8',
            key: 'c1'
          },
          navigationPanel: {
            background: 'c4',
            header: {
              background: 'c2',
              logo: 'c4',
              text: 'c4',
              userIcon: 'c2',
              userShadow: 'c3o0.3',
              userBackground: 'c4',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c4',
            text: 'c5',
            active: 'c2',
            footer: 'c3',
            seperator: 'c1'
          }
        };
      }
    }]);

    return RB;
  }(Theme);

  var RBB =
  /*#__PURE__*/
  function (_Theme10) {
    _inherits(RBB, _Theme10);

    function RBB() {
      _classCallCheck(this, RBB);

      return _possibleConstructorReturn(this, _getPrototypeOf(RBB).apply(this, arguments));
    }

    _createClass(RBB, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/rbb.svg',
          width: 70
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff585856,
          c2: 0xff737373,
          c3: 0xff40403e,
          c4: 0xffe31818,
          c5: 0xffa01817,
          c6: 0xffffffff,
          c7: 0xffe2e2e2,
          c8: 0xff262626
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c6',
          textFocus: 'c6',
          focus: 'c4',
          background: 'c5',
          overlay: 'c8o0.8',
          slider: 'c4',
          loader: 'c6',
          globalShadow: 'c8o0.8',
          fade: 'c5o0.95',
          toolbar: {
            background: 'c1o0.8',
            line: 'c1',
            text: 'c6',
            shadow: 'c8o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c6'
          },
          teaser: {
            background: 'c6',
            headline: 'c4',
            subline: 'c1',
            icon: 'c1'
          },
          badge: {
            background: 'c6',
            text: 'c4'
          },
          shadow: {
            base: 'c4o0.6',
            gradientTop: 'c8o0',
            gradientBottom: 'c8o0.8',
            text: 'c6'
          },
          stage: {
            headline: 'c6',
            subline: 'c6o0.78',
            shadow: 'c8o0.8',
            bullet: 'c6o0.8',
            activeBullet: 'c6'
          },
          live: {
            background: 'c6o0.5',
            progress: 'c4',
            text: 'c6'
          },
          duration: {
            background: 'c4',
            text: 'c6'
          },
          glossary: {
            background: 'c4',
            text: 'c4'
          },
          search: {
            text: 'c1',
            input: 'c6',
            icon: 'c4',
            erase: 'c7',
            shadow: 'c4o0.5d0.3'
          },
          keyboard: {
            background: 'c1o0.8',
            key: 'c1'
          },
          navigationPanel: {
            background: 'c6',
            header: {
              background: 'c5',
              logo: 'c6',
              text: 'c6',
              userIcon: 'c5',
              userShadow: 'c8o0.3',
              userBackground: 'c6',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c6',
            text: 'c1',
            active: 'c2',
            footer: 'c1',
            seperator: 'c7'
          }
        };
      }
    }]);

    return RBB;
  }(Theme);

  var SR =
  /*#__PURE__*/
  function (_Theme11) {
    _inherits(SR, _Theme11);

    function SR() {
      _classCallCheck(this, SR);

      return _possibleConstructorReturn(this, _getPrototypeOf(SR).apply(this, arguments));
    }

    _createClass(SR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/sr.svg',
          width: 52
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff004295,
          c2: 0xff5471dd,
          c3: 0xff020734,
          c4: 0xfff1f1f1,
          c5: 0xffff6670,
          c6: 0xffffffff,
          c7: 0xff000000
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c3',
          textFocus: 'c6',
          focus: 'c2',
          background: 'c4',
          overlay: 'c3o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c7o0.8',
          fade: 'c4o0.95',
          toolbar: {
            background: 'c1o0.8',
            line: 'c2',
            text: 'c6',
            shadow: 'c8o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c3'
          },
          teaser: {
            background: 'c4',
            headline: 'c3',
            subline: 'c3o0.78',
            icon: 'c3'
          },
          badge: {
            background: 'c2',
            text: 'c6'
          },
          shadow: {
            base: 'c7o0.6',
            gradientTop: 'c4o0',
            gradientBottom: 'c4o0.8',
            text: 'c3'
          },
          stage: {
            headline: 'c6',
            subline: 'c6o0.78',
            shadow: 'c3o0.8',
            bullet: 'c3o0.8',
            activeBullet: 'c2'
          },
          live: {
            background: 'c6o0.5',
            progress: 'c5',
            text: 'c6'
          },
          duration: {
            background: 'c4o0.8',
            text: 'c3'
          },
          glossary: {
            background: 'c2',
            text: 'c6'
          },
          search: {
            text: 'c3',
            input: 'c6',
            icon: 'c2',
            erase: 'c4',
            shadow: 'c7o0.5'
          },
          keyboard: {
            background: 'c6o0.8',
            key: 'c4'
          },
          navigationPanel: {
            background: 'c6',
            header: {
              background: 'c2',
              logo: 'c6',
              text: 'c6',
              userIcon: 'c2',
              userShadow: 'c7o0.3',
              userBackground: 'c6',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c6',
            text: 'c3',
            active: 'c2',
            footer: 'c3',
            seperator: 'c4'
          }
        };
      }
    }]);

    return SR;
  }(Theme);

  var SWR =
  /*#__PURE__*/
  function (_Theme12) {
    _inherits(SWR, _Theme12);

    function SWR() {
      _classCallCheck(this, SWR);

      return _possibleConstructorReturn(this, _getPrototypeOf(SWR).apply(this, arguments));
    }

    _createClass(SWR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/swr.svg',
          width: 96
        };
      }
    }, {
      key: "coloredLogo",
      get: function get() {
        return {
          src: 'icons/channels/swrColored.svg',
          width: 96
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff666666,
          c2: 0xff0ca4d1,
          c3: 0xff0062a9,
          c4: 0xff333333,
          c5: 0xff494949,
          c6: 0xffd8d8d8,
          c7: 0xffe94f35,
          c8: 0xffffffff,
          c9: 0xff000000,
          c10: 0xffededed,
          c11: 0xff0f89ad
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c1',
          textFocus: 'c8',
          focus: 'c2',
          background: 'c10',
          overlay: 'c9o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c4o0.6',
          fade: 'c8o0.95',
          toolbar: {
            background: 'c1o0.8',
            line: 'c8',
            text: 'c8',
            shadow: 'c0'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c5'
          },
          teaser: {
            background: 'c8',
            headline: 'c11',
            subline: 'c1',
            icon: 'c5'
          },
          badge: {
            background: 'c2',
            text: 'c8'
          },
          shadow: {
            base: 'c0',
            gradientTop: 'c9o0.55',
            gradientBottom: 'c9o0.8',
            text: 'c8'
          },
          stage: {
            headline: 'c8',
            subline: 'c8o0.78',
            shadow: 'c4o0.8',
            bullet: 'c5o0.8',
            activeBullet: 'c2'
          },
          live: {
            background: 'c8o0.5',
            progress: 'c7',
            text: 'c8'
          },
          duration: {
            background: 'c2o0.8',
            text: 'c8'
          },
          glossary: {
            background: 'c2',
            text: 'c8'
          },
          search: {
            text: 'c5',
            input: 'c8',
            icon: 'c2',
            erase: 'c4l0.5',
            shadow: 'c0'
          },
          keyboard: {
            background: 'c8o0.8',
            key: 'c6'
          },
          navigationPanel: {
            background: 'c10',
            header: {
              background: 'c8',
              logo: 'c8',
              text: 'c5',
              userIcon: 'c5',
              userShadow: 'c0',
              userBackground: 'c5',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c8',
            text: 'c1',
            active: 'c2',
            footer: 'c3',
            seperator: 'c4l0.75'
          }
        };
      }
    }]);

    return SWR;
  }(Theme);

  var WDR =
  /*#__PURE__*/
  function (_Theme13) {
    _inherits(WDR, _Theme13);

    function WDR() {
      _classCallCheck(this, WDR);

      return _possibleConstructorReturn(this, _getPrototypeOf(WDR).apply(this, arguments));
    }

    _createClass(WDR, [{
      key: "logo",
      get: function get() {
        return {
          src: 'icons/channels/wdr.svg',
          width: 80
        };
      }
    }, {
      key: "baseColors",
      get: function get() {
        return {
          c0: false,
          c1: 0xff19335d,
          c2: 0xffd39413,
          c3: 0xff00335e,
          c4: 0xffbe0000,
          c5: 0xffffffff,
          c6: 0xff000000,
          c7: 0xff002545
        };
      }
    }, {
      key: "colorSheet",
      get: function get() {
        return {
          text: 'c5',
          textFocus: 'c5',
          focus: 'c2',
          background: 'c3',
          overlay: 'c3o0.8',
          slider: 'c2',
          loader: 'c2',
          globalShadow: 'c6o0.8',
          fade: 'c3o0.95',
          toolbar: {
            background: 'c3o0.8',
            line: 'c2',
            text: 'c5',
            shadow: 'c3o0.8'
          },
          moduleTitle: {
            background: 'c0',
            text: 'c5'
          },
          teaser: {
            background: 'c3',
            headline: 'c5',
            subline: 'c5o0.78',
            icon: 'c6'
          },
          badge: {
            background: 'c2',
            text: 'c6'
          },
          shadow: {
            base: 'c7o0.6',
            gradientTop: 'c3o0',
            gradientBottom: 'c3o0.8',
            text: 'c6'
          },
          stage: {
            headline: 'c5',
            subline: 'c5o0.78',
            shadow: 'c3o0.8',
            bullet: 'c5o0.8',
            activeBullet: 'c2'
          },
          live: {
            background: 'c5o0.5',
            progress: 'c4',
            text: 'c6'
          },
          duration: {
            background: 'c3o0.8',
            text: 'c5'
          },
          glossary: {
            background: 'c2',
            text: 'c5'
          },
          search: {
            text: 'c1',
            input: 'c5',
            icon: 'c1',
            erase: 'c7l0.5',
            shadow: 'c7'
          },
          keyboard: {
            background: 'c3o0.8',
            key: 'c7'
          },
          navigationPanel: {
            background: 'c5',
            header: {
              background: 'c3',
              logo: 'c5',
              text: 'c5',
              userIcon: 'c3',
              userShadow: 'c7o0.3',
              userBackground: 'c3',
              border: 'c0',
              shadow: 'c0'
            },
            footerIcon: 'c5',
            text: 'c6',
            active: 'c2',
            footer: 'c3',
            seperator: 'c6l0.75'
          }
        };
      }
    }]);

    return WDR;
  }(Theme);

  var ThemeManager =
  /*#__PURE__*/
  function (_lng$EventEmitter2) {
    _inherits(ThemeManager, _lng$EventEmitter2);

    function ThemeManager() {
      _classCallCheck(this, ThemeManager);

      return _possibleConstructorReturn(this, _getPrototypeOf(ThemeManager).call(this));
    }

    _createClass(ThemeManager, [{
      key: "getChannelTheme",
      value: function getChannelTheme(str) {
        switch (str) {
          case 'ard':
            return new Ard();

          case 'alpha':
            return new Alpha();

          case 'br':
            return new BR();

          case 'daserste':
            return new DasErste();

          case 'hr':
            return new HR();

          case 'mdr':
            return new MDR();

          case 'ndr':
            return new NDR();

          case 'one':
            return new One();

          case 'rb':
            return new RB();

          case 'rbb':
            return new RBB();

          case 'sr':
            return new SR();

          case 'swr':
            return new SWR();

          case 'wdr':
            return new WDR();
        }
      }
    }, {
      key: "currentProfile",
      get: function get() {
        return this._cp;
      },
      set: function set(str) {
        str = str.toLowerCase();

        if (str === 'alle') {
          str = 'ard';
        }

        if (this.theme && this.theme.id && this.theme.id === str) {
          return;
        }

        var channel = this.getChannelTheme(str);
        var theme = channel.theme;
        theme.id = str;
        this.theme = theme;
        this._cp = str;
        this.emit('themeChanged', theme);
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._theme = theme;
      },
      get: function get() {
        return this._theme;
      }
    }]);

    return ThemeManager;
  }(lng.EventEmitter);

  var Loader =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(Loader, _lng$Component);

    function Loader() {
      _classCallCheck(this, Loader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
      key: "show",
      value: function show() {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.setSmooth('alpha', 1);
        this.loadAnimation = this.animation({
          duration: 1.4,
          delay: delay,
          repeat: -1,
          stopMethod: 'immediate',
          actions: [{
            t: 'Circle1',
            p: 'alpha',
            v: {
              0: 1,
              0.8: 0
            }
          }, {
            t: 'Circle1',
            p: 'scale',
            v: {
              0: 0,
              0.8: 1
            }
          }, {
            t: 'Circle2',
            p: 'alpha',
            v: {
              0.1: 1,
              0.9: 0
            }
          }, {
            t: 'Circle2',
            p: 'scale',
            v: {
              0.1: 0,
              0.9: 1
            }
          }, {
            t: 'Circle3',
            p: 'alpha',
            v: {
              0.2: 1,
              1: 0
            }
          }, {
            t: 'Circle3',
            p: 'scale',
            v: {
              0.2: 0,
              1: 1
            }
          }]
        });
        this.loadAnimation.start();
      }
    }, {
      key: "hide",
      value: function hide() {
        this.setSmooth('alpha', 0);
        this.loadAnimation.stop();
      }
    }, {
      key: "theme",
      set: function set(_ref3) {
        var color = _ref3.stage.activeBullet;
        this.patch({
          Circle1: {
            Shader: {
              Background: {
                color: color
              }
            }
          },
          Circle2: {
            Shader: {
              Background: {
                color: color
              }
            }
          },
          Circle3: {
            Shader: {
              Background: {
                color: color
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
          x: 960,
          y: 540,
          w: 80,
          h: 80,
          mountX: 0.5,
          mountY: 0.5,
          transitions: {
            alpha: {
              duration: 0.5
            }
          },
          Circle1: {
            x: 40,
            y: 40,
            w: 80,
            h: 80,
            mountX: 0.5,
            mountY: 0.5,
            renderToTexture: true,
            Shader: {
              mount: 0.5,
              shader: {
                type: lng.shaders.RadialFilter,
                cutoff: 1,
                radius: 40
              },
              Background: {
                w: 80,
                h: 80,
                rect: true,
                color: 0xffffffff
              }
            }
          },
          Circle2: {
            x: 40,
            y: 40,
            w: 80,
            h: 80,
            mountX: 0.5,
            mountY: 0.5,
            renderToTexture: true,
            Shader: {
              mount: 0.5,
              shader: {
                type: lng.shaders.RadialFilter,
                cutoff: 1,
                radius: 40
              },
              Background: {
                w: 80,
                h: 80,
                rect: true,
                color: 0xffffffff
              }
            }
          },
          Circle3: {
            x: 40,
            y: 40,
            w: 80,
            h: 80,
            mountX: 0.5,
            mountY: 0.5,
            renderToTexture: true,
            Shader: {
              mount: 0.5,
              shader: {
                type: lng.shaders.RadialFilter,
                cutoff: 1,
                radius: 40
              },
              Background: {
                w: 80,
                h: 80,
                rect: true,
                color: 0xffffffff
              }
            }
          }
        };
      }
    }]);

    return Loader;
  }(lng.Component);

  var IconItem =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(IconItem, _lng$Component2);

    function IconItem() {
      _classCallCheck(this, IconItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(IconItem).apply(this, arguments));
    }

    _createClass(IconItem, [{
      key: "maxWidth",
      set: function set(v) {
        this._maxWidth = v;
      },
      get: function get() {
        return this._maxWidth || 0;
      }
    }, {
      key: "icon",
      set: function set(_ref4) {
        var src = _ref4.src,
            w = _ref4.w,
            h = _ref4.h,
            _ref4$color = _ref4.color,
            color = _ref4$color === void 0 ? 0xffffffff : _ref4$color;

        if (!src) {
          return;
        }

        if (this.maxWidth && w > this.maxWidth) {
          var scale = this.maxWidth / w;
          w = this.maxWidth;
          h = h * scale;
        }

        this.patch({
          color: color,
          w: w,
          h: h,
          texture: lng.Tools.getSvgTexture(AppDefinition.getPath(src), w, h)
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {};
      }
    }]);

    return IconItem;
  }(lng.Component);

  var ArdNavigationOptionItem =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(ArdNavigationOptionItem, _lng$Component3);

    function ArdNavigationOptionItem() {
      _classCallCheck(this, ArdNavigationOptionItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ArdNavigationOptionItem).apply(this, arguments));
    }

    _createClass(ArdNavigationOptionItem, [{
      key: "theme",
      set: function set(theme) {
        this.tag('Wrapper').patch({
          Focus: {
            smooth: {
              color: theme.focus
            }
          },
          Icon: {
            smooth: {
              color: theme.toolbar.text
            }
          }
        });
        this._fc = {
          label: theme.toolbar.text,
          labelFocus: theme.textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 105,
          w: 105,
          Wrapper: {
            h: 105,
            w: 105,
            Focus: {
              alpha: 0,
              y: 105,
              mountY: 1,
              h: 1,
              w: 105,
              color: 0xffffffff,
              rect: true
            },
            Icon: {
              x: 52,
              y: 52,
              mount: 0.5,
              type: IconItem
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this$icon = this.icon,
                _this$icon$w = _this$icon.w,
                iconWidth = _this$icon$w === void 0 ? 48 * 2 : _this$icon$w,
                _this$icon$h = _this$icon.h,
                iconHeight = _this$icon$h === void 0 ? 48 * 2 : _this$icon$h,
                src = _this$icon.src;
            this.patch({
              Wrapper: {
                Icon: {
                  y: this.icon.y || 52,
                  icon: {
                    src: src,
                    w: iconWidth,
                    h: iconHeight
                  }
                }
              }
            });
          },
          _focus: function _focus() {
            this.tag('Wrapper').patch({
              Focus: {
                smooth: {
                  h: 105,
                  alpha: 1
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.labelFocus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.tag('Wrapper').patch({
              Focus: {
                smooth: {
                  h: 1,
                  alpha: 0
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.label
                }
              }
            });
          }
        };
      }
    }]);

    return ArdNavigationOptionItem;
  }(lng.Component);

  var ChannelLogo =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(ChannelLogo, _lng$Component4);

    function ChannelLogo() {
      _classCallCheck(this, ChannelLogo);

      return _possibleConstructorReturn(this, _getPrototypeOf(ChannelLogo).apply(this, arguments));
    }

    _createClass(ChannelLogo, [{
      key: "calcWidth",
      value: function calcWidth() {
        var arrow = this.tag('Arrow');
        var w = arrow.x + arrow.w + 15;
        var mount = (30 + this.tag('Logo').w / 2) / w;
        this.patch({
          // mountX: 1 - mount,
          w: w,
          Focus: {
            w: w
          }
        });
      }
    }, {
      key: "logo",
      set: function set(obj) {
        this.tag('Logo').setSmooth('alpha', 0);
        this._l = obj;
      },
      get: function get() {
        return this._l;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Focus: {
            smooth: {
              color: theme.focus
            }
          },
          Logo: {
            smooth: {
              color: theme.toolbar.text
            }
          },
          Arrow: {
            smooth: {
              color: theme.toolbar.text
            }
          }
        });
        this._fc = {
          label: theme.toolbar.text,
          labelFocus: theme.textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Focus: {
            alpha: 0,
            y: 120,
            mountY: 1,
            h: 120,
            color: 0xff0000ff,
            rect: true
          },
          Logo: {
            x: 30,
            y: 20,
            type: IconItem
          },
          Arrow: {
            type: IconItem,
            y: 20,
            icon: {
              src: 'icons/ui/arrowDown.svg',
              w: 48 * 1.7,
              h: 48 * 1.7
            },
            transitions: {
              rotation: {
                duration: 0.5
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this9 = this;

            var logo = this.tag('Logo');
            logo.transition('alpha').on('finish', function () {
              if (logo.alpha === 0 && _this9.logo) {
                var _this9$logo = _this9.logo,
                    src = _this9$logo.src,
                    width = _this9$logo.width;

                _this9.patch({
                  Logo: {
                    alpha: 1,
                    icon: {
                      src: src,
                      w: width * 1.7,
                      h: 48 * 1.7
                    }
                  },
                  Arrow: {
                    smooth: {
                      x: width * 1.7 + 30
                    }
                  }
                });
              }
            });
            logo.on('txLoaded', function () {
              _this9.calcWidth();

              _this9.logoAnimation.start();
            });
            this.logoAnimation = logo.animation({
              duration: 0.5,
              actions: [{
                p: 'y',
                v: {
                  0: 0,
                  0.4: 25,
                  0.6: 10,
                  0.8: 21,
                  1: 20
                }
              }]
            });
            this.logoAnimation.on('finish', function () {
              _this9.signal('logoAnimationFinished');
            });
          },
          _focus: function _focus() {
            this.patch({
              Focus: {
                smooth: {
                  h: 120,
                  alpha: 1
                }
              },
              Logo: {
                smooth: {
                  color: this._fc.labelFocus
                }
              },
              Arrow: {
                smooth: {
                  color: this._fc.labelFocus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Focus: {
                smooth: {
                  h: 1,
                  alpha: 0
                }
              },
              Logo: {
                smooth: {
                  color: this._fc.label
                }
              },
              Arrow: {
                smooth: {
                  color: this._fc.label
                }
              }
            });
          },
          showArrow: function showArrow() {
            this.tag('Arrow').setSmooth('alpha', 1);
          },
          arrowUp: function arrowUp() {
            this.tag('Arrow').setSmooth('rotation', Math.PI);
          },
          arrowDown: function arrowDown() {
            this.tag('Arrow').setSmooth('rotation', 0);
          }
        };
      }
    }]);

    return ChannelLogo;
  }(lng.Component);

  var ChannelBarItem =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(ChannelBarItem, _lng$Component5);

    function ChannelBarItem() {
      _classCallCheck(this, ChannelBarItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ChannelBarItem).apply(this, arguments));
    }

    _createClass(ChannelBarItem, [{
      key: "item",
      set: function set(obj) {
        this._item = obj;
      },
      get: function get() {
        return this._item;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.tag('Wrapper').patch({
          Focus: {
            smooth: {
              color: theme.focus
            }
          },
          Label: {
            smooth: {
              color: theme.toolbar.text
            }
          }
        });
        this._fc = {
          label: theme.toolbar.text,
          labelFocus: theme.textFocus
        };
      }
    }, {
      key: "label",
      set: function set(str) {
        this.tag('Label').patch({
          text: {
            text: str
          }
        });
      }
    }, {
      key: "totalWidth",
      get: function get() {
        return this._tw;
      },
      set: function set(int) {
        this.tag('Focus').w = int;
        this._tw = int;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            h: 105,
            Focus: {
              alpha: 0,
              y: 130,
              mountY: 1,
              h: 1,
              color: 0xffffffff,
              rect: true
            },
            Label: {
              y: 75,
              x: 16,
              mountX: 0,
              mountY: 0.5,
              pivotX: 0,
              text: {
                text: 'TEST',
                fontFace: 'TheSansB4',
                fontSize: 30
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this10 = this;

            this.padding = 16;
            var label = this.tag('Label');

            label.onAfterUpdate = function () {
              _this10.totalWidth = _this10.padding * 2 + label.renderWidth * label.scale;
            };

            label.text.text = this.item.label;
          },
          _focus: function _focus() {
            this.tag('Wrapper').patch({
              Focus: {
                smooth: {
                  h: 105,
                  alpha: 1
                }
              },
              Label: {
                smooth: {
                  color: this._fc.labelFocus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.tag('Wrapper').patch({
              Focus: {
                smooth: {
                  h: 1,
                  alpha: 0
                }
              },
              Label: {
                smooth: {
                  color: this._fc.label
                }
              }
            });
          },
          selected: function selected() {
            this.tag('Label').setSmooth('scale', 1.3);
          },
          unselected: function unselected() {
            this.tag('Label').setSmooth('scale', 1);
          }
        };
      }
    }]);

    return ChannelBarItem;
  }(lng.Component);

  var ItemList =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(ItemList, _lng$Component6);

    function ItemList() {
      _classCallCheck(this, ItemList);

      return _possibleConstructorReturn(this, _getPrototypeOf(ItemList).apply(this, arguments));
    }

    _createClass(ItemList, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.item;
      }
    }, {
      key: "navigate",
      value: function navigate(dir) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
        var absolute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var target = absolute ? dir : this.index + dir;

        if (o === this.orientation && target > -1 && target < this.length) {
          return this.index = target;
        }

        return false;
      }
    }, {
      key: "length",
      get: function get() {
        return this.tag('Items').children.length;
      }
    }, {
      key: "items",
      set: function set(list) {
        this.tag('Items').children = list;
        this._index = 0;
      },
      get: function get() {
        return this.tag('Items').children;
      }
    }, {
      key: "item",
      get: function get() {
        return this.tag('Items').children[this._index];
      }
    }, {
      key: "index",
      get: function get() {
        return this._index || 0;
      },
      set: function set(v) {
        this.fire('indexChanged', {
          index: v,
          previousIndex: this.index
        });
        this._index = v;
      }
    }, {
      key: "orientation",
      set: function set(o) {
        this._orientation = o;
      },
      get: function get() {
        return this._orientation || 'horizontal';
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
        return {
          _init: function _init() {
            this.index = 0;
          },
          _handleUp: function _handleUp() {
            return this.navigate(-1, 'vertical');
          },
          _handleDown: function _handleDown() {
            return this.navigate(1, 'vertical');
          },
          _handleLeft: function _handleLeft() {
            return this.navigate(-1, 'horizontal');
          },
          _handleRight: function _handleRight() {
            return this.navigate(1, 'horizontal');
          },
          indexChanged: function indexChanged(e) {
            this.signal('indexChanged', e);
          }
        };
      }
    }]);

    return ItemList;
  }(lng.Component);

  var ChannelBar =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(ChannelBar, _lng$Component7);

    function ChannelBar() {
      _classCallCheck(this, ChannelBar);

      return _possibleConstructorReturn(this, _getPrototypeOf(ChannelBar).apply(this, arguments));
    }

    _createClass(ChannelBar, [{
      key: "reposition",
      value: function reposition() {
        var channels = this.tag('List');
        var totalWidth = 0;
        channels.items.forEach(function (item) {
          item.x = totalWidth;
          totalWidth += item.totalWidth;
        });
        channels.x = (1920 - totalWidth) / 2;
        var current = this.selectedChannelItem;
        this.tag('Selected').patch({
          x: channels.x + current.x,
          w: current.totalWidth
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('List');
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.tag('Selected').color = theme.toolbar.text;
        this.tag('List').items.forEach(function (item) {
          item.theme = theme;
        });
      }
    }, {
      key: "selectedChannelItem",
      get: function get() {
        return this.tag('List').items[this._selectedIndex];
      }
    }, {
      key: "focusedChannelItem",
      get: function get() {
        return this.tag('List').item;
      }
    }, {
      key: "index",
      get: function get() {
        return this.tag('List').index;
      },
      set: function set(v) {
        this.tag('List').index = v;
      }
    }, {
      key: "length",
      get: function get() {
        return this.tag('List').length;
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        return this._selectedIndex;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 130,
          w: 1920,
          List: {
            alpha: 1,
            y: 0,
            type: ItemList
          },
          Selected: {
            zIndex: 2,
            h: 4,
            y: 126,
            color: 0xffffffff,
            rect: true
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this11 = this;

            var list = this.tag('List');
            var items = [{
              id: 'alle',
              label: 'Alle'
            }, {
              id: 'daserste',
              label: 'Das Erste'
            }, {
              id: 'br',
              label: 'BR'
            }, {
              id: 'hr',
              label: 'HR'
            }, {
              id: 'mdr',
              label: 'MDR'
            }, {
              id: 'ndr',
              label: 'NDR'
            }, {
              id: 'rb',
              label: 'Radio Bremen'
            }, {
              id: 'rbb',
              label: 'RBB'
            }, {
              id: 'sr',
              label: 'SR'
            }, {
              id: 'swr',
              label: 'SWR'
            }, {
              id: 'wdr',
              label: 'WDR'
            }, {
              id: 'one',
              label: 'ONE'
            }, {
              id: 'alpha',
              label: 'ARD-alpha'
            }];
            list.items = items.map(function (item) {
              return {
                ref: item.label,
                type: ChannelBarItem,
                item: item
              };
            });

            list.onAfterUpdate = function () {
              return _this11.reposition();
            };

            this._selectedIndex = 0;
            this.focusedChannelItem.fire('selected');
          },
          _unfocus: function _unfocus() {
            this.index = this._selectedIndex;
          },
          _handleEnter: function _handleEnter() {
            if (this._selectedIndex !== this.index) {
              this.selectedChannelItem.fire('unselected');
              this.focusedChannelItem.fire('selected');
              this._selectedIndex = this.index;
            }

            return false;
          }
        };
      }
    }]);

    return ChannelBar;
  }(lng.Component);

  var Toolbar =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(Toolbar, _lng$Component8);

    function Toolbar() {
      _classCallCheck(this, Toolbar);

      return _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).apply(this, arguments));
    }

    _createClass(Toolbar, [{
      key: "hideChannels",
      value: function hideChannels() {
        this.channelsVisible = false;
        this.tag('ChannelLogo').fire('arrowDown');
        this.patch({
          Shadow: {
            transitions: {
              y: {
                delay: 0.15
              }
            },
            smooth: {
              y: 144
            }
          },
          Wrapper: {
            smooth: {
              transitions: {
                h: {
                  delay: 0.15
                }
              },
              smooth: {
                h: 146
              }
            },
            Background: {
              transitions: {
                h: {
                  delay: 0.15
                }
              },
              smooth: {
                h: 146
              }
            },
            Channels: {
              transitions: {
                alpha: {
                  delay: 0
                }
              },
              smooth: {
                alpha: 0
              }
            },
            BottomLine: {
              transitions: {
                y: {
                  delay: 0.15
                }
              },
              smooth: {
                y: 142
              }
            }
          }
        });
      }
    }, {
      key: "showChannels",
      value: function showChannels() {
        this.channelsVisible = true;
        this.tag('ChannelLogo').fire('arrowUp');
        this.patch({
          Shadow: {
            transitions: {
              y: {
                delay: 0
              }
            },
            smooth: {
              y: 250
            }
          },
          Wrapper: {
            smooth: {
              transitions: {
                h: {
                  delay: 0
                }
              },
              smooth: {
                h: 252
              }
            },
            Background: {
              transitions: {
                h: {
                  delay: 0
                }
              },
              smooth: {
                h: 252
              }
            },
            Channels: {
              transitions: {
                alpha: {
                  delay: 0.15
                }
              },
              smooth: {
                alpha: 1
              }
            },
            BottomLine: {
              transitions: {
                y: {
                  delay: 0
                }
              },
              smooth: {
                y: 248
              }
            }
          }
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        this.patch({
          smooth: {
            alpha: 0,
            y: -160
          }
        });
      }
    }, {
      key: "show",
      value: function show() {
        this.patch({
          smooth: {
            alpha: 1,
            y: 0
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.state && this.tag(this.state)) {
          return this.tag(this.state);
        }

        return this;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Shadow: {
            smooth: {
              colorTop: theme.globalShadow
            }
          },
          Wrapper: {
            Background: {
              smooth: {
                color: theme.toolbar.background
              }
            },
            Options: {
              ChannelLogo: {
                theme: theme,
                logo: theme.logo,
                x: 960,
                mountX: 0.5
              },
              Menu: {
                theme: theme
              },
              Search: {
                theme: theme
              }
            },
            Channels: {
              theme: theme
            },
            BottomLine: {
              smooth: {
                color: theme.toolbar.line
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 148,
          Shadow: {
            alpha: 0.6,
            y: 146,
            x: 960,
            w: 1920,
            h: 20,
            rect: true,
            mountX: 0.5,
            colorTop: 0xffffffff,
            colorBottom: 0x00ffffff,
            transitions: {
              y: {
                duration: 0.35,
                timingFunction: 'ease-out'
              }
            }
          },
          Wrapper: {
            w: 1920,
            h: 146,
            clipbox: true,
            Background: {
              w: 1920,
              h: 146,
              color: 0xff000000,
              rect: true,
              clipping: true,
              transitions: {
                h: {
                  duration: 0.35,
                  timingFunction: 'ease-out'
                }
              }
            },
            Options: {
              ChannelLogo: {
                y: 25,
                x: 960,
                mountX: 0.5,
                w: 148,
                type: ChannelLogo
              },
              Menu: {
                alpha: 1,
                y: 146,
                mountY: 1,
                x: 115,
                type: ArdNavigationOptionItem,
                icon: {
                  src: 'icons/ui/menu.svg',
                  y: 52
                }
              },
              Search: {
                alpha: 1,
                mountX: 1,
                x: 1920 - 115,
                y: 146,
                mountY: 1,
                type: ArdNavigationOptionItem,
                icon: {
                  src: 'icons/ui/search.svg',
                  y: 52
                }
              }
            },
            Channels: {
              alpha: 0,
              y: 252,
              mountY: 1,
              type: ChannelBar,
              transitions: {
                y: {
                  duration: 0.35,
                  timingFunction: 'ease-out'
                },
                alpha: {
                  duration: 0.35,
                  timingFunction: 'ease-out'
                }
              }
            },
            BottomLine: {
              alpha: 1,
              w: 1920,
              h: 4,
              y: 142,
              rect: true,
              color: 0xff000000,
              transitions: {
                y: {
                  duration: 0.35,
                  timingFunction: 'ease-out'
                }
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.channelsVisible = false;
            this.channels = this.tag('Channels');
          },
          _focus: function _focus() {
            return "Options.ChannelLogo";
          },
          _unfocus: function _unfocus() {
            this.hideChannels();
          },
          Options: {
            ChannelLogo: {
              _handleEnter: function _handleEnter() {
                if (this.channelsVisible) {
                  this.hideChannels();
                  return;
                }

                this.showChannels();
              },
              _handleRight: 'Options.Search',
              _handleLeft: 'Options.Menu',
              _handleDown: function _handleDown() {
                this.channels.index = this.channels.selectedIndex;
                return false;
              }
            },
            Search: {
              _handleLeft: 'Options.ChannelLogo',
              _handleEnter: function _handleEnter() {
                this.signal('switchView', {
                  view: 'SearchPage'
                });
              },
              _handleDown: function _handleDown() {
                this.channels.index = this.channels.length - 1;
                return false;
              }
            },
            Menu: {
              _handleRight: 'Options.ChannelLogo',
              _handleEnter: function _handleEnter() {
                this.signal('showMenu');
              },
              _handleDown: function _handleDown() {
                this.channels.index = 0;
                return false;
              }
            },
            _handleDown: function _handleDown() {
              if (this.channelsVisible) {
                return 'Channels';
              }

              return false;
            }
          },
          Channels: {
            _handleEnter: function _handleEnter() {
              var itemId = this.tag('Channels').selectedChannelItem.item.id;
              this.signal('changeTheme', {
                value: itemId
              });
              this.signal('switchView', {
                view: 'MainPage',
                persist: {
                  type: itemId
                }
              });
            },
            _handleRight: 'Options.Search',
            _handleLeft: 'Options.Menu',
            _handleUp: 'Options.ChannelLogo'
          }
        };
      }
    }]);

    return Toolbar;
  }(lng.Component);

  var MenuOption =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(MenuOption, _lng$Component9);

    function MenuOption() {
      _classCallCheck(this, MenuOption);

      return _possibleConstructorReturn(this, _getPrototypeOf(MenuOption).apply(this, arguments));
    }

    _createClass(MenuOption, [{
      key: "theme",
      set: function set(_ref5) {
        var focus = _ref5.focus,
            textFocus = _ref5.textFocus,
            footerIcon = _ref5.navigationPanel.footerIcon;
        this.patch({
          Background: {
            color: focus
          },
          Icon: {
            color: footerIcon
          }
        });
        this._fc = {
          color: footerIcon,
          focus: textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            alpha: 0,
            w: 303,
            h: 185,
            rect: true,
            color: 0x00ffffff
          },
          Icon: {
            y: 185 / 2,
            x: 303 / 2,
            mount: 0.5,
            color: 0xffffffff,
            type: IconItem
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var icon = this.item.icon;
            this.patch({
              Icon: {
                icon: {
                  src: "icons/ui/".concat(icon, ".svg"),
                  w: 185,
                  h: 185
                }
              }
            });
          },
          _focus: function _focus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 1
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.focus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 0
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.color
                }
              }
            });
          }
        };
      }
    }]);

    return MenuOption;
  }(lng.Component);

  var ArdMenuItem =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(ArdMenuItem, _lng$Component10);

    function ArdMenuItem() {
      _classCallCheck(this, ArdMenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(ArdMenuItem).apply(this, arguments));
    }

    _createClass(ArdMenuItem, [{
      key: "active",
      set: function set(v) {
        this._active = v;

        if (this._fc) {
          this.patch({
            Icon: {
              smooth: {
                color: this._active ? this._fc.active : this._fc.color
              }
            },
            Label: {
              smooth: {
                color: this._active ? this._fc.active : this._fc.color
              }
            }
          });
        }
      },
      get: function get() {
        return this._active;
      }
    }, {
      key: "theme",
      set: function set(_ref6) {
        var focus = _ref6.focus,
            textFocus = _ref6.textFocus,
            _ref6$navigationPanel = _ref6.navigationPanel,
            text = _ref6$navigationPanel.text,
            active = _ref6$navigationPanel.active;
        this.patch({
          Background: {
            color: focus
          },
          Icon: {
            color: this._active ? active : text
          },
          Label: {
            color: this._active ? active : text
          }
        });
        this._fc = {
          active: active,
          color: text,
          focus: textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            alpha: 0,
            w: 607,
            h: 74,
            rect: true,
            color: 0x00ffffff
          },
          Icon: {
            x: 100,
            y: 0,
            color: 0xff000000,
            type: IconItem
          },
          Label: {
            color: 0xff000000,
            x: 135,
            mountY: 0.45,
            y: 37,
            text: {
              text: 'TEST',
              fontFace: 'TheSansB4',
              fontSize: 30
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _constructor: function _constructor() {
            this._active = false;
          },
          _init: function _init() {
            var _this$item = this.item,
                _this$item$icon = _this$item.icon,
                icon = _this$item$icon === void 0 ? null : _this$item$icon,
                label = _this$item.label;
            this.patch({
              Icon: {
                icon: icon ? {
                  src: "icons/ui/".concat(icon, ".svg"),
                  w: 74,
                  h: 74
                } : {
                  src: null
                }
              },
              Label: {
                x: icon ? 185 : 115,
                text: {
                  text: label
                }
              }
            });
          },
          _focus: function _focus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 1
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.focus
                }
              },
              Label: {
                smooth: {
                  color: this._fc.focus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 0
                }
              },
              Icon: {
                smooth: {
                  color: this._active ? this._fc.active : this._fc.color
                }
              },
              Label: {
                smooth: {
                  color: this._active ? this._fc.active : this._fc.color
                }
              }
            });
          }
        };
      }
    }]);

    return ArdMenuItem;
  }(lng.Component);

  var Menu =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(Menu, _lng$Component11);

    function Menu() {
      _classCallCheck(this, Menu);

      return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
      key: "findActivePage",
      value: function findActivePage() {
        var currentView = this.cparent.currentView;
        var menuItems = this.menuItems;

        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].view === currentView.view && (!menuItems[i].id || menuItems[i].id === currentView.persist.type)) {
            this.tag('MenuItems').items[this.activePage].active = false;
            this.activePage = i;
            this.tag('MenuItems').index = i;
            this.tag('MenuItems').items[this.activePage].active = true;
          }
        }
      }
    }, {
      key: "show",
      value: function show() {
        this.findActivePage();

        if (this.state === 'Idle') {
          this.showPanel.start();
        } else {
          this.patch({
            alpha: 1,
            transitions: {
              x: {
                duration: 0.5
              }
            },
            smooth: {
              x: 0
            }
          });
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this.patch({
          transitions: {
            x: {
              duration: 0.25
            }
          },
          smooth: {
            x: -620
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this.state) || this;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        var _this12 = this;

        this.currentChannel = theme.id;
        this.activePage = 0;
        var _theme$logo = theme.logo,
            src = _theme$logo.src,
            width = _theme$logo.width,
            _theme$coloredLogo = theme.coloredLogo,
            coloredLogo = _theme$coloredLogo === void 0 ? false : _theme$coloredLogo,
            _theme$navigationPane = theme.navigationPanel,
            header = _theme$navigationPane.header,
            footer = _theme$navigationPane.footer,
            seperator = _theme$navigationPane.seperator,
            background = _theme$navigationPane.background;

        if (coloredLogo) {
          src = coloredLogo.src;
        }

        this.patch({
          Wrapper: {
            color: background,
            HeaderShadow: {
              alpha: !!header.shadow,
              color: header.shadow || 0x00000000
            },
            Header: {
              color: header.background,
              Logo: {
                icon: {
                  color: header.logo,
                  src: src,
                  w: width * 2,
                  h: 96
                }
              },
              // AccountItems: {color: header.text},
              Border: {
                alpha: !!header.border,
                color: header.border || 0x00000000
              }
            },
            Seperator: {
              color: seperator
            },
            OptionsBar: {
              color: footer
            }
          }
        });
        this.tag('MenuItems').items.forEach(function (item, index) {
          item.theme = theme;
          item.active = index === _this12.activePage;
        });
        this.tag('OptionsBar').items.forEach(function (item) {
          item.theme = theme;
        });
      }
    }, {
      key: "menuItems",
      get: function get() {
        return [{
          view: 'MainPage',
          icon: 'start',
          label: 'Start',
          ignore: false
        }, {
          view: 'ComingSoon',
          id: 'programm',
          icon: 'program',
          label: 'Sendung verpasst',
          ignore: true
        }, {
          view: 'ComingSoon',
          id: 'live',
          icon: 'dot',
          label: 'LIVE TV',
          ignore: true
        }, {
          view: 'GlossaryPage',
          icon: 'a-z',
          label: 'Sendung A-Z',
          ignore: false
        }, {
          view: 'DataProtectionPage',
          id: 'dataprotection',
          label: 'Datenschutz',
          offset: 18,
          ignore: true
        }, {
          view: 'ImpressumPage',
          id: 'impressum',
          label: 'Impressum',
          offset: 18,
          ignore: true
        }];
      }
    }], [{
      key: "_template",
      value: function _template() {
        var _Logo;

        return {
          alpha: 0,
          Shadow: {
            color: 0xff000000,
            mount: 0.5,
            y: 540,
            x: 606,
            texture: lng.Tools.getShadowRect(5, 1080, 0, 20, 20)
          },
          Wrapper: {
            w: 606,
            h: 1080,
            color: 0xffffffff,
            clipping: true,
            rect: true
            /*,renderToTexture: true, shader: {type: CircleShader, radius: 15000, x: 604, y: 540, mountX: 1.0}*/
            ,
            HeaderShadow: {
              mount: 0.5,
              x: 302,
              texture: lng.Tools.getShadowRect(604, 10, 0, 30, 30)
            },
            Header: {
              w: 606,
              h: 148,
              color: 0xff0062ff,
              rect: true,
              Logo: (_Logo = {
                y: 35,
                x: 235,
                mountX: 1
              }, _defineProperty(_Logo, "x", 570), _defineProperty(_Logo, "type", IconItem), _defineProperty(_Logo, "icon", {
                src: 'icons/channels/ard.svg',
                w: 135,
                h: 65
              }), _Logo),
              // AccountItems: {x: 40, y: 150, text: {text: 'Anmelden \u2022 Meine ARD', fontFace: 'TheSansB4', fontSize: 30}},
              Border: {
                alpha: 0,
                w: 606,
                h: 4,
                rect: true,
                y: 148
              }
            },
            // User: { x: 60, y: 100,
            //     Shadow: {
            //         x: -28, y: -26, color: 0xffffffff, texture: lng.Tools.getShadowRect(160, 160, 80, 40, 30)
            //     },
            //     Icon: { w: 160, h: 160, renderToTexture: true,
            //         RadialShader: {shader: {type: lng.shaders.RadialFilter, radius: 80},
            //             Background: {w: 160, h: 160, rect: true, color: 0xffffffff},
            //             UserSVG: {mount: 0.5, y: 80, x: 80, color: 0x990062ff, texture: lng.Tools.getSvgTexture(Def.getPath(`icons/ui/user.svg`), 160*2.4, 160*2.4)}
            //         }
            //     }
            // },
            MenuItems: {
              y: 220,
              type: ItemList,
              orientation: 'vertical'
            },
            Seperator: {
              x: 40,
              y: 532,
              h: 2,
              w: 525,
              rect: true,
              color: 0xffe2e2e2
            },
            OptionsBar: {
              w: 606,
              h: 185,
              y: 895,
              color: 0xff001a4b,
              rect: true,
              type: ItemList,
              orientation: 'horizontal'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this13 = this;

            var menuItems = this.menuItems;
            this.activePage = 0;
            this.tag('MenuItems').items = menuItems.map(function (item, index) {
              var offset = (item.offset ? 33 : 0) + index * 74;
              return {
                ref: item.label,
                item: item,
                y: offset,
                type: ArdMenuItem,
                active: index === _this13.activePage,
                ignore: item.ignore
              };
            });
            var optionItems = [{
              icon: 'settings'
            }, {
              icon: 'faq'
            }];
            this.tag('OptionsBar').items = optionItems.map(function (item, index) {
              return {
                ref: item.icon.toUpperCase(),
                item: item,
                x: index * 303,
                type: MenuOption
              };
            });
            this.showPanel = this.animation({
              duration: 1,
              actions: [{
                t: '',
                p: 'alpha',
                rv: 0,
                v: {
                  0: 1
                }
              }, {
                t: '',
                p: 'x',
                rv: -620,
                v: {
                  0: -620,
                  0.6: 0
                }
              }, {
                t: 'Wrapper.HeaderShadow',
                p: 'y',
                rv: 0,
                v: {
                  0.35: -30,
                  0.85: 148
                }
              }, {
                t: 'Wrapper.Header',
                p: 'y',
                rv: -210,
                v: {
                  0.35: -210,
                  0.85: 0
                }
              }, {
                t: 'Wrapper.MenuItems',
                p: 'alpha',
                rv: 0,
                v: {
                  0.7: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.Seperator',
                p: 'alpha',
                rv: 0,
                v: {
                  0.7: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.OptionsBar',
                p: 'y',
                rv: 1080,
                v: {
                  0.35: 1080,
                  0.85: 895
                }
              }, {
                t: 'Wrapper.OptionsBar.SETTINGS',
                p: 'scale',
                rv: 0,
                v: {
                  0.7: 0,
                  0.85: 1
                }
              }, {
                t: 'Wrapper.OptionsBar.FAQ',
                p: 'scale',
                rv: 0,
                v: {
                  0.85: 0,
                  1: 1
                }
              }]
            });
            this.showPanel.on('finish', function () {
              _this13.fire('animationFinished');
            });
            this.transition('x').on('finish', function () {
              _this13.patch({
                alpha: _this13.x !== -620
              });
            });
            return 'Idle';
          },
          _unfocus: function _unfocus() {
            this.tag('MenuItems').index = 0;
            this.tag('OptionsBar').index = 0;
            return 'MenuItems'; // return 'Idle'
          },
          _handleLeft: function _handleLeft() {//block handle left events
          },
          _handleUp: function _handleUp() {//block handle up events
          },
          _handleDown: function _handleDown() {//block handle down events
          },
          Idle: {
            animationFinished: function animationFinished() {
              return 'MenuItems';
            }
          },
          AccountItems: {},
          MenuItems: {
            _handleDown: 'OptionsBar',
            _handleEnter: function _handleEnter() {
              var menuItems = this.tag('MenuItems');
              var targetIndex = menuItems.items.indexOf(menuItems.item);
              var targetItem = menuItems.items[targetIndex];

              if (targetItem.item.view) {
                menuItems.items[this.activePage].active = false;
                targetItem.active = true;
                this.activePage = targetIndex; // const ignore = targetItem.item.view === 'InfoPage' || targetItem.item.view === 'ComingSoon'

                this.signal('switchView', {
                  view: targetItem.item.view,
                  persist: {
                    type: !targetItem.item.id ? this.currentChannel : targetItem.item.id
                  },
                  ignore: targetItem.ignore
                });
              }
            }
          },
          OptionsBar: {
            _handleUp: 'MenuItems',
            _handleEnter: function _handleEnter() {
              if (this.tag('OptionsBar').item.item.icon === 'faq') {
                this.signal('switchView', {
                  view: 'FAQPage',
                  persist: {
                    type: 'faq'
                  },
                  ignore: true
                });
              } else {
                this.signal('switchView', {
                  view: 'SettingsPage',
                  persist: {
                    type: 'settings'
                  },
                  ignore: true
                });
              }
            },
            _exit: function _exit() {
              this.tag('OptionsBar').index = 0;
            }
          }
        };
      }
    }]);

    return Menu;
  }(lng.Component);

  var Grid =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(Grid, _lng$Component12);

    function Grid() {
      _classCallCheck(this, Grid);

      return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
      key: "reset",
      value: function reset() {
        this._wrapper.children = [];
        this._wrapper.y = this.paddingTop;
        this.row = 0;
        this.col = 0;
        this.columns = 4;
        this.index = 0;
      }
    }, {
      key: "calculateRows",
      value: function calculateRows(amount) {
        var rest = amount % 4;
        var result = Math.floor(amount / 4);

        if (rest === 0) {
          return result - 1;
        }

        return result;
      }
    }, {
      key: "calculateIndex",
      value: function calculateIndex() {
        var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.row;
        var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.col;
        return r * this.columns + c;
      }
    }, {
      key: "update",
      value: function update() {
        var cp = this._wrapper.y;
        var vs = this.viewportSize;
        var vp = this.paddingTop - cp;
        var ci = this.item;
        var y = cp;

        if (ci) {
          if (ci.y < vp) {
            y = -(ci.y - this.paddingTop);
          }

          if (ci.y + ci.h > vp + vs) {
            y -= ci.y + ci.h - (vp + vs);
          }

          this._wrapper.setSmooth('y', y);
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.item;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._theme = theme;
      },
      get: function get() {
        return this._theme;
      }
    }, {
      key: "items",
      set: function set(items) {
        var _this14 = this;

        this.reset();

        if (items.length < 4) {
          this.columns = items.length;
        }

        this._wrapper.children = items;
        var columnOffset = 0;
        var rowOffset = 0;
        var tallestInRow = 0;

        this._wrapper.children.forEach(function (child, index) {
          if (!child.exists) {
            child.patch({
              x: columnOffset,
              y: rowOffset
            });
          }

          if (child.h > tallestInRow) {
            tallestInRow = child.h;
          }

          if (index % 4 === 3) {
            columnOffset = 0;
            rowOffset += tallestInRow + _this14.verticalSpacing;
            tallestInRow = 0;
          } else {
            columnOffset += child.w + _this14.horizontalSpacing;
          }
        });

        this.rows = this.calculateRows(this.length) + 1;
        this.setSmooth('alpha', 1, {
          duration: 0.2
        });
      },
      get: function get() {
        return this._wrapper.children;
      }
    }, {
      key: "row",
      set: function set(r) {
        this.signal('rowIndexChanged', {
          row: r,
          previousRow: this._r
        });
        this._r = r;
        this.update();
      },
      get: function get() {
        return this._r;
      }
    }, {
      key: "paddingTop",
      set: function set(v) {
        this._pt = v;
      },
      get: function get() {
        return this._pt || 0;
      }
    }, {
      key: "paddingBottom",
      set: function set(v) {
        this._pb = v;
      },
      get: function get() {
        return this._pb || 0;
      }
    }, {
      key: "horizontalSpacing",
      get: function get() {
        return 16;
      }
    }, {
      key: "verticalSpacing",
      get: function get() {
        return 65;
      }
    }, {
      key: "viewportSize",
      get: function get() {
        return this.h - this.paddingTop - this.paddingBottom;
      }
    }, {
      key: "length",
      get: function get() {
        return this.items.length;
      }
    }, {
      key: "item",
      get: function get() {
        return this.items[this.calculateIndex()];
      }
    }, {
      key: "lastChild",
      get: function get() {
        return this.items && this.items[this.length - 1] || null;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          boundsMargin: [0, 600, 0, 600],
          h: 1080,
          Wrapper: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this._wrapper = this.tag('Wrapper');
            this.reset();
          },
          _handleDown: function _handleDown() {
            var r = this.row + 1;
            var children = this.items;

            if (r < this.rows) {
              if (!children[this.calculateIndex(r, this.col)]) {
                this.col = (children.length - 1) % 4;
              }

              this.row = r;
            } else {
              return false;
            }
          },
          _handleUp: function _handleUp() {
            if (0 < this.row) {
              this.row--;
            } else {
              return false;
            }
          },
          _handleRight: function _handleRight() {
            var c = this.col + 1;
            var items = this.items;
            var target = items[this.calculateIndex(this.row, c)];

            if (c < this.columns && target) {
              if (!target && this.row > 0) {
                this.row--;
              }

              this.col = c;
            } else {
              return false;
            }
          },
          _handleLeft: function _handleLeft() {
            if (0 < this.col) {
              this.col--;
            } else {
              return false;
            }
          }
        };
      }
    }]);

    return Grid;
  }(lng.Component);

  var GlossaryBarItem =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(GlossaryBarItem, _lng$Component13);

    function GlossaryBarItem() {
      _classCallCheck(this, GlossaryBarItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(GlossaryBarItem).apply(this, arguments));
    }

    _createClass(GlossaryBarItem, [{
      key: "active",
      set: function set(v) {
        this._active = v;

        if (this._fc) {
          this.patch({
            Label: {
              smooth: {
                color: this._active && !this.hasFocus() ? this._fc.active : this.hasFocus() ? this._fc.focus : this._fc.color
              }
            }
          });
        }
      },
      get: function get() {
        return false && this._active;
      }
    }, {
      key: "theme",
      set: function set(_ref7) {
        var focus = _ref7.focus,
            text = _ref7.text,
            textFocus = _ref7.textFocus,
            background = _ref7.glossary.background,
            active = _ref7.navigationPanel.active;
        this.patch({
          Label: {
            color: this._active ? active : text
          }
        });
        this._fc = {
          active: background,
          color: text,
          focus: textFocus
        };
      }
    }, {
      key: "disabled",
      get: function get() {
        return this._disabled;
      },
      set: function set(bool) {
        this._disabled = bool;
        this.patch({
          alpha: bool ? 0.3 : 1
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Label: {
            mount: 0.5,
            x: 40,
            y: 43,
            text: {
              text: 'A',
              fontFace: 'TheSansB4',
              fontSize: 30
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.disabled = false;
            this.patch({
              Label: {
                text: {
                  text: this.item
                }
              }
            });
          },
          _focus: function _focus() {
            this.patch({
              Label: {
                smooth: {
                  color: this._fc.focus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Label: {
                smooth: {
                  color: this._active ? this._fc.active : this._fc.color
                }
              }
            });
          }
        };
      }
    }]);

    return GlossaryBarItem;
  }(lng.Component);

  var GlossaryBar =
  /*#__PURE__*/
  function (_ItemList) {
    _inherits(GlossaryBar, _ItemList);

    function GlossaryBar() {
      _classCallCheck(this, GlossaryBar);

      return _possibleConstructorReturn(this, _getPrototypeOf(GlossaryBar).apply(this, arguments));
    }

    _createClass(GlossaryBar, [{
      key: "filter",
      value: function filter(_ref8) {
        var _this15 = this;

        var glossary = _ref8.glossary;
        this._index = -1;
        Object.keys(glossary).forEach(function (key) {
          _this15.tag("Sort-".concat(key.replace('shows', ''))).disabled = !glossary[key].length;
        });
        this.index = this.targetHasData(1);
      }
    }, {
      key: "targetHasData",
      value: function targetHasData(dir) {
        var i = this._index + dir;
        var l = this.length;

        for (i; dir < 0 && i > -1 || dir > 0 && i < l; i += dir) {
          if (!this.items[i].disabled) {
            return i;
          }
        }

        return -1;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        var _this16 = this;

        this.selectedIndex = 0;
        this.patch({
          Focus: {
            color: theme.focus
          }
        });
        this._index = 0;
        this.items.forEach(function (item, index) {
          item.theme = theme;
          item.active = index === _this16.selectedIndex;
        });
      }
    }, {
      key: "orientation",
      get: function get() {
        return 'horizontal';
      }
    }], [{
      key: "_template",
      value: function _template() {
        return lng.tools.ObjMerger.merge(_get(_getPrototypeOf(GlossaryBar), "_template", this).call(this), {
          Focus: {
            alpha: 0,
            w: 80,
            h: 80,
            rect: true,
            transitions: {
              x: {
                duration: 0.3
              }
            }
          }
        });
      }
    }, {
      key: "_states",
      value: function _states() {
        return lng.tools.ObjMerger.merge(_get(_getPrototypeOf(GlossaryBar), "_states", this).call(this), {
          _init: function _init() {
            var _this17 = this;

            this.selectedIndex = 0;
            this._index = 0;
            var items = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            this.items = items.map(function (item, index) {
              return {
                ref: "Sort-".concat(item),
                type: GlossaryBarItem,
                item: item,
                x: index * 60
              };
            });
            var focus = this.tag('Focus');
            focus.transition('x').on('finish', function () {
              _this17.signal('showGrid', {
                sort: _this17.item.item
              });
            });
          },
          _handleRight: function _handleRight() {
            return this.navigate(this.targetHasData(1), this.orientation, true);
          },
          _handleLeft: function _handleLeft() {
            return this.navigate(this.targetHasData(-1), this.orientation, true);
          },
          _focus: function _focus() {
            this.patch({
              Focus: {
                smooth: {
                  alpha: 1
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Focus: {
                smooth: {
                  alpha: 0
                }
              }
            });
          },
          indexChanged: function indexChanged(e) {
            this.signal('hideGrid');
            this.patch({
              Focus: {
                smooth: {
                  x: e.index * 60
                }
              }
            });

            if (this.length) {
              this.items[this.selectedIndex].active = false;
              this.selectedIndex = e.index;
              this.items[e.index].active = true;
            }
          }
        });
      }
    }]);

    return GlossaryBar;
  }(ItemList);

  var NoResultsItem =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(NoResultsItem, _lng$Component14);

    function NoResultsItem() {
      _classCallCheck(this, NoResultsItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(NoResultsItem).apply(this, arguments));
    }

    _createClass(NoResultsItem, [{
      key: "theme",
      set: function set(_ref9) {
        var text = _ref9.text;
        this.patch({
          Icon: {
            color: text
          },
          Message: {
            color: text
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Icon: {
            mountX: 0.5,
            x: 960,
            y: -18,
            type: IconItem,
            icon: {
              src: 'icons/player/info.svg',
              w: 140,
              h: 140
            }
          },
          Message: {
            w: 700,
            mountX: 0.5,
            x: 960,
            y: 100,
            text: {
              text: 'Es wurden keine Ergebnisse gefunden',
              maxLines: 3,
              fontSize: 42,
              fontFace: 'TheSansB4',
              textAlign: 'center'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {};
      }
    }]);

    return NoResultsItem;
  }(lng.Component);

  var DurationLabel =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(DurationLabel, _lng$Component15);

    function DurationLabel() {
      _classCallCheck(this, DurationLabel);

      return _possibleConstructorReturn(this, _getPrototypeOf(DurationLabel).apply(this, arguments));
    }

    _createClass(DurationLabel, [{
      key: "label",
      set: function set(value) {
        this.tag('Label').text.text = Math.ceil(value / 60) + ' Min.';
      }
    }, {
      key: "theme",
      set: function set(_ref10) {
        var _ref10$duration = _ref10.duration,
            text = _ref10$duration.text,
            background = _ref10$duration.background;
        this.patch({
          Background: {
            color: background
          },
          Label: {
            color: text
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            h: 46,
            w: 90,
            rect: true
          },
          Label: {
            mount: 0.5,
            x: 45,
            y: 26,
            text: {
              text: '0 Min.',
              fontSize: 22,
              fontFace: 'TheSansB4'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this18 = this;

            var label = this.tag('Label');
            var background = this.tag('Background');
            label.on('txLoaded', function () {
              var labelWidth = label.renderWidth;

              if (labelWidth > background.w - 10) {
                background.w = labelWidth + 10;
                label.x = background.w / 2;
              }

              _this18.x = _this18.cparent.w - (background.w + 5);

              if (_this18.cparent.tag('ImageHolder')) {
                _this18.y = _this18.cparent.tag('ImageHolder').h - (background.h + 6);
              } else {
                _this18.y = _this18.cparent.h - (background.h + 6);
              }
            });
          },
          _focus: function _focus() {
            this.tag('Background').setSmooth('alpha', 1);
          },
          _unfocus: function _unfocus() {
            this.tag('Background').setSmooth('alpha', 0.8);
          }
        };
      }
    }]);

    return DurationLabel;
  }(lng.Component);

  var GridCell =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(GridCell, _lng$Component16);

    function GridCell() {
      _classCallCheck(this, GridCell);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridCell).apply(this, arguments));
    }

    _createClass(GridCell, null, [{
      key: "_template",
      value: function _template() {
        return {
          Shadow: {
            mount: 0.5
          },
          ImageHolder: {
            w: 340,
            h: 452,
            clipping: true,
            Image: {
              transitions: {
                scale: {
                  duration: 0.7
                }
              }
            },
            Duration: {
              type: DurationLabel
            }
          },
          Background: {},
          Labels: {
            Live: {
              x: 10,
              text: {
                text: 'LIVE',
                fontSize: 29,
                maxLines: 1,
                fontFace: 'TheSansB6'
              }
            },
            Headline: {
              x: 10
            },
            Subline: {
              x: 10
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this19 = this;

            var sublineLabel = this.tag('Subline');
            var headlineLabel = this.tag('Headline');
            headlineLabel.on('txLoaded', function () {
              var headlineHeight = headlineLabel.renderHeight;
              sublineLabel.y = headlineLabel.y;

              if (headlineHeight > 0) {
                sublineLabel.y += headlineHeight - 12;
              }
            });
            var _this$item2 = this.item,
                _this$item2$images = _this$item2.images,
                images = _this$item2$images === void 0 ? {} : _this$item2$images,
                _this$item2$mediumTit = _this$item2.mediumTitle,
                mediumTitle = _this$item2$mediumTit === void 0 ? null : _this$item2$mediumTit,
                publicationService = _this$item2.publicationService,
                show = _this$item2.show,
                duration = _this$item2.duration,
                type = _this$item2.type;
            var secondaryTitle = null;

            if (publicationService && show) {
              secondaryTitle = "".concat(show.title).concat(this.channel === 'ard' ? " \u2022 ".concat(publicationService.name) : '');
            }

            var sizes = ArdCellSizes[this.base];
            var image = images.aspect16x9 || {};

            if (type === 'poster') {
              sizes = ArdCellSizes['poster'];
              image = images.aspect3x4 || {};
            }

            var _sizes = sizes,
                w = _sizes.w,
                h = _sizes.h,
                imageHeight = _sizes.imageHeight,
                headlineOnly = _sizes.headlineOnly;
            var _this$theme = this.theme,
                globalShadow = _this$theme.globalShadow,
                _this$theme$teaser = _this$theme.teaser,
                headline = _this$theme$teaser.headline,
                subline = _this$theme$teaser.subline,
                background = _this$theme$teaser.background,
                live = _this$theme.live.progress,
                fillTeaser = _this$theme.fillTeaser;
            var isLive = type === 'live';

            if (type !== 'poster' && fillTeaser) {
              if (type === 'show' || isLive || this.headerOnly) {
                h = imageHeight + headlineOnly;
              }

              if (!mediumTitle) {
                h = imageHeight;
              }
            }

            var shadowHeight = h;

            if (!fillTeaser) {
              shadowHeight = imageHeight;
            }

            if (this.showTime) {
              secondaryTitle = this.time;
            }

            this.patch({
              w: w,
              h: h,
              Shadow: {
                alpha: 0,
                x: w / 2,
                y: shadowHeight / 2,
                color: globalShadow,
                texture: lng.Tools.getShadowRect(w + 10, shadowHeight + 10, 0, 20, 20)
              },
              ImageHolder: {
                w: w,
                h: imageHeight,
                Image: {
                  w: w,
                  h: imageHeight,
                  src: image.src && ux.Ui.getImageUrl(image.src.replace('{width}', w) || '', {
                    width: w,
                    height: imageHeight,
                    type: 'crop'
                  })
                },
                Duration: {
                  visible: !!duration && duration > 0,
                  label: duration,
                  theme: this.theme
                }
              },
              Background: {
                visible: !!fillTeaser,
                y: imageHeight - 2,
                w: w,
                h: h - imageHeight,
                color: background,
                rect: true
              },
              Labels: {
                y: imageHeight + 10,
                alpha: !!(type !== 'poster'),
                Live: {
                  alpha: !!isLive,
                  color: live
                },
                Headline: {
                  color: headline,
                  x: isLive ? 70 : 10,
                  w: w - (isLive ? 120 : 10) - 10,
                  text: {
                    text: mediumTitle,
                    fontSize: 29,
                    lineHeight: 40,
                    maxLines: 2,
                    fontFace: 'TheSansB6'
                  }
                },
                Subline: {
                  color: subline,
                  alpha: !this.headerOnly && !!secondaryTitle,
                  x: isLive ? 70 : 10,
                  w: w - (isLive ? 120 : 10) - 10,
                  text: {
                    text: secondaryTitle,
                    maxLines: 1,
                    fontSize: 27,
                    fontFace: 'TheSansB4'
                  }
                }
              }
            });
            this.tag('Image').on('txError', function () {
              _this19.patch({
                ImageHolder: {
                  Image: {
                    rect: true,
                    color: background
                  }
                }
              });
            });
          },
          _focus: function _focus() {
            this.patch({
              smooth: {
                scale: 1.13,
                zIndex: 2
              },
              Shadow: {
                smooth: {
                  alpha: 1
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              smooth: {
                scale: 1,
                zIndex: 0
              },
              Shadow: {
                smooth: {
                  alpha: 0
                }
              }
            });
          }
        };
      }
    }]);

    return GridCell;
  }(lng.Component);

  var ArdCellSizes = {
    'list': {
      w: 490,
      h: 422,
      headlineOnly: 95,
      imageHeight: 276
    },
    'grid': {
      w: 412,
      h: 375,
      headlineOnly: 100,
      imageHeight: 232
    },
    'poster': {
      w: 340,
      h: 452,
      imageHeight: 452 // 'xl':{w: 1280, h: 560, imageHeight: 560},
      // 'l': {w: 758, h: 500, imageHeight: 426},
      // 'm': {w: 412, h: 330, imageHeight: 232},
      // 'poster': {w: 340, h: 525, imageHeight: 452},
      // 's': {w: 340, h: 284, imageHeight: 191}

    }
  };

  var GlossaryPage =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(GlossaryPage, _lng$Component17);

    function GlossaryPage() {
      _classCallCheck(this, GlossaryPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(GlossaryPage).apply(this, arguments));
    }

    _createClass(GlossaryPage, [{
      key: "update",
      value: function update(sort) {
        var _this20 = this;

        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.data;
        var teasers = data.glossary["shows".concat(sort)];
        this.data = data;
        this.patch({
          Grid: {
            items: teasers.map(function (item) {
              return {
                ref: "T".concat(item.id),
                base: 'grid',
                item: item,
                channel: _this20.api.currentChannel,
                theme: _this20._t,
                type: GridCell
              };
            })
          },
          NoResults: {
            alpha: teasers.length > 0 ? 0 : 0.6
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.state === 'Active.Sort') {
          return this.tag('Sort');
        }

        if (this.state === 'Active.Grid') {
          return this.tag('Grid');
        }

        return this;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._t = theme;
        this.patch({
          Shadow: {
            colorBottom: 0x00000000,
            colorTop: theme.fade
          },
          Sort: {
            theme: theme
          },
          NoResults: {
            theme: theme
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          boundsMargin: [600, 600, 600, 600],
          w: 1920,
          h: 1080,
          Grid: {
            type: Grid,
            y: 129,
            x: 115,
            paddingTop: 206,
            paddingBottom: 115,
            signals: {
              rowIndexChanged: true
            }
          },
          Shadow: {
            y: 195,
            alpha: 0,
            h: 275,
            w: 1920,
            rect: true
          },
          Sort: {
            type: GlossaryBar,
            x: 140,
            y: 195,
            signals: {
              hideGrid: true,
              showGrid: true
            }
          },
          NoResults: {
            alpha: 0,
            type: NoResultsItem,
            y: 330
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.index = 0;
            return 'Active';
          },
          loadView: function loadView(_ref11) {
            var _this21 = this;

            var isPreviousView = _ref11.isPreviousView,
                _ref11$toLoad$persist = _ref11.toLoad.persist,
                _ref11$toLoad$persist2 = _ref11$toLoad$persist.type,
                type = _ref11$toLoad$persist2 === void 0 ? null : _ref11$toLoad$persist2,
                _ref11$toLoad$persist3 = _ref11$toLoad$persist.pageType,
                pageType = _ref11$toLoad$persist3 === void 0 ? null : _ref11$toLoad$persist3,
                _ref11$toLoad$persist4 = _ref11$toLoad$persist.data,
                data = _ref11$toLoad$persist4 === void 0 ? null : _ref11$toLoad$persist4;
            this.isPreviousView = isPreviousView;
            this.fire('loading');

            if (!isPreviousView && !data) {
              if (type === 'alle') {
                type = 'ard';
              }

              this.api.getGlossaryPageData(type).then(function (response) {
                var sort = _this21.tag('Sort');

                sort.filter(response);

                _this21.update(sort.item.item, response);

                _this21.fire('finishedLoading');
              });
            } else if (!isPreviousView) {
              this.update(data);
            } else {
              return 'Show';
            }
          },
          loading: 'Loading',
          finishedLoading: 'Show',
          Loading: {
            finished: 'Show'
          },
          hideView: 'Hide',
          Hide: {
            _enter: function _enter() {
              var _this22 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this22.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this23 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this23.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return this.isPreviousView ? 'Active.Grid' : 'Active.Sort';
            }
          },
          Idle: {},
          Active: {
            Sort: {
              _enter: function _enter() {
                this.hasToolbarHidden = false;
                this.signal('showToolbar');
              },
              _handleDown: function _handleDown() {
                var grid = this.tag('Grid');

                if (grid.alpha === 1 && grid.length) {
                  return 'Active.Grid';
                }
              },
              hideGrid: function hideGrid() {
                this.tag('Grid').setSmooth('alpha', 0, {
                  duration: 0.1
                });
              },
              showGrid: function showGrid(e) {
                this.update(e.sort);
              }
            },
            Grid: {
              _enter: function _enter() {
                if (this.tag('Grid').row > 0) {
                  this.fire('rowIndexChanged', {
                    row: 1,
                    previousRow: 0
                  });
                } else {
                  this.hasToolbarHidden = false;
                  this.signal('showToolbar');
                }
              },
              _exit: function _exit(e) {
                this.patch({
                  Grid: {
                    smooth: {
                      y: 129
                    }
                  },
                  Shadow: {
                    smooth: {
                      y: 195 - 51,
                      alpha: 0
                    }
                  },
                  Sort: {
                    smooth: {
                      y: 195
                    }
                  }
                });

                if (e.event !== 'hideView') {
                  this.hasToolbarHidden = false;
                  this.signal('showToolbar');
                }
              },
              _handleEnter: function _handleEnter() {
                var item = this.tag('Grid').item.item;

                if (item.type !== 'live') {
                  this.signal('switchView', {
                    view: 'ShowPage',
                    persist: {
                      targetId: item.links.target.id
                    }
                  });
                }
              },
              rowIndexChanged: function rowIndexChanged(e) {
                if (e.row === 1 && e.previousRow === 0) {
                  this.patch({
                    Grid: {
                      smooth: {
                        y: 0
                      }
                    },
                    Shadow: {
                      smooth: {
                        y: 0,
                        alpha: 1
                      }
                    },
                    Sort: {
                      smooth: {
                        y: 51
                      }
                    }
                  });
                  this.hasToolbarHidden = true;
                  this.signal('hideToolbar');
                }
              },
              _handleUp: 'Active.Sort'
            }
          }
        };
      }
    }]);

    return GlossaryPage;
  }(lng.Component);

  var SlideBar =
  /*#__PURE__*/
  function (_lng$Component18) {
    _inherits(SlideBar, _lng$Component18);

    function SlideBar() {
      _classCallCheck(this, SlideBar);

      return _possibleConstructorReturn(this, _getPrototypeOf(SlideBar).apply(this, arguments));
    }

    _createClass(SlideBar, [{
      key: "scroll",
      value: function scroll() {
        var scroller = this.tag('Slider');
        scroller.setSmooth('y', this.scrollSize * this.currentStep);
        this.signal('scroll', {
          step: this.currentStep
        });
        return true;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Slider: {
            color: theme.text
          }
        });
        this._fc = {
          color: theme.text,
          focus: theme.slider
        };
      }
    }, {
      key: "frame",
      set: function set(v) {
        this._frame = v;
      },
      get: function get() {
        return this._frame || 840;
      }
    }, {
      key: "contentSize",
      set: function set(v) {
        this.steps = Math.ceil(Math.abs((this.frame - v - 160) / 200));
        this.currentStep = 0;
        this.scrollSize = this.frame / this.steps;
        this.tag('Slider').texture = lng.Tools.getRoundRect(10, this.scrollSize, 5, 2, 0xffffffff, true, 0xffffffff);
        this.scroll();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 1630,
          y: 180,
          Slider: {
            color: 0xff00ff00,
            texture: lng.Tools.getRoundRect(10, 890, 5, 2, 0xffffffff, true, 0xffffffff)
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {},
          _focus: function _focus() {
            this.patch({
              Slider: {
                smooth: {
                  color: this._fc.focus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Slider: {
                smooth: {
                  color: this._fc.color
                }
              }
            });
          },
          _handleUp: function _handleUp() {
            var target = this.currentStep - 1;

            if (target >= 0) {
              this.currentStep = target;
              return this.scroll();
            }

            return false;
          },
          _handleDown: function _handleDown() {
            var target = this.currentStep + 1;

            if (target < this.steps) {
              this.currentStep = target;
              return this.scroll();
            }

            return false;
          }
        };
      }
    }]);

    return SlideBar;
  }(lng.Component);

  var InfoPage =
  /*#__PURE__*/
  function (_lng$Component19) {
    _inherits(InfoPage, _lng$Component19);

    function InfoPage() {
      _classCallCheck(this, InfoPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(InfoPage).apply(this, arguments));
    }

    _createClass(InfoPage, [{
      key: "update",
      value: function update(data) {}
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('SlideBar');
      }
    }, {
      key: "items",
      set: function set(v) {
        var wrapper = this.tag('Wrapper');
        this.tag('Anchor').y = 170;
        wrapper.children = v;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.tag('SlideBar').theme = theme;
        this._colors = theme;
        var wrapper = this.tag('Wrapper');

        if (wrapper.children.length) {
          wrapper.children.forEach(function (child) {
            child.color = theme.text;

            if (child.children.length) {
              child.children.forEach(function (subChild) {
                subChild.color = theme.text;
              });
            }
          });
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          Anchor: {
            x: 960,
            y: 170,
            Wrapper: {
              mountX: 0.5,
              w: 1260,
              h: 0,
              flex: {
                direction: 'row',
                wrap: true
              }
            }
          },
          SlideBar: {
            type: SlideBar,
            signals: {
              scroll: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.update();
          },
          _focus: function _focus() {
            this.tag('SlideBar').contentSize = this.tag('Wrapper').flex._layout.targetCrossAxisSize;
          },
          loadView: function loadView(_ref12) {
            var _ref12$toLoad$persist = _ref12.toLoad.persist.type,
                type = _ref12$toLoad$persist === void 0 ? null : _ref12$toLoad$persist;
            this.fire('finishedLoading');
          },
          finishedLoading: function finishedLoading() {
            return 'Show';
          },
          hideView: 'Hide',
          Loading: {
            finished: 'Show'
          },
          Hide: {
            _enter: function _enter() {
              var _this24 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this24.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this25 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this25.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return 'Active';
            }
          },
          Idle: {},
          Active: {
            scroll: function scroll(e) {
              var anchor = this.tag('Anchor');
              anchor.setSmooth('y', 170 - e.step * 200);
            }
          }
        };
      }
    }]);

    return InfoPage;
  }(lng.Component);

  var ImpressumPage =
  /*#__PURE__*/
  function (_InfoPage) {
    _inherits(ImpressumPage, _InfoPage);

    function ImpressumPage() {
      _classCallCheck(this, ImpressumPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(ImpressumPage).apply(this, arguments));
    }

    _createClass(ImpressumPage, [{
      key: "update",
      value: function update() {
        var _this26 = this;

        this.api.getInfo('impressum').then(function (data) {
          var color = _this26._colors.text;
          var items = [{
            w: 1260,
            color: color,
            text: {
              text: data.Page,
              fontSize: 38,
              fontFace: 'TheSansB6',
              textAlign: 'center'
            }
          }, {
            w: 1260,
            color: color,
            text: {
              text: data.Description,
              fontSize: 24,
              lineHeight: 30,
              fontFace: 'TheSansB4'
            }
          }, {
            w: 1260,
            color: color,
            text: {
              text: data.Description2,
              fontSize: 24,
              lineHeight: 30,
              fontFace: 'TheSansB4'
            },
            flexItem: {
              marginTop: 10
            }
          }, {
            w: 1260,
            color: color,
            text: {
              text: data.MainAddress,
              fontSize: 24,
              lineHeight: 30,
              fontFace: 'TheSansB6'
            },
            flexItem: {
              marginTop: 10
            }
          }, {
            w: 1260,
            color: color,
            text: {
              text: data.MainAddressInfo,
              fontSize: 24,
              lineHeight: 30,
              fontFace: 'TheSansB4'
            }
          }, {
            w: 1260,
            color: color,
            text: {
              text: data.ExtraHeader,
              fontSize: 34,
              fontFace: 'TheSansB4'
            },
            flexItem: {
              marginTop: 10
            }
          }];
          var a = data.Addresses;
          var addresses = Object.keys(a).map(function (key) {
            return {
              w: 630,
              flex: {
                direction: 'row',
                wrap: true
              },
              Studio: {
                w: 630,
                color: color,
                text: {
                  text: key,
                  fontSize: 27,
                  fontFace: 'TheSansB6'
                },
                flexItem: {
                  marginTop: 10
                }
              },
              Address: {
                w: 630,
                color: color,
                text: {
                  text: a[key],
                  fontSize: 24,
                  lineHeight: 30,
                  fontFace: 'TheSansB4'
                }
              },
              __create: true
            };
          });
          _this26.items = [].concat(items, _toConsumableArray(addresses));
        });
      }
    }]);

    return ImpressumPage;
  }(InfoPage);

  var DataProtectionPage =
  /*#__PURE__*/
  function (_InfoPage2) {
    _inherits(DataProtectionPage, _InfoPage2);

    function DataProtectionPage() {
      _classCallCheck(this, DataProtectionPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(DataProtectionPage).apply(this, arguments));
    }

    _createClass(DataProtectionPage, [{
      key: "update",
      value: function update() {
        var _this27 = this;

        this.api.getInfo('dataprotection').then(function (data) {
          var color = _this27._colors.text;
          var items = [{
            w: 1260,
            color: color,
            text: {
              text: data.Page,
              fontSize: 38,
              fontFace: 'TheSansB6',
              textAlign: 'center'
            }
          }, {
            w: 1260,
            color: color,
            text: {
              text: data.Description,
              fontSize: 24,
              lineHeight: 30,
              fontFace: 'TheSansB4'
            }
          }];
          var c = data.Content;
          var content = Object.keys(c).map(function (key) {
            return {
              w: 1260,
              flex: {
                direction: 'row',
                wrap: true
              },
              Header: {
                w: 1260,
                color: color,
                text: {
                  text: key,
                  fontSize: 27,
                  fontFace: 'TheSansB6'
                },
                flexItem: {
                  marginTop: 10
                }
              },
              Detail: {
                w: 1260,
                color: color,
                text: {
                  text: c[key],
                  fontSize: 24,
                  wordWrap: true,
                  lineHeight: 30,
                  fontFace: 'TheSansB4'
                }
              },
              __create: true
            };
          });
          _this27.items = [].concat(items, _toConsumableArray(content));
        });
      }
    }]);

    return DataProtectionPage;
  }(InfoPage);

  var InfoCollection =
  /*#__PURE__*/
  function (_lng$Component20) {
    _inherits(InfoCollection, _lng$Component20);

    function InfoCollection() {
      _classCallCheck(this, InfoCollection);

      return _possibleConstructorReturn(this, _getPrototypeOf(InfoCollection).apply(this, arguments));
    }

    _createClass(InfoCollection, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('ItemList');
      }
    }, {
      key: "items",
      set: function set(v) {
        this.tag('ItemList').items = v;
      },
      get: function get() {
        return this.tag('ItemList').items;
      }
    }, {
      key: "item",
      get: function get() {
        return this.tag('ItemList').item;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Header: {
            color: theme.text
          }
        });
        this.items.forEach(function (item) {
          item.theme = theme;
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Header: {
            x: 25,
            y: 5,
            w: 1450,
            text: {
              text: 'Header',
              fontSize: 42,
              maxLines: 1,
              lineHeight: 50,
              fontFace: 'TheSansB4',
              textAlign: 'left'
            }
          },
          ItemList: {
            h: 1080,
            type: ItemList,
            y: 84,
            orientation: 'vertical'
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _unfocus: function _unfocus() {
            this.tag('ItemList').index = 0;
          },
          _init: function _init() {
            var _this28 = this;

            this.patch({
              Header: {
                text: {
                  text: this.label
                }
              }
            });
            var itemList = this.tag('ItemList');

            itemList.onUpdate = function () {
              var items = itemList.items;
              var offset = 0;
              items.forEach(function (item, index) {
                item.y = offset;

                if (itemList.index === index && _this28.hasFocus()) {
                  offset = item.y + item.expandedHeight;
                } else {
                  offset = item.y + item.collapsedHeight;
                }
              });
            };
          }
        };
      }
    }]);

    return InfoCollection;
  }(lng.Component);

  var FAQItem =
  /*#__PURE__*/
  function (_lng$Component21) {
    _inherits(FAQItem, _lng$Component21);

    function FAQItem() {
      _classCallCheck(this, FAQItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(FAQItem).apply(this, arguments));
    }

    _createClass(FAQItem, [{
      key: "expandedHeight",
      set: function set(v) {
        this._expandedHeight = v;
      },
      get: function get() {
        return this._expandedHeight;
      }
    }, {
      key: "collapsedHeight",
      set: function set(v) {
        this._collapsedHeight = v;
      },
      get: function get() {
        return this._collapsedHeight;
      }
    }, {
      key: "theme",
      set: function set(_ref13) {
        var focus = _ref13.focus,
            text = _ref13.text,
            textFocus = _ref13.textFocus;
        this.patch({
          Headline: {
            color: text
          },
          FAQWrapper: {
            FAQ: {
              Background: {
                color: focus
              },
              Label: {
                color: text
              }
            },
            BorderTop: {
              color: text
            },
            Info: {
              Label: {
                color: text
              }
            },
            BorderBottom: {
              color: text
            }
          }
        });
        this._fc = {
          text: text,
          textFocus: textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 86,
          Headline: {
            x: 25,
            y: 35,
            w: 1450,
            text: {
              text: '',
              fontSize: 42,
              maxLines: 1,
              lineHeight: 50,
              fontFace: 'TheSansB4',
              textAlign: 'left'
            }
          },
          FAQWrapper: {
            w: 1500,
            h: 86,
            FAQ: {
              Background: {
                alpha: 0,
                w: 1500,
                h: 86,
                rect: true,
                color: 0xff0000ff
              },
              Label: {
                x: 25,
                y: 17,
                w: 1450,
                text: {
                  text: 'Header',
                  fontSize: 36,
                  maxLines: 1,
                  lineHeight: 50,
                  fontFace: 'TheSansB4',
                  textAlign: 'left'
                }
              }
            },
            BorderTop: {
              y: -1,
              w: 1500,
              h: 2,
              rect: true
            },
            Info: {
              w: 1500,
              y: 86,
              Label: {
                x: 25,
                y: 15,
                w: 1450,
                text: {
                  text: 'Info',
                  fontSize: 34,
                  lineHeight: 45,
                  fontFace: 'TheSansB4',
                  textAlign: 'left'
                }
              }
            },
            BorderBottom: {
              y: 85,
              w: 1500,
              h: 2,
              rect: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this._hasHeadline = false;
            var _this$item3 = this.item,
                _this$item3$headline = _this$item3.headline,
                headline = _this$item3$headline === void 0 ? '' : _this$item3$headline,
                header = _this$item3.header,
                info = _this$item3.info;

            if (headline.length) {
              this._hasHeadline = true;
            }

            this.patch({
              Headline: {
                text: {
                  text: this._hasHeadline ? headline : ''
                }
              },
              FAQWrapper: {
                y: this._hasHeadline ? 114 : 0,
                FAQ: {
                  Label: {
                    text: {
                      text: header
                    }
                  }
                },
                Info: {
                  alpha: 0,
                  Label: {
                    text: {
                      text: info
                    }
                  }
                }
              }
            });
            var infoLabel = this.tag('Info').tag('Label');
            infoLabel.loadTexture(true);
            this.collapsedHeight = (this._hasHeadline ? 114 : 0) + 86;
            this.expandedHeight = this.collapsedHeight + infoLabel.renderHeight + 30;
            this.h = this.collapsedHeight;
          },
          _focus: function _focus() {
            var wrapperH = this.expandedHeight - (this._hasHeadline ? 114 : 0);
            this.patch({
              smooth: {
                h: this.expandedHeight
              },
              FAQWrapper: {
                smooth: {
                  h: wrapperH
                },
                FAQ: {
                  Background: {
                    smooth: {
                      alpha: 1
                    }
                  },
                  Label: {
                    color: this._fc.textFocus
                  }
                },
                Info: {
                  alpha: 1
                },
                BorderBottom: {
                  y: wrapperH - 1
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            var wrapperH = this.collapsedHeight - (this._hasHeadline ? 114 : 0);
            this.patch({
              smooth: {
                h: this.collapsedHeight
              },
              FAQWrapper: {
                smooth: {
                  h: wrapperH
                },
                FAQ: {
                  Background: {
                    smooth: {
                      alpha: 0
                    }
                  },
                  Label: {
                    color: this._fc.text
                  }
                },
                Info: {
                  alpha: 0
                },
                BorderBottom: {
                  y: wrapperH - 1
                }
              }
            });
          }
        };
      }
    }]);

    return FAQItem;
  }(lng.Component);

  var FAQItemScroller =
  /*#__PURE__*/
  function (_lng$Component22) {
    _inherits(FAQItemScroller, _lng$Component22);

    function FAQItemScroller() {
      _classCallCheck(this, FAQItemScroller);

      return _possibleConstructorReturn(this, _getPrototypeOf(FAQItemScroller).apply(this, arguments));
    }

    _createClass(FAQItemScroller, [{
      key: "scrollToFocusedItem",
      value: function scrollToFocusedItem() {
        if (this.focusedItem) {
          var focusPosition = this.getItemCenterPosition();
          var scrollPosition = this.getScrollPosition(focusPosition);

          this._scrollTransition.start(-scrollPosition);
        }
      }
    }, {
      key: "getItemCenterPosition",
      value: function getItemCenterPosition() {
        var items = this.items;
        var total = this.items[0].y;

        for (var i = 0; i < this.index; i++) {
          total += items[i].collapsedHeight;
        }

        total += items[this.index].expandedHeight * 0.5;
        return total;
      }
    }, {
      key: "getScrollPosition",
      value: function getScrollPosition(pos) {
        var s = this.getFullSize();
        var marginStart = this.marginTop || 0;
        var marginEnd = this.marginBottom || 0;
        var maxDistanceStart = 0.5 * this.viewportSize - marginStart;
        var maxDistanceEnd = 0.5 * this.viewportSize - marginEnd;

        if (pos < maxDistanceStart || s < this.viewportSize - (marginStart + marginEnd)) {
          pos = maxDistanceStart;
        } else if (pos > s - maxDistanceEnd) {
          pos = s - maxDistanceEnd;
        }

        return pos - 0.5 * this.viewportSize;
      }
    }, {
      key: "getFullSize",
      value: function getFullSize() {
        var total = 0;
        var items = this.items;

        for (var i = 0; i < this.length; i++) {
          if (i !== this.index) {
            total += items[i].collapsedHeight;
          } else {
            total += items[i].expandedHeight;
          }
        }

        return total;
      }
    }, {
      key: "reposition",
      value: function reposition() {
        var children = this._wrapper.children;
        var offset = 0;
        children.forEach(function (child) {
          if (child) {
            child.y = offset;
          }

          offset += child.h;
        });
      }
    }, {
      key: "navigate",
      value: function navigate(dir) {
        var target = this.index + dir;

        if (-1 < target && target < this.length) {
          this.index = target;
          this.scrollToFocusedItem();
          return true;
        }

        return false;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.focusedItem || this;
      }
    }, {
      key: "index",
      set: function set(i) {
        this._i = i;
      },
      get: function get() {
        return this._i || 0;
      }
    }, {
      key: "items",
      set: function set(items) {
        this._wrapper.children = items;
        this.reposition();
        this.scrollToFocusedItem();
      },
      get: function get() {
        return this._wrapper.children;
      }
    }, {
      key: "viewportSize",
      get: function get() {
        return this.h;
      }
    }, {
      key: "length",
      get: function get() {
        return this._wrapper.children.length;
      }
    }, {
      key: "scrollTransitionSettings",
      get: function get() {
        return this._scrollTransitionSettings;
      }
    }, {
      key: "scrollTransition",
      set: function set(v) {
        this._scrollTransitionSettings.patch(v);
      },
      get: function get() {
        return this._scrollTransition;
      }
    }, {
      key: "focusedItem",
      get: function get() {
        return this.items[this.index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this29 = this;

            this._wrapper = this.tag('Wrapper');

            this._wrapper.onUpdate = function () {
              return _this29.reposition();
            };

            this._scrollTransitionSettings = this.stage.transitions.createSettings({});

            this._wrapper.transition('y', this._scrollTransitionSettings);

            this._scrollTransition = this._wrapper.transition('y');
          },
          _handleUp: function _handleUp() {
            return this.navigate(-1);
          },
          _handleDown: function _handleDown() {
            return this.navigate(1);
          }
        };
      }
    }]);

    return FAQItemScroller;
  }(lng.Component);

  var FAQPage =
  /*#__PURE__*/
  function (_lng$Component23) {
    _inherits(FAQPage, _lng$Component23);

    function FAQPage() {
      _classCallCheck(this, FAQPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(FAQPage).apply(this, arguments));
    }

    _createClass(FAQPage, [{
      key: "switchInfo",
      value: function switchInfo(v) {
        var check = v === 'mediathek';
        this.patch({
          FAQItems: {
            smooth: {
              x: check ? 210 : -1330
            }
          } // PlayerInfo: {smooth: {x: check ? 1750 : 210}}

        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this.state.replace('Active.', '')) || this;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        // this.patch({
        //     FAQItems: {theme},
        //     // PlayerInfo: {theme}
        // })
        this._theme = theme;
        this.tag('FAQItems').items.forEach(function (item) {
          item.theme = theme;
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          FAQItems: {
            type: FAQItemScroller,
            x: 210,
            w: 1500,
            h: 1080,
            marginTop: 160,
            marginBottom: 50 // MediathekInfo: {type: InfoCollection, label: 'Ich habe eine Frage zu Inhalten der ARD Mediathek', x: 210, y: 180},
            // PlayerInfo: {type: InfoCollection, label: 'Ich habe Probleme beim Abspielen von Videos', x: 1750, y: 180}

          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this30 = this;

            this.api.getInfo('faq').then(function (data) {
              var section1faqs = data.section1.faqs;
              var section2faqs = data.section2.faqs;
              var mediathek = Object.keys(section1faqs).map(function (key) {
                return {
                  ref: key.toUpperCase(),
                  item: section1faqs[key],
                  type: FAQItem,
                  theme: _this30._theme
                };
              });
              var playerInfo = Object.keys(section2faqs).map(function (key) {
                return {
                  ref: key.toUpperCase(),
                  item: section2faqs[key],
                  type: FAQItem,
                  theme: _this30._theme
                };
              });
              _this30.tag('FAQItems').items = [].concat(_toConsumableArray(mediathek), _toConsumableArray(playerInfo));
            });
          },
          loadView: 'Show',
          hideView: 'Hide',
          Hide: {
            _enter: function _enter() {
              var _this31 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this31.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this32 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this32.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return 'Active.FAQItems';
            }
          },
          Idle: {
            loadView: 'Show'
          },
          Active: {
            // _exit() {
            //     this.switchInfo('mediathek')
            // },
            _handleUp: function _handleUp() {
              this.signal('outOfBounds', {
                direction: 'up'
              });
            },
            FAQItems: {}
            /*MediathekInfo: {
                _enter() {
                    this.switchInfo('mediathek')
                },
                _handleRight: 'Active.PlayerInfo',
            },
            PlayerInfo: {
                _enter() {
                    this.switchInfo('player')
                },
                _handleLeft: 'Active.MediathekInfo'
            }*/

          }
        };
      }
    }]);

    return FAQPage;
  }(lng.Component);

  var Slider =
  /*#__PURE__*/
  function (_lng$Component24) {
    _inherits(Slider, _lng$Component24);

    function Slider() {
      _classCallCheck(this, Slider);

      return _possibleConstructorReturn(this, _getPrototypeOf(Slider).apply(this, arguments));
    }

    _createClass(Slider, [{
      key: "setNext",
      value: function setNext() {
        if (this.carousel || this.index < this.length - 1) {
          this.setIndex(this.index + 1);
        } else {
          return false;
        }
      }
    }, {
      key: "setPrevious",
      value: function setPrevious() {
        if (this.carousel || this.index > 0) {
          this.setIndex(this.index - 1);
        } else {
          return false;
        }
      }
    }, {
      key: "setIndex",
      value: function setIndex(index) {
        this.lastIndex = this.index;
        var nElements = this.length;

        if (!nElements) {
          return;
        }

        if (index < 0) {
          index += nElements;
        } else {
          index = index % nElements;
        }

        this._focusedItem = this.items[index];
        this.signal('indexChanged', {
          index: index,
          previousIndex: this.lastIndex
        });

        this._scrollToFocusedItem();
      }
    }, {
      key: "_scrollToFocusedItem",
      value: function _scrollToFocusedItem(immediate) {
        if (this.focusedItem) {
          var focusPosition = this.getItemCenterPosition(this.index);
          var scrollPosition = this.getScrollPosition(focusPosition);

          this._scrollTransition.start(-scrollPosition);

          if (immediate) {
            this._scrollTransition.finish();
          }
        }
      }
    }, {
      key: "getItemCenterPosition",
      value: function getItemCenterPosition(index) {
        if (index === -1) return 0;
        var measure = this.orientation === 'horizontal' ? 'w' : 'h';
        var items = this.items;
        var total = 0;

        for (var i = 0; i < index; i++) {
          total += items[i][measure] + this.itemSpacing;
        }

        total += (items[index][measure] + this.itemSpacing) * 0.5;
        return total;
      }
    }, {
      key: "getScrollPosition",
      value: function getScrollPosition(pos) {
        var s = this.getFullSize();
        var marginStart = this.marginLeft || this.marginTop || 0;
        var marginEnd = this.marginRight || this.marginBottom || 0;
        var maxDistanceStart = 0.5 * this.viewportSize - marginStart;
        var maxDistanceEnd = 0.5 * this.viewportSize - marginEnd;

        if (pos < maxDistanceStart || s < this.viewportSize - (marginStart + marginEnd)) {
          pos = maxDistanceStart;
        } else if (pos > s - maxDistanceEnd) {
          pos = s - maxDistanceEnd;
        }

        return pos - 0.5 * this.viewportSize;
      }
    }, {
      key: "getFullSize",
      value: function getFullSize() {
        var total = 0;
        var measure = this.orientation === 'horizontal' ? 'w' : 'h';
        var items = this.items;

        for (var i = 0; i < this.length; i++) {
          total += items[i][measure] + this.itemSpacing;
        }

        return total;
      }
    }, {
      key: "reposition",
      value: function reposition() {
        var _this33 = this;

        //reposition children
        var children = this._wrapper.children;
        var dataItems = this.items;
        var pos = this.orientation === 'horizontal' ? 'x' : 'y';
        var measure = this.orientation === 'horizontal' ? 'w' : 'h';
        var offset = 0; //position items or animate items horizontally

        children.forEach(function (child, index) {
          child[pos] = offset;
          offset += dataItems[index][measure] + _this33.itemSpacing;
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this._focusedItem || this;
      }
    }, {
      key: "focusedItem",
      get: function get() {
        return this._focusedItem;
      }
    }, {
      key: "index",
      get: function get() {
        return this.itemList.getIndex(this._focusedItem);
      }
    }, {
      key: "items",
      get: function get() {
        return this.itemList.get();
      },
      set: function set(children) {
        this.setIndex(0);
        this.itemList.patch(children);

        this._scrollToFocusedItem(true);

        this.reposition();
      }
    }, {
      key: "viewportSize",
      get: function get() {
        return this.orientation === 'horizontal' ? this.w : this.h;
      }
    }, {
      key: "length",
      get: function get() {
        return this.itemList.length;
      }
    }, {
      key: "scrollTransitionSettings",
      get: function get() {
        return this._scrollTransitionSettings;
      }
    }, {
      key: "scrollTransition",
      set: function set(v) {
        this._scrollTransitionSettings.patch(v);
      },
      get: function get() {
        return this._scrollTransition;
      }
    }, {
      key: "orientation",
      set: function set(v) {
        this._o = v;
      },
      get: function get() {
        return this._o || 'horizontal';
      }
    }, {
      key: "carousel",
      set: function set(bool) {
        this._c = bool;
      },
      get: function get() {
        return this._c || false;
      }
    }, {
      key: "itemSpacing",
      get: function get() {
        return this._spacing || 0;
      },
      set: function set(v) {
        this._spacing = v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _construct: function _construct() {
            this.allowVerticalMovement = true;
            this._focusedItem = null;
            this._progressAnimation = null;
            this._scrollTransitionSettings = this.stage.transitions.createSettings({});
          },
          _init: function _init() {
            var _this34 = this;

            this._wrapper = this.tag('Wrapper');

            this._wrapper.onUpdate = function () {
              return _this34.reposition();
            };

            this.itemList = new ListItems(this);
            var or = this.orientation === 'horizontal' ? 'x' : 'y';

            this._wrapper.transition(or, this._scrollTransitionSettings);

            this._scrollTransition = this._wrapper.transition(or);
            return 'Empty';
          },
          _focus: function _focus() {
            if (this.state === 'Empty') {
              this.signal('isEmpty');
            } else {
              this.signal('isFilled');
            }
          },
          empty: 'Empty',
          Empty: {
            filled: 'Filled'
          },
          Filled: {
            _enter: function _enter() {
              this.setIndex(0);
            },
            _handleLeft: function _handleLeft() {
              if (this.orientation === 'horizontal') {
                return this.setPrevious();
              } else {
                return false;
              }
            },
            _handleRight: function _handleRight() {
              if (this.orientation === 'horizontal') {
                return this.setNext();
              } else {
                return false;
              }
            },
            _handleUp: function _handleUp() {
              if (this.orientation === 'vertical') {
                return this.setPrevious();
              } else {
                return false;
              }
            },
            _handleDown: function _handleDown() {
              if (this.orientation === 'vertical') {
                return this.setNext();
              } else {
                return false;
              }
            }
          }
        };
      }
    }]);

    return Slider;
  }(lng.Component);

  var ListItems =
  /*#__PURE__*/
  function (_lng$tools$ObjectList) {
    _inherits(ListItems, _lng$tools$ObjectList);

    function ListItems(list) {
      var _this35;

      _classCallCheck(this, ListItems);

      var wrap = function wrap(item) {
        var parent = item.stage.createView();
        parent.add(item); // if(item._transitions){
        //     parent.transitions = item._transitions
        // }

        return parent;
      };

      _this35 = _possibleConstructorReturn(this, _getPrototypeOf(ListItems).call(this, list._wrapper._children, wrap));
      _this35.list = list;
      return _this35;
    }

    _createClass(ListItems, [{
      key: "onAdd",
      value: function onAdd(item, index) {
        _get(_getPrototypeOf(ListItems.prototype), "onAdd", this).call(this, item, index);

        this.list.fire('filled');
        var currentIndex = this.getIndex(this.list._focusedItem);

        if (index === 0 && currentIndex === 1) {
          // Keep selection on first item.
          this.list.setIndex(0);
        }
      }
    }, {
      key: "onRemove",
      value: function onRemove(item, index) {
        _get(_getPrototypeOf(ListItems.prototype), "onRemove", this).call(this, item, index);

        if (this.list._focusedItem && this.list.index === -1) {
          // Item was removed.
          this.list.setIndex(Math.max(this.list.length - 1, index));
        }

        if (!this.list.length) {
          this.list.fire('empty');
        }
      }
    }, {
      key: "onSet",
      value: function onSet(item, index) {
        _get(_getPrototypeOf(ListItems.prototype), "onSet", this).call(this, item, index);
      }
    }, {
      key: "onSync",
      value: function onSync(removed, added, order) {
        _get(_getPrototypeOf(ListItems.prototype), "onSync", this).call(this, removed, added, order);

        if (order.length) {
          this.list.fire('filled');

          if (this.getIndex(this.list._focusedItem) === -1) {
            this.list.setIndex(0);
          }
        } else {
          this.list.fire('empty');
        }
      }
    }]);

    return ListItems;
  }(lng.tools.ObjectListWrapper);

  var GridList =
  /*#__PURE__*/
  function (_lng$Component25) {
    _inherits(GridList, _lng$Component25);

    function GridList() {
      _classCallCheck(this, GridList);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridList).apply(this, arguments));
    }

    _createClass(GridList, [{
      key: "update",
      value: function update() {
        var _this36 = this;

        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.widget || force) {
          var _this$widget = this.widget,
              _this$widget$title = _this$widget.title,
              title = _this$widget$title === void 0 ? '' : _this$widget$title,
              titleVisible = _this$widget.titleVisible,
              teasers = _this$widget.teasers;
          var _this$theme$moduleTit = this.theme.moduleTitle,
              background = _this$theme$moduleTit.background,
              text = _this$theme$moduleTit.text;
          this.patch({
            Background: {
              visible: !!background,
              color: background || 0xff00000000
            },
            Title: {
              alpha: !!titleVisible,
              x: background ? 125 : 115,
              color: text,
              text: {
                text: title || ''
              }
            },
            Slider: {
              y: titleVisible ? 75 : 20,
              items: teasers.map(function (teaser, index) {
                return {
                  ref: "T".concat(teaser.id),
                  index: index,
                  headerOnly: false,
                  parentId: _this36.widget.id,
                  item: teaser,
                  base: 'list',
                  type: GridCell,
                  channel: _this36.channel,
                  theme: _this36.theme
                };
              })
            }
          });
          var slider = this.tag('Slider');
          var h = 0;
          slider.items.forEach(function (item) {
            if (item.h > h) {
              h = item.h;
            }
          });
          slider.h = h;
          this.h = slider.y + slider.h;
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('Slider');
      }
    }, {
      key: "widget",
      set: function set(v) {
        this._widget = v;

        if (this.enabled) {
          this.update();
        }
      },
      get: function get() {
        return this._widget;
      }
    }, {
      key: "item",
      get: function get() {
        return this.tag('Slider').focusedItem.item;
      }
    }, {
      key: "dataLength",
      get: function get() {
        return this.tag('Slider').length;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          clipbox: true,
          Background: {
            x: 115,
            y: -10,
            h: 68,
            rect: true
          },
          Title: {
            x: 115,
            text: {
              text: 'test',
              fontSize: 40,
              maxLines: 1,
              fontFace: 'TheSansB4'
            }
          },
          Slider: {
            carousel: false,
            w: 1920,
            itemSpacing: 16,
            type: Slider,
            marginLeft: 115,
            marginRight: 115
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this37 = this;

            var label = this.tag('Title');
            label.on('txLoaded', function () {
              _this37.tag('Background').w = label.renderWidth + 20;
            });
            this.on('firstEnabled', function () {
              console.log("firstEnabled", label.text.text);
            });
          },
          _firstEnable: function _firstEnable() {
            this.update();
          }
        };
      }
    }]);

    return GridList;
  }(lng.Component);

  var StageSlider =
  /*#__PURE__*/
  function (_lng$Component26) {
    _inherits(StageSlider, _lng$Component26);

    function StageSlider() {
      _classCallCheck(this, StageSlider);

      return _possibleConstructorReturn(this, _getPrototypeOf(StageSlider).apply(this, arguments));
    }

    _createClass(StageSlider, [{
      key: "navigate",
      value: function navigate(dir) {
        if (this.dataLength === 1) {
          return;
        }

        var copy = [].concat(_toConsumableArray(this.items));
        var item = null;

        if (dir === 'left') {
          item = copy.pop();
          item.x = copy[0].x - item.w;
          copy.unshift(item);
        } else {
          item = copy.shift();
          var lastChild = copy[copy.length - 1];
          item.x = lastChild.x + lastChild.w;
          copy.push(item);
        } // item.shifted = true


        this._wrapper.children = copy; // this._scrollToFocusedItem()

        this._scrollTransition.start(this.x - (this.focusedItem.x - this.marginLeft)); // if (immediate) {
        //     this._scrollTransition.finish();
        // }

      }
    }, {
      key: "setNext",
      value: function setNext() {
        if (this.carousel || this.index < this.length - 1) {
          this.setIndex(this.index + 1);
        } else {
          this.signal('outOfBounds', {
            direction: this.orientation === 'horizontal' ? 'right' : 'down'
          });
        }

        this.signal('setNext');
      }
    }, {
      key: "setPrevious",
      value: function setPrevious() {
        if (this.carousel || this.index > 0) {
          this.setIndex(this.index - 1);
        } else {
          this.signal('outOfBounds', {
            direction: this.orientation === 'horizontal' ? 'left' : 'up'
          });
        }

        this.signal('setPrevious');
      }
    }, {
      key: "setIndex",
      value: function setIndex(index) {
        var dir = 'left';

        if (index > this.index) {
          dir = 'right';
        }

        this.lastIndex = this.index;
        var nElements = this.dataLength;

        if (!nElements) {
          return;
        }

        if (index < 0) {
          index += nElements;
        } else {
          index = index % nElements;
        }

        this.index = index;
        this.signal('indexChanged', {
          index: index,
          previousIndex: this.lastIndex
        });
        this.navigate(dir); // this._scrollToFocusedItem()
      }
    }, {
      key: "_scrollToFocusedItem",
      value: function _scrollToFocusedItem(immediate) {
        if (this.focusedItem) {
          var focusPosition = this.getItemCenterPosition(this.center);
          var scrollPosition = this.getScrollPosition(focusPosition);

          this._scrollTransition.start(-scrollPosition);

          if (immediate) {
            this._scrollTransition.finish();
          }
        }
      }
    }, {
      key: "getItemCenterPosition",
      value: function getItemCenterPosition(index) {
        if (index === -1) return 0;
        var measure = this.orientation === 'horizontal' ? 'w' : 'h';
        var items = this.items;
        var total = 0;

        for (var i = 0; i < index; i++) {
          total += items[i][measure] + this.itemSpacing;
        }

        total += (items[index][measure] + this.itemSpacing) * 0.5;
        return total;
      }
    }, {
      key: "getScrollPosition",
      value: function getScrollPosition(pos) {
        var s = this.getFullSize();
        var marginStart = this.marginLeft || this.marginTop || 0;
        var marginEnd = this.marginRight || this.marginBottom || 0;
        var maxDistanceStart = 0.5 * this.viewportSize - marginStart;
        var maxDistanceEnd = 0.5 * this.viewportSize - marginEnd;

        if (pos < maxDistanceStart || s < this.viewportSize - (marginStart + marginEnd)) {
          pos = maxDistanceStart;
        } else if (pos > s - maxDistanceEnd) {
          pos = s - maxDistanceEnd;
        }

        return pos - 0.5 * this.viewportSize;
      }
    }, {
      key: "getFullSize",
      value: function getFullSize() {
        var total = 0;
        var measure = this.orientation === 'horizontal' ? 'w' : 'h';
        var items = this.items;

        for (var i = 0; i < this.length; i++) {
          total += items[i][measure] + this.itemSpacing;
        }

        return total;
      }
    }, {
      key: "reposition",
      value: function reposition() {
        var _this38 = this;

        //reposition wrapper
        // const focusPosition = this.getItemCenterPosition(this.index)
        // const scrollPosition = this.getScrollPosition(focusPosition)
        //
        // if (-scrollPosition !== this._scrollTransition.targetValue) {
        //     if (this._scrollTransition.p === 1) {
        //         this._wrapper.x = -scrollPosition
        //     } else {
        //         this._scrollTransition.reset(-scrollPosition, this._scrollTransition.p)
        //     }
        // }
        //reposition children
        var children = this._wrapper.children;
        var dataItems = this.items;
        var pos = this.orientation === 'horizontal' ? 'x' : 'y';
        var measure = this.orientation === 'horizontal' ? 'w' : 'h';
        var offset = 0; //position items or animate items horizontally

        children.forEach(function (child, index) {
          if (!child.exists) {
            child[pos] = offset;
          }

          offset += dataItems[index][measure] + _this38.itemSpacing;
          child.exists = true;
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.focusedItem || this;
      }
    }, {
      key: "focusedItem",
      get: function get() {
        return this.items[this.center];
      }
    }, {
      key: "index",
      set: function set(i) {
        this._i = i;
      },
      get: function get() {
        return this._i;
      }
    }, {
      key: "items",
      get: function get() {
        return this._wrapper.children;
      },
      set: function set(children) {
        this.index = 0;
        this.dataLength = children.length;

        if (this.dataLength > 1 && this.dataLength < this.visibleCells) {
          children = [].concat(_toConsumableArray(children), _toConsumableArray(children));
        } else if (this.dataLength === 1) {
          children = [].concat(_toConsumableArray(children), _toConsumableArray(children), _toConsumableArray(children));
        }

        var l = children.length;
        var split = (l - l % 2) / 2;
        var splice = children.splice(split + l % 2);
        var newChildren = [].concat(_toConsumableArray(splice), _toConsumableArray(children));
        this._wrapper.children = newChildren;
        this.center = split;

        this._scrollToFocusedItem(); // this.setIndex(split)

      }
    }, {
      key: "viewportSize",
      get: function get() {
        return this.orientation === 'horizontal' ? this.w : this.h;
      }
    }, {
      key: "dataLength",
      set: function set(v) {
        this._dataLength = v;
      },
      get: function get() {
        return this._dataLength;
      }
    }, {
      key: "length",
      get: function get() {
        return this._wrapper.children.length;
      }
    }, {
      key: "scrollTransitionSettings",
      get: function get() {
        return this._scrollTransitionSettings;
      }
    }, {
      key: "scrollTransition",
      set: function set(v) {
        this._scrollTransitionSettings.patch(v);
      },
      get: function get() {
        return this._scrollTransition;
      }
    }, {
      key: "visibleCells",
      get: function get() {
        return 3;
      }
    }, {
      key: "orientation",
      set: function set(v) {
        this._o = v;
      },
      get: function get() {
        return this._o || 'horizontal';
      }
    }, {
      key: "carousel",
      set: function set(bool) {
        this._c = bool;
      },
      get: function get() {
        return this._c || false;
      }
    }, {
      key: "itemSpacing",
      get: function get() {
        return this._spacing || 0;
      },
      set: function set(v) {
        this._spacing = v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _construct: function _construct() {
            this.allowVerticalMovement = true;
            this._focusedItem = null;
            this._progressAnimation = null;
            this._scrollTransitionSettings = this.stage.transitions.createSettings({});
          },
          _init: function _init() {
            var _this39 = this;

            this._wrapper = this.tag('Wrapper');

            this._wrapper.onUpdate = function () {
              return _this39.reposition();
            };

            this.itemList = new ListItems$1(this);
            var or = this.orientation === 'horizontal' ? 'x' : 'y';

            this._wrapper.transition(or, this._scrollTransitionSettings);

            this._scrollTransition = this._wrapper.transition(or);
          },
          _focus: function _focus() {
            if (this.state === 'Empty') {
              this.signal('isEmpty');
            } else {
              this.signal('isFilled');
            }
          },
          _enter: function _enter() {// this.setIndex(0)
          },
          _handleLeft: function _handleLeft() {
            // this.navigate('left')
            this.setPrevious();
          },
          _handleRight: function _handleRight() {
            // this.navigate('right')
            this.setNext();
          },
          _handleUp: function _handleUp() {
            return false;
          },
          _handleDown: function _handleDown() {
            return false;
          }
        };
      }
    }]);

    return StageSlider;
  }(lng.Component);

  var ListItems$1 =
  /*#__PURE__*/
  function (_lng$tools$ObjectList2) {
    _inherits(ListItems$1, _lng$tools$ObjectList2);

    function ListItems$1(list) {
      var _this40;

      _classCallCheck(this, ListItems$1);

      var wrap = function wrap(item) {
        var parent = item.stage.createView();
        parent.add(item); // if(item._transitions){
        //     parent.transitions = item._transitions
        // }

        return parent;
      };

      _this40 = _possibleConstructorReturn(this, _getPrototypeOf(ListItems$1).call(this, list._wrapper._children, wrap));
      _this40.list = list;
      return _this40;
    }

    _createClass(ListItems$1, [{
      key: "onAdd",
      value: function onAdd(item, index) {
        _get(_getPrototypeOf(ListItems$1.prototype), "onAdd", this).call(this, item, index);

        this.list.fire('filled');
        var currentIndex = this.getIndex(this.list._focusedItem);

        if (index === 0 && currentIndex === 1) {
          // Keep selection on first item.
          this.list.setIndex(0);
        }
      }
    }, {
      key: "onRemove",
      value: function onRemove(item, index) {
        _get(_getPrototypeOf(ListItems$1.prototype), "onRemove", this).call(this, item, index);

        if (this.list._focusedItem && this.list.index === -1) {
          // Item was removed.
          this.list.setIndex(Math.max(this.list.length - 1, index));
        }

        if (!this.list.length) {
          this.list.fire('empty');
        }
      }
    }, {
      key: "onSet",
      value: function onSet(item, index) {
        _get(_getPrototypeOf(ListItems$1.prototype), "onSet", this).call(this, item, index);
      }
    }, {
      key: "onSync",
      value: function onSync(removed, added, order) {
        _get(_getPrototypeOf(ListItems$1.prototype), "onSync", this).call(this, removed, added, order);

        if (order.length) {
          this.list.fire('filled');

          if (this.getIndex(this.list._focusedItem) === -1) {
            this.list.setIndex(0);
          }
        } else {
          this.list.fire('empty');
        }
      }
    }]);

    return ListItems$1;
  }(lng.tools.ObjectListWrapper);

  var StageCell =
  /*#__PURE__*/
  function (_lng$Component27) {
    _inherits(StageCell, _lng$Component27);

    function StageCell() {
      _classCallCheck(this, StageCell);

      return _possibleConstructorReturn(this, _getPrototypeOf(StageCell).apply(this, arguments));
    }

    _createClass(StageCell, null, [{
      key: "_template",
      value: function _template() {
        return {
          w: 1690,
          h: 774,
          zIndex: 0,
          pivotY: 0,
          BackgroundShadow: {
            alpha: 0,
            mountX: 0.5,
            x: 845,
            y: 0,
            texture: lng.Tools.getShadowRect(1710, 734, 0, 30, 50)
          },
          Wrapper: {
            w: 1690,
            h: 774,
            clipping: true,
            Image: {
              transitions: {
                scale: {
                  duration: 0.7
                }
              }
            },
            OverlayShadow: {
              alpha: 1,
              w: 1690,
              h: 300,
              y: 474,
              rect: true
            },
            Headline: {
              y: 775 - 53 - 35,
              mountX: 0.5,
              x: 845,
              mountY: 1,
              w: 882,
              text: {
                text: 'This is the headline text',
                fontSize: 50,
                fontFace: 'TheSansB6',
                textAlign: 'center'
              }
            },
            Subline: {
              y: 775 - 53,
              mountX: 0.5,
              mountY: 1,
              x: 845,
              text: {
                text: 'This is the subline text',
                fontSize: 30,
                fontFace: 'TheSansB4',
                textAlign: 'center'
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var sublineLabel = this.tag('Subline');
            var headlineLabel = this.tag('Headline');
            sublineLabel.on('txLoaded', function () {
              var sublineHeight = sublineLabel.renderHeight;
              headlineLabel.y = sublineLabel.y;

              if (sublineHeight > 0) {
                headlineLabel.y -= sublineHeight - 10;
              }
            });
            var _this$item4 = this.item,
                image = _this$item4.images.aspect16x9,
                shortTitle = _this$item4.shortTitle,
                publicationService = _this$item4.publicationService,
                show = _this$item4.show,
                duration = _this$item4.duration;
            var subline = [];
            var d = Math.ceil(duration / 60);

            if (d > 0) {
              subline.push("".concat(d, " Min."));
            }

            if (publicationService && show) {
              subline.push(show.title);

              if (this.channel === 'ard') {
                subline.push(publicationService.name);
              }
            }

            var _this$theme2 = this.theme,
                globalShadow = _this$theme2.globalShadow,
                _this$theme2$stage = _this$theme2.stage,
                hColor = _this$theme2$stage.headline,
                sColor = _this$theme2$stage.subline,
                shadow = _this$theme2$stage.shadow;
            this.patch({
              BackgroundShadow: {
                color: globalShadow
              },
              Wrapper: {
                Image: {
                  src: ux.Ui.getImageUrl(image.src.replace('{width}', 1690), {
                    width: 1690,
                    height: 774,
                    type: 'crop'
                  })
                },
                OverlayShadow: {
                  colorBottom: shadow,
                  colorTop: 0x00ffffff
                },
                Headline: {
                  color: hColor,
                  text: {
                    text: shortTitle
                  }
                },
                Subline: {
                  alpha: !!subline.length,
                  color: sColor,
                  text: {
                    text: subline.length && subline.join(" \u2022 ") || ''
                  }
                }
              }
            });
          },
          _focus: function _focus(e) {
            var delay = 0.5;
            this.patch({
              transitions: {
                scale: {
                  delay: delay
                }
              },
              smooth: {
                zIndex: 1,
                scale: 1.05
              },
              BackgroundShadow: {
                transitions: {
                  alpha: {
                    delay: delay
                  }
                },
                smooth: {
                  alpha: 1
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              transitions: {
                scale: {
                  delay: 0
                }
              },
              smooth: {
                zIndex: 0,
                scale: 1
              },
              BackgroundShadow: {
                transitions: {
                  alpha: {
                    delay: 0
                  }
                },
                smooth: {
                  alpha: 0
                }
              }
            });
          }
        };
      }
    }]);

    return StageCell;
  }(lng.Component);

  var ArdStageIndicatorBullet =
  /*#__PURE__*/
  function (_lng$Component28) {
    _inherits(ArdStageIndicatorBullet, _lng$Component28);

    function ArdStageIndicatorBullet() {
      _classCallCheck(this, ArdStageIndicatorBullet);

      return _possibleConstructorReturn(this, _getPrototypeOf(ArdStageIndicatorBullet).apply(this, arguments));
    }

    _createClass(ArdStageIndicatorBullet, null, [{
      key: "_template",
      value: function _template() {
        return {
          w: 24,
          h: 24,
          renderToTexture: true,
          colorizeResultTexture: true,
          Shader: {
            shader: {
              type: lng.shaders.RadialFilter,
              radius: 12,
              cutoff: 1
            },
            Background: {
              w: 24,
              h: 24,
              rect: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.scale = 0.5;
            this.patch({
              color: this.colors.bullet
            });
          },
          _focus: function _focus() {
            this.patch({
              smooth: {
                scale: 1,
                color: this.colors.activeBullet
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              smooth: {
                scale: 0.55,
                color: this.colors.bullet
              }
            });
          }
        };
      }
    }]);

    return ArdStageIndicatorBullet;
  }(lng.Component);

  var StageIndicator =
  /*#__PURE__*/
  function (_lng$Component29) {
    _inherits(StageIndicator, _lng$Component29);

    function StageIndicator() {
      _classCallCheck(this, StageIndicator);

      return _possibleConstructorReturn(this, _getPrototypeOf(StageIndicator).apply(this, arguments));
    }

    _createClass(StageIndicator, [{
      key: "generateBullets",
      value: function generateBullets(amount) {
        var bullets = [];

        for (var i = 0; i < amount; i++) {
          bullets.push({
            ref: "Bullet".concat(i),
            x: i * 28,
            type: ArdStageIndicatorBullet,
            colors: this.cparent.theme.stage
          });
        }

        return bullets;
      }
    }, {
      key: "items",
      set: function set(int) {
        this.patch({
          Wrapper: {
            children: this.generateBullets(int)
          }
        });
        this.index = 0;
      }
    }, {
      key: "currentBullet",
      get: function get() {
        return this.tag('Wrapper').children[this.index];
      }
    }, {
      key: "index",
      set: function set(int) {
        if (int !== this.index) {
          if (this.currentBullet) {
            this.currentBullet.fire('_unfocus');
          }

          this._i = int;
          this.currentBullet.fire('_focus');
        }
      },
      get: function get() {
        return this._i;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          Wrapper: {}
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var wrapper = this.tag('Wrapper');

            wrapper.onUpdate = function () {
              var children = wrapper.children;
              var lastChild = children[children.length - 1];

              if (lastChild) {
                var wrapperW = lastChild.x + lastChild.w;
                wrapper.x = (1920 - wrapperW) / 2;
              }
            };
          }
        };
      }
    }]);

    return StageIndicator;
  }(lng.Component);

  var StageList =
  /*#__PURE__*/
  function (_lng$Component30) {
    _inherits(StageList, _lng$Component30);

    function StageList() {
      _classCallCheck(this, StageList);

      return _possibleConstructorReturn(this, _getPrototypeOf(StageList).apply(this, arguments));
    }

    _createClass(StageList, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('Slider');
      }
    }, {
      key: "setNextTimeout",
      value: function setNextTimeout() {
        var _this41 = this;

        this.clearNextTimeout();
        this._timeout = setTimeout(function () {
          _this41.tag('Slider').fire('_handleRight');

          _this41.setNextTimeout();
        }, 5000);
      }
    }, {
      key: "clearNextTimeout",
      value: function clearNextTimeout() {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
      }
    }, {
      key: "item",
      get: function get() {
        return this.tag('Slider').focusedItem.item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 845,
          w: 1920,
          clipbox: true,
          Slider: {
            carousel: true,
            w: 1920,
            type: StageSlider,
            itemSpacing: 0,
            marginLeft: 115,
            marginRight: 115,
            signals: {
              indexChanged: 'sliderIndexChanged',
              setNext: true,
              setPrevious: true
            }
          },
          Indicators: {
            zIndex: 4,
            y: 775 + 55,
            h: 50,
            type: StageIndicator
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this42 = this;

            var _this$widget2 = this.widget,
                size = _this$widget2.size,
                teasers = _this$widget2.teasers;
            this.patch({
              Slider: {
                items: teasers.map(function (teaser) {
                  return {
                    ref: "T".concat(teaser.id),
                    parentId: _this42.widget.id,
                    item: teaser,
                    size: size,
                    type: StageCell,
                    channel: _this42.channel,
                    theme: _this42.theme
                  };
                })
              },
              Indicators: {
                items: teasers.length
              }
            });
            this.setNextTimeout();
          },
          _unfocus: function _unfocus() {
            this.clearNextTimeout();
          },
          setNext: function setNext() {
            this.clearNextTimeout();
          },
          setPrevious: function setPrevious() {
            this.clearNextTimeout();
          },
          sliderIndexChanged: function sliderIndexChanged(e) {
            this.tag('Indicators').index = e.index || 0;
          }
        };
      }
    }]);

    return StageList;
  }(lng.Component);

  var MainPage =
  /*#__PURE__*/
  function (_lng$Component31) {
    _inherits(MainPage, _lng$Component31);

    function MainPage() {
      _classCallCheck(this, MainPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(MainPage).apply(this, arguments));
    }

    _createClass(MainPage, [{
      key: "update",
      value: function update(data) {
        var _this43 = this;

        var theme = this.theme;
        this.tag('VerticalSlider').items = data.widgets.map(function (widget) {
          return {
            ref: "W".concat(widget.id),
            theme: theme,
            widget: widget,
            type: widget.type === 'gridlist' ? GridList : StageList,
            channel: _this43.api.currentChannel
          };
        });
        this.fire('finishedLoading');
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.state === 'Active') {
          return this.tag('VerticalSlider');
        }

        return this;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._theme = theme;
      },
      get: function get() {
        return this._theme;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          boundsMargin: [150, 200, 150, 200],
          w: 1920,
          h: 1080,
          VerticalSlider: {
            w: 1920,
            h: 1080,
            type: Slider,
            orientation: 'vertical',
            marginBottom: 80,
            marginTop: 0,
            itemSpacing: 45,
            signals: {
              indexChanged: true,
              outOfBounds: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.index = 0;
            this.currentContent = null;
            return 'Active';
          },
          loadView: function loadView(_ref14) {
            var _this44 = this;

            var isPreviousView = _ref14.isPreviousView,
                _ref14$toLoad$persist = _ref14.toLoad.persist,
                _ref14$toLoad$persist2 = _ref14$toLoad$persist.type,
                type = _ref14$toLoad$persist2 === void 0 ? null : _ref14$toLoad$persist2,
                _ref14$toLoad$persist3 = _ref14$toLoad$persist.data,
                data = _ref14$toLoad$persist3 === void 0 ? null : _ref14$toLoad$persist3;
            this.isPreviousView = isPreviousView;

            if (!isPreviousView && !data) {
              this.fire('loading');

              if (type === 'alle') {
                type = 'ard';
              }

              this.api.getMainPageData(type).then(function (response) {
                _this44.update(response);
              });
            } else if (!isPreviousView) {
              this.fire('loading');
              this.update(data);
            } else {
              return 'Show';
            }
          },
          loading: 'Loading',
          finishedLoading: 'Show',
          Loading: {
            finished: 'Show'
          },
          Hide: {
            _enter: function _enter() {
              var _this45 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this45.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this46 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this46.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return 'Active';
            }
          },
          Idle: {},
          Active: {
            _enter: function _enter() {
              if (!this.isPreviousView) {
                this.tag('VerticalSlider').setIndex(0);
              }
            },
            hideView: 'Hide',
            indexChanged: function indexChanged(e) {
              if (e.index === 0) {
                this.hasToolbarHidden = false;
                this.signal('showToolbar');
              } else {
                this.hasToolbarHidden = true;
                this.signal('hideToolbar');
              }
            },
            _handleEnter: function _handleEnter() {
              var item = this.tag('VerticalSlider').focusedItem.item;

              switch (item.type) {
                case 'live':
                  this.signal('switchView', {
                    view: 'ComingSoon',
                    persist: {
                      type: 'live'
                    },
                    ignore: true
                  });
                  break;

                case 'show':
                  this.signal('switchView', {
                    view: 'ShowPage',
                    persist: {
                      targetId: item.links.target.id
                    }
                  });
                  break;

                default:
                  this.signal('switchView', {
                    view: 'Player',
                    persist: {
                      targetId: item.links.target.id
                    },
                    ignore: true
                  });
                  break;
              }
            }
          }
        };
      }
    }]);

    return MainPage;
  }(lng.Component);

  var PlayerShader =
  /*#__PURE__*/
  function (_lng$shaders$WebGLDef) {
    _inherits(PlayerShader, _lng$shaders$WebGLDef);

    function PlayerShader(context) {
      var _this47;

      _classCallCheck(this, PlayerShader);

      _this47 = _possibleConstructorReturn(this, _getPrototypeOf(PlayerShader).call(this, context));
      _this47._x = 0;
      _this47._y = 0;
      _this47._mountX = 0;
      _this47._radius = 100;
      _this47._colors = [0x33000000, 0xFF000000];

      _this47._updateColors();

      return _this47;
    }

    _createClass(PlayerShader, [{
      key: "_updateColors",
      value: function _updateColors() {
        var arr = [];

        this._colors.forEach(function (color) {
          var col = lng.StageUtils.getRgbaComponentsNormalized(color);
          col[0] *= col[3];
          col[1] *= col[3];
          col[2] *= col[3];
          arr = arr.concat(col);
        });

        this._rawColors = new Float32Array(arr);
        this.redraw();
      }
    }, {
      key: "setupUniforms",
      value: function setupUniforms(operation) {
        _get(_getPrototypeOf(PlayerShader.prototype), "setupUniforms", this).call(this, operation);

        var x = this._x * this.ctx.stage.getRenderPrecision();
        var y = this._y * this.ctx.stage.getRenderPrecision();
        var radius = this._radius * this.ctx.stage.getRenderPrecision();
        var rtc = operation.getNormalRenderTextureCoords(x, y);

        this._setUniform("center", rtc, this.gl.uniform2fv);

        this._setUniform("colors", this._rawColors, this.gl.uniform4fv);

        this._setUniform("radius", 2 * radius / operation.getRenderWidth(), this.gl.uniform1f);
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(v) {
        this._x = v;
        this.redraw();
      }
    }, {
      key: "mountX",
      get: function get() {
        return this._mountX;
      },
      set: function set(v) {
        this._mountX = v;
        this.redraw();
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(v) {
        this._y = v;
        this.redraw();
      }
    }, {
      key: "radius",
      get: function get() {
        return this._radius;
      },
      set: function set(v) {
        this._radius = v;
        this.redraw();
      }
    }, {
      key: "color1",
      set: function set(v) {
        this._colors[0] = v;

        this._updateColors();
      }
    }, {
      key: "color2",
      set: function set(v) {
        this._colors[1] = v;

        this._updateColors();
      }
    }]);

    return PlayerShader;
  }(lng.shaders.WebGLDefaultShader);

  PlayerShader.vertexShaderSource = "\n    #ifdef GL_ES\n    precision lowp float;\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    uniform vec2 center;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec2 delta;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        \n        delta = gl_Position.xy - center;\n        \n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n";
  PlayerShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    precision lowp float;\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec2 delta;\n    uniform float radius;\n    uniform sampler2D uSampler;\n    uniform vec2 projection;\n    uniform vec4 colors[2];\n    void main(void){\n        float dist = length(delta);\n        vec4 color = vec4(colors[0][0], colors[0][1], colors[0][2], colors[0][3]);\n        vec4 shadowColor = vec4(colors[1][0], colors[1][1], colors[1][2], colors[1][3]);\n        gl_FragColor = mix(color, shadowColor, sin(dist-radius));   \n    }\n";

  var ProgressBar =
  /*#__PURE__*/
  function (_lng$Component32) {
    _inherits(ProgressBar, _lng$Component32);

    function ProgressBar() {
      _classCallCheck(this, ProgressBar);

      return _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).apply(this, arguments));
    }

    _createClass(ProgressBar, [{
      key: "formatTime",
      value: function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        seconds = Math.floor(seconds);
        var parts = [];
        parts.push(minutes);
        parts.push(seconds);
        return parts.map(function (number) {
          return number < 10 ? "0" + number : "" + number;
        }).join(":");
      }
    }, {
      key: "calcThroth",
      value: function calcThroth(_ref15) {
        var currentTime = _ref15.currentTime,
            duration = _ref15.duration;
        var now = Date.now();
        var v = currentTime / Math.max(duration, 1);
        var estimation = 0;

        if (!this._last || this._last < now - 1000) {
          estimation = 500;
        } else {
          estimation = now - this._last;
        }

        this._last = now;
        var offset = v * 1490;
        estimation *= 0.001;
        return {
          offset: offset,
          estimation: estimation
        };
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          CurrentTime: {
            color: theme.toolbar.text
          },
          Progress: {
            Bar: {
              color: theme.live.background,
              Troth: {
                color: theme.focus
              }
            },
            BulletShadow: {
              color: theme.globalShadow
            },
            Bullet: {
              color: theme.toolbar.text
            }
          },
          EndTime: {
            color: theme.toolbar.text
          }
        });
      }
    }, {
      key: "seeking",
      set: function set(obj) {
        var calc = this.calcThroth(obj);
        this.patch({
          Progress: {
            BulletShadow: {
              transitions: {
                x: {
                  timingFunction: 'linear',
                  duration: calc.estimation
                }
              },
              smooth: {
                x: calc.offset
              }
            },
            Bullet: {
              transitions: {
                x: {
                  timingFunction: 'linear',
                  duration: calc.estimation
                }
              },
              smooth: {
                x: calc.offset
              }
            }
          },
          EndTime: {
            text: {
              text: this.formatTime(obj.duration - obj.currentTime)
            }
          }
        });
      }
    }, {
      key: "progress",
      set: function set(obj) {
        var calc = this.calcThroth(obj);
        this.patch({
          CurrentTime: {
            text: {
              text: this.formatTime(obj.currentTime)
            }
          },
          Progress: {
            Bar: {
              Troth: {
                transitions: {
                  w: {
                    timingFunction: 'linear',
                    duration: calc.estimation
                  }
                },
                smooth: {
                  w: calc.offset
                }
              }
            },
            BulletShadow: {
              transitions: {
                x: {
                  timingFunction: 'linear',
                  duration: calc.estimation
                }
              },
              smooth: {
                x: calc.offset
              }
            },
            Bullet: {
              transitions: {
                x: {
                  timingFunction: 'linear',
                  duration: calc.estimation
                }
              },
              smooth: {
                x: calc.offset
              }
            }
          },
          EndTime: {
            text: {
              text: this.formatTime(obj.duration - obj.currentTime)
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          CurrentTime: {
            x: 115,
            text: {
              text: '00:00',
              fontFace: 'TheSansB4',
              fontSize: 30
            }
          },
          Progress: {
            x: 215,
            y: 17,
            Bar: {
              w: 1490,
              h: 8,
              color: 0x99ffffff,
              rect: true,
              clipping: true,
              Troth: {
                w: 1,
                h: 8,
                color: 0xff00ff00,
                rect: true
              }
            },
            BulletShadow: {
              y: 4,
              mount: 0.5,
              texture: lng.Tools.getShadowRect(45, 45, 25, 10, 10)
            },
            Bullet: {
              y: 4,
              mount: 0.5,
              texture: lng.Tools.getRoundRect(40, 40, 20, 0, 0xffffffff, true, 0xffffffff)
            }
          },
          EndTime: {
            mountX: 1,
            x: 1805,
            text: {
              text: '99:99',
              fontFace: 'TheSansB4',
              fontSize: 30
            }
          }
        };
      }
    }]);

    return ProgressBar;
  }(lng.Component);

  var PlayerButton =
  /*#__PURE__*/
  function (_lng$Component33) {
    _inherits(PlayerButton, _lng$Component33);

    function PlayerButton() {
      _classCallCheck(this, PlayerButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerButton).apply(this, arguments));
    }

    _createClass(PlayerButton, [{
      key: "toggle",
      value: function toggle() {
        var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.toggleActive;

        if (this.canToggle) {
          this.patch({
            Icon: {
              alpha: !!!active
            },
            ToggleIcon: {
              alpha: !!active
            }
          });
          this.toggleActive = active;
        }
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Background: {
            Shadow: {
              color: theme.globalShadow
            },
            Fill: {
              color: theme.focus
            }
          },
          Icon: {
            color: theme.toolbar.text
          }
        });
      }
    }, {
      key: "disabled",
      set: function set(v) {
        this.setSmooth('alpha', v ? 0.5 : 1);
        this._disabled = v;
      },
      get: function get() {
        return this._disabled;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            alpha: 0,
            Shadow: {
              mount: 0.5
            },
            Fill: {
              mount: 0.5
            }
          },
          Icon: {
            mount: 0.5,
            type: IconItem
          },
          ToggleIcon: {
            mount: 0.5,
            type: IconItem
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this$size = this.size,
                _this$size$w = _this$size.w,
                w = _this$size$w === void 0 ? 218 : _this$size$w,
                _this$size$h = _this$size.h,
                h = _this$size$h === void 0 ? 218 : _this$size$h;
            var _this$icon2 = this.icon,
                icon = _this$icon2.icon,
                _this$icon2$toggleIco = _this$icon2.toggleIcon,
                toggleIcon = _this$icon2$toggleIco === void 0 ? false : _this$icon2$toggleIco,
                size = _this$icon2.size;
            this.disabled = false;
            this.canToggle = !!toggleIcon;
            this.toggleActive = false;
            this.patch({
              Background: {
                Shadow: {
                  texture: lng.Tools.getShadowRect(w + 10, h + 10, (w + 10) / 2, 10, 10)
                },
                Fill: {
                  texture: lng.Tools.getRoundRect(w, h, w / 2, 0, 0xffffffff, true, 0xffffffff)
                }
              },
              Icon: {
                icon: {
                  src: "icons/player/".concat(icon, ".svg"),
                  w: size,
                  h: size
                }
              },
              ToggleIcon: {
                alpha: 0,
                icon: this.canToggle ? {
                  src: "icons/player/".concat(toggleIcon, ".svg"),
                  w: size,
                  h: size
                } : {
                  src: null
                }
              }
            });
          },
          _focus: function _focus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 1,
                  scale: 1
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 0,
                  scale: 0
                }
              }
            });
          }
        };
      }
    }]);

    return PlayerButton;
  }(lng.Component);

  var PlayerButtonList =
  /*#__PURE__*/
  function (_ItemList2) {
    _inherits(PlayerButtonList, _ItemList2);

    function PlayerButtonList() {
      _classCallCheck(this, PlayerButtonList);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerButtonList).apply(this, arguments));
    }

    _createClass(PlayerButtonList, [{
      key: "targetHasData",
      value: function targetHasData(dir) {
        var i = this._index + dir;
        var l = this.length;

        for (i; dir < 0 && i > -1 || dir > 0 && i < l; i += dir) {
          if (!this.items[i].disabled) {
            return i;
          }
        }

        return -1;
      }
    }, {
      key: "focusPlayButton",
      value: function focusPlayButton() {
        this.index = this.items.indexOf(this.tag('PLAY'));
      }
    }, {
      key: "focusRewindButton",
      value: function focusRewindButton() {
        this.index = this.items.indexOf(this.tag('REWIND'));
      }
    }, {
      key: "focusForwardButton",
      value: function focusForwardButton() {
        this.index = this.items.indexOf(this.tag('FORWARD'));
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._theme = theme;
      }
    }, {
      key: "playerButtons",
      set: function set(list) {
        var _this48 = this;

        this.items = list.map(function (item) {
          return {
            ref: item.action.toUpperCase(),
            type: PlayerButton,
            action: item.action,
            theme: _this48._theme,
            icon: item.icon,
            x: item.x,
            size: item.size
          };
        });
        this.focusPlayButton();
      }
    }, {
      key: "orientation",
      get: function get() {
        return 'horizontal';
      }
    }], [{
      key: "_states",
      value: function _states() {
        return lng.tools.ObjMerger.merge(_get(_getPrototypeOf(PlayerButtonList), "_states", this).call(this), {
          _handleRight: function _handleRight() {
            return this.navigate(this.targetHasData(1), this.orientation, true);
          },
          _handleLeft: function _handleLeft() {
            return this.navigate(this.targetHasData(-1), this.orientation, true);
          }
        });
      }
    }]);

    return PlayerButtonList;
  }(ItemList);

  var SubtitlesGenerator =
  /*#__PURE__*/
  function (_lng$Component34) {
    _inherits(SubtitlesGenerator, _lng$Component34);

    function SubtitlesGenerator() {
      _classCallCheck(this, SubtitlesGenerator);

      return _possibleConstructorReturn(this, _getPrototypeOf(SubtitlesGenerator).apply(this, arguments));
    }

    _createClass(SubtitlesGenerator, [{
      key: "seeked",
      value: function seeked(_ref16) {
        var currentTime = _ref16.currentTime;

        if (!this.empty) {
          var dir = Math.round(this.current.end / 1000) < currentTime;
          var newIndex = 0;
          currentTime = Math.round(currentTime);

          for (var i = this.subIndex; dir ? i < this.subtitles.length : i > 0; dir ? i++ : i--) {
            var sub = this.subtitles[i];
            var prevSub = this.subtitles[i - 1];

            if (Math.round(sub.begin / 1000) <= currentTime && currentTime <= Math.round(sub.end / 1000) || prevSub && Math.round(sub.begin / 1000) >= currentTime && currentTime > Math.round(prevSub.end / 1000)) {
              newIndex = i;
              break;
            }
          }

          this.next(currentTime, newIndex);
        }
      }
    }, {
      key: "next",
      value: function next(currentTime) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.subIndex + 1;

        if (index < this._data.subtitles.length) {
          var next = this._data.subtitles[index];

          if (Math.round(next.begin / 1000) > currentTime) {
            this._wrapper.alpha = 0;
          } else {
            this._wrapper.alpha = 1;
          }

          this.subIndex = index;
          this.current = next;
        } else {
          this.current = null;
        }
      }
    }, {
      key: "hexToArray",
      value: function hexToArray(hex) {
        hex = hex.replace('#', '');
        var result = [];

        for (var i = 0; i < hex.length; i += 2) {
          result.push(parseInt(hex.substr(i, 2), 16));
        }

        if (result.length === 3) {
          result.push(255);
        }

        return result;
      }
    }, {
      key: "setSubtitleLink",
      value: function setSubtitleLink(link) {
        var _this49 = this;

        fetch(link).then(function (response) {
          return response.json();
        }).then(function (subtitles) {
          _this49.subtitles = subtitles;
          _this49.empty = false;
        });
      }
    }, {
      key: "current",
      set: function set(v) {
        var _this50 = this;

        if (v) {
          var filter = v.tt.filter(function (sub) {
            if (sub) {
              return sub;
            }
          }).reverse();
          this._wrapper.children = filter.map(function (sub, index) {
            return {
              x: 960,
              mountX: 0.5,
              mountY: 1,
              y: index * -56,
              subtitle: {
                sub: sub.text,
                styles: _this50._styles[sub.style]
              },
              type: SubtitleComponent
            };
          });
        } else {
          if (this._wrapper) {
            this._wrapper.children = [];
            this._wrapper.alpha = 0;
          }
        }

        this._current = v;
      },
      get: function get() {
        return this._current;
      }
    }, {
      key: "styles",
      set: function set(styles) {
        var _this51 = this;

        Object.keys(styles).forEach(function (style) {
          styles[style].fgcol = lng.StageUtils.getArgbNumber(_this51.hexToArray(styles[style].fgcol));
          styles[style].bgcol = lng.StageUtils.getArgbNumber(_this51.hexToArray(styles[style].bgcol));
        });
        this._styles = styles;
      }
    }, {
      key: "empty",
      set: function set(v) {
        if (v) {
          this.data = null;
          this.current = null;
        }

        this._empty = v;
      },
      get: function get() {
        return this._empty;
      }
    }, {
      key: "subtitles",
      set: function set(data) {
        if (data) {
          this.styles = data.styles;
          this._data = data;
          this.subIndex = 0;
          this.current = data.subtitles[this.subIndex];
        } else {
          this.empty = true;
        }
      },
      get: function get() {
        return this._data.subtitles;
      }
    }, {
      key: "progress",
      set: function set(_ref17) {
        var currentTime = _ref17.currentTime;

        if (!this.empty && this.current) {
          var cBegin = Math.round(this.current.begin / 1000);
          var cEnd = Math.round(this.current.end / 1000);

          if (cBegin < currentTime && currentTime < cEnd) {
            this._wrapper.alpha = 1;
          } else if (currentTime < cBegin) {
            this._wrapper.alpha = 0;
          }

          if (currentTime >= cEnd) {
            this.next(currentTime);
          }
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 1,
          Wrapper: {
            alpha: 0,
            y: 1010
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.empty = true;
            this._wrapper = this.tag('Wrapper');
          }
        };
      }
    }]);

    return SubtitlesGenerator;
  }(lng.Component);

  var SubtitleComponent =
  /*#__PURE__*/
  function (_lng$Component35) {
    _inherits(SubtitleComponent, _lng$Component35);

    function SubtitleComponent() {
      _classCallCheck(this, SubtitleComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(SubtitleComponent).apply(this, arguments));
    }

    _createClass(SubtitleComponent, [{
      key: "subtitle",
      set: function set(_ref18) {
        var sub = _ref18.sub,
            styles = _ref18.styles;
        var text = new DOMParser().parseFromString(sub, "text/html").body.textContent;
        var bgcol = styles.bgcol,
            fgcol = styles.fgcol;
        this.patch({
          color: bgcol,
          rect: true,
          h: 56,
          w: 1,
          Sub: {
            color: fgcol,
            text: {
              text: text,
              fontSize: 42,
              fontFace: 'TheSansB4',
              textAlign: 'center'
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          h: 56,
          w: 0,
          Sub: {
            x: 5,
            text: {
              text: 'sub',
              fontSize: 42,
              fontFace: 'TheSansB4',
              textAlign: 'center'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this52 = this;

            var sub = this.tag('Sub');
            sub.on('txLoaded', function () {
              _this52.patch({
                w: sub.renderWidth + 10
              });
            });
          }
        };
      }
    }]);

    return SubtitleComponent;
  }(lng.Component);

  var PlayerOverlay =
  /*#__PURE__*/
  function (_lng$Component36) {
    _inherits(PlayerOverlay, _lng$Component36);

    function PlayerOverlay() {
      _classCallCheck(this, PlayerOverlay);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlayerOverlay).apply(this, arguments));
    }

    _createClass(PlayerOverlay, [{
      key: "seeked",
      value: function seeked(e) {
        this._isSeeking = false; //§this.tag('PlayerControls').tag('INFO').disabled = false

        this.tag('Subtitles').seeked(e);
      }
    }, {
      key: "update",
      value: function update(_ref19) {
        var title = _ref19.title,
            subline = _ref19.subline,
            _ref19$subtitles = _ref19.subtitles,
            subtitles = _ref19$subtitles === void 0 ? false : _ref19$subtitles;
        var subtitlesOn = this.api.getSubtitlesOn();
        var pc = this.tag('PlayerControls');
        var filter = [{
          control: 'info',
          use: true
        }, {
          control: 'subtitles',
          use: subtitles && true
        }, {
          control: 'previous',
          use: false
        }, {
          control: 'rewind',
          use: true
        }, {
          control: 'play',
          use: true
        }, {
          control: 'forward',
          use: true
        }, {
          control: 'next',
          use: false
        }];
        pc.playerButtons = this.availableControls.filter(function (item, index) {
          if (filter[index].use) {
            return item;
          }
        }); // pc.index = pc.items.indexOf(pc.tag('PLAY'))
        //this.playButtonIndex = pc.index

        this.patch({
          Subtitles: {
            alpha: !!subtitlesOn
          },
          Wrapper: {
            Headline: {
              text: {
                text: title
              }
            },
            Subline: {
              text: {
                text: subline.join(" \u2022 ")
              }
            }
          }
        });

        if (subtitles) {
          this.tag('Subtitles').setSubtitleLink(subtitles);
          this.tag('PlayerControls').tag('SUBTITLES').toggle(subtitlesOn);
        } else {
          this.tag('Subtitles').empty = true;
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.tag(this.state)) {
          return this.tag(this.state);
        }

        return this;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        var text = theme.toolbar.text;
        this.tag('Wrapper').patch({
          BackButton: {
            theme: theme
          },
          Headline: {
            color: text
          },
          Subline: {
            color: text
          },
          ProgressBar: {
            theme: theme
          },
          PlayerControls: {
            theme: theme
          }
        });
        this._theme = theme;
      }
    }, {
      key: "progress",
      set: function set(v) {
        this.tag('ProgressBar').progress = v;
        this.tag('Subtitles').progress = v;
      }
    }, {
      key: "seeking",
      set: function set(v) {
        this._isSeeking = true; //this.tag('PlayerControls').tag('INFO').disabled = true

        this.tag('ProgressBar').seeking = v;
      }
    }, {
      key: "availableControls",
      get: function get() {
        return [{
          action: 'info',
          icon: {
            icon: 'info',
            size: 142,
            y: 18
          },
          size: {
            w: 142,
            h: 142
          },
          x: 153
        }, {
          action: 'subtitles',
          icon: {
            icon: 'ut_active',
            toggleIcon: 'ut',
            size: 142,
            y: 22
          },
          size: {
            w: 142,
            h: 142
          },
          x: 293
        }, {
          action: 'previous',
          icon: {
            icon: 'skip_previous',
            size: 192
          },
          size: {
            w: 142,
            h: 142
          },
          x: 607
        }, {
          action: 'rewind',
          icon: {
            icon: 'fast_rewind',
            size: 192
          },
          size: {
            w: 142,
            h: 142
          },
          x: 760
        }, {
          action: 'play',
          icon: {
            icon: 'play',
            toggleIcon: 'pause',
            y: 45,
            size: 238
          },
          size: {
            w: 218,
            h: 218
          },
          x: 960
        }, {
          action: 'forward',
          icon: {
            icon: 'fast_forward',
            size: 192
          },
          size: {
            w: 142,
            h: 142
          },
          x: 1160
        }, {
          action: 'next',
          icon: {
            icon: 'skip_next',
            size: 192
          },
          size: {
            w: 142,
            h: 142
          },
          x: 1313
        }];
      }
    }, {
      key: "playerState",
      set: function set(state) {
        switch (state) {
          case 'PLAY':
            this.tag('PlayerControls').tag('PLAY').toggle(true);
            break;

          case 'PAUSE':
            this.tag('PlayerControls').tag('PLAY').toggle(false);
            break;

          case 'START':
            this.tag('PlayerControls').tag('PLAY').toggle(true);
            break;

          case 'END':
          case 'STOP':
            this.tag('PlayerControls').tag('PLAY').toggle(false);
            break;
        }
      }
    }, {
      key: "overlayVisible",
      set: function set(v) {
        this._ov = v;
      },
      get: function get() {
        return this._ov;
      }
    }, {
      key: "overlayAnimation",
      set: function set(ani) {
        this._oa = ani;
      },
      get: function get() {
        return this._oa;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          zIndex: 1,
          Subtitles: {
            type: SubtitlesGenerator
          },
          Wrapper: {
            zIndex: 2,
            alpha: 0,
            BackButton: {
              zIndex: 2,
              type: ArdNavigationOptionItem,
              y: 42,
              x: 115,
              icon: {
                src: 'icons/ui/arrowLeft.svg'
              }
            },
            Headline: {
              y: 702,
              mountX: 0.5,
              x: 960,
              text: {
                text: 'This is the headline text',
                shadow: true,
                fontSize: 50,
                fontFace: 'TheSansB6',
                textAlign: 'center'
              }
            },
            Subline: {
              y: 767,
              mountX: 0.5,
              x: 960,
              text: {
                text: 'This is the subline text',
                shadow: true,
                fontSize: 30,
                fontFace: 'TheSansB4',
                textAlign: 'center'
              }
            },
            ProgressBar: {
              y: 975,
              type: ProgressBar
            },
            PlayerControls: {
              type: PlayerButtonList,
              y: 533
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this53 = this;

            this._ov = false;
            this._oa = this.animation({
              duration: 0.5,
              stopMethod: 'reverse',
              actions: [{
                t: 'Subtitles.Wrapper',
                p: 'y',
                v: {
                  0: 1030,
                  1: 970
                }
              }, {
                t: 'Wrapper',
                p: 'alpha',
                v: {
                  0: 0,
                  0.75: 1
                }
              }, {
                t: 'Wrapper.Logo',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.Logo',
                p: 'y',
                rv: -37,
                v: {
                  0.25: -37,
                  1: 43
                }
              }, {
                t: 'Wrapper.Headline',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.Headline',
                p: 'y',
                rv: 747,
                v: {
                  0.25: 747,
                  1: 702
                }
              }, {
                t: 'Wrapper.Subline',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.Subline',
                p: 'y',
                rv: 797,
                v: {
                  0.25: 837,
                  1: 767
                }
              }, {
                t: 'Wrapper.PlayerControls',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.ProgressBar',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Wrapper.ProgressBar',
                p: 'y',
                rv: 1055,
                v: {
                  0.25: 1055,
                  1: 975
                }
              }]
            });

            this._oa.on('finish', function () {
              _this53._ov = true;
            });

            this._oa.on('stopFinish', function () {
              _this53._ov = false;

              _this53.tag('PlayerControls').focusPlayButton();

              _this53.fire('stateChange', {
                state: 'PlayerControls'
              });
            });

            return 'PlayerControls';
          },
          stateChange: function stateChange(e) {
            return e.state;
          },
          PlayerControls: {
            _handleForward: function _handleForward() {
              this.tag('PlayerControls').focusForwardButton();
              this.signal('invokePlayerState', {
                action: 'forward'
              });
            },
            _handleRewind: function _handleRewind() {
              this.tag('PlayerControls').focusRewindButton();
              this.signal('invokePlayerState', {
                action: 'rewind'
              });
            },
            _handlePlayPause: function _handlePlayPause() {
              this.tag('PlayerControls').focusPlayButton();
              this.signal('invokePlayerState', {
                action: 'playPause'
              });
            },
            _handleUp: function _handleUp() {
              if (this.overlayVisible) {
                return 'BackButton';
              }
            },
            _handleEnter: function _handleEnter() {
              var control = this.tag('PlayerControls').item;

              switch (control.action) {
                case 'play':
                  this.signal('invokePlayerState', {
                    action: 'playPause'
                  });
                  break;

                case 'forward':
                  this.signal('invokePlayerState', {
                    action: 'forward'
                  });
                  break;

                case 'rewind':
                  this.signal('invokePlayerState', {
                    action: 'rewind'
                  });
                  break;

                case 'info':
                  this.signal('showDetails');
                  break;

                case 'subtitles':
                  control.toggle();
                  this.api.setSubtitlesOn(control.toggleActive);
                  this.tag('Subtitles').alpha = !this.tag('Subtitles').alpha;
                  break;

                default:
                  console.log('do nothing');
                  break;
              }
            }
          },
          BackButton: {
            _handleDown: 'PlayerControls',
            _handleEnter: function _handleEnter() {
              this.signal('previousView');
            }
          }
        };
      }
    }]);

    return PlayerOverlay;
  }(lng.Component);

  var SynopsisItem =
  /*#__PURE__*/
  function (_lng$Component37) {
    _inherits(SynopsisItem, _lng$Component37);

    function SynopsisItem() {
      _classCallCheck(this, SynopsisItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(SynopsisItem).apply(this, arguments));
    }

    _createClass(SynopsisItem, [{
      key: "expand",
      value: function expand() {
        var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.toggle;
        this.patch({
          Wrapper: {
            smooth: {
              h: toggle ? 510 : 180
            },
            Text: {
              text: {
                maxLines: toggle ? 0 : 3
              }
            }
          },
          SlideBar: {
            smooth: {
              alpha: toggle ? 1 : 0
            }
          }
        });
        this.toggle = toggle;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.state === 'Expanded') {
          return this.tag('SlideBar');
        }

        return this;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Wrapper: {
            Background: {
              color: theme.focus
            },
            Text: {
              color: theme.toolbar.text
            }
          },
          SlideBar: {
            theme: theme
          }
        });
      }
    }, {
      key: "renderInfo",
      get: function get() {
        return this.tag('Text').texture.source.renderInfo;
      }
    }, {
      key: "moreTextLines",
      get: function get() {
        if (this.tag('Text').text.text !== '') {
          return this.renderInfo.moreTextLines;
        }

        return false;
      }
    }, {
      key: "length",
      get: function get() {
        return this._synopsis.length;
      }
    }, {
      key: "synopsis",
      set: function set(v) {
        this.expand(false);
        this.patch({
          Wrapper: {
            Text: {
              text: {
                text: !v ? '' : v
              }
            }
          }
        });
        this._synopsis = !v ? '' : v;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            w: 1306,
            h: 180,
            clipping: true,
            Background: {
              alpha: 0,
              w: 1306,
              h: 180,
              rect: true
            },
            Text: {
              x: 25,
              y: 15,
              w: 1256,
              text: {
                text: 'Synopsis',
                fontSize: 36,
                maxLines: 3,
                lineHeight: 50,
                fontFace: 'TheSansB4',
                textAlign: 'left'
              }
            }
          },
          SlideBar: {
            x: 1320,
            y: 0,
            alpha: 0,
            type: SlideBar,
            frame: 510,
            signals: {
              scroll: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this54 = this;

            var text = this.tag('Text');
            var slideBar = this.tag('SlideBar');
            text.on('txLoaded', function () {
              if (_this54.state === 'Expanded') {
                var rh = text.renderHeight;
                slideBar.contentSize = text.renderHeight;

                if (rh < 510 - 30) {
                  slideBar.alpha = 0;
                }
              }
            });
            this.toggle = false;
            return 'Collapsed';
          },
          _focus: function _focus() {
            this.patch({
              Wrapper: {
                Background: {
                  smooth: {
                    alpha: 1
                  }
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Wrapper: {
                Background: {
                  smooth: {
                    alpha: 0
                  }
                }
              }
            });
          },
          collapse: 'Collapsed',
          Collapsed: {
            _exit: function _exit() {
              this.fire('_unfocus');
            },
            _enter: function _enter(e) {
              if (e.event === '_handleUp' || e.event === '_handleDown') {
                this.fire(e.event);
              }

              if (this.hasFocus()) {
                this.fire('_focus');
              }
            },
            _handleEnter: function _handleEnter() {
              if (this.moreTextLines) {
                return 'Expanded';
              }
            }
          },
          Expanded: {
            scroll: function scroll(e) {
              var text = this.tag('Text');
              text.setSmooth('y', 15 - e.step * 200);
            },
            _enter: function _enter() {
              this.signal('showSynopsisAnimation');
              this.expand(true);
            },
            _exit: function _exit() {
              this.signal('hideSynopsisAnimation');
              this.expand(false);
            },
            _handleUp: 'Collapsed',
            _handleDown: 'Collapsed',
            _handleEnter: 'Collapsed'
          }
        };
      }
    }]);

    return SynopsisItem;
  }(lng.Component);

  var DetailOverlay =
  /*#__PURE__*/
  function (_lng$Component38) {
    _inherits(DetailOverlay, _lng$Component38);

    function DetailOverlay() {
      _classCallCheck(this, DetailOverlay);

      return _possibleConstructorReturn(this, _getPrototypeOf(DetailOverlay).apply(this, arguments));
    }

    _createClass(DetailOverlay, [{
      key: "update",
      value: function update(_ref20) {
        var _this55 = this;

        var logo = _ref20.logo,
            title = _ref20.title,
            image = _ref20.image,
            show = _ref20.show,
            subline = _ref20.subline,
            synopsis = _ref20.synopsis,
            broadcastedOn = _ref20.broadcastedOn,
            availableTo = _ref20.availableTo,
            _ref20$teasers = _ref20.teasers,
            teasers = _ref20$teasers === void 0 ? [] : _ref20$teasers;
        subline.unshift(this.api.getDate(broadcastedOn));
        this.patch({
          BackgroundImage: {
            src: ux.Ui.getImageUrl(image.src.replace('{width}', 1920), {
              width: 1920,
              height: 1080,
              type: 'crop'
            })
          },
          Thumbnail: {
            src: show ? ux.Ui.getImageUrl(show.image.src.replace('{width}', 192), {
              width: 192,
              height: 110,
              type: 'crop'
            }) : ux.Ui.getImageUrl(image.src.replace('{width}', 192), {
              width: 192,
              height: 110,
              type: 'crop'
            })
          },
          ShowInfo: {
            Title: {
              text: {
                text: title
              }
            },
            Show: {
              text: {
                text: subline.join(" \u2022 ")
              }
            }
          },
          Synopsis: {
            synopsis: synopsis
          },
          ExpireInfo: {
            alpha: !!availableTo,
            ExpiresLabel: {
              alpha: !!availableTo
            },
            ExpiresDate: {
              alpha: !!availableTo,
              text: {
                text: availableTo ? this.api.getDate(availableTo, true) : ''
              }
            }
          },
          PartnerLogo: {
            texture: !logo ? null : lng.Tools.getSvgTexture(AppDefinition.getPath(logo.src), logo.width * 1.7, 48 * 1.7)
          },
          EpisodeList: {
            Title: {
              alpha: teasers.length ? 1 : 0
            },
            Slider: {
              alpha: teasers.length ? 1 : 0,
              items: teasers.map(function (teaser, index) {
                return {
                  ref: "T".concat(teaser.id),
                  index: index,
                  headerOnly: true,
                  parentId: 'episodes',
                  item: teaser,
                  base: 'list',
                  type: GridCell,
                  theme: _this55._t
                };
              })
            }
          }
        });
      }
    }, {
      key: "showBackgroundImage",
      value: function showBackgroundImage(bool) {
        this.tag('BackgroundImage').setSmooth('alpha', bool);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.tag(this.state)) {
          return this.tag(this.state);
        }
      }
    }, {
      key: "api",
      // set geoBlocked(v) {
      //     this.tag('GeoBlocked').setSmooth('alpha', v)
      // }
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._t = theme;
        var text = theme.toolbar.text;
        this.patch({
          BackButton: {
            theme: theme
          },
          ShowInfo: {
            Title: {
              color: text
            },
            Show: {
              color: text
            }
          },
          Synopsis: {
            theme: theme
          },
          // GeoBlocked: {color: text, Label: {color: theme.background}},
          ExpireInfo: {
            ExpiresLabel: {
              color: text
            },
            ExpiresDate: {
              color: text
            }
          },
          PartnerLogo: {
            color: text
          }
        });
      }
    }, {
      key: "overlayVisible",
      set: function set(v) {
        this._ov = v;
      },
      get: function get() {
        return this._ov;
      }
    }, {
      key: "overlayAnimation",
      set: function set(ani) {
        this._oa = ani;
      },
      get: function get() {
        return this._oa;
      }
    }, {
      key: "backgroundImage",
      set: function set(src) {
        this.tag('BackgroundImage').src = src;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          BackgroundImage: {
            zIndex: 0,
            alpha: 0,
            w: 1920,
            h: 1080
          },
          BackButton: {
            zIndex: 2,
            type: ArdNavigationOptionItem,
            y: 42,
            x: 115,
            icon: {
              src: 'icons/ui/arrowLeft.svg'
            }
          },
          GeoBlocked: {
            zIndex: 2,
            alpha: 0,
            w: 300,
            h: 110,
            y: 42,
            x: 1805,
            mountX: 1,
            rect: true,
            color: 0xffffffff,
            Label: {
              mount: 0.5,
              x: 150,
              y: 60,
              color: 0xff000000,
              text: {
                text: 'GEOBLOCKED',
                fontSize: 40,
                fontFace: 'TheSansB6',
                textAlign: 'center'
              }
            }
          },
          Thumbnail: {
            zIndex: 2,
            x: 115,
            y: 254,
            w: 192,
            h: 110
          },
          ShowInfo: {
            zIndex: 2,
            x: 340,
            y: 254,
            Title: {
              text: {
                text: 'Item Title',
                fontSize: 50,
                fontFace: 'TheSansB6',
                textAlign: 'center'
              }
            },
            Show: {
              y: 70,
              text: {
                text: 'Show & Partner',
                fontSize: 30,
                fontFace: 'TheSansB4',
                textAlign: 'center'
              }
            }
          },
          Synopsis: {
            zIndex: 2,
            x: 90,
            y: 405,
            type: SynopsisItem,
            signals: {
              showSynopsisAnimation: true,
              hideSynopsisAnimation: true
            }
          },
          // Synopsis: {zIndex: 2, x: 115, y: 405, w: 1300, text: {text: 'Synopsis', fontSize: 30, lineHeight: 40, maxLines: 3, fontFace: 'TheSansB4', textAlign: 'left'}},
          ExpireInfo: {
            zIndex: 2,
            alpha: 0,
            x: 1805,
            y: 405,
            ExpiresLabel: {
              zIndex: 2,
              mountX: 1,
              text: {
                text: 'Video verfügbar bis',
                fontSize: 36,
                fontFace: 'TheSansB6',
                textAlign: 'center'
              }
            },
            ExpiresDate: {
              zIndex: 2,
              mountX: 1,
              y: 50,
              text: {
                text: 'dd.mm.yyyy',
                fontSize: 36,
                fontFace: 'TheSansB4',
                textAlign: 'center'
              }
            }
          },
          PartnerLogo: {
            zIndex: 2,
            mountX: 1,
            y: 700,
            x: 1805
          },
          EpisodeList: {
            zIndex: 2,
            y: 667,
            Title: {
              x: 115,
              text: {
                text: 'Folge',
                fontSize: 42,
                maxLines: 1,
                fontFace: 'TheSansB4'
              }
            },
            Slider: {
              y: 75,
              carousel: false,
              w: 1920,
              itemSpacing: 16,
              type: Slider,
              marginLeft: 115,
              marginRight: 115
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this56 = this;

            this._oa = this.animation({
              duration: 0.5,
              stopMethod: 'reverse',
              actions: [{
                p: 'alpha',
                v: {
                  0: 0,
                  0.75: 1
                }
              }, {
                t: 'BackButton',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'BackButton',
                p: 'y',
                rv: 0,
                v: {
                  0.25: -29,
                  1: 42
                }
              }, {
                t: 'GeoBlocked',
                p: 'y',
                rv: 580,
                v: {
                  0.25: -29,
                  1: 42
                }
              }, {
                t: 'Thumbnail',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Thumbnail',
                p: 'y',
                rv: 300,
                v: {
                  0.25: 300,
                  1: 254
                }
              }, {
                t: 'ShowInfo',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'ShowInfo',
                p: 'y',
                rv: 300,
                v: {
                  0.25: 300,
                  1: 254
                }
              }, {
                t: 'Synopsis',
                p: 'alpha',
                rv: 0,
                v: {
                  0.25: 0,
                  1: 1
                }
              }, {
                t: 'Synopsis',
                p: 'y',
                rv: 475,
                v: {
                  0.25: 475,
                  1: 405
                }
              }, {
                t: 'ExpireInfo',
                p: 'y',
                rv: 460,
                v: {
                  0.25: 460,
                  1: 420
                }
              }, {
                t: 'PartnerLogo',
                p: 'y',
                rv: 780,
                v: {
                  0.25: 570,
                  1: 530
                }
              }, {
                t: 'EpisodeList',
                p: 'y',
                rv: 667,
                v: {
                  0.25: 704,
                  1: 667
                }
              }]
            });
            this.focusSliderAnimation = this.animation({
              duration: 0.375,
              stopMethod: 'reverse',
              actions: [{
                t: 'Synopsis',
                p: 'alpha',
                v: {
                  0: 1,
                  1: 0
                }
              }, {
                t: 'ExpireInfo',
                p: 'alpha',
                v: {
                  0: 1,
                  0.2: 0,
                  0.8: 0,
                  1: 1
                }
              }, {
                t: 'ExpireInfo',
                p: 'x',
                rv: 1805,
                v: {
                  0.25: 1805,
                  0.75: 340
                }
              }, {
                t: 'ExpireInfo',
                p: 'y',
                v: {
                  0.25: 420,
                  0.75: 900
                }
              }, {
                t: 'ExpireInfo.ExpiresLabel',
                p: 'mountX',
                v: {
                  0.25: 1,
                  0.75: 0
                }
              }, {
                t: 'ExpireInfo.ExpiresDate',
                p: 'mountX',
                v: {
                  0.25: 1,
                  0.75: 0
                }
              }, {
                t: 'PartnerLogo',
                p: 'alpha',
                v: {
                  0: 1,
                  0.2: 0,
                  0.8: 0,
                  1: 1
                }
              }, {
                t: 'PartnerLogo',
                p: 'x',
                rv: 1805,
                v: {
                  0.25: 1805,
                  0.75: 1306 + 315
                }
              }, {
                t: 'PartnerLogo',
                p: 'y',
                v: {
                  0.25: 530,
                  0.75: 900
                }
              }, {
                t: 'EpisodeList',
                p: 'y',
                v: {
                  0: 667,
                  1: 370
                }
              }]
            });
            this.showSynopsisAnimation = this.animation({
              duration: 0.375,
              stopMethod: 'reverse',
              actions: [{
                t: 'Thumbnail',
                p: 'alpha',
                v: {
                  0: 1,
                  1: 0
                }
              }, {
                t: 'ShowInfo',
                p: 'y',
                v: {
                  0: 254,
                  1: 135
                }
              }, {
                t: 'Synopsis',
                p: 'x',
                v: {
                  0: 90,
                  0.5: 315
                }
              }, {
                t: 'Synopsis',
                p: 'y',
                v: {
                  0.5: 405,
                  1: 280
                }
              }, {
                t: 'ExpireInfo',
                p: 'alpha',
                v: {
                  0: 1,
                  0.2: 0,
                  0.8: 0,
                  1: 1
                }
              }, {
                t: 'ExpireInfo',
                p: 'x',
                rv: 1805,
                v: {
                  0.25: 1805,
                  0.75: 340
                }
              }, {
                t: 'ExpireInfo',
                p: 'y',
                v: {
                  0.25: 420,
                  0.75: 900
                }
              }, {
                t: 'ExpireInfo.ExpiresLabel',
                p: 'mountX',
                v: {
                  0.25: 1,
                  0.75: 0
                }
              }, {
                t: 'ExpireInfo.ExpiresDate',
                p: 'mountX',
                v: {
                  0.25: 1,
                  0.75: 0
                }
              }, {
                t: 'PartnerLogo',
                p: 'alpha',
                v: {
                  0: 1,
                  0.2: 0,
                  0.8: 0,
                  1: 1
                }
              }, {
                t: 'PartnerLogo',
                p: 'x',
                rv: 1805,
                v: {
                  0.25: 1805,
                  0.75: 1306 + 315
                }
              }, {
                t: 'PartnerLogo',
                p: 'y',
                v: {
                  0.25: 530,
                  0.75: 900
                }
              }, {
                t: 'EpisodeList',
                p: 'alpha',
                v: {
                  0: 1,
                  1: 0
                }
              }, {
                t: 'EpisodeList',
                p: 'y',
                v: {
                  0: 667,
                  0.5: 900
                }
              }]
            });
            this.showSynopsisAnimation.on('stop', function () {
              _this56.tag('Synopsis').expand();
            });

            this._oa.on('finish', function () {
              _this56._ov = true;
            });

            this._oa.on('stopFinish', function () {
              _this56._ov = false;

              _this56.showSynopsisAnimation.stop();

              _this56.focusSliderAnimation.stop();

              _this56.tag('Synopsis').fire('collapse');

              _this56.fire('stateChange', {
                state: 'BackButton'
              });
            });

            return 'BackButton';
          },
          stateChange: function stateChange(e) {
            return e.state;
          },
          BackButton: {
            _handleEnter: function _handleEnter() {
              this.signal('showPlayer');
            },
            _handleDown: function _handleDown() {
              if (this.tag('Synopsis').moreTextLines) {
                return 'Synopsis';
              } else if (this.tag('Slider').length) {
                return 'Slider';
              }
            }
          },
          Synopsis: {
            showSynopsisAnimation: function showSynopsisAnimation() {
              this.showSynopsisAnimation.start();
            },
            hideSynopsisAnimation: function hideSynopsisAnimation() {
              this.showSynopsisAnimation.stop();
            },
            _handleUp: function _handleUp() {
              return 'BackButton';
            },
            _handleDown: function _handleDown() {
              if (this.tag('Slider').length) {
                return "Slider";
              }
            }
          },
          Slider: {
            _enter: function _enter() {
              this.focusSliderAnimation.start();
            },
            _exit: function _exit() {
              this.focusSliderAnimation.stop();
            },
            _handleEnter: function _handleEnter() {
              var item = this.tag('Slider').focusedItem.item;
              this.signal('switchView', {
                view: 'Player',
                persist: {
                  targetId: item.links.target.id
                },
                ignore: true
              });
            },
            _handleUp: function _handleUp() {
              if (this.tag('Synopsis').moreTextLines) {
                return 'Synopsis';
              }

              return 'BackButton';
            }
          }
        };
      }
    }]);

    return DetailOverlay;
  }(lng.Component);

  var Player =
  /*#__PURE__*/
  function (_lng$Component39) {
    _inherits(Player, _lng$Component39);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
      key: "update",
      value: function update(data) {
        this.collectingMedia = false;
        var _data$publicationServ = data.publicationService,
            ps = _data$publicationServ === void 0 ? null : _data$publicationServ,
            _data$image = data.image,
            image = _data$image === void 0 ? null : _data$image,
            _data$title = data.title,
            title = _data$title === void 0 ? null : _data$title,
            _data$show = data.show,
            show = _data$show === void 0 ? null : _data$show,
            _data$synopsis = data.synopsis,
            synopsis = _data$synopsis === void 0 ? null : _data$synopsis,
            _data$broadcastedOn = data.broadcastedOn,
            broadcastedOn = _data$broadcastedOn === void 0 ? null : _data$broadcastedOn,
            _data$availableTo = data.availableTo,
            availableTo = _data$availableTo === void 0 ? false : _data$availableTo,
            _data$mediaCollection = data.mediaCollection,
            mediaCollection = _data$mediaCollection === void 0 ? false : _data$mediaCollection,
            _data$relates = data.relates,
            teasers = _data$relates === void 0 ? [] : _data$relates;
        var subline = [];
        var logo = null;

        if (ps.partner === 'radio_bremen') {
          ps.partner = 'rb';
        }

        if (ps.partner === 'ard-alpha') {
          ps.partner = 'alpha';
        }

        if (show && show.title !== title) {
          subline.push(show.title);
        }

        if (ps.name) {
          subline.push(ps.name);
        }

        logo = this.themeManager.getChannelTheme(ps.partner.replace('_', '')).logo;

        this._detailOverlay.update({
          logo: logo,
          title: title,
          image: image,
          show: show,
          subline: subline,
          synopsis: synopsis,
          broadcastedOn: broadcastedOn,
          availableTo: availableTo,
          teasers: teasers
        });

        if (mediaCollection) {
          this.collectingMedia = true;
          var availableStreams = mediaCollection._mediaArray[0]._mediaStreamArray;
          this._stream = availableStreams[availableStreams.length - 1]._stream;
          this.updatePlayingItem({
            logo: logo,
            title: title,
            subline: subline,
            subtitles: mediaCollection._subtitleUrl || false
          });
        } else {
          this.mediaAvailable = false;
          this.updatePlayingItem({
            logo: logo,
            title: title,
            subline: subline,
            subtitles: false
          });
        }
      }
    }, {
      key: "updatePlayingItem",
      value: function updatePlayingItem(obj) {
        this.tag('PlayerOverlay').update(obj);
        this.fire('finishedLoading');
      }
    }, {
      key: "play",
      value: function play(url) {
        this.fire('play', args);
        return !!this.stream;
      }
    }, {
      key: "_setItems",
      value: function _setItems(item) {
        this._item = item;
        this.application.updateFocusSettings();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        switch (this.state) {
          case 'Active.PlayerOverlay':
            return this.tag('PlayerOverlay');

          case 'Active.DetailOverlay':
            return this.tag('DetailOverlay');
        }

        return this;
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
      key: "showPlayerOverlay",
      value: function showPlayerOverlay() {
        if (!this._playerOverlay.overlayVisible && !this._playerOverlay.overlayAnimation.isPlaying()) {
          this._playerOverlay.overlayAnimation.start();
        }
      }
    }, {
      key: "hidePlayerOverlay",
      value: function hidePlayerOverlay() {
        if (!this._playerOverlay.overlayAnimation.isStopping()) {
          this._playerOverlay.overlayAnimation.stop();
        }
      }
    }, {
      key: "showDetailOverlay",
      value: function showDetailOverlay() {
        this._detailOverlay.overlayAnimation.start();
      }
    }, {
      key: "hideDetailOverlay",
      value: function hideDetailOverlay() {
        this._detailOverlay.overlayAnimation.stop();
      }
    }, {
      key: "_setInterfaceTimeout",
      value: function _setInterfaceTimeout() {
        var _this57 = this;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          if (_this57.application.mediaplayer.isPlaying() && _this57.state === 'Active.PlayerOverlay') {
            _this57.hidePlayerOverlay();
          }
        }, this.hideTimer);
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          BackgroundGradient: {
            shader: {
              type: PlayerShader,
              radius: 400,
              x: 960,
              y: 960,
              color1: 0x00000000,
              color2: 0xDE000000,
              mount: 0.5
            }
          },
          PlayerOverlay: {
            theme: theme
          },
          DetailOverlay: {
            theme: theme
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
          rect: true,
          color: 0x00000000,
          BackgroundGradient: {
            zIndex: 1,
            alpha: 0,
            y: -420,
            w: 1920,
            h: 1920,
            rect: true,
            shader: {
              type: PlayerShader,
              radius: 400,
              x: 960,
              y: 960,
              color1: 0x3300ff00,
              color2: 0xaa00ff00,
              mount: 0.5
            }
          },
          PlayerOverlay: {
            type: PlayerOverlay,
            signals: {
              invokePlayerState: true,
              showDetails: true,
              previousView: true
            }
          },
          DetailOverlay: {
            alpha: 0,
            type: DetailOverlay,
            signals: {
              showPlayer: true,
              switchView: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this58 = this;

            this.themeManager = new ThemeManager();
            this.themeManager.currentProfile = 'ard';
            this.theme = this.themeManager.theme;
            this._playerOverlay = this.tag('PlayerOverlay');
            this._detailOverlay = this.tag('DetailOverlay');
            this.changingOverlay = false;
            this.mediaAvailable = false;
            this.collectingMedia = false;
            this.overlayVisible = false;
            this.hideTimer = 5000; //milliseconds

            var shader = this.tag('BackgroundGradient');

            this._playerOverlay.overlayAnimation.on('start', function () {
              shader.setSmooth('shader.radius', 400, {
                duration: 0.375
              });
              shader.setSmooth('alpha', 1, {
                duration: 0.375
              });
            });

            this._playerOverlay.overlayAnimation.on('stop', function () {
              shader.setSmooth('shader.radius', 1500, {
                duration: 0.375
              });

              if (_this58.changingOverlay) {
                _this58._detailOverlay.overlayAnimation.start();

                _this58.changingOverlay = false;
              }
            });

            this._playerOverlay.overlayAnimation.on('stopFinish', function () {
              if (_this58.changingOverlay) {
                _this58._detailOverlay.overlayAnimation.start();

                _this58.changingOverlay = false;
              }
            });

            this._detailOverlay.overlayAnimation.on('start', function () {
              shader.setSmooth('alpha', 1, {
                duration: 0.375
              });
              shader.setSmooth('shader.radius', 0, {
                duration: 0.375
              });
            });

            this._detailOverlay.overlayAnimation.on('stopFinish', function () {
              if (_this58.changingOverlay) {
                _this58._playerOverlay.tag('Subtitles').setSmooth('alpha', 1);

                _this58._playerOverlay.overlayAnimation.start();

                _this58.changingOverlay = false;
              }
            });
          },
          _handleBack: function _handleBack() {
            this.application.mediaplayer.close();
            return false;
          },
          _handleUp: function _handleUp() {//block handleUp from bubbling to app
          },
          _handleLeft: function _handleLeft() {//block handleLeft from bubbling to app
          },
          loadView: function loadView(_ref21) {
            var _this59 = this;

            var _ref21$toLoad$persist = _ref21.toLoad.persist,
                targetId = _ref21$toLoad$persist.targetId,
                _ref21$toLoad$persist2 = _ref21$toLoad$persist.useTarget,
                useTarget = _ref21$toLoad$persist2 === void 0 ? false : _ref21$toLoad$persist2;
            this.fire('loading');
            this.mediaAvailable = false;

            if (!useTarget) {
              this.api.getPlayerPage(targetId).then(function (response) {
                _this59.update(response);
              });
            } else {
              this.update(target);
            }
          },
          hideView: 'Hide',
          loading: 'Loading',
          finishedLoading: 'Show',
          Loading: {
            finished: 'Show'
          },
          Hide: {
            _enter: function _enter() {
              var _this60 = this;

              this.hidePlayerOverlay();
              this.hideDetailOverlay();
              this.signal('showBackground');
              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }, {
                  t: 'BackgroundGradient',
                  p: 'shader.radius',
                  v: {
                    1: 1500
                  }
                }]
              });
              animation.on('finish', function () {
                _this60.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.tag('PlayerOverlay').progress = {
                currentTime: 0,
                duration: 0
              };
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this61 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this61.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return 'Active';
            }
          },
          Idle: {},
          Active: {
            _enter: function _enter() {
              if (!this.collectingMedia) {
                this.fire('mediaUpdate');
              }
            },
            _exit: function _exit() {
              this.tag('PlayerOverlay').tag('Subtitles').empty = true;
              this._detailOverlay.geoBlocked = false;
              this._stream = null;
              this.mediaAvailable = false;
              this.application.mediaplayer.close();
            },
            mediaUpdate: function mediaUpdate() {
              if (this.mediaAvailable && this.state !== 'Active.DetailOverlay') {
                this.showPlayerOverlay();

                this._detailOverlay.showBackgroundImage(false);

                return 'Active.PlayerOverlay';
              } else {
                this.showDetailOverlay();

                this._detailOverlay.showBackgroundImage(true);

                return 'Active.DetailOverlay';
              }
            },
            play: function play(_ref22) {
              var item = _ref22.item,
                  items = _ref22.items;
              this._items = items;

              this._setItem(item);
            },
            $mediaplayerStart: function $mediaplayerStart() {
              this.collectingMedia = false;
              this._playerOverlay.playerState = 'START';
            },
            $mediaplayerEnded: function $mediaplayerEnded() {
              this._playerOverlay.playerState = 'END';
              this.fire('previousView');
            },
            $mediaplayerPause: function $mediaplayerPause() {
              this._playerOverlay.playerState = 'PAUSE';
            },
            $mediaplayerPlay: function $mediaplayerPlay() {
              this._detailOverlay.geoBlocked = false;
              this._playerOverlay.playerState = 'PLAY';
              this.signal('hideBackground');
              this.mediaAvailable = true;
              this.fire('mediaUpdate');
            },
            $mediaplayerStop: function $mediaplayerStop() {
              this._playerOverlay.playerState = 'STOP';
            },
            $mediaplayerProgress: function $mediaplayerProgress(e) {
              this.tag('PlayerOverlay').progress = e;
            },
            $mediaplayerSeeked: function $mediaplayerSeeked(e) {
              this.tag('PlayerOverlay').seeked(e);
            },
            $mediaplayerSeeking: function $mediaplayerSeeking(e) {
              this.tag('PlayerOverlay').seeking = e;
            },
            $mediaplayerError: function $mediaplayerError(e) {
              this._detailOverlay.geoBlocked = true;
              this.signal('showBackground');
              this.mediaAvailable = false;
              this.fire('mediaUpdate');
            },
            invokePlayerState: function invokePlayerState(e) {
              switch (e.action) {
                case 'playPause':
                  this.application.mediaplayer.playPause();
                  break;

                case 'forward':
                  this.application.mediaplayer.seek(15);
                  break;

                case 'rewind':
                  this.application.mediaplayer.seek(-15);
                  break;
              }
            },
            PlayerOverlay: {
              _captureKey: function _captureKey() {
                this.showPlayerOverlay();

                this._setInterfaceTimeout();

                return false;
              },
              _enter: function _enter() {
                this._setInterfaceTimeout();
              },
              _exit: function _exit() {
                if (this._timeout) {
                  clearTimeout(this._timeout);
                }

                this._playerOverlay.overlayVisible = false;
              },
              showDetails: function showDetails() {
                this.changingOverlay = true;

                this._playerOverlay.tag('Subtitles').setSmooth('alpha', 0);

                this._playerOverlay.overlayAnimation.stop(); // this.application.mediaplayer.pause()


                return 'Active.DetailOverlay';
              },
              previousView: function previousView() {
                this.signal('previousView');
              }
            },
            DetailOverlay: {
              _exit: function _exit() {
                this._detailOverlay.overlayVisible = false;
              },
              _handleBack: function _handleBack() {
                this.fire('showPlayer');
              },
              showPlayer: function showPlayer() {
                if (this.mediaAvailable) {
                  this.changingOverlay = true;

                  this._detailOverlay.overlayAnimation.stop();

                  return 'Active.PlayerOverlay';
                } else {
                  this.signal('previousView');
                }
              },
              switchView: function switchView(e) {
                this.signal('switchView', e);
              }
            }
          }
        };
      }
    }]);

    return Player;
  }(lng.Component);

  var KeyboardButton =
  /*#__PURE__*/
  function (_lng$Component40) {
    _inherits(KeyboardButton, _lng$Component40);

    function KeyboardButton() {
      _classCallCheck(this, KeyboardButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardButton).apply(this, arguments));
    }

    _createClass(KeyboardButton, [{
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
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
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
          },
          _focus: function _focus() {
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
          },
          _unfocus: function _unfocus() {
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
  function (_lng$Component41) {
    _inherits(Keyboard, _lng$Component41);

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
            var _target = 0;

            for (var i = 0; i < targetItems.length; i++) {
              var ckx = this.children[this.rowIndex].x + ck.x;
              var tix = _targetRow.x + targetItems[i].x;

              if (ckx >= tix && ckx <= tix + targetItems[i].w || tix >= ckx && tix <= ckx + ck.w) {
                _target = i;
                break;
              }
            }

            this.colIndex = _target;
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
      key: "maxCharacters",
      get: function get() {
        return 100;
      }
    }, {
      key: "value",
      set: function set(v) {
        if (v.length <= this.maxCharacters) {
          this._value = v;
          this.signal('valueChanged', {
            value: v
          });
        }
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
        this.fire('_update');
      },
      get: function get() {
        return this._layout;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {};
      }
    }, {
      key: "_states",
      value: function _states() {
        var KeyboardLayouts = this.KeyboardLayouts;
        var KeyboardButton$$1 = this.KeyboardButton;
        return {
          _init: function _init() {
            this.reset();
            this.fire('_update');
          },
          _handleRight: function _handleRight() {
            return this._navigate('right', 1);
          },
          _handleLeft: function _handleLeft() {
            return this._navigate('left', -1);
          },
          _handleUp: function _handleUp() {
            return this._navigate('up', -1);
          },
          _handleDown: function _handleDown() {
            return this._navigate('down', 1);
          },
          toggleToLayout: function toggleToLayout(e) {
            this.layout = e.value;
            this.fire('_update');
          },
          _update: function _update() {
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
          },
          _handleEnter: function _handleEnter() {
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
                this.fire('toggleToLayout', {
                  value: key.toLayout
                });
                break;

              default:
                this.signal(key.action);
                break;
            }
          }
        };
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
    }]);

    return Keyboard;
  }(lng.Component);

  var KeyboardButton$1 =
  /*#__PURE__*/
  function (_lng$Component42) {
    _inherits(KeyboardButton$1, _lng$Component42);

    function KeyboardButton$1() {
      _classCallCheck(this, KeyboardButton$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardButton$1).apply(this, arguments));
    }

    _createClass(KeyboardButton$1, [{
      key: "theme",
      set: function set(theme) {
        this.patch({
          Background: {
            color: theme.keyboard.key,
            Label: {
              color: theme.keyboard.keyText || theme.text
            },
            Icon: {
              color: theme.keyboard.keyText || theme.text
            }
          }
        });
        this._fc = {
          label: theme.keyboard.keyText || theme.text,
          labelFocus: theme.textFocus,
          background: theme.keyboard.key,
          backgroundFocus: theme.focus
        };

        if (this.hasFocus()) {
          this.fire('_focus');
        }
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
                icon: {
                  src: "icons/ui/".concat(k.c.src, ".svg"),
                  w: k.c.w,
                  h: k.c.h
                }
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
            color: 0xff000000,
            Label: {
              color: 0xffffffff,
              mountX: 0.5,
              mountY: 0.4,
              text: {
                text: '',
                fontSize: 40,
                fontFace: 'TheSansB4',
                textAlign: 'center'
              }
            },
            Icon: {
              alpha: 0,
              mountX: 0.5,
              mountY: 0.5,
              type: IconItem
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.patch({
              Background: {
                texture: lng.Tools.getRoundRect(this.w, this.h, 5, 0, 0xffffffff, true, 0xffffffff),
                Label: {
                  x: this.w / 2,
                  y: this.h / 2
                },
                Icon: {
                  x: this.w / 2,
                  y: this.h / 2
                }
              }
            });
          },
          _focus: function _focus() {
            this.patch({
              Background: {
                smooth: {
                  color: this._fc.backgroundFocus
                },
                Label: {
                  smooth: {
                    color: this._fc.labelFocus
                  }
                },
                Icon: {
                  smooth: {
                    color: this._fc.labelFocus
                  }
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Background: {
                smooth: {
                  color: this._fc.background
                },
                Label: {
                  smooth: {
                    color: this._fc.label
                  }
                },
                Icon: {
                  smooth: {
                    color: this._fc.label
                  }
                }
              }
            });
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
      key: "maxCharacters",
      get: function get() {
        return 37;
      }
    }], [{
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
    'ABC': {
      keyWidth: 126,
      keyHeight: 80,
      horizontalSpacing: 16,
      verticalSpacing: 18,
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
              c: 'Z'
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
            },
            Key11: {
              c: 'Ü'
            },
            Key12: {
              c: {
                src: 'delete',
                w: 130,
                h: 130
              },
              action: 'backspace'
            }
          }
        },
        Row2: {
          x: 63,
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
            },
            Key10: {
              c: 'Ö'
            },
            Key11: {
              c: 'Ä'
            }
          }
        },
        Row3: {
          x: 63,
          keys: {
            Key1: {
              c: 'Y'
            },
            Key2: {
              c: 'X'
            },
            Key3: {
              c: 'C'
            },
            Key4: {
              c: 'V'
            },
            Key5: {
              c: 'B'
            },
            Key6: {
              c: 'N'
            },
            Key7: {
              c: 'M'
            },
            Key8: {
              c: '-'
            },
            Key9: {
              c: 'ß'
            },
            Key10: {
              w: 252 + 16,
              c: 'ENTF.',
              action: 'delete'
            }
          }
        },
        Row4: {
          keys: {
            Key1: {
              w: 252 + 16,
              toLayout: '#123',
              c: '#123',
              action: 'toggleToLayout'
            },
            Key2: {
              w: 6 * 126 + 5 * 16,
              c: 'LEERZEICHEN',
              action: 'space'
            },
            Key3: {
              w: 252 + 16 + 63,
              c: 'SUCHEN',
              action: 'search'
            },
            Key4: {
              w: 126 + 63 + 16,
              c: {
                src: 'keyboard',
                w: 84,
                h: 84
              },
              action: 'hideKeyboard'
            }
          }
        }
      }
    },
    '#123': {
      keyWidth: 126,
      keyHeight: 80,
      horizontalSpacing: 16,
      verticalSpacing: 18,
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
              c: '-'
            },
            Key5: {
              c: '+'
            },
            Key6: {
              c: '*'
            },
            Key7: {
              c: '/'
            },
            Key8: {
              c: '\\'
            },
            Key9: {
              c: '|'
            },
            Key10: {
              c: '{'
            },
            Key11: {
              c: '}'
            },
            Key12: {
              c: {
                src: 'delete',
                w: 130,
                h: 130
              },
              action: 'backspace'
            }
          }
        },
        Row2: {
          x: 63,
          keys: {
            Key1: {
              c: '4'
            },
            Key2: {
              c: '5'
            },
            Key3: {
              c: '6'
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
              c: ':'
            },
            Key10: {
              c: '['
            },
            Key11: {
              c: ']'
            }
          }
        },
        Row3: {
          x: 63,
          keys: {
            Key1: {
              c: '7'
            },
            Key2: {
              c: '8'
            },
            Key3: {
              c: '9'
            },
            Key4: {
              c: '0'
            },
            Key5: {
              c: '$'
            },
            Key6: {
              c: '#'
            },
            Key7: {
              c: '!'
            },
            Key8: {
              c: '<'
            },
            Key9: {
              c: '>'
            },
            Key10: {
              w: 252 + 16,
              c: 'ENTF.',
              action: 'delete'
            }
          }
        },
        Row4: {
          keys: {
            Key1: {
              w: 252 + 16,
              toLayout: 'ABC',
              c: 'ABC',
              action: 'toggleToLayout'
            },
            Key2: {
              w: 6 * 126 + 5 * 16,
              c: 'LEERZEICHEN',
              action: 'space'
            },
            Key3: {
              w: 252 + 16 + 63,
              c: 'SUCHEN',
              action: 'search'
            },
            Key4: {
              w: 126 + 63 + 16,
              c: {
                src: 'keyboard',
                w: 84,
                h: 84
              },
              action: 'hideKeyboard'
            }
          }
        }
      }
    }
  };

  var InputField =
  /*#__PURE__*/
  function (_lng$Component43) {
    _inherits(InputField, _lng$Component43);

    function InputField() {
      _classCallCheck(this, InputField);

      return _possibleConstructorReturn(this, _getPrototypeOf(InputField).apply(this, arguments));
    }

    _createClass(InputField, [{
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
      key: "theme",
      set: function set(theme) {
        var focus = theme.focus,
            textFocus = theme.textFocus,
            search = theme.search;
        this.patch({
          Background: {
            Left: {
              color: search.input
            },
            Right: {
              color: search.input
            },
            Middle: {
              color: search.input
            }
          },
          Icon: {
            color: search.icon
          },
          QueryString: {
            color: search.erase
          }
        });
        this._emptyInputColor = search.erase;
        this._hasInputColor = search.text;
        this._fc = {
          focus: focus,
          textFocus: textFocus,
          icon: search.icon,
          input: search.input
        };
      }
    }, {
      key: "value",
      set: function set(v) {
        var screenValue = this.inspectValue(v);
        this.patch({
          QueryString: {
            color: this.hasInput ? this._hasInputColor : this._emptyInputColor,
            text: {
              text: screenValue
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
        return 'Suche nach Video on Demand, Sendungen, Themen oder Livestreams';
      }
    }, {
      key: "hasInput",
      get: function get() {
        return this._hasInput;
      }
    }, {
      key: "expand",
      set: function set(v) {
        var delay = v ? 0.25 : 0;
        this.patch({
          Background: {
            transitions: {
              alpha: {
                duration: 0.25,
                delay: delay
              },
              x: {
                duration: 0.25,
                delay: delay
              }
            },
            smooth: {
              alpha: !!v,
              x: v ? 1040 : 1755
            },
            Middle: {
              transitions: {
                w: {
                  duration: 0.25,
                  delay: delay
                }
              },
              smooth: {
                w: v ? 1200 : 100
              }
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            mount: 0.5,
            x: 1755,
            alpha: 0,
            Left: {
              mountX: 0.95,
              texture: lng.Tools.getRoundRect(37, 74, [37, 0, 0, 37], 0, 0xffffffff, true, 0xffffffff)
            },
            Right: {
              mountX: 0.15,
              texture: lng.Tools.getRoundRect(37, 74, [0, 37, 37, 0], 0, 0xffffffff, true, 0xffffffff)
            },
            Middle: {
              mountX: 0.5,
              y: 1,
              h: 74,
              w: 1,
              rect: true
            }
          },
          Icon: {
            mountX: 0.5,
            mountY: 0.5,
            y: 38,
            type: IconItem,
            icon: {
              src: 'icons/ui/search.svg',
              w: 85,
              h: 85
            }
          },
          QueryString: {
            alpha: 0,
            mountY: 0.4,
            y: 37,
            x: 115,
            text: {
              text: 'Suche nach Video on Demand, Sendungen, Themen oder Livestreams',
              fontSize: 35,
              fontFace: 'TheSansB4',
              textAlign: 'left'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this62 = this;

            this._hasInput = false;
            var middle = this.tag('Middle');
            var icon = this.tag('Icon');
            var queryString = this.tag('QueryString');
            var background = this.tag('Background');

            middle.onUpdate = function () {
              _this62.patch({
                Background: {
                  Left: {
                    x: -(middle.w / 2)
                  },
                  Right: {
                    x: middle.w / 2
                  }
                },
                Icon: {
                  x: background.x - middle.w / 2
                },
                QueryString: {
                  x: background.x - (middle.w / 2 - 78)
                }
              });

              if (middle.w > 50 && !icon.transition('mountX').isRunning()) {
                icon.setSmooth('mountX', 0.35);
              }

              if (middle.w < 50 && !icon.transition('mountX').isRunning()) {
                icon.setSmooth('mountX', 0.5);
              }

              if (middle.w > 1100 && !queryString.transition('alpha').isRunning()) {
                queryString.setSmooth('alpha', 1);
              }

              if (middle.w < 1100 && !queryString.transition('alpha').isRunning()) {
                queryString.setSmooth('alpha', 0);
              }
            };
          },
          _focus: function _focus() {
            this.patch({
              Background: {
                Left: {
                  smooth: {
                    color: this._fc.focus
                  }
                },
                Right: {
                  smooth: {
                    color: this._fc.focus
                  }
                },
                Middle: {
                  smooth: {
                    color: this._fc.focus
                  }
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.textFocus
                }
              },
              QueryString: {
                smooth: {
                  color: this._fc.textFocus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Background: {
                Left: {
                  smooth: {
                    color: this._fc.input
                  }
                },
                Right: {
                  smooth: {
                    color: this._fc.input
                  }
                },
                Middle: {
                  smooth: {
                    color: this._fc.input
                  }
                }
              },
              Icon: {
                smooth: {
                  color: this._fc.icon
                }
              },
              QueryString: {
                smooth: {
                  color: this.hasInput ? this._hasInputColor : this._emptyInputColor
                }
              }
            });
          }
        };
      }
    }]);

    return InputField;
  }(lng.Component);

  var SearchResults =
  /*#__PURE__*/
  function (_lng$Component44) {
    _inherits(SearchResults, _lng$Component44);

    function SearchResults() {
      _classCallCheck(this, SearchResults);

      return _possibleConstructorReturn(this, _getPrototypeOf(SearchResults).apply(this, arguments));
    }

    _createClass(SearchResults, [{
      key: "_getFocused",
      value: function _getFocused() {
        switch (this.state) {
          case 'OnDemand':
            return this.tag('Grid');

          case 'Shows':
            return this.tag('Shows');

          default:
            return this;
        }
      }
    }, {
      key: "theme",
      set: function set(v) {
        this._t = v;
      }
    }, {
      key: "items",
      set: function set(response) {
        var _this63 = this;

        var _response$showResults = response.showResults,
            showResults = _response$showResults === void 0 ? [] : _response$showResults,
            _response$vodResults = response.vodResults,
            vodResults = _response$vodResults === void 0 ? [] : _response$vodResults;
        var vod = [];
        var shows = [];

        if (showResults.length) {
          shows = showResults;
        }

        if (vodResults) {
          vod = vodResults.map(function (item) {
            return {
              ref: "T".concat(item.id),
              base: 'grid',
              item: item,
              theme: _this63._t,
              type: GridCell
            };
          });
        }

        this._hasItems = showResults.length > 0 || vodResults.length > 0;
        this.patch({
          y: 0,
          alpha: !!this._hasItems,
          Shows: {
            alpha: !!(shows.length > 0),
            theme: this._t,
            widget: {
              title: "Sendungen",
              titleVisible: true,
              teasers: shows
            }
          },
          OnDemand: {
            alpha: !!(vod.length > 0),
            Grid: {
              items: vod
            }
          }
        });
        var target = 'Empty';

        if (this._hasItems) {
          target = 'Shows';

          if (shows.length === 0) {
            target = 'OnDemand';
          }
        }

        this.fire('reset', {
          target: target
        });
      }
    }, {
      key: "hasItems",
      set: function set(v) {
        this._hasItems = v;
      },
      get: function get() {
        return this._hasItems;
      }
    }, {
      key: "focusedItem",
      get: function get() {
        if (this.state === 'OnDemand') {
          return this.tag('Grid').item;
        }

        return this.tag('Shows');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          Shows: {
            type: GridList,
            y: 220
          },
          OnDemand: {
            x: 115,
            y: 220 + 500,
            Title: {
              text: {
                text: 'Videos on Demand',
                fontSize: 40,
                maxLines: 1,
                fontFace: 'TheSansB4'
              }
            },
            Grid: {
              type: Grid,
              paddingTop: 75,
              paddingBottom: 115,
              h: 850,
              signals: {
                rowIndexChanged: true
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this64 = this;

            var grid = this.tag('Grid');
            var gridWrapper = grid.tag('Wrapper');
            gridWrapper.transition('y').on('start', function () {
              var targetValue = gridWrapper.transition('y').targetValue;
              var scrollTo = grid.y - targetValue;

              _this64.patch({
                Shows: {
                  smooth: {
                    y: 220 - 75 - scrollTo
                  }
                },
                OnDemand: {
                  Title: {
                    smooth: {
                      y: -75 - scrollTo
                    }
                  }
                }
              });
            });
            return 'Empty';
          },
          reset: function reset(_ref23) {
            var target = _ref23.target;
            return target;
          },
          Empty: {},
          Shows: {
            _handleDown: 'OnDemand'
          },
          OnDemand: {
            _enter: function _enter() {
              this.setSmooth('y', -500);
            },
            _exit: function _exit() {
              if (this.tag('Shows').dataLength > 0) {
                this.setSmooth('y', 0);
              }
            },
            _handleUp: function _handleUp() {
              if (this.tag('Shows').dataLength > 0) {
                return 'Shows';
              }

              return false;
            }
          }
        };
      }
    }]);

    return SearchResults;
  }(lng.Component);

  var SimpleButton =
  /*#__PURE__*/
  function (_lng$Component45) {
    _inherits(SimpleButton, _lng$Component45);

    function SimpleButton() {
      _classCallCheck(this, SimpleButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(SimpleButton).apply(this, arguments));
    }

    _createClass(SimpleButton, [{
      key: "theme",
      set: function set(_ref24) {
        var text = _ref24.text,
            focus = _ref24.focus,
            textFocus = _ref24.textFocus;
        this.patch({
          Background: {
            color: focus
          },
          Label: {
            color: text
          }
        });
        this._fc = {
          text: text,
          textFocus: textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 270,
          Background: {
            alpha: 0,
            color: 0xffff0000
          },
          Label: {
            x: 15,
            y: 36,
            mountY: 0.4,
            color: 0xffffffff,
            text: {
              text: 'App schließen',
              fontSize: 42,
              fontFace: 'TheSansB4',
              textAlign: 'center'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            var _this65 = this;

            var _this$w = this.w,
                w = _this$w === void 0 ? 0 : _this$w;
            var _this$item5 = this.item,
                _this$item5$fontSize = _this$item5.fontSize,
                fontSize = _this$item5$fontSize === void 0 ? 42 : _this$item5$fontSize,
                text = _this$item5.label;
            this.patch({
              Background: {
                texture: lng.Tools.getRoundRect(w, this.h, this.h / 2, 0, 0xffffffff, true, 0xffffffff)
              },
              Label: {
                y: this.h / 2,
                mountX: 0.5,
                x: w / 2,
                text: {
                  text: text,
                  fontSize: fontSize
                }
              }
            });
            var label = this.tag('Label');
            label.on('txLoaded', function () {
              var width = label.renderWidth + 30;

              if (w === 0 || w < width) {
                _this65.patch({
                  w: width,
                  Background: {
                    texture: lng.Tools.getRoundRect(w, _this65.h, _this65.h / 2, 0, 0xffffffff, true, 0xffffffff)
                  },
                  Label: {
                    y: _this65.h / 2,
                    mountX: 0.5,
                    x: width / 2,
                    text: {
                      text: text,
                      fontSize: fontSize
                    }
                  }
                });
              }
            });
          },
          _focus: function _focus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 1
                }
              },
              Label: {
                smooth: {
                  color: this._fc.textFocus
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 0
                }
              },
              Label: {
                smooth: {
                  color: this._fc.text
                }
              }
            });
          }
        };
      }
    }]);

    return SimpleButton;
  }(lng.Component);

  var SearchPage =
  /*#__PURE__*/
  function (_lng$Component46) {
    _inherits(SearchPage, _lng$Component46);

    function SearchPage() {
      _classCallCheck(this, SearchPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(SearchPage).apply(this, arguments));
    }

    _createClass(SearchPage, [{
      key: "setThemeKeyboardItems",
      value: function setThemeKeyboardItems() {
        var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._theme;
        var keyboard = this.tag('Keyboard');
        keyboard.children.forEach(function (row) {
          row.children.forEach(function (key) {
            key.theme = theme;
          });
        });
      }
    }, {
      key: "update",
      value: function update(response) {
        this.tag('SearchResults').items = response;
      }
    }, {
      key: "doSearch",
      value: function doSearch(value) {
        var _this66 = this;

        this.api.search(value).then(function (response) {
          _this66.update(response);
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.tag('InputField').reset();
        this.tag('Keyboard').reset();
        this.tag('SearchResults').items = {};
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this.state.replace('Active.', '')) || this;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._theme = theme;
        var _theme$logo2 = theme.logo,
            src = _theme$logo2.src,
            width = _theme$logo2.width;
        this.patch({
          SearchResults: {
            theme: theme
          },
          TopShadow: {
            colorBottom: 0x00000000,
            colorTop: theme.globalShadow
          },
          BackButton: {
            theme: theme
          },
          ChannelLogo: {
            mount: 0.5,
            icon: {
              src: src,
              w: width * 1.3,
              h: 48 * 1.3
            }
          },
          InputField: {
            theme: theme
          },
          Cancel: {
            theme: theme
          },
          Shadow: {
            Texture: {
              color: theme.search.shadow
            }
          },
          NoResults: {
            theme: theme
          },
          KeyboardBackground: {
            color: theme.keyboard.background
          }
        });
        this.setThemeKeyboardItems();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          w: 1920,
          h: 1080,
          clipbox: true,
          // VerticalSlider: {w: 1920, h: 1080, type: Slider, orientation: 'vertical', marginBottom: 80, marginTop: 220, itemSpacing: 45, signals: {indexChanged: true, outOfBounds: true}},
          SearchResults: {
            type: SearchResults
          },
          TopShadow: {
            zIndex: 4,
            h: 275,
            w: 1920,
            rect: true
          },
          BackButton: {
            zIndex: 4,
            type: ArdNavigationOptionItem,
            y: 38,
            x: 85,
            icon: {
              src: 'icons/ui/arrowLeft.svg',
              w: 75,
              h: 75
            }
          },
          ChannelLogo: {
            zIndex: 4,
            y: 87,
            mount: 0.5,
            x: 290,
            type: IconItem,
            maxWidth: 200
          },
          InputField: {
            zIndex: 4,
            type: InputField,
            y: 52
          },
          Cancel: {
            zIndex: 4,
            type: ArdNavigationOptionItem,
            y: 38,
            mountX: 1,
            x: 1835,
            icon: {
              src: 'icons/ui/close.svg',
              w: 75,
              h: 75
            }
          },
          Shadow: {
            x: 960,
            mountX: 0.5,
            y: 505,
            w: 1920,
            h: 40,
            clipping: true,
            Texture: {
              x: 960,
              mountX: 0.5,
              color: 0xffffffff,
              texture: lng.Tools.getShadowRect(1920, 40, 0, 30, 30),
              transitions: {
                y: {
                  duration: 0.5,
                  timingFunction: 'ease-out'
                }
              }
            }
          },
          NoResults: {
            alpha: 0,
            type: NoResultsItem,
            y: 190
          },
          KeyboardBackground: {
            h: 535,
            w: 1920,
            y: 545,
            rect: true,
            Keyboard: {
              x: 110,
              y: 30,
              type: Keyboard$1,
              signals: {
                keysUpdated: true,
                valueChanged: true,
                search: true,
                hideKeyboard: true
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _handleLeft: function _handleLeft() {//block handleLeft from Bubbling to app
          },
          _handleUp: function _handleUp() {//block handleUp from Bubbling to app
          },
          loadView: function loadView(_ref25) {
            var isPreviousView = _ref25.isPreviousView;
            this.isPreviousView = isPreviousView;
            return 'Show';
          },
          hideView: 'Hide',
          finishedLoading: 'Show',
          Loading: {
            finished: 'Show'
          },
          Hide: {
            _enter: function _enter() {
              var _this67 = this;

              var animation = this.animation({
                duration: 0.5,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0.5: 1,
                    1: 0
                  }
                }, {
                  t: 'Cancel',
                  p: 'alpha',
                  v: {
                    0: 1,
                    0.5: 0
                  }
                }, {
                  t: 'ChannelLogo',
                  p: 'x',
                  v: {
                    0: 290,
                    0.5: 960
                  }
                }]
              });
              this.tag('InputField').expand = false;
              animation.on('finish', function () {
                _this67.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this68 = this;

              var animation = this.animation({
                duration: 0.5,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    0.5: 1
                  }
                }, {
                  t: 'Cancel',
                  p: 'alpha',
                  v: {
                    0.5: 0,
                    1: 1
                  }
                }, {
                  t: 'ChannelLogo',
                  p: 'x',
                  v: {
                    0.5: 960,
                    1: 290
                  }
                }]
              });
              this.tag('InputField').expand = true;
              animation.on('finish', function () {
                _this68.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return this.isPreviousView ? 'Active.SearchResults' : 'Active.Keyboard';
            }
          },
          Idle: {},
          Active: {
            valueChanged: function valueChanged(e) {
              this.tag('InputField').value = e.value;
              var inputField = this.tag('InputField');

              if (inputField.hasInput && e.value.length > 2) {
                this.doSearch(e.value);
              } else if (e.value.length === 0) {
                this.tag('SearchResults').items = {};
                this.tag('NoResults').alpha = 0;
              }
            },
            hideKeyboard: function hideKeyboard() {
              if (this.tag('SearchResults').hasItems) {
                return 'Active.SearchResults';
              }

              return 'Active.Cancel';
            },
            Keyboard: {
              _enter: function _enter() {
                this.patch({
                  Shadow: {
                    smooth: {
                      y: 505
                    }
                  },
                  KeyboardBackground: {
                    smooth: {
                      y: 545
                    }
                  }
                });
              },
              _handleUp: function _handleUp() {
                if (this.tag('SearchResults').hasItems) {
                  return 'Active.SearchResults';
                }

                return 'Active.InputField';
              },
              keysUpdated: function keysUpdated() {
                this.setThemeKeyboardItems();
              },
              search: function search() {
                if (this.tag('InputField').hasInput) {
                  this.doSearch(this.tag('Keyboard').value);
                }
              }
            },
            SearchResults: {
              _enter: function _enter() {
                this.patch({
                  Shadow: {
                    smooth: {
                      y: 1080
                    }
                  },
                  KeyboardBackground: {
                    smooth: {
                      y: 1120
                    }
                  }
                });
              },
              _handleEnter: function _handleEnter() {
                var item = this.tag('SearchResults').focusedItem.item;

                switch (item.type) {
                  case 'live':
                    this.signal('switchView', {
                      view: 'ComingSoon',
                      persist: {
                        type: 'live'
                      },
                      ignore: true
                    });
                    break;

                  case 'show':
                    this.signal('switchView', {
                      view: 'ShowPage',
                      persist: {
                        targetId: item.links.target.id
                      }
                    });
                    break;

                  default:
                    this.signal('switchView', {
                      view: 'Player',
                      persist: {
                        targetId: item.links.target.id
                      },
                      ignore: true
                    });
                    break;
                }
              },
              _handleUp: 'Active.InputField'
            },
            Cancel: {
              _handleEnter: function _handleEnter() {
                this.reset();
                this.signal('previousView');
              },
              _handleDown: function _handleDown() {
                if (this.tag('SearchResults').hasItems) {
                  return 'Active.SearchResults';
                }

                return 'Active.Keyboard';
              },
              _handleLeft: 'Active.InputField'
            },
            InputField: {
              _handleEnter: function _handleEnter() {
                return 'Active.Keyboard';
              },
              _handleDown: function _handleDown() {
                if (this.tag('SearchResults').hasItems) {
                  return 'Active.SearchResults';
                }

                return 'Active.Keyboard';
              },
              _handleRight: 'Active.Cancel',
              _handleLeft: 'Active.BackButton'
            },
            BackButton: {
              _handleEnter: function _handleEnter() {
                this.signal('previousView');
              },
              _handleDown: function _handleDown() {
                if (this.tag('SearchResults').hasItems) {
                  return 'Active.SearchResults';
                }

                return 'Active.Keyboard';
              },
              _handleRight: 'Active.InputField'
            }
          }
        };
      }
    }]);

    return SearchPage;
  }(lng.Component);

  var ShowPage =
  /*#__PURE__*/
  function (_lng$Component47) {
    _inherits(ShowPage, _lng$Component47);

    function ShowPage() {
      _classCallCheck(this, ShowPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(ShowPage).apply(this, arguments));
    }

    _createClass(ShowPage, [{
      key: "update",
      value: function update(_ref26) {
        var _this69 = this;

        var title = _ref26.title,
            image = _ref26.image,
            synopsis = _ref26.synopsis,
            teasers = _ref26.teasers;
        var hasDesc = synopsis !== null;
        this.patch({
          BackgroundImage: {
            src: ux.Ui.getImageUrl(image.src.replace('{width}', 1920), {
              width: 1920,
              height: 1080,
              type: 'crop'
            })
          },
          Title: {
            text: {
              text: title
            }
          },
          Synopsis: {
            alpha: !!hasDesc,
            synopsis: synopsis
          },
          Grid: {
            y: !hasDesc ? 0 : 230,
            items: teasers.map(function (item) {
              var time = _this69.api.getDate(item.broadcastedOn, true);

              if (item.subtitled) {
                time += " \u2022 UT";
              }

              return {
                ref: "T".concat(item.id),
                base: 'grid',
                showTime: true,
                time: time,
                item: item,
                theme: _this69._t,
                type: GridCell
              };
            })
          },
          NoItems: {
            alpha: teasers.length === 0 ? 0.5 : 0
          }
        });
        this.fire('finishedLoading');
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        var stateConvert = this.state.replace('Active.', '');

        if (this.tag(stateConvert)) {
          return this.tag(stateConvert);
        }

        return this;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this._t = theme;
        this.patch({
          BackgroundOverlay: {
            color: theme.globalShadow
          },
          Shadow: {
            colorBottom: 0x00000000,
            colorTop: theme.globalShadow
          },
          NoItems: {
            color: theme.toolbar.text
          },
          BackButton: {
            theme: theme
          },
          Title: {
            color: theme.toolbar.text
          },
          Synopsis: {
            theme: theme
          }
        });
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          w: 1920,
          h: 1080,
          clipbox: true,
          BackgroundImage: {
            zIndex: 0,
            alpha: 1,
            w: 1920,
            h: 1080
          },
          BackgroundOverlay: {
            color: 0x3300ff00,
            rect: true,
            w: 1920,
            h: 1080
          },
          Grid: {
            type: Grid,
            y: 230,
            x: 115,
            paddingTop: 206,
            paddingBottom: 115,
            signals: {
              rowIndexChanged: true,
              outOfBounds: true
            }
          },
          NoItems: {
            alpha: 0.5,
            x: 960,
            y: 600,
            mount: 0.5,
            text: {
              text: "Kein Inhalt vorhanden",
              fontFace: 'TheSansB4',
              fontSize: 36
            }
          },
          Shadow: {
            y: 0,
            alpha: 0,
            h: 185,
            w: 1920,
            rect: true
          },
          BackButton: {
            zIndex: 2,
            type: ArdNavigationOptionItem,
            y: 42,
            x: 115,
            icon: {
              src: 'icons/ui/arrowLeft.svg'
            }
          },
          Title: {
            mountX: 0.5,
            x: 960,
            y: 50,
            text: {
              text: 'Item Title',
              fontSize: 50,
              fontFace: 'TheSansB6',
              textAlign: 'center'
            }
          },
          Synopsis: {
            zIndex: 2,
            x: 90,
            y: 200,
            type: SynopsisItem,
            signals: {
              showSynopsisAnimation: true,
              hideSynopsisAnimation: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.showSynopsisAnimation = this.animation({
              duration: 0.375,
              stopMethod: 'reverse',
              actions: [{
                t: 'Grid',
                p: 'alpha',
                v: {
                  0: 1,
                  1: 0
                }
              }, {
                t: 'Grid',
                p: 'y',
                v: {
                  0: 230,
                  1: 600
                }
              }]
            });
          },
          _handleUp: function _handleUp() {//block handleUp from bubbling to app
          },
          _handleLeft: function _handleLeft() {//block handleLeft from bubbling to app
          },
          loadView: function loadView(_ref27) {
            var _this70 = this;

            var _ref27$toLoad$persist = _ref27.toLoad.persist,
                targetId = _ref27$toLoad$persist.targetId,
                _ref27$toLoad$persist2 = _ref27$toLoad$persist.useTarget,
                useTarget = _ref27$toLoad$persist2 === void 0 ? false : _ref27$toLoad$persist2;
            this.fire('loading');
            this.mediaAvailable = false;

            if (!useTarget) {
              this.api.getShowPage(targetId).then(function (response) {
                _this70.update(response);
              });
            } else {
              this.update(target);
            }
          },
          hideView: 'Hide',
          loading: 'Loading',
          finishedLoading: 'Show',
          Loading: {
            finished: 'Show'
          },
          Hide: {
            _enter: function _enter() {
              var _this71 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this71.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this72 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this72.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');

              if (!this.tag('Grid').length) {
                return 'Active.BackButton';
              }

              return 'Active.Grid';
            }
          },
          Idle: {},
          Active: {
            BackButton: {
              _handleDown: function _handleDown() {
                if (!this.tag('Synopsis').moreTextLines) {
                  return 'Active.Grid';
                }

                return 'Active.Synopsis';
              },
              _handleEnter: function _handleEnter() {
                this.signal('previousView');
              }
            },
            Synopsis: {
              showSynopsisAnimation: function showSynopsisAnimation() {
                this.showSynopsisAnimation.start();
              },
              hideSynopsisAnimation: function hideSynopsisAnimation() {
                this.showSynopsisAnimation.stop();
              },
              _handleUp: 'Active.BackButton',
              _handleDown: function _handleDown() {
                if (this.tag('Grid').length) {
                  return 'Active.Grid';
                }
              }
            },
            Grid: {
              _exit: function _exit() {
                this.patch({
                  Grid: {
                    smooth: {
                      y: this.tag('Synopsis').length > 0 ? 230 : 0
                    }
                  },
                  Shadow: {
                    smooth: {
                      alpha: 0
                    }
                  },
                  Synopsis: {
                    smooth: {
                      alpha: 1
                    }
                  }
                });
              },
              _handleUp: function _handleUp() {
                if (!this.tag('Synopsis').moreTextLines) {
                  return 'Active.BackButton';
                }

                return 'Active.Synopsis';
              },
              rowIndexChanged: function rowIndexChanged(e) {
                if (e.row === 1 && e.previousRow === 0) {
                  this.patch({
                    Grid: {
                      smooth: {
                        y: 0
                      }
                    },
                    Shadow: {
                      smooth: {
                        alpha: 1
                      }
                    },
                    Synopsis: {
                      smooth: {
                        alpha: 0
                      }
                    }
                  });
                }
              },
              _handleEnter: function _handleEnter() {
                var item = this.tag('Grid').item.item;

                switch (item.type) {
                  case 'live':
                    this.signal('switchView', {
                      view: 'ComingSoon',
                      persist: {
                        type: 'live'
                      },
                      ignore: true
                    });
                    break;

                  default:
                    this.signal('switchView', {
                      view: 'Player',
                      persist: {
                        targetId: item.links.target.id
                      },
                      ignore: true
                    });
                    break;
                }
              }
            }
          }
        };
      }
    }]);

    return ShowPage;
  }(lng.Component);

  var SettingItem =
  /*#__PURE__*/
  function (_lng$Component48) {
    _inherits(SettingItem, _lng$Component48);

    function SettingItem() {
      _classCallCheck(this, SettingItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(SettingItem).apply(this, arguments));
    }

    _createClass(SettingItem, [{
      key: "on",
      set: function set(v) {
        this._on = v;
        var toggleColor = 0xffe7e7e7;

        if (this.on && this.hasFocus()) {
          toggleColor = 0xff179139;
        } else if (this.on) {
          toggleColor = this._fc.focus;
        }

        this.tag('Toggle').patch({
          smooth: {
            color: toggleColor
          },
          Circle: {
            smooth: {
              x: this.on ? 55 : 0
            }
          }
        });
      },
      get: function get() {
        return this._on;
      }
    }, {
      key: "theme",
      set: function set(_ref28) {
        var focus = _ref28.focus,
            text = _ref28.text,
            textFocus = _ref28.textFocus;
        this.patch({
          Wrapper: {
            Setting: {
              Background: {
                color: focus
              },
              Label: {
                color: text
              }
            },
            BorderTop: {
              color: text
            },
            Toggle: {
              Circle: {
                color: text
              }
            },
            BorderBottom: {
              color: text
            }
          }
        });
        this._fc = {
          focus: focus,
          text: text,
          textFocus: textFocus
        };
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          h: 86,
          Wrapper: {
            w: 1500,
            h: 86,
            Setting: {
              Background: {
                alpha: 0,
                w: 1500,
                h: 86,
                rect: true
              },
              Label: {
                x: 25,
                y: 17,
                w: 1250,
                text: {
                  text: 'Setting',
                  fontSize: 36,
                  maxLines: 1,
                  lineHeight: 50,
                  fontFace: 'TheSansB4',
                  textAlign: 'left'
                }
              }
            },
            BorderTop: {
              y: -1,
              w: 1500,
              h: 2,
              rect: true
            },
            Toggle: {
              mountX: 1,
              x: 1475,
              y: 17,
              color: 0xffe7e7e7,
              texture: lng.Tools.getRoundRect(105, 50, 25, 0, 0xffffffff, true, 0xffffffff),
              Circle: {
                texture: lng.Tools.getRoundRect(50, 50, 25, 0, 0xffffffff, true, 0xffffffff)
              }
            },
            BorderBottom: {
              y: 85,
              w: 1500,
              h: 2,
              rect: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            this.patch({
              Wrapper: {
                Setting: {
                  Label: {
                    text: {
                      text: this.item.setting
                    }
                  }
                }
              }
            });
          },
          _focus: function _focus() {
            this.tag('Wrapper').patch({
              Setting: {
                Background: {
                  smooth: {
                    alpha: 1
                  }
                },
                Label: {
                  color: this._fc.textFocus
                }
              },
              Toggle: {
                smooth: {
                  color: this.on ? 0xff179139 : 0xffe7e7e7
                }
              }
            });
          },
          _unfocus: function _unfocus() {
            this.tag('Wrapper').patch({
              Setting: {
                Background: {
                  smooth: {
                    alpha: 0
                  }
                },
                Label: {
                  color: this._fc.text
                }
              },
              Toggle: {
                smooth: {
                  color: this.on ? this._fc.focus : 0xffe7e7e7
                }
              }
            });
          },
          _handleEnter: function _handleEnter() {
            this.on = !this._on;
            return false;
          }
        };
      }
    }]);

    return SettingItem;
  }(lng.Component);

  var SettingsPage =
  /*#__PURE__*/
  function (_lng$Component49) {
    _inherits(SettingsPage, _lng$Component49);

    function SettingsPage() {
      _classCallCheck(this, SettingsPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(SettingsPage).apply(this, arguments));
    }

    _createClass(SettingsPage, [{
      key: "_getFocused",
      value: function _getFocused() {
        if (this.state === 'Active') {
          return this.tag('Settings');
        }
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Settings: {
            theme: theme
          },
          Version: {
            color: theme.text
          }
        });
        this._theme = theme;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          Settings: {
            type: InfoCollection,
            label: 'MEDIENWIEDERGABE',
            x: 210,
            y: 180
          },
          Version: {
            alpha: 0.7,
            mount: 1,
            x: 1830,
            y: 990,
            text: {
              text: "AppVersion: ".concat(AppDefinition.versionNumber),
              fontSize: 20
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          loadView: function loadView() {
            this.tag('Settings').items = [{
              type: SettingItem,
              setting: 'subtitles',
              theme: this._theme,
              item: {
                setting: 'Untertitel anzeigen, falls vorhanden?'
              },
              on: this.api.getSubtitlesOn()
            }];
            return 'Show';
          },
          hideView: 'Hide',
          Hide: {
            _enter: function _enter() {
              var _this73 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this73.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this74 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this74.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return 'Active';
            }
          },
          Idle: {},
          Active: {
            _handleUp: function _handleUp() {
              this.signal('outOfBounds', {
                direction: 'up'
              });
            },
            _handleEnter: function _handleEnter(e) {
              var item = this.tag('Settings').item;

              if (item.setting === 'subtitles') {
                this.api.setSubtitlesOn(item.on);
              }
            }
          }
        };
      }
    }]);

    return SettingsPage;
  }(lng.Component);

  var Splash =
  /*#__PURE__*/
  function (_lng$Component50) {
    _inherits(Splash, _lng$Component50);

    function Splash() {
      _classCallCheck(this, Splash);

      return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
    }

    _createClass(Splash, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this;
      }
    }, {
      key: "api",
      get: function get() {
        return this.cparent.cparent.cparent.api;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Image: {
            w: 1920,
            h: 1080,
            src: AppDefinition.getPath('images/ardSplashScreen.png')
          },
          Version: {
            alpha: 0.7,
            mount: 1,
            x: 1830,
            y: 990,
            text: {
              text: "AppVersion: ".concat(AppDefinition.versionNumber),
              fontSize: 20
            }
          },
          Loader: {
            y: 900,
            type: Loader
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            return 'Active';
          },
          _focus: function _focus() {
            var _this75 = this;

            this.tag('Loader').show(1);
            this.api.getMainPageData('ard').then(function (response) {
              if (response) {
                _this75.signal('switchView', {
                  view: 'MainPage',
                  persist: {
                    data: response,
                    type: 'alle'
                  }
                });
              }
            });
          },
          hideView: 'Hide',
          Hide: {
            _enter: function _enter() {
              var _this76 = this;

              var animation = this.animation({
                duration: 0.25,
                delay: 1,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this76.fire('viewHidden');
              });
              animation.start();
            },
            viewHidden: function viewHidden() {
              this.signal('viewHidden');
              return 'Idle';
            }
          },
          Show: {
            _enter: function _enter() {
              var _this77 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this77.fire('viewVisible');
              });
              animation.start();
            },
            viewVisible: function viewVisible() {
              this.signal('viewVisible');
              return 'Active';
            }
          },
          Idle: {
            loadView: 'Show'
          },
          Active: {}
        };
      }
    }]);

    return Splash;
  }(lng.Component);

  var ErrorMessage =
  /*#__PURE__*/
  function (_lng$Component51) {
    _inherits(ErrorMessage, _lng$Component51);

    function ErrorMessage() {
      _classCallCheck(this, ErrorMessage);

      return _possibleConstructorReturn(this, _getPrototypeOf(ErrorMessage).apply(this, arguments));
    }

    _createClass(ErrorMessage, [{
      key: "show",
      value: function show(message, state) {
        if (state === 'Splash') {
          this.patch({
            smooth: {
              alpha: 1,
              y: 540
            },
            Background: {
              Message: {
                text: {
                  text: message
                }
              },
              BackButton: {
                alpha: 0
              },
              ExitButton: {
                alpha: 1,
                mountX: 0.5,
                x: 375
              }
            }
          });
          this.fire('focusButton', {
            value: 'ExitButton'
          });
        } else {
          this.patch({
            smooth: {
              alpha: 1,
              y: 540
            },
            Background: {
              Message: {
                text: {
                  text: message
                }
              },
              BackButton: {
                alpha: 1
              },
              ExitButton: {
                alpha: 1,
                mountX: 0,
                x: 385
              }
            }
          });
          this.fire('focusButton', {
            value: 'BackButton'
          });
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this.patch({
          smooth: {
            alpha: 0,
            y: 340
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this.state);
      }
    }, {
      key: "theme",
      set: function set(theme) {
        this.patch({
          Shadow: {
            color: theme.globalShadow
          },
          Background: {
            color: 0xffffffff,
            Icon: {
              color: 0xff000000
            },
            Message: {
              color: 0xff000000
            },
            BackButton: {
              theme: {
                text: 0xff000000,
                textFocus: 0xffffffff,
                focus: 0xff001a4b
              }
            },
            ExitButton: {
              theme: {
                text: 0xff000000,
                textFocus: 0xffffffff,
                focus: 0xff001a4b
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
          mount: 0.5,
          w: 750,
          h: 350,
          y: 340,
          x: 960,
          transitions: {
            alpha: {
              duration: 0.3
            },
            y: {
              duration: 0.5
            }
          },
          Shadow: {
            alpha: 1,
            mount: 0.5,
            x: 375,
            y: 180,
            color: 0xff000000,
            texture: lng.Tools.getShadowRect(800, 400, 0, 60, 60)
          },
          Background: {
            w: 750,
            h: 350,
            rect: true,
            color: 0xff0000ff,
            Icon: {
              mountX: 0.5,
              x: 375,
              y: -18,
              rotation: Math.PI,
              type: IconItem,
              icon: {
                src: 'icons/player/info.svg',
                w: 140,
                h: 140
              }
            },
            Message: {
              w: 700,
              mount: 0.5,
              x: 375,
              y: 175,
              text: {
                text: 'Keine Verbindung mit dem Server möglich - Bitte versuchen Sie es später erneut.',
                maxLines: 3,
                fontSize: 42,
                fontFace: 'TheSansB4',
                textAlign: 'center'
              }
            },
            BackButton: {
              h: 68,
              mountX: 1,
              x: 365,
              y: 270,
              w: 320,
              type: SimpleButton,
              item: {
                label: 'Zurück'
              }
            },
            ExitButton: {
              h: 68,
              x: 385,
              y: 270,
              w: 320,
              type: SimpleButton,
              item: {
                label: 'App schließen'
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _init: function _init() {
            return 'BackButton';
          },
          _handleUp: function _handleUp() {},
          _handleDown: function _handleDown() {},
          focusButton: function focusButton(e) {
            return e.value;
          },
          BackButton: {
            _handleLeft: function _handleLeft() {},
            _handleRight: 'ExitButton',
            _handleEnter: function _handleEnter() {
              this.signal('retry');
            }
          },
          ExitButton: {
            _handleLeft: 'BackButton',
            _handleRight: function _handleRight() {},
            _handleEnter: function _handleEnter() {
              window.close();
            }
          }
        };
      }
    }]);

    return ErrorMessage;
  }(lng.Component);

  var ComingSoon =
  /*#__PURE__*/
  function (_lng$Component52) {
    _inherits(ComingSoon, _lng$Component52);

    function ComingSoon() {
      _classCallCheck(this, ComingSoon);

      return _possibleConstructorReturn(this, _getPrototypeOf(ComingSoon).apply(this, arguments));
    }

    _createClass(ComingSoon, [{
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('ComingSoon');
      }
    }, {
      key: "theme",
      set: function set(theme) {
        var focus = theme.focus,
            text = theme.text;
        this.patch({
          PageTitle: {
            color: text
          },
          ComingSoon: {
            theme: theme
          },
          CircleBorder: {
            color: focus
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          PageTitle: {
            mountX: 0.5,
            x: 960,
            y: 200,
            text: {
              text: 'Live',
              fontSize: 50,
              fontFace: 'TheSansB6',
              textAlign: 'center'
            }
          },
          ComingSoon: {
            type: SimpleButton,
            mountX: 0.5,
            x: 960,
            y: 285,
            h: 74,
            item: {
              label: 'COMING SOON',
              fontSize: 35
            }
          },
          CircleBorder: {
            mountX: 0.5,
            x: 960,
            y: 403,
            texture: lng.Tools.getRoundRect(580, 580, 580 / 2, 0, 0xffffffff, true, 0xffffffff)
          },
          PreviewFrame: {
            mountX: 0.5,
            x: 960,
            y: 420,
            w: 550,
            h: 550,
            renderToTexture: true,
            Circle: {
              shader: {
                type: lng.shaders.RadialFilter,
                radius: 275,
                renderToTexture: true
              },
              Image: {
                w: 550,
                h: 550,
                src: AppDefinition.getPath('images/live-comingsoon.png')
              }
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          loadView: function loadView(_ref29) {
            var type = _ref29.toLoad.persist.type;
            this.patch({
              PageTitle: {
                text: {
                  text: type === 'programm' ? 'Sendung verpasst' : 'LIVE TV'
                }
              },
              PreviewFrame: {
                Circle: {
                  Image: {
                    src: AppDefinition.getPath("images/".concat(type, "-comingsoon.png"))
                  }
                }
              }
            });
            return 'Show';
          },
          viewVisible: function viewVisible() {
            this.signal('viewVisible');
            return 'Active.ComingSoon';
          },
          viewHidden: function viewHidden() {
            this.signal('viewHidden');
            return 'Idle';
          },
          hideView: 'Hide',
          Hide: {
            _enter: function _enter() {
              var _this78 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 1,
                    1: 0
                  }
                }]
              });
              animation.on('finish', function () {
                _this78.fire('viewHidden');
              });
              animation.start();
            }
          },
          Show: {
            _enter: function _enter() {
              var _this79 = this;

              var animation = this.animation({
                duration: 0.25,
                stopMethod: 'immediate',
                actions: [{
                  p: 'alpha',
                  v: {
                    0: 0,
                    1: 1
                  }
                }]
              });
              animation.on('finish', function () {
                _this79.fire('viewVisible');
              });
              animation.start();
            }
          },
          Idle: {},
          Active: {
            ComingSoon: {}
          }
        };
      }
    }]);

    return ComingSoon;
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
      key: "_getFocused",
      value: function _getFocused() {
        return this.selectElement(this.state) || this;
      }
    }, {
      key: "_setFocusSettings",
      value: function _setFocusSettings(settings) {
        if (this.state === "Player") {
          settings.mediaplayer.consumer = this.tag("Player");
        }
      }
    }, {
      key: "blur",
      value: function blur() {
        this.tag('Wrapper').setSmooth('amount', 1.5, {
          duration: 0.5,
          delay: 0.6
        });
      }
    }, {
      key: "unblur",
      value: function unblur() {
        var wrapper = this.tag('Wrapper');

        if (wrapper.transition('amount').isRunning()) {
          wrapper.transition('amount').stop();
        }

        this.tag('Wrapper').amount = 0;
      }
    }, {
      key: "selectElement",
      value: function selectElement(target) {
        return this.tag('Wrapper').content.tag(target) || this.tag(target);
      }
    }, {
      key: "update",
      value: function update(theme) {
        this._hasBackgroundImage = !!theme.backgroundImage;
        this.patch({
          Background: {
            smooth: {
              color: theme.background
            }
          },
          BackgroundImage: {
            smooth: {
              alpha: !!theme.backgroundImage
            },
            src: theme.backgroundImage && AppDefinition.getPath(theme.backgroundImage)
          },
          Wrapper: {
            content: {
              Loader: {
                theme: theme
              },
              MainPage: {
                theme: theme
              },
              GlossaryPage: {
                theme: theme
              },
              SearchPage: {
                theme: theme
              },
              ImpressumPage: {
                theme: theme
              },
              DataProtectionPage: {
                theme: theme
              },
              InfoPage: {
                theme: theme
              },
              FAQPage: {
                theme: theme
              },
              ShowPage: {
                theme: theme
              },
              SettingsPage: {
                theme: theme
              },
              ComingSoon: {
                theme: theme
              },
              Toolbar: {
                theme: theme
              }
            }
          },
          Menu: {
            theme: theme
          },
          ErrorMessage: {
            theme: theme
          }
        });
      }
    }, {
      key: "api",
      set: function set(v) {
        this._api = v;
      },
      get: function get() {
        return this._api;
      }
    }, {
      key: "currentView",
      get: function get() {
        return this.viewManager.current;
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'TheSansB4',
          url: AppDefinition.getPath('fonts/TheSans-b4.otf'),
          descriptors: {}
        }, {
          family: 'TheSansB6',
          url: AppDefinition.getPath('fonts/TheSans-b4.otf'),
          descriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Background: {
            w: 1920,
            h: 1080,
            rect: true,
            color: 0xff171717
          },
          BackgroundImage: {
            w: 1920,
            h: 1080
          },
          Wrapper: {
            zIndex: 2,
            w: 1920,
            h: 1080,
            type: lng.components.FastBlurComponent,
            signals: {
              previousView: true,
              changeTheme: true,
              showMenu: true,
              outOfBounds: true,
              switchView: true,
              viewHidden: true,
              viewVisible: true,
              hideToolbar: true,
              showToolbar: true
            },
            amount: 0,
            content: {
              Loader: {
                y: 540,
                type: Loader
              },
              Splash: {
                type: Splash
              },
              MainPage: {
                type: MainPage,
                requiresToolbar: true,
                requiresLoading: true
              },
              GlossaryPage: {
                type: GlossaryPage,
                requiresToolbar: true,
                requiresLoading: true
              },
              SearchPage: {
                type: SearchPage,
                requiresLoading: false
              },
              ImpressumPage: {
                type: ImpressumPage,
                requiresToolbar: true
              },
              DataProtectionPage: {
                type: DataProtectionPage,
                requiresToolbar: true
              },
              FAQPage: {
                type: FAQPage,
                requiresToolbar: true
              },
              ShowPage: {
                type: ShowPage,
                requiresLoading: true,
                requiresToolbar: false
              },
              SettingsPage: {
                type: SettingsPage,
                requiresToolbar: true
              },
              ComingSoon: {
                type: ComingSoon,
                requiresToolbar: true
              },
              Toolbar: {
                zIndex: 5,
                alpha: 0,
                type: Toolbar,
                requiresLoading: true
              }
            }
          },
          Menu: {
            type: Menu,
            zIndex: 10,
            signals: {
              switchView: true
            }
          },
          Player: {
            type: Player,
            requiresLoading: true,
            requiresToolbar: false,
            signals: {
              viewHidden: true,
              viewVisible: true,
              showBackground: true,
              hideBackground: true,
              previousView: true,
              switchView: true
            }
          },
          ErrorMessage: {
            zIndex: 20,
            type: ErrorMessage,
            signals: {
              retry: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return {
          _construct: function _construct() {
            this._api = new API();
          },
          _init: function _init() {
            var _this80 = this;

            this.viewManager = new ViewManager();
            this.themeManager = new ThemeManager();
            this.viewManager.current = {
              view: 'Splash',
              ignore: true
            };
            this.themeManager.on('themeChanged', function (theme) {
              _this80.update(theme);
            });
            this.api.on('error', function (e) {
              _this80.fire('showErrorMessage', e, _this80.state);
            });
            this.themeManager.currentProfile = 'alle';
            return 'Splash';
          },
          showErrorMessage: function showErrorMessage(e) {
            this.tag('ErrorMessage').show(e.value, this.state);
            this.blur();
            return 'ErrorMessage';
          },
          hideToolbar: function hideToolbar() {
            this.selectElement('Toolbar').hide();
          },
          showToolbar: function showToolbar() {
            this.selectElement('Toolbar').show();
          },
          showBackground: function showBackground() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 1
                }
              },
              BackgroundImage: {
                smooth: {
                  alpha: this._hasBackgroundImage
                }
              }
            });
          },
          hideBackground: function hideBackground() {
            this.patch({
              Background: {
                smooth: {
                  alpha: 0
                }
              },
              BackgroundImage: {
                smooth: {
                  alpha: 0
                }
              }
            });
          },
          themeLoaded: function themeLoaded() {
            return 'Toolbar';
          },
          changeTheme: function changeTheme(e) {
            // if(this.themeManager.currentProfile !== e.value) {
            this.themeManager.currentProfile = e.value; // }
          },
          _handleUp: function _handleUp() {
            return 'Toolbar';
          },
          _handleLeft: function _handleLeft() {
            return 'Menu';
          },
          _handleBack: function _handleBack() {
            return this.fire('previousView');
          },
          showMenu: function showMenu() {
            return 'Menu';
          },
          outOfBounds: function outOfBounds(e) {
            if (e.direction === 'up' || e.direction === 'left') {
              return 'Toolbar';
            }

            return 'MainPage';
          },
          switchView: function switchView(e) {
            // if(this.state === 'ErrorMessage') {
            //     return
            // }
            var _e$persist = e.persist,
                persist = _e$persist === void 0 ? false : _e$persist,
                _e$view = e.view,
                view = _e$view === void 0 ? false : _e$view;
            var _this$viewManager$cur = this.viewManager.current,
                _this$viewManager$cur2 = _this$viewManager$cur.persist,
                cPersist = _this$viewManager$cur2 === void 0 ? false : _this$viewManager$cur2,
                _this$viewManager$cur3 = _this$viewManager$cur.view,
                cView = _this$viewManager$cur3 === void 0 ? false : _this$viewManager$cur3;

            if (view === cView && persist && persist.type && cPersist && cPersist.type && cPersist.type === persist.type) {
              return this.viewManager.currentView;
            }

            this.viewManager.toLoad = e;
            return 'SwitchingView';
          },
          previousView: function previousView() {
            var pv = this.viewManager.previousView;

            if (pv !== 'exit') {
              this.fire('switchView', pv);
            } else {
              return false;
            }
          },
          SwitchingView: {
            _captureKey: function _captureKey() {},
            _enter: function _enter() {
              var target = this.selectElement(this.viewManager.currentView);
              this.selectElement('Toolbar').hide();
              target.fire('hideView');
            },
            viewHidden: function viewHidden() {
              var vm = this.viewManager;
              var target = this.selectElement(vm.loadView);

              if (!vm.previous && target.requiresLoading) {
                this.selectElement('Loader').show();
              }

              target.fire('loadView', {
                isPreviousView: vm.previous,
                toLoad: vm.toLoad
              });
            },
            viewVisible: function viewVisible() {
              var vm = this.viewManager;
              var toolbar = this.selectElement('Toolbar');
              var targetView = this.selectElement(vm.loadView);
              this.selectElement('Loader').hide();

              if (targetView.requiresToolbar && !targetView.hasToolbarHidden) {
                toolbar.show();
              } else {
                toolbar.hide();
              }

              return this.viewManager.viewSwitched();
            }
          },
          Splash: {
            _captureKey: function _captureKey() {},
            _enter: function _enter() {}
          },
          Toolbar: {
            _handleDown: function _handleDown() {
              return this.viewManager.currentView;
            }
          },
          Menu: {
            _handleBack: function _handleBack() {
              this.fire('_handleRight');
            },
            _enter: function _enter() {
              this.tag('Menu').show();
              this.blur();
            },
            _exit: function _exit() {
              this.tag('Menu').hide();
              this.unblur();
            },
            _handleRight: function _handleRight() {
              return this.viewManager.currentView;
            }
          },
          MainPage: {
            _enter: function _enter() {
              this.selectElement('SearchPage').reset();
              this.viewManager.clearHistory();
            }
          },
          GlossaryPage: {
            _enter: function _enter() {
              this.selectElement('SearchPage').reset();
            }
          },
          ShowPage: {},
          SearchPage: {},
          ImpressumPage: {
            _enter: function _enter() {
              this.selectElement('SearchPage').reset();
            }
          },
          DataProtectionPage: {
            _enter: function _enter() {
              this.selectElement('SearchPage').reset();
            }
          },
          FAQPage: {},
          SettingsPage: {},
          ComingSoon: {},
          ErrorMessage: {
            retry: function retry() {
              this.unblur();
              this.tag('ErrorMessage').hide();
              this.viewManager.viewSwitched();
              this.fire('previousView');
            }
          },
          Player: {
            _enter: function _enter() {}
          }
        };
      }
    }]);

    return App;
  }(ux.App);

  var AppDefinition =
  /*#__PURE__*/
  function (_ux$AppDefinition) {
    _inherits(AppDefinition, _ux$AppDefinition);

    function AppDefinition(application) {
      var _this81;

      _classCallCheck(this, AppDefinition);

      _this81 = _possibleConstructorReturn(this, _getPrototypeOf(AppDefinition).call(this, application));
      _this81.application = application;
      return _this81;
    }

    _createClass(AppDefinition, [{
      key: "getAppViewType",
      value: function getAppViewType() {
        return App;
      }
    }], [{
      key: "identifier",
      get: function get() {
        return "com.metrological.app.ARD";
      }
    }, {
      key: "versionNumber",
      get: function get() {
        return "1.0.4";
      }
    }]);

    return AppDefinition;
  }(ux.AppDefinition);

  return AppDefinition;
}();