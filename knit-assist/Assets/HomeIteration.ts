// @input SceneObject iterationScreen
// @input SceneObject homeScreen

@component
export class HomeIteration extends BaseScriptComponent {
    @input iterationScreen: SceneObject;
    @input homeScreen: SceneObject;

    onTap() {
        if (this.iterationScreen) this.iterationScreen.enabled = false;
        if (this.homeScreen)       this.homeScreen.enabled = true;
    }
}