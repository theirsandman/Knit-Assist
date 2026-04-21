// SimpleHighScoreController.js — BUILD knit-assist-2026-04-18-v8
// @input Component.Text scoreText
// @input Component.Text projectNameText
// @input Component.ScriptComponent gridController
// @input Component.ScriptComponent toggleGroup



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


function clampProjectIndex(index) {
    var i = Math.floor(index);
    if (i < 0) { return 0; }
    if (i > MAX_PROJECTS - 1) { return MAX_PROJECTS - 1; }
    return i;
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
        script.scoreText.text = currentScore.toString();
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

    var savedRow = s ? storeGetNumber(s, keyRow(currentProjectIndex), 0) : 0;
    var savedCol = s ? storeGetNumber(s, keyCol(currentProjectIndex), 0) : 0;

    print("[KnitAssist] Loading project " + currentProjectIndex + 
      " row:" + savedRow + " col:" + savedCol + 
      " score:" + currentScore);
    
    
    gridLoadPattern(currentProjectIndex);
    gridRestorePosition(savedRow, savedCol);

    updateScoreText();
    updateProjectNameText(getProjectName(currentProjectIndex));


}

function incrementScore() {
    currentScore++;
    saveCurrentProject();
    updateScoreText();
}

function reduceScore() {
    if (currentScore > 1) {
        currentScore--;
        saveCurrentProject();
        updateScoreText();
    }
}

function saveProjectName(name) {
    if (!name || name === "") { return; }
    var s = getStore();
    if (s) {
        storePutString(s, keyName(currentProjectIndex), name);
    }
    updateProjectNameText(name);
}

function applySavedProjectToGrid() {
    var s = getStore();
    var startRow = s ? storeGetNumber(s, keyRow(currentProjectIndex), 0) : 0;
    var startCol = s ? storeGetNumber(s, keyCol(currentProjectIndex), 0) : 0;

    gridLoadPattern(currentProjectIndex);
    gridRestorePosition(startRow, startCol);

    updateScoreText();
    updateProjectNameText(getProjectName(currentProjectIndex));
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

script.incrementScore = incrementScore;
script.reduceScore = reduceScore;
script.loadProject = loadProject;
script.saveCurrentProject = saveCurrentProject;
script.saveProjectName = saveProjectName;

