// PatternData0.js — project slot 0 (edit the grid below for this project)
var pattern = [
  ["DOT","DOT","DOT","DOT","DOT","DOT","DOT","DOT","DOT","DOT"],
  ["BLANK","YO","K2TOG","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","YO","K2TOG","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["YO","BLANK","YO","BLANK","YO","BLANK","YO","BLANK","YO","BLANK"],
  ["BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT"],
  ["DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"]
];

script.getPattern = function() { return pattern; };

if (typeof global.knitAssistPatterns === "undefined") {
    global.knitAssistPatterns = [null, null, null];
}
global.knitAssistPatterns[0] = pattern;
