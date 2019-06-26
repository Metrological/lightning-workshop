import FrontPage from "./pages/front/FrontPage.js";
import Introduction from "./pages/Introduction.js";
import HTML from "./pages/HTML.js";
import GettingStarted from "./pages/GettingStarted.js";
import Textures from "./pages/renderEngine/Textures.js";
import StatesPlayer from "./pages/live/StatesPlayer.js";
import Step1 from "./pages/steps/Step1.js";
import Step2 from "./pages/steps/Step2.js";
import Step3 from "./pages/steps/Step3.js";
import Step4 from "./pages/steps/Step4.js";
import Step5 from "./pages/steps/Step5.js";
import Step6 from "./pages/steps/Step6.js";
import Step7 from "./pages/steps/Step7.js";
import Step8 from "./pages/steps/Step8.js";

export default class Content extends lng.Component {

    static _template() {
        return {
            Header: {
                zIndex: 1,
                w: 1920, h: 120, rect: true, color: 0xAA000000,
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
            {type: Introduction},
            {type: HTML},
            {type: GettingStarted},
            {type: Textures},
            {type: StatesPlayer},
            {type: Step1},
            {type: Step2},
            {type: Step3},
            {type: Step4},
            {type: Step5},
            {type: Step6},
            {type: Step7},
            {type: Step8}

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