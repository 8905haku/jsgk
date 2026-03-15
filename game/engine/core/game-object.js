export class GameObject {
    constructor() {
        this.layer = 0;
        this.components = [];
    }

    addComponent(componentObject) {
        this.components.push(componentObject);
    }

    findComponent(componentClassName) {
        for (let i=0; i<this.components.length; i++) {
            if (this.components[i].constructor.name == componentClassName) {
                return this.components[i];
            }
        }
        return null;
    }
}