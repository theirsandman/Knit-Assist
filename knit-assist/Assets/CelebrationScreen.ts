@component
export class CelebrationScreenLoader extends BaseScriptComponent {
    @input celebrationScreen: SceneObject;
    @input highScoreController: ScriptComponent;
    @input patternNameText: Text;
    @input difficultyText: Text;
    @input iterationsText: Text;
    @input patternImage: Image;
    @input thumbnail0: Texture;
    @input thumbnail1: Texture;
    @input thumbnail2: Texture;

    private wasEnabled: boolean = false;

    onAwake(): void {
        this.createEvent("UpdateEvent").bind(() => this.onUpdate());
    }

    private onUpdate(): void {
        if (!this.celebrationScreen) return;

        const isEnabled = this.celebrationScreen.enabled;

        if (isEnabled && !this.wasEnabled) {
            this.populate();
        }

        this.wasEnabled = isEnabled;
    }

    private populate(): void {
        const name = (global as any).selectedPatternName ?? "Pattern";
        const diff = (global as any).selectedDifficultyLabel ?? "Easy";
        const index = (global as any).selectedPatternIndex ?? 0;

        // Get actual completed iteration count from highScoreController
        const ctrl = this.highScoreController as any;
        const iterations = typeof ctrl.getIterations === "function"
            ? ctrl.getIterations(index)
            : ((global as any).pendingNewProjectIterations ?? 1);

        print("[Celebration] name:" + name + " diff:" + diff + " index:" + index + " iterations:" + iterations);

        if (this.patternNameText) {
            this.patternNameText.text = name;
        }
        if (this.difficultyText) {
            this.difficultyText.text =  diff;
        }
        if (this.iterationsText) {
            this.iterationsText.text = iterations + " iterations completed.";
        }
        if (this.patternImage) {
            const thumbs = [this.thumbnail0, this.thumbnail1, this.thumbnail2];
            const thumb = thumbs[index];
            if (thumb) {
                this.patternImage.mainPass.baseTex = thumb;
            }
        }
    }
}