import { Scene } from "../../engine/core/scene.js"
import { Rect } from "../game-objects/rect.js"

export class GameScene extends Scene {
    constructor() {
        super()
        
        const rect = new Rect();
        this.addWorldGameObject(rect);
    }
}