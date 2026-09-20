// PostureManager.js
// @input Component.Camera camera
// @input float pitchTolerance = 15.0 {"widget":"slider", "min":5, "max":45, "step":1}
// @input Component.ScriptComponent hologramController

var isCalibrated = false;
var referencePitch = 0.0;
var currentPitch = 0.0;
var currentState = "CALIBRATION"; // CALIBRATION, EXERCISING, WARNING

function update(eventData) {
    if (!script.camera) return;
    
    // Get camera's world transform
    var transform = script.camera.getTransform();
    var eulerAngles = transform.getWorldRotation().toEulerAngles();
    
    // X axis represents pitch in Lens Studio
    // Euler angles in Lens Studio are in radians, converting to degrees for readability
    currentPitch = eulerAngles.x * (180.0 / Math.PI); 

    if (currentState === "EXERCISING") {
        checkPosture();
    }
}

function checkPosture() {
    var pitchDifference = currentPitch - referencePitch;
    
    // If the absolute difference is greater than the tolerance, trigger warning.
    // In a real scenario, you might only check if they look down (e.g. pitchDifference < -tolerance or > tolerance depending on sign)
    if (Math.abs(pitchDifference) > script.pitchTolerance) {
        changeState("WARNING");
    }
}

function calibrate() {
    if (!script.camera) {
        print("Error: Camera not assigned to PostureManager.");
        return;
    }
    var transform = script.camera.getTransform();
    var eulerAngles = transform.getWorldRotation().toEulerAngles();
    referencePitch = eulerAngles.x * (180.0 / Math.PI); 
    
    print("Calibrated. Reference Pitch: " + referencePitch);
    changeState("EXERCISING");
}

function changeState(newState) {
    if (currentState === newState) return;
    
    currentState = newState;
    print("State changed to: " + currentState);
    
    if (script.hologramController && script.hologramController.api.onStateChanged) {
        script.hologramController.api.onStateChanged(currentState);
    }
}

// Check continuously if in warning state and user corrected posture
function checkWarningRecovery() {
    if (currentState === "WARNING") {
        var pitchDifference = currentPitch - referencePitch;
        if (Math.abs(pitchDifference) <= (script.pitchTolerance - 2.0)) { // 2.0 degrees deadzone to prevent flickering
            changeState("EXERCISING");
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(update);

var lateUpdateEvent = script.createEvent("LateUpdateEvent");
lateUpdateEvent.bind(checkWarningRecovery);

// Expose API for other scripts
script.api.calibrate = calibrate;
script.api.getState = function() { return currentState; };
