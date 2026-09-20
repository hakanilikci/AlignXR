// CalibrationUI.js
// @input Component.ScriptComponent postureManager
// @input Component.InteractionComponent buttonInteraction

function onButtonPressed() {
    print("Button pressed. Proceeding to next step...");
    if (script.postureManager && script.postureManager.api.nextStep) {
        script.postureManager.api.nextStep();
    } else {
        print("Error: PostureManager script or API not found.");
    }
}

if (script.buttonInteraction) {
    script.buttonInteraction.onTap.add(onButtonPressed);
} else {
    print("Warning: buttonInteraction not assigned in CalibrationUI.");
}
