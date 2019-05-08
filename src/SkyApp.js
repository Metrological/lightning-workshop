import SkyGradientShader from "./live/ui/shaders/SkyGradientShader.js";

export default class App extends ux.App {

    static getFonts() {
        return [
        ]
    }

    static _template() {
        return {
            Background:{
                src: "./live/ui/gradient-background.png"
            },
            MainContent:{ alpha: 0,
                MainSlider:{
                    type: MainSlider, x: 100, y: 150
                }
            },
            SubContent:{
                x:50,
                Metadata:{
                    type: Metadata, alpha:0, transitions:{alpha:{duration:0.4,delay:0}}
                },
                Menu:{
                    type: Menu, alpha:0.4, y:750
                },
                Sliders:{
                    y:750, x:400,
                    Movies:{
                        type: Slider, alpha:0.6
                    },
                    Series:{
                        type: Slider, alpha:0.6, y:400, random: true
                    }
                }
            },
            Loader:{
                type: Loader, signals:{loadingReady: true}, alpha: 0
            },
            UserStatus:{
                type: UserStatus, x:100, y:50
            }
        };
    }

    _construct(){
        this._api = new Api();
    }

    _init(){
        this._setState("Loading");
        this._api.getActive().then((response)=>{
            setTimeout(()=>{
                this.loadingReady(response);
            },3000);
        })
    }

    $api(){
        return this._api;
    }

    static _states(){
        return [
            class Loading extends this{
                $enter(){
                    this.tag("Loader").setSmooth("alpha",1);
                }
                $exit(){
                    this.tag("Loader").setSmooth("alpha",0);
                }
                loadingReady(items){
                    this.tag("MainSlider").data = items;
                    this._setState("MainContent");
                }
            },
            class MainContent extends this{
                $enter(){
                    this.tag("MainContent").setSmooth("alpha",1);
                    this.tag("MainContent").setSmooth("y",0);
                    // this.tag("MainContent").patch({
                    //     smooth:{alpha:1, y:0}
                    // })
                }
                $exit(){
                    this.tag("MainContent").setSmooth("alpha",0);
                    this.tag("MainContent").setSmooth("y", -650);
                    // this.tag("MainContent").patch({
                    //     smooth:{alpha:0, y:-580}
                    // })
                }
                _getFocused(){
                    return this.tag("MainSlider");
                }
                $onItemSelect({item}){
                    // do something with selected item
                }
                _handleDown(){
                    this._setState("SubContent.Menu");
                }
            },
            class SubContent extends this{
                $enter(){
                    this.tag("SubContent").patch({
                        Metadata:{
                            smooth:{alpha:[1,{duration:0.5,delay:0}]}
                        },
                        Menu:{
                            smooth:{y:550, alpha:1}
                        },
                        Sliders:{
                            smooth:{y:550, alpha:1}
                        }
                    });
                }
                $exit(){
                    this.tag("SubContent").patch({
                        Metadata:{
                            smooth:{alpha:[0,{duration:0.2,delay:0}]}
                        },
                        Menu:{
                            smooth:{y:750, alpha:0.4}
                        },
                        Sliders:{
                            smooth:{y:750, alpha:0.4}
                        }
                    });
                }
                _handleUp(){
                    this._setState("MainContent");
                }
                static _states(){
                    return [
                        class Menu extends this{
                            $enter(){

                            }
                            _handleRight(){
                                this._setState("SubContent.Sliders")
                            }
                            _getFocused(){
                                return this.tag("Menu");
                            }
                        },
                        class Sliders extends this{
                            $enter(){
                                this.tag("Menu").setSmooth("x",-400);
                                this.tag("Sliders").setSmooth("x",50);
                            }
                            $exit(){
                                this.tag("Menu").setSmooth("x",0);
                                this.tag("Sliders").setSmooth("x",400);
                            }
                            _handleLeft(){
                                this._setState("SubContent.Menu");
                            }
                            _getFocused(){
                                return this.tag("Movies");
                            }
                        }
                    ]
                }
            }
        ]
    }
}

class Metadata extends lng.Component{
    static _template(){
        return {
            Poster:{
                src: "./live/ui/gs-backdrop.png", mountX: 1, x:1920
            }
        }
    }
}

class Slider extends lng.Component{
    static _template(){
        return {
            Title:{

            },
            Items:{
                flex:{direction:"row", padding:30},
                transitions:{y:{duration:0.2,delay:0}}
            }
        }
    }

    _construct(){
        this._index = 0;
    }

    _init(){
        this._setState("Loading");
    }

    set random(v){
        this._random = !!v;
    }

    get items(){
        return this.tag("Items").children;
    }

    get active(){
        return this.items[this._index];
    }

    _populate(data){
        if(this._random){
            data = data.sort(()=>Math.random()-0.5);
        }
        this.tag("Items").children = data.map((item)=>{
            return {type: SliderItem, item}
        })
    }

