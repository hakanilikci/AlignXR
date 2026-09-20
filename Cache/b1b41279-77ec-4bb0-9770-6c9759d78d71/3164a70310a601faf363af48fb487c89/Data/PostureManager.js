// PostureManager.js
// @input Component.Camera camera
// @input float pitchTolerance = 15.0 {"widget":"slider", "min":5, "max":45, "step":1}
// @input Component.ScriptComponent hologramController

var referencePitch = 0.0;
var currentPitch = 0.0;
var currentState = "CALIBRATION"; 
var savedExerciseState = "EXERCISE_1"; 

function update(eventData) {
    if (!script.camera) return;
    
    // Kameranın dünyada nereye baktığını (İleri vektörünü) alıyoruz
    var forward = script.camera.getTransform().forward; 
    
    // İleri vektörünün Y eksenindeki (yukarı/aşağı) değişiminden gerçek eğimi (Pitch) hesaplıyoruz
    currentPitch = Math.asin(forward.y) * (180.0 / Math.PI);

    if (currentState === "EXERCISE_1" || currentState === "EXERCISE_2") {
        checkPosture();
    }
}

function checkPosture() {
    var pitchDifference = currentPitch - referencePitch;
    
    if (Math.abs(pitchDifference) > script.pitchTolerance) {
        savedExerciseState = currentState;
        changeState("WARNING");
    }
}

function nextStep() {
    if (currentState === "CALIBRATION") {
        calibrate();
    } else if (currentState === "EXERCISE_1") {
        changeState("EXERCISE_2");
    } else if (currentState === "EXERCISE_2") {
        changeState("EXERCISE_1"); 
    }
}

function calibrate() {
    if (!script.camera) return;
    
    var forward = script.camera.getTransform().forward; 
    referencePitch = Math.asin(forward.y) * (180.0 / Math.PI);
    
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
            changeState(savedExerciseState);
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(update);

var lateUpdateEvent = script.createEvent("LateUpdateEvent");
lateUpdateEvent.bind(checkWarningRecovery);

script.api.nextStep = nextStep;