// @input Component.ScriptComponent highScoreController
// @input Component.Text dateText
// @input int projectIndex = 0
// @input SceneObject loadPreviousProjectScreen

var wasEnabled = false;

script.createEvent("UpdateEvent").bind(function() {
    if (!script.loadPreviousProjectScreen) { return; }
    
    var isEnabled = script.loadPreviousProjectScreen.enabled;
    
    // Refresh when screen becomes visible
    if (isEnabled && !wasEnabled) {
        if (script.highScoreController && script.dateText) {
            var fn = script.highScoreController.getLastOpened;
            if (typeof fn === "function") {
                script.dateText.text = fn(script.projectIndex);
            }
        }
    }
    
    wasEnabled = isEnabled;
});