    _handleLeft(){
        if(this._index > 0){
            this._setIndex(this._index-1);
        }else{
            return false;
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._setIndex(this._index+1);
        }
    }

    _getFocused(){
        return this.active;
    }

    _setIndex(index){
        this._index = index;
        this.patch({
            Clipper:{
                Items:{
                    smooth:{y: index*-90}
                }
            }
        })
    }

    static _states(){
        return [
            class Loading extends this {
                $enter(){
                    const api = this.fireAncestors("$api");
                    api.getMovies().then((data)=>{
                        this.ready(data)
                    });
                }
                ready(data){
                    this._populate(data);
                }
            }
        ]
    }
}

class SliderItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 285, h: 380, scale:0.9,
            transitions:{scale:{duration:0.3, delay:0.05}}

        }
    }

    set item(v){
        this._item = v;
        this.patch({
            src:`./live/ui/${v.poster}`
        });
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1);
    }

    _unfocus(){
        this.setSmooth("scale",0.9);
    }

    static _states(){
        return [

        ]
    }
}

class Menu extends lng.Component{
    static _template(){
        return {
            Clipper:{
                clipping: true, h: 580, w: 600,
                Items:{
                    flex:{direction:"column", padding:30}, x:20,
                    transitions:{y:{duration:0.2,delay:0}}
                }
            },
            FocusIndicator:{
                src: "./live/ui/menu-focus.png", w:370, h:140
            }
        }
    }

    _construct(){
        this._index = 0;
    }

    _init(){
        this._setState("Loading");
    }

    get items(){
        return this.tag("Items").children;
    }

    get active(){
        return this.items[this._index];
    }

    _populate(data){
        this.tag("Items").children = data.map((item)=>{
            return {type: MenuItem, item}
        });
    }

    _handleUp(){
        if(this._index > 0){
            this._setIndex(this._index-1);
        }else{
            return false;
        }
    }

    _handleDown(){
        if(this._index < this.items.length - 1){
            this._setIndex(this._index+1);
        }
    }

    _getFocused(){
        return this.active;
    }

    _setIndex(index){
        this._index = index;
        this.patch({
            Clipper:{
                Items:{
                    smooth:{y: index*-90}
                }
            }
        });
    }

    static _states(){
        return [
            class Loading extends this {
                $enter(){
                    const api = this.fireAncestors("$api");
                    api.getMenuItems().then((data)=>{
                        this.ready(data)
                    });
                }
                ready(data){
                    this._populate(data);
                }
            }
        ]
    }
}

class MenuItem extends lng.Component{
    static _template(){
        return {
            flexItem:{margin:15},
            text:{text:"item", fontSize:40}
        }
    }

    _focus(){
        this.patch({
            smooth:{scale:1.15,x:10}
        });
    }

    _unfocus(){
        this.patch({
            smooth:{scale:1,x:0}
        });
    }

    set item(v){
        this._item = v;
        this.text.text = v.label;
    }

}

class UserStatus extends lng.Component{
    static _template(){
        return {
            Time:{
                text:{text:""}
            },
            Date:{

            }
        }
    }

    _init(){
        this._intervalId = setInterval(()=>this._updateTime(), 900)
        this._updateTime();
    }

    _padZero(v){
        if(parseInt(v) > 9){
            return v;
        }else{
            return `0${v}`;
        }
    }


    _updateTime(){
        const date = new Date();
        this.tag("Time").patch({
            text:{text:`${this._padZero(date.getHours())}:${this._padZero(date.getMinutes())}:${this._padZero(date.getSeconds())}`}
        })
    }

    static _states(){
        return [
            class Expanded extends this{

            },
            class Collapsed extends this{

            }
        ]
    }
}

class Loader extends lng.Component{
    static _template(){
        return {
            Shader: {
                color: 0xffbf40a1,
                transitions: {color: {duration: 5}},
                shader: {
                    banding: 0,
                    type: SkyGradientShader,
                    color1: 0xff66034f,
                    color2: 0xfffcbced,
                    graining: 0
                },
                texture: {
                    type: lng.textures.NoiseTexture
                }, w: 1920, h: 1080
            },
            Logo:{
                src: "./live/ui/sky-glass-logo.png", mount: 0.5, x:1920/2, y: 1080 / 2
            }
        };
    }

    _construct() {
        this._t = 0
        this._frameStartListener = () => {
            this._step(this.stage.dt * 0.5)
        }
    }

    _init(){
        this._setState("Loading");
    }

    _step(dt) {
        const shader = this.tag("Shader").shader
        this._t += dt
        shader.setPos1(Math.cos(-0.42 * this._t), Math.sin(0.5 * this._t))
        shader.setPos2(0.7 * Math.cos(0.7 * this._t), 0.7*Math.sin(-0.32*this._t))
    }

