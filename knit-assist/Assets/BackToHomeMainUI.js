// @input SceneObject homeScreen
// @input SceneObject mainApp
// @input SceneObject loadPreviousProjectScreen
// @input Component.ScriptComponent highScoreController
// @input Component.Text dateText0
// @input Component.Text dateText1
// @input Component.Text dateText2

function onTap() {
    if (script.mainApp) {
        script.mainApp.enabled = false;
    }
    if (script.homeScreen) {
        script.homeScreen.enabled = true;
    }
    if (script.loadPreviousProjectScreen) {
        script.loadPreviousProjectScreen.enabled = false;
    }
    
    // Update date texts before showing load screen
    var fn = script.highScoreController && script.highScoreController.getLastOpened;
    if (typeof fn === "function") {
        if (script.dateText0) script.dateText0.text = fn(0);
        if (script.dateText1) script.dateText1.text = fn(1);
        if (script.dateText2) script.dateText2.text = fn(2);
    }
}

script.onTap = onTap;