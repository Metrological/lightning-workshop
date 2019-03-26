export default class AppIframe extends lng.Component {

    _construct() {
        this._appIframe = document.createElement('iframe');
        this._appIframe.style.display = 'none';
        this._appIframe.style.position = 'absolute';
        this._appIframe.style.left = '0';
        this._appIframe.style.top = '0';
        this._appIframe.style.width = '1920px';
        this._appIframe.style.height = '1080px';
        this._appIframe.style.zIndex = '100000';
        this._appIframe.style.border = '0';

        this._listener = (event) => {
            if (event.keyCode === 27 || event.keyCode === 36) {
                this.signal('close');
            }
        };
    }

    startApp(identifier) {
        this._appIframe.setAttribute('src', './apps/' + identifier + '/index.html?transparentBg=1&memoryPressure=32000000');
        this._appIframe.style.display = 'block';
        this.stage.getCanvas().style.display = 'none';
        document.body.appendChild(this._appIframe);
        this._appIframe.focus();
        this._appIframe.contentWindow.addEventListener('keydown', this._listener);
    }

    close() {
        this._appIframe.blur();
        this._appIframe.contentWindow.removeEventListener('keydown', this._listener);
        this._appIframe.setAttribute('src', null);
        this._appIframe.style.display = 'none';
        this.stage.getCanvas().style.display = 'block';
        document.getElementById("output").focus();
        document.body.removeChild(this._appIframe);
    }

}