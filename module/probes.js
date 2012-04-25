var spawn, async,os, // Modules
    getCmdOutput; //Functions

spawn = require('child_process').spawn;
async = require('async');
os = require('os');

exports.hardDriveProbe = function hardDriveProbe(callback){
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

exports.folderProbe = function folderProbe(path,callback){
    "use strict";
    var array, searchIndex, elements, results;
    results = [];
    getCmdOutput("du",["-s","-k",path],function(err,output){
        callback(null,parseInt(output.split(/\s+/)[0],10));
    });
};

exports.cpuProbe = function cpuProbe(callback){
    "use strict";
    var osLoadAvg, osCoreNumber, arrayDoc, arrayLine, spotProc, searchIndex;
    osLoadAvg = os.loadavg();
    osCoreNumber = os.cpus().length;
    getCmdOutput("ps",["ax", "-eo pcpu"],function(err,output){
        arrayDoc = output.split(/\n/);
        arrayDoc.splice(0,1);
        searchIndex = arrayDoc.indexOf(""); // Find the index
        if(searchIndex !== -1) {
            arrayDoc.splice(searchIndex, 1);// Remove it if really found!
        }
        spotProc = 0;
        async.forEach(arrayDoc,function(line,callback){
            if(!isNaN(line)){
                spotProc = spotProc + parseFloat(line);
            }
            callback();
        });
        callback(null,{spot:spotProc,one:osLoadAvg[0]/osCoreNumber*100,five:osLoadAvg[1]/osCoreNumber*100,fifteen:osLoadAvg[2]/osCoreNumber*100});
    });
};

exports.processListProbe = function processListProbe(callback){
    "use strict";
    var arrayDoc, results, searchIndex, elements;
    results=[];
    getCmdOutput("ps",["ax", "-eo etime,pcpu,pmem,pid,args"],function(err,output){
        arrayDoc = output.split(/\n/);
        arrayDoc.splice(0,1);
        searchIndex = arrayDoc.indexOf(""); // Find the index
        if(searchIndex !== -1) {
            arrayDoc.splice(searchIndex, 1);// Remove it if really found!
        }
        async.forEach(arrayDoc,function(line,callback){
            elements = line.split(/\s+/);
            searchIndex = elements.indexOf(""); // Find the index
            if(searchIndex !== -1) {
                elements.splice(searchIndex, 1);// Remove it if really found!
            }
            results.push({time:elements.splice(0,1).join(),pcpu:parseFloat(elements.splice(0,1).join()),pmem:parseFloat(elements.splice(0,1).join()),pid:parseInt(elements.splice(0,1),10),name:elements.join(" ")});
            callback();
        });
        callback(null,results);
    });
};

exports.memoryProbe = function memoryProbe(callback){
    "use strict";
    var osFreeMemory, osTotalMemory;
    osFreeMemory = os.freemem();
    osTotalMemory = os.totalmem();
    callback(null,{freeMemory: osFreeMemory,activeMemory: osTotalMemory-osFreeMemory,totalMemory: osTotalMemory});
};

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