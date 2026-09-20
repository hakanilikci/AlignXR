// HologramController.js
// @input SceneObject chinTuckHologram
// @input Asset.Texture chinTuckVideo

// @input SceneObject leftStretchHologram
// @input Asset.Texture leftStretchVideo

// @input SceneObject stretchOthersideHologram
// @input Asset.Texture stretchOthersideVideo

function safePause(video) {
    if (video && video.control) {
        try {
            video.control.pause();
        } catch (e) {
            // Videolar henüz yüklenmediyse veya zaten duraklatıldıysa oluşacak hatayı yoksay
        }
    }
}

function safePlay(video) {
    if (video && video.control) {
        try {
            video.control.play(-1); // -1 sonsuz döngü (loop) anlamına gelir
        } catch (e) {
            // Hataları yoksay
        }
    }
}

function onStateChanged(newState) {
    // Tüm objeleri gizle ve videoları güvenlice duraklat
    if (script.chinTuckHologram) script.chinTuckHologram.enabled = false;
    safePause(script.chinTuckVideo);

    if (script.leftStretchHologram) script.leftStretchHologram.enabled = false;
    safePause(script.leftStretchVideo);

    if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = false;
    safePause(script.stretchOthersideVideo);
    
    // Geçerli duruma göre doğru objeyi aç ve videoyu oynat
    if (newState === "CALIBRATION") {
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
        safePlay(script.chinTuckVideo);
        
    } else if (newState === "EXERCISE_1") {
        if (script.leftStretchHologram) script.leftStretchHologram.enabled = true;
        safePlay(script.leftStretchVideo);
        
    } else if (newState === "EXERCISE_2") {
        if (script.stretchOthersideHologram) script.stretchOthersideHologram.enabled = true;
        safePlay(script.stretchOthersideVideo);
        
    } else if (newState === "WARNING") {
        if (script.chinTuckHologram) script.chinTuckHologram.enabled = true;
        safePlay(script.chinTuckVideo);
    }
}

// Başlangıç ayarı
onStateChanged("CALIBRATION");

// API dışa aktarımı
script.api.onStateChanged = onStateChanged;