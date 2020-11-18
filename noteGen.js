const notes = ["A","B","C","D","E","F","G"];
const options = {
    speedOptions: [
        {id: "slowSpeed", name:"slow", speed: 6000, selected: false}, 
        {id: "mediumSpeed", name:"medium", speed: 3000, selected: true}, 
        {id: "fastSpeed", name:"fast", speed: 1500, selected: false}
    ],
    quality: {selected: false, values: ["m", "M"]},
    
    alterations: {selected: false, values: ["","#","b"]}
};

let displayInterval;

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
    document.getElementById("optionsPage").classList.remove("hidden");
};

closeActivationPage = function() {
    document.getElementById("optionsPage").classList.add("hidden");
    startDisplay()
};

initDisplay = function() {;
    let speedIndex = options.speedOptions.findIndex(elm => elm.selected);
    document.getElementsByClassName("speedItem")[speedIndex].classList.add("selected");

    startDisplay();
};

startDisplay = function() {
    let speed = options.speedOptions.find(elmt => elmt.selected).speed;

    displayNewNote();
    displayInterval = setInterval(displayNewNote, speed);
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
    let index = Math.floor(Math.random() * Math.floor(notes.length));
    return notes[index];
};

//OPTIONS 

createOptionsPage = function() {
    let speedContainer = document.getElementById("speedContainer");
    let alterations = document.getElementById("alterations");
    let quality = document.getElementById("quality");

    // SPEED
    options.speedOptions.forEach((speedElmt) => {
        let speedItem = document.createElement("span");
        speedItem.className = "item speedItem";
        speedItem.id = speedElmt.id;
        speedItem.addEventListener("click", () => {
            selectSpeed(speedItem);
        });

        let text = document.createElement("p");
        text.innerHTML = speedElmt.name.toUpperCase();

        speedItem.appendChild(text);
        speedContainer.appendChild(speedItem);
    });

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


selectSpeed = function(item) {
    let speedDisplayedElmts = document.getElementsByClassName("speedItem");

    for(speed of options.speedOptions) {
        speed.selected = speed.id === item.id ? true : false;
    }

    for(i=0; i < options.speedOptions.length; i++) {
        if (options.speedOptions[i].selected) {
            speedDisplayedElmts[i].classList.add("selected")
        } else {
            speedDisplayedElmts[i].classList.remove("selected")

        }
    }
};

handleAlterations = function() {
    options.alterations.selected = !options.alterations.selected;
    document.getElementById("alterations").classList.toggle("selected");
}

handleQuality = function() {
    options.quality.selected = !options.quality.selected;
    document.getElementById("quality").classList.toggle("selected");
}
