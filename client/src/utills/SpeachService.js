import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
  SpeechSynthesizer,
  AvatarConfig,
  AvatarSynthesizer,
  CancellationReason,
  CancellationDetails,
} from "microsoft-cognitiveservices-speech-sdk";

import { AZURE_REGION, AZURE_SUBSCRIPTION_KEY } from "../constants";

class SpeechService {
  constructor(data) {
    this.speechConfig = SpeechConfig.fromSubscription(
      AZURE_SUBSCRIPTION_KEY,
      AZURE_REGION
    );
    this.speechConfig.speechSynthesisLanguage = "en-IN";
    this.speechConfig.speechSynthesisVoiceName = "en-IN-NeerjaNeural";

    // this.avatarConfig = new AvatarConfig("lisa", "graceful-sitting");
    this.avatarConfig = new AvatarConfig("lisa", "casual-sitting");
    this.avatarSynthesizer = new AvatarSynthesizer(
      this.speechConfig,
      this.avatarConfig
    );

    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: data.urls,
          username: data.username,
          credential: data.credential,
        },
      ],
    });

    // Fetch WebRTC video/audio streams and mount them to HTML video/audio player elements
    this.peerConnection.ontrack = function (event) {
      // console.log("event", event);
      if (event.track.kind === "video") {
        const videoElement = document.getElementById("videoPlayer");
        videoElement.srcObject = event.streams[0];
        // videoElement.autoplay = true;
      }

      if (event.track.kind === "audio") {
        const audioElement = document.getElementById("audioPlayer");
        audioElement.srcObject = event.streams[0];
        // audioElement.autoplay = true;
      }
    };

    // // Offer to receive one video track, and one audio track
    this.peerConnection.addTransceiver("video", { direction: "sendrecv" });
    this.peerConnection.addTransceiver("audio", { direction: "sendrecv" });

    this.audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    this.speechRecognizer = new SpeechRecognizer(
      this.speechConfig,
      this.audioConfig
    );
    this.speechSynthesizer = new SpeechSynthesizer(this.speechConfig);

    this.videoElement = document.getElementById("videoPlayer");
  }

  startAvatar() {
    return new Promise((resolve, reject) => {
      this.avatarSynthesizer
        .startAvatarAsync(this.peerConnection)
        .then(() => {
          console.log("Avatar started.");
          resolve(true);
        })
        .catch((error) => {
          console.log("Avatar failed to start. Error: " + error);
          reject(false);
        });
    });
  }

  startSpeechRecognition(onRecognize) {
    this.speechRecognizer.recognizing = () => {
      // this.speechRecognizer.recognizing = (s, e) => {
      // Handle partial recognition results if needed
    };

    this.speechRecognizer.recognized = (s, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        onRecognize(e.result.text);
      }
    };
    this.speechRecognizer.startContinuousRecognitionAsync();
  }

  async avatarVideo(text) {
    const promise = new Promise((resolve, reject) => {
      this.avatarSynthesizer
        .speakTextAsync(text)
        .then((result) => {
          // console.log("avatarVideo result", result);
          if (result.reason === ResultReason.SynthesizingAudioCompleted) {
            resolve(true);
          } else {
            reject(false);
            console.log("Unable to speak. Result ID: " + result.resultId);
            if (result.reason === ResultReason.Canceled) {
              let cancellationDetails = CancellationDetails.fromResult(result);
              console.log(cancellationDetails.reason);
              if (cancellationDetails.reason === CancellationReason.Error) {
                console.log(cancellationDetails.privErrorDetails);
              }
            }
          }
        })
        .catch((error) => {
          reject(false);
          console.log(error);
          this.avatarSynthesizer.close();
        });
    });
    return promise;
  }

  speak(text) {
    const promise = new Promise((resolve) => {
      this.speechSynthesizer.speakTextAsync(text, (result) => {
        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          resolve(result.privAudioDuration / 10000);
        }
      });
    });
    return promise;
  }

  stopSpeechRecognition() {
    this.speechRecognizer.stopContinuousRecognitionAsync();
  }

  close() {
    this.speechRecognizer.close();
    this.avatarSynthesizer.close();
  }
}

export default SpeechService;
