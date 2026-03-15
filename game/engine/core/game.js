import { GameScene } from "../../modules/scenes/game-scene.js";
import { ROOT_PATH } from "../../settings.js";
import { ERROR_IMAGE_SRC } from "./config.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("screen");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.currentScene = null;

        this.running = true;

        this.tps = 30;
        this.tickTime = 1000 / this.tps;

        this.lastTime = 0;
        this.accumulator = 0;

        this.key_status = {};
        this.#setupInput();
    }

    #output_context() {
        return {
            "key_status" : this.key_status
        }
    }

    start() {
        this.currentScene = new GameScene();
        requestAnimationFrame(this.#loop.bind(this));
    }

    #loop(time) {
        const delta = time - this.lastTime;
        this.lastTime = time;

        this.accumulator += delta;

        while (this.accumulator >= this.tickTime) {
            this.#update();
            this.accumulator -= this.tickTime;
        }

        this.#draw();

        if (this.running) {
            requestAnimationFrame(this.#loop.bind(this));
        }
    }

    #setupInput() {
        window.addEventListener("keydown", (e) => {
            this.key_status[e.code] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.key_status[e.code] = false;
        });
    }

    #update() {
        console.log(this.key_status)

        const gameObjects = this.currentScene.getWorldGameObjects();

        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].update(this.#output_context())

            const components = gameObjects[i].components
            for (let i=0; i<components.length; i++) {
                if  (components[i].hasOwnProperty("update")) {
                    components[i].update(this.#output_context())
                }     
            }
        }
    }

    #draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const gameObjects = this.currentScene.getWorldGameObjects();

        for (let i = 0; i < gameObjects.length; i++) {
            const sprite = gameObjects[i].findComponent("Sprite");
            const transform = gameObjects[i].findComponent("Transform");

            if (sprite == null || transform == null) continue;

            try {
                const img = new Image();
                img.src = sprite.frames[sprite.currentIndex]["imageSrc"];

                const px = transform.position.x;
                const py = transform.position.y;

                const sw = transform.scale.x;
                const sh = transform.scale.y;

                const frameData = sprite.getFrame()[sprite.getIndex()]["frameData"];

                this.ctx.drawImage(
                    img,
                    frameData.x,
                    frameData.y,
                    frameData.width,
                    frameData.height,
                    px,
                    py,
                    frameData.width * sw,
                    frameData.height * sh
                );

            } catch(e) {

                console.error( e.message );

                const img = new Image()
                img.src = ERROR_IMAGE_SRC

                const px = transform.position.x;
                const py = transform.position.y;

                const imageSize = {
                    "w":8,
                    "h":8
                    }

                const sw = imageSize["w"] * transform.scale.x;
                const sh = imageSize["h"] * transform.scale.y;

                this.ctx.drawImage(img, px, py, sw, sh)
            }
        }
    }
}