@component
export class PatternSelectButton extends BaseScriptComponent {
    @input newProjectScreen: SceneObject;
    @input iterationScreen: SceneObject;
    @input selectedPatternLabel: Text;
    @input selectedDiffLabel: Text;
    @input cardImage: Image;        // ← add this, drag this card's thumbnail image
    @input patternThumbnail: Texture; // ← add this, drag this card's texture
    @input patternName: string = "Pattern Title";
    @input difficultyLabel: string = "Easy";
    @input patternIndex: number = 0;

    onAwake(): void {
        // Clone material on awake so each card has its own instance
        if (this.cardImage) {
            const mat = this.cardImage.mainMaterial;
            if (mat) {
                this.cardImage.mainMaterial = mat.clone();
            }
            // Set this card's own texture
            if (this.patternThumbnail) {
                this.cardImage.mainPass.baseTex = this.patternThumbnail;
            }
        }
    }

    onTap(): void {
        (global as any).selectedPatternName = this.patternName;
        (global as any).selectedDifficultyLabel = this.difficultyLabel;
        (global as any).selectedPatternIndex = this.patternIndex;

        print("[Pattern] saved to global - index: " + this.patternIndex + " name: " + this.patternName);

        if (this.selectedPatternLabel) {
            this.selectedPatternLabel.text = this.patternName;
        }
        if (this.selectedDiffLabel) {
            this.selectedDiffLabel.text = this.difficultyLabel;
        }

        if (this.newProjectScreen)  this.newProjectScreen.enabled = false;
        if (this.iterationScreen)   this.iterationScreen.enabled = true;
    }
}