var com_metrological_app_ARD = (function () {
    'use strict';

    class ViewManager {
        constructor() {
            this.history = [];
            this._c = null;
            this._tl = null;
            this.previous = false;
        }

        get toLoad() {
            return this._tl
        }

        set toLoad(obj) {
            this._tl = obj;
        }

        get loadView(){
            return this.toLoad.view
        }

        get currentView() {
            return this._c.view
        }

        get current() {
            return this._c
        }

        set current(obj) {
            this.toLoad = null;
            const c = this.current;
            if(c && c.view && !c.ignore && !this.previous && !obj.reload) {
                this.history.push(c);
            }
            this.previous = false;
            this._c = obj;
        }

        get previousView() {
            let target = 'exit';
            if(this.history.length) {
                target = this.history.pop();
                this.previous = true;
            }
            return target
        }

        viewSwitched(hasContent){
            this.current = this.toLoad;
            this.current.hasContent = hasContent;
            return this.currentView
        }

        clearHistory() {
            this.history = [];
        }
    }

    class API extends lng.EventEmitter {
        constructor() {
            super();
            this.baseUrl = 'http://page.ardmediathek.de/page-gateway/pages';
            // this.baseUrl = 'http://api-origin-dev.ardmediathek.de/page-gateway/pages'
        }

        call(target, params, method = 'GET') {
            const options = {
                headers: {},
                method
            };

            if(method !== 'GET') {
                options.body = JSON.stringify(params);
            }

            return fetch(ux.Ui.getProxyUrl(target), options)
                .then((response) => {
                    if(!response.ok){
                        throw response.statusText
                    }
                    if(response.status !== 200) {
                        return response
                    }
                    return response.json()
                })
                .catch((error) => {
                    throw error
                })
        }

        getMainPageData(target) {
            return this.call(`${this.baseUrl}/${this.checkTarget(target)}/home`)
                .then((response) => {
                    if(response.widgets && Object.keys(response.widgets).length > 0) {
                        response.widgets = response.widgets.filter((widget) => {
                            widget.teasers = widget.teasers.filter((teaser) => {
                                if(teaser.type !== 'compilation') {
                                    return teaser
                                }
                                return false
                            });
                            if(widget.teasers.length > 0) {
                                return widget
                            }
                            return false
                        });
                    }
                    else {
                        throw 'error'
                    }
                    return response
                })
                .catch((reason) => {
                    this.emit('error', {value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'});
                })
        }

        getGlossaryPageData(target) {
            return this.call(`${this.baseUrl}/${this.checkTarget(target)}/shows`)
                .then(({widgets}) => {
                    const page = {
                        glossary: {}
                    };
                    const comps = widgets[0].compilations;
                    Object.keys(comps).forEach((key) => {
                        page.glossary[`shows${key}`] = comps[key].teasers;
                    });
                    return page
                })
                .catch((reason) => {
                    this.emit('error', {value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'});
                })
        }

        getShowPage(showId) {
            return this.call(`${this.baseUrl}/ard/grouping/${showId}?pageNumber=0&pageSize=100`)
                .then(({title, image, synopsis, widgets}) => {
                    return {
                        title,
                        image,
                        synopsis,
                        teasers: widgets[0].teasers
                    }
                })
                .catch((reason) => {
                    this.emit('error', {value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'});
                })
        }

        getPlayerPage(clipId) {
            return this.call(`${this.baseUrl}/ard/item/${clipId}?pageNumber=0&pageSize=100`)
                .then((response) => {
                    return Promise.all([response, this.getData(response.widgets[0].mediaCollection.href.replace('{devicetype}', 'hbbtv'))])
                })
                .then((response) => {
                    const page = response[0].widgets[0];
                    page.mediaCollection = response[1];
                    if(page.teasers === undefined) {
                        page.teasers = response[0].widgets[1].teasers;
                    }
                    return page
                })
                .catch((reason) => {
                    this.emit('error', {value: 'Vorübergehend keine Daten verfügbar - Bitte versuchen Sie es später erneut.'});
                })
        }

        search(query) {
            return this.call(`${this.baseUrl}/ard/search?searchString=${query}&pageNumber=0&pageSize=999`)
                .then((response) => {
                    const results = {};
                    if(response.showResults.length) {
                        results.showResults = response.showResults;
                    }
                    if(response.vodResults.length) {
                        results.vodResults = response.vodResults;
                    }
                    return results
                })
                .catch((reason) => {
                    this.emit('error', {value: 'Keine Verbindung mit dem Server möglich - Bitte versuchen Sie es später erneut.'});
                })
        }

        getData(link) {
            return this.call(link)
        }

        checkTarget(target) {
            if(target === 'rb') {
                target = 'radiobremen';
            }
            this.currentChannel = target;
            return target
        }

        getInfo(page) {
            return fetch(AppDefinition.getPath(`data/${page}.json`)).then(response => {
                if (!response.ok) throw "Response not ok"
                return response.json()
            }).catch(e => {
                this.emit('error', {value: 'Keine Verbindung mit dem Server möglich - Bitte versuchen Sie es später erneut.'});
            })
        }

        getSubtitlesOn() {
            this._subtitlesOn = false;
            const storage = window.localStorage['app-ARD'] && JSON.parse(window.localStorage['app-ARD']);

            if(storage && storage.subtitles) {
                this._subtitlesOn = storage.subtitles;
            }
            return this._subtitlesOn
        }

        setSubtitlesOn(bool) {
            this._subtitlesOn = bool;
            window.localStorage['app-ARD'] = JSON.stringify({
                subtitles: bool
            });
        }

        formatTime(number) {
            return number < 10 ? "0" + number : number
        }

        getDate(data, time) {
            const d = new Date(data);
            let timestr = '';
            if(time) {
                timestr = ` \u2022 ${this.formatTime(d.getHours())}:${this.formatTime(d.getMinutes())} Uhr`;
            }
            return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}${timestr}`;
        }
    }

    class Theme {
        get baseColors() {
            return {

            }
        }

        get colorSheet() {
            return {

            }
        }

        get fillTeaser() {
            return true
        }

        get backgroundImage() {
            return null
        }

        get theme() {
            return Object.assign({}, this.getColorScheme(), {logo: this.logo, coloredLogo: this.coloredLogo, backgroundImage: this.backgroundImage, fillTeaser: this.fillTeaser})
        }

        get logo() {
            return {}
        }

        get coloredLogo() {
            return false
        }

        getColorScheme(cs = this.colorSheet) {
            const colors = {};
            Object.keys(cs).forEach((key) => {
                if(cs[key].length > 0) {
                    colors[key] = this.configureColor(cs[key]);
                }
                else {
                    colors[key] = this.getColorScheme(cs[key]);
                }
            });
            return colors
        }

        configureColor(str) {
            const l =  str.split('l')[1];
            if(l) {
                str = str.replace(`l${l}`, '');
            }
            const d = str.split('d')[1];
            if(d) {
                str = str.replace(`d${d}`, '');
            }
            const o = str.split('o')[1];
            if(o) {
                str = str.replace(`o${o}`, '');
            }

            let color = this.baseColors[str];

            if(l) {
                color = lng.StageUtils.mergeColors(color, 0xffffffff, 1 - l);
            }
            if(d) {
                color = lng.StageUtils.mergeColors(color, 0xff000000, 1 - 0.15);
            }
            if(o) {
                color = this.calculateOpacity(color, 1 - o);
            }
            return color
        }

        calculateOpacity(c, p) {
            p = parseFloat(p);
            const r = ((c / 65536) | 0) % 256;
            const g = ((c / 256) | 0) % 256;
            const b = c % 256;
            let a = ((c / 16777216) | 0);
            a = a * (1 - p) | 0;
            return a * 16777216 + r * 65536 + g * 256 + b
        }
    }

    class Ard extends Theme {
        get logo() {
            return {
                src: 'icons/channels/ard.svg',
                width: 105
            }
        }

        get baseColors() {
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
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class Alpha extends Theme {
        get logo() {
            return {
                src: 'icons/channels/alpha.svg',
                width: 90
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xfff2f2f1,
                c2: 0xffc94e16,
                c3: 0xffee9c27,
                c4: 0xff262626,
                c5: 0xffe2e2e2,
                c6: 0xffffffff,
                c7: 0xff000e26
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class BR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/br.svg',
                width: 50
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xffEDECE8,
                c2: 0xff0082c6,
                c3: 0xff292d3b,
                c4: 0xffffb600,
                c5: 0xffffffff,
                c6: 0xff000000
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class DasErste extends Theme {
        get logo() {
            return {
                src: 'icons/channels/daserste.svg',
                width: 98
            }
        }
        get fillTeaser() {
            return false
        }

        get backgroundImage() {
            return 'images/dasersteBackground.png'
        }

        get baseColors() {
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
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class HR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/hr.svg',
                width: 48
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xff006eb7,
                c2: 0xff203a67,
                c3: 0xff668081,
                c4: 0xffe2e2e2,
                c5: 0xffffffff,
                c6: 0xff000000
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class MDR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/mdr.svg',
                width: 84
            }
        }

        get backgroundImage() {
            return 'images/mdrBackground.jpg'
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xff00375f,
                c2: 0xff0062ae,
                c3: 0xff585858,
                c4: 0xffd94d94,
                c5: 0xffffffff,
                c6: 0xff000000,
                c7: 0xffe0d5c8
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class NDR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/ndr.svg',
                width: 68
            }
        }

        get baseColors() {
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
            }
        }

        get colorSheet() {
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
                    activeBullet: 'c7',
                },
                live: {
                    background: 'c7o0.9',
                    progress: 'c5',
                    text: 'c3',
                },
                duration: {
                    background: 'c3o0.8',
                    text: 'c7',
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
            }
        }
    }

    class One extends Theme {
        get logo() {
            return {
                src: 'icons/channels/one.svg',
                width: 96
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xfff4357a,
                c2: 0xff7100a6,
                c3: 0xfffbe426,
                c4: 0xffe2e2e2,
                c5: 0xffffffff,
                c6: 0xff333333,
                c7: 0xff000000
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class RB extends Theme {
        get logo() {
            return {
                src: 'icons/channels/radiobremen.svg',
                width: 152
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xfff0f0f0,
                c2: 0xffc51015,
                c3: 0xff404040,
                c4: 0xffffffff,
                c5: 0xff000000
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class RBB extends Theme {
        get logo() {
            return {
                src: 'icons/channels/rbb.svg',
                width: 70
            }
        }

        get baseColors() {
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
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class SR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/sr.svg',
                width: 52
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xff004295,
                c2: 0xff5471dd,
                c3: 0xff020734,
                c4: 0xfff1f1f1,
                c5: 0xffff6670,
                c6: 0xffffffff,
                c7: 0xff000000
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class SWR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/swr.svg',
                width: 96
            }
        }

        get coloredLogo() {
            return {
                src: 'icons/channels/swrColored.svg',
                width: 96
            }
        }

        get baseColors() {
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
            }
        }

        get colorSheet() {
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
                    shadow: 'c0',
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
            }
        }
    }

    class WDR extends Theme {
        get logo() {
            return {
                src: 'icons/channels/wdr.svg',
                width: 80
            }
        }

        get baseColors() {
            return {
                c0: false,
                c1: 0xff19335d,
                c2: 0xffd39413,
                c3: 0xff00335e,
                c4: 0xffbe0000,
                c5: 0xffffffff,
                c6: 0xff000000,
                c7: 0xff002545
            }
        }

        get colorSheet() {
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
            }
        }
    }

    class ThemeManager extends lng.EventEmitter {

        constructor() {
            super();
        }

        get currentProfile() {
            return this._cp
        }

        set theme(theme) {
            this._theme = theme;
        }

        get theme() {
            return this._theme
        }

        getChannelTheme(str) {
            switch(str) {
                case 'ard':
                    return new Ard()
                case 'alpha':
                    return new Alpha()
                case 'br':
                    return new BR()
                case 'daserste':
                    return new DasErste()
                case 'hr':
                    return new HR()
                case 'mdr':
                    return new MDR()
                case 'ndr':
                    return new NDR()
                case 'one':
                    return new One()
                case 'rb':
                    return new RB()
                case 'rbb':
                    return new RBB()
                case 'sr':
                    return new SR()
                case 'swr':
                    return new SWR()
                case 'wdr':
                    return new WDR()
            }
        }

        set currentProfile(str) {
            str = str.toLowerCase();
            if(str === 'alle') {
                str = 'ard';
            }
            if(this.theme && this.theme.id && this.theme.id === str) {
                return
            }

            const channel = this.getChannelTheme(str);
            const theme = channel.theme;
            theme.id = str;

            this.theme = theme;
            this._cp = str;
            this.emit('themeChanged', theme);
        }
    }

    class Loader extends lng.Component {
        static _template() {
            return {
                alpha: 0, x: 960, y: 540, w: 80, h: 80, mountX: 0.5, mountY: 0.5, transitions: {alpha: {duration: 0.5}},
                Circle1: {x: 40, y: 40, w: 80, h: 80, mountX: 0.5, mountY: 0.5, renderToTexture: true,
                    Shader: {mount: 0.5, shader: {type: lng.shaders.RadialFilter, cutoff: 1, radius: 40},
                        Background: {w: 80, h: 80, rect: true, color: 0xffffffff},
                    }
                },
                Circle2: {x: 40, y: 40, w: 80, h: 80, mountX: 0.5, mountY: 0.5, renderToTexture: true,
                    Shader: {mount: 0.5, shader: {type: lng.shaders.RadialFilter, cutoff: 1, radius: 40},
                        Background: {w: 80, h: 80, rect: true, color: 0xffffffff},
                    }
                },
                Circle3: {x: 40, y: 40, w: 80, h: 80, mountX: 0.5, mountY: 0.5, renderToTexture: true,
                    Shader: {mount: 0.5, shader: {type: lng.shaders.RadialFilter, cutoff: 1, radius: 40},
                        Background: {w: 80, h: 80, rect: true, color: 0xffffffff},
                    }
                }
            }
        }

        show(delay = 0) {
            this.setSmooth('alpha', 1);
            this.loadAnimation = this.animation({duration: 1.4, delay, repeat: -1, stopMethod: 'immediate', actions: [
                    {t: 'Circle1', p: 'alpha', v: {0: 1, 0.8: 0}},
                    {t: 'Circle1', p: 'scale', v: {0: 0, 0.8: 1}},
                    {t: 'Circle2', p: 'alpha', v: {0.1: 1, 0.9: 0}},
                    {t: 'Circle2', p: 'scale', v: {0.1: 0, 0.9: 1}},
                    {t: 'Circle3', p: 'alpha', v: {0.2: 1, 1: 0}},
                    {t: 'Circle3', p: 'scale', v: {0.2: 0, 1: 1}}
                ]});
            this.loadAnimation.start();
        }

        hide() {
            this.setSmooth('alpha', 0);
            this.loadAnimation.stop();
        }

        set theme({stage: {activeBullet:color}}) {
            this.patch({
                Circle1: {Shader: {Background: {color}}},
                Circle2: {Shader: {Background: {color}}},
                Circle3: {Shader: {Background: {color}}}
            });
        }
    }

    class IconItem extends lng.Component {
        static _template() {
            return {

            }
        }

        set maxWidth(v) {
            this._maxWidth = v;
        }

        get maxWidth() {
            return this._maxWidth || 0
        }

        set icon({src, w, h, color = 0xffffffff}) {
            if(!src) {
                return
            }
            if(this.maxWidth && w > this.maxWidth) {
                const scale =  this.maxWidth / w;
                w = this.maxWidth;
                h = h * scale;
            }
            this.patch({
                color, w, h, texture: lng.Tools.getSvgTexture(AppDefinition.getPath(src), w, h)
            });
        }
    }

    class ArdNavigationOptionItem extends lng.Component {
        static _template() {
            return {
                h: 105, w: 105,
                Wrapper: {
                    h: 105, w: 105,
                    Focus: {
                        alpha: 0, y: 105, mountY: 1, h: 1, w: 105, color: 0xffffffff,rect: true
                    },
                    Icon: {
                        x: 52, y: 52, mount: 0.5, type: IconItem
                    }
                }
            }
        }

        set theme(theme) {
            this.tag('Wrapper').patch({
                Focus: {smooth: {color: theme.focus}},
                Icon: {smooth: {color: theme.toolbar.text}}
            });

            this._fc = {
                label: theme.toolbar.text,
                labelFocus: theme.textFocus
            };
        }

        static _states() {
            return {
                _init() {
                    const {w: iconWidth = 48*2, h: iconHeight = 48*2, src} = this.icon;

                    this.patch({
                        Wrapper: {
                            Icon: {y: this.icon.y || 52, icon: {src, w: iconWidth, h: iconHeight}}
                        }
                    });
                },
                _focus() {
                    this.tag('Wrapper').patch({
                        Focus: {
                            smooth: {h: 105, alpha: 1}
                        },
                        Icon: {
                            smooth: {color: this._fc.labelFocus}
                        }
                    });
                },
                _unfocus() {
                    this.tag('Wrapper').patch({
                        Focus: {
                            smooth: {h: 1, alpha: 0}
                        },
                        Icon: {
                            smooth: {color: this._fc.label}
                        }
                    });
                }
            }
        }
    }

    class ChannelLogo extends lng.Component {
        static _template() {
            return {
                Focus: {alpha: 0, y: 120, mountY: 1, h: 120, color: 0xff0000ff, rect: true},
                Logo: {x: 30, y: 20, type: IconItem},
                Arrow: {type: IconItem, y: 20, icon: {src: 'icons/ui/arrowDown.svg', w: 48*1.7, h: 48*1.7}, transitions: {rotation: {duration: 0.5}}}
            }
        }

        set logo(obj) {
            this.tag('Logo').setSmooth('alpha', 0);
            this._l = obj;
        }

        get logo() {
            return this._l
        }

        set theme(theme) {
            this.patch({
                Focus: {smooth: {color: theme.focus}},
                Logo: {smooth: {color: theme.toolbar.text}},
                Arrow: {smooth: {color: theme.toolbar.text}}
            });

            this._fc = {
                label: theme.toolbar.text,
                labelFocus: theme.textFocus
            };
        }

        calcWidth() {
            const arrow = this.tag('Arrow');
            const w = arrow.x + arrow.w + 15;
            const mount = (30 + this.tag('Logo').w / 2) / w;
            this.patch({
                // mountX: 1 - mount,
                w,
                Focus: {w}
            });
        }

        static _states() {
            return {
                _init() {
                    const logo = this.tag('Logo');

                    logo.transition('alpha').on('finish', () => {
                        if(logo.alpha === 0 && this.logo) {
                            const {src, width} = this.logo;
                            this.patch({
                                Logo: {alpha: 1, icon: {src, w: width * 1.7, h: 48 * 1.7}},
                                Arrow: {smooth: {x: width * 1.7 + 30}}
                            });
                        }
                    });

                    logo.on('txLoaded', () => {
                        this.calcWidth();
                        this.logoAnimation.start();
                    });

                    this.logoAnimation = logo.animation({duration: 0.5, actions: [
                            {p: 'y', v: {0: 0, 0.4: 25, 0.6: 10, 0.8: 21, 1: 20}}
                        ]});

                    this.logoAnimation.on('finish', () => {
                        this.signal('logoAnimationFinished');
                    });
                },
                _focus() {
                    this.patch({
                        Focus: {
                            smooth: {h: 120, alpha: 1}
                        },
                        Logo: {
                            smooth: {color: this._fc.labelFocus}
                        },
                        Arrow: {
                            smooth: {color: this._fc.labelFocus}
                        }
                    });
                },
                _unfocus() {
                    this.patch({
                        Focus: {
                            smooth: {h: 1, alpha: 0}
                        },
                        Logo: {
                            smooth: {color: this._fc.label}
                        },
                        Arrow: {
                            smooth: {color: this._fc.label}
                        }
                    });
                },
                showArrow() {
                    this.tag('Arrow').setSmooth('alpha', 1);
                },
                arrowUp() {
                    this.tag('Arrow').setSmooth('rotation', Math.PI);
                },
                arrowDown() {
                    this.tag('Arrow').setSmooth('rotation', 0);
                }
            }
        }
    }

    class ChannelBarItem extends lng.Component {
        static _template() {
            return {
                Wrapper: { h: 105,
                    Focus: {
                        alpha: 0, y: 130, mountY: 1, h: 1, color: 0xffffffff, rect: true
                    },
                    Label: {
                        y: 75, x: 16, mountX: 0, mountY: 0.5, pivotX: 0, text: {text: 'TEST', fontFace: 'TheSansB4', fontSize: 30}
                    }
                }
            }
        }

        set item(obj) {
            this._item = obj;
        }

        get item() {
            return this._item
        }

        set theme(theme) {
            this.tag('Wrapper').patch({
                Focus: {smooth: {color: theme.focus}},
                Label: {smooth: {color: theme.toolbar.text}}
            });

            this._fc = {
                label: theme.toolbar.text,
                labelFocus: theme.textFocus
            };
        }

        set label(str) {
            this.tag('Label').patch({text: {text: str}});
        }

        get totalWidth() {
            return this._tw
        }

        set totalWidth(int) {
            this.tag('Focus').w = int;
            this._tw = int;
        }

        static _states() {
            return {
                _init() {
                    this.padding = 16;
                    const label = this.tag('Label');
                    label.onAfterUpdate = (() => {
                        this.totalWidth = this.padding * 2 + (label.renderWidth * label.scale);
                    });
                    label.text.text = this.item.label;
                },
                _focus() {
                    this.tag('Wrapper').patch({
                        Focus: {
                            smooth: {h: 105, alpha: 1}
                        },
                        Label: {
                            smooth: {color: this._fc.labelFocus}
                        }
                    });
                },
                _unfocus() {
                    this.tag('Wrapper').patch({
                        Focus: {
                            smooth: {h: 1, alpha: 0}
                        },
                        Label: {
                            smooth: {color: this._fc.label}
                        }
                    });
                },
                selected() {
                    this.tag('Label').setSmooth('scale', 1.3);
                },
                unselected() {
                    this.tag('Label').setSmooth('scale', 1);
                }
            }
        }
    }

    class ItemList extends lng.Component {
        static _template() {
            return {
                Items: {}
            }
        }

        get length() {
            return this.tag('Items').children.length
        }

        set items(list) {
            this.tag('Items').children = list;
            this._index = 0;
        }

        get items() {
            return this.tag('Items').children
        }

        get item() {
            return this.tag('Items').children[this._index]
        }

        get index() {
            return this._index || 0
        }

        set index(v) {
            this.fire('indexChanged', {index: v, previousIndex: this.index});
            this._index = v;
        }

        set orientation(o) {
            this._orientation = o;
        }

        get orientation() {
            return this._orientation || 'horizontal'
        }

        _getFocused() {
            return this.item
        }

        navigate(dir, o = 'horizontal', absolute = false) {
            const target = absolute ? dir : this.index + dir;
            if(o === this.orientation && (target > -1 && target < this.length)) {
                return this.index = target
            }
            return false
        }

        static _states() {
            return {
                _init() {
                    this.index = 0;
                },
                _handleUp() {
                    return this.navigate(-1, 'vertical')
                },
                _handleDown() {
                    return this.navigate(1, 'vertical')
                },
                _handleLeft() {
                    return this.navigate(-1, 'horizontal')
                },
                _handleRight() {
                    return this.navigate(1, 'horizontal')
                },
                indexChanged(e) {
                    this.signal('indexChanged', e);
                }
            }
        }
    }

    class ChannelBar extends lng.Component {
        static _template() {
            return {
                h: 130, w: 1920,
                List: {alpha: 1, y: 0, type: ItemList},
                Selected: {zIndex: 2, h: 4, y: 126, color: 0xffffffff, rect: true}
            }
        }

        set theme(theme) {
            this.tag('Selected').color = theme.toolbar.text;
            this.tag('List').items.forEach((item) => {
                item.theme = theme;
            });
        }

        reposition() {
            const channels = this.tag('List');

            let totalWidth = 0;

            channels.items.forEach((item) => {
                item.x = totalWidth;
                totalWidth += item.totalWidth;
            });

            channels.x = (1920 - totalWidth) / 2;

            const current = this.selectedChannelItem;
            this.tag('Selected').patch({x: channels.x + current.x, w: current.totalWidth});
        }

        get selectedChannelItem() {
            return this.tag('List').items[this._selectedIndex]
        }

        get focusedChannelItem() {
            return this.tag('List').item
        }

        get index() {
            return this.tag('List').index
        }

        set index(v) {
            this.tag('List').index = v;
        }

        get length() {
            return this.tag('List').length
        }

        get selectedIndex() {
            return this._selectedIndex
        }

        _getFocused() {
            return this.tag('List')
        }

        static _states() {
            return {
                _init() {
                    const list = this.tag('List');
                    const items = [
                        {id: 'alle', label: 'Alle'},
                        {id: 'daserste', label: 'Das Erste'},
                        {id: 'br', label: 'BR'},
                        {id: 'hr', label: 'HR'},
                        {id: 'mdr', label: 'MDR'},
                        {id: 'ndr', label: 'NDR'},
                        {id: 'rb', label: 'Radio Bremen'},
                        {id: 'rbb', label: 'RBB'},
                        {id: 'sr', label: 'SR'},
                        {id: 'swr', label: 'SWR'},
                        {id: 'wdr', label: 'WDR'},
                        {id: 'one', label: 'ONE'},
                        {id: 'alpha', label: 'ARD-alpha'}
                    ];

                    list.items = items.map((item) => {
                        return {ref: item.label, type: ChannelBarItem, item: item}
                    });

                    list.onAfterUpdate = (() => this.reposition());

                    this._selectedIndex = 0;
                    this.focusedChannelItem.fire('selected');
                },
                _unfocus() {
                    this.index = this._selectedIndex;
                },
                _handleEnter() {
                    if(this._selectedIndex !== this.index) {
                        this.selectedChannelItem.fire('unselected');

                        this.focusedChannelItem.fire('selected');
                        this._selectedIndex = this.index;
                    }
                    return false
                }
            }
        }
    }

    class Toolbar extends lng.Component {
        static _template() {
            return {
                w: 1920, h: 148,
                Shadow: {alpha: 0.6, y: 146, x: 960, w: 1920, h: 20, rect: true, mountX: 0.5, colorTop: 0xffffffff, colorBottom: 0x00ffffff, transitions: {y: {duration: 0.35, timingFunction: 'ease-out'}}},
                Wrapper: {
                    w: 1920, h: 146, clipbox: true,
                    Background: {w: 1920, h: 146, color: 0xff000000, rect: true, clipping: true, transitions: {h: {duration: 0.35, timingFunction: 'ease-out'}}},
                    Options: {
                        ChannelLogo: {y: 25, x: 960, mountX: 0.5, w: 148, type: ChannelLogo},
                        Menu: {alpha: 1, y: 146, mountY: 1, x: 115, type: ArdNavigationOptionItem, icon: {src: 'icons/ui/menu.svg', y: 52}},
                        Search: {alpha: 1, mountX: 1, x: 1920-115, y: 146, mountY: 1, type: ArdNavigationOptionItem, icon: {src: 'icons/ui/search.svg', y: 52}}
                    },
                    Channels: {alpha: 0, y: 252, mountY: 1, type: ChannelBar, transitions: {y: {duration: 0.35, timingFunction: 'ease-out'}, alpha: {duration: 0.35, timingFunction: 'ease-out'}}},
                    BottomLine: {alpha: 1, w: 1920, h: 4, y: 142, rect: true, color: 0xff000000, transitions: {y: {duration: 0.35, timingFunction: 'ease-out'}}}
                }
            }
        }

        hideChannels() {
            this.channelsVisible = false;
            this.tag('ChannelLogo').fire('arrowDown');
            this.patch({
                Shadow: {transitions: {y: {delay: 0.15}},smooth: {y: 144}},
                Wrapper: {
                    smooth: {transitions: {h: {delay: 0.15}},smooth:{h: 146}},
                    Background: {transitions: {h: {delay: 0.15}}, smooth: {h: 146}},
                    Channels: {transitions: {alpha: {delay: 0}}, smooth: {alpha: 0}},
                    BottomLine: {transitions: {y: {delay: 0.15}}, smooth: {y: 142}}
                }
            });
        }

        showChannels() {
            this.channelsVisible = true;
            this.tag('ChannelLogo').fire('arrowUp');
            this.patch({
                Shadow: {transitions: {y: {delay: 0}}, smooth: {y: 250}},
                Wrapper: {
                    smooth: {transitions: {h: {delay: 0}}, smooth: {h: 252}},
                    Background: {transitions: {h: {delay: 0}}, smooth: {h: 252}},
                    Channels: {transitions: {alpha: {delay: 0.15}}, smooth: {alpha: 1}},
                    BottomLine: {transitions: {y: {delay: 0}}, smooth: {y: 248}}
                }
            });
        }

        hide() {
            this.patch({smooth: {alpha: 0, y: -160}});
        }

        show() {
            this.patch({smooth: {alpha: 1, y: 0}});
        }

        set theme(theme) {
            this.patch({
                Shadow: {smooth: {colorTop: theme.globalShadow}},
                Wrapper: {
                    Background: {smooth: {color: theme.toolbar.background}},
                    Options: {
                        ChannelLogo: {theme, logo: theme.logo, x: 960, mountX: 0.5},
                        Menu: {theme},
                        Search: {theme}
                    },
                    Channels: {theme},
                    BottomLine: {smooth: {color: theme.toolbar.line}}
                }
            });
        }

        _getFocused(){
            if(this.state && this.tag(this.state)) {
                return this.tag(this.state)
            }
            return this
        }

        static _states() {
            return {
                _init() {
                    this.channelsVisible = false;
                    this.channels = this.tag('Channels');
                },
                _focus() {
                    return "Options.ChannelLogo"
                },
                _unfocus() {
                    this.hideChannels();
                },
                Options: {
                    ChannelLogo: {
                        _handleEnter() {
                            if(this.channelsVisible) {
                                this.hideChannels();
                                return
                            }
                            this.showChannels();
                        },
                        _handleRight: 'Options.Search',
                        _handleLeft: 'Options.Menu',
                        _handleDown() {
                            this.channels.index = this.channels.selectedIndex;
                            return false
                        }
                    },
                    Search: {
                        _handleLeft: 'Options.ChannelLogo',
                        _handleEnter() {
                            this.signal('switchView', {view: 'SearchPage'});
                        },
                        _handleDown() {
                            this.channels.index = this.channels.length - 1;
                            return false
                        }
                    },
                    Menu: {
                        _handleRight: 'Options.ChannelLogo',
                        _handleEnter() {
                            this.signal('showMenu');
                        },
                        _handleDown() {
                            this.channels.index = 0;
                            return false
                        }
                    },
                    _handleDown() {
                        if(this.channelsVisible) {
                            return 'Channels'
                        }
                        return false
                    }
                },
                Channels: {
                    _handleEnter() {
                        const itemId = this.tag('Channels').selectedChannelItem.item.id;
                        this.signal('changeTheme', {value: itemId});
                        this.signal('switchView', {view: 'MainPage', persist: {type: itemId}});
                    },
                    _handleRight: 'Options.Search',
                    _handleLeft: 'Options.Menu',
                    _handleUp: 'Options.ChannelLogo'
                }
            }
        }
    }

    class MenuOption extends lng.Component {
        static _template() {
            return {
                Background: {alpha: 0, w: 303, h: 185, rect: true, color: 0x00ffffff},
                Icon: {y: 185/2, x: 303/2, mount: 0.5, color: 0xffffffff, type: IconItem}
            }
        }

        set theme({focus, textFocus, navigationPanel: {footerIcon}}) {
            this.patch({
                Background: {color: focus},
                Icon: {color: footerIcon}
            });

            this._fc = {
                color: footerIcon,
                focus: textFocus
            };
        }

        static _states() {
            return {
                _init() {
                    const {icon} = this.item;
                    this.patch({
                        Icon: {icon: {src: `icons/ui/${icon}.svg`, w: 185, h: 185}}
                    });
                },
                _focus() {
                    this.patch({
                        Background:{smooth: {alpha: 1}},
                        Icon: {smooth: {color: this._fc.focus}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Background:{smooth: {alpha: 0}},
                        Icon: {smooth: {color: this._fc.color}}
                    });
                }
            }
        }
    }

    class ArdMenuItem extends lng.Component {
        static _template() {
            return {
                Background: {alpha:0, w: 607, h: 74, rect: true, color: 0x00ffffff,},
                Icon: {x: 100, y: 0, color: 0xff000000, type: IconItem},
                Label: {color: 0xff000000, x: 135, mountY: 0.45, y: 37, text: {text: 'TEST', fontFace: 'TheSansB4', fontSize: 30}}
            }
        }

        set active(v) {
            this._active = v;
            if(this._fc) {
                this.patch({
                    Icon: {smooth: {color: this._active ? this._fc.active : this._fc.color}},
                    Label: {smooth: {color: this._active ? this._fc.active : this._fc.color}}
                });
            }
        }

        get active() {
            return this._active
        }

        set theme({focus, textFocus, navigationPanel: {text, active}}) {
            this.patch({
                Background: {color: focus},
                Icon: {color: this._active ? active : text},
                Label: {color: this._active ? active : text}
            });
            this._fc = {
                active: active,
                color: text,
                focus: textFocus
            };
        }

        static _states() {
            return {
                _constructor() {
                    this._active = false;
                },
                _init() {
                    const {icon = null, label} = this.item;
                    this.patch({
                        Icon: {icon: icon ? {src: `icons/ui/${icon}.svg`, w: 74, h: 74} : {src: null}},
                        Label: {x: icon ? 185 : 115, text: {text: label}}
                    });
                },
                _focus() {
                    this.patch({
                        Background:{smooth: {alpha: 1}},
                        Icon: {smooth: {color: this._fc.focus}},
                        Label: {smooth: {color: this._fc.focus}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Background:{smooth: {alpha: 0}},
                        Icon: {smooth: {color: this._active ? this._fc.active : this._fc.color}},
                        Label: {smooth: {color: this._active ? this._fc.active : this._fc.color}}
                    });
                }
            }
        }
    }

    class Menu extends lng.Component {
        static _template() {
            return { alpha: 0,
                Shadow: {color: 0xff000000, mount: 0.5, y: 540, x: 606, texture: lng.Tools.getShadowRect(5, 1080, 0, 20, 20)},
                Wrapper: {w: 606, h: 1080, color: 0xffffffff, clipping: true, rect: true /*,renderToTexture: true, shader: {type: CircleShader, radius: 15000, x: 604, y: 540, mountX: 1.0}*/,
                    HeaderShadow: {mount: 0.5, x: 302, texture: lng.Tools.getShadowRect(604, 10, 0, 30, 30)},
                    Header: {
                        w: 606, h: 148, color: 0xff0062ff, rect: true,
                        Logo: {y: 35, x: 235, mountX: 1, x: 570, type: IconItem, icon: {src: 'icons/channels/ard.svg', w: 135, h: 65}},
                        // AccountItems: {x: 40, y: 150, text: {text: 'Anmelden \u2022 Meine ARD', fontFace: 'TheSansB4', fontSize: 30}},
                        Border: {alpha: 0, w: 606, h: 4, rect: true, y: 148}
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
                    MenuItems: {y: 220, type: ItemList, orientation: 'vertical'},
                    Seperator: {x: 40, y: 532, h: 2, w: 525, rect: true, color: 0xffe2e2e2},
                    OptionsBar: {w: 606, h: 185, y: 895, color: 0xff001a4b, rect: true, type: ItemList, orientation: 'horizontal'}
                }
            }
        }

        set theme(theme) {
            this.currentChannel = theme.id;
            this.activePage = 0;
            let {logo: {src, width}, coloredLogo = false, navigationPanel: {header, footer, seperator, background}} = theme;
            if(coloredLogo) {
                src = coloredLogo.src;
            }

            this.patch({
                Wrapper: {
                    color: background,
                    HeaderShadow: {alpha: !!header.shadow, color: header.shadow || 0x00000000},
                    Header: {
                        color: header.background,
                        Logo: {icon: {color: header.logo, src, w: width * 2, h: 96}},
                        // AccountItems: {color: header.text},
                        Border: {alpha: !!header.border, color: header.border || 0x00000000}
                    },
                    Seperator: {color: seperator},
                    OptionsBar: {
                        color: footer
                    }
                }
            });

            this.tag('MenuItems').items.forEach((item, index) => {
                item.theme = theme;
                item.active = index === this.activePage;
            });
            this.tag('OptionsBar').items.forEach((item) => {
                item.theme = theme;
            });
        }

        get menuItems() {
            return [
                {view: 'MainPage', icon: 'start', label: 'Start', ignore: false},
                {view: 'ComingSoon', id: 'programm', icon: 'program', label: 'Sendung verpasst', ignore: true},
                {view: 'ComingSoon', id: 'live', icon: 'dot', label: 'LIVE TV', ignore: true},
                {view: 'GlossaryPage', icon: 'a-z', label: 'Sendung A-Z', ignore: false},
                {view: 'DataProtectionPage', id: 'dataprotection', label: 'Datenschutz', offset: 18, ignore: true},
                {view: 'ImpressumPage', id: 'impressum', label: 'Impressum', offset: 18, ignore: true}
            ]
        }

        findActivePage() {
            const currentView = this.cparent.currentView;
            const menuItems = this.menuItems;

            for(let i = 0; i < menuItems.length; i++) {
                if(menuItems[i].view === currentView.view && (!menuItems[i].id || menuItems[i].id === currentView.persist.type)) {
                    this.tag('MenuItems').items[this.activePage].active = false;
                    this.activePage = i;
                    this.tag('MenuItems').index = i;
                    this.tag('MenuItems').items[this.activePage].active = true;
                }
            }
        }

        show() {
            this.findActivePage();
            if(this.state === 'Idle') {
                this.showPanel.start();
            }
            else{
                this.patch({
                    alpha: 1,
                    transitions: {x: {duration: 0.5}}, smooth: {x: 0}
                });
            }
        }

        hide() {
            this.patch({
                transitions: {x: {duration: 0.25}}, smooth: {x: -620}
            });
        }

        _getFocused() {
            return this.tag(this.state) || this
        }

        static _states() {
            return {
                _init() {
                    const menuItems = this.menuItems;

                    this.activePage = 0;

                    this.tag('MenuItems').items = menuItems.map((item, index) => {
                        const offset = (item.offset ? 33 : 0) + index*74;
                        return {ref: item.label, item: item, y: offset, type: ArdMenuItem, active: index === this.activePage, ignore: item.ignore}
                    });

                    const optionItems = [
                        {icon: 'settings'},
                        {icon: 'faq'}
                    ];

                    this.tag('OptionsBar').items = optionItems.map((item, index) => {
                        return {ref: item.icon.toUpperCase(), item: item, x: index * 303, type: MenuOption}
                    });

                    this.showPanel = this.animation({duration: 1, actions: [
                            {t: '', p: 'alpha', rv: 0, v: {0: 1}},
                            {t: '', p: 'x', rv: -620, v: {0: -620, 0.6: 0}},
                            {t: 'Wrapper.HeaderShadow', p: 'y', rv: 0, v: {0.35: -30, 0.85: 148}},
                            {t: 'Wrapper.Header', p: 'y', rv: -210, v: {0.35: -210, 0.85:0}},
                            {t: 'Wrapper.MenuItems', p: 'alpha', rv: 0, v: {0.7: 0, 1: 1}},
                            {t: 'Wrapper.Seperator', p: 'alpha', rv: 0, v: {0.7: 0, 1: 1}},
                            {t: 'Wrapper.OptionsBar', p: 'y', rv: 1080, v: {0.35: 1080, 0.85: 895}},
                            {t: 'Wrapper.OptionsBar.SETTINGS', p: 'scale', rv: 0, v: {0.7: 0, 0.85: 1}},
                            {t: 'Wrapper.OptionsBar.FAQ', p: 'scale', rv: 0, v: {0.85: 0, 1: 1}},
                        ]});

                    this.showPanel.on('finish', () => {
                        this.fire('animationFinished');
                    });

                    this.transition('x').on('finish', () => {
                        this.patch({
                            alpha: (this.x !== -620)
                        });
                    });

                    return 'Idle'
                },
                _unfocus() {
                    this.tag('MenuItems').index = 0;
                    this.tag('OptionsBar').index = 0;
                    return 'MenuItems'
                    // return 'Idle'
                },
                _handleLeft() {
                    //block handle left events
                },
                _handleUp() {
                    //block handle up events
                },
                _handleDown() {
                    //block handle down events
                },
                Idle: {
                    animationFinished() {
                        return 'MenuItems'
                    }
                },
                AccountItems: {

                },
                MenuItems: {
                    _handleDown: 'OptionsBar',
                    _handleEnter() {
                        const menuItems = this.tag('MenuItems');
                        const targetIndex = menuItems.items.indexOf(menuItems.item);
                        const targetItem = menuItems.items[targetIndex];

                        if(targetItem.item.view) {
                            menuItems.items[this.activePage].active = false;
                            targetItem.active = true;
                            this.activePage = targetIndex;
                            // const ignore = targetItem.item.view === 'InfoPage' || targetItem.item.view === 'ComingSoon'
                            this.signal('switchView', {view: targetItem.item.view, persist: {type: !targetItem.item.id ? this.currentChannel : targetItem.item.id}, ignore: targetItem.ignore});
                        }
                    }
                },
                OptionsBar: {
                    _handleUp: 'MenuItems',
                    _handleEnter() {
                        if(this.tag('OptionsBar').item.item.icon === 'faq') {
                            this.signal('switchView', {view: 'FAQPage', persist: {type: 'faq'}, ignore: true});
                        }
                        else{
                            this.signal('switchView', {view: 'SettingsPage', persist: {type: 'settings'}, ignore: true});
                        }

                    },
                    _exit() {
                        this.tag('OptionsBar').index = 0;
                    }
                }
            }
        }
    }

    class Grid extends lng.Component {
        static _template() {
            return {
                boundsMargin: [0, 600, 0, 600], h: 1080,
                Wrapper: {

                }
            }
        }

        set theme(theme) {
            this._theme = theme;
        }

        get theme() {
            return this._theme
        }

        set items(items) {
            this.reset();
            if(items.length < 4) {
                this.columns = items.length;
            }

            this._wrapper.children = items;

            let columnOffset = 0;
            let rowOffset = 0;
            let tallestInRow = 0;

            this._wrapper.children.forEach((child, index) => {
                if(!child.exists) {
                    child.patch({x: columnOffset, y: rowOffset});
                }
                if(child.h > tallestInRow) {
                    tallestInRow = child.h;
                }
                if(index % 4 === 3) {
                    columnOffset = 0;
                    rowOffset += tallestInRow + this.verticalSpacing;
                    tallestInRow = 0;
                }
                else {
                    columnOffset += child.w + this.horizontalSpacing;
                }
            });




            this.rows = this.calculateRows(this.length) + 1;
            this.setSmooth('alpha', 1, {duration: 0.2});
        }

        set row(r) {
            this.signal('rowIndexChanged', {row: r, previousRow: this._r});
            this._r = r;
            this.update();
        }

        get row() {
            return this._r
        }

        set paddingTop(v) {
            this._pt = v;
        }

        get paddingTop() {
            return this._pt || 0
        }

        set paddingBottom(v) {
            this._pb = v;
        }

        get paddingBottom() {
            return this._pb || 0
        }

        get horizontalSpacing() {
            return 16
        }

        get verticalSpacing() {
            return 65
        }

        reset() {
            this._wrapper.children = [];
            this._wrapper.y = this.paddingTop;
            this.row = 0;
            this.col = 0;
            this.columns = 4;
            this.index = 0;
        }

        calculateRows(amount) {
            const rest = amount % 4;
            let result = Math.floor(amount / 4);
            if(rest === 0){
                return result - 1
            }
            return result
        }

        calculateIndex(r = this.row, c = this.col){
            return r * this.columns + c
        }

        get viewportSize() {
            return this.h - this.paddingTop - this.paddingBottom
        }

        update() {
            const cp = this._wrapper.y;
            const vs = this.viewportSize;
            const vp = this.paddingTop - cp;
            const ci = this.item;
            let y = cp;

            if(ci) {
                if(ci.y < vp){
                    y = -(ci.y - this.paddingTop);
                }
                if((ci.y + ci.h) > vp + vs){
                    y -= (ci.y + ci.h) - (vp + vs);
                }

                this._wrapper.setSmooth('y', y);
            }
        }

        get length() {
            return this.items.length
        }

        get items() {
            return this._wrapper.children
        }

        get item(){
            return this.items[this.calculateIndex()]
        }

        get lastChild() {
            return this.items && this.items[this.length-1] || null
        }

        _getFocused() {
            return this.item
        }

        static _states() {
            return {
                _init() {
                    this._wrapper = this.tag('Wrapper');
                    this.reset();
                },
                _handleDown() {
                    const r = this.row + 1;
                    const children = this.items;
                    if(r < this.rows) {
                        if(!children[this.calculateIndex(r, this.col)]) {
                            this.col = (children.length - 1) % 4;
                        }
                        this.row = r;
                    }
                    else {
                        return false
                    }
                },
                _handleUp() {
                    if(0 < this.row) {
                        this.row--;
                    }
                    else {
                        return false
                    }
                },
                _handleRight() {
                    const c = this.col + 1;
                    const items = this.items;
                    const target = items[this.calculateIndex(this.row, c)];
                    if(c < this.columns && target) {
                        if(!target && this.row > 0) {
                            this.row--;
                        }
                        this.col = c;
                    }
                    else {
                        return false
                    }
                },
                _handleLeft() {
                    if(0 < this.col) {
                        this.col--;
                    }
                    else {
                        return false
                    }
                }
            }
        }
    }

    class GlossaryBarItem extends lng.Component {
        static _template() {
            return {
                Label: {mount: 0.5, x: 40, y: 43, text: {text: 'A', fontFace: 'TheSansB4', fontSize: 30}}
            }
        }

        set active(v) {
            this._active = v;
            if(this._fc) {
                this.patch({
                    Label: {smooth: {color: this._active && !this.hasFocus() ? this._fc.active : (this.hasFocus()) ? this._fc.focus : this._fc.color}}
                });
            }
        }

        get active() {
            return false && this._active
        }

        set theme({focus, text, textFocus, glossary: {background}, navigationPanel: {active}}) {
            this.patch({
                Label: {color: this._active ? active : text}
            });
            this._fc = {
                active: background,
                color: text,
                focus: textFocus
            };
        }
        get disabled() {
            return this._disabled
        }

        set disabled(bool) {
            this._disabled = bool;
            this.patch({alpha: bool ? 0.3 : 1});
        }

        static _states() {
            return {
                _init() {
                    this.disabled = false;
                    this.patch({
                        Label: {text: {text: this.item}}
                    });
                },
                _focus() {
                    this.patch({
                        Label: {smooth: {color: this._fc.focus}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Label: {smooth: {color: this._active ? this._fc.active : this._fc.color}}
                    });
                }
            }
        }
    }

    class GlossaryBar extends ItemList {
        static _template() {
            return lng.tools.ObjMerger.merge(super._template(), {
                    Focus: {alpha: 0, w: 80, h: 80, rect: true, transitions: {x: {duration: 0.3}}}
                })
        }

        set theme(theme) {
            this.selectedIndex = 0;
            this.patch({
                Focus: {color: theme.focus}
            });
            this._index = 0;
            this.items.forEach((item, index) => {
                item.theme = theme;
                item.active = index === this.selectedIndex;
            });
        }

        filter({glossary}) {
            this._index = -1;
            Object.keys(glossary).forEach((key) => {
                this.tag(`Sort-${key.replace('shows', '')}`).disabled = !glossary[key].length;
            });
            this.index = this.targetHasData(1);
        }

        targetHasData(dir) {
            let i = this._index + dir;
            let l = this.length;
            for(i; (dir < 0 && i > -1) || (dir > 0 && i < l); i+=dir) {
                if(!this.items[i].disabled) {
                    return i
                }
            }
            return -1
        }

        get orientation() {
            return 'horizontal'
        }

        static _states() {
            return lng.tools.ObjMerger.merge(super._states(), {
                _init() {
                    this.selectedIndex = 0;
                    this._index = 0;

                    const items = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                    this.items = items.map((item, index) => {
                        return {ref: `Sort-${item}`, type: GlossaryBarItem, item, x: index * 60}
                    });

                    const focus = this.tag('Focus');
                    focus.transition('x').on('finish', () => {
                        this.signal('showGrid', {sort: this.item.item});
                    });
                },
                _handleRight() {
                    return this.navigate(this.targetHasData(1), this.orientation, true)
                },
                _handleLeft() {
                    return this.navigate(this.targetHasData(-1), this.orientation, true)
                },
                _focus() {
                    this.patch({
                        Focus: {smooth: {alpha: 1}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Focus: {smooth: {alpha: 0}}
                    });
                },
                indexChanged(e) {
                    this.signal('hideGrid');
                    this.patch({
                        Focus: {smooth: {x: e.index*60}}
                    });
                    if(this.length) {
                        this.items[this.selectedIndex].active = false;
                        this.selectedIndex = e.index;
                        this.items[e.index].active = true;
                    }
                }
            })
        }
    }

    class NoResultsItem extends lng.Component {
        static _template() {
            return {
                Icon: {mountX: 0.5, x: 960, y: -18, type: IconItem, icon: {src: 'icons/player/info.svg', w: 140, h: 140}},
                Message: {w: 700, mountX: 0.5, x: 960, y: 100, text: {text: 'Es wurden keine Ergebnisse gefunden', maxLines: 3, fontSize: 42, fontFace: 'TheSansB4', textAlign: 'center'}},
            }
        }

        set theme({text}) {
            this.patch({
                Icon: {color: text},
                Message: {color: text}
            });
        }

        static _states() {
            return {

            }
        }
    }

    class DurationLabel extends lng.Component {
        static _template() {
            return {
                Background: {h: 46, w: 90, rect: true},
                Label: {
                    mount: 0.5, x: 45, y: 26, text: {text: '0 Min.', fontSize: 22, fontFace: 'TheSansB4'}
                }
            }
        }

        set label(value) {
            this.tag('Label').text.text = Math.ceil(value/60) + ' Min.';
        }

        set theme({duration: {text, background}}) {
            this.patch({
                Background: {color: background},
                Label: {color: text}
            });
        }

        static _states() {
            return {
                _init() {
                    const label = this.tag('Label');
                    const background = this.tag('Background');

                    label.on('txLoaded', () => {
                        const labelWidth = label.renderWidth;

                        if(labelWidth > background.w - 10) {
                            background.w = labelWidth + 10;
                            label.x = background.w / 2;
                        }

                        this.x = this.cparent.w - (background.w + 5);
                        if(this.cparent.tag('ImageHolder')) {
                            this.y = this.cparent.tag('ImageHolder').h - (background.h + 6);
                        }
                        else{
                            this.y = this.cparent.h - (background.h + 6);
                        }
                    });
                },
                _focus() {
                    this.tag('Background').setSmooth('alpha', 1);
                },
                _unfocus() {
                    this.tag('Background').setSmooth('alpha', 0.8);
                }
            }
        }
    }

    class GridCell extends lng.Component {
        static _template() {
            return {
                Shadow: {mount: 0.5},
                ImageHolder: { w: 340, h: 452, clipping: true,
                    Image: {transitions: {scale: {duration: 0.7}}},
                    Duration: {type: DurationLabel}
                },
                Background: {},
                Labels: {
                    Live: {x: 10, text: {text: 'LIVE', fontSize: 29, maxLines: 1, fontFace: 'TheSansB6'}},
                    Headline: {x: 10},
                    Subline: {x: 10}
                }
            }
        }

        static _states() {
            return {
                _init() {
                    const sublineLabel = this.tag('Subline');
                    const headlineLabel = this.tag('Headline');

                    headlineLabel.on('txLoaded', () => {
                        const headlineHeight = headlineLabel.renderHeight;
                        sublineLabel.y = headlineLabel.y;
                        if (headlineHeight > 0) {
                            sublineLabel.y += headlineHeight - 12;
                        }
                    });

                    const {images = {}, mediumTitle = null, publicationService, show, duration, type} = this.item;
                    let secondaryTitle = null;

                    if (publicationService && show) {
                        secondaryTitle = `${show.title}${this.channel === 'ard' ? ` \u2022 ${publicationService.name}` : ''}`;
                    }

                    let sizes = ArdCellSizes[this.base];
                    let image = images.aspect16x9 || {};

                    if(type === 'poster') {
                        sizes = ArdCellSizes['poster'];
                        image = images.aspect3x4 || {};
                    }
                    let {w, h, imageHeight, headlineOnly} = sizes;

                    const {globalShadow, teaser: {headline, subline, background}, live: {progress:live}, fillTeaser} = this.theme;
                    const isLive = type === 'live';

                    if(type !== 'poster' && fillTeaser) {
                        if(type === 'show' || isLive || this.headerOnly) {
                            h = imageHeight + headlineOnly;
                        }

                        if(!mediumTitle) {
                            h = imageHeight;
                        }
                    }
                    let shadowHeight = h;

                    if(!fillTeaser) {
                        shadowHeight = imageHeight;
                    }

                    if(this.showTime) {
                        secondaryTitle = this.time;
                    }
                    
                    this.patch({
                        w, h,
                        Shadow: {alpha: 0, x: w/2, y: shadowHeight/2, color: globalShadow, texture: lng.Tools.getShadowRect(w+10, shadowHeight+10, 0, 20, 20)},
                        ImageHolder: { w, h: imageHeight,
                            Image: {w, h: imageHeight, src: image.src && ux.Ui.getImageUrl(image.src.replace('{width}', w) || '', {width: w, height: imageHeight, type: 'crop'})},
                            Duration: {visible: !!duration && duration > 0, label: duration, theme: this.theme}
                        },
                        Background: {visible: !!fillTeaser, y: imageHeight-2, w, h: h - imageHeight, color: background, rect: true },
                        Labels: { y: imageHeight + 10, alpha: !!(type !== 'poster'),
                            Live: {alpha: !!isLive, color: live},
                            Headline: {color: headline, x: isLive ? 70 : 10, w: w - (isLive ? 120 : 10) - 10, text: {text: mediumTitle, fontSize: 29, lineHeight: 40, maxLines: 2, fontFace: 'TheSansB6'}},
                            Subline: {color: subline, alpha: !this.headerOnly && !!secondaryTitle, x: isLive ? 70 : 10, w: w - (isLive ? 120 : 10) - 10, text: {text: secondaryTitle, maxLines: 1, fontSize: 27, fontFace: 'TheSansB4'}}
                        }
                    });

                    this.tag('Image').on('txError', () => {
                        this.patch({
                            ImageHolder: {
                                Image: {rect: true, color: background}
                            }
                        });
                    });
                },
                _focus() {
                    this.patch({
                        smooth: {scale: 1.13, zIndex: 2},
                        Shadow: {smooth: {alpha: 1}}
                    });
                },
                _unfocus() {
                    this.patch({
                        smooth: {scale: 1, zIndex: 0},
                        Shadow: {smooth: {alpha: 0}}
                    });
                }
            }
        }
    }

    const ArdCellSizes = {
        'list': {w: 490, h: 422, headlineOnly: 95, imageHeight: 276},
        'grid': {w: 412, h: 375, headlineOnly: 100, imageHeight: 232},
        'poster': {w: 340, h: 452, imageHeight: 452}
        // 'xl':{w: 1280, h: 560, imageHeight: 560},
        // 'l': {w: 758, h: 500, imageHeight: 426},
        // 'm': {w: 412, h: 330, imageHeight: 232},
        // 'poster': {w: 340, h: 525, imageHeight: 452},
        // 's': {w: 340, h: 284, imageHeight: 191}
    };

    class GlossaryPage extends lng.Component {
        static _template() {
            return { alpha: 0, boundsMargin: [600, 600, 600, 600], w: 1920, h: 1080,
                Grid: {type: Grid, y: 129, x: 115, paddingTop: 206, paddingBottom: 115, signals: {rowIndexChanged: true}},
                Shadow: {y: 195, alpha: 0, h: 275, w: 1920, rect: true},
                Sort: {type: GlossaryBar, x: 140, y: 195, signals: {hideGrid: true, showGrid: true}},
                NoResults: {alpha: 0, type: NoResultsItem, y: 330}
            }
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        set theme(theme) {
            this._t = theme;
            this.patch({
                Shadow: {colorBottom: 0x00000000, colorTop: theme.fade},
                Sort: {theme},
                NoResults: {theme}
            });
        }

        update(sort, data = this.data) {
            const teasers = data.glossary[`shows${sort}`];
            this.data = data;
            this.patch({
                Grid: {items: teasers.map((item) => {
                    return {ref: `T${item.id}`, base: 'grid', item, channel: this.api.currentChannel, theme: this._t,  type: GridCell}
                })},
                NoResults: {alpha: teasers.length > 0 ? 0 : 0.6}
            });
        }

        _getFocused() {
            if(this.state === 'Active.Sort') {
                return this.tag('Sort')
            }
            if(this.state === 'Active.Grid') {
                return this.tag('Grid')
            }
            return this
        }

        static _states() {
            return {
                _init() {
                    this.index = 0;
                    return 'Active'
                },
                loadView({isPreviousView, toLoad: {persist: {type = null, pageType = null, data = null}}}) {
                    this.isPreviousView = isPreviousView;
                    this.fire('loading');
                    if(!isPreviousView && !data) {
                        if(type === 'alle') {
                            type = 'ard';
                        }
                        this.api.getGlossaryPageData(type)
                            .then((response) => {
                                const sort = this.tag('Sort');
                                sort.filter(response);
                                this.update(sort.item.item, response);
                                this.fire('finishedLoading');

                            });
                    }
                    else if(!isPreviousView) {
                        this.update(data);
                    }
                    else {
                        return 'Show'
                    }
                },
                loading: 'Loading',
                finishedLoading: 'Show',
                Loading: {
                    finished: 'Show'
                },
                hideView: 'Hide',
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return this.isPreviousView ?  'Active.Grid' : 'Active.Sort'
                    }
                },
                Idle: {
                },
                Active: {
                    Sort: {
                        _enter() {
                            this.hasToolbarHidden = false;
                            this.signal('showToolbar');
                        },
                        _handleDown() {
                            const grid = this.tag('Grid');
                            if (grid.alpha === 1 && grid.length) {
                                return 'Active.Grid'
                            }
                        },
                        hideGrid() {
                            this.tag('Grid').setSmooth('alpha', 0, {duration: 0.1});
                        },
                        showGrid(e) {
                            this.update(e.sort);
                        }
                    },
                    Grid: {
                        _enter() {
                            if(this.tag('Grid').row > 0) {
                                this.fire('rowIndexChanged', {row: 1, previousRow: 0});
                            }
                            else {
                                this.hasToolbarHidden = false;
                                this.signal('showToolbar');
                            }
                        },
                        _exit(e) {
                            this.patch({
                                Grid: {smooth: {y: 129}},
                                Shadow: {smooth: {y: 195-51, alpha: 0}},
                                Sort: {smooth: {y: 195}},
                            });
                            if(e.event !== 'hideView') {
                                this.hasToolbarHidden = false;
                                this.signal('showToolbar');
                            }
                        },
                        _handleEnter() {
                            const item = this.tag('Grid').item.item;
                            if(item.type !== 'live') {
                                this.signal('switchView', {view: 'ShowPage', persist: {targetId: item.links.target.id}});
                            }
                        },
                        rowIndexChanged(e) {
                            if(e.row === 1 && e.previousRow === 0) {
                                this.patch({
                                    Grid: {smooth: {y: 0}},
                                    Shadow: {smooth: {y: 0, alpha: 1}},
                                    Sort: {smooth: {y: 51}}
                                });
                                this.hasToolbarHidden = true;
                                this.signal('hideToolbar');
                            }
                        },
                        _handleUp: 'Active.Sort'
                    }
                }
            }
        }
    }

    class SlideBar extends lng.Component {
        static _template() {
            return { x: 1630, y: 180,
                Slider: {
                    color: 0xff00ff00, texture: lng.Tools.getRoundRect(10, 890, 5, 2, 0xffffffff, true, 0xffffffff)
                }
            }
        }

        set theme(theme) {
            this.patch({
                Slider: {color: theme.text}
            });
            this._fc = {
                color: theme.text,
                focus: theme.slider
            };
        }

        scroll() {
            const scroller = this.tag('Slider');
            scroller.setSmooth('y', this.scrollSize * this.currentStep);
            this.signal('scroll', {step: this.currentStep});
            return true
        }

        set frame(v) {
            this._frame = v;
        }

        get frame() {
            return this._frame || 840
        }

        set contentSize(v) {
            this.steps = Math.ceil(Math.abs((this.frame - v - 160) / 200));
            this.currentStep = 0;
            this.scrollSize = this.frame / (this.steps);
            this.tag('Slider').texture = lng.Tools.getRoundRect(10, this.scrollSize, 5, 2, 0xffffffff, true, 0xffffffff);
            this.scroll();
        }

        static _states() {
            return {
                _init() {

                },
                _focus() {
                    this.patch({
                        Slider: {smooth:{color: this._fc.focus}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Slider: {smooth:{color: this._fc.color}}
                    });
                },
                _handleUp() {
                    const target = this.currentStep - 1;
                    if(target >= 0) {
                        this.currentStep = target;
                        return this.scroll()
                    }
                    return false
                },
                _handleDown() {
                    const target = this.currentStep + 1;
                    if(target < this.steps) {
                        this.currentStep = target;
                        return this.scroll()
                    }
                    return false
                }
            }
        }
    }

    class InfoPage extends lng.Component {
        static _template() {
            return {
                alpha: 0,
                Anchor: { x: 960, y: 170,
                    Wrapper: {mountX: 0.5, w: 1260, h: 0,
                        flex: {direction: 'row', wrap: true}
                    }
                },
                SlideBar: {
                    type: SlideBar, signals: {scroll: true}
                }
            }
        }

        update(data) {
        }

        set items(v) {
            const wrapper = this.tag('Wrapper');
            this.tag('Anchor').y = 170;
            wrapper.children = v;
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        set theme(theme) {
            this.tag('SlideBar').theme = theme;
            this._colors = theme;
            const wrapper = this.tag('Wrapper');
            if(wrapper.children.length) {
                wrapper.children.forEach((child) => {
                    child.color = theme.text;
                    if(child.children.length) {
                        child.children.forEach((subChild) => {
                            subChild.color = theme.text;
                        });
                    }
                });
            }
        }

        _getFocused() {
            return this.tag('SlideBar')
        }

        static _states() {
            return {
                _init() {
                    this.update();
                },
                _focus() {
                    this.tag('SlideBar').contentSize = this.tag('Wrapper').flex._layout.targetCrossAxisSize;
                },
                loadView({toLoad: {persist: {type = null}}}) {
                    this.fire('finishedLoading');
                },
                finishedLoading() {
                    return 'Show'
                },
                hideView: 'Hide',
                Loading: {
                    finished: 'Show'
                },
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return 'Active'
                    }
                },
                Idle: {
                },
                Active: {
                    scroll(e) {
                        const anchor = this.tag('Anchor');
                        anchor.setSmooth('y', 170 - (e.step * 200));
                    }
                }
            }
        }
    }

    class ImpressumPage extends InfoPage {
        update() {
            this.api.getInfo('impressum')
                .then((data) => {
                    const color = this._colors.text;
                    const items = [
                        {w: 1260, color, text: {text: data.Page, fontSize: 38, fontFace: 'TheSansB6', textAlign: 'center'}},
                        {w: 1260, color, text: {text: data.Description, fontSize: 24, lineHeight: 30, fontFace: 'TheSansB4'}},
                        {w: 1260, color, text: {text: data.Description2, fontSize: 24, lineHeight: 30, fontFace: 'TheSansB4'}, flexItem: {marginTop: 10}},
                        {w: 1260, color, text: {text: data.MainAddress, fontSize: 24, lineHeight: 30, fontFace: 'TheSansB6'}, flexItem: {marginTop: 10}},
                        {w: 1260, color, text: {text: data.MainAddressInfo, fontSize: 24, lineHeight: 30, fontFace: 'TheSansB4'}},
                        {w: 1260, color, text: {text: data.ExtraHeader, fontSize: 34, fontFace: 'TheSansB4'}, flexItem: {marginTop: 10}}
                    ];


                    const a = data.Addresses;
                    const addresses = Object.keys(a).map((key) => {
                        return {w: 630, flex: {direction: 'row', wrap: true},
                            Studio: {w: 630, color, text: {text: key, fontSize: 27, fontFace: 'TheSansB6'}, flexItem: {marginTop: 10}},
                            Address: {w: 630, color, text: {text: a[key], fontSize: 24, lineHeight: 30, fontFace: 'TheSansB4'}},
                            __create: true
                        }
                    });

                    this.items = [...items, ...addresses];
                });
        }
    }

    class DataProtectionPage extends InfoPage {
        update() {
            this.api.getInfo('dataprotection')
                .then((data) => {
                    const color = this._colors.text;
                    const items = [
                        {w: 1260, color, text: {text: data.Page, fontSize: 38, fontFace: 'TheSansB6', textAlign: 'center'}},
                        {w: 1260, color, text: {text: data.Description, fontSize: 24, lineHeight: 30, fontFace: 'TheSansB4'}}
                    ];


                    const c = data.Content;
                    const content = Object.keys(c).map((key) => {
                        return {w: 1260, flex: {direction: 'row', wrap: true},
                            Header: {w: 1260, color, text: {text: key, fontSize: 27, fontFace: 'TheSansB6'}, flexItem: {marginTop: 10}},
                            Detail: {w: 1260, color, text: {text: c[key], fontSize: 24, wordWrap: true, lineHeight: 30, fontFace: 'TheSansB4'}},
                            __create: true
                        }
                    });

                    this.items = [...items, ...content];
                });
        }
    }

    class InfoCollection extends lng.Component {
        static _template() {
            return {
                Header: {x: 25, y: 5, w: 1450, text: {text: 'Header', fontSize: 42, maxLines: 1, lineHeight: 50, fontFace: 'TheSansB4', textAlign: 'left'}},
                ItemList: {h: 1080, type: ItemList, y: 84, orientation: 'vertical'}
            }
        }

        set items(v) {
            this.tag('ItemList').items = v;
        }

        get items() {
            return this.tag('ItemList').items
        }

        get item() {
            return this.tag('ItemList').item
        }

        set theme(theme) {
            this.patch({
                Header: {color: theme.text}
            });
            this.items.forEach((item) => {
                item.theme = theme;
            });
        }

        _getFocused() {
            return this.tag('ItemList')
        }

        static _states() {
            return {
                _unfocus() {
                    this.tag('ItemList').index = 0;
                },
                _init() {
                    this.patch({
                        Header: {text:{text: this.label}}
                    });
                    const itemList = this.tag('ItemList');
                    itemList.onUpdate = (() => {
                        const items = itemList.items;

                        let offset = 0;
                        items.forEach((item, index) => {
                            item.y = offset;
                            if(itemList.index === index && this.hasFocus()) {
                                offset = item.y + item.expandedHeight;
                            }
                            else {
                                offset = item.y + item.collapsedHeight;
                            }
                        });
                    });
                }
            }
        }
    }

    class FAQItem extends lng.Component {
        static _template() {
            return { h: 86,
                Headline: {x: 25, y: 35, w: 1450, text: {text: '', fontSize: 42, maxLines: 1, lineHeight: 50, fontFace: 'TheSansB4', textAlign: 'left'}},
                FAQWrapper: { w: 1500, h: 86,
                    FAQ: {
                        Background: {alpha: 0, w: 1500, h: 86, rect: true, color: 0xff0000ff},
                        Label: {x: 25, y: 17, w: 1450, text: {text: 'Header', fontSize: 36, maxLines: 1, lineHeight: 50, fontFace: 'TheSansB4', textAlign: 'left'}}
                    },
                    BorderTop: {y: -1, w: 1500, h: 2, rect: true},
                    Info: {w: 1500, y: 86,
                        Label: {x: 25, y: 15, w: 1450, text: {text: 'Info', fontSize: 34, lineHeight: 45, fontFace: 'TheSansB4', textAlign: 'left'}}
                    },
                    BorderBottom: {y: 85, w: 1500, h: 2, rect: true}
                }
            }
        }

        set expandedHeight(v) {
            this._expandedHeight = v;
        }

        get expandedHeight() {
            return this._expandedHeight
        }

        set collapsedHeight(v) {
            this._collapsedHeight = v;
        }

        get collapsedHeight() {
            return this._collapsedHeight
        }

        set theme({focus, text, textFocus}) {
            this.patch({
                Headline: {color: text},
                FAQWrapper: {
                    FAQ: {
                        Background: {color: focus},
                        Label: {color: text}
                    },
                    BorderTop: {color: text},
                    Info: {
                        Label: {color: text}
                    },
                    BorderBottom: {color: text}
                }
            });
            this._fc = {
                text,
                textFocus
            };
        }

        static _states() {
            return {
                _init() {
                    this._hasHeadline = false;
                    const {headline = '', header, info} = this.item;
                    if(headline.length) {
                        this._hasHeadline = true;
                    }

                    this.patch({
                        Headline: {text: {text: this._hasHeadline ? headline : ''}},
                        FAQWrapper: { y: this._hasHeadline ? 114 : 0,
                            FAQ: {
                                Label: {text: {text: header}}
                            },
                            Info: { alpha: 0,
                                Label: {text: {text: info}}
                            }
                        }
                    });

                    const infoLabel = this.tag('Info').tag('Label');
                    infoLabel.loadTexture(true);
                    this.collapsedHeight = (this._hasHeadline ? 114 : 0) + 86;
                    this.expandedHeight = this.collapsedHeight + infoLabel.renderHeight + 30;
                    this.h = this.collapsedHeight;
                },
                _focus() {
                    const wrapperH = this.expandedHeight - (this._hasHeadline ? 114 : 0);
                    this.patch({smooth:{h: this.expandedHeight},
                        FAQWrapper: {smooth: {h: wrapperH},
                            FAQ: {
                                Background: {smooth:{alpha: 1}},
                                Label: {color: this._fc.textFocus}
                            },
                            Info: {alpha: 1},
                            BorderBottom: {y: wrapperH- 1}
                        }
                    });
                },
                _unfocus() {
                    const wrapperH = this.collapsedHeight - (this._hasHeadline ? 114 : 0);
                    this.patch({ smooth: {h: this.collapsedHeight},
                        FAQWrapper: { smooth: {h: wrapperH},
                            FAQ: {
                                Background: {smooth: {alpha: 0}},
                                Label: {color: this._fc.text}
                            },
                            Info: {alpha: 0},
                            BorderBottom: {y: wrapperH - 1}
                        }
                    });
                }
            }
        }
    }

    class FAQItemScroller extends lng.Component {
        static _template () {
            return {
                Wrapper: {}
            }
        }

        set index (i) {
            this._i = i;
        }

        get index () {
            return this._i || 0
        }

        set items(items) {
            this._wrapper.children = items;
            this.reposition();
            this.scrollToFocusedItem();
        }

        get items () {
            return this._wrapper.children
        }

        get viewportSize () {
            return this.h
        }

        get length () {
            return this._wrapper.children.length
        }

        get scrollTransitionSettings () {
            return this._scrollTransitionSettings
        }

        set scrollTransition (v) {
            this._scrollTransitionSettings.patch(v);
        }

        get scrollTransition () {
            return this._scrollTransition
        }

        scrollToFocusedItem() {
            if(this.focusedItem) {
                const focusPosition = this.getItemCenterPosition();
                const scrollPosition = this.getScrollPosition(focusPosition);
                this._scrollTransition.start(-scrollPosition);
            }
        }

        getItemCenterPosition() {
            const items = this.items;
            let total = this.items[0].y;
            for(let i = 0; i < this.index; i++) {
                total += items[i].collapsedHeight;
            }
            total += items[this.index].expandedHeight * 0.5;
            return total
        }

        getScrollPosition(pos) {
            const s = this.getFullSize();
            const marginStart = this.marginTop || 0;
            const marginEnd = this.marginBottom || 0;
            const maxDistanceStart = 0.5 * this.viewportSize - marginStart;
            const maxDistanceEnd = 0.5 * this.viewportSize - marginEnd;
            if ((pos < maxDistanceStart) || (s < this.viewportSize - (marginStart + marginEnd))) {
                pos = maxDistanceStart;
            } else if (pos > s - maxDistanceEnd) {
                pos = s - maxDistanceEnd;
            }
            return pos - 0.5 * this.viewportSize;
        }

        getFullSize() {
            let total = 0;
            const items = this.items;
            for(let i = 0; i < this.length; i++) {
                if(i !== this.index) {
                    total += items[i].collapsedHeight;
                }
                else {
                    total += items[i].expandedHeight;
                }
            }
            return total;
        }

        reposition() {
            const children = this._wrapper.children;
            let offset = 0;
            children.forEach((child) => {
                if(child) {
                    child.y = offset;
                }
                offset += child.h;
            });
        }

        navigate(dir) {
            const target = this.index + dir;
            if(-1 < target && target < this.length) {
                this.index = target;
                this.scrollToFocusedItem();
                return true
            }
            return false
        }

        get focusedItem() {
            return this.items[this.index]
        }

        _getFocused() {
            return this.focusedItem || this
        }

        static _states() {
            return {
                _init() {
                    this._wrapper = this.tag('Wrapper');
                    this._wrapper.onUpdate = (() => this.reposition());

                    this._scrollTransitionSettings = this.stage.transitions.createSettings({});
                    this._wrapper.transition('y', this._scrollTransitionSettings);
                    this._scrollTransition = this._wrapper.transition('y');
                },
                _handleUp() {
                    return this.navigate(-1)
                },
                _handleDown() {
                    return this.navigate(1)
                }
            }
        }
    }

    class FAQPage extends lng.Component {
        static _template() {
            return { alpha: 0,
                FAQItems: {type: FAQItemScroller, x: 210, w: 1500, h: 1080, marginTop: 160, marginBottom: 50}
                // MediathekInfo: {type: InfoCollection, label: 'Ich habe eine Frage zu Inhalten der ARD Mediathek', x: 210, y: 180},
                // PlayerInfo: {type: InfoCollection, label: 'Ich habe Probleme beim Abspielen von Videos', x: 1750, y: 180}
            }
        }

        switchInfo(v) {
            const check = v === 'mediathek';
            this.patch({
                FAQItems: {smooth: {x: check ? 210 : -1330}},
                // PlayerInfo: {smooth: {x: check ? 1750 : 210}}
            });
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        set theme(theme) {
            // this.patch({
            //     FAQItems: {theme},
            //     // PlayerInfo: {theme}
            // })
            this._theme = theme;
            this.tag('FAQItems').items.forEach((item) => {
                item.theme = theme;
            });
        }

        _getFocused() {
            return this.tag(this.state.replace('Active.', '')) || this
        }

        static _states() {
            return {
                _init() {
                    this.api.getInfo('faq')
                        .then((data) => {
                            const section1faqs = data.section1.faqs;
                            const section2faqs = data.section2.faqs;

                            const mediathek = Object.keys(section1faqs).map((key) => {
                                return {ref: key.toUpperCase(), item: section1faqs[key], type: FAQItem, theme: this._theme}
                            });
                            const playerInfo = Object.keys(section2faqs).map((key) => {
                                return {ref: key.toUpperCase(), item: section2faqs[key], type: FAQItem, theme: this._theme}
                            });
                            this.tag('FAQItems').items = [...mediathek, ...playerInfo];
                        });
                },
                loadView: 'Show',
                hideView: 'Hide',
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return 'Active.FAQItems'
                    }
                },
                Idle: {
                    loadView: 'Show'
                },
                Active: {
                    // _exit() {
                    //     this.switchInfo('mediathek')
                    // },
                    _handleUp() {
                        this.signal('outOfBounds', {direction: 'up'});
                    },
                    FAQItems: {

                    }
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
            }
        }
    }

    class Slider extends lng.Component {
        static _template(){
            return {
                Wrapper: {}
            }
        }

        get focusedItem() {
            return this._focusedItem
        }

        get index() {
            return this.itemList.getIndex(this._focusedItem)
        }

        get items() {
            return this.itemList.get()
        }

        set items(children) {
            this.setIndex(0);
            this.itemList.patch(children);
            this._scrollToFocusedItem(true);
            this.reposition();
        }

        get viewportSize() {
            return this.orientation === 'horizontal' ? this.w : this.h
        }

        get length() {
            return this.itemList.length
        }

        get scrollTransitionSettings() {
            return this._scrollTransitionSettings;
        }

        set scrollTransition(v) {
            this._scrollTransitionSettings.patch(v);
        }

        get scrollTransition() {
            return this._scrollTransition;
        }

        setNext() {
            if(this.carousel || this.index < this.length - 1) {
                this.setIndex(this.index + 1);
            }
            else {
                return false
            }
        }

        setPrevious() {
            if(this.carousel || this.index > 0) {
                this.setIndex(this.index - 1);
            }
            else {
                return false
            }
        }

        setIndex(index) {
            this.lastIndex = this.index;

            const nElements = this.length;
            if(!nElements) {
                return
            }

            if(index < 0) {
                index += nElements;
            }
            else {
                index = index % nElements;
            }
            this._focusedItem = this.items[index];
            this.signal('indexChanged', {index, previousIndex: this.lastIndex});
            this._scrollToFocusedItem();
        }

        _scrollToFocusedItem(immediate) {
            if (this.focusedItem) {
                let focusPosition = this.getItemCenterPosition(this.index);
                let scrollPosition = this.getScrollPosition(focusPosition);
                this._scrollTransition.start(-scrollPosition);

                if (immediate) {
                    this._scrollTransition.finish();
                }
            }
        }

        getItemCenterPosition(index) {
            if(index === -1)
                return 0

            const measure = this.orientation === 'horizontal' ? 'w' : 'h';
            const items = this.items;
            let total = 0;
            for(let i = 0; i < index; i++) {
                total += items[i][measure] + this.itemSpacing;
            }
            total += (items[index][measure] + this.itemSpacing) * 0.5;
            return total
        }

        getScrollPosition(pos) {
            const s = this.getFullSize();

            const marginStart = this.marginLeft || this.marginTop || 0;
            const marginEnd = this.marginRight || this.marginBottom || 0;

            const maxDistanceStart = 0.5 * this.viewportSize - marginStart;
            const maxDistanceEnd =  0.5 * this.viewportSize - marginEnd;
            if ((pos < maxDistanceStart) || (s < this.viewportSize - (marginStart + marginEnd))) {
                pos = maxDistanceStart;
            } else if (pos > s - maxDistanceEnd) {
                pos = s - maxDistanceEnd;
            }
            return pos - 0.5 * this.viewportSize
        }

        getFullSize() {
            let total = 0;
            const measure = this.orientation === 'horizontal' ? 'w' : 'h';
            const items = this.items;
            for(let i = 0; i < this.length; i++) {
                total += items[i][measure] + this.itemSpacing;
            }
            return total
        }

        reposition() {
            //reposition children
            const children = this._wrapper.children;
            const dataItems = this.items;
            const pos = this.orientation === 'horizontal' ? 'x' : 'y';
            const measure = this.orientation === 'horizontal' ? 'w' : 'h';
            let offset = 0;

            //position items or animate items horizontally
            children.forEach((child, index) => {
                child[pos] = offset;
                offset += dataItems[index][measure] + this.itemSpacing;
            });
        }

        set orientation(v) {
            this._o = v;
        }

        get orientation() {
            return this._o || 'horizontal'
        }

        set carousel(bool) {
            this._c = bool;
        }

        get carousel() {
            return this._c || false
        }

        get itemSpacing() {
            return this._spacing || 0
        }

        set itemSpacing(v) {
            this._spacing = v;
        }

        _getFocused() {
            return this._focusedItem || this
        }

        static _states() {
            return {
                _construct() {
                    this.allowVerticalMovement = true;
                    this._focusedItem = null;
                    this._progressAnimation = null;
                    this._scrollTransitionSettings = this.stage.transitions.createSettings({});
                },
                _init() {
                    this._wrapper = this.tag('Wrapper');
                    this._wrapper.onUpdate = (() => this.reposition());

                    this.itemList = new ListItems(this);
                    const or = this.orientation === 'horizontal' ? 'x' : 'y';

                    this._wrapper.transition(or, this._scrollTransitionSettings);
                    this._scrollTransition = this._wrapper.transition(or);

                    return 'Empty'
                },
                _focus() {
                    if(this.state === 'Empty'){
                        this.signal('isEmpty');
                    }
                    else{
                        this.signal('isFilled');
                    }
                },
                empty: 'Empty',
                Empty: {
                    filled: 'Filled'
                },
                Filled: {
                    _enter() {
                        this.setIndex(0);
                    },
                    _handleLeft() {
                        if(this.orientation === 'horizontal') {
                            return this.setPrevious()
                        }
                        else {
                            return false
                        }
                    },
                    _handleRight() {
                        if(this.orientation === 'horizontal') {
                            return this.setNext()
                        }
                        else {
                            return false
                        }
                    },
                    _handleUp() {
                        if(this.orientation === 'vertical') {
                            return this.setPrevious()
                        }
                        else {
                            return false
                        }
                    },
                    _handleDown() {
                        if(this.orientation === 'vertical') {
                            return this.setNext()
                        }
                        else {
                            return false
                        }
                    }
                }
            }
        }
    }

    class ListItems extends lng.tools.ObjectListWrapper {
        constructor(list) {
            let wrap = (item => {
                let parent = item.stage.createView();
                parent.add(item);


                // if(item._transitions){
                //     parent.transitions = item._transitions
                // }
                return parent
            });

            super(list._wrapper._children, wrap);
            this.list = list;
        }

        onAdd(item, index) {
            super.onAdd(item, index);

            this.list.fire('filled');

            const currentIndex = this.getIndex(this.list._focusedItem);
            if (index === 0 && currentIndex === 1) {
                // Keep selection on first item.
                this.list.setIndex(0);
            }
        }

        onRemove(item, index) {
            super.onRemove(item, index);
            if (this.list._focusedItem && this.list.index === -1) {
                // Item was removed.
                this.list.setIndex(Math.max(this.list.length - 1, index));
            }

            if (!this.list.length) {
                this.list.fire('empty');
            }
        }

        onSet(item, index) {
            super.onSet(item, index);
        }

        onSync(removed, added, order) {
            super.onSync(removed, added, order);
            if (order.length) {
                this.list.fire('filled');
                if (this.getIndex(this.list._focusedItem) === -1) {
                    this.list.setIndex(0);
                }
            } else {
                this.list.fire('empty');
            }
        }
    }

    class GridList extends lng.Component {
        static _template() {
            return {
                w: 1920, clipbox: true,
                Background: {x: 115, y: -10, h: 68, rect: true},
                Title: {x: 115, text: {text: 'test', fontSize: 40, maxLines: 1, fontFace: 'TheSansB4'}},
                Slider: {carousel: false, w: 1920, itemSpacing: 16, type: Slider, marginLeft: 115, marginRight: 115}
            }
        }

        set widget(v) {
            this._widget = v;
            if(this.enabled) {
                this.update();
            }
        }

        get widget() {
            return this._widget
        }

        get item() {
            return this.tag('Slider').focusedItem.item
        }

        get dataLength() {
            return this.tag('Slider').length
        }

        update(force = false ) {
            if(this.widget || force) {
                const {title = '', titleVisible, teasers,} = this.widget;

                const {background, text} = this.theme.moduleTitle;
                this.patch({
                    Background: {visible: !!background, color: background || 0xff00000000},
                    Title: {alpha: !!titleVisible, x: background ? 125 : 115, color: text, text: {text: title || ''}},
                    Slider: { y: titleVisible ? 75 : 20,
                        items: teasers.map((teaser, index) => {
                            return {ref: `T${teaser.id}`, index, headerOnly: false, parentId: this.widget.id, item: teaser, base: 'list', type: GridCell, channel: this.channel, theme: this.theme}
                        })
                    }
                });
                const slider = this.tag('Slider');
                let h = 0;
                slider.items.forEach((item) => {
                    if(item.h > h) {
                        h = item.h;
                    }
                });

                slider.h = h;

                this.h = slider.y + slider.h;
            }
        }

        _getFocused() {
            return this.tag('Slider')
        }

        static _states() {
            return {
                _init() {
                    const label = this.tag('Title');
                    label.on('txLoaded', () => {
                        this.tag('Background').w = label.renderWidth + 20;
                    });
                    this.on('firstEnabled', () => {
                        console.log("firstEnabled", label.text.text);
                    });
                },
                _firstEnable() {
                    this.update();
                }
            }
        }
    }

    class StageSlider extends lng.Component {
        static _template(){
            return {
                Wrapper: {}
            }
        }

        get focusedItem() {
            return this.items[this.center]
        }

        set index(i) {
            this._i = i;
        }
        get index() {
            return this._i
        }

        get items() {
            return this._wrapper.children
        }

        set items(children) {
            this.index = 0;
            this.dataLength = children.length;

            if(this.dataLength > 1 && this.dataLength < this.visibleCells) {
                children = [...children, ...children];
            }
            else if(this.dataLength === 1) {
                children = [...children, ...children, ...children];
            }

            const l = children.length;
            const split = (l - (l % 2)) / 2;
            const splice = children.splice(split + (l % 2));
            const newChildren = [...splice, ...children];
            this._wrapper.children = newChildren;
            this.center = split;
            this._scrollToFocusedItem();
            // this.setIndex(split)
        }

        get viewportSize() {
            return this.orientation === 'horizontal' ? this.w : this.h
        }

        set dataLength(v) {
            this._dataLength = v;
        }

        get dataLength() {
            return this._dataLength
        }

        get length() {
            return this._wrapper.children.length
        }

        get scrollTransitionSettings() {
            return this._scrollTransitionSettings;
        }

        set scrollTransition(v) {
            this._scrollTransitionSettings.patch(v);
        }

        get scrollTransition() {
            return this._scrollTransition;
        }

        navigate(dir) {
            if(this.dataLength === 1) {
                return
            }
            const copy = [...[], ...this.items];
            let item = null;
            if(dir === 'left') {
                item = copy.pop();
                item.x = copy[0].x - item.w;
                copy.unshift(item);
            }
            else {
                item = copy.shift();
                const lastChild = copy[copy.length-1];
                item.x = lastChild.x + lastChild.w;
                copy.push(item);
            }
            // item.shifted = true

            this._wrapper.children = copy;
            // this._scrollToFocusedItem()

            this._scrollTransition.start(this.x - (this.focusedItem.x - this.marginLeft));

            // if (immediate) {
            //     this._scrollTransition.finish();
            // }
        }

        setNext() {
            if(this.carousel || this.index < this.length - 1) {
                this.setIndex(this.index + 1);
            }
            else {
                this.signal('outOfBounds', {direction: this.orientation === 'horizontal' ? 'right' : 'down'});
            }
            this.signal('setNext');
        }

        setPrevious() {
            if(this.carousel || this.index > 0) {
                this.setIndex(this.index - 1);
            }
            else {
                this.signal('outOfBounds', {direction: this.orientation === 'horizontal' ? 'left' : 'up'});
            }
            this.signal('setPrevious');
        }

        setIndex(index) {
            let dir = 'left';
            if(index > this.index) {
                dir = 'right';
            }

            this.lastIndex = this.index;

            const nElements = this.dataLength;
            if(!nElements) {
                return
            }

            if(index < 0) {
                index += nElements;
            }
            else {
                index = index % nElements;
            }

            this.index = index;
            this.signal('indexChanged', {index, previousIndex: this.lastIndex});
            this.navigate(dir);
            // this._scrollToFocusedItem()
        }

        _scrollToFocusedItem(immediate) {
            if (this.focusedItem) {
                let focusPosition = this.getItemCenterPosition(this.center);
                let scrollPosition = this.getScrollPosition(focusPosition);

                this._scrollTransition.start(-scrollPosition);

                if (immediate) {
                    this._scrollTransition.finish();
                }
            }
        }

        getItemCenterPosition(index) {
            if(index === -1)
                return 0

            const measure = this.orientation === 'horizontal' ? 'w' : 'h';
            const items = this.items;
            let total = 0;
            for(let i = 0; i < index; i++) {
                total += items[i][measure] + this.itemSpacing;
            }
            total += (items[index][measure] + this.itemSpacing) * 0.5;
            return total
        }

        getScrollPosition(pos) {
            const s = this.getFullSize();

            const marginStart = this.marginLeft || this.marginTop || 0;
            const marginEnd = this.marginRight || this.marginBottom || 0;

            const maxDistanceStart = 0.5 * this.viewportSize - marginStart;
            const maxDistanceEnd =  0.5 * this.viewportSize - marginEnd;
            if ((pos < maxDistanceStart) || (s < this.viewportSize - (marginStart + marginEnd))) {
                pos = maxDistanceStart;
            } else if (pos > s - maxDistanceEnd) {
                pos = s - maxDistanceEnd;
            }
            return pos - 0.5 * this.viewportSize
        }

        getFullSize() {
            let total = 0;
            const measure = this.orientation === 'horizontal' ? 'w' : 'h';
            const items = this.items;
            for(let i = 0; i < this.length; i++) {
                total += items[i][measure] + this.itemSpacing;
            }
            return total
        }

        reposition() {
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
            const children = this._wrapper.children;
            const dataItems = this.items;
            const pos = this.orientation === 'horizontal' ? 'x' : 'y';
            const measure = this.orientation === 'horizontal' ? 'w' : 'h';
            let offset = 0;

            //position items or animate items horizontally
            children.forEach((child, index) => {
                if(!child.exists) {
                    child[pos] = offset;
                }
                offset += dataItems[index][measure] + this.itemSpacing;

                child.exists = true;
            });
        }

        get visibleCells() {
            return 3
        }

        set orientation(v) {
            this._o = v;
        }

        get orientation() {
            return this._o || 'horizontal'
        }

        set carousel(bool) {
            this._c = bool;
        }

        get carousel() {
            return this._c || false
        }

        get itemSpacing() {
            return this._spacing || 0
        }

        set itemSpacing(v) {
            this._spacing = v;
        }

        _getFocused() {
            return this.focusedItem || this
        }

        static _states() {
            return {
                _construct() {
                    this.allowVerticalMovement = true;
                    this._focusedItem = null;
                    this._progressAnimation = null;
                    this._scrollTransitionSettings = this.stage.transitions.createSettings({});
                },
                _init() {
                    this._wrapper = this.tag('Wrapper');
                    this._wrapper.onUpdate = (() => this.reposition());

                    this.itemList = new ListItems$1(this);
                    const or = this.orientation === 'horizontal' ? 'x' : 'y';

                    this._wrapper.transition(or, this._scrollTransitionSettings);
                    this._scrollTransition = this._wrapper.transition(or);
                },
                _focus() {
                    if(this.state === 'Empty'){
                        this.signal('isEmpty');
                    }
                    else{
                        this.signal('isFilled');
                    }
                },
                _enter() {
                    // this.setIndex(0)
                },
                _handleLeft() {
                    // this.navigate('left')
                    this.setPrevious();
                },
                _handleRight() {
                    // this.navigate('right')
                    this.setNext();
                },
                _handleUp() {
                    return false
                },
                _handleDown() {
                    return false
                }
            }
        }
    }

    class ListItems$1 extends lng.tools.ObjectListWrapper {
        constructor(list) {
            let wrap = (item => {
                let parent = item.stage.createView();
                parent.add(item);


                // if(item._transitions){
                //     parent.transitions = item._transitions
                // }
                return parent
            });

            super(list._wrapper._children, wrap);
            this.list = list;
        }

        onAdd(item, index) {
            super.onAdd(item, index);

            this.list.fire('filled');

            const currentIndex = this.getIndex(this.list._focusedItem);
            if (index === 0 && currentIndex === 1) {
                // Keep selection on first item.
                this.list.setIndex(0);
            }
        }

        onRemove(item, index) {
            super.onRemove(item, index);
            if (this.list._focusedItem && this.list.index === -1) {
                // Item was removed.
                this.list.setIndex(Math.max(this.list.length - 1, index));
            }

            if (!this.list.length) {
                this.list.fire('empty');
            }
        }

        onSet(item, index) {
            super.onSet(item, index);
        }

        onSync(removed, added, order) {
            super.onSync(removed, added, order);
            if (order.length) {
                this.list.fire('filled');
                if (this.getIndex(this.list._focusedItem) === -1) {
                    this.list.setIndex(0);
                }
            } else {
                this.list.fire('empty');
            }
        }

    }

    class StageCell extends lng.Component {
        static _template() {
            return {
                w: 1690, h: 774, zIndex: 0, pivotY: 0,
                BackgroundShadow: {alpha: 0, mountX: 0.5, x: 845, y: 0, texture: lng.Tools.getShadowRect(1710, 734, 0, 30, 50)},
                Wrapper: {w: 1690, h: 774, clipping: true,
                    Image: {transitions: {scale: {duration: 0.7}}},
                    OverlayShadow: {alpha: 1, w: 1690, h: 300, y: 474, rect: true},
                    Headline: {y: 775 - 53 - 35, mountX: 0.5, x: 845, mountY: 1, w: 882, text: {text: 'This is the headline text', fontSize: 50, fontFace: 'TheSansB6', textAlign: 'center'}},
                    Subline: {y: 775 - 53, mountX: 0.5, mountY: 1, x: 845, text: {text: 'This is the subline text', fontSize: 30, fontFace: 'TheSansB4', textAlign: 'center'}}
                }
            }
        }

        static _states() {
            return {
                _init() {
                    const sublineLabel = this.tag('Subline');
                    const headlineLabel = this.tag('Headline');

                    sublineLabel.on('txLoaded', () => {
                        const sublineHeight = sublineLabel.renderHeight;
                        headlineLabel.y = sublineLabel.y;
                        if(sublineHeight > 0) {
                            headlineLabel.y -= (sublineHeight - 10);
                        }
                    });

                    const {images: {aspect16x9:image}, shortTitle, publicationService, show, duration} = this.item;

                    let subline = [];
                    const d = Math.ceil(duration/60);
                    if(d > 0) {
                        subline.push(`${d} Min.`);
                    }

                    if(publicationService && show) {
                        subline.push(show.title);
                        if(this.channel === 'ard') {
                            subline.push(publicationService.name);
                        }
                    }

                    const {globalShadow, stage: {headline: hColor, subline: sColor, shadow}} = this.theme;

                    this.patch({
                        BackgroundShadow: {color: globalShadow},
                        Wrapper: {
                            Image: {src: ux.Ui.getImageUrl(image.src.replace('{width}', 1690), {width: 1690, height: 774, type: 'crop'})},
                            OverlayShadow: {colorBottom: shadow, colorTop: 0x00ffffff},
                            Headline: {color: hColor, text: {text: shortTitle}},
                            Subline: {alpha: !!subline.length, color: sColor, text: {text: subline.length && subline.join(' \u2022 ') || ''}}
                        }
                    });
                },
                _focus(e) {
                    let delay = 0.5;
                    this.patch({
                        transitions: {scale: {delay}}, smooth: {zIndex: 1, scale: 1.05},
                        BackgroundShadow: {transitions: {alpha: {delay}}, smooth: {alpha: 1}}
                    });
                },
                _unfocus() {
                    this.patch({
                        transitions: {scale: {delay: 0}}, smooth: {zIndex: 0, scale: 1},
                        BackgroundShadow: {transitions: {alpha: {delay: 0}}, smooth: {alpha: 0}}
                    });
                }
            }
        }
    }

    class ArdStageIndicatorBullet extends lng.Component {
        static _template() {
            return {w: 24, h: 24, renderToTexture: true, colorizeResultTexture: true,
                Shader: {shader: {type: lng.shaders.RadialFilter, radius: 12, cutoff: 1},
                    Background: {w: 24, h: 24, rect: true},
                }
            }
        }

        static _states() {
            return {
                _init() {
                    this.scale = 0.5;
                    this.patch({
                        color: this.colors.bullet
                    });
                },
                _focus() {
                    this.patch({
                        smooth: {scale: 1, color: this.colors.activeBullet}
                    });
                },
                _unfocus() {
                    this.patch({
                        smooth: {scale: 0.55, color: this.colors.bullet}
                    });
                }
            }
        }
    }

    class StageIndicator extends lng.Component {
        static _template() {
            return {
                w: 1920,
                Wrapper: {

                }
            }
        }

        set items(int) {
            this.patch({
                Wrapper: {
                    children: this.generateBullets(int)
                }
            });
            this.index = 0;
        }

        generateBullets(amount) {
            const bullets = [];
            for(let i = 0; i < amount; i++) {
                bullets.push({ref: `Bullet${i}`, x: i * 28, type: ArdStageIndicatorBullet, colors: this.cparent.theme.stage});
            }
            return bullets
        }

        get currentBullet() {
            return this.tag('Wrapper').children[this.index]
        }

        set index(int) {
            if(int !== this.index) {
                if(this.currentBullet) {
                    this.currentBullet.fire('_unfocus');
                }
                this._i = int;
                this.currentBullet.fire('_focus');
            }
        }

        get index() {
            return this._i
        }

        static _states() {
            return {
                _init() {
                    const wrapper = this.tag('Wrapper');
                    wrapper.onUpdate = (() => {
                        const children = wrapper.children;
                        const lastChild = children[children.length-1];
                        if(lastChild) {
                            const wrapperW = lastChild.x + lastChild.w;
                            wrapper.x = (1920 - wrapperW) / 2;
                        }
                    });
                }
            }
        }
    }

    class StageList extends lng.Component {
        static _template() {
            return {
                h: 845, w: 1920, clipbox: true,
                Slider: {carousel: true, w: 1920, type: StageSlider, itemSpacing: 0, marginLeft: 115, marginRight: 115, signals: {indexChanged: 'sliderIndexChanged', setNext: true, setPrevious: true}},
                Indicators: {zIndex: 4, y: 775 + 55, h: 50, type: StageIndicator}
            }
        }

        get item() {
            return this.tag('Slider').focusedItem.item
        }

        _getFocused() {
            return this.tag('Slider')
        }

        setNextTimeout() {
            this.clearNextTimeout();
            this._timeout = setTimeout(() => {
                this.tag('Slider').fire('_handleRight');
                this.setNextTimeout();
            }, 5000);
        }

        clearNextTimeout() {
            if(this._timeout) {
                clearTimeout(this._timeout);
            }
        }

        static _states() {
            return {
                _init() {
                    const {size, teasers} = this.widget;
                    this.patch({
                        Slider: {
                            items: teasers.map((teaser) => {
                                return {ref: `T${teaser.id}`, parentId: this.widget.id, item: teaser, size, type: StageCell, channel: this.channel, theme: this.theme}
                            })
                        },
                        Indicators: {items: teasers.length}
                    });
                    this.setNextTimeout();
                },
                _unfocus() {
                    this.clearNextTimeout();
                },
                setNext() {
                    this.clearNextTimeout();
                },
                setPrevious() {
                    this.clearNextTimeout();
                },
                sliderIndexChanged(e) {
                    this.tag('Indicators').index = e.index || 0;
                }
            }
        }
    }

    class MainPage extends lng.Component {
        static _template() {
            return { alpha: 0, boundsMargin: [150, 200, 150, 200], w: 1920, h: 1080,
                VerticalSlider: {w: 1920, h: 1080, type: Slider, orientation: 'vertical', marginBottom: 80, marginTop: 0, itemSpacing: 45, signals: {indexChanged: true, outOfBounds: true}}
            }
        }

        set theme(theme) {
            this._theme = theme;
        }

        get theme() {
            return this._theme
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        update(data) {
            const theme = this.theme;
            this.tag('VerticalSlider').items = data.widgets.map((widget) => {
                return {ref: `W${widget.id}`,
                    theme: theme,
                    widget: widget,
                    type: widget.type === 'gridlist' ? GridList : StageList,
                    channel: this.api.currentChannel
                }
            });
            this.fire('finishedLoading');
        }

        _getFocused() {
            if(this.state === 'Active') {
                return this.tag('VerticalSlider')
            }
            return this
        }

        static _states() {
            return {
                _init() {
                    this.index = 0;
                    this.currentContent = null;

                    return 'Active'
                },
                loadView({isPreviousView, toLoad: {persist: {type = null, data = null}}}) {
                    this.isPreviousView = isPreviousView;
                    if(!isPreviousView && !data) {
                        this.fire('loading');
                        if(type === 'alle') {
                            type = 'ard';
                        }
                        this.api.getMainPageData(type)
                            .then((response) => {
                                this.update(response);
                            });
                    }
                    else if(!isPreviousView) {
                        this.fire('loading');
                        this.update(data);
                    }
                    else {
                        return 'Show'
                    }
                },
                loading: 'Loading',
                finishedLoading: 'Show',
                Loading: {
                    finished: 'Show'
                },
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return 'Active'
                    }
                },
                Idle: {
                },
                Active: {
                    _enter() {
                        if(!this.isPreviousView) {
                            this.tag('VerticalSlider').setIndex(0);
                        }
                    },
                    hideView: 'Hide',
                    indexChanged(e) {
                        if(e.index === 0) {
                            this.hasToolbarHidden = false;
                            this.signal('showToolbar');
                        }
                        else {
                            this.hasToolbarHidden = true;
                            this.signal('hideToolbar');
                        }
                    },
                    _handleEnter() {
                        const item = this.tag('VerticalSlider').focusedItem.item;
                        switch(item.type) {
                            case 'live':
                                this.signal('switchView', {view: 'ComingSoon', persist: {type: 'live'}, ignore:true});
                                break
                            case 'show':
                                this.signal('switchView', {view: 'ShowPage', persist: {targetId: item.links.target.id}});
                                break
                            default:
                                this.signal('switchView', {view: 'Player', persist: {targetId: item.links.target.id}, ignore: true});
                                break
                        }
                    }
                }
            }
        }
    }

    class PlayerShader extends lng.shaders.WebGLDefaultShader {

        constructor(context) {
            super(context);

            this._x = 0;
            this._y = 0;
            this._mountX = 0;

            this._radius = 100;

            this._colors = [0x33000000, 0xFF000000];
            this._updateColors();
        }

        get x() {
            return this._x
        }

        set x(v) {
            this._x = v;
            this.redraw();
        }

        get mountX() {
            return this._mountX
        }

        set mountX(v) {
            this._mountX = v;
            this.redraw();
        }

        get y() {
            return this._y
        }

        set y(v) {
            this._y = v;
            this.redraw();
        }

        get radius() {
            return this._radius
        }

        set radius(v) {
            this._radius = v;
            this.redraw();
        }

        set color1(v) {
            this._colors[0] = v;
            this._updateColors();
        }

        set color2(v) {
            this._colors[1] = v;
            this._updateColors();
        }

        _updateColors() {
            let arr = [];
            this._colors.forEach(color => {
                const col = lng.StageUtils.getRgbaComponentsNormalized(color);
                col[0] *= col[3];
                col[1] *= col[3];
                col[2] *= col[3];
                arr = arr.concat(col);
            });
            this._rawColors = new Float32Array(arr);
            this.redraw();
        }

        setupUniforms(operation) {
            super.setupUniforms(operation);

            const x = this._x * this.ctx.stage.getRenderPrecision();
            const y = this._y * this.ctx.stage.getRenderPrecision();
            const radius = this._radius * this.ctx.stage.getRenderPrecision();

            const rtc = operation.getNormalRenderTextureCoords(x,y);
            this._setUniform("center", rtc, this.gl.uniform2fv);
            this._setUniform("colors", this._rawColors, this.gl.uniform4fv);

            this._setUniform("radius", 2 * radius / operation.getRenderWidth(), this.gl.uniform1f);
        }
    }

    PlayerShader.vertexShaderSource = `
    #ifdef GL_ES
    precision lowp float;
    #endif
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aColor;
    uniform vec2 projection;
    uniform vec2 center;
    varying vec2 vTextureCoord;
    varying vec4 vColor;
    varying vec2 delta;
    void main(void){
        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);
        
        delta = gl_Position.xy - center;
        
        vTextureCoord = aTextureCoord;
        vColor = aColor;
        gl_Position.y = -sign(projection.y) * gl_Position.y;
    }
`;

    PlayerShader.fragmentShaderSource = `
    #ifdef GL_ES
    precision lowp float;
    #endif
    varying vec2 vTextureCoord;
    varying vec4 vColor;
    varying vec2 delta;
    uniform float radius;
    uniform sampler2D uSampler;
    uniform vec2 projection;
    uniform vec4 colors[2];
    void main(void){
        float dist = length(delta);
        vec4 color = vec4(colors[0][0], colors[0][1], colors[0][2], colors[0][3]);
        vec4 shadowColor = vec4(colors[1][0], colors[1][1], colors[1][2], colors[1][3]);
        gl_FragColor = mix(color, shadowColor, sin(dist-radius));   
    }
`;

    class ProgressBar extends lng.Component {
        static _template() {
            return {
                CurrentTime: {x: 115, text: {text: '00:00', fontFace: 'TheSansB4', fontSize: 30}},
                Progress: { x: 215, y: 17,
                    Bar: {w: 1490, h: 8, color: 0x99ffffff, rect: true, clipping: true,
                        Troth: {w: 1, h: 8, color: 0xff00ff00, rect: true}
                    },
                    BulletShadow: {y: 4, mount: 0.5, texture: lng.Tools.getShadowRect(45, 45, 25, 10, 10)},
                    Bullet: {y: 4, mount: 0.5, texture: lng.Tools.getRoundRect(40, 40, 20, 0, 0xffffffff, true, 0xffffffff)}
                },
                EndTime: {mountX: 1, x: 1805, text: {text: '99:99', fontFace: 'TheSansB4', fontSize: 30}}
            }
        }

        set theme(theme) {
            this.patch({
                CurrentTime: {color: theme.toolbar.text},
                Progress: {
                    Bar: {color: theme.live.background,
                        Troth: {color: theme.focus}
                    },
                    BulletShadow: {color: theme.globalShadow},
                    Bullet: {color: theme.toolbar.text}
                },
                EndTime: {color: theme.toolbar.text}
            });
        }

        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            seconds = Math.floor(seconds);
            const parts = [];
            parts.push(minutes);
            parts.push(seconds);
            return parts.map(number => (number < 10 ? "0" + number : "" + number)).join(":")
        }

        calcThroth({currentTime, duration}) {
            const now = Date.now();
            const v = currentTime / Math.max(duration, 1);
            let estimation = 0;
            if (!this._last || (this._last < now - 1000)) {
                estimation = 500;
            } else {
                estimation = now - this._last;
            }
            this._last = now;
            const offset = v * 1490;

            estimation *= 0.001;

            return {offset, estimation}
        }

        set seeking(obj) {
            const calc = this.calcThroth(obj);
            this.patch({
                Progress: {
                    BulletShadow: {transitions: {x: {timingFunction: 'linear', duration: calc.estimation}}, smooth: {x: calc.offset}},
                    Bullet: {transitions: {x: {timingFunction: 'linear', duration: calc.estimation}}, smooth: {x: calc.offset}}
                },
                EndTime: {text: {text: this.formatTime(obj.duration - obj.currentTime)}}
            });
        }

        set progress(obj) {
            const calc = this.calcThroth(obj);
            this.patch({
                CurrentTime: {text: {text: this.formatTime(obj.currentTime)}},
                Progress: {
                    Bar: {
                        Troth: {transitions: {w: {timingFunction: 'linear', duration: calc.estimation}}, smooth: {w: calc.offset}}
                    },
                    BulletShadow: {transitions: {x: {timingFunction: 'linear', duration: calc.estimation}}, smooth: {x: calc.offset}},
                    Bullet: {transitions: {x: {timingFunction: 'linear', duration: calc.estimation}}, smooth: {x: calc.offset}}
                },
                EndTime: {text: {text: this.formatTime(obj.duration - obj.currentTime)}}
            });
        }
    }

    class PlayerButton extends lng.Component {
        static _template() {
            return {
                Background: { alpha: 0,
                    Shadow: {
                        mount: 0.5
                    },
                    Fill: {
                        mount: 0.5
                    }
                },
                Icon: {
                    mount: 0.5, type: IconItem
                },
                ToggleIcon: {
                    mount: 0.5, type: IconItem
                }
            }
        }

        set theme(theme) {
            this.patch({
                Background: {
                    Shadow: {color: theme.globalShadow},
                    Fill: {color: theme.focus}
                },
                Icon: {
                    color: theme.toolbar.text
                }
            });
        }

        toggle(active = !this.toggleActive) {
            if(this.canToggle) {
                this.patch({
                    Icon: {alpha: !!!active},
                    ToggleIcon: {alpha: !!active}
                });
                this.toggleActive = active;
            }
        }

        set disabled(v) {
            this.setSmooth('alpha', v ? 0.5 : 1);
            this._disabled = v;
        }

        get disabled() {
            return this._disabled
        }

        static _states() {
            return {
                _init() {
                    const {w = 218, h = 218} = this.size;
                    const {icon, toggleIcon = false, size} = this.icon;
                    this.disabled = false;
                    this.canToggle = !!toggleIcon;
                    this.toggleActive = false;

                    this.patch({
                        Background: {
                            Shadow: {texture: lng.Tools.getShadowRect(w + 10, h + 10, (w + 10) / 2, 10, 10)},
                            Fill: {texture: lng.Tools.getRoundRect(w, h, w / 2, 0, 0xffffffff, true, 0xffffffff)}
                        },
                        Icon: {
                            icon: {src: `icons/player/${icon}.svg`, w: size, h: size}
                        },
                        ToggleIcon: {
                            alpha: 0, icon: this.canToggle ? {src: `icons/player/${toggleIcon}.svg`, w: size, h: size} : {src: null}
                        }
                    });
                },
                _focus() {
                    this.patch({
                        Background: {smooth: {alpha: 1, scale: 1}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Background: {smooth: {alpha: 0, scale: 0}}
                    });
                }
            }
        }

    }

    class PlayerButtonList extends ItemList {
        targetHasData(dir) {
            let i = this._index + dir;
            let l = this.length;
            for(i; (dir < 0 && i > -1) || (dir > 0 && i < l); i+=dir) {
                if(!this.items[i].disabled) {
                    return i
                }
            }
            return -1
        }

        set theme(theme) {
            this._theme = theme;
        }

        set playerButtons(list) {
            this.items  = list.map((item) => {
                return {ref: item.action.toUpperCase(), type: PlayerButton, action: item.action, theme: this._theme, icon: item.icon, x: item.x, size: item.size}
            });
            this.focusPlayButton();
        }

        focusPlayButton() {
            this.index = this.items.indexOf(this.tag('PLAY'));
        }

        focusRewindButton() {
            this.index = this.items.indexOf(this.tag('REWIND'));
        }

        focusForwardButton() {
            this.index = this.items.indexOf(this.tag('FORWARD'));
        }

        get orientation() {
            return 'horizontal'
        }

        static _states() {
            return lng.tools.ObjMerger.merge(super._states(), {
                _handleRight() {
                    return this.navigate(this.targetHasData(1), this.orientation, true)
                },
                _handleLeft() {
                    return this.navigate(this.targetHasData(-1), this.orientation, true)
                }
            })
        }
    }

    class SubtitlesGenerator extends lng.Component {
        static _template() {
            return { alpha: 1,
                Wrapper: { alpha: 0, y: 1010}
            }
        }

        set current(v) {
            if(v) {
                const filter = v.tt.filter((sub) => {
                    if(sub) {
                        return sub
                    }
                }).reverse();

                this._wrapper.children = filter.map((sub, index) => {
                    return {x: 960, mountX: 0.5, mountY: 1, y: index * -56, subtitle: {sub: sub.text, styles: this._styles[sub.style]}, type: SubtitleComponent}
                });
            }
            else {
                if(this._wrapper) {
                    this._wrapper.children = [];
                    this._wrapper.alpha = 0;
                }
            }
            this._current = v;
        }

        get current() {
            return this._current
        }

        seeked({currentTime}) {
            if(!this.empty) {
                const dir = Math.round(this.current.end/1000) < currentTime;
                let newIndex = 0;
                currentTime = Math.round(currentTime);
                for(let i = this.subIndex; (dir ? i < this.subtitles.length : i > 0); (dir ? i++ : i--)) {
                    const sub = this.subtitles[i];
                    const prevSub = this.subtitles[i - 1];
                    if((Math.round(sub.begin / 1000) <= currentTime && currentTime <= Math.round(sub.end/1000))
                        || (prevSub && (Math.round(sub.begin/1000) >= currentTime && currentTime > Math.round(prevSub.end/1000)))) {
                        newIndex = i;
                        break
                    }
                }
                this.next(currentTime, newIndex);
            }
        }

        next(currentTime, index = this.subIndex + 1) {
            if(index < this._data.subtitles.length) {
                const next = this._data.subtitles[index];
                if(Math.round(next.begin/1000) > currentTime) {
                    this._wrapper.alpha = 0;
                }
                else{
                    this._wrapper.alpha = 1;
                }
                this.subIndex = index;
                this.current = next;
            }
            else {
                this.current = null;
            }
        }

        hexToArray(hex) {
            hex = hex.replace('#', '');
            const result = [];
            for(let i = 0; i < hex.length; i+=2) {
                result.push(parseInt(hex.substr(i, 2), 16));
            }
            if(result.length === 3) {
                result.push(255);
            }
            return result
        }

        set styles(styles) {
            Object.keys(styles).forEach((style) => {
                styles[style].fgcol = lng.StageUtils.getArgbNumber(this.hexToArray(styles[style].fgcol));
                styles[style].bgcol = lng.StageUtils.getArgbNumber(this.hexToArray(styles[style].bgcol));
            });
            this._styles = styles;
        }

        setSubtitleLink(link) {
            fetch(link)
                .then((response) => {
                    return response.json()
                })
                .then(subtitles => {
                    this.subtitles = subtitles;
                    this.empty = false;
                });
        }

        set empty(v) {
            if(v) {
                this.data = null;
                this.current = null;
            }
            this._empty = v;
        }

        get empty() {
            return this._empty
        }

        set subtitles(data) {
            if(data) {
                this.styles = data.styles;
                this._data = data;
                this.subIndex = 0;
                this.current = data.subtitles[this.subIndex];
            }
            else {
                this.empty = true;
            }
        }

        get subtitles() {
            return this._data.subtitles
        }

        set progress({currentTime}) {
            if(!this.empty && this.current) {
                const cBegin = Math.round(this.current.begin/1000);
                const cEnd = Math.round(this.current.end/1000);
                if(cBegin < currentTime && currentTime < cEnd) {
                    this._wrapper.alpha = 1;
                }
                else if(currentTime < cBegin) {
                    this._wrapper.alpha = 0;
                }

                if(currentTime  >= cEnd) {
                    this.next(currentTime);
                }
            }
        }

        static _states() {
            return {
                _init() {
                    this.empty = true;
                    this._wrapper = this.tag('Wrapper');
                }
            }
        }
    }

    class SubtitleComponent extends lng.Component {
        static _template() {
            return {rect: true, h: 56, w: 0,
                Sub: {x: 5, text: {text: 'sub', fontSize: 42, fontFace: 'TheSansB4', textAlign: 'center'}}
            }
        }

        set subtitle({sub, styles}) {
            const text = new DOMParser().parseFromString(sub, "text/html").body.textContent;
            const {bgcol, fgcol} = styles;
            this.patch({
                color: bgcol, rect: true, h: 56, w: 1,
                Sub: {
                    color: fgcol, text: {text, fontSize: 42, fontFace: 'TheSansB4', textAlign: 'center'}
                }
            });
        }

        static _states() {
            return {
                _init() {
                    const sub = this.tag('Sub');
                    sub.on('txLoaded', () => {
                        this.patch({w: sub.renderWidth + 10});
                    });
                }
            }
        }
    }

    class PlayerOverlay extends lng.Component{
        static _template() {
            return { zIndex: 1,
                Subtitles: {type: SubtitlesGenerator},
                Wrapper: { zIndex: 2, alpha: 0,
                    BackButton: {zIndex: 2, type: ArdNavigationOptionItem, y: 42, x: 115, icon: {src: 'icons/ui/arrowLeft.svg'}},
                    Headline: {y: 702, mountX: 0.5, x: 960, text: {text: 'This is the headline text', shadow: true, fontSize: 50, fontFace: 'TheSansB6', textAlign: 'center'}},
                    Subline: {y: 767, mountX: 0.5, x: 960, text: {text: 'This is the subline text', shadow: true, fontSize: 30, fontFace: 'TheSansB4', textAlign: 'center'}},
                    ProgressBar: {y: 975, type: ProgressBar},
                    PlayerControls: {type: PlayerButtonList, y: 533},
                }
            }
        }

        get api() {
            return this.cparent.api
        }

        set theme(theme) {
            const {text} = theme.toolbar;
            this.tag('Wrapper').patch({
                BackButton: {theme},
                Headline: {color: text},
                Subline: {color: text},
                ProgressBar: {theme},
                PlayerControls: {theme}
            });
            this._theme = theme;
        }

        set progress(v) {
            this.tag('ProgressBar').progress = v;
            this.tag('Subtitles').progress = v;
        }

        set seeking(v) {
            this._isSeeking = true;
            //this.tag('PlayerControls').tag('INFO').disabled = true
            this.tag('ProgressBar').seeking = v;
        }

        seeked(e) {
            this._isSeeking = false;
            //§this.tag('PlayerControls').tag('INFO').disabled = false
            this.tag('Subtitles').seeked(e);
        }

        update({title, subline,  subtitles = false}) {
            const subtitlesOn = this.api.getSubtitlesOn();

            const pc = this.tag('PlayerControls');

            const filter = [
                {control: 'info', use: true},
                {control: 'subtitles', use: subtitles && true},
                {control: 'previous', use: false},
                {control: 'rewind', use: true},
                {control: 'play', use: true},
                {control: 'forward', use: true},
                {control: 'next', use: false}
            ];

            pc.playerButtons = this.availableControls.filter((item, index) => {
                if(filter[index].use) {
                    return item
                }
            });

            // pc.index = pc.items.indexOf(pc.tag('PLAY'))
            //this.playButtonIndex = pc.index

            this.patch({
                Subtitles: {alpha: !!subtitlesOn},
                Wrapper: {
                    Headline: {text: {text: title}},
                    Subline: {text: {text: subline.join(' \u2022 ')}}
                }
            });

            if(subtitles) {
                this.tag('Subtitles').setSubtitleLink(subtitles);
                this.tag('PlayerControls').tag('SUBTITLES').toggle(subtitlesOn);
            }
            else {
                this.tag('Subtitles').empty = true;
            }
        }

        get availableControls() {
            return [
                {action: 'info', icon: {icon: 'info', size: 142, y: 18}, size: {w: 142, h: 142}, x: 153},
                {action: 'subtitles', icon: {icon: 'ut_active', toggleIcon: 'ut', size: 142, y: 22,}, size: {w: 142, h: 142}, x: 293},
                {action: 'previous', icon: {icon: 'skip_previous', size: 192}, size: {w: 142, h: 142}, x: 607},
                {action: 'rewind', icon: {icon: 'fast_rewind', size: 192}, size: {w: 142, h: 142}, x: 760},
                {action: 'play', icon: {icon: 'play', toggleIcon: 'pause', y: 45, size: 238}, size: {w: 218, h: 218}, x: 960},
                {action: 'forward', icon: {icon: 'fast_forward', size: 192}, size: {w: 142, h: 142}, x: 1160},
                {action: 'next', icon: {icon: 'skip_next', size: 192}, size: {w: 142, h: 142}, x: 1313}
            ]
        }

        set playerState(state) {
            switch(state) {
                case 'PLAY':
                    this.tag('PlayerControls').tag('PLAY').toggle(true);
                    break
                case 'PAUSE':
                    this.tag('PlayerControls').tag('PLAY').toggle(false);
                    break
                case 'START':
                    this.tag('PlayerControls').tag('PLAY').toggle(true);
                    break
                case 'END':
                case 'STOP':
                    this.tag('PlayerControls').tag('PLAY').toggle(false);
                    break
            }
        }

        set overlayVisible(v) {
            this._ov = v;
        }

        get overlayVisible() {
            return this._ov
        }

        set overlayAnimation(ani) {
            this._oa = ani;
        }

        get overlayAnimation() {
            return this._oa
        }

        _getFocused() {
            if(this.tag(this.state)) {
                return this.tag(this.state)
            }
            return this
        }

        static _states() {
            return {
                _init() {
                    this._ov = false;
                    this._oa = this.animation({duration: 0.5, stopMethod: 'reverse', actions: [
                            {t: 'Subtitles.Wrapper', p: 'y', v: {0: 1030, 1: 970}},
                            {t: 'Wrapper', p: 'alpha', v: {0: 0, 0.75: 1}},
                            {t: 'Wrapper.Logo', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Wrapper.Logo', p: 'y', rv: -37, v: {0.25: -37, 1: 43}},
                            {t: 'Wrapper.Headline', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Wrapper.Headline', p: 'y', rv: 747, v: {0.25: 747, 1: 702}},
                            {t: 'Wrapper.Subline', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Wrapper.Subline', p: 'y', rv: 797, v: {0.25: 837, 1: 767}},
                            {t: 'Wrapper.PlayerControls', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Wrapper.ProgressBar', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Wrapper.ProgressBar', p: 'y', rv: 1055, v: {0.25: 1055, 1: 975}}
                        ]});

                    this._oa.on('finish', () => {
                        this._ov = true;
                    });

                    this._oa.on('stopFinish', () => {
                        this._ov = false;
                        this.tag('PlayerControls').focusPlayButton();
                        this.fire('stateChange', {state: 'PlayerControls'});
                    });

                    return 'PlayerControls'
                },
                stateChange(e) {
                    return e.state
                },
                PlayerControls: {
                    _handleForward() {
                        this.tag('PlayerControls').focusForwardButton();
                        this.signal('invokePlayerState', {action: 'forward'});
                    },
                    _handleRewind() {
                        this.tag('PlayerControls').focusRewindButton();
                        this.signal('invokePlayerState', {action: 'rewind'});
                    },
                    _handlePlayPause() {
                        this.tag('PlayerControls').focusPlayButton();
                        this.signal('invokePlayerState', {action: 'playPause'});
                    },
                    _handleUp() {
                        if(this.overlayVisible) {
                            return 'BackButton'
                        }
                    },
                    _handleEnter() {
                        const control = this.tag('PlayerControls').item;
                        switch(control.action) {
                            case 'play':
                                this.signal('invokePlayerState', {action: 'playPause'});
                                break
                            case 'forward':
                                this.signal('invokePlayerState', {action: 'forward'});
                                break
                            case 'rewind':
                                this.signal('invokePlayerState', {action: 'rewind'});
                                break
                            case 'info':
                                this.signal('showDetails');
                                break
                            case 'subtitles':
                                control.toggle();
                                this.api.setSubtitlesOn(control.toggleActive);
                                this.tag('Subtitles').alpha = !this.tag('Subtitles').alpha;
                                break
                            default:
                                console.log('do nothing');
                                break
                        }
                    }
                },
                BackButton: {
                    _handleDown: 'PlayerControls',
                    _handleEnter() {
                        this.signal('previousView');
                    }
                }
            }
        }
    }

    class SynopsisItem extends lng.Component {
        static _template() {
            return {
                Wrapper: {w: 1306, h: 180, clipping: true,
                    Background: {alpha: 0, w: 1306, h: 180, rect: true},
                    Text: {x: 25, y: 15, w: 1256, text: {text: 'Synopsis', fontSize: 36, maxLines: 3, lineHeight: 50, fontFace: 'TheSansB4', textAlign: 'left'}}
                },
                SlideBar: {x: 1320, y: 0, alpha: 0, type: SlideBar, frame: 510, signals: {scroll: true}}
            }
        }

        set theme(theme) {
            this.patch({
                Wrapper: {
                    Background: {color: theme.focus},
                    Text: {color: theme.toolbar.text}
                },
                SlideBar: {theme}
            });
        }

        expand(toggle = !this.toggle) {
            this.patch({
                Wrapper: {smooth: {h: toggle ? 510 : 180},
                    Text: {text: {maxLines: toggle ? 0 : 3}}
                },
                SlideBar: {smooth: {alpha: toggle ? 1 : 0}}
            });

            this.toggle = toggle;
        }

        get renderInfo() {
            return this.tag('Text').texture.source.renderInfo
        }

        get moreTextLines() {
            if(this.tag('Text').text.text !== '') {
                return this.renderInfo.moreTextLines
            }
            return false;
        }

        get length() {
            return this._synopsis.length
        }

        set synopsis(v) {
            this.expand(false);
            this.patch({
                Wrapper: {
                    Text: {text: {text: !v ? '' : v}}
                }
            });
            this._synopsis = !v ? '' : v;
        }

        _getFocused() {
            if(this.state === 'Expanded') {
                return this.tag('SlideBar')
            }
            return this
        }

        static _states() {
            return {
                _init() {
                    const text = this.tag('Text');
                    const slideBar = this.tag('SlideBar');
                    text.on('txLoaded', () => {
                        if(this.state === 'Expanded') {
                            const rh = text.renderHeight;
                            slideBar.contentSize = text.renderHeight;
                            if(rh < 510 - 30) {
                                slideBar.alpha = 0;
                            }
                        }
                    });
                    this.toggle = false;
                    return 'Collapsed'
                },
                _focus() {
                    this.patch({
                        Wrapper: {
                            Background: {smooth: {alpha: 1}}
                        }
                    });
                },
                _unfocus() {
                    this.patch({
                        Wrapper: {
                            Background: {smooth: {alpha: 0}}
                        }
                    });
                },
                collapse: 'Collapsed',
                Collapsed: {
                    _exit() {
                        this.fire('_unfocus');
                    },
                    _enter(e) {
                        if(e.event === '_handleUp' || e.event === '_handleDown'){
                            this.fire(e.event);
                        }
                        if(this.hasFocus()) {
                            this.fire('_focus');
                        }
                    },
                    _handleEnter() {
                        if(this.moreTextLines) {
                            return 'Expanded'
                        }
                    }
                },
                Expanded: {
                    scroll(e) {
                        const text = this.tag('Text');
                        text.setSmooth('y', 15 - (e.step * 200));
                    },
                    _enter() {
                        this.signal('showSynopsisAnimation');
                        this.expand(true);
                    },
                    _exit() {
                        this.signal('hideSynopsisAnimation');
                        this.expand(false);
                    },
                    _handleUp: 'Collapsed',
                    _handleDown: 'Collapsed',
                    _handleEnter: 'Collapsed'
                }
            }
        }
    }

    class DetailOverlay extends lng.Component {
        static _template() {
            return {
                BackgroundImage: {zIndex: 0, alpha: 0, w: 1920, h: 1080},
                BackButton: {zIndex: 2, type: ArdNavigationOptionItem, y: 42, x: 115, icon: {src: 'icons/ui/arrowLeft.svg'}},
                GeoBlocked: {zIndex: 2, alpha: 0, w: 300, h: 110, y: 42, x: 1805, mountX: 1, rect: true, color: 0xffffffff,
                    Label: {mount: 0.5, x: 150, y: 60, color: 0xff000000, text: {text: 'GEOBLOCKED', fontSize: 40, fontFace: 'TheSansB6', textAlign: 'center'}}
                },
                Thumbnail: {zIndex: 2, x: 115, y: 254, w: 192, h: 110},
                ShowInfo: {zIndex: 2, x: 340, y: 254,
                    Title: {text: {text: 'Item Title', fontSize: 50, fontFace: 'TheSansB6', textAlign: 'center'}},
                    Show: {y: 70, text: {text: 'Show & Partner', fontSize: 30, fontFace: 'TheSansB4', textAlign: 'center'}}
                },
                Synopsis: {zIndex: 2, x: 90, y: 405, type: SynopsisItem, signals: {showSynopsisAnimation: true, hideSynopsisAnimation: true}},
                // Synopsis: {zIndex: 2, x: 115, y: 405, w: 1300, text: {text: 'Synopsis', fontSize: 30, lineHeight: 40, maxLines: 3, fontFace: 'TheSansB4', textAlign: 'left'}},
                ExpireInfo: {zIndex: 2, alpha: 0, x: 1805, y: 405,
                    ExpiresLabel: {zIndex: 2, mountX: 1, text: {text: 'Video verfügbar bis', fontSize: 36, fontFace: 'TheSansB6', textAlign: 'center'}},
                    ExpiresDate: {zIndex: 2, mountX: 1, y: 50, text: {text: 'dd.mm.yyyy', fontSize: 36, fontFace: 'TheSansB4', textAlign: 'center'}},
                },
                PartnerLogo: {zIndex: 2, mountX: 1, y: 700, x: 1805},
                EpisodeList: {zIndex: 2, y: 667,
                    Title: {x: 115, text: {text: 'Folge', fontSize: 42, maxLines: 1, fontFace: 'TheSansB4'}},
                    Slider: {y: 75, carousel: false, w: 1920, itemSpacing: 16, type: Slider, marginLeft: 115, marginRight: 115}
                }
            }
        }

        // set geoBlocked(v) {
        //     this.tag('GeoBlocked').setSmooth('alpha', v)
        // }
        get api() {
            return this.cparent.api
        }
        set theme(theme) {
            this._t = theme;
            const {text} = theme.toolbar;
            this.patch({
                BackButton: {theme},
                ShowInfo: {
                    Title: {color: text},
                    Show: {color: text}
                },
                Synopsis: {theme},
                // GeoBlocked: {color: text, Label: {color: theme.background}},
                ExpireInfo: {
                    ExpiresLabel: {color: text},
                    ExpiresDate: {color: text}
                },
                PartnerLogo: {color: text}
            });
        }

        update({logo, title, image, show, subline, synopsis, broadcastedOn, availableTo, teasers = []}) {
            subline.unshift(this.api.getDate(broadcastedOn));
            this.patch({
                BackgroundImage: {src: ux.Ui.getImageUrl(image.src.replace('{width}', 1920), {width: 1920, height: 1080, type: 'crop'})},
                Thumbnail: {src: show ? ux.Ui.getImageUrl(show.image.src.replace('{width}', 192), {width: 192, height: 110, type: 'crop'}) :  ux.Ui.getImageUrl(image.src.replace('{width}', 192), {width: 192, height: 110, type: 'crop'})},
                ShowInfo: {
                    Title: {text: {text: title}},
                    Show: {text: {text: subline.join(' \u2022 ')}}
                },
                Synopsis: {synopsis},
                ExpireInfo: { alpha: !!availableTo,
                    ExpiresLabel: {alpha: !!availableTo},
                    ExpiresDate: {alpha: !!availableTo, text: {text: availableTo ? this.api.getDate(availableTo, true): ''}},
                },
                PartnerLogo: {texture: !logo ? null : lng.Tools.getSvgTexture(AppDefinition.getPath(logo.src), logo.width*1.7, 48*1.7)},
                EpisodeList: {
                    Title: {alpha: teasers.length ? 1 : 0},
                    Slider: {alpha: teasers.length ? 1 : 0,
                        items: teasers.map((teaser, index) => {
                            return {ref: `T${teaser.id}`, index, headerOnly: true, parentId: 'episodes', item: teaser, base: 'list', type: GridCell, theme: this._t}
                        })
                    }
                }
            });
        }

        set overlayVisible(v) {
            this._ov = v;
        }

        get overlayVisible() {
            return this._ov
        }

        set overlayAnimation(ani) {
            this._oa = ani;
        }

        get overlayAnimation() {
            return this._oa
        }

        set backgroundImage(src) {
            this.tag('BackgroundImage').src = src;
        }

        showBackgroundImage(bool) {
            this.tag('BackgroundImage').setSmooth('alpha', bool);
        }

        _getFocused() {
            if(this.tag(this.state)) {
                return this.tag(this.state)
            }
        }

        static _states() {
            return {
                _init() {
                    this._oa = this.animation({duration: 0.5, stopMethod: 'reverse', actions: [
                            {p: 'alpha', v: {0: 0, 0.75: 1}},
                            {t: 'BackButton', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'BackButton', p: 'y', rv: 0, v: {0.25: -29, 1: 42}},
                            {t: 'GeoBlocked', p: 'y', rv: 580, v: {0.25: -29, 1: 42}},
                            {t: 'Thumbnail', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Thumbnail', p: 'y', rv: 300, v: {0.25: 300, 1: 254}},
                            {t: 'ShowInfo', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'ShowInfo', p: 'y', rv: 300, v: {0.25: 300, 1: 254}},
                            {t: 'Synopsis', p: 'alpha', rv: 0, v: {0.25: 0, 1: 1}},
                            {t: 'Synopsis', p: 'y', rv: 475, v: {0.25: 475, 1: 405}},
                            {t: 'ExpireInfo', p: 'y', rv: 460, v: {0.25: 460, 1: 420}},
                            {t: 'PartnerLogo', p: 'y', rv: 780, v: {0.25: 570, 1: 530}},
                            {t: 'EpisodeList', p: 'y', rv: 667, v: {0.25: 704, 1: 667}}
                        ]});

                    this.focusSliderAnimation = this.animation({duration: 0.375, stopMethod: 'reverse', actions: [
                            {t: 'Synopsis', p: 'alpha', v: {0: 1, 1: 0}},
                            {t: 'ExpireInfo', p: 'alpha', v: {0: 1, 0.2: 0, 0.8: 0, 1: 1,}},
                            {t: 'ExpireInfo', p: 'x', rv: 1805, v: {0.25: 1805, 0.75: 340}},
                            {t: 'ExpireInfo', p: 'y', v: {0.25: 420, 0.75: 900}},
                            {t: 'ExpireInfo.ExpiresLabel', p: 'mountX', v: {0.25: 1, 0.75: 0}},
                            {t: 'ExpireInfo.ExpiresDate', p: 'mountX', v: {0.25: 1, 0.75: 0}},
                            {t: 'PartnerLogo', p: 'alpha', v: {0: 1, 0.2: 0, 0.8: 0, 1: 1,}},
                            {t: 'PartnerLogo', p: 'x', rv: 1805, v: {0.25: 1805, 0.75: 1306+315}},
                            {t: 'PartnerLogo', p: 'y', v: {0.25: 530, 0.75: 900}},
                            {t: 'EpisodeList', p: 'y', v: {0: 667, 1: 370}}
                        ]});

                    this.showSynopsisAnimation = this.animation({duration: 0.375, stopMethod: 'reverse', actions: [
                            {t: 'Thumbnail', p: 'alpha', v: {0: 1, 1: 0}},
                            {t: 'ShowInfo', p: 'y', v: {0: 254, 1: 135}},
                            {t: 'Synopsis', p: 'x', v: {0: 90, 0.5: 315}},
                            {t: 'Synopsis', p: 'y', v: {0.5: 405, 1: 280}},
                            {t: 'ExpireInfo', p: 'alpha', v: {0: 1, 0.2: 0, 0.8: 0, 1: 1,}},
                            {t: 'ExpireInfo', p: 'x', rv: 1805, v: {0.25: 1805, 0.75: 340}},
                            {t: 'ExpireInfo', p: 'y', v: {0.25: 420, 0.75: 900}},
                            {t: 'ExpireInfo.ExpiresLabel', p: 'mountX', v: {0.25: 1, 0.75: 0}},
                            {t: 'ExpireInfo.ExpiresDate', p: 'mountX', v: {0.25: 1, 0.75: 0}},
                            {t: 'PartnerLogo', p: 'alpha', v: {0: 1, 0.2: 0, 0.8: 0, 1: 1,}},
                            {t: 'PartnerLogo', p: 'x', rv: 1805, v: {0.25: 1805, 0.75: 1306+315}},
                            {t: 'PartnerLogo', p: 'y', v: {0.25: 530, 0.75: 900}},
                            {t: 'EpisodeList', p: 'alpha', v: {0: 1, 1: 0}},
                            {t: 'EpisodeList', p: 'y', v: {0: 667, 0.5: 900}}
                        ]});

                    this.showSynopsisAnimation.on('stop', () => {
                        this.tag('Synopsis').expand();
                    });

                    this._oa.on('finish', () => {
                        this._ov = true;
                    });

                    this._oa.on('stopFinish', () => {
                        this._ov = false;
                        this.showSynopsisAnimation.stop();
                        this.focusSliderAnimation.stop();
                        this.tag('Synopsis').fire('collapse');
                        this.fire('stateChange', {state: 'BackButton'});
                    });

                    return 'BackButton'
                },
                stateChange(e) {
                    return e.state
                },
                BackButton: {
                    _handleEnter() {
                        this.signal('showPlayer');
                    },
                    _handleDown() {
                        if(this.tag('Synopsis').moreTextLines) {
                            return 'Synopsis'
                        }
                        else if(this.tag('Slider').length) {
                            return 'Slider'
                        }
                    }
                },
                Synopsis: {
                    showSynopsisAnimation() {
                        this.showSynopsisAnimation.start();
                    },
                    hideSynopsisAnimation() {
                        this.showSynopsisAnimation.stop();
                    },
                    _handleUp() {
                        return 'BackButton'
                    },
                    _handleDown() {
                        if(this.tag('Slider').length) {
                            return "Slider"
                        }
                    }
                },
                Slider: {
                    _enter() {
                        this.focusSliderAnimation.start();
                    },
                    _exit() {
                        this.focusSliderAnimation.stop();
                    },
                    _handleEnter() {
                        const item = this.tag('Slider').focusedItem.item;
                        this.signal('switchView', {view: 'Player', persist: {targetId: item.links.target.id}, ignore: true});
                    },
                    _handleUp() {
                        if(this.tag('Synopsis').moreTextLines) {
                            return 'Synopsis'
                        }
                        return 'BackButton'
                    }
                }
            }
        }
    }

    class Player extends lng.Component {
        static _template() {
            return {
                alpha: 0, w: 1920, h: 1080, rect: true, color: 0x00000000,
                BackgroundGradient: {zIndex: 1, alpha: 0, y: -420, w: 1920, h: 1920, rect: true, shader: {type: PlayerShader, radius: 400, x: 960, y: 960, color1: 0x3300ff00, color2: 0xaa00ff00, mount: 0.5}},
                PlayerOverlay: {type: PlayerOverlay, signals: {invokePlayerState: true, showDetails: true, previousView: true}},
                DetailOverlay: {alpha: 0, type: DetailOverlay, signals: {showPlayer: true, switchView: true}}
            }
        }

        get api() {
            return this.cparent.api
        }

        set theme(theme) {
            this.patch({
                BackgroundGradient: { shader: {type: PlayerShader, radius: 400, x: 960, y: 960, color1: 0x00000000, color2: 0xDE000000, mount: 0.5}},
                PlayerOverlay: {theme},
                DetailOverlay: {theme}
            });
        }

        update(data) {
            this.collectingMedia = false;
            let {publicationService:ps = null, image = null, title = null, show = null, synopsis = null, broadcastedOn = null, availableTo = false, mediaCollection = false, relates:teasers = []} = data;
            let subline = [];
            let logo = null;

            if(ps.partner === 'radio_bremen') {
                ps.partner = 'rb';
            }
            if(ps.partner === 'ard-alpha') {
                ps.partner = 'alpha';
            }
            if(show && show.title !== title) {
                subline.push(show.title);
            }
            if(ps.name) {
                subline.push(ps.name);
            }
            logo = this.themeManager.getChannelTheme(ps.partner.replace('_', '')).logo;

            this._detailOverlay.update({logo, title, image, show, subline, synopsis, broadcastedOn, availableTo, teasers});

            if(mediaCollection) {
                this.collectingMedia = true;
                const availableStreams = mediaCollection._mediaArray[0]._mediaStreamArray;
                this._stream = availableStreams[availableStreams.length - 1]._stream;
                this.updatePlayingItem({logo, title, subline, subtitles: mediaCollection._subtitleUrl || false});
            }
            else {
                this.mediaAvailable = false;
                this.updatePlayingItem({logo, title, subline, subtitles: false});
            }
        }

        updatePlayingItem(obj) {
            this.tag('PlayerOverlay').update(obj);
            this.fire('finishedLoading');
        }

        play(url) {
            this.fire('play', args);
            return !!this.stream
        }

        _setItems(item) {
            this._item = item;
            this.application.updateFocusSettings();
        }

        _getFocused() {
            switch(this.state) {
                case 'Active.PlayerOverlay':
                    return this.tag('PlayerOverlay')
                case 'Active.DetailOverlay':
                    return this.tag('DetailOverlay')
            }
            return this
        }

        getMediaplayerSettings() {
            return {
                stream: {src: this._stream}
            }
        }

        showPlayerOverlay() {
            if(!this._playerOverlay.overlayVisible && !this._playerOverlay.overlayAnimation.isPlaying()) {
                this._playerOverlay.overlayAnimation.start();
            }
        }

        hidePlayerOverlay() {
            if(!this._playerOverlay.overlayAnimation.isStopping()) {
                this._playerOverlay.overlayAnimation.stop();
            }
        }

        showDetailOverlay() {
            this._detailOverlay.overlayAnimation.start();
        }

        hideDetailOverlay() {
            this._detailOverlay.overlayAnimation.stop();
        }

        _setInterfaceTimeout() {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(() => {
                if(this.application.mediaplayer.isPlaying() && this.state === 'Active.PlayerOverlay'){
                    this.hidePlayerOverlay();
                }
            }, this.hideTimer);
        }

        static _states() {
            return {
                _init() {
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

                    const shader = this.tag('BackgroundGradient');

                    this._playerOverlay.overlayAnimation.on('start', () => {
                        shader.setSmooth('shader.radius', 400, {duration: 0.375});
                        shader.setSmooth('alpha', 1, {duration: 0.375});
                    });

                    this._playerOverlay.overlayAnimation.on('stop', () => {
                        shader.setSmooth('shader.radius', 1500, {duration: 0.375});
                        if(this.changingOverlay) {
                            this._detailOverlay.overlayAnimation.start();
                            this.changingOverlay = false;
                        }
                    });

                    this._playerOverlay.overlayAnimation.on('stopFinish', () => {
                        if(this.changingOverlay) {
                            this._detailOverlay.overlayAnimation.start();
                            this.changingOverlay = false;
                        }
                    });

                    this._detailOverlay.overlayAnimation.on('start', () => {
                        shader.setSmooth('alpha', 1, {duration: 0.375});
                        shader.setSmooth('shader.radius', 0, {duration: 0.375});
                    });

                    this._detailOverlay.overlayAnimation.on('stopFinish', () => {
                        if(this.changingOverlay) {
                            this._playerOverlay.tag('Subtitles').setSmooth('alpha', 1);
                            this._playerOverlay.overlayAnimation.start();
                            this.changingOverlay = false;
                        }
                    });
                },
                _handleBack() {
                    this.application.mediaplayer.close();
                    return false
                },
                _handleUp() {
                    //block handleUp from bubbling to app
                },
                _handleLeft() {
                    //block handleLeft from bubbling to app
                },
                loadView({toLoad: {persist: {targetId, useTarget = false}}}) {
                    this.fire('loading');
                    this.mediaAvailable = false;
                    if(!useTarget) {
                        this.api.getPlayerPage(targetId)
                            .then((response) => {
                                this.update(response);
                            });
                    }
                    else {
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
                    _enter() {
                        this.hidePlayerOverlay();
                        this.hideDetailOverlay();
                        this.signal('showBackground');
                        const animation = this.animation({
                            duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}},
                                {t: 'BackgroundGradient', p: 'shader.radius', v: {1: 1500}}
                            ]
                        });
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.tag('PlayerOverlay').progress = {currentTime: 0, duration: 0};
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({
                            duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]
                        });
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return 'Active'
                    }
                },
                Idle: {},
                Active: {
                    _enter() {
                        if(!this.collectingMedia) {
                            this.fire('mediaUpdate');
                        }
                    },
                    _exit() {
                        this.tag('PlayerOverlay').tag('Subtitles').empty = true;
                        this._detailOverlay.geoBlocked = false;
                        this._stream = null;
                        this.mediaAvailable = false;
                        this.application.mediaplayer.close();
                    },
                    mediaUpdate() {
                        if(this.mediaAvailable && this.state !== 'Active.DetailOverlay') {
                            this.showPlayerOverlay();
                            this._detailOverlay.showBackgroundImage(false);
                            return 'Active.PlayerOverlay'
                        }
                        else {
                            this.showDetailOverlay();
                            this._detailOverlay.showBackgroundImage(true);
                            return 'Active.DetailOverlay'
                        }
                    },
                    play: function ({item, items}) {
                        this._items = items;
                        this._setItem(item);
                    },
                    $mediaplayerStart() {
                        this.collectingMedia = false;
                        this._playerOverlay.playerState = 'START';
                    },
                    $mediaplayerEnded() {
                        this._playerOverlay.playerState = 'END';
                        this.fire('previousView');
                    },
                    $mediaplayerPause() {
                        this._playerOverlay.playerState = 'PAUSE';
                    },
                    $mediaplayerPlay() {
                        this._detailOverlay.geoBlocked = false;
                        this._playerOverlay.playerState = 'PLAY';
                        this.signal('hideBackground');
                        this.mediaAvailable = true;
                        this.fire('mediaUpdate');
                    },
                    $mediaplayerStop() {
                        this._playerOverlay.playerState = 'STOP';
                    },
                    $mediaplayerProgress(e) {
                        this.tag('PlayerOverlay').progress = e;
                    },
                    $mediaplayerSeeked(e) {
                        this.tag('PlayerOverlay').seeked(e);
                    },
                    $mediaplayerSeeking(e) {
                        this.tag('PlayerOverlay').seeking = e;
                    },
                    $mediaplayerError(e) {
                        this._detailOverlay.geoBlocked = true;
                        this.signal('showBackground');
                        this.mediaAvailable = false;
                        this.fire('mediaUpdate');
                    },
                    invokePlayerState(e) {
                        switch(e.action) {
                            case 'playPause':
                                this.application.mediaplayer.playPause();
                                break
                            case 'forward':
                                this.application.mediaplayer.seek(15);
                                break
                            case 'rewind':
                                this.application.mediaplayer.seek(-15);
                                break
                        }
                    },
                    PlayerOverlay: {
                        _captureKey() {
                            this.showPlayerOverlay();
                            this._setInterfaceTimeout();
                            return false
                        },
                        _enter() {
                            this._setInterfaceTimeout();
                        },
                        _exit() {
                            if (this._timeout) {
                                clearTimeout(this._timeout);
                            }
                            this._playerOverlay.overlayVisible = false;
                        },
                        showDetails() {
                            this.changingOverlay = true;
                            this._playerOverlay.tag('Subtitles').setSmooth('alpha', 0);
                            this._playerOverlay.overlayAnimation.stop();
                            // this.application.mediaplayer.pause()
                            return 'Active.DetailOverlay'
                        },
                        previousView() {
                            this.signal('previousView');
                        }
                    },
                    DetailOverlay: {
                        _exit() {
                            this._detailOverlay.overlayVisible = false;
                        },
                        _handleBack() {
                            this.fire('showPlayer');
                        },
                        showPlayer() {
                            if(this.mediaAvailable) {
                                this.changingOverlay = true;
                                this._detailOverlay.overlayAnimation.stop();
                                return 'Active.PlayerOverlay'
                            }
                            else {
                                this.signal('previousView');
                            }
                        },
                        switchView(e) {
                            this.signal('switchView', e);
                        }
                    }
                }
            }
        }
    }

    class KeyboardButton extends lng.Component {
        static _template() {
            return {
                Background: {colorTop: 0xffe8e8e8 /*0xff3777ee*/, colorBottom: 0xffd1d1d1/*0xff2654a8*/},
                Label: {color: 0xffffffff}
            }
        }

        set action(v) {
            this._a = v;
        }

        get action() {
            return this._a
        }

        get c() {
            return this.key.c
        }

        set key(k) {
            this._k = k;
            let label = {mountX: 0.5, mountY: 0.4, text: {text: this.key.c || '', fontSize: 36, fontFace: 'RobotoRegular', textAlign: 'center'}};

            if(typeof(k.c) === 'object') {
                label = {mountX: 0.5, mountY: 0.30, text: {text: k.c.type, fontFace: k.c.font, fontSize: k.c.fontSize || 40, textAlign: 'Center'}};
            }
            const isInput = this.action === 'input';

            this.patch({
                Background: {alpha: isInput ? 0 : 0.5, texture: lng.Tools.getRoundRect(this.w, this.h, 7, 0, 0xffffffff, true, 0xffffffff)},
                Label: lng.tools.ObjMerger.merge({x: this.w/2, y: this.h/2, color: isInput ? 0xffffffff : 0xff000000}, label)
            });

            if(this.hasFocus()) {
                this.fire('_focus');
            }
        }

        get key() {
            return this._k
        }

        static _states() {
            return {
                _init() {
                    const isInput = this.action === 'input';
                    this.patch({
                        Background: {alpha: isInput ? 0 : 0.5, texture: lng.Tools.getRoundRect(this.w, this.h, 7, 0, 0xffffffff, true, 0xffffffff)},
                        Label: {color: isInput ? 0xffffffff : 0xff000000, x: this.w/2, y: this.h/2}
                    });
                },
                _focus() {
                    this.patch({
                        Background: {smooth: {alpha: 1, colorBottom: 0xff2654a8, colorTop: 0xff3777ee}},
                        Label: {smooth: {color: 0xffffffff}}
                    });
                },
                _unfocus() {
                    const isInput = this.action === 'input';
                    this.patch({
                        Background: {smooth: {alpha: isInput ? 0 : 0.5, colorTop: 0xffe8e8e8, colorBottom: 0xffd1d1d1}},
                        Label: {smooth: {color: isInput ? 0xffffffff : 0xff000000}}
                    });
                }
            }
        }
    }

    const layouts = {
        'ABC': { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: 'Q'},
                        Key2: {c: 'W'},
                        Key3: {c: 'E'},
                        Key4: {c: 'R'},
                        Key5: {c: 'T'},
                        Key6: {c: 'Y'},
                        Key7: {c: 'U'},
                        Key8: {c: 'I'},
                        Key9: {c: 'O'},
                        Key10: {c: 'P'}
                    }
                },
                Row2: {x: 34,
                    keys: {
                        Key1: {c: 'A'},
                        Key2: {c: 'S'},
                        Key3: {c: 'D'},
                        Key4: {c: 'F'},
                        Key5: {c: 'G'},
                        Key6: {c: 'H'},
                        Key7: {c: 'J'},
                        Key8: {c: 'K'},
                        Key9: {c: 'L'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: 'Aa',toLayout: 'abc', action: 'toggleToLayout'},
                        Key2: {c: 'Z'},
                        Key3: {c: 'X'},
                        Key4: {c: 'C'},
                        Key5: {c: 'V'},
                        Key6: {c: 'B'},
                        Key7: {c: 'N'},
                        Key8: {c: 'M'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: '#123', c: '#123', action: 'toggleToLayout'},
                        Key2: {c: ','},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '.'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        'abc': { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: 'q'},
                        Key2: {c: 'w'},
                        Key3: {c: 'e'},
                        Key4: {c: 'r'},
                        Key5: {c: 't'},
                        Key6: {c: 'y'},
                        Key7: {c: 'u'},
                        Key8: {c: 'i'},
                        Key9: {c: 'o'},
                        Key10: {c: 'p'}
                    }
                },
                Row2: {x: 34,
                    keys: {
                        Key1: {c: 'a'},
                        Key2: {c: 's'},
                        Key3: {c: 'd'},
                        Key4: {c: 'f'},
                        Key5: {c: 'g'},
                        Key6: {c: 'h'},
                        Key7: {c: 'j'},
                        Key8: {c: 'k'},
                        Key9: {c: 'l'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: 'aA',toLayout: 'ABC', action: 'toggleToLayout'},
                        Key2: {c: 'z'},
                        Key3: {c: 'x'},
                        Key4: {c: 'c'},
                        Key5: {c: 'v'},
                        Key6: {c: 'b'},
                        Key7: {c: 'n'},
                        Key8: {c: 'm'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: '#123', c: '#123', action: 'toggleToLayout'},
                        Key2: {c: ','},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '.'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        '#123' : { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: '1'},
                        Key2: {c: '2'},
                        Key3: {c: '3'},
                        Key4: {c: '4'},
                        Key5: {c: '5'},
                        Key6: {c: '6'},
                        Key7: {c: '7'},
                        Key8: {c: '8'},
                        Key9: {c: '9'},
                        Key10: {c: '0'}
                    }
                },
                Row2: {x: 34,
                    keys: {
                        Key1: {c: '@'},
                        Key2: {c: '#'},
                        Key3: {c: '€'},
                        Key4: {c: '_'},
                        Key5: {c: '&'},
                        Key6: {c: '-'},
                        Key7: {c: '+'},
                        Key8: {c: '('},
                        Key9: {c: ')'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: '{&=', toLayout: '{&=', action: 'toggleToLayout'},
                        Key2: {c: '*'},
                        Key3: {c: '\"'},
                        Key4: {c: '\''},
                        Key5: {c: ':'},
                        Key6: {c: ';'},
                        Key7: {c: '!'},
                        Key8: {c: '?'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: 'ABC', c: 'ABC', action: 'toggleToLayout'},
                        Key2: {c: ','},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '.'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        '{&=' : { keyWidth: 64, keyHeight: 84, horizontalSpacing: 8, verticalSpacing: 12,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: '~'},
                        Key2: {c: '\`'},
                        Key3: {c: '|'},
                        Key4: {c: '\u2022'},
                        Key5: {c: '√'},
                        Key6: {c: 'π'},
                        Key7: {c: '\u00F7'},
                        Key8: {c: '\u00d7'},
                        Key9: {c: '¶'},
                        Key10: {c: '∆'}
                    }
                },
                Row2: {
                    keys: {
                        Key1: {c: '£'},
                        Key2: {c: '¥'},
                        Key3: {c: '€'},
                        Key4: {c: '¢'},
                        Key5: {c: '^'},
                        Key6: {c: '°'},
                        Key7: {c: '='},
                        Key8: {c: '{'},
                        Key9: {c: '}'},
                        Key10: {c: '\\'}
                    }
                },
                Row3: {
                    keys: {
                        Key1: {w: 98, c: '#123', toLayout: '#123', action: 'toggleToLayout'},
                        Key2: {c: '%'},
                        Key3: {c: '©'},
                        Key4: {c: '®'},
                        Key5: {c: '™'},
                        Key6: {c: '\u2713'},
                        Key7: {c: '['},
                        Key8: {c: ']'},
                        Key9: {w: 98, c: {type: 'backspace', font: 'Material-Icons'}, action: 'backspace'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 136, toLayout: 'ABC', c: 'ABC', action: 'toggleToLayout'},
                        Key2: {c: '<'},
                        Key3: {w: 276, action: 'space'},
                        Key4: {c: '>'},
                        Key5: {w: 136, c: {type: 'keyboard', font: 'Material-Icons', fontSize: 50}, action: 'hideKeyboard'}
                    }
                }
            }
        }
    };

    class Keyboard extends lng.Component {
        static _template() {
            return {}
        }

        static get KeyboardButton() {
            return KeyboardButton
        }

        static get KeyboardLayouts() {
            return layouts
        }

        get maxCharacters() {
            return 100
        }

        set value(v) {
            if(v.length <= this.maxCharacters) {
                this._value = v;
                this.signal('valueChanged', {value: v});
            }
        }

        get value() {
            return this._value
        }

        get rows() {
            return this.children
        }

        get rowLength() {
            return this.children[this.rowIndex].children.length
        }

        get currentKey() {
            return this.children[this.rowIndex].children[this.colIndex]
        }

        set layout(layout) {
            this._layout = layout;
            this.fire('_update');
        }

        get layout() {
            return this._layout
        }

        _getFocused() {
            return this.currentKey
        }

        _navigate(dir, value) {
            dir = (dir === 'up' || dir === 'down') ? 'vertical' : 'horizontal';
            if(dir === 'horizontal' && this.colIndex + value < this.rowLength && this.colIndex + value > -1) {
                this.previous = null;
                return this.colIndex += value
            }
            else if(dir === 'vertical' && this.rowIndex + value < this.rows.length && this.rowIndex + value > -1) {
                const currentColIndex = this.colIndex;
                const targetRow = this.rowIndex + value;
                if(this.previous && this.previous.row === targetRow) {
                    const tmp = this.previous.col;
                    this.previous.col = this.colIndex;
                    this.colIndex = tmp;
                }
                else {
                    const targetRow = this.children[(this.rowIndex + value)];
                    const targetItems = targetRow.children;
                    const ck = this.currentKey;
                    let target = 0;
                    for(let i = 0; i < targetItems.length; i++) {
                        const ckx = this.children[this.rowIndex].x + ck.x;
                        const tix = targetRow.x + targetItems[i].x;
                        if((ckx >= tix && ckx <= tix + targetItems[i].w) || (tix >= ckx && tix <= ckx + ck.w)) {
                            target = i;
                            break
                        }
                    }
                    this.colIndex = target;
                }
                this.previous = {col: currentColIndex, row: this.rowIndex};
                return this.rowIndex += value
            }
            return false
        }

        reset() {
            this.colIndex = 0;
            this.rowIndex = 0;
            this._value = '';
            this.previous = null;
        }

        static _states() {
            const KeyboardLayouts = this.KeyboardLayouts;
            const KeyboardButton$$1 = this.KeyboardButton;
            return {
                _init() {
                    this.reset();
                    this.fire('_update');
                },
                _handleRight() {
                    return this._navigate('right', 1)
                },
                _handleLeft() {
                    return this._navigate('left', -1)
                },
                _handleUp() {
                    return this._navigate('up', -1)
                },
                _handleDown() {
                    return this._navigate('down', 1)
                },
                toggleToLayout(e) {
                    this.layout = e.value;
                    this.fire('_update');
                },
                _update() {
                    if(this.layout && KeyboardLayouts[this.layout] === undefined) {
                        console.error(`Configured layout "${this.layout}" does not exist. Reverting to "${Object.keys(KeyboardLayouts)[0]}"`);
                        this.layout = null;
                    }
                    if(!this.layout) {
                        this.layout = Object.keys(KeyboardLayouts)[0];
                    }
                    const {rows = {}, keyWidth, keyHeight, spacing = 0, horizontalSpacing = 0, verticalSpacing = 0} = KeyboardLayouts[this.layout];
                    this.children = Object.keys(rows).map((r, index) => {
                        const row = rows[r];
                        let keyOffset = 0;
                        return {ref: r, y: keyHeight * index + (index * (verticalSpacing || spacing || 0)), x: row.x || 0,
                            children: Object.keys(row.keys).map((k, index) => {
                                const key = Object.assign({action: 'input'}, row.keys[k]);
                                const prevOffset = keyOffset;
                                keyOffset += (key.w || keyWidth) + (horizontalSpacing || spacing);
                                return {ref: k, key: key || index, action: key.action, toLayout: key.toLayout, x: prevOffset, w: key.w || keyWidth, h: key.h || keyHeight, type: KeyboardButton$$1}
                            })
                        }
                    });
                    this.signal('keysUpdated');
                },
                _handleEnter() {
                    const key = this.currentKey;
                    switch(key.action) {
                        case 'input':
                            this.value += key.c;
                            break
                        case 'backspace':
                            this.value = this.value.slice(0, -1);
                            break
                        case 'space':
                            if(this.value.length > 0){
                                this.value += ' ';
                            }
                            break
                        case 'delete':
                            this.value = '';
                            break
                        case 'toggleToLayout':
                            this.fire('toggleToLayout', {value: key.toLayout});
                            break
                        default:
                            this.signal(key.action);
                            break
                    }
                }
            }
        }
    }

    class KeyboardButton$1 extends lng.Component {
        static _template() {
            return {
                Background: {color: 0xff000000,
                    Label: {color: 0xffffffff, mountX: 0.5, mountY: 0.4, text: {text: '', fontSize: 40, fontFace: 'TheSansB4', textAlign: 'center'} },
                    Icon: {alpha: 0, mountX: 0.5, mountY: 0.5, type: IconItem}
                }
            }
        }

        set theme(theme) {
            this.patch({
                Background: {color: theme.keyboard.key,
                    Label: {color: theme.keyboard.keyText || theme.text},
                    Icon: {color: theme.keyboard.keyText || theme.text}
                }
            });

            this._fc = {
                label: theme.keyboard.keyText ||theme.text,
                labelFocus: theme.textFocus,
                background: theme.keyboard.key,
                backgroundFocus: theme.focus
            };
            if(this.hasFocus()) {
                this.fire('_focus');
            }
        }

        set action(v) {
            this._a = v;
        }

        get action() {
            return this._a
        }

        get c() {
            return this.key.c
        }

        set key(k) {
            this._k = k;
            if(typeof(k.c) === 'object') {
                this.patch({
                    Background: {
                        Label: {alpha: 0},
                        Icon: {alpha: 1, icon: {src: `icons/ui/${k.c.src}.svg`, w: k.c.w, h: k.c.h}}
                    }
                });
            }
            else {
                this.patch({
                    Background: {
                        Label: {alpha: 1, text: {text: k.c || ''}},
                        Icon: {alpha: 0}
                    }
                });
            }
        }

        get key() {
            return this._k
        }

        static _states() {
            return {
                _init() {
                    this.patch({
                        Background: {texture: lng.Tools.getRoundRect(this.w, this.h, 5, 0, 0xffffffff, true, 0xffffffff),
                            Label: {x: this.w/2, y: this.h/2},
                            Icon: {x: this.w/2, y: this.h/2}
                        }
                    });
                },
                _focus() {
                    this.patch({
                        Background: {smooth: {color: this._fc.backgroundFocus},
                            Label: {smooth: {color: this._fc.labelFocus}},
                            Icon: {smooth: {color: this._fc.labelFocus}}
                        }
                    });
                },
                _unfocus() {
                    this.patch({
                        Background: {smooth: {color: this._fc.background},
                            Label: {smooth: {color: this._fc.label}},
                            Icon: {smooth: {color: this._fc.label}}
                        }
                    });
                }
            }
        }
    }

    class Keyboard$1 extends Keyboard {
        static get KeyboardButton() {
            return KeyboardButton$1
        }

        static get KeyboardLayouts() {
            return KeyboardLayouts
        }

        get maxCharacters() {
            return 37
        }
    }

    const KeyboardLayouts = {
        'ABC': { keyWidth: 126, keyHeight: 80, horizontalSpacing: 16, verticalSpacing: 18,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: 'Q'},
                        Key2: {c: 'W'},
                        Key3: {c: 'E'},
                        Key4: {c: 'R'},
                        Key5: {c: 'T'},
                        Key6: {c: 'Z'},
                        Key7: {c: 'U'},
                        Key8: {c: 'I'},
                        Key9: {c: 'O'},
                        Key10: {c: 'P'},
                        Key11: {c: 'Ü'},
                        Key12: {c: {src: 'delete', w: 130, h: 130}, action: 'backspace'}
                    }
                },
                Row2: {x: 63,
                    keys: {
                        Key1: {c: 'A'},
                        Key2: {c: 'S'},
                        Key3: {c: 'D'},
                        Key4: {c: 'F'},
                        Key5: {c: 'G'},
                        Key6: {c: 'H'},
                        Key7: {c: 'J'},
                        Key8: {c: 'K'},
                        Key9: {c: 'L'},
                        Key10: {c: 'Ö'},
                        Key11: {c: 'Ä'}
                    }
                },
                Row3: {x: 63,
                    keys: {
                        Key1: {c: 'Y'},
                        Key2: {c: 'X'},
                        Key3: {c: 'C'},
                        Key4: {c: 'V'},
                        Key5: {c: 'B'},
                        Key6: {c: 'N'},
                        Key7: {c: 'M'},
                        Key8: {c: '-'},
                        Key9: {c: 'ß'},
                        Key10: {w: 252+16, c: 'ENTF.', action: 'delete'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 252+16, toLayout: '#123', c: '#123', action: 'toggleToLayout'},
                        Key2: {w: 6*126+5*16, c: 'LEERZEICHEN', action: 'space'},
                        Key3: {w: 252+16+63, c: 'SUCHEN', action: 'search'},
                        Key4: {w: 126+63+16, c: {src: 'keyboard', w: 84, h: 84}, action: 'hideKeyboard'}
                    }
                }
            }
        },
        '#123' : { keyWidth: 126, keyHeight: 80, horizontalSpacing: 16, verticalSpacing: 18,
            rows: {
                Row1: {
                    keys: {
                        Key1: {c: '1'},
                        Key2: {c: '2'},
                        Key3: {c: '3'},
                        Key4: {c: '-'},
                        Key5: {c: '+'},
                        Key6: {c: '*'},
                        Key7: {c: '/'},
                        Key8: {c: '\\'},
                        Key9: {c: '|'},
                        Key10: {c: '{'},
                        Key11: {c: '}'},
                        Key12: {c: {src: 'delete', w: 130, h: 130}, action: 'backspace'}
                    }
                },
                Row2: { x: 63,
                    keys: {
                        Key1: {c: '4'},
                        Key2: {c: '5'},
                        Key3: {c: '6'},
                        Key4: {c: '\''},
                        Key5: {c: '&'},
                        Key6: {c: '?'},
                        Key7: {c: '@'},
                        Key8: {c: '='},
                        Key9: {c: ':'},
                        Key10: {c: '['},
                        Key11: {c: ']'}
                    }
                },
                Row3: { x: 63,
                    keys: {
                        Key1: {c: '7'},
                        Key2: {c: '8'},
                        Key3: {c: '9'},
                        Key4: {c: '0'},
                        Key5: {c: '$'},
                        Key6: {c: '#'},
                        Key7: {c: '!'},
                        Key8: {c: '<'},
                        Key9: {c: '>'},
                        Key10: {w: 252+16, c: 'ENTF.', action: 'delete'}
                    }
                },
                Row4: {
                    keys: {
                        Key1: {w: 252+16, toLayout: 'ABC', c: 'ABC', action: 'toggleToLayout'},
                        Key2: {w: 6*126+5*16, c: 'LEERZEICHEN', action: 'space'},
                        Key3: {w: 252+16+63, c: 'SUCHEN', action: 'search'},
                        Key4: {w: 126+63+16, c: {src: 'keyboard', w: 84, h: 84}, action: 'hideKeyboard'}
                    }
                }
            }
        }
    };

    class InputField extends lng.Component {
        static _template() {
            return {
                Background: {mount: 0.5, x: 1755, alpha: 0,
                    Left: {mountX: 0.95, texture: lng.Tools.getRoundRect(37, 74, [37, 0, 0, 37], 0, 0xffffffff, true, 0xffffffff)},
                    Right: {mountX: 0.15, texture: lng.Tools.getRoundRect(37, 74, [0, 37, 37, 0], 0, 0xffffffff, true, 0xffffffff)},
                    Middle: {mountX: 0.5, y: 1, h: 74, w: 1, rect: true}
                },
                Icon: {mountX: 0.5, mountY: 0.5, y: 38, type: IconItem, icon: {src: 'icons/ui/search.svg', w: 85, h: 85}},
                QueryString: {alpha: 0, mountY: 0.4, y: 37, x: 115, text: {text: 'Suche nach Video on Demand, Sendungen, Themen oder Livestreams', fontSize: 35, fontFace: 'TheSansB4', textAlign: 'left'}}
            }
        }

        set theme(theme) {
            const {focus, textFocus, search} = theme;
            this.patch({
                Background: {
                    Left: {color: search.input},
                    Right: {color: search.input},
                    Middle: {color: search.input}
                },
                Icon: {color: search.icon},
                QueryString: {color: search.erase}
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

        set value(v) {
            const screenValue = this.inspectValue(v);
            this.patch({
                QueryString: {color: this.hasInput ? this._hasInputColor : this._emptyInputColor, text: {text: screenValue}}
            });
            this._value = screenValue;
        }

        inspectValue(value) {
            this._hasInput = false;
            if(value.length > 0) {
                this._hasInput = true;
                return value
            }
            return this.emptyInputString
        }

        get emptyInputString() {
            return 'Suche nach Video on Demand, Sendungen, Themen oder Livestreams'
        }

        get value() {
            return this._value
        }

        get hasInput() {
            return this._hasInput
        }

        reset() {
            this.value = '';
        }

        set expand(v) {
            const delay = v ? 0.25 : 0;
            this.patch({
                Background: {transitions: {alpha: {duration: 0.25, delay}, x: {duration: 0.25, delay}}, smooth: {alpha: !!v, x: v ? 1040 : 1755},
                    Middle: {transitions: {w: {duration: 0.25, delay}}, smooth: {w: v ? 1200 : 100}}
                }
            });
        }

        static _states() {
            return {
                _init() {
                    this._hasInput = false;
                    const middle = this.tag('Middle');
                    const icon = this.tag('Icon');
                    const queryString = this.tag('QueryString');
                    const background = this.tag('Background');

                    middle.onUpdate = (() => {
                        this.patch({
                            Background: {
                                Left: {x: -(middle.w / 2)},
                                Right: {x: middle.w / 2}
                            },
                            Icon: {x: background.x - middle.w / 2},
                            QueryString: {x: background.x - (middle.w / 2 - 78) }
                        });
                        if(middle.w > 50 && !icon.transition('mountX').isRunning()) {
                            icon.setSmooth('mountX', 0.35);
                        }
                        if(middle.w < 50 && !icon.transition('mountX').isRunning()) {
                            icon.setSmooth('mountX', 0.5);
                        }
                        if(middle.w > 1100 && !queryString.transition('alpha').isRunning()) {
                            queryString.setSmooth('alpha', 1);
                        }
                        if(middle.w < 1100 && !queryString.transition('alpha').isRunning()) {
                            queryString.setSmooth('alpha', 0);
                        }
                    });
                },
                _focus() {
                    this.patch({
                        Background: {
                            Left: {smooth: {color: this._fc.focus}},
                            Right: {smooth: {color: this._fc.focus}},
                            Middle: {smooth: {color: this._fc.focus}}
                        },
                        Icon: {smooth: {color: this._fc.textFocus}},
                        QueryString: {smooth: {color: this._fc.textFocus}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Background: {
                            Left: {smooth: {color: this._fc.input}},
                            Right: {smooth: {color: this._fc.input}},
                            Middle: {smooth: {color: this._fc.input}}
                        },
                        Icon: {smooth: {color: this._fc.icon}},
                        QueryString: {smooth: {color: this.hasInput ?  this._hasInputColor : this._emptyInputColor}}
                    });
                }
            }
        }


    }

    class SearchResults extends lng.Component {
        static _template() {
            return { alpha: 0,
                Shows: {type: GridList, y: 220},
                OnDemand: {x: 115, y: 220 + 500,
                    Title: {text: {text: 'Videos on Demand', fontSize: 40, maxLines: 1, fontFace: 'TheSansB4'}},
                    Grid: {type: Grid, paddingTop: 75, paddingBottom: 115, h: 850, signals: {rowIndexChanged: true}}
                }
            }
        }

        set theme(v) {
            this._t = v;
        }

        set items(response) {
            const {showResults = [], vodResults = []} = response;
            let vod = [];
            let shows = [];

            if(showResults.length) {
                shows = showResults;
            }
            if(vodResults) {
                vod = vodResults.map((item) => {
                    return {ref: `T${item.id}`, base: 'grid', item, theme: this._t,  type: GridCell}
                });
            }

            this._hasItems = (showResults.length > 0 || vodResults.length > 0);
            this.patch({
                y: 0, alpha: !!this._hasItems,
                Shows: {alpha: !!(shows.length > 0), theme: this._t, widget: {title: `Sendungen`, titleVisible: true, teasers: shows}},
                OnDemand: { alpha: !!(vod.length > 0),
                    Grid: {items: vod}
                }
            });

            let target = 'Empty';
            if(this._hasItems) {
                target = 'Shows';
                if(shows.length === 0) {
                    target = 'OnDemand';
                }
            }

            this.fire('reset', {target});
        }

        set hasItems(v) {
            this._hasItems = v;
        }

        get hasItems() {
            return this._hasItems
        }

        get focusedItem() {
            if(this.state === 'OnDemand') {
                return this.tag('Grid').item
            }
            return this.tag('Shows')
        }

        _getFocused() {
            switch(this.state) {
                case 'OnDemand':
                    return this.tag('Grid')
                case 'Shows':
                    return this.tag('Shows')
                default:
                    return this
            }
        }

        static _states() {
            return {
                _init() {
                    const grid = this.tag('Grid');
                    const gridWrapper = grid.tag('Wrapper');

                    gridWrapper.transition('y').on('start', () => {
                        const targetValue = gridWrapper.transition('y').targetValue;
                        const scrollTo = grid.y - targetValue;
                        this.patch({
                            Shows: {smooth: {y: (220-75)-(scrollTo)}},
                            OnDemand: {
                                Title: {smooth: {y: -75-(scrollTo)}}
                            }
                        });
                    });

                    return 'Empty'
                },
                reset({target}) {
                    return target
                },
                Empty: {},
                Shows: {
                    _handleDown: 'OnDemand'
                },
                OnDemand: {
                    _enter() {
                        this.setSmooth('y', -500);
                    },
                    _exit() {
                        if(this.tag('Shows').dataLength > 0) {
                            this.setSmooth('y', 0);
                        }
                    },
                    _handleUp() {
                        if(this.tag('Shows').dataLength > 0) {
                            return 'Shows'
                        }
                        return false
                    }
                }
            }
        }
    }

    class SimpleButton extends lng.Component {
        static _template() {
            return { w: 270,
                Background: {alpha: 0, color: 0xffff0000},
                Label: {x: 15, y: 36, mountY: 0.4, color: 0xffffffff, text: {text: 'App schließen', fontSize: 42, fontFace: 'TheSansB4', textAlign: 'center'}}
            }
        }

        set theme({text, focus, textFocus}) {
            this.patch({
                Background: {color: focus},
                Label: {color: text}
            });

            this._fc = {
                text,
                textFocus
            };
        }

        static _states() {
            return {
                _init() {
                    const {w = 0} = this;
                    const {fontSize = 42, label:text} = this.item;
                    this.patch({
                        Background: {texture: lng.Tools.getRoundRect(w, this.h, this.h/2, 0, 0xffffffff, true, 0xffffffff)},
                        Label: {y: this.h / 2, mountX: 0.5, x: w/2, text: {text, fontSize}}
                    });

                    const label = this.tag('Label');
                    label.on('txLoaded', () => {
                        const width = label.renderWidth + 30;
                        if(w === 0 || w < width) {
                            this.patch({w: width,
                                Background: {texture: lng.Tools.getRoundRect(w, this.h, this.h/2, 0, 0xffffffff, true, 0xffffffff)},
                                Label: {y: this.h / 2, mountX: 0.5, x: width/2, text: {text, fontSize}}
                            });
                        }
                    });
                },
                _focus() {
                    this.patch({
                        Background:{smooth: {alpha: 1}},
                        Label: {smooth: {color: this._fc.textFocus}}
                    });
                },
                _unfocus() {
                    this.patch({
                        Background:{smooth: {alpha: 0}},
                        Label: {smooth: {color: this._fc.text}}
                    });
                }
            }
        }
    }

    class SearchPage extends lng.Component {
        static _template() {
            return { alpha: 0, w: 1920, h: 1080, clipbox: true,
                // VerticalSlider: {w: 1920, h: 1080, type: Slider, orientation: 'vertical', marginBottom: 80, marginTop: 220, itemSpacing: 45, signals: {indexChanged: true, outOfBounds: true}},
                SearchResults: {type: SearchResults},
                TopShadow: {zIndex: 4, h: 275, w: 1920, rect: true},
                BackButton: {zIndex: 4, type: ArdNavigationOptionItem, y: 38, x: 85, icon: {src: 'icons/ui/arrowLeft.svg', w: 75, h: 75}},
                ChannelLogo: {zIndex: 4, y: 87, mount: 0.5, x: 290, type: IconItem, maxWidth: 200},
                InputField: {zIndex: 4, type: InputField, y: 52},
                Cancel: {zIndex: 4, type: ArdNavigationOptionItem, y: 38, mountX: 1, x: 1835, icon: {src: 'icons/ui/close.svg', w: 75, h: 75}},
                Shadow: {x: 960, mountX: 0.5, y: 505, w: 1920, h: 40, clipping: true,
                    Texture: {x: 960, mountX: 0.5, color: 0xffffffff, texture: lng.Tools.getShadowRect(1920, 40, 0, 30, 30), transitions: {y: {duration: 0.5, timingFunction: 'ease-out'}}}
                },
                NoResults: {alpha: 0, type: NoResultsItem, y: 190},
                KeyboardBackground: {h: 535, w: 1920, y: 545, rect: true,
                    Keyboard: {x: 110, y: 30, type: Keyboard$1, signals: {keysUpdated: true, valueChanged: true, search: true, hideKeyboard: true}}
                }
            }
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        set theme(theme) {
            this._theme = theme;
            const {logo: {src, width}} = theme;
            this.patch({
                SearchResults: {theme},
                TopShadow: {colorBottom: 0x00000000, colorTop: theme.globalShadow},
                BackButton: {theme},
                ChannelLogo: {mount: 0.5, icon: {src, w: width*1.3, h: 48*1.3}},
                InputField: {theme},
                Cancel: {theme},
                Shadow: {
                    Texture: { color: theme.search.shadow}
                },
                NoResults: {theme},
                KeyboardBackground: {color: theme.keyboard.background}
            });

            this.setThemeKeyboardItems();
        }

        setThemeKeyboardItems(theme = this._theme) {
            const keyboard = this.tag('Keyboard');
            keyboard.children.forEach((row) => {
                row.children.forEach((key) => {
                    key.theme = theme;
                });
            });
        }

        update(response) {
            this.tag('SearchResults').items = response;
        }

        doSearch(value) {
            this.api.search(value)
                .then((response) => {
                    this.update(response);
                });
        }

        reset() {
            this.tag('InputField').reset();
            this.tag('Keyboard').reset();
            this.tag('SearchResults').items = {};
        }

        _getFocused() {
            return this.tag(this.state.replace('Active.', '')) || this
        }

        static _states() {
            return {
                _handleLeft() {
                    //block handleLeft from Bubbling to app
                },
                _handleUp() {
                    //block handleUp from Bubbling to app
                },
                loadView({isPreviousView}) {
                    this.isPreviousView = isPreviousView;
                    return 'Show'
                },
                hideView: 'Hide',
                finishedLoading: 'Show',
                Loading: {
                    finished: 'Show'
                },
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.5, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0.5: 1, 1: 0}},
                                {t: 'Cancel', p: 'alpha', v: {0: 1, 0.5: 0}},
                                {t: 'ChannelLogo', p: 'x', v: {0: 290, 0.5: 960}}
                            ]});

                        this.tag('InputField').expand = false;

                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.5, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 0.5: 1}},
                                {t: 'Cancel', p: 'alpha', v: {0.5: 0, 1: 1}},
                                {t: 'ChannelLogo', p: 'x', v: {0.5: 960, 1: 290}}
                            ]});
                        this.tag('InputField').expand = true;
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return this.isPreviousView ? 'Active.SearchResults' : 'Active.Keyboard'
                    }
                },
                Idle: {
                },
                Active: {
                    valueChanged(e) {
                        this.tag('InputField').value = e.value;
                        const inputField = this.tag('InputField');
                        if(inputField.hasInput && e.value.length > 2) {
                            this.doSearch(e.value);
                        }
                        else if(e.value.length === 0){
                            this.tag('SearchResults').items = {};
                            this.tag('NoResults').alpha = 0;
                        }
                    },
                    hideKeyboard() {
                        if(this.tag('SearchResults').hasItems) {
                            return 'Active.SearchResults'
                        }
                        return 'Active.Cancel'
                    },
                    Keyboard: {
                        _enter() {
                            this.patch({
                                Shadow: {smooth: {y: 505}},
                                KeyboardBackground: {smooth: {y: 545}}
                            });
                        },
                        _handleUp () {
                            if(this.tag('SearchResults').hasItems) {
                                return 'Active.SearchResults'
                            }
                            return 'Active.InputField'
                        },
                        keysUpdated() {
                            this.setThemeKeyboardItems();
                        },
                        search() {
                            if(this.tag('InputField').hasInput) {
                                this.doSearch(this.tag('Keyboard').value);
                            }
                        }
                    },
                    SearchResults: {
                        _enter() {
                            this.patch({
                                Shadow: {smooth: {y: 1080}},
                                KeyboardBackground: {smooth: {y: 1120}}
                            });
                        },
                        _handleEnter() {
                            const item = this.tag('SearchResults').focusedItem.item;
                            switch(item.type) {
                                case 'live':
                                    this.signal('switchView', {view: 'ComingSoon', persist: {type: 'live'}, ignore:true});
                                    break
                                case 'show':
                                    this.signal('switchView', {view: 'ShowPage', persist: {targetId: item.links.target.id}});
                                    break
                                default:
                                    this.signal('switchView', {view: 'Player', persist: {targetId: item.links.target.id}, ignore: true});
                                    break
                            }
                        },
                        _handleUp: 'Active.InputField'
                    },
                    Cancel: {
                        _handleEnter() {
                            this.reset();
                            this.signal('previousView');
                        },
                        _handleDown() {
                            if(this.tag('SearchResults').hasItems) {
                                return 'Active.SearchResults'
                            }
                            return 'Active.Keyboard'
                        },
                        _handleLeft: 'Active.InputField'
                    },
                    InputField: {
                        _handleEnter() {
                            return 'Active.Keyboard'
                        },
                        _handleDown() {
                            if(this.tag('SearchResults').hasItems) {
                                return 'Active.SearchResults'
                            }
                            return 'Active.Keyboard'
                        },
                        _handleRight: 'Active.Cancel',
                        _handleLeft: 'Active.BackButton'
                    },
                    BackButton: {
                        _handleEnter() {
                            this.signal('previousView');
                        },
                        _handleDown() {
                            if(this.tag('SearchResults').hasItems) {
                                return 'Active.SearchResults'
                            }
                            return 'Active.Keyboard'
                        },
                        _handleRight: 'Active.InputField'
                    }
                }
            }
        }
    }

    class ShowPage extends lng.Component {
        static _template() {
            return { alpha: 0, w: 1920, h: 1080, clipbox: true,
                BackgroundImage: {zIndex: 0, alpha: 1, w: 1920, h: 1080},
                BackgroundOverlay: {color: 0x3300ff00, rect: true, w: 1920, h: 1080},
                Grid: {type: Grid, y: 230, x: 115, paddingTop: 206, paddingBottom: 115, signals: {rowIndexChanged: true, outOfBounds: true}},
                NoItems: {alpha: 0.5, x: 960, y: 600, mount: 0.5, text: {text: "Kein Inhalt vorhanden", fontFace: 'TheSansB4', fontSize: 36}},
                Shadow: {y: 0, alpha: 0, h: 185, w: 1920, rect: true},
                BackButton: {zIndex: 2, type: ArdNavigationOptionItem, y: 42, x: 115, icon: {src: 'icons/ui/arrowLeft.svg'}},
                Title: {mountX: 0.5, x: 960, y: 50, text: {text: 'Item Title', fontSize: 50, fontFace: 'TheSansB6', textAlign: 'center'}},
                Synopsis: {zIndex: 2, x: 90, y: 200, type: SynopsisItem, signals: {showSynopsisAnimation: true, hideSynopsisAnimation: true}}
            }
        }

        set theme(theme) {
            this._t = theme;
            this.patch({
                BackgroundOverlay: {color: theme.globalShadow},
                Shadow: {colorBottom: 0x00000000, colorTop: theme.globalShadow},
                NoItems: {color: theme.toolbar.text},
                BackButton: {theme},
                Title: {color: theme.toolbar.text},
                Synopsis: {theme}
            });
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        update({title, image, synopsis, teasers}) {
            const hasDesc = synopsis !== null;
            this.patch({
                BackgroundImage: {src: ux.Ui.getImageUrl(image.src.replace('{width}', 1920), {width: 1920, height: 1080, type: 'crop'})},
                Title:{text: {text: title}},
                Synopsis: {alpha: !!hasDesc, synopsis},
                Grid: {y: !hasDesc ? 0 : 230, items: teasers.map((item) => {
                    let time = this.api.getDate(item.broadcastedOn, true);
                    if(item.subtitled) {
                        time += ' \u2022 UT';
                    }
                    return {ref: `T${item.id}`, base: 'grid', showTime: true, time, item, theme: this._t,  type: GridCell}
                })},
                NoItems: {alpha: teasers.length === 0 ? 0.5 : 0}
            });


            this.fire('finishedLoading');
        }

        _getFocused() {
            const stateConvert = this.state.replace('Active.', '');
            if(this.tag(stateConvert)) {
                return this.tag(stateConvert)
            }
            return this
        }

        static _states() {
            return {
                _init() {
                    this.showSynopsisAnimation = this.animation({duration: 0.375, stopMethod: 'reverse', actions: [
                            {t: 'Grid', p: 'alpha', v: {0: 1, 1: 0}},
                            {t: 'Grid', p: 'y', v: {0: 230, 1: 600}}
                        ]});
                },
                _handleUp() {
                    //block handleUp from bubbling to app
                },
                _handleLeft() {
                    //block handleLeft from bubbling to app
                },
                loadView({toLoad: {persist: {targetId, useTarget = false}}}) {
                    this.fire('loading');
                    this.mediaAvailable = false;
                    if(!useTarget) {
                        this.api.getShowPage(targetId)
                            .then((response) => {
                                this.update(response);
                            });
                    }
                    else {
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
                    _enter() {
                        const animation = this.animation({
                            duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]
                        });
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({
                            duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]
                        });
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        if(!this.tag('Grid').length) {
                            return 'Active.BackButton'
                        }
                        return 'Active.Grid'
                    }
                },
                Idle: {},
                Active: {
                    BackButton: {
                        _handleDown() {
                            if(!this.tag('Synopsis').moreTextLines) {
                                return 'Active.Grid'
                            }
                            return 'Active.Synopsis'
                        },
                        _handleEnter(){
                            this.signal('previousView');
                        }
                    },
                    Synopsis: {
                        showSynopsisAnimation() {
                            this.showSynopsisAnimation.start();
                        },
                        hideSynopsisAnimation() {
                            this.showSynopsisAnimation.stop();
                        },
                        _handleUp: 'Active.BackButton',
                        _handleDown() {
                            if(this.tag('Grid').length) {
                                return 'Active.Grid'
                            }
                        }
                    },
                    Grid: {
                        _exit() {
                            this.patch({
                                Grid: {smooth: {y: this.tag('Synopsis').length > 0 ? 230 : 0}},
                                Shadow: {smooth: {alpha: 0}},
                                Synopsis: {smooth: {alpha: 1}}
                            });
                        },
                        _handleUp() {
                            if(!this.tag('Synopsis').moreTextLines) {
                                return 'Active.BackButton'
                            }
                            return 'Active.Synopsis'
                        },
                        rowIndexChanged(e) {
                            if(e.row === 1 && e.previousRow === 0) {
                                this.patch({
                                    Grid: {smooth: {y: 0}},
                                    Shadow: {smooth: {alpha: 1}},
                                    Synopsis: {smooth: {alpha: 0}}
                                });
                            }
                        },
                        _handleEnter() {
                            const item = this.tag('Grid').item.item;

                            switch(item.type) {
                                case 'live':
                                    this.signal('switchView', {view: 'ComingSoon', persist: {type: 'live'}, ignore:true});
                                    break
                                default:
                                    this.signal('switchView', {view: 'Player', persist: {targetId: item.links.target.id}, ignore: true});
                                    break
                            }
                        }
                    }
                }
            }
        }
    }

    class SettingItem extends lng.Component {
        static _template() {
            return {h: 86,
                Wrapper: { w: 1500, h: 86,
                    Setting: {
                        Background: {alpha: 0, w: 1500, h: 86, rect: true},
                        Label: {x: 25, y: 17, w: 1250, text: {text: 'Setting', fontSize: 36, maxLines: 1, lineHeight: 50, fontFace: 'TheSansB4', textAlign: 'left'}}
                    },
                    BorderTop: {y: -1, w: 1500, h: 2, rect: true},
                    Toggle: {mountX: 1, x: 1475, y: 17, color: 0xffe7e7e7, texture: lng.Tools.getRoundRect(105, 50, 25, 0, 0xffffffff, true, 0xffffffff),
                        Circle: {texture: lng.Tools.getRoundRect(50, 50, 25, 0, 0xffffffff, true, 0xffffffff)}
                    },
                    BorderBottom: {y: 85, w: 1500, h: 2, rect: true}
                }
            }
        }

        set on(v) {
            this._on = v;
            let toggleColor = 0xffe7e7e7;

            if(this.on && this.hasFocus()) {
                toggleColor = 0xff179139;
            }
            else if(this.on) {
                toggleColor = this._fc.focus;
            }
            this.tag('Toggle').patch({
                smooth: {color: toggleColor},
                Circle: {smooth: {x: this.on ? 55 : 0}}
            });
        }

        get on() {
            return this._on
        }

        set theme({focus, text, textFocus}) {
            this.patch({
                Wrapper: {
                    Setting: {
                        Background: {color: focus},
                        Label: {color: text}
                    },
                    BorderTop: {color: text},
                    Toggle: {
                        Circle: {color: text}
                    },
                    BorderBottom: {color: text},
                }
            });
            this._fc = {
                focus: focus,
                text: text,
                textFocus: textFocus
            };
        }

        static _states() {
            return {
                _init() {
                    this.patch({
                        Wrapper: {
                            Setting: {
                                Label: {text: {text: this.item.setting}}
                            }
                        }
                    });
                },
                _focus() {
                    this.tag('Wrapper').patch({
                        Setting: {
                            Background: {smooth:{alpha: 1}},
                            Label: {color: this._fc.textFocus}
                        },
                        Toggle: {smooth: {color: this.on ? 0xff179139 : 0xffe7e7e7}}
                    });
                },
                _unfocus() {
                    this.tag('Wrapper').patch({
                        Setting: {
                            Background: {smooth:{alpha: 0}},
                            Label: {color: this._fc.text}
                        },
                        Toggle: {smooth: {color: this.on ? this._fc.focus : 0xffe7e7e7}}
                    });
                },
                _handleEnter() {
                    this.on = !this._on;
                    return false
                }
            }
        }
    }

    class SettingsPage extends lng.Component {
        static _template() {
            return {alpha: 0,
                Settings: {type: InfoCollection, label: 'MEDIENWIEDERGABE', x: 210, y: 180},
                Version: {alpha: 0.7, mount: 1, x: 1830, y: 990, text: {text: `AppVersion: ${AppDefinition.versionNumber}`, fontSize: 20}},
            }
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        set theme(theme) {
            this.patch({
                Settings: {theme},
                Version: {color: theme.text}
            });
            this._theme = theme;
        }

        _getFocused() {
            if(this.state === 'Active') {
                return this.tag('Settings')
            }
        }

        static _states() {
            return {
                loadView() {
                    this.tag('Settings').items = [{type: SettingItem, setting: 'subtitles', theme: this._theme, item: {setting: 'Untertitel anzeigen, falls vorhanden?'}, on: this.api.getSubtitlesOn()}];
                    return 'Show'
                },
                hideView: 'Hide',
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return 'Active'
                    }
                },
                Idle: {

                },
                Active: {
                    _handleUp() {
                        this.signal('outOfBounds', {direction: 'up'});
                    },
                    _handleEnter(e) {
                        const item = this.tag('Settings').item;
                        if(item.setting === 'subtitles') {
                            this.api.setSubtitlesOn(item.on);
                        }
                    }
                }
            }
        }
    }

    class Splash extends lng.Component {
        static _template() {
            return {
                Image: {w: 1920, h: 1080, src: AppDefinition.getPath('images/ardSplashScreen.png')},
                Version: {alpha: 0.7, mount: 1, x: 1830, y: 990, text: {text: `AppVersion: ${AppDefinition.versionNumber}`, fontSize: 20}},
                Loader: {y: 900, type: Loader}
            }
        }

        get api() {
            return this.cparent.cparent.cparent.api
        }

        _getFocused() {
            return this
        }

        static _states() {
            return {
                _init() {
                    return 'Active'
                },
                _focus() {
                    this.tag('Loader').show(1);
                    this.api.getMainPageData('ard')
                        .then((response) => {
                            if(response) {
                                this.signal('switchView', {view: 'MainPage', persist: {data: response, type: 'alle'}});
                            }
                        });
                },
                hideView: 'Hide',
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, delay: 1, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    },
                    viewHidden() {
                        this.signal('viewHidden');
                        return 'Idle'
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    },
                    viewVisible() {
                        this.signal('viewVisible');
                        return 'Active'
                    }
                },
                Idle: {
                    loadView: 'Show'
                },
                Active: {
                }
            }
        }
    }

    class ErrorMessage extends lng.Component {
        static _template() {
            return {
                alpha: 0, mount: 0.5, w: 750, h: 350, y: 340, x: 960, transitions: {alpha: {duration: 0.3}, y: {duration: 0.5}},
                Shadow: {alpha: 1, mount: 0.5, x: 375, y: 180, color: 0xff000000, texture: lng.Tools.getShadowRect(800, 400, 0, 60, 60)},
                Background: {w: 750, h: 350, rect: true, color: 0xff0000ff,
                    Icon: {mountX: 0.5, x: 375, y: -18, rotation: Math.PI, type: IconItem, icon: {src: 'icons/player/info.svg', w: 140, h: 140}},
                    Message: {w: 700, mount: 0.5, x: 375, y: 175, text: {text: 'Keine Verbindung mit dem Server möglich - Bitte versuchen Sie es später erneut.', maxLines: 3, fontSize: 42, fontFace: 'TheSansB4', textAlign: 'center'}},
                    BackButton: {h: 68, mountX: 1, x: 365, y: 270, w: 320, type: SimpleButton, item: {label: 'Zurück'}},
                    ExitButton: {h: 68, x: 385, y: 270, w: 320, type: SimpleButton, item: {label: 'App schließen'}}
                }
            }
        }

        set theme(theme) {
            this.patch({
                Shadow: {color: theme.globalShadow},
                Background: {
                    color: 0xffffffff,
                    Icon: {color: 0xff000000},
                    Message: {color: 0xff000000},
                    BackButton: {theme: {text: 0xff000000, textFocus: 0xffffffff, focus: 0xff001a4b}},
                    ExitButton: {theme: {text: 0xff000000, textFocus: 0xffffffff, focus: 0xff001a4b}}
                }
            });
        }

        show(message, state) {
            if(state === 'Splash') {
                this.patch({
                    smooth: {alpha: 1, y: 540},
                    Background: {
                        Message: {text: {text: message}},
                        BackButton: {alpha: 0},
                        ExitButton: {alpha: 1, mountX: 0.5, x: 375}
                    }
                });
                this.fire('focusButton', {value: 'ExitButton'});
            }
            else {
                this.patch({
                    smooth: {alpha: 1, y: 540},
                    Background: {
                        Message: {text: {text: message}},
                        BackButton: {alpha: 1},
                        ExitButton: {alpha: 1, mountX: 0, x: 385}
                    }
                });
                this.fire('focusButton', {value: 'BackButton'});
            }
        }

        hide() {
            this.patch({
                smooth: {alpha: 0, y: 340}
            });
        }

        _getFocused() {
            return this.tag(this.state)
        }

        static _states() {
            return {
                _init() {
                    return 'BackButton'
                },
                _handleUp() {

                },
                _handleDown() {

                },
                focusButton(e) {
                    return e.value
                },
                BackButton: {
                    _handleLeft() {

                    },
                    _handleRight: 'ExitButton',
                    _handleEnter() {
                        this.signal('retry');
                    }
                },
                ExitButton: {
                    _handleLeft: 'BackButton',
                    _handleRight() {

                    },
                    _handleEnter() {
                        window.close();
                    }
                }
            }
        }
    }

    class ComingSoon extends lng.Component {
        static _template() {
            return { alpha: 0,
                PageTitle: {mountX: 0.5, x: 960, y: 200, text: {text: 'Live', fontSize: 50, fontFace: 'TheSansB6', textAlign: 'center'}},
                ComingSoon: {type: SimpleButton, mountX: 0.5, x: 960, y: 285, h: 74, item: {label: 'COMING SOON', fontSize: 35}},
                CircleBorder: {mountX: 0.5, x: 960, y: 403, texture: lng.Tools.getRoundRect(580, 580, 580/2, 0, 0xffffffff, true, 0xffffffff)},
                PreviewFrame: {mountX: 0.5, x: 960, y: 420, w: 550, h: 550, renderToTexture: true,
                    Circle: {shader: {type: lng.shaders.RadialFilter, radius: 275, renderToTexture: true},
                        Image: {w: 550, h: 550, src: AppDefinition.getPath('images/live-comingsoon.png')}
                    }
                }
            }
        }

        set theme(theme) {
            const {focus, text} = theme;
            this.patch({
                PageTitle: {color: text},
                ComingSoon: {theme},
                CircleBorder: {color: focus}
            });
        }

        _getFocused() {
            return this.tag('ComingSoon')
        }

        static _states() {
            return {
                loadView({toLoad: {persist: {type}}}) {
                    this.patch({
                        PageTitle: {text: {text: type === 'programm' ? 'Sendung verpasst' : 'LIVE TV'}},
                        PreviewFrame: {
                            Circle: {
                                Image: {src: AppDefinition.getPath(`images/${type}-comingsoon.png`)}
                            }
                        }
                    });
                    return 'Show'
                },
                viewVisible() {
                    this.signal('viewVisible');
                    return 'Active.ComingSoon'
                },
                viewHidden() {
                    this.signal('viewHidden');
                    return 'Idle'
                },
                hideView: 'Hide',
                Hide: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 1, 1: 0}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewHidden');
                        });
                        animation.start();
                    }
                },
                Show: {
                    _enter() {
                        const animation = this.animation({duration: 0.25, stopMethod: 'immediate', actions: [
                                {p: 'alpha', v: {0: 0, 1: 1}}
                            ]});
                        animation.on('finish', () => {
                            this.fire('viewVisible');
                        });
                        animation.start();
                    }
                },
                Idle: {
                },
                Active: {
                    ComingSoon: {
                    }
                }
            }
        }
    }

    class App extends ux.App {
        static getFonts() {
            return [
                {family: 'TheSansB4', url: AppDefinition.getPath('fonts/TheSans-b4.otf'), descriptors: {}},
                {family: 'TheSansB6', url: AppDefinition.getPath('fonts/TheSans-b4.otf'), descriptors: {}}
            ]
        }

        static _template() {
            return {
                Background: {w: 1920, h: 1080, rect: true, color: 0xff171717},
                BackgroundImage: {w: 1920, h: 1080},
                Wrapper: {zIndex: 2, w: 1920, h: 1080, type: lng.components.FastBlurComponent, signals: {previousView: true, changeTheme: true, showMenu: true, outOfBounds: true, switchView: true, viewHidden: true, viewVisible: true, hideToolbar: true, showToolbar: true}, amount: 0, content: {
                    Loader: {y: 540, type: Loader},
                    Splash: {
                        type: Splash,
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
                        requiresToolbar: false,
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
                }},
                Menu: {type: Menu, zIndex: 10, signals: {switchView: true}},
                Player: {
                    type: Player,
                    requiresLoading: true,
                    requiresToolbar: false,
                    signals: {viewHidden: true, viewVisible: true, showBackground: true, hideBackground: true, previousView: true, switchView: true}
                },
                ErrorMessage: { zIndex: 20,
                    type: ErrorMessage,
                    signals: {retry: true}
                }
            }
        }

        set api(v) {
            this._api = v;
        }

        get api() {
            return this._api
        }

        get currentView() {
            return this.viewManager.current
        }

        _getFocused(){
            return this.selectElement(this.state) || this
        }

        _setFocusSettings(settings) {
            if (this.state === "Player") {
                settings.mediaplayer.consumer = this.tag("Player");
            }
        }

        blur() {
            this.tag('Wrapper').setSmooth('amount', 1.5, {duration: 0.5, delay: 0.6});
        }

        unblur() {
            const wrapper = this.tag('Wrapper');
            if(wrapper.transition('amount').isRunning()) {
                wrapper.transition('amount').stop();
            }
            this.tag('Wrapper').amount = 0;
        }

        selectElement(target) {
            return this.tag('Wrapper').content.tag(target) || this.tag(target)
        }

        update(theme) {
            this._hasBackgroundImage = !!theme.backgroundImage;
            this.patch({
                Background: {smooth: {color: theme.background}},
                BackgroundImage: {smooth: {alpha: !!theme.backgroundImage}, src: theme.backgroundImage && AppDefinition.getPath(theme.backgroundImage)},
                Wrapper: { content: {
                        Loader: {theme},
                        MainPage: {theme},
                        GlossaryPage: {theme},
                        SearchPage: {theme},
                        ImpressumPage: {theme},
                        DataProtectionPage: {theme},
                        InfoPage: {theme},
                        FAQPage: {theme},
                        ShowPage: {theme},
                        SettingsPage: {theme},
                        ComingSoon: {theme},
                        Toolbar: {theme}
                    }},
                Menu: {theme},
                ErrorMessage: {theme}
            });
        }

        static _states() {
            return {
                _construct() {
                    this._api = new API();
                },
                _init() {
                    this.viewManager = new ViewManager();
                    this.themeManager = new ThemeManager();

                    this.viewManager.current = {view: 'Splash', ignore: true};

                    this.themeManager.on('themeChanged', (theme) => {
                        this.update(theme);
                    });

                    this.api.on('error', (e) => {
                        this.fire('showErrorMessage', e, this.state);
                    });

                    this.themeManager.currentProfile = 'alle';
                    return 'Splash'
                },
                showErrorMessage(e) {
                    this.tag('ErrorMessage').show(e.value, this.state);
                    this.blur();
                    return 'ErrorMessage'
                },
                hideToolbar() {
                    this.selectElement('Toolbar').hide();
                },
                showToolbar() {
                    this.selectElement('Toolbar').show();
                },
                showBackground() {
                    this.patch({
                        Background: {smooth: {alpha: 1}},
                        BackgroundImage: {smooth: {alpha: this._hasBackgroundImage}}
                    });
                },
                hideBackground() {
                    this.patch({
                        Background: {smooth: {alpha: 0}},
                        BackgroundImage: {smooth: {alpha: 0}}
                    });
                },
                themeLoaded() {
                    return 'Toolbar'
                },
                changeTheme(e) {
                    // if(this.themeManager.currentProfile !== e.value) {
                        this.themeManager.currentProfile = e.value;
                    // }
                },
                _handleUp() {
                    return 'Toolbar'
                },
                _handleLeft() {
                    return 'Menu'
                },
                _handleBack() {
                    return this.fire('previousView')
                },
                showMenu() {
                    return 'Menu'
                },
                outOfBounds(e){
                    if(e.direction === 'up' || e.direction === 'left'){
                        return 'Toolbar'
                    }
                    return 'MainPage'
                },
                switchView(e) {
                    // if(this.state === 'ErrorMessage') {
                    //     return
                    // }
                    const {persist = false, view = false} = e;
                    const {persist:cPersist = false, view:cView = false} = this.viewManager.current;
                    if(view === cView && persist && persist.type && cPersist && cPersist.type && cPersist.type === persist.type){
                        return this.viewManager.currentView
                    }
                    this.viewManager.toLoad = e;
                    return 'SwitchingView'
                },
                previousView() {
                    const pv = this.viewManager.previousView;
                    if(pv !== 'exit') {
                        this.fire('switchView', pv);
                    }
                    else {
                        return false
                    }
                },
                SwitchingView: {
                    _captureKey() {

                    },
                    _enter() {
                        const target = this.selectElement(this.viewManager.currentView);
                        this.selectElement('Toolbar').hide();

                        target.fire('hideView');
                    },
                    viewHidden() {
                        const vm = this.viewManager;
                        const target = this.selectElement(vm.loadView);
                        if(!vm.previous && target.requiresLoading) {
                            this.selectElement('Loader').show();
                        }

                        target.fire('loadView', {isPreviousView: vm.previous, toLoad: vm.toLoad});
                    },
                    viewVisible() {
                        const vm = this.viewManager;
                        const toolbar = this.selectElement('Toolbar');
                        const targetView = this.selectElement(vm.loadView);
                        this.selectElement('Loader').hide();
                        if(targetView.requiresToolbar && !targetView.hasToolbarHidden) {
                            toolbar.show();
                        }
                        else {
                            toolbar.hide();
                        }
                        return this.viewManager.viewSwitched()
                    }
                },
                Splash: {
                    _captureKey() {

                    },
                    _enter() {
                    }
                },
                Toolbar: {
                    _handleDown() {
                        return this.viewManager.currentView
                    }
                },
                Menu: {
                    _handleBack() {
                        this.fire('_handleRight');
                    },
                    _enter() {
                        this.tag('Menu').show();
                        this.blur();
                    },
                    _exit() {
                        this.tag('Menu').hide();
                        this.unblur();
                    },
                    _handleRight() {
                        return this.viewManager.currentView
                    }
                },
                MainPage: {
                    _enter() {
                        this.selectElement('SearchPage').reset();
                        this.viewManager.clearHistory();
                    }
                },
                GlossaryPage: {
                    _enter() {
                        this.selectElement('SearchPage').reset();
                    }
                },
                ShowPage: {

                },
                SearchPage: {

                },
                ImpressumPage: {
                    _enter() {
                        this.selectElement('SearchPage').reset();
                    }
                },
                DataProtectionPage: {
                    _enter() {
                        this.selectElement('SearchPage').reset();
                    }
                },
                FAQPage: {},
                SettingsPage: {},
                ComingSoon: {},
                ErrorMessage: {
                    retry() {
                        this.unblur();
                        this.tag('ErrorMessage').hide();
                        this.viewManager.viewSwitched();
                        this.fire('previousView');
                    }
                },
                Player: {
                    _enter() {
                    }
                }
            }
        }
    }

    class AppDefinition extends ux.AppDefinition {

        constructor(application) {
            super(application);
            this.application = application;
        }

        static get identifier() {
            return "com.metrological.app.ARD";
        }

        static get versionNumber() {
            return "1.0.4";
        }

        getAppViewType() {
            return App;
        }

    }

    return AppDefinition;

}());
