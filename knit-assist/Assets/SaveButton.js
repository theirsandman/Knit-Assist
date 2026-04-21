// @input Component.ScriptComponent highScoreController
// @input Component.Text nameInputText

function onTap() {
    if (!script.highScoreController || !script.nameInputText) {
        return;
    }
    var name = script.nameInputText.text;
    if (name && name !== "") {
        var c = script.highScoreController;
        var saveName = c.saveProjectName;
        if (typeof saveName === "function") { saveName.call(c, name); }
    }
}

script.createEvent("TapEvent").bind(onTap);