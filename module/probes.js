var spawn, async, // Modules
    getCmdOutput; //Functions

spawn = require('child_process').spawn;
async = require('async');

getCmdOutput = function getCmdOutput(cmd, args, callback) {
    "use strict";
    var process, outputLines, err;
    process = spawn(cmd, args);
    outputLines = [];
    err = null;

    process.stdout.on("data", function onOut(buf) {
        outputLines.push(buf.toString("ascii"));
    });

    process.on("error", function onError(error) {
        err = error;
    });

    process.on("exit", function onExit() {
        callback(err, outputLines.join("\n"));
    });
};

exports.hardDriveProbe = function disksize(callback){
    "use strict";
    var array, searchIndex, elements, results;
    results = [];
    getCmdOutput("df",["-l","-k"],function(err,output){
        array = output.split(/\n/);
        array.splice(0,1);
        searchIndex = array.indexOf(""); // Find the index
        if(searchIndex !== -1) {
            array.splice(searchIndex, 1);// Remove it if really found!
        }
        async.forEach(array,function(line,callback){
            elements = line.split(/\s+/);
            var dataLine = {

                fileSystem      : elements.splice(0,1).join(),
                totalSpace      : parseInt(elements.splice(0,1).join(),10),
                usedSpace       : parseInt(elements.splice(0,1).join(),10),
                availableSpace  : parseInt(elements.splice(0,1).join(),10),
                percentUsed     : parseInt(elements.splice(0,1).join(),10),
                mountPoint      : elements.join(" ")
            };
            results.push(dataLine);
            callback();
        });
        callback(null,results);
    });
};