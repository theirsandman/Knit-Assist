// SimpleHighScoreController.js — BUILD knit-assist-2026-04-18-v8
// @input Component.Text scoreText
// @input Component.Text projectNameText
// @input Component.ScriptComponent gridController
// @input Component.ScriptComponent toggleGroup
// @input Asset.Texture referenceImage0
// @input Asset.Texture referenceImage1
// @input Asset.Texture referenceImage2
// @input Component.Image referenceDisplay
// @input Component.ScriptComponent progressBarFill
// @input Component.Text progressText


var MAX_PROJECTS = 3;

function getStore() {
    if (global.persistentStorageSystem && global.persistentStorageSystem.store) {
        return global.persistentStorageSystem.store;
    }
    return null;
}

function keyActiveProject() { return "active_project"; }
function keyScore(i) { return "project_" + i + "_score"; }
function keyRow(i) { return "project_" + i + "_row"; }
function keyCol(i) { return "project_" + i + "_col"; }
function keyName(i) { return "project_" + i + "_name"; }
function keyRepeats(i) { return "project_" + i + "_repeats"; }
var projectTargets = [40, 30, 20];

function clampProjectIndex(index) {
    var i = Math.floor(index);
    if (i < 0) { return 0; }
    if (i > MAX_PROJECTS - 1) { return MAX_PROJECTS - 1; }
    return i;
}

function applySavedProjectToGrid() {
    var s = getStore();
    var savedRow = s ? storeGetNumber(s, keyRow(currentProjectIndex), 9) : 9;
    var savedCol = s ? storeGetNumber(s, keyCol(currentProjectIndex), 9) : 9;

    gridLoadPattern(currentProjectIndex);
    gridRestorePosition(savedRow, savedCol);

    updateScoreText();
    updateProjectNameText(getProjectName(currentProjectIndex));
    updateReferenceImage(currentProjectIndex);
    
    var target = projectTargets[currentProjectIndex];
updateProgressDisplay(getRepeatCount(), target);
}

function storePutNumber(store, key, value) {
    var v = Math.round(Number(value));
    if (typeof store.putInt === "function") {
        store.putInt(key, v);
        return;
    }
    if (typeof store.putFloat === "function") {
        store.putFloat(key, v);
        return;
    }
    if (typeof store.putString === "function") {
        store.putString(key, v.toString());
    }
}

function storeGetNumber(store, key, defaultIfMissing) {
    if (typeof store.has === "function" && !store.has(key)) {
        return defaultIfMissing;
    }

    if (typeof store.getInt === "function") {
        return store.getInt(key);
    }
    if (typeof store.getFloat === "function") {
        return Math.round(store.getFloat(key));
    }
    if (typeof store.getString === "function") {
        var raw = store.getString(key);
        if (raw === "") { return defaultIfMissing; }
        var parsed = parseInt(raw, 10);
        return isNaN(parsed) ? defaultIfMissing : parsed;
    }
    return defaultIfMissing;
}

function storePutString(store, key, value) {
    if (typeof store.putString === "function") {
        store.putString(key, value);
    }
}

function storeGetString(store, key, fallback) {
    if (typeof store.getString === "function") {
        var value = store.getString(key);
        if (value !== undefined && value !== null && value !== "") {
            return value;
        }
    }
    return fallback;
}

function defaultProjectName(i) {
    return "Project " + (i + 1);
}

function getKnitGridApi() {
    var api = global.knitAssistGrid;
    if (api &&
        typeof api.loadPattern === "function" &&
        typeof api.restorePosition === "function" &&
        typeof api.getCurrentRow === "function" &&
        typeof api.getCurrentCol === "function") {
        return api;
    }
    return null;
}

function gridLoadPattern(projectIndex) {
    var api = getKnitGridApi();
    if (api) {
        api.loadPattern(projectIndex);
    }
}

function gridRestorePosition(row, col) {
    var api = getKnitGridApi();
    if (api) {
        api.restorePosition(row, col);
    }
}

var sInit = getStore();
var currentProjectIndex = clampProjectIndex(sInit ? storeGetNumber(sInit, keyActiveProject(), 0) : 0);
var currentScore = 1;
if (sInit) {
    if (typeof sInit.has === "function" && sInit.has(keyScore(currentProjectIndex))) {
        currentScore = storeGetNumber(sInit, keyScore(currentProjectIndex), 1);
        if (currentScore < 1) { currentScore = 1; }
    } else {
        currentScore = 1;
    }
}

function updateScoreText() {
    if (script.scoreText) {
        var display = currentScore < 10 ? "0" + currentScore : currentScore.toString();
        script.scoreText.text = display;
    }
}

function updateProjectNameText(name) {
    if (script.projectNameText) {
        script.projectNameText.text = name;
    }
}

function getProjectName(i) {
    var s = getStore();
    if (!s) { return defaultProjectName(i); }
    return storeGetString(s, keyName(i), defaultProjectName(i));
}

