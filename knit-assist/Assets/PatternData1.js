// PatternData1.js
var pattern = [
  ["YO","YO","YO","YO","YO","YO","YO","YO","YO","YO"],
  ["BLANK","YO","K2TOG","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","YO","K2TOG","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK"],
  ["DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK"],
  ["DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK"],
  ["DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK","DOT","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"]
];

script.getPattern = function() { return pattern; };

if (typeof global.knitAssistPatterns === "undefined") {
    global.knitAssistPatterns = [null, null, null];
}
global.knitAssistPatterns[1] = pattern;