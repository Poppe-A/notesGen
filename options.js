const options = {
    speedRange:{slow: 10000, fast: 1000},
    speed: 5000, //init speed
    notes : [{noteUS: "A", noteEU: "LA", selected: true}, {noteUS: "B", noteEU: "SI", selected: true}, {noteUS: "C", noteEU: "DO",selected: true}, {noteUS: "D", noteEU: "RE", selected: true}, {noteUS: "E", noteEU: "MI", selected: true}, {noteUS: "F", noteEU: "FA", selected: true}, {noteUS: "G", noteEU: "SOL", selected: true}],
    notesToDisplay: [],
    languageUS: true,
    quality: {selected: false, values: ["m", "M"]},
    alterations: {selected: false, values: ["","#","b"]}
};

let speedBlinkInterval;

createOptionsPage = function() {
    let speedSelector = document.getElementById("speedSelector");
    let notesContainer = document.getElementById("notesContainer");
    let alterations = document.getElementById("alterations");
    let quality = document.getElementById("quality");
    let language = document.getElementById("language");

    // SPEED
    speedSelector.addEventListener("change", speedChange);

    //NOTES
    options.notes.forEach((note) => {
        let noteItem = document.createElement("span");
        noteItem.id = note.noteUS;
        noteItem.className = "item noteItem";
        noteItem.addEventListener("click", () => {
            selectNote(noteItem);
        });

        let noteText = document.createElement("p");
        noteText.innerHTML = note.noteUS;

        noteItem.appendChild(noteText);
        notesContainer.appendChild(noteItem);
    })

    // LANGUAGE
    language.addEventListener("click", handleLanguage);

    //QUALITY
    quality.addEventListener("click", handleQuality);
    
    //ALTERATIONS
    alterations.addEventListener("click", handleAlterations);

    //OK
    document.getElementById("validButton").addEventListener("click", closeActivationPage);
        
    //To have perfect circles, I have to fix the height equal to the width, to 
    var circleButtons = document.getElementsByClassName("item");
    window.prout = circleButtons;
    for (let item of circleButtons) {
        item.style.height = item.offsetWidth + "px";
    }
};

startSpeedBlink = function() {
    let indicator = document.getElementById("speedIndicator");
    indicator.innerHTML = Math.round(60000/options.speed) + " bpm";

    speedBlink();
    speedBlinkInterval = setInterval(speedBlink, options.speed);
};

stopSpeedBlink = function() {
    clearInterval(speedBlinkInterval);
}

speedBlink = function() {
    let speedSelector = document.getElementById("speedSelector");
    
    speedSelector.classList.add("blink");

    setTimeout(() => {
    speedSelector.classList.remove("blink");
    }, 100);
}

speedChange = function(e) {
    let speed = parseInt(e.target.value);
    options.speed = map(speed,0,100,6000,1000);
    stopSpeedBlink();
    startSpeedBlink();
};


selectNote = function(item) {
    let notesDisplayedElmts = document.getElementsByClassName("noteItem");
    let noteToSwitch = options.notes.find(note => note.noteUS === item.id);
    
    noteToSwitch.selected = !noteToSwitch.selected;

    for(i=0; i < options.notes.length; i++) {
        if (options.notes[i].selected) {
            notesDisplayedElmts[i].classList.add("selected")
        } else {
            notesDisplayedElmts[i].classList.remove("selected")
        }
    }
};

handleLanguage = function() {
    let notesDisplayedElmts = document.getElementsByClassName("noteItem");

    options.languageUS = !options.languageUS;
    document.getElementById("US").classList.toggle("langSelected");
    document.getElementById("EU").classList.toggle("langSelected");

    for(i=0; i<notesDisplayedElmts.length; i++) {
        notesDisplayedElmts[i].innerHTML = options.languageUS ? options.notes[i].noteUS : options.notes[i].noteEU;
    }
};

handleAlterations = function() {
    options.alterations.selected = !options.alterations.selected;
    document.getElementById("alterations").classList.toggle("selected");
};

handleQuality = function() {
    options.quality.selected = !options.quality.selected;
    document.getElementById("quality").classList.toggle("selected");
};
