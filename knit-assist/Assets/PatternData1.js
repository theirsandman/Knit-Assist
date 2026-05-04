// PatternData1.js
var pattern = [
  ["K2TOG","YO","BLANK","BLANK","BLANK","K2TOG","YO","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","K2TOG","YO","BLANK","BLANK","BLANK","K2TOG","YO","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","K2TOG","YO","BLANK","BLANK","BLANK","K2TOG","YO","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","K2TOG","YO","BLANK","BLANK","BLANK","K2TOG","YO"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"],
  ["K2TOG","YO","BLANK","BLANK","BLANK","K2TOG","YO","BLANK","BLANK","BLANK"],
  ["BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK","BLANK"]
];

script.getPattern = function() { return pattern; };

if (typeof global.knitAssistPatterns === "undefined") {
    global.knitAssistPatterns = [null, null, null];
}
global.knitAssistPatterns[1] = pattern;