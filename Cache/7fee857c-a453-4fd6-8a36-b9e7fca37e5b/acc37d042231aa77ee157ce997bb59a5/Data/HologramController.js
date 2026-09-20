// HologramController.js
// @input SceneObject chinTuckHologram
// @input Asset.Texture chinTuckVideo

// @input SceneObject leftStretchHologram
// @input Asset.Texture leftStretchVideo

// @input SceneObject stretchOthersideHologram
// @input Asset.Texture stretchOthersideVideo

function onStateChanged(newState) {
    // Hide objects and PAUSE videos to stop background audio
    if (script.chinTuckHologram) script.chinTuckHologram.enabled = false;
    if (script.chinTuckVideo && script.chinTuckVideo.control) script.chinTuckVideo.control.pause();

    if (script.leftStretchHologram) script.leftStretchHologram.enabled = false;
    if (script.leftStretchVideo && script.leftStretchVideo.control) script.leftStretchVideo.control.pause();

    if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = false;
    if (script.stretchOthersideVideo && script.stretchOthersideVideo.control) script.stretchOthersideVideo.control.pause();
    
    // Show objects and PLAY videos based on the current state (-1 means loop)
    if (newState === "CALIBRATION") {
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
        if (script.chinTuckVideo && script.chinTuckVideo.control) script.chinTuckVideo.control.play(-1);
        
    } else if (newState === "EXERCISE_1") {
        if (script.leftStretchHologram) script.leftStretchHologram.enabled = true;
        if (script.leftStretchVideo && script.leftStretchVideo.control) script.leftStretchVideo.control.play(-1);
        
    } else if (newState === "EXERCISE_2") {
        if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = true;
        if (script.stretchOthersideVideo && script.stretchOthersideVideo.control) script.stretchOthersideVideo.control.play(-1);
        
    } else if (newState === "WARNING") {
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
        if (script.chinTuckVideo && script.chinTuckVideo.control) script.chinTuckVideo.control.play(-1);
    }
}

// Initial setup
onStateChanged("CALIBRATION");

// Expose API
script.api.onStateChanged = onStateChanged;
