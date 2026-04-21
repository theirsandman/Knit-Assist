// @input SceneObject counterFrame

function onTap() {
    if (script.counterFrame) {
        script.counterFrame.enabled = !script.counterFrame.enabled;
    }
}

script.onTap = onTap;