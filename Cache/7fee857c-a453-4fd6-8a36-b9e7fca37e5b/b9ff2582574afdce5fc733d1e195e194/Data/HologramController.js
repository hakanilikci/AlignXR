// HologramController.js
// @input SceneObject chinTuckHologram
// @input SceneObject leftStretchHologram
// @input SceneObject stretchOthersideHologram

function onStateChanged(newState) {
    if (script.chinTuckHologram) script.chinTuckHologram.enabled = false;
    if (script.leftStretchHologram) script.leftStretchHologram.enabled = false;
    if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = false;
    
    if (newState === "CALIBRATION") {
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
        
    } else if (newState === "EXERCISE_1") {
        if (script.leftStretchHologram) script.leftStretchHologram.enabled = true;
        
    } else if (newState === "EXERCISE_2") {
        if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = true;
        
    } else if (newState === "WARNING") {
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
    }
}

onStateChanged("CALIBRATION");

script.api.onStateChanged = onStateChanged;
