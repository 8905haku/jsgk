export class FrameData {
    constructor(x=0, y=0, w=0, h=0) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}

export class Sprite {
    constructor() {
        this.currentIndex = 0;
        this.frames = [];
    }

    addFrame(spriteSheetImageSrc, frameData) {
        this.frames.push({"imageSrc":spriteSheetImageSrc, "frameData":frameData});
    }
    
    getFrame() {
        return this.frames;
    }

    setIndex(index) {
        this.currentIndex = index;
    }

    getIndex() {
        return this.currentIndex;
    }
}