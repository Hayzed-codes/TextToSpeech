const textArea = document.querySelector("textarea");
const button = document.querySelector("button");
let isSpeaking = true;

const textToSpeech = () => {
  const speech = window.speechSynthesis;
  const text = textArea.value;

  if (!speech.speaking && text) {
    const utterSpeech = new SpeechSynthesisUtterance(text);
    speech.speak(utterSpeech);
  }


  if (text.length > 50){
    if(speech.speaking && isSpeaking) {
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
    button.innerText = "Speaking"
  }

  setInterval(() => {
    if(!speech.speaking && !isSpeaking){ 
        isSpeaking = true;
        button.innerText = "Speak";
    }
  })
};

button.addEventListener("Click", textToSpeech());
