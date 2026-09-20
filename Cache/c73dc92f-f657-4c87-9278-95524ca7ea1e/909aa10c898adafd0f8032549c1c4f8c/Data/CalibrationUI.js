// CalibrationUI.js
// @input Component.ScriptComponent postureManager
// @input Component.InteractionComponent buttonInteraction

function onButtonPressed() {
    print("User selected 'Hazırım' (Ready). Calibrating...");
    if (script.postureManager && script.postureManager.api.calibrate) {
        script.postureManager.api.calibrate();
    } else {
        print("Error: PostureManager script or API not found.");
    }
}

if (script.buttonInteraction) {
    // onTap works with InteractionComponent in Lens Studio for hand/controller interactions
    script.buttonInteraction.onTap.add(onButtonPressed);
} else {
    print("Warning: buttonInteraction not assigned in CalibrationUI.");
}
