Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

const options = {
    speedRange:{slow: 10000, fast: 1000},
    initSpeed: 5000,
    speed: null,
    notes : [{noteUS: "A", noteEU: "LA", selected: true}, {noteUS: "B", noteEU: "SI", selected: true}, {noteUS: "C", noteEU: "DO",selected: true}, {noteUS: "D", noteEU: "RE", selected: true}, {noteUS: "E", noteEU: "MI", selected: true}, {noteUS: "F", noteEU: "FA", selected: true}, {noteUS: "G", noteEU: "SOL", selected: true}],
    notesToDisplay: [],
    languageUS: true,
    quality: {selected: false, values: ["m", "M"]},
    alterations: {selected: false, values: ["","#","b"]}
};

let displayInterval;
let speedBlinkInterval;

window.onload = function() {
    prepareScreen();
};

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
    document.getElementById("optionsPage").classList.remove("hidden");
};

closeActivationPage = function() {
    document.getElementById("optionsPage").classList.add("hidden");
    stopSpeedBlink();
    startDisplay()
};

initDisplay = function() {;
    // let speedIndex = options.speedOptions.findIndex(elm => elm.selected);
    // document.getElementsByClassName("speedItem")[speedIndex].classList.add("selected");
    options.speed = options.initSpeed;
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
    let notedisplay = document.getElementById("noteDisplay");
    
    notedisplay.innerHTML = randomNote() + getAlteration() + " " + getQuality();
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

//OPTIONS 

createOptionsPage = function() {
    

    let speedSelector = document.getElementById("speedSelector");
    let notesContainer = document.getElementById("notesContainer");
    let alterations = document.getElementById("alterations");
    let quality = document.getElementById("quality");
    let language = document.getElementById("language");

    // SPEED
    speedSelector.addEventListener("change", speedChange);
    // options.speedOptions.forEach((speedElmt) => {
    //     let speedItem = document.createElement("span");
    //     speedItem.className = "item speedItem";
    //     speedItem.id = speedElmt.id;
    //     speedItem.addEventListener("click", () => {
    //         selectSpeed(speedItem);
    //     });

    //     speedContainer.appendChild(speedItem);
    // });

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
    speedBlinkInterval = setInterval(speedBlink, options.speed)
};

speedBlink = function() {
    console.log("blink")
    let speedSelector = document.getElementById("speedSelector");
    speedSelector.classList.add("blink");

    setTimeout(() => {
    speedSelector.classList.remove("blink");
    }, 100);
}

stopSpeedBlink = function() {
    clearInterval(speedBlinkInterval);
}

speedChange = function(e) {
    let speed = parseInt(e.target.value);
    options.speed = speed.map(0,100,6000,1000);
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
