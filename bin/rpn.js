#!/usr/bin/env node
var fs = require("fs");
var rpn = require("..");

process.argv.slice(2).forEach(function (file) {
  var input = fs.readFileSync(file);
  var output = rpn.compile(input, {
    originalFilename: file.split('/').pop()
  }).toStringWithSourceMap({
    file: file.split('/').pop().replace(/.[w]+$/, ".js.map")
  });
  var sourceMapFile = file.replace(/.[\w]+$/, ".js.map");
  var sourceMapPath = file.split('/').pop().replace(/.[\w]+$/, ".js.map");
  fs.writeFileSync(file.replace(/.[\w]+$/, ".js"),
                   output.code + "\n//# sourceMappingURL=" + sourceMapPath);
  fs.writeFileSync(sourceMapFile, output.map);
});