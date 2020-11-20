
let displayInterval;

window.onload = function() {
    prepareScreen();
};

//UTILS
getOptionsPage = () => document.getElementById("optionsPage");
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

//MAIN SCREEN
prepareScreen = function() {
    createOptionsPage();
    initDisplay();

    let optionsButton = document.getElementById("optionsButton");
    optionsButton.addEventListener("click", activateOptionsPage);
};

activateOptionsPage = function() {
    clearInterval(displayInterval);
    startSpeedBlink();
    getOptionsPage().classList.remove("hidden");
};

closeActivationPage = function() {
    getOptionsPage().classList.add("hidden");
    stopSpeedBlink();
    startDisplay();
};

initDisplay = function() {;
    for(i=0; i<options.notes.length; i++) {
        if(options.notes[i].selected) {
            document.getElementsByClassName("noteItem")[i].classList.add("selected");
        }
    }
    document.getElementById("US").classList.add("langSelected");
    startDisplay();
};

startDisplay = function() {
    options.notesToDisplay = [];
    options.notes.forEach(note => {
        if(note.selected) {
            options.notesToDisplay.push(options.languageUS ? note.noteUS : note.noteEU);
        }
    })

    displayNewNote();
    displayInterval = setInterval(displayNewNote, options.speed);
};

displayNewNote = function() {
    let noteDisplay = document.getElementById("noteDisplay");
    let alterationDisplay = document.getElementById("alterationDisplay");
    let qualityDisplay = document.getElementById("qualityDisplay");
    
    noteDisplay.innerHTML = randomNote();
    alterationDisplay.innerHTML = getAlteration();
    qualityDisplay.innerHTML = " " + getQuality();
};

getAlteration = function() {
    let alterOptions = options.alterations;
    let alteration = alterOptions.values[Math.floor(Math.random() * alterOptions.values.length)];
    return alterOptions.selected ?  alteration : alterOptions.values[0];
},

getQuality = function() {
    let qualityOptions = options.quality;
    let quality = qualityOptions.values[Math.floor(Math.random() * qualityOptions.values.length)];
    return qualityOptions.selected ? quality : "";
}


randomNote = function() {
    let index = Math.floor(Math.random() * Math.floor(options.notesToDisplay.length));
    return options.notesToDisplay[index];
};
