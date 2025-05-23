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
    "Welches ist dein liebstes Buch und warum?",
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
    "Wann hast du das letzte Mal etwas zum ersten Mal gemacht?",
    "Wie ist jemand, der das Gegenteil von dir ist?",
    "Worüber würdest du als Schriftsteller*in schreiben oder als Filmemacher*in Filme drehen?",
    "Wofür hast du als Kind dein Taschengeld ausgegeben?",
    "Was ist deine Lieblingseissorte?",
    "Würdest du lieber in die Vergangenheit oder Zukunft reisen?",
    "Was wäre dein Thema als Influencer*in?",
    "Von welchem Unternehmen würdest du Sponsoring sofort annehmen?",
    "In welchem Land würdest du gerne mal als Sozialarbeiter*in arbeiten, wenn die Sprache kein Hindernis wäre?",
    "Welche fiktive Figur oder prominente Person würdest du gerne in ihrer jugendlichen Version betreuen?",
    "Hast du eine Lieblingsfrucht oder ein Lieblingsessen?",
    "Welches Buch oder welche Zeitschrift liest du aktuell oder hast du zuletzt gelesen?",
    "Was würdest du gerne mal ausprobieren?",
    "Wenn dein Leben ein Film wäre, welches Genre hätte er?",
    "Welches ist das letzte Lied, das du gehört hast?",
    "Welche Superpower, die dir bei deiner Arbeit helfen würde, hättest du gerne? (z.B. dass Jugendliche immer pünktlich sind)",
    "Welches Trash-TV-Format magst du am liebsten?",
    "Welche Lieblingssache oder welches Ding hattest du zuletzt oder hast du momentan? (z.B. Lieblingssong)"
];

// Elemente aus dem DOM holen
const questionImage = document.getElementById('questionImage');
const questionDisplay = document.getElementById('questionDisplay');

// Variable für die letzte Frage
let lastQuestion = null;

// Funktion zum Auswählen einer zufälligen Frage
function getRandomQuestion() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (questions[randomIndex] === lastQuestion && questions.length > 1);
    
    lastQuestion = questions[randomIndex];
    return lastQuestion;
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
}); 