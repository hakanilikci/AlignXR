// CalibrationUI.js
// @input Component.ScriptComponent postureManager
// @input Component.InteractionComponent buttonInteraction

function onButtonPressed() {
    print("Button/Touchpad tapped. Proceeding to next step...");
    if (script.postureManager && script.postureManager.api.nextStep) {
        script.postureManager.api.nextStep();
    } else {
        print("Error: PostureManager script or API not found.");
    }
}

// Ekranda (UI) butona tıklanırsa çalıştır (El ile çimdikleme için)
if (script.buttonInteraction) {
    script.buttonInteraction.onTap.add(onButtonPressed);
}

// Gözlüğün Touchpad'ine HERHANGİ BİR YERDE dokunulursa çalıştır (Global Tap)
var globalTapEvent = script.createEvent("TapEvent");
globalTapEvent.bind(onButtonPressed);