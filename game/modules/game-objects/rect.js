import { GameObject } from "../../engine/core/game-object.js";
import { Transform } from "../../engine/component/transform.js";
import { FrameData, Sprite } from "../../engine/component/sprite.js";
import { ROOT_PATH } from "../../settings.js";

export class Rect extends GameObject {
    constructor() {
        super();
        
        const transform = new Transform();
        transform.setScale(10,10);
        transform.setPosition(10,10);
        this.addComponent(transform);

        const sprite = new Sprite();
        sprite.addFrame(ROOT_PATH + "/assets/img/green.jpg", new FrameData(0,0,8,8));
        sprite.setIndex(0);
        this.addComponent(sprite);

        this.input_map ={
            "KeyW" : ["dy",-1],
            "KeyS" : ["dy", 1],
            "KeyA" : ["dx",-1],
            "KeyD" : ["dx", 1],
        }

        this.move_speed = 10
    }

    update(context) {

        const direction = {
            "dx":0,
            "dy":0
        }

        for (let key in this.input_map){
            if (context["key_status"][key] == true) {
                direction[this.input_map[key][0]] = this.input_map[key][1];
            }
        }

        const trans = this.findComponent("Transform")
        trans.translate(
            direction["dx"] * this.move_speed, 
            direction["dy"] * this.move_speed
        )
    }
}