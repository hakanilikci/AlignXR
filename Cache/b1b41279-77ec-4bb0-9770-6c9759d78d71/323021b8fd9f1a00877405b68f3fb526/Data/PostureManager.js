// PostureManager.js
// @input Component.Camera camera
// @input float pitchTolerance = 15.0 {"widget":"slider", "min":5, "max":45, "step":1}
// @input Component.ScriptComponent hologramController

var referencePitch = 0.0;
var currentPitch = 0.0;
var currentState = "CALIBRATION"; 
var savedExerciseState = "EXERCISE_1"; // To remember which exercise to return to after warning

function update(eventData) {
    if (!script.camera) return;
    
    var transform = script.camera.getTransform();
    var eulerAngles = transform.getWorldRotation().toEulerAngles();
    currentPitch = eulerAngles.x * (180.0 / Math.PI); 

    if (currentState === "EXERCISE_1" || currentState === "EXERCISE_2") {
        checkPosture();
    }
}

function checkPosture() {
    var pitchDifference = currentPitch - referencePitch;
    
    if (Math.abs(pitchDifference) > script.pitchTolerance) {
        // Save current exercise before going to warning
        savedExerciseState = currentState;
        changeState("WARNING");
    }
}

// Called by the button
function nextStep() {
    if (currentState === "CALIBRATION") {
        calibrate();
    } else if (currentState === "EXERCISE_1") {
        changeState("EXERCISE_2");
    } else if (currentState === "EXERCISE_2") {
        // Loop back to first exercise, or you can do something else here
        changeState("EXERCISE_1"); 
    } else if (currentState === "WARNING") {
        print("Please correct posture first!");
    }
}

function calibrate() {
    if (!script.camera) return;
    var transform = script.camera.getTransform();
    var eulerAngles = transform.getWorldRotation().toEulerAngles();
    referencePitch = eulerAngles.x * (180.0 / Math.PI); 
    
    print("Calibrated. Reference Pitch: " + referencePitch);
    changeState("EXERCISE_1");
}

function changeState(newState) {
    if (currentState === newState) return;
    
    currentState = newState;
    print("State changed to: " + currentState);
    
    if (script.hologramController && script.hologramController.api.onStateChanged) {
        script.hologramController.api.onStateChanged(currentState);
    }
}

function checkWarningRecovery() {
    if (currentState === "WARNING") {
        var pitchDifference = currentPitch - referencePitch;
        if (Math.abs(pitchDifference) <= (script.pitchTolerance - 2.0)) { 
            // Return to the exercise they were doing
            changeState(savedExerciseState);
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(update);

var lateUpdateEvent = script.createEvent("LateUpdateEvent");
lateUpdateEvent.bind(checkWarningRecovery);

script.api.nextStep = nextStep;
