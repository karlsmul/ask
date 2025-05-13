// Array mit verschiedenen Fragen
const questions = [
    "Was war dein schönstes Erlebnis heute?",
    "Was würdest du tun, wenn du einen Tag unsichtbar wärst?",
    "Was ist dein größter Traum?",
    "Was würdest du gerne lernen, wenn du unbegrenzt Zeit hättest?",
    "Was ist deine liebste Erinnerung aus der Kindheit?",
    "Was würdest du tun, wenn du einen Tag lang die Welt regieren könntest?",
    "Was ist dein größtes Ziel für dieses Jahr?",
    "Was würdest du gerne an dir selbst ändern?",
    "Was ist dein liebstes Buch und warum?",
    "Was würdest du tun, wenn du eine Million Euro gewinnen würdest?",
    "Was ist dein größter Wunsch für die Zukunft?",
    "Was würdest du gerne in deinem Leben erreichen?",
    "Was ist deine liebste Freizeitbeschäftigung?",
    "Was würdest du tun, wenn du einen Tag lang jemand anderes sein könntest?",
    "Was ist dein größter Erfolg bisher?",
    "Welche Sprache würdest du gerne sprechen können und warum?",
    "Mit welcher (prominenten) Person würdest du gerne mal tauschen?",
    "Was für ein Geschäft oder welches Business würdest du eröffnen, wenn du nicht scheitern könntest?",
    "Was hast du zuletzt richtig gut gemacht?",
    "Von welchem Beruf hast du als Kind geträumt?",
    "Welches Tier möchtest du gerne mal in der Natur sehen?",
    "Was möchtest du gerne noch lernen?",
    "Wie könnte dein Alltag ohne Arbeit aussehen?",
    "Wann hast du das letzte Mal etwas zum Ersten Mal gemacht?",
    "Wie ist jemand der das Gegenteil von dir ist?",
    "Worüber würdest du als Schrifsteller*in schreiben oder als Filmemacher*in Filme drehen?",
    "Wofür hast du als Kind dein Taschengeld ausgegeben?",
    "Lieblingseissorte?",
    "Lieber in die Vergangenheit oder Zukunft reisen?",
    "Was wäre dein Thema als Influencer*in?",
    "Von welchem Unternehmen würdest du Sponsoring sofort annehmen?",
    "In welchem Land würdest du gerne mal als SozialarbeiterIn arbeiten, wenn die Sprache keine Hindernis wäre?",
    "Welchen fiktive Figur oder Prominente Person würdest du gerne in ihrer Jugendlichen Version betreuen?",
    "Hast du eine Lieblingsfrucht oder ein Lieblingsessen?",
    "Welches Buch oder Zeitschrift liest du aktuell oder hast du zuletzt gelesen?",
    "Was würdest du gerne mal ausprobieren?",
    "Wenn dein Leben ein Film wäre, welches Genre hätte er?",
    "Welches ist das letzte Lied, dass du gehört hast?",
    "Welche Superpower, die dir bei deiner Arbeit helfen würde, hättest du gerne? z.B. dass Jugendliche immer pünktlich sind.",
    "Welches Trash TV Format magst du am liebsten?",
    "Welche Lieblingssache oder Ding hattest du zuletzt oder hast du momentan? (z.B. Lieblingssong)"
];

// Elemente aus dem DOM holen
const questionImage = document.getElementById('questionImage');
const questionDisplay = document.getElementById('questionDisplay');

// Funktion zum Auswählen einer zufälligen Frage
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

// Sprachsynthese (Text-to-Speech)
const voiceSelect = document.getElementById('voiceSelect');
const speakButton = document.getElementById('speakButton');
let voices = [];
let currentQuestion = questionDisplay.textContent;

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    // Nur deutsche Stimmen
    const germanVoices = voices.filter(v => v.lang.startsWith('de'));
    voiceSelect.innerHTML = '';
    if (germanVoices.length === 0) {
        voiceSelect.innerHTML = '<option>Keine deutschen Stimmen gefunden</option>';
        speakButton.disabled = true;
        return;
    }
    germanVoices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})${voice.localService ? ' [Lokal]' : ''}${voice.gender ? ' ['+voice.gender+']' : ''}`;
        voiceSelect.appendChild(option);
    });
    speakButton.disabled = false;
}

// Stimmen laden (auch bei Änderungen)
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
    populateVoiceList();
} else {
    voiceSelect.innerHTML = '<option>Sprachsynthese nicht unterstützt</option>';
    speakButton.disabled = true;
}

// Frage speichern, wenn sie angezeigt wird
function updateCurrentQuestion() {
    currentQuestion = questionDisplay.textContent;
}

// Event Listener für den Klick auf das Bild
questionImage.addEventListener('click', () => {
    // Animation für das Bild
    questionImage.style.transform = 'scale(0.95)';
    setTimeout(() => {
        questionImage.style.transform = 'scale(1)';
    }, 100);

    // Neue Frage anzeigen
    const newQuestion = getRandomQuestion();
    questionDisplay.innerHTML = `<p>${newQuestion}</p>`;
    updateCurrentQuestion();
});

// Vorlesen-Button
speakButton.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(currentQuestion);
    const selectedVoice = voices.find(v => v.name === voiceSelect.value);
    if (selectedVoice) utter.voice = selectedVoice;
    utter.lang = selectedVoice ? selectedVoice.lang : 'de-DE';
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.cancel(); // Stoppe vorherige Sprache
    window.speechSynthesis.speak(utter);
});

// Wenn die Frage initial angezeigt wird, speichern
updateCurrentQuestion(); 