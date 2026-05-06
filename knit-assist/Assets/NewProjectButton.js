// LoadButton.js
// @input SceneObject newProjectScreen
// @input SceneObject homeScreen

function onTap() {
    if (script.newProjectScreen) {
        script.newProjectScreen.enabled = true;
    }
    if (script.homeScreen) {
        script.homeScreen.enabled = false;
    }
}

script.onTap = onTap;