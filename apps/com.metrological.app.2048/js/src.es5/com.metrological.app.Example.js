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

var com_metrological_app_Example = function () {
  'use strict';

  var App =
  /*#__PURE__*/
  function (_ux$App) {
    _inherits(App, _ux$App);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
      key: "_handleLeft",
      value: function _handleLeft() {
        this.tag('Primary').setSmooth('x', this.tag('Primary').getSmooth('x') - 100);
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        this.tag('Primary').setSmooth('x', this.tag('Primary').getSmooth('x') + 100);
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        this.tag('Primary').setSmooth('y', this.tag('Primary').getSmooth('y') - 100);
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        this.tag('Primary').setSmooth('y', this.tag('Primary').getSmooth('y') + 100);
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
            src: "http://video.metrological.com/boat.mp4"
          }
        };
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'Lobster',
          url: AppDefinition.getPath('fonts/Lobster-Regular.ttf'),
          descriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Bg: {
            src: AppDefinition.getPath("img/rockies.jpeg"),
            scale: 1
          },
          Text: {
            y: 100,
            text: {
              text: "Hello world",
              fontFace: 'Lobster',
              fontSize: 50
            }
          },
          Primary: {
            Main: {
              rect: true,
              renderToTexture: true,
              w: 900,
              h: 900,
              colorLeft: 0x000000FF,
              colorRight: 0xFF0000FF
            },
            App: {
              alpha: 0.5,
              rect: true,
              w: 100,
              h: 100,
              scale: 1,
              texture: {
                type: lng.textures.NoiseTexture,
                x: 0,
                y: 0,
                w: 1000,
                h: 1000
              }
            }
          },
          Overlay: {}
        };
      }
    }]);

    return App;
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
        return App;
      }
    }], [{
      key: "identifier",
      get: function get() {
        return "com.metrological.app.Example";
      }
    }]);

    return AppDefinition;
  }(ux.AppDefinition);

  return AppDefinition;
}();