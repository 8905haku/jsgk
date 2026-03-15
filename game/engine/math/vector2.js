export class Vector2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}