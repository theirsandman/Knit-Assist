// @input SceneObject newProjectScreen
// @input SceneObject homeScreen

@component
export class HomeButtonNewProject extends BaseScriptComponent {
    @input newProjectScreen: SceneObject;
    @input homeScreen: SceneObject;

    onTap() {
        if (this.newProjectScreen) this.newProjectScreen.enabled = false;
        if (this.homeScreen)       this.homeScreen.enabled = true;
    }
}