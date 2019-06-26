import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";
import Table from "../../Table.js";

export default class StatesPlayer extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                flex: {direction: 'column'},
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: StatesPlayer.text("Model state")},
                        {type: BulletPoint, content: StatesPlayer.text("State Oriented <-> Object Oriented")},
                        {type: BulletPoint, content: StatesPlayer.text("_setState()")},
                        {type: BulletPoint, content: StatesPlayer.text("$enter() / $exit()")},
                    ]
                }
            }
        }
    }

    get title() {
        return "States"
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    get liveEditOptions() {
        const actions = [[{"start":{"row":50,"column":45},"end":{"row":50,"column":46},"action":"insert","lines":[" "],"id":50,"reload":true}],[{"start":{"row":47,"column":45},"end":{"row":47,"column":46},"action":"insert","lines":[" "],"id":49}],[{"start":{"row":42,"column":50},"end":{"row":42,"column":51},"action":"insert","lines":[" "],"id":48}],[{"start":{"row":42,"column":20},"end":{"row":42,"column":50},"action":"insert","lines":["this._setState(\"Guest.Popup\");"],"id":47}],[{"start":{"row":41,"column":50},"end":{"row":42,"column":0},"action":"insert","lines":["",""],"id":46},{"start":{"row":42,"column":0},"end":{"row":42,"column":20},"action":"insert","lines":["                    "]}],[{"start":{"row":50,"column":24},"end":{"row":50,"column":28},"action":"remove","lines":["    "],"id":45}],[{"start":{"row":48,"column":24},"end":{"row":50,"column":29},"action":"insert","lines":["$exit(){","                                // hide popup","                            }"],"id":44}],[{"start":{"row":47,"column":25},"end":{"row":48,"column":0},"action":"insert","lines":["",""],"id":43},{"start":{"row":48,"column":0},"end":{"row":48,"column":24},"action":"insert","lines":["                        "]}],[{"start":{"row":47,"column":24},"end":{"row":47,"column":28},"action":"remove","lines":["    "],"id":42}],[{"start":{"row":45,"column":24},"end":{"row":47,"column":29},"action":"insert","lines":["$enter(){","                                // show popup","                            }"],"id":41}],[{"start":{"row":44,"column":45},"end":{"row":44,"column":48},"action":"remove","lines":["   "],"id":39},{"start":{"row":44,"column":45},"end":{"row":45,"column":0},"action":"insert","lines":["",""]},{"start":{"row":45,"column":0},"end":{"row":45,"column":24},"action":"insert","lines":["                        "]},{"start":{"row":45,"column":24},"end":{"row":46,"column":0},"action":"insert","lines":["",""]},{"start":{"row":46,"column":0},"end":{"row":46,"column":24},"action":"insert","lines":["                        "]},{"start":{"row":46,"column":24},"end":{"row":46,"column":25},"action":"insert","lines":["}"]},{"start":{"row":46,"column":0},"end":{"row":46,"column":24},"action":"remove","lines":["                        "]},{"start":{"row":46,"column":0},"end":{"row":46,"column":20},"action":"insert","lines":["                    "]}],[{"start":{"row":44,"column":20},"end":{"row":44,"column":45},"action":"insert","lines":["class Popup extends this{"],"id":38}],[{"start":{"row":44,"column":16},"end":{"row":44,"column":20},"action":"insert","lines":["    "],"id":37}],[{"start":{"row":43,"column":32},"end":{"row":44,"column":0},"action":"insert","lines":["",""],"id":36},{"start":{"row":44,"column":0},"end":{"row":44,"column":19},"action":"insert","lines":["                   "]},{"start":{"row":44,"column":19},"end":{"row":45,"column":0},"action":"insert","lines":["",""]},{"start":{"row":45,"column":0},"end":{"row":45,"column":19},"action":"insert","lines":["                   "]},{"start":{"row":45,"column":19},"end":{"row":45,"column":20},"action":"insert","lines":["}"]},{"start":{"row":45,"column":0},"end":{"row":45,"column":19},"action":"remove","lines":["                   "]},{"start":{"row":45,"column":0},"end":{"row":45,"column":15},"action":"insert","lines":["               "]}],[{"start":{"row":43,"column":15},"end":{"row":43,"column":32},"action":"insert","lines":["static _states(){"],"id":35}],[{"start":{"row":42,"column":16},"end":{"row":43,"column":0},"action":"insert","lines":["",""],"id":34},{"start":{"row":43,"column":0},"end":{"row":43,"column":15},"action":"insert","lines":["               "]}],[{"start":{"row":23,"column":35},"end":{"row":23,"column":36},"action":"insert","lines":[" "],"id":33}],[{"start":{"row":20,"column":26},"end":{"row":20,"column":27},"action":"insert","lines":[" "],"id":32}],[{"start":{"row":15,"column":17},"end":{"row":15,"column":21},"action":"remove","lines":["true"],"id":31},{"start":{"row":15,"column":17},"end":{"row":15,"column":22},"action":"insert","lines":["false"]}],[{"start":{"row":46,"column":1},"end":{"row":47,"column":0},"action":"insert","lines":["",""],"id":30},{"start":{"row":47,"column":0},"end":{"row":48,"column":0},"action":"insert","lines":["",""]},{"start":{"row":48,"column":0},"end":{"row":49,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":23,"column":11},"end":{"row":23,"column":35},"action":"insert","lines":["this._setState(\"Guest\");"],"id":29}],[{"start":{"row":22,"column":13},"end":{"row":23,"column":0},"action":"insert","lines":["",""],"id":28},{"start":{"row":23,"column":0},"end":{"row":23,"column":11},"action":"insert","lines":["           "]},{"start":{"row":23,"column":11},"end":{"row":24,"column":0},"action":"insert","lines":["",""]},{"start":{"row":24,"column":0},"end":{"row":24,"column":11},"action":"insert","lines":["           "]},{"start":{"row":24,"column":11},"end":{"row":24,"column":12},"action":"insert","lines":["}"]},{"start":{"row":24,"column":0},"end":{"row":24,"column":11},"action":"remove","lines":["           "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":7},"action":"insert","lines":["       "]}],[{"start":{"row":22,"column":8},"end":{"row":22,"column":13},"action":"insert","lines":["else{"],"id":27}],[{"start":{"row":21,"column":11},"end":{"row":21,"column":43},"action":"insert","lines":["this._setState(\"Authenticated\");"],"id":26}],[{"start":{"row":20,"column":26},"end":{"row":20,"column":27},"action":"remove","lines":[" "],"id":25},{"start":{"row":20,"column":26},"end":{"row":21,"column":0},"action":"insert","lines":["",""]},{"start":{"row":21,"column":0},"end":{"row":21,"column":11},"action":"insert","lines":["           "]},{"start":{"row":21,"column":11},"end":{"row":22,"column":0},"action":"insert","lines":["",""]},{"start":{"row":22,"column":0},"end":{"row":22,"column":11},"action":"insert","lines":["           "]},{"start":{"row":22,"column":11},"end":{"row":22,"column":12},"action":"insert","lines":["}"]},{"start":{"row":22,"column":0},"end":{"row":22,"column":11},"action":"remove","lines":["           "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":7},"action":"insert","lines":["       "]}],[{"start":{"row":20,"column":7},"end":{"row":20,"column":26},"action":"insert","lines":["if(this._api.auth){"],"id":24}],[{"start":{"row":19,"column":12},"end":{"row":20,"column":0},"action":"insert","lines":["",""],"id":23},{"start":{"row":20,"column":0},"end":{"row":20,"column":8},"action":"insert","lines":["        "]},{"start":{"row":20,"column":8},"end":{"row":21,"column":0},"action":"insert","lines":["",""]},{"start":{"row":21,"column":0},"end":{"row":21,"column":8},"action":"insert","lines":["        "]},{"start":{"row":21,"column":8},"end":{"row":21,"column":9},"action":"insert","lines":["}"]},{"start":{"row":21,"column":0},"end":{"row":21,"column":8},"action":"remove","lines":["        "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":19,"column":4},"end":{"row":19,"column":12},"action":"insert","lines":["_init(){"],"id":22}],[{"start":{"row":17,"column":5},"end":{"row":18,"column":0},"action":"insert","lines":["",""],"id":21},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":4},"end":{"row":19,"column":0},"action":"insert","lines":["",""]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":34,"column":12},"end":{"row":34,"column":13},"action":"insert","lines":[" "],"id":20},{"start":{"row":34,"column":13},"end":{"row":34,"column":14},"action":"insert","lines":[" "]},{"start":{"row":34,"column":14},"end":{"row":34,"column":15},"action":"insert","lines":[" "]}],[{"start":{"row":34,"column":12},"end":{"row":34,"column":16},"action":"remove","lines":["    "],"id":19}],[{"start":{"row":31,"column":15},"end":{"row":34,"column":17},"action":"insert","lines":["play(){","                    // show login popup","                    // or redirect to sign-up page","                }"],"id":18}],[{"start":{"row":30,"column":36},"end":{"row":31,"column":0},"action":"insert","lines":["",""],"id":16},{"start":{"row":31,"column":0},"end":{"row":31,"column":15},"action":"insert","lines":["               "]},{"start":{"row":31,"column":15},"end":{"row":32,"column":0},"action":"insert","lines":["",""]},{"start":{"row":32,"column":0},"end":{"row":32,"column":15},"action":"insert","lines":["               "]},{"start":{"row":32,"column":15},"end":{"row":32,"column":16},"action":"insert","lines":["}"]},{"start":{"row":32,"column":0},"end":{"row":32,"column":15},"action":"remove","lines":["               "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":11},"action":"insert","lines":["           "]}],[{"start":{"row":30,"column":11},"end":{"row":30,"column":36},"action":"insert","lines":["class Guest extends this{"],"id":15}],[{"start":{"row":29,"column":13},"end":{"row":30,"column":0},"action":"insert","lines":["",""],"id":14},{"start":{"row":30,"column":0},"end":{"row":30,"column":11},"action":"insert","lines":["           "]}],[{"start":{"row":29,"column":12},"end":{"row":29,"column":13},"action":"insert","lines":[","],"id":13}],[{"start":{"row":28,"column":12},"end":{"row":28,"column":13},"action":"insert","lines":[" "],"id":12},{"start":{"row":28,"column":13},"end":{"row":28,"column":14},"action":"insert","lines":[" "]},{"start":{"row":28,"column":14},"end":{"row":28,"column":15},"action":"insert","lines":[" "]}],[{"start":{"row":28,"column":12},"end":{"row":28,"column":16},"action":"remove","lines":["    "],"id":11}],[{"start":{"row":26,"column":15},"end":{"row":28,"column":17},"action":"insert","lines":["play(){","                    // play video","                }"],"id":10}],[{"start":{"row":25,"column":44},"end":{"row":25,"column":45},"action":"remove","lines":[" "],"id":9},{"start":{"row":25,"column":44},"end":{"row":26,"column":0},"action":"insert","lines":["",""]},{"start":{"row":26,"column":0},"end":{"row":26,"column":15},"action":"insert","lines":["               "]},{"start":{"row":26,"column":15},"end":{"row":27,"column":0},"action":"insert","lines":["",""]},{"start":{"row":27,"column":0},"end":{"row":27,"column":15},"action":"insert","lines":["               "]},{"start":{"row":27,"column":15},"end":{"row":27,"column":16},"action":"insert","lines":["}"]},{"start":{"row":27,"column":0},"end":{"row":27,"column":15},"action":"remove","lines":["               "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":11},"action":"insert","lines":["           "]}],[{"start":{"row":25,"column":11},"end":{"row":25,"column":44},"action":"insert","lines":["class Authenticated extends this{"],"id":8}],[{"start":{"row":26,"column":8},"end":{"row":26,"column":12},"action":"remove","lines":["    "],"id":7}],[{"start":{"row":24,"column":16},"end":{"row":24,"column":19},"action":"remove","lines":["   "],"id":6},{"start":{"row":24,"column":16},"end":{"row":25,"column":0},"action":"insert","lines":["",""]},{"start":{"row":25,"column":0},"end":{"row":25,"column":12},"action":"insert","lines":["            "]},{"start":{"row":25,"column":12},"end":{"row":26,"column":0},"action":"insert","lines":["",""]},{"start":{"row":26,"column":0},"end":{"row":26,"column":12},"action":"insert","lines":["            "]},{"start":{"row":26,"column":12},"end":{"row":26,"column":13},"action":"insert","lines":["]"]}],[{"start":{"row":24,"column":8},"end":{"row":24,"column":16},"action":"insert","lines":["return ["],"id":5}],[{"start":{"row":24,"column":5},"end":{"row":24,"column":8},"action":"insert","lines":["   "],"id":4}],[{"start":{"row":23,"column":21},"end":{"row":24,"column":0},"action":"insert","lines":["",""],"id":3},{"start":{"row":24,"column":0},"end":{"row":24,"column":8},"action":"insert","lines":["        "]},{"start":{"row":24,"column":8},"end":{"row":25,"column":0},"action":"insert","lines":["",""]},{"start":{"row":25,"column":0},"end":{"row":25,"column":8},"action":"insert","lines":["        "]},{"start":{"row":25,"column":8},"end":{"row":25,"column":9},"action":"insert","lines":["}"]},{"start":{"row":25,"column":0},"end":{"row":25,"column":8},"action":"remove","lines":["        "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":23,"column":4},"end":{"row":23,"column":21},"action":"insert","lines":["static _states(){"],"id":2}],[{"start":{"row":21,"column":5},"end":{"row":22,"column":0},"action":"insert","lines":["",""],"id":1},{"start":{"row":22,"column":0},"end":{"row":22,"column":4},"action":"insert","lines":["    "]},{"start":{"row":22,"column":4},"end":{"row":23,"column":0},"action":"insert","lines":["",""]},{"start":{"row":23,"column":0},"end":{"row":23,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":19,"column":4},"end":{"row":21,"column":5},"action":"insert","lines":["play(){","       // logic for playing item","    }"],"id":22,"reload":true}],[{"start":{"row":17,"column":5},"end":{"row":18,"column":0},"action":"insert","lines":["",""],"id":21},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":4},"end":{"row":19,"column":0},"action":"insert","lines":["",""]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":14,"column":8},"end":{"row":16,"column":9},"action":"insert","lines":["this._api = {","            auth:true","        }"],"id":20}],[{"start":{"row":14,"column":8},"end":{"row":15,"column":8},"action":"remove","lines":["","        "],"id":19}],[{"start":{"row":13,"column":17},"end":{"row":14,"column":0},"action":"insert","lines":["",""],"id":18},{"start":{"row":14,"column":0},"end":{"row":14,"column":8},"action":"insert","lines":["        "]},{"start":{"row":14,"column":8},"end":{"row":15,"column":0},"action":"insert","lines":["",""]},{"start":{"row":15,"column":0},"end":{"row":15,"column":8},"action":"insert","lines":["        "]},{"start":{"row":15,"column":8},"end":{"row":16,"column":0},"action":"insert","lines":["",""]},{"start":{"row":16,"column":0},"end":{"row":16,"column":8},"action":"insert","lines":["        "]},{"start":{"row":16,"column":8},"end":{"row":16,"column":9},"action":"insert","lines":["}"]},{"start":{"row":16,"column":0},"end":{"row":16,"column":8},"action":"remove","lines":["        "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":13,"column":4},"end":{"row":13,"column":17},"action":"insert","lines":["_construct(){"],"id":17}],[{"start":{"row":11,"column":5},"end":{"row":12,"column":0},"action":"insert","lines":["",""],"id":16},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":12,"column":4},"end":{"row":13,"column":0},"action":"insert","lines":["",""]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":10,"column":9},"end":{"row":11,"column":8},"action":"remove","lines":["","        "],"id":15}],[{"start":{"row":10,"column":8},"end":{"row":10,"column":12},"action":"remove","lines":["    "],"id":14}],[{"start":{"row":8,"column":8},"end":{"row":10,"column":13},"action":"insert","lines":["ProgressBar:{","","            }"],"id":13}],[{"start":{"row":7,"column":10},"end":{"row":8,"column":0},"action":"insert","lines":["",""],"id":12},{"start":{"row":8,"column":0},"end":{"row":8,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":7,"column":8},"end":{"row":7,"column":12},"action":"remove","lines":["    "],"id":11}],[{"start":{"row":5,"column":8},"end":{"row":7,"column":14},"action":"insert","lines":["Stop:{","","            },"],"id":10}],[{"start":{"row":4,"column":10},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":9},{"start":{"row":5,"column":0},"end":{"row":5,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":4,"column":8},"end":{"row":4,"column":12},"action":"remove","lines":["    "],"id":8}],[{"start":{"row":2,"column":8},"end":{"row":4,"column":14},"action":"insert","lines":["Play:{","","            },"],"id":7}],[{"start":{"row":1,"column":23},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":6},{"start":{"row":2,"column":0},"end":{"row":2,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":1,"column":23},"end":{"row":1,"column":26},"action":"remove","lines":["   "],"id":5},{"start":{"row":1,"column":23},"end":{"row":2,"column":0},"action":"insert","lines":["",""]},{"start":{"row":2,"column":0},"end":{"row":2,"column":8},"action":"insert","lines":["        "]},{"start":{"row":2,"column":8},"end":{"row":3,"column":0},"action":"insert","lines":["",""]},{"start":{"row":3,"column":0},"end":{"row":3,"column":8},"action":"insert","lines":["        "]},{"start":{"row":3,"column":8},"end":{"row":3,"column":9},"action":"insert","lines":["}"]},{"start":{"row":3,"column":0},"end":{"row":3,"column":8},"action":"remove","lines":["        "]},{"start":{"row":3,"column":0},"end":{"row":3,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":1,"column":4},"end":{"row":1,"column":23},"action":"insert","lines":["static _template(){"],"id":4}],[{"start":{"row":1,"column":1},"end":{"row":1,"column":4},"action":"insert","lines":["   "],"id":3}],[{"start":{"row":0,"column":37},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":1,"column":0},"end":{"row":1,"column":4},"action":"insert","lines":["    "]},{"start":{"row":1,"column":4},"end":{"row":2,"column":0},"action":"insert","lines":["",""]},{"start":{"row":2,"column":0},"end":{"row":2,"column":4},"action":"insert","lines":["    "]},{"start":{"row":2,"column":4},"end":{"row":2,"column":5},"action":"insert","lines":["}"]},{"start":{"row":2,"column":0},"end":{"row":2,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":37},"action":"insert","lines":["class Player extends lng.Application{"],"id":1}]];
        return {isApp: true, data: {actions:actions}};
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {text: text, fontSize: 48, fontStyle}};
    }

}

// class Player extends lng.Application{
//     static _template(){
//         return {
//             Play:{
//
//             },
//             Stop:{
//
//             },
//             ProgressBar:{
//
//             }
//         }
//     }
//
//     _construct(){
//         this._api = {
//             auth:false
//         }
//     }
//
//     _init(){
//         if(this._api.auth){
//             this._setState("Authenticated");
//         }else{
//             this._setState("Guest");
//         }
//     }
//
//     play(){
//        // logic for playing item
//     }
//
//     static _states(){
//         return [
//             class Authenticated extends this{
//                 play(){
//                     // play video
//                 }
//             },
//             class Guest extends this{
//                 play(){
//                     // show login popup
//                     // or redirect to sign-up page
//                     this._setState("Guest.Popup");
//
//                 }
//                 static _states(){
//                     return [
//                         class Popup extends this{
//                             $enter(){
//                                 // show popup
//                             }
//                             $exit(){
//                                 // hide popup
//                             }
//                         }
//                     ]
//                 }
//             }
//         ]
//     }
//
// }