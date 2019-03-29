var com_metrological_app_Example = (function () {
    'use strict';

    class App extends ux.App {

        static getFonts() {
            return [{family: 'Lobster', url: AppDefinition.getPath('fonts/Lobster-Regular.ttf'), descriptors: {}}]
        }

        static _template() {
            return {
                Bg: {
                    src: AppDefinition.getPath("img/rockies.jpeg"), scale: 1,
                },
                Text: {
                    y: 100, text: {text: "Hello world", fontFace: 'Lobster', fontSize: 50}
                },
                Primary: {
                    Main: {rect: true, renderToTexture: true, w: 900, h: 900, colorLeft: 0x000000FF, colorRight: 0xFF0000FF
                    },
                    App: {alpha: 0.5, rect: true, w: 100, h: 100, scale: 1, texture: {type: lng.textures.NoiseTexture, x: 0, y: 0, w: 1000, h: 1000}}
                },
                Overlay: {}
            };
        }

        _handleLeft() {
            this.tag('Primary').setSmooth('x', this.tag('Primary').getSmooth('x') - 100);
        }

        _handleRight() {
            this.tag('Primary').setSmooth('x', this.tag('Primary').getSmooth('x') + 100);
        }

        _handleUp() {
            this.tag('Primary').setSmooth('y', this.tag('Primary').getSmooth('y') - 100);
        }

        _handleDown() {
            this.tag('Primary').setSmooth('y', this.tag('Primary').getSmooth('y') + 100);
        }

        _setFocusSettings(settings) {
            settings.mediaplayer.consumer = this;
        }

        getMediaplayerSettings() {
            return {
                stream: {
                    src: "http://video.metrological.com/boat.mp4"
                }
            };
        }

    }

    class AppDefinition extends ux.AppDefinition {

        static get identifier() {
            return "com.metrological.app.Example";
        }

        getAppViewType() {
            return App;
        }

    }

    return AppDefinition;

}());
