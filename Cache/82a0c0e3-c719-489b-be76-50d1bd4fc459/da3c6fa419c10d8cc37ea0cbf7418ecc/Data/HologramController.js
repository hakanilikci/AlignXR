// HologramController.js
// @input SceneObject calibrationHologram
// @input SceneObject exerciseHologram
// @input SceneObject warningHologram

function onStateChanged(newState) {
    // Hide all holograms first
    if (script.calibrationHologram) script.calibrationHologram.enabled = false;
    if (script.exerciseHologram) script.exerciseHologram.enabled = false;
    if (script.warningHologram) script.warningHologram.enabled = false;
    
    // Show the correct hologram based on the current state
    if (newState === "CALIBRATION") {
        if (script.calibrationHologram) script.calibrationHologram.enabled = true;
    } else if (newState === "EXERCISING") {
        if (script.exerciseHologram) script.exerciseHologram.enabled = true;
    } else if (newState === "WARNING") {
        if (script.warningHologram) script.warningHologram.enabled = true;
    }
}

// Initial setup to make sure only calibration is visible at start
onStateChanged("CALIBRATION");

// Expose API for PostureManager to call
script.api.onStateChanged = onStateChanged;
