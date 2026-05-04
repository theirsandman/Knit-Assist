// @input Component.ScriptComponent highScoreController
// @input Component.ScriptComponent gridController

function onTap() {
    print("[Inc] onTap fired!");
    print("[Inc] highScoreController: " + script.highScoreController);
    var api = global.knitAssistGrid;
    if (api && typeof api.addStitch === "function") {
        api.addStitch();
    }
    var c = script.highScoreController;
    if (c) {
        print("[Inc] found controller, calling incrementScore");
        var inc = c.incrementScore;
        print("[Inc] incrementScore is: " + inc);
        if (typeof inc === "function") { inc.call(c); }
    } else {
        print("[Inc] highScoreController is NULL!");
    }
}

script.onTap = onTap;