Probes.js
=======

* A Node.js module to get server load statistics

Probes.js provides a simple toolkit to measure the load of a server and to get basic information for a running process.
It has been tested to work on Mac Os X and Linux.

Basic Example
-------------
**Installation**
npm install Probes.js

**How to Use**

```javascript
var probes = require('Probes.js');

//Print the number of hard drives connected to the server
probes.hardDriveProbe(function(err,results){
    if(!err)console.log(results.length);
});
```

Function Documentation
----------------------

**hardDriveProbe**

```javascript
probes.hardDriveProbe(function(err,results){});

results = [{fileSystem      : name,
            totalSpace      : Ko,
            usedSpace       : Ko,
            availableSpace  : Ko,
            percentUsed     : percent,
            mountPoint      : path}];
```

**folderProbe**

```javascript
probes.folderProbe(path,function(err,results){});

results = folderSizeKo;
```

**cpuProbe**

```javascript
probes.cpuProbe(function(err,results){});

results = { spot    : percentRigthNow,
            one     : averageLastMinute,
            five    : averageLastFiveMinutes,
            fifteen : averageLastFifteenMinutes};
```

**memoryProbe**

```javascript
probes.memoryProbe(function(err,results){});

results = {freeMemory       : freeMemory,
            activeMemory    : usedMemory,
            totalMemory     : totalMemory};
```

**processListProbe**

```javascript
probes.processListProbe(function(err,results){});

results = [{pid  : processPid,
            name : commandName,
            time : elapsedTime,
            pcpu : percentOfCpuUsed,
            pmem : percentOfMemoryUsed}];
```