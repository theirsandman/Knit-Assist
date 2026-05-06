@component
export class IncreasePatternCount extends BaseScriptComponent {
    @input stepperController: ScriptComponent;

    private holdInterval: DelayedCallbackEvent | null = null;
    private readonly holdDelay: number = 0.4;
    private readonly holdRate: number = 0.08;

    onTap(): void {
        const api = this.stepperController as any;
        if (typeof api.increment === "function") api.increment();
    }

    onButtonPressed(): void {
        this.holdInterval = this.createEvent('DelayedCallbackEvent');
        this.holdInterval.bind(() => this.startRapidFire());
        this.holdInterval.reset(this.holdDelay);
    }

    onButtonReleased(): void {
        if (this.holdInterval) {
            this.holdInterval.enabled = false;
            this.holdInterval = null;
        }
    }

    private startRapidFire(): void {
        const api = this.stepperController as any;
        if (typeof api.increment === "function") api.increment();
        this.holdInterval = this.createEvent('DelayedCallbackEvent');
        this.holdInterval.bind(() => this.startRapidFire());
        this.holdInterval.reset(this.holdRate);
    }
}