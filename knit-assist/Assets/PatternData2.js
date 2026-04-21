// PatternData2.js — project slot 2 (edit the grid below for this project)
var pattern = [
  ["K2TOG","BLANK","K2TOG","BLANK","K2TOG","BLANK","K2TOG","BLANK","K2TOG","BLANK"],
  ["BLANK","YO","BLANK","YO","BLANK","YO","BLANK","YO","BLANK","YO"],
  ["YO","BLANK","YO","BLANK","YO","BLANK","YO","BLANK","YO","BLANK"],
  ["DOT","DOT","BLANK","BLANK","DOT","DOT","BLANK","BLANK","DOT","DOT"],
  ["BLANK","BLANK","DOT","DOT","BLANK","BLANK","DOT","DOT","BLANK","BLANK"],
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
global.knitAssistPatterns[2] = pattern;
