// ---- Inspector inputs ----
// @input int rows = 10
// @input int cols = 10
// @input float cellSize = 0.06
// @input float gap = 0.01
// @input Asset.ObjectPrefab tilePrefab
// @input SceneObject uiParent
// @input Asset.Texture texDot
// @input Asset.Texture texCircle
// @input Asset.Texture texSlash
// @input Asset.Texture texBlank
// @input bool debugLogs = false
// @input Component.ScriptComponent patternData0
// @input Component.ScriptComponent patternData1
// @input Component.ScriptComponent patternData2
// @input Component.AudioComponent rowCompleteAudio
// @input Component.AudioComponent patternCompleteAudio

var tiles = [];
var currentRow = 0;
var currentCol = 0;
var prevRow = 0;
var prevCol = 0;
var patternsCompleted = 0;        // ← counter, use later as needed

// ---------- Audio ----------
function playRowComplete() {
    if (script.rowCompleteAudio) {
        script.rowCompleteAudio.play(1);
    }
}

function playPatternComplete() {
    if (script.patternCompleteAudio) {
        script.patternCompleteAudio.play(1);
    }
}

// ---------- Pattern reset ----------
function resetPattern() {
    patternsCompleted++;
    print("[Grid] Pattern complete! Total completed: " + patternsCompleted);

    // Clear all highlights
    setRowHighlight(prevRow, false);
    if (tiles[prevRow] && tiles[prevRow][prevCol]) {
        var prevA = activeHL(tiles[prevRow][prevCol]);
        if (prevA) prevA.enabled = false;
    }

    // Reset position back to start
    currentRow = 0;
    currentCol = 0;
    prevRow = 0;
    prevCol = 0;

    setRowHighlight(0, true);
    setActive(0, 0);
}

// ---------- Pattern ----------
function buildBlankPattern(rows, cols) {
    var p = [];
    for (var r = 0; r < rows; r++) {
        p[r] = [];
        for (var c = 0; c < cols; c++) {
            p[r][c] = "BLANK";
        }
    }
    return p;
}

function getPatternForProjectIndex(projectIndex) {
    var safeIndex = Math.max(0, Math.min(projectIndex, 2));
    var inputs = [script.patternData0, script.patternData1, script.patternData2];
    var comp = inputs[safeIndex];
    if (comp && typeof comp.getPattern === "function") {
        try {
            var fromInspector = comp.getPattern.call(comp);
            if (fromInspector && fromInspector.length) {
                if (typeof global.knitAssistPatterns === "undefined") {
                    global.knitAssistPatterns = [null, null, null];
                }
                global.knitAssistPatterns[safeIndex] = fromInspector;
                return fromInspector;
            }
        } catch (err) {
            log("getPattern slot " + safeIndex + ": " + err);
        }
    }
    if (global.knitAssistPatterns && global.knitAssistPatterns[safeIndex]) {
        return global.knitAssistPatterns[safeIndex];
    }
    return buildBlankPattern(script.rows, script.cols);
}

var pattern = buildBlankPattern(script.rows, script.cols);

function loadPattern(projectIndex) {
    pattern = getPatternForProjectIndex(projectIndex);
    if (!tiles.length) {
        return;
    }
    for (var r = 0; r < script.rows; r++) {
        for (var c = 0; c < script.cols; c++) {
            var stitchType = "BLANK";
            if (pattern[r] && pattern[r][c]) { stitchType = pattern[r][c]; }
            if (tiles[r] && tiles[r][c]) {
                setSymbol(tiles[r][c], stitchType);
            }
        }
    }
}

script.loadPattern = loadPattern;

// ---------- Helpers ----------
function rowHL(tile) { return tile.getChild(0); }
function activeHL(tile) { return tile.getChild(1); }

function ensureUniqueSymbolMaterial(symObj) {
    var img = symObj.getComponent("Component.Image");
    if (!img) return null;
    var mat = img.mainMaterial;
    if (!mat) return img;
    var uniqueMat = mat.clone();
    img.mainMaterial = uniqueMat;
    return img;
}

function log(msg) {
    if (script.debugLogs) {
        print("[KnittingGrid] " + msg);
    }
}

function findChildByName(parent, childName) {
    var count = parent.getChildrenCount();
    for (var i = 0; i < count; i++) {
        var ch = parent.getChild(i);
        if (ch && ch.name === childName) return ch;
    }
    return null;
}

function symbolObj(tile) {
    return findChildByName(tile, "Symbol");
}

function setSymbol(tile, stitchType) {
    var sym = symbolObj(tile);
    if (!sym) return;
    var img = ensureUniqueSymbolMaterial(sym);
    if (!img) return;
    var tex = script.texBlank;
    if (stitchType === "DOT") tex = script.texDot;
    else if (stitchType === "YO") tex = script.texCircle;
    else if (stitchType === "K2TOG") tex = script.texSlash;
    if (!tex) return;
    var pass = img.mainPass;
    if (!pass) return;
    if (pass.baseTex !== undefined) pass.baseTex = tex;
    else if (pass.diffuseTex !== undefined) pass.diffuseTex = tex;
    else if (pass.texture !== undefined) pass.texture = tex;
}

