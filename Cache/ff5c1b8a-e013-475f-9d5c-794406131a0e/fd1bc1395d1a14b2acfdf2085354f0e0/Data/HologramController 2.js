// HologramController.js
// @input SceneObject chinTuckHologram
// @input SceneObject leftStretchHologram
// @input SceneObject stretchOthersideHologram

function onStateChanged(newState) {
    // Hide all holograms first
    if (script.chinTuckHologram) script.chinTuckHologram.enabled = false;
    if (script.leftStretchHologram) script.leftStretchHologram.enabled = false;
    if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = false;
    
    // Show the correct holograms based on the current state
    if (newState === "CALIBRATION") {
        // Tutorial (Calibration) uses Chin-tuck
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
        
    } else if (newState === "EXERCISING") {
        // Show both exercises
        if (script.leftStretchHologram) script.leftStretchHologram.enabled = true;
        if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = true;
        
    } else if (newState === "WARNING") {
        // Warning also uses Chin-tuck to remind them of the correct posture
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
    }
}

// Initial setup to make sure only tutorial/calibration is visible at start
onStateChanged("CALIBRATION");

// Expose API for PostureManager to call
script.api.onStateChanged = onStateChanged;
