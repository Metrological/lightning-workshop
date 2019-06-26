import Page from "../../Page.js";
import BulletPoint from "../BulletPoint.js";

export default class Step8 extends Page {

    static _template() {
        return {
            Bullets: {
                y: 100,
                x: 40,
                Wrap: {
                    flex: {direction: 'column'},
                    children: [
                        {type: BulletPoint, content: Step8.text("clone github.com/mlapps/Challenge8")},
                        {type: BulletPoint, content: Step8.text("Add your own Notification Component")},
                        {type: BulletPoint, content: Step8.text("send errors to Component")}
                    ]
                }
            }
        }
    }

    get title() {
        return "Challenge 8 - Error handling";
    }

    _active() {
        this.tag("Wrap").children.forEach((child, index) => child.show(index * 0.2));
    }

    _inactive() {
        this.tag("Wrap").children.forEach(child => child.hide());
    }

    get liveEditOptions() {
        return {isApp: true, data: {actions:[[{"start":{"row":9,"column":55},"end":{"row":9,"column":56},"action":"insert","lines":[" "],"id":37,"reload":true},{"start":{"row":9,"column":56},"end":{"row":9,"column":57},"action":"insert","lines":["0"]},{"start":{"row":9,"column":57},"end":{"row":9,"column":58},"action":"insert","lines":["."]},{"start":{"row":9,"column":58},"end":{"row":9,"column":59},"action":"insert","lines":["5"]}],[{"start":{"row":9,"column":47},"end":{"row":9,"column":48},"action":"insert","lines":[" "],"id":36},{"start":{"row":9,"column":48},"end":{"row":9,"column":49},"action":"insert","lines":["a"]},{"start":{"row":9,"column":49},"end":{"row":9,"column":50},"action":"insert","lines":["m"]},{"start":{"row":9,"column":50},"end":{"row":9,"column":51},"action":"insert","lines":["o"]},{"start":{"row":9,"column":51},"end":{"row":9,"column":52},"action":"insert","lines":["u"]},{"start":{"row":9,"column":52},"end":{"row":9,"column":53},"action":"insert","lines":["n"]},{"start":{"row":9,"column":53},"end":{"row":9,"column":54},"action":"insert","lines":["t"]},{"start":{"row":9,"column":54},"end":{"row":9,"column":55},"action":"insert","lines":[":"]}],[{"start":{"row":9,"column":46},"end":{"row":9,"column":47},"action":"insert","lines":[","],"id":35}],[{"start":{"row":48,"column":86},"end":{"row":48,"column":87},"action":"insert","lines":[" "],"id":34},{"start":{"row":48,"column":87},"end":{"row":48,"column":88},"action":"insert","lines":["c"]},{"start":{"row":48,"column":88},"end":{"row":48,"column":89},"action":"insert","lines":["o"]},{"start":{"row":48,"column":89},"end":{"row":48,"column":90},"action":"insert","lines":["l"]},{"start":{"row":48,"column":90},"end":{"row":48,"column":91},"action":"insert","lines":["o"]},{"start":{"row":48,"column":91},"end":{"row":48,"column":92},"action":"insert","lines":["r"]},{"start":{"row":48,"column":92},"end":{"row":48,"column":93},"action":"insert","lines":["."]},{"start":{"row":48,"column":93},"end":{"row":48,"column":94},"action":"insert","lines":["r"]},{"start":{"row":48,"column":94},"end":{"row":48,"column":95},"action":"insert","lines":["g"]},{"start":{"row":48,"column":95},"end":{"row":48,"column":96},"action":"insert","lines":["b"]}],[{"start":{"row":48,"column":84},"end":{"row":48,"column":85},"action":"insert","lines":[" "],"id":33},{"start":{"row":48,"column":85},"end":{"row":48,"column":86},"action":"insert","lines":["*"]}],[{"start":{"row":48,"column":76},"end":{"row":48,"column":77},"action":"insert","lines":[" "],"id":32},{"start":{"row":48,"column":77},"end":{"row":48,"column":78},"action":"insert","lines":["a"]},{"start":{"row":48,"column":78},"end":{"row":48,"column":79},"action":"insert","lines":["m"]},{"start":{"row":48,"column":79},"end":{"row":48,"column":80},"action":"insert","lines":["o"]},{"start":{"row":48,"column":80},"end":{"row":48,"column":81},"action":"insert","lines":["u"]},{"start":{"row":48,"column":81},"end":{"row":48,"column":82},"action":"insert","lines":["n"]},{"start":{"row":48,"column":82},"end":{"row":48,"column":83},"action":"insert","lines":["t"]},{"start":{"row":48,"column":83},"end":{"row":48,"column":84},"action":"insert","lines":[")"]}],[{"start":{"row":48,"column":74},"end":{"row":48,"column":75},"action":"insert","lines":[" "],"id":30},{"start":{"row":48,"column":75},"end":{"row":48,"column":76},"action":"insert","lines":["-"]}],[{"start":{"row":48,"column":69},"end":{"row":48,"column":70},"action":"insert","lines":[" "],"id":29},{"start":{"row":48,"column":70},"end":{"row":48,"column":71},"action":"insert","lines":["("]},{"start":{"row":48,"column":71},"end":{"row":48,"column":72},"action":"insert","lines":["1"]},{"start":{"row":48,"column":72},"end":{"row":48,"column":73},"action":"insert","lines":["."]},{"start":{"row":48,"column":73},"end":{"row":48,"column":74},"action":"insert","lines":["0"]}],[{"start":{"row":48,"column":67},"end":{"row":48,"column":68},"action":"insert","lines":[" "],"id":28},{"start":{"row":48,"column":68},"end":{"row":48,"column":69},"action":"insert","lines":["+"]}],[{"start":{"row":48,"column":32},"end":{"row":48,"column":33},"action":"insert","lines":[" "],"id":27}],[{"start":{"row":48,"column":30},"end":{"row":48,"column":31},"action":"insert","lines":[" "],"id":26},{"start":{"row":48,"column":31},"end":{"row":48,"column":32},"action":"insert","lines":["*"]}],[{"start":{"row":48,"column":24},"end":{"row":48,"column":25},"action":"insert","lines":["a"],"id":25},{"start":{"row":48,"column":25},"end":{"row":48,"column":26},"action":"insert","lines":["m"]},{"start":{"row":48,"column":26},"end":{"row":48,"column":27},"action":"insert","lines":["o"]},{"start":{"row":48,"column":27},"end":{"row":48,"column":28},"action":"insert","lines":["u"]},{"start":{"row":48,"column":28},"end":{"row":48,"column":29},"action":"insert","lines":["n"]},{"start":{"row":48,"column":29},"end":{"row":48,"column":30},"action":"insert","lines":["t"]}],[{"start":{"row":44,"column":0},"end":{"row":45,"column":0},"action":"insert","lines":["uniform float amount;",""],"id":24}],[{"start":{"row":32,"column":0},"end":{"row":36,"column":0},"action":"insert","lines":["    setupUniforms(operation) {","        super.setupUniforms(operation);","        this._setUniform(\"amount\", this._amount, this.gl.uniform1f);","    }",""],"id":23}],[{"start":{"row":18,"column":0},"end":{"row":32,"column":0},"action":"insert","lines":["    constructor(context) {","        super(context);","        this._amount = 1;","    }","    ","    set amount(v) {","        this._amount = v;","        this.redraw();","    }","    ","    get amount() {","        return this._amount;","    }","    ",""],"id":22}],[{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"remove","lines":["    "],"id":21}],[{"start":{"row":17,"column":62},"end":{"row":18,"column":0},"action":"insert","lines":["",""],"id":20},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":20,"column":0},"end":{"row":30,"column":2},"action":"insert","lines":["GrayscaleShader.fragmentShaderSource = `","precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void){","    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;","    float grayness = 0.2 * color.r + 0.6 * color.g + 0.2 * color.b;","    gl_FragColor = vec4(vec3(grayness, grayness, grayness), color.a);","}","`;"],"id":15,"reload":true}],[{"start":{"row":18,"column":1},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":14},{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":9,"column":16},"end":{"row":9,"column":48},"action":"insert","lines":["shader: {type: GrayscaleShader},"],"id":6}],[{"start":{"row":8,"column":25},"end":{"row":9,"column":0},"action":"insert","lines":["",""],"id":5},{"start":{"row":9,"column":0},"end":{"row":9,"column":16},"action":"insert","lines":["                "]}],[{"start":{"row":17,"column":0},"end":{"row":17,"column":1},"action":"insert","lines":["}"],"id":4}],[{"start":{"row":16,"column":0},"end":{"row":17,"column":0},"action":"insert","lines":["class GrayscaleShader extends lng.shaders.WebGLDefaultShader {",""],"id":3}],[{"start":{"row":15,"column":0},"end":{"row":16,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":0,"column":0},"end":{"row":15,"column":0},"action":"insert","lines":["class MyApp extends lng.Application {","    constructor(options = {}) {","        options.stage = Object.assign({w: 1920, h: 1080, clearColor: 0x00000000, memoryPressure: 24e6});","        super(options);","    }","    ","    static _template() {","        return {","            Background: {","                rect: true, w: 1920, h: 1080, color: 0xFF444444,","                Icon: {src: \"./static/img/Lightning.png\", x: 100, y: 400}","            }","        }","    }","}",""],"id":1,"reload":true}]]}};
    }

    static text(text, color = 0xFFFFFFFF, fontStyle = '') {
        return {flexItem: {}, color: color, text: {fontFace: 'helvetica', text: text, fontSize: 48, fontStyle}};
    }

}