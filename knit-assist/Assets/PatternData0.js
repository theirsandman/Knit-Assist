// PatternData0.js — project slot 0 (edit the grid below for this project)
var pattern = [
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","DOT","DOT","DOT","BLANK","BLANK","DOT","DOT","DOT","BLANK"],
  ["BLANK","DOT","DOT","DOT","BLANK","BLANK","DOT","DOT","DOT","BLANK"],
  ["BLANK","DOT","DOT","DOT","BLANK","BLANK","DOT","DOT","DOT","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","DOT","DOT","DOT","BLANK","BLANK","DOT","DOT","DOT","BLANK"],
  ["BLANK","DOT","DOT","DOT","BLANK","BLANK","DOT","DOT","DOT","BLANK"],
  ["BLANK","DOT","DOT","DOT","BLANK","BLANK","DOT","DOT","DOT","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
];

script.getPattern = function() { return pattern; };

if (typeof global.knitAssistPatterns === "undefined") {
    global.knitAssistPatterns = [null, null, null];
}
global.knitAssistPatterns[0] = pattern;
