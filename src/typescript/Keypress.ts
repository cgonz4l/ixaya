type TargetElement = HTMLElement | Document
export class Keypress {
    private target: TargetElement
    constructor(target: TargetElement) {
        this.target = target
    }
    handle(key: string, fn: () => void): void {
        this.target.addEventListener('keydown', (ev: KeyboardEvent) => {
            if(ev.key === key) {
                fn()
            } 
        })
    }
    esc(fn: () => void): void {
        this.handle('Escape', fn)
    }
}