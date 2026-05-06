// @input SceneObject iterationScreen

var wasEnabled = false;

script.createEvent("UpdateEvent").bind(function() {
    if (!script.iterationScreen) return;

    var isEnabled = script.iterationScreen.enabled;

    if (isEnabled && !wasEnabled) {
        print("[IterationScreen] became visible!");
        print("[IterationScreen] name: " + global.selectedPatternName);
        print("[IterationScreen] index: " + global.selectedPatternIndex);
        print("[IterationScreen] difficulty: " + global.selectedDifficultyLabel);
    }

    wasEnabled = isEnabled;
});