@component
export class IterationStepper extends BaseScriptComponent {
    @input patternCountText: Text;
    @input min: number = 1;
    @input max: number = 99;

    private count: number = 1;

    onAwake(): void {
        this.updateDisplay();
        (this as any).increment = this.increment.bind(this);
        (this as any).decrement = this.decrement.bind(this);
    }

    private updateDisplay(): void {
        if (this.patternCountText) {
            this.patternCountText.text = this.count.toString();
        }
    }

    increment(): void {
        if (this.count < this.max) {
            this.count++;
            this.updateDisplay();
        }
    }

    decrement(): void {
        if (this.count > this.min) {
            this.count--;
            this.updateDisplay();
        }
    }

    getCount(): number {
        return this.count;
    }
}