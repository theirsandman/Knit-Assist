// PatternData2.js — project slot 2 (edit the grid below for this project)
var pattern = [
  ["BLANK","DOT","BLANK","DOT","BLANK","BLANK","DOT","BLANK","DOT","BLANK"],
  ["DOT","BLANK","DOT","BLANK","DOT","DOT","BLANK","DOT","BLANK","DOT"],
  ["BLANK","DOT","BLANK","BLANK","DOT","DOT","BLANK","BLANK","DOT","BLANK"],
  ["BLANK","BLANK","DOT","BLANK","DOT","DOT","BLANK","DOT","BLANK","BLANK"],
  ["BLANK","BLANK","DOT","DOT","DOT","DOT","DOT","DOT","BLANK","BLANK"],
  ["BLANK","BLANK","DOT","DOT","DOT","DOT","DOT","DOT","BLANK","BLANK"],
  ["BLANK","BLANK","DOT","DOT","DOT","DOT","BLANK","DOT","BLANK","BLANK"],
  ["BLANK","DOT","BLANK","BLANK","DOT","DOT","BLANK","BLANK","DOT","BLANK"],
  ["DOT","BLANK","DOT","BLANK","DOT","DOT","BLANK","DOT","BLANK","DOT"],
  ["BLANK","DOT","BLANK","DOT","BLANK","BLANK","DOT","BLANK","DOT","BLANK"]
];

script.getPattern = function() { return pattern; };

if (typeof global.knitAssistPatterns === "undefined") {
    global.knitAssistPatterns = [null, null, null];
}
global.knitAssistPatterns[2] = pattern;