function saveCurrentProject() {
    try {
        var s = getStore();
        if (!s) { return; }

        var i = currentProjectIndex;
        storePutNumber(s, keyScore(i), currentScore);

        var grid = getKnitGridApi();
        if (grid) {
            var r = grid.getCurrentRow();
            var c = grid.getCurrentCol();
            print("[KnitAssist] Saving project " + i + " row:" + r + " col:" + c);
            storePutNumber(s, keyRow(i), r);
            storePutNumber(s, keyCol(i), c);
        } else {
            print("[KnitAssist] saveCurrentProject: grid API not found!");
        }
    } catch (err) {
        print("[KnitAssist] saveCurrentProject error: " + err);
    }
}

function loadProject(index) {
    saveCurrentProject();

    currentProjectIndex = clampProjectIndex(index);
    var s = getStore();
    if (s) {
        storePutNumber(s, keyActiveProject(), currentProjectIndex);
    }

    if (s && typeof s.has === "function" && s.has(keyScore(currentProjectIndex))) {
        currentScore = storeGetNumber(s, keyScore(currentProjectIndex), 1);
        if (currentScore < 1) { currentScore = 1; }
    } else {
        currentScore = 1;
    }

    var savedRow = s ? storeGetNumber(s, keyRow(currentProjectIndex), 9) : 9;
    var savedCol = s ? storeGetNumber(s, keyCol(currentProjectIndex), 9) : 9;

    print("[KnitAssist] Loading project " + currentProjectIndex + 
      " row:" + savedRow + " col:" + savedCol + 
      " score:" + currentScore);
    
    
    gridLoadPattern(currentProjectIndex);
    gridRestorePosition(savedRow, savedCol);

    updateScoreText();
    updateProjectNameText(getProjectName(currentProjectIndex));
    updateReferenceImage(currentProjectIndex);
    
    var target = projectTargets[currentProjectIndex];
updateProgressDisplay(getRepeatCount(), target);


}


function incrementRepeats() {
    var s = getStore();
    if (!s) { return; }
    var current = getRepeatCount();
    var target = projectTargets[currentProjectIndex];
    print("[Progress] incrementRepeats called, current:" + current + " target:" + target);
    if (current < target) {
        current++;
        storePutNumber(s, keyRepeats(currentProjectIndex), current);
    }
    updateProgressDisplay(current, target);
}

function getRepeatCount() {
    var s = getStore();
    return s ? storeGetNumber(s, keyRepeats(currentProjectIndex), 0) : 0;
}

function reduceScore() {
    if (currentScore > 1) {
        currentScore--;
        saveCurrentProject();
        updateScoreText();
    }
}


function incrementScore() {
    currentScore++;
    print("[Inc] currentScore is now: " + currentScore);
    if (currentScore >= 100) {
        currentScore = 1;
        gridRestorePosition(9, 9);
        print("[Progress] Pattern complete, calling incrementRepeats");
        incrementRepeats();
    }
    saveCurrentProject();
    updateScoreText();
}

function saveProjectName(name) {
    if (!name || name === "") { return; }
    var s = getStore();
    if (s) {
        storePutString(s, keyName(currentProjectIndex), name);
    }
    updateProjectNameText(name);
}



script.createEvent("OnStartEvent").bind(function() {
    print("[KnitAssist] SimpleHighScoreController BUILD knit-assist-2026-04-18-v8");
    updateScoreText();
    updateProjectNameText(getProjectName(currentProjectIndex));
    
});


var highScoreGridSynced = false;
script.createEvent("UpdateEvent").bind(function() {
    if (highScoreGridSynced) {
        return;
    }
    if (!getKnitGridApi()) {
        return;
    }
    highScoreGridSynced = true;
    applySavedProjectToGrid();
});

function updateReferenceImage(index) {
    if (!script.referenceDisplay) { return; }
    var images = [script.referenceImage0, script.referenceImage1, script.referenceImage2];
    if (images[index]) {
        script.referenceDisplay.mainPass.baseTex = images[index];
    }
}

function updateProgressDisplay(current, target) {
    if (script.progressText) {
        script.progressText.text = current + "/" + target;
    }
    if (script.progressBarFill) {
        var ratio = target > 0 ? current / target : 0;
        var obj = script.progressBarFill.getSceneObject();
        var t = obj.getTransform();
        var fullWidth = 36.0;
        var bgX = -3.0;
        var leftEdge = bgX - fullWidth / 2; // -21, the left edge of the BG

        // Scale X so fill width = ratio * fullWidth
        t.setLocalScale(new vec3(ratio, 1, 1));

        // Keep left edge fixed, grow right
        t.setLocalPosition(new vec3(
            leftEdge + (fullWidth * ratio) / 2,
            -8.035,
            0.02
        ));
    }
}

script.incrementScore = incrementScore;
script.reduceScore = reduceScore;
script.loadProject = loadProject;
script.saveCurrentProject = saveCurrentProject;
script.saveProjectName = saveProjectName;

