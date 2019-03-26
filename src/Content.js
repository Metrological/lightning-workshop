import FrontPage from "./pages/front/FrontPage.js";
import RenderEngine from "./pages/renderEngine/RenderEngine.js";
import Introduction from "./pages/Introduction.js";
import DemoApps from "./pages/DemoApps.js";

import Positioning from "./pages/renderEngine/Positioning.js";
import Transforms from "./pages/renderEngine/Transforms.js";
import Rendering from "./pages/renderEngine/Rendering.js";

export default class Content extends lng.Component {

    static _template() {
        return {
            Header: {
                w: 1920, h: 120,
                Title: {
                    x: 50, y: 30, text: {fontSize: 60, text: ""}
                },
                PageIndex: {
                    x: w => w - 50,
                    y: 40,
                    mountX: 1,
                    flex: {},
                    Current: {
                        text: {fontSize: 42, text: ""}
                    },
                    Divider: {
                        flexItem: {marginLeft: 10, marginRight: 10},
                        text: {fontSize: 42, text: "/"}
                    },
                    Total: {
                        text: {fontSize: 42, text: ""}
                    }
                },
                Border: {
                    rect: true, color: 0xFFAAAAAA, h: 3, w: w=>w, y: h=>h, mountY: 1
                }
            },
            Pages: {
                y: 120, h: 980, w: 1920
            }
        }
    }

    _setup() {
        this.tag("Pages").children = [
            {type: FrontPage},
            {type: DemoApps},
            {type: Introduction},
            {type: Positioning},
            {type: Transforms},
            {type: Rendering},
            {type: RenderEngine},
        ];
        this._index = -1;

        this.tag("PageIndex.Total").text.text = this._pages.length;
    }

    get _pages() {
        return this.tag("Pages").children;
    }

    get activePage() {
        return this._index >= 0 ? this.tag("Pages").childList.getAt(this._index) : undefined;
    }

    _setPageIndex(index) {
        if (this.activePage) {
            this.activePage.hide();
        }
        this._index = index;
        this.activePage.show();
        this._updateHeader();
    }

    _updateHeader() {
        const page = this.activePage;
        this.tag("Title").text.text = page.title;
        this.tag("PageIndex.Current").text.text = "" + (this._index + 1);
    }

    _init() {
        this._setPageIndex(0);
    }

    _getFocused() {
        return this.activePage;
    }

    _handleDown() {
        const page = this.activePage;
        const liveEditOptions = page.liveEditOptions;
        if (liveEditOptions) {
            this.signal("liveEdit", liveEditOptions)
        }
    }

    _handleLeft() {
        if (this._index > 0) {
            this._setPageIndex(this._index - 1);
        }
    }

    _handleRight() {
        if (this._index < this._pages.length - 1) {
            this._setPageIndex(this._index + 1);
        }
    }

    $nextPage() {
        this._handleRight();
    }
}