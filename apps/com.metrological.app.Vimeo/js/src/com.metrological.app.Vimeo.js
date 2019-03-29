var com_metrological_app_Vimeo = (function () {
    'use strict';

    class VimeoVideoModel {
        constructor(obj) {
            this.$ = obj;
        }

        get title() {
            return this.$.name
        }

        get pictures() {
            return (this.$.film && this.$.film.pictures || this.$.pictures && this.$.pictures.sizes || this.$.pictures).sort((a, b) => b.width - a.width)
        }

        getMediaplayerItem() {
            return {
                title: this.title,
                stream: {
                    link: this.$.film ? this.streams[0].link : this.filterStreams()[0].link
                }
            }
        }

        /**
         * Get a picture that matches a certain width or height
         * @param w
         * @param h
         * @returns {*}
         */
        getPicture({w = null, h = null}) {
            let pictures = this.pictures;

            if (!pictures.length) {
                return false;
            }
            if (!w && !h) {
                return pictures[0]
            } else {
                const val = w ? w : h;
                const match = pictures.filter(p => p[w ? 'width' : 'height'] === val);

                if (match.length) {
                    return match[0]
                } else {
                    return pictures[0]
                }
            }
        }

        get largest() {
            return this.pictures[0].link
        }

        get smallest() {
            const p = this.pictures;
            return p[p.length - 1].link
        }

        get streams() {
            return this.$.download || this.$.files || this.$.streams || this.$.film && this.$.film.play.progressive || []
        }

        /**
         * get an array of streams by quality
         * @param quality {(source|hd|sd)}
         */
        filterStreams(quality = 'sd') {
            return this.streams.filter(stream => stream.quality === quality)
        }

        get description() {
            return this.$.description
        }

        get duration() {
            return this.$.duration || this.$.film.duration
        }

        get date() {
            return this.$.created_time
        }

        get language() {
            return this.$.language
        }

        get user() {
            return this.$.user
        }

        get username() {
            return this.user.name
        }

        get likes() {
            return this.$.stats.likes
        }

        get plays() {
            return this.$.stats.plays
        }
    }

    class VimeoCategoryModel {
        constructor(obj) {
            this.$ = obj;
        }

        get name() {
            return this.$.name
        }

        get icon() {
            return this.$.icon.sizes.find((icon) => icon.width > 50).link
        }

        get bg() {
            const icons = ["animation",  "art", "cameratechniques", "comedy",
                            "documentary", "experimental", "fashion", "food",
                            "instructionals", "music", "narrative", "personal",
                            "journalism", "sports", "talks", "travel"];

            const name = this.$.uri.replace('/categories/', '').split('/')[0];

            if(icons.includes(name)) {
                return 'category-' + name + '.jpeg'
            }
            else {
                return 'category-' + icons[Math.ceil(Math.random() * icons.length - 1)] + '.jpeg'
            }
        }

        get uri() {
            return this.$.uri + (!this.$.uri.includes('/videos') ? '/videos' : '')
        }

        get parent() {
            return this.$.parent
        }

        get item() {
            return this.$
        }

        get type() {
            return 'videos'
        }
    }

    class VimeoChannelModel {
        constructor(obj) {
            this.$ = obj;
        }

        get name() {
            return this.$.name;
        }

        get date() {
            return this.$.created_time
        }

        get uri() {
            return this.$.uri;
        }

        get pictures() {
            return (this.$.pictures && this.$.pictures.sizes || this.$.pictures).sort((a, b) => b.width - a.width)
        }

        get largest() {
            return this.pictures[0].link;
        }

        get smallest() {
            const p = this.pictures;
            return p[p.length - 1].link;
        }

        get followers() {
            return this.$.stats && this.$.stats.users || this.$.metadata.connections.users.total
        }

        get totalvideos() {
            return this.$.stats && this.$.stats.videos ||this.$.metadata.connections.videos.total
        }

        /**
         * Get a picture that matches a certain width or height
         * @param w
         * @param h
         * @returns {*}
         */
        getPicture({w = null, h = null}) {
            let pictures = this.pictures;

            if (!pictures.length) {
                return false;
            }
            if (!w && !h) {
                return pictures[0];
            } else {
                const val = w ? w : h;
                const match = pictures.filter(p => p[w ? 'width' : 'height'] === val);

                if (match.length) {
                    return match[0];
                } else {
                    return pictures[0];
                }
            }
        }
    }

    class VimeoUserModel {
        constructor(obj) {
            this.$ = obj;
        }

        get name() {
            return this.$.name
        }

        get date() {
            return this.$.created_time
        }

        get videosUri() {
            return this.$.metadata.connections.videos.uri || this.$.metadata.connections.videos
        }

        get likesUri() {
            return this.$.metadata.connections.likes.uri || this.$.metadata.connections.likes
        }

        get followingUri() {
            return this.$.metadata.connections.following.uri || this.$.metadata.connections.following
        }

        get watchLaterUri() {
            return this.$.metadata.connections.watchlater.uri || this.$.metadata.connections.watchlater
        }

        get uri() {
            return this.$.uri
        }

        get pictures() {
            return (this.$.pictures && this.$.pictures.sizes || this.$.pictures).sort((a, b) => b.width - a.width)
        }

        get largest() {
            return this.pictures[0].link
        }

        get smallest() {
            const p = this.pictures;
            return p[p.length - 1].link
        }

        /**
         * Get a picture that matches a certain width or height
         * @param w
         * @param h
         * @returns {*}
         */
        getPicture({w = null, h = null}) {
            let pictures = this.pictures;

            if (!pictures.length) {
                return false
            }
            if (!w && !h) {
                return pictures[0]
            } else {
                const val = w ? w : h;
                const match = pictures.filter(p => p[w ? 'width' : 'height'] === val);

                if (match.length) {
                    return match[0]
                } else {
                    return pictures[0]
                }
            }
        }
    }

    class VimeoApi {
        constructor() {
            this.keys = {
                id: 'aabe22c4e1a4038c0fc233bd6a0aa973',
                secret: '5d9d5e20fc83a9ac',
                authorization: 'basic YWFiZTIyYzRlMWE0MDM4YzBmYzIzM2JkNmEwYWE5NzM6NWQ5ZDVlMjBmYzgzYTlhYw=='
            };

            this.endpoints = {
                api: 'https://api.vimeo.com',
            };

            this.authHeaders = {
                'Authorization': this.keys.authorization,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.vimeo.*+json;version=3.4',
            };
        }

        getAccessToken() {
            const ls = window.localStorage;
            const token = ls.getItem('Vimeo.access_token');
            let user = ls.getItem('Vimeo.user');
            const altHeaders = this.authHeaders;
            const path = '/oauth/authorize/client';
            const body = {
              grant_type: "client_credentials",
              scope: "public",
            };

            if(token !== null) {
                this.keys.token = token;

                if(user !== null) {
                    user = JSON.parse(user);
                    return this.getUser(user)
                }

                return Promise.resolve()
            }

            return this.fetchData({ path, body, altHeaders, method: 'POST' })
                .then((response) => {
                    this.keys.token = response.access_token;
                    ls.setItem('Vimeo.access_token', response.access_token);
                    return Promise.resolve()
                })
        }

        getAuthCode() {
            const altHeaders = this.authHeaders;
            const path = '/oauth/device';
            const body = {
              grant_type: "device_grant",
              scope: "public private purchased",
            };

            return this.fetchData({ path, body, use_proxy: true, altHeaders, method: 'POST' })
        }

        getUserAuth(data) {
            const ls = window.localStorage;
            const altHeaders = this.authHeaders;
            const rawUrl = data.authorize_link;
            const body = {
                user_code: data.user_code,
                device_code: data.device_code,
            };

            return this.fetchData({ rawUrl, body, use_proxy: true, altHeaders, method: 'POST' })
                       .then((data) => {
                            if(data.user) {
                                let user = data.user;
                                data.user = new VimeoUserModel(user);
                                this.keys.token = data.access_token;
                                ls.setItem('Vimeo.access_token', data.access_token);
                                ls.setItem('Vimeo.scope', data.scope);
                                ls.setItem('Vimeo.user', JSON.stringify({name:user.name,uri:user.uri,photo:data.user.getPicture({w: 288}).link}));
                            }
                            return data
                       })
        }

        getExploreData() {
            let promises = [];
            promises.push(this.getStaffPicksVideos());
            promises.push(this.getCategories());
            return Promise.all(promises)
        }

        getStaffPicksVideos(params = false) {
            const path = '/channels/staffpicks/videos';
            if(!params) {
                params =  {
                    page: 1,
                    per_page: 20,
                    filter: 'content_rating',
                    filter_content_rating: 'safe',
                };
            }
            return this.fetchData({ path, params })
                .then(({data = []}) => {
                        if (!data.length) {
                            return Promise.reject('getStaffPicksVideos returned no data')
                        }
                        return Promise.resolve({
                                name: 'StaffPicks',
                                items: data.map(video => new VimeoVideoModel(video))
                            })
                   })
        }

        getSearchResults(query, type, page = 1, per_page = 20) {
            const types = {
                videos:{
                    path: '/videos',
                    item: VimeoVideoModel,
                    sort: 'likes',
                },
                channels: {
                    path: '/channels',
                    item: VimeoChannelModel,
                    sort: 'relevant',
                },
                people: {
                    path: '/users',
                    item: VimeoUserModel,
                    sort: 'relevant',
                }
            };
            const selected = types[type];
            const params = {
                query,
                direction: 'desc',
                sort: selected.sort,
                page,
                per_page,
            };
            if(this.searchController) {
                this.searchController.abort();
            }
            this.searchController = new AbortController();
            return this.fetchData({ path: selected.path, params, controller: this.searchController })
                        .then((response) => {
                            return Promise.resolve({
                                    type,
                                    query,
                                    items: response.data.map(item => new selected.item(item))
                                })
                        })
                        .catch((error)=> {
                            return Promise.reject(error)
                        })

        }

        getChannels() {
            const path = '/channels';
            const params = {
                per_page: 10,
                sort: 'followers',
                direction: 'desc',
            };
            return this.fetchData({ path, params })
                       .then((response) => {
                            let promises = [];
                            const params = {
                                filter: 'conditional_featured',
                                sort: 'featured',
                                filter_content_rating: 'safe',
                            };
                            if(!response.data) return Promise.reject('Failed to get channels!')
                            response.data.forEach((channel) => {
                                promises.push(
                                    this.fetchData({ path: channel.uri + '/videos'}, params)
                                        .then((videos) => {
                                            return Promise.resolve({
                                                name: channel.name,
                                                videos: videos.data.map(video => new VimeoVideoModel(video))
                                            })
                                        })
                                );
                            });
                            return Promise.all(promises)
                       })
        }

        getCategories() {
            const path = '/categories';
            const params = {
                direction: 'asc',
            };
            return this.fetchData({ path, params })
                       .then(({data = []}) => {
                            if (!data.length) {
                                return Promise.reject('getCategories returned no data')
                            }
                            return Promise.resolve({
                                    name: 'Categories',
                                    items: data.map(category => new VimeoCategoryModel(category))
                                })
                       })
        }

        getCategory(category) {
            return this.fetchData({ path: category.uri })
                    .then((response) => {
                        let components = [];
                        const subcategories = response.subcategories.map((sub) => {
                            sub.parent = category.name;
                            return new VimeoCategoryModel(sub)
                        });
                        components.push({
                            title: 'Featured',
                            type: 'list',
                            uri: category.uri + '/videos',
                            itemType: 'videos',
                        });
                        components.push({
                            title: 'Subcategories',
                            type: 'list',
                            itemType: 'subcategories',
                            items: subcategories
                        });
                        subcategories.forEach((sub) => {
                            components.push({
                                title: sub.name,
                                bg: category.bg,
                                type: 'list',
                                itemType: 'videos',
                                uri: sub.uri,
                            });
                        });

                        return Promise.resolve(components)
                    })
        }

        getSubcategoryData(category, page = 1) {
            const params = {
                filter: 'conditional_featured',
                sort: 'featured',
                filter_content_rating: 'safe',
                per_page: 20,
                page: page
            };
            return this.fetchData({ path: category.uri + '/videos', params })
                       .then((response)=> {
                            if(response.data.length) {
                                return Promise.resolve({
                                    page: response.page,
                                    total: response.total,
                                    per_page: response.per_page,
                                    videos: response.data.map(video => new VimeoVideoModel(video))
                                })
                            }
                       })
        }

        getChannelData(channel, page = 1) {
            const params = {
                per_page: 20,
                page: page
            };
            return this.fetchData({ path: channel.uri + '/videos', params })
                       .then((response)=> {
                            if(response.data.length) {
                                return Promise.resolve({
                                    page: response.page,
                                    total: response.total,
                                    per_page: response.per_page,
                                    videos: response.data.map(video => new VimeoVideoModel(video))
                                })
                            }
                       })
        }

        getUserData(user) {
            let promises = [];

            promises.push(this.getUserVideos(user));
            promises.push(this.getUserLikes(user));
            promises.push(this.getUserFollowing(user));

            return Promise.all(promises)
        }

        getLibraryData() {
            let promises = [];

            promises.push(this.getUserWatchLater());
            promises.push(this.getUserPurchases());
            promises.push(this.getUserWatched());

            return Promise.all(promises)
        }

        getUser(user) {
            return this.fetchData({ path: user.uri })
                .then((user) => {
                    return Promise.resolve({ user: new VimeoUserModel(user)})
                })
        }

        getUserVideos(user, page = 1, per_page = 20) {
            const params = {
                per_page,
                page,
            };
            return this.fetchData({ path: user.videosUri, params })
                .then((videos) => {
                    return Promise.resolve({
                        title: 'videos',
                        total: videos.total,
                        page,
                        per_page,
                        videos: videos.data.map(video => new VimeoVideoModel(video))
                    })
                })
        }

        getUserLikes(user, page = 1, per_page = 20) {
            const params = {
                per_page,
                page
            };
            return this.fetchData({ path: user.likesUri, params })
                .then((videos) => {
                    return Promise.resolve({
                        title: 'likes',
                        page,
                        per_page,
                        total: videos.total,
                        videos: videos.data.map(video => new VimeoVideoModel(video))
                    })
                })
        }

        getUserFollowing(user, page = 1, per_page = 20) {
            const params = {
                per_page,
                page
            };
            return this.fetchData({ path: user.followingUri, params })
                .then((users) => {
                    return Promise.resolve({
                        title: 'following',
                        total: users.total,
                        page,
                        per_page,
                        items: users.data.map(user => new VimeoUserModel(user))
                    })
                })
        }

        getUserPurchases(page = 1, per_page = 20) {
            const params = {
                per_page,
                page,
            };
            return this.fetchData({ path: '/me/ondemand/purchases', params })
                .then((videos) => {
                    return Promise.resolve({
                        title: 'purchases',
                        page,
                        per_page,
                        total: videos.total,
                        items: videos.data.map(video => new VimeoVideoModel(video))
                    })
                })
        }

        getUserWatched(page = 1, per_page = 20) {
            const params = {
                per_page,
                page,
            };
            return this.fetchData({ path: '/me/watched/videos', params })
                .then((videos) => {
                    return Promise.resolve({
                        title: 'watched',
                        page,
                        per_page,
                        total: videos.total,
                        items: videos.data.map(video => new VimeoVideoModel(video))
                    })
                })
        }

        getUserWatchLater(page = 1, per_page = 20) {
            const params = {
                per_page,
                page,
            };
            return this.fetchData({ path: '/me/watchlater', params })
                .then((videos) => {
                    return Promise.resolve({
                        title: 'watchlater',
                        page,
                        per_page,
                        total: videos.total,
                        items: videos.data.map(video => new VimeoVideoModel(video))
                    })
                })
        }

        getUserFeed(page = 1, per_page = 20) {
            const params = {
                per_page,
                page,
            };
            return this.fetchData({ path: '/me/feed', params })
                .then((videos) => {
                    return Promise.resolve({
                        title: 'feed',
                        page,
                        per_page,
                        total: videos.total,
                        videos: videos.data.map(video => new VimeoVideoModel(video))
                    })
                })
        }

        getUri(uri, type = 'videos', page = 1, per_page = 20, use_proxy = false) {
            const types = {
                videos: VimeoVideoModel,
                profiles: VimeoUserModel,
                channels: VimeoChannelModel,
            };
            const params = {
                page,
                per_page,
            };

            return this.fetchData({ path: uri, params, use_proxy})
                       .then((response) => {
                            return Promise.resolve({
                                page,
                                per_page,
                                total: response.total,
                                items: response.data.map(item => new types[type](item))
                            })
                       })
        }

        fetchData({ rawUrl = false, use_proxy = false, path = false, params = false, body = false, altHeaders = false, method = 'GET', controller = false }) {
            let url = path && this.endpoints.api + path || rawUrl;
            url = new URL(use_proxy ? ux.Ui.getProxyUrl(url) : url);

            const headers = new Headers(altHeaders || { Authorization: `bearer ${this.keys.token}` });
            const opts = {
                method,
                headers,
                signal: controller.signal || null,
                body: body && JSON.stringify(body) || null,
            };

            if(params && !use_proxy) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            return fetch(url, opts)
                   .then(r => r.json())
                   .catch(error => Promise.reject(error.message))
        }
    }

    class Utils {

        static random(items) {
            let len = items;
            if (Array.isArray(items)) {
                len = items.length;
            }

            return Math.floor(Math.random() * len)
        }

        static secondsToTime(seconds) {
            const hours = ((seconds / 3600 | 0) + '').padStart(2, '0');
            const min = ((seconds % 3600 / 60 | 0) + '').padStart(2, '0');
            const sec = ((seconds % 3600 % 60 | 0) + '').padStart(2, '0');

            return `${hours !== '00' ? hours + ':' : ''}${min}:${sec}`
        }

        static cropImage({url, w, h}) {
            return ux.Ui.getImageUrl(url, {width: w, height: h, type: 'crop'})
        }

        static formatSocialStat(number, digits = 1) {
            if (number >= 1e6) {
                return (number / 1e6).toFixed(digits) + 'm'
            }
            if (number >= 1e3) {
                return (number / 1e3).toFixed(digits) + 'k'
            }
            return number
        }

        static dateToText(date) {
            let diff = (new Date().getTime() - new Date(date).getTime()) / 864e5 | 0;
            if(diff > 365) {
                diff = diff / 365 | 0;
                return diff + ' year' + (diff > 1 ? 's' : '') + ' ago'
            }
            if(diff > 30) {
                diff = diff / 30 | 0;
                return diff + ' month' + (diff > 1 ? 's' : '') + ' ago'
            }
            if(diff > 0) {
                return diff + ' day' + (diff > 1 ? 's' : '') + ' ago'
            }
            return 'today'
        }
    }

    class VimeoTeaser extends lng.Component {
        static _template() {
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
                            alpha: { duration: 3, delay: 0},
                            scale: { duration: 30, delay: 0.1},
                        }
                    }
                },
                Gradient: {
                    x: 370,
                    w: 1000,
                    h: 590,
                    rect: true,
                    colorLeft: 0xff000000,
                    colorRight: 0x00000000,
                },
                Seal: {
                    x: 88,
                    y: 72,
                    src: AppDefinition.getPath('img/staff-pick.png'),
                    scale: 0.8,
                    alpha: 0,
                    rotation: -0.3,
                    transitions: {
                        scale: { duration: 0.4, delay: 2},
                        alpha: { duration: 0.4, delay: 2},
                        rotation: { duration: 0.4, delay: 2},
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
                        fontFace: 'AkkuratPro',
                    },
                    transitions: {
                        alpha: { duration: 1.5, delay: 0.5},
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
                    transitions: { alpha: { duration: 1.5, delay: 0.7}}
                },
                Watch: {
                    x: 100,
                    y: 475,
                    alpha: 0,
                    texture: lng.Tools.getRoundRect(150, 50, 5, 0, 0, true, 0xffffffff),
                    color: 0xff0D1314,
                    transitions: {
                        alpha: { duration: 1.5, delay: 0.9}
                    },
                    Icon: {
                        x: 19,
                        y: 15,
                        w: 19,
                        h: 20,
                        color: 0xffEEF1F2,
                        src: AppDefinition.getPath('img/watch-icon-white.png'),
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
                        h: { duration: 0.6, delay: 0.3},
                        y: { duration: 0.6, delay: 0.3},
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
                        alpha: {duration: 1, delay: 1.2}
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
                        w: {duration: 30, timingFunction: 'linear'},
                        alpha: {duration: 1, delay: 1.2}
                    }
                }
            }
        }


        pause() {
            this.tag('Progress').transition('w').pause();
            this.tag('Image').transition('scale').pause();
            this._pause = true;
        }

        play() {
            this.tag('Progress').transition('w').play();
            this.tag('Image').transition('scale').play();
            this._pause = false;
        }
        
        _init() {
            this._currentProgress = 0;
            this._progressDuration = 30;
            this._loadedTextures = [];

            this.tag('Title').on('txLoaded', () => {
                this._loadedTextures.push('title');
            });

            this.tag('User').on('txLoaded', () => {
                this._loadedTextures.push('user');
            });

            this._setState("Inactive");
        }

        _inactive() {
            this.pause();
        }

        _active() {
            this.play();
        }

        _detach() {
            if (this._interval) {
                clearInterval(this._interval);
            }
        }

        _focus() {
            this.patch({
                Watch: {
                    smooth: {color: 0xffEEF1F2, scale: 1.2 },
                    Label: { smooth: { color: 0xff0D1314 }},
                    Icon: { src: AppDefinition.getPath('img/watch-icon.png') },
                }
            });
            this.pause();
        }

        _unfocus() {
            this.patch({
                Watch: {
                    smooth: { color: 0xff0D1314, scale: 1 },
                    Label: { smooth: {color: 0xffEEF1F2 }},
                    Icon: { src: AppDefinition.getPath('img/watch-icon-white.png') },
                }
            });
            this.play();
        }

        _handleEnter() {
            this.fireAncestors('$play', {
                item: this._current,
                items: this._items,
            });
        }

        loading() {
            this._setState("Loading");
        }

        running() {
            this._setState("Running");
        }

        static _states() {
            return [
                class Inactive extends this {
                    loaded() {
                        this.patch({
                            Clipper: {Image: {scale: 1, smooth: {alpha: 1, scale: 1.3}}},
                            Seal: {smooth: {alpha: 1, scale: 1, rotation: 0}},
                            Overlay: {smooth: {h: 1, y: 591}},
                            Watch: {smooth: {alpha: 1}},
                            ProgressBg: {smooth: {alpha: 1 }},
                            Progress: {smooth: {alpha: 1, w: 1770}},
                        });

                        if (this._interval) {
                            clearInterval(this._interval);
                        }
                        this._interval = setInterval(() => {
                            this._progress();
                        }, 1000);

                        this.tag('Image').transition('alpha').on('finish', () => {
                            if (this.tag('Image').alpha < 1) {
                                this.fire('imageFaded');
                            }
                        });
                    }
                },
                class Loading extends this {
                    $enter() {
                        clearInterval(this._interval);
                        this.patch({
                            Clipper: {Image: {smooth: {alpha: 0.00001}}},
                            Title: {smooth: {alpha: 0}},
                            User: {smooth: {alpha: 0}},
                            Watch: {smooth: {alpha: 0}},
                            Progress: {smooth: {w: [0, {duration: 0.1, delay: 0}]}}
                        });
                        this._currentProgress = 0;
                    }
                    imageFaded() {
                        this._update();
                    }
                    $exit() {
                        if (this._interval) {
                            clearInterval(this._interval);
                        }
                        this._interval = setInterval(() => {
                            this._progress();
                        }, 1000);
                    }
                    loaded() {
                        this.patch({
                            Clipper: {Image: {scale: 1, smooth: {alpha: 1, scale: [1.3, {duration: 30, delay: 0}]}}},
                            Title: {smooth: {alpha: 1}},
                            User: {smooth: {alpha: 1}},
                            Watch: {smooth: {alpha: 1}},
                            Progress: {smooth: {w: [1770, {duration: 30, delay: 0, timingFunction: 'linear'}]}}
                        });
                        this.fire('running');
                    }
                },
                class Running extends this {
                }
            ]
        }

        set items(v) {
            this._items = v;
            this._currentSet = this._items.slice();
            this._update();
        }

        _progress() {
            if (this._pause) {
                return
            }
            if (this._currentProgress === this._progressDuration) {
                this.fire('loading');
                return
            }
            this._currentProgress += 1;
        }

        _update() {
            if (!this._currentSet.length) {
                this._currentSet = this._items.slice();
            }

            let item = this._currentSet.splice(Utils.random(this._currentSet), 1)[0];

            this._current = item;

            this.patch({
                Clipper: {Image: {src: Utils.cropImage({url: item.largest, w: 1400, h: 590})}},
                Title: {text: {text: item.title}},
                User: {text: {text: item.username}}
            });

            this.tag('Title').loadTexture();
            this.tag('User').loadTexture();

            this.tag('Image').on('txLoaded', () => {
                this.fire('loaded');
                this.signal('loaded');
            });

            this.tag('Image').on('txError', () => {
                this.signal('error');
            });
        }
    }

    class VimeoViewAll extends lng.Component {
        static _template() {
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
                        lineHeight: 50,
                    }
                }
            }

        }

        _init() {
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

        _focus() {
            this.patch({
                smooth: {scale: 1.1, color: 0xffeef1f2 },
                Name: { smooth: { color: 0xff0D1314 }}
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1, color: 0xff0D1314 },
                Name: { smooth: { color: 0xffeef1f2 }},
            });
        }
    }

    class VimeoSpinner extends lng.Component {
        static _template() {
            return {
                w: 70,
                h: 70,
                mountX: .5,
                alpha: 0,
                Image: {
                    src: AppDefinition.getPath('/img/spinner.png'),
                }
            }
        }

        _init() {
            this.spinnerAnimation = this.tag('Image').animation({
                duration: 2, repeat: -1, stopMethod: 'fade',
                actions: [
                    { p: 'rotation', v: {0: { sm: 0, v: 0 }, 1: { sm: 0, v: Math.PI * 2 }}}
                ]
            });
        }

        show() {
            if(this.alpha !== 0) return

            this.patch({
                smooth: {
                    alpha: 1,
                },
                Image: {
                    scale: 1,
                }
            });
            this.spinnerAnimation.start();
        }

        hide() {
            this.patch({
                smooth: {
                    alpha: 0,
                },
                Image: {
                    smooth: {
                        scale: 1.3,
                    }
                }
            });
            this.spinnerAnimation.stop();
        }
    }

    class VimeoVideo extends lng.Component {
        static _template() {
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
                        alpha: .3,
                    }
                },
                Image: {
                    w: 400,
                    h: 225,
                    zIndex: 2,
                    alpha: 0.00001,
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
            }
        }

        static getSizes() {
            return {
                w: 400,
                h: 325,
                margin: 30,
                scrollOffset: 1550,
            }
        }

        _init() {
            this.title = this.tag('Title');
            this.time = this.tag('Time');
            this.timelabel = this.time.tag('Label');

            this.patch({
                Image: {
                    src: Utils.cropImage({ url: this.item.getPicture({w: 640}).link, w: 400, h: 215})
                },
                Time: {
                    Label: { text: { text: Utils.secondsToTime(this.item.duration)}}
                },
                Title: {
                    text: { text: this.item.title }
                },
                User: {
                    text: { text: this.item.username }
                }
            });

            this.title.loadTexture();
            this.timelabel.loadTexture();
            this.time.patch({
                texture: lng.Tools.getRoundRect(this.timelabel.renderWidth + 18, 30, 3),
            });

            this.tag('Image').on('txLoaded', () => {
                this.tag('Image').setSmooth('alpha', 1);
                this.tag('Placeholder').alpha = 0;
            });

            if(this.title.renderWidth >= 360) {

                let pixels = this.title.renderWidth - 380;
                let duration = Math.max(pixels * 0.03, 1.8);

                this.titleAnimation = this.title.animation({
                    duration,
                    repeat: -1,
                    delay: .5,
                    repeatDelay: .5,
                    stopMethod: 'immediate',
                    actions: [
                        {p: 'x', v: {sm: 0, 0: 20, .7: -pixels, .9: -pixels, 1: 20 }}
                    ]
                });

                this.title.text.wordWrapWidth = 360;
            }
        }

        _focus() {
            this.patch({
                smooth: {
                    scale: this.altLargeScale ? this.altLargeScale : 1.1,
                    color: 0xffEEF1F2,
                },
                Title: {
                    smooth: {
                        color: 0xff0D1314,
                    }
                },
                Time: {
                    smooth: {
                        alpha: 1,
                    }
                }
            });

            if(this.titleAnimation) {
                this.title.text.wordWrapWidth = null;
                this.titleAnimation.start();
            }
        }

        _unfocus() {
            this.patch({
                smooth: {
                    scale: this.altScale ? this.altScale : 1,
                    color: 0xff0D1314,
                },
                Title: {
                    smooth: {
                        color: 0xffEEF1F2,
                    }
                },
                Time: {
                    smooth: {
                        alpha: 0,
                    }
                }
            });

            if(this.titleAnimation) {
                this.title.text.wordWrapWidth = 360;
                this.titleAnimation.stop();
            }
        }
    }

    class VimeoUser extends lng.Component {
        static _template() {
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
                            radius: 125,
                        },
                        Image: {
                            w: 250,
                            h: 250,
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
                            maxLines: 1,
                        }
                    },
                    Gradient: {
                        x: 250,
                        w: 30,
                        h: 60,
                        rect: true,
                        mountX: 1,
                        colorLeft: 0x000D1314,
                        colorRight: 0xff0D1314,
                    }
                }
            }
        }

        static getSizes() {
            return {
                w: 250,
                h: 325,
                margin: 60,
                scrollOffset: 1580,
            }
        }

        _init() {
            this.targetScreen = 'User';
            this.label = this.tag('Label');

            this.patch({
                ".Image": {
                    src: Utils.cropImage({url: this.item.getPicture({w: 288}).link, w: 250, h: 250})
                },
                Name: {
                    Label: {
                        text: { text: this.item.name }
                    }
                }
            });

            this.label.loadTexture();

            if(this.label.renderWidth >= 240) {

                let pixels = this.label.renderWidth - 240;
                let duration = Math.max(pixels * 0.03, 1.8);

                this.labelAnimation = this.label.animation({
                    duration,
                    repeat: -1,
                    delay: .5,
                    repeatDelay: .5,
                    stopMethod: 'immediate',
                    actions: [
                        {p: 'x', v: {sm: 0, 0: 15, .7: -pixels, .9: -pixels, 1: 15 }}
                    ]
                });
            }
            else {
                this.tag('Gradient').alpha = 0;
                this.label.patch({
                    x: 125,
                    mountX: .5
                });
            }
        }

        _focus() {
            this.patch({
                Shadow: {
                    smooth: {
                        alpha: 1,
                        scale: 1.1
                    },
                },
                PhotoHolder: {
                    smooth: {
                        scale: 1.1
                    },
                },
                Name: {
                    smooth: { color: 0xffEEF1F2 },
                    Label: {
                        smooth: { color: 0xff0D1314 },
                    },
                    Gradient: {
                        alpha: 0,
                    }
                }
            });

            if(this.labelAnimation) {
                this.labelAnimation.start();
            }
        }

        _unfocus() {
            this.patch({
                Shadow: {
                    smooth: {
                        alpha: 0,
                        scale: 1,
                    },
                },
                PhotoHolder: {
                    smooth: {scale: 1},
                },
                Name: {
                    smooth: { color: 0xff0D1314 },
                    Label: {
                        smooth: { color: 0xffEEF1F2 },
                    },
                    Gradient: {
                        alpha: this.labelAnimation ? 1 : 0,
                    }
                }
            });

            if(this.labelAnimation) {
                this.labelAnimation.stop();
            }
        }
    }

    class VimeoChannel extends lng.Component {
        static _template() {
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
                            radius: 125,
                        },
                        Image: {
                            w: 250,
                            h: 250,
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
                            maxLines: 1,
                        }
                    },
                    Gradient: {
                        x: 250,
                        w: 30,
                        h: 60,
                        rect: true,
                        mountX: 1,
                        colorLeft: 0x000D1314,
                        colorRight: 0xff0D1314,
                    }
                }
            }
        }

        static getSizes() {
            return {
                w: 250,
                h: 325,
                margin: 60,
                scrollOffset: 1580,
            }
        }

        _init() {
            this.targetScreen = 'Channel';
            this.label = this.tag('Label');

            this.patch({
                ".Image": {
                    src: Utils.cropImage({url: this.item.getPicture({w: 288}).link, w: 250, h: 250})
                },
                Name: {
                    Label: {
                        text: { text: this.item.name }
                    }
                }
            });

            this.label.loadTexture();

            if(this.label.renderWidth >= 240) {

                let pixels = this.label.renderWidth - 240;
                let duration = Math.max(pixels * 0.03, 1.8);

                this.labelAnimation = this.label.animation({
                    duration,
                    repeat: -1,
                    delay: .5,
                    repeatDelay: .5,
                    stopMethod: 'immediate',
                    actions: [
                        {p: 'x', v: {sm: 0, 0: 15, .7: -pixels, .9: -pixels, 1: 15 }}
                    ]
                });
            }
            else {
                this.tag('Gradient').alpha = 0;
                this.label.patch({
                    x: 125,
                    mountX: .5
                });
            }
        }

        _focus() {
            this.patch({
                Shadow: {
                    smooth: {
                        alpha: 1,
                        scale: 1.1
                    },
                },
                PhotoHolder: {
                    smooth: {
                        scale: 1.1
                    },
                },
                Name: {
                    smooth: { color: 0xffEEF1F2 },
                    Label: {
                        smooth: { color: 0xff0D1314 },
                    },
                    Gradient: {
                        alpha: 0,
                    }
                }
            });

            if(this.labelAnimation) {
                this.labelAnimation.start();
            }
        }

        _unfocus() {
            this.patch({
                Shadow: {
                    smooth: {
                        alpha: 0,
                        scale: 1,
                    },
                },
                PhotoHolder: {
                    smooth: {scale: 1},
                },
                Name: {
                    smooth: { color: 0xff0D1314 },
                    Label: {
                        smooth: { color: 0xffEEF1F2 },
                    },
                    Gradient: {
                        alpha: this.labelAnimation ? 1 : 0,
                    }
                }
            });

            if(this.labelAnimation) {
                this.labelAnimation.stop();
            }
        }
    }

    // import Def from '../../AppDefinition.js'

    class VimeoSubCategory extends lng.Component {
        static _template() {
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
                        maxLines: 2,
                    }
                }
            }
        }

        static getSizes() {
            return {
                w: 280,
                h: 155,
                margin: 30,
                scrollOffset: 1550,
            }
        }

        _init() {
            this.viewAll = 'videos';

            this.patch({
                // Header: {
                //     src: Def.getPath('img/' + this.bg)
                // },
                Name: {
                    text: {text: this.item.name}
                },
            });
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.1, color: 0xffeef1f2 },
                Name: { smooth: { color: 0xff0D1314 }}
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1, color: 0xff0D1314 },
                Name: { smooth: { color: 0xffeef1f2 }},
            });
        }
    }

    class VimeoList extends lng.Component {
        static _template() {
            return {
                Wrapper: {
                    x: 100,
                    Title: {
                        color: 0xffa3a4a5,
                        text: {
                            fontFace: 'AkkuratPro',
                            fontSize: 42,
                        }
                    },
                    List: {
                        x: 0,
                        y: 80,
                    },
                    Spinner: {
                        type: VimeoSpinner,
                        x: 100,
                        y: 100,
                    }
                }
            }
        }

        _init() {
            const types = {
                videos: VimeoVideo,
                profiles: VimeoUser,
                channels: VimeoChannel,
                subcategories: VimeoSubCategory,
            };
            this.listType = types[this.itemType];
            this.sizes = this.listType.getSizes();


            this.list = this.tag('List');
            this.loader = this.tag('Spinner');

            this.patch({
                Wrapper: {
                    Title: { text: { text: this.title && this.title.toUpperCase() || '' }},
                    List: { y: this.title ? 80 : 0 }
                }
            });

            if(this.items) {
                this.dataLoaded(this.items);
            }
            else if(this.uri) {
                this.loadData();
            }
        }

        loadData() {
            this._setState('Loading');
            this.fireAncestors('$getUriData', { uri: this.uri, type: this.itemType })
                .then((response) => this.dataLoaded(response));
        }

        _handleRight() {
            if(this.index < this.list.children.length -1) {
                this.index ++;
            }
            this.scrollList();
        }

        _handleLeft() {
            if(this.index > 0) {
                this.index--;
            }
            else {
                this.fireAncestors('$openMenu');
            }
            this.scrollList();
        }

        _handleEnter() {
            const focused = this._getFocused();
            if(focused.targetScreen) {
                this.fireAncestors('$viewScreen', focused.targetScreen, focused.item);
            }
            else if(focused.viewAll) {
                this.fireAncestors('$viewAll', focused.item, focused.viewAll);
            }
            else {
                this.fireAncestors('$play', {
                    items: this.items,
                    item: focused.item,
                });
            }
        }

        scrollList() {
            if(this.maxScroll <= 0) return
            let offX = this._getFocused().x - (this.sizes.w + this.sizes.margin);
            this.list.setSmooth('x', -Math.min(Math.max(offX, 0), this.maxScroll));
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.loader.show();
                    }
                    $exit() {
                        this.loader.hide();
                    }
                }
            ]
        }

        dataLoaded(data) {
            const viewAll = data.total && data.total > data.per_page;
            const {w, h, margin, scrollOffset} = this.sizes;

            this.items = this.items || data.items || [];
            this.index = 0;
            this.list.x = 0;

            this.list.children = this.items.map((item, index) => {
                return {
                    type: this.listType,
                    item,
                    index,
                    action: data.action,
                    x: index * (w + margin),
                }
            });

            if(viewAll) {
                this.list.add({
                    w,
                    h,
                    type: VimeoViewAll,
                    viewAll: this.itemType,
                    item: { uri: this.uri, name: this.title },
                    x: this.items.length * (w + margin),
                    total: data.total,
                });
            }

            this.maxScroll = ((this.items.length + (viewAll ? 1 : 0)) * (w + margin)) - scrollOffset;

            this._setState('');
        }

        _getFocused() {
            return this.list.children[this.index] || this
        }
    }

    class VimeoCategory extends lng.Component {
        static _template() {
            return {
                w: 280,
                h: 310,
                rect: true,
                color: 0xff0D1314,
                zIndex: 1,
                Image: {
                    zIndex: 2,
                    w: 280,
                    h: 155,
                },
                Icon: {
                    mount: .5,
                    color: 0xffffffff,
                    x: 140,
                    y: 77,
                    zIndex: 3,
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
                        wordWrapWidth: 270,
                    }
                }
            }
        }

        _init() {
            this.patch({
                Image: {
                    src: AppDefinition.getPath('img/' + this.item.bg)
                },
                Icon: {
                    src: ux.Ui.getImageUrl(this.item.icon)
                },
                Name: {
                    text: {text: this.item.name}
                },
            });
        }

        _focus() {
            this.patch({
                smooth: {scale: 1.1, color: 0xffeef1f2 },
                Name: { smooth: { color: 0xff0D1314 }}
            });
        }

        _unfocus() {
            this.patch({
                smooth: {scale: 1, color: 0xff0D1314 },
                Name: { smooth: { color: 0xffeef1f2 }},
            });
        }
    }

    class VimeoCategoriesGrid extends lng.Component {
        static _template() {
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
                    y: 80,
                }
            }
        }

        _init() {
            this.colIndex = 0;
            this.rowIndex = 0;

            this.list = this.tag('List');
        }

        set items(items) {
            let categories = [];
            this.list.children = items.map((item, index) => {
                if(index % 5 === 0) categories = [];
                categories.push({
                    type: VimeoCategory,
                    x: index % 5 * 310,
                    item,
                });
                if(index % 5 === 4 || index === items.length -1) {
                    return {
                        y: (index / 5 | 0) * 370,
                        children: categories
                    }
                }
            }).filter((element) => !!element);
            this.signal('doneBuilding', { target: 'Languages' });
        }

        _handleLeft() {
            if(this.colIndex > 0) {
                this.colIndex--;
            }
            else {
                this.fireAncestors('$openMenu');
            }
        }
        _handleRight() {
            if(this.colIndex < this.list.children[this.rowIndex].children.length - 1) {
                this.colIndex++;
            }
        }

        _handleEnter() {
            const item = this._getFocused().item;
            this.fireAncestors('$viewScreen', 'Category', item);
        }

        _handleUp() {
            if(this.rowIndex > 0) {
                this.rowIndex--;
                this.scrollScreen();
            }
            else {
                this.signal('staffPicks');
            }
        }

        _handleDown() {
            if(this.rowIndex < this.list.children.length - 1) {
                this.rowIndex++;
                if(this.colIndex > this.list.children[this.rowIndex].children.length - 1) {
                    this.colIndex = this.list.children[this.rowIndex].children.length - 1;
                }
                this.scrollScreen();
            }
        }

        scrollScreen() {
            const y = this.list.children[this.rowIndex].y;
            this.signal('scrollScreen', y);
        }

        _getFocused() {
            return this.list.children.length && this.list.children[this.rowIndex].children[this.colIndex] || this
        }
    }

    class VimeoExplore extends lng.Component {
        static _template() {
            return {
                Teaser: {
                    type: VimeoTeaser,
                    signals: {
                        loaded: '_teaserLoaded',
                        error: '_teaserError',
                        play: true,
                    }
                },
                StaffPicks: {
                    type: VimeoList,
                    title: 'staff picks',
                    itemType: 'videos',
                    y: 670,
                    transitions: {
                        alpha: { duration: .75, delay: .8 },
                        y: { duration: .75, delay: .8 },
                    }
                },
                Categories: {
                    y: 1150,
                    type: VimeoCategoriesGrid,
                    signals: {
                        scrollScreen: true,
                        staffPicks: true,
                        openMenu: true,
                        viewCategory: true,
                    },
                }
            }
        }

        _init() {
            this.teaser = this.tag('Teaser');
            this.staffpicks = this.tag('StaffPicks');
            this.categories = this.tag('Categories');
            this._setState('Loading');
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {}
                    $exit() {
                        this.staffpicks.patch({
                            alpha: 0,
                            y: 750,
                            smooth: {
                                y: 670,
                                alpha: 1,
                            }
                        });
                    }
                    _teaserLoaded() {
                        this._queue--;
                        if (!this._queue) {
                            this._loaded();
                        }
                    }
                    _teaserError() {
                        const items = this.tag('StaffPicks').items;
                        this.tag('Teaser').item = items[Math.floor(Math.random() * items.length)];
                    }
                },
                class Teaser extends this {
                    $enter() {
                        this.scrollScreen(0);
                    }
                    _handleDown() {
                        this._setState('StaffPicks');
                    }
                    _handleLeft() {
                        this.fireAncestors('$openMenu');
                    }
                },
                class StaffPicks extends this {
                    $enter() {
                        this.scrollScreen(-440);
                    }
                    _handleUp() {
                        this._setState('Teaser');
                    }
                    _handleDown() {
                        this._setState('Categories');
                    }
                },
                class Categories extends this {
                    $enter() {
                        this.scrollScreen(0);
                    }
                    scrollScreen(y) {
                        this.setSmooth('y', -(y + 890));
                    }
                    staffPicks() {
                        this._setState('StaffPicks');
                    }
                },
            ]
        }

        _getFocused() {
            return this.tag(this.state) || this
        }

        scrollScreen(y) {
            this.setSmooth('y', y);
        }

        viewCategory(args) {
            this.signal('viewCategory', args);
        }

        set items(sections) {
            sections.forEach((section) => {
                if(section.name === 'StaffPicks') {
                    this.teaser.items = section.items;
                    this.staffpicks.fire('dataLoaded', section);
                }
                else if(section.name === 'Categories') {
                    this.categories.items = section.items;
                }
            });
            this._setState('Teaser');
        }
    }

    class VimeoKeyboard extends lng.Component {
        static _template() {
            return {}
        }

        _init() {
            this.colIndex = 0;
            this.rowIndex = 0;
            this.keyboardEntry = '';
            this.layout = 'default';
            this.style = 'default';
            this.debug = false;
        }

        _handleUp() {
            if(this.rowIndex > 0) {
                this.rowIndex--;
                this.fixColIndex(1);
            }
            else {
                this.signal('outOfBounds', { direction: 'up' }, true);
            }
        }

        _handleDown() {
            if(this.rowIndex < this.children.length - 1) {
                this.rowIndex++;
                this.fixColIndex(-1);
            }
            else {
                this.signal('outOfBounds', { direction: 'down' }, true);
            }
        }

        _handleLeft() {
            if(this.colIndex > 0) {
                this.colIndex--;
            }
            else {
                this.signal('outOfBounds', {direction: 'left'}, true);
            }
        }

        _handleRight() {
            if(this.colIndex < this.children[this.rowIndex].children.length - 1) {
                this.colIndex++;
            }
            else {
                this.signal('outOfBounds', { direction: 'right' }, true);
            }
        }

        mount({ layout, prevEntry = '' }) {
            this.layout = layout;
            this.style = 'default';
            this.reset();
            this.build();
            if(prevEntry) {
                this.keyboardEntry = prevEntry;
            }
        }

        fixColIndex(diff) {
            const prevRow = this.children[this.rowIndex + diff];
            const currRow = this.children[this.rowIndex];
            const prevKey = prevRow.children[this.colIndex];
            this.colIndex = currRow.children.findIndex((key) => currRow.x + key.x + key.w >= prevRow.x + prevKey.x + prevKey.w/3);
            if(this.colIndex === -1) {
                this.colIndex = this.children[this.rowIndex].children.length -1;
            }
        }

        build() {
            const layouts = {
                default: {
                    default: [
                        ['1234567890'],
                        ['qwertyuiop'],
                        ['asdfghjkl.'],
                        [{l: 'aA', a: 'caps'}, 'zxcvbnm_-'],
                        [{l: '!#$', a: 'special', w: 150}, {l:' ', a: 'space', w: 381}, {i: '', a: 'delete', w: 227}],
                    ],
                    caps: [
                        ['1234567890'],
                        ['QWERTYUIOP'],
                        ['ASDFGHJKL.'],
                        [{l: 'Aa', a: 'default'}, 'ZXCVBNM_-'],
                        [{l: '!#$', a: 'special', w: 150}, {l:' ', a: 'space', w: 381}, {i: '', a: 'delete', w: 227}],
                    ],
                    special: [
                        ['!"#$%&\'()*'],
                        ['+,-./:;<=>'],
                        ['?@[\\]_₹{|}'],
                        [{l: 'aA', a: 'default'}, '~€^æØø₤ȪȰ'],
                        [{l: 'abc', a: 'default', w: 150}, {l:' ', a: 'space', w: 381}, {i: '', a: 'delete', w: 227}],
                    ],
                },
                email: {
                    default: [
                        ['1234567890'],
                        ['qwertyuiop'],
                        ['asdfghjkl.'],
                        [{l: 'aA', a: 'caps'}, 'zxcvbnm_-'],
                        [{l: '@hotmail.com', w: 253, h: 58, s: 28}, {l: '@gmail.com', w: 253, h: 58, s: 28}, {l:'@yahoo.com', w: 252, h: 58, s: 28}],
                        [{l: '!#$', a: 'special', w: 150}, {l:'@', w: 150},'.', {l: '.com', w: 150}, {i: '', a: 'delete', w: 227}],
                    ],
                    caps: [
                        ['1234567890'],
                        ['QWERTYUIOP'],
                        ['ASDFGHJKL.'],
                        [{l: 'Aa', a: 'default'}, 'ZXCVBNM_-'],
                        [{l: '@hotmail.com', w: 253, h: 58, s: 28}, {l: '@gmail.com', w: 253, h: 58, s: 28}, {l:'@yahoo.com', w: 252, h: 58, s: 28}],
                        [{l: '!#$', a: 'special', w: 150}, {l:'@', w: 150},'.', {l: '.com', w: 150}, {i: '', a: 'delete', w: 227}],
                    ],
                    special: [
                        ['!"#$%&\'()*'],
                        ['+,-./:;<=>'],
                        ['?@[\\]_₹{|}'],
                        [{l: 'aA', a: 'default'}, '~€^æØø₤ȪȰ'],
                        [{l: '@hotmail.com', w: 253, h: 58, s: 28}, {l: '@gmail.com', w: 253, h: 58, s: 28}, {l:'@yahoo.com', w: 252, h: 58, s: 28}],
                        [{l: 'abc', a: 'default', w: 150}, {l:'@', w: 150},'.', {l: '.com', w: 150}, {i: '', a: 'delete', w: 227}],
                    ],
                },
                search: {
                    default: [
                        ['abcdefgh', {i: '', a: 'delete'}],
                        ['ijklmnopq'],
                        ['rstuvwxyz'],
                        [{l: '12@$', a: 'special'}, {l:'space', a: 'space', w: 1180}, {l: 'clear', a: 'clear'} ],
                    ],
                    special: [
                        ['123@#$%&+'],
                        ['456()*:;-'],
                        ['7890,./?!'],
                        [{l: 'ABC', a: 'default'}, {l:'space', a: 'space', w: 1180}, {l: 'clear', a: 'clear'} ],
                    ],
                }
            };

            const keys = layouts[this.layout][this.style];
            let offsetY = 0;

            this.children = keys.map((row, rowIndex) => {
                let keys = [];
                let offsetX = 0;

                row.map((key, keyIndex) => {
                    if(keyIndex === 0) {
                        offsetY += (typeof key === 'string' ? 70 : key.h + 10 || 70);
                    }
                    if(typeof key === 'string') {
                        key.split('').map((k) => {
                            keys.push({
                                type: VimeoKeyboardKey,
                                x: offsetX,
                                key: k,
                                signals: { keyPress: true },
                            });
                            offsetX += 170;
                        }); 
                    }
                    else {
                        keys.push({
                            type: VimeoKeyboardKey,
                            key,
                            x: offsetX,
                            signals: { keyPress: true },
                        });
                        offsetX += key.w && key.w + 10 || 170;
                    }
                });

                return {
                    x: this.centerLayout ? -offsetX/2 : 0,
                    y: offsetY - (row[0].h && row[0].h + 10 || 70),
                    children: keys
                }
            });

            if(this.debug) {
                console.log(`layout: ${this.layout} style: ${this.style} keys: \n`, this.children.map((row) => {
                    return row.children.map((key) => key.key)
                }));
            }
        }

        keyPress({ key }) {
            this.handleKey(key);
        }

        handleKey(key) {
            let changed = true;
            if(key.r) this.rowIndex = key.r;
            if(!key.a) {
                this.keyboardEntry += key.l || key;
            }
            else {
                let action = key.a;
                if(action === 'delete') {
                    this.keyboardEntry = this.keyboardEntry.substr(0, this.keyboardEntry.length - 1);
                }
                else if(action === 'space') {
                    this.keyboardEntry = this.keyboardEntry += ' ';
                }
                else if(action === 'clear') {
                    this.keyboardEntry = '';
                }
                else {
                    this.style = key.a;
                    changed = false;
                    this.build();
                }
            }
            if(changed) {
                this.signal('keyboardUpdated', this.keyboardEntry);
            }
        }

        reset() {
            this.keyboardEntry = '';
            this.rowIndex = 0;
            this.colIndex = 0;
        }

        unmount() {
            this.children = [];
            this.reset();
        }

        _getFocused() {
            return this.children.length && this.children[this.rowIndex].children[this.colIndex] || this
        }
    }

    class VimeoKeyboardKey extends lng.Component {
        static _template() {
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
            }
        }

        _init() {
            let key = this.key.i || this.key.l || this.key;
            let width = this.key.w || 160;
            let height = this.key.h || 60;
            let fontface = this.key.i ? 'Font-Awesome' : 'AkkuratPro';

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
                        fontSize: this.key.s || 34,
                    }
                }
            });
        }

        _focus() {
            this.patch({ color: 0xfff1f1f1, Label: { color: 0xff0D1314 } });
        }

        _unfocus() {
            this.patch({ color: 0xff0D1314, Label: { color: 0xfff1f1f1 } });
        }

        _handleEnter() {
            this.signal('keyPress', { key: this.key }, true);
        }
    }

    class VimeoSearchInput extends lng.Component {
        static _template() {
            return {
                Label: {
                    y: -5,
                    color: 0xffA3A4A5,
                    text: {
                        fontFace: 'AkkuratPro',
                        fontSize: 42,
                    }
                },
                BorderBottom: {
                    y: 52,
                    rect: true,
                    w: 1520,
                    h: 3,
                    color: 0xff484A4E,
                }
            }
        }
        _init() {
            this.tag('Label').patch({ text: { text: this.placeholder }});
        }
        updateEntry(entry = false) {
            this.patch({
                Label: {
                    color: entry ? 0xffEEF1F2 : 0xffA3A4A5,
                    text: { text: entry ? entry : this.placeholder }
                }
            });
        }
    }

    class VimeoSearchTabs extends lng.Component {
        static _template() {
            return {}
        }
        _init() {
            this.index = 0;
            this.selected = 0;

            this.children = ['videos','channels','people']
                .map((labelText, index) => {
                    return {
                        type: VimeoSearchTab,
                        x: index * 510,
                        selected: index === this.selected,
                        labelText
                    }
                });
        }

        _handleLeft() {
            if(this.index > 0) {
                this.index--;
            }
            else {
                this.fireAncestors('$openMenu');
            }
        }
        _handleRight() {
            if(this.index < this.children.length - 1) {
                this.index++;
            }
        }

        _handleEnter() {
            if(this.selected === this.index) return

            this.children[this.selected].fire('unselect');
            this.selected = this.index;
            this.children[this.index].fire('select');

            this.signal('tabSelected', this.children[this.selected].labelText);
        }

        reset() {
            this.index = 0;
            if(this.selected === 0) return
            this.children[this.selected].fire('unselect');
            this.selected = 0;
            this.children[0].fire('select', true);
        }

        _getFocused() {
            return this.children[this.index]
        }
    }

    class VimeoSearchTab extends lng.Component {
        static _template() {
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
                        fontSize: 28,
                    }
                }
            }
        }

        _init() {
            this.patch({
                Label: {
                    text: { text: this.labelText.toUpperCase() }
                }
            });

            if(this.selected) {
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

        select(reset = false) {
            this.selected = true;
            if(reset) {
                this.patch({
                    color: 0xff37434A,
                    Label: {
                        color: 0xffEEF1F2,
                    }
                });
            }
        }

        unselect() {
            this.selected = false;
            this.patch({
                smooth: {
                    color: 0xff0D1314
                },
                Label: {
                    color: 0xfff1f1f1,
                }
            });
        }

        _focus() {
            this.patch({
                smooth: {
                    color: 0xffEEF1F2,
                },
                Label: {
                    color: 0xff0D1314,
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: {
                    color: this.selected ? 0xff37434A : 0xff0D1314
                },
                Label: {
                    color: this.selected ? 0xffEEF1F2 : 0xfff1f1f1,
                }
            });
        }
    }

    class VimeoSearch extends lng.Component {
        static _template() {
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
                        zIndex: 2,
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
                    },
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
                                fontFace: 'AkkuratPro',
                            }
                        }
                    },
                    Results: {
                        alpha: 0,
                        y: 80,
                        transitions: {
                            alpha: { duration: .75, delay: .1 }
                        },
                    },
                    Spinner: {
                        x: 860,
                        y: 220,
                        type: VimeoSpinner,
                    },
                    Tabs: {
                        x: 100,
                        y: 450,
                        type: VimeoSearchTabs,
                        signals: {
                            tabSelected: true,
                            openMenu: true,
                        }
                    },
                    Keyboard: {
                        x: 100,
                        y: 540,
                        type: VimeoKeyboard,
                        signals: {
                            keyboardUpdated: true,
                            outOfBounds: true,
                        }
                    }
                }
            }
        }

        _init() {
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

        static _states() {
            return [
                class Tabs extends this {
                    _getFocused() {
                        return this.tabs
                    }
                    _handleUp() {
                        if(this.hasResults) {
                            this._setState('Results');
                        }
                    }
                    _handleDown() {
                        this._setState('Keyboard');
                    }
                },
                class Results extends this {
                    _getFocused() {
                        return this.results.children[0]
                    }
                    _handleDown() {
                        this._setState('Tabs');
                    }
                },
                class Keyboard extends this {
                    _getFocused() {
                        return this.keyboard
                    }
                },
            ]
        }

        outOfBounds({ direction }) {
            if(direction === 'left') {
                this.fireAncestors('$openMenu');
            }
            if(direction === 'up') {
                this._setState('Tabs');
            }
        }

        mountKeyboard(options) {
            this.keyboard.fire('mount', options);
        }

        unmountKeyboard() {
            this.keyboard.fire('unmount');
        }

        tabSelected(type) {
            this.searchType = type;
            this.keyboardUpdated(this.inputEntry);
        }

        reset() {
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

        keyboardUpdated(entry = false) {
            this.inputEntry = entry;
            this.input.fire('updateEntry', entry);
            this.hasResults = false;

            this.results.alpha = 0;
            this.results.children = [];
            this.noresults.alpha = 0;

            if(entry && entry.trim().length >= 1) {
                this.spinner.show();
                this.fireAncestors('$searchTerm', entry, this.searchType)
                    .then((results) => this.handleSearchResults(results));
            }
        }

        handleSearchResults({ type, items, query }) {
            if(type !== this.searchType || query !== this.inputEntry) {
                return
            }
            this.spinner.hide();

            this.hasResults = !!items.length;
            if(items.length) {
                this.results.add({
                    type: VimeoList,
                    itemType: type === 'people' ? 'profiles' : type,
                    items
                });
                this.results.setSmooth('alpha', 1);
            }
            else {
                this.results.alpha = 0;
                this.noresults.patch({
                    alpha: 0.00001,
                    Keyword: {
                        text: { text: query }
                    }
                });
                this.tag('Keyword').loadTexture();
                this.noresults.patch({
                    w: 235 + this.tag('Keyword').renderWidth,
                    smooth: { alpha: 1 }
                });
            }
        }
    }

    class VimeoBackButton extends lng.Component {
        static _template() {
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
                        text: 'BACK',
                    }
                }
            }
        }

        _focus() {
            this.patch({
                smooth: {
                    scale: 1,
                    color: 0xFFEEF1F2,
                },
                Label: {
                    smooth: {
                        color: 0xff0D1314,
                    }
                }
            });
        }

        _unfocus() {
            this.patch({
                smooth: {
                    scale: .8,
                    color: 0xff0D1314,
                },
                Label: {
                    smooth: {
                        color: 0xFFEEF1F2,
                    }
                }
            });
        }
    }

    class VimeoLogin extends lng.Component {
        static _template() {
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
                        zIndex: 2,
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
                    },
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
                    type: VimeoSpinner,
                },
                Back: {
                    type: VimeoBackButton,
                    signals: {
                        backButton: true
                    }
                }
            }
        }

        _init() {
            this.spinner = this.tag('Spinner');
            this.code = this.tag('Code');
            this._setState('Loading');
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.spinner.fire('show');
                    }
                    $exit() {
                        this.spinner.fire('hide');
                    }
                },
                class Pooling extends this {
                    $enter() {
                        this.code.setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.code.alpha = 0;
                    }
                }
            ]
        }

        _getFocused() {
            return this.tag('Back')
        }

        _handleEnter() {
            this.signal('backButton');
        }

        _handleLeft() {
            this.fireAncestors('$openMenu');
        }

        reset() {
            this._setState('Loading');
        }

        dataLoaded(data) {
            this.code.patch({
                text: {
                    text: 'link: ' + data.activate_link + '\ncode: ' + data.user_code
                }
            });
            this._setState('Pooling');
        }

        userAuthenticated(user) {
            this.code.patch({
                text: {
                    text: 'welcome ' + user.name +'! 🎉👍\n\n //show some stuff, change screen, call mom, etc...\n//btw, emojis work on Lightning 🙃'
                }
            });
        }
    }

    class VimeoMenuItem extends lng.Component {

        static _template() {
            return {
                zIndex: 3,
                Icon: {
                    mount: .5,
                    x: 50,
                    y: 40,
                    zIndex: 2,
                    color: 0xfff1f1f1,
                    pivot: 0,
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

        set listindex(v) {
            this._listindex = v[0];
            this._delayIndex = v[1];
        }

        _toggle(t) {
            this.patch({
                transitions: {
                    y: { duration: 0.6, delay: (t ? this._delayIndex : this._listindex) * 0.1 + 0.05}
                },
                smooth: {
                    y: t ? this._listindex * 90 + 63 : this._listindex * 70
                },
                Icon: {
                    transitions: {
                        scale: {duration: 0.1, delay: (t ? this._delayIndex : this._listindex) * 0.1 + 0.05}
                    },
                    smooth: {scale: t ? 1 : 0.73}
                },
                Label: {
                    transitions: {
                        alpha: {duration: 0.2, delay: (t ? this._delayIndex : this._listindex) * 0.1 + 0.05},
                    },
                    smooth: {
                        alpha: t ? 1 : 0,
                    },
                },
            });
        }

        _init() {
            this.patch({
                Icon: {
                    src: AppDefinition.getPath(`img/${this.label.toLowerCase()}.png`),
                    scale: 0.73,
                },
                Label: {text: this.label.toUpperCase()}
            });
            this._setState("Collapsed");
        }

        _focus() {
            this.patch({
                Label: {
                    smooth: { color: 0xff0D1314 }
                },
                Icon: {
                    smooth: { color: 0xff0D1314 }
                },
            });
        }

        _unfocus() {
            this.patch({
                Label: {smooth: {color: 0xfff1f1f1 }},
                Icon: {smooth: {color: 0xfff1f1f1 }},
            });
        }

        static _states() {
            return [
                class Expanded extends this {
                    $enter() {
                        this._toggle(true);
                    }
                    collapse() {
                        this._setState("Collapsed");
                    }
                },
                class Collapsed extends this {
                    $enter() {
                        this._toggle(false);
                    }
                    expand() {
                        this._setState("Expanded");
                    }
                }
            ]
        }
    }

    class VimeoMenu extends lng.Component {
        static _template() {
            return {
                alpha: 1,
                x: -150,
                zIndex: 5,
                transitions: {
                    x: { duration: 0.6, delay: 0}
                },
                Shadow: {
                    w: 200,
                    h: 1080,
                    rect: true,
                    colorLeft: 0xff000000,
                    colorRight: 0x00000000,
                },
                Wrapper: {
                    w: 150,
                    h: 1080,
                    color: 0xff37434a,
                    rect: true,
                    Gradient: {
                        x: 150,
                        src: AppDefinition.getPath('img/vimeo-line.png'),
                    },
                    FocusIndicator: {
                        alpha: 0,
                        x: 110,
                        y: 120,
                        zIndex: 2,
                        transitions: {
                            x: { duration: 0.7, delay: 0.8},
                        },
                        Shadow: {
                            color: 0xff000000,
                            alpha: 0.5,
                            texture: lng.Tools.getShadowRect(440, 80, 7, 4, 5),
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
                            texture: lng.Tools.getRoundRect(60, 60, 30, 0, 0x00000000, true, 0xff282E32),
                        }
                    },
                    Items: {
                        x: 57,
                        y: 77,
                    }
                },
            };
        }

        static _states() {
            return [
                class Expanded extends this {
                    $enter() {
                        this.focusIdx = this.activeIdx || 0;
                    }
                    _handleUp() {
                        if (this.focusIdx === 0) {
                            this.focusIdx = this.list.length - 1;
                        } else {
                            this.focusIdx--;
                        }
                        this.repositionFocus();
                    }
                    _handleDown() {
                        if (this.focusIdx === this.list.length - 1) {
                            this.focusIdx = 0;
                        } else {
                            this.focusIdx++;
                        }
                        this.repositionFocus();
                    }
                    _handleEnter() {
                        this.activeIdx = this.focusIdx;
                        this.signal('optionSelect', this.active.label);
                    }
                    _handleRight() {
                        this.close();
                    }
                    _getFocused() {
                        return this.active
                    }
                },
                class Expanding extends this {
                    _captureKey({keyCode}) {
                        if(keyCode === 39 || keyCode === 8) {
                            this.close();
                        }
                    }
                },
                class Collapsing extends this {
                    _captureKey({keyCode}) {
                        if(keyCode === 37) {
                            this.open();
                        }
                    }
                },
                class Collapsed extends this {
                    $enter() {
                        this.signal('menuClosed');
                    }
                }
            ]
        }

        _init() {
            this.tag('Items').children = ['Search',  'Feed', 'Explore', 'Library', 'Profile']
                .map((label, idx, arr) => {
                    if(label === 'Explore') {
                        this.focusIdx = idx;
                        this.activeIdx = idx;
                    }
                    return {
                        type: VimeoMenuItem,
                        label,
                        y: idx * 90,
                        listindex: [idx, arr.length - idx]
                    }
                });

            this.tag('FocusIndicator').transition('x').on('finish', () => {
                if(this.tag('FocusIndicator').x === 70) {
                    this._setState('Expanded');
                }
            });

            this.tag('Wrapper').transition('w').on('finish', () => {
                if(this.tag('Wrapper').w === 150) {
                    this._setState('Collapsed');
                }
            });

            this.tag('SelectedIndicator').y = this.activeIdx * 70 + 80;

            this._setState('Collapsed');
        }

        open() {
            this.toggle(true);
            this._setState('Expanding');
        }

        close() {
            this.toggle(false);
            this._setState('Collapsing');
        }

        toggle(t) {
            this.signal('toggleOverlay', t);

            this.patch({
                Shadow: {
                    transitions: {
                        w: {duration: 0.5, delay: t ? 0 : 0.5}
                    },
                    smooth: {w: t ? 1100 : 200}
                },
                Wrapper: {
                    transitions: {
                        w: {duration: 0.5, delay: t ? 0 : 0.5}
                    },
                    smooth: { w: t ? 490 : 150},
                    Gradient: {
                        transitions: {
                            x: {duration: 0.5, delay: t ? 0 : 0.5},
                        },
                        smooth: {x: t ? 490 : 150}
                    },
                    FocusIndicator: {
                        zIndex: 2,
                        smooth: {
                            x: t ? [70, {duration: 0.2, delay: 0.6}] : [120, {duration: 0.2}],
                            alpha: t ? [1, {duration: 0.2, delay: 0.6}] : [0, {duration: 0.2}],
                            y: (t ? this.activeIdx : this.focusIdx) * 90 + 140
                        }
                    },
                    SelectedIndicator: {
                        y: t ? this.activeIdx * 90 + 140 : this.activeIdx * 70 + 80,
                        Expanded: {
                            transitions: {
                                alpha: {
                                    duration: t ? .2 : 0,
                                    delay: t ? 0.6 : 0,
                                }
                            },
                            smooth: { alpha: t ? 1 : 0 }
                        },
                        Collapsed: {
                            transitions: {
                                alpha: {
                                    duration: t ? 0 : .2,
                                    delay: t ? 0 : 0.9,
                                }
                            },
                            smooth: { alpha: t ? 0 : 1 }
                        }
                    },
                    Items: {
                        smooth: {
                            x: t ? [70, { duration: 0.4, delay: 0.2 }] : [57, { duration: 0.5, delay: 0.6}],
                        },
                    }
                },

            });

            this.list.forEach(item => item.fire(t ? 'expand' : 'collapse'));
        }

        repositionFocus() {
            this.tag('FocusIndicator').setSmooth('y', this._getFocused().y + 77);
            this.tag('Expanded').alpha = +(this.focusIdx !== this.activeIdx);
        }

        reveal() {
            this.setSmooth('x', 0);
        }

        changeSelection(selection) {
            this.activeIdx = this.list.findIndex((o) => o.label === selection);
            this.tag('SelectedIndicator').setSmooth('y', this.activeIdx * 70 + 80);
        }

        _handleBack() {
            this.close();
        }

        get list() {
            return this.tag('Items').childList.get()
        }

        get active() {
            return this.list[this.focusIdx]
        }

        get previousActive() {
            return this.list[this.activeIdx]
        }
    }

    class VimeoHeader extends lng.Component {
        static _template() {
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
                        color: lng.StageUtils.mergeColors(0xff131920, 0xffffffff, 0.3),
                    },
                },
                Shadow: {
                    w: 1770,
                    h: 20,
                    rect: true,
                    colorTop: 0x00000000,
                    colorBottom: 0x55000000,
                    y: 136,
                    mountY: 1,
                    zIndex: 2,
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
                            radius: 75,
                        },
                        Image: {
                            w: 150,
                            h: 150,
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
                        fontStyle: 'bold',
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
                        fontFace: 'AkkuratPro',
                    }
                },
                Back: {
                    type: VimeoBackButton,
                    signals: {
                        backButton: true
                    }
                }
            }
        }

        update(data) {
            this.patch({
                Wrapper: {
                    Background: {
                        alpha: data.bg ? 1 : 0,
                        src: data.bg ? AppDefinition.getPath('img/' + data.bg) : null,
                    }
                },
                Title: {
                    x: data.photo ? 1540 : 1620,
                    y: data.subtitle ? 40 : 36,
                    text: {
                        fontSize: data.subtitle ? 42 : 64,
                        text: data.title,
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

        _getFocused() {
            return this.tag('Back')
        }
    }

    class VimeoGrid extends lng.Component {
        static _template() {
            return {
                x: 100,
                Title: {
                    Main: {
                        color: 0xffA3A4A5,
                        text: {
                            fontFace: 'AkkuratPro',
                            fontSize: 42,
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
                            fontSize: 42,
                        }
                    }
                },
                List: {
                    x: -25,
                    y: 56,
                },
                Spinner: {
                    type: VimeoSpinner,
                    x: 765,
                    y: 370,
                }
            }
        }

        _init() {
            const types = {
                videos: VimeoVideo,
                profiles: VimeoUser,
                category: VimeoCategory,
            };
            this.gridType = types[this.itemType];
            this.sizes = this.gridType.getSizes();

            this.colIndex = 0;
            this.rowIndex = 0;
            this.items = [];
            this.page = 1;

            this.list = this.tag('List');
            this.spinner = this.tag('Spinner');

            if(this.title) {
                this.patch({
                    Title: {
                        Main: {
                            alpha: this.title ? 0.0001 : 1,
                            text: { text: this.title.toUpperCase() }
                        },
                        Arrow: { alpha: 0 },
                        Sub: {
                            text: { text: (this.subtitle || '').toUpperCase() },
                            alpha: 0
                        }
                    },
                    List: { y: 56 }
                });
                if(this.subtitle) {
                    this.tag('Main').loadTexture();
                    this.patch({
                        Title: {
                            Main: { alpha: 1 },
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
            }
            else {
                this.patch({
                    Title: { alpha: 0 },
                    List: { y: 0 }
                });
            }

            this.loadData();
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.spinner.show();
                    }
                    $exit() {
                        this.spinner.hide();
                    }
                }
            ]
        }

        reset() {
            this.colIndex = 0;
            this.rowIndex = 0;
            this.page = 1;
            this.next = 1;
            this.items = [];
            this.list.children = [];
            this.spinner.y = 370;
        }

        get screenState() {
            return {
                index: [this.colIndex, this.rowIndex],
                page: this.page
            }
        }

        set screenState(state) {
            if(!state) return
            this.colIndex = state.index[0];
            this.rowIndex = state.index[1];
            this.page = state.page;
            //get data from api
        }

        loadData() {
            if(!this.uri) return //TODO: delete this line after refactor
            this._setState('Loading');

            this.fireAncestors('$getUriData', { uri: this.uri, page: this.next, type: this.itemType })
                .then((response) => this.dataLoaded(response));
        }

        dataLoaded(data) {
            const {w, h, margin, scrollOffset} = this.sizes;
            let rows = [];
            const offsetY = this.list.children.length * 350;

            this.page = data.page;
            this.next = Math.ceil(data.total / data.per_page) > this.page ? this.page + 1 : false;

            this.list.add(data.items.map((item, index) => {
                this.items.push(item);
                if(index % 4 === 0) rows = [];
                rows.push({
                    type: this.gridType,
                    x: index % 4 * 390,
                    item,
                    scale: this.itemType === 'videos' ? 0.875 : 1,
                    altScale: 0.875,
                    altLargeScale: 0.975,
                });
                if(index % 4 === 3 || index === data.items.length -1) {
                    return {
                        y: ((index / 4 | 0) * 350) + offsetY,
                        children: rows
                    }
                }
            }).filter((element) => !!element));

            this._setState('Grid');
        }

        _handleEnter() {
            const item = this._getFocused().item;
            this.fireAncestors('$play', {
                items: this.items,
                item,
            });
        }

        _handleLeft() {
            if(this.colIndex > 0) {
                this.colIndex--;
            }
            else {
                this.fireAncestors('$openMenu');
            }
        }
        _handleRight() {
            if(this.colIndex < this.list.children[this.rowIndex].children.length - 1) {
                this.colIndex++;
            }
        }

        _handleUp() {
            if(this.rowIndex > 0) {
                this.rowIndex--;
                this.scrollScreen();
            }
            else {
                this.fireAncestors('$outOfBounds', 'up');
            }
        }

        _handleDown() {
            if(this.rowIndex < this.list.children.length - 1) {
                this.rowIndex++;
                if(this.colIndex > this.list.children[this.rowIndex].children.length - 1) {
                    this.colIndex = this.list.children[this.rowIndex].children.length - 1;
                }
                this.scrollScreen();
            }
            if(this.state !== 'Loading' && this.rowIndex > this.list.children.length - 2 && this.next) {
                this.loadData();
            }
        }

        scrollScreen() {
            const y = this.list.children[this.rowIndex].y;
            this.spinner.y = this.list.children.length * 350 + 150;

            this.fireAncestors('$scrollScreen', y);
        }

        _getFocused() {
            return this.list.children.length && this.list.children[this.rowIndex].children[this.colIndex] || this
        }
    }

    class VimeoTimelineItem extends lng.Component {
        static _template() {
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
                        lineHeight: 32,
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
                            alpha: .3,
                        }
                    },
                    Image: {
                        w: 480,
                        h: 270,
                        zIndex: 2,
                        alpha: 0.00001,
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
                    },
                },
            }

        }

        _init() {
            this.video = this.tag('Video');
            this.title = this.video.tag('Title');
            this.time = this.video.tag('Time');
            this.timelabel = this.time.tag('Label');
            this.shadow = this.tag('Shadow');
            this.infos = this.tag('Infos');

            this.infos.patch({
                text: {
                    text: 'Uploaded ' + Utils.dateToText(this.item.date) + '\n \n'
                        + 'Plays: ' + Utils.formatSocialStat(this.item.plays) + '\n'
                        + 'Likes: ' + Utils.formatSocialStat(this.item.likes)
                }
            });

            this.video.patch({
                Image: {
                    src: Utils.cropImage({ url: this.item.getPicture({w: 640}).link, w: 400, h: 215})
                },
                Time: {
                    Label: { text: { text: Utils.secondsToTime(this.item.duration)}}
                },
                Title: {
                    text: { text: this.item.title }
                },
                User: {
                    text: { text: this.item.username }
                }
            });

            this.title.loadTexture();
            this.timelabel.loadTexture();

            this.time.patch({
                texture: lng.Tools.getRoundRect(this.timelabel.renderWidth + 18, 30, 3),
            });

            this.tag('Image').on('txLoaded', () => {
                this.tag('Image').setSmooth('alpha', 1);
                this.tag('Placeholder').alpha = 0;
            });
        }

        _focus() {
            this.video.patch({
                smooth: {
                    scale: 1.1,
                    color: 0xffEEF1F2,
                },
                Title: {
                    smooth: {
                        color: 0xff0D1314,
                    }
                },
                Time: {
                    smooth: {
                        alpha: 1,
                    }
                }
            });

            this.shadow.patch({
                smooth: {
                    color: 0x22000000,
                    alpha: .5,
                    scale: 1.1,
                }
            });

            if(this.titleAnimation) {
                this.title.text.wordWrapWidth = null;
                this.titleAnimation.start();
            }
        }

        _unfocus() {
            this.video.patch({
                smooth: {
                    scale: 1,
                    color: 0xff0D1314,
                },
                Title: {
                    smooth: {
                        color: 0xffEEF1F2,
                    }
                },
                Time: {
                    smooth: {
                        alpha: 0,
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

            if(this.titleAnimation) {
                this.title.text.wordWrapWidth = 360;
                this.titleAnimation.stop();
            }
        }
    }

    class VimeoTimeline extends lng.Component {
        static _template() {
            return {
                List: {
                    x: 100,
                    y: -30,
                },
                Spinner: {
                    type: VimeoSpinner,
                    x: 860,
                    y: 370,
                }
            }
        }

        _init() {
            this.colIndex = 0;
            this.rowIndex = 0;
            this.items = [];
            this.page = 1;

            this.list = this.tag('List');
            this.spinner = this.tag('Spinner');

            this.loadData();
        }

        reset() {
            this.colIndex = 0;
            this.rowIndex = 0;
            this.page = 1;
            this.items = [];
            this.list.children = [];
            this.spinner.y = 370;
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        this.spinner.show();
                    }
                    $exit() {
                        this.spinner.hide();
                    }
                }
            ]
        }

        loadData() {
            this._setState('Loading');

            this.fireAncestors('$getUriData', { uri: this.uri, page: this.next })
                .then((response) => this.dataLoaded(response));
        }

        dataLoaded(data) {
            this.page = data.page;
            this.next = Math.ceil(data.total / data.per_page) > this.page ? this.page + 1 : false;

            let rows = [];
            const offsetY = this.list.children.length * 432;
            this.list.add(data.items.map((item, index) => {
                this.items.push(item);
                if(index % 2 === 0) rows = [];
                rows.push({
                    type: VimeoTimelineItem,
                    x: index % 2 * 790,
                    item,
                });
                if(index % 2 === 1 || index === data.items.length -1) {
                    return {
                        y: ((index / 2 | 0) * 432) + offsetY,
                        children: rows
                    }
                }
            }).filter((element) => !!element));

            this._setState('');
        }

        _handleLeft() {
            if(this.colIndex > 0) {
                this.colIndex--;
            }
            else {
                this.fireAncestors('$openMenu');
            }
        }
        _handleRight() {
            if(this.colIndex < this.list.children[this.rowIndex].children.length - 1) {
                this.colIndex++;
            }
        }

        _handleEnter() {
            const item = this._getFocused().item;
            this.fireAncestors('$play', {
                items: this.items,
                item,
            });
        }

        _handleUp() {
            if(this.rowIndex > 0) {
                this.rowIndex--;
                this.scrollScreen();
            }
            else {
                this.fireAncestors('$outOfBounds', 'up');
            }
        }

        _handleDown() {
            if(this.rowIndex < this.list.children.length - 1) {
                this.rowIndex++;
                if(this.colIndex > this.list.children[this.rowIndex].children.length - 1) {
                    this.colIndex = this.list.children[this.rowIndex].children.length - 1;
                }
                this.scrollScreen();
            }
            if(this.state !== 'Loading' && this.rowIndex >= this.list.children.length - 1 && this.next) {
                this.loadData();
            }
        }

        scrollScreen() {
            const y = this.list.children[this.rowIndex].y;
            this.spinner.y = this.list.children.length * 432 + 50;
            this.fireAncestors('$scrollScreen', y);
        }

        _getFocused() {
            return this.list.children.length && this.list.children[this.rowIndex].children[this.colIndex] || this
        }
    }

    class VimeoScreen extends lng.Component {
        static _template() {
            return {
                Header: {
                    type: VimeoHeader
                },
                Content: {
                    y: 209,
                },
                Spinner: {
                    type: VimeoSpinner,
                    x: 860,
                    y: 470,
                }
            }
        }

        _init() {
            this.header = this.tag('Header');
            this.content = this.tag('Content');
            this.spinner = this.tag('Spinner');
            this.index = 0;
        }

        build({ screenName, data = false, componentStates = false, y = 0, index = 0 }) {
            this.screenName = screenName;
            this.data = data;
            this.componentStates = componentStates;
            this.uris = [];

            this.index = index;
            this.y = y;

            const screen = this.getScreenStructure(screenName, data);

            this.reset();

            this.tag('Header').fire('update', screen.header);

            if(screen.loadData) {
                this.fireAncestors(screen.loadData.path, screen.loadData.item)
                    .then((response) => this.components = response);
                this._setState('Loading');
            }
            else {
                this.components = screen.components || [];
            }
        }

        get components() {
            return this.tag('Content').children
        }

        set components(components) {
            const componentTypes = {
                list: VimeoList,
                grid: VimeoGrid,
                timeline: VimeoTimeline,
            };
            const listItemTypes = {
                videos: VimeoVideo,
                channels: VimeoChannel,
                profiles: VimeoUser,
                subcategories: VimeoSubCategory,
            };
            let offsetY = 0;
            this.uris = [];

            this.content.children = components.map((component, index) => {
                const { type, title = '', subtitle = '', uri, itemType = '', items = '' } = component;
                let child = {
                    type: componentTypes[type],
                    title,
                    subtitle,
                    uri,
                    itemType,
                    items,
                    screenState: this.componentStates && this.componentStates[index] || false,
                    y: offsetY,
                };
                if(components.length > 1) {
                    offsetY += listItemTypes[itemType].getSizes().h + 50 + (title ? 90 : 0);
                }
                this.uris.push(uri);
                return child
            });

            this._setState('');
        }

        get pageState() {
            return {
                screenName: this.screenName,
                data: this.data,
                componentStates: this.components.map((component) => component.state),
                index: this.index,
                y: this.y,
                uris: this.uris, //for api data cleaning
            }
        }

        set pageState(state) {
            this.build(state);
        }

        getScreenStructure(screenName, data = false) {
            if(screenName === 'Feed') {
                return {
                    login: true,
                    header: { title: 'Feed' },
                    components: [
                        { type: 'timeline', content: 'videos', title: '', uri: '/me/feed' }
                    ]
                }
            }
            if(screenName === 'Profile' || screenName === 'User') {
                return {
                    header: {
                        title: data.name,
                        subtitle: 'joined ' + Utils.dateToText(data.date),
                        photo: Utils.cropImage({url: data.getPicture({w: 150}).link, w: 150, h: 150}),
                    },
                    components: [
                        { type: 'list', title: 'videos', itemType: 'videos', uri: data.videosUri },
                        { type: 'list', title: 'likes', itemType: 'videos', uri: data.likesUri },
                        { type: 'list', title: 'following', itemType: 'profiles', uri: data.followingUri },
                    ]
                }
            }
            if(screenName === 'Library') {
                return {
                    header: {
                        title: data.name,
                        subtitle: 'joined ' + Utils.dateToText(data.date),
                        photo: Utils.cropImage({url: data.getPicture({w: 150}).link, w: 150, h: 150}),
                    },
                    components: [
                        { type: 'list', title: 'watch later', itemType: 'videos', uri: '/me/watchlater' },
                        { type: 'list', title: 'purchases', itemType: 'videos', uri: '/me/ondemand/purchases' },
                        { type: 'list', title: 'watched', itemType: 'profiles', uri: '/me/watched/videos' },
                    ]
                }
            }
            if(screenName === 'Channel') {
                return {
                    header: {
                        title: data.name,
                        subtitle: Utils.formatSocialStat(data.followers) + ' follower' + (data.followers > 1 ? 's' : '') ,
                        photo: Utils.cropImage({url: data.getPicture({w: 150}).link, w: 150, h: 150})
                    },
                    components: [
                        {
                            type: 'grid', content: 'videos', itemType: 'videos',
                            title: (Utils.formatSocialStat(data.totalvideos) + ' video' + (data.totalvideos > 1 ? 's' : '')).toUpperCase(),
                            uri: data.uri + '/videos'
                        }
                    ]
                }
            }
            if(screenName === 'Category') {
                return {
                    header: { title: data.name, bg: data.bg },
                    loadData: { path: '$getCategoryData', item: data.item }
                }
            }
        }

        static _states() {
            return [
                class Header extends this {
                    _getFocused() {
                        return this.header
                    }
                    _handleDown() {
                        this._setState('');
                    }
                },
                class Loading extends this {
                    $enter() {
                        this.spinner.show();
                    }
                    $exit() {
                        this.spinner.hide();
                    }
                },
            ]
        }

        _getFocused() {
            return this.components[this.index]
        }

        _handleDown() {
            if(this.index < this.components.length - 1) {
                this.index++;
                this.$scrollScreen();
            }
        }

        _handleUp() {
            if(this.index > 0) {
                this.index--;
                this.$scrollScreen();
            }
            else {
                this._setState('Header');
            }
        }

        $scrollScreen(y = null) {
            if(!y) {
                y = this._getFocused().y;
            }
            this.setSmooth('y', y === 0 ? 0 : -y);
        }

        $outOfBounds(direction) {
            if(direction === 'up') {
                this._handleUp();
            }
            if(direction === 'down') {
                this._handleDown();
            }
        }

        $viewAll(data, itemType) {
            this.index = 0;
            this.setSmooth('y', 0);
            this.components = [
                { type: 'grid', itemType, title: this.data.name, subtitle: data.name, uri: data.uri }
            ];
        }

        reset() {
            this.index = 0;
            this.y = 0;
            this.components.forEach((component) => {
                component.fire('stopLoading');
            });
            this.header.fire('reset');
        }
    }

    class VimeoContent extends lng.Component {
        static _template() {
            return {
                Menu: {
                    type: VimeoMenu,
                    signals: {
                        toggleOverlay: true,
                        closeMenu: true,
                        menuClosed: true,
                        optionSelect: true,
                    }
                },
                Wrapper: {
                    x: 150,
                    transitions: {
                        x: { duration: .35}
                    },
                    Explore: {
                        type: VimeoExplore,
                    },
                    Search: {
                        alpha: 0,
                        type: VimeoSearch,
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
                        colorRight: 0x55000000,
                    },
                    Screen: {
                        alpha: 0,
                        type: VimeoScreen,
                    }
                },
            }
        }

        _init() {
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
            this._api.getAccessToken()
                .then((data) => {
                    if(data && data.user) {
                        this.loggedInUser = data.user;
                    }
                    return this._api.getExploreData()
                })
                .then((items) => {
                    this.explore.items = items;
                    this.tag('Menu').reveal();
                    this.signal('contentReady');
                    this._setState('Explore');
                });

            this._setState('Loading');
        }

        _handleBack() {
            if(this.menuIsOpen) {
                this.closeMenu();
            } else if(this.state !== 'Explore') {
                this._setState('Explore');
            }
        }

        static _states() {
            return [
                class Loading extends this {
                    $enter() {
                        // this.spinner.start()
                    }
                    $exit() {
                        // this.spinner.stop()
                    }
                },
                class Explore extends this {
                    $enter(event) {
                        if(event.prevState === 'Loading') return
                        this.menu.fire('changeSelection', 'Explore');
                    }
                    $exit(event) {
                        this.explore.patch(this.getAnimation(0, -200, 0));
                    }
                },
                class Search extends this {
                    $enter(event) {
                        this.search.patch(this.getAnimation(200, 0, 1));
                        this.search.fire('mountKeyboard', { layout: 'search' });
                    }
                    $exit(event) {
                        this.search.patch(this.getAnimation(0, 200, 0));
                        if(event.newState === 'Explore') {
                            this.search.fire('unmountKeyboard');
                            this.search.fire('reset');
                        }
                    }
                },
                class Screen extends this {
                    $enter(event) {
                        this.screen.patch(this.getAnimation(200, 0, 1));
                    }
                    $exit(event) {
                        this.screen.patch(this.getAnimation(0, 200, 0));
                    }
                },
                class Login extends this {
                    $enter(event) {
                        this.login.patch(this.getAnimation(200, 0, 1));
                    }
                    $exit(event) {
                        this.login.patch(this.getAnimation(0, 200, 0));
                        if(this.loginTimeout) {
                            window.clearTimeout(this.loginTimeout);
                            this.loginTimeout = null;
                        }
                        this.login.fire('reset');
                    }
                }
            ]
        }

        $getUriData({ uri, page = 1, per_page = 20, use_proxy = false, type = 'videos' }) {
            return this.api.getUri(uri, type, page, per_page, use_proxy)
        }

        $viewScreen(screenName, data = false) {
            this.screen.build({ screenName, data });
            this._setState('Screen');
        }

        backButton() {
            this._setState('Explore');
        }

        requestLogin(targetScreen) {
            this.api.getAuthCode()
                .then((data) => {
                    this.login.fire('dataLoaded', data);
                    data.targetScreen = targetScreen;
                    this.loginPooling(data);
                });
            this._setState('Login');
        }

        loginPooling(data) {
            this.loginTimeout = window.setTimeout(() => {
                this.api.getUserAuth(data)
                    .then((response) => {
                        if(response.user) {
                            this.loggedInUser = response.user;
                            this.$viewScreen(data.targetScreen, this.loggedInUser);
                        }
                        else {
                            this.loginPooling(data);
                        }
                    });
            }, data.interval * 1000);
        }

        $getCategoryData(category) {
            return this.api.getCategory(category)
        }

        getAuthCode() {
            this.api.getAuthCode()
                .then((data) => {
                    this.login.fire('dataLoaded', data);
                });
        }

        toggleOverlay(toggle = false) {
            this.overlay.patch({
                transitions: {
                    alpha: { duration: .5, delay: toggle ? 0 : .5 },
                },
                smooth: {
                    alpha: +toggle
                }
            });
        }

        $openMenu() {
            this.menuIsOpen = true;
            this.menu.fire('open');
        }

        closeMenu() {
            this.menu.fire('close');
        }

        menuClosed() {
            this.menuIsOpen = false;
        }

        optionSelect(option) {
            if(this.prevState !== option) {
                this.closeMenu();
                setTimeout(() => {
                    if(['Explore', 'Search'].includes(option)) {
                        this._setState(option);
                    }
                    else if(!this.loggedInUser) {
                        this.requestLogin(option);
                    }
                    else {
                        this.$viewScreen(option, this.loggedInUser);
                    }
                }, 800);
            }
        }

        $searchTerm(entry, type) {
            return this.api.getSearchResults(entry, type)
        }

        _getFocused() {
            if(this.menuIsOpen) {
                return this.menu
            }
            return this.tag(this.state) || this
        }

        getAnimation(x, x2, show) {
            return {
                x,
                alpha: show ? 0 : 1,
                smooth: {
                    x: x2,
                    alpha: show ? 1 : 0,
                }
            }
        }

        get api() {
            return this._api
        }
    }

    class VimeoSplash extends lng.Component {
        static _template() {
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
                    src: AppDefinition.getPath('img/vimeo-loading.png'),
                }
            }
        }

        _init() {
            this.setSmooth('alpha', 1);
            this.animation = this.tag('Loader').animation({
                duration: 2, repeat: -1, stopMethod: 'immediate', actions: [
                    {p: 'y', rv: 540, v: {0: 540, 0.5: 530, 1: 540}}
                ]
            });
            this.animation.start();
        }

        hide() {
            this.animation.stop();
            setTimeout(() => {
                this.setSmooth('alpha', 0);
            }, 100);
        }
    }

    class VimeoPlayer extends ux.tools.player.Player {

        static _template() {
            const template = super._template();
            template.Progress.signals = {
                left: "_scrubBackward",
                enter: "pressPlay",
                right: "_scrubForward"
            };
            template.Spinner = {
                type: VimeoPlayerSpinner,
            };
            return template
        }

        static get PlayerControls() {
            return VimeoPlayerControls
        }

        static get PlayerProgress() {
            return VimeoPlayerProgress
        }

        $mediaplayerEnded() {
            this._setState('Controls');
            this._pressNext();
        }

        _scrubBackward() {
            this.application.mediaplayer.seek(-15);
        }

        _scrubForward() {
            this.application.mediaplayer.seek(15);
        }

        $mediaplayerLoad() {
            this.tag('Spinner').fire('show');
        }

        $mediaplayerLoadedData() {
            this.tag('Spinner').fire('hide');
        }

        $mediaplayerSeeking() {
            this.tag('Spinner').fire('show');
        }

        $mediaplayerSeeked() {
            this.tag('Spinner').fire('hide');
        }

        _setItem(item) {
            this.tag("Progress").setProgress(0, 0);
            this._item = item;
            this._stream = item.stream;
            this.tag("Controls").title = item.title;

            this._index = this._items.findIndex((i) => i.stream.link === item.stream.link);
            this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);

            this.application.updateFocusSettings();
        }

        static _states() {
            const states = super._states();
            
            let i;
            
            i = states.findIndex(state => state.name === "Controls");
            states[i] = class Controls extends states[i] {
                _handleDown() {
                    this._setState("Progress");
                }
            };

            states.push(class Progress extends this {
                _handleUp() {
                    this._setState("Controls");
                }
                _getFocused() {
                    return this.tag("Progress")
                }
            });

            return states
        }

    }

    class VimeoPlayerProgress extends ux.tools.player.PlayerProgress {

        _init() {} //overwrite only! :o)
        
        static _template() {
            let template = super._template();

            template.Progress.Total.Scroller = {};
            template.Progress.Total.texture = lng.Tools.getRoundRect(1720, 14, 7);
            template.Progress.Active = { x: 1, y: 1, color: 0xff0D1314 };

            return template
        }

        set _progress(v) {
            const x = v * 1716;
            this.tag("Active").texture = lng.Tools.getRoundRect(Math.max(x, 5), 10, 5);
        }

        _focus() {
            this.tag("Active").color = 0xffffffff;
        }

        _unfocus() {
            this.tag("Active").color = 0xff0D1314;
        }

        _handleLeft() {
            this.signal("left");
        }

        _handleEnter() {
            this.signal("enter");
        }

        _handleRight() {
            this.signal("right");
        }

    }

    class VimeoPlayerControls extends ux.tools.player.PlayerControls {

        static get PlayerButton() {
            return VimeoPlayerButton
        }

        set paused(v) {
            this.tag("Play").icon = v ? "play.png" : "pause.png";
        }
    }

    class VimeoPlayerButton extends ux.tools.player.PlayerButton {

        static _template() {
            this.options.colors = {
                selected: 0xffffffff,
                deselected: 0xff0D1314,
            };
            const template = super._template();
            return template
        }

        set icon(source) {
            if(source === 'pause.png') {
                this.tag('Icon').src = AppDefinition.getPath('img/pause-icon.png');
            }
            else {
                this.tag('Icon').src = `static/tools/player/img/${source}`;
            }
        }
    }

    class VimeoPlayerSpinner extends lng.Component {
        static _template() {
            return {
                zIndex: 11,
                alpha: 0,
                Spinner: {
                    x: 960,
                    y: 540,
                    mount: .5,
                    src: AppDefinition.getPath('img/spinner.png'),
                }
            }
        }

        _init() {
            this.spinnerAnimation = this.tag('Spinner').animation({
                duration: 2, repeat: -1,
                actions: [
                    { p: 'rotation', v: {0: { sm: 0, v: 0 }, 1: { sm: 0, v: Math.PI * 2}}}
                ]
            });
        }

        show() {
            this.patch({
                smooth: { alpha: 1 },
                Spinner: {
                    scale: 1,
                }
            });
            this.spinnerAnimation.start();
        }

        hide() {
            this.patch({
                smooth: { alpha: 0 },
                Spinner: {
                    smooth: { scale: 1.3 },
                }
            });
            setTimeout(() => {
                this.spinnerAnimation.stop();
            }, 250);
        }
    }

    class Vimeo extends ux.App {
        static _template() {
            return {
                w: 1920,
                h: 1080,
                rect: true,
                color: 0xff282E32,
                Splash: {
                    zIndex: 2,
                    type: VimeoSplash,
                },
                Player: {
                    alpha: 0,
                    zIndex: 10,
                    type: VimeoPlayer,
                    signals: {
                        closePlayer: true,
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
                        play: true,
                    }
                },
            }
        }

        _init() {
            this.splash = this.tag('Splash');
            this.content = this.tag('Content');
            this.player = this.tag('Player');
            // this.loading = this.tag('Loading')
            this._setState('Splash');
        }

        contentReady() {
            this._setState('Content');
        }

        static _states() {
            return [
                class Splash extends this {
                    _getFocused() {
                        return this.splash
                    }
                    $exit() {
                        this.splash.hide();
                    }
                },
                class Content extends this {
                    $enter() {
                        this.content.setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.content.setSmooth('alpha', 0);
                    }
                    _getFocused() {
                        return this.content
                    }
                },
                class Player extends this {
                    $enter() {
                        this.color = 0x00282E32;
                        this.player.setSmooth('alpha', 1);
                    }
                    $exit() {
                        this.color = 0xff282E32;
                        this.player.setSmooth('alpha', 0);
                        this.player.fire('close');
                    }
                    _getFocused() {
                        return this.player
                    }
                    _handleBack() {
                        this._setState('Content');
                    }
                    closePlayer() {
                        this._setState('Content');
                    }
                    _setFocusSettings(settings) {
                        settings.mediaplayer.consumer = this.player;
                    }
                    _getFocused() {
                        return this.player
                    }
                }
            ]
        }

        $play({ item, items}) {
            const playlist = {
                item: item.getMediaplayerItem(),
                items: items.map(item => item.getMediaplayerItem())
            };
            this.player.fire('play', playlist);
            this._setState('Player');
        }

        static getFonts() {
            return [
                { family: 'AkkuratPro', url: AppDefinition.getPath('fonts/AkkuratPro-Regular.ttf'), descriptors: {}},
                { family: 'Material-Icons', url: AppDefinition.getPath('fonts/Material-Icons.ttf'), descriptors: {}},
                { family: 'Font-Awesome', url: AppDefinition.getPath('fonts/fontawesome-webfont.ttf'), descriptors: {}},
            ]
        }
    }

    class AppDefinition extends ux.AppDefinition {

        static get identifier() {
            return 'com.metrological.app.Vimeo'
        }

        getAppViewType() {
            return Vimeo
        }
    }

    return AppDefinition;

}());
