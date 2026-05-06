// @input SceneObject celebrationScreen
// @input SceneObject confettiEffect
// @input float duration = 3.0

var wasEnabled = false;
var stopTimer = null;

script.createEvent("UpdateEvent").bind(function() {
    if (!script.celebrationScreen) return;

    var isEnabled = script.celebrationScreen.enabled;

    if (isEnabled && !wasEnabled) {
        // Enable confetti
        if (script.confettiEffect) {
            script.confettiEffect.enabled = true;
        }

        // Disable after duration
        stopTimer = script.createEvent("DelayedCallbackEvent");
        stopTimer.bind(function() {
            if (script.confettiEffect) {
                script.confettiEffect.enabled = false;
            }
        });
        stopTimer.reset(script.duration);
    }

    if (!isEnabled && wasEnabled) {
        // Cancel and hide immediately if screen closes early
        if (stopTimer) {
            stopTimer.enabled = false;
            stopTimer = null;
        }
        if (script.confettiEffect) {
            script.confettiEffect.enabled = false;
        }
    }

    wasEnabled = isEnabled;
});