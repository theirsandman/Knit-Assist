// BackToHome.js
// @input SceneObject homeScreen
// @input SceneObject loadPreviousProjectScreen

function onTap() {
    if (script.loadPreviousProjectScreen) {
        script.loadPreviousProjectScreen.enabled = false;
    }
    if (script.homeScreen) {
        script.homeScreen.enabled = true;
    }
}

script.onTap = onTap;