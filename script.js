import Pitchfinder from "https://cdn.jsdelivr.net/npm/pitchfinder@2.3.2/+esm";

const fileInput = document.getElementById("audioFile");
const reader = new FileReader();
const audioContext = new AudioContext();
const detectors = [Pitchfinder.YIN(), Pitchfinder.AMDF()];

fileInput.onchange = function () {
  const file = fileInput.files[0];
  reader.readAsArrayBuffer(file);
};

reader.onload = async function () {
  await audioContext.decodeAudioData(this.result, (buffer) => {
    const pitches = Pitchfinder.frequencies(
      detectors,
      buffer.getChannelData(0),
      {
        tempo: 100,
        quantization: 4,
      }
    );
    generateSong(pitches);
  });
};

function generateSong(pitches) {}
