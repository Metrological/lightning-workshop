export default class Page extends lng.Component {

    get title() {
        return "unknown";
    }

    get index() {
        return this.cparent.childList.indexOf(this);
    }

    get liveEditOptions() {
        return undefined;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    _init() {
        this.visible = false;
    }

}