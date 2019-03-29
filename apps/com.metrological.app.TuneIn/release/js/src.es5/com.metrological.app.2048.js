"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var com_metrological_app_2048 = function () {
  'use strict';

  var GameUtils =
  /*#__PURE__*/
  function () {
    function GameUtils() {
      _classCallCheck(this, GameUtils);

      this.config = {
        cellSize: 240,
        cellMargin: 20,
        boardSize: 4,
        startTiles: 2,
        game: {
          isSavedGame: false,
          savedGame: {},
          score: 0,
          moves: 0,
          merges: 0,
          won: false,
          over: false,
          best: this.getBestScore()
        },
        test: {
          active: false,
          testSet: 1,
          testData: [[[null, null, null, null], [null, null, null, null], [null, 2, null, null], [null, null, null, 2]], [[null, null, null, null], [null, 1024, null, null], [null, null, null, null], [null, 1024, null, null]], [[2, 4, 16, 32], [4, 2, 8, 64], [2, 4, 16, 32], [4, 2, 8, null]], [[2, 4, 16, 32], [4, 2, 8, 64], [2, 4, 16, 32], [4, 2, 8, null]], [[2, 32, 512, null], [4, 64, 1024, null], [8, 128, 2048, null], [16, 256, null, null]]]
        }
      };
      this.tileIndex = 99;
      this.tileColors = {
        Bg: {
          '2': '0xffeee4da',
          '4': '0xffede0c8',
          '8': '0xfff2b179',
          '16': '0xfff59563',
          '32': '0xfff67c5f',
          '64': '0xfff65e3c',
          '128': '0xffedcf71',
          '256': '0xffedcc61',
          '512': '0xffedc850',
          '1024': '0xffedc540',
          '2048': '0xffedc12e',
          'next': '0xff3c3a32'
        },
        Lb: {
          '2': '0xff776e65',
          '4': '0xff776e65',
          '8': '0xfff9f6f2',
          '16': '0xfff9f6f2',
          '32': '0xfff9f6f2',
          '64': '0xfff9f6f2',
          '128': '0xfff9f6f2',
          '256': '0xfff9f6f2',
          '512': '0xfff9f6f2',
          '1024': '0xfff9f6f2',
          '2048': '0xfff9f6f2',
          'next': '0xfff9f6f2'
        },
        Fs: {
          '2': {
            fontSize: 120
          },
          '4': {
            fontSize: 120
          },
          '8': {
            fontSize: 120
          },
          '16': {
            fontSize: 120
          },
          '32': {
            fontSize: 120
          },
          '64': {
            fontSize: 120
          },
          '128': {
            fontSize: 100
          },
          '256': {
            fontSize: 100
          },
          '512': {
            fontSize: 100
          },
          '1024': {
            fontSize: 80
          },
          '2048': {
            fontSize: 80
          }
        }
      };
      this.board = [];
      this.isSavedGame();
    }

    _createClass(GameUtils, [{
      key: "log",
      value: function log(cells) {
        // y = row
        // x = col
        var logBoard = [[], [], [], []];
        cells.forEach(function (column, col) {
          column.forEach(function (cell, row) {
            logBoard[row][col] = cell;
          });
        });
        var out = '\n';
        out += '_________________________________\n';
        logBoard.forEach(function (row) {
          out += '|       |       |       |       |\n';
          row.forEach(function (cell) {
            var str = '             ';

            if (cell !== null) {
              str = '      ' + cell.value + '      ';
            }

            out += '|' + str.slice(3, 10);
          });
          out += '|\n';
          out += '|_______|_______|_______|_______|\n';
        });
        console.log(out);
      }
    }, {
      key: "getBestScore",
      value: function getBestScore() {
        var best = localStorage['LFW_Best_2048'],
            bestVal = 0;

        if (best) {
          bestVal = JSON.parse(best);
        }

        return bestVal;
      }
    }, {
      key: "resetGame",
      value: function resetGame() {
        this.config.game.isSavedGame = false;
        this.config.game.savedGame = {};
        this.config.game.score = 0;
        this.config.game.best = this.getBestScore();
        this.config.game.moves = 0;
        this.config.game.merges = 0;
        this.config.game.over = false;
        this.config.game.won = false;
        this.board = [];
      }
    }, {
      key: "cleanSaved",
      value: function cleanSaved() {
        this.resetGame();
        this.config.test.active = false;
        this.saveAll();
      }
    }, {
      key: "saveAll",
      value: function saveAll() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
        var boardGrid = [];

        for (var x = 0; x < this.config.boardSize; x++) {
          for (var y = 0; y < this.config.boardSize; y++) {
            if (this.board[x]) {
              var cell = this.board[x][y];

              if (cell) {
                boardGrid.push({
                  x: x,
                  y: y,
                  value: cell.value
                });
              }
            }
          }
        }
        /*
        		console.log('saveAll  :  ', {
        			isSavedGame: true,
        			score: this.config.game.score,
        			merges: this.config.game.merges,
        			moves: this.config.game.moves,
        			// best: this.config.game.best,
        			time: time,
        			grid: boardGrid
        		});
        */


        this.saveGame({
          isSavedGame: true,
          score: this.config.game.score,
          merges: this.config.game.merges,
          moves: this.config.game.moves,
          // best: this.config.game.best,
          time: time,
          grid: boardGrid
        });
        localStorage['LFW_Best_2048'] = JSON.stringify(this.config.game.best);
      }
    }, {
      key: "saveGame",
      value: function saveGame(gameData) {
        localStorage['LFW_Game_2048'] = JSON.stringify(gameData);
      }
    }, {
      key: "isSavedGame",
      value: function isSavedGame() {
        var _this = this;

        var saved = localStorage['LFW_Game_2048'],
            savedGame = {},
            tilesFilled = 0;

        if (saved !== undefined) {
          savedGame = JSON.parse(saved);
          this.config.game.isSavedGame = true;
          this.config.game.savedGame = savedGame;

          var resumeGrid = [],
              savedGrid = _toConsumableArray(this.config.game.savedGame.grid);

          var _loop = function _loop(x) {
            var row = resumeGrid[x] = [];

            var _loop2 = function _loop2(y) {
              var foundCell = savedGrid.filter(function (filter) {
                return filter.x === x && filter.y === y;
              })[0];

              if (foundCell) {
                row.push(foundCell.value);
                tilesFilled++;
              } else {
                row.push(null);
              }
            };

            for (var y = 0; y < _this.config.boardSize; y++) {
              _loop2(y);
            }
          };

          for (var x = 0; x < this.config.boardSize; x++) {
            _loop(x);
          }

          this.config.game.tilesFilled = tilesFilled;
          this.config.game.savedGame.grid = resumeGrid;
        } else {
          this.resetGame();
        }

        return savedGame;
      }
    }, {
      key: "initGame",
      value: function initGame(gametype) {
        this.config.game.best = this.getBestScore();

        if (this.config.test.active === true) {
          this.resetGame();
          this.board = this.config.test.testData[this.config.test.testSet];
        } else if (gametype === 'resume' && this.config.game.isSavedGame) {
          var savedGame = this.config.game.savedGame;
          this.config.game.score = savedGame.score || 0;
          this.config.game.moves = savedGame.moves || 0;
          this.config.game.merges = savedGame.merges || 0;
          this.config.game.time = savedGame.time;
          this.board = savedGame.grid;
        } else {
          this.resetGame();
        }
      }
    }, {
      key: "newTileIndex",
      get: function get() {
        return this.tileIndex++;
      }
    }, {
      key: "boardCells",
      set: function set(v) {
        this.board = v;
        this.saveAll(new Date().getTime());
      },
      get: function get() {
        return this.board;
      }
    }]);

    return GameUtils;
  }();

  var Score =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(Score, _lng$Component);

    function Score() {
      _classCallCheck(this, Score);

      return _possibleConstructorReturn(this, _getPrototypeOf(Score).apply(this, arguments));
    }

    _createClass(Score, [{
      key: "update",
      value: function update(immediately, score) {
        this.tag("ScoreUpdate").text = "+".concat(score);

        if (immediately !== true) {
          this.scoreAnimation.start();
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this2 = this;

        this._gameUtils = this.fireAncestors('$getGameUtils');
        this._score = 0;
        this.scoreAnimation = this.tag("ScoreUpdate").animation({
          duration: 0.9,
          actions: [{
            p: 'alpha',
            v: {
              0: 1,
              1: 0
            }
          }, {
            p: 'y',
            v: {
              0: 40,
              1: -40
            }
          }]
        });
        this.scoreAnimation.on('finish', function () {
          _this2.fire('updateScore');
        });
      }
    }, {
      key: "updateScore",
      value: function updateScore() {
        this.tag("ScoreValue").text = this._gameUtils.config.game.score.toString();
      }
    }, {
      key: "value",
      set: function set(v) {
        this._scoreUpdate = v;
        this.tag('ScoreValue').text = this._score;
      },
      get: function get() {
        return this._score;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          ScoreBg: {
            w: 360,
            h: 180,
            texture: lng.Tools.getRoundRect(360, 180, 20, 0, 0, true, 0xffbbada0),
            ScoreLabel: {
              w: 360,
              h: 38,
              y: 20,
              color: 0xffeee4da,
              text: {
                text: 'SCORE',
                fontFace: 'Roboto-Regular',
                fontSize: 32,
                lineHeight: 38,
                textAlign: 'center'
              }
            },
            ScoreValue: {
              w: 360,
              h: 132,
              y: 40,
              color: 0xfff1f1f1,
              text: {
                text: '0',
                fontFace: 'Roboto-Condensed',
                fontSize: 100,
                lineHeight: 132,
                textAlign: 'center'
              }
            },
            ScoreUpdate: {
              w: 360,
              h: 132,
              y: 40,
              color: 0xff776E65,
              alpha: 0,
              text: {
                text: '',
                fontFace: 'Roboto-Condensed',
                fontSize: 100,
                lineHeight: 132,
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return Score;
  }(lng.Component);

  var LeftPane =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(LeftPane, _lng$Component2);

    function LeftPane() {
      _classCallCheck(this, LeftPane);

      return _possibleConstructorReturn(this, _getPrototypeOf(LeftPane).apply(this, arguments));
    }

    _createClass(LeftPane, null, [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            Star: {
              w: 360,
              h: 360,
              src: AppDefinition.getPath('images/star.png')
            },
            Logo: {
              w: 256,
              h: 257,
              x: 183,
              y: 188,
              mount: 0.5,
              src: AppDefinition.getPath('images/mainLogo.png')
            },
            TeaserText: {
              w: 220,
              x: 360 / 2,
              y: 353,
              mountX: 0.5,
              color: 0xff776e65,
              text: {
                text: 'Join the numbers and get to the 2048 tile!',
                fontFace: 'Roboto-Bold',
                fontSize: 36,
                lineHeight: 50,
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return LeftPane;
  }(lng.Component);

  var Score$1 =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(Score$1, _lng$Component3);

    function Score$1() {
      _classCallCheck(this, Score$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(Score$1).apply(this, arguments));
    }

    _createClass(Score$1, [{
      key: "update",
      value: function update(immediately, bestScore) {
        this._bestScore = bestScore;
        this.tag("BestScoreUpdate").text = this._bestScore.toString();

        if (immediately !== true) {
          this.bestScoreAnimation.start();
        } else {
          this.updateScore();
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this3 = this;

        this._gameUtils = this.fireAncestors('$getGameUtils');
        this.bestScoreAnimation = this.tag("BestScoreUpdate").animation({
          duration: 0.4,
          actions: [{
            p: 'alpha',
            v: {
              0: 1,
              0.7: 0
            }
          }, {
            p: 'scale',
            v: {
              0: 1.5,
              0.7: 1
            }
          }]
        });
        this.bestScoreAnimation.on('finish', function () {
          _this3.fire('updateScore');
        });
      }
    }, {
      key: "updateScore",
      value: function updateScore() {
        this.tag("BestScoreValue").text = this._bestScore.toString();
      }
    }, {
      key: "value",
      set: function set(v) {
        this._bestScore = v;
        this.tag('BestScoreValue').text = this._bestScore;
      },
      get: function get() {
        return this._bestScore;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          ScoreBg: {
            w: 360,
            h: 180,
            texture: lng.Tools.getRoundRect(360, 180, 20, 0, 0, true, 0xffbbada0),
            BestScoreLabel: {
              w: 360,
              h: 38,
              y: 20,
              color: 0xffeee4da,
              text: {
                text: 'Best',
                fontFace: 'Roboto-Regular',
                fontSize: 32,
                lineHeight: 38,
                textAlign: 'center'
              }
            },
            BestScoreValue: {
              w: 360,
              h: 132,
              y: 41,
              color: 0xfff1f1f1,
              text: {
                text: '0',
                fontFace: 'Roboto-Condensed',
                fontSize: 100,
                lineHeight: 132,
                textAlign: 'center'
              }
            },
            BestScoreUpdate: {
              w: 360,
              h: 132,
              y: 40,
              color: 0xff776E65,
              alpha: 0,
              text: {
                text: '',
                fontFace: 'Roboto-Condensed',
                fontSize: 100,
                lineHeight: 132,
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return Score$1;
  }(lng.Component);

  var LeftPane$1 =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(LeftPane$1, _lng$Component4);

    function LeftPane$1() {
      _classCallCheck(this, LeftPane$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(LeftPane$1).apply(this, arguments));
    }

    _createClass(LeftPane$1, [{
      key: "_init",
      value: function _init() {
        var hpt1 = this.tag('HelpText1'),
            hpt1a = this.tag('HelpText1a'),
            hpt2 = this.tag('HelpText2'),
            hpt2a = this.tag('HelpText2a'),
            hpt2b = this.tag('HelpText2b'),
            hptbt = this.tag('OkButton'),
            hpt3 = this.tag('HelpText3'),
            hpt3a = this.tag('HelpText3a');
        hpt1.text = 'Use your ';
        hpt1a.text = 'arrow keys';
        hpt1.loadTexture();
        hpt1a.loadTexture();
        var totalWd = hpt1.renderWidth + hpt1a.renderWidth,
            stX = (360 - totalWd) / 2;
        hpt1.x = stX;
        hpt1a.x = stX + hpt1.renderWidth;
        hpt2.text = 'to move the tiles. When two tiles with the same number ';
        hpt2a.text = 'touch, they ';
        hpt2b.text = 'merge into one!';
        hpt2a.loadTexture();
        hpt2b.loadTexture();
        totalWd = hpt2a.renderWidth + hpt2b.renderWidth;
        stX = (360 - totalWd) / 2;
        hpt2a.x = stX;
        hpt2b.x = stX + hpt2a.renderWidth;
        hpt3.text = 'Press';
        hpt3a.text = 'to open menu';
        hpt3.loadTexture();
        hpt3a.loadTexture();
        totalWd = hpt3.renderWidth + hpt3a.renderWidth + 80;
        stX = (360 - totalWd) / 2;
        hpt3.x = stX;
        hpt3a.x = stX + hpt3.renderWidth + 80;
        hptbt.x = stX + hpt3.renderWidth + 10;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            HowTo: {
              w: 360,
              color: 0xff776e65,
              y: 28,
              text: {
                text: 'HOW TO PLAY',
                fontFace: 'Roboto-Bold',
                fontSize: 32,
                lineHeight: 38,
                textAlign: 'center'
              }
            },
            Buttons: {
              w: 120,
              h: 120,
              x: 360 / 2,
              y: 105,
              mountX: 0.5,
              src: AppDefinition.getPath('images/arrowsIcon.png')
            },
            HelpText1: {
              y: 253,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Regular',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            },
            HelpText1a: {
              y: 253,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Bold',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            },
            HelpText2: {
              w: 360,
              h: 70,
              x: 360 / 2,
              y: 293,
              mountX: 0.5,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Regular',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            },
            HelpText2a: {
              y: 373,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Regular',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            },
            HelpText2b: {
              y: 373,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Bold',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            },
            HelpText3: {
              y: 483,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Regular',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            },
            OkButton: {
              w: 60,
              h: 60,
              y: 471,
              src: AppDefinition.getPath('images/HelpOke.png')
            },
            HelpText3a: {
              y: 483,
              color: 0xff776e65,
              text: {
                text: '',
                fontFace: 'Roboto-Regular',
                fontSize: 26,
                lineHeight: 40,
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return LeftPane$1;
  }(lng.Component);

  var Tile =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(Tile, _lng$Component5);

    function Tile() {
      _classCallCheck(this, Tile);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tile).apply(this, arguments));
    }

    _createClass(Tile, [{
      key: "_init",
      value: function _init() {
        this._gameUtils = this.fireAncestors('$getGameUtils');
        this.boardSize = this._gameUtils.boardSize;
        this.cellSize = this._gameUtils.cellSize;
        this.cellMargin = this._gameUtils.cellMargin;
        this.tileColors = this._gameUtils.tileColors;
        this.setTile(this.tile);
      }
    }, {
      key: "setTile",
      value: function setTile(v) {
        this._tile = v;
        var fs = this.tileColors.Fs[this._tile.value];
        this.tag('TileWrapper').patch({
          color: this.tileColors.Bg[this._tile.value],
          alpha: 0.5,
          scale: 0.4,
          TileLabel: {
            color: this.tileColors.Lb[this._tile.value],
            text: {
              text: this._tile.value,
              fontSize: fs.fontSize
            }
          }
        });
        this.tag('TileLabel').loadTexture();
        this.tag('TileLabel').y = (220 - this.tag('TileLabel').renderHeight) / 2 + 10;
        var animation = this.tag('TileWrapper').animation({
          duration: 0.2,
          delay: this.delay,
          stopMethod: 'forward',
          timingFunction: 'ease-in',
          actions: [{
            p: 'alpha',
            v: {
              0: 0,
              0.5: 1,
              1: 1
            }
          }, {
            p: 'scale',
            v: {
              0: 0.4,
              0.5: 1.05,
              1: 1.01
            }
          }]
        });
        animation.start();
      }
    }, {
      key: "getTile",
      value: function getTile() {
        return this._tile;
      }
    }, {
      key: "tileValue",
      get: function get() {
        return this._tile.value;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          TileWrapper: {
            w: 220,
            h: 220,
            alpha: 0,
            color: 0xff00ff00,
            texture: lng.Tools.getRoundRect(220, 220, 10, 0, 0, true, 0xffffffff),
            TileLabel: {
              w: 220,
              color: 0x00000000,
              text: {
                text: '',
                fontFace: 'Roboto-Bold',
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return Tile;
  }(lng.Component);

  var Board =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Board, _lng$Component6);

    function Board() {
      _classCallCheck(this, Board);

      return _possibleConstructorReturn(this, _getPrototypeOf(Board).apply(this, arguments));
    }

    _createClass(Board, [{
      key: "$BoardTiles",
      value: function $BoardTiles() {
        return this.tag("BoardTiles").children;
      }
    }, {
      key: "moveTiles",
      value: function moveTiles(dir) {
        // 0: up,
        // 1: right,
        // 2:down,
        // 3: left
        var self = this;
        this.score = 0;
        this.moves += 1;
        if (this._gameUtils.config.game.over || this._gameUtils.config.game.won) return;
        var cell,
            tile,
            moved = false;

        var vector = this._getVector(dir),
            traversals = this._buildTraversals(vector);

        this._prepareTiles();

        traversals.x.forEach(function (x) {
          traversals.y.forEach(function (y) {
            cell = {
              x: x,
              y: y
            };
            tile = self._cellContent(cell);

            if (tile) {
              var positions = self._findFarthestPosition(cell, vector),
                  next = self._cellContent(positions.next);

              if (next && next.value === tile.value && !next.mergedFrom) {
                var merged = new CellTile(positions.next, tile.value * 2, "Tile-".concat(self._gameUtils.newTileIndex));
                merged.mergedFrom = [tile, next];
                self.merges += 1;

                self._insertTile(merged, 0.5);

                self._removeTile(tile);

                merged.mergeTiles(positions.next, self.tag("BoardTiles"));
                self.score += merged.value;

                if (merged.value === 2048) {
                  self.won = true;
                }
              } else {
                self._moveTile(tile, positions.farthest);
              }

              if (!self._positionsEqual(cell, tile)) {
                moved = true;
              }

              self._actuate();
            }
          });
        });

        if (moved) {
          this._addRandomTile();

          if (!this._movesAvailable()) {
            this.over = true;
          }

          this._actuate();
        }
      }
    }, {
      key: "_moveTile",
      value: function _moveTile(tile, cell) {
        this._cells[tile.x][tile.y] = null;
        this._cells[cell.x][cell.y] = tile;
        tile.updatePosition(cell, this.tag("BoardTiles").getByRef(tile.tileRef));
      }
    }, {
      key: "_movesAvailable",
      value: function _movesAvailable() {
        return this._cellsAvailable() || this._tileMatchesAvailable();
      }
    }, {
      key: "_positionsEqual",
      value: function _positionsEqual(first, second) {
        return first.x === second.x && first.y === second.y;
      }
    }, {
      key: "_getVector",
      value: function _getVector(direction) {
        // Vectors representing tile movement
        var map = {
          0: {
            x: 0,
            y: -1
          },
          // up
          1: {
            x: 1,
            y: 0
          },
          // right
          2: {
            x: 0,
            y: 1
          },
          // down
          3: {
            x: -1,
            y: 0 // left

          }
        };
        return map[direction];
      }
    }, {
      key: "_buildTraversals",
      value: function _buildTraversals(vector) {
        var traversals = {
          x: [],
          y: []
        };

        for (var pos = 0; pos < this.boardSize; pos++) {
          traversals.x.push(pos);
          traversals.y.push(pos);
        }

        if (vector.x === 1) traversals.x = traversals.x.reverse();
        if (vector.y === 1) traversals.y = traversals.y.reverse();
        return traversals;
      }
    }, {
      key: "_prepareTiles",
      value: function _prepareTiles() {
        this._eachCell(function (x, y, tile) {
          if (tile) {
            tile.mergedFrom = null;
            tile.savePosition();
          }
        });
      }
    }, {
      key: "_tileMatchesAvailable",
      value: function _tileMatchesAvailable() {
        var self = this;
        var tile;

        for (var x = 0; x < this.boardSize; x++) {
          for (var y = 0; y < this.boardSize; y++) {
            tile = this._cellContent({
              x: x,
              y: y
            });

            if (tile) {
              for (var direction = 0; direction < 4; direction++) {
                var vector = self._getVector(direction),
                    cell = {
                  x: x + vector.x,
                  y: y + vector.y
                },
                    other = self._cellContent(cell);

                if (other && other.value === tile.value) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      }
    }, {
      key: "_findFarthestPosition",
      value: function _findFarthestPosition(cell, vector) {
        var previous; // Progress towards the vector direction until an obstacle is found

        do {
          previous = cell;
          cell = {
            x: previous.x + vector.x,
            y: previous.y + vector.y
          };
        } while (this._withinBounds(cell) && this._cellAvailable(cell));

        return {
          farthest: previous,
          next: cell // Used to check if a merge is required

        };
      }
    }, {
      key: "_actuate",
      value: function _actuate() {
        // this._gameUtils.log(this._cells);
        this._gameUtils.boardCells = this._cells;
        this._gameUtils.config.game.moves = this.moves;
        this._gameUtils.config.game.merges = this.merges;
        this._gameUtils.config.game.won = this.won;
        this._gameUtils.config.game.over = this.over;
        this.fireAncestors('$updateScore', '', this.score);
        this.score = 0;
      }
    }, {
      key: "_buildGrid",
      value: function _buildGrid(size) {
        for (var x = 0; x < size; x++) {
          var row = this._cells[x] = [];

          for (var y = 0; y < size; y++) {
            row.push(null);
          }
        }
      }
    }, {
      key: "_addSavedTiles",
      value: function _addSavedTiles() {
        var _this4 = this;

        var persistGrid = this._gameUtils.board;
        persistGrid.forEach(function (column, col) {
          column.forEach(function (cell, row) {
            if (cell !== null) {
              var cellTile = new CellTile({
                x: col,
                y: row
              }, cell, "Tile-".concat(_this4._gameUtils.newTileIndex));

              _this4._insertTile(cellTile);
            }
          });
        });
      }
    }, {
      key: "_addStartTiles",
      value: function _addStartTiles(startTiles) {
        for (var i = 0; i < startTiles; i++) {
          this._addRandomTile();
        }
      }
    }, {
      key: "_addRandomTile",
      value: function _addRandomTile() {
        if (this._cellsAvailable()) {
          var value = Math.random() < 0.95 ? 2 : 4,
              cellTile = new CellTile(this._randomAvailableCell(), value, "Tile-".concat(this._gameUtils.newTileIndex));

          this._insertTile(cellTile);
        }
      }
    }, {
      key: "_availableCells",
      value: function _availableCells() {
        var cells = [];

        this._eachCell(function (x, y, tile) {
          if (!tile) {
            cells.push({
              x: x,
              y: y
            });
          }
        });

        return cells;
      }
    }, {
      key: "_randomAvailableCell",
      value: function _randomAvailableCell() {
        var cells = this._availableCells();

        if (cells.length) {
          return cells[Math.floor(Math.random() * cells.length)];
        }
      }
    }, {
      key: "_eachCell",
      value: function _eachCell(callback) {
        for (var x = 0; x < this.boardSize; x++) {
          for (var y = 0; y < this.boardSize; y++) {
            callback(x, y, this._cells[x][y]);
          }
        }
      }
    }, {
      key: "_cellsAvailable",
      value: function _cellsAvailable() {
        return !!this._availableCells().length;
      }
    }, {
      key: "_cellAvailable",
      value: function _cellAvailable(cell) {
        return !this._cellOccupied(cell);
      }
    }, {
      key: "_cellOccupied",
      value: function _cellOccupied(cell) {
        return !!this._cellContent(cell);
      }
    }, {
      key: "_cellContent",
      value: function _cellContent(cell) {
        if (this._withinBounds(cell)) {
          return this._cells[cell.x][cell.y];
        } else {
          return null;
        }
      }
    }, {
      key: "_insertTile",
      value: function _insertTile(tile) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        this._cells[tile.x][tile.y] = tile;

        this._addTile(tile, delay);
      }
    }, {
      key: "_removeTile",
      value: function _removeTile(tile) {
        this._cells[tile.x][tile.y] = null;
      }
    }, {
      key: "_removeTileElement",
      value: function _removeTileElement(tile) {
        var removeChild = this.tag("BoardTiles").getByRef(tile.tileRef),
            tileElIndex = this.tag("BoardTiles").childList.getIndex(removeChild);
        removeChild.setSmooth('alpha', 0);
        this.tag("BoardTiles").childList.removeAt(tileElIndex);
      }
    }, {
      key: "_withinBounds",
      value: function _withinBounds(position) {
        return position.x >= 0 && position.x < this.boardSize && position.y >= 0 && position.y < this.boardSize;
      }
    }, {
      key: "initBoard",
      value: function initBoard() {
        var _this5 = this;

        var boardSize = this._gameUtils.config.boardSize,
            startTiles = this._gameUtils.config.startTiles,
            tilesFilled = this._gameUtils.config.game.tilesFilled || 0;
        this.score = 0;
        this.moves = 0;
        this.merges = 0;
        this.won = false;
        this.over = false;
        this._cells = [];

        this._buildGrid(boardSize);

        if (this._gameUtils.config.test.active === true) {
          this._addSavedTiles();
        } else if (this._gameUtils.config.game.isSavedGame === true) {
          if (tilesFilled > 0) {
            this._addSavedTiles();
          } else {
            this._addStartTiles(startTiles);
          }
        } else {
          this._addStartTiles(startTiles);
        }

        this.tag("BoardTiles").children = [];

        this._cells.map(function (column) {
          column.map(function (cell) {
            if (cell) {
              _this5._addTile(cell);
            }
          });
        });

        this._actuate();

        this._setState("Board");
      }
    }, {
      key: "_addTile",
      value: function _addTile(tile) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var tiles = _toConsumableArray(this.tag("BoardTiles").children);

        this.tag("BoardTiles").children = [];
        tiles.push({
          ref: tile.tileRef,
          type: Tile,
          tile: tile,
          delay: delay,
          w: this.cellSize - this.cellMargin,
          h: this.cellSize - this.cellMargin,
          x: this.cellSize * tile.x,
          y: this.cellSize * tile.y,
          row: tile.y,
          col: tile.x
        });
        this.tag("BoardTiles").children = [];
        this.tag("BoardTiles").children = tiles;
      }
    }, {
      key: "_init",
      value: function _init() {
        this._gameUtils = this.fireAncestors('$getGameUtils');
        this.boardSize = this._gameUtils.config.boardSize;
        this.cellSize = this._gameUtils.config.cellSize;
        this.cellMargin = this._gameUtils.config.cellMargin;
        this.tileColors = this._gameUtils.tileColors;
      }
    }, {
      key: "grid",
      set: function set(v) {
        this._cells = v;
      },
      get: function get() {
        return this._cells;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          GameBoard: {
            w: 980,
            h: 980,
            src: AppDefinition.getPath('images/gameboard.png'),
            BoardTiles: {
              x: 20,
              y: 20
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
          _inherits(Board, _this6);

          function Board() {
            _classCallCheck(this, Board);

            return _possibleConstructorReturn(this, _getPrototypeOf(Board).apply(this, arguments));
          }

          _createClass(Board, [{
            key: "_handleUp",
            value: function _handleUp() {
              this.moveTiles(0);
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              this.moveTiles(1);
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this.moveTiles(2);
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this.moveTiles(3);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Board');
            }
          }]);

          return Board;
        }(this)];
      }
    }]);

    return Board;
  }(lng.Component);

  var CellTile =
  /*#__PURE__*/
  function () {
    // y = row
    // x = col
    function CellTile(position, value, ref, cellSize) {
      _classCallCheck(this, CellTile);

      this.x = position.x;
      this.y = position.y;
      this.value = value || 2;
      this.tileRef = ref;
      this.cellSize = cellSize || 240;
      this.previousPosition = null;
      this.mergedFrom = null;
    }

    _createClass(CellTile, [{
      key: "savePosition",
      value: function savePosition() {
        this.previousPosition = {
          x: this.x,
          y: this.y
        };
      }
    }, {
      key: "updatePosition",
      value: function updatePosition(position, tileEl) {
        return new Promise(function (resolve, reject) {
          var tile = tileEl.tile,
              prevPos = tile.previousPosition,
              duration = 0.3;
          this.x = position.x;
          this.y = position.y;

          if (this.previousPosition) {
            var animation = tileEl.animation({
              duration: duration,
              stopMethod: 'forward',
              timingFunction: 'ease-out',
              actions: [{
                p: 'x',
                v: {
                  0: this.cellSize * prevPos.x,
                  1: this.cellSize * this.x
                }
              }, {
                p: 'y',
                v: {
                  0: this.cellSize * prevPos.y,
                  1: this.cellSize * this.y
                }
              }]
            });
            animation.on('finish', function () {
              resolve(true);
            });
            animation.start();
            tileEl.patch({
              smooth: {
                x: [this.cellSize * this.x, {
                  duration: duration,
                  delay: 0,
                  timingFunction: 'ease-out'
                }],
                y: [this.cellSize * this.y, {
                  duration: duration,
                  delay: 0,
                  timingFunction: 'ease-out'
                }]
              },
              row: this.y,
              col: this.x
            });
          }
        }.bind(this));
      }
    }, {
      key: "moveMergeTile",
      value: function moveMergeTile(cell, estimation, pos, prevPos) {
        return new Promise(function (resolve, reject) {
          var animation = cell.animation({
            duration: estimation,
            stopMethod: 'forward',
            timingFunction: 'ease-out',
            actions: [{
              p: 'x',
              v: {
                0: this.cellSize * prevPos.x,
                1: this.cellSize * pos.x
              }
            }, {
              p: 'y',
              v: {
                0: this.cellSize * prevPos.y,
                1: this.cellSize * pos.y
              }
            }]
          });
          animation.on('finish', function () {
            resolve(true);
          });
          animation.start();
        }.bind(this));
      }
    }, {
      key: "mergeTiles",
      value: function mergeTiles(position, board) {
        return new Promise(function (resolve, reject) {
          var cell1 = board.getByRef(this.mergedFrom[0].tileRef),
              cell2 = board.getByRef(this.mergedFrom[1].tileRef),
              prevPos1 = this.mergedFrom[0].previousPosition,
              prevPos2 = this.mergedFrom[1].previousPosition;
          var anims = [this.moveMergeTile(cell1, 0.4, position, prevPos1), this.moveMergeTile(cell2, 0.4, position, prevPos2)];
          Promise.all(anims).then(function () {
            board.childList.remove(cell1);
            board.childList.remove(cell2);
            resolve(true);
          });
        }.bind(this));
      }
    }, {
      key: "_init",
      value: function _init() {
        this._gameUtils = this.fireAncestors('$getGameUtils');
      }
    }]);

    return CellTile;
  }();

  var Game =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(Game, _lng$Component7);

    function Game() {
      _classCallCheck(this, Game);

      return _possibleConstructorReturn(this, _getPrototypeOf(Game).apply(this, arguments));
    }

    _createClass(Game, [{
      key: "newGame",
      value: function newGame(gameType) {
        this._gameUtils.initGame(gameType);

        this.score = 0;
        this.best = this._gameUtils.config.game.best;
        this.over = false;
        this.won = false;
        this.board = this.tag("Board");
        this.board.initBoard();
        this.$updateScore(true, 0);
        this.tag("Best").update(true, this.best);

        this._setState("Game");
      }
    }, {
      key: "$updateScore",
      value: function $updateScore(direct, score) {
        this.score = score;

        if (score > 0) {
          this.tag("Score").update(direct === 'init', score);
          this._gameUtils.config.game.score += score;

          if (this._gameUtils.config.game.score > this._gameUtils.config.game.best) {
            this._gameUtils.config.game.best = this._gameUtils.config.game.score;
            this.tag("Best").update(false, this._gameUtils.config.game.best);
          }
        }

        if (this._gameUtils.config.game.over || this._gameUtils.config.game.won) {
          this.fireAncestors('$winloose');
        }

        this._setState("Game");
      }
    }, {
      key: "_init",
      value: function _init() {
        this._gameUtils = this.fireAncestors('$getGameUtils');
        this.score = 0;
        this.best = this._gameUtils.config.game.best;
        this.over = false;
        this.won = false;
        this.tag("Best").update(false, this.best);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            w: 1920,
            h: 1080,
            rect: true,
            color: 0xff616263,
            Background: {
              w: 1860,
              h: 1020,
              x: 30,
              y: 30,
              texture: lng.Tools.getRoundRect(1860, 1020, 30, 0, 0, true, 0xfffaf8ef)
            },
            Score: {
              type: Score,
              x: 70,
              y: 100
            },
            LeftPane: {
              type: LeftPane,
              x: 68,
              y: 320
            },
            Best: {
              type: Score$1,
              x: 1489,
              y: 100
            },
            RightPane: {
              type: LeftPane$1,
              x: 1489,
              y: 380
            },
            Board: {
              w: 980,
              h: 980,
              x: 470,
              y: 50,
              type: Board
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
          _inherits(Game, _this7);

          function Game() {
            _classCallCheck(this, Game);

            return _possibleConstructorReturn(this, _getPrototypeOf(Game).apply(this, arguments));
          }

          _createClass(Game, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Board');
            }
          }]);

          return Game;
        }(this)];
      }
    }]);

    return Game;
  }(lng.Component);

  var Howto =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(Howto, _lng$Component8);

    function Howto() {
      _classCallCheck(this, Howto);

      return _possibleConstructorReturn(this, _getPrototypeOf(Howto).apply(this, arguments));
    }

    _createClass(Howto, [{
      key: "_init",
      value: function _init() {
        this._activeItem = 0;
        this._howtoData = [{
          key: 'slide1',
          src: AppDefinition.getPath('images/instruction_step_1.png'),
          text1: 'Press the arrow keys',
          text2: 'to move all tiles'
        }, {
          key: 'slide2',
          src: AppDefinition.getPath('images/instruction_step_2.png'),
          text1: 'When two tiles with the',
          text2: 'same number touch, they merge into one'
        }, {
          key: 'slide3',
          src: AppDefinition.getPath('images/instruction_step_3.png'),
          text1: 'The game is over when',
          text2: 'the board fills up'
        }, {
          key: 'slide4',
          src: AppDefinition.getPath('images/instruction_step_4.png'),
          text1: 'Join the numbers and',
          text2: 'get to the "2048" tile!'
        }];
        this.tag('SliderWrapper').children = this._howtoData.map(function (htItem, idx) {
          return {
            ref: "Slider-".concat(htItem.key),
            type: HowtoItem,
            htItem: htItem,
            x: idx * 560
          };
        });
        this.tag('SliderIndicator').children = this._howtoData.map(function (htItem, idx) {
          return {
            ref: "Indicator-".concat(idx),
            type: IndicatorItem,
            idx: idx,
            x: idx * 30
          };
        });

        this._setState("Slider");
      }
    }, {
      key: "repositionSlide",
      value: function repositionSlide() {
        this.tag('SliderWrapper').x = -(this._activeItem * 560);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            MenuWrapper: {
              Slider: {
                w: 560,
                h: 700,
                x: 20,
                y: 20,
                clipping: true,
                SliderWrapper: {
                  h: 700,
                  x: 0,
                  y: 0
                }
              },
              SliderIndicator: {
                w: 90,
                h: 16,
                x: 560 / 2,
                y: 720,
                mountX: 0.5
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
        function (_this8) {
          _inherits(Slider, _this8);

          function Slider() {
            _classCallCheck(this, Slider);

            return _possibleConstructorReturn(this, _getPrototypeOf(Slider).apply(this, arguments));
          }

          _createClass(Slider, [{
            key: "_handleRight",
            value: function _handleRight() {
              if (this._activeItem < this._howtoData.length - 1) {
                this._activeItem++;
              } else {
                this._activeItem = 0;
              }

              this.repositionSlide();
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              if (this._activeItem > 0) {
                this._activeItem--;
              } else {
                this._activeItem = this._howtoData.length - 1;
              }

              this.repositionSlide();
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('SliderIndicator').children[this._activeItem];
            }
          }]);

          return Slider;
        }(this)];
      }
    }]);

    return Howto;
  }(lng.Component);

  var HowtoItem =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(HowtoItem, _lng$Component9);

    function HowtoItem() {
      _classCallCheck(this, HowtoItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(HowtoItem).apply(this, arguments));
    }

    _createClass(HowtoItem, [{
      key: "_init",
      value: function _init() {
        this.tag("Slide").patch({
          src: this.htItem.src,
          Text1: {
            text: {
              text: this.htItem.text1
            }
          },
          Text2: {
            text: {
              text: this.htItem.text2
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Slide: {
            w: 560,
            h: 560,
            src: '',
            Text1: {
              w: 500,
              h: 90,
              x: 560 / 2,
              y: 595,
              mountX: 0.5,
              color: 0xff776e65,
              text: {
                fontSize: 26,
                lineHeight: 30,
                fontFace: 'Roboto-Bold',
                textAlign: 'center'
              }
            },
            Text2: {
              w: 500,
              h: 90,
              x: 560 / 2,
              y: 625,
              mountX: 0.5,
              color: 0xff776e65,
              text: {
                fontSize: 26,
                lineHeight: 30,
                fontFace: 'Roboto-Bold',
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return HowtoItem;
  }(lng.Component);

  var IndicatorItem =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(IndicatorItem, _lng$Component10);

    function IndicatorItem() {
      _classCallCheck(this, IndicatorItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(IndicatorItem).apply(this, arguments));
    }

    _createClass(IndicatorItem, [{
      key: "_focus",
      value: function _focus() {
        this.tag("Indicator").color = 0xffedc22e;
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag("Indicator").color = 0xffcdc0b4;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Indicator: {
            w: 16,
            h: 16,
            color: 0xffcdc0b4,
            texture: lng.Tools.getRoundRect(16, 16, 8, 0, 0, true, 0xffffffff)
          }
        };
      }
    }]);

    return IndicatorItem;
  }(lng.Component);

  var Credits =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(Credits, _lng$Component11);

    function Credits() {
      _classCallCheck(this, Credits);

      return _possibleConstructorReturn(this, _getPrototypeOf(Credits).apply(this, arguments));
    }

    _createClass(Credits, null, [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            MenuWrapper: {
              Text1: {
                w: 460,
                h: 70,
                x: 70,
                y: 171,
                color: 0xff776e65,
                text: {
                  text: 'Inspired by Gabriele Cirulli game available on the web:',
                  fontFace: 'Roboto-Regular',
                  fontSize: 26,
                  lineHeight: 36
                }
              },
              Text2: {
                w: 460,
                h: 70,
                x: 70,
                y: 243,
                color: 0xff776e65,
                text: {
                  text: 'http://gabrielcirulli.github.io/2048/',
                  fontFace: 'Roboto-Regular',
                  fontSize: 26,
                  lineHeight: 36
                }
              },
              Text3: {
                w: 460,
                h: 70,
                x: 70,
                y: 280,
                color: 0xff776e65,
                text: {
                  text: 'Join the numbers and get to the 2048 tile!',
                  fontFace: 'Roboto-Regular',
                  fontSize: 26,
                  lineHeight: 36
                }
              },
              About1: {
                w: 460,
                h: 70,
                x: 70,
                y: 388,
                color: 0xff776e65,
                text: {
                  text: 'App van Metrological',
                  fontFace: 'Roboto-Regular',
                  fontSize: 26,
                  lineHeight: 36
                }
              },
              About2: {
                w: 460,
                h: 70,
                x: 70,
                y: 425,
                color: 0xff776e65,
                text: {
                  text: '2.0.00',
                  fontFace: 'Roboto-Regular',
                  fontSize: 26,
                  lineHeight: 36
                }
              },
              Copyright1: {
                w: 460,
                h: 70,
                x: 70,
                y: 510,
                color: 0xff776e65,
                text: {
                  text: 'Copyright © 2019 Metrological',
                  fontFace: 'Roboto-Regular',
                  fontSize: 18,
                  lineHeight: 30
                }
              },
              Copyright2: {
                w: 460,
                h: 70,
                x: 70,
                y: 540,
                color: 0xff776e65,
                text: {
                  text: 'All rights reserved ',
                  fontFace: 'Roboto-Regular',
                  fontSize: 18,
                  lineHeight: 30
                }
              }
            }
          }
        };
      }
    }]);

    return Credits;
  }(lng.Component);

  var Menu =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(Menu, _lng$Component12);

    function Menu() {
      _classCallCheck(this, Menu);

      return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
      key: "_init",
      value: function _init() {
        this._selectedMenu = 0;
        this._activeMenu = 0;

        this._setState("Menu");
      }
    }, {
      key: "activeMenuItem",
      get: function get() {
        return this._activeMenu;
      }
    }, {
      key: "currentMenu",
      get: function get() {
        return this.tag('Menu').children[this._activeMenu].mnuItem;
      }
    }, {
      key: "menuData",
      set: function set(v) {
        var _this9 = this;

        this._menuData = v;
        this.tag('Menu').children = this._menuData.filter(function (filter) {
          return filter.disabled === false;
        }).map(function (mnuItem, idx) {
          return {
            ref: "Menu-".concat(mnuItem.key),
            type: MenuItem,
            mnuItem: mnuItem,
            y: idx * 110
          };
        });
        this.tag('Menu').children[this._selectedMenu].selected = true;
        this.tag('MenuWrapper').h = this.tag('Menu').children.length === 3 ? 520 : 630;
        this._showHowToAnimation = this.tag('MenuWrapper').animation({
          duration: 0.6,
          actions: [{
            p: 'h',
            v: {
              0: this.tag('MenuWrapper').h,
              0.5: 750,
              1: 750
            }
          }, {
            t: 'Logo',
            p: 'alpha',
            v: {
              0: 1,
              0.5: 1,
              1: 0
            }
          }, {
            t: 'Menu',
            p: 'alpha',
            v: {
              0: 1,
              0.4: 1,
              1: 0
            }
          }, {
            t: 'HowTo',
            p: 'alpha',
            v: {
              0: 0,
              0.7: 0,
              1: 1
            }
          }]
        });
        this._hideHowToAnimation = this.tag('MenuWrapper').animation({
          duration: 0.6,
          actions: [{
            p: 'h',
            v: {
              0: 750,
              0.5: 750,
              1: this.tag('MenuWrapper').h
            }
          }, {
            t: 'Logo',
            p: 'alpha',
            v: {
              0: 0,
              0.5: 0,
              1: 1
            }
          }, {
            t: 'Menu',
            p: 'alpha',
            v: {
              0: 0,
              0.7: 0,
              1: 1
            }
          }, {
            t: 'HowTo',
            p: 'alpha',
            v: {
              0: 1,
              0.4: 0,
              1: 0
            }
          }]
        });

        this._showHowToAnimation.on('finish', function () {
          _this9.fire('showHowTo');
        });

        this._hideHowToAnimation.on('finish', function () {
          _this9.fire('hideHowTo');
        });

        this._showCreditAnimation = this.tag('MenuWrapper').animation({
          duration: 0.6,
          actions: [{
            p: 'h',
            v: {
              0: this.tag('MenuWrapper').h,
              0.5: 630,
              1: 630
            }
          }, {
            t: 'Menu',
            p: 'alpha',
            v: {
              0: 1,
              0.4: 1,
              1: 0
            }
          }, {
            t: 'Credits',
            p: 'alpha',
            v: {
              0: 0,
              0.7: 0,
              1: 1
            }
          }]
        });
        this._hideCreditAnimation = this.tag('MenuWrapper').animation({
          duration: 0.6,
          actions: [{
            p: 'h',
            v: {
              0: 630,
              0.5: 630,
              1: this.tag('MenuWrapper').h
            }
          }, {
            t: 'Menu',
            p: 'alpha',
            v: {
              0: 0,
              0.7: 0,
              1: 1
            }
          }, {
            t: 'Credits',
            p: 'alpha',
            v: {
              0: 1,
              0.4: 0,
              1: 0
            }
          }]
        });

        this._showCreditAnimation.on('finish', function () {
          _this9.fire('showCredits');
        });

        this._hideCreditAnimation.on('finish', function () {
          _this9.fire('hideCredits');
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            w: 1920,
            h: 1080,
            rect: true,
            color: 0x64101010,
            MenuWrapper: {
              w: 600,
              h: 630,
              x: 1920 / 2,
              y: 1080 / 2,
              mount: 0.5,
              texture: lng.Tools.getRoundRect(630, 630, 20, 0, 0, true, 0xfffaf8ef),
              Logo: {
                w: 250,
                h: 254,
                x: 600 / 2,
                y: -90,
                mountX: 0.5,
                src: AppDefinition.getPath('images/mainLogo.png')
              },
              Menu: {
                w: 560,
                h: 360,
                x: 20,
                y: 180
              },
              Credits: {
                type: Credits,
                alpha: 0
              },
              HowTo: {
                type: Howto,
                alpha: 0
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
          _inherits(Menu, _this10);

          function Menu() {
            _classCallCheck(this, Menu);

            return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
          }

          _createClass(Menu, [{
            key: "_handleDown",
            value: function _handleDown() {
              if (this._activeMenu < this._menuData.length - 1) {
                this._activeMenu++;
              }
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._activeMenu > 0) {
                this._activeMenu--;
              }
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              switch (this.currentMenu.key) {
                case 'resume':
                case 'new':
                  return false;

                case 'how':
                  this._showHowToAnimation.start();

                  break;

                case 'cred':
                  this._showCreditAnimation.start();

                  break;
              }
            }
          }, {
            key: "showHowTo",
            value: function showHowTo() {
              this._setState("HowTo");
            }
          }, {
            key: "showCredits",
            value: function showCredits() {
              this._setState("Credits");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Menu').children[this._activeMenu];
            }
          }]);

          return Menu;
        }(this),
        /*#__PURE__*/
        function (_this11) {
          _inherits(HowTo, _this11);

          function HowTo() {
            _classCallCheck(this, HowTo);

            return _possibleConstructorReturn(this, _getPrototypeOf(HowTo).apply(this, arguments));
          }

          _createClass(HowTo, [{
            key: "_handleEnter",
            value: function _handleEnter() {
              this._hideHowToAnimation.start();
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._hideHowToAnimation.start();
            }
          }, {
            key: "hideHowTo",
            value: function hideHowTo() {
              this._setState("Menu");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('HowTo');
            }
          }]);

          return HowTo;
        }(this),
        /*#__PURE__*/
        function (_this12) {
          _inherits(Credits$$1, _this12);

          function Credits$$1() {
            _classCallCheck(this, Credits$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Credits$$1).apply(this, arguments));
          }

          _createClass(Credits$$1, [{
            key: "_handleEnter",
            value: function _handleEnter() {
              this._hideCreditAnimation.start();
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._hideCreditAnimation.start();
            }
          }, {
            key: "hideCredits",
            value: function hideCredits() {
              this._setState("Menu");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Credits');
            }
          }]);

          return Credits$$1;
        }(this)];
      }
    }]);

    return Menu;
  }(lng.Component);

  var MenuItem =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(MenuItem, _lng$Component13);

    function MenuItem() {
      _classCallCheck(this, MenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).apply(this, arguments));
    }

    _createClass(MenuItem, [{
      key: "_init",
      value: function _init() {
        this.tag("CellWrapper").patch({
          Label: {
            color: 0xfffaf8ef,
            text: {
              text: this.mnuItem.label
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag("CellWrapper").patch({
          color: 0xffedc12e,
          Label: {
            color: 0xfffaf8ef
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag("CellWrapper").patch({
          color: 0xffbbada0,
          Label: {
            color: 0xfffaf8ef
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          CellWrapper: {
            w: 560,
            h: 100,
            rect: true,
            color: 0xffbbada0,
            texture: lng.Tools.getRoundRect(560, 100, 10, 0, 0, true, 0xffffffff),
            Label: {
              w: 560,
              h: 55,
              y: 100 / 2,
              mountY: 0.5,
              color: 0xffb0a89e,
              text: {
                fontSize: 42,
                lineHeight: 42,
                fontFace: 'Roboto-Bold',
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return MenuItem;
  }(lng.Component);

  var WinLoose =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(WinLoose, _lng$Component14);

    function WinLoose() {
      _classCallCheck(this, WinLoose);

      return _possibleConstructorReturn(this, _getPrototypeOf(WinLoose).apply(this, arguments));
    }

    _createClass(WinLoose, [{
      key: "_init",
      value: function _init() {
        this._activeButton = 0;

        this._setState("Dialog");
      }
    }, {
      key: "activeButton",
      get: function get() {
        return this._activeButton;
      }
    }, {
      key: "currentButton",
      get: function get() {
        return this.tag('Buttons').children[this._activeButton].btnItem;
      }
    }, {
      key: "WinLooseSetup",
      set: function set(v) {
        var butnData = {
          'win': [{
            key: "Yes",
            label: "Yes, continue"
          }, {
            key: "No",
            label: "No, quit"
          }],
          'over': [{
            key: "Yes",
            label: "Yes, let's try again"
          }, {
            key: "No",
            label: "No, quit"
          }]
        };
        this._buttonsData = butnData[v];
        this.tag('Buttons').children = this._buttonsData.map(function (btnItem, idx) {
          return {
            ref: "DialogButton-".concat(btnItem.key),
            type: button,
            btnItem: btnItem,
            y: idx * 110
          };
        });

        if (v === 'win') {
          this.tag("Win").alpha = 1;
          this.tag("Loose").alpha = 0;
        } else {
          this.tag("Win").alpha = 0;
          this.tag("Loose").alpha = 1;
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            w: 1920,
            h: 1080,
            rect: true,
            color: 0x99101010,
            DialogWrapper: {
              w: 600,
              h: 630,
              x: 1920 / 2,
              y: 1080 / 2,
              mount: 0.5,
              texture: lng.Tools.getRoundRect(630, 630, 20, 0, 0, true, 0xfffaf8ef),
              Logo: {
                w: 250,
                h: 254,
                x: 600 / 2,
                y: -90,
                mountX: 0.5,
                src: AppDefinition.getPath('images/mainLogo.png')
              },
              Win: {
                w: 560,
                h: 360,
                x: 20,
                y: 160,
                alpha: 0,
                Title: {
                  w: 460,
                  h: 70,
                  x: 70,
                  color: 0xff990000,
                  text: {
                    text: 'You win!!',
                    fontSize: 62,
                    lineHeight: 42,
                    fontFace: 'Roboto-Black',
                    textAlign: 'center'
                  }
                },
                Message: {
                  w: 460,
                  h: 130,
                  x: 70,
                  y: 130,
                  color: 0xff776e65,
                  text: {
                    text: 'Would you like to try again?',
                    fontSize: 32,
                    lineHeight: 42,
                    fontFace: 'Roboto-Bold',
                    textAlign: 'center'
                  }
                }
              },
              Loose: {
                w: 560,
                h: 360,
                x: 20,
                y: 160,
                alpha: 0,
                Title: {
                  w: 460,
                  h: 70,
                  x: 70,
                  color: 0xff990000,
                  text: {
                    text: 'Game over!',
                    fontSize: 62,
                    lineHeight: 42,
                    fontFace: 'Roboto-Black',
                    textAlign: 'center'
                  }
                },
                Message: {
                  w: 460,
                  h: 130,
                  x: 70,
                  y: 130,
                  color: 0xff776e65,
                  text: {
                    text: 'Would you like to continue this game?',
                    fontSize: 32,
                    lineHeight: 42,
                    fontFace: 'Roboto-Bold',
                    textAlign: 'center'
                  }
                }
              },
              Buttons: {
                w: 560,
                h: 210,
                x: 20,
                y: 400
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
        function (_this13) {
          _inherits(Dialog, _this13);

          function Dialog() {
            _classCallCheck(this, Dialog);

            return _possibleConstructorReturn(this, _getPrototypeOf(Dialog).apply(this, arguments));
          }

          _createClass(Dialog, [{
            key: "_handleDown",
            value: function _handleDown() {
              if (this._activeButton < this._buttonsData.length - 1) {
                this._activeButton++;
              }
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._activeButton > 0) {
                this._activeButton--;
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Buttons').children[this._activeButton];
            }
          }]);

          return Dialog;
        }(this)];
      }
    }]);

    return WinLoose;
  }(lng.Component);

  var button =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(button, _lng$Component15);

    function button() {
      _classCallCheck(this, button);

      return _possibleConstructorReturn(this, _getPrototypeOf(button).apply(this, arguments));
    }

    _createClass(button, [{
      key: "_init",
      value: function _init() {
        if (this.btnItem) {
          this.tag("CellWrapper").patch({
            Label: {
              color: 0xfffaf8ef,
              text: {
                text: this.btnItem.label
              }
            }
          });
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag("CellWrapper").patch({
          color: 0xffedc12e,
          Label: {
            color: 0xfffaf8ef
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag("CellWrapper").patch({
          color: 0xffbbada0,
          Label: {
            color: 0xfffaf8ef
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          CellWrapper: {
            w: 560,
            h: 100,
            rect: true,
            color: 0xffbbada0,
            texture: lng.Tools.getRoundRect(560, 100, 10, 0, 0, true, 0xffffffff),
            Label: {
              w: 560,
              h: 55,
              y: 100 / 2,
              mountY: 0.5,
              color: 0xffb0a89e,
              text: {
                fontSize: 42,
                lineHeight: 42,
                fontFace: 'Roboto-Bold',
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return button;
  }(lng.Component);

  var NewWarning =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(NewWarning, _lng$Component16);

    function NewWarning() {
      _classCallCheck(this, NewWarning);

      return _possibleConstructorReturn(this, _getPrototypeOf(NewWarning).apply(this, arguments));
    }

    _createClass(NewWarning, [{
      key: "_init",
      value: function _init() {
        this._activeButton = 0;
        this.tag("Message").text.text = "Starting a new game will erase your current progress.\n Are you sure?";
        this._buttonsData = [{
          key: "Yes",
          label: "Yes"
        }, {
          key: "No",
          label: "No"
        }];
        this.tag('Buttons').children = this._buttonsData.map(function (btnItem, idx) {
          return {
            ref: "DialogButton-".concat(btnItem.key),
            type: button$1,
            btnItem: btnItem,
            y: idx * 110
          };
        });

        this._setState("Dialog");
      }
    }, {
      key: "activeButton",
      get: function get() {
        return this._activeButton;
      }
    }, {
      key: "currentButton",
      get: function get() {
        return this.tag('Buttons').children[this._activeButton].btnItem;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            w: 1920,
            h: 1080,
            rect: true,
            color: 0x99101010,
            DialogWrapper: {
              w: 600,
              h: 630,
              x: 1920 / 2,
              y: 1080 / 2,
              mount: 0.5,
              texture: lng.Tools.getRoundRect(630, 630, 20, 0, 0, true, 0xfffaf8ef),
              Logo: {
                w: 250,
                h: 254,
                x: 600 / 2,
                y: -90,
                mountX: 0.5,
                src: AppDefinition.getPath('images/mainLogo.png')
              },
              Warning: {
                w: 560,
                h: 240,
                x: 20,
                y: 155,
                Title: {
                  w: 520,
                  h: 90,
                  x: 20,
                  color: 0xff990000,
                  text: {
                    text: 'New game warning!',
                    fontSize: 52,
                    lineHeight: 42,
                    fontFace: 'Roboto-Black',
                    textAlign: 'center'
                  }
                },
                Message: {
                  w: 480,
                  h: 195,
                  x: 20,
                  y: 95,
                  color: 0xff776e65,
                  text: {
                    text: '',
                    fontSize: 32,
                    lineHeight: 42,
                    fontFace: 'Roboto-Bold',
                    textAlign: 'center'
                  }
                }
              },
              Buttons: {
                w: 560,
                h: 210,
                x: 20,
                y: 400
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
          _inherits(Dialog, _this14);

          function Dialog() {
            _classCallCheck(this, Dialog);

            return _possibleConstructorReturn(this, _getPrototypeOf(Dialog).apply(this, arguments));
          }

          _createClass(Dialog, [{
            key: "_handleDown",
            value: function _handleDown() {
              if (this._activeButton < this._buttonsData.length - 1) {
                this._activeButton++;
              }
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this._activeButton > 0) {
                this._activeButton--;
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Buttons').children[this._activeButton];
            }
          }]);

          return Dialog;
        }(this)];
      }
    }]);

    return NewWarning;
  }(lng.Component);

  var button$1 =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(button$1, _lng$Component17);

    function button$1() {
      _classCallCheck(this, button$1);

      return _possibleConstructorReturn(this, _getPrototypeOf(button$1).apply(this, arguments));
    }

    _createClass(button$1, [{
      key: "_init",
      value: function _init() {
        if (this.btnItem) {
          this.tag("CellWrapper").patch({
            Label: {
              color: 0xfffaf8ef,
              text: {
                text: this.btnItem.label
              }
            }
          });
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag("CellWrapper").patch({
          color: 0xffedc12e,
          Label: {
            color: 0xfffaf8ef
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag("CellWrapper").patch({
          color: 0xffbbada0,
          Label: {
            color: 0xfffaf8ef
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          CellWrapper: {
            w: 560,
            h: 100,
            rect: true,
            color: 0xffbbada0,
            texture: lng.Tools.getRoundRect(560, 100, 10, 0, 0, true, 0xffffffff),
            Label: {
              w: 560,
              h: 55,
              y: 100 / 2,
              mountY: 0.5,
              color: 0xffb0a89e,
              text: {
                fontSize: 42,
                lineHeight: 42,
                fontFace: 'Roboto-Bold',
                textAlign: 'center'
              }
            }
          }
        };
      }
    }]);

    return button$1;
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
      key: "$getGameUtils",
      value: function $getGameUtils() {
        return this._gameUtils;
      }
    }, {
      key: "$winloose",
      value: function $winloose() {
        if (this._gameUtils.config.game.over === true) {
          this.tag("WinLoose").WinLooseSetup = 'over';

          this._setState("WinLoose");
        }

        if (this._gameUtils.config.game.won === true) {
          this.tag("WinLoose").WinLooseSetup = 'win';

          this._setState("WinLoose");
        }
      }
    }, {
      key: "_construct",
      value: function _construct() {
        this.stage._options.defaultFontFace = "Roboto-Regular";
        this._gameUtils = new GameUtils();
      }
    }, {
      key: "_init",
      value: function _init() {
        this.patch({
          "GameWrapper": {
            alpha: 1
          },
          "Menu": {
            alpha: 0
          }
        });
        this.game = this.tag('GameWrapper.Wrap.Content.Game');
        this.isSavedGame = this._gameUtils.config.game.isSavedGame;
        this.setMenu(this.isSavedGame);

        if (this._gameUtils.config.test.active === true) {
          this._setState("Game");
        } else {
          this._setState("Menu");
        }
      }
    }, {
      key: "setMenu",
      value: function setMenu(resumeDisabled) {
        this.tag("Menu").menuData = [{
          key: 'resume',
          label: 'Resume game',
          disabled: !resumeDisabled
        }, {
          key: 'new',
          label: 'New game',
          disabled: false
        }, {
          key: 'how',
          label: 'How to play?',
          disabled: false
        }, {
          key: 'cred',
          label: 'Credits',
          disabled: false
        }];
      }
    }, {
      key: "blur",
      value: function blur() {
        this.tag('GameWrapper').setSmooth('amount', 2.5, {
          duration: 0.5
        });
      }
    }, {
      key: "unblur",
      value: function unblur() {
        var wrapper = this.tag('GameWrapper');

        if (wrapper.transition('amount').isRunning()) {
          wrapper.transition('amount').stop();
        }

        this.tag('GameWrapper').amount = 0;
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'Roboto-Condensed',
          url: AppDefinition.getPath('fonts/RobotoCondensedBold.ttf'),
          descriptors: {}
        }, {
          family: 'Roboto-Regular',
          url: AppDefinition.getPath('fonts/Roboto-Regular.ttf'),
          descriptors: {}
        }, {
          family: 'Roboto-Bold',
          url: AppDefinition.getPath('fonts/Roboto-Bold.ttf'),
          descriptors: {}
        }, {
          family: 'Roboto-Black',
          url: AppDefinition.getPath('fonts/Roboto-Black.ttf'),
          descriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          GameWrapper: {
            w: 1929,
            h: 1080,
            type: lng.components.FastBlurComponent,
            amount: 0,
            alpha: 1,
            content: {
              Game: {
                type: Game
              }
            }
          },
          Menu: {
            type: Menu,
            alpha: 0
          },
          WinLoose: {
            type: WinLoose,
            alpha: 0
          },
          NewWarning: {
            type: NewWarning,
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
          _inherits(Menu$$1, _this15);

          function Menu$$1() {
            _classCallCheck(this, Menu$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Menu$$1).apply(this, arguments));
          }

          _createClass(Menu$$1, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "Menu": {
                  alpha: 1
                },
                "WinLoose": {
                  alpha: 0
                }
              });
              this.blur();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "Menu": {
                  alpha: 0
                },
                "WinLoose": {
                  alpha: 0
                },
                "NewWarning": {
                  alpha: 0
                }
              });
              this.unblur();
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._setState("Game", ['e']);
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState("Game", ['b']);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('Menu');
            }
          }]);

          return Menu$$1;
        }(this),
        /*#__PURE__*/
        function (_this16) {
          _inherits(Game$$1, _this16);

          function Game$$1() {
            _classCallCheck(this, Game$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Game$$1).apply(this, arguments));
          }

          _createClass(Game$$1, [{
            key: "$enter",
            value: function $enter(args, backType) {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "Menu": {
                  smooth: {
                    alpha: 0
                  }
                },
                "WinLoose": {
                  alpha: 0
                },
                "NewWarning": {
                  alpha: 0
                }
              });

              if (this._gameUtils.config.test.active === true) {
                this.game.newGame();
              } else if (backType === 'e') {
                if (this.tag('Menu').currentMenu.key === 'resume') {
                  this.game.newGame('resume');
                } else if (this.tag('Menu').currentMenu.key === 'new') {
                  if (this._gameUtils.config.game.moves > 0) {
                    this._setState("NewWarning");
                  } else {
                    this.game.newGame('new');
                  }
                }
              } else if (backType === 'ng') {
                this.game.newGame('new');
              } else if (backType === 'nq') {
                window.close();
              }
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.setMenu(this._gameUtils.config.game.moves > 0);

              this._setState("Menu");
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.game;
            }
          }]);

          return Game$$1;
        }(this),
        /*#__PURE__*/
        function (_this17) {
          _inherits(WinLoose$$1, _this17);

          function WinLoose$$1() {
            _classCallCheck(this, WinLoose$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(WinLoose$$1).apply(this, arguments));
          }

          _createClass(WinLoose$$1, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "WinLoose": {
                  alpha: 1
                }
              });
              this.blur();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "Menu": {
                  alpha: 0
                },
                "WinLoose": {
                  alpha: 0
                }
              });
              this.unblur();
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this._gameUtils.cleanSaved();

              if (this.tag("WinLoose").currentButton.key === 'Yes') {
                this.game.newGame();

                this._setState("Game");
              } else {
                this._gameUtils.resetGame();

                this._setState("Game", ["nq"]);
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('WinLoose');
            }
          }]);

          return WinLoose$$1;
        }(this),
        /*#__PURE__*/
        function (_this18) {
          _inherits(NewWarning$$1, _this18);

          function NewWarning$$1() {
            _classCallCheck(this, NewWarning$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(NewWarning$$1).apply(this, arguments));
          }

          _createClass(NewWarning$$1, [{
            key: "$enter",
            value: function $enter() {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "NewWarning": {
                  alpha: 1
                }
              });
              this.blur();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.patch({
                "GameWrapper": {
                  alpha: 1
                },
                "Menu": {
                  alpha: 0
                },
                "NewWarning": {
                  alpha: 0
                }
              });
              this.unblur();
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              if (this.tag("NewWarning").currentButton.key === 'Yes') {
                this._setState("Game", ["ng"]);
              } else {
                this._setState("Game", ['b']);
              }
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag('NewWarning');
            }
          }]);

          return NewWarning$$1;
        }(this)];
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
        return "com.metrological.app.2048";
      }
    }]);

    return AppDefinition;
  }(ux.AppDefinition);

  return AppDefinition;
}();