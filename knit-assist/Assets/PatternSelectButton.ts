@component
export class PatternSelectButton extends BaseScriptComponent {
    @input newProjectScreen: SceneObject;
    @input iterationScreen: SceneObject;
    @input selectedPatternLabel: Text;
    @input selectedDiffLabel: Text;
    @input patternName: string = "Pattern Title";
    @input difficultyLabel: string = "Easy";
    @input patternIndex: number = 0;

    onTap(): void {
        // Write directly to global — no separate PatternState class needed
        (global as any).selectedPatternName = this.patternName;
        (global as any).selectedDifficultyLabel = this.difficultyLabel;
        (global as any).selectedPatternIndex = this.patternIndex;

        print("[Pattern] saved to global - index: " + this.patternIndex + " name: " + this.patternName);

        if (this.selectedPatternLabel) {
            this.selectedPatternLabel.text = this.patternName;
        }
        if (this.selectedDiffLabel) {
            this.selectedDiffLabel.text = "Difficulty: " + this.difficultyLabel;
        }

        if (this.newProjectScreen)  this.newProjectScreen.enabled = false;
        if (this.iterationScreen)   this.iterationScreen.enabled = true;
    }
}