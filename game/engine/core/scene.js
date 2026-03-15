export class Scene {
    constructor() {
        this.world = [];
        this.canvas = [];
    }

    getWorldGameObjects() {
        return this.world;
    }

    addWorldGameObject(gameObject) {
        this.world.push(gameObject);
    }
}