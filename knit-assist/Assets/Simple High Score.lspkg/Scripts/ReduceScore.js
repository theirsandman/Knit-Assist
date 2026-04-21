// @input Component.ScriptComponent highScoreController
// @input Component.ScriptComponent gridController

function onTap() {
    var api = global.knitAssistGrid;
    if (api && typeof api.prevStitch === "function") {
        api.prevStitch();
    }
    var c = script.highScoreController;
    if (c) {
        var dec = c.reduceScore;
        if (typeof dec === "function") { dec.call(c); }
    }
}

script.onTap = onTap;