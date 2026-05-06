@component
export class ConfirmButtonIteration extends BaseScriptComponent {
    @input stepperController: ScriptComponent;
    @input highScoreController: ScriptComponent;
    @input iterationScreen: SceneObject;
    @input sessionScreen: SceneObject;

    onTap(): void {
        const stepper = this.stepperController as any;
        const count = typeof stepper.getCount === "function" ? stepper.getCount() : 1;
        const patternIndex = (global as any).selectedPatternIndex ?? 0;

        print("[Confirm] index: " + patternIndex + " count: " + count);

        // Access the script's API the same way load project does
        const ctrl = this.highScoreController as any;
        const api = ctrl.getSceneObject
            ? ctrl.getSceneObject().getComponent("Component.ScriptComponent")
            : ctrl;

        print("[Confirm] api keys: " + JSON.stringify(Object.keys(api)));

        if (typeof ctrl.setPendingNewProject === "function") {
            ctrl.setPendingNewProject(patternIndex, count);
        } else if (typeof api.setPendingNewProject === "function") {
            api.setPendingNewProject(patternIndex, count);
        } else {
            // Last resort — set directly on global pending
            print("[Confirm] falling back to global pending");
            (global as any).pendingNewProjectIndex = patternIndex;
            (global as any).pendingNewProjectIterations = count;
        }

        if (this.iterationScreen) this.iterationScreen.enabled = false;
        if (this.sessionScreen)   this.sessionScreen.enabled = true;
    }
}