// LoadButton.js
// @input SceneObject loadPreviousProjectScreen
// @input SceneObject homeScreen

function onTap() {
    if (script.loadPreviousProjectScreen) {
        script.loadPreviousProjectScreen.enabled = true;
    }
    if (script.homeScreen) {
        script.homeScreen.enabled = false;
    }
}

script.onTap = onTap;