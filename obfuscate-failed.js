var JavaScriptObfuscator = require('javascript-obfuscator');
var fs = require("fs");

function readFile (srcPath) {
    return new Promise(function (resolve, reject) {
      fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
  
function writeFile (savPath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(savPath, data, function (err) {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
        })
    })
}

var filename = "read main file here" // i.e. main.chunks.js
readFile(filename).then(function (results) {
    var obfuscationResult = JavaScriptObfuscator.obfuscate(
        results,
        // high obfuscation options
        // takes too long thus failed.
        {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 1,
          debugProtection: true,
          debugProtectionInterval: 4000,
          disableConsoleOutput: true,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          numbersToExpressions: true,
          renameGlobals: false,
          selfDefending: true,
          simplify: true,
          splitStrings: true,
          splitStringsChunkLength: 5,
          stringArray: true,
          stringArrayCallsTransform: true,
          stringArrayEncoding: ['rc4'],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 5,
          stringArrayWrappersChainedCalls: true,    
          stringArrayWrappersParametersMaxCount: 5,
          stringArrayWrappersType: 'function',
          stringArrayThreshold: 1,
          transformObjectKeys: true,
          unicodeEscapeSequence: false
      }
    );
    writeFile(filename, obfuscationResult.getObfuscatedCode())
  });