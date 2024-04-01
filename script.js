const textArea = document.querySelector("textarea");
const button = document.querySelector("button");
const select = document.querySelector("select");
let isSpeaking = true;
let speech = window.speechSynthesis;

const textToSpeech = () => {
  const text = textArea.value;

  if (!speech.speaking && text) {
    const utterSpeech = new SpeechSynthesisUtterance(text);
    for (let voice of speech.getVoices()) {
        if(voice.name === select.value) {
            utterSpeech.voice = voice;
        }
    }
    speech.speak(utterSpeech);
  } 

  if (text.length > 50) {
    if (speech.speaking && isSpeaking) {
      button.innerText = "Pause";
      speech.resume();
      isSpeaking = false;
    } else {
      button.innerText = "Resume";
      speech.pause();
      isSpeaking = true;
    }
  } else {
    isSpeaking = false;
    button.innerText = "Speaking";
  }

  setInterval(() => {
    if (!speech.speaking && !isSpeaking) {
      isSpeaking = true;
      button.innerText = "Speak";
    }
  });
};

button.addEventListener("Click", textToSpeech());

const voices = () => {
  for (let voice of speech.getVoices()) {
      console.log(voice);
    // Creating an option tag with passing voice name and voice language
    let option = `<option value="${voice.name}"> ${voice.name} (${voice.lang})</option>`
    select.insertAdjacentHTML ('beforeend', option) // Inserting option tag beforeend option
  }
};
select.addEventListener("click", voices());
