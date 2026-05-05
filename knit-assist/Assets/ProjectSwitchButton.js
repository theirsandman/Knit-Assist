// @input Component.ScriptComponent highScoreController
// @input int projectIndex = 0
// @input SceneObject mainApp
// @input SceneObject loadPreviousProjectScreen

function onTap() {
    print("[PSB] onTap fired! index: " + script.projectIndex);

    if (script.mainApp) {
        script.mainApp.enabled = true;
    }
    if (script.loadPreviousProjectScreen) {
        script.loadPreviousProjectScreen.enabled = false;
    }

    var ctrl = script.highScoreController;
    if (ctrl && typeof ctrl.setPendingProject === "function") {
        ctrl.setPendingProject(script.projectIndex);
    }
}

script.onTap = onTap;