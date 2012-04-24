var probes, should;
should = require("chai").should();
probes = require("../index.js");

describe('hardDriveProbe',function(){
    "use strict";
    describe('Method',function(){
        it('should have a method hardDriveProbe',function(done){
            probes.should.respondTo('hardDriveProbe');
            done();
        });
    });

    describe('Keys',function(){
        it('should have keys fileSystem, totalSpace, usedSpace, availableSpace, percentUsed and mountPoint',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.should.have.keys(['fileSystem', 'totalSpace', 'usedSpace', 'availableSpace', 'percentUsed', 'mountPoint']);
                });
                done();
            });
        });
    });

    describe('fileSystem',function(){
        it('should be a string',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.fileSystem.should.be.a('string');
                });
                done();
            });
        });
    });

    describe('totalSpace',function(){
        it('should be a number',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.totalSpace.should.be.a('number');
                });
                done();
            });
        });
    });

    describe('usedSpace',function(){
        it('should be a number',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.usedSpace.should.be.a('number');
                });
                done();
            });
        });
    });

    describe('availableSpace',function(){
        it('should be a number',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.availableSpace.should.be.a('number');
                });
                done();
            });
        });
    });

    describe('percentUsed',function(){
        it('should be a number',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.percentUsed.should.be.a('number');
                });
                done();
            });
        });
    });

    describe('mountPoint',function(){
        it('should be a string',function(done){
            probes.hardDriveProbe(function(err,result){
                result.forEach(function(drive){
                    drive.mountPoint.should.be.a('string');
                });
                done();
            });
        });
    });
});