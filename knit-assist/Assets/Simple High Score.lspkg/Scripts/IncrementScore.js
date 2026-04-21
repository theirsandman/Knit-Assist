// @input Component.ScriptComponent highScoreController
// @input Component.ScriptComponent gridController

function onTap() {
    var api = global.knitAssistGrid;
    if (api && typeof api.addStitch === "function") {
        api.addStitch();
    }
    var c = script.highScoreController;
    if (c) {
        var inc = c.incrementScore;
        if (typeof inc === "function") { inc.call(c); }
    }
}

script.onTap = onTap;