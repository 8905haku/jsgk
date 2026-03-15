import { Vector2 } from "../math/vector2.js";
import { Scale } from "../math/scale.js";


export class Transform {
    constructor() {
        this.position = new Vector2();
        this.scale = new Scale();
        this.rotation = 0;
    }

    translate(x, y) {
        this.position.x += x;
        this.position.y += y;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    setScale(x, y) {
        this.scale.x = x;
        this.scale.y = y;
    }


}