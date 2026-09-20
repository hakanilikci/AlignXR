🕶️ AlignXR - AR Posture Coach for Snap Spectacles

AlignXR is an interactive Augmented Reality (AR) posture training assistant built exclusively for Snap Spectacles. It acts as a virtual physiotherapist, guiding users through neck and shoulder exercises while actively monitoring their head posture using real-time IMU sensor data. If the user breaks their posture (e.g., looks down at their phone), the system instantly interrupts the exercise with a visual warning to correct their alignment.

🚀 Watch It In Action
Click here to watch the short demo video!

https://canva.link/24qi9rcf1e9whd1

🛠️ How It Works
Smart Calibration: The experience starts with a calibration phase. When the user taps the global trigger (via phone or touchpad), the system records their current head pitch (using the Camera's forward vector) as the "Perfect Zero" reference.
Sequential Exercises: Users cycle through multiple guided stretch videos (e.g., left-stretch, right-stretch) mapped securely to their AR HUD.
Real-time IMU Tracking: Lens Studio's Device Tracking component continuously calculates the user's head pitch (forward.y vector). It strictly monitors for neck strain (e.g., tilting forward > 5 degrees).
Adaptive Warnings: If a bad posture is detected, the current exercise is paused and hidden. A "Chin-tuck" warning hologram instantly appears with an alert message. Once the user corrects their neck, the system seamlessly resumes the interrupted exercise.
Media Optimization: The system dynamically pauses and plays the hidden Video Textures via script to ensure zero audio overlap and optimal battery performance.
💻 Tech Stack
AR Platform: Lens Studio 5 (Snap OS)
Hardware Target: Snap Spectacles (2024)
Language: JavaScript (Lens Studio API)
Sensors utilized: Device Tracking (IMU / Gyroscope / Accelerometer)
UI/UX: Screen Transform HUDs & Global Tap Events
⚙️ Setup Instructions
1-Clone the repository and open the project in Lens Studio 5.
2-Ensure the Target Platform in Project Settings is set to Spectacles.
3-Import your own exercise .mp4 files into the Asset Browser (Make sure "Auto Play" is disabled).
4-Assign the videos to the HologramController script slots via the Inspector.
5-Push the Lens to your Spectacles, tap your phone screen to calibrate, and start exercising!
