"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var com_metrological_app_Vimeo = function () {
  'use strict';

  var VimeoVideoModel =
  /*#__PURE__*/
  function () {
    function VimeoVideoModel(obj) {
      _classCallCheck(this, VimeoVideoModel);

      this.$ = obj;
    }

    _createClass(VimeoVideoModel, [{
      key: "getMediaplayerItem",
      value: function getMediaplayerItem() {
        return {
          title: this.title,
          stream: {
            link: this.$.film ? this.streams[0].link : this.filterStreams()[0].link
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
      value: function getPicture(_ref) {
        var _ref$w = _ref.w,
            w = _ref$w === void 0 ? null : _ref$w,
            _ref$h = _ref.h,
            h = _ref$h === void 0 ? null : _ref$h;
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
        return (this.$.film && this.$.film.pictures || this.$.pictures && this.$.pictures.sizes || this.$.pictures).sort(function (a, b) {
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
        return this.$.download || this.$.files || this.$.streams || this.$.film && this.$.film.play.progressive || [];
      }
    }, {
      key: "description",
      get: function get() {
        return this.$.description;
      }
    }, {
      key: "duration",
      get: function get() {
        return this.$.duration || this.$.film.duration;
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
    }, {
      key: "likes",
      get: function get() {
        return this.$.stats.likes;
      }
    }, {
      key: "plays",
      get: function get() {
        return this.$.stats.plays;
      }
    }]);

    return VimeoVideoModel;
  }();

  var VimeoCategoryModel =
  /*#__PURE__*/
  function () {
    function VimeoCategoryModel(obj) {
      _classCallCheck(this, VimeoCategoryModel);

      this.$ = obj;
    }

    _createClass(VimeoCategoryModel, [{
      key: "name",
      get: function get() {
        return this.$.name;
      }
    }, {
      key: "icon",
      get: function get() {
        return this.$.icon.sizes.find(function (icon) {
          return icon.width > 50;
        }).link;
      }
    }, {
      key: "bg",
      get: function get() {
        var icons = ["animation", "art", "cameratechniques", "comedy", "documentary", "experimental", "fashion", "food", "instructionals", "music", "narrative", "personal", "journalism", "sports", "talks", "travel"];
        var name = this.$.uri.replace('/categories/', '').split('/')[0];

        if (icons.includes(name)) {
          return 'category-' + name + '.jpeg';
        } else {
          return 'category-' + icons[Math.ceil(Math.random() * icons.length - 1)] + '.jpeg';
        }
      }
    }, {
      key: "uri",
      get: function get() {
        return this.$.uri + (!this.$.uri.includes('/videos') ? '/videos' : '');
      }
    }, {
      key: "parent",
      get: function get() {
        return this.$.parent;
      }
    }, {
      key: "item",
      get: function get() {
        return this.$;
      }
    }, {
      key: "type",
      get: function get() {
        return 'videos';
      }
    }]);

    return VimeoCategoryModel;
  }();

  var VimeoChannelModel =
  /*#__PURE__*/
  function () {
    function VimeoChannelModel(obj) {
      _classCallCheck(this, VimeoChannelModel);

      this.$ = obj;
    }

    _createClass(VimeoChannelModel, [{
      key: "getPicture",

      /**
       * Get a picture that matches a certain width or height
       * @param w
       * @param h
       * @returns {*}
       */
      value: function getPicture(_ref2) {
        var _ref2$w = _ref2.w,
            w = _ref2$w === void 0 ? null : _ref2$w,
            _ref2$h = _ref2.h,
            h = _ref2$h === void 0 ? null : _ref2$h;
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
      key: "name",
      get: function get() {
        return this.$.name;
      }
    }, {
      key: "date",
      get: function get() {
        return this.$.created_time;
      }
    }, {
      key: "uri",
      get: function get() {
        return this.$.uri;
      }
    }, {
      key: "pictures",
      get: function get() {
        return (this.$.pictures && this.$.pictures.sizes || this.$.pictures).sort(function (a, b) {
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
      key: "followers",
      get: function get() {
        return this.$.stats && this.$.stats.users || this.$.metadata.connections.users.total;
      }
    }, {
      key: "totalvideos",
      get: function get() {
        return this.$.stats && this.$.stats.videos || this.$.metadata.connections.videos.total;
      }
    }]);

    return VimeoChannelModel;
  }();

  var VimeoUserModel =
  /*#__PURE__*/
  function () {
    function VimeoUserModel(obj) {
      _classCallCheck(this, VimeoUserModel);

      this.$ = obj;
    }

    _createClass(VimeoUserModel, [{
      key: "getPicture",

      /**
       * Get a picture that matches a certain width or height
       * @param w
       * @param h
       * @returns {*}
       */
      value: function getPicture(_ref3) {
        var _ref3$w = _ref3.w,
            w = _ref3$w === void 0 ? null : _ref3$w,
            _ref3$h = _ref3.h,
            h = _ref3$h === void 0 ? null : _ref3$h;
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
      key: "name",
      get: function get() {
        return this.$.name;
      }
    }, {
      key: "date",
      get: function get() {
        return this.$.created_time;
      }
    }, {
      key: "videosUri",
      get: function get() {
        return this.$.metadata.connections.videos.uri || this.$.metadata.connections.videos;
      }
    }, {
      key: "likesUri",
      get: function get() {
        return this.$.metadata.connections.likes.uri || this.$.metadata.connections.likes;
      }
    }, {
      key: "followingUri",
      get: function get() {
        return this.$.metadata.connections.following.uri || this.$.metadata.connections.following;
      }
    }, {
      key: "watchLaterUri",
      get: function get() {
        return this.$.metadata.connections.watchlater.uri || this.$.metadata.connections.watchlater;
      }
    }, {
      key: "uri",
      get: function get() {
        return this.$.uri;
      }
    }, {
      key: "pictures",
      get: function get() {
        return (this.$.pictures && this.$.pictures.sizes || this.$.pictures).sort(function (a, b) {
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
    }]);

    return VimeoUserModel;
  }();

  var VimeoApi =
  /*#__PURE__*/
  function () {
    function VimeoApi() {
      _classCallCheck(this, VimeoApi);

      this.keys = {
        id: 'aabe22c4e1a4038c0fc233bd6a0aa973',
        secret: '5d9d5e20fc83a9ac',
        authorization: 'basic YWFiZTIyYzRlMWE0MDM4YzBmYzIzM2JkNmEwYWE5NzM6NWQ5ZDVlMjBmYzgzYTlhYw=='
      };
      this.endpoints = {
        api: 'https://api.vimeo.com'
      };
      this.authHeaders = {
        'Authorization': this.keys.authorization,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      };
    }

    _createClass(VimeoApi, [{
      key: "getAccessToken",
      value: function getAccessToken() {
        var _this = this;

        var ls = window.localStorage;
        var token = ls.getItem('Vimeo.access_token');
        var user = ls.getItem('Vimeo.user');
        var altHeaders = this.authHeaders;
        var path = '/oauth/authorize/client';
        var body = {
          grant_type: "client_credentials",
          scope: "public"
        };

        if (token !== null) {
          this.keys.token = token;

          if (user !== null) {
            user = JSON.parse(user);
            return this.getUser(user);
          }

          return Promise.resolve();
        }

        return this.fetchData({
          path: path,
          body: body,
          altHeaders: altHeaders,
          method: 'POST'
        }).then(function (response) {
          _this.keys.token = response.access_token;
          ls.setItem('Vimeo.access_token', response.access_token);
          return Promise.resolve();
        });
      }
    }, {
      key: "getAuthCode",
      value: function getAuthCode() {
        var altHeaders = this.authHeaders;
        var path = '/oauth/device';
        var body = {
          grant_type: "device_grant",
          scope: "public private purchased"
        };
        return this.fetchData({
          path: path,
          body: body,
          use_proxy: true,
          altHeaders: altHeaders,
          method: 'POST'
        });
      }
    }, {
      key: "getUserAuth",
      value: function getUserAuth(data) {
        var _this2 = this;

        var ls = window.localStorage;
        var altHeaders = this.authHeaders;
        var rawUrl = data.authorize_link;
        var body = {
          user_code: data.user_code,
          device_code: data.device_code
        };
        return this.fetchData({
          rawUrl: rawUrl,
          body: body,
          use_proxy: true,
          altHeaders: altHeaders,
          method: 'POST'
        }).then(function (data) {
          if (data.user) {
            var user = data.user;
            data.user = new VimeoUserModel(user);
            _this2.keys.token = data.access_token;
            ls.setItem('Vimeo.access_token', data.access_token);
            ls.setItem('Vimeo.scope', data.scope);
            ls.setItem('Vimeo.user', JSON.stringify({
              name: user.name,
              uri: user.uri,
              photo: data.user.getPicture({
                w: 288
              }).link
            }));
          }

          return data;
        });
      }
    }, {
      key: "getExploreData",
      value: function getExploreData() {
        var promises = [];
        promises.push(this.getStaffPicksVideos());
        promises.push(this.getCategories());
        return Promise.all(promises);
      }
    }, {
      key: "getStaffPicksVideos",
      value: function getStaffPicksVideos() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var path = '/channels/staffpicks/videos';

        if (!params) {
          params = {
            page: 1,
            per_page: 20,
            filter: 'content_rating',
            filter_content_rating: 'safe'
          };
        }

        return this.fetchData({
          path: path,
          params: params
        }).then(function (_ref4) {
          var _ref4$data = _ref4.data,
              data = _ref4$data === void 0 ? [] : _ref4$data;

          if (!data.length) {
            return Promise.reject('getStaffPicksVideos returned no data');
          }

          return Promise.resolve({
            name: 'StaffPicks',
            items: data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getSearchResults",
      value: function getSearchResults(query, type) {
        var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var per_page = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var types = {
          videos: {
            path: '/videos',
            item: VimeoVideoModel,
            sort: 'likes'
          },
          channels: {
            path: '/channels',
            item: VimeoChannelModel,
            sort: 'relevant'
          },
          people: {
            path: '/users',
            item: VimeoUserModel,
            sort: 'relevant'
          }
        };
        var selected = types[type];
        var params = {
          query: query,
          direction: 'desc',
          sort: selected.sort,
          page: page,
          per_page: per_page
        };

        if (this.searchController) {
          this.searchController.abort();
        }

        this.searchController = new AbortController();
        return this.fetchData({
          path: selected.path,
          params: params,
          controller: this.searchController
        }).then(function (response) {
          return Promise.resolve({
            type: type,
            query: query,
            items: response.data.map(function (item) {
              return new selected.item(item);
            })
          });
        }).catch(function (error) {
          return Promise.reject(error);
        });
      }
    }, {
      key: "getChannels",
      value: function getChannels() {
        var _this3 = this;

        var path = '/channels';
        var params = {
          per_page: 10,
          sort: 'followers',
          direction: 'desc'
        };
        return this.fetchData({
          path: path,
          params: params
        }).then(function (response) {
          var promises = [];
          var params = {
            filter: 'conditional_featured',
            sort: 'featured',
            filter_content_rating: 'safe'
          };
          if (!response.data) return Promise.reject('Failed to get channels!');
          response.data.forEach(function (channel) {
            promises.push(_this3.fetchData({
              path: channel.uri + '/videos'
            }, params).then(function (videos) {
              return Promise.resolve({
                name: channel.name,
                videos: videos.data.map(function (video) {
                  return new VimeoVideoModel(video);
                })
              });
            }));
          });
          return Promise.all(promises);
        });
      }
    }, {
      key: "getCategories",
      value: function getCategories() {
        var path = '/categories';
        var params = {
          direction: 'asc'
        };
        return this.fetchData({
          path: path,
          params: params
        }).then(function (_ref5) {
          var _ref5$data = _ref5.data,
              data = _ref5$data === void 0 ? [] : _ref5$data;

          if (!data.length) {
            return Promise.reject('getCategories returned no data');
          }

          return Promise.resolve({
            name: 'Categories',
            items: data.map(function (category) {
              return new VimeoCategoryModel(category);
            })
          });
        });
      }
    }, {
      key: "getCategory",
      value: function getCategory(category) {
        return this.fetchData({
          path: category.uri
        }).then(function (response) {
          var components = [];
          var subcategories = response.subcategories.map(function (sub) {
            sub.parent = category.name;
            return new VimeoCategoryModel(sub);
          });
          components.push({
            title: 'Featured',
            type: 'list',
            uri: category.uri + '/videos',
            itemType: 'videos'
          });
          components.push({
            title: 'Subcategories',
            type: 'list',
            itemType: 'subcategories',
            items: subcategories
          });
          subcategories.forEach(function (sub) {
            components.push({
              title: sub.name,
              bg: category.bg,
              type: 'list',
              itemType: 'videos',
              uri: sub.uri
            });
          });
          return Promise.resolve(components);
        });
      }
    }, {
      key: "getSubcategoryData",
      value: function getSubcategoryData(category) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var params = {
          filter: 'conditional_featured',
          sort: 'featured',
          filter_content_rating: 'safe',
          per_page: 20,
          page: page
        };
        return this.fetchData({
          path: category.uri + '/videos',
          params: params
        }).then(function (response) {
          if (response.data.length) {
            return Promise.resolve({
              page: response.page,
              total: response.total,
              per_page: response.per_page,
              videos: response.data.map(function (video) {
                return new VimeoVideoModel(video);
              })
            });
          }
        });
      }
    }, {
      key: "getChannelData",
      value: function getChannelData(channel) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var params = {
          per_page: 20,
          page: page
        };
        return this.fetchData({
          path: channel.uri + '/videos',
          params: params
        }).then(function (response) {
          if (response.data.length) {
            return Promise.resolve({
              page: response.page,
              total: response.total,
              per_page: response.per_page,
              videos: response.data.map(function (video) {
                return new VimeoVideoModel(video);
              })
            });
          }
        });
      }
    }, {
      key: "getUserData",
      value: function getUserData(user) {
        var promises = [];
        promises.push(this.getUserVideos(user));
        promises.push(this.getUserLikes(user));
        promises.push(this.getUserFollowing(user));
        return Promise.all(promises);
      }
    }, {
      key: "getLibraryData",
      value: function getLibraryData() {
        var promises = [];
        promises.push(this.getUserWatchLater());
        promises.push(this.getUserPurchases());
        promises.push(this.getUserWatched());
        return Promise.all(promises);
      }
    }, {
      key: "getUser",
      value: function getUser(user) {
        return this.fetchData({
          path: user.uri
        }).then(function (user) {
          return Promise.resolve({
            user: new VimeoUserModel(user)
          });
        });
      }
    }, {
      key: "getUserVideos",
      value: function getUserVideos(user) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var per_page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: user.videosUri,
          params: params
        }).then(function (videos) {
          return Promise.resolve({
            title: 'videos',
            total: videos.total,
            page: page,
            per_page: per_page,
            videos: videos.data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getUserLikes",
      value: function getUserLikes(user) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var per_page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: user.likesUri,
          params: params
        }).then(function (videos) {
          return Promise.resolve({
            title: 'likes',
            page: page,
            per_page: per_page,
            total: videos.total,
            videos: videos.data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getUserFollowing",
      value: function getUserFollowing(user) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var per_page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: user.followingUri,
          params: params
        }).then(function (users) {
          return Promise.resolve({
            title: 'following',
            total: users.total,
            page: page,
            per_page: per_page,
            items: users.data.map(function (user) {
              return new VimeoUserModel(user);
            })
          });
        });
      }
    }, {
      key: "getUserPurchases",
      value: function getUserPurchases() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var per_page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: '/me/ondemand/purchases',
          params: params
        }).then(function (videos) {
          return Promise.resolve({
            title: 'purchases',
            page: page,
            per_page: per_page,
            total: videos.total,
            items: videos.data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getUserWatched",
      value: function getUserWatched() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var per_page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: '/me/watched/videos',
          params: params
        }).then(function (videos) {
          return Promise.resolve({
            title: 'watched',
            page: page,
            per_page: per_page,
            total: videos.total,
            items: videos.data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getUserWatchLater",
      value: function getUserWatchLater() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var per_page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: '/me/watchlater',
          params: params
        }).then(function (videos) {
          return Promise.resolve({
            title: 'watchlater',
            page: page,
            per_page: per_page,
            total: videos.total,
            items: videos.data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getUserFeed",
      value: function getUserFeed() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var per_page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var params = {
          per_page: per_page,
          page: page
        };
        return this.fetchData({
          path: '/me/feed',
          params: params
        }).then(function (videos) {
          return Promise.resolve({
            title: 'feed',
            page: page,
            per_page: per_page,
            total: videos.total,
            videos: videos.data.map(function (video) {
              return new VimeoVideoModel(video);
            })
          });
        });
      }
    }, {
      key: "getUri",
      value: function getUri(uri) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'videos';
        var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var per_page = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var use_proxy = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var types = {
          videos: VimeoVideoModel,
          profiles: VimeoUserModel,
          channels: VimeoChannelModel
        };
        var params = {
          page: page,
          per_page: per_page
        };
        return this.fetchData({
          path: uri,
          params: params,
          use_proxy: use_proxy
        }).then(function (response) {
          return Promise.resolve({
            page: page,
            per_page: per_page,
            total: response.total,
            items: response.data.map(function (item) {
              return new types[type](item);
            })
          });
        });
      }
    }, {
      key: "fetchData",
      value: function fetchData(_ref6) {
        var _ref6$rawUrl = _ref6.rawUrl,
            rawUrl = _ref6$rawUrl === void 0 ? false : _ref6$rawUrl,
            _ref6$use_proxy = _ref6.use_proxy,
            use_proxy = _ref6$use_proxy === void 0 ? false : _ref6$use_proxy,
            _ref6$path = _ref6.path,
            path = _ref6$path === void 0 ? false : _ref6$path,
            _ref6$params = _ref6.params,
            params = _ref6$params === void 0 ? false : _ref6$params,
            _ref6$body = _ref6.body,
            body = _ref6$body === void 0 ? false : _ref6$body,
            _ref6$altHeaders = _ref6.altHeaders,
            altHeaders = _ref6$altHeaders === void 0 ? false : _ref6$altHeaders,
            _ref6$method = _ref6.method,
            method = _ref6$method === void 0 ? 'GET' : _ref6$method,
            _ref6$controller = _ref6.controller,
            controller = _ref6$controller === void 0 ? false : _ref6$controller;
        var url = path && this.endpoints.api + path || rawUrl;
        url = new URL(use_proxy ? ux.Ui.getProxyUrl(url) : url);
        var headers = new Headers(altHeaders || {
          Authorization: "bearer ".concat(this.keys.token)
        });
        var opts = {
          method: method,
          headers: headers,
          signal: controller.signal || null,
          body: body && JSON.stringify(body) || null
        };
        if (params && !use_proxy) Object.keys(params).forEach(function (key) {
          return url.searchParams.append(key, params[key]);
        });
        return fetch(url, opts).then(function (r) {
          return r.json();
        }).catch(function (error) {
          return Promise.reject(error.message);
        });
      }
    }]);

    return VimeoApi;
  }();

  var Utils =
  /*#__PURE__*/
  function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
      key: "random",
      value: function random(items) {
        var len = items;

        if (Array.isArray(items)) {
          len = items.length;
        }

        return Math.floor(Math.random() * len);
      }
    }, {
      key: "secondsToTime",
      value: function secondsToTime(seconds) {
        var hours = ((seconds / 3600 | 0) + '').padStart(2, '0');
        var min = ((seconds % 3600 / 60 | 0) + '').padStart(2, '0');
        var sec = ((seconds % 3600 % 60 | 0) + '').padStart(2, '0');
        return "".concat(hours !== '00' ? hours + ':' : '').concat(min, ":").concat(sec);
      }
    }, {
      key: "cropImage",
      value: function cropImage(_ref7) {
        var url = _ref7.url,
            w = _ref7.w,
            h = _ref7.h;
        return ux.Ui.getImageUrl(url, {
          width: w,
          height: h,
          type: 'crop'
        });
      }
    }, {
      key: "formatSocialStat",
      value: function formatSocialStat(number) {
        var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (number >= 1e6) {
          return (number / 1e6).toFixed(digits) + 'm';
        }

        if (number >= 1e3) {
          return (number / 1e3).toFixed(digits) + 'k';
        }

        return number;
      }
    }, {
      key: "dateToText",
      value: function dateToText(date) {
        var diff = (new Date().getTime() - new Date(date).getTime()) / 864e5 | 0;

        if (diff > 365) {
          diff = diff / 365 | 0;
          return diff + ' year' + (diff > 1 ? 's' : '') + ' ago';
        }

        if (diff > 30) {
          diff = diff / 30 | 0;
          return diff + ' month' + (diff > 1 ? 's' : '') + ' ago';
        }

        if (diff > 0) {
          return diff + ' day' + (diff > 1 ? 's' : '') + ' ago';
        }

        return 'today';
      }
    }]);

    return Utils;
  }();

  var VimeoTeaser =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(VimeoTeaser, _lng$Component);

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
        var _this4 = this;

        this._currentProgress = 0;
        this._progressDuration = 30;
        this._loadedTextures = [];
        this.tag('Title').on('txLoaded', function () {
          _this4._loadedTextures.push('title');
        });
        this.tag('User').on('txLoaded', function () {
          _this4._loadedTextures.push('user');
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
              color: 0xffEEF1F2,
              scale: 1.2
            },
            Label: {
              smooth: {
                color: 0xff0D1314
              }
            },
            Icon: {
              src: AppDefinition.getPath('img/watch-icon.png')
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
              color: 0xff0D1314,
              scale: 1
            },
            Label: {
              smooth: {
                color: 0xffEEF1F2
              }
            },
            Icon: {
              src: AppDefinition.getPath('img/watch-icon-white.png')
            }
          }
        });
        this.play();
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors('$play', {
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
        var _this5 = this;

        if (!this._currentSet.length) {
          this._currentSet = this._items.slice();
        }

        var item = this._currentSet.splice(Utils.random(this._currentSet), 1)[0];

        this._current = item;
        this.patch({
          Clipper: {
            Image: {
              src: Utils.cropImage({
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
          _this5.fire('loaded');

          _this5.signal('loaded');
        });
        this.tag('Image').on('txError', function () {
          _this5.signal('error');
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
          w: 1770,
          h: 590,
          rect: true,
          color: 0xff000000,
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
            w: 1000,
            h: 590,
            rect: true,
            colorLeft: 0xff000000,
            colorRight: 0x00000000
          },
          Seal: {
            x: 88,
            y: 72,
            src: AppDefinition.getPath('img/staff-pick.png'),
            scale: 0.8,
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
            x: 100,
            y: 430,
            mountY: 1,
            text: {
              fontSize: 56,
              maxLines: 2,
              wordWrapWidth: 690,
              lineHeight: 70,
              fontFace: 'AkkuratPro'
            },
            transitions: {
              alpha: {
                duration: 1.5,
                delay: 0.5
              }
            }
          },
          User: {
            y: 410,
            x: 100,
            color: 0xffA3A4A5,
            text: {
              fontSize: 30,
              maxLines: 1,
              wordWrapWidth: 690,
              lineHeight: 40,
              fontFace: 'AkkuratPro'
            },
            transitions: {
              alpha: {
                duration: 1.5,
                delay: 0.7
              }
            }
          },
          Watch: {
            x: 100,
            y: 475,
            alpha: 0,
            texture: lng.Tools.getRoundRect(150, 50, 5, 0, 0, true, 0xffffffff),
            color: 0xff0D1314,
            transitions: {
              alpha: {
                duration: 1.5,
                delay: 0.9
              }
            },
            Icon: {
              x: 19,
              y: 15,
              w: 19,
              h: 20,
              color: 0xffEEF1F2,
              src: AppDefinition.getPath('img/watch-icon-white.png')
            },
            Label: {
              x: 52,
              y: 12,
              color: 0xffEEF1F2,
              text: {
                text: 'WATCH',
                fontSize: 22,
                fontFace: 'AkkuratPro'
              }
            }
          },
          Overlay: {
            w: 1920,
            h: 590,
            rect: true,
            color: 0xff282E32,
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
          ProgressBg: {
            w: 1765,
            h: 6,
            y: 590,
            rect: true,
            color: 0xff0D1314,
            zIndex: 1,
            alpha: 0,
            transitions: {
              alpha: {
                duration: 1,
                delay: 1.2
              }
            }
          },
          Progress: {
            y: 590,
            h: 6,
            rect: true,
            color: 0xff37434A,
            alpha: 0,
            zIndex: 2,
            transitions: {
              w: {
                duration: 30,
                timingFunction: 'linear'
              },
              alpha: {
                duration: 1,
                delay: 1.2
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
          _inherits(Inactive, _this6);

          function Inactive() {
            _classCallCheck(this, Inactive);

            return _possibleConstructorReturn(this, _getPrototypeOf(Inactive).apply(this, arguments));
          }

          _createClass(Inactive, [{
            key: "loaded",
            value: function loaded() {
              var _this7 = this;

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
                    scale: 1,
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
                ProgressBg: {
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
                _this7._progress();
              }, 1000);
              this.tag('Image').transition('alpha').on('finish', function () {
                if (_this7.tag('Image').alpha < 1) {
                  _this7.fire('imageFaded');
                }
              });
            }
          }]);

          return Inactive;
        }(this),
        /*#__PURE__*/
        function (_this8) {
          _inherits(Loading, _this8);

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
              var _this9 = this;

              if (this._interval) {
                clearInterval(this._interval);
              }

              this._interval = setInterval(function () {
                _this9._progress();
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
        function (_this10) {
          _inherits(Running, _this10);

          function Running() {
            _classCallCheck(this, Running);

            return _possibleConstructorReturn(this, _getPrototypeOf(Running).apply(this, arguments));
          }

          return Running;
        }(this)];
      }
    }]);

    return VimeoTeaser;
  }(lng.Component);

  var VimeoViewAll =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(VimeoViewAll, _lng$Component2);

    function VimeoViewAll() {
      _classCallCheck(this, VimeoViewAll);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoViewAll).apply(this, arguments));
    }

    _createClass(VimeoViewAll, [{
      key: "_init",
      value: function _init() {
        this.patch({
          Name: {
            x: this.w / 2,
            y: this.h / 2 + 14,
            text: {
              text: 'View all' + (this.total ? '\n(' + this.total + ')' : '')
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.1,
            color: 0xffeef1f2
          },
          Name: {
            smooth: {
              color: 0xff0D1314
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
            color: 0xff0D1314
          },
          Name: {
            smooth: {
              color: 0xffeef1f2
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          color: 0xff0D1314,
          zIndex: 1,
          Name: {
            zIndex: 2,
            mount: .5,
            color: 0xffeef1f2,
            text: {
              fontFace: 'AkkuratPro',
              fontSize: 36,
              textAlign: 'center',
              text: 'View all',
              lineHeight: 50
            }
          }
        };
      }
    }]);

    return VimeoViewAll;
  }(lng.Component);

  var VimeoSpinner =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(VimeoSpinner, _lng$Component3);

    function VimeoSpinner() {
      _classCallCheck(this, VimeoSpinner);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSpinner).apply(this, arguments));
    }

    _createClass(VimeoSpinner, [{
      key: "_init",
      value: function _init() {
        this.spinnerAnimation = this.tag('Image').animation({
          duration: 2,
          repeat: -1,
          stopMethod: 'fade',
          actions: [{
            p: 'rotation',
            v: {
              0: {
                sm: 0,
                v: 0
              },
              1: {
                sm: 0,
                v: Math.PI * 2
              }
            }
          }]
        });
      }
    }, {
      key: "show",
      value: function show() {
        if (this.alpha !== 0) return;
        this.patch({
          smooth: {
            alpha: 1
          },
          Image: {
            scale: 1
          }
        });
        this.spinnerAnimation.start();
      }
    }, {
      key: "hide",
      value: function hide() {
        this.patch({
          smooth: {
            alpha: 0
          },
          Image: {
            smooth: {
              scale: 1.3
            }
          }
        });
        this.spinnerAnimation.stop();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 70,
          h: 70,
          mountX: .5,
          alpha: 0,
          Image: {
            src: AppDefinition.getPath('/img/spinner.png')
          }
        };
      }
    }]);

    return VimeoSpinner;
  }(lng.Component);

  var VimeoVideo =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(VimeoVideo, _lng$Component4);

    function VimeoVideo() {
      _classCallCheck(this, VimeoVideo);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoVideo).apply(this, arguments));
    }

    _createClass(VimeoVideo, [{
      key: "_init",
      value: function _init() {
        var _this11 = this;

        this.title = this.tag('Title');
        this.time = this.tag('Time');
        this.timelabel = this.time.tag('Label');
        this.patch({
          Image: {
            src: Utils.cropImage({
              url: this.item.getPicture({
                w: 640
              }).link,
              w: 400,
              h: 215
            })
          },
          Time: {
            Label: {
              text: {
                text: Utils.secondsToTime(this.item.duration)
              }
            }
          },
          Title: {
            text: {
              text: this.item.title
            }
          },
          User: {
            text: {
              text: this.item.username
            }
          }
        });
        this.title.loadTexture();
        this.timelabel.loadTexture();
        this.time.patch({
          texture: lng.Tools.getRoundRect(this.timelabel.renderWidth + 18, 30, 3)
        });
        this.tag('Image').on('txLoaded', function () {
          _this11.tag('Image').setSmooth('alpha', 1);

          _this11.tag('Placeholder').alpha = 0;
        });

        if (this.title.renderWidth >= 360) {
          var pixels = this.title.renderWidth - 380;
          var duration = Math.max(pixels * 0.03, 1.8);
          this.titleAnimation = this.title.animation({
            duration: duration,
            repeat: -1,
            delay: .5,
            repeatDelay: .5,
            stopMethod: 'immediate',
            actions: [{
              p: 'x',
              v: {
                sm: 0,
                0: 20,
                .7: -pixels,
                .9: -pixels,
                1: 20
              }
            }]
          });
          this.title.text.wordWrapWidth = 360;
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: this.altLargeScale ? this.altLargeScale : 1.1,
            color: 0xffEEF1F2
          },
          Title: {
            smooth: {
              color: 0xff0D1314
            }
          },
          Time: {
            smooth: {
              alpha: 1
            }
          }
        });

        if (this.titleAnimation) {
          this.title.text.wordWrapWidth = null;
          this.titleAnimation.start();
        }
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            scale: this.altScale ? this.altScale : 1,
            color: 0xff0D1314
          },
          Title: {
            smooth: {
              color: 0xffEEF1F2
            }
          },
          Time: {
            smooth: {
              alpha: 0
            }
          }
        });

        if (this.titleAnimation) {
          this.title.text.wordWrapWidth = 360;
          this.titleAnimation.stop();
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 400,
          h: 325,
          rect: true,
          color: 0xff0D1314,
          zIndex: 1,
          clipping: true,
          Placeholder: {
            w: 400,
            h: 225,
            rect: true,
            color: 0xff484a4e,
            zIndex: 1,
            Logo: {
              zIndex: 1,
              src: AppDefinition.getPath('img/vimeo-logo.png'),
              x: 200,
              y: 112,
              mount: .5,
              scale: .4,
              alpha: .3
            }
          },
          Image: {
            w: 400,
            h: 225,
            zIndex: 2,
            alpha: 0.00001
          },
          Time: {
            mount: 1,
            x: 395,
            y: 220,
            zIndex: 3,
            color: 0xff0D1314,
            alpha: 0,
            Label: {
              x: 10,
              y: 5,
              color: 0xffEEF1F2,
              text: {
                fontSize: 18,
                fontFace: 'AkkuratPro'
              }
            }
          },
          Title: {
            zIndex: 2,
            x: 20,
            y: 240,
            color: 0xffEEF1F2,
            text: {
              fontSize: 28,
              lineHeight: 40,
              maxLines: 1,
              fontFace: 'AkkuratPro'
            }
          },
          User: {
            zIndex: 2,
            x: 20,
            y: 280,
            color: 0xffA3A4A5,
            text: {
              fontSize: 22,
              lineHeight: 26,
              wordWrapWidth: 360,
              maxLines: 1,
              fontFace: 'AkkuratPro'
            }
          }
        };
      }
    }, {
      key: "getSizes",
      value: function getSizes() {
        return {
          w: 400,
          h: 325,
          margin: 30,
          scrollOffset: 1550
        };
      }
    }]);

    return VimeoVideo;
  }(lng.Component);

  var VimeoUser =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(VimeoUser, _lng$Component5);

    function VimeoUser() {
      _classCallCheck(this, VimeoUser);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoUser).apply(this, arguments));
    }

    _createClass(VimeoUser, [{
      key: "_init",
      value: function _init() {
        this.targetScreen = 'User';
        this.label = this.tag('Label');
        this.patch({
          ".Image": {
            src: Utils.cropImage({
              url: this.item.getPicture({
                w: 288
              }).link,
              w: 250,
              h: 250
            })
          },
          Name: {
            Label: {
              text: {
                text: this.item.name
              }
            }
          }
        });
        this.label.loadTexture();

        if (this.label.renderWidth >= 240) {
          var pixels = this.label.renderWidth - 240;
          var duration = Math.max(pixels * 0.03, 1.8);
          this.labelAnimation = this.label.animation({
            duration: duration,
            repeat: -1,
            delay: .5,
            repeatDelay: .5,
            stopMethod: 'immediate',
            actions: [{
              p: 'x',
              v: {
                sm: 0,
                0: 15,
                .7: -pixels,
                .9: -pixels,
                1: 15
              }
            }]
          });
        } else {
          this.tag('Gradient').alpha = 0;
          this.label.patch({
            x: 125,
            mountX: .5
          });
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Shadow: {
            smooth: {
              alpha: 1,
              scale: 1.1
            }
          },
          PhotoHolder: {
            smooth: {
              scale: 1.1
            }
          },
          Name: {
            smooth: {
              color: 0xffEEF1F2
            },
            Label: {
              smooth: {
                color: 0xff0D1314
              }
            },
            Gradient: {
              alpha: 0
            }
          }
        });

        if (this.labelAnimation) {
          this.labelAnimation.start();
        }
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Shadow: {
            smooth: {
              alpha: 0,
              scale: 1
            }
          },
          PhotoHolder: {
            smooth: {
              scale: 1
            }
          },
          Name: {
            smooth: {
              color: 0xff0D1314
            },
            Label: {
              smooth: {
                color: 0xffEEF1F2
              }
            },
            Gradient: {
              alpha: this.labelAnimation ? 1 : 0
            }
          }
        });

        if (this.labelAnimation) {
          this.labelAnimation.stop();
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 250,
          h: 325,
          Shadow: {
            alpha: 0,
            pivotY: 0,
            mountX: .5,
            x: 125,
            zIndex: 1,
            color: 0x55000000,
            texture: lng.Tools.getShadowRect(250, 250, 125, 8, 6)
          },
          PhotoHolder: {
            pivotY: 0,
            mountX: .5,
            x: 125,
            h: 250,
            w: 250,
            renderToTexture: true,
            zIndex: 2,
            Photo: {
              w: 250,
              h: 250,
              texture: lng.Tools.getRoundRect(250, 250, 125, 0, 0, true, 0xffffffff),
              shader: {
                type: lng.shaders.RadialFilter,
                renderToTexture: true,
                radius: 125
              },
              Image: {
                w: 250,
                h: 250
              }
            }
          },
          Name: {
            y: 267,
            rect: true,
            w: 250,
            h: 60,
            zIndex: 3,
            color: 0xff0D1314,
            clipping: true,
            Label: {
              x: 15,
              y: 12,
              color: 0xffEEF1F2,
              width: 230,
              text: {
                fontSize: 28,
                fontFace: 'AkkuratPro',
                maxLines: 1
              }
            },
            Gradient: {
              x: 250,
              w: 30,
              h: 60,
              rect: true,
              mountX: 1,
              colorLeft: 0x000D1314,
              colorRight: 0xff0D1314
            }
          }
        };
      }
    }, {
      key: "getSizes",
      value: function getSizes() {
        return {
          w: 250,
          h: 325,
          margin: 60,
          scrollOffset: 1580
        };
      }
    }]);

    return VimeoUser;
  }(lng.Component);

  var VimeoChannel =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(VimeoChannel, _lng$Component6);

    function VimeoChannel() {
      _classCallCheck(this, VimeoChannel);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoChannel).apply(this, arguments));
    }

    _createClass(VimeoChannel, [{
      key: "_init",
      value: function _init() {
        this.targetScreen = 'Channel';
        this.label = this.tag('Label');
        this.patch({
          ".Image": {
            src: Utils.cropImage({
              url: this.item.getPicture({
                w: 288
              }).link,
              w: 250,
              h: 250
            })
          },
          Name: {
            Label: {
              text: {
                text: this.item.name
              }
            }
          }
        });
        this.label.loadTexture();

        if (this.label.renderWidth >= 240) {
          var pixels = this.label.renderWidth - 240;
          var duration = Math.max(pixels * 0.03, 1.8);
          this.labelAnimation = this.label.animation({
            duration: duration,
            repeat: -1,
            delay: .5,
            repeatDelay: .5,
            stopMethod: 'immediate',
            actions: [{
              p: 'x',
              v: {
                sm: 0,
                0: 15,
                .7: -pixels,
                .9: -pixels,
                1: 15
              }
            }]
          });
        } else {
          this.tag('Gradient').alpha = 0;
          this.label.patch({
            x: 125,
            mountX: .5
          });
        }
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          Shadow: {
            smooth: {
              alpha: 1,
              scale: 1.1
            }
          },
          PhotoHolder: {
            smooth: {
              scale: 1.1
            }
          },
          Name: {
            smooth: {
              color: 0xffEEF1F2
            },
            Label: {
              smooth: {
                color: 0xff0D1314
              }
            },
            Gradient: {
              alpha: 0
            }
          }
        });

        if (this.labelAnimation) {
          this.labelAnimation.start();
        }
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Shadow: {
            smooth: {
              alpha: 0,
              scale: 1
            }
          },
          PhotoHolder: {
            smooth: {
              scale: 1
            }
          },
          Name: {
            smooth: {
              color: 0xff0D1314
            },
            Label: {
              smooth: {
                color: 0xffEEF1F2
              }
            },
            Gradient: {
              alpha: this.labelAnimation ? 1 : 0
            }
          }
        });

        if (this.labelAnimation) {
          this.labelAnimation.stop();
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 250,
          h: 325,
          Shadow: {
            alpha: 0,
            pivotY: 0,
            mountX: .5,
            x: 125,
            zIndex: 1,
            color: 0x55000000,
            texture: lng.Tools.getShadowRect(250, 250, 125, 8, 6)
          },
          PhotoHolder: {
            pivotY: 0,
            mountX: .5,
            x: 125,
            h: 250,
            w: 250,
            renderToTexture: true,
            zIndex: 2,
            Photo: {
              w: 250,
              h: 250,
              texture: lng.Tools.getRoundRect(250, 250, 125, 0, 0, true, 0xffffffff),
              shader: {
                type: lng.shaders.RadialFilter,
                renderToTexture: true,
                radius: 125
              },
              Image: {
                w: 250,
                h: 250
              }
            }
          },
          Name: {
            y: 267,
            rect: true,
            w: 250,
            h: 60,
            zIndex: 3,
            color: 0xff0D1314,
            clipping: true,
            Label: {
              x: 15,
              y: 12,
              color: 0xffEEF1F2,
              width: 230,
              text: {
                fontSize: 28,
                fontFace: 'AkkuratPro',
                maxLines: 1
              }
            },
            Gradient: {
              x: 250,
              w: 30,
              h: 60,
              rect: true,
              mountX: 1,
              colorLeft: 0x000D1314,
              colorRight: 0xff0D1314
            }
          }
        };
      }
    }, {
      key: "getSizes",
      value: function getSizes() {
        return {
          w: 250,
          h: 325,
          margin: 60,
          scrollOffset: 1580
        };
      }
    }]);

    return VimeoChannel;
  }(lng.Component); // import Def from '../../AppDefinition.js'


  var VimeoSubCategory =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(VimeoSubCategory, _lng$Component7);

    function VimeoSubCategory() {
      _classCallCheck(this, VimeoSubCategory);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSubCategory).apply(this, arguments));
    }

    _createClass(VimeoSubCategory, [{
      key: "_init",
      value: function _init() {
        this.viewAll = 'videos';
        this.patch({
          // Header: {
          //     src: Def.getPath('img/' + this.bg)
          // },
          Name: {
            text: {
              text: this.item.name
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.1,
            color: 0xffeef1f2
          },
          Name: {
            smooth: {
              color: 0xff0D1314
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
            color: 0xff0D1314
          },
          Name: {
            smooth: {
              color: 0xffeef1f2
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 280,
          h: 155,
          rect: true,
          color: 0xff0D1314,
          zIndex: 1,
          // Header: {
          //     zIndex: 2,
          //     w: 280,
          //     h: 10,
          // },
          Name: {
            x: 140,
            y: 80,
            zIndex: 2,
            mount: .5,
            color: 0xffeef1f2,
            text: {
              fontSize: 28,
              wordWrapWidth: 260,
              maxLines: 2
            }
          }
        };
      }
    }, {
      key: "getSizes",
      value: function getSizes() {
        return {
          w: 280,
          h: 155,
          margin: 30,
          scrollOffset: 1550
        };
      }
    }]);

    return VimeoSubCategory;
  }(lng.Component);

  var VimeoList =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(VimeoList, _lng$Component8);

    function VimeoList() {
      _classCallCheck(this, VimeoList);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoList).apply(this, arguments));
    }

    _createClass(VimeoList, [{
      key: "_init",
      value: function _init() {
        var types = {
          videos: VimeoVideo,
          profiles: VimeoUser,
          channels: VimeoChannel,
          subcategories: VimeoSubCategory
        };
        this.listType = types[this.itemType];
        this.sizes = this.listType.getSizes();
        this.list = this.tag('List');
        this.loader = this.tag('Spinner');
        this.patch({
          Wrapper: {
            Title: {
              text: {
                text: this.title && this.title.toUpperCase() || ''
              }
            },
            List: {
              y: this.title ? 80 : 0
            }
          }
        });

        if (this.items) {
          this.dataLoaded(this.items);
        } else if (this.uri) {
          this.loadData();
        }
      }
    }, {
      key: "loadData",
      value: function loadData() {
        var _this12 = this;

        this._setState('Loading');

        this.fireAncestors('$getUriData', {
          uri: this.uri,
          type: this.itemType
        }).then(function (response) {
          return _this12.dataLoaded(response);
        });
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this.index < this.list.children.length - 1) {
          this.index++;
        }

        this.scrollList();
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.index > 0) {
          this.index--;
        } else {
          this.fireAncestors('$openMenu');
        }

        this.scrollList();
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var focused = this._getFocused();

        if (focused.targetScreen) {
          this.fireAncestors('$viewScreen', focused.targetScreen, focused.item);
        } else if (focused.viewAll) {
          this.fireAncestors('$viewAll', focused.item, focused.viewAll);
        } else {
          this.fireAncestors('$play', {
            items: this.items,
            item: focused.item
          });
        }
      }
    }, {
      key: "scrollList",
      value: function scrollList() {
        if (this.maxScroll <= 0) return;
        var offX = this._getFocused().x - (this.sizes.w + this.sizes.margin);
        this.list.setSmooth('x', -Math.min(Math.max(offX, 0), this.maxScroll));
      }
    }, {
      key: "dataLoaded",
      value: function dataLoaded(data) {
        var _this13 = this;

        var viewAll = data.total && data.total > data.per_page;
        var _this$sizes = this.sizes,
            w = _this$sizes.w,
            h = _this$sizes.h,
            margin = _this$sizes.margin,
            scrollOffset = _this$sizes.scrollOffset;
        this.items = this.items || data.items || [];
        this.index = 0;
        this.list.x = 0;
        this.list.children = this.items.map(function (item, index) {
          return {
            type: _this13.listType,
            item: item,
            index: index,
            action: data.action,
            x: index * (w + margin)
          };
        });

        if (viewAll) {
          this.list.add({
            w: w,
            h: h,
            type: VimeoViewAll,
            viewAll: this.itemType,
            item: {
              uri: this.uri,
              name: this.title
            },
            x: this.items.length * (w + margin),
            total: data.total
          });
        }

        this.maxScroll = (this.items.length + (viewAll ? 1 : 0)) * (w + margin) - scrollOffset;

        this._setState('');
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.list.children[this.index] || this;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Wrapper: {
            x: 100,
            Title: {
              color: 0xffa3a4a5,
              text: {
                fontFace: 'AkkuratPro',
                fontSize: 42
              }
            },
            List: {
              x: 0,
              y: 80
            },
            Spinner: {
              type: VimeoSpinner,
              x: 100,
              y: 100
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
              this.loader.show();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.loader.hide();
            }
          }]);

          return Loading;
        }(this)];
      }
    }]);

    return VimeoList;
  }(lng.Component);

  var VimeoCategory =
  /*#__PURE__*/
  function (_lng$Component9) {
    _inherits(VimeoCategory, _lng$Component9);

    function VimeoCategory() {
      _classCallCheck(this, VimeoCategory);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoCategory).apply(this, arguments));
    }

    _createClass(VimeoCategory, [{
      key: "_init",
      value: function _init() {
        this.patch({
          Image: {
            src: AppDefinition.getPath('img/' + this.item.bg)
          },
          Icon: {
            src: ux.Ui.getImageUrl(this.item.icon)
          },
          Name: {
            text: {
              text: this.item.name
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1.1,
            color: 0xffeef1f2
          },
          Name: {
            smooth: {
              color: 0xff0D1314
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
            color: 0xff0D1314
          },
          Name: {
            smooth: {
              color: 0xffeef1f2
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 280,
          h: 310,
          rect: true,
          color: 0xff0D1314,
          zIndex: 1,
          Image: {
            zIndex: 2,
            w: 280,
            h: 155
          },
          Icon: {
            mount: .5,
            color: 0xffffffff,
            x: 140,
            y: 77,
            zIndex: 3
          },
          Name: {
            x: 140,
            y: 232,
            zIndex: 2,
            mount: .5,
            color: 0xffeef1f2,
            text: {
              text: '',
              fontSize: 32,
              wordWrapWidth: 270
            }
          }
        };
      }
    }]);

    return VimeoCategory;
  }(lng.Component);

  var VimeoCategoriesGrid =
  /*#__PURE__*/
  function (_lng$Component10) {
    _inherits(VimeoCategoriesGrid, _lng$Component10);

    function VimeoCategoriesGrid() {
      _classCallCheck(this, VimeoCategoriesGrid);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoCategoriesGrid).apply(this, arguments));
    }

    _createClass(VimeoCategoriesGrid, [{
      key: "_init",
      value: function _init() {
        this.colIndex = 0;
        this.rowIndex = 0;
        this.list = this.tag('List');
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.colIndex > 0) {
          this.colIndex--;
        } else {
          this.fireAncestors('$openMenu');
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this.colIndex < this.list.children[this.rowIndex].children.length - 1) {
          this.colIndex++;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var item = this._getFocused().item;

        this.fireAncestors('$viewScreen', 'Category', item);
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this.rowIndex > 0) {
          this.rowIndex--;
          this.scrollScreen();
        } else {
          this.signal('staffPicks');
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this.rowIndex < this.list.children.length - 1) {
          this.rowIndex++;

          if (this.colIndex > this.list.children[this.rowIndex].children.length - 1) {
            this.colIndex = this.list.children[this.rowIndex].children.length - 1;
          }

          this.scrollScreen();
        }
      }
    }, {
      key: "scrollScreen",
      value: function scrollScreen() {
        var y = this.list.children[this.rowIndex].y;
        this.signal('scrollScreen', y);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.list.children.length && this.list.children[this.rowIndex].children[this.colIndex] || this;
      }
    }, {
      key: "items",
      set: function set(items) {
        var categories = [];
        this.list.children = items.map(function (item, index) {
          if (index % 5 === 0) categories = [];
          categories.push({
            type: VimeoCategory,
            x: index % 5 * 310,
            item: item
          });

          if (index % 5 === 4 || index === items.length - 1) {
            return {
              y: (index / 5 | 0) * 370,
              children: categories
            };
          }
        }).filter(function (element) {
          return !!element;
        });
        this.signal('doneBuilding', {
          target: 'Languages'
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 100,
          Title: {
            color: 0xffa3a4a5,
            text: {
              fontFace: 'AkkuratPro',
              fontSize: 42,
              text: 'CATEGORIES'
            }
          },
          List: {
            x: 0,
            y: 80
          }
        };
      }
    }]);

    return VimeoCategoriesGrid;
  }(lng.Component);

  var VimeoExplore =
  /*#__PURE__*/
  function (_lng$Component11) {
    _inherits(VimeoExplore, _lng$Component11);

    function VimeoExplore() {
      _classCallCheck(this, VimeoExplore);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoExplore).apply(this, arguments));
    }

    _createClass(VimeoExplore, [{
      key: "_init",
      value: function _init() {
        this.teaser = this.tag('Teaser');
        this.staffpicks = this.tag('StaffPicks');
        this.categories = this.tag('Categories');

        this._setState('Loading');
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag(this.state) || this;
      }
    }, {
      key: "scrollScreen",
      value: function scrollScreen(y) {
        this.setSmooth('y', y);
      }
    }, {
      key: "viewCategory",
      value: function viewCategory(args) {
        this.signal('viewCategory', args);
      }
    }, {
      key: "items",
      set: function set(sections) {
        var _this15 = this;

        sections.forEach(function (section) {
          if (section.name === 'StaffPicks') {
            _this15.teaser.items = section.items;

            _this15.staffpicks.fire('dataLoaded', section);
          } else if (section.name === 'Categories') {
            _this15.categories.items = section.items;
          }
        });

        this._setState('Teaser');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Teaser: {
            type: VimeoTeaser,
            signals: {
              loaded: '_teaserLoaded',
              error: '_teaserError',
              play: true
            }
          },
          StaffPicks: {
            type: VimeoList,
            title: 'staff picks',
            itemType: 'videos',
            y: 670,
            transitions: {
              alpha: {
                duration: .75,
                delay: .8
              },
              y: {
                duration: .75,
                delay: .8
              }
            }
          },
          Categories: {
            y: 1150,
            type: VimeoCategoriesGrid,
            signals: {
              scrollScreen: true,
              staffPicks: true,
              openMenu: true,
              viewCategory: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this16) {
          _inherits(Loading, _this16);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {}
          }, {
            key: "$exit",
            value: function $exit() {
              this.staffpicks.patch({
                alpha: 0,
                y: 750,
                smooth: {
                  y: 670,
                  alpha: 1
                }
              });
            }
          }, {
            key: "_teaserLoaded",
            value: function _teaserLoaded() {
              this._queue--;

              if (!this._queue) {
                this._loaded();
              }
            }
          }, {
            key: "_teaserError",
            value: function _teaserError() {
              var items = this.tag('StaffPicks').items;
              this.tag('Teaser').item = items[Math.floor(Math.random() * items.length)];
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this17) {
          _inherits(Teaser, _this17);

          function Teaser() {
            _classCallCheck(this, Teaser);

            return _possibleConstructorReturn(this, _getPrototypeOf(Teaser).apply(this, arguments));
          }

          _createClass(Teaser, [{
            key: "$enter",
            value: function $enter() {
              this.scrollScreen(0);
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('StaffPicks');
            }
          }, {
            key: "_handleLeft",
            value: function _handleLeft() {
              this.fireAncestors('$openMenu');
            }
          }]);

          return Teaser;
        }(this),
        /*#__PURE__*/
        function (_this18) {
          _inherits(StaffPicks, _this18);

          function StaffPicks() {
            _classCallCheck(this, StaffPicks);

            return _possibleConstructorReturn(this, _getPrototypeOf(StaffPicks).apply(this, arguments));
          }

          _createClass(StaffPicks, [{
            key: "$enter",
            value: function $enter() {
              this.scrollScreen(-440);
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              this._setState('Teaser');
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('Categories');
            }
          }]);

          return StaffPicks;
        }(this),
        /*#__PURE__*/
        function (_this19) {
          _inherits(Categories, _this19);

          function Categories() {
            _classCallCheck(this, Categories);

            return _possibleConstructorReturn(this, _getPrototypeOf(Categories).apply(this, arguments));
          }

          _createClass(Categories, [{
            key: "$enter",
            value: function $enter() {
              this.scrollScreen(0);
            }
          }, {
            key: "scrollScreen",
            value: function scrollScreen(y) {
              this.setSmooth('y', -(y + 890));
            }
          }, {
            key: "staffPicks",
            value: function staffPicks() {
              this._setState('StaffPicks');
            }
          }]);

          return Categories;
        }(this)];
      }
    }]);

    return VimeoExplore;
  }(lng.Component);

  var VimeoKeyboard =
  /*#__PURE__*/
  function (_lng$Component12) {
    _inherits(VimeoKeyboard, _lng$Component12);

    function VimeoKeyboard() {
      _classCallCheck(this, VimeoKeyboard);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoKeyboard).apply(this, arguments));
    }

    _createClass(VimeoKeyboard, [{
      key: "_init",
      value: function _init() {
        this.colIndex = 0;
        this.rowIndex = 0;
        this.keyboardEntry = '';
        this.layout = 'default';
        this.style = 'default';
        this.debug = false;
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this.rowIndex > 0) {
          this.rowIndex--;
          this.fixColIndex(1);
        } else {
          this.signal('outOfBounds', {
            direction: 'up'
          }, true);
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this.rowIndex < this.children.length - 1) {
          this.rowIndex++;
          this.fixColIndex(-1);
        } else {
          this.signal('outOfBounds', {
            direction: 'down'
          }, true);
        }
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.colIndex > 0) {
          this.colIndex--;
        } else {
          this.signal('outOfBounds', {
            direction: 'left'
          }, true);
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this.colIndex < this.children[this.rowIndex].children.length - 1) {
          this.colIndex++;
        } else {
          this.signal('outOfBounds', {
            direction: 'right'
          }, true);
        }
      }
    }, {
      key: "mount",
      value: function mount(_ref8) {
        var layout = _ref8.layout,
            _ref8$prevEntry = _ref8.prevEntry,
            prevEntry = _ref8$prevEntry === void 0 ? '' : _ref8$prevEntry;
        this.layout = layout;
        this.style = 'default';
        this.reset();
        this.build();

        if (prevEntry) {
          this.keyboardEntry = prevEntry;
        }
      }
    }, {
      key: "fixColIndex",
      value: function fixColIndex(diff) {
        var prevRow = this.children[this.rowIndex + diff];
        var currRow = this.children[this.rowIndex];
        var prevKey = prevRow.children[this.colIndex];
        this.colIndex = currRow.children.findIndex(function (key) {
          return currRow.x + key.x + key.w >= prevRow.x + prevKey.x + prevKey.w / 3;
        });

        if (this.colIndex === -1) {
          this.colIndex = this.children[this.rowIndex].children.length - 1;
        }
      }
    }, {
      key: "build",
      value: function build() {
        var _this20 = this;

        var layouts = {
          default: {
            default: [['1234567890'], ['qwertyuiop'], ['asdfghjkl.'], [{
              l: 'aA',
              a: 'caps'
            }, 'zxcvbnm_-'], [{
              l: '!#$',
              a: 'special',
              w: 150
            }, {
              l: ' ',
              a: 'space',
              w: 381
            }, {
              i: '',
              a: 'delete',
              w: 227
            }]],
            caps: [['1234567890'], ['QWERTYUIOP'], ['ASDFGHJKL.'], [{
              l: 'Aa',
              a: 'default'
            }, 'ZXCVBNM_-'], [{
              l: '!#$',
              a: 'special',
              w: 150
            }, {
              l: ' ',
              a: 'space',
              w: 381
            }, {
              i: '',
              a: 'delete',
              w: 227
            }]],
            special: [['!"#$%&\'()*'], ['+,-./:;<=>'], ['?@[\\]_₹{|}'], [{
              l: 'aA',
              a: 'default'
            }, '~€^æØø₤ȪȰ'], [{
              l: 'abc',
              a: 'default',
              w: 150
            }, {
              l: ' ',
              a: 'space',
              w: 381
            }, {
              i: '',
              a: 'delete',
              w: 227
            }]]
          },
          email: {
            default: [['1234567890'], ['qwertyuiop'], ['asdfghjkl.'], [{
              l: 'aA',
              a: 'caps'
            }, 'zxcvbnm_-'], [{
              l: '@hotmail.com',
              w: 253,
              h: 58,
              s: 28
            }, {
              l: '@gmail.com',
              w: 253,
              h: 58,
              s: 28
            }, {
              l: '@yahoo.com',
              w: 252,
              h: 58,
              s: 28
            }], [{
              l: '!#$',
              a: 'special',
              w: 150
            }, {
              l: '@',
              w: 150
            }, '.', {
              l: '.com',
              w: 150
            }, {
              i: '',
              a: 'delete',
              w: 227
            }]],
            caps: [['1234567890'], ['QWERTYUIOP'], ['ASDFGHJKL.'], [{
              l: 'Aa',
              a: 'default'
            }, 'ZXCVBNM_-'], [{
              l: '@hotmail.com',
              w: 253,
              h: 58,
              s: 28
            }, {
              l: '@gmail.com',
              w: 253,
              h: 58,
              s: 28
            }, {
              l: '@yahoo.com',
              w: 252,
              h: 58,
              s: 28
            }], [{
              l: '!#$',
              a: 'special',
              w: 150
            }, {
              l: '@',
              w: 150
            }, '.', {
              l: '.com',
              w: 150
            }, {
              i: '',
              a: 'delete',
              w: 227
            }]],
            special: [['!"#$%&\'()*'], ['+,-./:;<=>'], ['?@[\\]_₹{|}'], [{
              l: 'aA',
              a: 'default'
            }, '~€^æØø₤ȪȰ'], [{
              l: '@hotmail.com',
              w: 253,
              h: 58,
              s: 28
            }, {
              l: '@gmail.com',
              w: 253,
              h: 58,
              s: 28
            }, {
              l: '@yahoo.com',
              w: 252,
              h: 58,
              s: 28
            }], [{
              l: 'abc',
              a: 'default',
              w: 150
            }, {
              l: '@',
              w: 150
            }, '.', {
              l: '.com',
              w: 150
            }, {
              i: '',
              a: 'delete',
              w: 227
            }]]
          },
          search: {
            default: [['abcdefgh', {
              i: '',
              a: 'delete'
            }], ['ijklmnopq'], ['rstuvwxyz'], [{
              l: '12@$',
              a: 'special'
            }, {
              l: 'space',
              a: 'space',
              w: 1180
            }, {
              l: 'clear',
              a: 'clear'
            }]],
            special: [['123@#$%&+'], ['456()*:;-'], ['7890,./?!'], [{
              l: 'ABC',
              a: 'default'
            }, {
              l: 'space',
              a: 'space',
              w: 1180
            }, {
              l: 'clear',
              a: 'clear'
            }]]
          }
        };
        var keys = layouts[this.layout][this.style];
        var offsetY = 0;
        this.children = keys.map(function (row, rowIndex) {
          var keys = [];
          var offsetX = 0;
          row.map(function (key, keyIndex) {
            if (keyIndex === 0) {
              offsetY += typeof key === 'string' ? 70 : key.h + 10 || 70;
            }

            if (typeof key === 'string') {
              key.split('').map(function (k) {
                keys.push({
                  type: VimeoKeyboardKey,
                  x: offsetX,
                  key: k,
                  signals: {
                    keyPress: true
                  }
                });
                offsetX += 170;
              });
            } else {
              keys.push({
                type: VimeoKeyboardKey,
                key: key,
                x: offsetX,
                signals: {
                  keyPress: true
                }
              });
              offsetX += key.w && key.w + 10 || 170;
            }
          });
          return {
            x: _this20.centerLayout ? -offsetX / 2 : 0,
            y: offsetY - (row[0].h && row[0].h + 10 || 70),
            children: keys
          };
        });

        if (this.debug) {
          console.log("layout: ".concat(this.layout, " style: ").concat(this.style, " keys: \n"), this.children.map(function (row) {
            return row.children.map(function (key) {
              return key.key;
            });
          }));
        }
      }
    }, {
      key: "keyPress",
      value: function keyPress(_ref9) {
        var key = _ref9.key;
        this.handleKey(key);
      }
    }, {
      key: "handleKey",
      value: function handleKey(key) {
        var changed = true;
        if (key.r) this.rowIndex = key.r;

        if (!key.a) {
          this.keyboardEntry += key.l || key;
        } else {
          var action = key.a;

          if (action === 'delete') {
            this.keyboardEntry = this.keyboardEntry.substr(0, this.keyboardEntry.length - 1);
          } else if (action === 'space') {
            this.keyboardEntry = this.keyboardEntry += ' ';
          } else if (action === 'clear') {
            this.keyboardEntry = '';
          } else {
            this.style = key.a;
            changed = false;
            this.build();
          }
        }

        if (changed) {
          this.signal('keyboardUpdated', this.keyboardEntry);
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.keyboardEntry = '';
        this.rowIndex = 0;
        this.colIndex = 0;
      }
    }, {
      key: "unmount",
      value: function unmount() {
        this.children = [];
        this.reset();
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.children.length && this.children[this.rowIndex].children[this.colIndex] || this;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {};
      }
    }]);

    return VimeoKeyboard;
  }(lng.Component);

  var VimeoKeyboardKey =
  /*#__PURE__*/
  function (_lng$Component13) {
    _inherits(VimeoKeyboardKey, _lng$Component13);

    function VimeoKeyboardKey() {
      _classCallCheck(this, VimeoKeyboardKey);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoKeyboardKey).apply(this, arguments));
    }

    _createClass(VimeoKeyboardKey, [{
      key: "_init",
      value: function _init() {
        var key = this.key.i || this.key.l || this.key;
        var width = this.key.w || 160;
        var height = this.key.h || 60;
        var fontface = this.key.i ? 'Font-Awesome' : 'AkkuratPro';
        this.patch({
          w: width,
          h: height,
          texture: lng.Tools.getRoundRect(width, height, 5, 0, 0, true, 0xffffffff),
          color: 0xff0D1314,
          Label: {
            y: this.key.i ? 10 : 7,
            x: width / 2 | 0,
            // smooth: { y: this.key.i ? 10 : 7 },
            color: 0xfff1f1f1,
            text: {
              fontFace: fontface,
              text: key,
              fontSize: this.key.s || 34
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          color: 0xfff1f1f1,
          Label: {
            color: 0xff0D1314
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          color: 0xff0D1314,
          Label: {
            color: 0xfff1f1f1
          }
        });
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal('keyPress', {
          key: this.key
        }, true);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          color: 0xff2e3036,
          Label: {
            color: 0xffabafb9,
            mountX: 0.5,
            text: {
              fontFace: 'Lato',
              fontSize: 38
            }
          }
        };
      }
    }]);

    return VimeoKeyboardKey;
  }(lng.Component);

  var VimeoSearchInput =
  /*#__PURE__*/
  function (_lng$Component14) {
    _inherits(VimeoSearchInput, _lng$Component14);

    function VimeoSearchInput() {
      _classCallCheck(this, VimeoSearchInput);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSearchInput).apply(this, arguments));
    }

    _createClass(VimeoSearchInput, [{
      key: "_init",
      value: function _init() {
        this.tag('Label').patch({
          text: {
            text: this.placeholder
          }
        });
      }
    }, {
      key: "updateEntry",
      value: function updateEntry() {
        var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.patch({
          Label: {
            color: entry ? 0xffEEF1F2 : 0xffA3A4A5,
            text: {
              text: entry ? entry : this.placeholder
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Label: {
            y: -5,
            color: 0xffA3A4A5,
            text: {
              fontFace: 'AkkuratPro',
              fontSize: 42
            }
          },
          BorderBottom: {
            y: 52,
            rect: true,
            w: 1520,
            h: 3,
            color: 0xff484A4E
          }
        };
      }
    }]);

    return VimeoSearchInput;
  }(lng.Component);

  var VimeoSearchTabs =
  /*#__PURE__*/
  function (_lng$Component15) {
    _inherits(VimeoSearchTabs, _lng$Component15);

    function VimeoSearchTabs() {
      _classCallCheck(this, VimeoSearchTabs);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSearchTabs).apply(this, arguments));
    }

    _createClass(VimeoSearchTabs, [{
      key: "_init",
      value: function _init() {
        var _this21 = this;

        this.index = 0;
        this.selected = 0;
        this.children = ['videos', 'channels', 'people'].map(function (labelText, index) {
          return {
            type: VimeoSearchTab,
            x: index * 510,
            selected: index === _this21.selected,
            labelText: labelText
          };
        });
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.index > 0) {
          this.index--;
        } else {
          this.fireAncestors('$openMenu');
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this.index < this.children.length - 1) {
          this.index++;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        if (this.selected === this.index) return;
        this.children[this.selected].fire('unselect');
        this.selected = this.index;
        this.children[this.index].fire('select');
        this.signal('tabSelected', this.children[this.selected].labelText);
      }
    }, {
      key: "reset",
      value: function reset() {
        this.index = 0;
        if (this.selected === 0) return;
        this.children[this.selected].fire('unselect');
        this.selected = 0;
        this.children[0].fire('select', true);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.children[this.index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {};
      }
    }]);

    return VimeoSearchTabs;
  }(lng.Component);

  var VimeoSearchTab =
  /*#__PURE__*/
  function (_lng$Component16) {
    _inherits(VimeoSearchTab, _lng$Component16);

    function VimeoSearchTab() {
      _classCallCheck(this, VimeoSearchTab);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSearchTab).apply(this, arguments));
    }

    _createClass(VimeoSearchTab, [{
      key: "_init",
      value: function _init() {
        this.patch({
          Label: {
            text: {
              text: this.labelText.toUpperCase()
            }
          }
        });

        if (this.selected) {
          this.patch({
            smooth: {
              color: 0xff37434A
            },
            Label: {
              color: 0xffEEF1F2
            }
          });
        }
      }
    }, {
      key: "select",
      value: function select() {
        var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.selected = true;

        if (reset) {
          this.patch({
            color: 0xff37434A,
            Label: {
              color: 0xffEEF1F2
            }
          });
        }
      }
    }, {
      key: "unselect",
      value: function unselect() {
        this.selected = false;
        this.patch({
          smooth: {
            color: 0xff0D1314
          },
          Label: {
            color: 0xfff1f1f1
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            color: 0xffEEF1F2
          },
          Label: {
            color: 0xff0D1314
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            color: this.selected ? 0xff37434A : 0xff0D1314
          },
          Label: {
            color: this.selected ? 0xffEEF1F2 : 0xfff1f1f1
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          texture: lng.Tools.getRoundRect(500, 60, 5, 0, 0, true, 0xffffffff),
          color: 0xff0D1314,
          Label: {
            x: 250,
            y: 12,
            mountX: .5,
            color: 0xfff1f1f1,
            text: {
              fontFace: 'AkkuratPro',
              fontSize: 28
            }
          }
        };
      }
    }]);

    return VimeoSearchTab;
  }(lng.Component);

  var VimeoSearch =
  /*#__PURE__*/
  function (_lng$Component17) {
    _inherits(VimeoSearch, _lng$Component17);

    function VimeoSearch() {
      _classCallCheck(this, VimeoSearch);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSearch).apply(this, arguments));
    }

    _createClass(VimeoSearch, [{
      key: "_init",
      value: function _init() {
        this.input = this.tag('Input');
        this.results = this.tag('Results');
        this.noresults = this.tag('NoResults');
        this.tabs = this.tag('Tabs');
        this.keyboard = this.tag('Keyboard');
        this.spinner = this.tag('Spinner');
        this.hasResults = false;
        this.searchType = 'videos';
        this.navHistory = [];

        this._setState('Keyboard');
      }
    }, {
      key: "outOfBounds",
      value: function outOfBounds(_ref10) {
        var direction = _ref10.direction;

        if (direction === 'left') {
          this.fireAncestors('$openMenu');
        }

        if (direction === 'up') {
          this._setState('Tabs');
        }
      }
    }, {
      key: "mountKeyboard",
      value: function mountKeyboard(options) {
        this.keyboard.fire('mount', options);
      }
    }, {
      key: "unmountKeyboard",
      value: function unmountKeyboard() {
        this.keyboard.fire('unmount');
      }
    }, {
      key: "tabSelected",
      value: function tabSelected(type) {
        this.searchType = type;
        this.keyboardUpdated(this.inputEntry);
      }
    }, {
      key: "reset",
      value: function reset() {
        this.inputEntry = '';
        this.searchType = 'videos';
        this.results.children = [];
        this.noresults.alpha = 0;
        this.spinner.alpha = 0;
        this.hasResults = false;
        this.input.fire('updateEntry', '');
        this.tabs.fire('reset');
        this.unmountKeyboard();

        this._setState('Keyboard');
      }
    }, {
      key: "keyboardUpdated",
      value: function keyboardUpdated() {
        var _this22 = this;

        var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.inputEntry = entry;
        this.input.fire('updateEntry', entry);
        this.hasResults = false;
        this.results.alpha = 0;
        this.results.children = [];
        this.noresults.alpha = 0;

        if (entry && entry.trim().length >= 1) {
          this.spinner.show();
          this.fireAncestors('$searchTerm', entry, this.searchType).then(function (results) {
            return _this22.handleSearchResults(results);
          });
        }
      }
    }, {
      key: "handleSearchResults",
      value: function handleSearchResults(_ref11) {
        var type = _ref11.type,
            items = _ref11.items,
            query = _ref11.query;

        if (type !== this.searchType || query !== this.inputEntry) {
          return;
        }

        this.spinner.hide();
        this.hasResults = !!items.length;

        if (items.length) {
          this.results.add({
            type: VimeoList,
            itemType: type === 'people' ? 'profiles' : type,
            items: items
          });
          this.results.setSmooth('alpha', 1);
        } else {
          this.results.alpha = 0;
          this.noresults.patch({
            alpha: 0.00001,
            Keyword: {
              text: {
                text: query
              }
            }
          });
          this.tag('Keyword').loadTexture();
          this.noresults.patch({
            w: 235 + this.tag('Keyword').renderWidth,
            smooth: {
              alpha: 1
            }
          });
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Header: {
            w: 1770,
            h: 136,
            color: 0x770d1314,
            rect: true,
            Shadow: {
              w: 1770,
              h: 20,
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0x55000000,
              y: 136,
              mountY: 1,
              zIndex: 2
            },
            Title: {
              x: 1620,
              y: 136,
              mount: 1,
              zIndex: 3,
              text: {
                fontSize: 64,
                fontFace: 'AkkuratPro',
                textAlign: 'right',
                color: 0xffeef1f2,
                text: 'Search'
              }
            }
          },
          Wrapper: {
            y: 210,
            Input: {
              x: 100,
              type: VimeoSearchInput,
              placeholder: 'Enter your search'
            },
            NoResults: {
              x: 860,
              y: 220,
              mount: .5,
              alpha: 0,
              NoResultsFor: {
                color: 0xff484a4e,
                text: {
                  fontSize: 36,
                  fontFace: 'AkkuratPro',
                  text: 'No results for'
                }
              },
              Keyword: {
                x: 230,
                color: 0xfff1f1f1,
                text: {
                  fontSize: 36,
                  fontFace: 'AkkuratPro'
                }
              }
            },
            Results: {
              alpha: 0,
              y: 80,
              transitions: {
                alpha: {
                  duration: .75,
                  delay: .1
                }
              }
            },
            Spinner: {
              x: 860,
              y: 220,
              type: VimeoSpinner
            },
            Tabs: {
              x: 100,
              y: 450,
              type: VimeoSearchTabs,
              signals: {
                tabSelected: true,
                openMenu: true
              }
            },
            Keyboard: {
              x: 100,
              y: 540,
              type: VimeoKeyboard,
              signals: {
                keyboardUpdated: true,
                outOfBounds: true
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
        function (_this23) {
          _inherits(Tabs, _this23);

          function Tabs() {
            _classCallCheck(this, Tabs);

            return _possibleConstructorReturn(this, _getPrototypeOf(Tabs).apply(this, arguments));
          }

          _createClass(Tabs, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.tabs;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this.hasResults) {
                this._setState('Results');
              }
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('Keyboard');
            }
          }]);

          return Tabs;
        }(this),
        /*#__PURE__*/
        function (_this24) {
          _inherits(Results, _this24);

          function Results() {
            _classCallCheck(this, Results);

            return _possibleConstructorReturn(this, _getPrototypeOf(Results).apply(this, arguments));
          }

          _createClass(Results, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.results.children[0];
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('Tabs');
            }
          }]);

          return Results;
        }(this),
        /*#__PURE__*/
        function (_this25) {
          _inherits(Keyboard, _this25);

          function Keyboard() {
            _classCallCheck(this, Keyboard);

            return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard).apply(this, arguments));
          }

          _createClass(Keyboard, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.keyboard;
            }
          }]);

          return Keyboard;
        }(this)];
      }
    }]);

    return VimeoSearch;
  }(lng.Component);

  var VimeoBackButton =
  /*#__PURE__*/
  function (_lng$Component18) {
    _inherits(VimeoBackButton, _lng$Component18);

    function VimeoBackButton() {
      _classCallCheck(this, VimeoBackButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoBackButton).apply(this, arguments));
    }

    _createClass(VimeoBackButton, [{
      key: "_focus",
      value: function _focus() {
        this.patch({
          smooth: {
            scale: 1,
            color: 0xFFEEF1F2
          },
          Label: {
            smooth: {
              color: 0xff0D1314
            }
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          smooth: {
            scale: .8,
            color: 0xff0D1314
          },
          Label: {
            smooth: {
              color: 0xFFEEF1F2
            }
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 80,
          y: 50,
          color: 0xff0D1314,
          scale: .8,
          zIndex: 3,
          texture: lng.Tools.getRoundRect(138, 60, 6, 0, 0, true, 0xffffffff),
          Label: {
            mount: .5,
            x: 69,
            y: 34,
            color: 0xFFEEF1F2,
            text: {
              fontSize: 26,
              fontFace: 'AkkuratPro',
              text: 'BACK'
            }
          }
        };
      }
    }]);

    return VimeoBackButton;
  }(lng.Component);

  var VimeoLogin =
  /*#__PURE__*/
  function (_lng$Component19) {
    _inherits(VimeoLogin, _lng$Component19);

    function VimeoLogin() {
      _classCallCheck(this, VimeoLogin);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoLogin).apply(this, arguments));
    }

    _createClass(VimeoLogin, [{
      key: "_init",
      value: function _init() {
        this.spinner = this.tag('Spinner');
        this.code = this.tag('Code');

        this._setState('Loading');
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('Back');
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal('backButton');
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        this.fireAncestors('$openMenu');
      }
    }, {
      key: "reset",
      value: function reset() {
        this._setState('Loading');
      }
    }, {
      key: "dataLoaded",
      value: function dataLoaded(data) {
        this.code.patch({
          text: {
            text: 'link: ' + data.activate_link + '\ncode: ' + data.user_code
          }
        });

        this._setState('Pooling');
      }
    }, {
      key: "userAuthenticated",
      value: function userAuthenticated(user) {
        this.code.patch({
          text: {
            text: 'welcome ' + user.name + '! 🎉👍\n\n //show some stuff, change screen, call mom, etc...\n//btw, emojis work on Lightning 🙃'
          }
        });
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Header: {
            w: 1770,
            h: 136,
            color: 0x770d1314,
            rect: true,
            Shadow: {
              w: 1770,
              h: 20,
              rect: true,
              colorTop: 0x00000000,
              colorBottom: 0x55000000,
              y: 136,
              mountY: 1,
              zIndex: 2
            },
            Title: {
              x: 1620,
              y: 136,
              mount: 1,
              zIndex: 3,
              text: {
                fontSize: 64,
                fontFace: 'AkkuratPro',
                textAlign: 'right',
                color: 0xffeef1f2,
                text: 'Login'
              }
            }
          },
          Code: {
            alpha: 0,
            x: 200,
            y: 200,
            text: {
              fontSize: 64,
              fontFace: 'AkkuratPro',
              color: 0xffeef1f2,
              text: 'Code'
            }
          },
          Spinner: {
            alpha: 0,
            x: 860,
            y: 470,
            type: VimeoSpinner
          },
          Back: {
            type: VimeoBackButton,
            signals: {
              backButton: true
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
          _inherits(Loading, _this26);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.spinner.fire('show');
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.spinner.fire('hide');
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this27) {
          _inherits(Pooling, _this27);

          function Pooling() {
            _classCallCheck(this, Pooling);

            return _possibleConstructorReturn(this, _getPrototypeOf(Pooling).apply(this, arguments));
          }

          _createClass(Pooling, [{
            key: "$enter",
            value: function $enter() {
              this.code.setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.code.alpha = 0;
            }
          }]);

          return Pooling;
        }(this)];
      }
    }]);

    return VimeoLogin;
  }(lng.Component);

  var VimeoMenuItem =
  /*#__PURE__*/
  function (_lng$Component20) {
    _inherits(VimeoMenuItem, _lng$Component20);

    function VimeoMenuItem() {
      _classCallCheck(this, VimeoMenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoMenuItem).apply(this, arguments));
    }

    _createClass(VimeoMenuItem, [{
      key: "_toggle",
      value: function _toggle(t) {
        this.patch({
          transitions: {
            y: {
              duration: 0.6,
              delay: (t ? this._delayIndex : this._listindex) * 0.1 + 0.05
            }
          },
          smooth: {
            y: t ? this._listindex * 90 + 63 : this._listindex * 70
          },
          Icon: {
            transitions: {
              scale: {
                duration: 0.1,
                delay: (t ? this._delayIndex : this._listindex) * 0.1 + 0.05
              }
            },
            smooth: {
              scale: t ? 1 : 0.73
            }
          },
          Label: {
            transitions: {
              alpha: {
                duration: 0.2,
                delay: (t ? this._delayIndex : this._listindex) * 0.1 + 0.05
              }
            },
            smooth: {
              alpha: t ? 1 : 0
            }
          }
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this.patch({
          Icon: {
            src: AppDefinition.getPath("img/".concat(this.label.toLowerCase(), ".png")),
            scale: 0.73
          },
          Label: {
            text: this.label.toUpperCase()
          }
        });

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
      key: "listindex",
      set: function set(v) {
        this._listindex = v[0];
        this._delayIndex = v[1];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          zIndex: 3,
          Icon: {
            mount: .5,
            x: 50,
            y: 40,
            zIndex: 2,
            color: 0xfff1f1f1,
            pivot: 0
          },
          Label: {
            zIndex: 2,
            x: 108,
            color: 0xfff1f1f1,
            y: 23,
            alpha: 0,
            text: {
              fontSize: 32,
              fontFace: 'AkkuratPro'
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this28) {
          _inherits(Expanded, _this28);

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
          }]);

          return Expanded;
        }(this),
        /*#__PURE__*/
        function (_this29) {
          _inherits(Collapsed, _this29);

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
  function (_lng$Component21) {
    _inherits(VimeoMenu, _lng$Component21);

    function VimeoMenu() {
      _classCallCheck(this, VimeoMenu);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoMenu).apply(this, arguments));
    }

    _createClass(VimeoMenu, [{
      key: "_init",
      value: function _init() {
        var _this30 = this;

        this.tag('Items').children = ['Search', 'Feed', 'Explore', 'Library', 'Profile'].map(function (label, idx, arr) {
          if (label === 'Explore') {
            _this30.focusIdx = idx;
            _this30.activeIdx = idx;
          }

          return {
            type: VimeoMenuItem,
            label: label,
            y: idx * 90,
            listindex: [idx, arr.length - idx]
          };
        });
        this.tag('FocusIndicator').transition('x').on('finish', function () {
          if (_this30.tag('FocusIndicator').x === 70) {
            _this30._setState('Expanded');
          }
        });
        this.tag('Wrapper').transition('w').on('finish', function () {
          if (_this30.tag('Wrapper').w === 150) {
            _this30._setState('Collapsed');
          }
        });
        this.tag('SelectedIndicator').y = this.activeIdx * 70 + 80;

        this._setState('Collapsed');
      }
    }, {
      key: "open",
      value: function open() {
        this.toggle(true);

        this._setState('Expanding');
      }
    }, {
      key: "close",
      value: function close() {
        this.toggle(false);

        this._setState('Collapsing');
      }
    }, {
      key: "toggle",
      value: function toggle(t) {
        this.signal('toggleOverlay', t);
        this.patch({
          Shadow: {
            transitions: {
              w: {
                duration: 0.5,
                delay: t ? 0 : 0.5
              }
            },
            smooth: {
              w: t ? 1100 : 200
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
                }
              },
              smooth: {
                x: t ? 490 : 150
              }
            },
            FocusIndicator: {
              zIndex: 2,
              smooth: {
                x: t ? [70, {
                  duration: 0.2,
                  delay: 0.6
                }] : [120, {
                  duration: 0.2
                }],
                alpha: t ? [1, {
                  duration: 0.2,
                  delay: 0.6
                }] : [0, {
                  duration: 0.2
                }],
                y: (t ? this.activeIdx : this.focusIdx) * 90 + 140
              }
            },
            SelectedIndicator: {
              y: t ? this.activeIdx * 90 + 140 : this.activeIdx * 70 + 80,
              Expanded: {
                transitions: {
                  alpha: {
                    duration: t ? .2 : 0,
                    delay: t ? 0.6 : 0
                  }
                },
                smooth: {
                  alpha: t ? 1 : 0
                }
              },
              Collapsed: {
                transitions: {
                  alpha: {
                    duration: t ? 0 : .2,
                    delay: t ? 0 : 0.9
                  }
                },
                smooth: {
                  alpha: t ? 0 : 1
                }
              }
            },
            Items: {
              smooth: {
                x: t ? [70, {
                  duration: 0.4,
                  delay: 0.2
                }] : [57, {
                  duration: 0.5,
                  delay: 0.6
                }]
              }
            }
          }
        });
        this.list.forEach(function (item) {
          return item.fire(t ? 'expand' : 'collapse');
        });
      }
    }, {
      key: "repositionFocus",
      value: function repositionFocus() {
        this.tag('FocusIndicator').setSmooth('y', this._getFocused().y + 77);
        this.tag('Expanded').alpha = +(this.focusIdx !== this.activeIdx);
      }
    }, {
      key: "reveal",
      value: function reveal() {
        this.setSmooth('x', 0);
      }
    }, {
      key: "changeSelection",
      value: function changeSelection(selection) {
        this.activeIdx = this.list.findIndex(function (o) {
          return o.label === selection;
        });
        this.tag('SelectedIndicator').setSmooth('y', this.activeIdx * 70 + 80);
      }
    }, {
      key: "_handleBack",
      value: function _handleBack() {
        this.close();
      }
    }, {
      key: "list",
      get: function get() {
        return this.tag('Items').childList.get();
      }
    }, {
      key: "active",
      get: function get() {
        return this.list[this.focusIdx];
      }
    }, {
      key: "previousActive",
      get: function get() {
        return this.list[this.activeIdx];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 1,
          x: -150,
          zIndex: 5,
          transitions: {
            x: {
              duration: 0.6,
              delay: 0
            }
          },
          Shadow: {
            w: 200,
            h: 1080,
            rect: true,
            colorLeft: 0xff000000,
            colorRight: 0x00000000
          },
          Wrapper: {
            w: 150,
            h: 1080,
            color: 0xff37434a,
            rect: true,
            Gradient: {
              x: 150,
              src: AppDefinition.getPath('img/vimeo-line.png')
            },
            FocusIndicator: {
              alpha: 0,
              x: 110,
              y: 120,
              zIndex: 2,
              transitions: {
                x: {
                  duration: 0.7,
                  delay: 0.8
                }
              },
              Shadow: {
                color: 0xff000000,
                alpha: 0.5,
                texture: lng.Tools.getShadowRect(440, 80, 7, 4, 5)
              },
              Focus: {
                alpha: 1,
                texture: lng.Tools.getRoundRect(440, 80, 7, 0, 0, true, 0xfff1f1f1)
              }
            },
            SelectedIndicator: {
              Expanded: {
                x: 69,
                alpha: 0,
                texture: lng.Tools.getRoundRect(420, 80, [7, 0, 0, 7], 0, 0x00000000, true, 0xff282E32)
              },
              Collapsed: {
                x: 70,
                texture: lng.Tools.getRoundRect(60, 60, 30, 0, 0x00000000, true, 0xff282E32)
              }
            },
            Items: {
              x: 57,
              y: 77
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this31) {
          _inherits(Expanded, _this31);

          function Expanded() {
            _classCallCheck(this, Expanded);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expanded).apply(this, arguments));
          }

          _createClass(Expanded, [{
            key: "$enter",
            value: function $enter() {
              this.focusIdx = this.activeIdx || 0;
            }
          }, {
            key: "_handleUp",
            value: function _handleUp() {
              if (this.focusIdx === 0) {
                this.focusIdx = this.list.length - 1;
              } else {
                this.focusIdx--;
              }

              this.repositionFocus();
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              if (this.focusIdx === this.list.length - 1) {
                this.focusIdx = 0;
              } else {
                this.focusIdx++;
              }

              this.repositionFocus();
            }
          }, {
            key: "_handleEnter",
            value: function _handleEnter() {
              this.activeIdx = this.focusIdx;
              this.signal('optionSelect', this.active.label);
            }
          }, {
            key: "_handleRight",
            value: function _handleRight() {
              this.close();
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
        function (_this32) {
          _inherits(Expanding, _this32);

          function Expanding() {
            _classCallCheck(this, Expanding);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expanding).apply(this, arguments));
          }

          _createClass(Expanding, [{
            key: "_captureKey",
            value: function _captureKey(_ref12) {
              var keyCode = _ref12.keyCode;

              if (keyCode === 39 || keyCode === 8) {
                this.close();
              }
            }
          }]);

          return Expanding;
        }(this),
        /*#__PURE__*/
        function (_this33) {
          _inherits(Collapsing, _this33);

          function Collapsing() {
            _classCallCheck(this, Collapsing);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapsing).apply(this, arguments));
          }

          _createClass(Collapsing, [{
            key: "_captureKey",
            value: function _captureKey(_ref13) {
              var keyCode = _ref13.keyCode;

              if (keyCode === 37) {
                this.open();
              }
            }
          }]);

          return Collapsing;
        }(this),
        /*#__PURE__*/
        function (_this34) {
          _inherits(Collapsed, _this34);

          function Collapsed() {
            _classCallCheck(this, Collapsed);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapsed).apply(this, arguments));
          }

          _createClass(Collapsed, [{
            key: "$enter",
            value: function $enter() {
              this.signal('menuClosed');
            }
          }]);

          return Collapsed;
        }(this)];
      }
    }]);

    return VimeoMenu;
  }(lng.Component);

  var VimeoHeader =
  /*#__PURE__*/
  function (_lng$Component22) {
    _inherits(VimeoHeader, _lng$Component22);

    function VimeoHeader() {
      _classCallCheck(this, VimeoHeader);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoHeader).apply(this, arguments));
    }

    _createClass(VimeoHeader, [{
      key: "update",
      value: function update(data) {
        this.patch({
          Wrapper: {
            Background: {
              alpha: data.bg ? 1 : 0,
              src: data.bg ? AppDefinition.getPath('img/' + data.bg) : null
            }
          },
          Title: {
            x: data.photo ? 1540 : 1620,
            y: data.subtitle ? 40 : 36,
            text: {
              fontSize: data.subtitle ? 42 : 64,
              text: data.title
            }
          },
          SubTitle: {
            x: data.photo ? 1540 : 1620,
            alpha: data.subtitle ? 1 : 0,
            text: {
              text: data.subtitle || ''
            }
          },
          PhotoHolder: {
            alpha: data.photo ? 1 : 0,
            Photo: {
              Image: {
                src: data.photo ? data.photo : null
              }
            }
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.tag('Back');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1770,
          h: 136,
          Wrapper: {
            w: 1770,
            h: 136,
            rect: true,
            color: 0xff1a2021,
            clipping: true,
            Background: {
              scale: 2,
              mount: .5,
              x: 885,
              y: 88,
              zIndex: 1,
              color: lng.StageUtils.mergeColors(0xff131920, 0xffffffff, 0.3)
            }
          },
          Shadow: {
            w: 1770,
            h: 20,
            rect: true,
            colorTop: 0x00000000,
            colorBottom: 0x55000000,
            y: 136,
            mountY: 1,
            zIndex: 2
          },
          PhotoHolder: {
            x: 1570,
            y: 30,
            h: 150,
            w: 150,
            renderToTexture: true,
            zIndex: 2,
            Photo: {
              w: 150,
              h: 150,
              texture: lng.Tools.getRoundRect(150, 150, 75, 0, 0, true, 0xffffffff),
              shader: {
                type: lng.shaders.RadialFilter,
                renderToTexture: true,
                radius: 75
              },
              Image: {
                w: 150,
                h: 150
              }
            }
          },
          Title: {
            x: 1540,
            y: 40,
            mountX: 1,
            zIndex: 3,
            color: 0xffeef1f2,
            text: {
              fontSize: 42,
              fontFace: 'AkkuratPro',
              textAlign: 'right',
              fontStyle: 'bold'
            }
          },
          SubTitle: {
            x: 1540,
            y: 93,
            color: 0xffA3A4A5,
            mountX: 1,
            zIndex: 2,
            text: {
              fontSize: 22,
              textAlign: 'right',
              fontFace: 'AkkuratPro'
            }
          },
          Back: {
            type: VimeoBackButton,
            signals: {
              backButton: true
            }
          }
        };
      }
    }]);

    return VimeoHeader;
  }(lng.Component);

  var VimeoGrid =
  /*#__PURE__*/
  function (_lng$Component23) {
    _inherits(VimeoGrid, _lng$Component23);

    function VimeoGrid() {
      _classCallCheck(this, VimeoGrid);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoGrid).apply(this, arguments));
    }

    _createClass(VimeoGrid, [{
      key: "_init",
      value: function _init() {
        var types = {
          videos: VimeoVideo,
          profiles: VimeoUser,
          category: VimeoCategory
        };
        this.gridType = types[this.itemType];
        this.sizes = this.gridType.getSizes();
        this.colIndex = 0;
        this.rowIndex = 0;
        this.items = [];
        this.page = 1;
        this.list = this.tag('List');
        this.spinner = this.tag('Spinner');

        if (this.title) {
          this.patch({
            Title: {
              Main: {
                alpha: this.title ? 0.0001 : 1,
                text: {
                  text: this.title.toUpperCase()
                }
              },
              Arrow: {
                alpha: 0
              },
              Sub: {
                text: {
                  text: (this.subtitle || '').toUpperCase()
                },
                alpha: 0
              }
            },
            List: {
              y: 56
            }
          });

          if (this.subtitle) {
            this.tag('Main').loadTexture();
            this.patch({
              Title: {
                Main: {
                  alpha: 1
                },
                Arrow: {
                  alpha: 1,
                  x: this.tag('Main').renderWidth + 20
                },
                Sub: {
                  alpha: 1,
                  x: this.tag('Main').renderWidth + 50
                }
              }
            });
          }
        } else {
          this.patch({
            Title: {
              alpha: 0
            },
            List: {
              y: 0
            }
          });
        }

        this.loadData();
      }
    }, {
      key: "reset",
      value: function reset() {
        this.colIndex = 0;
        this.rowIndex = 0;
        this.page = 1;
        this.next = 1;
        this.items = [];
        this.list.children = [];
        this.spinner.y = 370;
      }
    }, {
      key: "loadData",
      value: function loadData() {
        var _this35 = this;

        if (!this.uri) return; //TODO: delete this line after refactor

        this._setState('Loading');

        this.fireAncestors('$getUriData', {
          uri: this.uri,
          page: this.next,
          type: this.itemType
        }).then(function (response) {
          return _this35.dataLoaded(response);
        });
      }
    }, {
      key: "dataLoaded",
      value: function dataLoaded(data) {
        var _this36 = this;

        var _this$sizes2 = this.sizes,
            w = _this$sizes2.w,
            h = _this$sizes2.h,
            margin = _this$sizes2.margin,
            scrollOffset = _this$sizes2.scrollOffset;
        var rows = [];
        var offsetY = this.list.children.length * 350;
        this.page = data.page;
        this.next = Math.ceil(data.total / data.per_page) > this.page ? this.page + 1 : false;
        this.list.add(data.items.map(function (item, index) {
          _this36.items.push(item);

          if (index % 4 === 0) rows = [];
          rows.push({
            type: _this36.gridType,
            x: index % 4 * 390,
            item: item,
            scale: _this36.itemType === 'videos' ? 0.875 : 1,
            altScale: 0.875,
            altLargeScale: 0.975
          });

          if (index % 4 === 3 || index === data.items.length - 1) {
            return {
              y: (index / 4 | 0) * 350 + offsetY,
              children: rows
            };
          }
        }).filter(function (element) {
          return !!element;
        }));

        this._setState('Grid');
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var item = this._getFocused().item;

        this.fireAncestors('$play', {
          items: this.items,
          item: item
        });
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.colIndex > 0) {
          this.colIndex--;
        } else {
          this.fireAncestors('$openMenu');
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this.colIndex < this.list.children[this.rowIndex].children.length - 1) {
          this.colIndex++;
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this.rowIndex > 0) {
          this.rowIndex--;
          this.scrollScreen();
        } else {
          this.fireAncestors('$outOfBounds', 'up');
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this.rowIndex < this.list.children.length - 1) {
          this.rowIndex++;

          if (this.colIndex > this.list.children[this.rowIndex].children.length - 1) {
            this.colIndex = this.list.children[this.rowIndex].children.length - 1;
          }

          this.scrollScreen();
        }

        if (this.state !== 'Loading' && this.rowIndex > this.list.children.length - 2 && this.next) {
          this.loadData();
        }
      }
    }, {
      key: "scrollScreen",
      value: function scrollScreen() {
        var y = this.list.children[this.rowIndex].y;
        this.spinner.y = this.list.children.length * 350 + 150;
        this.fireAncestors('$scrollScreen', y);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.list.children.length && this.list.children[this.rowIndex].children[this.colIndex] || this;
      }
    }, {
      key: "screenState",
      get: function get() {
        return {
          index: [this.colIndex, this.rowIndex],
          page: this.page
        };
      },
      set: function set(state) {
        if (!state) return;
        this.colIndex = state.index[0];
        this.rowIndex = state.index[1];
        this.page = state.page; //get data from api
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          x: 100,
          Title: {
            Main: {
              color: 0xffA3A4A5,
              text: {
                fontFace: 'AkkuratPro',
                fontSize: 42
              }
            },
            Arrow: {
              y: 19,
              src: AppDefinition.getPath('img/arrow-subcategory.png')
            },
            Sub: {
              color: 0xffA3A4A5,
              text: {
                fontFace: 'AkkuratPro',
                fontSize: 42
              }
            }
          },
          List: {
            x: -25,
            y: 56
          },
          Spinner: {
            type: VimeoSpinner,
            x: 765,
            y: 370
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
            key: "$enter",
            value: function $enter() {
              this.spinner.show();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.spinner.hide();
            }
          }]);

          return Loading;
        }(this)];
      }
    }]);

    return VimeoGrid;
  }(lng.Component);

  var VimeoTimelineItem =
  /*#__PURE__*/
  function (_lng$Component24) {
    _inherits(VimeoTimelineItem, _lng$Component24);

    function VimeoTimelineItem() {
      _classCallCheck(this, VimeoTimelineItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoTimelineItem).apply(this, arguments));
    }

    _createClass(VimeoTimelineItem, [{
      key: "_init",
      value: function _init() {
        var _this38 = this;

        this.video = this.tag('Video');
        this.title = this.video.tag('Title');
        this.time = this.video.tag('Time');
        this.timelabel = this.time.tag('Label');
        this.shadow = this.tag('Shadow');
        this.infos = this.tag('Infos');
        this.infos.patch({
          text: {
            text: 'Uploaded ' + Utils.dateToText(this.item.date) + '\n \n' + 'Plays: ' + Utils.formatSocialStat(this.item.plays) + '\n' + 'Likes: ' + Utils.formatSocialStat(this.item.likes)
          }
        });
        this.video.patch({
          Image: {
            src: Utils.cropImage({
              url: this.item.getPicture({
                w: 640
              }).link,
              w: 400,
              h: 215
            })
          },
          Time: {
            Label: {
              text: {
                text: Utils.secondsToTime(this.item.duration)
              }
            }
          },
          Title: {
            text: {
              text: this.item.title
            }
          },
          User: {
            text: {
              text: this.item.username
            }
          }
        });
        this.title.loadTexture();
        this.timelabel.loadTexture();
        this.time.patch({
          texture: lng.Tools.getRoundRect(this.timelabel.renderWidth + 18, 30, 3)
        });
        this.tag('Image').on('txLoaded', function () {
          _this38.tag('Image').setSmooth('alpha', 1);

          _this38.tag('Placeholder').alpha = 0;
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.video.patch({
          smooth: {
            scale: 1.1,
            color: 0xffEEF1F2
          },
          Title: {
            smooth: {
              color: 0xff0D1314
            }
          },
          Time: {
            smooth: {
              alpha: 1
            }
          }
        });
        this.shadow.patch({
          smooth: {
            color: 0x22000000,
            alpha: .5,
            scale: 1.1
          }
        });

        if (this.titleAnimation) {
          this.title.text.wordWrapWidth = null;
          this.titleAnimation.start();
        }
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.video.patch({
          smooth: {
            scale: 1,
            color: 0xff0D1314
          },
          Title: {
            smooth: {
              color: 0xffEEF1F2
            }
          },
          Time: {
            smooth: {
              alpha: 0
            }
          }
        });
        this.shadow.patch({
          smooth: {
            color: 0x44000000,
            alpha: 1,
            scale: 1
          }
        });

        if (this.titleAnimation) {
          this.title.text.wordWrapWidth = 360;
          this.titleAnimation.stop();
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 730,
          h: 372,
          rect: true,
          color: 0xff37434A,
          zIndex: 1,
          Infos: {
            zIndex: 1,
            x: 520,
            y: 80,
            color: 0xffA3A4A5,
            text: {
              fontFace: 'AkkuratPro',
              wordWrapWidth: 190,
              fontSize: 24,
              lineHeight: 32
            }
          },
          Shadow: {
            zIndex: 1,
            y: -10,
            pivot: 0,
            color: 0x44000000,
            texture: lng.Tools.getShadowRect(480, 372, 5, 10, 10)
          },
          Video: {
            w: 480,
            h: 372,
            rect: true,
            color: 0xff0D1314,
            zIndex: 2,
            clipping: true,
            Placeholder: {
              w: 480,
              h: 270,
              rect: true,
              color: 0xff484a4e,
              zIndex: 2,
              Logo: {
                zIndex: 3,
                src: AppDefinition.getPath('img/vimeo-logo.png'),
                x: 200,
                y: 112,
                mount: .5,
                scale: .4,
                alpha: .3
              }
            },
            Image: {
              w: 480,
              h: 270,
              zIndex: 2,
              alpha: 0.00001
            },
            Time: {
              mount: 1,
              x: 475,
              y: 265,
              zIndex: 3,
              color: 0xff0D1314,
              alpha: 0,
              Label: {
                x: 10,
                y: 5,
                color: 0xffEEF1F2,
                text: {
                  fontSize: 18,
                  fontFace: 'AkkuratPro'
                }
              }
            },
            Title: {
              zIndex: 2,
              x: 20,
              y: 280,
              color: 0xffEEF1F2,
              text: {
                fontSize: 28,
                lineHeight: 40,
                maxLines: 1,
                fontFace: 'AkkuratPro'
              }
            },
            User: {
              zIndex: 2,
              x: 20,
              y: 324,
              color: 0xffA3A4A5,
              text: {
                fontSize: 22,
                lineHeight: 26,
                wordWrapWidth: 360,
                maxLines: 1,
                fontFace: 'AkkuratPro'
              }
            }
          }
        };
      }
    }]);

    return VimeoTimelineItem;
  }(lng.Component);

  var VimeoTimeline =
  /*#__PURE__*/
  function (_lng$Component25) {
    _inherits(VimeoTimeline, _lng$Component25);

    function VimeoTimeline() {
      _classCallCheck(this, VimeoTimeline);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoTimeline).apply(this, arguments));
    }

    _createClass(VimeoTimeline, [{
      key: "_init",
      value: function _init() {
        this.colIndex = 0;
        this.rowIndex = 0;
        this.items = [];
        this.page = 1;
        this.list = this.tag('List');
        this.spinner = this.tag('Spinner');
        this.loadData();
      }
    }, {
      key: "reset",
      value: function reset() {
        this.colIndex = 0;
        this.rowIndex = 0;
        this.page = 1;
        this.items = [];
        this.list.children = [];
        this.spinner.y = 370;
      }
    }, {
      key: "loadData",
      value: function loadData() {
        var _this39 = this;

        this._setState('Loading');

        this.fireAncestors('$getUriData', {
          uri: this.uri,
          page: this.next
        }).then(function (response) {
          return _this39.dataLoaded(response);
        });
      }
    }, {
      key: "dataLoaded",
      value: function dataLoaded(data) {
        var _this40 = this;

        this.page = data.page;
        this.next = Math.ceil(data.total / data.per_page) > this.page ? this.page + 1 : false;
        var rows = [];
        var offsetY = this.list.children.length * 432;
        this.list.add(data.items.map(function (item, index) {
          _this40.items.push(item);

          if (index % 2 === 0) rows = [];
          rows.push({
            type: VimeoTimelineItem,
            x: index % 2 * 790,
            item: item
          });

          if (index % 2 === 1 || index === data.items.length - 1) {
            return {
              y: (index / 2 | 0) * 432 + offsetY,
              children: rows
            };
          }
        }).filter(function (element) {
          return !!element;
        }));

        this._setState('');
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this.colIndex > 0) {
          this.colIndex--;
        } else {
          this.fireAncestors('$openMenu');
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this.colIndex < this.list.children[this.rowIndex].children.length - 1) {
          this.colIndex++;
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        var item = this._getFocused().item;

        this.fireAncestors('$play', {
          items: this.items,
          item: item
        });
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this.rowIndex > 0) {
          this.rowIndex--;
          this.scrollScreen();
        } else {
          this.fireAncestors('$outOfBounds', 'up');
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this.rowIndex < this.list.children.length - 1) {
          this.rowIndex++;

          if (this.colIndex > this.list.children[this.rowIndex].children.length - 1) {
            this.colIndex = this.list.children[this.rowIndex].children.length - 1;
          }

          this.scrollScreen();
        }

        if (this.state !== 'Loading' && this.rowIndex >= this.list.children.length - 1 && this.next) {
          this.loadData();
        }
      }
    }, {
      key: "scrollScreen",
      value: function scrollScreen() {
        var y = this.list.children[this.rowIndex].y;
        this.spinner.y = this.list.children.length * 432 + 50;
        this.fireAncestors('$scrollScreen', y);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.list.children.length && this.list.children[this.rowIndex].children[this.colIndex] || this;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          List: {
            x: 100,
            y: -30
          },
          Spinner: {
            type: VimeoSpinner,
            x: 860,
            y: 370
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this41) {
          _inherits(Loading, _this41);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.spinner.show();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.spinner.hide();
            }
          }]);

          return Loading;
        }(this)];
      }
    }]);

    return VimeoTimeline;
  }(lng.Component);

  var VimeoScreen =
  /*#__PURE__*/
  function (_lng$Component26) {
    _inherits(VimeoScreen, _lng$Component26);

    function VimeoScreen() {
      _classCallCheck(this, VimeoScreen);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoScreen).apply(this, arguments));
    }

    _createClass(VimeoScreen, [{
      key: "_init",
      value: function _init() {
        this.header = this.tag('Header');
        this.content = this.tag('Content');
        this.spinner = this.tag('Spinner');
        this.index = 0;
      }
    }, {
      key: "build",
      value: function build(_ref14) {
        var _this42 = this;

        var screenName = _ref14.screenName,
            _ref14$data = _ref14.data,
            data = _ref14$data === void 0 ? false : _ref14$data,
            _ref14$componentState = _ref14.componentStates,
            componentStates = _ref14$componentState === void 0 ? false : _ref14$componentState,
            _ref14$y = _ref14.y,
            y = _ref14$y === void 0 ? 0 : _ref14$y,
            _ref14$index = _ref14.index,
            index = _ref14$index === void 0 ? 0 : _ref14$index;
        this.screenName = screenName;
        this.data = data;
        this.componentStates = componentStates;
        this.uris = [];
        this.index = index;
        this.y = y;
        var screen = this.getScreenStructure(screenName, data);
        this.reset();
        this.tag('Header').fire('update', screen.header);

        if (screen.loadData) {
          this.fireAncestors(screen.loadData.path, screen.loadData.item).then(function (response) {
            return _this42.components = response;
          });

          this._setState('Loading');
        } else {
          this.components = screen.components || [];
        }
      }
    }, {
      key: "getScreenStructure",
      value: function getScreenStructure(screenName) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (screenName === 'Feed') {
          return {
            login: true,
            header: {
              title: 'Feed'
            },
            components: [{
              type: 'timeline',
              content: 'videos',
              title: '',
              uri: '/me/feed'
            }]
          };
        }

        if (screenName === 'Profile' || screenName === 'User') {
          return {
            header: {
              title: data.name,
              subtitle: 'joined ' + Utils.dateToText(data.date),
              photo: Utils.cropImage({
                url: data.getPicture({
                  w: 150
                }).link,
                w: 150,
                h: 150
              })
            },
            components: [{
              type: 'list',
              title: 'videos',
              itemType: 'videos',
              uri: data.videosUri
            }, {
              type: 'list',
              title: 'likes',
              itemType: 'videos',
              uri: data.likesUri
            }, {
              type: 'list',
              title: 'following',
              itemType: 'profiles',
              uri: data.followingUri
            }]
          };
        }

        if (screenName === 'Library') {
          return {
            header: {
              title: data.name,
              subtitle: 'joined ' + Utils.dateToText(data.date),
              photo: Utils.cropImage({
                url: data.getPicture({
                  w: 150
                }).link,
                w: 150,
                h: 150
              })
            },
            components: [{
              type: 'list',
              title: 'watch later',
              itemType: 'videos',
              uri: '/me/watchlater'
            }, {
              type: 'list',
              title: 'purchases',
              itemType: 'videos',
              uri: '/me/ondemand/purchases'
            }, {
              type: 'list',
              title: 'watched',
              itemType: 'profiles',
              uri: '/me/watched/videos'
            }]
          };
        }

        if (screenName === 'Channel') {
          return {
            header: {
              title: data.name,
              subtitle: Utils.formatSocialStat(data.followers) + ' follower' + (data.followers > 1 ? 's' : ''),
              photo: Utils.cropImage({
                url: data.getPicture({
                  w: 150
                }).link,
                w: 150,
                h: 150
              })
            },
            components: [{
              type: 'grid',
              content: 'videos',
              itemType: 'videos',
              title: (Utils.formatSocialStat(data.totalvideos) + ' video' + (data.totalvideos > 1 ? 's' : '')).toUpperCase(),
              uri: data.uri + '/videos'
            }]
          };
        }

        if (screenName === 'Category') {
          return {
            header: {
              title: data.name,
              bg: data.bg
            },
            loadData: {
              path: '$getCategoryData',
              item: data.item
            }
          };
        }
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.components[this.index];
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this.index < this.components.length - 1) {
          this.index++;
          this.$scrollScreen();
        }
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this.index > 0) {
          this.index--;
          this.$scrollScreen();
        } else {
          this._setState('Header');
        }
      }
    }, {
      key: "$scrollScreen",
      value: function $scrollScreen() {
        var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (!y) {
          y = this._getFocused().y;
        }

        this.setSmooth('y', y === 0 ? 0 : -y);
      }
    }, {
      key: "$outOfBounds",
      value: function $outOfBounds(direction) {
        if (direction === 'up') {
          this._handleUp();
        }

        if (direction === 'down') {
          this._handleDown();
        }
      }
    }, {
      key: "$viewAll",
      value: function $viewAll(data, itemType) {
        this.index = 0;
        this.setSmooth('y', 0);
        this.components = [{
          type: 'grid',
          itemType: itemType,
          title: this.data.name,
          subtitle: data.name,
          uri: data.uri
        }];
      }
    }, {
      key: "reset",
      value: function reset() {
        this.index = 0;
        this.y = 0;
        this.components.forEach(function (component) {
          component.fire('stopLoading');
        });
        this.header.fire('reset');
      }
    }, {
      key: "components",
      get: function get() {
        return this.tag('Content').children;
      },
      set: function set(components) {
        var _this43 = this;

        var componentTypes = {
          list: VimeoList,
          grid: VimeoGrid,
          timeline: VimeoTimeline
        };
        var listItemTypes = {
          videos: VimeoVideo,
          channels: VimeoChannel,
          profiles: VimeoUser,
          subcategories: VimeoSubCategory
        };
        var offsetY = 0;
        this.uris = [];
        this.content.children = components.map(function (component, index) {
          var type = component.type,
              _component$title = component.title,
              title = _component$title === void 0 ? '' : _component$title,
              _component$subtitle = component.subtitle,
              subtitle = _component$subtitle === void 0 ? '' : _component$subtitle,
              uri = component.uri,
              _component$itemType = component.itemType,
              itemType = _component$itemType === void 0 ? '' : _component$itemType,
              _component$items = component.items,
              items = _component$items === void 0 ? '' : _component$items;
          var child = {
            type: componentTypes[type],
            title: title,
            subtitle: subtitle,
            uri: uri,
            itemType: itemType,
            items: items,
            screenState: _this43.componentStates && _this43.componentStates[index] || false,
            y: offsetY
          };

          if (components.length > 1) {
            offsetY += listItemTypes[itemType].getSizes().h + 50 + (title ? 90 : 0);
          }

          _this43.uris.push(uri);

          return child;
        });

        this._setState('');
      }
    }, {
      key: "pageState",
      get: function get() {
        return {
          screenName: this.screenName,
          data: this.data,
          componentStates: this.components.map(function (component) {
            return component.state;
          }),
          index: this.index,
          y: this.y,
          uris: this.uris //for api data cleaning

        };
      },
      set: function set(state) {
        this.build(state);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Header: {
            type: VimeoHeader
          },
          Content: {
            y: 209
          },
          Spinner: {
            type: VimeoSpinner,
            x: 860,
            y: 470
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this44) {
          _inherits(Header, _this44);

          function Header() {
            _classCallCheck(this, Header);

            return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
          }

          _createClass(Header, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.header;
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState('');
            }
          }]);

          return Header;
        }(this),
        /*#__PURE__*/
        function (_this45) {
          _inherits(Loading, _this45);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {
              this.spinner.show();
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.spinner.hide();
            }
          }]);

          return Loading;
        }(this)];
      }
    }]);

    return VimeoScreen;
  }(lng.Component);

  var VimeoContent =
  /*#__PURE__*/
  function (_lng$Component27) {
    _inherits(VimeoContent, _lng$Component27);

    function VimeoContent() {
      _classCallCheck(this, VimeoContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoContent).apply(this, arguments));
    }

    _createClass(VimeoContent, [{
      key: "_init",
      value: function _init() {
        var _this46 = this;

        this.menu = this.tag('Menu');
        this.explore = this.tag('Explore');
        this.search = this.tag('Search');
        this.login = this.tag('Login');
        this.screen = this.tag('Screen');
        this.feed = this.tag('Screen');
        this.category = this.tag('Screen');
        this.subcategory = this.tag('Screen');
        this.channel = this.tag('Screen');
        this.profile = this.tag('Screen');
        this.library = this.tag('Screen');
        this.overlay = this.tag('Overlay');
        this.menuIsOpen = false;
        this._api = new VimeoApi();

        this._api.getAccessToken().then(function (data) {
          if (data && data.user) {
            _this46.loggedInUser = data.user;
          }

          return _this46._api.getExploreData();
        }).then(function (items) {
          _this46.explore.items = items;

          _this46.tag('Menu').reveal();

          _this46.signal('contentReady');

          _this46._setState('Explore');
        });

        this._setState('Loading');
      }
    }, {
      key: "_handleBack",
      value: function _handleBack() {
        if (this.menuIsOpen) {
          this.closeMenu();
        } else if (this.state !== 'Explore') {
          this._setState('Explore');
        }
      }
    }, {
      key: "$getUriData",
      value: function $getUriData(_ref15) {
        var uri = _ref15.uri,
            _ref15$page = _ref15.page,
            page = _ref15$page === void 0 ? 1 : _ref15$page,
            _ref15$per_page = _ref15.per_page,
            per_page = _ref15$per_page === void 0 ? 20 : _ref15$per_page,
            _ref15$use_proxy = _ref15.use_proxy,
            use_proxy = _ref15$use_proxy === void 0 ? false : _ref15$use_proxy,
            _ref15$type = _ref15.type,
            type = _ref15$type === void 0 ? 'videos' : _ref15$type;
        return this.api.getUri(uri, type, page, per_page, use_proxy);
      }
    }, {
      key: "$viewScreen",
      value: function $viewScreen(screenName) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.screen.build({
          screenName: screenName,
          data: data
        });

        this._setState('Screen');
      }
    }, {
      key: "backButton",
      value: function backButton() {
        this._setState('Explore');
      }
    }, {
      key: "requestLogin",
      value: function requestLogin(targetScreen) {
        var _this47 = this;

        this.api.getAuthCode().then(function (data) {
          _this47.login.fire('dataLoaded', data);

          data.targetScreen = targetScreen;

          _this47.loginPooling(data);
        });

        this._setState('Login');
      }
    }, {
      key: "loginPooling",
      value: function loginPooling(data) {
        var _this48 = this;

        this.loginTimeout = window.setTimeout(function () {
          _this48.api.getUserAuth(data).then(function (response) {
            if (response.user) {
              _this48.loggedInUser = response.user;

              _this48.$viewScreen(data.targetScreen, _this48.loggedInUser);
            } else {
              _this48.loginPooling(data);
            }
          });
        }, data.interval * 1000);
      }
    }, {
      key: "$getCategoryData",
      value: function $getCategoryData(category) {
        return this.api.getCategory(category);
      }
    }, {
      key: "getAuthCode",
      value: function getAuthCode() {
        var _this49 = this;

        this.api.getAuthCode().then(function (data) {
          _this49.login.fire('dataLoaded', data);
        });
      }
    }, {
      key: "toggleOverlay",
      value: function toggleOverlay() {
        var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.overlay.patch({
          transitions: {
            alpha: {
              duration: .5,
              delay: toggle ? 0 : .5
            }
          },
          smooth: {
            alpha: +toggle
          }
        });
      }
    }, {
      key: "$openMenu",
      value: function $openMenu() {
        this.menuIsOpen = true;
        this.menu.fire('open');
      }
    }, {
      key: "closeMenu",
      value: function closeMenu() {
        this.menu.fire('close');
      }
    }, {
      key: "menuClosed",
      value: function menuClosed() {
        this.menuIsOpen = false;
      }
    }, {
      key: "optionSelect",
      value: function optionSelect(option) {
        var _this50 = this;

        if (this.prevState !== option) {
          this.closeMenu();
          setTimeout(function () {
            if (['Explore', 'Search'].includes(option)) {
              _this50._setState(option);
            } else if (!_this50.loggedInUser) {
              _this50.requestLogin(option);
            } else {
              _this50.$viewScreen(option, _this50.loggedInUser);
            }
          }, 800);
        }
      }
    }, {
      key: "$searchTerm",
      value: function $searchTerm(entry, type) {
        return this.api.getSearchResults(entry, type);
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        if (this.menuIsOpen) {
          return this.menu;
        }

        return this.tag(this.state) || this;
      }
    }, {
      key: "getAnimation",
      value: function getAnimation(x, x2, show) {
        return {
          x: x,
          alpha: show ? 0 : 1,
          smooth: {
            x: x2,
            alpha: show ? 1 : 0
          }
        };
      }
    }, {
      key: "api",
      get: function get() {
        return this._api;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Menu: {
            type: VimeoMenu,
            signals: {
              toggleOverlay: true,
              closeMenu: true,
              menuClosed: true,
              optionSelect: true
            }
          },
          Wrapper: {
            x: 150,
            transitions: {
              x: {
                duration: .35
              }
            },
            Explore: {
              type: VimeoExplore
            },
            Search: {
              alpha: 0,
              type: VimeoSearch
            },
            Login: {
              alpha: 0,
              type: VimeoLogin
            },
            Overlay: {
              zIndex: 4,
              w: 1920,
              h: 1080,
              rect: true,
              alpha: 0,
              colorLeft: 0xcc000000,
              colorRight: 0x55000000
            },
            Screen: {
              alpha: 0,
              type: VimeoScreen
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this51) {
          _inherits(Loading, _this51);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "$enter",
            value: function $enter() {// this.spinner.start()
            }
          }, {
            key: "$exit",
            value: function $exit() {// this.spinner.stop()
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this52) {
          _inherits(Explore, _this52);

          function Explore() {
            _classCallCheck(this, Explore);

            return _possibleConstructorReturn(this, _getPrototypeOf(Explore).apply(this, arguments));
          }

          _createClass(Explore, [{
            key: "$enter",
            value: function $enter(event) {
              if (event.prevState === 'Loading') return;
              this.menu.fire('changeSelection', 'Explore');
            }
          }, {
            key: "$exit",
            value: function $exit(event) {
              this.explore.patch(this.getAnimation(0, -200, 0));
            }
          }]);

          return Explore;
        }(this),
        /*#__PURE__*/
        function (_this53) {
          _inherits(Search, _this53);

          function Search() {
            _classCallCheck(this, Search);

            return _possibleConstructorReturn(this, _getPrototypeOf(Search).apply(this, arguments));
          }

          _createClass(Search, [{
            key: "$enter",
            value: function $enter(event) {
              this.search.patch(this.getAnimation(200, 0, 1));
              this.search.fire('mountKeyboard', {
                layout: 'search'
              });
            }
          }, {
            key: "$exit",
            value: function $exit(event) {
              this.search.patch(this.getAnimation(0, 200, 0));

              if (event.newState === 'Explore') {
                this.search.fire('unmountKeyboard');
                this.search.fire('reset');
              }
            }
          }]);

          return Search;
        }(this),
        /*#__PURE__*/
        function (_this54) {
          _inherits(Screen, _this54);

          function Screen() {
            _classCallCheck(this, Screen);

            return _possibleConstructorReturn(this, _getPrototypeOf(Screen).apply(this, arguments));
          }

          _createClass(Screen, [{
            key: "$enter",
            value: function $enter(event) {
              this.screen.patch(this.getAnimation(200, 0, 1));
            }
          }, {
            key: "$exit",
            value: function $exit(event) {
              this.screen.patch(this.getAnimation(0, 200, 0));
            }
          }]);

          return Screen;
        }(this),
        /*#__PURE__*/
        function (_this55) {
          _inherits(Login, _this55);

          function Login() {
            _classCallCheck(this, Login);

            return _possibleConstructorReturn(this, _getPrototypeOf(Login).apply(this, arguments));
          }

          _createClass(Login, [{
            key: "$enter",
            value: function $enter(event) {
              this.login.patch(this.getAnimation(200, 0, 1));
            }
          }, {
            key: "$exit",
            value: function $exit(event) {
              this.login.patch(this.getAnimation(0, 200, 0));

              if (this.loginTimeout) {
                window.clearTimeout(this.loginTimeout);
                this.loginTimeout = null;
              }

              this.login.fire('reset');
            }
          }]);

          return Login;
        }(this)];
      }
    }]);

    return VimeoContent;
  }(lng.Component);

  var VimeoSplash =
  /*#__PURE__*/
  function (_lng$Component28) {
    _inherits(VimeoSplash, _lng$Component28);

    function VimeoSplash() {
      _classCallCheck(this, VimeoSplash);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoSplash).apply(this, arguments));
    }

    _createClass(VimeoSplash, [{
      key: "_init",
      value: function _init() {
        this.setSmooth('alpha', 1);
        this.animation = this.tag('Loader').animation({
          duration: 2,
          repeat: -1,
          stopMethod: 'immediate',
          actions: [{
            p: 'y',
            rv: 540,
            v: {
              0: 540,
              0.5: 530,
              1: 540
            }
          }]
        });
        this.animation.start();
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this56 = this;

        this.animation.stop();
        setTimeout(function () {
          _this56.setSmooth('alpha', 0);
        }, 100);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0,
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xff282E32,
          Loader: {
            mount: .5,
            x: 960,
            y: 500,
            src: AppDefinition.getPath('img/vimeo-loading.png')
          }
        };
      }
    }]);

    return VimeoSplash;
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
      key: "$mediaplayerEnded",
      value: function $mediaplayerEnded() {
        this._setState('Controls');

        this._pressNext();
      }
    }, {
      key: "_scrubBackward",
      value: function _scrubBackward() {
        this.application.mediaplayer.seek(-15);
      }
    }, {
      key: "_scrubForward",
      value: function _scrubForward() {
        this.application.mediaplayer.seek(15);
      }
    }, {
      key: "$mediaplayerLoad",
      value: function $mediaplayerLoad() {
        this.tag('Spinner').fire('show');
      }
    }, {
      key: "$mediaplayerLoadedData",
      value: function $mediaplayerLoadedData() {
        this.tag('Spinner').fire('hide');
      }
    }, {
      key: "$mediaplayerSeeking",
      value: function $mediaplayerSeeking() {
        this.tag('Spinner').fire('show');
      }
    }, {
      key: "$mediaplayerSeeked",
      value: function $mediaplayerSeeked() {
        this.tag('Spinner').fire('hide');
      }
    }, {
      key: "_setItem",
      value: function _setItem(item) {
        this.tag("Progress").setProgress(0, 0);
        this._item = item;
        this._stream = item.stream;
        this.tag("Controls").title = item.title;
        this._index = this._items.findIndex(function (i) {
          return i.stream.link === item.stream.link;
        });
        this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);
        this.application.updateFocusSettings();
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
        template.Spinner = {
          type: VimeoPlayerSpinner
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
        function (_this57) {
          _inherits(Progress, _this57);

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
      key: "_init",
      value: function _init() {} //overwrite only! :o)

    }, {
      key: "_focus",
      value: function _focus() {
        this.tag("Active").color = 0xffffffff;
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.tag("Active").color = 0xff0D1314;
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
    }, {
      key: "_progress",
      set: function set(v) {
        var x = v * 1716;
        this.tag("Active").texture = lng.Tools.getRoundRect(Math.max(x, 5), 10, 5);
      }
    }], [{
      key: "_template",
      value: function _template() {
        var template = _get(_getPrototypeOf(VimeoPlayerProgress), "_template", this).call(this);

        template.Progress.Total.Scroller = {};
        template.Progress.Total.texture = lng.Tools.getRoundRect(1720, 14, 7);
        template.Progress.Active = {
          x: 1,
          y: 1,
          color: 0xff0D1314
        };
        return template;
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

    _createClass(VimeoPlayerControls, [{
      key: "paused",
      set: function set(v) {
        this.tag("Play").icon = v ? "play.png" : "pause.png";
      }
    }], [{
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

    _createClass(VimeoPlayerButton, [{
      key: "icon",
      set: function set(source) {
        if (source === 'pause.png') {
          this.tag('Icon').src = AppDefinition.getPath('img/pause-icon.png');
        } else {
          this.tag('Icon').src = "static/tools/player/img/".concat(source);
        }
      }
    }], [{
      key: "_template",
      value: function _template() {
        this.options.colors = {
          selected: 0xffffffff,
          deselected: 0xff0D1314
        };

        var template = _get(_getPrototypeOf(VimeoPlayerButton), "_template", this).call(this);

        return template;
      }
    }]);

    return VimeoPlayerButton;
  }(ux.tools.player.PlayerButton);

  var VimeoPlayerSpinner =
  /*#__PURE__*/
  function (_lng$Component29) {
    _inherits(VimeoPlayerSpinner, _lng$Component29);

    function VimeoPlayerSpinner() {
      _classCallCheck(this, VimeoPlayerSpinner);

      return _possibleConstructorReturn(this, _getPrototypeOf(VimeoPlayerSpinner).apply(this, arguments));
    }

    _createClass(VimeoPlayerSpinner, [{
      key: "_init",
      value: function _init() {
        this.spinnerAnimation = this.tag('Spinner').animation({
          duration: 2,
          repeat: -1,
          actions: [{
            p: 'rotation',
            v: {
              0: {
                sm: 0,
                v: 0
              },
              1: {
                sm: 0,
                v: Math.PI * 2
              }
            }
          }]
        });
      }
    }, {
      key: "show",
      value: function show() {
        this.patch({
          smooth: {
            alpha: 1
          },
          Spinner: {
            scale: 1
          }
        });
        this.spinnerAnimation.start();
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this58 = this;

        this.patch({
          smooth: {
            alpha: 0
          },
          Spinner: {
            smooth: {
              scale: 1.3
            }
          }
        });
        setTimeout(function () {
          _this58.spinnerAnimation.stop();
        }, 250);
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          zIndex: 11,
          alpha: 0,
          Spinner: {
            x: 960,
            y: 540,
            mount: .5,
            src: AppDefinition.getPath('img/spinner.png')
          }
        };
      }
    }]);

    return VimeoPlayerSpinner;
  }(lng.Component);

  var Vimeo =
  /*#__PURE__*/
  function (_ux$App) {
    _inherits(Vimeo, _ux$App);

    function Vimeo() {
      _classCallCheck(this, Vimeo);

      return _possibleConstructorReturn(this, _getPrototypeOf(Vimeo).apply(this, arguments));
    }

    _createClass(Vimeo, [{
      key: "_init",
      value: function _init() {
        this.splash = this.tag('Splash');
        this.content = this.tag('Content');
        this.player = this.tag('Player'); // this.loading = this.tag('Loading')

        this._setState('Splash');
      }
    }, {
      key: "contentReady",
      value: function contentReady() {
        this._setState('Content');
      }
    }, {
      key: "$play",
      value: function $play(_ref16) {
        var item = _ref16.item,
            items = _ref16.items;
        var playlist = {
          item: item.getMediaplayerItem(),
          items: items.map(function (item) {
            return item.getMediaplayerItem();
          })
        };
        this.player.fire('play', playlist);

        this._setState('Player');
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xff282E32,
          Splash: {
            zIndex: 2,
            type: VimeoSplash
          },
          Player: {
            alpha: 0,
            zIndex: 10,
            type: VimeoPlayer,
            signals: {
              closePlayer: true
            }
          },
          // Loading: {
          //     alpha: 0,
          // },
          Content: {
            alpha: 0,
            type: VimeoContent,
            signals: {
              contentReady: true,
              play: true
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this59) {
          _inherits(Splash, _this59);

          function Splash() {
            _classCallCheck(this, Splash);

            return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
          }

          _createClass(Splash, [{
            key: "_getFocused",
            value: function _getFocused() {
              return this.splash;
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.splash.hide();
            }
          }]);

          return Splash;
        }(this),
        /*#__PURE__*/
        function (_this60) {
          _inherits(Content, _this60);

          function Content() {
            _classCallCheck(this, Content);

            return _possibleConstructorReturn(this, _getPrototypeOf(Content).apply(this, arguments));
          }

          _createClass(Content, [{
            key: "$enter",
            value: function $enter() {
              this.content.setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.content.setSmooth('alpha', 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.content;
            }
          }]);

          return Content;
        }(this),
        /*#__PURE__*/
        function (_this61) {
          _inherits(Player, _this61);

          function Player() {
            _classCallCheck(this, Player);

            return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
          }

          _createClass(Player, [{
            key: "$enter",
            value: function $enter() {
              this.color = 0x00282E32;
              this.player.setSmooth('alpha', 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.color = 0xff282E32;
              this.player.setSmooth('alpha', 0);
              this.player.fire('close');
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.player;
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState('Content');
            }
          }, {
            key: "closePlayer",
            value: function closePlayer() {
              this._setState('Content');
            }
          }, {
            key: "_setFocusSettings",
            value: function _setFocusSettings(settings) {
              settings.mediaplayer.consumer = this.player;
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.player;
            }
          }]);

          return Player;
        }(this)];
      }
    }, {
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'AkkuratPro',
          url: AppDefinition.getPath('fonts/AkkuratPro-Regular.ttf'),
          descriptors: {}
        }, {
          family: 'Material-Icons',
          url: AppDefinition.getPath('fonts/Material-Icons.ttf'),
          descriptors: {}
        }, {
          family: 'Font-Awesome',
          url: AppDefinition.getPath('fonts/fontawesome-webfont.ttf'),
          descriptors: {}
        }];
      }
    }]);

    return Vimeo;
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
        return Vimeo;
      }
    }], [{
      key: "identifier",
      get: function get() {
        return 'com.metrological.app.Vimeo';
      }
    }]);

    return AppDefinition;
  }(ux.AppDefinition);

  return AppDefinition;
}();