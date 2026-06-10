import { Application } from 'pixi.js';

export class Game {
    async init(container) {
        this.app = new Application();

        await this.app.init({
            background: '#1099bb',
            resizeTo: window
        });

        container.appendChild(this.app.canvas);
    }

    destroy() {
        this.app.destroy(true);
    }
}