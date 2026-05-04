// @input SceneObject referenceFrame

function onTap() {
    if (script.referenceFrame) {
        script.referenceFrame.enabled = !script.referenceFrame.enabled;
    }
}

script.onTap = onTap;