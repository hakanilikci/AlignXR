# 🕶️ AlignXR - AI Social Coach for Snap Spectacles

AlignXR is an Augmented Reality (AR) social coaching assistant built for **Snap Spectacles**. It listens to real-world conversations in real-time, analyzes the context using a local AI model (Ollama), and projects smart, creative suggestions directly into the user's field of view (HUD).

## 🚀 Watch It In Action
> https://canva.link/24qi9rcf1e9whd1

## 🛠️ How It Works
1. **Speech-to-Text (ASR):** Lens Studio captures the conversation via Spectacles' built-in microphones.
2. **Local AI Bridge:** The text is sent via Ngrok to a local Python Flask server.
3. **AI Analysis:** We use **Ollama (qwen2.5:3b)** to analyze the conversation and generate contextual, short, and creative advice.
4. **AR HUD:** The suggestion is instantly projected back onto the Spectacles in a non-intrusive 2D Screen Text UI.

## 💻 Tech Stack
* **AR Platform:** Lens Studio 5 (Snap Spectacles)
* **Backend:** Python (Flask)
* **AI / LLM:** Ollama (qwen2.5:3b)
* **Networking:** Ngrok

## ⚙️ Setup Instructions
1. Run the local backend: `python server.py`
2. Start the tunnel: `ngrok http 5000`
3. Paste the Ngrok URL into the `backendUrl` variable in your Lens Studio project.
4. Push the Lens to your Spectacles and start talking!