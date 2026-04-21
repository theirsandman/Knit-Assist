// @input SceneObject splashScreen
// @input SceneObject mainApp
// @input SceneObject yarnBall
// @input float splashDuration = 5.0
// @input float moveDistance = 3.0
// @input float moveSpeed = 1.5
// @input float bobAmount = 0.15
// @input float bobSpeed = 2.5
// @input float rotationSpeed = 220.0

var elapsed = 0.0;
var finished = false;

var yarnTransform = script.yarnBall.getTransform();
var startPos = yarnTransform.getLocalPosition();
var currentRotation = yarnTransform.getLocalRotation();

function onUpdate() {
    if (finished) {
        return;
    }

    var dt = getDeltaTime();
    elapsed += dt;

    // --- Animate yarn ball ---
    var xOffset = Math.sin(elapsed * script.moveSpeed) * script.moveDistance;
    var yOffset = Math.abs(Math.sin(elapsed * script.bobSpeed)) * script.bobAmount;

    yarnTransform.setLocalPosition(
        new vec3(
            startPos.x + xOffset,
            startPos.y + yOffset,
            startPos.z
        )
    );

    // Roll / spin effect
    var deltaRot = quat.angleAxis(
        (script.rotationSpeed * dt) * Math.PI / 180.0,
        vec3.forward()
    );

    currentRotation = deltaRot.multiply(currentRotation);
    yarnTransform.setLocalRotation(currentRotation);



    // --- End splash after duration ---
    if (elapsed >= script.splashDuration) {
        finished = true;

        if (script.splashScreen) {
            script.splashScreen.enabled = false;
        }

        if (script.mainApp) {
            script.mainApp.enabled = true;
        }
    }
}

script.createEvent("UpdateEvent").bind(onUpdate);