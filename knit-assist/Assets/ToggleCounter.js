// @input Component.ScriptComponent counterFrame

function onTap() {
    if (script.counterFrame) {
        var sceneObject = script.counterFrame.getSceneObject();
        sceneObject.enabled = !sceneObject.enabled;
    }
}

script.onTap = onTap;