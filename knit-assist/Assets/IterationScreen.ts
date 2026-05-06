@component
export class IterationScreenLoader extends BaseScriptComponent {
    @input iterationScreen: SceneObject;
    @input patternNameText: Text;
    @input difficultyText: Text;
    @input patternImage: Image;
    @input thumbnail0: Texture;
    @input thumbnail1: Texture;
    @input thumbnail2: Texture;

    private wasEnabled: boolean = false;

    onAwake(): void {
        this.createEvent("UpdateEvent").bind(() => this.onUpdate());
    }

    private onUpdate(): void {
        if (!this.iterationScreen) return;

        const isEnabled = this.iterationScreen.enabled;

        if (isEnabled && !this.wasEnabled) {
            this.populate();
        }

        this.wasEnabled = isEnabled;
    }

    private populate(): void {
        const name = (global as any).selectedPatternName;
        const diff = (global as any).selectedDifficultyLabel;
        const index = (global as any).selectedPatternIndex ?? 0;

        print("[IterationScreen] populating - name: " + name + " index: " + index + " diff: " + diff);

        if (this.patternNameText) {
            this.patternNameText.text = name ?? "Pattern Title";
        }
        if (this.difficultyText) {
            this.difficultyText.text = diff ?? "Easy";
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