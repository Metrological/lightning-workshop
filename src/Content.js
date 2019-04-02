import FrontPage from "./pages/front/FrontPage.js";
import RenderEngine from "./pages/renderEngine/RenderEngine.js";
import Introduction from "./pages/Introduction.js";
import HTML from "./pages/HTML.js";
import GettingStarted from "./pages/GettingStarted.js";
import DemoApps from "./pages/DemoApps.js";

import Positioning from "./pages/renderEngine/Positioning.js";
import PositioningProps from "./pages/renderEngine/PositioningProps.js";
import TransformsProps from "./pages/renderEngine/TransformsProps.js";
import RenderingProps from "./pages/renderEngine/RenderingProps.js";
import Transforms from "./pages/renderEngine/Transforms.js";
import Rendering from "./pages/renderEngine/Rendering.js";
import Textures from "./pages/renderEngine/Textures.js";
import Flexbox from "./pages/renderEngine/Flexbox.js";
import Planning from "./pages/Planning.js";

import LiveCoding from "./pages/live/LiveCoding.js";
import Components from "./pages/live/Components.js";
import States from "./pages/live/States.js";
import Navigation from "./pages/live/Navigation.js";
import LifeCycleHooks from "./pages/live/LifeCycleHooks.js";
import Signals from "./pages/live/Signals.js";
import Transitions from "./pages/animations/Transitions.js";
import Animations from "./pages/animations/Animations.js";

import Status from "./pages/Status.js";

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
            {type: Planning},
            {type: RenderEngine},
            {type: Positioning},
            {type: PositioningProps},
            {type: Transforms},
            {type: TransformsProps},
            {type: Rendering},
            {type: RenderingProps},
            {type: Textures},
            {type: Flexbox},
            {type: LiveCoding},
            {type: Components},
            {type: LifeCycleHooks},
            {type: States},
            {type: Navigation},
            {type: Signals},
            {type: Transitions},
            {type: Animations},
            {type: DemoApps},
            {type: Status},
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