// ---------- Grid spawn ----------
function spawnGrid() {
    if (!script.tilePrefab) {
        print("[KnittingGrid] ERROR: tilePrefab not assigned.");
        return;
    }
    var parent = script.uiParent ? script.uiParent : script.getSceneObject();
    log("Spawning under: " + (script.uiParent ? "uiParent" : "GridManager"));
    for (var r = 0; r < script.rows; r++) {
        tiles[r] = [];
        for (var c = 0; c < script.cols; c++) {
            var tile = script.tilePrefab.instantiate(parent);
            var x = (c - (script.cols - 1) / 2) * (script.cellSize + script.gap);
            var y = -(r - (script.rows - 1) / 2) * (script.cellSize + script.gap) + 5;
            tile.getTransform().setLocalPosition(new vec3(x, y, 0));
            tile.getTransform().setLocalScale(new vec3(script.cellSize, script.cellSize, 1));
            print("[Grid] Tile spawned at x:" + x + " y:" + y + " parent:" + parent.name);
            tiles[r][c] = tile;
            var stitchType = "BLANK";
            if (pattern[r] && pattern[r][c]) stitchType = pattern[r][c];
            setSymbol(tile, stitchType);
        }
    }
}

// ---------- Row + active highlight ----------
function setRowHighlight(row, on) {
    if (!tiles[row]) return;
    for (var c = 0; c < script.cols; c++) {
        var tile = tiles[row][c];
        if (!tile) continue;
        var hl = rowHL(tile);
        if (hl) hl.enabled = on;
    }
}

function setActive(row, col) {
    if (!tiles[row] || !tiles[row][col]) return;
    if (tiles[prevRow] && tiles[prevRow][prevCol]) {
        var prevA = activeHL(tiles[prevRow][prevCol]);
        if (prevA) prevA.enabled = false;
    }
    if (row !== prevRow) {
        setRowHighlight(prevRow, false);
        setRowHighlight(row, true);
    }
    var newA = activeHL(tiles[row][col]);
    if (newA) newA.enabled = true;
    prevRow = row;
    prevCol = col;
}

// ---------- Movement ----------
function rowGoesLeftToRight(row) {
    // Bottom row (rows-1) is RS, reads right to left
    // Flip based on distance from bottom
    var rowFromBottom = script.rows - 1 - row;
    return rowFromBottom % 2 !== 0; // odd rows from bottom go left-to-right
}

function addStitch() {
    var leftToRight = rowGoesLeftToRight(currentRow);

    if (leftToRight) {
        if (currentCol < script.cols - 1) {
            currentCol++;
        } else if (currentRow > 0) {
            currentRow--;
            currentCol = script.cols - 1;
        }
    } else {
        if (currentCol > 0) {
            currentCol--;
        } else if (currentRow > 0) {
            currentRow--;
            currentCol = 0;
        }
    }

    setActive(currentRow, currentCol);
}

function nextRow() {
    if (currentRow < script.rows - 1) {
        currentRow++;
    }
    currentCol = 0;
    setActive(currentRow, currentCol);
}

script.addStitch = addStitch;

function prevStitch() {
    var leftToRight = rowGoesLeftToRight(currentRow);

    if (leftToRight) {
        if (currentCol > 0) {
            currentCol--;
        } else if (currentRow < script.rows - 1) {
            currentRow++;
            currentCol = 0;
        }
    } else {
        if (currentCol < script.cols - 1) {
            currentCol++;
        } else if (currentRow < script.rows - 1) {
            currentRow++;
            currentCol = script.cols - 1;
        }
    }

    setActive(currentRow, currentCol);
}

script.prevStitch = prevStitch;
script.spawnGrid  = spawnGrid;

function getCurrentRow() { return currentRow; }
function getCurrentCol() { return currentCol; }
function getPatternsCompleted() { return patternsCompleted; }

function restorePosition(row, col) {
    currentRow = Math.max(0, Math.min(Math.round(row), script.rows - 1));
    currentCol = Math.max(0, Math.min(Math.round(col), script.cols - 1));
    setActive(currentRow, currentCol);
}

script.getCurrentRow      = getCurrentRow;
script.getCurrentCol      = getCurrentCol;
script.restorePosition    = restorePosition;
script.getPatternsCompleted = getPatternsCompleted;

// ---------- Start ----------
script.createEvent("OnStartEvent").bind(function () {
    print("[Grid] OnStart Fired");
    pattern = getPatternForProjectIndex(0);
    spawnGrid();
    
    // Start at bottom-right instead of top-left
    currentRow = script.rows - 1;
    currentCol = script.cols - 1;
    
    setRowHighlight(currentRow, true);
    setActive(currentRow, currentCol);

    global.knitAssistGrid = {
        loadPattern:          loadPattern,
        restorePosition:      restorePosition,
        getCurrentRow:        getCurrentRow,
        getCurrentCol:        getCurrentCol,
        addStitch:            addStitch,
        prevStitch:           prevStitch,
        spawnGrid:            spawnGrid,
        getPatternsCompleted: getPatternsCompleted
    };

    print("[Grid] OnStart done");
});