    _enable() {
        this.stage.on('frameStart', this._frameStartListener)
        this._setState("Loading");
    }

    _disable() {
        this.stage.on('frameEnd', this._frameStartListener)
    }

    static _states(){
        return [
            class Loading extends this{
                $enter(){
                    // Api request that will resolve somewhere in the future
                    setTimeout(()=>{
                        this.ready();
                    },5000)
                }
                ready(){
                    this.signal("loadingReady");
                }
                error(){
                    this._setState("Error");
                }
            },
            class Error extends this{
                $enter(){
                    // signal error & retry
                }
                $exit(){
                    // signal that we exit Error state
                }
            }
        ];
    }
}

class MainSlider extends lng.Component {
    static _template(){
        return {
            Slider:{

            },
            FocusIndicator:{
                src: "./live/ui/large-focus.png", x: 443, y:-5
            }
        }
    }

    set data(v){
        this._data = v;
        this.tag("Slider").children = v.map((item, idx)=>{
            return {type: MainSliderItem, x:idx*820, item}
        });
    }

    _init(){
        this._index = 1;
    }

    get items(){
        return this.tag("Slider").children;
    }

    get active(){
        return this.items[this._index];
    }

    _handleLeft(){
        if(this._index > 0){
            this._setIndex(this._index-1);
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._setIndex(this._index+1);
        }
    }

    _focus(){
        this._setIndex();
    }

    _setIndex(index=this._index){
        this._index = index;
        this.patch({
            Slider:{
                smooth:{x: !index?0:(index*820*-1) + 450}
            },
            FocusIndicator: {
                smooth:{
                    x: !index?-7:443
                }
            }
        });
    }

    _getFocused(){
        return this.active;
    }

    _handleEnter(){
        this.fireAncestors("$onItemSelect",{item:this.active.item})
    }

    static _states(){
        return [

        ]
    }
}

class MainSliderItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 806, h: 454, scale:0.9,
            transitions:{scale:{duration:0.3, delay:0.05}}
        }
    }

    set item(v){
        this._item = v;
        this.patch({
            src:`./live/ui/${v}`
        });
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1);
    }

    _unfocus(){
        this.setSmooth("scale",0.9);
    }

    static _states(){
        return [

        ]
    }
}

class Api{

    constructor(){


        this._menu = [
            {label:"Home", section:"home"},
            {label:"TV Guide", section:"guide"},
            {label:"Recordings", section:"recordings"},
            {label:"Catch Up TV", section:"catchup"},
            {label:"On Demand", section:"demand"},
            {label:"Sky Cinema", section:"cinema"},
            {label:"Sky Store", section:"store"},
            {label:"Sports", section:"sport"},
            {label:"Kids", section:"kids"},
            {label:"Music", section:"music"},
            {label:"Apps", section:"apps"},
            {label:"Online Video", section:"video"},
            {label:"Settings", section:"settings"}
        ];

        this._active = [
            "fifa.png","live.png","netflix.png","peloton.png", "reminder.png", "spotify.png"
        ]

        this._movies = [
            {poster:"greatestshowman.png",label:"Greatest Showman",info:"", rating:5},
            {poster:"avengers.png",label:"Avengers",info:"", rating:5},
            {poster:"behemianrhapsody.png",label:"Bohemian Rhapsody",info:"", rating:5},
            {poster:"holmes.png",label:"Holmes",info:"", rating:5},
            {poster:"maryshelly.png",label:"Maryshelly",info:"", rating:5},
            {poster:"serenity.png",label:"Serenity",info:"", rating:5},
            {poster:"spiderverse.png",label:"In to the Spiderverse",info:"", rating:5},
            {poster:"thefirstpurge.png",label:"The first purge",info:"", rating:5},
        ]
    }

    getDataForMainSlider(){
        return new Promise((resolve, reject)=>{
            const data = JSON.parse(this._assets);
            resolve(data[0]);
        })
    }

    getMenuItems(){
        return new Promise((resolve, reject)=>{
            resolve([
                {label:"Home", section:"home"},
                {label:"TV Guide", section:"guide"},
                {label:"Recordings", section:"recordings"},
                {label:"Catch Up TV", section:"catchup"},
                {label:"On Demand", section:"demand"},
                {label:"Sky Cinema", section:"cinema"},
                {label:"Sky Store", section:"store"},
                {label:"Sports", section:"sport"},
                {label:"Kids", section:"kids"},
                {label:"Music", section:"music"},
                {label:"Apps", section:"apps"},
                {label:"Online Video", section:"video"},
                {label:"Settings", section:"settings"}
            ]);
        });
    }

    getActive(){
        return new Promise((resolve, reject)=>{
            resolve(this._active);
        })
    }

    getMovies(){
        return new Promise((resolve, reject)=>{
            resolve(this._movies);
        })
    }

}


