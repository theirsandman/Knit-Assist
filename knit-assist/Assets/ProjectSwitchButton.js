// @input Component.ScriptComponent highScoreController
// @input int projectIndex = 0

var isReady = false;

script.createEvent("OnStartEvent").bind(function() {
    isReady = true;
});

function onTap() {
    if (!isReady) { return; }
    var fn = script.highScoreController && script.highScoreController.loadProject;
    if (typeof fn === "function") {
        fn.call(script.highScoreController, script.projectIndex);
    }
}

script.onTap = onTap;